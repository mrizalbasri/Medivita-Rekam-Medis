import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import {
  extractTokenFromRequest,
  verifySessionToken,
  verifyPassword,
  hashPassword,
} from "@/lib/auth";

export const runtime = "nodejs";

const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
}).refine((data) => {
  // Jika mengisi newPassword, wajib mengisi currentPassword
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  return true;
}, {
  message: "Password lama wajib diisi untuk mengganti password baru",
  path: ["currentPassword"],
});

export async function PUT(request: Request) {
  try {
    // 1. Verifikasi Sesi
    const token = extractTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized: Sesi tidak ditemukan" }, { status: 401 });
    }

    const session = verifySessionToken(token);

    // 2. Validasi input payload
    const body = await request.json();
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, currentPassword, newPassword } = parsed.data;

    // Ambil data user dari database
    const user = await prisma.user.findUnique({
      where: { id: session.sub },
    });

    if (!user) {
      return NextResponse.json({ message: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    // 3. Opsi Ganti Password
    let updatedPasswordHash: string | undefined = undefined;
    if (newPassword && currentPassword) {
      const isPasswordValid = await verifyPassword(currentPassword, user.passwordHash);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Password lama yang Anda masukkan salah" },
          { status: 400 }
        );
      }
      
      if (newPassword.length < 8) {
        return NextResponse.json(
          { message: "Password baru minimal harus 8 karakter" },
          { status: 400 }
        );
      }

      updatedPasswordHash = await hashPassword(newPassword);
    }

    // 4. Update Database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name && { name }),
        ...(updatedPasswordHash && { passwordHash: updatedPasswordHash }),
      },
    });

    return NextResponse.json(
      { message: "Profil berhasil diperbarui" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Gagal memperbarui profil:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
