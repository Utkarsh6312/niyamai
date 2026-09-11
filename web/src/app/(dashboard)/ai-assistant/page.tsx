
"use client";

import { ChevronRight, Save, Plus, FileText, BarChart2, Users, ListChecks, Sparkles, ExternalLink, CheckCircle2, RefreshCw, AlertTriangle, Calendar, Clock, Maximize2, MoreHorizontal, History, Paperclip, Send, FileCheck } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect, type ReactNode } from "react";

type Message = {
  id: string | number;
  role: "assistant" | "user";
  content: ReactNode;
  time: string;
};

export default function AIAssistant() {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: (
        <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
          <p className="mb-2.5 font-medium">Hello! I'm NiyamAI, your regulatory compliance assistant.</p>
          <p className="mb-1.5 font-medium">I can help you:</p>
          <ul className="list-disc pl-4 space-y-1 mb-2.5">
            <li>Summarize regulations</li>
            <li>Identify key obligations</li>
            <li>Analyze compliance impacts</li>
            <li>Suggest action items</li>
            <li>Answer your compliance questions</li>
          </ul>
          <p className="font-medium">How can I help you today?</p>
        </div>
      ),
      time: "01:24 PM",
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      time: new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"}),
      content: messageText
    };
    
    setMessages(prev => [...prev, userMsg]);
    if (!text) setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let responseContent: ReactNode;
      const lowerInput = userMsg.content?.toString().toLowerCase() || "";

      if (lowerInput.includes("rbi") || lowerInput.includes("amendment") || lowerInput.includes("kyc")) {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="mb-3 font-medium">Here are the main changes in the RBI KYC Amendment 2026:</p>
            <div className="space-y-3">
              {[
                "Enhanced due diligence for higher risk customers (PEPs, non-face-to-face)",
                "Additional verification of source of funds and wealth",
                "Periodic review of customer accounts based on risk profile",
                "Stricter transaction monitoring requirements",
                "Updated record keeping and reporting obligations",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-5 h-5 rounded-full border border-[#2563EB] text-[#2563EB] flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">{i + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        );
      } else if (lowerInput.includes("impacts") || lowerInput.includes("bank")) {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="mb-3 font-medium">Based on the latest regulatory analysis, the key compliance impacts for Aarohan Bank are:</p>
            <ul className="list-disc pl-4 space-y-2 mb-2 text-red-600 font-medium">
              <li><span className="text-slate-700 font-normal"><strong>Critical:</strong> Immediate overhaul required for digital onboarding (biometric liveness checks).</span></li>
              <li><span className="text-slate-700 font-normal"><strong>High:</strong> Updates needed to the transaction monitoring systems to track politically exposed persons (PEPs) in real-time.</span></li>
              <li><span className="text-slate-700 font-normal"><strong>Medium:</strong> Periodic review cycles for medium-risk accounts must be shortened from 8 years to 5 years.</span></li>
            </ul>
            <p className="mt-3 text-slate-500">Would you like me to map these impacts to our internal policy documents?</p>
          </div>
        );
      } else if (lowerInput.includes("departments") || lowerInput.includes("affected")) {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="mb-3 font-medium">The following departments are primarily affected by recent amendments:</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="font-semibold text-[#0F172A]">Retail Banking</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red/10 text-red">High Impact</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="font-semibold text-[#0F172A]">Compliance & Risk</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red/10 text-red">High Impact</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="font-semibold text-[#0F172A]">IT / Digital Channels</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-600">Medium Impact</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="font-semibold text-[#0F172A]">Legal</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal/10 text-teal">Low Impact</span>
              </div>
            </div>
          </div>
        );
      } else if (lowerInput.includes("action") || lowerInput.includes("timelines")) {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="mb-3 font-medium">I have generated the following recommended action items and timelines:</p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-2 font-semibold text-slate-600">Action Item</th>
                    <th className="p-2 font-semibold text-slate-600">Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2">Update KYC SOP Section 3.2 for biometric liveness</td>
                    <td className="p-2 font-semibold text-red">30 Days</td>
                  </tr>
                  <tr>
                    <td className="p-2">Implement automated PEP database screening</td>
                    <td className="p-2 font-semibold text-orange-600">60 Days</td>
                  </tr>
                  <tr>
                    <td className="p-2">Conduct compliance training for retail staff</td>
                    <td className="p-2 font-semibold text-slate-600">90 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="bg-[#2563EB] text-white px-3 py-1.5 rounded-md text-[11px] font-semibold hover:bg-blue-700 transition-colors">Assign Actions</button>
            </div>
          </div>
        );
      } else {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="font-medium">I have analyzed your request regarding "{userMsg.content}". Based on our policy library and current regulations, I recommend reviewing the compliance mapping for this area to ensure full adherence.</p>
          </div>
        );
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        time: new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"}),
        content: responseContent
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
return (
    <div className="flex h-full gap-5 text-[#0F172A] pb-10">
      
      {/* Left: Main Dashboard Area */}
      <div className="flex-1 flex flex-col space-y-5 min-w-0 overflow-y-auto pr-1 custom-scrollbar">
        
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
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[11px] font-bold">Beta</span>
            </div>
            <p className="text-slate-500 text-sm">Ask questions, get insights, and turn regulations into action.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-[#2563EB]/30 text-[#2563EB] px-4 py-2 rounded text-sm font-medium hover:bg-blue-50 transition-colors bg-white">
              <Save className="w-4 h-4" /> Saved Insights (12)
            </button>
            <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
              <Sparkles className="w-4 h-4" /> New Chat
            </button>
          </div>
        </div>

        {/* Prompt Suggestions */}
        <div className="grid grid-cols-4 gap-4">
          <button onClick={() => handleSend(`Summarize RBI KYC Amendment 2026`)} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 hover:border-[#2563EB] hover:shadow-sm transition-all text-left group">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
              <FileText className="w-5 h-5 text-[#2563EB]" />
            </div>
            <span className="text-sm font-medium text-slate-700 leading-tight">"Summarize RBI KYC Amendment 2026"</span>
          </button>
          <button onClick={() => handleSend(`What are the key compliance impacts for our bank?`)} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 hover:border-[#2563EB] hover:shadow-sm transition-all text-left group">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
              <BarChart2 className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-slate-700 leading-tight">"What are the key compliance impacts for our bank?"</span>
          </button>
          <button onClick={() => handleSend(`Which departments are affected?`)} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 hover:border-[#2563EB] hover:shadow-sm transition-all text-left group">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
              <Users className="w-5 h-5 text-[#2563EB]" />
            </div>
            <span className="text-sm font-medium text-slate-700 leading-tight">"Which departments are affected?"</span>
          </button>
          <button onClick={() => handleSend(`Suggest action items with timelines`)} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 hover:border-[#2563EB] hover:shadow-sm transition-all text-left group">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
              <ListChecks className="w-5 h-5 text-[#2563EB]" />
            </div>
            <span className="text-sm font-medium text-slate-700 leading-tight">"Suggest action items with timelines"</span>
          </button>
        </div>

        {/* Main Content Split */}
        <div className="flex gap-5 items-start">
          
          {/* Document & Highlights (Left) */}
          <div className="flex-1 space-y-5">
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-[#ef4444] flex flex-col items-center justify-center shrink-0 text-white font-bold shadow-sm">
                  <span className="text-[10px] leading-none mb-0.5 mt-1">PDF</span>
                  <FileText className="w-4 h-4 opacity-80" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A]">RBI KYC Master Direction 2026</h2>
                  <p className="text-xs text-slate-500 mt-1">Uploaded on 20 Aug 2026 &nbsp;&bull;&nbsp; 42 pages &nbsp;&bull;&nbsp; English</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-200 px-2">
                <button className="px-4 py-3 text-sm font-bold border-b-2 border-[#2563EB] text-[#2563EB]">Summary</button>
                <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">Key Changes</button>
                <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">Obligations (38)</button>
                <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">Impact Analysis</button>
                <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">Related Policies</button>
              </div>

              <div className="p-5 space-y-6">
                {/* AI Summary */}
                <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs bg-purple-100/80 px-2.5 py-1 rounded-md">
                      <Sparkles className="w-3.5 h-3.5" /> AI Generated Summary
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100/80 px-2.5 py-1 rounded-md">
                      <Clock className="w-3 h-3" /> Confidence: 94%
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    The RBI KYC Master Direction (2026) introduces enhanced customer due diligence requirements, especially for higher risk customers. It mandates additional verification steps, periodic review of customer accounts, and stricter monitoring of transactions. The regulation aims to strengthen AML/CFT measures and reduce financial crime risks in the banking sector.
                  </p>
                </div>

                {/* Key Highlights */}
                <div>
                  <h3 className="font-bold text-[#0F172A] mb-4 text-base">Key Highlights</h3>
                  <div className="space-y-3.5">
                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-slate-600 font-medium text-sm pt-1">Enhanced due diligence for higher risk customers (PEPs, non-face-to-face)</span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4 text-[#2563EB]" />
                      </div>
                      <span className="text-slate-600 font-medium text-sm pt-1">Additional verification requirements for customer identity and source of funds</span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                        <RefreshCw className="w-4 h-4 text-orange-500" />
                      </div>
                      <span className="text-slate-600 font-medium text-sm pt-1">Periodic review of customer accounts based on risk profile</span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-slate-600 font-medium text-sm pt-1">New record keeping and reporting requirements</span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-slate-600 font-medium text-sm pt-1">Stricter transaction monitoring for unusual activities</span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="text-slate-600 font-medium text-sm pt-1">Effective from 01 October 2026</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Details & Insights (Right Main) */}
          <div className="w-[320px] shrink-0 space-y-5">
            
            {/* Regulation Details */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#0F172A] text-base">Regulation Details</h3>
                <button className="flex items-center gap-1.5 border border-[#2563EB]/40 text-[#2563EB] px-2 py-1 rounded-md text-[11px] font-semibold hover:bg-blue-50 transition-colors">
                  View Original <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3.5 text-xs">
                <div className="flex items-start">
                  <span className="w-28 text-slate-400 font-medium shrink-0">Issuer</span>
                  <span className="font-semibold text-[#0F172A]">Reserve Bank of India</span>
                </div>
                <div className="flex items-start">
                  <span className="w-28 text-slate-400 font-medium shrink-0">Document Type</span>
                  <span className="font-semibold text-[#0F172A]">Master Direction</span>
                </div>
                <div className="flex items-start">
                  <span className="w-28 text-slate-400 font-medium shrink-0">Reference No.</span>
                  <span className="font-semibold text-[#0F172A]">RBI/2026-27/45</span>
                </div>
                <div className="flex items-start">
                  <span className="w-28 text-slate-400 font-medium shrink-0">Publish Date</span>
                  <span className="font-semibold text-[#0F172A]">20 Aug 2026</span>
                </div>
                <div className="flex items-start">
                  <span className="w-28 text-slate-400 font-medium shrink-0">Effective Date</span>
                  <span className="font-semibold text-[#0F172A]">01 Oct 2026</span>
                </div>
                <div className="flex items-start">
                  <span className="w-28 text-slate-400 font-medium shrink-0">Pages</span>
                  <span className="font-semibold text-[#0F172A]">42</span>
                </div>
                <div className="flex items-start">
                  <span className="w-28 text-slate-400 font-medium shrink-0">Language</span>
                  <span className="font-semibold text-[#0F172A]">English</span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-[#0F172A] text-base mb-4">AI Insights</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-slate-100 bg-slate-50/50 p-3 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#0F172A] leading-tight">38</div>
                    <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">Obligations<br/>Identified</div>
                  </div>
                </div>
                <div className="border border-slate-100 bg-slate-50/50 p-3 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#0F172A] leading-tight">12</div>
                    <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">Compliance<br/>Gaps</div>
                  </div>
                </div>
                <div className="border border-slate-100 bg-slate-50/50 p-3 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#0F172A] leading-tight">6</div>
                    <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">Departments<br/>Affected</div>
                  </div>
                </div>
                <div className="border border-slate-100 bg-slate-50/50 p-3 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#0F172A] leading-tight">21</div>
                    <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">Recommended<br/>Actions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-[#0F172A] text-base mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2.5">
                <button className="flex items-center gap-2 border border-[#2563EB]/40 text-[#2563EB] px-2 py-2 rounded-lg font-semibold text-[11px] hover:bg-blue-50 transition-colors">
                  <BarChart2 className="w-3.5 h-3.5 shrink-0" /> View Impact Analysis
                </button>
                <button className="flex items-center gap-2 border border-[#2563EB]/40 text-[#2563EB] px-2 py-2 rounded-lg font-semibold text-[11px] hover:bg-blue-50 transition-colors">
                  <ListChecks className="w-3.5 h-3.5 shrink-0" /> Create Action Plan
                </button>
                <button className="flex items-center gap-2 border border-[#2563EB]/40 text-[#2563EB] px-2 py-2 rounded-lg font-semibold text-[11px] hover:bg-blue-50 transition-colors">
                  <FileCheck className="w-3.5 h-3.5 shrink-0" /> Map to Policies
                </button>
                <button className="flex items-center gap-2 border border-[#2563EB]/40 text-[#2563EB] px-2 py-2 rounded-lg font-semibold text-[11px] hover:bg-blue-50 transition-colors">
                  <Save className="w-3.5 h-3.5 shrink-0" /> Export Report
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Rightmost: Chat Panel */}
      <div className="w-[360px] shrink-0 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden h-full">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#0F172A] text-sm leading-tight">NiyamAI Assistant</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[10px] text-slate-500 font-semibold">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <button className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"><History className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"><Maximize2 className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {msg.role === "assistant" ? (
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                  U
                </div>
              )}
              
              <div className={`flex-1 min-w-0 space-y-1.5 ${msg.role === "user" ? "flex flex-col items-end" : ""}`}>
                {msg.role === "user" ? (
                  <div className="bg-[#EBF3FF] rounded-2xl rounded-tr-sm p-3.5 text-[13px] text-[#0F172A] font-medium leading-relaxed max-w-[90%]">
                    {msg.content}
                  </div>
                ) : (
                  msg.content
                )}
                <p className={`text-[9px] text-slate-400 font-semibold ${msg.role === "user" ? "mr-1" : "ml-1"} mt-1.5`}>{msg.time}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
             <div className="flex gap-3">
               <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-1">
                 <Sparkles className="w-3.5 h-3.5 text-purple-600" />
               </div>
               <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-1.5 w-fit">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
               </div>
             </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="relative flex items-center">
            <button className="absolute left-3 text-slate-400 hover:text-slate-600 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a follow-up question..." 
              className="w-full pl-9 pr-11 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#2563EB] bg-white placeholder:text-slate-400"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-1.5 w-7 h-7 rounded-md bg-[#2563EB] text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
          <p className="text-center text-[9px] text-slate-400 font-medium mt-2.5">
            NiyamAI may make mistakes. Please verify critical information.
          </p>
        </div>
      </div>
    </div>
  );
}
