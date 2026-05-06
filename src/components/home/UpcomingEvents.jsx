import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import SectionHeading from "@/components/ui/SectionHeading";
import { events } from "@/lib/mockData";
import { images } from "@/lib/images";

export default function UpcomingEvents() {
  const featured = events.slice(0, 3);

  return (
    <section className="py-28 px-6" style={{ background: "hsl(0 0% 6%)" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Upcoming Events"
          title="What's Coming"
          subtitle="Discover the biggest events at Arena Vilnius and secure your premium hospitality experience."
        />

        <div className="space-y-px bg-white/5">
          {featured.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to="/events"
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 bg-card px-6 py-5 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="relative w-full sm:w-40 h-28 sm:h-20 flex-shrink-0 overflow-hidden">
                  <img
                    src={images.events[event.category]}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-y-0 left-0 w-0.5 bg-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <span className="text-primary text-[10px] font-heading font-semibold uppercase tracking-[0.25em]">
                      {event.category}
                    </span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="text-white/40 text-xs">{event.availableSuites.length} suites available</span>
                  </div>
                  <h3 className="font-heading font-bold text-white text-base truncate">{event.title}</h3>
                </div>

                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="flex items-center gap-2 text-white/40 text-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/events"
            className="inline-flex items-center gap-2 border border-white/10 text-white/60 text-sm font-heading font-semibold uppercase tracking-widest px-8 py-3 hover:border-white/30 hover:text-white transition-all duration-300"
          >
            Browse All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}