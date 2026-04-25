"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import AuthModal from '@/components/web3/AuthModal'; // <-- Tambahan impor
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- Tambahan state
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sembunyikan navbar jika sedang di halaman dashboard
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 ${
          isScrolled 
          ? "bg-zinc-950/50 backdrop-blur-md border-b border-white/10" 
          : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
            <span className="text-xl font-bold tracking-tight text-white">NEXUS<span className="text-cyan-500">UI</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-cyan-500 transition-colors">Marketplace</a>
            <a href="#" className="hover:text-cyan-500 transition-colors">Staking</a>
            <a href="#" className="hover:text-cyan-500 transition-colors">Docs</a>
          </div>

          {/* Tombol yang memicu Modal */}
          <button 
            onClick={() => setIsModalOpen(true)} // <-- Tambahan trigger
            className="group relative px-6 py-2 bg-zinc-900 border border-white/10 rounded-full overflow-hidden transition-all hover:border-cyan-500/50"
          >
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-2 relative z-10">
              <Wallet size={16} className="text-cyan-500" />
              <span className="text-sm font-semibold text-white">Connect Wallet</span>
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Render Modal di luar elemen nav */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;