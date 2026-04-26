"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Globe, Cpu } from 'lucide-react';

const stats = [
  { label: "Bundle Size", value: "42kb", icon: Cpu, color: "text-cyan-400" },
  { label: "Lighthouse Score", value: "100", icon: Zap, color: "text-yellow-400" },
  { label: "Networks Ready", value: "24+", icon: Globe, color: "text-blue-400" },
  { label: "Security Audited", value: "Safe", icon: ShieldCheck, color: "text-emerald-400" },
];

const Stats = () => {
  return (
    <section className="relative py-12 border-y border-white/5 bg-zinc-950/50 backdrop-blur-sm z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start text-center md:text-left group"
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon size={18} className={`${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                  {stat.value}
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;