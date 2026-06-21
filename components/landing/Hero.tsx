import {
  ClinicIcon,
  HospitalIcon,
  PuskesmasIcon,
  QrIcon,
  ScanIcon,
  ShieldCheckIcon,
} from "./icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 py-14 md:grid-cols-12 md:gap-8 md:px-10 md:py-20">
        <div className="col-span-12 flex flex-col gap-6 md:col-span-7">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-primary">
            <ShieldCheckIcon className="h-3.5 w-3.5" />
            AES-256 &middot; Akses Dikontrol Pasien
          </span>

          <h1 className="font-display text-[2.4rem] font-bold leading-[1.1] tracking-tight text-primary-dark md:text-[3.6rem] md:leading-[1.05] animate-fade-in-up">
            Riwayat medis Anda,
            <br />
            yang ikut kemana Anda pergi.
          </h1>

          <p className="max-w-[520px] text-base leading-relaxed text-ink-soft md:text-lg animate-fade-in-up [animation-delay:100ms]">
            Pindah faskes, dirujuk, atau darurat di luar kota — golongan
            darah, alergi, penyakit kronis, dan obat rutin Anda tetap terbaca
            oleh petugas medis manapun, lewat satu kali pindai QR.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row animate-fade-in-up [animation-delay:200ms]">
            <a
              href="/daftar"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-6 py-3.5 font-semibold text-white shadow-[0_10px_28px_rgba(2,132,199,0.3)] transition-all hover:shadow-[0_10px_28px_rgba(2,132,199,0.5)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Daftar sebagai Pasien
              <ScanIcon className="h-4 w-4" />
            </a>
            <a
              href="/daftar"
              className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 px-6 py-3.5 font-semibold text-primary transition-colors hover:bg-primary-soft hover:border-primary/50 active:scale-95 cursor-pointer"
            >
              Masuk sebagai Petugas Faskes
            </a>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-line pt-6 sm:max-w-[460px] animate-fade-in-up [animation-delay:300ms]">
            <div>
              <dt className="font-mono text-[11px] uppercase text-ink-soft">Data esensial</dt>
              <dd className="font-display text-xl font-semibold text-primary">1 QR</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase text-ink-soft">Kontrol akses</dt>
              <dd className="font-display text-xl font-semibold text-primary">Pasien</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase text-ink-soft">Jaringan lemah</dt>
              <dd className="font-display text-xl font-semibold text-primary">Offline</dd>
            </div>
          </dl>
        </div>

        {/* Signature visual: a health "boarding pass" — torn stub, rubber stamp, ECG route */}
        <div className="col-span-12 md:col-span-5 animate-fade-in-up [animation-delay:400ms]">
          <div className="relative mx-auto max-w-[420px] rounded-2xl bg-white shadow-[0_20px_48px_rgba(2,132,199,0.12)] animate-float">
            <div className="flex">
              {/* main stub */}
              <div className="flex-1 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">Kartu Kesehatan Digital</p>
                    <p className="mt-0.5 font-display text-base font-semibold text-ink">Budi Santoso</p>
                  </div>
                  <span className="font-mono text-[11px] text-ink-soft">No. MED-99201</span>
                </div>

                <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-xl border border-line bg-primary-soft/40">
                  <svg viewBox="0 0 120 120" className="h-3/5 w-3/5 text-primary-dark">
                    <rect x="4" y="4" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="14" y="14" width="12" height="12" fill="currentColor" />
                    <rect x="84" y="4" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="94" y="14" width="12" height="12" fill="currentColor" />
                    <rect x="4" y="84" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="14" y="94" width="12" height="12" fill="currentColor" />
                    <rect x="48" y="4" width="8" height="8" fill="currentColor" />
                    <rect x="64" y="20" width="8" height="8" fill="currentColor" />
                    <rect x="48" y="36" width="20" height="8" fill="currentColor" />
                    <rect x="84" y="48" width="8" height="20" fill="currentColor" />
                    <rect x="48" y="60" width="8" height="32" fill="currentColor" />
                    <rect x="64" y="76" width="8" height="8" fill="currentColor" />
                    <rect x="64" y="92" width="32" height="8" fill="currentColor" />
                    <rect x="48" y="100" width="8" height="16" fill="currentColor" />
                    <rect x="100" y="68" width="16" height="16" fill="currentColor" />
                  </svg>
                </div>

                <div className="space-y-2 font-mono text-[13px]">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-soft">GOL. DARAH</span>
                    <span className="font-medium text-alert">O Positive</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-soft">ALERGI</span>
                    <span className="font-medium text-ink">Penisilin, Udang</span>
                  </div>
                </div>
              </div>

              {/* perforated tear line */}
              <div className="relative w-px bg-[repeating-linear-gradient(to_bottom,var(--color-line)_0_6px,transparent_6px_12px)]">
                <span className="absolute -top-2.5 -left-2.5 h-5 w-5 rounded-full bg-paper" />
                <span className="absolute -bottom-2.5 -left-2.5 h-5 w-5 rounded-full bg-paper" />
              </div>

              {/* stub: status stamp */}
              <div className="flex w-[92px] flex-col items-center justify-center gap-2 p-3">
                <div className="flex h-16 w-16 -rotate-[10deg] items-center justify-center rounded-full border-2 border-dashed border-accent">
                  <span className="font-display text-[11px] font-bold uppercase leading-tight text-accent">
                    Aktif
                  </span>
                </div>
                <p className="font-mono text-[9px] uppercase text-ink-soft">Berlaku</p>
              </div>
            </div>
          </div>

          {/* the route — same card, three different facilities, connected by an ECG line */}
          <div className="mx-auto mt-6 max-w-[420px] rounded-2xl border border-line bg-white p-5">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              Kartu yang sama, di tiga faskes berbeda
            </p>
            <div className="relative flex items-center justify-between">
              <svg
                className="absolute left-9 right-9 top-1/2 -translate-y-1/2 text-primary/40"
                height="20"
                viewBox="0 0 240 20"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  className="ecg-line"
                  d="M0 10 H70 L80 1 L90 19 L100 10 H170 L180 1 L190 19 L200 10 H240"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <FacilityStop icon={<PuskesmasIcon className="h-4 w-4" />} label="Puskesmas" />
              <FacilityStop icon={<ClinicIcon className="h-4 w-4" />} label="Klinik" />
              <FacilityStop icon={<HospitalIcon className="h-4 w-4" />} label="RSUD" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacilityStop({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-1.5 bg-white px-1.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-primary-soft text-primary">
        {icon}
      </span>
      <span className="font-mono text-[10px] text-ink-soft">{label}</span>
    </div>
  );
}
