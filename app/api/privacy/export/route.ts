import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";
import { decrypt } from "@/lib/encryption";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const token = extractTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const session = verifySessionToken(token);
    if (session.role !== "pasien" && session.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Cari data pasien berdasarkan userId dari token
    const pasien = await prisma.pasien.findUnique({
      where: { userId: session.sub },
      include: {
        user: { select: { name: true, email: true, createdAt: true } },
        kunjungan: {
          orderBy: { tanggal: "desc" },
          include: {
            petugas: {
              select: {
                faskesName: true,
                faskesType: true,
                user: { select: { name: true } },
              },
            },
          },
        },
        logAkses: {
          orderBy: { createdAt: "desc" },
          take: 20,
          include: {
            petugas: {
              select: { faskesName: true, user: { select: { name: true } } },
            },
          },
        },
      },
    });

    if (!pasien) {
      return NextResponse.json({ message: "Data pasien tidak ditemukan" }, { status: 404 });
    }

    // Dekripsi data medis
    let medicalData = null;
    try {
      medicalData = JSON.parse(decrypt(pasien.encryptedMedicalData));
    } catch {
      medicalData = null;
    }

    const exportData = {
      exportedAt: new Date().toISOString(),
      profil: {
        nama: pasien.user.name,
        email: pasien.user.email,
        nik: pasien.nik,
        tanggalLahir: pasien.birthDate,
        jenisKelamin: pasien.gender,
        terdaftarSejak: pasien.user.createdAt,
      },
      dataMedis: medicalData,
      riwayatKunjungan: pasien.kunjungan.map((k) => ({
        tanggal: k.tanggal,
        faskes: k.petugas.faskesName,
        tipe: k.petugas.faskesType,
        dokter: k.petugas.user.name,
        keluhan: k.keluhan,
        diagnosis: k.diagnosis,
        tindakan: k.tindakan,
        resepObat: k.resepObat,
      })),
      logAkses: pasien.logAkses.map((l) => ({
        waktu: l.createdAt,
        aksi: l.aksi,
        faskes: l.petugas.faskesName,
        dokter: l.petugas.user.name,
      })),
    };

    // Catat log ekspor (hanya jika diakses oleh admin/petugas faskes yang memiliki profil PetugasFaskes)
    if (session.role === "admin") {
      const petugas = await prisma.petugasFaskes.findUnique({
        where: { userId: session.sub },
      });
      if (petugas) {
        await prisma.logAkses.create({
          data: {
            pasienId: pasien.id,
            petugasId: petugas.id,
            aksi: "EXPORT_DATA",
          },
        }).catch(() => {});
      }
    }

    return NextResponse.json({ data: exportData }, { status: 200 });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
