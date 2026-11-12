import type { ComponentId } from "../hardware/ids.ts";
import { MOUNTS } from "./mounts.ts";
import {
  BLACK, COPPER, GOLD, PCB_BLACK, PCB_BLUE, PCB_GREEN, PCB_PURPLE, PCB_RED, PCB_T, SILVER, WHITE,
  alongDir, axialLeads, ball, board, box, cyl, dip, edgePins, hole, ic, legs, microUsb, model, on, pins, qfp, smd,
  socket, solderRow, tact, terminal, trimmer, usbC, zigzag, type PartModel, type Prim, type V3,
} from "./prims.ts";

/**
 * Detailed 3D models of the registry parts, recognisable at a glance: real pin headers and sockets, chips with
 * legs, trimmers, antennas, screens, through-hole parts standing on their leads. Sizes follow the common modules'
 * drawings (mm). Each model sits on z = 0 with its origin at the centre of its footprint.
 */

const Y90: V3 = [0, 90, 0];
const X90: V3 = [90, 0, 0];
const CHIP = "#1d1f23";
const DARK = "#05070a";
const up = (dz: number, ps: Prim[]): Prim[] => ps.map((p) => ({ ...p, at: [p.at[0], p.at[1], p.at[2] + dz] as V3 }));
const holes = (id: ComponentId, r = 1.6): Prim[] => (MOUNTS[id]?.holes ?? []).flatMap(([x, y]) => hole(x, y, r));
const sot223 = (x: number, y: number): Prim[] => [box([6.5, 3.5, 1.6], [x, y, on(1.6)], CHIP, "glossy"), box([3, 1.6, 0.3], [x, y + 2.4, PCB_T + 0.15], SILVER, "metal")];
const sot23 = (x: number, y: number): Prim => box([2.9, 1.3, 1], [x, y, on(1)], CHIP, "glossy");
const qfn = (s: number, x: number, y: number): Prim => box([s, s, 0.9], [x, y, on(0.9)], CHIP, "glossy");
const elcap = (r: number, h: number, x: number, y: number, z0 = PCB_T): Prim[] => [
  cyl(r, h, [x, y, z0 + h / 2], "#17191d", "glossy"), cyl(r * 0.92, 0.15, [x, y, z0 + h + 0.05], SILVER, "metal"), box([r * 0.5, 0.3, h * 0.9], [x, y - r + 0.1, z0 + h / 2], "#c9ccd6"),
];
/** 5 mm LED lying on the board edge, looking out along -X (IR obstacle and flame sensors). */
const sideLed = (x: number, y: number, color: string, finish: "glass" | "glossy" = "glass"): Prim[] => [
  cyl(2.5, 5, [x, y, PCB_T + 3], color, finish, Y90), ball(2.5, [x - 2.5, y, PCB_T + 3], color, finish), cyl(2.9, 0.8, [x + 2.4, y, PCB_T + 3], color, finish, Y90),
];
/** LM393 comparator module kit: trimmer, SOIC-8, power and signal LEDs. */
const lm393 = (x: number, tall = false): Prim[] => [...trimmer(x, 0, tall), ...ic(4.9, 3.9, x + 9, 0, 4), ...smd(x + 9, 4.6, "#e53935"), ...smd(x + 9, -4.6, "#43a047")];
/** One digit of a 7-segment display (off segments dim red), centred at (x, y) on a face at height z. */
function digit(x: number, y: number, z: number, h = 13, color = "#5a1a1a"): Prim[] {
  const w = h * 0.45, t = h * 0.09;
  return [
    box([w, t, 0.1], [x, y + h / 2, z], color), box([w, t, 0.1], [x, y, z], color), box([w, t, 0.1], [x, y - h / 2, z], color),
    box([t, h / 2, 0.1], [x - w / 2, y + h / 4, z], color), box([t, h / 2, 0.1], [x + w / 2, y + h / 4, z], color),
    box([t, h / 2, 0.1], [x - w / 2, y - h / 4, z], color), box([t, h / 2, 0.1], [x + w / 2, y - h / 4, z], color),
    cyl(t * 0.6, 0.1, [x + w / 2 + t * 1.5, y - h / 2, z], color),
  ];
}
/** TO-92 package (transistor, DS18B20) on three legs. */
const to92 = (z = 4): Prim[] => [...legs(3, 1.27, 0, 0, z), cyl(2.3, 4.6, [0, 0.4, z + 2.3], CHIP, "glossy"), box([4.6, 1.4, 4.6], [0, -1.3, z + 2.3], CHIP, "glossy")];
/** A 5 mm LED standing on its legs. */
const led5 = (color: string, n = 2): Prim[] => [
  ...legs(n, n === 2 ? 2.54 : 1.27, 0, 0, 4), cyl(2.9, 1, [0, 0, 4.5], color, "glass"), cyl(2.5, 5, [0, 0, 7.5], color, "glass"), ball(2.5, [0, 0, 10], color, "glass"),
];

export const DETAILED_MODELS: Partial<Record<ComponentId, () => PartModel>> = {
  // ---- Boards ----------------------------------------------------------------------------------------------
  "arduino-uno": () => board(68.6, 53.4, "#00878F", [
    box([16, 12, 11], [-29, 9, on(11)], SILVER, "metal"), box([14, 9, 11], [-28.5, -18, on(11)], BLACK, "glossy"), cyl(2.6, 0.3, [-35.6, -18, on(11)], DARK, undefined, Y90),
    ...socket(10, -4, 24.4), ...socket(8, 21.6, 24.4), ...socket(8, 0.5, -24.4), ...socket(6, 21.6, -24.4),
    ...dip(28, 10, -8), ...qfp(5, -17, 2, 8), box([10, 4, 3.6], [-6, 3, on(3.6)], SILVER, "metal"),
    ...pins(3, 31.5, -2, true, 2), ...tact(-25.5, 21.5), ...sot223(-14, -20), ...elcap(3.15, 5.5, -14, -12),
    ...smd(5, 16, "#43a047"), ...smd(8.5, 16, "#fbc02d"), ...smd(12, 16, "#fbc02d"), ...smd(15.5, 16, "#fbc02d"),
    ...holes("arduino-uno"),
  ]),
  "arduino-mega": () => board(101.6, 53.3, "#00878F", [
    box([16, 12, 11], [-45, 9, on(11)], SILVER, "metal"), box([14, 9, 11], [-44.5, -18, on(11)], BLACK, "glossy"),
    ...socket(10, -24.9, 24.4), ...socket(8, -1.1, 24.4), ...socket(8, 21.9, 24.4), ...socket(8, -23, -24.4), ...socket(8, -1.2, -24.4), ...socket(8, 20.6, -24.4),
    ...socket(18, 44.7, 0, true), ...socket(18, 47.24, 0, true),
    ...qfp(14, 4, -4, 25), ...qfp(5, -33, 2, 8), box([10, 4, 3.6], [-22, 3, on(3.6)], SILVER, "metal"), ...pins(3, 33, -4, true, 2), ...tact(-41.5, 21.5),
    ...sot223(-30, -20), ...smd(-10, 16, "#43a047"), ...smd(-6.5, 16, "#fbc02d"), ...holes("arduino-mega"),
  ]),
  "arduino-nano": () => board(45, 18, "#0A4D8C", [
    box([9, 7.5, 4], [-19.5, 0, on(4)], SILVER, "metal"), ...qfp(7, 3, 0, 8), ...solderRow(15, 0, 7.62), ...solderRow(15, 0, -7.62),
    ...tact(13, 0), ...solderRow(3, 19.6, -1.27, true), ...solderRow(3, 19.6, 1.27, true), box([3.2, 1.3, 0.9], [-9, 3, on(0.9)], SILVER, "metal"),
    ...smd(-9, -3.5, "#e53935"), ...smd(-12.5, -3.5, "#43a047"),
  ]),
  "esp32-devkit": () => board(55, 28, PCB_BLACK, [
    box([25.5, 18, 0.8], [14.25, 0, on(0.8)], "#1f3d2a", "glossy"), box([17.6, 15.8, 2.4], [10.6, 0, PCB_T + 0.8 + 1.2], SILVER, "metal"), ...up(0.82, zigzag(23, 0, 7, 13)),
    microUsb(-25.2, 0, true), ...tact(-20.5, 8.5), ...tact(-20.5, -8.5), ...sot223(-12, 5), qfn(5, -12, -4), ...smd(-17, 0, "#e53935"),
    ...solderRow(19, -1.5, 12.7), ...solderRow(19, -1.5, -12.7),
  ]),
  "esp8266-nodemcu": () => board(58, 31, PCB_BLACK, [
    box([24, 16, 0.8], [15, 0, on(0.8)], "#1f3d2a", "glossy"), box([15, 12, 2.4], [11.5, 0, PCB_T + 0.8 + 1.2], SILVER, "metal"), ...up(0.82, zigzag(23.5, 0, 6, 12)),
    microUsb(-26.5, 0, true), ...tact(-21.5, 9), ...tact(-21.5, -9), ...ic(10, 4, -9, 0, 8), ...sot223(-9, 8.5), ...solderRow(15, -3, 14), ...solderRow(15, -3, -14),
  ]),
  "esp32-cam": () => board(40, 27, PCB_BLACK, [
    box([18, 16, 2.4], [6, 0, on(2.4)], SILVER, "metal"), box([8, 8, 5], [-11, 0, on(5)], "#202020"), cyl(3.5, 4, [-11, 0, on(5) + 4], "#0c0c10", "glass"), cyl(2, 0.2, [-11, 0, on(5) + 6.05], "#3b4a8a", "glass"),
    box([8, 5, 0.3], [-11, 6.5, PCB_T + 0.15], "#b5651d"), box([3, 3, 1], [17, 10, on(1)], "#fff3c4", "glossy"), ...solderRow(8, 0, 11.4), ...solderRow(8, 0, -11.4),
  ]),
  "raspberry-pi-4": () => board(85, 56, "#1B7A3A", [
    box([17.5, 13, 16], [33, 18, on(16)], SILVER, "metal"), box([17.5, 13, 16], [33, -0.5, on(16)], SILVER, "metal"), box([21, 16, 13.5], [32, -19, on(13.5)], SILVER, "metal"),
    ...pins(20, -6, 24.4, false, 2), box([15, 15, 2.4], [-10, 0, on(2.4)], SILVER, "metal"), box([15, 10, 1.2], [8, 2, on(1.2)], CHIP, "glossy"),
    usbC(-31.5, -24.5), box([7.5, 6.5, 3], [-18, -24.5, on(3)], SILVER, "metal"), box([7.5, 6.5, 3], [-4.5, -24.5, on(3)], SILVER, "metal"),
    cyl(3, 12, [9.5, -22, PCB_T + 3], BLACK, "glossy", X90), box([2.6, 22, 5.5], [-37.5, 0, on(5.5)], "#f0eee6"), ...holes("raspberry-pi-4", 1.4),
  ]),
  "raspberry-pi-pico": () => board(51, 21, "#1B7A3A", [
    microUsb(-23.4, 0, true), qfn(7, 2, 0), box([3.5, 3, 1.5], [-14, 0, on(1.5)], WHITE), box([5, 4, 1], [-6, 3, on(1)], CHIP), box([3.2, 1.3, 0.9], [-7, -3.5, on(0.9)], SILVER, "metal"),
    ...Array.from({ length: 20 }, (_, i) => [-1, 1].map((s) => box([1.6, 1.2, 0.06], [(i - 9.5) * 2.54, s * 9.9, PCB_T + 0.03], GOLD, "metal"))).flat(),
    ...solderRow(3, 24, 0, true), ...holes("raspberry-pi-pico", 1.05),
  ]),

  // ---- Basics ----------------------------------------------------------------------------------------------
  "led": () => model(led5("#e53935")),
  "rgb-led": () => model(led5("#f2f4f7", 4)),
  "ir-led": () => model(led5("#3d4a8f")),
  "resistor": () => model([
    ...axialLeads(6.3, 7.6, 2.4), cyl(1.15, 4.4, [0, 0, 2.4], "#d9c39f", "glossy", Y90),
    cyl(1.3, 1.1, [-2.55, 0, 2.4], "#d9c39f", "glossy", Y90), cyl(1.3, 1.1, [2.55, 0, 2.4], "#d9c39f", "glossy", Y90),
    // 220 Ω: red, red, brown, gold
    cyl(1.19, 0.45, [-1.6, 0, 2.4], "#c62828", undefined, Y90), cyl(1.19, 0.45, [-0.7, 0, 2.4], "#c62828", undefined, Y90),
    cyl(1.19, 0.45, [0.2, 0, 2.4], "#5d3a1a", undefined, Y90), cyl(1.32, 0.45, [1.9, 0, 2.4], GOLD, "metal", Y90),
  ]),
  "diode": () => model([...axialLeads(5.2, 7.6, 1.7), cyl(1.35, 5.2, [0, 0, 1.7], "#141518", "glossy", Y90), cyl(1.38, 0.7, [1.9, 0, 1.7], "#cfd3d8", undefined, Y90)]),
  "capacitor": () => model([...legs(2, 2.5, 0, 0, 3), ...elcap(3.15, 11, 0, 0, 3), box([4.6, 0.25, 0.05], [0, 0, 14.2], DARK), box([0.25, 4.6, 0.05], [0, 0, 14.2], DARK)]),
  "ldr": () => model([
    ...legs(2, 3.4, 0, 0, 4), cyl(2.6, 2, [0, 0, 5], "#e9e1d0", "glossy"), cyl(2.4, 0.1, [0, 0, 6.05], "#c4622d"),
    ...[-1.2, -0.4, 0.4, 1.2].map((y) => box([3.4, 0.25, 0.05], [0, y, 6.12], "#3a2a1a")),
  ]),
  "slide-switch": () => model([...legs(3, 2.54, 0, 0, 2), box([8.6, 3.6, 3.5], [0, 0, 3.75], SILVER, "metal"), box([1.6, 1.4, 2.6], [-0.9, 0, 6.8], BLACK)]),
  "npn-transistor": () => model(to92()),
  "ds18b20": () => model(to92()),
  "mosfet-n": () => model([
    ...legs(3, 2.54, 0, 0, 4), box([10.2, 4.5, 9.2], [0, -0.6, 8.6], CHIP, "glossy"), box([10.2, 1.3, 15.6], [0, 2.3, 11.8], SILVER, "metal"), cyl(1.8, 1.5, [0, 2.3, 17.2], DARK, undefined, X90),
  ]),
  "hall-sensor-a3144": () => model([...legs(3, 1.27, 0, 0, 4), box([4.1, 1.5, 3], [0, 0, 5.5], CHIP, "glossy")]),
  "reed-switch": () => model([...axialLeads(14, 14, 1.4), cyl(1.25, 14, [0, 0, 1.4], "#d9ecff", "glass", Y90), box([6, 0.5, 0.3], [-2.8, 0, 1.4], SILVER, "metal"), box([6, 0.5, 0.3], [2.8, 0, 1.45], SILVER, "metal")]),
  "tilt-switch": () => model([...legs(2, 2.54, 0, 0, 3), cyl(2.75, 11, [0, 0, 8.5], CHIP, "glossy")]),
  "ir-receiver-vs1838b": () => model([...legs(3, 2.54, 0, 0, 4), box([6, 5, 7.5], [0, 0, 7.75], BLACK, "glossy"), ball(1.8, [0, -2.5, 9], BLACK, "glossy")]),
  "push-button": () => model([
    box([6, 6, 3.5], [0, 0, 1.75], BLACK), box([6.2, 6.2, 0.3], [0, 0, 3.6], SILVER, "metal"), cyl(1.75, 1.5, [0, 0, 4.25], "#222"),
    ...[-1, 1].flatMap((sx) => [-1, 1].map((sy) => box([1.4, 0.7, 0.4], [sx * 3.5, sy * 2.25, 0.2], SILVER, "metal"))),
  ]),
  "seven-segment": () => model([
    ...legs(5, 2.54, 0, 7.62, 3), ...legs(5, 2.54, 0, -7.62, 3), box([12.6, 19, 8], [0, 0, 7], "#202226", "glossy"), ...digit(-0.6, 0, 11.05),
  ]),

  // ---- Sensor modules -----------------------------------------------------------------------------------------
  "water-level": () => board(62, 20, PCB_RED, [
    ...Array.from({ length: 10 }, (_, i) => box([40, 0.8, 0.05], [-9, -7.2 + i * 1.6, PCB_T + 0.03], SILVER, "metal")), ...edgePins(3, 28.6, 0, 1), ...smd(22, 6, "#e53935"), ...smd(22, -5),
  ]),
  "ldr-module": () => board(32, 14, PCB_BLUE, [
    ...up(PCB_T, legs(2, 3.4, -12.5, 0, 3, true)), cyl(2.6, 2, [-12.5, 0, PCB_T + 4], "#e9e1d0", "glossy"), cyl(2.4, 0.1, [-12.5, 0, PCB_T + 5.05], "#c4622d"),
    ...lm393(-4), ...edgePins(4, 14.3, 0, 1),
  ]),
  "sound-sensor": () => board(35, 15, PCB_RED, [
    cyl(4.9, 6.7, [-15, 0, PCB_T + 5.1], SILVER, "metal", Y90), cyl(4.5, 0.3, [-18.5, 0, PCB_T + 5.1], "#1a1a1a", undefined, Y90), ...lm393(-4, true), ...edgePins(4, 15.8, 0, 1),
  ]),
  "tcrt5000": () => board(32, 14, PCB_BLUE, [
    box([10.2, 5.8, 7], [-10.5, 0, on(7)], BLACK, "glossy"), cyl(1.6, 0.6, [-13, 0, PCB_T + 7.3], "#4a6fd1", "glass"), cyl(1.6, 0.6, [-8, 0, PCB_T + 7.3], "#111", "glass"),
    ...trimmer(0, 0), ...ic(4.9, 3.9, 8, 0, 4), ...edgePins(4, 14.3, 0, 1),
  ]),
  "ir-obstacle": () => board(31, 14, PCB_BLUE, [
    ...sideLed(-14, 3, "#dfe8f2"), ...sideLed(-14, -3, "#18191c", "glossy"), ...lm393(-4), ...edgePins(3, 13.8, 0, 1),
  ]),
  "line-sensor-array": () => board(70, 20, PCB_BLUE, [
    ...Array.from({ length: 5 }, (_, i) => [box([6, 4, 3.2], [-24 + 12 * i, -4, on(3.2)], BLACK, "glossy"), ...smd(-24 + 12 * i, 2.5, "#e53935")]).flat(), ...pins(7, 0, 8),
  ]),
  "mq2-gas": () => board(32, 22, PCB_BLUE, [
    cyl(9.8, 2, [-5, 0, PCB_T + 1], "#3a3f45"), cyl(9.6, 13, [-5, 0, PCB_T + 8.5], "#aeb4ba", "metal"), cyl(9, 0.3, [-5, 0, PCB_T + 15.15], "#7c838a", "metal"),
    ...trimmer(9.5, -5), ...ic(4.9, 3.9, 9.5, 5, 4), ...edgePins(4, 14.8, 0, 1),
  ]),
  "mq135-air": () => board(32, 22, PCB_BLUE, [
    cyl(9.8, 2, [-5, 0, PCB_T + 1], "#3a3f45"), cyl(9.6, 13, [-5, 0, PCB_T + 8.5], "#c3c8cd", "metal"), cyl(9, 0.3, [-5, 0, PCB_T + 15.15], "#8b9298", "metal"),
    ...trimmer(9.5, -5), ...ic(4.9, 3.9, 9.5, 5, 4), ...edgePins(4, 14.8, 0, 1),
  ]),
  "flame-sensor": () => board(35, 15, PCB_RED, [...sideLed(-15, 0, "#141518", "glossy"), ...lm393(-4, true), ...edgePins(4, 15.8, 0, 1)]),
  "rain-sensor": () => board(54, 40, PCB_BLUE, [
    box([1.2, 34, 0.05], [-23, 0, PCB_T + 0.03], SILVER, "metal"), box([1.2, 34, 0.05], [23, 0, PCB_T + 0.03], SILVER, "metal"),
    ...Array.from({ length: 10 }, (_, i) => box([44, 1.2, 0.05], [i % 2 ? 2 : -2, -15 + i * 3.33, PCB_T + 0.03], SILVER, "metal")), ...edgePins(2, 25.6, 0, 1),
  ]),
  "touch-ttp223": () => board(15, 11, PCB_RED, [cyl(4, 0.06, [-2, 0, PCB_T + 0.03], GOLD, "metal"), sot23(3.5, 2.5), ...smd(3.5, -2.5, "#e53935"), ...edgePins(3, 6.3, 0, 1)]),
  "rotary-encoder": () => board(26, 19, PCB_BLUE, [
    box([12.5, 13.4, 6.5], [-2, 0, on(6.5)], SILVER, "metal"), cyl(3.5, 7, [-2, 0, PCB_T + 10], SILVER, "metal"), cyl(3, 12, [-2, 0, PCB_T + 19.5], "#d4d7db", "metal"),
    ...smd(7, 6), ...smd(7, -6), ...edgePins(5, 11.5, 0, 1),
  ]),
  "hx711-load-cell": () => board(34, 20, PCB_GREEN, [
    ...ic(10, 4, -2, 0, 8), ...smd(6, 5, "c"), ...smd(6, -5), ...[-4.5, -1.5, 1.5, 4.5].map((y) => box([2, 2, 0.05], [-14.5, y * 1.2, PCB_T + 0.03], GOLD, "metal")), ...edgePins(4, 15.8, 0, 1),
  ]),
  "max30102": () => board(14, 14, PCB_PURPLE, [box([5.6, 3.3, 1.5], [0, 2, on(1.5)], "#101114"), box([4.8, 2.6, 0.1], [0, 2, PCB_T + 1.55], "#20304a", "glass"), sot23(-4, -2), sot23(4, -2), ...solderRow(5, 0, -5.6)]),
  "ina219": () => board(22, 25, PCB_PURPLE, [box([6.3, 3.1, 0.6], [0, 1, PCB_T + 0.3], "#18191b"), box([3, 3, 1], [0, -4, on(1)], CHIP), ...terminal(2, 0, 7.5), ...solderRow(6, 0, -10.5)]),
  "acs712": () => board(31, 13, PCB_RED, [...ic(4.9, 3.9, 1, 0, 4), ...terminal(2, -10.5, 0, true), ...smd(7, 4, "#e53935"), ...smd(7, -4, "c"), ...edgePins(3, 14.3, 0, 1)]),
  "vl53l0x": () => board(13, 18, PCB_PURPLE, [box([4.4, 2.4, 1], [0, 3, on(1)], "#0f1012"), cyl(0.45, 0.1, [-0.9, 3, PCB_T + 1.05], "#3b5ba5", "glass"), cyl(0.45, 0.1, [0.9, 3, PCB_T + 1.05], "#3b5ba5", "glass"), sot23(0, -2.5), ...solderRow(5, 0, -7.4)]),
  "gy-271-compass": () => board(14, 13, PCB_BLUE, [qfn(3, 0, 1.5), ...smd(-4, 1.5, "c"), ...smd(4, 1.5), ...solderRow(5, 0, -5)]),
  "neo-6m-gps": () => board(36, 26, PCB_BLUE, [
    box([16, 12.2, 2.4], [-5, 0, on(2.4)], SILVER, "metal"), cyl(5.5, 2, [12.5, 5, on(2)], SILVER, "metal"),
    box([25, 25, 4], [-5, 0, PCB_T + 4.4], "#e6dcc7", "glossy"), box([17, 17, 0.1], [-5, 0, PCB_T + 6.45], SILVER, "metal"), cyl(0.8, 0.2, [-3, 1.5, PCB_T + 6.55], GOLD, "metal"),
    ...smd(12, -6, "#43a047"), ...solderRow(4, 13, -10),
  ]),
  "vibration-sw420": () => board(32, 14, PCB_BLUE, [cyl(2.6, 11, [-10, 0, PCB_T + 2.8], "#e8eaed", "glossy", Y90), cyl(2.7, 2, [-15, 0, PCB_T + 2.8], "#1e88e5", "glossy", Y90), ...trimmer(1, 0), ...ic(4.9, 3.9, 8, 0, 4), ...edgePins(3, 14.3, 0, 1)]),
  "microphone-max9814": () => board(26, 16, PCB_PURPLE, [cyl(4.9, 6.7, [-7, 0, PCB_T + 3.35], SILVER, "metal"), cyl(4.4, 0.2, [-7, 0, PCB_T + 6.75], BLACK), qfn(3, 4, 2.5), ...smd(4, -3, "c"), ...solderRow(5, 10, 0, true)]),

  // ---- Displays ---------------------------------------------------------------------------------------------
  "oled-ssd1306": () => board(27.3, 27.8, PCB_BLUE, [box([26, 19, 1.6], [0, -2, on(1.6)], "#0b0f14", "glass"), box([12, 3, 0.3], [0, -12.4, PCB_T + 0.15], "#b5651d"), ...solderRow(4, 0, 12.3), ...hole(-11.5, 11.8, 1), ...hole(11.5, 11.8, 1)]),
  "tm1637-display": () => board(42, 24, PCB_BLUE, [
    box([30, 14, 7], [-2, 0, on(7)], "#202226", "glossy"), ...[-11, -4, 4, 11].flatMap((x) => digit(x - 2, 0, PCB_T + 7.05, 10)), cyl(0.5, 0.1, [-2, 2, PCB_T + 7.05], "#5a1a1a"), cyl(0.5, 0.1, [-2, -2, PCB_T + 7.05], "#5a1a1a"),
    ...edgePins(4, 19.8, 0, 1),
  ]),
  "max7219-matrix": () => board(32, 32, PCB_BLUE, [
    box([32, 32, 8], [0, 0, on(8)], "#202226", "glossy"),
    ...Array.from({ length: 64 }, (_, i) => cyl(1.4, 0.1, [(i % 8 - 3.5) * 3.8, (Math.floor(i / 8) - 3.5) * 3.8, PCB_T + 8.05], "#5a1818")),
  ]),
  "tft-st7735": () => board(58, 34.5, PCB_RED, [box([47, 34, 2.4], [-3.5, 0, on(2.4)], "#0e0f12", "glossy"), box([36, 29, 0.1], [-4, 0, PCB_T + 2.45], "#0d1a2e", "glass"), ...solderRow(8, 26.5, 0, true)]),
  "e-paper-2in9": () => board(89.5, 38, PCB_BLACK, [box([79, 36.7, 1.2], [-3, 0, on(1.2)], "#d4d7cf"), box([66.9, 29.1, 0.05], [-1, 0, PCB_T + 1.23], "#e6e8e1"), box([8, 6, 4.6], [40, 0, on(4.6)], "#f2f2ee")]),

  // ---- Drivers, power, wireless -----------------------------------------------------------------------------
  "tb6612fng": () => board(20.3, 20.3, PCB_PURPLE, [...ic(7.8, 5.3, 0, 0, 12), ...smd(-6, 4.5, "c"), ...smd(6, 4.5, "c"), ...solderRow(8, 0, 8.9), ...solderRow(8, 0, -8.9)]),
  "drv8833": () => board(18.5, 16, PCB_BLUE, [...ic(5, 4.4, 0, 0, 8), ...smd(-5, 4, "c"), ...solderRow(6, 0, 6.6), ...solderRow(6, 0, -6.6)]),
  "l9110s": () => board(29, 23, PCB_RED, [...ic(4.9, 3.9, -4, 4.5, 4), ...ic(4.9, 3.9, -4, -4.5, 4), ...terminal(2, 9.5, 5.5, true), ...terminal(2, 9.5, -5.5, true), ...edgePins(6, -13.3, 0, -1)]),
  "relay-module": () => board(50, 26, PCB_BLUE, [
    box([19, 15.5, 15], [2, 0, on(15)], "#2a5bd7", "glossy"), box([12, 8, 0.1], [2, 0, PCB_T + 15.05], "#1b3f99"), ...terminal(3, 19.5, 0, true), ...edgePins(3, -22.8, 0, -1),
    ...smd(-14, 7, "#e53935"), sot23(-14, 0), ...smd(-14, -6, "#8a8a8a"),
  ]),
  "uln2003": () => board(35, 32, PCB_GREEN, [
    ...dip(16, -3, 2), box([12.5, 5.8, 7], [-3, 12.5, on(7)], "#f1efe8"), ...Array.from({ length: 4 }, (_, i) => [cyl(1.5, 3, [12.5, -6 + 4 * i, PCB_T + 1.5], "#e53935", "glass"), ball(1.5, [12.5, -6 + 4 * i, PCB_T + 3], "#e53935", "glass")]).flat(),
    ...pins(4, -14.5, -2, true), ...pins(2, 9, -13),
  ]),
  "a4988": () => board(20.3, 15.2, PCB_GREEN, [
    qfn(5, 0, 0), box([9, 9, 1.5], [0, 0, PCB_T + 0.9 + 0.75], SILVER, "metal"), ...[-3, -1, 1, 3].map((y) => box([9, 0.8, 3.5], [0, y, PCB_T + 0.9 + 1.5 + 1.75], SILVER, "metal")),
    cyl(1.6, 1.2, [7, 4, PCB_T + 0.6], SILVER, "metal"), ...solderRow(8, 0, 6.35), ...solderRow(8, 0, -6.35),
  ]),
  "buck-converter-lm2596": () => board(43, 21, PCB_BLUE, [
    ...elcap(4, 11, -16, 4), ...elcap(4, 11, 16, -5), box([11, 11, 7], [-4, 5, on(7)], "#2a2d31", "glossy"), box([10, 9, 4.5], [5, -5, on(4.5)], CHIP, "glossy"),
    ...trimmer(12, 6, true), ...[[-19.5, -7.5], [-16, -7.5], [19.5, 7.5], [16, 7.5]].map(([x, y]) => box([2.5, 2.5, 0.05], [x!, y!, PCB_T + 0.03], GOLD, "metal")),
  ]),
  "tp4056-charger": () => board(26, 17, PCB_BLUE, [
    microUsb(-10, 0, true), ...ic(4.9, 3.9, 3, 0, 4), ...smd(-2.5, 5.5, "#e53935"), ...smd(-2.5, -5.5, "#1e88e5"),
    ...[[11, 6], [11, 2], [11, -2], [11, -6]].map(([x, y]) => box([2.6, 2.6, 0.05], [x!, y!, PCB_T + 0.03], GOLD, "metal")),
  ]),
  "breadboard-power-module": () => board(53, 33, PCB_RED, [
    box([14, 9, 11], [-16, -9, on(11)], BLACK, "glossy"), cyl(2.6, 0.3, [-23.1, -9, on(11)], DARK, undefined, Y90), box([14, 13, 7], [-16, 7.5, on(7)], SILVER, "metal"),
    ...pins(3, 16, 11), box([5.1, 2.6, 6], [17.27, 11, PCB_T + 5.5], "#f9c80e"), ...pins(3, 16, -11), box([5.1, 2.6, 6], [17.27, -11, PCB_T + 5.5], "#f9c80e"),
    ...sot223(2, 9), ...sot223(2, -9), ...tact(-2, 0, 6), ...elcap(2.5, 5, 9, 0), ...smd(-6, 0, "#e53935"),
  ]),
  "level-shifter": () => board(13, 16, PCB_RED, [...[-4.5, -1.5, 1.5, 4.5].map((y) => sot23(0, y)), ...solderRow(6, -5, 0, true), ...solderRow(6, 5, 0, true)]),
  "hc-05": () => board(37, 16, PCB_BLUE, [
    box([27, 13, 0.9], [-3.5, 0, PCB_T + 0.45], "#2f6b3a", "glossy"), ...up(0.92, zigzag(-13, 0, 6, 10)), box([7, 7, 1], [-1, 0, PCB_T + 1.4], CHIP, "glossy"), box([5, 4, 0.9], [6, 2, PCB_T + 1.35], CHIP),
    ...smd(14, 5, "#e53935"), ...edgePins(6, 17.3, 0, 1),
  ]),
  "nrf24l01": () => board(29, 15.5, "#1B5E20", [...zigzag(-9.5, 0, 9, 11), qfn(4, 3, 0), box([3.2, 2.5, 0.8], [4, 5, on(0.8)], SILVER, "metal"), ...pins(4, 10.5, 0, true, 2)]),
  "lora-sx1278": () => board(24, 16, PCB_BLACK, [
    box([15.5, 14.5, 2.4], [-3.5, 0, on(2.4)], SILVER, "metal"), cyl(2.6, 14, [8.5, 4, PCB_T + 7], COPPER, "metal"), cyl(1, 0.6, [8.5, -4, PCB_T + 0.3], GOLD, "metal"),
    ...Array.from({ length: 8 }, (_, i) => [-1, 1].map((s) => box([1.2, 1.4, 0.06], [-10.5 + i * 2, s * 7.5, PCB_T + 0.03], GOLD, "metal"))).flat(),
  ]),
  "sd-card-module": () => board(42, 24, PCB_BLUE, [box([15, 14.5, 1.9], [6, 0, on(1.9)], SILVER, "metal"), box([11, 1.2, 0.8], [14, 0, PCB_T + 1.5], "#1a237e"), ...sot223(-8, 6.5), ...ic(8.7, 3.9, -8, -5, 7), ...edgePins(6, -19.8, 0, -1)]),
  "dfplayer-mini": () => board(20.2, 20.2, PCB_RED, [box([12, 11.5, 1.8], [0, 2, on(1.8)], SILVER, "metal"), ...smd(0, -6.5, "#e53935"), ...solderRow(8, -8.9, 0, true), ...solderRow(8, 8.9, 0, true)]),

  // ---- Actuators and outputs --------------------------------------------------------------------------------
  "solenoid-lock": () => model([
    box([54, 41, 27], [0, 0, 13.5], "#b8bdc3", "metal"), box([40, 0.2, 18], [0, -20.6, 13.5], "#8a9097"), box([12, 12, 10], [33, 0, 13.5], "#9aa1a8", "metal"),
    box([10, 12, 4], [36, 0, 9], "#9aa1a8", "metal", [0, 25, 0]), cyl(0.8, 30, [-42, 4, 4], "#d32f2f", undefined, Y90), cyl(0.8, 30, [-42, -4, 4], BLACK, undefined, Y90),
  ]),
  "vibration-motor": () => model([cyl(5, 2.7, [0, 0, 1.35], SILVER, "metal"), cyl(4.6, 0.1, [0, 0, 2.75], "#d9b26a"), cyl(0.45, 22, [-16, 1, 0.45], "#d32f2f", undefined, Y90), cyl(0.45, 22, [-16, -1, 0.45], "#1e88e5", undefined, Y90)]),
  "speaker-8ohm": () => model([
    cyl(10, 6, [0, 0, 3], "#9aa1a8", "metal"), cyl(20, 1, [0, 0, 6.5], BLACK, "glossy"), cyl(19.5, 3, [0, 0, 8.5], "#2a2d31", "rubber"),
    cyl(17, 1.2, [0, 0, 8.6], "#3a3d42"), cyl(6, 1.5, [0, 0, 9.4], "#1d1f23", "glossy"), box([3, 1.5, 0.5], [0, 20.5, 6.5], GOLD, "metal"), box([3, 1.5, 0.5], [4, 20.1, 6.5], GOLD, "metal"),
  ]),

  // ---- Power and accessories --------------------------------------------------------------------------------
  "usb-5v": () => model([
    box([92, 43, 21.5], [0, 0, 10.75], "#2b2f35", "glossy"), box([2, 12.5, 5], [46.5, 6, 10.75], SILVER, "metal"), box([0.4, 11, 2.6], [47.6, 6, 10.75], DARK),
    box([1.5, 7.6, 2.8], [46.3, -10, 10.75], SILVER, "metal"), ...[0, 1, 2, 3].map((i) => cyl(0.8, 0.1, [36 - i * 3, -16, 21.55], i < 3 ? "#1e88e5" : "#3a3d42", "glass")),
  ]),
  "ir-remote": () => model([
    box([40, 86, 6.5], [0, 0, 3.25], "#141518", "glossy"), box([6, 2, 2], [0, 43.5, 3.25], "#3b1b1b", "glass"),
    ...Array.from({ length: 21 }, (_, i) => {
      const row = Math.floor(i / 3), col = i % 3;
      const color = row === 0 ? "#e53935" : row === 1 ? "#1e88e5" : row === 2 ? "#43a047" : "#d9dce0";
      return cyl(4, 1, [(col - 1) * 11, 30 - row * 10, 7], color, "glossy");
    }),
  ]),
  "mecanum-wheels": () => {
    const prims: Prim[] = [];
    for (const [x, y] of [[-40, -24], [40, -24], [-40, 24], [40, 24]] as const) {
      const hand = x * y > 0 ? 1 : -1, z = 31.2;
      prims.push(cyl(22, 24, [x, y, z], "#2b2f35", "glossy", X90), cyl(26.5, 2, [x, y - 13, z], "#FBC02D", "glossy", X90), cyl(26.5, 2, [x, y + 13, z], "#FBC02D", "glossy", X90), cyl(5, 30, [x, y, z], SILVER, "metal", X90));
      for (let i = 0; i < 9; i++) {
        const t = (i * 2 * Math.PI) / 9;
        const tangent: V3 = [-Math.sin(t), 0, Math.cos(t)];
        const dir: V3 = [tangent[0] * Math.SQRT1_2, hand * Math.SQRT1_2, tangent[2] * Math.SQRT1_2];
        prims.push(cyl(5.5, 18, [x + 25.7 * Math.cos(t), y, z + 25.7 * Math.sin(t)], "#26292e", "rubber", alongDir(dir)));
      }
    }
    return model(prims);
  },
  "jumper-wires": () => model(["#e53935", "#1d1f23", "#f9a825", "#2e7d32", "#1e88e5", "#ef6c00", "#e8e8e8", "#8e24aa"].flatMap((c, i) => {
    const y = -5.25 + i * 1.5;
    return [cyl(0.75, 70, [0, y, 0.75], c, "glossy", Y90), box([7, 1.4, 2.5], [-38.5, y, 1.25], BLACK), box([7, 1.4, 2.5], [38.5, y, 1.25], BLACK), box([3, 0.64, 0.64], [-43.5, y, 1.25], GOLD, "metal"), box([3, 0.64, 0.64], [43.5, y, 1.25], GOLD, "metal")];
  })),
  "enclosure": () => model([
    box([100, 60, 25], [0, 0, 12.5], "#cfd3d8", "glossy"), box([100.2, 60.2, 0.4], [0, 0, 21], "#aeb3b9"),
    ...[[-46, -26], [46, -26], [-46, 26], [46, 26]].map(([x, y]) => cyl(1.6, 0.2, [x!, y!, 25.05], DARK)),
  ]),
  "keypad-4x4": () => model([
    box([69, 76, 0.8], [0, 6, 0.4], "#20242b", "glossy"),
    ...Array.from({ length: 16 }, (_, i) => {
      const r = Math.floor(i / 4), c = i % 4;
      const color = c === 3 ? "#e53935" : r === 3 && c !== 1 ? "#1e88e5" : "#e9ecef";
      return box([13, 13, 0.6], [(c - 1.5) * 16.5, 6 + (1.5 - r) * 17, 1.1], color, "glossy");
    }),
    box([17, 14, 0.3], [0, -38, 0.15], "#9aa0a6"), box([20.3, 2.6, 8.5], [0, -46, 4.25], BLACK),
  ]),
  // ---- Common modules, in detail ------------------------------------------------------------------------------
  "pir-hc-sr501": () => board(32, 24, PCB_GREEN, [
    // The Fresnel dome as stacked rings: a faceted lens, like the real one, and nothing below the board.
    ...Array.from({ length: 6 }, (_, i) => { const t = i / 6; return cyl(11.5 * Math.sqrt(1 - t * t), 11.5 / 6, [0, 0, PCB_T + (i + 0.5) * (11.5 / 6)], WHITE, "glass"); }),
    ...trimmer(-12.5, -8), ...trimmer(12.5, -8), ...solderRow(3, 0, -10.5),
  ]),
  "dht11": () => board(28, 13, PCB_BLUE, [
    box([12, 15.5, 5.5], [-4, 0, on(5.5)], "#4fa3e0", "glossy"), ...[-5.2, -2.6, 0, 2.6, 5.2].map((y) => box([8.5, 1.1, 0.1], [-4, y, PCB_T + 5.55], "#2c6fa3")),
    ...smd(6.5, 3.5), ...edgePins(3, 12.8, 0, 1),
  ]),
  "dht22": () => board(28, 15, PCB_BLUE, [
    box([15, 20, 7.7], [-4, 0, on(7.7)], WHITE, "glossy"), ...[-7, -4.2, -1.4, 1.4, 4.2, 7].map((y) => box([11, 1.3, 0.1], [-4, y, PCB_T + 7.75], "#c3c8ce")),
    ...smd(7.5, 4), ...edgePins(3, 12.8, 0, 1),
  ]),
  "mpu6050": () => board(21, 16, PCB_BLUE, [qfn(4, 0, 1.5), sot23(-5.5, 2), ...smd(5.5, 2, "c"), ...smd(5.5, -1, "#43a047"), ...solderRow(8, 0, -6.4), ...hole(-8, 5.5, 1.5), ...hole(8, 5.5, 1.5)]),
  "bme280": () => board(13, 11, PCB_PURPLE, [box([2.5, 2.5, 1], [0, 1, on(1)], SILVER, "metal"), cyl(0.3, 0.1, [0.6, 1.6, PCB_T + 1.05], DARK), sot23(-3.8, 1.5), ...solderRow(4, 0, -4)]),
  "bmp280": () => board(13, 11, PCB_PURPLE, [box([2, 2.5, 1], [0, 1, on(1)], SILVER, "metal"), cyl(0.3, 0.1, [0.5, 1.6, PCB_T + 1.05], DARK), sot23(-3.8, 1.5), ...solderRow(4, 0, -4)]),
  "rc522-rfid": () => board(60, 40, PCB_BLUE, [
    // The antenna: a copper loop around the card area, not a solid plate.
    box([38, 1.2, 0.05], [8, 14, PCB_T + 0.03], GOLD, "metal"), box([38, 1.2, 0.05], [8, -14, PCB_T + 0.03], GOLD, "metal"),
    box([1.2, 29.2, 0.05], [-11, 0, PCB_T + 0.03], GOLD, "metal"), box([1.2, 29.2, 0.05], [27, 0, PCB_T + 0.03], GOLD, "metal"),
    box([35, 1.2, 0.05], [8, 11.5, PCB_T + 0.03], GOLD, "metal"), box([35, 1.2, 0.05], [8, -11.5, PCB_T + 0.03], GOLD, "metal"),
    qfn(5, -19, 4), box([4, 1.6, 1], [-19, -5, on(1)], SILVER, "metal"), ...edgePins(8, -28.8, 0, -1), ...hole(-26, 16.5, 1.6), ...hole(26, 16.5, 1.6),
  ]),
  "rtc-ds3231": () => board(38, 22, PCB_BLUE, [cyl(10, 3.2, [9, 0, on(3.2)], SILVER, "metal"), ...ic(10.3, 7.5, -7.5, 2.5, 8), ...ic(4.9, 3.9, -7.5, -6.5, 4), ...edgePins(6, -17.8, 0, -1)]),
  "lcd-1602-i2c": () => board(80, 36, PCB_GREEN, [
    box([71, 24, 7], [0, 0, on(7)], "#16181c", "glossy"), box([64.5, 14.5, 0.4], [0, 0, on(7) + 3.7], "#3f7fbf", "glass"),
    ...solderRow(16, -18, 16), ...hole(-37.5, -15.5, 1.4), ...hole(37.5, -15.5, 1.4), ...hole(-37.5, 15.5, 1.4), ...hole(37.5, 15.5, 1.4),
  ]),
  "l298n": () => board(43, 43, PCB_RED, [
    box([23, 16, 25], [0, 8, on(25)], BLACK, "metal"), ...[-9, -4.5, 0, 4.5, 9].map((x) => box([1.5, 16, 6], [x, 8, on(25) + 15], BLACK, "metal")),
    box([20, 4, 10], [0, -1.5, on(10)], CHIP, "glossy"), ...terminal(2, -16.5, 5, true), ...terminal(2, 16.5, 5, true), ...terminal(3, -2, -16.5),
    ...pins(6, 11, -16, false), ...elcap(4, 8, -15, -12), ...holes("l298n", 1.6),
  ]),
  "hc-sr04": () => board(45, 20, PCB_BLUE, [
    cyl(8, 12, [-13, 0, on(12)], SILVER, "metal"), cyl(8, 12, [13, 0, on(12)], SILVER, "metal"), cyl(6.5, 12.2, [-13, 0, on(12)], "#2a2a2a"), cyl(6.5, 12.2, [13, 0, on(12)], "#2a2a2a"),
    box([10.5, 4, 3.5], [0, 6.5, on(3.5)], SILVER, "metal"), ...holes("hc-sr04", 1),
    // The 4-pin header on the bottom edge, pins pointing out (down, once the sensor stands behind a wall).
    box([10.2, 2.5, 2.5], [0, -8.75, on(2.5)], BLACK), ...[-3.81, -1.27, 1.27, 3.81].map((x) => box([0.64, 7, 0.64], [x, -12.6, on(2.5)], GOLD, "metal")),
  ]),
  "joystick": () => board(34, 26, PCB_BLACK, [box([16, 16, 10], [-3, 0, on(10)], "#3a3d42"), cyl(3, 14, [-3, 0, on(10) + 10], BLACK), cyl(10, 8, [-3, 0, on(10) + 18], BLACK, "rubber"), ...edgePins(5, 15.8, 0, 1)]),
  "breadboard": () => model([
    box([82, 55, 8.5], [0, 0, 4.25], WHITE), box([80, 1, 0.3], [0, 23, 8.55], "#e53935"), box([80, 1, 0.3], [0, -23, 8.55], "#1e88e5"), box([80, 3, 0.3], [0, 0, 8.55], "#d6d9dc"),
    ...Array.from({ length: 30 * 10 }, (_, i) => { const c = i % 30, r = Math.floor(i / 30); return box([1, 1, 0.1], [-36.8 + c * 2.54, (r < 5 ? 3.3 : -3.3 - 2.54 * 4) + (r % 5) * 2.54, 8.55], DARK); }),
    ...Array.from({ length: 25 * 4 }, (_, i) => { const c = i % 25, r = Math.floor(i / 25); return box([1, 1, 0.1], [-36 + c * 3, [21, 18.5, -18.5, -21][r]!, 8.55], DARK); }),
  ]),
};
