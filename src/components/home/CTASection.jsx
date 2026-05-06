import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-4">
            Ready to Experience?
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6 leading-tight">
            Your Next Unforgettable <span className="text-gradient-gold">Experience</span> Awaits
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Contact our hospitality team to discuss your requirements and discover
            the perfect suite for your next event.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300"
            >
              Request Proposal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/suites"
              className="flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded-lg text-sm font-medium hover:bg-foreground/5 transition-all duration-300"
            >
              Explore All Suites
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}