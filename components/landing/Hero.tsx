import {
  ClinicIcon,
  HospitalIcon,
  QrIcon,
  ScanIcon,
  ShieldCheckIcon,
  PrinterIcon,
  LockIcon,
} from "./icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-8 pb-16 md:pt-12 md:pb-20">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 md:px-10 text-center gap-6">
        
        {/* Main Headings */}
        <div className="flex flex-col items-center gap-3 max-w-[800px]">
          <h1 className="font-display text-[2.4rem] font-bold leading-[1.15] tracking-tight text-primary-dark md:text-[3.6rem] md:leading-[1.1] animate-fade-in-up">
            Riwayat Medis Anda,
            <br />
            Selalu Siap Saat Berobat
          </h1>

          <p className="max-w-[620px] text-sm leading-relaxed text-ink-soft md:text-base animate-fade-in-up [animation-delay:100ms]">
            Simpan data golongan darah, alergi, dan obat rutin Anda dalam satu QR Code. Gratis, aman, dan bisa dicetak kertas.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row justify-center items-center w-full animate-fade-in-up [animation-delay:200ms]">
          <a
            href="/daftar"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-xs transition-all hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-sm"
          >
            Daftar Gratis Sekarang
            <ScanIcon className="h-4 w-4" />
          </a>
          <a
            href="/login"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3 font-semibold text-ink transition-all hover:bg-paper active:scale-95 cursor-pointer text-sm"
          >
            Portal Petugas Faskes
          </a>
        </div>

        {/* Modern staggered card layout - FlowHub style */}
        <div className="w-full max-w-[1000px] mt-6 relative px-2 md:px-0 animate-fade-in-up [animation-delay:300ms]">
          {/* Main Grid: 3 columns on desktop, stack on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Column 1 (span 5): Stacks Patient Card + Action Shortcuts */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
              
              {/* Card 1: Patient Card */}
              <div className="rounded-3xl border border-line bg-white p-5 text-left shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-primary to-accent opacity-75" />
                
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex justify-between items-center border-b border-line pb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-primary border border-primary/10">
                      <QrIcon className="h-3.5 w-3.5 text-primary" />
                      Kartu Medivita
                    </span>
                    <span className="text-[10px] font-mono text-ink-soft/60 font-bold">MED-99201</span>
                  </div>

                  {/* Patient Profile */}
                  <div className="flex items-center gap-3.5">
                    {/* QR Code */}
                    <div className="w-14 h-14 rounded-xl border border-line bg-white p-1 flex items-center justify-center shrink-0 shadow-xs relative">
                      <svg viewBox="0 0 100 100" className="h-full w-full text-primary-dark" fill="currentColor">
                        <rect x="0" y="0" width="30" height="30" rx="3" />
                        <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                        <rect x="10" y="10" width="10" height="10" rx="1" />
                        <rect x="70" y="0" width="30" height="30" rx="3" />
                        <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                        <rect x="80" y="10" width="10" height="10" rx="1" />
                        <rect x="0" y="70" width="30" height="30" rx="3" />
                        <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                        <rect x="10" y="80" width="10" height="10" rx="1" />
                        <rect x="35" y="0" width="5" height="15" rx="1" />
                        <rect x="45" y="0" width="10" height="5" rx="1" />
                        <rect x="60" y="5" width="5" height="10" rx="1" />
                        <rect x="35" y="20" width="15" height="5" rx="1" />
                        <rect x="55" y="20" width="10" height="10" rx="1" />
                        <rect x="35" y="35" width="5" height="20" rx="1" />
                        <rect x="45" y="35" width="20" height="5" rx="1" />
                        <rect x="50" y="45" width="10" height="10" rx="1" />
                        <rect x="70" y="35" width="15" height="10" rx="1" />
                        <rect x="70" y="50" width="5" height="15" rx="1" />
                        <rect x="80" y="55" width="10" height="5" rx="1" />
                        <rect x="35" y="70" width="5" height="10" rx="1" />
                        <rect x="35" y="85" width="15" height="5" rx="1" />
                        <rect x="45" y="75" width="15" height="5" rx="1" />
                        <rect x="55" y="85" width="5" height="10" rx="1" />
                        <rect x="65" y="70" width="10" height="10" rx="1" />
                        <rect x="80" y="70" width="5" height="20" rx="1" />
                        <rect x="90" y="75" width="5" height="10" rx="1" />
                        <rect x="70" y="90" width="20" height="5" rx="1" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-ink truncate">Budi Santoso</h4>
                      <p className="text-[10px] text-ink-soft mt-0.5">Bisa dicetak kertas / simpan HP</p>
                    </div>
                  </div>
                </div>

                {/* Simplified Status Label (Replaces tech buttons) */}
                <div className="mt-4 border-t border-line/60 pt-3 flex justify-between items-center text-[10px] text-ink-soft/70 font-mono">
                  <span className="flex items-center gap-1">🟢 Kartu Aktif</span>
                  <span>Bawa Saat Berobat</span>
                </div>
              </div>

              {/* Card 2: 3T Optimization (Replaces heavy shortcuts bar) */}
              <div className="rounded-3xl border border-line bg-white/70 p-4.5 text-left shadow-[0_4px_20px_rgba(0,0,0,0.01)] backdrop-blur-xs flex flex-col gap-2.5 group transition-all duration-300 hover:border-primary/20">
                <div>
                  <h4 className="text-xs font-bold text-ink">Bisa Dipakai Tanpa Internet</h4>
                  <p className="text-[10px] text-ink-soft mt-0.5">Sangat cocok untuk daerah dengan sinyal susah:</p>
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-line/50 pt-2.5">
                  <div className="text-center p-2 rounded-2xl bg-ink-soft/5 flex flex-col justify-between min-h-[60px] hover:bg-ink-soft/8 transition-colors">
                    <PrinterIcon className="h-5 w-5 mx-auto text-ink-soft/75 mt-0.5" />
                    <span className="text-[9px] font-bold text-ink-soft block mt-1 leading-tight">Cetak Kertas</span>
                  </div>
                  <div className="text-center p-2 rounded-2xl bg-[#2AACAB]/5 flex flex-col justify-between min-h-[60px] hover:bg-[#2AACAB]/8 transition-colors">
                    <ScanIcon className="h-5 w-5 mx-auto text-[#2AACAB] mt-0.5" />
                    <span className="text-[9px] font-bold text-[#2AACAB] block mt-1 leading-tight">Tanpa Sinyal</span>
                  </div>
                  <div className="text-center p-2 rounded-2xl bg-[#2B5BA8]/5 flex flex-col justify-between min-h-[60px] hover:bg-[#2B5BA8]/8 transition-colors">
                    <LockIcon className="h-5 w-5 mx-auto text-[#2B5BA8] mt-0.5" />
                    <span className="text-[9px] font-bold text-[#2B5BA8] block mt-1 leading-tight">Kode Backup</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Column 2 (span 3): 100% Aman & Terkunci */}
            <div className="col-span-12 lg:col-span-3 flex flex-col">
              <div className="h-full rounded-3xl bg-[#d4f0ef]/40 border border-[#2AACAB]/25 p-5.5 text-left flex flex-col justify-between relative overflow-hidden group shadow-[0_8px_30px_rgba(42,172,171,0.02)] transition-all hover:bg-[#d4f0ef]/50 duration-300">
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#2AACAB]/15 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-accent shadow-xs">
                    <ShieldCheckIcon className="h-4.5 w-4.5 stroke-[2.2]" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-accent tracking-widest uppercase">Gerbang Aman</span>
                </div>
                
                <div className="space-y-1 relative z-10 mt-8">
                  <span className="font-display text-4xl font-extrabold text-[#1a3a6e] block leading-none">100%</span>
                  <span className="font-display text-xs font-bold text-[#1a3a6e] block tracking-wide uppercase mt-1">Aman & Rahasia</span>
                  <p className="text-[11px] text-ink-soft leading-relaxed mt-2.5">
                    Hanya faskes terverifikasi yang dapat membuka data medis darurat Anda.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3 (span 4): Terminal Puskesmas / RSUD */}
            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <div className="h-full rounded-3xl border border-line bg-white p-5 text-left shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between relative group overflow-hidden">
                <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-accent to-[#5DB870] opacity-75" />
                
                <div className="relative space-y-4">
                  {/* Clinic Header */}
                  <div className="flex justify-between items-center border-b border-line pb-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-accent border border-accent/15">
                      <ClinicIcon className="h-3.5 w-3.5 text-accent" />
                      Puskesmas / Rumah Sakit
                    </span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  </div>

                  {/* Decrypted Data Sheet */}
                  <div className="rounded-2xl border border-line bg-paper/40 p-4 space-y-3.5 shadow-xs">
                    <div className="flex justify-between items-center text-[9px] border-b border-line/60 pb-1.5">
                      <span className="font-mono text-ink-soft/85 font-semibold">BUDI SANTOSO</span>
                      <span className="font-bold text-primary font-mono text-[8.5px] tracking-wider">DATA TERBACA</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <span className="text-[8px] font-bold text-ink-soft/50 uppercase tracking-wider block">Gol. Darah</span>
                        <span className="inline-block bg-[#056839]/10 text-[#056839] text-[9px] font-bold px-2 py-0.5 rounded-md border border-[#056839]/15 mt-0.5">
                          O Positif
                        </span>
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-ink-soft/50 uppercase tracking-wider block">Alergi Utama</span>
                        <span className="inline-block bg-alert-soft text-alert text-[9px] font-bold px-2 py-0.5 rounded-md border border-alert/15 mt-0.5">
                          Penisilin, Udang
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-[9px] text-ink-soft/60 font-mono text-right">
                  Terbaca aman &bull; Pemeriksaan dokter
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
