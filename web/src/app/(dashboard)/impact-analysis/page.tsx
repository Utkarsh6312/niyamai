"use client";
import { RiskBadge, StatusBadge } from "@/components/ui/badges";
import {
  Search, ChevronRight, Upload, Sparkles, FileText, ListOrdered,
  AlertTriangle, Users, Filter, MoreVertical, CheckCircle2, Info,
  ArrowUpRight, Loader2, TrendingUp, X
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";
import { api } from "@/lib/api/client";
import { toast } from "sonner";
import type { Obligation, Regulation } from "@/lib/types";

const IMPACT_COLORS: Record<string, string> = {
  Critical: "#ef4444",
  High: "#f97316",
  Medium: "#eab308",
  Low: "#14b8a6",
};

const DEPT_COLORS = ["#9B8CFA", "#4969E8", "#38BDF8", "#16A394", "#FACC15", "#F472B6"];

export default function ImpactAnalysis() {
  const [obligations, setObligations] = useState<Obligation[]>([]);
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showUpload, setShowUpload] = useState(false);

  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterImpact, setFilterImpact] = useState("");
  const [filterReg, setFilterReg] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [obs, regs] = await Promise.all([
        api.obligations({ limit: 100 }),
        api.regulations({ limit: 5 }),
      ]);
      setObligations(obs);
      setRegulations(regs);
    } catch {
      toast.error("Failed to load obligations. Backend offline.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Derived stats
  const filtered = useMemo(() => {
    return obligations.filter(o => {
      if (filterDept && o.department !== filterDept) return false;
      if (filterImpact && o.impact !== filterImpact) return false;
      if (filterReg && o.regulation_id !== filterReg) return false;
      if (search && !o.requirement.toLowerCase().includes(search.toLowerCase()) &&
        !o.obligation_code.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [obligations, search, filterDept, filterImpact, filterReg]);

  const stats = useMemo(() => {
    const regsCount = new Set(filtered.map(o => o.regulation_id)).size;
    const highImpact = filtered.filter(o => o.impact === "Critical" || o.impact === "High").length;
    const depts = new Set(filtered.map(o => o.department)).size;

    const donut = [
      { name: "Critical", value: filtered.filter(o => o.impact === "Critical").length, color: IMPACT_COLORS.Critical },
      { name: "High", value: filtered.filter(o => o.impact === "High").length, color: IMPACT_COLORS.High },
      { name: "Medium", value: filtered.filter(o => o.impact === "Medium").length, color: IMPACT_COLORS.Medium },
      { name: "Low", value: filtered.filter(o => o.impact === "Low").length, color: IMPACT_COLORS.Low },
    ].filter(d => d.value > 0);

    const deptCounts: Record<string, number> = {};
    filtered.forEach(o => { deptCounts[o.department] = (deptCounts[o.department] || 0) + 1; });
    const bar = Object.entries(deptCounts)
      .map(([name, obligations]) => ({ name, obligations }))
      .sort((a, b) => b.obligations - a.obligations)
      .slice(0, 6); // Top 6

    return { regsCount, highImpact, depts, donut, bar };
  }, [filtered]);

  const steps = [
    "UPLOADING DOCUMENT",
    "EXTRACTING TEXT",
    "UNDERSTANDING CLAUSES",
    "EXTRACTING OBLIGATIONS",
    "RETRIEVING POLICIES",
    "MAPPING & GAPS",
    "GENERATING ACTIONS",
  ];

  const handleUpload = async (formData: FormData) => {
    setShowUpload(false);
    setAnalyzing(true);
    setAnalysisStep(0);
    try {
      const res = await api.uploadRegulation(formData);
      // Poll job status
      const poll = setInterval(async () => {
        try {
          const job = await api.ingestJob(res.job_id);
          const stageMap: Record<string, number> = {
            "document": 1, "understand": 2, "extract": 3,
            "retrieve": 4, "map": 5, "assess": 5, "act": 6
          };
          if (job.current_stage) {
            setAnalysisStep(stageMap[job.current_stage] || 1);
          }
          if (job.status === "Completed") {
            clearInterval(poll);
            setAnalysisStep(6);
            setTimeout(() => {
              setAnalyzing(false);
              loadData(); // Refresh data
              toast.success("Analysis complete", { description: "Regulation fully mapped." });
            }, 1000);
          } else if (job.status === "Failed") {
            clearInterval(poll);
            setAnalyzing(false);
            toast.error("Pipeline failed", { description: job.error_message || "Unknown error" });
          }
        } catch {
          clearInterval(poll);
          setAnalyzing(false);
        }
      }, 2000);
    } catch (e: any) {
      setAnalyzing(false);
      toast.error("Upload failed", { description: e.message });
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full relative pb-8">
      {analyzing && (
        <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-8 max-w-md w-full flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-indigo animate-spin mb-6" />
            <h3 className="text-lg font-bold font-mono tracking-widest text-indigo mb-8 text-center">{steps[analysisStep]}</h3>
            <div className="w-full space-y-3">
              {steps.map((step, i) => (
                <div key={i} className={`flex items-center gap-3 text-sm font-mono ${i < analysisStep ? "text-teal" : i === analysisStep ? "text-foreground font-bold" : "text-muted-foreground opacity-50"}`}>
                  {i < analysisStep ? <CheckCircle2 className="w-4 h-4" /> : i === analysisStep ? <div className="w-4 h-4 border-2 border-indigo border-t-transparent rounded-full animate-spin" /> : <div className="w-4 h-4 rounded-full border border-muted-foreground" />}
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-indigo">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Impact Analysis</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Impact Analysis</h1>
          <p className="text-muted-foreground mt-1 text-base">Understand the impact of new and existing regulations on your organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md font-medium text-sm hover:bg-indigo/90 transition-colors shadow-md shadow-indigo/20">
            <Upload className="w-4 h-4" /> Ingest Regulation
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Content Area */}
        <div className="flex-1 space-y-6 min-w-0">

          {/* Metrics Cards */}
          <div className="grid grid-cols-4 gap-4">
            <MetricCard icon={<FileText className="w-6 h-6 text-indigo" />} iconBg="bg-indigo/10"
              value={loading ? "…" : String(stats.regsCount)} label="Regulations" />
            <MetricCard icon={<ListOrdered className="w-6 h-6 text-indigo" />} iconBg="bg-indigo/10"
              value={loading ? "…" : String(filtered.length)} label="Obligations Identified" />
            <MetricCard icon={<AlertTriangle className="w-6 h-6 text-red" />} iconBg="bg-red/10 border border-red/20"
              value={loading ? "…" : String(stats.highImpact)} label="High Impact Areas" />
            <MetricCard icon={<Users className="w-6 h-6 text-indigo" />} iconBg="bg-indigo/10"
              value={loading ? "…" : String(stats.depts)} label="Departments Affected" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Impact Overview (Donut) */}
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-6 flex flex-col">
              <div className="mb-6">
                <h3 className="font-serif font-bold text-lg">Impact Overview</h3>
                <p className="text-xs text-muted-foreground mt-1">Distribution of regulatory impacts</p>
              </div>

              {!loading && filtered.length > 0 ? (
                <div className="flex-1 flex items-center justify-between">
                  <div className="h-48 w-48 relative shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={stats.donut} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                          {stats.donut.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-3xl font-bold">{filtered.length}</span>
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider text-center leading-tight mt-1">Total</span>
                    </div>
                  </div>
                  <div className="flex-1 ml-6 space-y-4">
                    {stats.donut.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold w-4 text-right">{item.value}</span>
                          <span className="text-sm text-muted-foreground w-10 text-right">{Math.round((item.value / filtered.length) * 100)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm font-medium">No data</div>
              )}
            </div>

            {/* Departments Affected (Bar) */}
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-6 flex flex-col">
              <div className="mb-6">
                <h3 className="font-serif font-bold text-lg">Departments Affected</h3>
                <p className="text-xs text-muted-foreground mt-1">Obligations by department</p>
              </div>
              {!loading && filtered.length > 0 ? (
                <div className="flex-1 flex flex-col justify-center space-y-4">
                  {stats.bar.map((item, i) => {
                    const max = Math.max(...stats.bar.map(b => b.obligations));
                    return (
                      <div key={item.name} className="flex items-center gap-4">
                        <div className="w-32 shrink-0 text-xs font-medium truncate" title={item.name}>{item.name}</div>
                        <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full`} style={{ backgroundColor: DEPT_COLORS[i % DEPT_COLORS.length], width: `${(item.obligations / max) * 100}%` }} />
                        </div>
                        <div className="w-6 text-xs font-bold text-right">{item.obligations}</div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm font-medium">No data</div>
              )}
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex flex-col pb-4">
            <div className="p-4 border-b border-border flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" placeholder="Search requirements..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-sm border border-border rounded bg-background focus:outline-none focus:border-indigo" />
                </div>
                <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none">
                  <option value="">All Departments</option>
                  {[...new Set(obligations.map(o => o.department))].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select value={filterImpact} onChange={e => setFilterImpact(e.target.value)} className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none">
                  <option value="">All Impacts</option>
                  {["Critical", "High", "Medium", "Low"].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <button onClick={() => { setSearch(""); setFilterDept(""); setFilterImpact(""); }} className="text-indigo text-sm font-medium hover:underline ml-2">Clear Filters</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-foreground font-bold bg-secondary/30">
                  <tr>
                    <th className="px-4 py-3">Code / Type</th>
                    <th className="px-4 py-3">Regulation</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3 text-center">Impact</th>
                    <th className="px-4 py-3 w-[280px]">Requirement</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-medium text-sm">
                  {loading ? (
                    <tr><td colSpan={7} className="py-12 text-center text-muted-foreground"><Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />Loading...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={7} className="py-12 text-center text-muted-foreground">No obligations found</td></tr>
                  ) : (
                    filtered.map((row) => (
                      <tr key={row.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-4">
                          <span className="font-mono text-indigo block">{row.obligation_code}</span>
                          <span className="text-xs text-muted-foreground">{row.type}</span>
                        </td>
                        <td className="px-4 py-4 text-xs">
                          {row.regulation_title || "—"}
                          {row.clause_no && <span className="block text-muted-foreground mt-1">Cl. {row.clause_no}</span>}
                        </td>
                        <td className="px-4 py-4">{row.department}</td>
                        <td className="px-4 py-4 text-center"><RiskBadge level={row.impact} /></td>
                        <td className="px-4 py-4 text-xs font-normal text-muted-foreground leading-relaxed line-clamp-3">{row.requirement}</td>
                        <td className="px-4 py-4"><StatusBadge status={row.status} /></td>
                        <td className="px-4 py-4 text-right">
                          <Link href={`/regulatory-trace`} className="text-xs text-indigo font-semibold hover:underline">Trace →</Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[320px] shrink-0 space-y-6">
          {/* Recent Analysis */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-serif font-bold">Recent Regulations</h3>
              <Link href="/regulatory-feed" className="text-indigo text-xs font-semibold hover:underline">View All</Link>
            </div>
            <div className="space-y-2">
              {regulations.map((reg) => (
                <div key={reg.id} className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-3 flex gap-3 hover:border-indigo/30 transition-colors">
                  <div className="mt-0.5 p-1.5 rounded bg-indigo/10 text-indigo shrink-0"><FileText className="w-4 h-4" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{reg.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${reg.status === "Action Required" ? "bg-red-500" : "bg-teal-500"}`} />
                      <span className="text-[10px] text-muted-foreground">{reg.status} • {reg.obligations_count} obs</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-serif font-bold">Key Insights</h3>
            </div>
            <div className="space-y-4 bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-4 ">
              <div className="flex gap-3 items-start pb-3 border-b border-border">
                <div className="p-1.5 rounded bg-red-100 text-red-600 shrink-0 mt-0.5"><AlertTriangle className="w-4 h-4" /></div>
                <p className="text-sm font-medium">{stats.highImpact} high-impact obligations require immediate attention.</p>
              </div>
              <div className="flex gap-3 items-start pb-3 border-b border-border">
                <div className="p-1.5 rounded bg-indigo/10 text-indigo shrink-0 mt-0.5"><Users className="w-4 h-4" /></div>
                <p className="text-sm font-medium">{stats.bar[0]?.name || 'Top'} department is most affected.</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded bg-teal/10 text-teal shrink-0 mt-0.5"><TrendingUp className="w-4 h-4" /></div>
                <p className="text-sm font-medium">Compliance pipeline generated AI traces for all obligations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} onUpload={handleUpload} />}
    </div>
  );
}

function MetricCard({ icon, iconBg, value, label }: any) {
  return (
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex gap-4 h-full">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>{icon}</div>
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold leading-none">{value}</h3>
        <span className="text-xs font-semibold text-muted-foreground mt-2">{label}</span>
      </div>
    </div>
  );
}

function UploadModal({ onClose, onUpload }: { onClose: () => void, onUpload: (fd: FormData) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [regulator, setRegulator] = useState("RBI");
  const [ref, setRef] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", title);
    fd.append("regulator", regulator);
    fd.append("reference_number", ref);
    fd.append("category", "General");
    onUpload(fd);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-card border-[3px] border-black shadow-[5px_5px_0_0_#000000] max-w-md w-full">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-serif font-bold text-lg">Ingest New Regulation</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground hover:text-foreground" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Document (PDF/DOCX) *</label>
            <input required type="file" accept=".pdf,.docx" onChange={e => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm border border-border p-2 rounded" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Title *</label>
            <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Master Direction on IT Framework"
              className="w-full text-sm border border-border p-2 rounded bg-background" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Regulator *</label>
              <input required value={regulator} onChange={e => setRegulator(e.target.value)}
                className="w-full text-sm border border-border p-2 rounded bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Reference No.</label>
              <input value={ref} onChange={e => setRef(e.target.value)} placeholder="RBI/2026/..."
                className="w-full text-sm border border-border p-2 rounded bg-background" />
            </div>
          </div>
          <div className="pt-2">
            <button type="submit" disabled={!file || !title}
              className="w-full bg-indigo text-white font-bold text-sm py-2.5 rounded hover:bg-indigo/90 disabled:opacity-50">
              Start AI Analysis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
