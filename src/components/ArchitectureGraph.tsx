import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Zap, GitMerge, Cpu, Network } from 'lucide-react';

// Custom Node Components
const TriggerNode = ({ data }: any) => (
  <div className="px-4 py-2 shadow-lg rounded-md bg-[#1a1a1a] border border-orange-500/30 min-w-[150px]">
    <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-orange-500" />
    <div className="flex items-center gap-2">
      <Zap className="w-4 h-4 text-orange-500" />
      <div className="text-xs font-mono text-orange-100">{data.label}</div>
    </div>
  </div>
);

const PipelineNode = ({ data }: any) => (
  <div className="px-4 py-3 shadow-lg rounded-md bg-[#1a1a1a] border border-blue-500/30 min-w-[200px]">
    <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-blue-500" />
    <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-blue-500" />
    <div className="flex items-center gap-2 mb-1">
      <GitMerge className="w-4 h-4 text-blue-500" />
      <div className="text-sm font-bold text-blue-100">{data.label}</div>
    </div>
    <div className="text-[10px] text-gray-400 font-mono">{data.tasks}</div>
  </div>
);

const EventNode = ({ data }: any) => (
  <div className="px-4 py-2 shadow-lg rounded-full bg-[#1a1a1a] border border-purple-500/30 min-w-[180px] text-center">
    <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-purple-500" />
    <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-purple-500" />
    <div className="flex items-center justify-center gap-2">
      <Network className="w-4 h-4 text-purple-500" />
      <div className="text-xs font-mono text-purple-100">{data.label}</div>
    </div>
  </div>
);

const AgentNode = ({ data }: any) => (
  <div className="px-4 py-3 shadow-lg rounded-md bg-[#1a1a1a] border border-emerald-500/30 min-w-[180px]">
    <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-emerald-500" />
    <div className="flex items-center gap-2">
      <Cpu className="w-5 h-5 text-emerald-500" />
      <div className="text-sm font-bold text-emerald-100">{data.label}</div>
    </div>
  </div>
);

const initialNodes = [
  // Triggers
  { id: 't1', type: 'trigger', position: { x: 50, y: 100 }, data: { label: 'OWNER_UPDATED' } },
  { id: 't2', type: 'trigger', position: { x: 50, y: 180 }, data: { label: 'DISTRESSEVENTCREATED' } },
  { id: 't3', type: 'trigger', position: { x: 50, y: 260 }, data: { label: 'REFI_RECORDED' } },
  { id: 't4', type: 'trigger', position: { x: 50, y: 340 }, data: { label: 'TAX_DELINQUENCY' } },
  { id: 't5', type: 'trigger', position: { x: 50, y: 420 }, data: { label: 'SCHEDULED_DAILY' } },
  { id: 't6', type: 'trigger', position: { x: 50, y: 500 }, data: { label: 'DEAL_RECORDED' } },
  { id: 't7', type: 'trigger', position: { x: 50, y: 580 }, data: { label: 'SCHEDULED_WEEKLY' } },

  // Pipelines
  { id: 'p1', type: 'pipeline', position: { x: 350, y: 140 }, data: { label: 'ownerriskpipeline', tasks: 'compute_owner_risk' } },
  { id: 'p2', type: 'pipeline', position: { x: 350, y: 260 }, data: { label: 'hiddendistresspipeline', tasks: 'compute_hidden_distress' } },
  { id: 'p3', type: 'pipeline', position: { x: 350, y: 420 }, data: { label: 'foreclosurewavepipeline', tasks: 'compute_wave_score' } },
  { id: 'p4', type: 'pipeline', position: { x: 350, y: 500 }, data: { label: 'competitionintensitypipeline', tasks: 'compute_competition' } },
  { id: 'p5', type: 'pipeline', position: { x: 350, y: 580 }, data: { label: 'liquidityopportunitypipeline', tasks: 'compute_liquidity' } },

  // Events Emitted
  { id: 'e1', type: 'event', position: { x: 700, y: 140 }, data: { label: 'OWNERRISKUPDATED' } },
  { id: 'e2', type: 'event', position: { x: 700, y: 260 }, data: { label: 'HIDDENDISTRESSUPDATED' } },
  { id: 'e3', type: 'event', position: { x: 700, y: 420 }, data: { label: 'GEOWAVEUPDATED' } },
  { id: 'e4', type: 'event', position: { x: 700, y: 500 }, data: { label: 'COMPETITIONUPDATED' } },
  { id: 'e5', type: 'event', position: { x: 700, y: 580 }, data: { label: 'LIQUIDITYUPDATED' } },

  // Agents
  { id: 'a1', type: 'agent', position: { x: 1050, y: 200 }, data: { label: 'CRM Agent' } },
  { id: 'a2', type: 'agent', position: { x: 1050, y: 360 }, data: { label: 'Offer Engine Agent' } },
  { id: 'a3', type: 'agent', position: { x: 1050, y: 500 }, data: { label: 'Capital Agent' } },
  { id: 'a4', type: 'agent', position: { x: 1050, y: 600 }, data: { label: 'Learning Loop Agent' } },
];

const initialEdges = [
  // Triggers to Pipelines
  { id: 'e-t1-p1', source: 't1', target: 'p1', animated: true, style: { stroke: '#f97316' } },
  { id: 'e-t2-p1', source: 't2', target: 'p1', animated: true, style: { stroke: '#f97316' } },
  { id: 'e-t1-p2', source: 't1', target: 'p2', animated: true, style: { stroke: '#f97316' } },
  { id: 'e-t3-p2', source: 't3', target: 'p2', animated: true, style: { stroke: '#f97316' } },
  { id: 'e-t4-p2', source: 't4', target: 'p2', animated: true, style: { stroke: '#f97316' } },
  { id: 'e-t5-p3', source: 't5', target: 'p3', animated: true, style: { stroke: '#f97316' } },
  { id: 'e-t6-p4', source: 't6', target: 'p4', animated: true, style: { stroke: '#f97316' } },
  { id: 'e-t7-p4', source: 't7', target: 'p4', animated: true, style: { stroke: '#f97316' } },
  { id: 'e-t7-p5', source: 't7', target: 'p5', animated: true, style: { stroke: '#f97316' } },

  // Pipelines to Events
  { id: 'e-p1-e1', source: 'p1', target: 'e1', style: { stroke: '#3b82f6' } },
  { id: 'e-p2-e2', source: 'p2', target: 'e2', style: { stroke: '#3b82f6' } },
  { id: 'e-p3-e3', source: 'p3', target: 'e3', style: { stroke: '#3b82f6' } },
  { id: 'e-p4-e4', source: 'p4', target: 'e4', style: { stroke: '#3b82f6' } },
  { id: 'e-p5-e5', source: 'p5', target: 'e5', style: { stroke: '#3b82f6' } },

  // Events to Agents
  { id: 'e-e1-a1', source: 'e1', target: 'a1', animated: true, style: { stroke: '#a855f7' } },
  { id: 'e-e2-a1', source: 'e2', target: 'a1', animated: true, style: { stroke: '#a855f7' } },
  
  { id: 'e-e1-a2', source: 'e1', target: 'a2', animated: true, style: { stroke: '#a855f7' } },
  { id: 'e-e2-a2', source: 'e2', target: 'a2', animated: true, style: { stroke: '#a855f7' } },
  { id: 'e-e3-a2', source: 'e3', target: 'a2', animated: true, style: { stroke: '#a855f7' } },
  { id: 'e-e4-a2', source: 'e4', target: 'a2', animated: true, style: { stroke: '#a855f7' } },
  { id: 'e-e5-a2', source: 'e5', target: 'a2', animated: true, style: { stroke: '#a855f7' } },

  { id: 'e-e3-a3', source: 'e3', target: 'a3', animated: true, style: { stroke: '#a855f7' } },
  { id: 'e-e5-a3', source: 'e5', target: 'a3', animated: true, style: { stroke: '#a855f7' } },

  { id: 'e-e3-a4', source: 'e3', target: 'a4', animated: true, style: { stroke: '#a855f7' } },
  { id: 'e-e4-a4', source: 'e4', target: 'a4', animated: true, style: { stroke: '#a855f7' } },
];

export function ArchitectureGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({
    trigger: TriggerNode,
    pipeline: PipelineNode,
    event: EventNode,
    agent: AgentNode,
  }), []);

  return (
    <div className="w-full h-full bg-[#050505] relative">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h2 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">Task Graph Engine</h2>
        <p className="text-gray-400 text-sm max-w-md">Temporal / Ray / LangGraph workflows orchestrate pipelines, manage dependencies, and parallel execution.</p>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className="dark"
      >
        <Background color="#333" gap={16} />
        <Controls className="!bg-[#111] !border-gray-800 !fill-gray-400" />
      </ReactFlow>
    </div>
  );
}
