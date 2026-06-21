"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Navbar } from "@/components/petugas/Navbar";
import { PatientLookup } from "@/components/petugas/PatientLookup";
import { RecentScans } from "@/components/petugas/RecentScans";
import { PatientProfileCard } from "@/components/petugas/PatientProfileCard";
import { VisitHistory } from "@/components/petugas/VisitHistory";
import { NewVisitForm } from "@/components/petugas/NewVisitForm";

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

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
  rawId: string;
  name: string;
  age: number;
  gender: string;
  allergy: string;
  bloodType: string;
  chronicConditions: string;
  emergencyContact: string;
  insurance: string;
  avatarUrl: string;
  lastVisit: string;
  history: Visit[];
}

const INITIAL_PATIENTS: Patient[] = [
  {
    id: "MED-P-0842",
    rawId: "pasien-0842",
    name: "Siti Aminah",
    age: 28,
    gender: "Female",
    allergy: "Penicillin",
    bloodType: "O+",
    chronicConditions: "Asthma (Mild)",
    emergencyContact: "Ahmad (Suami) - 0812-3456-7890",
    insurance: "BPJS Kesehatan (Active)",
    avatarUrl: "/logo.webp",
    lastVisit: "Currently Active",
    history: [
      {
        id: "v1",
        facility: "Poli Umum - RS Citra Husada",
        date: "12 Jan 2026",
        notes: "Complaints: Seasonal flu symptoms. Prescribed Paracetamol and Vitamin C. Advised 3 days rest.",
        type: "Pemeriksaan Umum",
        prescriptions: ["Paracetamol 500mg", "Vitamin C 500mg"]
      },
      {
        id: "v2",
        facility: "Check-up Rutin - Klinik Medivita",
        date: "05 Nov 2025",
        notes: "Routine check-up. Blood pressure normal (120/80). Patient feels healthy. Encouraged to maintain a active lifestyle.",
        type: "Check-up Rutin",
        prescriptions: []
      }
    ]
  },
  {
    id: "MED-P-1029",
    rawId: "pasien-1029",
    name: "Bambang Susilo",
    age: 45,
    gender: "Male",
    allergy: "None",
    bloodType: "B+",
    chronicConditions: "Hypertension (Controlled)",
    emergencyContact: "Susi (Istri) - 0813-4567-8901",
    insurance: "BPJS Kesehatan (Active)",
    avatarUrl: "/logo.webp",
    lastVisit: "Last visit 2d ago",
    history: [
      {
        id: "v3",
        facility: "Poli Jantung - RSUD Sentosa",
        date: "19 Jan 2026",
        notes: "Routine cardiovascular check. Blood pressure 135/85. Prescribed Amlodipine 5mg. Advised to reduce sodium intake.",
        type: "Spesialis Jantung",
        prescriptions: ["Amlodipine 5mg"]
      },
      {
        id: "v4",
        facility: "Poli Umum - Puskesmas Maju",
        date: "10 Dec 2025",
        notes: "Complaints of mild fever and body aches. Diagnosed with common cold. Rest advised.",
        type: "Pemeriksaan Umum",
        prescriptions: ["Paracetamol 500mg"]
      }
    ]
  },
  {
    id: "MED-P-1105",
    rawId: "pasien-1105",
    name: "Rudi Hartono",
    age: 35,
    gender: "Male",
    allergy: "Sulfa Drugs",
    bloodType: "A-",
    chronicConditions: "Diabetes Type 2",
    emergencyContact: "Dewi (Istri) - 0815-9876-5432",
    insurance: "Swasta - Mandiri Inhealth (Active)",
    avatarUrl: "/logo.webp",
    lastVisit: "Last visit 1w ago",
    history: [
      {
        id: "v5",
        facility: "Poli Penyakit Dalam - RS Citra Husada",
        date: "15 Jan 2026",
        notes: "Diabetes routine check-up. Fasting blood sugar 140 mg/dL. Prescribed Metformin 500mg twice daily. Advised sugar restriction.",
        type: "Pemeriksaan Umum",
        prescriptions: ["Metformin 500mg"]
      }
    ]
  }
];

export default function PetugasDashboard() {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [activePatientId, setActivePatientId] = useState<string>("MED-P-0842");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visitsCount, setVisitsCount] = useState<number>(24);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  const activePatient = patients.find((p) => p.id === activePatientId) || patients[0];

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFinalizeVisit = (data: {
    visitType: string;
    facility: string;
    notes: string;
    prescriptions: string[];
  }) => {
    const newVisit: Visit = {
      id: `v_${Date.now()}`,
      facility: data.facility,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      notes: data.notes,
      type: data.visitType,
      prescriptions: data.prescriptions,
    };

    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === activePatientId) {
          return {
            ...p,
            history: [newVisit, ...p.history],
          };
        }
        return p;
      })
    );

    setVisitsCount((c) => c + 1);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const handleScanClick = () => {
    alert("Kamera pemindaian siap diaktifkan lewat halaman /petugas/scan");
  };

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
      <Navbar onScanClick={handleScanClick} doctorInitials="DR" />

      {/* Main Grid Content */}
      <main className="flex-1 mx-auto w-full max-w-[1280px] px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Width 4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Search Lookup */}
            <PatientLookup searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Scanned Patient List */}
            <RecentScans
              patients={filteredPatients}
              activePatientId={activePatientId}
              onSelectPatient={setActivePatientId}
            />

            {/* Quick Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1e77b0] text-white p-5 rounded-2xl shadow-xs">
                <p className="text-xs font-semibold text-white/80">Visits Today</p>
                <p className="text-3xl font-display font-bold mt-1">{visitsCount}</p>
              </div>
              <div className="bg-[#eaf5ec] border border-[#d2ebd7] p-5 rounded-2xl shadow-xs">
                <p className="text-xs font-semibold text-[#475e6b]">Avg Access Time</p>
                <p className="text-3xl font-display font-bold text-[#63b676] mt-1">1.2s</p>
              </div>
            </div>

          </div>

          {/* Right Column (Width 8/12) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Active Patient Details */}
            <PatientProfileCard patient={activePatient} />

            {/* Timeline Medical Visit History */}
            <VisitHistory history={activePatient.history} />

            {/* Add New Visit Form */}
            <NewVisitForm onFinalize={handleFinalizeVisit} defaultFacility="Puskesmas Pekan Baru" />

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
