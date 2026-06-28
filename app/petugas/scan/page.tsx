"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, ScanIcon, CheckIcon, FilePlusIcon } from "@/components/ui/icons";

export default function ScanPage() {
  const router = useRouter();
  const [scanError, setScanError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string; name: string } | null>(null);
  const [simulatedToken, setSimulatedToken] = useState("");
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Jalankan hanya di client
    if (typeof window === "undefined") return;

    let active = true;

    async function startCamera() {
      try {
        // Ambil jsQR secara dinamis atau statis
        const jsQR = (await import("jsqr")).default;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment", // Paksa kamera belakang
            width: { ideal: 640 },
            height: { ideal: 640 },
          },
          audio: false,
        });

        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true"); // Penting untuk iOS
          videoRef.current.play().catch((err) => {
            console.error("Gagal memutar video:", err);
          });
        }

        // Loop untuk memindai frame
        const scanFrame = () => {
          if (!active) return;

          const video = videoRef.current;
          const canvas = canvasRef.current;

          if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            if (ctx) {
              // Set ukuran canvas sesuai video
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;

              // Gambar frame video ke canvas
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

              // Ambil pixel data
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

              // Pindai dengan jsQR
              const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
              });

              if (code && code.data) {
                // QR code terdeteksi!
                handleProcessQr(code.data);
                return; // Stop scan loop
              }
            }
          }

          // Lanjutkan loop jika belum ketemu/sedang memindai
          animationFrameId.current = requestAnimationFrame(scanFrame);
        };

        animationFrameId.current = requestAnimationFrame(scanFrame);
      } catch (err: any) {
        console.error("Gagal mengakses kamera:", err);
        setScanError(
          "Gagal mengakses kamera belakang. Pastikan izin kamera sudah diberikan dan tidak sedang digunakan oleh aplikasi lain."
        );
      }
    }

    startCamera();

    return () => {
      active = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleProcessQr = async (token: string) => {
    // Stop camera stream saat memproses agar tidak menembak API berkali-kali
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

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
      
      // Jika gagal, restart scanner agar petugas bisa coba lagi
      restartScanner();
    }
  };

  const restartScanner = async () => {
    try {
      const jsQR = (await import("jsqr")).default;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 640 },
          height: { ideal: 640 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((err) => console.error(err));
      }

      const scanFrame = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (ctx) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: "dontInvert",
            });

            if (code && code.data) {
              handleProcessQr(code.data);
              return;
            }
          }
        }
        animationFrameId.current = requestAnimationFrame(scanFrame);
      };

      animationFrameId.current = requestAnimationFrame(scanFrame);
    } catch (err) {
      console.error("Gagal me-restart kamera:", err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setScanError(null);

    // Hentikan kamera stream jika sedang berjalan
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    try {
      const jsQR = (await import("jsqr")).default;
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            setScanError("Gagal memproses gambar.");
            setLoading(false);
            restartScanner();
            return;
          }

          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });

          if (code && code.data) {
            handleProcessQr(code.data);
          } else {
            setScanError("QR Code tidak ditemukan dalam gambar. Coba gambar lain.");
            setLoading(false);
            restartScanner();
          }
        };
        image.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Gagal membaca file gambar:", err);
      setScanError("Gagal membaca file gambar.");
      setLoading(false);
      restartScanner();
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
          <Link href="/petugas/dashboard" className="flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-accent transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
            Kembali ke Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-accent-soft flex items-center justify-center">
              <span className="font-display font-bold text-accent text-sm">M</span>
            </div>
            <span className="font-display font-bold text-ink">Medivita</span>
          </div>
        </div>
      </header>

      {/* Main Scanner Container */}
      <main className="mx-auto flex w-full max-w-[500px] flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full rounded-3xl border border-line bg-white p-6 shadow-md text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
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
            <div className="relative my-6 overflow-hidden rounded-2xl border border-line bg-black max-w-[320px] mx-auto shadow-inner aspect-square">
              {/* Element video untuk camera stream */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-2xl"
                muted
                playsInline
              />
              
              {/* Canvas tersembunyi untuk mengambil data frame */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Laser / Scanner Target Reticle Effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 border-2 border-accent/40 rounded-xl relative">
                  {/* Pojok-pojok target border tebal */}
                  <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-4 border-l-4 border-accent rounded-tl-lg" />
                  <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-4 border-r-4 border-accent rounded-tr-lg" />
                  <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-4 border-l-4 border-accent rounded-bl-lg" />
                  <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-4 border-r-4 border-accent rounded-br-lg" />
                  
                  {/* Laser line animation */}
                  <div className="absolute left-0 right-0 h-[2px] bg-accent/80 shadow-[0_0_8px_#2aacab] animate-[scanLaser_2s_infinite]" />
                </div>
              </div>
              
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs text-white rounded-2xl">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
                  <span className="mt-3 text-xs font-semibold tracking-wider">Memproses QR...</span>
                </div>
              )}
            </div>
          )}

          {/* Upload Image Option */}
          {!successData && (
            <div className="mt-4 border-t border-line pt-4 text-center">
              <p className="text-[11px] text-ink-soft mb-2">Atau gunakan file gambar QR Code jika kamera bermasalah:</p>
              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-line bg-white hover:bg-paper cursor-pointer text-xs font-semibold text-ink-soft transition-all active:scale-95 shadow-xs">
                <FilePlusIcon className="h-4 w-4 text-accent" />
                <span>Unggah Gambar QR Code</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={loading}
                />
              </label>
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
              className="flex-1 px-3 py-2 rounded-xl border border-line focus:border-accent focus:outline-hidden text-xs bg-[#f4f8fa] text-ink transition-all"
              disabled={loading || !!successData}
            />
            <button
              type="submit"
              disabled={loading || !simulatedToken.trim() || !!successData}
              className="rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              Simulate
            </button>
          </form>
        </div>
      </main>

      <style jsx global>{`
        @keyframes scanLaser {
          0% { top: 0%; opacity: 0.3; }
          50% { top: 100%; opacity: 1; }
          100% { top: 0%; opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
