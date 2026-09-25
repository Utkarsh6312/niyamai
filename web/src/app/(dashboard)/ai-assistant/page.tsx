
"use client";

import { ChevronRight, Save, Plus, FileText, BarChart2, Users, ListChecks, Sparkles, ExternalLink, CheckCircle2, RefreshCw, AlertTriangle, Calendar, Clock, Maximize2, MoreHorizontal, History, Paperclip, Send, FileCheck } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string | number;
  role: "assistant" | "user";
  content: ReactNode;
  time: string;
};

export default function AIAssistant() {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("Summary");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: (
        <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
          <p className="mb-2.5 font-medium">Hello! I'm NiyamAI, the core intelligence engine for Aarohan Bank's Regulatory Dashboard.</p>
          <p className="mb-1.5 font-medium">I have full context of our platform and can help you:</p>
          <ul className="list-disc pl-4 space-y-1 mb-2.5">
            <li>Summarize RBI circulars from the Regulatory Feed</li>
            <li>Analyze Policy Impacts and trace obligations</li>
            <li>Track progress in the Action Center</li>
            <li>Map requirements across Risk, KYC, InfoSec, and other departments</li>
          </ul>
          <p className="font-medium">How can I assist your compliance workflows today?</p>
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

  const handleSend = async (text?: string) => {
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

    try {
      // Format previous conversation context
      const apiMessages = messages.map(m => ({
        role: m.role,
        content: typeof m.content === 'string' ? m.content : (m.role === 'assistant' ? 'Previous assistant response' : '')
      })).concat({ role: "user", content: messageText });
      
      const formattedPrompt = apiMessages.map(m => `${m.role === 'assistant' ? 'Assistant' : 'User'}: ${m.content}`).join('\n') + '\nAssistant:';

      const lowerPrompt = messageText.toLowerCase();
      let responseText = "";

      try {
        // Call our secure backend API route
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: formattedPrompt }),
        });

        if (response.ok) {
          const data = await response.json();
          responseText = data.output;
        } else {
          console.warn("Backend API returned an error, falling back to mock output.");
        }
      } catch (e) {
        console.warn("Fetch to /api/chat failed, falling back to mock output.", e);
      }

      if (!responseText) {
        // Fallback to advanced Mock AI
        await new Promise(resolve => setTimeout(resolve, 1500));
        let mockOutput = "I am currently running in offline mock mode because the Fal AI API call failed. To enable live AI responses, please make sure your `FAL_KEY` is set in the `.env.local` file.";
        
        if (lowerPrompt === "hello" || lowerPrompt === "hi" || lowerPrompt === "hey") {
           mockOutput = "Hello! I am NiyamAI. How can I assist you with your compliance workflows today?";
        } else if (lowerPrompt.includes("my name is") || lowerPrompt.includes("i am") || lowerPrompt.includes("i'm")) {
          let userName = "";
          if (lowerPrompt.includes("my name is")) {
             userName = messageText.toLowerCase().split("my name is")[1].trim().split(" ")[0];
          } else if (lowerPrompt.includes("i am")) {
             userName = messageText.toLowerCase().split("i am")[1].trim().split(" ")[0];
          } else if (lowerPrompt.includes("i'm")) {
             userName = messageText.toLowerCase().split("i'm")[1].trim().split(" ")[0];
          }
          userName = userName.replace(/[^a-zA-Z]/g, '');
          if (userName) userName = userName.charAt(0).toUpperCase() + userName.slice(1);
          mockOutput = `Nice to meet you, ${userName}! How can I help you with your compliance tasks today?`;
        } else if (lowerPrompt.includes("v-cip") || lowerPrompt.includes("video") || lowerPrompt.includes("remote")) {
           mockOutput = "**V-CIP (Video based Customer Identification Process) Guidelines (Based on RBI KYC Master Direction):**\n\n1. **Infrastructure**: Must be housed in RE\'s own premises/secured network. End-to-end encryption required.\n2. **Checks**: Must include live GPS geo-tagging, date-time stamp, and face liveness/spoof detection.\n3. **Procedure**: Requires clear audio-video, Aadhaar offline/OTP verification. Disruption/pausing shouldn\'t create multiple files.\n4. **Audit**: Accounts opened via V-CIP are operational only after concurrent audit.";
        } else if (lowerPrompt.includes("market risk") || lowerPrompt.includes("capital charge") || lowerPrompt.includes("rwa")) {
           mockOutput = "**Market Risk Capital Requirements (Based on RBI 2026 Directions):**\n\n- **Specific Risk**: Central Govt (0%), State Govt (0.25% - 1.6% based on maturity), Equity Risk (9%).\n- **Foreign Exchange Risk**: 9% capital charge on the overall Net Open Position (NOP). Includes gold.\n- **Internal Risk Transfers**: Hedges from banking book to trading book only recognized if matched exactly with an external third-party hedge.";
        } else if (lowerPrompt.includes("trading book") || lowerPrompt.includes("banking book") || lowerPrompt.includes("reclassify")) {
           mockOutput = "**Boundary between Banking Book and Trading Book:**\n\n- **Trading Book**: Includes \'Held for Trading\' (HFT) instruments.\n- **Reclassification**: Strictly restricted. Cannot be done for regulatory arbitrage. If reclassification reduces capital requirement, the difference must be maintained as a disclosed Pillar 1 capital surcharge.";
        } else if (lowerPrompt.includes("periodic") || lowerPrompt.includes("updation")) {
           mockOutput = "**Periodic Updation of KYC:**\n\n- **High Risk**: At least once in every 2 years.\n- **Medium Risk**: At least once in every 8 years.\n- **Low Risk**: At least once in every 10 years.\n\n*Note*: For low-risk individuals with no change in info, a self-declaration via email/SMS/ATM is sufficient.";
        } else if (lowerPrompt.includes("small account")) {
           mockOutput = "**Small Account Limitations:**\n\n- Aggregate credits in a financial year cannot exceed ₹1 lakh.\n- Aggregate withdrawals/transfers cannot exceed ₹10,000 per month.\n- Balance at any point cannot exceed ₹50,000.\n*Exemptions apply for Government grants/welfare benefits.*";
        } else if (lowerPrompt.includes("wire transfer") || lowerPrompt.includes("cross border")) {
           mockOutput = "**Wire Transfer KYC Requirements:**\n\n- **Cross-border**: Must always be accompanied by accurate originator and beneficiary information.\n- **Domestic**: If ₹50,000 and above for a non-account holder, must include full originator and beneficiary details.";
        } else if (lowerPrompt.includes("foreign exchange") || lowerPrompt.includes("forex") || lowerPrompt.includes("net open position") || lowerPrompt.includes("nop")) {
           mockOutput = "**Foreign Exchange Risk & Net Open Position (NOP):**\n\n- Capital requirement is 9% of the overall NOP.\n- **Structural Exemption**: REs can exclude certain structural foreign currency investments (like overseas branches/subsidiaries) from NOP to neutralize capital ratio sensitivity, provided it\'s held for at least 6 months.";
        } else if (lowerPrompt.includes("summarize") || lowerPrompt.includes("summary") || lowerPrompt.includes("teach") || lowerPrompt.includes("analyze")) {
           mockOutput = "**Summary of Recent RBI Circulars:**\n\n**1. KYC Master Direction (Updated Aug 2025)**: Mandates strict V-CIP infrastructure (liveness checks, geo-tagging), defines periodic updation timelines (2/8/10 years based on risk), and sets strict wire transfer reporting rules.\n\n**2. Market Risk Capital Requirements (Sep 2026)**: Establishes a firm boundary between Trading and Banking books, sets 9% capital charge for forex/equity risk, and details treatment for internal risk transfers and options (Delta-plus/Scenario approaches).";
        } else if (lowerPrompt.includes("action") || lowerPrompt.includes("suggest") || lowerPrompt.includes("timeline")) {
           mockOutput = "**Suggested Action Items for Aarohan Bank:**\n\n1. **Policy Update (KYC)**: Integrate new V-CIP geo-tagging and liveness check requirements into Customer Acceptance Policy (Due: Next Board Meeting).\n2. **IT Infrastructure**: Upgrade video verification servers to ensure end-to-end encryption and prevent spoofed IPs (Due: Q3).\n3. **Risk Management**: Recalculate Net Open Position (NOP) for forex to include 9% capital charge and identify structural exemptions (Due: Immediate).";
        } else if (lowerPrompt.includes("impact") && !lowerPrompt.includes("department") && !lowerPrompt.includes("affected")) {
           mockOutput = "**Key Compliance Impacts:**\n\n1. **Capital Requirements**: Increased capital charge (9%) on forex and equity positions.\n2. **KYC & Onboarding**: Mandatory integration of liveness checks and geo-tagging for V-CIP.\n3. **Data Localization**: Stricter audit trails and localized servers for video KYC records.\n4. **Account Limitations**: Caps enforced on 'Small Accounts' (e.g. ₹50k balance limit).";
        } else if (lowerPrompt.includes("affected") || lowerPrompt.includes("department")) {
           mockOutput = "**Departmental Impact Analysis:**\n\n- **Compliance & Operations**: High Impact. Must implement new V-CIP audit trails and monitor Small Account limits (₹1L credit/₹50k balance).\n- **Risk Management**: High Impact. Must adjust capital calculations for Trading Book reclassifications and apply 9% charge to Equity/Forex NOP.\n- **IT & Cybersecurity**: High Impact. Required to secure V-CIP infrastructure and ensure data localization.";
        }
        responseText = mockOutput;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        time: new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"}),
        content: (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm whitespace-pre-wrap markdown-body">
            <ReactMarkdown>{responseText}</ReactMarkdown>
          </div>
        )
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error calling Fal API:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        time: new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"}),
        content: (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-red-600 leading-relaxed shadow-sm">
            Sorry, there was a network error processing your request. Please check the console.
          </div>
        )
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
return (
    <div className="flex flex-col xl:flex-row h-full gap-5 text-[#0F172A] pb-10">
      
      {/* Left: Main Dashboard Area */}
      <div className="flex-1 flex flex-col space-y-5 min-w-0 overflow-y-auto pr-1 custom-scrollbar">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#0F172A] transition-colors">Home</Link>
          <span className="mx-1">›</span>
          <span className="text-[#0F172A]">AI Assistant</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          
          {/* Document & Highlights (Left) */}
          <div className="flex-1 min-w-0 space-y-5">
            
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
              <div className="flex border-b border-slate-200 px-2 overflow-x-auto whitespace-nowrap custom-scrollbar">
                {["Summary", "Key Changes", "Obligations (38)", "Impact Analysis", "Related Policies"].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm transition-colors ${
                      activeTab === tab 
                        ? 'font-bold border-b-2 border-[#2563EB] text-[#2563EB]' 
                        : 'font-medium text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-5 space-y-6">
                {activeTab === "Summary" && (
                  <>
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
                  </>
                )}

                {activeTab === "Key Changes" && (
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 text-sm text-slate-700 space-y-4">
                    <h3 className="font-bold text-[#0F172A] text-base">Major Regulatory Shifts</h3>
                    <ul className="list-disc pl-5 space-y-3">
                      <li><strong>V-CIP Infrastructure:</strong> New mandate to completely house Video-KYC infrastructure within the RE's own premises/secured network.</li>
                      <li><strong>Periodic Updation:</strong> Timeframes tightened. High-risk customers must be updated every 2 years, medium every 8 years, and low every 10 years.</li>
                      <li><strong>Wire Transfers:</strong> Cross-border transactions require exact beneficiary and originator details. Domestic transfers above ₹50,000 for non-account holders now fall under strict KYC reporting.</li>
                    </ul>
                  </div>
                )}

                {activeTab === "Obligations (38)" && (
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 text-sm text-slate-700">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-[#0F172A] text-base">Extracted Obligations</h3>
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">38 Total</span>
                    </div>
                    <p className="mb-4 text-slate-500">Our AI has extracted 38 distinct obligations from this circular. Here are the top 3 highest priority:</p>
                    <div className="space-y-3">
                      <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded uppercase">High</span>
                          <span className="text-xs font-semibold text-slate-500">OB-102</span>
                        </div>
                        <p className="font-medium text-slate-700">Integrate V-CIP geo-tagging and liveness check requirements into Customer Acceptance Policy.</p>
                      </div>
                      <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded uppercase">High</span>
                          <span className="text-xs font-semibold text-slate-500">OB-108</span>
                        </div>
                        <p className="font-medium text-slate-700">Implement continuous monitoring and strict screening for Politically Exposed Persons (PEPs).</p>
                      </div>
                      <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded uppercase">Medium</span>
                          <span className="text-xs font-semibold text-slate-500">OB-121</span>
                        </div>
                        <p className="font-medium text-slate-700">Conduct annual refresher training for all frontline staff on updated AML risks.</p>
                      </div>
                    </div>
                    <Link href="/obligation-explorer" className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-[#2563EB] font-bold text-xs hover:bg-blue-50 transition-colors flex items-center justify-center">
                      View All 38 Obligations
                    </Link>
                  </div>
                )}

                {activeTab === "Impact Analysis" && (
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 text-sm text-slate-700">
                     <h3 className="font-bold text-[#0F172A] mb-4 text-base">Departmental Impact</h3>
                     <div className="space-y-4">
                       <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                         <div className="flex items-center justify-between mb-1">
                           <h4 className="font-bold text-[#2563EB]">Retail & Operations</h4>
                           <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded uppercase">High</span>
                         </div>
                         <p className="text-xs text-slate-500">High impact on account opening workflows. Requires major UI/UX updates for V-CIP integration and strict Small Account tracking limits.</p>
                       </div>
                       <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                         <div className="flex items-center justify-between mb-1">
                           <h4 className="font-bold text-[#2563EB]">Compliance & Audit</h4>
                           <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded uppercase">Medium</span>
                         </div>
                         <p className="text-xs text-slate-500">Need to revise the AML policy manual and set up concurrent audits for all accounts opened via V-CIP.</p>
                       </div>
                       <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                         <div className="flex items-center justify-between mb-1">
                           <h4 className="font-bold text-[#2563EB]">IT & Cyber Security</h4>
                           <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded uppercase">High</span>
                         </div>
                         <p className="text-xs text-slate-500">Must ensure end-to-end encryption of the V-CIP infrastructure and verify compliance with data localization directives.</p>
                       </div>
                     </div>
                  </div>
                )}

                {activeTab === "Related Policies" && (
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 text-sm text-slate-700">
                     <h3 className="font-bold text-[#0F172A] mb-4 text-base">Internal Mapped Policies</h3>
                     <ul className="space-y-2.5">
                       <li className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300 cursor-pointer transition-colors">
                         <div className="flex items-center gap-2.5">
                           <FileText className="w-4 h-4 text-purple-600"/> 
                           <span className="font-bold text-slate-700">Aarohan Bank AML/CFT Policy v2.4</span>
                         </div>
                         <ChevronRight className="w-4 h-4 text-slate-400" />
                       </li>
                       <li className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300 cursor-pointer transition-colors">
                         <div className="flex items-center gap-2.5">
                           <FileText className="w-4 h-4 text-blue-600"/> 
                           <span className="font-bold text-slate-700">Customer Acceptance Guidelines</span>
                         </div>
                         <ChevronRight className="w-4 h-4 text-slate-400" />
                       </li>
                       <li className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300 cursor-pointer transition-colors">
                         <div className="flex items-center gap-2.5">
                           <FileText className="w-4 h-4 text-green-600"/> 
                           <span className="font-bold text-slate-700">IT Infrastructure & Security Standard</span>
                         </div>
                         <ChevronRight className="w-4 h-4 text-slate-400" />
                       </li>
                     </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details & Insights (Right Main) */}
          <div className="w-full lg:w-[320px] shrink-0 space-y-5">
            
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
      <div className="w-full xl:w-[360px] shrink-0 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden h-full">
        
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
