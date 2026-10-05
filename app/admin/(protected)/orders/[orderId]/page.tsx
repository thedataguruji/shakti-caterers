"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { OrderDetailCard, OrderData } from "@/components/order/OrderDetailCard";
import { StatusUpdateForm } from "@/components/admin/StatusUpdateForm";
import { Card } from "@/components/ui/Card";

export default function AdminOrderDetailPage() {
  const params = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadOrder = useCallback(() => {
    setLoading(true);
    fetch(`/api/admin/orders/${params.orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.order ?? null))
      .finally(() => setLoading(false));
  }, [params.orderId]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  if (loading) return <p className="text-stone-500">Loading order...</p>;
  if (!order) return <p className="text-stone-500">Order not found.</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-stone-900">
        Order {order.orderNumber}
      </h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OrderDetailCard order={order} />
        </div>
        <Card className="h-fit p-5">
          <p className="mb-4 text-sm font-semibold text-stone-700">
            Manage Order
          </p>
          <StatusUpdateForm
            orderId={order.id}
            currentStatus={order.status}
            onUpdated={loadOrder}
          />
        </Card>
      </div>
    </div>
  );
}
