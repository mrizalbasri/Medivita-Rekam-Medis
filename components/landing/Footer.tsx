import Image from "next/image";
import { GlobeIcon, MailIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-line bg-primary-soft/30">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-12 md:grid-cols-12 md:px-10">
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg">
              <Image
                src="/logo.webp"
                alt="Medivita Logo"
                fill
                className="object-cover object-top scale-[1.3] -translate-y-[8%]"
              />
            </div>
            <span className="font-display text-base font-semibold text-primary-dark">
              Rekam Medis Jalan
            </span>
          </div>
          <p className="mt-3 max-w-[360px] text-sm leading-relaxed text-ink-soft">
            Prototipe untuk PekanIT 2026 (subtema Kesehatan & Kesejahteraan
            Masyarakat) — menjaga kontinuitas data kesehatan pasien lintas
            fasilitas, dengan kendali akses penuh di tangan pasien.
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href="#"
              aria-label="Website"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-primary hover:text-primary"
            >
              <GlobeIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-primary hover:text-primary"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="col-span-6 md:col-span-3">
          <h4 className="font-mono text-[11px] uppercase tracking-widest text-ink">
            Platform
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li><a href="#mulai" className="hover:text-primary">Daftar Pasien</a></li>
            <li><a href="#petugas" className="hover:text-primary">Portal Petugas</a></li>
            <li><a href="#mitra" className="hover:text-primary">Faskes Mitra</a></li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-4">
          <h4 className="font-mono text-[11px] uppercase tracking-widest text-ink">
            Dukungan
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li><a href="#cara-kerja" className="hover:text-primary">Cara Kerja</a></li>
            <li><a href="#keunggulan" className="hover:text-primary">Keamanan Data</a></li>
            <li><a href="#" className="hover:text-primary">Hubungi Tim</a></li>
          </ul>
        </div>

        <div className="col-span-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 font-mono text-[11px] text-ink-soft sm:flex-row">
          <p>&copy; 2026 Rekam Medis Jalan (Medivita). Proposal PekanIT 2026.</p>
          <p>Prototipe MVP — belum terintegrasi dengan SATUSEHAT/SIMRS.</p>
        </div>
      </div>
    </footer>
  );
}
