"use client";

import { 
  Building2, TrendingUp, Shield, Database, Globe, Plus, 
  Search, Grid, List as ListIcon, FileText, UserPlus, 
  GitMerge, FileSearch, FilePlus, Users, Settings, 
  Headset, ExternalLink, ArrowRight, MoreVertical
} from "lucide-react";
import Link from "next/link";

export default function WorkspacesPage() {
  const workspaces = [
    {
      id: "aarohan-bank",
      name: "Aarohan Bank",
      type: "Enterprise Workspace",
      industry: "Banking & Financial Services",
      metrics: { obligations: 348, actions: 42, regulations: 12 },
      isCurrent: true,
      icon: <Building2 className="w-6 h-6 text-indigo" />,
      color: "indigo"
    },
    {
      id: "aarohan-capital",
      name: "Aarohan Capital",
      type: "Subsidiary Workspace",
      industry: "Asset Management",
      metrics: { obligations: 124, actions: 18, regulations: 6 },
      isCurrent: false,
      icon: <TrendingUp className="w-6 h-6 text-indigo" />,
      color: "indigo"
    },
    {
      id: "aarohan-insurance",
      name: "Aarohan Insurance",
      type: "Subsidiary Workspace",
      industry: "Insurance",
      metrics: { obligations: 96, actions: 21, regulations: 8 },
      isCurrent: false,
      icon: <Shield className="w-6 h-6 text-indigo" />,
      color: "indigo"
    },
    {
      id: "aarohan-fintech",
      name: "Aarohan Fintech",
      type: "Subsidiary Workspace",
      industry: "Digital Financial Services",
      metrics: { obligations: 76, actions: 14, regulations: 5 },
      isCurrent: false,
      icon: <Database className="w-6 h-6 text-indigo" />,
      color: "indigo"
    },
    {
      id: "aarohan-global",
      name: "Aarohan Global",
      type: "Subsidiary Workspace",
      industry: "International Operations",
      metrics: { obligations: 58, actions: 11, regulations: 9 },
      isCurrent: false,
      icon: <Globe className="w-6 h-6 text-indigo" />,
      color: "indigo"
    }
  ];

  const activityLog = [
    {
      id: 1,
      title: "RBI KYC Master Direction 2026",
      desc: "added to Aarohan Bank",
      time: "2 hours ago",
      icon: <FileText className="w-4 h-4 text-blue-500" />,
      bg: "bg-blue-500/10"
    },
    {
      id: 2,
      title: "New user invited",
      desc: "priya.kulkarni@aarohan.com",
      time: "4 hours ago",
      icon: <UserPlus className="w-4 h-4 text-purple-500" />,
      bg: "bg-purple-500/10"
    },
    {
      id: 3,
      title: "Policy mapping updated",
      desc: "(3 policies)",
      time: "6 hours ago",
      icon: <GitMerge className="w-4 h-4 text-green-500" />,
      bg: "bg-green-500/10"
    },
    {
      id: 4,
      title: "Impact analysis completed",
      desc: "AML Guidelines 2026",
      time: "1 day ago",
      icon: <FileSearch className="w-4 h-4 text-blue-500" />,
      bg: "bg-blue-500/10"
    },
    {
      id: 5,
      title: "New workspace created",
      desc: "Aarohan Fintech",
      time: "2 days ago",
      icon: <FilePlus className="w-4 h-4 text-red" />,
      bg: "bg-red/10"
    }
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-6 h-full text-foreground pb-10">
      
      {/* Main Content Area */}
      <div className="flex-1 space-y-6 min-w-0">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary-dark">Enterprise Workspace</h1>
            <p className="text-muted-foreground mt-1">Select and manage your organization's regulatory workspace.</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-indigo/90 transition-colors shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" /> Create Workspace
          </button>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-xl overflow-hidden bg-[#0d1828] text-white p-8 sm:p-10 min-h-[220px] flex items-center shadow-md">
          {/* Decorative mountain-like background element */}
          <div className="absolute right-0 bottom-0 top-0 w-2/3 opacity-30 pointer-events-none">
             <div className="absolute inset-0 bg-gradient-to-r from-[#0d1828] to-transparent z-10" />
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-indigo/40">
               <polygon points="100,100 0,100 50,0 75,50 85,30" />
             </svg>
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-white/10 absolute top-0 left-0">
               <polygon points="100,100 20,100 60,10 80,60 90,40" />
             </svg>
             {/* Connecting nodes overlay */}
             <div className="absolute right-[20%] top-[40%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
             <div className="absolute right-[10%] top-[60%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
             <div className="absolute right-[30%] top-[80%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
             <svg className="absolute inset-0 w-full h-full stroke-white/30" fill="none">
                <path d="M 70% 80% L 80% 40% L 90% 60%" strokeWidth="1.5" strokeDasharray="4 4" />
             </svg>
          </div>

          <div className="relative z-20 max-w-xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/70 mb-3 uppercase">Welcome to Niyamai</p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Turn Regulatory Change<br />
              into <span className="text-teal-400">Confident Action</span>
            </h2>
            <p className="text-white/80">Choose a workspace to continue, or create a new one.</p>
          </div>
          
          <div className="relative z-20 ml-auto hidden md:flex flex-col items-end text-right">
             <div className="flex flex-col gap-1 text-sm font-medium tracking-wide">
                <span>Monitor</span>
                <span>Analyze</span>
                <span>Comply</span>
                <span>Lead</span>
             </div>
             <p className="text-[10px] uppercase tracking-widest text-white/50 mt-8 mt-auto">A More<br/>Compliant Tomorrow</p>
          </div>
        </div>

        {/* Workspaces Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-primary-dark">Your Workspaces</h3>
              <p className="text-sm text-muted-foreground mt-1">Access and manage the regulatory workspaces you are part of.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search workspaces..." className="pl-9 pr-4 py-2 border border-border rounded-md text-sm bg-card w-full sm:w-64 focus:outline-none focus:border-indigo transition-colors" />
              </div>
              <select className="border border-border bg-card rounded-md px-3 py-2 text-sm font-medium focus:outline-none hidden sm:block">
                <option>Last Accessed</option>
                <option>A-Z</option>
                <option>Z-A</option>
              </select>
              <div className="flex items-center border border-border rounded-md bg-card p-1 hidden sm:flex">
                <button className="p-1 rounded bg-indigo/10 text-indigo"><Grid className="w-4 h-4" /></button>
                <button className="p-1 rounded text-muted-foreground hover:bg-secondary/50 transition-colors"><ListIcon className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workspaces.map((ws) => (
              <div key={ws.id} className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-5 flex flex-col  hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo/10 flex items-center justify-center shrink-0">
                    {ws.icon}
                  </div>
                  <button className="text-muted-foreground hover:text-primary-dark p-1">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold text-primary-dark">{ws.name}</h4>
                    {ws.isCurrent && (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal/10 text-teal rounded-md">Current</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{ws.type}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                     <Building2 className="w-3.5 h-3.5" />
                     <span>{ws.industry}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div>
                    <div className="text-lg font-bold text-primary-dark">{ws.metrics.obligations}</div>
                    <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Obligations</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary-dark">{ws.metrics.actions}</div>
                    <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Open Actions</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary-dark">{ws.metrics.regulations}</div>
                    <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Regulations</div>
                  </div>
                </div>

                <div className="mt-auto">
                  <button className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition-colors ${
                    ws.isCurrent 
                      ? "bg-indigo text-white hover:bg-indigo/90" 
                      : "bg-indigo/5 text-indigo hover:bg-indigo/10"
                  }`}>
                    Open Workspace <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Create New Workspace Card */}
            <div className="border-2 border-dashed border-border rounded-xl p-5 flex flex-col items-center justify-center text-center bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer min-h-[280px]">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-indigo mb-4">
                <Plus className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-primary-dark mb-2">Create New Workspace</h4>
              <p className="text-sm text-muted-foreground mb-6 max-w-[200px]">Set up a new workspace for a business unit, subsidiary, or region.</p>
              <button className="px-6 py-2 border border-border bg-card text-primary-dark rounded-md font-semibold text-sm hover:bg-secondary transition-colors">
                Create Workspace
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-secondary/30 border border-border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-primary-dark text-lg">One Platform. Multiple Workspaces.</h4>
              <p className="text-sm text-muted-foreground">Manage regulatory obligations, policies, and compliance activities across all your business units — securely and efficiently.</p>
            </div>
          </div>
          <div className="flex items-center gap-8 shrink-0 divide-x divide-border">
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-indigo">5</div>
              <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-1">Workspaces</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-indigo">702</div>
              <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-1">Total Obligations</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-indigo">106</div>
              <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-1">Open Actions</div>
            </div>
            <div className="text-center pl-4">
              <div className="text-2xl font-bold text-indigo">40</div>
              <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-1">Active Users</div>
            </div>
          </div>
        </div>

      </div>

      {/* Right Sidebar */}
      <div className="w-full xl:w-[320px] shrink-0 space-y-6">
        
        {/* Workspace Activity */}
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  ">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-primary-dark">Workspace Activity</h3>
            <Link href="#" className="text-xs font-semibold text-indigo hover:underline">View All</Link>
          </div>
          <div className="p-2">
            {activityLog.map((log) => (
              <div key={log.id} className="flex gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${log.bg}`}>
                  {log.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary-dark truncate">{log.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{log.desc}</p>
                </div>
                <div className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0 pt-0.5">
                  {log.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  ">
          <div className="p-5 border-b border-border">
            <h3 className="font-bold text-primary-dark">Quick Actions</h3>
          </div>
          <div className="p-2">
            <div className="flex gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-md bg-indigo/10 flex items-center justify-center shrink-0">
                <Plus className="w-4 h-4 text-indigo" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary-dark">Create New Workspace</p>
                <p className="text-xs text-muted-foreground mt-0.5">Add a new business unit or subsidiary</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-md bg-indigo/10 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-indigo" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary-dark">Manage Users</p>
                <p className="text-xs text-muted-foreground mt-0.5">Invite and manage team members</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-md bg-indigo/10 flex items-center justify-center shrink-0">
                <Settings className="w-4 h-4 text-indigo" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary-dark">Configure Settings</p>
                <p className="text-xs text-muted-foreground mt-0.5">Set workspace preferences</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-md bg-indigo/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-indigo" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary-dark">View Audit Logs</p>
                <p className="text-xs text-muted-foreground mt-0.5">Track workspace activity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help? */}
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]   p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo">
              <Headset className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-primary-dark">Need Help?</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Visit our documentation or contact support for assistance with workspace management.
          </p>
          <button className="w-full py-2 border border-border rounded-md text-sm font-semibold flex items-center justify-center gap-2 hover:bg-secondary transition-colors">
            View Documentation <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
