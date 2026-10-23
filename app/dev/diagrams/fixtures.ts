/** Dev-only fixture parts and circuits for the /dev/diagrams preview and tests/layout.test.ts. Not real registry data. */
import type { ComponentDef, PinDef, Side } from "../../../lib/hardware/types";
import type { CircuitInput } from "../../../lib/hardware/layout";

const pins = (side: Side, list: Array<[string, PinDef["role"], number?]>): PinDef[] =>
  list.map(([id, role, volts]) => (volts === undefined ? { id, role, side } : { id, role, side, volts }));

const defs: ComponentDef[] = [
  {
    id: "arduino-uno", name: "Arduino Uno", category: "Boards", kind: "board", logicVolts: 5,
    pins: [
      ...pins("top", [["AREF", "nc"], ["GND", "gnd"], ["D13", "io"], ["D12", "io"], ["D11", "io"], ["D10", "io"], ["D9", "io"], ["D8", "io"],
        ["D7", "io"], ["D6", "io"], ["D5", "io"], ["D4", "io"], ["D3", "io"], ["D2", "io"], ["D1", "io"], ["D0", "io"]]),
      ...pins("bottom", [["IOREF", "nc"], ["RESET", "nc"], ["3V3", "source", 3.3], ["5V", "source", 5], ["GND2", "gnd"], ["GND3", "gnd"], ["VIN", "vcc"],
        ["A0", "io"], ["A1", "io"], ["A2", "io"], ["A3", "io"], ["A4", "io"], ["A5", "io"]]),
    ],
    draw: { w: 34, h: 22, color: "#00878F" },
  },
  {
    id: "esp32-devkit", name: "ESP32 DevKit", category: "Boards", kind: "board", logicVolts: 3.3,
    pins: [
      ...pins("left", [["3V3", "source", 3.3], ["EN", "nc"], ["VP", "io"], ["VN", "io"], ["GPIO34", "io"], ["GPIO35", "io"], ["GPIO32", "io"], ["GPIO33", "io"],
        ["GPIO25", "io"], ["GPIO26", "io"], ["GPIO27", "io"], ["GPIO14", "io"], ["GPIO12", "io"], ["GND", "gnd"], ["GPIO13", "io"], ["VIN", "vcc"]]),
      ...pins("right", [["GND2", "gnd"], ["GPIO23", "io"], ["GPIO22", "io"], ["TX", "io"], ["RX", "io"], ["GPIO21", "io"], ["GND3", "gnd"], ["GPIO19", "io"],
        ["GPIO18", "io"], ["GPIO5", "io"], ["GPIO17", "io"], ["GPIO16", "io"], ["GPIO4", "io"], ["GPIO0", "io"], ["GPIO2", "io"], ["GPIO15", "io"]]),
    ],
    draw: { w: 16, h: 24, color: "#263238" },
  },
  { id: "hc-sr04", name: "HC-SR04", category: "Sensors", kind: "module", pins: pins("bottom", [["VCC", "vcc"], ["TRIG", "in"], ["ECHO", "out"], ["GND", "gnd"]]), draw: { w: 14, h: 6, color: "#1565C0" } },
  { id: "servo-sg90", name: "SG90 servo", category: "Actuators", kind: "module", pins: pins("left", [["GND", "gnd"], ["V+", "vcc"], ["SIG", "in"]]), draw: { w: 10, h: 5, color: "#1E88E5" } },
  {
    id: "l298n", name: "L298N", category: "Drivers", kind: "module",
    pins: [
      ...pins("left", [["IN1", "in"], ["IN2", "in"], ["IN3", "in"], ["IN4", "in"]]),
      ...pins("bottom", [["12V", "vcc"], ["GND", "gnd"], ["5V", "source", 5]]),
      ...pins("right", [["OUT1", "load"], ["OUT2", "load"], ["OUT3", "load"], ["OUT4", "load"]]),
    ],
    draw: { w: 14, h: 14, color: "#B3261E" },
  },
  { id: "dc-motor", name: "DC motor", category: "Actuators", kind: "module", pins: pins("left", [["M+", "load"], ["M-", "load"]]), draw: { w: 9, h: 4, color: "#F2C200", textColor: "#3E2A00" } },
  { id: "led", name: "LED", category: "Actuators", kind: "passive", pins: pins("bottom", [["A", "passive"], ["K", "passive"]]), draw: { w: 3, h: 4, color: "#E53935" } },
  { id: "resistor", name: "Resistor", category: "Actuators", kind: "passive", pins: [...pins("left", [["A", "passive"]]), ...pins("right", [["B", "passive"]])], draw: { w: 6, h: 2, color: "#D9C49A", textColor: "#3E2A00" } },
  { id: "push-button", name: "Push button", category: "Sensors", kind: "passive", pins: [...pins("left", [["1", "passive"]]), ...pins("right", [["2", "passive"]])], draw: { w: 4, h: 4, color: "#37474F" } },
  { id: "dht22", name: "DHT22", category: "Sensors", kind: "module", pins: pins("bottom", [["VCC", "vcc"], ["DATA", "out"], ["NC", "nc"], ["GND", "gnd"]]), draw: { w: 6, h: 8, color: "#ECEFF1", textColor: "#263238" } },
  { id: "oled-ssd1306", name: "SSD1306 OLED", category: "Displays", kind: "module", pins: pins("top", [["GND", "gnd"], ["VCC", "vcc"], ["SCL", "in"], ["SDA", "in"]]), draw: { w: 10, h: 9, color: "#0D2A6B" } },
  {
    id: "relay-module", name: "Relay module", category: "Actuators", kind: "module",
    pins: [...pins("left", [["VCC", "vcc"], ["GND", "gnd"], ["IN", "in"]]), ...pins("right", [["COM", "load"], ["NO", "load"], ["NC", "load"]])],
    draw: { w: 9, h: 6, color: "#1565C0" },
  },
  { id: "battery-9v", name: "9V battery", category: "Power", kind: "power", pins: pins("top", [["+", "source", 9], ["-", "gnd"]]), draw: { w: 6, h: 9, color: "#263238" } },
  { id: "robot-chassis-2wd", name: "2WD chassis", category: "Mechanical", kind: "mechanical", pins: [], draw: { w: 1, h: 1, color: "#000000" } },
] as ComponentDef[];

const byId = new Map(defs.map((d) => [d.id as string, d]));
export function getFixtureComponent(id: string): ComponentDef {
  const d = byId.get(id);
  if (!d) throw new Error(`No fixture component "${id}"`);
  return d;
}

export type FixtureCircuit = { slug: string; title: string; circuit: CircuitInput };

export const FIXTURE_CIRCUITS: FixtureCircuit[] = [
  {
    slug: "obstacle-robot", title: "Obstacle avoiding robot · Arduino Uno",
    circuit: {
      board: "arduino-uno",
      instances: [
        { id: "us", component: "hc-sr04" }, { id: "servo", component: "servo-sg90" }, { id: "drv", component: "l298n" },
        { id: "m1", component: "dc-motor", label: "Left motor" }, { id: "m2", component: "dc-motor", label: "Right motor" },
        { id: "bat", component: "battery-9v" }, { id: "chassis", component: "robot-chassis-2wd" },
      ],
      connections: [
        { from: "board.5V", to: "us.VCC", color: "red" }, { from: "board.GND2", to: "us.GND", color: "black" },
        { from: "board.D12", to: "us.TRIG", color: "yellow", note: "Trigger pulse" }, { from: "board.D11", to: "us.ECHO", color: "green", note: "Echo return" },
        { from: "board.D9", to: "servo.SIG", color: "orange", note: "Servo PWM" }, { from: "board.5V", to: "servo.V+", color: "red" },
        { from: "board.GND3", to: "servo.GND", color: "brown" },
        { from: "board.D7", to: "drv.IN1", color: "purple" }, { from: "board.D6", to: "drv.IN2", color: "gray" },
        { from: "board.D5", to: "drv.IN3", color: "white" }, { from: "board.D4", to: "drv.IN4", color: "blue" },
        { from: "drv.OUT1", to: "m1.M+", color: "red" }, { from: "drv.OUT2", to: "m1.M-", color: "black" },
        { from: "drv.OUT3", to: "m2.M+", color: "red" }, { from: "drv.OUT4", to: "m2.M-", color: "black" },
        { from: "bat.+", to: "drv.12V", color: "red", note: "Motor supply" }, { from: "bat.-", to: "drv.GND", color: "black" },
        { from: "drv.GND", to: "board.GND", color: "black", note: "Common ground" },
      ],
    },
  },
  {
    slug: "weather-station", title: "Weather station · ESP32 + DHT22 + OLED",
    circuit: {
      board: "esp32-devkit",
      instances: [{ id: "dht", component: "dht22" }, { id: "oled", component: "oled-ssd1306" }, { id: "r1", component: "resistor", label: "10 kΩ" }],
      connections: [
        { from: "dht.VCC", to: "board.3V3", color: "red" }, { from: "dht.DATA", to: "board.GPIO4", color: "yellow", note: "One-wire data" },
        { from: "dht.GND", to: "board.GND", color: "black" }, { from: "r1.A", to: "dht.DATA", color: "yellow", note: "Pull-up" },
        { from: "r1.B", to: "board.3V3", color: "red" },
        { from: "oled.VCC", to: "board.3V3", color: "red" }, { from: "oled.GND", to: "board.GND2", color: "black" },
        { from: "oled.SCL", to: "board.GPIO22", color: "blue", note: "I2C clock" }, { from: "oled.SDA", to: "board.GPIO21", color: "green", note: "I2C data" },
      ],
    },
  },
  {
    slug: "led-button", title: "LED + resistor + button · Arduino Uno",
    circuit: {
      board: "arduino-uno",
      instances: [{ id: "r1", component: "resistor", label: "220 Ω" }, { id: "led", component: "led", label: "Red LED" }, { id: "btn", component: "push-button" }],
      connections: [
        { from: "board.D13", to: "r1.A", color: "orange" }, { from: "r1.B", to: "led.A", color: "orange", note: "Anode (long leg)" },
        { from: "led.K", to: "board.GND", color: "black" }, { from: "btn.1", to: "board.D2", color: "yellow", note: "INPUT_PULLUP" },
        { from: "btn.2", to: "board.GND2", color: "black" },
      ],
    },
  },
];

/** The same builds written against the real registry (lib/hardware/components.ts) pin ids. */
export const REGISTRY_CIRCUITS: FixtureCircuit[] = [
  {
    slug: "obstacle-robot", title: "Obstacle avoiding robot · Arduino Uno",
    circuit: {
      board: "arduino-uno",
      instances: [
        { id: "us", component: "hc-sr04" }, { id: "servo", component: "servo-sg90" }, { id: "drv", component: "l298n" },
        { id: "m1", component: "dc-motor", label: "Left motor" }, { id: "m2", component: "dc-motor", label: "Right motor" },
        { id: "bat", component: "battery-9v" }, { id: "chassis", component: "robot-chassis-2wd" },
      ],
      connections: [
        { from: "board.5V", to: "us.VCC", color: "red" }, { from: "board.GND", to: "us.GND", color: "black" },
        { from: "board.D12", to: "us.TRIG", color: "yellow", note: "Trigger pulse" }, { from: "board.D11", to: "us.ECHO", color: "green", note: "Echo return" },
        { from: "board.D9", to: "servo.SIG", color: "orange", note: "Servo PWM" }, { from: "board.5V", to: "servo.VCC", color: "red" },
        { from: "board.GND2", to: "servo.GND", color: "brown" },
        { from: "board.D7", to: "drv.IN1", color: "purple" }, { from: "board.D6", to: "drv.IN2", color: "gray" },
        { from: "board.D5", to: "drv.IN3", color: "white" }, { from: "board.D4", to: "drv.IN4", color: "blue" },
        { from: "drv.OUT1", to: "m1.+", color: "red" }, { from: "drv.OUT2", to: "m1.-", color: "black" },
        { from: "drv.OUT3", to: "m2.+", color: "red" }, { from: "drv.OUT4", to: "m2.-", color: "black" },
        { from: "bat.+", to: "drv.12V", color: "red", note: "Motor supply" }, { from: "bat.-", to: "drv.GND", color: "black" },
        { from: "drv.GND", to: "board.GND3", color: "black", note: "Common ground" },
      ],
    },
  },
  {
    slug: "weather-station", title: "Weather station · ESP32 + DHT22 + OLED",
    circuit: {
      board: "esp32-devkit",
      instances: [{ id: "dht", component: "dht22" }, { id: "oled", component: "oled-ssd1306" }],
      connections: [
        { from: "dht.VCC", to: "board.3V3", color: "red" }, { from: "dht.DATA", to: "board.GPIO4", color: "yellow", note: "One-wire data" },
        { from: "dht.GND", to: "board.GND", color: "black" },
        { from: "oled.VCC", to: "board.3V3", color: "red" }, { from: "oled.GND", to: "board.GND2", color: "black" },
        { from: "oled.SCL", to: "board.GPIO22", color: "blue", note: "I2C clock" }, { from: "oled.SDA", to: "board.GPIO21", color: "green", note: "I2C data" },
      ],
    },
  },
  {
    slug: "led-button", title: "LED + resistor + button · Arduino Uno",
    circuit: {
      board: "arduino-uno",
      instances: [{ id: "r1", component: "resistor", label: "220 Ω" }, { id: "led", component: "led", label: "Red LED" }, { id: "btn", component: "push-button" }],
      connections: [
        { from: "board.D13", to: "r1.A", color: "orange" }, { from: "r1.B", to: "led.A", color: "orange", note: "Anode (long leg)" },
        { from: "led.K", to: "board.GND3", color: "black" }, { from: "btn.1", to: "board.D2", color: "yellow", note: "INPUT_PULLUP" },
        { from: "btn.2", to: "board.GND", color: "black" },
      ],
    },
  },
];
