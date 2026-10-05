export const metadata = { title: "Terms & Conditions — Shakti Caterers" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-stone-700">
      <h1 className="text-3xl font-bold text-brand-800">Terms &amp; Conditions</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed">
        <p>
          These Terms &amp; Conditions govern your use of the Shakti Caterers
          website and the purchase of products listed on it. By placing an
          order, you agree to these terms.
        </p>
        <h2 className="text-lg font-semibold text-stone-900">Orders</h2>
        <p>
          All orders are subject to availability. Prices are quoted per
          kilogram and may change without prior notice; the price shown at
          the time of checkout is final for that order. We reserve the right
          to cancel any order where product availability, pricing, or
          delivery details are found to be incorrect.
        </p>
        <h2 className="text-lg font-semibold text-stone-900">Payments</h2>
        <p>
          Payments are processed securely through Razorpay. We do not store
          your card, UPI, or bank details on our servers.
        </p>
        <h2 className="text-lg font-semibold text-stone-900">Delivery</h2>
        <p>
          Orders are fulfilled and delivered by our team based on the address
          provided at checkout. Delivery timelines may vary based on
          location and order volume — see our Shipping Policy for details.
        </p>
        <h2 className="text-lg font-semibold text-stone-900">Governing Law</h2>
        <p>
          These terms are governed by the laws of India, and any disputes
          will be subject to the jurisdiction of the courts in Vadodara,
          Gujarat.
        </p>
      </div>
    </div>
  );
}
