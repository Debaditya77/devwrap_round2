'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SplineWrapper from '@/components/SplineWrapper';
import { useStore } from '@/store/useStore';
import { Loader2, Zap, Sparkles } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  const router = useRouter();
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const { setGraphData, setUserGoal, setSkillLevel, user, setCurrentPathId } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/generate-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, level })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate path');
      }
      
      setUserGoal(goal);
      setSkillLevel(level);
      setGraphData(data.nodes, data.edges);

      if (user) {
        try {
          const newPath = {
            userId: user.uid,
            goal: goal,
            level: level,
            nodes: data.nodes,
            edges: data.edges,
            createdAt: serverTimestamp()
          };
          addDoc(collection(db, 'paths'), newPath).then(docRef => {
            setCurrentPathId(docRef.id);
            // Instantly update cache, but use a serializable date for the cache so we don't break Zustand's JSON.stringify
            const cachePath = { ...newPath, createdAt: new Date() };
            const state = useStore.getState();
            const currentCache = state.cachedUserPaths || [];
            state.setCachedUserPaths([{ id: docRef.id, ...cachePath }, ...currentCache]);
          }).catch(e => {
            console.error("Error saving path to Firestore: ", e);
            setCurrentPathId(null);
          });
        } catch (e) {
          console.error("Error initiating save: ", e);
          setCurrentPathId(null);
        }
      } else {
        setCurrentPathId(null);
      }

      setIsLoading(false);
      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <main className="relative bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-orange-500/30">
      
      {/* Fixed Glowy Theme Background (Stays while scrolling) */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-orange-600/10 rounded-full blur-[200px] pointer-events-none z-0"></div>



      {/* Section 1: Hero (Robot + Title) - Scrolls away */}
      <section className="relative w-full h-[100vh] flex flex-col items-center justify-start pt-36 overflow-hidden pointer-events-none z-10">
        
        {/* Title at the top */}
        <h1 className="relative z-10 text-5xl md:text-7xl lg:text-[8rem] font-light tracking-tighter text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.5)] pointer-events-auto whitespace-nowrap">
          Invisible Approach
        </h1>

        {/* Spline Robot (In front of title, shifted down so it doesn't hit nav) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center translate-y-12">
          {/* We scale the Spline container by 110% to push the watermark completely off-screen */}
          <SplineWrapper 
            splineUrl="https://prod.spline.design/Mbx52B2b0vZSgicE/scene.splinecode" 
            className="w-[110vw] h-[110vh] scale-110 origin-center pointer-events-auto opacity-100"
          />
        </div>
      </section>

      {/* Section 2: Content Cards (Scrolls up into view) */}
      <section className="relative z-30 w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 pointer-events-none space-y-10">
        
        {/* Upgraded Paragraph Card */}
        <div className="pointer-events-auto w-full max-w-3xl bg-gray-900/60 backdrop-blur-2xl p-10 rounded-3xl border border-gray-700/50 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all hover:bg-gray-900/80 hover:border-gray-600/50 group">
          <div className="flex items-start gap-5">
            <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500 border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all">
              <Sparkles size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-light text-white mb-4 tracking-wide">The Architecture of Learning</h2>
              <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                We make humans better. Tell us what you want to master, and our AI will build your strictly acyclic learning architecture, removing all guesswork from your journey.
              </p>
            </div>
          </div>
        </div>

        {/* Upgraded Onboarding Form Card */}
        <div className="pointer-events-auto w-full max-w-3xl bg-gray-900/80 backdrop-blur-3xl border border-gray-600/40 rounded-3xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {/* Inner Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          
          <h2 className="text-4xl font-light text-white mb-2 tracking-wide">Initialize Your Path</h2>
          <p className="text-gray-400 mb-10 font-light">Set your target destination and current baseline.</p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
            <div className="space-y-3">
              <label htmlFor="goal" className="block text-sm font-medium text-orange-400 tracking-wider uppercase">
                What do you want to learn?
              </label>
              <input
                id="goal"
                type="text"
                placeholder="e.g., Quantum Computing, Advanced Next.js, Robotics..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-black/60 border border-gray-700 rounded-2xl px-6 py-4 text-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-inner"
                required
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="level" className="block text-sm font-medium text-orange-400 tracking-wider uppercase">
                Current Baseline
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-black/60 border border-gray-700 rounded-2xl px-6 py-4 text-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none shadow-inner cursor-pointer"
              >
                <option value="Beginner">Beginner (No prior knowledge)</option>
                <option value="Intermediate">Intermediate (Familiar with basics)</option>
                <option value="Advanced">Advanced (Looking to master)</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !goal.trim()}
              className="mt-6 w-full bg-orange-600 hover:bg-orange-500 text-white font-medium text-lg py-5 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] transform hover:-translate-y-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Synthesizing Graph...
                </>
              ) : (
                <>
                  <Zap size={24} />
                  Generate Path
                </>
              )}
            </button>

            {errorMsg && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-center">
                <p className="text-red-400 text-sm">{errorMsg}</p>
              </div>
            )}
          </form>
        </div>
      </section>

    </main>
  );
}
