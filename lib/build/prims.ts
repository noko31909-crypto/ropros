/**
 * Building blocks for the built-in 3D part models (lib/build/models.ts, lib/build/part-models.ts).
 * Millimetres, Z up; a model's origin is the centre of its bottom face, so a part placed at [x, y, 0] sits on
 * the plate. Everything is boxes, cylinders and spheres so the browser viewer and the OpenSCAD export can both
 * draw it. Rotations follow OpenSCAD's rotate([x, y, z]): about X, then Y, then Z.
 */

export type V3 = [number, number, number];
export type Finish = "metal" | "glass" | "glossy" | "rubber";
export type Prim =
  | { type: "box"; size: V3; at: V3; color: string; finish?: Finish; rotate?: V3 }
  | { type: "cylinder"; r: number; h: number; at: V3; color: string; finish?: Finish; rotate?: V3 }
  | { type: "sphere"; r: number; at: V3; color: string; finish?: Finish };
export type PartModel = { size: V3; prims: Prim[] };
export type Box = { min: V3; max: V3 };

export const PCB_T = 1.6;
export const BLACK = "#16181c", SILVER = "#c9cdd2", GOLD = "#d4a93c", WHITE = "#eef0f2", COPPER = "#c8873a";
export const PCB_BLUE = "#1565C0", PCB_RED = "#B71C1C", PCB_GREEN = "#2E7D32", PCB_PURPLE = "#6A1B9A", PCB_BLACK = "#1b1e22";
const CHIP = "#1d1f23", HOLE = "#05070a";

export const box = (size: V3, at: V3, color: string, finish?: Finish, rotate?: V3): Prim =>
  ({ type: "box", size, at, color, ...(finish ? { finish } : {}), ...(rotate ? { rotate } : {}) });
export const cyl = (r: number, h: number, at: V3, color: string, finish?: Finish, rotate?: V3): Prim =>
  ({ type: "cylinder", r, h, at, color, ...(finish ? { finish } : {}), ...(rotate ? { rotate } : {}) });
export const ball = (r: number, at: V3, color: string, finish?: Finish): Prim => ({ type: "sphere", r, at, color, ...(finish ? { finish } : {}) });

/** Centre height of something `h` tall standing on a PCB that lies on the plate. */
export const on = (h: number) => PCB_T + h / 2;
export const pcb = (w: number, d: number, color: string): Prim => box([w, d, PCB_T], [0, 0, PCB_T / 2], color, "glossy");

// ---- Geometry -------------------------------------------------------------------------------------------

const rad = (d: number) => (d * Math.PI) / 180;
export function rotate(p: V3, r: readonly number[] | undefined): V3 {
  if (!r) return p;
  let [x, y, z] = p;
  const [ax, ay, az] = [rad(r[0] ?? 0), rad(r[1] ?? 0), rad(r[2] ?? 0)];
  [y, z] = [y * Math.cos(ax) - z * Math.sin(ax), y * Math.sin(ax) + z * Math.cos(ax)];
  [x, z] = [x * Math.cos(ay) + z * Math.sin(ay), -x * Math.sin(ay) + z * Math.cos(ay)];
  [x, y] = [x * Math.cos(az) - y * Math.sin(az), x * Math.sin(az) + y * Math.cos(az)];
  return [x, y, z];
}

/** Axis-aligned bounds of one primitive in model coordinates, for any rotation. */
export function primBox(p: Prim): Box {
  if (p.type === "sphere") return { min: [p.at[0] - p.r, p.at[1] - p.r, p.at[2] - p.r], max: [p.at[0] + p.r, p.at[1] + p.r, p.at[2] + p.r] };
  const h: V3 = p.type === "box" ? [p.size[0] / 2, p.size[1] / 2, p.size[2] / 2] : [p.r, p.r, p.h / 2];
  const pts = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => rotate([i & 1 ? h[0] : -h[0], i & 2 ? h[1] : -h[1], i & 4 ? h[2] : -h[2]], p.rotate));
  const lo = [0, 1, 2].map((k) => Math.min(...pts.map((q) => q[k]!)) + p.at[k]!) as V3;
  const hi = [0, 1, 2].map((k) => Math.max(...pts.map((q) => q[k]!)) + p.at[k]!) as V3;
  return { min: lo, max: hi };
}

const r1 = (v: number) => Math.round(v * 10) / 10;

/** A free-standing model: its size is measured from its primitives, never typed by hand. */
export function model(prims: Prim[]): PartModel {
  const bs = prims.map(primBox);
  const lo = [0, 1, 2].map((k) => Math.min(...bs.map((b) => b.min[k]!)));
  const hi = [0, 1, 2].map((k) => Math.max(...bs.map((b) => b.max[k]!)));
  return { size: [r1(hi[0]! - lo[0]!), r1(hi[1]! - lo[1]!), r1(hi[2]!)], prims };
}

/** A board: the PCB plus parts on it. The size is the PCB footprint and the tallest part. */
export function board(w: number, d: number, color: string, extra: Prim[]): PartModel {
  const top = Math.max(PCB_T, ...extra.map((p) => primBox(p).max[2]));
  return { size: [w, d, r1(top)], prims: [pcb(w, d, color), ...extra] };
}

/** Euler angles (OpenSCAD order) that turn a Z-axis cylinder onto direction `d`. */
export function alongDir(d: V3): V3 {
  const n = Math.hypot(...d) || 1;
  const [dx, dy, dz] = [d[0] / n, d[1] / n, d[2] / n];
  const ax = Math.asin(Math.max(-1, Math.min(1, -dy)));
  const ay = Math.atan2(dx, dz);
  return [(ax * 180) / Math.PI, (ay * 180) / Math.PI, 0];
}

// ---- Board details ----------------------------------------------------------------------------------------

const PITCH = 2.54;
const rowAt = (n: number, i: number) => (i - (n - 1) / 2) * PITCH;

/** Male pin header standing on the board: black plastic strip with gold pins, `rows` × `n`, 2.54 mm pitch. */
export function pins(n: number, x: number, y: number, alongY = false, rows = 1): Prim[] {
  const len = n * PITCH, wid = rows * PITCH;
  const out: Prim[] = [box(alongY ? [wid, len, 2.5] : [len, wid, 2.5], [x, y, on(2.5)], BLACK)];
  for (let i = 0; i < n; i++) for (let r = 0; r < rows; r++) {
    const a = rowAt(n, i), b = (r - (rows - 1) / 2) * PITCH;
    out.push(box([0.64, 0.64, 6.5], [alongY ? x + b : x + a, alongY ? y + a : y + b, PCB_T + 2.5 + 3], GOLD, "metal"));
  }
  return out;
}

/** Right-angle header at a board edge: the strip lies flat, the pins point out past the edge (`dir` = +1/-1 along X). */
export function edgePins(n: number, x: number, y: number, dir: 1 | -1 = 1): Prim[] {
  const out: Prim[] = [box([2.5, n * PITCH, 2.5], [x, y, on(2.5)], BLACK)];
  for (let i = 0; i < n; i++) out.push(box([7, 0.64, 0.64], [x + dir * 3.8, y + rowAt(n, i), on(2.5)], GOLD, "metal"));
  return out;
}

/** Female header (socket): black block with a dark opening per pin. */
export function socket(n: number, x: number, y: number, alongY = false, h = 8.5): Prim[] {
  const len = n * PITCH;
  const out: Prim[] = [box(alongY ? [2.5, len, h] : [len, 2.5, h], [x, y, on(h)], BLACK)];
  for (let i = 0; i < n; i++) out.push(box([0.9, 0.9, 0.2], [alongY ? x : x + rowAt(n, i), alongY ? y + rowAt(n, i) : y, PCB_T + h + 0.05], HOLE));
  return out;
}

/** Solder joints of pins that point down through the board (Nano, ESP32 DevKit, Pico): a row of gold dots. */
export function solderRow(n: number, x: number, y: number, alongY = false): Prim[] {
  return Array.from({ length: n }, (_, i) => cyl(0.75, 0.5, [alongY ? x : x + rowAt(n, i), alongY ? y + rowAt(n, i) : y, PCB_T + 0.25], GOLD, "metal"));
}

/** SMD chip with gull-wing legs on its two long sides (SOIC/TSSOP); `legs` per side. */
export function ic(w: number, d: number, x: number, y: number, legs: number): Prim[] {
  const out: Prim[] = [box([w, d, 1.4], [x, y, on(1.4)], CHIP, "glossy")];
  const pitch = Math.min(1.27, (w - 0.6) / Math.max(1, legs));
  for (let i = 0; i < legs; i++) {
    const lx = x + (i - (legs - 1) / 2) * pitch;
    out.push(box([0.4, 1.1, 0.35], [lx, y + d / 2 + 0.45, PCB_T + 0.3], SILVER, "metal"), box([0.4, 1.1, 0.35], [lx, y - d / 2 - 0.45, PCB_T + 0.3], SILVER, "metal"));
  }
  return out;
}

/** Square chip with legs on all four sides (QFP), `legs` per side. */
export function qfp(s: number, x: number, y: number, legs: number): Prim[] {
  const out: Prim[] = [box([s, s, 1.4], [x, y, on(1.4)], CHIP, "glossy")];
  const pitch = (s - 1) / legs;
  for (let i = 0; i < legs; i++) {
    const o = (i - (legs - 1) / 2) * pitch;
    out.push(
      box([0.3, 1, 0.3], [x + o, y + s / 2 + 0.4, PCB_T + 0.3], SILVER, "metal"), box([0.3, 1, 0.3], [x + o, y - s / 2 - 0.4, PCB_T + 0.3], SILVER, "metal"),
      box([1, 0.3, 0.3], [x + s / 2 + 0.4, y + o, PCB_T + 0.3], SILVER, "metal"), box([1, 0.3, 0.3], [x - s / 2 - 0.4, y + o, PCB_T + 0.3], SILVER, "metal"),
    );
  }
  return out;
}

/** Through-hole DIP chip (ATmega328P, ULN2003): black body on silver legs, `n` pins. */
export function dip(n: number, x: number, y: number): Prim[] {
  const per = n / 2, len = per * PITCH;
  const out: Prim[] = [box([len, 6.4, 3.3], [x, y, PCB_T + 0.8 + 1.65], CHIP, "glossy"), cyl(0.6, 0.2, [x - len / 2 + 1.4, y, PCB_T + 0.8 + 3.35], "#2c2f35")];
  for (let i = 0; i < per; i++) {
    const lx = x + rowAt(per, i);
    out.push(box([0.5, 1.2, 1.6], [lx, y + 3.6, PCB_T + 0.8], SILVER, "metal"), box([0.5, 1.2, 1.6], [lx, y - 3.6, PCB_T + 0.8], SILVER, "metal"));
  }
  return out;
}

/** 0805-size SMD part: a resistor (black top), capacitor (tan) or LED (a colour), with tinned ends. */
export function smd(x: number, y: number, kind: "r" | "c" | `#${string}` = "r", alongY = false): Prim[] {
  const color = kind === "r" ? "#18191b" : kind === "c" ? "#b58a5a" : kind;
  const L = 2, W = 1.25, z = PCB_T + 0.3;
  const body: V3 = alongY ? [W, L * 0.6, 0.6] : [L * 0.6, W, 0.6];
  const end: V3 = alongY ? [W, 0.4, 0.6] : [0.4, W, 0.6];
  const off = L / 2 - 0.2;
  return [
    box(body, [x, y, z], color, kind.startsWith("#") ? "glass" : "glossy"),
    box(end, alongY ? [x, y - off, z] : [x - off, y, z], SILVER, "metal"),
    box(end, alongY ? [x, y + off, z] : [x + off, y, z], SILVER, "metal"),
  ];
}

/** Blue trimmer potentiometer with its white adjusting screw. `tall` = the multi-turn 3296 type. */
export function trimmer(x: number, y: number, tall = false): Prim[] {
  return tall
    ? [box([9.5, 4.8, 10], [x, y, on(10)], "#1E5AA8", "glossy"), cyl(1.1, 1.2, [x - 3, y, PCB_T + 10.4], GOLD, "metal")]
    : [box([6.5, 6.5, 4.2], [x, y, on(4.2)], "#1E5AA8", "glossy"), cyl(2, 0.8, [x, y, PCB_T + 4.5], WHITE), box([3, 0.5, 0.3], [x, y, PCB_T + 4.95], "#9aa3ad")];
}

/** Blue screw terminal block with `n` poles: body, a screw head and a wire opening per pole. */
export function terminal(n: number, x: number, y: number, alongY = false, color = "#1E5AA8"): Prim[] {
  const len = n * 5;
  const out: Prim[] = [box(alongY ? [8, len, 10] : [len, 8, 10], [x, y, on(10)], color, "glossy")];
  for (let i = 0; i < n; i++) {
    const o = (i - (n - 1) / 2) * 5;
    out.push(cyl(1.5, 0.5, [alongY ? x : x + o, alongY ? y + o : y, PCB_T + 10.2], SILVER, "metal"));
    out.push(box(alongY ? [0.3, 3, 3] : [3, 0.3, 3], [alongY ? x - 4.05 : x + o, alongY ? y + o : y - 4.05, on(4)], HOLE));
  }
  return out;
}

/** Plated mounting hole on a board: gold ring and the dark hole. */
export const hole = (x: number, y: number, r = 1.6): Prim[] => [
  cyl(r + 0.7, 0.06, [x, y, PCB_T + 0.03], GOLD, "metal"), cyl(r, 0.08, [x, y, PCB_T + 0.04], HOLE),
];

/** Small tactile push button (reset/boot) on a board. */
export const tact = (x: number, y: number, s = 3.5): Prim[] => [box([s, s * 0.8, 1.6], [x, y, on(1.6)], "#c9cdd2", "metal"), cyl(s * 0.22, 0.6, [x, y, PCB_T + 1.9], BLACK)];

/** Micro-USB, USB-C and mini-USB receptacles at a board edge (silver shells). */
export const microUsb = (x: number, y: number, alongY = false): Prim => box(alongY ? [5.6, 7.6, 2.8] : [7.6, 5.6, 2.8], [x, y, on(2.8)], SILVER, "metal");
export const usbC = (x: number, y: number, alongY = false): Prim => box(alongY ? [7, 9, 3.2] : [9, 7, 3.2], [x, y, on(3.2)], SILVER, "metal");

/** A zig-zag PCB antenna trace (gold), `w` wide, along X. */
export function zigzag(x: number, y: number, w: number, d: number): Prim[] {
  const out: Prim[] = [];
  const n = Math.max(3, Math.round(w / 2.4));
  for (let i = 0; i < n; i++) {
    const px = x - w / 2 + (i + 0.5) * (w / n);
    out.push(box([0.5, d, 0.05], [px, y, PCB_T + 0.03], GOLD, "metal"));
    if (i < n - 1) out.push(box([w / n, 0.5, 0.05], [px + w / n / 2, y + (i % 2 ? -1 : 1) * (d / 2 - 0.25), PCB_T + 0.03], GOLD, "metal"));
  }
  return out;
}

// ---- Through-hole parts on their legs ------------------------------------------------------------------------

/** Vertical legs under a part, `n` in a row along X (or Y), from the plate up to `z`. */
export function legs(n: number, pitch: number, x: number, y: number, z: number, alongY = false, r = 0.3): Prim[] {
  return Array.from({ length: n }, (_, i) => {
    const o = (i - (n - 1) / 2) * pitch;
    return cyl(r, z, [alongY ? x : x + o, alongY ? y + o : y, z / 2], SILVER, "metal");
  });
}

/** Axial leads of a resistor/diode lying along X at height `z`: out to ±`span`, then bent down to the plate. */
export function axialLeads(bodyLen: number, span: number, z: number): Prim[] {
  const reach = span - bodyLen / 2;
  return [-1, 1].flatMap((s) => [
    cyl(0.3, reach, [s * (bodyLen / 2 + reach / 2), 0, z], SILVER, "metal", [0, 90, 0]),
    cyl(0.3, z, [s * span, 0, z / 2], SILVER, "metal"),
  ]);
}
