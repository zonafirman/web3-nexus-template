"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Fingerprint, Zap, Blocks, ShieldCheck, Cpu, Network, CheckCircle2 } from 'lucide-react';

// --- Komponen Kartu 3D Kelas Atas ---
const TiltBentoCard = ({ children, className, colSpan }: { children: React.ReactNode, className?: string, colSpan: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Posisi Mouse untuk Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Fisika untuk Kemiringan 3D (Dibuat lebih responsif)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`relative ${colSpan} perspective-1000`} style={{ perspective: "1200px" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative h-full w-full rounded-3xl bg-[#0d1117]/80 border backdrop-blur-xl transition-all duration-500 overflow-hidden group ${
          isHovered ? 'border-cyan-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'border-white/10 shadow-2xl'
        } ${className}`}
      >
        {/* Spotlight Overlay yang lebih "Realistis" */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 z-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(6,182,212,0.15), transparent 40%)`
            ),
          }}
        />

        {/* Ambient Glow Internal */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0"></div>

        {/* Kontainer Elemen (translateZ menciptakan efek melayang 3D) */}
        <div 
          className="relative z-10 h-full p-8 flex flex-col"
          style={{ transform: "translateZ(50px)" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="py-32 relative z-10" id="features">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-500/10 blur-[150px] pointer-events-none -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Features */}
        <div className="mb-20 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md"
          >
            <ShieldCheck size={18} className="text-cyan-400" />
            <span className="text-cyan-400 font-bold tracking-wider uppercase text-xs">Open Source Core</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight"
          >
            Engineered for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Mass Adoption.
            </span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[360px]">
          
          {/* Card 1: Account Abstraction (Auth) */}
          <TiltBentoCard colSpan="md:col-span-2" className="group">
            <div className="flex justify-between items-start mb-auto">
              <div className="relative w-16 h-16 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-cyan-500/50 transition-colors duration-500 overflow-hidden">
                <Fingerprint size={32} className="text-cyan-400 relative z-10" />
                {/* Animasi Scanner Biometrik */}
                <motion.div 
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 h-1/2 bg-gradient-to-b from-transparent to-cyan-500/30 border-b border-cyan-400 z-20"
                />
              </div>
              
              {/* Efek 3D Pop-out UI Mockup */}
              <div 
                className="hidden sm:flex flex-col gap-3 p-4 bg-zinc-950/90 rounded-2xl border border-white/10 shadow-2xl transition-all duration-700 opacity-60 group-hover:opacity-100 backdrop-blur-xl"
                style={{ transform: "translateZ(40px)" }} 
              >
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

          {/* Card 2: Performance */}
          <TiltBentoCard colSpan="md:col-span-1" className="group">
             <div className="flex justify-between items-start mb-auto">
              <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center group-hover:rotate-12 group-hover:border-yellow-500/50 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <Zap size={32} className="text-yellow-400" />
              </div>
            </div>
            <div className="mt-8 relative">
              {/* Spinning Graph Core */}
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

          {/* Card 3: Viem & Wagmi (Network) */}
          <TiltBentoCard colSpan="md:col-span-3" className="group flex-col md:flex-row items-start md:items-center overflow-visible">
            <div className="flex-1 md:pr-8 z-10 h-full flex flex-col justify-end md:justify-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <Blocks size={32} className="text-blue-400" />
              </div>
              <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Pre-Configured Hooks</h3>
              <p className="text-zinc-400 leading-relaxed max-w-xl text-sm md:text-base">
                Built strictly on top of Viem and Wagmi. Stop wrestling with RPC endpoints and provider setups. Connect to your Smart Contracts in minutes, not days.
              </p>
            </div>
            
            {/* Visualisasi Node Network 3D Interaktif */}
            <div 
              className="hidden md:flex flex-1 h-full items-center justify-end opacity-60 group-hover:opacity-100 transition-opacity duration-700 relative"
              style={{ transform: "translateZ(60px)" }} 
            >
              <div className="absolute right-12 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-colors"></div>
              
              <div className="relative z-10 flex items-center justify-center gap-4">
                {/* Node 1 */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="p-4 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl relative"
                >
                  <Cpu size={24} className="text-zinc-500" />
                </motion.div>
                
                {/* Connecting Line with Flow */}
                <div className="w-20 h-px bg-gradient-to-r from-zinc-800 via-cyan-500/50 to-zinc-800 relative overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  />
                </div>
                
                {/* Node 2 (Core) */}
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="p-6 rounded-2xl bg-zinc-950 border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)] relative group-hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-shadow"
                >
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