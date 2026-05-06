import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[720px] flex items-end overflow-hidden bg-[#0a0a0a]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="Arena Vilnius"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Layered overlays for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 via-transparent to-[#0a0a0a]/20" />
        {/* Very subtle vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(10,10,10,0.5) 100%)" }} />
      </div>

      {/* Hero content — centered, dominant logo */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8 text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-[9px] tracking-[0.55em] uppercase text-white/30 mb-10 font-medium"
        >
          Premium Hospitality
        </motion.p>

        {/* Dominant logo — fills viewport width on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[min(90vw,1100px)]"
        >
          <img
            src={images.logoWhite}
            alt="Arena Vilnius"
            className="w-full h-auto"
            style={{ filter: "drop-shadow(0 0 60px rgba(255,255,255,0.06))" }}
          />
        </motion.div>

        {/* Suites label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-[9px] tracking-[0.5em] uppercase text-white/22 mt-6 font-light"
        >
          Suites & VIP Experiences
        </motion.p>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/40 text-sm leading-relaxed max-w-sm mt-8 mb-10 font-light"
        >
          Private suites, premium seating, and world-class hospitality
          for concerts, sports, and corporate events.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/suites"
            className="group inline-flex items-center gap-3 bg-white text-[#0a0a0a] px-8 py-4 font-heading text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-300"
          >
            Explore Suites
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-white/15 text-white/55 px-8 py-4 font-heading text-xs font-medium tracking-[0.2em] uppercase hover:border-white/35 hover:text-white/85 transition-all duration-300"
          >
            Request Proposal
          </Link>
        </motion.div>
      </div>
    </section>
  );
}