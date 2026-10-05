import clsx from "clsx";

const statusClasses: Record<string, string> = {
  PENDING: "bg-stone-100 text-stone-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PACKED: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-amber-100 text-amber-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-block rounded-full px-3 py-1 text-xs font-semibold",
        statusClasses[status] ?? "bg-stone-100 text-stone-700"
      )}
    >
      {status}
    </span>
  );
}
