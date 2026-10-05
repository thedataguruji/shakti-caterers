import { Card } from "@/components/ui/Card";
import { StatusBadge } from "./StatusBadge";
import { OrderTimeline, StatusHistoryEntry } from "./OrderTimeline";

export interface OrderItemData {
  id: string;
  productName: string;
  qtyKg: string | number;
  ratePerKg: string | number;
  lineTotal: string | number;
}

export interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  customerMobile: string;
  shippingAddress: { line1: string; line2?: string; city: string; state: string };
  pincode: string;
  subtotal: string | number;
  discountAmount: string | number;
  taxAmount: string | number;
  totalAmount: string | number;
  status: string;
  paymentStatus: string;
  createdAt: string | Date;
  items: OrderItemData[];
  statusHistory: StatusHistoryEntry[];
}

export function OrderDetailCard({ order }: { order: OrderData }) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm text-stone-500">Order Number</p>
            <p className="text-lg font-bold text-stone-900">
              {order.orderNumber}
            </p>
          </div>
          <div className="flex gap-2">
            <StatusBadge status={order.status} />
            <StatusBadge status={order.paymentStatus} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-stone-700">Delivery To</p>
            <p className="text-sm text-stone-600">{order.customerName}</p>
            <p className="text-sm text-stone-600">{order.customerMobile}</p>
            <p className="text-sm text-stone-600">
              {order.shippingAddress.line1}
              {order.shippingAddress.line2
                ? `, ${order.shippingAddress.line2}`
                : ""}
              , {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
              {order.pincode}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-700">Items</p>
            <ul className="mt-1 space-y-1">
              {order.items.map((item) => (
                <li key={item.id} className="text-sm text-stone-600">
                  {item.productName} — {item.qtyKg} kg × ₹{item.ratePerKg} = ₹
                  {item.lineTotal}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 border-t border-stone-100 pt-4 text-sm">
          <div className="flex justify-between text-stone-600">
            <span>Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Discount</span>
            <span>- ₹{order.discountAmount}</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Tax</span>
            <span>+ ₹{order.taxAmount}</span>
          </div>
          <div className="mt-1 flex justify-between text-base font-bold text-stone-900">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <p className="mb-4 text-sm font-semibold text-stone-700">
          Order Timeline
        </p>
        <OrderTimeline history={order.statusHistory} />
      </Card>
    </div>
  );
}
