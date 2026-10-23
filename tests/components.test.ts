import { test } from "node:test";
import assert from "node:assert/strict";
import { COMPONENTS, getComponent } from "../lib/hardware/components.ts";
import { COMPONENT_IDS } from "../lib/hardware/ids.ts";
import { PART_BY_ID } from "../lib/parts-catalog.ts";

test("every id defined, no extras", () => {
  for (const id of COMPONENT_IDS) assert.equal(getComponent(id).id, id);
  assert.equal(Object.keys(COMPONENTS).length, COMPONENT_IDS.length);
});
test("pin ids unique per component", () => {
  for (const d of Object.values(COMPONENTS)) assert.equal(new Set(d.pins.map((p) => p.id)).size, d.pins.length, d.id);
});
test("boards have gnd and source pins", () => {
  for (const d of Object.values(COMPONENTS).filter((x) => x.kind === "board")) {
    assert.ok(d.pins.some((p) => p.role === "gnd"), `${d.id} gnd`);
    assert.ok(d.pins.some((p) => p.role === "source"), `${d.id} source`);
  }
});
test("3.3 V boards", () => {
  for (const id of ["esp32-devkit", "raspberry-pi-4", "raspberry-pi-pico"] as const) assert.equal(getComponent(id).logicVolts, 3.3);
});
test("Uno D9 pwm, A4 SDA", () => {
  const pins = getComponent("arduino-uno").pins;
  assert.ok(pins.find((p) => p.id === "D9")?.caps?.includes("pwm"));
  assert.ok(pins.find((p) => p.id === "A4")?.caps?.includes("i2c_sda"));
});
test("ESP32 input-only pins have no pwm", () => {
  for (const n of [34, 35, 36, 39]) assert.ok(!getComponent("esp32-devkit").pins.find((p) => p.id === `GPIO${n}`)?.caps?.includes("pwm"));
});
test("finderPartId points into the parts catalog", () => {
  for (const d of Object.values(COMPONENTS)) if (d.finderPartId) assert.ok(PART_BY_ID.has(d.finderPartId), `${d.id} -> ${d.finderPartId}`);
});
