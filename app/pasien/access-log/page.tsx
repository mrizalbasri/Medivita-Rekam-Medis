"use client";

import React, { useEffect, useState } from "react";
import * as Icons from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { PatientPrimaryNav } from "@/components/pasien/PatientPrimaryNav";
import { PatientBottomNav } from "@/components/pasien/PatientBottomNav";
import { PatientAccountMenu } from "@/components/pasien/PatientAccountMenu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function ShieldCheckIcon({ className = "h-4 w-4" }: { className?: string }) {
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

const activityData = [
  { name: "Minggu 1", akses: 12 },
  { name: "Minggu 2", akses: 25 },
  { name: "Minggu 3", akses: 8 },
  { name: "Minggu 4", akses: 15 },
];

const distributionData = [
  { name: "Read Only", value: 60, color: "#0b3c5d" },
  { name: "Update Record", value: 30, color: "#056839" },
  { name: "Emergency", value: 10, color: "#e84c3d" },
];

const baseMockLogs = [
  {
    date: "Oct 24, 2023",
    time: "09:45 AM",
    facility: "Klinik Sehat Utama",
    location: "Jakarta Pusat",
    staff: "Dr. Budi Santoso",
    role: "General Practitioner",
    accessType: "Read Only",
    accessColor: "text-primary bg-primary-soft",
    duration: "Session Active",
    isActive: true,
    accessedDetails: [
      "Melihat Hasil Lab Darah (Kolesterol)",
      "Melihat Riwayat Obat Rutin",
    ],
  },
  {
    date: "Oct 15, 2023",
    time: "23:12 PM",
    facility: "RSUD Tarakan",
    location: "Jakarta Pusat",
    staff: "Nurse Siti Rahma",
    role: "ER Triage",
    accessType: "Emergency Access",
    accessColor: "text-alert bg-alert-soft",
    duration: "Duration: 45m",
    isActive: false,
    accessedDetails: [
      "Melihat Riwayat Alergi (Penisilin)",
      "Melihat Kondisi Kronis",
    ],
  },
  {
    date: "Sep 02, 2023",
    time: "14:20 PM",
    facility: "Puskesmas Kebayoran",
    location: "Jakarta Selatan",
    staff: "Dr. Andi Wijaya",
    role: "Dentist",
    accessType: "Update Record",
    accessColor: "text-ink-soft bg-line",
    duration: "Duration: 20m",
    isActive: false,
    accessedDetails: [
      "Menambahkan Catatan Kunjungan Gigi",
      "Memperbarui Resep Obat (Ibuprofen)",
    ],
  },
  {
    date: "Aug 18, 2023",
    time: "10:00 AM",
    facility: "Klinik Mata Nusantara",
    location: "Jakarta Barat",
    staff: "Dr. Rina Suryani",
    role: "Ophthalmologist",
    accessType: "Read Only",
    accessColor: "text-primary bg-primary-soft",
    duration: "Duration: 35m",
    isActive: false,
    accessedDetails: ["Melihat Rujukan Mata Sebelumnya"],
  },
];

// Generate 24 items by repeating the base logs
const mockAccessLogs = Array.from({ length: 24 }).map((_, idx) => {
  const base = baseMockLogs[idx % 4];
  return {
    ...base,
    id: idx + 1,
    // Slightly randomize dates for realism if needed, but keeping it simple
  };
});

type ToastState = {
  message: string;
  kind: "info" | "success" | "error";
} | null;

type UserProfile = {
  name?: string;
  email?: string;
  profilePicture?: string | null;
};

export default function AccessLogPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [logs, setLogs] = useState(mockAccessLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [pendingRevokeId, setPendingRevokeId] = useState<number | null>(null);
  const itemsPerPage = 4;

  const toggleRow = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/me");
        if (!response.ok) return;
        const payload = (await response.json()) as { user?: UserProfile };
        setUserData(payload.user ?? null);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    fetchUser();
  }, []);

  const filteredLogs = logs.filter(
    (log) =>
      log.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.staff.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const showToast = (
    message: string,
    kind: "info" | "success" | "error" = "info",
  ) => {
    setToast({ message, kind });
    setTimeout(() => setToast(null), 2600);
  };

  const handleRevoke = (id: number) => {
    setPendingRevokeId(id);
  };

  const confirmRevoke = () => {
    if (pendingRevokeId === null) return;

    setLogs((prevLogs) =>
      prevLogs.map((log) =>
        log.id === pendingRevokeId
          ? { ...log, isActive: false, duration: "Session Revoked" }
          : log,
      ),
    );

    setPendingRevokeId(null);
    showToast("Session revoked successfully.", "success");
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
                sizes="56px"
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
              onClick={() =>
                showToast("Fitur Scan QR sedang disiapkan.", "info")
              }
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
            <PatientAccountMenu
              name={userData?.name}
              email={userData?.email}
              profilePicture={userData?.profilePicture}
            />
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

      {toast && (
        <div
          className={`fixed bottom-4 right-4 z-50 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${
            toast.kind === "success"
              ? "bg-[#056839]"
              : toast.kind === "error"
                ? "bg-alert"
                : "bg-primary-dark"
          }`}
        >
          {toast.message}
        </div>
      )}

      {pendingRevokeId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-primary-dark">
              Confirm Revoke
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Are you sure you want to revoke this active session immediately?
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setPendingRevokeId(null)}
                className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink-soft hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmRevoke}
                className="rounded-lg bg-alert px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Revoke now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-12 md:px-10">
        {/* PAGE HEADER */}
        <div className="mb-8 max-w-3xl">
          <h1 className="font-display text-3xl font-bold tracking-tight text-primary-dark mb-3">
            Detailed Access Log
          </h1>
          <p className="text-sm leading-relaxed text-ink-soft">
            Review when and where your medical records were accessed. You can
            revoke active sessions immediately if you notice suspicious
            activity.
          </p>
        </div>

        {/* ANALYTICS DASHBOARD */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-primary-dark mb-6">
              Aktivitas 30 Hari Terakhir
            </h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#64748b" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#64748b" }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f4f8fa" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="akses"
                    fill="#0b3c5d"
                    radius={[4, 4, 0, 0]}
                    barSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-primary-dark mb-6">
              Distribusi Jenis Akses
            </h3>
            <div className="h-48 w-full flex items-center justify-center">
              <div className="h-full w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center gap-3 w-1/2 pl-4">
                {distributionData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-xs font-medium text-ink-soft">
                      {entry.name}
                    </span>
                    <span className="text-xs font-bold text-primary-dark ml-auto">
                      {entry.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ACCESS LOG TABLE CARD */}
        <div className="rounded-2xl border border-line bg-white shadow-sm overflow-hidden">
          {/* Table Controls (Filter/Search) */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-line p-5 bg-white">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Icons.SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
                <input
                  type="text"
                  placeholder="Search facility or staff..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-xl border border-line bg-[#f4f8fa] py-2 pl-9 pr-4 text-sm text-ink outline-none transition-colors focus:border-primary focus:bg-white"
                />
              </div>
              <div className="relative w-36">
                <select className="w-full appearance-none rounded-xl border border-line bg-white py-2 pl-4 pr-10 text-sm font-medium text-ink-soft outline-none transition-colors focus:border-primary cursor-pointer">
                  <option>Last 30 Days</option>
                  <option>Last 3 Months</option>
                  <option>Last 6 Months</option>
                  <option>All Time</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex items-center gap-2 text-xs font-semibold text-[#056839] bg-[#eaf5ec] px-3 py-1.5 rounded-full border border-[#d2ebd7]">
              <ShieldCheckIcon className="h-4 w-4" />
              All active sessions verified
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-ink-soft">
              <thead className="bg-[#f4f8fa] text-[10px] font-bold uppercase tracking-wider text-ink-soft/70">
                <tr>
                  <th className="px-6 py-4 w-10"></th>
                  <th className="px-4 py-4">DATE / TIME</th>
                  <th className="px-6 py-4">FACILITY NAME</th>
                  <th className="px-6 py-4">STAFF NAME & ROLE</th>
                  <th className="px-6 py-4">ACCESS TYPE</th>
                  <th className="px-6 py-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {paginatedLogs.map((log) => (
                  <React.Fragment key={log.id}>
                    <tr
                      onClick={() => toggleRow(log.id)}
                      className="hover:bg-[#f9fbfc] transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4 text-ink-soft group-hover:text-primary transition-colors">
                        <svg
                          className={`h-5 w-5 transition-transform duration-200 ${expandedRowId === log.id ? "rotate-90 text-primary" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-bold text-primary-dark mb-1">
                          {log.date}
                        </div>
                        <div className="text-xs">{log.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-primary-dark mb-1">
                          {log.facility}
                        </div>
                        <div className="text-xs">{log.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-primary-dark mb-1">
                          {log.staff}
                        </div>
                        <div className="text-xs">{log.role}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${log.accessColor} mb-1.5`}
                        >
                          {log.accessType === "Emergency Access" && (
                            <svg
                              className="h-3 w-3"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2L2 22h20L12 2zm1 16h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                            </svg>
                          )}
                          {log.accessType === "Read Only" && (
                            <svg
                              className="h-3 w-3"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                          {log.accessType === "Update Record" && (
                            <svg
                              className="h-3 w-3"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                          )}
                          {log.accessType}
                        </div>
                        <div
                          className={`text-[10px] font-semibold ${log.isActive ? "text-primary" : "text-ink-soft/70"}`}
                        >
                          {log.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {log.isActive ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRevoke(log.id);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-alert/30 text-alert px-3 py-1.5 text-xs font-bold hover:bg-alert-soft transition-colors shadow-xs active:scale-95"
                          >
                            <Icons.CancelIcon className="h-3 w-3" />
                            Revoke
                          </button>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 text-ink-soft/60 px-3 py-1.5 text-xs font-semibold">
                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            Closed
                          </div>
                        )}
                      </td>
                    </tr>
                    {expandedRowId === log.id && (
                      <tr className="bg-[#f4f8fa]/50">
                        <td
                          colSpan={6}
                          className="px-6 py-4 border-l-2 border-primary"
                        >
                          <div className="pl-10">
                            <p className="text-xs font-bold text-primary-dark mb-2">
                              Detail Data Medis yang Diakses:
                            </p>
                            <ul className="space-y-1.5">
                              {log.accessedDetails?.map((detail, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-ink-soft flex items-center gap-2"
                                >
                                  <svg
                                    className="h-3 w-3 text-primary shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="3"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-line bg-white px-6 py-4">
            <p className="text-xs text-ink-soft font-medium">
              Showing{" "}
              <span className="font-bold text-primary-dark">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-primary-dark">
                {Math.min(currentPage * itemsPerPage, filteredLogs.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-primary-dark">
                {filteredLogs.length}
              </span>{" "}
              entries
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-md px-3 py-1.5 text-xs font-semibold text-ink-soft opacity-50 cursor-not-allowed disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary transition-colors cursor-pointer"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    currentPage === i + 1
                      ? "bg-primary font-bold text-white shadow-xs"
                      : "text-ink-soft hover:bg-line/50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded-md px-3 py-1.5 text-xs font-semibold text-ink-soft hover:text-primary transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
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
