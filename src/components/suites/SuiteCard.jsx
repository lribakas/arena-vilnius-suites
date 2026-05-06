import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
const fallbackImg = images.suites.presidential;

export default function SuiteCard({ suite, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/suites/${suite.id}`} className="group block bg-[#0a0a0a] overflow-hidden">
        <div className="relative h-52 overflow-hidden">
          <img
            src={suite.image || fallbackImg}
            alt={suite.name}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="font-heading text-[10px] tracking-[0.15em] bg-[#0a0a0a]/80 text-white/60 px-3 py-1.5 border border-white/8 backdrop-blur-sm">
              {suite.price}
            </span>
          </div>
          {/* Reveal line */}
          <div className="absolute bottom-0 left-0 h-px w-0 bg-white/40 group-hover:w-full transition-all duration-500 ease-out" />
        </div>
        <div className="p-6 border-t border-white/[0.05] group-hover:border-white/[0.09] transition-colors duration-300">
          <p className="font-heading text-[9px] tracking-[0.3em] uppercase text-white/25 mb-2 font-medium">{suite.tagline}</p>
          <h3 className="font-heading font-bold text-[17px] text-white tracking-tight mb-4">{suite.name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/28 text-xs font-light">
              <Users className="w-3.5 h-3.5" />
              <span>{suite.capacity}</span>
              {suite.price && <span className="ml-2 text-white/20">· {suite.price}</span>}
            </div>
            <div className="flex items-center gap-1.5 font-heading text-[10px] tracking-[0.15em] uppercase text-white/25 group-hover:text-white/60 group-hover:gap-2.5 transition-all duration-300">
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}