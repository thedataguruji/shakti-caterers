import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

const links = [
  { href: "/admin/dashboard", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row">
      <aside className="flex shrink-0 flex-row gap-2 overflow-x-auto md:w-48 md:flex-col">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-stone-700 hover:bg-saffron-100"
          >
            {link.label}
          </Link>
        ))}
        <AdminLogoutButton />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
