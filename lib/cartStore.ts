import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  ratePerKg: number;
  qtyKg: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qtyKg">, qtyKg: number) => void;
  updateQty: (productId: string, qtyKg: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, qtyKg) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, qtyKg: i.qtyKg + qtyKg }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, qtyKg }] };
        }),
      updateQty: (productId, qtyKg) =>
        set((state) => ({
          items:
            qtyKg <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) =>
                  i.productId === productId ? { ...i, qtyKg } : i
                ),
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "shakti-caterers-cart" }
  )
);
