export const metadata = { title: "Refund Policy — Shakti Caterers" };

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-stone-700">
      <h1 className="text-3xl font-bold text-brand-800">Refund Policy</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed">
        <p>
          As our products are perishable food items prepared fresh to order,
          we generally do not accept returns once an order has been
          dispatched.
        </p>
        <h2 className="text-lg font-semibold text-stone-900">Quality Issues</h2>
        <p>
          If you receive a damaged or incorrect item, please contact us
          within 24 hours of delivery with your order number and photos of
          the issue. We will review and, where appropriate, offer a
          replacement or refund.
        </p>
        <h2 className="text-lg font-semibold text-stone-900">Payment Failures</h2>
        <p>
          If a payment is deducted but your order is not confirmed, contact
          us with your order number and we will verify with Razorpay and
          process a refund if applicable.
        </p>
      </div>
    </div>
  );
}
