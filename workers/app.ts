import {
  RouterContextProvider,
  createRequestHandler,
} from "react-router";
import { cloudflareContext } from "@/lib/cloudflare-context";

export { cloudflareContext };

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    // Expose the D1 binding to modules imported outside the router context.
    (globalThis as unknown as { DB?: D1Database }).DB = env.DB;

    const routerContext = new RouterContextProvider();
    routerContext.set(cloudflareContext, { env, ctx });

    const response = await requestHandler(request, routerContext);

    // Dynamic SSR (HTML + loader data) must never be cached — a stale document
    // embeds content-hashed asset URLs that 404 after the next deploy. Static
    // assets are served by the ASSETS binding, not here.
    if (!response.headers.has("Cache-Control")) {
      response.headers.set("Cache-Control", "no-store");
    }

    return response;
  },
} satisfies ExportedHandler<Env>;
