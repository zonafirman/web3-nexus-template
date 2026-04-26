"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Layout, Blocks, Home, Compass } from 'lucide-react';

const sidebarItems = [
  {
    category: "Getting Started",
    icon: Terminal,
    links: [
      { name: "Introduction", href: "/docs" },
      { name: "Installation", href: "/docs/installation" },
      { name: "Configuration", href: "/docs/config" },
    ]
  },
  {
    category: "Marketing (Home)",
    icon: Home,
    links: [
      { name: "Landing Page Blocks", href: "/docs/landing-page" },
    ]
  },
  {
    category: "Dashboard UI",
    icon: Layout,
    links: [
      { name: "Balance Card", href: "/docs/balance-card" },
      { name: "Portfolio Chart", href: "/docs/chart" },
      { name: "Swap Interface", href: "/docs/swap" },
    ]
  },
  {
    category: "Global Layout",
    icon: Compass,
    links: [
      { name: "Navbar (Island)", href: "/docs/navbar" },
      { name: "Footer (Magnetic)", href: "/docs/footer" },
      { name: "Auth Modal", href: "/docs/auth-modal" },
    ]
  }
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex pt-24">
      {/* Sidebar Desktop */}
      <aside className="w-72 hidden lg:block border-r border-white/5 h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto pl-8 pr-6 pb-20 scroll-smooth">
        <div className="space-y-10">
          {sidebarItems.map((section, idx) => (
            <div key={idx}>
              <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-4 uppercase tracking-widest">
                <section.icon size={16} className="text-cyan-500" /> {section.category}
              </h4>
              <ul className="space-y-2 border-l border-white/10 ml-2 pl-4">
                {section.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className={`block py-1.5 text-sm transition-colors relative ${
                          isActive ? 'text-cyan-400 font-semibold' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {isActive && <span className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-0.5 h-4 bg-cyan-400 rounded-full"></span>}
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Area Konten Docs */}
      <main className="flex-1 max-w-5xl px-6 lg:px-12 pb-32">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 rounded-full"></div>
        {children}
      </main>
    </div>
  );
}