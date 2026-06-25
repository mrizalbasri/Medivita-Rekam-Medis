import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const sessionToken = extractTokenFromRequest(request);
    if (!sessionToken) {
      return NextResponse.json({ message: "Unauthorized: Sesi tidak ditemukan" }, { status: 401 });
    }

    const session = verifySessionToken(sessionToken);
    if (session.role !== "petugas" && session.role !== "admin") {
      return NextResponse.json({ message: "Forbidden: Akses ditolak" }, { status: 403 });
    }

    // Ambil info petugas yang sedang login
    const currentPetugas = await prisma.petugasFaskes.findUnique({
      where: { userId: session.sub },
    });

    if (!currentPetugas) {
      return NextResponse.json({ message: "Petugas tidak ditemukan" }, { status: 404 });
    }

    // Ambil semua petugas yang bekerja di faskes yang sama
    const workers = await prisma.petugasFaskes.findMany({
      where: {
        faskesName: currentPetugas.faskesName,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        user: {
          name: "asc",
        },
      },
    });

    // Format data agar bersih
    const formattedWorkers = workers.map((w) => ({
      id: w.id,
      name: w.user.name,
      email: w.user.email,
      licenseNo: w.licenseNo,
      faskesName: w.faskesName,
      faskesType: w.faskesType,
      joinedAt: w.createdAt.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }));

    return NextResponse.json({
      workers: formattedWorkers,
      facility: {
        name: currentPetugas.faskesName,
        type: currentPetugas.faskesType,
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Gagal memuat daftar nakes:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
