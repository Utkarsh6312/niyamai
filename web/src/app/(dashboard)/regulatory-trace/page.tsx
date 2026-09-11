"use client";
import { ChevronRight, ArrowRight, Loader2, FileText, AlertTriangle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { TraceGraph } from "@/components/graphs/TraceGraph";
import { RiskBadge } from "@/components/ui/badges";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { api } from "@/lib/api/client";
import type { Obligation } from "@/lib/types";

function TraceContent() {
  const searchParams = useSearchParams();
  const obId = searchParams.get("obligationId");

  const [graphData, setGraphData] = useState<{ nodes: any[], edges: any[] } | null>(null);
  const [obligation, setObligation] = useState<Obligation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (!obId) {
          // If no specific obligation provided, just fetch the first one we have mappings for
          const obs = await api.obligations({ limit: 10 });
          const ob = obs.find(o => o.status !== "Not Started");
          if (ob) {
            const data = await api.obligationTrace(ob.id);
            setGraphData(data as any);
            setObligation(ob);
          }
        } else {
          const ob = await api.obligation(obId);
          setObligation(ob);
          const data = await api.obligationTrace(obId);
          setGraphData(data as any);
        }
      } catch {
        // error
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [obId]);

  return (
    <div className="flex gap-6 flex-1 min-h-0 bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] overflow-hidden">
      
      {/* Left Sidebar Info */}
      <div className="w-[320px] shrink-0 border-r border-border bg-secondary/10 flex flex-col">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              Loading trace data...
            </div>
          ) : !obligation ? (
            <div className="p-12 text-center text-muted-foreground">No trace data found</div>
          ) : (
            <>
              <div className="p-6 border-b border-border bg-card">
                  <h3 className="font-bold mb-1 line-clamp-2">{obligation.regulation_title}</h3>
                  <p className="text-sm text-muted-foreground">{obligation.clause_no ? `Clause ${obligation.clause_no}` : obligation.regulation_title}</p>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2"><FileText className="w-3 h-3"/> Identified Obligation</h4>
                    <div className="bg-indigo/5 border border-indigo/10 p-3 rounded text-sm font-medium text-indigo line-clamp-3">
                        {obligation.requirement}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2"><ShieldAlert className="w-3 h-3"/> Policy Gap Detected</h4>
                    {graphData?.nodes.some(n => n.type === "gap") ? (
                      <div className="bg-amber/10 border border-amber/20 p-3 rounded text-sm font-medium text-amber flex flex-col gap-2">
                          <span>{graphData.nodes.find(n => n.type === "gap")?.data.label}</span>
                          <span className="text-xs font-normal opacity-80">{graphData.nodes.find(n => n.type === "gap")?.data.sub}</span>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground italic">No gaps mapped yet.</div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2"><AlertTriangle className="w-3 h-3"/> Risk Assessment</h4>
                    {graphData?.nodes.some(n => n.type === "risk") ? (
                      <>
                        <RiskBadge level={graphData.nodes.find(n => n.type === "risk")?.data.label.replace(" Risk", "") || "High"} />
                        <p className="text-xs text-muted-foreground mt-2">{graphData.nodes.find(n => n.type === "risk")?.data.sub}</p>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground italic">No risks assessed yet.</div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Action Required</h4>
                    {graphData?.nodes.some(n => n.type === "action") ? (
                      <div className="bg-blue-100 border border-blue-200 p-3 rounded text-sm font-medium text-blue-800">
                          {graphData.nodes.find(n => n.type === "action")?.data.label}: {graphData.nodes.find(n => n.type === "action")?.data.sub}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground italic">No actions generated yet.</div>
                    )}
                  </div>
              </div>
            </>
          )}
      </div>

      {/* Main Graph Area */}
      <div className="flex-1 relative">
          {graphData && graphData.nodes.length > 0 ? (
            <TraceGraph initialNodes={graphData.nodes} initialEdges={graphData.edges} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              {loading ? "" : "Insufficient provenance data to generate graph."}
            </div>
          )}
      </div>
    </div>
  );
}

export default function RegulatoryTrace() {
  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-indigo">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/impact-analysis" className="hover:text-indigo">Impact Analysis</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Regulatory Trace</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Regulatory Trace</h1>
          <p className="text-muted-foreground mt-1 text-base">End-to-end provenance mapping from regulation to compliance action.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/policy-mapping" className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md font-medium text-sm hover:bg-indigo/90 transition-colors shadow-sm">
             Continue to Policy Mapping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Suspense fallback={<div className="flex-1 bg-card border-[3px] border-black flex items-center justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>}>
        <TraceContent />
      </Suspense>
    </div>
  );
}
