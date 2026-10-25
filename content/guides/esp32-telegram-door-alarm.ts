import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-telegram-door-alarm",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "security",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 9,
  xpReward: 230,
  title: {
    en: "ESP32 Telegram Door Alarm",
    ru: "Дверная сигнализация на ESP32 с Telegram",
    kk: "ESP32 және Telegram есік дабылы",
  },
  summary: {
    en: "A reed switch and a magnet watch the door. When it opens while the alarm is armed, a buzzer sounds and your Telegram bot messages you; /arm, /disarm and /status work from the chat.",
    ru: "Геркон и магнит следят за дверью. Если она открывается при включённой охране, звучит зуммер, а Telegram-бот присылает сообщение. Команды /arm, /disarm и /status работают прямо из чата.",
    kk: "Геркон мен магнит есікті бақылайды. Күзет қосулы кезде есік ашылса, зуммер дыбыс береді, ал Telegram боты хабар жібереді. /arm, /disarm және /status командалары чаттан тікелей жұмыс істейді.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit V1 (WROOM-32), 3.3 V logic", ru: "ESP32 DevKit V1 (WROOM-32), логика 3,3 В", kk: "ESP32 DevKit V1 (WROOM-32), 3,3 В логика" }, role: { en: "Controller, Wi-Fi and Telegram client", ru: "Контроллер, Wi-Fi и клиент Telegram", kk: "Контроллер, Wi-Fi және Telegram клиенті" } },
    { component: "reed-switch", qty: 1, spec: { en: "normally open, door sensor kit with magnet (e.g. MC-38)", ru: "нормально разомкнутый, дверной комплект с магнитом (например MC-38)", kk: "қалыпты ажыраулы, магниті бар есік жинағы (мысалы MC-38)" }, role: { en: "Door open/closed sensor", ru: "Датчик открытия двери", kk: "Есік ашылу датчигі" } },
    { component: "buzzer-active", qty: 1, spec: { en: "5 V active buzzer, 12 mm", ru: "активный зуммер 5 В, 12 мм", kk: "5 В белсенді зуммер, 12 мм" }, role: { en: "Local siren", ru: "Местная сирена", kk: "Жергілікті сирена" } },
    { component: "npn-transistor", qty: 1, spec: { en: "2N2222 or BC547", ru: "2N2222 или BC547", kk: "2N2222 немесе BC547" }, role: { en: "Switches the 5 V buzzer from a 3.3 V pin", ru: "Включает зуммер 5 В от пина 3,3 В", kk: "5 В зуммерді 3,3 В пиннен қосады" } },
    { component: "led", qty: 1, spec: { en: "5 mm red", ru: "5 мм, красный", kk: "5 мм, қызыл" }, role: { en: "Armed indicator", ru: "Индикатор охраны", kk: "Күзет индикаторы" } },
    { component: "resistor", qty: 2, spec: { en: "1 kΩ (transistor base), 220 Ω (LED)", ru: "1 кОм (база транзистора), 220 Ом (светодиод)", kk: "1 кОм (транзистор базасы), 220 Ом (жарық диоды)" }, role: { en: "Current limit", ru: "Ограничение тока", kk: "Токты шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 12, spec: { en: "male-male; 2-core cable to reach the door", ru: "папа-папа; двухжильный кабель до двери", kk: "аталық-аталық; есікке дейін екі сымды кабель" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "reed", component: "reed-switch", label: "Door" },
    { id: "r_b", component: "resistor", label: "1 kΩ" },
    { id: "q1", component: "npn-transistor", label: "2N2222" },
    { id: "bz", component: "buzzer-active", label: "Siren" },
    { id: "r_led", component: "resistor", label: "220 Ω" },
    { id: "led_arm", component: "led", label: "Armed" },
  ],
  connections: [
    { from: "board.GPIO27", to: "reed.1", color: "blue", note: { en: "internal pull-up: closed door = LOW", ru: "внутренняя подтяжка: дверь закрыта = LOW", kk: "ішкі тарту: есік жабық = LOW" } },
    { from: "reed.2", to: "board.GND", color: "black" },
    { from: "board.GPIO25", to: "r_b.A", color: "orange" },
    { from: "r_b.B", to: "q1.B", color: "orange" },
    { from: "q1.E", to: "board.GND2", color: "black", note: { en: "flat side facing you: E-B-C on 2N2222", ru: "плоской стороной к себе: E-B-C у 2N2222", kk: "жалпақ жағы өзіңізге қарай: 2N2222-де E-B-C" } },
    { from: "board.5V", to: "bz.+", color: "red", note: { en: "long leg of the buzzer", ru: "длинная ножка зуммера", kk: "зуммердің ұзын аяғы" } },
    { from: "bz.-", to: "q1.C", color: "gray", note: { en: "transistor switches the buzzer's ground side", ru: "транзистор коммутирует «землю» зуммера", kk: "транзистор зуммердің жер жағын коммутациялайды" } },
    { from: "board.GPIO26", to: "r_led.A", color: "red" },
    { from: "r_led.B", to: "led_arm.A", color: "red" },
    { from: "led_arm.K", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Create the Telegram bot", ru: "Создайте Telegram-бота", kk: "Telegram ботын жасаңыз" },
      body: {
        en: "In Telegram, open @BotFather, send /newbot and follow the prompts. Copy the token it gives you (looks like 123456789:AA...). Then open your new bot and press Start, and get your numeric chat ID from @userinfobot. The sketch only obeys messages from that chat ID.",
        ru: "В Telegram откройте @BotFather, отправьте /newbot и следуйте подсказкам. Скопируйте выданный токен (вида 123456789:AA...). Затем откройте своего нового бота и нажмите Start, а свой числовой chat ID узнайте у @userinfobot. Скетч выполняет команды только из этого чата.",
        kk: "Telegram-да @BotFather-ды ашып, /newbot жіберіңіз де, нұсқауларды орындаңыз. Берілген токенді көшіріп алыңыз (123456789:AA... түрінде). Содан кейін жаңа ботыңызды ашып, Start басыңыз, ал өзіңіздің сандық chat ID-іңізді @userinfobot арқылы біліңіз. Скетч тек сол чаттан келген командаларды орындайды.",
      },
      expect: { en: "You have a bot token and a chat ID such as 123456789.", ru: "У вас есть токен бота и chat ID вида 123456789.", kk: "Сізде бот токені және 123456789 сияқты chat ID бар." },
      mistake: { en: "Forgetting to press Start in your bot: Telegram does not let a bot write to you first.", ru: "Забыли нажать Start у своего бота: Telegram не разрешает боту писать первым.", kk: "Ботыңызда Start басуды ұмыттыңыз: Telegram ботқа бірінші болып жазуға рұқсат бермейді." },
    },
    {
      title: { en: "Wire the reed switch", ru: "Подключите геркон", kk: "Герконды қосыңыз" },
      body: {
        en: "A reed switch is two contacts in a glass tube that close when a magnet is near. Connect one lead to GPIO27 and the other to GND. The sketch enables the internal pull-up, so a closed door (magnet next to the switch) reads LOW and an open door reads HIGH. Fix the switch to the frame and the magnet to the door, less than 10 mm apart when closed.",
        ru: "Геркон — это два контакта в стеклянной колбе, которые замыкаются рядом с магнитом. Один вывод подключите к GPIO27, другой к GND. Скетч включает внутреннюю подтяжку, поэтому закрытая дверь (магнит рядом) читается как LOW, а открытая как HIGH. Закрепите геркон на коробке, а магнит на двери так, чтобы в закрытом положении между ними было меньше 10 мм.",
        kk: "Геркон — шыны түтікшедегі екі түйіспе, олар магнит жақын болғанда тұйықталады. Бір шықпасын GPIO27-ге, екіншісін GND-ге қосыңыз. Скетч ішкі тартуды қосады, сондықтан жабық есік (магнит жанында) LOW, ал ашық есік HIGH болып оқылады. Герконды есік жақтауына, магнитті есікке жабық күйде араларында 10 мм-ден аз қалатындай бекітіңіз.",
      },
      expect: { en: "Moving the magnet away prints \"Door OPEN\", bringing it back prints \"Door closed\".", ru: "Если отвести магнит, печатается «Door OPEN», если вернуть — «Door closed».", kk: "Магнитті алыстатсаңыз «Door OPEN», қайта жақындатсаңыз «Door closed» шығады." },
      mistake: { en: "Bending the glass tube's leads right at the glass cracks the seal and kills the switch.", ru: "Если гнуть выводы геркона у самого стекла, колба трескается и геркон выходит из строя.", kk: "Геркон шықпаларын шынының дәл түбінен майыстырсаңыз, түтікше жарылып, геркон істен шығады." },
    },
    {
      title: { en: "Drive the 5 V buzzer through a transistor", ru: "Подключите зуммер 5 В через транзистор", kk: "5 В зуммерді транзистор арқылы қосыңыз" },
      body: {
        en: "The active buzzer is loud at 5 V and needs about 30 mA, more than a GPIO should give. Put its long leg (+) on the 5V pin and its short leg (−) on the collector of the 2N2222. The emitter goes to GND, and the base goes through 1 kΩ to GPIO25. When GPIO25 goes HIGH, the transistor connects the buzzer to ground and it sounds.",
        ru: "Активный зуммер громкий при 5 В и потребляет около 30 мА — больше, чем стоит брать с GPIO. Его длинную ножку (+) подключите к пину 5V, короткую (−) к коллектору 2N2222. Эмиттер на GND, база через 1 кОм к GPIO25. Когда на GPIO25 HIGH, транзистор соединяет зуммер с землёй, и он звучит.",
        kk: "Белсенді зуммер 5 В-та қатты дыбыстайды және шамамен 30 мА тұтынады — бұл GPIO-дан алуға болатыннан көп. Оның ұзын аяғын (+) 5V пиніне, қысқа аяғын (−) 2N2222 коллекторына қосыңыз. Эмиттерді GND-ге, базаны 1 кОм арқылы GPIO25-ке жалғаңыз. GPIO25 HIGH болғанда транзистор зуммерді жерге қосып, ол дыбыстайды.",
      },
      expect: { en: "The buzzer is silent at boot and beeps in a pattern when the alarm triggers.", ru: "При запуске зуммер молчит и пищит прерывисто при срабатывании тревоги.", kk: "Іске қосылғанда зуммер үнсіз, ал дабыл іске қосылғанда үзік-үзік дыбыстайды." },
      mistake: { en: "Mixing up emitter and collector gives a weak or no sound; check the pinout printed for your transistor.", ru: "Если перепутать эмиттер и коллектор, звук будет слабым или не будет вовсе: проверьте цоколёвку своего транзистора.", kk: "Эмиттер мен коллекторды шатастырсаңыз, дыбыс әлсіз болады немесе мүлдем болмайды: транзисторыңыздың шықпаларын тексеріңіз." },
    },
    {
      title: { en: "Add the armed LED", ru: "Добавьте индикатор охраны", kk: "Күзет индикаторын қосыңыз" },
      body: {
        en: "Connect GPIO26 through a 220 Ω resistor to the LED's long leg, and the short leg to GND. The LED is on while the alarm is armed, so you can see the state at the door without opening Telegram.",
        ru: "Подключите GPIO26 через резистор 220 Ом к длинной ножке светодиода, короткую ножку к GND. Светодиод горит, пока охрана включена, так что состояние видно у двери без Telegram.",
        kk: "GPIO26-ны 220 Ом резистор арқылы жарық диодының ұзын аяғына, қысқа аяғын GND-ге қосыңыз. Күзет қосулы тұрғанда жарық диоды жанады, сондықтан күйді Telegram-сыз есік жанында көруге болады.",
      },
      expect: { en: "The LED lights right after boot (the sketch starts armed).", ru: "Светодиод загорается сразу после запуска (скетч стартует в режиме охраны).", kk: "Іске қосылған соң жарық диоды бірден жанады (скетч күзет режимінде басталады)." },
      mistake: { en: "An LED without its resistor overloads GPIO26.", ru: "Светодиод без резистора перегружает GPIO26.", kk: "Резисторсыз жарық диоды GPIO26-ны шамадан тыс жүктейді." },
    },
    {
      title: { en: "Fill in the secrets and upload", ru: "Впишите секреты и загрузите скетч", kk: "Құпия деректерді жазып, скетчті жүктеңіз" },
      body: {
        en: "Install \"UniversalTelegramBot\" and \"ArduinoJson\" from the Library Manager. Put your Wi-Fi name, password, bot token and chat ID into the constants at the top. Upload and open the Serial Monitor at 115200 baud. The bot greets you with \"Door alarm online\" once it is connected.",
        ru: "Установите «UniversalTelegramBot» и «ArduinoJson» через Library Manager. Впишите в константы вверху имя и пароль Wi-Fi, токен бота и chat ID. Загрузите скетч и откройте Serial Monitor на 115200 бод. После подключения бот пришлёт «Door alarm online».",
        kk: "Library Manager арқылы «UniversalTelegramBot» және «ArduinoJson» кітапханаларын орнатыңыз. Жоғарыдағы тұрақтыларға Wi-Fi атауы мен құпиясөзін, бот токенін және chat ID-ді жазыңыз. Скетчті жүктеп, Serial Monitor-ды 115200 бодта ашыңыз. Қосылғаннан кейін бот «Door alarm online» деп жазады.",
      },
      expect: { en: "A Telegram message \"Door alarm online. Armed.\" arrives within a few seconds.", ru: "Через несколько секунд приходит сообщение «Door alarm online. Armed.».", kk: "Бірнеше секундта «Door alarm online. Armed.» хабары келеді." },
      mistake: { en: "Pasting the token with a space or missing the part before the colon gives \"Unauthorized\" and no messages.", ru: "Если вставить токен с пробелом или без части до двоеточия, будет «Unauthorized» и сообщения не придут.", kk: "Токенді бос орынмен немесе қос нүктеге дейінгі бөлігінсіз қойсаңыз, «Unauthorized» болып, хабарлар келмейді." },
    },
    {
      title: { en: "Test arming from the chat", ru: "Проверьте управление из чата", kk: "Чаттан басқаруды тексеріңіз" },
      body: {
        en: "Open the door: the buzzer beeps for 5 seconds and you get \"ALERT: door opened\". Send /disarm: the LED goes off and opening the door is only logged. Send /arm to re-arm and /status to see the door state. Messages from other chats are ignored.",
        ru: "Откройте дверь: зуммер пищит 5 секунд, а вам приходит «ALERT: door opened». Отправьте /disarm: светодиод гаснет, и открытие двери только записывается в лог. /arm снова включает охрану, а /status показывает состояние двери. Сообщения из чужих чатов игнорируются.",
        kk: "Есікті ашыңыз: зуммер 5 секунд дыбыстайды, ал сізге «ALERT: door opened» келеді. /disarm жіберіңіз: жарық диоды сөніп, есіктің ашылуы тек журналға жазылады. /arm күзетті қайта қосады, /status есік күйін көрсетеді. Басқа чаттардан келген хабарлар еленбейді.",
      },
      expect: { en: "The bot answers each command within about 2 seconds.", ru: "Бот отвечает на каждую команду примерно за 2 секунды.", kk: "Бот әр командаға шамамен 2 секундта жауап береді." },
      mistake: { en: "Sharing the sketch with the token inside lets anyone control the bot; revoke it in @BotFather if it leaks.", ru: "Если поделиться скетчем с токеном, ботом сможет управлять кто угодно; при утечке отзовите токен в @BotFather.", kk: "Скетчті токенімен бөліссеңіз, ботты кез келген адам басқара алады; токен тарап кетсе, оны @BotFather-да қайтарып алыңыз." },
    },
  ],
  code: [{
    filename: "telegram_door_alarm.ino",
    language: "cpp",
    libraries: ["UniversalTelegramBot", "ArduinoJson"],
    source: String.raw`#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <UniversalTelegramBot.h>
#include <ArduinoJson.h>

// ---- change these (keep the token private) ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_PASSWORD";
const char* BOT_TOKEN = "YOUR_BOT_TOKEN";   // from @BotFather
const char* CHAT_ID   = "YOUR_CHAT_ID";     // from @userinfobot

const int REED_PIN = 27;     // to GND, closed door = LOW
const int BUZZER_PIN = 25;   // NPN base via 1 kOhm
const int LED_PIN = 26;      // armed indicator

const unsigned long ALARM_MS = 5000;
const unsigned long POLL_INTERVAL_MS = 2000;
const unsigned long DEBOUNCE_MS = 50;

WiFiClientSecure client;
UniversalTelegramBot bot(BOT_TOKEN, client);

bool armed = true;
bool doorOpen = false;
unsigned long alarmUntil = 0;
unsigned long lastPoll = 0;
volatile bool doorChanged = false;

void IRAM_ATTR onDoorChange() {
  doorChanged = true;
}

void setArmed(bool on) {
  armed = on;
  digitalWrite(LED_PIN, on ? HIGH : LOW);
  if (!on) {
    alarmUntil = 0;
    digitalWrite(BUZZER_PIN, LOW);
  }
  Serial.println(on ? "Armed" : "Disarmed");
}

void send(const String& text) {
  bool ok = bot.sendMessage(CHAT_ID, text, "");
  Serial.println(ok ? "Telegram: sent" : "Telegram: send failed");
}

void handleMessages(int count) {
  for (int i = 0; i < count; i++) {
    String from = bot.messages[i].chat_id;
    String text = bot.messages[i].text;
    if (from != CHAT_ID) {
      Serial.println("Ignored message from unknown chat " + from);
      continue;
    }
    Serial.println("Command " + text);
    if (text == "/arm") {
      setArmed(true);
      send("Armed.");
    } else if (text == "/disarm") {
      setArmed(false);
      send("Disarmed.");
    } else if (text == "/status") {
      send(String("Door is ") + (doorOpen ? "OPEN" : "closed") + ", alarm " + (armed ? "armed." : "disarmed."));
    } else {
      send("Commands: /arm /disarm /status");
    }
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
  pinMode(LED_PIN, OUTPUT);
  pinMode(REED_PIN, INPUT_PULLUP);
  doorOpen = digitalRead(REED_PIN) == HIGH;
  attachInterrupt(digitalPinToInterrupt(REED_PIN), onDoorChange, CHANGE);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.printf("Connecting to %s", WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Wi-Fi connected, IP ");
  Serial.println(WiFi.localIP());

  configTime(0, 0, "pool.ntp.org");               // TLS likes a correct clock
  client.setCACert(TELEGRAM_CERTIFICATE_ROOT);    // api.telegram.org root certificate
  setArmed(true);
  send("Door alarm online. Armed.");
}

void loop() {
  // door state, debounced after the interrupt fired
  if (doorChanged) {
    delay(DEBOUNCE_MS);
    doorChanged = false;
    bool open = digitalRead(REED_PIN) == HIGH;
    if (open != doorOpen) {
      doorOpen = open;
      Serial.println(open ? "Door OPEN" : "Door closed");
      if (open && armed) {
        alarmUntil = millis() + ALARM_MS;
        send("ALERT: door opened!");
      } else if (!open && armed) {
        send("Door closed.");
      }
    }
  }

  // siren: 200 ms on / 200 ms off while the alarm runs
  if (alarmUntil && millis() < alarmUntil) {
    digitalWrite(BUZZER_PIN, (millis() / 200) % 2 ? HIGH : LOW);
  } else if (alarmUntil) {
    alarmUntil = 0;
    digitalWrite(BUZZER_PIN, LOW);
  }

  // Telegram commands
  if (millis() - lastPoll > POLL_INTERVAL_MS) {
    lastPoll = millis();
    int count = bot.getUpdates(bot.last_message_received + 1);
    while (count) {
      handleMessages(count);
      count = bot.getUpdates(bot.last_message_received + 1);
    }
  }

  if (WiFi.status() != WL_CONNECTED) WiFi.reconnect();
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Serial says \"Telegram: send failed\"", ru: "В мониторе «Telegram: send failed»", kk: "Мониторда «Telegram: send failed» шығады" },
      cause: { en: "Wrong token or chat ID, you never pressed Start in the bot, or the network blocks api.telegram.org.", ru: "Неверный токен или chat ID, вы не нажали Start у бота, или сеть блокирует api.telegram.org.", kk: "Токен немесе chat ID қате, ботта Start басылмаған немесе желі api.telegram.org-ды бұғаттайды." },
      fix: { en: "Re-copy the token, press Start in the bot, and test from another network (phone hotspot) to rule out blocking.", ru: "Скопируйте токен заново, нажмите Start у бота и проверьте из другой сети (раздача с телефона), чтобы исключить блокировку.", kk: "Токенді қайта көшіріп, ботта Start басыңыз және бұғаттауды жоққа шығару үшін басқа желіден (телефон хотспоты) тексеріңіз." },
    },
    {
      symptom: { en: "The door always reads OPEN", ru: "Дверь всегда «открыта»", kk: "Есік әрқашан «ашық» болып оқылады" },
      cause: { en: "The magnet is too far from the reed switch or aligned at the wrong end.", ru: "Магнит слишком далеко от геркона или стоит не напротив него.", kk: "Магнит герконнан тым алыс немесе оның қарсысында тұрмаған." },
      fix: { en: "Align the magnet with the middle of the switch and keep the gap under 10 mm; check with a multimeter in continuity mode.", ru: "Выставьте магнит напротив середины геркона с зазором меньше 10 мм; проверьте мультиметром в режиме прозвонки.", kk: "Магнитті геркон ортасының қарсысына 10 мм-ден аз саңылаумен қойып, мультиметрдің шырылдату режимінде тексеріңіз." },
    },
    {
      symptom: { en: "Random \"Door OPEN\" alerts with a long cable", ru: "Ложные «Door OPEN» при длинном кабеле", kk: "Ұзын кабельде жалған «Door OPEN» дабылдары" },
      cause: { en: "The weak internal pull-up (about 45 kΩ) picks up noise on a cable of several metres.", ru: "Слабая внутренняя подтяжка (около 45 кОм) ловит помехи на кабеле в несколько метров.", kk: "Әлсіз ішкі тарту (шамамен 45 кОм) бірнеше метрлік кабельде кедергілерді қабылдайды." },
      fix: { en: "Use twisted-pair cable and add an external 10 kΩ resistor from GPIO27 to 3V3.", ru: "Используйте витую пару и добавьте внешний резистор 10 кОм от GPIO27 к 3V3.", kk: "Есілген жұп кабель қолданып, GPIO27-ден 3V3-ке сыртқы 10 кОм резистор қосыңыз." },
    },
    {
      symptom: { en: "Buzzer beeps constantly from power-on", ru: "Зуммер пищит сразу после включения", kk: "Зуммер қосылған бойда дыбыстайды" },
      cause: { en: "The buzzer's − is wired to GND instead of the collector, or the transistor is in backwards.", ru: "Минус зуммера подключён к GND, а не к коллектору, или транзистор вставлен наоборот.", kk: "Зуммердің минусы коллекторға емес, GND-ге қосылған немесе транзистор кері қойылған." },
      fix: { en: "Follow the chain 5V → buzzer + → buzzer − → collector, emitter → GND.", ru: "Проверьте цепочку 5V → + зуммера → − зуммера → коллектор, эмиттер → GND.", kk: "Тізбекті тексеріңіз: 5V → зуммер + → зуммер − → коллектор, эмиттер → GND." },
    },
  ],
  safety: [
    { en: "Keep your bot token secret like a password. Anyone with it can read the bot's messages and send commands.", ru: "Храните токен бота как пароль. Любой, у кого он есть, может читать сообщения бота и отправлять команды.", kk: "Бот токенін құпиясөз сияқты сақтаңыз. Оны білетін кез келген адам бот хабарларын оқып, команда жібере алады." },
    { en: "This is a hobby alarm without a backup battery or tamper protection; it does not replace a certified security system.", ru: "Это любительская сигнализация без резервного питания и защиты от вскрытия; она не заменяет сертифицированную охранную систему.", kk: "Бұл резервтік қуаты мен ашудан қорғанысы жоқ әуесқой дабыл; ол сертификатталған күзет жүйесін алмастырмайды." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Connecting to YOUR_WIFI....",
      "Wi-Fi connected, IP 192.168.1.60",
      "Armed",
      "Telegram: sent",
      "Door OPEN",
      "Telegram: sent",
      "Door closed",
      "Telegram: sent",
      "Command /disarm",
      "Disarmed",
      "Telegram: sent",
      "Door OPEN",
      "Door closed",
      "Command /status",
      "Telegram: sent",
    ],
    leds: [{ label: "ARMED", color: "#E53935" }, { label: "SIREN", color: "#FF7A1A" }],
  },
} satisfies GuideContent;
