'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactFlow, { 
  Background, 
  Controls, 
  NodeMouseHandler,
  ConnectionMode,
  Node,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '@/components/CustomNode';
import SidePanel, { NodeData } from '@/components/SidePanel';
import { useStore } from '@/store/useStore';
import { ArrowLeft, Activity, Award, Zap } from 'lucide-react';
import Link from 'next/link';
import dagre from 'dagre';

const nodeTypes = {
  custom: CustomNode,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// Auto-alignment Layout function
const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  if (nodes.length === 0) return { nodes, edges };

  dagreGraph.setGraph({ rankdir: direction, ranksep: 120, nodesep: 150 });

  nodes.forEach((node) => {
    // Width and height of CustomNode component
    dagreGraph.setNode(node.id, { width: 300, height: 220 }); // Increased height to account for quizzes badge
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = { ...node };

    newNode.position = {
      x: nodeWithPosition.x - 300 / 2,
      y: nodeWithPosition.y - 220 / 2,
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

export default function Dashboard() {
  const router = useRouter();
  const { nodes, edges, userGoal, skillLevel } = useStore();
  
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [layoutedNodes, setLayoutedNodes] = useState<Node[]>([]);
  const [layoutedEdges, setLayoutedEdges] = useState<Edge[]>([]);

  // Calculate Player Stats
  const totalNodes = nodes.length;
  const clearedNodes = nodes.filter(n => n.data.status === 'cleared').length;
  const progressPercent = totalNodes === 0 ? 0 : Math.round((clearedNodes / totalNodes) * 100);
  const totalScore = clearedNodes * 300; // 300 points per cleared module

  // Redirect if no data, otherwise auto-layout
  useEffect(() => {
    if (nodes.length > 0) {
      // Inject gamified edge styling (Orange/Cyan theme)
      const styledEdges = edges.map(edge => ({
        ...edge,
        animated: true,
        style: { stroke: '#f97316', strokeWidth: 3 }, // Orange glowing edges
      }));
      
      const { nodes: newNodes, edges: newEdges } = getLayoutedElements(nodes, styledEdges);
      setLayoutedNodes(newNodes);
      setLayoutedEdges(newEdges);
    } else {
      router.push('/');
    }
  }, [nodes, edges, router]);

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNode({
      id: node.id,
      label: node.data.label,
      description: node.data.description,
      explanation: node.data.explanation,
      resources: node.data.resources,
      timeEstimate: node.data.timeEstimate,
      prerequisitesExplanation: node.data.prerequisitesExplanation,
      status: node.data.status,
      quizzes: node.data.quizzes,
      explainability: node.data.explainability
    });
    setIsPanelOpen(true);
  }, []);

  if (layoutedNodes.length === 0) return null; // Wait for redirect or layout

  return (
    <div className="w-full h-screen bg-[#050505] overflow-hidden">
      
      {/* Gamified Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 pointer-events-none flex justify-between items-center">
        <Link href="/" className="pointer-events-auto flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors bg-gray-900/80 px-4 py-2 rounded-full border border-gray-800 backdrop-blur-md">
          <ArrowLeft size={18} />
          <span className="font-medium text-sm">Return Home</span>
        </Link>
        <div className="text-right bg-gray-900/80 px-6 py-3 rounded-2xl border border-gray-800 shadow-xl backdrop-blur-md">
          <h2 className="text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">{userGoal}</h2>
          <p className="text-sm text-cyan-400 font-bold tracking-wide uppercase mt-1">Tier {skillLevel} Path</p>
        </div>
      </div>

      {/* Player Stats Left Sidebar */}
      <div className="absolute top-28 left-6 z-20 w-64 bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-5 rounded-2xl shadow-2xl">
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
          <Activity size={14} className="text-orange-500" /> Player Stats
        </h3>
        
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700/50">
            <div className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wide">Current Mastery</div>
            <div className="text-white font-bold text-lg flex items-center gap-2">
              <Award size={18} className="text-cyan-400" /> {skillLevel}
            </div>
          </div>
          
          <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700/50">
            <div className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wide">Total Quiz Score</div>
            <div className="text-orange-400 font-bold text-3xl drop-shadow-[0_0_10px_rgba(249,115,22,0.4)] flex items-center gap-2">
              <Zap size={24} className="animate-pulse" /> {totalScore} <span className="text-sm text-gray-500 font-normal">pts</span>
            </div>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
            <div className="flex justify-between text-xs font-medium mb-3">
              <span className="text-gray-300 uppercase tracking-wide">Path Progress</span>
              <span className="text-cyan-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-2.5 overflow-hidden border border-gray-700">
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-2.5 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(34,211,238,0.8)]" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="text-right text-xs text-gray-500 mt-2 font-medium">
              {clearedNodes} / {totalNodes} Modules Mastered
            </div>
          </div>
        </div>
      </div>

      <ReactFlow
        nodes={layoutedNodes}
        edges={layoutedEdges}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1f1f1f" gap={24} size={2} />
        <Controls className="bg-gray-800 border-gray-700 fill-white !rounded-xl shadow-2xl" />
      </ReactFlow>

      <SidePanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        data={selectedNode} 
      />
    </div>
  );
}
