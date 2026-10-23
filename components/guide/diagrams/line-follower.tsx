import { BoardBg, Breadboard, Caption, Module, Motor, PinRow, Wire, MONO } from "./primitives";

const ID = "lf";
const SENSORS = [300, 440, 580, 720];
const SENSOR_COLORS = ["#F2C200", "#F57C00", "#7CB342", "#00ACC1"];
const A_PINS = [400, 436, 472, 508]; // A0..A3 on the Nano's bottom header
const L298N_PINS: { label: string; d: number; y: number; color: string }[] = [
  { label: "ENA", d: 490, y: 270, color: "#E91E63" },
  { label: "IN1", d: 550, y: 294, color: "#8E24AA" },
  { label: "IN2", d: 580, y: 318, color: "#8E24AA" },
  { label: "IN3", d: 610, y: 342, color: "#795548" },
  { label: "IN4", d: 640, y: 366, color: "#795548" },
  { label: "ENB", d: 520, y: 390, color: "#3949AB" },
];

/** Breadboard wiring for the PID line follower (Arduino Nano, 4× TCRT5000, L298N, two motors). */
export function LineFollowerDiagram({ label }: { label: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 780" width="1300" height="780" role="img" aria-label={label} className="block h-auto min-w-[820px] w-full">
      <BoardBg w={1300} h={780} id={ID} />
      <Breadboard x={220} y={230} w={700} h={260} id={ID} />

      {/* IR sensor bar */}
      {SENSORS.map((x, i) => (
        <g key={x}>
          <Module x={x} y={30} w={110} h={80} fill="#1E5AA8" label={`IR ${i + 1}`} sub="TCRT5000" />
          <PinRow x={x + 25} y={104} labels={["VCC", "GND", "AO"]} step={30} dir="up" />
        </g>
      ))}

      {/* Arduino Nano straddling the centre groove */}
      <Module x={380} y={300} w={360} h={120} fill="#0D47A1" label="ARDUINO NANO" sub="ATmega328P" />
      <PinRow x={400} y={318} labels={["D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12"]} step={30} />
      <PinRow x={400} y={402} labels={["A0", "A1", "A2", "A3", "A4", "A5", "5V", "GND", "VIN"]} step={36} dir="up" />

      {/* L298N */}
      <Module x={980} y={240} w={180} h={220} fill="#C62828" label="L298N" sub="dual H-bridge" />
      {L298N_PINS.map((p) => (
        <g key={p.label}>
          <rect x={984} y={p.y - 4} width="8" height="8" rx="1.5" fill="#C49000" />
          <text x={1000} y={p.y + 3} fontFamily={MONO} fontSize="9" fill="#FFFFFF">{p.label}</text>
        </g>
      ))}
      <PinRow x={1010} y={250} labels={["OUT1", "OUT2"]} step={30} />
      <PinRow x={1100} y={250} labels={["OUT3", "OUT4"]} step={30} />
      <PinRow x={1010} y={450} labels={["12V", "GND", "5V"]} step={40} dir="up" />

      <Motor x={860} y={40} label="Left motor" />
      <Motor x={1080} y={40} label="Right motor" />
      <Module x={960} y={620} w={200} h={70} fill="#263238" label="2× 18650" sub="7.4 V" />
      <Caption x={1060} y={720}>Battery pack</Caption>

      {/* rail bridges */}
      <Wire pts={[[236, 238], [236, 454]]} color="#E53935" />
      <Wire pts={[[250, 266], [250, 482]]} color="#1F1F1F" />

      {/* sensors: power + analog out */}
      {SENSORS.map((x, i) => (
        <g key={`w${x}`}>
          <Wire pts={[[x + 25, 108], [x + 25, 238]]} color="#E53935" width={3} />
          <Wire pts={[[x + 55, 108], [x + 55, 266]]} color="#1F1F1F" width={3} />
          <Wire pts={[[x + 85, 108], [x + 85, 190 + i * 9], [A_PINS[i]! - 14, 190 + i * 9], [A_PINS[i]! - 14, 440], [A_PINS[i]!, 440], [A_PINS[i]!, 402]]} color={SENSOR_COLORS[i]!} />
        </g>
      ))}

      {/* Nano -> L298N control */}
      {L298N_PINS.map((p, k) => (
        <Wire key={`c${p.label}`} pts={[[p.d, 318], [p.d, 296 - k * 7], [950 - k * 6, 296 - k * 7], [950 - k * 6, p.y], [984, p.y]]} color={p.color} />
      ))}

      {/* motors */}
      <Wire pts={[[1010, 250], [1010, 200], [910, 200], [910, 94]]} color="#E53935" width={3} />
      <Wire pts={[[1040, 250], [1040, 210], [930, 210], [930, 94]]} color="#1F1F1F" width={3} />
      <Wire pts={[[1100, 250], [1100, 200], [1130, 200], [1130, 94]]} color="#E53935" width={3} />
      <Wire pts={[[1130, 250], [1130, 210], [1150, 210], [1150, 94]]} color="#1F1F1F" width={3} />

      {/* power */}
      <Wire pts={[[1010, 450], [1010, 560], [1000, 560], [1000, 620]]} color="#E53935" width={4.6} />
      <Wire pts={[[1050, 450], [1050, 600], [1120, 600], [1120, 620]]} color="#1F1F1F" width={4.6} />
      <Wire pts={[[1090, 450], [1090, 530], [900, 530], [900, 454]]} color="#E53935" />
      <Wire pts={[[1050, 540], [880, 540], [880, 482]]} color="#1F1F1F" />
      <Wire pts={[[616, 402], [616, 454]]} color="#E53935" />
      <Wire pts={[[652, 402], [652, 482]]} color="#1F1F1F" />

      <Caption x={570} y={520}>5V rail · GND rail</Caption>
    </svg>
  );
}
