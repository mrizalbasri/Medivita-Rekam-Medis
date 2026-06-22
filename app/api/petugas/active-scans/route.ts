import { NextResponse } from "next/server";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";
import { decrypt } from "@/lib/encryption";

export const runtime = "nodejs";

export async function GET(request: Request) {
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

    // 2. Ambil token akses yang aktif untuk petugas ini
    const activeTokens = await prisma.tokenAkses.findMany({
      where: {
        petugasId: petugas.id,
        isRevoked: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        pasien: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 3. Dekripsi dan format data pasien
    const patients = activeTokens.map((tokenRecord) => {
      const p = tokenRecord.pasien;
      
      // Dekripsi data medis
      let medicalData = {
        bloodType: "-",
        allergies: [] as string[],
        chronicConditions: "Tidak ada",
        routineMedications: [] as string[],
      };

      try {
        if (p.encryptedMedicalData) {
          const decryptedString = decrypt(p.encryptedMedicalData);
          const parsed = JSON.parse(decryptedString);
          medicalData = {
            bloodType: parsed.bloodType || "-",
            allergies: Array.isArray(parsed.allergies) ? parsed.allergies : (parsed.allergies ? [parsed.allergies] : []),
            chronicConditions: parsed.chronicConditions || "Tidak ada",
            routineMedications: Array.isArray(parsed.routineMedications) ? parsed.routineMedications : (parsed.routineMedications ? [parsed.routineMedications] : []),
          };
        }
      } catch (err) {
        console.error(`Gagal mendekripsi data medis untuk pasien ${p.id}:`, err);
      }

      // Hitung umur
      const birthDate = new Date(p.birthDate);
      const ageDiffMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);

      // Label kunjungan terakhir / waktu scan
      const timeAgo = Math.floor((Date.now() - tokenRecord.createdAt.getTime()) / (1000 * 60)); // dalam menit
      let lastVisitText = "Baru saja di-scan";
      if (timeAgo > 0) {
        if (timeAgo < 60) {
          lastVisitText = `Di-scan ${timeAgo} menit yang lalu`;
        } else {
          const hoursAgo = Math.floor(timeAgo / 60);
          lastVisitText = `Di-scan ${hoursAgo} jam yang lalu`;
        }
      }

      return {
        id: p.id,
        name: p.user.name,
        age,
        gender: p.gender === "L" ? "Laki-laki" : "Perempuan",
        allergy: medicalData.allergies.length > 0 ? medicalData.allergies.join(", ") : "None",
        bloodType: medicalData.bloodType,
        chronicConditions: medicalData.chronicConditions,
        emergencyContact: "0812-3456-7890 (Keluarga)", // Mock default kontak darurat
        insurance: "BPJS Kesehatan (Aktif)", // Mock default asuransi
        lastVisit: lastVisitText,
      };
    });

    return NextResponse.json({ patients }, { status: 200 });
  } catch (error) {
    console.error("Gagal memuat daftar pasien terpindai:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
