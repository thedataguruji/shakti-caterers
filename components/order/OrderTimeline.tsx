import { format } from "date-fns";
import { StatusBadge } from "./StatusBadge";

export interface StatusHistoryEntry {
  id: string;
  status: string;
  note: string | null;
  changedBy: string | null;
  createdAt: string | Date;
}

export function OrderTimeline({ history }: { history: StatusHistoryEntry[] }) {
  return (
    <ol className="space-y-4 border-l border-stone-200 pl-4">
      {history.map((entry) => (
        <li key={entry.id}>
          <div className="flex items-center gap-2">
            <StatusBadge status={entry.status} />
            <span className="text-xs text-stone-500">
              {format(new Date(entry.createdAt), "d MMM yyyy, h:mm a")}
            </span>
          </div>
          {entry.note && (
            <p className="mt-1 text-sm text-stone-600">{entry.note}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
