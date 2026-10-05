import { prisma } from "./prisma";

export async function getSetting(
  key: string,
  fallback: string
): Promise<string> {
  const row = await prisma.appSetting.findUnique({ where: { key } });
  return row?.value ?? fallback;
}

export async function getSettingNumber(
  key: string,
  fallback: number
): Promise<number> {
  const value = await getSetting(key, fallback.toString());
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function getAllSettings(): Promise<Record<string, string>> {
  const rows = await prisma.appSetting.findMany();
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
}

export async function setSetting(key: string, value: string): Promise<void> {
  await prisma.appSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
