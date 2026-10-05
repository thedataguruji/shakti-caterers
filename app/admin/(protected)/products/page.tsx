"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  ratePerKg: string;
  isActive: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products ?? []);
        const nextDrafts: Record<string, string> = {};
        for (const p of data.products ?? []) {
          nextDrafts[p.id] = p.ratePerKg;
        }
        setDrafts(nextDrafts);
      })
      .finally(() => setLoading(false));
  }, []);

  async function saveRate(productId: string) {
    setSavingId(productId);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ratePerKg: Number(drafts[productId]) }),
      });
      if (res.ok) {
        const data = await res.json();
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? data.product : p))
        );
      }
    } finally {
      setSavingId(null);
    }
  }

  async function toggleActive(productId: string, isActive: boolean) {
    const res = await fetch(`/api/admin/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive }),
    });
    if (res.ok) {
      const data = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? data.product : p))
      );
    }
  }

  if (loading) return <p className="text-stone-500">Loading products...</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-stone-900">Products</h1>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-stone-900">{product.name}</p>
              <p className="text-sm text-stone-500">{product.slug}</p>
            </div>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                step="0.01"
                value={drafts[product.id] ?? ""}
                onChange={(e) =>
                  setDrafts({ ...drafts, [product.id]: e.target.value })
                }
                className="w-28"
              />
              <span className="text-sm text-stone-500">per kg</span>
              <Button
                variant="outline"
                disabled={savingId === product.id}
                onClick={() => saveRate(product.id)}
              >
                {savingId === product.id ? "Saving..." : "Save"}
              </Button>
              <label className="flex items-center gap-2 text-sm text-stone-600">
                <input
                  type="checkbox"
                  checked={product.isActive}
                  onChange={(e) => toggleActive(product.id, e.target.checked)}
                />
                Active
              </label>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
