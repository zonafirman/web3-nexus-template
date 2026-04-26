"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Package, FileText, Play, ArrowRight, Copy, CheckCircle2, DownloadCloud } from 'lucide-react';
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

// --- Helper: Step Indicator ---
const StepIndicator = ({ number, title, icon: Icon, children }: { number: number, title: string, icon: React.ElementType, children: React.ReactNode }) => (
  <div className="relative pl-10 md:pl-16 pb-12 border-l border-white/10 last:border-transparent last:pb-0">
    <div className="absolute top-0 left-0 -translate-x-1/2 w-10 h-10 rounded-full bg-zinc-950 border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 font-black text-lg shadow-[0_0_15px_rgba(6,182,212,0.3)]">
      {number}
    </div>
    <div className="flex items-center gap-3 mb-4 mt-1">
      <div className="p-2 rounded-lg bg-white/5 text-zinc-400">
        <Icon size={20} />
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>
    <div className="text-zinc-400 text-sm md:text-base leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

export default function InstallationDocs() {
  const [activeTab, setActiveTab] = useState<'npm' | 'yarn' | 'pnpm' | 'bun'>('npm');

  const installCommands = {
    npm: "npm install",
    yarn: "yarn install",
    pnpm: "pnpm install",
    bun: "bun install"
  };

  const runCommands = {
    npm: "npm run dev",
    yarn: "yarn dev",
    pnpm: "pnpm dev",
    bun: "bun dev"
  };

  return (
    <div className="pt-10 pb-20">
      <div className="max-w-4xl relative z-10">
        
        {/* Header Docs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Installation
          </h1>
          <p className="text-lg text-zinc-400 font-medium max-w-2xl leading-relaxed">
            Panduan lengkap untuk menginstal dan menjalankan Nexus UI di mesin lokal Anda. Mulai proyek Web3 Anda dengan fondasi yang kokoh.
          </p>
        </motion.div>

        {/* System Requirements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20"
        >
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <Terminal size={18} className="text-blue-400" /> System Requirements
          </h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Node.js versi 18.17 atau lebih baru.</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Git terinstal di komputer Anda.</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Ekstensi Wallet Web3 (MetaMask/Rabby) di browser untuk testing.</li>
          </ul>
        </motion.div>

        {/* Setup Steps */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="ml-4 md:ml-8"
        >
          {/* STEP 1 */}
          <StepIndicator number={1} title="Clone the Repository" icon={DownloadCloud}>
            <p>
              Cara tercepat untuk memulai adalah menggunakan <code>create-next-app</code> dengan menargetkan repositori template Nexus UI. Buka terminal Anda dan jalankan perintah berikut:
            </p>
            <CodeBlock 
              title="Terminal"
              code={`npx create-next-app -e https://github.com/zonafirman/web3-nexus-template my-dapp\ncd my-dapp`} 
            />
            <p className="text-xs text-zinc-500">Perintah ini akan mengunduh template dan membuat folder baru bernama <code>my-dapp</code>.</p>
          </StepIndicator>

          {/* STEP 2 */}
          <StepIndicator number={2} title="Install Dependencies" icon={Package}>
            <p>Pilih <em>package manager</em> favorit Anda untuk menginstal dependensi yang dibutuhkan (seperti Framer Motion, Lucide, Zustand, dan Viem).</p>
            
            {/* Tabs for Package Managers */}
            <div className="mt-4">
              <div className="flex gap-2 mb-2">
                {(['npm', 'yarn', 'pnpm', 'bun'] as const).map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setActiveTab(pm)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === pm 
                        ? 'bg-zinc-800 text-cyan-400 border border-white/10' 
                        : 'bg-white/5 text-zinc-500 hover:text-white'
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  <CodeBlock title="Terminal" code={installCommands[activeTab]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </StepIndicator>

          {/* STEP 3 */}
          <StepIndicator number={3} title="Environment Variables" icon={FileText}>
            <p>
              Karena ini adalah aplikasi Web3, Anda memerlukan ID Proyek untuk WalletConnect atau RPC Keys (misal: Alchemy/Infura). 
              Salin file <code>.env.example</code> menjadi <code>.env.local</code>.
            </p>
            <CodeBlock 
              title="Terminal"
              code={`cp .env.example .env.local`} 
            />
            <p className="mt-4">Buka <code>.env.local</code> dan isi variabel berikut:</p>
            <CodeBlock 
              title=".env.local"
              code={`NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your_project_id_here"\nNEXT_PUBLIC_ALCHEMY_API_KEY="your_alchemy_key_here"`} 
            />
            <p className="text-xs p-3 bg-yellow-500/10 text-yellow-500 rounded-xl border border-yellow-500/20">
              <strong>Penting:</strong> Jangan pernah mengunggah file <code>.env.local</code> ke GitHub (file ini sudah diabaikan dalam .gitignore).
            </p>
          </StepIndicator>

          {/* STEP 4 */}
          <StepIndicator number={4} title="Run Development Server" icon={Play}>
            <p>Anda sudah siap! Jalankan server pengembangan lokal untuk melihat hasil akhirnya.</p>
            <CodeBlock 
              title="Terminal"
              code={runCommands[activeTab]} 
            />
            <p>
              Buka <a href="http://localhost:3000" className="text-cyan-400 hover:underline">http://localhost:3000</a> di browser Anda untuk melihat hasilnya. Anda bisa mulai mengedit <code>app/page.tsx</code> dan melihat pembaruan secara instan.
            </p>
          </StepIndicator>

        </motion.div>

        {/* Bottom Navigation */}
        <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link 
            href="/docs" 
            className="group flex flex-col gap-1 text-zinc-500 hover:text-white transition-colors"
          >
            <span className="text-xs uppercase tracking-wider font-bold">Previous</span>
            <span className="flex items-center gap-2 font-medium">
              <ArrowRight size={16} className="rotate-180" /> Introduction
            </span>
          </Link>
          
          <Link 
            href="/docs/config" 
            className="group flex flex-col items-end gap-1 text-cyan-500 hover:text-cyan-400 transition-colors text-right"
          >
            <span className="text-xs uppercase tracking-wider font-bold text-zinc-500">Next Step</span>
            <span className="flex items-center gap-2 font-medium">
              Configuration <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}