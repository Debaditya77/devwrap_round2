'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Target, Award, BrainCircuit, Loader2, Sparkles, Trophy } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Progress() {
  const { user, graphData, goal, level } = useStore();
  const [totalNodes, setTotalNodes] = useState(0);
  const [clearedNodes, setClearedNodes] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Immediately sync with active session (zero delay)
    if (graphData && graphData.nodes.length > 0) {
      setTotalNodes(graphData.nodes.length);
      const cleared = graphData.nodes.filter(n => n.data?.status === 'cleared').length;
      setClearedNodes(cleared);
      setTotalPoints(cleared * 150); // Immediate optimistic points
    }

    // 2. Fetch historical data in background
    async function fetchHistory() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'paths'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        let aggregatePoints = 0;
        let aggregateCleared = 0;
        let aggregateTotal = 0;

        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (data.nodes) {
            aggregateTotal += data.nodes.length;
            const docCleared = data.nodes.filter((n: any) => n.data?.status === 'cleared').length;
            aggregateCleared += docCleared;
            aggregatePoints += docCleared * 150;
          }
        });

        // Use historical data if it exceeds current session (meaning they've done more overall)
        if (aggregateTotal > 0 && aggregatePoints >= (graphData?.nodes?.filter(n => n.data?.status === 'cleared').length || 0) * 150) {
          setTotalNodes(aggregateTotal);
          setClearedNodes(aggregateCleared);
          setTotalPoints(aggregatePoints);
        }
      } catch (error) {
        console.error("Error syncing progress:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, [user, graphData]);

  const progressPercentage = totalNodes > 0 ? Math.round((clearedNodes / totalNodes) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 selection:bg-orange-500/30">
      
      {/* Ambient Glows */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[200px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto pt-24">
        <header className="flex items-center gap-4 mb-12">
          <Link href="/" className="p-3 rounded-full bg-gray-900/60 border border-gray-800 hover:bg-gray-800 hover:text-orange-400 transition-all shadow-lg">
            <ArrowLeft size={24} className="text-gray-400 hover:text-orange-400" />
          </Link>
          <div>
            <h1 className="text-4xl font-light tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center gap-3">
              <Trophy className="text-orange-500" size={32} />
              Career Progress
            </h1>
            <p className="text-gray-400 text-sm mt-1">Track your overarching mastery across all learning architectures.</p>
          </div>
        </header>

        {isLoading && totalNodes === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 size={40} className="text-orange-500 animate-spin" />
            <p className="text-gray-400 animate-pulse">Syncing career metrics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Mastered Modules Card */}
            <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl group hover:border-orange-500/50 transition-all">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black rounded-xl border border-gray-800 text-orange-400">
                  <BrainCircuit size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-300">Modules Mastered</h3>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-6xl font-light tracking-tighter text-white">{clearedNodes}</span>
                <span className="text-xl text-gray-500 mb-1">/ {totalNodes}</span>
              </div>
            </div>

            {/* Total Points Card */}
            <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl group hover:border-orange-500/50 transition-all">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black rounded-xl border border-gray-800 text-orange-400">
                  <Award size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-300">Career Score</h3>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-6xl font-light tracking-tighter text-white">{totalPoints}</span>
                <span className="text-xl text-orange-500 mb-1 font-medium">XP</span>
              </div>
            </div>

            {/* Active Goal Card */}
            <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl md:col-span-1 flex flex-col justify-between group hover:border-orange-500/50 transition-all">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-black rounded-xl border border-gray-800 text-orange-400">
                    <Target size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-300">Active Directive</h3>
                </div>
                <h4 className="text-2xl font-medium text-white mb-2 leading-tight">
                  {goal || "No Active Goal"}
                </h4>
                <p className="text-sm text-gray-500">
                  Level: <span className="text-orange-400 font-medium">{level || "N/A"}</span>
                </p>
              </div>
              
              <div className="mt-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Architecture Completion</span>
                  <span className="text-white font-medium">{progressPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {totalNodes === 0 && !isLoading && (
           <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-16 backdrop-blur-xl text-center shadow-2xl max-w-2xl mx-auto mt-10">
             <Sparkles size={48} className="mx-auto text-orange-500 mb-6 opacity-60" />
             <h2 className="text-2xl font-light mb-4 text-white">Your Journey Awaits</h2>
             <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
               You haven't generated any learning paths yet. Initialize your first architecture to start tracking your progress.
             </p>
             <Link href="/" className="inline-flex px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]">
               Initialize Path
             </Link>
           </div>
        )}

      </div>
    </div>
  );
}
