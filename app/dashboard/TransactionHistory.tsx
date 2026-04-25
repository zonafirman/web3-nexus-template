"use client";

import React from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';

const transactions = [
  { id: 1, type: 'Swap', asset: 'ETH to USDC', amount: '+2,450.00 USDC', status: 'Completed', date: 'Today, 14:30', isPositive: true },
  { id: 2, type: 'Send', asset: 'USDT', amount: '-500.00 USDT', status: 'Completed', date: 'Today, 10:15', isPositive: false },
  { id: 3, type: 'Stake', asset: 'ETH', amount: '-1.5 ETH', status: 'Pending', date: 'Yesterday', isPositive: false },
  { id: 4, type: 'Receive', asset: 'ARB', amount: '+1,200.00 ARB', status: 'Completed', date: 'Apr 23', isPositive: true },
];

const TransactionHistory = () => {
  return (
    <div className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-white">Recent Transactions</h3>
        <button className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">View All</button>
      </div>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl flex items-center justify-center ${
                tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                tx.isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {tx.status === 'Pending' ? <RefreshCcw size={18} className="animate-spin-slow" /> :
                 tx.isPositive ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">{tx.type} <span className="text-zinc-500 font-normal">({tx.asset})</span></h4>
                <p className="text-xs text-zinc-500 mt-1">{tx.date}</p>
              </div>
            </div>
            
            <div className="text-right">
              <h4 className={`font-bold text-sm ${tx.isPositive ? 'text-emerald-400' : 'text-white'}`}>
                {tx.amount}
              </h4>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;