import { defineMessages } from "../config";

/** Shared chrome: navigation, footer, tab bar, levels, difficulty, platform labels. */
export const common = defineMessages({
  en: {
    nav: {
      hub: "Project Hub", allBuilds: "All builds", allBuildsDesc: "Builds on Arduino, ESP32 and Raspberry Pi",
      robotics: "Robotics guides", roboticsDesc: "Full guides: rovers, line followers and more",
      arduinoDesc: "Uno, Nano and Mega", esp32Desc: "Wi-Fi, Bluetooth and camera",
      components: "Components", finder: "Project Finder", finderDesc: "List your parts, get buildable projects",
      community: "Community", new: "new", main: "Main navigation", menu: "Menu", close: "Close menu",
      search: "Search builds, parts…", searchShort: "Search", saved: "Saved builds", savedToast: "Saved builds live in your profile",
    },
    notFound: { title: "Page not found", body: "This page doesn’t exist or has moved. The guides, parts and the Project Finder are one tap away.", home: "Home", hub: "Browse guides" },
    tabs: { home: "Home", projects: "Projects", finder: "Finder", community: "Community", profile: "Profile", signIn: "Sign in" },
    footer: {
      tagline: "A repository of hardware builds for engineers and makers: wiring, code and guides for Arduino, ESP32 and Raspberry Pi.",
      build: "Builds", community: "Community", buildLogs: "Build logs", guides: "Guides",
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
      components: "Компоненты", finder: "Project Finder", finderDesc: "Укажите свои детали — получите проекты",
      community: "Сообщество", new: "new", main: "Основная навигация", menu: "Меню", close: "Закрыть меню",
      search: "Поиск сборок, деталей…", searchShort: "Поиск", saved: "Сохранённые сборки", savedToast: "Сохранённые сборки — в профиле",
    },
    notFound: { title: "Страница не найдена", body: "Такой страницы нет или она переехала. Гайды, детали и Project Finder — в одном нажатии.", home: "На главную", hub: "Открыть гайды" },
    tabs: { home: "Главная", projects: "Проекты", finder: "Подбор", community: "Сообщество", profile: "Профиль", signIn: "Войти" },
    footer: {
      tagline: "Репозиторий аппаратных сборок для инженеров и мейкеров: схемы, код и гайды для Arduino, ESP32 и Raspberry Pi.",
      build: "Сборки", community: "Сообщество", buildLogs: "Журналы сборок", guides: "Гайды",
      rights: "ropros", safety: "Перед подачей питания сверяйте схему с даташитами.",
    },
    auth: { signIn: "Войти", register: "Регистрация", signOut: "Выйти", profile: "Профиль", level: "Уровень" },
    levels: ["Новичок-сборщик", "Ученик схемотехника", "Разведчик датчиков", "IoT-рыцарь", "Архитектор роботов", "Мастер-мейкер"],
    difficulty: { beginner: "Начальный", intermediate: "Средний", advanced: "Продвинутый" },
    hours: (h: number) => `${h.toLocaleString("ru-RU")} ч`,
    skip: "Перейти к содержимому",
  },
  kk: {
    nav: {
      hub: "Project Hub", allBuilds: "Барлық құрастырулар", allBuildsDesc: "Arduino, ESP32 және Raspberry Pi-дағы құрастырулар",
      robotics: "Робототехника нұсқаулықтары", roboticsDesc: "Толық нұсқаулықтар: роверлер, сызық бойымен жүретін роботтар және т.б.",
      arduinoDesc: "Uno, Nano және Mega", esp32Desc: "Wi-Fi, Bluetooth және камера",
      components: "Компоненттер", finder: "Project Finder", finderDesc: "Бөлшектеріңізді жазыңыз — жобалар алыңыз",
      community: "Қауымдастық", new: "жаңа", main: "Негізгі навигация", menu: "Мәзір", close: "Мәзірді жабу",
      search: "Құрастыру, бөлшек іздеу…", searchShort: "Іздеу", saved: "Сақталған құрастырулар", savedToast: "Сақталған құрастырулар — профильде",
    },
    notFound: { title: "Бет табылмады", body: "Мұндай бет жоқ немесе басқа жерге көшкен. Нұсқаулықтар, бөлшектер және Project Finder бір басуда.", home: "Басты бет", hub: "Нұсқаулықтарды ашу" },
    tabs: { home: "Басты", projects: "Жобалар", finder: "Іздеу", community: "Қауымдастық", profile: "Профиль", signIn: "Кіру" },
    footer: {
      tagline: "Инженерлер мен мейкерлерге арналған аппараттық құрастырулар қоры: Arduino, ESP32 және Raspberry Pi үшін схемалар, код және нұсқаулықтар.",
      build: "Құрастырулар", community: "Қауымдастық", buildLogs: "Құрастыру журналдары", guides: "Нұсқаулықтар",
      rights: "ropros", safety: "Қуат бермес бұрын схеманы даташиттермен салыстырыңыз.",
    },
    auth: { signIn: "Кіру", register: "Тіркелу", signOut: "Шығу", profile: "Профиль", level: "Деңгей" },
    levels: ["Жаңа құрастырушы", "Схема шәкірті", "Датчик барлаушысы", "IoT рыцары", "Робот сәулетшісі", "Шебер мейкер"],
    difficulty: { beginner: "Бастапқы", intermediate: "Орташа", advanced: "Жоғары" },
    hours: (h: number) => `${h.toLocaleString("kk-KZ")} сағ`,
    skip: "Мазмұнға өту",
  },
});

/** XP floors for levels 1–6. Must match the generated users.level column in supabase/migrations/0001_init.sql. */
export const LEVEL_FLOORS = [0, 150, 400, 700, 1100, 1600] as const;
