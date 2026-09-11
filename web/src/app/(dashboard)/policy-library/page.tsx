"use client";
import { useState, useEffect } from "react";
import { Search, ChevronRight, Plus, FileText, Book, Landmark, Users, Download, X, MoreVertical, ExternalLink, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { StatusBadge, RiskBadge } from "@/components/ui/badges";
import { api } from "@/lib/api/client";
import type { Policy } from "@/lib/types";

export default function PolicyLibrary() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocId, setSelectedDocId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await api.policies();
        setPolicies(data);
        if (data.length > 0) setSelectedDocId(data[0].id);
      } catch {
        // handle err
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const selectedDoc = policies.find(p => p.id === selectedDocId);

  const filtered = policies.filter(p => {
    if (filterDept && p.department !== filterDept) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.policy_code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 flex flex-col h-full min-h-[calc(100vh-8rem)]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-indigo">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Policy Library</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Policy Library</h1>
          <p className="text-muted-foreground mt-1 text-base">Browse, search and manage internal policies and guidance.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md font-medium text-sm hover:bg-indigo/90 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Policy
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard icon={<Book className="w-6 h-6 text-indigo" />} iconBg="bg-indigo/10" value={loading ? "…" : String(policies.length)} label="Total Policies" />
        <MetricCard icon={<Landmark className="w-6 h-6 text-indigo" />} iconBg="bg-indigo/10" value={loading ? "…" : String(policies.filter(p => p.status === 'Active').length)} label="Active Policies" />
        <MetricCard icon={<FileText className="w-6 h-6 text-green-600" />} iconBg="bg-green-100" value={loading ? "…" : String(policies.filter(p => p.status === 'Draft').length)} label="Drafts" />
        <MetricCard icon={<Users className="w-6 h-6 text-purple-600" />} iconBg="bg-purple-100" value={loading ? "…" : String(new Set(policies.map(p => p.department)).size)} label="Departments" />
      </div>

      {/* Main Content Area */}
      <div className="flex gap-6 flex-1 h-[600px] lg:h-[800px] min-h-[600px]">
        
        {/* Left List */}
        <div className={`flex-1 flex flex-col bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] overflow-hidden ${selectedDocId ? "hidden lg:flex" : ""}`}>
          <div className="p-4 border-b border-border flex items-center gap-3 overflow-x-auto no-scrollbar">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search by title, policy code..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-1.5 text-sm border border-border rounded bg-background focus:outline-none focus:border-indigo" />
            </div>
            <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none">
              <option value="">All Departments</option>
              {[...new Set(policies.map(p => p.department))].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <button onClick={() => {setSearch(""); setFilterDept("");}} className="text-indigo text-sm font-medium hover:underline ml-2">Clear</button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-[11px] text-foreground font-bold bg-secondary/30 uppercase tracking-wider sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3 min-w-[300px]">Policy Name</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Last Updated</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {loading ? (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground"><Loader2 className="w-5 h-5 animate-spin mx-auto mb-2"/>Loading policies...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">No policies found.</td></tr>
                ) : filtered.map((row) => (
                  <tr key={row.id} onClick={() => setSelectedDocId(row.id)} className={`cursor-pointer transition-colors ${selectedDocId === row.id ? "bg-indigo/5" : "hover:bg-secondary/30"}`}>
                    <td className="px-4 py-4 text-xs font-mono font-bold">{row.policy_code}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 rounded bg-green-100 text-green-700"><FileText className="w-4 h-4 shrink-0" /></div>
                        <div className="whitespace-normal">
                          <p className="font-semibold text-foreground line-clamp-1">{row.name}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">Version {row.version} • {row.document_type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs whitespace-nowrap">{row.department}</td>
                    <td className="px-4 py-4 text-xs whitespace-nowrap">{row.last_updated}</td>
                    <td className="px-4 py-4 whitespace-nowrap"><StatusBadge status={row.status} /></td>
                    <td className="px-4 py-4 text-right whitespace-nowrap"><button><MoreVertical className="w-4 h-4 text-muted-foreground hover:text-indigo" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {filtered.length} of {policies.length} policies</span>
          </div>
        </div>

        {/* Right Panel (Details) */}
        {selectedDoc && (
          <div className="w-full lg:w-[400px] border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex flex-col bg-card overflow-hidden shrink-0">
            <div className="p-6 border-b border-border relative">
              <div className="flex items-center gap-2 mb-4">
                 <div className="flex items-center justify-center bg-red-500 text-white rounded-sm w-7 h-8 relative">
                    <span className="text-[10px] font-bold">PDF</span>
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-white/20 rounded-bl-sm" />
                 </div>
                 <div>
                    <h2 className="font-serif text-lg font-bold leading-tight line-clamp-2 pr-6">{selectedDoc.name}</h2>
                    <p className="text-xs text-muted-foreground font-mono">{selectedDoc.policy_code} • v{selectedDoc.version}</p>
                 </div>
                 <button onClick={() => setSelectedDocId("")} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
              </div>

              <div className="flex items-center gap-3">
                 <button className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 bg-indigo text-white text-xs font-semibold rounded hover:bg-indigo/90">
                    <ExternalLink className="w-3.5 h-3.5" /> View Policy
                 </button>
                 <button className="flex items-center justify-center gap-2 px-3 py-1.5 border border-border text-foreground text-xs font-semibold rounded hover:bg-secondary">
                    <Download className="w-3.5 h-3.5" />
                 </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                 <h3 className="font-bold text-sm mb-3">Document Details</h3>
                 <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                       <span className="text-muted-foreground">Department</span>
                       <span className="font-medium">{selectedDoc.department}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-muted-foreground">Document Type</span>
                       <span className="font-medium">{selectedDoc.document_type}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-muted-foreground">Owner</span>
                       <span className="font-medium">{selectedDoc.owner}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-muted-foreground">Status</span>
                       <StatusBadge status={selectedDoc.status} />
                    </div>
                    <div className="flex justify-between">
                       <span className="text-muted-foreground">Last Updated</span>
                       <span className="font-medium">{selectedDoc.last_updated}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-muted-foreground">Next Review</span>
                       <span className="font-medium">{selectedDoc.next_review}</span>
                    </div>
                 </div>
              </div>

              <div className="bg-indigo/5 border border-indigo/20 p-4 rounded-lg">
                 <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-indigo" />
                    <h3 className="font-bold text-sm text-indigo">AI Analysis Status</h3>
                 </div>
                 <p className="text-xs text-foreground/80 mb-3">This policy has been ingested and mapped against regulatory obligations in the NiyamAI knowledge graph.</p>
                 <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-muted-foreground">Obligations Mapped</span>
                    <span className="bg-indigo text-white px-2 py-0.5 rounded-full">{selectedDoc.mapped_obligations_count || 0}</span>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ icon, iconBg, value, label }: any) {
  return (
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex items-center gap-4 h-full">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>{icon}</div>
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold leading-none">{value}</h3>
        <span className="text-xs font-semibold text-muted-foreground mt-2">{label}</span>
      </div>
    </div>
  );
}
