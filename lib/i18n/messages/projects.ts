import { defineMessages } from "../config";

export const projects = defineMessages({
  en: {
    metaTitle: "Project Hub",
    title: "Project Hub",
    description: "Step-by-step builds on Arduino, ESP32 and Raspberry Pi. Filter by board, category and difficulty.",
    searchLabel: "Search projects", searchPlaceholder: "Search builds, boards, sensors…",
    filters: "Filters", category: "Category", roboticsOnly: "Robotics only", board: "Board", difficulty: "Difficulty", any: "Any",
    reset: "Reset filters",
    results: (n: number) => (n === 1 ? "1 result" : `${n} results`), demo: "(demo data)",
    empty: "Nothing found. Try resetting the filters.",
    card: { fullGuide: "Full guide", save: "Save", saveLabel: (t: string) => `Save ${t}`, unsave: (t: string) => `Remove ${t} from saved`, coverAlt: (t: string) => `Illustration: ${t}` },
  },
  ru: {
    metaTitle: "Project Hub",
    title: "Project Hub",
    description: "Пошаговые сборки на Arduino, ESP32 и Raspberry Pi. Фильтруйте по плате, категории и сложности.",
    searchLabel: "Поиск проектов", searchPlaceholder: "Поиск сборок, плат, датчиков…",
    filters: "Фильтры", category: "Категория", roboticsOnly: "Только робототехника", board: "Плата", difficulty: "Сложность", any: "Любая",
    reset: "Сбросить фильтры",
    results: (n: number) => {
      const m10 = n % 10, m100 = n % 100;
      const w = m10 === 1 && m100 !== 11 ? "результат" : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? "результата" : "результатов";
      return `${n} ${w}`;
    },
    demo: "(демо-данные)",
    empty: "Ничего не найдено. Сбросьте фильтры.",
    card: { fullGuide: "Полный гайд", save: "Сохранить", saveLabel: (t: string) => `Сохранить «${t}»`, unsave: (t: string) => `Убрать «${t}» из сохранённых`, coverAlt: (t: string) => `Иллюстрация: ${t}` },
  },
  kk: {
    metaTitle: "Project Hub",
    title: "Project Hub",
    description: "Arduino, ESP32 және Raspberry Pi-дағы қадамдық құрастырулар. Плата, санат және күрделілік бойынша сүзіңіз.",
    searchLabel: "Жобаларды іздеу", searchPlaceholder: "Құрастыру, тақта, датчик іздеу…",
    filters: "Сүзгілер", category: "Санат", roboticsOnly: "Тек робототехника", board: "Тақта", difficulty: "Күрделілік", any: "Кез келген",
    reset: "Сүзгілерді тазалау",
    results: (n: number) => `${n} нәтиже`, demo: "(демо-деректер)",
    empty: "Ештеңе табылмады. Сүзгілерді тазалап көріңіз.",
    card: { fullGuide: "Толық нұсқаулық", save: "Сақтау", saveLabel: (t: string) => `«${t}» сақтау`, unsave: (t: string) => `«${t}» сақталғандардан алып тастау`, coverAlt: (t: string) => `Иллюстрация: ${t}` },
  },
});
