import { useEffect } from "react";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import RootProviders from "@/components/providers";
import { WhatsappWidget } from "@/components/whatsapp-widget";
import { Floating } from "@/components/floating";
import { OrganizationSchema } from "@/components/seo";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

const SITE_URL = "https://b2b.graycup.in";

export function meta() {
  const title = "B2B Gray Cup";
  const description =
    "We sell indian tea, coffee and matcha to people who care about quality.";
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: "B2B Gray Cup" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${SITE_URL}/og.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: `${SITE_URL}/og.png` },
    { name: "p:domain_verify", content: "263c83126f8d79bccabc00711d8d80c6" },
  ];
}

export function links() {
  return [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "icon", href: "/icon-light.svg", media: "(prefers-color-scheme: light)" },
    { rel: "icon", href: "/icon-dark.svg", media: "(prefers-color-scheme: dark)" },
    { rel: "apple-touch-icon", href: "/icon-light.svg", media: "(prefers-color-scheme: light)" },
    { rel: "apple-touch-icon", href: "/icon-dark.svg", media: "(prefers-color-scheme: dark)" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Instrument+Sans:wght@400;500;600;700&family=Public+Sans:wght@400;500;600;700&display=swap",
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const canonicalPath = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";

  return (
    <html lang="en" className="bg-white">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light" />
        <link rel="canonical" href={`${SITE_URL}${canonicalPath}`} />
        <Meta />
        <Links />
        <style
          dangerouslySetInnerHTML={{
            __html:
              ":root{--font-sans:'Inter',sans-serif;--font-poppins:'Poppins',sans-serif;--font-mono:'Inter',monospace;--font-instrument-sans:'Instrument Sans',sans-serif;--font-public-sans:'Public Sans',sans-serif;}",
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2X266LTV9Z"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-2X266LTV9Z');",
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "font-sans",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-0 h-2 bg-white"
        />
        <OrganizationSchema />
        <RootProviders>{children}</RootProviders>
        <WhatsappWidget />
        <Floating />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export async function action() {
  return new Response("Method Not Allowed", { status: 405 });
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  useEffect(() => {
    if (!is404) console.error(error);
  }, [error, is404]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-20 lg:px-6">
        <div className="my-16 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100">
            <span className="text-4xl font-bold text-neutral-400">
              {is404 ? "404" : "500"}
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-semibold text-neutral-800">
            {is404 ? "You seem lost bro" : "Something broke"}
          </h1>
          <p className="mx-auto mb-8 max-w-md text-lg text-muted-foreground">
            {is404
              ? "This page doesn't exist but you should play with our features."
              : "A server error occurred. Try again in a moment."}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="lightgray" size="lg" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
