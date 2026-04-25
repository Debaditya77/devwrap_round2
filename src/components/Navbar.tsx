'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Settings2, User, LogOut } from 'lucide-react';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useStore } from '@/store/useStore';

export default function Navbar() {
  const pathname = usePathname();
  const { user, setUser } = useStore();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error: any) {
      console.error("Login failed:", error);
      alert("Login Error: " + (error.message || "Unknown error"));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
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
        <div className="w-[1px] h-4 bg-gray-700 mx-2"></div>
        <Link href="/settings" className="p-2 text-gray-400 hover:text-orange-500 transition-colors pointer-events-auto">
          <Settings2 size={18} />
        </Link>
      </div>

      <div className="w-32 flex justify-end pointer-events-auto">
        {user ? (
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full transition-all text-sm font-medium shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <img src={user.photoURL || ''} alt="Avatar" className="w-6 h-6 rounded-full" />
            <LogOut size={14} className="text-gray-400" />
          </button>
        ) : (
          <button onClick={handleLogin} className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-full transition-all text-sm font-medium shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]">
            <User size={16} />
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
