import type { CadPart, Project } from "./schema.ts";

/**
 * Small mechanical fixes after validation. Models often place TT gear motors but forget the wheels, which
 * makes a robot look like a board with motors glued on. When a project has dc-motor parts and nothing that
 * looks like a wheel or a ready chassis, a wheel goes on the outer end of each motor shaft, plus a caster.
 */

const WHEEL_WORDS = /wheel|tire|tyre|колес|колёс|шин|дөңгел/i;
const HAS_WHEELS = new Set(["robot-chassis-2wd", "robot-chassis-4wd", "mecanum-wheels"]);
// TT motor (lib/build/models.ts): output shaft along local Y at x = 22, z = 9.4; gearbox 22.5 mm wide.
const SHAFT_X = 22, SHAFT_Z = 9.4, GEARBOX_HALF = 11.25;
const WHEEL_R = 33, WHEEL_W = 26;

const rotZ = (x: number, y: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
};

export function addMissingWheels(p: Project): Project {
  const parts = p.cad.parts;
  const motors = parts.filter((c) => c.component === "dc-motor" && c.at && !(c.rotate?.[0] || c.rotate?.[1]));
  if (!motors.length) return p;
  if (parts.some((c) => (c.component && HAS_WHEELS.has(c.component)) || WHEEL_WORDS.test(c.name))) return p;

  const placed = parts.filter((c) => c.at);
  const cx = placed.reduce((s, c) => s + c.at![0], 0) / placed.length;
  const cy = placed.reduce((s, c) => s + c.at![1], 0) / placed.length;

  const wheels: CadPart[] = motors.map((m, i) => {
    const rz = m.rotate?.[2] ?? 0;
    const off = GEARBOX_HALF + 2 + WHEEL_W / 2;
    const ends = [off, -off].map((y) => { const [dx, dy] = rotZ(SHAFT_X, y, rz); return [m.at![0] + dx, m.at![1] + dy] as const; });
    const [x, y] = ends.sort((a, b) => Math.hypot(b[0] - cx, b[1] - cy) - Math.hypot(a[0] - cx, a[1] - cy))[0]!;
    return {
      name: `Wheel ${i + 1}`, color: "#1b1d21", printed: false, ...(m.step ? { step: m.step } : {}),
      shapes: [
        { type: "cylinder", r: WHEEL_R, h: WHEEL_W, at: [x, y, m.at![2] + SHAFT_Z], rotate: [90, 0, rz] },
        { type: "cylinder", r: 20, h: WHEEL_W + 1, at: [x, y, m.at![2] + SHAFT_Z], rotate: [90, 0, rz] },
      ],
    };
  });

  // A caster on the far side from the wheels keeps a two-wheel robot level.
  const extra: CadPart[] = [];
  if (motors.length === 2) {
    const wx = motors.reduce((s, m) => s + m.at![0], 0) / 2, wy = motors.reduce((s, m) => s + m.at![1], 0) / 2;
    let dx = cx - wx, dy = cy - wy;
    const len = Math.hypot(dx, dy);
    const [ax, ay] = len > 5 ? [dx / len, dy / len] : rotZ(-1, 0, motors[0]!.rotate?.[2] ?? 0);
    dx = ax; dy = ay;
    const reach = Math.max(60, ...placed.map((c) => (c.at![0] - wx) * dx + (c.at![1] - wy) * dy)) * 0.85;
    const groundZ = Math.min(...motors.map((m) => m.at![2] + SHAFT_Z - WHEEL_R));
    const topZ = Math.max(...motors.map((m) => m.at![2]));
    const h = Math.max(4, topZ - groundZ);
    extra.push({
      name: "Ball caster", color: "#c9cdd2", printed: false, ...(motors[0]!.step ? { step: motors[0]!.step } : {}),
      shapes: [{ type: "cylinder", r: 7, h, at: [wx + dx * reach, wy + dy * reach, groundZ + h / 2] }],
    });
  }
  return { ...p, cad: { parts: [...parts, ...wheels, ...extra].slice(0, 16) } };
}
