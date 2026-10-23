import { test } from "node:test";
import assert from "node:assert/strict";
import { checkCircuit, type Issue } from "../lib/hardware/check.ts";
import { fixtureRegistry } from "./fixtures/registry.ts";
import { guide, unoRobot, ESP_ECHO_CODE } from "./fixtures/guides.ts";

const run = (g: Parameters<typeof checkCircuit>[0]) => checkCircuit(g, fixtureRegistry);
const errors = (is: Issue[]) => is.filter((i) => i.level === "error");
const codes = (is: Issue[]) => is.map((i) => i.code);

test("(1) correct Uno + HC-SR04 + servo + L298N robot has no errors", () => {
  const is = run(unoRobot);
  assert.deepEqual(errors(is), []);
  assert.ok(!codes(is).includes("code_pin_mismatch"), JSON.stringify(is, null, 2));
  assert.ok(codes(is).includes("servo_from_board")); // SG90 stall current > Uno 5V budget: warning only
});

test("(2) 5V tied to GND is a short", () => {
  const g = { ...unoRobot, connections: [...unoRobot.connections, { from: "board.5V", to: "board.GND2", color: "red" as const }] };
  assert.ok(errors(run(g)).some((i) => i.code === "short_supply_gnd"));
});

const espUs = (extra: { id: string; component: "resistor" }[], wires: [string, string][]) =>
  guide("esp32-devkit", [{ id: "us", component: "hc-sr04" }, ...extra],
    [["us.VCC", "board.VIN"], ["us.GND", "board.GND"], ["us.TRIG", "board.GPIO5"], ...wires], ESP_ECHO_CODE);

test("(3) HC-SR04 ECHO straight into ESP32 GPIO is overvoltage; divider fixes it", () => {
  const bad = run(espUs([], [["us.ECHO", "board.GPIO18"]]));
  assert.ok(errors(bad).some((i) => i.code === "overvoltage_input" && i.at === "us.ECHO"));
  const ok = run(espUs([{ id: "r1", component: "resistor" }, { id: "r2", component: "resistor" }], [
    ["us.ECHO", "r1.A"], ["r1.B", "board.GPIO18"], ["r2.A", "board.GPIO18"], ["r2.B", "board.GND"],
  ]));
  assert.deepEqual(errors(ok), []);
  assert.ok(!codes(ok).includes("overvoltage_input"));
  const half = run(espUs([{ id: "r1", component: "resistor" }], [["us.ECHO", "r1.A"], ["r1.B", "board.GPIO18"]]));
  assert.ok(half.some((i) => i.code === "overvoltage_input" && i.level === "warning"));
});

test("(4) motor lead on Uno D5 is gpio_load", () => {
  const g = guide("arduino-uno", [{ id: "m1", component: "dc-motor" }], [["m1.M1", "board.D5"], ["m1.M2", "board.GND"]],
    "void setup(){ pinMode(5, OUTPUT); digitalWrite(5, HIGH); } void loop(){}");
  assert.ok(errors(run(g)).some((i) => i.code === "gpio_load" && i.at === "m1.M1"));
});

test("(5) LED on D13 without resistor warns; with 220 Ω it is clean", () => {
  const code = "void setup(){ pinMode(13, OUTPUT); } void loop(){ digitalWrite(13, HIGH); }";
  const bad = run(guide("arduino-uno", [{ id: "led1", component: "led" }], [["led1.A", "board.D13"], ["led1.K", "board.GND"]], code));
  assert.ok(bad.some((i) => i.code === "led_no_resistor" && i.level === "warning"));
  assert.deepEqual(errors(bad), []);
  const ok = run(guide("arduino-uno", [{ id: "led1", component: "led" }, { id: "r1", component: "resistor" }],
    [["board.D13", "r1.A"], ["r1.B", "led1.A"], ["led1.K", "board.GND"]], code));
  assert.deepEqual(ok, []);
});

test("(6) NRF24 VCC on 5V is supply_out_of_range", () => {
  const g = guide("arduino-uno", [{ id: "rf", component: "nrf24l01" }], [
    ["rf.VCC", "board.5V"], ["rf.GND", "board.GND"], ["rf.CE", "board.D9"], ["rf.CSN", "board.D10"],
    ["rf.SCK", "board.D13"], ["rf.MOSI", "board.D11"], ["rf.MISO", "board.D12"],
  ], "#include <SPI.h>\n#include <RF24.h>\nRF24 radio(9, 10);\nvoid setup(){ radio.begin(); } void loop(){}");
  const is = run(g);
  assert.ok(errors(is).some((i) => i.code === "supply_out_of_range" && /1\.9–3\.6 V/.test(i.message)));
  assert.ok(!codes(is).includes("code_pin_mismatch"), JSON.stringify(is, null, 2));
  // and on 3V3 it is fine
  const ok = run({ ...g, connections: g.connections.map((c) => (c.to === "board.5V" ? { ...c, to: "board.3V3" } : c)) });
  assert.deepEqual(errors(ok), []);
});

test("(7) powered module without ground is missing_ground", () => {
  const g = guide("arduino-uno", [{ id: "us", component: "hc-sr04" }],
    [["us.VCC", "board.5V"], ["us.TRIG", "board.D9"], ["us.ECHO", "board.D10"]],
    "#define TRIG 9\n#define ECHO 10\nvoid setup(){} void loop(){}");
  assert.ok(errors(run(g)).some((i) => i.code === "missing_ground" && i.at === "us.GND"));
});

test("(8) analog sensor AO on Uno D7 is missing_capability; on A0 it is fine", () => {
  const mk = (pin: string, code: string) => guide("arduino-uno", [{ id: "soil", component: "soil-moisture-capacitive" }],
    [["soil.VCC", "board.5V"], ["soil.GND", "board.GND"], ["soil.AO", pin]], code);
  assert.ok(errors(run(mk("board.D7", "void loop(){ analogRead(7); }"))).some((i) => i.code === "missing_capability"));
  assert.deepEqual(run(mk("board.A0", "void setup(){} void loop(){ int v = analogRead(A0); }")), []);
});

test("(9) typo board.D99 is unknown_pin with a suggestion", () => {
  const g = guide("arduino-uno", [{ id: "led1", component: "led" }], [["led1.A", "board.D99"], ["led1.K", "board.GND"]], "void setup(){} void loop(){}");
  const e = run(g).find((i) => i.code === "unknown_pin");
  assert.ok(e && e.level === "error" && /board\.D9/.test(e.message), e?.message);
  const e2 = run(guide("arduino-uno", [{ id: "led1", component: "led" }], [["led1.a", "board.GND"]], "void setup(){} void loop(){}"))
    .find((i) => i.code === "unknown_pin");
  assert.ok(e2 && /led1\.A/.test(e2.message));
  const e3 = run(guide("arduino-uno", [], [["ledd.A", "board.GND"]], "void setup(){} void loop(){}"));
  assert.ok(e3.some((i) => i.code === "unknown_instance"));
});

test("(10) code uses pin 8 while wiring uses D9 → code_pin_mismatch warnings", () => {
  const g = guide("arduino-uno", [{ id: "led1", component: "led" }, { id: "r1", component: "resistor" }],
    [["board.D9", "r1.A"], ["r1.B", "led1.A"], ["led1.K", "board.GND"]],
    "const int LED_PIN = 8;\nvoid setup(){ pinMode(LED_PIN, OUTPUT); } void loop(){}");
  const m = run(g).filter((i) => i.code === "code_pin_mismatch");
  assert.equal(m.length, 2);
  assert.ok(m.every((i) => i.level === "warning"));
  assert.ok(m.some((i) => i.at === "board.D9") && m.some((i) => /pin 8/.test(i.message)));
});

test("misc structural rules", () => {
  const g = guide("hc-sr04", [{ id: "board", component: "led" }, { id: "ch", component: "robot-chassis-2wd" }],
    [["ch.X", "board.VCC"], ["board.VCC", "board.VCC"]], "void setup(){} void loop(){}");
  const c = codes(run(g));
  for (const k of ["board_not_board", "duplicate_instance", "mechanical_wired", "self_loop"]) assert.ok(c.includes(k), k);
});

test("5V and 3V3 tied together is a source conflict; ECHO into ESP32 input-only / pin sharing", () => {
  const g = { ...unoRobot, connections: [...unoRobot.connections, { from: "board.5V", to: "board.3V3", color: "red" as const }] };
  assert.ok(errors(run(g)).some((i) => i.code === "source_conflict"));
  const io = run(guide("esp32-devkit", [{ id: "us", component: "hc-sr04" }],
    [["us.VCC", "board.VIN"], ["us.GND", "board.GND"], ["us.TRIG", "board.GPIO34"], ["us.ECHO", "board.GPIO34"]], ESP_ECHO_CODE));
  assert.ok(errors(io).some((i) => i.code === "input_only_pin"));
});
