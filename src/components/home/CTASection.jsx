import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

export default function CTASection() {
  return (
    <section className="relative py-36 overflow-hidden" style={{ background: "#0d0d0d" }}>
      {/* Ambient background */}
      <div className="absolute inset-0">
        <img src={images.hero} alt="" className="w-full h-full object-cover opacity-[0.08]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-[#0d0d0d]" />
      </div>

      {/* Horizontal rules */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="relative max-w-3xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-heading text-[9px] tracking-[0.5em] uppercase text-white/25 mb-8 font-medium">
            Ready to Experience?
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight leading-[1.05] mb-6">
            Your Next Unforgettable<br />Experience Awaits
          </h2>
          <p className="text-white/38 text-[15px] max-w-sm mx-auto mb-12 font-light leading-relaxed">
            Contact our hospitality team to discover the perfect suite for your next event.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-white text-[#0a0a0a] px-10 py-4 font-heading text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-300"
            >
              Request Proposal
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/suites"
              className="inline-flex items-center gap-3 border border-white/12 text-white/40 px-10 py-4 font-heading text-xs font-medium tracking-[0.2em] uppercase hover:border-white/28 hover:text-white/70 transition-all duration-400"
            >
              Explore Suites
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}