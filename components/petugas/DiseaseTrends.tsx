"use client";

import React, { useState, useEffect } from "react";
import { ActivityIcon } from "@/components/ui/icons";

interface TrendItem {
  name: string;
  count: number;
  percentage: number;
}

export function DiseaseTrends() {
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const res = await fetch("/api/petugas/disease-trends");
        if (res.ok) {
          const data = await res.json();
          setTrends(data.trends || []);
        }
      } catch (err) {
        console.error("Gagal memuat tren penyakit:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrends();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-line p-6 shadow-sm flex flex-col gap-4 h-full">
        <div>
          <h2 className="font-display text-lg font-bold text-ink">Tren Penyakit Bulan Ini</h2>
          <p className="text-[11px] text-ink-soft">Memuat analisis diagnosis terbanyak...</p>
        </div>
        <div className="space-y-4 pt-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-col gap-2 animate-pulse">
              <div className="flex justify-between items-center text-xs">
                <div className="h-3 w-28 bg-line rounded-md"></div>
                <div className="h-3 w-8 bg-line rounded-md"></div>
              </div>
              <div className="w-full bg-paper h-2 rounded-full overflow-hidden">
                <div className="bg-line h-full rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-line p-6 shadow-sm flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2.5 border-b border-line pb-3">
        <div className="h-8 w-8 bg-accent-soft text-accent rounded-xl flex items-center justify-center">
          <ActivityIcon className="h-4.5 w-4.5" />
        </div>
        <div>
          <h2 className="font-display text-base font-bold text-ink">Tren Penyakit Bulan Ini</h2>
          <p className="text-[10px] text-ink-soft">Statistik diagnosis paling banyak di-input</p>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        {trends.length > 0 ? (
          trends.map((t, i) => {
            // Skema warna bar bergantian untuk visualisasi yang menarik
            const barColors = [
              "bg-accent",
              "bg-[#0284c7]",
              "bg-[#5db870]",
              "bg-[#3d9652]",
              "bg-accent/70",
            ];
            const colorClass = barColors[i % barColors.length];

            return (
              <div key={t.name} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-ink truncate max-w-[200px]" title={t.name}>{t.name}</span>
                  <span className="font-semibold text-ink-soft font-mono">
                    {t.count} Kasus ({t.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-paper h-2 rounded-full overflow-hidden border border-line/20 shadow-inner">
                  <div
                    className={`${colorClass} h-full rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${t.percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-ink-soft text-center py-4">Belum ada data kunjungan bulan ini.</p>
        )}
      </div>
    </div>
  );
}
