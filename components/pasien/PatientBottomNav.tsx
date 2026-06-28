"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "@/components/ui/icons";

const navItems = [
  { label: "Beranda", href: "/pasien/dashboard", icon: Icons.QrIcon },
  { label: "Profil", href: "/pasien/profil-medis", icon: Icons.ProfileIcon },
  { label: "Riwayat", href: "/pasien/riwayat-kunjungan", icon: Icons.HistoryIcon },
  { label: "Akses", href: "/pasien/access-log", icon: Icons.LockIcon },
];

export function PatientBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-sm md:hidden ">
      <ul className="mx-auto grid max-w-[720px] grid-cols-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex min-h-[56px] flex-col items-center justify-center gap-1 px-1 text-[11px] font-semibold ${
                  isActive ? "text-primary" : "text-ink-soft"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
