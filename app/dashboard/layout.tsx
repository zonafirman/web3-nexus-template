import React from 'react';
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Tambahan overflow-hidden agar glow tidak bocor keluar layar
    <div className="flex min-h-screen bg-zinc-950 text-zinc-200 selection:bg-cyan-500/30 overflow-hidden font-sans antialiased">
      
      {/* Sidebar Desktop (Persisten) */}
      <DashboardSidebar />
      
      {/* Area Konten Dinamis */}
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative scroll-smooth">
        
        {/* MOBILE HEADER (Penyelamat UX di HP) */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-cyan-500 rounded-lg flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-zinc-950 rounded-sm rotate-45"></div>
            </div>
            <span className="font-bold text-white tracking-tight">NEXUS<span className="text-cyan-500">DASH</span></span>
          </Link>
          <button className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-xl border border-white/10 active:scale-95 transition-transform">
            <Menu size={20} />
          </button>
        </div>

        {/* DUAL GLOW BACKGROUND (Menciptakan kedalaman 3D) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-600/5 blur-[120px] pointer-events-none -z-10 rounded-full"></div>
        
        {/* Render Konten Halaman (Z-10 agar selalu di atas glow) */}
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}