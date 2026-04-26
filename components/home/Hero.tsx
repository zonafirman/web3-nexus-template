"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Copy, Check, ExternalLink } from 'lucide-react';

const Hero = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [typedCode, setTypedCode] = useState("");
  
  // Link Toko Pro (Ganti dengan link Gumroad/toko aslimu nanti)
  const STORE_LINK = "https://yourstore.gumroad.com/l/nexus-ui-pro";
  const CLONE_COMMAND = "npx create-next-app -e https://github.com/zonafirman/web3-nexus-template";

  const fullCode = `import { nexusUI } from '@nexus-ui/core';

// 2026 Web3 Config Standard
export const config = nexusUI.create({
  theme: 'dark-neon',
  features: [
    'account-abstraction',
    'ai-intent-engine',
    'security-audit-live'
  ],
  security: 'enterprise-grade'
});`;

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullCode.length) {
        setTypedCode(fullCode.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);
    return () => clearInterval(typingInterval);
  }, [fullCode]);

  const handleClone = () => {
    navigator.clipboard.writeText(CLONE_COMMAND);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16">
        
        {/* KOLOM KIRI: Value Proposition & CTA */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 hover:border-cyan-500/30 transition-colors cursor-default"
          >
            <Sparkles size={16} className="text-cyan-400 group-hover:animate-spin" />
            <span className="text-sm font-medium text-zinc-300">New: Nexus UI Lite v2.0 is Open Source</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9]"
          >
            Web3 UI <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-cyan-400">
              Redefined.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-xl mb-10 leading-relaxed font-medium"
          >
            The world's most advanced Web3 starter kit. Built with Next.js 15, Tailwind v4, and the future of Account Abstraction.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            {/* Action 1: Clone Repo (Lite) */}
            <button 
              onClick={handleClone}
              className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-xl border ${
                isCopied 
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                : 'bg-white text-zinc-950 border-white hover:bg-zinc-200'
              }`}
            >
              {isCopied ? (
                <>
                  <Check size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <Terminal size={18} />
                  Clone Repository
                </>
              )}
            </button>

            {/* Action 2: Upgrade to Pro (Commercial) */}
            <a 
              href={STORE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 border border-white/10 text-white font-bold rounded-2xl transition-all hover:border-cyan-500/50 hover:bg-zinc-800 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle Glow Effect on Button */}
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              Upgrade to Pro
              <div className="flex items-center gap-1">
                <ExternalLink size={16} className="text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
              </div>
            </a>
          </motion.div>
        </div>

        {/* KOLOM KANAN: Floating IDE Mockup with 3D Effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateX: 10, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring" }}
          className="flex-1 w-full max-w-lg lg:max-w-full relative group"
        >
          {/* Main IDE Window */}
          <div className="relative z-10 w-full rounded-3xl bg-[#0d1117]/80 border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group-hover:border-cyan-500/30 transition-all duration-700">
            
            {/* MacOS Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#010409]/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                <span className="ml-3 text-xs font-mono text-zinc-500 tracking-widest uppercase">nexus-config.ts</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-600 bg-white/5 px-2 py-0.5 rounded">TypeScript</div>
            </div>
            
            {/* Code Editor Body */}
            <div className="p-8 h-70 font-mono text-sm leading-relaxed overflow-hidden">
              <pre>
                <code>
                  {typedCode.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-8 text-zinc-700 select-none">{i + 1}</span>
                      <span className="text-zinc-300" dangerouslySetInnerHTML={{ 
                        __html: line
                          .replace(/import|from|export const/g, '<span class="text-[#ff7b72]">$&</span>')
                          .replace(/'@nexus-ui\/core'/g, '<span class="text-[#a5d6ff]">$&</span>')
                          .replace(/create|theme|features|security/g, '<span class="text-[#d2a8ff]">$&</span>')
                          .replace(/\/\/.*$/g, '<span class="text-[#8b949e]">$&</span>')
                      }} />
                    </div>
                  ))}
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-cyan-400 ml-1 align-middle"
                  />
                </code>
              </pre>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-[100px] -z-10 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 blur-[100px] -z-10 animate-pulse"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;