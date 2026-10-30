import { isComponentId } from "../hardware/ids.ts";
import { WIRE_COLORS } from "../content/schema.ts";

/**
 * Tidies a model's raw JSON into the shape ProjectSchema expects before it is validated, so one small slip
 * (an extra field, "C++" instead of "cpp", a number as a string, a too-long sentence, one bad wire) does not
 * throw away the whole project. It only reshapes and trims; ProjectSchema still validates the result strictly.
 */
type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const objs = (v: unknown): Obj[] => arr(v).filter(isObj);

function str(v: unknown, max: number): string | undefined {
  if (typeof v === "number" && Number.isFinite(v)) v = String(v);
  if (typeof v !== "string") return undefined;
  const s = v.trim().replace(/\s+\n/g, "\n");
  if (!s) return undefined;
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

function num(v: unknown): number | undefined {
  const n = typeof v === "string" ? Number.parseFloat(v.replace(",", ".")) : v;
  return typeof n === "number" && Number.isFinite(n) ? n : undefined;
}
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function vec3(v: unknown, lo: number, hi: number, fallback?: number): [number, number, number] | undefined {
  const a = arr(v).map(num);
  if (a.length !== 3 || a.some((x) => x === undefined)) return fallback === undefined ? undefined : [fallback, fallback, fallback];
  return a.map((x) => clamp(x!, lo, hi)) as [number, number, number];
}

const lower = (v: unknown) => (typeof v === "string" ? v.trim().toLowerCase() : "");

function platform(v: unknown, board: string): string {
  const s = lower(v).replace(/[\s-]+/g, "_");
  if (s.includes("esp")) return "esp32";
  if (s.includes("rasp") || s === "pi" || s === "rpi" || s.includes("pico")) return "raspberry_pi";
  if (s.includes("arduino")) return "arduino";
  if (board.startsWith("esp")) return "esp32";
  if (board.startsWith("raspberry")) return "raspberry_pi";
  return "arduino";
}

function difficulty(v: unknown): string {
  const s = lower(v);
  if (s.startsWith("adv") || s.includes("hard") || s.includes("expert")) return "advanced";
  if (s.startsWith("inter") || s.includes("medium")) return "intermediate";
  return "beginner";
}

function language(v: unknown, filename: string): "cpp" | "python" | "bash" {
  const s = `${lower(v)} ${filename.toLowerCase()}`;
  if (/python|\.py\b|micropython/.test(s)) return "python";
  if (/bash|shell|\.sh\b/.test(s)) return "bash";
  return "cpp";
}

const WIRES = new Set<string>(WIRE_COLORS);
const component = (v: unknown) => { const s = lower(v); return isComponentId(s) ? s : undefined; };

function shape(s: Obj): Obj | undefined {
  const at = vec3(s.at ?? s.position ?? s.center, -500, 500, 0)!;
  const rotate = vec3(s.rotate ?? s.rotation, -360, 360);
  const extra = { at, ...(rotate && rotate.some((d) => d !== 0) ? { rotate } : {}), ...(s.subtract === true || s.hole === true ? { subtract: true } : {}) };
  const type = lower(s.type);
  if (type === "box" || type === "cube") {
    const size = vec3(s.size ?? s.dimensions, 0.2, 400);
    const radius = num(s.radius ?? s.r);
    return size ? { type: "box", size, ...extra, ...(radius && radius > 0 ? { radius: clamp(radius, 0, 100) } : {}) } : undefined;
  }
  if (type === "cylinder" || type === "hole") {
    const r = num(s.r ?? s.radius) ?? (num(s.d ?? s.diameter) ?? NaN) / 2;
    const h = num(s.h ?? s.height);
    if (!Number.isFinite(r) || h === undefined) return undefined;
    return { type: "cylinder", r: clamp(r, 0.2, 200), h: clamp(h, 0.2, 400), ...extra, ...(type === "hole" ? { subtract: true } : {}) };
  }
  return undefined;
}

export function normalizeProject(raw: unknown): unknown {
  if (!isObj(raw)) return raw;
  const p = isObj(raw.project) ? raw.project : raw; // some models wrap the answer in { "project": ... }
  const board = component(p.board) ?? "arduino-uno";

  const instances = objs(p.instances).flatMap((i) => {
    const comp = component(i.component);
    const id = typeof i.id === "string" ? i.id.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 24) : "";
    if (!comp || !/^[a-z]/.test(id) || id === "board") return [];
    const label = str(i.label, 24);
    return [{ id, component: comp, ...(label ? { label } : {}) }];
  }).slice(0, 24);

  const connections = objs(p.connections ?? p.wiring).flatMap((c) => {
    const from = typeof c.from === "string" ? c.from.trim() : "", to = typeof c.to === "string" ? c.to.trim() : "";
    if (!from.includes(".") || !to.includes(".")) return [];
    const end = (e: string) => { const i = e.indexOf("."); return `${e.slice(0, i).toLowerCase()}${e.slice(i)}`; };
    const color = WIRES.has(lower(c.color)) ? lower(c.color) : "yellow";
    const note = str(c.note, 160);
    return [{ from: end(from), to: end(to), color, ...(note ? { note } : {}) }];
  }).slice(0, 60);

  const parts = objs(p.parts).flatMap((x) => {
    const comp = component(x.component ?? x.id);
    const name = str(x.name, 80) ?? comp;
    if (!name) return [];
    return [{ ...(comp ? { component: comp } : {}), name, qty: Math.round(clamp(num(x.qty ?? x.quantity) ?? 1, 1, 200)), spec: str(x.spec ?? x.description, 140) ?? "-" }];
  }).slice(0, 40);
  if (!parts.some((x) => x.component === board)) parts.unshift({ component: board, name: board, qty: 1, spec: "-" });

  const plan = objs(p.plan).flatMap((ph) => {
    const phase = str(ph.phase ?? ph.title ?? ph.name, 80);
    const tasks = arr(ph.tasks ?? ph.steps).map((t) => str(isObj(t) ? t.title ?? t.text : t, 200)).filter((t): t is string => Boolean(t)).slice(0, 8);
    return phase && tasks.length ? [{ phase, tasks }] : [];
  }).slice(0, 8);

  const assembly = objs(p.assembly ?? p.steps).flatMap((s) => {
    const title = str(s.title ?? s.name, 90), body = str(s.body ?? s.text ?? s.description, 900);
    return title && body ? [{ title, body }] : [];
  }).slice(0, 16);

  const code = objs(p.code).flatMap((f, i) => {
    const source = typeof f.source === "string" ? f.source.replace(/^```\w*\n?|```\s*$/g, "").slice(0, 24_000) : (typeof f.code === "string" ? f.code.slice(0, 24_000) : "");
    if (source.trim().length < 20) return [];
    const lang = language(f.language, typeof f.filename === "string" ? f.filename : "");
    const ext = lang === "python" ? "py" : lang === "bash" ? "sh" : "ino";
    const filename = typeof f.filename === "string" && /^[A-Za-z0-9_.-]{1,40}$/.test(f.filename.trim()) ? f.filename.trim() : `main${i ? i + 1 : ""}.${ext}`;
    const libraries = arr(f.libraries).map((l) => str(l, 80)).filter((l): l is string => Boolean(l)).slice(0, 12);
    return [{ filename, language: lang, source, libraries }];
  }).slice(0, 4);

  const cadRaw = isObj(p.cad) ? p.cad : {};
  const cadParts = objs(cadRaw.parts).flatMap((cp, i): Obj[] => {
    const color = typeof cp.color === "string" && /^#[0-9a-fA-F]{6}$/.test(cp.color.trim()) ? cp.color.trim() : ["#FF7A1A", "#2EE6C9", "#8B95A5", "#3A7BD5"][i % 4]!;
    const stepNo = num(cp.step);
    const common = { color, ...(stepNo !== undefined ? { step: Math.round(clamp(stepNo, 1, 16)) } : {}) };
    const comp = component(cp.component);
    if (comp) {
      const rotate = vec3(cp.rotate ?? cp.rotation, -360, 360);
      return [{ name: str(cp.name, 60) ?? comp, printed: false, component: comp, at: vec3(cp.at ?? cp.position, -500, 500, 0)!,
        ...(rotate && rotate.some((d) => d !== 0) ? { rotate } : {}), ...common }];
    }
    const shapes = objs(cp.shapes).map(shape).filter((s): s is Obj => Boolean(s)).slice(0, 40);
    if (!shapes.length) return [];
    return [{ name: str(cp.name, 60) ?? `Part ${i + 1}`, printed: cp.printed !== false, shapes, ...common }];
  }).slice(0, 16);

  return {
    title: str(p.title ?? p.name, 90),
    summary: str(p.summary ?? p.description, 400),
    platform: platform(p.platform, board),
    board,
    difficulty: difficulty(p.difficulty),
    hours: clamp(num(p.hours ?? p.buildHours) ?? 3, 0.5, 80),
    costUsd: clamp(num(p.costUsd ?? p.cost) ?? 20, 1, 1000),
    parts, plan, instances, connections, assembly, code,
    // No usable CAD at all: a plain base plate with M3 corner holes, so the rest of the project is not lost.
    cad: { parts: cadParts.length ? cadParts : [{ name: "Base plate", color: "#FF7A1A", printed: true, shapes: [
      { type: "box", size: [100, 70, 3], at: [0, 0, 1.5] },
      ...[[-44, -29], [44, -29], [-44, 29], [44, 29]].map(([x, y]) => ({ type: "cylinder", r: 1.6, h: 8, at: [x, y, 1.5], subtract: true })),
    ] }] },
    safety: arr(p.safety).map((s) => str(s, 300)).filter((s): s is string => Boolean(s)).slice(0, 6),
  };
}
