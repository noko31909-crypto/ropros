/** Guide content model. Replace the sample with your CMS/database loader. */
export type Part = { name: string; qty: number; spec: string; role: string; optional?: boolean };
export type Step = { title: string; body: string; expect: string; mistake: string };
export type CodeFile = { filename: string; language: "cpp" | "python" | "bash"; source: string; libraries: string[] };
export type Issue = { symptom: string; cause: string; fix: string };
export type Guide = {
  slug: string; title: string; summary: string; board: string; image: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced"; hours: number; costUsd: number;
  verification: string; parts: Part[]; steps: Step[]; code: CodeFile[]; troubleshooting: Issue[]; safety: string[];
};

const GUIDES: Guide[] = [
  {
    slug: "obstacle-avoiding-robot",
    title: "Obstacle Avoiding Robot",
    image: "/covers/obstacle-avoiding-robot.jpg",
    summary: "Drives forward until something is close, then scans left and right with a servo-mounted sensor and turns toward open space.",
    board: "Arduino Uno", difficulty: "Intermediate", hours: 5, costUsd: 38,
    verification: "Wiring checked against the L298N, HC-SR04 and SG90 datasheets. Not yet bench-tested.",
    parts: [
      { name: "Arduino Uno R3", qty: 1, spec: "5 V logic", role: "Controller" },
      { name: "HC-SR04 ultrasonic sensor", qty: 1, spec: "5 V, 2–400 cm", role: "Distance sensing" },
      { name: "SG90 micro servo", qty: 1, spec: "4.8–6 V", role: "Sensor scanning" },
      { name: "L298N motor driver", qty: 1, spec: "2 A per channel", role: "Drives both motors" },
      { name: "TT gear motor", qty: 2, spec: "3–6 V", role: "Wheels" },
      { name: "2WD chassis", qty: 1, spec: "Frame, wheels, caster", role: "Body" },
      { name: "2× 18650 battery pack", qty: 1, spec: "7.4 V", role: "Power" },
      { name: "TB6612FNG driver", qty: 1, spec: "1.2 A, 3.3–5 V logic", role: "More efficient driver", optional: true },
    ],
    steps: [
      { title: "Assemble the chassis", body: "Mount both TT motors, the wheels and the caster. Keep the battery low and central.", expect: "Wheels spin freely and the chassis sits level.", mistake: "Over-tightened screws crack acrylic." },
      { title: "Centre and mount the sensor", body: "Set the servo to 90°, then fix the horn so the HC-SR04 faces straight ahead.", expect: "At 90° the sensor points forward.", mistake: "Fitting the horn before centring skews the scan." },
      { title: "Wire the motor driver", body: "Remove the ENA/ENB jumpers. ENA→D5, IN1→D7, IN2→D8, IN3→D4, IN4→D2, ENB→D6. Join L298N GND to Arduino GND.", expect: "Driver ready for PWM speed control.", mistake: "Missing common ground makes motors behave randomly." },
      { title: "Wire sensor and servo", body: "HC-SR04: TRIG→A0, ECHO→A1, VCC→5V, GND→GND. Servo signal→D3.", expect: "All signals connected.", mistake: "Swapped TRIG/ECHO gives a constant 400 cm." },
      { title: "Test with wheels lifted", body: "Put the robot on a box, power it and upload the sketch.", expect: "Wheels spin forward and stop near your hand.", mistake: "A wheel spinning backwards just needs its motor wires swapped." },
    ],
    code: [{
      filename: "obstacle_avoider.ino", language: "cpp", libraries: ["Servo (built in)"],
      source: `#include <Servo.h>

const int TRIG = A0, ECHO = A1, SERVO_PIN = 3;
const int ENA = 5, IN1 = 7, IN2 = 8, ENB = 6, IN3 = 4, IN4 = 2;
const int SPEED = 170;
const long STOP_CM = 25;
Servo scanner;

long readCm() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  unsigned long us = pulseIn(ECHO, HIGH, 30000UL);
  return us == 0 ? 400 : (long)(us / 58);
}

void drive(int l, int r) {
  digitalWrite(IN1, l > 0); digitalWrite(IN2, l < 0); analogWrite(ENA, abs(l));
  digitalWrite(IN3, r > 0); digitalWrite(IN4, r < 0); analogWrite(ENB, abs(r));
}

void setup() {
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  int pins[] = {ENA, IN1, IN2, ENB, IN3, IN4};
  for (int p : pins) pinMode(p, OUTPUT);
  scanner.attach(SERVO_PIN); scanner.write(90);
  delay(1000);
}

void loop() {
  if (readCm() > STOP_CM) { drive(SPEED, SPEED); delay(60); return; }
  drive(-SPEED, -SPEED); delay(300); drive(0, 0);
  scanner.write(160); delay(350); long left = readCm();
  scanner.write(20);  delay(350); long right = readCm();
  scanner.write(90);  delay(250);
  if (left > right) drive(-SPEED, SPEED); else drive(SPEED, -SPEED);
  delay(350); drive(0, 0);
}`,
    }],
    troubleshooting: [
      { symptom: "Robot spins in circles", cause: "One motor is wired backwards.", fix: "Swap that motor’s two wires at the L298N output." },
      { symptom: "Board resets when motors start", cause: "Battery voltage sags under load.", fix: "Charge the pack, power the servo separately and add a 470 µF capacitor." },
      { symptom: "Distance always reads 400 cm", cause: "TRIG/ECHO swapped or no 5 V to the sensor.", fix: "Check the two signal wires and the sensor’s VCC." },
      { symptom: "Motors don’t move at all", cause: "ENA/ENB jumpers removed but enable wires missing.", fix: "Connect ENA→D5 and ENB→D6, and confirm common ground." },
    ],
    safety: ["Insulate battery joints; never short the pack.", "Charge Li-ion cells only with a proper charger."],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
export function allGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
