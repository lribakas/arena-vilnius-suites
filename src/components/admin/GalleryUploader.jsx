import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, X, Loader2, ImageIcon, GripVertical } from "lucide-react";

const ACCEPTED = "image/jpeg,image/png,image/webp";
const MAX_MB = 10;

function validateFile(file) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    return "Only JPG, PNG, WebP allowed.";
  if (file.size > MAX_MB * 1024 * 1024)
    return `Max file size is ${MAX_MB}MB.`;
  return null;
}

export default function GalleryUploader({ value = [], onChange, label = "Gallery Images" }) {
  const [uploading, setUploading] = useState(false);
  const [draggingOver, setDraggingOver] = useState(false);
  const [error, setError] = useState(null);
  const [dragIdx, setDragIdx] = useState(null);
  const inputRef = useRef();

  const uploadFiles = async (files) => {
    const valid = Array.from(files).filter(f => {
      const err = validateFile(f);
      if (err) { setError(err); return false; }
      return true;
    });
    if (!valid.length) return;
    setError(null);
    setUploading(true);
    const urls = await Promise.all(valid.map(f => base44.integrations.Core.UploadFile({ file: f }).then(r => r.file_url)));
    onChange([...value, ...urls]);
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggingOver(false);
    uploadFiles(e.dataTransfer.files);
  };

  const handleFile = (e) => {
    uploadFiles(e.target.files);
    e.target.value = "";
  };

  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));

  // Drag-to-reorder
  const onDragStart = (idx) => setDragIdx(idx);
  const onDragEnterItem = (idx) => {
    if (dragIdx === null || dragIdx === idx) return;
    const next = [...value];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(idx, 0, moved);
    setDragIdx(idx);
    onChange(next);
  };
  const onDragEnd = () => setDragIdx(null);

  return (
    <div>
      <label className="font-heading text-[9px] tracking-[0.3em] uppercase text-white/28 mb-2 block font-medium">{label}</label>

      {/* Thumbnails */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((url, idx) => (
            <div
              key={url + idx}
              draggable
              onDragStart={() => onDragStart(idx)}
              onDragEnter={() => onDragEnterItem(idx)}
              onDragEnd={onDragEnd}
              onDragOver={e => e.preventDefault()}
              className={`relative group w-20 h-20 flex-shrink-0 border transition-all cursor-grab ${
                dragIdx === idx ? "border-white/40 opacity-50 scale-95" : "border-white/[0.08]"
              }`}
            >
              <img src={url} alt="" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                <GripVertical className="w-3.5 h-3.5 text-white/60" />
                <button onClick={() => remove(idx)} className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 p-1 transition-colors">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer border-2 border-dashed transition-all duration-200 flex items-center justify-center gap-3 py-5 px-6 ${
          draggingOver ? "border-white/30 bg-white/[0.04]" : "border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]"
        }`}
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 text-white/30 animate-spin" />
        ) : (
          <ImageIcon className="w-4 h-4 text-white/20" />
        )}
        <p className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/25">
          {uploading ? "Uploading…" : "Add images — drag & drop or click"}
        </p>
        <input ref={inputRef} type="file" accept={ACCEPTED} multiple className="hidden" onChange={handleFile} />
      </div>

      {value.length > 1 && (
        <p className="text-white/18 text-[11px] mt-1.5">Drag thumbnails to reorder</p>
      )}
      {error && <p className="text-red-400/70 text-[11px] mt-1.5">{error}</p>}
    </div>
  );
}