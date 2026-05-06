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
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Premium Benefits"
          title="Why Choose Us"
          subtitle="Every detail is designed to exceed expectations and deliver an extraordinary experience."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = iconMap[benefit.icon] || Package;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-xl p-8 hover:border-primary/20 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}