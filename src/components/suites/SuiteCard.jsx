import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, ArrowRight, Check } from "lucide-react";
import { images } from "@/lib/images";

export default function SuiteCard({ suite, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/suites/${suite.id}`}
        className="group block glass-card glass-card-hover rounded-xl overflow-hidden transition-all duration-500"
      >
        <div className="relative h-56 overflow-hidden">
          <img
            src={images.suites[suite.id]}
            alt={suite.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="bg-primary/90 text-primary-foreground text-xs px-3 py-1.5 rounded-lg font-medium">
              {suite.price}
            </span>
          </div>
        </div>
        <div className="p-6">
          <p className="text-primary text-xs uppercase tracking-widest mb-1">{suite.tagline}</p>
          <h3 className="font-heading text-xl text-foreground mb-3">{suite.name}</h3>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
            <Users className="w-4 h-4" />
            <span>{suite.capacity}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {suite.features.slice(0, 3).map((f) => (
              <span
                key={f}
                className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-md"
              >
                <Check className="w-3 h-3 text-primary" />
                {f}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}