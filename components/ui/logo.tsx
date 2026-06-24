import Image from "next/image";

export const MedivitaLogo = ({ className = "flex items-center gap-3" }: { className?: string }) => (
  <div className={className}>
    <div className="relative h-9 w-9 overflow-hidden rounded-lg">
      <Image
        src="/logo.webp"
        alt="Medivita Logo"
        fill
        sizes="36px"
        className="object-cover object-top scale-[1.3] -translate-y-[8%]"
      />
    </div>
    <span className="font-display text-base font-semibold text-primary-dark">
      Rekam Medis Jalan (Medivita)
    </span>
  </div>
);
