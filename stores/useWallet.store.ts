import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface WalletTerm {
  title: string;
  content: string;
}

interface WalletState {
  balance: string;
  hasWallet: boolean;
  walletTerms: WalletTerm[];
  isWalletChecked: boolean;
  userPhone: string | null;
}

interface WalletActions {
  setBalance: (balance: string) => void;
  setHasWallet: (wallet: boolean) => void;
  setWalletTerms: (terms: WalletTerm[]) => void;
  setWalletChecked: (checked: boolean) => void;
  setUserPhone: (phone: string) => void;
  resetWallet: () => void;
  clearStorage: () => void;
}

const initialState: WalletState = {
  balance: '0',
  hasWallet: false,
  walletTerms: [],
  isWalletChecked: false,
  userPhone: null,
};

export type Wallet = WalletState & WalletActions;

export const useWalletStore = create<Wallet>()(
  persist(
    (set, get) => ({
      ...initialState,
      setBalance: (balance) => set({ balance }),
      setHasWallet: (wallet: boolean) => set({ hasWallet: wallet }),
      setWalletTerms: (terms) => set({ walletTerms: terms }),
      setWalletChecked: (checked: boolean) => set({ isWalletChecked: checked }),
      setUserPhone: (phone: string) => set({ userPhone: phone }),
      resetWallet: () => set(initialState),
      clearStorage: () => {
        localStorage.removeItem('wallet-storage');
        set(initialState);
      },
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
