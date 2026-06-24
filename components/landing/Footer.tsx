"use client";

import Link from "next/link";
import Image from "next/image";
import { GlobeIcon, MailIcon } from "./icons";


export function Footer() {
  return (
    <footer className="border-t border-line/60 bg-white/60 py-12 md:py-16">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 md:grid-cols-12 md:px-10">
        {/* Column 1: Info */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-14 flex-shrink-0 overflow-hidden">
              <Image
                src="/logo.webp"
                alt="Medivita Logo"
                fill
                className="object-cover object-left"
                priority
              />
            </div>
            <span className="h-6 w-[1.5px] bg-line/80" aria-hidden />
            <div className="flex flex-col leading-tight mt-0.5">
              <span className="text-[10px] font-medium uppercase tracking-widest text-ink-soft">
                Rekam Medis
              </span>
              <span className="text-[12px] font-bold tracking-tight text-primary-dark">
                Jalan
              </span>
            </div>
          </div>
          <p className="max-w-[340px] text-xs leading-relaxed text-ink-soft">
            Prototipe untuk PekanIT 2026 (subtema Kesehatan & Kesejahteraan
            Masyarakat) — menjaga kontinuitas data kesehatan pasien lintas
            fasilitas, dengan kendali akses penuh di tangan pasien.
          </p>
          <div className="flex gap-2.5">
            <Link
              href="/"
              aria-label="Website"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary hover:scale-105"
            >
              <GlobeIcon className="h-4 w-4" />
            </Link>
            <a
              href="mailto:hello@medivita.id"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary hover:scale-105"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Platform */}
        <div className="col-span-6 md:col-span-2">
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink">
            Platform
          </h4>
          <ul className="mt-4 space-y-2.5 text-xs text-ink-soft">
            <li>
              <a href="/daftar" className="inline-flex transition-all duration-200 hover:translate-x-1 hover:text-primary">
                Daftar Pasien
              </a>
            </li>
            <li>
              <a href="/login?role=petugas" className="inline-flex transition-all duration-200 hover:translate-x-1 hover:text-primary">
                Portal Petugas
              </a>
            </li>
            <li>
              <a href="#mitra" className="inline-flex transition-all duration-200 hover:translate-x-1 hover:text-primary">
                Faskes Mitra
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Dukungan */}
        <div className="col-span-6 md:col-span-2">
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink">
            Dukungan
          </h4>
          <ul className="mt-4 space-y-2.5 text-xs text-ink-soft">
            <li>
              <a href="#cara-kerja" className="inline-flex transition-all duration-200 hover:translate-x-1 hover:text-primary">
                Cara Kerja
              </a>
            </li>
            <li>
              <a href="#keunggulan" className="inline-flex transition-all duration-200 hover:translate-x-1 hover:text-primary">
                Keamanan Data
              </a>
            </li>
            <li>
              <a href="mailto:hello@medivita.id" className="inline-flex transition-all duration-200 hover:translate-x-1 hover:text-primary">
                Hubungi Tim
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink">
            Langganan Update
          </h4>
          <p className="text-xs leading-relaxed text-ink-soft max-w-[320px]">
            Dapatkan informasi terbaru mengenai rilis fitur dan integrasi faskes baru kami.
          </p>
          <form className="flex max-w-[320px] items-center gap-2 mt-1" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email Anda"
              className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-soft/50 focus:border-primary/50 focus:outline-hidden"
              required
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(43,91,168,0.2)] transition-all hover:bg-primary-dark active:scale-95 cursor-pointer shrink-0"
            >
              Kirim
            </button>
          </form>
        </div>

        {/* Bottom copyright */}
        <div className="col-span-12 flex flex-col items-center justify-between gap-3 border-t border-line/60 pt-8 mt-4 font-mono text-[10px] text-ink-soft/70 sm:flex-row">
          <p>&copy; 2026 Rekam Medis Jalan (Medivita). Proposal PekanIT 2026.</p>
          <p>Prototipe MVP — belum terintegrasi dengan SATUSEHAT/SIMRS.</p>
        </div>
      </div>
    </footer>
  );
}

