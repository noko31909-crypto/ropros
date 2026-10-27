/**
 * Checks for cookie-authenticated POST routes. A cross-site page can send a POST that carries the user's
 * cookies only with a "simple" content type, so these two checks together stop CSRF.
 */

/** Exact media type: "text/plain; x=application/json" is not JSON, and it would skip the CORS preflight. */
export function isJsonRequest(req: Request): boolean {
  return req.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() === "application/json";
}

/** Browsers label every request with Sec-Fetch-Site; anything but our own origin is refused. Non-browser clients send none. */
export function isCrossSiteRequest(req: Request): boolean {
  const site = req.headers.get("sec-fetch-site");
  return site !== null && site !== "same-origin";
}
