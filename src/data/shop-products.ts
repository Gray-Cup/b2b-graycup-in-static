export type ShopProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Tea" | "Coffee";
  weight: string;
  badge?: string;
};

export const shopProducts: ShopProduct[] = [
  {
    id: "ctc-tea-100g",
    name: "CTC Tea",
    description:
      "Bold, malty Assam CTC tea built for strong brews and masala chai.",
    price: 199,
    image: "/products/ctc-tea.png",
    category: "Tea",
    weight: "100g",
    badge: "Popular",
  },
  {
    id: "loose-leaf-tea-100g",
    name: "Loose Leaf Tea",
    description:
      "Whole leaf Darjeeling with a light, floral character. Best brewed at 85°C.",
    price: 349,
    image: "/products/loose-leaf-tea.png",
    category: "Tea",
    weight: "100g",
    badge: "Premium",
  },
  {
    id: "matcha-50g",
    name: "Matcha",
    description:
      "Ceremonial grade matcha. Vibrant green, smooth umami, zero bitterness.",
    price: 799,
    image: "/products/matcha-tea.png",
    category: "Tea",
    weight: "50g",
  },
  {
    id: "green-coffee-250g",
    name: "Green Coffee Beans",
    description:
      "Unroasted single origin beans from Coorg. Roast to your own profile.",
    price: 599,
    image: "/products/green-coffee-beans.png",
    category: "Coffee",
    weight: "250g",
  },
  {
    id: "roasted-coffee-250g",
    name: "Roasted Coffee Beans",
    description:
      "Dark roast from Chikmagalur estates. Rich, bold, espresso-ready.",
    price: 549,
    image: "/products/roasted-coffee-beans.png",
    category: "Coffee",
    weight: "250g",
    badge: "Bestseller",
  },
  {
    id: "ground-coffee-250g",
    name: "Ground Coffee",
    description:
      "Medium roast, freshly ground and nitrogen-flushed for peak freshness.",
    price: 499,
    image: "/products/ground-coffee.png",
    category: "Coffee",
    weight: "250g",
  },
];
