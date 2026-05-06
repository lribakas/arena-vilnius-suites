import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { images } from "@/lib/images";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="Arena Vilnius Suites luxury VIP hospitality"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-primary text-xs md:text-sm uppercase tracking-[0.4em] font-medium mb-6">
            Premium Arena Hospitality
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6"
        >
          Premium Experiences at{" "}
          <span className="text-gradient-gold">Arena Vilnius</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-muted-foreground text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Luxury suites, private hospitality spaces, and unforgettable experiences
          for concerts, sports, and corporate events.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/suites"
            className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300"
          >
            Explore Suites
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded-lg text-sm font-medium tracking-wide hover:bg-foreground/5 transition-all duration-300"
          >
            Request Proposal
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}