import { db } from "@/db";
import { b2b_graycup_in_leads } from "@/db/schema";
import { getClientIP } from "./turnstile";

export type LeadKind =
  | "contact"
  | "call-request"
  | "quote-request"
  | "new-product-request"
  | "sample-request"
  | "feedback";

export interface LeadInput {
  kind: LeadKind;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  companySize?: string | null;
  message?: string | null;
  /** The full original submission — stored as JSON for anything not in a column. */
  payload: unknown;
  request: Request;
}

/**
 * Persist a lead-form submission into the shared graycup-orders D1
 * (b2b_graycup_in_leads). Read by the orders-graycup dashboard's /leads page.
 * Never throws — a failed insert must not fail the user's form submission.
 */
export async function insertLead(input: LeadInput): Promise<void> {
  try {
    await db.insert(b2b_graycup_in_leads).values({
      kind: input.kind,
      name: input.name?.toString().trim() || null,
      email: input.email?.toString().trim().toLowerCase() || null,
      phone: input.phone?.toString().trim() || null,
      company: input.company?.toString().trim() || null,
      company_size: input.companySize?.toString().trim() || null,
      message: input.message?.toString().trim() || null,
      payload: JSON.stringify(input.payload ?? null),
      ip: getClientIP(input.request),
      user_agent: input.request.headers.get("user-agent") || null,
    });
  } catch (err) {
    console.error(`insertLead(${input.kind}) failed:`, err);
  }
}
