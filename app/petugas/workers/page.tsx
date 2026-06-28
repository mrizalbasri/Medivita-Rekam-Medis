"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/petugas/Navbar";
import { UserIcon, ShieldCheckIcon, SearchIcon, HospitalIcon } from "@/components/ui/icons";

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
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent/20 border-t-accent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Info Faskes Panel */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-line p-6 shadow-sm flex flex-col gap-4">
                <div className="h-12 w-12 bg-accent-soft text-accent rounded-2xl flex items-center justify-center">
                  <HospitalIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider">Lokasi Penugasan Anda</p>
                  <h2 className="text-xl font-bold font-display text-ink mt-1">{facility?.name || "Fasilitas Kesehatan"}</h2>
                  <p className="text-xs text-accent font-bold mt-1">Tipe: {facility?.type || "-"}</p>
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
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-line focus:border-accent focus:ring-1 focus:ring-accent focus:outline-hidden text-xs bg-paper text-ink transition-all"
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
                          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                            {w.name.replace(/^(dr\.|dr|dokter)\s+/i, "").split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-ink">{w.name}</h4>
                              {w.id === user?.petugas?.id && (
                                <span className="text-[10px] font-bold text-accent bg-accent-soft px-2 py-0.5 rounded-md">Anda</span>
                              )}
                            </div>
                            <p className="text-xs text-ink-soft mt-0.5">{w.email}</p>
                            <p className="text-[11px] font-semibold text-accent mt-1">STR: {w.licenseNo}</p>
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

      <footer className="bg-white border-t border-line py-6 mt-16 text-ink-soft">
        <div className="mx-auto max-w-[1280px] px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display font-bold text-ink text-sm">Medivita — Rekam Medis Jalan</span>
          <p className="text-[11px] font-mono">© 2026 Medivita. Hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}

export default function WorkersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f4f8fa]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/20 border-t-accent"></div>
      </div>
    }>
      <WorkersContent />
    </Suspense>
  );
}
