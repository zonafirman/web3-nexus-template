"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

// Data fiktif untuk grafik
const chartData = [
  { day: 'Mon', value: 40, label: '$12,400' },
  { day: 'Tue', value: 30, label: '$9,300' },
  { day: 'Wed', value: 70, label: '$21,700' },
  { day: 'Thu', value: 45, label: '$13,950' },
  { day: 'Fri', value: 90, label: '$27,900' },
  { day: 'Sat', value: 65, label: '$20,150' },
  { day: 'Sun', value: 85, label: '$26,350' },
];

const PortfolioChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-md relative overflow-hidden group">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-cyan-500/5 blur-[80px] -z-10"></div>

      <div className="flex justify-between items-center mb-10 relative z-10">
        <div>
          <h3 className="font-bold text-xl text-white flex items-center gap-2">
            Performance <Activity size={18} className="text-cyan-500" />
          </h3>
          <p className="text-sm text-zinc-500 mt-1">Past 7 days volume</p>
        </div>
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-zinc-400">
          ETH / USD
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-48 w-full flex items-end justify-between gap-2 z-10">
        
        {/* Horizontal Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="w-full h-px bg-zinc-500 border-dashed"></div>
          <div className="w-full h-px bg-zinc-500 border-dashed"></div>
          <div className="w-full h-px bg-zinc-500 border-dashed"></div>
        </div>

        {/* Bars */}
        {chartData.map((item, index) => (
          <div 
            key={index} 
            className="relative flex-1 flex flex-col items-center group/bar"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip Hover */}
            {hoveredIndex === index && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 bg-zinc-800 text-white text-xs font-bold py-1 px-2 rounded-md shadow-xl border border-white/10 z-20 whitespace-nowrap"
              >
                {item.label}
              </motion.div>
            )}

            {/* The Bar */}
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${item.value}%` }}
              transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
              className={`w-full max-w-[3rem] rounded-t-xl transition-colors duration-300 relative overflow-hidden ${
                hoveredIndex === index || hoveredIndex === null 
                  ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                  : 'bg-zinc-700 opacity-50'
              }`}
            >
              {/* Inner Gradient for 3D effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
            </motion.div>
            
            {/* X-Axis Label */}
            <span className="mt-4 text-xs font-medium text-zinc-500 group-hover/bar:text-cyan-400 transition-colors">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioChart;