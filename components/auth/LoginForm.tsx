"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { validateLoginField, type LoginInput } from "@/lib/validations/login";

/* ─── Warna brand Medivita (dari logo) ─────────────────────────── */
const C = {
  blue: "#2B5BA8",
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

/* ─── Gradient string ───────────────────────────────────────────── */
const BRAND_GRADIENT = `linear-gradient(135deg, ${C.blue} 0%, ${C.teal} 55%, ${C.green} 100%)`;
const PANEL_GRADIENT = `linear-gradient(150deg, ${C.blueDark} 0%, ${C.blue} 35%, ${C.teal} 70%, #3d9652 100%)`;

/* ─── Tiny SVG icons ────────────────────────────────────────────── */
function Icon({ d, size = 16 }: { d: string | string[]; size?: number }) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const MAIL_D = "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
const LOCK_D = "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z";
const EYE_D = ["M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"];
const EYE_OFF_D = ["M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"];
const ARROW_D = "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3";
const BACK_D = "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18";
const CHECK_D = "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
const WARN_D = "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z";

/* ─── Field error message ───────────────────────────────────────── */
function FieldError({ id, msg }: { id: string; msg: string }) {
  return (
    <p id={id} role="alert" style={{ color: C.alert }}
      className="flex items-center gap-1 text-xs mt-1.5 animate-[fadeIn_0.15s_ease]">
      <Icon d={WARN_D} size={12} />
      {msg}
    </p>
  );
}

/* ─── Main form component ───────────────────────────────────────── */
export function LoginForm() {
  const [role, setRole] = useState<"petugas" | "pasien">("petugas");
  const [resolvedRole, setResolvedRole] = useState<string | null>(null);
  const [form, setForm] = useState<LoginInput>({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  // Sync role with query parameters (?role=pasien or ?role=petugas)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("role");
      if (r === "pasien" || r === "petugas") {
        setRole(r);
      }
    }
  }, []);

  /* Derived errors — hanya muncul setelah field di-touch */
  const errors = {
    email: touched.email ? validateLoginField("email", form.email) : "",
    password: touched.password ? validateLoginField("password", form.password) : "",
  };
  const hasErrors = !!(errors.email || errors.password);

  /* ── Handlers ── */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setServerMsg(null);
    setForm(p => ({ ...p, [name]: value }));
    // Re-validasi realtime setelah field pernah di-touch
    if (touched[name as keyof typeof touched]) {
      setTouched(p => ({ ...p })); // trigger re-render agar errors recompute
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched(p => ({ ...p, [e.target.name]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Tandai semua field sebagai touched untuk tampilkan semua error
    setTouched({ email: true, password: true });

    const emailErr = validateLoginField("email", form.email);
    const pwErr = validateLoginField("password", form.password);
    if (emailErr || pwErr) return; // berhenti jika ada error

    setServerMsg(null);
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
        setServerMsg(data.message ?? "Login gagal. Periksa kembali data Anda.");
        return;
      }

      setResolvedRole(data.user.role);
      setStatus("success");
      const targetPath = data.user.role === "pasien" ? "/pasien/dashboard" : "/petugas/dashboard";
      setTimeout(() => { window.location.href = targetPath; }, 1200);
    } catch {
      setStatus("error");
      setServerMsg("Tidak dapat terhubung ke server. Coba lagi.");
    }
  }

  /* ── Input styling helper ── */
  function inputStyle(field: "email" | "password"): React.CSSProperties {
    const err = errors[field];
    const ok = touched[field] && !err && form[field];
    return {
      border: `1.5px solid ${err ? C.alert : ok ? (role === "pasien" ? C.blue : C.teal) : C.line}`,
      boxShadow: err
        ? `0 0 0 3px ${C.alertSoft}`
        : ok
          ? `0 0 0 3px ${role === "pasien" ? "#d8e5f8" : C.tealSoft}`
          : "none",
      outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
    };
  }

  const isIdle = status === "idle" || status === "error";
  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <div className="flex min-h-screen w-full">

      {/* ══ LEFT — branding panel ══════════════════════════════════ */}
      <aside
        className="hidden lg:flex lg:w-[46%] xl:w-[48%] flex-col items-center justify-center relative overflow-hidden"
        aria-hidden="true"
        style={{ background: PANEL_GRADIENT }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-[-120px] right-[-120px] h-[420px] w-[420px] rounded-full blur-[90px]"
          style={{ background: role === "pasien" ? "rgba(43,91,168,0.28)" : "rgba(42,172,171,0.28)" }} />
        <div className="absolute bottom-[-80px] left-[-80px] h-[320px] w-[320px] rounded-full blur-[70px]"
          style={{ background: role === "pasien" ? "rgba(42,172,171,0.22)" : "rgba(93,184,112,0.22)" }} />
        {/* Ring decorations */}
        {[520, 360, 220].map(sz => (
          <div key={sz} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: sz, height: sz, border: "1px solid rgba(255,255,255,0.07)" }} />
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-10 xl:px-14 text-center max-w-md">
          {/* Logo */}
          <div className="relative h-24 w-44 drop-shadow-lg">
            <Image src="/logo.webp" alt="Medivita" fill className="object-contain brightness-0 invert" priority />
          </div>

          {/* Headline */}
          <div className="space-y-2.5">
            <h1 className="text-[2.6rem] font-bold tracking-tight text-white leading-tight">
              Rekam Medis<br />
              <span style={{ color: role === "pasien" ? "#88bfea" : "#88ead6" }}>Jalan</span>
            </h1>
            <p className="text-[0.95rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              {role === "pasien"
                ? "Paspor Kesehatan Digital Anda. Simpan, unduh, dan kendalikan akses rekam medis secara mandiri."
                : "Portal resmi Petugas Fasilitas Kesehatan. Akses data pasien secara aman dan real-time."}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 w-full">
            {role === "pasien" ? (
              <>
                <div className="rounded-2xl p-3 text-center backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <p className="text-lg font-bold text-white">100%</p>
                  <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Kendali Data</p>
                </div>
                <div className="rounded-2xl p-3 text-center backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <p className="text-lg font-bold text-white">Offline</p>
                  <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Kartu QR</p>
                </div>
                <div className="rounded-2xl p-3 text-center backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <p className="text-lg font-bold text-white">Aman</p>
                  <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>AES-256</p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-2xl p-3 text-center backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(42,172,171,0.3)" }}>
                  <p className="text-lg font-bold" style={{ color: "#88ead6" }}>256-bit</p>
                  <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Enkripsi</p>
                </div>
                <div className="rounded-2xl p-3 text-center backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(42,172,171,0.3)" }}>
                  <p className="text-lg font-bold" style={{ color: "#88ead6" }}>99.9%</p>
                  <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Uptime</p>
                </div>
                <div className="rounded-2xl p-3 text-center backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(42,172,171,0.3)" }}>
                  <p className="text-lg font-bold" style={{ color: "#88ead6" }}>&lt; 1s</p>
                  <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Akses Data</p>
                </div>
              </>
            )}
          </div>

          {/* Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {(role === "pasien"
              ? ["Kedaulatan Pasien", "Bisa Dicetak Kertas", "Log Akses Transparan"]
              : ["End-to-End Terenkripsi", "Multi Faskes", "Akses Real-time"]
            ).map(f => (
              <span key={f} className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  background: role === "pasien" ? "rgba(43,91,168,0.14)" : "rgba(42,172,171,0.14)",
                  border: role === "pasien" ? "1px solid rgba(43,91,168,0.32)" : "1px solid rgba(42,172,171,0.32)"
                }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: role === "pasien" ? "#88bfea" : "#88ead6" }} />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom shimmer */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${C.teal}, ${C.green}, transparent)` }} />
      </aside>

      {/* ══ RIGHT — form panel ════════════════════════════════════= */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12"
        style={{ background: C.paper }}>

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex flex-col items-center gap-1.5">
          <div className="relative h-14 w-32">
            <Image src="/logo.webp" alt="Medivita" fill className="object-contain" priority />
          </div>
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: role === "pasien" ? C.blue : C.tealDark }}>
            Rekam Medis Jalan
          </p>
        </div>

        <div className="w-full max-w-[420px]">

          {/* Role Switcher Tab */}
          <div className="flex w-full bg-white rounded-xl p-1 mb-8 shadow-sm" style={{ border: `1.5px solid ${C.line}` }}>
            <button
              type="button"
              onClick={() => { setRole("petugas"); setServerMsg(null); }}
              className="flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200"
              style={{
                background: role === "petugas" ? C.teal : "transparent",
                color: role === "petugas" ? "#ffffff" : C.inkSoft,
              }}
            >
              Petugas Faskes
            </button>
            <button
              type="button"
              onClick={() => { setRole("pasien"); setServerMsg(null); }}
              className="flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200"
              style={{
                background: role === "pasien" ? C.blue : "transparent",
                color: role === "pasien" ? "#ffffff" : C.inkSoft,
              }}
            >
              Pasien
            </button>
          </div>

          {/* ── Badge + heading ── */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest mb-3"
              style={{
                background: role === "pasien" ? "#d8e5f8" : C.tealSoft,
                color: role === "pasien" ? C.blue : C.tealDark
              }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: role === "pasien" ? C.blue : C.teal }} />
              {role === "pasien" ? "Portal Pasien" : "Portal Petugas Faskes"}
            </span>
            <h2 className="text-[1.85rem] font-bold tracking-tight animate-fade-in" style={{ color: C.ink }}>
              {role === "pasien" ? "Masuk Akun Pasien" : "Selamat Datang"}
            </h2>
            <p className="mt-1.5 text-sm" style={{ color: C.inkSoft }}>
              {role === "pasien"
                ? "Masuk untuk melihat QR Code dan riwayat rekam medis Anda."
                : "Masuk menggunakan akun petugas yang sudah terdaftar."}
            </p>
          </div>

          {/* ── Server error banner ── */}
          {serverMsg && (
            <div role="alert" className="mb-5 flex items-start gap-3 rounded-xl px-4 py-3 text-sm animate-[fadeIn_0.2s_ease]"
              style={{ background: C.alertSoft, border: `1px solid ${C.alert}30`, color: C.alert }}>
              <Icon d={WARN_D} size={16} />
              <span>{serverMsg}</span>
            </div>
          )}

          {/* ── Form ── */}
          <form id="login-form" onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold mb-1.5"
                style={{ color: C.ink }}>
                {role === "pasien" ? "Email Pasien" : "Email Petugas"}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center"
                  style={{ color: errors.email && touched.email ? C.alert : C.inkSoft, opacity: 0.6 }}>
                  <Icon d={MAIL_D} />
                </span>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={role === "pasien" ? "nama@email.com" : "nama@faskes.id"}
                  aria-describedby={errors.email ? "email-err" : undefined}
                  aria-invalid={!!errors.email}
                  className="w-full rounded-xl py-3 pl-10 pr-10 text-sm bg-white"
                  style={{ ...inputStyle("email"), color: C.ink }}
                />
                {/* Valid checkmark */}
                {touched.email && !errors.email && form.email && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center"
                    style={{ color: role === "pasien" ? C.blue : C.teal }}>
                    <Icon d={CHECK_D} />
                  </span>
                )}
              </div>
              {errors.email && <FieldError id="email-err" msg={errors.email} />}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="block text-sm font-semibold"
                  style={{ color: C.ink }}>
                  Password
                </label>
                <a href="/lupa-password"
                  className="text-xs font-medium hover:underline underline-offset-2 transition-colors"
                  style={{ color: role === "pasien" ? C.blue : C.teal }}>
                  Lupa Password?
                </a>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center"
                  style={{ color: errors.password && touched.password ? C.alert : C.inkSoft, opacity: 0.6 }}>
                  <Icon d={LOCK_D} />
                </span>
                <input
                  id="login-password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Minimal 8 karakter"
                  aria-describedby={errors.password ? "pw-err" : undefined}
                  aria-invalid={!!errors.password}
                  className="w-full rounded-xl py-3 pl-10 pr-11 text-sm bg-white"
                  style={{ ...inputStyle("password"), color: C.ink }}
                />
                {/* Toggle show/hide */}
                <button
                  type="button"
                  id="toggle-password-visibility"
                  aria-label={showPw ? "Sembunyikan password" : "Tampilkan password"}
                  onClick={() => setShowPw(v => !v)}
                  className="absolute inset-y-0 right-3 flex items-center transition-colors hover:opacity-100"
                  style={{ color: C.inkSoft, opacity: 0.55 }}>
                  <Icon d={showPw ? EYE_OFF_D : EYE_D} />
                </button>
              </div>
              {errors.password && <FieldError id="pw-err" msg={errors.password} />}
            </div>

            {/* Remember me */}
            <label htmlFor="remember-me" className="flex items-center gap-2.5 cursor-pointer select-none group">
              <input
                id="remember-me"
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="h-4 w-4 rounded cursor-pointer"
                style={{ accentColor: role === "pasien" ? C.blue : C.teal }}
              />
              <span className="text-sm transition-colors group-hover:opacity-80" style={{ color: C.inkSoft }}>
                Ingat saya di perangkat ini
              </span>
            </label>

            {/* Submit button */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading || isSuccess}
              className="relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-200"
              style={{
                background: isSuccess ? C.green : (role === "pasien" ? C.blue : BRAND_GRADIENT),
                boxShadow: isLoading || isSuccess ? "none" : `0 4px 18px ${role === "pasien" ? "rgba(43,91,168,0.28)" : "rgba(42,172,171,0.38)"}`,
                opacity: isLoading ? 0.82 : 1,
                cursor: isLoading || isSuccess ? "not-allowed" : "pointer",
                transform: "scale(1)",
              }}
              onMouseEnter={e => { if (!isLoading && !isSuccess) (e.currentTarget as HTMLButtonElement).style.opacity = "0.92"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = isLoading ? "0.82" : "1"; }}
              onMouseDown={e => { if (!isLoading && !isSuccess) (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
            >
              {isLoading && (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Memverifikasi…
                </span>
              )}
              {isSuccess && (
                <span className="flex items-center justify-center gap-2">
                  <Icon d={CHECK_D} size={16} />
                  Masuk sebagai {resolvedRole === "pasien" ? "Pasien" : "Petugas"}…
                </span>
              )}
              {isIdle && (
                <span className="flex items-center justify-center gap-2">
                  Masuk Sekarang
                  <Icon d={ARROW_D} size={16} />
                </span>
              )}
            </button>

            {role === "pasien" && (
              <p className="text-center text-xs mt-4" style={{ color: C.inkSoft }}>
                Belum terdaftar?{" "}
                <Link href="/daftar" className="font-bold hover:underline" style={{ color: C.blue }}>
                  Buat Kartu Rekam Medis Baru
                </Link>
              </p>
            )}
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: C.line }} />
            <span className="text-xs font-medium" style={{ color: `${C.inkSoft}70` }}>atau</span>
            <div className="h-px flex-1" style={{ background: C.line }} />
          </div>

          {/* Back to landing */}
          <a
            href="/"
            id="back-to-landing"
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all duration-200 bg-white hover:opacity-90 active:scale-[0.98]"
            style={{ border: `1.5px solid ${C.line}`, color: C.inkSoft }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = role === "pasien" ? `${C.blue}50` : `${C.teal}50`;
              (e.currentTarget as HTMLAnchorElement).style.color = role === "pasien" ? C.blue : C.teal;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = C.line;
              (e.currentTarget as HTMLAnchorElement).style.color = C.inkSoft;
            }}
          >
            <Icon d={BACK_D} size={15} />
            Kembali ke Beranda
          </a>

          {/* Footer */}
          <p className="mt-6 text-center text-xs" style={{ color: `${C.inkSoft}80` }}>
            Butuh bantuan akun?{" "}
            <a href="mailto:support@medivita.id"
              className="font-semibold hover:underline underline-offset-2"
              style={{ color: role === "pasien" ? C.blue : C.teal }}>
              Hubungi IT Support
            </a>
          </p>
        </div>
      </main>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
