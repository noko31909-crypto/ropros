import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-ble-gamepad",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "games",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 10,
  xpReward: 210,
  title: {
    en: "ESP32 Bluetooth Gamepad",
    ru: "Bluetooth-геймпад на ESP32",
    kk: "ESP32 негізіндегі Bluetooth геймпад",
  },
  summary: {
    en: "An analog joystick and four buttons turn the ESP32 into a wireless BLE gamepad that pairs with Windows, Android and Linux like a store-bought controller.",
    ru: "Аналоговый джойстик и четыре кнопки превращают ESP32 в беспроводной BLE-геймпад, который подключается к Windows, Android и Linux как покупной контроллер.",
    kk: "Аналогтық джойстик пен төрт батырма ESP32-ні Windows, Android және Linux-қа дүкеннен алынған контроллер сияқты қосылатын сымсыз BLE геймпадқа айналдырады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit (WROOM-32), classic ESP32 with BLE", ru: "ESP32 DevKit (WROOM-32), классический ESP32 с BLE", kk: "ESP32 DevKit (WROOM-32), BLE бар классикалық ESP32" }, role: { en: "Bluetooth HID controller", ru: "Bluetooth HID-контроллер", kk: "Bluetooth HID контроллері" } },
    { component: "joystick", qty: 1, spec: { en: "KY-023 dual-axis with push switch", ru: "KY-023, две оси и нажатие", kk: "KY-023, екі ось және басу" }, role: { en: "Left stick (X/Y) and stick click", ru: "Левый стик (X/Y) и нажатие стика", kk: "Сол жақ стик (X/Y) және стикті басу" } },
    { component: "push-button", qty: 4, spec: { en: "12×12 mm tactile with caps, or 6×6 mm", ru: "тактовые 12×12 мм с колпачками или 6×6 мм", kk: "қақпақты 12×12 мм немесе 6×6 мм тактілі" }, role: { en: "A, B, X, Y buttons", ru: "Кнопки A, B, X, Y", kk: "A, B, X, Y батырмалары" } },
    { component: "usb-5v", qty: 1, spec: { en: "small USB power bank (≥1000 mAh) + cable", ru: "небольшой USB-повербанк (≥1000 мА·ч) + кабель", kk: "шағын USB повербанк (≥1000 мА·сағ) + кабель" }, role: { en: "Wireless power through the ESP32's USB port", ru: "Автономное питание через USB-порт ESP32", kk: "ESP32-нің USB порты арқылы автономды қуат" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Controller body for the prototype", ru: "Корпус прототипа", kk: "Прототип корпусы" } },
    { component: "jumper-wires", qty: 16, spec: { en: "male-female for the joystick, male-male for buttons", ru: "папа-мама для джойстика, папа-папа для кнопок", kk: "джойстикке аталық-аналық, батырмаларға аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "joy", component: "joystick", label: "Left stick" },
    { id: "btn_a", component: "push-button", label: "A" },
    { id: "btn_b", component: "push-button", label: "B" },
    { id: "btn_x", component: "push-button", label: "X" },
    { id: "btn_y", component: "push-button", label: "Y" },
  ],
  connections: [
    { from: "board.3V3", to: "joy.+5V", color: "red", note: { en: "feed 3.3 V despite the +5V label, so VRx/VRy stay ≤3.3 V", ru: "подавайте 3,3 В, несмотря на надпись +5V, чтобы VRx/VRy не превышали 3,3 В", kk: "+5V жазуына қарамастан 3,3 В беріңіз, сонда VRx/VRy 3,3 В-тан аспайды" } },
    { from: "joy.GND", to: "board.GND", color: "black" },
    { from: "joy.VRx", to: "board.GPIO34", color: "yellow" },
    { from: "joy.VRy", to: "board.GPIO35", color: "orange" },
    { from: "joy.SW", to: "board.GPIO32", color: "purple", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажато = LOW", kk: "ішкі тарту, басылған = LOW" } },
    { from: "board.GPIO25", to: "btn_a.1", color: "green" },
    { from: "btn_a.2", to: "board.GND2", color: "black" },
    { from: "board.GPIO26", to: "btn_b.1", color: "red" },
    { from: "btn_b.2", to: "board.GND2", color: "black" },
    { from: "board.GPIO27", to: "btn_x.1", color: "blue" },
    { from: "btn_x.2", to: "board.GND3", color: "black" },
    { from: "board.GPIO13", to: "btn_y.1", color: "yellow" },
    { from: "btn_y.2", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Wire the joystick at 3.3 V", ru: "Подключите джойстик к 3,3 В", kk: "Джойстикті 3,3 В-қа қосыңыз" },
      body: {
        en: "Connect the joystick +5V pin to the ESP32 3V3 pin (not 5V), GND to GND, VRx to GPIO34, VRy to GPIO35 and SW to GPIO32. The stick is two potentiometers, so their output swings between GND and whatever you feed them: 3.3 V keeps the ESP32 ADC safe. GPIO34 and 35 are ADC1 inputs, which keep working while Bluetooth is on.",
        ru: "Подключите пин +5V джойстика к пину 3V3 платы ESP32 (не к 5V), GND к GND, VRx к GPIO34, VRy к GPIO35, SW к GPIO32. Стик — это два потенциометра, их выход меняется от GND до напряжения питания, поэтому 3,3 В безопасны для АЦП ESP32. GPIO34 и 35 — входы ADC1, они работают и при включённом радио.",
        kk: "Джойстиктің +5V пинін ESP32-нің 3V3 пиніне (5V-қа емес), GND-ін GND-ге, VRx-ті GPIO34-ке, VRy-ді GPIO35-ке, SW-ді GPIO32-ге қосыңыз. Стик — екі потенциометр, олардың шығысы GND-ден қоректендіру кернеуіне дейін өзгереді, сондықтан 3,3 В ESP32 АЦТ-сы үшін қауіпсіз. GPIO34 пен 35 — ADC1 кірістері, олар радио қосулы кезде де жұмыс істейді.",
      },
      expect: { en: "At boot the Serial Monitor prints the stick centre, roughly x=1800–2000, y=1800–2000.", ru: "При старте Serial Monitor печатает центр стика, примерно x=1800–2000, y=1800–2000.", kk: "Іске қосылғанда Serial Monitor стик ортасын шығарады, шамамен x=1800–2000, y=1800–2000." },
      mistake: { en: "Powering the joystick from 5V pushes up to 5 V into GPIO34/35 at full deflection.", ru: "Питание джойстика от 5V подаёт до 5 В на GPIO34/35 при крайнем положении стика.", kk: "Джойстикті 5V-тан қоректендірсеңіз, стик шеткі күйде болғанда GPIO34/35-ке 5 В-қа дейін түседі." },
    },
    {
      title: { en: "Add the four face buttons", ru: "Добавьте четыре кнопки", kk: "Төрт батырманы қосыңыз" },
      body: {
        en: "Place the buttons in a diamond like a real controller. Wire A to GPIO25, B to GPIO26, X to GPIO27 and Y to GPIO13; the other leg of each button goes to GND (A and B to GND2, X and Y to GND3). The sketch uses the internal pull-ups, so no resistors are needed.",
        ru: "Расположите кнопки ромбом, как на настоящем геймпаде. Подключите A к GPIO25, B к GPIO26, X к GPIO27, Y к GPIO13; второй вывод каждой кнопки идёт на землю (A и B на GND2, X и Y на GND3). Скетч включает внутренние подтяжки, резисторы не нужны.",
        kk: "Батырмаларды нағыз геймпадтағыдай ромб етіп орналастырыңыз. A-ны GPIO25-ке, B-ні GPIO26-ға, X-ті GPIO27-ге, Y-ті GPIO13-ке қосыңыз; әр батырманың екінші шығысы жерге барады (A мен B — GND2-ге, X пен Y — GND3-ке). Скетч ішкі тартуларды қосады, резисторлар керек емес.",
      },
      expect: { en: "Each press prints its name, e.g. \"A down\" / \"A up\".", ru: "Каждое нажатие печатает своё имя, например «A down» / «A up».", kk: "Әр басу өз атын шығарады, мысалы «A down» / «A up»." },
      mistake: { en: "GPIO34–39 have no pull-ups; a button on them floats and fires randomly.", ru: "У GPIO34–39 нет подтяжек: кнопка на них «висит» и срабатывает сама.", kk: "GPIO34–39-да тарту жоқ: оларға қосылған батырма «ілулі» қалып, өздігінен басылады." },
    },
    {
      title: { en: "Install the libraries and upload", ru: "Установите библиотеки и загрузите скетч", kk: "Кітапханаларды орнатып, скетчті жүктеңіз" },
      body: {
        en: "Install ESP32-BLE-Gamepad by lemmingDev and its dependency NimBLE-Arduino from the Library Manager. Select \"ESP32 Dev Module\", upload, and open the Serial Monitor at 115200 baud. Keep the stick untouched while the board starts: it measures the centre position during the first second.",
        ru: "Установите через Library Manager библиотеку ESP32-BLE-Gamepad от lemmingDev и её зависимость NimBLE-Arduino. Выберите «ESP32 Dev Module», загрузите скетч и откройте Serial Monitor на 115200 бод. Не трогайте стик во время запуска: в первую секунду плата измеряет его центр.",
        kk: "Library Manager арқылы lemmingDev жасаған ESP32-BLE-Gamepad кітапханасын және оған қажет NimBLE-Arduino-ны орнатыңыз. «ESP32 Dev Module» таңдап, скетчті жүктеңіз де, Serial Monitor-ды 115200 бодта ашыңыз. Іске қосылып жатқанда стикке тимеңіз: алғашқы секундта плата оның ортасын өлшейді.",
      },
      expect: { en: "\"advertising as ropros Pad\" appears in the Serial Monitor.", ru: "В Serial Monitor появляется «advertising as ropros Pad».", kk: "Serial Monitor-да «advertising as ropros Pad» шығады." },
      mistake: { en: "ESP32-S2 has no Bluetooth at all; use a classic ESP32, ESP32-S3 or ESP32-C3.", ru: "У ESP32-S2 вообще нет Bluetooth; нужен классический ESP32, ESP32-S3 или ESP32-C3.", kk: "ESP32-S2-де Bluetooth мүлде жоқ; классикалық ESP32, ESP32-S3 немесе ESP32-C3 керек." },
    },
    {
      title: { en: "Pair it with a computer or phone", ru: "Подключите к компьютеру или телефону", kk: "Компьютерге немесе телефонға жұптаңыз" },
      body: {
        en: "Open Bluetooth settings and add \"ropros Pad\" like any Bluetooth device. On Windows run joy.cpl (Game Controllers) to see the axes and buttons move; on any system the page gamepad-tester.com in Chrome shows it live. Buttons map to 1–5 (A, B, X, Y, stick click); the stick is the left X/Y axis with a small dead zone so it rests exactly in the middle.",
        ru: "Откройте настройки Bluetooth и добавьте «ropros Pad», как любое Bluetooth-устройство. В Windows запустите joy.cpl (Игровые устройства), чтобы увидеть движение осей и нажатия кнопок; в любой системе это видно на странице gamepad-tester.com в Chrome. Кнопки — это 1–5 (A, B, X, Y, нажатие стика), стик — левая ось X/Y с небольшой мёртвой зоной, чтобы в покое он стоял точно в центре.",
        kk: "Bluetooth баптауларын ашып, «ropros Pad»-ты кез келген Bluetooth құрылғысы сияқты қосыңыз. Windows-та осьтер мен батырмалардың қозғалысын көру үшін joy.cpl (Ойын құрылғылары) іске қосыңыз; кез келген жүйеде мұны Chrome-дағы gamepad-tester.com бетінен көруге болады. Батырмалар — 1–5 (A, B, X, Y, стикті басу), стик — тыныш күйде дәл ортада тұруы үшін шағын өлі аймағы бар сол жақ X/Y осі.",
      },
      expect: { en: "Moving the stick moves the X/Y cross smoothly from edge to edge.", ru: "Движение стика плавно двигает крестик X/Y от края до края.", kk: "Стикті қозғалтқанда X/Y белгісі шетінен шетіне бірқалыпты жылжиды." },
      mistake: { en: "If it was paired before a code change, remove the old pairing first; Windows caches the old report layout.", ru: "Если геймпад был сопряжён до изменения кода, сначала удалите старое сопряжение: Windows кэширует старую структуру отчёта.", kk: "Код өзгергенге дейін жұптасқан болса, алдымен ескі жұптасуды жойыңыз: Windows ескі есеп құрылымын кэштейді." },
    },
    {
      title: { en: "Go wireless", ru: "Сделайте беспроводным", kk: "Сымсыз етіңіз" },
      body: {
        en: "Unplug the computer cable and power the ESP32 from a small USB power bank. The DevKit draws about 80–120 mA with BLE connected, so a 2000 mAh bank lasts well over 12 hours. Glue the breadboard and the bank back to back for a two-handed grip.",
        ru: "Отключите кабель компьютера и запитайте ESP32 от небольшого USB-повербанка. С подключённым BLE DevKit потребляет около 80–120 мА, так что банка на 2000 мА·ч хватит больше чем на 12 часов. Склейте макетку и повербанк спинками, чтобы держать двумя руками.",
        kk: "Компьютер кабелін ажыратып, ESP32-ні шағын USB повербанктан қоректендіріңіз. BLE қосулы кезде DevKit шамамен 80–120 мА тұтынады, сондықтан 2000 мА·сағ повербанк 12 сағаттан әлдеқайда көп уақытқа жетеді. Екі қолмен ұстау үшін макет тақтасы мен повербанкты арқаларымен желімдеңіз.",
      },
      expect: { en: "After power-up the gamepad reconnects to the last host within a few seconds.", ru: "После включения геймпад за несколько секунд переподключается к последнему устройству.", kk: "Қосқаннан кейін геймпад бірнеше секундта соңғы құрылғыға қайта қосылады." },
      mistake: { en: "Some power banks switch off at low current; pick one with an \"always on\" or low-current mode.", ru: "Некоторые повербанки отключаются при малом токе; выбирайте модель с режимом «always on» или малого тока.", kk: "Кейбір повербанктер аз токта өшіп қалады; «always on» немесе аз ток режимі бар үлгіні таңдаңыз." },
    },
  ],
  code: [{
    filename: "ble_gamepad.ino",
    language: "cpp",
    libraries: ["ESP32-BLE-Gamepad", "NimBLE-Arduino"],
    source: `#include <BleGamepad.h>

const int JOY_X_PIN = 34;    // VRx (ADC1)
const int JOY_Y_PIN = 35;    // VRy (ADC1)
const int JOY_SW_PIN = 32;   // stick click, to GND when pressed
const int BUTTON_PINS[4] = {25, 26, 27, 13};   // A, B, X, Y to GND
const char* BUTTON_NAMES[5] = {"A", "B", "X", "Y", "STICK"};
const int DEADZONE = 120;    // ADC counts around the centre that read as "centred"
const int16_t AXIS_MAX = 32767;

BleGamepad gamepad("ropros Pad", "ropros", 100);
int centreX = 2048, centreY = 2048;
bool lastPressed[5] = {false};
int16_t lastX = -1, lastY = -1;
bool wasConnected = false;

int readAvg(int pin) {
  long sum = 0;
  for (int i = 0; i < 8; i++) sum += analogRead(pin);
  return sum / 8;
}

// map one ADC reading to 0..32767 with the measured centre at 16384
int16_t toAxis(int raw, int centre) {
  if (abs(raw - centre) < DEADZONE) return AXIS_MAX / 2 + 1;
  if (raw < centre) return map(raw, 0, centre - DEADZONE, 0, AXIS_MAX / 2);
  return map(raw, centre + DEADZONE, 4095, AXIS_MAX / 2 + 1, AXIS_MAX);
}

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < 4; i++) pinMode(BUTTON_PINS[i], INPUT_PULLUP);
  pinMode(JOY_SW_PIN, INPUT_PULLUP);
  analogReadResolution(12);

  long sx = 0, sy = 0;
  for (int i = 0; i < 32; i++) { sx += analogRead(JOY_X_PIN); sy += analogRead(JOY_Y_PIN); delay(20); }
  centreX = sx / 32;
  centreY = sy / 32;
  Serial.printf("stick centre x=%d y=%d\\n", centreX, centreY);

  BleGamepadConfiguration cfg;
  cfg.setControllerType(CONTROLLER_TYPE_GAMEPAD);
  cfg.setAutoReport(false);          // we send one report per change
  cfg.setButtonCount(5);
  cfg.setHatSwitchCount(0);
  cfg.setWhichAxes(true, true, false, false, false, false, false, false);   // X and Y only
  cfg.setAxesMin(0x0000);
  cfg.setAxesMax(0x7FFF);
  gamepad.begin(&cfg);
  Serial.println("advertising as ropros Pad");
}

void loop() {
  bool connected = gamepad.isConnected();
  if (connected != wasConnected) {
    wasConnected = connected;
    Serial.println(connected ? "connected" : "disconnected, advertising again");
  }
  if (!connected) { delay(100); return; }

  bool changed = false;
  for (int i = 0; i < 5; i++) {
    bool pressed = digitalRead(i < 4 ? BUTTON_PINS[i] : JOY_SW_PIN) == LOW;
    if (pressed == lastPressed[i]) continue;
    lastPressed[i] = pressed;
    if (pressed) gamepad.press(BUTTON_1 + i); else gamepad.release(BUTTON_1 + i);
    Serial.printf("%s %s\\n", BUTTON_NAMES[i], pressed ? "down" : "up");
    changed = true;
  }

  int16_t x = toAxis(readAvg(JOY_X_PIN), centreX);
  int16_t y = toAxis(readAvg(JOY_Y_PIN), centreY);
  if (abs(x - lastX) > 160 || abs(y - lastY) > 160) {   // ignore ADC jitter
    lastX = x;
    lastY = y;
    gamepad.setX(x);
    gamepad.setY(y);
    changed = true;
  }

  if (changed) gamepad.sendReport();
  delay(8);   // ~100 reports per second at most
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"ropros Pad\" does not appear in the Bluetooth list", ru: "«ropros Pad» не появляется в списке Bluetooth", kk: "«ropros Pad» Bluetooth тізімінде көрінбейді" },
      cause: { en: "It is still bonded to another device and connects there, or the library versions do not match.", ru: "Геймпад сопряжён с другим устройством и подключается к нему, или версии библиотек не совпадают.", kk: "Геймпад басқа құрылғымен жұптасқан және соған қосылады немесе кітапхана нұсқалары сәйкес емес." },
      fix: { en: "Turn Bluetooth off on the other device. Update ESP32-BLE-Gamepad and NimBLE-Arduino together to their latest releases.", ru: "Выключите Bluetooth на другом устройстве. Обновите ESP32-BLE-Gamepad и NimBLE-Arduino вместе до последних версий.", kk: "Басқа құрылғыда Bluetooth-ты өшіріңіз. ESP32-BLE-Gamepad пен NimBLE-Arduino-ны бірге соңғы нұсқаларына дейін жаңартыңыз." },
    },
    {
      symptom: { en: "The stick drifts or never reaches one edge", ru: "Стик «плывёт» или не доходит до края", kk: "Стик «жылжиды» немесе шетіне жетпейді" },
      cause: { en: "The stick was moved during the centre calibration, or the ESP32 ADC saturates near 3.1 V.", ru: "Стик сдвинули во время калибровки центра или АЦП ESP32 насыщается около 3,1 В.", kk: "Ортаны калибрлеу кезінде стик қозғалған немесе ESP32 АЦТ-сы 3,1 В маңында қаныққан." },
      fix: { en: "Reset with the stick untouched. Increase DEADZONE to 200 if it still drifts.", ru: "Перезагрузите плату, не трогая стик. Если «плывёт» дальше, увеличьте DEADZONE до 200.", kk: "Стикке тимей, платаны қайта іске қосыңыз. Әлі де жылжыса, DEADZONE мәнін 200-ге дейін арттырыңыз." },
    },
    {
      symptom: { en: "A button is always pressed", ru: "Одна кнопка всё время нажата", kk: "Бір батырма үнемі басулы" },
      cause: { en: "Both wires are on the same internally connected pair of legs.", ru: "Оба провода на одной паре внутренне соединённых ножек.", kk: "Екі сым іштей жалғанған бір жұп аяқта тұр." },
      fix: { en: "Move one wire to the diagonally opposite leg.", ru: "Перенесите один провод на ножку по диагонали.", kk: "Бір сымды диагональ бойынша қарама-қарсы аяққа ауыстырыңыз." },
    },
    {
      symptom: { en: "Axes are inverted in a game", ru: "Оси в игре перевёрнуты", kk: "Ойында осьтер керісінше" },
      cause: { en: "KY-023 modules differ in how the potentiometers are mounted.", ru: "У разных KY-023 потенциометры установлены по-разному.", kk: "Әртүрлі KY-023 модульдерінде потенциометрлер әртүрлі орнатылған." },
      fix: { en: "Swap VRx/VRy wires, or send AXIS_MAX - y instead of y in the sketch.", ru: "Поменяйте провода VRx/VRy местами или отправляйте AXIS_MAX - y вместо y.", kk: "VRx/VRy сымдарын ауыстырыңыз немесе скетчте y орнына AXIS_MAX - y жіберіңіз." },
    },
  ],
  safety: [
    { en: "Use a power bank with built-in protection; do not wire bare lithium cells to the breadboard.", ru: "Используйте повербанк со встроенной защитой; не подключайте голые литиевые элементы к макетке.", kk: "Қорғанысы бар повербанкты пайдаланыңыз; жалаң литий элементтерін макет тақтасына қоспаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "stick centre x=1893 y=1921",
      "advertising as ropros Pad",
      "connected",
      "A down",
      "A up",
      "X down",
      "X up",
      "STICK down",
      "STICK up",
      "disconnected, advertising again",
    ],
    leds: [],
  },
} satisfies GuideContent;
