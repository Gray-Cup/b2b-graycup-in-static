import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// workers/app.ts stashes the D1 binding on globalThis.DB per request so
// modules imported outside the router context can reach it.
export function getDb(d1Binding?: D1Database) {
  const d1 = d1Binding ?? (globalThis as unknown as { DB?: D1Database }).DB;
  if (!d1) {
    throw new Error("D1 binding 'DB' is not available in this execution context");
  }
  return drizzle(d1, { schema });
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
