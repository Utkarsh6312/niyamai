"use client";

import { Download, Plus, Search, Filter, ChevronLeft, ChevronRight, MoreVertical, FileText, AlertTriangle, FileCheck, FileQuestion, Calendar, X, Building, Link as LinkIcon, CheckCircle2, Clock, Lightbulb, ExternalLink, Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const obligations = [
  { id: "OBL-001", requirement: "Perform enhanced due diligence for high-risk customers (PEPs, non-face-to-face).", reg: "RBI KYC Master Direction 2026 (Clause C.2.1)", dept: "KYC", type: "Process", typeColor: "bg-purple-100 text-purple-700", impact: "High", impactColor: "text-red bg-red/10", mapping: "Mapped (2 policies)", mappingColor: "text-green-700", status: "In Progress", statusColor: "bg-blue-100 text-blue-700" },
  { id: "OBL-002", requirement: "Conduct periodic review of customer accounts based on risk profile.", reg: "RBI KYC Master Direction 2026 (Clause C.3.4)", dept: "Operations", type: "Process", typeColor: "bg-purple-100 text-purple-700", impact: "High", impactColor: "text-red bg-red/10", mapping: "Mapped (1 policy)", mappingColor: "text-green-700", status: "Compliant", statusColor: "bg-green-100 text-green-700" },
  { id: "OBL-003", requirement: "Maintain records of customer identification and transactions for minimum 7 years.", reg: "RBI Data Localization Guidelines (D.1.2)", dept: "IT", type: "Data", typeColor: "bg-blue-100 text-blue-700", impact: "Medium", impactColor: "text-orange-600 bg-orange-100", mapping: "Mapped (1 policy)", mappingColor: "text-green-700", status: "In Progress", statusColor: "bg-blue-100 text-blue-700" },
  { id: "OBL-004", requirement: "Report suspicious transactions to FIU within specified timelines.", reg: "AML Guidelines 2026 (F.2.3)", dept: "Compliance", type: "Reporting", typeColor: "bg-indigo-100 text-indigo-700", impact: "High", impactColor: "text-red bg-red/10", mapping: "Mapped (3 policies)", mappingColor: "text-green-700", status: "Action Required", statusColor: "bg-red/10 text-red" },
  { id: "OBL-005", requirement: "Ensure data of Indian customers is stored in approved locations.", reg: "RBI Data Localization Guidelines (D.4.1)", dept: "IT", type: "Technical", typeColor: "bg-slate-100 text-slate-700", impact: "High", impactColor: "text-red bg-red/10", mapping: "Unmapped", mappingColor: "text-red", status: "Not Started", statusColor: "bg-slate-100 text-slate-700" },
  { id: "OBL-006", requirement: "Implement additional monitoring for digital lending products.", reg: "Digital Lending Guidelines 2026", dept: "Risk", type: "Process", typeColor: "bg-purple-100 text-purple-700", impact: "Medium", impactColor: "text-orange-600 bg-orange-100", mapping: "Mapped (1 policy)", mappingColor: "text-green-700", status: "In Progress", statusColor: "bg-blue-100 text-blue-700" },
  { id: "OBL-007", requirement: "Disclose ESG related information as per SEBI requirements.", reg: "SEBI ESG Disclosure Norms", dept: "Finance", type: "Reporting", typeColor: "bg-indigo-100 text-indigo-700", impact: "Low", impactColor: "text-teal bg-teal/10", mapping: "Mapped (1 policy)", mappingColor: "text-green-700", status: "Compliant", statusColor: "bg-green-100 text-green-700" },
  { id: "OBL-008", requirement: "Ensure priority sector lending targets are tracked and reported.", reg: "Priority Sector Lending Update", dept: "Business", type: "Reporting", typeColor: "bg-indigo-100 text-indigo-700", impact: "Medium", impactColor: "text-orange-600 bg-orange-100", mapping: "Unmapped", mappingColor: "text-red", status: "Not Started", statusColor: "bg-slate-100 text-slate-700" },
  { id: "OBL-009", requirement: "Obtain customer consent for data usage beyond core banking services.", reg: "Customer Data Protection Rules", dept: "Legal", type: "Process", typeColor: "bg-purple-100 text-purple-700", impact: "Medium", impactColor: "text-orange-600 bg-orange-100", mapping: "Mapped (1 policy)", mappingColor: "text-green-700", status: "In Progress", statusColor: "bg-blue-100 text-blue-700" },
  { id: "OBL-010", requirement: "Maintain audit logs for all administrative access.", reg: "Cyber Security Framework", dept: "IT", type: "Technical", typeColor: "bg-slate-100 text-slate-700", impact: "High", impactColor: "text-red bg-red/10", mapping: "Unmapped", mappingColor: "text-red", status: "Action Required", statusColor: "bg-red/10 text-red" },
];

export default function ObligationExplorer() {
  const [selectedObligation] = useState(obligations[0]);

  return (
    <div className="space-y-5 flex flex-col h-full text-[#0F172A] pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-[#0F172A] transition-colors">Home</Link>
        <span className="mx-1">›</span>
        <span className="text-[#0F172A]">Obligation Explorer</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight mb-2">Obligations Explorer</h1>
          <p className="text-slate-500 text-sm">Explore, search, and analyze your regulatory obligations across all applicable regulations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-[#2563EB] text-[#2563EB] px-4 py-2 rounded text-sm font-medium hover:bg-blue-50 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" /> Custom View
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <p className="text-2xl font-bold">348</p>
            <p className="text-[11px] text-slate-500 font-medium">Total Obligations</p>
            <p className="text-[11px] text-green-600 font-medium">↑ 12%</p>
          </div>
        </div>
        <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">42</p>
            <p className="text-[11px] text-slate-500 font-medium">High Priority</p>
            <p className="text-[11px] text-red-600 font-medium">↑ 8%</p>
          </div>
        </div>
        <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">176</p>
            <p className="text-[11px] text-slate-500 font-medium">Mapped to Policies</p>
            <p className="text-[11px] text-green-600 font-medium">51%</p>
          </div>
        </div>
        <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <FileQuestion className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <p className="text-2xl font-bold">29</p>
            <p className="text-[11px] text-slate-500 font-medium">Unmapped</p>
            <p className="text-[11px] text-slate-500 font-medium">8%</p>
          </div>
        </div>
        <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-[11px] text-slate-500 font-medium">Upcoming Deadlines</p>
            <p className="text-[11px] text-slate-500 font-medium">Next 30 days</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 flex-1 min-h-0">
        
        {/* Left: Table Area */}
        <div className="flex-1 flex flex-col min-w-0 space-y-4">
          
          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search obligations..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded text-sm outline-none focus:border-[#2563EB]" />
            </div>
            <select className="bg-white border border-slate-200 px-3 py-2 rounded text-sm outline-none text-slate-700">
              <option>Regulation</option>
            </select>
            <select className="bg-white border border-slate-200 px-3 py-2 rounded text-sm outline-none text-slate-700">
              <option>Department</option>
            </select>
            <select className="bg-white border border-slate-200 px-3 py-2 rounded text-sm outline-none text-slate-700">
              <option>Obligation Type</option>
            </select>
            <select className="bg-white border border-slate-200 px-3 py-2 rounded text-sm outline-none text-slate-700">
              <option>Impact Level</option>
            </select>
            <select className="bg-white border border-slate-200 px-3 py-2 rounded text-sm outline-none text-slate-700">
              <option>Status</option>
            </select>
            <button className="flex items-center gap-2 border border-[#2563EB] text-[#2563EB] px-3 py-2 rounded text-sm hover:bg-blue-50 transition-colors bg-white">
              <Filter className="w-4 h-4" /> More Filters
            </button>
          </div>

          {/* Table */}
          <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] overflow-hidden flex-1 flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="pl-4 pr-2 py-3 w-8"><input type="checkbox" className="rounded border-slate-300" /></th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Obligation ID</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider w-[25%]">Obligation / Requirement</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Source Regulation</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Department</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Type</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Impact</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Policy Mapping</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider">Status</th>
                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {obligations.map((obl, i) => (
                    <tr key={obl.id} className={`hover:bg-slate-50 transition-colors cursor-pointer ${i === 0 ? 'bg-blue-50/50' : ''}`}>
                      <td className="pl-4 pr-2 py-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                      <td className="px-3 py-4 text-[#2563EB] font-medium text-xs whitespace-nowrap">{obl.id}</td>
                      <td className="px-3 py-4 text-slate-700 text-xs pr-8 leading-relaxed">{obl.requirement}</td>
                      <td className="px-3 py-4 text-[#2563EB] text-xs whitespace-pre-wrap">{obl.reg}</td>
                      <td className="px-3 py-4 text-slate-700 text-xs">{obl.dept}</td>
                      <td className="px-3 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border border-transparent ${obl.typeColor}`}>{obl.type}</span>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold ${obl.impactColor}`}>{obl.impact}</span>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`text-[11px] font-medium ${obl.mappingColor}`}>{obl.mapping}</span>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-semibold ${obl.statusColor}`}>{obl.status}</span>
                      </td>
                      <td className="px-3 py-4 text-center">
                        <button className="p-1 hover:bg-slate-100 rounded text-slate-400"><MoreVertical className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between text-sm bg-white">
              <span className="text-slate-500 text-xs">Showing 1–10 of 348 obligations</span>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors border border-transparent"><ChevronLeft className="w-4 h-4" /></button>
                <button className="w-8 h-8 rounded flex items-center justify-center bg-[#2563EB] text-white text-xs font-medium border border-[#2563EB]">1</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors text-xs border border-transparent">2</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors text-xs border border-transparent">3</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors text-xs border border-transparent">4</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors text-xs border border-transparent">5</button>
                <span className="text-slate-500 px-1">...</span>
                <button className="w-8 h-8 rounded flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors text-xs border border-transparent">35</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors border border-transparent"><ChevronRight className="w-4 h-4" /></button>
                <select className="bg-white border border-slate-200 px-2 py-1.5 rounded text-xs outline-none ml-2 text-slate-700">
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Obligation Detail Panel */}
        <div className="w-[340px] shrink-0 bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 relative">
            <button className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#2563EB]" />
              </div>
              <h3 className="font-bold text-xl text-[#0F172A]">{selectedObligation.id}</h3>
            </div>
            <p className="text-sm text-slate-700 mb-4 leading-relaxed font-medium">
              Perform enhanced due diligence for high-risk customers (PEPs, non-face-to-face).
            </p>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 flex items-center gap-1.5 border border-red-100">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> High Impact
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-[#2563EB] border border-blue-100">Process</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            <button className="flex-1 px-3 py-3 text-sm font-semibold border-b-2 border-[#2563EB] text-[#2563EB] text-center">Details</button>
            <button className="flex-1 px-3 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors text-center">Relationships</button>
            <button className="flex-1 px-3 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors text-center">History</button>
          </div>

          {/* Content */}
          <div className="p-5 space-y-6">
            
            {/* Regulation Source */}
            <div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-2">Regulation Source</h4>
              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <FileText className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[#0F172A] font-medium leading-tight">RBI KYC Master Direction 2026</p>
                  <p className="text-xs text-slate-500 mt-1">Clause C.2.1</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#2563EB] cursor-pointer" />
              </div>
            </div>

            {/* Full Clause Text */}
            <div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-2">Full Clause Text</h4>
              <p className="text-sm text-slate-600 leading-relaxed bg-white">
                Regulated entities shall perform enhanced due diligence for high-risk customers, including politically exposed persons (PEPs) and customers undertaking non-face-to-face transactions...
              </p>
              <button className="text-[#2563EB] text-sm font-medium mt-1 hover:underline">Show More</button>
            </div>

            {/* Applies To */}
            <div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-2">Applies To</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-[#2563EB] rounded text-xs font-medium">Retail Banking</span>
                <span className="px-3 py-1 bg-blue-50 text-[#2563EB] rounded text-xs font-medium">Corporate Banking</span>
                <span className="px-3 py-1 bg-blue-50 text-[#2563EB] rounded text-xs font-medium">All Branches</span>
              </div>
            </div>

            {/* Department Owner */}
            <div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-2">Department Owner</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center">
                    <Building className="w-3.5 h-3.5 text-purple-700" />
                  </div>
                  <span className="text-sm text-slate-700 font-medium">KYC</span>
                </div>
                <button className="text-[#2563EB] text-sm font-medium hover:underline">Change</button>
              </div>
            </div>

            {/* Policy Mapping */}
            <div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-2">Policy Mapping</h4>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-slate-700">Mapped (2 policies)</span>
              </div>
              <div className="pl-6 space-y-2">
                <div className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-slate-600 group-hover:text-[#2563EB] transition-colors">KYC Policy v3.2</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB]" />
                </div>
                <div className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-slate-600 group-hover:text-[#2563EB] transition-colors">Customer Due Diligence SOP</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB]" />
                </div>
              </div>
            </div>

            {/* Related Obligations */}
            <div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-2">Related Obligations</h4>
              <div className="space-y-2">
                <div className="flex gap-3 text-sm">
                  <span className="text-[#2563EB] font-medium shrink-0">OBL-002</span>
                  <span className="text-slate-600 truncate">Periodic account review</span>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="text-[#2563EB] font-medium shrink-0">OBL-004</span>
                  <span className="text-slate-600 truncate">Suspicious transaction reporting</span>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-2">Upcoming Deadlines</h4>
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-bold text-[#0F172A]">01 Oct 2026</span>
                </div>
                <button className="flex items-center gap-1.5 border border-[#2563EB] text-[#2563EB] px-2 py-1 rounded text-xs font-medium hover:bg-blue-50 transition-colors bg-white">
                  <Bell className="w-3.5 h-3.5" /> Set Reminder
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
              <h4 className="text-sm font-bold text-[#0F172A] mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#2563EB]" /> AI Insights
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed mb-2">
                This obligation is a key control for AML/CFT compliance and is linked to 3 high-impact risks.
              </p>
              <button className="text-[#2563EB] text-sm font-medium hover:underline flex items-center gap-1 ml-auto">
                View in Impact Analysis →
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
