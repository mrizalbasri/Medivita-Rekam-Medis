"use client";

import { useState, useEffect } from "react";
import * as Icons from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { PatientPrimaryNav } from "@/components/pasien/PatientPrimaryNav";
import { PatientBottomNav } from "@/components/pasien/PatientBottomNav";
import { PatientAccountMenu } from "@/components/pasien/PatientAccountMenu";

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

function CapsuleIcon({ className = "h-5 w-5" }: { className?: string }) {
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

function RefreshIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  );
}

type UserProfile = {
  id: string;
  name: string;
  email?: string;
  profilePicture: string | null;
  pasien?: { id: string } | null;
};

type PatientMedicalData = {
  golonganDarah?: string;
  alergi?: string[];
  bloodType?: string;
  allergies?: string[];
};

type PatientHistoryItem = {
  id: string;
  doctorName?: string;
  facility: string;
  date: string;
};

type AccessLogItem = {
  id: string;
  action: string;
  doctorName: string;
  facilityName: string;
  createdAt: string;
};

type ToastState = {
  message: string;
  kind: "info" | "success" | "error";
} | null;

const fallbackAccessLogs = [
  {
    id: "fallback-1",
    action: "READ_MEDIS",
    doctorName: "General Practitioner Access",
    facilityName: "RS Pondok Indah",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fallback-2",
    action: "CREATE_KUNJUNGAN",
    doctorName: "Prescription Retrieval",
    facilityName: "Apotek Kimia Farma",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fallback-3",
    action: "REVOKE_AKSES",
    doctorName: "Personal Data Export",
    facilityName: "Medivita Web App",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const fallbackVisitHistory: PatientHistoryItem[] = [
  {
    id: "visit-1",
    doctorName: "Dr. Andreas Susanto",
    facility: "Annual Health Checkup",
    date: "24 Oct 2026",
  },
  {
    id: "visit-2",
    doctorName: "Lab Prodia",
    facility: "Blood Panel Analysis",
    date: "14 Oct 2026",
  },
];

function formatRelativeTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown time";

  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return "just now";
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return "yesterday";
  return `${diffDays} days ago`;
}

// Interactive Patient Dashboard
export default function PatientDashboard() {
  const [accessRevoked, setAccessRevoked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [medicalData, setMedicalData] = useState<PatientMedicalData>({});
  const [accessLogs, setAccessLogs] =
    useState<AccessLogItem[]>(fallbackAccessLogs);
  const [visitHistory, setVisitHistory] =
    useState<PatientHistoryItem[]>(fallbackVisitHistory);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [patientDetails, setPatientDetails] = useState<{ nik?: string; birthDate?: string; gender?: string } | null>(null);

  const showToast = (
    message: string,
    kind: "info" | "success" | "error" = "info",
  ) => {
    setToast({ message, kind });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userResponse = await fetch("/api/users/me");
        if (!userResponse.ok) return;

        const userPayload = (await userResponse.json()) as {
          user?: UserProfile;
        };
        const currentUser = userPayload.user ?? null;
        setUserData(currentUser);

        const logsResponse = await fetch("/api/pasien/logs");
        if (logsResponse.ok) {
          const logsPayload = (await logsResponse.json()) as {
            logs?: AccessLogItem[];
          };
          if (logsPayload.logs && logsPayload.logs.length > 0) {
            setAccessLogs(logsPayload.logs);
          }
        }

        const pasienId = currentUser?.pasien?.id;
        if (!pasienId) return;

        const patientResponse = await fetch(`/api/pasien/${pasienId}`);
        if (!patientResponse.ok) return;

        const patientPayload = (await patientResponse.json()) as {
          pasien?: {
            nik?: string;
            birthDate?: string;
            gender?: string;
            medicalData?: PatientMedicalData;
            history?: PatientHistoryItem[];
            qrToken?: string;
          };
        };

        setMedicalData(patientPayload.pasien?.medicalData ?? {});
        setPatientDetails({
          nik: patientPayload.pasien?.nik,
          birthDate: patientPayload.pasien?.birthDate,
          gender: patientPayload.pasien?.gender,
        });

        if (
          patientPayload.pasien?.history &&
          patientPayload.pasien.history.length > 0
        ) {
          setVisitHistory(patientPayload.pasien.history.slice(0, 2));
        }

        const qrToken = patientPayload.pasien?.qrToken;
        if (qrToken) {
          try {
            const dataUrl = await QRCode.toDataURL(qrToken, {
              errorCorrectionLevel: "H",
              margin: 1,
              color: {
                dark: "#0a2835",
                light: "#ffffff",
              },
            });
            setQrCodeUrl(dataUrl);
          } catch (err) {
            console.error("Gagal men-generate QR Code data URL:", err);
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data dashboard pasien:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Gagal logout:", error);
      showToast("Gagal logout, silakan coba lagi.", "error");
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl) {
      showToast("QR Code belum siap untuk diunduh.", "error");
      return;
    }
    const name = userData?.name ?? "pasien";
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `medivita-qr-${name.toLowerCase().replace(/\s+/g, "-")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`QR Code untuk ${name} berhasil diunduh.`, "success");
  };

  const handlePrint = () => {
    document.body.classList.add("print-card-mode");
    // Menjalankan print dengan sedikit penundaan agar peramban siap merender CSS cetak
    setTimeout(() => {
      window.print();
      // Segera hapus kelas cetak setelah dialog print ditutup/dibatalkan
      document.body.classList.remove("print-card-mode");
    }, 50);
  };

  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.classList.remove("print-card-mode");
    };
    window.addEventListener("afterprint", handleAfterPrint);
    return () => window.removeEventListener("afterprint", handleAfterPrint);
  }, []);

  const displayName = userData?.name ?? "Pasien";
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date());
  const bloodType = medicalData.bloodType ?? medicalData.golonganDarah ?? "-";
  const allergiesList = medicalData.allergies ?? medicalData.alergi ?? [];
  const allergies = allergiesList.length
    ? allergiesList.join(", ")
    : "Tidak ada alergi"; // localized allergies display
  const recentLogs = accessLogs.slice(0, 3);
  const recentVisits = visitHistory.slice(0, 2);

  const fullNik = patientDetails?.nik ?? "-";
  const formattedBirthDate = patientDetails?.birthDate 
    ? new Date(patientDetails.birthDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }) 
    : "-";
  const formattedGender = patientDetails?.gender 
    ? (patientDetails.gender === "L" || patientDetails.gender.toUpperCase() === "MALE" || patientDetails.gender.toLowerCase() === "laki-laki" || patientDetails.gender.toLowerCase() === "laki" ? "Laki-laki" : "Perempuan") 
    : "-";

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* Custom print styling to limit PDF page size to card boundaries */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: 152mm 96mm;
            margin: 0;
          }
        }
      `}} />
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-10">
          {/* Logo */}
          <Link href="/pasien/dashboard" className="flex items-center gap-2">
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
              email={userData?.email ?? ""}
              profilePicture={userData?.profilePicture}
              onLogout={handleLogout}
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

      {/* MAIN CONTAINER */}
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 md:px-10">
        {/* PATIENT METADATA SECTION */}
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold tracking-widest text-[#1e77b0] uppercase">
              Patient Overview
            </p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-primary-dark">
              Welcome back, {displayName}
            </h1>
          </div>
          <div className="flex items-center gap-2 font-medium text-ink-soft text-sm bg-white border border-line py-2 px-3.5 rounded-xl shadow-xs self-start sm:self-auto">
            <Icons.CalendarIcon className="h-4 w-4 text-primary" />
            <span>{todayLabel}</span>
          </div>
        </div>

        {/* THREE-COLUMN GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* COLUMN 1: CRITICAL DATA (lg:col-span-3) */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            {/* Critical Data Card */}
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-mono text-xs font-bold tracking-wider text-ink-soft">
                CRITICAL DATA
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-ink-soft font-medium mb-1.5">
                    Blood Type
                  </p>
                  <span className={`inline-block rounded-md px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider ${
                    bloodType === "-" ? "bg-slate-400/90 text-white" : "bg-[#0b3c5d]"
                  }`}>
                    {bloodType === "-" ? "Belum Diisi" : bloodType}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-ink-soft font-medium mb-1.5">
                    Known Allergies
                  </p>
                  <span className={`inline-block rounded-md px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider ${
                    allergies === "Tidak ada alergi" ? "bg-emerald-600 text-white" : "bg-alert"
                  }`}>
                    {allergies}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Guide Card */}
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-mono text-xs font-bold tracking-wider text-ink-soft">
                PANDUAN LAYANAN
              </h3>
              <ul className="space-y-3.5 text-xs text-ink-soft">
                <li className="flex items-start gap-2.5">
                  <div className="h-5 w-5 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-[10px]">1</span>
                  </div>
                  <p className="leading-relaxed">
                    Tunjukkan <strong>QR Code</strong> di kartu Anda kepada petugas medis saat melakukan pendaftaran di puskesmas/RS.
                  </p>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="h-5 w-5 rounded-md bg-[#2AACAB]/10 text-[#2AACAB] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-[10px]">2</span>
                  </div>
                  <p className="leading-relaxed">
                    Pilih <strong>Print Card</strong> untuk mencetak kartu fisik atau <strong>Download QR</strong> untuk menyimpan gambar.
                  </p>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="h-5 w-5 rounded-md bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-[10px]">3</span>
                  </div>
                  <p className="leading-relaxed">
                    Jika tidak ada internet, petugas medis bisa memasukkan <strong>PIN Kode Cadangan</strong> Anda untuk membaca data.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMN 2: MIDDLE QR PRESENTATION CARD (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="printable-card w-full max-w-[500px] bg-gradient-to-br from-[#0b3c5d] via-[#104e7a] to-[#0d6e4a] border border-white/20 rounded-3xl p-6 text-white shadow-[0_20px_50px_rgba(11,60,93,0.25)] hover:shadow-[0_25px_60px_rgba(16,78,122,0.35)] aspect-[1.58] relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-[1.01]">
              {/* Premium Glossy Reflection Line */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-12 -translate-y-1/2 scale-150 pointer-events-none" />
              
              {/* Security Holographic Glows */}
              <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -bottom-20 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

              {/* Security Guilloche Wave Patterns */}
              <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,30 Q25,10 50,30 T100,30" fill="none" stroke="white" strokeWidth="0.4" />
                  <path d="M0,45 Q25,25 50,45 T100,45" fill="none" stroke="white" strokeWidth="0.3" />
                  <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="white" strokeWidth="0.4" />
                  <path d="M0,75 Q25,55 50,75 T100,75" fill="none" stroke="white" strokeWidth="0.2" />
                </svg>
              </div>

              {/* Header */}
              <div className="flex items-center justify-between mb-2.5 w-full z-10">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-15 overflow-hidden flex-shrink-0 bg-white rounded-lg shadow-md border border-white/10">
                    <Image src="/logo.webp" alt="Medivita Logo" fill sizes="60px" className="object-cover object-left scale-[1.05]" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-display text-[12.5px] font-black uppercase tracking-wider text-white">Medivita</span>
                    <span className="text-[8.5px] text-[#42b783] font-black uppercase tracking-[0.18em]">Health ID</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Hologram Badge */}
                  <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-cyan-300 via-[#42b783] to-amber-300 opacity-75 flex items-center justify-center p-0.5 shadow-inner border border-white/20">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.9L10 1.154l7.834 3.746A2 2 0 0119 6.705v4.582a10 10 0 01-5.69 9.006L10 20l-3.31-1.707a10 10 0 01-5.69-9.006V6.705a2 2 0 011.166-1.805zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  {/* Gold Smart Card Chip */}
                  <div className="h-5 w-7.5 rounded-sm bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border border-amber-200/50 flex flex-col justify-between p-0.5 shadow-md flex-shrink-0">
                    <div className="h-[2px] bg-amber-600/30 w-full rounded-sm" />
                    <div className="h-[2px] bg-amber-600/30 w-full rounded-sm" />
                    <div className="h-[2px] bg-amber-600/30 w-full rounded-sm" />
                  </div>
                </div>
              </div>

              {/* Main Body */}
              <div className="grid grid-cols-12 gap-4 items-center flex-1 w-full z-10">
                {/* Left Side: Info */}
                <div className="col-span-7 space-y-2.5 text-left">
                  <div>
                    <p className="text-[7.5px] font-bold text-blue-100/60 uppercase tracking-wider leading-none">Nomor Identitas (NIK)</p>
                    <p className="text-[11.5px] font-extrabold text-white font-mono mt-0.5 tracking-wider">
                      {fullNik !== "-" ? fullNik.replace(/(\d{6})\d{6}(\d{4})/, "$1******$2") : "-"}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-[7.5px] font-bold text-blue-100/60 uppercase tracking-wider leading-none">Nama Pasien</p>
                    <p className="text-xs font-black text-white truncate mt-0.5 tracking-wide uppercase">{displayName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[7.5px] font-bold text-blue-100/60 uppercase tracking-wider leading-none">Tanggal Lahir</p>
                      <p className="text-[9px] font-semibold text-white mt-0.5">{formattedBirthDate}</p>
                    </div>
                    <div>
                      <p className="text-[7.5px] font-bold text-blue-100/60 uppercase tracking-wider leading-none">Jenis Kelamin</p>
                      <p className="text-[9px] font-semibold text-white mt-0.5">{formattedGender}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-white/10">
                    <div>
                      <p className="text-[7.5px] font-bold text-blue-100/60 uppercase tracking-wider leading-none">Gol. Darah</p>
                      <p className="text-[10px] font-extrabold text-white mt-0.5">{bloodType}</p>
                    </div>
                    <div>
                      <p className="text-[7.5px] font-bold text-blue-100/60 uppercase tracking-wider leading-none">Alergi Kritis</p>
                      <p className="text-[9px] font-bold truncate mt-0.5" style={{ color: allergies === "Tidak ada alergi" ? "#a7f3d0" : "#fca5a5" }}>{allergies}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: QR Code */}
                <div className="col-span-5 flex justify-end">
                  <div className="relative h-[135px] w-[135px] bg-white rounded-xl shadow-lg p-2.5 flex items-center justify-center border border-white/10 transition-transform duration-300 hover:scale-102">
                    {qrCodeUrl ? (
                      <img
                        src={qrCodeUrl}
                        alt="QR Code"
                        className={`h-full w-full object-contain ${
                          accessRevoked ? "opacity-15 blur-xs" : ""
                        }`}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1 text-slate-400">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-[#0b3c5d]" />
                        <span className="text-[7px]">Loading...</span>
                      </div>
                    )}
                    {accessRevoked && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-xl p-1 text-ink">
                        <Icons.CancelIcon className="h-5 w-5 text-alert mb-1" />
                        <span className="text-[8px] font-bold text-alert">Inaktif</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-1.5 w-full z-10">
                {/* Mini Mock Barcode */}
                <div className="flex items-center gap-[1px] opacity-35 bg-white/10 px-1 py-0.5 rounded-sm">
                  <div className="w-[1px] h-2.5 bg-white" />
                  <div className="w-[2px] h-2.5 bg-white" />
                  <div className="w-[1px] h-2.5 bg-white" />
                  <div className="w-[3px] h-2.5 bg-white" />
                  <div className="w-[1px] h-2.5 bg-white" />
                  <div className="w-[2px] h-2.5 bg-white" />
                  <div className="w-[1px] h-2.5 bg-white" />
                  <div className="w-[4px] h-2.5 bg-white" />
                  <div className="w-[1px] h-2.5 bg-white" />
                </div>
                
                <div className="flex items-center gap-1.5 text-[6.5px] text-emerald-400 font-extrabold uppercase tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-400/20">
                  <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Encrypted Access</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full mt-6 no-print text-center">
              <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  disabled={accessRevoked}
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0b3c5d] px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
                >
                  <Icons.DownloadIcon className="h-4 w-4" />
                  Download QR
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-primary-soft/50 transition-all shadow-xs cursor-pointer"
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

          {/* COLUMN 3: ACCESS LOGS & VISIT HISTORY (lg:col-span-3) */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            {/* Access Logs Card */}
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-primary-dark">
                  Log Akses
                </h3>
                <Link
                  href="/pasien/access-log"
                  className="text-xs font-bold text-[#1e77b0] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentLogs.map((log) => {
                  const isRevoke = log.action === "REVOKE_AKSES";
                  const isCreate = log.action === "CREATE_KUNJUNGAN";

                  return (
                    <div
                      key={log.id}
                      className="flex gap-3 items-start hover:bg-primary-soft/20 p-1.5 rounded-lg transition-colors"
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          isRevoke
                            ? "bg-primary-soft/40 text-ink-soft"
                            : isCreate
                              ? "bg-accent-soft text-accent"
                              : "bg-primary-soft text-primary"
                        }`}
                      >
                        {isRevoke ? (
                          <RefreshIcon className="h-5 w-5" />
                        ) : isCreate ? (
                          <CapsuleIcon className="h-5 w-5" />
                        ) : (
                          <HospitalIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-primary-dark">
                          {log.facilityName}
                        </h4>
                        <p className="text-[11px] text-ink-soft">
                          {log.doctorName}
                        </p>
                        <span className="text-[10px] italic text-ink-soft">
                          {formatRelativeTime(log.createdAt)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Riwayat Kunjungan Card */}
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-display text-sm font-bold text-primary-dark">
                Riwayat Kunjungan
              </h3>

              <div className="relative border-l-2 border-line pl-4 ml-2 space-y-5">
                {recentVisits.map((visit, index) => (
                  <div className="relative" key={visit.id}>
                    <span
                      className={`absolute -left-[23px] top-1 flex h-2.5 w-2.5 rounded-full ring-4 ring-white ${
                        index === 0 ? "bg-primary" : "bg-ink-soft/40"
                      }`}
                    ></span>
                    <h4 className="text-xs font-bold text-primary-dark">
                      {visit.doctorName ?? "Fasilitas Kesehatan"}
                    </h4>
                    <p className="text-[11px] text-ink-soft">
                      {visit.facility}
                    </p>
                    <span className="text-[10px] text-ink-soft italic">
                      {visit.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

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
