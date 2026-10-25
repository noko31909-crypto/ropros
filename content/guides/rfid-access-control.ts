import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "rfid-access-control",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "security",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 15,
  xpReward: 220,
  title: {
    en: "RFID Access Control with Servo Latch",
    ru: "RFID-доступ с сервозащёлкой",
    kk: "Серво ілгегі бар RFID кіру жүйесі",
  },
  summary: {
    en: "An RC522 reader checks card UIDs against a whitelist. A known card lights the green LED and swings an SG90 latch open for 3 s; an unknown one blinks red. SPI lines are divided down to 3.3 V.",
    ru: "Считыватель RC522 сверяет UID карт с белым списком. Знакомая карта зажигает зелёный светодиод и на 3 с открывает защёлку на SG90, чужая мигает красным. Линии SPI понижены делителями до 3,3 В.",
    kk: "RC522 оқу құрылғысы карталардың UID-ін рұқсат тізімімен салыстырады. Таныс карта жасыл жарық диодын жағып, SG90 ілгегін 3 с-қа ашады, бөтен карта қызыл жыпылықтайды. SPI желілері бөлгіштермен 3,3 В-қа дейін төмендетілген.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "rc522-rfid", qty: 1, spec: { en: "13.56 MHz, 3.3 V only, with card and key fob", ru: "13,56 МГц, только 3,3 В, с картой и брелоком", kk: "13,56 МГц, тек 3,3 В, карта мен брелокпен" }, role: { en: "Reads card UIDs", ru: "Читает UID карт", kk: "Карта UID-ін оқиды" } },
    { component: "resistor", qty: 10, spec: { en: "4 × 1 kΩ, 4 × 2 kΩ, 2 × 220 Ω", ru: "4 × 1 кОм, 4 × 2 кОм, 2 × 220 Ом", kk: "4 × 1 кОм, 4 × 2 кОм, 2 × 220 Ом" }, role: { en: "5 V → 3.3 V dividers and LED resistors", ru: "Делители 5 В → 3,3 В и резисторы светодиодов", kk: "5 В → 3,3 В бөлгіштері және жарық диодының резисторлары" } },
    { component: "servo-sg90", qty: 1, spec: { en: "4.8–6 V micro servo", ru: "микросерво 4,8–6 В", kk: "4,8–6 В микросерво" }, role: { en: "Latch bolt", ru: "Ригель защёлки", kk: "Ілгек ригелі" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V 1 A USB charger + USB breakout", ru: "USB-зарядка 5 В 1 А + USB-переходник на пины", kk: "5 В 1 А USB зарядтағыш + USB-пин адаптері" }, role: { en: "Servo power", ru: "Питание серво", kk: "Серво қорегі" } },
    { component: "led", qty: 2, spec: { en: "5 mm green and red", ru: "5 мм зелёный и красный", kk: "5 мм жасыл және қызыл" }, role: { en: "Granted / denied", ru: "Разрешено / отказано", kk: "Рұқсат / бас тарту" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 25, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "rfid", component: "rc522-rfid", label: "RC522" },
    { id: "r_ss1", component: "resistor", label: "1 kΩ SDA" },
    { id: "r_ss2", component: "resistor", label: "2 kΩ SDA" },
    { id: "r_sck1", component: "resistor", label: "1 kΩ SCK" },
    { id: "r_sck2", component: "resistor", label: "2 kΩ SCK" },
    { id: "r_mosi1", component: "resistor", label: "1 kΩ MOSI" },
    { id: "r_mosi2", component: "resistor", label: "2 kΩ MOSI" },
    { id: "r_rst1", component: "resistor", label: "1 kΩ RST" },
    { id: "r_rst2", component: "resistor", label: "2 kΩ RST" },
    { id: "servo", component: "servo-sg90", label: "Latch" },
    { id: "psu", component: "usb-5v", label: "Servo 5 V" },
    { id: "r_g", component: "resistor", label: "220 Ω" },
    { id: "led_g", component: "led", label: "Green" },
    { id: "r_r", component: "resistor", label: "220 Ω" },
    { id: "led_r", component: "led", label: "Red" },
  ],
  connections: [
    { from: "board.3V3", to: "rfid.3.3V", color: "orange", note: { en: "3.3 V only: 5 V destroys the RC522", ru: "только 3,3 В: 5 В сожгут RC522", kk: "тек 3,3 В: 5 В RC522-ні күйдіреді" } },
    { from: "rfid.GND", to: "board.GND", color: "black" },
    { from: "board.D10", to: "r_ss1.A", color: "blue" },
    { from: "r_ss1.B", to: "rfid.SDA", color: "blue", note: { en: "SDA is the SPI chip-select (SS) here", ru: "SDA здесь — выбор чипа SPI (SS)", kk: "SDA мұнда — SPI чипін таңдау (SS)" } },
    { from: "rfid.SDA", to: "r_ss2.A", color: "gray" },
    { from: "r_ss2.B", to: "board.GND", color: "black" },
    { from: "board.D13", to: "r_sck1.A", color: "yellow" },
    { from: "r_sck1.B", to: "rfid.SCK", color: "yellow" },
    { from: "rfid.SCK", to: "r_sck2.A", color: "gray" },
    { from: "r_sck2.B", to: "board.GND", color: "black" },
    { from: "board.D11", to: "r_mosi1.A", color: "green" },
    { from: "r_mosi1.B", to: "rfid.MOSI", color: "green" },
    { from: "rfid.MOSI", to: "r_mosi2.A", color: "gray" },
    { from: "r_mosi2.B", to: "board.GND", color: "black" },
    { from: "board.D9", to: "r_rst1.A", color: "purple" },
    { from: "r_rst1.B", to: "rfid.RST", color: "purple" },
    { from: "rfid.RST", to: "r_rst2.A", color: "gray" },
    { from: "r_rst2.B", to: "board.GND", color: "black" },
    { from: "rfid.MISO", to: "board.D12", color: "white", note: { en: "direct: 3.3 V is a valid HIGH for the Uno", ru: "напрямую: 3,3 В — это уже HIGH для Uno", kk: "тікелей: 3,3 В Uno үшін HIGH болып саналады" } },
    { from: "psu.5V", to: "servo.VCC", color: "red" },
    { from: "psu.GND", to: "servo.GND", color: "brown" },
    { from: "servo.GND", to: "board.GND2", color: "black", note: { en: "shared ground", ru: "общая земля", kk: "ортақ жер" } },
    { from: "board.D3", to: "servo.SIG", color: "orange" },
    { from: "board.D5", to: "r_g.A", color: "green" },
    { from: "r_g.B", to: "led_g.A", color: "green" },
    { from: "led_g.K", to: "board.GND3", color: "black" },
    { from: "board.D4", to: "r_r.A", color: "red" },
    { from: "r_r.B", to: "led_r.A", color: "red" },
    { from: "led_r.K", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Power the RC522 from 3.3 V", ru: "Запитайте RC522 от 3,3 В", kk: "RC522-ні 3,3 В-тан қоректендіріңіз" },
      body: {
        en: "Solder the header onto the RC522 if it came loose. Connect its 3.3V pin to the Uno's 3V3 pin and GND to GND. The RC522 is a 3.3 V chip: its supply and every input it receives must stay at or below 3.6 V. IRQ stays unconnected.",
        ru: "Припаяйте гребёнку к RC522, если она шла отдельно. Подключите его пин 3.3V к пину 3V3 Uno, GND к GND. RC522 — микросхема на 3,3 В: и питание, и все её входы должны быть не выше 3,6 В. IRQ оставьте неподключённым.",
        kk: "Егер тарақ бөлек келсе, оны RC522-ге дәнекерлеңіз. Оның 3.3V пинін Uno-ның 3V3 пиніне, GND-ін GND-ге қосыңыз. RC522 — 3,3 В микросхема: оның қорегі де, барлық кірістері де 3,6 В-тан аспауы керек. IRQ қосылмай қалады.",
      },
      expect: { en: "The red power LED on the RC522 lights when the Uno is on USB.", ru: "Красный светодиод питания на RC522 горит, когда Uno подключён к USB.", kk: "Uno USB-ге қосылғанда RC522-дегі қызыл қуат жарық диоды жанады." },
      mistake: { en: "Plugging the 3.3V pin into the 5V header is the most common way to kill an RC522.", ru: "Подключение пина 3.3V к 5V — самый частый способ сжечь RC522.", kk: "3.3V пинін 5V-қа қосу — RC522-ні күйдірудің ең жиі жолы." },
    },
    {
      title: { en: "Build four voltage dividers", ru: "Соберите четыре делителя напряжения", kk: "Төрт кернеу бөлгішін құрастырыңыз" },
      body: {
        en: "The Uno drives its pins at 5 V, so each line going into the RC522 gets a divider: 1 kΩ in series from the Arduino pin, 2 kΩ from the RC522 pin to GND, giving 3.3 V. Build one for SDA (D10), SCK (D13), MOSI (D11) and RST (D9). MISO goes straight from the RC522 to D12, because 3.3 V already reads as HIGH on the Uno. Dividers are used instead of a BSS138 level-shifter board because they stay clean at the 4 MHz SPI clock the MFRC522 library uses.",
        ru: "Uno выдаёт на пинах 5 В, поэтому каждая линия, идущая в RC522, получает делитель: 1 кОм последовательно от пина Arduino и 2 кОм от пина RC522 на GND — получается 3,3 В. Соберите делители для SDA (D10), SCK (D13), MOSI (D11) и RST (D9). MISO идёт от RC522 прямо на D12: 3,3 В Uno и так читает как HIGH. Делители выбраны вместо платы-преобразователя на BSS138, потому что они дают чистые фронты на частоте SPI 4 МГц, которую использует библиотека MFRC522.",
        kk: "Uno пиндерге 5 В береді, сондықтан RC522-ге баратын әр желіге бөлгіш қойылады: Arduino пинінен тізбектей 1 кОм және RC522 пинінен GND-ге 2 кОм — нәтижесінде 3,3 В. SDA (D10), SCK (D13), MOSI (D11) және RST (D9) үшін бөлгіш жасаңыз. MISO RC522-ден тікелей D12-ге барады: Uno 3,3 В-ты онсыз да HIGH деп оқиды. Бөлгіштер BSS138 түрлендіргіш платасының орнына таңдалды, өйткені олар MFRC522 кітапханасы қолданатын 4 МГц SPI жиілігінде таза фронт береді.",
      },
      expect: { en: "Four 1 kΩ + 2 kΩ pairs; with a multimeter each RC522 input reads about 3.3 V when its Arduino pin is HIGH.", ru: "Четыре пары 1 кОм + 2 кОм; мультиметр на каждом входе RC522 показывает около 3,3 В, когда пин Arduino в HIGH.", kk: "Төрт жұп 1 кОм + 2 кОм; Arduino пині HIGH болғанда мультиметр RC522-нің әр кірісінде шамамен 3,3 В көрсетеді." },
      mistake: { en: "Swapping the two resistors gives 1.7 V instead of 3.3 V and the reader is never detected.", ru: "Если поменять резисторы местами, получится 1,7 В вместо 3,3 В, и считыватель не определится.", kk: "Резисторларды ауыстырып алсаңыз, 3,3 В-тың орнына 1,7 В шығады да, оқу құрылғысы анықталмайды." },
    },
    {
      title: { en: "Add the LEDs", ru: "Добавьте светодиоды", kk: "Жарық диодтарын қосыңыз" },
      body: {
        en: "Green LED: D5 → 220 Ω → long leg, short leg to GND. Red LED: D4 → 220 Ω → long leg, short leg to GND.",
        ru: "Зелёный светодиод: D5 → 220 Ом → длинная ножка, короткая на GND. Красный: D4 → 220 Ом → длинная ножка, короткая на GND.",
        kk: "Жасыл жарық диоды: D5 → 220 Ом → ұзын аяқ, қысқа аяқ GND-ге. Қызыл: D4 → 220 Ом → ұзын аяқ, қысқа аяқ GND-ге.",
      },
      expect: { en: "At boot both LEDs blink once as a self-test.", ru: "При старте оба светодиода один раз мигают для самопроверки.", kk: "Іске қосылғанда екі жарық диоды да өзін-өзі тексеру үшін бір рет жыпылықтайды." },
      mistake: { en: "An LED without its resistor overloads the pin.", ru: "Светодиод без резистора перегружает пин.", kk: "Резисторсыз жарық диоды пинді шамадан тыс жүктейді." },
    },
    {
      title: { en: "Connect the servo latch", ru: "Подключите сервозащёлку", kk: "Серво ілгегін қосыңыз" },
      body: {
        en: "Power the SG90 from the USB 5 V breakout: red to 5V, brown to GND. Join that GND to an Arduino GND pin, then connect the orange signal wire to D3. Fix a small bolt or hook to the servo horn so that 0° holds the door and 90° frees it.",
        ru: "Питайте SG90 от USB-переходника 5 В: красный на 5V, коричневый на GND. Соедините эту GND с пином GND Arduino, а оранжевый сигнальный провод — с D3. Закрепите на качалке небольшой ригель или крючок так, чтобы 0° держал дверцу, а 90° освобождал её.",
        kk: "SG90-ды USB 5 В адаптерінен қоректендіріңіз: қызылды 5V-қа, қоңырды GND-ге. Сол GND-ді Arduino GND пинімен жалғап, қызғылт сары сигнал сымын D3-ке қосыңыз. 0° есікті ұстап, 90° босататындай етіп серво иініне шағын ригель немесе ілмек бекітіңіз.",
      },
      expect: { en: "At boot the horn moves to 0° and holds there.", ru: "При старте качалка встаёт на 0° и держит положение.", kk: "Іске қосылғанда иін 0°-қа барып, сол күйде тұрады." },
      mistake: { en: "Powering the servo from the Uno 5V pin: the RC522 resets when the servo moves and cards stop reading.", ru: "Если питать серво от 5V Uno, при движении серво RC522 сбрасывается, и карты перестают читаться.", kk: "Серво Uno-ның 5V пинінен қоректенсе, ол қозғалғанда RC522 қайта жүктеліп, карталар оқылмай қалады." },
    },
    {
      title: { en: "Upload, read your cards and whitelist them", ru: "Загрузите скетч, считайте карты и внесите их в список", kk: "Скетчті жүктеп, карталарды оқып, тізімге енгізіңіз" },
      body: {
        en: "Install \"MFRC522\" from the Library Manager, upload and open the Serial Monitor at 9600 baud. The firmware line (0x91 or 0x92) proves SPI works. Hold each card 1–3 cm above the antenna: its UID prints with ACCESS DENIED. Copy the UIDs you want into the ALLOWED list, upload again and test.",
        ru: "Установите «MFRC522» через Library Manager, загрузите скетч и откройте Serial Monitor на 9600 бод. Строка с версией прошивки (0x91 или 0x92) подтверждает, что SPI работает. Поднесите каждую карту на 1–3 см к антенне: её UID напечатается с ACCESS DENIED. Скопируйте нужные UID в список ALLOWED, загрузите снова и проверьте.",
        kk: "Library Manager арқылы «MFRC522» орнатып, скетчті жүктеңіз де, Serial Monitor-ды 9600 бодта ашыңыз. Микробағдарлама нұсқасы жолы (0x91 немесе 0x92) SPI жұмыс істейтінін көрсетеді. Әр картаны антеннаға 1–3 см жақындатыңыз: оның UID-і ACCESS DENIED жазуымен шығады. Қажетті UID-терді ALLOWED тізіміне көшіріп, қайта жүктеңіз де, тексеріңіз.",
      },
      expect: { en: "Your card: green LED, latch opens for 3 s, then \"Locked\". Any other card: red blinks three times.", ru: "Ваша карта: зелёный светодиод, защёлка открыта 3 с, затем «Locked». Любая другая карта: красный мигает три раза.", kk: "Сіздің картаңыз: жасыл жарық диоды, ілгек 3 с ашық, содан кейін «Locked». Кез келген басқа карта: қызыл үш рет жыпылықтайды." },
      mistake: { en: "\"Firmware Version: 0x0\" or 0xFF means the reader is not answering: check the dividers and the MISO wire.", ru: "«Firmware Version: 0x0» или 0xFF — считыватель не отвечает: проверьте делители и провод MISO.", kk: "«Firmware Version: 0x0» немесе 0xFF — оқу құрылғысы жауап бермейді: бөлгіштер мен MISO сымын тексеріңіз." },
    },
  ],
  code: [{
    filename: "rfid_access.ino",
    language: "cpp",
    libraries: ["MFRC522", "Servo"],
    source: `#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

#define SS_PIN 10       // RC522 SDA (through 1k/2k divider)
#define RST_PIN 9       // RC522 RST (through 1k/2k divider)
const int SERVO_PIN = 3;
const int LED_GREEN_PIN = 5;
const int LED_RED_PIN = 4;

const int LOCKED_ANGLE = 0;
const int OPEN_ANGLE = 90;
const unsigned long OPEN_MS = 3000;

// Cards allowed to open. Scan a card and copy the printed UID here.
const char* ALLOWED[] = { "04 A2 19 6B", "DE AD BE EF" };
const int ALLOWED_COUNT = sizeof(ALLOWED) / sizeof(ALLOWED[0]);

MFRC522 rfid(SS_PIN, RST_PIN);
Servo latch;

String uidToString(const MFRC522::Uid &uid) {
  String s = "";
  for (byte i = 0; i < uid.size; i++) {
    if (i > 0) s += ' ';
    if (uid.uidByte[i] < 0x10) s += '0';
    s += String(uid.uidByte[i], HEX);
  }
  s.toUpperCase();
  return s;
}

void grant() {
  digitalWrite(LED_GREEN_PIN, HIGH);
  latch.write(OPEN_ANGLE);
  delay(OPEN_MS);
  latch.write(LOCKED_ANGLE);
  delay(400);                       // let the bolt travel back
  digitalWrite(LED_GREEN_PIN, LOW);
  Serial.println("Locked");
}

void deny() {
  for (int i = 0; i < 3; i++) {
    digitalWrite(LED_RED_PIN, HIGH);
    delay(150);
    digitalWrite(LED_RED_PIN, LOW);
    delay(150);
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(LED_GREEN_PIN, OUTPUT);
  pinMode(LED_RED_PIN, OUTPUT);
  digitalWrite(LED_GREEN_PIN, HIGH);   // self-test blink
  digitalWrite(LED_RED_PIN, HIGH);
  delay(300);
  digitalWrite(LED_GREEN_PIN, LOW);
  digitalWrite(LED_RED_PIN, LOW);

  latch.attach(SERVO_PIN);
  latch.write(LOCKED_ANGLE);

  SPI.begin();
  rfid.PCD_Init();
  Serial.println("RFID access control ready");
  rfid.PCD_DumpVersionToSerial();      // 0x91 / 0x92 = reader found
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;

  String uid = uidToString(rfid.uid);
  bool allowed = false;
  for (int i = 0; i < ALLOWED_COUNT; i++) {
    if (uid == ALLOWED[i]) allowed = true;
  }

  Serial.print("Card ");
  Serial.print(uid);
  if (allowed) {
    Serial.println(" -> ACCESS GRANTED");
    grant();
  } else {
    Serial.println(" -> ACCESS DENIED");
    deny();
  }

  rfid.PICC_HaltA();          // stop reading the same card again
  rfid.PCD_StopCrypto1();
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Firmware Version: 0x0 or 0xFF (unknown), no cards read", ru: "Firmware Version: 0x0 или 0xFF (unknown), карты не читаются", kk: "Firmware Version: 0x0 немесе 0xFF (unknown), карталар оқылмайды" },
      cause: { en: "An SPI wire is on the wrong pin, a divider is reversed, or MISO is not on D12.", ru: "Провод SPI не на своём пине, делитель перевёрнут или MISO не на D12.", kk: "SPI сымы басқа пинде, бөлгіш кері қойылған немесе MISO D12-де емес." },
      fix: { en: "Check SDA→D10, SCK→D13, MOSI→D11, MISO→D12, RST→D9 and that each 1 kΩ sits on the Arduino side.", ru: "Проверьте SDA→D10, SCK→D13, MOSI→D11, MISO→D12, RST→D9 и что каждый 1 кОм стоит со стороны Arduino.", kk: "SDA→D10, SCK→D13, MOSI→D11, MISO→D12, RST→D9 екенін және әр 1 кОм Arduino жағында тұрғанын тексеріңіз." },
    },
    {
      symptom: { en: "Cards read only when they touch the antenna", ru: "Карты читаются только вплотную к антенне", kk: "Карталар антеннаға тигенде ғана оқылады" },
      cause: { en: "Metal behind the reader, or the 3.3 V rail sags when the servo moves.", ru: "За считывателем металл, или шина 3,3 В проседает при движении серво.", kk: "Оқу құрылғысының артында металл бар немесе серво қозғалғанда 3,3 В шинасы түседі." },
      fix: { en: "Mount the RC522 on plastic or wood and keep the servo on its own 5 V supply.", ru: "Закрепите RC522 на пластике или дереве и держите серво на отдельном питании 5 В.", kk: "RC522-ні пластикке немесе ағашқа бекітіп, сервоны бөлек 5 В қорегінде ұстаңыз." },
    },
    {
      symptom: { en: "The servo twitches or the Arduino resets on every card", ru: "Серво дёргается или Arduino перезагружается на каждой карте", kk: "Әр картада серво дірілдейді немесе Arduino қайта жүктеледі" },
      cause: { en: "Missing shared GND between the USB supply and the Arduino.", ru: "Нет общей GND между USB-питанием и Arduino.", kk: "USB қорегі мен Arduino арасында ортақ GND жоқ." },
      fix: { en: "Add the wire from the servo GND to an Arduino GND pin.", ru: "Добавьте провод от GND серво к пину GND Arduino.", kk: "Серво GND-інен Arduino-ның GND пиніне сым қосыңыз." },
    },
  ],
  safety: [
    { en: "Never feed the RC522 from 5 V, and never connect a 5 V pin to its inputs without the divider.", ru: "Никогда не питайте RC522 от 5 В и не подавайте 5 В на его входы без делителя.", kk: "RC522-ні ешқашан 5 В-тан қоректендірмеңіз және оның кірістеріне бөлгішсіз 5 В бермеңіз." },
    { en: "Card UIDs can be cloned; use this for a cabinet or a hobby door, not for anything that needs real security.", ru: "UID карт можно клонировать; используйте это для шкафа или хобби-двери, а не там, где нужна настоящая защита.", kk: "Карта UID-ін көшіруге болады; мұны шынайы қорғаныс қажет жерде емес, шкаф немесе хобби есігі үшін қолданыңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "RFID access control ready",
      "Firmware Version: 0x92 = v2.0",
      "Card 7C 1F 33 A0 -> ACCESS DENIED",
      "Card 04 A2 19 6B -> ACCESS GRANTED",
      "Locked",
      "Card 3B 90 D2 15 -> ACCESS DENIED",
      "Card 04 A2 19 6B -> ACCESS GRANTED",
      "Locked",
    ],
    leds: [{ label: "GREEN", color: "#43A047" }, { label: "RED", color: "#E53935" }],
  },
} satisfies GuideContent;
