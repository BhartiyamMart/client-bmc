import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ✅ Address data interface (from your API response)
export interface IAddressData {
  addressId: string;
  label: string;
  mapAddress: string;
  addressLineOne: string;
  addressLineTwo: string | null;
  addressName: string;
  addressPhone: string;
  isDefault: boolean;
  status: boolean;
}

// ✅ Address state
interface AddressState {
  addresses: IAddressData[];
  defaultAddress: IAddressData | null;
}

// ✅ Address actions
interface AddressActions {
  setAddresses: (addresses: IAddressData[]) => void;
  addAddress: (address: IAddressData) => void;
  updateAddress: (addressId: string, updatedAddress: Partial<IAddressData>) => void;
  deleteAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  clearAddresses: () => void;
}

// ✅ Initial state
const initialState: AddressState = {
  addresses: [],
  defaultAddress: null,
};

// ✅ Combined type
export type AddressStore = AddressState & AddressActions;

// ✅ Create address store with persist
export const useAddressStore = create<AddressStore>()(
  persist(
    (set) => ({
      ...initialState,

      // Set all addresses (typically from API response)
      setAddresses: (addresses) => {
        const defaultAddr = addresses.find((addr) => addr.isDefault) || null;
        set({ addresses, defaultAddress: defaultAddr });
      },

      // Add a new address
      addAddress: (address) =>
        set((state) => {
          const newAddresses = [...state.addresses, address];
          const defaultAddr = address.isDefault ? address : state.defaultAddress;
          return { addresses: newAddresses, defaultAddress: defaultAddr };
        }),

      // Update an existing address
      updateAddress: (addressId, updatedAddress) =>
        set((state) => {
          const newAddresses = state.addresses.map((addr) =>
            addr.addressId === addressId ? { ...addr, ...updatedAddress } : addr
          );

          // Update default address if the updated address is now default
          let newDefaultAddress = state.defaultAddress;
          if (updatedAddress.isDefault) {
            newDefaultAddress = newAddresses.find((addr) => addr.addressId === addressId) || null;
          } else if (state.defaultAddress?.addressId === addressId && updatedAddress.isDefault === false) {
            newDefaultAddress = null;
          }

          return { addresses: newAddresses, defaultAddress: newDefaultAddress };
        }),

      // Delete an address
      deleteAddress: (addressId) =>
        set((state) => {
          const newAddresses = state.addresses.filter((addr) => addr.addressId !== addressId);
          const newDefaultAddress =
            state.defaultAddress?.addressId === addressId
              ? newAddresses.find((addr) => addr.isDefault) || null
              : state.defaultAddress;
          return { addresses: newAddresses, defaultAddress: newDefaultAddress };
        }),

      // Set an address as default
      setDefaultAddress: (addressId) =>
        set((state) => {
          const newAddresses = state.addresses.map((addr) => ({
            ...addr,
            isDefault: addr.addressId === addressId,
          }));
          const newDefaultAddress = newAddresses.find((addr) => addr.addressId === addressId) || null;
          return { addresses: newAddresses, defaultAddress: newDefaultAddress };
        }),

      // Clear all addresses
      clearAddresses: () => set(initialState),
    }),
    {
      name: 'address-storage',
    }
  )
);
