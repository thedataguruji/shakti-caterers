import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OrderDetailCard } from "@/components/order/OrderDetailCard";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: { items: true, statusHistory: { orderBy: { createdAt: "asc" } } },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-brand-800">
          {order.paymentStatus === "PAID"
            ? "Thank you for your order!"
            : "Order received"}
        </h1>
        <p className="mt-2 text-stone-600">
          {order.paymentStatus === "PAID"
            ? "Your payment was successful. We'll start preparing your order."
            : "We couldn't confirm your payment yet. Contact us if this persists."}
        </p>
      </div>

      <OrderDetailCard
        order={{
          ...order,
          shippingAddress: order.shippingAddress as {
            line1: string;
            line2?: string;
            city: string;
            state: string;
          },
          subtotal: order.subtotal.toString(),
          discountAmount: order.discountAmount.toString(),
          taxAmount: order.taxAmount.toString(),
          totalAmount: order.totalAmount.toString(),
          items: order.items.map((i) => ({
            ...i,
            qtyKg: i.qtyKg.toString(),
            ratePerKg: i.ratePerKg.toString(),
            lineTotal: i.lineTotal.toString(),
          })),
        }}
      />

      <div className="mt-8 text-center">
        <Link href="/products" className="text-brand-700 hover:underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
