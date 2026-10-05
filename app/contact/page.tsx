"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error ?? "Could not send message");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-800">Contact Us</h1>
      <p className="mt-2 text-stone-600">
        Have a question about a custom order or bulk sweets for an occasion?
        Send us a message.
      </p>

      {submitted ? (
        <p className="mt-8 rounded-md bg-green-50 px-4 py-3 text-green-800">
          Thank you — we&apos;ll get back to you shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label="Mobile Number (optional)"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
          <Input
            label="Email (optional)"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              required
              className="rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      )}
    </div>
  );
}
