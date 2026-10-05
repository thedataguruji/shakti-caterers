"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data.settings ?? {}))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  function set(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  if (loading) return <p className="text-stone-500">Loading settings...</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-stone-900">Settings</h1>
      <Card className="max-w-lg p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Tax (%)"
            type="number"
            step="0.01"
            value={settings.tax_percent ?? ""}
            onChange={(e) => set("tax_percent", e.target.value)}
          />
          <Input
            label="Discount (%)"
            type="number"
            step="0.01"
            value={settings.discount_percent ?? ""}
            onChange={(e) => set("discount_percent", e.target.value)}
          />
          <Input
            label="Contact Email"
            value={settings.contact_email ?? ""}
            onChange={(e) => set("contact_email", e.target.value)}
          />
          <Input
            label="Contact Phone"
            value={settings.contact_phone ?? ""}
            onChange={(e) => set("contact_phone", e.target.value)}
          />
          <Input
            label="Contact Address"
            value={settings.contact_address ?? ""}
            onChange={(e) => set("contact_address", e.target.value)}
          />
          {saved && <p className="text-sm text-green-700">Settings saved.</p>}
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
