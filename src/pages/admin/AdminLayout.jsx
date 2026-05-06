import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, Building2, Calendar, MessageSquare, Settings, ChevronRight, Menu, X } from "lucide-react";
import { images } from "@/lib/images";

const navItems = [
  { path: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { path: "/admin/suites", label: "Suites", icon: Building2 },
  { path: "/admin/events", label: "Events", icon: Calendar },
  { path: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { path: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-60 bg-[#0d0d0d] border-r border-white/[0.06] flex flex-col
        transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
          <Link to="/" target="_blank">
            <img src={images.logoWhite} alt="Arena Vilnius" className="h-6 w-auto opacity-80" />
          </Link>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-white/30 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-3 py-2 mt-2">
          <p className="font-heading text-[8px] tracking-[0.4em] uppercase text-white/20 px-3 mb-3">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200 group ${
                  active
                    ? "bg-white/[0.07] text-white"
                    : "text-white/35 hover:text-white/70 hover:bg-white/[0.04]"
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-white/80" : "text-white/25 group-hover:text-white/50"}`} />
                <span className="font-heading text-[11px] tracking-[0.1em] uppercase font-medium">{item.label}</span>
                {active && <ChevronRight className="w-3 h-3 ml-auto text-white/30" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/[0.06]">
          <Link to="/" target="_blank" className="font-heading text-[9px] tracking-[0.2em] uppercase text-white/20 hover:text-white/50 transition-colors">
            ← View Public Site
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar (mobile) */}
        <div className="lg:hidden flex items-center gap-4 px-4 py-3 border-b border-white/[0.06] bg-[#0d0d0d]">
          <button onClick={() => setMobileOpen(true)} className="text-white/40 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <img src={images.logoWhite} alt="Arena Vilnius" className="h-5 w-auto opacity-70" />
        </div>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}