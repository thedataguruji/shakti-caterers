"use client";

import { useEffect, useState } from "react";
import { OrderTable, AdminOrderRow } from "@/components/admin/OrderTable";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";

const statusOptions = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<AdminOrderRow[]>([]);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (status !== "ALL") params.set("status", status);
    if (search.trim()) params.set("search", search.trim());

    setLoading(true);
    fetch(`/api/admin/orders?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders ?? []))
      .finally(() => setLoading(false));
  }, [status, search]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Orders</h1>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="sm:w-48"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
        <Input
          label="Search (order #, name, mobile)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:w-64"
        />
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-stone-500">Loading orders...</p>
        ) : (
          <OrderTable orders={orders} />
        )}
      </div>
    </div>
  );
}
