import DashboardSidebar from "@/components/layout/DashboardSidebar";
import BalanceCard from "./BalanceCard";
import SwapCard from "./SwapCard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <DashboardSidebar />
      <main className="flex-1 p-8 pt-10">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-white">Welcome back, Zona</h1>
            <p className="text-zinc-500">Monitor your Web3 assets and transactions.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <BalanceCard />
              {/* Tempat untuk Chart atau Transaction History nanti */}
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 h-64 flex items-center justify-center text-zinc-600 border-dashed">
                Chart Component Placeholder
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <SwapCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}