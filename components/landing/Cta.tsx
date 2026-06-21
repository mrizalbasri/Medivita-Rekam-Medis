import { ScanIcon } from "./icons";

export function Cta() {
  return (
    <section id="mulai" className="mx-auto max-w-[1280px] px-4 pb-16 md:px-10 md:pb-20">
      <div className="rounded-3xl bg-primary-dark px-6 py-12 text-center md:px-16 md:py-16">
        <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
          Siapkan QR rekam medis Anda sebelum dibutuhkan
        </h2>
        <p className="mx-auto mt-3 max-w-[480px] text-sm text-white/70 md:text-base">
          Pendaftaran hanya butuh beberapa menit. Setelah itu, data esensial
          Anda siap dibaca petugas medis manapun, kapan saja diperlukan.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/daftar"
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-primary-dark transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          >
            Daftar sebagai Pasien
            <ScanIcon className="h-4 w-4" />
          </a>
          <a
            href="/login"
            className="rounded-xl border border-white/25 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 active:scale-95 cursor-pointer"
          >
            Saya Petugas Faskes
          </a>
        </div>
      </div>
    </section>
  );
}
