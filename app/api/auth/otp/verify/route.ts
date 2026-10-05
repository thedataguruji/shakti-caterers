import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { otpVerifySchema } from "@/lib/validation/otp";
import { OTP_MAX_ATTEMPTS } from "@/lib/otp/generateOtp";
import { createCustomerSession } from "@/lib/auth/customerSession";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = otpVerifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }

  const { mobile, code } = parsed.data;

  const otp = await prisma.otpCode.findFirst({
    where: { mobile, consumedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (!otp || otp.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "OTP has expired. Please request a new one." },
      { status: 400 }
    );
  }

  if (otp.attempts >= OTP_MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Too many attempts. Please request a new OTP." },
      { status: 400 }
    );
  }

  if (otp.code !== code) {
    await prisma.otpCode.update({
      where: { id: otp.id },
      data: { attempts: { increment: 1 } },
    });
    return NextResponse.json({ error: "Incorrect OTP" }, { status: 400 });
  }

  const customer = await prisma.customer.upsert({
    where: { mobile },
    update: {},
    create: { mobile },
  });

  await prisma.otpCode.update({
    where: { id: otp.id },
    data: { consumedAt: new Date(), customerId: customer.id },
  });

  await createCustomerSession(customer.id, mobile);

  return NextResponse.json({ ok: true, customerId: customer.id });
}
