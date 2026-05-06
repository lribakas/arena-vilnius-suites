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
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Premium Hospitality"
          title="Our Suites & Spaces"
          subtitle="Discover the perfect luxury space for your next event at Arena Vilnius."
        />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6 mb-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">
              Capacity
            </label>
            <Select value={capacityFilter} onValueChange={setCapacityFilter}>
              <SelectTrigger className="bg-secondary/50 border-border">
                <SelectValue placeholder="All Sizes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="small">Up to 10 guests</SelectItem>
                <SelectItem value="medium">11–20 guests</SelectItem>
                <SelectItem value="large">20+ guests</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">
              Event Type
            </label>
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="bg-secondary/50 border-border">
                <SelectValue placeholder="All Events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="concerts">Concerts</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="shows">Shows</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">
              Price Range: €{priceRange[0].toLocaleString()} – €{priceRange[1].toLocaleString()}
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={10000}
              step={500}
              className="mt-3"
            />
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((suite, i) => (
              <SuiteCard key={suite.id} suite={suite} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No suites match your criteria. Try adjusting the filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}