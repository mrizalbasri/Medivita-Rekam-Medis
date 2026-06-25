import { NextResponse } from "next/server";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function PUT(request: Request) {
  try {
    const token = extractTokenFromRequest(request);

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const session = verifySessionToken(token);
    if (!session || !session.sub) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Password lama dan baru wajib diisi" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "Password baru minimal 8 karakter" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.sub },
    });

    if (!user) {
      return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Password lama tidak sesuai" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: session.sub },
      data: { passwordHash: newPasswordHash },
    });

    return NextResponse.json(
      { message: "Password berhasil diperbarui" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password Update Error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
