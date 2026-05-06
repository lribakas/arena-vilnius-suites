import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Check, ArrowLeft, ArrowRight, Car, UtensilsCrossed, DoorOpen, Wifi } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { images } from "@/lib/images";

export default function SuiteDetail() {
  const { id } = useParams();
  const { data: suites = [], isLoading } = useQuery({
    queryKey: ["suites-public"],
    queryFn: () => base44.entities.Suite.filter({ status: "published" }),
  });
  const suite = suites.find((s) => s.id === id);

  if (isLoading) {
    return <div className="pt-32 pb-24 text-center px-6 bg-[#0a0a0a]"><div className="w-5 h-5 border border-white/10 border-t-white/40 rounded-full animate-spin mx-auto" /></div>;
  }

  if (!suite) {
    return (
      <div className="pt-32 pb-24 text-center px-6 bg-[#0a0a0a]">
        <h2 className="font-heading font-bold text-2xl text-white mb-4">Suite Not Found</h2>
        <Link to="/suites" className="text-white/50 hover:text-white text-sm">← Back to Suites</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-16 pb-28">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[420px] overflow-hidden">
        <img src={suite.image || images.suites[suite.id] || images.hero} alt={suite.name} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />

        <div className="absolute bottom-0 left-0 right-0 pb-10 max-w-7xl mx-auto px-8">
          <Link to="/suites" className="inline-flex items-center gap-2 font-heading text-[10px] tracking-[0.25em] uppercase text-white/28 hover:text-white/60 transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}>
            <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-2">{suite.tagline}</p>
            <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight">{suite.name}</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-14">
            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7, ease: [0.16,1,0.3,1] }}>
              <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-5">Overview</p>
              <p className="text-white/50 leading-relaxed font-light text-[15px]">{suite.description}</p>
            </motion.div>

            {/* Quick stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: [0.16,1,0.3,1] }}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-white/[0.05]">
                {[
                  { icon: Users, label: "Capacity", value: suite.capacity || "—" },
                  { icon: Car, label: "Parking", value: suite.parking || "VIP" },
                  { icon: DoorOpen, label: "Entrance", value: suite.entrance || "Private" },
                  { icon: Wifi, label: "WiFi", value: "Included" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-[#0a0a0a] p-6 text-center">
                    <Icon className="w-4 h-4 text-white/18 mx-auto mb-3" />
                    <p className="font-heading text-[9px] tracking-[0.25em] uppercase text-white/25 mb-1">{label}</p>
                    <p className="font-heading font-semibold text-white text-sm tracking-tight">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7, ease: [0.16,1,0.3,1] }}>
              <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-6">Features & Amenities</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-white/[0.04]">
                {(suite.features || []).map((f) => (
                  <div key={f} className="flex items-center gap-3 bg-[#0a0a0a] px-5 py-4">
                    <Check className="w-3 h-3 text-white/25 flex-shrink-0" />
                    <span className="text-white/50 text-sm font-light">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Included */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.16,1,0.3,1] }}>
              <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-6">What's Included</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(suite.included || []).map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-white/25 flex-shrink-0" />
                    <span className="text-white/45 text-sm font-light">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Catering */}
            {suite.catering && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7, ease: [0.16,1,0.3,1] }}>
                <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-5">Catering</p>
                <div className="border-l-2 border-white/10 pl-6 py-1">
                  <div className="flex items-start gap-3">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-white/20 mt-0.5 flex-shrink-0" />
                    <p className="text-white/45 text-sm font-light leading-relaxed">{suite.catering}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Gallery */}
            {(suite.gallery || []).length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7, ease: [0.16,1,0.3,1] }}>
                <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-6">Gallery</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-[1px] bg-white/[0.04]">
                  {suite.gallery.map((url, i) => (
                    <div key={i} className="aspect-video overflow-hidden">
                      <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover opacity-70 hover:opacity-90 hover:scale-[1.03] transition-all duration-500" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Floor Plan */}
            {suite.floor_plan && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7, ease: [0.16,1,0.3,1] }}>
                <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-6">Floor Plan</p>
                <img src={suite.floor_plan} alt="Floor plan" className="w-full opacity-70 border border-white/[0.06]" />
              </motion.div>
            )}
          </div>

          {/* Booking card */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: [0.16,1,0.3,1] }} className="lg:sticky lg:top-24">
              <div className="bg-[#0d0d0d] border border-white/[0.07]">
                <div className="h-px bg-white/10 w-full" />
                <div className="p-8">
                  <p className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/25 mb-1">{suite.tagline}</p>
                  <h3 className="font-heading font-bold text-xl text-white tracking-tight mb-2">{suite.name}</h3>
                  <p className="font-heading font-bold text-3xl text-white mb-8">{suite.price}</p>

                  <div className="space-y-4 mb-8 border-y border-white/[0.06] py-6">
                    {[
                      { label: "Capacity", value: suite.capacity || "—" },
                      { label: "Catering", value: suite.catering ? "Included" : "Available" },
                      { label: "Parking", value: suite.parking || "VIP Included" },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between text-sm">
                        <span className="text-white/28 font-light">{item.label}</span>
                        <span className="text-white/70 font-medium text-xs font-heading">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="group flex items-center justify-center gap-3 w-full bg-white text-[#0a0a0a] py-4 font-heading text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-300"
                  >
                    {suite.cta_text || "Request Proposal"}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>

                  <p className="font-heading text-[9px] tracking-[0.15em] uppercase text-white/20 text-center mt-5">
                    Response within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}