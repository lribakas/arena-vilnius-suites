import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="font-heading text-xl mb-4">
              <span className="text-foreground">Arena Vilnius</span>
              <span className="text-primary ml-1">Suites</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium hospitality experiences for unforgettable moments at Vilnius Arena.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm text-primary mb-4 uppercase tracking-widest">Explore</h4>
            <div className="space-y-3">
              <Link to="/suites" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Our Suites</Link>
              <Link to="/events" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Upcoming Events</Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm text-primary mb-4 uppercase tracking-widest">Hospitality</h4>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">VIP Suites</p>
              <p className="text-sm text-muted-foreground">Corporate Events</p>
              <p className="text-sm text-muted-foreground">Season Packages</p>
              <p className="text-sm text-muted-foreground">Private Dining</p>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm text-primary mb-4 uppercase tracking-widest">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Ąžuolyno g. 7, Vilnius, Lithuania</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+370 600 00 000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>vip@arenavilnius.lt</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Arena Vilnius Suites. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}