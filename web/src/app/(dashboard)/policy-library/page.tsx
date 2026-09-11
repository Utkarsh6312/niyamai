"use client";
import { useState, useEffect } from "react";
import {
  Search,
  ChevronRight,
  ChevronDown,
  Plus,
  FileText,
  Book,
  Landmark,
  Users,
  Download,
  X,
  MoreVertical,
  MoreHorizontal,
  ExternalLink,
  Sparkles,
  UploadCloud,
  FileCheck2,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { StatusBadge, RiskBadge } from "@/components/ui/badges";
import { toast } from "sonner";

export interface PolicyDocument {
  id: string;
  code: string;
  title: string;
  sub: string;
  type: "Regulation" | "Internal Policy" | "Guidance" | "Circular";
  source: "RBI" | "Aarohan Bank" | "SEBI" | "FIU-IND";
  department: string;
  date: string;
  effectiveDate: string;
  status: "Active" | "Under Review" | "Pending Action" | "Superseded";
  rel: "Critical" | "High" | "Medium" | "Low";
  iconColor: string;
  iconBg: string;
  pages: number;
  lastUpdated: string;
  owner: string;
  description: string;
  topics: string[];
  clausesCount: number;
  obligationsCount: number;
  mappingCount: number;
  aiSummary: string;
  clauses: {
    number: string;
    title: string;
    text: string;
    obligationType: "Mandatory" | "Recommendatory";
    matchedSection?: string;
    gapScore?: number;
  }[];
}

const demoRbiGuideline = {
  id: "DOC-NEW",
  code: "RBI/2026-27/114",
  title: "RBI Circular: Digital Lending Due Diligence & Biometric Verification Trigger (2026)",
  issuer: "Reserve Bank of India",
  date: "18 Aug 2026",
  effectiveDate: "01 Oct 2026",
  status: "Under Analysis",
  impact: "Critical",
  fileSize: "2.4 MB (PDF)",
  reference: "RBI/2026-27/114 - DoR.FIN.REC.No.42/03.10.136/2026-27",
  summary: "Amendments to KYC Master Direction & Digital Lending Framework. Mandates active biometric liveness detection and geolocation checks for unassisted digital onboarding.",
  detectedGap: "Aarohan Bank KYC Policy v3.4 §3.2 currently relies on standard OTP/e-KYC and does not mandate active 6-month biometric liveness checks for unassisted digital loan applicants.",
  remediationAction: "ACT-2041: Upgrade Digital KYC pipeline to integrate real-time liveness SDK and amend Section 3.2 of KYC SOP.",
  impactedDepartments: ["Compliance", "Digital Banking", "Information Technology", "Risk Management"]
};

export default function PolicyLibrary() {
  const [docs, setDocs] = useState<PolicyDocument[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>("DOC-1");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/documents')
      .then(res => res.json())
      .then(data => {
        setDocs(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load documents from database");
        setIsLoading(false);
      });
  }, []);
  const [activeTab, setActiveTab] = useState<string>("All Documents");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("All Types");
  const [selectedDept, setSelectedDept] = useState<string>("All Departments");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [activeDetailTab, setActiveDetailTab] = useState<"Overview" | "Clauses" | "Obligations" | "Mapping">("Overview");

  // New Document Upload Form State
  const [newDocTitle, setNewDocTitle] = useState(demoRbiGuideline.title);
  const [newDocCode, setNewDocCode] = useState(demoRbiGuideline.code);
  const [newDocType, setNewDocType] = useState<"Regulation" | "Internal Policy" | "Guidance" | "Circular">("Regulation");
  const [newDocSource, setNewDocSource] = useState<"RBI" | "Aarohan Bank">("RBI");
  const [newDocDept, setNewDocDept] = useState("Compliance & Legal");
  const [newDocDate, setNewDocDate] = useState("18 Aug 2026");

  // Filter Logic
  const filteredDocs = docs.filter((doc) => {
    // Tab filter
    if (activeTab === "RBI Regulations" && doc.type !== "Regulation") return false;
    if (activeTab === "Internal Policies" && doc.type !== "Internal Policy") return false;
    if (activeTab === "Circulars & Guidance" && doc.type !== "Guidance" && doc.type !== "Circular") return false;
    if (activeTab === "External References" && doc.source === "Aarohan Bank") return false;

    // Type filter dropdown
    if (selectedType !== "All Types" && doc.type !== selectedType) return false;

    // Department filter dropdown
    if (selectedDept !== "All Departments" && !doc.department.includes(selectedDept)) return false;

    // Search input query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchTitle = doc.title.toLowerCase().includes(q);
      const matchCode = doc.code.toLowerCase().includes(q);
      const matchSub = doc.sub.toLowerCase().includes(q);
      const matchDept = doc.department.toLowerCase().includes(q);
      const matchTopics = doc.topics.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCode && !matchSub && !matchDept && !matchTopics) return false;
    }

    return true;
  });

  const selectedDoc = docs.find((d) => d.id === selectedDocId) || docs[0];

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createdDoc: PolicyDocument = {
      id: `DOC-${Date.now().toString().slice(-4)}`,
      code: newDocCode,
      title: newDocTitle,
      sub: `${newDocCode} • ${newDocTitle}`,
      type: newDocType,
      source: newDocSource,
      department: newDocDept,
      date: newDocDate,
      effectiveDate: "01 Oct 2026",
      status: "Under Review",
      rel: "Critical",
      iconColor: newDocType === "Internal Policy" ? "text-green-600" : "text-indigo",
      iconBg: newDocType === "Internal Policy" ? "bg-green-100" : "bg-indigo/10",
      pages: 38,
      lastUpdated: "Just now",
      owner: newDocSource === "RBI" ? "Reserve Bank of India" : "Aarohan Bank Governance",
      description: demoRbiGuideline.summary,
      topics: ["Digital Lending", "Biometric Liveness", "Customer Consent", "Fraud Prevention"],
      clausesCount: 18,
      obligationsCount: 29,
      mappingCount: 4,
      aiSummary: demoRbiGuideline.summary,
      clauses: [
        {
          number: "Clause 4.2",
          title: "Real-Time Biometric Liveness Mandate",
          text: "Institutions shall implement mandatory real-time biometric liveness verification for all unassisted digital credit applicants prior to first disbursement.",
          obligationType: "Mandatory",
          matchedSection: "KYC Policy v3.4 Section 3.2",
          gapScore: 82
        },
        {
          number: "Clause 5.1",
          title: "Sovereign Cloud Data Residency",
          text: "No customer biometric, identity, or credit evaluation records may be retained outside the sovereign borders of India.",
          obligationType: "Mandatory",
          matchedSection: "Digital Lending Policy v2.1 Section 4.2",
          gapScore: 10
        }
      ]
    };

    try {
      await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createdDoc)
      });
      
      setDocs([createdDoc, ...docs]);
      setSelectedDocId(createdDoc.id);
      setIsUploadModalOpen(false);
      toast.success(`Document ${newDocCode} successfully ingested!`, {
        description: "AI Semantic Parser has extracted 18 clauses and flagged 1 critical gap."
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save document to database");
    }
  };

  const handleAutoFillDemo = () => {
    setNewDocTitle(demoRbiGuideline.title);
    setNewDocCode(demoRbiGuideline.code);
    setNewDocType("Regulation");
    setNewDocSource("RBI");
    setNewDocDept("Compliance & Legal");
    setNewDocDate(demoRbiGuideline.date);
    toast.info("Auto-filled demo RBI circular data");
  };

  return (
    <div className="space-y-6 flex flex-col h-full min-h-[calc(100vh-8rem)]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-indigo">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">Policy Library</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Aarohan Bank Governance</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo/10 text-indigo border border-indigo/20">Institutional Grade</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Policy & Regulatory Library</h1>
          <p className="text-muted-foreground mt-1 text-base">Centralized repository for statutory RBI Master Directions and internal Aarohan Bank policies.</p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md font-medium text-sm hover:bg-indigo/90 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Ingest New Document
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Book className="w-6 h-6 text-indigo" />}
          iconBg="bg-indigo/10"
          value={docs.length.toString()}
          label="Total Managed Documents"
          trend="↑ 100% Active"
          trendColor="text-teal"
        />
        <MetricCard
          icon={<Landmark className="w-6 h-6 text-indigo" />}
          iconBg="bg-indigo/10"
          value={docs.filter((d) => d.source === "RBI").length.toString()}
          label="RBI Master Directions"
          trend="Statutory Framework"
          trendColor="text-teal"
        />
        <MetricCard
          icon={<FileText className="w-6 h-6 text-green-600" />}
          iconBg="bg-green-100"
          value={docs.filter((d) => d.type === "Internal Policy").length.toString()}
          label="Aarohan Bank Policies"
          trend="Board Approved"
          trendColor="text-teal"
        />
        <MetricCard
          icon={<Users className="w-6 h-6 text-purple-600" />}
          iconBg="bg-purple-100"
          value={docs.reduce((acc, curr) => acc + curr.mappingCount, 0).toString()}
          label="Active Semantic Mappings"
          trend="Automated Trace"
          trendColor="text-teal"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex gap-6 flex-1 h-[620px] lg:h-[780px] min-h-[620px]">
        {/* Left List */}
        <div className={`flex-1 flex flex-col bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] overflow-hidden ${selectedDocId ? "hidden lg:flex" : ""}`}>
          {/* Navigation Category Tabs */}
          <div className="p-4 border-b border-border flex items-center justify-between overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6 text-sm font-medium">
              {["All Documents", "RBI Regulations", "Internal Policies", "Circulars & Guidance", "External References"].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap transition-colors pb-4 -mb-4 ${
                      isActive ? "text-indigo border-b-2 border-indigo font-bold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab} ({
                      tab === "All Documents" ? docs.length :
                      tab === "RBI Regulations" ? docs.filter(d => d.type === "Regulation").length :
                      tab === "Internal Policies" ? docs.filter(d => d.type === "Internal Policy").length :
                      tab === "Circulars & Guidance" ? docs.filter(d => d.type === "Guidance" || d.type === "Circular").length :
                      docs.filter(d => d.source !== "Aarohan Bank").length
                    })
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters Bar */}
          <div className="p-4 border-b border-border flex items-center gap-3 overflow-x-auto no-scrollbar">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, policy code, department, topic..."
                className="w-full pl-9 pr-3 py-1.5 text-sm border border-border rounded bg-background focus:outline-none focus:border-indigo"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none"
            >
              <option>All Types</option>
              <option>Regulation</option>
              <option>Internal Policy</option>
              <option>Guidance</option>
              <option>Circular</option>
            </select>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-background border border-border rounded px-3 py-1.5 text-sm outline-none"
            >
              <option>All Departments</option>
              <option>Compliance</option>
              <option>Digital Banking</option>
              <option>Information Security</option>
              <option>Credit Risk</option>
              <option>Customer Experience</option>
            </select>
            {(searchQuery || selectedType !== "All Types" || selectedDept !== "All Departments") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("All Types");
                  setSelectedDept("All Departments");
                }}
                className="text-indigo text-sm font-medium hover:underline ml-2 whitespace-nowrap"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-[11px] text-foreground font-bold bg-secondary/30 uppercase tracking-wider sticky top-0 bg-card z-10">
                <tr>
                  <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded border-border" /></th>
                  <th className="px-4 py-3 min-w-[320px]">Document & Authority</th>
                  <th className="px-4 py-3">Classification</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Effective Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Severity</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-muted-foreground">
                      No documents found matching your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map((row) => {
                    const isSelected = selectedDoc?.id === row.id;
                    return (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedDocId(row.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "bg-indigo/10 border-l-4 border-l-indigo" : "hover:bg-secondary/30"
                        }`}
                      >
                        <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded border-border" />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 p-1.5 rounded ${row.iconBg} ${row.iconColor}`}>
                              <FileText className="w-4 h-4 shrink-0" />
                            </div>
                            <div className="whitespace-normal">
                              <p className="font-semibold text-foreground line-clamp-1">{row.title}</p>
                              <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{row.sub}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-2 py-0.5 rounded text-xs whitespace-nowrap font-medium ${
                              row.type === "Regulation"
                                ? "bg-indigo/10 text-indigo border border-indigo/20"
                                : row.type === "Internal Policy"
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : row.type === "Guidance"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {row.type}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-xs whitespace-nowrap text-muted-foreground">
                          {row.department}
                        </td>
                        <td className="px-4 py-4 text-xs whitespace-nowrap text-muted-foreground">
                          {row.effectiveDate}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <StatusBadge status={row.status} />
                        </td>
                        <td className="px-4 py-4 text-center whitespace-nowrap">
                          <RiskBadge level={row.rel} />
                        </td>
                        <td className="px-4 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => {
                              setSelectedDocId(row.id);
                              toast.info(`Viewing details for ${row.code}`);
                            }}
                            className="p-1 rounded hover:bg-secondary"
                          >
                            <MoreVertical className="w-4 h-4 text-muted-foreground hover:text-indigo" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-card">
            <span>Showing {filteredDocs.length} of {docs.length} institutional policies</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold px-2 py-1 bg-secondary rounded">Page 1 of 1</span>
            </div>
          </div>
        </div>

        {/* Right Panel (Details Inspector) */}
        {selectedDoc && (
          <div className="w-full lg:w-[420px] border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex flex-col bg-card overflow-hidden shrink-0">
            <div className="p-6 border-b border-border relative bg-card">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center bg-red-600 text-white rounded-sm w-7 h-8 relative shadow-sm">
                  <span className="text-[10px] font-bold">PDF</span>
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-white/30 rounded-bl-sm" />
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  selectedDoc.type === "Regulation" ? "bg-indigo/10 text-indigo border border-indigo/20" : "bg-green-100 text-green-700"
                }`}>
                  {selectedDoc.type}
                </span>
                <StatusBadge status={selectedDoc.status} />
                <div className="ml-auto flex items-center gap-2 text-muted-foreground">
                  <button
                    onClick={() => toast.info(`Exported metadata for ${selectedDoc.code}`)}
                    className="w-6 h-6 flex items-center justify-center border border-border rounded hover:bg-secondary"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedDocId("")}
                    className="w-6 h-6 flex items-center justify-center hover:text-foreground lg:hidden"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h2 className="font-serif font-bold text-xl leading-tight mb-1">{selectedDoc.title}</h2>
              <p className="text-xs font-mono text-indigo font-semibold">{selectedDoc.code}</p>

              <p className="text-xs text-foreground/80 mt-3 leading-relaxed">
                {selectedDoc.description}
              </p>

              {/* Inspector Sub-Tabs */}
              <div className="flex gap-4 text-xs font-bold mt-5 border-b border-border overflow-x-auto no-scrollbar">
                {(["Overview", "Clauses", "Obligations", "Mapping"] as const).map((tab) => {
                  const isActive = activeDetailTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveDetailTab(tab)}
                      className={`pb-2 -mb-px whitespace-nowrap transition-colors ${
                        isActive ? "text-indigo border-b-2 border-indigo" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab} {tab === "Clauses" ? `(${selectedDoc.clausesCount})` : tab === "Mapping" ? `(${selectedDoc.mappingCount})` : ""}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeDetailTab === "Overview" && (
                <>
                  {/* Metadata Grid */}
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Issuing Authority:</span>
                      <span className="font-bold text-foreground">{selectedDoc.source}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Department Custodian:</span>
                      <span className="font-bold text-foreground">{selectedDoc.department}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Effective / Enforceable:</span>
                      <span className="font-bold text-foreground">{selectedDoc.effectiveDate}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Designated Owner:</span>
                      <span className="font-bold text-foreground">{selectedDoc.owner}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Document Volume:</span>
                      <span className="font-bold text-foreground">{selectedDoc.pages} Pages • Digitized</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-muted-foreground">Last Audit Verification:</span>
                      <span className="font-bold text-teal">{selectedDoc.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <Link
                      href="/impact-analysis"
                      className="flex-1 bg-indigo text-white px-3 py-2 rounded flex items-center justify-center gap-1.5 text-xs font-bold hover:bg-indigo/90 shadow-sm"
                    >
                      Run Impact Analysis <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => toast.success(`Downloaded official PDF copy of ${selectedDoc.code}`)}
                      className="px-3 py-2 border border-border text-foreground rounded flex items-center justify-center gap-1 text-xs font-semibold hover:bg-secondary"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </div>

                  {/* Key Topics */}
                  <div className="pt-3 border-t border-border">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2.5">
                      Regulatory Topic Ontologies
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDoc.topics.map((topic, i) => (
                        <span key={i} className="bg-indigo/5 text-indigo border border-indigo/10 px-2 py-0.5 rounded text-[11px] font-medium">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div className="pt-3 border-t border-border bg-secondary/20 p-3 rounded-md border">
                    <div className="flex justify-between items-center mb-1.5">
                      <h3 className="font-bold text-xs flex items-center gap-1.5 text-indigo">
                        <Sparkles className="w-3.5 h-3.5" /> AI Semantic Extractor
                      </h3>
                      <span className="text-[10px] font-semibold text-teal bg-teal/10 px-1.5 py-0.5 rounded">
                        Confidence 98.4%
                      </span>
                    </div>
                    <p className="text-xs text-foreground/90 leading-relaxed">
                      {selectedDoc.aiSummary}
                    </p>
                  </div>
                </>
              )}

              {activeDetailTab === "Clauses" && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Extracted Regulatory Clauses ({selectedDoc.clauses.length})
                  </div>
                  {selectedDoc.clauses.map((c, i) => (
                    <div key={i} className="p-3 border border-border rounded-md bg-secondary/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-indigo">{c.number}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          c.obligationType === "Mandatory" ? "bg-red/10 text-red border border-red/20" : "bg-blue-100 text-blue-700"
                        }`}>
                          {c.obligationType}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-foreground">{c.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{c.text}</p>
                      {c.gapScore !== undefined && c.gapScore > 0 && (
                        <div className="flex items-center gap-1.5 text-[11px] text-amber font-semibold bg-amber/10 p-1.5 rounded">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Identified Gap ({c.gapScore}%) vs {c.matchedSection}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  <Link
                    href="/policy-mapping"
                    className="block text-center py-2 text-xs font-bold text-indigo bg-indigo/5 border border-indigo/20 rounded hover:bg-indigo/10"
                  >
                    Open in Full Policy Mapping Matrix →
                  </Link>
                </div>
              )}

              {activeDetailTab === "Obligations" && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Operational Obligations Matrix
                  </div>
                  <div className="p-3 bg-secondary/20 border border-border rounded text-xs space-y-2">
                    <div className="flex items-center gap-2 text-indigo font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Statutory Compliance Requirement
                    </div>
                    <p className="text-muted-foreground">
                      This document generates {selectedDoc.obligationsCount} atomic compliance obligations across IT, Risk, and Frontline KYC operations.
                    </p>
                  </div>
                  <Link
                    href="/obligation-explorer"
                    className="block text-center py-2 text-xs font-bold text-indigo bg-indigo/5 border border-indigo/20 rounded hover:bg-indigo/10"
                  >
                    Inspect in Obligation Explorer →
                  </Link>
                </div>
              )}

              {activeDetailTab === "Mapping" && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Linked Internal Governance Documents
                  </div>
                  <div className="space-y-2">
                    {docs
                      .filter((d) => d.id !== selectedDoc.id)
                      .slice(0, 3)
                      .map((d, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedDocId(d.id)}
                          className="flex items-center gap-3 p-2.5 border border-border rounded hover:bg-secondary cursor-pointer transition-colors"
                        >
                          <div className={`p-1.5 rounded ${d.iconBg} ${d.iconColor}`}>
                            <FileCheck2 className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-xs truncate">{d.title}</p>
                            <p className="text-[10px] text-muted-foreground">{d.code} • {d.type}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      ))}
                  </div>
                  <Link
                    href="/regulatory-trace"
                    className="block text-center py-2 text-xs font-bold text-indigo bg-indigo/5 border border-indigo/20 rounded hover:bg-indigo/10"
                  >
                    View End-to-End Regulatory Trace Graph →
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Upload / Ingestion Modal (Neo-Brutalist Design) */}
      {isUploadModalOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsUploadModalOpen(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-card border-[3px] border-black shadow-[8px_8px_0_0_#000000] p-6">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <div>
                <h3 className="font-serif text-xl font-bold">Ingest Document / RBI Circular</h3>
                <p className="text-xs text-muted-foreground">Upload and parse regulatory directions or bank internal policies.</p>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded hover:bg-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center bg-secondary/10 hover:bg-secondary/20 transition-colors">
                <UploadCloud className="w-10 h-10 text-indigo mb-2" />
                <p className="text-sm font-bold">Upload Circular PDF / Master Direction</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, or Official Gazette Gazette OCR format (Max 25MB)</p>
                <button
                  type="button"
                  onClick={handleAutoFillDemo}
                  className="mt-3 text-xs bg-indigo/10 text-indigo border border-indigo/30 font-bold px-3 py-1 rounded hover:bg-indigo/20"
                >
                  ⚡ Autofill Demo RBI Circular (2026)
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className="w-full text-sm border border-border rounded p-2 bg-background focus:outline-none focus:border-indigo font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Reference / Circular No.</label>
                  <input
                    type="text"
                    required
                    value={newDocCode}
                    onChange={(e) => setNewDocCode(e.target.value)}
                    className="w-full text-sm border border-border rounded p-2 bg-background focus:outline-none focus:border-indigo font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Document Type</label>
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value as any)}
                    className="w-full text-sm border border-border rounded p-2 bg-background focus:outline-none focus:border-indigo"
                  >
                    <option value="Regulation">RBI Regulation</option>
                    <option value="Internal Policy">Aarohan Bank Policy</option>
                    <option value="Guidance">Guidance Circular</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Issuing Source</label>
                  <select
                    value={newDocSource}
                    onChange={(e) => setNewDocSource(e.target.value as any)}
                    className="w-full text-sm border border-border rounded p-2 bg-background focus:outline-none focus:border-indigo"
                  >
                    <option value="RBI">Reserve Bank of India (RBI)</option>
                    <option value="Aarohan Bank">Aarohan Bank Internal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Custodian Department</label>
                  <input
                    type="text"
                    required
                    value={newDocDept}
                    onChange={(e) => setNewDocDept(e.target.value)}
                    className="w-full text-sm border border-border rounded p-2 bg-background focus:outline-none focus:border-indigo"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 border border-border text-sm font-semibold rounded hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo text-white text-sm font-bold rounded hover:bg-indigo/90 shadow-sm flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" /> Ingest & Run AI Extraction
                </button>
              </div>
            </form>
          </div>
        </>
      )}
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
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex items-center gap-4">
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
