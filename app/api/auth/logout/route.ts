import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout berhasil" },
      { status: 200 }
    );

    // Hapus cookie session dengan mengatur maxAge ke 0
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // Hapus seketika
    });

    return response;
  } catch (error) {
    console.error("Gagal melakukan logout:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
