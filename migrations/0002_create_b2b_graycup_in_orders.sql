-- Migration number: 0002 	 2026-09-04
-- Shop + sample-request orders for b2b.graycup.in. Cashfree Payment Links
-- (30-min expiry). payment_status is flipped to 'paid' by the site's
-- /api/webhooks/cashfree route; the orders-graycup dashboard reads this table
-- on its dedicated "GrayCup B2B" page and manages carrier / waybill / dispatch.
-- Separate from graycup-in-storefront (B2C, storefront_* tables).
CREATE TABLE IF NOT EXISTS b2b_graycup_in_orders (
  id                     INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at             TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),

  -- customer
  name                   TEXT NOT NULL,
  phone                  TEXT NOT NULL,
  email                  TEXT,
  country                TEXT NOT NULL DEFAULT 'IN',
  pincode                TEXT NOT NULL,
  address                TEXT NOT NULL,
  state                  TEXT,
  gst_or_tax_id          TEXT,
  business_type          TEXT,

  -- order
  order_kind             TEXT NOT NULL,            -- 'shop' | 'sample'
  products               TEXT NOT NULL,            -- JSON array
  quantity_tier          TEXT NOT NULL DEFAULT 'mixed',
  items_detail           TEXT,                     -- JSON [{slug,name,image,tier,grams,price,quantity}]
  total_amount           INTEGER NOT NULL,

  -- cashfree (Payment Links)
  link_id                TEXT NOT NULL UNIQUE,
  cf_link_id             TEXT,
  cf_payment_id          TEXT,
  payment_status         TEXT NOT NULL DEFAULT 'pending',
  currency               TEXT NOT NULL DEFAULT 'INR',
  charged_amount         REAL,
  status_updated_at      TEXT,

  -- dispatch (set by orders-graycup admin)
  carrier                TEXT,
  delhivery_waybill      TEXT,
  delhivery_pickup_date  TEXT,
  shadowfax_request_id   TEXT,
  dispatch_status        TEXT
);

CREATE INDEX IF NOT EXISTS idx_b2b_graycup_in_orders_created_at ON b2b_graycup_in_orders (created_at);
CREATE INDEX IF NOT EXISTS idx_b2b_graycup_in_orders_payment_status ON b2b_graycup_in_orders (payment_status);
