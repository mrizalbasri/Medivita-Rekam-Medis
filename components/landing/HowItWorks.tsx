const steps = [
  {
    n: "01",
    title: "Daftar Singkat & Gratis",
    description:
      "Isi golongan darah, alergi obat, penyakit utama, atau obat rutin Anda. Hanya butuh waktu 5 menit.",
  },
  {
    n: "02",
    title: "Simpan di HP atau Cetak Kertas",
    description:
      "Tidak wajib punya HP. Anda bisa mengunduh kartu QR Code dan mencetaknya di kertas biasa untuk disimpan di dompet.",
  },
  {
    n: "03",
    title: "Tunjukkan QR Saat Berobat",
    description:
      "Saat berobat ke Puskesmas atau Rumah Sakit, tunjukkan QR Code Anda untuk dipindai oleh dokter atau perawat.",
  },
  {
    n: "04",
    title: "Dokter Langsung Tahu",
    description:
      "Informasi alergi dan obat rutin Anda langsung tampil di layar dokter. Pengobatan menjadi lebih cepat dan aman.",
  },
];


export function HowItWorks() {
  return (
    <section id="cara-kerja" className="bg-gradient-to-b from-paper/60 to-paper/20 py-16 md:py-20 border-y border-line/40">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="mb-12 max-w-[640px] animate-fade-in-up">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2AACAB] mb-2.5 block">
            Alur Penggunaan
          </span>
          <h2 className="font-display text-2xl font-semibold text-primary-dark md:text-3xl tracking-tight">
            Empat langkah sederhana, satu kali pindai
          </h2>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft">
            Dari pendaftaran sampai dicatat oleh faskes berikutnya — alurnya
            dirancang singkat agar tetap praktis digunakan bahkan saat darurat.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.n}
              className="group relative rounded-2xl border border-line/60 bg-white/70 p-6 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#2AACAB]/30 hover:bg-white hover:shadow-[0_16px_36px_rgba(26,58,110,0.05)] animate-fade-in-up"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2AACAB]/10 text-xs font-bold text-[#2AACAB] font-mono border border-[#2AACAB]/15 transition-colors group-hover:bg-[#2AACAB] group-hover:text-white">
                {step.n}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink group-hover:text-primary-dark transition-colors">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

