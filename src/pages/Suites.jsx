import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SuiteCard from "@/components/suites/SuiteCard";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function Suites() {
  const { data: suitesData = [] } = useQuery({
    queryKey: ["suites-public"],
    queryFn: () => base44.entities.Suite.filter({ status: "published" }, "display_order"),
  });
  const suites = suitesData;

  const [capacityFilter, setCapacityFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const filtered = useMemo(() => {
    return suites.filter((s) => {
      if (capacityFilter === "small" && (s.capacity_num || 0) > 10) return false;
      if (capacityFilter === "medium" && ((s.capacity_num || 0) <= 10 || (s.capacity_num || 0) > 20)) return false;
      if (capacityFilter === "large" && (s.capacity_num || 0) <= 20) return false;
      if (eventFilter !== "all" && !(s.event_types || []).includes(eventFilter)) return false;
      if ((s.price_num || 0) < priceRange[0] || (s.price_num || 0) > priceRange[1]) return false;
      return true;
    });
  }, [capacityFilter, eventFilter, priceRange]);

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-28">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-16 border-b border-white/[0.05] mb-16">
        <SectionHeading
          label="Premium Hospitality"
          title="Our Suites & Spaces"
          subtitle="Discover the perfect luxury space for your next event at Arena Vilnius."
        />
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0d0d0d] border border-white/[0.06] p-6 mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <div>
            <label className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/28 mb-3 block font-medium">Capacity</label>
            <Select value={capacityFilter} onValueChange={setCapacityFilter}>
              <SelectTrigger className="bg-[#0a0a0a] border-white/[0.08] text-white/50 text-xs rounded-none focus:border-white/25 focus:ring-0">
                <SelectValue placeholder="All Sizes" />
              </SelectTrigger>
              <SelectContent className="bg-[#0d0d0d] border-white/[0.08] rounded-none">
                {[["all","All Sizes"],["small","Up to 10 guests"],["medium","11–20 guests"],["large","20+ guests"]].map(([v,l]) => (
                  <SelectItem key={v} value={v} className="text-white/50 text-xs focus:bg-white/5 focus:text-white rounded-none">{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/28 mb-3 block font-medium">Event Type</label>
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="bg-[#0a0a0a] border-white/[0.08] text-white/50 text-xs rounded-none focus:border-white/25 focus:ring-0">
                <SelectValue placeholder="All Events" />
              </SelectTrigger>
              <SelectContent className="bg-[#0d0d0d] border-white/[0.08] rounded-none">
                {[["all","All Events"],["concerts","Concerts"],["basketball","Basketball"],["shows","Shows"],["corporate","Corporate"]].map(([v,l]) => (
                  <SelectItem key={v} value={v} className="text-white/50 text-xs focus:bg-white/5 focus:text-white rounded-none">{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/28 mb-3 block font-medium">
              Price: €{priceRange[0].toLocaleString()} – €{priceRange[1].toLocaleString()}
            </label>
            <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={10000} step={500} className="mt-4" />
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.05]">
            {filtered.map((suite, i) => (
              <SuiteCard key={suite.id} suite={suite} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-white/[0.05]">
            <p className="font-heading text-[10px] tracking-[0.35em] uppercase text-white/20">No suites match your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}