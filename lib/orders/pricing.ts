export interface PricingItemInput {
  qtyKg: number;
  ratePerKg: number;
}

export interface PricingResult {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function computeOrderTotals(
  items: PricingItemInput[],
  taxPercent: number,
  discountPercent: number
): PricingResult {
  const subtotal = round2(
    items.reduce((sum, item) => sum + item.qtyKg * item.ratePerKg, 0)
  );
  const discountAmount = round2(subtotal * (discountPercent / 100));
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = round2(taxableAmount * (taxPercent / 100));
  const totalAmount = round2(taxableAmount + taxAmount);

  return { subtotal, discountAmount, taxAmount, totalAmount };
}
