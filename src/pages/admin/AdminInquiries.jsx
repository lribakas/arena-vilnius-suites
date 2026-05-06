import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminInquiries() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);

  const { data: inquiries = [] } = useQuery({
    queryKey: ["inquiries"],
    queryFn: () => base44.entities.Inquiry.list("-created_date"),
  });
  const { data: suites = [] } = useQuery({ queryKey: ["suites"], queryFn: () => base44.entities.Suite.list() });
  const { data: events = [] } = useQuery({ queryKey: ["events"], queryFn: () => base44.entities.Event.list() });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Inquiry.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inquiries"] }),
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Inquiry.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["inquiries"] }); setSelected(null); },
  });

  const suiteName = (id) => suites.find(s => s.id === id)?.name || id || "—";
  const eventName = (id) => events.find(e => e.id === id)?.title || id || "—";

  return (
    <div>
      <div className="mb-8">
        <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-2">Admin</p>
        <h1 className="font-heading font-bold text-2xl text-white tracking-tight">Inquiries</h1>
      </div>

      <div className="bg-[#0d0d0d] border border-white/[0.06]">
        <div className="px-6 py-4 border-b border-white/[0.06]">
          <p className="font-heading text-[10px] tracking-[0.25em] uppercase text-white/40">{inquiries.length} total</p>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {inquiries.length === 0 && (
            <p className="px-6 py-12 text-center text-white/20 text-sm font-light">No inquiries yet. They'll appear here when visitors submit the contact form.</p>
          )}
          {inquiries.map((inq) => (
            <div key={inq.id}
              className={`px-6 py-4 cursor-pointer hover:bg-white/[0.02] transition-colors ${selected?.id === inq.id ? "bg-white/[0.03]" : ""}`}
              onClick={() => setSelected(selected?.id === inq.id ? null : inq)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-white/80 text-sm font-medium">{inq.name}</p>
                    {inq.company && <p className="text-white/30 text-xs">{inq.company}</p>}
                    <span className={`font-heading text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 border ${
                      inq.status === "new" ? "border-white/25 text-white/60" :
                      inq.status === "contacted" ? "border-white/12 text-white/30" :
                      "border-white/5 text-white/15"
                    }`}>{inq.status}</span>
                  </div>
                  <p className="text-white/30 text-xs mt-1">{inq.email} {inq.phone && `· ${inq.phone}`}</p>
                  <p className="text-white/20 text-xs mt-0.5">{inq.created_date && format(new Date(inq.created_date), "MMM d, yyyy · HH:mm")}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {inq.suite_id && <p className="text-white/30 text-xs">{suiteName(inq.suite_id)}</p>}
                  {inq.event_id && <p className="text-white/20 text-xs">{eventName(inq.event_id)}</p>}
                </div>
              </div>

              {selected?.id === inq.id && (
                <div className="mt-4 pt-4 border-t border-white/[0.05]">
                  {inq.message && (
                    <p className="text-white/40 text-sm font-light mb-4 leading-relaxed">{inq.message}</p>
                  )}
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-[9px] tracking-[0.2em] uppercase text-white/25">Status:</span>
                      <Select value={inq.status} onValueChange={(v) => updateMutation.mutate({ id: inq.id, data: { status: v } })}>
                        <SelectTrigger className="h-7 text-xs bg-transparent border-white/[0.08] text-white/50 rounded-none w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0d0d0d] border-white/[0.08] rounded-none">
                          {["new", "contacted", "closed"].map(s => (
                            <SelectItem key={s} value={s} className="text-white/50 text-xs focus:bg-white/5 focus:text-white rounded-none">{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); if (confirm("Delete this inquiry?")) deleteMutation.mutate(inq.id); }}
                      className="font-heading text-[9px] tracking-[0.2em] uppercase text-white/20 hover:text-red-400 transition-colors border border-white/[0.06] px-3 py-1.5"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}