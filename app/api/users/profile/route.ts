import { NextResponse } from "next/server";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ message: "Nama dan email wajib diisi" }, { status: 400 });
    }

    // Periksa apakah email sudah digunakan oleh user lain
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.id !== session.sub) {
      return NextResponse.json({ message: "Email sudah digunakan" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.sub },
      data: { name, email },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
      },
    });

    return NextResponse.json(
      { message: "Profil berhasil diperbarui", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
