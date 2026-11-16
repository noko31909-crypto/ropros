import { defineMessages } from "../config";

/** Site search palette (Ctrl+K / ⌘K, or the search button in the header). */
export const searchMessages = defineMessages({
  en: {
    open: "Search", label: "Search ropros", placeholder: "Search builds, parts, pages…", close: "Close search",
    groups: { guide: "Guides", part: "Parts", page: "Pages" },
    partNote: "Find builds with this part",
    empty: (q: string) => `Nothing found for “${q}”.`,
    emptyHint: "Try a part like HC-SR04, a board like ESP32, or a word like robot.",
    keys: "↑ ↓ to move · Enter to open · Esc to close",
    loading: "Loading…",
  },
  ru: {
    open: "Поиск", label: "Поиск по ropros", placeholder: "Поиск сборок, деталей, страниц…", close: "Закрыть поиск",
    groups: { guide: "Гайды", part: "Детали", page: "Страницы" },
    partNote: "Найти сборки с этой деталью",
    empty: (q: string) => `По запросу «${q}» ничего не найдено.`,
    emptyHint: "Попробуйте деталь вроде HC-SR04, плату вроде ESP32 или слово «робот».",
    keys: "↑ ↓ выбор · Enter открыть · Esc закрыть",
    loading: "Загрузка…",
  },
  kk: {
    open: "Іздеу", label: "ropros бойынша іздеу", placeholder: "Құрастыру, бөлшек, бет іздеу…", close: "Іздеуді жабу",
    groups: { guide: "Нұсқаулықтар", part: "Бөлшектер", page: "Беттер" },
    partNote: "Осы бөлшегі бар құрастыруларды табу",
    empty: (q: string) => `«${q}» бойынша ештеңе табылмады.`,
    emptyHint: "HC-SR04 сияқты бөлшекті, ESP32 сияқты тақтаны немесе «робот» сөзін көріңіз.",
    keys: "↑ ↓ таңдау · Enter ашу · Esc жабу",
    loading: "Жүктелуде…",
  },
});
