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

const inputClass = "bg-[#0d0d0d] border-white/[0.08] text-white/80 placeholder:text-white/18 focus:border-white/25 focus:ring-0 rounded-none text-sm font-light h-11";

export default function Contact() {
  const [form, setForm] = useState({ name:"", company:"", email:"", phone:"", event:"", suite:"", guests:"", message:"" });
  const [sending, setSending] = useState(false);

  const set = (field, value) => setForm(p => ({ ...p, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Inquiry sent. Our team will respond within 24 hours.");
      setForm({ name:"", company:"", email:"", phone:"", event:"", suite:"", guests:"", message:"" });
    }, 1400);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-28">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-16 border-b border-white/[0.05] mb-16">
        <SectionHeading
          label="Get in Touch"
          title="Request a Proposal"
          subtitle="Our hospitality team is ready to craft the perfect experience for you."
        />
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            className="lg:col-span-2"
          >
            <div className="bg-[#0d0d0d] border border-white/[0.07]">
              <div className="h-px bg-white/10" />
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { field:"name", label:"Name *", placeholder:"Your full name", required:true, type:"text" },
                    { field:"company", label:"Company", placeholder:"Company name", type:"text" },
                    { field:"email", label:"Email *", placeholder:"your@email.com", required:true, type:"email" },
                    { field:"phone", label:"Phone", placeholder:"+370 600 00 000", type:"text" },
                  ].map(({field, label, placeholder, required, type}) => (
                    <div key={field}>
                      <label className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/28 mb-2.5 block font-medium">{label}</label>
                      <Input required={required} type={type} value={form[field]} onChange={e => set(field, e.target.value)} placeholder={placeholder} className={inputClass} />
                    </div>
                  ))}

                  <div>
                    <label className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/28 mb-2.5 block font-medium">Event</label>
                    <Select value={form.event} onValueChange={v => set("event", v)}>
                      <SelectTrigger className={`${inputClass} w-full`}>
                        <SelectValue placeholder="Select event" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0d0d0d] border-white/[0.08] rounded-none">
                        {events.map(e => <SelectItem key={e.id} value={e.id} className="text-white/50 text-xs focus:bg-white/5 focus:text-white rounded-none">{e.title}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/28 mb-2.5 block font-medium">Suite</label>
                    <Select value={form.suite} onValueChange={v => set("suite", v)}>
                      <SelectTrigger className={`${inputClass} w-full`}>
                        <SelectValue placeholder="Select suite" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0d0d0d] border-white/[0.08] rounded-none">
                        {suites.map(s => <SelectItem key={s.id} value={s.id} className="text-white/50 text-xs focus:bg-white/5 focus:text-white rounded-none">{s.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/28 mb-2.5 block font-medium">Number of Guests</label>
                  <Input value={form.guests} onChange={e => set("guests", e.target.value)} placeholder="e.g. 12" className={inputClass} />
                </div>

                <div>
                  <label className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/28 mb-2.5 block font-medium">Message</label>
                  <Textarea value={form.message} onChange={e => set("message", e.target.value)}
                    placeholder="Tell us about your requirements..."
                    className="bg-[#0d0d0d] border-white/[0.08] text-white/80 placeholder:text-white/18 focus:border-white/25 focus:ring-0 rounded-none text-sm font-light min-h-[110px] resize-none" />
                </div>

                <Button type="submit" disabled={sending}
                  className="w-full bg-white text-[#0a0a0a] font-heading text-xs font-bold tracking-[0.25em] uppercase py-6 hover:bg-white/90 rounded-none transition-all duration-300">
                  {sending
                    ? <div className="w-4 h-4 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full animate-spin" />
                    : <><Send className="w-3.5 h-3.5 mr-3" />Send Inquiry</>
                  }
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16,1,0.3,1] }}
            className="space-y-[1px] bg-white/[0.05]"
          >
            {/* Manager */}
            <div className="bg-[#0a0a0a] p-8">
              <p className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/25 mb-7 font-medium">Your Dedicated Manager</p>
              <div className="flex items-center gap-4 mb-7">
                <div className="w-11 h-11 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white/25" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-white text-sm tracking-tight">Karolis Jonaitis</p>
                  <p className="text-white/30 text-xs font-light mt-0.5">VIP Hospitality Director</p>
                </div>
              </div>
              <div className="space-y-3.5">
                {[{icon:Phone,text:"+370 600 00 000"},{icon:Mail,text:"karolis@arenavilnius.lt"}].map(({icon:Icon,text}) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-white/35 font-light">
                    <Icon className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/37060000000" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#0a0a0a] p-6 hover:bg-[#0f0f0f] transition-colors duration-300 group">
              <div className="w-9 h-9 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-white/20 transition-colors">
                <MessageCircle className="w-3.5 h-3.5 text-white/25 group-hover:text-white/50 transition-colors" />
              </div>
              <div>
                <p className="font-heading font-semibold text-white text-sm tracking-tight">Chat on WhatsApp</p>
                <p className="text-white/25 text-xs font-light">Usually responds immediately</p>
              </div>
            </a>

            {/* Location */}
            <div className="bg-[#0a0a0a] p-8">
              <p className="font-heading text-[9px] tracking-[0.35em] uppercase text-white/25 mb-6 font-medium">Visit Us</p>
              <div className="flex items-start gap-3 text-sm text-white/35 font-light">
                <MapPin className="w-3.5 h-3.5 text-white/20 mt-0.5 flex-shrink-0" />
                <div className="leading-relaxed">
                  <p>Arena Vilnius</p>
                  <p>Ąžuolyno g. 7</p>
                  <p>LT-08217 Vilnius</p>
                </div>
              </div>
            </div>

            {/* Response */}
            <div className="bg-[#0d0d0d] p-7 text-center">
              <p className="font-heading text-[9px] tracking-[0.3em] uppercase text-white/20 mb-2">Response Time</p>
              <p className="font-heading font-bold text-2xl text-white tracking-tight">Under 24h</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}