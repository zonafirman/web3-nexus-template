"use client";

import React from 'react';
import ComponentPreview from '../ComponentPreview';
import BalanceCard from '../../dashboard/BalanceCard';

const codeString = `"use client";
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Send, Plus, CreditCard, Activity } from 'lucide-react';
import { useWeb3Store } from '@/store/useWeb3Store';

const BalanceCard = () => {
  const { isConnected, balance } = useWeb3Store();
  const numericBalance = parseFloat(balance.replace(' ETH', '')) || 0;
  const usdBalance = (numericBalance * 3400).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-zinc-900/80 to-[#09090b]/80 border border-white/10 backdrop-blur-xl h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
      {/* ... (Rest of the Balance Card code) ... */}
    </div>
  );
};
export default BalanceCard;`;

export default function BalanceCardDocs() {
  return (
    <div className="pt-10 pb-20">
      
      {/* Header Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Balance Card
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          The primary balance card for the Dashboard. Features reactive <i>glassmorphism</i> glow effects and connects directly to the Global State (Zustand) to read Web3 balances in real-time.
        </p>
      </header>

      <hr className="border-white/5 mb-16" />

      <ComponentPreview 
        title="Balance Card Component"
        description="Try clicking 'Connect' on the Navbar, and watch how the values on this card update automatically."
        preview={
          <div className="w-full max-w-md h-[340px]">
            <BalanceCard />
          </div>
        }
        code={codeString}
      />
    </div>
  );
}