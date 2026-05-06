import React from "react";
import { motion } from "framer-motion";
import { Car, UtensilsCrossed, UserCheck, Palette, Monitor, Package } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { benefits } from "@/lib/mockData";

const iconMap = {
  car: Car,
  utensils: UtensilsCrossed,
  concierge: UserCheck,
  palette: Palette,
  monitor: Monitor,
  package: Package,
};

export default function BenefitsSection() {
  return (
    <section className="py-28 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Premium Benefits"
          title="Why Choose Us"
          subtitle="Every detail is designed to exceed expectations and deliver an extraordinary experience."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {benefits.map((benefit, i) => {
            const Icon = iconMap[benefit.icon] || Package;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-card p-8 hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/40 transition-colors">
                  <Icon className="w-4 h-4 text-white/50 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-white text-base mb-3">{benefit.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}