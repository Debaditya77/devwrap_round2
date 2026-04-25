'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Map, Loader2, ChevronRight, Globe, BookOpen } from 'lucide-react';
import { useStore } from '@/store/useStore';

const OFFICIAL_PATHS = [
  { id: '1', goal: 'React.js', level: 'Advanced', description: 'Master concurrent rendering, server components, and advanced hooks.', docUrl: 'https://react.dev', nodeCount: 4 },
  { id: '2', goal: 'Next.js', level: 'Advanced', description: 'Enterprise routing, SSR/SSG, and full-stack React architecture.', docUrl: 'https://nextjs.org/docs', nodeCount: 4 },
  { id: '3', goal: 'TypeScript', level: 'Intermediate', description: 'Static typing, generics, and strict compiler options.', docUrl: 'https://www.typescriptlang.org/docs/', nodeCount: 3 },
  { id: '4', goal: 'Python', level: 'Beginner', description: 'Foundations of Python, variables, loops, and data structures.', docUrl: 'https://docs.python.org/3/', nodeCount: 2 },
  { id: '5', goal: 'Docker', level: 'Intermediate', description: 'Containerization, Dockerfiles, and volumes.', docUrl: 'https://docs.docker.com/', nodeCount: 3 },
  { id: '6', goal: 'Kubernetes', level: 'Advanced', description: 'Cluster orchestration, pods, services, and ingress.', docUrl: 'https://kubernetes.io/docs/home/', nodeCount: 4 },
  { id: '7', goal: 'AWS', level: 'Advanced', description: 'Cloud architecture, EC2, S3, Lambda, and IAM.', docUrl: 'https://aws.amazon.com/documentation/', nodeCount: 4 },
  { id: '8', goal: 'Rust', level: 'Advanced', description: 'Memory safety, ownership, borrowing, and high performance.', docUrl: 'https://doc.rust-lang.org/', nodeCount: 4 },
  { id: '9', goal: 'Go', level: 'Intermediate', description: 'Goroutines, channels, and fast compiled backend services.', docUrl: 'https://go.dev/doc/', nodeCount: 3 },
  { id: '10', goal: 'GraphQL', level: 'Intermediate', description: 'Schemas, resolvers, queries, and mutations.', docUrl: 'https://graphql.org/learn/', nodeCount: 3 },
  { id: '11', goal: 'PostgreSQL', level: 'Advanced', description: 'Relational design, indexing, transactions, and performance tuning.', docUrl: 'https://www.postgresql.org/docs/', nodeCount: 4 },
  { id: '12', goal: 'MongoDB', level: 'Intermediate', description: 'NoSQL documents, aggregation pipelines, and indexing.', docUrl: 'https://www.mongodb.com/docs/', nodeCount: 3 },
  { id: '13', goal: 'Terraform', level: 'Advanced', description: 'Infrastructure as Code (IaC), state management, and providers.', docUrl: 'https://developer.hashicorp.com/terraform/docs', nodeCount: 4 },
  { id: '14', goal: 'Linux', level: 'Beginner', description: 'Command line basics, file permissions, and bash scripting.', docUrl: 'https://man7.org/linux/man-pages/', nodeCount: 2 },
  { id: '15', goal: 'Cyber Security', level: 'Advanced', description: 'Penetration testing, OWASP Top 10, and Zero Trust.', docUrl: 'https://owasp.org/', nodeCount: 4 },
  { id: '16', goal: 'Machine Learning', level: 'Advanced', description: 'Neural networks, TensorFlow, and predictive modeling.', docUrl: 'https://www.tensorflow.org/learn', nodeCount: 4 },
  { id: '17', goal: 'Data Structures', level: 'Intermediate', description: 'Arrays, Trees, Graphs, Hash Maps, and algorithmic complexity.', docUrl: 'https://en.wikipedia.org/wiki/Data_structure', nodeCount: 3 },
  { id: '18', goal: 'Web3 / Solidity', level: 'Advanced', description: 'Smart contracts, Ethereum Virtual Machine, and DApps.', docUrl: 'https://docs.soliditylang.org/', nodeCount: 4 },
  { id: '19', goal: 'Unreal Engine', level: 'Advanced', description: 'C++ game development, Blueprints, and rendering pipelines.', docUrl: 'https://docs.unrealengine.com/', nodeCount: 4 },
  { id: '20', goal: 'React Native', level: 'Intermediate', description: 'Cross-platform mobile apps, native modules, and UI styling.', docUrl: 'https://reactnative.dev/docs/getting-started', nodeCount: 3 },
  { id: '21', goal: 'Node.js', level: 'Intermediate', description: 'Event loop, asynchronous I/O, and backend APIs.', docUrl: 'https://nodejs.org/en/docs/', nodeCount: 3 },
];

export default function Community() {
  const router = useRouter();
  const { setGraphData, setUserGoal, setSkillLevel, setCurrentPathId, updateLastLearned, lastLearnedTimestamps } = useStore();
  const [cloningId, setCloningId] = useState<string | null>(null);

  // Sort paths based on last learned timestamps
  const sortedPaths = [...OFFICIAL_PATHS].sort((a, b) => {
    const timeA = lastLearnedTimestamps[a.id] || 0;
    const timeB = lastLearnedTimestamps[b.id] || 0;
    return timeB - timeA;
  });

  const clonePath = async (path: any) => {
    setCloningId(path.id);
    
    try {
      // Call the massive offline engine dynamically so it scales quizzes correctly
      const response = await fetch('/api/generate-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: path.goal, level: path.level })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to clone path');
      }

      // Update last learned timestamp
      updateLastLearned(path.id);

      setUserGoal(path.goal);
      setSkillLevel(path.level);
      setGraphData(data.nodes, data.edges);
      
      // Null path ID makes it an unsaved draft until they interact with it
      setCurrentPathId(null);
      router.push('/dashboard');
    } catch (error) {
      console.error("Failed to clone official path:", error);
      alert("Failed to clone architecture. Please try again.");
    } finally {
      setCloningId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 selection:bg-orange-500/30">
      
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto pt-24">
        <header className="flex items-center gap-4 mb-12">
          <Link href="/" className="p-3 rounded-full bg-gray-900/60 border border-gray-800 hover:bg-gray-800 hover:text-orange-400 transition-all shadow-lg">
            <ArrowLeft size={24} className="text-gray-400 hover:text-orange-400" />
          </Link>
          <div>
            <h1 className="text-4xl font-light tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center gap-3">
              <Globe className="text-orange-500" size={32} />
              Official Network
            </h1>
            <p className="text-gray-400 text-sm mt-1">Explore and clone industry-standard learning architectures with direct official documentation links.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {sortedPaths.map((path) => {
            const isCloning = cloningId === path.id;

            return (
              <div
                key={path.id}
                className="group flex flex-col text-left bg-gray-900/60 backdrop-blur-md border border-gray-800 hover:border-orange-500/50 rounded-2xl p-6 transition-all shadow-lg hover:shadow-[0_10px_30px_rgba(249,115,22,0.15)] hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4 w-full">
                  <div className="p-2.5 bg-black rounded-xl border border-gray-800 text-orange-500 group-hover:scale-110 group-hover:bg-orange-500/10 transition-all">
                    <Map size={20} />
                  </div>
                  <span className="text-xs text-gray-500 font-medium px-3 py-1 bg-gray-800/50 rounded-full border border-gray-700/50">
                    {path.level}
                  </span>
                </div>
                
                <h3 className="text-xl font-medium text-white mb-2 line-clamp-1 leading-tight group-hover:text-orange-400 transition-colors">
                  {path.goal}
                </h3>
                
                <p className="text-sm text-gray-400 mb-6 line-clamp-2 h-10">
                  {path.description}
                </p>

                <p className="text-xs text-gray-500 mb-6">Official Path • {path.nodeCount} Modules</p>
                
                <div className="mt-auto w-full pt-4 border-t border-gray-800/50 flex justify-between items-center text-sm">
                  <a 
                    href={path.docUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    <BookOpen size={16} />
                    Docs
                  </a>
                  
                  <button 
                    onClick={() => clonePath(path)}
                    disabled={isCloning}
                    className="flex items-center gap-1 text-orange-500 font-medium hover:text-orange-400 transition-colors disabled:opacity-50"
                  >
                    {isCloning ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Synthesizing...
                      </>
                    ) : (
                      <>
                        Clone Path
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
