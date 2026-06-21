import { ClinicIcon, HospitalIcon, LabIcon, PuskesmasIcon } from "./icons";

const partners = [
  { icon: HospitalIcon, name: "RSUD Sentosa" },
  { icon: ClinicIcon, name: "Klinik Pratama" },
  { icon: LabIcon, name: "Lab Prodia" },
  { icon: PuskesmasIcon, name: "Puskesmas Maju" },
];

export function Partners() {
  return (
    <section id="mitra" className="border-t border-line py-12">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-widest text-ink-soft">
          Disiapkan untuk dipakai lintas fasilitas kesehatan
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map(({ icon: Icon, name }) => (
            <div key={name} className="flex items-center gap-2 text-ink-soft">
              <Icon className="h-5 w-5 text-primary/70" />
              <span className="font-display text-sm font-semibold">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
