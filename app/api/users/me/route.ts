import { NextResponse } from "next/server";

import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encryption";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const token = extractTokenFromRequest(request);

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const session = verifySessionToken(token);

    const user = await prisma.user.findUnique({
      where: { id: session.sub },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        pasien: {
          select: {
            id: true,
            nik: true,
            birthDate: true,
            gender: true,
            encryptedMedicalData: true,
            qrToken: true,
          },
        },
        petugas: {
          select: {
            id: true,
            faskesName: true,
            faskesType: true,
            licenseNo: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Jika pengguna adalah pasien, dekripsi data medisnya di sisi server
    if (user.role === "pasien" && user.pasien) {
      let medicalData = null;
      if (user.pasien.encryptedMedicalData) {
        try {
          const decryptedString = decrypt(user.pasien.encryptedMedicalData);
          medicalData = JSON.parse(decryptedString);
        } catch (err) {
          console.error("Gagal mendekripsi data medis di API users/me:", err);
        }
      }
      // Gabungkan hasil dekripsi dan bersihkan data terenkripsi mentah dari respon
      (user.pasien as any).medicalData = medicalData;
      delete (user.pasien as any).encryptedMedicalData;
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Kesalahan pada API users/me:", error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
