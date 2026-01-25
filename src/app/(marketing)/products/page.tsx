"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Product = {
  name: string;
  image: string;
  description: string;
  details: string[];
  locations: string[];
};

const products: Product[] = [
  {
    name: "CTC Tea",
    image: "/products/ctc-tea.png",
    description:
      "Premium CTC (Crush, Tear, Curl) black tea with a robust flavor profile and rich, malty taste.",
    details: [
      "Strong and full-bodied flavor",
      "Perfect for milk tea",
      "Quick brewing time",
      "Rich in antioxidants",
    ],
    locations: ["Assam", "Darjeeling", "Nilgiri", "Dooars"],
  },
  {
    name: "Loose Leaf Tea",
    image: "/products/loose-leaf-tea.png",
    description:
      "Artisanal loose leaf tea with whole leaves that unfurl beautifully, delivering a delicate and aromatic experience.",
    details: [
      "Whole leaf quality",
      "Complex flavor notes",
      "Multiple infusions possible",
      "Natural and unprocessed",
    ],
    locations: ["Darjeeling", "Assam", "Kangra", "Munnar"],
  },
  {
    name: "Green Coffee Beans",
    image: "/products/green-coffee-beans.png",
    description:
      "Unroasted green coffee beans with potential health benefits and perfect for home roasting enthusiasts.",
    details: [
      "High chlorogenic acid content",
      "Customizable roast levels",
      "Fresh and natural",
      "Rich in antioxidants",
    ],
    locations: ["Coorg", "Chikmagalur", "Wayanad", "Araku Valley"],
  },
  {
    name: "Roasted Coffee Beans",
    image: "/products/roasted-coffee-beans.png",
    description:
      "Expertly roasted coffee beans with a perfect balance of aroma, flavor, and body for the ultimate coffee experience.",
    details: [
      "Medium to dark roast",
      "Rich, bold flavor",
      "Aromatic and fresh",
      "Perfect for espresso or filter",
    ],
    locations: ["Chikmagalur", "Coorg", "Wayanad", "Bababudangiri"],
  },
  {
    name: "Ground Coffee",
    image: "/products/ground-coffee.png",
    description:
      "Freshly ground coffee powder ready to brew, delivering convenience without compromising on quality and taste.",
    details: [
      "Ready to brew",
      "Consistent grind size",
      "Rich aroma",
      "Versatile brewing methods",
    ],
    locations: ["Wayanad", "Chikmagalur", "Coorg", "Araku Valley"],
  },
  {
    name: "Matcha Tea",
    image: "/products/matcha-tea.png",
    description:
      "Premium grade matcha powder with vibrant green color, offering sustained energy and numerous health benefits.",
    details: [
      "Ceremonial grade quality",
      "High L-theanine content",
      "Sustained energy boost",
      "Rich in catechins",
    ],
    locations: ["Uji, Kyoto", "Nishio, Aichi"],
  },
];

function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) {
  return (
    <Card
      className="overflow-hidden border border-gray-200 rounded-lg bg-white p-0 cursor-pointer transition-colors hover:border-gray-300"
      onClick={onClick}
    >
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
        <h3 className="text-md font-semibold text-black">
          {product.name}
        </h3>
      </div>
    </Card>
  );
}

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  return (
    <div className="px-4 lg:px-6">
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold text-black mb-4">
              Our Products
            </h1>
            <p className="text-lg text-muted-foreground">
              Premium quality tea and coffee selections
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                onClick={() => {
                  setSelectedProduct(product);
                  setOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
        }}
      >
        <DialogContent
          forceMount
          className="max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl pr-8">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="md:w-2/5">
                  <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      draggable={false}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-3/5 flex flex-col gap-4">
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">
                      Locations:
                    </span>
                    <span>
                      {selectedProduct.locations.join(", ")}
                    </span>
                  </div>

                  <p className="text-base text-gray-700 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-sm mb-3 text-black">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.details.map(
                        (detail, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <svg
                              className="w-5 h-5 shrink-0 text-green-600 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>{detail}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
