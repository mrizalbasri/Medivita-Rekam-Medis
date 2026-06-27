"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/petugas/Navbar";
import { SettingsIcon, UserIcon, KeyIcon, CheckIcon } from "@/components/ui/icons";

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

      <footer className="bg-white border-t border-line py-6 mt-16 text-ink-soft">
        <div className="mx-auto max-w-[1280px] px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display font-bold text-ink text-sm">Medivita — Rekam Medis Jalan</span>
          <p className="text-[11px] font-mono">© 2026 Medivita. Hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
