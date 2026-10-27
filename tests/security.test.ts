import { test } from "node:test";
import assert from "node:assert/strict";
import { redactSecrets } from "../lib/assistant/redact.ts";
import { isCrossSiteRequest, isJsonRequest } from "../lib/request-guard.ts";

const TG = "123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw1";

test("secrets in sketches are masked, the rest of the code is kept", () => {
  const sketch = [
    'const char* ssid = "HomeNet";',
    'const char* password = "MyHomeWifi2024";',
    '#define WIFI_PASSWORD "hunter22"',
    `#define BOT_TOKEN "${TG}"`,
    'WiFi.begin("HomeNet", "s3cret-pass");',
    'WiFi.begin(ssid, "abc12345");',
    'Serial.println("Hello");',
  ].join("\n");
  const out = redactSecrets(sketch);
  assert.match(out, /ssid = "HomeNet"/);
  assert.match(out, /password = "\[redacted\]"/);
  assert.match(out, /WIFI_PASSWORD "\[redacted\]"/);
  assert.match(out, /BOT_TOKEN "\[redacted\]"/);
  assert.match(out, /WiFi\.begin\("HomeNet", "\[redacted\]"\)/);
  assert.match(out, /WiFi\.begin\(ssid, "\[redacted\]"\)/);
  assert.match(out, /Serial\.println\("Hello"\)/);
  for (const secret of ["MyHomeWifi2024", "hunter22", TG, "s3cret-pass", "abc12345"]) assert.ok(!out.includes(secret), secret);
});

test("well-known key shapes and emails are masked anywhere in prose", () => {
  const out = redactSecrets(`my bot is ${TG}, key sk-ant-api03-abcdefghijklmnopqrstuvwxyz, {"apiKey": "AIzaSyD-1234567890abcdefghijklmnopqrstu"}, mail jane.doe@example.com`);
  assert.ok(!out.includes(TG));
  assert.ok(!out.includes("sk-ant-api03"));
  assert.ok(!out.includes("AIzaSyD"));
  assert.ok(out.includes("[email]") && !out.includes("jane.doe@"));
});

test("ordinary text is left alone", () => {
  const text = 'digitalWrite(LED, HIGH); const char* name = "robot"; The ESP32 runs at 3.3 V.';
  assert.equal(redactSecrets(text), text);
});

test("masking stays fast on hostile 24k-character input", () => {
  const inputs = ["a".repeat(24_000), "a.".repeat(12_000), "pass".repeat(6_000), 'a"'.repeat(12_000),
    `password "${"x".repeat(24_000)}`, " ".repeat(24_000), "eyJ".repeat(8_000), "x@".repeat(12_000), "a@b.".repeat(6_000)];
  for (const input of inputs) {
    const t0 = performance.now();
    redactSecrets(input);
    const ms = performance.now() - t0;
    assert.ok(ms < 150, `${input.slice(0, 12)}… took ${ms.toFixed(0)} ms`);
  }
});

const req = (headers: Record<string, string>) => new Request("http://localhost/api/progress", { method: "POST", headers });

test("only an exact application/json content type counts as JSON", () => {
  assert.equal(isJsonRequest(req({ "content-type": "application/json" })), true);
  assert.equal(isJsonRequest(req({ "content-type": "application/json; charset=utf-8" })), true);
  assert.equal(isJsonRequest(req({ "content-type": "text/plain; x=application/json" })), false);
  assert.equal(isJsonRequest(req({ "content-type": "application/jsonp" })), false);
  assert.equal(isJsonRequest(req({})), false);
});

test("browser requests from other sites are refused, our own pages and non-browser clients are not", () => {
  assert.equal(isCrossSiteRequest(req({})), false);
  assert.equal(isCrossSiteRequest(req({ "sec-fetch-site": "same-origin" })), false);
  assert.equal(isCrossSiteRequest(req({ "sec-fetch-site": "same-site" })), true);
  assert.equal(isCrossSiteRequest(req({ "sec-fetch-site": "cross-site" })), true);
});
