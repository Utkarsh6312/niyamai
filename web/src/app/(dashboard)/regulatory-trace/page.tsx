"use client";
import { ChevronRight, Filter, Search, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TraceGraph } from "@/components/graphs/TraceGraph";
import { RiskBadge } from "@/components/ui/badges";

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

      <div className="flex gap-6 flex-1 min-h-0 bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]   overflow-hidden">
        
        {/* Left Sidebar Info */}
        <div className="w-[320px] shrink-0 border-r border-border bg-secondary/10 flex flex-col">
           <div className="p-6 border-b border-border bg-card">
              <h3 className="font-bold mb-1">Clause 4.2</h3>
              <p className="text-sm text-muted-foreground">RBI KYC Master Direction</p>
           </div>
           
           <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div>
                 <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Identified Obligation</h4>
                 <div className="bg-indigo/5 border border-indigo/10 p-3 rounded text-sm font-medium text-indigo">
                    Update verification trigger (Required every 6 months)
                 </div>
              </div>

              <div>
                 <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Policy Gap Detected</h4>
                 <div className="bg-amber/10 border border-amber/20 p-3 rounded text-sm font-medium text-amber flex flex-col gap-2">
                    <span>Partial Match (78%)</span>
                    <span className="text-xs font-normal opacity-80">Verification frequency mismatch with KYC Policy v3.4 §3.2</span>
                 </div>
              </div>

              <div>
                 <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Risk Assessment</h4>
                 <RiskBadge level="High" />
                 <p className="text-xs text-muted-foreground mt-2">Potential regulatory non-compliance penalty if not remediated.</p>
              </div>

              <div>
                 <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Action Required</h4>
                 <div className="bg-blue-100 border border-blue-200 p-3 rounded text-sm font-medium text-blue-800">
                    ACT-2041: Update SOP & Systems
                 </div>
              </div>
           </div>
        </div>

        {/* Main Graph Area */}
        <div className="flex-1 relative">
           <TraceGraph />
        </div>

      </div>
    </div>
  );
}
