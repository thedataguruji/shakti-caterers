"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";
import { createOrderSchema } from "@/lib/validation/order";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import {
  CustomerDetailsForm,
  CustomerDetails,
} from "@/components/order/CustomerDetailsForm";
import { Button } from "@/components/ui/Button";
import { loadRazorpayScript } from "@/lib/razorpayCheckout";

const emptyDetails: CustomerDetails = {
  customerName: "",
  mobile: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const router = useRouter();

  const [details, setDetails] = useState<CustomerDetails>(emptyDetails);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CustomerDetails, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleCheckout() {
    setFormError(null);
    setErrors({});

    const parsed = createOrderSchema.safeParse({
      customerName: details.customerName,
      mobile: details.mobile,
      address: {
        line1: details.line1,
        line2: details.line2,
        city: details.city,
        state: details.state,
      },
      pincode: details.pincode,
      items: items.map((item) => ({
        productId: item.productId,
        qtyKg: item.qtyKg,
      })),
    });

    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof CustomerDetails, string>> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path.join(".");
        if (path === "customerName") fieldErrors.customerName = issue.message;
        if (path === "mobile") fieldErrors.mobile = issue.message;
        if (path === "address.line1") fieldErrors.line1 = issue.message;
        if (path === "address.city") fieldErrors.city = issue.message;
        if (path === "address.state") fieldErrors.state = issue.message;
        if (path === "pincode") fieldErrors.pincode = issue.message;
        if (path === "items") setFormError(issue.message);
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        setFormError(orderData.error ?? "Could not create order");
        setSubmitting(false);
        return;
      }

      const { orderId, totalAmount } = orderData;

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setFormError("Could not load payment gateway. Check your connection.");
        setSubmitting(false);
        return;
      }

      const paymentRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const paymentData = await paymentRes.json();
      if (!paymentRes.ok) {
        setFormError(paymentData.error ?? "Could not start payment");
        setSubmitting(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: paymentData.keyId,
        amount: paymentData.amount,
        currency: paymentData.currency,
        order_id: paymentData.razorpayOrderId,
        name: "Shakti Caterers",
        description: `Order total ₹${totalAmount}`,
        prefill: {
          name: details.customerName,
          contact: details.mobile,
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, ...response }),
          });
          if (verifyRes.ok) {
            clear();
            router.push(`/orders/${orderId}/confirmation`);
          } else {
            setFormError(
              "Payment verification failed. Please contact us with your order ID."
            );
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
        theme: { color: "#8f4d17" },
      });
      razorpay.open();
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Your cart is empty</h1>
        <p className="mt-2 text-stone-600">
          Browse our sweets and add some to your cart.
        </p>
        <Link href="/products">
          <Button variant="primary" className="mt-6">
            Shop Our Sweets
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-800">Your Cart</h1>

      <div className="mt-6 rounded-lg border border-stone-200 bg-white p-4">
        {items.map((item) => (
          <CartItemRow key={item.productId} item={item} />
        ))}
      </div>

      <div className="mt-6">
        <CartSummary items={items} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-stone-900">
          Delivery Details
        </h2>
        <div className="mt-4">
          <CustomerDetailsForm
            value={details}
            onChange={setDetails}
            errors={errors}
          />
        </div>
      </div>

      {formError && (
        <p className="mt-4 text-sm text-red-600">{formError}</p>
      )}

      <div className="sticky bottom-0 mt-8 border-t border-stone-200 bg-saffron-50 py-4 sm:static sm:border-0 sm:bg-transparent sm:py-0">
        <Button
          variant="primary"
          className="w-full sm:w-auto"
          disabled={submitting}
          onClick={handleCheckout}
        >
          {submitting ? "Processing..." : "Proceed to Pay"}
        </Button>
      </div>
    </div>
  );
}
