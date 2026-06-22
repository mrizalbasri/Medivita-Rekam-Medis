"use client";

import { useState, useRef } from "react";
import Image from "next/image";

/* ─── Types ────────────────────────────────────────────────────── */
type FieldErrors = { email?: string; password?: string };

/* ─── Tiny inline helpers ──────────────────────────────────────── */
function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
}

/* ─── Validators ───────────────────────────────────────────────── */
function validateEmail(v: string) {
  if (!v) return "Email wajib diisi";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Format email tidak valid";
  return "";
}
function validatePassword(v: string) {
  if (!v) return "Password wajib diisi";
  if (v.length < 6) return "Password minimal 6 karakter";
  return "";
}

/* ─── Main component ───────────────────────────────────────────── */
export function LoginForm() {
  const [showPw, setShowPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const submitRef = useRef<HTMLButtonElement>(null);

  const emailErr = touched.email ? validateEmail(form.email) : "";
  const pwErr = touched.password ? validatePassword(form.password) : "";
  const isFormValid = !validateEmail(form.email) && !validatePassword(form.password);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setServerError(null);
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      setFieldErrors((p) => ({
        ...p,
        [name]: name === "email" ? validateEmail(value) : validatePassword(value),
      }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setFieldErrors((p) => ({
      ...p,
      [name]: name === "email" ? validateEmail(value) : validatePassword(value),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mark all touched
    setTouched({ email: true, password: true });
    const eErr = validateEmail(form.email);
    const pErr = validatePassword(form.password);
    setFieldErrors({ email: eErr, password: pErr });
    if (eErr || pErr) return;

    setServerError(null);
    setStatus("loading");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setServerError(data.message ?? "Login gagal. Periksa kembali data Anda.");
        return;
      }

      setStatus("success");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch {
      setStatus("error");
      setServerError("Tidak dapat terhubung ke server. Coba lagi.");
    }
  }

  const inputBase =
    "w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-ink placeholder:text-ink-soft/40 outline-none transition-all duration-200";
  const inputNormal = "border-line focus:border-primary focus:ring-2 focus:ring-primary/15";
  const inputError = "border-alert/60 focus:border-alert focus:ring-2 focus:ring-alert/15 bg-alert-soft/30";
  const inputSuccess = "border-accent/60 focus:border-accent focus:ring-2 focus:ring-accent/15";

  function inputClass(field: "email" | "password") {
    const err = fieldErrors[field];
    const val = form[field];
    if (!touched[field]) return `${inputBase} ${inputNormal}`;
    if (err) return `${inputBase} ${inputError}`;
    if (val) return `${inputBase} ${inputSuccess}`;
    return `${inputBase} ${inputNormal}`;
  }

  return (
    <div className="flex min-h-screen w-full">

      {/* ── Left branding panel ────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[45%] xl:w-1/2 flex-col items-center justify-center relative overflow-hidden"
        aria-hidden="true"
      >
        {/* Brand gradient: biru → teal → hijau (sesuai logo) */}
        <div className="absolute inset-0" style={{background: "linear-gradient(145deg, #1a3a6e 0%, #2b5ba8 30%, #2aacab 65%, #3d9652 100%)"}} />
        {/* Decorative blobs */}
        <div className="absolute top-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full blur-[80px]" style={{background: "rgba(42,172,171,0.3)"}} />
        <div className="absolute bottom-[-80px] left-[-80px] h-[300px] w-[300px] rounded-full blur-[60px]" style={{background: "rgba(93,184,112,0.25)"}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-white/8" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full border border-white/8" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-12 text-center max-w-md">
          <div className="relative h-28 w-48">
            <Image
              src="/logo.webp"
              alt="Medivita Logo"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-white leading-tight">
              Rekam Medis<br />
              {/* Teal-green dari logo */}
              <span style={{color: "#7ddfc4"}}>Jalan</span>
            </h1>
            <p className="text-base text-white/65 leading-relaxed">
              Portal khusus Petugas Fasilitas Kesehatan. Akses data pasien dengan aman dan real-time.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 w-full mt-2">
            {[
              { value: "256-bit", label: "Enkripsi" },
              { value: "99.9%", label: "Uptime" },
              { value: "< 1s", label: "Akses Data" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-sm p-3 text-center" style={{borderColor: "rgba(42,172,171,0.3)"}}>
                <p className="text-lg font-bold" style={{color: "#7ddfc4"}}>{s.value}</p>
                <p className="text-[10px] text-white/55 uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {["End-to-End Terenkripsi", "Multi Faskes", "Akses Real-time"].map((f) => (
              <span
                key={f}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
                style={{border: "1px solid rgba(42,172,171,0.35)", background: "rgba(42,172,171,0.12)"}}
              >
                <span className="h-1.5 w-1.5 rounded-full inline-block" style={{background: "#7ddfc4"}} />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom shimmer line — blue→teal→green */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{background: "linear-gradient(90deg, transparent 0%, #2aacab 40%, #5db870 70%, transparent 100%)"}} />
      </div>

      {/* ── Right form panel ───────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-paper">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex flex-col items-center gap-2">
          <div className="relative h-16 w-36">
            <Image src="/logo.webp" alt="Medivita Logo" fill className="object-contain" priority />
          </div>
        </div>

        <div className="w-full max-w-[420px]">

          {/* ── Header ── */}
          <div className="mb-8">
            {/* Badge warna teal dari logo */}
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-3"
              style={{background: "#d4f0ef", color: "#1b8786"}}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{background: "#2aacab"}} />
              Portal Petugas Faskes
            </span>
            <h2 className="text-3xl font-bold tracking-tight" style={{color: "#1a3347"}}>Selamat Datang</h2>
            <p className="mt-1.5 text-sm text-ink-soft">
              Masuk menggunakan akun petugas yang sudah terdaftar.
            </p>
          </div>

          {/* ── Server error banner ── */}
          {serverError && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-xl border border-alert/30 bg-alert-soft px-4 py-3 text-sm text-alert animate-[fadeIn_0.2s_ease]"
            >
              <svg className="mt-0.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
              <span>{serverError}</span>
            </div>
          )}

          {/* ── Form ── */}
          <form id="login-form" onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Email field */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-sm font-semibold text-ink">
                Email Petugas
              </label>
              <div className="relative">
                <span className={`pointer-events-none absolute inset-y-0 left-3.5 flex items-center transition-colors ${emailErr && touched.email ? "text-alert/70" : "text-ink-soft/50"}`}>
                  <MailIcon className="h-4 w-4" />
                </span>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="nama@faskes.id"
                  aria-describedby={emailErr ? "email-error" : undefined}
                  aria-invalid={!!emailErr}
                  className={inputClass("email")}
                />
                {/* Valid check */}
                {touched.email && !emailErr && form.email && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-accent">
                    <CheckCircleIcon className="h-4 w-4" />
                  </span>
                )}
              </div>
              {emailErr && (
                <p id="email-error" role="alert" className="flex items-center gap-1 text-xs text-alert mt-1 animate-[fadeIn_0.15s_ease]">
                  <svg className="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  {emailErr}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="login-password" className="block text-sm font-semibold text-ink">
                  Password
                </label>
                <a
                  href="/lupa-password"
                  className="text-xs font-medium text-primary hover:text-primary-dark transition-colors hover:underline underline-offset-2"
                >
                  Lupa Password?
                </a>
              </div>
              <div className="relative">
                <span className={`pointer-events-none absolute inset-y-0 left-3.5 flex items-center transition-colors ${pwErr && touched.password ? "text-alert/70" : "text-ink-soft/50"}`}>
                  <LockIcon className="h-4 w-4" />
                </span>
                <input
                  id="login-password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Masukkan password"
                  aria-describedby={pwErr ? "password-error" : undefined}
                  aria-invalid={!!pwErr}
                  className={`${inputClass("password")} pr-11`}
                />
                <button
                  type="button"
                  id="toggle-password-visibility"
                  aria-label={showPw ? "Sembunyikan password" : "Tampilkan password"}
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-ink-soft/50 hover:text-primary transition-colors"
                >
                  {showPw ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
              {pwErr && (
                <p id="password-error" role="alert" className="flex items-center gap-1 text-xs text-alert mt-1 animate-[fadeIn_0.15s_ease]">
                  <svg className="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  {pwErr}
                </p>
              )}
            </div>

            {/* Remember me */}
            <label htmlFor="remember-me" className="flex items-center gap-2.5 cursor-pointer group select-none">
              <div className="relative flex items-center justify-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="peer h-4 w-4 rounded border-line accent-primary cursor-pointer"
                />
              </div>
              <span className="text-sm text-ink-soft group-hover:text-ink transition-colors">
                Ingat saya di perangkat ini
              </span>
            </label>

            {/* Submit button — gradient biru→teal sesuai logo */}
            <button
              ref={submitRef}
              id="login-submit-btn"
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98]"
              style={{
                background: status === "success"
                  ? "#3d9652"
                  : status === "loading"
                    ? "linear-gradient(135deg, #2b5ba8 0%, #2aacab 100%)"
                    : "linear-gradient(135deg, #2b5ba8 0%, #2aacab 60%, #5db870 100%)",
                boxShadow: status === "loading" || status === "success" ? "none" : "0 4px 20px rgba(42,172,171,0.35)",
                cursor: status === "loading" || status === "success" ? "not-allowed" : "pointer",
                opacity: status === "loading" ? 0.85 : 1,
              }}
            >
              {/* Shimmer effect on idle */}
              {status === "idle" && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -skew-x-12 translate-x-[-110%] bg-white/10 transition-transform duration-700 group-hover:translate-x-[110%]"
                />
              )}

              {status === "loading" && (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Memverifikasi…
                </span>
              )}

              {status === "success" && (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  Login Berhasil! Mengalihkan…
                </span>
              )}

              {(status === "idle" || status === "error") && (
                <span className="flex items-center justify-center gap-2">
                  Masuk Sekarang
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs text-ink-soft/50 font-medium">atau</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          {/* Back to landing */}
          <a
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white py-3 text-sm font-medium text-ink-soft transition-all hover:border-primary/30 hover:text-primary hover:bg-primary-soft active:scale-[0.98]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Kembali ke Beranda
          </a>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-ink-soft/60">
            Butuh bantuan akun?{" "}
            <a href="mailto:support@medivita.id" className="font-medium text-primary hover:underline underline-offset-2 transition-colors">
              Hubungi IT Support
            </a>
          </p>
        </div>
      </div>

      {/* Fade-in keyframe */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
