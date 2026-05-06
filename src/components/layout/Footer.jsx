import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex flex-col leading-none mb-6">
              <span className="font-heading text-[10px] tracking-[0.35em] text-white/40 uppercase">Arena</span>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">VILNIUS</span>
              <span className="font-heading text-[9px] tracking-[0.2em] text-primary uppercase mt-0.5">Suites</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Premium hospitality experiences at Lithuania's premier arena venue.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xs text-primary mb-5 uppercase tracking-[0.25em] font-semibold">Explore</h4>
            <div className="space-y-3">
              {[
                { label: "Our Suites", to: "/suites" },
                { label: "Upcoming Events", to: "/events" },
                { label: "Contact", to: "/contact" },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm text-white/40 hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xs text-primary mb-5 uppercase tracking-[0.25em] font-semibold">Hospitality</h4>
            <div className="space-y-3">
              {["VIP Suites", "Corporate Events", "Season Packages", "Private Dining"].map(item => (
                <p key={item} className="text-sm text-white/40">{item}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xs text-primary mb-5 uppercase tracking-[0.25em] font-semibold">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-white/40">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Ąžuolyno g. 7, Vilnius, Lithuania</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+370 600 00 000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>vip@arenavilnius.lt</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">© 2026 Arena Vilnius. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/25 hover:text-white/60 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-white/25 hover:text-white/60 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}