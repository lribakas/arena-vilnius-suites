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
    <section className="py-28 px-6" style={{ background: "hsl(0 0% 6%)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <p className="text-primary text-xs font-heading font-semibold uppercase tracking-[0.3em]">
                Corporate Hospitality
              </p>
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-6 leading-tight tracking-tight">
              Elevate Your<br />Business Events
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              From client entertainment to product launches, our premium spaces and
              dedicated team create unforgettable corporate experiences that strengthen
              relationships and leave lasting impressions.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Building2, text: "Customizable suites for corporate branding" },
                { icon: Calendar, text: "Full-season and multi-event packages" },
                { icon: Sparkles, text: "Dedicated event coordinators" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-8 h-8 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-white/70 text-sm">{text}</span>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-primary text-white px-8 py-4 text-sm font-heading font-semibold tracking-widest uppercase hover:bg-primary/90 transition-all duration-300"
              style={{ clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
            >
              Get Corporate Proposal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-px bg-white/5">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card p-10 text-center">
                  <p className="font-heading font-bold text-4xl md:text-5xl text-white mb-2">{stat.num}</p>
                  <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-heading">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}