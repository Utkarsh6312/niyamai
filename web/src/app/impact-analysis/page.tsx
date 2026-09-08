"use client";
import { RiskBadge, StatusBadge } from "@/components/ui/badges";
import { Search, ChevronRight, Upload, Sparkles, FileText, ListOrdered, AlertTriangle, Users, Filter, MoreVertical, CheckCircle2, Info, ArrowUpRight, Loader2, TrendingUp, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const donutData = [
  { name: "High Impact", value: 9, color: "#D84A4A" },
  { name: "Medium Impact", value: 18, color: "#D99A28" },
  { name: "Low Impact", value: 14, color: "#4969E8" },
  { name: "No Impact", value: 7, color: "#9CA3AF" },
];

const barData = [
  { name: "KYC & Customer Onboarding", obligations: 14 },
  { name: "Risk & Compliance", obligations: 10 },
  { name: "Operations", obligations: 8 },
  { name: "IT & Technology", obligations: 6 },
  { name: "Legal", obligations: 5 },
  { name: "Finance", obligations: 3 },
  { name: "HR", obligations: 2 },
];

export default function ImpactAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analyzed, setAnalyzed] = useState(true);

  const steps = [
    "REGULATION RECEIVED",
    "UNDERSTANDING OBLIGATIONS",
    "SEARCHING POLICY KNOWLEDGE BASE",
    "MAPPING IMPACT",
    "ASSESSING RISK",
    "ANALYSIS COMPLETE"
  ];

  const handleAnalyze = () => {
    setAnalyzing(true);
    setAnalyzed(false);
    setAnalysisStep(0);
  };

  useEffect(() => {
    if (analyzing && analysisStep < steps.length) {
      const timer = setTimeout(() => {
        if (analysisStep === steps.length - 1) {
           setAnalyzing(false);
           setAnalyzed(true);
        } else {
           setAnalysisStep(s => s + 1);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [analyzing, analysisStep]);

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

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-indigo">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Impact Analysis</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Impact Analysis</h1>
          <p className="text-muted-foreground mt-1 text-base">Understand the impact of new and existing regulations on your organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-indigo text-indigo rounded-md font-medium text-sm hover:bg-indigo/5 transition-colors">
            <Upload className="w-4 h-4" /> Upload Regulation
          </button>
          <button 
            onClick={handleAnalyze}
            disabled={analyzing}
            className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md font-medium text-sm hover:bg-indigo/90 transition-colors shadow-md shadow-indigo/20 disabled:opacity-50">
            <Sparkles className="w-4 h-4" /> Analyze with AI
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Content Area */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Metrics Cards */}
          <div className="grid grid-cols-4 gap-4">
            <MetricCard 
              icon={<FileText className="w-6 h-6 text-indigo" />} iconBg="bg-indigo/10" 
              value={analyzed ? "12" : "-"} label="Regulations Analyzed" trend="↑ 20%" trendColor="text-teal" />
            <MetricCard 
              icon={<ListOrdered className="w-6 h-6 text-indigo" />} iconBg="bg-indigo/10" 
              value={analyzed ? "48" : "-"} label="Obligations Identified" trend="↑ 15%" trendColor="text-teal" />
            <MetricCard 
              icon={<AlertTriangle className="w-6 h-6 text-red" />} iconBg="bg-red/10 border border-red/20" 
              value={analyzed ? "9" : "-"} label="High Impact Areas" trend="↓ 25%" trendColor="text-teal" />
            <MetricCard 
              icon={<Users className="w-6 h-6 text-indigo" />} iconBg="bg-indigo/10" 
              value={analyzed ? "6" : "-"} label="Departments Affected" trend="↑ 50%" trendColor="text-red" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Impact Overview (Donut) */}
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-6  flex flex-col opacity-100 transition-opacity">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-lg">Impact Overview</h3>
                  <p className="text-xs text-muted-foreground mt-1">Distribution of regulatory impacts across your organization</p>
                </div>
                <select className="bg-transparent border border-border rounded px-2 py-1 text-sm outline-none">
                  <option>By Impact Level</option>
                </select>
              </div>
              
              {analyzed ? (
                 <div className="flex-1 flex items-center justify-between">
                   <div className="h-48 w-48 relative shrink-0">
                     <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                         <Pie
                           data={donutData}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={2}
                           dataKey="value"
                           stroke="none"
                         >
                           {donutData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                         </Pie>
                       </PieChart>
                     </ResponsiveContainer>
                     <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <span className="text-3xl font-bold">48</span>
                       <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider text-center leading-tight mt-1">Total<br/>Obligations</span>
                     </div>
                   </div>

                   <div className="flex-1 ml-6 space-y-4">
                     {donutData.map((item) => (
                       <div key={item.name} className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                           <span className="text-sm font-medium">{item.name}</span>
                         </div>
                         <div className="flex items-center gap-4">
                           <span className="text-sm font-bold w-4 text-right">{item.value}</span>
                           <span className="text-sm text-muted-foreground w-10 text-right">{Math.round((item.value / 48) * 100)}%</span>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
              ) : (
                 <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm font-medium flex-col gap-2">
                    <Sparkles className="w-8 h-8 opacity-20" />
                    Click Analyze to generate impact metrics
                 </div>
              )}
            </div>

            {/* Departments Affected (Bar) */}
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-6  flex flex-col">
              <div className="mb-6">
                <h3 className="font-bold text-lg">Departments Affected</h3>
                <p className="text-xs text-muted-foreground mt-1">Number of obligations by department</p>
              </div>
              {analyzed ? (
                 <div className="flex-1 flex flex-col justify-center space-y-4">
                   {barData.map((item, i) => (
                     <div key={item.name} className="flex items-center gap-4">
                       <div className="w-40 shrink-0 text-xs font-medium truncate" title={item.name}>{item.name}</div>
                       <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                         <div 
                           className={`h-full rounded-full ${i === 0 ? "bg-[#9B8CFA]" : i === 1 ? "bg-[#4969E8]" : i === 2 ? "bg-[#38BDF8]" : i === 3 ? "bg-[#16A394]" : i === 4 ? "bg-[#FACC15]" : "bg-border"}`} 
                           style={{ width: `${(item.obligations / 14) * 100}%` }}
                         />
                       </div>
                       <div className="w-4 text-xs font-bold text-right">{item.obligations}</div>
                     </div>
                   ))}
                 </div>
              ) : (
                 <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm font-medium flex-col gap-2">
                    <Users className="w-8 h-8 opacity-20" />
                    Awaiting analysis
                 </div>
              )}
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]   flex flex-col pb-4">
            <div className="p-4 border-b border-border flex flex-col gap-4">
              <div className="flex items-center gap-6 text-sm font-medium">
                <div className="text-indigo border-b-2 border-indigo pb-2 -mb-2">All Impacts (48)</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pb-2">High Impact (9)</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pb-2">Medium Impact (18)</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pb-2">Low Impact (14)</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer pb-2">No Impact (7)</div>
                <button className="ml-auto flex items-center gap-2 text-indigo border border-border px-3 py-1.5 rounded bg-background hover:bg-secondary transition-colors">
                  <Filter className="w-4 h-4" /> Filters
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" placeholder="Search obligations, clauses, keywords..." className="w-full pl-9 pr-3 py-1.5 text-sm border border-border rounded bg-background focus:outline-none focus:border-indigo" />
                </div>
                <select className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none"><option>Department</option></select>
                <select className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none"><option>Impact Level</option></select>
                <select className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none"><option>Regulation</option></select>
                <select className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none"><option>Status</option></select>
                <button className="text-indigo text-sm font-medium hover:underline ml-2">Clear Filters</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-foreground font-bold bg-secondary/30">
                  <tr>
                    <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded border-border" /></th>
                    <th className="px-4 py-3">Clause / Obligation</th>
                    <th className="px-4 py-3">Source Regulation</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3 text-center">Impact Level</th>
                    <th className="px-4 py-3 w-[280px]">Summary of Impact</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-medium text-sm">
                  {analyzed ? [
                    { id: "C.2.1", title: "Customer Identity Verification", src: "RBI KYC Master Direction 2026", dept: "KYC", impact: "High", summary: "Additional verification steps for non face-to-face customers", status: "Action Required" },
                    { id: "C.3.4", title: "Periodic Review", src: "RBI KYC Master Direction 2026", dept: "Operations", impact: "Medium", summary: "Review customer accounts based on risk profile", status: "In Progress" },
                    { id: "D.1.2", title: "Data Retention", src: "RBI Data Localization Guidelines", dept: "IT", impact: "High", summary: "Update data retention policy to 7 years", status: "Pending" },
                    { id: "E.4.1", title: "Suspicious Transaction Monitoring", src: "AML Guidelines 2026", dept: "Compliance", impact: "Medium", summary: "Enhanced monitoring for high-value transactions", status: "In Progress" },
                    { id: "F.2.3", title: "Reporting to FIU", src: "AML Guidelines 2026", dept: "Compliance", impact: "Low", summary: "No significant changes, minor format updates", status: "Completed" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-4"><input type="checkbox" className="rounded border-border" /></td>
                      <td className="px-4 py-4">
                        <span className="text-muted-foreground mr-1">{row.id} -</span>
                        <span className="text-foreground">{row.title}</span>
                      </td>
                      <td className="px-4 py-4 text-indigo text-xs">{row.src}</td>
                      <td className="px-4 py-4">{row.dept}</td>
                      <td className="px-4 py-4 text-center"><RiskBadge level={row.impact} /></td>
                      <td className="px-4 py-4 text-xs font-normal text-muted-foreground leading-relaxed">{row.summary}</td>
                      <td className="px-4 py-4">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-4 py-4 text-right">
                         <button><MoreVertical className="w-4 h-4 text-muted-foreground hover:text-indigo" /></button>
                      </td>
                    </tr>
                  )) : (
                     <tr><td colSpan={8} className="py-12 text-center text-muted-foreground">Click "Analyze with AI" to view regulatory impacts</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="flex items-center justify-between px-4 mt-4">
              <span className="text-xs text-muted-foreground">Showing 1–5 of 48 obligations</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-secondary text-muted-foreground"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="w-8 h-8 flex items-center justify-center border border-indigo bg-indigo text-white rounded">1</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-secondary">2</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-secondary">3</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-secondary">4</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-secondary">5</button>
                  <span className="text-muted-foreground mx-1">...</span>
                  <button className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-secondary">10</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-secondary text-muted-foreground"><ChevronRight className="w-4 h-4" /></button>
                </div>
                <select className="border border-border rounded px-2 py-1 text-xs outline-none bg-background">
                  <option>5 per page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[320px] shrink-0 space-y-6">
          {/* Recent Analysis */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">Recent Analysis</h3>
              <button className="text-indigo text-xs font-semibold hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {[
                { title: "RBI KYC Master Direction 2026", status: "Completed", date: "20 Aug 2026", pages: "42 pages" },
                { title: "AML Guidelines Update", status: "Completed", date: "12 Aug 2026", pages: "18 pages" },
                { title: "Cyber Security Framework", status: "In Progress", date: "10 Aug 2026", pages: "35 pages" },
                { title: "Priority Sector Lending Update", status: "Completed", date: "05 Aug 2026", pages: "28 pages" },
                { title: "Customer Data Protection Rules", status: "Completed", date: "28 Jul 2026", pages: "22 pages" },
              ].map((item, i) => (
                <div key={i} className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-3 flex gap-3  hover:border-indigo/30 transition-colors cursor-pointer group">
                  <div className="mt-0.5 p-1.5 rounded bg-indigo/10 text-indigo shrink-0"><FileText className="w-4 h-4" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate group-hover:text-indigo transition-colors">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.status === "Completed" ? "bg-teal" : "bg-indigo"}`} />
                      <span className="text-[10px] text-muted-foreground">{item.status} • {item.pages}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          {analyzed && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-center mb-3">
                 <h3 className="font-bold">Key Insights</h3>
                 <button className="flex items-center gap-1 text-indigo border border-border bg-card px-2 py-1 rounded text-xs font-semibold shadow-sm hover:bg-secondary">
                   <ArrowUpRight className="w-3 h-3" /> Generate Report
                 </button>
               </div>
               <div className="space-y-4 bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-4 ">
                 <div className="flex gap-3 items-start pb-3 border-b border-border">
                   <div className="p-1.5 rounded bg-red/10 text-red shrink-0 mt-0.5"><AlertTriangle className="w-4 h-4" /></div>
                   <p className="text-sm font-medium">9 high-impact obligations require immediate attention.</p>
                 </div>
                 <div className="flex gap-3 items-start pb-3 border-b border-border">
                   <div className="p-1.5 rounded bg-purple-100 text-purple-600 shrink-0 mt-0.5"><Users className="w-4 h-4" /></div>
                   <p className="text-sm font-medium">KYC department is most affected (29% of total obligations).</p>
                 </div>
                 <div className="flex gap-3 items-start pb-3 border-b border-border">
                   <div className="p-1.5 rounded bg-teal/10 text-teal shrink-0 mt-0.5"><TrendingUp className="w-4 h-4" /></div>
                   <p className="text-sm font-medium">Overall compliance workload expected to increase by 23%.</p>
                 </div>
                 <div className="flex gap-3 items-start">
                   <div className="p-1.5 rounded bg-blue-100 text-blue-600 shrink-0 mt-0.5"><Info className="w-4 h-4" /></div>
                   <p className="text-sm font-medium">3 regulations have overlapping requirements.</p>
                 </div>
               </div>
            </div>
          )}

          {/* Recommended Actions */}
          {analyzed && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-center mb-3">
                 <h3 className="font-bold">Recommended Actions</h3>
                 <button className="text-indigo text-xs font-semibold hover:underline">View All</button>
               </div>
               <div className="space-y-4 bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-4 ">
                 {[
                   "Prioritize implementation of new KYC verification requirements",
                   "Update transaction monitoring systems",
                   "Review and align data retention policies",
                   "Conduct cross-department impact review"
                 ].map((action, i) => (
                   <div key={i} className="flex gap-3 items-start">
                     <div className="w-6 h-6 rounded-full border border-indigo/30 text-indigo flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                     <p className="text-sm font-medium">{action}</p>
                   </div>
                 ))}
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, iconBg, value, label, trend, trendColor }: any) {
  return (
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5  flex gap-4  h-full">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold leading-none">{value}</h3>
        <span className="text-xs font-semibold text-muted-foreground mt-2">{label}</span>
        {trend && <span className={`text-xs font-bold mt-1 ${trendColor}`}>{trend}</span>}
      </div>
    </div>
  );
}
