import type { Metadata } from "next";
import Link from "next/link";
import { bulkCities } from "@/data/bulk-cities";

export const metadata: Metadata = {
  title: "Bulk Tea & Coffee Supplier by City — B2B Gray Cup",
  description:
    "Gray Cup supplies bulk CTC tea, green coffee, roasted coffee, and loose-leaf tea to businesses across 16+ Indian cities. Cafés, hotels, corporate offices, and distributors.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Bulk Tea & Coffee Supplier by City — B2B Gray Cup",
    description:
      "Wholesale bulk tea and coffee for businesses across India. Delhi, Mumbai, Bengaluru, Hyderabad, and 12 more cities.",
    url: "https://b2b.graycup.in/locations",
  },
};

const PRODUCTS = ["Bulk CTC Tea", "Green Coffee Beans", "Roasted Coffee", "Loose Leaf Tea"];

export default function LocationsPage() {
  return (
    <div className="min-h-screen py-20 px-4 lg:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <span>/</span>
            <span>Locations</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-black mb-3">
            Bulk Tea & Coffee by City
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            We supply bulk CTC tea, green coffee, roasted coffee, and loose-leaf tea to businesses
            across India. Select your city to see delivery timelines, product availability, and
            local buyer information.
          </p>
        </div>

        {/* Product Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {PRODUCTS.map((p) => (
            <span
              key={p}
              className="text-xs font-medium px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-full"
            >
              {p}
            </span>
          ))}
        </div>

        {/* City Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bulkCities.map((city) => (
            <Link
              key={city.citySlug}
              href={`/locations/${city.citySlug}`}
              className="group block bg-white rounded-xl border border-neutral-200 p-5 hover:border-neutral-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="font-semibold text-neutral-900 group-hover:text-black text-base">
                  {city.city}
                </h2>
                <span className="text-[11px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full shrink-0">
                  {city.transitDays}
                </span>
              </div>
              <p className="text-sm text-neutral-500 mb-3">{city.state}</p>
              <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2">
                {city.cityContext}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {city.products.slice(0, 2).map((p) => (
                  <span
                    key={p}
                    className="text-[11px] text-neutral-500 border border-neutral-200 px-2 py-0.5 rounded"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-neutral-50 rounded-2xl border border-neutral-200 text-center">
          <h2 className="text-xl font-semibold text-black mb-2">Your City Not Listed?</h2>
          <p className="text-neutral-600 mb-5 max-w-xl mx-auto">
            We deliver bulk tea and coffee across 500+ locations in India. Contact us for delivery
            availability and pricing in your city.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-black text-white font-medium px-5 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors text-sm"
            >
              Get in Touch
            </Link>
            <Link
              href="https://wa.me/918527914317"
              target="_blank"
              className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-700 font-medium px-5 py-2.5 rounded-lg hover:bg-neutral-100 transition-colors text-sm"
            >
              WhatsApp Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
