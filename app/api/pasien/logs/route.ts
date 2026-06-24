import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    // 1. Verifikasi Sesi
    const token = extractTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized: Sesi tidak ditemukan" }, { status: 401 });
    }

    const session = verifySessionToken(token);
    
    // Ambil profil Pasien dari userId sesi
    const pasien = await prisma.pasien.findUnique({
      where: { userId: session.sub },
    });

    if (!pasien) {
      return NextResponse.json({ message: "Forbidden: Profil pasien tidak ditemukan" }, { status: 403 });
    }

    // 2. Ambil LogAkses pasien ini
    const logs = await prisma.logAkses.findMany({
      where: { pasienId: pasien.id },
      include: {
        petugas: {
          select: {
            faskesName: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 3. Format hasil logs
    const formattedLogs = logs.map((log) => ({
      id: log.id,
      action: log.aksi, // "READ_MEDIS", "CREATE_KUNJUNGAN", "REVOKE_AKSES"
      doctorName: log.petugas.user.name,
      facilityName: log.petugas.faskesName,
      createdAt: log.createdAt,
    }));

    return NextResponse.json({ logs: formattedLogs }, { status: 200 });
  } catch (error) {
    console.error("Gagal mengambil log akses pasien:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
