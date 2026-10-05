import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRazorpayClient } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const orderId = body?.orderId as string | undefined;

  if (!orderId) {
    return NextResponse.json({ error: "orderId is required" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.paymentStatus === "PAID") {
    return NextResponse.json(
      { error: "This order has already been paid for" },
      { status: 400 }
    );
  }

  const razorpay = getRazorpayClient();
  const amountInPaise = Math.round(Number(order.totalAmount) * 100);

  const razorpayOrder = await razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt: order.orderNumber,
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { razorpayOrderId: razorpayOrder.id },
  });

  return NextResponse.json({
    razorpayOrderId: razorpayOrder.id,
    amount: amountInPaise,
    currency: "INR",
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  });
}
