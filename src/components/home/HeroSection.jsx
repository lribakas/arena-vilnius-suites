import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { images } from "@/lib/images";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="Arena Vilnius VIP Suites"
          className="w-full h-full object-cover"
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
        {/* Subtle red glow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-10 h-px bg-primary" />
          <span className="text-primary text-xs font-heading font-semibold uppercase tracking-[0.4em]">
            Premium Hospitality
          </span>
          <div className="w-10 h-px bg-primary" />
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center leading-none mb-6">
            <span className="font-heading text-[11px] md:text-xs tracking-[0.5em] text-white/50 uppercase font-medium mb-1">Arena</span>
            <h1 className="font-heading font-bold text-6xl md:text-8xl lg:text-[10rem] text-white tracking-tight leading-none">
              VILNIUS
            </h1>
            <span className="font-heading text-xs md:text-sm tracking-[0.5em] text-primary uppercase font-semibold mt-3">
              Suites & VIP Experiences
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Private suites, premium seating, and world-class hospitality
          for concerts, sports events, and corporate experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/suites"
            className="group flex items-center gap-3 bg-primary text-white px-8 py-4 text-sm font-heading font-semibold tracking-widest uppercase hover:bg-primary/90 transition-all duration-300"
            style={{ clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
          >
            Explore Suites
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-2 border border-white/20 text-white/80 px-8 py-4 text-sm font-heading font-semibold tracking-widest uppercase hover:border-white/40 hover:text-white transition-all duration-300"
          >
            Request Proposal
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}