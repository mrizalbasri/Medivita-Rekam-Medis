import React from "react";

function HospitalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16" />
      <path d="M16 21v-7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7" />
      <path d="M2 21h20" />
      <path d="M8 7v4M6 9h4" />
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

interface VisitHistoryProps {
  history: Visit[];
}

export function VisitHistory({ history }: VisitHistoryProps) {
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-line p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-lg font-bold text-ink flex items-center gap-2">
          <span className="text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </span>
          Visit History
        </h2>
        {history.length > 0 && (
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-line bg-white hover:bg-paper rounded-xl text-xs font-semibold text-primary transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Cetak Riwayat
          </button>
        )}
      </div>
      
      {history.length > 0 ? (
        <div className="relative pl-6 border-l border-line ml-3 flex flex-col gap-6">
          {history.map((visit) => (
            <div key={visit.id} className="relative">
              {/* Circle icon on the timeline */}
              <span className="absolute -left-[35px] top-0.5 bg-primary-soft text-primary rounded-full p-1.5 border-2 border-white shadow-xs">
                <HospitalIcon className="h-4.5 w-4.5" />
              </span>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <h3 className="font-bold text-sm text-ink">{visit.facility}</h3>
                <span className="text-xs font-mono text-ink-soft">{visit.date}</span>
              </div>
              {visit.type && (
                <span className="inline-block bg-primary-soft/60 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-md mt-1">
                  {visit.type}
                </span>
              )}
              <p className="text-sm text-ink-soft mt-2">{visit.notes}</p>
              
              {visit.prescriptions && visit.prescriptions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {visit.prescriptions.map((p, idx) => (
                    <span key={idx} className="bg-paper border border-line text-ink-soft text-[11px] px-2.5 py-1 rounded-lg">
                      💊 {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-ink-soft text-center py-4">Belum ada riwayat kunjungan.</p>
      )}
    </div>
  );
}
