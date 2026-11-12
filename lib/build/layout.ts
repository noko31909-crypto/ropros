import type { ComponentId } from "../hardware/ids.ts";
import type { Locale } from "../i18n/config.ts";
import { MOUNTS, SCREW, modelBox, partModel, primBox, type Prim } from "./models.ts";
import type { Cad, CadPart, CadShape, ProjectInput as Project, Shape } from "./schema.ts";

/**
 * Builds the 3D model of a generated project from its parts list, by rules instead of by the language model,
 * so every project gets a physically sensible build whatever model wrote the text:
 * - "rover" (DC motors or a robot chassis): chassis plate, motors underneath with wheels on the shafts, a caster,
 *   electronics on top (the board on standoffs), forward-looking sensors on a front bracket.
 * - "enclosure" (everything else): a rounded box sized around the parts inside, the board on standoffs against a wall
 *   with a USB cut-out, forward-looking sensors behind holes in the front wall, displays/buttons/LEDs/servos on the lid,
 *   and external parts (pumps, soil probes...) beside the box.
 * Millimetres, Z up, the floor is z = 0. Front is -Y for the enclosure and +X for the rover.
 */

type V3 = [number, number, number];
type Role = "board" | "inside" | "power" | "front" | "top" | "servo" | "motor" | "outside" | "skip";

const ROLE: Partial<Record<ComponentId, Role>> = {
  "breadboard": "skip", "jumper-wires": "skip", "enclosure": "skip", "resistor": "skip", "capacitor": "skip", "diode": "skip",
  "npn-transistor": "skip", "mosfet-n": "skip", "level-shifter": "inside", "ir-led": "skip", "mecanum-wheels": "skip",
  "battery-9v": "power", "battery-2s-lipo": "power", "battery-4xaa": "power", "battery-18650": "power", "usb-5v": "skip",
  "buck-converter-lm2596": "inside", "tp4056-charger": "inside", "breadboard-power-module": "inside",
  "hc-sr04": "front", "vl53l0x": "front", "ir-receiver-vs1838b": "front", "flame-sensor": "front", "ir-obstacle": "front", "ldr-module": "front", "esp32-cam": "front",
  "pir-hc-sr501": "top", "oled-ssd1306": "top", "lcd-1602-i2c": "top", "tm1637-display": "top", "max7219-matrix": "top", "seven-segment": "top",
  "tft-st7735": "top", "e-paper-2in9": "top", "ws2812b-ring": "top", "push-button": "top", "potentiometer": "top", "joystick": "top",
  "rotary-encoder": "top", "keypad-4x4": "top", "touch-ttp223": "top", "led": "top", "rgb-led": "top", "buzzer-active": "top", "buzzer-passive": "top",
  "ldr": "top", "sound-sensor": "top", "microphone-max9814": "top", "speaker-8ohm": "top", "rc522-rfid": "top", "fan-5v": "top",
  "servo-sg90": "servo", "servo-mg996r": "servo", "dc-motor": "motor",
  "water-pump": "outside", "soil-moisture-capacitive": "outside", "rain-sensor": "outside", "water-level": "outside", "solenoid-lock": "outside",
  "stepper-nema17": "outside", "stepper-28byj48": "outside", "ws2812b-strip": "outside", "line-sensor-array": "outside", "tcrt5000": "outside",
  "hx711-load-cell": "outside", "ds18b20": "outside", "vibration-motor": "inside",
};
const BOARD_KINDS = new Set<ComponentId>(["arduino-uno", "arduino-nano", "arduino-mega", "esp32-devkit", "esp8266-nodemcu", "raspberry-pi-4", "raspberry-pi-pico"]);
/** USB connector of each board, in the board's own coordinates: centre and opening size (width along Y, height). */
const USB: Partial<Record<ComponentId, { x: number; y: number; z: number; w: number; h: number }>> = {
  "arduino-uno": { x: -34.3, y: 9, z: 7.1, w: 14, h: 13 }, "arduino-mega": { x: -50.8, y: 9, z: 7.1, w: 14, h: 13 },
  "arduino-nano": { x: -22.5, y: 0, z: 3.6, w: 10, h: 7 }, "esp32-devkit": { x: -27.5, y: 0, z: 3.1, w: 10, h: 7 },
  "esp8266-nodemcu": { x: -29, y: 0, z: 3.1, w: 10, h: 7 }, "raspberry-pi-pico": { x: -25.5, y: 0, z: 3.1, w: 10, h: 7 },
};

const NAMES: Record<Locale, Record<"case" | "lid" | "plate" | "bracket" | "wheel" | "caster" | "standoffs", string>> = {
  en: { case: "Enclosure", lid: "Lid", plate: "Chassis plate", bracket: "Sensor bracket", wheel: "Wheel", caster: "Ball caster", standoffs: "Standoffs" },
  ru: { case: "Корпус", lid: "Крышка", plate: "Плата шасси", bracket: "Кронштейн датчика", wheel: "Колесо", caster: "Шаровая опора", standoffs: "Стойки" },
  kk: { case: "Корпус", lid: "Қақпақ", plate: "Шасси тақтасы", bracket: "Датчик кронштейні", wheel: "Дөңгелек", caster: "Шар тірек", standoffs: "Тіреулер" },
};

const WALL = 2.5, GAP = 5, STANDOFF = 5, LID = 3;
/** Clearance added around every cut-out so printed parts fit real ones (typical FDM tolerance). */
const FIT = 0.4;
/** Free band along the inside of the walls, kept clear for the lid screw bosses. */
const MARGIN = 9;
const r1 = (n: number) => Math.round(n * 10) / 10;
const v = (x: number, y: number, z: number): V3 => [r1(x), r1(y), r1(z)];
const sizeOf = (id: ComponentId) => partModel(id).size;

/** True footprint of a model (connectors that overhang the board included) and where its centre sits. */
function foot(id: ComponentId) {
  const b = modelBox(id);
  return { w: b.max[0] - b.min[0], d: b.max[1] - b.min[1], h: b.max[2], cx: (b.min[0] + b.max[0]) / 2, cy: (b.min[1] + b.max[1]) / 2 };
}

/** How high a part sits above the surface it is mounted on: standoffs for parts with mounting holes, rails for bare boards. */
const lift = (it: { id: ComponentId; role: string }) => (MOUNTS[it.id] ? STANDOFF : it.role === "board" ? 3 : 0);

/** Standoffs (with pilot holes for self-tapping screws) under a part's real mounting holes, or two rails for a bare board. */
function supports(it: { id: ComponentId; role: string }, cx: number, cy: number, z0: number): CadShape[] {
  const m = MOUNTS[it.id];
  if (m) {
    const [ro, rp] = SCREW[m.screw];
    return m.holes.flatMap(([hx, hy]) => [
      { type: "cylinder" as const, r: ro, h: STANDOFF, at: v(cx + hx, cy + hy, z0 + STANDOFF / 2) },
      { type: "cylinder" as const, r: rp, h: STANDOFF + 0.5, at: v(cx + hx, cy + hy, z0 + STANDOFF / 2 + 0.5), subtract: true },
    ]);
  }
  if (it.role !== "board") return [];
  const { w, d } = foot(it.id);
  return [-1, 1].map((sy) => ({ type: "box" as const, size: v(w - 6, 3, 3), at: v(cx, cy + sy * (d / 2 - 2), z0 + 1.5) }));
}

type V = [number, number, number];
const rot = (p: V, r: readonly number[] | undefined): V => {
  if (!r) return p;
  let [x, y, z] = p;
  const [ax, ay, az] = r.map((d) => (d * Math.PI) / 180) as V;
  [y, z] = [y * Math.cos(ax) - z * Math.sin(ax), y * Math.sin(ax) + z * Math.cos(ax)];
  [x, z] = [x * Math.cos(ay) + z * Math.sin(ay), -x * Math.sin(ay) + z * Math.cos(ay)];
  [x, y] = [x * Math.cos(az) - y * Math.sin(az), x * Math.sin(az) + y * Math.cos(az)];
  return [r1(x), r1(y), r1(z)];
};

/** A primitive of a placed model in world coordinates: its bounds, and whether it is round when seen along `axis`. */
function placedPrims(id: ComponentId, at: V, rotate?: V) {
  return partModel(id).prims.map((p: Prim) => {
    const b = primBox(p);
    const cs = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => rot([i & 1 ? b.max[0] : b.min[0], i & 2 ? b.max[1] : b.min[1], i & 4 ? b.max[2] : b.min[2]], rotate));
    const min = [0, 1, 2].map((k) => Math.min(...cs.map((c) => c[k]!)) + at[k]!) as V;
    const max = [0, 1, 2].map((k) => Math.max(...cs.map((c) => c[k]!)) + at[k]!) as V;
    return { p, min, max };
  });
}

/**
 * Cut-outs in a flat panel for every part of a placed model that passes through it (the slab between lo and hi
 * along `axis`): round parts get round holes, the rest rectangles, each with FIT clearance.
 */
function cutsThrough(id: ComponentId, at: V, rotate: V | undefined, axis: 0 | 1 | 2, lo: number, hi: number, only?: (p: Prim) => boolean): CadShape[] {
  const out: CadShape[] = [];
  for (const { p, min, max } of placedPrims(id, at, rotate)) {
    if (only && !only(p)) continue;
    if (max[axis]! <= lo || min[axis]! >= hi) continue;
    const c = [0, 1, 2].map((k) => (min[k]! + max[k]!) / 2) as V;
    c[axis] = (lo + hi) / 2;
    const span = [0, 1, 2].map((k) => max[k]! - min[k]!) as V;
    const deep = hi - lo + 2;
    const turn: V | undefined = axis === 2 ? undefined : axis === 1 ? [90, 0, 0] : [0, 90, 0];
    const round = p.type === "sphere" || (p.type === "cylinder" && Math.abs(span[(axis + 1) % 3]! - span[(axis + 2) % 3]!) < 0.2);
    if (round) out.push({ type: "cylinder", r: r1(Math.max(span[(axis + 1) % 3]!, span[(axis + 2) % 3]!) / 2 + FIT), h: deep, at: v(...c), ...(turn ? { rotate: turn } : {}), subtract: true });
    else { const sz = span.map((x) => x + 2 * FIT) as V; sz[axis] = deep; out.push({ type: "box", size: v(...sz), at: v(...c), subtract: true }); }
  }
  // Concentric parts (a can and the mesh inside it) need one hole, the biggest.
  const ext = (s: CadShape) => (s.type === "box" ? s.size[0] * s.size[1] * s.size[2] : s.r);
  return out.filter((s, i) => !out.some((o, j) => j !== i && o.type === s.type && o.at.every((x, k) => Math.abs(x - s.at[k]!) < 0.2) && (ext(o) > ext(s) || (ext(o) === ext(s) && j < i))));
}

type Item = { id: ComponentId; name: string; role: Role };

/** Every component to draw, from the parts list (qty capped so a bag of 20 LEDs does not become 20 models). */
function items(p: Project): Item[] {
  const out: Item[] = [];
  const names = new Map(p.parts.map((x) => [x.component, x.name]));
  const add = (id: ComponentId, n: number) => {
    const role: Role = id === p.board || BOARD_KINDS.has(id) ? (out.some((i) => i.role === "board") ? "inside" : "board") : ROLE[id] ?? "inside";
    if (role === "skip") return;
    for (let k = 0; k < n; k++) out.push({ id, name: n > 1 ? `${names.get(id) ?? id} ${k + 1}` : names.get(id) ?? id, role });
  };
  add(p.board, 1);
  for (const part of p.parts) {
    if (!part.component || part.component === p.board) continue;
    const cap = ROLE[part.component] === "motor" ? 4 : ROLE[part.component] === "top" ? 3 : 2;
    add(part.component, Math.min(part.qty, cap));
  }
  for (const inst of p.instances) if (!out.some((i) => i.id === inst.component)) add(inst.component, 1);
  // A readable model has a couple of dozen parts at most: keep the board, motors and what faces the user first.
  const rank: Record<Role, number> = { board: 0, motor: 1, front: 2, servo: 3, top: 4, power: 5, inside: 6, outside: 7, skip: 8 };
  return out.map((it, i) => ({ it, i })).sort((a, b) => rank[a.it.role] - rank[b.it.role] || a.i - b.i).slice(0, 20).map((x) => x.it);
}

/** Shelf packing of footprints into rows no wider than `maxW`; returns centres relative to the packed area's corner. */
function pack(list: { w: number; d: number }[], maxW: number): { at: [number, number][]; w: number; d: number } {
  let x = 0, y = 0, row = 0, w = 0;
  const at: [number, number][] = [];
  for (const it of list) {
    if (x > 0 && x + it.w > maxW) { y += row + GAP; x = 0; row = 0; }
    at.push([x + it.w / 2, y + it.d / 2]);
    x += it.w + GAP; row = Math.max(row, it.d); w = Math.max(w, x - GAP);
  }
  return { at, w, d: y + row };
}

const bought = (it: Item, at: V3, rotate?: V3, step?: number): CadPart => ({
  name: it.name.slice(0, 60), color: "#8b95a5", printed: false, component: it.id, at, ...(rotate ? { rotate } : {}), ...(step ? { step } : {}),
});

/** Spreads the build's groups (in build order) over the project's assembly steps, so the animation captions match. */
function stepper(assemblySteps: number, groups: number) {
  return (g: number) => Math.max(1, Math.min(assemblySteps, Math.round(1 + (g * (assemblySteps - 1)) / Math.max(1, groups - 1))));
}


function enclosure(p: Project, list: Item[], n: Record<string, string>): Cad {
  const step = stepper(p.assembly.length, 5);
  const board = list.find((i) => i.role === "board")!;
  const floor = [board, ...list.filter((i) => i.role === "inside" || i.role === "power").sort((a, b) => foot(b.id).w * foot(b.id).d - foot(a.id).w * foot(a.id).d)];
  const front = list.filter((i) => i.role === "front");
  const top = list.filter((i) => i.role === "top" || i.role === "servo");
  const outside = list.filter((i) => i.role === "outside" || i.role === "motor");

  // Floor plan, packed by true footprints; the board goes first, against the -X wall, so its USB faces out.
  const fp = floor.map((i) => ({ w: foot(i.id).w, d: foot(i.id).d }));
  const area = fp.reduce((s, f) => s + (f.w + GAP) * (f.d + GAP), 0);
  const frontRow = front.reduce((s, i) => s + foot(i.id).w + GAP, 0) - (front.length ? GAP : 0);
  const topFp = top.map((i) => ({ w: foot(i.id).w, d: foot(i.id).d }));
  const topArea = topFp.reduce((s, f) => s + (f.w + 8) * (f.d + 8), 0);
  const maxW = Math.max(fp[0]!.w, Math.sqrt(Math.max(area, topArea)) * 1.25, frontRow, ...topFp.map((f) => f.w), 60);
  const packed = pack(fp, maxW);
  const topPacked = pack(topFp.map((f) => ({ w: f.w + 3, d: f.d + 3 })), maxW);
  const frontDepth = front.length ? Math.max(...front.map((i) => foot(i.id).h)) + 3 : 0;
  const iw = Math.max(packed.w, frontRow, topPacked.w) + 2 * MARGIN;
  const idp = Math.max(packed.d + frontDepth, topPacked.d) + 2 * MARGIN;
  const ow = iw + 2 * WALL, od = idp + 2 * WALL;

  // Lid parts first: what hangs under the lid decides how tall the box must be.
  type TopPlan = { it: Item; x: number; y: number; mode: "window" | "through" | "onTop" | "servo"; below: number };
  const topPlan: TopPlan[] = top.map((it, k) => {
    const [px, py] = topPacked.at[k]!;
    const f = foot(it.id);
    const x = -topPacked.w / 2 + px - f.cx, y = -topPacked.d / 2 + py - f.cy;
    const prims = partModel(it.id).prims;
    if (it.role === "servo") return { it, x, y, mode: "servo", below: it.id === "servo-sg90" ? 16 : 28 };
    const glass = prims.find((q) => q.finish === "glass" && q.type === "box");
    if (glass) return { it, x, y, mode: "window", below: primBox(glass).max[2] };
    const act = prims.map(primBox).reduce((a, b) => (b.max[2] > a.max[2] ? b : a));
    if (act.max[2] - act.min[2] >= LID + 1) return { it, x, y, mode: "through", below: act.min[2] + 0.5 };
    return { it, x, y, mode: "onTop", below: 0 };
  });
  const floorTop = Math.max(...floor.map((i) => foot(i.id).h + lift(i)), ...front.map((i) => foot(i.id).d + 6));
  const hang = Math.max(0, ...topPlan.map((t) => t.below));
  const ih = Math.min(120, Math.max(28, floorTop + hang + 4));
  const oh = WALL + ih;                 // lid sits on the walls: its underside is at oh
  const lidZ = oh + LID / 2;

  const caseShapes: CadShape[] = [
    { type: "box", size: v(ow, od, oh), at: v(0, 0, oh / 2), radius: 4 },
    { type: "box", size: v(iw, idp, ih + 1), at: v(0, 0, WALL + (ih + 1) / 2), radius: 2, subtract: true },
  ];
  const lidShapes: CadShape[] = [{ type: "box", size: v(ow, od, LID), at: v(0, 0, lidZ), radius: 4 }];
  // Screw bosses in the four inside corners, M3 pilots on top; matching clearance holes in the lid.
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) {
    const bx = sx * (iw / 2 - 3.5), by = sy * (idp / 2 - 3.5);
    caseShapes.push({ type: "cylinder", r: 3.5, h: ih, at: v(bx, by, WALL + ih / 2) });
    caseShapes.push({ type: "cylinder", r: SCREW.M3[1], h: 10, at: v(bx, by, oh - 4.5), subtract: true });
    lidShapes.push({ type: "cylinder", r: 1.7, h: LID + 2, at: v(bx, by, lidZ), subtract: true });
  }

  const placed: CadPart[] = [];
  const x0 = -iw / 2 + MARGIN, y0 = -idp / 2 + MARGIN + frontDepth;
  floor.forEach((it, k) => {
    const [px, py] = packed.at[k]!;
    const f = foot(it.id);
    const cx = x0 + px - f.cx, cy = y0 + py - f.cy;
    const z = WALL + lift(it);
    placed.push(bought(it, v(cx, cy, z), undefined, step(it === board ? 1 : 2)));
    caseShapes.push(...supports(it, cx, cy, WALL));
    const usb = USB[it.id];
    if (usb) caseShapes.push({ type: "box", size: v(WALL * 3 + 2 * MARGIN, usb.w + 2 * FIT, usb.h + 2 * FIT), at: v(-iw / 2 - WALL / 2, cy + usb.y, z + usb.z), subtract: true });
  });

  // Forward-looking sensors stand upright just behind the front wall (-Y); whatever reaches the wall gets a hole.
  let fx = -frontRow / 2;
  for (const it of front) {
    const f = foot(it.id);
    const cx = fx + f.w / 2 - f.cx, cz = WALL + f.d / 2 + 3;
    fx += f.w + GAP;
    const at = v(cx, -idp / 2 + 1.6 + FIT, cz);
    placed.push(bought(it, at, [90, 0, 0], step(3)));
    let cuts = cutsThrough(it.id, at, [90, 0, 0], 1, -od / 2, -idp / 2);
    if (!cuts.length) cuts = cutsThrough(it.id, at, [90, 0, 0], 1, -od / 2 - 50, -idp / 2 + 0.01, (q) => q.type !== "box" || q.finish !== "glossy").slice(0, 1)
      .map((c) => ({ ...c, at: v(c.at[0], -od / 2 + WALL / 2, c.at[2]), ...(c.type === "box" ? { size: v(c.size[0], WALL * 3, c.size[2]) } : { h: WALL * 3 }) }) as CadShape);
    caseShapes.push(...cuts);
  }

  // Lid parts: screens behind exact windows, knobs/LEDs/domes through holes, flat parts (keypads, rings) on top.
  for (const t of topPlan) {
    let at: V3;
    if (t.mode === "servo") {
      const sg = t.it.id === "servo-sg90";
      at = v(t.x, t.y, oh + LID - (sg ? 16 : 28) - 1.25);
      lidShapes.push({ type: "box", size: v(sg ? 22.8 + 2 * FIT : 40.7 + 2 * FIT, sg ? 12.2 + 2 * FIT : 19.7 + 2 * FIT, LID + 2), at: v(t.x, t.y, lidZ), subtract: true });
    } else if (t.mode === "window") {
      at = v(t.x, t.y, oh + 0.5 - t.below);
      lidShapes.push(...cutsThrough(t.it.id, at, undefined, 2, oh, oh + LID, (q) => q.finish === "glass" && q.type === "box"));
    } else if (t.mode === "through") {
      at = v(t.x, t.y, oh - t.below);
      lidShapes.push(...cutsThrough(t.it.id, at, undefined, 2, oh, oh + LID));
    } else {
      at = v(t.x, t.y, oh + LID);
      lidShapes.push({ type: "box", size: v(8, 4, LID + 2), at: v(t.x + foot(t.it.id).cx, t.y + foot(t.it.id).cy, lidZ), subtract: true });
    }
    placed.push(bought(t.it, at, undefined, step(4)));
  }

  // External parts on the table beside the box, in a row.
  let ox = ow / 2 + 15;
  for (const it of outside) {
    const f = foot(it.id);
    placed.push(bought(it, v(ox + f.w / 2 - f.cx, -f.cy, 0), undefined, step(4)));
    ox += f.w + 10;
  }

  return { parts: [
    { name: n.case!, color: "#FF7A1A", printed: true, step: step(0), shapes: caseShapes.slice(0, 80) },
    ...placed,
    { name: n.lid!, color: "#FFB15E", printed: true, step: step(4), shapes: lidShapes.slice(0, 80) },
  ].slice(0, 32) };
}

function rover(p: Project, list: Item[], n: Record<string, string>): Cad {
  const step = stepper(p.assembly.length, 5);
  const board = list.find((i) => i.role === "board")!;
  const motors = list.filter((i) => i.role === "motor").slice(0, 4);
  const front = list.filter((i) => i.role === "front");
  const deck = [board, ...list.filter((i) => ["inside", "power", "top", "servo"].includes(i.role) && i.role !== "board")];
  const fp = deck.map((i) => ({ w: foot(i.id).w, d: foot(i.id).d }));
  const packed = pack(fp, 150);
  const L = Math.max(170, packed.w + 60), W = Math.max(115, Math.min(170, packed.d + 20));

  // TT motors under the plate; wheels (r 33) touch the floor, so the motor body sits 23.6 mm up.
  const motorZ = 33 - 9.4, plateZ = motorZ + 18.8 + 1.5;
  const deckZ = plateZ + 1.5;
  const plate: CadShape[] = [
    { type: "box", size: v(L, W, 3), at: v(0, 0, plateZ), radius: 10 },
    ...[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => ({ type: "cylinder" as const, r: 1.6, h: 8, at: v(sx! * (L / 2 - 8), sy! * (W / 2 - 8), plateZ), subtract: true })),
  ];
  const parts: CadPart[] = [];
  const axles = motors.length >= 4 ? [-L / 2 + 40, L / 2 - 70] : [-L / 2 + 40];
  motors.forEach((m, i) => {
    const ax = axles[Math.floor(i / 2) % axles.length]!;
    const side = i % 2 === 0 ? 1 : -1;
    const my = side * (W / 2 - 14);
    parts.push(bought(m, v(ax - 22, my, motorZ), undefined, step(1)));
    // M3 holes through the plate for the motor's mounting bracket.
    for (const dx of [-8, 8]) plate.push({ type: "cylinder", r: 1.7, h: 8, at: v(ax - 22 + 16 + dx, my, plateZ), subtract: true });
    parts.push({ name: `${n.wheel} ${i + 1}`, color: "#1B1D21", printed: false, step: step(1), shapes: [
      { type: "cylinder", r: 33, h: 26, at: v(ax, my + side * (11.25 + 2 + 13), 33), rotate: [90, 0, 0] },
    ] });
  });
  if (motors.length < 4) parts.push({ name: n.caster!, color: "#C9CDD2", printed: false, step: step(1), shapes: [
    { type: "cylinder", r: 6, h: plateZ - 1.5, at: v(L / 2 - 25, 0, (plateZ - 1.5) / 2) },
    { type: "cylinder", r: 10, h: 6, at: v(L / 2 - 25, 0, plateZ - 4.5) },
  ] });

  const ox = -L / 2 + 15, oy = -packed.d / 2;
  deck.forEach((it, k) => {
    const [px, py] = packed.at[k]!;
    const f = foot(it.id);
    const cx = ox + px - f.cx, cy = oy + py - f.cy;
    parts.push(bought(it, v(cx, cy, deckZ + lift(it)), undefined, step(it === board ? 2 : it.role === "power" ? 3 : 2)));
    plate.push(...supports(it, cx, cy, deckZ));
  });

  // Forward-looking sensors on a printed bracket at the front edge, looking along +X.
  if (front.length) {
    const span = front.reduce((s, i) => s + foot(i.id).w + GAP, 0);
    const h = Math.max(...front.map((i) => foot(i.id).d)) + 8;
    const bracket: CadShape[] = [
      { type: "box", size: v(3, span + 6, h), at: v(L / 2 - 6, 0, deckZ + h / 2), radius: 1 },
      { type: "box", size: v(14, span + 6, 3), at: v(L / 2 - 12.5, 0, deckZ + 1.5) },
    ];
    let fy = -span / 2;
    for (const it of front) {
      const f = foot(it.id);
      const at = v(L / 2 - 7.5 - 1.6 - FIT, fy + f.w / 2 - f.cx, deckZ + f.d / 2 + 3);
      parts.push(bought(it, at, [90, 0, 90], step(4)));
      bracket.push(...cutsThrough(it.id, at, [90, 0, 90], 0, L / 2 - 7.5, L / 2 - 4.5));
      fy += f.w + GAP;
    }
    parts.push({ name: n.bracket!, color: "#2EE6C9", printed: true, step: step(4), shapes: bracket.slice(0, 80) });
  }
  return { parts: [{ name: n.plate!, color: "#D9DDE3", printed: true, step: step(0), shapes: plate.slice(0, 80) }, ...parts].slice(0, 32) };
}

export function autoCad(p: Project, locale: Locale, shape: Shape = "auto"): Cad {
  const list = items(p);
  const n = NAMES[locale];
  const wantsRover = list.some((i) => i.role === "motor") || p.parts.some((x) => x.component === "robot-chassis-2wd" || x.component === "robot-chassis-4wd");
  if (shape === "open") return finish(open(p, list, n));
  if (shape === "enclosure") return finish(enclosure(p, list, n));
  const isRover = shape === "rover" || wantsRover;
  if (isRover && !list.some((i) => i.role === "motor")) {
    list.push({ id: "dc-motor", name: "TT motor 1", role: "motor" }, { id: "dc-motor", name: "TT motor 2", role: "motor" });
  }
  return finish(isRover ? rover(p, list, n) : enclosure(p, list, n));
}

/** Bought parts keep their real colours from the built-in models; give the legend a matching swatch. */
function finish(cad: Cad): Cad {
  for (const part of cad.parts) if (part.component) part.color = partModel(part.component).prims[0]!.color;
  return cad;
}

/** Open build: every part laid out on a printed base plate, mounted on its real holes, sensors at the front edge. */
function open(p: Project, list: Item[], n: Record<string, string>): Cad {
  const step = stepper(p.assembly.length, 3);
  const board = list.find((i) => i.role === "board")!;
  const flat = [board, ...list.filter((i) => i !== board && i.role !== "front")];
  const front = list.filter((i) => i.role === "front");
  const fp = flat.map((i) => ({ w: foot(i.id).w, d: foot(i.id).d }));
  const packed = pack(fp, Math.max(fp[0]!.w + 10, Math.sqrt(fp.reduce((s, f) => s + (f.w + GAP) * (f.d + GAP), 0)) * 1.3, 120));
  const frontW = front.reduce((s, i) => s + foot(i.id).w + GAP, 0);
  const frontD = front.length ? Math.max(...front.map((i) => foot(i.id).h)) + GAP : 0;
  const L = Math.max(packed.w, frontW) + 2 * GAP + 10, W = packed.d + frontD + 2 * GAP + 10;
  const plate: CadShape[] = [
    { type: "box", size: v(L, W, 3), at: v(0, 0, 1.5), radius: 6 },
    ...[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => ({ type: "cylinder" as const, r: 1.6, h: 8, at: v(sx! * (L / 2 - 6), sy! * (W / 2 - 6), 1.5), subtract: true })),
  ];
  const parts: CadPart[] = [];
  const x0 = -L / 2 + GAP + 5, y0 = -W / 2 + frontD + GAP + 5;
  flat.forEach((it, k) => {
    const [px, py] = packed.at[k]!;
    const f = foot(it.id);
    const cx = x0 + px - f.cx, cy = y0 + py - f.cy;
    parts.push(bought(it, v(cx, cy, 3 + lift(it)), undefined, step(1)));
    plate.push(...supports(it, cx, cy, 3));
  });
  let fx = -frontW / 2;
  for (const it of front) {
    const f = foot(it.id);
    parts.push(bought(it, v(fx + f.w / 2 - f.cx, -W / 2 + f.h + 2, 3 + f.d / 2), [90, 0, 0], step(2)));
    fx += f.w + GAP;
  }
  return { parts: [{ name: n.plate!, color: "#D9DDE3", printed: true, step: step(0), shapes: plate.slice(0, 80) }, ...parts].slice(0, 32) };
}
