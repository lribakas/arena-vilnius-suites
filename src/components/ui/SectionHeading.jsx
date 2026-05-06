import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ label, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`mb-12 ${center ? "text-center" : ""}`}
    >
      {label && (
        <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-3">
          {label}
        </p>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}