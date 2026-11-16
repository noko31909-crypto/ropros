import { defineMessages } from "../config";

/** One section of a legal page: a string is a paragraph, a string array is a bullet list. */
export type LegalSection = { id: string; title: string; body: readonly (string | readonly string[])[] };

/** Shared chrome of /privacy and /terms. */
export const legalMessages = defineMessages({
  en: {
    updated: (date: string) => `Last updated: ${date}`,
    contents: "On this page",
    contactTitle: "Contact",
    contactEmail: "Questions, data requests or a post to report: write to",
    contactIssues: "Questions or reports: open an issue on the ropros GitHub page. Don’t post personal data there: for a data request, ask for a private contact and we’ll reply.",
    privacy: "Privacy Policy", terms: "Terms of Use",
  },
  ru: {
    updated: (date: string) => `Обновлено: ${date}`,
    contents: "На этой странице",
    contactTitle: "Контакты",
    contactEmail: "Вопросы, запросы о данных или жалоба на пост: пишите на",
    contactIssues: "Вопросы и жалобы: создайте issue на странице ropros в GitHub. Не публикуйте там персональные данные: для запроса о данных попросите приватный контакт, и мы ответим.",
    privacy: "Политика конфиденциальности", terms: "Условия использования",
  },
  kk: {
    updated: (date: string) => `Жаңартылды: ${date}`,
    contents: "Осы бетте",
    contactTitle: "Байланыс",
    contactEmail: "Сұрақтар, деректерге қатысты өтініштер немесе пост туралы шағым: жазыңыз",
    contactIssues: "Сұрақтар мен шағымдар: GitHub-тағы ropros бетінде issue ашыңыз. Онда жеке деректерді жарияламаңыз: деректерге қатысты өтініш үшін жеке байланыс сұраңыз, біз жауап береміз.",
    privacy: "Құпиялық саясаты", terms: "Пайдалану шарттары",
  },
});

/** /privacy. Keep it in step with what the site actually stores (schema in supabase/migrations, cookies, local storage). */
export const privacyMessages = defineMessages({
  en: {
    title: "Privacy Policy",
    lead: "What ropros stores about you, why, and how to get it removed. We collect only what the features need.",
    sections: [
      { id: "no-account", title: "Without an account", body: [
        "You can read every guide and use the Project Finder, the workbench, the shopping list and the serial monitor without signing in.",
        "In that case your saved builds, step checklists and workbench are kept only in your browser’s local storage. They never reach our servers, and clearing your browser data deletes them.",
      ] },
      { id: "account", title: "Your account", body: [
        "To share builds, like, comment and earn XP you create an account with an email address, a password and a maker name.",
        [
          "Email: used to sign you in and to confirm the account. It is never shown on the site.",
          "Password: handled by Supabase Auth and stored only as a hash. We can’t read it.",
          "Public profile: your maker name, level, XP and the date you joined.",
        ],
      ] },
      { id: "posts", title: "What you post", body: [
        "Build photos, titles, build status, the linked guide and comments are public: anyone can see them, together with your maker name.",
        "Photos are kept in a private storage bucket and shown through links that expire after an hour. Likes are counted publicly; which posts you liked is visible only to you.",
        "You can delete your posts and comments at any time. Deleting a post also deletes its photo and its comments. The author of a post can remove comments under it.",
      ] },
      { id: "progress", title: "Progress, XP and your workbench", body: [
        "When you’re signed in we store your progress in guides, your XP history and the parts on your workbench. Only you can see them. XP and levels are calculated by the database, never by your browser.",
      ] },
      { id: "cookies", title: "Cookies and local storage", body: [
        "We use only what the site needs to work. There are no advertising or cross-site tracking cookies.",
        [
          "lang: remembers your language.",
          "Supabase sign-in cookies: keep you signed in.",
          "Local storage: saved builds, step checklists and, while you’re signed out, your workbench.",
        ],
      ] },
      { id: "services", title: "Services we use", body: [
        "These companies process data for us so the site can run:",
        [
          "Supabase: database, sign-in and photo storage.",
          "Vercel: hosting, and page-view statistics without cookies (Vercel Web Analytics).",
          "Cloudflare Turnstile: the check that you’re human when you sign in or sign up. It looks at your IP address and browser signals to tell people from bots.",
          "Amazon CloudFront: delivers the guide cover images and, like any web server, sees your IP address.",
        ],
        "The shopping list links to online shops. Following a link takes you to their site and their privacy policy. We send them only the name of the part you search for, nothing about you.",
      ] },
      { id: "logs", title: "Logs and abuse protection", body: [
        "Our hosting keeps standard request logs (IP address, time, page) for security and to fix errors. To stop abuse, request limits keep your IP address in server memory for a short time.",
      ] },
      { id: "serial", title: "Serial monitor", body: [
        "The serial monitor talks to your board over USB directly from your browser. What the board sends and what you type stay on your computer. Nothing is uploaded.",
      ] },
      { id: "retention", title: "How long we keep data", body: [
        "Account data is kept while your account exists. Posts and comments stay until you delete them or the account is deleted. Hosting logs are kept for the short period the provider sets.",
      ] },
      { id: "rights", title: "Your rights", body: [
        "You can ask for a copy of your data, ask us to correct it, or ask us to delete your account and everything linked to it. Write to us (see Contact) and we’ll reply within 30 days.",
      ] },
      { id: "children", title: "Children", body: [
        "You need to be at least 13 to create an account. If you’re under the age of majority where you live, ask a parent or guardian first. If you think a child under 13 has an account, contact us and we’ll delete it.",
      ] },
      { id: "changes", title: "Changes", body: [
        "When this policy changes we update this page and the date at the top.",
      ] },
    ] as LegalSection[],
  },
  ru: {
    title: "Политика конфиденциальности",
    lead: "Что ropros хранит о вас, зачем и как это удалить. Мы собираем только то, что нужно для работы функций.",
    sections: [
      { id: "no-account", title: "Без аккаунта", body: [
        "Все гайды, Project Finder, верстак, список покупок и Serial-монитор работают без входа.",
        "В этом случае сохранённые сборки, отметки шагов и верстак хранятся только в локальном хранилище вашего браузера. Они не попадают на наши серверы, а очистка данных браузера их удаляет.",
      ] },
      { id: "account", title: "Ваш аккаунт", body: [
        "Чтобы делиться сборками, ставить лайки, комментировать и получать XP, вы создаёте аккаунт с адресом почты, паролем и ником мейкера.",
        [
          "Почта: нужна для входа и подтверждения аккаунта. На сайте она никогда не показывается.",
          "Пароль: его обрабатывает Supabase Auth и хранит только в виде хеша. Мы не можем его прочитать.",
          "Публичный профиль: ник, уровень, XP и дата регистрации.",
        ],
      ] },
      { id: "posts", title: "Что вы публикуете", body: [
        "Фото сборок, названия, статус, привязанный гайд и комментарии публичны: их видят все, вместе с вашим ником.",
        "Фото хранятся в закрытом хранилище и показываются по ссылкам, которые истекают через час. Число лайков видно всем, а какие посты лайкнули вы, видите только вы.",
        "Вы можете удалить свои посты и комментарии в любой момент. Вместе с постом удаляются его фото и комментарии. Автор поста может удалять комментарии под ним.",
      ] },
      { id: "progress", title: "Прогресс, XP и верстак", body: [
        "Когда вы вошли, мы храним ваш прогресс в гайдах, историю XP и детали на вашем верстаке. Видите их только вы. XP и уровни считает база данных, а не ваш браузер.",
      ] },
      { id: "cookies", title: "Cookie и локальное хранилище", body: [
        "Мы используем только то, без чего сайт не работает. Рекламных и следящих cookie нет.",
        [
          "lang: запоминает язык.",
          "Cookie входа Supabase: держат вас в аккаунте.",
          "Локальное хранилище: сохранённые сборки, отметки шагов и, пока вы не вошли, ваш верстак.",
        ],
      ] },
      { id: "services", title: "Сервисы, которые мы используем", body: [
        "Эти компании обрабатывают данные по нашему поручению, чтобы сайт работал:",
        [
          "Supabase: база данных, вход и хранение фото.",
          "Vercel: хостинг и статистика просмотров без cookie (Vercel Web Analytics).",
          "Cloudflare Turnstile: проверка, что вы человек, при входе и регистрации. Она учитывает ваш IP-адрес и сигналы браузера, чтобы отличать людей от ботов.",
          "Amazon CloudFront: отдаёт обложки гайдов и, как любой веб-сервер, видит ваш IP-адрес.",
        ],
        "Список покупок ведёт в интернет-магазины. Перейдя по ссылке, вы попадаете на их сайт с их политикой конфиденциальности. Мы передаём им только название детали, которую вы ищете, и ничего о вас.",
      ] },
      { id: "logs", title: "Журналы и защита от злоупотреблений", body: [
        "Хостинг ведёт обычные журналы запросов (IP-адрес, время, страница) для безопасности и исправления ошибок. Чтобы защититься от злоупотреблений, ограничители запросов недолго держат ваш IP-адрес в памяти сервера.",
      ] },
      { id: "serial", title: "Serial-монитор", body: [
        "Serial-монитор общается с платой по USB прямо из вашего браузера. То, что присылает плата, и то, что вы вводите, остаётся на вашем компьютере. Ничего не загружается на сервер.",
      ] },
      { id: "retention", title: "Сколько мы храним данные", body: [
        "Данные аккаунта хранятся, пока существует аккаунт. Посты и комментарии остаются, пока вы их не удалите или пока не будет удалён аккаунт. Журналы хостинга хранятся недолго, столько, сколько задаёт провайдер.",
      ] },
      { id: "rights", title: "Ваши права", body: [
        "Вы можете запросить копию своих данных, попросить их исправить или удалить аккаунт со всем, что с ним связано. Напишите нам (см. «Контакты»), и мы ответим в течение 30 дней.",
      ] },
      { id: "children", title: "Дети", body: [
        "Создать аккаунт можно с 13 лет. Если вы младше возраста совершеннолетия в вашей стране, сначала спросите разрешения у родителей или опекуна. Если вы считаете, что аккаунт есть у ребёнка младше 13 лет, напишите нам, и мы его удалим.",
      ] },
      { id: "changes", title: "Изменения", body: [
        "Если политика изменится, мы обновим эту страницу и дату вверху.",
      ] },
    ] as LegalSection[],
  },
  kk: {
    title: "Құпиялық саясаты",
    lead: "ropros сіз туралы не сақтайды, не үшін және оны қалай жоюға болады. Біз тек функцияларға қажет деректерді жинаймыз.",
    sections: [
      { id: "no-account", title: "Аккаунтсыз", body: [
        "Барлық нұсқаулықтар, Project Finder, верстак, сатып алу тізімі және Serial-монитор кірмей-ақ жұмыс істейді.",
        "Бұл жағдайда сақталған құрастырулар, қадам белгілері және верстак тек браузеріңіздің жергілікті жадында сақталады. Олар біздің серверлерге жетпейді, ал браузер деректерін тазаласаңыз, жойылады.",
      ] },
      { id: "account", title: "Сіздің аккаунтыңыз", body: [
        "Құрастыруларыңызбен бөлісу, лайк басу, пікір жазу және XP жинау үшін электрондық пошта, құпиясөз және мейкер есімімен аккаунт жасайсыз.",
        [
          "Пошта: кіру және аккаунтты растау үшін қажет. Сайтта ешқашан көрсетілмейді.",
          "Құпиясөз: оны Supabase Auth өңдейді және тек хеш түрінде сақтайды. Біз оны оқи алмаймыз.",
          "Ашық профиль: мейкер есіміңіз, деңгейіңіз, XP және тіркелген күніңіз.",
        ],
      ] },
      { id: "posts", title: "Сіз жариялайтын нәрселер", body: [
        "Құрастыру фотолары, атаулары, күйі, байланыстырылған нұсқаулық және пікірлер ашық: оларды мейкер есіміңізбен бірге кез келген адам көреді.",
        "Фотолар жабық қоймада сақталады және бір сағаттан кейін мерзімі бітетін сілтемелер арқылы көрсетіледі. Лайктар саны бәріне көрінеді, ал қай посттарды лайктағаныңызды тек сіз көресіз.",
        "Посттарыңыз бен пікірлеріңізді кез келген уақытта жоя аласыз. Постпен бірге оның фотосы мен пікірлері де жойылады. Пост авторы оның астындағы пікірлерді жоя алады.",
      ] },
      { id: "progress", title: "Прогресс, XP және верстак", body: [
        "Кірген кезде біз нұсқаулықтардағы прогресіңізді, XP тарихын және верстагыңыздағы бөлшектерді сақтаймыз. Оларды тек сіз көресіз. XP мен деңгейлерді браузеріңіз емес, дерекқор есептейді.",
      ] },
      { id: "cookies", title: "Cookie және жергілікті жад", body: [
        "Біз тек сайттың жұмысына қажет нәрселерді қолданамыз. Жарнамалық немесе бақылаушы cookie жоқ.",
        [
          "lang: тілді есте сақтайды.",
          "Supabase кіру cookie-лері: аккаунтта қалуыңызға мүмкіндік береді.",
          "Жергілікті жад: сақталған құрастырулар, қадам белгілері және кірмеген кезде верстагыңыз.",
        ],
      ] },
      { id: "services", title: "Біз қолданатын сервистер", body: [
        "Сайт жұмыс істеуі үшін бұл компаниялар біздің атымыздан деректерді өңдейді:",
        [
          "Supabase: дерекқор, кіру және фото сақтау.",
          "Vercel: хостинг және cookie-сіз қаралым статистикасы (Vercel Web Analytics).",
          "Cloudflare Turnstile: кіру және тіркелу кезінде адам екеніңізді тексереді. Адамдарды боттардан ажырату үшін IP мекенжайыңыз бен браузер сигналдарын қарайды.",
          "Amazon CloudFront: нұсқаулық мұқабаларын жеткізеді және кез келген веб-сервер сияқты IP мекенжайыңызды көреді.",
        ],
        "Сатып алу тізімі интернет-дүкендерге апарады. Сілтеме бойынша өтсеңіз, өз құпиялық саясаты бар олардың сайтына түсесіз. Біз оларға тек іздеген бөлшегіңіздің атауын жібереміз, сіз туралы ештеңе жібермейміз.",
      ] },
      { id: "logs", title: "Журналдар және теріс пайдаланудан қорғау", body: [
        "Хостинг қауіпсіздік және қателерді түзету үшін әдеттегі сұрау журналдарын (IP мекенжайы, уақыт, бет) жүргізеді. Теріс пайдаланудан қорғау үшін сұрау шектеуіштері IP мекенжайыңызды сервер жадында қысқа уақыт сақтайды.",
      ] },
      { id: "serial", title: "Serial-монитор", body: [
        "Serial-монитор тақтаңызбен USB арқылы тікелей браузеріңізден байланысады. Тақта жіберетін және сіз енгізетін деректер компьютеріңізде қалады. Ештеңе серверге жүктелмейді.",
      ] },
      { id: "retention", title: "Деректерді қанша сақтаймыз", body: [
        "Аккаунт деректері аккаунт бар кезде сақталады. Посттар мен пікірлер оларды өзіңіз жойғанша немесе аккаунт жойылғанша қалады. Хостинг журналдары провайдер белгілеген қысқа мерзімде сақталады.",
      ] },
      { id: "rights", title: "Сіздің құқықтарыңыз", body: [
        "Деректеріңіздің көшірмесін сұрай аласыз, оларды түзетуді немесе аккаунтыңызды онымен байланысты барлық нәрсемен бірге жоюды сұрай аласыз. Бізге жазыңыз («Байланыс» бөлімін қараңыз), біз 30 күн ішінде жауап береміз.",
      ] },
      { id: "children", title: "Балалар", body: [
        "Аккаунтты 13 жастан бастап жасауға болады. Еліңіздегі кәмелет жасына толмаған болсаңыз, алдымен ата-анаңыздан немесе қамқоршыңыздан рұқсат сұраңыз. 13 жасқа толмаған баланың аккаунты бар деп ойласаңыз, бізге жазыңыз, біз оны жоямыз.",
      ] },
      { id: "changes", title: "Өзгерістер", body: [
        "Саясат өзгерсе, біз осы бетті және жоғарыдағы күнді жаңартамыз.",
      ] },
    ] as LegalSection[],
  },
});

/** /terms */
export const termsMessages = defineMessages({
  en: {
    title: "Terms of Use",
    lead: "The rules for using ropros. By using the site you agree to them.",
    sections: [
      { id: "service", title: "The service", body: [
        "ropros publishes hardware build guides, a parts finder, a workbench, a shopping list, a serial monitor and a community showcase. It’s free to use. We may change or stop any feature.",
      ] },
      { id: "accounts", title: "Accounts", body: [
        "You need to be at least 13 to create an account. Use a real email address and keep your password to yourself. One person, one account: automated sign-ups aren’t allowed. You’re responsible for what happens under your account.",
      ] },
      { id: "content", title: "What you post", body: [
        "You keep the rights to the photos and text you post. By posting, you let ropros store, resize and show them on the site while they’re published. Post only what you made yourself or have permission to share. You can delete it at any time.",
      ] },
      { id: "rules", title: "Community rules", body: [
        [
          "Real builds only: no fake posts, spam or traded likes.",
          "Be civil: no harassment, hate speech or personal attacks.",
          "Don’t post other people’s personal data, illegal content, malware or links to it.",
          "Don’t try to break, overload or scrape the site, or to farm XP.",
        ],
        "We may remove content and suspend accounts that break these rules.",
      ] },
      { id: "xp", title: "XP and levels", body: [
        "XP, levels and badges are for fun. They have no money value and can’t be exchanged. We may correct them, for example after abuse.",
      ] },
      { id: "guides", title: "Guides and safety", body: [
        "Use the guides and their code for your own builds and for learning. Don’t republish the guides elsewhere without permission.",
        "We write and check the guides carefully, but mistakes happen and parts differ between sellers. Check every circuit against the datasheets before you power it. Mains voltage, lithium batteries, motors and heat can injure people and damage property: if you’re unsure, stop and ask someone experienced. You build at your own risk.",
      ] },
      { id: "tools", title: "Tools in your browser", body: [
        "The serial monitor sends data to the device you pick. Use it only with devices you own or are allowed to use.",
      ] },
      { id: "shops", title: "Links to shops", body: [
        "The shopping list links to other shops. We don’t sell parts and aren’t responsible for their prices, stock or delivery.",
      ] },
      { id: "warranty", title: "No warranty", body: [
        "ropros is provided as is, without warranties. As far as the law allows, we aren’t liable for indirect losses, or for lost data, hardware or profit, that come from using the site or the guides. Nothing here limits rights that the law doesn’t let us limit.",
      ] },
      { id: "changes", title: "Changes", body: [
        "We may update these terms. The date at the top shows the current version. If you keep using ropros after an update, you accept it.",
      ] },
    ] as LegalSection[],
  },
  ru: {
    title: "Условия использования",
    lead: "Правила пользования ropros. Пользуясь сайтом, вы их принимаете.",
    sections: [
      { id: "service", title: "Сервис", body: [
        "ropros публикует гайды по сборке электроники, подбор проектов по деталям, верстак, список покупок, Serial-монитор и витрину сообщества. Пользоваться ими бесплатно. Мы можем менять или отключать любые функции.",
      ] },
      { id: "accounts", title: "Аккаунты", body: [
        "Создать аккаунт можно с 13 лет. Указывайте настоящую почту и никому не сообщайте пароль. Один человек, один аккаунт: автоматическая регистрация запрещена. Вы отвечаете за всё, что происходит в вашем аккаунте.",
      ] },
      { id: "content", title: "Что вы публикуете", body: [
        "Права на ваши фото и тексты остаются у вас. Публикуя их, вы разрешаете ropros хранить, уменьшать и показывать их на сайте, пока они опубликованы. Публикуйте только то, что сделали сами или имеете право показывать. Удалить публикацию можно в любой момент.",
      ] },
      { id: "rules", title: "Правила сообщества", body: [
        [
          "Только реальные сборки: без фейковых постов, спама и накрутки лайков.",
          "Будьте вежливы: без травли, языка вражды и оскорблений.",
          "Не публикуйте чужие персональные данные, незаконный контент, вредоносные программы и ссылки на них.",
          "Не пытайтесь взломать, перегрузить или выкачать сайт или накрутить XP.",
        ],
        "Мы можем удалять контент и блокировать аккаунты, которые нарушают эти правила.",
      ] },
      { id: "xp", title: "XP и уровни", body: [
        "XP, уровни и значки нужны для интереса. Они не имеют денежной ценности и не обмениваются. Мы можем их исправить, например после злоупотреблений.",
      ] },
      { id: "guides", title: "Гайды и безопасность", body: [
        "Используйте гайды и их код для своих сборок и учёбы. Не публикуйте гайды на других сайтах без разрешения.",
        "Мы пишем и проверяем гайды внимательно, но ошибки случаются, а детали у разных продавцов отличаются. Перед подачей питания сверяйте каждую схему с даташитами. Сетевое напряжение, литиевые аккумуляторы, моторы и нагрев могут травмировать людей и повредить имущество: если не уверены, остановитесь и спросите опытного человека. Вы собираете на свой риск.",
      ] },
      { id: "tools", title: "Инструменты в браузере", body: [
        "Serial-монитор отправляет данные на выбранное вами устройство. Используйте его только с устройствами, которые принадлежат вам или которыми вам разрешено пользоваться.",
      ] },
      { id: "shops", title: "Ссылки на магазины", body: [
        "Список покупок ведёт в другие магазины. Мы не продаём детали и не отвечаем за их цены, наличие и доставку.",
      ] },
      { id: "warranty", title: "Без гарантий", body: [
        "ropros предоставляется «как есть», без гарантий. В той мере, в какой позволяет закон, мы не отвечаем за косвенные убытки, потерю данных, железа или прибыли из-за использования сайта или гайдов. Ничто здесь не ограничивает права, которые закон ограничивать не позволяет.",
      ] },
      { id: "changes", title: "Изменения", body: [
        "Мы можем обновлять эти условия. Дата вверху показывает текущую версию. Продолжая пользоваться ropros после обновления, вы его принимаете.",
      ] },
    ] as LegalSection[],
  },
  kk: {
    title: "Пайдалану шарттары",
    lead: "ropros-ты пайдалану ережелері. Сайтты пайдалана отырып, сіз оларды қабылдайсыз.",
    sections: [
      { id: "service", title: "Сервис", body: [
        "ropros электроника құрастыру нұсқаулықтарын, бөлшектер бойынша жоба іздеуді, верстакты, сатып алу тізімін, Serial-мониторды және қауымдастық көрмесін жариялайды. Оларды пайдалану тегін. Біз кез келген функцияны өзгерте немесе өшіре аламыз.",
      ] },
      { id: "accounts", title: "Аккаунттар", body: [
        "Аккаунтты 13 жастан бастап жасауға болады. Нағыз поштаны көрсетіңіз және құпиясөзіңізді ешкімге айтпаңыз. Бір адам, бір аккаунт: автоматты тіркелуге тыйым салынады. Аккаунтыңызда болатын барлық нәрсеге сіз жауаптысыз.",
      ] },
      { id: "content", title: "Сіз жариялайтын нәрселер", body: [
        "Фотолар мен мәтіндерге құқық сізде қалады. Жариялай отырып, сіз ropros-қа оларды жарияланып тұрған кезде сайтта сақтауға, кішірейтуге және көрсетуге рұқсат бересіз. Тек өзіңіз жасаған немесе көрсетуге құқығыңыз бар нәрсені жариялаңыз. Жарияланымды кез келген уақытта жоя аласыз.",
      ] },
      { id: "rules", title: "Қауымдастық ережелері", body: [
        [
          "Тек нақты құрастырулар: жалған посттарсыз, спамсыз және лайк жинатусыз.",
          "Сыпайы болыңыз: қудалаусыз, өшпенділік тілінсіз және қорлаусыз.",
          "Басқа адамдардың жеке деректерін, заңсыз контентті, зиянды бағдарламаларды және оларға сілтемелерді жарияламаңыз.",
          "Сайтты бұзуға, шамадан тыс жүктеуге немесе көшіріп алуға, не XP-ны жасанды жинауға тырыспаңыз.",
        ],
        "Осы ережелерді бұзатын контентті жоюымыз және аккаунттарды бұғаттауымыз мүмкін.",
      ] },
      { id: "xp", title: "XP және деңгейлер", body: [
        "XP, деңгейлер мен белгілер қызық үшін. Олардың ақшалай құны жоқ және айырбасталмайды. Біз оларды түзетуіміз мүмкін, мысалы, теріс пайдаланудан кейін.",
      ] },
      { id: "guides", title: "Нұсқаулықтар және қауіпсіздік", body: [
        "Нұсқаулықтар мен олардың кодын өз құрастыруларыңыз бен оқу үшін пайдаланыңыз. Нұсқаулықтарды рұқсатсыз басқа сайттарда жарияламаңыз.",
        "Біз нұсқаулықтарды мұқият жазып, тексереміз, бірақ қателер болады, ал бөлшектер әр сатушыда әртүрлі. Қуат бермес бұрын әр схеманы даташиттермен салыстырыңыз. Желі кернеуі, литий аккумуляторлар, моторлар мен қызу адамдарды жарақаттап, мүлікті бүлдіруі мүмкін: сенімді болмасаңыз, тоқтап, тәжірибелі адамнан сұраңыз. Құрастыру тәуекелі өзіңізде.",
      ] },
      { id: "tools", title: "Браузердегі құралдар", body: [
        "Serial-монитор деректерді сіз таңдаған құрылғыға жібереді. Оны тек өзіңізге тиесілі немесе пайдалануға рұқсат етілген құрылғылармен қолданыңыз.",
      ] },
      { id: "shops", title: "Дүкендерге сілтемелер", body: [
        "Сатып алу тізімі басқа дүкендерге апарады. Біз бөлшектер сатпаймыз және олардың бағасына, қорына немесе жеткізуіне жауап бермейміз.",
      ] },
      { id: "warranty", title: "Кепілдік жоқ", body: [
        "ropros «сол күйінде», кепілдіксіз ұсынылады. Заң рұқсат ететін шамада сайтты немесе нұсқаулықтарды пайдаланудан туған жанама шығындарға, деректердің, құрылғылардың немесе пайданың жоғалуына жауап бермейміз. Мұндағы ешнәрсе заң шектеуге жол бермейтін құқықтарды шектемейді.",
      ] },
      { id: "changes", title: "Өзгерістер", body: [
        "Біз бұл шарттарды жаңартуымыз мүмкін. Жоғарыдағы күн ағымдағы нұсқаны көрсетеді. Жаңартудан кейін ropros-ты пайдалануды жалғастырсаңыз, оны қабылдайсыз.",
      ] },
    ] as LegalSection[],
  },
});
