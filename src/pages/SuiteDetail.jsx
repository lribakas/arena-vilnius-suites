import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Check, ArrowLeft, ArrowRight, Car, UtensilsCrossed, DoorOpen, Wifi } from "lucide-react";
import { suites } from "@/lib/mockData";
import { images } from "@/lib/images";

export default function SuiteDetail() {
  const { id } = useParams();
  const suite = suites.find((s) => s.id === id);

  if (!suite) {
    return (
      <div className="pt-32 pb-24 text-center px-6 bg-black">
        <h2 className="font-heading font-bold text-2xl text-white mb-4">Suite Not Found</h2>
        <Link to="/suites" className="text-primary hover:text-primary/80">Back to Suites</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 bg-black">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <img
          src={images.suites[suite.id]}
          alt={suite.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        {/* Red accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
          <Link
            to="/suites"
            className="inline-flex items-center gap-2 text-white/40 text-xs font-heading font-semibold uppercase tracking-widest hover:text-white transition-colors mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Suites
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary text-[10px] font-heading font-semibold uppercase tracking-[0.35em] mb-2">{suite.tagline}</p>
            <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight">{suite.name}</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-primary" />
                <h2 className="font-heading font-bold text-lg text-white uppercase tracking-widest">Overview</h2>
              </div>
              <p className="text-white/50 leading-relaxed">{suite.description}</p>
            </motion.div>

            {/* Quick highlights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5">
                {[
                  { icon: Users, label: "Capacity", value: suite.capacity },
                  { icon: Car, label: "VIP Parking", value: "Included" },
                  { icon: DoorOpen, label: "Entrance", value: "Private" },
                  { icon: Wifi, label: "WiFi", value: "Included" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-card p-6 text-center">
                    <Icon className="w-4 h-4 text-primary mx-auto mb-2" />
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-heading mb-1">{label}</p>
                    <p className="text-white text-sm font-heading font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-primary" />
                <h2 className="font-heading font-bold text-lg text-white uppercase tracking-widest">Features & Amenities</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
                {suite.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 bg-card px-5 py-4">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-white/60 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-primary" />
                <h2 className="font-heading font-bold text-lg text-white uppercase tracking-widest">What's Included</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suite.included.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary flex-shrink-0" />
                    <span className="text-white/50 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Catering */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-primary" />
                <h2 className="font-heading font-bold text-lg text-white uppercase tracking-widest">Catering</h2>
              </div>
              <div className="bg-card border-l-2 border-primary px-6 py-5 flex items-start gap-4">
                <UtensilsCrossed className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-white/50 text-sm leading-relaxed">{suite.catering}</p>
              </div>
            </motion.div>
          </div>

          {/* Sticky Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:sticky lg:top-28"
            >
              <div className="bg-card border border-white/8">
                {/* Top accent */}
                <div className="h-0.5 bg-primary w-full" />
                <div className="p-8">
                  <p className="text-primary text-[10px] font-heading font-semibold uppercase tracking-[0.3em] mb-1">{suite.tagline}</p>
                  <h3 className="font-heading font-bold text-2xl text-white mb-2">{suite.name}</h3>
                  <p className="font-heading font-bold text-3xl text-primary mb-8">{suite.price}</p>

                  <div className="space-y-4 mb-8 border-y border-white/5 py-6">
                    {[
                      { label: "Capacity", value: suite.capacity },
                      { label: "Catering", value: "Included" },
                      { label: "Parking", value: "VIP Included" },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between text-sm">
                        <span className="text-white/40">{item.label}</span>
                        <span className="text-white font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="group flex items-center justify-center gap-3 w-full bg-primary text-white py-4 text-sm font-heading font-semibold tracking-widest uppercase hover:bg-primary/90 transition-all duration-300"
                  >
                    Request Proposal
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <p className="text-[11px] text-white/30 text-center mt-4">
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