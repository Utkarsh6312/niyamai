"use client";
import { useState } from "react";
import { Search, ChevronRight, ChevronDown, Plus, FileText, Book, Landmark, Users, Download, X, MoreVertical, MoreHorizontal, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import { StatusBadge, RiskBadge } from "@/components/ui/badges";

export default function PolicyLibrary() {
  const [selectedDocId, setSelectedDocId] = useState<string>("DOC-1");

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
          <p className="text-muted-foreground mt-1 text-base">Browse, search and manage regulatory documents, internal policies and guidance.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md font-medium text-sm hover:bg-indigo/90 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Document
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard 
          icon={<Book className="w-6 h-6 text-indigo" />} iconBg="bg-indigo/10" 
          value="1,248" label="Total Documents" trend="↑ 12%" trendColor="text-teal" />
        <MetricCard 
          icon={<Landmark className="w-6 h-6 text-indigo" />} iconBg="bg-indigo/10" 
          value="342" label="RBI Regulations" trend="↑ 8%" trendColor="text-teal" />
        <MetricCard 
          icon={<FileText className="w-6 h-6 text-green-600" />} iconBg="bg-green-100" 
          value="678" label="Internal Policies" trend="↑ 15%" trendColor="text-teal" />
        <MetricCard 
          icon={<Users className="w-6 h-6 text-purple-600" />} iconBg="bg-purple-100" 
          value="228" label="Guidance & Circulars" trend="↑ 6%" trendColor="text-teal" />
      </div>

      {/* Main Content Area */}
      <div className="flex gap-6 flex-1 h-[600px] lg:h-[800px] min-h-[600px]">
        
        {/* Left List */}
        <div className={`flex-1 flex flex-col bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]   overflow-hidden ${selectedDocId ? "hidden lg:flex" : ""}`}>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm font-medium">
              <div className="text-indigo border-b-2 border-indigo pb-4 -mb-4">All Documents</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer">RBI Regulations</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer">Internal Policies</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer">Circulars & Guidance</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer">External References</div>
            </div>
          </div>

          <div className="p-4 border-b border-border flex items-center gap-3 overflow-x-auto no-scrollbar">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search by title, keyword, document number..." className="w-full pl-9 pr-3 py-1.5 text-sm border border-border rounded bg-background focus:outline-none focus:border-indigo" />
            </div>
            <select className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none"><option>All Types</option></select>
            <select className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none"><option>All Status</option></select>
            <select className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none"><option>All Departments</option></select>
            <select className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none"><option>Effective Date</option></select>
            <button className="text-indigo text-sm font-medium hover:underline ml-2">Clear Filters</button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-[11px] text-foreground font-bold bg-secondary/30 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded border-border" /></th>
                  <th className="px-4 py-3 min-w-[300px]">Document</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Effective Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Relevance</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {[
                  { id: "DOC-1", title: "RBI Master Direction — KYC (2026)", sub: "RBI/2026-27/45 • Know Your Customer (KYC) Master Direction", type: "Regulation", source: "RBI", date: "01 Oct 2026", status: "Active", rel: "High", iconColor: "text-indigo", iconBg: "bg-indigo/10" },
                  { id: "DOC-2", title: "Customer Due Diligence Guidelines", sub: "RBI/2024-25/12 • Guidelines on CDD for Financial Institutions", type: "Guidance", source: "RBI", date: "15 Jan 2025", status: "Active", rel: "High", iconColor: "text-purple-600", iconBg: "bg-purple-100" },
                  { id: "DOC-3", title: "AML Policy v3.4", sub: "POL/AML/2024 • Anti-Money Laundering Internal Policy", type: "Internal Policy", source: "Aarohan Bank", date: "20 Mar 2024", status: "Active", rel: "Medium", iconColor: "text-green-600", iconBg: "bg-green-100" },
                  { id: "DOC-4", title: "Counter Terrorism Financing Framework", sub: "RBI/2023-24/78 • CFT framework for regulated entities", type: "Regulation", source: "RBI", date: "01 Jul 2023", status: "Active", rel: "High", iconColor: "text-indigo", iconBg: "bg-indigo/10" },
                  { id: "DOC-5", title: "Digital Lending – Fair Practices", sub: "RBI/2024-25/30 • Guidelines on Digital Lending", type: "Regulation", source: "RBI", date: "01 Aug 2024", status: "Active", rel: "Medium", iconColor: "text-indigo", iconBg: "bg-indigo/10" },
                  { id: "DOC-6", title: "IT Outsourcing Policy", sub: "POL/IT/2024 • Policy on IT outsourcing and third-party risk", type: "Internal Policy", source: "Aarohan Bank", date: "10 Feb 2024", status: "Active", rel: "Medium", iconColor: "text-green-600", iconBg: "bg-green-100" },
                  { id: "DOC-7", title: "Data Localization Circular", sub: "RBI/2022-23/19 • Storage of Payment System Data", type: "Circular", source: "RBI", date: "01 Nov 2022", status: "Superseded", rel: "Low", iconColor: "text-slate-500", iconBg: "bg-slate-100" },
                  { id: "DOC-8", title: "Customer Grievance Redressal", sub: "POL/CGR/2024 • Grievance handling and resolution policy", type: "Internal Policy", source: "Aarohan Bank", date: "05 Jan 2024", status: "Active", rel: "Medium", iconColor: "text-green-600", iconBg: "bg-green-100" },
                ].map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedDocId(row.id)}
                    className={`cursor-pointer transition-colors ${selectedDocId === row.id ? "bg-indigo/5" : "hover:bg-secondary/30"}`}
                  >
                    <td className="px-4 py-4"><input type="checkbox" className="rounded border-border" /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 p-1.5 rounded ${row.iconBg} ${row.iconColor}`}><FileText className="w-4 h-4 shrink-0" /></div>
                        <div className="whitespace-normal">
                          <p className="font-semibold text-foreground line-clamp-1">{row.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{row.sub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                       <span className={`px-2 py-0.5 rounded text-xs whitespace-nowrap ${row.type === "Regulation" ? "bg-indigo/10 text-indigo" : row.type === "Internal Policy" ? "bg-green-100 text-green-700" : row.type === "Guidance" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"}`}>{row.type}</span>
                    </td>
                    <td className="px-4 py-4 text-xs whitespace-nowrap">{row.source}</td>
                    <td className="px-4 py-4 text-xs whitespace-nowrap">{row.date}</td>
                    <td className="px-4 py-4 whitespace-nowrap"><StatusBadge status={row.status} /></td>
                    <td className="px-4 py-4 text-center whitespace-nowrap"><RiskBadge level={row.rel} /></td>
                    <td className="px-4 py-4 text-right whitespace-nowrap"><button><MoreVertical className="w-4 h-4 text-muted-foreground hover:text-indigo" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing 1-8 of 1,248 documents</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 border border-border rounded hover:bg-secondary">&lt;</button>
              <button className="px-3 py-1 bg-indigo text-white rounded">1</button>
              <button className="px-3 py-1 hover:bg-secondary rounded">2</button>
              <button className="px-3 py-1 hover:bg-secondary rounded">3</button>
              <button className="px-3 py-1 hover:bg-secondary rounded">4</button>
              <button className="px-3 py-1 hover:bg-secondary rounded">5</button>
              <span className="px-2">...</span>
              <button className="px-2 py-1 border border-border rounded hover:bg-secondary">&gt;</button>
              <select className="ml-4 bg-transparent border border-border rounded px-2 py-1 outline-none"><option>10 per page</option></select>
            </div>
          </div>
        </div>

        {/* Right Panel (Details) */}
        {selectedDocId === "DOC-1" && (
          <div className="w-full lg:w-[400px] border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex flex-col bg-card overflow-hidden shrink-0">
            <div className="p-6 border-b border-border relative">
              <div className="flex items-center gap-2 mb-4">
                 <div className="flex items-center justify-center bg-red-500 text-white rounded-sm w-7 h-8 relative">
                    <span className="text-[10px] font-bold">PDF</span>
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-white/20 rounded-bl-sm" />
                 </div>
                 <span className="bg-indigo/10 text-indigo px-2 py-0.5 rounded text-xs font-medium">Regulation</span>
                 <StatusBadge status="Active" />
                 <div className="ml-auto flex items-center gap-2 text-muted-foreground">
                    <button className="w-6 h-6 flex items-center justify-center border border-border rounded hover:bg-secondary"><MoreHorizontal className="w-4 h-4" /></button>
                    <button onClick={() => setSelectedDocId("")} className="w-6 h-6 flex items-center justify-center hover:text-foreground"><X className="w-4 h-4" /></button>
                 </div>
              </div>
              <h2 className="font-serif font-bold text-xl leading-tight mb-1">RBI Master Direction — KYC (2026)</h2>
              <p className="text-sm text-muted-foreground">RBI/2026-27/45</p>
              
              <p className="text-sm text-foreground mt-4 leading-relaxed">
                Consolidated KYC directions for all regulated entities including customer due diligence, periodic review, and enhanced due diligence requirements.
              </p>

              <div className="flex gap-4 text-sm font-medium mt-6 border-b border-border overflow-x-auto no-scrollbar">
                <div className="text-indigo border-b-2 border-indigo pb-2 -mb-px whitespace-nowrap">Overview</div>
                <div className="text-muted-foreground hover:text-foreground pb-2 cursor-pointer whitespace-nowrap">Clauses (42)</div>
                <div className="text-muted-foreground hover:text-foreground pb-2 cursor-pointer whitespace-nowrap">Obligations (74)</div>
                <div className="text-muted-foreground hover:text-foreground pb-2 cursor-pointer whitespace-nowrap">Mapping (12)</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Metadata Grid */}
              <div className="space-y-3">
                 <div className="flex">
                    <div className="w-32 text-xs text-muted-foreground">Issuer</div>
                    <div className="flex-1 text-sm font-medium">Reserve Bank of India</div>
                 </div>
                 <div className="flex">
                    <div className="w-32 text-xs text-muted-foreground">Effective Date</div>
                    <div className="flex-1 text-sm font-medium">01 Oct 2026</div>
                 </div>
                 <div className="flex">
                    <div className="w-32 text-xs text-muted-foreground">Reference No.</div>
                    <div className="flex-1 text-sm font-medium">RBI/2026-27/45</div>
                 </div>
                 <div className="flex">
                    <div className="w-32 text-xs text-muted-foreground">Document Type</div>
                    <div className="flex-1 text-sm font-medium">Master Direction</div>
                 </div>
                 <div className="flex">
                    <div className="w-32 text-xs text-muted-foreground">Applicable To</div>
                    <div className="flex-1 text-sm font-medium">All Regulated Entities</div>
                 </div>
                 <div className="flex">
                    <div className="w-32 text-xs text-muted-foreground">Language</div>
                    <div className="flex-1 text-sm font-medium">English</div>
                 </div>
                 <div className="flex">
                    <div className="w-32 text-xs text-muted-foreground">Pages</div>
                    <div className="flex-1 text-sm font-medium">42</div>
                 </div>
                 <div className="flex">
                    <div className="w-32 text-xs text-muted-foreground">Last Updated</div>
                    <div className="flex-1 text-sm font-medium">20 Aug 2026</div>
                 </div>
              </div>

              <div className="flex gap-3 pt-2">
                 <button className="flex-1 bg-indigo text-white px-4 py-2 rounded flex items-center justify-center gap-2 text-sm font-medium hover:bg-indigo/90">
                    View Full Document <ExternalLink className="w-4 h-4" />
                 </button>
                 <button className="px-4 py-2 border border-border text-foreground rounded flex items-center justify-center gap-2 text-sm font-medium hover:bg-secondary">
                    <Download className="w-4 h-4" /> Download <ChevronDown className="w-4 h-4" />
                 </button>
              </div>

              {/* Key Topics */}
              <div className="pt-2 border-t border-border">
                 <h3 className="font-bold mb-3">Key Topics</h3>
                 <div className="flex flex-wrap gap-2">
                    {["Customer Due Diligence", "Enhanced Due Diligence", "PEPs", "Non-face-to-face Onboarding", "Periodic Review", "Record Keeping"].map((topic, i) => (
                       <span key={i} className="bg-indigo/5 text-indigo border border-indigo/10 px-2 py-1 rounded text-xs font-medium">
                          {topic}
                       </span>
                    ))}
                 </div>
              </div>

              {/* AI Summary */}
              <div className="pt-4 border-t border-border">
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold flex items-center gap-2">
                       <Sparkles className="w-4 h-4 text-indigo" /> AI Summary
                    </h3>
                    <Link href="/impact-analysis" className="text-indigo text-xs font-medium hover:underline flex items-center">
                       View Detailed Analysis <ChevronRight className="w-3 h-3" />
                    </Link>
                 </div>
                 <p className="text-sm text-foreground leading-relaxed">
                    This Master Direction updates KYC requirements, expands CDD for high-risk customers, introduces additional verification for non-face-to-face onboarding, and mandates periodic review based on customer risk profile.
                 </p>
              </div>

              {/* Related Documents */}
              <div className="pt-4 border-t border-border">
                 <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold">Related Documents</h3>
                    <button className="text-indigo text-xs font-medium hover:underline flex items-center">
                       View All <ChevronRight className="w-3 h-3" />
                    </button>
                 </div>
                 <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 hover:bg-secondary rounded cursor-pointer group">
                       <div className="p-1.5 rounded bg-green-100 text-green-600"><FileText className="w-4 h-4" /></div>
                       <div className="flex-1">
                          <p className="font-semibold text-sm group-hover:text-indigo">KYC Policy v3.4</p>
                          <p className="text-xs text-muted-foreground">Internal Policy</p>
                       </div>
                       <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-3 p-2 hover:bg-secondary rounded cursor-pointer group">
                       <div className="p-1.5 rounded bg-purple-100 text-purple-600"><FileText className="w-4 h-4" /></div>
                       <div className="flex-1">
                          <p className="font-semibold text-sm group-hover:text-indigo">Customer Due Diligence Guidelines</p>
                          <p className="text-xs text-muted-foreground">RBI Guidance</p>
                       </div>
                       <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  iconBg: string;
  value: string | number;
  label: string;
  trend: string;
  trendColor: string;
}

function MetricCard({ icon, iconBg, value, label, trend, trendColor }: MetricCardProps) {
  return (
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5  flex items-center gap-4 ">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <span className="text-xs font-semibold text-muted-foreground">{label}</span>
        <p className={`text-xs mt-1 font-medium ${trendColor}`}>{trend}</p>
      </div>
    </div>
  );
}
