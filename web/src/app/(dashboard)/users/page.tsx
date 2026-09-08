"use client";

import { Plus, UserPlus, ShieldPlus, MoreVertical, Search, Filter, ChevronRight, ChevronLeft, Mail, Phone, Building, Calendar, Clock, CheckCircle, Edit, Users as UsersIcon, ShieldCheck, UserCheck, Send, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// --- Mock Data ---
const users = [
  { initials: "SP", name: "Sarah Patel", email: "sarah.patel@aarohan.com", department: "Compliance", role: "Compliance Admin", roleColor: "bg-indigo/10 text-indigo border-indigo/20", status: "Active", lastActive: "2 hours ago" },
  { initials: "RK", name: "Rahul Khanna", email: "rahul.khanna@aarohan.com", department: "Risk Management", role: "Risk Analyst", roleColor: "bg-teal/10 text-teal border-teal/20", status: "Active", lastActive: "1 day ago" },
  { initials: "AG", name: "Anita Gupta", email: "anita.gupta@aarohan.com", department: "Legal", role: "Policy Manager", roleColor: "bg-purple-500/10 text-purple-500 border-purple-500/20", status: "Active", lastActive: "3 hours ago" },
  { initials: "VM", name: "Vikram Mehta", email: "vikram.mehta@aarohan.com", department: "IT", role: "Viewer", roleColor: "bg-slate-500/10 text-slate-500 border-slate-500/20", status: "Active", lastActive: "5 hours ago" },
  { initials: "PK", name: "Priya Kulkarni", email: "priya.kulkarni@aarohan.com", department: "Operations", role: "Department User", roleColor: "bg-blue-500/10 text-blue-500 border-blue-500/20", status: "Active", lastActive: "1 day ago" },
  { initials: "AR", name: "Arjun Rao", email: "arjun.rao@aarohan.com", department: "Finance", role: "Risk Analyst", roleColor: "bg-teal/10 text-teal border-teal/20", status: "Active", lastActive: "2 days ago" },
  { initials: "ND", name: "Neha Deshmukh", email: "neha.deshmukh@aarohan.com", department: "Compliance", role: "Policy Manager", roleColor: "bg-purple-500/10 text-purple-500 border-purple-500/20", status: "Active", lastActive: "4 hours ago" },
  { initials: "KT", name: "Karan Tiwari", email: "karan.tiwari@aarohan.com", department: "Internal Audit", role: "Audit Viewer", roleColor: "bg-amber-500/10 text-amber-600 border-amber-500/20", status: "Active", lastActive: "1 day ago" },
  { initials: "SM", name: "Sneha Malhotra", email: "sneha.malhotra@aarohan.com", department: "Executive", role: "Executive Viewer", roleColor: "bg-pink-500/10 text-pink-500 border-pink-500/20", status: "Inactive", lastActive: "7 days ago" },
  { initials: "DY", name: "Devansh Yadav", email: "devansh.yadav@aarohan.com", department: "Business", role: "Department User", roleColor: "bg-blue-500/10 text-blue-500 border-blue-500/20", status: "Pending", lastActive: "-" },
];

const roleDistribution = [
  { name: "Compliance Admin", value: 6, color: "#4969E8" },
  { name: "Policy Manager", value: 8, color: "#8B5CF6" },
  { name: "Risk Analyst", value: 8, color: "#14B8A6" },
  { name: "Department User", value: 12, color: "#3B82F6" },
  { name: "Audit Viewer", value: 4, color: "#F59E0B" },
  { name: "Executive Viewer", value: 4, color: "#EC4899" },
];

export default function Users() {
  const [selectedUser] = useState(users[0]);

  return (
    <div className="space-y-5 flex flex-col h-full text-foreground pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Users &amp; Roles</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold tracking-tight mb-2">Users &amp; Roles</h1>
          <p className="text-muted-foreground text-sm">Manage user access, roles, and permissions for your organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-indigo text-indigo px-4 py-2 rounded text-sm font-medium hover:bg-indigo/5 transition-colors">
            <UserPlus className="w-4 h-4" /> Invite User
          </button>
          <button className="flex items-center gap-2 bg-indigo hover:bg-indigo/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
            <ShieldPlus className="w-4 h-4" /> Create Role
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-4  flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo/10 flex items-center justify-center shrink-0">
            <UsersIcon className="w-5 h-5 text-indigo" />
          </div>
          <div>
            <p className="text-2xl font-bold">42</p>
            <p className="text-[10px] text-muted-foreground font-medium">Total Users</p>
            <p className="text-[10px] text-teal font-medium">↑ 12%</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-4  flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-teal" />
          </div>
          <div>
            <p className="text-2xl font-bold">6</p>
            <p className="text-[10px] text-muted-foreground font-medium">Active Roles</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-4  flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
            <Send className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">5</p>
            <p className="text-[10px] text-muted-foreground font-medium">Pending Invitations</p>
            <p className="text-[10px] text-orange-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" /> Awaiting approval
            </p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-4  flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-[10px] text-muted-foreground font-medium">Admin Users</p>
          </div>
        </div>
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-4  flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
            <Building className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">8</p>
            <p className="text-[10px] text-muted-foreground font-medium">Departments</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left: Table */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tabs */}
          <div className="flex gap-0 border-b border-border mb-4">
            <button className="px-4 py-2.5 text-sm font-medium border-b-2 border-indigo text-indigo">Users</button>
            <button className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Roles</button>
            <button className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Permission Matrix</button>
            <button className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Access Requests</button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search users by name, email, or department..." className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded text-sm outline-none focus:border-indigo" />
            </div>
            <select className="bg-card border border-border px-3 py-2 rounded text-sm outline-none">
              <option>All Departments</option>
            </select>
            <select className="bg-card border border-border px-3 py-2 rounded text-sm outline-none">
              <option>All Roles</option>
            </select>
            <select className="bg-card border border-border px-3 py-2 rounded text-sm outline-none">
              <option>All Statuses</option>
            </select>
            <button className="flex items-center gap-2 border border-border px-3 py-2 rounded text-sm hover:bg-secondary/50 transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          {/* Table */}
          <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]   overflow-hidden flex-1 flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="bg-secondary/20 text-muted-foreground border-b border-border sticky top-0">
                  <tr>
                    <th className="pl-4 pr-2 py-3 w-8"><input type="checkbox" className="rounded border-border" /></th>
                    <th className="px-3 py-3 font-medium">Name</th>
                    <th className="px-3 py-3 font-medium">Email</th>
                    <th className="px-3 py-3 font-medium">Department</th>
                    <th className="px-3 py-3 font-medium">Role</th>
                    <th className="px-3 py-3 font-medium">Status</th>
                    <th className="px-3 py-3 font-medium">Last Active</th>
                    <th className="px-3 py-3 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user, i) => (
                    <tr key={i} className={`hover:bg-secondary/10 transition-colors cursor-pointer ${i === 0 ? 'bg-indigo/5' : ''}`}>
                      <td className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded border-border" /></td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-indigo/10 text-indigo flex items-center justify-center font-bold text-[10px] shrink-0 border border-indigo/20">{user.initials}</div>
                          <span className="font-medium text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground text-xs">{user.email}</td>
                      <td className="px-3 py-3 text-muted-foreground">{user.department}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${user.roleColor}`}>{user.role}</span>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          user.status === 'Active' ? 'bg-teal/10 text-teal border border-teal/20' :
                          user.status === 'Inactive' ? 'bg-red/10 text-red border border-red/20' :
                          'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20'
                        }`}>{user.status}</span>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground text-xs">{user.lastActive}</td>
                      <td className="px-3 py-3 text-center">
                        <button className="p-1 hover:bg-secondary rounded text-muted-foreground"><MoreVertical className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-border flex items-center justify-between text-sm">
              <span className="text-muted-foreground text-xs">Showing 1–10 of 42 users</span>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                <button className="w-8 h-8 rounded flex items-center justify-center bg-indigo text-white text-xs font-medium">1</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors text-xs">2</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors text-xs">3</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors text-xs">4</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors text-xs">5</button>
                <span className="text-muted-foreground px-1">...</span>
                <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"><ChevronRight className="w-4 h-4" /></button>
                <select className="bg-card border border-border px-2 py-1 rounded text-xs outline-none ml-2">
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right: User Detail Panel */}
        <div className="w-[320px] shrink-0 bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]   flex flex-col overflow-y-auto">
          {/* User header */}
          <div className="p-5 border-b border-border flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo/10 text-indigo flex items-center justify-center font-bold text-sm shrink-0 border-2 border-indigo/30">
              {selectedUser.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg truncate">{selectedUser.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-teal/10 text-teal border border-teal/20 shrink-0">Active</span>
              </div>
              <p className="text-xs text-muted-foreground">{selectedUser.role}</p>
            </div>
          </div>

          {/* Detail tabs */}
          <div className="flex border-b border-border">
            <button className="flex-1 px-3 py-2.5 text-xs font-medium border-b-2 border-indigo text-indigo text-center">Overview</button>
            <button className="flex-1 px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors text-center">Roles &amp; Permissions</button>
            <button className="flex-1 px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors text-center">Activity</button>
          </div>

          {/* Details */}
          <div className="p-5 space-y-4 text-sm">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0" /> <span>{selectedUser.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0" /> <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Building className="w-4 h-4 shrink-0" /> <span>{selectedUser.department}</span>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Calendar className="w-4 h-4 shrink-0" /> <span>Joined 12 Jan 2024</span>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Clock className="w-4 h-4 shrink-0" /> <span>Last active {selectedUser.lastActive}</span>
              </div>
            </div>

            {/* Assigned Roles */}
            <div>
              <h4 className="font-semibold mb-2">Assigned Roles</h4>
              <span className="px-2.5 py-1 rounded text-xs font-medium bg-indigo/10 text-indigo border border-indigo/20">{selectedUser.role}</span>
            </div>

            {/* Permissions */}
            <div>
              <h4 className="font-semibold mb-2">Permissions Summary</h4>
              <div className="space-y-1.5">
                {[
                  "Full access to all modules",
                  "Manage users and roles",
                  "Configure organization settings",
                  "View and export audit logs",
                  "Approve critical compliance actions"
                ].map((perm, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-teal shrink-0" /> {perm}
                  </div>
                ))}
              </div>
            </div>

            <button className="flex items-center gap-2 border border-indigo text-indigo px-4 py-2 rounded text-sm font-medium hover:bg-indigo/5 transition-colors w-fit">
              <Edit className="w-4 h-4" /> Edit User
            </button>
          </div>

          {/* Role Distribution */}
          <div className="border-t border-border p-5">
            <h4 className="font-semibold mb-3">Role Distribution</h4>
            <div className="flex items-center gap-4">
              <div className="w-[120px] h-[120px] relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={roleDistribution} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value" stroke="none">
                      {roleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold">42</span>
                  <span className="text-[8px] text-muted-foreground">Users</span>
                </div>
              </div>
              <div className="space-y-1.5 flex-1">
                {roleDistribution.map((role) => (
                  <div key={role.name} className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: role.color }} />
                      <span className="text-muted-foreground truncate">{role.name}</span>
                    </div>
                    <span className="font-semibold text-foreground ml-2">{role.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Access Control */}
          <div className="border-t border-border p-5">
            <h4 className="font-semibold mb-1">Access Control</h4>
            <p className="text-xs text-muted-foreground mb-2">Ensure the right people have the right access to keep your compliance data secure.</p>
            <Link href="#" className="text-indigo text-xs font-medium hover:underline">Learn more →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
