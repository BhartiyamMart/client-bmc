import { create } from "zustand";
import { persist } from "zustand/middleware";


interface WalletState {
    amount : number
}

interface WalletActions {
    setAmount : (amount:number)=> void
}


const initialState:WalletState = {
    amount : 0
}


export type Wallet = WalletState & WalletActions

export const useWalletStore = create<Wallet>()(
    persist(
        (set)=> ({
            ...initialState,
            setAmount: (amount) => set({ amount })
        }),
        {
            name: 'wallet-storage'
        }
    )
)