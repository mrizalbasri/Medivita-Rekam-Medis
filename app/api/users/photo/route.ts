import { NextResponse } from "next/server";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const token = extractTokenFromRequest(request);

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const session = verifySessionToken(token);
    if (!session || !session.sub) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Tentukan direktori upload
    const uploadDir = join(process.cwd(), "public", "uploads");
    
    // Buat direktori jika belum ada
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Buat nama file unik
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${session.sub}-${uniqueSuffix}-${file.name.replace(/\s+/g, "_")}`;
    const filePath = join(uploadDir, filename);

    // Tulis file ke public/uploads
    await writeFile(filePath, buffer);

    // Path yang akan disimpan di database
    const publicUrl = `/uploads/${filename}`;

    // Update profil user
    const updatedUser = await prisma.user.update({
      where: { id: session.sub },
      data: { profilePicture: publicUrl },
      select: {
        id: true,
        profilePicture: true,
      },
    });

    return NextResponse.json(
      { message: "Foto berhasil diunggah", profilePicture: updatedUser.profilePicture },
      { status: 200 }
    );
  } catch (error) {
    console.error("Photo Upload Error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server saat mengunggah foto" },
      { status: 500 }
    );
  }
}
