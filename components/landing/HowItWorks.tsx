const steps = [
  {
    n: "01",
    title: "Daftar & lengkapi data esensial",
    description:
      "Isi golongan darah, alergi, penyakit kronis, dan obat rutin. Sistem membuatkan QR unik plus kode cadangan 6 digit.",
  },
  {
    n: "02",
    title: "Petugas faskes memindai QR",
    description:
      "Saat Anda berkunjung ke faskes manapun, petugas memindai QR atau memasukkan kode cadangan dari dashboard mereka.",
  },
  {
    n: "03",
    title: "Data kritis tampil seketika",
    description:
      "Informasi yang berpotensi mengancam jiwa — alergi, golongan darah — ditandai mencolok agar tidak terlewat petugas.",
  },
  {
    n: "04",
    title: "Riwayat tercatat, Anda diberi tahu",
    description:
      "Kunjungan baru ditambahkan ke rekam medis, lalu Anda menerima notifikasi siapa yang baru saja mengakses data Anda.",
  },
];

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="bg-primary-soft/40 py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="mb-10 max-w-[640px]">
          <h2 className="font-display text-2xl font-semibold text-primary-dark md:text-3xl">
            Empat langkah, satu kali pindai
          </h2>
          <p className="mt-2 text-ink-soft">
            Dari pendaftaran sampai dicatat oleh faskes berikutnya — alurnya
            dirancang singkat agar tetap dipakai saat darurat.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.n} className="relative">
              <span className="font-mono text-3xl font-medium text-primary/25">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-[-12px] top-3 hidden h-px w-6 border-t border-dashed border-primary/30 md:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
