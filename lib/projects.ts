import type { Locale } from "@/lib/i18n/config";
import { GUIDE_CATALOG } from "@/content/guides/catalog";
import { coverFor } from "@/lib/cover-art";
import { BOARD_LABEL, type Board, type Difficulty, type Project } from "@/lib/project-meta";

export { BOARDS, BOARD_LABEL, DIFFICULTIES, isBoard, isDifficulty, projectHref } from "@/lib/project-meta";
export type { Board, Difficulty, Project } from "@/lib/project-meta";

/**
 * Catalogue. Listing-only entries (no guide yet) are kept for later but not shown: the site lists only real guides.
 * Built from content/guides/catalog.ts, never from the full guides, so client components can import it cheaply.
 */
const ALL_PROJECTS: Project[] = [
  { slug: "obstacle-avoiding-robot", title: { en: "Obstacle Avoiding Robot", ru: "Робот, объезжающий препятствия", kk: "Кедергіні айналып өтетін робот" }, board: "arduino", difficulty: "intermediate", hours: 5, robotics: true, fullGuide: true, cover: "obstacle", aspect: "aspect-[4/5]",
    summary: { en: "Scans with a servo-mounted ultrasonic sensor and drives toward open space.", ru: "Сканирует пространство ультразвуком на сервоприводе и уезжает туда, где свободно.", kk: "Сервоға орнатылған ультрадыбыс датчигімен айналаны шолып, бос жаққа қарай жүреді." } },
  { slug: "line-follower", title: { en: "Precision Line Following Bot", ru: "Точный робот, едущий по линии", kk: "Сызық бойымен дәл жүретін робот" }, board: "arduino", difficulty: "intermediate", hours: 4, robotics: true, fullGuide: true, cover: "line", aspect: "aspect-[2/3]",
    summary: { en: "Four IR sensors and a PID loop keep it locked to the black line, even on tight corners.", ru: "Четыре ИК-датчика и PID-регулятор держат робота точно на чёрной линии даже на крутых поворотах.", kk: "Төрт ИҚ датчигі мен PID-реттегіш роботты тік бұрылыстарда да қара сызықта ұстайды." } },
  { slug: "iot-plant-care", title: { en: "IoT Smart Plant Monitor", ru: "Умный IoT-монитор для растений", kk: "Өсімдікке арналған ақылды IoT-монитор" }, board: "esp32", difficulty: "beginner", hours: 3, robotics: false, fullGuide: true, cover: "plant", aspect: "aspect-[3/4]",
    summary: { en: "An ESP32 tracks soil moisture, temperature and air, shown on an OLED and your phone.", ru: "ESP32 следит за влажностью почвы, температурой и воздухом и показывает данные на OLED и в телефоне.", kk: "ESP32 топырақ ылғалдылығын, температура мен ауаны бақылап, деректерді OLED пен телефонда көрсетеді." } },
  { slug: "self-balancing-robot", title: { en: "Self-balancing robot", ru: "Балансирующий робот", kk: "Тепе-теңдік сақтайтын робот" }, board: "arduino", difficulty: "advanced", hours: 12, robotics: true, fullGuide: false, cover: "balance", aspect: "aspect-[5/7]",
    summary: { en: "Stepper motors hold an inverted pendulum upright with a tuned PID loop.", ru: "Шаговые моторы удерживают перевёрнутый маятник с настроенным PID-регулятором.", kk: "Қадамдық моторлар бапталған PID-реттегішпен төңкерілген маятникті тік ұстайды." } },
  { slug: "mecanum-rover", title: { en: "Mecanum omnidirectional rover", ru: "Всенаправленный ровер на колёсах Mecanum", kk: "Mecanum дөңгелекті жан-жақты ровер" }, board: "esp32", difficulty: "advanced", hours: 10, robotics: true, fullGuide: false, cover: "mecanum", aspect: "aspect-[15/16]",
    summary: { en: "Drives sideways and diagonally from a phone joystick over Wi-Fi.", ru: "Едет боком и по диагонали с джойстика на телефоне через Wi-Fi.", kk: "Wi-Fi арқылы телефондағы джойстикпен бүйірге және диагональ бойымен жүреді." } },
  { slug: "quadruped-walker", title: { en: "Four-legged walking robot", ru: "Четвероногий шагающий робот", kk: "Төрт аяқты жүретін робот" }, board: "arduino", difficulty: "advanced", hours: 12, robotics: true, fullGuide: false, cover: "walker", aspect: "aspect-[5/6]",
    summary: { en: "Eight servos walk a stable gait, one leg at a time.", ru: "Восемь сервоприводов шагают устойчивой походкой, по одной ноге за раз.", kk: "Сегіз серво жетек тұрақты жүрістпен бір-бір аяқтан қадам басады." } },
  { slug: "esp32-cam-fpv-rover", title: { en: "ESP32-CAM FPV rover", ru: "FPV-ровер на ESP32-CAM", kk: "ESP32-CAM негізіндегі FPV-ровер" }, board: "esp32", difficulty: "advanced", hours: 8, robotics: true, fullGuide: false, cover: "camera", aspect: "aspect-[15/17]",
    summary: { en: "Live video and joystick driving from a single browser page.", ru: "Живое видео и управление джойстиком на одной странице браузера.", kk: "Бір браузер бетінде тікелей видео және джойстикпен басқару." } },
  { slug: "pi-temperature-logger", title: { en: "Pi temperature logger", ru: "Логгер температуры на Raspberry Pi", kk: "Raspberry Pi температура логгері" }, board: "pi", difficulty: "beginner", hours: 2, robotics: false, fullGuide: false, cover: "logger", aspect: "aspect-square",
    summary: { en: "Writes 1-Wire sensor readings to CSV every ten seconds.", ru: "Пишет показания датчика 1-Wire в CSV каждые десять секунд.", kk: "1-Wire датчигінің көрсеткіштерін әр он секунд сайын CSV-ге жазады." } },
  { slug: "robot-arm", title: { en: "4-DOF desktop robot arm", ru: "Настольная роборука с 4 степенями свободы", kk: "4 еркіндік дәрежелі үстел робот-қолы" }, board: "arduino", difficulty: "intermediate", hours: 6, robotics: true, fullGuide: false, cover: "arm", aspect: "aspect-[3/4]",
    summary: { en: "Four servos and two potentiometer joysticks sort coloured blocks.", ru: "Четыре сервопривода и два джойстика-потенциометра сортируют цветные кубики.", kk: "Төрт серво жетек пен екі потенциометр-джойстик түсті текшелерді сұрыптайды." } },
  { slug: "ultrasonic-radar", title: { en: "Ultrasonic radar sweep", ru: "Ультразвуковой радар", kk: "Ультрадыбыстық радар" }, board: "arduino", difficulty: "beginner", hours: 2, robotics: false, fullGuide: false, cover: "radar", aspect: "aspect-[30/31]",
    summary: { en: "A servo sweeps an HC-SR04 and plots echoes as a radar screen.", ru: "Сервопривод вращает HC-SR04 и рисует эхо на экране радара.", kk: "Серво жетек HC-SR04-ті бұрып, жаңғырықты радар экранында көрсетеді." } },
  { slug: "pi-pico-led-matrix", title: { en: "Pico LED matrix badge", ru: "LED-матрица-значок на Pico", kk: "Pico негізіндегі LED-матрица белгісі" }, board: "pi", difficulty: "beginner", hours: 3, robotics: false, fullGuide: false, cover: "matrix", aspect: "aspect-[6/7]",
    summary: { en: "An 8×8 WS2812 matrix on a Raspberry Pi Pico shows icons and scrolling text.", ru: "Матрица WS2812 8×8 на Raspberry Pi Pico показывает иконки и бегущую строку.", kk: "Raspberry Pi Pico-дағы 8×8 WS2812 матрицасы белгішелер мен жүгіртпе жолды көрсетеді." } },
];

const ASPECTS = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[2/3]", "aspect-[5/6]", "aspect-[6/7]"] as const;
const BOARD_OF = { arduino: "arduino", esp32: "esp32", raspberry_pi: "pi" } as const satisfies Record<string, Board>;

/** Every guide file in content/guides becomes a published card (from the generated catalog: card fields only). */
const CHIP_LABEL: Partial<Record<string, string>> = { "esp8266-nodemcu": "ESP8266", "esp32-cam": "ESP32-CAM", "raspberry-pi-pico": "Pi Pico" };

const CONTENT_PROJECTS: Project[] = GUIDE_CATALOG.map((g, i) => ({
  slug: g.slug, title: g.title, summary: g.summary, board: BOARD_OF[g.platform], ...(CHIP_LABEL[g.board] ? { boardLabel: CHIP_LABEL[g.board] } : {}), difficulty: g.difficulty, hours: g.hours,
  robotics: g.robotics, fullGuide: true, cover: coverFor(g), aspect: ASPECTS[i % ASPECTS.length] ?? "aspect-[4/5]",
}));

/** Published projects: only entries with a full guide page. */
export const PROJECTS: Project[] = [...ALL_PROJECTS.filter((p) => p.fullGuide), ...CONTENT_PROJECTS];

/** Home-page showcase: robotics guides only (the section is titled "Featured robotics guides"). */
export const FEATURED: Project[] = PROJECTS.filter((p) => p.robotics).slice(0, 8);

/** Real counts for the home page and menus (no hardcoded marketing numbers). */
export const CATALOG_COUNTS = {
  builds: PROJECTS.length,
  robotics: PROJECTS.filter((p) => p.robotics).length,
  platforms: new Set(PROJECTS.map((p) => p.board)).size,
};

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export type ProjectFilters = { q?: string; board?: Board; difficulty?: Difficulty; robotics?: boolean };

export function filterProjects(list: Project[], f: ProjectFilters, locale: Locale): Project[] {
  const q = f.q?.trim().toLowerCase() ?? "";
  return list.filter((p) =>
    (!f.board || p.board === f.board) &&
    (!f.difficulty || p.difficulty === f.difficulty) &&
    (!f.robotics || p.robotics) &&
    (!q || `${p.title[locale]} ${p.title.en} ${p.summary[locale]} ${p.summary.en} ${BOARD_LABEL[p.board]}`.toLowerCase().includes(q)));
}
