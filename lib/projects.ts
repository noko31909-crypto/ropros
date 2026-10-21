/** Placeholder records so the layout renders. Replace with your catalog source (DB or CMS). */
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Board = "Arduino" | "ESP32" | "Raspberry Pi";
/** image: a photo URL (allowed host in next.config) or a file in /public. aspect drives the Pinterest-style masonry height. */
export type Project = { slug: string; title: string; summary: string; board: Board; difficulty: Difficulty; hours: number; robotics: boolean; fullGuide: boolean;
  image: string; imageAlt: string; aspect: "portrait" | "tall" | "square" };

export const FEATURED: Project[] = [
  { slug: "obstacle-avoiding-robot", title: "Obstacle Avoiding Robot", summary: "Scans with a servo-mounted ultrasonic sensor and turns toward open space.", board: "Arduino", difficulty: "Intermediate", hours: 5, robotics: true, fullGuide: true,
    image: "/covers/obstacle-avoiding-robot.jpg", imageAlt: "Two-wheel Arduino robot with an ultrasonic sensor", aspect: "portrait" },
  { slug: "precision-line-following-bot", title: "Precision Line Following Bot", summary: "Four IR sensors and a PID loop keep it locked to the line through tight corners.", board: "Arduino", difficulty: "Intermediate", hours: 4, robotics: true, fullGuide: true,
    image: "/covers/line-following-bot.jpg", imageAlt: "Small robot following a black line on a white track", aspect: "tall" },
  { slug: "iot-smart-plant-monitor", title: "IoT Smart Plant Monitor", summary: "An ESP32 tracks soil moisture, temperature and humidity on an OLED and your phone.", board: "ESP32", difficulty: "Beginner", hours: 3, robotics: false, fullGuide: true,
    image: "/covers/smart-plant-monitor.jpg", imageAlt: "Potted plant with a soil sensor wired to an ESP32 and OLED", aspect: "portrait" },
  { slug: "two-wheel-self-balancing-robot", title: "Self-balancing robot", summary: "Steppers keep an inverted pendulum upright with a tuned PID loop.", board: "Arduino", difficulty: "Advanced", hours: 12, robotics: true, fullGuide: true,
    image: "/covers/self-balancing-robot.jpg", imageAlt: "Tall two-wheeled balancing robot", aspect: "tall" },
  { slug: "esp32-cam-fpv-rover", title: "ESP32-CAM FPV rover", summary: "Live video and joystick driving from one browser page.", board: "ESP32", difficulty: "Advanced", hours: 8, robotics: true, fullGuide: true,
    image: "/covers/esp32-cam-rover.jpg", imageAlt: "Small rover with a camera module on the front", aspect: "square" },
  { slug: "raspberry-pi-ds18b20-temperature-logger", title: "Pi temperature logger", summary: "Logs 1-Wire probe readings to CSV every ten seconds.", board: "Raspberry Pi", difficulty: "Beginner", hours: 2, robotics: false, fullGuide: true,
    image: "/covers/pi-temperature-logger.jpg", imageAlt: "Raspberry Pi with a waterproof temperature probe", aspect: "square" },
];

export const CATALOG_STATS = [
  { value: "166", label: "hardware builds" },
  { value: "40", label: "robotics guides" },
  { value: "3", label: "platforms: Arduino, ESP32, Pi" },
] as const;
