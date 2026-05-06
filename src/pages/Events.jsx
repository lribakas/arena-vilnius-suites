import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import SectionHeading from "@/components/ui/SectionHeading";
import { events, suites } from "@/lib/mockData";
import { images } from "@/lib/images";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Events() {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    if (category === "all") return events;
    return events.filter((e) => e.category === category);
  }, [category]);

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Upcoming Events"
          title="What's Happening"
          subtitle="Secure your premium experience for the most exciting events at Arena Vilnius."
        />

        <div className="flex justify-center mb-10">
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="basketball">Basketball</TabsTrigger>
              <TabsTrigger value="concerts">Concerts</TabsTrigger>
              <TabsTrigger value="shows">Shows</TabsTrigger>
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass-card glass-card-hover rounded-xl overflow-hidden transition-all duration-500"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src={images.events[event.category]}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/90 text-primary-foreground text-xs px-3 py-1 rounded-lg capitalize">
                      {event.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-3">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {event.availableSuites.length} suites available
                    </p>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-4 group-hover:gap-3 transition-all"
                  >
                    Book for This Event
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}