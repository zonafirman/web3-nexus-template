"use client";

import React from 'react';
import ComponentPreview from '../ComponentPreview';

// --- IMPORT ORIGINAL COMPONENTS ---
import SwapCard from '@/app/dashboard/SwapCard';

// ==========================================
// 1. STATIC DATA & SOURCE CODE
// ==========================================
const SWAP_CARD_CODE = `"use client";
import React, { useState } from 'react';
import { ArrowDown, Info, Settings2, Zap } from 'lucide-react';

const SwapCard = () => {
  const [amount, setAmount] = useState('');

  return (
    <div className="p-6 md:p-8 rounded-[2.5rem] bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden h-full flex flex-col">
       {/* ... (Rest of Swap Card code with dynamic inputs) ... */}
    </div>
  );
};

export default SwapCard;`;

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
export default function SwapDocs() {
  return (
    <div className="pt-10 pb-20">
      
      {/* HEADER SECTION */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Swap Interface
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          An essential component for DeFi (Decentralized Finance) applications. This token exchange interface is designed with <i>real-time</i> calculations and high-level user interactions.
        </p>
      </div>

      <hr className="border-white/5 mb-16" />

      {/* COMPONENT PREVIEW */}
      <ComponentPreview 
        title="DEX Swap Card"
        description="Type a number in the 'You Sell' field and watch how the 'You Get' value is automatically calculated with premium interface effects."
        preview={
          <div className="w-full max-w-md h-[550px] relative mt-10">
            {/* Additional background to make the SwapCard's blur effect look realistic */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full -z-10"></div>
            <SwapCard />
          </div>
        }
        code={SWAP_CARD_CODE}
      />
      
    </div>
  );
}