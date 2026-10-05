import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaymentSignature } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const {
    orderId,
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature,
  } = body ?? {};

  if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order || order.razorpayOrderId !== razorpayOrderId) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const isValid = verifyPaymentSignature(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  );

  if (!isValid) {
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: "FAILED" },
    });
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 400 }
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: "PAID",
        status: "CONFIRMED",
        razorpayPaymentId,
        razorpaySignature,
      },
    });
    await tx.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status: "CONFIRMED",
        note: "Payment received — order confirmed",
        changedBy: "system",
      },
    });
  });

  return NextResponse.json({ ok: true });
}
