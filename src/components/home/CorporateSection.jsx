import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Calendar, Sparkles } from "lucide-react";

const stats = [
  { num: "50+", label: "Events Per Year" },
  { num: "6", label: "Premium Suites" },
  { num: "98%", label: "Client Satisfaction" },
  { num: "200+", label: "Corporate Partners" },
];

export default function CorporateSection() {
  return (
    <section className="py-28" style={{ background: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-heading text-[9px] tracking-[0.45em] uppercase text-white/28 mb-7 font-medium">
              Corporate Hospitality
            </p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-7">
              Elevate Your<br />Business Events
            </h2>
            <p className="text-white/40 text-[15px] leading-relaxed mb-10 font-light max-w-md">
              From client entertainment to product launches, our premium spaces
              create unforgettable corporate experiences that strengthen relationships.
            </p>

            <div className="space-y-5 mb-12">
              {[
                { icon: Building2, text: "Customizable suites for corporate branding" },
                { icon: Calendar, text: "Full-season and multi-event packages" },
                { icon: Sparkles, text: "Dedicated event coordinators" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <Icon className="w-4 h-4 text-white/20 flex-shrink-0" />
                  <span className="text-white/50 text-sm font-light">{text}</span>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-white text-[#0a0a0a] px-8 py-4 font-heading text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-300"
            >
              Get Corporate Proposal
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Right — stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-2 gap-[1px] bg-white/[0.05]">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#0d0d0d] p-10 flex flex-col justify-center items-center text-center">
                  <p className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight mb-2">{stat.num}</p>
                  <p className="font-heading text-[9px] tracking-[0.25em] uppercase text-white/28 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}