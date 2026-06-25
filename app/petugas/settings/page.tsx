"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/petugas/Navbar";

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function KeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 1.5 1.5M15.5 7.5 14 6" />
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

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI feedback states
  const [submittingProfile, setSubmittingProfile] = useState(false);
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/users/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setName(data.user.name);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Gagal mengambil data profil:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(false);

    if (!name.trim()) {
      setProfileError("Nama tidak boleh kosong.");
      return;
    }

    setSubmittingProfile(true);
    try {
      const res = await fetch("/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal memperbarui profil.");
      }

      setProfileSuccess(true);
      
      // Update local state user name
      setUser((prev: any) => ({ ...prev, name: name.trim() }));
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err: any) {
      setProfileError(err.message || "Terjadi kesalahan koneksi.");
    } finally {
      setSubmittingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Harap lengkapi semua bidang password.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Password baru minimal harus 8 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi password baru tidak cocok.");
      return;
    }

    setSubmittingPassword(true);
    try {
      const res = await fetch("/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengganti password.");
      }

      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      setPasswordError(err.message || "Terjadi kesalahan koneksi.");
    } finally {
      setSubmittingPassword(false);
    }
  };

  const handleScanClick = () => {
    router.push("/petugas/scan");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f8fa]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
      </div>
    );
  }

  const doctorInitials = user ? user.name.replace(/^(dr\.|dr|dokter)\s+/i, "").split(" ").map((n: any) => n[0]).join("").slice(0, 2).toUpperCase() : "DR";
  const doctorName = user ? user.name : "Dokter Medivita";

  return (
    <div className="min-h-screen bg-[#f4f8fa] flex flex-col font-sans">
      <Navbar onScanClick={handleScanClick} doctorInitials={doctorInitials} doctorName={doctorName} isLoading={!user} />

      <main className="flex-1 mx-auto w-full max-w-[1280px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-display text-ink">Pengaturan Akun</h1>
          <p className="text-xs text-ink-soft mt-1">
            Perbarui data profil nakes dan kata sandi pengaman akun Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Read-only Profile Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-line p-6 shadow-sm flex flex-col gap-4">
              <div className="h-12 w-12 bg-primary-soft text-primary rounded-2xl flex items-center justify-center">
                <SettingsIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider">Identitas Penugasan</p>
                <h2 className="text-lg font-bold font-display text-ink mt-1 truncate" title={user?.name}>{user?.name}</h2>
                <p className="text-xs text-primary font-medium mt-0.5">{user?.email}</p>
              </div>
              <div className="border-t border-line pt-4 mt-2 space-y-3 text-xs">
                <div>
                  <span className="block text-ink-soft font-mono uppercase tracking-wider text-[10px]">NOMOR STR</span>
                  <span className="font-bold text-ink mt-0.5 block">{user?.petugas?.licenseNo || "-"}</span>
                </div>
                <div>
                  <span className="block text-ink-soft font-mono uppercase tracking-wider text-[10px]">INSTANSI / FASKES</span>
                  <span className="font-bold text-ink mt-0.5 block">{user?.petugas?.faskesName || "-"}</span>
                </div>
                <div>
                  <span className="block text-ink-soft font-mono uppercase tracking-wider text-[10px]">TIPE FASKES</span>
                  <span className="font-bold text-ink mt-0.5 block">{user?.petugas?.faskesType || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Form Ubah Nama */}
            <div className="bg-white rounded-2xl border border-line p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-line pb-4 mb-6">
                <UserIcon className="h-5.5 w-5.5 text-primary" />
                <div>
                  <h3 className="font-display font-bold text-ink text-sm">Informasi Profil</h3>
                  <p className="text-xs text-ink-soft">Ubah nama lengkap petugas medis Anda</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink uppercase tracking-wider">NAMA LENGKAP</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama lengkap..."
                    className="w-full px-4 py-3 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-sm bg-paper text-ink transition-all"
                    required
                  />
                </div>

                {profileError && (
                  <div className="text-xs text-alert bg-alert-soft border border-alert/20 px-4 py-2 rounded-xl">
                    {profileError}
                  </div>
                )}

                {profileSuccess && (
                  <div className="text-xs text-[#056839] bg-accent-soft border border-[#d2ebd7] px-4 py-2 rounded-xl flex items-center gap-1.5 font-semibold">
                    <CheckIcon className="h-4 w-4" /> Profil berhasil diperbarui!
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submittingProfile || profileSuccess}
                  className="w-fit self-end px-5 py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submittingProfile && (
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                  )}
                  <span>{submittingProfile ? "Menyimpan..." : "Simpan Profil"}</span>
                </button>
              </form>
            </div>

            {/* Form Ubah Password */}
            <div className="bg-white rounded-2xl border border-line p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-line pb-4 mb-6">
                <KeyIcon className="h-5.5 w-5.5 text-primary" />
                <div>
                  <h3 className="font-display font-bold text-ink text-sm">Ganti Kata Sandi</h3>
                  <p className="text-xs text-ink-soft">Ubah kata sandi pengaman akun Anda</p>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink uppercase tracking-wider">PASSWORD LAMA</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan password saat ini..."
                    className="w-full px-4 py-3 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-sm bg-paper text-ink transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wider">PASSWORD BARU</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimal 8 karakter..."
                      className="w-full px-4 py-3 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-sm bg-paper text-ink transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wider">KONFIRMASI PASSWORD BARU</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Masukkan kembali password baru..."
                      className="w-full px-4 py-3 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-sm bg-paper text-ink transition-all"
                      required
                    />
                  </div>
                </div>

                {passwordError && (
                  <div className="text-xs text-alert bg-alert-soft border border-alert/20 px-4 py-2 rounded-xl">
                    {passwordError}
                  </div>
                )}

                {passwordSuccess && (
                  <div className="text-xs text-[#056839] bg-accent-soft border border-[#d2ebd7] px-4 py-2 rounded-xl flex items-center gap-1.5 font-semibold">
                    <CheckIcon className="h-4 w-4" /> Password berhasil diganti!
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submittingPassword || passwordSuccess}
                  className="w-fit self-end px-5 py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submittingPassword && (
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                  )}
                  <span>{submittingPassword ? "Memperbarui..." : "Perbarui Password"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-line py-8 mt-16 text-ink-soft">
        <div className="mx-auto max-w-[1280px] px-6 text-center text-xs font-mono">
          © 2026 Rekam Medis Jalan (Medivita). PekanIT 2026 Credits.
        </div>
      </footer>
    </div>
  );
}
