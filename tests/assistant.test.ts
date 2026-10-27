import { test } from "node:test";
import assert from "node:assert/strict";
import { recentHistory, type ChatTurn } from "../lib/assistant/history.ts";
import { parseAssistantRequest } from "../lib/assistant/request.ts";

test("a normal chat request parses", () => {
  const r = parseAssistantRequest(JSON.stringify({ locale: "ru", guideSlug: "line-follower", messages: [{ role: "user", content: "Почему мотор дёргается?" }] }));
  assert.equal(r.ok, true);
});

test("hostile bodies are refused before any expensive validation", () => {
  const empties = (n: number) => `{"locale":"en","messages":[${Array(n).fill("{}").join(",")}]}`;
  const cases: [string, number][] = [
    [empties(480_000), 413],                      // 1.4 MB of {}: refused on size
    [empties(40_000), 422],                       // 120 KB of {}: refused on count, not walked by zod
    ["{not json", 400],
    [JSON.stringify({ locale: "en", messages: Array(25).fill({ role: "user", content: "x" }) }), 422],
    [JSON.stringify({ locale: "en", messages: [{ role: "assistant", content: "x" }] }), 422],
    [JSON.stringify({ locale: "en", messages: [{ role: "user", content: "x" }], isAdmin: true }), 422],
  ];
  for (const [body, status] of cases) {
    const t0 = performance.now();
    const r = parseAssistantRequest(body);
    const ms = performance.now() - t0;
    assert.equal(r.ok ? 200 : r.status, status);
    assert.ok(ms < 100, `took ${ms.toFixed(0)} ms`);
  }
});

const turn = (role: ChatTurn["role"], n: number): ChatTurn => ({ role, content: "x".repeat(n) });

test("short chats are sent whole", () => {
  const chat = [turn("user", 10), turn("assistant", 10), turn("user", 10)];
  assert.deepEqual(recentHistory(chat, 100), chat);
});

test("oldest turns are dropped once the budget is spent, and history starts on a user turn", () => {
  const chat = [turn("user", 40), turn("assistant", 40), turn("user", 40), turn("assistant", 40), turn("user", 40)];
  const kept = recentHistory(chat, 100);
  assert.equal(kept.length, 1);
  assert.equal(kept[0]?.role, "user");
  const roomier = recentHistory(chat, 130);
  assert.deepEqual(roomier.map((m) => m.role), ["user", "assistant", "user"]);
});

test("the latest question is kept even when it alone is over budget", () => {
  const kept = recentHistory([turn("user", 50), turn("assistant", 50), turn("user", 500)], 100);
  assert.equal(kept.length, 1);
  assert.equal(kept[0]?.content.length, 500);
});

test("a maximal hand-made request is cut to the budget", () => {
  const chat = Array.from({ length: 24 }, (_, i) => turn(i % 2 ? "assistant" : "user", 12_000)).concat(turn("user", 12_000));
  const kept = recentHistory(chat.slice(-24), 24_000);
  assert.ok(kept.reduce((n, m) => n + m.content.length, 0) <= 24_000);
  assert.equal(kept[0]?.role, "user");
});
