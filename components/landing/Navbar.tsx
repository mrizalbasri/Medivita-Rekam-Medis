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
    <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 md:px-10">

        {/* Logo + tagline */}
        <a href="#" aria-label="Medivita — Rekam Medis Jalan" className="flex items-center gap-2.5">
          {/* Logo */}
          <div className="relative h-12 w-28 sm:h-14 sm:w-32 flex-shrink-0">
            <Image
              src="/logo.webp"
              alt="Medivita Logo"
              fill
              className="object-contain object-left scale-110 origin-left"
              priority
            />
          </div>
          {/* Divider + tagline */}
          <div className="hidden sm:flex items-center gap-2.5">
            <span className="h-8 w-[1.5px] bg-line/80" aria-hidden />
            <div className="flex flex-col leading-tight mt-0.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-soft">
                Rekam Medis
              </span>
              <span className="text-[15px] font-bold tracking-tight text-primary-dark">
                Jalan
              </span>
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleScrollTo(link.href); }}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-primary cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/login"
            className="flex items-center gap-2 rounded-xl border border-primary/30 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft active:scale-95"
          >
            Masuk Petugas
          </a>
          <a
            href="/petugas/scan"
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:opacity-90"
          >
            <ScanIcon className="h-4 w-4" />
            Scan QR
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-ink md:hidden"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-line bg-paper px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleScrollTo(link.href); }}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-primary-soft hover:text-primary cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
              <a
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary-soft"
              >
                Masuk Petugas
              </a>
              <a
                href="/petugas/scan"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
              >
                <ScanIcon className="h-4 w-4" />
                Scan QR
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
