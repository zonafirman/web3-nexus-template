import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Integration from "@/components/home/Integration"; // <-- Tambah ini
import Footer from "@/components/layout/Footer";         // <-- Tambah ini

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-zinc-950 selection:bg-cyan-500/30">
      
      {/* GLOBAL BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/15 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute top-1/2 -right-64 w-[500px] h-[500px] bg-cyan-400/10 blur-[150px] rounded-full"></div>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 flex flex-col w-full">
        <Hero />
        <Features />
        <Integration /> {/* <-- Pasang di sini */}
      </div>
      
      <Footer /> {/* <-- Pasang di sini sebagai penutup */}

    </div>
  );
}