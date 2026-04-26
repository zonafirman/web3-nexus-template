"use client";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { motion, useScroll, useSpring } from "framer-motion";
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Hook Framer Motion untuk membaca posisi scroll
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-zinc-950 text-zinc-200 antialiased min-h-screen selection:bg-cyan-500/30">
        
        {/* Scroll Progress Bar (Global) */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 z-[100] origin-left"
          style={{ scaleX }}
        />

        <Navbar />
        <main>{children}</main>
        <Toaster position="bottom-right" richColors theme="dark" />
      </body>
    </html>
  );
}