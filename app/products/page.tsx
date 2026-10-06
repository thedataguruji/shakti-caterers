import { prisma } from "@/lib/prisma";
import { ProductGrid } from "@/components/products/ProductGrid";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Sweets — Shakti Caterers",
};

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-800">Our Sweets</h1>
      <p className="mt-2 text-stone-600">
        Order by the kilogram. Add items to your cart and check out securely.
      </p>
      <div className="mt-8">
        <ProductGrid
          products={products.map((p) => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            shortDescription: p.shortDescription,
            ratePerKg: Number(p.ratePerKg),
            isSugarFree: p.isSugarFree,
            imageUrl: p.imageUrl,
          }))}
        />
      </div>
    </div>
  );
}
