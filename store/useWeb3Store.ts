import { create } from 'zustand';

interface Web3State {
  isConnected: boolean;
  address: string | null;
  balance: string;
  chain: string;
  connect: (address: string) => void;
  disconnect: () => void;
}

export const useWeb3Store = create<Web3State>((set) => ({
  isConnected: false, // Default: belum terkoneksi
  address: null,
  balance: "1.24 ETH",
  chain: "Arbitrum One",
  connect: (address) => set({ 
    isConnected: true, 
    address: address,
  }),
  disconnect: () => set({ 
    isConnected: false, 
    address: null,
  }),
}));