import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { Building2, Calendar, MessageSquare, TrendingUp } from "lucide-react";

export default function AdminOverview() {
  const { data: suites = [] } = useQuery({ queryKey: ["suites"], queryFn: () => base44.entities.Suite.list() });
  const { data: events = [] } = useQuery({ queryKey: ["events"], queryFn: () => base44.entities.Event.list() });
  const { data: inquiries = [] } = useQuery({ queryKey: ["inquiries"], queryFn: () => base44.entities.Inquiry.list() });

  const stats = [
    { label: "Total Suites", value: suites.length, sub: `${suites.filter(s => s.status === "published").length} published`, icon: Building2, href: "/admin/suites" },
    { label: "Total Events", value: events.length, sub: `${events.filter(e => e.status === "published").length} published`, icon: Calendar, href: "/admin/events" },
    { label: "Inquiries", value: inquiries.length, sub: `${inquiries.filter(i => i.status === "new").length} new`, icon: MessageSquare, href: "/admin/inquiries" },
    { label: "Published Content", value: suites.filter(s => s.status === "published").length + events.filter(e => e.status === "published").length, sub: "suites + events live", icon: TrendingUp, href: "/admin/suites" },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-2">Admin Panel</p>
        <h1 className="font-heading font-bold text-2xl text-white tracking-tight">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/[0.05] mb-10">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} to={s.href} className="bg-[#0d0d0d] p-6 hover:bg-[#111] transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-4 h-4 text-white/20" />
              </div>
              <p className="font-heading font-bold text-3xl text-white tracking-tight mb-1">{s.value}</p>
              <p className="font-heading text-[9px] tracking-[0.2em] uppercase text-white/25 mb-1">{s.label}</p>
              <p className="text-white/20 text-xs font-light">{s.sub}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-[#0d0d0d] border border-white/[0.06]">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <p className="font-heading text-[10px] tracking-[0.25em] uppercase text-white/50 font-medium">Recent Inquiries</p>
            <Link to="/admin/inquiries" className="font-heading text-[9px] tracking-[0.2em] uppercase text-white/25 hover:text-white/60 transition-colors">View All</Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {inquiries.slice(0, 5).map((inq) => (
              <div key={inq.id} className="px-6 py-3 flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-light">{inq.name}</p>
                  <p className="text-white/25 text-xs font-light">{inq.email}</p>
                </div>
                <span className={`font-heading text-[8px] tracking-[0.2em] uppercase px-2 py-1 border ${
                  inq.status === "new" ? "border-white/20 text-white/50" :
                  inq.status === "contacted" ? "border-white/10 text-white/30" :
                  "border-white/5 text-white/15"
                }`}>{inq.status}</span>
              </div>
            ))}
            {inquiries.length === 0 && (
              <p className="px-6 py-8 text-white/20 text-sm font-light text-center">No inquiries yet.</p>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-[#0d0d0d] border border-white/[0.06]">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <p className="font-heading text-[10px] tracking-[0.25em] uppercase text-white/50 font-medium">Quick Actions</p>
          </div>
          <div className="p-6 space-y-3">
            {[
              { label: "Add New Suite", href: "/admin/suites/new" },
              { label: "Add New Event", href: "/admin/events/new" },
              { label: "View All Inquiries", href: "/admin/inquiries" },
              { label: "View Public Website", href: "/", target: "_blank" },
            ].map((item) => (
              <Link key={item.label} to={item.href} target={item.target}
                className="flex items-center justify-between px-4 py-3 border border-white/[0.06] text-white/40 hover:text-white/80 hover:border-white/15 transition-all duration-200">
                <span className="font-heading text-[10px] tracking-[0.15em] uppercase">{item.label}</span>
                <span className="text-white/20">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}