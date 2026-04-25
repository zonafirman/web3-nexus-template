"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Zap, Blocks, ArrowUpRight, ShieldCheck } from 'lucide-react';

// Komponen Kartu Individual dengan Logika Spotlight
const BentoCard = ({ children, className, colSpan }: { children: React.ReactNode, className?: string, colSpan: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md transition-colors hover:border-cyan-500/30 ${colSpan} ${className}`}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(6,182,212,.1), transparent 40%)`,
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 h-full p-8 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <ShieldCheck size={20} className="text-cyan-500" />
            <span className="text-cyan-500 font-semibold tracking-wider uppercase text-sm">Enterprise Grade</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Mass Adoption</span>.
          </motion.h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* Card 1: Account Abstraction (Wide) */}
          <BentoCard colSpan="md:col-span-2" className="group">
            <div className="flex justify-between items-start mb-auto">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-inner">
                <Fingerprint size={28} className="text-cyan-400" />
              </div>
              {/* Mini UI Mockup */}
              <div className="hidden sm:flex flex-col gap-2 p-3 bg-zinc-950/50 rounded-xl border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="h-2 w-24 bg-zinc-800 rounded-full"></div>
                <div className="h-8 w-32 bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center text-[10px] font-bold text-cyan-400">G-MAIL LOGIN DETECTED</div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-3">Frictionless Onboarding</h3>
              <p className="text-zinc-400 leading-relaxed max-w-md">
                Native Account Abstraction components built-in. Let users sign in with Email, Google, or Passkeys. Seed phrases are now optional.
              </p>
            </div>
          </BentoCard>

          {/* Card 2: Performance (Square) */}
          <BentoCard colSpan="md:col-span-1" className="group">
             <div className="flex justify-between items-start mb-auto">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center">
                <Zap size={28} className="text-yellow-400" />
              </div>
              <ArrowUpRight size={24} className="text-zinc-600 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="mt-8">
              {/* Fake Lighthouse Score */}
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-black text-white">99</span>
                <span className="text-emerald-400 font-bold mb-1">+ Performance</span>
              </div>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Next.js App Router and React Server Components ensure lightning-fast load times.
              </p>
            </div>
          </BentoCard>

          {/* Card 3: Viem & Wagmi (Wide Bottom) */}
          <BentoCard colSpan="md:col-span-3" className="group flex-row items-center overflow-visible">
            <div className="flex-1 pr-8 z-10">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center mb-6">
                <Blocks size={28} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Pre-Configured Web3 Hooks</h3>
              <p className="text-zinc-400 leading-relaxed max-w-lg">
                Built on top of Viem and Wagmi. Stop wrestling with RPC endpoints and provider setups. The entire logic skeleton is ready to connect to your smart contracts.
              </p>
            </div>
            {/* Abstract Tech Graphic */}
            <div className="hidden lg:flex flex-1 h-full items-center justify-end opacity-50 group-hover:opacity-100 transition-opacity duration-500 relative">
              <div className="absolute right-10 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full"></div>
              <div className="grid grid-cols-3 gap-4 rotate-12 scale-110 relative z-10 pointer-events-none">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`w-16 h-16 rounded-xl border border-white/10 bg-zinc-900/80 flex items-center justify-center ${i === 4 ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]' : ''}`}>
                    {i === 4 && <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>}
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
};

export default Features;