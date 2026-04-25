"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, Settings2, ShieldCheck, Mic, Sparkles } from 'lucide-react';

const SwapCard = () => {
  const [isAiMode, setIsAiMode] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Simulasi tombol scan ditekan
  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="relative p-1 rounded-[2.5rem] bg-linear-to-b from-white/10 to-transparent">
      <div className="p-6 rounded-[2.4rem] bg-zinc-950 border border-white/5 backdrop-blur-xl w-full max-w-md shadow-2xl">
        
        {/* Header & Toggle AI Mode */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3 bg-zinc-900/50 p-1 rounded-full border border-white/5">
            <button 
              onClick={() => setIsAiMode(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${!isAiMode ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
            >
              Manual
            </button>
            <button 
              onClick={() => setIsAiMode(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1 transition-all ${isAiMode ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-zinc-500 hover:text-white'}`}
            >
              <Sparkles size={14} /> AI Intent
            </button>
          </div>
          <Settings2 size={20} className="text-zinc-500 hover:text-white cursor-pointer transition-colors" />
        </div>

        <AnimatePresence mode="wait">
          {!isAiMode ? (
            /* MANUAL SWAP UI */
            <motion.div 
              key="manual"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-2 relative"
            >
              {/* Input From */}
              <div className="p-4 rounded-3xl bg-zinc-900/60 border border-transparent hover:border-white/10 transition-colors group">
                <div className="flex justify-between text-xs text-zinc-500 mb-3 font-medium">
                  <span>Pay</span>
                  <span className="group-hover:text-cyan-400 transition-colors cursor-pointer">Max: 1.24 ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <input type="number" placeholder="0.0" className="bg-transparent text-3xl font-bold text-white outline-none w-1/2 placeholder-zinc-700" />
                  <button className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-2xl border border-white/5 text-sm font-bold text-white hover:bg-zinc-700 transition-colors">
                    <div className="w-5 h-5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    ETH
                  </button>
                </div>
              </div>

              {/* Swap Icon Button */}
              <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-10">
                <button className="p-3 bg-zinc-950 border-4 border-zinc-950 rounded-2xl text-cyan-500 hover:scale-110 hover:rotate-180 transition-all duration-500 shadow-xl">
                  <ArrowUpDown size={16} />
                </button>
              </div>

              {/* Input To */}
              <div className="p-4 rounded-3xl bg-zinc-900/60 border border-transparent hover:border-white/10 transition-colors">
                <div className="flex justify-between text-xs text-zinc-500 mb-3 font-medium">
                  <span>Receive</span>
                  <span>Balance: 0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <input type="number" placeholder="0.0" className="bg-transparent text-3xl font-bold text-white outline-none w-1/2 placeholder-zinc-700" />
                  <button className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-2 rounded-2xl text-sm font-bold text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                    <div className="w-5 h-5 bg-white/20 rounded-full border border-cyan-400/50"></div>
                    USDC
                  </button>
                </div>
              </div>

              {/* Real-time Security Scanner */}
              <div 
                onClick={handleScan}
                className="mt-4 p-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex items-start gap-3 cursor-pointer hover:bg-emerald-500/10 transition-colors"
              >
                {isScanning ? (
                  <div className="w-5 h-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mt-0.5"></div>
                ) : (
                  <ShieldCheck size={20} className="text-emerald-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-emerald-400 mb-0.5">Contract Audited</h4>
                  <p className="text-[10px] text-emerald-500/70">No honeypot or malicious logic detected in USDC smart contract.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* AI INTENT SWAP UI */
            <motion.div 
              key="ai"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-4 space-y-6"
            >
              <div className="w-24 h-24 mx-auto relative flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute inset-2 border-2 border-blue-500/30 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
                <button className="w-16 h-16 bg-linear-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 transition-transform group">
                  <Mic size={24} className="text-white group-hover:animate-pulse" />
                </button>
              </div>
              <div className="text-center">
                <h3 className="text-white font-medium mb-2">Hold to speak your intent</h3>
                <p className="text-xs text-zinc-500">&quot;Swap half of my Ethereum to USDC when the gas fee is below 15 gwei.&quot;</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <button className="w-full mt-6 py-4 bg-white hover:bg-zinc-200 text-zinc-950 font-bold rounded-2xl transition-all relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full duration-1000 transition-all -translate-x-full"></div>
          <span className="relative z-10">{isAiMode ? 'Execute AI Strategy' : 'Review Swap'}</span>
        </button>

      </div>
    </div>
  );
};

export default SwapCard;