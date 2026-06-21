import React from "react";

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

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
      <h2 className="font-display text-lg font-bold text-ink mb-4">Recent Scans</h2>
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
                    ? "bg-primary-soft border-primary text-primary"
                    : "bg-white border-line hover:border-primary/50 text-ink"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold border ${
                    isActive ? "bg-white text-primary border-primary/20" : "bg-primary-soft/50 text-primary border-transparent"
                  }`}>
                    {patient.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {patient.name}
                    </p>
                    <p className={`text-xs ${isActive ? "text-primary/80" : "text-ink-soft"}`}>
                      ID: {patient.id} • {patient.lastVisit}
                    </p>
                  </div>
                </div>
                {isActive && (
                  <div className="bg-primary text-white rounded-full p-1 shadow-sm">
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
