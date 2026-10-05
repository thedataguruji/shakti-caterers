import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth/adminSession";
import { productUpdateSchema } from "@/lib/validation/admin";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = productUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }

  const product = await prisma.product.update({
    where: { id: params.productId },
    data: parsed.data,
  });

  return NextResponse.json({ product });
}
