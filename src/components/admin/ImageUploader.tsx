"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, X, Check } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  altValue?: string;
  onChange: (url: string) => void;
  onAltChange?: (alt: string) => void;
  label?: string;
}

export default function ImageUploader({
  value,
  altValue = "",
  onChange,
  onAltChange,
  label = "Hero / Cover Image",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      onChange(data.url);
      setUrlInput(data.url);
    } catch (err: any) {
      setUploadError(err.message || "Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleApplyUrl = () => {
    onChange(urlInput);
  };

  const handleClear = () => {
    onChange("");
    setUrlInput("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-white uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              mode === "upload" ? "bg-prime-accent text-white" : "text-prime-gray hover:text-white"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              mode === "url" ? "bg-prime-accent text-white" : "text-prime-gray hover:text-white"
            }`}
          >
            Paste URL
          </button>
        </div>
      </div>

      {uploadError && (
        <p className="text-xs text-rose-400">{uploadError}</p>
      )}

      {mode === "upload" ? (
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            className="hidden"
            id="admin-image-upload"
          />
          <label
            htmlFor="admin-image-upload"
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/15 hover:border-prime-accent/50 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition-all"
          >
            <UploadCloud className="w-8 h-8 text-prime-accent mb-2" />
            <span className="text-sm font-semibold text-white">
              {isUploading ? "Uploading..." : "Click to upload an image"}
            </span>
            <span className="text-xs text-prime-gray mt-1">
              Supports JPEG, PNG, WebP (Max 5MB)
            </span>
          </label>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-prime-accent"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2.5 rounded-xl bg-prime-accent text-white text-xs font-bold shrink-0"
          >
            Apply
          </button>
        </div>
      )}

      {/* Preview Container */}
      {value && (
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-prime-navy p-3 flex items-center gap-4">
          <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-white/5">
            <Image src={value} alt="Preview" fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white truncate font-mono">{value}</p>
            {onAltChange && (
              <input
                type="text"
                placeholder="Accessible Alt text (e.g., 'Team reviewing data pipeline')"
                value={altValue}
                onChange={(e) => onAltChange(e.target.value)}
                className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white placeholder-prime-gray/60 focus:outline-none focus:border-prime-accent"
              />
            )}
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg text-prime-gray hover:text-rose-400 hover:bg-rose-500/10"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
