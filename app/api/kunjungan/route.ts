import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";

const createVisitSchema = z.object({
  pasienId: z.string().trim().min(1, "pasienId wajib diisi"),
  keluhan: z.string().trim().min(2, "Keluhan wajib diisi"),
  diagnosis: z.string().trim().min(2, "Diagnosis wajib diisi"),
  tindakan: z.string().trim().optional(),
  resepObat: z.string().trim().optional(),
});

export async function POST(request: Request) {
  try {
    // 1. Verifikasi Sesi Petugas
    const sessionToken = extractTokenFromRequest(request);
    if (!sessionToken) {
      return NextResponse.json({ message: "Unauthorized: Sesi tidak ditemukan" }, { status: 401 });
    }

    const session = verifySessionToken(sessionToken);
    if (session.role !== "petugas" && session.role !== "admin") {
      return NextResponse.json({ message: "Forbidden: Hanya petugas medis yang diizinkan" }, { status: 403 });
    }

    // Ambil profil PetugasFaskes
    const petugas = await prisma.petugasFaskes.findUnique({
      where: { userId: session.sub },
    });

    if (!petugas) {
      return NextResponse.json({ message: "Forbidden: Profil petugas faskes tidak ditemukan" }, { status: 403 });
    }

    // 2. Validasi input
    const body = await request.json();
    const parsed = createVisitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { pasienId, keluhan, diagnosis, tindakan, resepObat } = parsed.data;

    // 3. Verifikasi Hak Akses Petugas Terhadap Pasien (Mencari TokenAkses Aktif)
    const activeToken = await prisma.tokenAkses.findFirst({
      where: {
        pasienId,
        petugasId: petugas.id,
        isRevoked: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!activeToken && session.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Anda tidak memiliki izin aktif untuk mengakses data pasien ini. Silakan scan ulang QR Code pasien." },
        { status: 403 }
      );
    }

    // 4. Tambah Riwayat Kunjungan
    const kunjungan = await prisma.riwayatKunjungan.create({
      data: {
        pasienId,
        petugasId: petugas.id,
        keluhan,
        diagnosis,
        tindakan,
        resepObat,
      },
    });

    // 5. Catat LogAkses (CREATE_KUNJUNGAN)
    await prisma.logAkses.create({
      data: {
        pasienId,
        petugasId: petugas.id,
        aksi: "CREATE_KUNJUNGAN",
      },
    });

    return NextResponse.json(
      {
        message: "Riwayat kunjungan berhasil ditambahkan",
        kunjungan,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to add visit record:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
