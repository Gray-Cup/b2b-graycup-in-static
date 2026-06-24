import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { bulkCities, getCityBySlug, getRelatedCities } from "@/data/bulk-cities";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return bulkCities.map((c) => ({ city: c.citySlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) return { title: "Not Found" };
  return {
    title: `Bulk Tea & Coffee Supplier in ${data.city}, ${data.state} — B2B Gray Cup`,
    description: `Wholesale bulk CTC tea, green coffee, and roasted coffee for ${data.city} businesses. Hotels, corporate offices, café chains, and distributors. GST invoice. MOQ ${data.moq}.`,
    alternates: { canonical: `/locations/${city}` },
    openGraph: {
      title: `Bulk Tea & Coffee Supplier in ${data.city} — B2B Gray Cup`,
      description: `Wholesale bulk tea and coffee for ${data.city}. Delivery in ${data.transitDays}. GST invoice.`,
      url: `https://b2b.graycup.in/locations/${city}`,
    },
  };
}

export default async function LocationCityPage({ params }: Props) {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) notFound();

  const related = getRelatedCities(city);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://b2b.graycup.in" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://b2b.graycup.in/locations" },
      { "@type": "ListItem", position: 3, name: data.city, item: `https://b2b.graycup.in/locations/${city}` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "B2B Gray Cup",
    description: `Wholesale bulk tea and coffee supplier serving ${data.city}`,
    url: `https://b2b.graycup.in/locations/${city}`,
    areaServed: { "@type": "City", name: data.city },
    telephone: "+918527914317",
    email: "graycup.enterprises@gmail.com",
  };

  return (
    <div className="min-h-screen py-20 px-4 lg:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-neutral-900 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-neutral-900">{data.city}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* Heading */}
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-black mb-3">
                Bulk Tea & Coffee Supplier in {data.city}
              </h1>
              <p className="text-lg text-neutral-600">
                {data.state} · Delivery in {data.transitDays} · MOQ {data.moq}
              </p>
            </div>

            {/* City Context */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-3">
                Supplying {data.city}
              </h2>
              <p className="text-neutral-700 leading-relaxed">{data.cityContext}</p>
            </section>

            {/* Products */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                Products Available in {data.city}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.products.map((product) => (
                  <div
                    key={product}
                    className="bg-neutral-50 border border-neutral-200 rounded-lg p-4"
                  >
                    <p className="font-medium text-neutral-900">{product}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Buyer Types */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                Who We Serve in {data.city}
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.buyerTypes.map((bt) => (
                  <span
                    key={bt}
                    className="text-sm font-medium px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-full"
                  >
                    {bt}
                  </span>
                ))}
              </div>
            </section>

            {/* FAQs */}
            {data.faqs.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-black mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-5">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className="border-l-2 border-neutral-300 pl-5">
                      <h3 className="font-semibold text-neutral-900 mb-1.5">{faq.question}</h3>
                      <p className="text-neutral-600 leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Quick Info */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5">
              <h3 className="font-semibold text-neutral-900 mb-4">Delivery to {data.city}</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-neutral-500">Transit Time</dt>
                  <dd className="font-medium text-neutral-900">{data.transitDays}</dd>
                </div>
                <div className="flex justify-between border-t border-neutral-100 pt-3">
                  <dt className="text-neutral-500">Min. Order</dt>
                  <dd className="font-medium text-neutral-900">{data.moq}</dd>
                </div>
                <div className="flex justify-between border-t border-neutral-100 pt-3">
                  <dt className="text-neutral-500">GST Invoice</dt>
                  <dd className="font-medium text-neutral-900">Yes, always</dd>
                </div>
                <div className="flex justify-between border-t border-neutral-100 pt-3">
                  <dt className="text-neutral-500">Packaging</dt>
                  <dd className="font-medium text-neutral-900">10 kg – 50 kg bags</dd>
                </div>
              </dl>
              <div className="mt-5 space-y-2">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-black text-white font-medium py-2.5 rounded-lg hover:bg-neutral-800 transition-colors text-sm"
                >
                  Request a Quote
                </Link>
                <Link
                  href="https://wa.me/918527914317"
                  target="_blank"
                  className="block w-full text-center border border-neutral-300 text-neutral-700 font-medium py-2.5 rounded-lg hover:bg-neutral-50 transition-colors text-sm"
                >
                  WhatsApp
                </Link>
              </div>
            </div>

            {/* Nearby Areas */}
            {data.nearbyAreas.length > 0 && (
              <div className="bg-white rounded-xl border border-neutral-200 p-5">
                <h3 className="font-semibold text-neutral-900 mb-3">Also Serving Nearby</h3>
                <div className="flex flex-wrap gap-2">
                  {data.nearbyAreas.map((area) => (
                    <span
                      key={area}
                      className="text-xs text-neutral-600 border border-neutral-200 px-2.5 py-1 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* View Products */}
            <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-5">
              <h3 className="font-semibold text-neutral-900 mb-2">Browse Products</h3>
              <p className="text-sm text-neutral-600 mb-4">
                View our full catalogue of bulk tea, coffee, and spices.
              </p>
              <Link
                href="/shop"
                className="block w-full text-center border border-neutral-300 text-neutral-700 font-medium py-2 rounded-lg hover:bg-neutral-100 transition-colors text-sm"
              >
                View Shop
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Cities */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-neutral-200">
            <h2 className="text-xl font-semibold text-black mb-6">Other Cities We Supply</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((rc) => (
                <Link
                  key={rc.citySlug}
                  href={`/locations/${rc.citySlug}`}
                  className="group block bg-white rounded-xl border border-neutral-200 p-4 hover:border-neutral-400 hover:shadow-sm transition-all"
                >
                  <h3 className="font-semibold text-neutral-900 group-hover:text-black text-sm">
                    {rc.city}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">{rc.state}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{rc.transitDays}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
