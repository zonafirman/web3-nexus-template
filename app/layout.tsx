import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';

// Initialize primary font
const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
});

// Initialize monospace font (useful for code blocks or Web3 addresses)
const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

export const metadata = {
  title: "Nexus UI | Web3 Frontend Framework",
  description: "The ultimate 2026 standard for building Web3 interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${geistSans.className} ${geistMono.variable}`}>
      <body className="bg-zinc-950 text-zinc-200 antialiased min-h-screen flex flex-col selection:bg-cyan-500/30">
        <Navbar />
        
        {/* Main content area */}
        <main className="flex-grow flex flex-col">{children}</main>
        
        {/* Global toast notification provider */}
        <Toaster position="bottom-right" richColors theme="dark" />
      </body>
    </html>
  );
}