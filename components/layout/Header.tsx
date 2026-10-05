"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Our Sweets" },
  { href: "/about", label: "Our Story" },
  { href: "/track", label: "Track Order" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const itemCount = useCartStore((state) => state.items.length);

  return (
    <header className="sticky top-0 z-40 border-b border-saffron-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Logo showTagline />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-700 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/account/orders"
            className="hidden text-sm font-medium text-stone-700 hover:text-brand-700 sm:block"
          >
            My Account
          </Link>
          <Link
            href="/cart"
            className="relative rounded-md bg-brand-700 px-3 py-2 text-sm font-medium text-white hover:bg-brand-800"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-saffron-500 text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-6 bg-stone-700 mb-1" />
            <span className="block h-0.5 w-6 bg-stone-700 mb-1" />
            <span className="block h-0.5 w-6 bg-stone-700" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-saffron-200 bg-white px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-sm font-medium text-stone-700 hover:text-brand-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/account/orders"
            className="py-2 text-sm font-medium text-stone-700 hover:text-brand-700"
            onClick={() => setOpen(false)}
          >
            My Account
          </Link>
        </nav>
      )}
    </header>
  );
}
