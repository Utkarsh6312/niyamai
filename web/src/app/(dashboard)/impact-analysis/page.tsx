"use client";

import {
  Search, ChevronRight, Upload, Sparkles, FileText, ListOrdered,
  AlertTriangle, Users, Filter, MoreVertical, ChevronLeft, TrendingUp, Info, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const IMPACT_COLORS: Record<string, string> = {
  "High Impact": "#ef4444",
  "Medium Impact": "#f59e0b",
  "Low Impact": "#3b82f6",
  "No Impact": "#94a3b8",
};

const donutData = [
  { name: "High Impact", value: 9, color: "#ef4444" },
  { name: "Medium Impact", value: 18, color: "#f59e0b" },
  { name: "Low Impact", value: 14, color: "#3b82f6" },
  { name: "No Impact", value: 7, color: "#94a3b8" },
];

const deptData = [
  { name: "KYC & Customer Onboarding", count: 14, color: "#6366f1" },
  { name: "Risk & Compliance", count: 10, color: "#3b82f6" },
  { name: "Operations", count: 8, color: "#06b6d4" },
  { name: "IT & Technology", count: 6, color: "#10b981" },
  { name: "Legal", count: 5, color: "#f59e0b" },
  { name: "Finance", count: 3, color: "#d1d5db" },
  { name: "HR", count: 2, color: "#e5e7eb" },
];

const recentRegulations = [
  { name: "RBI KYC Master Direction 2026", date: "20 Aug 2026", status: "Completed", pages: 42 },
  { name: "AML Guidelines Update", date: "12 Aug 2026", status: "Completed", pages: 18 },
  { name: "Cyber Security Framework", date: "10 Aug 2026", status: "In Progress", pages: 35 },
  { name: "Priority Sector Lending Update", date: "05 Aug 2026", status: "Completed", pages: 28 },
  { name: "Customer Data Protection Rules", date: "28 Jul 2026", status: "Completed", pages: 22 },
];

const obligations = [
  { code: "C.2.1", title: "Customer Identity Verification", reg: "RBI KYC Master Direction 2026", dept: "KYC", impact: "High", summary: "Additional verification steps for non face-to-face customers", status: "Action Required", statusColor: "bg-red-100 text-red-700" },
  { code: "C.3.4", title: "Periodic Review", reg: "RBI KYC Master Direction 2026", dept: "Operations", impact: "Medium", summary: "Review customer accounts based on risk profile", status: "In Progress", statusColor: "bg-blue-100 text-blue-700" },
  { code: "D.1.2", title: "Data Retention", reg: "RBI Data Localization Guidelines", dept: "IT", impact: "High", summary: "Update data retention policy to 7 years", status: "Pending", statusColor: "bg-amber-100 text-amber-700" },
  { code: "E.4.1", title: "Suspicious Transaction Monitoring", reg: "AML Guidelines 2026", dept: "Compliance", impact: "Medium", summary: "Enhanced monitoring for high-value transactions", status: "In Progress", statusColor: "bg-blue-100 text-blue-700" },
  { code: "F.2.3", title: "Reporting to FIU", reg: "AML Guidelines 2026", dept: "Compliance", impact: "Low", summary: "No significant changes, minor format updates", status: "Completed", statusColor: "bg-green-100 text-green-700" },
];

const impactBadge = (impact: string) => {
  const colors: Record<string, string> = {
    High: "bg-red-500 text-white",
    Medium: "bg-amber-400 text-white",
    Low: "bg-blue-400 text-white",
  };
  return <span className={`px-3 py-1 rounded text-xs font-bold ${colors[impact] || "bg-slate-200 text-slate-700"}`}>{impact}</span>;
};

export default function ImpactAnalysis() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = [
    { id: "all", label: "All Impacts (48)" },
    { id: "high", label: "High Impact (9)" },
    { id: "medium", label: "Medium Impact (18)" },
    { id: "low", label: "Low Impact (14)" },
    { id: "none", label: "No Impact (7)" },
  ];

  return (
    <div className="space-y-6 flex flex-col h-full text-[#0F172A] pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-[#0F172A] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#0F172A] font-medium">Impact Analysis</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Impact Analysis</h1>
          <p className="text-slate-500 text-sm">Understand the impact of new and existing regulations on your organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-[#2563EB] text-[#2563EB] px-4 py-2 rounded text-sm font-medium hover:bg-blue-50 transition-colors bg-white">
            <Upload className="w-4 h-4" /> Upload Regulation
          </button>
          <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
            <Sparkles className="w-4 h-4" /> Analyze with AI
          </button>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Main Content */}
        <div className="flex-1 space-y-6 min-w-0">

          {/* Metric Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-[11px] text-slate-500 font-medium">Regulations Analyzed</p>
                <p className="text-[11px] text-green-600 font-semibold">↑ 20%</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                <ListOrdered className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">48</p>
                <p className="text-[11px] text-slate-500 font-medium">Obligations Identified</p>
                <p className="text-[11px] text-green-600 font-semibold">↑ 15%</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">9</p>
                <p className="text-[11px] text-slate-500 font-medium">High Impact Areas</p>
                <p className="text-[11px] text-red-500 font-semibold">↓ 25%</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-[11px] text-slate-500 font-medium">Departments Affected</p>
                <p className="text-[11px] text-green-600 font-semibold">↑ 50%</p>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-5">
            {/* Impact Overview Donut */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-[#0F172A]">Impact Overview</h3>
                <select className="bg-white border border-slate-200 px-2 py-1 rounded text-xs outline-none text-slate-600">
                  <option>By Impact Level</option>
                </select>
              </div>
              <p className="text-xs text-slate-500 mb-4">Distribution of regulatory impacts across your organization</p>
              <div className="flex items-center gap-6">
                <div className="relative w-[180px] h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {donutData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-[#0F172A]">48</span>
                    <span className="text-[10px] text-slate-500 font-medium">Total<br/>Obligations</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  {donutData.map(d => (
                    <div key={d.name} className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-slate-600 w-28">{d.name}</span>
                      <span className="font-bold text-[#0F172A] w-6 text-right">{d.value}</span>
                      <span className="text-slate-400 text-xs">{Math.round(d.value / 48 * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Departments Affected */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-[#0F172A] mb-1">Departments Affected</h3>
              <p className="text-xs text-slate-500 mb-4">Number of obligations by department</p>
              <div className="space-y-3">
                {deptData.map(d => (
                  <div key={d.name} className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 w-[180px] shrink-0 truncate">{d.name}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(d.count / 14) * 100}%`, backgroundColor: d.color }} />
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] w-6 text-right">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200">
            <div className="flex">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? "border-[#2563EB] text-[#2563EB] font-bold"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 border border-[#2563EB] text-[#2563EB] px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-50 transition-colors mb-1">
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search obligations, clauses, keywords..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded text-sm outline-none focus:border-[#2563EB]" />
            </div>
            <select className="bg-white border border-slate-200 px-3 py-2 rounded text-sm outline-none text-slate-600">
              <option>Department</option>
            </select>
            <select className="bg-white border border-slate-200 px-3 py-2 rounded text-sm outline-none text-slate-600">
              <option>Impact Level</option>
            </select>
            <select className="bg-white border border-slate-200 px-3 py-2 rounded text-sm outline-none text-slate-600">
              <option>Regulation</option>
            </select>
            <select className="bg-white border border-slate-200 px-3 py-2 rounded text-sm outline-none text-slate-600">
              <option>Status</option>
            </select>
            <button className="text-[#2563EB] text-sm font-medium hover:underline">Clear Filters</button>
          </div>

          {/* Obligations Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="pl-4 pr-2 py-3 w-8"><input type="checkbox" className="rounded border-slate-300" /></th>
                  <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-slate-500">Clause / Obligation</th>
                  <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-slate-500">Source Regulation</th>
                  <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-slate-500">Department</th>
                  <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-slate-500">Impact Level</th>
                  <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-slate-500">Summary of Impact</th>
                  <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-slate-500 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {obligations.map((obl) => (
                  <tr key={obl.code} className="hover:bg-slate-50 transition-colors">
                    <td className="pl-4 pr-2 py-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                    <td className="px-3 py-4">
                      <span className="text-[#2563EB] font-semibold text-xs">{obl.code}</span>
                      <span className="text-slate-600 text-xs"> - {obl.title}</span>
                    </td>
                    <td className="px-3 py-4 text-xs text-slate-600">{obl.reg}</td>
                    <td className="px-3 py-4 text-xs text-slate-600">{obl.dept}</td>
                    <td className="px-3 py-4">{impactBadge(obl.impact)}</td>
                    <td className="px-3 py-4 text-xs text-slate-600 max-w-[200px]">{obl.summary}</td>
                    <td className="px-3 py-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${obl.statusColor}`}>{obl.status}</span>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-400"><MoreVertical className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between text-sm bg-white">
              <span className="text-slate-500 text-xs">Showing 1–5 of 48 obligations</span>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded flex items-center justify-center text-slate-500 hover:bg-slate-100 border border-transparent"><ChevronLeft className="w-4 h-4" /></button>
                <button className="w-8 h-8 rounded flex items-center justify-center bg-[#2563EB] text-white text-xs font-medium border border-[#2563EB]">1</button>
                {[2,3,4,5].map(p => (
                  <button key={p} className="w-8 h-8 rounded flex items-center justify-center text-slate-700 hover:bg-slate-100 text-xs border border-transparent">{p}</button>
                ))}
                <span className="text-slate-400 px-1">...</span>
                <button className="w-8 h-8 rounded flex items-center justify-center text-slate-700 hover:bg-slate-100 text-xs border border-transparent">10</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-slate-500 hover:bg-slate-100 border border-transparent"><ChevronRight className="w-4 h-4" /></button>
                <select className="bg-white border border-slate-200 px-2 py-1.5 rounded text-xs outline-none ml-2 text-slate-600">
                  <option>5 per page</option>
                  <option>10 per page</option>
                  <option>25 per page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[320px] shrink-0 space-y-6">

          {/* Recent Analysis */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-[#0F172A]">Recent Analysis</h3>
              <button className="text-[#2563EB] text-xs font-semibold hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
              {recentRegulations.map((reg, i) => (
                <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#0F172A] truncate">{reg.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${reg.status === "Completed" ? "bg-green-500" : "bg-blue-500"}`} />
                      <span className="text-[10px] text-slate-500">{reg.status} • {reg.pages} pages</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{reg.date}</span>
                    <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-[#0F172A]">Key Insights</h3>
              <button className="flex items-center gap-1.5 border border-[#2563EB] text-[#2563EB] px-2 py-1 rounded text-[10px] font-semibold hover:bg-blue-50 transition-colors">
                <FileText className="w-3 h-3" /> Generate Report
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed"><span className="font-bold text-red-600">9 high-impact obligations</span> require immediate attention.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-purple-50 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed"><span className="font-bold text-purple-700">KYC department</span> is most affected (29% of total obligations).</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-green-50 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">Overall compliance workload expected to <span className="font-bold text-green-700">increase by 23%</span>.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4 text-[#2563EB]" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed"><span className="font-bold text-[#2563EB]">3 regulations</span> have overlapping requirements.</p>
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-[#0F172A]">Recommended Actions</h3>
              <button className="text-[#2563EB] text-xs font-semibold hover:underline">View All</button>
            </div>
            <div className="p-4 space-y-4">
              {[
                "Prioritize implementation of new KYC verification requirements",
                "Update transaction monitoring systems",
                "Review and align data retention policies",
                "Conduct cross-department impact review",
              ].map((action, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 text-xs font-bold">{i + 1}</div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{action}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
