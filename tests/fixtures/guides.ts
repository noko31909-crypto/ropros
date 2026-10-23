import type { CheckInput } from "../../lib/hardware/check.ts";
import type { ComponentId } from "../../lib/hardware/ids.ts";

type Conn = CheckInput["connections"][number];
const L = (s: string) => ({ en: s, ru: s, kk: s });

/** Build a CheckInput with filler text; parts are derived from board + instances (+ extra mechanical parts). */
export function guide(
  board: ComponentId,
  instances: { id: string; component: ComponentId }[],
  wires: [string, string][],
  source: string,
  opts: { platform?: CheckInput["platform"]; language?: "cpp" | "python"; extraParts?: ComponentId[] } = {},
): CheckInput {
  const comps = new Set<ComponentId>([board, ...instances.map((i) => i.component), ...(opts.extraParts ?? [])]);
  return {
    board,
    platform: opts.platform ?? (board.startsWith("esp32") ? "esp32" : "arduino"),
    instances,
    connections: wires.map(([from, to]): Conn => ({ from, to, color: "red" })),
    code: [{ filename: "main.ino", language: opts.language ?? "cpp", source, libraries: [] }],
    parts: [...comps].map((component) => ({ component, qty: 1, spec: L("spec"), role: L("role") })),
  };
}

/** (1) Correct Uno robot: HC-SR04 + SG90 + L298N with two motors on a 2S LiPo. */
export const unoRobot = guide(
  "arduino-uno",
  [
    { id: "us", component: "hc-sr04" },
    { id: "servo", component: "servo-sg90" },
    { id: "drv", component: "l298n" },
    { id: "m1", component: "dc-motor" },
    { id: "m2", component: "dc-motor" },
    { id: "bat", component: "battery-2s-lipo" },
  ],
  [
    ["us.VCC", "board.5V"], ["us.GND", "board.GND"], ["us.TRIG", "board.D9"], ["us.ECHO", "board.D10"],
    ["servo.VCC", "board.5V"], ["servo.GND", "board.GND2"], ["servo.SIG", "board.D6"],
    ["bat.POS", "drv.VS"], ["bat.NEG", "drv.GND"], ["drv.GND", "board.GND"],
    ["drv.IN1", "board.D2"], ["drv.IN2", "board.D4"], ["drv.IN3", "board.D7"], ["drv.IN4", "board.D8"],
    ["drv.OUT1", "m1.M1"], ["drv.OUT2", "m1.M2"], ["drv.OUT3", "m2.M1"], ["drv.OUT4", "m2.M2"],
  ],
  `#include <Servo.h>
#define TRIG_PIN 9
#define ECHO_PIN 10
const int SERVO_PIN = 6;
const int IN1 = 2, IN2 = 4;
const uint8_t IN3 = 7;
const uint8_t IN4 = 8;
Servo head;
void setup() {
  pinMode(TRIG_PIN, OUTPUT); pinMode(ECHO_PIN, INPUT);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT); pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  head.attach(SERVO_PIN);
}
void loop() {}
`,
  { extraParts: ["robot-chassis-2wd"] },
);

export const ESP_ECHO_CODE = `#define TRIG 5
#define ECHO 18
void setup() { pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT); }
void loop() {}
`;
