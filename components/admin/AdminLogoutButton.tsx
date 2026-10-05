"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
      }}
      className="whitespace-nowrap rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
    >
      Logout
    </button>
  );
}
