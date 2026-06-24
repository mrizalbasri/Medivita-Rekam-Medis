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
              className="text-sm font-medium text-ink-soft hover:text-ink relative py-1 transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/pasien/dashboard"
            className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper transition-all active:scale-95"
          >
            Masuk Akun
          </a>
          <a
            href="/petugas/scan"
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <ScanIcon className="h-4 w-4" />
            Portal Petugas
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-ink-soft hover:text-ink md:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-line bg-white px-4 py-4 md:hidden">
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
              <a
                href="/pasien/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition-all active:scale-95"
              >
                Masuk Akun
              </a>
              <a
                href="/petugas/scan"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-all active:scale-95"
              >
                <ScanIcon className="h-4 w-4" />
                Portal Petugas
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
