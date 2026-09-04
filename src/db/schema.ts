import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

// Cloudflare D1 — the shared "graycup-orders" database (see wrangler.jsonc,
// binding "DB"). Table shapes MUST stay in sync with:
//   - migrations/0001_b2b_graycup_in_leads.sql
//   - migrations/0002_create_b2b_graycup_in_orders.sql
//   - orders-graycup/lib/db/graycup-in-orders.ts (the admin dashboard reads these)

export const b2b_graycup_in_orders = sqliteTable("b2b_graycup_in_orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  created_at: text("created_at").$defaultFn(() => new Date().toISOString()).notNull(),

  // customer
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  country: text("country").notNull().default("IN"),
  pincode: text("pincode").notNull(),
  address: text("address").notNull(),
  state: text("state"),
  gst_or_tax_id: text("gst_or_tax_id"),
  business_type: text("business_type"),

  // order
  order_kind: text("order_kind").notNull(), // "shop" | "sample"
  products: text("products").notNull(), // JSON array
  quantity_tier: text("quantity_tier").notNull().default("mixed"),
  items_detail: text("items_detail"), // JSON [{slug,name,image,tier,grams,price,quantity}]
  total_amount: integer("total_amount").notNull(),

  // cashfree (Payment Links)
  link_id: text("link_id").notNull().unique(),
  cf_link_id: text("cf_link_id"),
  cf_payment_id: text("cf_payment_id"),
  payment_status: text("payment_status").notNull().default("pending"),
  currency: text("currency").notNull().default("INR"),
  charged_amount: real("charged_amount"),
  status_updated_at: text("status_updated_at"),

  // dispatch — set by orders-graycup admin
  carrier: text("carrier"),
  delhivery_waybill: text("delhivery_waybill"),
  delhivery_pickup_date: text("delhivery_pickup_date"),
  shadowfax_request_id: text("shadowfax_request_id"),
  dispatch_status: text("dispatch_status"),
});

export const b2b_graycup_in_leads = sqliteTable("b2b_graycup_in_leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  created_at: text("created_at").$defaultFn(() => new Date().toISOString()).notNull(),
  kind: text("kind").notNull(), // contact | call-request | quote-request | new-product-request | sample-request | feedback
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  company_size: text("company_size"),
  message: text("message"),
  payload: text("payload"), // full JSON of the original submission
  ip: text("ip"),
  user_agent: text("user_agent"),
});
