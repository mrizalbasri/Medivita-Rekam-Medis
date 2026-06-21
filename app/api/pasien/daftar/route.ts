import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { hashPassword, signSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { encrypt } from "@/lib/encryption";
import { signQrToken } from "@/lib/qr";

export const runtime = "nodejs";

const registerPatientSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid").transform((v) => v.toLowerCase().trim()),
  password: z.string().min(8, "Password minimal 8 karakter"),
  nik: z.string().trim().length(16, "NIK harus tepat 16 digit"),
  birthDate: z.string().transform((v) => new Date(v)),
  gender: z.enum(["L", "P"]),
  bloodType: z.string().trim().min(1, "Golongan darah wajib diisi"),
  allergies: z.array(z.string()).optional().default([]),
  chronicConditions: z.string().trim().optional().default("Tidak ada"),
  routineMedications: z.array(z.string()).optional().default([]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerPatientSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      password,
      nik,
      birthDate,
      gender,
      bloodType,
      allergies,
      chronicConditions,
      routineMedications,
    } = parsed.data;

    // Cek duplikasi email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json({ message: "Email sudah terdaftar" }, { status: 409 });
    }

    // Cek duplikasi NIK
    const existingPatient = await prisma.pasien.findUnique({
      where: { nik },
    });
    if (existingPatient) {
      return NextResponse.json({ message: "NIK sudah terdaftar" }, { status: 409 });
    }

    // Hash password & Encrypt data medis
    const passwordHash = await hashPassword(password);
    
    const medicalData = {
      bloodType,
      allergies,
      chronicConditions,
      routineMedications,
    };
    const encryptedMedicalData = encrypt(JSON.stringify(medicalData));

    // Generate unique qrToken & backup code
    const rawQrToken = `qr_${crypto.randomBytes(16).toString("hex")}`;
    const kodeCadangan = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit PIN

    // Database transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: "pasien",
        },
      });

      const pasien = await tx.pasien.create({
        data: {
          userId: user.id,
          nik,
          birthDate,
          gender,
          encryptedMedicalData,
          qrToken: rawQrToken,
          kodeCadangan,
        },
      });

      return { user, pasien };
    });

    // Sign QR token (dengan JWT signature agar secure)
    const signedQrToken = signQrToken(result.pasien.id, rawQrToken);

    // Sign session token untuk login otomatis
    const sessionToken = signSessionToken({
      sub: result.user.id,
      email: result.user.email,
      role: result.user.role,
    });

    const response = NextResponse.json(
      {
        message: "Pendaftaran pasien berhasil",
        pasien: {
          id: result.pasien.id,
          name: result.user.name,
          email: result.user.email,
          nik: result.pasien.nik,
          qrToken: signedQrToken,
          kodeCadangan: result.pasien.kodeCadangan,
        },
      },
      { status: 201 }
    );

    // Set cookie sesi
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    return response;
  } catch (error) {
    console.error("Failed to register patient:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
