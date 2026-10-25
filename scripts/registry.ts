/** Prints the hardware registry (ids, kind, logic level, supply range, pins) so guide authors use exact pin ids.
 *  node --experimental-strip-types scripts/registry.ts [id ...] */
import { COMPONENT_IDS } from "../lib/hardware/ids.ts";
import { getComponent } from "../lib/hardware/components.ts";

const want = process.argv.slice(2);
for (const id of want.length ? want : COMPONENT_IDS) {
  const d = getComponent(id as (typeof COMPONENT_IDS)[number]);
  const head = [d.id, d.kind, d.name, d.logicVolts ? `logic ${d.logicVolts}V` : "", d.fiveVoltTolerant ? "5V-tolerant" : "", d.supply ? `supply ${d.supply.min}-${d.supply.max}V` : "", d.drawMa ? `draw ${d.drawMa}mA` : ""].filter(Boolean).join(" | ");
  console.log(head);
  if (d.pins.length) console.log("   " + d.pins.map((p) => `${p.id}:${p.role}${p.caps?.length ? `[${p.caps.join(",")}]` : ""}${p.volts !== undefined ? `@${p.volts}V` : ""}${p.maxMa ? `/${p.maxMa}mA` : ""}`).join("  "));
}
