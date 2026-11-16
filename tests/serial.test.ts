import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_BAUD, LineSplitter, cleanSerialText, describePort, parseBaud, timeStamp } from "../lib/serial.ts";

test("baud from a link: known rates only", () => {
  assert.equal(parseBaud("9600"), 9600);
  assert.equal(parseBaud(["115200", "9600"]), 115200);
  for (const bad of [undefined, "", "abc", "12345", "-9600", "9600.5", "1e9", { x: 1 }]) assert.equal(parseBaud(bad), DEFAULT_BAUD, String(bad));
});

test("lines split on LF, CRLF and CR, across chunks", () => {
  const s = new LineSplitter();
  assert.deepEqual(s.push("temp: 21.5\r"), []);
  assert.equal(s.pending, "temp: 21.5");
  assert.deepEqual(s.push("\nhum"), ["temp: 21.5"]);
  assert.deepEqual(s.push("idity: 40\nok\rnext\r\n\n"), ["humidity: 40", "ok", "next", ""]);
  assert.equal(s.pending, "");
  assert.deepEqual(s.push("a\r\r\nb\n"), ["a", "", "b"]);
});

test("colour codes and control characters are removed, tabs stay", () => {
  assert.equal(cleanSerialText("\x1b[0;32mI (31) boot: ESP-IDF\x1b[0m"), "I (31) boot: ESP-IDF");
  assert.equal(cleanSerialText("a\tb\x07c\x00d"), "a\tbcd");
});

test("timestamps and port names", () => {
  assert.match(timeStamp(Date.UTC(2026, 0, 1, 1, 2, 3, 45)), /^\d{2}:\d{2}:\d{2}\.045$/);
  assert.equal(describePort({ usbVendorId: 0x10c4, usbProductId: 0xea60 }), "Silicon Labs CP210x (10c4:ea60)");
  assert.equal(describePort({ usbVendorId: 0x1234, usbProductId: 1 }), "1234:0001");
  assert.equal(describePort({}), null);
});
