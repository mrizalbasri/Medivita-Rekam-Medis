import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Masuk Petugas — Medivita Rekam Medis Jalan",
  description:
    "Portal login untuk Petugas Fasilitas Kesehatan. Masuk untuk mengakses data rekam medis pasien secara aman dan terenkripsi.",
};

export default function LoginPage() {
  return <LoginForm />;
}
