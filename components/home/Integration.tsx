"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Copy, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

// --- IMPORT FROM GLOBAL ANIMATION HUB ---
import { fadeUp, slideFromRight, terminalLine, terminalLineUp, terminalLoadingBar } from '@/lib/animations';

// ==========================================
// 1. STATIC DATA & CONFIGURATION
// ==========================================
const PACKAGE_MANAGERS = ['npm', 'yarn', 'pnpm', 'bun'];

const COMMANDS: Record<string, string> = {
  npm: "npx create-next-app -e https://github.com/zonafirman/web3-nexus-template my-dapp",
  yarn: "yarn create next-app -e https://github.com/zonafirman/web3-nexus-template my-dapp",
  pnpm: "pnpm create next-app -e https://github.com/zonafirman/web3-nexus-template my-dapp",
  bun: "bun create next-app -e https://github.com/zonafirman/web3-nexus-template my-dapp",
};

const SPRING_CONFIG = { stiffness: 150, damping: 20 };

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
const Integration = () => {
  const [activeTab, setActiveTab] = useState('npm');
  const [isCopied, setIsCopied] = useState(false);
  const [step, setStep] = useState(0);

  // --- Terminal Simulation Effect ---
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 600);
    const timer2 = setTimeout(() => setStep(2), 1800);
    const timer3 = setTimeout(() => setStep(3), 2600);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, [activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(COMMANDS[activeTab]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleTabChange = (pm: string) => {
    setActiveTab(pm);
    setStep(0);
  };

  // --- 3D Physics for Terminal Box ---
  const terminalRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, SPRING_CONFIG);
  const mouseYSpring = useSpring(y, SPRING_CONFIG);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!terminalRef.current) return;
    const rect = terminalRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  // --- Text Render Utility ---
  const renderFormattedCommand = () => {
    return {
      __html: COMMANDS[activeTab]
        .replace(/npx|yarn|pnpm|bun/g, '<span class="text-pink-400">$&</span>')
        .replace(/create-next-app|create next-app/g, '<span class="text-blue-400">$&</span>')
        .replace(/-e/g, '<span class="text-zinc-400">$&</span>')
    };
  };

  return (
    <section className="py-32 relative z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-150 h-150 bg-blue-600/5 blur-[120px] pointer-events-none -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT COLUMN: Text & Buttons */}
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.h2 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight"
            >
              Clone. Install. <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">Deploy in Seconds.</span>
            </motion.h2>
            
            <motion.p 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              We've bypassed the tedious Web3 setup. Grab the official template directly from our repository and start writing your smart contracts immediately.
            </motion.p>
            
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a 
                href="https://github.com/zonafirman/web3-nexus-template" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-zinc-200 text-zinc-950 font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-950">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                Star on GitHub
              </a>
              <Link href="/docs" className="group flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-zinc-300 font-medium hover:text-cyan-400 transition-colors">
                Read Documentation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: 3D Multi-Tab Terminal */}
          <motion.div 
            variants={slideFromRight} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex-1 w-full relative group perspective-1000"
          >
            <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500/30 to-blue-600/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl -z-10"></div>
            
            <motion.div 
              ref={terminalRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative rounded-3xl bg-[#0d1117]/90 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-hidden transition-colors duration-500 hover:border-cyan-500/40"
            >
              {/* Terminal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5 gap-3" style={{ transform: "translateZ(10px)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-inner"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-inner"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-inner"></div>
                </div>
                
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
                  {PACKAGE_MANAGERS.map((pm) => (
                    <button
                      key={pm}
                      onClick={() => handleTabChange(pm)}
                      className={`px-4 py-1.5 text-xs font-mono rounded-lg transition-all ${activeTab === pm ? 'bg-zinc-800 text-cyan-400 border border-white/10 shadow-md' : 'text-zinc-500 hover:text-white'}`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-8 font-mono text-sm min-h-65" style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="text-cyan-400 break-all leading-relaxed">
                    <span className="text-zinc-500 select-none mr-2">~</span>
                    <span className="text-emerald-400 mr-2">❯</span> 
                    <span dangerouslySetInnerHTML={renderFormattedCommand()} />
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors shrink-0 border border-transparent hover:border-white/10"
                    title="Copy to clipboard"
                  >
                    {isCopied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>
                
                <div className="mt-8 space-y-3 text-zinc-400 opacity-90 text-xs sm:text-sm">
                  <AnimatePresence mode="popLayout">
                    {step >= 1 && (
                      <motion.div key="step-1" variants={terminalLine} initial="hidden" animate="visible" className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-400 font-bold">info</span> 
                          Fetching template from <span className="text-white underline decoration-white/20 underline-offset-2">zonafirman/web3-nexus-template</span>...
                          {step === 1 && <span className="w-1.5 h-3 bg-cyan-400 animate-pulse ml-1"></span>}
                        </div>
                        {step === 1 && (
                          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mt-1">
                            <motion.div variants={terminalLoadingBar} initial="hidden" animate="visible" className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                          </div>
                        )}
                      </motion.div>
                    )}
                    
                    {step >= 2 && (
                      <motion.div key="step-2" variants={terminalLine} initial="hidden" animate="visible" className="flex items-center gap-2 mt-2">
                        <span className="text-emerald-400 font-bold">success</span> Created <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">my-dapp</span> directory.
                      </motion.div>
                    )}
                    
                    {step >= 3 && (
                      <motion.div key="step-3" variants={terminalLineUp} initial="hidden" animate="visible" className="mt-6 pt-4 border-t border-white/5 space-y-2">
                        <p className="text-zinc-500">Inside that directory, you can run several commands:</p>
                        <p className="flex items-center gap-2">
                          <span className="text-zinc-600">❯</span> 
                          <span className="text-cyan-400 font-bold">{activeTab === 'npm' ? 'npm run' : activeTab} dev</span>
                        </p>
                        <p className="text-zinc-500 ml-5 text-xs">Starts the development server.</p>
                        <p className="text-emerald-400 font-bold mt-4 flex items-center gap-2">
                          <Sparkles size={14} /> Happy hacking!
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Integration;