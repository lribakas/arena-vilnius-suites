import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import SectionHeading from "@/components/ui/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { images } from "@/lib/images";

export default function UpcomingEvents() {
  const { data: allEvents = [] } = useQuery({
    queryKey: ["events-public"],
    queryFn: () => base44.entities.Event.filter({ status: "published" }, "display_order", 3),
  });
  const featured = allEvents.slice(0, 3);

  return (
    <section className="py-28" style={{ background: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeading
          label="Artimiausi renginiai"
          title="Mėgaukitės pramogomis arenoje"
          subtitle="Rinkitės tarp daugybės skirtingų sporto, koncertų ar kitų renginių."
        />

        <div className="divide-y divide-white/[0.05]">
          {featured.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/events"
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 py-6 hover:bg-white/[0.018] transition-all duration-500 px-5 -mx-5"
              >
                {/* Image */}
                <div className="relative w-full sm:w-36 h-24 flex-shrink-0 overflow-hidden">
                  <img
                    src={event.image || images.events[event.category] || images.hero}
                    alt={event.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-[#0d0d0d]/30" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-heading text-[9px] tracking-[0.3em] uppercase text-white/25 font-medium">{event.category}</span>
                    <span className="w-px h-3 bg-white/10" />
                    <span className="font-heading text-[9px] tracking-[0.2em] uppercase text-white/18">{(event.available_suites || []).length} suites</span>
                  </div>
                  <h3 className="font-heading font-semibold text-white text-[15px] tracking-tight truncate">{event.title}</h3>
                </div>

                {/* Date + arrow */}
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="flex items-center gap-2 text-white/25 text-xs font-light">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/15 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-10">
          <Link
            to="/events"
            className="inline-flex items-center gap-3 border border-white/10 text-white/40 font-heading text-[10px] tracking-[0.2em] uppercase px-8 py-3.5 hover:border-white/25 hover:text-white/70 transition-all duration-400"
          >
            Visi renginiai
            <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}