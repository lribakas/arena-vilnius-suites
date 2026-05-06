import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp";
const MAX_MB = 10;

function validateFile(file) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    return "Only JPG, PNG, WebP allowed.";
  if (file.size > MAX_MB * 1024 * 1024)
    return `Max file size is ${MAX_MB}MB.`;
  return null;
}

export default function ImageUploader({ value, onChange, label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const upload = async (file) => {
    const err = validateFile(file);
    if (err) { setError(err); return; }
    setError(null);
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    onChange(file_url);
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    e.target.value = "";
  };

  return (
    <div>
      <label className="font-heading text-[9px] tracking-[0.3em] uppercase text-white/28 mb-2 block font-medium">{label}</label>

      {value ? (
        <div className="relative group w-full">
          <img src={value} alt="" className="w-full h-48 object-cover opacity-80 border border-white/[0.08]" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <label className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 font-heading text-[9px] tracking-[0.2em] uppercase text-white transition-colors flex items-center gap-2">
              {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
              Replace
              <input type="file" accept={ACCEPTED} className="hidden" onChange={handleFile} />
            </label>
            <button onClick={() => onChange("")} className="bg-white/10 hover:bg-red-500/30 border border-white/20 hover:border-red-500/50 p-1.5 transition-colors">
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-3 py-10 px-6 text-center ${
            dragging ? "border-white/30 bg-white/[0.04]" : "border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]"
          }`}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-white/30 animate-spin" />
          ) : (
            <ImageIcon className="w-6 h-6 text-white/20" />
          )}
          <div>
            <p className="font-heading text-[10px] tracking-[0.25em] uppercase text-white/30">
              {uploading ? "Uploading…" : "Drag & drop or click to upload"}
            </p>
            <p className="text-white/18 text-[11px] mt-1">JPG, PNG, WebP · Max {MAX_MB}MB</p>
          </div>
          <input ref={inputRef} type="file" accept={ACCEPTED} className="hidden" onChange={handleFile} />
        </div>
      )}

      {error && <p className="text-red-400/70 text-[11px] mt-1.5">{error}</p>}
    </div>
  );
}