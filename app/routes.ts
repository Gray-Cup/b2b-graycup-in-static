import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  // ─── Resource routes (no layout) ──────────────────────────────────────────
  route("products.json", "routes/products.json.ts"),
  route("llms.txt", "routes/llms.txt.ts"),
  ...prefix("feeds", [
    route("products.xml", "routes/feeds/products.xml.ts"),
    route("kr", "routes/feeds/kr.ts"),
  ]),

  ...prefix("api", [
    route("call-request", "routes/api/call-request.ts"),
    route("checkout", "routes/api/checkout.ts"),
    route("contact", "routes/api/contact.ts"),
    route("create-payment", "routes/api/create-payment.ts"),
    route("geo", "routes/api/geo.ts"),
    route("keep-alive", "routes/api/keep-alive.ts"),
    route("new-product-request", "routes/api/new-product-request.ts"),
    route("quote-request", "routes/api/quote-request.ts"),
    route("verify-payment", "routes/api/verify-payment.ts"),
    route("webhooks/feature", "routes/api/webhooks.feature.ts"),
    route("webhooks/feedback", "routes/api/webhooks.feedback.ts"),
  ]),

  // ─── Marketing pages (shared Navbar + Footer layout) ───────────────────────
  layout("routes/_marketing.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("careers", "routes/careers.tsx"),
    route("contact", "routes/contact.tsx"),
    route("feedback", "routes/feedback.tsx"),
    route("new-product-request", "routes/new-product-request.tsx"),
    route("privacy", "routes/privacy.tsx"),
    route("sample-request", "routes/sample-request.tsx"),
    route("sites", "routes/sites.tsx"),
    route("social-responsibility", "routes/social-responsibility.tsx"),
    route("team", "routes/team.tsx"),
    route("terms", "routes/terms.tsx"),
    route("white-label", "routes/white-label.tsx"),

    route("products", "routes/products._index.tsx"),
    route("products/:slug", "routes/products.$slug.tsx"),

    route("locations", "routes/locations._index.tsx"),
    route("locations/:city", "routes/locations.$city.tsx"),

    route("shop", "routes/shop._index.tsx"),
    route("shop/cart", "routes/shop.cart.tsx"),
    route("shop/success", "routes/shop.success.tsx"),
  ]),
] satisfies RouteConfig;
