
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src/app/(dashboard)/ai-assistant/page.tsx");
let content = fs.readFileSync(filePath, "utf8");

content = `
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
      } else {
        responseContent = (
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-[13px] text-slate-700 leading-relaxed shadow-sm">
            <p className="font-medium">I have analyzed your request. Based on our policy library and current regulations, I recommend reviewing the compliance mapping for this area.</p>
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
` + content.substring(content.indexOf("return ("));

fs.writeFileSync(filePath, content);
console.log("Rewrote page.tsx completely");

