import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Masuk Petugas — Medivita Rekam Medis Jalan",
  description:
    "Portal login untuk Petugas Fasilitas Kesehatan (Faskes). Masuk dengan akun terdaftar untuk mengakses data rekam medis pasien secara aman.",
};

export default function LoginPage() {
  return <LoginForm />;
}
