"use client";

import { useState } from "react";`nimport * as Icons from "@/components/ui/icons";`nimport { MedivitaLogo } from "@/components/ui/logo";
import Image from "next/image";
import Link from "next/link";

// Custom SVG Icons for the Patient Dashboard
 {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 11 2 2 4-4" />
    </svg>
  );
}

function HospitalIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 21V9a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v12" />
      <path d="M2 21h20" />
      <path d="M12 9v4M10 11h4" />
    </svg>
  );
}

function CapsuleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m10.5 3.5 10 10a7.07 7.07 0 1 1-10-10Z" />
      <line x1="8.5" y1="15.5" x2="15.5" y2="8.5" />
    </svg>
  );
}

function RefreshIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  );
}

// Interactive Patient Dashboard
export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [accessRevoked, setAccessRevoked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleDownload = () => {
    alert("Mengunduh QR Code Sarah Az-Zahra...");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRevokeAccess = () => {
    if (confirm("Apakah Anda yakin ingin mencabut semua akses faskes sementara ke rekam medis Anda?")) {
      setAccessRevoked(true);
      alert("Semua akses aktif telah berhasil dicabut.");
    }
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
            <a
              href="#"
              className="relative py-2 text-sm font-semibold text-primary after:absolute after:bottom-[-16px] after:left-0 after:h-[3px] after:w-full after:bg-primary after:rounded-full"
            >
              Dashboard
            </a>
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
              <Icons.ScanIcon className="h-4 w-4 stroke-[2.5]" />
              Scan QR
            </button>
            <button
              onClick={() => {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
              }}
              aria-label="Notification"
              className="relative rounded-full p-2 text-ink-soft hover:bg-primary-soft hover:text-primary transition-all"
            >
              <Icons.BellIcon className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-alert"></span>
            </button>
            <button
              onClick={() => alert("Pengaturan akun pasien...")}
              aria-label="Settings"
              className="rounded-full p-2 text-ink-soft hover:bg-primary-soft hover:text-primary transition-all"
            >
              <Icons.SettingsIcon className="h-5 w-5" />
            </button>
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-line shadow-sm hover:scale-105 transition-transform cursor-pointer">
              <Image
                src="/sarah-avatar.png"
                alt="Sarah Az-Zahra Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* NOTIFICATION TOAST */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-xl bg-primary-dark p-4 text-sm text-white shadow-xl animate-in fade-in slide-in-from-top duration-300">
          <ShieldCheckIcon className="h-5 w-5 text-accent" />
          <span>Keamanan enkripsi aktif. Semua data medis Anda aman.</span>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 md:px-10">
        
        {/* PATIENT METADATA SECTION */}
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold tracking-widest text-[#1e77b0] uppercase">
              Patient Overview
            </p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-primary-dark">
              Welcome back, Sarah Az-Zahra
            </h1>
          </div>
          <div className="flex items-center gap-2 font-medium text-ink-soft text-sm bg-white border border-line py-2 px-3.5 rounded-xl shadow-xs self-start sm:self-auto">
            <Icons.CalendarIcon className="h-4 w-4 text-primary" />
            <span>October 24, 2026</span>
          </div>
        </div>

        {/* THREE-COLUMN GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* COLUMN 1: LEFT SIDEBAR & CRITICAL DATA (lg:col-span-3) */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            
            {/* Sidebar Navigation Card */}
            <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
              <nav className="flex flex-col gap-1">
                <Link
                  href="/pasien/dashboard"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all bg-primary-soft text-primary"
                >
                  <Icons.QrIcon className="h-5 w-5" />
                  <span>Overview</span>
                </Link>
                <Link
                  href="/pasien/profil-medis"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all text-ink-soft hover:bg-primary-soft/40 hover:text-primary"
                >
                  <Icons.ProfileIcon className="h-5 w-5" />
                  <span>Medical Profile</span>
                </Link>
                <Link
                  href="/pasien/riwayat-kunjungan"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all text-ink-soft hover:bg-primary-soft/40 hover:text-primary"
                >
                  <Icons.HistoryIcon className="h-5 w-5" />
                  <span>Visit History</span>
                </Link>
                <button
                  onClick={() => alert("Membuka detail log akses...")}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all text-ink-soft hover:bg-primary-soft/40 hover:text-primary cursor-pointer"
                >
                  <Icons.LockIcon className="h-5 w-5" />
                  <span>Access Logs</span>
                </button>
                <button
                  onClick={handleRevokeAccess}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-alert hover:bg-alert-soft transition-all cursor-pointer"
                >
                  <Icons.CancelIcon className="h-5 w-5 text-alert" />
                  <span>Cabut Akses</span>
                </button>
              </nav>
            </div>

            {/* Critical Data Card */}
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-mono text-xs font-bold tracking-wider text-ink-soft">
                CRITICAL DATA
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-ink-soft font-medium mb-1.5">Blood Type</p>
                  <span className="inline-block rounded-md bg-[#0b3c5d] px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider">
                    B Positive
                  </span>
                </div>
                <div>
                  <p className="text-xs text-ink-soft font-medium mb-1.5">Known Allergies</p>
                  <span className="inline-block rounded-md bg-alert px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider">
                    Penicillin, Peanuts
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: MIDDLE QR PRESENTATION CARD (lg:col-span-6) */}
          <div className="lg:col-span-6">
            <div className="flex flex-col items-center rounded-2xl border border-line bg-white p-8 text-center shadow-sm h-full justify-between">
              <div>
                <h2 className="font-display text-md font-semibold text-primary-dark mb-2">
                  Universal Health ID
                </h2>
                <p className="mx-auto max-w-[380px] text-xs leading-relaxed text-ink-soft">
                  Present this QR code to any registered Medivita partner clinic or hospital for instant medical record access.
                </p>
              </div>

              {/* QR Container */}
              <div className="my-8 flex h-[280px] w-[280px] items-center justify-center rounded-2xl border border-[#e1f0f7] bg-[#f4f8fa] p-4 shadow-inner relative group">
                <div className="relative h-[220px] w-[220px] bg-white rounded-xl shadow-md p-3 flex items-center justify-center border border-line group-hover:scale-102 transition-transform duration-300">
                  {/* Clean Vector SVG QR Code matching the mockup */}
                  <svg className={`h-full w-full ${accessRevoked ? "opacity-30 blur-xs" : ""}`} viewBox="0 0 100 100" fill="currentColor">
                    {/* Finder pattern top-left */}
                    <rect x="0" y="0" width="30" height="30" fill="#0a2835" rx="3" />
                    <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                    <rect x="10" y="10" width="10" height="10" fill="#1e77b0" rx="1" />

                    {/* Finder pattern top-right */}
                    <rect x="70" y="0" width="30" height="30" fill="#0a2835" rx="3" />
                    <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                    <rect x="80" y="10" width="10" height="10" fill="#1e77b0" rx="1" />

                    {/* Finder pattern bottom-left */}
                    <rect x="0" y="70" width="30" height="30" fill="#0a2835" rx="3" />
                    <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                    <rect x="10" y="80" width="10" height="10" fill="#1e77b0" rx="1" />

                    {/* QR Code body patterns (simulated matrix matching UI mockup) */}
                    <rect x="35" y="0" width="5" height="15" fill="#1e77b0" rx="1" />
                    <rect x="45" y="0" width="10" height="5" fill="#0a2835" rx="1" />
                    <rect x="60" y="5" width="5" height="10" fill="#1e77b0" rx="1" />
                    <rect x="35" y="20" width="15" height="5" fill="#0a2835" rx="1" />
                    <rect x="55" y="20" width="10" height="10" fill="#1e77b0" rx="1" />

                    <rect x="35" y="35" width="5" height="20" fill="#0a2835" rx="1" />
                    <rect x="45" y="35" width="20" height="5" fill="#1e77b0" rx="1" />
                    <rect x="50" y="45" width="10" height="10" fill="#0a2835" rx="1" />
                    <rect x="70" y="35" width="15" height="10" fill="#1e77b0" rx="1" />
                    <rect x="70" y="50" width="5" height="15" fill="#0a2835" rx="1" />
                    <rect x="80" y="55" width="10" height="5" fill="#1e77b0" rx="1" />

                    <rect x="35" y="70" width="5" height="10" fill="#1e77b0" rx="1" />
                    <rect x="35" y="85" width="15" height="5" fill="#0a2835" rx="1" />
                    <rect x="45" y="75" width="15" height="5" fill="#0a2835" rx="1" />
                    <rect x="55" y="85" width="5" height="10" fill="#1e77b0" rx="1" />
                    <rect x="65" y="70" width="10" height="10" fill="#0a2835" rx="1" />
                    <rect x="80" y="70" width="5" height="20" fill="#1e77b0" rx="1" />
                    <rect x="90" y="75" width="5" height="10" fill="#0a2835" rx="1" />
                    <rect x="70" y="90" width="20" height="5" fill="#0a2835" rx="1" />
                  </svg>
                  {accessRevoked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-xl p-4">
                      <Icons.CancelIcon className="h-10 w-10 text-alert mb-2" />
                      <span className="text-xs font-bold text-alert">Akses Dinonaktifkan</span>
                      <button 
                        onClick={() => setAccessRevoked(false)}
                        className="mt-3 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-dark transition-colors"
                      >
                        Aktifkan Kembali
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="w-full">
                <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    disabled={accessRevoked}
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#0b3c5d] px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                  >
                    <Icons.DownloadIcon className="h-4 w-4" />
                    Download QR
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-primary-soft/50 transition-all shadow-xs"
                  >
                    <Icons.PrinterIcon className="h-4 w-4 text-primary" />
                    Print Card
                  </button>
                </div>

                {/* Footer Encrypted Status */}
                <div className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#056839] px-5 py-2 text-xs font-semibold text-white shadow-xs">
                  <ShieldCheckIcon className="h-4 w-4 text-white" />
                  <span>End-to-End Encrypted Access Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: ACCESS LOGS & VISIT HISTORY (lg:col-span-3) */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            
            {/* Access Logs Card */}
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-primary-dark">
                  Log Akses
                </h3>
                <button
                  onClick={() => alert("Membuka detail log akses...")}
                  className="text-xs font-bold text-[#1e77b0] hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {/* Log Item 1 */}
                <div className="flex gap-3 items-start hover:bg-primary-soft/20 p-1.5 rounded-lg transition-colors cursor-pointer">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <HospitalIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary-dark">RS Pondok Indah</h4>
                    <p className="text-[11px] text-ink-soft">General Practitioner Access</p>
                    <span className="text-[10px] italic text-ink-soft">2 hours ago</span>
                  </div>
                </div>

                {/* Log Item 2 */}
                <div className="flex gap-3 items-start hover:bg-accent-soft/50 p-1.5 rounded-lg transition-colors cursor-pointer">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <CapsuleIcon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary-dark">Apotek Kimia Farma</h4>
                    <p className="text-[11px] text-ink-soft">Prescription Retrieval</p>
                    <span className="text-[10px] italic text-ink-soft">Yesterday, 14:20</span>
                  </div>
                </div>

                {/* Log Item 3 */}
                <div className="flex gap-3 items-start hover:bg-primary-soft/20 p-1.5 rounded-lg transition-colors cursor-pointer">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft/40 text-ink-soft">
                    <RefreshIcon className="h-5 w-5 text-ink-soft" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary-dark">Medivita Web App</h4>
                    <p className="text-[11px] text-ink-soft">Personal Data Export</p>
                    <span className="text-[10px] italic text-ink-soft">21 Oct 2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Riwayat Kunjungan Card */}
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-display text-sm font-bold text-primary-dark">
                Riwayat Kunjungan
              </h3>

              <div className="relative border-l-2 border-line pl-4 ml-2 space-y-5">
                {/* Timeline Item 1 */}
                <div className="relative">
                  <span className="absolute -left-[23px] top-1 flex h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-white"></span>
                  <h4 className="text-xs font-bold text-primary-dark">Dr. Andreas Susanto</h4>
                  <p className="text-[11px] text-ink-soft">Annual Health Checkup</p>
                  <span className="mt-1 inline-block text-[10px] font-bold text-[#1e77b0] hover:underline cursor-pointer">
                    Status: Completed
                  </span>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative">
                  <span className="absolute -left-[23px] top-1 flex h-2.5 w-2.5 rounded-full bg-ink-soft/40 ring-4 ring-white"></span>
                  <h4 className="text-xs font-bold text-primary-dark">Lab Prodia</h4>
                  <p className="text-[11px] text-ink-soft">Blood Panel Analysis</p>
                  <span className="text-[10px] text-ink-soft italic">14 Oct 2026</span>
                </div>
              </div>
            </div>
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

