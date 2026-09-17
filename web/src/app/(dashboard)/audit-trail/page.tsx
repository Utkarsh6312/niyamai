"use client";
import { ChevronRight, Search, Filter, ShieldCheck, FileText, CheckCircle2, User, Download, Users, Database, Calendar, RotateCcw, CheckSquare, Square, FileCheck, BarChart2, FileSearch, CloudDownload, FilePlus, Settings, FileEdit, AlertTriangle, MoreVertical, X, ArrowUp, ChevronLeft, ChevronDown, Check, File } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

type AuditEvent = {
  id: string;
  date: string;
  time: string;
  title: string;
  details: string;
  actor: { initials: string; name: string; dept: string; type: string };
  status: { label: string; color: string };
  iconType: string;
  iconBg: string;
  actionId?: string;
  regulation?: string;
  department?: string;
  owner?: string;
  priority?: string;
};

function getIcon(type: string, className = "w-5 h-5") {
  switch (type) {
    case "complete": return <FileCheck className={`${className} text-teal`} />;
    case "create":   return <FilePlus className={`${className} text-indigo`} />;
    case "update":   return <FileEdit className={`${className} text-amber`} />;
    case "map":      return <CheckSquare className={`${className} text-teal`} />;
    case "risk":     return <BarChart2 className={`${className} text-red`} />;
    case "ai":       return <FileSearch className={`${className} text-[#8b5cf6]`} />;
    case "ingest":   return <CloudDownload className={`${className} text-teal`} />;
    case "user":     return <User className={`${className} text-indigo`} />;
    case "system":   return <Settings className={`${className} text-teal`} />;
    case "gap":      return <AlertTriangle className={`${className} text-red`} />;
    default:         return <FileText className={`${className} text-indigo`} />;
  }
}

const STATIC_EVENTS: AuditEvent[] = [
  {
    id: "EVT-STATIC-001283",
    date: "21 Aug 2026", time: "09:42 AM",
    title: "Policy Mapped",
    details: "Clause 4.2 mapped to internal policy KYC-07 v3.4",
    actor: { initials: "RM", name: "R. Mehta", dept: "Risk", type: "human" },
    status: { label: "Success", color: "text-teal bg-teal/10" },
    iconType: "map", iconBg: "bg-teal/10",
  },
  {
    id: "EVT-STATIC-001282",
    date: "21 Aug 2026", time: "09:15 AM",
    title: "Risk Assessment Updated",
    details: "Risk level changed from High to Medium",
    actor: { initials: "PG", name: "P. Gupta", dept: "Operations", type: "human" },
    status: { label: "Updated", color: "text-indigo bg-indigo/10" },
    iconType: "risk", iconBg: "bg-red/10",
  },
  {
    id: "EVT-STATIC-001281",
    date: "21 Aug 2026", time: "08:50 AM",
    title: "Clause Analyzed",
    details: "Extracted 3 new obligations from Clause 4.2",
    actor: { initials: "NI", name: "Niyamai AI System", dept: "", type: "ai" },
    status: { label: "AI Generated", color: "text-[#8b5cf6] bg-[#8b5cf6]/10" },
    iconType: "ai", iconBg: "bg-[#8b5cf6]/10",
  },
  {
    id: "EVT-STATIC-001280",
    date: "20 Aug 2026", time: "06:22 PM",
    title: "Document Ingested",
    details: "RBI_KYC_Master_Direction_2026.pdf (42 pages)",
    actor: { initials: "NP", name: "N. Pillai", dept: "Compliance", type: "human" },
    status: { label: "Success", color: "text-teal bg-teal/10" },
    iconType: "ingest", iconBg: "bg-teal/10",
  },
  {
    id: "EVT-STATIC-001279",
    date: "20 Aug 2026", time: "06:20 PM",
    title: "Regulation Published",
    details: "RBI Master Direction — KYC (2026)",
    actor: { initials: "NI", name: "Niyamai AI System", dept: "", type: "ai" },
    status: { label: "New", color: "text-indigo bg-indigo/10" },
    iconType: "create", iconBg: "bg-indigo/10",
  },
  {
    id: "EVT-STATIC-001278",
    date: "20 Aug 2026", time: "05:48 PM",
    title: "User Logged In",
    details: "User login from 103.87.22.41",
    actor: { initials: "AS", name: "A. Sharma", dept: "Compliance", type: "human" },
    status: { label: "Info", color: "text-muted-foreground bg-secondary" },
    iconType: "user", iconBg: "bg-indigo/10",
  },
  {
    id: "EVT-STATIC-001277",
    date: "20 Aug 2026", time: "04:12 PM",
    title: "System Job Completed",
    details: "Daily regulatory scan completed (12 new documents)",
    actor: { initials: "NI", name: "Niyamai AI System", dept: "", type: "ai" },
    status: { label: "Success", color: "text-teal bg-teal/10" },
    iconType: "system", iconBg: "bg-teal/10",
  },
  {
    id: "EVT-STATIC-001276",
    date: "19 Aug 2026", time: "11:03 AM",
    title: "Action Assigned",
    details: "Review customer onboarding workflow",
    actor: { initials: "SK", name: "S. Kulkarni", dept: "Risk", type: "human" },
    status: { label: "Assigned", color: "text-amber bg-amber/10" },
    iconType: "update", iconBg: "bg-amber/10",
  },
  {
    id: "EVT-STATIC-001275",
    date: "19 Aug 2026", time: "10:21 AM",
    title: "Gap Identified",
    details: "Missing verification trigger for non-face-to-face onboarding",
    actor: { initials: "NI", name: "Niyamai AI System", dept: "", type: "ai" },
    status: { label: "High Risk", color: "text-red bg-red/10" },
    iconType: "gap", iconBg: "bg-red/10",
  },
];

export default function AuditTrail() {
  const [liveEvents, setLiveEvents] = useState<AuditEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [detailsOpen, setDetailsOpen] = useState(true);

  useEffect(() => {
    fetch("/api/actions?t=" + Date.now())
      .then(res => res.json())
      .then((actions: any[]) => {
        const now = new Date();
        const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        const generated: AuditEvent[] = actions.map((a, idx) => {
          const isComplete = a.status === "Completed";
          const isInProgress = a.status === "In Progress";

          return {
            id: `EVT-LIVE-${a.id}`,
            date: dateStr,
            time: timeStr,
            title: isComplete ? "Action Completed" : isInProgress ? "Action In Progress" : "Action Created",
            details: a.action,
            actor: {
              initials: a.ownerInitials || "SY",
              name: a.owner || "System",
              dept: a.department || "",
              type: "human",
            },
            status: isComplete
              ? { label: "Completed", color: "text-teal bg-teal/10" }
              : isInProgress
              ? { label: "In Progress", color: "text-amber bg-amber/10" }
              : { label: "Pending", color: "text-indigo bg-indigo/10" },
            iconType: isComplete ? "complete" : isInProgress ? "update" : "create",
            iconBg: isComplete ? "bg-teal/10" : isInProgress ? "bg-amber/10" : "bg-indigo/10",
            actionId: a.id,
            regulation: a.regulation,
            department: a.department,
            owner: a.owner,
            priority: a.priority,
          };
        });

        setLiveEvents(generated);
        const first = generated[0]?.id || STATIC_EVENTS[0]?.id;
        setSelectedEventId(first);
        setIsLoading(false);
      })
      .catch(() => {
        setSelectedEventId(STATIC_EVENTS[0]?.id);
        setIsLoading(false);
      });
  }, []);

  const allEvents = [...liveEvents, ...STATIC_EVENTS];
  const sortedEvents = sortOrder === "newest" ? [...allEvents] : [...allEvents].reverse();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + itemsPerPage);

  const selectedEvent = allEvents.find(e => e.id === selectedEventId) || allEvents[0];

  const completedCount = liveEvents.filter(e => e.status.label === "Completed").length;
  const totalLive = liveEvents.length;

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
          <h1 className="font-serif text-3xl font-bold tracking-tight text-primary-dark">Audit Trail</h1>
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
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-indigo" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-dark">{allEvents.length}</div>
            <div className="text-sm font-medium text-muted-foreground">Total Events</div>
            <div className="text-xs font-semibold text-teal mt-1 flex items-center gap-1"><ArrowUp className="w-3 h-3" /> {totalLive} live actions</div>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-teal" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-dark">{completedCount}</div>
            <div className="text-sm font-medium text-muted-foreground">Actions Completed</div>
            <div className="text-xs font-semibold text-teal mt-1 flex items-center gap-1"><ArrowUp className="w-3 h-3" /> From Action Center</div>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6 text-indigo" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-dark">{totalLive}</div>
            <div className="text-sm font-medium text-muted-foreground">RBI Guidelines Tracked</div>
            <div className="text-xs font-semibold text-teal mt-1 flex items-center gap-1"><ArrowUp className="w-3 h-3" /> KYC Master Direction 2025</div>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex items-center gap-4">
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
          <h2 className="font-serif text-lg font-bold text-primary-dark">Filter Events</h2>
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
                  { label: "All Events", count: `${allEvents.length}`, checked: true },
                  { label: "Action Completed", count: `${completedCount}`, checked: false },
                  { label: "Action Created", count: `${liveEvents.filter(e => e.status.label === "Pending").length}`, checked: false },
                  { label: "Regulation Ingestion", count: "142", checked: false },
                  { label: "Policy Mapping", count: "189", checked: false },
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
              <label className="text-sm font-semibold text-primary-dark">Status</label>
              <div className="relative">
                <select className="w-full appearance-none bg-card border border-border rounded-md pl-3 pr-8 py-2 text-sm font-medium text-primary-dark focus:outline-none focus:ring-1 focus:ring-indigo">
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>In Progress</option>
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
        <div className="flex-1 bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex flex-col min-h-0 overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between bg-card shrink-0">
            <h2 className="font-serif text-lg font-bold text-primary-dark">
              Audit Log <span className="text-muted-foreground font-medium text-base">({allEvents.length} events)</span>
            </h2>
            <div className="relative flex items-center">
              <RotateCcw className="absolute left-3 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <select 
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-secondary border border-border rounded-md pl-9 pr-8 py-1.5 text-sm font-medium cursor-pointer appearance-none focus:outline-none focus:ring-1 focus:ring-indigo text-primary-dark"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <ChevronDown className="absolute right-2.5 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            {isLoading ? (
              <div className="py-16 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="min-w-[800px] divide-y divide-border">
                {paginatedEvents.map((event) => (
                  <div 
                    key={event.id}
                    onClick={() => { setSelectedEventId(event.id); setDetailsOpen(true); }}
                    className={`flex items-start gap-4 p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${selectedEventId === event.id ? 'bg-indigo/5 border-l-2 border-l-indigo' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${event.iconBg}`}>
                      {getIcon(event.iconType)}
                    </div>
                    
                    <div className="flex-1 min-w-0 flex items-start justify-between gap-6">
                      <div className="flex flex-col gap-1 w-[120px] shrink-0">
                        <span className="text-xs font-semibold text-muted-foreground">{event.date}</span>
                        <span className="text-xs font-medium text-muted-foreground">{event.time}</span>
                      </div>

                      <div className="flex-1 flex flex-col gap-0.5 pr-4 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary-dark truncate">{event.title}</span>
                          {event.actionId && (
                            <span className="text-[10px] font-mono text-indigo bg-indigo/10 px-1.5 py-0.5 rounded shrink-0">{event.actionId}</span>
                          )}
                        </div>
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
            )}
          </div>
          
          <div className="p-4 border-t border-border flex items-center justify-between shrink-0 bg-card">
            <span className="text-sm text-muted-foreground font-medium">
              Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, sortedEvents.length)} of {allEvents.length} events
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md font-medium text-sm transition-colors ${
                      currentPage === page 
                        ? 'bg-indigo text-white border-transparent' 
                        : 'border border-border text-primary-dark hover:bg-secondary'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Details */}
        {detailsOpen && selectedEvent && (
          <div className="w-full lg:w-[380px] shrink-0 bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex flex-col min-h-0">
            <div className="p-5 border-b border-border flex items-center justify-between shrink-0">
              <h2 className="font-serif text-lg font-bold text-primary-dark">Event Details</h2>
              <button onClick={() => setDetailsOpen(false)} className="text-muted-foreground hover:text-primary-dark">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Status Banner */}
              <div className={`border rounded-lg p-4 flex gap-3 ${
                selectedEvent.status.label === "Completed"
                  ? "bg-[#e8f5ed] border-[#a6d9b9]"
                  : selectedEvent.status.label === "In Progress"
                  ? "bg-amber/5 border-amber/30"
                  : "bg-indigo/5 border-indigo/20"
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  selectedEvent.status.label === "Completed" ? "bg-teal text-white" :
                  selectedEvent.status.label === "In Progress" ? "bg-amber text-white" :
                  "bg-indigo text-white"
                }`}>
                  {getIcon(selectedEvent.iconType, "w-4 h-4")}
                </div>
                <div>
                  <h3 className={`font-bold ${
                    selectedEvent.status.label === "Completed" ? "text-[#105638]" :
                    selectedEvent.status.label === "In Progress" ? "text-amber" :
                    "text-indigo"
                  }`}>{selectedEvent.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{selectedEvent.details}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Event ID</span>
                  <span className="text-sm font-medium text-primary-dark font-mono">{selectedEvent.id}</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Timestamp</span>
                  <span className="text-sm font-medium text-primary-dark">{selectedEvent.date}, {selectedEvent.time}</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Owner / User</span>
                  <span className="text-sm font-medium text-primary-dark">{selectedEvent.actor.name}{selectedEvent.actor.dept ? ` (${selectedEvent.actor.dept})` : ""}</span>
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <div>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${selectedEvent.status.color}`}>
                      {selectedEvent.status.label}
                    </span>
                  </div>
                </div>
                {selectedEvent.actionId && (
                  <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Action ID</span>
                    <Link href="/action-center" className="text-sm font-semibold text-indigo hover:underline">{selectedEvent.actionId}</Link>
                  </div>
                )}
                {selectedEvent.regulation && (
                  <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Source Regulation</span>
                    <span className="text-sm font-medium text-primary-dark">{selectedEvent.regulation}</span>
                  </div>
                )}
                {selectedEvent.department && (
                  <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Department</span>
                    <span className="text-sm font-medium text-primary-dark">{selectedEvent.department}</span>
                  </div>
                )}
                {selectedEvent.priority && (
                  <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Priority</span>
                    <span className={`text-sm font-bold ${
                      selectedEvent.priority === "Critical" ? "text-red" :
                      selectedEvent.priority === "High" ? "text-amber" :
                      "text-indigo"
                    }`}>{selectedEvent.priority}</span>
                  </div>
                )}
                <div className="grid grid-cols-[130px_1fr] gap-x-2 border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Details</span>
                  <span className="text-sm text-primary-dark leading-relaxed">{selectedEvent.details}</span>
                </div>
              </div>

              {/* Event Timeline */}
              <div className="pt-4 space-y-4">
                <h3 className="font-bold text-primary-dark">Event Timeline</h3>
                <div className="space-y-4 relative before:absolute before:inset-y-2 before:left-[11px] before:w-px before:bg-border">
                  <div className="relative pl-8 flex gap-4">
                    <div className="absolute left-2 top-1.5 w-2 h-2 rounded-full bg-border" />
                    <div className="w-16 shrink-0 text-xs font-medium text-muted-foreground pt-0.5">{selectedEvent.time}</div>
                    <div className="text-sm text-primary-dark">
                      {selectedEvent.title}
                      <br /><span className="text-muted-foreground text-xs">by {selectedEvent.actor.name}</span>
                    </div>
                  </div>
                  {selectedEvent.status.label === "Completed" && (
                    <div className="relative pl-8 flex gap-4">
                      <div className="absolute left-[7px] top-[5px] w-[10px] h-[10px] rounded-full bg-teal ring-4 ring-teal/20" />
                      <div className="w-16 shrink-0 text-xs font-medium text-muted-foreground pt-0.5">{selectedEvent.time}</div>
                      <div className="text-sm text-primary-dark text-teal font-semibold">
                        Marked as Completed
                        <br /><span className="text-muted-foreground text-xs font-normal">Recorded in audit trail</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-card shrink-0 grid grid-cols-2 gap-3">
              <Link href="/action-center" className="py-2.5 px-4 text-indigo text-sm font-semibold border border-indigo/30 rounded-md hover:bg-indigo/5 transition-colors text-center shadow-sm">
                View in Action Center
              </Link>
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
