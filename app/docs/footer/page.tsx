"use client";

import React from 'react';
import ComponentPreview from '../ComponentPreview';
import Footer from '@/components/layout/Footer';

// ==========================================
// 1. STATIC DATA & SOURCE CODE
// ==========================================
const FOOTER_CODE_SNIPPET = `"use client";
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Magnetic Button Component
const MagneticButton = ({ children }) => {
  // ... (Framer-motion logic for mouse pull effect) ...
}

const Footer = () => {
  // ... (Waitlist form logic and Grid layout) ...
  return (
    <footer className="relative pt-40 pb-10 overflow-hidden bg-[#050505] z-10 border-t border-white/5 mt-20">
      {/* ... (Footer Content) ... */}
    </footer>
  );
};

export default Footer;`;

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
export default function FooterDocs() {
  return (
    <div className="pt-10 pb-20">

      {/* HEADER SECTION */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Footer (Magnetic)
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          A page footer that delivers a premium feel. It features a <b>Magnetic Button</b> interaction that snaps to the mouse cursor, complete with a <i>blueprint grid</i> background effect.
        </p>
      </div>

      <hr className="border-white/5 mb-16" />

      {/* COMPONENT PREVIEW */}
      <ComponentPreview 
        title="Footer Component"
        description="Hover your cursor over the arrow button (->) in the email input to see the magnetic effect in action."
        preview={
          <div className="w-full scale-75 origin-top border border-white/5 rounded-3xl overflow-hidden bg-zinc-950">
            <Footer />
          </div>
        }
        code={FOOTER_CODE_SNIPPET}
      />

    </div>
  );
}