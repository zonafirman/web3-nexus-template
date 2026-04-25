"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16">
        
        {/* LEFT COLUMN: Typography & CTA */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
          >
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">v2.0 Account Abstraction Ready</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            Build dApps <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-pulse">
              Without the Friction
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed"
          >
            A high-performance Web3 UI kit engineered with Next.js App Router, Tailwind v4, and Viem. Ship your protocol interface in days, not months.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              Get Started
              <ArrowRight size={18} />
            </button>
            <button className="flex items-center justify-center px-8 py-4 bg-zinc-900/50 hover:bg-zinc-800 border border-white/10 text-white font-medium rounded-2xl transition-all backdrop-blur-md">
              View Components
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Floating Interactive Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          className="flex-1 w-full max-w-lg lg:max-w-full relative perspective-1000"
        >
          {/* Main Floating Card */}
          <div className="relative z-10 w-full rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl p-6 shadow-2xl overflow-hidden group hover:border-cyan-500/50 transition-colors">
            {/* MacOS like header */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="ml-2 text-xs font-mono text-zinc-500 flex items-center gap-1">
                <Terminal size={12} /> config.ts
              </span>
            </div>
            
            {/* Code Content */}
            <pre className="text-sm font-mono text-zinc-300 overflow-x-auto">
              <code>
                <span className="text-purple-400">import</span> {'{ '}createConfig{' }'} <span className="text-purple-400">from</span> <span className="text-emerald-400">'wagmi'</span>;<br/>
                <span className="text-purple-400">import</span> {'{ '}mainnet, arbitrum{' }'} <span className="text-purple-400">from</span> <span className="text-emerald-400">'wagmi/chains'</span>;<br/>
                <br/>
                <span className="text-blue-400">export const</span> config = createConfig({'{'}<br/>
                {'  '}chains: [mainnet, arbitrum],<br/>
                {'  '}connectors: [<br/>
                {'    '}injected(),<br/>
                {'    '}walletConnect({'{'} projectId {'}'}),<br/>
                {'    '}<span className="text-cyan-400 bg-cyan-400/10 px-1 rounded">// Seamless Account Abstraction</span><br/>
                {'    '}safe(),<br/>
                {'  '}],<br/>
                {'}'});
              </code>
            </pre>
          </div>

          {/* Decorative floating blurred box behind */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 blur-2xl -z-10 rounded-full opacity-50 animate-pulse"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;