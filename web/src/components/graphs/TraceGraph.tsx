"use client";
import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FileText, ShieldAlert, CheckCircle, Activity, Building, AlertTriangle, Scale } from "lucide-react";

// Custom Node Types
const BaseNode = ({ data, type, icon: Icon, colorClass, borderClass }: any) => (
  <div className={`px-4 py-3 shadow-lg rounded-md bg-card border-2 ${borderClass} min-w-[200px]`}>
    <Handle type="target" position={Position.Top} className="w-2 h-2 rounded-full !bg-muted-foreground" />
    <div className="flex items-center gap-2 mb-2">
      <div className={`p-1.5 rounded-md ${colorClass}`}><Icon className="w-4 h-4" /></div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{type}</span>
    </div>
    <div className="font-bold text-sm mb-1 leading-tight">{data.label}</div>
    {data.sub && <div className="text-xs text-muted-foreground">{data.sub}</div>}
    <Handle type="source" position={Position.Bottom} className="w-2 h-2 rounded-full !bg-muted-foreground" />
  </div>
);

const RegulationNode = (props: any) => <BaseNode {...props} type="Regulation" icon={Scale} colorClass="bg-slate-100 text-slate-600" borderClass="border-slate-200" />;
const ObligationNode = (props: any) => <BaseNode {...props} type="Obligation" icon={FileText} colorClass="bg-indigo/10 text-indigo" borderClass="border-indigo/30" />;
const PolicyNode = (props: any) => <BaseNode {...props} type="Internal Policy" icon={BookOpenIcon} colorClass="bg-teal/10 text-teal" borderClass="border-teal/30" />;
const GapNode = (props: any) => <BaseNode {...props} type="Policy Gap" icon={ShieldAlert} colorClass="bg-amber/10 text-amber" borderClass="border-amber/40" />;
const RiskNode = (props: any) => <BaseNode {...props} type="Risk Assessment" icon={AlertTriangle} colorClass="bg-red/10 text-red" borderClass="border-red/40" />;
const DeptNode = (props: any) => <BaseNode {...props} type="Department" icon={Building} colorClass="bg-purple-100 text-purple-600" borderClass="border-purple-200" />;
const ActionNode = (props: any) => <BaseNode {...props} type="Action" icon={Activity} colorClass="bg-blue-100 text-blue-600" borderClass="border-blue-300" />;

const nodeTypes = {
  regulation: RegulationNode,
  obligation: ObligationNode,
  policy: PolicyNode,
  gap: GapNode,
  risk: RiskNode,
  department: DeptNode,
  action: ActionNode,
};

const initialNodes = [
  { id: "1", type: "regulation", position: { x: 250, y: 0 }, data: { label: "RBI KYC Master Direction", sub: "Clause 4.2" } },
  { id: "2", type: "obligation", position: { x: 250, y: 150 }, data: { label: "Update verification trigger", sub: "Required every 6 months" } },
  { id: "3", type: "policy", position: { x: 250, y: 300 }, data: { label: "KYC Policy v3.4", sub: "Section 3.2" } },
  { id: "4", type: "gap", position: { x: 250, y: 450 }, data: { label: "Partial Match (78%)", sub: "Verification frequency mismatch" } },
  { id: "5", type: "risk", position: { x: 250, y: 600 }, data: { label: "High Risk", sub: "Regulatory non-compliance" } },
  { id: "6", type: "department", position: { x: 100, y: 750 }, data: { label: "KYC & Operations", sub: "Process Owner" } },
  { id: "7", type: "action", position: { x: 400, y: 750 }, data: { label: "ACT-2041", sub: "Update SOP & Systems" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#9ca3af", strokeWidth: 2 } },
  { id: "e2-3", source: "2", target: "3", animated: true, style: { stroke: "#9ca3af", strokeWidth: 2 } },
  { id: "e3-4", source: "3", target: "4", animated: true, style: { stroke: "#9ca3af", strokeWidth: 2 } },
  { id: "e4-5", source: "4", target: "5", animated: true, style: { stroke: "#9ca3af", strokeWidth: 2 } },
  { id: "e5-6", source: "5", target: "6", animated: true, style: { stroke: "#9ca3af", strokeWidth: 2 } },
  { id: "e5-7", source: "5", target: "7", animated: true, style: { stroke: "#9ca3af", strokeWidth: 2 } },
];

export function TraceGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-full bg-card rounded-lg overflow-hidden border border-border relative">
       <div className="absolute top-4 left-4 z-10 bg-card/80 backdrop-blur-sm border border-border p-3 rounded shadow-sm text-sm font-medium">
          <div className="font-bold mb-2">Provenance Chain</div>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground font-mono">
             <div><span className="text-slate-600">REG</span> → <span className="text-indigo">OBL</span> → <span className="text-teal">POL</span></div>
             <div><span className="text-teal">POL</span> → <span className="text-amber">GAP</span> → <span className="text-red">RSK</span></div>
             <div><span className="text-red">RSK</span> → <span className="text-purple-600">DPT</span> & <span className="text-blue-600">ACT</span></div>
          </div>
       </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-analytical"
      >
        <Controls className="bg-card border border-border fill-foreground" />
        <Background color="#cbd5e1" gap={16} />
      </ReactFlow>
    </div>
  );
}

function BookOpenIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
}
