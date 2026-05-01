"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Fuel, BellDot, ChevronDown, CheckCircle2, AlertTriangle, Settings, LogOut, User, LifeBuoy } from 'lucide-react';
import { useWeb3Store } from '@/store/useWeb3Store';

// Import Dashboard components
import BalanceCard from "./BalanceCard";
import PortfolioChart from "./PortfolioChart";
import TransactionHistory from "./TransactionHistory";
import SwapCard from "./SwapCard";

// Extracted static data for mapping
const NOTIFICATIONS = [
  { id: 1, type: 'success', title: 'Swap Successful', desc: '1.2 ETH swapped for 4,104.50 USDC', time: '2 mins ago', icon: CheckCircle2, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10' },
  { id: 2, type: 'warning', title: 'High Gas Volatility', desc: 'Network fees are currently spiking.', time: '1 hour ago', icon: AlertTriangle, iconColor: 'text-yellow-400', iconBg: 'bg-yellow-500/10' },
];

const PROFILE_MENU = [
  { id: 'profile', icon: User, label: 'My Profile' },
  { id: 'settings', icon: Settings, label: 'Preferences' },
  { id: 'support', icon: LifeBuoy, label: 'Support' },
];

export default function DashboardOverview() {
  const { isConnected, disconnect } = useWeb3Store();
  
  // Dropdown states
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Start with a generic greeting to prevent SSR hydration mismatches
  const [greeting, setGreeting] = useState("Welcome"); 

  // Refs for outside click detection
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Outside click detection and dynamic greeting effect
  useEffect(() => {
    // Set greeting based on client's local time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Outside Click Logic
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

  // Animation Variants
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
      {/* DASHBOARD HEADER */}
      <motion.header variants={itemVariants} className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5 relative z-50">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Zona</span>
            {isConnected && <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mt-1 shadow-[0_0_10px_#10b981]"></span>}
          </h1>
          <p className="text-zinc-500 mt-1 font-medium">Your Web3 command center is active and secured.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto relative">
          
          {/* Gas Fee Tracker (Hover Animation) */}
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
                  key="notif-dropdown"
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
                    {NOTIFICATIONS.map((notif) => {
                      const Icon = notif.icon;
                      return (
                        <div key={notif.id} className="p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer flex gap-3 items-start">
                          <div className={`p-2 rounded-lg mt-0.5 ${notif.iconBg} ${notif.iconColor}`}><Icon size={16} /></div>
                          <div>
                            <p className="text-sm font-bold text-white">{notif.title}</p>
                            <p className="text-xs text-zinc-400 mt-0.5">{notif.desc}</p>
                            <p className="text-[10px] text-zinc-600 mt-1 font-medium uppercase">{notif.time}</p>
                          </div>
                        </div>
                      );
                    })}
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-zinc-950 text-sm shadow-md">
                ZM
              </div>
              <ChevronDown size={16} className={`text-zinc-500 mr-1 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-cyan-400' : ''}`} />
            </div>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  key="profile-dropdown"
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
                    {PROFILE_MENU.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button key={item.id} className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/5 rounded-2xl transition-colors">
                          <Icon size={16} className="text-zinc-500" /> {item.label}
                        </button>
                      );
                    })}
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

      {/* WIDGET AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 relative z-20">
        
        {/* Main Column (Left & Center) */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          
          {/* Top Row: Balance & Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div variants={itemVariants} className="h-full">
              <BalanceCard />
            </motion.div>
            <motion.div variants={itemVariants} className="h-full">
              <PortfolioChart />
            </motion.div>
          </div>
          
          {/* Bottom Row: Transaction History */}
          <motion.div variants={itemVariants}>
            <TransactionHistory />
          </motion.div>

        </div>
        
        {/* Side Column (Right): Swap Card */}
        <div className="lg:col-span-1">
          <motion.div variants={itemVariants} className="sticky top-24">
             <SwapCard />
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}