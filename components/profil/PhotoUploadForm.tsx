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
        <div className={`p-3 rounded-md text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
          {preview ? (
            <Image
              src={preview}
              alt="Preview foto profil"
              fill
              className="object-cover"
              sizes="128px"
            />
          ) : (
            <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>

        <div className="flex flex-col items-center sm:items-start space-y-2">
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
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Pilih Foto Baru
          </button>
          <p className="text-xs text-gray-500">JPG, PNG atau GIF. Maksimal 5MB.</p>
        </div>
      </div>

      <div className="flex justify-end pt-2 border-t border-gray-100">
        <button
          type="submit"
          disabled={!file || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Mengunggah..." : "Simpan Foto"}
        </button>
      </div>
    </form>
  );
}
