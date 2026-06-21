"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 py-24 text-center sm:py-32 lg:px-8 font-sans">
      <div className="relative flex flex-col items-center max-w-md bg-white border border-line rounded-3xl p-8 sm:p-12 shadow-xl">
        
        {/* Animated ECG Pulse to Flatline (404 themed) */}
        <div className="w-full h-32 text-primary/30 relative flex items-center justify-center mb-6">
          <svg
            className="w-full h-full stroke-primary"
            viewBox="0 0 200 100"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Background Medical Grid */}
            <path
              d="M 0,10 L 200,10 M 0,20 L 200,20 M 0,30 L 200,30 M 0,40 L 200,40 M 0,50 L 200,50 M 0,60 L 200,60 M 0,70 L 200,70 M 0,80 L 200,80 M 0,90 L 200,90"
              stroke="#e2eaf0"
              strokeWidth="0.5"
            />
            <path
              d="M 20,0 L 20,100 M 40,0 L 40,100 M 60,0 L 60,100 M 80,0 L 80,100 M 100,0 L 100,100 M 120,0 L 120,100 M 140,0 L 140,100 M 160,0 L 160,100 M 180,0 L 180,100"
              stroke="#e2eaf0"
              strokeWidth="0.5"
            />
            
            {/* Heartbeat pulse ending in flatline (reuses globals.css ecg-line class) */}
            <path
              d="M 10,50 L 40,50 L 50,30 L 55,75 L 60,45 L 65,55 L 75,50 L 95,50 L 100,50 L 110,20 L 118,80 L 124,45 L 129,55 L 135,50 L 195,50"
              className="ecg-line"
              strokeDasharray="24"
              strokeDashoffset="0"
            />
          </svg>
          <span className="absolute text-6xl font-display font-extrabold text-ink opacity-10 select-none">404</span>
        </div>

        <span className="inline-flex items-center rounded-md bg-alert-soft px-2.5 py-0.5 text-xs font-semibold text-alert ring-1 ring-inset ring-alert/15 font-mono uppercase tracking-wider">
          Error 404
        </span>

        <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Halaman Tidak Ditemukan
        </h1>
        
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Oops! Halaman yang Anda cari tidak dapat dijangkau. Mungkin alamat URL salah atau rekam medis digital ini telah dipindahkan.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Link
            href="/"
            className="w-full sm:w-auto rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-primary/95 transition-all active:scale-95 text-center"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/petugas/dashboard"
            className="w-full sm:w-auto rounded-xl border border-line bg-white px-5 py-3 text-sm font-bold text-ink hover:bg-paper transition-all active:scale-95 text-center"
          >
            Dashboard Petugas
          </Link>
        </div>
      </div>
    </main>
  );
}
