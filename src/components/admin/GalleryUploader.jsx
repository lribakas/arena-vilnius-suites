import React, { useRef, useState } from "react";
import { Upload, X, ImageIcon, GripVertical } from "lucide-react";

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
    return "Max file size is 5MB per image.";
  return null;
}

export default function GalleryUploader({ value = [], onChange, label = "Gallery Images" }) {
  const inputRef = useRef();
  const [draggingOver, setDraggingOver] = useState(false);
  const [dragIdx, setDragIdx] = useState(null);
  const [error, setError] = useState(null);

  const processFiles = async (files) => {
    setError(null);
    const valid = [];
    for (const file of Array.from(files)) {
      const err = validateFile(file);
      if (err) { setError(err); continue; }
      valid.push(file);
    }
    if (!valid.length) return;
    const b64s = await Promise.all(valid.map(fileToBase64));
    onChange([...value, ...b64s]);
  };

  const handleFile = (e) => {
    processFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggingOver(false);
    processFiles(e.dataTransfer.files);
  };

  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));

  // Drag to reorder
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

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((url, idx) => (
            <div
              key={idx}
              draggable
              onDragStart={() => onDragStart(idx)}
              onDragEnter={() => onDragEnterItem(idx)}
              onDragEnd={onDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`relative group w-24 h-24 flex-shrink-0 border cursor-grab transition-all ${
                dragIdx === idx ? "border-white/40 opacity-50 scale-95" : "border-white/[0.08] hover:border-white/20"
              }`}
            >
              <img src={url} alt="" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
                <GripVertical className="w-3.5 h-3.5 text-white/50" />
                <button
                  onClick={() => remove(idx)}
                  className="bg-red-500/20 hover:bg-red-500/50 border border-red-500/30 p-1.5 transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer border-2 border-dashed transition-all flex items-center justify-center gap-3 py-5 px-6 ${
          draggingOver ? "border-white/30 bg-white/[0.04]" : "border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]"
        }`}
      >
        <ImageIcon className="w-4 h-4 text-white/20" />
        <p className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/30">
          Drag & drop or click to add images
        </p>
        <label className="cursor-pointer flex items-center gap-1.5 border border-white/[0.12] hover:border-white/30 px-3 py-1.5 font-heading text-[9px] tracking-[0.15em] uppercase text-white/35 hover:text-white/60 transition-colors ml-2">
          <Upload className="w-3 h-3" />
          Choose Files
          <input ref={inputRef} type="file" accept={ACCEPTED} multiple className="hidden" onChange={handleFile} />
        </label>
      </div>

      {value.length > 1 && (
        <p className="text-white/18 text-[11px] mt-1.5">Drag thumbnails to reorder</p>
      )}
      {error && <p className="text-red-400/70 text-[11px] mt-1.5">{error}</p>}
    </div>
  );
}