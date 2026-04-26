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
      {/* ... (Sisa kode Portfolio Chart dengan SVG Animasi) ... */}
    </div>
  );
};
export default PortfolioChart;`;

export default function ChartDocs() {
  return (
    <div className="pt-10 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Portfolio Chart
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          Grafik performa portofolio yang dibangun 100% menggunakan SVG murni dan Framer Motion. Mengapa? Agar aplikasi Web3 Anda terbebas dari <i>library</i> grafik eksternal yang berat seperti Chart.js.
        </p>
      </div>

      <hr className="border-white/5 mb-16" />

      <ComponentPreview 
        title="SVG Animated Chart"
        description="Klik pada pilihan waktu (1D, 1W, 1M, All) untuk melihat bagaimana garis grafik dirender ulang dengan animasi yang sangat mulus."
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