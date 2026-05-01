"use client";

import React, { useState } from 'react';
import { User, Shield, Zap, Globe, Bell } from 'lucide-react';

// 1. Define navigation configuration
const NAV_ITEMS = [
  { id: 'General', icon: User, label: 'General' },
  { id: 'Swap', icon: Zap, label: 'Advanced Swap' },
  { id: 'Network', icon: Globe, label: 'Network & RPC' },
  { id: 'Security', icon: Shield, label: 'Security & MEV' },
  { id: 'Notifications', icon: Bell, label: 'Notifications' },
];

export default function SettingsPage() {
  // 2. State management for interactive development
  const [activeTab, setActiveTab] = useState('Swap');
  const [slippage, setSlippage] = useState('0.5%');
  const [isExpertMode, setIsExpertMode] = useState(false);
  const [isMevEnabled, setIsMevEnabled] = useState(true);
  const [rpcUrl, setRpcUrl] = useState('https://arb1.arbitrum.io/rpc');

  const slippageOptions = ['Auto', '0.1%', '0.5%', '1.0%'];

  return (
    <div className="p-8 pt-8 max-w-4xl mx-auto pb-24">
      <header className="mb-10 pb-6 border-b border-white/5">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Preferences</h1>
        <p className="text-zinc-500 mt-1">Manage your account, network settings, and security protocols.</p>
      </header>

      <div className="space-y-8">
        
        {/* Profile Section */}
        <section className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-md flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-1">
            <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center border-4 border-zinc-950">
              <span className="text-3xl font-black text-white">ZM</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">Zona Firman Maulana</h2>
            <p className="text-sm font-mono text-zinc-500 bg-white/5 inline-block px-3 py-1 rounded-lg border border-white/5 mb-4">
              0x71C7656EC7ab88b098defB751B7401B5f6d8976F
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white text-zinc-950 font-bold text-sm rounded-xl hover:bg-zinc-200 transition-colors">
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-transparent border border-white/10 text-white font-bold text-sm rounded-xl hover:bg-white/5 transition-colors">
                Copy Address
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Navigation Sidebar */}
          <div className="md:col-span-1 space-y-2">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Panel: Advanced Swap */}
            {activeTab === 'Swap' && (
              <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <Zap className="text-cyan-500" size={20} />
                  <h3 className="text-lg font-bold text-white">Advanced Swap</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-semibold text-white">Default Slippage Tolerance</label>
                      <span className="text-xs text-zinc-500">Auto-adjusts based on volatility</span>
                    </div>
                    <div className="flex gap-2">
                      {slippageOptions.map((val) => (
                        <button 
                          key={val} 
                          onClick={() => setSlippage(val)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                            slippage === val 
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                              : 'bg-zinc-950 border border-white/10 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                      <div className="flex-1 flex items-center bg-zinc-950 border border-white/10 rounded-xl px-3 focus-within:border-cyan-500/50 transition-colors">
                        <input type="text" placeholder="Custom" className="bg-transparent border-none outline-none text-sm text-white w-full text-right" />
                        <span className="text-zinc-500 text-sm ml-1">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-white/5">
                    <div>
                      <h4 className="text-sm font-bold text-white">Expert Mode</h4>
                      <p className="text-xs text-zinc-500 mt-1">Bypass confirmation modals and allow high slippage trades.</p>
                    </div>
                    <div 
                      onClick={() => setIsExpertMode(!isExpertMode)}
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors border ${
                        isExpertMode ? 'bg-cyan-500/20 border-cyan-500/50' : 'bg-zinc-800 border-transparent'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                        isExpertMode ? 'right-1 bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'left-1 bg-zinc-500'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Panel: Security & MEV */}
            {activeTab === 'Security' && (
              <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <Shield className="text-emerald-500" size={20} />
                  <h3 className="text-lg font-bold text-white">Security & MEV</h3>
                </div>

                <div className="space-y-4">
                  <div className={`flex items-center justify-between p-4 border rounded-2xl transition-colors ${
                    isMevEnabled ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-zinc-950 border-white/5'
                  }`}>
                    <div>
                      <h4 className={`text-sm font-bold ${isMevEnabled ? 'text-emerald-400' : 'text-white'}`}>MEV Blocker Enabled</h4>
                      <p className={`text-xs mt-1 ${isMevEnabled ? 'text-emerald-500/70' : 'text-zinc-500'}`}>
                        Transactions are routed privately to prevent front-running.
                      </p>
                    </div>
                    <div 
                      onClick={() => setIsMevEnabled(!isMevEnabled)}
                      className={`w-12 h-6 rounded-full relative cursor-pointer border transition-colors ${
                        isMevEnabled ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-zinc-800 border-transparent'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                        isMevEnabled ? 'right-1 bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'left-1 bg-zinc-500'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Panel: Network & RPC */}
            {activeTab === 'Network' && (
              <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <Globe className="text-blue-500" size={20} />
                  <h3 className="text-lg font-bold text-white">Network & RPC</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-white mb-2 block">Custom RPC Endpoint</label>
                    <input 
                      type="text" 
                      value={rpcUrl} 
                      onChange={(e) => setRpcUrl(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 font-mono focus:border-cyan-500/50 outline-none transition-colors" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Panel: Placeholder for empty tabs */}
            {(activeTab === 'General' || activeTab === 'Notifications') && (
              <div className="p-12 text-center rounded-3xl bg-zinc-900/40 border border-white/10 animate-in fade-in duration-300">
                <p className="text-zinc-500">{activeTab} settings are under construction.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}