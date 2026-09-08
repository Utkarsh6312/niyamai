"use client";
import { 
  ChevronRight, 
  ChevronLeft,
  ExternalLink,
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ArrowUp,
  Users,
  Calendar,
  Eye,
  Plus,
  GitCompare,
  User,
  LayoutGrid,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PolicyMapping() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
     setAccepted(true);
     toast.success("Mapping approved successfully", {
        description: "Action ACT-2041 created. Audit record updated."
     });
     setTimeout(() => {
        router.push("/action-center");
     }, 1500);
  };

  return (
    <div className="space-y-6 flex flex-col pb-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground gap-2">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/policy-mapping" className="hover:text-foreground transition-colors">Policy Mapping</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-foreground transition-colors cursor-pointer">RBI KYC Amendment</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">Clause 4.2</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Policy Impact Mapping</h1>
          <p className="text-muted-foreground text-[15px] mt-1">Trace regulatory obligations to the exact internal policies they affect.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#2563eb] text-[#2563eb] bg-background rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
            <Eye className="w-4 h-4" />
            View Full Trace
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Create Compliance Action
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_240px_1fr] gap-6">
        {/* Column 1: RBI REGULATION */}
        <div className="flex flex-col">
          <div className="mb-3">
             <div className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase mb-1">RBI REGULATION</div>
             <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-bold text-foreground">RBI Master Direction — KYC (2026)</h2>
                <span className="bg-destructive/10 text-destructive border border-destructive/20 text-[10px] font-semibold px-2 py-0.5 rounded">Regulatory Source</span>
             </div>
             <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>Published: 20 Aug 2026 <span className="mx-1">|</span> Effective: 01 Oct 2026</div>
                <div className="flex items-center gap-2">
                   <span>Page 18 of 42</span>
                   <div className="flex items-center gap-1">
                      <button className="p-1 border border-border rounded bg-background hover:bg-accent"><ChevronLeft className="w-3 h-3" /></button>
                      <button className="p-1 border border-border rounded bg-background hover:bg-accent"><ChevronRight className="w-3 h-3" /></button>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  flex-1 flex flex-col ">
             <div className="p-6 flex-1 border-b border-border">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-2">
                      <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded">CLAUSE 4.2</span>
                      <span className="bg-blue-500/10 text-blue-500 text-xs font-bold px-2 py-1 rounded">Mandatory</span>
                   </div>
                   <div className="w-10 h-10 rounded-full border border-border overflow-hidden opacity-50 flex items-center justify-center bg-secondary">
                     <span className="text-[10px] text-muted-foreground font-medium">SEAL</span>
                   </div>
                </div>
                <h3 className="text-base font-bold text-foreground mb-4">Customer Due Diligence</h3>
                <div className="space-y-4 text-[14px] text-foreground/80 leading-relaxed">
                   <p>
                      Regulated entities shall ensure that <span className="bg-amber-500/20 text-foreground px-1 py-0.5 rounded">enhanced customer due diligence procedures are applied</span> in cases involving higher risk customers, including but not limited to politically exposed persons (PEPs), non-face-to-face onboarding, and customers from high-risk jurisdictions.
                   </p>
                   <p>
                      The regulated entity shall verify the source of funds and source of wealth for such customers and maintain appropriate documentation.
                   </p>
                   <p>
                      These procedures shall be incorporated into the bank's internal policies, SOPs and onboarding workflows by <span className="bg-amber-500/20 text-foreground px-1 py-0.5 rounded">01 October 2026.</span>
                   </p>
                </div>
             </div>
             <div className="px-6 py-3 bg-muted/30 rounded-b-xl flex justify-between items-center text-xs text-muted-foreground">
                <div>Source: RBI Master Direction — KYC <span className="mx-2"></span> Page 18 | Clause 4.2</div>
                <a href="#" className="flex items-center gap-1 text-primary hover:underline font-medium">
                   View in Document <ExternalLink className="w-3 h-3" />
                </a>
             </div>
          </div>
        </div>

        {/* Column 2: Semantic Match */}
        <div className="flex flex-col xl:mt-[4.5rem]">
           <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-6 flex flex-col items-center justify-center  h-full">
              <h3 className="text-[15px] font-bold text-foreground mb-6">Semantic Match</h3>
              
              <div className="relative w-32 h-32 mb-4">
                 <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="fill-none stroke-secondary" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" className="fill-none stroke-amber-500" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="55.2" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">78<span className="text-xl">%</span></span>
                 </div>
              </div>

              <div className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-8">
                 Partial Match
              </div>

              <div className="w-full space-y-3 mb-8">
                 <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                       <span className="text-muted-foreground">Matched Content</span>
                    </div>
                    <span className="font-medium text-foreground">2 items</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                       <span className="text-muted-foreground">Missing Elements</span>
                    </div>
                    <span className="font-medium text-foreground">1 item</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-destructive"></div>
                       <span className="text-muted-foreground">Conflicting Elements</span>
                    </div>
                    <span className="font-medium text-foreground">1 item</span>
                 </div>
              </div>

              <div className="pt-6 border-t border-border w-full flex flex-col items-center text-center">
                 <div className="w-8 h-8 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center mb-2">
                    <GitCompare className="w-4 h-4" />
                 </div>
                 <div className="text-xs font-bold text-foreground mb-1">AI-Powered<br/>Semantic Analysis</div>
                 <div className="text-[10px] text-muted-foreground">Comparing regulatory requirements<br/>with internal policy clauses.</div>
              </div>
           </div>
        </div>

        {/* Column 3: AAROHAN BANK POLICY */}
        <div className="flex flex-col">
          <div className="mb-3">
             <div className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase mb-1">AAROHAN BANK POLICY</div>
             <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-bold text-foreground">KYC Policy v3.4</h2>
                <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded">Internal Policy</span>
             </div>
             <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>Owner: Compliance <span className="mx-1">|</span> Last Updated: 12 Aug 2026</div>
                <div className="flex items-center gap-2">
                   <span>Page 12 of 28</span>
                   <div className="flex items-center gap-1">
                      <button className="p-1 border border-border rounded bg-background hover:bg-accent"><ChevronLeft className="w-3 h-3" /></button>
                      <button className="p-1 border border-border rounded bg-background hover:bg-accent"><ChevronRight className="w-3 h-3" /></button>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  flex-1 flex flex-col  relative overflow-hidden">
             <div className="absolute right-0 top-0 bottom-0 w-1 bg-secondary">
                <div className="w-full bg-muted-foreground/30 h-16 rounded-full mt-10"></div>
             </div>
             <div className="p-6 flex-1 border-b border-border pr-8">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-2">
                      <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded">SECTION 3.2</span>
                   </div>
                </div>
                <h3 className="text-base font-bold text-foreground mb-4">Customer Due Diligence</h3>
                <div className="space-y-4 text-[14px] text-foreground/80 leading-relaxed">
                   <p>
                      The Bank shall perform customer due diligence (CDD) for all new customers in accordance with the risk-based approach. This includes identification and verification of customer identity, address, and beneficial ownership information.
                   </p>
                   <p className="bg-emerald-500/20 text-foreground px-1.5 py-0.5 rounded">
                      Periodic review of customer accounts shall be conducted based on the risk profile and transaction activity.
                   </p>
                   <p>
                      Enhanced due diligence shall be applied for PEPs and high-risk jurisdictions as per the Bank's risk categorization framework.
                   </p>
                </div>
             </div>
             <div className="px-6 py-3 bg-muted/30 rounded-b-xl flex justify-between items-center text-xs text-muted-foreground">
                <div>Source: KYC Policy v3.4 <span className="mx-2"></span> Section 3.2</div>
                <a href="#" className="flex items-center gap-1 text-primary hover:underline font-medium">
                   View Full Policy <ExternalLink className="w-3 h-3" />
                </a>
             </div>
          </div>
        </div>
      </div>

      {/* Mapping Analysis */}
      <div>
         <h2 className="text-lg font-bold text-foreground mb-4">Mapping Analysis</h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Box 1 */}
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5 ">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-emerald-500/10 flex items-center justify-center">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">Matched Elements</h3>
               </div>
               <ul className="space-y-2">
                  <li className="flex gap-2 text-[13px] text-muted-foreground">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                     <span>Customer due diligence requirement</span>
                  </li>
                  <li className="flex gap-2 text-[13px] text-muted-foreground">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                     <span>Enhanced due diligence for PEPs</span>
                  </li>
               </ul>
            </div>

            {/* Box 2 */}
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5 ">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-amber-500/10 flex items-center justify-center">
                     <AlertCircle className="w-4 h-4 text-amber-500" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">Missing Elements</h3>
               </div>
               <ul className="space-y-2">
                  <li className="flex gap-2 text-[13px] text-muted-foreground">
                     <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                     <span>New verification trigger for non-face-to-face onboarding not specified.</span>
                  </li>
               </ul>
            </div>

            {/* Box 3 */}
            <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5 ">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-destructive/10 flex items-center justify-center">
                     <LayoutGrid className="w-4 h-4 text-destructive" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">Conflicting Elements</h3>
               </div>
               <ul className="space-y-2">
                  <li className="flex gap-2 text-[13px] text-muted-foreground">
                     <LayoutGrid className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                     <span>Review frequency differs (regulation requires event-based trigger, policy has periodic review only).</span>
                  </li>
               </ul>
            </div>

            {/* Box 4 */}
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5 shadow-sm">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-purple-500/10 flex items-center justify-center">
                     <Sparkles className="w-4 h-4 text-purple-500" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">AI Recommendation</h3>
               </div>
               <p className="text-[13px] text-foreground/80 leading-relaxed">
                  Update Section 3.2 of KYC Policy to explicitly include the new verification trigger for non-face-to-face onboarding and align review frequency with the regulatory requirement.
               </p>
            </div>
         </div>
      </div>

      {/* Action Footer */}
      <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5 mt-2 flex flex-col lg:flex-row items-start lg:items-center justify-between  gap-6">
         <div className="flex items-center gap-6 lg:gap-8 flex-wrap">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center">
                  <ArrowUp className="w-5 h-5 text-[#2563eb]" />
               </div>
               <div>
                  <div className="flex items-center gap-2">
                     <h4 className="font-bold text-[14px] text-foreground">Impact</h4>
                     <span className="bg-destructive/10 text-destructive text-[10px] font-bold px-2 py-0.5 rounded">High</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Potential regulatory exposure</p>
               </div>
            </div>

            <div className="flex items-center gap-3 lg:border-l border-border lg:pl-8">
               <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#2563eb]" />
               </div>
               <div>
                  <h4 className="font-bold text-[14px] text-foreground mb-1">Impacted Departments</h4>
                  <div className="flex gap-1.5">
                     <span className="bg-[#2563eb]/10 text-[#2563eb] text-[11px] font-medium px-2 py-0.5 rounded">KYC</span>
                     <span className="bg-[#2563eb]/10 text-[#2563eb] text-[11px] font-medium px-2 py-0.5 rounded">Operations</span>
                     <span className="bg-[#2563eb]/10 text-[#2563eb] text-[11px] font-medium px-2 py-0.5 rounded">Compliance</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-3 lg:border-l border-border lg:pl-8">
               <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#2563eb]" />
               </div>
               <div>
                  <h4 className="font-bold text-[14px] text-foreground">Suggested Timeline</h4>
                  <div className="text-xs text-foreground mt-0.5 font-medium">
                     By 28 Sep 2026 <span className="text-muted-foreground font-normal ml-1">(Ahead of regulatory deadline)</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="flex flex-col items-start lg:items-end gap-3 shrink-0 w-full lg:w-auto">
            <div className="flex items-center gap-3 w-full lg:w-auto">
               <button 
                  onClick={handleAccept}
                  disabled={accepted}
                  className="bg-[#2563eb] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 flex-1 lg:flex-none">
                  {accepted ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : "Accept Mapping"}
               </button>
               <button className="border border-[#2563eb] text-[#2563eb] bg-background px-6 py-2.5 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors flex-1 lg:flex-none">
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
    </div>
  );
}
