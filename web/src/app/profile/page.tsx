"use client";
import { ChevronRight, Camera, Mail, Phone, MapPin, Calendar, Clock, Edit3, Shield, Bell, Lock, Settings, Download, MoreVertical } from "lucide-react";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-indigo">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">My Profile</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground mt-1 text-base">View and manage your personal information, role, and preferences.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md font-medium text-sm hover:bg-indigo/90 transition-colors shadow-sm">
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-6  flex gap-8">
        <div className="flex flex-col items-center justify-center shrink-0 w-48 border-r border-border pr-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">AS</div>
            <div className="absolute bottom-0 right-0 p-1.5 bg-indigo text-white rounded-full border-2 border-card cursor-pointer"><Camera className="w-3 h-3" /></div>
          </div>
          <h2 className="text-xl font-bold text-center">Aarav Sharma</h2>
          <p className="text-indigo font-medium text-sm mt-1">Compliance Admin</p>
          <div className="flex flex-col gap-1 mt-3 w-full text-xs text-muted-foreground">
             <div className="flex items-center gap-2"><BuildingIcon className="w-3.5 h-3.5" /> Aarohan Bank</div>
             <div className="flex items-center gap-2"><BuildingIcon className="w-3.5 h-3.5" /> Enterprise Workspace</div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-y-6">
          <div className="flex items-start gap-3">
             <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
             <div>
                <div className="text-sm text-foreground">aarav.sharma@aarohan.com <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase">● Active</span></div>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
             <div className="text-sm text-foreground">+91 98765 43210</div>
          </div>
          <div className="flex items-start gap-3">
             <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
             <div className="text-sm text-foreground">Bengaluru, India</div>
          </div>
          <div className="flex items-start gap-3">
             <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
             <div>
               <div className="text-xs text-muted-foreground">Member Since</div>
               <div className="text-sm text-foreground mt-0.5">12 Jan 2024</div>
             </div>
          </div>
          <div className="flex items-start gap-3 col-span-2">
             <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
             <div>
               <div className="text-xs text-muted-foreground">Last Login</div>
               <div className="text-sm text-foreground mt-0.5">20 Aug 2026, 10:24 AM</div>
             </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 font-medium text-sm border-b border-border">
         <div className="text-indigo border-b-2 border-indigo pb-3">Profile Information</div>
         <div className="text-muted-foreground hover:text-foreground pb-3 cursor-pointer">Preferences</div>
         <div className="text-muted-foreground hover:text-foreground pb-3 cursor-pointer">Security & Sessions</div>
         <div className="text-muted-foreground hover:text-foreground pb-3 cursor-pointer">Workspace & Role</div>
         <div className="text-muted-foreground hover:text-foreground pb-3 cursor-pointer">Activity</div>
      </div>

      <div className="flex gap-6 items-start">
        <div className="flex-1 bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-6 ">
           <h3 className="text-lg font-bold mb-6">Personal Information</h3>
           
           <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-1.5">
                 <label className="text-xs text-muted-foreground font-medium">Full Name</label>
                 <input type="text" className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo" defaultValue="Aarav Sharma" />
              </div>
              <div className="space-y-1.5">
                 <label className="text-xs text-muted-foreground font-medium">Email Address</label>
                 <input type="email" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-secondary/50 focus:outline-none focus:border-indigo text-muted-foreground" defaultValue="aarav.sharma@aarohan.com" disabled />
              </div>
              <div className="space-y-1.5">
                 <label className="text-xs text-muted-foreground font-medium">Phone Number</label>
                 <input type="text" className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo" defaultValue="+91 98765 43210" />
              </div>
              <div className="space-y-1.5">
                 <label className="text-xs text-muted-foreground font-medium">Job Title</label>
                 <input type="text" className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo" defaultValue="Compliance Admin" />
              </div>
              <div className="space-y-1.5">
                 <label className="text-xs text-muted-foreground font-medium">Department</label>
                 <input type="text" className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo" defaultValue="Compliance" />
              </div>
              <div className="space-y-1.5">
                 <label className="text-xs text-muted-foreground font-medium">Location</label>
                 <input type="text" className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo" defaultValue="Bengaluru, India" />
              </div>
           </div>

           <div className="space-y-1.5 mb-6">
              <label className="text-xs text-muted-foreground font-medium">About Me</label>
              <textarea className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo h-24 resize-none" defaultValue="Working at the intersection of regulation, data, and technology to build a more compliant and resilient financial ecosystem."></textarea>
              <div className="text-right text-xs text-muted-foreground">92/500</div>
           </div>

           <div className="flex justify-end gap-3 pt-6 border-t border-border">
              <button className="px-4 py-2 border border-border rounded text-sm font-medium hover:bg-secondary transition-colors">Cancel</button>
              <button className="px-4 py-2 bg-indigo text-white rounded text-sm font-medium hover:bg-indigo/90 transition-colors">Save Changes</button>
           </div>
        </div>

        <div className="w-[320px] shrink-0 space-y-6">
           <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-6 ">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold flex items-center gap-2"><Shield className="w-4 h-4 text-indigo" /> Role & Access</h3>
                 <button className="text-indigo border border-indigo rounded px-2 py-1 text-xs font-medium hover:bg-indigo/5">Change Role</button>
              </div>
              <div className="space-y-3">
                 <div className="flex"><div className="w-24 text-xs text-muted-foreground">Role</div><div className="flex-1 text-sm font-medium">Compliance Admin</div></div>
                 <div className="flex"><div className="w-24 text-xs text-muted-foreground">Workspace</div><div className="flex-1 text-sm font-medium">Enterprise Workspace</div></div>
                 <div className="flex"><div className="w-24 text-xs text-muted-foreground">Organization</div><div className="flex-1 text-sm font-medium">Aarohan Bank</div></div>
                 <div className="flex"><div className="w-24 text-xs text-muted-foreground">Access Level</div><div className="flex-1 text-sm font-medium">Full Access</div></div>
                 <div className="flex pt-1"><div className="w-24 text-xs text-muted-foreground">Modules</div><div className="flex-1 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-indigo/10 text-indigo text-[10px] font-medium">Regulatory Feed</span>
                    <span className="px-2 py-0.5 rounded bg-indigo/10 text-indigo text-[10px] font-medium">Impact Analysis</span>
                    <span className="px-2 py-0.5 rounded bg-indigo/10 text-indigo text-[10px] font-medium">Policy Library</span>
                    <span className="px-2 py-0.5 rounded bg-indigo/10 text-indigo text-[10px] font-medium">Compliance</span>
                    <span className="px-2 py-0.5 rounded bg-indigo/10 text-indigo text-[10px] font-medium">Audit & Reporting</span>
                    <span className="px-2 py-0.5 rounded border border-indigo/20 text-indigo text-[10px] font-medium">+3 more</span>
                 </div></div>
              </div>
           </div>

           <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]   overflow-hidden">
              <div className="p-4 font-bold border-b border-border">Quick Actions</div>
              <div className="divide-y divide-border">
                 <div className="p-4 flex gap-3 hover:bg-secondary/30 transition-colors cursor-pointer group">
                    <div className="p-2 rounded bg-indigo/10 text-indigo shrink-0"><Bell className="w-4 h-4" /></div>
                    <div className="flex-1"><p className="text-sm font-medium">Notification Preferences</p><p className="text-xs text-muted-foreground">Manage email and in-app notifications</p></div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo" />
                 </div>
                 <div className="p-4 flex gap-3 hover:bg-secondary/30 transition-colors cursor-pointer group">
                    <div className="p-2 rounded bg-indigo/10 text-indigo shrink-0"><Lock className="w-4 h-4" /></div>
                    <div className="flex-1"><p className="text-sm font-medium">Security & Sessions</p><p className="text-xs text-muted-foreground">View active sessions and security settings</p></div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo" />
                 </div>
                 <div className="p-4 flex gap-3 hover:bg-secondary/30 transition-colors cursor-pointer group">
                    <div className="p-2 rounded bg-indigo/10 text-indigo shrink-0"><Settings className="w-4 h-4" /></div>
                    <div className="flex-1"><p className="text-sm font-medium">Account Settings</p><p className="text-xs text-muted-foreground">Update your account preferences</p></div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo" />
                 </div>
                 <div className="p-4 flex gap-3 hover:bg-secondary/30 transition-colors cursor-pointer group">
                    <div className="p-2 rounded bg-indigo/10 text-indigo shrink-0"><Download className="w-4 h-4" /></div>
                    <div className="flex-1"><p className="text-sm font-medium">Download My Data</p><p className="text-xs text-muted-foreground">Export your profile and activity data</p></div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo" />
                 </div>
              </div>
           </div>

           <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]   p-6">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold">Recent Activity</h3>
                 <button className="text-indigo text-xs font-medium hover:underline">View All</button>
              </div>
              <div className="relative pl-3 space-y-6 before:absolute before:inset-y-1 before:left-3.5 before:w-px before:bg-border">
                 <div className="relative">
                    <div className="absolute -left-5 w-2 h-2 rounded-full bg-indigo ring-4 ring-card top-1.5" />
                    <p className="text-sm font-medium">Logged in from New Device</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">20 Aug 2026, 10:24 AM <span className="ml-1 px-1 py-0.5 rounded bg-secondary text-[9px]">Bengaluru, India</span></p>
                 </div>
                 <div className="relative">
                    <div className="absolute -left-5 w-2 h-2 rounded-full bg-indigo ring-4 ring-card top-1.5" />
                    <p className="text-sm font-medium">Updated notification preferences</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">19 Aug 2026, 04:15 PM</p>
                 </div>
                 <div className="relative">
                    <div className="absolute -left-5 w-2 h-2 rounded-full bg-indigo ring-4 ring-card top-1.5" />
                    <p className="text-sm font-medium">Viewed RBI Master Direction 2026</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">19 Aug 2026, 11:32 AM</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function BuildingIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <path d="M9 22v-4h6v4"></path>
      <path d="M8 6h.01"></path>
      <path d="M16 6h.01"></path>
      <path d="M12 6h.01"></path>
      <path d="M12 10h.01"></path>
      <path d="M12 14h.01"></path>
      <path d="M16 10h.01"></path>
      <path d="M16 14h.01"></path>
      <path d="M8 10h.01"></path>
      <path d="M8 14h.01"></path>
    </svg>
  );
}
