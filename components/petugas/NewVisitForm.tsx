import React, { useState, useEffect } from "react";

function PlusCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

interface NewVisitData {
  visitType: string;
  facility: string;
  notes: string;
  prescriptions: string[];
}

interface NewVisitFormProps {
  onFinalize: (data: NewVisitData) => void;
  defaultFacility?: string;
  pasienId?: string;
}

export function NewVisitForm({ onFinalize, defaultFacility = "Puskesmas Pekan Baru", pasienId }: NewVisitFormProps) {
  const [visitType, setVisitType] = useState<string>("Pemeriksaan Umum");
  const [facility, setFacility] = useState<string>(defaultFacility);
  const [notes, setNotes] = useState<string>(" ");
  const [drugName, setDrugName] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [prescriptions, setPrescriptions] = useState<string[]>(["Amoxicillin 500mg"]);
  const [isDraftSaving, setIsDraftSaving] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (defaultFacility) {
      setFacility(defaultFacility);
    }
  }, [defaultFacility]);

  // Load draft when patient changes
  useEffect(() => {
    if (!pasienId) return;
    setIsLoaded(false);
    const savedDraft = localStorage.getItem(`draft_visit_${pasienId}`);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setVisitType(parsed.visitType || "Pemeriksaan Umum");
        setFacility(parsed.facility || defaultFacility);
        setNotes(parsed.notes || "");
        setPrescriptions(parsed.prescriptions || []);
      } catch (err) {
        console.error("Gagal memuat draf:", err);
      }
    } else {
      setVisitType("Pemeriksaan Umum");
      setFacility(defaultFacility);
      setNotes("");
      setPrescriptions([]);
    }
    // Set load complete
    setTimeout(() => setIsLoaded(true), 100);
  }, [pasienId, defaultFacility]);

  // Auto-save draft on input changes
  useEffect(() => {
    if (!pasienId || !isLoaded) return;
    const draftData = {
      visitType,
      facility,
      notes,
      prescriptions,
    };
    
    // Simpan draf ke localStorage
    localStorage.setItem(`draft_visit_${pasienId}`, JSON.stringify(draftData));
    
    // Tampilkan indikator loader sebentar
    setIsDraftSaving(true);
    const timer = setTimeout(() => setIsDraftSaving(false), 500);
    return () => clearTimeout(timer);
  }, [visitType, facility, notes, prescriptions, pasienId, isLoaded]);

  const handleAddDrug = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!drugName.trim()) return;
    const fullDrug = `${drugName.trim()} ${dosage.trim()}`.trim();
    if (!prescriptions.includes(fullDrug)) {
      setPrescriptions([...prescriptions, fullDrug]);
    }
    setDrugName("");
    setDosage("");
  };

  const handleRemoveDrug = (drug: string) => {
    setPrescriptions(prescriptions.filter((d) => d !== drug));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim() || !facility.trim()) {
      alert("Harap isi fasilitas kesehatan dan diagnosis/catatan klinis.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onFinalize({
        visitType,
        facility,
        notes,
        prescriptions: [...prescriptions],
      });

      // Hapus draf setelah disubmit
      if (pasienId) {
        localStorage.removeItem(`draft_visit_${pasienId}`);
      }

      // Reset Form
      setNotes("");
      setPrescriptions([]);
    } catch (err) {
      console.error("Gagal menyimpan rekam medis:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-line p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-line pb-4 mb-6">
        <PlusCircleIcon className="h-6 w-6 text-accent" />
        <div>
          <h2 className="font-display text-lg font-bold text-ink">Tambah Kunjungan Baru</h2>
          <p className="text-xs text-ink-soft">Record new medical diagnosis and prescription</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ink uppercase tracking-wider">VISIT TYPE</label>
            <select
              value={visitType}
              onChange={(e) => setVisitType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-sm bg-paper text-ink transition-all"
            >
              <option>Pemeriksaan Umum</option>
              <option>Spesialis Jantung</option>
              <option>Spesialis Saraf</option>
              <option>Check-up Rutin</option>
              <option>Pemeriksaan Laboratorium</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ink uppercase tracking-wider">HEALTHCARE FACILITY</label>
            <input
              type="text"
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              placeholder="Nama Faskes..."
              className="w-full px-4 py-3 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-sm bg-paper text-ink transition-all"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">DIAGNOSIS & CLINICAL NOTES</label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter findings, symptoms, and diagnosis..."
            className="w-full px-4 py-3 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-sm bg-paper text-ink transition-all resize-none placeholder:text-ink-soft/40"
            required
          ></textarea>
        </div>

        {/* Prescriptions (E-Resep) */}
        <div className="border border-line rounded-xl p-4 bg-paper/50 flex flex-col gap-4">
          <label className="text-xs font-bold text-ink uppercase tracking-wider">PRESCRIPTIONS (E-RESEP)</label>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Drug Name (e.g. Paracetamol)"
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-sm bg-white text-ink transition-all"
            />
            <input
              type="text"
              placeholder="Dosage (e.g. 500mg, 3x1)"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="sm:w-1/3 px-4 py-2.5 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-sm bg-white text-ink transition-all"
            />
            <button
              type="button"
              onClick={handleAddDrug}
              className="bg-primary hover:bg-primary/95 text-white p-2.5 rounded-xl flex items-center justify-center shadow-xs transition-colors"
              aria-label="Tambah Obat"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Added Drugs List */}
          {prescriptions.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-line">
              {prescriptions.map((drug) => (
                <div
                  key={drug}
                  className="flex items-center gap-1.5 bg-[#fdebec] border border-[#fad4d6] text-alert px-3 py-1.5 rounded-lg text-xs font-medium"
                >
                  <span>{drug}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDrug(drug)}
                    className="text-alert/75 hover:text-alert font-bold p-0.5"
                    aria-label={`Hapus ${drug}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-line">
          <div className="text-xs text-ink-soft flex items-center gap-1.5 font-semibold">
            {pasienId && (
              isDraftSaving ? (
                <>
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary/20 border-t-primary"></div>
                  <span>Menyimpan draf...</span>
                </>
              ) : (
                <span className="text-[#056839] flex items-center gap-1">
                  <CheckIcon className="h-3.5 w-3.5" /> Draf tersimpan otomatis di perangkat Anda
                </span>
              )
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/95 text-white flex items-center gap-2 shadow-sm transition-colors text-sm font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
            ) : (
              <CheckIcon className="h-4 w-4" />
            )}
            {isSubmitting ? "Finalizing..." : "Finalize Visit"}
          </button>
        </div>
      </form>
    </div>
  );
}
