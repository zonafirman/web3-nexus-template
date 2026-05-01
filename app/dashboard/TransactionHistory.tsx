"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, RefreshCcw, ExternalLink } from 'lucide-react';

// Mock data for recent transactions.
// In a real app, this would come from an API or a global state manager.
const MOCK_TRANSACTIONS = [
  { id: 1, type: 'Send', amount: '-0.50 ETH', status: 'Completed', date: '2 mins ago', icon: ArrowUpRight, color: 'text-red-400', bg: 'bg-red-500/10' },
  { id: 2, type: 'Receive', amount: '+12.40 ETH', status: 'Completed', date: '5 hours ago', icon: ArrowDownRight, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 3, type: 'Swap', amount: '1.2 ETH → USDC', status: 'In Progress', date: 'Just now', icon: RefreshCcw, color: 'text-blue-400', bg: 'bg-blue-500/10' },
];

const TransactionHistory = () => {
  return (
    // Main container with glassmorphism effect
    <div className="p-6 md:p-8 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-xl h-full flex flex-col group">
      
      {/* Component Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white tracking-tight">Recent Activity</h3>
        <button className="text-xs font-bold text-cyan-500 hover:text-cyan-400 transition-colors flex items-center gap-1 group/link">
          View Explorer <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Transaction List */}
      <div className="space-y-4 flex-1">
        {MOCK_TRANSACTIONS.map((tx, i) => {
          // Assigning the icon to a PascalCase variable is a best practice for rendering dynamic components.
          const Icon = tx.icon; 
          return (
            <motion.div 
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-transparent hover:border-white/5 hover:bg-white/[0.08] transition-all cursor-pointer group/item"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${tx.bg} flex items-center justify-center ${tx.color}`}>
                  <Icon size={20} className={tx.status === 'In Progress' ? 'animate-spin' : ''} />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{tx.type}</p>
                  <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mt-0.5">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${tx.color}`}>{tx.amount}</p>
                <p className="text-[10px] font-bold text-zinc-600 group-hover/item:text-zinc-400 transition-colors">{tx.status}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionHistory;