"use client";

import { CartItem, useCartStore } from "@/lib/cartStore";

export function CartItemRow({ item }: { item: CartItem }) {
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const lineTotal = (item.qtyKg * item.ratePerKg).toFixed(2);

  return (
    <div className="flex flex-col gap-2 border-b border-stone-200 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium text-stone-900">{item.name}</p>
        <p className="text-sm text-stone-500">₹{item.ratePerKg}/kg</p>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={0.25}
          step={0.25}
          value={item.qtyKg}
          onChange={(e) => updateQty(item.productId, Number(e.target.value))}
          className="w-20 rounded-md border border-stone-300 px-2 py-1 text-sm"
        />
        <span className="text-sm text-stone-500">kg</span>
        <span className="w-20 text-right font-semibold text-stone-900">
          ₹{lineTotal}
        </span>
        <button
          onClick={() => removeItem(item.productId)}
          className="text-sm text-red-600 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
