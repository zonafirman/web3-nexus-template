"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Copy, Check, ExternalLink, Star } from 'lucide-react';
import { toast } from 'sonner';

// --- IMPORT FROM GLOBAL ANIMATION HUB ---
import { fadeUpItem, fadeIn, popIn3D, blinkCursor } from '@/lib/animations';

// ==========================================
// 1. STATIC DATA & CONFIGURATION
// ==========================================
const STORE_LINK = "https://yourstore.gumroad.com/l/nexus-ui-pro";
const CLONE_COMMAND = "npx create-next-app -e https://github.com/zonafirman/web3-nexus-template";

const FULL_CODE = `import { nexusUI } from '@nexus-ui/core';

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

// --- Helper: Syntax Highlighting Engine ---
const highlightSyntax = (line: string) => {
  return {
    __html: line
      .replace(/import|from|export const/g, '<span class="text-[#ff7b72] drop-shadow-[0_0_8px_rgba(255,123,114,0.4)]">$&</span>')
      .replace(/'@nexus-ui\/core'|'dark-neon'|'account-abstraction'|'ai-intent-engine'|'security-audit-live'|'enterprise-grade'/g, '<span class="text-[#a5d6ff]">$&</span>')
      .replace(/create|theme|features|security/g, '<span class="text-[#d2a8ff] drop-shadow-[0_0_8px_rgba(210,168,255,0.4)]">$&</span>')
      .replace(/\/\/.*$/g, '<span class="text-[#8b949e] italic">$&</span>')
  };
};

const SPRING_CONFIG = { stiffness: 150, damping: 20 };
const CLONE_BTN_BASE = "flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)] border";

// ==========================================
// 2. MAIN HERO COMPONENT
// ==========================================
const Hero = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [typedCode, setTypedCode] = useState("");
  
  // --- Typewriter Effect ---
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < FULL_CODE.length) {
        setTypedCode(FULL_CODE.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);
    return () => clearInterval(typingInterval);
  }, []);

  // --- Clone Button Handler ---
  const handleClone = () => {
    navigator.clipboard.writeText(CLONE_COMMAND);
    setIsCopied(true);
    toast.success('Repository link copied!', {
      description: 'You can now paste it in your terminal.',
      icon: <Terminal size={16} />,
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  // --- 3D Physics for IDE Mockup ---
  const ideRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, SPRING_CONFIG);
  const mouseYSpring = useSpring(y, SPRING_CONFIG);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ideRef.current) return;
    const rect = ideRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  // --- Dynamic Tailwind CSS Class ---
  const cloneBtnState = isCopied 
    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]" 
    : "bg-white text-zinc-950 border-white hover:bg-zinc-200 hover:scale-105";

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      
      {/* Retro-Futuristic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none -z-20 mask-image:linear-gradient(to_bottom,black,transparent)]" style={{ WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)' }}></div>

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* LEFT COLUMN: Value Proposition & CTA */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          
          <motion.div 
            variants={fadeUpItem} custom={0} initial="hidden" animate="visible"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/20 mb-8 hover:bg-cyan-500/10 transition-colors cursor-default backdrop-blur-md"
          >
            <Sparkles size={16} className="text-cyan-400 group-hover:animate-spin" />
            <span className="text-sm font-semibold text-cyan-100">Nexus UI Lite v2.0 is Open Source</span>
          </motion.div>

          <motion.h1 
            variants={fadeUpItem} custom={0.1} initial="hidden" animate="visible"
            className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9]"
          >
            Web3 UI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              Redefined.
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeUpItem} custom={0.2} initial="hidden" animate="visible"
            className="text-lg md:text-xl text-zinc-400 max-w-xl mb-10 leading-relaxed font-medium"
          >
            The world's most advanced Web3 starter kit. Built with Next.js 15, Tailwind v4, and the future of Account Abstraction.
          </motion.p>

          <motion.div 
            variants={fadeUpItem} custom={0.3} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8"
          >
            {/* Action 1: Clone Repo */}
            <button onClick={handleClone} className={`${CLONE_BTN_BASE} ${cloneBtnState}`}>
              {isCopied ? <><Check size={18} /> Copied!</> : <><Terminal size={18} /> Clone Repository</>}
            </button>

            {/* Action 2: Upgrade to Pro */}
            <a 
              href={STORE_LINK} target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 border border-white/10 text-white font-bold rounded-2xl transition-all hover:border-cyan-500/50 hover:bg-zinc-800 shadow-2xl relative overflow-hidden"
            >
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

          {/* SOCIAL PROOF */}
          <motion.div 
            variants={fadeIn} custom={0.6} initial="hidden" animate="visible"
            className="flex items-center gap-4 flex-col sm:flex-row text-center sm:text-left"
          >
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-zinc-950 flex items-center justify-center font-bold text-xs text-white">AJ</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-zinc-950 flex items-center justify-center font-bold text-xs text-white">MK</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-zinc-950 flex items-center justify-center font-bold text-xs text-white">DZ</div>
              <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center font-bold text-xs text-zinc-400">+4k</div>
            </div>
            <div>
              <div className="flex items-center gap-1 justify-center sm:justify-start mb-0.5">
                {[1,2,3,4,5].map(star => <Star key={star} size={14} className="fill-yellow-500 text-yellow-500" />)}
              </div>
              <p className="text-xs font-medium text-zinc-400">Trusted by 4,000+ Web3 Developers</p>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Interactive 3D IDE Mockup */}
        <motion.div 
          variants={popIn3D} custom={0.4} initial="hidden" animate="visible"
          className="flex-1 w-full max-w-lg lg:max-w-full relative perspective-1000"
        >
          <motion.div 
            ref={ideRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative z-10 w-full rounded-3xl bg-[#0d1117]/90 border border-white/10 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden group hover:border-cyan-500/40 transition-colors duration-500"
          >
            {/* MacOS Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40" style={{ transform: "translateZ(10px)" }}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-inner"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-inner"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-inner"></div>
                <span className="ml-3 text-xs font-mono text-zinc-500 tracking-widest uppercase">nexus-config.ts</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">TypeScript</div>
            </div>
            
            {/* Code Editor Body */}
            <div className="p-8 h-[280px] font-mono text-sm leading-relaxed overflow-hidden" style={{ transform: "translateZ(30px)" }}>
              <pre>
                <code>
                  {typedCode.split('\n').map((line, i) => (
                    <div key={i} className="flex hover:bg-white/5 rounded px-2 -mx-2 transition-colors">
                      <span className="w-8 text-zinc-700 select-none">{i + 1}</span>
                      <span className="text-zinc-300" dangerouslySetInnerHTML={highlightSyntax(line)} />
                    </div>
                  ))}
                  <motion.span 
                    variants={blinkCursor} animate="animate"
                    className="inline-block w-2.5 h-4 bg-cyan-400 ml-1 align-middle shadow-[0_0_10px_#06b6d4]"
                  />
                </code>
              </pre>
            </div>
          </motion.div>

          {/* Decorative Background Effects */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-500/20 blur-[100px] -z-10 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/20 blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;