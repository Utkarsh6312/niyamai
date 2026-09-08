"use client";

import { Save, Settings as SettingsIcon, Bell, Database, Sparkles, Shield, Palette, Link as LinkIcon, FileText, Trash2, Info, Building, MapPin, Globe, Hash, Calendar, CheckCircle2, Download, RotateCcw, Key, HelpCircle, ExternalLink, Edit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const sidebarNav = [
  { name: "General", icon: SettingsIcon, description: "Organization details and basic settings", active: true },
  { name: "Notifications", icon: Bell, description: "Manage alerts and preferences", active: false },
  { name: "Regulatory Sources", icon: Database, description: "Configure data sources and updates", active: false },
  { name: "AI & Analysis", icon: Sparkles, description: "Set analysis preferences", active: false },
  { name: "Security & Privacy", icon: Shield, description: "Access, data and security controls", active: false },
  { name: "Appearance", icon: Palette, description: "Theme, language and display", active: false },
  { name: "Integrations", icon: LinkIcon, description: "Connect with other systems", active: false },
  { name: "Audit & Logs", icon: FileText, description: "System activity and logs", active: false },
  { name: "Data Management", icon: Trash2, description: "Retention and cleanup", active: false },
  { name: "About", icon: Info, description: "Version, licensing and support", active: false },
];

export default function Settings() {
  const [enableAI, setEnableAI] = useState(true);
  const [enableReminders, setEnableReminders] = useState(true);
  const [enableVisibility, setEnableVisibility] = useState(true);
  const [enableBeta, setEnableBeta] = useState(false);

  return (
    <div className="space-y-6 flex flex-col h-full text-foreground pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="mx-1">›</span>
        <span className="text-foreground">Settings</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-muted-foreground text-sm">Configure your workspace, preferences, and system settings.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors shadow-sm">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="flex gap-6 items-start">
        {/* Left Nav */}
        <div className="w-72 shrink-0 bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] overflow-hidden py-2">
          {sidebarNav.map((item) => (
            <div 
              key={item.name} 
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-l-2 ${
                item.active 
                  ? "bg-blue-50/50 border-[#2563EB]" 
                  : "border-transparent hover:bg-slate-50"
              }`}
            >
              <div className={`mt-0.5 ${item.active ? "text-[#2563EB]" : "text-slate-500"}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-sm font-semibold ${item.active ? "text-[#0F172A]" : "text-slate-700"}`}>{item.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Center Content */}
        <div className="flex-1 space-y-6">
          <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-6">
            <h2 className="font-serif text-xl font-bold text-[#0F172A] mb-1">General Settings</h2>
            <p className="text-sm text-slate-500 mb-6">Manage your organization's basic information and preferences.</p>

            <h3 className="text-sm font-bold text-[#0F172A] mb-4">Organization Information</h3>
            <div className="grid grid-cols-2 gap-5 mb-8">
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Organization Name</label>
                <input type="text" defaultValue="Aarohan Bank" className="w-full border border-border rounded-md px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Workspace Type</label>
                <select className="w-full border border-border rounded-md px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white">
                  <option>Enterprise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Industry Sector</label>
                <select className="w-full border border-border rounded-md px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white">
                  <option>Banking & Financial Services</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Timezone</label>
                <select className="w-full border border-border rounded-md px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white">
                  <option>(GMT+5:30) India Standard Time</option>
                </select>
              </div>
            </div>

            <h3 className="text-sm font-bold text-[#0F172A] mb-4 border-t border-slate-100 pt-6">Workspace Preferences</h3>
            <div className="grid grid-cols-2 gap-5 mb-8">
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Default Landing Page</label>
                <select className="w-full border border-border rounded-md px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white">
                  <option>Overview</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Items per Page</label>
                <select className="w-full border border-border rounded-md px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white">
                  <option>10</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Date Format</label>
                <select className="w-full border border-border rounded-md px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white">
                  <option>DD MMM YYYY (e.g., 20 Aug 2026)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Number Format</label>
                <select className="w-full border border-border rounded-md px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white">
                  <option>Indian (1,00,000.00)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Default Regulation View</label>
                <select className="w-full border border-border rounded-md px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white">
                  <option>All Regulations</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Default Impact Level Filter</label>
                <select className="w-full border border-border rounded-md px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white">
                  <option>All Impacts</option>
                </select>
              </div>
            </div>

            <h3 className="text-sm font-bold text-[#0F172A] mb-4 border-t border-slate-100 pt-6">Feature Preferences</h3>
            <div className="space-y-5">
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setEnableAI(!enableAI)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${enableAI ? 'bg-[#2563EB]' : 'bg-slate-300'}`}
                >
                  <span className="sr-only">Use setting</span>
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enableAI ? 'translate-x-2' : '-translate-x-2'}`} />
                </button>
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">Enable AI-powered impact analysis</p>
                  <p className="text-xs text-slate-500 mt-0.5">Use AI to identify obligations and risks</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setEnableReminders(!enableReminders)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${enableReminders ? 'bg-[#2563EB]' : 'bg-slate-300'}`}
                >
                  <span className="sr-only">Use setting</span>
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enableReminders ? 'translate-x-2' : '-translate-x-2'}`} />
                </button>
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">Show regulatory deadline reminders</p>
                  <p className="text-xs text-slate-500 mt-0.5">Get notified about upcoming compliance deadlines</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setEnableVisibility(!enableVisibility)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${enableVisibility ? 'bg-[#2563EB]' : 'bg-slate-300'}`}
                >
                  <span className="sr-only">Use setting</span>
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enableVisibility ? 'translate-x-2' : '-translate-x-2'}`} />
                </button>
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">Enable cross-department visibility</p>
                  <p className="text-xs text-slate-500 mt-0.5">Allow viewing of compliance data across departments</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setEnableBeta(!enableBeta)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${enableBeta ? 'bg-[#2563EB]' : 'bg-slate-300'}`}
                >
                  <span className="sr-only">Use setting</span>
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enableBeta ? 'translate-x-2' : '-translate-x-2'}`} />
                </button>
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">Enable beta features</p>
                  <p className="text-xs text-slate-500 mt-0.5">Access new features before general release</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[320px] shrink-0 space-y-6">
          
          {/* Workspace Summary */}
          <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-bold text-[#0F172A]">Workspace Summary</h3>
              <button className="flex items-center gap-1.5 border border-border text-[#2563EB] px-2.5 py-1 rounded text-xs font-medium hover:bg-slate-50 transition-colors">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
            <div className="p-5 space-y-5 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                  <Building className="w-6 h-6 text-[#2563EB]" />
                </div>
                <div>
                  <p className="font-bold text-[#0F172A] text-base">Aarohan Bank</p>
                  <p className="text-xs text-slate-500">Enterprise Workspace</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Industry</span>
                  <span className="font-medium text-[#2563EB]">Banking & Financial Services</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timezone</span>
                  <span className="font-medium text-[#2563EB]">GMT+5:30 (India Standard Time)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Language</span>
                  <span className="font-medium text-[#2563EB]">English (India)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Workspace ID</span>
                  <span className="font-medium text-[#0F172A]">AB-ENT-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Member Since</span>
                  <span className="font-medium text-[#0F172A]">12 Jan 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5">
            <h3 className="font-bold text-[#0F172A] mb-3">System Status</h3>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-700 text-sm">All Systems Operational</p>
                <p className="text-xs text-slate-500 mt-0.5">Last checked: 20 Aug 2026, 02:15 PM</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]">
            <div className="p-4 border-b border-border">
              <h3 className="font-bold text-[#0F172A]">Quick Actions</h3>
            </div>
            <div className="p-2">
              <button className="w-full flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left group">
                <div className="w-8 h-8 rounded bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">Export Settings</p>
                  <p className="text-xs text-slate-500">Download your current configuration</p>
                </div>
              </button>
              
              <button className="w-full flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left group">
                <div className="w-8 h-8 rounded bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">Reset to Default</p>
                  <p className="text-xs text-slate-500">Restore default settings</p>
                </div>
              </button>

              <button className="w-full flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left group">
                <div className="w-8 h-8 rounded bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">Manage API Keys</p>
                  <p className="text-xs text-slate-500">View and manage API credentials</p>
                </div>
              </button>
            </div>
          </div>

          {/* Help */}
          <div className="bg-white border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F172A]">Need Help?</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Visit our documentation or contact support for assistance with settings.</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 border border-[#2563EB] text-[#2563EB] px-4 py-2 rounded text-sm font-medium hover:bg-blue-50 transition-colors">
              View Documentation <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
