"use client";

import { FileText, AlertTriangle, FileStack, CheckSquare, PieChart, Download, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

// Mock Data
const trendData = [
  { date: 'Aug 10', changes: 15, policies: 8, actions: 5 },
  { date: 'Aug 12', changes: 25, policies: 12, actions: 8 },
  { date: 'Aug 15', changes: 30, policies: 18, actions: 12 },
  { date: 'Aug 18', changes: 38, policies: 25, actions: 15 },
  { date: 'Aug 20', changes: 45, policies: 32, actions: 20 },
  { date: 'Aug 22', changes: 58, policies: 40, actions: 25 },
  { date: 'Aug 25', changes: 72, policies: 48, actions: 36 },
  { date: 'Aug 28', changes: 65, policies: 45, actions: 32 },
  { date: 'Aug 30', changes: 70, policies: 50, actions: 38 },
  { date: 'Sep 02', changes: 85, policies: 55, actions: 42 },
  { date: 'Sep 05', changes: 90, policies: 60, actions: 48 },
  { date: 'Sep 07', changes: 88, policies: 58, actions: 45 },
  { date: 'Sep 09', changes: 95, policies: 62, actions: 50 },
];

const pieData = [
  { name: 'Critical', value: 18, color: '#ef4444', percent: '12.7%' },
  { name: 'High', value: 32, color: '#f97316', percent: '22.5%' },
  { name: 'Medium', value: 54, color: '#eab308', percent: '38.0%' },
  { name: 'Low', value: 38, color: '#14b8a6', percent: '26.8%' },
];

const recentChanges = [
  { reg: "RBI — Know Your Customer (KYC) Amendment", issuer: "RBI", date: "18 Aug 2026", impact: "High", impactColor: "text-orange-500 border-orange-500/30 bg-orange-500/10", status: "Analysis Complete", statusColor: "text-teal-500 border-teal-500/30 bg-teal-500/10" },
  { reg: "RBI — Digital Lending Guidelines Update", issuer: "RBI", date: "12 Aug 2026", impact: "Critical", impactColor: "text-red border-red/30 bg-red/10", status: "Action Required", statusColor: "text-red border-red/30 bg-red/10" },
  { reg: "RBI — Outsourcing of IT Services", issuer: "RBI", date: "04 Aug 2026", impact: "Medium", impactColor: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10", status: "Under Review", statusColor: "text-blue-500 border-blue-500/30 bg-blue-500/10" },
  { reg: "RBI — Cyber Security Framework Update", issuer: "RBI", date: "28 Jul 2026", impact: "High", impactColor: "text-orange-500 border-orange-500/30 bg-orange-500/10", status: "Analysis Complete", statusColor: "text-teal-500 border-teal-500/30 bg-teal-500/10" },
  { reg: "RBI — Priority Sector Lending Revision", issuer: "RBI", date: "21 Jul 2026", impact: "Medium", impactColor: "text-yellow-500 border-yellow-500/30 bg-yellow-500/10", status: "In Progress", statusColor: "text-blue-500 border-blue-500/30 bg-blue-500/10" },
];

const deptImpact = [
  { name: "Compliance", policies: 18, actions: 12 },
  { name: "KYC", policies: 15, actions: 11 },
  { name: "Operations", policies: 12, actions: 9 },
  { name: "IT", policies: 10, actions: 8 },
  { name: "Cybersecurity", policies: 9, actions: 7 },
  { name: "Risk", policies: 8, actions: 6 },
  { name: "Legal", policies: 6, actions: 5 },
  { name: "Audit", policies: 4, actions: 3 },
];

export default function Home() {
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
          <select defaultValue="Last 30 days" className="bg-card border border-border px-4 py-2 rounded text-sm outline-none appearance-none cursor-pointer pr-8 relative">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This Year</option>
          </select>
          <button className="flex items-center gap-2 bg-indigo hover:bg-indigo/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
            <Download className="w-4 h-4" /> Generate Report
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <MetricCard 
          icon={<FileText className="w-5 h-5 text-blue-400" />} iconBg="bg-blue-400/10"
          value="142" label="Active Regulatory Changes" 
          sub={<><ArrowUp className="w-3 h-3 text-teal-400" /> <span className="text-teal-400 font-medium">+12 this month</span></>} 
        />
        <MetricCard 
          icon={<AlertTriangle className="w-5 h-5 text-red" />} iconBg="bg-red/10"
          value="18" label="High-Risk Gaps" 
          sub={<><ArrowDown className="w-3 h-3 text-teal-400" /> <span className="text-teal-400 font-medium">4 from last month</span></>} 
        />
        <MetricCard 
          icon={<FileStack className="w-5 h-5 text-purple-400" />} iconBg="bg-purple-400/10"
          value="47" label="Policies Impacted" 
          sub={<span className="text-muted-foreground">Across 11 departments</span>} 
        />
        <MetricCard 
          icon={<CheckSquare className="w-5 h-5 text-teal-400" />} iconBg="bg-teal-400/10"
          value="63" label="Open Actions" 
          sub={<><div className="w-2 h-2 rounded-sm bg-red mr-1" /> <span className="text-red font-medium">14 critical</span></>} 
        />
        <MetricCard 
          icon={<PieChart className="w-5 h-5 text-teal-300" />} iconBg="bg-teal-300/10"
          value="94.2%" label="Compliance Coverage" 
          sub={<><ArrowUp className="w-3 h-3 text-teal-400" /> <span className="text-teal-400 font-medium">+2.1%</span></>} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Wider */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Trend Chart */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  ">
            <div className="p-5 border-b border-border flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
              <h2 className="font-serif text-lg font-bold">Regulatory Impact Trend</h2>
              <div className="flex flex-wrap items-center gap-4 xl:gap-6 text-sm">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Regulatory changes</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-teal-400" /> Policies impacted</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-400" /> Actions generated</div>
                <select defaultValue="Last 30 days" className="bg-transparent border border-border px-2 py-1 rounded outline-none ml-2">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>
            <div className="h-[300px] p-5">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#132238', borderColor: '#ffffff20', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
                  />
                  <Line type="monotone" dataKey="changes" name="Regulatory changes" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
                  <Line type="monotone" dataKey="policies" name="Policies impacted" stroke="#2dd4bf" strokeWidth={2} dot={{ r: 3, fill: '#2dd4bf' }} />
                  <Line type="monotone" dataKey="actions" name="Actions generated" stroke="#fb923c" strokeWidth={2} dot={{ r: 3, fill: '#fb923c' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Changes Table */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  ">
            <div className="p-5 border-b border-border flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
              <h2 className="font-serif text-lg font-bold">Recent Regulatory Changes</h2>
              <Link href="/regulatory-feed" className="text-blue-400 text-sm hover:underline flex items-center">
                View All <span className="ml-1">→</span>
              </Link>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[700px]">
                <thead className="text-muted-foreground border-b border-border bg-secondary/10">
                  <tr>
                    <th className="px-5 py-3 font-semibold font-medium">Regulation</th>
                    <th className="px-5 py-3 font-semibold font-medium">Issuer</th>
                    <th className="px-5 py-3 font-semibold font-medium">Effective Date</th>
                    <th className="px-5 py-3 font-semibold font-medium">Impact</th>
                    <th className="px-5 py-3 font-semibold font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentChanges.map((change, i) => (
                    <tr key={i} className="hover:bg-secondary/10 transition-colors">
                      <td className="px-5 py-4 font-medium text-foreground">{change.reg}</td>
                      <td className="px-5 py-4 text-muted-foreground">{change.issuer}</td>
                      <td className="px-5 py-4 text-muted-foreground">{change.date}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 text-xs rounded border ${change.impactColor}`}>
                          {change.impact}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 text-xs rounded border ${change.statusColor}`}>
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

        {/* Right Column - Narrower */}
        <div className="space-y-6">
          
          {/* Risk Distribution */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  ">
            <div className="p-5 border-b border-border">
              <h2 className="font-serif text-lg font-bold">Risk Distribution</h2>
            </div>
            <div className="p-5 flex items-center">
              <div className="w-[160px] h-[160px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-foreground">142</span>
                  <span className="text-[10px] text-muted-foreground">Total Impacts</span>
                </div>
              </div>
              <div className="flex-1 pl-4 space-y-3">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{item.value}</span>
                      <span className="text-muted-foreground text-xs w-12 text-right">({item.percent})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department Impact */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  ">
            <div className="p-5 border-b border-border flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
              <h2 className="font-serif text-lg font-bold">Department Impact</h2>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Impacted Policies</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-teal-400" /> Open Actions</div>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {deptImpact.map((dept) => {
                const total = dept.policies + dept.actions;
                const maxTotal = 30; // approx max for scale
                const widthPolicies = (dept.policies / maxTotal) * 100;
                const widthActions = (dept.actions / maxTotal) * 100;
                
                return (
                  <div key={dept.name} className="flex items-center text-sm">
                    <div className="w-28 text-muted-foreground truncate pr-2" title={dept.name}>{dept.name}</div>
                    <div className="flex-1 flex items-center h-4 bg-secondary/20 rounded-sm overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${widthPolicies}%` }} />
                      <div className="h-full bg-teal-400" style={{ width: `${widthActions}%` }} />
                    </div>
                    <div className="w-16 flex justify-end gap-3 font-mono text-xs ml-3">
                      <span className="text-foreground">{dept.policies}</span>
                      <span className="text-muted-foreground">{dept.actions}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, iconBg, value, label, sub }: any) {
  return (
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-4  flex flex-col ">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
          {icon}
        </div>
      </div>
      <span className="text-xs font-semibold text-muted-foreground mb-1 leading-tight line-clamp-2 h-8">{label}</span>
      <h3 className="text-3xl font-bold text-foreground mb-2">{value}</h3>
      <div className="flex items-center text-[11px]">
        {sub}
      </div>
    </div>
  );
}

