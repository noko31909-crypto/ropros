/**
 * Every hardware component a guide may use. lib/hardware/components.ts must define exactly these ids
 * (checked at import time). Add new parts here first, then to the registry.
 */
export const COMPONENT_IDS = [
  // Boards
  "arduino-uno", "arduino-nano", "arduino-mega", "esp32-devkit", "esp8266-nodemcu", "esp32-cam", "raspberry-pi-4", "raspberry-pi-pico",
  // Passives & basic I/O
  "led", "rgb-led", "resistor", "potentiometer", "push-button", "slide-switch", "ldr", "buzzer-active", "buzzer-passive", "capacitor",
  "diode", "npn-transistor", "mosfet-n", "ir-led",
  // Sensors
  "hc-sr04", "pir-hc-sr501", "dht11", "dht22", "ds18b20", "bmp280", "bme280", "mpu6050", "soil-moisture-capacitive", "water-level",
  "ldr-module", "sound-sensor", "ir-receiver-vs1838b", "tcrt5000", "ir-obstacle", "line-sensor-array", "hall-sensor-a3144", "reed-switch",
  "mq2-gas", "mq135-air", "flame-sensor", "rain-sensor", "touch-ttp223", "joystick", "rotary-encoder", "keypad-4x4", "hx711-load-cell",
  "max30102", "ina219", "acs712", "vl53l0x", "gy-271-compass", "rtc-ds3231", "neo-6m-gps", "rc522-rfid", "tilt-switch", "vibration-sw420",
  // Displays
  "lcd-1602-i2c", "oled-ssd1306", "tm1637-display", "max7219-matrix", "ws2812b-strip", "ws2812b-ring", "seven-segment", "tft-st7735", "e-paper-2in9",
  // Actuators & drivers
  "servo-sg90", "servo-mg996r", "dc-motor", "l298n", "l9110s", "tb6612fng", "drv8833", "stepper-28byj48", "uln2003", "a4988", "stepper-nema17",
  "relay-module", "water-pump", "solenoid-lock", "vibration-motor", "fan-5v",
  // Wireless & storage & audio
  "hc-05", "nrf24l01", "lora-sx1278", "sd-card-module", "dfplayer-mini", "speaker-8ohm", "ir-remote", "microphone-max9814",
  // Power
  "battery-9v", "battery-2s-lipo", "battery-4xaa", "battery-18650", "buck-converter-lm2596", "tp4056-charger", "usb-5v", "breadboard-power-module",
  "level-shifter",
  // Mechanical (parts list only, not drawn)
  "robot-chassis-2wd", "robot-chassis-4wd", "mecanum-wheels", "breadboard", "jumper-wires", "enclosure",
] as const;

export type ComponentId = (typeof COMPONENT_IDS)[number];
export const isComponentId = (v: unknown): v is ComponentId => typeof v === "string" && (COMPONENT_IDS as readonly string[]).includes(v);
