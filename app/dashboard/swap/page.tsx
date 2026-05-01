"use client";

import React, { useState } from 'react';
import SwapCard from "../SwapCard";
import { BarChart3, TrendingUp, Maximize2 } from 'lucide-react';

// Mock data for market statistics
const marketStats = [
  { label: '24h Volume', value: '$1.2B' },
  { label: 'Market Cap', value: '$410B' },
  { label: 'FDV', value: '$410B' },
];

export default function SwapPage() {
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const timeframes = ['1H', '1D', '1W', '1M'];

  return (
    <div className="p-8 pt-8 max-w-7xl mx-auto pb-24">
      <header className="mb-8 flex justify-between items-end pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Pro Swap</h1>
          <p className="text-zinc-500 mt-1">Advanced trading interface with AI-optimized routing.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Pro Charting Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="p-6 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-md h-125 flex flex-col">
            
            {/* Chart Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-2 border-zinc-900 z-10 text-xs font-bold">ETH</div>
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center border-2 border-zinc-900 z-0 text-xs font-bold text-zinc-950">USDC</div>
                  </div>
                  <h2 className="text-xl font-bold text-white ml-2">ETH / USDC</h2>
                </div>
                <div className="h-6 w-px bg-white/10"></div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-400">$3,420.50</h3>
                  <p className="text-xs text-emerald-500 flex items-center gap-1"><TrendingUp size={12} /> +2.45% (24h)</p>
                </div>
              </div>
              <div className="flex gap-2">
                {timeframes.map((tf) => (
                  <button 
                    key={tf} 
                    onClick={() => setActiveTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      activeTimeframe === tf 
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                        : 'bg-zinc-800 text-zinc-400 border-transparent hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
                <button className="p-1.5 ml-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"><Maximize2 size={16} /></button>
              </div>
            </div>

            {/* Simulated Superchart Area */}
            <div className="flex-1 rounded-xl bg-zinc-950 border border-white/5 relative overflow-hidden flex items-center justify-center group">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px]"></div>
              <BarChart3 size={48} className="text-zinc-800 group-hover:text-cyan-500/20 transition-colors" />
              <div className="absolute bottom-4 right-4 text-xs font-mono text-zinc-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Data Feed
              </div>
            </div>
          </div>
          
          {/* Market Stats */}
          <div className="grid grid-cols-3 gap-4">
            {marketStats.map((stat, i) => (
              <div key={stat.label} className="p-5 rounded-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-md hover:bg-zinc-900/60 transition-colors">
                <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Swap Component */}
        <div className="lg:col-span-1">
          <SwapCard />
        </div>
      </div>
    </div>
  );
}