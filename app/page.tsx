import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <section className="bg-gradient-to-b from-saffron-100 to-saffron-50 px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-script text-3xl text-brand-600">
            Experience bliss in every bite
          </p>
          <h1 className="mt-2 text-3xl font-bold text-brand-800 sm:text-4xl">
            Crafted with Purity, Rooted in Tradition
          </h1>
          <p className="mt-4 text-stone-700">
            Since 2022, we have been bringing authentic Indian mithai to
            Vadodara — made with carefully sourced raw materials, traditional
            recipes, and a commitment to freshness.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/products">
              <Button variant="primary">Order Sweets Online</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline">Our Story</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-stone-900">
          Our Signature Sweets
        </h2>
        <ProductGrid
          products={products.map((p) => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            shortDescription: p.shortDescription,
            ratePerKg: Number(p.ratePerKg),
            isSugarFree: p.isSugarFree,
          }))}
        />
      </section>

      <section className="bg-brand-700 px-4 py-12 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold">Our Promise</h2>
          <p className="mt-3 text-brand-50">
            Authentic ingredients, traditional taste, and sweetness you can
            trust. Backed by a Maharaj with over 30 years of experience and a
            dedicated team of 12 assistants, with nearly 90% repeat customers.
          </p>
        </div>
      </section>
    </div>
  );
}
