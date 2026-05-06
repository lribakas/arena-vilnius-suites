import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Calendar, Sparkles } from "lucide-react";

export default function CorporateSection() {
  return (
    <section className="py-24 px-6 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-4">
              Corporate Hospitality
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Elevate Your <span className="text-gradient-gold">Business Events</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              From client entertainment to product launches, our premium spaces and
              dedicated team create unforgettable corporate experiences that strengthen
              relationships and leave lasting impressions.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Building2, text: "Customizable suites for corporate branding" },
                { icon: Calendar, text: "Full-season and multi-event packages" },
                { icon: Sparkles, text: "Dedicated event coordinators" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground text-sm">{text}</span>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300"
            >
              Get Corporate Proposal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "50+", label: "Events Per Year" },
                { num: "6", label: "Premium Suites" },
                { num: "98%", label: "Client Satisfaction" },
                { num: "200+", label: "Corporate Partners" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-xl p-8 text-center"
                >
                  <p className="text-gradient-gold font-heading text-3xl md:text-4xl mb-2">{stat.num}</p>
                  <p className="text-muted-foreground text-xs uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}