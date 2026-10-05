"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function AddToCartForm({
  productId,
  slug,
  name,
  ratePerKg,
}: {
  productId: string;
  slug: string;
  name: string;
  ratePerKg: number;
}) {
  const [qty, setQty] = useState(0.5);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const total = (qty * ratePerKg).toFixed(2);

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-lg border border-stone-200 bg-white p-4">
      <Input
        type="number"
        min={0.25}
        step={0.25}
        label="Quantity (kg)"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <p className="text-sm text-stone-600">
        Estimated price: <span className="font-semibold">₹{total}</span>
      </p>
      <div className="flex gap-3">
        <Button
          variant="primary"
          disabled={qty <= 0}
          onClick={() => {
            addItem({ productId, slug, name, ratePerKg }, qty);
            setAdded(true);
          }}
        >
          Add to Cart
        </Button>
        {added && (
          <Button variant="outline" onClick={() => router.push("/cart")}>
            Go to Cart
          </Button>
        )}
      </div>
      {added && (
        <p className="text-sm text-green-700">Added to your cart.</p>
      )}
    </div>
  );
}
