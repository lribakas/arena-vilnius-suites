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
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Our Suites"
          title="Exceptional Spaces"
          subtitle="Each suite is designed to deliver an unmatched hospitality experience with breathtaking views and impeccable service."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((suite, i) => (
            <motion.div
              key={suite.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link
                to={`/suites/${suite.id}`}
                className="group block glass-card glass-card-hover rounded-xl overflow-hidden transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={images.suites[suite.id]}
                    alt={suite.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-primary text-xs uppercase tracking-widest">{suite.tagline}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-foreground mb-2">{suite.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Users className="w-4 h-4" />
                      <span>{suite.capacity}</span>
                    </div>
                    <span className="text-primary text-sm font-medium">{suite.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium mt-4 group-hover:gap-3 transition-all">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
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
            className="inline-flex items-center gap-2 text-primary text-sm tracking-wide hover:gap-3 transition-all duration-300"
          >
            View All Suites
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}