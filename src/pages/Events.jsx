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
  const filtered = useMemo(() => category === "all" ? events : events.filter(e => e.category === category), [category]);

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-28">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-16 border-b border-white/[0.05] mb-16">
        <SectionHeading
          label="Upcoming Events"
          title="What's Happening"
          subtitle="Secure your premium experience for the most exciting events at Arena Vilnius."
        />
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Category tabs */}
        <div className="flex flex-wrap border-b border-white/[0.06] mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`relative px-5 py-3 font-heading text-[10px] tracking-[0.25em] uppercase transition-all duration-300 ${
                category === cat ? "text-white" : "text-white/25 hover:text-white/55"
              }`}
            >
              {cat === "all" ? "All" : cat}
              {category === cat && (
                <motion.div layoutId="evTab" className="absolute bottom-0 left-0 right-0 h-px bg-white/60" />
              )}
            </button>
          ))}
        </div>

        {/* Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/[0.05]">
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/contact" className="group flex flex-col sm:flex-row bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-all duration-500 overflow-hidden">
                <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src={images.events[event.category]}
                    alt={event.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/30 sm:bg-gradient-to-r sm:from-transparent sm:to-[#0a0a0a]" />
                  <div className="absolute top-3 left-3">
                    <span className="font-heading text-[9px] tracking-[0.25em] uppercase bg-[#0a0a0a]/75 text-white/40 px-2.5 py-1 backdrop-blur-sm border border-white/[0.06]">
                      {event.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 flex-1">
                  <div>
                    <h3 className="font-heading font-semibold text-white text-[15px] tracking-tight leading-snug mb-3">{event.title}</h3>
                    <p className="text-white/35 text-sm font-light line-clamp-2 leading-relaxed mb-4">{event.description}</p>
                    <div className="flex gap-5 text-xs text-white/28 font-light">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.05]">
                    <span className="font-heading text-[9px] tracking-[0.2em] uppercase text-white/20">{event.availableSuites.length} suites available</span>
                    <div className="flex items-center gap-1.5 font-heading text-[10px] tracking-[0.18em] uppercase text-white/25 group-hover:text-white/60 group-hover:gap-2.5 transition-all duration-300">
                      Book Suite
                      <ArrowRight className="w-3 h-3" />
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