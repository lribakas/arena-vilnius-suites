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

      {/* Bottom content — architectural layout */}
      <div className="relative z-10 w-full pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[9px] tracking-[0.5em] uppercase text-white/35 mb-8 font-medium"
            >
              Premium Hospitality — Vilnius Arena
            </motion.p>

            {/* Official logo + Suites label */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={images.logoWhite}
                alt="Arena Vilnius"
                className="h-20 md:h-28 lg:h-36 w-auto mb-4"
              />
              <p className="font-heading text-[9px] tracking-[0.45em] text-white/25 uppercase mt-2 font-light">
                Suites & VIP Experiences
              </p>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/45 text-[15px] md:text-base leading-relaxed max-w-lg mt-8 mb-10 font-light"
            >
              Private suites, premium seating, and world-class hospitality
              for concerts, sports, and corporate events.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                to="/suites"
                className="group inline-flex items-center gap-3 bg-white text-[#0a0a0a] px-8 py-4 font-heading text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-400"
              >
                Explore Suites
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-white/15 text-white/60 px-8 py-4 font-heading text-xs font-medium tracking-[0.2em] uppercase hover:border-white/35 hover:text-white/90 transition-all duration-400"
              >
                Request Proposal
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}