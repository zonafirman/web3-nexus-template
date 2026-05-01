"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Configuration for the chart
const timeframes = ['1D', '1W', '1M', 'All'];

// Mock data for different timeframes to make the chart interactive
const GRAPH_DATA = {
  '1D': { path: "M 0 80 Q 50 60, 100 70 T 200 50 T 300 60 T 400 40", endPoint: [400, 40] },
  '1W': { path: "M 0 100 Q 50 80, 100 90 T 200 60 T 300 40 T 400 10", endPoint: [400, 10] },
  '1M': { path: "M 0 40 Q 50 90, 100 60 T 200 100 T 300 50 T 400 80", endPoint: [400, 80] },
  'All': { path: "M 0 110 Q 50 20, 100 70 T 200 30 T 300 90 T 400 50", endPoint: [400, 50] },
};

const PortfolioChart = () => {
  const [activeTf, setActiveTf] = useState('1W');

  // Memoize the current graph data to prevent unnecessary lookups
  const currentGraph = useMemo(() => GRAPH_DATA[activeTf as keyof typeof GRAPH_DATA], [activeTf]);

  return (
    <div className="p-6 md:p-8 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-xl h-full flex flex-col relative overflow-hidden group">
      
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-white">Performance</h3>
          <p className="text-xs text-zinc-500 mt-1">Portfolio growth over time</p>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-white/5">
          {timeframes.map((tf) => (
            <button 
              key={tf}
              onClick={() => setActiveTf(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTf === tf 
                  ? 'bg-zinc-800 text-white shadow-md' 
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Animated Chart Area */}
      <div className="flex-1 relative mt-4">
        {/* Horizontal Grid Lines (Background) */}
        <div className="absolute inset-0 flex flex-col justify-between pt-4 pb-2 z-0">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-px bg-white/5 border-dashed"></div>
          ))}
        </div>

        {/* Main SVG Graph */}
        <div className="absolute inset-0 z-10">
          <svg 
            viewBox="0 0 400 120" 
            preserveAspectRatio="none" 
            className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            {/* Animated Line (Path) */}
            <motion.path
              key={activeTf} // The key prop re-triggers the animation when the timeframe changes
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              d={currentGraph.path}
              fill="none"
              stroke="#06b6d4" // Cyan-500 color
              strokeWidth="4"
              strokeLinecap="round"
            />
            
            {/* Endpoint (Blinking Dot) */}
            <motion.circle
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              cx={currentGraph.endPoint[0]}
              cy={currentGraph.endPoint[1]}
              r="6"
              fill="#09090b"
              stroke="#06b6d4"
              strokeWidth="3"
            />
          </svg>
        </div>
        
        {/* Time labels below the chart */}
        <div className="absolute -bottom-2 left-0 right-0 flex justify-between text-[10px] font-mono text-zinc-600">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart;