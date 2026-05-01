"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Shield, Crown } from 'lucide-react';
import { fadeUp, slideFromLeft, slideFromRight } from '@/lib/animations';

// ==========================================
// 1. DATA STATIS & KONFIGURASI
// ==========================================
const LITE_FEATURES = [
  'Next.js 15 & Tailwind v4 Setup', 
  'Framer Motion Animations', 
  'Basic UI Components', 
  'Standard Auth Modal'
];

const LITE_MISSING = [
  'Zustand Global State', 
  'Viem/Wagmi Smart Contract Logic', 
  'Pro Dashboard Architecture', 
  'AI Intent Engine'
];

const PRO_FEATURES = [
  'Zustand Global State Management', 
  'Viem/Wagmi Smart Contract Hooks', 
  'Pro Dashboard Architecture (SPA)', 
  'AI Intent Engine (Search & Swap)', 
  'Advanced MEV Protection UI', 
  'Premium Figma Files', 
  'Lifetime Updates'
];

// ==========================================
// 2. KOMPONEN UTAMA
// ==========================================
const Pricing = () => {
  return (
    <section className="py-24 relative z-10" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER PRICING */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest"
          >
            <Crown size={16} /> Transparent Pricing
          </motion.div>
          
          <motion.h2 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter"
          >
            Built for hackers. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Scaled for startups.</span>
          </motion.h2>
          
          <motion.p 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg"
          >
            Start for free with our open-source core, or unlock the full backend engine to launch your dApp 10x faster.
          </motion.p>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
          
          {/* LITE CARD (Free) */}
          <motion.div 
            variants={slideFromLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="p-8 md:p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/10 backdrop-blur-md relative"
          >
            <h3 className="text-2xl font-black text-white mb-2">Nexus Lite</h3>
            <p className="text-zinc-400 text-sm mb-6 pb-6 border-b border-white/5">Perfect for learning and personal side-projects.</p>
            
            <div className="mb-8">
              <span className="text-5xl font-black text-white">$0</span>
              <span className="text-zinc-500 font-medium ml-2">forever</span>
            </div>

            <ul className="space-y-4 mb-10">
              {LITE_FEATURES.map((feature, i) => (
                <li key={`lite-inc-${i}`} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                  <Check size={18} className="text-cyan-500 flex-shrink-0" /> {feature}
                </li>
              ))}
              {LITE_MISSING.map((feature, i) => (
                <li key={`lite-exc-${i}`} className="flex items-center gap-3 text-sm font-medium text-zinc-600">
                  <X size={18} className="flex-shrink-0" /> {feature}
                </li>
              ))}
            </ul>

            <button className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-colors">
              Clone Repository
            </button>
          </motion.div>

          {/* PRO CARD (Paid/Commercial) */}
          <motion.div 
            variants={slideFromRight} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-[#0d1117] border border-cyan-500/50 shadow-[0_20px_80px_rgba(6,182,212,0.2)] backdrop-blur-xl relative overflow-hidden transform md:-translate-y-4"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[100px] pointer-events-none rounded-full"></div>
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-black text-white">Nexus Pro</h3>
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Zap size={12} /> Popular
              </span>
            </div>
            
            <p className="text-zinc-400 text-sm mb-6 pb-6 border-b border-white/5 relative z-10">
              Everything you need to launch a production-ready dApp.
            </p>
            
            <div className="mb-8 relative z-10">
              <span className="text-5xl font-black text-white">$25</span>
              <span className="text-zinc-500 font-medium ml-2">one-time payment</span>
            </div>

            <ul className="space-y-4 mb-10 relative z-10">
              <li className="flex items-center gap-3 text-sm font-bold text-white">
                <Check size={18} className="text-cyan-500 flex-shrink-0" /> Everything in Lite, plus:
              </li>
              {PRO_FEATURES.map((feature, i) => (
                <li key={`pro-${i}`} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                  <Check size={18} className="text-emerald-400 flex-shrink-0" /> {feature}
                </li>
              ))}
            </ul>

            <a 
              href="https://yourstore.gumroad.com/l/nexus-ui-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] relative z-10"
            >
              Get Pro License <Shield size={18} />
            </a>
            <p className="text-center text-xs text-zinc-500 mt-4 relative z-10">Secure payment via Gumroad. Instant access.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;