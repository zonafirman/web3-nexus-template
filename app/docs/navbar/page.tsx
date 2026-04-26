"use client";

import React from 'react';
import ComponentPreview from '../ComponentPreview';
import { Sparkles, Mic, Wallet, Menu } from 'lucide-react';

const codeString = `"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// ... (import lucide icons dan zustand store) ...

const Navbar = () => {
  // ... (Logika state, scroll listener, AI Dropdown, dan Wallet Dropdown) ...
  
  return (
    <motion.div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-5xl">
      {/* ... (Struktur Dynamic Island Navbar) ... */}
    </motion.div>
  );
};
export default Navbar;`;

export default function NavbarDocs() {
  return (
    <div className="pt-10 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Navbar (Dynamic Island)
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          Navigasi melayang bergaya <i>Dynamic Island</i> ala Apple. Dilengkapi dengan <b>AI Command Center</b> yang interaktif dan menu *dropdown* dompet Web3 bergaya <i>glassmorphism</i>.
        </p>
      </div>

      <hr className="border-white/5 mb-16" />

      <ComponentPreview 
        title="Desktop Navbar Component"
        description="Representasi visual dari Navbar. (Navbar asli menggunakan 'position: fixed' sehingga menempel di atas browser Anda)."
        preview={
          <div className="w-full p-4">
            {/* Visual Mockup Navbar untuk Preview */}
            <div className="w-full max-w-4xl mx-auto rounded-full bg-zinc-950/80 border border-white/10 p-3 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 pl-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center"><div className="w-3 h-3 bg-zinc-950 rounded-sm rotate-45"></div></div>
                <span className="font-bold text-white hidden sm:block">NEXUS</span>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-zinc-900 rounded-full border border-white/5 flex-1 max-w-sm mx-8">
                <Sparkles size={14} className="text-cyan-500" />
                <span className="text-sm text-zinc-500 w-full">Ask AI to swap, stake...</span>
                <Mic size={14} className="text-zinc-400" />
              </div>
              <div className="flex items-center gap-6 pr-2">
                <span className="text-sm font-semibold text-zinc-400 hidden lg:block">Features</span>
                <span className="text-sm font-semibold text-zinc-400 hidden lg:block">Dashboard</span>
                <button className="flex items-center gap-2 px-5 py-2 bg-white text-zinc-950 rounded-full text-sm font-bold">
                  <Wallet size={16} /> Connect
                </button>
              </div>
            </div>
          </div>
        }
        code={codeString}
      />
    </div>
  );
}