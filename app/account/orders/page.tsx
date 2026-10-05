import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCustomerSession } from "@/lib/auth/customerSession";
import { StatusBadge } from "@/components/order/StatusBadge";
import { Card } from "@/components/ui/Card";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function MyOrdersPage() {
  const session = await getCustomerSession();
  const orders = session
    ? await prisma.order.findMany({
        where: { customerMobile: session.mobile as string },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-800">My Orders</h1>

      {orders.length === 0 ? (
        <p className="mt-6 text-stone-600">
          You haven&apos;t placed any orders yet.{" "}
          <Link href="/products" className="text-brand-700 hover:underline">
            Start shopping
          </Link>
          .
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {orders.map((order) => (
            <Link key={order.id} href={`/account/orders/${order.id}`}>
              <Card className="flex items-center justify-between p-4 hover:border-brand-300">
                <div>
                  <p className="font-semibold text-stone-900">
                    {order.orderNumber}
                  </p>
                  <p className="text-sm text-stone-500">
                    {format(order.createdAt, "d MMM yyyy")} · ₹
                    {order.totalAmount.toString()}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
