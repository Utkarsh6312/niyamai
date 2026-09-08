"use client";
import { ChevronRight, Search, Filter, ShieldCheck, FileText, CheckCircle2, User, Download, Users, Database, Calendar, RotateCcw, CheckSquare, Square, FileCheck, BarChart2, FileSearch, CloudDownload, FilePlus, Settings, FileEdit, AlertTriangle, MoreVertical, X, ArrowUp, ChevronLeft, ChevronDown, Check, File } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AuditTrail() {
  const events = [
    {
      id: "EVT-20260821-001284",
      date: "21 Aug 2026",
      time: "10:15 AM",
      title: "Action Completed",
      details: "Updated KYC verification SOP issued",
      actor: { initials: "AS", name: "A. Sharma", dept: "Compliance", type: "human" },
      status: { label: "Completed", color: "text-teal bg-teal/10" },
      icon: <FileCheck className="w-5 h-5 text-indigo" />,
      iconBg: "bg-indigo/10",
    },
    {
      id: "EVT-20260821-001283",
      date: "21 Aug 2026",
      time: "09:42 AM",
      title: "Policy Mapped",
      details: "Clause 4.2 mapped to internal policy KYC-07 v3.4",
      actor: { initials: "RM", name: "R. Mehta", dept: "Risk", type: "human" },
      status: { label: "Success", color: "text-teal bg-teal/10" },
      icon: <CheckSquare className="w-5 h-5 text-teal" />,
      iconBg: "bg-teal/10",
    },
    {
      id: "EVT-20260821-001282",
      date: "21 Aug 2026",
      time: "09:15 AM",
      title: "Risk Assessment Updated",
      details: "Risk level changed from High to Medium",
      actor: { initials: "PG", name: "P. Gupta", dept: "Operations", type: "human" },
      status: { label: "Updated", color: "text-indigo bg-indigo/10" },
      icon: <BarChart2 className="w-5 h-5 text-red" />,
      iconBg: "bg-red/10",
    },
    {
      id: "EVT-20260821-001281",
      date: "21 Aug 2026",
      time: "08:50 AM",
      title: "Clause Analyzed",
      details: "Extracted 3 new obligations from Clause 4.2",
      actor: { initials: "NI", name: "Niyamai AI System", dept: "", type: "ai" },
      status: { label: "AI Generated", color: "text-[#8b5cf6] bg-[#8b5cf6]/10" },
      icon: <FileSearch className="w-5 h-5 text-[#8b5cf6]" />,
      iconBg: "bg-[#8b5cf6]/10",
    },
    {
      id: "EVT-20260820-001280",
      date: "20 Aug 2026",
      time: "06:22 PM",
      title: "Document Ingested",
      details: "RBI_KYC_Master_Direction_2026.pdf (42 pages)",
      actor: { initials: "NP", name: "N. Pillai", dept: "Compliance", type: "human" },
      status: { label: "Success", color: "text-teal bg-teal/10" },
      icon: <CloudDownload className="w-5 h-5 text-teal" />,
      iconBg: "bg-teal/10",
    },
    {
      id: "EVT-20260820-001279",
      date: "20 Aug 2026",
      time: "06:20 PM",
      title: "Regulation Published",
      details: "RBI Master Direction — KYC (2026)",
      actor: { initials: "NI", name: "Niyamai AI System", dept: "", type: "ai" },
      status: { label: "New", color: "text-indigo bg-indigo/10" },
      icon: <FilePlus className="w-5 h-5 text-indigo" />,
      iconBg: "bg-indigo/10",
    },
    {
      id: "EVT-20260820-001278",
      date: "20 Aug 2026",
      time: "05:48 PM",
      title: "User Logged In",
      details: "User login from 103.87.22.41",
      actor: { initials: "AS", name: "A. Sharma", dept: "Compliance", type: "human" },
      status: { label: "Info", color: "text-muted-foreground bg-secondary" },
      icon: <User className="w-5 h-5 text-indigo" />,
      iconBg: "bg-indigo/10",
    },
    {
      id: "EVT-20260820-001277",
      date: "20 Aug 2026",
      time: "04:12 PM",
      title: "System Job Completed",
      details: "Daily regulatory scan completed (12 new documents)",
      actor: { initials: "NI", name: "Niyamai AI System", dept: "", type: "ai" },
      status: { label: "Success", color: "text-teal bg-teal/10" },
      icon: <Settings className="w-5 h-5 text-teal" />,
      iconBg: "bg-teal/10",
    },
    {
      id: "EVT-20260819-001276",
      date: "19 Aug 2026",
      time: "11:03 AM",
      title: "Action Assigned",
      details: "Review customer onboarding workflow",
      actor: { initials: "SK", name: "S. Kulkarni", dept: "Risk", type: "human" },
      status: { label: "Assigned", color: "text-amber bg-amber/10" },
      icon: <FileEdit className="w-5 h-5 text-amber" />,
      iconBg: "bg-amber/10",
    },
    {
      id: "EVT-20260819-001275",
      date: "19 Aug 2026",
      time: "10:21 AM",
      title: "Gap Identified",
      details: "Missing verification trigger for non-face-to-face onboarding",
      actor: { initials: "NI", name: "Niyamai AI System", dept: "", type: "ai" },
      status: { label: "High Risk", color: "text-red bg-red/10" },
      icon: <AlertTriangle className="w-5 h-5 text-red" />,
      iconBg: "bg-red/10",
    }
  ];

  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];
  const [detailsOpen, setDetailsOpen] = useState(true);

  return (
    <div className="space-y-6 flex flex-col min-h-[calc(100vh-3rem)] bg-analytical text-foreground -m-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-indigo transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Audit Trail</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary-dark">Audit Trail</h1>
          <p className="text-muted-foreground mt-2 text-base">Complete traceability of regulatory intelligence, analysis and actions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-primary-dark rounded-md font-semibold text-sm hover:bg-secondary transition-colors shadow-sm">
            <Download className="w-4 h-4 text-indigo" /> Export Audit Log
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md font-semibold text-sm hover:bg-indigo/90 transition-colors shadow-sm">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5  flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-indigo" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-dark">1,284</div>
            <div className="text-sm font-medium text-muted-foreground">Total Events</div>
            <div className="text-xs font-semibold text-teal mt-1 flex items-center gap-1"><ArrowUp className="w-3 h-3" /> 12% this month</div>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5  flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-[#8b5cf6]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-dark">48</div>
            <div className="text-sm font-medium text-muted-foreground">Users Involved</div>
            <div className="text-xs font-semibold text-teal mt-1 flex items-center gap-1"><ArrowUp className="w-3 h-3" /> 8% this month</div>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5  flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6 text-indigo" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-dark">63</div>
            <div className="text-sm font-medium text-muted-foreground">Regulations Tracked</div>
            <div className="text-xs font-semibold text-teal mt-1 flex items-center gap-1"><ArrowUp className="w-3 h-3" /> 5% this month</div>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5  flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-teal" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-dark">100%</div>
            <div className="text-sm font-medium text-muted-foreground">Audit Coverage</div>
            <div className="text-xs font-medium text-muted-foreground mt-1">No missing records</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[600px] xl:min-h-[800px]">
        
        {/* Left Sidebar Filters */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col space-y-6">
          <h2 className="text-lg font-bold text-primary-dark">Filter Events</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary-dark">Time Range</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select className="w-full appearance-none bg-card border border-border rounded-md pl-9 pr-8 py-2 text-sm font-medium text-primary-dark focus:outline-none focus:ring-1 focus:ring-indigo">
                  <option>Last 30 days</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-primary-dark">Event Type</label>
              <div className="space-y-2.5">
                {[
                  { label: "All Events", count: "1,284", checked: true },
                  { label: "Regulation Ingestion", count: "142", checked: false },
                  { label: "Analysis", count: "236", checked: false },
                  { label: "Policy Mapping", count: "189", checked: false },
                  { label: "Risk Assessment", count: "134", checked: false },
                  { label: "Action Management", count: "312", checked: false },
                  { label: "User Activity", count: "198", checked: false },
                  { label: "System Events", count: "73", checked: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${item.checked ? 'bg-indigo border-indigo' : 'border-border bg-card'}`}>
                        {item.checked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-primary-dark transition-colors">{item.label}</span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground/60 bg-secondary px-1.5 py-0.5 rounded-md">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary-dark">User</label>
              <div className="relative">
                <select className="w-full appearance-none bg-card border border-border rounded-md pl-3 pr-8 py-2 text-sm font-medium text-primary-dark focus:outline-none focus:ring-1 focus:ring-indigo">
                  <option>All Users</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary-dark">Department</label>
              <div className="relative">
                <select className="w-full appearance-none bg-card border border-border rounded-md pl-3 pr-8 py-2 text-sm font-medium text-primary-dark focus:outline-none focus:ring-1 focus:ring-indigo">
                  <option>All Departments</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary-dark">Regulation</label>
              <div className="relative">
                <select className="w-full appearance-none bg-card border border-border rounded-md pl-3 pr-8 py-2 text-sm font-medium text-primary-dark focus:outline-none focus:ring-1 focus:ring-indigo">
                  <option>All Regulations</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary-dark">Status</label>
              <div className="relative">
                <select className="w-full appearance-none bg-card border border-border rounded-md pl-3 pr-8 py-2 text-sm font-medium text-primary-dark focus:outline-none focus:ring-1 focus:ring-indigo">
                  <option>All Status</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <button className="flex items-center gap-2 mt-4 text-indigo text-sm font-semibold transition-colors">
              <RotateCcw className="w-4 h-4" /> Clear Filters
            </button>
          </div>
        </div>

        {/* Middle Main Section */}
        <div className="flex-1 bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]   flex flex-col min-h-0 overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between bg-card shrink-0">
            <h2 className="text-lg font-bold text-primary-dark">Audit Log <span className="text-muted-foreground font-medium text-base">(1,284 events)</span></h2>
            <div className="flex items-center gap-2 bg-secondary border border-border rounded-md px-3 py-1.5 text-sm font-medium cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Newest First</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ml-1" />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            <div className="min-w-[800px] divide-y divide-border">
              {events.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  className={`flex items-start gap-4 p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${selectedEventId === event.id ? 'bg-indigo/5' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${event.iconBg}`}>
                    {event.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0 flex items-start justify-between gap-6">
                    <div className="flex flex-col gap-1 w-[120px] shrink-0">
                      <span className="text-xs font-semibold text-muted-foreground">{event.date}</span>
                      <span className="text-xs font-medium text-muted-foreground">{event.time}</span>
                    </div>

                    <div className="flex-1 flex flex-col gap-0.5 pr-4 min-w-0">
                      <span className="text-sm font-bold text-primary-dark truncate">{event.title}</span>
                      <span className="text-sm text-muted-foreground truncate">{event.details}</span>
                    </div>

                    <div className="w-[180px] shrink-0 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-primary-dark shrink-0">
                        {event.actor.initials}
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold text-primary-dark truncate">{event.actor.name}</span>
                        {event.actor.dept && <span className="text-xs text-muted-foreground truncate">{event.actor.dept}</span>}
                      </div>
                    </div>

                    <div className="w-[140px] shrink-0 flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border border-transparent ${event.status.color} whitespace-nowrap`}>
                        {event.status.label}
                      </span>
                      <button className="text-muted-foreground hover:text-primary-dark transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-border flex items-center justify-between shrink-0 bg-card">
            <span className="text-sm text-muted-foreground font-medium">Showing 1–10 of 1,284 events</span>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo text-white font-medium text-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-primary-dark hover:bg-secondary font-medium text-sm">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-primary-dark hover:bg-secondary font-medium text-sm">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-primary-dark hover:bg-secondary font-medium text-sm">4</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-primary-dark hover:bg-secondary font-medium text-sm">5</button>
              <span className="px-1 text-muted-foreground">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-primary-dark hover:bg-secondary font-medium text-sm">129</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Details */}
        {detailsOpen && (
          <div className="w-full lg:w-[380px] shrink-0 bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]   flex flex-col min-h-0">
            <div className="p-5 border-b border-border flex items-center justify-between shrink-0">
              <h2 className="text-lg font-bold text-primary-dark">Event Details</h2>
              <button onClick={() => setDetailsOpen(false)} className="text-muted-foreground hover:text-primary-dark">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* Dynamic Banner based on the first event in image */}
              <div className="bg-[#e8f5ed] border border-[#a6d9b9] rounded-lg p-4 flex gap-3">
                <div className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#105638]">Action Completed</h3>
                  <p className="text-sm text-[#1b7b51] mt-0.5">Updated KYC verification SOP issued</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Event ID</span>
                  <span className="text-sm font-medium text-primary-dark">EVT-20260821-001284</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Timestamp</span>
                  <span className="text-sm font-medium text-primary-dark">21 Aug 2026, 10:15:32 AM</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">User</span>
                  <span className="text-sm font-medium text-primary-dark">A. Sharma (Compliance)</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Event Type</span>
                  <span className="text-sm font-medium text-primary-dark">Action Management</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <div><span className="px-2 py-0.5 bg-teal/10 text-teal rounded-md text-xs font-bold">Completed</span></div>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Source Regulation</span>
                  <span className="text-sm font-medium text-primary-dark">RBI Master Direction — KYC (2026)</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Related Clause</span>
                  <span className="text-sm font-medium text-primary-dark">Clause 4.2</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Related Policy</span>
                  <span className="text-sm font-semibold text-indigo hover:underline cursor-pointer">KYC-07 v3.4</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Related Action</span>
                  <span className="text-sm font-semibold text-indigo hover:underline cursor-pointer">ACT-2041</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Department</span>
                  <span className="text-sm font-medium text-primary-dark">KYC</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Details</span>
                  <span className="text-sm text-primary-dark leading-relaxed">Updated KYC verification SOP to include enhanced due diligence procedures for high-risk customers as per Clause 4.2 requirements.</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Previous Status</span>
                  <div><span className="px-2 py-0.5 bg-amber/10 text-amber rounded-md text-xs font-bold">In Progress</span></div>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Completed By</span>
                  <span className="text-sm font-medium text-primary-dark">A. Sharma</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Completion Time</span>
                  <span className="text-sm font-medium text-primary-dark">2 hours 18 minutes</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2">
                  <span className="text-sm text-muted-foreground">Attachments</span>
                  <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-md border border-border hover:bg-secondary cursor-pointer transition-colors w-max">
                    <File className="w-5 h-5 text-indigo" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-indigo">KYC_SOP_v3.4.pdf</span>
                      <span className="text-[10px] text-muted-foreground">(1.2 MB)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <h3 className="font-bold text-primary-dark">Event Timeline</h3>
                <div className="space-y-4 relative before:absolute before:inset-y-2 before:left-[11px] before:w-px before:bg-border">
                  <div className="relative pl-8 flex gap-4">
                    <div className="absolute left-2 top-1.5 w-2 h-2 rounded-full bg-border" />
                    <div className="w-16 shrink-0 text-xs font-medium text-muted-foreground pt-0.5">09:42 AM</div>
                    <div className="text-sm text-primary-dark">Action marked as In Progress <br/><span className="text-muted-foreground text-xs">by A. Sharma</span></div>
                  </div>
                  <div className="relative pl-8 flex gap-4">
                    <div className="absolute left-2 top-1.5 w-2 h-2 rounded-full bg-border" />
                    <div className="w-16 shrink-0 text-xs font-medium text-muted-foreground pt-0.5">10:10 AM</div>
                    <div className="text-sm text-primary-dark">SOP document uploaded</div>
                  </div>
                  <div className="relative pl-8 flex gap-4">
                    <div className="absolute left-[7px] top-[5px] w-[10px] h-[10px] rounded-full bg-teal ring-4 ring-teal/20" />
                    <div className="w-16 shrink-0 text-xs font-medium text-muted-foreground pt-0.5">10:15 AM</div>
                    <div className="text-sm text-primary-dark">Action marked as Completed <br/><span className="text-muted-foreground text-xs">by A. Sharma</span></div>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-border bg-card shrink-0 grid grid-cols-2 gap-3">
              <button className="py-2.5 px-4 text-indigo text-sm font-semibold border border-indigo/30 rounded-md hover:bg-indigo/5 transition-colors text-center shadow-sm">
                View Related Items
              </button>
              <button className="py-2.5 px-4 bg-indigo text-white text-sm font-semibold rounded-md hover:bg-indigo/90 transition-colors text-center shadow-sm">
                Add Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

