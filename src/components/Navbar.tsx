'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Settings2, User, LogOut, AlertCircle } from 'lucide-react';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const { user, setUser } = useStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error: any) {
      console.error("Login failed:", error);
      alert("Login Error: " + (error.message || "Unknown error"));
    }
  };

  const confirmLogout = async () => {
    await signOut(auth);
    setUser(null);
    setShowLogoutConfirm(false);
  };

  // Helper to highlight active link
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-8 left-0 right-0 z-[100] flex justify-between px-8 pointer-events-none">
      <div className="w-32"></div> {/* Spacer for balance */}
      
      <div className="flex items-center space-x-2 bg-gray-900/60 backdrop-blur-xl p-1.5 rounded-full border border-gray-800/80 pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <Link href="/" className="p-2 bg-black rounded-full text-orange-500 mr-2 hover:scale-110 hover:bg-orange-500/20 transition-all">
          <Zap size={20} />
        </Link>
        <Link 
          href="/dashboard" 
          className={`px-4 py-2 text-sm rounded-full transition-all ${isActive('/dashboard') ? 'bg-orange-500/10 text-orange-400 font-medium' : 'text-gray-300 hover:text-white'}`}
        >
          Dashboard
        </Link>
        <Link 
          href="/paths" 
          className={`px-4 py-2 text-sm rounded-full transition-all ${isActive('/paths') ? 'bg-orange-500/10 text-orange-400 font-medium' : 'text-gray-300 hover:text-white'}`}
        >
          Paths
        </Link>
        <Link 
          href="/community" 
          className={`px-4 py-2 text-sm rounded-full transition-all ${isActive('/community') ? 'bg-orange-500/10 text-orange-400 font-medium' : 'text-gray-300 hover:text-white'}`}
        >
          Community
        </Link>
        <Link 
          href="/progress" 
          className={`px-4 py-2 text-sm rounded-full transition-all ${isActive('/progress') ? 'bg-orange-500/10 text-orange-400 font-medium' : 'text-gray-300 hover:text-white'}`}
        >
          Progress
        </Link>

      </div>

      <div className="w-32 flex justify-end pointer-events-auto">
        {pathname !== '/dashboard' && (
          user ? (
            <button 
              onClick={() => setShowLogoutConfirm(true)} 
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full transition-all text-sm font-medium shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <img src={user.photoURL || ''} alt="Avatar" className="w-6 h-6 rounded-full" />
              <LogOut size={14} className="text-gray-400" />
            </button>
          ) : (
            <button onClick={handleLogin} className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-full transition-all text-sm font-medium shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]">
              <User size={16} />
              Login
            </button>
          )
        )}
      </div>

      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-orange-400"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-orange-500 mb-6">
                  <AlertCircle size={32} />
                </div>
                
                <h3 className="text-2xl font-light text-white mb-2 tracking-tight">Confirm Sign Out</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Are you sure you want to end your session? Your progress is saved automatically.
                </p>
                
                <div className="flex w-full gap-3">
                  <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-all text-sm font-medium border border-gray-700"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmLogout}
                    className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl transition-all text-sm font-medium shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
