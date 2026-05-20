"use client";

import { useState } from "react";
import Image from "next/image";
import { shopProducts, type ShopProduct } from "@/data/shop-products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CategoryFilter = "All" | "Tea" | "Coffee";

function ProductCard({
  product,
  onBuy,
}: {
  product: ShopProduct;
  onBuy: (product: ShopProduct) => void;
}) {
  return (
    <div className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col">
      <div className="aspect-square relative bg-neutral-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs font-medium px-2 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-medium px-2 py-1 rounded-full border border-neutral-200">
          {product.weight}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="flex-1">
          <p className="text-xs text-neutral-500 mb-1">{product.category}</p>
          <h3 className="font-semibold text-neutral-900 leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-neutral-900">
            ₹{product.price}
          </span>
          <Button
            variant="black"
            size="sm"
            onClick={() => onBuy(product)}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

function CheckoutDialog({
  product,
  onClose,
}: {
  product: ShopProduct | null;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          customerName: name,
          customerPhone: phone,
          customerEmail: email || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create payment");
      }

      window.location.href = data.paymentLink;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        {product && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-neutral-900 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-neutral-500">{product.weight}</p>
              </div>
              <p className="font-bold text-neutral-900 shrink-0">
                ₹{product.price}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="checkout-name">Full Name *</Label>
                <Input
                  id="checkout-name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="checkout-phone">Phone Number *</Label>
                <Input
                  id="checkout-phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="checkout-email">Email (optional)</Label>
                <Input
                  id="checkout-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <Button
                type="submit"
                variant="black"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Redirecting to payment…
                  </span>
                ) : (
                  `Pay ₹${product.price}`
                )}
              </Button>

              <p className="text-xs text-neutral-400 text-center">
                Secured by Cashfree Payments
              </p>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function ShopPage() {
  const [filter, setFilter] = useState<CategoryFilter>("All");
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(
    null,
  );

  const filtered =
    filter === "All"
      ? shopProducts
      : shopProducts.filter((p) => p.category === filter);

  const filters: { value: CategoryFilter; label: string }[] = [
    { value: "All", label: "All" },
    { value: "Tea", label: "Tea" },
    { value: "Coffee", label: "Coffee" },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold text-neutral-900 mb-3">
            Shop
          </h1>
          <p className="text-neutral-500 text-lg">
            Premium teas and coffees, delivered to your door.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={setSelectedProduct}
            />
          ))}
        </div>
      </div>

      <CheckoutDialog
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
