"use client";
import { Download, Plus, Search, Filter, ChevronLeft, ChevronRight, MoreVertical, FileText, AlertTriangle, FileCheck, FileQuestion, Calendar, X, Building, Link as LinkIcon, CheckCircle2, Clock, Lightbulb, ExternalLink, Bell, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { api } from "@/lib/api/client";
import type { Obligation } from "@/lib/types";
import { StatusBadge, RiskBadge } from "@/components/ui/badges";
import { toast } from "sonner";

export default function ObligationExplorer() {
  const [obligations, setObligations] = useState<Obligation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedObId, setSelectedObId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterImpact, setFilterImpact] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await api.obligations();
        setObligations(data);
        if (data.length > 0) setSelectedObId(data[0].id);
      } catch {
        // handle err
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const selectedOb = obligations.find(o => o.id === selectedObId);

  const filtered = obligations.filter(o => {
    if (filterDept && o.department !== filterDept) return false;
    if (filterImpact && o.impact !== filterImpact) return false;
    if (search && !o.requirement.toLowerCase().includes(search.toLowerCase()) && !o.obligation_code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-5 flex flex-col h-full text-foreground pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="mx-1">›</span>
        <span className="text-foreground">Obligation Explorer</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight mb-2">Obligations Explorer</h1>
          <p className="text-muted-foreground text-sm">Explore, search, and analyze your regulatory obligations across all applicable regulations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => toast.success("Export started: Obligations_Report.csv")} className="flex items-center gap-2 border border-indigo text-indigo px-4 py-2 rounded text-sm font-medium hover:bg-indigo/5 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => toast.info("Opening custom view builder...")} className="flex items-center gap-2 bg-indigo hover:bg-indigo/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" /> Custom View
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-indigo" />
          </div>
          <div>
            <p className="text-2xl font-bold">{loading ? "…" : obligations.length}</p>
            <p className="text-[11px] text-muted-foreground font-medium">Total Obligations</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-lg bg-red/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red" />
          </div>
          <div>
            <p className="text-2xl font-bold">{loading ? "…" : obligations.filter(o => o.impact === 'High').length}</p>
            <p className="text-[11px] text-muted-foreground font-medium">High Impact</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{loading ? "…" : obligations.filter(o => o.status === 'Compliant').length}</p>
            <p className="text-[11px] text-muted-foreground font-medium">Compliant</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <FileQuestion className="w-5 h-5 text-indigo" />
          </div>
          <div>
            <p className="text-2xl font-bold">{loading ? "…" : obligations.filter(o => o.status === 'Not Started').length}</p>
            <p className="text-[11px] text-muted-foreground font-medium">Not Started</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-indigo" />
          </div>
          <div>
            <p className="text-2xl font-bold">{loading ? "…" : obligations.filter(o => o.deadline).length}</p>
            <p className="text-[11px] text-muted-foreground font-medium">Have Deadlines</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 flex-1 min-h-0">
        
        {/* Left: Table Area */}
        <div className={`flex-1 flex flex-col min-w-0 space-y-4 ${selectedObId ? "hidden lg:flex" : ""}`}>
          
          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search obligations..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded text-sm outline-none focus:border-indigo" />
            </div>
            <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="bg-background border border-border px-3 py-2 rounded text-sm outline-none text-foreground">
              <option value="">Department</option>
              {[...new Set(obligations.map(o => o.department))].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={filterImpact} onChange={e => setFilterImpact(e.target.value)} className="bg-background border border-border px-3 py-2 rounded text-sm outline-none text-foreground">
              <option value="">Impact</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button onClick={() => {setSearch(""); setFilterDept(""); setFilterImpact("");}} className="flex items-center gap-2 text-indigo px-3 py-2 rounded text-sm hover:underline transition-colors bg-background">
              Clear
            </button>
          </div>

          {/* Table */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] overflow-hidden flex-1 flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-secondary/30 text-foreground border-b border-border sticky top-0">
                  <tr>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">ID</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider w-[35%]">Requirement</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Regulation</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Department</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Impact</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Loading obligations...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No obligations found.</td></tr>
                  ) : filtered.map((row) => (
                    <tr 
                      key={row.id} 
                      onClick={() => setSelectedObId(row.id)}
                      className={`cursor-pointer transition-colors ${selectedObId === row.id ? "bg-indigo/5" : "hover:bg-secondary/30"}`}
                    >
                      <td className="px-3 py-3 font-mono text-xs">{row.obligation_code}</td>
                      <td className="px-3 py-3 font-medium whitespace-normal line-clamp-2 min-w-[250px]">{row.requirement}</td>
                      <td className="px-3 py-3 text-xs text-muted-foreground whitespace-normal min-w-[150px]">{row.regulation_title}</td>
                      <td className="px-3 py-3 text-xs">{row.department}</td>
                      <td className="px-3 py-3"><RiskBadge level={row.impact} /></td>
                      <td className="px-3 py-3"><StatusBadge status={row.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination / Footer */}
            <div className="border-t border-border bg-card p-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Showing {filtered.length} of {obligations.length} obligations</span>
            </div>
          </div>
        </div>

        {/* Right: Detail View */}
        {selectedOb && (
          <div className="w-full lg:w-[450px] bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex flex-col overflow-hidden shrink-0">
            {/* Header */}
            <div className="p-5 border-b border-border bg-secondary/10 relative">
              <button onClick={() => setSelectedObId("")} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-background border border-border px-2 py-0.5 rounded text-[10px] font-bold text-muted-foreground uppercase">{selectedOb.obligation_code}</span>
                <StatusBadge status={selectedOb.status} />
                <RiskBadge level={selectedOb.impact} />
              </div>
              <h2 className="font-serif text-lg font-bold leading-tight mb-2 pr-6">
                {selectedOb.requirement}
              </h2>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* Context */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Department</p>
                  <p className="font-medium flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-muted-foreground" /> {selectedOb.department}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Type</p>
                  <p className="font-medium">{selectedOb.type}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Source Regulation</p>
                  <Link href={`/regulatory-feed`} className="font-medium text-indigo flex items-center gap-1.5 hover:underline">
                    <FileText className="w-3.5 h-3.5" /> {selectedOb.regulation_title}
                  </Link>
                </div>
                {selectedOb.clause_no && (
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground mb-1">Clause Number</p>
                    <p className="font-medium">Clause {selectedOb.clause_no}</p>
                  </div>
                )}
                {selectedOb.deadline && (
                   <div className="col-span-2">
                     <p className="text-xs text-muted-foreground mb-1">Deadline</p>
                     <p className="font-medium flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-orange-500" /> {selectedOb.deadline}</p>
                   </div>
                )}
              </div>

              {/* Policy Mapping Section */}
              <div className="border-t border-border pt-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm">Policy Mapping</h3>
                  <Link href={`/policy-mapping?obligationId=${selectedOb.id}`} className="text-indigo text-xs font-medium hover:underline flex items-center gap-1">
                    Manage Mapping <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
                
                {selectedOb.status === "Not Started" ? (
                  <div className="bg-amber-50 border border-amber-200 rounded p-4 text-center">
                    <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-amber-800">Unmapped Obligation</p>
                    <p className="text-xs text-amber-700 mt-1">This obligation has not been mapped to any internal policy yet.</p>
                    <Link href={`/policy-mapping?obligationId=${selectedOb.id}`} className="mt-3 inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-amber-600 transition-colors">Start Mapping</Link>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800 mb-1">Mapped successfully</p>
                        <p className="text-xs text-green-700 mb-2">Connected to internal policies via AI mapping.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Trace Section */}
              <div className="border-t border-border pt-5">
                <h3 className="font-bold text-sm mb-4">Provenance &amp; Actions</h3>
                <div className="space-y-3">
                   <Link href={`/regulatory-trace?obligationId=${selectedOb.id}`} className="flex items-center justify-between p-3 border border-border rounded hover:bg-secondary/30 transition-colors">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded bg-indigo/10 flex items-center justify-center shrink-0">
                         <LinkIcon className="w-4 h-4 text-indigo" />
                       </div>
                       <div>
                         <p className="text-sm font-medium">View Full Trace Graph</p>
                         <p className="text-xs text-muted-foreground">See the end-to-end provenance</p>
                       </div>
                     </div>
                     <ChevronRight className="w-4 h-4 text-muted-foreground" />
                   </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
