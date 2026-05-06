import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "@/lib/images";

const navLinks = [
  { label: "Suites", path: "/suites" },
  { label: "Events", path: "/events" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? "bg-[#0a0a0a]/96 backdrop-blur-2xl border-b border-white/[0.06]" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

        {/* Official Arena Vilnius logo asset */}
        <Link to="/" className="select-none group">
          <img
            src={images.logoWhite}
            alt="Arena Vilnius"
            className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-heading text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-white"
                  : "text-white/35 hover:text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="font-heading text-xs font-semibold tracking-[0.18em] uppercase bg-white text-[#0a0a0a] px-6 py-2.5 hover:bg-white/90 transition-all duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white/60 hover:text-white transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/[0.06]"
          >
            <div className="px-8 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}
                  className="block font-heading text-sm font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link to="/contact"
                className="block text-center font-heading text-xs font-semibold tracking-[0.2em] uppercase bg-white text-[#0a0a0a] py-3.5 mt-4">
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}