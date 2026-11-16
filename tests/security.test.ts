import { test } from "node:test";
import assert from "node:assert/strict";
import { isCrossSiteRequest, isJsonRequest } from "../lib/request-guard.ts";

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
