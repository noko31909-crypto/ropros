import type { ComponentDef, PinCap, PinDef } from "./types";
import type { ComponentId } from "./ids";
import type { GuideContent } from "@/lib/content/schema";

/**
 * Automatic circuit checker. Pure: takes the guide and a registry lookup, returns issues.
 * Only type imports here so node's type-stripping test runner can load this file without the `@/` alias.
 *
 * Model: every pin of every instance (plus the implicit "board") is a node. Wires union nodes into nets
 * (union-find). All gnd pins of one component are joined (PCB ground plane). Passives (resistor, switch,
 * LED…) are NOT conductors: their two pins stay in different nets.
 *
 * Known limits (documented on purpose, prefer warnings over false errors):
 * - Power is traced through at most one passive hop (a switch/diode between battery and vcc).
 * - Level-shifter use is recognised implicitly: a correctly shifted signal puts the module pin and the board pin
 *   on different nets, so no overvoltage is seen. A shifter wired backwards (module→LV, board→HV) is not detected.
 * - Divider detection: module-out net → resistor → board-pin net, and the board-pin net has a resistor to GND.
 *   Divider ratios are not computed. A series resistor without a pull-down is reported as a warning.
 * - Code parsing is regex based (Arduino C++, MicroPython, RPi.GPIO, gpiozero). Pins passed through
 *   arrays, loops or computed expressions are not seen; I2C/SPI/UART pins are ignored when the sketch uses
 *   those buses.
 */

export type Issue = { level: "error" | "warning"; code: string; message: string; at?: string };
export type CheckInput = Pick<GuideContent, "board" | "platform" | "instances" | "connections" | "code" | "parts">;

type Node = { inst: string; def: ComponentDef; pin: PinDef; key: string };

const BOARD = "board";
const REMAPPABLE_BUS_BOARDS = new Set<string>(["esp32-devkit", "esp32-cam", "esp8266-nodemcu", "raspberry-pi-pico"]);
const BUS_CAPS = new Set<PinCap>(["i2c_sda", "i2c_scl", "spi_mosi", "spi_miso", "spi_sck", "spi_cs", "uart_tx", "uart_rx"]);
const SHARED_BUS_CAPS = new Set<PinCap>(["i2c_sda", "i2c_scl", "onewire", "spi_mosi", "spi_miso", "spi_sck"]);
const LED_COMPONENTS = new Set<string>(["led", "ir-led", "rgb-led"]);
const VOLT_TOLERANCE = 0.25;
/**
 * Module signal pins that are commonly and legitimately left unconnected. AO/DO pairs are handled separately
 * (warn only when neither is wired).
 */
const OPTIONAL_PINS = new Set<string>([
  "NC", "INT", "INT1", "INT2", "DRDY", "DOUT", "STATE", "EN", "ENA", "ENB", "KEY", "RST", "XDA", "XCL", "AD0", "SQW", "32K", "PPS", "IRQ",
]);
const ANALOG_DIGITAL_PAIRS: [string, string][] = [["AO", "DO"], ["A0", "D0"], ["AOUT", "DOUT"]];

// ---------------------------------------------------------------- helpers

function levenshtein(a: string, b: string): number {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0] ?? 0;
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j] ?? 0;
      prev[j] = Math.min((prev[j] ?? 0) + 1, (prev[j - 1] ?? 0) + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length] ?? 0;
}

function suggest(wanted: string, options: string[]): string[] {
  const w = wanted.toLowerCase();
  const exact = options.filter((o) => o.toLowerCase() === w);
  if (exact.length) return exact;
  return options
    .map((o) => ({ o, d: levenshtein(w, o.toLowerCase()) }))
    .filter((x) => x.d <= 2)
    .sort((a, b) => a.d - b.d)
    .slice(0, 3)
    .map((x) => x.o);
}

class UnionFind {
  private parent = new Map<string, string>();
  add(k: string): void {
    if (!this.parent.has(k)) this.parent.set(k, k);
  }
  find(k: string): string {
    let r = k;
    while (this.parent.get(r) !== r) r = this.parent.get(r) ?? r;
    let c = k;
    while (c !== r) {
      const n = this.parent.get(c) ?? r;
      this.parent.set(c, r);
      c = n;
    }
    return r;
  }
  union(a: string, b: string): void {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) this.parent.set(ra, rb);
  }
}

const hasCap = (p: PinDef, c: PinCap) => (p.caps ?? []).includes(c);
const fmtV = (v: number) => `${v} V`;

// ---------------------------------------------------------------- main

export function checkCircuit(guide: CheckInput, registry: (id: ComponentId) => ComponentDef): Issue[] {
  const issues: Issue[] = [];
  const err = (code: string, message: string, at?: string) => issues.push({ level: "error", code, message, at });
  const warn = (code: string, message: string, at?: string) => issues.push({ level: "warning", code, message, at });

  const lookup = (id: ComponentId): ComponentDef | undefined => {
    try {
      return registry(id);
    } catch {
      return undefined;
    }
  };

  // ---- instances
  const instances = new Map<string, ComponentDef>();
  const boardDef = lookup(guide.board);
  if (!boardDef) {
    err("unknown_component", `Board component "${guide.board}" is not in the hardware registry.`, BOARD);
  } else {
    if (boardDef.kind !== "board") {
      err("board_not_board", `"${guide.board}" (${boardDef.name}) is a ${boardDef.kind}, not a board. Set "board" to a microcontroller or SBC and move this part to "instances".`, BOARD);
    }
    instances.set(BOARD, boardDef);
  }
  const mechanical = new Set<string>();
  for (const inst of guide.instances) {
    if (inst.id === BOARD || instances.has(inst.id) || mechanical.has(inst.id)) {
      err("duplicate_instance", inst.id === BOARD
        ? `Instance id "board" is reserved for the main board; rename this ${inst.component} instance.`
        : `Instance id "${inst.id}" is declared more than once; give each instance a unique id.`, inst.id);
      continue;
    }
    const def = lookup(inst.component);
    if (!def) {
      err("unknown_component", `Component "${inst.component}" (instance "${inst.id}") is not in the hardware registry.`, inst.id);
      continue;
    }
    if (def.kind === "mechanical") {
      err("mechanical_wired", `"${inst.id}" is ${def.name}, a mechanical part. List it in "parts" only, not in "instances" or connections.`, inst.id);
      mechanical.add(inst.id);
      continue;
    }
    if (def.kind === "board") {
      warn("extra_board", `"${inst.id}" is a second board (${def.name}); the checker treats it as a plain component.`, inst.id);
    }
    instances.set(inst.id, def);
  }

  // ---- parts list coverage (warning only)
  const listed = new Set<string>(guide.parts.map((p) => p.component));
  const missingParts = new Set<string>();
  if (!listed.has(guide.board)) missingParts.add(guide.board);
  for (const inst of guide.instances) if (!listed.has(inst.component)) missingParts.add(inst.component);
  for (const m of missingParts) warn("part_not_listed", `Component "${m}" is used in the circuit but missing from "parts"; add it so the shopping list is complete.`);

  // ---- nodes + union-find
  const uf = new UnionFind();
  const nodes = new Map<string, Node>();
  for (const [inst, def] of instances) {
    for (const pin of def.pins) {
      const key = `${inst}.${pin.id}`;
      nodes.set(key, { inst, def, pin, key });
      uf.add(key);
    }
    const gnds = def.pins.filter((p) => p.role === "gnd");
    for (let i = 1; i < gnds.length; i++) uf.union(`${inst}.${gnds[0]!.id}`, `${inst}.${gnds[i]!.id}`);
  }

  const wired = new Set<string>();
  const seenWires = new Set<string>();
  const resolve = (ep: string): string | undefined => {
    const dot = ep.indexOf(".");
    const inst = dot < 0 ? ep : ep.slice(0, dot);
    const pinId = dot < 0 ? "" : ep.slice(dot + 1);
    if (mechanical.has(inst)) return undefined; // already reported as mechanical_wired
    const def = instances.get(inst);
    if (!def) {
      const s = suggest(inst, [...instances.keys()]);
      err("unknown_instance", `Endpoint "${ep}" refers to instance "${inst}", which is not declared in "instances"${s.length ? `. Did you mean ${s.map((x) => `"${x}"`).join(" or ")}?` : "."}`, ep);
      return undefined;
    }
    if (!def.pins.some((p) => p.id === pinId)) {
      const ids = def.pins.map((p) => p.id);
      const s = suggest(pinId, ids);
      err("unknown_pin", `${def.name} ("${inst}") has no pin "${pinId}"${s.length ? `. Did you mean ${s.map((x) => `"${inst}.${x}"`).join(" or ")}?` : `. Valid pins: ${ids.slice(0, 12).join(", ")}${ids.length > 12 ? ", …" : ""}.`}`, ep);
      return undefined;
    }
    return `${inst}.${pinId}`;
  };

  for (const c of guide.connections) {
    if (c.from === c.to) {
      warn("self_loop", `Wire from "${c.from}" to itself does nothing; remove it or fix the endpoint.`, c.from);
      continue;
    }
    const pair = [c.from, c.to].sort().join("|");
    if (seenWires.has(pair)) warn("duplicate_wire", `Wire "${c.from}" ↔ "${c.to}" is listed twice; remove the duplicate.`, c.from);
    seenWires.add(pair);
    const a = resolve(c.from);
    const b = resolve(c.to);
    if (a) wired.add(a);
    if (b) wired.add(b);
    if (a && b) uf.union(a, b);
  }

  // ---- nets
  const nets = new Map<string, Node[]>();
  for (const n of nodes.values()) {
    const r = uf.find(n.key);
    const list = nets.get(r);
    if (list) list.push(n);
    else nets.set(r, [n]);
  }
  const netOf = (key: string): Node[] => nets.get(uf.find(key)) ?? [];
  const netId = (key: string) => uf.find(key);
  const describe = (ns: Node[]) => ns.map((n) => n.key).join(", ");
  const isBoard = (n: Node) => n.inst === BOARD;
  const boardGndPin = boardDef?.pins.find((p) => p.role === "gnd");
  const boardGndNet = boardGndPin ? netId(`${BOARD}.${boardGndPin.id}`) : undefined;

  // ---- short / source conflicts (per net)
  for (const members of nets.values()) {
    const sources = members.filter((n) => n.pin.role === "source");
    const gnds = members.filter((n) => n.pin.role === "gnd");
    if (sources.length && gnds.length) {
      err("short_supply_gnd", `Short circuit: supply ${sources.map((s) => `${s.key}${s.pin.volts !== undefined ? ` (${fmtV(s.pin.volts)})` : ""}`).join(", ")} is wired to ground (${gnds.map((g) => g.key).join(", ")}). Remove the wire joining them.`, sources[0]!.key);
    }
    for (let i = 0; i < sources.length; i++) {
      for (let j = i + 1; j < sources.length; j++) {
        const a = sources[i]!;
        const b = sources[j]!;
        if (a.pin.volts === undefined || b.pin.volts === undefined) continue;
        if (Math.abs(a.pin.volts - b.pin.volts) > VOLT_TOLERANCE) {
          err("source_conflict", `Two different supplies are tied together: ${a.key} (${fmtV(a.pin.volts)}) and ${b.key} (${fmtV(b.pin.volts)}). Keep each supply on its own rail; share only GND.`, a.key);
        } else if (a.inst !== b.inst) {
          warn("parallel_sources", `${a.key} and ${b.key} are both ${fmtV(a.pin.volts)} supplies wired in parallel; power the rail from one of them to avoid back-feeding.`, a.key);
        }
      }
    }
  }

  // ---- power: which source feeds each vcc pin
  /** Source pins on this net, or one passive hop away (switch/diode/fuse between supply and vcc). */
  const suppliesFor = (key: string): Node[] => {
    const direct = netOf(key).filter((n) => n.pin.role === "source");
    if (direct.length) return direct;
    const here = netId(key);
    const out: Node[] = [];
    for (const n of netOf(key)) {
      if (n.pin.role !== "passive" || n.def.kind !== "passive" || LED_COMPONENTS.has(n.def.id) || n.def.id === "resistor") continue;
      for (const other of n.def.pins) {
        if (other.id === n.pin.id || other.role !== "passive") continue;
        const ok = `${n.inst}.${other.id}`;
        if (netId(ok) === here) continue;
        out.push(...netOf(ok).filter((m) => m.pin.role === "source"));
      }
    }
    return out;
  };

  const powered = new Set<string>();
  const supplyVolts = new Map<string, number>(); // instance -> lowest supply volts seen on its vcc
  for (const [inst, def] of instances) {
    if (inst === BOARD || def.kind === "board") continue;
    const vccs = def.pins.filter((p) => p.role === "vcc");
    if (!vccs.length) continue;
    const wiredVccs = vccs.filter((p) => wired.has(`${inst}.${p.id}`));
    if (!wiredVccs.length) {
      err("unpowered", `${def.name} ("${inst}") has no power: connect ${vccs.map((p) => `${inst}.${p.id}`).join(" / ")} to a supply${def.supply ? ` of ${def.supply.min}–${def.supply.max} V` : ""}.`, inst);
      continue;
    }
    let anyPowered = false;
    for (const p of wiredVccs) {
      const key = `${inst}.${p.id}`;
      const sup = suppliesFor(key);
      if (!sup.length) {
        err("unpowered", `${key} is wired but its net (${describe(netOf(key))}) has no supply pin. Connect it to a 5V/3V3 pin, battery + or regulator output.`, key);
        continue;
      }
      anyPowered = true;
      for (const s of sup) {
        const v = s.pin.volts;
        if (v === undefined) continue;
        const prev = supplyVolts.get(inst);
        supplyVolts.set(inst, prev === undefined ? v : Math.min(prev, v));
        if (def.supply && (v < def.supply.min - VOLT_TOLERANCE || v > def.supply.max + VOLT_TOLERANCE)) {
          err("supply_out_of_range", `${def.name} ("${inst}") is powered with ${fmtV(v)} from ${s.key} on ${key}, but it needs ${def.supply.min}–${def.supply.max} V. ${v > def.supply.max ? "Use a lower supply (e.g. 3V3) or a regulator" : "Use a higher supply or a boost converter"}.`, key);
        }
      }
      // servo / heavy load straight from a board supply pin
      if (def.drawMa !== undefined) {
        for (const s of sup) {
          if (!isBoard(s) || s.pin.maxMa === undefined || s.pin.maxMa >= def.drawMa) continue;
          if (def.id.startsWith("servo")) {
            warn("servo_from_board", `Servo "${inst}" can draw ~${def.drawMa} mA but ${s.key} supplies at most ${s.pin.maxMa} mA; the board may brown out. Power the servo from a separate 5 V supply and join its GND to the board GND.`, key);
          }
        }
      }
    }
    if (anyPowered) powered.add(inst);
  }

  // ---- common ground
  for (const inst of powered) {
    const def = instances.get(inst)!;
    const gnds = def.pins.filter((p) => p.role === "gnd");
    if (!gnds.length || boardGndNet === undefined) continue;
    const g = `${inst}.${gnds[0]!.id}`;
    if (netId(g) !== boardGndNet) {
      err("missing_ground", `${def.name} ("${inst}") is powered but its ground (${gnds.map((p) => `${inst}.${p.id}`).join(" / ")}) is not connected to the board GND. Add a wire to ${BOARD}.${boardGndPin!.id} so all parts share a common ground.`, g);
    }
  }

  // ---- signal rules on nets that touch board io pins
  const boardLogic = boardDef?.logicVolts ?? 5;
  const tolerant = boardDef?.fiveVoltTolerant ?? true;
  const remappable = REMAPPABLE_BUS_BOARDS.has(guide.board);
  const outVolts = (n: Node): number | undefined => {
    if (n.pin.volts === undefined) return undefined;
    const sup = supplyVolts.get(n.inst);
    return sup === undefined ? n.pin.volts : Math.min(n.pin.volts, sup);
  };
  const resistorBridges = (net: string): Node[][] => {
    // returns [resistorPinOnNet, otherPinNode] pairs for resistors touching this net
    const res: Node[][] = [];
    for (const n of nets.get(net) ?? []) {
      if (n.def.id !== "resistor") continue;
      for (const o of n.def.pins) {
        if (o.id === n.pin.id) continue;
        const other = nodes.get(`${n.inst}.${o.id}`);
        if (other && netId(other.key) !== net) res.push([n, other]);
      }
    }
    return res;
  };

  for (const [root, members] of nets) {
    const boardIo = members.filter((n) => isBoard(n) && n.pin.role === "io");
    const boardSrc = members.filter((n) => isBoard(n) && n.pin.role === "source");
    const loads = members.filter((n) => n.pin.role === "load");

    // gpio_load
    for (const l of loads) {
      if (boardIo.length) {
        err("gpio_load", `${l.def.name} terminal ${l.key} is wired straight to GPIO ${boardIo.map((b) => b.key).join(", ")}. A GPIO can only source ~20 mA; drive it through a motor driver, transistor/MOSFET or relay.`, l.key);
      }
      for (const s of boardSrc) {
        if (l.def.drawMa !== undefined && s.pin.maxMa !== undefined && s.pin.maxMa < l.def.drawMa) {
          err("gpio_load", `${l.def.name} (${l.key}) draws ~${l.def.drawMa} mA but board pin ${s.key} supplies at most ${s.pin.maxMa} mA. Use a driver with an external supply.`, l.key);
        }
      }
    }

    if (!boardIo.length) continue;
    const modulePins = members.filter((n) => !isBoard(n) && n.def.kind !== "board");

    // overvoltage_input (direct)
    if (!tolerant) {
      for (const n of modulePins) {
        if (n.pin.role !== "out") continue;
        const v = outVolts(n);
        if (v !== undefined && v > boardLogic + 0.5) {
          err("overvoltage_input", `${n.def.name} pin ${n.key} outputs ${fmtV(v)} straight into ${boardIo.map((b) => b.key).join(", ")}, but ${boardDef?.name ?? guide.board} GPIO is ${fmtV(boardLogic)} and not 5 V tolerant. Add a voltage divider (e.g. 1 kΩ series + 2 kΩ to GND) or a level shifter.`, n.key);
        }
      }
      // through a resistor: divider needs a second resistor from the board-side net to GND
      for (const [r, far] of resistorBridges(root)) {
        const farOuts = netOf(far!.key).filter((m) => m.pin.role === "out" && !isBoard(m) && (outVolts(m) ?? 0) > boardLogic + 0.5);
        if (!farOuts.length) continue;
        const hasPullDown = resistorBridges(root).some(([r2, f2]) => r2!.inst !== r!.inst && boardGndNet !== undefined && netId(f2!.key) === boardGndNet);
        if (!hasPullDown) {
          warn("overvoltage_input", `${farOuts[0]!.key} (${fmtV(outVolts(farOuts[0]!) ?? 0)}) reaches ${boardIo[0]!.key} through resistor "${r!.inst}" only. Without a resistor from ${boardIo[0]!.key} to GND the pin still sees ~${fmtV(outVolts(farOuts[0]!) ?? 0)}; complete the divider.`, farOuts[0]!.key);
        }
      }
    }

    // missing_capability / nondefault_bus_pin
    for (const n of modulePins) {
      for (const modCap of n.pin.caps ?? []) {
        if (modCap === "digital") continue; // every io pin reads/writes digital; input-only handled below
        // UART crosses over: a module's TX lands on the board's RX and vice versa.
        const cap: PinCap = modCap === "uart_tx" ? "uart_rx" : modCap === "uart_rx" ? "uart_tx" : modCap;
        if (boardIo.some((b) => hasCap(b.pin, cap))) continue;
        const boards = boardIo.map((b) => b.key).join(", ");
        if ((cap === "uart_rx" || cap === "uart_tx") && !remappable) {
          warn("software_serial", `${n.key} is wired to ${boards}, which is not a hardware ${cap === "uart_rx" ? "RX" : "TX"} pin. It works with SoftwareSerial (as most Uno/Nano sketches do); keep D0/D1 free for USB uploads.`, n.key);
        } else if (BUS_CAPS.has(cap) && remappable) {
          warn("nondefault_bus_pin", `${n.key} needs ${cap} and is wired to ${boards}, which is not the default ${cap} pin of ${boardDef?.name ?? guide.board}. It works only if the code remaps the bus (e.g. Wire.begin(sda, scl) / I2C(scl=…, sda=…)).`, n.key);
        } else if (cap === "interrupt") {
          warn("missing_capability", `${n.key} works best on an interrupt-capable pin, but ${boards} has no hardware interrupt; fast signals may be missed.`, n.key);
        } else {
          err("missing_capability", `${n.def.name} pin ${n.key} needs ${cap}, but ${boards} does not support it. Move the wire to a board pin with ${cap}.`, n.key);
        }
      }
    }

    // input_only_pin
    for (const n of modulePins) {
      if (n.pin.role !== "in") continue;
      const drivable = boardIo.some((b) => b.pin.caps === undefined || hasCap(b.pin, "digital"));
      if (!drivable) {
        err("input_only_pin", `${n.key} must be driven by the board, but ${boardIo.map((b) => b.key).join(", ")} is input-only. Move it to an output-capable GPIO.`, n.key);
      }
    }

    // pin_reused
    const signal = modulePins.filter((n) => n.def.kind === "module" && (n.pin.role === "in" || n.pin.role === "out"));
    const insts = new Set(signal.map((n) => n.inst));
    if (insts.size >= 2 && signal.some((n) => n.pin.role === "out")) {
      const shared = [...signal, ...boardIo].some((n) => (n.pin.caps ?? []).some((c) => SHARED_BUS_CAPS.has(c)));
      if (!shared) {
        err("pin_reused", `${boardIo.map((b) => b.key).join(", ")} is shared by ${signal.map((s) => s.key).join(", ")}; an output would fight another device. Give each module its own GPIO.`, boardIo[0]!.key);
      }
    }
  }

  // ---- LEDs without resistor
  for (const [inst, def] of instances) {
    if (!LED_COMPONENTS.has(def.id)) continue;
    const pinNets = def.pins.map((p) => netOf(`${inst}.${p.id}`));
    const hasResistor = pinNets.some((ns) => ns.some((n) => n.def.id === "resistor"));
    if (hasResistor) continue;
    const toIo = pinNets.some((ns) => ns.some((n) => isBoard(n) && n.pin.role === "io"));
    const toRail = pinNets.some((ns) => ns.some((n) => n.pin.role === "gnd" || n.pin.role === "source"));
    if (toIo && toRail) {
      warn("led_no_resistor", `LED "${inst}" is wired between a GPIO and ${"GND/supply"} with no series resistor; it will overdrive the pin and the LED. Add a 220–330 Ω resistor in series.`, inst);
    }
  }

  // ---- floating module pins
  for (const inst of powered) {
    const def = instances.get(inst)!;
    if (def.kind !== "module") continue;
    const isWired = (id: string) => wired.has(`${inst}.${id}`);
    for (const p of def.pins) {
      if (p.role !== "in" && p.role !== "out") continue;
      if (isWired(p.id) || OPTIONAL_PINS.has(p.id.toUpperCase())) continue;
      const pair = ANALOG_DIGITAL_PAIRS.find(([a, d]) => a === p.id.toUpperCase() || d === p.id.toUpperCase());
      if (pair && def.pins.some((q) => pair.includes(q.id.toUpperCase()) && isWired(q.id))) continue;
      warn("floating_module_pin", `${def.name} ("${inst}") is powered but its ${p.role === "in" ? "input" : "output"} ${inst}.${p.id} is not connected${p.role === "in" ? "; a floating input can cause erratic behaviour" : ""}. Wire it to the board or remove the module.`, `${inst}.${p.id}`);
    }
  }

  // ---- code ↔ wiring
  if (boardDef) checkCodePins(guide, boardDef, nodes, wired, warn);

  return issues;
}

// ---------------------------------------------------------------- code pin extraction

type Family = "arduino" | "arduino-mega" | "esp8266" | "esp32" | "rpi" | "pico";

function familyOf(boardId: string): Family {
  if (boardId === "arduino-mega") return "arduino-mega";
  if (boardId.startsWith("arduino")) return "arduino";
  if (boardId.startsWith("esp8266")) return "esp8266";
  if (boardId.startsWith("esp32")) return "esp32";
  if (boardId === "raspberry-pi-pico") return "pico";
  return "rpi";
}

const NODEMCU: Record<string, number> = { D0: 16, D1: 5, D2: 4, D3: 0, D4: 2, D5: 14, D6: 12, D7: 13, D8: 15, D9: 3, D10: 1 };

/** Canonical key for a board pin id ("D9" → "9", "A0" → "A0", "GPIO21" → "21", "GP15" → "15"). */
export function canonBoardPin(boardId: string, pinId: string): string | undefined {
  const f = familyOf(boardId);
  const up = pinId.toUpperCase();
  let m: RegExpMatchArray | null;
  if (f === "arduino" || f === "arduino-mega") {
    if ((m = up.match(/^D(\d+)$/))) return String(Number(m[1]));
    if ((m = up.match(/^A(\d+)$/))) return `A${Number(m[1])}`;
    return undefined;
  }
  if (f === "esp8266") {
    if (NODEMCU[up] !== undefined) return String(NODEMCU[up]);
    if ((m = up.match(/^GPIO(\d+)$/))) return String(Number(m[1]));
    if (up === "A0") return "A0";
    return undefined;
  }
  if (f === "esp32") {
    if ((m = up.match(/^(?:GPIO|IO|D|G)?(\d+)$/))) return String(Number(m[1]));
    return undefined;
  }
  if (f === "pico") {
    if ((m = up.match(/^GP(?:IO)?(\d+)$/))) return String(Number(m[1]));
    return undefined;
  }
  if ((m = up.match(/^(?:GPIO|BCM)(\d+)$/))) return String(Number(m[1]));
  return undefined;
}

/** Canonical key for a pin token found in code ("9", "A0", "14" on Uno → "A0", "D5" on NodeMCU → "14"). */
function canonCodePin(f: Family, token: string): string | undefined {
  const t = token.trim().replace(/^["']|["']$/g, "").toUpperCase();
  let m: RegExpMatchArray | null;
  if ((m = t.match(/^GPIO_NUM_(\d+)$/))) return String(Number(m[1]));
  if ((m = t.match(/^\d+$/))) {
    const n = Number(t);
    if (n > 60) return undefined;
    if (f === "arduino" && n >= 14 && n <= 21) return `A${n - 14}`;
    if (f === "arduino-mega" && n >= 54) return `A${n - 54}`;
    return String(n);
  }
  if ((m = t.match(/^A(\d+)$/))) return f === "arduino" || f === "arduino-mega" || (f === "esp8266" && t === "A0") ? `A${Number(m[1])}` : undefined;
  if (f === "esp8266" && NODEMCU[t] !== undefined) return String(NODEMCU[t]);
  if (f === "pico" && (m = t.match(/^GP(\d+)$/))) return String(Number(m[1]));
  if ((f === "rpi" || f === "esp32") && (m = t.match(/^GPIO\s?(\d+)$/))) return String(Number(m[1]));
  return undefined;
}

const PIN_NAME = /PIN|LED|BTN|BUTTON|TRIG|ECHO|SERVO|RELAY|BUZZ|^IN\d|^EN[AB]?$|SDA|SCL|^CS$|^CE$|CSN|RST|DATA|DHT|SENSOR|MOTOR|PWM|SIG|^DIR|STEP|CLK|DIO|^DT$|^SW$|IR|PIR|PUMP|FAN|POT|LDR|SOIL/i;

const NOT_PIN_NAME = /NUM|COUNT|MAX|MIN|DELAY|TIME|_MS$|SPEED|ANGLE|BRIGHT|THRESH|BAUD|DIST|SIZE|LEN|STEPS|TYPE|ADDR|INTERVAL|RATE|CHANNEL|FREQ|RES/i;

/** Calls whose first argument is a pin (strong evidence). */
const STRONG_CALLS = [
  "pinMode", "digitalWrite", "digitalRead", "analogRead", "analogWrite", "tone", "noTone", "pulseIn", "digitalPinToInterrupt",
  "ledcAttachPin", "ledcAttach", "touchRead",
  "Pin", "ADC", "GPIO\\.setup", "GPIO\\.output", "GPIO\\.input", "GPIO\\.PWM", "GPIO\\.add_event_detect",
  "LED", "PWMLED", "RGBLED", "Button", "Buzzer", "TonalBuzzer", "Servo", "AngularServo", "MotionSensor", "LightSensor",
  "LineSensor", "DigitalInputDevice", "DigitalOutputDevice", "OutputDevice", "InputDevice", "PWMOutputDevice",
];

function extractCodePins(f: Family, sources: string[]): { strong: Set<string>; weak: Set<string> } {
  const strong = new Set<string>();
  const weak = new Set<string>();
  const add = (set: Set<string>, tok: string, consts: Map<string, string>) => {
    const raw = tok.trim();
    const val = consts.get(raw) ?? raw;
    const c = canonCodePin(f, val);
    if (c !== undefined) set.add(c);
  };
  for (const src of sources) {
    const consts = new Map<string, string>();
    const def = /#define\s+(\w+)\s+(\w+)/g;
    // `const int A = 2, B = 4;` → expand each declarator into "A = 2;" so one regex handles both forms
    const expanded = src.replace(/\b((?:const\s+)?(?:static\s+)?(?:constexpr\s+)?(?:int|uint8_t|byte|uint16_t|short|unsigned|int8_t|gpio_num_t|pin_size_t))\s+([^;(){}]+);/g,
      (_all, type: string, decls: string) => decls.split(",").map((d) => `${type} ${d.trim()};`).join(" "));
    const cdecl = /\b(?:const\s+)?(?:static\s+)?(?:constexpr\s+)?(?:int|uint8_t|byte|uint16_t|short|unsigned|int8_t|gpio_num_t|pin_size_t)\s+(\w+)\s*=\s*(\w+)\s*;/g;
    const pyassign = /^\s*([A-Z][A-Z0-9_]*)\s*=\s*(\d+)\s*(?:#.*)?$/gm;
    for (const re of [def, cdecl, pyassign]) {
      for (const m of (re === cdecl ? expanded : src).matchAll(re)) {
        const name = m[1]!;
        const val = m[2]!;
        if (canonCodePin(f, val) === undefined) continue;
        consts.set(name, val);
        if (PIN_NAME.test(name) && !NOT_PIN_NAME.test(name)) add(strong, val, consts);
      }
    }
    // arrays of pins: const int PINS[] = {2, 3, 4};
    for (const m of src.matchAll(/\b(\w*(?:PIN|pin|Pin)\w*)\s*\[\s*\d*\s*\]\s*=\s*\{([^}]*)\}/g)) {
      for (const t of m[2]!.split(",")) add(strong, t, consts);
    }
    const calls = new RegExp(`(?<![\\w])(${STRONG_CALLS.join("|")})\\s*\\(\\s*([^,()]+)`, "g");
    for (const m of src.matchAll(calls)) {
      const arg = m[2]!.replace(/^(?:pin\s*=\s*)/, "");
      add(strong, arg, consts);
    }
    for (const m of src.matchAll(/\.attach\s*\(\s*([^,()]+)/g)) add(strong, m[1]!, consts);
    // keyword args: echo=24, trigger=23, pin=5, sda=Pin(4) is caught above
    for (const m of src.matchAll(/\b(?:pin|echo|trigger|forward|backward|enable|red|green|blue|scl|sda|sck|mosi|miso|cs|tx|rx)\s*=\s*(?:Pin\s*\(\s*)?(\w+)/g)) {
      add(strong, m[1]!, consts);
    }
    // Wire.begin(21, 22) / SPI.begin(18, 19, 23, 5): explicit bus pins
    for (const m of src.matchAll(/\b(?:Wire|SPI)\d?\.begin\s*\(([^)]*)\)/g)) for (const t of m[1]!.split(",")) add(strong, t, consts);
    // "Pins: GPIO 21 / 21" style comments
    for (const m of src.matchAll(/Pins?:\s*([^\n]*)/g)) {
      for (const t of m[1]!.match(/GPIO\s?\d+|GP\d+|\bD\d+|\bA\d+/g) ?? []) add(strong, t.replace(/\s/g, ""), consts);
    }
    // weak evidence: library constructors `Type obj(9, 10);` and Serial.begin extras — only used to suppress "never referenced"
    for (const m of src.matchAll(/^\s*[A-Z]\w*\s+\w+\s*\(([^()]*)\)\s*;/gm)) for (const t of m[1]!.split(",")) add(weak, t, consts);
    for (const m of src.matchAll(/\bSerial\d?\.begin\s*\(([^)]*)\)/g)) for (const t of m[1]!.split(",").slice(1)) add(weak, t, consts);
    for (const v of consts.values()) add(weak, v, consts);
  }
  return { strong, weak };
}

function checkCodePins(
  guide: CheckInput,
  boardDef: ComponentDef,
  nodes: Map<string, Node>,
  wired: Set<string>,
  warn: (code: string, message: string, at?: string) => void,
): void {
  const f = familyOf(boardDef.id);
  const sources = guide.code.filter((c) => c.language !== "bash").map((c) => c.source);
  if (!sources.length) return;
  const all = sources.join("\n");
  const usesI2C = /\bWire\b|\bI2C\b|smbus|SoftI2C|board\.SCL|board\.SDA|u8g2|Adafruit_SSD1306|LiquidCrystal_I2C/i.test(all);
  const usesSPI = /\bSPI\b|RF24|MFRC522|\bSD\.begin|TFT_eSPI|Adafruit_ST77/i.test(all);
  const usesUART = /\bSerial\d?\b|\bUART\b|\bserial\.Serial\b|SoftwareSerial/i.test(all);
  const { strong, weak } = extractCodePins(f, sources);

  const wiredBoard = new Map<string, string>(); // canon -> endpoint
  const ignored = new Set<string>();
  for (const key of wired) {
    const n = nodes.get(key);
    if (!n || n.inst !== BOARD || n.pin.role !== "io") continue;
    const c = canonBoardPin(boardDef.id, n.pin.id);
    if (c === undefined) continue;
    const caps = n.pin.caps ?? [];
    const busPin =
      (usesI2C && caps.some((x) => x === "i2c_sda" || x === "i2c_scl")) ||
      (usesSPI && caps.some((x) => x === "spi_mosi" || x === "spi_miso" || x === "spi_sck")) ||
      (usesUART && caps.some((x) => x === "uart_tx" || x === "uart_rx"));
    if (busPin) ignored.add(c);
    else wiredBoard.set(c, key);
  }
  // all canon keys that exist on the board, so "referenced but not wired" is only reported for real pins
  const boardCanon = new Set<string>();
  for (const p of boardDef.pins) {
    const c = canonBoardPin(boardDef.id, p.id);
    if (c !== undefined) boardCanon.add(c);
  }

  for (const [c, key] of wiredBoard) {
    if (strong.has(c) || weak.has(c)) continue;
    warn("code_pin_mismatch", `${key} is wired but the code never references pin ${c}. Check the pin constant in the sketch or move the wire.`, key);
  }
  const isArduino = f === "arduino" || f === "arduino-mega";
  for (const c of strong) {
    if (wiredBoard.has(c) || ignored.has(c)) continue;
    if (isArduino && c === "13") continue; // LED_BUILTIN
    if (boardCanon.size && !boardCanon.has(c)) continue;
    warn("code_pin_mismatch", `The code uses pin ${c} but nothing is wired to it on ${boardDef.name}. Update the sketch or the wiring so they match.`, `${BOARD}`);
  }
}
