"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const C = {
  blue: "#4fa0e0",
  blueDark: "#1a3a6e",
  teal: "#2AACAB",
  tealDark: "#1b8786",
  tealSoft: "#d4f0ef",
  green: "#5DB870",
  greenSoft: "#e2f5e7",
  ink: "#1a3347",
  inkSoft: "#4a6070",
  line: "#d8eaea",
  paper: "#f2f8f8",
  alert: "#d32f2f",
  alertSoft: "#fdebec",
} as const;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email tidak boleh kosong");
      return;
    }

    setLoading(true);
    setError("");

    // Simulasi pengiriman reset password (3-step demo-friendly)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f4f8fa] px-6 py-12">
      <div className="w-full max-w-[440px] rounded-3xl border border-line bg-white p-8 shadow-md">
        {/* Logo */}
        <div className="mx-auto mb-6 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-9 w-14 overflow-hidden">
              <Image
                src="/logo.webp"
                alt="Medivita Logo"
                fill
                sizes="56px"
                className="object-cover object-left"
                priority
              />
            </div>
            <span className="h-6 w-[1px] bg-line/80" />
            <div className="flex flex-col leading-tight mt-0.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-ink-soft">
                Rekam Medis
              </span>
              <span className="text-[13px] font-bold tracking-tight text-primary-dark" style={{ color: C.blueDark }}>
                Jalan
              </span>
            </div>
          </Link>
        </div>

        {submitted ? (
          <div className="text-center animate-[fadeIn_0.3s_ease]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-ink mb-2">Instruksi Dikirim!</h2>
            <p className="text-sm text-ink-soft mb-6 leading-relaxed">
              Kami telah mengirimkan tautan untuk menyetel ulang password ke alamat email:
              <br />
              <strong className="text-ink break-all">{email}</strong>
            </p>
            <p className="text-xs text-ink-soft mb-6 bg-paper p-3 rounded-xl border border-line">
              Catatan Demo: Periksa kotak masuk Anda. Tautan ini akan kedaluwarsa dalam 1 jam.
            </p>
            <Link
              href="/login"
              className="inline-block w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white hover:bg-accent/90 transition-colors text-center"
              style={{ backgroundColor: C.blue }}
            >
              Kembali ke Halaman Masuk
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-ink text-center mb-1">Lupa Password?</h2>
            <p className="text-xs text-ink-soft text-center mb-6 leading-relaxed">
              Masukkan alamat email Anda yang terdaftar di Medivita. Kami akan mengirimkan instruksi untuk menyetel ulang kata sandi.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-xs font-semibold text-ink mb-1.5">
                  Alamat Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  placeholder="Masukkan email Anda..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full rounded-xl border border-line px-4 py-3 text-sm focus:border-accent focus:outline-none transition-colors"
                  style={{ borderColor: error ? C.alert : undefined }}
                  disabled={loading}
                />
                {error && (
                  <p className="text-xs text-alert mt-1 flex items-center gap-1" style={{ color: C.alert }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all text-center flex items-center justify-center gap-2"
                style={{
                  backgroundColor: C.blue,
                  boxShadow: `0 4px 18px rgba(79, 160, 224, 0.25)`,
                }}
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <span>Kirim Tautan Reset</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-xs font-semibold text-accent hover:underline" style={{ color: C.blue }}>
                Kembali ke Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
