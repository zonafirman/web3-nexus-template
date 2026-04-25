"use client";

import React from 'react';
import { ArrowUpDown, Settings2 } from 'lucide-react';

const SwapCard = () => {
  return (
    <div className="p-6 rounded-[2rem] bg-zinc-900/50 border border-white/10 backdrop-blur-md w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-white">Swap</h3>
        <Settings2 size={18} className="text-zinc-500 hover:text-white cursor-pointer" />
      </div>

      <div className="space-y-2 relative">
        {/* Input From */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex justify-between text-xs text-zinc-500 mb-2 font-medium">
            <span>From</span>
            <span>Balance: 1.24 ETH</span>
          </div>
          <div className="flex justify-between items-center">
            <input type="number" placeholder="0.0" className="bg-transparent text-2xl font-bold text-white outline-none w-1/2" />
            <button className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-xl border border-white/10 text-sm font-bold text-white">
              <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
              ETH
            </button>
          </div>
        </div>

        {/* Swap Icon Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <button className="p-2 bg-zinc-900 border-4 border-zinc-950 rounded-xl text-cyan-500 hover:scale-110 transition-transform">
            <ArrowUpDown size={18} />
          </button>
        </div>

        {/* Input To */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex justify-between text-xs text-zinc-500 mb-2 font-medium">
            <span>To (Estimated)</span>
            <span>Balance: 0.00</span>
          </div>
          <div className="flex justify-between items-center">
            <input type="number" placeholder="0.0" className="bg-transparent text-2xl font-bold text-white outline-none w-1/2" />
            <button className="flex items-center gap-2 bg-cyan-500 px-3 py-1.5 rounded-xl text-sm font-bold text-zinc-950">
              <div className="w-5 h-5 bg-white/20 rounded-full"></div>
              USDC
            </button>
          </div>
        </div>
      </div>

      <button className="w-full mt-6 py-4 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
        Swap Tokens
      </button>
    </div>
  );
};

export default SwapCard;