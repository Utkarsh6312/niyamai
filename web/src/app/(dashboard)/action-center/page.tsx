"use client";
import {
  ChevronRight, Search, MoreVertical, CheckCircle2, AlertTriangle, Clock,
  FileText, RefreshCcw, PieChart, Plus, X, Loader2, Link2
} from "lucide-react";
import Link from "next/link";
import { RiskBadge, StatusBadge } from "@/components/ui/badges";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api/client";
import type { Action } from "@/lib/types";

const PRIORITY_ORDER: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
const STATUS_TABS = ["All", "Critical", "In Progress", "Not Started", "Review", "Completed", "Overdue"];

export default function ActionCenter() {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.actions();
      setActions(data.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]));
    } catch {
      setError("Backend offline — start uvicorn to see live actions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = actions.filter((a) => {
    if (activeTab === "Critical" && a.priority !== "Critical") return false;
    if (activeTab !== "All" && activeTab !== "Critical" && a.status !== activeTab) return false;
    if (filterDept && a.department !== filterDept) return false;
    if (filterPriority && a.priority !== filterPriority) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) &&
      !a.action_code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    open: actions.filter(a => !["Completed"].includes(a.status)).length,
    critical: actions.filter(a => a.priority === "Critical").length,
    inProgress: actions.filter(a => a.status === "In Progress").length,
    notStarted: actions.filter(a => a.status === "Not Started").length,
  };

  const departments = [...new Set(actions.map(a => a.department))];

  const handleMarkComplete = async () => {
    if (!selectedAction) return;
    setUpdatingId(selectedAction.id);
    try {
      const updated = await api.updateAction(selectedAction.id, { status: "Completed" });
      setActions(prev => prev.map(a => a.id === updated.id ? updated : a));
      setSelectedAction(updated);
      toast.success(`${selectedAction.action_code} marked complete`, {
        description: "Action status updated and provenance recorded.",
      });
    } catch {
      toast.error("Failed to update action. Check backend connection.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSubmitReview = async () => {
    if (!selectedAction) return;
    setUpdatingId(selectedAction.id);
    try {
      const updated = await api.updateAction(selectedAction.id, { approval_state: "Compliance Review" });
      setActions(prev => prev.map(a => a.id === updated.id ? updated : a));
      setSelectedAction(updated);
      toast.success("Submitted for Compliance Review", {
        description: "The action has been escalated for review and approval.",
      });
    } catch {
      toast.error("Failed to submit for review.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <div className="space-y-6 pb-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-indigo">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Action Center</span>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight">Compliance Action Center</h1>
            <p className="text-muted-foreground mt-1 text-base">Convert regulatory findings into accountable implementation tasks.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={load} className="flex items-center gap-2 px-3 py-2 border border-border rounded text-sm hover:bg-secondary/20 transition-colors">
              <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md text-sm font-semibold hover:bg-indigo/90 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Create Action
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 text-sm text-amber-400">⚠ {error}</div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard icon={<CheckCircle2 className="w-5 h-5 text-indigo" />} iconBg="bg-indigo/10 border border-indigo/20"
            value={loading ? "…" : String(counts.open)} label="Open Actions" />
          <MetricCard icon={<AlertTriangle className="w-5 h-5 text-red" />} iconBg="bg-red/10 border border-red/20"
            value={loading ? "…" : String(counts.critical)} label="Critical Priority" />
          <MetricCard icon={<RefreshCcw className="w-5 h-5 text-indigo" />} iconBg="bg-indigo/10 border border-indigo/20"
            value={loading ? "…" : String(counts.inProgress)} label="In Progress" />
          <MetricCard icon={<Clock className="w-5 h-5 text-amber" />} iconBg="bg-amber/10 border border-amber/20"
            value={loading ? "…" : String(counts.notStarted)} label="Not Started" />
        </div>

        {/* Table Card */}
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]">
          {/* Tabs */}
          <div className="flex items-center gap-1 px-4 border-b border-border overflow-x-auto">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn("px-3 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors",
                  activeTab === tab ? "border-indigo text-indigo" : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
                {tab === "All" && !loading && <span className="ml-1.5 text-xs bg-secondary px-1.5 py-0.5 rounded">{actions.length}</span>}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search actions, codes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:border-indigo"
              />
            </div>
            <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:border-indigo appearance-none w-36">
              <option value="">Department</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:border-indigo appearance-none w-32">
              <option value="">Priority</option>
              {["Critical", "High", "Medium", "Low"].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {(search || filterDept || filterPriority) && (
              <button onClick={() => { setSearch(""); setFilterDept(""); setFilterPriority(""); }}
                className="text-sm text-indigo font-semibold hover:underline whitespace-nowrap">
                Clear
              </button>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-foreground font-bold bg-secondary/30 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Action ID</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Approval</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {loading ? (
                  <tr><td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />Loading actions…
                  </td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">
                    {error ? "Backend offline." : "No actions found."}
                  </td></tr>
                ) : filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => setSelectedAction(row)}>
                    <td className="px-4 py-4 font-mono text-xs text-indigo">{row.action_code}</td>
                    <td className="px-4 py-4 max-w-xs truncate">{row.title}</td>
                    <td className="px-4 py-4 text-muted-foreground">{row.department}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary text-foreground flex items-center justify-center text-[10px] font-bold border border-border shrink-0">
                          {row.owner_initials || row.owner?.slice(0, 2).toUpperCase() || "??"}
                        </div>
                        <span className="truncate max-w-[100px]">{row.owner || "Unassigned"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4"><RiskBadge level={row.priority} /></td>
                    <td className="px-4 py-4 text-xs text-muted-foreground whitespace-nowrap">{row.due_date || "—"}</td>
                    <td className="px-4 py-4"><StatusBadge status={row.status} /></td>
                    <td className="px-4 py-4">
                      <span className={cn("px-2 py-1 text-[10px] font-semibold rounded", {
                        "bg-amber/10 text-amber": row.approval_state === "Draft",
                        "bg-blue-500/10 text-blue-400": row.approval_state === "Compliance Review",
                        "bg-teal/10 text-teal": row.approval_state === "Approved",
                        "bg-red/10 text-red": row.approval_state === "Rejected",
                      })}>
                        {row.approval_state}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right" onClick={e => e.stopPropagation()}>
                      <button><MoreVertical className="w-4 h-4 text-muted-foreground hover:text-indigo" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing {filtered.length} of {actions.length} actions</div>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedAction && (
        <>
          <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]" onClick={() => setSelectedAction(null)} />
          <div className="fixed top-0 right-0 z-50 h-full w-[440px] bg-card border-l border-border shadow-xl flex flex-col">
            <div className="px-6 py-4 flex items-center justify-between border-b border-border shrink-0">
              <h2 className="font-serif text-lg font-bold">Action Details</h2>
              <button onClick={() => setSelectedAction(null)} className="p-1 rounded hover:bg-secondary transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <RiskBadge level={selectedAction.priority} />
                  <span className="font-mono text-sm text-muted-foreground">{selectedAction.action_code}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 leading-snug">{selectedAction.title}</h3>
                <div className="flex items-center gap-2 text-xs text-indigo font-semibold bg-indigo/5 w-fit px-2 py-1 rounded border border-indigo/10">
                  ✨ AI Suggested · Human Approval Required
                </div>
              </div>

              {selectedAction.description && (
                <div className="bg-secondary/50 border border-border rounded p-4">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Description</h4>
                  <p className="text-sm text-foreground leading-relaxed">{selectedAction.description}</p>
                </div>
              )}

              {/* Provenance chain summary */}
              <div className="bg-indigo/5 border border-indigo/15 rounded p-4">
                <h4 className="text-xs font-bold text-indigo uppercase tracking-wide mb-3">Compliance Chain</h4>
                <div className="flex flex-col gap-1 text-xs font-mono">
                  <span className="text-slate-500">Regulation → Obligation → Policy → Gap → Risk</span>
                  <span className="text-indigo font-bold">→ {selectedAction.action_code}</span>
                </div>
                {selectedAction.obligation_id && (
                  <Link href="/regulatory-trace" className="text-xs text-indigo hover:underline mt-2 flex items-center gap-1 font-medium">
                    <Link2 className="w-3 h-3" /> View Regulatory Trace →
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-y-4 gap-x-4 text-sm">
                <div className="text-muted-foreground">Department</div>
                <div className="font-medium">{selectedAction.department}</div>

                <div className="text-muted-foreground">Owner</div>
                <div className="flex items-center gap-2 font-medium">
                  <div className="w-6 h-6 rounded-full bg-secondary border border-border flex items-center justify-center text-[10px] font-bold shrink-0">
                    {selectedAction.owner_initials || selectedAction.owner?.slice(0, 2).toUpperCase() || "??"}
                  </div>
                  {selectedAction.owner || "Unassigned"}
                </div>

                <div className="text-muted-foreground">Role</div>
                <div className="font-medium">{selectedAction.owner_role || "—"}</div>

                <div className="text-muted-foreground">Priority</div>
                <div><RiskBadge level={selectedAction.priority} /></div>

                <div className="text-muted-foreground">Due Date</div>
                <div className="flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4 text-muted-foreground shrink-0" /> {selectedAction.due_date || "Not set"}
                </div>

                <div className="text-muted-foreground">Status</div>
                <div><StatusBadge status={selectedAction.status} /></div>

                <div className="text-muted-foreground">Approval</div>
                <div>
                  <span className={cn("px-2.5 py-1 text-xs font-semibold rounded", {
                    "bg-amber/10 text-amber": selectedAction.approval_state === "Draft",
                    "bg-blue-500/10 text-blue-400": selectedAction.approval_state === "Compliance Review",
                    "bg-teal/10 text-teal": selectedAction.approval_state === "Approved",
                    "bg-red/10 text-red": selectedAction.approval_state === "Rejected",
                  })}>
                    {selectedAction.approval_state}
                  </span>
                </div>

                <div className="text-muted-foreground">Created</div>
                <div className="text-muted-foreground text-xs">
                  {new Date(selectedAction.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-card flex items-center gap-3 shrink-0">
              {selectedAction.status !== "Completed" ? (
                <>
                  <button
                    onClick={handleMarkComplete}
                    disabled={updatingId === selectedAction.id}
                    className="bg-indigo text-white rounded px-4 py-2 font-medium text-sm hover:bg-indigo/90 shadow-sm flex items-center gap-2 disabled:opacity-60"
                  >
                    {updatingId === selectedAction.id
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <CheckCircle2 className="w-4 h-4" />}
                    Mark Complete
                  </button>
                  {selectedAction.approval_state === "Draft" && (
                    <button
                      onClick={handleSubmitReview}
                      disabled={updatingId === selectedAction.id}
                      className="border border-border text-foreground rounded px-4 py-2 font-medium text-sm hover:bg-secondary shadow-sm disabled:opacity-60"
                    >
                      Submit for Review
                    </button>
                  )}
                </>
              ) : (
                <div className="flex-1 bg-teal/10 text-teal rounded py-2 font-medium text-sm flex items-center justify-center gap-2 border border-teal/20">
                  <CheckCircle2 className="w-4 h-4" /> Completed
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Create Action Modal */}
      {showCreateModal && (
        <CreateActionModal
          onClose={() => setShowCreateModal(false)}
          onCreated={(newAction) => {
            setActions(prev => [newAction, ...prev]);
            setShowCreateModal(false);
            toast.success(`${newAction.action_code} created`, { description: "Action added to the compliance pipeline." });
          }}
        />
      )}
    </>
  );
}

function CreateActionModal({ onClose, onCreated }: { onClose: () => void; onCreated: (a: Action) => void }) {
  const [form, setForm] = useState({
    title: "", description: "", owner: "", owner_initials: "", owner_role: "",
    department: "Compliance", priority: "High", due_date: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const action = await api.createAction(form);
      onCreated(action);
    } catch {
      toast.error("Failed to create action. Is the backend running?");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-card border-[3px] border-black shadow-[5px_5px_0_0_#000000] w-full max-w-md rounded-none">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold">Create Action</h2>
            <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Title *</label>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Amend KYC Policy §3.2..."
                className="mt-1 w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-indigo" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Description</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={3} placeholder="What exactly needs to be done..."
                className="mt-1 w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-indigo resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Department *</label>
                <select required value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
                  className="mt-1 w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-indigo appearance-none">
                  {["Compliance", "KYC", "Operations", "IT", "Cybersecurity", "Legal", "Risk", "Finance", "Business"].map(d =>
                    <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Priority *</label>
                <select required value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                  className="mt-1 w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-indigo appearance-none">
                  {["Critical", "High", "Medium", "Low"].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Owner</label>
                <input value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))}
                  placeholder="Full name"
                  className="mt-1 w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-indigo" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Due Date</label>
                <input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))}
                  className="mt-1 w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-indigo" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="flex-1 bg-indigo text-white rounded px-4 py-2.5 font-semibold text-sm hover:bg-indigo/90 disabled:opacity-60 flex items-center justify-center gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {saving ? "Creating…" : "Create Action"}
              </button>
              <button type="button" onClick={onClose}
                className="border border-border rounded px-4 py-2.5 font-semibold text-sm hover:bg-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function MetricCard({ icon, iconBg, value, label }: { icon: React.ReactNode; iconBg: string; value: string; label: string }) {
  return (
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-4 flex items-start gap-3">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", iconBg)}>{icon}</div>
      <div>
        <span className="text-2xl font-bold leading-none text-foreground">{value}</span>
        <span className="block text-xs font-medium text-muted-foreground mt-1.5">{label}</span>
      </div>
    </div>
  );
}
