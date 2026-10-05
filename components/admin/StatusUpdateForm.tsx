"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const statuses = [
  "PENDING",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export function StatusUpdateForm({
  orderId,
  currentStatus,
  onUpdated,
}: {
  orderId: string;
  currentStatus: string;
  onUpdated: () => void;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, note }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Could not update status");
      } else {
        setNote("");
        onUpdated();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Select
        label="Update Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-700">
          Note (optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Updating..." : "Update Status"}
      </Button>
    </form>
  );
}
