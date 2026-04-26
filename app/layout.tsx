import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';

// Hapus opsi 'variable', kita ambil className-nya saja
const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
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
    // Gunakan geistSans.className langsung di tag <html>
    <html lang="en" className={`scroll-smooth ${geistSans.className}`}>
      <body className="bg-zinc-950 text-zinc-200 antialiased min-h-screen selection:bg-cyan-500/30">
        <Navbar />
        <main>{children}</main>
        <Toaster position="bottom-right" richColors theme="dark" />
      </body>
    </html>
  );
}