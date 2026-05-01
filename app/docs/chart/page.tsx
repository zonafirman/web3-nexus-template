"use client";

import React from 'react';
import ComponentPreview from '../ComponentPreview';
import PortfolioChart from '../../dashboard/PortfolioChart';

const codeString = `"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const timeframes = ['1D', '1W', '1M', 'All'];

const PortfolioChart = () => {
  const [activeTf, setActiveTf] = useState('1W');
  const graphPath = "M 0 100 Q 50 80, 100 90 T 200 60 T 300 40 T 400 10";

  return (
    <div className="p-6 md:p-8 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-xl h-full flex flex-col relative overflow-hidden">
      {/* ... (Rest of the Portfolio Chart code with SVG Animation) ... */}
    </div>
  );
};
export default PortfolioChart;`;

export default function ChartDocs() {
  return (
    <div className="pt-10 pb-20">
      
      {/* Header Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Portfolio Chart
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          A portfolio performance chart built 100% using pure SVG and Framer Motion. Why? To keep your Web3 application free from heavy external charting libraries like Chart.js.
        </p>
      </header>

      <hr className="border-white/5 mb-16" />

      <ComponentPreview 
        title="SVG Animated Chart"
        description="Click on the timeframes (1D, 1W, 1M, All) to see how the graph line is re-rendered with buttery smooth animations."
        preview={
          <div className="w-full max-w-2xl h-[340px]">
            <PortfolioChart />
          </div>
        }
        code={codeString}
      />
    </div>
  );
}