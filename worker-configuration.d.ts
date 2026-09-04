// Minimal ambient env typing. Regenerate with `npm run cf-typegen` once wrangler
// is installed and you're authed to the Cloudflare account.
interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  SITE_URL: string;
  CASHFREE_CLIENT_ID: string;
  CASHFREE_CLIENT_SECRET: string;
  SUPABASE_URL: string;
  SUPABASE_SECRET_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  TURNSTILE_SECRET_KEY: string;
  NEXT_PUBLIC_TURNSTILE_SITE_KEY?: string;
  NEXT_PUBLIC_IPINFO_TOKEN?: string;
}
