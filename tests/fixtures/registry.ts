import type { ComponentDef, PinDef, PinCap } from "../../lib/hardware/types.ts";
import type { ComponentId } from "../../lib/hardware/ids.ts";

/** Tiny stand-in registry so the checker tests run without lib/hardware/components.ts. Values mirror real parts. */
const io = (id: string, caps: PinCap[], side: PinDef["side"] = "top"): PinDef => ({ id, role: "io", caps, side, maxMa: 20 });
const draw = { w: 4, h: 3, color: "#333" };

const unoPins: PinDef[] = [];
for (let d = 0; d <= 13; d++) {
  const caps: PinCap[] = ["digital"];
  if ([3, 5, 6, 9, 10, 11].includes(d)) caps.push("pwm");
  if (d === 2 || d === 3) caps.push("interrupt");
  if (d === 0) caps.push("uart_rx");
  if (d === 1) caps.push("uart_tx");
  if (d === 10) caps.push("spi_cs");
  if (d === 11) caps.push("spi_mosi");
  if (d === 12) caps.push("spi_miso");
  if (d === 13) caps.push("spi_sck");
  unoPins.push(io(`D${d}`, caps));
}
for (let a = 0; a <= 5; a++) {
  const caps: PinCap[] = ["digital", "analog"];
  if (a === 4) caps.push("i2c_sda");
  if (a === 5) caps.push("i2c_scl");
  unoPins.push(io(`A${a}`, caps, "bottom"));
}
unoPins.push(
  { id: "5V", role: "source", volts: 5, maxMa: 500, side: "bottom" },
  { id: "3V3", role: "source", volts: 3.3, maxMa: 50, side: "bottom" },
  { id: "GND", role: "gnd", side: "bottom" },
  { id: "GND2", role: "gnd", side: "bottom" },
);

const espPins: PinDef[] = [];
for (const g of [2, 4, 5, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33]) {
  const caps: PinCap[] = ["digital", "pwm", "interrupt"];
  if ([2, 4, 12, 13, 14, 15, 25, 26, 27, 32, 33].includes(g)) caps.push("analog");
  if (g === 21) caps.push("i2c_sda");
  if (g === 22) caps.push("i2c_scl");
  if (g === 23) caps.push("spi_mosi");
  if (g === 19) caps.push("spi_miso");
  if (g === 18) caps.push("spi_sck");
  if (g === 5) caps.push("spi_cs");
  espPins.push(io(`GPIO${g}`, caps));
}
for (const g of [34, 35, 36, 39]) espPins.push(io(`GPIO${g}`, ["analog", "interrupt"]));
espPins.push(
  { id: "3V3", role: "source", volts: 3.3, maxMa: 500, side: "bottom" },
  { id: "VIN", role: "source", volts: 5, maxMa: 500, side: "bottom" },
  { id: "GND", role: "gnd", side: "bottom" },
);

const DEFS: Partial<Record<ComponentId, ComponentDef>> = {
  "arduino-uno": { id: "arduino-uno", name: "Arduino Uno", category: "Boards", kind: "board", logicVolts: 5, fiveVoltTolerant: true, pins: unoPins, draw },
  "esp32-devkit": { id: "esp32-devkit", name: "ESP32 DevKit", category: "Boards", kind: "board", logicVolts: 3.3, fiveVoltTolerant: false, pins: espPins, draw },
  "hc-sr04": {
    id: "hc-sr04", name: "HC-SR04 ultrasonic sensor", category: "Sensors", kind: "module", logicVolts: 5, supply: { min: 4.5, max: 5.5 }, drawMa: 15, draw,
    pins: [
      { id: "VCC", role: "vcc", side: "bottom" },
      { id: "TRIG", role: "in", caps: ["digital"], side: "bottom" },
      { id: "ECHO", role: "out", volts: 5, side: "bottom" },
      { id: "GND", role: "gnd", side: "bottom" },
    ],
  },
  "servo-sg90": {
    id: "servo-sg90", name: "SG90 micro servo", category: "Actuators", kind: "module", supply: { min: 4.8, max: 6 }, drawMa: 650, draw,
    pins: [
      { id: "VCC", role: "vcc", side: "left" },
      { id: "SIG", role: "in", caps: ["pwm"], side: "left" },
      { id: "GND", role: "gnd", side: "left" },
    ],
  },
  l298n: {
    id: "l298n", name: "L298N motor driver", category: "Drivers", kind: "module", supply: { min: 5, max: 35 }, drawMa: 36, draw,
    pins: [
      { id: "VS", role: "vcc", side: "bottom" },
      { id: "GND", role: "gnd", side: "bottom" },
      { id: "5V", role: "source", volts: 5, maxMa: 500, side: "bottom" },
      { id: "ENA", role: "in", caps: ["pwm"], side: "bottom" },
      { id: "IN1", role: "in", side: "bottom" },
      { id: "IN2", role: "in", side: "bottom" },
      { id: "IN3", role: "in", side: "bottom" },
      { id: "IN4", role: "in", side: "bottom" },
      { id: "ENB", role: "in", caps: ["pwm"], side: "bottom" },
      { id: "OUT1", role: "load", side: "left" },
      { id: "OUT2", role: "load", side: "left" },
      { id: "OUT3", role: "load", side: "right" },
      { id: "OUT4", role: "load", side: "right" },
    ],
  },
  "dc-motor": {
    id: "dc-motor", name: "DC gear motor", category: "Actuators", kind: "module", drawMa: 250, draw,
    pins: [{ id: "M1", role: "load", side: "left" }, { id: "M2", role: "load", side: "right" }],
  },
  "battery-2s-lipo": {
    id: "battery-2s-lipo", name: "2S LiPo battery", category: "Power", kind: "power", draw,
    pins: [{ id: "POS", role: "source", volts: 7.4, maxMa: 5000, side: "right" }, { id: "NEG", role: "gnd", side: "right" }],
  },
  led: {
    id: "led", name: "LED", category: "Actuators", kind: "passive", draw,
    pins: [{ id: "A", role: "passive", side: "bottom" }, { id: "K", role: "passive", side: "bottom" }],
  },
  resistor: {
    id: "resistor", name: "Resistor", category: "Mechanical", kind: "passive", draw,
    pins: [{ id: "A", role: "passive", side: "left" }, { id: "B", role: "passive", side: "right" }],
  },
  nrf24l01: {
    id: "nrf24l01", name: "nRF24L01 radio", category: "Wireless", kind: "module", logicVolts: 3.3, supply: { min: 1.9, max: 3.6 }, drawMa: 12, draw,
    pins: [
      { id: "VCC", role: "vcc", side: "left" },
      { id: "GND", role: "gnd", side: "left" },
      { id: "CE", role: "in", side: "left" },
      { id: "CSN", role: "in", side: "left" },
      { id: "SCK", role: "in", caps: ["spi_sck"], side: "left" },
      { id: "MOSI", role: "in", caps: ["spi_mosi"], side: "left" },
      { id: "MISO", role: "out", volts: 3.3, caps: ["spi_miso"], side: "left" },
      { id: "IRQ", role: "out", volts: 3.3, side: "left" },
    ],
  },
  "soil-moisture-capacitive": {
    id: "soil-moisture-capacitive", name: "Capacitive soil moisture sensor", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5.5 }, drawMa: 5, draw,
    pins: [
      { id: "VCC", role: "vcc", side: "bottom" },
      { id: "GND", role: "gnd", side: "bottom" },
      { id: "AO", role: "out", volts: 3, caps: ["analog"], side: "bottom" },
    ],
  },
  "robot-chassis-2wd": { id: "robot-chassis-2wd", name: "2WD chassis", category: "Mechanical", kind: "mechanical", pins: [], draw },
};

export function fixtureRegistry(id: ComponentId): ComponentDef {
  const d = DEFS[id];
  if (!d) throw new Error(`fixture registry has no ${id}`);
  return d;
}
