'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Map, Loader2, Sparkles, ChevronRight, Lock, Target } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useStore } from '@/store/useStore';

export default function Paths() {
  const router = useRouter();
  const { user, setGraphData, setUserGoal, setSkillLevel, setCurrentPathId, cachedUserPaths, setCachedUserPaths } = useStore();
  const [paths, setPaths] = useState<any[]>(cachedUserPaths || []);
  const [isLoading, setIsLoading] = useState(!cachedUserPaths);

  useEffect(() => {
    async function fetchPaths() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'paths'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedPaths = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort in memory by date to avoid requiring a custom composite index in Firestore
        fetchedPaths.sort((a: any, b: any) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return b.createdAt.toMillis() - a.createdAt.toMillis();
        });

        setPaths(fetchedPaths);
        setCachedUserPaths(fetchedPaths);
      } catch (error) {
        console.error("Error fetching paths:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPaths();
  }, [user]);

  const loadPath = (path: any) => {
    setUserGoal(path.goal);
    setSkillLevel(path.level);
    setGraphData(path.nodes, path.edges);
    setCurrentPathId(path.id);
    router.push('/dashboard');
  };

  const calculateProgress = (nodes: any[]) => {
    if (!Array.isArray(nodes) || nodes.length === 0) return 0;
    const cleared = nodes.filter(n => n?.data?.status === 'cleared').length;
    if (cleared === 0) return 0;
    return Math.round((cleared / nodes.length) * 100);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-8 selection:bg-orange-500/30">
        <div className="max-w-4xl mx-auto text-center mt-32 bg-gray-900/40 p-12 rounded-3xl border border-gray-800">
          <Lock size={48} className="mx-auto text-orange-500 mb-6 opacity-80" />
          <h2 className="text-3xl font-light tracking-tight mb-4">Authentication Required</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            You must be logged in with your Google account to view and resume your saved learning architectures.
          </p>
          <Link href="/" className="inline-flex px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            Return Home to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 selection:bg-orange-500/30">
      
      {/* Background Glow */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto pt-24">
        <header className="flex items-center gap-4 mb-12">
          <Link href="/" className="p-3 rounded-full bg-gray-900/60 border border-gray-800 hover:bg-gray-800 hover:text-orange-400 transition-all shadow-lg">
            <ArrowLeft size={24} className="text-gray-400 hover:text-orange-400" />
          </Link>
          <div>
            <h1 className="text-4xl font-light tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Your Architectures
            </h1>
            <p className="text-gray-400 text-sm mt-1">Resume your saved learning paths.</p>
          </div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 size={40} className="text-orange-500 animate-spin" />
            <p className="text-gray-400 animate-pulse">Decrypting path history...</p>
          </div>
        ) : paths.length === 0 ? (
          <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-16 backdrop-blur-xl text-center shadow-2xl">
            <Map size={56} className="mx-auto text-orange-500 mb-6 opacity-60" />
            <h2 className="text-2xl font-light mb-4 text-white">No Saved Paths Yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              You haven't generated any learning architectures yet. Head back to the core engine to map out your first skill tree.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]">
              <Sparkles size={18} />
              Initialize New Path
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paths.map((path) => {
              const progress = calculateProgress(path.nodes);
              const date = path.createdAt?.toDate ? path.createdAt.toDate().toLocaleDateString() : 'Just now';

              return (
                <button
                  key={path.id}
                  onClick={() => loadPath(path)}
                  className="group flex flex-col text-left bg-gray-900/60 backdrop-blur-md border border-gray-800 hover:border-orange-500/50 rounded-2xl p-6 transition-all shadow-lg hover:shadow-[0_10px_30px_rgba(249,115,22,0.15)] hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-4 w-full">
                    <div className="p-2.5 bg-black rounded-xl border border-gray-800 text-orange-500 group-hover:scale-110 group-hover:bg-orange-500/10 transition-all">
                      <Target size={20} />
                    </div>
                    <span className="text-xs text-gray-500 font-medium px-3 py-1 bg-gray-800/50 rounded-full border border-gray-700/50">
                      {path.level}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-medium text-white mb-2 line-clamp-2 leading-tight group-hover:text-orange-400 transition-colors">
                    {path.goal}
                  </h3>
                  
                  <p className="text-xs text-gray-500 mb-6">Generated {date}</p>
                  
                  <div className="mt-auto w-full">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>Progress</span>
                      <span className="text-white font-medium">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <ChevronRight size={20} className="text-orange-500" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
