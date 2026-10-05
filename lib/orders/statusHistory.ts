import type { Prisma, OrderStatus } from "@prisma/client";

type TxClient = Prisma.TransactionClient;

export async function appendStatusHistory(
  tx: TxClient,
  orderId: string,
  status: OrderStatus,
  note: string | null,
  changedBy: string
) {
  return tx.orderStatusHistory.create({
    data: { orderId, status, note, changedBy },
  });
}
