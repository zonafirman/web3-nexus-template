"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  History, 
  Settings, 
  ShieldCheck, 
  LogOut 
} from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Overview', active: true },
  { icon: <ArrowLeftRight size={20} />, label: 'Swap' },
  { icon: <History size={20} />, label: 'History' },
  { icon: <ShieldCheck size={20} />, label: 'Security' },
  { icon: <Settings size={20} />, label: 'Settings' },
];

const DashboardSidebar = () => {
  return (
    <aside className="w-64 border-r border-white/10 bg-zinc-950/50 backdrop-blur-xl h-screen sticky top-0 hidden md:flex flex-col p-6">
      <div className="mb-10 flex items-center gap-2">
        <div className="w-6 h-6 bg-cyan-500 rounded shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
        <span className="font-bold text-lg">NEXUS<span className="text-cyan-500">DASH</span></span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              item.active 
              ? "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20" 
              : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;