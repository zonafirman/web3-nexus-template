// lib/animations.ts
import { Variants } from 'framer-motion';

// ==========================================
// 1. KONFIGURASI FISIKA (SPRING)
// ==========================================
export const springs = {
  magnetic: { damping: 15, stiffness: 200, mass: 0.1 },
  bouncy: { type: "spring" as const, stiffness: 200, damping: 20 },
  smooth: { type: "spring" as const, stiffness: 120, damping: 20 }
};

// ==========================================
// 2. VARIAN ANIMASI GLOBAL
// ==========================================

// Muncul dari bawah (Digunakan di Hero, Features, Footer)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 } // Custom delay bisa ditambahkan langsung di komponen
};

// Dropdown & Modal dengan efek Blur (Digunakan di Navbar, Auth Modal)
export const dropdownBlur: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: springs.bouncy },
  exit: { opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)", transition: { duration: 0.2 } }
};

// Animasi pesan sukses/notifikasi kecil
export const successPop: Variants = {
  hidden: { opacity: 0, y: -10, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.3 } },
  exit: { opacity: 0, filter: "blur(4px)", transition: { duration: 0.2 } }
};

// Animasi khusus menu mobile (Fullscreen)
export const mobileMenu: Variants = {
  hidden: { opacity: 0, y: -20, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springs.smooth },
  exit: { opacity: 0, y: -20, filter: "blur(10px)" }
};

// ==========================================
// 3. VARIAN KHUSUS NAVBAR & SIDEBAR
// ==========================================

// Animasi Dynamic Island masuk dari atas
export const navbarIsland: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
};

// Animasi item berderet (masuk dari kiri dengan delay dinamis)
export const slideInItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (customDelay: number) => ({
    opacity: 1, x: 0, transition: { delay: customDelay }
  })
};

// Animasi merekah ke bawah (digunakan untuk hasil pencarian AI di Mobile)
export const inlineExpand: Variants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: { opacity: 1, height: 'auto', marginTop: 12, transition: { duration: 0.3 } },
  exit: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.2 } }
};

// Tambahkan di lib/animations.ts
export const fadeUpItem = {
  hidden: { opacity: 0, y: 10 },
  visible: (customDelay: number) => ({
    opacity: 1, y: 0, transition: { delay: customDelay }
  })
};

// Tambahkan di lib/animations.ts
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Tambahkan di lib/animations.ts

// Animasi baris per baris di Terminal
export const terminalLine: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
};

export const terminalLineUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

// Animasi Loading Bar
export const terminalLoadingBar: Variants = {
  hidden: { width: "0%" },
  visible: { width: "100%", transition: { duration: 1.2, ease: "linear" } }
};

// Tambahkan di lib/animations.ts

// Animasi Fade In murni dengan custom delay
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (customDelay: number) => ({ 
    opacity: 1, transition: { delay: customDelay } 
  })
};

// Animasi masuk bergaya 3D (Pop In)
export const popIn3D: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (customDelay: number) => ({ 
    opacity: 1, scale: 1, y: 0, transition: { duration: 1, delay: customDelay, type: "spring" } 
  })
};

// Animasi kursor berkedip
export const blinkCursor: Variants = {
  animate: { 
    opacity: [1, 0], 
    transition: { repeat: Infinity, duration: 0.8 } 
  }
};

// Tambahkan di lib/animations.ts

// Animasi Slide dari kiri (Digunakan di Header)
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Animasi Looping Tak Terbatas (Scanner & Jaringan)
export const scannerLine: Variants = {
  animate: { y: ["-100%", "200%"], transition: { repeat: Infinity, duration: 2, ease: "linear" } }
};

export const floatUp: Variants = {
  animate: { y: [0, -10, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } }
};

export const floatDown: Variants = {
  animate: { y: [0, 10, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } }
};

export const flowRight: Variants = {
  animate: { x: ["-100%", "200%"], transition: { repeat: Infinity, duration: 1.5, ease: "linear" } }
};

// Tambahkan di lib/animations.ts

// Animasi Crossfade cepat (Cocok untuk perpindahan Tab)
export const tabCrossfade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

// Tambahkan di lib/animations.ts

// Animasi transisi konten tab kecil (Y-axis slide)
export const tabSlideUp: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -5, transition: { duration: 0.15 } }
};