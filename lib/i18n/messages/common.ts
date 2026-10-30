import { defineMessages } from "../config";

/** Shared chrome: navigation, footer, tab bar, levels, difficulty, platform labels. */
export const common = defineMessages({
  en: {
    nav: {
      hub: "Project Hub", allBuilds: "All builds", allBuildsDesc: "Builds on Arduino, ESP32 and Raspberry Pi",
      robotics: "Robotics guides", roboticsDesc: "Full guides: rovers, line followers and more",
      arduinoDesc: "Uno, Nano and Mega", esp32Desc: "Wi-Fi, Bluetooth and camera",
      components: "Components", ai: "AI Tools", finder: "Project Finder", finderDesc: "List your parts, get buildable projects",
      assistant: "Build Assistant", assistantDesc: "Ask about wiring, code and debugging",
      generator: "Project Generator", generatorDesc: "Idea in, plan, 3D model, wiring and code out",
      community: "Community", new: "new", main: "Main navigation", menu: "Menu", close: "Close menu",
      search: "Search builds, parts…", searchShort: "Search", saved: "Saved builds", savedToast: "Saved builds live in your profile",
    },
    tabs: { home: "Home", projects: "Projects", finder: "Finder", community: "Community", profile: "Profile", signIn: "Sign in" },
    footer: {
      tagline: "A repository of hardware builds for engineers and makers: wiring, code and guides for Arduino, ESP32 and Raspberry Pi.",
      build: "Builds", aiTools: "AI tools", community: "Community", buildLogs: "Build logs", guides: "Guides",
      rights: "ropros", safety: "Check every circuit against its datasheets before powering it.",
    },
    auth: { signIn: "Sign in", register: "Register", signOut: "Sign out", profile: "Profile", level: "Level" },
    levels: ["Rookie Builder", "Circuit Apprentice", "Sensor Scout", "IoT Knight", "Robotics Architect", "Master Maker"],
    difficulty: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
    hours: (h: number) => `${h} h`,
    skip: "Skip to content",
  },
  ru: {
    nav: {
      hub: "Project Hub", allBuilds: "Все сборки", allBuildsDesc: "Сборки на Arduino, ESP32 и Raspberry Pi",
      robotics: "Гайды по робототехнике", roboticsDesc: "Полные гайды: роверы, роботы по линии и другие",
      arduinoDesc: "Uno, Nano и Mega", esp32Desc: "Wi-Fi, Bluetooth и камера",
      components: "Компоненты", ai: "AI-инструменты", finder: "Project Finder", finderDesc: "Укажите свои детали — получите проекты",
      assistant: "Build Assistant", assistantDesc: "Вопросы о проводке, коде и отладке",
      generator: "Генератор проектов", generatorDesc: "Идея на входе: план, 3D-модель, схема и код на выходе",
      community: "Сообщество", new: "new", main: "Основная навигация", menu: "Меню", close: "Закрыть меню",
      search: "Поиск сборок, деталей…", searchShort: "Поиск", saved: "Сохранённые сборки", savedToast: "Сохранённые сборки — в профиле",
    },
    tabs: { home: "Главная", projects: "Проекты", finder: "Finder", community: "Сообщество", profile: "Профиль", signIn: "Войти" },
    footer: {
      tagline: "Репозиторий аппаратных сборок для инженеров и мейкеров: схемы, код и гайды для Arduino, ESP32 и Raspberry Pi.",
      build: "Сборки", aiTools: "AI-инструменты", community: "Сообщество", buildLogs: "Журналы сборок", guides: "Гайды",
      rights: "ropros", safety: "Перед подачей питания сверяйте схему с даташитами.",
    },
    auth: { signIn: "Войти", register: "Регистрация", signOut: "Выйти", profile: "Профиль", level: "Уровень" },
    levels: ["Новичок-сборщик", "Ученик схемотехника", "Разведчик датчиков", "IoT-рыцарь", "Архитектор роботов", "Мастер-мейкер"],
    difficulty: { beginner: "Начальный", intermediate: "Средний", advanced: "Продвинутый" },
    hours: (h: number) => `${h} ч`,
    skip: "Перейти к содержимому",
  },
  kk: {
    nav: {
      hub: "Project Hub", allBuilds: "Барлық құрастырулар", allBuildsDesc: "Arduino, ESP32 және Raspberry Pi-дағы құрастырулар",
      robotics: "Робототехника нұсқаулықтары", roboticsDesc: "Толық нұсқаулықтар: роверлер, сызық бойымен жүретін роботтар және т.б.",
      arduinoDesc: "Uno, Nano және Mega", esp32Desc: "Wi-Fi, Bluetooth және камера",
      components: "Компоненттер", ai: "AI құралдары", finder: "Project Finder", finderDesc: "Бөлшектеріңізді жазыңыз — жобалар алыңыз",
      assistant: "Build Assistant", assistantDesc: "Сымдар, код және жөндеу туралы сұрақтар",
      generator: "Жоба генераторы", generatorDesc: "Идея беріңіз: жоспар, 3D модель, сызба және код аласыз",
      community: "Қауымдастық", new: "жаңа", main: "Негізгі навигация", menu: "Мәзір", close: "Мәзірді жабу",
      search: "Құрастыру, бөлшек іздеу…", searchShort: "Іздеу", saved: "Сақталған құрастырулар", savedToast: "Сақталған құрастырулар — профильде",
    },
    tabs: { home: "Басты", projects: "Жобалар", finder: "Finder", community: "Қауымдастық", profile: "Профиль", signIn: "Кіру" },
    footer: {
      tagline: "Инженерлер мен мейкерлерге арналған аппараттық құрастырулар қоры: Arduino, ESP32 және Raspberry Pi үшін схемалар, код және нұсқаулықтар.",
      build: "Құрастырулар", aiTools: "AI құралдары", community: "Қауымдастық", buildLogs: "Құрастыру журналдары", guides: "Нұсқаулықтар",
      rights: "ropros", safety: "Қуат бермес бұрын схеманы даташиттермен салыстырыңыз.",
    },
    auth: { signIn: "Кіру", register: "Тіркелу", signOut: "Шығу", profile: "Профиль", level: "Деңгей" },
    levels: ["Жаңа құрастырушы", "Схема шәкірті", "Датчик барлаушысы", "IoT рыцары", "Робот сәулетшісі", "Шебер мейкер"],
    difficulty: { beginner: "Бастапқы", intermediate: "Орташа", advanced: "Жоғары" },
    hours: (h: number) => `${h} сағ`,
    skip: "Мазмұнға өту",
  },
});

/** XP floors for levels 1–6. Must match the generated users.level column in supabase/migrations/0001_init.sql. */
export const LEVEL_FLOORS = [0, 150, 400, 700, 1100, 1600] as const;
