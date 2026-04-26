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
      {/* ... (Sisa kode Balance Card) ... */}
    </div>
  );
};
export default BalanceCard;`;

export default function BalanceCardDocs() {
  return (
    <div className="pt-10 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Balance Card
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          Kartu saldo utama untuk Dashboard. Dilengkapi dengan efek cahaya <i>glassmorphism</i> yang reaktif dan terhubung langsung ke Global State (Zustand) untuk membaca saldo Web3 secara <i>real-time</i>.
        </p>
      </div>

      <hr className="border-white/5 mb-16" />

      <ComponentPreview 
        title="Balance Card Component"
        description="Cobalah untuk melakukan 'Connect' pada Navbar, dan perhatikan bagaimana nilai pada kartu ini otomatis berubah."
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