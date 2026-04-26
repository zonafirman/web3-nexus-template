"use client";

import React from 'react';
import ComponentPreview from '../ComponentPreview';
import SwapCard from '../../dashboard/SwapCard';

const codeString = `"use client";
import React, { useState } from 'react';
import { ArrowDown, Info, Settings2, Zap } from 'lucide-react';

const SwapCard = () => {
  const [amount, setAmount] = useState('');

  return (
    <div className="p-6 md:p-8 rounded-[2.5rem] bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden h-full flex flex-col">
       {/* ... (Sisa kode Swap Card dengan input dinamis) ... */}
    </div>
  );
};
export default SwapCard;`;

export default function SwapDocs() {
  return (
    <div className="pt-10 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Swap Interface
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          Komponen esensial untuk aplikasi DeFi (Decentralized Finance). Antarmuka pertukaran token ini dirancang dengan kalkulasi <i>real-time</i> dan interaksi pengguna tingkat tinggi.
        </p>
      </div>

      <hr className="border-white/5 mb-16" />

      <ComponentPreview 
        title="DEX Swap Card"
        description="Ketik angka di kolom 'You Sell' dan perhatikan bagaimana nilai 'You Get' terkalkulasi secara otomatis dengan efek antarmuka premium."
        preview={
          <div className="w-full max-w-md h-[550px] relative mt-10">
            {/* Latar belakang tambahan agar efek blur SwapCard terlihat nyata */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full -z-10"></div>
            <SwapCard />
          </div>
        }
        code={codeString}
      />
    </div>
  );
}