import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { suites } from "@/lib/mockData";
import { images } from "@/lib/images";

export default function FeaturedSuites() {
  const featured = suites.slice(0, 3);

  return (
    <section className="py-28 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Our Suites"
          title="Exceptional Spaces"
          subtitle="Each suite delivers an unmatched hospitality experience with breathtaking arena views and impeccable service."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {featured.map((suite, i) => (
            <motion.div
              key={suite.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link
                to={`/suites/${suite.id}`}
                className="group block bg-card overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={images.suites[suite.id]}
                    alt={suite.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  {/* Red line on hover */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-primary text-[10px] font-heading font-semibold uppercase tracking-[0.3em] mb-2">
                    {suite.tagline}
                  </p>
                  <h3 className="font-heading font-bold text-xl text-white mb-3">{suite.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{suite.capacity}</span>
                    </div>
                    <span className="text-primary text-sm font-semibold">{suite.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-sm font-medium mt-5 group-hover:text-white group-hover:gap-3 transition-all duration-300">
                    <span className="text-xs tracking-widest uppercase font-heading">View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
            to="/suites"
            className="inline-flex items-center gap-2 border border-white/10 text-white/60 text-sm font-heading font-semibold uppercase tracking-widest px-8 py-3 hover:border-white/30 hover:text-white transition-all duration-300"
          >
            View All Suites
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}