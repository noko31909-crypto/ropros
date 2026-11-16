import { z } from "zod";

/** Pure helpers for the browser serial monitor (components/serial/serial-monitor.tsx). */

export const BAUD_RATES = [9600, 19200, 38400, 57600, 74880, 115200, 230400, 460800, 921600] as const;
export type BaudRate = (typeof BAUD_RATES)[number];
export const DEFAULT_BAUD: BaudRate = 115200;

/** `?baud=` from a guide link: one of BAUD_RATES, anything else falls back to the default. */
const BaudParam = z.coerce.number().int().refine((n): n is BaudRate => (BAUD_RATES as readonly number[]).includes(n));
export function parseBaud(value: unknown): BaudRate {
  const parsed = BaudParam.safeParse(Array.isArray(value) ? value[0] : value);
  return parsed.success ? (parsed.data as BaudRate) : DEFAULT_BAUD;
}

export const LINE_ENDINGS = { none: "", lf: "\n", cr: "\r", crlf: "\r\n" } as const;
export type LineEnding = keyof typeof LINE_ENDINGS;

/** Colour codes (ESP32 boot logs use them) and control characters other than tab are dropped from the output. */
export function cleanSerialText(text: string): string {
  return text.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "");
}

/**
 * Splits a byte stream that arrives in arbitrary chunks into lines. Accepts \n, \r\n and a lone \r as line ends
 * (a \r at the end of a chunk waits for the next one, in case a \n follows).
 */
export class LineSplitter {
  private rest = "";
  push(chunk: string): string[] {
    const text = this.rest + chunk;
    const lines: string[] = [];
    let start = 0;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === "\n") { lines.push(text.slice(start, i)); start = i + 1; }
      else if (ch === "\r") {
        if (i + 1 === text.length) break;             // maybe \r\n split across chunks
        lines.push(text.slice(start, i));
        start = text[i + 1] === "\n" ? i + 2 : i + 1;
        if (text[i + 1] === "\n") i++;
      }
    }
    this.rest = text.slice(start);
    return lines;
  }
  /** The unfinished last line, shown while it is still arriving. */
  get pending(): string { return this.rest.replace(/\r$/, ""); }
  reset(): void { this.rest = ""; }
}

/** 14:03:07.215 */
export function timeStamp(ms: number): string {
  const d = new Date(ms);
  const p = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(d.getMilliseconds(), 3)}`;
}

/** Common USB-to-serial chips by USB vendor id, to name the connected board. */
const VENDORS: Record<number, string> = {
  0x10c4: "Silicon Labs CP210x", 0x1a86: "WCH CH340", 0x0403: "FTDI", 0x2341: "Arduino", 0x2a03: "Arduino",
  0x303a: "Espressif USB", 0x2e8a: "Raspberry Pi", 0x239a: "Adafruit",
};
export function describePort(info: { usbVendorId?: number; usbProductId?: number }): string | null {
  if (info.usbVendorId === undefined) return null;
  const id = `${info.usbVendorId.toString(16).padStart(4, "0")}:${(info.usbProductId ?? 0).toString(16).padStart(4, "0")}`;
  const name = VENDORS[info.usbVendorId];
  return name ? `${name} (${id})` : id;
}
