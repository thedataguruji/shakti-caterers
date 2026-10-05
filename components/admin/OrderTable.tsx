import Link from "next/link";
import { format } from "date-fns";
import { StatusBadge } from "@/components/order/StatusBadge";

export interface AdminOrderRow {
  id: string;
  orderNumber: string;
  customerName: string;
  customerMobile: string;
  totalAmount: string | number;
  status: string;
  paymentStatus: string;
  createdAt: string | Date;
}

export function OrderTable({ orders }: { orders: AdminOrderRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-stone-200 bg-stone-50 text-stone-500">
          <tr>
            <th className="px-4 py-3">Order #</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Payment</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-stone-100 last:border-0">
              <td className="px-4 py-3">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="font-medium text-brand-700 hover:underline"
                >
                  {order.orderNumber}
                </Link>
              </td>
              <td className="px-4 py-3 text-stone-600">
                {format(new Date(order.createdAt), "d MMM yyyy")}
              </td>
              <td className="px-4 py-3 text-stone-600">
                {order.customerName}
                <br />
                <span className="text-xs text-stone-400">
                  {order.customerMobile}
                </span>
              </td>
              <td className="px-4 py-3 font-medium text-stone-900">
                ₹{order.totalAmount}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={order.paymentStatus} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-stone-500">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
