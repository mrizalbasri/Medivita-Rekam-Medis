"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogoutIcon, ScanIcon, BellIcon, SettingsIcon, UserIcon } from "@/components/ui/icons";

interface NavbarProps {
  onScanClick?: () => void;
  doctorInitials?: string;
  doctorName?: string;
  isLoading?: boolean;
}

export function Navbar({ onScanClick, doctorInitials = "DR", doctorName = "Dokter Medivita", isLoading = false }: NavbarProps) {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  async function handleLogout() {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        if (res.ok) {
          window.location.href = "/";
        } else {
          alert("Gagal melakukan logout.");
        }
      } catch (err) {
        console.error(err);
        alert("Gagal menghubungi server.");
      }
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-line shadow-xs">
      <div className="mx-auto max-w-[1280px] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-9 w-14 flex-shrink-0 overflow-hidden">
            <Image
              src="/logo.webp"
              alt="Medivita Logo"
              fill
              sizes="56px"
              className="object-cover object-left"
              priority
            />
          </div>
          <span className="h-6 w-[1px] bg-line/80" aria-hidden />
          <div className="flex flex-col leading-tight mt-0.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-ink-soft">
              Rekam Medis
            </span>
            <span className="text-[13px] font-bold tracking-tight text-primary-dark">
              Jalan
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/petugas/dashboard" 
            className={`text-sm font-semibold transition-colors ${
              pathname === "/petugas/dashboard"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-ink-soft hover:text-primary"
            }`}
          >
            Dashboard
          </Link>
          <Link 
            href="/petugas/workers" 
            className={`text-sm font-semibold transition-colors ${
              pathname === "/petugas/workers"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-ink-soft hover:text-primary"
            }`}
          >
            Healthcare Workers
          </Link>
          <Link 
            href="/petugas/history" 
            className={`text-sm font-semibold transition-colors ${
              pathname === "/petugas/history"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-ink-soft hover:text-primary"
            }`}
          >
            Medical History
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onScanClick}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary/95 transition-all shadow-sm cursor-pointer"
          >
            <ScanIcon className="h-4.5 w-4.5" />
            Scan QR
          </button>
          <button className="rounded-full p-2 text-ink-soft hover:bg-primary-soft transition-colors relative cursor-pointer" aria-label="Notifikasi">
            <BellIcon className="h-5.5 w-5.5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-alert"></span>
          </button>
          <div className="flex items-center gap-2 border-l border-line pl-3 relative">
            <button 
              onClick={() => !isLoading && setIsDropdownOpen(!isDropdownOpen)}
              className={`h-9 w-9 rounded-full overflow-hidden flex items-center justify-center border border-line transition-all shadow-xs active:scale-95 ${
                isLoading 
                  ? "bg-line/40 animate-pulse cursor-not-allowed" 
                  : "bg-primary-soft hover:border-primary/50 cursor-pointer"
              }`}
              aria-label="Menu Profil"
              disabled={isLoading}
            >
              {isLoading ? (
                <UserIcon className="h-4 w-4 text-ink-soft/40" />
              ) : (
                <span className="text-xs font-bold text-primary">{doctorInitials}</span>
              )}
            </button>
            
            {isDropdownOpen && (
              <>
                {/* Backdrop overlay to close when clicking outside */}
                <div className="fixed inset-0 z-45 cursor-default" onClick={() => setIsDropdownOpen(false)} />
                
                {/* Dropdown Menu Panel */}
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-line bg-white p-2 shadow-xl z-50 animate-fade-in-up">
                  <div className="px-3.5 py-3 border-b border-line mb-1.5">
                    <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider">Petugas Medis</p>
                    {isLoading ? (
                      <div className="h-4 bg-line rounded-md animate-pulse w-32 mt-1"></div>
                    ) : (
                      <p className="font-bold text-sm text-ink truncate mt-0.5" title={doctorName}>{doctorName}</p>
                    )}
                  </div>
                  
                  <Link 
                    href="/petugas/settings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-ink-soft hover:bg-primary-soft hover:text-primary transition-colors cursor-pointer"
                  >
                    <SettingsIcon className="h-4.5 w-4.5" />
                    Pengaturan Akun
                  </Link>
                  
                  <button 
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-alert hover:bg-alert-soft transition-colors cursor-pointer"
                  >
                    <LogoutIcon className="h-4.5 w-4.5" />
                    Keluar Sesi
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
