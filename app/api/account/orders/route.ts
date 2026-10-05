import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCustomerSession } from "@/lib/auth/customerSession";

export async function GET() {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { customerMobile: session.mobile as string },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return NextResponse.json({ orders });
}
