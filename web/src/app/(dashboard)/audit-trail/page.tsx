"use client";
import { ChevronRight, Search, Filter, ShieldCheck, FileText, CheckCircle2, User, Download, Users, Database, Calendar, RotateCcw, CheckSquare, Square, FileCheck, BarChart2, FileSearch, CloudDownload, FilePlus, Settings, FileEdit, AlertTriangle, MoreVertical, X, ArrowUp, ChevronLeft, ChevronDown, Check, File, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { api } from "@/lib/api/client";
import { toast } from "sonner";

export default function AuditTrail() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await api.recentActivity(50);
        // Map to UI format
        const mapped = data.map((d: any) => ({
          id: d.id,
          date: new Date(d.timestamp).toLocaleDateString(),
          time: new Date(d.timestamp).toLocaleTimeString(),
          title: d.event || "System Event",
          details: d.source_document || `Entity ID: ${d.entity_id}`,
          actor: { initials: d.actor ? d.actor.substring(0,2).toUpperCase() : "AI", name: d.actor || "Niyamai AI System", dept: "", type: d.actor && !d.actor.includes("Pipeline") ? "human" : "ai" },
          status: { label: d.entity_type || "system", color: "text-indigo bg-indigo/10" },
          icon: d.entity_type === "action" ? <FileCheck className="w-5 h-5 text-indigo" /> : d.entity_type === "mapping" ? <CheckSquare className="w-5 h-5 text-teal" /> : <FileSearch className="w-5 h-5 text-purple-500" />,
          iconBg: d.entity_type === "action" ? "bg-indigo/10" : d.entity_type === "mapping" ? "bg-teal/10" : "bg-purple-100",
        }));
        setEvents(mapped);
        if (mapped.length > 0) setSelectedEventId(mapped[0].id);
      } catch {
        // err
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const selectedEvent = events.find(e => e.id === selectedEventId);
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
          <h1 className="font-serif text-3xl font-bold tracking-tight text-primary-dark">Audit Trail</h1>
          <p className="text-muted-foreground mt-2 text-base">Complete traceability of regulatory intelligence, analysis and actions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => toast.success("Downloading Audit Log...")} className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-primary-dark rounded-md font-semibold text-sm hover:bg-secondary transition-colors shadow-sm">
            <Download className="w-4 h-4 text-indigo" /> Export Audit Log
          </button>
          <button onClick={() => toast.info("Opening advanced filters...")} className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md font-semibold text-sm hover:bg-indigo/90 transition-colors shadow-sm">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-indigo" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Total Events (30d)</p>
            <p className="text-2xl font-bold text-primary-dark mt-1">{loading ? "…" : events.length}</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6 text-[#8b5cf6]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">AI Decisions</p>
            <p className="text-2xl font-bold text-primary-dark mt-1">{loading ? "…" : events.filter(e => e.actor.type === 'ai').length}</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-teal" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Human Reviews</p>
            <p className="text-2xl font-bold text-primary-dark mt-1">{loading ? "…" : events.filter(e => e.actor.type === 'human').length}</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">System Alerts</p>
            <p className="text-2xl font-bold text-primary-dark mt-1">0</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        
        {/* Left: Events List */}
        <div className="flex-1 bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex flex-col overflow-hidden">
          
          <div className="p-4 border-b border-border bg-secondary/10 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search event ID, actor, or details..." className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded text-sm outline-none focus:border-indigo" />
            </div>
            <select className="bg-card border border-border px-3 py-2 rounded text-sm outline-none text-foreground font-medium w-40">
              <option>All Event Types</option>
            </select>
            <select className="bg-card border border-border px-3 py-2 rounded text-sm outline-none text-foreground font-medium w-36">
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-12 flex justify-center text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin" /></div>
            ) : events.length === 0 ? (
               <div className="p-12 text-center text-muted-foreground">No events found.</div>
            ) : (
              <div className="divide-y divide-border">
                {events.map((evt) => (
                  <div 
                    key={evt.id} 
                    onClick={() => setSelectedEventId(evt.id)}
                    className={`p-4 cursor-pointer transition-colors flex gap-4 ${selectedEventId === evt.id ? "bg-indigo/5" : "hover:bg-secondary/30"}`}
                  >
                    <div className="flex flex-col items-center justify-start pt-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${evt.iconBg}`}>
                        {evt.icon}
                      </div>
                      {/* Timeline connector (visual only) */}
                      <div className="w-px h-full bg-border mt-2 hidden" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary-dark">{evt.title}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${evt.status.color}`}>
                            {evt.status.label}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground text-right whitespace-nowrap shrink-0 ml-4">
                          <span className="font-medium text-foreground">{evt.date}</span>
                          <span className="mx-1.5">•</span>
                          <span>{evt.time}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-foreground/80 mb-3 truncate">{evt.details}</p>
                      
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                          <span className="font-mono text-[10px] bg-secondary px-1.5 py-0.5 rounded border border-border">{evt.id}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${evt.actor.type === 'ai' ? 'bg-[#8b5cf6]' : 'bg-slate-600'}`}>
                            {evt.actor.initials}
                          </div>
                          <span>{evt.actor.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Event Details Panel */}
        {selectedEvent && (
          <div className="w-full lg:w-[450px] bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] flex flex-col overflow-hidden shrink-0 h-fit sticky top-6">
            <div className="p-5 border-b border-border bg-secondary/10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${selectedEvent.status.color}`}>
                    {selectedEvent.status.label}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{selectedEvent.id}</span>
                </div>
                <h2 className="font-serif text-xl font-bold leading-tight">{selectedEvent.title}</h2>
              </div>
            </div>

            <div className="p-5 space-y-6">
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm border-b border-border pb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Date &amp; Time</p>
                  <p className="font-medium">{selectedEvent.date} {selectedEvent.time}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Actor</p>
                  <div className="flex items-center gap-1.5 font-medium">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${selectedEvent.actor.type === 'ai' ? 'bg-[#8b5cf6]' : 'bg-slate-600'}`}>
                      {selectedEvent.actor.initials}
                    </div>
                    {selectedEvent.actor.name}
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Event Details</p>
                  <p className="text-sm">{selectedEvent.details}</p>
                </div>
              </div>

              <div>
                <button 
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="flex items-center justify-between w-full text-sm font-bold bg-secondary/30 p-2 rounded hover:bg-secondary/50 transition-colors"
                >
                  Raw System Payload (JSON)
                  {detailsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                
                {detailsOpen && (
                  <div className="mt-2 bg-[#1e293b] rounded p-3 overflow-x-auto">
                    <pre className="text-[11px] text-[#a5b4fc] font-mono leading-relaxed">
{`{
  "eventId": "${selectedEvent.id}",
  "timestamp": "${selectedEvent.date}T${selectedEvent.time}",
  "eventType": "${selectedEvent.status.label.toUpperCase()}",
  "actor": {
    "id": "${selectedEvent.actor.type === 'ai' ? 'sys-ai-core' : 'usr-4091'}",
    "type": "${selectedEvent.actor.type}",
    "name": "${selectedEvent.actor.name}"
  },
  "payload": {
    "description": "${selectedEvent.details}",
    "status": "SUCCESS"
  }
}`}
                    </pre>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
