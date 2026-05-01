import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Integration from "@/components/home/Integration";
import Pricing from "@/components/home/Pricing";
import Stats from "@/components/home/Stats";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-zinc-950 selection:bg-cyan-500/30">
      
      {/* Global Background Layer: Grid and Ambient Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Ambient glowing orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/15 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute top-1/2 -right-64 w-[500px] h-[500px] bg-cyan-400/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Main Content Layer: flex-grow ensures the footer is always pushed to the bottom */}
      <div className="relative z-10 flex flex-col w-full flex-grow">
        <Hero />
        <Features />
        <Integration />
        <Pricing />
        <Stats />
      </div>
      
      {/* Footer Layer */}
      <Footer />

    </div>
  );
}