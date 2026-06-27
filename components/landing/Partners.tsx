import { ClinicIcon, HospitalIcon, LabIcon, PuskesmasIcon } from "./icons";
import { ScrollReveal } from "../ui/ScrollReveal";

const partners = [
  { icon: HospitalIcon, name: "RSUD Sentosa", color: "hover:text-[#2B5BA8]", bg: "hover:bg-[#2B5BA8]/10" },
  { icon: ClinicIcon, name: "Klinik Pratama", color: "hover:text-[#2AACAB]", bg: "hover:bg-[#2AACAB]/10" },
  { icon: LabIcon, name: "Lab Prodia", color: "hover:text-[#5DB870]", bg: "hover:bg-[#5DB870]/10" },
  { icon: PuskesmasIcon, name: "Puskesmas Maju", color: "hover:text-[#2AACAB]", bg: "hover:bg-[#2AACAB]/10" },
];

const delays = [100, 200, 300, 400] as const;

export function Partners() {
  return (
    <section id="mitra" className="mx-auto max-w-[1280px] px-4 py-8 md:px-10">
      <ScrollReveal variant="zoom" delay={100} className="w-full">
        <div className="rounded-3xl border border-line/70 bg-white/50 p-8 md:p-10 backdrop-blur-xs shadow-[0_8px_30px_rgba(26,58,110,0.02)]">
          <p className="mb-8 text-center font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink-soft/70 animate-pulse">
            Disiapkan untuk Integrasi Lintas Fasilitas Kesehatan
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {partners.map(({ icon: Icon, name, color, bg }, index) => {
              const delay = delays[index % delays.length];
              return (
                <ScrollReveal key={name} variant="fade" delay={delay}>
                  <div
                    className={`flex items-center gap-3 rounded-2xl border border-line/30 bg-white/80 px-5 py-3 text-ink-soft shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_12px_24px_rgba(26,58,110,0.04)] ${color} group cursor-pointer`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-ink-soft/5 text-ink-soft/70 transition-all duration-300 group-hover:scale-105 ${bg}`}>
                      <Icon className="h-4.5 w-4.5 transition-colors duration-300" />
                    </div>
                    <span className="font-display text-sm font-semibold transition-colors duration-300">{name}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

