"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { OrderDetailCard, OrderData } from "@/components/order/OrderDetailCard";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOrder(null);
    setLoading(true);
    try {
      const res = await fetch(
        `/api/orders/track?orderNumber=${encodeURIComponent(
          orderNumber.trim()
        )}&mobile=${encodeURIComponent(mobile.trim())}`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Order not found");
      } else {
        setOrder(data.order);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-800">Track Your Order</h1>
      <p className="mt-2 text-stone-600">
        Enter your order number and the mobile number used to place the
        order.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Input
          label="Order Number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="e.g. SC261006-1234"
          required
        />
        <Input
          label="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="10-digit mobile number"
          required
        />
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Searching..." : "Track Order"}
        </Button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {order && (
        <div className="mt-8">
          <OrderDetailCard order={order} />
        </div>
      )}
    </div>
  );
}
