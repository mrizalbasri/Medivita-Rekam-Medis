import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";
import { verifyQrToken } from "@/lib/qr";

export const runtime = "nodejs";

const startAccessSchema = z.object({
  qrToken: z.string().trim().min(1, "QR Token wajib diisi"),
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

    // Dummy fallback jika profil petugas belum lengkap di DB (untuk keperluan PekanIT demo)
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

    // 2. Validasi input
    const body = await request.json();
    const parsed = startAccessSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { qrToken } = parsed.data;

    // 3. Dekode & Verifikasi JWT QR Token Pasien
    let decoded;
    try {
      decoded = verifyQrToken(qrToken);
    } catch {
      return NextResponse.json({ message: "QR Code tidak valid atau sudah kedaluwarsa" }, { status: 400 });
    }

    const { pasienId, qrToken: rawQrToken } = decoded;

    // 4. Verifikasi Pasien di Database
    const pasien = await prisma.pasien.findUnique({
      where: { id: pasienId },
      include: { user: true },
    });

    if (!pasien || pasien.qrToken !== rawQrToken) {
      return NextResponse.json({ message: "Data pasien tidak ditemukan atau QR tidak cocok" }, { status: 404 });
    }

    // 5. Buat Sesi TokenAkses Temporer (24 Jam)
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

    // 6. Catat LogAkses
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
    console.error("Failed to start access:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
