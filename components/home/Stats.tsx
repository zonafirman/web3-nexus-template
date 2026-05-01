"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Globe, Cpu } from 'lucide-react';

// --- IMPORT DARI PUSAT ANIMASI GLOBAL ---
import { fadeUpItem } from '@/lib/animations';

// ==========================================
// 1. DATA STATIS & KONFIGURASI
// ==========================================
const STATS_DATA = [
  { label: "Bundle Size", value: "42kb", icon: Cpu, color: "text-cyan-400" },
  { label: "Lighthouse Score", value: "100", icon: Zap, color: "text-yellow-400" },
  { label: "Networks Ready", value: "24+", icon: Globe, color: "text-blue-400" },
  { label: "Security Audited", value: "Safe", icon: ShieldCheck, color: "text-emerald-400" },
];

// ==========================================
// 2. KOMPONEN UTAMA
// ==========================================
const Stats = () => {
  // Ekstraksi Kelas Tailwind agar JSX tetap bersih
  const containerClass = "relative py-12 border-y border-white/5 bg-zinc-950/50 backdrop-blur-sm z-10";
  const gridClass = "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12";
  const itemClass = "flex flex-col items-center md:items-start text-center md:text-left group";

  return (
    <section className={containerClass}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={gridClass}>
          {STATS_DATA.map((stat, i) => {
            const Icon = stat.icon;

            return (
              <motion.div 
                key={stat.label}
                variants={fadeUpItem}
                custom={i * 0.1} // Mengirimkan index untuk kalkulasi delay otomatis
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={itemClass}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon size={18} className={`${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                  <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;