import type { DiagramCaptions } from "./primitives";
import { BoardBg, Breadboard, Caption, Module, PinRow, Wire, MONO } from "./primitives";

const ID = "pc";

/** Breadboard wiring for the IoT plant care station (ESP32, soil sensor, DHT22, SSD1306, relay + pump). */
export function IotPlantCareDiagram({ label, c }: { label: string; c: DiagramCaptions }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 800" width="1300" height="800" role="img" aria-label={label} className="block h-auto min-w-[820px] w-full">
      <BoardBg w={1300} h={800} id={ID} />
      <Breadboard x={200} y={260} w={760} h={280} id={ID} />

      {/* ESP32 */}
      <Module x={380} y={330} w={400} h={140} fill="#1F1F1F" label="ESP32 DEVKIT V1" sub="ESP32-WROOM-32" />
      <PinRow x={400} y={348} labels={["3V3", "GND", "D15", "D2", "D4", "RX2", "TX2", "D5", "D18", "D19", "D21", "D22", "D23"]} step={30} />
      <PinRow x={400} y={452} labels={["VIN", "GND", "D13", "D12", "D14", "D27", "D26", "D25", "D33", "D32", "D35", "D34", "EN"]} step={30} dir="up" />

      {/* sensors and outputs */}
      <Module x={60} y={560} w={110} h={200} fill="#263238" label={c.soil} sub={c.soilSub} />
      <PinRow x={85} y={570} labels={["AOUT", "VCC", "GND"]} step={30} />
      <Module x={410} y={60} w={110} h={120} fill="#ECEFF1" label="DHT22" sub="AM2302" light />
      <PinRow x={440} y={172} labels={["VCC", "DATA", "GND"]} step={25} dir="up" />
      <g>
        <rect x={443} y={208} width="26" height="10" rx="3" fill="#D7B98E" stroke="#8D6E63" strokeWidth=".8" />
        <rect x={449} y={208} width="3" height="10" fill="#795548" /><rect x={455} y={208} width="3" height="10" fill="#1F1F1F" /><rect x={461} y={208} width="3" height="10" fill="#F57C00" />
        <text x={480} y={217} fontFamily={MONO} fontSize="10" fill="#37474F">10kΩ</text>
      </g>
      <Module x={640} y={40} w={170} h={140} fill="#0D47A1" label="SSD1306" sub="128×64 I²C · 0x3C" />
      <rect x={662} y={52} width="126" height="40" rx="3" fill="#0B0F14" />
      <text x={672} y={78} fontFamily={MONO} fontSize="14" fill="#2EE6C9">58%  23.4C</text>
      <PinRow x={660} y={172} labels={["GND", "VCC", "SCL", "SDA"]} step={30} dir="up" />

      <Module x={1020} y={300} w={150} h={110} fill="#1565C0" label={c.relay} sub="5 V · 1 ch" />
      {[["IN", 325], ["VCC", 355], ["GND", 385]].map(([l, y]) => (
        <g key={l}><rect x={1024} y={Number(y) - 4} width="8" height="8" rx="1.5" fill="#C49000" /><text x={1038} y={Number(y) + 3} fontFamily={MONO} fontSize="9" fill="#FFFFFF">{l}</text></g>
      ))}
      {[["NO", 320], ["COM", 350], ["NC", 380]].map(([l, y]) => (
        <g key={l}><rect x={1158} y={Number(y) - 6} width="12" height="12" rx="2" fill="#26A69A" /><text x={1152} y={Number(y) + 3} fontFamily={MONO} fontSize="9" fill="#FFFFFF" textAnchor="end">{l}</text></g>
      ))}
      <Module x={1040} y={600} w={150} h={90} fill="#00838F" label={c.pump} sub={c.pumpSub} />

      {/* rails: top = 3.3 V, bottom = 5 V */}
      <Wire pts={[[400, 348], [400, 268]]} color="#F57C00" />
      <Wire pts={[[430, 348], [430, 296]]} color="#1F1F1F" />
      <Wire pts={[[400, 452], [400, 504]]} color="#E53935" />
      <Wire pts={[[430, 452], [430, 532]]} color="#1F1F1F" />

      {/* soil sensor */}
      <Wire pts={[[85, 570], [85, 552], [760, 552], [760, 452]]} color="#00ACC1" />
      <Wire pts={[[115, 570], [115, 268], [236, 268]]} color="#F57C00" width={3} />
      <Wire pts={[[145, 570], [145, 296], [248, 296]]} color="#1F1F1F" width={3} />

      {/* DHT22 */}
      <Wire pts={[[465, 176], [465, 230], [520, 230], [520, 348]]} color="#F2C200" />
      <Wire pts={[[440, 176], [440, 268]]} color="#F57C00" width={3} />
      <Wire pts={[[490, 176], [490, 244], [560, 244], [560, 296]]} color="#1F1F1F" width={3} />

      {/* OLED */}
      <Wire pts={[[750, 176], [750, 222], [700, 222], [700, 348]]} color="#3949AB" />
      <Wire pts={[[720, 176], [720, 206], [730, 206], [730, 348]]} color="#7CB342" />
      <Wire pts={[[690, 176], [690, 252], [610, 252], [610, 268]]} color="#F57C00" width={3} />
      <Wire pts={[[660, 176], [660, 240], [590, 240], [590, 296]]} color="#1F1F1F" width={3} />

      {/* relay + pump */}
      <Wire pts={[[580, 452], [580, 570], [990, 570], [990, 325], [1024, 325]]} color="#8E24AA" />
      <Wire pts={[[936, 504], [1000, 504], [1000, 355], [1024, 355]]} color="#E53935" width={3} />
      <Wire pts={[[948, 532], [1008, 532], [1008, 385], [1024, 385]]} color="#1F1F1F" width={3} />
      <Wire pts={[[1164, 320], [1230, 320], [1230, 640], [1190, 640]]} color="#E53935" width={4} />
      <Wire pts={[[1164, 350], [1250, 350], [1250, 740], [924, 740], [924, 504]]} color="#E53935" width={4} />
      <Wire pts={[[1040, 670], [912, 670], [912, 532]]} color="#1F1F1F" width={4} />

      <Caption x={580} y={590}>{c.railsPc}</Caption>
      <Caption x={1115} y={712}>{c.waterPump}</Caption>
    </svg>
  );
}
