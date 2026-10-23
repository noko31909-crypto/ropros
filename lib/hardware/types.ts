import type { ComponentId } from "./ids";
import type { PartCategory } from "@/lib/parts-catalog";

/**
 * Hardware registry contract. The circuit checker (lib/hardware/check.ts) and the automatic
 * diagram renderer (components/guide/diagrams/auto-diagram.tsx) read only these fields.
 */

/** What a pin can do. A board GPIO lists every capability it has; a module pin lists what it needs. */
export type PinCap =
  | "digital" | "analog" | "pwm" | "dac" | "touch"
  | "i2c_sda" | "i2c_scl" | "spi_mosi" | "spi_miso" | "spi_sck" | "spi_cs"
  | "uart_tx" | "uart_rx" | "onewire" | "interrupt";

export type PinRole =
  | "vcc"      // power input of a module (needs a supply in `supply` range)
  | "source"   // power output (board 5V/3V3 pins, battery +, regulator out) with `volts`
  | "gnd"
  | "io"       // bidirectional / configurable GPIO (boards)
  | "in"       // module signal input
  | "out"      // module signal output, drives at `volts` (logic level)
  | "load"     // high-current terminal (motor, pump, speaker, coil) — must not connect to a GPIO
  | "passive"  // resistor/LED/button/switch terminal
  | "nc";

export type Side = "top" | "bottom" | "left" | "right";

export type PinDef = {
  id: string;            // as written in connections, e.g. "D9", "GPIO21", "VCC", "TRIG", "A", "K"
  role: PinRole;
  caps?: PinCap[];       // boards: capabilities; modules: required capability for the board pin it connects to
  volts?: number;        // source: output voltage; out: logic high level
  maxMa?: number;        // source/io: max current it can supply
  side: Side;            // where the pin sits on the drawn module
  label?: string;        // printed label if different from id
};

export type ComponentDef = {
  id: ComponentId;
  name: string;                       // display name, untranslated ("HC-SR04 ultrasonic sensor")
  category: PartCategory;             // ties into the finder / components library
  kind: "board" | "module" | "passive" | "power" | "mechanical";
  logicVolts?: 3.3 | 5;               // boards: GPIO level; modules: level of their signal pins
  fiveVoltTolerant?: boolean;         // boards: GPIO inputs survive 5 V
  supply?: { min: number; max: number }; // modules: acceptable voltage on vcc pins
  drawMa?: number;                    // typical current draw (motors/pumps/servos: stall-ish), for power checks
  pins: PinDef[];                     // empty for mechanical parts
  draw: { w: number; h: number; color: string; textColor?: string }; // grid units (1 unit = one breadboard hole, 12 px)
  finderPartId?: string;              // id in lib/parts-catalog.ts if the finder knows this part
};
