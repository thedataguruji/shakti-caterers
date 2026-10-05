import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const orderNumber = req.nextUrl.searchParams.get("orderNumber")?.trim();
  const mobile = req.nextUrl.searchParams.get("mobile")?.trim();

  if (!orderNumber || !mobile) {
    return NextResponse.json(
      { error: "Order number and mobile number are required" },
      { status: 400 }
    );
  }

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true, statusHistory: { orderBy: { createdAt: "asc" } } },
  });

  if (!order || order.customerMobile !== mobile) {
    return NextResponse.json(
      { error: "No order found with that order number and mobile number" },
      { status: 404 }
    );
  }

  return NextResponse.json({ order });
}
