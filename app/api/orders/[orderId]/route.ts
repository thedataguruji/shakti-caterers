import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { orderId: string } }
) {
  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: { items: true, statusHistory: { orderBy: { createdAt: "asc" } } },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}
