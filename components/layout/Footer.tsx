"use client";

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { springs, fadeUp, successPop } from '@/lib/animations'; // <-- IMPORT GLOBAL ANIMATIONS

// ==========================================
// 1. STATIC CONFIGURATION & STYLES
// ==========================================
const INPUT_WRAPPER_BASE = "flex items-center p-1.5 bg-zinc-900/50 backdrop-blur-sm border transition-all duration-500 rounded-2xl";
const INPUT_WRAPPER_SUCCESS = "border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-emerald-500/5";
const INPUT_WRAPPER_IDLE = "border-white/10 hover:border-cyan-500/40 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.1)]";
const INPUT_WRAPPER_DISABLED = "border-white/10 opacity-70";
const SOCIAL_ICON_CLASS = "p-2.5 rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all group";

// --- Smoother Magnetic Button Component ---
const MagneticButton = ({ children, onClick, isLoading, isSuccess }: { children: React.ReactNode, onClick?: () => void, isLoading: boolean, isSuccess: boolean }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Using spring configuration from lib/animations.ts
  const springX = useSpring(x, springs.magnetic);
  const springY = useSpring(y, springs.magnetic);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      disabled={isLoading || isSuccess}
      className={`relative p-3.5 rounded-xl transition-all duration-300 overflow-hidden group ${
        isSuccess 
          ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
          : 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
      }`}
    >
      <div className="relative z-10 flex items-center justify-center min-w-5 min-h-5">
        {isLoading ? <Loader2 size={18} className="animate-spin text-zinc-950" /> : 
         isSuccess ? <Check size={18} className="text-zinc-950" /> : children}
      </div>
    </motion.button>
  );
};

// ==========================================
// 2. MAIN FOOTER COMPONENT
// ==========================================
const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <footer className="relative pt-40 pb-10 overflow-hidden bg-[#050505] z-10 border-t border-white/5 mt-20">
      
      {/* Background Decorators */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0 mask-image:linear-gradient(to_top,black,transparent)]" style={{ WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 blur-[150px] pointer-events-none z-0 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-16">
          
          {/* LEFT COLUMN: Large Text & Waitlist Form */}
          <div className="w-full lg:w-1/2">
            <motion.h2 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.95]"
            >
              Shape the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                Web3 Future.
              </span>
            </motion.h2>
            
            <motion.p 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-zinc-400 mb-10 max-w-md text-lg font-medium"
            >
              Join <span className="text-cyan-400 font-bold">4,000+</span> developers receiving updates on new Account Abstraction components and Web3 UI trends.
            </motion.p>

            <motion.form 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}
              onSubmit={handleSubmit} 
              className="relative max-w-md"
            >
              <div className={`${INPUT_WRAPPER_BASE} ${
                status === 'success' ? INPUT_WRAPPER_SUCCESS : 
                status === 'idle' ? INPUT_WRAPPER_IDLE : INPUT_WRAPPER_DISABLED
              }`}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter.your@email.com" 
                  disabled={status !== 'idle'}
                  className="flex-1 bg-transparent border-none outline-none text-white px-5 placeholder-zinc-500 font-medium text-sm disabled:cursor-not-allowed"
                  required
                />
                <MagneticButton isLoading={status === 'loading'} isSuccess={status === 'success'}>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </MagneticButton>
              </div>

              {/* Success Message Animation Using Global Variants */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.p 
                    variants={successPop} initial="hidden" animate="visible" exit="exit"
                    className="absolute -bottom-8 left-4 text-emerald-400 text-sm font-semibold flex items-center gap-2"
                  >
                    <Check size={14} /> Welcome to the nexus. We'll be in touch.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </div>

          {/* RIGHT COLUMN: Footer Navigation Links */}
          <div className="w-full lg:w-auto grid grid-cols-2 md:grid-cols-3 gap-12 text-sm pt-4">
            <div className="flex flex-col gap-5">
              <h4 className="font-black text-white text-base tracking-tight mb-2">Ecosystem</h4>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors">Components</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors">Templates <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">PRO</span></a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors">Documentation</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors flex items-center gap-2">
                Figma File <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-500 text-[9px] font-bold uppercase tracking-wider border border-cyan-500/20">New</span>
              </a>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="font-black text-white text-base tracking-tight mb-2">Company</h4>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors">About Nexus</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors">Engineering Blog</a>
              <a href="https://github.com/zonafirman" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors flex items-center gap-1.5">
                GitHub Profile <ArrowRight size={12} />
              </a>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="font-black text-white text-base tracking-tight mb-2">Legal</h4>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors">Privacy Policy</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors">Terms of Service</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors">MIT License</a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: Copyright & Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6 mt-12">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <div className="w-3 h-3 bg-zinc-950 rounded-sm rotate-45"></div>
            </div>
            <span className="text-zinc-500 font-medium text-sm">
              © 2026 Nexus UI. Engineered by <span className="text-zinc-300 font-bold hover:text-cyan-400 transition-colors cursor-pointer">Zona Firman Maulana</span>.
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <a href="#" className={SOCIAL_ICON_CLASS}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="https://github.com/zonafirman" target="_blank" rel="noopener noreferrer" className={SOCIAL_ICON_CLASS}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a href="#" className={SOCIAL_ICON_CLASS}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;