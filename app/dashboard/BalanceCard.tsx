"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Wallet } from 'lucide-react';

const BalanceCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-2xl"
    >
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-[80px]"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
            <Wallet size={20} />
          </div>
          <span className="text-zinc-400 font-medium">Total Balance</span>
        </div>
        
        <div className="flex items-end gap-3 mb-4">
          <h2 className="text-4xl font-bold text-white">$42,069.00</h2>
          <div className="flex items-center gap-1 text-emerald-400 text-sm font-bold mb-1">
            <TrendingUp size={16} />
            +12.5%
          </div>
        </div>

        <div className="flex gap-2">
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            0x71C...4f2a
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;