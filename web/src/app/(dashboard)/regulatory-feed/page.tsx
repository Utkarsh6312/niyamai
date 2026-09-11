"use client";
import {
  Search, ChevronRight, Settings, Plus, FileText, Bookmark, MoreVertical,
  Calendar, Building, Globe, Clock, X, Scale, Loader2, Play, ListOrdered
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect, useCallback } from "react";
import { RiskBadge, StatusBadge } from "@/components/ui/badges";
import { api } from "@/lib/api/client";
import type { Regulation, Clause } from "@/lib/types";
import { toast } from "sonner";

export default function RegulatoryFeed() {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [clausesLoading, setClausesLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [regulatorFilter, setRegulatorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const regs = await api.regulations();
      setRegulations(regs);
      if (regs.length > 0) {
        setSelectedEventId(regs[0].id);
      }
    } catch {
      // Offline or error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const selectedEvent = useMemo(() => regulations.find(r => r.id === selectedEventId), [regulations, selectedEventId]);

  useEffect(() => {
    if (selectedEventId) {
      setClausesLoading(true);
      api.regulationClauses(selectedEventId)
        .then(setClauses)
        .catch(() => setClauses([]))
        .finally(() => setClausesLoading(false));
    }
  }, [selectedEventId]);

  const filtered = useMemo(() => {
    return regulations.filter(r => {
      if (regulatorFilter && r.regulator !== regulatorFilter) return false;
      if (statusFilter && r.status !== statusFilter) return false;
      if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.reference_number.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [regulations, search, regulatorFilter, statusFilter]);

  const newCount = regulations.filter(r => r.status === "New" || r.status === "Processing").length;
  const actionReq = regulations.filter(r => r.status === "Action Required").length;
  const sources = new Set(regulations.map(r => r.regulator)).size;

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-6rem)] -m-6 p-6">
      {/* Header */}
      <div className="shrink-0 space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-indigo">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Regulatory Feed</span>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight">Regulatory Intelligence Feed</h1>
            <p className="text-muted-foreground mt-1 text-base">Stay updated with the latest regulatory developments from trusted sources.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => toast.info("Opening Source Preferences...")} className="flex items-center gap-2 px-4 py-2 border border-indigo text-indigo bg-background rounded-md font-medium text-sm hover:bg-indigo/5 transition-colors">
              <Settings className="w-4 h-4" /> Source Preferences
            </button>
            <Link href="/impact-analysis" className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md font-medium text-sm hover:bg-indigo/90 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Ingest Regulation
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <MetricCard icon={<FileText className="w-6 h-6 text-indigo" />} iconBg="bg-indigo/10" value={loading ? "…" : String(regulations.length)} label="Total Regulations" />
          <MetricCard icon={<FileText className="w-6 h-6 text-purple-600" />} iconBg="bg-purple-100" value={loading ? "…" : String(newCount)} label="New / Processing" />
          <MetricCard icon={<Calendar className="w-6 h-6 text-red" />} iconBg="bg-red/10 border border-red/20" value={loading ? "…" : String(actionReq)} label="Action Required" />
          <MetricCard icon={<Building className="w-6 h-6 text-blue-600" />} iconBg="bg-blue-100" value={loading ? "…" : String(sources)} label="Unique Sources" />
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        
        {/* Left List */}
        <div className={`flex-1 flex flex-col bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] ${selectedEventId ? "hidden lg:flex" : ""}`}>
          <div className="p-0 border-b border-border flex flex-col shrink-0">
            <div className="flex items-center justify-end gap-3 px-4 py-3 border-t border-border mt-2">
               <select value={regulatorFilter} onChange={e => setRegulatorFilter(e.target.value)} className="bg-background border border-border rounded px-2 py-1.5 text-xs outline-none text-muted-foreground font-medium">
                 <option value="">All Sources</option>
                 {[...new Set(regulations.map(r => r.regulator))].map(r => <option key={r} value={r}>{r}</option>)}
               </select>
               <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-background border border-border rounded px-2 py-1.5 text-xs outline-none text-muted-foreground font-medium">
                 <option value="">All Statuses</option>
                 {["New", "Processing", "Analyzed", "Action Required", "Reviewed", "Archived"].map(r => <option key={r} value={r}>{r}</option>)}
               </select>
               <div className="relative">
                 <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                 <input type="text" placeholder="Search feed..." value={search} onChange={e => setSearch(e.target.value)} className="w-48 pl-8 pr-3 py-1.5 text-xs border border-border rounded bg-background focus:outline-none focus:border-indigo" />
               </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-foreground font-bold bg-background uppercase tracking-wider sticky top-0 z-10 border-b border-border shadow-sm">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3">Effective Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {loading ? (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground"><Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />Loading regulations…</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">No regulations found.</td></tr>
                ) : filtered.map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedEventId(row.id)}
                    className={`cursor-pointer transition-colors ${selectedEventId === row.id ? "bg-indigo/5" : "hover:bg-secondary/30"}`}
                  >
                    <td className="px-4 py-4 min-w-[300px]">
                      <div className="flex gap-3 items-start">
                        <div className={`mt-0.5 p-1.5 rounded ${row.status === 'Action Required' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} shrink-0`}>
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-foreground truncate">{row.title}</span>
                          <span className="text-[10px] text-muted-foreground mt-0.5 truncate">{row.reference_number}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 border border-border font-bold text-[10px]">
                          {row.regulator.slice(0,3)}
                        </div>
                        <span className="font-bold text-xs">{row.regulator}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-muted-foreground">{row.category}</td>
                    <td className="px-4 py-4 text-center">
                       <StatusBadge status={row.status} />
                    </td>
                    <td className="px-4 py-4">
                       <span className="text-xs text-foreground font-medium">{row.effective_date || "Not specified"}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                       <div className="flex items-center justify-end gap-2 text-muted-foreground">
                          <button onClick={(e) => { e.stopPropagation(); toast.success("Regulation bookmarked!"); }} className="hover:text-indigo transition-colors p-1"><Bookmark className="w-4 h-4" /></button>
                          <button onClick={(e) => { e.stopPropagation(); toast.info("More options menu opened"); }} className="hover:text-foreground transition-colors p-1"><MoreVertical className="w-4 h-4" /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-border bg-card shrink-0 flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {filtered.length} of {regulations.length} updates</span>
          </div>
        </div>

        {/* Right Panel (Details) */}
        {selectedEvent && (
          <div className="w-full lg:w-[450px] bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex flex-col overflow-hidden shrink-0">
            <div className="p-6 border-b border-border relative shrink-0">
              <button onClick={() => setSelectedEventId("")} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
              
              <div className="flex gap-3 items-start mb-4 pr-6">
                 <div className="p-2 rounded bg-indigo/10 text-indigo shrink-0 mt-1"><FileText className="w-5 h-5" /></div>
                 <div>
                    <h2 className="font-serif font-bold text-lg leading-tight mb-1">{selectedEvent.title}</h2>
                    <p className="text-sm text-muted-foreground">{selectedEvent.regulator}</p>
                 </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                    <StatusBadge status={selectedEvent.status} />
                 </div>
                 <span className="text-xs text-muted-foreground font-mono">Pub: {selectedEvent.publication_date || "N/A"}</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              <div>
                 <h3 className="font-bold text-base mb-2">Overview</h3>
                 <p className="text-sm text-foreground leading-relaxed">
                    {selectedEvent.summary || "No summary available."}
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <MetadataCard icon={Calendar} title="Effective Date" value={selectedEvent.effective_date || "—"} />
                 <MetadataCard icon={Scale} title="Reference No." value={selectedEvent.reference_number || "—"} />
                 <MetadataCard icon={FileText} title="Obligations" value={String(selectedEvent.obligations_count || 0)} />
                 <MetadataCard icon={ListOrdered} title="Clauses" value={String(selectedEvent.clauses_count || 0)} />
              </div>

              <div>
                 <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                   Extracted Clauses
                   {clausesLoading && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
                 </h3>
                 <div className="space-y-3">
                   {clauses.length === 0 && !clausesLoading ? (
                     <div className="text-sm text-muted-foreground">No clauses extracted yet.</div>
                   ) : (
                     clauses.map((c) => (
                        <div key={c.id} className="text-sm border border-border p-3 rounded bg-secondary/20">
                          <div className="font-bold mb-1">Clause {c.clause_no} {c.heading ? `— ${c.heading}` : ""}</div>
                          <div className="text-muted-foreground text-xs line-clamp-3">{c.text}</div>
                        </div>
                     ))
                   )}
                 </div>
              </div>

            </div>

            <div className="p-4 border-t border-border bg-card flex gap-3 shrink-0">
               {selectedEvent.status === "New" || selectedEvent.status === "Processing" ? (
                 <Link href="/impact-analysis" className="flex-1 bg-indigo text-white font-medium text-sm py-2 rounded shadow-sm hover:bg-indigo/90 transition-colors flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" /> Start AI Analysis
                 </Link>
               ) : (
                 <Link href="/impact-analysis" className="flex-1 bg-indigo text-white font-medium text-sm py-2 rounded shadow-sm hover:bg-indigo/90 transition-colors flex items-center justify-center gap-2">
                    View Impact Analysis <ChevronRight className="w-4 h-4" />
                 </Link>
               )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function MetricCard({ icon, iconBg, value, label }: any) {
  return (
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>{icon}</div>
      <div>
        <div className="flex items-baseline gap-2"><h3 className="text-2xl font-bold">{value}</h3></div>
        <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

function MetadataCard({ icon: Icon, title, value }: any) {
   return (
      <div className="border-[3px] border-black rounded-none p-3 bg-card flex items-start gap-3 shadow-[5px_5px_0_0_#000000] hover:border-black transition-colors">
         <div className="w-8 h-8 rounded bg-indigo/10 text-indigo flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4" />
         </div>
         <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">{title}</span>
            <span className="text-sm font-bold text-foreground truncate">{value}</span>
         </div>
      </div>
   )
}
