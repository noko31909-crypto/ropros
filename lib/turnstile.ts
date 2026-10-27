/**
 * Cloudflare Turnstile site key for the sign-in and sign-up form. Public by design: every visitor's browser sees it.
 * The secret key lives only in Supabase (Authentication → Attack Protection), never in this repo.
 */
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "0x4AAAAAAFoqD38p55Ptq1wH";

export const TURNSTILE_ORIGIN = "https://challenges.cloudflare.com";
