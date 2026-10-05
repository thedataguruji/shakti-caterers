import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth/adminSession";
import { statusUpdateSchema } from "@/lib/validation/admin";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = statusUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }

  const { status, note } = parsed.data;

  const order = await prisma.order.findUnique({ where: { id: params.orderId } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: order.id },
      data: { status },
    });
    await tx.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status,
        note: note || null,
        changedBy: (session.email as string) ?? "admin",
      },
    });
  });

  return NextResponse.json({ ok: true });
}
