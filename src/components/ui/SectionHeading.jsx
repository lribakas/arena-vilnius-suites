import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ label, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 ${center ? "text-center" : ""}`}
    >
      {label && (
        <p className={`font-heading text-[9px] tracking-[0.45em] uppercase text-white/30 font-medium mb-5 ${center ? "" : ""}`}>
          {label}
        </p>
      )}
      <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-white tracking-tight leading-[1.1] mb-5">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-white/40 max-w-xl text-[15px] leading-relaxed font-light ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}