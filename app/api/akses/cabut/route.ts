import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";

const revokeAccessSchema = z.object({
  petugasId: z.string().trim().optional(),
  tokenId: z.string().trim().optional(),
});

export async function POST(request: Request) {
  try {
    // 1. Verifikasi Sesi Pengguna (harus pasien atau admin)
    const sessionToken = extractTokenFromRequest(request);
    if (!sessionToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const session = verifySessionToken(sessionToken);
    
    // Ambil profil Pasien yang sedang login
    const pasien = await prisma.pasien.findUnique({
      where: { userId: session.sub },
    });

    if (!pasien && session.role !== "admin") {
      return NextResponse.json({ message: "Forbidden: Hanya pasien pemilik data yang diizinkan" }, { status: 403 });
    }

    // 2. Validasi input
    const body = await request.json();
    const parsed = revokeAccessSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { petugasId, tokenId } = parsed.data;

    if (!petugasId && !tokenId) {
      return NextResponse.json({ message: "Harus menyertakan petugasId atau tokenId" }, { status: 400 });
    }

    // 3. Cabut akses di database
    let updatedCount = 0;
    let targetPetugasId = petugasId;

    if (tokenId) {
      const tokenRecord = await prisma.tokenAkses.findUnique({
        where: { id: tokenId },
      });
      if (tokenRecord) {
        if (session.role !== "admin" && tokenRecord.pasienId !== pasien?.id) {
          return NextResponse.json({ message: "Forbidden: Bukan pemilik rekam medis" }, { status: 403 });
        }
        targetPetugasId = tokenRecord.petugasId;
        await prisma.tokenAkses.update({
          where: { id: tokenId },
          data: { isRevoked: true },
        });
        updatedCount = 1;
      }
    } else if (petugasId && pasien) {
      const updateResult = await prisma.tokenAkses.updateMany({
        where: {
          pasienId: pasien.id,
          petugasId: petugasId,
          isRevoked: false,
        },
        data: {
          isRevoked: true,
        },
      });
      updatedCount = updateResult.count;
    }

    // 4. Catat LogAkses (REVOKE_AKSES) jika pencabutan berhasil
    if (updatedCount > 0 && pasien && targetPetugasId) {
      await prisma.logAkses.create({
        data: {
          pasienId: pasien.id,
          petugasId: targetPetugasId,
          aksi: "REVOKE_AKSES",
        },
      });
    }

    return NextResponse.json(
      {
        message: "Hak akses berhasil dicabut",
        revokedCount: updatedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to revoke access:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
