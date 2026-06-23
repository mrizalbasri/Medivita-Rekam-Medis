"use client";

import { useState } from "react";
import Image from "next/image";
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
  line: "#e2e8f0",
  paper: "#f8fafc",
  alert: "#d32f2f",
  alertSoft: "#fdebec",
} as const;

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

const ID_CARD_D = ["M2 7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7z", "M8 12a2 2 0 100-4 2 2 0 000 4zm0 0c-2 0-3 1-3 2m7-8h5m-5 4h3"];
const LOCK_D = "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z";
const EYE_D = ["M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"];
const EYE_OFF_D = ["M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"];
const ARROW_RIGHT = "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3";
const CHECK_D = "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
const WARN_D = "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z";

/* ─── Medivita Logo SVG (tanpa background, langsung floating) ───── */
function MedivitaLogoSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="logoGrad" x1="20" y1="0" x2="255" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2B5BA8" />
          <stop offset="30%" stopColor="#2AACAB" />
          <stop offset="100%" stopColor="#5DB870" />
        </linearGradient>
      </defs>

      <path
        d={[
          /* ── C : top opening y=26, bottom opening y=66 ── */
          "M 56 26",
          "A 26 26 0 1 0 56 66",

          /* ── M peak 1 : puncak di y=26 (=tinggi bukaan C) ── */
          "C 66 66, 80 26, 92 26",
          "C 104 26, 116 66, 122 66",

          /* ── M peak 2 : identik peak 1 ── */
          "C 128 66, 142 26, 154 26",
          "C 166 26, 174 60, 176 60",

          /* ── ECG spike : naik di atas C-top, turun di bawah baseline ── */
          "L 170 68",
          "L 182 10",   /* spike UP — di atas M peak */
          "L 192 82",   /* spike DOWN — di bawah baseline */
          "L 200 56",

          /* ── Tilde wave ── */
          "Q 212 38 225 56",
          "Q 238 74 250 56",
        ].join(" ")}
        stroke="url(#logoGrad)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* MEDIVITA text — jarak aman di bawah semua elemen */}
      <text
        x="148"
        y="95"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="700"
        letterSpacing="6"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        MEDIVITA
      </text>
    </svg>
  );
}

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
  const [form, setForm] = useState<LoginInput>({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  /* Derived errors — hanya muncul setelah field di-touch */
  const errors = {
    email: touched.email ? validateLoginField("email", form.email) : "",
    password: touched.password ? validateLoginField("password", form.password) : "",
  };

  /* ── Handlers (tidak diubah) ── */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setServerMsg(null);
    setForm(p => ({ ...p, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      setTouched(p => ({ ...p }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched(p => ({ ...p, [e.target.name]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const emailErr = validateLoginField("email", form.email);
    const pwErr = validateLoginField("password", form.password);
    if (emailErr || pwErr) return;

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

      setStatus("success");
      setTimeout(() => { window.location.href = "/petugas/dashboard"; }, 1200);
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
      border: `1px solid ${err ? C.alert : ok ? C.teal : C.line}`,
      boxShadow: err
        ? `0 0 0 3px ${C.alertSoft}`
        : ok
          ? `0 0 0 3px ${C.tealSoft}`
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

      {/* ══ LEFT — hospital photo panel ════════════════════════════ */}
      <aside
        className="hidden lg:flex lg:w-[48%] flex-col items-center justify-center relative overflow-hidden"
        aria-hidden="true"
      >
        {/* Background photo */}
        <Image
          src="/hospital-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />

        {/* Overlay gelap kuat supaya logo & teks kontras tanpa perlu kotak */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(6,16,40,0.93) 0%, rgba(12,32,70,0.88) 45%, rgba(6,36,55,0.92) 100%)" }}
        />

        {/* Radial spotlight teal di belakang logo — bukan kotak, hanya glow warna */}
        <div
          className="absolute"
          style={{
            top: "18%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 380,
            height: 280,
            background: "radial-gradient(ellipse, rgba(42,172,171,0.18) 0%, rgba(43,91,168,0.10) 45%, transparent 75%)",
            filter: "blur(8px)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-7 px-10 xl:px-14 text-center">

          {/* Logo — container putih, border glow teal. White bg logo menyatu dgn container */}
          <div
            className="relative flex items-center justify-center rounded-2xl px-8 py-5"
            style={{
              background: "rgba(255, 255, 255, 0.96)",
              border: "2px solid rgba(42,172,171,0.7)",
              boxShadow: [
                "0 0 16px rgba(42,172,171,0.70)",
                "0 0 36px rgba(42,172,171,0.35)",
                "0 0 70px rgba(43,91,168,0.25)",
                "inset 0 0 12px rgba(42,172,171,0.06)",
              ].join(", "),
            }}
          >
            <div className="relative h-36 w-72">
              <Image src="/logo.webp" alt="Medivita" fill className="object-contain" priority />
            </div>
          </div>

          {/* Divider dekoratif */}
          <div
            className="w-20 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(42,172,171,0.8), rgba(93,184,112,0.8), transparent)" }}
          />

          {/* Headline */}
          <div className="space-y-3">
            <h1
              className="text-[3rem] font-bold leading-[1.05] tracking-tight"
              style={{ color: "#ffffff", textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
            >
              Rekam Medis
              <br />
              <span style={{ color: "#6ee7e7", textShadow: "0 0 32px rgba(110,231,231,0.45)" }}>Jalan</span>
            </h1>
            <p
              className="text-[0.92rem] leading-relaxed max-w-[270px] mx-auto"
              style={{ color: "rgba(255,255,255,0.62)" }}
            >
              Secure, portable, and efficient medical records for healthcare professionals.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {[
              { label: "End-to-End Encrypted", dot: "#6ee7e7" },
              { label: "Multi Faskes", dot: "#86efac" },
              { label: "Akses Real-time", dot: "#93c5fd" },
            ].map(({ label, dot }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(42,172,171,0.55), rgba(93,184,112,0.55), transparent)" }}
        />
      </aside>

      {/* ══ RIGHT — form panel ═════════════════════════════════════= */}
      <main
        className="flex flex-1 flex-col items-center justify-center px-8 py-12"
        style={{ background: "#ffffff" }}
      >
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex flex-col items-center gap-2">
          <div className="relative h-14 w-32">
            <Image src="/logo.webp" alt="Medivita" fill className="object-contain" priority />
          </div>
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: C.tealDark }}>
            Rekam Medis Jalan
          </p>
        </div>

        <div className="w-full max-w-[400px]">

          {/* ── Heading ── */}
          <div className="mb-8">
            <h2 className="text-[2rem] font-bold tracking-tight" style={{ color: C.ink }}>
              Welcome Back
            </h2>
            <p className="mt-1.5 text-sm" style={{ color: C.inkSoft }}>
              Login as Healthcare Worker (Petugas Faskes)
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

            {/* Employee ID or Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium mb-1.5"
                style={{ color: C.inkSoft }}>
                Employee ID or Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center"
                  style={{ color: errors.email && touched.email ? C.alert : "#94a3b8" }}>
                  <Icon d={ID_CARD_D} />
                </span>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your ID or email"
                  aria-describedby={errors.email ? "email-err" : undefined}
                  aria-invalid={!!errors.email}
                  className="w-full rounded-lg py-3 pl-10 pr-10 text-sm bg-white"
                  style={{ ...inputStyle("email"), color: C.ink }}
                />
                {touched.email && !errors.email && form.email && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center"
                    style={{ color: C.teal }}>
                    <Icon d={CHECK_D} />
                  </span>
                )}
              </div>
              {errors.email && <FieldError id="email-err" msg={errors.email} />}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="block text-sm font-medium"
                  style={{ color: C.inkSoft }}>
                  Password
                </label>
                <a href="/lupa-password"
                  className="text-xs font-medium hover:underline underline-offset-2 transition-colors"
                  style={{ color: C.blue }}>
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center"
                  style={{ color: errors.password && touched.password ? C.alert : "#94a3b8" }}>
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
                  placeholder="Enter your password"
                  aria-describedby={errors.password ? "pw-err" : undefined}
                  aria-invalid={!!errors.password}
                  className="w-full rounded-lg py-3 pl-10 pr-11 text-sm bg-white"
                  style={{ ...inputStyle("password"), color: C.ink }}
                />
                <button
                  type="button"
                  id="toggle-password-visibility"
                  aria-label={showPw ? "Sembunyikan password" : "Tampilkan password"}
                  onClick={() => setShowPw(v => !v)}
                  className="absolute inset-y-0 right-3 flex items-center transition-opacity hover:opacity-100"
                  style={{ color: "#94a3b8", opacity: 0.7 }}>
                  <Icon d={showPw ? EYE_OFF_D : EYE_D} />
                </button>
              </div>
              {errors.password && <FieldError id="pw-err" msg={errors.password} />}
            </div>

            {/* Remember me */}
            <label htmlFor="remember-me" className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                id="remember-me"
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="h-4 w-4 rounded cursor-pointer"
                style={{ accentColor: C.blue }}
              />
              <span className="text-sm" style={{ color: C.inkSoft }}>
                Remember me on this device
              </span>
            </label>

            {/* Submit button */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading || isSuccess}
              className="relative w-full overflow-hidden rounded-lg py-3.5 text-sm font-semibold text-white transition-all duration-200"
              style={{
                background: isSuccess ? C.green : C.blue,
                boxShadow: isLoading || isSuccess ? "none" : `0 2px 12px rgba(43,91,168,0.35)`,
                opacity: isLoading ? 0.82 : 1,
                cursor: isLoading || isSuccess ? "not-allowed" : "pointer",
              }}
              onMouseEnter={e => { if (!isLoading && !isSuccess) (e.currentTarget as HTMLButtonElement).style.background = C.blueDark; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = isSuccess ? C.green : C.blue; }}
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
                  Login Berhasil! Mengalihkan…
                </span>
              )}
              {isIdle && (
                <span className="flex items-center justify-center gap-2">
                  Secure Login
                  <Icon d={ARROW_RIGHT} size={16} />
                </span>
              )}
            </button>
          </form>

          {/* IT Support */}
          <p className="mt-8 text-center text-sm" style={{ color: "#94a3b8" }}>
            Need assistance?{" "}
            <a href="mailto:support@medivita.id"
              className="font-semibold hover:underline underline-offset-2"
              style={{ color: C.blue }}>
              Contact IT Support
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
