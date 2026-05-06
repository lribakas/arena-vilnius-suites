import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import EventForm from "@/components/admin/EventForm";

export default function AdminEvents() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => base44.entities.Event.list("display_order"),
  });
  const { data: suites = [] } = useQuery({
    queryKey: ["suites"],
    queryFn: () => base44.entities.Suite.list("display_order"),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Event.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["events"] }); setEditing(null); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Event.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["events"] }); setEditing(null); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Event.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });

  const toggleStatus = (event) => updateMutation.mutate({
    id: event.id,
    data: { status: event.status === "published" ? "draft" : "published" },
  });

  const handleSave = (form) => {
    if (editing === "new") return createMutation.mutateAsync(form);
    return updateMutation.mutateAsync({ id: editing.id, data: form });
  };

  if (editing) {
    return (
      <div>
        <div className="mb-6">
          <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-2">Admin / Events</p>
          <h1 className="font-heading font-bold text-2xl text-white tracking-tight">
            {editing === "new" ? "New Event" : `Edit: ${editing.title}`}
          </h1>
        </div>
        <EventForm
          event={editing === "new" ? null : editing}
          suites={suites}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-2">Admin</p>
          <h1 className="font-heading font-bold text-2xl text-white tracking-tight">Events</h1>
        </div>
        <button onClick={() => setEditing("new")}
          className="flex items-center gap-2 bg-white text-[#0a0a0a] font-heading text-[10px] tracking-[0.2em] uppercase px-5 py-3 hover:bg-white/90 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Add Event
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-white/20 text-sm">Loading...</div>
      ) : (
        <div className="bg-[#0d0d0d] border border-white/[0.06]">
          <div className="px-6 py-3 border-b border-white/[0.06] grid grid-cols-12 gap-4">
            {["Event", "ID", "Date", "Price", "Status", "Order", "Actions"].map(h => (
              <p key={h} className="font-heading text-[8px] tracking-[0.3em] uppercase text-white/20 col-span-2 first:col-span-3">{h}</p>
            ))}
          </div>

          <div className="divide-y divide-white/[0.04]">
            {events.length === 0 && (
              <p className="px-6 py-12 text-center text-white/20 text-sm font-light">No events yet. Click "Add Event" to get started.</p>
            )}
            {events.map((event) => (
              <div key={event.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-white/[0.02] transition-colors">
                <div className="col-span-3 flex items-center gap-3">
                  {event.image && <img src={event.image} alt="" className="w-10 h-10 object-cover opacity-60 flex-shrink-0" />}
                  <p className="text-white/70 text-sm font-medium truncate">{event.title}</p>
                </div>
                <p className="col-span-2 text-white/20 text-[10px] font-mono truncate cursor-pointer hover:text-white/50 transition-colors" title={event.id} onClick={() => navigator.clipboard.writeText(event.id)}>{event.id?.slice(0, 8)}…</p>
                <p className="col-span-2 text-white/30 text-xs font-light">
                  {event.date ? format(new Date(event.date), "MMM d, yyyy") : "—"}
                </p>
                <p className="col-span-2 text-white/30 text-xs font-light">{event.price || "—"}</p>
                <div className="col-span-2">
                  <button onClick={() => toggleStatus(event)}
                    className={`flex items-center gap-1.5 font-heading text-[8px] tracking-[0.2em] uppercase px-2 py-1 border transition-all ${
                      event.status === "published"
                        ? "border-white/20 text-white/50"
                        : "border-white/[0.07] text-white/20"
                    }`}>
                    {event.status === "published" ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {event.status}
                  </button>
                </div>
                <p className="col-span-1 text-white/20 text-xs text-center">{event.display_order}</p>
                <div className="col-span-1 flex items-center gap-2 justify-end">
                  <button onClick={() => setEditing(event)} className="text-white/20 hover:text-white/70 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => { if (confirm(`Delete "${event.title}"?`)) deleteMutation.mutate(event.id); }}
                    className="text-white/20 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}