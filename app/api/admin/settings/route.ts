import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/adminSession";
import { getAllSettings, setSetting } from "@/lib/settings";
import { settingsUpdateSchema } from "@/lib/validation/admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const settings = await getAllSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = settingsUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }

  for (const [key, value] of Object.entries(parsed.data)) {
    if (value !== undefined) {
      await setSetting(key, value);
    }
  }

  return NextResponse.json({ ok: true });
}
