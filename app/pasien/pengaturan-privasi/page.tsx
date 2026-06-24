"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Icons ───────────────────────────────────────────────────────────────────

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
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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

function AlertTriangleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

function CheckCircleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MonitorIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function SmartphoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({ enabled, onToggle, id }: { enabled: boolean; onToggle: () => void; id: string }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      style={{ backgroundColor: enabled ? "#2AACAB" : "#cbd5e1" }}
      className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B5BA8] focus-visible:ring-offset-2"
    >
      <span
        className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300"
        style={{ transform: enabled ? "translateX(22px)" : "translateX(3px)" }}
      />
    </button>
  );
}

// ─── Activity Log data ────────────────────────────────────────────────────────

type ActivityItem = {
  action: string;
  detail: string;
  time: string;
  icon: "desktop" | "mobile" | "shield";
};

const ACTIVITY_LOGS: ActivityItem[] = [
  { action: "Login Berhasil",            detail: "Desktop",      time: "Hari ini, 14:32", icon: "desktop" },
  { action: "Pengaturan Privasi Diubah", detail: "Berbagi Data", time: "Hari ini, 11:15", icon: "shield"  },
  { action: "Data Diekspor",             detail: "",             time: "10 Okt, 16:20",   icon: "desktop" },
  { action: "Login Berhasil",            detail: "Mobile",       time: "10 Okt, 09:45",   icon: "mobile"  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PengaturanPrivasiPage() {
  const [shareData, setShareData]           = useState(true);
  const [emailNotif, setEmailNotif]         = useState(true);
  const [saved, setSaved]                   = useState(false);
  const [exportProgress, setExportProgress] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNotif, setShowNotif]           = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleExport() {
    setExportProgress(true);
    setTimeout(() => {
      setExportProgress(false);
      alert("Data rekam medis Anda berhasil diekspor sebagai file terenkripsi.");
    }, 2000);
  }

  function confirmDelete() {
    setShowDeleteModal(false);
    alert("Permintaan hapus akun dikirim. Tim kami akan menghubungi Anda dalam 24 jam.");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f4f8]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-[#e2e8f0] bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-10">
          <Link href="/pasien/dashboard" className="flex items-center gap-2">
            <div className="relative h-9 w-14 flex-shrink-0 overflow-hidden">
              <Image src="/logo.webp" alt="Medivita Logo" fill className="object-cover object-left" priority />
            </div>
            <span className="h-6 w-[1px] bg-[#e2e8f0]" aria-hidden />
            <div className="flex flex-col leading-tight mt-0.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#64748b]">Rekam Medis</span>
              <span className="text-[13px] font-bold tracking-tight text-[#0f172a]">Jalan</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setShowNotif(true); setTimeout(() => setShowNotif(false), 3000); }}
              aria-label="Notifikasi"
              className="relative rounded-full p-2 text-[#64748b] hover:bg-[#eff6ff] hover:text-[#2B5BA8] transition-all"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#ef4444]" />
            </button>

            <Link
              href="/pasien/pengaturan-privasi"
              aria-label="Pengaturan Privasi"
              className="rounded-full p-2 bg-[#eff6ff] text-[#2B5BA8] transition-all"
            >
              <SettingsIcon className="h-5 w-5" />
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#e2e8f0] shadow-sm hover:scale-105 transition-transform cursor-pointer">
                <Image src="/sarah-avatar.png" alt="Sarah Az-Zahra" fill className="object-cover" />
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-[13px] font-bold text-[#0f172a]">Sarah K.</span>
                <span className="text-[11px] text-[#64748b]">sarah.k@mail.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TOAST */}
      {showNotif && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-xl bg-[#0f172a] px-4 py-3 text-sm text-white shadow-xl">
          <ShieldIcon className="h-4 w-4 text-[#2AACAB]" />
          <span>Enkripsi data medis aktif. Data Anda aman.</span>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fef2f2]">
              <AlertTriangleIcon className="h-7 w-7 text-[#ef4444]" />
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] mb-2">Hapus Akun Medivita?</h3>
            <p className="text-sm text-[#64748b] leading-relaxed mb-6">
              Semua data pribadi dan rekam medis Anda akan dihapus secara permanen. Tindakan ini{" "}
              <span className="font-semibold text-[#ef4444]">tidak dapat dibatalkan</span>.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-xl border border-[#e2e8f0] py-3 text-sm font-semibold text-[#0f172a] hover:bg-[#f8fafc] transition-all"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-[#ef4444] py-3 text-sm font-semibold text-white hover:bg-[#dc2626] transition-all shadow-sm"
              >
                Ya, Hapus Akun
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="mx-auto w-full max-w-[820px] flex-1 px-4 py-10 md:px-6">
        <div className="mb-6">
          <p className="font-mono text-xs font-semibold tracking-widest text-[#2B5BA8] uppercase mb-1">Akun &amp; Keamanan</p>
          <h1 className="text-3xl font-bold tracking-tight text-[#0f172a]">Pengaturan Privasi Data Peserta</h1>
        </div>

        <div className="rounded-2xl bg-white shadow-sm border border-[#e2e8f0] overflow-hidden">

          {/* Card header */}
          <div className="px-8 pt-7 pb-5 border-b border-[#f1f5f9]">
            <h2 className="text-xl font-bold text-[#0f172a]">Kontrol Privasi</h2>
          </div>

          <div className="px-8 py-6 space-y-8">

            {/* Section 1 – Privasi Umum */}
            <section>
              <h3 className="text-sm font-bold text-[#0f172a] mb-4">Pengaturan Privasi Umum</h3>

              <div className="flex items-start gap-4 py-4 border-b border-[#f1f5f9]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff]">
                  <ShieldIcon className="h-5 w-5 text-[#2B5BA8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0f172a]">Berbagi data dengan pihak ketiga</p>
                  <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">
                    Izinkan Medivita membagikan data terenkripsi Anda dengan mitra kesehatan dan riset resmi untuk peningkatan layanan.
                  </p>
                </div>
                <Toggle id="toggle-share-data" enabled={shareData} onToggle={() => setShareData(v => !v)} />
              </div>

              <div className="flex items-start gap-4 pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f9ff]">
                  <MailIcon className="h-5 w-5 text-[#0284c7]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0f172a]">Izinkan notifikasi email</p>
                  <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">
                    Terima pembaruan penting, janji temu, dan hasil lab melalui email.
                  </p>
                </div>
                <Toggle id="toggle-email-notif" enabled={emailNotif} onToggle={() => setEmailNotif(v => !v)} />
              </div>
            </section>

            {/* Section 2 – Aksi Akun */}
            <section>
              <h3 className="text-sm font-bold text-[#0f172a] mb-4">Aksi Akun</h3>

              <div className="flex items-start gap-4 py-4 border-b border-[#f1f5f9]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff]">
                  <DownloadIcon className="h-5 w-5 text-[#2B5BA8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0f172a]">Ekspor Data Anda</p>
                  <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">
                    Unduh salinan lengkap rekam medis Anda dalam format terenkripsi (PDF/JSON).
                  </p>
                  {exportProgress && (
                    <div className="mt-2 h-1.5 w-full rounded-full bg-[#e2e8f0] overflow-hidden">
                      <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-[#2B5BA8] to-[#2AACAB] animate-pulse" />
                    </div>
                  )}
                  {!exportProgress && (
                    <p className="text-[11px] text-[#94a3b8] mt-1">Terakhir: 12 Okt 2026</p>
                  )}
                </div>
                <button
                  id="btn-ekspor-data"
                  onClick={handleExport}
                  disabled={exportProgress}
                  className="shrink-0 rounded-xl border border-[#2B5BA8] px-4 py-2 text-sm font-semibold text-[#2B5BA8] hover:bg-[#eff6ff] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {exportProgress ? "Memproses…" : "Ekspor Data"}
                </button>
              </div>

              <div className="flex items-start gap-4 pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fef2f2]">
                  <AlertTriangleIcon className="h-5 w-5 text-[#ef4444]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0f172a]">Hapus Akun Medivita</p>
                  <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">
                    Hapus semua data pribadi dan rekam medis secara permanen. Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
                <button
                  id="btn-hapus-akun"
                  onClick={() => setShowDeleteModal(true)}
                  className="shrink-0 rounded-xl bg-[#ef4444] px-4 py-2 text-sm font-semibold text-white hover:bg-[#dc2626] transition-all shadow-sm"
                >
                  Hapus Akun
                </button>
              </div>
            </section>

            {/* Section 3 – Aktivitas Terakhir */}
            <section>
              <h3 className="text-sm font-bold text-[#0f172a] mb-4">Aktivitas Terakhir</h3>
              <div className="rounded-xl border border-[#e2e8f0] overflow-hidden">
                {ACTIVITY_LOGS.map((log, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-[#f8fafc] ${i < ACTIVITY_LOGS.length - 1 ? "border-b border-[#f1f5f9]" : ""}`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b]">
                      {log.icon === "desktop" && <MonitorIcon className="h-4 w-4" />}
                      {log.icon === "mobile"  && <SmartphoneIcon className="h-4 w-4" />}
                      {log.icon === "shield"  && <ShieldIcon className="h-4 w-4" />}
                    </div>
                    <span className="flex-1 text-sm text-[#0f172a] font-medium">{log.action}</span>
                    {log.detail && (
                      <span className="text-xs text-[#64748b] hidden sm:block">{log.detail}</span>
                    )}
                    <span className="text-xs text-[#94a3b8] ml-auto">{log.time}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Simpan Perubahan */}
            <div className="flex justify-end pt-2">
              <button
                id="btn-simpan-perubahan"
                onClick={handleSave}
                className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#2B5BA8] to-[#2AACAB] px-7 py-3 text-sm font-bold text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {saved ? (
                  <>
                    <CheckCircleIcon className="h-4 w-4" />
                    Tersimpan!
                  </>
                ) : (
                  <>
                    Simpan Perubahan
                    <CheckCircleIcon className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/pasien/dashboard" className="text-xs text-[#64748b] hover:text-[#2B5BA8] transition-colors font-medium">
            ← Kembali ke Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
