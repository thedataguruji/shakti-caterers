import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth/adminSession";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json({ products });
}
