import { defineMessages, ruPlural } from "../config";

/** The bell in the header: comments on your builds. */
export const notificationMessages = defineMessages({
  en: {
    title: "Notifications",
    button: (n: number) => (n ? `Notifications, ${n} unread` : "Notifications"),
    empty: "Nothing yet. When someone comments on your builds, it shows up here.",
    commented: (actor: string, title: string) => `@${actor} commented on “${title}”`,
    removedPost: "a post that is no longer available",
    markAll: "Mark all as read",
    loadError: "Couldn’t load notifications.",
    unread: (n: number) => `${n} new`,
  },
  ru: {
    title: "Уведомления",
    button: (n: number) => (n ? `Уведомления, ${n} ${ruPlural(n, "непрочитанное", "непрочитанных", "непрочитанных")}` : "Уведомления"),
    empty: "Пока ничего. Когда кто-то прокомментирует ваши сборки, это появится здесь.",
    commented: (actor: string, title: string) => `@${actor}: новый комментарий к «${title}»`,
    removedPost: "пост, которого больше нет",
    markAll: "Отметить все прочитанными",
    loadError: "Не удалось загрузить уведомления.",
    unread: (n: number) => `${n} ${ruPlural(n, "новое", "новых", "новых")}`,
  },
  kk: {
    title: "Хабарламалар",
    button: (n: number) => (n ? `Хабарламалар, оқылмаған: ${n}` : "Хабарламалар"),
    empty: "Әзірге ештеңе жоқ. Біреу құрастыруыңызға пікір қалдырса, осында көрінеді.",
    commented: (actor: string, title: string) => `@${actor} «${title}» постына пікір қалдырды`,
    removedPost: "енді қолжетімсіз пост",
    markAll: "Барлығын оқылды деп белгілеу",
    loadError: "Хабарламаларды жүктеу мүмкін болмады.",
    unread: (n: number) => `${n} жаңа`,
  },
});
