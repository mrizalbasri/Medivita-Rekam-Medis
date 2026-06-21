"use client";

import { useState } from "react";
import { BellIcon, CloseIcon, MenuIcon, ScanIcon } from "./icons";

const navLinks = [
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Faskes Mitra", href: "#mitra" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 md:px-10">
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
            <ScanIcon className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-primary-dark">
            Rekam Medis Jalan
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            aria-label="Notifikasi"
            className="rounded-full p-2 text-ink-soft transition-colors hover:bg-primary-soft hover:text-primary"
          >
            <BellIcon className="h-5 w-5" />
          </button>
          <a
            href="#mulai"
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95"
          >
            <ScanIcon className="h-4 w-4" />
            Mulai Sekarang
          </a>
        </div>

        <button
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-ink md:hidden"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-primary-soft hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#mulai"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
            >
              <ScanIcon className="h-4 w-4" />
              Mulai Sekarang
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
