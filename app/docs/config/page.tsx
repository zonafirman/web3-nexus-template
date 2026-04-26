"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Palette, Globe, Database, ArrowRight, CheckCircle2, Copy, FileCode2 } from 'lucide-react';
import Link from 'next/link';

// --- Helper: Block Kode Copy-Paste ---
const CodeBlock = ({ code, title, language = 'tsx' }: { code: string, title?: string, language?: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden my-6 group shadow-2xl">
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#010409]/80 border-b border-white/5 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
             <span className="ml-2 flex items-center gap-1.5 text-zinc-300">
               {language === 'css' ? <Palette size={12} className="text-pink-400"/> : <FileCode2 size={12} className="text-blue-400"/>}
               {title}
             </span>
          </div>
        </div>
      )}
      <button 
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
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

// --- Helper: Section Layout ---
const ConfigSection = ({ title, description, icon: Icon, children }: { title: string, description: string, icon: React.ElementType, children: React.ReactNode }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    className="mb-20"
  >
    <div className="flex items-start gap-4 mb-6">
      <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] mt-1">
        <Icon size={24} />
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{title}</h2>
        <p className="text-zinc-400 mt-2 text-sm md:text-base leading-relaxed max-w-2xl">{description}</p>
      </div>
    </div>
    <div className="pl-0 md:pl-16">
      {children}
    </div>
  </motion.section>
);

export default function ConfigurationDocs() {
  return (
    <div className="pt-10 pb-20">
      <div className="max-w-4xl relative z-10">
        
        {/* Header Docs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-white/10 pb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 mb-6 uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <Settings size={14} /> System Setup
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">
            Configuration
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-2xl leading-relaxed">
            Sesuaikan Nexus UI agar selaras dengan identitas proyek Anda. Atur tema warna, metadata SEO, dan koneksi Web3 Provider dalam beberapa menit.
          </p>
        </motion.div>

        {/* 1. Theming (Tailwind v4) */}
        <ConfigSection 
          title="1. Theming & Colors (Tailwind v4)" 
          description="Nexus UI dibangun di atas sistem Tailwind CSS v4 terbaru. Anda tidak perlu lagi file tailwind.config.js yang rumit. Cukup ubah variabel CSS global."
          icon={Palette}
        >
          <p className="text-zinc-300 text-sm mb-4">Buka file <code>app/globals.css</code> dan cari blok direktif <code>@theme</code>. Ubah warna utama sesuai *brand* Anda.</p>
          
          <CodeBlock 
            title="app/globals.css"
            language="css"
            code={`@import "tailwindcss";

@theme {
  /* Ubah font default di sini (Jika Anda tidak memakai Geist) */
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace;

  /* Ubah warna Cyan menjadi warna brand Anda (misal: ungu/violet) */
  --color-primary: #8b5cf6; 
  --color-primary-glow: rgba(139, 92, 246, 0.4);
  
  /* Latar belakang UI Glassmorphism */
  --color-glass-bg: rgba(255, 255, 255, 0.05);
  --color-glass-border: rgba(255, 255, 255, 0.1);
}

/* Sisa pengaturan styling ... */`} 
          />
          <div className="p-4 mt-6 rounded-xl bg-zinc-900/80 border border-white/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-violet-500 shadow-[0_0_15px_#8b5cf6]"></div>
            <p className="text-sm text-zinc-400">Dengan mengubah <code>--color-primary</code>, seluruh tombol, glow, dan interaksi yang tadinya berwarna Sian (Cyan) akan langsung berubah secara otomatis di seluruh aplikasi.</p>
          </div>
        </ConfigSection>

        {/* 2. Web3 Provider Setup */}
        <ConfigSection 
          title="2. Web3 Provider (Wagmi/Viem)" 
          description="Nexus UI Pro disiapkan untuk integrasi mulus dengan Wagmi dan Viem. Atur rantai (chains) yang didukung oleh dApp Anda."
          icon={Globe}
        >
          <p className="text-zinc-300 text-sm mb-4">Konfigurasi jaringan *blockchain* dilakukan di dalam file *provider* utama.</p>
          
          <CodeBlock 
            title="config/web3.ts"
            language="tsx"
            code={`import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { mainnet, arbitrum, optimism, polygon } from 'wagmi/chains';

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
  name: 'Nexus UI dApp',
  description: 'Web3 interface powered by Nexus',
  url: 'https://nexus-ui.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Tambah atau kurangi chain di array 'chains' bawah ini
const chains = [mainnet, arbitrum, optimism, polygon] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true, // Wajib diaktifkan untuk Next.js 15 App Router
});`} 
          />
        </ConfigSection>

        {/* 3. Global State (Zustand) */}
        <ConfigSection 
          title="3. Global State (Zustand)" 
          description="Store Zustand kami mengelola status UI seperti Sidebar, Tema, dan Data Mockup. Sesuaikan nilai default di sini."
          icon={Database}
        >
          <CodeBlock 
            title="store/useWeb3Store.ts"
            language="tsx"
            code={`import { create } from 'zustand';

interface Web3State {
  isConnected: boolean;
  address: string | null;
  balance: string;
  connect: (addr: string) => void;
  disconnect: () => void;
}

export const useWeb3Store = create<Web3State>((set) => ({
  isConnected: false, // Set ke true jika Anda ingin testing state UI terkoneksi
  address: null,
  balance: '10.50 ETH', // Mock balance awal
  connect: (addr) => set({ isConnected: true, address: addr }),
  disconnect: () => set({ isConnected: false, address: null }),
}));`} 
          />
        </ConfigSection>

        {/* Bottom Navigation */}
        <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link 
            href="/docs/installation" 
            className="group flex flex-col gap-1 text-zinc-500 hover:text-white transition-colors"
          >
            <span className="text-xs uppercase tracking-wider font-bold">Previous</span>
            <span className="flex items-center gap-2 font-medium">
              <ArrowRight size={16} className="rotate-180" /> Installation
            </span>
          </Link>
          
          <Link 
            href="/docs/landing-page" 
            className="group flex flex-col items-end gap-1 text-cyan-500 hover:text-cyan-400 transition-colors text-right"
          >
            <span className="text-xs uppercase tracking-wider font-bold text-zinc-500">Next Step</span>
            <span className="flex items-center gap-2 font-medium">
              Landing Page Blocks <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}