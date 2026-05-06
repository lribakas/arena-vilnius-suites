import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ label, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`mb-14 ${center ? "text-center" : ""}`}
    >
      {/* Red line + label */}
      <div className={`flex items-center gap-3 mb-4 ${center ? "justify-center" : ""}`}>
        <div className="w-8 h-px bg-primary" />
        {label && (
          <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold font-heading">
            {label}
          </p>
        )}
        <div className="w-8 h-px bg-primary" />
      </div>

      <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-white/50 max-w-2xl text-base md:text-lg leading-relaxed ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}