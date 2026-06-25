"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileForm from "@/components/profil/ProfileForm";
import PasswordForm from "@/components/profil/PasswordForm";
import PhotoUploadForm from "@/components/profil/PhotoUploadForm";

// Icons
function QrIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3z" />
      <path d="M20 14v3" />
      <path d="M17 20h4" />
    </svg>
  );
}

function ProfileIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function HistoryIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

function LockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CancelIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function BellIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function SettingsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function LogoutIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function ScanIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 11 2 2 4-4" />
    </svg>
  );
}

export default function PengaturanProfilPage() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users/me");
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        }
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  const handleProfileUpdate = (newData: any) => {
    setUserData((prev: any) => ({ ...prev, ...newData }));
  };

  const handlePhotoUpdate = (newPhotoUrl: string) => {
    setUserData((prev: any) => ({ ...prev, profilePicture: newPhotoUrl }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-9 w-14 flex-shrink-0 overflow-hidden">
              <Image
                src="/logo.webp"
                alt="Medivita Logo"
                fill
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

          {/* Navigation Links */}
          <nav className="hidden items-center gap-8 md:flex h-full">
            <Link href="/pasien/dashboard" className="py-2 text-sm font-medium text-ink-soft hover:text-primary transition-colors">
              Dashboard
            </Link>
            <a href="#" className="py-2 text-sm font-medium text-ink-soft hover:text-primary transition-colors">
              Patients
            </a>
            <a href="#" className="py-2 text-sm font-medium text-ink-soft hover:text-primary transition-colors">
              Healthcare Workers
            </a>
            <a href="#" className="py-2 text-sm font-medium text-ink-soft hover:text-primary transition-colors">
              Medical History
            </a>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => alert("Membuka kamera pemindai...")}
              className="flex items-center gap-2 rounded-xl bg-[#0b3c5d] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary active:scale-95 shadow-sm"
            >
              <ScanIcon className="h-4 w-4 stroke-[2.5]" />
              Scan QR
            </button>
            <button
              aria-label="Notification"
              className="relative rounded-full p-2 text-ink-soft hover:bg-primary-soft hover:text-primary transition-all"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-alert"></span>
            </button>
            <Link
              href="/pasien/pengaturan-profil"
              aria-label="Settings"
              className="rounded-full p-2 text-primary bg-primary-soft transition-all"
            >
              <SettingsIcon className="h-5 w-5" />
            </Link>
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="rounded-full p-2 text-ink-soft hover:bg-alert-soft hover:text-alert transition-all"
            >
              <LogoutIcon className="h-5 w-5" />
            </button>
            <span className="h-6 w-[1px] bg-line/80 mx-1" aria-hidden />
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-line shadow-sm hover:scale-105 transition-transform cursor-pointer">
              <Image
                src={userData?.profilePicture || "/sarah-avatar.png"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 md:px-10">
        
        {/* PATIENT METADATA SECTION */}
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold tracking-widest text-[#1e77b0] uppercase">
              Account Settings
            </p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-primary-dark">
              Pengaturan Profil
            </h1>
          </div>
        </div>

        {/* THREE-COLUMN GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* COLUMN 1: LEFT SIDEBAR */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
              <nav className="flex flex-col gap-1">
                <Link
                  href="/pasien/dashboard"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all text-ink-soft hover:bg-primary-soft/40 hover:text-primary"
                >
                  <QrIcon className="h-5 w-5" />
                  <span>Overview</span>
                </Link>
                <Link
                  href="/pasien/profil-medis"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all text-ink-soft hover:bg-primary-soft/40 hover:text-primary"
                >
                  <ProfileIcon className="h-5 w-5" />
                  <span>Medical Profile</span>
                </Link>
                <Link
                  href="/pasien/riwayat-kunjungan"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all text-ink-soft hover:bg-primary-soft/40 hover:text-primary"
                >
                  <HistoryIcon className="h-5 w-5" />
                  <span>Visit History</span>
                </Link>
                <Link
                  href="/pasien/pengaturan-privasi"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all text-ink-soft hover:bg-primary-soft/40 hover:text-primary"
                >
                  <ShieldCheckIcon className="h-5 w-5" />
                  <span>Pengaturan Privasi</span>
                </Link>
                <button
                  onClick={() => alert("Membuka detail log akses...")}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all text-ink-soft hover:bg-primary-soft/40 hover:text-primary cursor-pointer"
                >
                  <LockIcon className="h-5 w-5" />
                  <span>Access Logs</span>
                </button>
                <button
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-alert hover:bg-alert-soft transition-all cursor-pointer"
                >
                  <CancelIcon className="h-5 w-5 text-alert" />
                  <span>Cabut Akses</span>
                </button>
              </nav>
            </div>
          </div>

          {/* COLUMN 2: FORMS */}
          <div className="lg:col-span-9 space-y-6">
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-line shadow-sm">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                {/* Foto Profil Section */}
                <div className="bg-white shadow-sm rounded-2xl border border-line overflow-hidden">
                  <div className="px-5 py-6">
                    <h3 className="text-lg leading-6 font-display font-semibold text-primary-dark mb-4">Foto Profil</h3>
                    <PhotoUploadForm 
                      currentPhotoUrl={userData?.profilePicture} 
                      onSuccess={handlePhotoUpdate} 
                    />
                  </div>
                </div>

                {/* Data Pribadi Section */}
                <div className="bg-white shadow-sm rounded-2xl border border-line overflow-hidden">
                  <div className="px-5 py-6">
                    <h3 className="text-lg leading-6 font-display font-semibold text-primary-dark mb-4">Informasi Pribadi</h3>
                    <ProfileForm 
                      initialData={{ name: userData?.name || "", email: userData?.email || "" }} 
                      onSuccess={handleProfileUpdate} 
                    />
                  </div>
                </div>

                {/* Keamanan Section */}
                <div className="bg-white shadow-sm rounded-2xl border border-line overflow-hidden">
                  <div className="px-5 py-6">
                    <h3 className="text-lg leading-6 font-display font-semibold text-primary-dark mb-4">Ubah Password</h3>
                    <PasswordForm />
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-line bg-primary-soft/30 mt-12">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-12 md:grid-cols-12 md:px-10">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                <Image
                  src="/logo.webp"
                  alt="Medivita Logo"
                  fill
                  className="object-cover object-top scale-[1.3] -translate-y-[8%]"
                />
              </div>
              <span className="font-display text-base font-semibold text-primary-dark">
                Rekam Medis Jalan (Medivita)
              </span>
            </div>
            <p className="mt-3 max-w-[360px] text-xs leading-relaxed text-ink-soft">
              Empowering patients with secure, portable, and instant access to their medical history anywhere in the world.
            </p>
            <p className="mt-6 font-mono text-[10px] text-ink-soft">
              &copy; 2026 PekanIT 2026 Credits.
            </p>
          </div>

          <div className="col-span-6 sm:col-span-3 md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-primary-dark font-bold">
              Platform
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-ink-soft">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Hospitals Partner</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">App Store</a></li>
            </ul>
          </div>

          <div className="col-span-6 sm:col-span-3 md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-primary-dark font-bold">
              Company
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-ink-soft">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Info</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-primary-dark font-bold">
              Newsletter
            </h4>
            <p className="mt-2 text-xs text-ink-soft leading-relaxed mb-3">
              Stay updated on latest medical security standards.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Terima kasih telah bergabung!"); }} className="flex gap-2">
              <input
                type="email"
                placeholder="email@example.com"
                required
                className="flex-1 rounded-xl border border-line bg-white px-3 py-2 text-xs outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#0b3c5d] px-4 py-2 text-xs font-semibold text-white hover:bg-primary-dark transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
