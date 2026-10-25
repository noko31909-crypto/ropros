import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-smart-doorbell",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "iot",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 9,
  xpReward: 200,
  title: {
    en: "ESP32 Smart Doorbell with Telegram",
    ru: "Умный дверной звонок на ESP32 с Telegram",
    kk: "Telegram-мен жұмыс істейтін ESP32 ақылды есік қоңырауы",
  },
  summary: {
    en: "The ESP32 sleeps until the bell button wakes it, plays a ding-dong on a passive buzzer, sends you a Telegram message and goes back to deep sleep.",
    ru: "ESP32 спит, пока кнопка звонка её не разбудит, играет «динь-дон» на пассивном зуммере, отправляет вам сообщение в Telegram и снова уходит в глубокий сон.",
    kk: "ESP32 қоңырау батырмасы оятқанша ұйықтайды, пассивті зуммерде «дың-дон» ойнатады, сізге Telegram-ға хабарлама жіберіп, қайтадан терең ұйқыға кетеді.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit (WROOM-32)", ru: "ESP32 DevKit (WROOM-32)", kk: "ESP32 DevKit (WROOM-32)" }, role: { en: "Controller, Wi-Fi and deep sleep", ru: "Контроллер, Wi-Fi и глубокий сон", kk: "Контроллер, Wi-Fi және терең ұйқы" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile for the bench, or any doorbell push (dry contact)", ru: "тактовая 6×6 мм для макета или любая кнопка звонка («сухой» контакт)", kk: "макетке 6×6 мм тактілі немесе кез келген қоңырау батырмасы («құрғақ» түйіспе)" }, role: { en: "Bell button, also the wake-up source", ru: "Кнопка звонка и источник пробуждения", kk: "Қоңырау батырмасы әрі ояту көзі" } },
    { component: "buzzer-passive", qty: 1, spec: { en: "passive buzzer module", ru: "модуль пассивного зуммера", kk: "пассивті зуммер модулі" }, role: { en: "Ding-dong chime", ru: "Мелодия «динь-дон»", kk: "«Дың-дон» әуені" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V 1 A USB charger + cable", ru: "USB-зарядка 5 В 1 А + кабель", kk: "5 В 1 А USB зарядтағыш + кабель" }, role: { en: "Powers the ESP32 through its USB port", ru: "Питает ESP32 через USB-порт", kk: "ESP32-ні USB порты арқылы қоректендіреді" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 6, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { component: "enclosure", qty: 1, spec: { en: "indoor box; only the button goes outside", ru: "корпус для помещения; наружу выходит только кнопка", kk: "бөлме ішіндегі қорап; сыртқа тек батырма шығады" }, role: { en: "Housing", ru: "Корпус", kk: "Корпус" }, optional: true },
  ],
  instances: [
    { id: "btn", component: "push-button", label: "Bell button" },
    { id: "buzz", component: "buzzer-passive", label: "Chime" },
  ],
  connections: [
    { from: "board.GPIO33", to: "btn.1", color: "blue", note: { en: "RTC GPIO: can wake the chip from deep sleep", ru: "RTC GPIO: может будить чип из глубокого сна", kk: "RTC GPIO: чипті терең ұйқыдан оята алады" } },
    { from: "btn.2", to: "board.GND", color: "black" },
    { from: "board.GPIO25", to: "buzz.+", color: "yellow" },
    { from: "buzz.-", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Create a Telegram bot", ru: "Создайте бота в Telegram", kk: "Telegram-да бот жасаңыз" },
      body: {
        en: "In Telegram, open @BotFather, send /newbot and follow the prompts; it replies with a bot token like 123456:ABC-DEF…. Then open your new bot and press Start, because a bot cannot message you until you write to it first. Get your numeric chat ID from @userinfobot.",
        ru: "В Telegram откройте @BotFather, отправьте /newbot и следуйте подсказкам; в ответ придёт токен вида 123456:ABC-DEF…. Затем откройте нового бота и нажмите Start: бот не может писать вам, пока вы не написали ему первым. Свой числовой chat ID узнайте у @userinfobot.",
        kk: "Telegram-да @BotFather-ді ашып, /newbot жіберіңіз де, нұсқауларды орындаңыз; жауапқа 123456:ABC-DEF… түріндегі токен келеді. Содан кейін жаңа ботты ашып, Start басыңыз: сіз бірінші жазбайынша, бот сізге хабарлама жібере алмайды. Сандық chat ID-іңізді @userinfobot арқылы біліңіз.",
      },
      expect: { en: "You have a bot token and a chat ID written down.", ru: "У вас записаны токен бота и chat ID.", kk: "Сізде бот токені мен chat ID жазылған." },
      mistake: { en: "Sharing the token publicly lets anyone send messages as your bot; keep it out of screenshots and public repos.", ru: "Если токен попадёт в открытый доступ, любой сможет писать от имени бота; не показывайте его на скриншотах и в публичных репозиториях.", kk: "Токен жария болса, кез келген адам ботыңыздың атынан жаза алады; оны скриншоттарда және ашық репозиторийлерде көрсетпеңіз." },
    },
    {
      title: { en: "Wire the bell button to GPIO33", ru: "Подключите кнопку звонка к GPIO33", kk: "Қоңырау батырмасын GPIO33-ке қосыңыз" },
      body: {
        en: "Connect one side of the button to GPIO33 and the other side to GND. GPIO33 is an RTC GPIO, so it keeps working while the main CPU is off; only RTC pins (0, 2, 4, 12–15, 25–27, 32–39) can wake an ESP32. The sketch enables the RTC pull-up, so the pin rests HIGH and a press pulls it LOW. A two-wire cable to an outdoor push of up to 10 m is fine.",
        ru: "Одну сторону кнопки подключите к GPIO33, другую к GND. GPIO33 — это RTC GPIO, он работает, пока основной процессор выключен; разбудить ESP32 могут только RTC-пины (0, 2, 4, 12–15, 25–27, 32–39). Скетч включает RTC-подтяжку, поэтому в покое на пине HIGH, а нажатие тянет его в LOW. Двухжильный кабель до уличной кнопки длиной до 10 м подойдёт.",
        kk: "Батырманың бір жағын GPIO33-ке, екінші жағын GND-ге қосыңыз. GPIO33 — RTC GPIO, ол негізгі процессор өшіп тұрғанда да жұмыс істейді; ESP32-ні тек RTC пиндері (0, 2, 4, 12–15, 25–27, 32–39) ғана оята алады. Скетч RTC тартуын қосады, сондықтан тыныш күйде пинде HIGH болады, ал басқанда LOW-ға түседі. Көшедегі батырмаға дейін 10 м-ге дейінгі екі сымды кабель жарайды.",
      },
      expect: { en: "Two wires from the button: one to GPIO33, one to GND.", ru: "От кнопки два провода: к GPIO33 и к GND.", kk: "Батырмадан екі сым: GPIO33-ке және GND-ге." },
      mistake: { en: "Using a non-RTC pin such as GPIO22 or GPIO23 means the doorbell never wakes up.", ru: "Если взять не-RTC пин, например GPIO22 или GPIO23, звонок никогда не проснётся.", kk: "GPIO22 немесе GPIO23 сияқты RTC емес пинді алсаңыз, қоңырау ешқашан оянбайды." },
    },
    {
      title: { en: "Add the passive buzzer", ru: "Добавьте пассивный зуммер", kk: "Пассивті зуммерді қосыңыз" },
      body: {
        en: "Connect the buzzer + to GPIO25 and − to GND2. A passive buzzer has no oscillator inside: the sketch plays two notes with tone(), E5 then C5, which gives the classic ding-dong.",
        ru: "Подключите плюс зуммера к GPIO25, минус к GND2. У пассивного зуммера нет встроенного генератора: скетч играет две ноты функцией tone(), ми и до второй октавы, получается классический «динь-дон».",
        kk: "Зуммердің плюсін GPIO25-ке, минусын GND2-ге қосыңыз. Пассивті зуммердің ішінде генератор жоқ: скетч tone() функциясымен екі нота ойнатады, екінші октаваның ми және до ноталары, классикалық «дың-дон» шығады.",
      },
      expect: { en: "At power-on you hear one short beep: the doorbell is armed.", ru: "При включении слышен один короткий сигнал: звонок готов.", kk: "Қосқанда бір қысқа дыбыс естіледі: қоңырау дайын." },
      mistake: { en: "An active buzzer only beeps at one pitch; buy the passive type for a melody.", ru: "Активный зуммер пищит только одним тоном; для мелодии нужен пассивный.", kk: "Белсенді зуммер тек бір тонмен шықылдайды; әуен үшін пассивті керек." },
    },
    {
      title: { en: "Fill in the constants and upload", ru: "Заполните константы и загрузите скетч", kk: "Тұрақтыларды толтырып, скетчті жүктеңіз" },
      body: {
        en: "Install UniversalTelegramBot and ArduinoJson from the Library Manager. Put your Wi-Fi name and password, BOT_TOKEN and CHAT_ID into the sketch. Select \"ESP32 Dev Module\", upload and open the Serial Monitor at 115200 baud. On first power-up the bell sends \"Doorbell online\" so you can confirm Telegram works, then goes to sleep.",
        ru: "Установите через Library Manager библиотеки UniversalTelegramBot и ArduinoJson. Впишите в скетч имя и пароль Wi-Fi, BOT_TOKEN и CHAT_ID. Выберите «ESP32 Dev Module», загрузите и откройте Serial Monitor на 115200 бод. При первом включении звонок отправит «Doorbell online», чтобы вы убедились, что Telegram работает, и уснёт.",
        kk: "Library Manager арқылы UniversalTelegramBot және ArduinoJson кітапханаларын орнатыңыз. Скетчке Wi-Fi атауы мен құпиясөзін, BOT_TOKEN және CHAT_ID жазыңыз. «ESP32 Dev Module» таңдап, жүктеңіз де, Serial Monitor-ды 115200 бодта ашыңыз. Алғаш қосқанда қоңырау Telegram жұмыс істейтінін тексеру үшін «Doorbell online» жіберіп, ұйқыға кетеді.",
      },
      expect: { en: "\"Doorbell online\" arrives in Telegram and the monitor prints \"going to deep sleep\".", ru: "В Telegram приходит «Doorbell online», а монитор печатает «going to deep sleep».", kk: "Telegram-ға «Doorbell online» келеді, ал монитор «going to deep sleep» деп шығарады." },
      mistake: { en: "Uploading fails while the board sleeps: hold BOOT, tap EN, release BOOT, then upload.", ru: "Пока плата спит, загрузка не идёт: зажмите BOOT, нажмите EN, отпустите BOOT и загружайте.", kk: "Плата ұйықтап жатқанда жүктеу болмайды: BOOT-ты басып тұрып, EN-ді басыңыз, BOOT-ты жіберіп, жүктеңіз." },
    },
    {
      title: { en: "Ring the bell", ru: "Позвоните в звонок", kk: "Қоңырауды басыңыз" },
      body: {
        en: "Press the button. The chime plays immediately, before Wi-Fi is up, so a visitor hears it at once. About 2–4 seconds later the message arrives with a ring counter. Presses within 20 seconds of a sent message still chime but do not send another message, so an impatient visitor cannot flood your phone.",
        ru: "Нажмите кнопку. Мелодия играет сразу, ещё до подключения к Wi-Fi, так что гость слышит её мгновенно. Примерно через 2–4 секунды приходит сообщение со счётчиком звонков. Нажатия в течение 20 секунд после отправленного сообщения тоже звенят, но новое сообщение не отправляют, поэтому нетерпеливый гость не завалит ваш телефон уведомлениями.",
        kk: "Батырманы басыңыз. Әуен Wi-Fi-ға қосылмай тұрып-ақ бірден ойнайды, сондықтан қонақ оны лезде естиді. Шамамен 2–4 секундтан кейін қоңырау санауышы бар хабарлама келеді. Хабарлама жіберілгеннен кейінгі 20 секунд ішіндегі басулар да шылдырлайды, бірақ жаңа хабарлама жібермейді, сондықтан шыдамсыз қонақ телефоныңызды хабарламаға толтыра алмайды.",
      },
      expect: { en: "\"Ding-dong! Someone is at the door (ring #1)\" in Telegram within a few seconds.", ru: "Через несколько секунд в Telegram: «Ding-dong! Someone is at the door (ring #1)».", kk: "Бірнеше секундтан кейін Telegram-да: «Ding-dong! Someone is at the door (ring #1)»." },
      mistake: { en: "If it rings by itself, the long button cable picks up noise; add a 10 kΩ resistor from GPIO33 to 3V3 as a stronger pull-up.", ru: "Если звонок срабатывает сам, длинный кабель кнопки ловит помехи; поставьте резистор 10 кОм от GPIO33 к 3V3 как более сильную подтяжку.", kk: "Қоңырау өздігінен шылдырласа, батырманың ұзын кабелі кедергі қабылдайды; күштірек тарту үшін GPIO33-тен 3V3-ке 10 кОм резистор қойыңыз." },
    },
  ],
  code: [{
    filename: "smart_doorbell.ino",
    language: "cpp",
    libraries: ["UniversalTelegramBot", "ArduinoJson"],
    source: `#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <UniversalTelegramBot.h>
#include "driver/rtc_io.h"
#include <time.h>

// ---- your settings ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";
const char* BOT_TOKEN = "YOUR_BOT_TOKEN";   // from @BotFather
const char* CHAT_ID = "YOUR_CHAT_ID";       // from @userinfobot

const int BUTTON_PIN = 33;   // RTC GPIO, button to GND
const int BUZZER_PIN = 25;   // passive buzzer +
const time_t QUIET_S = 20;   // no second message within 20 s

RTC_DATA_ATTR int ringCount = 0;       // survives deep sleep
RTC_DATA_ATTR time_t lastSentAt = -1000;

WiFiClientSecure tls;
UniversalTelegramBot bot(BOT_TOKEN, tls);

void playNote(int freq, int ms) {
  tone(BUZZER_PIN, freq);
  delay(ms);
  noTone(BUZZER_PIN);
}

void chime() {
  playNote(659, 450);   // E5 "ding"
  delay(60);
  playNote(523, 700);   // C5 "dong"
}

bool connectWiFi() {
  unsigned long start = millis();
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED && millis() - start < 10000) delay(100);
  if (WiFi.status() != WL_CONNECTED) { Serial.println("Wi-Fi failed"); return false; }
  Serial.printf("Wi-Fi OK in %.1f s\\n", (millis() - start) / 1000.0);
  return true;
}

void sendTelegram(const String& text) {
  if (!connectWiFi()) return;
  tls.setCACert(TELEGRAM_CERTIFICATE_ROOT);   // verify api.telegram.org
  bool ok = bot.sendMessage(CHAT_ID, text, "");
  Serial.println(ok ? "Telegram: sent" : "Telegram: FAILED (token, chat ID or Start pressed?)");
  if (ok) lastSentAt = time(nullptr);
  WiFi.disconnect(true);
  WiFi.mode(WIFI_OFF);
}

void goToSleep() {
  while (digitalRead(BUTTON_PIN) == LOW) delay(10);   // wait for release, or we wake at once
  delay(50);
  rtc_gpio_pullup_en((gpio_num_t)BUTTON_PIN);
  rtc_gpio_pulldown_dis((gpio_num_t)BUTTON_PIN);
  esp_sleep_enable_ext0_wakeup((gpio_num_t)BUTTON_PIN, 0);   // wake when the pin goes LOW
  Serial.println("going to deep sleep, press the button to ring");
  Serial.flush();
  esp_deep_sleep_start();
}

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);

  if (esp_sleep_get_wakeup_cause() == ESP_SLEEP_WAKEUP_EXT0) {
    ringCount++;
    Serial.printf("woke up: button (ring #%d)\\n", ringCount);
    chime();                                   // the visitor hears it right away
    if (time(nullptr) - lastSentAt >= QUIET_S) {
      sendTelegram("Ding-dong! Someone is at the door (ring #" + String(ringCount) + ")");
    } else {
      Serial.println("rang again within 20 s, message skipped");
    }
  } else {
    Serial.println("power-on: doorbell armed");
    playNote(1047, 120);
    sendTelegram("Doorbell online");
  }
  goToSleep();
}

void loop() {
  // never reached: every wake-up runs setup() and ends in deep sleep
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The chime plays but no Telegram message arrives", ru: "Мелодия играет, но сообщение в Telegram не приходит", kk: "Әуен ойнайды, бірақ Telegram-ға хабарлама келмейді" },
      cause: { en: "Wrong token or chat ID, or you never pressed Start in the bot chat.", ru: "Неверный токен или chat ID, либо вы не нажали Start в чате с ботом.", kk: "Токен немесе chat ID қате, не бот чатында Start баспағансыз." },
      fix: { en: "Check the Serial Monitor: \"Telegram: FAILED\" means the API refused. Re-copy the token, check the chat ID and send /start to the bot.", ru: "Посмотрите Serial Monitor: «Telegram: FAILED» значит, что API отказал. Скопируйте токен заново, проверьте chat ID и отправьте боту /start.", kk: "Serial Monitor-ды қараңыз: «Telegram: FAILED» API бас тартқанын білдіреді. Токенді қайта көшіріп, chat ID-ді тексеріңіз де, ботқа /start жіберіңіз." },
    },
    {
      symptom: { en: "Pressing the button does nothing at all", ru: "Нажатие кнопки ничего не делает", kk: "Батырманы басқанда ештеңе болмайды" },
      cause: { en: "The button is on a non-RTC pin, or both wires are on the same internally connected side.", ru: "Кнопка на не-RTC пине, или оба провода на одной, внутренне соединённой стороне.", kk: "Батырма RTC емес пинде немесе екі сым да іштей жалғанған бір жағында." },
      fix: { en: "Keep it on GPIO33 and use diagonally opposite legs of the tactile button.", ru: "Оставьте кнопку на GPIO33 и используйте ножки по диагонали.", kk: "Батырманы GPIO33-те қалдырып, диагональ бойынша қарама-қарсы аяқтарын пайдаланыңыз." },
    },
    {
      symptom: { en: "The board wakes up again and again without a press", ru: "Плата просыпается снова и снова без нажатия", kk: "Плата басусыз қайта-қайта оянады" },
      cause: { en: "The pin floats during sleep, usually because of a long cable acting as an antenna.", ru: "Пин «висит» во сне, обычно из-за длинного кабеля, который работает как антенна.", kk: "Ұйқы кезінде пин «ілулі» қалады, көбіне антенна сияқты әсер ететін ұзын кабельге байланысты." },
      fix: { en: "Add an external 10 kΩ pull-up from GPIO33 to 3V3 and a 100 nF capacitor from GPIO33 to GND.", ru: "Добавьте внешнюю подтяжку 10 кОм от GPIO33 к 3V3 и конденсатор 100 нФ от GPIO33 к GND.", kk: "GPIO33-тен 3V3-ке сыртқы 10 кОм тарту резисторын және GPIO33-тен GND-ге 100 нФ конденсатор қосыңыз." },
    },
    {
      symptom: { en: "The board is warm and a battery runs flat in days", ru: "Плата тёплая, а батарея садится за несколько дней", kk: "Плата жылы, ал батарея бірнеше күнде отырып қалады" },
      cause: { en: "The DevKit's USB chip, power LED and regulator draw several mA even in deep sleep.", ru: "USB-микросхема, светодиод питания и стабилизатор DevKit потребляют несколько мА даже в глубоком сне.", kk: "DevKit-тің USB микросхемасы, қуат жарық диоды мен тұрақтандырғышы терең ұйқыда да бірнеше мА тұтынады." },
      fix: { en: "Run it from a USB charger, or move to a bare ESP32 module with a low-quiescent regulator for battery use.", ru: "Питайте от USB-зарядки, а для батареи переходите на голый модуль ESP32 со стабилизатором с малым током покоя.", kk: "USB зарядтағыштан қоректендіріңіз, ал батарея үшін тыныштық тогы аз тұрақтандырғышы бар жалаң ESP32 модуліне көшіңіз." },
    },
  ],
  safety: [
    { en: "Keep the electronics indoors; only the push button and its low-voltage cable go outside.", ru: "Электронику держите в помещении; наружу выводится только кнопка и её низковольтный кабель.", kk: "Электрониканы бөлме ішінде ұстаңыз; сыртқа тек батырма мен оның төмен кернеулі кабелі шығады." },
    { en: "Do not reuse the wiring of an old mains-powered doorbell transformer for this circuit.", ru: "Не используйте для этой схемы проводку старого звонка с сетевым трансформатором.", kk: "Бұл тізбек үшін желілік трансформаторы бар ескі қоңыраудың сымдарын пайдаланбаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "power-on: doorbell armed",
      "Wi-Fi OK in 2.3 s",
      "Telegram: sent",
      "going to deep sleep, press the button to ring",
      "woke up: button (ring #1)",
      "Wi-Fi OK in 1.9 s",
      "Telegram: sent",
      "going to deep sleep, press the button to ring",
      "woke up: button (ring #2)",
      "rang again within 20 s, message skipped",
      "going to deep sleep, press the button to ring",
    ],
    leds: [],
  },
} satisfies GuideContent;
