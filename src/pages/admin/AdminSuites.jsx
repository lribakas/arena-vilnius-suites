import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import SuiteForm from "@/components/admin/SuiteForm";

export default function AdminSuites() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null); // null = list, "new" = new, {suite} = edit

  const { data: suites = [], isLoading } = useQuery({
    queryKey: ["suites"],
    queryFn: () => base44.entities.Suite.list("display_order"),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Suite.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["suites"] }); setEditing(null); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Suite.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["suites"] }); setEditing(null); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Suite.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["suites"] }),
  });

  const toggleStatus = (suite) => updateMutation.mutate({
    id: suite.id,
    data: { status: suite.status === "published" ? "draft" : "published" },
  });

  const handleSave = (form) => {
    if (editing === "new") return createMutation.mutateAsync(form);
    return updateMutation.mutateAsync({ id: editing.id, data: form });
  };

  if (editing) {
    return (
      <div>
        <div className="mb-6">
          <p className="font-heading text-[9px] tracking-[0.4em] uppercase text-white/25 mb-2">Admin / Suites</p>
          <h1 className="font-heading font-bold text-2xl text-white tracking-tight">
            {editing === "new" ? "New Suite" : `Edit: ${editing.name}`}
          </h1>
        </div>
        <SuiteForm
          suite={editing === "new" ? null : editing}
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
          <h1 className="font-heading font-bold text-2xl text-white tracking-tight">Suites</h1>
        </div>
        <button onClick={() => setEditing("new")}
          className="flex items-center gap-2 bg-white text-[#0a0a0a] font-heading text-[10px] tracking-[0.2em] uppercase px-5 py-3 hover:bg-white/90 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Add Suite
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-white/20 text-sm">Loading...</div>
      ) : (
        <div className="bg-[#0d0d0d] border border-white/[0.06]">
          <div className="px-6 py-3 border-b border-white/[0.06] flex gap-4">
            <p className="font-heading text-[8px] tracking-[0.3em] uppercase text-white/20 w-52 flex-shrink-0">Suite</p>
            <p className="font-heading text-[8px] tracking-[0.3em] uppercase text-white/20 w-28 flex-shrink-0">ID</p>
            <p className="font-heading text-[8px] tracking-[0.3em] uppercase text-white/20 w-24 flex-shrink-0">Capacity</p>
            <p className="font-heading text-[8px] tracking-[0.3em] uppercase text-white/20 w-28 flex-shrink-0">Price</p>
            <p className="font-heading text-[8px] tracking-[0.3em] uppercase text-white/20 w-24 flex-shrink-0">Status</p>
            <p className="font-heading text-[8px] tracking-[0.3em] uppercase text-white/20 w-12 flex-shrink-0 text-center">Order</p>
            <p className="font-heading text-[8px] tracking-[0.3em] uppercase text-white/20 ml-auto">Actions</p>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {suites.length === 0 && (
              <p className="px-6 py-12 text-center text-white/20 text-sm font-light">No suites yet. Click "Add Suite" to get started.</p>
            )}
            {suites.map((suite) => (
              <div key={suite.id} className="px-6 py-4 flex gap-4 items-center hover:bg-white/[0.02] transition-colors">
                <div className="w-52 flex-shrink-0 flex items-center gap-3 min-w-0">
                  {suite.image && <img src={suite.image} alt="" className="w-10 h-10 object-cover opacity-60 flex-shrink-0" />}
                  <p className="text-white/70 text-sm font-medium truncate">{suite.name}</p>
                </div>
                <p className="w-28 flex-shrink-0 text-white/20 text-[10px] font-mono truncate cursor-pointer hover:text-white/50 transition-colors" title={suite.id} onClick={() => navigator.clipboard.writeText(suite.id)}>{suite.id?.slice(0, 8)}…</p>
                <p className="w-24 flex-shrink-0 text-white/30 text-xs font-light">{suite.capacity || "—"}</p>
                <p className="w-28 flex-shrink-0 text-white/30 text-xs font-light">{suite.price || "—"}</p>
                <div className="w-24 flex-shrink-0">
                  <button onClick={() => toggleStatus(suite)}
                    className={`flex items-center gap-1.5 font-heading text-[8px] tracking-[0.2em] uppercase px-2 py-1 border transition-all ${
                      suite.status === "published"
                        ? "border-white/20 text-white/50"
                        : "border-white/[0.07] text-white/20"
                    }`}>
                    {suite.status === "published" ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {suite.status}
                  </button>
                </div>
                <p className="w-12 flex-shrink-0 text-white/20 text-xs text-center">{suite.display_order}</p>
                <div className="ml-auto flex items-center gap-2">
                  <button onClick={() => setEditing(suite)} className="text-white/20 hover:text-white/70 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => { if (confirm(`Delete "${suite.name}"?`)) deleteMutation.mutate(suite.id); }}
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