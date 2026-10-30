import type { ComponentId } from "../hardware/ids.ts";
import type { Locale } from "../i18n/config.ts";
import { partModel } from "./models.ts";
import type { Cad, CadPart, CadShape, ProjectInput as Project } from "./schema.ts";

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

const WALL = 2.5, GAP = 5, STANDOFF = 5;
const r1 = (n: number) => Math.round(n * 10) / 10;
const v = (x: number, y: number, z: number): V3 => [r1(x), r1(y), r1(z)];
const sizeOf = (id: ComponentId) => partModel(id).size;

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

const standoffs = (cx: number, cy: number, bw: number, bd: number, z0: number): CadShape[] =>
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => ({ type: "cylinder", r: 3, h: STANDOFF, at: v(cx + sx! * (bw / 2 - 5), cy + sy! * (bd / 2 - 5), z0 + STANDOFF / 2) }));

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
  const inside = list.filter((i) => i.role === "inside" || i.role === "power");
  const front = list.filter((i) => i.role === "front");
  const top = list.filter((i) => i.role === "top" || i.role === "servo");
  const outside = list.filter((i) => i.role === "outside" || i.role === "motor");

  // Floor plan: the board first (it goes against the -X wall, USB facing out), then the rest by size.
  const floor = [board, ...inside.sort((a, b) => sizeOf(b.id)[0] * sizeOf(b.id)[1] - sizeOf(a.id)[0] * sizeOf(a.id)[1])];
  const fp = floor.map((i) => ({ w: sizeOf(i.id)[0], d: sizeOf(i.id)[1] }));
  const area = fp.reduce((s, f) => s + (f.w + GAP) * (f.d + GAP), 0);
  const frontRow = front.reduce((s, i) => s + sizeOf(i.id)[0] + GAP, 0);
  const topRow = top.reduce((s, i) => s + sizeOf(i.id)[0] + 8, 0);
  const maxW = Math.max(fp[0]!.w + 10, Math.sqrt(area) * 1.25, frontRow, topRow * 0.6, 60);
  const packed = pack(fp, maxW);
  const frontDepth = front.length ? Math.max(...front.map((i) => sizeOf(i.id)[2])) + GAP : 0;
  const iw = Math.max(packed.w, frontRow, Math.min(topRow, 220)) + 2 * GAP;
  const idp = packed.d + frontDepth + 2 * GAP;
  const heights = [...floor.map((i) => sizeOf(i.id)[2] + (i === board ? STANDOFF : 0)), ...front.map((i) => sizeOf(i.id)[1] + 6)];
  const ih = Math.min(90, Math.max(28, Math.max(...heights) + 8));
  const ow = iw + 2 * WALL, od = idp + 2 * WALL, oh = ih + WALL;
  const x0 = -iw / 2, y0 = -idp / 2 + frontDepth;    // packing origin: inner -X wall, behind the front sensors

  const parts: CadPart[] = [];
  const caseShapes: CadShape[] = [
    { type: "box", size: v(ow, od, oh), at: v(0, 0, oh / 2), radius: 4 },
    { type: "box", size: v(iw, idp, ih + 1), at: v(0, 0, WALL + (ih + 1) / 2), radius: 2, subtract: true },
  ];
  const lidHoles: CadShape[] = [];
  const placed: CadPart[] = [];

  floor.forEach((it, k) => {
    const [px, py] = packed.at[k]!;
    const [w, d] = [fp[k]!.w, fp[k]!.d];
    const cx = x0 + GAP + px, cy = y0 + GAP + py;
    const z = WALL + (it === board ? STANDOFF : 0);
    placed.push({ ...bought(it, v(cx, cy, z), undefined, step(it === board ? 1 : 2)) });
    if (it === board) {
      caseShapes.push(...standoffs(cx, cy, w, d, WALL));
      const usb = USB[it.id];
      if (usb) caseShapes.push({ type: "box", size: v(WALL * 3, usb.w, usb.h), at: v(-ow / 2 + WALL / 2, cy + usb.y, z + usb.z), subtract: true });
    }
  });

  // Forward-looking sensors stand upright behind the front wall (-Y), looking through holes.
  let fx = -frontRow / 2;
  for (const it of front) {
    const [w, d, h] = sizeOf(it.id);
    const cx = fx + w / 2, cz = WALL + d / 2 + 3;
    fx += w + GAP;
    const at = v(cx, -od / 2 + h - 1, cz);
    placed.push(bought(it, at, [90, 0, 0], step(3)));
    if (it.id === "hc-sr04") for (const sx of [-13, 13]) caseShapes.push({ type: "cylinder", r: 8.4, h: WALL * 4, at: v(cx + sx, -od / 2, cz), rotate: [90, 0, 0], subtract: true });
    else caseShapes.push({ type: "box", size: v(Math.min(w - 4, 16), WALL * 4, Math.min(d - 4, 10)), at: v(cx, -od / 2, cz), subtract: true });
  }

  // Lid parts: in a row on the lid; servos drop through a slot and hang from their tabs.
  const lidZ = oh + 1.5;
  let tx = -topRow / 2 + 4;
  for (const it of top) {
    const [w, d] = sizeOf(it.id);
    const cx = tx + w / 2;
    tx += w + 8;
    if (it.role === "servo") {
      const sg = it.id === "servo-sg90";
      const tabZ = sg ? 16 : 28;
      placed.push(bought(it, v(cx, od / 4, lidZ + 1.5 - tabZ + 1.25), undefined, step(4)));
      lidHoles.push({ type: "box", size: v(sg ? 23.5 : 41.5, sg ? 12.8 : 20.5, 10), at: v(cx, od / 4, lidZ), subtract: true });
    } else {
      placed.push(bought(it, v(cx, od / 4 - d / 2 + 6, lidZ + 1.5), undefined, step(4)));
      lidHoles.push({ type: "cylinder", r: Math.min(4, d / 4), h: 10, at: v(cx, od / 4 - d / 2 + 6, lidZ), subtract: true });
    }
  }

  // External parts on the table beside the box.
  let ox = ow / 2 + 15;
  for (const it of outside) {
    const [w] = sizeOf(it.id);
    placed.push(bought(it, v(ox + w / 2, 0, 0), undefined, step(4)));
    ox += w + 10;
  }

  parts.push({ name: n.case!, color: "#FF7A1A", printed: true, step: step(0), shapes: caseShapes.slice(0, 40) });
  parts.push(...placed);
  parts.push({ name: n.lid!, color: "#FFB15E", printed: true, step: step(4), shapes: [{ type: "box" as const, size: v(ow, od, 3), at: v(0, 0, lidZ), radius: 4 }, ...lidHoles].slice(0, 40) });
  return { parts: parts.slice(0, 32) };
}

function rover(p: Project, list: Item[], n: Record<string, string>): Cad {
  const step = stepper(p.assembly.length, 5);
  const board = list.find((i) => i.role === "board")!;
  const motors = list.filter((i) => i.role === "motor").slice(0, 4);
  const front = list.filter((i) => i.role === "front");
  const deck = [board, ...list.filter((i) => ["inside", "power", "top", "servo"].includes(i.role) && i.role !== "board")];
  const fp = deck.map((i) => ({ w: sizeOf(i.id)[0], d: sizeOf(i.id)[1] }));
  const packed = pack(fp, 150);
  const L = Math.max(170, packed.w + 60), W = Math.max(115, Math.min(160, packed.d + 20));

  // TT motors under the plate; wheels (r 33) touch the floor, so the motor body sits 23.6 mm up.
  const motorZ = 33 - 9.4, plateZ = motorZ + 18.8 + 1.5;
  const parts: CadPart[] = [{ name: n.plate!, color: "#D9DDE3", printed: true, step: step(0), shapes: [
    { type: "box" as const, size: v(L, W, 3), at: v(0, 0, plateZ), radius: 10 },
    ...[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => ({ type: "cylinder" as const, r: 1.6, h: 8, at: v(sx! * (L / 2 - 8), sy! * (W / 2 - 8), plateZ), subtract: true })),
  ] }];
  const axles = motors.length >= 4 ? [-L / 2 + 40, L / 2 - 70] : [-L / 2 + 40];
  motors.forEach((m, i) => {
    const ax = axles[Math.floor(i / 2) % axles.length]!;
    const side = i % 2 === 0 ? 1 : -1;
    const my = side * (W / 2 - 14);
    parts.push(bought(m, v(ax - 22, my, motorZ), undefined, step(1)));
    parts.push({ name: `${n.wheel} ${i + 1}`, color: "#1B1D21", printed: false, step: step(1), shapes: [
      { type: "cylinder", r: 33, h: 26, at: v(ax, my + side * (11.25 + 2 + 13), 33), rotate: [90, 0, 0] },
    ] });
  });
  if (motors.length < 4) parts.push({ name: n.caster!, color: "#C9CDD2", printed: false, step: step(1), shapes: [
    { type: "cylinder", r: 6, h: plateZ - 1.5, at: v(L / 2 - 25, 0, (plateZ - 1.5) / 2) },
    { type: "cylinder", r: 10, h: 6, at: v(L / 2 - 25, 0, plateZ - 4.5) },
  ] });

  const deckZ = plateZ + 1.5;
  const ox = -L / 2 + 15, oy = -packed.d / 2;
  deck.forEach((it, k) => {
    const [px, py] = packed.at[k]!;
    const cx = ox + px, cy = oy + py;
    const isBoard = it === board;
    parts.push(bought(it, v(cx, cy, deckZ + (isBoard ? STANDOFF : 0)), undefined, step(isBoard ? 2 : it.role === "power" ? 3 : 2)));
    if (isBoard) parts.push({ name: n.standoffs!, color: "#C9A227", printed: false, step: step(2), shapes: standoffs(cx, cy, fp[k]!.w, fp[k]!.d, deckZ) });
  });

  // Forward-looking sensors on a printed bracket at the front edge, looking along +X.
  if (front.length) {
    const span = front.reduce((s, i) => s + sizeOf(i.id)[0] + GAP, 0);
    const h = Math.max(...front.map((i) => sizeOf(i.id)[1])) + 8;
    parts.push({ name: n.bracket!, color: "#2EE6C9", printed: true, step: step(4), shapes: [
      { type: "box", size: v(4, span + 6, h), at: v(L / 2 - 6, 0, deckZ + h / 2), radius: 1 },
      { type: "box", size: v(14, span + 6, 3), at: v(L / 2 - 13, 0, deckZ + 1.5) },
    ] });
    let fy = -span / 2;
    for (const it of front) {
      const [w, d] = sizeOf(it.id);
      parts.push(bought(it, v(L / 2 - 4, fy + w / 2, deckZ + d / 2 + 2), [90, 0, 90], step(4)));
      fy += w + GAP;
    }
  }
  return { parts: parts.slice(0, 32) };
}

export function autoCad(p: Project, locale: Locale): Cad {
  const list = items(p);
  const n = NAMES[locale];
  const isRover = list.some((i) => i.role === "motor") || p.parts.some((x) => x.component === "robot-chassis-2wd" || x.component === "robot-chassis-4wd");
  if (isRover && !list.some((i) => i.role === "motor")) {
    list.push({ id: "dc-motor", name: "TT motor 1", role: "motor" }, { id: "dc-motor", name: "TT motor 2", role: "motor" });
  }
  const cad = isRover ? rover(p, list, n) : enclosure(p, list, n);
  // Bought parts keep their real colours from the built-in models; give the legend a matching swatch.
  for (const part of cad.parts) if (part.component) part.color = partModel(part.component).prims[0]!.color;
  return cad;
}
