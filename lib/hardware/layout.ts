/**
 * Automatic wiring-diagram layout: places a guide's board and modules, computes pin coordinates and routes
 * every wire as an orthogonal polyline around the parts. Pure and deterministic (same input → same output),
 * so it can run in server components and be unit-tested (tests/layout.test.ts).
 *
 * Coordinates are pixels. One grid unit (breadboard hole / header pitch) is 12 px; wires are routed on a 6 px lattice.
 */
import type { ComponentDef, PinDef, Side } from "./types";

export type LayoutNote = string | Readonly<Record<string, string>>;

export type CircuitInput = {
  board: string;
  instances: ReadonlyArray<{ id: string; component: string; label?: string }>;
  connections: ReadonlyArray<{ from: string; to: string; color: string; note?: LayoutNote }>;
};

export type LayoutPin = { id: string; x: number; y: number; side: Side; label: string; role: PinDef["role"] };
export type LayoutComponent = {
  id: string; x: number; y: number; w: number; h: number; def: ComponentDef; label: string;
  /** Quarter turns clockwise applied to the definition (pin sides already rotated). */
  rotation: 0 | 1 | 2 | 3;
  pins: LayoutPin[];
};
export type LayoutWire = { id: string; color: string; points: [number, number][]; from: string; to: string; note?: LayoutNote };
export type LayoutRail = { id: "power" | "gnd"; kind: "power" | "gnd"; label: string; volts?: number; y: number; x1: number; x2: number; color: string };
export type Layout = { width: number; height: number; components: LayoutComponent[]; wires: LayoutWire[]; rails: LayoutRail[] };

export const UNIT = 12;
const STEP = 6;          // routing lattice
const STUB = 12;         // wire leaves a pin this far beyond the component edge
const PIN_INSET = 6;     // pin centre sits half a pitch inside the edge (header row)
const GAP = 36;          // minimum gap between parts (3 grid units)
const MARGIN = 72;       // free border around everything (room for wires to go around)

const CW: Record<Side, Side> = { top: "right", right: "bottom", bottom: "left", left: "top" };
const OUT: Record<Side, [number, number]> = { top: [0, -1], bottom: [0, 1], left: [-1, 0], right: [1, 0] };
const SIDES: Side[] = ["top", "right", "bottom", "left"];

type Group = "board" | "top" | "right" | "far" | "left" | "bottom" | "power";
const FACING: Record<Exclude<Group, "board">, Side> = { top: "bottom", right: "left", far: "left", left: "right", bottom: "top", power: "top" };

type Placed = { id: string; def: ComponentDef; label: string; rot: 0 | 1 | 2 | 3; w: number; h: number; x: number; y: number; group: Group; pins: LayoutPin[] };

const snap = (v: number, s = UNIT) => Math.round(v / s) * s;

function parseEnd(end: string): [string, string] {
  const i = end.indexOf(".");
  if (i < 1) throw new Error(`Bad endpoint "${end}"`);
  return [end.slice(0, i), end.slice(i + 1)];
}

/** Pins in the component's own (unrotated) frame: evenly spaced at header pitch, centred along their side. */
function localPins(def: ComponentDef): LayoutPin[] {
  const W = def.draw.w * UNIT, H = def.draw.h * UNIT;
  const out: LayoutPin[] = [];
  for (const side of SIDES) {
    const list = def.pins.filter((p) => p.side === side);
    const len = side === "top" || side === "bottom" ? def.draw.w : def.draw.h;
    const start = Math.max(0, Math.floor((len - list.length) / 2));
    list.forEach((p, k) => {
      const t = (start + k) * UNIT + UNIT / 2;
      const [x, y] = side === "top" ? [t, PIN_INSET] : side === "bottom" ? [t, H - PIN_INSET] : side === "left" ? [PIN_INSET, t] : [W - PIN_INSET, t];
      out.push({ id: p.id, x, y, side, label: p.label ?? p.id, role: p.role });
    });
  }
  return out;
}

/** Rotate local pins `rot` quarter turns clockwise. Returns new pins and rotated size. */
function rotatePins(pins: LayoutPin[], w: number, h: number, rot: number): { pins: LayoutPin[]; w: number; h: number } {
  let cur = pins, cw = w, ch = h;
  for (let r = 0; r < rot; r++) {
    const H = ch;
    cur = cur.map((p) => ({ ...p, x: H - p.y, y: p.x, side: CW[p.side] }));
    [cw, ch] = [ch, cw];
  }
  return { pins: cur, w: cw, h: ch };
}

function groupOf(def: ComponentDef): Exclude<Group, "board"> {
  if (def.kind === "power") return "power";
  if (def.category === "Sensors" || def.category === "Displays" || def.category === "Wireless") return "top";
  return "right";
}

// ---------------------------------------------------------------------------------------------------------------
// Router: A* on a 6 px lattice with turn / overlap penalties.

class Heap {
  private k: number[] = []; private v: number[] = []; private s: number[] = []; private n = 0;
  get size() { return this.k.length; }
  push(key: number, val: number) {
    const k = this.k, v = this.v, s = this.s; let i = k.length; const seq = this.n++;
    k.push(key); v.push(val); s.push(seq);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (k[p]! < key || (k[p] === key && s[p]! < seq)) break;
      k[i] = k[p]!; v[i] = v[p]!; s[i] = s[p]!; i = p;
    }
    k[i] = key; v[i] = val; s[i] = seq;
  }
  pop(): number {
    const k = this.k, v = this.v, s = this.s;
    const top = v[0]!;
    const lk = k.pop()!, lv = v.pop()!, ls = s.pop()!;
    if (k.length) {
      let i = 0; const n = k.length;
      for (;;) {
        const a = 2 * i + 1, b = a + 1; let m = i; let mk = lk, ms = ls;
        if (a < n && (k[a]! < mk || (k[a] === mk && s[a]! < ms))) { m = a; mk = k[a]!; ms = s[a]!; }
        if (b < n && (k[b]! < mk || (k[b] === mk && s[b]! < ms))) { m = b; }
        if (m === i) break;
        k[i] = k[m]!; v[i] = v[m]!; s[i] = s[m]!; i = m;
      }
      k[i] = lk; v[i] = lv; s[i] = ls;
    }
    return top;
  }
}

const DX = [1, 0, -1, 0], DY = [0, 1, 0, -1]; // 0 right, 1 down, 2 left, 3 up
const dirOf = (side: Side) => (side === "right" ? 0 : side === "bottom" ? 1 : side === "left" ? 2 : 3);

type Grid = { ni: number; nj: number; blocked: Uint8Array; occH: Uint16Array; occV: Uint16Array; railRow: Uint8Array };

function route(g: Grid, start: [number, number], startDir: number, goals: Set<number>, goalDir: number | null, goalRowY: number | null): number[] | null {
  const { ni, nj, blocked, occH, occV, railRow } = g;
  const N = ni * nj;
  const best = new Float64Array(N * 4).fill(Infinity);
  const prev = new Int32Array(N * 4).fill(-1);
  const heap = new Heap();
  const s = start[1] * ni + start[0];
  const goalList = [...goals];
  const h = (i: number, j: number) => {
    if (goalRowY !== null) return Math.abs(j - goalRowY);
    let m = Infinity;
    for (const gidx of goalList) { const d = Math.abs((gidx % ni) - i) + Math.abs(Math.floor(gidx / ni) - j); if (d < m) m = d; }
    return m;
  };
  best[s * 4 + startDir] = 0;
  heap.push(h(start[0], start[1]), s * 4 + startDir);
  const TURN = 6, SAME = 90, CROSS = 4, NEAR = 1.2, CORNER_ON_WIRE = 60, RAIL_RUN = 400;
  let found = -1;
  const done = new Uint8Array(N * 4);
  while (heap.size) {
    const st = heap.pop();
    if (done[st]) continue;
    done[st] = 1;
    const node = st >> 2, d = st & 3;
    if (goals.has(node) && node !== s) { found = st; break; }
    const i = node % ni, j = (node - i) / ni;
    const gc = best[st]!;
    for (let nd = 0; nd < 4; nd++) {
      if (nd === ((d + 2) & 3)) continue;
      const ii = i + DX[nd]!, jj = j + DY[nd]!;
      if (ii < 0 || jj < 0 || ii >= ni || jj >= nj) continue;
      const nn = jj * ni + ii;
      const isGoal = goals.has(nn);
      if (blocked[nn] && !isGoal) continue;
      const horiz = nd === 0 || nd === 2;
      let c = 1;
      if (nd !== d) { c += TURN; if (occH[node]! || occV[node]!) c += CORNER_ON_WIRE; }
      if (horiz) {
        if (occH[nn]) c += SAME; if (occV[nn]) c += CROSS;
        if ((jj > 0 && occH[nn - ni]) || (jj < nj - 1 && occH[nn + ni])) c += NEAR;
        if (railRow[jj]) c += RAIL_RUN;
      } else {
        if (occV[nn]) c += SAME; if (occH[nn]) c += CROSS;
        if ((ii > 0 && occV[nn - 1]) || (ii < ni - 1 && occV[nn + 1])) c += NEAR;
      }
      if (isGoal) {
        if (goalDir !== null && nd !== goalDir) c += TURN;
        if (goalDir === null && horiz) c += RAIL_RUN;
      }
      const ns = nn * 4 + nd;
      const ng = gc + c;
      if (ng < best[ns]!) { best[ns] = ng; prev[ns] = st; heap.push(ng + h(ii, jj), ns); }
    }
  }
  if (found < 0) return null;
  const path: number[] = [];
  for (let st = found; st >= 0; st = prev[st]!) path.push(st >> 2);
  return path.reverse();
}

function simplify(pts: [number, number][]): [number, number][] {
  const out: [number, number][] = [];
  for (const p of pts) {
    const last = out[out.length - 1];
    if (last && last[0] === p[0] && last[1] === p[1]) continue;
    const prev = out[out.length - 2];
    if (last && prev && ((prev[0] === last[0] && last[0] === p[0]) || (prev[1] === last[1] && last[1] === p[1]))) out[out.length - 1] = p;
    else out.push(p);
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------

export function layoutCircuit(input: CircuitInput, getComponent: (id: string) => ComponentDef): Layout {
  const boardDef = getComponent(input.board);
  const insts = [{ id: "board", component: input.board, label: undefined as string | undefined }, ...input.instances.filter((i) => i.id !== "board")];
  const defs = new Map<string, ComponentDef>();
  for (const inst of insts) {
    const def = inst.id === "board" ? boardDef : getComponent(inst.component);
    if (def.kind !== "mechanical") defs.set(inst.id, def);
  }
  const conns = input.connections.filter((c) => defs.has(parseEnd(c.from)[0]) && defs.has(parseEnd(c.to)[0]));
  const pinDef = (end: string): PinDef => {
    const [iid, pid] = parseEnd(end);
    const p = defs.get(iid)?.pins.find((q) => q.id === pid);
    if (!p) throw new Error(`Unknown pin "${end}"`);
    return p;
  };
  conns.forEach((c) => { pinDef(c.from); pinDef(c.to); });

  // Board placement at the origin; its pins tell where each module should sit.
  const bw = boardDef.draw.w * UNIT, bh = boardDef.draw.h * UNIT;
  const boardPins = localPins(boardDef);
  const boardPin = (pid: string) => boardPins.find((p) => p.id === pid)!;

  // Neighbours (instance graph) for passives: nearest board pin within 3 hops.
  const adj = new Map<string, { other: string; boardPin?: string }[]>();
  for (const c of conns) {
    const [a, ap] = parseEnd(c.from), [b, bp] = parseEnd(c.to);
    if (!adj.has(a)) adj.set(a, []); if (!adj.has(b)) adj.set(b, []);
    adj.get(a)!.push({ other: b, boardPin: b === "board" ? bp : undefined });
    adj.get(b)!.push({ other: a, boardPin: a === "board" ? ap : undefined });
  }
  const boardPinsOf = (id: string): LayoutPin[] => (adj.get(id) ?? []).filter((e) => e.boardPin).map((e) => boardPin(e.boardPin!));
  const nearestBoardPins = (id: string): LayoutPin[] => {
    const seen = new Set([id]); let frontier = [id];
    for (let depth = 0; depth < 4 && frontier.length; depth++) {
      const hit = frontier.flatMap(boardPinsOf).filter((p) => p.role !== "gnd" && p.role !== "source");
      if (hit.length) return hit;
      const next: string[] = [];
      for (const f of frontier) for (const e of adj.get(f) ?? []) if (!seen.has(e.other) && e.other !== "board") { seen.add(e.other); next.push(e.other); }
      frontier = next;
    }
    return frontier.length ? [] : boardPinsOf(id);
  };

  const placed: Placed[] = [];
  placed.push({ id: "board", def: boardDef, label: boardDef.name, rot: 0, w: bw, h: bh, x: 0, y: 0, group: "board", pins: boardPins });

  const groups: Record<Exclude<Group, "board">, Placed[]> = { top: [], right: [], far: [], left: [], bottom: [], power: [] };
  const anchor = new Map<string, number>();
  for (const inst of insts) {
    if (inst.id === "board") continue;
    const def = defs.get(inst.id); if (!def) continue;
    let group: Exclude<Group, "board">;
    const sig = nearestBoardPins(inst.id);
    const all = sig.length ? sig : boardPinsOf(inst.id);
    if (def.kind === "passive") {
      const counts: Record<Side, number> = { top: 0, right: 0, bottom: 0, left: 0 };
      for (const p of all) counts[p.side]++;
      const side = SIDES.reduce((a, b) => (counts[b] > counts[a] ? b : a), all[0]?.side ?? "bottom");
      group = side;
    } else {
      group = groupOf(def);
      // Loads driven only by another module (motors behind a driver) go one column further out.
      if (group === "right" && !boardPinsOf(inst.id).length && (adj.get(inst.id) ?? []).some((e) => { const d = defs.get(e.other); return d !== undefined && d.kind === "module" && groupOf(d) === "right"; })) group = "far";
    }
    // Orientation: the side carrying most connected pins faces the board.
    const used = new Set(conns.flatMap((c) => [c.from, c.to]).filter((e) => parseEnd(e)[0] === inst.id).map((e) => parseEnd(e)[1]));
    const score: Record<Side, number> = { top: 0, right: 0, bottom: 0, left: 0 };
    const toBoard = new Set(boardPinsOf(inst.id).length ? conns.flatMap((c) => [[c.from, c.to], [c.to, c.from]]).filter(([a, b]) => parseEnd(a!)[0] === inst.id && parseEnd(b!)[0] === "board").map(([a]) => parseEnd(a!)[1]) : []);
    for (const p of def.pins) score[p.side] += toBoard.has(p.id) ? 100 : used.has(p.id) ? 10 : 1;
    const main = SIDES.reduce((a, b) => (score[b] > score[a] ? b : a), "top" as Side);
    // Two-terminal passives with pins on opposite sides lie parallel to the board edge.
    const sidesUsed = new Set(def.pins.map((p) => p.side));
    const axial = def.kind === "passive" && sidesUsed.size === 2 && (sidesUsed.has("left") ? sidesUsed.has("right") : sidesUsed.has("top") && sidesUsed.has("bottom"));
    const target: Side = axial ? (FACING[group] === "top" || FACING[group] === "bottom" ? "left" : "top") : FACING[group];
    const from: Side = axial ? (sidesUsed.has("left") ? "left" : "top") : main;
    let rot = 0; for (let s = from; s !== target; s = CW[s]) rot++;
    const r = rotatePins(localPins(def), def.draw.w * UNIT, def.draw.h * UNIT, rot);
    const horizontal = group === "top" || group === "bottom" || group === "power";
    const a = all.length ? all.reduce((t, p) => t + (horizontal ? p.x : p.y), 0) / all.length : horizontal ? bw / 2 : bh / 2;
    anchor.set(inst.id, a);
    groups[group].push({ id: inst.id, def, label: inst.label ?? def.name, rot: rot as 0 | 1 | 2 | 3, w: r.w, h: r.h, x: 0, y: 0, group, pins: r.pins });
  }

  const wiresTo = (list: Placed[]) => conns.filter((c) => list.some((p) => p.id === parseEnd(c.from)[0] || p.id === parseEnd(c.to)[0])).length;
  const gapFor = (list: Placed[]) => snap(Math.max(GAP + 24, 48 + wiresTo(list) * 10));
  const byAnchor = (a: Placed, b: Placed) => anchor.get(a.id)! - anchor.get(b.id)! || insts.findIndex((i) => i.id === a.id) - insts.findIndex((i) => i.id === b.id);
  const NEIGH = GAP + 24;

  const rowX = (list: Placed[], y: (p: Placed) => number) => {
    let cursor = -Infinity;
    for (const p of [...list].sort(byAnchor)) {
      p.x = snap(Math.max(anchor.get(p.id)! - p.w / 2, cursor));
      p.y = snap(y(p));
      cursor = p.x + p.w + NEIGH;
    }
  };
  const colY = (list: Placed[], x: (p: Placed) => number, minY = -Infinity) => {
    let cursor = minY;
    for (const p of [...list].sort(byAnchor)) {
      p.y = snap(Math.max(anchor.get(p.id)! - p.h / 2, cursor));
      p.x = snap(x(p));
      cursor = p.y + p.h + NEIGH;
    }
  };
  const gT = gapFor(groups.top), gR = gapFor(groups.right), gL = gapFor(groups.left), gB = gapFor(groups.bottom);
  rowX(groups.top, (p) => -gT - p.h);
  colY(groups.right, () => bw + gR, -gT + GAP);
  colY(groups.left, (p) => -gL - p.w, -gT + GAP);
  rowX(groups.bottom, () => bh + gB);
  {
    const rightEdge = Math.max(bw + gR, ...groups.right.map((p) => p.x + p.w));
    const gF = gapFor(groups.far);
    for (const p of groups.far) {
      const ys: number[] = [];
      for (const e of adj.get(p.id) ?? []) {
        const q = groups.right.find((r) => r.id === e.other); if (!q) continue;
        for (const c of conns) for (const [a, b] of [[c.from, c.to], [c.to, c.from]] as const)
          if (parseEnd(a)[0] === p.id && parseEnd(b)[0] === q.id) { const pin = q.pins.find((z) => z.id === parseEnd(b)[1]); if (pin) ys.push(q.y + pin.y); }
      }
      anchor.set(p.id, ys.length ? ys.reduce((t, v) => t + v, 0) / ys.length : bh / 2);
    }
    colY(groups.far, () => rightEdge + gF, -gT + GAP);
  }
  const rightBottom = Math.max(bh, ...groups.right.map((p) => p.y + p.h), ...groups.far.map((p) => p.y + p.h), ...groups.bottom.map((p) => p.y + p.h));
  const gP = gapFor(groups.power);
  {
    let cursor = bw + gR;
    for (const p of groups.power) { p.x = snap(cursor); p.y = snap(rightBottom + gP); cursor = p.x + p.w + NEIGH; }
  }

  // Resolve any remaining overlaps by pushing parts away from the board.
  const push: Record<Group, [number, number]> = { board: [0, 0], top: [0, -1], right: [0, 1], far: [0, 1], left: [0, 1], bottom: [0, 1], power: [1, 0] };
  const overlaps = (a: Placed, b: Placed) => a.x < b.x + b.w + GAP && b.x < a.x + a.w + GAP && a.y < b.y + b.h + GAP && b.y < a.y + a.h + GAP;
  for (const g of ["top", "right", "far", "left", "bottom", "power"] as const) {
    for (const p of groups[g]) {
      let guard = 0;
      while (placed.some((q) => overlaps(p, q)) && guard++ < 500) { p.x += push[g][0] * UNIT; p.y += push[g][1] * UNIT; }
      placed.push(p);
    }
  }

  // Pin coordinates in layout space.
  const pinAbs = new Map<string, LayoutPin>();
  for (const p of placed) for (const q of p.pins) pinAbs.set(`${p.id}.${q.id}`, { ...q, x: q.x + p.x, y: q.y + p.y });

  // Power / ground rails.
  const roleOf = (end: string) => pinDef(end).role;
  const gndCount = conns.filter((c) => roleOf(c.from) === "gnd" || roleOf(c.to) === "gnd").length;
  const useRails = gndCount >= 3;
  type Task = { id: string; from: string; to: string; color: string; note?: LayoutNote; rail?: "gnd" | "power" };
  const tasks: Task[] = [];
  const rails: LayoutRail[] = [];
  let railVolts: number | undefined;
  let powerPin: string | undefined;
  if (useRails) {
    const tally = new Map<string, number>();
    for (const c of conns) for (const [a, b] of [[c.from, c.to], [c.to, c.from]] as const) {
      if (parseEnd(a)[0] === "board" && parseEnd(b)[0] !== "board" && roleOf(a) === "source") tally.set(a, (tally.get(a) ?? 0) + 1);
    }
    powerPin = [...tally.entries()].sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0]))[0]?.[0];
    railVolts = powerPin ? pinDef(powerPin).volts ?? 5 : undefined;
  }
  let boardGnd: string | undefined;
  conns.forEach((c, idx) => {
    const base = { color: c.color, note: c.note };
    if (useRails && roleOf(c.from) === "gnd" && roleOf(c.to) === "gnd") {
      let k = 0;
      for (const e of [c.from, c.to]) {
        if (parseEnd(e)[0] === "board") { boardGnd ??= e; continue; }
        tasks.push({ id: `w${idx}${k++ ? "b" : ""}`, from: e, to: "rail.GND", rail: "gnd", ...base });
      }
      return;
    }
    if (useRails && powerPin && (c.from === powerPin || c.to === powerPin)) {
      const other = c.from === powerPin ? c.to : c.from;
      if (parseEnd(other)[0] !== "board") { tasks.push({ id: `w${idx}`, from: other, to: `rail.${railVolts === 3.3 ? "3V3" : "5V"}`, rail: "power", ...base }); return; }
    }
    tasks.push({ id: `w${idx}`, from: c.from, to: c.to, ...base });
  });
  if (useRails) {
    if (!boardGnd) { const g = boardDef.pins.find((p) => p.role === "gnd"); if (g) boardGnd = `board.${g.id}`; }
    if (boardGnd) tasks.push({ id: "rail-gnd", from: boardGnd, to: "rail.GND", color: "black", rail: "gnd" });
    if (powerPin) tasks.push({ id: "rail-power", from: powerPin, to: `rail.${railVolts === 3.3 ? "3V3" : "5V"}`, color: "red", rail: "power" });
  }

  // Bounds & normalisation.
  let minX = Math.min(...placed.map((p) => p.x)), minY = Math.min(...placed.map((p) => p.y));
  let maxX = Math.max(...placed.map((p) => p.x + p.w)), maxY = Math.max(...placed.map((p) => p.y + p.h));
  const railTasks = tasks.filter((t) => t.rail).length;
  let powerY = 0, gndY = 0;
  if (useRails) {
    powerY = maxY + snap(Math.max(48, 24 + railTasks * 6));
    gndY = powerY + 24;
    maxY = gndY + 12;
  }
  minX -= MARGIN; minY -= MARGIN; maxX += MARGIN; maxY += MARGIN - (useRails ? 36 : 0);
  minX = Math.floor(minX / UNIT) * UNIT; minY = Math.floor(minY / UNIT) * UNIT;
  const ox = -minX, oy = -minY;
  const width = Math.ceil((maxX + ox) / UNIT) * UNIT, height = Math.ceil((maxY + oy) / UNIT) * UNIT;
  for (const p of placed) { p.x += ox; p.y += oy; }
  for (const [k, v] of pinAbs) pinAbs.set(k, { ...v, x: v.x + ox, y: v.y + oy });
  if (useRails) {
    const x1 = 24, x2 = width - 24;
    if (powerPin) rails.push({ id: "power", kind: "power", label: railVolts === 3.3 ? "3V3" : "5V", volts: railVolts, y: powerY + oy, x1, x2, color: "#E53935" });
    rails.push({ id: "gnd", kind: "gnd", label: "GND", y: gndY + oy, x1, x2, color: "#1E5AA8" });
  }

  // Routing grid.
  const ni = width / STEP + 1, nj = height / STEP + 1;
  const grid: Grid = { ni, nj, blocked: new Uint8Array(ni * nj), occH: new Uint16Array(ni * nj), occV: new Uint16Array(ni * nj), railRow: new Uint8Array(nj) };
  for (const p of placed) {
    const i0 = Math.max(0, Math.floor((p.x - STEP) / STEP)), i1 = Math.min(ni - 1, Math.ceil((p.x + p.w + STEP) / STEP));
    const j0 = Math.max(0, Math.floor((p.y - STEP) / STEP)), j1 = Math.min(nj - 1, Math.ceil((p.y + p.h + STEP) / STEP));
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) grid.blocked[j * ni + i] = 1;
  }
  for (const r of rails) grid.railRow[r.y / STEP] = 1;
  const stubOf = (end: string): { pin: LayoutPin; stub: [number, number]; dir: number } => {
    const pin = pinAbs.get(end)!;
    const [dx, dy] = OUT[pin.side];
    const ext = PIN_INSET + STUB;
    return { pin, stub: [pin.x + dx * ext, pin.y + dy * ext], dir: dirOf(pin.side) };
  };
  const usedEnds = new Set(tasks.flatMap((t) => [t.from, t.to]).filter((e) => !e.startsWith("rail.")));
  const stubNode = (s: [number, number]) => (s[1] / STEP) * ni + s[0] / STEP;
  for (const e of usedEnds) grid.blocked[stubNode(stubOf(e).stub)] = 1;

  const dist = (t: Task) => {
    const a = stubOf(t.from).stub;
    if (t.rail) return Math.abs((t.rail === "gnd" ? gndY + oy : powerY + oy) - a[1]);
    const b = stubOf(t.to).stub; return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  };
  const order = tasks.map((t, i) => ({ t, i, d: dist(t) })).sort((a, b) => a.d - b.d || a.i - b.i);
  const railTaken = new Set<number>();
  const routed = new Map<string, [number, number][]>();
  for (const { t } of order) {
    const A = stubOf(t.from);
    const sNode = stubNode(A.stub);
    grid.blocked[sNode] = 0;
    let pts: [number, number][];
    let path: number[] | null;
    if (t.rail) {
      const ry = (t.rail === "gnd" ? gndY : powerY) + oy;
      const row = ry / STEP; const goals = new Set<number>();
      for (let i = Math.ceil((24 + 12) / STEP); i <= Math.floor((width - 96) / STEP); i++) { const n = row * ni + i; if (!railTaken.has(n) && !railTaken.has(n - 1) && !railTaken.has(n + 1)) goals.add(n); }
      path = route(grid, [A.stub[0] / STEP, A.stub[1] / STEP], A.dir, goals, null, row);
      if (path) railTaken.add(path[path.length - 1]!);
      const end = path ? path[path.length - 1]! : row * ni + A.stub[0] / STEP;
      pts = path
        ? [[A.pin.x, A.pin.y], ...path.map((n) => [(n % ni) * STEP, Math.floor(n / ni) * STEP] as [number, number])]
        : [[A.pin.x, A.pin.y], A.stub, [A.stub[0], ry], [(end % ni) * STEP, ry]];
    } else {
      const B = stubOf(t.to);
      const gNode = stubNode(B.stub);
      grid.blocked[gNode] = 0;
      path = route(grid, [A.stub[0] / STEP, A.stub[1] / STEP], A.dir, new Set([gNode]), (B.dir + 2) & 3, null);
      grid.blocked[gNode] = 1;
      const mid: [number, number][] = path ? path.map((n) => [(n % ni) * STEP, Math.floor(n / ni) * STEP]) : [A.stub, [B.stub[0], A.stub[1]], B.stub];
      pts = [[A.pin.x, A.pin.y], ...mid, [B.pin.x, B.pin.y]];
    }
    grid.blocked[sNode] = 1;
    // Occupancy for subsequent wires (lattice nodes only, stubs excluded).
    if (path) for (let k = 0; k + 1 < path.length; k++) {
      const a = path[k]!, b = path[k + 1]!;
      const arr = Math.abs(a - b) === 1 ? grid.occH : grid.occV;
      arr[a] = arr[a]! + 1; arr[b] = arr[b]! + 1;
    }
    routed.set(t.id, simplify(pts));
  }

  const components: LayoutComponent[] = placed.map((p) => ({
    id: p.id, x: p.x, y: p.y, w: p.w, h: p.h, def: p.def, label: p.label, rotation: p.rot,
    pins: p.pins.map((q) => ({ ...q, x: q.x + p.x, y: q.y + p.y })),
  }));
  const wires: LayoutWire[] = tasks.map((t) => {
    const w: LayoutWire = { id: t.id, color: t.color, points: routed.get(t.id)!, from: t.from, to: t.to };
    if (t.note !== undefined) w.note = t.note;
    return w;
  });
  return { width, height, components, wires, rails };
}
