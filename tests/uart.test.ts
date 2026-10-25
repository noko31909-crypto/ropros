import { test } from "node:test";
import assert from "node:assert/strict";
import { checkCircuit } from "../lib/hardware/check.ts";
import { getComponent } from "../lib/hardware/components.ts";
import { guide } from "./fixtures/guides.ts";

const gps = (tx: string, rx: string) => guide("arduino-uno", [{ id: "gps", component: "neo-6m-gps" }],
  [["gps.VCC", "board.5V"], ["gps.GND", "board.GND"], ["gps.TX", tx]], `const int RXP = ${rx};`);

test("UART crosses over: GPS TX on the Uno hardware RX (D0) is accepted", () => {
  const is = checkCircuit(gps("board.D0", "0"), getComponent);
  assert.ok(!is.some((i) => i.code === "missing_capability"), JSON.stringify(is, null, 2));
});

test("UART on plain Uno pins is SoftwareSerial: a warning, not an error", () => {
  const is = checkCircuit(gps("board.D4", "4"), getComponent);
  assert.ok(!is.some((i) => i.level === "error" && i.code === "missing_capability"), JSON.stringify(is, null, 2));
  assert.ok(is.some((i) => i.code === "software_serial"));
});
