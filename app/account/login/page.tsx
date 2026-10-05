"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function CustomerLoginPage() {
  return (
    <Suspense>
      <CustomerLoginForm />
    </Suspense>
  );
}

function CustomerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account/orders";

  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not send OTP");
      } else {
        setStep("otp");
        setDevCode(data.devCode ?? null);
      }
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Invalid OTP");
      } else {
        router.push(next);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-brand-800">Login to Your Account</h1>
      <p className="mt-2 text-stone-600">
        Use your mobile number to view your order history.
      </p>

      {step === "mobile" ? (
        <form onSubmit={requestOtp} className="mt-6 flex flex-col gap-4">
          <Input
            label="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="10-digit mobile number"
            required
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="mt-6 flex flex-col gap-4">
          {devCode && (
            <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Dev mode — your OTP is <strong>{devCode}</strong> (no real SMS
              is sent in local/demo mode).
            </p>
          )}
          <Input
            label="Enter 6-digit OTP"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Verifying..." : "Verify & Login"}
          </Button>
          <button
            type="button"
            className="text-sm text-stone-500 hover:underline"
            onClick={() => setStep("mobile")}
          >
            Change mobile number
          </button>
        </form>
      )}

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}
