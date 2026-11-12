import type { ComponentId } from "../hardware/ids.ts";

/**
 * Mounting holes from the boards' and modules' drawings, in the model's own coordinates (origin = footprint
 * centre), with the screw they take. Only parts whose hole pattern is published and widely used are listed;
 * anything else rests on the floor or on rails.
 */
export type Mount = { holes: [number, number][]; screw: "M2" | "M2.5" | "M3" };
export const MOUNTS: Partial<Record<ComponentId, Mount>> = {
  // Arduino Uno R3: holes at (14.0, 2.5), (15.3, 50.7), (66.1, 7.6), (66.1, 35.5) mm from the lower-left corner of a 68.6 x 53.4 board.
  "arduino-uno": { holes: [[-20.3, -24.2], [-19.0, 24.0], [31.8, -19.1], [31.8, 8.8]], screw: "M3" },
  // Arduino Mega 2560: the Uno pattern plus (90.2, 50.7) and (96.5, 2.5) on a 101.6 x 53.3 board.
  "arduino-mega": { holes: [[-36.8, -24.2], [-35.5, 24.0], [15.3, -19.1], [15.3, 8.8], [39.4, 24.0], [45.7, -24.2]], screw: "M3" },
  // Raspberry Pi 4: 58 x 49 mm pattern, 3.5 mm in from the USB-C/HDMI corner of an 85 x 56 board.
  "raspberry-pi-4": { holes: [[-39, -24.5], [19, -24.5], [-39, 24.5], [19, 24.5]], screw: "M2.5" },
  // Raspberry Pi Pico: 47 x 11.4 mm pattern on a 51 x 21 board.
  "raspberry-pi-pico": { holes: [[-23.5, -5.7], [-23.5, 5.7], [23.5, -5.7], [23.5, 5.7]], screw: "M2" },
  // L298N module: 37 x 37 mm pattern on a 43 x 43 board.
  "l298n": { holes: [[-18.5, -18.5], [18.5, -18.5], [-18.5, 18.5], [18.5, 18.5]], screw: "M3" },
  // HC-SR04: 41 x 17 mm pattern on a 45 x 20 board.
  "hc-sr04": { holes: [[-20.5, -8.5], [20.5, -8.5], [-20.5, 8.5], [20.5, 8.5]], screw: "M2" },
  // 16x2 LCD: 75 x 31 mm pattern on an 80 x 36 board.
  "lcd-1602-i2c": { holes: [[-37.5, -15.5], [37.5, -15.5], [-37.5, 15.5], [37.5, 15.5]], screw: "M3" },
};
/** Screw → [standoff outer radius, pilot hole radius for a self-tapping screw in PLA]. */
export const SCREW: Record<Mount["screw"], [number, number]> = { M2: [2.2, 0.8], "M2.5": [2.6, 1.05], M3: [3, 1.25] };
