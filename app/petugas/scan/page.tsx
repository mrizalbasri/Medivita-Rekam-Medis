"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 19-7-7 7-7M5 12h14" />
    </svg>
  );
}

function ScanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
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

export default function ScanPage() {
  const router = useRouter();
  const [scanError, setScanError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string; name: string } | null>(null);
  const [simulatedToken, setSimulatedToken] = useState("");
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    // Dinonaktifkan untuk SSR
    if (typeof window === "undefined") return;

    // Load library secara dinamis
    import("html5-qrcode")
      .then((module) => {
        const Html5QrcodeScanner = module.Html5QrcodeScanner;
        
        // Buat instance scanner
        const scannerInstance = new Html5QrcodeScanner(
          "reader",
          {
            fps: 10,
            qrbox: (width, height) => {
              const minDimension = Math.min(width, height);
              return {
                width: Math.floor(minDimension * 0.7),
                height: Math.floor(minDimension * 0.7)
              };
            },
            aspectRatio: 1.0,
            showTorchButtonIfSupported: true,
          },
          /* verbose= */ false
        );

        scannerInstance.render(
          async (decodedText) => {
            // Hentikan scan jika sedang loading atau sudah sukses
            if (loading || successData) return;
            await handleProcessQr(decodedText, scannerInstance);
          },
          (errorMessage) => {
            // Error biasa jika tidak menemukan QR di frame, tidak perlu ditampilkan di UI
          }
        );

        scannerRef.current = scannerInstance;
      })
      .catch((err) => {
        console.error("Gagal memuat html5-qrcode:", err);
        setScanError("Kamera pemindai gagal diinisialisasi.");
      });

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .catch((err: any) => console.error("Gagal menghentikan scanner kamera:", err));
      }
    };
  }, []);

  const handleProcessQr = async (token: string, scannerToClear?: any) => {
    setLoading(true);
    setScanError(null);

    try {
      const response = await fetch("/api/akses/mulai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrToken: token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal memproses QR Code");
      }

      setSuccessData(data.pasien);

      // Bersihkan scanner kamera
      const scanner = scannerToClear || scannerRef.current;
      if (scanner) {
        await scanner.clear().catch((err: any) => console.error("Gagal membersihkan scanner:", err));
      }

      // Simpan accessToken di sessionStorage untuk query data pasien selanjutnya
      if (data.accessToken) {
        sessionStorage.setItem(`access_token_${data.pasien.id}`, data.accessToken);
      }

      // Beri jeda 1.5 detik agar petugas melihat feedback sukses, lalu redirect
      setTimeout(() => {
        router.push(`/petugas/dashboard?pasienId=${data.pasien.id}`);
      }, 1500);

    } catch (err: any) {
      console.error("Gagal memindai QR:", err);
      setScanError(err.message || "Terjadi kesalahan saat memproses QR Code.");
      setLoading(false);
    }
  };

  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedToken.trim()) return;
    handleProcessQr(simulatedToken.trim());
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f8fa]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-line bg-white py-3.5 shadow-xs">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6">
          <Link href="/petugas/dashboard" className="flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-primary transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
            Kembali ke Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-primary-soft flex items-center justify-center">
              <span className="font-display font-bold text-primary text-sm">M</span>
            </div>
            <span className="font-display font-bold text-ink">Medivita</span>
          </div>
        </div>
      </header>

      {/* Main Scanner Container */}
      <main className="mx-auto flex w-full max-w-[500px] flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full rounded-3xl border border-line bg-white p-6 shadow-md text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <ScanIcon className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-bold text-ink mb-1">Pindai QR Code Pasien</h1>
          <p className="text-xs text-ink-soft mb-6">
            Arahkan kamera ke QR Code yang terdapat pada kartu atau aplikasi Medivita pasien.
          </p>

          {/* Success Overlay */}
          {successData ? (
            <div className="my-6 rounded-2xl bg-accent-soft border border-accent/20 p-8 text-center animate-fade-in-up">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-md">
                <CheckIcon className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-lg text-ink">Akses Diizinkan!</h3>
              <p className="text-sm text-ink-soft mt-1">
                Berhasil menyambungkan dengan rekam medis <strong>{successData.name}</strong>. Meredirect...
              </p>
            </div>
          ) : (
            /* Webcam QR Container */
            <div className="relative my-6 overflow-hidden rounded-2xl border border-line bg-black max-w-[320px] mx-auto shadow-inner">
              <div id="reader" className="w-full bg-black aspect-square"></div>
              
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs text-white">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
                  <span className="mt-3 text-xs font-semibold tracking-wider">Memproses QR...</span>
                </div>
              )}
            </div>
          )}

          {/* Error Alert */}
          {scanError && (
            <div className="mt-4 rounded-xl bg-alert-soft border border-alert/20 p-4 text-left text-xs text-alert">
              <p className="font-bold">Pemindaian Gagal:</p>
              <p className="mt-0.5">{scanError}</p>
            </div>
          )}
        </div>

        {/* Simulation Block for Developers (PekanIT Demo Friendly) */}
        <div className="w-full mt-6 rounded-2xl border border-line bg-white p-5 shadow-xs">
          <h2 className="text-xs font-bold text-ink-soft uppercase tracking-wider mb-2">Simulasi Scan (Pengujian Demo)</h2>
          <p className="text-[11px] text-ink-soft mb-4 leading-relaxed">
            Gunakan area ini untuk memasukkan QR token JWT pasien secara manual jika kamera tidak dapat diakses atau sedang diuji di emulator.
          </p>
          <form onSubmit={handleSimulatedSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Paste QR Token JWT di sini..."
              value={simulatedToken}
              onChange={(e) => setSimulatedToken(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-line focus:border-primary focus:outline-hidden text-xs bg-[#f4f8fa] text-ink transition-all"
              disabled={loading || !!successData}
            />
            <button
              type="submit"
              disabled={loading || !simulatedToken.trim() || !!successData}
              className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              Simulate
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
