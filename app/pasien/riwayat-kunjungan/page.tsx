"use client";

import { useState, useMemo, useEffect } from "react";
import * as Icons from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { PatientPrimaryNav } from "@/components/pasien/PatientPrimaryNav";
import { PatientBottomNav } from "@/components/pasien/PatientBottomNav";
import { PatientAccountMenu } from "@/components/pasien/PatientAccountMenu";

// ─── Icon Components ────────────────────────────────────────────────────────

function ArrowLeftIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function FilterIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function HospitalIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="M18 21V9a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v12" />
      <path d="M2 21h20" />
      <path d="M12 9v4M10 11h4" />
    </svg>
  );
}

function StethoscopeIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  );
}

function PillIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="m10.5 3.5 10 10a7.07 7.07 0 1 1-10-10Z" />
      <line x1="8.5" y1="15.5" x2="15.5" y2="8.5" />
    </svg>
  );
}

function FlaskIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="M9 3h6v7l2.5 4.5A2 2 0 0 1 15.75 18H8.25a2 2 0 0 1-1.75-3.5L9 10V3Z" />
      <path d="M6.5 15h11" />
    </svg>
  );
}

function XRayIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M9 9L12 6l3 3" />
      <path d="M9 15l3 3 3-3" />
      <path d="M12 6v12" />
      <path d="M6 12h2M16 12h2" />
    </svg>
  );
}

function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FileTextIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

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
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CalendarIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ActivityIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

type VisitType =
  | "Konsultasi"
  | "Pemeriksaan Lab"
  | "Radiologi"
  | "Rawat Inap"
  | "Farmasi";
type VisitStatus = "Selesai" | "Dalam Proses" | "Dibatalkan";

interface Prescription {
  nama: string;
  dosis: string;
  jumlah: string;
}

interface VisitRecord {
  id: string;
  tanggal: string;
  waktu: string;
  faskes: string;
  lokasiKota: string;
  dokter: string;
  spesialisasi: string;
  tipeKunjungan: VisitType;
  status: VisitStatus;
  keluhan: string;
  diagnosis: string;
  tindakan: string;
  resep: Prescription[];
  catatanDokter: string;
  biaya: number;
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function getTypeConfig(type: VisitType) {
  switch (type) {
    case "Konsultasi":
      return {
        icon: <StethoscopeIcon />,
        bg: "bg-primary-soft",
        text: "text-primary",
        dot: "bg-primary",
      };
    case "Pemeriksaan Lab":
      return {
        icon: <FlaskIcon />,
        bg: "bg-accent-soft",
        text: "text-accent",
        dot: "bg-accent",
      };
    case "Radiologi":
      return {
        icon: <XRayIcon />,
        bg: "bg-[#f0e6ff]",
        text: "text-[#7c3aed]",
        dot: "bg-[#7c3aed]",
      };
    case "Rawat Inap":
      return {
        icon: <HospitalIcon />,
        bg: "bg-[#fff7ed]",
        text: "text-[#ea580c]",
        dot: "bg-[#ea580c]",
      };
    case "Farmasi":
      return {
        icon: <PillIcon />,
        bg: "bg-[#f0fdf4]",
        text: "text-[#16a34a]",
        dot: "bg-[#16a34a]",
      };
  }
}

function getStatusConfig(status: VisitStatus) {
  switch (status) {
    case "Selesai":
      return {
        cls: "bg-accent-soft text-accent border-accent/20",
        label: "Selesai",
      };
    case "Dalam Proses":
      return {
        cls: "bg-[#fff7ed] text-[#ea580c] border-[#ea580c]/20",
        label: "Dalam Proses",
      };
    case "Dibatalkan":
      return {
        cls: "bg-alert-soft text-alert border-alert/20",
        label: "Dibatalkan",
      };
  }
}

// ─── Visit Card ───────────────────────────────────────────────────────────────

function VisitCard({ visit, index }: { visit: VisitRecord; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const typeConf = getTypeConfig(visit.tipeKunjungan);
  const statusConf = getStatusConfig(visit.status);

  return (
    <div
      className="group relative rounded-2xl border border-line bg-white shadow-sm hover:shadow-md transition-all duration-300"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Timeline dot on left (desktop) */}
      <span
        className={`absolute -left-[25px] top-7 hidden h-3 w-3 rounded-full ring-4 ring-paper lg:block ${typeConf.dot}`}
      />

      {/* Card Header */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full text-left px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3"
        aria-expanded={expanded}
        id={`visit-header-${visit.id}`}
      >
        {/* Type Icon */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${typeConf.bg} ${typeConf.text}`}
        >
          {typeConf.icon}
        </div>

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${typeConf.bg} ${typeConf.text} border-transparent`}
            >
              {visit.tipeKunjungan}
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${statusConf.cls}`}
            >
              {statusConf.label}
            </span>
          </div>
          <h3 className="font-display text-sm font-bold text-primary-dark truncate">
            {visit.faskes}
          </h3>
          <p className="text-xs text-ink-soft mt-0.5 truncate">
            {visit.dokter} · {visit.spesialisasi}
          </p>
        </div>

        {/* Date + Biaya + Chevron */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft justify-end">
              <CalendarIcon className="h-3.5 w-3.5" />
              {formatDate(visit.tanggal)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-soft justify-end mt-0.5">
              <ClockIcon className="h-3.5 w-3.5" />
              {visit.waktu} WIB
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] text-ink-soft font-medium">Biaya</p>
            <p className="text-sm font-bold text-primary-dark">
              {formatCurrency(visit.biaya)}
            </p>
          </div>
          <ChevronDownIcon
            className={`h-5 w-5 text-ink-soft transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Mobile date row */}
      <div className="sm:hidden px-5 pb-3 -mt-2 flex items-center gap-3 text-xs text-ink-soft">
        <span className="flex items-center gap-1">
          <CalendarIcon className="h-3.5 w-3.5" />
          {formatDate(visit.tanggal)}
        </span>
        <span className="flex items-center gap-1">
          <ClockIcon className="h-3.5 w-3.5" />
          {visit.waktu} WIB
        </span>
      </div>

      {/* Expandable Detail */}
      {expanded && (
        <div className="border-t border-line px-5 py-5 grid grid-cols-1 md:grid-cols-2 gap-5 animate-[fade-in-up_0.2s_ease-out_both]">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1.5">
                Keluhan Utama
              </p>
              <p className="text-sm text-ink leading-relaxed">
                {visit.keluhan}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1.5">
                Diagnosis
              </p>
              <p className="text-sm font-semibold text-primary-dark leading-relaxed">
                {visit.diagnosis}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1.5">
                Tindakan / Pemeriksaan
              </p>
              <p className="text-sm text-ink leading-relaxed">
                {visit.tindakan}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-soft">
              <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
              <span>
                {visit.faskes} · {visit.lokasiKota}
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {visit.resep.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-2">
                  Resep Obat
                </p>
                <div className="space-y-2">
                  {visit.resep.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl bg-accent-soft/60 px-3.5 py-2.5"
                    >
                      <div>
                        <p className="text-xs font-bold text-primary-dark">
                          {r.nama}
                        </p>
                        <p className="text-[11px] text-ink-soft">{r.dosis}</p>
                      </div>
                      <span className="rounded-lg bg-white border border-line px-2 py-1 text-[11px] font-bold text-ink-soft">
                        {r.jumlah}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {visit.resep.length === 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1.5">
                  Resep Obat
                </p>
                <p className="text-xs italic text-ink-soft">
                  Tidak ada resep untuk kunjungan ini.
                </p>
              </div>
            )}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1.5">
                Catatan Dokter
              </p>
              <p className="text-xs leading-relaxed text-ink bg-paper rounded-xl px-3.5 py-3 border border-line">
                {visit.catatanDokter}
              </p>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-primary-soft px-4 py-3 border border-primary/10">
              <span className="text-xs font-semibold text-ink-soft">
                Total Biaya
              </span>
              <span className="text-sm font-black text-primary-dark">
                {formatCurrency(visit.biaya)}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  alert(`Mengunduh resume kunjungan ${visit.id}...`)
                }
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink-soft hover:bg-primary-soft hover:text-primary hover:border-primary/30 transition-all"
              >
                <FileTextIcon className="h-3.5 w-3.5" />
                Unduh Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const MOCK_VISITS: VisitRecord[] = [
  {
    id: "KNJ-2026-1021",
    tanggal: "2026-10-21",
    waktu: "09:30",
    faskes: "RS Pondok Indah",
    lokasiKota: "Jakarta Selatan",
    dokter: "Dr. Andreas Susanto",
    spesialisasi: "Spesialis Penyakit Dalam",
    tipeKunjungan: "Konsultasi",
    status: "Selesai",
    keluhan: "Kontrol rutin hipertensi dan konsultasi hasil lab darah.",
    diagnosis: "Hipertensi Esensial (Terkontrol)",
    tindakan: "Pemeriksaan tensi, review hasil darah.",
    resep: [{ nama: "Amlodipine", dosis: "5 mg", jumlah: "30 tablet" }],
    catatanDokter:
      "Tekanan darah stabil 120/80 mmHg. Lanjutkan amlodipine 1x5mg pagi hari. Kurangi konsumsi garam.",
    biaya: 150000,
  },
  {
    id: "KNJ-2026-1014",
    tanggal: "2026-10-14",
    waktu: "14:15",
    faskes: "Lab Prodia Kebayoran",
    lokasiKota: "Jakarta Selatan",
    dokter: "Dr. Lilis Suryani",
    spesialisasi: "Spesialis Patologi Klinik",
    tipeKunjungan: "Pemeriksaan Lab",
    status: "Selesai",
    keluhan: "Pemeriksaan profil lipid dan fungsi ginjal atas rujukan dokter.",
    diagnosis: "Hiperkolesterolemia Ringan",
    tindakan: "Pengambilan sampel darah vena.",
    resep: [],
    catatanDokter:
      "Kolesterol total 215 mg/dl (sedikit meningkat). Fungsi ginjal normal (Ureum/Kreatinin dalam batas normal).",
    biaya: 450000,
  },
];

const ALL_TYPES: VisitType[] = [
  "Konsultasi",
  "Pemeriksaan Lab",
  "Radiologi",
  "Rawat Inap",
  "Farmasi",
];

export default function RiwayatKunjunganPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patientName, setPatientName] = useState("Sarah Az-Zahra");
  const [visits, setVisits] = useState<VisitRecord[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<VisitType | "Semua">(
    "Semua",
  );
  const [selectedYear, setSelectedYear] = useState<string>("Semua");
  const [showNotification, setShowNotification] = useState(false);
  const [scanToast, setScanToast] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch current user session
        const meRes = await fetch("/api/users/me", {
          credentials: "include",
        });

        // Jika tidak login, gunakan data mock
        if (meRes.status === 401) {
          setPatientName("Sarah Az-Zahra");
          setVisits(MOCK_VISITS);
          setLoading(false);
          return;
        }

        if (!meRes.ok) {
          throw new Error("Sesi tidak valid.");
        }
        const meData = await meRes.json();

        if (!meData?.user) {
          setPatientName("Sarah Az-Zahra");
          setVisits(MOCK_VISITS);
          setLoading(false);
          return;
        }

        if (meData.user.role !== "pasien") {
          // Jika petugas faskes/admin membuka rute ini, tampilkan data mock
          setPatientName("Sarah Az-Zahra");
          setVisits(MOCK_VISITS);
          setLoading(false);
          return;
        }

        const pasienId = meData.user.pasien?.id;
        if (!pasienId) {
          setPatientName("Sarah Az-Zahra");
          setVisits(MOCK_VISITS);
          setLoading(false);
          return;
        }

        // 2. Fetch patient details and visit history
        const patientRes = await fetch(`/api/pasien/${pasienId}`, {
          credentials: "include",
        });
        if (!patientRes.ok) {
          setPatientName("Sarah Az-Zahra");
          setVisits(MOCK_VISITS);
          setLoading(false);
          return;
        }
        const patientData = await patientRes.json();

        if (patientData?.pasien) {
          setPatientName(patientData.pasien.name);

          // Map API history items to VisitRecord
          const mappedVisits: VisitRecord[] = (
            patientData.pasien.history || []
          ).map(
            (k: {
              id?: string;
              tanggal?: string;
              facility?: string;
              faskesType?: string;
              doctorName?: string;
              licenseNo?: string;
              keluhan?: string;
              diagnosis?: string;
              tindakan?: string;
              resepObat?: string[];
            }) => {
              const dateObj = k.tanggal ? new Date(k.tanggal) : new Date();

              // Format waktu
              const waktu = dateObj.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });

              // Heuristic for VisitType
              let tipeKunjungan: VisitType = "Konsultasi";
              const actions = (k.tindakan || "").toLowerCase();

              if (
                actions.includes("lab") ||
                actions.includes("darah") ||
                actions.includes("urin") ||
                actions.includes("pemeriksaan fisik")
              ) {
                tipeKunjungan = "Pemeriksaan Lab";
              } else if (
                actions.includes("rontgen") ||
                actions.includes("x-ray") ||
                actions.includes("radiologi") ||
                actions.includes("scan")
              ) {
                tipeKunjungan = "Radiologi";
              } else if (
                actions.includes("rawat") ||
                actions.includes("inap") ||
                actions.includes("opname")
              ) {
                tipeKunjungan = "Rawat Inap";
              } else if (
                k.resepObat &&
                k.resepObat.length > 0 &&
                !k.keluhan &&
                !k.diagnosis
              ) {
                tipeKunjungan = "Farmasi";
              }

              // Parse resep from array of strings or string
              const resep: Prescription[] = [];
              if (Array.isArray(k.resepObat)) {
                k.resepObat.forEach((rStr: string) => {
                  const trimmed = rStr.trim();
                  if (!trimmed) return;

                  const parenMatch = trimmed.match(/\(([^)]+)\)/);
                  const jumlahVal = parenMatch ? parenMatch[1] : "Sesuai resep";
                  const cleanNameAndDosis = trimmed
                    .replace(/\([^)]+\)/, "")
                    .trim();

                  const dosageMatch = cleanNameAndDosis.match(
                    /(\d+\s*(?:mg|mcg|ml|g|tab|cap|tablet))/i,
                  );
                  const dosisVal = dosageMatch
                    ? dosageMatch[1]
                    : "Sesuai petunjuk";
                  const namaVal = dosageMatch
                    ? cleanNameAndDosis.replace(dosageMatch[1], "").trim()
                    : cleanNameAndDosis;

                  resep.push({
                    nama: namaVal || cleanNameAndDosis,
                    dosis: dosisVal,
                    jumlah: jumlahVal,
                  });
                });
              }

              return {
                id: k.id || `KNJ-${dateObj.getFullYear()}-${dateObj.getTime()}`,
                tanggal: k.tanggal
                  ? k.tanggal.slice(0, 10)
                  : new Date().toISOString().slice(0, 10),
                waktu,
                faskes: k.facility || "Fasilitas Kesehatan",
                lokasiKota:
                  k.faskesType === "RUMAH_SAKIT"
                    ? "Rumah Sakit"
                    : "Klinik / Puskesmas",
                dokter: k.doctorName || "Petugas Medis",
                spesialisasi: k.licenseNo
                  ? `STR: ${k.licenseNo}`
                  : "Petugas Medis",
                tipeKunjungan,
                status: "Selesai" as VisitStatus,
                keluhan: k.keluhan || "Pemeriksaan umum rutin.",
                diagnosis: k.diagnosis || "Kondisi sehat/kontrol",
                tindakan: k.tindakan || "Pemeriksaan fisik.",
                resep,
                catatanDokter: k.tindakan
                  ? `Tindakan: ${k.tindakan}.`
                  : "Patuhi dosis resep obat.",
                biaya: 0, // BPJS / Free
              };
            },
          );

          setVisits(mappedVisits);
        }
      } catch (err) {
        console.error(
          "Gagal memuat riwayat kunjungan, menggunakan data mock:",
          err,
        );
        setPatientName("Sarah Az-Zahra");
        setVisits(MOCK_VISITS);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const years = useMemo(() => {
    const allYears = [
      ...new Set(visits.map((v) => v.tanggal.slice(0, 4))),
    ].sort((a, b) => Number(b) - Number(a));
    return ["Semua", ...allYears];
  }, [visits]);

  const filtered = useMemo(() => {
    return visits.filter((v) => {
      const matchesSearch =
        searchQuery === "" ||
        v.faskes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.dokter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.spesialisasi.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        selectedType === "Semua" || v.tipeKunjungan === selectedType;
      const matchesYear =
        selectedYear === "Semua" || v.tanggal.startsWith(selectedYear);
      return matchesSearch && matchesType && matchesYear;
    });
  }, [visits, searchQuery, selectedType, selectedYear]);

  // Group by year
  const grouped = useMemo(() => {
    const map: Record<string, VisitRecord[]> = {};
    filtered.forEach((v) => {
      const yr = v.tanggal.slice(0, 4);
      if (!map[yr]) map[yr] = [];
      map[yr].push(v);
    });
    return Object.entries(map).sort(([a], [b]) => Number(b) - Number(a));
  }, [filtered]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-paper">
        {/* HEADER */}
        <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-10">
            <Link href="/pasien/dashboard" className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                <Image
                  src="/logo.webp"
                  alt="Medivita Logo"
                  fill
                  sizes="36px"
                  className="object-cover object-top scale-[1.3] -translate-y-[8%]"
                  priority
                />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-primary-dark">
                Rekam Medis Jalan
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-9 w-40 rounded-xl bg-line animate-pulse" />
              <div className="h-9 w-9 rounded-full bg-line animate-pulse" />
            </div>
          </div>
        </header>

        {/* MAIN SKELETON */}
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 md:px-10">
          <div className="mb-8 space-y-2">
            <div className="h-4 w-32 rounded bg-line animate-pulse" />
            <div className="h-8 w-64 rounded bg-line animate-pulse" />
            <div className="h-4 w-80 rounded bg-line animate-pulse" />
          </div>

          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-20 rounded-2xl border border-line bg-white p-4 shadow-sm animate-pulse flex items-center gap-3"
              >
                <div className="h-9 w-9 rounded-xl bg-line" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-16 rounded bg-line" />
                  <div className="h-4 w-24 rounded bg-line" />
                </div>
              </div>
            ))}
          </div>

          <div className="h-16 rounded-2xl border border-line bg-white p-4 animate-pulse mb-6" />

          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 w-20 rounded bg-line animate-pulse" />
                <div className="h-24 rounded-2xl border border-line bg-white p-5 animate-pulse" />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-paper">
        {/* HEADER */}
        <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-10">
            <Link href="/pasien/dashboard" className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                <Image
                  src="/logo.webp"
                  alt="Medivita Logo"
                  fill
                  sizes="36px"
                  className="object-cover object-top scale-[1.3] -translate-y-[8%]"
                  priority
                />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-primary-dark">
                Rekam Medis Jalan
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-dark"
              >
                Masuk
              </Link>
            </div>
          </div>
        </header>

        {/* ERROR STATE */}
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-16 md:px-10 flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-alert-soft text-alert border border-alert/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-8 w-8"
            >
              <path d="m10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h3 className="font-display text-lg font-bold text-primary-dark">
            Gagal Memuat Halaman
          </h3>
          <p className="mt-1.5 max-w-[400px] text-sm text-ink-soft leading-relaxed">
            {error}
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white hover:bg-primary-dark shadow-sm transition-all"
            >
              Coba Lagi
            </button>
            <Link
              href="/"
              className="rounded-xl border border-line bg-white px-5 py-2.5 text-xs font-semibold text-ink-soft hover:bg-paper transition-all"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Current year stat counter based on visits data
  const currentYearStr = new Date().getFullYear().toString();
  const totalVisitsCount = visits.length.toString();
  const visitsThisYear = visits
    .filter((v) => v.tanggal.startsWith(currentYearStr))
    .length.toString();
  const totalPrescriptions = visits
    .reduce((s, v) => s + v.resep.length, 0)
    .toString();

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-10">
          <Link href="/pasien/dashboard" className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg">
              <Image
                src="/logo.webp"
                alt="Medivita Logo"
                fill
                sizes="36px"
                className="object-cover object-top scale-[1.3] -translate-y-[8%]"
                priority
              />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-primary-dark">
              Rekam Medis Jalan
            </span>
          </Link>

          <PatientPrimaryNav />

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setShowNotification(true); setTimeout(() => setShowNotification(false), 3000); }}
              aria-label="Notification"
              className="relative rounded-full p-2 text-ink-soft hover:bg-primary-soft hover:text-primary transition-all"
            >
              <Icons.BellIcon className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-alert"></span>
            </button>
            <PatientAccountMenu name={patientName} />
          </div>
        </div>
      </header>

      {showNotification && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-xl bg-primary-dark p-4 text-sm text-white shadow-xl">
          <Icons.ShieldCheckIcon className="h-5 w-5 text-accent" />
          <span>Keamanan enkripsi aktif. Semua data medis Anda aman.</span>
        </div>
      )}
      {scanToast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-primary-dark px-4 py-3 text-sm font-medium text-white shadow-lg">
          Fitur Scan QR sedang disiapkan.
        </div>
      )}

      {/* ── MAIN ── */}
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 md:px-10">
        {/* Page heading */}
        <div className="mb-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Pasien · {patientName}
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-primary-dark">
            Riwayat Kunjungan
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Seluruh rekam medis perjalanan kesehatan kamu tersimpan di sini.
          </p>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Total Kunjungan",
              value: totalVisitsCount,
              icon: <CalendarIcon className="h-4 w-4" />,
              color: "bg-[#0b3c5d] text-white",
            },
            {
              label: `Tahun Ini (${currentYearStr})`,
              value: visitsThisYear,
              icon: <ActivityIcon className="h-4 w-4" />,
              color: "bg-primary-soft text-primary",
            },
            {
              label: "Resep Diterima",
              value: totalPrescriptions,
              icon: <PillIcon className="h-4 w-4" />,
              color: "bg-accent-soft text-accent",
            },
            {
              label: "Total Pengeluaran",
              value: "BPJS / Gratis",
              icon: <FileTextIcon className="h-4 w-4" />,
              color: "bg-[#f0e6ff] text-[#7c3aed]",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${s.color}`}
              >
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-ink-soft truncate">{s.label}</p>
                <p className="text-sm font-bold text-primary-dark truncate">
                  {s.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTERS ── */}
        <div className="mb-6 rounded-2xl border border-line bg-white p-4 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft pointer-events-none" />
            <input
              id="search-riwayat"
              type="search"
              placeholder="Cari faskes, dokter, diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-line bg-paper pl-9 pr-4 py-2.5 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <FilterIcon className="h-4 w-4 text-ink-soft shrink-0" />
            <div className="flex gap-1.5 flex-wrap">
              {(["Semua", ...ALL_TYPES] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t as VisitType | "Semua")}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all border ${
                    selectedType === t
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-paper text-ink-soft border-line hover:border-primary/30 hover:text-primary hover:bg-primary-soft"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div className="relative">
            <select
              id="filter-year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none rounded-xl border border-line bg-paper px-4 py-2.5 pr-8 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y === "Semua" ? "Semua Tahun" : `Tahun ${y}`}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft pointer-events-none" />
          </div>
        </div>

        {/* ── RESULTS INFO ── */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-ink-soft">
            Menampilkan{" "}
            <span className="font-bold text-ink">{filtered.length}</span> dari{" "}
            <span className="font-bold text-ink">{visits.length}</span>{" "}
            kunjungan
            {filtered.length > 0 && (
              <span>
                {" "}
                · Total Pengeluaran:{" "}
                <span className="font-bold text-primary-dark">
                  BPJS / Gratis
                </span>
              </span>
            )}
          </p>
          {(searchQuery ||
            selectedType !== "Semua" ||
            selectedYear !== "Semua") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("Semua");
                setSelectedYear("Semua");
              }}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* ── VISIT TIMELINE ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <CalendarIcon className="h-8 w-8" />
            </div>
            <h3 className="font-display text-base font-bold text-primary-dark">
              Tidak Ada Kunjungan
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Belum ada catatan riwayat kunjungan medis untuk akun ini.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(([year, yearVisits]) => (
              <div key={year}>
                {/* Year divider */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 shadow-sm">
                    <span className="text-xs font-black text-white tracking-widest">
                      {year}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-line" />
                  <span className="text-xs font-semibold text-ink-soft">
                    {yearVisits.length} kunjungan
                  </span>
                </div>

                {/* Timeline list */}
                <div className="relative lg:pl-8">
                  {/* Vertical line */}
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-line hidden lg:block" />
                  <div className="space-y-3">
                    {yearVisits.map((v, i) => (
                      <VisitCard key={v.id} visit={v} index={i} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enkripsi Notice */}
        <div className="mt-10 flex items-center justify-center gap-2.5 rounded-2xl border border-line bg-white py-4 px-6 shadow-sm">
          <ShieldCheckIcon className="h-5 w-5 text-accent" />
          <p className="text-xs text-ink-soft">
            Seluruh rekam medis disimpan dengan enkripsi{" "}
            <strong className="text-ink">AES-256-GCM</strong> dan hanya dapat
            diakses oleh faskes yang kamu izinkan.
          </p>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="mt-12 border-t border-line bg-primary-soft/30 py-6 px-4 text-center">
        <p className="text-xs text-ink-soft">
          © 2026{" "}
          <span className="font-semibold text-primary-dark">
            Medivita · Rekam Medis Jalan
          </span>{" "}
          — Hak cipta dilindungi.
        </p>
      </footer>
      <PatientBottomNav />
    </div>
  );
}
