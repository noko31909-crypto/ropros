"use client";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";
import { ADDITION, Brush, Evaluator, SUBTRACTION } from "three-bvh-csg";
import type { Cad, CadPart, CadShape } from "@/lib/build/schema";
import { partModel, type Finish, type Prim } from "@/lib/build/models";

/**
 * three.js scene for a generated project (Z up, millimetres). Printed parts are real solids with holes cut by
 * CSG; bought parts use the built-in models from lib/build/models.ts. Two modes share it: "orbit" (inspect)
 * and "assembly" (parts fly into place in assembly-step order).
 */

const deg = THREE.MathUtils.degToRad;
/** OpenSCAD's rotate([x, y, z]) turns about X, then Y, then Z: that is three.js Euler order "ZYX". */
const euler = (r?: readonly number[]) => new THREE.Euler(deg(r?.[0] ?? 0), deg(r?.[1] ?? 0), deg(r?.[2] ?? 0), "ZYX");

function material(color: string, finish?: Finish | "printed"): THREE.MeshStandardMaterial {
  const c = new THREE.Color(color);
  switch (finish) {
    case "metal": return new THREE.MeshStandardMaterial({ color: c, metalness: 0.85, roughness: 0.32 });
    case "glass": return new THREE.MeshStandardMaterial({ color: c, metalness: 0.1, roughness: 0.08, transparent: true, opacity: 0.72 });
    case "glossy": return new THREE.MeshStandardMaterial({ color: c, metalness: 0.05, roughness: 0.35 });
    case "rubber": return new THREE.MeshStandardMaterial({ color: c, metalness: 0, roughness: 0.95 });
    case "printed": return new THREE.MeshStandardMaterial({ color: c, metalness: 0, roughness: 0.62 });
    default: return new THREE.MeshStandardMaterial({ color: c, metalness: 0.05, roughness: 0.6 });
  }
}

function roundedBox(x: number, y: number, z: number, radius: number): THREE.BufferGeometry {
  const r = Math.min(radius, x / 2 - 0.01, y / 2 - 0.01);
  if (r <= 0.05) return new THREE.BoxGeometry(x, y, z);
  const s = new THREE.Shape();
  const hx = x / 2, hy = y / 2;
  s.moveTo(-hx + r, -hy);
  s.lineTo(hx - r, -hy); s.absarc(hx - r, -hy + r, r, -Math.PI / 2, 0, false);
  s.lineTo(hx, hy - r); s.absarc(hx - r, hy - r, r, 0, Math.PI / 2, false);
  s.lineTo(-hx + r, hy); s.absarc(-hx + r, hy - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(-hx, -hy + r); s.absarc(-hx + r, -hy + r, r, Math.PI, Math.PI * 1.5, false);
  const g = new THREE.ExtrudeGeometry(s, { depth: z, bevelEnabled: false, curveSegments: 10 });
  g.translate(0, 0, -z / 2);
  return g;
}

function cylinder(r: number, h: number, segments = 48): THREE.BufferGeometry {
  const g = new THREE.CylinderGeometry(r, r, h, segments);
  g.rotateX(Math.PI / 2); // three's cylinders run along Y; ours along Z
  return g;
}

/** Geometry of one shape in world space (non-indexed, as the CSG evaluator expects matching attributes). */
function shapeGeometry(s: CadShape): THREE.BufferGeometry {
  const g = s.type === "box" ? roundedBox(s.size[0], s.size[1], s.size[2], s.radius ?? 0) : cylinder(s.r, s.h);
  const m = new THREE.Matrix4().compose(new THREE.Vector3(...s.at), new THREE.Quaternion().setFromEuler(euler(s.rotate)), new THREE.Vector3(1, 1, 1));
  g.applyMatrix4(m);
  const flat = g.index ? g.toNonIndexed() : g;
  flat.deleteAttribute("uv");
  flat.computeVertexNormals();
  return flat;
}

function printedMesh(part: CadPart): THREE.Object3D {
  const mat = material(part.color, "printed");
  const shapes = part.shapes ?? [];
  const solids = shapes.filter((s) => !s.subtract), holes = shapes.filter((s) => s.subtract);
  const group = new THREE.Group();
  try {
    const evaluator = new Evaluator();
    evaluator.attributes = ["position", "normal"];
    evaluator.useGroups = false;
    const brush = (s: CadShape) => { const b = new Brush(shapeGeometry(s), mat); b.updateMatrixWorld(); return b; };
    let result = brush(solids[0]!);
    for (const s of solids.slice(1)) result = evaluator.evaluate(result, brush(s), ADDITION);
    for (const s of holes) result = evaluator.evaluate(result, brush(s), SUBTRACTION);
    const mesh = new THREE.Mesh(result.geometry, mat);
    mesh.userData.printed = true;
    group.add(mesh);
  } catch {
    // CSG failed on odd geometry: show the solids, with holes as dark inserts so their position is still visible.
    for (const s of solids) { const m = new THREE.Mesh(shapeGeometry(s), mat); m.userData.printed = true; group.add(m); }
    for (const s of holes) group.add(new THREE.Mesh(shapeGeometry(s), material("#0a0d12")));
  }
  return group;
}

function primMesh(p: Prim): THREE.Mesh {
  const g = p.type === "box" ? new THREE.BoxGeometry(...p.size) : p.type === "cylinder" ? cylinder(p.r, p.h, 32) : new THREE.SphereGeometry(p.r, 24, 16);
  const mesh = new THREE.Mesh(g, material(p.color, p.finish));
  mesh.position.set(...p.at);
  if (p.type !== "sphere" && p.rotate) mesh.rotation.copy(euler(p.rotate));
  return mesh;
}

function boughtMesh(part: CadPart): THREE.Object3D {
  const inner = new THREE.Group();
  for (const p of partModel(part.component!).prims) inner.add(primMesh(p));
  const outer = new THREE.Group();
  outer.add(inner);
  outer.position.set(...(part.at ?? [0, 0, 0]));
  outer.rotation.copy(euler(part.rotate));
  return outer;
}

export type ViewMode = "orbit" | "assembly";
export type View = {
  setVisible: (index: number, visible: boolean) => void;
  play: () => void;
  pause: () => void;
  restart: () => void;
  resetCamera: () => void;
  exportStl: () => ArrayBuffer;
  dispose: () => void;
};

type Slot = { index: number; object: THREE.Object3D; home: THREE.Vector3; offset: THREE.Vector3; step: number };
const FLY = 1.1, GAP = 0.35, HOLD = 2.6;
const VIEW_DIR = new THREE.Vector3(1.55, -2.1, 1.6).normalize();
const easeOut = (t: number) => 1 - (1 - t) ** 3;

/**
 * Builds the scene into `canvas` and starts rendering. `onStep` (assembly mode) reports the part currently
 * flying in, or -1 when the model is complete; `reducedMotion` starts the assembly paused on the finished model.
 */
export function createView(canvas: HTMLCanvasElement, cad: Cad, mode: ViewMode, opts: { onStep?: (partIndex: number) => void; reducedMotion?: boolean } = {}): View {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const slots: Slot[] = cad.parts.map((part, index) => {
    const object = part.component ? boughtMesh(part) : printedMesh(part);
    object.traverse((o) => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true; } });
    scene.add(object);
    return { index, object, home: object.position.clone(), offset: new THREE.Vector3(), step: part.step ?? index + 1 };
  });

  const bounds = new THREE.Box3().setFromObject(scene);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const radius = Math.max(size.length() / 2, 10);

  // Exploded offsets: away from the model centre, mostly upwards, so each part visibly drops into its place.
  for (const s of slots) {
    const c = new THREE.Box3().setFromObject(s.object).getCenter(new THREE.Vector3());
    const out = c.sub(center).setZ(0);
    if (out.length() < 1e-3) out.set(0.3, -0.3, 0);
    s.offset.copy(out.normalize().multiplyScalar(radius * 0.7)).add(new THREE.Vector3(0, 0, radius * 1.1));
  }
  const order = [...slots].sort((a, b) => a.step - b.step || a.index - b.index);

  // Light, floor, grid
  scene.add(new THREE.HemisphereLight(0xe8f0fa, 0x2a3442, 2.1));
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const sun = new THREE.DirectionalLight(0xffffff, 2.8);
  sun.position.copy(center).add(new THREE.Vector3(-radius * 1.4, -radius * 1.8, radius * 2.6));
  sun.target.position.copy(center);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera;
  sc.left = sc.bottom = -radius * 1.6; sc.right = sc.top = radius * 1.6; sc.near = 1; sc.far = radius * 8;
  sun.shadow.bias = -0.0015;
  sun.shadow.normalBias = radius * 0.006;
  scene.add(sun, sun.target);
  const fill = new THREE.DirectionalLight(0x9fd8ff, 0.9);
  fill.position.copy(center).add(new THREE.Vector3(radius * 2, radius, radius));
  scene.add(fill);
  const floorZ = bounds.min.z - 0.05;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(radius * 8, radius * 8), new THREE.ShadowMaterial({ opacity: 0.32 }));
  floor.position.set(center.x, center.y, floorZ);
  floor.receiveShadow = true;
  scene.add(floor);
  const step = Math.pow(10, Math.floor(Math.log10(radius))) || 10;
  const grid = new THREE.GridHelper(Math.ceil((radius * 6) / step) * step, Math.ceil((radius * 6) / step), 0x3a5068, 0x24364a);
  grid.rotation.x = Math.PI / 2;
  grid.position.set(center.x, center.y, floorZ - 0.02);
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.55;
  scene.add(grid);

  const camera = new THREE.PerspectiveCamera(35, 1, radius / 50, radius * 40);
  camera.up.set(0, 0, 1);
  const home = () => {
    // Frame the bounding sphere: flat builds are well inside it, so a little closer than a full fit reads best.
    const fit = radius / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (mode === "assembly" ? 1.05 : 0.92);
    camera.position.copy(center).addScaledVector(VIEW_DIR, fit);
    controls.target.copy(center);
    controls.update();
  };
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = radius * 0.6;
  controls.maxDistance = radius * 8;
  controls.autoRotate = mode === "assembly";
  controls.autoRotateSpeed = 0.9;
  home();

  // Assembly timeline
  let playing = mode === "assembly" && !opts.reducedMotion;
  let t = mode === "assembly" && !opts.reducedMotion ? 0 : Number.POSITIVE_INFINITY;
  let lastStep = -2;
  const total = order.length * (FLY + GAP) + HOLD;
  const placeAt = (time: number) => {
    let current = -1;
    order.forEach((s, k) => {
      const p = Math.min(1, Math.max(0, (time - k * (FLY + GAP)) / FLY));
      s.object.visible = s.object.userData.hidden !== true && p > 0;
      s.object.position.copy(s.home).addScaledVector(s.offset, 1 - easeOut(p));
      if (p > 0 && p < 1) current = s.index;
    });
    if (current !== lastStep) { lastStep = current; opts.onStep?.(current); }
  };
  if (mode === "assembly") placeAt(t);

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  const clock = new THREE.Clock();
  let frame = 0;
  const loop = () => {
    frame = requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.1);
    if (document.hidden) return;
    if (mode === "assembly" && playing) {
      t += dt;
      if (t > total) t = 0;
      placeAt(t);
    }
    controls.update();
    renderer.render(scene, camera);
  };
  loop();

  return {
    setVisible: (index, visible) => {
      const s = slots[index];
      if (!s) return;
      s.object.userData.hidden = !visible;
      s.object.visible = visible;
      if (mode === "assembly") placeAt(Math.min(t, total));
    },
    play: () => { if (t >= total) t = 0; playing = true; },
    pause: () => { playing = false; },
    restart: () => { t = 0; playing = true; placeAt(0); },
    resetCamera: home,
    exportStl: () => {
      const printed = new THREE.Group();
      for (const s of slots) {
        if (s.object.userData.hidden) continue;
        s.object.traverse((o) => { if (o instanceof THREE.Mesh && o.userData.printed) printed.add(new THREE.Mesh(o.geometry)); });
      }
      const view = new STLExporter().parse(printed, { binary: true }) as DataView;
      return view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength) as ArrayBuffer;
    },
    dispose: () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.LineSegments) {
          o.geometry.dispose();
          for (const m of Array.isArray(o.material) ? o.material : [o.material]) m.dispose();
        }
      });
      renderer.dispose();
    },
  };
}
