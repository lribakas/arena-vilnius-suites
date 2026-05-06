import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SuiteCard from "@/components/suites/SuiteCard";
import { suites } from "@/lib/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function Suites() {
  const [capacityFilter, setCapacityFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const filtered = useMemo(() => {
    return suites.filter((s) => {
      if (capacityFilter !== "all") {
        if (capacityFilter === "small" && s.capacityNum > 10) return false;
        if (capacityFilter === "medium" && (s.capacityNum <= 10 || s.capacityNum > 20)) return false;
        if (capacityFilter === "large" && s.capacityNum <= 20) return false;
      }
      if (eventFilter !== "all" && !s.eventTypes.includes(eventFilter)) return false;
      if (s.priceNum < priceRange[0] || s.priceNum > priceRange[1]) return false;
      return true;
    });
  }, [capacityFilter, eventFilter, priceRange]);

  return (
    <div className="pt-28 pb-24 bg-black">
      {/* Page header */}
      <div className="border-b border-white/5 pb-16 mb-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Premium Hospitality"
            title="Our Suites & Spaces"
            subtitle="Discover the perfect luxury space for your next event at Arena Vilnius."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-white/5 p-6 mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <div>
            <label className="text-[10px] text-white/40 font-heading font-semibold uppercase tracking-[0.25em] mb-3 block">
              Capacity
            </label>
            <Select value={capacityFilter} onValueChange={setCapacityFilter}>
              <SelectTrigger className="bg-black/50 border-white/10 text-white/70 focus:border-primary">
                <SelectValue placeholder="All Sizes" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="small">Up to 10 guests</SelectItem>
                <SelectItem value="medium">11–20 guests</SelectItem>
                <SelectItem value="large">20+ guests</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-[10px] text-white/40 font-heading font-semibold uppercase tracking-[0.25em] mb-3 block">
              Event Type
            </label>
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="bg-black/50 border-white/10 text-white/70 focus:border-primary">
                <SelectValue placeholder="All Events" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="concerts">Concerts</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="shows">Shows</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-[10px] text-white/40 font-heading font-semibold uppercase tracking-[0.25em] mb-3 block">
              Price Range: €{priceRange[0].toLocaleString()} – €{priceRange[1].toLocaleString()}
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={10000}
              step={500}
              className="mt-4"
            />
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {filtered.map((suite, i) => (
              <SuiteCard key={suite.id} suite={suite} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-white/5">
            <p className="text-white/30 font-heading text-sm uppercase tracking-widest">No suites match your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}