import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-bluetooth-tank",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "robotics",
  robotics: true,
  difficulty: "intermediate",
  hours: 4,
  costUsd: 27,
  xpReward: 230,
  title: {
    en: "ESP32 Bluetooth Tank",
    ru: "Bluetooth-танк на ESP32",
    kk: "ESP32 негізіндегі Bluetooth танк",
  },
  summary: {
    en: "A skid-steer robot driven from an Android phone over Bluetooth Classic serial: no Wi-Fi, no extra radio module, just the ESP32's own Bluetooth and a DRV8833 driver.",
    ru: "Робот с танковым поворотом, которым управляют с Android-телефона по Bluetooth Classic: без Wi-Fi и лишних радиомодулей, только встроенный Bluetooth ESP32 и драйвер DRV8833.",
    kk: "Android телефоннан Bluetooth Classic арқылы басқарылатын танк тәрізді бұрылатын робот: Wi-Fi да, қосымша радиомодуль де жоқ, тек ESP32-нің өз Bluetooth-ы мен DRV8833 драйвері.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32-WROOM-32 DevKit (classic ESP32: S3/C3 have no Bluetooth Classic)", ru: "ESP32-WROOM-32 DevKit (именно классический ESP32: у S3/C3 нет Bluetooth Classic)", kk: "ESP32-WROOM-32 DevKit (классикалық ESP32: S3/C3-те Bluetooth Classic жоқ)" }, role: { en: "Bluetooth receiver and motor control", ru: "Приёмник Bluetooth и управление моторами", kk: "Bluetooth қабылдағыш және мотор басқару" } },
    { component: "drv8833", qty: 1, spec: { en: "dual H-bridge module, 2.7–10.8 V, 1.5 A per channel", ru: "модуль двух H-мостов, 2,7–10,8 В, 1,5 А на канал", kk: "екі H-көпірлі модуль, 2,7–10,8 В, арнаға 1,5 А" }, role: { en: "Motor driver", ru: "Драйвер моторов", kk: "Мотор драйвері" } },
    { component: "dc-motor", qty: 2, spec: { en: "TT gear motor 1:48, 3–6 V", ru: "мотор-редуктор TT 1:48, 3–6 В", kk: "TT редукторлы мотор 1:48, 3–6 В" }, role: { en: "Left and right side", ru: "Левый и правый борт", kk: "Сол және оң жақ" } },
    { component: "robot-chassis-2wd", qty: 1, spec: { en: "2WD deck with caster", ru: "платформа 2WD с опорным колесом", kk: "тірек дөңгелегі бар 2WD платформа" }, role: { en: "Frame", ru: "Рама", kk: "Рама" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V 2S, 1000–2200 mAh", ru: "7,4 В 2S, 1000–2200 мА·ч", kk: "7,4 В 2S, 1000–2200 мА·сағ" }, role: { en: "Main power", ru: "Основное питание", kk: "Негізгі қуат" } },
    { component: "buck-converter-lm2596", qty: 1, spec: { en: "set to 5.0 V", ru: "выставлен на 5,0 В", kk: "5,0 В-қа бапталған" }, role: { en: "5 V for the ESP32", ru: "5 В для ESP32", kk: "ESP32 үшін 5 В" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT toggle (MTS-102) or slide switch rated 3 A+", ru: "SPDT тумблер (MTS-102) или движковый на ток от 3 А", kk: "SPDT тумблер (MTS-102) не 3 А-дан жоғары токқа арналған жылжымалы ажыратқыш" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі ажыратқыш" } },
    { component: "jumper-wires", qty: 16, spec: { en: "male-female", ru: "папа-мама", kk: "аталық-аналық" }, role: { en: "Wiring", ru: "Проводка", kk: "Сымдар" } },
  ],
  instances: [
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
    { id: "buck", component: "buck-converter-lm2596", label: "Buck 5.0 V" },
    { id: "drv", component: "drv8833", label: "DRV8833" },
    { id: "m_left", component: "dc-motor", label: "Left motor" },
    { id: "m_right", component: "dc-motor", label: "Right motor" },
  ],
  connections: [
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "buck.IN+", color: "red" },
    { from: "sw.1", to: "drv.VCC", color: "red", note: { en: "motor supply, max 10.8 V", ru: "питание моторов, до 10,8 В", kk: "моторлар қуаты, 10,8 В-қа дейін" } },
    { from: "bat.-", to: "buck.IN-", color: "black" },
    { from: "bat.-", to: "drv.GND", color: "black" },
    { from: "buck.OUT+", to: "board.5V", color: "red", note: { en: "5.0 V, measured before connecting", ru: "5,0 В, проверено до подключения", kk: "5,0 В, қоспас бұрын өлшенген" } },
    { from: "buck.OUT-", to: "board.GND", color: "black" },
    { from: "board.GPIO25", to: "drv.IN1", color: "yellow" },
    { from: "board.GPIO26", to: "drv.IN2", color: "green" },
    { from: "board.GPIO27", to: "drv.IN3", color: "yellow" },
    { from: "board.GPIO14", to: "drv.IN4", color: "green" },
    { from: "board.GPIO33", to: "drv.EEP", color: "white", note: { en: "LOW = driver asleep while no phone is connected", ru: "LOW — драйвер спит, пока телефон не подключён", kk: "LOW — телефон қосылмағанша драйвер ұйықтайды" } },
    { from: "drv.OUT1", to: "m_left.+", color: "red" },
    { from: "drv.OUT2", to: "m_left.-", color: "black" },
    { from: "drv.OUT3", to: "m_right.+", color: "red" },
    { from: "drv.OUT4", to: "m_right.-", color: "black" },
  ],
  steps: [
    {
      title: { en: "Build the chassis and set 5 V", ru: "Соберите шасси и выставьте 5 В", kk: "Шассиді құрастырып, 5 В орнатыңыз" },
      body: {
        en: "Assemble the 2WD chassis with motors, wheels and caster. Connect the battery through the switch to the buck converter only, measure OUT+ to OUT- and turn the trimmer to 5.0 V. Then mount the ESP32, the DRV8833 and the buck on the deck.",
        ru: "Соберите шасси 2WD с моторами, колёсами и опорным колесом. Подключите батарею через выключатель только к преобразователю, измерьте OUT+ относительно OUT- и выставьте подстроечником 5,0 В. Затем закрепите на платформе ESP32, DRV8833 и преобразователь.",
        kk: "2WD шассиін моторлармен, дөңгелектермен және тірек дөңгелегімен құрастырыңыз. Батареяны ажыратқыш арқылы тек түрлендіргішке қосып, OUT+ пен OUT- арасын өлшеңіз де, баптағышпен 5,0 В орнатыңыз. Содан кейін платформаға ESP32, DRV8833 және түрлендіргішті бекітіңіз.",
      },
      expect: { en: "Buck output reads 5.0–5.1 V.", ru: "На выходе преобразователя 5,0–5,1 В.", kk: "Түрлендіргіш шығысында 5,0–5,1 В." },
      mistake: { en: "Connecting the ESP32 before measuring: new buck modules often output 12 V or more.", ru: "Подключить ESP32 до измерения: новые модули часто выдают 12 В и больше.", kk: "Өлшемей тұрып ESP32-ні қосу: жаңа модульдер көбіне 12 В және одан жоғары береді." },
    },
    {
      title: { en: "Wire power and the driver", ru: "Подключите питание и драйвер", kk: "Қуат пен драйверді қосыңыз" },
      body: {
        en: "Switch pin 1 feeds buck IN+ and DRV8833 VCC (the motor supply). Battery − goes to buck IN- and DRV8833 GND. Buck OUT+ → ESP32 5V, OUT- → GND. Signals: GPIO25 → IN1, GPIO26 → IN2 (left), GPIO27 → IN3, GPIO14 → IN4 (right), GPIO33 → EEP. Leave ULT unconnected: it is a fault output that some modules pull up to battery voltage. Keep the switch OFF whenever USB is plugged in, so the 5V pin is never fed from USB and the buck at once.",
        ru: "Вывод 1 выключателя питает IN+ преобразователя и VCC DRV8833 (питание моторов). Минус батареи идёт на IN- и GND DRV8833. OUT+ → 5V ESP32, OUT- → GND. Сигналы: GPIO25 → IN1, GPIO26 → IN2 (левый), GPIO27 → IN3, GPIO14 → IN4 (правый), GPIO33 → EEP. ULT не подключайте: это выход ошибки, который на некоторых модулях подтянут к напряжению батареи. Пока подключён USB, держите выключатель в OFF, чтобы пин 5V не питался одновременно от USB и преобразователя.",
        kk: "Ажыратқыштың 1-шығысы түрлендіргіштің IN+ пинін және DRV8833 VCC-ін (моторлар қуаты) қоректендіреді. Батарея минусы IN- пен DRV8833 GND-ге барады. OUT+ → ESP32 5V, OUT- → GND. Сигналдар: GPIO25 → IN1, GPIO26 → IN2 (сол), GPIO27 → IN3, GPIO14 → IN4 (оң), GPIO33 → EEP. ULT-ті қоспаңыз: бұл кейбір модульдерде батарея кернеуіне тартылған қате шығысы. USB қосулы кезде 5V пині USB мен түрлендіргіштен қатар қоректенбеуі үшін ажыратқышты OFF күйінде ұстаңыз.",
      },
      expect: { en: "Five signal wires to the driver, four motor leads on OUT1–OUT4.", ru: "Пять сигнальных проводов к драйверу, четыре провода моторов на OUT1–OUT4.", kk: "Драйверге бес сигнал сымы, OUT1–OUT4-те моторлардың төрт сымы." },
      mistake: { en: "Powering the DRV8833 VCC from the ESP32 5V pin: the motors would then load the buck and the ESP32 resets.", ru: "Питать VCC DRV8833 от пина 5V ESP32: моторы нагрузят преобразователь, и ESP32 будет перезагружаться.", kk: "DRV8833 VCC-ін ESP32 5V пинінен қоректендіру: моторлар түрлендіргішті жүктеп, ESP32 қайта жүктеле береді." },
    },
    {
      title: { en: "Upload the sketch", ru: "Загрузите скетч", kk: "Скетчті жүктеңіз" },
      body: {
        en: "Install the \"esp32 by Espressif\" package (3.x), select \"ESP32 Dev Module\", and if the build is too big pick Tools → Partition Scheme → \"Huge APP\". With the battery OFF, upload over USB and open the Serial Monitor at 115200 baud.",
        ru: "Установите пакет «esp32 by Espressif» (3.x), выберите «ESP32 Dev Module»; если скетч не влезает, выберите Tools → Partition Scheme → «Huge APP». При выключенной батарее загрузите скетч по USB и откройте Serial Monitor на 115200 бод.",
        kk: "«esp32 by Espressif» (3.x) пакетін орнатып, «ESP32 Dev Module» таңдаңыз; скетч сыймаса, Tools → Partition Scheme → «Huge APP» таңдаңыз. Батарея өшірулі кезде скетчті USB арқылы жүктеп, Serial Monitor-ды 115200 бодта ашыңыз.",
      },
      expect: { en: "\"Bluetooth ready: pair with ropros-tank\".", ru: "«Bluetooth ready: pair with ropros-tank».", kk: "«Bluetooth ready: pair with ropros-tank»." },
      mistake: { en: "Choosing an ESP32-S3 or C3 board: they only have Bluetooth LE and BluetoothSerial will not compile.", ru: "Взять ESP32-S3 или C3: у них только Bluetooth LE, и BluetoothSerial не скомпилируется.", kk: "ESP32-S3 не C3 алу: оларда тек Bluetooth LE бар, BluetoothSerial компиляцияланбайды." },
    },
    {
      title: { en: "Pair the phone and set up the app", ru: "Сопрягите телефон и настройте приложение", kk: "Телефонды жұптап, қолданбаны баптаңыз" },
      body: {
        en: "On Android, pair with ropros-tank in the Bluetooth settings. Install a Bluetooth RC car app that sends single letters (F B L R G I H J S, digits 0–9 and q for speed), or \"Serial Bluetooth Terminal\" and make macro buttons with those letters. Connect from the app: the monitor prints \"phone connected\" and the driver wakes up. iPhones cannot use Bluetooth Classic serial, so this build needs Android.",
        ru: "На Android сопрягите телефон с ropros-tank в настройках Bluetooth. Установите приложение для Bluetooth-машинки, которое шлёт одиночные буквы (F B L R G I H J S, цифры 0–9 и q для скорости), или «Serial Bluetooth Terminal» и сделайте кнопки-макросы с этими буквами. Подключитесь из приложения: монитор напишет «phone connected», и драйвер проснётся. iPhone не умеет Bluetooth Classic serial, поэтому нужен Android.",
        kk: "Android-та Bluetooth баптауларында ropros-tank-пен жұптаңыз. Жеке әріптер жіберетін Bluetooth көлік қолданбасын (F B L R G I H J S, 0–9 цифрлары және жылдамдыққа q) немесе «Serial Bluetooth Terminal» орнатып, осы әріптермен макро батырмалар жасаңыз. Қолданбадан қосылыңыз: монитор «phone connected» деп жазады, драйвер оянады. iPhone Bluetooth Classic serial қолдамайды, сондықтан Android керек.",
      },
      expect: { en: "Pressing forward prints \"cmd F speed 70\" and both wheels roll forward.", ru: "Нажатие «вперёд» печатает «cmd F speed 70», и оба колеса едут вперёд.", kk: "«Алға» басқанда «cmd F speed 70» шығады, екі дөңгелек те алға жүреді." },
      mistake: { en: "Pairing but never pressing Connect in the app: pairing alone does not open the serial link.", ru: "Сопрячь, но не нажать Connect в приложении: само сопряжение не открывает последовательный канал.", kk: "Жұптап, қолданбада Connect баспау: жұптаудың өзі сериялық арнаны ашпайды." },
    },
    {
      title: { en: "Check directions and the safety stop", ru: "Проверьте направления и аварийную остановку", kk: "Бағыттар мен апаттық тоқтауды тексеріңіз" },
      body: {
        en: "With the tank lifted, press forward: both wheels must roll forward. If one turns backwards, swap that motor's two wires. Press L: the left side reverses and the right goes forward, so it spins on the spot. Then put it on the floor and walk out of range or close the app: on disconnect the motors stop and EEP puts the driver to sleep.",
        ru: "Поднимите танк и нажмите «вперёд»: оба колеса должны крутиться вперёд. Если одно крутится назад, поменяйте местами провода этого мотора. Нажмите L: левый борт едет назад, правый вперёд, и танк разворачивается на месте. Затем поставьте его на пол и выйдите из зоны связи или закройте приложение: при обрыве моторы остановятся, а EEP усыпит драйвер.",
        kk: "Танкті көтеріп, «алға» басыңыз: екі дөңгелек те алға айналуы керек. Біреуі кері айналса, сол мотордың сымдарын ауыстырыңыз. L басыңыз: сол жағы артқа, оң жағы алға жүріп, танк орнында бұрылады. Содан соң оны еденге қойып, байланыс аймағынан шығыңыз немесе қолданбаны жабыңыз: байланыс үзілгенде моторлар тоқтап, EEP драйверді ұйықтатады.",
      },
      expect: { en: "\"phone disconnected, motors off\" in the monitor and the tank stands still.", ru: "В мониторе «phone disconnected, motors off», танк стоит.", kk: "Мониторда «phone disconnected, motors off», танк тұрып қалады." },
      mistake: { en: "Setting COMMAND_TIMEOUT_MS to 0 with a joystick app that streams commands: then a frozen app keeps the last command.", ru: "Поставить COMMAND_TIMEOUT_MS = 0 с приложением, которое шлёт команды потоком: тогда зависшее приложение оставит последнюю команду.", kk: "Командаларды үздіксіз жіберетін қолданбамен COMMAND_TIMEOUT_MS = 0 қою: сонда қатып қалған қолданба соңғы команданы қалдырады." },
    },
  ],
  code: [{
    filename: "bluetooth_tank.ino",
    language: "cpp",
    libraries: [],
    source: `// esp32 core 3.x (BluetoothSerial is built in; it is marked deprecated for the future 4.0 core)
#include <BluetoothSerial.h>

#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error "Bluetooth Classic is not enabled: use a classic ESP32 (WROOM-32) board"
#endif

const char* BT_NAME = "ropros-tank";

// ---- DRV8833 ----
const int MOTOR_L_IN1 = 25, MOTOR_L_IN2 = 26;   // left side  -> OUT1/OUT2
const int MOTOR_R_IN1 = 27, MOTOR_R_IN2 = 14;   // right side -> OUT3/OUT4
const int EEP_PIN = 33;                         // HIGH = driver awake
const int PWM_FREQ = 20000, PWM_RESOLUTION = 8;
const int MAX_DUTY = 180;                       // 8.4 V pack on 6 V motors
const unsigned long COMMAND_TIMEOUT_MS = 1000;  // stop if the app goes quiet; 0 = keep last command

BluetoothSerial SerialBT;
int speedPct = 70;
bool wasConnected = false;
unsigned long lastCmd = 0;
bool moving = false;
char lastLogged = 0;

void setMotor(int pinFwd, int pinRev, int speed) {   // -100..100
  speed = constrain(speed, -100, 100);
  int duty = abs(speed) * MAX_DUTY / 100;
  ledcWrite(pinFwd, speed > 0 ? duty : 0);
  ledcWrite(pinRev, speed < 0 ? duty : 0);
}

void tank(int left, int right) {
  setMotor(MOTOR_L_IN1, MOTOR_L_IN2, left);
  setMotor(MOTOR_R_IN1, MOTOR_R_IN2, right);
  moving = left != 0 || right != 0;
}

void handleCommand(char c) {
  int s = speedPct;
  switch (c) {
    case 'F': tank(s, s); break;
    case 'B': tank(-s, -s); break;
    case 'L': tank(-s, s); break;              // spin left on the spot
    case 'R': tank(s, -s); break;
    case 'G': tank(s / 3, s); break;           // forward-left
    case 'I': tank(s, s / 3); break;           // forward-right
    case 'H': tank(-s / 3, -s); break;         // back-left
    case 'J': tank(-s, -s / 3); break;         // back-right
    case 'S': tank(0, 0); break;
    case 'q': speedPct = 100; break;
    default:
      if (c >= '0' && c <= '9') speedPct = (c - '0') * 10;
      else return;                             // ignore lights/horn letters and line breaks
  }
  lastCmd = millis();
  if (c != lastLogged) {                       // apps repeat commands while held: log changes only
    lastLogged = c;
    if (c != 'S') Serial.printf("cmd %c speed %d\\n", c, speedPct);
  }
}

void setup() {
  Serial.begin(115200);
  ledcAttach(MOTOR_L_IN1, PWM_FREQ, PWM_RESOLUTION);
  ledcAttach(MOTOR_L_IN2, PWM_FREQ, PWM_RESOLUTION);
  ledcAttach(MOTOR_R_IN1, PWM_FREQ, PWM_RESOLUTION);
  ledcAttach(MOTOR_R_IN2, PWM_FREQ, PWM_RESOLUTION);
  pinMode(EEP_PIN, OUTPUT);
  digitalWrite(EEP_PIN, LOW);
  tank(0, 0);

  SerialBT.begin(BT_NAME);
  Serial.printf("Bluetooth ready: pair with %s\\n", BT_NAME);
}

void loop() {
  bool connected = SerialBT.hasClient();
  if (connected != wasConnected) {
    wasConnected = connected;
    if (connected) {
      digitalWrite(EEP_PIN, HIGH);
      Serial.println("phone connected");
    } else {
      tank(0, 0);
      digitalWrite(EEP_PIN, LOW);
      Serial.println("phone disconnected, motors off");
    }
  }

  while (SerialBT.available()) handleCommand((char)SerialBT.read());

  if (COMMAND_TIMEOUT_MS > 0 && moving && millis() - lastCmd > COMMAND_TIMEOUT_MS) {
    tank(0, 0);
    Serial.println("timeout: no command, stop");
  }
  delay(2);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "ropros-tank does not appear on the phone", ru: "ropros-tank не виден на телефоне", kk: "ropros-tank телефонда көрінбейді" },
      cause: { en: "The board is an ESP32-S3/C3 (BLE only), or the phone is an iPhone, which hides Bluetooth Classic serial devices.", ru: "Плата ESP32-S3/C3 (только BLE), или телефон — iPhone, который не показывает устройства Bluetooth Classic serial.", kk: "Тақта ESP32-S3/C3 (тек BLE) немесе телефон — Bluetooth Classic serial құрылғыларын көрсетпейтін iPhone." },
      fix: { en: "Use a classic ESP32-WROOM-32 DevKit and an Android phone; check the monitor shows \"Bluetooth ready\".", ru: "Используйте классический ESP32-WROOM-32 DevKit и Android; проверьте, что монитор пишет «Bluetooth ready».", kk: "Классикалық ESP32-WROOM-32 DevKit пен Android қолданыңыз; монитор «Bluetooth ready» деп жазатынын тексеріңіз." },
    },
    {
      symptom: { en: "Connected, letters arrive, but the wheels do not move", ru: "Подключено, буквы приходят, но колёса не крутятся", kk: "Қосылған, әріптер келеді, бірақ дөңгелектер айналмайды" },
      cause: { en: "EEP is not wired to GPIO33 (driver asleep), or DRV8833 VCC has no battery voltage.", ru: "EEP не подключён к GPIO33 (драйвер спит), или на VCC DRV8833 нет напряжения батареи.", kk: "EEP GPIO33-ке қосылмаған (драйвер ұйықтап тұр) немесе DRV8833 VCC-де батарея кернеуі жоқ." },
      fix: { en: "With the phone connected, measure EEP (3.3 V) and VCC (7–8.4 V) against GND.", ru: "При подключённом телефоне измерьте EEP (3,3 В) и VCC (7–8,4 В) относительно GND.", kk: "Телефон қосулы кезде EEP (3,3 В) пен VCC (7–8,4 В) кернеуін GND-ге қатысты өлшеңіз." },
    },
    {
      symptom: { en: "It drives for one second, then stops by itself", ru: "Едет секунду и сам останавливается", kk: "Бір секунд жүріп, өзі тоқтайды" },
      cause: { en: "Your app sends a letter only once per tap, so the 1 s safety timeout kicks in.", ru: "Приложение шлёт букву один раз за нажатие, и срабатывает защитный таймаут 1 с.", kk: "Қолданба бір басуға бір әріп жібереді, сондықтан 1 с қорғаныс уақыты іске қосылады." },
      fix: { en: "Use an app that repeats while the button is held, or set COMMAND_TIMEOUT_MS to 0 and always send S to stop.", ru: "Возьмите приложение, которое повторяет команду, пока кнопка зажата, или поставьте COMMAND_TIMEOUT_MS = 0 и останавливайте буквой S.", kk: "Батырма басулы тұрғанда команданы қайталайтын қолданба алыңыз немесе COMMAND_TIMEOUT_MS = 0 қойып, S әрпімен тоқтатыңыз." },
    },
    {
      symptom: { en: "Bluetooth drops when the motors start", ru: "Bluetooth отваливается при старте моторов", kk: "Моторлар іске қосылғанда Bluetooth үзіледі" },
      cause: { en: "Supply dips or motor noise reset the ESP32.", ru: "Просадка питания или помехи от моторов сбрасывают ESP32.", kk: "Қуаттың түсуі немесе мотор кедергілері ESP32-ні қайта жүктейді." },
      fix: { en: "Charge the pack, keep battery − wired straight to the DRV8833 GND, and solder a 0.1 µF capacitor across each motor's terminals.", ru: "Зарядите батарею, ведите минус прямо на GND DRV8833 и припаяйте конденсатор 0,1 мкФ на выводы каждого мотора.", kk: "Батареяны зарядтаңыз, минусты тікелей DRV8833 GND-ге тартыңыз және әр мотордың шығыстарына 0,1 мкФ конденсатор дәнекерлеңіз." },
    },
  ],
  safety: [
    { en: "Charge the 2S LiPo only with a balance charger and never leave it charging unattended.", ru: "Заряжайте LiPo 2S только балансирным зарядником и не оставляйте без присмотра.", kk: "2S LiPo-ны тек теңгерімдік зарядтағышпен зарядтаңыз және қараусыз қалдырмаңыз." },
    { en: "Switch the battery off before plugging in USB.", ru: "Выключайте батарею перед подключением USB.", kk: "USB қоспас бұрын батареяны өшіріңіз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Bluetooth ready: pair with ropros-tank",
      "phone connected",
      "cmd F speed 70",
      "cmd 9 speed 90",
      "cmd F speed 90",
      "cmd L speed 90",
      "cmd I speed 90",
      "phone disconnected, motors off",
    ],
    leds: [],
  },
} satisfies GuideContent;
