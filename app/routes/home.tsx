import { Link } from "react-router";

// Placeholder home page so the app builds while the marketing pages are
// ported from src/app/(marketing)/**. Replace with the real port of
// src/app/(marketing)/page.tsx.
export function meta() {
  return [
    { title: "B2B Gray Cup — Indian Tea, Coffee & Matcha" },
    { name: "description", content: "Wholesale Indian tea, coffee and matcha for businesses that care about quality." },
  ];
}

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold text-black">B2B Gray Cup</h1>
      <p className="text-muted-foreground">
        We sell Indian tea, coffee and matcha to people who care about quality.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/sample-request" className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white">
          Request Samples
        </Link>
        <Link to="/contact" className="rounded-md border px-5 py-2.5 text-sm font-medium">
          Contact Us
        </Link>
      </div>
    </main>
  );
}
