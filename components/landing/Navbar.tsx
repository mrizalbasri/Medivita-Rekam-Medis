"use client";

import { useState } from "react";
import Image from "next/image";
import { CloseIcon, MenuIcon, ScanIcon } from "./icons";

const navLinks = [
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Faskes Mitra", href: "#mitra" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  function handleScrollTo(href: string) {
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line/60 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-10">

        {/* Logo + tagline */}
        <a href="#" aria-label="Medivita — Rekam Medis Jalan" className="flex items-center gap-2.5">
          <div className="relative h-11 w-[72px] flex-shrink-0 overflow-hidden">
            <Image
              src="/logo.webp"
              alt="Medivita Logo"
              fill
              sizes="72px"
              className="object-cover object-left"
              priority
            />
          </div>
          <div className="hidden sm:flex items-center gap-2.5">
            <span className="h-6 w-px bg-line" aria-hidden />
            <span className="text-sm font-semibold text-ink-soft tracking-tight">
              Rekam Medis Jalan
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleScrollTo(link.href); }}
              className="text-sm font-medium text-ink-soft hover:text-ink relative py-1 transition-colors cursor-pointer group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <NavActions />
        </div>

        {/* Mobile menu toggle */}
        <button
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-ink-soft hover:text-ink md:hidden transition-transform duration-200 active:scale-90"
        >
          {open ? <CloseIcon className="h-5 w-5 rotate-90 transition-transform" /> : <MenuIcon className="h-5 w-5 transition-transform" />}
        </button>
      </div>

      {/* Mobile dropdown with smooth sliding and fading */}
      <div 
        className={`border-t border-line bg-white overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-[300px] opacity-100 py-4 px-4" : "max-h-0 opacity-0 py-0 px-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleScrollTo(link.href); }}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-paper hover:text-ink cursor-pointer transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3">
            <MobileNavActions onNavigate={() => setOpen(false)} />
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ── Helper: baca dan decode session cookie di client-side ── */
function getSessionRole(): "pasien" | "petugas" | "admin" | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)session_token=([^;]+)/);
  if (!match) return null;
  try {
    const base64 = match[1].split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    // Cek apakah token belum expired
    if (payload?.exp && payload.exp * 1000 < Date.now()) return null;
    return payload?.role ?? null;
  } catch {
    return null;
  }
}

/* ── Desktop action buttons ── */
function NavActions() {
  const role = getSessionRole();

  if (role === "pasien") {
    return (
      <a
        href="/pasien/dashboard"
        className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-all hover:-translate-y-0.5 active:scale-95 shadow-xs"
      >
        Dashboard Saya
      </a>
    );
  }

  if (role === "petugas" || role === "admin") {
    return (
      <a
        href="/petugas/dashboard"
        className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-all hover:-translate-y-0.5 active:scale-95 shadow-xs"
      >
        <ScanIcon className="h-4 w-4" />
        Dashboard Petugas
      </a>
    );
  }

  // Belum login — tampilkan tombol default
  return (
    <>
      <a
        href="/login?role=pasien"
        className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper transition-all hover:-translate-y-0.5 active:scale-95"
      >
        Masuk Akun
      </a>
      <a
        href="/login?role=petugas"
        className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-all hover:-translate-y-0.5 active:scale-95 shadow-xs"
      >
        <ScanIcon className="h-4 w-4" />
        Portal Petugas
      </a>
    </>
  );
}

/* ── Mobile action buttons ── */
function MobileNavActions({ onNavigate }: { onNavigate: () => void }) {
  const role = getSessionRole();

  if (role === "pasien") {
    return (
      <a
        href="/pasien/dashboard"
        onClick={onNavigate}
        className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-all active:scale-95"
      >
        Dashboard Saya
      </a>
    );
  }

  if (role === "petugas" || role === "admin") {
    return (
      <a
        href="/petugas/dashboard"
        onClick={onNavigate}
        className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-all active:scale-95"
      >
        <ScanIcon className="h-4 w-4" />
        Dashboard Petugas
      </a>
    );
  }

  // Belum login — tampilkan tombol default
  return (
    <>
      <a
        href="/login?role=pasien"
        onClick={onNavigate}
        className="flex items-center justify-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition-all active:scale-95"
      >
        Masuk Akun
      </a>
      <a
        href="/login?role=petugas"
        onClick={onNavigate}
        className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-all active:scale-95"
      >
        <ScanIcon className="h-4 w-4" />
        Portal Petugas
      </a>
    </>
  );
}
