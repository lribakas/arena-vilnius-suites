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
      <div className="pt-32 pb-24 text-center px-6">
        <h2 className="font-heading text-2xl text-foreground mb-4">Suite Not Found</h2>
        <Link to="/suites" className="text-primary">Back to Suites</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={images.suites[suite.id]}
          alt={suite.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
          <Link
            to="/suites"
            className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Suites
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs uppercase tracking-[0.3em] mb-2">{suite.tagline}</p>
            <h1 className="font-heading text-3xl md:text-5xl text-foreground">{suite.name}</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-heading text-2xl text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{suite.description}</p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-heading text-2xl text-foreground mb-6">Features & Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suite.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 glass-card rounded-lg px-4 py-3">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground/80 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-heading text-2xl text-foreground mb-6">What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suite.included.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Catering */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="font-heading text-2xl text-foreground mb-4">Catering</h2>
              <div className="glass-card rounded-xl p-6 flex items-start gap-4">
                <UtensilsCrossed className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground text-sm leading-relaxed">{suite.catering}</p>
              </div>
            </motion.div>

            {/* Quick Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Users, label: "Capacity", value: suite.capacity },
                  { icon: Car, label: "VIP Parking", value: "Included" },
                  { icon: DoorOpen, label: "Private Entrance", value: "Yes" },
                  { icon: Wifi, label: "High-Speed WiFi", value: "Included" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="glass-card rounded-xl p-5 text-center">
                    <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{label}</p>
                    <p className="text-foreground text-sm font-medium">{value}</p>
                  </div>
                ))}
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
              <div className="glass-card rounded-xl p-8 border border-primary/10">
                <h3 className="font-heading text-xl text-foreground mb-2">{suite.name}</h3>
                <p className="text-gradient-gold text-2xl font-heading mb-6">{suite.price}</p>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="text-foreground">{suite.capacity}</span>
                  </div>
                  <div className="border-b border-border" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Event Types</span>
                    <span className="text-foreground capitalize">{suite.eventTypes.join(", ")}</span>
                  </div>
                  <div className="border-b border-border" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Catering</span>
                    <span className="text-foreground">Included</span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="group flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300"
                >
                  Request Proposal
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Our team will respond within 24 hours
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}