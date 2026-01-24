import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  balance: string;
  hasWallet: boolean;
}

interface WalletActions {
  setBalance: (balance: string) => void;
  setHasWallet: (wallet: boolean) => void;
}

const initialState: WalletState = {
  balance: '0.00',
  hasWallet: false,
};

export type Wallet = WalletState & WalletActions;

export const useWalletStore = create<Wallet>()(
  persist(
    (set) => ({
      ...initialState,
      setBalance: (balance) => set({ balance }),
      setHasWallet: (wallet: boolean) => set({ hasWallet: wallet }),
    }),
    {
      name: 'wallet-storage',
    }
  )
);
