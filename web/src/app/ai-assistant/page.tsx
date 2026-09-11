"use client";

import { ChevronRight, Save, Plus, FileText, BarChart2, Users, ListChecks, Sparkles, ExternalLink, CheckCircle2, RefreshCw, AlertTriangle, Calendar, Clock, Maximize2, MoreHorizontal, History, Paperclip, Send, FileCheck } from "lucide-react";
import Link from "next/link";

export default function AIAssistant() {
  return (
    <div className="flex h-full gap-6 text-[#0F172A] pb-10">
      
      {/* Left: Main Dashboard Area */}
      <div className="flex-1 flex flex-col space-y-6 min-w-0 overflow-y-auto pr-2 custom-scrollbar">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#0F172A] transition-colors">Home</Link>
          <span className="mx-1">›</span>
          <span className="text-[#0F172A]">AI Assistant</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight">AI Compliance Assistant</h1>
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-semibold">Beta</span>
            </div>
            <p className="text-slate-500 text-sm">Ask questions, get insights, and turn regulations into action.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-slate-300 text-[#2563EB] px-4 py-2 rounded text-sm font-medium hover:bg-slate-50 transition-colors bg-white">
              <Save className="w-4 h-4" /> Saved Insights (12)
            </button>
            <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
              <Sparkles className="w-4 h-4" /> New Chat
            </button>
          </div>
        </div>

        {/* Prompt Suggestions */}
        <div className="grid grid-cols-4 gap-4">
          <button className="bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-3 hover:border-[#2563EB] hover:shadow-sm transition-all text-left">
            <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-[#2563EB]" />
            </div>
            <span className="text-sm font-medium text-slate-700 leading-tight">"Summarize RBI KYC Amendment 2026"</span>
          </button>
          <button className="bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-3 hover:border-[#2563EB] hover:shadow-sm transition-all text-left">
            <div className="w-10 h-10 rounded bg-purple-50 flex items-center justify-center shrink-0">
              <BarChart2 className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-slate-700 leading-tight">"What are the key compliance impacts for our bank?"</span>
          </button>
          <button className="bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-3 hover:border-[#2563EB] hover:shadow-sm transition-all text-left">
            <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#2563EB]" />
            </div>
            <span className="text-sm font-medium text-slate-700 leading-tight">"Which departments are affected?"</span>
          </button>
          <button className="bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-3 hover:border-[#2563EB] hover:shadow-sm transition-all text-left">
            <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center shrink-0">
              <ListChecks className="w-5 h-5 text-[#2563EB]" />
            </div>
            <span className="text-sm font-medium text-slate-700 leading-tight">"Suggest action items with timelines"</span>
          </button>
        </div>

        {/* Main Content Split */}
        <div className="flex gap-6 items-start">
          
          {/* Document & Highlights (Left) */}
          <div className="flex-1 space-y-6">
            
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="p-5 flex items-center gap-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded bg-red-100 flex items-center justify-center shrink-0 text-red-600 font-bold text-xs border border-red-200">
                  PDF
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">RBI KYC Master Direction 2026</h2>
                  <p className="text-sm text-slate-500 mt-1">Uploaded on 20 Aug 2026 &nbsp;&bull;&nbsp; 42 pages &nbsp;&bull;&nbsp; English</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-200 px-5">
                <button className="px-4 py-3 text-sm font-bold border-b-2 border-[#2563EB] text-[#2563EB]">Summary</button>
                <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">Key Changes</button>
                <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">Obligations (38)</button>
                <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">Impact Analysis</button>
                <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">Related Policies</button>
              </div>

              <div className="p-5 space-y-6">
                {/* AI Summary */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-purple-700 font-bold text-sm bg-purple-100 px-2.5 py-1 rounded">
                      <Sparkles className="w-4 h-4" /> AI Generated Summary
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded">
                      <Clock className="w-3.5 h-3.5" /> Confidence: 94%
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    The RBI KYC Master Direction (2026) introduces enhanced customer due diligence requirements, especially for higher risk customers. It mandates additional verification steps, periodic review of customer accounts, and stricter monitoring of transactions. The regulation aims to strengthen AML/CFT measures and reduce financial crime risks in the banking sector.
                  </p>
                </div>

                {/* Key Highlights */}
                <div>
                  <h3 className="font-bold text-[#0F172A] mb-4 text-lg">Key Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm leading-relaxed pt-1.5">Enhanced due diligence for higher risk customers (PEPs, non-face-to-face)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Users className="w-4 h-4 text-[#2563EB]" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm leading-relaxed pt-1.5">Additional verification requirements for customer identity and source of funds</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                        <RefreshCw className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm leading-relaxed pt-1.5">Periodic review of customer accounts based on risk profile</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm leading-relaxed pt-1.5">New record keeping and reporting requirements</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm leading-relaxed pt-1.5">Stricter transaction monitoring for unusual activities</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm leading-relaxed pt-1.5">Effective from 01 October 2026</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Details & Insights (Right Main) */}
          <div className="w-[340px] shrink-0 space-y-6">
            
            {/* Regulation Details */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#0F172A] text-lg">Regulation Details</h3>
                <button className="flex items-center gap-1.5 border border-[#2563EB] text-[#2563EB] px-2.5 py-1 rounded text-xs font-medium hover:bg-blue-50 transition-colors">
                  View Original <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <span className="w-32 text-slate-500 shrink-0">Issuer</span>
                  <span className="font-medium text-[#0F172A]">Reserve Bank of India</span>
                </div>
                <div className="flex items-start">
                  <span className="w-32 text-slate-500 shrink-0">Document Type</span>
                  <span className="font-medium text-[#0F172A]">Master Direction</span>
                </div>
                <div className="flex items-start">
                  <span className="w-32 text-slate-500 shrink-0">Reference No.</span>
                  <span className="font-medium text-[#0F172A]">RBI/2026-27/45</span>
                </div>
                <div className="flex items-start">
                  <span className="w-32 text-slate-500 shrink-0">Publish Date</span>
                  <span className="font-medium text-[#0F172A]">20 Aug 2026</span>
                </div>
                <div className="flex items-start">
                  <span className="w-32 text-slate-500 shrink-0">Effective Date</span>
                  <span className="font-medium text-[#0F172A]">01 Oct 2026</span>
                </div>
                <div className="flex items-start">
                  <span className="w-32 text-slate-500 shrink-0">Pages</span>
                  <span className="font-medium text-[#0F172A]">42</span>
                </div>
                <div className="flex items-start">
                  <span className="w-32 text-slate-500 shrink-0">Language</span>
                  <span className="font-medium text-[#0F172A]">English</span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5">
              <h3 className="font-bold text-[#0F172A] text-lg mb-4">AI Insights</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-100 bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center mb-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-[#0F172A]">38</span>
                  <span className="text-xs text-slate-500 font-medium">Obligations<br/>Identified</span>
                </div>
                <div className="border border-slate-100 bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded bg-red-100 flex items-center justify-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-2xl font-bold text-[#0F172A]">12</span>
                  <span className="text-xs text-slate-500 font-medium">Compliance<br/>Gaps</span>
                </div>
                <div className="border border-slate-100 bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <span className="text-2xl font-bold text-[#0F172A]">6</span>
                  <span className="text-xs text-slate-500 font-medium">Departments<br/>Affected</span>
                </div>
                <div className="border border-slate-100 bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold text-[#0F172A]">21</span>
                  <span className="text-xs text-slate-500 font-medium">Recommended<br/>Actions</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5">
              <h3 className="font-bold text-[#0F172A] text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-2 border border-[#2563EB] text-[#2563EB] px-3 py-2.5 rounded font-medium text-xs justify-center hover:bg-blue-50 transition-colors">
                  <BarChart2 className="w-4 h-4 shrink-0" /> View Impact Analysis
                </button>
                <button className="flex items-center gap-2 border border-[#2563EB] text-[#2563EB] px-3 py-2.5 rounded font-medium text-xs justify-center hover:bg-blue-50 transition-colors">
                  <ListChecks className="w-4 h-4 shrink-0" /> Create Action Plan
                </button>
                <button className="flex items-center gap-2 border border-[#2563EB] text-[#2563EB] px-3 py-2.5 rounded font-medium text-xs justify-center hover:bg-blue-50 transition-colors">
                  <Link href="#" className="flex items-center gap-2"><FileCheck className="w-4 h-4 shrink-0" /> Map to Internal Policies</Link>
                </button>
                <button className="flex items-center gap-2 border border-[#2563EB] text-[#2563EB] px-3 py-2.5 rounded font-medium text-xs justify-center hover:bg-blue-50 transition-colors">
                  <Save className="w-4 h-4 shrink-0" /> Export Report
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Rightmost: Chat Panel */}
      <div className="w-[380px] shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#0F172A] text-sm leading-tight">NiyamAI Assistant</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-slate-500 font-medium">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><History className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><Maximize2 className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white">
          
          {/* AI Message */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-1">
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-700 leading-relaxed shadow-sm">
                <p className="mb-3">Hello! I'm NiyamAI, your regulatory compliance assistant.</p>
                <p className="mb-2">I can help you:</p>
                <ul className="list-disc pl-5 space-y-1.5 mb-3">
                  <li>Summarize regulations</li>
                  <li>Identify key obligations</li>
                  <li>Analyze compliance impacts</li>
                  <li>Suggest action items</li>
                  <li>Answer your compliance questions</li>
                </ul>
                <p>How can I help you today?</p>
              </div>
              <p className="text-[10px] text-slate-400 font-medium ml-1">01:24 PM</p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-3 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0 mt-1 font-bold text-sm">
              U
            </div>
            <div className="flex-1 min-w-0 space-y-1.5 flex flex-col items-end">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl rounded-tr-sm p-4 text-sm text-[#0F172A] leading-relaxed shadow-sm">
                What are the main changes in the RBI KYC Amendment 2026?
              </div>
              <p className="text-[10px] text-slate-400 font-medium mr-1">01:25 PM</p>
            </div>
          </div>

          {/* AI Message */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-1">
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-700 leading-relaxed shadow-sm">
                <p className="mb-3">Here are the main changes in the RBI KYC Amendment 2026:</p>
                <div className="space-y-3">
                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full border border-[#2563EB] text-[#2563EB] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">1</span>
                    <p>Enhanced due diligence for higher risk customers (PEPs, non-face-to-face)</p>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full border border-[#2563EB] text-[#2563EB] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">2</span>
                    <p>Additional verification of source of funds and wealth</p>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full border border-[#2563EB] text-[#2563EB] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">3</span>
                    <p>Periodic review of customer accounts based on risk profile</p>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full border border-[#2563EB] text-[#2563EB] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">4</span>
                    <p>Stricter transaction monitoring requirements</p>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full border border-[#2563EB] text-[#2563EB] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">5</span>
                    <p>Updated record keeping and reporting obligations</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-2 ml-1">
                <button className="border border-[#2563EB] text-[#2563EB] px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-50 transition-colors">Show more details</button>
                <button className="border border-[#2563EB] text-[#2563EB] px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-50 transition-colors">Create action items</button>
              </div>
              <p className="text-[10px] text-slate-400 font-medium ml-1 mt-1">01:25 PM</p>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="relative flex items-center">
            <button className="absolute left-3 text-slate-400 hover:text-slate-600 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <input 
              type="text" 
              placeholder="Ask a follow-up question..." 
              className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#2563EB] bg-slate-50/50"
            />
            <button className="absolute right-2 w-8 h-8 rounded-md bg-[#2563EB] text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            NiyamAI may make mistakes. Please verify critical information.
          </p>
        </div>

      </div>
    </div>
  );
}
