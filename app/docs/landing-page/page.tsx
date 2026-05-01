"use client";

import React from 'react';
import ComponentPreview from '../ComponentPreview';

// --- IMPORT ORIGINAL COMPONENTS ---
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Integration from '@/components/home/Integration';
import Pricing from '@/components/home/Pricing';
import Footer from '@/components/layout/Footer';

// ==========================================
// 1. PREVIEW CONFIGURATION & STATIC DATA
// ==========================================
const LANDING_PAGE_COMPONENTS = [
  {
    title: "Hero Section (The Hook)",
    description: "The main gateway of the website, featuring a code-typing effect and 3D interaction on the IDE mockup.",
    wrapperClass: "w-full scale-[0.6] sm:scale-75 origin-top border border-white/5 rounded-3xl overflow-hidden h-125",
    component: <Hero />,
    code: `// Copy the Hero.tsx code from the original repository...`
  },
  {
    title: "Bento Grid Features",
    description: "A modern layout for showcasing features, complete with Spotlight and 3D Tilt effects.",
    wrapperClass: "w-full scale-50 origin-top -mb-75 border border-white/5 rounded-3xl overflow-hidden",
    component: <Features />,
    code: `// Copy the Features.tsx code from the original repository...`
  },
  {
    title: "Terminal Integration",
    description: "A CLI installation simulation featuring a smooth progress bar animation.",
    wrapperClass: "w-full scale-90 origin-top border border-white/5 rounded-3xl overflow-hidden p-4 bg-zinc-950",
    component: <Integration />,
    code: `// Copy the Integration.tsx code from the original repository...`
  },
  {
    title: "Comparison & Pricing",
    description: "A monetization strategy section with a head-on feature comparison table.",
    wrapperClass: "w-full scale-50 origin-top -mb-100 border border-white/5 rounded-3xl overflow-hidden bg-zinc-950",
    component: <Pricing />,
    code: `// Copy the Pricing.tsx code from the original repository...`
  },
  {
    title: "Magnetic Footer",
    description: "A premium page footer that includes an engaging magnetic button interaction.",
    wrapperClass: "w-full scale-75 origin-top border border-white/5 rounded-3xl overflow-hidden bg-zinc-950",
    component: <Footer />,
    code: `// Copy the Footer.tsx code from the original repository...`
  }
];

// ==========================================
// 2. MAIN COMPONENT
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
          All the core visual elements that build the Nexus UI identity. These components are designed for high conversion and peak performance.
        </p>
      </div>

      <hr className="border-white/5 mb-20" />

      {/* DYNAMICALLY RENDER COMPONENT LIST */}
      {LANDING_PAGE_COMPONENTS.map((item) => (
        <ComponentPreview 
          key={item.title}
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