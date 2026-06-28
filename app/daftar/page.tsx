"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, ShieldCheckIcon, QrIcon } from "@/components/landing/icons";
import { validateRegisterField } from "@/lib/validations/register";

const WARN_D = "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z";
const EYE_D = ["M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"];
const EYE_OFF_D = ["M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"];

function FieldError({ id, msg }: { id: string; msg: string }) {
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 text-xs mt-1.5 text-red-500 animate-[fadeIn_0.15s_ease]">
      <svg width={12} height={12} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d={WARN_D} />
      </svg>
      {msg}
    </p>
  );
}

export default function DaftarPasien() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    nik: "",
    birthDate: "",
    gender: "" as "L" | "P" | "",
    bloodType: "",
    allergies: "",
    chronicConditions: "",
    routineMedications: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    nik: false,
    birthDate: false,
    gender: false,
    bloodType: false,
  });

  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  // Derived error calculations
  const errors = {
    name: touched.name ? validateRegisterField("name", form.name) : "",
    email: touched.email ? validateRegisterField("email", form.email) : "",
    password: touched.password ? validateRegisterField("password", form.password) : "",
    nik: touched.nik ? validateRegisterField("nik", form.nik) : "",
    birthDate: touched.birthDate ? validateRegisterField("birthDate", form.birthDate) : "",
    gender: touched.gender ? validateRegisterField("gender", form.gender) : "",
    bloodType: touched.bloodType ? validateRegisterField("bloodType", form.bloodType) : "",
  };

  const hasErrors = !!(
    errors.name ||
    errors.email ||
    errors.password ||
    errors.nik ||
    errors.birthDate ||
    errors.gender ||
    errors.bloodType
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setServerMsg(null);
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      setTouched((p) => ({ ...p })); // trigger re-render to update errors
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name } = e.target;
    if (name in touched) {
      setTouched((p) => ({ ...p, [name]: true }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerMsg(null);

    // Touch all required fields
    const allTouched = {
      name: true,
      email: true,
      password: true,
      nik: true,
      birthDate: true,
      gender: true,
      bloodType: true,
    };
    setTouched(allTouched);

    // Recheck errors
    const nameErr = validateRegisterField("name", form.name);
    const emailErr = validateRegisterField("email", form.email);
    const pwErr = validateRegisterField("password", form.password);
    const nikErr = validateRegisterField("nik", form.nik);
    const birthErr = validateRegisterField("birthDate", form.birthDate);
    const genErr = validateRegisterField("gender", form.gender);
    const bloodErr = validateRegisterField("bloodType", form.bloodType);

    if (nameErr || emailErr || pwErr || nikErr || birthErr || genErr || bloodErr) {
      return;
    }

    setStatus("loading");

    try {
      // Split allergies & routineMedications by comma as expected by API
      const allergiesArr = form.allergies
        ? form.allergies.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const medsArr = form.routineMedications
        ? form.routineMedications.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      const payload = {
        ...form,
        allergies: allergiesArr,
        routineMedications: medsArr,
      };

      const res = await fetch("/api/pasien/daftar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setServerMsg(data.message ?? "Pendaftaran gagal. Periksa kembali data Anda.");
        return;
      }

      setStatus("success");
      setTimeout(() => {
        window.location.href = "/pasien/dashboard";
      }, 1500);
    } catch {
      setStatus("error");
      setServerMsg("Tidak dapat terhubung ke server. Silakan coba lagi.");
    }
  }

  function handleReset() {
    setForm({
      name: "",
      email: "",
      password: "",
      nik: "",
      birthDate: "",
      gender: "",
      bloodType: "",
      allergies: "",
      chronicConditions: "",
      routineMedications: "",
    });
    setTouched({
      name: false,
      email: false,
      password: false,
      nik: false,
      birthDate: false,
      gender: false,
      bloodType: false,
    });
    setServerMsg(null);
    setStatus("idle");
  }

  function inputStyle(field: keyof typeof touched): React.CSSProperties {
    const err = errors[field];
    const ok = touched[field] && !err && form[field];
    return {
      border: `1.5px solid ${err ? "#ef4444" : ok ? "#4fa0e0" : "#e2e8f0"}`,
      boxShadow: err
        ? "0 0 0 3px #fef2f2"
        : ok
        ? "0 0 0 3px #d8e5f8"
        : "none",
      outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
    };
  }

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f8fa]">
      {/* Header */}
      <header className="flex w-full items-center justify-between border-b border-line bg-white px-6 py-4 md:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative h-10 w-16 sm:h-12 sm:w-20 flex-shrink-0 overflow-hidden">
            <Image
              src="/logo.webp"
              alt="Medivita Logo"
              fill
              sizes="(max-width: 640px) 64px, 80px"
              className="object-cover object-left"
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
      <main className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center gap-12 px-6 py-12 lg:flex-row lg:items-start lg:gap-14 lg:py-20">
        
        {/* Left Column - Information */}
        <div className="flex w-full flex-col lg:w-[40%] lg:pt-8">
          <h1 className="mb-4 font-display text-4xl font-semibold leading-tight text-primary-dark md:text-[2.75rem] animate-fade-in-up">
            Paspor Kesehatan Digital
          </h1>
          <p className="mb-10 text-base leading-relaxed text-ink-soft md:text-lg animate-fade-in-up [animation-delay:100ms]">
            Simpan riwayat medis Anda dengan aman. Setelah terdaftar, kode QR unik akan dibuat untuk akses layanan kesehatan instan.
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#4fa0e0]/40 hover:shadow-md cursor-pointer animate-fade-in-up [animation-delay:200ms]">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-soft text-[#4fa0e0]">
                <ShieldCheckIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-ink transition-colors group-hover:text-primary">Privasi Data</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  Rekam medis dienkripsi end-to-end dan hanya dapat diakses dengan otorisasi Anda.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#2AACAB]/40 hover:shadow-md cursor-pointer animate-fade-in-up [animation-delay:300ms]">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-soft text-[#2AACAB]">
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
        <div className="w-full lg:w-[60%] animate-fade-in-up [animation-delay:400ms]">
          <div className="rounded-[24px] border border-line bg-white p-6 shadow-sm sm:p-10">
            <div className="mb-8 border-b border-line pb-6">
              <h2 className="font-display text-2xl font-semibold text-ink">Profil & Data Medis Pasien</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Lengkapi detail berikut untuk membuat akun dan kartu rekam medis Anda.
              </p>
            </div>

            {serverMsg && (
              <div className="mb-6 rounded-xl bg-red-50 border border-red-200/50 p-4 text-sm text-red-700 flex items-start gap-2.5 animate-[fadeIn_0.2s_ease]">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                  <path d={WARN_D} />
                </svg>
                <span>{serverMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Section 1: Kredensial Akun */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#4fa0e0] uppercase tracking-wider border-b border-line pb-1.5">
                  1. Kredensial Akun
                </h3>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                      Email Pasien <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={inputStyle("email")}
                      placeholder="nama@email.com"
                      className="rounded-lg px-4 py-2.5 text-sm bg-white"
                      disabled={isLoading || isSuccess}
                    />
                    {errors.email && <FieldError id="email-err" msg={errors.email} />}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPw ? "text" : "password"}
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={inputStyle("password")}
                        placeholder="Minimal 8 karakter"
                        className="w-full rounded-lg pl-4 pr-10 py-2.5 text-sm bg-white"
                        disabled={isLoading || isSuccess}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute inset-y-0 right-3 flex items-center"
                        style={{ color: "#4a6070", opacity: 0.55 }}
                      >
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                          {showPw ? (
                            EYE_OFF_D.map((p, i) => <path key={i} d={p} />)
                          ) : (
                            EYE_D.map((p, i) => <path key={i} d={p} />)
                          )}
                        </svg>
                      </button>
                    </div>
                    {errors.password && <FieldError id="pw-err" msg={errors.password} />}
                  </div>
                </div>
              </div>

              {/* Section 2: Identitas Diri */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold text-[#4fa0e0] uppercase tracking-wider border-b border-line pb-1.5">
                  2. Identitas Diri
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={inputStyle("name")}
                      placeholder="Contoh: Budi Santoso"
                      className="rounded-lg px-4 py-2.5 text-sm bg-white"
                      disabled={isLoading || isSuccess}
                    />
                    {errors.name && <FieldError id="name-err" msg={errors.name} />}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nik" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                      NIK (Nomor Induk Kependudukan) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nik"
                      name="nik"
                      maxLength={16}
                      value={form.nik}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={inputStyle("nik")}
                      placeholder="16 digit angka NIK"
                      className="rounded-lg px-4 py-2.5 text-sm bg-white"
                      disabled={isLoading || isSuccess}
                    />
                    {errors.nik && <FieldError id="nik-err" msg={errors.nik} />}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="birthDate" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={form.birthDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={inputStyle("birthDate")}
                      className="rounded-lg px-4 py-2.5 text-sm bg-white text-ink"
                      disabled={isLoading || isSuccess}
                    />
                    {errors.birthDate && <FieldError id="birthDate-err" msg={errors.birthDate} />}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="gender" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={inputStyle("gender")}
                      className="rounded-lg px-4 py-2.5 text-sm bg-white text-ink"
                      disabled={isLoading || isSuccess}
                    >
                      <option value="" disabled>Pilih Jenis Kelamin</option>
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                    {errors.gender && <FieldError id="gender-err" msg={errors.gender} />}
                  </div>
                </div>
              </div>

              {/* Section 3: Informasi Medis */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold text-[#4fa0e0] uppercase tracking-wider border-b border-line pb-1.5">
                  3. Informasi Medis (Terinkripsi)
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bloodType" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                      Golongan Darah <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="bloodType"
                      name="bloodType"
                      value={form.bloodType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={inputStyle("bloodType")}
                      className="rounded-lg px-4 py-2.5 text-sm bg-white text-ink"
                      disabled={isLoading || isSuccess}
                    >
                      <option value="" disabled>Pilih Golongan Darah</option>
                      <option value="A+">A Positif (A+)</option>
                      <option value="A-">A Negatif (A-)</option>
                      <option value="B+">B Positif (B+)</option>
                      <option value="B-">B Negatif (B-)</option>
                      <option value="AB+">AB Positif (AB+)</option>
                      <option value="AB-">AB Negatif (AB-)</option>
                      <option value="O+">O Positif (O+)</option>
                      <option value="O-">O Negatif (O-)</option>
                    </select>
                    {errors.bloodType && <FieldError id="bloodType-err" msg={errors.bloodType} />}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="chronic" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                      Penyakit Kronis
                    </label>
                    <input
                      type="text"
                      id="chronic"
                      name="chronicConditions"
                      value={form.chronicConditions}
                      onChange={handleChange}
                      placeholder="Contoh: Hipertensi, Diabetes (opsional)"
                      className="rounded-lg border border-line px-4 py-2.5 text-sm bg-white outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
                      disabled={isLoading || isSuccess}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="allergies" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                    Alergi & Peringatan
                  </label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-[#4fa0e0]"></div>
                    <textarea
                      id="allergies"
                      name="allergies"
                      rows={2}
                      value={form.allergies}
                      onChange={handleChange}
                      placeholder="Contoh: Amoxicillin, Kacang, Debu (pisahkan dengan koma)"
                      className="w-full resize-none rounded-lg border border-line pl-5 pr-4 py-2.5 text-sm bg-white outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
                      disabled={isLoading || isSuccess}
                    ></textarea>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="medication" className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                    Obat Rutin
                  </label>
                  <input
                    type="text"
                    id="medication"
                    name="routineMedications"
                    value={form.routineMedications}
                    onChange={handleChange}
                    placeholder="Contoh: Metformin 500mg, Amlodipine 5mg (pisahkan dengan koma)"
                    className="rounded-lg border border-line px-4 py-2.5 text-sm bg-white outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
                    disabled={isLoading || isSuccess}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-end gap-3 pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading || isSuccess}
                  className="rounded-xl border border-line px-6 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-paper hover:text-ink disabled:opacity-50"
                >
                  Ulangi
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#4fa0e0] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_4px_20px_rgba(79,160,224,0.38)] hover:opacity-90 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isLoading && (
                    <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                  {isSuccess ? "Berhasil! Mengalihkan..." : "Buat QR"}
                  {!isLoading && !isSuccess && <QrIcon className="h-4 w-4" />}
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
            <span className="font-display font-bold tracking-widest text-[#4fa0e0]">
              MEDIVITA
            </span>
            <span className="text-xs text-ink-soft">
              &copy; 2026 Rekam Medis Jalan (Medivita). Hak cipta dilindungi.
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-semibold text-ink-soft">
            <Link href="#" className="hover:text-primary">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-primary">Pusat Bantuan</Link>
            <Link href="mailto:hello@medivita.id" className="hover:text-primary">Kontak</Link>
          </div>
        </div>
      </footer>

      {/* Local keyframes for transitions */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
