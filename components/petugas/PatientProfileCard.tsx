import React from "react";
import { formatDisplayId } from "@/lib/format";
import { EditIcon, LockIcon } from "@/components/ui/icons";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  allergy: string;
  bloodType: string;
  chronicConditions: string;
  routineMedications: string;
  emergencyContact: string;
  insurance: string;
}

interface PatientProfileCardProps {
  patient: Patient;
  onEditClick?: () => void;
  onCloseClick?: () => void;
}

export function PatientProfileCard({ patient, onEditClick, onCloseClick }: PatientProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-line overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-bold border border-white/20">
            {patient.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">{patient.name}</h1>
            <p className="text-xs text-white/85 mt-0.5">
              ID: {formatDisplayId(patient.id)} • {patient.age} Tahun • {patient.gender}
            </p>
            <div className="flex gap-2 mt-2">
              {patient.allergy !== "None" && patient.allergy !== "Tidak ada riwayat alergi" && (
                <span className="bg-alert text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
                  ALERGI: {patient.allergy}
                </span>
              )}
              <span className="bg-[#10b981] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
                GOL. DARAH: {patient.bloodType}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onEditClick && (
            <button 
              onClick={onEditClick}
              className="bg-white/10 hover:bg-white/20 rounded-xl p-2 transition-colors border border-white/10 cursor-pointer" 
              aria-label="Edit Profile"
            >
              <EditIcon className="h-5 w-5" />
            </button>
          )}
          {onCloseClick && (
            <button 
              onClick={onCloseClick}
              className="bg-red-500/85 hover:bg-red-500 hover:scale-102 active:scale-98 text-white rounded-xl px-3 py-1.5 transition-all border border-red-400/20 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm" 
              aria-label="Tutup Berkas"
            >
              <LockIcon className="h-3.5 w-3.5" />
              Tutup Berkas
            </button>
          )}
        </div>
      </div>

      {/* Sub Details */}
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-line bg-paper">
        <div className="p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-ink-soft">Penyakit Kronis</p>
          <p className="font-semibold text-sm text-ink mt-1">{patient.chronicConditions}</p>
        </div>
        <div className="p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-ink-soft">Obat Rutin</p>
          <p className="font-semibold text-sm text-ink mt-1">{patient.routineMedications}</p>
        </div>
        <div className="p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-ink-soft">Kontak Darurat</p>
          <p className="font-semibold text-sm text-ink mt-1">{patient.emergencyContact}</p>
        </div>
        <div className="p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-ink-soft">Asuransi Kesehatan</p>
          <p className="font-semibold text-sm text-ink mt-1">{patient.insurance}</p>
        </div>
      </div>
    </div>
  );
}
