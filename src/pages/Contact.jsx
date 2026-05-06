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
      toast.success("Inquiry sent! Our team will contact you within 24 hours.");
      setForm({ name: "", company: "", email: "", phone: "", event: "", suite: "", guests: "", message: "" });
    }, 1500);
  };

  return (
    <div className="pt-28 pb-24 bg-black">
      {/* Page header */}
      <div className="border-b border-white/5 pb-16 mb-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Get in Touch"
            title="Request a Proposal"
            subtitle="Our hospitality team is ready to craft the perfect experience for you."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-card border border-white/5">
              {/* Red top accent */}
              <div className="h-0.5 bg-primary" />
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { field: "name", label: "Name *", placeholder: "Your full name", required: true, type: "text" },
                    { field: "company", label: "Company", placeholder: "Company name", type: "text" },
                    { field: "email", label: "Email *", placeholder: "your@email.com", required: true, type: "email" },
                    { field: "phone", label: "Phone", placeholder: "+370 600 00 000", type: "text" },
                  ].map(({ field, label, placeholder, required, type }) => (
                    <div key={field}>
                      <label className="text-[10px] text-white/40 font-heading font-semibold uppercase tracking-[0.25em] mb-2.5 block">
                        {label}
                      </label>
                      <Input
                        required={required}
                        type={type}
                        value={form[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        placeholder={placeholder}
                        className="bg-black/60 border-white/8 text-white placeholder:text-white/20 focus:border-primary rounded-none"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="text-[10px] text-white/40 font-heading font-semibold uppercase tracking-[0.25em] mb-2.5 block">
                      Interested Event
                    </label>
                    <Select value={form.event} onValueChange={(v) => handleChange("event", v)}>
                      <SelectTrigger className="bg-black/60 border-white/8 text-white/60 focus:border-primary rounded-none">
                        <SelectValue placeholder="Select event" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10">
                        {events.map((e) => (
                          <SelectItem key={e.id} value={e.id} className="text-white/70">{e.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-[10px] text-white/40 font-heading font-semibold uppercase tracking-[0.25em] mb-2.5 block">
                      Preferred Suite
                    </label>
                    <Select value={form.suite} onValueChange={(v) => handleChange("suite", v)}>
                      <SelectTrigger className="bg-black/60 border-white/8 text-white/60 focus:border-primary rounded-none">
                        <SelectValue placeholder="Select suite" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10">
                        {suites.map((s) => (
                          <SelectItem key={s.id} value={s.id} className="text-white/70">{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-white/40 font-heading font-semibold uppercase tracking-[0.25em] mb-2.5 block">
                    Number of Guests
                  </label>
                  <Input
                    value={form.guests}
                    onChange={(e) => handleChange("guests", e.target.value)}
                    placeholder="e.g. 12"
                    className="bg-black/60 border-white/8 text-white placeholder:text-white/20 focus:border-primary rounded-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-white/40 font-heading font-semibold uppercase tracking-[0.25em] mb-2.5 block">
                    Message
                  </label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell us about your requirements, special requests, or any questions..."
                    className="bg-black/60 border-white/8 text-white placeholder:text-white/20 focus:border-primary rounded-none min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-primary text-white py-6 text-sm font-heading font-semibold tracking-[0.25em] uppercase hover:bg-primary/90 rounded-none"
                >
                  {sending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-3" />
                      Send Inquiry
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-px"
          >
            {/* Sales Manager */}
            <div className="bg-card border border-white/5 p-8 relative">
              <div className="absolute top-0 left-0 w-8 h-0.5 bg-primary" />
              <h3 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-6">Your Dedicated Manager</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <p className="text-white font-heading font-semibold text-sm">Karolis Jonaitis</p>
                  <p className="text-white/40 text-xs">VIP Hospitality Director</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/40">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>+370 600 00 000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/40">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>karolis@arenavilnius.lt</span>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/37060000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-card border-x border-b border-white/5 p-6 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <MessageCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-white text-sm font-heading font-semibold">Chat on WhatsApp</p>
                <p className="text-white/30 text-xs">Usually responds immediately</p>
              </div>
            </a>

            {/* Location */}
            <div className="bg-card border-x border-b border-white/5 p-8">
              <h3 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">Visit Us</h3>
              <div className="flex items-start gap-3 text-sm text-white/40">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="leading-relaxed">
                  <p>Arena Vilnius</p>
                  <p>Ąžuolyno g. 7</p>
                  <p>LT-08217 Vilnius, Lithuania</p>
                </div>
              </div>
            </div>

            {/* Response time */}
            <div className="bg-primary/5 border border-primary/10 p-5 text-center">
              <p className="text-primary text-xs font-heading font-semibold uppercase tracking-[0.25em]">Response Time</p>
              <p className="text-white font-heading font-bold text-2xl mt-1">Under 24h</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}