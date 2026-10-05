import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { otpRequestSchema } from "@/lib/validation/otp";
import { generateOtp, OTP_TTL_MS } from "@/lib/otp/generateOtp";
import { sendOtp } from "@/lib/otp/sendOtp";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = otpRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }

  const { mobile } = parsed.data;
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await prisma.otpCode.create({
    data: { mobile, code, expiresAt },
  });

  await sendOtp(mobile, code);

  const devExposeOtp = process.env.DEV_EXPOSE_OTP === "true";

  return NextResponse.json({
    ok: true,
    ...(devExposeOtp ? { devCode: code } : {}),
  });
}
