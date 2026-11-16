import "server-only";
import { z } from "zod";

/** The day the privacy policy and the terms last changed (shown at the top of both pages). */
export const LEGAL_UPDATED = "2026-11-16";

/** Public issue tracker: the contact on the legal pages until CONTACT_EMAIL is set. */
export const ISSUES_URL = "https://github.com/noko31909-crypto/ropros/issues";

/**
 * Contact address for privacy requests and reports: the CONTACT_EMAIL environment variable (server only, set it in
 * Vercel). Anything that is not a plain email address is ignored, so a typo never renders as a broken link.
 */
export function contactEmail(): string | null {
  const parsed = z.email().max(120).safeParse(process.env.CONTACT_EMAIL?.trim());
  return parsed.success ? parsed.data : null;
}
