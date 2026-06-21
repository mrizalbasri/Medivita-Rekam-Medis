import React from "react";
import Link from "next/link";

function ScanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" />
      <path d="M4 12h16" />
    </svg>
  );
}

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 10a6 6 0 1 1 12 0c0 3 1 5 1.5 6H4.5C5 15 6 13 6 10Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

interface NavbarProps {
  onScanClick?: () => void;
  doctorInitials?: string;
}

export function Navbar({ onScanClick, doctorInitials = "DR" }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-line shadow-xs">
      <div className="mx-auto max-w-[1280px] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="relative h-10 w-10 overflow-hidden rounded-xl bg-primary-soft flex items-center justify-center">
            <span className="font-display font-bold text-primary text-lg">M</span>
          </Link>
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-ink">
              Rekam Medis Jalan
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-semibold text-ink-soft hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="#" className="text-sm font-semibold text-primary border-b-2 border-primary pb-1">
            Patients
          </Link>
          <Link href="#" className="text-sm font-semibold text-ink-soft hover:text-primary transition-colors">
            Healthcare Workers
          </Link>
          <Link href="#" className="text-sm font-semibold text-ink-soft hover:text-primary transition-colors">
            Medical History
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onScanClick}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary/95 transition-all shadow-sm"
          >
            <ScanIcon className="h-4.5 w-4.5" />
            Scan QR
          </button>
          <button className="rounded-full p-2 text-ink-soft hover:bg-primary-soft transition-colors relative" aria-label="Notifikasi">
            <BellIcon className="h-5.5 w-5.5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-alert"></span>
          </button>
          <button className="rounded-full p-2 text-ink-soft hover:bg-primary-soft transition-colors" aria-label="Pengaturan">
            <SettingsIcon className="h-5.5 w-5.5" />
          </button>
          <div className="flex items-center gap-2 border-l border-line pl-3">
            <div className="h-9 w-9 rounded-full bg-primary-soft overflow-hidden flex items-center justify-center border border-line">
              <span className="text-xs font-bold text-primary">{doctorInitials}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
