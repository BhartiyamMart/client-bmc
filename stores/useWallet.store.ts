import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WalletTerm {
  title: string;
  content: string;
}

interface WalletState {
  balance: string;
  hasWallet: boolean;
  walletTerms: WalletTerm[];
}

interface WalletActions {
  setBalance: (balance: string) => void;
  setHasWallet: (wallet: boolean) => void;
  setWalletTerms: (terms: WalletTerm[]) => void;
}

const initialState: WalletState = {
  balance: '0.00',
  hasWallet: false,
  walletTerms: [],
};

export type Wallet = WalletState & WalletActions;

export const useWalletStore = create<Wallet>()(
  persist(
    (set) => ({
      ...initialState,
      setBalance: (balance) => set({ balance }),
      setHasWallet: (wallet: boolean) => set({ hasWallet: wallet }),
      setWalletTerms: (terms) => set({ walletTerms: terms }),
    }),
    {
      name: 'wallet-storage',
    }
  )
);
