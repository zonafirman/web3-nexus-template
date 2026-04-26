"use client";

import React from 'react';
import { User, Shield, Zap, Globe, Bell, Key } from 'lucide-react';

export default function SettingsPage() {
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
          {/* Menu Navigasi Pengaturan Kiri */}
          <div className="md:col-span-1 space-y-2">
            {[
              { icon: User, label: 'General', active: true },
              { icon: Zap, label: 'Advanced Swap' },
              { icon: Globe, label: 'Network & RPC' },
              { icon: Shield, label: 'Security & MEV' },
              { icon: Bell, label: 'Notifications' },
            ].map((item, i) => (
              <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${item.active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent'}`}>
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </div>

          {/* Area Konten Pengaturan Kanan */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Advanced Swap Settings */}
            <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10">
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
                    {['Auto', '0.1%', '0.5%', '1.0%'].map((val, i) => (
                      <button key={i} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${i === 1 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-zinc-950 border border-white/10 text-zinc-400 hover:text-white'}`}>
                        {val}
                      </button>
                    ))}
                    <div className="flex-1 flex items-center bg-zinc-950 border border-white/10 rounded-xl px-3">
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
                  <div className="w-12 h-6 bg-zinc-800 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-zinc-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Network & Security */}
            <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <Shield className="text-emerald-500" size={20} />
                <h3 className="text-lg font-bold text-white">Security & MEV</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400">MEV Blocker Enabled</h4>
                    <p className="text-xs text-emerald-500/70 mt-1">Transactions are routed privately to prevent front-running.</p>
                  </div>
                  <div className="w-12 h-6 bg-emerald-500/30 rounded-full relative cursor-pointer border border-emerald-500/50">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"></div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">Custom RPC Endpoint</label>
                  <input type="text" value="https://arb1.arbitrum.io/rpc" readOnly className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 font-mono focus:border-cyan-500/50 outline-none transition-colors" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}