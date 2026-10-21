import { ProjectSchema, type ProjectRecord } from "./schema.ts";

/**
 * Sample records in the ropros schema. Replace with your database/CMS query.
 * Validated at load so a malformed record fails loudly instead of matching wrongly.
 */
const RAW: unknown[] = [
  {
    project_id: "ropros-bot-01", title: "Obstacle Avoiding Robot", microcontroller: "Arduino Uno",
    components_required: ["Arduino Uno", "HC-SR04", "L293D Motor Driver", "DC Motor", "Chassis"],
    wiring_summary: "HC-SR04 VCC to 5V, GND to GND, Trig to Pin 9, Echo to Pin 10. L293D inputs to pins 4, 5, 6, 7.",
    code_snippet: "void loop() { ... }",
  },
  {
    project_id: "ropros-radar-02", title: "Ultrasonic Sonar Radar", microcontroller: "Arduino Uno",
    components_required: ["Arduino Uno", "HC-SR04", "SG90 Servo"],
    wiring_summary: "HC-SR04 Trig to Pin 9, Echo to Pin 10. Servo signal to Pin 3.", code_snippet: "void loop() { ... }",
  },
  {
    project_id: "ropros-line-03", title: "Line Following Robot", microcontroller: "Arduino Uno",
    components_required: ["Arduino Uno", "TCRT5000 IR Line Sensor", "L298N Motor Driver", "DC Motor", "Chassis", "2x 18650 Battery Pack"],
    wiring_summary: "IR sensors to A0/A1. L298N ENA D5, IN1 D7, IN2 D8, ENB D6, IN3 D4, IN4 D2.", code_snippet: "void loop() { ... }",
  },
  {
    project_id: "ropros-weather-04", title: "ESP32 Weather Station", microcontroller: "ESP32 DevKit",
    components_required: ["ESP32 DevKit", "DHT22", "SSD1306 OLED"],
    wiring_summary: "DHT22 data to GPIO4 with 10k pull-up. OLED SDA GPIO21, SCL GPIO22.", code_snippet: "void loop() { ... }",
  },
];

export const PROJECTS: readonly ProjectRecord[] = Object.freeze(ProjectSchema.array().parse(RAW));
