"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Rss, 
  Crosshair, 
  BookOpen, 
  CheckSquare, 
  History,
  Compass,
  GitMerge,
  AlertTriangle,
  Users,
  Settings,
  ChevronRight,
  Building
} from "lucide-react";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/" },
    { name: "Regulatory Feed", icon: Rss, href: "/regulatory-feed" },
    { name: "Impact Analysis", icon: Crosshair, href: "/impact-analysis" },
    { name: "Policy Library", icon: BookOpen, href: "/policy-library" },
    { name: "Action Center", icon: CheckSquare, href: "/action-center" },
    { name: "Audit Trail", icon: History, href: "/audit-trail" },
    
    { section: "INTELLIGENCE", marginTop: "mt-6" },
    { name: "Obligation Explorer", icon: Compass, href: "/obligation-explorer" },
    { name: "Policy Mapping", icon: GitMerge, href: "/policy-mapping" },
    { name: "Risk Heatmap", icon: AlertTriangle, href: "/risk-heatmap" },

    { section: "ADMINISTRATION", marginTop: "mt-6" },
    { name: "Users & Roles", icon: Users, href: "/users" },
    { name: "Settings", icon: Settings, href: "/settings" }
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 w-64 bg-[#08111F] text-white flex flex-col z-40 border-r border-white/5 ${className}`}>
      {/* Logo + Brand */}
      <div className="px-6 pt-5 pb-4 border-b border-white/5 shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 16L16 2L30 16L16 30L2 16Z" fill="#132238"/>
            <path d="M16 2L30 16H16V2Z" fill="#16A394"/>
            <path d="M2 16L16 30V16H2Z" fill="#4969E8"/>
          </svg>
          <div className="flex flex-col">
             <span className="font-bold text-lg leading-tight tracking-wide">NIYAMAI</span>
             <span className="text-[8px] text-muted-foreground uppercase tracking-wider">From Regulation to Action.</span>
          </div>
        </Link>
        <p className="text-xs text-indigo font-medium mt-2">Regulatory Intelligence</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-5 px-3 custom-scrollbar">
        <nav className="flex flex-col gap-1">
          {navItems.map((item, index) => {
            if (item.section) {
              return (
                <div key={index} className={`px-3 mb-2 ${item.marginTop || ""}`}>
                  <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.section}</h3>
                </div>
              );
            }

            const isActive = pathname === item.href;

            return (
              <Link 
                key={index} 
                href={item.href || "#"}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium ${
                  isActive 
                    ? "bg-[#4969E8] text-white shadow-md shadow-[#4969E8]/20" 
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon && <item.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="shrink-0 flex flex-col gap-2 p-4">
         {/* Tagline */}
         <div className="px-1 pb-2">
            <p className="text-[10px] font-semibold text-[#8B9DB4] uppercase tracking-wider leading-relaxed">
               COMPLIANCE TODAY.<br/>
               A STRONGER TOMORROW.
            </p>
         </div>

         {/* Workspace */}
         <Link href="/workspaces" className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#0E1A2C] hover:bg-[#132238] cursor-pointer transition-colors border border-white/5 shadow-sm">
            <div className="w-10 h-10 rounded-md bg-[#16273F] flex items-center justify-center shrink-0">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#A3B5CC]"><path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16"/><path d="M3 21h18"/><path d="M9 7h1"/><path d="M14 7h1"/><path d="M9 11h1"/><path d="M14 11h1"/><path d="M9 15h1"/><path d="M14 15h1"/></svg>
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-[13px] font-bold text-white truncate">Aarohan Bank</p>
               <p className="text-[11px] text-[#8B9DB4] truncate mt-0.5 font-medium">Enterprise Workspace</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/50 shrink-0" />
         </Link>

         {/* User */}
         <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#0E1A2C] hover:bg-[#132238] cursor-pointer transition-colors border border-white/5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#E8EDF5] text-[#08111F] flex items-center justify-center font-bold text-sm shrink-0">
               AS
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-[13px] font-bold text-white truncate">Aarav Sharma</p>
               <p className="text-[11px] text-[#8B9DB4] truncate mt-0.5 font-medium">Compliance Admin</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/50 shrink-0" />
         </div>
      </div>
    </aside>
  );
}

