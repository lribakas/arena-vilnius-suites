import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

export default function CTASection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ background: "hsl(0 0% 6%)" }}>
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0">
        <img src={images.hero} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>
      {/* Red glow */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-primary text-xs font-heading font-semibold uppercase tracking-[0.3em]">
              Ready to Experience?
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>

          <h2 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
            Your Next Unforgettable<br />
            <span className="text-gradient-red">Experience Awaits</span>
          </h2>

          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Contact our hospitality team to discover the perfect suite for your next event.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group flex items-center gap-3 bg-primary text-white px-10 py-4 text-sm font-heading font-semibold tracking-widest uppercase hover:bg-primary/90 transition-all duration-300"
              style={{ clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
            >
              Request Proposal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/suites"
              className="flex items-center gap-2 border border-white/15 text-white/60 px-10 py-4 text-sm font-heading font-semibold tracking-widest uppercase hover:border-white/30 hover:text-white transition-all duration-300"
            >
              Explore Suites
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}