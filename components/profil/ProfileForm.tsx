"use client";

import { useState } from "react";

interface UserData {
  name: string;
  email: string;
}

interface ProfileFormProps {
  initialData: UserData;
  onSuccess: (data: UserData) => void;
}

export default function ProfileForm({ initialData, onSuccess }: ProfileFormProps) {
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal memperbarui profil");
      }

      setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
      onSuccess({ name, email });
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
        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1.5">Nama Lengkap</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1.5">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          required
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#0b3c5d] hover:bg-primary-dark text-white rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
