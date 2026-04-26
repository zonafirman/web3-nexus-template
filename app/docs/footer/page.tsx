"use client";

import React from 'react';
import ComponentPreview from '../ComponentPreview';
import Footer from '@/components/layout/Footer';

const codeString = `"use client";
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Magnetic Button Component
const MagneticButton = ({ children }) => {
  // ... (Logika framer-motion untuk tarikan mouse) ...
}

const Footer = () => {
  // ... (Logika form Waitlist dan layout Grid) ...
  return (
    <footer className="relative pt-40 pb-10 overflow-hidden bg-[#050505] z-10 border-t border-white/5 mt-20">
      {/* ... (Konten Footer) ... */}
    </footer>
  );
};
export default Footer;`;

export default function FooterDocs() {
  return (
    <div className="pt-10 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Footer (Magnetic)
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          Penutup halaman yang memberikan kesan premium. Menggunakan interaksi <b>Magnetic Button</b> yang menempel pada kursor mouse, dan dilengkapi efek latar belakang <i>blueprint grid</i>.
        </p>
      </div>

      <hr className="border-white/5 mb-16" />

      <ComponentPreview 
        title="Footer Component"
        description="Arahkan kursor Anda ke tombol panah (->) di kolom email untuk melihat efek magnetiknya."
        preview={
          <div className="w-full scale-75 origin-top border border-white/5 rounded-3xl overflow-hidden bg-zinc-950">
            <Footer />
          </div>
        }
        code={codeString}
      />
    </div>
  );
}