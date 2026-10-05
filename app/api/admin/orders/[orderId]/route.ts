import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth/adminSession";

export async function GET(
  _req: Request,
  { params }: { params: { orderId: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: { items: true, statusHistory: { orderBy: { createdAt: "asc" } } },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}
