import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/mockData";

export default function TestimonialsSection() {
  return (
    <section className="py-28 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          subtitle="Hear from business leaders who have experienced Arena Vilnius premium hospitality."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-card p-8 relative overflow-hidden group hover:bg-white/[0.04] transition-colors duration-500"
            >
              {/* Large quote mark */}
              <div className="font-heading font-bold text-[80px] leading-none text-white/[0.03] absolute top-4 right-6 select-none">
                "
              </div>
              {/* Red top border */}
              <div className="absolute top-0 left-0 w-8 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
              
              <p className="text-white/60 text-sm leading-relaxed mb-8 relative">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-white/60 font-heading font-bold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-heading font-semibold">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}