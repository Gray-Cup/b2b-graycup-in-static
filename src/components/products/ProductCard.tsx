"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  showPrice?: boolean;
};

export function ProductCard({ product, showPrice = true }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="overflow-hidden border border-gray-200 rounded-lg bg-white p-0 cursor-pointer transition-all hover:border-gray-300 hover:shadow-sm">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            draggable={false}
            className="object-cover"
          />
        </div>
        <div className="-mt-3 pb-4 text-center">
          <h3 className="text-md font-semibold text-black">{product.name}</h3>
          {showPrice && (
            <p className="text-xs text-muted-foreground mt-1">
              From ₹{product.priceRange.min}/{product.minimumOrder.unit}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
