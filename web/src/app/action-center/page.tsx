"use client";
import { ChevronRight, Search, MoreVertical, CheckCircle2, AlertTriangle, Clock, FileText, RefreshCcw, PieChart, Plus, Columns, X } from "lucide-react";
import Link from "next/link";
import { RiskBadge, StatusBadge } from "@/components/ui/badges";
import { useState } from "react";
import { toast } from "sonner";
import { complianceActions } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

type Action = typeof complianceActions[0];

export default function ActionCenter() {
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [actions, setActions] = useState(complianceActions);

  const openActionDetail = (row: Action) => {
    setSelectedAction(row);
  };

  const closePanel = () => {
    setSelectedAction(null);
  };

  const handleMarkComplete = () => {
    if (!selectedAction) return;
    setActions(prev => prev.map(a => a.id === selectedAction.id ? { ...a, status: "Completed" } : a));
    setSelectedAction({ ...selectedAction, status: "Completed" });
    toast.success(`Action ${selectedAction.id} marked complete`, {
      description: "Audit trail updated with completion timestamp."
    });
  };

  return (
    <>
      <div className="space-y-6 pb-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-indigo">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Action Center</span>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compliance Action Center</h1>
            <p className="text-muted-foreground mt-1 text-base">Convert regulatory findings into accountable implementation tasks.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-background border border-indigo text-indigo rounded-md text-sm font-semibold hover:bg-indigo/5 transition-colors">
              <Columns className="w-4 h-4" /> View Kanban
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-md text-sm font-semibold hover:bg-indigo/90 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Create Action
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-5 gap-4">
          <MetricCard
            icon={<CheckCircle2 className="w-5 h-5 text-indigo" />} iconBg="bg-indigo/10 border border-indigo/20"
            value="63" label="Open Actions" trend="8%" isPositive={true} />
          <MetricCard
            icon={<AlertTriangle className="w-5 h-5 text-red" />} iconBg="bg-red/10 border border-red/20"
            value="14" label="Critical" trend="2%" isPositive={true} />
          <MetricCard
            icon={<RefreshCcw className="w-5 h-5 text-indigo" />} iconBg="bg-indigo/10 border border-indigo/20"
            value="28" label="In Progress" trend="12%" isPositive={false} />
          <MetricCard
            icon={<Clock className="w-5 h-5 text-amber" />} iconBg="bg-amber/10 border border-amber/20"
            value="21" label="Pending" trend="18%" isPositive={false} />
          <MetricCard
            icon={<PieChart className="w-5 h-5 text-teal" />} iconBg="bg-teal/10 border border-teal/20"
            value="92%" label="On Track" trend="6%" isPositive={true} />
        </div>

        {/* Table Card */}
        <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  ">
          {/* Tabs */}
          <div className="flex items-center gap-6 px-4 border-b border-border overflow-x-auto">
            {["All (63)", "Critical (14)", "My Actions (8)", "Overdue (9)", "In Progress (28)", "Completed (31)"].map((tab, i) => {
              const isActive = (i === 0);
              return (
                <button key={tab} className={cn("px-2 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors", isActive ? "border-indigo text-indigo" : "border-transparent text-muted-foreground hover:text-foreground")}>
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3 w-full">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search actions, regulations, owners..." className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:border-indigo" />
              </div>
              <select className="px-3 py-2 text-sm border border-border rounded bg-background text-foreground focus:outline-none focus:border-indigo appearance-none w-36">
                <option>Department</option>
              </select>
              <select className="px-3 py-2 text-sm border border-border rounded bg-background text-foreground focus:outline-none focus:border-indigo appearance-none w-32">
                <option>Priority</option>
              </select>
              <select className="px-3 py-2 text-sm border border-border rounded bg-background text-foreground focus:outline-none focus:border-indigo appearance-none w-32">
                <option>Status</option>
              </select>
              <select className="px-3 py-2 text-sm border border-border rounded bg-background text-foreground focus:outline-none focus:border-indigo appearance-none w-32">
                <option>Due Date</option>
              </select>
              <button className="text-sm text-indigo font-semibold hover:underline ml-2 whitespace-nowrap">Clear Filters</button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-foreground font-bold bg-secondary/30 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded border-border" /></th>
                  <th className="px-4 py-3">Action ID</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Source Regulation</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {actions.map((row, i) => (
                  <tr key={i} className="hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => openActionDetail(row)}>
                    <td className="px-4 py-4" onClick={e => e.stopPropagation()}><input type="checkbox" className="rounded border-border" /></td>
                    <td className="px-4 py-4 font-mono text-xs text-indigo">{row.id}</td>
                    <td className="px-4 py-4 max-w-xs truncate">{row.action}</td>
                    <td className="px-4 py-4 text-muted-foreground">{row.regulation}</td>
                    <td className="px-4 py-4 text-muted-foreground">{row.department}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary text-foreground flex items-center justify-center text-[10px] font-bold border border-border shrink-0">{row.ownerInitials}</div>
                        {row.owner}
                      </div>
                    </td>
                    <td className="px-4 py-4"><RiskBadge level={row.priority} /></td>
                    <td className="px-4 py-4 text-xs text-muted-foreground whitespace-nowrap">{row.due}</td>
                    <td className="px-4 py-4"><StatusBadge status={row.status} /></td>
                    <td className="px-4 py-4 text-right" onClick={e => e.stopPropagation()}><button><MoreVertical className="w-4 h-4 text-muted-foreground hover:text-indigo" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing 1–10 of 63 actions</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 border border-border rounded bg-background p-1">
                <button className="px-2 py-1 text-muted-foreground hover:text-foreground">{"<"}</button>
                <button className="px-3 py-1 bg-indigo text-white rounded font-medium">1</button>
                <button className="px-3 py-1 hover:bg-secondary rounded">2</button>
                <button className="px-3 py-1 hover:bg-secondary rounded">3</button>
                <button className="px-3 py-1 hover:bg-secondary rounded">4</button>
                <button className="px-3 py-1 hover:bg-secondary rounded">5</button>
                <span className="px-2">...</span>
                <button className="px-2 py-1 text-muted-foreground hover:text-foreground">{">"}</button>
              </div>
              <select className="px-3 py-1.5 border border-border rounded bg-background text-foreground focus:outline-none focus:border-indigo appearance-none">
                <option>10 per page</option>
                <option>20 per page</option>
                <option>50 per page</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Action Detail Panel - fixed right side panel */}
      {selectedAction && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]" onClick={closePanel} />

          {/* Panel */}
          <div className="fixed top-0 right-0 z-50 h-full w-[420px] bg-card border-l border-border shadow-xl flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-border shrink-0">
              <h2 className="text-lg font-bold">Action Details</h2>
              <button onClick={closePanel} className="p-1 rounded hover:bg-secondary transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <RiskBadge level={selectedAction.priority} />
                  <span className="font-mono text-sm text-muted-foreground">{selectedAction.id}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{selectedAction.action}</h3>
                <div className="flex items-center gap-2 text-sm text-indigo font-medium bg-indigo/5 w-fit px-2 py-1 rounded border border-indigo/10 mb-6">
                  <span>✨ AI Suggested • Human Review Required</span>
                </div>

                {/* Detail Tabs */}
                <div className="flex items-center gap-6 border-b border-border">
                  {["Details", "Evidence", "Audit Trail", "Comments (3)"].map((tab, i) => (
                    <button key={tab} className={cn("pb-3 text-sm font-semibold border-b-2 transition-colors", i === 0 ? "border-indigo text-indigo" : "border-transparent text-muted-foreground hover:text-foreground")}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Why this action exists */}
                <div className="bg-secondary/50 border border-border rounded-md p-4">
                  <h4 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-indigo/10 text-indigo flex items-center justify-center"><FileText className="w-3 h-3" /></div> Why this action exists
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">RBI has expanded customer verification requirements (Clause 4.2). Current policy does not fully cover the new verification trigger for non-face-to-face customers.</p>
                </div>

                {/* Detail Grid */}
                <div className="grid grid-cols-[140px_1fr] gap-y-4 gap-x-4 text-sm">
                  <div className="text-muted-foreground">Source Regulation</div>
                  <div>
                    <div className="flex items-center gap-2 font-medium">
                      <FileText className="w-4 h-4 text-indigo shrink-0" /> {selectedAction.regulation}
                    </div>
                    <button className="text-indigo hover:underline text-xs mt-1 font-medium">View Clause 4.2 →</button>
                  </div>

                  <div className="text-muted-foreground">Detected Gap</div>
                  <div className="font-medium">New verification trigger not included in current KYC SOP.</div>

                  <div className="text-muted-foreground">Recommended Action</div>
                  <div className="font-medium">Update Section 3.2 of KYC SOP to include the new verification trigger.</div>

                  <div className="text-muted-foreground">Department</div>
                  <div className="font-medium">{selectedAction.department}</div>

                  <div className="text-muted-foreground">Owner</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium">
                      <div className="w-6 h-6 rounded-full bg-secondary border border-border flex items-center justify-center text-[10px] font-bold shrink-0">{selectedAction.ownerInitials}</div>
                      {selectedAction.owner}
                    </div>
                    <button className="text-indigo text-xs font-semibold hover:underline">Change</button>
                  </div>

                  <div className="text-muted-foreground">Priority</div>
                  <div><RiskBadge level={selectedAction.priority} /></div>

                  <div className="text-muted-foreground">Due Date</div>
                  <div className="flex items-center gap-2 font-medium">
                    <Clock className="w-4 h-4 text-muted-foreground shrink-0" /> {selectedAction.due} <span className="text-muted-foreground font-normal text-xs">(in 12 days)</span>
                  </div>

                  <div className="text-muted-foreground">Suggested SLA</div>
                  <div className="font-medium">15 days</div>

                  <div className="text-muted-foreground">Evidence Required</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-secondary border border-border rounded text-xs font-medium text-indigo">Updated SOP</span>
                    <span className="px-2 py-1 bg-secondary border border-border rounded text-xs font-medium text-indigo">Approval Note</span>
                    <span className="px-2 py-1 bg-secondary border border-border rounded text-xs font-medium text-indigo">Training Record</span>
                  </div>

                  <div className="text-muted-foreground">Approval</div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-amber/10 text-amber text-xs font-semibold rounded">Pending Approval</span>
                    <button className="px-3 py-1 text-xs font-semibold text-indigo border border-indigo/30 rounded hover:bg-indigo/5">Request Approval</button>
                  </div>
                </div>

                {/* Related Items */}
                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-bold mb-4">Related Items</h4>
                  <div className="flex gap-3">
                    <div className="flex-1 border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-3 bg-secondary/30">
                      <div className="flex items-start gap-2 mb-3">
                        <FileText className="w-4 h-4 text-indigo mt-0.5 shrink-0" />
                        <span className="text-xs font-semibold leading-tight">RBI Clause 4.2</span>
                      </div>
                      <button className="text-xs text-indigo font-semibold hover:underline">View →</button>
                    </div>
                    <div className="flex-1 border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-3 bg-secondary/30">
                      <div className="flex items-start gap-2 mb-3">
                        <FileText className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                        <span className="text-xs font-semibold leading-tight">KYC Policy v3 §3.2</span>
                      </div>
                      <button className="text-xs text-indigo font-semibold hover:underline">View →</button>
                    </div>
                    <div className="flex-1 border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000]  p-3 bg-secondary/30">
                      <div className="flex items-start gap-2 mb-3">
                        <FileText className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                        <span className="text-xs font-semibold leading-tight">Regulatory Trace</span>
                      </div>
                      <button className="text-xs text-indigo font-semibold hover:underline">Open →</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border bg-card flex items-center gap-3 shrink-0">
              {selectedAction.status !== "Completed" ? (
                <>
                  <button
                    onClick={handleMarkComplete}
                    className="bg-indigo text-white rounded px-4 py-2 font-medium text-sm hover:bg-indigo/90 shadow-sm flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Mark Complete
                  </button>
                  <button className="border border-border text-foreground rounded px-4 py-2 font-medium text-sm hover:bg-secondary shadow-sm">
                    Request Review
                  </button>
                  <button className="border border-border text-foreground rounded p-2 hover:bg-secondary shadow-sm ml-auto">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex-1 bg-teal/10 text-teal rounded py-2 font-medium text-sm flex items-center justify-center gap-2 border border-teal/20">
                  <CheckCircle2 className="w-4 h-4" /> Completed
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  iconBg: string;
  value: string | number;
  label: string;
  trend?: string;
  isPositive?: boolean;
}

function MetricCard({ icon, iconBg, value, label, trend, isPositive }: MetricCardProps) {
  return (
    <div className="bg-card border-[3px] border-black rounded-none shadow-[5px_5px_0_0_#000000] p-4  flex items-start gap-3 ">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", iconBg)}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold leading-none text-foreground">{value}</span>
        <span className="text-xs font-medium text-muted-foreground mt-1.5">{label}</span>
        {trend && (
          <span className={cn("text-[11px] font-bold mt-1", isPositive ? 'text-teal' : 'text-red')}>
            {isPositive ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
    </div>
  );
}
