import { ProjectSchema, type ProjectRecord } from "./schema.ts";

/**
 * Sample records in the ropros schema. Replace with your database/CMS query.
 * Validated at load so a malformed record fails loudly instead of matching wrongly.
 */
const RAW: unknown[] = [
  {
    project_id: "obstacle-avoiding-robot", title: "Obstacle Avoiding Robot", microcontroller: "Arduino Uno",
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
    project_id: "line-follower", title: "Line Following Robot", microcontroller: "Arduino Uno",
    components_required: ["Arduino Uno", "TCRT5000 IR Line Sensor", "L298N Motor Driver", "DC Motor", "Chassis", "2x 18650 Battery Pack"],
    wiring_summary: "IR sensors to A0/A1. L298N ENA D5, IN1 D7, IN2 D8, ENB D6, IN3 D4, IN4 D2.", code_snippet: "void loop() { ... }",
  },
  {
    project_id: "ropros-weather-04", title: "ESP32 Weather Station", microcontroller: "ESP32 DevKit",
    components_required: ["ESP32 DevKit", "DHT22", "SSD1306 OLED"],
    wiring_summary: "DHT22 data to GPIO4 with 10k pull-up. OLED SDA GPIO21, SCL GPIO22.", code_snippet: "void loop() { ... }",
  },
  {
    project_id: "iot-plant-care", title: "IoT Plant Care Station", microcontroller: "ESP32 DevKit",
    components_required: ["ESP32 DevKit", "Capacitive Soil Moisture Sensor", "5V Relay Module", "DHT22"],
    wiring_summary: "Soil sensor AOUT to GPIO34. Relay IN to GPIO26. DHT22 data to GPIO4 with 10k pull-up.", code_snippet: "void loop() { ... }",
  },
  {
    project_id: "ropros-btcar-05", title: "Bluetooth RC Car", microcontroller: "Arduino Uno",
    components_required: ["Arduino Uno", "HC-05 Bluetooth", "L298N Motor Driver", "DC Motor", "Chassis", "2x 18650 Battery Pack"],
    wiring_summary: "HC-05 TX to D10, RX to D11 through a 1k/2k divider. L298N as in the line follower.", code_snippet: "void loop() { ... }",
  },
  {
    project_id: "ropros-alarm-06", title: "PIR Motion Alarm", microcontroller: "Arduino Nano",
    components_required: ["Arduino Nano", "HC-SR501 PIR Motion Sensor", "5V Relay Module"],
    wiring_summary: "PIR OUT to D2 (interrupt). Relay IN to D7.", code_snippet: "void loop() { ... }",
  },
  {
    project_id: "ropros-pantilt-07", title: "Pi Pan-Tilt Camera Mount", microcontroller: "Raspberry Pi 5",
    components_required: ["Raspberry Pi 5", "PCA9685 Servo Driver", "SG90 Servo"],
    wiring_summary: "PCA9685 SDA to GPIO2, SCL to GPIO3. Servos on channels 0 and 1, V+ from a separate 5 V supply.", code_snippet: "# python",
  },
];

/** Projects that have a full guide page at /projects/<slug>. Others are not linked (no 404s). */
export const GUIDE_SLUGS: ReadonlySet<string> = new Set(["obstacle-avoiding-robot", "line-follower", "iot-plant-care"]);

export const PROJECTS: readonly ProjectRecord[] = Object.freeze(ProjectSchema.array().parse(RAW).filter((p) => GUIDE_SLUGS.has(p.project_id)));
