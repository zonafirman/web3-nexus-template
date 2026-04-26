"use client";

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Send, Plus, CreditCard, Activity } from 'lucide-react';
import { useWeb3Store } from '@/store/useWeb3Store';

const BalanceCard = () => {
  const { isConnected, balance } = useWeb3Store();

  // Simulasi konversi ETH ke USD (Anggap 1 ETH = $3,400)
  const numericBalance = parseFloat(balance.replace(' ETH', '')) || 0;
  const usdBalance = (numericBalance * 3400).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-zinc-900/80 to-[#09090b]/80 border border-white/10 backdrop-blur-xl h-full flex flex-col justify-between relative overflow-hidden group shadow-2xl">
      
      {/* Efek Cahaya Latar Belakang */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-[60px] pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-700"></div>

      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl flex items-center gap-2 text-xs font-semibold text-zinc-400">
            <Activity size={14} className="text-cyan-500" /> Total Balance
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold flex items-center gap-1">
            <ArrowUpRight size={12} /> +12.5%
          </span>
        </div>

        <div className="mb-2">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            ${isConnected ? usdBalance : '0.00'}
          </h2>
          <p className="text-zinc-500 font-mono mt-2 text-sm">
            ≈ {isConnected ? balance : '0.00 ETH'}
          </p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-4 gap-3 mt-8 relative z-10">
        {[
          { icon: Send, label: 'Send' },
          { icon: ArrowDownRight, label: 'Receive' },
          { icon: Plus, label: 'Top Up' },
          { icon: CreditCard, label: 'Card' },
        ].map((action, i) => (
          <button key={i} className="flex flex-col items-center gap-2 group/btn">
            <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center text-zinc-400 group-hover/btn:text-cyan-400 group-hover/btn:border-cyan-500/40 group-hover/btn:bg-cyan-500/10 transition-all duration-300 shadow-inner">
              <action.icon size={18} className="group-active/btn:scale-90 transition-transform" />
            </div>
            <span className="text-[10px] font-bold text-zinc-500 group-hover/btn:text-zinc-300">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BalanceCard;