// stores/useCart.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: number;
  variantId?: number;
  quantity: number;
  price: number;
  name: string;
  weight: string;
  image: string;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  isPopCartVisible: boolean;
  addToCart: (productId: number, variantId: number | undefined, product: Partial<CartItem>) => void;
  removeFromCart: (productId: number, variantId: number | undefined) => void;
  clearCart: () => void;
  showPopCartTemporary: () => void;
  hidePopCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isPopCartVisible: false,

      // Add item or increment quantity
      addToCart: (productId, variantId, product) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === productId && item.variantId === variantId
          );

          if (existingItemIndex > -1) {
            // Increment quantity - create NEW array with NEW object
            const updatedItems = state.items.map((item, index) =>
              index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
            );
            return { items: updatedItems };
          } else {
            // Add new item - create NEW array
            return {
              items: [
                ...state.items,
                {
                  productId,
                  variantId,
                  stock: product.stock ?? 0, // Use nullish coalescing with default value
                  quantity: 1,
                  price: product.price!,
                  name: product.name!,
                  weight: product.weight!,
                  image: product.image!,
                },
              ],
            };
          }
        });
      },

      // Remove item or decrement quantity
      removeFromCart: (productId, variantId) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === productId && item.variantId === variantId
          );

          if (existingItemIndex === -1) return state;

          const currentItem = state.items[existingItemIndex];

          if (currentItem.quantity > 1) {
            // Decrement - create NEW array with NEW object
            const updatedItems = state.items.map((item, index) =>
              index === existingItemIndex ? { ...item, quantity: item.quantity - 1 } : item
            );
            return { items: updatedItems };
          } else {
            // Remove completely - create NEW array
            const updatedItems = state.items.filter((_, index) => index !== existingItemIndex);
            return { items: updatedItems };
          }
        });
      },

      clearCart: () => set({ items: [] }),

      showPopCartTemporary: () => {
        set({ isPopCartVisible: true });
        setTimeout(() => {
          set({ isPopCartVisible: false });
        }, 3000);
      },

      hidePopCart: () => set({ isPopCartVisible: false }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

// SELECTOR HOOKS
export const useCartQuantity = (productId: number, variantId?: number) => {
  return useCartStore((state) => {
    const item = state.items.find((item) => item.productId === productId && item.variantId === variantId);
    return item?.quantity || 0;
  });
};

export const useTotalProductQuantity = (productId: number) => {
  return useCartStore((state) => {
    return state.items.filter((item) => item.productId === productId).reduce((sum, item) => sum + item.quantity, 0);
  });
};

export const useCartTotal = () => {
  return useCartStore((state) => {
    return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  });
};

export const useCartItemCount = () => {
  return useCartStore((state) => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  });
};
