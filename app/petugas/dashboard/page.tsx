"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Navbar } from "@/components/petugas/Navbar";
import { PatientLookup } from "@/components/petugas/PatientLookup";
import { RecentScans } from "@/components/petugas/RecentScans";
import { PatientProfileCard } from "@/components/petugas/PatientProfileCard";
import { VisitHistory } from "@/components/petugas/VisitHistory";
import { NewVisitForm } from "@/components/petugas/NewVisitForm";
import { DiseaseTrends } from "@/components/petugas/DiseaseTrends";
import { CheckIcon, ScanIcon } from "@/components/ui/icons";

interface Visit {
  id: string;
  facility: string;
  date: string;
  notes: string;
  type?: string;
  prescriptions?: string[];
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  allergy: string;
  bloodType: string;
  chronicConditions: string;
  emergencyContact: string;
  insurance: string;
  lastVisit: string;
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [user, setUser] = useState<{
    name: string;
    email: string;
    petugas?: {
      id: string;
      faskesName: string;
      faskesType: string;
      licenseNo: string;
    } | null;
  } | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activePatientId, setActivePatientId] = useState<string>("");
  const [activePatientDetail, setActivePatientDetail] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visitsCount, setVisitsCount] = useState<number>(0);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

  // 1. Fetch User Info & Patient Scans on Mount
  useEffect(() => {
    async function initDashboard() {
      try {
        // Fetch User Me
        const userRes = await fetch("/api/users/me");
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData.user);
        } else {
          // Redirect to login if unauthorized
          router.push("/login");
          return;
        }

        // Fetch Scanned Patients List
        await refreshPatientList();
      } catch (err) {
        console.error("Gagal menginisialisasi dashboard:", err);
      } finally {
        setLoadingList(false);
      }
    }

    initDashboard();
  }, []);

  const refreshPatientList = async (targetActiveId?: string) => {
    try {
      const scansRes = await fetch("/api/petugas/active-scans");
      if (scansRes.ok) {
        const scansData = await scansRes.json();
        setPatients(scansData.patients || []);
        
        // Tentukan active patient ID
        const queryPasienId = targetActiveId || searchParams.get("pasienId");
        if (queryPasienId) {
          setActivePatientId(queryPasienId);
        } else if (scansData.patients && scansData.patients.length > 0) {
          setActivePatientId(scansData.patients[0].id);
        }
      }
    } catch (err) {
      console.error("Gagal memperbarui daftar pasien:", err);
    }
  };

  // 2. Fetch Detailed Data for Active Patient
  useEffect(() => {
    if (!activePatientId) {
      setActivePatientDetail(null);
      return;
    }

    async function fetchPatientDetail() {
      setLoadingDetail(true);
      try {
        const detailRes = await fetch(`/api/pasien/${activePatientId}`);
        if (detailRes.ok) {
          const detailData = await detailRes.json();
          setActivePatientDetail(detailData.pasien);
        } else {
          console.error("Gagal mengambil detail rekam medis pasien");
        }
      } catch (err) {
        console.error("Error mengambil detail pasien:", err);
      } finally {
        setLoadingDetail(false);
      }
    }

    fetchPatientDetail();
  }, [activePatientId]);

  // Calculate visits count today (or general count)
  useEffect(() => {
    let count = 0;
    patients.forEach(p => {
      // Sederhana: hitung kunjungan dari database/list jika ada
    });
    setVisitsCount(patients.length); // fallback visual
  }, [patients]);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFinalizeVisit = async (data: {
    visitType: string;
    facility: string;
    notes: string;
    prescriptions: string[];
  }) => {
    if (!activePatientId) return;

    try {
      const response = await fetch("/api/kunjungan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pasienId: activePatientId,
          keluhan: `Kunjungan: ${data.visitType}`,
          diagnosis: data.notes,
          tindakan: `Tindakan/Tipe: ${data.visitType}`,
          resepObat: data.prescriptions.join(", "),
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Gagal menyimpan kunjungan");
      }

      // Sukses
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);

      // Refresh detail pasien untuk memuat kunjungan baru di timeline
      const detailRes = await fetch(`/api/pasien/${activePatientId}`);
      if (detailRes.ok) {
        const detailData = await detailRes.json();
        setActivePatientDetail(detailData.pasien);
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menyimpan rekam medis.");
      throw err;
    }
  };

  const handleScanClick = () => {
    router.push("/petugas/scan");
  };

  const doctorInitials = user ? user.name.replace(/^(dr\.|dr|dokter)\s+/i, "").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "DR";
  const doctorName = user ? user.name : "Dokter Medivita";

  // Map activePatientDetail to matching structure for components
  const activePatientInfo = activePatientDetail ? {
    id: activePatientDetail.id,
    name: activePatientDetail.name,
    age: Math.floor((Date.now() - new Date(activePatientDetail.birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
    gender: activePatientDetail.gender === "L" ? "Laki-laki" : "Perempuan",
    allergy: activePatientDetail.medicalData?.allergies?.join(", ") || "None",
    bloodType: activePatientDetail.medicalData?.bloodType || "-",
    chronicConditions: activePatientDetail.medicalData?.chronicConditions || "Tidak ada",
    routineMedications: activePatientDetail.medicalData?.routineMedications?.join(", ") || "Tidak ada",
    emergencyContact: "0812-3456-7890 (Keluarga)",
    insurance: "BPJS Kesehatan (Aktif)",
  } : null;

  const activePatientHistory = activePatientDetail?.history?.map((h: any) => ({
    id: h.id,
    facility: h.facility,
    date: h.date,
    type: h.tindakan || "Pemeriksaan Medis",
    notes: `Keluhan: ${h.keluhan}. Diagnosis: ${h.diagnosis}`,
    prescriptions: h.resepObat || [],
  })) || [];

  return (
    <div className="min-h-screen bg-[#f4f8fa] flex flex-col font-sans">
      {/* Toast Success Notification */}
      {showSuccessToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-accent text-white px-5 py-4 rounded-xl shadow-xl transition-all duration-300 transform translate-y-0 animate-bounce">
          <div className="bg-white/20 rounded-full p-1">
            <CheckIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">Kunjungan Berhasil Disimpan!</p>
            <p className="text-xs text-white/90">Data rekam medis telah diperbarui secara aman.</p>
          </div>
        </div>
      )}

      {/* Header (Navbar) */}
      <Navbar onScanClick={handleScanClick} doctorInitials={doctorInitials} doctorName={doctorName} isLoading={!user} />

      {/* Main Grid Content */}
      <main className="flex-1 mx-auto w-full max-w-[1280px] px-6 py-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h1 className="text-2xl font-bold font-display text-ink">Selamat datang kembali, {doctorName}</h1>
            {user?.petugas && (
              <p className="text-xs font-semibold text-primary mt-1">
                {user.petugas.faskesName} • No. STR: {user.petugas.licenseNo}
              </p>
            )}
            <p className="text-xs text-ink-soft mt-1">Kelola dan input rekam medis pasien secara cepat dan terenkripsi.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Width 4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Search Lookup */}
            <PatientLookup 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              onFallbackSuccess={(id) => refreshPatientList(id)} 
            />

            {/* Scanned Patient List */}
            {loadingList ? (
              <div className="bg-white rounded-2xl border border-line p-8 shadow-sm flex items-center justify-center min-h-[300px]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
              </div>
            ) : (
              <RecentScans
                patients={filteredPatients}
                activePatientId={activePatientId}
                onSelectPatient={setActivePatientId}
              />
            )}

            {/* Quick Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1e77b0] text-white p-5 rounded-2xl shadow-xs">
                <p className="text-xs font-semibold text-white/80">Active Scans</p>
                <p className="text-3xl font-display font-bold mt-1">{patients.length}</p>
              </div>
              <div className="bg-[#eaf5ec] border border-[#d2ebd7] p-5 rounded-2xl shadow-xs">
                <p className="text-xs font-semibold text-[#475e6b]">Avg Access Time</p>
                <p className="text-3xl font-display font-bold text-[#63b676] mt-1">0.8s</p>
              </div>
            </div>

          </div>

          {/* Right Column (Width 8/12) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {loadingDetail ? (
              <div className="bg-white rounded-2xl border border-line p-12 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary mb-3"></div>
                <p className="text-xs text-ink-soft">Memuat berkas rekam medis terenkripsi...</p>
              </div>
            ) : activePatientInfo ? (
              <>
                {/* Active Patient Details */}
                <PatientProfileCard patient={activePatientInfo} />

                {/* Timeline Medical Visit History */}
                <VisitHistory history={activePatientHistory} />

                {/* Add New Visit Form */}
                <NewVisitForm onFinalize={handleFinalizeVisit} defaultFacility={user?.petugas?.faskesName || "Puskesmas Pekan Baru"} pasienId={activePatientId} />
              </>
            ) : (
              /* Grid Layout when No Patient Selected */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Empty Placeholder Card */}
                <div className="bg-white rounded-2xl border border-line p-8 shadow-sm flex flex-col items-center justify-center text-center min-h-[450px]">
                  <div className="h-16 w-16 bg-[#e1f0f7] text-primary rounded-3xl flex items-center justify-center mb-6">
                    <ScanIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-ink">Belum Ada Pasien Terpilih</h3>
                  <p className="text-xs text-ink-soft max-w-xs mt-1 mb-8 leading-relaxed">
                    Silakan lakukan pemindaian QR Code pasien atau masukkan NIK dan PIN Cadangan untuk mendekripsi data rekam medis mereka.
                  </p>
                  <button
                    onClick={handleScanClick}
                    className="bg-primary hover:bg-primary/95 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <ScanIcon className="h-4.5 w-4.5" />
                    Pindai QR Code Sekarang
                  </button>
                </div>

                {/* Disease Trends Card */}
                <div className="flex flex-col h-full">
                  <DiseaseTrends />
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-line py-12 mt-16 text-ink-soft">
        <div className="mx-auto max-w-[1280px] px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6 flex flex-col gap-3">
            <span className="font-display font-bold text-ink text-lg">Medivita</span>
            <p className="text-sm max-w-md">
              Solusi rekam medis digital portabel untuk akses kesehatan yang lebih cepat, akurat, dan aman bagi setiap pasien.
            </p>
          </div>
          <div className="md:col-span-6 flex flex-col md:items-end justify-between gap-4">
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-primary transition-colors">Help Center</Link>
            </div>
            <p className="text-xs font-mono">
              © 2026 Rekam Medis Jalan (Medivita). PekanIT 2026 Credits.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function PetugasDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f4f8fa]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
