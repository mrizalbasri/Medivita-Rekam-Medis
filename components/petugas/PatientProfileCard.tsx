import React from "react";
import { formatDisplayId } from "@/lib/format";

function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

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
}

export function PatientProfileCard({ patient, onEditClick }: PatientProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-line overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-bold border border-white/20">
            {patient.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">{patient.name}</h1>
            <p className="text-xs text-white/85 mt-0.5">
              ID: {formatDisplayId(patient.id)} • {patient.age} Years Old • {patient.gender}
            </p>
            <div className="flex gap-2 mt-2">
              {patient.allergy !== "None" && (
                <span className="bg-alert text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
                  ALLERGY: {patient.allergy}
                </span>
              )}
              <span className="bg-[#10b981] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
                BLOOD: {patient.bloodType}
              </span>
            </div>
          </div>
        </div>
        {onEditClick && (
          <button 
            onClick={onEditClick}
            className="bg-white/10 hover:bg-white/20 rounded-lg p-2 transition-colors border border-white/10" 
            aria-label="Edit Profile"
          >
            <EditIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Sub Details */}
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-line bg-paper">
        <div className="p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-ink-soft">CHRONIC CONDITIONS</p>
          <p className="font-semibold text-sm text-ink mt-1">{patient.chronicConditions}</p>
        </div>
        <div className="p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-ink-soft">ROUTINE MEDICATIONS</p>
          <p className="font-semibold text-sm text-ink mt-1">{patient.routineMedications}</p>
        </div>
        <div className="p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-ink-soft">EMERGENCY CONTACT</p>
          <p className="font-semibold text-sm text-ink mt-1">{patient.emergencyContact}</p>
        </div>
        <div className="p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-ink-soft">HEALTH INSURANCE</p>
          <p className="font-semibold text-sm text-ink mt-1">{patient.insurance}</p>
        </div>
      </div>
    </div>
  );
}
