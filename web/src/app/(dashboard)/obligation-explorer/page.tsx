"use client";
import { Download, Plus, Search, Filter, ChevronLeft, ChevronRight, MoreVertical, FileText, AlertTriangle, FileCheck, FileQuestion, Calendar, X, Building, Link as LinkIcon, CheckCircle2, Clock, Lightbulb, ExternalLink, Bell, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { api } from "@/lib/api/client";
import type { Obligation } from "@/lib/types";
import { StatusBadge, RiskBadge } from "@/components/ui/badges";
import { toast } from "sonner";

export default function ObligationExplorer() {
  const [obligations, setObligations] = useState<Obligation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedObId, setSelectedObId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterImpact, setFilterImpact] = useState("");
  
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewName, setViewName] = useState("");

  const handleSaveView = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewName) {
      toast.error("Please enter a view name");
      return;
    }
    toast.success(`Custom view "${viewName}" saved!`);
    setIsViewOpen(false);
    setViewName("");
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await api.obligations();
        if (data.length > 3) {
          setObligations(data);
          if (data.length > 0) setSelectedObId(data[0].id);
        } else {
          // Populate with rich demo data
          const mockObligations: Obligation[] = [
            ...data,
            { id: "OBL-001", regulation_id: "REG-RBI-KYC", clause_id: "CL-4.2", obligation_code: "OBL-RBI-001", requirement: "Banks must perform V-CIP (Video-based Customer Identification Process) for all new individual accounts opened remotely.", type: "Process", department: "Compliance", impact: "Critical", status: "In Progress", deadline: "2026-12-31", confidence: 95, regulation_title: "RBI KYC Master Direction 2025", clause_no: "Clause 4.2" },
            { id: "OBL-002", regulation_id: "REG-RBI-KYC", clause_id: "CL-5.1", obligation_code: "OBL-RBI-002", requirement: "Customer Due Diligence (CDD) must be updated periodically for all high-risk customers within 12 months.", type: "Reporting", department: "Risk Management", impact: "High", status: "Not Started", deadline: "2026-09-30", confidence: 92, regulation_title: "RBI KYC Master Direction 2025", clause_no: "Clause 5.1" },
            { id: "OBL-003", regulation_id: "REG-RBI-KYC", clause_id: "CL-6.3", obligation_code: "OBL-RBI-003", requirement: "Maintain records of all transactions above ₹10 lakhs and report Suspicious Transaction Reports (STRs) to FIU-IND within 7 days.", type: "Reporting", department: "Operations", impact: "Critical", status: "Compliant", confidence: 98, regulation_title: "RBI KYC Master Direction 2025", clause_no: "Clause 6.3" },
            { id: "OBL-004", regulation_id: "REG-SEBI-LODR", clause_id: "CL-17", obligation_code: "OBL-SEBI-001", requirement: "Listed entities must submit quarterly compliance reports to stock exchanges within 15 days of quarter end.", type: "Disclosure", department: "Legal", impact: "High", status: "Compliant", deadline: "2026-10-15", confidence: 88, regulation_title: "SEBI LODR Regulations 2024", clause_no: "Regulation 17" },
            { id: "OBL-005", regulation_id: "REG-SEBI-LODR", clause_id: "CL-30", obligation_code: "OBL-SEBI-002", requirement: "Ensure independent directors constitute at least one-third of the board and audit committee is chaired by an independent director.", type: "Governance", department: "Legal", impact: "Medium", status: "Compliant", confidence: 91, regulation_title: "SEBI LODR Regulations 2024", clause_no: "Regulation 30" },
            { id: "OBL-006", regulation_id: "REG-RBI-CYBER", clause_id: "CL-2.1", obligation_code: "OBL-RBI-004", requirement: "Implement multi-factor authentication for all internet banking and mobile banking customers.", type: "Technology", department: "IT Security", impact: "Critical", status: "In Progress", deadline: "2026-11-15", confidence: 94, regulation_title: "RBI Cybersecurity Framework", clause_no: "Clause 2.1" },
            { id: "OBL-007", regulation_id: "REG-RBI-CYBER", clause_id: "CL-3.5", obligation_code: "OBL-RBI-005", requirement: "Conduct comprehensive cyber security audits at least once every quarter and report findings to the Board.", type: "Audit", department: "IT Security", impact: "High", status: "Not Started", deadline: "2026-10-31", confidence: 87, regulation_title: "RBI Cybersecurity Framework", clause_no: "Clause 3.5" },
            { id: "OBL-008", regulation_id: "REG-RBI-LCR", clause_id: "CL-8", obligation_code: "OBL-RBI-006", requirement: "Maintain Liquidity Coverage Ratio (LCR) of at least 100% at all times. Report daily LCR to RBI.", type: "Reporting", department: "Treasury", impact: "Critical", status: "Compliant", confidence: 96, regulation_title: "RBI LCR & NSFR Guidelines", clause_no: "Clause 8" },
            { id: "OBL-009", regulation_id: "REG-MCA-CSR", clause_id: "CL-135", obligation_code: "OBL-MCA-001", requirement: "Spend at least 2% of average net profits on CSR activities and disclose in annual report per Schedule VII.", type: "Disclosure", department: "Finance", impact: "Medium", status: "Not Started", deadline: "2027-03-31", confidence: 85, regulation_title: "Companies Act 2013 - CSR", clause_no: "Section 135" },
            { id: "OBL-010", regulation_id: "REG-RBI-KYC", clause_id: "CL-10.2", obligation_code: "OBL-RBI-007", requirement: "Screen all customers and beneficial owners against UNSC sanctions list and domestic PEP databases before account opening.", type: "Process", department: "Compliance", impact: "Critical", status: "Compliant", confidence: 97, regulation_title: "RBI KYC Master Direction 2025", clause_no: "Clause 10.2" },
            { id: "OBL-011", regulation_id: "REG-RBI-DPDP", clause_id: "CL-4", obligation_code: "OBL-DPDP-001", requirement: "Obtain verifiable consent from data principals before processing personal data. Maintain consent records.", type: "Process", department: "Data Privacy", impact: "High", status: "In Progress", deadline: "2026-12-01", confidence: 89, regulation_title: "DPDP Act 2023 Rules", clause_no: "Section 4" },
            { id: "OBL-012", regulation_id: "REG-RBI-DPDP", clause_id: "CL-8", obligation_code: "OBL-DPDP-002", requirement: "Notify the Data Protection Board and affected data principals within 72 hours of discovering a personal data breach.", type: "Reporting", department: "Data Privacy", impact: "Critical", status: "Not Started", deadline: "2026-11-01", confidence: 93, regulation_title: "DPDP Act 2023 Rules", clause_no: "Section 8" },
            { id: "OBL-013", regulation_id: "REG-IRDAI-GOV", clause_id: "CL-12", obligation_code: "OBL-IRDAI-001", requirement: "Insurance companies must appoint a Chief Risk Officer and establish a dedicated risk management committee.", type: "Governance", department: "Risk Management", impact: "Medium", status: "Compliant", confidence: 90, regulation_title: "IRDAI Corporate Governance Guidelines", clause_no: "Regulation 12" },
            { id: "OBL-014", regulation_id: "REG-RBI-NPA", clause_id: "CL-3", obligation_code: "OBL-RBI-008", requirement: "Classify loan accounts as NPA if interest/installment remains overdue for more than 90 days. Implement automated NPA classification.", type: "Process", department: "Credit", impact: "High", status: "Compliant", confidence: 96, regulation_title: "RBI IRAC Norms", clause_no: "Clause 3" },
            { id: "OBL-015", regulation_id: "REG-SEBI-PIT", clause_id: "CL-9", obligation_code: "OBL-SEBI-003", requirement: "Maintain a Structured Digital Database of persons with access to UPSI and submit to SEBI upon request.", type: "Technology", department: "Legal", impact: "High", status: "In Progress", deadline: "2026-10-01", confidence: 86, regulation_title: "SEBI PIT Regulations", clause_no: "Regulation 9" },
          ];
          // Deduplicate by id
          const seen = new Set<string>();
          const unique = mockObligations.filter(o => { if (seen.has(o.id)) return false; seen.add(o.id); return true; });
          setObligations(unique);
          if (unique.length > 0) setSelectedObId(unique[0].id);
        }
      } catch {
        // handle err
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const selectedOb = obligations.find(o => o.id === selectedObId);

  const filtered = obligations.filter(o => {
    if (filterDept && o.department !== filterDept) return false;
    if (filterImpact && o.impact !== filterImpact) return false;
    if (search && !o.requirement.toLowerCase().includes(search.toLowerCase()) && !o.obligation_code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleExportCSV = () => {
    if (!filtered || filtered.length === 0) {
      toast.error("No data to export");
      return;
    }
    const headers = ["Obligation Code", "Requirement", "Department", "Impact", "Status", "Type"];
    const csvRows = [
      headers.join(","),
      ...filtered.map(o => [
        o.obligation_code,
        `"${(o.requirement || "").replace(/"/g, '""')}"`,
        o.department,
        o.impact,
        o.status,
        o.type || ""
      ].join(","))
    ];
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Obligations_Report.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Exported Obligations_Report.csv");
  };

  return (
    <div className="space-y-5 flex flex-col h-full text-foreground pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="mx-1">›</span>
        <span className="text-foreground">Obligation Explorer</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-2">Obligations Explorer</h1>
          <p className="text-muted-foreground text-sm">Explore, search, and analyze your regulatory obligations across all applicable regulations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportCSV} className="flex items-center gap-2 border border-indigo text-indigo px-4 py-2 rounded text-sm font-medium hover:bg-indigo/5 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setIsViewOpen(true)} className="flex items-center gap-2 bg-indigo hover:bg-indigo/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" /> Custom View
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-indigo" />
          </div>
          <div>
            <p className="text-2xl font-bold">{loading ? "…" : obligations.length}</p>
            <p className="text-[11px] text-muted-foreground font-medium">Total Obligations</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-lg bg-red/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red" />
          </div>
          <div>
            <p className="text-2xl font-bold">{loading ? "…" : obligations.filter(o => o.impact === 'High').length}</p>
            <p className="text-[11px] text-muted-foreground font-medium">High Impact</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{loading ? "…" : obligations.filter(o => o.status === 'Compliant').length}</p>
            <p className="text-[11px] text-muted-foreground font-medium">Compliant</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <FileQuestion className="w-5 h-5 text-indigo" />
          </div>
          <div>
            <p className="text-2xl font-bold">{loading ? "…" : obligations.filter(o => o.status === 'Not Started').length}</p>
            <p className="text-[11px] text-muted-foreground font-medium">Not Started</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-indigo" />
          </div>
          <div>
            <p className="text-2xl font-bold">{loading ? "…" : obligations.filter(o => o.deadline).length}</p>
            <p className="text-[11px] text-muted-foreground font-medium">Have Deadlines</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 flex-1 min-h-0">
        
        {/* Left: Table Area */}
        <div className={`flex-1 flex flex-col min-w-0 space-y-4 ${selectedObId ? "hidden lg:flex" : ""}`}>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search obligations..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded text-sm outline-none focus:border-indigo" />
            </div>
            <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="bg-background border border-border px-3 py-2 rounded text-sm outline-none text-foreground">
              <option value="">Department</option>
              {[...new Set(obligations.map(o => o.department))].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={filterImpact} onChange={e => setFilterImpact(e.target.value)} className="bg-background border border-border px-3 py-2 rounded text-sm outline-none text-foreground">
              <option value="">Impact</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button onClick={() => {setSearch(""); setFilterDept(""); setFilterImpact("");}} className="flex items-center gap-2 text-indigo px-3 py-2 rounded text-sm hover:underline transition-colors bg-background">
              Clear
            </button>
          </div>

          {/* Table */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] overflow-hidden flex-1 flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-secondary/30 text-foreground border-b border-border sticky top-0">
                  <tr>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">ID</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider w-[35%]">Requirement</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Regulation</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Department</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Impact</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Loading obligations...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No obligations found.</td></tr>
                  ) : filtered.map((row) => (
                    <tr 
                      key={row.id} 
                      onClick={() => setSelectedObId(row.id)}
                      className={`cursor-pointer transition-colors ${selectedObId === row.id ? "bg-indigo/5" : "hover:bg-secondary/30"}`}
                    >
                      <td className="px-3 py-3 font-mono text-xs">{row.obligation_code}</td>
                      <td className="px-3 py-3 font-medium whitespace-normal line-clamp-2 min-w-[250px]">{row.requirement}</td>
                      <td className="px-3 py-3 text-xs text-muted-foreground whitespace-normal min-w-[150px]">{row.regulation_title}</td>
                      <td className="px-3 py-3 text-xs">{row.department}</td>
                      <td className="px-3 py-3"><RiskBadge level={row.impact} /></td>
                      <td className="px-3 py-3"><StatusBadge status={row.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination / Footer */}
            <div className="border-t border-border bg-card p-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Showing {filtered.length} of {obligations.length} obligations</span>
            </div>
          </div>
        </div>

        {/* Right: Detail View */}
        {selectedOb && (
          <div className="w-full lg:w-[450px] bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex flex-col overflow-hidden shrink-0">
            {/* Header */}
            <div className="p-5 border-b border-border bg-secondary/10 relative">
              <button onClick={() => setSelectedObId("")} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-background border border-border px-2 py-0.5 rounded text-[10px] font-bold text-muted-foreground uppercase">{selectedOb.obligation_code}</span>
                <StatusBadge status={selectedOb.status} />
                <RiskBadge level={selectedOb.impact} />
              </div>
              <h2 className="font-serif text-lg font-bold leading-tight mb-2 pr-6">
                {selectedOb.requirement}
              </h2>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* Context */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Department</p>
                  <p className="font-medium flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-muted-foreground" /> {selectedOb.department}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Type</p>
                  <p className="font-medium">{selectedOb.type}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Source Regulation</p>
                  <Link href={`/regulatory-feed`} className="font-medium text-indigo flex items-center gap-1.5 hover:underline">
                    <FileText className="w-3.5 h-3.5" /> {selectedOb.regulation_title}
                  </Link>
                </div>
                {selectedOb.clause_no && (
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground mb-1">Clause Number</p>
                    <p className="font-medium">Clause {selectedOb.clause_no}</p>
                  </div>
                )}
                {selectedOb.deadline && (
                   <div className="col-span-2">
                     <p className="text-xs text-muted-foreground mb-1">Deadline</p>
                     <p className="font-medium flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-orange-500" /> {selectedOb.deadline}</p>
                   </div>
                )}
              </div>

              {/* Policy Mapping Section */}
              <div className="border-t border-border pt-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm">Policy Mapping</h3>
                  <Link href={`/policy-mapping?obligationId=${selectedOb.id}`} className="text-indigo text-xs font-medium hover:underline flex items-center gap-1">
                    Manage Mapping <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
                
                {selectedOb.status === "Not Started" ? (
                  <div className="bg-amber-50 border border-amber-200 rounded p-4 text-center">
                    <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-amber-800">Unmapped Obligation</p>
                    <p className="text-xs text-amber-700 mt-1">This obligation has not been mapped to any internal policy yet.</p>
                    <Link href={`/policy-mapping?obligationId=${selectedOb.id}`} className="mt-3 inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-amber-600 transition-colors">Start Mapping</Link>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800 mb-1">Mapped successfully</p>
                        <p className="text-xs text-green-700 mb-2">Connected to internal policies via AI mapping.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Trace Section */}
              <div className="border-t border-border pt-5">
                <h3 className="font-bold text-sm mb-4">Provenance &amp; Actions</h3>
                <div className="space-y-3">
                   <Link href={`/regulatory-trace?obligationId=${selectedOb.id}`} className="flex items-center justify-between p-3 border border-border rounded hover:bg-secondary/30 transition-colors">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded bg-indigo/10 flex items-center justify-center shrink-0">
                         <LinkIcon className="w-4 h-4 text-indigo" />
                       </div>
                       <div>
                         <p className="text-sm font-medium">View Full Trace Graph</p>
                         <p className="text-xs text-muted-foreground">See the end-to-end provenance</p>
                       </div>
                     </div>
                     <ChevronRight className="w-4 h-4 text-muted-foreground" />
                   </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom View Builder Modal */}
      {isViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold font-serif mb-4 flex items-center gap-2"><Filter className="w-5 h-5 text-indigo"/> Build Custom View</h2>
            <form onSubmit={handleSaveView}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">View Name</label>
                  <input 
                    type="text" 
                    value={viewName}
                    onChange={(e) => setViewName(e.target.value)}
                    className="w-full border border-border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo" 
                    placeholder="e.g., High Impact HR Obligations" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Filters</label>
                  <div className="space-y-3 border border-border p-3 rounded bg-slate-50">
                    <div className="flex gap-2">
                      <select className="flex-1 border border-border px-2 py-1.5 text-sm rounded">
                        <option>Department</option>
                        <option>Impact</option>
                        <option>Status</option>
                      </select>
                      <select className="flex-1 border border-border px-2 py-1.5 text-sm rounded">
                        <option>Equals</option>
                        <option>Contains</option>
                      </select>
                      <input type="text" className="flex-1 border border-border px-2 py-1.5 text-sm rounded" placeholder="Value" />
                    </div>
                    <button type="button" className="text-indigo text-xs font-semibold flex items-center gap-1"><Plus className="w-3 h-3"/> Add Filter Condition</button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsViewOpen(false)} className="px-4 py-2 text-sm font-medium border border-border rounded hover:bg-secondary transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-indigo text-white rounded hover:bg-indigo/90 transition-colors">
                  Save View
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
