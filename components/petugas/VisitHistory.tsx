import React from "react";
import { HospitalIcon, ActivityIcon, PrinterIcon } from "@/components/ui/icons";

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
    document.body.classList.add("print-history-mode");
    window.print();
  };

  React.useEffect(() => {
    const handleAfterPrint = () => {
      document.body.classList.remove("print-history-mode");
    };
    window.addEventListener("afterprint", handleAfterPrint);
    return () => window.removeEventListener("afterprint", handleAfterPrint);
  }, []);

  return (
    <div className="printable-history bg-white rounded-2xl border border-line p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-lg font-bold text-ink flex items-center gap-2">
          <span className="text-accent">
            <ActivityIcon className="h-5 w-5" />
          </span>
          Riwayat Kunjungan
        </h2>
        {history.length > 0 && (
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-line bg-white hover:bg-paper rounded-xl text-xs font-semibold text-accent transition-colors cursor-pointer"
          >
            <PrinterIcon className="h-3.5 w-3.5" />
            Cetak Riwayat
          </button>
        )}
      </div>
      
      {history.length > 0 ? (
        <div className="relative pl-6 border-l border-line ml-3 flex flex-col gap-6">
          {history.map((visit) => (
            <div key={visit.id} className="relative">
              {/* Circle icon on the timeline */}
              <span className="absolute -left-[35px] top-0.5 bg-accent-soft text-accent rounded-full p-1.5 border-2 border-white shadow-xs">
                <HospitalIcon className="h-4.5 w-4.5" />
              </span>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <h3 className="font-bold text-sm text-ink">{visit.facility}</h3>
                <span className="text-xs font-mono text-ink-soft">{visit.date}</span>
              </div>
              {visit.type && (
                <span className="inline-block bg-accent-soft/60 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-md mt-1">
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
