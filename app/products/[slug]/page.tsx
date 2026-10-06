import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AddToCartForm } from "@/components/products/AddToCartForm";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product || !product.isActive) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-72 w-full rounded-lg object-cover sm:h-96"
        />
      ) : (
        <div className="flex h-56 items-center justify-center rounded-lg bg-gradient-to-br from-saffron-100 to-brand-100 text-6xl">
          🍬
        </div>
      )}
      <div className="mt-6 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold text-brand-800">{product.name}</h1>
        {product.isSugarFree && (
          <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Sugar-free
          </span>
        )}
      </div>
      <p className="mt-2 text-lg font-semibold text-brand-700">
        ₹{Number(product.ratePerKg)}/kg
      </p>
      <p className="mt-4 whitespace-pre-line text-stone-700">
        {product.description}
      </p>

      <AddToCartForm
        productId={product.id}
        slug={product.slug}
        name={product.name}
        ratePerKg={Number(product.ratePerKg)}
      />
    </div>
  );
}
