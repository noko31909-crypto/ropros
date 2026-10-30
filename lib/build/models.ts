import { COMPONENTS } from "../hardware/components.ts";
import type { ComponentId } from "../hardware/ids.ts";

/**
 * Built-in 3D models of bought parts, made of simple primitives so the browser viewer (three.js) and the
 * OpenSCAD export can both draw them. Millimetres. The model lies flat, top side up (+Z); its origin is the
 * centre of its bottom face, so a part placed at [x, y, 0] sits on the build plate.
 * Sizes follow common datasheets; small details (pins, labels) are left out.
 */
export type Prim =
  | { type: "box"; size: [number, number, number]; at: [number, number, number]; color: string; finish?: Finish; rotate?: [number, number, number] }
  | { type: "cylinder"; r: number; h: number; at: [number, number, number]; color: string; finish?: Finish; rotate?: [number, number, number] }
  | { type: "sphere"; r: number; at: [number, number, number]; color: string; finish?: Finish };
export type Finish = "metal" | "glass" | "glossy" | "rubber";
export type PartModel = { size: [number, number, number]; prims: Prim[] };

const PCB_T = 1.6;
const BLACK = "#16181c", SILVER = "#c9cdd2", GOLD = "#d4a93c", WHITE = "#eef0f2";

const box = (size: [number, number, number], at: [number, number, number], color: string, finish?: Finish): Prim => ({ type: "box", size, at, color, ...(finish ? { finish } : {}) });
const cyl = (r: number, h: number, at: [number, number, number], color: string, finish?: Finish, rotate?: [number, number, number]): Prim => ({ type: "cylinder", r, h, at, color, ...(finish ? { finish } : {}), ...(rotate ? { rotate } : {}) });
/** A board: the PCB plus parts on top. `on(z)` gives the centre height of something `z` tall sitting on the PCB. */
const pcb = (w: number, d: number, color: string): Prim => box([w, d, PCB_T], [0, 0, PCB_T / 2], color, "glossy");
const on = (h: number) => PCB_T + h / 2;
const header = (len: number, x: number, y: number, alongY = false): Prim =>
  box(alongY ? [2.5, len, 8.5] : [len, 2.5, 8.5], [x, y, on(8.5)], BLACK);
const chip = (w: number, d: number, x: number, y: number): Prim => box([w, d, 1.2], [x, y, on(1.2)], "#222428");

function board(w: number, d: number, color: string, extra: Prim[]): PartModel {
  const top = Math.max(PCB_T, ...extra.map((p) => p.at[2] + (p.type === "box" ? p.size[2] / 2 : p.type === "cylinder" ? p.h / 2 : p.r)));
  return { size: [w, d, Math.round(top * 10) / 10], prims: [pcb(w, d, color), ...extra] };
}

const MODELS: Partial<Record<ComponentId, () => PartModel>> = {
  "arduino-uno": () => board(68.6, 53.4, "#00878F", [
    box([16, 12, 11], [-29, 9, on(11)], SILVER, "metal"), box([14, 9, 11], [-28.5, -18, on(11)], BLACK),
    header(48, 8, 24.4), header(40, 10, -24.4), box([35, 8, 4], [10, -8, on(4)], "#222428"), cyl(2, 3, [-14, -5, on(3)], SILVER, "metal"),
  ]),
  "arduino-mega": () => board(101.6, 53.3, "#00878F", [
    box([16, 12, 11], [-45, 9, on(11)], SILVER, "metal"), box([14, 9, 11], [-44.5, -18, on(11)], BLACK),
    header(78, 2, 24.4), header(70, 6, -24.4), header(45, 46, 0, true), chip(14, 14, 5, -2),
  ]),
  "arduino-nano": () => board(45, 18, "#0A4D8C", [box([8, 7.5, 4], [-20, 0, on(4)], SILVER, "metal"), header(38, 2, 7.6), header(38, 2, -7.6), chip(7, 7, 3, 0)]),
  "esp32-devkit": () => board(55, 28, BLACK, [
    box([18, 25.5, 0.8], [17, 0, on(0.8)], "#1f3d2a"), box([17, 17, 3.2], [14, 0, on(3.2)], SILVER, "metal"),
    box([8, 7.5, 3], [-25, 0, on(3)], SILVER, "metal"), header(44, -2, 12.7), header(44, -2, -12.7), box([4, 3, 1.5], [-20, 8, on(1.5)], "#888"),
  ]),
  "esp8266-nodemcu": () => board(58, 31, BLACK, [box([16, 24, 3], [15, 0, on(3)], SILVER, "metal"), box([8, 7.5, 3], [-26, 0, on(3)], SILVER, "metal"), header(42, -3, 14), header(42, -3, -14)]),
  "esp32-cam": () => board(40, 27, BLACK, [box([18, 16, 3], [5, 0, on(3)], SILVER, "metal"), box([8, 8, 5], [-10, 0, on(5)], "#202020"), cyl(3.5, 4, [-10, 0, on(5) + 4], "#0c0c10", "glass"), box([10, 11, 2], [15, 0, on(2)], GOLD)]),
  "raspberry-pi-4": () => board(85, 56, "#1B7A3A", [
    box([17.5, 13, 16], [33, 18, on(16)], SILVER, "metal"), box([17.5, 13, 16], [33, -0.5, on(16)], SILVER, "metal"), box([21, 16, 13.5], [32, -19, on(13.5)], SILVER, "metal"),
    box([51, 5, 8.5], [-6, 24, on(8.5)], BLACK), box([15, 15, 2.4], [-10, 0, on(2.4)], SILVER, "metal"), box([9, 7.5, 3.2], [-34, -24, on(3.2)], SILVER, "metal"),
  ]),
  "raspberry-pi-pico": () => board(51, 21, "#1B7A3A", [box([8, 7.5, 3], [-23, 0, on(3)], SILVER, "metal"), chip(7, 7, 2, 0), header(48, 0, 9.5), header(48, 0, -9.5)]),
  "hc-sr04": () => board(45, 20, "#1565C0", [cyl(8, 12, [-13, 0, on(12)], SILVER, "metal"), cyl(8, 12, [13, 0, on(12)], SILVER, "metal"), cyl(6.5, 12.2, [-13, 0, on(12)], "#2a2a2a"), cyl(6.5, 12.2, [13, 0, on(12)], "#2a2a2a"), box([3, 2, 1.5], [0, 7, on(1.5)], SILVER, "metal")]),
  "servo-sg90": () => ({ size: [32.5, 12.2, 29], prims: [
    box([22.8, 12.2, 22.5], [0, 0, 11.25], "#2f6fd6", "glossy"), box([32.5, 12.2, 2.5], [0, 0, 16], "#2f6fd6", "glossy"),
    cyl(6, 4, [5.4, 0, 24.5], "#2f6fd6", "glossy"), cyl(2.4, 3, [5.4, 0, 28], WHITE), box([20, 5.5, 1.6], [5.4, 0, 29.3], WHITE),
  ] }),
  "servo-mg996r": () => ({ size: [54, 20, 44], prims: [
    box([40.7, 19.7, 37], [0, 0, 18.5], BLACK), box([54, 19.7, 2.5], [0, 0, 28], BLACK), cyl(7, 4, [10, 0, 39], BLACK), cyl(3, 4, [10, 0, 42], GOLD, "metal"), box([30, 7, 2], [10, 0, 44], SILVER, "metal"),
  ] }),
  "dc-motor": () => ({ size: [70, 22.5, 18.8], prims: [
    box([37, 22.5, 18.8], [16, 0, 9.4], "#F2C200", "glossy"), cyl(9.4, 25, [-14, 0, 9.4], SILVER, "metal", [0, 90, 0]), cyl(2.7, 37, [22, 0, 9.4], WHITE, undefined, [90, 0, 0]),
  ] }),
  "l298n": () => board(43, 43, "#C62828", [
    box([23, 16, 25], [0, 8, on(25)], BLACK, "metal"), ...[-9, -4.5, 0, 4.5, 9].map((x) => box([1.5, 16, 6], [x, 8, on(25) + 15], BLACK, "metal")),
    box([8, 10, 10], [-17, -13, on(10)], "#1E5AA8"), box([8, 10, 10], [17, -13, on(10)], "#1E5AA8"), box([15, 8, 10], [0, -17, on(10)], "#1E5AA8"),
  ]),
  "tb6612fng": () => board(20.3, 20.3, "#7B1FA2", [chip(6, 5, 0, 0), header(18, 0, 8.9), header(18, 0, -8.9)]),
  "drv8833": () => board(18.5, 16, "#1565C0", [chip(5, 4, 0, 0), header(15, 0, 6.8), header(15, 0, -6.8)]),
  "l9110s": () => board(29, 23, "#C62828", [chip(4, 5, -4, 4), chip(4, 5, -4, -4), box([8, 16, 9], [9, 0, on(9)], "#1E5AA8")]),
  "relay-module": () => board(50, 26, "#1565C0", [box([19, 15.5, 15], [2, 0, on(15)], "#2a5bd7", "glossy"), box([10, 16, 10], [19, 0, on(10)], "#1E5AA8"), header(8, -22, 0, true)]),
  "battery-18650": () => ({ size: [65, 18.6, 18.6], prims: [cyl(9.3, 62, [0, 0, 9.3], "#2b6cb0", "glossy", [0, 90, 0]), cyl(9.3, 3, [31.5, 0, 9.3], SILVER, "metal", [0, 90, 0]), cyl(3, 1.5, [33.5, 0, 9.3], SILVER, "metal", [0, 90, 0])] }),
  "battery-2s-lipo": () => ({ size: [70, 35, 18], prims: [box([70, 35, 18], [0, 0, 9], "#3a3f47", "glossy"), box([20, 30, 0.5], [0, 0, 18.3], "#c62828"), box([4, 10, 4], [37, 8, 9], "#c62828"), box([4, 10, 4], [37, -8, 9], BLACK)] }),
  "battery-9v": () => ({ size: [48.5, 26.5, 17.5], prims: [box([46, 26.5, 17.5], [-1.2, 0, 8.75], BLACK, "glossy"), box([2.5, 24, 15], [23, 0, 8.75], GOLD, "metal"), cyl(4, 3, [25, 6.5, 8.75], SILVER, "metal", [0, 90, 0]), cyl(4, 3, [25, -6.5, 8.75], SILVER, "metal", [0, 90, 0])] }),
  "battery-4xaa": () => ({ size: [62, 58, 16], prims: [box([62, 58, 2], [0, 0, 1], BLACK), ...[-21.75, -7.25, 7.25, 21.75].map((y) => cyl(7.25, 50, [0, y, 8.6], "#2e7d32", "glossy", [0, 90, 0]))] }),
  "breadboard": () => ({ size: [82, 55, 8.5], prims: [box([82, 55, 8.5], [0, 0, 4.25], WHITE), box([80, 1, 0.3], [0, 23, 8.55], "#e53935"), box([80, 1, 0.3], [0, -23, 8.55], "#1e88e5"), box([80, 3, 0.3], [0, 0, 8.55], "#d6d9dc")] }),
  "oled-ssd1306": () => board(27.3, 27.8, "#1565C0", [box([26, 19, 1.6], [0, -2, on(1.6)], "#0b0f14", "glass"), header(10, 0, 12)]),
  "lcd-1602-i2c": () => board(80, 36, "#2E7D32", [box([71, 24, 7], [0, 0, on(7)], BLACK), box([64.5, 14.5, 0.4], [0, 0, on(7) + 3.7], "#3f7fbf", "glass")]),
  "tm1637-display": () => board(42, 24, "#1565C0", [box([30, 14, 7], [0, 0, on(7)], BLACK), box([28, 12, 0.3], [0, 0, on(7) + 3.6], "#5a1010", "glass")]),
  "max7219-matrix": () => board(32, 32, "#1565C0", [box([32, 32, 8], [0, 0, on(8)], BLACK), box([31, 31, 0.3], [0, 0, on(8) + 4.1], "#7a1616", "glass")]),
  "led": () => ({ size: [5.8, 5.8, 8.6], prims: [cyl(2.9, 1, [0, 0, 0.5], "#e53935", "glass"), cyl(2.5, 5, [0, 0, 3.5], "#e53935", "glass"), { type: "sphere", r: 2.5, at: [0, 0, 6], color: "#e53935", finish: "glass" }] }),
  "rgb-led": () => ({ size: [5.8, 5.8, 8.6], prims: [cyl(2.5, 6, [0, 0, 3], WHITE, "glass"), { type: "sphere", r: 2.5, at: [0, 0, 6], color: WHITE, finish: "glass" }] }),
  "buzzer-active": () => ({ size: [12, 12, 9.5], prims: [cyl(6, 9.5, [0, 0, 4.75], BLACK, "glossy"), cyl(1, 0.3, [0, 0, 9.6], "#555")] }),
  "buzzer-passive": () => ({ size: [12, 12, 8.5], prims: [cyl(6, 8.5, [0, 0, 4.25], BLACK, "glossy")] }),
  "potentiometer": () => ({ size: [10, 12, 22], prims: [box([10, 12, 7], [0, 0, 3.5], "#1E5AA8"), cyl(3.5, 6, [0, 0, 10], SILVER, "metal"), cyl(3, 10, [0, 0, 17], "#222")] }),
  "push-button": () => ({ size: [6, 6, 5], prims: [box([6, 6, 3.5], [0, 0, 1.75], BLACK), cyl(1.75, 1.5, [0, 0, 4.25], "#222")] }),
  "dht11": () => board(28, 13, "#1565C0", [box([12, 15.5, 5.5], [-4, 0, on(5.5)], "#4fa3e0")]),
  "dht22": () => board(28, 15, "#1565C0", [box([15, 20, 7.7], [-4, 0, on(7.7)], WHITE)]),
  "pir-hc-sr501": () => board(32, 24, "#2E7D32", [{ type: "sphere", r: 11.5, at: [0, 0, PCB_T], color: WHITE, finish: "glass" }]),
  "soil-moisture-capacitive": () => board(98, 23, BLACK, [box([20, 18, 3], [35, 0, on(3)], "#333"), box([60, 2, 0.3], [-15, 0, on(0.3)], WHITE)]),
  "water-pump": () => ({ size: [45, 24, 33], prims: [cyl(12, 30, [0, 0, 15], BLACK, "glossy"), cyl(3.5, 15, [0, 18, 26], BLACK, undefined, [90, 0, 0])] }),
  "stepper-28byj48": () => ({ size: [42, 28, 27], prims: [cyl(14, 19, [0, 0, 9.5], SILVER, "metal"), box([42, 7, 1], [0, 0, 18.5], SILVER, "metal"), box([16, 17, 14], [0, -14, 9.5], "#1E5AA8"), cyl(2.5, 8, [0, 8, 23], GOLD, "metal")] }),
  "stepper-nema17": () => ({ size: [42.3, 42.3, 64], prims: [box([42.3, 42.3, 40], [0, 0, 20], BLACK), box([42.3, 42.3, 8], [0, 0, 20], SILVER, "metal"), cyl(11, 2, [0, 0, 41], SILVER, "metal"), cyl(2.5, 24, [0, 0, 52], SILVER, "metal")] }),
  "ws2812b-ring": () => ({ size: [50, 50, 3.4], prims: [cyl(25, 1.6, [0, 0, 0.8], BLACK), cyl(16, 1.7, [0, 0, 0.8], "#0d0f12"), ...Array.from({ length: 12 }, (_, i) => box([5, 5, 1.6], [20.5 * Math.cos((i * Math.PI) / 6), 20.5 * Math.sin((i * Math.PI) / 6), 2.4], WHITE))] }),
  "ws2812b-strip": () => ({ size: [100, 10, 3], prims: [box([100, 10, 1], [0, 0, 0.5], WHITE), ...Array.from({ length: 6 }, (_, i) => box([5, 5, 1.6], [-41.5 + i * 16.6, 0, 1.8], WHITE))] }),
  "fan-5v": () => ({ size: [40, 40, 10], prims: [box([40, 40, 10], [0, 0, 5], BLACK), cyl(18, 10.2, [0, 0, 5], "#2a2a2a"), cyl(7, 10.4, [0, 0, 5], BLACK)] }),
  "robot-chassis-2wd": () => ({ size: [200, 150, 66], prims: [
    box([200, 130, 3], [0, 0, 36], "#cfe8ff", "glass"), cyl(33, 26, [30, 72, 33], BLACK, "rubber", [90, 0, 0]), cyl(33, 26, [30, -72, 33], BLACK, "rubber", [90, 0, 0]),
    cyl(20, 27, [30, 72, 33], "#F2C200", undefined, [90, 0, 0]), cyl(20, 27, [30, -72, 33], "#F2C200", undefined, [90, 0, 0]), cyl(8, 10, [-80, 0, 8], SILVER, "metal", [90, 0, 0]),
  ] }),
  "robot-chassis-4wd": () => ({ size: [250, 170, 66], prims: [
    box([250, 150, 3], [0, 0, 36], "#cfe8ff", "glass"), ...[[70, 1], [70, -1], [-70, 1], [-70, -1]].map(([x, s]) => cyl(33, 26, [x!, s! * 82, 33], BLACK, "rubber", [90, 0, 0])),
  ] }),
  "ir-receiver-vs1838b": () => ({ size: [6, 5, 7.5], prims: [box([6, 5, 7.5], [0, 0, 3.75], BLACK, "glossy"), { type: "sphere", r: 1.8, at: [0, -2.5, 5], color: BLACK, finish: "glossy" }] }),
  "rc522-rfid": () => board(60, 40, "#1565C0", [box([40, 30, 0.3], [5, 0, on(0.3)], GOLD, "metal"), chip(5, 5, -18, 0)]),
  "rtc-ds3231": () => board(38, 22, "#1565C0", [cyl(10, 3.2, [8, 0, on(3.2)], SILVER, "metal"), chip(8, 5, -10, 0)]),
  "mpu6050": () => board(21, 16, "#1565C0", [chip(4, 4, 0, 0)]),
  "bme280": () => board(13, 11, "#7B1FA2", [box([2.5, 2.5, 1], [0, 0, on(1)], SILVER, "metal")]),
  "bmp280": () => board(13, 11, "#7B1FA2", [box([2, 2.5, 1], [0, 0, on(1)], SILVER, "metal")]),
  "ds18b20": () => ({ size: [5, 4, 5], prims: [cyl(2.4, 5, [0, 0, 2.5], BLACK)] }),
  "joystick": () => board(34, 26, BLACK, [box([16, 16, 10], [-3, 0, on(10)], "#333"), cyl(3, 14, [-3, 0, on(10) + 10], BLACK), cyl(10, 8, [-3, 0, on(10) + 18], BLACK, "rubber")]),
  "buck-converter-lm2596": () => board(43, 21, "#1565C0", [cyl(5, 10, [-12, 0, on(10)], BLACK), box([12, 12, 7], [6, 0, on(7)], "#333"), box([10, 5, 9], [17, 6, on(9)], "#1E5AA8")]),
  "tp4056-charger": () => board(26, 17, "#1565C0", [box([7.5, 6, 3], [-10, 0, on(3)], SILVER, "metal"), chip(4, 4, 3, 0)]),
};

/** The built-in model, or a plain board-coloured slab sized from the diagram footprint for parts without one. */
export function partModel(id: ComponentId): PartModel {
  const m = MODELS[id];
  if (m) return m();
  const def = COMPONENTS[id];
  const w = Math.min(120, Math.max(8, def.draw.w * 3.1)), d = Math.min(120, Math.max(6, def.draw.h * 3.1));
  if (def.kind === "mechanical") return { size: [w, d, 10], prims: [box([w, d, 10], [0, 0, 5], "#8b95a5")] };
  return board(w, d, def.draw.color, [chip(Math.min(10, w / 3), Math.min(8, d / 3), 0, 0)]);
}

export const hasModel = (id: ComponentId) => id in MODELS;

/** "id: W x D x H mm" lines for the prompt, for parts with a built-in model. */
export function modelSizes(): string {
  return (Object.keys(MODELS) as ComponentId[]).map((id) => { const s = partModel(id).size; return `${id} ${s.map((v) => Math.round(v * 10) / 10).join("x")}`; }).join(", ");
}
