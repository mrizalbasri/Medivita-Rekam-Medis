import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";

const fallbackAccessSchema = z.object({
  nik: z.string().trim().length(16, "NIK harus tepat 16 digit"),
  kodeCadangan: z.string().trim().length(6, "Kode cadangan harus 6 digit PIN"),
});

export async function POST(request: Request) {
  try {
    // 1. Verifikasi Sesi Petugas
    const sessionToken = extractTokenFromRequest(request);
    if (!sessionToken) {
      return NextResponse.json({ message: "Unauthorized: Token sesi tidak ditemukan" }, { status: 401 });
    }

    const session = verifySessionToken(sessionToken);
    if (session.role !== "petugas" && session.role !== "admin") {
      return NextResponse.json({ message: "Forbidden: Hanya petugas medis yang diizinkan" }, { status: 403 });
    }

    // Ambil profil PetugasFaskes
    let petugas = await prisma.petugasFaskes.findUnique({
      where: { userId: session.sub },
    });

    // Fallback jika belum lengkap (demo PekanIT)
    if (!petugas) {
      petugas = await prisma.petugasFaskes.create({
        data: {
          userId: session.sub,
          licenseNo: `STR-${crypto.randomBytes(4).toString("hex").toUpperCase()}`,
          faskesName: "Puskesmas Pekan Baru",
          faskesType: "PUSKESMAS",
        },
      });
    }

    // 2. Validasi input NIK dan PIN Cadangan
    const body = await request.json();
    const parsed = fallbackAccessSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { nik, kodeCadangan } = parsed.data;

    // 3. Verifikasi Pasien di Database
    const pasien = await prisma.pasien.findUnique({
      where: { nik },
      include: { user: true },
    });

    if (!pasien) {
      return NextResponse.json({ message: "Pasien dengan NIK tersebut tidak ditemukan" }, { status: 404 });
    }

    if (pasien.kodeCadangan !== kodeCadangan) {
      return NextResponse.json({ message: "Kode cadangan PIN yang dimasukkan salah" }, { status: 400 });
    }

    // 4. Buat Sesi TokenAkses Temporer (24 Jam)
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // +24 jam

    await prisma.tokenAkses.create({
      data: {
        pasienId: pasien.id,
        petugasId: petugas.id,
        token,
        expiresAt,
      },
    });

    // 5. Catat LogAkses
    await prisma.logAkses.create({
      data: {
        pasienId: pasien.id,
        petugasId: petugas.id,
        aksi: "READ_MEDIS",
      },
    });

    return NextResponse.json(
      {
        message: "Akses diizinkan",
        accessToken: token,
        expiresAt,
        pasien: {
          id: pasien.id,
          name: pasien.user.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Gagal melakukan otorisasi fallback:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
