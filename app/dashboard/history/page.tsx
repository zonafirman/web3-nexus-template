"use client";

import React, { useState, useMemo } from 'react';
import { Search, Download, Filter, ArrowUpRight, ArrowDownRight, RefreshCcw, ExternalLink } from 'lucide-react';

// 1. Define TypeScript interface for robust development
interface Transaction {
  id: string;
  type: 'Swap' | 'Send' | 'Receive' | 'Approve';
  from: string;
  to: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  hash: string;
  isPositive: boolean | null;
}

// 2. Mock data for UI development
const fullHistory: Transaction[] = [
  { id: 'tx-1', type: 'Swap', from: '1.2 ETH', to: '4,104.50 USDC', status: 'Completed', date: 'Apr 26, 2026 - 11:30 AM', hash: '0x8f...2a1b', isPositive: true },
  { id: 'tx-2', type: 'Send', from: '500.00 USDT', to: '-', status: 'Completed', date: 'Apr 25, 2026 - 09:15 AM', hash: '0x1a...9c4d', isPositive: false },
  { id: 'tx-3', type: 'Approve', from: 'USDC', to: 'Uniswap V3', status: 'Completed', date: 'Apr 24, 2026 - 14:20 PM', hash: '0x3b...7e2f', isPositive: null },
  { id: 'tx-4', type: 'Receive', from: '-', to: '2.5 ETH', status: 'Pending', date: 'Apr 24, 2026 - 10:05 AM', hash: '0x9d...1f8a', isPositive: true },
  { id: 'tx-5', type: 'Swap', from: '1000 ARB', to: '1.1 ETH', status: 'Failed', date: 'Apr 22, 2026 - 16:45 PM', hash: '0x4c...8b3e', isPositive: true },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Active filtering logic (Tabs + Search integration)
  const filteredHistory = useMemo(() => {
    let filtered = fullHistory;

    // Filter by active category tab
    if (activeTab === 'Swaps') filtered = filtered.filter(tx => tx.type === 'Swap');
    if (activeTab === 'Transfers') filtered = filtered.filter(tx => tx.type === 'Send' || tx.type === 'Receive');
    if (activeTab === 'Approvals') filtered = filtered.filter(tx => tx.type === 'Approve');

    // Filter by search query (checks hash or transaction type)
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(tx => 
        tx.hash.toLowerCase().includes(lowerQuery) || 
        tx.type.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }, [activeTab, searchQuery]);

  return (
    <div className="p-8 pt-8 max-w-6xl mx-auto pb-24">
      
      {/* Header Section */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Transaction History</h1>
          <p className="text-zinc-500 mt-1">Detailed record of all your on-chain activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-zinc-800 transition-colors">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-2 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-md">
        
        {/* Controls Bar: Tabs and Search Input */}
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-zinc-950 rounded-xl border border-white/5 w-full md:w-auto">
            {['All', 'Swaps', 'Transfers', 'Approvals'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex-1 md:flex-none ${
                  activeTab === tab 
                    ? 'bg-zinc-800 text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search and Filter Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 border border-white/10 rounded-xl focus-within:border-cyan-500/50 transition-colors w-full md:w-64">
              <Search size={16} className="text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search hash or type..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white w-full" 
              />
            </div>
            <button className="p-2.5 bg-zinc-950 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-zinc-500 uppercase tracking-wider">
                <th className="pb-4 px-4 font-medium">Transaction</th>
                <th className="pb-4 px-4 font-medium">Amount</th>
                <th className="pb-4 px-4 font-medium">Status</th>
                <th className="pb-4 px-4 font-medium">Date & Time</th>
                <th className="pb-4 px-4 font-medium text-right">Explorer</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((tx) => (
                  <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl flex items-center justify-center ${
                      tx.type === 'Approve' ? 'bg-blue-500/10 text-blue-500' :
                      tx.isPositive === false ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {tx.type === 'Approve' ? <Filter size={16} /> :
                       tx.isPositive === false ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    </div>
                    <div>
                      <p className="font-bold text-white">{tx.type}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-zinc-300">
                    {tx.type === 'Swap' ? `${tx.from} → ${tx.to}` : tx.from !== '-' ? tx.from : tx.to}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                      tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                      'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {tx.status === 'Pending' && <RefreshCcw size={10} className="animate-spin" />}
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-zinc-500 text-xs">{tx.date}</td>
                  <td className="py-4 px-4 text-right">
                    <button className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors ml-auto flex items-center gap-2">
                      {tx.hash} <ExternalLink size={12} />
                    </button>
                  </td>
                </tr>
                ))
              ) : (
                /* Empty State (when search yields no results) */
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-500">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}