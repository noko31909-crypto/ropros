import { modelBox, type Box } from "./models.ts";
import type { Cad, CadPart, CadShape } from "./schema.ts";

/**
 * Geometry checks on a generated 3D model: where each part really sits, whether bought parts collide, and the
 * overall size of the printed parts. Rotations are applied exactly for quarter turns (all the layout uses);
 * anything else is treated conservatively with the part's bounding sphere.
 */

type V3 = [number, number, number];
const corners = (b: Box): V3[] => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [i & 1 ? b.max[0] : b.min[0], i & 2 ? b.max[1] : b.min[1], i & 4 ? b.max[2] : b.min[2]]);

function rotate(p: V3, r: readonly number[] | undefined): V3 {
  if (!r) return p;
  let [x, y, z] = p;
  const [ax, ay, az] = r.map((d) => (d * Math.PI) / 180) as V3;
  [y, z] = [y * Math.cos(ax) - z * Math.sin(ax), y * Math.sin(ax) + z * Math.cos(ax)];
  [x, z] = [x * Math.cos(ay) + z * Math.sin(ay), -x * Math.sin(ay) + z * Math.cos(ay)];
  [x, y] = [x * Math.cos(az) - y * Math.sin(az), x * Math.sin(az) + y * Math.cos(az)];
  return [x, y, z];
}

function bounds(points: V3[]): Box {
  return {
    min: [0, 1, 2].map((k) => Math.min(...points.map((p) => p[k]!))) as V3,
    max: [0, 1, 2].map((k) => Math.max(...points.map((p) => p[k]!))) as V3,
  };
}

/** Where a bought part sits in the assembly. */
export function partBox(part: CadPart): Box | undefined {
  if (!part.component) return undefined;
  const at = part.at ?? [0, 0, 0];
  return bounds(corners(modelBox(part.component)).map((c) => { const q = rotate(c, part.rotate); return [q[0] + at[0], q[1] + at[1], q[2] + at[2]]; }));
}

function shapeBox(s: CadShape): Box {
  const half: V3 = s.type === "box" ? [s.size[0] / 2, s.size[1] / 2, s.size[2] / 2] : [s.r, s.r, s.h / 2];
  const local: Box = { min: [-half[0], -half[1], -half[2]], max: half };
  return bounds(corners(local).map((c) => { const q = rotate(c, s.rotate); return [q[0] + s.at[0], q[1] + s.at[1], q[2] + s.at[2]]; }));
}

/** Overall size (W x D x H, mm) of the printed parts, holes ignored. */
export function printedSize(cad: Cad): V3 | undefined {
  const boxes = cad.parts.filter((p) => p.printed && p.shapes).flatMap((p) => p.shapes!.filter((s) => !s.subtract).map(shapeBox));
  if (!boxes.length) return undefined;
  const b = bounds(boxes.flatMap(corners));
  return [0, 1, 2].map((k) => Math.round(b.max[k]! - b.min[k]!)) as V3;
}

const overlap = (a: Box, b: Box, tol: number) => [0, 1, 2].every((k) => Math.min(a.max[k]!, b.max[k]!) - Math.max(a.min[k]!, b.min[k]!) > tol);

/** Pairs of bought parts that occupy the same space (more than `tol` mm on every axis). */
export function collisions(cad: Cad, tol = 0.5): [string, string][] {
  // A chassis kit is a frame the other parts sit on and in, not a solid block: leave it out.
  const placed = cad.parts.flatMap((p) => { const b = p.component?.startsWith("robot-chassis") ? undefined : partBox(p); return b ? [{ name: p.name, b }] : []; });
  const out: [string, string][] = [];
  for (let i = 0; i < placed.length; i++) for (let j = i + 1; j < placed.length; j++) {
    if (overlap(placed[i]!.b, placed[j]!.b, tol)) out.push([placed[i]!.name, placed[j]!.name]);
  }
  return out;
}
