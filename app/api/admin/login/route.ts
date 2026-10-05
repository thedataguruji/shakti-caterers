import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminLoginSchema } from "@/lib/validation/admin";
import { verifyPassword } from "@/lib/auth/password";
import { createAdminSession } from "@/lib/auth/adminSession";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  await createAdminSession(admin.id, admin.email);

  return NextResponse.json({ ok: true });
}
