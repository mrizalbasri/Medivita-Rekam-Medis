import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rekam Medis Jalan — Kartu Kesehatan yang Ikut Kemana Anda Pergi",
  description:
    "Rekam Medis Jalan (Medivita) menyimpan data kesehatan esensial Anda dan membuatnya bisa diakses cepat oleh fasilitas kesehatan manapun lewat satu kali pindai QR — aman, terenkripsi, dan dikontrol penuh oleh Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
