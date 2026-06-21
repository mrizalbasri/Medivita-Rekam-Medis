import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";
import { decrypt } from "@/lib/encryption";

export const runtime = "nodejs";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const { id: pasienId } = await params;

    // 1. Verifikasi Sesi Pengguna
    const sessionToken = extractTokenFromRequest(request);
    if (!sessionToken) {
      return NextResponse.json({ message: "Unauthorized: Sesi tidak ditemukan" }, { status: 401 });
    }

    const session = verifySessionToken(sessionToken);

    // Ambil data Pasien
    const pasien = await prisma.pasien.findUnique({
      where: { id: pasienId },
      include: { user: true },
    });

    if (!pasien) {
      return NextResponse.json({ message: "Pasien tidak ditemukan" }, { status: 404 });
    }

    // 2. Evaluasi Hak Akses
    let isAllowed = false;

    // Skenario A: Pemilik rekam medis (Pasien itu sendiri)
    if (pasien.userId === session.sub) {
      isAllowed = true;
    } 
    // Skenario B: Petugas Medis
    else if (session.role === "petugas" || session.role === "admin") {
      // Ambil profil Petugas
      const petugas = await prisma.petugasFaskes.findUnique({
        where: { userId: session.sub },
      });

      if (petugas) {
        // Cari TokenAkses aktif
        const activeToken = await prisma.tokenAkses.findFirst({
          where: {
            pasienId: pasien.id,
            petugasId: petugas.id,
            isRevoked: false,
            expiresAt: {
              gt: new Date(),
            },
          },
        });
        
        if (activeToken || session.role === "admin") {
          isAllowed = true;
        }
      }
    }

    if (!isAllowed) {
      return NextResponse.json(
        { message: "Forbidden: Anda tidak memiliki akses ke rekam medis pasien ini" },
        { status: 403 }
      );
    }

    // 3. Dekripsi Data Medis Esensial
    let decryptedMedicalData = null;
    try {
      const decryptedString = decrypt(pasien.encryptedMedicalData);
      decryptedMedicalData = JSON.parse(decryptedString);
    } catch (err) {
      console.error("Gagal mendekripsi data medis pasien:", err);
      return NextResponse.json({ message: "Kesalahan internal dekripsi rekam medis" }, { status: 500 });
    }

    // 4. Ambil Riwayat Kunjungan
    const riwayatKunjungan = await prisma.riwayatKunjungan.findMany({
      where: { pasienId: pasien.id },
      orderBy: { tanggal: "desc" },
      include: {
        petugas: {
          select: {
            faskesName: true,
            user: {
              select: { name: true }
            }
          }
        }
      }
    });

    // Format riwayat kunjungan agar rapi
    const history = riwayatKunjungan.map((k) => ({
      id: k.id,
      facility: `${k.petugas.faskesName}`,
      doctorName: k.petugas.user.name,
      date: k.tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      keluhan: k.keluhan,
      diagnosis: k.diagnosis,
      tindakan: k.tindakan,
      resepObat: k.resepObat ? k.resepObat.split(", ").map(r => r.trim()).filter(Boolean) : [],
    }));

    // 5. Catat LogAkses (READ_MEDIS)
    if (session.role === "petugas" || session.role === "admin") {
      const petugas = await prisma.petugasFaskes.findUnique({
        where: { userId: session.sub },
      });
      if (petugas) {
        await prisma.logAkses.create({
          data: {
            pasienId: pasien.id,
            petugasId: petugas.id,
            aksi: "READ_MEDIS",
          },
        });
      }
    }

    return NextResponse.json(
      {
        pasien: {
          id: pasien.id,
          name: pasien.user.name,
          nik: pasien.nik,
          birthDate: pasien.birthDate,
          gender: pasien.gender,
          medicalData: decryptedMedicalData,
          history,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch patient details:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
