import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth/adminSession";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const status = req.nextUrl.searchParams.get("status");
  const search = req.nextUrl.searchParams.get("search")?.trim();

  const where: Record<string, unknown> = {};
  if (status && status !== "ALL") {
    where.status = status;
  }
  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: "insensitive" } },
      { customerMobile: { contains: search } },
      { customerName: { contains: search, mode: "insensitive" } },
    ];
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return NextResponse.json({ orders });
}
