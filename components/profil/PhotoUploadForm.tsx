"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface PhotoUploadFormProps {
  currentPhotoUrl?: string | null;
  onSuccess: (newPhotoUrl: string) => void;
}

export default function PhotoUploadForm({ currentPhotoUrl, onSuccess }: PhotoUploadFormProps) {
  const [preview, setPreview] = useState<string | null>(currentPhotoUrl || null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setMessage({ type: "error", text: "File harus berupa gambar (JPG/PNG)" });
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB
      setMessage({ type: "error", text: "Ukuran file maksimal 5MB" });
      return;
    }

    setFile(selectedFile);
    setMessage(null);

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/users/photo", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengunggah foto");
      }

      setMessage({ type: "success", text: "Foto berhasil diperbarui!" });
      onSuccess(data.profilePicture);
      setFile(null);
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

      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-line bg-paper flex items-center justify-center shadow-inner">
          {preview ? (
            <Image
              src={preview}
              alt="Preview foto profil"
              fill
              className="object-cover"
              sizes="128px"
            />
          ) : (
            <svg className="h-16 w-16 text-ink-soft/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>

        <div className="flex flex-col items-center sm:items-start space-y-2 w-full sm:w-auto">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto px-4 py-2 bg-white border border-line rounded-xl text-sm font-semibold text-primary hover:bg-primary-soft/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all cursor-pointer text-center"
          >
            Pilih Foto Baru
          </button>
          <p className="text-xs text-ink-soft">JPG, PNG atau GIF. Maksimal 5MB.</p>
        </div>
      </div>

      <div className="flex justify-end pt-3 border-t border-line">
        <button
          type="submit"
          disabled={!file || isLoading}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#0b3c5d] hover:bg-primary-dark text-white rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? "Mengunggah..." : "Simpan Foto"}
        </button>
      </div>
    </form>
  );
}
