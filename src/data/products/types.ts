export type Product = {
  slug: string;
  name: string;
  image: string;
  description: string;
  longDescription: string;
  details: string[];
  locations: string[];
  category: "tea" | "coffee";
  priceRange: {
    min: number;
    max: number;
    unit: string;
  };
  minimumOrder: {
    quantity: number;
    unit: string;
  };
  grades: string[];
  packaging: string[];
};
