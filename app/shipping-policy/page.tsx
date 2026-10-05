export const metadata = { title: "Shipping Policy — Shakti Caterers" };

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-stone-700">
      <h1 className="text-3xl font-bold text-brand-800">Shipping Policy</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed">
        <p>
          Shakti Caterers currently delivers within Vadodara and surrounding
          areas. Orders are prepared fresh and dispatched after payment
          confirmation.
        </p>
        <h2 className="text-lg font-semibold text-stone-900">Delivery Timelines</h2>
        <p>
          Typical delivery takes 1–3 days depending on order size and
          occasion-based demand. You will be able to track your order status
          — Confirmed, Packed, Shipped, Delivered — using your order number
          and mobile number on our Track Order page.
        </p>
        <h2 className="text-lg font-semibold text-stone-900">Packaging</h2>
        <p>
          All mithai is packed in food-safe containers to preserve freshness
          during transit.
        </p>
      </div>
    </div>
  );
}
