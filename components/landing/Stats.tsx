import { ShieldCheckIcon, QrIcon, UserCogIcon, LockIcon } from "./icons";

const stats = [
  {
    value: "100% Aman",
    label: "Sistem Terlindungi",
    desc: "Data medis Anda terkunci rapat dan hanya dibuka di hadapan petugas medis berwenang.",
    icon: ShieldCheckIcon,
    accent: "text-primary"
  },
  {
    value: "Gratis",
    label: "Layanan Pasien & Faskes",
    desc: "Pasien maupun fasilitas kesehatan tidak dikenakan biaya pendaftaran atau pemakaian.",
    icon: LockIcon,
    accent: "text-accent"
  },
  {
    value: "Instan",
    label: "Akses Pindai QR",
    desc: "Cukup tunjukkan kode QR Anda, informasi rekam medis darurat langsung terbaca petugas.",
    icon: QrIcon,
    accent: "text-accent"
  },
  {
    value: "Penuh",
    label: "Kontrol Hak Akses",
    desc: "Anda bebas menentukan kapan dan siapa saja faskes yang boleh mengakses data Anda.",
    icon: UserCogIcon,
    accent: "text-primary"
  }
];


export function Stats() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 md:px-10 animate-fade-in-up">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-line/60 bg-white/60 p-6.5 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-[0_16px_36px_rgba(26,58,110,0.04)]"
            >
              {/* Decorative top dot */}
              <span className="absolute top-4 right-4 flex h-2 w-2 rounded-full bg-line group-hover:bg-primary transition-colors" />
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-ink-soft/5 ${stat.accent} transition-transform group-hover:scale-105`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft/70">
                    {stat.label}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-display text-2xl font-bold tracking-tight text-primary-dark bg-gradient-to-r from-primary-dark via-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                  {stat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
