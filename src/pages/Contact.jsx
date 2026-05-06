import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, MessageCircle, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SectionHeading from "@/components/ui/SectionHeading";
import { suites, events } from "@/lib/mockData";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    event: "", suite: "", guests: "", message: ""
  });
  const [sending, setSending] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Your inquiry has been sent! Our team will contact you within 24 hours.");
      setForm({ name: "", company: "", email: "", phone: "", event: "", suite: "", guests: "", message: "" });
    }, 1500);
  };

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Get in Touch"
          title="Request a Proposal"
          subtitle="Our hospitality team is ready to craft the perfect experience for you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Name *</label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your full name"
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Company</label>
                  <Input
                    value={form.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Company name"
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Email *</label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Phone</label>
                  <Input
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+370 600 00 000"
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Interested Event</label>
                  <Select value={form.event} onValueChange={(v) => handleChange("event", v)}>
                    <SelectTrigger className="bg-secondary/50 border-border">
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map((e) => (
                        <SelectItem key={e.id} value={e.id}>{e.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Preferred Suite</label>
                  <Select value={form.suite} onValueChange={(v) => handleChange("suite", v)}>
                    <SelectTrigger className="bg-secondary/50 border-border">
                      <SelectValue placeholder="Select suite" />
                    </SelectTrigger>
                    <SelectContent>
                      {suites.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Number of Guests</label>
                <Input
                  value={form.guests}
                  onChange={(e) => handleChange("guests", e.target.value)}
                  placeholder="e.g. 12"
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Message</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell us about your requirements, special requests, or any questions..."
                  className="bg-secondary/50 border-border min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-primary text-primary-foreground py-6 text-sm font-medium hover:bg-primary/90"
              >
                {sending ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Inquiry
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Sales Manager */}
            <div className="glass-card rounded-xl p-8 border border-primary/10">
              <h3 className="font-heading text-lg text-foreground mb-4">Your Dedicated Manager</h3>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Karolis Jonaitis</p>
                  <p className="text-muted-foreground text-sm">VIP Hospitality Director</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+370 600 00 000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>karolis@arenavilnius.lt</span>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/37060000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 glass-card rounded-xl p-5 border border-primary/10 hover:bg-primary/5 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-foreground text-sm font-medium">Chat on WhatsApp</span>
            </a>

            {/* Location */}
            <div className="glass-card rounded-xl p-8">
              <h3 className="font-heading text-lg text-foreground mb-4">Visit Us</h3>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p>Arena Vilnius</p>
                  <p>Ąžuolyno g. 7</p>
                  <p>LT-08217 Vilnius, Lithuania</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}