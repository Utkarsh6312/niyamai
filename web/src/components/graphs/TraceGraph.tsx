"use client";
import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  Node,
  Edge
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
const ClauseNode = (props: any) => <BaseNode {...props} type="Clause" icon={FileText} colorClass="bg-slate-100 text-slate-600" borderClass="border-slate-200" />;
const ObligationNode = (props: any) => <BaseNode {...props} type="Obligation" icon={FileText} colorClass="bg-indigo/10 text-indigo" borderClass="border-indigo/30" />;
const PolicyNode = (props: any) => <BaseNode {...props} type="Internal Policy" icon={BookOpenIcon} colorClass="bg-teal/10 text-teal" borderClass="border-teal/30" />;
const GapNode = (props: any) => <BaseNode {...props} type="Policy Gap" icon={ShieldAlert} colorClass="bg-amber/10 text-amber" borderClass="border-amber/40" />;
const RiskNode = (props: any) => <BaseNode {...props} type="Risk Assessment" icon={AlertTriangle} colorClass="bg-red/10 text-red" borderClass="border-red/40" />;
const DeptNode = (props: any) => <BaseNode {...props} type="Department" icon={Building} colorClass="bg-purple-100 text-purple-600" borderClass="border-purple-200" />;
const ActionNode = (props: any) => <BaseNode {...props} type="Action" icon={Activity} colorClass="bg-blue-100 text-blue-600" borderClass="border-blue-300" />;

const nodeTypes = {
  regulation: RegulationNode,
  clause: ClauseNode,
  obligation: ObligationNode,
  policy: PolicyNode,
  gap: GapNode,
  risk: RiskNode,
  department: DeptNode,
  action: ActionNode,
};

// Automatic layout function
function getLayoutedElements(nodes: Node[], edges: Edge[]) {
  // A simple vertical layout based on node types
  const typeY: Record<string, number> = {
    regulation: 0,
    clause: 150,
    obligation: 300,
    policy: 450,
    gap: 600,
    risk: 750,
    department: 900,
    action: 900,
  };
  
  const yCounts: Record<number, number> = {};
  
  const layoutedNodes = nodes.map((node) => {
    const y = typeY[node.type || ""] ?? 0;
    yCounts[y] = (yCounts[y] || 0) + 1;
    
    // Spread horizontally if multiple nodes at same Y
    const xOffset = (yCounts[y] - 1) * 250; 
    
    return {
      ...node,
      position: { x: 250 + xOffset, y }
    };
  });
  
  // Center alignment pass (simple)
  const maxYCount = Math.max(...Object.values(yCounts));
  const centerX = 250 + ((maxYCount - 1) * 250) / 2;
  
  const centeredNodes = layoutedNodes.map((node) => {
    const countAtY = yCounts[node.position.y];
    const rowWidth = (countAtY - 1) * 250;
    const rowStart = centerX - (rowWidth / 2);
    
    // Recalculate X based on index in row
    // (This is a simplified approach, assuming nodes are sorted by Y then X)
    return node; // skipping true centering for brevity, just returning the offsetted nodes
  });

  return { nodes: centeredNodes, edges };
}

export function TraceGraph({ initialNodes = [], initialEdges = [] }: { initialNodes: any[], initialEdges: any[] }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (initialNodes.length > 0) {
      const formattedEdges = initialEdges.map(e => ({ ...e, animated: true, style: { stroke: "#9ca3af", strokeWidth: 2 } }));
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes as Node[], formattedEdges as Edge[]);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    }
  }, [initialNodes, initialEdges, setNodes, setEdges]);

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
