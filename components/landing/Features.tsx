import { QrIcon, ShieldCheckIcon, UserCogIcon } from "./icons";

const features = [
  {
    icon: ShieldCheckIcon,
    iconBg: "bg-primary-soft/50 text-primary border border-primary/10",
    tag: "§ 01",
    title: "100% Gratis",
    description:
      "Layanan pendaftaran pasien dan sistem pemindaian puskesmas gratis selamanya tanpa dipungut biaya apa pun.",
    glow: "group-hover:bg-primary/5",
    topLine: "from-[#2B5BA8] to-[#1a3a6e]"
  },
  {
    icon: QrIcon,
    iconBg: "bg-accent-soft/50 text-accent border border-accent/10",
    tag: "§ 02",
    title: "Tidak Wajib Punya HP Canggih",
    description:
      "Cukup cetak kartu QR Code Anda di kertas biasa dan bawa saat berobat. Anda tetap dilayani meskipun tidak membawa HP.",
    glow: "group-hover:bg-accent/5",
    topLine: "from-[#2AACAB] to-[#1b8786]"
  },
  {
    icon: UserCogIcon,
    iconBg: "bg-[#fdebec]/60 text-alert border border-alert/10",
    tag: "§ 03",
    title: "Data Medis Aman & Rahasia",
    description:
      "Data Anda terkunci rapat. Hanya dokter atau perawat yang sedang memeriksa Anda secara langsung yang dapat membacanya.",
    glow: "group-hover:bg-alert/5",
    topLine: "from-alert to-[#b71c1c]"
  },
];

export function Features() {
  return (
    <section id="keunggulan" className="mx-auto max-w-[1280px] px-4 py-20 md:px-10 md:py-24">
      <div className="mb-12 max-w-[640px] animate-fade-in-up">
        <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5 block">
          Sederhana & Aman
        </span>
        <h2 className="font-display text-2xl font-semibold text-primary-dark md:text-3xl tracking-tight">
          Dibuat agar mudah digunakan oleh siapa saja, di mana saja
        </h2>
        <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft">
          Medivita dirancang khusus agar berfungsi optimal bahkan di wilayah dengan sinyal internet terbatas dan mudah dipahami oleh masyarakat umum.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map(({ icon: Icon, iconBg, tag, title, description, glow, topLine }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6.5 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_16px_36px_rgba(26,58,110,0.06)] animate-fade-in-up"
          >
            {/* Top glowing line decoration */}
            <div className={`absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r ${topLine} transition-all duration-300 group-hover:w-full`} />
            
            {/* Subtle background glow on hover */}
            <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none ${glow}`} />

            <span className="absolute right-6 top-6 font-mono text-[10px] font-semibold text-ink-soft/40 uppercase tracking-widest">{tag}</span>
            
            <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${iconBg}`}>
              <Icon className="h-5 w-5" />
            </div>
            
            <h3 className="mb-2 font-display text-lg font-semibold text-ink transition-colors group-hover:text-primary-dark">{title}</h3>
            <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
