import React, { useState } from "react";
import { SearchIcon, KeyIcon, LockIcon } from "@/components/ui/icons";

interface PatientLookupProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFallbackSuccess?: (pasienId: string) => void;
}

export function PatientLookup({ searchQuery, setSearchQuery, onFallbackSuccess }: PatientLookupProps) {
  const [showFallbackForm, setShowFallbackForm] = useState(false);
  const [nik, setNik] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleFallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validasi dasar
    if (nik.trim().length !== 16) {
      setErrorMsg("NIK harus berupa 16 digit angka.");
      return;
    }
    if (pin.trim().length !== 6) {
      setErrorMsg("PIN Cadangan harus berupa 6 digit.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/akses/fallback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nik: nik.trim(),
          kodeCadangan: pin.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verifikasi PIN Cadangan gagal.");
      }

      setSuccessMsg("Akses berhasil diotorisasi!");
      setNik("");
      setPin("");
      
      // Berikan callback ke dashboard agar daftar diupdate dan pasien langsung aktif
      if (onFallbackSuccess) {
        onFallbackSuccess(data.pasien.id);
      }

      // Tutup form setelah 1.5 detik
      setTimeout(() => {
        setShowFallbackForm(false);
        setSuccessMsg(null);
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "NIK atau PIN Cadangan salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-line p-6 shadow-sm flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg font-bold text-ink">Patient Quick Lookup</h2>
        <p className="text-[11px] text-ink-soft">Cari pasien aktif atau gunakan PIN cadangan untuk otorisasi manual.</p>
      </div>

      {!showFallbackForm ? (
        <div className="flex flex-col gap-3">
          {/* Search Input */}
          <div className="relative">
            <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-ink-soft/60" />
            <input
              type="text"
              placeholder="Search scanned patient by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-sm bg-paper text-ink transition-all placeholder:text-ink-soft/50"
            />
          </div>

          {/* Toggle Button for Fallback PIN */}
          <button
            onClick={() => setShowFallbackForm(true)}
            className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-dashed border-line text-xs font-semibold text-ink-soft hover:text-primary hover:border-primary/50 transition-colors"
          >
            <KeyIcon className="h-4 w-4" />
            Gunakan PIN Cadangan Pasien
          </button>
        </div>
      ) : (
        /* Fallback PIN Form */
        <form onSubmit={handleFallbackSubmit} className="flex flex-col gap-3 border-t border-line pt-3 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-ink-soft flex items-center gap-1.5">
              <LockIcon className="h-3.5 w-3.5 text-primary" />
              Otorisasi PIN Cadangan
            </span>
            <button
              type="button"
              onClick={() => {
                setShowFallbackForm(false);
                setErrorMsg(null);
              }}
              className="text-[10px] font-bold text-alert hover:underline"
            >
              Batal
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Masukkan NIK Pasien (16 digit)..."
              maxLength={16}
              value={nik}
              onChange={(e) => setNik(e.target.value.replace(/\D/g, ""))}
              className="w-full px-3 py-2 rounded-xl border border-line focus:border-primary focus:outline-hidden text-xs bg-paper text-ink"
              required
            />
            <input
              type="password"
              placeholder="Masukkan PIN Cadangan (6 digit)..."
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              className="w-full px-3 py-2 rounded-xl border border-line focus:border-primary focus:outline-hidden text-xs bg-paper text-ink"
              required
            />
          </div>

          {errorMsg && (
            <div className="rounded-lg bg-alert-soft border border-alert/15 px-3 py-2 text-[10px] text-alert">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="rounded-lg bg-accent-soft border border-accent/15 px-3 py-2 text-[10px] text-[#056839] font-semibold">
              {successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !!successMsg}
            className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && (
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
            )}
            <span>{loading ? "Memverifikasi..." : "Verifikasi & Buka Akses"}</span>
          </button>
        </form>
      )}
    </div>
  );
}
