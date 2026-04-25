'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, BookOpen, Clock, AlertTriangle, CheckCircle, Lock, HelpCircle, Trophy } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface NodeData {
  id: string;
  label: string;
  description?: string;
  explanation?: string;
  explainability?: string;
  resources?: { title: string; url: string; type: string }[];
  supportiveResources?: { title: string; url: string; type: string }[];
  timeEstimate?: string;
  prerequisitesExplanation?: string;
  status?: string;
  quizzes?: {
    beginner: { question: string; options: string[]; correctAnswerIndex: number }[];
    intermediate: { question: string; options: string[]; correctAnswerIndex: number }[];
    advanced: { question: string; options: string[]; correctAnswerIndex: number }[];
  } | { question: string; options: string[]; correctAnswerIndex: number }[];
}

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: NodeData | null;
}

export default function SidePanel({ isOpen, onClose, data }: SidePanelProps) {
  const { markNodeAsCleared, nodes, edges, skillLevel, setSkillLevel } = useStore();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizError, setQuizError] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;

  // Get active quizzes based on current skill level with fallbacks
  const getActiveQuizzes = () => {
    if (!data?.quizzes) return [];
    
    // If it's the old array format, return it as is
    if (Array.isArray(data.quizzes)) return data.quizzes;
    
    const level = skillLevel?.toLowerCase() || 'beginner';
    let selectedQuizzes = [];
    
    if (level === 'advanced') selectedQuizzes = data.quizzes.advanced || [];
    else if (level === 'intermediate') selectedQuizzes = data.quizzes.intermediate || [];
    else selectedQuizzes = data.quizzes.beginner || [];

    // Fallback to beginner if selected is empty, or any available level
    if (selectedQuizzes.length === 0) {
      selectedQuizzes = data.quizzes.beginner || data.quizzes.intermediate || data.quizzes.advanced || [];
    }
    
    return selectedQuizzes;
  };

  const activeQuizzes = getActiveQuizzes();

  // Reset quiz state when node OR skill level changes
  useEffect(() => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizError(false);
    setQuizPassed(false);
    setAttempts(0);
  }, [data?.id, skillLevel]);

  const handleResetQuiz = () => {
    setAttempts(0);
    setQuizError(false);
    setQuizPassed(false);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
  };

  const isLocked = data && edges.filter(e => e.target === data.id).some(edge => {
    const parentNode = nodes.find(n => n.id === edge.source);
    return parentNode && parentNode.data.status !== 'cleared';
  });

  const handleQuizFailure = () => {
    let nextLevel = 'Beginner';
    if (skillLevel === 'Advanced') nextLevel = 'Intermediate';
    else if (skillLevel === 'Intermediate') nextLevel = 'Beginner';
    
    setSkillLevel(nextLevel);
  };

  const handleNextQuestion = () => {
    if (activeQuizzes.length === 0) return;
    
    if (selectedAnswer !== activeQuizzes[currentQuizIndex].correctAnswerIndex) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setQuizError(true);
      
      if (newAttempts >= MAX_ATTEMPTS) {
        handleQuizFailure();
      }
      return;
    }

    setQuizError(false);

    if (currentQuizIndex < activeQuizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizPassed(true);
    }
  };

  const handleMarkAsCleared = async () => {
    if (data?.id) {
      markNodeAsCleared(data.id);

      // Save progress to Firestore
      const state = useStore.getState();
      if (state.currentPathId) {
        try {
          const pathRef = doc(db, 'paths', state.currentPathId);
          const updatedNodes = state.nodes.map(node => 
            node.id === data.id ? { ...node, data: { ...node.data, status: 'cleared' } } : node
          );
          await updateDoc(pathRef, { nodes: updatedNodes });
        } catch (error) {
          console.error("Error updating progress in Firestore:", error);
        }
      }

      // Close the panel
      setTimeout(() => {
        onClose();
      }, 400);
    }
  };

  // Fallback supportive resources if none provided
  const fallbackResources = data ? [
    { title: `Simplified ${data.label} Guide`, url: `https://www.google.com/search?q=${encodeURIComponent(data.label + ' for absolute beginners')}`, type: "Search" },
    { title: `${data.label} Explained in 5 Minutes`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(data.label + ' explained simply')}`, type: "Video" }
  ] : [];

  const supportiveToDisplay = (data?.supportiveResources && data.supportiveResources.length > 0) 
    ? data.supportiveResources 
    : fallbackResources;

  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 shadow-2xl p-6 z-50 overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

          <div className="mt-8 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-white">{data.label}</h2>
              </div>
              {data.description && (
               <p className="text-gray-400 text-sm">{data.description}</p>
              )}
            </div>

            <div className="flex items-center space-x-2 text-cyan-400 bg-cyan-900/20 p-3 rounded-lg border border-cyan-900/50">
              <Clock size={18} />
              <span className="text-sm font-medium">Estimated Time: {data.timeEstimate || '2 hours'}</span>
            </div>

            {/* AI Explainability Section */}
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-5 rounded-xl border border-indigo-500/30">
              <div className="flex items-center space-x-2 mb-3 text-indigo-300">
                <Sparkles size={18} className="animate-pulse" />
                <h3 className="font-semibold">AI Reasoning</h3>
              </div>
              <p className="text-sm text-indigo-100/80 leading-relaxed">
                {data.explanation || data.explainability || 'This concept is crucial for your chosen learning path.'}
              </p>
            </div>

            {/* Resources List */}
            <div>
              <div className="flex items-center space-x-2 mb-4 text-white">
                <BookOpen size={18} />
                <h3 className="font-semibold text-lg">Curated Resources</h3>
              </div>
              <div className="space-y-3">
                {data.resources && data.resources.length > 0 ? (
                  data.resources.map((res, idx) => (
                    <a
                      key={idx}
                      href={res.url !== "#" ? res.url : `https://www.google.com/search?q=${encodeURIComponent(res.title + ' ' + data.label)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700 transition-colors group"
                    >
                      <div className="text-sm font-medium text-orange-400 group-hover:text-orange-300 transition-colors">
                        {res.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                        {res.type}
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No resources available for this node yet.</p>
                )}
              </div>
            </div>

            {/* Multi-Quiz Section */}
            {data.status !== 'cleared' && !isLocked && activeQuizzes.length > 0 && !quizPassed && (
              <div className="bg-gray-800/80 p-5 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex justify-between items-center mb-4 text-orange-400">
                  <div className="flex items-center space-x-2">
                    <HelpCircle size={18} />
                    <h3 className="font-semibold">Knowledge Check</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold bg-gray-900 px-2 py-1 rounded text-gray-300">
                      Question {currentQuizIndex + 1} of {activeQuizzes.length}
                    </span>
                    <span className={`text-[10px] mt-1 font-bold ${attempts >= 2 ? 'text-red-500' : 'text-gray-500'}`}>
                      Attempts: {attempts}/{MAX_ATTEMPTS}
                    </span>
                  </div>
                </div>
                
                {attempts < MAX_ATTEMPTS ? (
                  <>
                    <p className="text-sm text-white mb-4">{activeQuizzes[currentQuizIndex].question}</p>
                    
                    <div className="space-y-2 mb-4">
                      {activeQuizzes[currentQuizIndex].options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedAnswer(idx);
                            setQuizError(false);
                          }}
                          className={`w-full text-left p-3 rounded-lg text-sm transition-all border ${
                            selectedAnswer === idx 
                              ? 'bg-orange-900/40 border-orange-500 text-orange-100' 
                              : 'bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {quizError && (
                      <p className="text-red-400 text-xs mb-4 text-center font-medium animate-pulse">
                        Incorrect! {MAX_ATTEMPTS - attempts} attempts remaining.
                      </p>
                    )}

                    <button 
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className={`w-full py-3 px-4 rounded-xl font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2 ${
                        selectedAnswer === null
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-600'
                          : 'bg-orange-600 hover:bg-orange-500 text-white hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]'
                      }`}
                    >
                      {currentQuizIndex < activeQuizzes.length - 1 ? 'Next Question' : 'Complete Quiz'}
                    </button>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <AlertTriangle size={40} className="text-red-500 mx-auto mb-3" />
                    <h4 className="text-red-400 font-bold mb-2">Quiz Failed</h4>
                    <p className="text-gray-400 text-xs mb-6">
                      You've exhausted all attempts. Your skill level has been adjusted to <span className="text-orange-400 font-bold">{skillLevel}</span> to provide easier content.
                    </p>
                    
                    {supportiveToDisplay.length > 0 && (
                      <div className="mb-6 text-left">
                        <h5 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <BookOpen size={14} className="text-cyan-400" />
                          Easier Ways to Learn
                        </h5>
                        <div className="space-y-2">
                          {supportiveToDisplay.map((res, idx) => (
                            <a
                              key={idx}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-3 rounded-lg bg-cyan-900/20 border border-cyan-700/30 hover:bg-cyan-900/30 transition-all group"
                            >
                              <div className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                                {res.title}
                              </div>
                              <div className="text-[10px] text-gray-500 mt-0.5 uppercase">
                                {res.type}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={handleResetQuiz}
                      className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center gap-2"
                    >
                      Try {skillLevel} Quiz
                    </button>
                  </div>
                )}
              </div>
            )}

            {quizPassed && data.status !== 'cleared' && (
              <div className="bg-cyan-900/20 p-5 rounded-xl border border-cyan-500/50 text-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Trophy size={32} className="text-cyan-400 mx-auto mb-2" />
                <h3 className="font-bold text-white mb-1">Quiz Passed!</h3>
                <p className="text-xs text-cyan-200 mb-4">You scored 100% on the Knowledge Checks.</p>
                <button 
                  onClick={handleMarkAsCleared}
                  className="w-full py-3 px-4 rounded-xl font-bold tracking-wide bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <CheckCircle size={20} />
                  Claim Module Rewards
                </button>
              </div>
            )}

            {/* Status Button (If already cleared or locked) */}
            <div className="pt-2">
              {data.status === 'cleared' ? (
                <div className="w-full py-3 px-4 bg-gray-800 border border-cyan-500/50 text-cyan-400 rounded-xl font-bold tracking-wide flex items-center justify-center gap-2">
                  <CheckCircle size={20} className="text-cyan-400" />
                  Module Mastered
                </div>
              ) : isLocked ? (
                <div className="w-full py-3 px-4 bg-gray-900 border border-red-500/30 text-red-400 rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 cursor-not-allowed">
                  <Lock size={20} className="text-red-400" />
                  Complete Prerequisites First
                </div>
              ) : null}
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
