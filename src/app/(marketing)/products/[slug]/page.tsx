import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getAllProductSlugs } from "@/data/products";
import { PriceCalculator, QuoteRequestForm } from "@/components/products";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} - Gray Cup B2B`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="px-4 lg:px-6">
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-black transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-black font-medium">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Image */}
            <div>
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 sticky top-24">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  draggable={false}
                  className="object-contain p-8"
                  priority
                />
              </div>
            </div>

            {/* Right Column - Calculator First, Then Details */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <Badge
                  variant="secondary"
                  className="mb-3 capitalize bg-gray-100 text-gray-700"
                >
                  {product.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-semibold text-black mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Product Specs - Quick Info */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Price Range
                  </p>
                  <p className="font-semibold">
                    ₹{product.priceRange.min} - ₹{product.priceRange.max}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      {product.priceRange.unit}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Minimum Order
                  </p>
                  <p className="font-semibold">
                    {product.minimumOrder.quantity} {product.minimumOrder.unit}
                  </p>
                </div>
              </div>

              {/* Price Calculator - FIRST */}
              <PriceCalculator product={product} />

              {/* Quote Request Button */}
              <QuoteRequestForm product={product} />

              {/* Accordions for Product Details */}
              <Accordion type="multiple" defaultValue={["description"]}>
                <AccordionItem value="description">
                  <AccordionTrigger>Product Description</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">
                      {product.longDescription}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="grades">
                  <AccordionTrigger>Available Grades</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {product.grades.map((grade) => (
                        <Badge
                          key={grade}
                          variant="outline"
                          className="bg-white"
                        >
                          {grade}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="locations">
                  <AccordionTrigger>Source Locations</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {product.locations.map((location) => (
                        <span
                          key={location}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="packaging">
                  <AccordionTrigger>Packaging Options</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {product.packaging.map((pack) => (
                        <span
                          key={pack}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {pack}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
