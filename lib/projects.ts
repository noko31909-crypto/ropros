import type { Locale } from "@/lib/i18n/config";
import type { CoverId } from "@/components/cards/covers";

/** Catalogue. Listing-only entries (no guide yet) are kept for later but not shown: the site lists only real guides. */
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Board = "arduino" | "esp32" | "pi";

export const BOARDS: readonly Board[] = ["arduino", "esp32", "pi"];
export const DIFFICULTIES: readonly Difficulty[] = ["beginner", "intermediate", "advanced"];
export const BOARD_LABEL: Record<Board, string> = { arduino: "Arduino", esp32: "ESP32", pi: "Raspberry Pi" };
export const isBoard = (v: unknown): v is Board => typeof v === "string" && (BOARDS as readonly string[]).includes(v);
export const isDifficulty = (v: unknown): v is Difficulty => typeof v === "string" && (DIFFICULTIES as readonly string[]).includes(v);

export type Project = {
  slug: string;
  title: string;
  summary: Record<Locale, string>;
  board: Board;
  difficulty: Difficulty;
  hours: number;
  robotics: boolean;
  fullGuide: boolean;
  cover: CoverId;
  /** Tailwind aspect class used in masonry layouts. */
  aspect: string;
};

const ALL_PROJECTS: Project[] = [
  { slug: "obstacle-avoiding-robot", title: "Obstacle Avoiding Robot", board: "arduino", difficulty: "intermediate", hours: 5, robotics: true, fullGuide: true, cover: "obstacle", aspect: "aspect-[4/5]",
    summary: { en: "Scans with a servo-mounted ultrasonic sensor and drives toward open space.", ru: "Сканирует пространство ультразвуком на сервоприводе и уезжает туда, где свободно.", kk: "Сервоға орнатылған ультрадыбыс датчигімен айналаны шолып, бос жаққа қарай жүреді." } },
  { slug: "line-follower", title: "Precision Line Following Bot", board: "arduino", difficulty: "intermediate", hours: 4, robotics: true, fullGuide: true, cover: "line", aspect: "aspect-[2/3]",
    summary: { en: "Four IR sensors and a PID loop keep it locked to the black line, even on tight corners.", ru: "Четыре ИК-датчика и PID-регулятор держат робота точно на чёрной линии даже на крутых поворотах.", kk: "Төрт ИҚ датчигі мен PID-реттегіш роботты тік бұрылыстарда да қара сызықта ұстайды." } },
  { slug: "iot-plant-care", title: "IoT Smart Plant Monitor", board: "esp32", difficulty: "beginner", hours: 3, robotics: false, fullGuide: true, cover: "plant", aspect: "aspect-[3/4]",
    summary: { en: "An ESP32 tracks soil moisture, temperature and air, shown on an OLED and your phone.", ru: "ESP32 следит за влажностью почвы, температурой и воздухом и показывает данные на OLED и в телефоне.", kk: "ESP32 топырақ ылғалдылығын, температура мен ауаны бақылап, деректерді OLED пен телефонда көрсетеді." } },
  { slug: "self-balancing-robot", title: "Self-balancing robot", board: "arduino", difficulty: "advanced", hours: 12, robotics: true, fullGuide: false, cover: "balance", aspect: "aspect-[5/7]",
    summary: { en: "Stepper motors hold an inverted pendulum upright with a tuned PID loop.", ru: "Шаговые моторы удерживают перевёрнутый маятник с настроенным PID-регулятором.", kk: "Қадамдық моторлар бапталған PID-реттегішпен төңкерілген маятникті тік ұстайды." } },
  { slug: "mecanum-rover", title: "Mecanum omnidirectional rover", board: "esp32", difficulty: "advanced", hours: 10, robotics: true, fullGuide: false, cover: "mecanum", aspect: "aspect-[15/16]",
    summary: { en: "Drives sideways and diagonally from a phone joystick over Wi-Fi.", ru: "Едет боком и по диагонали с джойстика на телефоне через Wi-Fi.", kk: "Wi-Fi арқылы телефондағы джойстикпен бүйірге және диагональ бойымен жүреді." } },
  { slug: "quadruped-walker", title: "Four-legged walking robot", board: "arduino", difficulty: "advanced", hours: 12, robotics: true, fullGuide: false, cover: "walker", aspect: "aspect-[5/6]",
    summary: { en: "Eight servos walk a stable gait, one leg at a time.", ru: "Восемь сервоприводов шагают устойчивой походкой, по одной ноге за раз.", kk: "Сегіз серво жетек тұрақты жүрістпен бір-бір аяқтан қадам басады." } },
  { slug: "esp32-cam-fpv-rover", title: "ESP32-CAM FPV rover", board: "esp32", difficulty: "advanced", hours: 8, robotics: true, fullGuide: false, cover: "camera", aspect: "aspect-[15/17]",
    summary: { en: "Live video and joystick driving from a single browser page.", ru: "Живое видео и управление джойстиком на одной странице браузера.", kk: "Бір браузер бетінде тікелей видео және джойстикпен басқару." } },
  { slug: "pi-temperature-logger", title: "Pi temperature logger", board: "pi", difficulty: "beginner", hours: 2, robotics: false, fullGuide: false, cover: "logger", aspect: "aspect-square",
    summary: { en: "Writes 1-Wire sensor readings to CSV every ten seconds.", ru: "Пишет показания датчика 1-Wire в CSV каждые десять секунд.", kk: "1-Wire датчигінің көрсеткіштерін әр он секунд сайын CSV-ге жазады." } },
  { slug: "robot-arm", title: "4-DOF desktop robot arm", board: "arduino", difficulty: "intermediate", hours: 6, robotics: true, fullGuide: false, cover: "arm", aspect: "aspect-[3/4]",
    summary: { en: "Four servos and two potentiometer joysticks sort coloured blocks.", ru: "Четыре сервопривода и два джойстика-потенциометра сортируют цветные кубики.", kk: "Төрт серво жетек пен екі потенциометр-джойстик түсті текшелерді сұрыптайды." } },
  { slug: "ultrasonic-radar", title: "Ultrasonic radar sweep", board: "arduino", difficulty: "beginner", hours: 2, robotics: false, fullGuide: false, cover: "radar", aspect: "aspect-[30/31]",
    summary: { en: "A servo sweeps an HC-SR04 and plots echoes as a radar screen.", ru: "Сервопривод вращает HC-SR04 и рисует эхо на экране радара.", kk: "Серво жетек HC-SR04-ті бұрып, жаңғырықты радар экранында көрсетеді." } },
  { slug: "pi-pico-led-matrix", title: "Pico LED matrix badge", board: "pi", difficulty: "beginner", hours: 3, robotics: false, fullGuide: false, cover: "matrix", aspect: "aspect-[6/7]",
    summary: { en: "An 8×8 WS2812 matrix on a Raspberry Pi Pico shows icons and scrolling text.", ru: "Матрица WS2812 8×8 на Raspberry Pi Pico показывает иконки и бегущую строку.", kk: "Raspberry Pi Pico-дағы 8×8 WS2812 матрицасы белгішелер мен жүгіртпе жолды көрсетеді." } },
];

/** Published projects: only entries with a full guide page. */
export const PROJECTS: Project[] = ALL_PROJECTS.filter((p) => p.fullGuide);

/** Home-page showcase order. */
export const FEATURED: Project[] = PROJECTS.slice(0, 8);

/** Real counts for the home page and menus (no hardcoded marketing numbers). */
export const CATALOG_COUNTS = {
  builds: PROJECTS.length,
  robotics: PROJECTS.filter((p) => p.robotics).length,
  platforms: new Set(PROJECTS.map((p) => p.board)).size,
};

/** Card link: full guides open their page; listings fall back to a hub search (never a 404). */
export const projectHref = (p: Project) => (p.fullGuide ? `/projects/${p.slug}` : `/projects?q=${encodeURIComponent(p.title)}`);

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export type ProjectFilters = { q?: string; board?: Board; difficulty?: Difficulty; robotics?: boolean };

export function filterProjects(list: Project[], f: ProjectFilters, locale: Locale): Project[] {
  const q = f.q?.trim().toLowerCase() ?? "";
  return list.filter((p) =>
    (!f.board || p.board === f.board) &&
    (!f.difficulty || p.difficulty === f.difficulty) &&
    (!f.robotics || p.robotics) &&
    (!q || `${p.title} ${p.summary[locale]} ${p.summary.en} ${BOARD_LABEL[p.board]}`.toLowerCase().includes(q)));
}
