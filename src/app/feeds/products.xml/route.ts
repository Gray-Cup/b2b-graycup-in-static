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

// All target countries for Google Merchant Center with their currencies
const TARGET_COUNTRIES: { code: string; currency: string }[] = [
  // India (domestic)
  { code: "IN", currency: "INR" },
  // North America
  { code: "US", currency: "USD" },
  { code: "CA", currency: "CAD" },
  { code: "PA", currency: "USD" },
  // Europe - Eurozone
  { code: "AT", currency: "EUR" },
  { code: "BE", currency: "EUR" },
  { code: "FI", currency: "EUR" },
  { code: "FR", currency: "EUR" },
  { code: "DE", currency: "EUR" },
  { code: "GR", currency: "EUR" },
  { code: "IE", currency: "EUR" },
  { code: "IT", currency: "EUR" },
  { code: "NL", currency: "EUR" },
  { code: "PT", currency: "EUR" },
  { code: "SK", currency: "EUR" },
  { code: "ES", currency: "EUR" },
  // Europe - Non-Eurozone
  { code: "CZ", currency: "CZK" },
  { code: "DK", currency: "DKK" },
  { code: "HU", currency: "HUF" },
  { code: "PL", currency: "PLN" },
  { code: "SE", currency: "SEK" },
  { code: "CH", currency: "CHF" },
  { code: "GB", currency: "GBP" },
  // Eastern Europe
  { code: "GE", currency: "GEL" },
  { code: "RU", currency: "RUB" },
  // Middle East
  { code: "AE", currency: "AED" },
  { code: "IL", currency: "ILS" },
  { code: "KW", currency: "KWD" },
  { code: "LB", currency: "USD" },
  { code: "OM", currency: "OMR" },
  { code: "SA", currency: "SAR" },
  // Asia Pacific
  { code: "AU", currency: "AUD" },
  { code: "HK", currency: "HKD" },
  { code: "JP", currency: "JPY" },
  { code: "KR", currency: "KRW" },
  { code: "MY", currency: "MYR" },
  { code: "PH", currency: "PHP" },
  { code: "SG", currency: "SGD" },
  { code: "TW", currency: "TWD" },
  { code: "TH", currency: "THB" },
];

// Exchange rates from INR (approximate)
const EXCHANGE_RATES: Record<string, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  AED: 0.044,
  KRW: 16.2,
  CAD: 0.016,
  AUD: 0.018,
  JPY: 1.8,
  SGD: 0.016,
  MYR: 0.053,
  THB: 0.42,
  HKD: 0.094,
  TWD: 0.38,
  PHP: 0.67,
  CHF: 0.011,
  SEK: 0.13,
  DKK: 0.082,
  PLN: 0.048,
  CZK: 0.28,
  HUF: 4.5,
  ILS: 0.044,
  SAR: 0.045,
  KWD: 0.0037,
  OMR: 0.0046,
  GEL: 0.033,
  RUB: 1.1,
};

function convertPrice(priceINR: number, currency: string): number {
  const rate = EXCHANGE_RATES[currency] || EXCHANGE_RATES.USD;
  return Math.round(priceINR * rate * 100) / 100;
}

function formatFeedPrice(priceINR: number, currency: string): string {
  const converted = convertPrice(priceINR, currency);
  // Currencies without decimals
  if (["JPY", "KRW", "HUF", "TWD", "INR"].includes(currency)) {
    return `${Math.round(converted)} ${currency}`;
  }
  return `${converted.toFixed(2)} ${currency}`;
}

function generateShippingEntries(): string {
  return TARGET_COUNTRIES.map(
    ({ code, currency }) => `<g:shipping>
        <g:country>${code}</g:country>
        <g:service>${code === "IN" ? "Standard Freight" : "International Freight"}</g:service>
        <g:price>0 ${currency}</g:price>
      </g:shipping>`
  ).join("\n      ");
}

function generateProductItem(product: Product, baseUrl: string): string {
  const productUrl = `${baseUrl}/products/${product.slug}`;
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${baseUrl}${product.image}`;

  const gradesText = product.grades.length > 0 ? ` Available grades: ${product.grades.join(", ")}.` : "";

  return `<item>
      <g:id>${escapeXml(product.sku)}</g:id>
      <g:title>${escapeXml(product.name)} - Wholesale ${product.category}</g:title>
      <g:description>${escapeXml(product.description + gradesText)}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:availability>${mapFeedAvailability(product.availability)}</g:availability>
      <g:price>${formatFeedPrice(product.priceRange.min, "INR")}</g:price>
      <g:brand>${escapeXml(product.brand)}</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>${product.googleProductCategory}</g:google_product_category>
      <g:product_type>${escapeXml(product.category)}${product.categoryTwo ? ` &gt; ${escapeXml(product.categoryTwo)}` : ""}</g:product_type>
      <g:mpn>${escapeXml(product.mpn || product.sku)}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:unit_pricing_measure>1 kg</g:unit_pricing_measure>
      <g:unit_pricing_base_measure>1 kg</g:unit_pricing_base_measure>
      ${generateShippingEntries()}
      <g:custom_label_0>B2B</g:custom_label_0>
      <g:custom_label_1>${escapeXml(product.category)}</g:custom_label_1>
      <g:custom_label_2>MOQ_${product.minimumOrder.quantity}${product.minimumOrder.unit}</g:custom_label_2>
      <g:custom_label_3>${escapeXml(product.grades[0] || "Standard")}</g:custom_label_3>
      <g:custom_label_4>${escapeXml(product.grades.join(", "))}</g:custom_label_4>
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
