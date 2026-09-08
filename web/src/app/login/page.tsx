"use client";

import { ArrowRight, Building2, EyeOff, Globe, Lock, Mail, ShieldCheck, FileText, Search, BarChart3, Zap } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex w-full h-screen bg-white">
      {/* Left Pane - Branding & Value Prop */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#041122] text-white p-14 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#041122] via-[#041122]/90 to-[#041122]/60 z-10" />
        
        {/* Placeholder for building background image */}
        <div className="absolute bottom-0 right-0 w-[150%] h-[80%] opacity-20 pointer-events-none z-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />

        <div className="relative z-20 flex justify-between items-start">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                  <path d="M2 16L16 2L30 16L16 30L2 16Z" fill="#132238"/>
                  <path d="M16 2L30 16H16V2Z" fill="#16A394"/>
                  <path d="M2 16L16 30V16H2Z" fill="#4969E8"/>
                </svg>
             </div>
             <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-wide leading-none">NIYAMAI</span>
                <span className="text-[10px] text-white/70 uppercase tracking-widest mt-0.5">From Regulation to Action.</span>
             </div>
          </div>
          <div className="flex gap-6 text-[10px] font-semibold tracking-[0.15em] text-white/60 pt-2">
             <span>TRUST</span>
             <span>COMPLIANCE</span>
             <span>RESILIENCE</span>
          </div>
        </div>

        <div className="relative z-20 max-w-lg mt-20 mb-auto">
          <h1 className="text-5xl font-bold leading-[1.15] mb-6">
            Regulatory<br />
            intelligence for<br />
            <span className="text-[#3b82f6]">a safer financial future.</span>
          </h1>
          <p className="text-lg text-white/80 mb-14 max-w-md leading-relaxed">
            Transform regulatory change into confident action with AI-powered intelligence, tailored for financial institutions.
          </p>

          {/* Workflow steps */}
          <div className="flex items-start gap-4 mb-16">
            <div className="flex flex-col items-center group">
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-3 group-hover:border-[#3b82f6] transition-colors bg-[#041122]/50 backdrop-blur-sm">
                  <Building2 className="w-5 h-5 text-[#3b82f6]" />
               </div>
               <span className="font-bold text-[13px]">Regulation</span>
               <span className="text-[10px] text-white/50 text-center mt-1 leading-tight">RBI, SEBI,<br/>IRDAI, MCA...</span>
            </div>
            <div className="mt-5 text-white/30 text-sm">→</div>
            
            <div className="flex flex-col items-center group">
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-3 group-hover:border-[#3b82f6] transition-colors bg-[#041122]/50 backdrop-blur-sm">
                  <FileText className="w-5 h-5 text-[#3b82f6]" />
               </div>
               <span className="font-bold text-[13px]">Obligation</span>
               <span className="text-[10px] text-white/50 text-center mt-1 leading-tight">Extract &<br/>Interpret</span>
            </div>
            <div className="mt-5 text-white/30 text-sm">→</div>

            <div className="flex flex-col items-center group">
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-3 group-hover:border-[#3b82f6] transition-colors bg-[#041122]/50 backdrop-blur-sm">
                  <Search className="w-5 h-5 text-[#3b82f6]" />
               </div>
               <span className="font-bold text-[13px]">Policy</span>
               <span className="text-[10px] text-white/50 text-center mt-1 leading-tight">Map &<br/>Analyze</span>
            </div>
            <div className="mt-5 text-white/30 text-sm">→</div>

            <div className="flex flex-col items-center group">
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-3 group-hover:border-[#3b82f6] transition-colors bg-[#041122]/50 backdrop-blur-sm">
                  <BarChart3 className="w-5 h-5 text-[#3b82f6]" />
               </div>
               <span className="font-bold text-[13px]">Risk</span>
               <span className="text-[10px] text-white/50 text-center mt-1 leading-tight">Assess &<br/>Prioritize</span>
            </div>
            <div className="mt-5 text-white/30 text-sm">→</div>

            <div className="flex flex-col items-center group">
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-3 group-hover:border-[#3b82f6] transition-colors bg-[#041122]/50 backdrop-blur-sm">
                  <Zap className="w-5 h-5 text-[#3b82f6]" />
               </div>
               <span className="font-bold text-[13px]">Action</span>
               <span className="text-[10px] text-white/50 text-center mt-1 leading-tight">Implement<br/>& Track</span>
            </div>
          </div>
          
          <div className="h-px w-16 bg-white/20 mb-6" />
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/70 leading-relaxed font-medium">
            COMPLIANT TODAY.<br/>A STRONGER TOMORROW.
          </p>
        </div>

        <div className="relative z-20 flex flex-col gap-4">
          <p className="text-[13px] font-medium text-white/90">Trusted by forward-thinking financial institutions.</p>
          <div className="flex gap-4 text-[10px] font-bold tracking-[0.15em] text-white/50 uppercase">
             <span>BANKING</span>
             <span className="text-white/20">|</span>
             <span>INSURANCE</span>
             <span className="text-white/20">|</span>
             <span>NBFC</span>
             <span className="text-white/20">|</span>
             <span>CAPITAL MARKETS</span>
          </div>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-between p-8 sm:p-12 relative bg-[#fafbfd]">
        <div className="flex justify-end">
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
            <Globe className="w-4 h-4" /> English (India)
          </button>
        </div>

        <div className="w-full max-w-[420px] mx-auto my-auto">
          <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 sm:p-10">
             <h2 className="text-[28px] font-bold text-[#0f172a] mb-2 tracking-tight">Welcome back</h2>
             <p className="text-slate-500 mb-8 text-[15px]">Sign in to your NIYAMAI workspace.</p>

             <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                   <label className="text-[13px] font-semibold text-slate-700">Work Email</label>
                   <div className="relative">
                      <Mail className="w-[18px] h-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                         type="email" 
                         defaultValue="aarav.sharma@aarohanbank.com"
                         className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-[14px] font-medium text-slate-900 bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                      />
                   </div>
                </div>

                <div className="space-y-1.5">
                   <label className="text-[13px] font-semibold text-slate-700">Password</label>
                   <div className="relative">
                      <Lock className="w-[18px] h-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                         type="password" 
                         defaultValue="password123"
                         className="w-full pl-11 pr-11 py-3 border border-slate-200 rounded-xl text-[14px] font-medium text-slate-900 bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all tracking-[0.2em]"
                      />
                      <button type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                         <EyeOff className="w-[18px] h-[18px]" />
                      </button>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                   <label className="flex items-center gap-2.5 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                         <input type="checkbox" defaultChecked className="peer w-4 h-4 rounded border-slate-300 text-[#0f5ff9] focus:ring-[#0f5ff9] cursor-pointer appearance-none checked:bg-[#0f5ff9] checked:border-[#0f5ff9] transition-colors" />
                         <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 14 10" fill="none">
                           <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                      </div>
                      <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
                   </label>
                   <a href="#" className="text-[13px] font-semibold text-[#0f5ff9] hover:underline">Forgot password?</a>
                </div>

                <Link href="/" className="block mt-2">
                   <button type="button" className="w-full py-3 bg-[#0f5ff9] hover:bg-blue-700 text-white rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow">
                      Sign In <ArrowRight className="w-4 h-4" />
                   </button>
                </Link>

                <div className="relative py-4">
                   <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                   </div>
                   <div className="relative flex justify-center text-[11px] font-bold tracking-widest">
                      <span className="px-3 bg-white text-slate-400">OR</span>
                   </div>
                </div>

                <Link href="/" className="block">
                   <button type="button" className="w-full py-3 bg-white border border-[#0f5ff9]/20 text-[#0f5ff9] rounded-xl font-bold text-[14px] flex items-center justify-center gap-2.5 hover:bg-[#0f5ff9]/5 transition-all">
                      <Building2 className="w-4 h-4" />
                      Continue with Enterprise SSO
                   </button>
                </Link>
             </form>

             <div className="mt-8 bg-[#f4f7fc] rounded-xl p-4 flex gap-3 border border-slate-100/50">
                <ShieldCheck className="w-[22px] h-[22px] text-[#0f5ff9] shrink-0 mt-0.5" />
                <div>
                   <p className="text-[13px] font-bold text-slate-900 mb-0.5">Secure. Compliant. Audit Logged.</p>
                   <p className="text-[12px] text-slate-500 leading-relaxed font-medium">Your access is protected with enterprise-grade security and full audit trails.</p>
                </div>
             </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-[12px] font-semibold text-slate-500 px-4">
          <div className="flex gap-6">
             <a href="#" className="hover:text-slate-900 transition-colors">Help</a>
             <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
             <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          </div>
          <div>© 2026 NIYAMAI. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
