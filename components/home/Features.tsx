"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Fingerprint, Zap, Blocks, ShieldCheck, Cpu, Network, CheckCircle2 } from 'lucide-react';

// --- IMPORT FROM GLOBAL ANIMATION HUB ---
import { fadeUp, slideInLeft, scannerLine, floatUp, floatDown, flowRight } from '@/lib/animations';

// ==========================================
// 1. 3D BENTO CARD COMPONENT (TILT CARD)
// ==========================================
const SPRING_CONFIG = { damping: 20, stiffness: 200, mass: 0.5 };

const TiltBentoCard = ({ children, className, colSpan }: { children: React.ReactNode, className?: string, colSpan: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse Physics & Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), SPRING_CONFIG);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), SPRING_CONFIG);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { setIsHovered(false); x.set(0); y.set(0); };

  const bgStyle = useTransform([mouseX, mouseY], ([mX, mY]) => `radial-gradient(800px circle at ${mX}px ${mY}px, rgba(6,182,212,0.15), transparent 40%)`);

  return (
    <div className={`relative ${colSpan} perspective-1000`} style={{ perspective: "1200px" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative h-full w-full rounded-3xl bg-[#0d1117]/80 border backdrop-blur-xl transition-all duration-500 overflow-hidden group ${
          isHovered ? 'border-cyan-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'border-white/10 shadow-2xl'
        } ${className || ''}`}
      >
        {/* Spotlight & Ambient Glow */}
        <motion.div className="pointer-events-none absolute -inset-px rounded-3xl z-0 transition-opacity duration-500" animate={{ opacity: isHovered ? 1 : 0 }} style={{ background: bgStyle as any }} />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0"></div>

        {/* 3D Container (Floating) */}
        <div className="relative z-10 h-full p-8 flex flex-col" style={{ transform: "translateZ(50px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// 2. MAIN COMPONENT (FEATURES GRID)
// ==========================================
const Features = () => {
  return (
    <section className="py-32 relative z-10" id="features">
      
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-500/10 blur-[150px] pointer-events-none -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* FEATURES HEADER */}
        <div className="mb-20 max-w-2xl">
          <motion.div 
            variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md"
          >
            <ShieldCheck size={18} className="text-cyan-400" />
            <span className="text-cyan-400 font-bold tracking-wider uppercase text-xs">Open Source Core</span>
          </motion.div>
          
          <motion.h2 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight"
          >
            Engineered for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Mass Adoption.
            </span>
          </motion.h2>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[360px]">
          
          {/* CARD 1: Frictionless Onboarding */}
          <TiltBentoCard colSpan="md:col-span-2">
            <div className="flex justify-between items-start mb-auto">
              <div className="relative w-16 h-16 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-cyan-500/50 transition-colors duration-500 overflow-hidden">
                <Fingerprint size={32} className="text-cyan-400 relative z-10" />
                <motion.div variants={scannerLine} animate="animate" className="absolute inset-0 h-1/2 bg-gradient-to-b from-transparent to-cyan-500/30 border-b border-cyan-400 z-20" />
              </div>
              
              <div className="hidden sm:flex flex-col gap-3 p-4 bg-zinc-950/90 rounded-2xl border border-white/10 shadow-2xl transition-all duration-700 opacity-60 group-hover:opacity-100 backdrop-blur-xl" style={{ transform: "translateZ(40px)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div className="h-2 w-20 bg-zinc-800 rounded-full"></div>
                </div>
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 size={14} /> NO SEED PHRASE
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Frictionless Onboarding</h3>
              <p className="text-zinc-400 leading-relaxed max-w-md text-sm md:text-base">
                Native Account Abstraction components built-in. Let users sign in with Email, Socials, or Passkeys. 
              </p>
            </div>
          </TiltBentoCard>

          {/* CARD 2: Performance */}
          <TiltBentoCard colSpan="md:col-span-1">
             <div className="flex justify-between items-start mb-auto">
              <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center group-hover:rotate-12 group-hover:border-yellow-500/50 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <Zap size={32} className="text-yellow-400" />
              </div>
            </div>
            <div className="mt-8 relative">
              <div className="absolute right-0 top-0 w-20 h-20">
                <div className="absolute inset-0 border-4 border-emerald-500/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 rounded-full group-hover:animate-spin" style={{ animationDuration: '1s' }}></div>
              </div>
              <div className="flex items-end gap-2 mb-3 relative z-10" style={{ transform: "translateZ(30px)" }}>
                <span className="text-7xl font-black text-white tracking-tighter drop-shadow-2xl">99</span>
                <span className="text-emerald-400 font-black mb-3">+ Score</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 bg-zinc-950 px-3 py-1.5 rounded-lg border border-white/5 w-max mb-2">
                <span className="text-yellow-400">⚡</span> Compiled in 42ms
              </div>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Next.js App Router caching ensures lightning-fast load times.
              </p>
            </div>
          </TiltBentoCard>

          {/* CARD 3: Pre-Configured Hooks (Networks) */}
          <TiltBentoCard colSpan="md:col-span-3" className="flex-col md:flex-row items-start md:items-center overflow-visible">
            <div className="flex-1 md:pr-8 z-10 h-full flex flex-col justify-end md:justify-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <Blocks size={32} className="text-blue-400" />
              </div>
              <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Pre-Configured Hooks</h3>
              <p className="text-zinc-400 leading-relaxed max-w-xl text-sm md:text-base">
                Built strictly on top of Viem and Wagmi. Stop wrestling with RPC endpoints and provider setups. Connect to your Smart Contracts in minutes, not days.
              </p>
            </div>
            
            {/* 3D Node Visualization */}
            <div className="hidden md:flex flex-1 h-full items-center justify-end opacity-60 group-hover:opacity-100 transition-opacity duration-700 relative" style={{ transform: "translateZ(60px)" }}>
              <div className="absolute right-12 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-colors"></div>
              
              <div className="relative z-10 flex items-center justify-center gap-4">
                <motion.div variants={floatUp} animate="animate" className="p-4 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl relative">
                  <Cpu size={24} className="text-zinc-500" />
                </motion.div>
                
                <div className="w-20 h-px bg-gradient-to-r from-zinc-800 via-cyan-500/50 to-zinc-800 relative overflow-hidden">
                  <motion.div variants={flowRight} animate="animate" className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                </div>
                
                <motion.div variants={floatDown} animate="animate" className="p-6 rounded-2xl bg-zinc-950 border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)] relative group-hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-shadow">
                  <Network size={36} className="text-cyan-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></div>
                </motion.div>
              </div>
            </div>
          </TiltBentoCard>

        </div>
      </div>
    </section>
  );
};

export default Features;