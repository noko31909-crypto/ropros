import type { Locale } from "./i18n/config.ts";

/**
 * Title and summary of the three hand-written guides in lib/guides.ts, shared with the hub cards (lib/projects.ts) and
 * the finder (lib/finder/projects-data.ts) so the same guide never shows under two names. Client-safe: no guide bodies.
 */
type Card = { title: Record<Locale, string>; summary: Record<Locale, string> };

export const HANDWRITTEN_CARDS = {
  "obstacle-avoiding-robot": {
    title: { en: "Obstacle Avoiding Robot", ru: "Робот, объезжающий препятствия", kk: "Кедергіні айналып өтетін робот" },
    summary: {
      en: "Drives forward while the way is clear, then a servo swings the sensor left and right and the robot turns toward the side with more room.",
      ru: "Едет вперёд, пока впереди свободно, затем сервопривод поворачивает датчик влево и вправо, и робот уезжает в сторону, где больше места.",
      kk: "Алдыңғы жол бос болғанша алға жүреді, содан кейін серво датчикті солға және оңға бұрады, ал робот бос орны көп жаққа бұрылады.",
    },
  },
  "line-follower": {
    title: { en: "PID Line Follower", ru: "Робот по линии с PID", kk: "PID сызық бойымен жүретін робот" },
    summary: {
      en: "Four TCRT5000 IR sensors read a black line and a PID loop on an Arduino Nano steers two DC motors smoothly along it.",
      ru: "Четыре ИК-датчика TCRT5000 видят чёрную линию, а PID-регулятор на Arduino Nano плавно ведёт по ней два мотора.",
      kk: "Төрт TCRT5000 ИҚ датчигі қара сызықты оқиды, ал Arduino Nano-дағы PID реттегіш екі моторды сызық бойымен бірқалыпты басқарады.",
    },
  },
  "iot-plant-care": {
    title: { en: "IoT Plant Care Station", ru: "IoT-станция ухода за растением", kk: "Өсімдік күтімінің IoT станциясы" },
    summary: {
      en: "An ESP32 reads soil moisture, temperature and humidity, shows them on an OLED, waters the plant through a relay-driven pump and serves a live page on your Wi-Fi.",
      ru: "ESP32 измеряет влажность почвы, температуру и влажность воздуха, выводит их на OLED, поливает растение через насос на реле и показывает живую страницу в вашей Wi-Fi-сети.",
      kk: "ESP32 топырақ ылғалдылығын, температура мен ауа ылғалдылығын өлшеп, OLED-ке шығарады, реле арқылы сорғымен өсімдікті суарады және Wi-Fi желісінде тірі бет көрсетеді.",
    },
  },
} as const satisfies Record<string, Card>;
