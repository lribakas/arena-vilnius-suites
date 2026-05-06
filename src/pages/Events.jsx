import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import SectionHeading from "@/components/ui/SectionHeading";
import { events } from "@/lib/mockData";
import { images } from "@/lib/images";

const categories = ["all", "basketball", "concerts", "shows", "corporate"];

export default function Events() {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    if (category === "all") return events;
    return events.filter((e) => e.category === category);
  }, [category]);

  return (
    <div className="pt-28 pb-24 bg-black">
      {/* Page header */}
      <div className="border-b border-white/5 pb-16 mb-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Upcoming Events"
            title="What's Happening"
            subtitle="Secure your premium experience for the most exciting events at Arena Vilnius."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Category filter — custom tabs */}
        <div className="flex flex-wrap gap-1 mb-12 border-b border-white/5 pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`relative px-5 py-3 text-xs font-heading font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                category === cat
                  ? "text-white"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              {cat === "all" ? "All Events" : cat}
              {category === cat && (
                <motion.div
                  layoutId="activeEventTab"
                  className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to="/contact"
                className="group flex flex-col sm:flex-row bg-card hover:bg-white/[0.04] transition-all duration-400 overflow-hidden"
              >
                <div className="relative w-full sm:w-52 h-44 sm:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src={images.events[event.category]}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-y-0 left-0 w-0.5 bg-primary" />
                  <div className="absolute top-3 left-4">
                    <span className="bg-black/80 text-primary text-[10px] px-2.5 py-1 font-heading font-semibold uppercase tracking-wider backdrop-blur-sm">
                      {event.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading font-bold text-white text-base mb-3 leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-white/40 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-white/40">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                    <span className="text-white/30 text-xs font-heading">{event.availableSuites.length} suites available</span>
                    <div className="flex items-center gap-1.5 text-primary text-xs font-heading font-semibold uppercase tracking-widest group-hover:gap-2.5 transition-all duration-300">
                      Book Suite
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}