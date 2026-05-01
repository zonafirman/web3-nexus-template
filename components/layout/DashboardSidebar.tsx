"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, ArrowLeftRight, History, 
  Settings, ShieldCheck, LogOut, Zap
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWeb3Store } from '@/store/useWeb3Store';

// --- IMPORT DARI PUSAT ANIMASI GLOBAL ---
import { slideInItem, fadeUp } from '@/lib/animations';

// ==========================================
// 1. DATA STATIS & KONFIGURASI MENU
// ==========================================
const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: ArrowLeftRight, label: 'Swap', href: '/dashboard/swap' },
  { icon: History, label: 'History', href: '/dashboard/history' },
  { icon: ShieldCheck, label: 'Security', href: '/dashboard/security' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

// ==========================================
// 2. KOMPONEN UTAMA SIDEBAR
// ==========================================
const DashboardSidebar = () => {
  const pathname = usePathname();
  const { disconnect } = useWeb3Store();

  return (
    <motion.aside 
      initial="hidden"
      animate="visible"
      className="w-64 border-r border-white/5 bg-zinc-950/50 backdrop-blur-xl h-screen sticky top-0 hidden md:flex flex-col p-6 z-20"
    >
      {/* BRAND LOGO */}
      <motion.div variants={fadeUp}>
        <Link href="/" className="mb-10 flex items-center gap-3 group cursor-pointer w-max">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:rotate-12 transition-transform">
            <div className="w-3 h-3 bg-zinc-950 rounded-sm rotate-45"></div>
          </div>
          <span className="font-bold text-xl tracking-tight">NEXUS<span className="text-cyan-500">DASH</span></span>
        </Link>
      </motion.div>

      {/* MENU NAVIGATION */}
      <nav className="flex-1 space-y-2">
        {MENU_ITEMS.map((item, i) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          // Ekstraksi kelas CSS agar lebih mudah dibaca
          const activeClass = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]";
          const inactiveClass = "text-zinc-400 hover:bg-white/5 hover:text-white border-transparent";

          return (
            <motion.div key={item.label} variants={slideInItem} custom={0.1 * i}>
              <Link
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 border group ${isActive ? activeClass : inactiveClass}`}
              >
                <Icon size={20} className={isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform"} />
                <span className="font-semibold">{item.label}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="active-sidebar-dot" // Efek transisi mulus berpindah tab
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* BOTTOM SECTION: PRO BADGE & LOGOUT */}
      <motion.div variants={fadeUp} className="mt-auto space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-[30px] group-hover:bg-cyan-500/20 transition-colors"></div>
          <div className="relative z-10 flex items-center gap-2 mb-1">
            <Zap size={16} className="text-yellow-400" />
            <h4 className="text-white font-bold text-sm">Pro Activated</h4>
          </div>
          <p className="text-xs text-zinc-500">All logic engines are running smoothly.</p>
        </div>

        <button 
          onClick={disconnect}
          className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-semibold">Disconnect</span>
        </button>
      </motion.div>
    </motion.aside>
  );
};

export default DashboardSidebar;