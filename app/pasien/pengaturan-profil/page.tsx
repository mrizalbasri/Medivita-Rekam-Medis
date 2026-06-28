"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileForm from "@/components/profil/ProfileForm";
import PasswordForm from "@/components/profil/PasswordForm";
import PhotoUploadForm from "@/components/profil/PhotoUploadForm";
import { PatientPrimaryNav } from "@/components/pasien/PatientPrimaryNav";
import { PatientBottomNav } from "@/components/pasien/PatientBottomNav";
import { PatientAccountMenu } from "@/components/pasien/PatientAccountMenu";

// Icons
function QrIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function HistoryIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

function LockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CancelIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function BellIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function SettingsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function LogoutIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function ScanIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
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
          <PatientPrimaryNav />

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Notification"
              className="relative rounded-full p-2 text-ink-soft hover:bg-primary-soft hover:text-primary transition-all"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-alert"></span>
            </button>
            <PatientAccountMenu
              name={userData?.name}
              email={userData?.email}
              profilePicture={userData?.profilePicture}
              onLogout={handleLogout}
            />
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

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-line shadow-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Foto Profil Section */}
              <div className="bg-white shadow-sm rounded-2xl border border-line overflow-hidden">
                <div className="px-5 py-6">
                  <h3 className="text-lg leading-6 font-display font-semibold text-primary-dark mb-4">
                    Foto Profil
                  </h3>
                  <PhotoUploadForm
                    currentPhotoUrl={userData?.profilePicture}
                    onSuccess={handlePhotoUpdate}
                  />
                </div>
              </div>

              {/* Data Pribadi Section */}
              <div className="bg-white shadow-sm rounded-2xl border border-line overflow-hidden">
                <div className="px-5 py-6">
                  <h3 className="text-lg leading-6 font-display font-semibold text-primary-dark mb-4">
                    Informasi Pribadi
                  </h3>
                  <ProfileForm
                    initialData={{
                      name: userData?.name || "",
                      email: userData?.email || "",
                    }}
                    onSuccess={handleProfileUpdate}
                  />
                </div>
              </div>

              {/* Keamanan Section */}
              <div className="bg-white shadow-sm rounded-2xl border border-line overflow-hidden">
                <div className="px-5 py-6">
                  <h3 className="text-lg leading-6 font-display font-semibold text-primary-dark mb-4">
                    Ubah Password
                  </h3>
                  <PasswordForm />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* FOOTER */}
      {/* ── FOOTER ── */}
      <footer className="mt-12 border-t border-line bg-primary-soft/30 py-6 px-4 text-center">
        <p className="text-xs text-ink-soft">
          © 2026 <span className="font-semibold text-primary-dark">Medivita · Rekam Medis Jalan</span> — Hak cipta dilindungi.
        </p>
      </footer>
      <PatientBottomNav />
    </div>
  );
}
