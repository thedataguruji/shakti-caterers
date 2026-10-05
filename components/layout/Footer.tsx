import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-saffron-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold text-brand-700">Shakti Caterers</h3>
          <p className="mt-2 text-sm text-stone-600">
            Crafted with Purity, Rooted in Tradition. Authentic Indian mithai
            from Vadodara since 2022.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-stone-900">Explore</h4>
          <ul className="mt-2 space-y-1 text-sm text-stone-600">
            <li><Link href="/products" className="hover:text-brand-700">Our Sweets</Link></li>
            <li><Link href="/about" className="hover:text-brand-700">Our Story</Link></li>
            <li><Link href="/track" className="hover:text-brand-700">Track Order</Link></li>
            <li><Link href="/contact" className="hover:text-brand-700">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-stone-900">Policies</h4>
          <ul className="mt-2 space-y-1 text-sm text-stone-600">
            <li><Link href="/terms" className="hover:text-brand-700">Terms &amp; Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-700">Privacy Policy</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-brand-700">Shipping Policy</Link></li>
            <li><Link href="/refund-policy" className="hover:text-brand-700">Refund Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-stone-900">Admin</h4>
          <ul className="mt-2 space-y-1 text-sm text-stone-600">
            <li><Link href="/admin/login" className="hover:text-brand-700">Staff Login</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-saffron-100 py-4 text-center text-xs text-stone-500">
        &copy; {new Date().getFullYear()} Shakti Caterers, Vadodara. All rights reserved.
      </div>
    </footer>
  );
}
