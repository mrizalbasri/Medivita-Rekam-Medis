import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "session_token";

// Helper sederhana untuk mendecode payload JWT di Edge Runtime (tanpa dependensi Node.js crypto)
function decodeJwt(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    // Decode base64url ke string UTF-8
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Ambil token dari cookie
  const tokenCookie = request.cookies.get(SESSION_COOKIE_NAME);
  const token = tokenCookie?.value;

  // 1. Proteksi Rute Petugas Faskes
  if (pathname.startsWith("/petugas")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = decodeJwt(token);
    if (!payload || (payload.role !== "petugas" && payload.role !== "admin")) {
      // Sesi tidak valid atau bukan petugas/admin -> tendang ke login faskes
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(SESSION_COOKIE_NAME); // Bersihkan token rusak
      return response;
    }
  }

  // 2. Proteksi Rute Pasien (semua path di bawah /pasien)
  if (pathname.startsWith("/pasien")) {
    if (!token) {
      // Tidak ada token, arahkan ke halaman login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = decodeJwt(token);
    if (!payload || (payload.role !== "pasien" && payload.role !== "admin")) {
      // Sesi tidak valid atau bukan pasien/admin -> arahkan ke login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(SESSION_COOKIE_NAME); // Bersihkan token rusak
      return response;
    }
  }

  return NextResponse.next();
}

// Konfigurasi Matcher agar middleware hanya berjalan pada rute tertentu
export const config = {
  matcher: [
    "/petugas/:path*",
    "/pasien/:path*",
  ],
};
