import { CartItem } from "@/lib/cartStore";

export function CartSummary({ items }: { items: CartItem[] }) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.qtyKg * item.ratePerKg,
    0
  );

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="flex justify-between text-sm text-stone-600">
        <span>Estimated subtotal</span>
        <span className="font-semibold text-stone-900">
          ₹{subtotal.toFixed(2)}
        </span>
      </div>
      <p className="mt-2 text-xs text-stone-500">
        Final total including tax and any discount is calculated at checkout.
      </p>
    </div>
  );
}
