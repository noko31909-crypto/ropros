import { test } from "node:test";
import assert from "node:assert/strict";
import { matchProjects } from "../lib/finder/match.ts";
import { canonicalPart } from "../lib/finder/normalize.ts";

const P = [
  { project_id: "ropros-bot-01", title: "Obstacle Avoiding Robot", microcontroller: "Arduino Uno", components_required: ["Arduino Uno", "HC-SR04", "L293D Motor Driver", "DC Motor", "Chassis"], wiring_summary: "", code_snippet: "" },
  { project_id: "ropros-radar-02", title: "Ultrasonic Sonar Radar", microcontroller: "Arduino Uno", components_required: ["Arduino Uno", "HC-SR04", "SG90 Servo"], wiring_summary: "", code_snippet: "" },
  { project_id: "ropros-weather-04", title: "ESP32 Weather Station", microcontroller: "ESP32 DevKit", components_required: ["ESP32 DevKit", "DHT22", "SSD1306 OLED"], wiring_summary: "", code_snippet: "" },
];

test("aliases resolve", () => {
  assert.equal(canonicalPart("HC-SR04").key, "hcsr04");
  assert.equal(canonicalPart("hc sr04 ultrasonic sensor").key, "hcsr04");
  assert.equal(canonicalPart("DC Motor").key, "tt");
  assert.equal(canonicalPart("L293D Motor Driver").key, "l293d");
  assert.equal(canonicalPart("SG90 Servo").key, "sg90");
  assert.equal(canonicalPart("Flux capacitor").category, "Other");
});
test("owns everything -> ready", () => {
  const r = matchProjects(P, ["arduino uno", "Ultrasonic Sensor", "L293D", "dc motor", "chassis"]);
  assert.deepEqual(r.ready.map(x => x.project_id), ["ropros-bot-01"]);
});
test("missing 1 small part -> close match", () => {
  const r = matchProjects(P, ["Arduino Uno", "HC-SR04", "DC Motor", "Chassis"]);
  assert.equal(r.ready.length, 0);
  const bot = r.close_matches.find(x => x.project_id === "ropros-bot-01");
  assert.deepEqual(bot?.missing, ["L293D Motor Driver"]);
  const radar = r.close_matches.find(x => x.project_id === "ropros-radar-02");
  assert.deepEqual(radar?.missing, ["SG90 Servo"]);
});
test("missing the board -> excluded, never a close match", () => {
  const r = matchProjects(P, ["HC-SR04", "L293D", "DC Motor", "Chassis"]);
  assert.ok(!r.close_matches.some(x => x.project_id === "ropros-bot-01"));
});
test("missing the chassis -> excluded", () => {
  const r = matchProjects(P, ["Arduino Uno", "HC-SR04", "L293D", "DC Motor"]);
  assert.ok(!r.close_matches.some(x => x.project_id === "ropros-bot-01"));
});
test("missing 3 parts -> excluded", () => {
  const r = matchProjects(P, ["Arduino Uno", "Chassis"]);
  assert.ok(!r.close_matches.some(x => x.project_id === "ropros-bot-01"));
});
test("duplicates and unknowns", () => {
  const r = matchProjects(P, ["Arduino Uno", "arduino", "Flux capacitor", "HC-SR04", "SG90"]);
  assert.deepEqual(r.ready.map(x => x.project_id), ["ropros-radar-02"]);
  assert.deepEqual(r.unrecognized, ["Flux capacitor"]);
});

test("the finder searches every published guide, and ranks builds that use more of your parts first", async () => {
  const { PROJECTS, GUIDE_SLUGS, PROJECT_TITLES } = await import("../lib/finder/projects-data.ts");
  const { GUIDE_CATALOG } = await import("../content/guides/catalog.ts");
  assert.ok(PROJECTS.length >= GUIDE_CATALOG.length, "every content guide is searchable");
  for (const g of GUIDE_CATALOG) assert.ok(GUIDE_SLUGS.has(g.slug) || !g.parts.some((p) => p.component !== g.board), g.slug);
  for (const p of PROJECTS) {
    assert.ok(!/\.\.\.|void loop\(\) \{ \.\.\. \}/.test(p.code_snippet), `${p.project_id}: no stub code`);
    assert.ok(PROJECT_TITLES.get(p.project_id)?.ru, `${p.project_id}: has a Russian title`);
  }
  const r = matchProjects(PROJECTS, ["Arduino Nano", "DS3231", "TM1637", "Push Button"]);
  assert.equal([...r.ready, ...r.close_matches][0]?.project_id, "desk-clock-ds3231");
});

test("the guide catalog is in sync with the guide files (run scripts/guides-index.ts after editing a guide)", async () => {
  const { GUIDE_CATALOG } = await import("../content/guides/catalog.ts");
  const { CONTENT_GUIDES } = await import("../content/guides/index.ts");
  const { FINDER_GUIDES } = await import("../content/guides/finder.ts");
  const { catalogEntry, finderEntry } = await import("../scripts/guides-index.ts");
  assert.deepEqual(GUIDE_CATALOG, CONTENT_GUIDES.map(catalogEntry));
  assert.deepEqual(FINDER_GUIDES, CONTENT_GUIDES.map(finderEntry));
});

test("the 404 check in proxy.ts knows every guide page (run scripts/guides-index.ts after adding a guide)", async () => {
  const { GUIDE_SLUG_LIST } = await import("../content/guides/slugs.ts");
  const { allGuideSlugs } = await import("../lib/guides.ts");
  assert.deepEqual([...GUIDE_SLUG_LIST], allGuideSlugs());
});
