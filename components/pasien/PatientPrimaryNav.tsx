"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  activeOn: string[];
};

const navItems: NavItem[] = [
  { label: "Beranda", href: "/pasien/dashboard", activeOn: ["/pasien/dashboard"] },
  { label: "Profil Medis", href: "/pasien/profil-medis", activeOn: ["/pasien/profil-medis"] },
  { label: "Riwayat", href: "/pasien/riwayat-kunjungan", activeOn: ["/pasien/riwayat-kunjungan"] },
  { label: "Log Akses", href: "/pasien/access-log", activeOn: ["/pasien/access-log"] },
];

export function PatientPrimaryNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 md:flex h-full">
      {navItems.map((item) => {
        const isActive = item.activeOn.includes(pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`py-2 text-sm font-medium transition-colors ${
              isActive
                ? "relative font-semibold text-primary after:absolute after:bottom-[-16px] after:left-0 after:h-[3px] after:w-full after:bg-primary after:rounded-full"
                : "text-ink-soft hover:text-primary"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
