/**
 * Masks secrets and email addresses in chat text before it is sent to an AI provider.
 * Every pattern is bounded, so hostile input cannot make the regex engine backtrack for seconds.
 */

const MASK = "[redacted]";

// Quoted values assigned to names that look secret: password = "…", #define WIFI_PASS "…", "apiKey": "…".
const ASSIGNMENT = /\b([A-Za-z_][\w.]{0,63})(["']?\s{0,8}[:=]?\s{0,8}(?:F\(|PSTR\()?)(["'])([^"'\n]{3,200})\3/g;
const SECRET_NAME = /pass|pwd|psk|secret|token|api_?key|auth|private_?key|access_?key|credential/i;
// WiFi.begin("network", "password") and WiFi.begin(ssid, "password").
const WIFI_BEGIN = /(WiFi\.begin\(\s{0,8}(?:"[^"\n]{0,64}"|[A-Za-z_]\w{0,63})\s{0,8},\s{0,8})(["'])([^"'\n]{1,200})\2/g;

const TOKENS = [
  /-----BEGIN [A-Z ]{0,40}PRIVATE KEY-----[\s\S]{0,8000}?-----END [A-Z ]{0,40}PRIVATE KEY-----/g,
  /\b\d{8,10}:[A-Za-z0-9_-]{35}\b/g,                                         // Telegram bot token
  /\bsk-[A-Za-z0-9_-]{20,200}/g,                                             // OpenAI, Anthropic, OpenRouter keys
  /\b(?:gh[pousr]_[A-Za-z0-9]{30,100}|github_pat_[A-Za-z0-9_]{20,200})/g,   // GitHub tokens
  /\bAIza[0-9A-Za-z_-]{35}\b/g,                                              // Google API key
  /\bAKIA[0-9A-Z]{16}\b/g,                                                   // AWS access key id
  /\bxox[abprs]-[A-Za-z0-9-]{10,200}/g,                                      // Slack token
  /\b(?:sbp|sb_secret)_[A-Za-z0-9_-]{20,200}/g,                              // Supabase keys
  /\beyJ[A-Za-z0-9_-]{8,2000}\.[A-Za-z0-9_-]{8,4000}\.[A-Za-z0-9_-]{8,2000}/g, // JWT
];
const EMAIL = /\b[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9-]{1,63}(?:\.[A-Za-z0-9-]{1,63}){0,8}\.[A-Za-z]{2,24}\b/g;

export function redactSecrets(text: string): string {
  let out = text
    .replace(ASSIGNMENT, (whole, name: string, sep: string, q: string) => (SECRET_NAME.test(name) ? `${name}${sep}${q}${MASK}${q}` : whole))
    .replace(WIFI_BEGIN, (_whole, head: string, q: string) => `${head}${q}${MASK}${q}`);
  for (const pattern of TOKENS) out = out.replace(pattern, MASK);
  return out.replace(EMAIL, "[email]");
}
