import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/mockData";

export default function TestimonialsSection() {
  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          subtitle="Hear from business leaders who have experienced Arena Vilnius premium hospitality."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/[0.05]">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[#0a0a0a] p-9 hover:bg-[#0f0f0f] transition-colors duration-500 relative overflow-hidden"
            >
              {/* Large ambient quote */}
              <div className="absolute top-6 right-7 font-heading font-bold text-[64px] leading-none text-white/[0.03] select-none">"</div>

              <p className="text-white/45 text-sm leading-relaxed mb-8 font-light relative">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading font-bold text-xs text-white/35">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-white text-sm tracking-tight">{t.name}</p>
                  <p className="text-white/30 text-xs font-light mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}