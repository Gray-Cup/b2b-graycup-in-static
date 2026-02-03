import { NextResponse } from "next/server";
import { products } from "@/data/products";
import type { Product } from "@/data/products/types";

export const revalidate = 3600;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function mapFeedAvailability(availability: string): string {
  const map: Record<string, string> = {
    in_stock: "in_stock",
    out_of_stock: "out_of_stock",
    preorder: "preorder",
  };
  return map[availability] || "in_stock";
}

function generateProductItem(product: Product, baseUrl: string): string {
  const productUrl = `${baseUrl}/products/${product.slug}`;
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${baseUrl}${product.image}`;

  return `<item>
      <g:id>${escapeXml(product.sku)}</g:id>
      <g:title>${escapeXml(product.name)} - Wholesale ${product.category}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:availability>${mapFeedAvailability(product.availability)}</g:availability>
      <g:price>${product.priceRange.min} INR</g:price>
      <g:brand>${escapeXml(product.brand)}</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>${product.googleProductCategory}</g:google_product_category>
      <g:product_type>${escapeXml(product.category)}${product.categoryTwo ? ` &gt; ${escapeXml(product.categoryTwo)}` : ""}</g:product_type>
      <g:mpn>${escapeXml(product.mpn || product.sku)}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:unit_pricing_measure>1 kg</g:unit_pricing_measure>
      <g:unit_pricing_base_measure>1 kg</g:unit_pricing_base_measure>
      <g:custom_label_0>B2B</g:custom_label_0>
      <g:custom_label_1>${escapeXml(product.category)}</g:custom_label_1>
      <g:custom_label_2>MOQ_${product.minimumOrder.quantity}${product.minimumOrder.unit}</g:custom_label_2>
      <g:custom_label_3>${escapeXml(product.grades[0] || "Standard")}</g:custom_label_3>
    </item>`;
}

function generateProductFeed(products: Product[], baseUrl: string): string {
  const items = products.map((product) => generateProductItem(product, baseUrl));

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Gray Cup B2B - Wholesale Tea and Coffee Products</title>
    <link>${baseUrl}</link>
    <description>Premium wholesale tea and coffee products from India for businesses worldwide.</description>
    ${items.join("\n    ")}
  </channel>
</rss>`;
}

export async function GET() {
  const baseUrl = "https://b2b.graycup.in";

  const xml = generateProductFeed(products, baseUrl);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
