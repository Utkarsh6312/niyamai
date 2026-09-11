"use client";

import { FileText, AlertTriangle, FileStack, CheckSquare, PieChart, Download, ArrowUp, ArrowDown, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell
} from "recharts";
import { api } from "@/lib/api/client";
import type { DashboardSummary, RiskSnapshot, RecentActivity, Regulation } from "@/lib/types";

// Static trend data (chart stays illustrative — real trend needs time-series DB)
const trendData = [
  { date: "Aug 10", changes: 15, policies: 8, actions: 5 },
  { date: "Aug 15", changes: 30, policies: 18, actions: 12 },
  { date: "Aug 20", changes: 45, policies: 32, actions: 20 },
  { date: "Aug 25", changes: 72, policies: 48, actions: 36 },
  { date: "Aug 30", changes: 70, policies: 50, actions: 38 },
  { date: "Sep 02", changes: 85, policies: 55, actions: 42 },
  { date: "Sep 07", changes: 88, policies: 58, actions: 45 },
  { date: "Sep 09", changes: 95, policies: 62, actions: 50 },
];

const deptImpact = [
  { name: "Compliance", policies: 18, actions: 12 },
  { name: "KYC", policies: 15, actions: 11 },
  { name: "Operations", policies: 12, actions: 9 },
  { name: "IT", policies: 10, actions: 8 },
  { name: "Cybersecurity", policies: 9, actions: 7 },
  { name: "Risk", policies: 8, actions: 6 },
  { name: "Legal", policies: 6, actions: 5 },
];

const RISK_COLORS: Record<string, string> = {
  Critical: "#ef4444",
  High: "#f97316",
  Medium: "#eab308",
  Low: "#14b8a6",
};

const STATUS_COLORS: Record<string, string> = {
  "Action Required": "text-red-500 border-red-500/30 bg-red-500/10",
  "Analyzed": "text-teal-500 border-teal-500/30 bg-teal-500/10",
  "New": "text-blue-400 border-blue-400/30 bg-blue-400/10",
  "Processing": "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
  "Reviewed": "text-green-500 border-green-500/30 bg-green-500/10",
  "Archived": "text-slate-400 border-slate-400/30 bg-slate-400/10",
};

export default function Home() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [riskSnap, setRiskSnap] = useState<RiskSnapshot | null>(null);
  const [activity, setActivity] = useState<RecentActivity[]>([]);
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, r, a, regs] = await Promise.all([
        api.dashboardSummary(),
        api.riskSnapshot(),
        api.recentActivity(8),
        api.regulations({ limit: 5 }),
      ]);
      setSummary(s);
      setRiskSnap(r);
      setActivity(a);
      setRegulations(regs);
    } catch (e: any) {
      setError("Backend offline — showing cached data. Start the backend with: uvicorn app.main:app --reload");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const pieData = riskSnap
    ? [
        { name: "Critical", value: riskSnap.critical, color: RISK_COLORS.Critical },
        { name: "High", value: riskSnap.high, color: RISK_COLORS.High },
        { name: "Medium", value: riskSnap.medium, color: RISK_COLORS.Medium },
        { name: "Low", value: riskSnap.low, color: RISK_COLORS.Low },
      ]
    : [
        { name: "Critical", value: 3, color: RISK_COLORS.Critical },
        { name: "High", value: 8, color: RISK_COLORS.High },
        { name: "Medium", value: 12, color: RISK_COLORS.Medium },
        { name: "Low", value: 5, color: RISK_COLORS.Low },
      ];

  const totalRisks = pieData.reduce((a, b) => a + b.value, 0);

  return (
    <div className="space-y-6 flex flex-col h-full text-foreground pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">AAROHAN BANK</p>
          <h1 className="font-serif text-4xl font-bold tracking-tight mb-2">Regulatory Overview</h1>
          <p className="text-muted-foreground text-sm">Monitor regulatory changes, policy impact and compliance actions across Aarohan Bank.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 border border-border px-3 py-2 rounded text-sm hover:bg-secondary/20 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button className="flex items-center gap-2 bg-indigo hover:bg-indigo/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
            <Download className="w-4 h-4" /> Generate Report
          </button>
        </div>
      </div>

      {/* Backend offline notice */}
      {error && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 text-sm text-amber-400">
          ⚠ {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <MetricCard
          icon={<FileText className="w-5 h-5 text-blue-400" />} iconBg="bg-blue-400/10"
          value={loading ? "…" : String(summary?.new_regulations ?? 5)}
          label="New Regulations"
          sub={<span className="text-muted-foreground">Awaiting analysis</span>}
        />
        <MetricCard
          icon={<AlertTriangle className="w-5 h-5 text-red" />} iconBg="bg-red/10"
          value={loading ? "…" : String(summary?.critical_gaps ?? 3)}
          label="Critical Gaps"
          sub={<><div className="w-2 h-2 rounded-sm bg-red mr-1" /><span className="text-red font-medium">Needs review</span></>}
        />
        <MetricCard
          icon={<FileStack className="w-5 h-5 text-purple-400" />} iconBg="bg-purple-400/10"
          value={loading ? "…" : String(summary?.policies_impacted ?? 0)}
          label="Policies Impacted"
          sub={<span className="text-muted-foreground">From active mappings</span>}
        />
        <MetricCard
          icon={<CheckSquare className="w-5 h-5 text-teal-400" />} iconBg="bg-teal-400/10"
          value={loading ? "…" : String(summary?.open_actions ?? 0)}
          label="Open Actions"
          sub={<><ArrowUp className="w-3 h-3 text-red-400" /><span className="text-red-400 font-medium">Requires attention</span></>}
        />
        <MetricCard
          icon={<PieChart className="w-5 h-5 text-teal-300" />} iconBg="bg-teal-300/10"
          value={loading ? "…" : String(summary?.active_obligations ?? 0)}
          label="Active Obligations"
          sub={<span className="text-muted-foreground">Across all regulations</span>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Trend Chart */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]">
            <div className="p-5 border-b border-border flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
              <h2 className="font-serif text-lg font-bold">Regulatory Impact Trend</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Regulatory changes</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-teal-400" /> Policies impacted</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-400" /> Actions generated</div>
              </div>
            </div>
            <div className="h-[300px] p-5">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#132238", borderColor: "#ffffff20", borderRadius: "8px" }}
                    itemStyle={{ fontSize: "12px" }}
                    labelStyle={{ color: "#fff", fontWeight: "bold", marginBottom: "8px" }}
                  />
                  <Line type="monotone" dataKey="changes" name="Regulatory changes" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: "#3b82f6" }} />
                  <Line type="monotone" dataKey="policies" name="Policies impacted" stroke="#2dd4bf" strokeWidth={2} dot={{ r: 3, fill: "#2dd4bf" }} />
                  <Line type="monotone" dataKey="actions" name="Actions generated" stroke="#fb923c" strokeWidth={2} dot={{ r: 3, fill: "#fb923c" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Regulations Table */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="font-serif text-lg font-bold">Recent Regulations</h2>
              <Link href="/regulatory-feed" className="text-blue-400 text-sm hover:underline flex items-center">
                View All <span className="ml-1">→</span>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[600px]">
                <thead className="text-muted-foreground border-b border-border bg-secondary/10">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Regulation</th>
                    <th className="px-5 py-3 font-semibold">Regulator</th>
                    <th className="px-5 py-3 font-semibold">Effective</th>
                    <th className="px-5 py-3 font-semibold">Obligations</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr><td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">Loading…</td></tr>
                  ) : regulations.length === 0 ? (
                    <tr><td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">No regulations found. Start the backend and run the seed script.</td></tr>
                  ) : (
                    regulations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-secondary/10 transition-colors cursor-pointer">
                        <td className="px-5 py-4">
                          <Link href={`/regulatory-feed`} className="font-medium text-foreground hover:text-indigo transition-colors line-clamp-1">{reg.title}</Link>
                        </td>
                        <td className="px-5 py-4 text-muted-foreground">{reg.regulator}</td>
                        <td className="px-5 py-4 text-muted-foreground">{reg.effective_date || "—"}</td>
                        <td className="px-5 py-4 font-mono text-sm">{reg.obligations_count ?? 0}</td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 text-xs rounded border ${STATUS_COLORS[reg.status] || "text-slate-400 border-slate-400/30 bg-slate-400/10"}`}>
                            {reg.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          {activity.length > 0 && (
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]">
              <div className="p-5 border-b border-border">
                <h2 className="font-serif text-lg font-bold">Recent Activity</h2>
              </div>
              <div className="divide-y divide-border">
                {activity.map((a) => (
                  <div key={a.id} className="px-5 py-3 flex items-center gap-3 text-sm hover:bg-secondary/10 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-indigo shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="font-medium">{a.event}</span>
                      {a.source_document && <span className="text-muted-foreground"> — {a.source_document}</span>}
                    </div>
                    <div className="text-muted-foreground text-xs shrink-0">
                      {new Date(a.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Risk Distribution */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="font-serif text-lg font-bold">Risk Distribution</h2>
              <Link href="/risk-heatmap" className="text-blue-400 text-xs hover:underline">View →</Link>
            </div>
            <div className="p-5 flex items-center gap-4">
              <div className="w-[140px] h-[140px] relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={0} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-foreground">{totalRisks}</span>
                  <span className="text-[10px] text-muted-foreground">Risks</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-bold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department Impact */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="font-serif text-lg font-bold">Department Impact</h2>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Policies</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-teal-400" /> Actions</div>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {deptImpact.map((dept) => {
                const maxTotal = 30;
                return (
                  <div key={dept.name} className="flex items-center text-sm">
                    <div className="w-28 text-muted-foreground truncate pr-2">{dept.name}</div>
                    <div className="flex-1 flex items-center h-4 bg-secondary/20 rounded-sm overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${(dept.policies / maxTotal) * 100}%` }} />
                      <div className="h-full bg-teal-400" style={{ width: `${(dept.actions / maxTotal) * 100}%` }} />
                    </div>
                    <div className="w-16 flex justify-end gap-3 font-mono text-xs ml-3">
                      <span className="text-foreground">{dept.policies}</span>
                      <span className="text-muted-foreground">{dept.actions}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5">
            <h2 className="font-serif text-lg font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/regulatory-feed" className="flex items-center justify-between p-3 rounded hover:bg-secondary/20 transition-colors text-sm font-medium group">
                View Regulatory Feed <span className="text-indigo group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
              <Link href="/impact-analysis" className="flex items-center justify-between p-3 rounded hover:bg-secondary/20 transition-colors text-sm font-medium group">
                Impact Analysis <span className="text-indigo group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
              <Link href="/action-center" className="flex items-center justify-between p-3 rounded hover:bg-secondary/20 transition-colors text-sm font-medium group">
                Action Center <span className="text-indigo group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
              <Link href="/regulatory-trace" className="flex items-center justify-between p-3 rounded hover:bg-secondary/20 transition-colors text-sm font-medium group">
                Regulatory Trace <span className="text-indigo group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, iconBg, value, label, sub }: any) {
  return (
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-4 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
          {icon}
        </div>
      </div>
      <span className="text-xs font-semibold text-muted-foreground mb-1 leading-tight line-clamp-2 h-8">{label}</span>
      <h3 className="text-3xl font-bold text-foreground mb-2">{value}</h3>
      <div className="flex items-center text-[11px]">{sub}</div>
    </div>
  );
}
