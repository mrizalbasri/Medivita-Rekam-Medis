"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, ShieldCheckIcon, QrIcon } from "@/components/landing/icons";

type ModalType = "validation" | "pending" | null;

export default function DaftarPasien() {
  const [formData, setFormData] = useState({
    fullName: "",
    bloodType: "",
    allergies: "",
    chronic: "",
    medication: "",
  });
  const [errors, setErrors] = useState<{ fullName?: string; bloodType?: string }>({});
  const [modal, setModal] = useState<ModalType>(null);

  const validate = () => {
    const newErrors: { fullName?: string; bloodType?: string } = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi";
    }
    if (!formData.bloodType) {
      newErrors.bloodType = "Golongan darah wajib dipilih";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setModal("validation");
      return;
    }
    setModal("pending");
  };

  const handleReset = () => {
    setFormData({ fullName: "", bloodType: "", allergies: "", chronic: "", medication: "" });
    setErrors({});
  };

  const closeModal = () => setModal(null);

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f8fa]">
      {/* Modal Overlay */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(15, 30, 50, 0.55)", backdropFilter: "blur(4px)" }}
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_32px_64px_rgba(0,0,0,0.2)]"
            style={{ animation: "modalPop 0.25s cubic-bezier(0.34,1.56,0.64,1) both" }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              @keyframes modalPop {
                from { opacity: 0; transform: scale(0.88) translateY(16px); }
                to   { opacity: 1; transform: scale(1) translateY(0); }
              }
              @keyframes qrPulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50%       { opacity: 0.6; transform: scale(0.92); }
              }
            `}</style>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper hover:text-ink"
              aria-label="Tutup"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            {modal === "validation" && (
              <>
                {/* Error icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                  <svg className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>

                <h3 className="mb-1 font-display text-xl font-semibold text-ink">Data Belum Lengkap</h3>
                <p className="mb-5 text-sm leading-relaxed text-ink-soft">
                  Harap lengkapi field berikut sebelum membuat Kode QR:
                </p>

                <ul className="mb-6 flex flex-col gap-2">
                  {errors.fullName && (
                    <li className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                      {errors.fullName}
                    </li>
                  )}
                  {errors.bloodType && (
                    <li className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                      {errors.bloodType}
                    </li>
                  )}
                </ul>

                <button
                  onClick={closeModal}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                >
                  Lengkapi Data
                </button>
              </>
            )}

            {modal === "pending" && (
              <>
                {/* QR animated icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft">
                  <QrIcon
                    className="h-7 w-7 text-primary"
                    style={{ animation: "qrPulse 1.8s ease-in-out infinite" }}
                  />
                </div>

                <h3 className="mb-1 font-display text-xl font-semibold text-ink">Kode QR Belum Tersedia</h3>
                <p className="mb-5 text-sm leading-relaxed text-ink-soft">
                  Data profil Anda sudah kami terima,{" "}
                  <span className="font-semibold text-primary">{formData.fullName}</span>. Namun fitur
                  pembuatan Kode QR saat ini sedang dalam tahap pengembangan dan akan segera hadir.
                </p>

                <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/60 px-5 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary/70">
                    Yang sedang disiapkan
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5 text-sm text-ink">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                      Generate QR unik per pasien
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                      Enkripsi data end-to-end
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                      Unduh & cetak kartu kesehatan
                    </li>
                  </ul>
                </div>

                <button
                  onClick={closeModal}
                  className="w-full rounded-xl border border-line py-3 text-sm font-semibold text-ink-soft transition-colors hover:bg-paper hover:text-ink"
                >
                  Tutup
                </button>
              </>
            )}
          </div>
        </div>
      )}

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
          <h1 className="mb-4 font-display text-4xl font-semibold leading-tight text-primary-dark md:text-[2.75rem] animate-fade-in-up">
            Paspor Kesehatan Digital
          </h1>
          <p className="mb-10 text-base leading-relaxed text-ink-soft md:text-lg animate-fade-in-up [animation-delay:100ms]">
            Simpan riwayat medis Anda dengan aman. Setelah terdaftar, kode QR unik akan dibuat untuk akses layanan kesehatan instan.
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md cursor-pointer animate-fade-in-up [animation-delay:200ms]">
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

            <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-md cursor-pointer animate-fade-in-up [animation-delay:300ms]">
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
        <div className="w-full lg:w-[55%] animate-fade-in-up [animation-delay:400ms]">
          <div className="rounded-[24px] border border-line bg-white p-6 shadow-sm sm:p-10">
            <div className="mb-8 border-b border-line pb-6">
              <h2 className="font-display text-2xl font-semibold text-ink">Profil Pasien</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Lengkapi detail berikut untuk membuat kartu rekam medis Anda.
              </p>
            </div>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                    Nama Lengkap <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Contoh: Budi Santoso"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    className={`rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary ${
                      errors.fullName ? "border-red-400 bg-red-50/40 focus:border-red-400 focus:ring-red-400" : "border-line"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="flex items-center gap-1.5 text-xs text-red-500">
                      <svg className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="bloodType" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                    Golongan Darah <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="bloodType"
                    value={formData.bloodType}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, bloodType: e.target.value }));
                      if (errors.bloodType) setErrors((prev) => ({ ...prev, bloodType: undefined }));
                    }}
                    className={`rounded-lg border px-4 py-2.5 text-sm text-ink outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary ${
                      errors.bloodType ? "border-red-400 bg-red-50/40 focus:border-red-400 focus:ring-red-400" : "border-line"
                    }`}
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
                  {errors.bloodType && (
                    <p className="flex items-center gap-1.5 text-xs text-red-500">
                      <svg className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.bloodType}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="allergies" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  Alergi &amp; Peringatan
                </label>
                <div className="relative">
                  <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-primary"></div>
                  <textarea
                    id="allergies"
                    rows={3}
                    placeholder="Tuliskan alergi obat, makanan, atau lingkungan..."
                    value={formData.allergies}
                    onChange={(e) => setFormData((prev) => ({ ...prev, allergies: e.target.value }))}
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
                    value={formData.chronic}
                    onChange={(e) => setFormData((prev) => ({ ...prev, chronic: e.target.value }))}
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
                    value={formData.medication}
                    onChange={(e) => setFormData((prev) => ({ ...prev, medication: e.target.value }))}
                    className="rounded-lg border border-line px-4 py-2.5 text-sm outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl border border-line px-6 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-paper hover:text-ink"
                >
                  Ulangi
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_4px_20px_rgba(38,130,179,0.4)] hover:opacity-90 active:scale-95"
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
