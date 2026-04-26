"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, CheckCircle2, ArrowRight } from 'lucide-react';

// Konfigurasi Tab Package Manager
const packageManagers = ['npm', 'yarn', 'pnpm', 'bun'];

const Integration = () => {
  const [activeTab, setActiveTab] = useState('npm');
  const [isCopied, setIsCopied] = useState(false);
  const [step, setStep] = useState(0);

  // Perintah instalasi asli menggunakan repo GitHub-mu (Strategi Next.js)
  const commands: Record<string, string> = {
    npm: "npx create-next-app -e https://github.com/zonafirman/web3-nexus-template my-dapp",
    yarn: "yarn create next-app -e https://github.com/zonafirman/web3-nexus-template my-dapp",
    pnpm: "pnpm create next-app -e https://github.com/zonafirman/web3-nexus-template my-dapp",
    bun: "bun create next-app -e https://github.com/zonafirman/web3-nexus-template my-dapp",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleTabChange = (pm: string) => {
    setActiveTab(pm);
    setStep(0);
  };

  // Simulasi proses terminal saat tab diganti
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 1600);
    const timer3 = setTimeout(() => setStep(3), 2400);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, [activeTab]);

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* KOLOM KIRI: Teks & Tombol Integrasi Repo Asli */}
          <div className="flex-1 text-center lg:text-left z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Clone. Install. <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Deploy in Seconds.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We&apos;ve bypassed the tedious Web3 setup. Grab the official template directly from our repository and start writing your smart contracts immediately.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              {/* Tombol GitHub Asli */}
              <a 
                href="https://github.com/zonafirman/web3-nexus-template" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-zinc-200 text-zinc-950 font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-950"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                Star on GitHub
              </a>
              <button className="group flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-zinc-300 font-medium hover:text-cyan-400 transition-colors">
                Read Documentation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* KOLOM KANAN: Terminal Multi-Tab Kelas Dewa */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative group perspective-1000"
          >
            {/* Glow Latar Belakang */}
            <div className="absolute -inset-1 bg-linear-to-tr from-cyan-500/30 to-blue-600/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl -z-10"></div>
            
            <div 
              className="relative rounded-2xl bg-[#0d1117] border border-white/10 shadow-2xl overflow-hidden transition-transform duration-500"
              style={{ transform: "rotateY(-5deg) rotateX(2deg)" }}
            >
              {/* Terminal Header & Package Manager Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 bg-[#010409] border-b border-white/5 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
                  {packageManagers.map((pm) => (
                    <button
                      key={pm}
                      onClick={() => handleTabChange(pm)}
                      className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                        activeTab === pm 
                          ? 'bg-zinc-800 text-cyan-400 border border-white/10 shadow-sm' 
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm min-h-55">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-cyan-400 break-all">
                    <span className="text-zinc-500 select-none mr-2">~</span>
                    <span className="text-emerald-400">❯</span> {commands[activeTab]}
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 transition-colors shrink-0"
                    title="Copy to clipboard"
                  >
                    {isCopied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>
                
                {/* Simulasi Output Terminal Berjenjang */}
                <div className="mt-6 space-y-2 text-zinc-400 opacity-90 text-xs sm:text-sm">
                  <AnimatePresence>
                    {step >= 1 && (
                      <motion.div key="step-1" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                        <span className="text-blue-400">info</span> Fetching template from <span className="text-white underline">zonafirman/web3-nexus-template</span>...
                      </motion.div>
                    )}
                    {step >= 2 && (
                      <motion.div key="step-2" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2 mt-2">
                        <span className="text-emerald-400">success</span> Created <span className="text-cyan-400 font-bold">my-dapp</span> directory.
                      </motion.div>
                    )}
                    {step >= 3 && (
                      <motion.div key="step-3" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-white/5">
                        <p className="text-zinc-500 mb-2">Inside that directory, you can run several commands:</p>
                        <p><span className="text-cyan-400">{activeTab === 'npm' ? 'npm run' : activeTab} dev</span></p>
                        <p className="text-zinc-500 ml-4 mb-2">Starts the development server.</p>
                        <p className="text-emerald-400 font-bold mt-3">✨ Happy hacking!</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Integration;