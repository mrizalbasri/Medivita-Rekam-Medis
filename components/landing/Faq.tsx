"use client";

import { useState } from "react";
import { ScrollReveal } from "../ui/ScrollReveal";

const faqs = [
  {
    question: "Bagaimana jika di daerah saya sinyal internetnya susah?",
    answer: "Sistem Medivita dirancang sangat ringan dan hemat kuota internet. Jika faskes kesulitan memindai QR Code karena kendala jaringan atau kamera, petugas medis tetap bisa memasukkan 6-digit kode backup unik Anda secara manual di dashboard komputer/HP mereka."
  },
  {
    question: "Apakah saya harus memiliki HP Android atau iPhone canggih?",
    answer: "Sama sekali tidak. Setelah mendaftar, Anda dapat mengunduh dan mencetak kartu QR Code Medivita di kertas biasa untuk disimpan di dompet. Cukup tunjukkan kertas cetak tersebut ke dokter atau perawat saat Anda berobat di Puskesmas."
  },
  {
    question: "Bagaimana jika kartu cetak saya basah, rusak, atau hilang?",
    answer: "Jangan khawatir. Anda dapat masuk kembali ke akun Medivita Anda dari HP anggota keluarga atau perangkat lain kapan saja untuk mengunduh dan mencetak ulang kartu QR Anda secara gratis."
  },
  {
    question: "Siapa saja yang bisa melihat isi riwayat rekam medis saya?",
    answer: "Hanya dokter, perawat, atau petugas apotek di tempat Anda berobat yang secara fisik memindai kartu QR Code Anda. Begitu pemeriksaan selesai dan sesi ditutup, data Anda langsung terhapus dari layar mereka dan tidak bisa diakses lagi tanpa persetujuan Anda."
  }
];

const delays = [100, 200, 300, 400] as const;

export function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="mx-auto max-w-[800px] px-4 py-20 md:px-10 md:py-24">
      <ScrollReveal variant="up" delay={100} className="mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2AACAB] mb-2.5 block animate-pulse">
          FAQ
        </span>
        <h2 className="font-display text-2xl font-semibold text-primary-dark md:text-3xl tracking-tight">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="mt-2.5 text-sm md:text-base text-ink-soft">
          Temukan jawaban atas pertanyaan umum seputar keamanan, privasi, dan penggunaan Medivita.
        </p>
      </ScrollReveal>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          const delay = delays[index % delays.length];
          const variant = index % 2 === 0 ? "left" : "right";
          return (
            <ScrollReveal
              key={index}
              variant={variant}
              delay={delay}
            >
              <div
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#2AACAB]/30 bg-white shadow-[0_12px_30px_rgba(42,172,171,0.04)] scale-[1.01]"
                    : "border-line/60 bg-white/50 hover:bg-white hover:border-primary/20"
                } overflow-hidden`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between p-5 text-left font-semibold text-ink transition-colors focus:outline-hidden"
                >
                  <span className="text-sm md:text-base pr-4 group-hover:text-primary transition-colors">{faq.question}</span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-soft/5 transition-all duration-500 ease-out ${
                      isOpen ? "rotate-45 bg-[#2AACAB]/10 text-[#2AACAB]" : "text-ink-soft/70 hover:scale-110"
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 pt-0 text-xs md:text-sm leading-relaxed text-ink-soft border-t border-line/30 mt-1">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
