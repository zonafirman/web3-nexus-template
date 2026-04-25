"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, CheckCircle2 } from 'lucide-react';

const Integration = () => {
  const [isCopied, setIsCopied] = useState(false);
  const command = "npx create-nexus-app@latest my-dapp";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Copy & Explanation */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              From zero to <span className="text-cyan-500">deployed</span> in 60 seconds.
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Forget setting up Webpack, configuring Tailwind v4, or resolving Wagmi dependency hell. Our CLI tool does the heavy lifting so you can focus on writing smart contracts.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-white text-zinc-950 font-bold rounded-2xl hover:bg-zinc-200 transition-colors">
                Read the Docs
              </button>
              <button className="px-8 py-4 bg-transparent text-white font-medium hover:text-cyan-400 transition-colors">
                View GitHub Repo →
              </button>
            </div>
          </div>

          {/* Right: Interactive Terminal */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative group"
          >
            {/* Glow Behind Terminal */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            
            <div className="relative rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <Terminal size={14} /> root@nexus:~
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm">
                <div className="flex items-center justify-between group/copy">
                  <div className="flex items-center gap-3 text-cyan-400">
                    <span className="text-zinc-500">❯</span>
                    <span>{command}</span>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 transition-colors"
                    title="Copy command"
                  >
                    {isCopied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>
                
                {/* Fake Terminal Output Simulation */}
                <div className="mt-4 space-y-2 text-zinc-400 opacity-80">
                  <p className="animate-pulse">✔ Downloading latest Nexus UI template...</p>
                  <p className="text-zinc-500">✔ Installing dependencies (Tailwind v4, Framer Motion)...</p>
                  <p className="text-zinc-500">✔ Configuring Viem & Account Abstraction...</p>
                  <p className="text-emerald-400 font-bold mt-4">✨ Success! cd into my-dapp and run npm run dev</p>
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