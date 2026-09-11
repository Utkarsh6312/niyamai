"use client";
import { 
  ChevronRight, ChevronLeft, ExternalLink, CheckCircle2, AlertCircle, 
  Sparkles, ArrowUp, Users, Calendar, Eye, Plus, GitCompare, User, 
  LayoutGrid, Loader2
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api/client";
import type { Obligation, Mapping, Gap } from "@/lib/types";

function MappingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const obId = searchParams.get("obligationId");

  const [obligation, setObligation] = useState<Obligation | null>(null);
  const [mapping, setMapping] = useState<Mapping | null>(null);
  const [gaps, setGaps] = useState<Gap[]>([]);
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        let targetObId = obId;
        if (!targetObId) {
          const obs = await api.obligations({ limit: 20 });
          targetObId = obs.find(o => o.status !== "Not Started")?.id || null;
        }

        if (targetObId) {
          const [ob, maps] = await Promise.all([
            api.obligation(targetObId),
            api.obligationMappings(targetObId)
          ]);
          setObligation(ob);
          if (maps.length > 0) {
            setMapping(maps[0]);
            setGaps((maps[0] as any).gaps || []);
          }
        }
      } catch {
        toast.error("Failed to load mapping data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [obId]);

  const handleAccept = async () => {
     if (!mapping) return;
     setAccepted(true);
     try {
       await api.reviewMapping(mapping.id, "Approved");
       toast.success("Mapping approved successfully", {
          description: "Action center has been updated. Audit record updated."
       });
       setTimeout(() => router.push("/action-center"), 1500);
     } catch {
       toast.error("Failed to approve mapping");
       setAccepted(false);
     }
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>;
  }

  if (!obligation || !mapping) {
    return <div className="flex-1 flex items-center justify-center p-12 text-muted-foreground">No mapping data found for this obligation.</div>;
  }

  const matchPercent = Math.round(mapping.match_score || 0);

  return (
    <>
      <div className="flex items-center justify-between mt-6">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">Policy Impact Mapping</h1>
          <p className="text-muted-foreground text-[15px] mt-1">Trace regulatory obligations to the exact internal policies they affect.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/regulatory-trace?obligationId=${obligation.id}`} className="flex items-center gap-2 px-4 py-2 border border-indigo text-indigo bg-background rounded-md text-sm font-medium hover:bg-indigo/5 transition-colors">
            <Eye className="w-4 h-4" /> View Full Trace
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md text-sm font-medium hover:bg-indigo/90 transition-colors">
            <Plus className="w-4 h-4" /> Create Compliance Action
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_240px_1fr] gap-6 mt-6">
        {/* Column 1: REGULATION */}
        <div className="flex flex-col">
          <div className="mb-3">
             <div className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase mb-1">REGULATION</div>
             <div className="flex items-center gap-2 mb-2">
                <h2 className="font-serif text-lg font-bold text-foreground line-clamp-1">{obligation.regulation_title}</h2>
                <span className="bg-destructive/10 text-destructive border border-destructive/20 text-[10px] font-semibold px-2 py-0.5 rounded shrink-0">Regulatory Source</span>
             </div>
             <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>Source: {obligation.type}</div>
             </div>
          </div>

          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex-1 flex flex-col ">
             <div className="p-6 flex-1 border-b border-border">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-2">
                      <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded">
                        {obligation.clause_no ? `CLAUSE ${obligation.clause_no}` : obligation.obligation_code}
                      </span>
                      <span className="bg-blue-500/10 text-blue-500 text-xs font-bold px-2 py-1 rounded">{obligation.impact} Impact</span>
                   </div>
                </div>
                <h3 className="text-base font-bold text-foreground mb-4">Requirement</h3>
                <div className="space-y-4 text-[14px] text-foreground/80 leading-relaxed">
                   <p>{obligation.requirement}</p>
                </div>
             </div>
             <div className="px-6 py-3 bg-muted/30 rounded-b-xl flex justify-between items-center text-xs text-muted-foreground">
                <div>{obligation.department}</div>
             </div>
          </div>
        </div>

        {/* Column 2: Semantic Match */}
        <div className="flex flex-col xl:mt-[4.5rem]">
           <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-6 flex flex-col items-center justify-center h-full">
              <h3 className="text-[15px] font-bold text-foreground mb-6">Semantic Match</h3>
              
              <div className="relative w-32 h-32 mb-4">
                 <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="fill-none stroke-secondary" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" className="fill-none stroke-amber-500" strokeWidth="8" strokeDasharray={`${matchPercent * 2.512} 251.2`} />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">{matchPercent}<span className="text-xl">%</span></span>
                 </div>
              </div>

              <div className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-8">
                 {mapping.mapping_status}
              </div>

              <div className="w-full space-y-3 mb-8">
                 <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                       <span className="text-muted-foreground">Confidence</span>
                    </div>
                    <span className="font-medium text-foreground">{matchPercent}%</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                       <span className="text-muted-foreground">Identified Gaps</span>
                    </div>
                    <span className="font-medium text-foreground">{gaps.length}</span>
                 </div>
              </div>

              <div className="pt-6 border-t border-border w-full flex flex-col items-center text-center">
                 <div className="w-8 h-8 rounded-full bg-indigo/10 text-indigo flex items-center justify-center mb-2">
                    <GitCompare className="w-4 h-4" />
                 </div>
                 <div className="text-xs font-bold text-foreground mb-1">AI-Powered<br/>Semantic Analysis</div>
                 <div className="text-[10px] text-muted-foreground">Comparing regulatory requirements<br/>with internal policy clauses.</div>
              </div>
           </div>
        </div>

        {/* Column 3: INTERNAL POLICY */}
        <div className="flex flex-col">
          <div className="mb-3">
             <div className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase mb-1">INTERNAL POLICY</div>
             <div className="flex items-center gap-2 mb-2">
                <h2 className="font-serif text-lg font-bold text-foreground line-clamp-1">{mapping.policy?.name || "Target Policy"}</h2>
                <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded shrink-0">Internal Policy</span>
             </div>
             <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>Owner: {(mapping.policy as any)?.owner || "N/A"} <span className="mx-1">|</span> Updated: {mapping.policy?.last_updated || "N/A"}</div>
             </div>
          </div>

          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex-1 flex flex-col relative overflow-hidden">
             <div className="p-6 flex-1 border-b border-border">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-2">
                      <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded">
                        {mapping.policy?.section ? `SECTION ${mapping.policy.section}` : "MAPPED SECTION"}
                      </span>
                   </div>
                </div>
                <h3 className="text-base font-bold text-foreground mb-4">Extracted Content</h3>
                <div className="space-y-4 text-[14px] text-foreground/80 leading-relaxed">
                   <p>{(mapping as any).mapped_content || "Content snippet not available."}</p>
                </div>
             </div>
             <div className="px-6 py-3 bg-muted/30 rounded-b-xl flex justify-between items-center text-xs text-muted-foreground">
                <div>Source: {mapping.policy?.name || "Policy"}</div>
                <Link href="#" className="flex items-center gap-1 text-indigo hover:underline font-medium">
                   View Full Policy <ExternalLink className="w-3 h-3" />
                </Link>
             </div>
          </div>
        </div>
      </div>

      {/* Mapping Analysis */}
      <div className="mt-6">
         <h2 className="font-serif text-lg font-bold text-foreground mb-4">Mapping Analysis</h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Box 1 */}
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-emerald-500/10 flex items-center justify-center">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">Matched Elements</h3>
               </div>
               <p className="text-xs text-muted-foreground">{(mapping as any).mapping_rationale}</p>
            </div>

            {/* Box 2 & 3: Gaps */}
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 col-span-2">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-amber-500/10 flex items-center justify-center">
                     <AlertCircle className="w-4 h-4 text-amber-500" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">Identified Gaps</h3>
               </div>
               <ul className="space-y-3">
                  {gaps.map(gap => (
                    <li key={gap.id} className="flex gap-2 text-[13px] text-muted-foreground items-start">
                       <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                       <div className="flex flex-col">
                         <span className="font-semibold text-foreground">{(gap as any).gap_type}</span>
                         <span>{(gap as any).gap_description}</span>
                       </div>
                    </li>
                  ))}
                  {gaps.length === 0 && <li className="text-sm text-muted-foreground italic">No gaps detected. Fully compliant.</li>}
               </ul>
            </div>

            {/* Box 4 */}
            <div className="bg-indigo/5 border border-indigo/20 rounded-xl p-5 shadow-sm">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-indigo/10 flex items-center justify-center">
                     <Sparkles className="w-4 h-4 text-indigo" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">AI Recommendation</h3>
               </div>
               <p className="text-[13px] text-foreground/80 leading-relaxed">
                  {(gaps[0] as any)?.remediation_suggestion || "No specific AI recommendation available."}
               </p>
            </div>
         </div>
      </div>

      {/* Action Footer */}
      <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 mt-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
         <div className="flex items-center gap-6 lg:gap-8 flex-wrap">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center">
                  <ArrowUp className="w-5 h-5 text-indigo" />
               </div>
               <div>
                  <div className="flex items-center gap-2">
                     <h4 className="font-bold text-[14px] text-foreground">Impact</h4>
                     <span className="bg-destructive/10 text-destructive text-[10px] font-bold px-2 py-0.5 rounded">{obligation.impact}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Assessed regulatory impact</p>
               </div>
            </div>

            <div className="flex items-center gap-3 lg:border-l border-border lg:pl-8">
               <div className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo" />
               </div>
               <div>
                  <h4 className="font-bold text-[14px] text-foreground mb-1">Impacted Departments</h4>
                  <div className="flex gap-1.5">
                     <span className="bg-indigo/10 text-indigo text-[11px] font-medium px-2 py-0.5 rounded">{obligation.department}</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-3 lg:border-l border-border lg:pl-8">
               <div className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-indigo" />
               </div>
               <div>
                  <h4 className="font-bold text-[14px] text-foreground">Mapping Status</h4>
                  <div className="text-xs text-foreground mt-0.5 font-medium">
                     {mapping.review_status}
                  </div>
               </div>
            </div>
         </div>

         <div className="flex flex-col items-start lg:items-end gap-3 shrink-0 w-full lg:w-auto">
            <div className="flex items-center gap-3 w-full lg:w-auto">
               <button 
                  onClick={handleAccept}
                  disabled={accepted || mapping.review_status === 'Approved'}
                  className="bg-indigo text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-indigo/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 flex-1 lg:flex-none">
                  {accepted ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : mapping.review_status === 'Approved' ? "Mapping Approved" : "Approve Mapping"}
               </button>
               <button className="border border-indigo text-indigo bg-background px-6 py-2.5 rounded-md text-sm font-medium hover:bg-indigo/5 transition-colors flex-1 lg:flex-none">
                  Request Review
               </button>
               <button className="border border-border text-foreground bg-background px-6 py-2.5 rounded-md text-sm font-medium hover:bg-accent transition-colors flex-1 lg:flex-none">
                  Reject
               </button>
            </div>
            <div className="text-[11px] text-purple-600 font-medium flex items-center gap-1.5 bg-purple-50 px-3 py-1 rounded-full lg:pr-6 lg:self-center lg:-ml-12">
               <User className="w-3 h-3" />
               AI Suggested • Human Approval Required
            </div>
         </div>
      </div>
    </>
  );
}

export default function PolicyMapping() {
  return (
    <div className="space-y-6 flex flex-col pb-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground gap-2">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/impact-analysis" className="hover:text-foreground transition-colors">Impact Analysis</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">Policy Mapping</span>
      </div>

      <Suspense fallback={<div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>}>
        <MappingContent />
      </Suspense>
    </div>
  );
}
