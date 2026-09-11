const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src/app/(dashboard)/ai-assistant/page.tsx");
let content = fs.readFileSync(filePath, "utf8");

const newImports = `import { FileText, ChevronRight, Download, Share2, Sparkles, AlertTriangle, Scale, Bell, Clock, Search, Filter, History, Maximize2, MoreHorizontal, Paperclip, Send, BrainCircuit, Activity, BarChart3, CheckSquare, Target, Users, BookOpen, FileCheck, Save } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string | React.ReactNode;
  time: string;
};
`;
content = content.replace(/import \{.*?\} from "lucide-react";\nimport Link from "next\/link";\nimport \{ useState \} from "react";/s, newImports);

const componentStartOld = `export default function AIAssistant() {\n  const [activeTab, setActiveTab] = useState("Summary");`;
const componentStartNew = `export default function AIAssistant() {
  const [activeTab, setActiveTab] = useState("Summary");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      time: new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"}),
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
      )
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      time: new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"}),
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let responseContent: React.ReactNode;
      const lowerInput = userMsg.content.toString().toLowerCase();

      if (lowerInput.includes("rbi kyc") || lowerInput.includes("amendment")) {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="mb-3 font-medium">Here are the main changes in the RBI KYC Amendment 2026:</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full border border-[#2563EB] text-[#2563EB] flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">1</span>
                <p>Enhanced due diligence for higher risk customers (PEPs, non-face-to-face)</p>
              </div>
              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full border border-[#2563EB] text-[#2563EB] flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">2</span>
                <p>Additional verification of source of funds and wealth</p>
              </div>
              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full border border-[#2563EB] text-[#2563EB] flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">3</span>
                <p>Periodic review of customer accounts based on risk profile</p>
              </div>
            </div>
          </div>
        );
      } else {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="font-medium">I have analyzed your request regarding "{userMsg.content}". Based on our policy library and current regulations, we recommend reviewing the compliance mapping for this area.</p>
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
`;
content = content.replace(componentStartOld, componentStartNew);

const oldChatSectionRegex = /\{\/\* Chat Messages \*\/\}.*?(?=\{\/\* Chat Input \*\/\})/s;
const newChatSection = `{/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30">
          {messages.map((msg) => (
            <div key={msg.id} className={\`flex gap-3 \${msg.role === "user" ? "flex-row-reverse" : ""}\`}>
              {msg.role === "assistant" ? (
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                  U
                </div>
              )}
              
              <div className={\`flex-1 min-w-0 space-y-1.5 \${msg.role === "user" ? "flex flex-col items-end" : ""}\`}>
                {msg.role === "user" ? (
                  <div className="bg-[#EBF3FF] rounded-2xl rounded-tr-sm p-3.5 text-[13px] text-[#0F172A] font-medium leading-relaxed max-w-[90%]">
                    {msg.content}
                  </div>
                ) : (
                  msg.content
                )}
                <p className={\`text-[9px] text-slate-400 font-semibold \${msg.role === "user" ? "mr-1" : "ml-1"} mt-1.5\`}>{msg.time}</p>
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

        `;
content = content.replace(oldChatSectionRegex, newChatSection);

const oldInputRegex = /\{\/\* Chat Input \*\/\}.*?(?=\<\/div\>\n\n      \<\/div\>\n    \<\/div\>\n  \);\n\})/s;
const newInputSection = `{/* Chat Input */}
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
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="absolute right-1.5 w-7 h-7 rounded-md bg-[#2563EB] text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
          <p className="text-center text-[9px] text-slate-400 font-medium mt-2.5">
            NiyamAI may make mistakes. Please verify critical information.
          </p>
        </div>
        `;
content = content.replace(oldInputRegex, newInputSection);

fs.writeFileSync(filePath, content);
console.log("Successfully patched page.tsx");

