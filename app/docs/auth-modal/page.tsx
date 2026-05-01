"use client";

import React, { useState } from 'react';
import ComponentPreview from '../ComponentPreview';
import AuthModal from '@/components/web3/AuthModal';

const codeString = `"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, X, Mail, Github, ChevronRight, Loader2, Fingerprint } from 'lucide-react';
import { useWeb3Store } from '@/store/useWeb3Store';

const AuthModal = ({ isOpen, onClose }) => {
  // ... (Simulated wallet connection delay logic) ...
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
           {/* ... (Account Abstraction Modal Structure) ... */}
        </div>
      )}
    </AnimatePresence>
  );
};
export default AuthModal;`;

export default function AuthModalDocs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-10 pb-20">
      
      {/* Header Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Auth Modal
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          A 2026-standard Web3 authentication modal. Prioritizes <b>Account Abstraction</b> (Email/Social Login) at the top, with traditional Browser Wallets at the bottom.
        </p>
      </header>

      <hr className="border-white/5 mb-16" />

      {/* Component Preview Area */}
      <ComponentPreview 
        title="Interactive Auth Modal"
        description="Click the button below to trigger the Modal. Try clicking 'Browser Wallet' to see the simulated connection loading effect."
        preview={
          <div className="w-full h-[300px] flex items-center justify-center relative">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-cyan-500 text-zinc-950 font-black rounded-2xl hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              Open Auth Modal
            </button>
            
            {/* Render the actual Auth Modal component */}
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>
        }
        code={codeString}
      />
    </div>
  );
}