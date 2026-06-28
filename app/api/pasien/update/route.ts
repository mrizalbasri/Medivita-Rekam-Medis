import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";
import { encrypt } from "@/lib/encryption";

export const runtime = "nodejs";

const updateMedicalDataSchema = z.object({
  bloodType: z.string().trim().min(1, "Golongan darah wajib diisi"),
  allergies: z.array(z.string()).optional().default([]),
  chronicConditions: z.string().trim().optional().default("Tidak ada"),
  routineMedications: z.array(z.string()).optional().default([]),
  telepon: z.string().optional().default(""),
  alamat: z.string().optional().default(""),
  tinggiBadan: z.string().optional().default(""),
  beratBadan: z.string().optional().default(""),
  tekananDarah: z.string().optional().default(""),
  catatanTambahan: z.string().optional().default(""),
});

export async function PUT(request: Request) {
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

    // 2. Validasi input payload
    const body = await request.json();
    const parsed = updateMedicalDataSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      bloodType,
      allergies,
      chronicConditions,
      routineMedications,
      telepon,
      alamat,
      tinggiBadan,
      beratBadan,
      tekananDarah,
      catatanTambahan,
    } = parsed.data;

    // 3. Enkripsi ulang data medis
    const medicalData = {
      bloodType,
      allergies,
      chronicConditions,
      routineMedications,
      telepon,
      alamat,
      tinggiBadan,
      beratBadan,
      tekananDarah,
      catatanTambahan,
    };
    const encryptedMedicalData = encrypt(JSON.stringify(medicalData));

    // 4. Update data di database
    await prisma.pasien.update({
      where: { id: pasien.id },
      data: {
        encryptedMedicalData,
      },
    });

    return NextResponse.json(
      { message: "Data medis berhasil diperbarui" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Gagal memperbarui data medis pasien:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
