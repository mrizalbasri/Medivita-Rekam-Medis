"use client";

import { useState } from "react";
import Image from "next/image";
import { BellIcon, CloseIcon, MenuIcon, ScanIcon, SettingsIcon } from "./icons";

const navLinks = [
  { label: "Dashboard", href: "#dashboard", active: true },
  { label: "Patients", href: "#patients" },
  { label: "Healthcare Workers", href: "#healthcare-workers" },
  { label: "Medical History", href: "#medical-history" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-10">
        <a href="#" className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-lg">
            <Image
              src="/logo.webp"
              alt="Medivita Logo"
              fill
              className="object-cover object-top scale-[1.3] -translate-y-[8%]"
              priority
            />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-primary-dark">
            Rekam Medis Jalan
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex h-full">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative py-2 text-sm font-medium transition-colors ${
                link.active
                  ? "text-primary font-semibold after:absolute after:bottom-[-16px] after:left-0 after:h-[3px] after:w-full after:bg-primary after:rounded-full"
                  : "text-ink-soft hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button
            aria-label="Notifikasi"
            className="rounded-full p-2 text-ink-soft transition-colors hover:bg-primary-soft hover:text-primary"
          >
            <BellIcon className="h-5 w-5" />
          </button>
          <button
            aria-label="Pengaturan"
            className="rounded-full p-2 text-ink-soft transition-colors hover:bg-primary-soft hover:text-primary"
          >
            <SettingsIcon className="h-5 w-5" />
          </button>
          <a
            href="#scan"
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:opacity-90"
          >
            <ScanIcon className="h-4 w-4" />
            Scan QR
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
                className={`rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-primary-soft hover:text-primary ${
                  link.active ? "bg-primary-soft text-primary font-semibold" : "text-ink-soft"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-line pt-2 px-3">
              <span className="text-sm text-ink-soft">Aksi Cepat</span>
              <div className="flex gap-2">
                <button aria-label="Notifikasi" className="rounded-full p-2 text-ink-soft hover:bg-primary-soft">
                  <BellIcon className="h-5 w-5" />
                </button>
                <button aria-label="Pengaturan" className="rounded-full p-2 text-ink-soft hover:bg-primary-soft">
                  <SettingsIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <a
              href="#scan"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
            >
              <ScanIcon className="h-4 w-4" />
              Scan QR
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
