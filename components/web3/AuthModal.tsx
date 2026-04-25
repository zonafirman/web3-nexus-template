"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { useWeb3Store } from '@/store/useWeb3Store'; // <-- Impor Store

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const connectWallet = useWeb3Store((state) => state.connect); // <-- Ambil fungsi connect

  const handleFakeConnect = () => {
    // Simulasi koneksi dompet fiktif
    connectWallet("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
    onClose(); // Tutup modal setelah koneksi
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
          {/* ... Backdrop Blur tetap sama ... */}
          <motion.div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden"
          >
            {/* ... Header dan Email Login tetap sama ... */}
            
            {/* Ubah Tombol Wallet menjadi: */}
            <button 
              onClick={handleFakeConnect} // <-- Tambahkan trigger koneksi
              className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-3 relative z-10">
                <Wallet size={20} className="text-cyan-500" />
                <span className="font-medium text-white">Connect Web3 Wallet</span>
              </div>
            </button>
            {/* ... Sisa modal tetap sama ... */}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;