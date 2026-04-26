"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Fuel, BellDot, ChevronDown, CheckCircle2, AlertTriangle, Settings, LogOut, User, LifeBuoy } from 'lucide-react';
import { useWeb3Store } from '@/store/useWeb3Store';

// Mengimpor semua komponen Dashboard
import BalanceCard from "./BalanceCard";
import PortfolioChart from "./PortfolioChart";
import TransactionHistory from "./TransactionHistory";
import SwapCard from "./SwapCard";

export default function DashboardOverview() {
  const { isConnected, disconnect } = useWeb3Store();
  
  // State untuk Dropdowns
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  });

  // Refs untuk deteksi klik di luar dropdown
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Efek untuk deteksi klik di luar dropdown
  useEffect(() => {
    // Deteksi Klik di Luar
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Varian Animasi
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
  };

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 200, damping: 20 } },
    exit: { opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)", transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 pt-8 max-w-7xl mx-auto pb-32"
    >
      {/* HEADER DASHBOARD */}
      <motion.header variants={itemVariants} className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5 relative z-50">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            {greeting}, <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Zona</span>
            {isConnected && <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mt-1 shadow-[0_0_10px_#10b981]"></span>}
          </h1>
          <p className="text-zinc-500 mt-1 font-medium">Your Web3 command center is active and secured.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto relative">
          
          {/* Gas Fee Tracker (Animasi Hover) */}
          <div className="flex items-center gap-2 p-2 px-4 bg-zinc-900/80 border border-white/10 backdrop-blur-md rounded-2xl text-xs font-semibold shadow-inner flex-1 md:flex-none justify-center group hover:border-cyan-500/30 transition-colors cursor-default">
            <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] group-hover:animate-ping"></div>
            <span className="text-white">Arbitrum</span>
            <div className="h-3 w-px bg-white/20 mx-1"></div>
            <Fuel size={14} className="text-zinc-500 group-hover:text-cyan-400 transition-colors" />
            <span className="text-emerald-400">12 gwei</span>
          </div>
          
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
              className={`p-3 bg-zinc-900/80 border backdrop-blur-md rounded-2xl transition-all relative ${isNotifOpen ? 'border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'}`}
            >
              <BellDot size={18} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full"></div>
            </button>

            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="absolute top-full right-0 mt-3 w-80 bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Notifications</span>
                    <span className="text-xs text-cyan-500 font-semibold cursor-pointer hover:text-cyan-400">Mark all as read</span>
                  </div>
                  <div className="p-2">
                    <div className="p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer flex gap-3 items-start">
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg mt-0.5"><CheckCircle2 size={16} /></div>
                      <div>
                        <p className="text-sm font-bold text-white">Swap Successful</p>
                        <p className="text-xs text-zinc-400 mt-0.5">1.2 ETH swapped for 4,104.50 USDC</p>
                        <p className="text-[10px] text-zinc-600 mt-1 font-medium uppercase">2 mins ago</p>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer flex gap-3 items-start">
                      <div className="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg mt-0.5"><AlertTriangle size={16} /></div>
                      <div>
                        <p className="text-sm font-bold text-white">High Gas Volatility</p>
                        <p className="text-xs text-zinc-400 mt-0.5">Network fees are currently spiking.</p>
                        <p className="text-[10px] text-zinc-600 mt-1 font-medium uppercase">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <div 
              onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
              className={`flex items-center gap-2 p-1.5 pl-3 bg-zinc-900/80 border backdrop-blur-md rounded-2xl cursor-pointer transition-all ${isProfileOpen ? 'border-cyan-500/50 bg-white/5 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-white/10 hover:bg-white/5 hover:border-white/20'}`}
            >
              <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-zinc-950 text-sm shadow-md">
                ZM
              </div>
              <ChevronDown size={16} className={`text-zinc-500 mr-1 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-cyan-400' : ''}`} />
            </div>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="absolute top-full right-0 mt-3 w-56 bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                  <div className="p-4 border-b border-white/5">
                    <p className="font-bold text-white text-sm">Zona Maulana</p>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">0x71C...8976F</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/5 rounded-2xl transition-colors">
                      <User size={16} className="text-zinc-500" /> My Profile
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/5 rounded-2xl transition-colors">
                      <Settings size={16} className="text-zinc-500" /> Preferences
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/5 rounded-2xl transition-colors">
                      <LifeBuoy size={16} className="text-zinc-500" /> Support
                    </button>
                  </div>
                  <div className="p-2 border-t border-white/5 bg-red-500/5">
                    <button 
                      onClick={disconnect}
                      className="w-full flex items-center justify-center gap-2 p-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors"
                    >
                      <LogOut size={16} /> Disconnect
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.header>

      {/* AREA WIDGET */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 relative z-20">
        
        {/* Kolom Utama (Kiri & Tengah) */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          
          {/* Baris Atas: Balance & Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div variants={itemVariants} className="h-full">
              <BalanceCard />
            </motion.div>
            <motion.div variants={itemVariants} className="h-full">
              <PortfolioChart />
            </motion.div>
          </div>
          
          {/* Baris Bawah: Transaction History (KOMPONEN ASLI) */}
          <motion.div variants={itemVariants}>
            <TransactionHistory />
          </motion.div>

        </div>
        
        {/* Kolom Samping (Kanan): Swap Card (KOMPONEN ASLI) */}
        <div className="lg:col-span-1">
          <motion.div variants={itemVariants} className="sticky top-24">
             <SwapCard />
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}