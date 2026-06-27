"use client";

import { useState } from "react";
import * as Icons from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { PatientPrimaryNav } from "@/components/pasien/PatientPrimaryNav";
import { PatientBottomNav } from "@/components/pasien/PatientBottomNav";
import { PatientAccountMenu } from "@/components/pasien/PatientAccountMenu";

// ─── Icon Components ────────────────────────────────────────────────────────

function ArrowLeftIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function UserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function HeartPulseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l1.5-2 2 4.5 2-7 1.5 4.5H21" />
    </svg>
  );
}

function AlertTriangleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

function PillIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m10.5 3.5 10 10a7.07 7.07 0 1 1-10-10Z" />
      <line x1="8.5" y1="15.5" x2="15.5" y2="8.5" />
    </svg>
  );
}

function ActivityIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function PencilIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function PlusIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function DropletIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z" />
    </svg>
  );
}

function CalendarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface MedicalData {
  golonganDarah: string;
  alergi: string[];
  penyakitKronis: string[];
  obatRutin: ObatRutin[];
  tinggiBadan: string;
  beratBadan: string;
  tekananDarah: string;
  catatanTambahan: string;
}

interface ObatRutin {
  nama: string;
  dosis: string;
  frekuensi: string;
}

interface ProfilPasien {
  nama: string;
  nik: string;
  tanggalLahir: string;
  jenisKelamin: string;
  email: string;
  telepon: string;
  alamat: string;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const initialProfil: ProfilPasien = {
  nama: "Sarah Az-Zahra",
  nik: "3174056802000001",
  tanggalLahir: "1990-02-28",
  jenisKelamin: "P",
  email: "sarah.azzahra@email.com",
  telepon: "+62 812-3456-7890",
  alamat: "Jl. Raya Kebayoran Baru No. 12, Jakarta Selatan",
};

const initialMedical: MedicalData = {
  golonganDarah: "B+",
  alergi: ["Penisilin", "Kacang tanah"],
  penyakitKronis: ["Hipertensi ringan", "Asma"],
  obatRutin: [
    { nama: "Amlodipine", dosis: "5 mg", frekuensi: "1x sehari (pagi)" },
    { nama: "Salbutamol Inhaler", dosis: "100 mcg", frekuensi: "Saat diperlukan" },
  ],
  tinggiBadan: "162",
  beratBadan: "55",
  tekananDarah: "130/85",
  catatanTambahan: "Pasien memiliki riwayat reaksi alergi parah terhadap Penisilin (anafilaksis). Harap perhatikan sebelum meresepkan antibiotik.",
};

// ─── Tag Components ───────────────────────────────────────────────────────────

function TagAlergi({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-alert/10 px-3 py-1 text-xs font-semibold text-alert border border-alert/20">
      {label}
      {onRemove && (
        <button onClick={onRemove} className="rounded-full hover:bg-alert/20 p-0.5 transition-colors" aria-label={`Hapus alergi ${label}`}>
          <XIcon className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}

function TagPenyakit({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
      {label}
      {onRemove && (
        <button onClick={onRemove} className="rounded-full hover:bg-primary/20 p-0.5 transition-colors" aria-label={`Hapus penyakit ${label}`}>
          <XIcon className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  subtitle,
  onEdit,
  isEditing,
  onSave,
  onCancel,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onEdit?: () => void;
  isEditing?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}) {
  return (
    <div className="mb-5 flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          {icon}
        </div>
        <div>
          <h2 className="font-display text-sm font-bold text-primary-dark">{title}</h2>
          {subtitle && <p className="text-[11px] text-ink-soft mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <button
            onClick={onSave}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-white hover:bg-accent/90 transition-colors shadow-sm"
          >
            <CheckIcon className="h-3.5 w-3.5" />
            Simpan
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-paper transition-colors"
          >
            <XIcon className="h-3.5 w-3.5" />
            Batal
          </button>
        </div>
      ) : (
        onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-primary-soft hover:text-primary hover:border-primary/30 transition-all"
          >
            <PencilIcon className="h-3.5 w-3.5" />
            Edit
          </button>
        )
      )}
    </div>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  editing,
  onChange,
  type = "text",
  options,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange?: (v: string) => void;
  type?: string;
  options?: { label: string; value: string }[];
}) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">{label}</p>
      {editing ? (
        options ? (
          <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        )
      ) : (
        <p className="text-sm font-medium text-ink">{value || <span className="italic text-ink-soft">—</span>}</p>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProfilMedisPage() {
  const [profil, setProfil] = useState<ProfilPasien>(initialProfil);
  const [draftProfil, setDraftProfil] = useState<ProfilPasien>(initialProfil);
  const [editingProfil, setEditingProfil] = useState(false);

  const [medical, setMedical] = useState<MedicalData>(initialMedical);
  const [draftMedical, setDraftMedical] = useState<MedicalData>(initialMedical);
  const [editingMedical, setEditingMedical] = useState(false);

  const [newAlergi, setNewAlergi] = useState("");
  const [newPenyakit, setNewPenyakit] = useState("");
  const [savedToast, setSavedToast] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  function showToast() {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  }

  // Profil handlers
  function handleSaveProfil() {
    setProfil(draftProfil);
    setEditingProfil(false);
    showToast();
  }
  function handleCancelProfil() {
    setDraftProfil(profil);
    setEditingProfil(false);
  }

  // Medical handlers
  function handleSaveMedical() {
    setMedical(draftMedical);
    setEditingMedical(false);
    showToast();
  }
  function handleCancelMedical() {
    setDraftMedical(medical);
    setNewAlergi("");
    setNewPenyakit("");
    setEditingMedical(false);
  }

  function addAlergi() {
    const val = newAlergi.trim();
    if (!val || draftMedical.alergi.includes(val)) return;
    setDraftMedical((d) => ({ ...d, alergi: [...d.alergi, val] }));
    setNewAlergi("");
  }
  function removeAlergi(idx: number) {
    setDraftMedical((d) => ({ ...d, alergi: d.alergi.filter((_, i) => i !== idx) }));
  }

  function addPenyakit() {
    const val = newPenyakit.trim();
    if (!val || draftMedical.penyakitKronis.includes(val)) return;
    setDraftMedical((d) => ({ ...d, penyakitKronis: [...d.penyakitKronis, val] }));
    setNewPenyakit("");
  }
  function removePenyakit(idx: number) {
    setDraftMedical((d) => ({ ...d, penyakitKronis: d.penyakitKronis.filter((_, i) => i !== idx) }));
  }

  function updateObat(idx: number, field: keyof ObatRutin, val: string) {
    setDraftMedical((d) => {
      const obat = [...d.obatRutin];
      obat[idx] = { ...obat[idx], [field]: val };
      return { ...d, obatRutin: obat };
    });
  }
  function addObat() {
    setDraftMedical((d) => ({
      ...d,
      obatRutin: [...d.obatRutin, { nama: "", dosis: "", frekuensi: "" }],
    }));
  }
  function removeObat(idx: number) {
    setDraftMedical((d) => ({ ...d, obatRutin: d.obatRutin.filter((_, i) => i !== idx) }));
  }

  const bmi =
    medical.tinggiBadan && medical.beratBadan
      ? (
          parseFloat(medical.beratBadan) /
          Math.pow(parseFloat(medical.tinggiBadan) / 100, 2)
        ).toFixed(1)
      : null;

  function bmiLabel(bmi: number) {
    if (bmi < 18.5) return { label: "Kurus", color: "text-[#e08a00]" };
    if (bmi < 25) return { label: "Normal", color: "text-accent" };
    if (bmi < 30) return { label: "Gemuk", color: "text-[#e08a00]" };
    return { label: "Obesitas", color: "text-alert" };
  }

  const bmiInfo = bmi ? bmiLabel(parseFloat(bmi)) : null;

  return (
    <div className="flex min-h-screen flex-col bg-paper">

      {/* ── HEADER ── */}
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg">
              <Image src="/logo.webp" alt="Medivita Logo" fill sizes="36px" className="object-cover object-top scale-[1.3] -translate-y-[8%]" priority />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-primary-dark">Rekam Medis Jalan</span>
          </Link>
          <PatientPrimaryNav />

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSavedToast(true)}
              className="flex items-center gap-2 rounded-xl bg-[#0b3c5d] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary active:scale-95 shadow-sm"
            >
              <Icons.ScanIcon className="h-4 w-4 stroke-[2.5]" />
              Scan QR
            </button>
            <button
              onClick={() => { setShowNotification(true); setTimeout(() => setShowNotification(false), 3000); }}
              aria-label="Notification"
              className="relative rounded-full p-2 text-ink-soft hover:bg-primary-soft hover:text-primary transition-all"
            >
              <Icons.BellIcon className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-alert"></span>
            </button>
            <PatientAccountMenu name={profil.nama} email={profil.email} />
          </div>
        </div>
      </header>

      {/* ── SAVE TOAST ── */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-xl bg-primary-dark p-4 text-sm text-white shadow-xl">
          <ShieldCheckIcon className="h-5 w-5 text-accent" />
          <span>Keamanan enkripsi aktif. Semua data medis Anda aman.</span>
        </div>
      )}

      {savedToast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-xl" role="status">
          <CheckIcon className="h-4 w-4" />
          Perubahan berhasil disimpan
        </div>
      )}

      {/* ── MAIN ── */}
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 md:px-10">

        {/* Page heading */}
        <div className="mb-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Pasien · Sarah Az-Zahra</p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-primary-dark">Profil Medis</h1>
          <p className="mt-1 text-sm text-ink-soft">Kelola data pribadi dan rekam medis kamu secara aman.</p>
        </div>

        {/* Stat bar */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Golongan Darah", value: medical.golonganDarah, icon: <DropletIcon className="h-4 w-4" />, color: "bg-[#0b3c5d] text-white" },
            { label: "Alergi", value: `${medical.alergi.length} item`, icon: <AlertTriangleIcon className="h-4 w-4" />, color: "bg-alert-soft text-alert" },
            { label: "Penyakit Kronis", value: `${medical.penyakitKronis.length} kondisi`, icon: <ActivityIcon className="h-4 w-4" />, color: "bg-primary-soft text-primary" },
            { label: "Obat Rutin", value: `${medical.obatRutin.length} obat`, icon: <PillIcon className="h-4 w-4" />, color: "bg-accent-soft text-accent" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${s.color}`}>{s.icon}</div>
              <div>
                <p className="text-xs text-ink-soft">{s.label}</p>
                <p className="text-sm font-bold text-primary-dark">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* ── KOLOM KIRI ── */}
          <div className="flex flex-col gap-6 lg:col-span-5">

            {/* Data Pribadi */}
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<UserIcon />}
                title="Data Pribadi"
                subtitle="Informasi identitas & kontak pasien"
                onEdit={() => { setDraftProfil(profil); setEditingProfil(true); }}
                isEditing={editingProfil}
                onSave={handleSaveProfil}
                onCancel={handleCancelProfil}
              />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Nama Lengkap" value={editingProfil ? draftProfil.nama : profil.nama} editing={editingProfil} onChange={(v) => setDraftProfil((d) => ({ ...d, nama: v }))} />
                </div>
                <Field label="NIK" value={editingProfil ? draftProfil.nik : profil.nik} editing={editingProfil} onChange={(v) => setDraftProfil((d) => ({ ...d, nik: v }))} />
                <Field label="Tanggal Lahir" value={editingProfil ? draftProfil.tanggalLahir : profil.tanggalLahir} editing={editingProfil} type="date" onChange={(v) => setDraftProfil((d) => ({ ...d, tanggalLahir: v }))} />
                <Field
                  label="Jenis Kelamin"
                  value={editingProfil ? draftProfil.jenisKelamin : (profil.jenisKelamin === "P" ? "Perempuan" : "Laki-laki")}
                  editing={editingProfil}
                  onChange={(v) => setDraftProfil((d) => ({ ...d, jenisKelamin: v }))}
                  options={[{ label: "Perempuan", value: "P" }, { label: "Laki-laki", value: "L" }]}
                />
                <Field label="Email" value={editingProfil ? draftProfil.email : profil.email} editing={editingProfil} type="email" onChange={(v) => setDraftProfil((d) => ({ ...d, email: v }))} />
                <Field label="Nomor Telepon" value={editingProfil ? draftProfil.telepon : profil.telepon} editing={editingProfil} type="tel" onChange={(v) => setDraftProfil((d) => ({ ...d, telepon: v }))} />
                <div className="sm:col-span-2">
                  <Field label="Alamat" value={editingProfil ? draftProfil.alamat : profil.alamat} editing={editingProfil} onChange={(v) => setDraftProfil((d) => ({ ...d, alamat: v }))} />
                </div>
              </div>
            </div>

            {/* Tanda Vital */}
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<HeartPulseIcon />}
                title="Tanda Vital & Fisik"
                subtitle="Tinggi, berat, tekanan darah"
                onEdit={() => { setDraftMedical(medical); setEditingMedical(true); }}
                isEditing={editingMedical}
                onSave={handleSaveMedical}
                onCancel={handleCancelMedical}
              />
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Tinggi Badan", value: medical.tinggiBadan ? `${medical.tinggiBadan} cm` : "—", draftVal: draftMedical.tinggiBadan, field: "tinggiBadan" as keyof MedicalData, unit: "cm" },
                  { label: "Berat Badan", value: medical.beratBadan ? `${medical.beratBadan} kg` : "—", draftVal: draftMedical.beratBadan, field: "beratBadan" as keyof MedicalData, unit: "kg" },
                  { label: "Tekanan Darah", value: medical.tekananDarah ? `${medical.tekananDarah} mmHg` : "—", draftVal: draftMedical.tekananDarah, field: "tekananDarah" as keyof MedicalData, unit: "mmHg" },
                ].map((v) => (
                  <div key={v.label} className="flex flex-col items-center rounded-xl bg-paper p-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft">{v.label}</p>
                    {editingMedical ? (
                      <input
                        value={v.draftVal as string}
                        onChange={(e) => setDraftMedical((d) => ({ ...d, [v.field]: e.target.value }))}
                        placeholder={v.unit}
                        className="mt-1 w-full rounded-lg border border-line bg-white px-2 py-1.5 text-center text-sm outline-none focus:border-primary transition-all"
                      />
                    ) : (
                      <p className="mt-1 text-lg font-bold text-primary-dark">{v.value}</p>
                    )}
                  </div>
                ))}
              </div>
              {bmi && bmiInfo && !editingMedical && (
                <div className="mt-4 flex items-center justify-between rounded-xl bg-paper px-4 py-3">
                  <span className="text-xs font-semibold text-ink-soft">Indeks Massa Tubuh (IMT)</span>
                  <span className={`text-sm font-bold ${bmiInfo.color}`}>{bmi} — {bmiInfo.label}</span>
                </div>
              )}
            </div>

          </div>

          {/* ── KOLOM KANAN ── */}
          <div className="flex flex-col gap-6 lg:col-span-7">

            {/* Golongan Darah */}
            <div className="rounded-2xl border-2 border-alert/20 bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<DropletIcon />}
                title="Data Medis Kritis"
                subtitle="Informasi vital untuk kondisi darurat"
                onEdit={() => { setDraftMedical(medical); setEditingMedical(true); }}
                isEditing={editingMedical}
                onSave={handleSaveMedical}
                onCancel={handleCancelMedical}
              />

              {/* Golongan Darah */}
              <div className="mb-5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">Golongan Darah</p>
                {editingMedical ? (
                  <select
                    value={draftMedical.golonganDarah}
                    onChange={(e) => setDraftMedical((d) => ({ ...d, golonganDarah: e.target.value }))}
                    className="rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                ) : (
                  <span className="inline-block rounded-xl bg-[#0b3c5d] px-4 py-2 text-base font-black text-white tracking-wider">
                    {medical.golonganDarah}
                  </span>
                )}
              </div>

              {/* Alergi */}
              <div className="mb-5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">Alergi yang Diketahui</p>
                <div className="flex flex-wrap gap-2">
                  {(editingMedical ? draftMedical.alergi : medical.alergi).map((a, i) => (
                    <TagAlergi key={a} label={a} onRemove={editingMedical ? () => removeAlergi(i) : undefined} />
                  ))}
                  {(editingMedical ? draftMedical.alergi : medical.alergi).length === 0 && (
                    <span className="text-sm italic text-ink-soft">Tidak ada alergi tercatat</span>
                  )}
                </div>
                {editingMedical && (
                  <div className="mt-3 flex gap-2">
                    <input
                      value={newAlergi}
                      onChange={(e) => setNewAlergi(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addAlergi()}
                      placeholder="Tambah alergi baru..."
                      className="flex-1 rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-alert/60 focus:ring-2 focus:ring-alert/10 transition-all"
                    />
                    <button onClick={addAlergi} className="flex items-center gap-1 rounded-xl bg-alert/10 px-3 py-2 text-xs font-bold text-alert hover:bg-alert/20 transition-colors">
                      <PlusIcon className="h-3.5 w-3.5" /> Tambah
                    </button>
                  </div>
                )}
              </div>

              {/* Penyakit Kronis */}
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">Penyakit / Kondisi Kronis</p>
                <div className="flex flex-wrap gap-2">
                  {(editingMedical ? draftMedical.penyakitKronis : medical.penyakitKronis).map((p, i) => (
                    <TagPenyakit key={p} label={p} onRemove={editingMedical ? () => removePenyakit(i) : undefined} />
                  ))}
                  {(editingMedical ? draftMedical.penyakitKronis : medical.penyakitKronis).length === 0 && (
                    <span className="text-sm italic text-ink-soft">Tidak ada kondisi kronis tercatat</span>
                  )}
                </div>
                {editingMedical && (
                  <div className="mt-3 flex gap-2">
                    <input
                      value={newPenyakit}
                      onChange={(e) => setNewPenyakit(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addPenyakit()}
                      placeholder="Tambah kondisi kronis baru..."
                      className="flex-1 rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                    <button onClick={addPenyakit} className="flex items-center gap-1 rounded-xl bg-primary-soft px-3 py-2 text-xs font-bold text-primary hover:bg-primary/10 transition-colors">
                      <PlusIcon className="h-3.5 w-3.5" /> Tambah
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Obat Rutin */}
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<PillIcon />}
                title="Obat Rutin"
                subtitle="Daftar obat yang dikonsumsi secara reguler"
                onEdit={() => { setDraftMedical(medical); setEditingMedical(true); }}
                isEditing={editingMedical}
                onSave={handleSaveMedical}
                onCancel={handleCancelMedical}
              />
              <div className="space-y-3">
                {(editingMedical ? draftMedical.obatRutin : medical.obatRutin).map((o, i) => (
                  <div key={i} className="rounded-xl border border-line bg-paper p-4">
                    {editingMedical ? (
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-3 sm:col-span-1">
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-ink-soft">Nama Obat</label>
                          <input value={o.nama} onChange={(e) => updateObat(i, "nama", e.target.value)} placeholder="Nama obat" className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-primary transition-all" />
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-ink-soft">Dosis</label>
                          <input value={o.dosis} onChange={(e) => updateObat(i, "dosis", e.target.value)} placeholder="cth: 5mg" className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-primary transition-all" />
                        </div>
                        <div className="relative">
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-ink-soft">Frekuensi</label>
                          <input value={o.frekuensi} onChange={(e) => updateObat(i, "frekuensi", e.target.value)} placeholder="cth: 1x sehari" className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-primary transition-all" />
                          <button onClick={() => removeObat(i)} className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-alert/10 text-alert hover:bg-alert/20 transition-colors" aria-label="Hapus obat">
                            <XIcon className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-primary-dark">{o.nama}</p>
                          <p className="text-xs text-ink-soft mt-0.5">{o.frekuensi}</p>
                        </div>
                        <span className="shrink-0 rounded-lg bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent">{o.dosis}</span>
                      </div>
                    )}
                  </div>
                ))}
                {editingMedical && (
                  <button onClick={addObat} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line py-3 text-sm font-semibold text-ink-soft hover:border-primary hover:text-primary hover:bg-primary-soft/30 transition-all">
                    <PlusIcon />
                    Tambah Obat
                  </button>
                )}
                {!editingMedical && medical.obatRutin.length === 0 && (
                  <p className="text-center text-sm italic text-ink-soft py-4">Tidak ada obat rutin tercatat</p>
                )}
              </div>
            </div>

            {/* Catatan Tambahan */}
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<ActivityIcon />}
                title="Catatan Tambahan"
                subtitle="Informasi penting lain untuk tenaga medis"
                onEdit={() => { setDraftMedical(medical); setEditingMedical(true); }}
                isEditing={editingMedical}
                onSave={handleSaveMedical}
                onCancel={handleCancelMedical}
              />
              {editingMedical ? (
                <textarea
                  value={draftMedical.catatanTambahan}
                  onChange={(e) => setDraftMedical((d) => ({ ...d, catatanTambahan: e.target.value }))}
                  rows={4}
                  placeholder="Tambahkan catatan medis penting di sini..."
                  className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                />
              ) : medical.catatanTambahan ? (
                <p className="text-sm leading-relaxed text-ink">{medical.catatanTambahan}</p>
              ) : (
                <p className="text-sm italic text-ink-soft">Tidak ada catatan tambahan.</p>
              )}
            </div>

          </div>
        </div>

        {/* Enkripsi Notice */}
        <div className="mt-8 flex items-center justify-center gap-2.5 rounded-2xl border border-line bg-white py-4 px-6 shadow-sm">
          <ShieldCheckIcon className="h-5 w-5 text-accent" />
          <p className="text-xs text-ink-soft">
            Semua data medis kamu disimpan dengan enkripsi <strong className="text-ink">AES-256-GCM</strong> dan hanya dapat diakses oleh faskes yang kamu izinkan.
          </p>
        </div>

      </main>

      {/* ── FOOTER ── */}
      <footer className="mt-12 border-t border-line bg-primary-soft/30 py-6 px-4 text-center">
        <p className="text-xs text-ink-soft">
          © 2026 <span className="font-semibold text-primary-dark">Medivita · Rekam Medis Jalan</span> — PekanIT 2026
        </p>
      </footer>

      <PatientBottomNav />
    </div>
  );
}
