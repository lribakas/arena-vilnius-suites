import React, { useRef, useState } from "react";
import { Upload, X, RefreshCw, ImageIcon } from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function validateFile(file) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    return "Only JPG, PNG, WebP allowed.";
  if (file.size > 5 * 1024 * 1024)
    return "Max file size is 5MB.";
  return null;
}

export default function ImageUploader({ value, onChange, label = "Image" }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);

  const process = async (file) => {
    const err = validateFile(file);
    if (err) { setError(err); return; }
    setError(null);
    const b64 = await fileToBase64(file);
    onChange(b64);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) process(file);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) process(file);
  };

  return (
    <div>
      <label className="font-heading text-[9px] tracking-[0.3em] uppercase text-white/28 mb-2 block font-medium">{label}</label>

      {value ? (
        <div className="relative group">
          <img src={value} alt="" className="w-full h-48 object-cover opacity-80 border border-white/[0.08]" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <label className="cursor-pointer flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 font-heading text-[9px] tracking-[0.2em] uppercase text-white transition-colors">
              <RefreshCw className="w-3 h-3" />
              Replace
              <input type="file" accept={ACCEPTED} className="hidden" onChange={handleFile} />
            </label>
            <button
              onClick={() => onChange("")}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 px-4 py-2 font-heading text-[9px] tracking-[0.2em] uppercase text-white transition-colors"
            >
              <X className="w-3 h-3" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 py-10 px-6 text-center ${
            dragging ? "border-white/30 bg-white/[0.04]" : "border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]"
          }`}
        >
          <ImageIcon className="w-6 h-6 text-white/20" />
          <div>
            <p className="font-heading text-[10px] tracking-[0.25em] uppercase text-white/35">
              Drag & drop or click to upload
            </p>
            <p className="text-white/20 text-[11px] mt-1">JPG, PNG, WebP · Max 5MB</p>
          </div>
          <label className="cursor-pointer flex items-center gap-2 border border-white/[0.12] hover:border-white/30 px-4 py-2 font-heading text-[9px] tracking-[0.2em] uppercase text-white/40 hover:text-white/70 transition-colors mt-1">
            <Upload className="w-3 h-3" />
            Choose File
            <input ref={inputRef} type="file" accept={ACCEPTED} className="hidden" onChange={handleFile} />
          </label>
        </div>
      )}

      {error && <p className="text-red-400/70 text-[11px] mt-1.5">{error}</p>}
    </div>
  );
}