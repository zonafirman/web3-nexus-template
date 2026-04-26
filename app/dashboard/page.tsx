import BalanceCard from "./BalanceCard";
import SwapCard from "./SwapCard";
import PortfolioChart from "./PortfolioChart";
import TransactionHistory from "./TransactionHistory";
import { Fuel, BellDot, ChevronDown } from 'lucide-react';

export default function DashboardOverview() {
  return (
    <div className="p-8 pt-8 max-w-6xl mx-auto pb-24">
      
      {/* HEADER */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-cyan-400">Zona Maulana</span>
          </h1>
          <p className="text-zinc-500 mt-1">Your entire Web3 portfolio at a glance.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1.5 px-3 bg-zinc-900 border border-white/10 rounded-full text-xs font-semibold">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-white">Arbitrum</span>
            <Fuel size={14} className="text-zinc-600 mx-1" />
            <span className="text-emerald-400">12 gwei</span>
          </div>
          <button className="p-2.5 bg-zinc-900 border border-white/10 rounded-full text-zinc-500 hover:text-cyan-400 transition-all relative">
            <BellDot size={18} />
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </button>
          <div className="flex items-center gap-2 p-1.5 pl-3 bg-zinc-900 border border-white/10 rounded-full cursor-pointer hover:bg-zinc-800 transition-colors">
            <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-zinc-950 text-sm">ZM</div>
            <ChevronDown size={16} className="text-zinc-600" />
          </div>
        </div>
      </header>

      {/* WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BalanceCard />
            <PortfolioChart />
          </div>
          <TransactionHistory />
        </div>
        
        <div className="lg:col-span-1">
          <SwapCard />
        </div>
      </div>
    </div>
  );
}