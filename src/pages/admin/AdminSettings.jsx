import React from "react";
import { Link } from "react-router-dom";
import { images } from "@/lib/images";

export default function AdminSettings() {
  return (
    <div>
      <div className="mb-8">
        <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-2">Admin</p>
        <h1 className="font-heading font-bold text-2xl text-white tracking-tight">Settings</h1>
      </div>

      <div className="max-w-xl space-y-[1px] bg-white/[0.04]">
        <div className="bg-[#0d0d0d] p-6">
          <p className="font-heading text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">Brand</p>
          <div className="flex items-center gap-4">
            <img src={images.logoWhite} alt="Arena Vilnius" className="h-8 w-auto opacity-60" />
            <div>
              <p className="text-white/60 text-sm">Arena Vilnius Suites</p>
              <p className="text-white/25 text-xs font-light">Premium Hospitality Platform</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0d0d0d] p-6">
          <p className="font-heading text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">Public Website</p>
          <Link to="/" target="_blank"
            className="inline-flex items-center gap-2 border border-white/[0.08] text-white/40 font-heading text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 hover:border-white/20 hover:text-white/70 transition-all">
            View Public Site →
          </Link>
        </div>

        <div className="bg-[#0d0d0d] p-6">
          <p className="font-heading text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">Data</p>
          <p className="text-white/30 text-sm font-light">
            Suites, events, and inquiries are stored in the Base44 database.
            All changes reflect immediately on the public website.
          </p>
        </div>
      </div>
    </div>
  );
}