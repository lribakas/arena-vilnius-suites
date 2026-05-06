import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { suites } from "@/lib/mockData";
import { images } from "@/lib/images";

export default function FeaturedSuites() {
  const featured = suites.slice(0, 3);

  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeading
          label="Our Suites"
          title="Exceptional Spaces"
          subtitle="Each suite delivers an unmatched hospitality experience with breathtaking arena views and impeccable service."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/[0.05]">
          {featured.map((suite, i) => (
            <motion.div
              key={suite.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={`/suites/${suite.id}`} className="group block bg-[#0a0a0a] overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={images.suites[suite.id]}
                    alt={suite.name}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                  {/* Price tag */}
                  <div className="absolute top-4 right-4">
                    <span className="font-heading text-[10px] tracking-[0.15em] uppercase bg-[#0a0a0a]/80 text-white/70 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                      {suite.price}
                    </span>
                  </div>
                  {/* Bottom reveal line */}
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white/50 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
                <div className="p-7 bg-[#0a0a0a] border-t border-white/[0.05] group-hover:border-white/[0.1] transition-colors duration-300">
                  <p className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/28 mb-2 font-medium">{suite.tagline}</p>
                  <h3 className="font-heading font-bold text-lg text-white tracking-tight mb-4">{suite.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/30 text-xs font-light">
                      <Users className="w-3.5 h-3.5" />
                      <span>{suite.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-heading text-[10px] tracking-[0.15em] uppercase text-white/30 group-hover:text-white/70 group-hover:gap-2.5 transition-all duration-300">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/suites"
            className="inline-flex items-center gap-3 border border-white/10 text-white/40 font-heading text-[10px] tracking-[0.2em] uppercase px-8 py-3.5 hover:border-white/25 hover:text-white/70 transition-all duration-400"
          >
            View All Suites
            <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}