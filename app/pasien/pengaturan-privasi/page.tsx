"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Icons ─────────────────────────────────────────────────────────────────────
function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function DownloadIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function AlertIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function MonitorIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function SmartphoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
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

function BellIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
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

function LogoutIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// ── Toggle Switch ─────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        checked ? "bg-[#2AACAB] focus:ring-[#2AACAB]" : "bg-gray-200 focus:ring-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PengaturanPrivasiPage() {
  const [userData, setUserData] = useState<any>(null);
  const [shareData, setShareData] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleExport = () => {
    alert("Mengunduh data rekam medis Anda dalam format terenkripsi (PDF/JSON)...");
  };

  const handleDeleteAccount = () => {
    const confirmed = confirm(
      "⚠️ PERINGATAN: Tindakan ini TIDAK DAPAT dibatalkan!\n\nSemua data pribadi dan rekam medis Anda akan dihapus secara permanen.\n\nApakah Anda benar-benar yakin?"
    );
    if (confirmed) {
      alert("Permintaan penghapusan akun telah dikirim. Tim kami akan menghubungi Anda.");
    }
  };

  const activities = [
    { icon: <MonitorIcon />, label: "Login Berhasil", device: "Desktop", time: "Hari ini, 14:32" },
    { icon: <ShieldIcon className="h-4 w-4" />, label: "Pengaturan Privasi Diubah", device: "Berbagi Data", time: "Hari ini, 11:15" },
    { icon: <MonitorIcon />, label: "Data Diekspor", device: "", time: "10 Okt, 16:20" },
    { icon: <SmartphoneIcon />, label: "Login Berhasil", device: "Mobile", time: "10 Okt, 09:45" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-line bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-8 w-12 flex-shrink-0 overflow-hidden">
              <Image src="/logo.webp" alt="Medivita Logo" fill className="object-cover object-left" priority />
            </div>
            <span className="text-[14px] font-bold tracking-tight text-primary-dark">Rekam Medis Jalan</span>
          </Link>

          {/* Right: Back button + Avatar */}
          <div className="flex items-center gap-3">
            <Link
              href="/pasien/dashboard"
              className="flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft hover:border-primary hover:text-primary transition-all"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Kembali ke Dashboard
            </Link>
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-line shadow-sm hover:scale-105 transition-transform cursor-pointer">
              <Image src={userData?.profilePicture || "/sarah-avatar.png"} alt="Profile" fill className="object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto w-full max-w-[860px] flex-1 px-4 py-10 md:px-6">
        {/* Page Title */}
        <div className="mb-8">
          <p className="font-mono text-xs font-semibold tracking-widest text-[#1e77b0] uppercase mb-1">Akun &amp; Keamanan</p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-primary-dark">
            Pengaturan Privasi Data Peserta
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
          <div className="px-6 py-6 space-y-8">

            {/* Kontrol Privasi */}
            <section>
              <h2 className="text-base font-bold text-primary-dark mb-5">Kontrol Privasi</h2>

              {/* Pengaturan Privasi Umum */}
              <div className="mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-ink-soft mb-4">Pengaturan Privasi Umum</h3>
                <div className="space-y-4">
                  {/* Toggle 1 */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                        <ShieldIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary-dark">Berbagi data dengan pihak ketiga</p>
                        <p className="text-xs text-ink-soft mt-0.5 max-w-sm">
                          Izinkan Medivita membagikan data terenkripsi Anda dengan mitra kesehatan dan riset resmi untuk peningkatan layanan.
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      <Toggle checked={shareData} onChange={() => setShareData(!shareData)} />
                    </div>
                  </div>

                  {/* Toggle 2 */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                        <MailIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary-dark">Izinkan notifikasi email</p>
                        <p className="text-xs text-ink-soft mt-0.5 max-w-sm">
                          Terima pembaruan penting, janji temu, dan hasil lab melalui email.
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      <Toggle checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-line" />

            {/* Aksi Akun */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-ink-soft mb-4">Aksi Akun</h3>
              <div className="space-y-4">

                {/* Ekspor Data */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                      <DownloadIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-dark">Ekspor Data Anda</p>
                      <p className="text-xs text-ink-soft mt-0.5 max-w-sm">
                        Unduh salinan lengkap rekam medis Anda dalam format terenkripsi (PDF/JSON).
                      </p>
                      <p className="text-xs text-ink-soft mt-1">Terakhir: 12 Okt 2026</p>
                    </div>
                  </div>
                  <button
                    onClick={handleExport}
                    className="flex-shrink-0 rounded-xl border border-[#2AACAB] px-4 py-2 text-sm font-semibold text-[#2AACAB] hover:bg-primary-soft transition-colors"
                  >
                    Ekspor Data
                  </button>
                </div>

                {/* Hapus Akun */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-alert">
                      <AlertIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-dark">Hapus Akun Medivita</p>
                      <p className="text-xs text-ink-soft mt-0.5 max-w-sm">
                        Hapus semua data pribadi dan rekam medis secara permanen. Tindakan ini tidak dapat dibatalkan.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-shrink-0 rounded-xl bg-alert px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 shadow-sm transition-colors"
                  >
                    Hapus Akun
                  </button>
                </div>
              </div>
            </section>

            <hr className="border-line" />

            {/* Aktivitas Terakhir */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-ink-soft mb-4">Aktivitas Terakhir</h3>
              <div className="divide-y divide-line rounded-xl border border-line overflow-hidden">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-primary">
                        {a.icon}
                      </div>
                      <span className="text-sm text-primary-dark">{a.label}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-ink-soft">
                      {a.device && <span>{a.device}</span>}
                      <span>{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Simpan Perubahan */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 rounded-2xl bg-[#2AACAB] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1b8786] transition-colors shadow-sm disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Menyimpan...
                  </>
                ) : saved ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Tersimpan!
                  </>
                ) : (
                  <>
                    Simpan Perubahan
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-line bg-primary-soft/30 mt-12">
        <div className="mx-auto max-w-[1280px] px-4 py-6 md:px-10 text-center">
          <p className="font-mono text-[10px] text-ink-soft">&copy; 2026 PekanIT 2026 Credits.</p>
        </div>
      </footer>
    </div>
  );
}
