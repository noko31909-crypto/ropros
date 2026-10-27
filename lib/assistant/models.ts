const MODEL_ID = /^[\w.-]+\/[\w.:-]+$/;

/**
 * OPENROUTER_MODEL: one model id or several separated by commas, e.g. "vendor/main,vendor/backup".
 * The first is the primary; the rest are tried in order when it is unavailable. Malformed ids are dropped.
 */
export function configuredModels(value: string | undefined): string[] {
  const ids = (value ?? "").split(",").map((m) => m.trim()).filter((m) => MODEL_ID.test(m));
  return [...new Set(ids)];
}
