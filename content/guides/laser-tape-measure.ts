import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "laser-tape-measure",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "tools",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 14,
  xpReward: 160,
  title: {
    en: "Laser Tape Measure",
    ru: "Лазерная рулетка",
    kk: "Лазерлік рулетка",
  },
  summary: {
    en: "A VL53L0X time-of-flight sensor times an invisible laser pulse to measure up to 1.2 m (2 m in long-range mode). One button freezes the reading or switches mm, cm and inches on a handheld OLED tool.",
    ru: "Датчик времени пролёта VL53L0X засекает невидимый лазерный импульс и измеряет до 1,2 м (2 м в режиме дальности). Одна кнопка фиксирует показание или переключает мм, см и дюймы на ручном приборе с OLED.",
    kk: "VL53L0X ұшу уақыты датчигі көрінбейтін лазер импульсінің уақытын өлшеп, 1,2 м-ге дейін (алыс режимде 2 м) қашықтықты анықтайды. Бір батырма көрсеткішті бекітеді немесе OLED бар қол құралында мм, см және дюймды ауыстырады.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V", ru: "ATmega328P, 5 В", kk: "ATmega328P, 5 В" }, role: { en: "Reads the sensor, drives the screen", ru: "Читает датчик, управляет экраном", kk: "Датчикті оқиды, экранды басқарады" } },
    { component: "vl53l0x", qty: 1, spec: { en: "GY-530 board with regulator, I²C 0x29", ru: "плата GY-530 со стабилизатором, I²C 0x29", kk: "реттегіші бар GY-530 платасы, I²C 0x29" }, role: { en: "Laser time-of-flight distance sensor", ru: "Лазерный датчик расстояния по времени пролёта", kk: "Ұшу уақыты бойынша лазерлік қашықтық датчигі" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C 0x3C", ru: "0,96\" 128×64, I²C 0x3C", kk: "0,96\" 128×64, I²C 0x3C" }, role: { en: "Big distance readout", ru: "Крупное отображение расстояния", kk: "Қашықтықты ірі көрсету" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Short: hold, long: units", ru: "Коротко: фиксация, долго: единицы", kk: "Қысқа: бекіту, ұзақ: бірліктер" } },
    { component: "battery-9v", qty: 1, spec: { en: "PP3 with snap clip", ru: "«Крона» с клипсой", kk: "Қысқышы бар PP3 («Крона»)" }, role: { en: "Portable power into VIN", ru: "Автономное питание на VIN", kk: "VIN-ге автономды қорек" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT", ru: "SPDT", kk: "SPDT" }, role: { en: "Power switch", ru: "Выключатель питания", kk: "Қорек ажыратқышы" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 14, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "tof", component: "vl53l0x", label: "VL53L0X" },
    { id: "oled", component: "oled-ssd1306", label: "OLED" },
    { id: "btn", component: "push-button", label: "Hold / units" },
    { id: "bat", component: "battery-9v", label: "9 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
  ],
  connections: [
    { from: "board.5V", to: "tof.VIN", color: "red", note: { en: "onboard 2.8 V regulator", ru: "встроенный стабилизатор 2,8 В", kk: "кірістірілген 2,8 В реттегіш" } },
    { from: "tof.GND", to: "board.GND", color: "black" },
    { from: "tof.SDA", to: "board.A4", color: "blue" },
    { from: "tof.SCL", to: "board.A5", color: "yellow" },
    { from: "tof.XSHUT", to: "board.D7", color: "orange", note: { en: "only pulled LOW or released, never driven HIGH", ru: "только тянется в LOW или отпускается, никогда не HIGH", kk: "тек LOW-ға тартылады не босатылады, ешқашан HIGH емес" } },
    { from: "board.5V", to: "oled.VCC", color: "red" },
    { from: "oled.GND", to: "board.GND2", color: "black" },
    { from: "oled.SDA", to: "board.A4", color: "blue" },
    { from: "oled.SCL", to: "board.A5", color: "yellow" },
    { from: "board.D4", to: "btn.1", color: "green", note: { en: "internal pull-up", ru: "внутренняя подтяжка", kk: "ішкі тарту" } },
    { from: "btn.2", to: "board.GND", color: "black" },
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "board.VIN", color: "red" },
    { from: "bat.-", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Wire the VL53L0X", ru: "Подключите VL53L0X", kk: "VL53L0X-ті қосыңыз" },
      body: {
        en: "Connect VIN to 5V and GND to GND: the GY-530 has its own 2.8 V regulator and I²C pull-ups, so it connects straight to the Nano's I²C pins. SDA goes to A4, SCL to A5. Connect XSHUT to D7 so the sketch can reset the sensor at start-up. Leave GPIO1 unconnected: it is a \"data ready\" output that this sketch does not need, because the library asks the sensor over I²C instead.",
        ru: "Подключите VIN к 5V и GND к GND: на GY-530 есть свой стабилизатор 2,8 В и подтяжки I²C, поэтому он подключается прямо к пинам I²C Nano. SDA идёт на A4, SCL на A5. Подключите XSHUT к D7, чтобы скетч мог сбрасывать датчик при запуске. GPIO1 оставьте неподключённым: это выход «данные готовы», который этому скетчу не нужен, потому что библиотека спрашивает датчик по I²C.",
        kk: "VIN-ді 5V-ке, GND-ті GND-ге қосыңыз: GY-530-да өз 2,8 В реттегіші мен I²C тартқыштары бар, сондықтан ол Nano-ның I²C пиндеріне тікелей қосылады. SDA A4-ке, SCL A5-ке барады. Скетч іске қосылғанда датчикті қайта жүктей алуы үшін XSHUT-ты D7-ге қосыңыз. GPIO1-ді қоспай қалдырыңыз: бұл «деректер дайын» шығысы, бұл скетчке ол керек емес, себебі кітапхана датчиктен I²C арқылы сұрайды.",
      },
      expect: { en: "Five wires to the sensor; GPIO1 stays free.", ru: "Пять проводов к датчику, GPIO1 свободен.", kk: "Датчикке бес сым, GPIO1 бос." },
      mistake: { en: "Forgetting to peel the clear protective film off the sensor window: readings are short and wrong.", ru: "Забыть снять прозрачную защитную плёнку с окна датчика: показания занижены и неверны.", kk: "Датчик терезесіндегі мөлдір қорғаныш үлдірді алуды ұмыту: көрсеткіштер азайып, қате шығады." },
    },
    {
      title: { en: "Why XSHUT is never driven HIGH", ru: "Почему XSHUT никогда не подаётся HIGH", kk: "Неге XSHUT-қа ешқашан HIGH берілмейді" },
      body: {
        en: "XSHUT on the GY-530 is not level-shifted: it goes straight to the 2.8 V chip, with a pull-up resistor on the board. A 5 V HIGH from the Nano would push current into it. So the sketch only ever switches D7 to OUTPUT LOW (sensor off) and then back to INPUT, which lets the board's own pull-up bring XSHUT to 2.8 V and wakes the sensor.",
        ru: "XSHUT на GY-530 не согласован по уровню: он идёт прямо на чип 2,8 В, а на плате стоит подтягивающий резистор. HIGH 5 В от Nano толкал бы в него ток. Поэтому скетч только переключает D7 в OUTPUT LOW (датчик выключен) и затем обратно в INPUT: тогда подтяжка на плате сама поднимает XSHUT до 2,8 В и будит датчик.",
        kk: "GY-530-дағы XSHUT деңгейі келістірілмеген: ол тікелей 2,8 В чипке барады, ал платада тартқыш резистор бар. Nano-дан 5 В HIGH оған ток итерер еді. Сондықтан скетч D7-ді тек OUTPUT LOW-ға (датчик сөнеді) ауыстырып, содан кейін қайтадан INPUT-қа қайтарады: сонда платадағы тарту XSHUT-ты 2,8 В-қа өзі көтеріп, датчикті оятады.",
      },
      expect: { en: "You understand the LOW / release pattern in the sketch.", ru: "Вы понимаете схему «LOW / отпустить» в скетче.", kk: "Скетчтегі «LOW / босату» тәсілін түсіндіңіз." },
      mistake: { en: "Adding digitalWrite(XSHUT_PIN, HIGH) \"to be sure\" defeats the protection.", ru: "Добавить digitalWrite(XSHUT_PIN, HIGH) «для надёжности» значит свести защиту на нет.", kk: "«Сенімді болу үшін» digitalWrite(XSHUT_PIN, HIGH) қосу қорғанысты жояды." },
    },
    {
      title: { en: "Add the OLED, button and battery", ru: "Добавьте OLED, кнопку и батарейку", kk: "OLED, батырма және батареяны қосыңыз" },
      body: {
        en: "The OLED joins the same I²C bus: VCC to 5V, GND to GND, SDA to A4, SCL to A5. The button goes between D4 and GND. For a handheld tool, connect the 9 V battery + to the middle pin of the slide switch, one outer pin to VIN, and battery − to GND.",
        ru: "OLED подключается к той же шине I²C: VCC к 5V, GND к GND, SDA к A4, SCL к A5. Кнопка ставится между D4 и GND. Для ручного прибора подключите плюс батарейки 9 В к среднему выводу движкового переключателя, один крайний вывод к VIN, а минус батарейки к GND.",
        kk: "OLED сол I²C шинасына қосылады: VCC 5V-ке, GND GND-ге, SDA A4-ке, SCL A5-ке. Батырма D4 пен GND арасына қойылады. Қол құралы үшін 9 В батареяның плюсін сырғымалы ажыратқыштың ортаңғы шықпасына, бір шеткі шықпасын VIN-ге, ал батарея минусын GND-ге қосыңыз.",
      },
      expect: { en: "Flipping the switch powers the Nano without USB.", ru: "Переключатель включает Nano без USB.", kk: "Ажыратқыш Nano-ны USB-сіз қосады." },
      mistake: { en: "Battery + straight on the 5V pin destroys the Nano; it must go to VIN.", ru: "Плюс батарейки прямо на пин 5V сжигает Nano: он должен идти на VIN.", kk: "Батарея плюсін тікелей 5V пиніне қосу Nano-ны күйдіреді: ол VIN-ге баруы керек." },
    },
    {
      title: { en: "Upload and measure", ru: "Загрузите скетч и измеряйте", kk: "Скетчті жүктеп, өлшеңіз" },
      body: {
        en: "Install \"VL53L0X\" by Pololu, \"Adafruit SSD1306\" and \"Adafruit GFX Library\", then upload. Point the sensor at a wall: the OLED shows the distance in cm, averaged over the last five readings. A short press freezes the value (HOLD), another press releases it. Holding the button for one second switches between mm, cm and inches.",
        ru: "Установите «VL53L0X» от Pololu, «Adafruit SSD1306» и «Adafruit GFX Library» и загрузите скетч. Направьте датчик на стену: OLED покажет расстояние в см, усреднённое по последним пяти измерениям. Короткое нажатие фиксирует значение (HOLD), повторное отпускает. Удержание кнопки секунду переключает мм, см и дюймы.",
        kk: "Pololu-дың «VL53L0X», «Adafruit SSD1306» және «Adafruit GFX Library» кітапханаларын орнатып, скетчті жүктеңіз. Датчикті қабырғаға бағыттаңыз: OLED соңғы бес өлшеудің орташасы бойынша қашықтықты см-мен көрсетеді. Қысқа басу мәнді бекітеді (HOLD), қайта басу босатады. Батырманы бір секунд басып тұру мм, см және дюйм арасында ауыстырады.",
      },
      expect: { en: "A wall 50 cm away reads about 49–51 cm.", ru: "Стена в 50 см показывает примерно 49–51 см.", kk: "50 см қашықтықтағы қабырға шамамен 49–51 см көрсетеді." },
      mistake: { en: "Measuring a far, small target: the beam is a 25° cone, so at 1 m it sees a spot about 45 cm wide and returns the nearest thing in it.", ru: "Мерить до далёкой маленькой цели: луч это конус 25°, на 1 м он видит пятно около 45 см и возвращает ближайший предмет в нём.", kk: "Алыстағы кішкентай нысанды өлшеу: сәуле 25° конус, 1 м қашықтықта ол шамамен 45 см дақты көріп, ондағы ең жақын затты қайтарады." },
    },
    {
      title: { en: "Calibrate the offset", ru: "Откалибруйте смещение", kk: "Ығысуды калибрлеңіз" },
      body: {
        en: "Put the tool against a ruler with a book as the target at exactly 300 mm from the sensor window. If it reads 312 mm, set OFFSET_MM = -12. If you build it into a case and want to measure from the back edge like a real laser measure, add the depth of the case to OFFSET_MM. Matte light surfaces measure best; black or glossy ones read short or out of range.",
        ru: "Положите прибор у линейки и поставьте книгу ровно в 300 мм от окна датчика. Если показывает 312 мм, поставьте OFFSET_MM = -12. Если вы встроили прибор в корпус и хотите мерить от заднего торца, как настоящая лазерная рулетка, прибавьте к OFFSET_MM глубину корпуса. Лучше всего измеряются матовые светлые поверхности, чёрные и глянцевые дают заниженное значение или «out of range».",
        kk: "Құралды сызғыштың жанына қойып, кітапты датчик терезесінен дәл 300 мм қашықтыққа қойыңыз. Ол 312 мм көрсетсе, OFFSET_MM = -12 қойыңыз. Құралды корпусқа салып, нағыз лазерлік рулетка сияқты артқы шетінен өлшегіңіз келсе, OFFSET_MM-ге корпустың тереңдігін қосыңыз. Күңгірт ашық беттер ең жақсы өлшенеді, қара не жылтыр беттер азайтылған мән немесе «out of range» береді.",
      },
      expect: { en: "300 mm reads 300 ± 5 mm after the correction.", ru: "После поправки 300 мм показывает 300 ± 5 мм.", kk: "Түзетуден кейін 300 мм 300 ± 5 мм көрсетеді." },
      mistake: { en: "Calibrating at 5 cm: very short distances are the least accurate range of the sensor.", ru: "Калибровать на 5 см: очень короткие расстояния у этого датчика самые неточные.", kk: "5 см-де калибрлеу: бұл датчикте өте қысқа қашықтықтар ең дәлсіз." },
    },
  ],
  code: [{
    filename: "laser_tape_measure.ino",
    language: "cpp",
    libraries: ["VL53L0X", "Adafruit SSD1306", "Adafruit GFX Library"],
    source: `#include <Wire.h>
#include <VL53L0X.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

const int XSHUT_PIN = 7;            // only LOW or released, never HIGH (2.8 V pin)
const int BUTTON_PIN = 4;           // short: hold, long (1 s): units
const int OFFSET_MM = 0;            // calibration / case depth correction
const bool LONG_RANGE = false;      // true: up to ~2 m indoors, noisier
const int RANGE_MM = LONG_RANGE ? 2000 : 1200;   // beyond this = out of range

VL53L0X sensor;
Adafruit_SSD1306 display(128, 64, &Wire, -1);

enum Unit { MM, CM, INCH };
Unit unit = CM;
bool hold = false;
int history[5];
uint8_t nSamples = 0, idx = 0;
int shownMm = -1;                   // -1 = out of range
unsigned long pressedAt = 0, lastPrint = 0;
bool longDone = false;

void resetSensor() {
  pinMode(XSHUT_PIN, OUTPUT);
  digitalWrite(XSHUT_PIN, LOW);     // sensor in shutdown
  delay(10);
  pinMode(XSHUT_PIN, INPUT);        // release: the module pull-up wakes it
  delay(10);
}

void drawValue() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print(hold ? "HOLD" : "LIVE");
  display.setCursor(80, 0);
  display.print(unit == MM ? "mm" : unit == CM ? "cm" : "inch");
  display.setTextSize(3);
  display.setCursor(0, 22);
  if (shownMm < 0) {
    display.print("---");
  } else if (unit == MM) {
    display.print(shownMm);
  } else if (unit == CM) {
    display.print(shownMm / 10.0, 1);
  } else {
    display.print(shownMm / 25.4, 2);
  }
  display.setTextSize(1);
  display.setCursor(0, 56);
  display.print(shownMm < 0 ? "out of range" : "short: hold  long: unit");
  display.display();
}

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  Wire.begin();
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED not found");
    while (true) delay(1000);
  }
  display.setTextColor(SSD1306_WHITE);

  resetSensor();
  sensor.setTimeout(500);
  if (!sensor.init()) {
    Serial.println("VL53L0X not found");
    display.clearDisplay();
    display.setCursor(0, 24);
    display.print("VL53L0X not found");
    display.display();
    while (true) delay(1000);
  }
  if (LONG_RANGE) {
    sensor.setSignalRateLimit(0.1);
    sensor.setVcselPulsePeriod(VL53L0X::VcselPeriodPreRange, 18);
    sensor.setVcselPulsePeriod(VL53L0X::VcselPeriodFinalRange, 14);
  }
  sensor.setMeasurementTimingBudget(100000);   // 100 ms: more accurate than the 33 ms default
  sensor.startContinuous();
  Serial.println("laser tape ready");
}

void loop() {
  unsigned long now = millis();

  // button: short press toggles HOLD, 1 s press cycles the unit
  if (digitalRead(BUTTON_PIN) == LOW) {
    if (pressedAt == 0) pressedAt = now;
    if (!longDone && now - pressedAt >= 1000) {
      unit = unit == MM ? CM : unit == CM ? INCH : MM;
      longDone = true;
      Serial.println(unit == MM ? "unit mm" : unit == CM ? "unit cm" : "unit inch");
    }
  } else if (pressedAt != 0) {
    if (!longDone && now - pressedAt >= 40) {
      hold = !hold;
      Serial.println(hold ? "HOLD" : "LIVE");
    }
    pressedAt = 0;
    longDone = false;
  }

  if (!hold) {
    int mm = sensor.readRangeContinuousMillimeters();
    if (sensor.timeoutOccurred() || mm >= RANGE_MM) {
      shownMm = -1;
      nSamples = 0;
      idx = 0;
    } else {
      history[idx] = mm;
      idx = (idx + 1) % 5;
      if (nSamples < 5) nSamples++;
      long sum = 0;
      for (uint8_t i = 0; i < nSamples; i++) sum += history[i];
      shownMm = max(0L, sum / nSamples + OFFSET_MM);
    }
  }
  drawValue();

  if (now - lastPrint >= 500) {
    lastPrint = now;
    if (shownMm < 0) {
      Serial.println("out of range");
    } else {
      Serial.print(hold ? "HOLD " : "");
      Serial.print(shownMm);
      Serial.print(" mm  ");
      Serial.print(shownMm / 10.0, 1);
      Serial.print(" cm  ");
      Serial.print(shownMm / 25.4, 2);
      Serial.println(" in");
    }
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"VL53L0X not found\"", ru: "«VL53L0X not found»", kk: "«VL53L0X not found»" },
      cause: { en: "SDA/SCL swapped, XSHUT held LOW by a wrong pin, or a loose VIN wire.", ru: "Перепутаны SDA/SCL, XSHUT удерживается в LOW не тем пином, или плохо вставлен VIN.", kk: "SDA/SCL ауысқан, XSHUT басқа пинмен LOW-да ұсталып тұр немесе VIN сымы нашар тұр." },
      fix: { en: "Check SDA→A4, SCL→A5 and XSHUT→D7; an I²C scanner should show 0x29 and 0x3C.", ru: "Проверьте SDA→A4, SCL→A5 и XSHUT→D7; I²C-сканер должен показать 0x29 и 0x3C.", kk: "SDA→A4, SCL→A5 және XSHUT→D7 тексеріңіз; I²C сканері 0x29 бен 0x3C көрсетуі керек." },
    },
    {
      symptom: { en: "Readings are 20–40 mm too short at every distance", ru: "Показания на 20–40 мм меньше на любом расстоянии", kk: "Көрсеткіштер кез келген қашықтықта 20–40 мм-ге аз" },
      cause: { en: "The protective film is still on, or a cover glass reflects the laser back.", ru: "Не снята защитная плёнка, или защитное стекло отражает лазер обратно.", kk: "Қорғаныш үлдір алынбаған немесе қорғаныш шыны лазерді кері шағылыстырады." },
      fix: { en: "Peel the film off and do not put clear plastic in front of the sensor; leave an open window in the case.", ru: "Снимите плёнку и не ставьте прозрачный пластик перед датчиком; оставьте в корпусе открытое окно.", kk: "Үлдірді алып, датчик алдына мөлдір пластик қоймаңыз; корпуста ашық терезе қалдырыңыз." },
    },
    {
      symptom: { en: "\"out of range\" at 80 cm in a sunny room", ru: "«out of range» на 80 см в солнечной комнате", kk: "Күн түсіп тұрған бөлмеде 80 см-де «out of range»" },
      cause: { en: "Sunlight contains 940 nm infrared that drowns the sensor's own pulses.", ru: "В солнечном свете много ИК 940 нм, и он заглушает собственные импульсы датчика.", kk: "Күн сәулесінде 940 нм ИҚ көп, ол датчиктің өз импульстерін басып кетеді." },
      fix: { en: "Measure out of direct sunlight; outdoors expect less than half the indoor range.", ru: "Измеряйте не на прямом солнце; на улице дальность меньше половины комнатной.", kk: "Тікелей күн сәулесінде өлшемеңіз; далада қашықтық бөлмедегінің жартысынан аз болады." },
    },
  ],
  safety: [
    { en: "The VL53L0X uses an invisible Class 1 infrared laser, which is eye-safe in normal use. Still, do not stare into the window at close range.", ru: "VL53L0X использует невидимый инфракрасный лазер класса 1, безопасный для глаз при обычном использовании. Но всё равно не смотрите в окно датчика вплотную.", kk: "VL53L0X көзге қалыпты пайдалануда қауіпсіз, көрінбейтін 1-класты инфрақызыл лазерді қолданады. Сонда да датчик терезесіне жақыннан қарамаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "laser tape ready",
      "487 mm  48.7 cm  19.17 in",
      "489 mm  48.9 cm  19.25 in",
      "612 mm  61.2 cm  24.09 in",
      "HOLD",
      "HOLD 612 mm  61.2 cm  24.09 in",
      "LIVE",
      "unit inch",
      "out of range",
      "1034 mm  103.4 cm  40.71 in",
    ],
    leds: [],
  },
} satisfies GuideContent;
