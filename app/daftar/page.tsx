"use client";

import Image from "next/image";
import Link from "next/link";
import { CloseIcon, ShieldCheckIcon, QrIcon } from "@/components/landing/icons";

export default function DaftarPasien() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f8fa]">
      {/* Header */}
      <header className="flex w-full items-center justify-between border-b border-line bg-white px-6 py-4 md:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative h-12 w-28 sm:h-14 sm:w-32 flex-shrink-0">
            <Image
              src="/logo.webp"
              alt="Medivita Logo"
              fill
              className="object-contain object-left scale-110 origin-left"
              priority
            />
          </div>
          <span className="h-8 w-[1.5px] bg-line/80" aria-hidden />
          <div className="flex flex-col leading-tight mt-0.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-soft">
              Rekam Medis
            </span>
            <span className="text-[15px] font-bold tracking-tight text-primary-dark">
              Jalan
            </span>
          </div>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-ink-soft transition-colors hover:text-ink hover:bg-line/50 px-3 py-2 rounded-lg"
        >
          <CloseIcon className="h-4 w-4" />
          Batal Registrasi
        </Link>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center gap-12 px-6 py-12 lg:flex-row lg:items-start lg:gap-20 lg:py-24">
        
        {/* Left Column - Information */}
        <div className="flex w-full flex-col lg:w-[45%] lg:pt-8">
          <h1 className="mb-4 font-display text-4xl font-semibold leading-tight text-primary-dark md:text-[2.75rem]">
            Paspor Kesehatan Digital
          </h1>
          <p className="mb-10 text-base leading-relaxed text-ink-soft md:text-lg">
            Simpan riwayat medis Anda dengan aman. Setelah terdaftar, kode QR unik akan dibuat untuk akses layanan kesehatan instan.
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md cursor-pointer">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <ShieldCheckIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-ink transition-colors group-hover:text-primary">Privasi Data</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  Rekam medis dienkripsi end-to-end dan hanya dapat diakses dengan otorisasi Anda.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-md cursor-pointer">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <QrIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-ink transition-colors group-hover:text-accent">Portabilitas Instan</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  Unduh atau cetak kode QR Anda untuk membawa riwayat medis Anda ke mana saja.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-[55%]">
          <div className="rounded-[24px] border border-line bg-white p-6 shadow-sm sm:p-10">
            <div className="mb-8 border-b border-line pb-6">
              <h2 className="font-display text-2xl font-semibold text-ink">Profil Pasien</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Lengkapi detail berikut untuk membuat kartu rekam medis Anda.
              </p>
            </div>

            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Contoh: Budi Santoso"
                    className="rounded-lg border border-line px-4 py-2.5 text-sm outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="bloodType" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                    Golongan Darah
                  </label>
                  <select
                    id="bloodType"
                    className="rounded-lg border border-line px-4 py-2.5 text-sm text-ink outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-ink-soft">
                      Pilih Golongan Darah
                    </option>
                    <option value="A+">A Positif</option>
                    <option value="A-">A Negatif</option>
                    <option value="B+">B Positif</option>
                    <option value="B-">B Negatif</option>
                    <option value="AB+">AB Positif</option>
                    <option value="AB-">AB Negatif</option>
                    <option value="O+">O Positif</option>
                    <option value="O-">O Negatif</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="allergies" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  Alergi & Peringatan
                </label>
                <div className="relative">
                  <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-primary"></div>
                  <textarea
                    id="allergies"
                    rows={3}
                    placeholder="Tuliskan alergi obat, makanan, atau lingkungan..."
                    className="w-full resize-none rounded-lg border border-line pl-5 pr-4 py-3 text-sm outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="chronic" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                    Penyakit Kronis
                  </label>
                  <input
                    type="text"
                    id="chronic"
                    placeholder="Contoh: Hipertensi, Diabetes"
                    className="rounded-lg border border-line px-4 py-2.5 text-sm outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="medication" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                    Obat Rutin
                  </label>
                  <input
                    type="text"
                    id="medication"
                    placeholder="Contoh: Metformin 500mg"
                    className="rounded-lg border border-line px-4 py-2.5 text-sm outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-3 pt-4">
                <button
                  type="reset"
                  className="rounded-xl border border-line px-6 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-paper hover:text-ink"
                >
                  Ulangi
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-[#0a2835] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark/90 active:scale-95"
                >
                  Buat QR
                  <QrIcon className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-line bg-[#e8f1f5] px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col gap-1">
            <span className="font-display font-bold tracking-widest text-[#1e77b0]">
              MEDIVITA
            </span>
            <span className="text-xs text-ink-soft">
              &copy; 2026 Rekam Medis Jalan (Medivita). PekanIT 2026 Credits.
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-semibold text-ink-soft">
            <Link href="#" className="hover:text-primary">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-primary">Pusat Bantuan</Link>
            <Link href="mailto:hello@medivita.id" className="hover:text-primary">Kontak</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
