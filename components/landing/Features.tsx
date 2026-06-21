import { QrIcon, ShieldCheckIcon, UserCogIcon } from "./icons";

const features = [
  {
    icon: ShieldCheckIcon,
    iconBg: "bg-primary-soft text-primary",
    tag: "§ 01",
    title: "Keamanan AES-256",
    description:
      "Data medis Anda dienkripsi dengan standar setara militer, AES-256-GCM, sehingga hanya pihak yang Anda izinkan yang bisa membacanya.",
  },
  {
    icon: QrIcon,
    iconBg: "bg-accent-soft text-accent",
    tag: "§ 02",
    title: "Akses Cepat Lewat QR",
    description:
      "Dalam keadaan darurat, petugas medis cukup memindai QR di ponsel atau kartu fisik Anda untuk melihat data kritis dalam hitungan detik.",
  },
  {
    icon: UserCogIcon,
    iconBg: "bg-alert-soft text-alert",
    tag: "§ 03",
    title: "Kendali Penuh di Tangan Anda",
    description:
      "Anda menentukan siapa yang boleh mengakses rekam medis Anda, dan setiap akses tercatat dalam log yang bisa Anda tinjau kapan saja.",
  },
];

export function Features() {
  return (
    <section id="keunggulan" className="mx-auto max-w-[1280px] px-4 py-16 md:px-10 md:py-20">
      <div className="mb-10 max-w-[640px]">
        <h2 className="font-display text-2xl font-semibold text-primary-dark md:text-3xl">
          Dibangun di atas tiga prinsip
        </h2>
        <p className="mt-2 text-ink-soft">
          Bukan basis data terpusat baru — Rekam Medis Jalan adalah lapisan
          portabel yang bisa berdampingan dengan sistem faskes yang sudah ada.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {features.map(({ icon: Icon, iconBg, tag, title, description }) => (
          <div
            key={title}
            className="group relative rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_14px_32px_rgba(11,91,82,0.1)]"
          >
            <span className="absolute right-5 top-5 font-mono text-[11px] text-ink-soft/60">{tag}</span>
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold text-ink">{title}</h3>
            <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
