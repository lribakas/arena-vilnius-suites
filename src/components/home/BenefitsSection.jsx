import React from "react";
import { motion } from "framer-motion";
import { Car, UtensilsCrossed, UserCheck, Palette, Monitor, Package } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { benefits } from "@/lib/mockData";

const iconMap = {
  car: Car, utensils: UtensilsCrossed, concierge: UserCheck,
  palette: Palette, monitor: Monitor, package: Package,
};

export default function BenefitsSection() {
  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeading
          label="Premium Benefits"
          title="Why Choose Us"
          subtitle="Every detail is designed to exceed expectations and deliver an extraordinary experience."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.05]">
          {benefits.map((benefit, i) => {
            const Icon = iconMap[benefit.icon] || Package;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-[#0a0a0a] p-9 hover:bg-[#0f0f0f] transition-all duration-500"
              >
                <Icon className="w-4 h-4 text-white/20 mb-7 group-hover:text-white/50 transition-colors duration-400" />
                <h3 className="font-heading font-semibold text-white text-[15px] tracking-tight mb-3">{benefit.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed font-light">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}