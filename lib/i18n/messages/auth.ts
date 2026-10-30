import { defineMessages } from "../config";

export const authMessages = defineMessages({
  en: {
    welcome: "Welcome back", join: "Join ropros", signIn: "Sign in", register: "Register", close: "Close",
    name: "Maker name", nameHint: "3–18 letters, digits, _ or .", email: "you@lab.dev", password: "Password (8+ characters)",
    submitSignIn: "Sign in", submitRegister: "Create account", wait: "Please wait…",
    confirm: "Check your inbox to confirm your email, then sign in.",
    captchaWait: "One moment: checking that you're human.",
    captchaError: (reason: string) => reason === "blocked"
      ? "The human check couldn't load: an ad blocker, privacy extension or network is blocking challenges.cloudflare.com. Allow it and reload."
      : reason.startsWith("1102")
        ? `The human check isn't set up for this address (error ${reason}). Open the site at its main address, or add this domain in Cloudflare Turnstile.`
        : `The human check failed (error ${reason}). Reload the page and try again.`,
    perks: "Save progress, earn XP and share your builds.",
    welcomeToast: (n: string) => `Welcome, @${n}`, signedOut: "Signed out",
    needAuth: "Sign in to save progress and earn XP",
  },
  ru: {
    welcome: "С возвращением", join: "Присоединяйтесь к ropros", signIn: "Вход", register: "Регистрация", close: "Закрыть",
    name: "Ник мейкера", nameHint: "3–18 символов: буквы, цифры, _ или .", email: "you@lab.dev", password: "Пароль (от 8 символов)",
    submitSignIn: "Войти", submitRegister: "Создать аккаунт", wait: "Подождите…",
    confirm: "Проверьте почту и подтвердите адрес, затем войдите.",
    captchaWait: "Секунду: проверяем, что вы человек.",
    captchaError: (reason: string) => reason === "blocked"
      ? "Проверка не загрузилась: блокировщик рекламы, расширение приватности или сеть блокирует challenges.cloudflare.com. Разрешите его и обновите страницу."
      : reason.startsWith("1102")
        ? `Проверка не настроена для этого адреса (ошибка ${reason}). Откройте сайт по основному адресу или добавьте домен в Cloudflare Turnstile.`
        : `Проверка не прошла (ошибка ${reason}). Обновите страницу и попробуйте снова.`,
    perks: "Сохраняйте прогресс, получайте XP и делитесь сборками.",
    welcomeToast: (n: string) => `Добро пожаловать, @${n}`, signedOut: "Вы вышли",
    needAuth: "Войдите, чтобы сохранять прогресс и получать XP",
  },
  kk: {
    welcome: "Қайта қош келдіңіз", join: "ropros-қа қосылыңыз", signIn: "Кіру", register: "Тіркелу", close: "Жабу",
    name: "Мейкер аты", nameHint: "3–18 таңба: әріп, сан, _ немесе .", email: "you@lab.dev", password: "Құпиясөз (кемінде 8 таңба)",
    submitSignIn: "Кіру", submitRegister: "Аккаунт құру", wait: "Күте тұрыңыз…",
    confirm: "Поштаңызды тексеріп, мекенжайды растаңыз, содан кейін кіріңіз.",
    captchaWait: "Бір сәт: адам екеніңізді тексеріп жатырмыз.",
    captchaError: (reason: string) => reason === "blocked"
      ? "Тексеру жүктелмеді: жарнама блоктаушы, құпиялық кеңейтімі немесе желі challenges.cloudflare.com-ды бұғаттап тұр. Рұқсат етіп, бетті жаңартыңыз."
      : reason.startsWith("1102")
        ? `Тексеру бұл мекенжай үшін бапталмаған (қате ${reason}). Сайтты негізгі мекенжайы бойынша ашыңыз немесе доменді Cloudflare Turnstile-ға қосыңыз.`
        : `Тексеру өтпеді (қате ${reason}). Бетті жаңартып, қайталап көріңіз.`,
    perks: "Прогресті сақтаңыз, XP жинаңыз және құрастыруларыңызбен бөлісіңіз.",
    welcomeToast: (n: string) => `Қош келдіңіз, @${n}`, signedOut: "Сіз шықтыңыз",
    needAuth: "Прогресті сақтап, XP алу үшін кіріңіз",
  },
});
