import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createOrderSchema } from "@/lib/validation/order";
import { computeOrderTotals } from "@/lib/orders/pricing";
import { generateOrderNumber } from "@/lib/orders/orderNumber";
import { getSettingNumber } from "@/lib/settings";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }

  const { customerName, mobile, address, pincode, items } = parsed.data;

  const productIds = items.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  });

  if (products.length !== productIds.length) {
    return NextResponse.json(
      { error: "One or more items in your order are no longer available" },
      { status: 400 }
    );
  }

  const productById = new Map(products.map((p) => [p.id, p]));

  const pricingItems = items.map((item) => {
    const product = productById.get(item.productId)!;
    return { qtyKg: item.qtyKg, ratePerKg: Number(product.ratePerKg) };
  });

  const taxPercent = await getSettingNumber("tax_percent", 5);
  const discountPercent = await getSettingNumber("discount_percent", 0);

  const totals = computeOrderTotals(pricingItems, taxPercent, discountPercent);

  const order = await prisma.$transaction(async (tx) => {
    const customer = await tx.customer.upsert({
      where: { mobile },
      update: { name: customerName },
      create: { mobile, name: customerName },
    });

    const createdOrder = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerId: customer.id,
        customerName,
        customerMobile: mobile,
        shippingAddress: address,
        pincode,
        subtotal: totals.subtotal,
        discountAmount: totals.discountAmount,
        taxAmount: totals.taxAmount,
        totalAmount: totals.totalAmount,
        items: {
          create: items.map((item) => {
            const product = productById.get(item.productId)!;
            const lineTotal =
              Math.round(item.qtyKg * Number(product.ratePerKg) * 100) / 100;
            return {
              productId: product.id,
              productName: product.name,
              qtyKg: item.qtyKg,
              ratePerKg: product.ratePerKg,
              lineTotal,
            };
          }),
        },
        statusHistory: {
          create: {
            status: "PENDING",
            note: "Order placed",
            changedBy: "system",
          },
        },
      },
    });

    return createdOrder;
  });

  return NextResponse.json({
    orderId: order.id,
    orderNumber: order.orderNumber,
    totalAmount: Number(order.totalAmount),
  });
}
