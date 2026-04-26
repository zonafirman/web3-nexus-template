"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, X, Mail, ChevronRight, Loader2, Fingerprint } from 'lucide-react';
import { useWeb3Store } from '@/store/useWeb3Store';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const connectWallet = useWeb3Store((state) => state.connect);
  const [isConnecting, setIsConnecting] = useState(false);
  const [email, setEmail] = useState('');

  const handleFakeConnect = () => {
    setIsConnecting(true);
    // Simulasi delay jaringan 1.5 detik untuk UX yang realistis
    setTimeout(() => {
      connectWallet("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
      setIsConnecting(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isConnecting ? onClose : undefined} 
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-white/5 relative z-10">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Sign In <Fingerprint size={18} className="text-cyan-500" />
                </h2>
                <p className="text-sm text-zinc-500 mt-1">Start your Web3 journey today.</p>
              </div>
              <button 
                onClick={onClose}
                disabled={isConnecting}
                className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 relative z-10">
              
              {/* Account Abstraction Section (Email & Social) */}
              <div className="space-y-3">
                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="Continue with email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-zinc-500 focus:border-cyan-500/50 outline-none transition-colors"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-2xl text-sm font-semibold text-white transition-colors">
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
                  </svg> Continue with GitHub
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/5"></div>
                <span className="text-xs font-medium text-zinc-600 uppercase tracking-widest">Or Web3 Wallet</span>
                <div className="h-px flex-1 bg-white/5"></div>
              </div>

              {/* Native Web3 Wallet Connect */}
              <button 
                onClick={handleFakeConnect}
                disabled={isConnecting}
                className="w-full flex items-center justify-between p-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <Wallet size={20} className="text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-white text-sm">Browser Wallet</span>
                    <span className="block text-xs text-zinc-500 mt-0.5">MetaMask, Trust, Phantom</span>
                  </div>
                </div>
                
                {isConnecting ? (
                  <Loader2 size={20} className="text-cyan-500 animate-spin relative z-10" />
                ) : (
                  <ChevronRight size={20} className="text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all relative z-10" />
                )}
              </button>

            </div>

            {/* Footer */}
            <div className="p-4 bg-zinc-900/50 border-t border-white/5 text-center relative z-10">
              <p className="text-[10px] text-zinc-500">
                By connecting, you agree to our <a href="#" className="text-zinc-400 hover:text-cyan-400 underline decoration-white/20 underline-offset-2">Terms of Service</a> and <a href="#" className="text-zinc-400 hover:text-cyan-400 underline decoration-white/20 underline-offset-2">Privacy Policy</a>.
              </p>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;