import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Upload, Loader2 } from "lucide-react";

const EVENT_TYPES = ["concerts", "basketball", "shows", "corporate", "other"];

const FIELD = ({ label, children }) => (
  <div>
    <label className="font-heading text-[9px] tracking-[0.3em] uppercase text-white/28 mb-2 block font-medium">{label}</label>
    {children}
  </div>
);

const inputCls = "bg-[#0a0a0a] border-white/[0.08] text-white/80 placeholder:text-white/18 focus:border-white/25 focus:ring-0 rounded-none text-sm font-light h-10";

export default function SuiteForm({ suite, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "", tagline: "", description: "", image: "",
    capacity: "", capacity_num: "", price: "", price_num: "",
    event_types: [], features: [], included: [],
    catering: "", parking: "", entrance: "",
    cta_text: "Request Proposal", status: "draft", display_order: 0,
    ...suite,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [featInput, setFeatInput] = useState("");
  const [inclInput, setInclInput] = useState("");

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    set("image", file_url);
    setUploading(false);
  };

  const addTag = (field, input, setInput) => {
    const val = input.trim();
    if (val && !form[field].includes(val)) set(field, [...form[field], val]);
    setInput("");
  };
  const removeTag = (field, val) => set(field, form[field].filter(v => v !== val));
  const toggleEventType = (type) => {
    set("event_types", form.event_types.includes(type)
      ? form.event_types.filter(t => t !== type)
      : [...form.event_types, type]);
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
          <FIELD label="Suite Name *">
            <Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Presidential Suite" className={inputCls} />
          </FIELD>
          <FIELD label="Tagline">
            <Input value={form.tagline} onChange={e => set("tagline", e.target.value)} placeholder="The ultimate arena experience" className={inputCls} />
          </FIELD>
          <FIELD label="Capacity (label)">
            <Input value={form.capacity} onChange={e => set("capacity", e.target.value)} placeholder="20-30 guests" className={inputCls} />
          </FIELD>
          <FIELD label="Capacity (max number)">
            <Input type="number" value={form.capacity_num} onChange={e => set("capacity_num", e.target.value)} placeholder="30" className={inputCls} />
          </FIELD>
          <FIELD label="Price (label)">
            <Input value={form.price} onChange={e => set("price", e.target.value)} placeholder="From €5,000" className={inputCls} />
          </FIELD>
          <FIELD label="Price (number)">
            <Input type="number" value={form.price_num} onChange={e => set("price_num", e.target.value)} placeholder="5000" className={inputCls} />
          </FIELD>
          <FIELD label="CTA Text">
            <Input value={form.cta_text} onChange={e => set("cta_text", e.target.value)} placeholder="Request Proposal" className={inputCls} />
          </FIELD>
          <FIELD label="Display Order">
            <Input type="number" value={form.display_order} onChange={e => set("display_order", e.target.value)} placeholder="1" className={inputCls} />
          </FIELD>
        </div>

        <FIELD label="Description">
          <Textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Full suite description..." className="bg-[#0a0a0a] border-white/[0.08] text-white/80 placeholder:text-white/18 focus:border-white/25 focus:ring-0 rounded-none text-sm font-light min-h-[90px] resize-none" />
        </FIELD>

        <FIELD label="Catering Info">
          <Textarea value={form.catering} onChange={e => set("catering", e.target.value)} placeholder="Catering description..." className="bg-[#0a0a0a] border-white/[0.08] text-white/80 placeholder:text-white/18 focus:border-white/25 focus:ring-0 rounded-none text-sm font-light min-h-[60px] resize-none" />
        </FIELD>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FIELD label="Parking Info">
            <Input value={form.parking} onChange={e => set("parking", e.target.value)} placeholder="VIP parking — 6 spots" className={inputCls} />
          </FIELD>
          <FIELD label="Entrance Info">
            <Input value={form.entrance} onChange={e => set("entrance", e.target.value)} placeholder="Private entrance" className={inputCls} />
          </FIELD>
        </div>

        {/* Event Types */}
        <FIELD label="Event Types">
          <div className="flex flex-wrap gap-2 mt-1">
            {EVENT_TYPES.map(type => (
              <button key={type} onClick={() => toggleEventType(type)}
                className={`font-heading text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 border transition-all ${
                  form.event_types.includes(type)
                    ? "border-white/40 text-white/70 bg-white/[0.05]"
                    : "border-white/[0.08] text-white/25 hover:border-white/20 hover:text-white/50"
                }`}>{type}</button>
            ))}
          </div>
        </FIELD>

        {/* Features */}
        <FIELD label="Features & Amenities">
          <div className="flex gap-2 mb-2">
            <Input value={featInput} onChange={e => setFeatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTag("features", featInput, setFeatInput)}
              placeholder="Add feature and press Enter" className={`${inputCls} flex-1`} />
            <button onClick={() => addTag("features", featInput, setFeatInput)} className="border border-white/[0.08] px-3 text-white/30 hover:text-white/70 transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.features.map(f => (
              <span key={f} className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 text-white/50 text-xs">
                {f}
                <button onClick={() => removeTag("features", f)}><X className="w-3 h-3 hover:text-white/80" /></button>
              </span>
            ))}
          </div>
        </FIELD>

        {/* Included */}
        <FIELD label="What's Included">
          <div className="flex gap-2 mb-2">
            <Input value={inclInput} onChange={e => setInclInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTag("included", inclInput, setInclInput)}
              placeholder="Add item and press Enter" className={`${inputCls} flex-1`} />
            <button onClick={() => addTag("included", inclInput, setInclInput)} className="border border-white/[0.08] px-3 text-white/30 hover:text-white/70 transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.included.map(item => (
              <span key={item} className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 text-white/50 text-xs">
                {item}
                <button onClick={() => removeTag("included", item)}><X className="w-3 h-3 hover:text-white/80" /></button>
              </span>
            ))}
          </div>
        </FIELD>

        {/* Image */}
        <FIELD label="Main Image">
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
          <button onClick={handleSave} disabled={saving || !form.name}
            className="bg-white text-[#0a0a0a] font-heading text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-white/90 transition-colors disabled:opacity-40 flex items-center gap-2">
            {saving && <Loader2 className="w-3 h-3 animate-spin" />}
            Save Suite
          </button>
          <button onClick={onCancel} className="border border-white/[0.08] text-white/30 font-heading text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:text-white/60 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}