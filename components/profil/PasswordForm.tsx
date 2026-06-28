"use client";

import { useState } from "react";

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Konfirmasi password baru tidak cocok" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/users/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengubah password");
      }

      setMessage({ type: "success", text: "Password berhasil diubah!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Terjadi kesalahan" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className={`p-3.5 rounded-xl text-sm font-medium ${message.type === "success" ? "bg-accent-soft text-accent" : "bg-alert-soft text-alert"}`}>
          {message.text}
        </div>
      )}
      
      <div>
        <label htmlFor="currentPassword" className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1.5">Password Saat Ini</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="block w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          required
        />
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1.5">Password Baru</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="block w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          minLength={8}
          required
        />
        <p className="mt-1.5 text-xs text-ink-soft">Minimal 8 karakter.</p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1.5">Konfirmasi Password Baru</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          minLength={8}
          required
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#0b3c5d] hover:bg-primary-dark text-white rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? "Menyimpan..." : "Ubah Password"}
        </button>
      </div>
    </form>
  );
}
