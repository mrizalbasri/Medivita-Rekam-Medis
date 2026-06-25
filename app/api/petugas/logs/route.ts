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

    // Ambil log akses yang dilakukan oleh petugas ini
    const logs = await prisma.logAkses.findMany({
      where: {
        petugasId: currentPetugas.id,
      },
      include: {
        pasien: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100, // batasi ke 100 aktivitas terbaru
    });

    // Format data agar bersih dan mudah dibaca
    const formattedLogs = logs.map((l) => ({
      id: l.id,
      patientName: l.pasien.user.name,
      patientNik: l.pasien.nik.slice(0, 6) + "**********", // Sembunyikan sebagian NIK untuk privasi
      action: l.aksi,
      timestamp: l.createdAt.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) + " " + l.createdAt.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    return NextResponse.json({ logs: formattedLogs }, { status: 200 });
  } catch (error) {
    console.error("Gagal memuat log akses:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
