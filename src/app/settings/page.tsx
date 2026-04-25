'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Shield, Settings2, Bell } from 'lucide-react';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save to localStorage or backend
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 selection:bg-orange-500/30">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
          <Link href="/" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <ArrowLeft size={24} className="text-gray-400 hover:text-orange-400" />
          </Link>
          <h1 className="text-3xl font-light tracking-tight">Configuration</h1>
        </header>

        <div className="space-y-8">
          
          {/* API Configuration */}
          <section className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
            {/* Subtle glow behind the section */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>
            
            <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
              <Shield className="text-orange-500" />
              <h2 className="text-xl font-medium">LLM Engine</h2>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Google Gemini API Key (Optional Override)</label>
                <input 
                  type="password" 
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">By default, the engine uses the key securely stored in `.env.local`. Enter a key here to override it for your session directly from the client.</p>
              </div>

              <button 
                type="submit" 
                className="bg-orange-600 hover:bg-orange-500 text-white font-medium py-2.5 px-6 rounded-xl transition-all flex items-center gap-2"
              >
                <Save size={18} />
                {isSaved ? 'Saved!' : 'Save Configuration'}
              </button>
            </form>
          </section>

          {/* User Preferences */}
          <section className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
              <Settings2 className="text-orange-500" />
              <h2 className="text-xl font-medium">Preferences</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-200">Dark Mode Aesthetic</h3>
                  <p className="text-sm text-gray-500">Toggle the deep dark theme.</p>
                </div>
                <div className="w-12 h-6 bg-orange-500 rounded-full flex items-center p-1 justify-end cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-200">Milestone Alerts</h3>
                  <p className="text-sm text-gray-500">Get notifications for upcoming learning nodes.</p>
                </div>
                <div className="w-12 h-6 bg-gray-700 rounded-full flex items-center p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
