"use client";

import { Download, ChevronRight, ShieldAlert, AlertTriangle, BarChart3, TrendingDown, Building, Users, Briefcase, Scale, FileSearch, CreditCard, Landmark, ChevronRight as ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// --- Mock Data ---

const topRisks = [
  { risk: "KYC verification trigger missing", regulation: "RBI KYC Amendment", department: "KYC", severity: "Critical", severityColor: "bg-red text-white", dueDate: "28 Sep 2026" },
  { risk: "Digital lending customer protection", regulation: "RBI Digital Lending Update", department: "Operations", severity: "High", severityColor: "bg-orange-500 text-white", dueDate: "30 Sep 2026" },
  { risk: "Third-party risk assessment gap", regulation: "RBI IT Outsourcing", department: "IT", severity: "High", severityColor: "bg-orange-500 text-white", dueDate: "15 Oct 2026" },
  { risk: "Periodic review frequency mismatch", regulation: "RBI KYC Amendment", department: "Compliance", severity: "Medium", severityColor: "bg-yellow-500 text-white", dueDate: "10 Oct 2026" },
  { risk: "Incident reporting SLA update", regulation: "RBI Cyber Security", department: "Cybersecurity", severity: "Medium", severityColor: "bg-yellow-500 text-white", dueDate: "18 Oct 2026" },
];

const deptImpact = [
  { name: "KYC", value: 12, color: "bg-red" },
  { name: "Compliance", value: 10, color: "bg-red/80" },
  { name: "Operations", value: 8, color: "bg-orange-500" },
  { name: "IT", value: 7, color: "bg-orange-500/80" },
  { name: "Cybersecurity", value: 6, color: "bg-yellow-500" },
  { name: "Risk", value: 5, color: "bg-yellow-500/80" },
  { name: "Audit", value: 4, color: "bg-teal" },
  { name: "Credit", value: 3, color: "bg-teal/80" },
  { name: "Treasury", value: 2, color: "bg-teal/60" },
];

const riskTrendData = [
  { month: "Mar", critical: 8, high: 25, medium: 30, low: 15 },
  { month: "Apr", critical: 10, high: 28, medium: 35, low: 18 },
  { month: "May", critical: 7, high: 22, medium: 32, low: 20 },
  { month: "Jun", critical: 5, high: 20, medium: 28, low: 22 },
  { month: "Jul", critical: 6, high: 18, medium: 30, low: 20 },
  { month: "Aug", critical: 6, high: 12, medium: 31, low: 18 },
];

const orgNodes = [
  { name: "KYC", value: 18, x: 50, y: 15, color: "#ef4444", size: 48 },
  { name: "Compliance", value: 0, x: 18, y: 35, color: "#f97316", size: 40, icon: "users" },
  { name: "Operations", value: 12, x: 78, y: 30, color: "#f97316", size: 42 },
  { name: "Risk", value: 8, x: 20, y: 55, color: "#eab308", size: 36 },
  { name: "IT", value: 9, x: 80, y: 55, color: "#f97316", size: 38 },
  { name: "Audit", value: 4, x: 25, y: 75, color: "#14b8a6", size: 32 },
  { name: "Legal", value: 6, x: 35, y: 88, color: "#eab308", size: 35 },
  { name: "Treasury", value: 3, x: 55, y: 88, color: "#14b8a6", size: 30 },
  { name: "Cybersecurity", value: 10, x: 75, y: 75, color: "#f97316", size: 40 },
  { name: "Credit", value: 5, x: 70, y: 88, color: "#14b8a6", size: 33 },
];

// Heatmap scatter data: [likelihood, impact] both 0-4 scale
const heatmapDots = [
  { x: 0.5, y: 0.8, color: "#14b8a6" }, { x: 1.2, y: 1.0, color: "#14b8a6" }, { x: 0.8, y: 1.5, color: "#14b8a6" },
  { x: 1.5, y: 1.2, color: "#14b8a6" }, { x: 0.3, y: 2.0, color: "#eab308" }, { x: 1.0, y: 2.2, color: "#eab308" },
  { x: 1.8, y: 1.8, color: "#eab308" }, { x: 2.0, y: 1.5, color: "#eab308" }, { x: 1.5, y: 2.5, color: "#eab308" },
  { x: 2.2, y: 2.0, color: "#eab308" }, { x: 2.5, y: 1.2, color: "#eab308" }, { x: 2.0, y: 2.8, color: "#f97316" },
  { x: 2.5, y: 2.5, color: "#f97316" }, { x: 3.0, y: 2.0, color: "#f97316" }, { x: 2.8, y: 2.8, color: "#f97316" },
  { x: 3.2, y: 1.5, color: "#f97316" }, { x: 1.8, y: 3.0, color: "#f97316" }, { x: 2.0, y: 3.2, color: "#f97316" },
  { x: 3.0, y: 3.0, color: "#ef4444" }, { x: 3.5, y: 2.5, color: "#ef4444" }, { x: 2.5, y: 3.5, color: "#ef4444" },
  { x: 3.2, y: 3.2, color: "#ef4444" }, { x: 3.8, y: 3.0, color: "#ef4444" }, { x: 3.5, y: 3.8, color: "#ef4444" },
  { x: 1.2, y: 0.5, color: "#14b8a6" }, { x: 2.8, y: 0.8, color: "#14b8a6" }, { x: 0.5, y: 3.0, color: "#eab308" },
  { x: 3.8, y: 1.0, color: "#f97316" }, { x: 1.0, y: 3.5, color: "#f97316" }, { x: 3.5, y: 3.5, color: "#ef4444" },
];

const riskSummary = [
  { label: "Critical", color: "bg-red", count: "6 risks" },
  { label: "High", color: "bg-orange-500", count: "12 risks" },
  { label: "Medium", color: "bg-yellow-500", count: "31 risks" },
  { label: "Low", color: "bg-teal", count: "18 risks" },
];

export default function RiskHeatmap() {
  return (
    <div className="space-y-6 flex flex-col h-full text-foreground pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Risk &amp; Impact Center</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Risk &amp; Impact Center</h1>
          <p className="text-muted-foreground text-sm">Understand organizational exposure and prioritize compliance actions.</p>
        </div>
        <div className="flex items-center gap-3">
          <select defaultValue="Last 30 days" className="bg-card border border-border px-4 py-2 rounded text-sm outline-none cursor-pointer">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This Year</option>
          </select>
          <button className="flex items-center gap-2 bg-indigo hover:bg-indigo/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5  flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-indigo" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">Overall Regulatory Risk</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="text-xl font-bold">Medium</span>
            </div>
            <p className="text-[11px] text-teal mt-1 font-medium flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> Trending lower
            </p>
          </div>
          <div className="text-muted-foreground/30">
            <svg width="40" height="30" viewBox="0 0 40 30"><path d="M0 25 Q10 20 20 15 T40 5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
          </div>
        </div>

        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5  flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-red/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-red" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">Critical Gaps</p>
            <p className="text-3xl font-bold mt-0.5">6</p>
            <p className="text-[11px] text-teal mt-0.5 font-medium">↑ 2 from last month</p>
          </div>
          <div className="text-muted-foreground/30">
            <BarChart3 className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5  flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">High Risk</p>
            <p className="text-3xl font-bold mt-0.5">12</p>
            <p className="text-[11px] text-teal mt-0.5 font-medium">↓ 3 from last month</p>
          </div>
          <div className="text-muted-foreground/30">
            <svg width="40" height="30" viewBox="0 0 40 30"><path d="M0 5 Q10 15 20 10 T40 20" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
          </div>
        </div>

        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5  flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">Medium Risk</p>
            <p className="text-3xl font-bold mt-0.5">31</p>
            <p className="text-[11px] text-red mt-0.5 font-medium">↓ 5 from last month</p>
          </div>
          <div className="text-muted-foreground/30">
            <svg width="40" height="30" viewBox="0 0 40 30"><path d="M0 15 Q10 5 20 20 T40 10" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT COLUMN (2/3) */}
        <div className="col-span-2 space-y-6">

          {/* Organizational Risk Map */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  ">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Organizational Risk Map</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Department-wise regulatory impact and risk exposure.</p>
              </div>
              <div className="flex items-center gap-5 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red" /> Critical</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-500" /> High</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Medium</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-teal" /> Low</div>
                <select className="bg-transparent border border-border px-2 py-1 rounded outline-none text-sm ml-2">
                  <option>All Regulations</option>
                  <option>RBI Only</option>
                  <option>SEBI Only</option>
                </select>
              </div>
            </div>
            <div className="relative h-[420px] overflow-hidden">
              {/* Center node */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-20 h-20 rounded-full bg-indigo border-4 border-blue-400 flex flex-col items-center justify-center text-white shadow-[0_0_30px_rgba(73,105,232,0.4)]">
                  <Landmark className="w-5 h-5 mb-0.5" />
                  <span className="text-[9px] font-medium leading-tight text-center">Aarohan<br/>Bank</span>
                </div>
              </div>

              {/* Connection lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                {orgNodes.map((node, i) => (
                  <line
                    key={i}
                    x1="50%" y1="50%"
                    x2={`${node.x}%`} y2={`${node.y}%`}
                    stroke={node.color}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                ))}
              </svg>

              {/* Department bubbles */}
              {orgNodes.map((node) => (
                <div
                  key={node.name}
                  className="absolute flex flex-col items-center gap-1 group cursor-pointer"
                  style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <span className="text-[10px] font-semibold text-muted-foreground">{node.name}</span>
                  <div
                    className="rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform border-2"
                    style={{
                      width: node.size,
                      height: node.size,
                      backgroundColor: node.color,
                      borderColor: `${node.color}80`,
                    }}
                  >
                    {node.value || ""}
                  </div>
                </div>
              ))}

              {/* Tooltip for KYC (static showcase) */}
              <div className="absolute bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-3  text-xs" style={{ left: "58%", top: "8%" }}>
                <p className="font-bold text-sm mb-1.5">KYC</p>
                <div className="space-y-1 text-muted-foreground">
                  <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red inline-block" /> 12 policies impacted</p>
                  <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" /> 3 high-risk gaps</p>
                  <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal inline-block" /> 7 open actions</p>
                </div>
                <Link href="/impact-analysis" className="text-blue-400 hover:underline mt-2 inline-block text-xs">View Details →</Link>
              </div>
            </div>
          </div>

          {/* Risk Heatmap (scatter) */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  ">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-bold">Risk Heatmap</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Regulatory risk distribution by likelihood and impact.</p>
            </div>
            <div className="flex">
              {/* Scatter chart area */}
              <div className="flex-1 p-5 relative">
                <div className="flex">
                  {/* Y-axis label */}
                  <div className="flex flex-col justify-between pr-2 text-[10px] text-muted-foreground font-medium h-[220px]">
                    <span>Very High</span>
                    <span>High</span>
                    <span>Medium</span>
                    <span>Low</span>
                  </div>
                  {/* Grid */}
                  <div className="flex-1 relative h-[220px] border-l border-b border-border">
                    {/* Background gradient */}
                    <div className="absolute inset-0" style={{
                      background: "linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(234,179,8,0.08) 40%, rgba(249,115,22,0.08) 65%, rgba(239,68,68,0.12) 100%)"
                    }} />
                    {/* Grid lines */}
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="border-r border-t border-border/30" />
                      ))}
                    </div>
                    {/* Dots */}
                    {heatmapDots.map((dot, i) => (
                      <div
                        key={i}
                        className="absolute w-2.5 h-2.5 rounded-full opacity-80 hover:opacity-100 hover:scale-150 transition-all cursor-pointer"
                        style={{
                          left: `${(dot.x / 4) * 100}%`,
                          bottom: `${(dot.y / 4) * 100}%`,
                          backgroundColor: dot.color,
                          boxShadow: `0 0 6px ${dot.color}60`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                {/* X-axis labels */}
                <div className="flex justify-between pl-16 pr-0 mt-2 text-[10px] text-muted-foreground font-medium">
                  <span>Low</span><span>Medium</span><span>High</span><span>Very High</span>
                </div>
                <div className="text-center mt-1 text-xs text-muted-foreground font-medium">Likelihood</div>
                {/* Y-axis title */}
                <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground font-medium">Impact</div>
              </div>

              {/* Risk summary sidebar */}
              <div className="w-48 border-l border-border p-4 flex flex-col justify-center space-y-3">
                {riskSummary.map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 hover:bg-secondary/20 rounded px-2 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <span>{item.count}</span>
                      <ChevronRightIcon className="w-3 h-3 group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (1/3) */}
        <div className="space-y-6">

          {/* Top Regulatory Risks */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  ">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold">Top Regulatory Risks</h2>
              <Link href="/regulatory-feed" className="text-blue-400 text-sm hover:underline flex items-center gap-1">
                View All <span>→</span>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-muted-foreground border-b border-border bg-secondary/10">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Risk</th>
                    <th className="px-4 py-2.5 font-medium">Regulation</th>
                    <th className="px-4 py-2.5 font-medium">Department</th>
                    <th className="px-4 py-2.5 font-medium">Severity</th>
                    <th className="px-4 py-2.5 font-medium">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {topRisks.map((r, i) => (
                    <tr key={i} className="hover:bg-secondary/10 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground max-w-[120px]">{r.risk}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.regulation}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.department}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${r.severityColor}`}>{r.severity}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Department Impact */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  ">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold">Department Impact</h2>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-indigo/10 text-indigo border border-indigo/30 px-2.5 py-1 rounded font-medium">Policies Impacted</span>
                <span className="text-muted-foreground px-2.5 py-1 cursor-pointer hover:text-foreground transition-colors">Open Actions</span>
              </div>
            </div>
            <div className="p-5 space-y-3">
              {deptImpact.map((dept) => (
                <div key={dept.name} className="flex items-center text-sm gap-3">
                  <div className="w-24 text-muted-foreground text-xs font-medium truncate">{dept.name}</div>
                  <div className="flex-1 h-4 bg-secondary/30 rounded overflow-hidden">
                    <div
                      className={`h-full ${dept.color} rounded`}
                      style={{ width: `${(dept.value / 12) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right font-mono text-xs font-semibold">{dept.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Risk Trends */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  ">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold">Recent Risk Trends</h2>
              <select defaultValue="Last 6 months" className="bg-transparent border border-border px-2 py-1 rounded outline-none text-xs">
                <option>Last 3 months</option>
                <option>Last 6 months</option>
                <option>Last 12 months</option>
              </select>
            </div>
            <div className="p-5">
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskTrendData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#132238', borderColor: '#ffffff20', borderRadius: '8px', fontSize: '11px' }}
                      labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px' }}
                    />
                    <Line type="monotone" dataKey="critical" name="Critical" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: '#ef4444' }} />
                    <Line type="monotone" dataKey="high" name="High" stroke="#f97316" strokeWidth={2} dot={{ r: 3, fill: '#f97316' }} />
                    <Line type="monotone" dataKey="medium" name="Medium" stroke="#eab308" strokeWidth={2} dot={{ r: 3, fill: '#eab308' }} />
                    <Line type="monotone" dataKey="low" name="Low" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3, fill: '#14b8a6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-5 mt-3 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red" /> Critical</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-500" /> High</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Medium</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-teal" /> Low</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
