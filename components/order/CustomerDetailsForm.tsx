"use client";

import { Input } from "@/components/ui/Input";

export interface CustomerDetails {
  customerName: string;
  mobile: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

export function CustomerDetailsForm({
  value,
  onChange,
  errors,
}: {
  value: CustomerDetails;
  onChange: (value: CustomerDetails) => void;
  errors: Partial<Record<keyof CustomerDetails, string>>;
}) {
  function set<K extends keyof CustomerDetails>(key: K, v: CustomerDetails[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          value={value.customerName}
          onChange={(e) => set("customerName", e.target.value)}
          error={errors.customerName}
        />
        <Input
          label="Mobile Number"
          value={value.mobile}
          onChange={(e) => set("mobile", e.target.value)}
          error={errors.mobile}
          placeholder="10-digit mobile number"
        />
      </div>
      <Input
        label="Address Line 1"
        value={value.line1}
        onChange={(e) => set("line1", e.target.value)}
        error={errors.line1}
      />
      <Input
        label="Address Line 2 (optional)"
        value={value.line2}
        onChange={(e) => set("line2", e.target.value)}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="City"
          value={value.city}
          onChange={(e) => set("city", e.target.value)}
          error={errors.city}
        />
        <Input
          label="State"
          value={value.state}
          onChange={(e) => set("state", e.target.value)}
          error={errors.state}
        />
      </div>
      <Input
        label="Pincode"
        value={value.pincode}
        onChange={(e) => set("pincode", e.target.value)}
        error={errors.pincode}
        placeholder="6-digit pincode"
      />
    </div>
  );
}
