"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Fingerprint, Zap, Blocks, ShieldCheck, Cpu, Network } from 'lucide-react';

// --- Komponen Kartu 3D Kelas Atas ---
const TiltBentoCard = ({ children, className, colSpan }: { children: React.ReactNode, className?: string, colSpan: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Posisi Mouse untuk Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Fisika untuk Kemiringan 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    // Update Spotlight
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    // Update 3D Tilt (nilai dari -0.5 sampai 0.5)
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    // Kembalikan kartu ke posisi datar secara perlahan
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`relative ${colSpan} perspective-1000`} style={{ perspective: "1000px" }}>
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
        className={`relative h-full w-full rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md transition-colors duration-300 ${isHovered ? 'border-cyan-500/30' : ''} ${className}`}
      >
        {/* Spotlight Overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300"
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(6,182,212,0.15), transparent 40%)`
            ),
          }}
        />

        {/* Kontainer Elemen (translateZ menciptakan efek melayang 3D) */}
        <div 
          className="relative z-10 h-full p-8 flex flex-col"
          style={{ transform: "translateZ(40px)" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Features */}
        <div className="mb-16 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <ShieldCheck size={20} className="text-cyan-500" />
            <span className="text-cyan-500 font-semibold tracking-wider uppercase text-sm">Open Source Core</span>
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
          
          {/* Card 1: Account Abstraction */}
          <TiltBentoCard colSpan="md:col-span-2" className="group">
            <div className="flex justify-between items-start mb-auto">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                <Fingerprint size={28} className="text-cyan-400" />
              </div>
              
              {/* Efek 3D Pop-out UI Mockup */}
              <div 
                className="hidden sm:flex flex-col gap-2 p-3 bg-zinc-950/80 rounded-xl border border-white/10 shadow-2xl transition-all duration-500 opacity-50 group-hover:opacity-100"
                style={{ transform: "translateZ(30px)" }} // Melompat ke depan
              >
                <div className="h-2 w-24 bg-zinc-800 rounded-full"></div>
                <div className="h-8 w-32 bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center text-[10px] font-bold text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  SOCIAL LOGIN READY
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-3">Frictionless Onboarding</h3>
              <p className="text-zinc-400 leading-relaxed max-w-md">
                Native Account Abstraction components built-in. Let users sign in with Email, Google, or Passkeys. Seed phrases are now optional.
              </p>
            </div>
          </TiltBentoCard>

          {/* Card 2: Performance */}
          <TiltBentoCard colSpan="md:col-span-1" className="group">
             <div className="flex justify-between items-start mb-auto">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                <Zap size={28} className="text-yellow-400" />
              </div>
            </div>
            <div className="mt-8 relative">
              {/* Fake Lighthouse Graph */}
              <div className="absolute right-0 top-0 w-16 h-16 border-4 border-emerald-500/20 rounded-full border-t-emerald-500 group-hover:animate-spin"></div>
              
              <div className="flex items-end gap-2 mb-2 relative z-10" style={{ transform: "translateZ(20px)" }}>
                <span className="text-6xl font-black text-white tracking-tighter">99</span>
                <span className="text-emerald-400 font-bold mb-2">+ Score</span>
              </div>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Next.js App Router ensures lightning-fast load times.
              </p>
            </div>
          </TiltBentoCard>

          {/* Card 3: Viem & Wagmi */}
          <TiltBentoCard colSpan="md:col-span-3" className="group flex-row items-center overflow-visible">
            <div className="flex-1 pr-8 z-10">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500">
                <Blocks size={28} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Pre-Configured Web3 Hooks</h3>
              <p className="text-zinc-400 leading-relaxed max-w-xl">
                Built on top of Viem and Wagmi. Stop wrestling with RPC endpoints and provider setups. The entire logic skeleton is ready to connect to your smart contracts instantly.
              </p>
            </div>
            
            {/* Visualisasi Node Network 3D */}
            <div 
              className="hidden lg:flex flex-1 h-full items-center justify-end opacity-40 group-hover:opacity-100 transition-opacity duration-700 relative"
              style={{ transform: "translateZ(50px)" }} // Paling menonjol keluar
            >
              <div className="absolute right-12 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full"></div>
              <div className="relative z-10 flex items-center justify-center gap-6">
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl"><Cpu size={24} className="text-zinc-400" /></div>
                <div className="w-16 h-px bg-gradient-to-r from-zinc-700 to-cyan-500 relative">
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-950 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]"><Network size={32} className="text-cyan-400" /></div>
              </div>
            </div>
          </TiltBentoCard>

        </div>
      </div>
    </section>
  );
};

export default Features;