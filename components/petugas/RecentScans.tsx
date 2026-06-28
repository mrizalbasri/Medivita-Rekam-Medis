import React from "react";
import { formatDisplayId } from "@/lib/format";
import { CheckIcon } from "@/components/ui/icons";

interface Patient {
  id: string;
  name: string;
  lastVisit: string;
}

interface RecentScansProps {
  patients: Patient[];
  activePatientId: string;
  onSelectPatient: (id: string) => void;
}

export function RecentScans({ patients, activePatientId, onSelectPatient }: RecentScansProps) {
  return (
    <div className="bg-white rounded-2xl border border-line p-6 shadow-sm flex-1 flex flex-col min-h-[300px]">
      <h2 className="font-display text-lg font-bold text-ink mb-4">Hasil Pemindaian</h2>
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px]">
        {patients.length > 0 ? (
          patients.map((patient) => {
            const isActive = patient.id === activePatientId;
            return (
              <button
                key={patient.id}
                onClick={() => onSelectPatient(patient.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left group ${
                  isActive
                    ? "bg-accent-soft border-accent text-accent"
                    : "bg-white border-line hover:border-accent/50 text-ink"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold border ${
                    isActive ? "bg-white text-accent border-accent/20" : "bg-accent-soft/50 text-accent border-transparent"
                  }`}>
                    {patient.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm group-hover:text-accent transition-colors">
                      {patient.name}
                    </p>
                    <p className={`text-xs ${isActive ? "text-accent/80" : "text-ink-soft"}`}>
                      ID: {formatDisplayId(patient.id)} • {patient.lastVisit}
                    </p>
                  </div>
                </div>
                {isActive && (
                  <div className="bg-accent text-white rounded-full p-1 shadow-sm">
                    <CheckIcon className="h-3 w-3" />
                  </div>
                )}
              </button>
            );
          })
        ) : (
          <p className="text-sm text-ink-soft text-center py-8">Tidak ada pasien ditemukan.</p>
        )}
      </div>
    </div>
  );
}
