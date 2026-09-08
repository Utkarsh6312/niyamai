"use client";
import { Search, ChevronRight, Settings, Plus, FileText, CheckCircle2, Bookmark, MoreVertical, Calendar, Building, Globe, Shield, Clock, X, Scale } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { RiskBadge } from "@/components/ui/badges";

// Base 10 items
const baseFeedData = [
  {
    id: "REV-2026-08-20", iconColor: "text-blue-600", iconBg: "bg-blue-100", title: "RBI KYC Master Direction 2026", subtitle: "Updated KYC norms with enhanced due diligence...", sourceAcronym: "RBI", sourceName: "Reserve Bank of India", sourceIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Reserve_Bank_of_India_logo.svg/1200px-Reserve_Bank_of_India_logo.svg.png", category: "KYC / AML", impact: "High", publishedDate: "20 Aug 2026", timeAgo: "2 hours ago", overview: "The RBI KYC Master Direction 2026 introduces enhanced customer due diligence requirements, especially for higher risk customers. It mandates additional verification steps, periodic review of customer accounts, and stricter monitoring of transactions.", metadata: { effectiveDate: "01 Oct 2026", deadline: "30 Sep 2026", deadlineText: "42 days left", appliesTo: "All Regulated Entities", type: "Master Direction", ref: "RBI/2026-27/45", pages: "42", language: "English" }, takeaways: ["Enhanced due diligence for high-risk customers", "Additional verification of source of funds and wealth", "Periodic review of customer accounts", "Stricter transaction monitoring requirements", "Updated record keeping and reporting obligations"]
  },
  { id: "REV-2026-08-18", iconColor: "text-red", iconBg: "bg-red/10", title: "Cyber Security Framework Update", subtitle: "Revised guidelines for regulated entities", sourceAcronym: "RBI", sourceName: "Reserve Bank of India", sourceIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Reserve_Bank_of_India_logo.svg/1200px-Reserve_Bank_of_India_logo.svg.png", category: "Cyber Security", impact: "High", publishedDate: "18 Aug 2026", timeAgo: "1 day ago" },
  { id: "REV-2026-08-12", iconColor: "text-blue-600", iconBg: "bg-blue-100", title: "AML Guidelines Amendment", subtitle: "Clarifications on suspicious transaction reporting", sourceAcronym: "FIU-IND", sourceName: "Financial Intelligence Unit", sourceIcon: "", category: "AML / CFT", impact: "Medium", publishedDate: "12 Aug 2026", timeAgo: "4 days ago" },
  { id: "REV-2026-08-05", iconColor: "text-green-600", iconBg: "bg-green-100", title: "Priority Sector Lending Update", subtitle: "Revised PSL targets for FY2026-27", sourceAcronym: "RBI", sourceName: "Reserve Bank of India", sourceIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Reserve_Bank_of_India_logo.svg/1200px-Reserve_Bank_of_India_logo.svg.png", category: "Lending", impact: "Medium", publishedDate: "05 Aug 2026", timeAgo: "1 week ago" },
  { id: "REV-2026-07-28", iconColor: "text-purple-600", iconBg: "bg-purple-100", title: "Customer Data Protection Rules", subtitle: "Framework for data localization and privacy", sourceAcronym: "MeitY", sourceName: "Ministry of Electronics & IT", sourceIcon: "", category: "Data Protection", impact: "High", publishedDate: "28 Jul 2026", timeAgo: "2 weeks ago" },
  { id: "REV-2026-07-25", iconColor: "text-blue-600", iconBg: "bg-blue-100", title: "SEBI ESG Disclosure Norms", subtitle: "Enhanced ESG reporting requirements", sourceAcronym: "SEBI", sourceName: "Securities and Exchange Board", sourceIcon: "", category: "ESG / Reporting", impact: "Medium", publishedDate: "25 Jul 2026", timeAgo: "2 weeks ago" },
  { id: "REV-2026-07-20", iconColor: "text-green-600", iconBg: "bg-green-100", title: "IRDAI Health Insurance Guidelines", subtitle: "New product approval and distribution norms", sourceAcronym: "IRDAI", sourceName: "Insurance Regulatory Authority", sourceIcon: "", category: "Insurance", impact: "Low", publishedDate: "20 Jul 2026", timeAgo: "3 weeks ago" },
  { id: "REV-2026-07-18", iconColor: "text-purple-600", iconBg: "bg-purple-100", title: "MCA Corporate Governance Update", subtitle: "Revised disclosure requirements for listed entities", sourceAcronym: "MCA", sourceName: "Ministry of Corporate Affairs", sourceIcon: "", category: "Governance", impact: "Medium", publishedDate: "18 Jul 2026", timeAgo: "3 weeks ago" },
  { id: "REV-2026-07-15", iconColor: "text-blue-600", iconBg: "bg-blue-100", title: "Digital Lending Guidelines", subtitle: "Responsible lending practices for digital platforms", sourceAcronym: "RBI", sourceName: "Reserve Bank of India", sourceIcon: "", category: "Digital Lending", impact: "Medium", publishedDate: "15 Jul 2026", timeAgo: "3 weeks ago" },
  { id: "REV-2026-07-10", iconColor: "text-red", iconBg: "bg-red/10", title: "Cross-border Payment Regulations", subtitle: "Updated rules for outward remittances", sourceAcronym: "RBI", sourceName: "Reserve Bank of India", sourceIcon: "", category: "Cross-border", impact: "Low", publishedDate: "10 Jul 2026", timeAgo: "1 month ago" }
];

// Generate 24 items to match the "24 Updates" label
const fullFeedData = [
  ...baseFeedData,
  ...baseFeedData.map(item => ({ ...item, id: item.id + "-2", title: item.title + " (Annexure)" })),
  ...baseFeedData.slice(0, 4).map(item => ({ ...item, id: item.id + "-3", title: item.title + " (Circular)" }))
];

export default function RegulatoryFeed() {
  const [selectedEventId, setSelectedEventId] = useState<string>("REV-2026-08-20");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const selectedEvent = fullFeedData.find(e => e.id === selectedEventId) || fullFeedData[0];

  const totalPages = Math.ceil(fullFeedData.length / itemsPerPage);
  
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return fullFeedData.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-6rem)] -m-6 p-6">
      {/* Breadcrumb & Header container */}
      <div className="shrink-0 space-y-6">
         <div className="flex items-center gap-2 text-sm text-muted-foreground">
           <Link href="/" className="hover:text-indigo">Home</Link>
           <ChevronRight className="w-4 h-4" />
           <span className="text-foreground">Regulatory Feed</span>
         </div>

         <div className="flex items-start justify-between">
           <div>
             <h1 className="text-3xl font-bold tracking-tight">Regulatory Intelligence Feed</h1>
             <p className="text-muted-foreground mt-1 text-base">Stay updated with the latest regulatory developments from trusted sources.</p>
           </div>
           <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 border border-indigo text-indigo bg-background rounded-md font-medium text-sm hover:bg-indigo/5 transition-colors">
               <Settings className="w-4 h-4" /> Source Preferences
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md font-medium text-sm hover:bg-indigo/90 transition-colors shadow-sm">
               <Plus className="w-4 h-4" /> Add Source
             </button>
           </div>
         </div>

         <div className="grid grid-cols-4 gap-4">
           <MetricCard icon={<FileText className="w-6 h-6 text-indigo" />} iconBg="bg-indigo/10" value="24" label="New Updates" trend="↑ 33% (vs. last week)" trendColor="text-teal" />
           <MetricCard icon={<FileText className="w-6 h-6 text-purple-600" />} iconBg="bg-purple-100" value="6" label="High Priority" trend="↑ 200%" trendColor="text-red" />
           <MetricCard icon={<Calendar className="w-6 h-6 text-green-600" />} iconBg="bg-green-100" value="3" label="Upcoming Deadlines" trend="Next 30 days" trendColor="text-muted-foreground" />
           <MetricCard icon={<Building className="w-6 h-6 text-blue-600" />} iconBg="bg-blue-100" value="12" label="Regulatory Sources" trend="RBI, SEBI, IRDAI +9" trendColor="text-muted-foreground" />
         </div>
      </div>

      {/* Main Content Area - Expands to fill available height */}
      <div className="flex gap-6 flex-1 min-h-0">
        
        {/* Left List */}
        <div className={`flex-1 flex flex-col bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]   ${selectedEventId ? "hidden lg:flex" : ""}`}>
          <div className="p-0 border-b border-border flex flex-col shrink-0">
            <div className="flex items-center text-sm font-medium pt-4 px-4 overflow-x-auto">
              <div className="text-indigo border-b-2 border-indigo pb-4 px-2 whitespace-nowrap">All Updates (24)</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer pb-4 px-4 whitespace-nowrap">RBI (8)</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer pb-4 px-4 whitespace-nowrap">SEBI (5)</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer pb-4 px-4 whitespace-nowrap">IRDAI (3)</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer pb-4 px-4 whitespace-nowrap">MCA (2)</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer pb-4 px-4 whitespace-nowrap">MeitY (2)</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer pb-4 px-4 whitespace-nowrap">Other (4)</div>
            </div>
            <div className="flex items-center justify-end gap-3 pr-4 pb-3 border-t border-border pt-3">
               <select className="bg-background border border-border rounded px-2 py-1.5 text-xs outline-none text-muted-foreground font-medium"><option>All Categories</option></select>
               <select className="bg-background border border-border rounded px-2 py-1.5 text-xs outline-none text-muted-foreground font-medium"><option>Last 30 Days</option></select>
               <div className="relative">
                 <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                 <input type="text" placeholder="Search feed..." className="w-36 pl-8 pr-3 py-1.5 text-xs border border-border rounded bg-background focus:outline-none focus:border-indigo" />
               </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-foreground font-bold bg-background uppercase tracking-wider sticky top-0 z-10 border-b border-border shadow-sm">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-center">Impact</th>
                  <th className="px-4 py-3">Published Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {paginatedData.map((row, i) => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedEventId(row.id)}
                    className={`cursor-pointer transition-colors ${selectedEventId === row.id ? "bg-indigo/5" : "hover:bg-secondary/30"}`}
                  >
                    <td className="px-4 py-4 min-w-[300px]">
                      <div className="flex gap-3 items-start">
                        <div className={`mt-0.5 p-1.5 rounded ${row.iconBg} ${row.iconColor} shrink-0`}><FileText className="w-4 h-4" /></div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-foreground truncate">{row.title}</span>
                          <span className="text-[10px] text-muted-foreground mt-0.5 truncate">{row.subtitle}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 min-w-[180px]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 overflow-hidden border border-border">
                           {row.sourceIcon ? <img src={row.sourceIcon} alt={row.sourceAcronym} className="w-4 h-4 object-contain" /> : <Building className="w-3 h-3 text-muted-foreground" />}
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-xs">{row.sourceAcronym}</span>
                           <span className="text-[10px] text-muted-foreground">{row.sourceName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-muted-foreground min-w-[120px]">{row.category}</td>
                    <td className="px-4 py-4 text-center">
                       <RiskBadge level={row.impact} />
                    </td>
                    <td className="px-4 py-4 min-w-[120px]">
                       <div className="flex flex-col">
                          <span className="text-xs text-foreground font-medium">{row.publishedDate}</span>
                          <span className="text-[10px] text-muted-foreground">{row.timeAgo}</span>
                       </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                       <div className="flex items-center justify-end gap-2 text-muted-foreground">
                          <button className="hover:text-indigo transition-colors p-1"><Bookmark className="w-4 h-4" /></button>
                          <button className="hover:text-foreground transition-colors p-1"><MoreVertical className="w-4 h-4" /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-border bg-card shrink-0 flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, fullFeedData.length)} of {fullFeedData.length} updates</span>
            <div className="flex items-center gap-1">
              <button 
                 onClick={() => handlePageChange(currentPage - 1)}
                 disabled={currentPage === 1}
                 className="px-2 py-1 border border-border rounded hover:bg-secondary disabled:opacity-50">&lt;</button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                 <button 
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded transition-colors ${currentPage === page ? "bg-indigo text-white shadow-sm" : "hover:bg-secondary"}`}>
                    {page}
                 </button>
              ))}

              <button 
                 onClick={() => handlePageChange(currentPage + 1)}
                 disabled={currentPage === totalPages}
                 className="px-2 py-1 border border-border rounded hover:bg-secondary disabled:opacity-50">&gt;</button>
              
              <select 
                 value={itemsPerPage}
                 onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                 }}
                 className="ml-4 bg-transparent border border-border rounded px-2 py-1 outline-none">
                 <option value={5}>5 per page</option>
                 <option value={10}>10 per page</option>
                 <option value={20}>20 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Panel (Details) */}
        {selectedEventId && (
          <div className="w-full lg:w-[450px] bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]   flex flex-col overflow-hidden shrink-0">
            <div className="p-6 border-b border-border relative shrink-0">
              <button onClick={() => setSelectedEventId("")} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
              
              <div className="flex gap-3 items-start mb-4 pr-6">
                 <div className="p-2 rounded bg-indigo/10 text-indigo shrink-0 mt-1"><FileText className="w-5 h-5" /></div>
                 <div>
                    <h2 className="font-bold text-lg leading-tight mb-1">{selectedEvent.title}</h2>
                    <p className="text-sm text-muted-foreground">{selectedEvent.sourceName}</p>
                 </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red bg-red/10 px-2 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-red" /> High Impact</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo bg-indigo/10 px-2 py-1 rounded-full">New</span>
                 </div>
                 <span className="text-xs text-muted-foreground font-mono">{selectedEvent.publishedDate}</span>
              </div>

              <div className="flex gap-6 text-sm font-medium">
                <div className="text-indigo border-b-2 border-indigo pb-2 -mb-[25px]">Summary</div>
                <div className="text-muted-foreground hover:text-foreground pb-2 cursor-pointer -mb-[25px]">Key Changes</div>
                <div className="text-muted-foreground hover:text-foreground pb-2 cursor-pointer -mb-[25px]">Impacts</div>
                <div className="text-muted-foreground hover:text-foreground pb-2 cursor-pointer -mb-[25px]">Related</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              <div>
                 <h3 className="font-bold text-base mb-2">Overview</h3>
                 <p className="text-sm text-foreground leading-relaxed">
                    {selectedEvent.overview || "Detail information is currently being processed for this regulatory update. Our AI pipeline is extracting obligations and mapping internal policies."}
                 </p>
              </div>

              {selectedEvent.metadata && (
                 <div className="grid grid-cols-2 gap-4">
                    <MetadataCard icon={Calendar} title="Effective Date" value={selectedEvent.metadata.effectiveDate} />
                    <MetadataCard icon={Clock} title="Compliance Deadline" value={selectedEvent.metadata.deadline} subValue={selectedEvent.metadata.deadlineText} subValueColor="text-red font-bold" />
                    <MetadataCard icon={Building} title="Applies To" value={selectedEvent.metadata.appliesTo} />
                    <MetadataCard icon={FileText} title="Document Type" value={selectedEvent.metadata.type} />
                    <MetadataCard icon={Scale} title="Reference No." value={selectedEvent.metadata.ref} />
                    <MetadataCard icon={FileText} title="Pages" value={selectedEvent.metadata.pages} />
                    <MetadataCard icon={Globe} title="Language" value={selectedEvent.metadata.language} />
                 </div>
              )}

              {selectedEvent.takeaways && (
                 <div>
                    <h3 className="font-bold text-base mb-3">Key Takeaways</h3>
                    <div className="space-y-3">
                       {selectedEvent.takeaways.map((item, i) => (
                          <div key={i} className="flex gap-3 text-sm items-start">
                             <div className="mt-0.5 w-4 h-4 rounded-full bg-teal text-white flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-3 h-3" />
                             </div>
                             <span className="font-medium text-foreground">{item}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              )}

            </div>

            <div className="p-4 border-t border-border bg-card flex gap-3 shrink-0">
               <button className="flex-1 bg-card border border-indigo text-indigo font-medium text-sm py-2 rounded shadow-sm hover:bg-indigo/5 transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" /> View Full Document
               </button>
               <Link href="/impact-analysis" className="flex-1 bg-indigo text-white font-medium text-sm py-2 rounded shadow-sm hover:bg-indigo/90 transition-colors flex items-center justify-center gap-2">
                  Analyze Impact <ChevronRight className="w-4 h-4" />
               </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function MetricCard({ icon, iconBg, value, label, trend, trendColor }: any) {
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
        {trend && <p className={`text-[10px] mt-1 font-bold tracking-wider uppercase ${trendColor}`}>{trend}</p>}
      </div>
    </div>
  );
}

function MetadataCard({ icon: Icon, title, value, subValue, subValueColor }: any) {
   return (
      <div className="border-[3px] border-black rounded-none p-3 bg-card flex items-start gap-3 shadow-[5px_5px_0_0_#000000] hover:border-black transition-colors">
         <div className="w-8 h-8 rounded bg-indigo/10 text-indigo flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4" />
         </div>
         <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">{title}</span>
            <span className="text-sm font-bold text-foreground truncate">{value}</span>
            {subValue && <span className={`text-[10px] mt-0.5 ${subValueColor || "text-muted-foreground"}`}>{subValue}</span>}
         </div>
      </div>
   )
}
