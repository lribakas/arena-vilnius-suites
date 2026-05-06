import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, ArrowRight, Check } from "lucide-react";
import { images } from "@/lib/images";

export default function SuiteCard({ suite, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/suites/${suite.id}`}
        className="group block bg-card overflow-hidden hover:bg-white/[0.04] transition-all duration-500 relative"
      >
        <div className="relative h-56 overflow-hidden">
          <img
            src={images.suites[suite.id]}
            alt={suite.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="bg-primary text-white text-xs px-3 py-1.5 font-heading font-semibold">
              {suite.price}
            </span>
          </div>
          {/* Hover red line */}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
        </div>
        <div className="p-6">
          <p className="text-primary text-[10px] font-heading font-semibold uppercase tracking-[0.3em] mb-1.5">{suite.tagline}</p>
          <h3 className="font-heading font-bold text-xl text-white mb-3">{suite.name}</h3>
          <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
            <Users className="w-4 h-4" />
            <span>{suite.capacity}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {suite.features.slice(0, 3).map((f) => (
              <span
                key={f}
                className="flex items-center gap-1.5 text-xs text-white/40 border border-white/8 px-2.5 py-1"
              >
                <Check className="w-2.5 h-2.5 text-primary flex-shrink-0" />
                {f}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs font-heading font-semibold uppercase tracking-widest group-hover:text-white group-hover:gap-3 transition-all duration-300">
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}