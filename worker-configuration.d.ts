// Minimal ambient env typing. Regenerate with `npm run cf-typegen` once wrangler
// is installed and you're authed to the Cloudflare account.
interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  SITE_URL: string;
  CASHFREE_CLIENT_ID: string;
  CASHFREE_CLIENT_SECRET: string;
  CASHFREE_ENV?: string;
  TURNSTILE_SECRET_KEY: string;
  NEXT_PUBLIC_TURNSTILE_SITE_KEY?: string;
  VITE_TURNSTILE_SITE_KEY?: string;
  NEXT_PUBLIC_IPINFO_TOKEN?: string;
  DISCORD_FEATURE_WEBHOOK_URL?: string;
  DISCORD_FEEDBACK_WEBHOOK_URL?: string;
  CONTACT_WEBHOOK_URL?: string;
}
