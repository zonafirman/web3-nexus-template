"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Palette, LayoutDashboard, Copy, CheckCircle2, Zap, Component, Lock, FileCode2, ArrowUpRight } from 'lucide-react';
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
    <div className="relative rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden my-4 group">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 text-xs text-zinc-400 font-mono">
          <span>{title}</span>
        </div>
      )}
      <button 
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="Copy code"
      >
        {isCopied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
      </button>
      <pre className="p-5 overflow-x-auto text-sm font-mono text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// --- Helper: Section Dokumentasi ---
const DocSection = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
  <section className="mb-20">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
    </div>
    <div className="space-y-4 text-zinc-400 leading-relaxed">
      {children}
    </div>
  </section>
);

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-6 selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Docs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-white/10 pb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            v2.0 Architecture
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">Nexus Library</h1>
          <p className="text-xl text-zinc-500 font-medium">The complete manual for building next-generation Web3 interfaces.</p>
          
          <div className="mt-8 flex gap-4">
            <Link href="/dashboard" className="px-6 py-3 bg-cyan-500 text-zinc-950 font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              View Live Dashboard
            </Link>
          </div>
        </motion.div>

        {/* 1. Quick Start */}
        <DocSection title="Quick Start" icon={Terminal}>
          <p>Kloning repositori dan jalankan dalam waktu kurang dari 60 detik.</p>
          <CodeBlock 
            title="terminal"
            code={`npx create-next-app -e https://github.com/zonafirman/web3-nexus-template my-dapp\ncd my-dapp\nnpm install\nnpm run dev`} 
          />
        </DocSection>

        {/* 2. Dashboard Architecture (NEW) */}
        <DocSection title="Dashboard Architecture" icon={LayoutDashboard}>
          <p>Nexus UI Lite kini dilengkapi dengan struktur UI Dashboard tingkat produksi. Kami menggunakan fitur <strong>Nested Layouts</strong> dari Next.js 15 App Router untuk memastikan Sidebar tidak ter-render ulang saat Anda berpindah halaman.</p>
          <CodeBlock 
            title="app/dashboard/layout.tsx"
            code={`import DashboardSidebar from "@/components/layout/DashboardSidebar";\n\nexport default function DashboardLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <div className="flex min-h-screen bg-zinc-950 text-white">\n      <DashboardSidebar />\n      <main className="flex-1 p-8 h-screen overflow-y-auto">\n        {children}\n      </main>\n    </div>\n  );\n}`} 
          />
          <p className="mt-4">Struktur ini memberikan pengalaman navigasi SPA (*Single Page Application*) murni tanpa *loading* halaman putih.</p>
        </DocSection>

        {/* 3. Theming & Colors */}
        <DocSection title="Theming Engine" icon={Palette}>
          <p>Kami memanfaatkan Tailwind CSS v4. Ubah tema global dengan mengedit variabel CSS. Komponen Glassmorphism kami akan secara otomatis menyesuaikan warna pantulan cahayanya.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="p-5 rounded-2xl bg-[#09090b] border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div> 
                <span className="font-bold text-white text-sm">Neon Cyan (Active)</span>
              </div>
              <CodeBlock code={`@theme {\n  --color-primary: #06b6d4;\n  --color-bg: #09090b;\n}`} />
            </div>
            <div className="p-5 rounded-2xl bg-[#052e16] border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div> 
                <span className="font-bold text-white text-sm">Matrix Emerald</span>
              </div>
              <CodeBlock code={`@theme {\n  --color-primary: #10b981;\n  --color-bg: #052e16;\n}`} />
            </div>
          </div>
        </DocSection>

        {/* 4. Component Blocks */}
        <DocSection title="Core Components" icon={Component}>
          <p className="mb-6">Cukup salin komponen di bawah ini ke dalam proyek Anda. Pastikan Anda telah menginstal <code>framer-motion</code> dan <code>lucide-react</code>.</p>

          {/* Sub-component: Buttons */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
              <FileCode2 size={20} className="text-cyan-500" /> Buttons
            </h3>
            <div className="flex flex-wrap gap-4 mb-4 p-8 rounded-2xl bg-zinc-900/50 border border-white/5 items-center justify-center backdrop-blur-sm">
               <button className="px-6 py-2.5 bg-cyan-500 text-zinc-950 font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 transition-all">Primary Action</button>
               <button className="px-6 py-2.5 bg-zinc-900 text-white font-bold rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-white/5 transition-all">Secondary Glass</button>
            </div>
            <CodeBlock 
              title="components/ui/Buttons.tsx"
              code={`// Primary Action Button\n<button className="px-6 py-2.5 bg-cyan-500 text-zinc-950 font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95">\n  Primary Action\n</button>\n\n// Secondary Glass Button\n<button className="px-6 py-2.5 bg-zinc-900 text-white font-bold rounded-xl border border-white/10 transition-all hover:border-cyan-500/50 hover:bg-white/5">\n  Secondary Glass\n</button>`} 
            />
          </div>

          {/* Sub-component: Dashboard Sidebar */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
              <LayoutDashboard size={20} className="text-cyan-500" /> Sidebar Link Item
            </h3>
            <p className="text-sm mb-4">Gaya tombol navigasi untuk Sidebar Dashboard dengan status aktif (Active State).</p>
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm max-w-xs mb-4">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 transition-all">
                <LayoutDashboard size={20} />
                <span className="font-medium">Overview (Active)</span>
              </button>
            </div>
            <CodeBlock 
              title="components/layout/SidebarItem.tsx"
              code={`// Active Menu Item\n<button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 transition-all">\n  <LayoutDashboard size={20} />\n  <span className="font-medium">Overview</span>\n</button>\n\n// Inactive Menu Item\n<button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all">\n  <ArrowsLeftRight size={20} />\n  <span className="font-medium">Swap</span>\n</button>`} 
            />
          </div>
        </DocSection>

        {/* 5. The Ultimate Pro Upsell */}
        <DocSection title="Unlock The Backend Engine" icon={Lock}>
          <div className="p-8 rounded-3xl border border-white/5 bg-[#09090b] relative overflow-hidden group shadow-2xl">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-colors"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs font-bold text-yellow-500 mb-4">
                <Zap size={14} /> PRO DEVELOPER LICENSE
              </div>
              
              <h3 className="text-3xl font-black text-white mb-4">The UI is Free. <br/>The <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Logic</span> is Pro.</h3>
              
              <p className="text-zinc-400 mb-8 max-w-lg leading-relaxed text-sm">
                Versi Lite memberi Anda struktur visual yang luar biasa. Namun, jika Anda ingin menghemat ratusan jam menyambungkan UI ini ke Smart Contract, Anda membutuhkan <strong>Nexus UI Pro</strong>.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Zustand Global State Management', 
                  'Viem & Wagmi Pre-configured Hooks', 
                  'Working AI Intent Swap Engine', 
                  'Real-time Gas Fee Live Tracker', 
                  'Interactive Charting without Chart.js', 
                  'Premium Figma Source Files'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
                    <CheckCircle2 size={18} className="text-cyan-500 mt-0.5 flex-shrink-0" /> 
                    <span className="text-sm font-medium text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <a 
                href="https://yourstore.gumroad.com/l/nexus-ui-pro" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-950 font-black rounded-2xl hover:bg-zinc-200 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Get Nexus UI Pro Now <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </DocSection>

      </div>
    </div>
  );
};

export default DocsPage;