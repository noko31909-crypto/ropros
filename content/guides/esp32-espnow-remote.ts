import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-espnow-remote",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "robotics",
  robotics: true,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 12,
  xpReward: 220,
  title: {
    en: "ESP32 ESP-NOW Robot Remote",
    ru: "Пульт для робота на ESP32 по ESP-NOW",
    kk: "ESP-NOW арқылы жұмыс істейтін ESP32 робот пульті",
  },
  summary: {
    en: "A thumb joystick and a button on an ESP32 send 50 packets per second over ESP-NOW: no router, no phone, ~5 ms latency. Includes the receiver sketch that drives any TB6612FNG robot and stops if the remote goes silent.",
    ru: "Джойстик и кнопка на ESP32 шлют 50 пакетов в секунду по ESP-NOW: без роутера и телефона, задержка ~5 мс. В комплекте скетч приёмника, который управляет любым роботом на TB6612FNG и останавливает его, если пульт замолчал.",
    kk: "ESP32-дегі джойстик пен батырма ESP-NOW арқылы секундына 50 пакет жібереді: роутерсіз, телефонсыз, кідіріс ~5 мс. Кез келген TB6612FNG роботын басқаратын және пульт үнсіз қалса тоқтататын қабылдағыш скетчі де бар.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32-WROOM-32 DevKit for the remote (the robot has its own ESP32)", ru: "ESP32-WROOM-32 DevKit для пульта (у робота свой ESP32)", kk: "Пультке арналған ESP32-WROOM-32 DevKit (роботтың өз ESP32-сі бар)" }, role: { en: "Reads the controls and transmits", ru: "Читает органы управления и передаёт", kk: "Басқару элементтерін оқып, жібереді" } },
    { component: "joystick", qty: 1, spec: { en: "KY-023 two-axis thumb joystick with push switch", ru: "двухосевой джойстик KY-023 с нажатием", kk: "басылатын екі осьті KY-023 джойстигі" }, role: { en: "Throttle and steering; click toggles precision mode", ru: "Газ и руль; нажатие включает точный режим", kk: "Газ бен руль; басу дәл режимді қосады" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 or 12×12 mm tactile", ru: "тактовая 6×6 или 12×12 мм", kk: "6×6 не 12×12 мм тактілі" }, role: { en: "Turbo while held", ru: "Турбо, пока нажата", kk: "Басулы тұрғанда турбо" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points, or a perfboard for a hand-held build", ru: "830 точек или макетная плата под пайку для ручного пульта", kk: "830 нүкте немесе қолға ұстайтын пультке дәнекерлеу тақтасы" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 9, spec: { en: "male-female", ru: "папа-мама", kk: "аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { component: "usb-5v", qty: 1, spec: { en: "small USB power bank", ru: "небольшой USB-пауэрбанк", kk: "шағын USB пауэрбанк" }, role: { en: "Powers the remote through its micro-USB", ru: "Питает пульт через micro-USB", kk: "Пультті micro-USB арқылы қоректендіреді" }, optional: true },
  ],
  instances: [
    { id: "joy", component: "joystick", label: "KY-023" },
    { id: "btn", component: "push-button", label: "Turbo" },
  ],
  connections: [
    { from: "joy.+5V", to: "board.3V3", color: "red", note: { en: "3.3 V despite the label: the analog outputs then match the ESP32 ADC range", ru: "3,3 В вопреки надписи: тогда аналоговые выходы совпадают с диапазоном АЦП ESP32", kk: "жазуға қарамастан 3,3 В: сонда аналогтық шығыстар ESP32 АЦТ ауқымына сай келеді" } },
    { from: "joy.GND", to: "board.GND", color: "black" },
    { from: "joy.VRx", to: "board.GPIO34", color: "yellow", note: { en: "ADC1: still works while the radio is on (ADC2 does not)", ru: "АЦП1: работает при включённом радио (АЦП2 — нет)", kk: "АЦТ1: радио қосулы кезде де жұмыс істейді (АЦТ2 — жоқ)" } },
    { from: "joy.VRy", to: "board.GPIO35", color: "green" },
    { from: "joy.SW", to: "board.GPIO32", color: "blue", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажато = LOW", kk: "ішкі тартқыш, басылған = LOW" } },
    { from: "btn.1", to: "board.GPIO33", color: "white" },
    { from: "btn.2", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Flash the receiver and note its MAC", ru: "Прошейте приёмник и запишите его MAC", kk: "Қабылдағышты жазып, оның MAC мекенжайын жазып алыңыз" },
      body: {
        en: "The second sketch, espnow_receiver.ino, goes on the robot: it is wired like the ESP32 Wi-Fi Robot Car (TB6612FNG on GPIO25, 26, 27, 32, 13, 14 and STBY on 33), so those pins live on the robot, not on this remote. Upload it to the robot's ESP32 with the battery off and open the Serial Monitor at 115200 baud. It prints \"receiver MAC: XX:XX:XX:XX:XX:XX\". Write that address down.",
        ru: "Второй скетч, espnow_receiver.ino, ставится на робота: он подключён как в «Wi-Fi робот-машинке на ESP32» (TB6612FNG на GPIO25, 26, 27, 32, 13, 14 и STBY на 33), поэтому эти пины находятся на роботе, а не на пульте. Загрузите его в ESP32 робота при выключенной батарее и откройте Serial Monitor на 115200 бод. Он напечатает «receiver MAC: XX:XX:XX:XX:XX:XX». Запишите этот адрес.",
        kk: "Екінші скетч espnow_receiver.ino роботқа жазылады: ол «ESP32 негізіндегі Wi-Fi робот-көлік» сияқты қосылған (TB6612FNG GPIO25, 26, 27, 32, 13, 14-те, STBY 33-те), сондықтан бұл пиндер пультте емес, роботта. Оны батарея өшірулі кезде роботтың ESP32-сіне жүктеп, Serial Monitor-ды 115200 бодта ашыңыз. Ол «receiver MAC: XX:XX:XX:XX:XX:XX» деп шығарады. Бұл мекенжайды жазып алыңыз.",
      },
      expect: { en: "Six hex bytes such as 24:6F:28:AA:BB:CC and \"waiting for remote\".", ru: "Шесть шестнадцатеричных байтов, например 24:6F:28:AA:BB:CC, и «waiting for remote».", kk: "24:6F:28:AA:BB:CC сияқты алты он алтылық байт және «waiting for remote»." },
      mistake: { en: "Copying the MAC of the remote instead of the robot: packets then go nowhere.", ru: "Скопировать MAC пульта вместо робота: пакеты уйдут в никуда.", kk: "Роботтың орнына пульттің MAC-ын көшіру: пакеттер ешқайда бармайды." },
    },
    {
      title: { en: "Wire the joystick at 3.3 V", ru: "Подключите джойстик к 3,3 В", kk: "Джойстикті 3,3 В-қа қосыңыз" },
      body: {
        en: "On the remote ESP32: joystick +5V → 3V3 (yes, 3.3 V: the pots then output 0–3.3 V, exactly the ADC range), GND → GND, VRx → GPIO34, VRy → GPIO35, SW → GPIO32. GPIO34 and 35 are on ADC1, which keeps working while ESP-NOW uses the radio; ADC2 pins return errors when Wi-Fi is on.",
        ru: "На ESP32 пульта: +5V джойстика → 3V3 (да, 3,3 В: тогда потенциометры дают 0–3,3 В, ровно диапазон АЦП), GND → GND, VRx → GPIO34, VRy → GPIO35, SW → GPIO32. GPIO34 и 35 относятся к АЦП1, который работает, пока ESP-NOW использует радио; пины АЦП2 при включённом Wi-Fi выдают ошибки.",
        kk: "Пульттің ESP32-сінде: джойстиктің +5V → 3V3 (иә, 3,3 В: сонда потенциометрлер 0–3,3 В береді, дәл АЦТ ауқымы), GND → GND, VRx → GPIO34, VRy → GPIO35, SW → GPIO32. GPIO34 пен 35 АЦТ1-ге жатады, ол ESP-NOW радионы қолданып тұрғанда да жұмыс істейді; Wi-Fi қосулы кезде АЦТ2 пиндері қате береді.",
      },
      expect: { en: "Five wires to the joystick, none to the 5V pin.", ru: "Пять проводов к джойстику, ни одного на пин 5V.", kk: "Джойстикке бес сым, 5V пиніне бірде-біреуі жоқ." },
      mistake: { en: "Putting SW on GPIO34/35: those pins have no pull-up, so the click reads as random noise.", ru: "Посадить SW на GPIO34/35: у этих пинов нет подтяжки, и нажатие читается как случайный шум.", kk: "SW-ны GPIO34/35-ке қою: бұл пиндерде тартқыш жоқ, басу кездейсоқ шу болып оқылады." },
    },
    {
      title: { en: "Add the turbo button", ru: "Добавьте кнопку турбо", kk: "Турбо батырмасын қосыңыз" },
      body: {
        en: "Place the button across the breadboard gap, wire one side to GPIO33 and the diagonal side to GND2. The sketch turns on the internal pull-up, so GPIO33 reads LOW only while you hold it.",
        ru: "Поставьте кнопку поперёк канавки макетки, одну сторону подключите к GPIO33, диагональную к GND2. Скетч включает внутреннюю подтяжку, поэтому GPIO33 читает LOW только пока кнопка зажата.",
        kk: "Батырманы макет тақтасының ойығына көлденең қойып, бір жағын GPIO33-ке, диагональ жағын GND2-ге қосыңыз. Скетч ішкі тартқышты қосады, сондықтан GPIO33 тек батырма басулы тұрғанда LOW оқиды.",
      },
      expect: { en: "Two wires to the button.", ru: "Два провода к кнопке.", kk: "Батырмаға екі сым." },
      mistake: { en: "Both wires on the same side of the button: those legs are always connected and turbo is stuck on.", ru: "Оба провода с одной стороны кнопки: эти ножки всегда соединены, и турбо включено постоянно.", kk: "Екі сым батырманың бір жағында: бұл аяқтар әрқашан жалғанған, турбо үнемі қосулы." },
    },
    {
      title: { en: "Flash the remote", ru: "Прошейте пульт", kk: "Пультті жазыңыз" },
      body: {
        en: "Open espnow_remote.ino, replace the six bytes of RECEIVER_MAC with the robot's address (24:6F:28:AA:BB:CC becomes {0x24, 0x6F, 0x28, 0xAA, 0xBB, 0xCC}), select \"ESP32 Dev Module\" (core 3.x) and upload. Keep your thumb off the joystick for the first second: the sketch measures the centre position at boot.",
        ru: "Откройте espnow_remote.ino, замените шесть байтов RECEIVER_MAC на адрес робота (24:6F:28:AA:BB:CC превращается в {0x24, 0x6F, 0x28, 0xAA, 0xBB, 0xCC}), выберите «ESP32 Dev Module» (ядро 3.x) и загрузите. Первую секунду не трогайте джойстик: скетч при старте измеряет центральное положение.",
        kk: "espnow_remote.ino ашып, RECEIVER_MAC ішіндегі алты байтты роботтың мекенжайына ауыстырыңыз (24:6F:28:AA:BB:CC {0x24, 0x6F, 0x28, 0xAA, 0xBB, 0xCC} болады), «ESP32 Dev Module» (3.x ядросы) таңдап, жүктеңіз. Алғашқы секундта джойстикке тимеңіз: скетч іске қосылғанда орталық күйді өлшейді.",
      },
      expect: { en: "\"center x=1870 y=1905\" then lines like \"x=0 y=64 btn=0 sent\" twice a second.", ru: "«center x=1870 y=1905», затем дважды в секунду строки вида «x=0 y=64 btn=0 sent».", kk: "«center x=1870 y=1905», содан кейін секундына екі рет «x=0 y=64 btn=0 sent» сияқты жолдар." },
      mistake: { en: "Pushing forward shows a negative y: flip INVERT_Y (or INVERT_X for steering) and upload again.", ru: "При толчке вперёд y отрицательный: поменяйте INVERT_Y (или INVERT_X для руля) и загрузите снова.", kk: "Алға итергенде y теріс: INVERT_Y (руль үшін INVERT_X) мәнін ауыстырып, қайта жүктеңіз." },
    },
    {
      title: { en: "Drive the robot", ru: "Управляйте роботом", kk: "Роботты басқарыңыз" },
      body: {
        en: "Power the remote from a power bank and switch the robot on. Its monitor prints \"remote connected\" and the robot follows the stick at 65 % power; hold the button for full power, click the stick for half-speed precision mode. Switch the remote off: within 300 ms the robot prints \"remote lost, stop\" and halts.",
        ru: "Подключите пульт к пауэрбанку и включите робота. Его монитор пишет «remote connected», и робот слушается стика на 65 % мощности; кнопка даёт полную мощность, нажатие стика — точный режим на половине скорости. Выключите пульт: через 300 мс робот напишет «remote lost, stop» и остановится.",
        kk: "Пультті пауэрбанкке қосып, роботты іске қосыңыз. Оның мониторы «remote connected» деп жазады да, робот стикті 65 % қуатпен тыңдайды; батырма толық қуат береді, стикті басу жартылай жылдамдықтағы дәл режимді қосады. Пультті өшіріңіз: 300 мс ішінде робот «remote lost, stop» деп жазып, тоқтайды.",
      },
      expect: { en: "Instant response and an automatic stop when the remote is switched off.", ru: "Мгновенный отклик и автоматическая остановка при выключении пульта.", kk: "Лезде жауап береді және пульт өшкенде автоматты түрде тоқтайды." },
      mistake: { en: "Letting the robot's ESP32 join your home Wi-Fi: it may move to another channel and ESP-NOW packets on channel 1 are lost.", ru: "Подключить ESP32 робота к домашнему Wi-Fi: он может уйти на другой канал, и пакеты ESP-NOW на канале 1 потеряются.", kk: "Роботтың ESP32-сін үй Wi-Fi-ына қосу: ол басқа арнаға ауысып, 1-арнадағы ESP-NOW пакеттері жоғалуы мүмкін." },
    },
  ],
  code: [
    {
      filename: "espnow_remote.ino",
      language: "cpp",
      libraries: [],
      source: `// ESP-NOW remote (transmitter), esp32 core 3.x
#include <WiFi.h>
#include <esp_now.h>

// CHANGE: the MAC printed by espnow_receiver.ino on the robot
uint8_t RECEIVER_MAC[6] = {0x24, 0x6F, 0x28, 0xAA, 0xBB, 0xCC};

const int JOY_X_PIN = 34;        // VRx, ADC1
const int JOY_Y_PIN = 35;        // VRy, ADC1
const int JOY_SW_PIN = 32;       // stick click, pressed = LOW
const int BUTTON_PIN = 33;       // turbo, pressed = LOW
const bool INVERT_X = false;
const bool INVERT_Y = true;      // flip if pushing the stick forward prints a negative y
const int DEADZONE = 6;          // percent
const unsigned long SEND_MS = 20;    // 50 packets per second

struct __attribute__((packed)) ControlPacket {
  uint8_t magic;                 // 0xA5, so the robot ignores other ESP-NOW traffic
  uint8_t seq;
  int8_t x;                      // -100..100, right is positive
  int8_t y;                      // -100..100, forward is positive
  uint8_t buttons;               // bit0 = turbo, bit1 = stick click
};

ControlPacket pkt = {0xA5, 0, 0, 0, 0};
int centerX = 2048, centerY = 2048;
unsigned long lastSend = 0, lastLog = 0;

int averageRead(int pin) {
  long sum = 0;
  for (int i = 0; i < 32; i++) sum += analogRead(pin);
  return sum / 32;
}

// raw 0..4095 around a measured centre -> -100..100 with a dead zone
int axis(int raw, int center, bool invert) {
  int v = raw >= center ? (raw - center) * 100 / max(1, 4095 - center)
                        : (raw - center) * 100 / max(1, center);
  if (abs(v) < DEADZONE) v = 0;
  v = constrain(v, -100, 100);
  return invert ? -v : v;
}

void setup() {
  Serial.begin(115200);
  pinMode(JOY_SW_PIN, INPUT_PULLUP);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  analogReadResolution(12);
  delay(300);
  centerX = averageRead(JOY_X_PIN);
  centerY = averageRead(JOY_Y_PIN);
  Serial.printf("center x=%d y=%d\\n", centerX, centerY);

  WiFi.mode(WIFI_STA);           // ESP-NOW needs the radio in station mode, no router required
  if (esp_now_init() != ESP_OK) {
    Serial.println("ESP-NOW init failed");
    return;
  }
  esp_now_peer_info_t peer = {};
  memcpy(peer.peer_addr, RECEIVER_MAC, 6);
  peer.channel = 0;              // current channel (1 when not connected to Wi-Fi)
  peer.encrypt = false;
  if (esp_now_add_peer(&peer) != ESP_OK) Serial.println("add peer failed");
}

void loop() {
  if (millis() - lastSend < SEND_MS) return;
  lastSend = millis();

  pkt.x = axis(analogRead(JOY_X_PIN), centerX, INVERT_X);
  pkt.y = axis(analogRead(JOY_Y_PIN), centerY, INVERT_Y);
  pkt.buttons = (digitalRead(BUTTON_PIN) == LOW ? 1 : 0) | (digitalRead(JOY_SW_PIN) == LOW ? 2 : 0);
  pkt.seq++;
  esp_err_t res = esp_now_send(RECEIVER_MAC, (uint8_t*)&pkt, sizeof(pkt));

  if (millis() - lastLog > 500) {
    lastLog = millis();
    Serial.printf("x=%d y=%d btn=%d %s\\n", pkt.x, pkt.y, pkt.buttons, res == ESP_OK ? "sent" : "send error");
  }
}`,
    },
    {
      filename: "espnow_receiver.ino",
      language: "cpp",
      libraries: [],
      source: `// ESP-NOW receiver for the robot, esp32 core 3.x
// Wiring = ESP32 Wi-Fi Robot Car guide: TB6612FNG on the robot's own ESP32
#include <WiFi.h>
#include <esp_now.h>

const int PWMA = 25, AIN1 = 26, AIN2 = 27;   // left motor
const int PWMB = 32, BIN1 = 13, BIN2 = 14;   // right motor
const int STBY = 33;
const int PWM_FREQ = 20000, PWM_RESOLUTION = 8;
const int MAX_DUTY = 180;                    // 8.4 V pack on 6 V motors
const int NORMAL_PERCENT = 65;               // without turbo
const unsigned long LOST_MS = 300;

struct __attribute__((packed)) ControlPacket {
  uint8_t magic;
  uint8_t seq;
  int8_t x;
  int8_t y;
  uint8_t buttons;
};

volatile int8_t rxX = 0, rxY = 0;
volatile uint8_t rxKeys = 0;
volatile unsigned long lastPacket = 0;
bool linked = false, precision = false, lastClick = false;

void onReceive(const esp_now_recv_info_t* info, const uint8_t* data, int len) {
  if (len != sizeof(ControlPacket)) return;
  ControlPacket p;
  memcpy(&p, data, sizeof p);
  if (p.magic != 0xA5) return;
  rxX = p.x;
  rxY = p.y;
  rxKeys = p.buttons;
  lastPacket = millis();
}

void setMotor(int pwmPin, int in1, int in2, int speed, int limit) {
  speed = constrain(speed, -100, 100);
  digitalWrite(in1, speed > 0 ? HIGH : LOW);
  digitalWrite(in2, speed < 0 ? HIGH : LOW);
  ledcWrite(pwmPin, abs(speed) * limit / 100);
}

void setup() {
  Serial.begin(115200);
  pinMode(AIN1, OUTPUT);
  pinMode(AIN2, OUTPUT);
  pinMode(BIN1, OUTPUT);
  pinMode(BIN2, OUTPUT);
  pinMode(STBY, OUTPUT);
  ledcAttach(PWMA, PWM_FREQ, PWM_RESOLUTION);
  ledcAttach(PWMB, PWM_FREQ, PWM_RESOLUTION);
  digitalWrite(STBY, HIGH);

  WiFi.mode(WIFI_STA);
  WiFi.disconnect();                         // stay on channel 1, do not join a router
  Serial.printf("receiver MAC: %s\\n", WiFi.macAddress().c_str());
  if (esp_now_init() != ESP_OK) {
    Serial.println("ESP-NOW init failed");
    return;
  }
  esp_now_register_recv_cb(onReceive);
  Serial.println("waiting for remote");
}

void loop() {
  bool fresh = millis() - lastPacket < LOST_MS;
  if (fresh != linked) {
    linked = fresh;
    Serial.println(linked ? "remote connected" : "remote lost, stop");
  }
  if (!linked) {
    setMotor(PWMA, AIN1, AIN2, 0, 0);
    setMotor(PWMB, BIN1, BIN2, 0, 0);
    delay(10);
    return;
  }

  bool click = rxKeys & 2;
  if (click && !lastClick) {
    precision = !precision;
    Serial.println(precision ? "precision mode" : "normal mode");
  }
  lastClick = click;

  int percent = (rxKeys & 1) ? 100 : NORMAL_PERCENT;
  if (precision) percent /= 2;
  int limit = MAX_DUTY * percent / 100;
  int left = rxY + rxX, right = rxY - rxX;
  int biggest = max(100, max(abs(left), abs(right)));
  setMotor(PWMA, AIN1, AIN2, left * 100 / biggest, limit);
  setMotor(PWMB, BIN1, BIN2, right * 100 / biggest, limit);
  delay(10);
}`,
    },
  ],
  troubleshooting: [
    {
      symptom: { en: "Remote prints \"sent\" but the robot stays at \"waiting for remote\"", ru: "Пульт пишет «sent», а робот так и ждёт «waiting for remote»", kk: "Пульт «sent» деп жазады, ал робот «waiting for remote» күйінде қалады" },
      cause: { en: "Wrong MAC in RECEIVER_MAC, or the two boards are on different Wi-Fi channels.", ru: "Неверный MAC в RECEIVER_MAC, или платы на разных каналах Wi-Fi.", kk: "RECEIVER_MAC ішіндегі MAC қате немесе тақталар әртүрлі Wi-Fi арналарында." },
      fix: { en: "Copy the MAC again byte by byte, and keep both boards off any router so both stay on channel 1.", ru: "Перепишите MAC заново побайтно и не подключайте платы к роутеру, чтобы обе оставались на канале 1.", kk: "MAC-ты байтпен қайта көшіріп жазыңыз және екі тақта да 1-арнада қалуы үшін оларды роутерге қоспаңыз." },
    },
    {
      symptom: { en: "Robot creeps forward with the stick released", ru: "Робот ползёт вперёд при отпущенном стике", kk: "Стик босатылғанда робот алға жылжиды" },
      cause: { en: "The stick was touched during the centre measurement at boot, or the dead zone is too small.", ru: "Стик задели во время измерения центра при старте, или мёртвая зона мала.", kk: "Іске қосылғанда орталықты өлшеу кезінде стикке тиген немесе өлі аймақ тым аз." },
      fix: { en: "Press EN on the remote with hands off the stick; raise DEADZONE to 10 if it persists.", ru: "Нажмите EN на пульте, не касаясь стика; если не помогло, увеличьте DEADZONE до 10.", kk: "Стикке тимей, пульттегі EN батырмасын басыңыз; көмектеспесе, DEADZONE-ды 10-ға дейін көтеріңіз." },
    },
    {
      symptom: { en: "One axis always reads 100 or -100", ru: "Одна ось всегда показывает 100 или -100", kk: "Бір ось әрқашан 100 не -100 көрсетеді" },
      cause: { en: "VRx/VRy on an ADC2 pin (fails with the radio on) or the joystick has no supply.", ru: "VRx/VRy на пине АЦП2 (не работает при включённом радио), или на джойстик не приходит питание.", kk: "VRx/VRy АЦТ2 пинінде (радио қосулы кезде жұмыс істемейді) немесе джойстикке қуат келмейді." },
      fix: { en: "Use GPIO34 and GPIO35 as in the diagram and check 3.3 V between +5V and GND on the joystick.", ru: "Используйте GPIO34 и GPIO35, как на схеме, и проверьте 3,3 В между +5V и GND джойстика.", kk: "Схемадағыдай GPIO34 пен GPIO35 қолданып, джойстиктегі +5V пен GND арасында 3,3 В бар-жоғын тексеріңіз." },
    },
    {
      symptom: { en: "Range is only a few metres", ru: "Дальность всего несколько метров", kk: "Қашықтық бірнеше метр ғана" },
      cause: { en: "The PCB antennas are covered by a hand, metal or the battery.", ru: "Антенны на платах закрыты рукой, металлом или батареей.", kk: "Тақталардағы антенналарды қол, металл не батарея жауып тұр." },
      fix: { en: "Let the antenna end of both boards stick out past the chassis and the grip; 30–80 m line of sight is normal.", ru: "Выведите край с антенной обеих плат за пределы шасси и рукоятки; 30–80 м в прямой видимости — норма.", kk: "Екі тақтаның антенна жағын шасси мен тұтқадан тыс шығарыңыз; тікелей көріністе 30–80 м қалыпты." },
    },
  ],
  safety: [
    { en: "Test the robot with its wheels off the ground until the stop-on-signal-loss works.", ru: "Проверяйте робота с колёсами в воздухе, пока не убедитесь, что остановка при потере сигнала работает.", kk: "Сигнал жоғалғанда тоқтау жұмыс істейтініне көз жеткізгенше роботты дөңгелектері ауада тұрғанда тексеріңіз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "center x=1870 y=1905",
      "x=0 y=0 btn=0 sent",
      "x=0 y=64 btn=0 sent",
      "x=35 y=100 btn=0 sent",
      "x=0 y=100 btn=1 sent",
      "x=-48 y=0 btn=0 sent",
      "x=0 y=-80 btn=2 sent",
      "x=0 y=0 btn=0 sent",
    ],
    leds: [],
  },
} satisfies GuideContent;
