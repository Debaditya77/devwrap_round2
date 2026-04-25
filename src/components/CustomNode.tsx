import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { CheckCircle2, Lock, Sparkles, BookOpen } from 'lucide-react';
import { useStore } from '@/store/useStore';

const CustomNode = ({ id, data, isConnectable }: NodeProps) => {
  const { nodes, edges } = useStore();
  const isCleared = data.status === 'cleared';
  
  // A node is locked if any of its prerequisites (incoming edges) are NOT cleared
  const incomingEdges = edges.filter(e => e.target === id);
  const isLocked = incomingEdges.some(edge => {
    const parentNode = nodes.find(n => n.id === edge.source);
    return parentNode && parentNode.data.status !== 'cleared';
  });

  const isNext = !isCleared && !isLocked;
  
  // Brand Theme: Cyan & Orange Glassmorphism
  const containerStyle = isCleared
    ? "bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
    : isLocked
    ? "bg-gray-950/80 border-gray-800/80 opacity-60 grayscale hover:grayscale-0"
    : "bg-orange-950/40 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_35px_rgba(249,115,22,0.5)]";

  const glowEffect = isNext ? "before:absolute before:inset-0 before:bg-orange-500/20 before:rounded-2xl before:animate-pulse before:-z-10" : "";
  const handleColor = isCleared ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" : isNext ? "bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.8)]" : "bg-gray-600";

  return (
    <div className={`relative px-6 py-5 backdrop-blur-xl border rounded-2xl min-w-[260px] max-w-[280px] transition-all duration-300 group cursor-pointer hover:-translate-y-1 ${containerStyle} ${glowEffect}`}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className={`w-4 h-4 border-2 border-gray-900 ${handleColor}`}
      />
      
      <div className="flex flex-col items-center z-10 relative">
        <div className="absolute -top-2 -right-2">
          {isCleared && (
            <div className="bg-gray-900 rounded-full p-1 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              <CheckCircle2 size={16} className="text-cyan-400" />
            </div>
          )}
          {isLocked && (
            <div className="bg-gray-900 rounded-full p-1 border border-gray-700">
              <Lock size={14} className="text-gray-500" />
            </div>
          )}
          {isNext && (
            <div className="bg-gray-900 rounded-full p-1 border border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.5)] animate-bounce">
              <Sparkles size={14} className="text-orange-400" />
            </div>
          )}
        </div>

        <h3 className={`text-lg font-bold tracking-wide transition-colors mt-1 text-center ${isCleared ? 'text-cyan-300' : isNext ? 'text-orange-300' : 'text-gray-400'}`}>
          {data.label}
        </h3>
        
        {data.description && (
          <p className="mt-2 text-xs text-gray-400 text-center max-w-[220px] leading-relaxed">
            {data.description}
          </p>
        )}

        {/* Gamified Resource Badges */}
        <div className="mt-4 flex gap-2">
          {data.resources && data.resources.length > 0 && (
             <div className="flex items-center gap-1 bg-gray-900/80 px-2 py-1 rounded-md border border-gray-700 text-xs text-gray-400">
               <BookOpen size={10} />
               <span>{data.resources.length} Modules</span>
             </div>
          )}
          {data.quizzes && data.quizzes.length > 0 && (
             <div className="flex items-center gap-1 bg-gray-900/80 px-2 py-1 rounded-md border border-gray-700 text-xs text-gray-400">
               <Sparkles size={10} className={isNext ? "text-orange-400" : "text-gray-500"} />
               <span>{data.quizzes.length} Quizzes</span>
             </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className={`w-4 h-4 border-2 border-gray-900 ${handleColor}`}
      />
    </div>
  );
};

export default memo(CustomNode);
