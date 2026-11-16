/**
 * Registry ids of parts every maker has in a starter kit (lib/hardware/ids.ts). They are not counted as requirements,
 * so they never block a finder match and never land on a shopping list.
 */
export const CONSUMABLES: ReadonlySet<string> = new Set(["breadboard", "jumper-wires", "resistor", "capacitor", "enclosure", "usb-5v"]);
