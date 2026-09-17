"use client";
import { Search, Bell, HelpCircle, ChevronDown, User, LogOut, Settings as SettingsIcon, Menu, AlertTriangle, Shield, FileCheck } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/sidebar";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription as UIDialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";

export function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="h-16 bg-[#08111F] text-white flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 flex-1 max-w-2xl min-w-0">
        <Sheet>
          <SheetTrigger className="md:hidden p-2 -ml-2 rounded-md hover:bg-white/5 transition-colors shrink-0">
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-[#08111F] border-white/10">
            <VisuallyHidden>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Mobile navigation menu</SheetDescription>
            </VisuallyHidden>
            <Sidebar className="!static !w-full h-full border-0" />
          </SheetContent>
        </Sheet>
        <div className="relative group cursor-pointer flex-1 min-w-0" onClick={() => setSearchOpen(true)}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
          <div className="w-full h-10 pl-10 pr-4 bg-[#132238] border border-transparent rounded-md text-sm flex items-center text-muted-foreground group-hover:border-indigo transition-all truncate">
            <span className="hidden sm:inline">Search regulations, clauses, policies, institutions...</span>
            <span className="sm:hidden">Search...</span>
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded bg-[#0D1828] px-1.5 font-mono text-[10px] font-medium text-muted-foreground border border-white/10">
              <span>Ctrl</span> <span>K</span>
            </kbd>
          </div>
        </div>
      </div>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 gap-0">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <UIDialogDescription className="sr-only">Search regulations and policies</UIDialogDescription>
          <div className="flex items-center px-4 py-3 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground mr-3" />
            <input 
              autoFocus
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" 
              placeholder="Search..." 
            />
          </div>
          <div className="p-4 py-6 text-center text-sm text-muted-foreground">
            No recent searches. Type to find regulations or policies.
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-4 ml-6">
        <Link href="/workspaces" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 cursor-pointer transition-colors text-sm font-medium">
          <div className="w-2 h-2 rounded-full bg-teal" />
          <span>Enterprise Workspace</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Link>

        <Popover>
          <PopoverTrigger className="relative p-2 rounded-full hover:bg-white/5 transition-colors text-white">
             <Bell className="w-5 h-5" />
             {unreadCount > 0 && (
               <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-red text-[8px] font-bold flex items-center justify-center border-2 border-[#08111F]">
                 {unreadCount}
               </div>
             )}
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0 border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]" align="end">
            <div className="p-4 border-b border-border flex justify-between items-center bg-card">
               <span className="font-bold text-sm flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</span>
               {unreadCount > 0 && (
                 <button 
                   onClick={() => setUnreadCount(0)}
                   className="text-xs text-indigo font-semibold hover:underline"
                 >
                   Mark all as read
                 </button>
               )}
            </div>
            <div className="divide-y divide-border max-h-[350px] overflow-y-auto">
               <div className={`p-4 hover:bg-secondary/30 transition-colors cursor-pointer flex gap-4 items-start ${unreadCount > 0 ? "bg-indigo/5" : ""}`}>
                 <div className="w-8 h-8 rounded-full bg-indigo/10 text-indigo flex items-center justify-center shrink-0 mt-1">
                   <AlertTriangle className="w-4 h-4" />
                 </div>
                 <div className="flex-1">
                   <div className="flex items-center justify-between">
                     <p className="text-sm font-bold text-foreground">New Regulatory Update</p>
                     {unreadCount > 0 && <div className="w-2 h-2 rounded-full bg-indigo shrink-0" />}
                   </div>
                   <p className="text-xs text-muted-foreground mt-1">RBI KYC Master Direction amendment requires your immediate attention regarding V-CIP procedures.</p>
                   <p className="text-[10px] text-indigo mt-2 font-mono font-bold">10 MINS AGO</p>
                 </div>
               </div>
               
               <div className={`p-4 hover:bg-secondary/30 transition-colors cursor-pointer flex gap-4 items-start ${unreadCount > 1 ? "bg-indigo/5" : ""}`}>
                 <div className="w-8 h-8 rounded-full bg-red/10 text-red flex items-center justify-center shrink-0 mt-1">
                   <Shield className="w-4 h-4" />
                 </div>
                 <div className="flex-1">
                   <div className="flex items-center justify-between">
                     <p className="text-sm font-bold text-foreground">Policy Gap Detected</p>
                     {unreadCount > 1 && <div className="w-2 h-2 rounded-full bg-indigo shrink-0" />}
                   </div>
                   <p className="text-xs text-muted-foreground mt-1">Automated analysis found a new gap in 'Customer Onboarding Policy v2.1'.</p>
                   <p className="text-[10px] text-muted-foreground mt-2 font-mono font-bold">1 HOUR AGO</p>
                 </div>
               </div>

               <div className={`p-4 hover:bg-secondary/30 transition-colors cursor-pointer flex gap-4 items-start ${unreadCount > 2 ? "bg-indigo/5" : ""}`}>
                 <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-1">
                   <FileCheck className="w-4 h-4" />
                 </div>
                 <div className="flex-1">
                   <div className="flex items-center justify-between">
                     <p className="text-sm font-bold text-foreground">Action Assigned</p>
                     {unreadCount > 2 && <div className="w-2 h-2 rounded-full bg-indigo shrink-0" />}
                   </div>
                   <p className="text-xs text-muted-foreground mt-1">You have been assigned to update the customer verification procedure (ACT-2041).</p>
                   <p className="text-[10px] text-muted-foreground mt-2 font-mono font-bold">2 HOURS AGO</p>
                 </div>
               </div>
            </div>
            <div className="p-3 border-t border-border bg-secondary/20 text-center">
              <button className="text-xs font-bold text-foreground hover:text-indigo transition-colors w-full">
                View all notifications
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <button className="p-2 rounded-full hover:bg-white/5 transition-colors text-white">
          <HelpCircle className="w-5 h-5" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-8 h-8 rounded-full bg-white text-[#08111F] flex items-center justify-center font-bold text-sm cursor-pointer ml-2 hover:ring-2 hover:ring-white/50 transition-all outline-none">
            AS
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                 <div className="flex flex-col">
                    <span className="font-medium text-foreground">Aarav Sharma</span>
                    <span className="text-xs text-muted-foreground font-normal">Compliance Admin</span>
                 </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Link href="/profile">
               <DropdownMenuItem className="cursor-pointer"><User className="mr-2 w-4 h-4" /> My Profile</DropdownMenuItem>
            </Link>
            <Link href="/settings">
               <DropdownMenuItem className="cursor-pointer"><SettingsIcon className="mr-2 w-4 h-4" /> Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href="/login">
               <DropdownMenuItem className="cursor-pointer text-red focus:text-red"><LogOut className="mr-2 w-4 h-4" /> Sign Out</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
