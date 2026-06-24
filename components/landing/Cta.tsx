import { ScanIcon } from "./icons";

export function Cta() {
  return (
    <section id="mulai" className="mx-auto max-w-[1280px] px-4 pb-16 md:px-10 md:pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3a6e] via-[#2B5BA8] to-[#2AACAB] px-6 py-12 text-center md:px-16 md:py-16 shadow-[0_12px_40px_rgba(26,58,110,0.25)] border border-white/10 animate-fade-in-up">
        {/* Decorative background blobs to match login page design */}
        <div className="absolute top-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full blur-[80px] bg-[#2AACAB]/25 pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full blur-[80px] bg-[#5DB870]/15 pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="font-display text-2xl font-semibold text-white md:text-3xl tracking-tight">
            Siapkan QR rekam medis Anda sebelum dibutuhkan
          </h2>
          <p className="mx-auto mt-3 max-w-[480px] text-sm text-white/70 md:text-base leading-relaxed">
            Pendaftaran hanya butuh beberapa menit. Setelah itu, data esensial
            Anda siap dibaca petugas medis manapun, kapan saja diperlukan.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/daftar"
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[#1a3a6e] shadow-[0_4px_14px_rgba(255,255,255,0.15)] transition-all hover:bg-white/95 hover:shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
            >
              Daftar sebagai Pasien
              <ScanIcon className="h-4 w-4" />
            </a>
            <a
              href="/login?role=petugas"
              className="rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
            >
              Saya Petugas Faskes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

