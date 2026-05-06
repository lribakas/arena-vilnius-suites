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
    <section className="py-24 px-6 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Upcoming Events"
          title="What's Coming"
          subtitle="Discover the biggest events at Arena Vilnius and secure your premium experience."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link
                to="/events"
                className="group block glass-card glass-card-hover rounded-xl overflow-hidden transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={images.events[event.category]}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/20 text-primary text-xs px-3 py-1 rounded-full capitalize backdrop-blur-sm border border-primary/20">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg text-foreground mb-3 line-clamp-2">{event.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(event.date), "MMM d, yyyy")} · {event.time}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {event.availableSuites.length} suites available
                  </div>
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
            className="inline-flex items-center gap-2 text-primary text-sm tracking-wide hover:gap-3 transition-all duration-300"
          >
            Browse All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}