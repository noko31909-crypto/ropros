/** Components users can pick. IDs must match the matching engine's catalog. */
export type PartCategory = "Boards" | "Sensors" | "Actuators" | "Drivers" | "Displays" | "Wireless" | "Power" | "Mechanical";
export type CatalogPart = { id: string; name: string; category: PartCategory; aliases: string[] };

export const PARTS: CatalogPart[] = [
  { id: "uno", name: "Arduino Uno", category: "Boards", aliases: ["uno", "arduino"] },
  { id: "nano", name: "Arduino Nano", category: "Boards", aliases: ["nano"] },
  { id: "mega", name: "Arduino Mega 2560", category: "Boards", aliases: ["mega"] },
  { id: "esp32", name: "ESP32 DevKit", category: "Boards", aliases: ["esp32", "esp-32"] },
  { id: "esp32cam", name: "ESP32-CAM", category: "Boards", aliases: ["esp32 cam", "camera board"] },
  { id: "rpi5", name: "Raspberry Pi 5", category: "Boards", aliases: ["pi 5", "raspberry"] },
  { id: "pico", name: "Raspberry Pi Pico", category: "Boards", aliases: ["pico", "rp2040"] },
  { id: "hcsr04", name: "HC-SR04 Ultrasonic Sensor", category: "Sensors", aliases: ["hc-sr04", "ultrasonic", "ultrasonic sensor", "sonar", "distance"] },
  { id: "mpu6050", name: "MPU6050 Accelerometer/Gyro", category: "Sensors", aliases: ["imu", "gyro", "accelerometer"] },
  { id: "dht22", name: "DHT22 Temperature & Humidity", category: "Sensors", aliases: ["dht", "humidity", "temperature"] },
  { id: "pir", name: "HC-SR501 PIR Motion Sensor", category: "Sensors", aliases: ["pir", "motion"] },
  { id: "tcrt5000", name: "TCRT5000 IR Line Sensor", category: "Sensors", aliases: ["ir", "line"] },
  { id: "flame", name: "KY-026 Flame Sensor", category: "Sensors", aliases: ["flame", "fire"] },
  { id: "vl53l0x", name: "VL53L0X Time-of-Flight", category: "Sensors", aliases: ["tof", "laser distance"] },
  { id: "soil", name: "Capacitive Soil Moisture Sensor", category: "Sensors", aliases: ["soil", "moisture"] },
  { id: "sg90", name: "SG90 Servo", category: "Actuators", aliases: ["servo", "micro servo"] },
  { id: "mg996r", name: "MG996R Metal-Gear Servo", category: "Actuators", aliases: ["mg996", "high torque servo"] },
  { id: "tt", name: "DC Gear Motor (TT)", category: "Actuators", aliases: ["dc motor", "tt motor", "yellow motor", "gear motor", "motor"] },
  { id: "nema17", name: "NEMA 17 Stepper", category: "Actuators", aliases: ["stepper"] },
  { id: "ws2812", name: "WS2812B LED Strip", category: "Actuators", aliases: ["neopixel", "rgb strip"] },
  { id: "l298n", name: "L298N Motor Driver", category: "Drivers", aliases: ["h-bridge", "motor driver"] },
  { id: "tb6612", name: "TB6612FNG Motor Driver", category: "Drivers", aliases: ["tb6612"] },
  { id: "pca9685", name: "PCA9685 Servo Driver", category: "Drivers", aliases: ["16 channel", "servo driver"] },
  { id: "relay", name: "5V Relay Module", category: "Drivers", aliases: ["relay"] },
  { id: "l293d", name: "L293D Motor Driver", category: "Drivers", aliases: ["l293d", "l293"] },
  { id: "ssd1306", name: "SSD1306 OLED 0.96\"", category: "Displays", aliases: ["oled"] },
  { id: "lcd1602", name: "16×2 I2C LCD", category: "Displays", aliases: ["lcd", "1602"] },
  { id: "hc05", name: "HC-05 Bluetooth", category: "Wireless", aliases: ["bluetooth"] },
  { id: "nrf24", name: "nRF24L01+ Radio", category: "Wireless", aliases: ["nrf", "2.4ghz radio"] },
  { id: "bat2s", name: "2× 18650 Battery Pack", category: "Power", aliases: ["18650", "battery", "li-ion"] },
  { id: "buck", name: "LM2596 Buck Converter", category: "Power", aliases: ["buck", "step down"] },
  { id: "chassis", name: "Robot Chassis", category: "Mechanical", aliases: ["chassis", "2wd chassis", "robot car kit"] },
];

export const STARTER_KITS: { label: string; ids: string[] }[] = [
  { label: "Arduino robot kit", ids: ["uno", "l298n", "tt", "hcsr04", "sg90", "bat2s"] },
  { label: "ESP32 IoT kit", ids: ["esp32", "dht22", "ssd1306", "relay"] },
  { label: "Pi vision kit", ids: ["rpi5", "sg90", "pca9685"] },
];

export function searchParts(query: string, exclude: Set<string>): CatalogPart[] {
  const q = query.trim().toLowerCase();
  const pool = PARTS.filter((p) => !exclude.has(p.id));
  if (!q) return pool.slice(0, 8);
  return pool
    .map((p) => {
      const name = p.name.toLowerCase();
      const score = name.startsWith(q) ? 3 : name.includes(q) ? 2 : p.aliases.some((a) => a.includes(q)) ? 1 : 0;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((x) => x.p);
}
