/**
 * Components users can pick. IDs must match the matching engine's catalog.
 * Names, specs and pins stay untranslated; category labels are localised in lib/i18n/messages/components.ts.
 */
export const PART_CATEGORIES = ["Boards", "Sensors", "Actuators", "Drivers", "Displays", "Wireless", "Power", "Mechanical"] as const;
export type PartCategory = (typeof PART_CATEGORIES)[number];
export type CatalogPart = { id: string; name: string; category: PartCategory; aliases: string[]; specs: string[] };

export const PARTS: CatalogPart[] = [
  { id: "uno", name: "Arduino Uno", category: "Boards", aliases: ["uno", "arduino", "ардуино"], specs: ["ATmega328P", "5 V logic", "14 DIO · 6 PWM"] },
  { id: "nano", name: "Arduino Nano", category: "Boards", aliases: ["nano", "нано"], specs: ["ATmega328P", "5 V logic", "breadboard-friendly"] },
  { id: "mega", name: "Arduino Mega 2560", category: "Boards", aliases: ["mega"], specs: ["ATmega2560", "5 V logic", "54 DIO · 15 PWM"] },
  { id: "esp32", name: "ESP32 DevKit", category: "Boards", aliases: ["esp32", "esp-32"], specs: ["240 MHz dual-core", "3.3 V logic", "Wi-Fi + BLE"] },
  { id: "esp32cam", name: "ESP32-CAM", category: "Boards", aliases: ["esp32 cam", "camera board", "камера"], specs: ["OV2640", "3.3 V logic", "microSD"] },
  { id: "rpi5", name: "Raspberry Pi 5", category: "Boards", aliases: ["pi 5", "raspberry", "малинка"], specs: ["Cortex-A76", "3.3 V GPIO", "5 V 5 A USB-C"] },
  { id: "pico", name: "Raspberry Pi Pico", category: "Boards", aliases: ["pico", "rp2040"], specs: ["RP2040", "3.3 V logic", "PIO"] },
  { id: "hcsr04", name: "HC-SR04 Ultrasonic Sensor", category: "Sensors", aliases: ["hc-sr04", "ultrasonic", "ultrasonic sensor", "sonar", "distance", "ультразвуковой", "дальномер"], specs: ["2–400 cm", "5 V", "TRIG / ECHO"] },
  { id: "mpu6050", name: "MPU6050 Accelerometer/Gyro", category: "Sensors", aliases: ["imu", "gyro", "accelerometer", "гироскоп", "акселерометр"], specs: ["6-axis", "I2C 0x68", "3.3–5 V"] },
  { id: "dht22", name: "DHT22 Temperature & Humidity", category: "Sensors", aliases: ["dht", "humidity", "temperature", "влажность", "температура"], specs: ["±0.5 °C", "1-wire", "10k pull-up"] },
  { id: "pir", name: "HC-SR501 PIR Motion Sensor", category: "Sensors", aliases: ["pir", "motion", "движение"], specs: ["up to 7 m", "5–20 V in", "3.3 V out"] },
  { id: "tcrt5000", name: "TCRT5000 IR Line Sensor", category: "Sensors", aliases: ["ir", "line", "линия", "ик"], specs: ["IR reflective", "A0 / D0", "1–25 mm"] },
  { id: "flame", name: "KY-026 Flame Sensor", category: "Sensors", aliases: ["flame", "fire", "пламя", "огонь"], specs: ["760–1100 nm", "A0 / D0", "5 V"] },
  { id: "vl53l0x", name: "VL53L0X Time-of-Flight", category: "Sensors", aliases: ["tof", "laser distance"], specs: ["up to 2 m", "I2C 0x29", "2.8 V core"] },
  { id: "soil", name: "Capacitive Soil Moisture Sensor", category: "Sensors", aliases: ["soil", "moisture", "почва", "влажность почвы"], specs: ["analog out", "3.3–5 V", "no corrosion"] },
  { id: "sg90", name: "SG90 Servo", category: "Actuators", aliases: ["servo", "micro servo", "серво", "сервопривод"], specs: ["180°", "1.8 kg·cm", "PWM 50 Hz"] },
  { id: "mg996r", name: "MG996R Metal-Gear Servo", category: "Actuators", aliases: ["mg996", "high torque servo"], specs: ["180°", "10 kg·cm", "stall 2.5 A"] },
  { id: "tt", name: "DC Gear Motor (TT)", category: "Actuators", aliases: ["dc motor", "tt motor", "yellow motor", "gear motor", "motor", "мотор", "двигатель"], specs: ["3–6 V", "1:48", "~200 RPM"] },
  { id: "nema17", name: "NEMA 17 Stepper", category: "Actuators", aliases: ["stepper", "шаговый"], specs: ["1.8°/step", "1.5 A/phase", "bipolar"] },
  { id: "ws2812", name: "WS2812B LED Strip", category: "Actuators", aliases: ["neopixel", "rgb strip", "лента"], specs: ["5 V", "60 mA/LED max", "single-wire"] },
  { id: "l298n", name: "L298N Motor Driver", category: "Drivers", aliases: ["h-bridge", "motor driver", "драйвер"], specs: ["2 A/ch", "5–35 V", "~2 V drop"] },
  { id: "tb6612", name: "TB6612FNG Motor Driver", category: "Drivers", aliases: ["tb6612"], specs: ["1.2 A/ch", "2.7–5.5 V logic", "MOSFET"] },
  { id: "pca9685", name: "PCA9685 Servo Driver", category: "Drivers", aliases: ["16 channel", "servo driver"], specs: ["16 ch PWM", "I2C 0x40", "12-bit"] },
  { id: "relay", name: "5V Relay Module", category: "Drivers", aliases: ["relay", "реле"], specs: ["10 A 250 VAC", "opto-isolated", "IN active LOW"] },
  { id: "l293d", name: "L293D Motor Driver", category: "Drivers", aliases: ["l293d", "l293"], specs: ["600 mA/ch", "4.5–36 V", "DIP-16"] },
  { id: "ssd1306", name: "SSD1306 OLED 0.96\"", category: "Displays", aliases: ["oled", "дисплей"], specs: ["128×64", "I2C 0x3C", "3.3–5 V"] },
  { id: "lcd1602", name: "16×2 I2C LCD", category: "Displays", aliases: ["lcd", "1602"], specs: ["16×2 chars", "I2C 0x27", "5 V"] },
  { id: "hc05", name: "HC-05 Bluetooth", category: "Wireless", aliases: ["bluetooth", "блютуз"], specs: ["BT 2.0 SPP", "UART 9600", "3.3 V RX"] },
  { id: "nrf24", name: "nRF24L01+ Radio", category: "Wireless", aliases: ["nrf", "2.4ghz radio", "радио"], specs: ["2.4 GHz", "SPI", "3.3 V only"] },
  { id: "bat2s", name: "2× 18650 Battery Pack", category: "Power", aliases: ["18650", "battery", "li-ion", "аккумулятор", "батарея"], specs: ["7.4 V nominal", "8.4 V full", "2S Li-ion"] },
  { id: "buck", name: "LM2596 Buck Converter", category: "Power", aliases: ["buck", "step down", "понижающий"], specs: ["3–40 V in", "1.25–37 V out", "3 A"] },
  { id: "chassis", name: "Robot Chassis", category: "Mechanical", aliases: ["chassis", "2wd chassis", "robot car kit", "шасси"], specs: ["2WD", "acrylic", "caster wheel"] },
  // Appended for the hardware registry (lib/hardware/components.ts).
  { id: "esp8266", name: "ESP8266 NodeMCU", category: "Boards", aliases: ["esp8266", "nodemcu", "wemos"], specs: ["ESP-12E", "3.3 V logic", "Wi-Fi"] },
  { id: "rpi4", name: "Raspberry Pi 4", category: "Boards", aliases: ["pi 4", "raspberry pi 4", "rpi4"], specs: ["Cortex-A72", "3.3 V GPIO", "5 V 3 A USB-C"] },
  { id: "led", name: "LED 5 mm", category: "Actuators", aliases: ["светодиод"], specs: ["~2 V fwd (red)", "20 mA max", "needs resistor"] },
  { id: "resistor", name: "Resistor", category: "Mechanical", aliases: ["resistors", "резистор"], specs: ["1/4 W", "220 Ω–10 kΩ", "through-hole"] },
  { id: "button", name: "Push Button", category: "Sensors", aliases: ["push button", "pushbutton", "tactile switch", "кнопка"], specs: ["6×6 mm", "momentary", "INPUT_PULLUP"] },
  { id: "potentiometer", name: "Potentiometer 10k", category: "Sensors", aliases: ["pot", "potentiometer", "потенциометр"], specs: ["10 kΩ", "linear", "analog"] },
  { id: "buzzer", name: "Buzzer", category: "Actuators", aliases: ["buzzer", "piezo", "пищалка", "зуммер"], specs: ["active / passive", "5 V", "tone()"] },
  { id: "dht11", name: "DHT11 Temperature & Humidity", category: "Sensors", aliases: ["dht11"], specs: ["±2 °C", "single-wire", "3.3–5 V"] },
  { id: "ds18b20", name: "DS18B20 Temperature Sensor", category: "Sensors", aliases: ["ds18b20", "1-wire temperature", "waterproof temperature"], specs: ["±0.5 °C", "1-Wire", "4.7k pull-up"] },
  { id: "bme280", name: "BME280 / BMP280 Sensor", category: "Sensors", aliases: ["bme280", "bmp280", "barometer", "pressure", "давление"], specs: ["pressure + temp", "I2C 0x76", "3.3 V"] },
  { id: "ldr", name: "Photoresistor (LDR)", category: "Sensors", aliases: ["ldr", "photoresistor", "light sensor", "фоторезистор"], specs: ["GL5528", "divider", "analog"] },
  { id: "rtc", name: "DS3231 RTC Module", category: "Sensors", aliases: ["ds3231", "rtc", "real time clock", "часы"], specs: ["±2 ppm", "I2C 0x68", "CR2032"] },
  { id: "gps", name: "NEO-6M GPS Module", category: "Wireless", aliases: ["neo-6m", "neo6m", "gps"], specs: ["UART 9600", "3.3–5 V", "u-blox"] },
  { id: "rc522", name: "RC522 RFID Reader", category: "Wireless", aliases: ["rc522", "rfid", "nfc"], specs: ["13.56 MHz", "SPI", "3.3 V only"] },
  { id: "tm1637", name: "TM1637 4-Digit Display", category: "Displays", aliases: ["tm1637", "4 digit display"], specs: ["CLK / DIO", "5 V", "colon"] },
  { id: "max7219", name: "MAX7219 LED Matrix", category: "Displays", aliases: ["max7219", "led matrix", "8x8 matrix", "матрица"], specs: ["8×8", "SPI-like", "5 V"] },
  { id: "drv8833", name: "DRV8833 Motor Driver", category: "Drivers", aliases: ["drv8833"], specs: ["1.5 A/ch", "2.7–10.8 V", "MOSFET"] },
  { id: "l9110s", name: "L9110S Motor Driver", category: "Drivers", aliases: ["l9110", "l9110s"], specs: ["800 mA/ch", "2.5–12 V", "2 ch"] },
  { id: "a4988", name: "A4988 Stepper Driver", category: "Drivers", aliases: ["a4988", "stepper driver"], specs: ["2 A", "8–35 V", "STEP / DIR"] },
  { id: "uln2003", name: "28BYJ-48 + ULN2003", category: "Drivers", aliases: ["uln2003", "28byj-48", "28byj48"], specs: ["5 V unipolar", "2048 steps/rev", "4 IN"] },
  { id: "hx711", name: "HX711 Load Cell Amp", category: "Sensors", aliases: ["hx711", "load cell", "scale", "весы"], specs: ["24-bit", "DT / SCK", "2.6–5.5 V"] },
  { id: "sdcard", name: "microSD Card Module", category: "Wireless", aliases: ["sd card", "microsd", "sd module"], specs: ["SPI", "5 V w/ level shift", "FAT32"] },
  { id: "dfplayer", name: "DFPlayer Mini MP3", category: "Actuators", aliases: ["dfplayer", "mp3 player"], specs: ["UART 9600", "3 W amp", "microSD"] },
  { id: "lora", name: "SX1278 LoRa Module", category: "Wireless", aliases: ["lora", "sx1278", "ra-02"], specs: ["433 MHz", "SPI", "3.3 V only"] },
  { id: "pump", name: "Mini Water Pump", category: "Actuators", aliases: ["water pump", "pump", "помпа", "насос"], specs: ["3–5 V", "~200 mA", "submersible"] },
  { id: "tp4056", name: "TP4056 Li-ion Charger", category: "Power", aliases: ["tp4056", "charger", "зарядка"], specs: ["1 A", "USB in", "protection"] },
  { id: "bat9v", name: "9V Battery", category: "Power", aliases: ["9v battery", "крона"], specs: ["9 V", "~500 mAh", "PP3"] },
  { id: "levelshift", name: "Logic Level Shifter", category: "Power", aliases: ["level shifter", "logic level converter"], specs: ["4 ch", "BSS138", "3.3 ↔ 5 V"] },
];

export const PART_BY_ID: ReadonlyMap<string, CatalogPart> = new Map(PARTS.map((p) => [p.id, p]));

export type StarterKitKey = "robot" | "iot" | "almostRobot";
export const STARTER_KITS: { key: StarterKitKey; ids: string[] }[] = [
  { key: "robot", ids: ["uno", "l298n", "tt", "hcsr04", "sg90", "bat2s"] },
  { key: "iot", ids: ["esp32", "dht22", "ssd1306", "relay"] },
  { key: "almostRobot", ids: ["uno", "hcsr04", "tt", "chassis"] },
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
