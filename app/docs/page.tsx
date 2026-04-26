"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Palette, LayoutDashboard, Copy, CheckCircle2, Zap, Lock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// --- Helper: Block Kode Copy-Paste ---
const CodeBlock = ({ code, title }: { code: string, title?: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden my-4 group shadow-xl">
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#010409]/80 border-b border-white/5 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
             <span className="ml-2">{title}</span>
          </div>
        </div>
      )}
      <button 
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="Copy code"
      >
        {isCopied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
      </button>
      <pre className="p-6 overflow-x-auto text-sm font-mono text-zinc-300 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// --- Helper: Section Dokumentasi ---
const DocSection = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
  <section className="mb-20">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
    </div>
    <div className="space-y-4 text-zinc-400 leading-relaxed text-sm md:text-base">
      {children}
    </div>
  </section>
);

const DocsIntroduction = () => {
  return (
    <div className="pt-10 pb-20 selection:bg-cyan-500/30">
      <div className="max-w-4xl relative z-10">
        
        {/* Header Docs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-white/10 pb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 mb-6 uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            v2.0 Architecture
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">
            Introduction
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-2xl leading-relaxed">
            Welcome to the Nexus UI manual. Learn the core concepts, architecture, and how to utilize our premium Web3 components to build your next dApp.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/dashboard" className="px-6 py-3 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              View Live Dashboard
            </Link>
            <Link href="/docs/landing-page" className="px-6 py-3 bg-zinc-900 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-colors">
              Browse Components
            </Link>
          </div>
        </motion.div>

        {/* 1. Quick Start */}
        <DocSection title="Quick Start" icon={Terminal}>
          <p>Kloning repositori Open Source kami dan jalankan *environment* pengembangan lokal Anda dalam waktu kurang dari 60 detik.</p>
          <CodeBlock 
            title="terminal"
            code={`npx create-next-app -e https://github.com/zonafirman/web3-nexus-template my-dapp\ncd my-dapp\nnpm install\nnpm run dev`} 
          />
        </DocSection>

        {/* 2. Dashboard Architecture */}
        <DocSection title="Dashboard Architecture (SPA)" icon={LayoutDashboard}>
          <p>Nexus UI dibangun dengan pola desain modern. Kami memanfaatkan fitur <strong>Nested Layouts</strong> dari Next.js 15 App Router untuk menciptakan pengalaman <em>Single Page Application</em> murni.</p>
          <CodeBlock 
            title="app/dashboard/layout.tsx"
            code={`import DashboardSidebar from "@/components/layout/DashboardSidebar";\n\nexport default function DashboardLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <div className="flex min-h-screen bg-zinc-950 text-white">\n      {/* Sidebar persists across all /dashboard routes */}\n      <DashboardSidebar />\n      \n      {/* Only this main area re-renders on navigation */}\n      <main className="flex-1 p-8 h-screen overflow-y-auto">\n        {children}\n      </main>\n    </div>\n  );\n}`} 
          />
          <p className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-blue-300 text-sm">
            <strong>Pro Tip:</strong> Struktur ini memastikan status dompet Web3 Anda (koneksi Wagmi/Viem) tidak terputus saat pengguna berpindah menu dari Overview ke Settings.
          </p>
        </DocSection>

        {/* 3. Theming Engine */}
        <DocSection title="Theming Engine (Tailwind v4)" icon={Palette}>
          <p>Kami telah memindahkan sistem tema dari config lama ke CSS native menggunakan fitur `@theme` terbaru dari Tailwind CSS v4. Ini membuat website Anda lebih ringan dan reaktif.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 rounded-2xl bg-[#09090b] border border-white/10 shadow-lg relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none group-hover:bg-cyan-500/20"></div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]"></div> 
                <span className="font-bold text-white">Neon Cyan (Default)</span>
              </div>
              <CodeBlock code={`@theme {\n  --color-primary: #06b6d4;\n  --color-bg: #09090b;\n}`} />
            </div>
            <div className="p-6 rounded-2xl bg-[#052e16] border border-white/10 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] pointer-events-none group-hover:bg-emerald-500/20"></div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]"></div> 
                <span className="font-bold text-white">Matrix Emerald</span>
              </div>
              <CodeBlock code={`@theme {\n  --color-primary: #10b981;\n  --color-bg: #052e16;\n}`} />
            </div>
          </div>
        </DocSection>

        {/* 4. The Ultimate Pro Upsell */}
        <div className="mt-32">
          <DocSection title="Unlock The Backend Engine" icon={Lock}>
            <div className="p-8 md:p-12 rounded-[2.5rem] border border-cyan-500/30 bg-[#0d1117] relative overflow-hidden shadow-[0_20px_80px_rgba(6,182,212,0.15)] group">
              {/* Background Effects */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-700"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs font-bold text-yellow-500 mb-6 shadow-inner tracking-widest uppercase">
                  <Zap size={14} className="fill-yellow-500" /> Pro Developer License
                </div>
                
                <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">
                  The UI is Free. <br/>
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Logic</span> is Pro.
                </h3>
                
                <p className="text-zinc-400 mb-10 max-w-xl leading-relaxed">
                  Versi Lite memberi Anda struktur visual yang luar biasa. Namun, jika Anda ingin menghemat ratusan jam menyambungkan antarmuka ini ke Smart Contract, Anda membutuhkan <strong>Nexus UI Pro</strong>.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {[
                    'Zustand Global State Management', 
                    'Viem & Wagmi Pre-configured Hooks', 
                    'Working AI Intent Swap Engine', 
                    'Real-time Gas Fee Live Tracker', 
                    'Interactive Charting without Chart.js', 
                    'Premium Figma Source Files'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
                      <CheckCircle2 size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" /> 
                      <span className="text-sm font-semibold text-white">{item}</span>
                    </div>
                  ))}
                </div>
                
                <a 
                  href="https://yourstore.gumroad.com/l/nexus-ui-pro" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-cyan-500 text-zinc-950 font-black rounded-2xl hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                >
                  Get Nexus UI Pro Now <ArrowUpRight size={20} strokeWidth={3} />
                </a>
              </div>
            </div>
          </DocSection>
        </div>

      </div>
    </div>
  );
};

export default DocsIntroduction;