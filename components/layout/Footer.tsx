"use client";

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Disc, Check, Loader2 } from 'lucide-react';

// --- Komponen Tombol Magnetik ---
const MagneticButton = ({ children, onClick, isLoading, isSuccess }: { children: React.ReactNode, onClick?: () => void, isLoading: boolean, isSuccess: boolean }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Semakin dekat kursor, semakin kuat magnetnya (maksimal geser 15px)
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      disabled={isLoading || isSuccess}
      className={`relative p-3 rounded-xl transition-colors duration-300 overflow-hidden group ${
        isSuccess ? 'bg-emerald-500 text-white' : 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950'
      }`}
    >
      <div className="relative z-10 flex items-center justify-center min-w-6">
        {isLoading ? <Loader2 size={18} className="animate-spin" /> : 
         isSuccess ? <Check size={18} /> : children}
      </div>
    </motion.button>
  );
};

// --- Komponen Utama Footer ---
const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // Simulasi pengiriman API
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      // Kembalikan ke normal setelah 3 detik
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <footer className="relative pt-32 pb-10 overflow-hidden bg-zinc-950 z-10">
      {/* Garis Pemisah dengan Efek Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Glow Latar Belakang (Lebih halus) */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full h-100 bg-cyan-500/10 blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-16">
          
          {/* KOLOM KIRI: Teks Besar & Form Waitlist */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
              Shape the <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Web3 Future.</span>
            </h2>
            <p className="text-zinc-400 mb-8 max-w-sm text-lg">
              Join 4,000+ developers receiving updates on new Account Abstraction components.
            </p>

            <form onSubmit={handleSubmit} className="relative max-w-md">
              <div className={`flex items-center p-1.5 bg-zinc-900 border transition-all duration-300 rounded-2xl ${
                status === 'success' ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 
                status === 'idle' ? 'border-white/10 hover:border-cyan-500/30' : 'border-white/10'
              }`}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter.your@email.com" 
                  disabled={status !== 'idle'}
                  className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder-zinc-600 text-sm disabled:opacity-50"
                  required
                />
                <MagneticButton isLoading={status === 'loading'} isSuccess={status === 'success'}>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </div>
              <AnimatePresence>
                {status === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-7 left-2 text-emerald-400 text-xs font-medium"
                  >
                    Welcome to the nexus. We&apos;ll be in touch.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* KOLOM KANAN: Tautan Navigasi Footer */}
          <div className="w-full lg:w-auto grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white mb-2">Ecosystem</h4>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">Components</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">Templates (Pro)</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">Documentation</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                Figma File <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-500 text-[10px] font-bold uppercase tracking-wider">New</span>
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white mb-2">Company</h4>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">About</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">Blog</a>
              <a href="https://github.com/zonafirman" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 transition-colors">GitHub Profile</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white mb-2">Legal</h4>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">License</a>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR: Hak Cipta & Sosial Media */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              <div className="w-2 h-2 bg-zinc-950 rounded-sm rotate-45"></div>
            </div>
            <span className="text-zinc-400 font-medium text-sm">
              © 2026 Nexus UI. Crafted with precision by <span className="text-white font-semibold">Zona Firman Maulana</span>.
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <a href="#" className="p-2.5 rounded-full bg-zinc-900 border border-transparent text-zinc-400 hover:bg-zinc-800 hover:border-white/10 hover:text-cyan-400 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="https://github.com/zonafirman" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-zinc-900 border border-transparent text-zinc-400 hover:bg-zinc-800 hover:border-white/10 hover:text-cyan-400 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-full bg-zinc-900 border border-transparent text-zinc-400 hover:bg-zinc-800 hover:border-white/10 hover:text-cyan-400 transition-all">
              <Disc size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;