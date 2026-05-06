import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Loader2 } from "lucide-react";

const CATEGORIES = ["basketball", "concerts", "shows", "corporate", "other"];

const FIELD = ({ label, children }) => (
  <div>
    <label className="font-heading text-[9px] tracking-[0.3em] uppercase text-white/28 mb-2 block font-medium">{label}</label>
    {children}
  </div>
);

const inputCls = "bg-[#0a0a0a] border-white/[0.08] text-white/80 placeholder:text-white/18 focus:border-white/25 focus:ring-0 rounded-none text-sm font-light h-10";

export default function EventForm({ event, suites = [], onSave, onCancel }) {
  const [form, setForm] = useState({
    title: "", subheadline: "", description: "", image: "",
    date: "", time: "", category: "other",
    available_suites: [], price: "", cta_text: "Book Suite",
    status: "draft", display_order: 0,
    ...event,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    set("image", file_url);
    setUploading(false);
  };

  const toggleSuite = (id) => {
    set("available_suites", form.available_suites.includes(id)
      ? form.available_suites.filter(s => s !== id)
      : [...form.available_suites, id]);
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="bg-[#0d0d0d] border border-white/[0.07]">
      <div className="h-px bg-white/10" />
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FIELD label="Event Title *">
            <Input value={form.title} onChange={e => set("title", e.target.value)} placeholder="Ed Sheeran — Mathematics Tour" className={inputCls} />
          </FIELD>
          <FIELD label="Subheadline">
            <Input value={form.subheadline} onChange={e => set("subheadline", e.target.value)} placeholder="World Tour 2026" className={inputCls} />
          </FIELD>
          <FIELD label="Date">
            <Input type="date" value={form.date} onChange={e => set("date", e.target.value)} className={inputCls} />
          </FIELD>
          <FIELD label="Time">
            <Input type="time" value={form.time} onChange={e => set("time", e.target.value)} className={inputCls} />
          </FIELD>
          <FIELD label="Category">
            <Select value={form.category} onValueChange={v => set("category", v)}>
              <SelectTrigger className={`${inputCls} w-full`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0d0d0d] border-white/[0.08] rounded-none">
                {CATEGORIES.map(c => (
                  <SelectItem key={c} value={c} className="text-white/50 text-xs focus:bg-white/5 focus:text-white rounded-none capitalize">{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FIELD>
          <FIELD label="Starting Price">
            <Input value={form.price} onChange={e => set("price", e.target.value)} placeholder="From €2,000" className={inputCls} />
          </FIELD>
          <FIELD label="CTA Text">
            <Input value={form.cta_text} onChange={e => set("cta_text", e.target.value)} placeholder="Book Suite" className={inputCls} />
          </FIELD>
          <FIELD label="Display Order">
            <Input type="number" value={form.display_order} onChange={e => set("display_order", e.target.value)} placeholder="1" className={inputCls} />
          </FIELD>
        </div>

        <FIELD label="Description">
          <Textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Event description..." className="bg-[#0a0a0a] border-white/[0.08] text-white/80 placeholder:text-white/18 focus:border-white/25 focus:ring-0 rounded-none text-sm font-light min-h-[80px] resize-none" />
        </FIELD>

        {/* Available Suites */}
        {suites.length > 0 && (
          <FIELD label="Available Suites">
            <div className="flex flex-wrap gap-2 mt-1">
              {suites.map(suite => (
                <button key={suite.id} onClick={() => toggleSuite(suite.id)}
                  className={`font-heading text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 border transition-all ${
                    form.available_suites.includes(suite.id)
                      ? "border-white/40 text-white/70 bg-white/[0.05]"
                      : "border-white/[0.08] text-white/25 hover:border-white/20 hover:text-white/50"
                  }`}>{suite.name}</button>
              ))}
            </div>
          </FIELD>
        )}

        {/* Image */}
        <FIELD label="Event Image">
          <div className="flex gap-3 items-start">
            <div className="flex-1">
              <Input value={form.image} onChange={e => set("image", e.target.value)} placeholder="Image URL or upload below" className={inputCls} />
            </div>
            <label className="cursor-pointer border border-white/[0.08] px-3 py-2 text-white/30 hover:text-white/70 transition-colors flex items-center gap-2">
              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span className="font-heading text-[9px] tracking-[0.15em] uppercase">Upload</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          {form.image && (
            <img src={form.image} alt="" className="mt-3 h-24 w-auto object-cover opacity-70 border border-white/[0.06]" />
          )}
        </FIELD>

        {/* Status */}
        <FIELD label="Status">
          <Select value={form.status} onValueChange={v => set("status", v)}>
            <SelectTrigger className={`${inputCls} w-40`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0d0d0d] border-white/[0.08] rounded-none">
              <SelectItem value="published" className="text-white/50 text-xs focus:bg-white/5 focus:text-white rounded-none">Published</SelectItem>
              <SelectItem value="draft" className="text-white/50 text-xs focus:bg-white/5 focus:text-white rounded-none">Draft</SelectItem>
            </SelectContent>
          </Select>
        </FIELD>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
          <button onClick={handleSave} disabled={saving || !form.title}
            className="bg-white text-[#0a0a0a] font-heading text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-white/90 transition-colors disabled:opacity-40 flex items-center gap-2">
            {saving && <Loader2 className="w-3 h-3 animate-spin" />}
            Save Event
          </button>
          <button onClick={onCancel} className="border border-white/[0.08] text-white/30 font-heading text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:text-white/60 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}