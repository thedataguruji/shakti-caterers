import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCustomerSession } from "@/lib/auth/customerSession";
import { OrderDetailCard } from "@/components/order/OrderDetailCard";

export const dynamic = "force-dynamic";

export default async function AccountOrderDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const session = await getCustomerSession();
  if (!session) notFound();

  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: { items: true, statusHistory: { orderBy: { createdAt: "asc" } } },
  });

  if (!order || order.customerMobile !== session.mobile) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-brand-800">
        Order {order.orderNumber}
      </h1>
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
    </div>
  );
}
