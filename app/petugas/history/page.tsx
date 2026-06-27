"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/petugas/Navbar";
import { ActivityIcon, EyeIcon, FilePlusIcon, SearchIcon } from "@/components/ui/icons";

// Sub-komponen untuk memuat konten halaman
function HistoryContent() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
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

        const logsRes = await fetch("/api/petugas/logs");
        if (logsRes.ok) {
          const logsData = await logsRes.json();
          setLogs(logsData.logs || []);
        }
      } catch (err) {
        console.error("Gagal mengambil data log:", err);
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

  const filteredLogs = logs.filter((l) =>
    l.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.patientNik.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getActionBadge = (action: string) => {
    switch (action) {
      case "READ_MEDIS":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-primary-soft px-2.5 py-1 rounded-full">
            <EyeIcon className="h-3.5 w-3.5" /> Buka Rekam Medis
          </span>
        );
      case "CREATE_KUNJUNGAN":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#056839] bg-accent-soft px-2.5 py-1 rounded-full">
            <FilePlusIcon className="h-3.5 w-3.5" /> Tambah Kunjungan
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ink-soft bg-line px-2.5 py-1 rounded-full">
            {action}
          </span>
        );
    }
  };

  // Hitung statistik
  const totalReads = logs.filter(l => l.action === "READ_MEDIS").length;
  const totalWrites = logs.filter(l => l.action === "CREATE_KUNJUNGAN").length;

  return (
    <div className="min-h-screen bg-[#f4f8fa] flex flex-col font-sans">
      <Navbar onScanClick={handleScanClick} doctorInitials={doctorInitials} doctorName={doctorName} isLoading={!user} />

      <main className="flex-1 mx-auto w-full max-w-[1280px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-display text-ink">Riwayat Akses Medis (Log Audit)</h1>
          <p className="text-xs text-ink-soft mt-1">
            Log audit aktivitas pembacaan dan pembaruan berkas rekam medis terenkripsi pasien oleh Anda.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-line p-12 shadow-sm flex items-center justify-center min-h-[300px]">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Stats Panel */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-line p-6 shadow-sm flex flex-col gap-4">
                <div className="h-12 w-12 bg-primary-soft text-primary rounded-2xl flex items-center justify-center">
                  <ActivityIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider">Aktivitas Sesi Ini</p>
                  <h2 className="text-xl font-bold font-display text-ink mt-1">Total {logs.length} Akses</h2>
                  <p className="text-xs text-ink-soft mt-1">Log tercatat otomatis demi kepatuhan regulasi keamanan data medis.</p>
                </div>
                <div className="border-t border-line pt-4 mt-2 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-ink-soft">Membuka Berkas</span>
                    <span className="font-bold text-ink">{totalReads} kali</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-ink-soft">Menulis Kunjungan</span>
                    <span className="font-bold text-ink">{totalWrites} kali</span>
                  </div>
                </div>
              </div>

              {/* Quick Search */}
              <div className="bg-white rounded-2xl border border-line p-6 shadow-sm flex flex-col gap-3">
                <h3 className="font-display text-sm font-bold text-ink">Cari Log Aktivitas</h3>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-ink-soft/60" />
                  <input
                    type="text"
                    placeholder="Nama pasien, NIK, atau aksi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-xs bg-paper text-ink transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Logs List */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-line bg-paper/30">
                  <h3 className="font-display font-bold text-ink text-sm">Riwayat Aktivitas Medis</h3>
                </div>

                {filteredLogs.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-sm text-ink-soft">Log aktivitas tidak ditemukan.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-line">
                    {filteredLogs.map((log) => (
                      <div key={log.id} className="p-6 flex items-start sm:items-center justify-between gap-4 hover:bg-[#f4f8fa]/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${log.action === 'READ_MEDIS' ? 'bg-primary-soft text-primary' : 'bg-accent-soft text-accent'}`}>
                            {log.action === "READ_MEDIS" ? <EyeIcon className="h-4 w-4" /> : <FilePlusIcon className="h-4 w-4" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-ink">Mengakses data rekam medis pasien</h4>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-ink-soft">
                              <span className="font-bold text-ink">{log.patientName}</span>
                              <span>•</span>
                              <span>NIK: {log.patientNik}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1.5">
                          {getActionBadge(log.action)}
                          <span className="text-[10px] text-ink-soft">{log.timestamp}</span>
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

export default function HistoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f4f8fa]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
      </div>
    }>
      <HistoryContent />
    </Suspense>
  );
}
