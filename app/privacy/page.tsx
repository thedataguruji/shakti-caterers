export const metadata = { title: "Privacy Policy — Shakti Caterers" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-stone-700">
      <h1 className="text-3xl font-bold text-brand-800">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed">
        <p>
          We collect your name, mobile number, delivery address, and pincode
          only to process and deliver your order, and to let you track its
          status. We do not sell or share this information with third
          parties, except our payment partner (Razorpay) for processing
          payments, and SMS providers for delivering OTP login codes.
        </p>
        <h2 className="text-lg font-semibold text-stone-900">OTP Login</h2>
        <p>
          When you log in with your mobile number, we send a one-time
          password to verify your identity. We do not use this for marketing
          without your consent.
        </p>
        <h2 className="text-lg font-semibold text-stone-900">Payment Data</h2>
        <p>
          All payment details are handled directly by Razorpay under their
          own security and privacy practices. We only store the payment
          reference ID needed to confirm your order.
        </p>
        <h2 className="text-lg font-semibold text-stone-900">Contact</h2>
        <p>
          For any privacy-related questions, reach us via the Contact page.
        </p>
      </div>
    </div>
  );
}
