"use client";

import React from 'react';
import ComponentPreview from '@/components/docs/ComponentPreview';

// --- IMPORT KOMPONEN ASLI ---
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Integration from '@/components/home/Integration';
import Pricing from '@/components/home/Pricing';
import Footer from '@/components/layout/Footer';

// ==========================================
// 1. DATA STATIS KONFIGURASI PREVIEW
// ==========================================
const DOCS_DATA = [
  {
    title: "Hero Section (The Hook)",
    description: "Pintu gerbang utama website dengan efek pengetikan kode dan interaksi 3D pada mockup IDE.",
    wrapperClass: "w-full scale-[0.6] sm:scale-75 origin-top border border-white/5 rounded-3xl overflow-hidden h-125",
    component: <Hero />,
    code: `// Salin kode Hero.tsx dari repositori asli...`
  },
  {
    title: "Bento Grid Features",
    description: "Layout modern untuk memamerkan fitur dengan efek Spotlight dan Tilt 3D.",
    wrapperClass: "w-full scale-50 origin-top -mb-75 border border-white/5 rounded-3xl overflow-hidden",
    component: <Features />,
    code: `// Salin kode Features.tsx dari repositori asli...`
  },
  {
    title: "Terminal Integration",
    description: "Simulasi instalasi CLI dengan animasi progress bar.",
    wrapperClass: "w-full scale-90 origin-top border border-white/5 rounded-3xl overflow-hidden p-4 bg-zinc-950",
    component: <Integration />,
    code: `// Salin kode Integration.tsx dari repositori asli...`
  },
  {
    title: "Comparison & Pricing",
    description: "Strategi monetisasi dengan perbandingan fitur frontal.",
    wrapperClass: "w-full scale-50 origin-top -mb-100 border border-white/5 rounded-3xl overflow-hidden bg-zinc-950",
    component: <Pricing />,
    code: `// Salin kode Pricing.tsx dari repositori asli...`
  },
  {
    title: "Magnetic Footer",
    description: "Penutup halaman dengan interaksi tombol magnetik.",
    wrapperClass: "w-full scale-75 origin-top border border-white/5 rounded-3xl overflow-hidden bg-zinc-950",
    component: <Footer />,
    code: `// Salin kode Footer.tsx dari repositori asli...`
  }
];

// ==========================================
// 2. KOMPONEN UTAMA
// ==========================================
export default function LandingPageComponentsDocs() {
  return (
    <div className="pt-10 pb-20">
      
      {/* HEADER SECTION */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
          Landing Page
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          Semua elemen visual utama yang membangun identitas Nexus UI. Komponen ini dirancang untuk konversi tinggi dan performa maksimal di tahun 2026.
        </p>
      </div>

      <hr className="border-white/5 mb-20" />

      {/* RENDER LIST KOMPONEN SECARA DINAMIS */}
      {DOCS_DATA.map((item, index) => (
        <ComponentPreview 
          key={index}
          title={item.title}
          description={item.description}
          preview={
            <div className={item.wrapperClass}>
              {item.component}
            </div>
          }
          code={item.code}
        />
      ))}

    </div>
  );
}