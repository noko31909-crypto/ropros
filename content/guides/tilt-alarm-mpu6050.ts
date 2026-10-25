import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "tilt-alarm-mpu6050",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "security",
  robotics: false,
  difficulty: "intermediate",
  hours: 2,
  costUsd: 11,
  xpReward: 210,
  title: {
    en: "Tilt Alarm with MPU6050",
    ru: "Сигнализация наклона на MPU6050",
    kk: "MPU6050 негізіндегі еңкею дабылы",
  },
  summary: {
    en: "The MPU6050 learns its resting position at start-up, then a buzzer and LED go off when the object is tilted more than 30° from it. Works in any mounting orientation; a button re-arms it.",
    ru: "MPU6050 при запуске запоминает положение покоя, а когда предмет наклоняют больше чем на 30° от него, срабатывают зуммер и светодиод. Работает при любой ориентации крепления; кнопка заново ставит на охрану.",
    kk: "MPU6050 іске қосылғанда тыныштық күйін есте сақтайды, ал зат одан 30°-тан артық еңкейтілсе, зуммер мен жарық диоды іске қосылады. Кез келген бағытта бекітуге болады; батырма қайта күзетке қояды.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V, USB or power bank", ru: "ATmega328P, 5 В, USB или повербанк", kk: "ATmega328P, 5 В, USB немесе повербанк" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "mpu6050", qty: 1, spec: { en: "GY-521 board, I²C address 0x68", ru: "плата GY-521, адрес I²C 0x68", kk: "GY-521 платасы, I²C мекенжайы 0x68" }, role: { en: "Measures the direction of gravity", ru: "Измеряет направление силы тяжести", kk: "Ауырлық күшінің бағытын өлшейді" } },
    { component: "level-shifter", qty: 1, spec: { en: "4-channel BSS138, 3.3 V ↔ 5 V", ru: "4 канала BSS138, 3,3 В ↔ 5 В", kk: "4 арналы BSS138, 3,3 В ↔ 5 В" }, role: { en: "3.3 V I²C for the sensor", ru: "I²C на 3,3 В для датчика", kk: "Датчикке арналған 3,3 В I²C" } },
    { component: "buzzer-active", qty: 1, spec: { en: "5 V active buzzer, 2 pins", ru: "активный зуммер 5 В, 2 вывода", kk: "5 В белсенді зуммер, 2 шықпа" }, role: { en: "Audible alarm", ru: "Звуковая тревога", kk: "Дыбыстық дабыл" } },
    { component: "led", qty: 1, spec: { en: "5 mm red", ru: "5 мм, красный", kk: "5 мм, қызыл" }, role: { en: "Alarm / calibration indicator", ru: "Индикатор тревоги и калибровки", kk: "Дабыл және калибрлеу индикаторы" } },
    { component: "resistor", qty: 1, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиода", kk: "Жарық диодының тогын шектеу" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Silence and re-arm", ru: "Сброс и повторная постановка на охрану", kk: "Дыбысты өшіру және қайта күзетке қою" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 16, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ls", component: "level-shifter", label: "3.3↔5 V shifter" },
    { id: "imu", component: "mpu6050", label: "MPU6050" },
    { id: "bz", component: "buzzer-active", label: "Buzzer" },
    { id: "r1", component: "resistor", label: "220 Ω" },
    { id: "led", component: "led", label: "Alarm LED" },
    { id: "btn", component: "push-button", label: "Re-arm" },
  ],
  connections: [
    { from: "board.5V", to: "imu.VCC", color: "red", note: { en: "GY-521 has its own 3.3 V regulator", ru: "у GY-521 свой стабилизатор 3,3 В", kk: "GY-521-дің өз 3,3 В стабилизаторы бар" } },
    { from: "imu.GND", to: "board.GND", color: "black" },
    { from: "board.5V", to: "ls.HV", color: "red" },
    { from: "board.3V3", to: "ls.LV", color: "orange" },
    { from: "ls.GND", to: "board.GND2", color: "black" },
    { from: "board.A4", to: "ls.HV1", color: "blue", note: { en: "SDA, 5 V side", ru: "SDA, сторона 5 В", kk: "SDA, 5 В жағы" } },
    { from: "ls.LV1", to: "imu.SDA", color: "blue" },
    { from: "board.A5", to: "ls.HV2", color: "yellow", note: { en: "SCL, 5 V side", ru: "SCL, сторона 5 В", kk: "SCL, 5 В жағы" } },
    { from: "ls.LV2", to: "imu.SCL", color: "yellow" },
    { from: "board.D6", to: "bz.+", color: "purple" },
    { from: "bz.-", to: "board.GND", color: "black" },
    { from: "board.D7", to: "r1.A", color: "red" },
    { from: "r1.B", to: "led.A", color: "red", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led.K", to: "board.GND2", color: "black" },
    { from: "board.D2", to: "btn.1", color: "green", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажато = LOW", kk: "ішкі тарту, басылғанда = LOW" } },
    { from: "btn.2", to: "board.GND", color: "black" },
  ],
  steps: [
    {
      title: { en: "Power the MPU6050 and the level shifter", ru: "Запитайте MPU6050 и преобразователь уровней", kk: "MPU6050 мен деңгей түрлендіргішін қоректендіріңіз" },
      body: {
        en: "The GY-521 board has a 3.3 V regulator, so its VCC goes to the Nano's 5V and GND to GND. Its I²C pins, however, are 3.3 V and are pulled up to 3.3 V on the board, while the Nano's bus works at 5 V. Place the BSS138 shifter: HV to 5V, LV to 3V3, GND to GND. The 3V3 pin only feeds the shifter's pull-ups here, well under a milliamp.",
        ru: "На плате GY-521 есть стабилизатор 3,3 В, поэтому её VCC подключается к 5V Nano, а GND к GND. Но выводы I²C у неё 3,3-вольтовые и подтянуты к 3,3 В на самой плате, а шина Nano работает на 5 В. Поставьте преобразователь BSS138: HV к 5V, LV к 3V3, GND к GND. Пин 3V3 здесь питает только подтяжки преобразователя, это меньше миллиампера.",
        kk: "GY-521 платасында 3,3 В стабилизаторы бар, сондықтан оның VCC-і Nano-ның 5V-іне, GND-і GND-ге қосылады. Бірақ оның I²C пиндері 3,3 вольтты және платаның өзінде 3,3 В-қа тартылған, ал Nano шинасы 5 В-та жұмыс істейді. BSS138 түрлендіргішін қойыңыз: HV-ны 5V-ке, LV-ны 3V3-ке, GND-ні GND-ге. Мұнда 3V3 пині тек түрлендіргіштің тартқыштарын қоректендіреді, бұл бір миллиампердан аз.",
      },
      expect: { en: "The green power LED on the GY-521 lights.", ru: "На GY-521 загорается зелёный светодиод питания.", kk: "GY-521-дегі жасыл қуат шамы жанады." },
      mistake: { en: "Feeding the GY-521 from 3V3 works, but it leaves the regulator with no headroom; 5V on VCC is the intended input.", ru: "От 3V3 GY-521 тоже заработает, но стабилизатору не хватит запаса; штатный вход VCC рассчитан на 5V.", kk: "GY-521 3V3-тен де жұмыс істейді, бірақ стабилизаторға қор жетпейді; VCC кірісі 5V-ке арналған." },
    },
    {
      title: { en: "Connect the I²C lines through the shifter", ru: "Проведите линии I²C через преобразователь", kk: "I²C желілерін түрлендіргіш арқылы өткізіңіз" },
      body: {
        en: "Wire Nano A4 (SDA) to HV1 and LV1 to the GY-521's SDA, then A5 (SCL) to HV2 and LV2 to SCL. Leave XDA, XCL, AD0 and INT unconnected: with AD0 floating the board's own pull-down keeps the address at 0x68.",
        ru: "Соедините A4 (SDA) Nano с HV1, а LV1 с SDA платы GY-521, затем A5 (SCL) с HV2, а LV2 с SCL. XDA, XCL, AD0 и INT оставьте свободными: при неподключённом AD0 собственная подтяжка платы к земле держит адрес 0x68.",
        kk: "Nano-ның A4 (SDA) пинін HV1-ге, ал LV1-ді GY-521-дің SDA-сына, содан кейін A5-ті (SCL) HV2-ге, ал LV2-ні SCL-ге қосыңыз. XDA, XCL, AD0 және INT бос қалады: AD0 қосылмағанда, платаның өз жерге тартқышы мекенжайды 0x68 күйінде ұстайды.",
      },
      expect: { en: "SDA on channel 1 and SCL on channel 2, on both sides.", ru: "SDA на канале 1, SCL на канале 2, с обеих сторон.", kk: "Екі жақта да SDA 1-арнада, SCL 2-арнада." },
      mistake: { en: "Crossing channels (A4 → HV1 but LV2 → SDA) gives \"MPU6050 not found\".", ru: "Перепутанные каналы (A4 → HV1, но LV2 → SDA) дают «MPU6050 not found».", kk: "Арналар шатасса (A4 → HV1, бірақ LV2 → SDA), «MPU6050 not found» шығады." },
    },
    {
      title: { en: "Add the buzzer, LED and re-arm button", ru: "Добавьте зуммер, светодиод и кнопку", kk: "Зуммерді, жарық диодын және батырманы қосыңыз" },
      body: {
        en: "Active buzzer: + to D6, − to GND. LED: D7 through a 220 Ω resistor to the long leg, short leg to GND. Button: one leg to D2, the diagonally opposite leg to GND; the sketch enables the internal pull-up.",
        ru: "Активный зуммер: + к D6, − к GND. Светодиод: D7 через резистор 220 Ом к длинной ножке, короткая ножка к GND. Кнопка: одна ножка к D2, ножка по диагонали к GND; скетч включает внутреннюю подтяжку.",
        kk: "Белсенді зуммер: + D6-ға, − GND-ге. Жарық диоды: D7 220 Ом резистор арқылы ұзын аяғына, қысқа аяғы GND-ге. Батырма: бір аяғы D2-ге, диагональ бойынша қарсы аяғы GND-ге; скетч ішкі тартуды қосады.",
      },
      expect: { en: "Three outputs/inputs on D2, D6 and D7, all returning to GND.", ru: "Три вывода на D2, D6 и D7, все возвращаются на GND.", kk: "D2, D6 және D7-де үш шықпа, бәрі GND-ге оралады." },
      mistake: { en: "An LED without its resistor overloads D7.", ru: "Светодиод без резистора перегружает D7.", kk: "Резисторсыз жарық диоды D7-ні шамадан тыс жүктейді." },
    },
    {
      title: { en: "Upload and calibrate", ru: "Загрузите скетч и откалибруйте", kk: "Скетчті жүктеп, калибрлеңіз" },
      body: {
        en: "No extra library is needed: the sketch talks to the MPU6050 registers with Wire. Upload, open the Serial Monitor at 9600 baud and keep the board perfectly still. The LED blinks for one second while the sketch averages 100 accelerometer readings: that average is the direction of gravity in the resting position, whatever way the sensor is mounted.",
        ru: "Дополнительные библиотеки не нужны: скетч работает с регистрами MPU6050 через Wire. Загрузите скетч, откройте Serial Monitor на 9600 бод и держите плату абсолютно неподвижно. Светодиод мигает одну секунду, пока скетч усредняет 100 измерений акселерометра: это среднее и есть направление силы тяжести в положении покоя, как бы ни был закреплён датчик.",
        kk: "Қосымша кітапхана керек емес: скетч MPU6050 регистрлерімен Wire арқылы жұмыс істейді. Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз және платаны мүлдем қозғалтпаңыз. Скетч акселерометрдің 100 өлшемін орташалап жатқанда, жарық диоды бір секунд жыпылықтайды: бұл орташа мән датчик қалай бекітілсе де, тыныштық күйіндегі ауырлық күшінің бағыты болады.",
      },
      expect: { en: "\"Reference set, |g| = 1.00\" (±0.05) and then \"Armed\".", ru: "«Reference set, |g| = 1.00» (±0,05), затем «Armed».", kk: "«Reference set, |g| = 1.00» (±0,05), содан кейін «Armed»." },
      mistake: { en: "Moving the board during the blink stores a wrong reference; press the button to calibrate again.", ru: "Если двигать плату, пока мигает светодиод, запишется неверная опора; нажмите кнопку для новой калибровки.", kk: "Жарық диоды жыпылықтап тұрғанда платаны қозғасаңыз, қате тірек мән жазылады; қайта калибрлеу үшін батырманы басыңыз." },
    },
    {
      title: { en: "Test the alarm angle", ru: "Проверьте угол срабатывания", kk: "Іске қосылу бұрышын тексеріңіз" },
      body: {
        en: "Slowly tilt the breadboard and watch tilt= in the Serial Monitor. Past 30° held for 0.3 s, the alarm latches: the buzzer and LED pulse until you press the button, even if you put the object back. A short bump does not trigger it because the readings are low-pass filtered. Change ALARM_ANGLE for a more or less sensitive alarm.",
        ru: "Медленно наклоняйте макетку и следите за tilt= в Serial Monitor. При наклоне больше 30° дольше 0,3 с тревога фиксируется: зуммер и светодиод пульсируют, пока вы не нажмёте кнопку, даже если вернуть предмет на место. Короткий толчок её не вызывает, потому что показания сглаживаются фильтром. Измените ALARM_ANGLE, чтобы сделать сигнализацию чувствительнее или грубее.",
        kk: "Макет тақтасын ақырын еңкейтіп, Serial Monitor-дағы tilt= мәнін бақылаңыз. 30°-тан артық еңкею 0,3 с-тан ұзаққа созылса, дабыл бекітіледі: затты орнына қойсаңыз да, батырманы басқанша зуммер мен жарық диоды соғып тұрады. Қысқа соққы оны қоспайды, себебі көрсеткіштер сүзгімен тегістеледі. Дабылды сезімталырақ не дөрекірек ету үшін ALARM_ANGLE мәнін өзгертіңіз.",
      },
      expect: { en: "\"ALARM tilt=3x.x deg\" once you pass 30°.", ru: "«ALARM tilt=3x.x deg», как только наклон превысит 30°.", kk: "Еңкею 30°-тан асқан бойда «ALARM tilt=3x.x deg»." },
      mistake: { en: "Expecting it to detect rotation around the vertical axis: turning flat on a table does not change the gravity direction.", ru: "Ждать срабатывания при повороте вокруг вертикальной оси: вращение плашмя на столе не меняет направление силы тяжести.", kk: "Тік ось айналасында бұрағанда іске қосылады деп күту: үстел үстінде жалпақ күйде айналдыру ауырлық күшінің бағытын өзгертпейді." },
    },
    {
      title: { en: "Re-arm and mount", ru: "Повторная постановка и монтаж", kk: "Қайта күзетке қою және орнату" },
      body: {
        en: "Press the button to silence the alarm. The LED blinks slowly for 3 seconds so you can set the object down, then the sketch calibrates the new resting position and prints \"Armed\". Fix the GY-521 firmly to the object you protect (a box lid, a bag, a display stand); a loose sensor rattles and gives false alarms.",
        ru: "Нажмите кнопку, чтобы выключить тревогу. Светодиод медленно мигает 3 секунды, чтобы вы успели поставить предмет, затем скетч калибрует новое положение покоя и пишет «Armed». Жёстко закрепите GY-521 на охраняемом предмете (крышка коробки, сумка, витрина): болтающийся датчик дребезжит и даёт ложные тревоги.",
        kk: "Дабылды өшіру үшін батырманы басыңыз. Затты орнына қойып үлгеруіңіз үшін жарық диоды 3 секунд баяу жыпылықтайды, содан кейін скетч жаңа тыныштық күйін калибрлеп, «Armed» деп жазады. GY-521-ді күзетілетін затқа (қорап қақпағы, сөмке, көрме тұғыры) берік бекітіңіз: бос тұрған датчик сылдырлап, жалған дабыл береді.",
      },
      expect: { en: "\"Re-arming in 3 s\", then \"Armed\" with a fresh reference.", ru: "«Re-arming in 3 s», затем «Armed» с новой опорой.", kk: "«Re-arming in 3 s», содан кейін жаңа тірек мәнмен «Armed»." },
      mistake: { en: "Holding the button down keeps restarting the countdown; release it right away.", ru: "Если держать кнопку, отсчёт начинается заново; отпустите её сразу.", kk: "Батырманы ұстап тұрсаңыз, кері санақ қайта басталады; оны бірден жіберіңіз." },
    },
  ],
  code: [{
    filename: "tilt_alarm.ino",
    language: "cpp",
    libraries: [],
    source: `#include <Wire.h>

const int BUZZER_PIN = 6, LED_PIN = 7, BUTTON_PIN = 2;
// MPU6050 on I2C: SDA = A4, SCL = A5, through the level shifter
const uint8_t MPU_ADDR = 0x68;           // AD0 open = 0x68
const float ALARM_ANGLE = 30.0;          // degrees away from the calibrated position
const float CLEAR_ANGLE = 25.0;          // hysteresis for the tilt timer
const unsigned long HOLD_MS = 300;       // tilt must last this long (ignores bumps)

float refX = 0, refY = 0, refZ = 1;      // unit gravity vector at rest
float fx = 0, fy = 0, fz = 1;            // filtered current reading
bool alarmLatched = false;
bool tilting = false;
unsigned long tiltSince = 0, lastRead = 0, lastPrint = 0;

void writeReg(uint8_t reg, uint8_t value) {
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(reg);
  Wire.write(value);
  Wire.endTransmission();
}

bool readAccel(float &x, float &y, float &z) {
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B);                      // ACCEL_XOUT_H
  if (Wire.endTransmission(false) != 0) return false;
  if (Wire.requestFrom(MPU_ADDR, (uint8_t)6) != 6) return false;
  int16_t raw[3];
  for (int i = 0; i < 3; i++) {
    uint8_t hi = Wire.read();
    uint8_t lo = Wire.read();
    raw[i] = (int16_t)((hi << 8) | lo);
  }
  x = raw[0] / 16384.0;                  // +-2 g range: 16384 counts per g
  y = raw[1] / 16384.0;
  z = raw[2] / 16384.0;
  return true;
}

bool calibrate() {
  Serial.println(F("Calibrating, keep still..."));
  float sx = 0, sy = 0, sz = 0;
  int n = 0;
  for (int i = 0; i < 100; i++) {        // about 1 s
    float x, y, z;
    if (readAccel(x, y, z)) {
      sx += x; sy += y; sz += z;
      n++;
    }
    digitalWrite(LED_PIN, (i / 10) % 2);
    delay(10);
  }
  digitalWrite(LED_PIN, LOW);
  float m = sqrt(sx * sx + sy * sy + sz * sz);
  if (n < 50 || m < 0.1) return false;
  refX = sx / m; refY = sy / m; refZ = sz / m;
  fx = refX; fy = refY; fz = refZ;
  Serial.print(F("Reference set, |g| = "));
  Serial.println(m / n, 2);
  return true;
}

float tiltAngle() {
  float m = sqrt(fx * fx + fy * fy + fz * fz);
  if (m < 0.1) return 0;
  float c = (fx * refX + fy * refY + fz * refZ) / m;
  c = constrain(c, -1.0, 1.0);
  return acos(c) * 180.0 / PI;
}

void rearm() {
  alarmLatched = false;
  tilting = false;
  digitalWrite(BUZZER_PIN, LOW);
  while (digitalRead(BUTTON_PIN) == LOW) delay(10);   // wait for release
  Serial.println(F("Re-arming in 3 s, set the object down"));
  for (int i = 0; i < 6; i++) {
    digitalWrite(LED_PIN, i % 2 == 0);
    delay(500);
  }
  while (!calibrate()) delay(500);
  Serial.println(F("Armed"));
}

void setup() {
  Serial.begin(9600);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  Wire.begin();

  Wire.beginTransmission(MPU_ADDR);
  if (Wire.endTransmission() != 0) {
    Serial.println(F("MPU6050 not found"));
    while (true) { digitalWrite(LED_PIN, (millis() / 100) % 2); }
  }
  Serial.println(F("MPU6050 found"));
  writeReg(0x6B, 0x00);                  // PWR_MGMT_1: wake up
  writeReg(0x1A, 0x03);                  // CONFIG: 44 Hz digital low-pass filter
  writeReg(0x1C, 0x00);                  // ACCEL_CONFIG: +-2 g
  delay(100);
  while (!calibrate()) delay(500);
  Serial.println(F("Armed"));
}

void loop() {
  unsigned long now = millis();
  if (digitalRead(BUTTON_PIN) == LOW) rearm();

  if (now - lastRead >= 20) {            // 50 readings per second
    lastRead = now;
    float x, y, z;
    if (readAccel(x, y, z)) {
      const float a = 0.2;               // low-pass filter: ignores short bumps
      fx += a * (x - fx);
      fy += a * (y - fy);
      fz += a * (z - fz);
    }
    float angle = tiltAngle();
    if (angle > ALARM_ANGLE) {
      if (!tilting) { tilting = true; tiltSince = now; }
      if (!alarmLatched && now - tiltSince >= HOLD_MS) {
        alarmLatched = true;
        Serial.print(F("ALARM tilt="));
        Serial.print(angle, 1);
        Serial.println(F(" deg"));
      }
    } else if (angle < CLEAR_ANGLE) {
      tilting = false;
    }
    if (now - lastPrint >= 500) {
      lastPrint = now;
      Serial.print(F("tilt="));
      Serial.print(angle, 1);
      Serial.println(F(" deg"));
    }
  }

  if (alarmLatched) {
    bool on = (now / 200) % 2;           // pulse 2.5 times per second
    digitalWrite(BUZZER_PIN, on);
    digitalWrite(LED_PIN, on);
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    digitalWrite(LED_PIN, tilting);      // steady LED while tilted but not yet alarmed
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"MPU6050 not found\" and the LED flickers fast", ru: "«MPU6050 not found», светодиод быстро мерцает", kk: "«MPU6050 not found», жарық диоды жылдам жыпылықтайды" },
      cause: { en: "SDA/SCL crossed between the shifter channels, LV/HV swapped, or AD0 tied high (address 0x69).", ru: "SDA/SCL перепутаны между каналами преобразователя, LV/HV поменяны, или AD0 подключён к питанию (адрес 0x69).", kk: "SDA/SCL түрлендіргіш арналары арасында шатасқан, LV/HV ауысқан немесе AD0 қуатқа қосылған (мекенжай 0x69)." },
      fix: { en: "Trace A4 → HV1 → LV1 → SDA and A5 → HV2 → LV2 → SCL; leave AD0 open. An I²C scanner should find 0x68.", ru: "Проследите A4 → HV1 → LV1 → SDA и A5 → HV2 → LV2 → SCL; AD0 оставьте свободным. I²C-сканер должен найти 0x68.", kk: "A4 → HV1 → LV1 → SDA және A5 → HV2 → LV2 → SCL тізбектерін қадағалаңыз; AD0-ны бос қалдырыңыз. I²C сканер 0x68-ді табуы керек." },
    },
    {
      symptom: { en: "|g| at calibration is far from 1.00 (e.g. 0.5 or 2.0)", ru: "|g| при калибровке далеко от 1.00 (например, 0.5 или 2.0)", kk: "Калибрлеу кезінде |g| 1.00-ден алыс (мысалы, 0.5 не 2.0)" },
      cause: { en: "The board was moving, or it is a clone (MPU6500/MPU9250 marked as MPU6050) with a different scale.", ru: "Плата двигалась, или это клон (MPU6500/MPU9250 с маркировкой MPU6050) с другим масштабом.", kk: "Плата қозғалып тұрды немесе бұл басқа масштабы бар көшірме (MPU6050 деп белгіленген MPU6500/MPU9250)." },
      fix: { en: "Recalibrate on a still table. The tilt angle is computed from directions only, so a scale error does not change the alarm angle.", ru: "Откалибруйте заново на неподвижном столе. Угол считается только по направлениям, поэтому ошибка масштаба не меняет угол срабатывания.", kk: "Қозғалмайтын үстелде қайта калибрлеңіз. Бұрыш тек бағыттар бойынша есептеледі, сондықтан масштаб қатесі іске қосылу бұрышын өзгертпейді." },
    },
    {
      symptom: { en: "False alarms when someone walks past", ru: "Ложные тревоги, когда кто-то проходит рядом", kk: "Біреу жанынан өткенде жалған дабыл" },
      cause: { en: "The sensor is loosely mounted and rattles, or ALARM_ANGLE is too small for your surface.", ru: "Датчик плохо закреплён и дребезжит, или ALARM_ANGLE слишком мал для вашей поверхности.", kk: "Датчик нашар бекітіліп, сылдырлайды немесе ALARM_ANGLE сіздің бетіңіз үшін тым кіші." },
      fix: { en: "Screw or hot-glue the GY-521 down, and raise ALARM_ANGLE or HOLD_MS.", ru: "Прикрутите или приклейте GY-521 термоклеем и увеличьте ALARM_ANGLE или HOLD_MS.", kk: "GY-521-ді бұраңыз не термоклеймен жабыстырыңыз және ALARM_ANGLE немесе HOLD_MS мәнін көбейтіңіз." },
    },
  ],
  safety: [
    { en: "For a portable build, power the Nano from a USB power bank; do not feed 5V and VIN at the same time.", ru: "Для переносной версии питайте Nano от USB-повербанка; не подавайте питание одновременно на 5V и VIN.", kk: "Тасымалы нұсқа үшін Nano-ны USB повербанктен қоректендіріңіз; 5V пен VIN-ге бір мезгілде қуат бермеңіз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "MPU6050 found",
      "Calibrating, keep still...",
      "Reference set, |g| = 1.01",
      "Armed",
      "tilt=0.6 deg",
      "tilt=12.4 deg",
      "tilt=31.8 deg",
      "ALARM tilt=33.2 deg",
      "tilt=4.1 deg",
      "Re-arming in 3 s, set the object down",
      "Calibrating, keep still...",
      "Reference set, |g| = 1.00",
      "Armed",
    ],
    leds: [{ label: "ALARM", color: "#E53935" }],
  },
} satisfies GuideContent;
