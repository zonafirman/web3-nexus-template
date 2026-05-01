"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Info, Settings2, Zap } from 'lucide-react';

// Mock data for development
const MOCK_EXCHANGE_RATE = 3420.50;
const MOCK_BALANCE = 10.50;

const SwapCard = () => {
  const [amount, setAmount] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  // Safely parse amount and calculate output
  const parsedAmount = parseFloat(amount) || 0;
  const calculatedOutput = parsedAmount > 0 
    ? (parsedAmount * MOCK_EXCHANGE_RATE).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 }) 
    : '0.00';

  // Validation for the action button
  const isInsufficient = parsedAmount > MOCK_BALANCE;
  const isButtonDisabled = parsedAmount <= 0 || isInsufficient;

  return (
    <div className="p-6 md:p-8 rounded-[2.5rem] bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden h-full flex flex-col">
      
      {/* Ambient Glow Effect */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 blur-[80px] pointer-events-none"></div>

      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">Swap</h3>
        <button className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white transition-colors">
          <Settings2 size={18} />
        </button>
      </div>

      <div className="space-y-2 relative">
        {/* Input Area 1: You Sell */}
        <div className="p-6 rounded-[1.5rem] bg-zinc-950 border border-white/5 group focus-within:border-cyan-500/50 transition-all">
          <div className="flex justify-between text-xs font-bold text-zinc-500 mb-3 uppercase tracking-widest">
            <span>You Sell</span>
            <span>Balance: {MOCK_BALANCE.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              placeholder="0.0" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`bg-transparent border-none outline-none text-3xl font-black w-full placeholder-zinc-800 ${isInsufficient ? 'text-red-500' : 'text-white'}`}
            />
            <button className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition-colors">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold">ETH</div>
              <span className="font-bold text-sm">ETH</span>
            </button>
          </div>
        </div>

        {/* Swap Direction Button */}
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-10">
          <motion.button 
            onClick={() => setIsFlipped(!isFlipped)}
            animate={{ rotate: isFlipped ? 180 : 0 }}
            className="p-3 rounded-2xl bg-zinc-900 border-4 border-zinc-950 text-cyan-500 hover:scale-110 active:scale-95 transition-all shadow-xl"
          >
            <ArrowDown size={20} strokeWidth={3} />
          </motion.button>
        </div>

        {/* Input Area 2: You Get */}
        <div className="p-6 rounded-[1.5rem] bg-zinc-950 border border-white/5 group transition-all">
          <div className="flex justify-between text-xs font-bold text-zinc-500 mb-3 uppercase tracking-widest">
            <span>You Get</span>
            <span>-</span>
          </div>
          <div className="flex items-center gap-4">
            <div className={`text-3xl font-black w-full select-none overflow-hidden text-ellipsis ${parsedAmount > 0 ? 'text-white' : 'text-zinc-700'}`}>
              {calculatedOutput}
            </div>
            <button className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition-colors">
              <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-bold text-zinc-950">USDC</div>
              <span className="font-bold text-sm">USDC</span>
            </button>
          </div>
        </div>
      </div>

      {/* Swap Details Area */}
      <div className="mt-8 space-y-3 px-2 flex-1">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500 font-medium">Price Impact</span>
          <span className="text-emerald-400 font-bold">&lt; 0.01%</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500 font-medium flex items-center gap-1.5">Network Fee <Info size={12}/></span>
          <span className="text-zinc-300 font-bold">~$2.40</span>
        </div>
      </div>

      {/* Action Button */}
      <button 
        disabled={isButtonDisabled}
        className={`w-full py-5 rounded-[1.5rem] font-black text-lg transition-all flex items-center justify-center gap-2 group/swap mt-4 ${
          isButtonDisabled 
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
            : 'bg-cyan-500 text-zinc-950 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:bg-cyan-400 active:scale-[0.98]'
        }`}
      >
        {!isButtonDisabled && <Zap size={20} className="fill-zinc-950 group-hover:scale-125 transition-transform" />}
        {isInsufficient ? 'Insufficient Balance' : 'Review Swap'}
      </button>
    </div>
  );
};

export default SwapCard;