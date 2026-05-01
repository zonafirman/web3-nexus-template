"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { 
  Wallet, Menu, Mic, Sparkles, LogOut, Settings, X, 
  ArrowUpRight, Zap, Copy, Check, ChevronDown, ExternalLink, Activity, ArrowRight, Send, ArrowDownToLine
} from 'lucide-react';
import Link from 'next/link';
import AuthModal from '@/components/web3/AuthModal';
import { useWeb3Store } from '@/store/useWeb3Store';

// --- IMPORT DARI PUSAT ANIMASI GLOBAL ---
import { navbarIsland, dropdownBlur, mobileMenu, slideInItem, inlineExpand } from '@/lib/animations';

const NAV_LINKS = [
  { name: 'Features', href: '/#features' },
  { name: 'Dashboard', href: '/dashboard', isLive: true },
  { name: 'Docs', href: '/docs' },
];

const Navbar = () => {
  // --- States ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // AI States
  const [aiInput, setAiInput] = useState('');
  const [isAiDropdownOpen, setIsAiDropdownOpen] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  
  // --- Refs & Hooks ---
  const dropdownRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isConnected, address, balance, disconnect } = useWeb3Store();

  // --- Effects ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) setIsDropdownOpen(false);
      if (aiRef.current && !aiRef.current.contains(target)) setIsAiDropdownOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (pathname?.startsWith('/dashboard')) return null;

  // --- Handlers ---
  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (address) {
      navigator.clipboard.writeText(address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
    setIsOpen(false);
  };

  const handleAiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAiInput(value);
    
    if (value.length > 3) {
      setIsAiDropdownOpen(true);
      setIsAiProcessing(true);
      setTimeout(() => setIsAiProcessing(false), 1000);
    } else {
      setIsAiDropdownOpen(false);
    }
  };

  const closeAllMenus = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    setIsAiDropdownOpen(false);
    setAiInput('');
  };

  // --- Dynamic CSS Classes ---
  const glassContainerClass = isScrolled || isOpen || isAiDropdownOpen
    ? "bg-zinc-950/80 backdrop-blur-2xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
    : "bg-zinc-900/40 backdrop-blur-lg border-white/5 shadow-xl";

  const aiInputClass = `flex items-center gap-2 px-4 py-1.5 bg-zinc-950/50 rounded-full border border-white/5 w-full group overflow-hidden focus-within:border-cyan-500/50 transition-colors relative z-20`;

  return (
    <>
      {/* ================================================= */}
      {/* DYNAMIC ISLAND NAVBAR (DESKTOP) */}
      {/* ================================================= */}
      <motion.div
        variants={navbarIsland}
        initial="hidden"
        animate="visible"
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-5xl"
      >
        <div className={`transition-all duration-500 rounded-full border ${glassContainerClass}`}>
          <div className="flex justify-between items-center px-4 py-3">
            
            {/* BRAND LOGO */}
            <Link href="/" onClick={closeAllMenus} className="flex items-center gap-3 pl-2 group relative z-[70]">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:rotate-12 transition-transform">
                <div className="w-3 h-3 bg-zinc-950 rounded-sm rotate-45"></div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white hidden sm:block">NEXUS</span>
            </Link>

            {/* AI COMMAND CENTER (DESKTOP) */}
            <div className="hidden md:flex flex-1 max-w-sm mx-8 relative" ref={aiRef}>
              <div className={aiInputClass}>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Sparkles size={14} className={isAiDropdownOpen ? "text-cyan-400" : "text-cyan-500"} />
                <input 
                  type="text" 
                  value={aiInput}
                  onChange={handleAiInputChange}
                  placeholder="Ask AI to swap, stake, or send..." 
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-zinc-500 w-full px-2 relative z-10"
                />
                <button className={`p-1.5 rounded-full transition-colors relative z-10 ${isAiDropdownOpen ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/10 text-zinc-400'}`}>
                  <Mic size={14} />
                </button>
              </div>

              <AnimatePresence>
                {isAiDropdownOpen && (
                  <motion.div
                    variants={dropdownBlur}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 right-0 mt-3 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-10"
                  >
                    <div className="p-4">
                      {isAiProcessing ? (
                        <div className="flex items-center gap-3 text-cyan-400 text-sm font-medium p-2">
                          <Activity size={18} className="animate-spin" /> Parsing intent and scanning routes...
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-1">AI Recommendation</div>
                          <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-zinc-500 uppercase mb-1">Action</span>
                              <span className="text-sm text-white font-bold flex items-center gap-1.5"><Zap size={14} className="text-yellow-400" /> Auto-Swap</span>
                            </div>
                            <ArrowRight size={16} className="text-zinc-600" />
                            <div className="flex flex-col text-right">
                              <span className="text-[10px] text-zinc-500 uppercase mb-1">Optimal Route</span>
                              <span className="text-sm text-emerald-400 font-bold">ETH → USDC</span>
                            </div>
                          </div>
                          <div className="flex justify-between px-2 text-xs text-zinc-400">
                            <span>Est. Gas: <span className="text-white">~12 gwei</span></span>
                            <span>Slippage: <span className="text-white">0.1%</span></span>
                          </div>
                          <button 
                            onClick={closeAllMenus}
                            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-sm rounded-xl transition-all active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                          >
                            Prepare Transaction
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DESKTOP MENU & WALLET */}
            <div className="hidden lg:flex items-center gap-6 pr-2">
              <div className="flex items-center gap-6 text-sm font-semibold text-zinc-400">
                {NAV_LINKS.map((link) => (
                  <Link key={link.name} href={link.href} className="flex items-center gap-1.5 hover:text-white transition-colors relative">
                    {link.name}
                    {link.isLive && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              
              <div className="h-4 w-px bg-white/10"></div>
              
              {isConnected ? (
                // WALLET CONNECTED DROPDOWN
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className={`flex items-center gap-2 px-2 py-1.5 bg-zinc-900 border rounded-full transition-all hover:bg-zinc-800 active:scale-95 ${isDropdownOpen ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-white/10'}`}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 p-[1px]">
                      <div className="w-full h-full bg-zinc-950 rounded-full border border-zinc-900"></div>
                    </div>
                    <span className="text-sm font-bold text-white pl-1">{balance}</span>
                    <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2 py-1 rounded-full flex items-center gap-1">
                      {address ? `${address.slice(0, 5)}...${address.slice(-4)}` : ''}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        variants={dropdownBlur} 
                        initial="hidden" 
                        animate="visible" 
                        exit="exit" 
                        className="absolute top-full right-0 mt-4 w-72 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden z-50"
                      >
                        <div className="p-5 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Connected Wallet</span>
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Arbitrum
                            </div>
                          </div>
                          <div className="flex items-center justify-between bg-zinc-900/80 p-3 rounded-2xl border border-white/5 group hover:border-cyan-500/30 transition-colors">
                            <span className="font-mono text-sm text-zinc-300">{address ? `${address.slice(0, 8)}....${address.slice(-6)}` : ''}</span>
                            <div className="flex gap-1">
                              <button onClick={handleCopyAddress} className="p-1.5 text-zinc-500 hover:text-white bg-white/5 rounded-lg transition-colors">
                                {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                              </button>
                              <a href="#" className="p-1.5 text-zinc-500 hover:text-white bg-white/5 rounded-lg transition-colors"><ExternalLink size={14} /></a>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <Link href="/dashboard" onClick={closeAllMenus} className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/5 rounded-2xl transition-colors"><Activity size={18} className="text-cyan-500" /> View Portfolio</Link>
                          <Link href="/dashboard/settings" onClick={closeAllMenus} className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/5 rounded-2xl transition-colors"><Settings size={18} className="text-zinc-500" /> Preferences</Link>
                        </div>
                        <div className="p-2 border-t border-white/5 bg-red-500/5">
                          <button onClick={handleDisconnect} className="w-full flex items-center justify-center gap-2 p-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors"><LogOut size={16} /> Disconnect Session</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-2 bg-white text-zinc-950 rounded-full text-sm font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <Wallet size={16} /> Connect
                </button>
              )}
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white transition-colors relative z-[70] bg-white/5 border border-white/10 rounded-full"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>
      </motion.div>

      {/* ================================================= */}
      {/* FULLSCREEN MOBILE OVERLAY */}
      {/* ================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-3xl pt-28 px-6 flex flex-col lg:hidden overflow-y-auto"
          >
            {/* AI Command Center Mobile */}
            <motion.div variants={slideInItem} custom={0.1} initial="hidden" animate="visible" className="mb-8 relative z-20">
              <div className="flex items-center gap-3 p-3 bg-zinc-900/60 border border-white/10 rounded-2xl shadow-inner focus-within:border-cyan-500/50 transition-colors">
                <Sparkles size={18} className={isAiDropdownOpen ? "text-cyan-400" : "text-cyan-500 ml-1"} />
                <input 
                  type="text" 
                  value={aiInput}
                  onChange={handleAiInputChange}
                  placeholder="Ask AI to swap or send..." 
                  className="bg-transparent border-none outline-none text-base text-white placeholder-zinc-500 w-full"
                />
                <button className={`p-2 rounded-xl transition-colors ${isAiDropdownOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-zinc-400'}`}>
                  <Mic size={18} />
                </button>
              </div>

              <AnimatePresence>
                {isAiDropdownOpen && (
                  <motion.div variants={inlineExpand} initial="hidden" animate="visible" exit="exit" className="overflow-hidden">
                    <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-4">
                      {isAiProcessing ? (
                        <div className="flex items-center gap-3 text-cyan-400 text-sm font-medium">
                          <Activity size={18} className="animate-spin" /> Scanning routes...
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-zinc-500 uppercase mb-1">Action</span>
                              <span className="text-sm text-white font-bold flex items-center gap-1.5"><Zap size={14} className="text-yellow-400" /> Swap</span>
                            </div>
                            <ArrowRight size={16} className="text-zinc-600" />
                            <div className="flex flex-col text-right">
                              <span className="text-[10px] text-zinc-500 uppercase mb-1">Optimal Route</span>
                              <span className="text-sm text-emerald-400 font-bold">ETH → USDC</span>
                            </div>
                          </div>
                          <button onClick={closeAllMenus} className="w-full py-3 bg-cyan-500 text-zinc-950 font-bold text-sm rounded-xl active:scale-95 transition-transform">
                            Prepare Transaction
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-6 relative z-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.name} variants={slideInItem} custom={0.15 + (i * 0.1)} initial="hidden" animate="visible">
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-black text-zinc-500 hover:text-white transition-all flex items-center justify-between group active:scale-95"
                  >
                    <div className="flex items-center gap-4">
                      {link.name}
                      {link.isLive && (
                        <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                          Live
                        </span>
                      )}
                    </div>
                    <ArrowUpRight size={28} className="text-zinc-800 group-hover:text-cyan-500 transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Wallet Interface */}
            <motion.div variants={slideInItem} custom={0.4} initial="hidden" animate="visible" className="mt-auto pt-12 pb-8 relative z-10">
              {isConnected ? (
                <div className="p-5 rounded-3xl bg-zinc-900/80 border border-white/10 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 p-0.5">
                          <div className="w-full h-full bg-zinc-950 rounded-full border-2 border-zinc-950"></div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-zinc-900"></div>
                      </div>
                      <div>
                        <p className="text-white font-black text-xl tracking-tight">{balance}</p>
                        <div className="flex items-center gap-1.5 text-zinc-400 mt-0.5">
                          <p className="text-xs font-mono">{address ? `${address.slice(0, 8)}...${address.slice(-6)}` : ''}</p>
                          <button onClick={handleCopyAddress} className="hover:text-white p-1">
                            {isCopied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <button onClick={handleDisconnect} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors">
                      <LogOut size={20} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-5">
                    <button className="flex items-center justify-center gap-2 py-3 bg-white/5 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                      <Send size={16} className="text-cyan-400" /> Send
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-white/5 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                      <ArrowDownToLine size={16} className="text-emerald-400" /> Receive
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => { setIsOpen(false); setIsModalOpen(true); }}
                  className="w-full py-4 bg-cyan-500 text-zinc-950 font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <Wallet size={20} /> Connect Wallet
                </button>
              )}
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;