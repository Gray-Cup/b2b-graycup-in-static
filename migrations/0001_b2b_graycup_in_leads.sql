CREATE TABLE IF NOT EXISTS b2b_graycup_in_leads (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  kind         TEXT NOT NULL,            -- contact | call-request | quote-request | new-product-request | sample-request
  name         TEXT,
  email        TEXT,
  phone        TEXT,
  company      TEXT,
  company_size TEXT,
  message      TEXT,
  payload      TEXT,                     -- full JSON of the original submission
  ip           TEXT,
  user_agent   TEXT
);
CREATE INDEX IF NOT EXISTS idx_b2b_graycup_in_leads_kind ON b2b_graycup_in_leads(kind);
