"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Wallet, Menu, Mic, Sparkles, LogOut, Settings } from 'lucide-react';
import AuthModal from '@/components/web3/AuthModal';
import { useWeb3Store } from '@/store/useWeb3Store';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiActive, setIsAiActive] = useState(false);
  const pathname = usePathname();

  // SEKARANG KITA GUNAKAN STORE REAL
  const { isConnected, address, balance, disconnect } = useWeb3Store();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sembunyikan Navbar utama jika berada di route dashboard
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <>
      {/* Floating Dynamic Island Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
      >
        <div className={`transition-all duration-500 rounded-full border ${
          isScrolled 
            ? "bg-zinc-950/70 backdrop-blur-2xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
            : "bg-zinc-900/40 backdrop-blur-lg border-white/5 shadow-xl"
        }`}>
          <div className="flex justify-between items-center px-4 py-3">
            
            {/* Logo */}
            <div className="flex items-center gap-3 pl-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <div className="w-3 h-3 bg-zinc-950 rounded-sm rotate-45"></div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white hidden sm:block">NEXUS</span>
            </div>

            {/* AI Command Center (The 2026 Trend) */}
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-zinc-950/50 rounded-full border border-white/5 flex-1 max-w-sm mx-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Sparkles size={14} className="text-cyan-500" />
              <input 
                type="text" 
                placeholder="Ask AI to swap, stake, or send..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-zinc-500 w-full px-2"
              />
              <button onClick={() => setIsAiActive(!isAiActive)} className={`p-1.5 rounded-full transition-colors ${isAiActive ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/10 text-zinc-400'}`}>
                <Mic size={14} />
              </button>
            </div>

            {/* Desktop Menu & Wallet */}
            <div className="hidden lg:flex items-center gap-6 pr-2">
              <div className="flex items-center gap-6 text-sm font-semibold text-zinc-400">
                <a href="#" className="hover:text-white transition-colors">Trade</a>
                <a href="#" className="hover:text-white transition-colors">Earn</a>
              </div>
              
              <div className="h-4 w-px bg-white/10"></div>

              {isConnected ? (
                // connected state: Tampilan UI 2026 jika sudah konek
                <div className="flex items-center gap-3 px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-full group relative cursor-pointer">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-sm font-semibold text-white">{balance}</span>
                  <span className="text-xs font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded-md">
                    {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
                  </span>
                  
                  {/* Dropdown Menu Logout on Hover */}
                  <div className="absolute top-full right-0 mt-3 w-48 p-2 bg-zinc-950 rounded-2xl border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <button className="w-full flex items-center gap-2.5 p-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                      <Settings size={16} /> Wallet Settings
                    </button>
                    <button 
                      onClick={disconnect} // <-- Trigger fungsi disconnect Store
                      className="w-full flex items-center gap-2.5 p-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                      <LogOut size={16} /> Disconnect
                    </button>
                  </div>
                </div>
              ) : (
                // disconnected state
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-950 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <Wallet size={16} />
                  Connect
                </button>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <button className="lg:hidden p-2 text-zinc-400 hover:text-white">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;