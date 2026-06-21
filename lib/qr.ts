import QRCode from "qrcode";
import jwt from "jsonwebtoken";

const QR_SECRET = process.env.JWT_SECRET;

export interface QrPayload {
  pasienId: string;
  qrToken: string;
}

function getQrSecret(): string {
  if (!QR_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }
  return QR_SECRET;
}

// Fungsi untuk menandatangani token QR menggunakan JWT agar tidak bisa dimanipulasi
export function signQrToken(pasienId: string, qrToken: string): string {
  const payload: QrPayload = { pasienId, qrToken };
  return jwt.sign(payload, getQrSecret());
}

// Fungsi untuk memverifikasi token QR
export function verifyQrToken(token: string): QrPayload {
  return jwt.verify(token, getQrSecret()) as QrPayload;
}

// Fungsi untuk generate QR Code dalam bentuk Data URL (Base64 Image) yang bisa langsung dirender di tag <img src="..." />
export async function generateQrDataUrl(qrContent: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(qrContent, {
      errorCorrectionLevel: "H", // Tingkat koreksi kesalahan tinggi agar mudah di-scan walau agak lecek
      margin: 1,
      color: {
        dark: "#0f172a",  // Slate 900
        light: "#ffffff", // Putih
      },
    });
    return dataUrl;
  } catch (error) {
    console.error("Failed to generate QR Code:", error);
    throw new Error("Failed to generate QR Code");
  }
}
