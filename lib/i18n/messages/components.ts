import { defineMessages } from "../config";
import type { PartCategory } from "../../parts-catalog";

type Cats = Record<PartCategory, string>;

/** Component library page + localised part category names (shared with the finder). */
export const components = defineMessages({
  en: {
    metaTitle: "Component Library",
    title: "Component Library",
    description: "Pinouts, voltages and the gotchas behind most failed builds. Pick a part to send it to the Project Finder.",
    categories: { Boards: "Boards", Sensors: "Sensors", Actuators: "Actuators", Drivers: "Drivers", Displays: "Displays", Wireless: "Wireless", Power: "Power", Mechanical: "Mechanical" } as Cats,
    all: "All",
    searchLabel: "Search components",
    searchPlaceholder: "Search by name or alias: servo, oled, 18650…",
    count: (n: number) => `${n} part${n === 1 ? "" : "s"}`,
    findBuilds: "Find builds with this part",
    empty: (q: string) => `No part matches “${q}”.`,
    resetFilters: "Reset filters",
    filterLabel: "Filter by category",
  },
  ru: {
    metaTitle: "Библиотека компонентов",
    title: "Component Library",
    description: "Распиновки, напряжения и подводные камни, из-за которых проваливается большинство сборок. Выберите деталь, чтобы отправить её в Project Finder.",
    categories: { Boards: "Платы", Sensors: "Датчики", Actuators: "Приводы", Drivers: "Драйверы", Displays: "Дисплеи", Wireless: "Связь", Power: "Питание", Mechanical: "Механика" },
    all: "Все",
    searchLabel: "Поиск компонентов",
    searchPlaceholder: "Название или синоним: servo, oled, 18650…",
    count: (n: number) => `деталей: ${n}`,
    findBuilds: "Найти сборки с этой деталью",
    empty: (q: string) => `Нет деталей по запросу «${q}».`,
    resetFilters: "Сбросить фильтры",
    filterLabel: "Фильтр по категории",
  },
  kk: {
    metaTitle: "Компоненттер кітапханасы",
    title: "Component Library",
    description: "Пиндер, кернеулер және құрастырулардың көбін сәтсіз ететін тұзақтар. Бөлшекті таңдап, оны Project Finder-ге жіберіңіз.",
    categories: { Boards: "Платалар", Sensors: "Датчиктер", Actuators: "Жетектер", Drivers: "Драйверлер", Displays: "Дисплейлер", Wireless: "Байланыс", Power: "Қуат", Mechanical: "Механика" },
    all: "Барлығы",
    searchLabel: "Компоненттерді іздеу",
    searchPlaceholder: "Атауы не синонимі: servo, oled, 18650…",
    count: (n: number) => `бөлшек: ${n}`,
    findBuilds: "Осы бөлшекпен құрастыруларды табу",
    empty: (q: string) => `«${q}» бойынша бөлшек жоқ.`,
    resetFilters: "Сүзгілерді тазалау",
    filterLabel: "Санат бойынша сүзу",
  },
});
