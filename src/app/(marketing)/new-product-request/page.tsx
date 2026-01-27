"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";

const productCategories = [
  { id: "tea", label: "Tea", color: "bg-green-600 border-green-600" },
  { id: "coffee", label: "Coffee", color: "bg-amber-900 border-amber-900" },
  {
    id: "beverages",
    label: "Other Beverages",
    color: "bg-blue-600 border-blue-600",
  },
  { id: "other", label: "Other", color: "bg-neutral-700 border-neutral-700" },
];

export default function NewProductRequestPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const turnstile = useTurnstile();

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-lg mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-black mb-2">
            New Product Request
          </h1>
          <p className="text-muted-foreground">
            Have a product idea or want us to source something specific? Let us
            know.
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" placeholder="Your company name" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Contact Name</Label>
              <Input id="name" placeholder="Your name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Product Category</Label>
            <div className="flex flex-wrap gap-2">
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    selectedCategory === category.id
                      ? `${category.color} text-white`
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productName">Product Name / Description</Label>
            <Input
              id="productName"
              placeholder="e.g., Organic Green Tea, Darjeeling First Flush"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Additional Details</Label>
            <Textarea
              id="details"
              placeholder="Tell us more about the product you're looking for, including quantity, specifications, or any specific requirements..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Estimated Quantity (per month)</Label>
            <Input id="quantity" placeholder="e.g., 100 kg, 500 units" />
          </div>

          <Turnstile
            onVerify={turnstile.handleVerify}
            onError={turnstile.handleError}
            onExpire={turnstile.handleExpire}
          />

          <Button
            type="submit"
            variant="gray"
            className="w-full h-11 rounded-lg mt-4"
            disabled={!turnstile.isVerified}
          >
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  );
}
