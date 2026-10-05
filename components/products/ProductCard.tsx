import Link from "next/link";
import { Card } from "@/components/ui/Card";

export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  ratePerKg: number;
  isSugarFree: boolean;
}

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-saffron-100 to-brand-100 text-4xl">
        🍬
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-stone-900">{product.name}</h3>
          {product.isSugarFree && (
            <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              Sugar-free
            </span>
          )}
        </div>
        <p className="flex-1 text-sm text-stone-600">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-brand-700">
            ₹{product.ratePerKg}/kg
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            View &amp; Order →
          </Link>
        </div>
      </div>
    </Card>
  );
}
