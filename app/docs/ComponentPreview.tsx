"use client";

import React, { useState } from 'react';
import { Check, Copy, Code2, Eye, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComponentPreviewProps {
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
}

const ComponentPreview = ({ title, description, preview, code }: ComponentPreviewProps) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="mb-16">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-zinc-950/50 backdrop-blur-md overflow-hidden shadow-2xl">
        {/* Header Tabs */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-zinc-900/50">
          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'preview' ? 'bg-zinc-800 text-cyan-400 shadow-md' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Eye size={14} /> Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'code' ? 'bg-zinc-800 text-cyan-400 shadow-md' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Code2 size={14} /> Code
            </button>
          </div>

          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            {isCopied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        {/* Content Area */}
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'preview' ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-8 md:p-12 min-h-[400px] flex items-center justify-center bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px]"
              >
                {preview}
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative bg-[#0d1117] min-h-[400px] max-h-[600px] overflow-y-auto"
              >
                {/* Mac OS Dots */}
                <div className="sticky top-0 bg-[#0d1117]/90 backdrop-blur-md px-4 py-3 border-b border-white/5 flex items-center gap-2 z-10">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  <span className="ml-2 text-xs font-mono text-zinc-500 flex items-center gap-2"><Terminal size={12}/> component.tsx</span>
                </div>
                <pre className="p-6 text-sm font-mono text-zinc-300">
                  <code>{code}</code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ComponentPreview;