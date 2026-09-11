"use client";

import { useState } from "react";
import {
  FileText,
  AlertTriangle,
  FileStack,
  CheckSquare,
  PieChart,
  Download,
  ArrowUp,
  ArrowDown,
  Calendar,
  Building2,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";
import { toast } from "sonner";

// Datasets by Timeframe (Real-Time Reactive Simulation for Aarohan Bank)
const dashboardDataByRange = {
  "7d": {
    label: "Last 7 days",
    metrics: {
      activeChanges: 24,
      changesDelta: "+4 this week",
      highRiskGaps: 6,
      gapsDelta: "-2 remediated",
      policiesImpacted: 14,
      departmentsCount: 5,
      openActions: 18,
      criticalActions: 3,
      complianceCoverage: "96.4%",
      coverageDelta: "+0.8%"
    },
    trend: [
      { date: "Sep 05", changes: 12, policies: 6, actions: 4 },
      { date: "Sep 06", changes: 15, policies: 8, actions: 6 },
      { date: "Sep 07", changes: 18, policies: 10, actions: 7 },
      { date: "Sep 08", changes: 20, policies: 11, actions: 10 },
      { date: "Sep 09", changes: 22, policies: 13, actions: 14 },
      { date: "Sep 10", changes: 23, policies: 13, actions: 16 },
      { date: "Sep 11", changes: 24, policies: 14, actions: 18 }
    ],
    riskDistribution: [
      { name: "Critical", value: 3, color: "#ef4444", percent: "12.5%" },
      { name: "High", value: 5, color: "#f97316", percent: "20.8%" },
      { name: "Medium", value: 9, color: "#eab308", percent: "37.5%" },
      { name: "Low", value: 7, color: "#14b8a6", percent: "29.2%" }
    ],
    totalImpacts: 24
  },
  "30d": {
    label: "Last 30 days",
    metrics: {
      activeChanges: 142,
      changesDelta: "+12 this month",
      highRiskGaps: 18,
      gapsDelta: "-4 from last month",
      policiesImpacted: 47,
      departmentsCount: 11,
      openActions: 63,
      criticalActions: 14,
      complianceCoverage: "94.2%",
      coverageDelta: "+2.1%"
    },
    trend: [
      { date: "Aug 10", changes: 15, policies: 8, actions: 5 },
      { date: "Aug 14", changes: 28, policies: 14, actions: 9 },
      { date: "Aug 18", changes: 38, policies: 25, actions: 15 },
      { date: "Aug 22", changes: 58, policies: 38, actions: 24 },
      { date: "Aug 26", changes: 74, policies: 48, actions: 36 },
      { date: "Aug 30", changes: 70, policies: 46, actions: 34 },
      { date: "Sep 03", changes: 86, policies: 55, actions: 42 },
      { date: "Sep 07", changes: 92, policies: 59, actions: 46 },
      { date: "Sep 11", changes: 142, policies: 47, actions: 63 }
    ],
    riskDistribution: [
      { name: "Critical", value: 18, color: "#ef4444", percent: "12.7%" },
      { name: "High", value: 32, color: "#f97316", percent: "22.5%" },
      { name: "Medium", value: 54, color: "#eab308", percent: "38.0%" },
      { name: "Low", value: 38, color: "#14b8a6", percent: "26.8%" }
    ],
    totalImpacts: 142
  },
  "90d": {
    label: "Last 90 days",
    metrics: {
      activeChanges: 386,
      changesDelta: "+48 this quarter",
      highRiskGaps: 34,
      gapsDelta: "-11 remediated",
      policiesImpacted: 89,
      departmentsCount: 14,
      openActions: 142,
      criticalActions: 28,
      complianceCoverage: "91.8%",
      coverageDelta: "+3.4%"
    },
    trend: [
      { date: "Jun 15", changes: 90, policies: 42, actions: 30 },
      { date: "Jul 01", changes: 140, policies: 58, actions: 45 },
      { date: "Jul 15", changes: 195, policies: 67, actions: 62 },
      { date: "Aug 01", changes: 260, policies: 75, actions: 88 },
      { date: "Aug 15", changes: 310, policies: 82, actions: 110 },
      { date: "Sep 01", changes: 355, policies: 87, actions: 128 },
      { date: "Sep 11", changes: 386, policies: 89, actions: 142 }
    ],
    riskDistribution: [
      { name: "Critical", value: 48, color: "#ef4444", percent: "12.4%" },
      { name: "High", value: 88, color: "#f97316", percent: "22.8%" },
      { name: "Medium", value: 146, color: "#eab308", percent: "37.8%" },
      { name: "Low", value: 104, color: "#14b8a6", percent: "27.0%" }
    ],
    totalImpacts: 386
  },
  "1y": {
    label: "This Year (FY2026)",
    metrics: {
      activeChanges: 1248,
      changesDelta: "+210 YTD",
      highRiskGaps: 64,
      gapsDelta: "-38 remediated",
      policiesImpacted: 178,
      departmentsCount: 16,
      openActions: 284,
      criticalActions: 42,
      complianceCoverage: "89.5%",
      coverageDelta: "+5.1%"
    },
    trend: [
      { date: "Jan", changes: 180, policies: 45, actions: 35 },
      { date: "Mar", changes: 360, policies: 80, actions: 75 },
      { date: "May", changes: 580, policies: 110, actions: 120 },
      { date: "Jul", changes: 840, policies: 140, actions: 190 },
      { date: "Sep", changes: 1248, policies: 178, actions: 284 }
    ],
    riskDistribution: [
      { name: "Critical", value: 156, color: "#ef4444", percent: "12.5%" },
      { name: "High", value: 280, color: "#f97316", percent: "22.4%" },
      { name: "Medium", value: 474, color: "#eab308", percent: "38.0%" },
      { name: "Low", value: 338, color: "#14b8a6", percent: "27.1%" }
    ],
    totalImpacts: 1248
  }
};

const recentChanges = [
  {
    reg: "RBI/2026-27/114 — Digital Lending Due Diligence & Liveness",
    issuer: "Reserve Bank of India",
    date: "18 Aug 2026",
    impact: "Critical",
    impactColor: "text-red border-red/30 bg-red/10 font-bold",
    status: "Action Required",
    statusColor: "text-red border-red/30 bg-red/10",
    link: "/impact-analysis"
  },
  {
    reg: "RBI/2026-27/45 — Know Your Customer (KYC) Master Direction",
    issuer: "Reserve Bank of India",
    date: "12 Aug 2026",
    impact: "High",
    impactColor: "text-orange-500 border-orange-500/30 bg-orange-500/10 font-bold",
    status: "Analysis Complete",
    statusColor: "text-teal-500 border-teal-500/30 bg-teal-500/10",
    link: "/policy-mapping"
  },
  {
    reg: "RBI/2024-25/78 — Master Direction on IT Outsourcing & Cloud Risks",
    issuer: "Reserve Bank of India",
    date: "04 Aug 2026",
    impact: "Medium",
    impactColor: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10 font-bold",
    status: "Under Review",
    statusColor: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    link: "/policy-library"
  },
  {
    reg: "RBI — Cyber Security Framework & 6-Hour Incident Notice",
    issuer: "Reserve Bank of India",
    date: "28 Jul 2026",
    impact: "High",
    impactColor: "text-orange-500 border-orange-500/30 bg-orange-500/10 font-bold",
    status: "Compliant",
    statusColor: "text-teal-500 border-teal-500/30 bg-teal-500/10",
    link: "/policy-library"
  },
  {
    reg: "RBI — Priority Sector Lending Revision (Urban Co-op Expansion)",
    issuer: "Reserve Bank of India",
    date: "21 Jul 2026",
    impact: "Low",
    impactColor: "text-teal-500 border-teal-500/30 bg-teal-500/10 font-bold",
    status: "In Progress",
    statusColor: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    link: "/policy-library"
  }
];

const deptImpact = [
  { name: "Compliance", policies: 18, actions: 12 },
  { name: "KYC & Operations", policies: 15, actions: 11 },
  { name: "Digital Banking", policies: 12, actions: 9 },
  { name: "Information Security", policies: 10, actions: 8 },
  { name: "Credit Risk", policies: 9, actions: 7 },
  { name: "Vendor Management", policies: 8, actions: 6 },
  { name: "Legal & DPDP", policies: 6, actions: 5 },
  { name: "Internal Audit", policies: 4, actions: 3 }
];

export default function Home() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  const currentData = dashboardDataByRange[timeRange];

  const handleTimeRangeChange = (newRange: "7d" | "30d" | "90d" | "1y") => {
    setTimeRange(newRange);
    toast.info(`Dashboard updated for ${dashboardDataByRange[newRange].label}`, {
      description: "Regulatory metrics, risk distribution, and trend curves synchronized."
    });
  };

  // Generate & Download Comprehensive Executive Compliance CSV Report
  const handleGenerateReport = () => {
    const reportDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const csvContent = [
      ["AAROHAN BANK - REGULATORY INTELLIGENCE & COMPLIANCE EXECUTIVE AUDIT REPORT"],
      ["Generated Date", reportDate],
      ["Reporting Scope", currentData.label],
      ["Bank Category", "Scheduled Commercial Bank (Regulated Entity)"],
      ["Supervisory Authority", "Reserve Bank of India (RBI) / Board Risk Committee"],
      [],
      ["--- EXECUTIVE KPI SUMMARY ---"],
      ["Metric", "Value", "Context"],
      ["Active Regulatory Changes", currentData.metrics.activeChanges, currentData.metrics.changesDelta],
      ["High-Risk Gaps", currentData.metrics.highRiskGaps, currentData.metrics.gapsDelta],
      ["Policies Impacted", currentData.metrics.policiesImpacted, `Across ${currentData.metrics.departmentsCount} departments`],
      ["Open Compliance Actions", currentData.metrics.openActions, `${currentData.metrics.criticalActions} Critical`],
      ["Overall Compliance Coverage", currentData.metrics.complianceCoverage, currentData.metrics.coverageDelta],
      [],
      ["--- RISK SEVERITY DISTRIBUTION ---"],
      ["Severity Tier", "Count", "Percentage"],
      ...currentData.riskDistribution.map((r) => [r.name, r.value, r.percent]),
      [],
      ["--- RECENT STATUTORY AMENDMENTS & ACTION STATUS ---"],
      ["Regulation Name", "Issuing Authority", "Effective Date", "Impact Tier", "Remediation Status"],
      ...recentChanges.map((rc) => [rc.reg, rc.issuer, rc.date, rc.impact, rc.status]),
      [],
      ["--- DEPARTMENTAL COMPLIANCE IMPACT MATRIX ---"],
      ["Department Name", "Impacted Policies", "Open Remediations"],
      ...deptImpact.map((d) => [d.name, d.policies, d.actions]),
      [],
      ["CONFIDENTIALITY NOTE: Generated by NiyamAI Enterprise Regulatory Engine for internal governance only."]
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Aarohan_Bank_Compliance_Report_${timeRange}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Executive Compliance Report Generated!", {
      description: "Downloaded CSV format suitable for Board Risk & Audit Committee briefing."
    });
  };

  return (
    <div className="space-y-6 flex flex-col h-full text-foreground pb-12">
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <Building2 className="w-3.5 h-3.5 text-indigo" /> AAROHAN BANK • SCHEDULED COMMERCIAL BANK
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal/10 text-teal border border-teal/20 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Core Compliance v3.4 Active
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">Policy & Regulatory Overview</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Real-time telemetry on statutory circulars, policy deltas, and accountable remediation tasks across Aarohan Bank.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex items-center">
            <Calendar className="w-4 h-4 absolute left-3 pointer-events-none text-muted-foreground" />
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value as any)}
              className="bg-card border-2 border-black font-semibold text-sm pl-9 pr-8 py-2 rounded-none shadow-[2px_2px_0_0_#000000] outline-none cursor-pointer appearance-none"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">This Year (FY2026)</option>
            </select>
          </div>

          <button
            onClick={handleGenerateReport}
            className="flex items-center gap-2 bg-indigo hover:bg-indigo/90 text-white font-bold px-4 py-2 rounded-none border-2 border-black shadow-[3px_3px_0_0_#000000] text-sm transition-transform active:translate-x-0.5 active:translate-y-0.5"
          >
            <Download className="w-4 h-4" /> Generate Report
          </button>
        </div>
      </div>

      {/* Top 5 Metric Cards (Preserved & Enhanced) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <MetricCard
          icon={<FileText className="w-5 h-5 text-blue-500" />}
          iconBg="bg-blue-500/10 border border-blue-500/20"
          value={currentData.metrics.activeChanges}
          label="Active Regulatory Changes"
          sub={
            <div className="flex items-center gap-1 text-teal font-bold">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{currentData.metrics.changesDelta}</span>
            </div>
          }
        />
        <MetricCard
          icon={<AlertTriangle className="w-5 h-5 text-red" />}
          iconBg="bg-red/10 border border-red/20"
          value={currentData.metrics.highRiskGaps}
          label="High-Risk Policy Gaps"
          sub={
            <div className="flex items-center gap-1 text-teal font-bold">
              <ArrowDown className="w-3.5 h-3.5" />
              <span>{currentData.metrics.gapsDelta}</span>
            </div>
          }
        />
        <MetricCard
          icon={<FileStack className="w-5 h-5 text-purple-600" />}
          iconBg="bg-purple-600/10 border border-purple-600/20"
          value={currentData.metrics.policiesImpacted}
          label="Internal Policies Impacted"
          sub={<span className="text-muted-foreground font-medium">Across {currentData.metrics.departmentsCount} bank departments</span>}
        />
        <MetricCard
          icon={<CheckSquare className="w-5 h-5 text-indigo" />}
          iconBg="bg-indigo/10 border border-indigo/20"
          value={currentData.metrics.openActions}
          label="Open Compliance Actions"
          sub={
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-red animate-pulse" />
              <span className="text-red">{currentData.metrics.criticalActions} Critical Due</span>
            </div>
          }
        />
        <MetricCard
          icon={<PieChart className="w-5 h-5 text-teal" />}
          iconBg="bg-teal/10 border border-teal/20"
          value={currentData.metrics.complianceCoverage}
          label="Statutory Coverage Rating"
          sub={
            <div className="flex items-center gap-1 text-teal font-bold">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{currentData.metrics.coverageDelta} vs benchmark</span>
            </div>
          }
        />
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Larger Prominent Trend Graph & Recent Changes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Expanded Regulatory Impact Trend Chart */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]">
            <div className="p-5 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-secondary/10">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo" />
                  <h2 className="font-serif text-xl font-bold">Regulatory Impact & Remediation Velocity</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Timeline tracking incoming circulars vs policies revised and actions closed ({currentData.label}).
                </p>
              </div>

              {/* Legend Badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                <div className="flex items-center gap-1.5 bg-blue-500/10 text-blue-600 px-2 py-1 rounded border border-blue-500/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Circulars ({currentData.metrics.activeChanges})</span>
                </div>
                <div className="flex items-center gap-1.5 bg-teal/10 text-teal px-2 py-1 rounded border border-teal/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal" />
                  <span>Policies ({currentData.metrics.policiesImpacted})</span>
                </div>
                <div className="flex items-center gap-1.5 bg-orange-500/10 text-orange-600 px-2 py-1 rounded border border-orange-500/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>Actions ({currentData.metrics.openActions})</span>
                </div>
              </div>
            </div>

            {/* Enlarged Chart Area */}
            <div className="h-[400px] p-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData.trend} margin={{ top: 10, right: 20, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888825" />
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: "#88888830" }}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: "#88888830" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      borderColor: "#000000",
                      borderRadius: "0px",
                      borderWidth: "2px",
                      boxShadow: "4px 4px 0px 0px #000000",
                      color: "#FFFFFF"
                    }}
                    itemStyle={{ fontSize: "12px", padding: "2px 0" }}
                    labelStyle={{ color: "#94A3B8", fontWeight: "bold", marginBottom: "6px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="changes"
                    name="Regulatory Circulars"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#ffffff" }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="policies"
                    name="Policies Impacted"
                    stroke="#14b8a6"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#14b8a6", strokeWidth: 2, stroke: "#ffffff" }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actions"
                    name="Actions Generated"
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#f97316", strokeWidth: 2, stroke: "#ffffff" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Statutory Changes Table */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]">
            <div className="p-5 border-b border-border flex justify-between items-center bg-secondary/10">
              <div>
                <h2 className="font-serif text-lg font-bold">Recent Statutory Directives (Aarohan Bank)</h2>
                <p className="text-xs text-muted-foreground">Directly ingested from Reserve Bank of India notifications.</p>
              </div>
              <Link
                href="/regulatory-feed"
                className="text-xs font-bold text-indigo hover:underline flex items-center gap-1"
              >
                Open Full Feed <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[700px]">
                <thead className="text-[11px] font-bold text-muted-foreground uppercase border-b border-border bg-secondary/20">
                  <tr>
                    <th className="px-5 py-3.5">Regulation / Master Direction</th>
                    <th className="px-5 py-3.5">Issuing Body</th>
                    <th className="px-5 py-3.5">Effective Date</th>
                    <th className="px-5 py-3.5">Severity</th>
                    <th className="px-5 py-3.5">Remediation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-medium">
                  {recentChanges.map((change, i) => (
                    <tr key={i} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-5 py-4">
                        <Link href={change.link} className="font-semibold text-foreground hover:text-indigo transition-colors line-clamp-1">
                          {change.reg}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">{change.issuer}</td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">{change.date}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 text-xs rounded border ${change.impactColor}`}>
                          {change.impact}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 text-xs rounded border font-medium ${change.statusColor}`}>
                          {change.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Cleaner Uniform Risk Distribution & Department Impact */}
        <div className="space-y-6">
          {/* Uniform Risk Distribution Donut Card */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]">
            <div className="p-5 border-b border-border bg-secondary/10">
              <div className="flex justify-between items-center">
                <h2 className="font-serif text-lg font-bold">Risk Exposure Distribution</h2>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-indigo/10 text-indigo rounded">
                  {currentData.totalImpacts} Direct Impacts
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Severity weighting across all active regulatory obligations.
              </p>
            </div>

            <div className="p-6">
              {/* Donut Chart with Centered Total */}
              <div className="w-full h-[210px] relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={currentData.riskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="#000000"
                      strokeWidth={2}
                    >
                      {currentData.riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-extrabold text-foreground">{currentData.totalImpacts}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Gaps</span>
                </div>
              </div>

              {/* Uniform Metric List with Percentage Progress */}
              <div className="space-y-3 pt-4 border-t border-border">
                {currentData.riskDistribution.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                        <span className="text-foreground">{item.name} Severity</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="font-bold text-foreground">{item.value}</span>
                        <span className="text-muted-foreground">({item.percent})</span>
                      </div>
                    </div>
                    {/* Mini Progress Bar */}
                    <div className="w-full h-1.5 bg-secondary/30 rounded-none overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: item.percent,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department Impact Matrix Card */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]">
            <div className="p-5 border-b border-border bg-secondary/10">
              <div className="flex justify-between items-center">
                <h2 className="font-serif text-lg font-bold">Department Impact Breakdown</h2>
                <div className="flex items-center gap-3 text-[10px] font-bold">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Policies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-teal" />
                    <span>Tasks</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Organizational workload across Aarohan Bank operational units.
              </p>
            </div>

            <div className="p-5 space-y-3.5">
              {deptImpact.map((dept) => {
                const total = dept.policies + dept.actions;
                const maxTotal = 30;
                const widthPolicies = (dept.policies / maxTotal) * 100;
                const widthActions = (dept.actions / maxTotal) * 100;

                return (
                  <div key={dept.name} className="flex items-center text-xs">
                    <div className="w-32 text-foreground font-semibold truncate pr-2" title={dept.name}>
                      {dept.name}
                    </div>
                    <div className="flex-1 flex items-center h-3 bg-secondary/30 rounded-none overflow-hidden border border-black/20">
                      <div className="h-full bg-blue-500" style={{ width: `${widthPolicies}%` }} />
                      <div className="h-full bg-teal" style={{ width: `${widthActions}%` }} />
                    </div>
                    <div className="w-14 flex justify-end gap-2 font-mono text-[11px] ml-2 font-bold">
                      <span className="text-blue-600">{dept.policies}</span>
                      <span className="text-teal">{dept.actions}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5">
            <h2 className="font-serif text-lg font-bold mb-3">Quick Navigation</h2>
            <div className="space-y-2 text-xs font-bold">
              <Link
                href="/regulatory-feed"
                className="flex items-center justify-between p-2.5 rounded bg-secondary/20 hover:bg-secondary/40 transition-colors"
              >
                <span>Browse Regulatory Feed</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo" />
              </Link>
              <Link
                href="/policy-library"
                className="flex items-center justify-between p-2.5 rounded bg-secondary/20 hover:bg-secondary/40 transition-colors"
              >
                <span>Aarohan Bank Policy Library</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo" />
              </Link>
              <Link
                href="/impact-analysis"
                className="flex items-center justify-between p-2.5 rounded bg-secondary/20 hover:bg-secondary/40 transition-colors"
              >
                <span>AI Impact & Clause Delta</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo" />
              </Link>
              <Link
                href="/regulatory-trace"
                className="flex items-center justify-between p-2.5 rounded bg-secondary/20 hover:bg-secondary/40 transition-colors"
              >
                <span>End-to-End Provenance Graph</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo" />
              </Link>
              <Link
                href="/action-center"
                className="flex items-center justify-between p-2.5 rounded bg-secondary/20 hover:bg-secondary/40 transition-colors"
              >
                <span>Compliance Action Center</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  iconBg: string;
  value: string | number;
  label: string;
  sub: React.ReactNode;
}

function MetricCard({ icon, iconBg, value, label, sub }: MetricCardProps) {
  return (
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-4 flex flex-col justify-between hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform">
      <div>
        <div className="flex items-start justify-between mb-2.5">
          <div className={`w-10 h-10 rounded-none flex items-center justify-center shrink-0 ${iconBg}`}>
            {icon}
          </div>
        </div>
        <span className="text-xs font-semibold text-muted-foreground block mb-1 leading-snug line-clamp-2 h-7">
          {label}
        </span>
        <h3 className="text-3xl font-extrabold text-foreground tracking-tight mb-2">{value}</h3>
      </div>
      <div className="pt-2 border-t border-border/40 text-[11px]">{sub}</div>
    </div>
  );
}
