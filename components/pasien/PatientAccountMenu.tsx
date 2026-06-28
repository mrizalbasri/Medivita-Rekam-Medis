"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "@/components/ui/icons";

type PatientAccountMenuProps = {
  name?: string | null;
  email?: string | null;
  profilePicture?: string | null;
  onLogout?: () => Promise<void> | void;
};

export function PatientAccountMenu({
  name,
  email,
  profilePicture,
  onLogout,
}: PatientAccountMenuProps) {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      if (onLogout) {
        await onLogout();
        return;
      }

      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-line bg-white p-1 pr-2 hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-line shadow-sm">
          <Image
            src={profilePicture || "/sarah-avatar.png"}
            alt={name || "Profil"}
            fill
            className="object-cover"
          />
        </div>
        <span className="hidden max-w-[110px] truncate text-sm font-semibold text-primary-dark md:block">
          {name || "Akun"}
        </span>
        <Icons.ChevronDownIcon className="h-4 w-4 text-ink-soft" />
      </button>

      {open && (
        <>
          {/* Backdrop overlay untuk menangkap klik luar secara andal di mobile */}
          <div className="fixed inset-0 z-40 cursor-default" onClick={() => setOpen(false)} />
          
          <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-white shadow-lg z-50">
            <div className="border-b border-line px-3 py-2">
              <p className="truncate text-sm font-semibold text-primary-dark">{name || "Akun"}</p>
              <p className="truncate text-xs text-ink-soft">{email || ""}</p>
            </div>

            <div className="p-1">
              <Link 
                href="/pasien/pengaturan-profil" 
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-ink-soft hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
              >
                <Icons.SettingsIcon className="h-4 w-4" />
                Pengaturan Profil
              </Link>
              <Link 
                href="/pasien/pengaturan-privasi" 
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-ink-soft hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
              >
                <Icons.ShieldCheckIcon className="h-4 w-4" />
                Pengaturan Privasi
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-alert hover:bg-alert-soft active:bg-alert-soft/80 transition-colors cursor-pointer"
              >
                <Icons.LogoutIcon className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
