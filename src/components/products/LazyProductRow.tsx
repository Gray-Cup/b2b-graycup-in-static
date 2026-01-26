"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/products";

type LazyProductRowProps = {
  title: string;
  products: Product[];
};

export function LazyProductRow({ title, products }: LazyProductRowProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasLoaded]);

  return (
    <div ref={containerRef} className="mb-12">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6 font-instrument-sans">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isVisible ? (
          products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))
        ) : (
          products.map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 rounded-lg aspect-square"
            />
          ))
        )}
      </div>
    </div>
  );
}
