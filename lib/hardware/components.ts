/**
 * Hardware component registry: datasheet pinouts for every id in COMPONENT_IDS.
 * Read by the circuit checker and the auto-diagram renderer. Pin ids are written the way makers
 * write them in wiring tables ("D9", "GPIO21", "VCC", "TRIG", "A"/"K").
 * Relative imports with .ts extensions so node --experimental-strip-types can load it in tests.
 */
import { COMPONENT_IDS, type ComponentId } from "./ids.ts";
import type { ComponentDef, PinCap, PinDef, PinRole, Side } from "./types.ts";

type Extra = Partial<Omit<PinDef, "id" | "role" | "side">>;
const pin = (id: string, role: PinRole, side: Side, extra: Extra = {}): PinDef => ({ id, role, side, ...extra });
const gnd = (id: string, side: Side, label?: string): PinDef => pin(id, "gnd", side, label ? { label } : {});
const src = (id: string, volts: number, maxMa: number, side: Side, label?: string): PinDef =>
  pin(id, "source", side, { volts, maxMa, ...(label ? { label } : {}) });
const vcc = (id: string, side: Side, label?: string): PinDef => pin(id, "vcc", side, label ? { label } : {});
const inp = (id: string, side: Side, caps: PinCap[] = ["digital"], label?: string): PinDef =>
  pin(id, "in", side, { caps, ...(label ? { label } : {}) });
const out = (id: string, side: Side, caps: PinCap[], volts?: number, label?: string): PinDef =>
  pin(id, "out", side, { caps, ...(volts !== undefined ? { volts } : {}), ...(label ? { label } : {}) });
const load = (id: string, side: Side, label?: string): PinDef => pin(id, "load", side, label ? { label } : {});
const pas = (id: string, side: Side, label?: string): PinDef => pin(id, "passive", side, label ? { label } : {});
const io = (id: string, side: Side, caps: PinCap[], maxMa: number, label?: string): PinDef =>
  pin(id, "io", side, { caps, maxMa, ...(label ? { label } : {}) });

// ───────────────────────── Arduino (ATmega328P) ─────────────────────────
function avr328Caps(n: number): PinCap[] {
  const c: PinCap[] = ["digital"];
  if ([3, 5, 6, 9, 10, 11].includes(n)) c.push("pwm");
  if (n === 2 || n === 3) c.push("interrupt");
  if (n === 0) c.push("uart_rx");
  if (n === 1) c.push("uart_tx");
  if (n === 10) c.push("spi_cs");
  if (n === 11) c.push("spi_mosi");
  if (n === 12) c.push("spi_miso");
  if (n === 13) c.push("spi_sck");
  return c;
}
function avr328Analog(n: number): PinCap[] {
  const c: PinCap[] = ["analog", "digital"];
  if (n === 4) c.push("i2c_sda");
  if (n === 5) c.push("i2c_scl");
  return c;
}
const digitalLabel = (n: number) => (n === 0 ? "D0/RX" : n === 1 ? "D1/TX" : undefined);

const UNO_PINS: PinDef[] = [
  // Top header (right to left on the real board: D0…D13, GND, AREF)
  ...Array.from({ length: 14 }, (_, n) => io(`D${n}`, "top", avr328Caps(n), 20, digitalLabel(n))),
  gnd("GND3", "top"),
  pin("AREF", "in", "top", { caps: ["analog"], label: "AREF" }),
  // Bottom power header + analog header
  src("IOREF", 5, 0, "bottom", "IOREF"),
  pin("RESET", "in", "bottom", { caps: ["digital"] }),
  src("3V3", 3.3, 50, "bottom", "3.3V"),
  src("5V", 5, 500, "bottom", "5V (USB ~500 mA)"),
  gnd("GND", "bottom"),
  gnd("GND2", "bottom"),
  pin("VIN", "vcc", "bottom", { label: "VIN (7–12 V in)" }),
  ...Array.from({ length: 6 }, (_, n) => io(`A${n}`, "bottom", avr328Analog(n), 20)),
];

const NANO_PINS: PinDef[] = [
  // Edge 1: D1/TX, D0/RX, RESET, GND, D2…D12
  io("D1", "top", avr328Caps(1), 20, "TX1"),
  io("D0", "top", avr328Caps(0), 20, "RX0"),
  pin("RESET", "in", "top", { caps: ["digital"], label: "RST" }),
  gnd("GND", "top"),
  ...Array.from({ length: 11 }, (_, i) => io(`D${i + 2}`, "top", avr328Caps(i + 2), 20)),
  // Edge 2: D13, 3V3, AREF, A0…A7, 5V, RESET, GND, VIN
  io("D13", "bottom", avr328Caps(13), 20),
  src("3V3", 3.3, 50, "bottom", "3V3"),
  pin("AREF", "in", "bottom", { caps: ["analog"] }),
  ...Array.from({ length: 6 }, (_, n) => io(`A${n}`, "bottom", avr328Analog(n), 20)),
  io("A6", "bottom", ["analog"], 0, "A6 (analog input only)"),
  io("A7", "bottom", ["analog"], 0, "A7 (analog input only)"),
  src("5V", 5, 500, "bottom", "5V (USB ~500 mA)"),
  pin("RESET2", "in", "bottom", { caps: ["digital"], label: "RST" }),
  gnd("GND2", "bottom"),
  pin("VIN", "vcc", "bottom", { label: "VIN (7–12 V in)" }),
];

// ───────────────────────── Arduino Mega 2560 ─────────────────────────
function megaCaps(n: number): PinCap[] {
  const c: PinCap[] = ["digital"];
  if ((n >= 2 && n <= 13) || (n >= 44 && n <= 46)) c.push("pwm");
  if ([2, 3, 18, 19, 20, 21].includes(n)) c.push("interrupt");
  if ([0, 15, 17, 19].includes(n)) c.push("uart_rx");
  if ([1, 14, 16, 18].includes(n)) c.push("uart_tx");
  if (n === 20) c.push("i2c_sda");
  if (n === 21) c.push("i2c_scl");
  if (n === 50) c.push("spi_miso");
  if (n === 51) c.push("spi_mosi");
  if (n === 52) c.push("spi_sck");
  if (n === 53) c.push("spi_cs");
  return c;
}
const MEGA_LABELS: Record<number, string> = {
  0: "D0/RX0", 1: "D1/TX0", 14: "D14/TX3", 15: "D15/RX3", 16: "D16/TX2", 17: "D17/RX2", 18: "D18/TX1", 19: "D19/RX1",
  20: "D20/SDA", 21: "D21/SCL", 50: "D50/MISO", 51: "D51/MOSI", 52: "D52/SCK", 53: "D53/SS",
};
const MEGA_PINS: PinDef[] = [
  ...Array.from({ length: 22 }, (_, n) => io(`D${n}`, "top", megaCaps(n), 20, MEGA_LABELS[n])),
  gnd("GND3", "top"),
  pin("AREF", "in", "top", { caps: ["analog"] }),
  ...Array.from({ length: 32 }, (_, i) => io(`D${i + 22}`, "right", megaCaps(i + 22), 20, MEGA_LABELS[i + 22])),
  src("5V2", 5, 500, "right", "5V (double-row header)"),
  gnd("GND4", "right"),
  src("IOREF", 5, 0, "bottom", "IOREF"),
  pin("RESET", "in", "bottom", { caps: ["digital"] }),
  src("3V3", 3.3, 50, "bottom", "3.3V"),
  src("5V", 5, 500, "bottom", "5V (USB ~500 mA)"),
  gnd("GND", "bottom"),
  gnd("GND2", "bottom"),
  pin("VIN", "vcc", "bottom", { label: "VIN (7–12 V in)" }),
  ...Array.from({ length: 16 }, (_, n) => io(`A${n}`, "bottom", ["analog", "digital"], 20)),
];

// ───────────────────────── ESP32 DevKit (WROOM-32, 30/38-pin) ─────────────────────────
const ESP32_ADC1 = [32, 33, 34, 35, 36, 39];
const ESP32_ADC2 = [0, 2, 4, 12, 13, 14, 15, 25, 26, 27];
const ESP32_TOUCH: Record<number, string> = { 4: "T0", 0: "T1", 2: "T2", 15: "T3", 13: "T4", 12: "T5", 14: "T6", 27: "T7", 33: "T8", 32: "T9" };
function esp32Caps(n: number): PinCap[] {
  const inputOnly = n >= 34;
  const c: PinCap[] = ["digital", "interrupt"];
  if (!inputOnly) c.push("pwm");
  if (ESP32_ADC1.includes(n) || ESP32_ADC2.includes(n)) c.push("analog");
  if (n === 25 || n === 26) c.push("dac");
  if (ESP32_TOUCH[n]) c.push("touch");
  if (n === 21) c.push("i2c_sda");
  if (n === 22) c.push("i2c_scl");
  if (n === 23) c.push("spi_mosi");
  if (n === 19) c.push("spi_miso");
  if (n === 18) c.push("spi_sck");
  if (n === 5) c.push("spi_cs");
  if (n === 1 || n === 17) c.push("uart_tx");
  if (n === 3 || n === 16) c.push("uart_rx");
  if (!inputOnly) c.push("onewire");
  return c;
}
const ESP32_LABELS: Record<number, string> = {
  0: "GPIO0 (BOOT strap)", 1: "TX0 (USB serial)", 2: "GPIO2 (strap, onboard LED)", 3: "RX0 (USB serial)",
  5: "GPIO5 (strap, VSPI CS)", 12: "GPIO12 (strap: keep LOW at boot)", 15: "GPIO15 (strap)", 16: "RX2", 17: "TX2",
  34: "GPIO34 (input only)", 35: "GPIO35 (input only)", 36: "VP / GPIO36 (input only)", 39: "VN / GPIO39 (input only)",
};
const esp32Gpio = (n: number, side: Side) => io(`GPIO${n}`, side, esp32Caps(n), n >= 34 ? 0 : 12, ESP32_LABELS[n]);
const ESP32_PINS: PinDef[] = [
  // Left header (38-pin DevKitC order, antenna up)
  src("3V3", 3.3, 500, "left", "3V3 (AMS1117)"),
  pin("EN", "in", "left", { caps: ["digital"], label: "EN (reset)" }),
  ...[36, 39, 34, 35, 32, 33, 25, 26, 27, 14, 12].map((n) => esp32Gpio(n, "left")),
  gnd("GND", "left"),
  esp32Gpio(13, "left"),
  src("5V", 5, 500, "left", "5V / VIN (USB 5 V when USB-powered)"),
  // Right header
  gnd("GND2", "right"),
  ...[23, 22, 1, 3, 21].map((n) => esp32Gpio(n, "right")),
  gnd("GND3", "right"),
  ...[19, 18, 5, 17, 16, 4, 0, 2, 15].map((n) => esp32Gpio(n, "right")),
];

// ───────────────────────── ESP8266 NodeMCU v2/v3 ─────────────────────────
const NODEMCU: [string, number, PinCap[], string][] = [
  ["D0", 16, ["digital"], "D0 / GPIO16 (no PWM/IRQ, wake)"],
  ["D1", 5, ["digital", "pwm", "interrupt", "i2c_scl", "onewire"], "D1 / GPIO5 (SCL)"],
  ["D2", 4, ["digital", "pwm", "interrupt", "i2c_sda", "onewire"], "D2 / GPIO4 (SDA)"],
  ["D3", 0, ["digital", "pwm", "interrupt"], "D3 / GPIO0 (FLASH strap, pulled up)"],
  ["D4", 2, ["digital", "pwm", "interrupt", "uart_tx"], "D4 / GPIO2 (strap, onboard LED, TX1)"],
  ["D5", 14, ["digital", "pwm", "interrupt", "spi_sck", "onewire"], "D5 / GPIO14 (SCK)"],
  ["D6", 12, ["digital", "pwm", "interrupt", "spi_miso", "onewire"], "D6 / GPIO12 (MISO)"],
  ["D7", 13, ["digital", "pwm", "interrupt", "spi_mosi", "onewire"], "D7 / GPIO13 (MOSI)"],
  ["D8", 15, ["digital", "pwm", "interrupt", "spi_cs"], "D8 / GPIO15 (strap, pulled down, CS)"],
];
const ESP8266_PINS: PinDef[] = [
  io("A0", "left", ["analog"], 0, "A0 (0–3.3 V via board divider; bare ESP8266 ADC max 1.0 V)"),
  pin("RSV", "nc", "left"),
  pin("RSV2", "nc", "left", { label: "RSV" }),
  pin("SD3", "nc", "left", { label: "SD3 / GPIO10 (flash)" }),
  pin("SD2", "nc", "left", { label: "SD2 / GPIO9 (flash)" }),
  pin("SD1", "nc", "left", { label: "SD1 (flash)" }),
  pin("CMD", "nc", "left", { label: "CMD (flash)" }),
  pin("SD0", "nc", "left", { label: "SD0 (flash)" }),
  pin("CLK", "nc", "left", { label: "CLK (flash)" }),
  gnd("GND2", "left"),
  src("3V3_2", 3.3, 300, "left", "3V3"),
  pin("EN", "in", "left", { caps: ["digital"] }),
  pin("RST", "in", "left", { caps: ["digital"] }),
  gnd("GND3", "left"),
  pin("VIN", "vcc", "left", { label: "VIN (5 V in / USB 5 V)" }),
  ...NODEMCU.slice(0, 5).map(([id, , caps, label]) => io(id, "right", caps, 12, label)),
  src("3V3", 3.3, 300, "right", "3V3"),
  gnd("GND", "right"),
  ...NODEMCU.slice(5).map(([id, , caps, label]) => io(id, "right", caps, 12, label)),
  io("RX", "right", ["digital", "uart_rx"], 12, "RX / GPIO3 (USB serial)"),
  io("TX", "right", ["digital", "uart_tx"], 12, "TX / GPIO1 (USB serial)"),
  gnd("GND4", "right"),
  src("3V3_3", 3.3, 300, "right", "3V3"),
];

// ───────────────────────── ESP32-CAM (AI-Thinker) ─────────────────────────
const ESP32CAM_PINS: PinDef[] = [
  vcc("5V", "left", "5V (power in)"),
  gnd("GND", "left"),
  io("GPIO12", "left", ["digital", "pwm", "analog", "interrupt"], 12, "IO12 (SD DATA2, strap: keep LOW at boot)"),
  io("GPIO13", "left", ["digital", "pwm", "analog", "interrupt"], 12, "IO13 (SD DATA3)"),
  io("GPIO15", "left", ["digital", "pwm", "analog", "interrupt"], 12, "IO15 (SD CMD)"),
  io("GPIO14", "left", ["digital", "pwm", "analog", "interrupt"], 12, "IO14 (SD CLK)"),
  io("GPIO2", "left", ["digital", "pwm", "analog", "interrupt"], 12, "IO2 (SD DATA0)"),
  io("GPIO4", "left", ["digital", "pwm", "analog", "interrupt"], 12, "IO4 (SD DATA1, flash LED)"),
  src("3V3", 3.3, 100, "right", "3V3"),
  io("GPIO16", "right", ["digital", "interrupt"], 12, "IO16 (PSRAM CS — avoid)"),
  io("GPIO0", "right", ["digital", "interrupt"], 12, "IO0 (GND to flash; camera XCLK)"),
  gnd("GND2", "right"),
  src("VCC", 3.3, 50, "right", "VCC (3.3 V out by default jumper)"),
  io("GPIO3", "right", ["digital", "uart_rx"], 12, "U0R / GPIO3"),
  io("GPIO1", "right", ["digital", "uart_tx"], 12, "U0T / GPIO1"),
  gnd("GND3", "right"),
];

// ───────────────────────── Raspberry Pi 4 (40-pin header) ─────────────────────────
function piCaps(n: number): PinCap[] {
  const c: PinCap[] = ["digital", "interrupt"];
  if ([12, 13, 18, 19].includes(n)) c.push("pwm");
  if (n === 2) c.push("i2c_sda");
  if (n === 3) c.push("i2c_scl");
  if (n === 10 || n === 20) c.push("spi_mosi");
  if (n === 9 || n === 19) c.push("spi_miso");
  if (n === 11 || n === 21) c.push("spi_sck");
  if ([8, 7, 16, 17, 18].includes(n)) c.push("spi_cs");
  if (n === 14) c.push("uart_tx");
  if (n === 15) c.push("uart_rx");
  if (n === 4) c.push("onewire");
  return c;
}
const PI_LABELS: Record<number, string> = {
  2: "GPIO2 (SDA1)", 3: "GPIO3 (SCL1)", 4: "GPIO4 (GPCLK0, 1-Wire)", 7: "GPIO7 (CE1)", 8: "GPIO8 (CE0)",
  9: "GPIO9 (MISO)", 10: "GPIO10 (MOSI)", 11: "GPIO11 (SCLK)", 12: "GPIO12 (PWM0)", 13: "GPIO13 (PWM1)",
  14: "GPIO14 (TXD)", 15: "GPIO15 (RXD)", 18: "GPIO18 (PWM0, PCM_CLK)", 19: "GPIO19 (PWM1, SPI1 MISO)",
  20: "GPIO20 (SPI1 MOSI)", 21: "GPIO21 (SPI1 SCLK)",
};
// Physical header order 1..40 (odd = inner row, even = outer row)
const PI_HEADER: string[] = [
  "3V3", "5V", "GPIO2", "5V2", "GPIO3", "GND", "GPIO4", "GPIO14", "GND2", "GPIO15",
  "GPIO17", "GPIO18", "GPIO27", "GND3", "GPIO22", "GPIO23", "3V3_2", "GPIO24", "GPIO10", "GND4",
  "GPIO9", "GPIO25", "GPIO11", "GPIO8", "GND5", "GPIO7", "ID_SD", "ID_SC", "GPIO5", "GND6",
  "GPIO6", "GPIO12", "GPIO13", "GND7", "GPIO19", "GPIO16", "GPIO26", "GPIO20", "GND8", "GPIO21",
];
const PI4_PINS: PinDef[] = PI_HEADER.map((id, i): PinDef => {
  const label = `pin ${i + 1}`;
  if (id.startsWith("GPIO")) {
    const n = Number(id.slice(4));
    return io(id, "top", piCaps(n), 16, `${PI_LABELS[n] ?? id} · ${label}`);
  }
  if (id.startsWith("GND")) return gnd(id, "top", `GND · ${label}`);
  if (id.startsWith("5V")) return src(id, 5, 1200, "top", `5V · ${label} (from USB-C supply)`);
  if (id.startsWith("3V3")) return src(id, 3.3, 500, "top", `3V3 · ${label}`);
  return pin(id, "nc", "top", { label: `${id} (HAT EEPROM, reserved) · ${label}` });
});

// ───────────────────────── Raspberry Pi Pico (RP2040) ─────────────────────────
function picoCaps(n: number): PinCap[] {
  const c: PinCap[] = ["digital", "pwm", "interrupt", "onewire"];
  if (n >= 26) c.push("analog");
  if ([0, 4, 8, 12, 16, 20, 2, 6, 10, 14, 18, 26].includes(n)) c.push("i2c_sda");
  if ([1, 5, 9, 13, 17, 21, 3, 7, 11, 15, 19, 27].includes(n)) c.push("i2c_scl");
  if ([0, 4, 16, 8, 12].includes(n)) c.push("spi_miso");
  if ([3, 7, 19, 11, 15].includes(n)) c.push("spi_mosi");
  if ([2, 6, 18, 10, 14].includes(n)) c.push("spi_sck");
  if ([1, 5, 17, 9, 13].includes(n)) c.push("spi_cs");
  if ([0, 12, 16, 4, 8].includes(n)) c.push("uart_tx");
  if ([1, 13, 17, 5, 9].includes(n)) c.push("uart_rx");
  return c;
}
const gp = (n: number, side: Side) => io(`GP${n}`, side, picoCaps(n), 12, n >= 26 ? `GP${n} / ADC${n - 26}` : undefined);
const PICO_PINS: PinDef[] = [
  // Left edge, pins 1–20
  gp(0, "left"), gp(1, "left"), gnd("GND", "left"), gp(2, "left"), gp(3, "left"), gp(4, "left"), gp(5, "left"), gnd("GND2", "left"),
  gp(6, "left"), gp(7, "left"), gp(8, "left"), gp(9, "left"), gnd("GND3", "left"), gp(10, "left"), gp(11, "left"), gp(12, "left"),
  gp(13, "left"), gnd("GND4", "left"), gp(14, "left"), gp(15, "left"),
  // Right edge, pins 21–40
  gp(16, "right"), gp(17, "right"), gnd("GND5", "right"), gp(18, "right"), gp(19, "right"), gp(20, "right"), gp(21, "right"),
  gnd("GND6", "right"), gp(22, "right"), pin("RUN", "in", "right", { caps: ["digital"] }), gp(26, "right"), gp(27, "right"),
  gnd("AGND", "right", "AGND"), gp(28, "right"), pin("ADC_VREF", "in", "right", { caps: ["analog"] }),
  src("3V3", 3.3, 300, "right", "3V3(OUT)"), pin("3V3_EN", "in", "right", { caps: ["digital"] }), gnd("GND7", "right"),
  src("VSYS", 5, 500, "right", "VSYS (≈VBUS − 0.3 V when USB-powered; 1.8–5.5 V in)"),
  src("VBUS", 5, 500, "right", "VBUS (USB 5 V)"),
];

// ───────────────────────── Registry ─────────────────────────
type Def = Omit<ComponentDef, "id">;
const c = <K extends ComponentId>(id: K, d: Def): ComponentDef => ({ id, ...d });

const two = (a: string, b: string, side: Side = "bottom"): PinDef[] => [pas(a, side), pas(b, side)];
const motorLeads = (): PinDef[] => [load("+", "left", "M+ (red)"), load("-", "left", "M− (black)")];

export const COMPONENTS: Record<ComponentId, ComponentDef> = {
  // Boards
  "arduino-uno": c("arduino-uno", { name: "Arduino Uno R3", category: "Boards", kind: "board", logicVolts: 5, fiveVoltTolerant: true,
    supply: { min: 7, max: 12 }, drawMa: 50, pins: UNO_PINS, draw: { w: 22, h: 16, color: "#00878F", textColor: "#FFFFFF" }, finderPartId: "uno" }),
  "arduino-nano": c("arduino-nano", { name: "Arduino Nano", category: "Boards", kind: "board", logicVolts: 5, fiveVoltTolerant: true,
    supply: { min: 7, max: 12 }, drawMa: 30, pins: NANO_PINS, draw: { w: 15, h: 6, color: "#0A4D8C", textColor: "#FFFFFF" }, finderPartId: "nano" }),
  "arduino-mega": c("arduino-mega", { name: "Arduino Mega 2560", category: "Boards", kind: "board", logicVolts: 5, fiveVoltTolerant: true,
    supply: { min: 7, max: 12 }, drawMa: 80, pins: MEGA_PINS, draw: { w: 34, h: 18, color: "#00878F", textColor: "#FFFFFF" }, finderPartId: "mega" }),
  "esp32-devkit": c("esp32-devkit", { name: "ESP32 DevKit (WROOM-32)", category: "Boards", kind: "board", logicVolts: 3.3, fiveVoltTolerant: false,
    supply: { min: 4.5, max: 5.5 }, drawMa: 240, pins: ESP32_PINS, draw: { w: 18, h: 9, color: "#1C1C1E", textColor: "#FFFFFF" }, finderPartId: "esp32" }),
  "esp8266-nodemcu": c("esp8266-nodemcu", { name: "ESP8266 NodeMCU (ESP-12E)", category: "Boards", kind: "board", logicVolts: 3.3, fiveVoltTolerant: false,
    supply: { min: 4.5, max: 9 }, drawMa: 170, pins: ESP8266_PINS, draw: { w: 16, h: 9, color: "#1C1C1E", textColor: "#FFFFFF" }, finderPartId: "esp8266" }),
  "esp32-cam": c("esp32-cam", { name: "ESP32-CAM (AI-Thinker, OV2640)", category: "Boards", kind: "board", logicVolts: 3.3, fiveVoltTolerant: false,
    supply: { min: 4.75, max: 5.25 }, drawMa: 310, pins: ESP32CAM_PINS, draw: { w: 9, h: 13, color: "#1C1C1E", textColor: "#FFFFFF" }, finderPartId: "esp32cam" }),
  "raspberry-pi-4": c("raspberry-pi-4", { name: "Raspberry Pi 4 Model B", category: "Boards", kind: "board", logicVolts: 3.3, fiveVoltTolerant: false,
    supply: { min: 4.75, max: 5.25 }, drawMa: 1000, pins: PI4_PINS, draw: { w: 28, h: 18, color: "#2E7D32", textColor: "#FFFFFF" }, finderPartId: "rpi4" }),
  "raspberry-pi-pico": c("raspberry-pi-pico", { name: "Raspberry Pi Pico (RP2040)", category: "Boards", kind: "board", logicVolts: 3.3, fiveVoltTolerant: false,
    supply: { min: 1.8, max: 5.5 }, drawMa: 30, pins: PICO_PINS, draw: { w: 17, h: 7, color: "#2E7D32", textColor: "#FFFFFF" }, finderPartId: "pico" }),

  // Passives & basic I/O
  led: c("led", { name: "LED 5 mm (needs series resistor)", category: "Actuators", kind: "passive", drawMa: 20,
    pins: [pas("A", "bottom", "A (anode, +, long leg)"), pas("K", "bottom", "K (cathode, −, flat side)")], draw: { w: 2, h: 3, color: "#E53935" }, finderPartId: "led" }),
  "rgb-led": c("rgb-led", { name: "RGB LED 5 mm (common cathode)", category: "Actuators", kind: "passive", drawMa: 60,
    pins: [pas("R", "bottom", "R (red anode)"), pas("K", "bottom", "K (common cathode, longest leg)"), pas("G", "bottom", "G (green anode)"), pas("B", "bottom", "B (blue anode)")],
    draw: { w: 4, h: 3, color: "#F5F5F5", textColor: "#111111" }, finderPartId: "led" }),
  resistor: c("resistor", { name: "Resistor (¼ W)", category: "Mechanical", kind: "passive", pins: two("A", "B"),
    draw: { w: 5, h: 1, color: "#D8C3A5", textColor: "#111111" }, finderPartId: "resistor" }),
  potentiometer: c("potentiometer", { name: "Potentiometer 10 kΩ", category: "Sensors", kind: "passive",
    pins: [pas("1", "bottom", "1 (end → GND)"), pas("W", "bottom", "W (wiper → analog in)"), pas("2", "bottom", "2 (end → VCC)")],
    draw: { w: 5, h: 5, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "potentiometer" }),
  "push-button": c("push-button", { name: "Tactile push button 6×6 mm", category: "Sensors", kind: "passive", pins: two("1", "2"),
    draw: { w: 3, h: 3, color: "#212121", textColor: "#FFFFFF" }, finderPartId: "button" }),
  "slide-switch": c("slide-switch", { name: "Slide switch (SPDT)", category: "Sensors", kind: "passive",
    pins: [pas("1", "bottom"), pas("C", "bottom", "C (common)"), pas("2", "bottom")], draw: { w: 4, h: 2, color: "#212121", textColor: "#FFFFFF" } }),
  ldr: c("ldr", { name: "Photoresistor (LDR, GL5528)", category: "Sensors", kind: "passive", pins: two("A", "B"),
    draw: { w: 2, h: 2, color: "#C62828", textColor: "#FFFFFF" }, finderPartId: "ldr" }),
  "buzzer-active": c("buzzer-active", { name: "Active buzzer (5 V, beeps on DC)", category: "Actuators", kind: "module", logicVolts: 5,
    supply: { min: 3.5, max: 5.5 }, drawMa: 30, pins: [inp("+", "bottom", ["digital"], "+ (long leg)"), gnd("-", "bottom", "−")],
    draw: { w: 3, h: 3, color: "#212121", textColor: "#FFFFFF" }, finderPartId: "buzzer" }),
  "buzzer-passive": c("buzzer-passive", { name: "Passive buzzer (needs tone/PWM)", category: "Actuators", kind: "module",
    drawMa: 30, pins: [inp("+", "bottom", ["pwm"], "+"), gnd("-", "bottom", "−")],
    draw: { w: 3, h: 3, color: "#212121", textColor: "#FFFFFF" }, finderPartId: "buzzer" }),
  capacitor: c("capacitor", { name: "Capacitor (electrolytic: A = +)", category: "Power", kind: "passive",
    pins: [pas("A", "bottom", "A (+, long leg)"), pas("B", "bottom", "B (−, stripe)")], draw: { w: 2, h: 3, color: "#1A237E", textColor: "#FFFFFF" } }),
  diode: c("diode", { name: "Diode (1N4007 / 1N4148)", category: "Power", kind: "passive",
    pins: [pas("A", "bottom", "A (anode)"), pas("K", "bottom", "K (cathode, stripe)")], draw: { w: 4, h: 1, color: "#212121", textColor: "#FFFFFF" } }),
  "npn-transistor": c("npn-transistor", { name: "NPN transistor (2N2222 / BC547)", category: "Drivers", kind: "passive",
    pins: [pas("E", "bottom", "E (emitter)"), pas("B", "bottom", "B (base, via 1 kΩ)"), pas("C", "bottom", "C (collector)")],
    draw: { w: 3, h: 3, color: "#212121", textColor: "#FFFFFF" } }),
  "mosfet-n": c("mosfet-n", { name: "N-MOSFET logic-level (IRLZ44N, TO-220)", category: "Drivers", kind: "passive",
    pins: [pas("G", "bottom", "G (gate)"), pas("D", "bottom", "D (drain → load −)"), pas("S", "bottom", "S (source → GND)")],
    draw: { w: 4, h: 5, color: "#212121", textColor: "#FFFFFF" } }),
  "ir-led": c("ir-led", { name: "IR LED 940 nm", category: "Wireless", kind: "passive", drawMa: 50,
    pins: [pas("A", "bottom", "A (anode, +)"), pas("K", "bottom", "K (cathode, −)")], draw: { w: 2, h: 3, color: "#B0BEC5", textColor: "#111111" } }),

  // Sensors
  "hc-sr04": c("hc-sr04", { name: "HC-SR04 ultrasonic sensor", category: "Sensors", kind: "module", logicVolts: 5, supply: { min: 4.5, max: 5.5 }, drawMa: 15,
    pins: [vcc("VCC", "bottom"), inp("TRIG", "bottom"), out("ECHO", "bottom", ["digital"], 5, "ECHO (5 V out — divide for 3.3 V boards)"), gnd("GND", "bottom")],
    draw: { w: 12, h: 5, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "hcsr04" }),
  "pir-hc-sr501": c("pir-hc-sr501", { name: "HC-SR501 PIR motion sensor", category: "Sensors", kind: "module", logicVolts: 3.3, supply: { min: 4.5, max: 20 }, drawMa: 1,
    pins: [vcc("VCC", "bottom"), out("OUT", "bottom", ["digital"], 3.3), gnd("GND", "bottom")], draw: { w: 8, h: 8, color: "#2E7D32", textColor: "#FFFFFF" }, finderPartId: "pir" }),
  dht11: c("dht11", { name: "DHT11 module (3-pin, pull-up onboard)", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5.5 }, drawMa: 3,
    pins: [vcc("VCC", "bottom", "+ / VCC"), out("DATA", "bottom", ["digital"], undefined, "DATA / OUT"), gnd("GND", "bottom", "− / GND")],
    draw: { w: 4, h: 6, color: "#1E88E5", textColor: "#FFFFFF" }, finderPartId: "dht11" }),
  dht22: c("dht22", { name: "DHT22 / AM2302 module (3-pin, pull-up onboard)", category: "Sensors", kind: "module", supply: { min: 3.3, max: 6 }, drawMa: 2,
    pins: [vcc("VCC", "bottom", "+ / VCC"), out("DATA", "bottom", ["digital"], undefined, "DATA / OUT"), gnd("GND", "bottom", "− / GND")],
    draw: { w: 4, h: 7, color: "#F5F5F5", textColor: "#111111" }, finderPartId: "dht22" }),
  ds18b20: c("ds18b20", { name: "DS18B20 temperature sensor (needs 4.7 kΩ pull-up)", category: "Sensors", kind: "module", supply: { min: 3, max: 5.5 }, drawMa: 2,
    pins: [gnd("GND", "bottom", "GND (black)"), out("DQ", "bottom", ["onewire"], undefined, "DQ (yellow, 1-Wire)"), vcc("VDD", "bottom", "VDD (red)")],
    draw: { w: 3, h: 3, color: "#212121", textColor: "#FFFFFF" }, finderPartId: "ds18b20" }),
  bmp280: c("bmp280", { name: "BMP280 pressure sensor (GY-BMP280, 3.3 V only)", category: "Sensors", kind: "module", logicVolts: 3.3, supply: { min: 1.8, max: 3.6 }, drawMa: 1,
    pins: [vcc("VCC", "bottom"), gnd("GND", "bottom"), inp("SCL", "bottom", ["i2c_scl"]), pin("SDA", "in", "bottom", { caps: ["i2c_sda"] }),
      inp("CSB", "bottom", ["digital"], "CSB (HIGH = I2C)"), inp("SDO", "bottom", ["digital"], "SDO (addr: GND 0x76 / VCC 0x77)")],
    draw: { w: 6, h: 4, color: "#6A1B9A", textColor: "#FFFFFF" }, finderPartId: "bme280" }),
  bme280: c("bme280", { name: "BME280 sensor (4-pin, onboard 3.3 V regulator)", category: "Sensors", kind: "module", logicVolts: 3.3, supply: { min: 3.3, max: 5 }, drawMa: 1,
    pins: [vcc("VIN", "bottom"), gnd("GND", "bottom"), inp("SCL", "bottom", ["i2c_scl"]), pin("SDA", "in", "bottom", { caps: ["i2c_sda"] })],
    draw: { w: 5, h: 4, color: "#6A1B9A", textColor: "#FFFFFF" }, finderPartId: "bme280" }),
  mpu6050: c("mpu6050", { name: "MPU6050 accelerometer/gyro (GY-521)", category: "Sensors", kind: "module", logicVolts: 3.3, supply: { min: 3.3, max: 5 }, drawMa: 4,
    pins: [vcc("VCC", "bottom"), gnd("GND", "bottom"), inp("SCL", "bottom", ["i2c_scl"]), pin("SDA", "in", "bottom", { caps: ["i2c_sda"] }),
      pas("XDA", "bottom", "XDA (aux I2C)"), pas("XCL", "bottom", "XCL (aux I2C)"), inp("AD0", "bottom", ["digital"], "AD0 (LOW 0x68 / HIGH 0x69)"),
      out("INT", "bottom", ["interrupt"], 3.3)],
    draw: { w: 8, h: 6, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "mpu6050" }),
  "soil-moisture-capacitive": c("soil-moisture-capacitive", { name: "Capacitive soil moisture sensor v1.2", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5.5 }, drawMa: 5,
    pins: [gnd("GND", "top"), vcc("VCC", "top"), out("AOUT", "top", ["analog"], 3, "AOUT (≈1.2–3 V)")], draw: { w: 4, h: 16, color: "#212121", textColor: "#FFFFFF" }, finderPartId: "soil" }),
  "water-level": c("water-level", { name: "Water level sensor (resistive strip)", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5 }, drawMa: 20,
    pins: [gnd("-", "bottom", "−"), vcc("+", "bottom", "+"), out("S", "bottom", ["analog"], undefined, "S (analog)")], draw: { w: 4, h: 13, color: "#B71C1C", textColor: "#FFFFFF" } }),
  "ldr-module": c("ldr-module", { name: "LDR light sensor module (LM393)", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5 }, drawMa: 5,
    pins: [vcc("VCC", "bottom"), gnd("GND", "bottom"), out("DO", "bottom", ["digital"]), out("AO", "bottom", ["analog"])], draw: { w: 4, h: 7, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "ldr" }),
  "sound-sensor": c("sound-sensor", { name: "Sound sensor KY-038 (LM393)", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5 }, drawMa: 5,
    pins: [out("AO", "bottom", ["analog"]), gnd("GND", "bottom"), vcc("VCC", "bottom", "+"), out("DO", "bottom", ["digital"])], draw: { w: 4, h: 9, color: "#B71C1C", textColor: "#FFFFFF" } }),
  "ir-receiver-vs1838b": c("ir-receiver-vs1838b", { name: "VS1838B IR receiver 38 kHz", category: "Wireless", kind: "module", supply: { min: 2.7, max: 5.5 }, drawMa: 1,
    pins: [out("OUT", "bottom", ["digital", "interrupt"]), gnd("GND", "bottom"), vcc("VCC", "bottom")], draw: { w: 3, h: 3, color: "#212121", textColor: "#FFFFFF" } }),
  tcrt5000: c("tcrt5000", { name: "TCRT5000 IR reflective sensor module", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5 }, drawMa: 20,
    pins: [vcc("VCC", "bottom"), gnd("GND", "bottom"), out("DO", "bottom", ["digital"]), out("AO", "bottom", ["analog"])], draw: { w: 4, h: 8, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "tcrt5000" }),
  "ir-obstacle": c("ir-obstacle", { name: "IR obstacle sensor FC-51", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5 }, drawMa: 20,
    pins: [out("OUT", "bottom", ["digital"], undefined, "OUT (LOW = obstacle)"), gnd("GND", "bottom"), vcc("VCC", "bottom")], draw: { w: 4, h: 8, color: "#1565C0", textColor: "#FFFFFF" } }),
  "line-sensor-array": c("line-sensor-array", { name: "5-channel IR line tracking sensor (TCRT5000)", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5 }, drawMa: 80,
    pins: [vcc("VCC", "top"), gnd("GND", "top"), ...[1, 2, 3, 4, 5].map((n) => out(`OUT${n}`, "top", ["digital"]))], draw: { w: 16, h: 4, color: "#1565C0", textColor: "#FFFFFF" } }),
  "hall-sensor-a3144": c("hall-sensor-a3144", { name: "A3144 Hall switch (open collector, needs pull-up)", category: "Sensors", kind: "module", supply: { min: 4.5, max: 24 }, drawMa: 4,
    pins: [vcc("VCC", "bottom", "1 VCC"), gnd("GND", "bottom", "2 GND"), out("OUT", "bottom", ["digital", "interrupt"], undefined, "3 OUT (open collector)")], draw: { w: 2, h: 2, color: "#212121", textColor: "#FFFFFF" } }),
  "reed-switch": c("reed-switch", { name: "Reed switch (normally open)", category: "Sensors", kind: "passive", pins: two("1", "2"), draw: { w: 5, h: 1, color: "#B0BEC5", textColor: "#111111" } }),
  "mq2-gas": c("mq2-gas", { name: "MQ-2 gas/smoke sensor module", category: "Sensors", kind: "module", supply: { min: 4.9, max: 5.1 }, drawMa: 160,
    pins: [vcc("VCC", "bottom"), gnd("GND", "bottom"), out("DO", "bottom", ["digital"]), out("AO", "bottom", ["analog"], 5)], draw: { w: 8, h: 8, color: "#1565C0", textColor: "#FFFFFF" } }),
  "mq135-air": c("mq135-air", { name: "MQ-135 air quality sensor module", category: "Sensors", kind: "module", supply: { min: 4.9, max: 5.1 }, drawMa: 160,
    pins: [vcc("VCC", "bottom"), gnd("GND", "bottom"), out("DO", "bottom", ["digital"]), out("AO", "bottom", ["analog"], 5)], draw: { w: 8, h: 8, color: "#1565C0", textColor: "#FFFFFF" } }),
  "flame-sensor": c("flame-sensor", { name: "Flame sensor KY-026", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5.5 }, drawMa: 15,
    pins: [out("AO", "bottom", ["analog"]), gnd("GND", "bottom"), vcc("VCC", "bottom", "+"), out("DO", "bottom", ["digital"])], draw: { w: 4, h: 9, color: "#B71C1C", textColor: "#FFFFFF" }, finderPartId: "flame" }),
  "rain-sensor": c("rain-sensor", { name: "Rain sensor (FC-37 / YL-83 + LM393 board)", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5 }, drawMa: 15,
    pins: [vcc("VCC", "left"), gnd("GND", "left"), out("DO", "left", ["digital"]), out("AO", "left", ["analog"])], draw: { w: 4, h: 7, color: "#1565C0", textColor: "#FFFFFF" } }),
  "touch-ttp223": c("touch-ttp223", { name: "TTP223 capacitive touch button", category: "Sensors", kind: "module", supply: { min: 2, max: 5.5 }, drawMa: 1,
    pins: [gnd("GND", "bottom"), vcc("VCC", "bottom"), out("SIG", "bottom", ["digital"], undefined, "I/O (SIG)")], draw: { w: 4, h: 5, color: "#C62828", textColor: "#FFFFFF" } }),
  joystick: c("joystick", { name: "Analog joystick KY-023", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5 }, drawMa: 1,
    pins: [gnd("GND", "left"), vcc("+5V", "left"), out("VRx", "left", ["analog"]), out("VRy", "left", ["analog"]), out("SW", "left", ["digital"], undefined, "SW (to GND, use INPUT_PULLUP)")],
    draw: { w: 10, h: 9, color: "#212121", textColor: "#FFFFFF" } }),
  "rotary-encoder": c("rotary-encoder", { name: "Rotary encoder KY-040", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5 }, drawMa: 1,
    pins: [out("CLK", "left", ["digital", "interrupt"]), out("DT", "left", ["digital", "interrupt"]), out("SW", "left", ["digital"]), vcc("+", "left"), gnd("GND", "left")],
    draw: { w: 6, h: 8, color: "#1565C0", textColor: "#FFFFFF" } }),
  "keypad-4x4": c("keypad-4x4", { name: "4×4 membrane keypad", category: "Sensors", kind: "module",
    pins: [...[1, 2, 3, 4].map((n) => pas(`R${n}`, "bottom", `R${n} (row)`)), ...[1, 2, 3, 4].map((n) => pas(`C${n}`, "bottom", `C${n} (column)`))],
    draw: { w: 18, h: 20, color: "#263238", textColor: "#FFFFFF" } }),
  "hx711-load-cell": c("hx711-load-cell", { name: "HX711 load cell amplifier", category: "Sensors", kind: "module", supply: { min: 2.6, max: 5.5 }, drawMa: 2,
    pins: [pas("E+", "left", "E+ (red)"), pas("E-", "left", "E− (black)"), pas("A-", "left", "A− (white)"), pas("A+", "left", "A+ (green)"), pas("B-", "left"), pas("B+", "left"),
      gnd("GND", "right"), out("DT", "right", ["digital"]), inp("SCK", "right"), vcc("VCC", "right")],
    draw: { w: 8, h: 5, color: "#2E7D32", textColor: "#FFFFFF" }, finderPartId: "hx711" }),
  max30102: c("max30102", { name: "MAX30102 pulse oximeter module", category: "Sensors", kind: "module", logicVolts: 3.3, supply: { min: 3.3, max: 5 }, drawMa: 20,
    pins: [vcc("VIN", "bottom"), pin("SDA", "in", "bottom", { caps: ["i2c_sda"] }), inp("SCL", "bottom", ["i2c_scl"]), out("INT", "bottom", ["interrupt"], 3.3),
      pin("IRD", "nc", "bottom"), pin("RD", "nc", "bottom"), gnd("GND", "bottom")],
    draw: { w: 5, h: 5, color: "#6A1B9A", textColor: "#FFFFFF" } }),
  ina219: c("ina219", { name: "INA219 current/voltage sensor (I2C)", category: "Sensors", kind: "module", logicVolts: 5, supply: { min: 3, max: 5.5 }, drawMa: 1,
    pins: [vcc("VCC", "bottom"), gnd("GND", "bottom"), inp("SCL", "bottom", ["i2c_scl"]), pin("SDA", "in", "bottom", { caps: ["i2c_sda"] }),
      load("VIN+", "top", "Vin+ (from supply, ≤26 V)"), load("VIN-", "top", "Vin− (to load)")],
    draw: { w: 6, h: 5, color: "#6A1B9A", textColor: "#FFFFFF" } }),
  acs712: c("acs712", { name: "ACS712 current sensor module (5 A)", category: "Sensors", kind: "module", logicVolts: 5, supply: { min: 4.5, max: 5.5 }, drawMa: 10,
    pins: [load("IP+", "left", "IP+ (screw terminal)"), load("IP-", "left", "IP− (screw terminal)"), vcc("VCC", "right"), out("OUT", "right", ["analog"], 5, "OUT (2.5 V at 0 A)"), gnd("GND", "right")],
    draw: { w: 8, h: 5, color: "#B71C1C", textColor: "#FFFFFF" } }),
  vl53l0x: c("vl53l0x", { name: "VL53L0X ToF distance sensor (GY-530, regulator onboard)", category: "Sensors", kind: "module", logicVolts: 3.3, supply: { min: 2.6, max: 5.5 }, drawMa: 20,
    pins: [vcc("VIN", "bottom"), gnd("GND", "bottom"), inp("SCL", "bottom", ["i2c_scl"]), pin("SDA", "in", "bottom", { caps: ["i2c_sda"] }),
      out("GPIO1", "bottom", ["interrupt"], 2.8, "GPIO1 (interrupt)"), inp("XSHUT", "bottom", ["digital"], "XSHUT (shutdown, active LOW)")],
    draw: { w: 5, h: 4, color: "#6A1B9A", textColor: "#FFFFFF" }, finderPartId: "vl53l0x" }),
  "gy-271-compass": c("gy-271-compass", { name: "GY-271 compass (HMC5883L / QMC5883L)", category: "Sensors", kind: "module", logicVolts: 3.3, supply: { min: 3, max: 5 }, drawMa: 1,
    pins: [vcc("VCC", "bottom"), gnd("GND", "bottom"), inp("SCL", "bottom", ["i2c_scl"]), pin("SDA", "in", "bottom", { caps: ["i2c_sda"] }), out("DRDY", "bottom", ["interrupt"], 3.3)],
    draw: { w: 5, h: 4, color: "#1565C0", textColor: "#FFFFFF" } }),
  "rtc-ds3231": c("rtc-ds3231", { name: "DS3231 RTC module (ZS-042)", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5.5 }, drawMa: 1,
    pins: [out("32K", "left", ["digital"]), out("SQW", "left", ["interrupt"]), inp("SCL", "left", ["i2c_scl"]), pin("SDA", "in", "left", { caps: ["i2c_sda"] }), vcc("VCC", "left"), gnd("GND", "left")],
    draw: { w: 8, h: 6, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "rtc" }),
  "neo-6m-gps": c("neo-6m-gps", { name: "NEO-6M GPS module (GY-GPS6MV2)", category: "Wireless", kind: "module", logicVolts: 3.3, supply: { min: 3.3, max: 5 }, drawMa: 45,
    pins: [vcc("VCC", "bottom"), inp("RX", "bottom", ["uart_rx"], "RX (3.3 V — divide from 5 V TX)"), out("TX", "bottom", ["uart_tx"], 3.3), gnd("GND", "bottom")],
    draw: { w: 8, h: 6, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "gps" }),
  "rc522-rfid": c("rc522-rfid", { name: "RC522 RFID reader 13.56 MHz (3.3 V only)", category: "Wireless", kind: "module", logicVolts: 3.3, supply: { min: 2.5, max: 3.6 }, drawMa: 26,
    pins: [inp("SDA", "bottom", ["spi_cs"], "SDA (SS / CS)"), inp("SCK", "bottom", ["spi_sck"]), inp("MOSI", "bottom", ["spi_mosi"]), out("MISO", "bottom", ["spi_miso"], 3.3),
      out("IRQ", "bottom", ["interrupt"], 3.3), gnd("GND", "bottom"), inp("RST", "bottom", ["digital"]), vcc("3.3V", "bottom")],
    draw: { w: 12, h: 10, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "rc522" }),
  "tilt-switch": c("tilt-switch", { name: "Tilt switch SW-520D (ball)", category: "Sensors", kind: "passive", pins: two("1", "2"), draw: { w: 2, h: 3, color: "#B0BEC5", textColor: "#111111" } }),
  "vibration-sw420": c("vibration-sw420", { name: "SW-420 vibration sensor module", category: "Sensors", kind: "module", supply: { min: 3.3, max: 5 }, drawMa: 15,
    pins: [vcc("VCC", "bottom"), gnd("GND", "bottom"), out("DO", "bottom", ["digital"])], draw: { w: 4, h: 8, color: "#1565C0", textColor: "#FFFFFF" } }),

  // Displays
  "lcd-1602-i2c": c("lcd-1602-i2c", { name: "LCD 1602 with I2C backpack (PCF8574)", category: "Displays", kind: "module", logicVolts: 5, supply: { min: 4.5, max: 5.5 }, drawMa: 30,
    pins: [gnd("GND", "left"), vcc("VCC", "left"), pin("SDA", "in", "left", { caps: ["i2c_sda"] }), inp("SCL", "left", ["i2c_scl"])],
    draw: { w: 27, h: 12, color: "#1B5E20", textColor: "#FFFFFF" }, finderPartId: "lcd1602" }),
  "oled-ssd1306": c("oled-ssd1306", { name: "SSD1306 OLED 0.96\" 128×64 (I2C)", category: "Displays", kind: "module", logicVolts: 3.3, supply: { min: 3.3, max: 5 }, drawMa: 20,
    pins: [gnd("GND", "top"), vcc("VCC", "top"), inp("SCL", "top", ["i2c_scl"]), pin("SDA", "in", "top", { caps: ["i2c_sda"] })],
    draw: { w: 9, h: 9, color: "#0D1B3E", textColor: "#FFFFFF" }, finderPartId: "ssd1306" }),
  "tm1637-display": c("tm1637-display", { name: "TM1637 4-digit 7-segment display", category: "Displays", kind: "module", supply: { min: 3.3, max: 5.5 }, drawMa: 80,
    pins: [inp("CLK", "right"), pin("DIO", "in", "right", { caps: ["digital"] }), vcc("VCC", "right"), gnd("GND", "right")],
    draw: { w: 14, h: 6, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "tm1637" }),
  "max7219-matrix": c("max7219-matrix", { name: "MAX7219 8×8 LED matrix module", category: "Displays", kind: "module", logicVolts: 5, supply: { min: 4, max: 5.5 }, drawMa: 320,
    pins: [vcc("VCC", "left"), gnd("GND", "left"), inp("DIN", "left", ["spi_mosi"]), inp("CS", "left", ["spi_cs"]), inp("CLK", "left", ["spi_sck"]),
      out("DOUT", "right", ["digital"], 5, "DOUT (to next module)")],
    draw: { w: 11, h: 11, color: "#C62828", textColor: "#FFFFFF" }, finderPartId: "max7219" }),
  "ws2812b-strip": c("ws2812b-strip", { name: "WS2812B LED strip (30 LEDs)", category: "Actuators", kind: "module", logicVolts: 5, supply: { min: 4, max: 5.5 }, drawMa: 1800,
    pins: [vcc("5V", "left", "+5V"), inp("DIN", "left", ["digital"], "DIN (330 Ω series)"), gnd("GND", "left"), out("DOUT", "right", ["digital"], 5)],
    draw: { w: 40, h: 2, color: "#ECEFF1", textColor: "#111111" }, finderPartId: "ws2812" }),
  "ws2812b-ring": c("ws2812b-ring", { name: "WS2812B LED ring (16 LEDs)", category: "Actuators", kind: "module", logicVolts: 5, supply: { min: 4, max: 5.5 }, drawMa: 960,
    pins: [vcc("5V", "bottom", "PWR +5V"), inp("DIN", "bottom", ["digital"], "DI (data in)"), gnd("GND", "bottom", "PWR GND"), out("DOUT", "bottom", ["digital"], 5, "DO (data out)")],
    draw: { w: 6, h: 6, color: "#212121", textColor: "#FFFFFF" }, finderPartId: "ws2812" }),
  "seven-segment": c("seven-segment", { name: "7-segment digit 0.56\" (common cathode)", category: "Displays", kind: "passive", drawMa: 160,
    pins: [...["g", "f", "COM", "a", "b"].map((id) => pas(id, "top", id === "COM" ? "COM (cathode)" : id)),
      ...["e", "d", "COM2", "c", "DP"].map((id) => pas(id, "bottom", id === "COM2" ? "COM (cathode)" : id))],
    draw: { w: 5, h: 7, color: "#212121", textColor: "#FFFFFF" } }),
  "tft-st7735": c("tft-st7735", { name: "ST7735 1.8\" TFT 128×160 (SPI, regulator onboard)", category: "Displays", kind: "module", logicVolts: 3.3, supply: { min: 3.3, max: 5 }, drawMa: 50,
    pins: [vcc("VCC", "left"), gnd("GND", "left"), inp("CS", "left", ["spi_cs"]), inp("RESET", "left", ["digital"]), inp("A0", "left", ["digital"], "A0 (DC)"),
      inp("SDA", "left", ["spi_mosi"], "SDA (MOSI)"), inp("SCK", "left", ["spi_sck"]), pin("LED", "vcc", "left", { label: "LED (backlight, 3.3 V)" })],
    draw: { w: 12, h: 17, color: "#B71C1C", textColor: "#FFFFFF" } }),
  "e-paper-2in9": c("e-paper-2in9", { name: "2.9\" e-paper module (Waveshare, SPI)", category: "Displays", kind: "module", logicVolts: 3.3, supply: { min: 3.3, max: 5 }, drawMa: 8,
    pins: [vcc("VCC", "left"), gnd("GND", "left"), inp("DIN", "left", ["spi_mosi"]), inp("CLK", "left", ["spi_sck"]), inp("CS", "left", ["spi_cs"]),
      inp("DC", "left", ["digital"]), inp("RST", "left", ["digital"]), out("BUSY", "left", ["digital"], 3.3)],
    draw: { w: 27, h: 11, color: "#ECEFF1", textColor: "#111111" } }),

  // Actuators & drivers
  "servo-sg90": c("servo-sg90", { name: "SG90 micro servo", category: "Actuators", kind: "module", supply: { min: 4.8, max: 6 }, drawMa: 650,
    pins: [gnd("GND", "left", "GND (brown)"), vcc("VCC", "left", "VCC (red)"), inp("SIG", "left", ["pwm"], "SIG (orange)")],
    draw: { w: 8, h: 4, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "sg90" }),
  "servo-mg996r": c("servo-mg996r", { name: "MG996R metal-gear servo", category: "Actuators", kind: "module", supply: { min: 4.8, max: 6.6 }, drawMa: 1500,
    pins: [gnd("GND", "left", "GND (brown)"), vcc("VCC", "left", "VCC (red)"), inp("SIG", "left", ["pwm"], "SIG (orange)")],
    draw: { w: 14, h: 7, color: "#212121", textColor: "#FFFFFF" }, finderPartId: "mg996r" }),
  "dc-motor": c("dc-motor", { name: "DC gear motor (TT, 3–6 V)", category: "Actuators", kind: "module", supply: { min: 3, max: 6 }, drawMa: 800,
    pins: motorLeads(), draw: { w: 7, h: 4, color: "#FBC02D", textColor: "#111111" }, finderPartId: "tt" }),
  l298n: c("l298n", { name: "L298N dual H-bridge motor driver", category: "Drivers", kind: "module", logicVolts: 5, supply: { min: 5, max: 35 }, drawMa: 36,
    pins: [load("OUT1", "left", "OUT1 (motor A)"), load("OUT2", "left", "OUT2 (motor A)"),
      vcc("12V", "bottom", "+12V (5–35 V motor supply)"), gnd("GND", "bottom"), src("5V", 5, 500, "bottom", "+5V (out with 5V-EN jumper on and ≤12 V in; adds input when off)"),
      inp("ENA", "bottom", ["pwm"], "ENA (remove jumper for PWM)"), inp("IN1", "bottom"), inp("IN2", "bottom"), inp("IN3", "bottom"), inp("IN4", "bottom"),
      inp("ENB", "bottom", ["pwm"], "ENB (remove jumper for PWM)"),
      load("OUT3", "right", "OUT3 (motor B)"), load("OUT4", "right", "OUT4 (motor B)")],
    draw: { w: 14, h: 14, color: "#B3261E", textColor: "#FFFFFF" }, finderPartId: "l298n" }),
  l9110s: c("l9110s", { name: "L9110S dual motor driver", category: "Drivers", kind: "module", supply: { min: 2.5, max: 12 }, drawMa: 10,
    pins: [inp("B-IA", "left", ["pwm"]), inp("B-IB", "left"), gnd("GND", "left"), vcc("VCC", "left", "VCC (2.5–12 V, also motor supply)"), inp("A-IA", "left", ["pwm"]), inp("A-IB", "left"),
      load("MA1", "right", "Motor A"), load("MA2", "right", "Motor A"), load("MB1", "right", "Motor B"), load("MB2", "right", "Motor B")],
    draw: { w: 8, h: 9, color: "#2E7D32", textColor: "#FFFFFF" }, finderPartId: "l9110s" }),
  tb6612fng: c("tb6612fng", { name: "TB6612FNG dual motor driver (SparkFun-style breakout)", category: "Drivers", kind: "module", supply: { min: 2.7, max: 5.5 }, drawMa: 2,
    pins: [load("VM", "left", "VM (motor supply 4.5–13.5 V)"), vcc("VCC", "left", "VCC (logic 2.7–5.5 V)"), gnd("GND", "left"),
      load("AO1", "left"), load("AO2", "left"), load("BO2", "left"), load("BO1", "left"), gnd("GND2", "left"),
      inp("PWMA", "right", ["pwm"]), inp("AIN2", "right"), inp("AIN1", "right"), inp("STBY", "right", ["digital"], "STBY (HIGH = run)"),
      inp("BIN1", "right"), inp("BIN2", "right"), inp("PWMB", "right", ["pwm"]), gnd("GND3", "right")],
    draw: { w: 8, h: 8, color: "#B3261E", textColor: "#FFFFFF" }, finderPartId: "tb6612" }),
  drv8833: c("drv8833", { name: "DRV8833 dual motor driver module", category: "Drivers", kind: "module", supply: { min: 2.7, max: 10.8 }, drawMa: 2,
    pins: [inp("IN1", "left", ["pwm"]), inp("IN2", "left", ["pwm"]), inp("IN3", "left", ["pwm"]), inp("IN4", "left", ["pwm"]),
      inp("EEP", "left", ["digital"], "EEP (nSLEEP, HIGH = run)"), out("ULT", "left", ["digital"], undefined, "ULT (nFAULT)"),
      load("OUT1", "right"), load("OUT2", "right"), load("OUT3", "right"), load("OUT4", "right"), vcc("VCC", "right", "VCC (2.7–10.8 V motor supply)"), gnd("GND", "right")],
    draw: { w: 7, h: 6, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "drv8833" }),
  "stepper-28byj48": c("stepper-28byj48", { name: "28BYJ-48 stepper motor (5 V unipolar)", category: "Actuators", kind: "module", supply: { min: 5, max: 5 }, drawMa: 240,
    pins: [load("BLU", "bottom", "blue (coil 1)"), load("PNK", "bottom", "pink (coil 2)"), load("YEL", "bottom", "yellow (coil 3)"), load("ORG", "bottom", "orange (coil 4)"), load("RED", "bottom", "red (common +5 V)")],
    draw: { w: 7, h: 7, color: "#90A4AE", textColor: "#111111" }, finderPartId: "uln2003" }),
  uln2003: c("uln2003", { name: "ULN2003 stepper driver board", category: "Drivers", kind: "module", logicVolts: 5, supply: { min: 5, max: 12 }, drawMa: 10,
    pins: [inp("IN1", "left"), inp("IN2", "left"), inp("IN3", "left"), inp("IN4", "left"), vcc("+", "bottom", "+ (5–12 V)"), gnd("-", "bottom", "−"),
      load("OUT1", "top", "motor connector A"), load("OUT2", "top", "motor connector B"), load("OUT3", "top", "motor connector C"), load("OUT4", "top", "motor connector D"), load("COM", "top", "motor connector + (red)")],
    draw: { w: 9, h: 7, color: "#2E7D32", textColor: "#FFFFFF" }, finderPartId: "uln2003" }),
  a4988: c("a4988", { name: "A4988 stepper driver (Pololu-style carrier)", category: "Drivers", kind: "module", supply: { min: 3, max: 5.5 }, drawMa: 8,
    pins: [inp("ENABLE", "left", ["digital"], "EN (LOW = enabled)"), inp("MS1", "left"), inp("MS2", "left"), inp("MS3", "left"),
      inp("RESET", "left", ["digital"], "RST (tie to SLP)"), inp("SLEEP", "left", ["digital"], "SLP"), inp("STEP", "left"), inp("DIR", "left"),
      load("VMOT", "right", "VMOT (8–35 V, 100 µF cap)"), gnd("GND", "right"), load("2B", "right"), load("2A", "right"), load("1A", "right"), load("1B", "right"),
      vcc("VDD", "right", "VDD (logic 3–5.5 V)"), gnd("GND2", "right")],
    draw: { w: 6, h: 8, color: "#2E7D32", textColor: "#FFFFFF" }, finderPartId: "a4988" }),
  "stepper-nema17": c("stepper-nema17", { name: "NEMA 17 bipolar stepper", category: "Actuators", kind: "module", drawMa: 1500,
    pins: [load("A+", "bottom", "A+ (coil A)"), load("A-", "bottom", "A− (coil A)"), load("B+", "bottom", "B+ (coil B)"), load("B-", "bottom", "B− (coil B)")],
    draw: { w: 14, h: 14, color: "#37474F", textColor: "#FFFFFF" }, finderPartId: "nema17" }),
  "relay-module": c("relay-module", { name: "1-channel 5 V relay module", category: "Drivers", kind: "module", logicVolts: 5, supply: { min: 4.5, max: 5.5 }, drawMa: 70,
    pins: [vcc("VCC", "left"), gnd("GND", "left"), inp("IN", "left", ["digital"], "IN (check active LOW/HIGH)"),
      load("COM", "right"), load("NO", "right", "NO (normally open)"), load("NC", "right", "NC (normally closed)")],
    draw: { w: 10, h: 6, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "relay" }),
  "water-pump": c("water-pump", { name: "Mini submersible pump (3–5 V)", category: "Actuators", kind: "module", supply: { min: 3, max: 5 }, drawMa: 200,
    pins: motorLeads(), draw: { w: 6, h: 4, color: "#ECEFF1", textColor: "#111111" }, finderPartId: "pump" }),
  "solenoid-lock": c("solenoid-lock", { name: "12 V solenoid lock (needs flyback diode)", category: "Actuators", kind: "module", supply: { min: 9, max: 12 }, drawMa: 600,
    pins: [load("+", "left", "+ (red)"), load("-", "left", "− (black)")], draw: { w: 10, h: 6, color: "#9E9E9E", textColor: "#111111" } }),
  "vibration-motor": c("vibration-motor", { name: "Coin vibration motor (3 V)", category: "Actuators", kind: "module", supply: { min: 2.5, max: 3.5 }, drawMa: 80,
    pins: [load("+", "left", "+ (red)"), load("-", "left", "− (blue/black)")], draw: { w: 2, h: 2, color: "#9E9E9E", textColor: "#111111" } }),
  "fan-5v": c("fan-5v", { name: "5 V DC fan 40 mm", category: "Actuators", kind: "module", supply: { min: 4.5, max: 5.5 }, drawMa: 150,
    pins: [load("+", "left", "+ (red)"), load("-", "left", "− (black)")], draw: { w: 8, h: 8, color: "#212121", textColor: "#FFFFFF" } }),

  // Wireless, storage & audio
  "hc-05": c("hc-05", { name: "HC-05 Bluetooth module (ZS-040)", category: "Wireless", kind: "module", logicVolts: 3.3, supply: { min: 3.6, max: 6 }, drawMa: 40,
    pins: [out("STATE", "bottom", ["digital"], 3.3), inp("RXD", "bottom", ["uart_rx"], "RXD (3.3 V — divide from 5 V TX)"), out("TXD", "bottom", ["uart_tx"], 3.3),
      gnd("GND", "bottom"), vcc("VCC", "bottom"), inp("EN", "bottom", ["digital"], "EN / KEY (AT mode)")],
    draw: { w: 6, h: 11, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "hc05" }),
  nrf24l01: c("nrf24l01", { name: "nRF24L01+ radio (3.3 V only, add 10 µF cap)", category: "Wireless", kind: "module", logicVolts: 3.3, supply: { min: 1.9, max: 3.6 }, drawMa: 15,
    pins: [gnd("GND", "left"), vcc("VCC", "left", "VCC (3.3 V!)"), inp("CE", "left"), inp("CSN", "left", ["spi_cs"]), inp("SCK", "left", ["spi_sck"]),
      inp("MOSI", "left", ["spi_mosi"]), out("MISO", "left", ["spi_miso"], 3.3), out("IRQ", "left", ["interrupt"], 3.3)],
    draw: { w: 8, h: 5, color: "#1B5E20", textColor: "#FFFFFF" }, finderPartId: "nrf24" }),
  "lora-sx1278": c("lora-sx1278", { name: "SX1278 LoRa 433 MHz (Ra-02, 3.3 V only)", category: "Wireless", kind: "module", logicVolts: 3.3, supply: { min: 1.8, max: 3.7 }, drawMa: 120,
    pins: [gnd("GND", "left"), vcc("3.3V", "left"), inp("RESET", "left", ["digital"]), out("DIO0", "left", ["interrupt"], 3.3), out("DIO1", "left", ["digital"], 3.3),
      out("DIO2", "left", ["digital"], 3.3), inp("NSS", "right", ["spi_cs"]), inp("SCK", "right", ["spi_sck"]), inp("MOSI", "right", ["spi_mosi"]),
      out("MISO", "right", ["spi_miso"], 3.3), gnd("GND2", "right"), pin("ANT", "nc", "top", { label: "ANT (antenna, required)" })],
    draw: { w: 7, h: 7, color: "#B0BEC5", textColor: "#111111" }, finderPartId: "lora" }),
  "sd-card-module": c("sd-card-module", { name: "microSD card module (5 V, regulator + level shifter)", category: "Wireless", kind: "module", logicVolts: 5, supply: { min: 4.5, max: 5.5 }, drawMa: 80,
    pins: [gnd("GND", "left"), vcc("VCC", "left"), out("MISO", "left", ["spi_miso"], 3.3), inp("MOSI", "left", ["spi_mosi"]), inp("SCK", "left", ["spi_sck"]), inp("CS", "left", ["spi_cs"])],
    draw: { w: 8, h: 11, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "sdcard" }),
  "dfplayer-mini": c("dfplayer-mini", { name: "DFPlayer Mini MP3 module", category: "Actuators", kind: "module", logicVolts: 3.3, supply: { min: 3.2, max: 5 }, drawMa: 30,
    pins: [vcc("VCC", "left"), inp("RX", "left", ["uart_rx"], "RX (1 kΩ series from 5 V TX)"), out("TX", "left", ["uart_tx"], 3.3), out("DAC_R", "left", ["analog"]), out("DAC_L", "left", ["analog"]),
      load("SPK_1", "left", "SPK_1 (speaker +)"), gnd("GND", "left"), load("SPK_2", "left", "SPK_2 (speaker −)"),
      out("BUSY", "right", ["digital"], 3.3, "BUSY (LOW = playing)"), pin("USB-", "nc", "right"), pin("USB+", "nc", "right"), inp("ADKEY_2", "right", ["analog"]),
      inp("ADKEY_1", "right", ["analog"]), inp("IO_2", "right"), gnd("GND2", "right"), inp("IO_1", "right")],
    draw: { w: 8, h: 8, color: "#C62828", textColor: "#FFFFFF" }, finderPartId: "dfplayer" }),
  "speaker-8ohm": c("speaker-8ohm", { name: "Speaker 8 Ω 0.5–3 W", category: "Actuators", kind: "module",
    pins: [load("+", "left", "+"), load("-", "left", "−")], draw: { w: 5, h: 5, color: "#212121", textColor: "#FFFFFF" } }),
  "ir-remote": c("ir-remote", { name: "IR remote control (NEC, 38 kHz)", category: "Wireless", kind: "mechanical", pins: [], draw: { w: 4, h: 9, color: "#212121", textColor: "#FFFFFF" } }),
  "microphone-max9814": c("microphone-max9814", { name: "MAX9814 microphone amplifier (AGC)", category: "Sensors", kind: "module", supply: { min: 2.7, max: 5.5 }, drawMa: 3,
    pins: [inp("AR", "bottom", ["digital"], "AR (attack/release)"), out("OUT", "bottom", ["analog"], undefined, "OUT (1.25 V bias, 2 Vpp)"), inp("GAIN", "bottom", ["digital"]), vcc("VDD", "bottom"), gnd("GND", "bottom")],
    draw: { w: 5, h: 5, color: "#6A1B9A", textColor: "#FFFFFF" } }),

  // Power
  "battery-9v": c("battery-9v", { name: "9 V battery (PP3) with snap", category: "Power", kind: "power",
    pins: [src("+", 9, 300, "top", "+ (red)"), gnd("-", "top", "− (black)")], draw: { w: 4, h: 7, color: "#212121", textColor: "#FFFFFF" }, finderPartId: "bat9v" }),
  "battery-2s-lipo": c("battery-2s-lipo", { name: "2S Li-ion/LiPo pack 7.4 V (8.4 V full)", category: "Power", kind: "power",
    pins: [src("+", 7.4, 5000, "top", "+ (red)"), gnd("-", "top", "− (black)")], draw: { w: 10, h: 5, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "bat2s" }),
  "battery-4xaa": c("battery-4xaa", { name: "4× AA battery holder (6 V)", category: "Power", kind: "power",
    pins: [src("+", 6, 2000, "top", "+ (red)"), gnd("-", "top", "− (black)")], draw: { w: 9, h: 6, color: "#212121", textColor: "#FFFFFF" } }),
  "battery-18650": c("battery-18650", { name: "18650 Li-ion cell 3.7 V (4.2 V full)", category: "Power", kind: "power",
    pins: [src("+", 3.7, 3000, "top", "+"), gnd("-", "top", "−")], draw: { w: 6, h: 2, color: "#2E7D32", textColor: "#FFFFFF" } }),
  "buck-converter-lm2596": c("buck-converter-lm2596", { name: "LM2596 buck converter (set output before connecting)", category: "Power", kind: "power", supply: { min: 6.5, max: 40 },
    pins: [vcc("IN+", "left", "IN+ (≥ Vout + 1.5 V)"), gnd("IN-", "left", "IN−"), src("OUT+", 5, 2000, "right", "OUT+ (adjust to 5 V before connecting)"), gnd("OUT-", "right", "OUT−")],
    draw: { w: 9, h: 4, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "buck" }),
  "tp4056-charger": c("tp4056-charger", { name: "TP4056 Li-ion charger with protection", category: "Power", kind: "power", supply: { min: 4.5, max: 5.5 },
    pins: [vcc("IN+", "left", "IN+ (5 V, or USB)"), gnd("IN-", "left", "IN−"), pas("B+", "top", "B+ (cell +)"), pas("B-", "top", "B− (cell −)"),
      src("OUT+", 3.7, 2000, "right", "OUT+ (battery voltage 3.0–4.2 V)"), gnd("OUT-", "right", "OUT−")],
    draw: { w: 6, h: 3, color: "#1565C0", textColor: "#FFFFFF" }, finderPartId: "tp4056" }),
  "usb-5v": c("usb-5v", { name: "USB 5 V supply / power bank", category: "Power", kind: "power",
    pins: [src("5V", 5, 1000, "right", "5V (VBUS)"), gnd("GND", "right")], draw: { w: 4, h: 3, color: "#424242", textColor: "#FFFFFF" } }),
  "breadboard-power-module": c("breadboard-power-module", { name: "MB102 breadboard power module", category: "Power", kind: "power", supply: { min: 6.5, max: 12 },
    pins: [vcc("VIN", "left", "DC jack 6.5–12 V"), src("5V", 5, 700, "bottom", "5V rail (jumper)"), src("3V3", 3.3, 700, "bottom", "3.3V rail (jumper)"), gnd("GND", "bottom")],
    draw: { w: 8, h: 5, color: "#C62828", textColor: "#FFFFFF" } }),
  "level-shifter": c("level-shifter", { name: "4-ch bidirectional logic level shifter (BSS138)", category: "Power", kind: "module", supply: { min: 1.8, max: 5.5 },
    pins: [...[1, 2].map((n) => pas(`LV${n}`, "left")), vcc("LV", "left", "LV (low side, e.g. 3.3 V)"), gnd("GND", "left"), ...[3, 4].map((n) => pas(`LV${n}`, "left")),
      ...[1, 2].map((n) => pas(`HV${n}`, "right")), vcc("HV", "right", "HV (high side, e.g. 5 V)"), gnd("GND2", "right"), ...[3, 4].map((n) => pas(`HV${n}`, "right"))],
    draw: { w: 5, h: 5, color: "#C62828", textColor: "#FFFFFF" }, finderPartId: "levelshift" }),

  // Mechanical
  "robot-chassis-2wd": c("robot-chassis-2wd", { name: "2WD robot chassis kit", category: "Mechanical", kind: "mechanical", pins: [], draw: { w: 20, h: 16, color: "#FFF3E0", textColor: "#111111" }, finderPartId: "chassis" }),
  "robot-chassis-4wd": c("robot-chassis-4wd", { name: "4WD robot chassis kit", category: "Mechanical", kind: "mechanical", pins: [], draw: { w: 22, h: 18, color: "#FFF3E0", textColor: "#111111" }, finderPartId: "chassis" }),
  "mecanum-wheels": c("mecanum-wheels", { name: "Mecanum wheels (set of 4)", category: "Mechanical", kind: "mechanical", pins: [], draw: { w: 6, h: 6, color: "#FBC02D", textColor: "#111111" } }),
  breadboard: c("breadboard", { name: "Breadboard 830 points", category: "Mechanical", kind: "mechanical", pins: [], draw: { w: 63, h: 20, color: "#F5F5F5", textColor: "#111111" } }),
  "jumper-wires": c("jumper-wires", { name: "Jumper wires (M-M, M-F)", category: "Mechanical", kind: "mechanical", pins: [], draw: { w: 4, h: 4, color: "#FF7A1A", textColor: "#111111" } }),
  enclosure: c("enclosure", { name: "Enclosure / project box", category: "Mechanical", kind: "mechanical", pins: [], draw: { w: 20, h: 14, color: "#455A64", textColor: "#FFFFFF" } }),
};

// Import-time integrity checks: keys match COMPONENT_IDS exactly; pin ids unique per component.
(() => {
  const keys = Object.keys(COMPONENTS);
  const expected = new Set<string>(COMPONENT_IDS);
  const extra = keys.filter((k) => !expected.has(k));
  const missing = COMPONENT_IDS.filter((id) => !(id in COMPONENTS));
  if (extra.length || missing.length) throw new Error(`hardware registry mismatch: missing [${missing.join(", ")}], extra [${extra.join(", ")}]`);
  for (const [key, def] of Object.entries(COMPONENTS)) {
    if (def.id !== key) throw new Error(`hardware registry: key ${key} has id ${def.id}`);
    const seen = new Set<string>();
    for (const p of def.pins) {
      if (seen.has(p.id)) throw new Error(`hardware registry: duplicate pin ${p.id} on ${key}`);
      seen.add(p.id);
    }
  }
})();

export function getComponent(id: ComponentId): ComponentDef {
  return COMPONENTS[id];
}
