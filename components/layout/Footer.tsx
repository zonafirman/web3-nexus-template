"use client";

import React from 'react';
import { ArrowRight, MessageCircle, Code, Disc } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative pt-32 pb-10 overflow-hidden border-t border-white/5 bg-zinc-950 z-10">
      {/* Background Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-75 bg-cyan-500/10 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          
          {/* Left: Massive Typography & Waitlist */}
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              Ready to <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Deploy?</span>
            </h2>
            <div className="flex items-center gap-2 max-w-md p-1.5 bg-zinc-900 border border-white/10 rounded-2xl">
              <input 
                type="email" 
                placeholder="Enter your email for updates..." 
                className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder-zinc-500 text-sm"
              />
              <button className="p-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 rounded-xl transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right: Minimalist Links */}
          <div className="w-full md:w-auto grid grid-cols-2 gap-12 text-sm">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white mb-2">Product</h4>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">Components</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">Documentation</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">Pricing</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white mb-2">Legal</h4>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">License</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-zinc-950 rounded-sm rotate-45"></div>
            </div>
            <span className="text-zinc-400 font-medium text-sm">© 2026 Nexus UI. Crafted by Zona.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:bg-white/10 hover:text-white transition-all">
              <MessageCircle size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:bg-white/10 hover:text-white transition-all">
              <Code size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:bg-white/10 hover:text-white transition-all">
              <Disc size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;