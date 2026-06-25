import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request) {
  // Middleware already validated token & pasien role
  const tokenCookie = request.headers.get("cookie")?.match(/session_token=([^;]+)/);
  const token = tokenCookie ? tokenCookie[1] : null;
  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

  // Decode JWT (same helper as other routes)
  function decodeJwt(t: string) {
    try {
      const parts = t.split(".");
      if (parts.length !== 3) return null;
      const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const json = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(json);
    } catch { return null; }
  }

  const payload = decodeJwt(token);
  if (!payload || payload.role !== "pasien") return NextResponse.json({ error: "Invalid role" }, { status: 403 });

  const userId = payload.sub;

  // Delete all patient‑related records
  await prisma.logAkses.deleteMany({ where: { pasien: { userId } } });
  await prisma.tokenAkses.deleteMany({ where: { pasien: { userId } } });
  await prisma.riwayatKunjungan.deleteMany({ where: { pasien: { userId } } });
  await prisma.pasien.deleteMany({ where: { userId } });
  await prisma.user.delete({ where: { id: userId } });

  return NextResponse.json({ success: true });
}
