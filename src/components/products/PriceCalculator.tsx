"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/data/products";

type PriceCalculatorProps = {
  product: Product;
};

export function PriceCalculator({ product }: PriceCalculatorProps) {
  const [quantity, setQuantity] = useState(product.minimumOrder.quantity);
  const [selectedGrade, setSelectedGrade] = useState(product.grades[0]);

  const gradeMultiplier = useMemo(() => {
    const index = product.grades.indexOf(selectedGrade);
    const total = product.grades.length;
    // Higher grade index = lower price (premium grades are listed first)
    return 1 - (index / total) * 0.3;
  }, [selectedGrade, product.grades]);

  const estimatedPrice = useMemo(() => {
    const basePrice = (product.priceRange.min + product.priceRange.max) / 2;
    const adjustedPrice = basePrice * gradeMultiplier;
    return adjustedPrice * quantity;
  }, [quantity, gradeMultiplier, product.priceRange]);

  const unitPrice = useMemo(() => {
    const basePrice = (product.priceRange.min + product.priceRange.max) / 2;
    return basePrice * gradeMultiplier;
  }, [gradeMultiplier, product.priceRange]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(Math.max(0, value));
  };

  const isAboveMinimum = quantity >= product.minimumOrder.quantity;

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Price Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="grade">Select Grade</Label>
          <select
            id="grade"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {product.grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">
            Quantity ({product.minimumOrder.unit})
          </Label>
          <Input
            id="quantity"
            type="number"
            min={0}
            value={quantity}
            onChange={handleQuantityChange}
            placeholder={`Min: ${product.minimumOrder.quantity}`}
          />
          {!isAboveMinimum && quantity > 0 && (
            <p className="text-sm text-red-500">
              Minimum order: {product.minimumOrder.quantity}{" "}
              {product.minimumOrder.unit}
            </p>
          )}
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Unit Price:</span>
            <span className="font-medium">
              ₹{unitPrice.toFixed(2)} {product.priceRange.unit}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Quantity:</span>
            <span className="font-medium">
              {quantity} {product.minimumOrder.unit}
            </span>
          </div>
          <div className="flex justify-between text-lg font-semibold border-t pt-3">
            <span>Estimated Total:</span>
            <span className="text-green-600">
              ₹
              {estimatedPrice.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          * Prices are indicative. Final pricing depends on quantity, quality
          inspection, and market conditions. Request a quote for accurate
          pricing.
        </p>
      </CardContent>
    </Card>
  );
}
