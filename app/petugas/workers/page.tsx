"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/petugas/Navbar";

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function HospitalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2z" />
      <path d="M14 2v6h6" />
      <path d="M14 13h-4v4h4v-4z" />
    </svg>
  );
}

// Sub-komponen untuk memuat konten halaman
function WorkersContent() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [workers, setWorkers] = useState<any[]>([]);
  const [facility, setFacility] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await fetch("/api/users/me");
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData.user);
        } else {
          router.push("/login");
          return;
        }

        const workersRes = await fetch("/api/petugas/workers");
        if (workersRes.ok) {
          const workersData = await workersRes.json();
          setWorkers(workersData.workers || []);
          setFacility(workersData.facility || null);
        }
      } catch (err) {
        console.error("Gagal mengambil data nakes:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  const handleScanClick = () => {
    router.push("/petugas/scan");
  };

  const doctorInitials = user ? user.name.replace(/^(dr\.|dr|dokter)\s+/i, "").split(" ").map((n: any) => n[0]).join("").slice(0, 2).toUpperCase() : "DR";
  const doctorName = user ? user.name : "Dokter Medivita";

  const filteredWorkers = workers.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.licenseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f8fa] flex flex-col font-sans">
      <Navbar onScanClick={handleScanClick} doctorInitials={doctorInitials} doctorName={doctorName} isLoading={!user} />

      <main className="flex-1 mx-auto w-full max-w-[1280px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-display text-ink">Daftar Tenaga Kesehatan</h1>
          <p className="text-xs text-ink-soft mt-1">
            Rekan petugas medis yang bertugas di fasilitas kesehatan Anda.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-line p-12 shadow-sm flex items-center justify-center min-h-[300px]">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Info Faskes Panel */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-line p-6 shadow-sm flex flex-col gap-4">
                <div className="h-12 w-12 bg-primary-soft text-primary rounded-2xl flex items-center justify-center">
                  <HospitalIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider">Lokasi Penugasan Anda</p>
                  <h2 className="text-xl font-bold font-display text-ink mt-1">{facility?.name || "Fasilitas Kesehatan"}</h2>
                  <p className="text-xs text-primary font-bold mt-1">Tipe: {facility?.type || "-"}</p>
                </div>
                <div className="border-t border-line pt-4 mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-ink-soft">Total Rekan Kerja</p>
                    <p className="text-2xl font-bold font-display text-ink mt-0.5">{workers.length}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-ink-soft">Status Keaktifan</p>
                    <p className="text-xs font-bold text-[#056839] bg-accent-soft px-2.5 py-1 rounded-full w-fit mt-1">Aktif Melayani</p>
                  </div>
                </div>
              </div>

              {/* Quick Search */}
              <div className="bg-white rounded-2xl border border-line p-6 shadow-sm flex flex-col gap-3">
                <h3 className="font-display text-sm font-bold text-ink">Cari Rekan Kerja</h3>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-ink-soft/60" />
                  <input
                    type="text"
                    placeholder="Nama, STR, atau email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-xs bg-paper text-ink transition-all"
                  />
                </div>
              </div>
            </div>

            {/* List Workers Table / Cards */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-line bg-paper/30">
                  <h3 className="font-display font-bold text-ink text-sm">Petugas Medis Terdaftar</h3>
                </div>

                {filteredWorkers.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-sm text-ink-soft">Rekan kerja tidak ditemukan.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-line">
                    {filteredWorkers.map((w) => (
                      <div key={w.id} className="p-6 flex items-start sm:items-center justify-between gap-4 hover:bg-[#f4f8fa]/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {w.name.replace(/^(dr\.|dr|dokter)\s+/i, "").split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-ink">{w.name}</h4>
                              {w.id === user?.petugas?.id && (
                                <span className="text-[10px] font-bold text-primary bg-primary-soft px-2 py-0.5 rounded-md">Anda</span>
                              )}
                            </div>
                            <p className="text-xs text-ink-soft mt-0.5">{w.email}</p>
                            <p className="text-[11px] font-semibold text-primary mt-1">STR: {w.licenseNo}</p>
                          </div>
                        </div>
                        <div className="text-right hidden sm:block">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#056839] bg-accent-soft px-2.5 py-1 rounded-full mb-1">
                            <ShieldCheckIcon className="h-3 w-3" /> Terverifikasi
                          </span>
                          <p className="text-[10px] text-ink-soft">Bergabung: {w.joinedAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-line py-8 mt-16 text-ink-soft">
        <div className="mx-auto max-w-[1280px] px-6 text-center text-xs font-mono">
          © 2026 Rekam Medis Jalan (Medivita). PekanIT 2026 Credits.
        </div>
      </footer>
    </div>
  );
}

export default function WorkersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f4f8fa]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
      </div>
    }>
      <WorkersContent />
    </Suspense>
  );
}
