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

    // 2. Ambil TokenAkses yang aktif (belum dicabut & belum kedaluwarsa)
    const activeTokens = await prisma.tokenAkses.findMany({
      where: {
        pasienId: pasien.id,
        isRevoked: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        petugas: {
          select: {
            id: true,
            faskesName: true,
            licenseNo: true,
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

    // 3. Format hasil tokens
    const formattedTokens = activeTokens.map((tokenRecord) => ({
      id: tokenRecord.id,
      petugasId: tokenRecord.petugasId,
      doctorName: tokenRecord.petugas.user.name,
      licenseNo: tokenRecord.petugas.licenseNo,
      facilityName: tokenRecord.petugas.faskesName,
      createdAt: tokenRecord.createdAt,
      expiresAt: tokenRecord.expiresAt,
    }));

    return NextResponse.json({ tokens: formattedTokens }, { status: 200 });
  } catch (error) {
    console.error("Gagal mengambil token akses aktif pasien:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
