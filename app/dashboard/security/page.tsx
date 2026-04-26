"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Search, Activity, Trash2, ExternalLink } from 'lucide-react';

const connectedApps = [
  { name: 'Uniswap V3', url: 'app.uniswap.org', risk: 'Low', allowance: 'Unlimited USDC', date: 'Oct 12, 2025' },
  { name: 'Aave Protocol', url: 'app.aave.com', risk: 'Low', allowance: '10.0 ETH', date: 'Nov 05, 2025' },
  { name: 'Unknown Contract', url: '0x8f2...9a12', risk: 'High', allowance: 'Unlimited USDT', date: 'Yesterday' },
];

export default function SecurityPage() {
  const [isScanning, setIsScanning] = useState(false);

  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div className="p-8 pt-8 max-w-5xl mx-auto pb-24">
      <header className="mb-10 pb-8 border-b border-white/5">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          Security Center <ShieldCheck className="text-emerald-500" size={28} />
        </h1>
        <p className="text-zinc-500 mt-1">Manage token allowances and scan for malicious smart contracts.</p>
      </header>

      {/* Top Section: Health Score & Scanner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        {/* Wallet Health Score */}
        <div className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px]"></div>
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-800" />
              <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset="40" className="text-emerald-500 transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">89</span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Score</span>
            </div>
          </div>
          <h3 className="font-bold text-white text-lg">Wallet Health</h3>
          <p className="text-sm text-emerald-400 mt-1">1 High Risk Found</p>
        </div>

        {/* AI Contract Scanner */}
        <div className="md:col-span-2 p-8 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-md">
          <h3 className="font-bold text-white text-lg mb-2">AI Smart Contract Scanner</h3>
          <p className="text-sm text-zinc-400 mb-6">Paste a contract address to simulate transactions and detect honeypots or malicious code.</p>
          
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 p-3 bg-zinc-950 border border-white/10 rounded-2xl focus-within:border-cyan-500/50 transition-colors">
              <Search size={18} className="text-zinc-500 ml-2" />
              <input type="text" placeholder="0x..." className="bg-transparent border-none outline-none text-white w-full text-sm" />
            </div>
            <button 
              onClick={runScan}
              disabled={isScanning}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-2xl transition-all disabled:opacity-50 flex items-center gap-2 min-w-[120px] justify-center"
            >
              {isScanning ? (
                <><Activity size={18} className="animate-spin" /> Scanning</>
              ) : (
                'Run Audit'
              )}
            </button>
          </div>

          {/* Scanner Output Simulation */}
          <div className={`mt-6 p-4 rounded-xl border transition-all duration-500 ${isScanning ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-white/5 border-white/5'}`}>
             {isScanning ? (
               <div className="space-y-2 text-xs font-mono text-cyan-400">
                 <p className="animate-pulse">❯ Fetching contract ABI...</p>
                 <p className="animate-pulse delay-100">❯ Running static analysis...</p>
                 <p className="animate-pulse delay-200">❯ Simulating token swap methods...</p>
               </div>
             ) : (
               <div className="text-xs font-mono text-zinc-500">System ready. Awaiting contract address.</div>
             )}
          </div>
        </div>
      </div>

      {/* Revoke Allowances Table */}
      <div className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-white text-lg">Connected Applications</h3>
            <p className="text-sm text-zinc-400">Review and revoke access to your wallet.</p>
          </div>
          <button className="px-4 py-2 bg-red-500/10 text-red-500 font-bold text-sm rounded-xl hover:bg-red-500/20 transition-colors">
            Revoke All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs text-zinc-500 uppercase tracking-wider">
                <th className="pb-4 font-medium">Application</th>
                <th className="pb-4 font-medium">Risk Level</th>
                <th className="pb-4 font-medium">Allowance</th>
                <th className="pb-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {connectedApps.map((app, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4">
                    <p className="font-bold text-white flex items-center gap-2">
                      {app.name} <ExternalLink size={12} className="text-zinc-600" />
                    </p>
                    <p className="text-xs text-zinc-500">{app.url}</p>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${app.risk === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400'}`}>
                      {app.risk} Risk
                    </span>
                  </td>
                  <td className="py-4 text-zinc-300 font-mono text-xs">{app.allowance}</td>
                  <td className="py-4 text-right">
                    <button className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors ml-auto flex items-center justify-center">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}