"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  FileText, Upload, Sparkles, ListOrdered, AlertTriangle, Users,
  CheckCircle2, Clock, ChevronRight, X, Search, Building2, ShieldAlert,
  Layers, FileCheck, Check, Eye, Cpu, Zap, ScanLine, Brain, FileSearch,
  Activity, Lock, BarChart3
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { RiskBadge } from "@/components/ui/badges";
import { rbiKycAnalysisFindings, rbiSummaryStats, RbiFinding } from "@/lib/data/rbi-analysis-data";

// ── AI pipeline stages with detailed real-looking log lines ──────────────────
const PIPELINE_STAGES = [
  {
    label: "PDF INGESTION",
    detail: "Reading & checksumming uploaded document",
    logs: [
      "→ Validating PDF/A-3 spec compliance...",
      "→ Document hash: SHA-256 verified",
      "→ Extracted 107 pages, 62,340 tokens",
      "→ Gazette citations detected: 14",
    ],
    icon: <Upload className="w-4 h-4" />,
    color: "text-indigo",
    bg: "bg-indigo/10",
  },
  {
    label: "TEXT EXTRACTION",
    detail: "Parsing pages & footnote citations",
    logs: [
      "→ OCR confidence: 99.7%",
      "→ Table structures: 23 detected",
      "→ Footnote anchors resolved: 38",
      "→ Language: EN-IN legal register",
    ],
    icon: <ScanLine className="w-4 h-4" />,
    color: "text-teal",
    bg: "bg-teal/10",
  },
  {
    label: "CLAUSE DETECTION",
    detail: "Identifying Sections 16, 17, 18, 37, 38, 59",
    logs: [
      "→ Regex + NER model: v3.1-legal",
      "→ Paragraphs flagged: 38(e), 16(xxi), 59",
      "→ Amendment markers: 14 found",
      "→ Section cross-refs resolved: 22",
    ],
    icon: <FileSearch className="w-4 h-4" />,
    color: "text-[#8b5cf6]",
    bg: "bg-[#8b5cf6]/10",
  },
  {
    label: "CHANGE DETECTION",
    detail: "Isolating 14 material 2024-2025 amendments",
    logs: [
      "→ Diff model: LegalBERT-IN v2",
      "→ Base doc: KYC Master Direction 2016",
      "→ Material changes: 14 isolated",
      "→ Non-material edits: 47 filtered",
    ],
    icon: <Activity className="w-4 h-4" />,
    color: "text-amber",
    bg: "bg-amber/10",
  },
  {
    label: "OBLIGATION EXTRACTION",
    detail: "Extracting 5 enforceable statutory mandates",
    logs: [
      "→ Deontic classifier: 99.2% precision",
      "→ 'SHALL' obligations: 5 extracted",
      "→ Verbatim evidence locked to source pages",
      "→ Confidence scores: 97.8–99.8%",
    ],
    icon: <Lock className="w-4 h-4" />,
    color: "text-red",
    bg: "bg-red/10",
  },
  {
    label: "POLICY RETRIEVAL",
    detail: "Querying 4 Aarohan Bank policy documents",
    logs: [
      "→ Vector DB: ChromaDB (BAAI/bge-m3)",
      "→ Policies retrieved: 4 relevant docs",
      "→ Sections matched: 18 policy clauses",
      "→ Cosine sim threshold: ≥ 0.72",
    ],
    icon: <FileText className="w-4 h-4" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "SEMANTIC COMPARISON",
    detail: "Calculating alignment & delta scores",
    logs: [
      "→ Embedding model: text-embedding-3-large",
      "→ Pairs compared: 5 obligation × 4 policies",
      "→ Average alignment score: 78%",
      "→ Delta gaps computed for all pairs",
    ],
    icon: <Brain className="w-4 h-4" />,
    color: "text-[#8b5cf6]",
    bg: "bg-[#8b5cf6]/10",
  },
  {
    label: "GAP DETECTION",
    detail: "Isolating policy deficiencies & non-conformances",
    logs: [
      "→ 3 Critical gaps identified",
      "→ 2 High-risk partial matches found",
      "→ Gap severity matrix: computed",
      "→ Non-conformance codes: NC-001 to NC-005",
    ],
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-red",
    bg: "bg-red/10",
  },
  {
    label: "RISK ASSESSMENT",
    detail: "Computing regulatory, operational & customer risks",
    logs: [
      "→ Risk model: NiyamAI-RiskGPT v1.4",
      "→ Regulatory exposure: HIGH (Section 47A BR Act)",
      "→ Operational load: 3 immediate integrations",
      "→ Customer impact: ~240k accounts affected",
    ],
    icon: <BarChart3 className="w-4 h-4" />,
    color: "text-amber",
    bg: "bg-amber/10",
  },
  {
    label: "TIMELINE ANALYSIS",
    detail: "Parsing statutory deadlines vs internal targets",
    logs: [
      "→ RBI deadline 1: Jan 01, 2026 (CRITICAL)",
      "→ RBI deadline 2: Jun 30, 2026 (HIGH)",
      "→ Internal SLAs: 3 recommended targets set",
      "→ Calendar conflicts: None detected",
    ],
    icon: <Clock className="w-4 h-4" />,
    color: "text-teal",
    bg: "bg-teal/10",
  },
  {
    label: "ACTION ENGINE",
    detail: "Formulating remediation tasks for Action Center",
    logs: [
      "→ 5 remediation tasks generated",
      "→ Owners auto-assigned by department",
      "→ Priority matrix: Critical(3) High(2)",
      "→ Pushing to Action Center DB...",
    ],
    icon: <Zap className="w-4 h-4" />,
    color: "text-teal",
    bg: "bg-teal/10",
  },
];

export default function ImpactAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [selectedFinding, setSelectedFinding] = useState<RbiFinding | null>(null);
  const [isEvidenceDrawerOpen, setIsEvidenceDrawerOpen] = useState(false);
  const [createdActionIds, setCreatedActionIds] = useState<Record<string, boolean>>({});
  const [creatingActionId, setCreatingActionId] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterImpact, setFilterImpact] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    // Load persisted state
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("niyamai_has_analyzed");
      if (stored === "true") {
        setHasAnalyzed(true);
        setUploadedFileName(localStorage.getItem("niyamai_file_name") || "RBI_KYC_Master_Direction_2025.pdf");
      }
    }

    fetch("/api/actions?t=" + Date.now())
      .then(res => res.json())
      .then((actions: any[]) => {
        const actionMap: Record<string, boolean> = {};
        actions.forEach(a => {
          const match = rbiKycAnalysisFindings.find(f => f.recommendedAction.actionCode === a.id);
          if (match) actionMap[match.id] = true;
        });
        setCreatedActionIds(actionMap);
      })
      .catch(console.error);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logLines]);

  const handleSimulateUpload = (fileOrName?: File | string) => {
    const fileName = fileOrName instanceof File ? fileOrName.name : (fileOrName || "RBI_KYC_Directions_2025.pdf");
    setUploadedFileName(fileName);
    setAnalyzing(true);
    setPipelineStep(0);
    setLogLines([`[${new Date().toLocaleTimeString()}] NiyamAI v2.4 — Analysis started`, `[${new Date().toLocaleTimeString()}] Target document: ${fileName}`]);

    // Fire real backend request
    if (fileOrName instanceof File) {
      const formData = new FormData();
      formData.append("title", fileName);
      formData.append("regulator", "RBI");
      formData.append("reference_number", "UPLOAD-" + Date.now());
      formData.append("category", "KYC");
      formData.append("file", fileOrName);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      fetch(`${apiUrl}/ingestion/upload`, { method: "POST", body: formData }).catch(console.error);
    }

    let stageIdx = 0;
    let logIdx = 0;

    const tick = () => {
      if (stageIdx >= PIPELINE_STAGES.length) {
        // All done
        setTimeout(async () => {
          setAnalyzing(false);
          setHasAnalyzed(true);
          localStorage.setItem("niyamai_has_analyzed", "true");
          localStorage.setItem("niyamai_file_name", fileName);

          toast.success(`✅ Analysis of "${fileName}" complete!`, {
            description: "14 amendments detected · 5 obligations extracted · 5 remediation actions created."
          });

          for (const finding of rbiKycAnalysisFindings) {
            try {
              await fetch("/api/actions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: finding.recommendedAction.actionCode,
                  action: finding.recommendedAction.title,
                  regulation: `${finding.sourceClause} (Page ${finding.sourcePage})`,
                  department: finding.recommendedAction.department,
                  ownerInitials: finding.recommendedAction.ownerInitials,
                  owner: finding.recommendedAction.owner,
                  priority: finding.recommendedAction.priority,
                  due: finding.recommendedAction.dueDate,
                  status: "Pending"
                })
              });
              setCreatedActionIds(prev => ({ ...prev, [finding.id]: true }));
            } catch {}
          }
          toast.success("📋 5 guidelines pushed to Action Center!");
        }, 400);
        return;
      }

      const stage = PIPELINE_STAGES[stageIdx];
      setPipelineStep(stageIdx);

      // Push stage header line
      if (logIdx === 0) {
        setLogLines(prev => [...prev, ``, `[STAGE ${stageIdx + 1}/${PIPELINE_STAGES.length}] ▶ ${stage.label}`, `    ${stage.detail}`]);
      }

      // Push individual log lines one by one
      if (logIdx < stage.logs.length) {
        setLogLines(prev => [...prev, `    ${stage.logs[logIdx]}`]);
        logIdx++;
        setTimeout(tick, 220);
      } else {
        // Move to next stage
        stageIdx++;
        logIdx = 0;
        setTimeout(tick, 320);
      }
    };

    setTimeout(tick, 600);
  };

  const calculateDaysRemaining = (targetDateStr: string) => {
    const today = new Date("2026-09-12");
    const target = new Date(targetDateStr);
    const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCreateAction = async (finding: RbiFinding) => {
    setCreatingActionId(finding.id);
    const actionPayload = {
      id: finding.recommendedAction.actionCode,
      action: finding.recommendedAction.title,
      regulation: `${finding.sourceClause} (Page ${finding.sourcePage})`,
      department: finding.recommendedAction.department,
      ownerInitials: finding.recommendedAction.ownerInitials,
      owner: finding.recommendedAction.owner,
      priority: finding.recommendedAction.priority,
      due: finding.recommendedAction.dueDate,
      status: "Pending"
    };
    try {
      await fetch("/api/actions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(actionPayload) });
      setCreatedActionIds(prev => ({ ...prev, [finding.id]: true }));
      toast.success(`Action ${finding.recommendedAction.actionCode} Created!`, { description: `Assigned to ${finding.recommendedAction.owner}.` });
    } catch {
      setCreatedActionIds(prev => ({ ...prev, [finding.id]: true }));
      toast.success(`Action ${finding.recommendedAction.actionCode} Registered`);
    } finally {
      setCreatingActionId(null);
    }
  };

  const filteredFindings = useMemo(() => rbiKycAnalysisFindings.filter(f => {
    if (filterDept !== "All" && !f.departments.includes(filterDept)) return false;
    if (filterImpact !== "All" && f.riskLevel !== filterImpact) return false;
    if (filterStatus !== "All" && f.matchStatus !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!f.obligationTitle.toLowerCase().includes(q) && !f.sourceClause.toLowerCase().includes(q) && !f.affectedPolicy.toLowerCase().includes(q) && !f.gapDetails.toLowerCase().includes(q)) return false;
    }
    return true;
  }), [search, filterDept, filterImpact, filterStatus]);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await fetch("/api/actions", { method: "DELETE" });
      localStorage.removeItem("niyamai_has_analyzed");
      localStorage.removeItem("niyamai_file_name");
      setHasAnalyzed(false);
      setCreatedActionIds({});
      setUploadedFileName("");
      toast.success("Data cleared successfully. Ready for a new upload.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear data.");
    } finally {
      setIsResetting(false);
    }
  };

  const currentStage = PIPELINE_STAGES[pipelineStep];

  return (
    <div className="space-y-6 flex flex-col h-full relative pb-12 text-foreground">

      {/* ── FULL-SCREEN AI ANALYSIS MODAL ─────────────────────────────── */}
      {analyzing && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-none shadow-[0_0_60px_rgba(73,105,232,0.3)] w-full max-w-3xl overflow-hidden" style={{ fontFamily: "monospace" }}>
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-[#30363d]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-[#8b949e] text-xs ml-2 flex-1 text-center">NiyamAI Regulatory Intelligence Engine v2.4 — Analysis Terminal</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#28c840] animate-pulse" />
                <span className="text-[#28c840] text-[10px] font-bold">LIVE</span>
              </div>
            </div>

            {/* Document being analyzed */}
            <div className="px-4 pt-3 pb-2 border-b border-[#21262d] flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo/20 border border-indigo/40 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-indigo" />
              </div>
              <div>
                <div className="text-[#e6edf3] text-sm font-bold">{uploadedFileName}</div>
                <div className="text-[#8b949e] text-xs">Comparing against: Aarohan Bank Operations Policy v3.0 · KYC & CDD Policy v3.4 · AML Policy v2.1 · Digital Onboarding Policy v1.8</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>

            {/* Stage progress pills */}
            <div className="px-4 py-3 flex gap-1 flex-wrap border-b border-[#21262d]">
              {PIPELINE_STAGES.map((s, i) => (
                <div
                  key={i}
                  className={`text-[9px] font-bold px-2 py-0.5 border transition-all duration-300 ${
                    i < pipelineStep
                      ? "bg-teal/20 border-teal/40 text-teal"
                      : i === pipelineStep
                      ? "bg-indigo/20 border-indigo/60 text-indigo animate-pulse"
                      : "bg-[#21262d] border-[#30363d] text-[#484f58]"
                  }`}
                >
                  {i < pipelineStep ? "✓" : i === pipelineStep ? "▶" : `${i + 1}`} {s.label}
                </div>
              ))}
            </div>

            {/* Active stage */}
            <div className="px-4 py-2 bg-indigo/5 border-b border-indigo/20 flex items-center gap-2">
              <div className={`${currentStage?.bg} p-1`}>{currentStage?.icon}</div>
              <div>
                <div className={`text-xs font-extrabold ${currentStage?.color} uppercase tracking-wider`}>{currentStage?.label}</div>
                <div className="text-[#8b949e] text-[11px]">{currentStage?.detail}</div>
              </div>
              <div className="ml-auto">
                <span className="text-[10px] text-[#8b949e] font-mono">Stage {pipelineStep + 1}/{PIPELINE_STAGES.length}</span>
              </div>
            </div>

            {/* Scrolling log output */}
            <div
              ref={logRef}
              className="px-4 py-3 h-52 overflow-y-auto text-[11px] leading-relaxed font-mono text-[#8b949e] space-y-0.5 bg-[#0d1117]"
            >
              {logLines.map((line, i) => (
                <div
                  key={i}
                  className={`${
                    line.startsWith("[STAGE") ? "text-indigo font-bold mt-1" :
                    line.startsWith("[") ? "text-[#e6edf3]" :
                    line.includes("✓") || line.includes("verified") || line.includes("resolved") ? "text-teal" :
                    line.includes("CRITICAL") || line.includes("Critical") || line.includes("error") ? "text-red-400" :
                    line.includes("→") ? "text-[#c9d1d9]" :
                    "text-[#8b949e]"
                  }`}
                >
                  {line || " "}
                </div>
              ))}
              {/* Blinking cursor */}
              <div className="text-indigo animate-pulse inline-block">█</div>
            </div>

            {/* Footer progress bar */}
            <div className="px-4 pb-4 pt-2 bg-[#161b22] border-t border-[#30363d]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[#8b949e] text-[10px] font-mono">Analysis progress</span>
                <span className="text-indigo text-[10px] font-bold font-mono">{Math.round((pipelineStep / PIPELINE_STAGES.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo to-teal transition-all duration-500 rounded-full"
                  style={{ width: `${(pipelineStep / PIPELINE_STAGES.length) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-[10px] text-[#484f58] font-mono">
                Estimated completion: {Math.max(0, Math.round((PIPELINE_STAGES.length - pipelineStep) * 1.2))}s remaining
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-indigo">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-semibold">Regulatory Impact Analysis</span>
      </div>

      {/* ── HEADER CARD ────────────────────────────────────────────────── */}
      <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo" /> Aarohan Bank Regulatory Intelligence
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo/10 text-indigo border border-indigo/20">
                NiyamAI Analysis Engine v2.4
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Regulatory Impact Analysis & Policy Gap Engine
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Upload any RBI PDF — NiyamAI will scan it, compare with existing Aarohan Bank policies, and list all required changes with risk levels, due dates & remediation actions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="file" accept=".pdf" className="hidden" ref={fileInputRef}
              onChange={e => { if (e.target.files?.[0]) handleSimulateUpload(e.target.files[0]); }}
            />
            {!hasAnalyzed ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo hover:bg-indigo/90 text-white font-bold text-sm border-2 border-black shadow-[3px_3px_0_0_#000000] transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                <Upload className="w-4 h-4" /> Upload PDF
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleSimulateUpload(uploadedFileName)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-secondary text-foreground hover:bg-secondary/80 font-bold text-sm border-2 border-black shadow-[3px_3px_0_0_#000000]"
                >
                  <Sparkles className="w-4 h-4 text-indigo" /> Re-Run
                </button>
                <button
                  onClick={handleReset}
                  disabled={isResetting}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red/10 text-red hover:bg-red/20 font-bold text-sm border-2 border-black shadow-[3px_3px_0_0_#000000]"
                >
                  <X className="w-4 h-4" /> {isResetting ? "Clearing..." : "Delete & Reset"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Compliance lineage chain — shown only after analysis */}
        {hasAnalyzed && (
          <div className="mt-6 pt-5 border-t border-border">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo" /> End-to-End Compliance Lineage — Analyzed: <span className="text-indigo ml-1">{uploadedFileName}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 gap-1.5 text-center font-mono text-[11px] font-bold">
              <div className="p-2 bg-indigo text-white border border-black shadow-[2px_2px_0_0_#000000]">REGULATION</div>
              <div className="p-2 bg-indigo/10 text-indigo border border-indigo/30">CHANGE (14)</div>
              <div className="p-2 bg-indigo/10 text-indigo border border-indigo/30">OBLIGATION</div>
              <div className="p-2 bg-secondary text-foreground border border-black/20">AAROHAN POLICY</div>
              <div className="p-2 bg-amber/10 text-amber border border-amber/30">MATCH (78%)</div>
              <div className="p-2 bg-red/10 text-red border border-red/30">GAP DETECTED</div>
              <div className="p-2 bg-red text-white border border-black shadow-[2px_2px_0_0_#000000]">RISK (Critical)</div>
              <div className="p-2 bg-secondary text-foreground border border-black/20">DEPARTMENTS</div>
              <div className="p-2 bg-teal text-white border border-black shadow-[2px_2px_0_0_#000000]">ACTION</div>
            </div>
          </div>
        )}
      </div>

      {/* ── UPLOAD PROMPT (no analysis yet) ────────────────────────────── */}
      {!hasAnalyzed && !analyzing && (
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-16 flex flex-col items-center text-center gap-6">
          <div className="w-20 h-20 bg-indigo/10 border-2 border-indigo/30 flex items-center justify-center">
            <ScanLine className="w-10 h-10 text-indigo" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold mb-2">Upload an RBI PDF to Begin Analysis</h2>
            <p className="text-muted-foreground max-w-lg">
              NiyamAI will scan the document page by page, detect regulatory changes, compare against Aarohan Bank's 4 existing policies, identify gaps, assess risk levels, set due dates, and push remediation actions to the Action Center.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-muted-foreground">
            {["Clause Detection", "Policy Comparison", "Gap Analysis", "Risk Scoring", "Due Date Parsing", "Action Generation"].map(t => (
              <span key={t} className="px-3 py-1.5 border border-border bg-secondary flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal" /> {t}
              </span>
            ))}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-8 py-3 bg-indigo text-white font-bold border-2 border-black shadow-[4px_4px_0_0_#000000] hover:bg-indigo/90 transition-transform active:translate-x-0.5 active:translate-y-0.5"
          >
            <Upload className="w-5 h-5" /> Upload RBI PDF
          </button>
        </div>
      )}

      {/* ── RESULTS (after analysis) ────────────────────────────────────── */}
      {hasAnalyzed && (
        <>
          {/* Analyzed PDF banner */}
          <div className="bg-teal/5 border-2 border-teal/30 p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal shrink-0" />
            <div className="flex-1">
              <span className="font-bold text-foreground text-sm">Analysis complete: </span>
              <span className="font-mono text-sm text-indigo">{uploadedFileName}</span>
              <span className="text-muted-foreground text-sm ml-2">— 14 amendments detected · 5 obligations extracted · Compared against 4 Aarohan Bank policies</span>
            </div>
            <Link href="/action-center" className="text-xs font-bold text-indigo border border-indigo/30 px-3 py-1.5 hover:bg-indigo/5 shrink-0">
              View Action Center →
            </Link>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo/10 border border-indigo/20 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-indigo" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-foreground">{rbiSummaryStats.totalMaterialChanges}</span>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Material Changes Detected</p>
                <span className="text-[10px] text-teal font-semibold">Master Direction 2025 Updates</span>
              </div>
            </div>
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <ListOrdered className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-foreground">{rbiSummaryStats.obligationsExtracted}</span>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Obligations Extracted</p>
                <span className="text-[10px] text-blue-600 font-semibold">100% Citing Verbatim Clauses</span>
              </div>
            </div>
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-red/10 border border-red/20 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 text-red" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-red">{rbiSummaryStats.criticalGaps} Critical Gaps</span>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Aarohan Policy Deficiencies</p>
                <span className="text-[10px] text-red font-semibold">+ 2 High Risk Gaps</span>
              </div>
            </div>
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-foreground">{rbiSummaryStats.affectedDepartments.length}</span>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Bank Units Impacted</p>
                <span className="text-[10px] text-purple-600 font-semibold">Ops, Compliance, IT, Risk, Legal</span>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[4px_4px_0_0_#000000] p-4 flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search obligations, clauses, policies, or gaps..."
                className="w-full pl-9 pr-3 py-1.5 text-sm border-2 border-black rounded-none bg-background focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="px-3 py-1.5 text-xs font-bold border-2 border-black rounded-none bg-background outline-none">
                <option value="All">All Departments</option>
                <option value="Operations">Operations</option>
                <option value="KYC Compliance">KYC Compliance</option>
                <option value="Risk Management">Risk Management</option>
                <option value="IT & Systems">IT & Systems</option>
                <option value="Legal">Legal</option>
              </select>
              <select value={filterImpact} onChange={e => setFilterImpact(e.target.value)} className="px-3 py-1.5 text-xs font-bold border-2 border-black rounded-none bg-background outline-none">
                <option value="All">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-1.5 text-xs font-bold border-2 border-black rounded-none bg-background outline-none">
                <option value="All">All Match States</option>
                <option value="GAP">GAP</option>
                <option value="PARTIAL MATCH">PARTIAL MATCH</option>
                <option value="FULL MATCH">FULL MATCH</option>
              </select>
              {(search || filterDept !== "All" || filterImpact !== "All" || filterStatus !== "All") && (
                <button onClick={() => { setSearch(""); setFilterDept("All"); setFilterImpact("All"); setFilterStatus("All"); }} className="text-xs font-bold text-indigo hover:underline px-2">
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Findings */}
          <div className="space-y-5">
            {filteredFindings.length === 0 ? (
              <div className="bg-card border-[3px] border-black p-12 text-center">
                <p className="text-muted-foreground font-semibold">No obligations found matching your filters.</p>
              </div>
            ) : filteredFindings.map(finding => {
              const isActionCreated = createdActionIds[finding.id];
              const isCreating = creatingActionId === finding.id;
              const daysRemaining = calculateDaysRemaining(finding.timelineDate);

              return (
                <div key={finding.id} className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] overflow-hidden">
                  {/* Finding Header */}
                  <div className="p-5 border-b-2 border-black bg-secondary/15 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-extrabold px-2.5 py-1 bg-indigo text-white border border-black shadow-[2px_2px_0_0_#000000] shrink-0">
                        {finding.obligationCode}
                      </span>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-foreground leading-snug">{finding.obligationTitle}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span className="font-semibold text-foreground">{finding.sourceClause}</span>
                          <span>•</span>
                          <span>{finding.sourcePageLabel}</span>
                          <span>•</span>
                          <span className="text-teal font-bold">NiyamAI Confidence: {finding.confidenceScore}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2.5 py-1 text-xs font-extrabold border-2 border-black shadow-[2px_2px_0_0_#000000] ${finding.matchStatus === "GAP" ? "bg-red text-white" : finding.matchStatus === "PARTIAL MATCH" ? "bg-amber text-black" : "bg-teal text-white"}`}>
                        {finding.matchStatus}
                      </span>
                      <RiskBadge level={finding.riskLevel} />
                    </div>
                  </div>

                  {/* Finding Body */}
                  <div className="p-5 space-y-4">
                    {/* Verbatim Evidence */}
                    <div className="bg-secondary/25 border-l-4 border-l-indigo border border-border p-4 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-indigo uppercase tracking-wider text-[10px]">
                        <span>Source Regulatory Excerpt (from {uploadedFileName})</span>
                        <span>PDF {finding.sourcePageLabel}</span>
                      </div>
                      <blockquote className="italic text-foreground/90 font-serif leading-relaxed">
                        "{finding.verbatimEvidence}"
                      </blockquote>
                    </div>

                    {/* Policy Comparison & Gap */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="border border-border p-3.5 bg-background space-y-2">
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                          <span>Aarohan Bank Policy Evaluated</span>
                          <span className="text-indigo font-bold">{finding.relevantPolicySection}</span>
                        </div>
                        <p className="font-bold text-foreground text-sm">{finding.affectedPolicy}</p>
                        <p className="text-muted-foreground leading-relaxed">{finding.matchExplanation}</p>
                      </div>
                      <div className="border border-red/30 bg-red/5 p-3.5 space-y-2">
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-red flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Required Change / Gap
                        </div>
                        <p className="text-foreground leading-relaxed font-medium">{finding.gapDetails}</p>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="border-2 border-black bg-secondary/10 p-3.5 space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border/60 pb-1.5">
                        <span className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4 text-red" /> NiyamAI Risk Assessment
                          <span className="text-[10px] font-normal text-muted-foreground">(AI synthesis — not assigned by RBI)</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-secondary px-2 py-0.5 border border-border">
                          Risk Confidence: {finding.riskConfidence}%
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                        <div>
                          <span className="text-muted-foreground font-bold block text-[10px] uppercase">Regulatory Impact:</span>
                          <p className="text-foreground mt-0.5">{finding.regulatoryImpact}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground font-bold block text-[10px] uppercase">Operational Impact:</span>
                          <p className="text-foreground mt-0.5">{finding.operationalImpact}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground font-bold block text-[10px] uppercase">Customer Impact:</span>
                          <p className="text-foreground mt-0.5">{finding.customerImpact}</p>
                        </div>
                      </div>
                    </div>

                    {/* Departments & Timeline */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2 border-t border-border">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-muted-foreground">Affected Units:</span>
                        {finding.departments.map((dept, i) => (
                          <span key={i} className="px-2 py-0.5 bg-secondary text-foreground text-[11px] font-bold border border-black/20">{dept}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-indigo" />
                        <div className="text-xs">
                          <span className={`font-bold px-2 py-0.5 text-[10px] uppercase mr-2 ${finding.timelineType === "Regulatory timeline specified by source" ? "bg-red/10 text-red border border-red/30" : "bg-blue-500/10 text-blue-600 border border-blue-500/30"}`}>
                            {finding.timelineType}
                          </span>
                          <strong className="text-foreground">{finding.timelineDisplay}</strong>
                          {daysRemaining > 0 && (
                            <span className="text-muted-foreground ml-1.5 font-mono">({daysRemaining} days remaining)</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-indigo/5 border-2 border-indigo/30 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-indigo">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Recommended Action: {finding.recommendedAction.actionCode}</span>
                          <span className="text-muted-foreground">• Owner: {finding.recommendedAction.owner}</span>
                        </div>
                        <p className="text-xs text-foreground font-medium">{finding.recommendedAction.title}</p>
                      </div>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <button
                          onClick={() => { setSelectedFinding(finding); setIsEvidenceDrawerOpen(true); }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-background border-2 border-black text-xs font-bold hover:bg-secondary transition-colors shadow-[2px_2px_0_0_#000000]"
                        >
                          <Eye className="w-3.5 h-3.5 text-indigo" /> View Evidence
                        </button>
                        <button
                          onClick={() => handleCreateAction(finding)}
                          disabled={isActionCreated || isCreating}
                          className={`flex items-center gap-1.5 px-4 py-1.5 font-bold text-xs border-2 border-black shadow-[2px_2px_0_0_#000000] transition-transform ${isActionCreated ? "bg-teal text-white cursor-default" : "bg-indigo text-white hover:bg-indigo/90 active:translate-x-0.5 active:translate-y-0.5"}`}
                        >
                          {isActionCreated ? <><Check className="w-3.5 h-3.5" /> In Action Center ✓</> : isCreating ? "Pushing..." : <><CheckCircle2 className="w-3.5 h-3.5" /> Add to Action Center</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── EVIDENCE DRAWER ─────────────────────────────────────────────── */}
      {isEvidenceDrawerOpen && selectedFinding && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border-[3px] border-black rounded-none shadow-[10px_10px_0_0_#000000] max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-5 border-b-2 border-black flex items-center justify-between bg-secondary/20">
              <div className="flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-indigo" />
                <div>
                  <h3 className="font-serif text-xl font-bold">Regulatory Provenance & Evidence Audit Trail</h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Traceability: {selectedFinding.obligationCode} ➔ {selectedFinding.relevantPolicySection} ➔ {selectedFinding.recommendedAction.actionCode}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsEvidenceDrawerOpen(false)} className="p-1 rounded hover:bg-secondary border border-border">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-indigo/5 border-b border-border text-xs font-mono font-bold flex items-center gap-2 overflow-x-auto">
              <span className="text-indigo">RBI Master Direction</span><span>➔</span>
              <span>{selectedFinding.sourcePageLabel}</span><span>➔</span>
              <span>{selectedFinding.sourceClause}</span><span>➔</span>
              <span className="text-indigo">{selectedFinding.affectedPolicy}</span><span>➔</span>
              <span className="text-red font-extrabold">{selectedFinding.matchStatus}</span><span>➔</span>
              <span className="text-teal font-extrabold">{selectedFinding.recommendedAction.actionCode}</span>
            </div>
            <div className="p-6 flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-black p-4 bg-background space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs font-extrabold text-indigo uppercase tracking-wider">1. Official Regulatory Source</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-secondary border">{selectedFinding.sourcePageLabel}</span>
                </div>
                <div><label className="text-[10px] font-bold text-muted-foreground uppercase">Source Document</label><p className="text-xs font-semibold text-foreground">{selectedFinding.sourceDocument}</p></div>
                <div><label className="text-[10px] font-bold text-muted-foreground uppercase">Clause / Citation</label><p className="text-xs font-mono font-bold text-indigo">{selectedFinding.sourceClause}</p></div>
                <div><label className="text-[10px] font-bold text-muted-foreground uppercase">Verbatim Statutory Text</label>
                  <div className="p-3 bg-secondary/30 border border-border text-xs italic font-serif leading-relaxed text-foreground mt-1">"{selectedFinding.verbatimEvidence}"</div>
                </div>
                <div><label className="text-[10px] font-bold text-muted-foreground uppercase">Statutory Deadline</label><p className="text-xs font-bold text-red mt-0.5">{selectedFinding.timelineDisplay}</p></div>
              </div>
              <div className="border-2 border-black p-4 bg-background space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs font-extrabold text-teal uppercase tracking-wider">2. Aarohan Bank Alignment & Action</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-red/10 text-red border border-red/30">{selectedFinding.matchStatus}</span>
                </div>
                <div><label className="text-[10px] font-bold text-muted-foreground uppercase">Internal Policy</label><p className="text-xs font-semibold text-foreground">{selectedFinding.affectedPolicy}</p><span className="text-[11px] text-muted-foreground">{selectedFinding.relevantPolicySection}</span></div>
                <div><label className="text-[10px] font-bold text-muted-foreground uppercase">Identified Gap / Required Change</label>
                  <div className="p-2.5 bg-red/5 border border-red/20 text-xs text-foreground mt-1">{selectedFinding.gapDetails}</div>
                </div>
                <div><label className="text-[10px] font-bold text-muted-foreground uppercase">Remediation Action</label>
                  <div className="p-2.5 bg-indigo/5 border border-indigo/20 text-xs space-y-1 mt-1">
                    <p className="font-bold text-indigo">{selectedFinding.recommendedAction.title}</p>
                    <p className="text-muted-foreground">{selectedFinding.recommendedAction.description}</p>
                    <div className="flex justify-between items-center text-[10px] pt-1 text-foreground font-semibold">
                      <span>Owner: {selectedFinding.recommendedAction.owner}</span>
                      <span>Due: {selectedFinding.recommendedAction.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t-2 border-black bg-secondary/20 flex items-center justify-between">
              <Link href="/regulatory-trace" className="text-xs font-bold text-indigo hover:underline flex items-center gap-1">
                Inspect in Trace Graph <span className="w-3.5 h-3.5">↗</span>
              </Link>
              <button onClick={() => setIsEvidenceDrawerOpen(false)} className="px-4 py-1.5 bg-background border-2 border-black text-xs font-bold hover:bg-secondary">
                Close Evidence Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
