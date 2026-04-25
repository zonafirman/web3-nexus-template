"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Zap, Blocks } from 'lucide-react';

const featuresData = [
  {
    icon: <Fingerprint size={24} className="text-cyan-500" />,
    title: "Account Abstraction",
    description: "Built-in UI for email, social, and passkey logins. Bridge Web2 users to Web3 seamlessly without seed phrases.",
    colSpan: "md:col-span-2", // Kartu ini akan lebih lebar
  },
  {
    icon: <Zap size={24} className="text-cyan-500" />,
    title: "Turbocharged",
    description: "Scoring 99+ on Lighthouse. Built on Next.js 15 App Router & Tailwind v4.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <Blocks size={24} className="text-cyan-500" />,
    title: "Viem & Wagmi Ready",
    description: "Pre-configured hook structures for smart contract interactions. Just plug in your logic and go.",
    colSpan: "md:col-span-3", // Kartu ini akan mengambil lebar penuh di bawah
  }
];

const Features = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything you need to <span className="text-cyan-500">Scale</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl">
            We stripped away the bloatware and kept only the high-performance necessities for modern dApp development.
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:border-cyan-500/50 transition-colors ${feature.colSpan}`}
            >
              {/* Hover Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;