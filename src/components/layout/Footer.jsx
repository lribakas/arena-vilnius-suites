import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { images } from "@/lib/images";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/[0.06]">

          {/* Logo */}
          <div className="md:col-span-1">
            <Link to="/" className="block mb-8">
              <img src={images.logoWhite} alt="Arena Vilnius" className="h-9 w-auto opacity-60" />
            </Link>
            <p className="text-white/30 text-sm leading-relaxed font-light">
              Premium hospitality experiences at Lithuania's premier arena.
            </p>
          </div>

          <div>
            <p className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/30 mb-6 font-medium">Explore</p>
            <div className="space-y-4">
              {[{label:"Our Suites", to:"/suites"}, {label:"Upcoming Events", to:"/events"}, {label:"Contact", to:"/contact"}].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm text-white/35 hover:text-white transition-colors duration-300 font-light">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/30 mb-6 font-medium">Hospitality</p>
            <div className="space-y-4">
              {["VIP Suites", "Corporate Events", "Season Packages", "Private Dining"].map(item => (
                <p key={item} className="text-sm text-white/35 font-light">{item}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/30 mb-6 font-medium">Contact</p>
            <div className="space-y-4">
              {[
                {icon: MapPin, text: "Ąžuolyno g. 7, Vilnius"},
                {icon: Phone, text: "+370 600 00 000"},
                {icon: Mail, text: "vip@arenavilnius.lt"},
              ].map(({icon: Icon, text}) => (
                <div key={text} className="flex items-center gap-3 text-sm text-white/35 font-light">
                  <Icon className="w-3.5 h-3.5 text-white/25 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/18 font-light">© 2026 Arena Vilnius. All rights reserved.</p>
          <div className="flex items-center gap-8">
            {["Privacy Policy", "Terms of Service"].map(l => (
              <span key={l} className="text-xs text-white/18 hover:text-white/50 cursor-pointer transition-colors duration-300 font-light">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}