import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pulse-oximeter-max30102",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "sensors",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 14,
  xpReward: 260,
  title: {
    en: "Pulse Oximeter with MAX30102 and OLED",
    ru: "Пульсоксиметр на MAX30102 с OLED",
    kk: "MAX30102 және OLED негізіндегі пульсоксиметр",
  },
  summary: {
    en: "A MAX30102 shines red and infrared light through your fingertip; the Nano runs Maxim's algorithm to estimate heart rate and SpO2 and shows them on a small OLED. A learning project, not a medical device.",
    ru: "MAX30102 просвечивает палец красным и инфракрасным светом, Nano по алгоритму Maxim оценивает пульс и SpO2 и выводит их на маленький OLED. Учебный проект, не медицинский прибор.",
    kk: "MAX30102 саусақты қызыл және инфрақызыл жарықпен жарықтандырады, Nano Maxim алгоритмі бойынша жүрек соғу жиілігі мен SpO2-ні бағалап, оларды шағын OLED-ке шығарады. Бұл оқу жобасы, медициналық құрал емес.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V, USB powered", ru: "ATmega328P, 5 В, питание от USB", kk: "ATmega328P, 5 В, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "max30102", qty: 1, spec: { en: "MAX30102 breakout, I²C address 0x57", ru: "плата MAX30102, адрес I²C 0x57", kk: "MAX30102 платасы, I²C мекенжайы 0x57" }, role: { en: "Red + IR optical pulse sensor", ru: "Оптический датчик пульса, красный + ИК", kk: "Қызыл + ИҚ оптикалық пульс датчигі" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C address 0x3C", ru: "0,96\" 128×64, адрес I²C 0x3C", kk: "0,96\" 128×64, I²C мекенжайы 0x3C" }, role: { en: "Display", ru: "Дисплей", kk: "Дисплей" } },
    { component: "level-shifter", qty: 1, spec: { en: "4-channel BSS138, 3.3 V ↔ 5 V", ru: "4 канала BSS138, 3,3 В ↔ 5 В", kk: "4 арналы BSS138, 3,3 В ↔ 5 В" }, role: { en: "Keeps the 3.3 V I²C devices away from the Nano's 5 V bus", ru: "Защищает 3,3-вольтовые устройства I²C от 5-вольтовой шины Nano", kk: "3,3 В I²C құрылғыларын Nano-ның 5 В шинасынан қорғайды" } },
    { component: "breadboard", qty: 1, spec: { en: "full size, 830 points", ru: "полноразмерная, 830 точек", kk: "толық өлшемді, 830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 16, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ls", component: "level-shifter", label: "3.3↔5 V shifter" },
    { id: "ox", component: "max30102", label: "MAX30102" },
    { id: "oled", component: "oled-ssd1306", label: "OLED 128×64" },
  ],
  connections: [
    { from: "board.5V", to: "ls.HV", color: "red", note: { en: "high-voltage side = Nano", ru: "высоковольтная сторона = Nano", kk: "жоғары кернеулі жақ = Nano" } },
    { from: "board.3V3", to: "ls.LV", color: "orange", note: { en: "low-voltage side = sensors", ru: "низковольтная сторона = датчики", kk: "төмен кернеулі жақ = датчиктер" } },
    { from: "ls.GND", to: "board.GND", color: "black" },
    { from: "board.A4", to: "ls.HV1", color: "blue", note: { en: "SDA, 5 V side", ru: "SDA, сторона 5 В", kk: "SDA, 5 В жағы" } },
    { from: "board.A5", to: "ls.HV2", color: "yellow", note: { en: "SCL, 5 V side", ru: "SCL, сторона 5 В", kk: "SCL, 5 В жағы" } },
    { from: "ls.LV1", to: "ox.SDA", color: "blue" },
    { from: "ls.LV2", to: "ox.SCL", color: "yellow" },
    { from: "ls.LV1", to: "oled.SDA", color: "blue" },
    { from: "ls.LV2", to: "oled.SCL", color: "yellow" },
    { from: "board.5V", to: "ox.VIN", color: "red", note: { en: "onboard regulators make 1.8 V and 3.3 V", ru: "встроенные стабилизаторы дают 1,8 и 3,3 В", kk: "кірістірілген стабилизаторлар 1,8 және 3,3 В береді" } },
    { from: "ox.GND", to: "board.GND2", color: "black" },
    { from: "board.3V3", to: "oled.VCC", color: "orange" },
    { from: "oled.GND", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Power the level shifter", ru: "Запитайте преобразователь уровней", kk: "Деңгей түрлендіргішін қоректендіріңіз" },
      body: {
        en: "Both the MAX30102 and the OLED talk I²C at 3.3 V, while the Nano's A4/A5 bus runs at 5 V. Put the BSS138 shifter on the breadboard: HV to the Nano's 5V, LV to 3V3, GND to GND. Then wire A4 (SDA) to HV1 and A5 (SCL) to HV2. From now on LV1 is the 3.3 V SDA line and LV2 is the 3.3 V SCL line.",
        ru: "MAX30102 и OLED общаются по I²C на 3,3 В, а шина A4/A5 у Nano работает на 5 В. Поставьте преобразователь BSS138 на макетку: HV к 5V Nano, LV к 3V3, GND к GND. Затем соедините A4 (SDA) с HV1, а A5 (SCL) с HV2. Теперь LV1 это линия SDA на 3,3 В, а LV2 это SCL на 3,3 В.",
        kk: "MAX30102 мен OLED I²C арқылы 3,3 В-та байланысады, ал Nano-ның A4/A5 шинасы 5 В-та жұмыс істейді. BSS138 түрлендіргішін макет тақтасына қойыңыз: HV-ны Nano-ның 5V-іне, LV-ны 3V3-ке, GND-ні GND-ге. Содан кейін A4-ті (SDA) HV1-ге, A5-ті (SCL) HV2-ге қосыңыз. Енді LV1 3,3 В SDA желісі, ал LV2 3,3 В SCL желісі болады.",
      },
      expect: { en: "Shifter powered on both sides, A4/A5 on HV1/HV2.", ru: "Преобразователь запитан с обеих сторон, A4/A5 на HV1/HV2.", kk: "Түрлендіргіш екі жағынан да қоректенеді, A4/A5 HV1/HV2-де." },
      mistake: { en: "Swapping LV and HV puts 5 V on the sensor bus.", ru: "Если перепутать LV и HV, на шину датчиков попадёт 5 В.", kk: "LV мен HV-ны ауыстырсаңыз, датчик шинасына 5 В түседі." },
    },
    {
      title: { en: "Wire the MAX30102", ru: "Подключите MAX30102", kk: "MAX30102-ні қосыңыз" },
      body: {
        en: "Connect the sensor's VIN to 5V: the breakout has its own 1.8 V and 3.3 V regulators for the chip and the LEDs. GND goes to GND, SDA to LV1 and SCL to LV2. INT, IRD and RD stay unconnected; the sketch polls the sensor over I²C. Use male-female wires so you can hold the sensor comfortably away from the breadboard.",
        ru: "Подключите VIN датчика к 5V: на плате есть свои стабилизаторы 1,8 и 3,3 В для чипа и светодиодов. GND к GND, SDA к LV1, SCL к LV2. INT, IRD и RD оставьте свободными: скетч опрашивает датчик по I²C. Возьмите провода папа-мама, чтобы датчик можно было удобно держать в стороне от макетки.",
        kk: "Датчиктің VIN-ін 5V-ке қосыңыз: платада чип пен жарық диодтары үшін өзінің 1,8 және 3,3 В стабилизаторлары бар. GND-ні GND-ге, SDA-ны LV1-ге, SCL-ді LV2-ге қосыңыз. INT, IRD және RD бос қалады: скетч датчикті I²C арқылы сұрап отырады. Датчикті макет тақтасынан алыс ыңғайлы ұстау үшін аталық-аналық сымдарды алыңыз.",
      },
      expect: { en: "Four wires to the sensor; the LEDs stay off until the code starts them.", ru: "К датчику идут четыре провода; светодиоды не горят, пока их не включит код.", kk: "Датчикке төрт сым барады; код қоспайынша жарық диодтары жанбайды." },
      mistake: { en: "Running SDA/SCL straight to A4/A5 skips the shifter and stresses the 3.3 V chip.", ru: "Если вести SDA/SCL прямо на A4/A5 в обход преобразователя, 3,3-вольтовый чип работает с перегрузкой.", kk: "SDA/SCL-ді түрлендіргішті айналып өтіп, тікелей A4/A5-ке қоссаңыз, 3,3 вольтты чип артық жүктемемен жұмыс істейді." },
    },
    {
      title: { en: "Wire the OLED", ru: "Подключите OLED", kk: "OLED-ті қосыңыз" },
      body: {
        en: "Connect OLED VCC to the Nano's 3V3 and GND to GND, then SDA to LV1 and SCL to LV2, sharing the lines with the sensor. Powering the OLED from 3.3 V keeps its built-in pull-up resistors at 3.3 V as well. The sensor answers at 0x57 and the display at 0x3C, so both live happily on one bus.",
        ru: "Подключите VCC OLED к 3V3 Nano, GND к GND, затем SDA к LV1 и SCL к LV2, на те же линии, что и датчик. Питание OLED от 3,3 В держит его встроенные подтягивающие резисторы тоже на 3,3 В. Датчик отвечает по адресу 0x57, дисплей по 0x3C, поэтому они спокойно делят одну шину.",
        kk: "OLED-тің VCC-ін Nano-ның 3V3-іне, GND-ін GND-ге, содан кейін SDA-ны LV1-ге, SCL-ді LV2-ге, датчикпен ортақ желілерге қосыңыз. OLED-ті 3,3 В-тан қоректендірсеңіз, оның кірістірілген тартқыш резисторлары да 3,3 В-та қалады. Датчик 0x57, дисплей 0x3C мекенжайында жауап береді, сондықтан екеуі бір шинада еркін жұмыс істейді.",
      },
      expect: { en: "Both I²C devices hang off LV1/LV2.", ru: "Оба устройства I²C сидят на LV1/LV2.", kk: "Екі I²C құрылғысы да LV1/LV2-ге қосылған." },
      mistake: { en: "Mixing up VCC and GND on the OLED header (the order differs between brands) can kill the display.", ru: "Если перепутать VCC и GND на разъёме OLED (порядок у разных производителей разный), дисплей может сгореть.", kk: "OLED ұяшығында VCC мен GND-ні шатастырсаңыз (реті өндірушіге қарай әртүрлі), дисплей күйіп кетуі мүмкін." },
    },
    {
      title: { en: "Install the libraries and upload", ru: "Установите библиотеки и загрузите скетч", kk: "Кітапханаларды орнатып, скетчті жүктеңіз" },
      body: {
        en: "Install \"SparkFun MAX3010x Pulse and Proximity Sensor Library\" and \"SSD1306Ascii\" from Library Manager. The Nano has only 2 KB of RAM and Maxim's algorithm already uses about 800 bytes, so the sketch uses the text-only SSD1306Ascii driver (no 1 KB frame buffer) and stores samples as 16-bit values. Upload and open the Serial Monitor at 115200 baud.",
        ru: "Установите из менеджера библиотек «SparkFun MAX3010x Pulse and Proximity Sensor Library» и «SSD1306Ascii». У Nano всего 2 КБ ОЗУ, а алгоритм Maxim сам занимает около 800 байт, поэтому скетч использует текстовый драйвер SSD1306Ascii (без кадрового буфера на 1 КБ) и хранит отсчёты в 16 битах. Загрузите скетч и откройте Serial Monitor на 115200 бод.",
        kk: "Кітапханалар менеджерінен «SparkFun MAX3010x Pulse and Proximity Sensor Library» және «SSD1306Ascii» орнатыңыз. Nano-да небәрі 2 КБ жедел жады бар, ал Maxim алгоритмінің өзі шамамен 800 байт алады, сондықтан скетч тек мәтіндік SSD1306Ascii драйверін (1 КБ кадр буферінсіз) қолданады және өлшемдерді 16 битпен сақтайды. Скетчті жүктеп, Serial Monitor-ды 115200 бодта ашыңыз.",
      },
      expect: { en: "\"MAX30102 ready\", and the OLED asks you to place a finger.", ru: "«MAX30102 ready», а OLED просит приложить палец.", kk: "«MAX30102 ready», ал OLED саусақты қоюды сұрайды." },
      mistake: { en: "Using the Adafruit_SSD1306 library here runs the Nano out of RAM and it freezes or resets.", ru: "С библиотекой Adafruit_SSD1306 здесь Nano не хватает ОЗУ, и он зависает или перезагружается.", kk: "Мұнда Adafruit_SSD1306 кітапханасын қолдансаңыз, Nano-ға жедел жады жетпей, ол қатып қалады не қайта жүктеледі." },
    },
    {
      title: { en: "Take a measurement", ru: "Сделайте измерение", kk: "Өлшеу жасаңыз" },
      body: {
        en: "Rest your hand on the table and lay a fingertip lightly over the sensor window; pressing hard squeezes the blood out and flattens the signal. Keep still. The sketch needs 4 seconds of samples (100 at 25 per second), then updates every second using the newest 4 seconds. Lifting the finger resets it.",
        ru: "Положите руку на стол и легко приложите подушечку пальца к окошку датчика: сильное нажатие выдавливает кровь и сглаживает сигнал. Не двигайтесь. Скетчу нужно 4 секунды отсчётов (100 штук по 25 в секунду), дальше он обновляет данные каждую секунду по последним 4 секундам. Если убрать палец, измерение начинается заново.",
        kk: "Қолыңызды үстелге қойып, саусақ ұшын датчик терезесіне жеңіл тигізіңіз: қатты басу қанды ығыстырып, сигналды тегістеп жібереді. Қозғалмаңыз. Скетчке 4 секундтық өлшем керек (секундына 25-тен, барлығы 100), содан кейін ол соңғы 4 секунд бойынша деректерді әр секунд сайын жаңартады. Саусақты алсаңыз, өлшеу басынан басталады.",
      },
      expect: { en: "Within about 10 s: HR around 60–100 bpm at rest and SpO2 around 95–99 %.", ru: "Примерно через 10 с: пульс в покое около 60–100 уд/мин и SpO2 около 95–99 %.", kk: "Шамамен 10 с ішінде: тыныштықта пульс шамамен 60–100 соққы/мин, ал SpO2 шамамен 95–99 %." },
      mistake: { en: "Talking or tapping the table adds motion that the algorithm reads as extra beats.", ru: "Разговор или постукивание по столу дают движение, которое алгоритм считает лишними ударами.", kk: "Сөйлеу немесе үстелді тықылдату алгоритм артық соққы деп санайтын қозғалыс қосады." },
    },
    {
      title: { en: "Understand the limits", ru: "Поймите ограничения", kk: "Шектеулерді түсініңіз" },
      body: {
        en: "Maxim's reference algorithm is simple and was not calibrated for your sensor, your LEDs or your skin. It flags results as invalid when it cannot find clean peaks, and the sketch shows \"--\" for those and for anything outside 30–220 bpm or 70–100 %. Treat the numbers as a demonstration of how pulse oximetry works, not as a health reading.",
        ru: "Эталонный алгоритм Maxim простой и не калибровался под ваш датчик, ваши светодиоды и вашу кожу. Он помечает результат как недостоверный, когда не находит чистых пиков, и скетч показывает «--» для таких значений и для всего вне диапазонов 30–220 уд/мин и 70–100 %. Считайте цифры демонстрацией принципа пульсоксиметрии, а не показателем здоровья.",
        kk: "Maxim-нің эталондық алгоритмі қарапайым және сіздің датчигіңізге, жарық диодтарыңызға, теріңізге калибрленбеген. Таза шыңдарды таба алмаса, ол нәтижені жарамсыз деп белгілейді, ал скетч мұндай мәндер үшін және 30–220 соққы/мин немесе 70–100 % ауқымынан тыс кез келген мән үшін «--» көрсетеді. Сандарды денсаулық көрсеткіші емес, пульсоксиметрия принципінің көрсетілімі ретінде қабылдаңыз.",
      },
      expect: { en: "You know why a reading shows \"--\" and when to distrust it.", ru: "Вы понимаете, почему показание «--» и когда ему не стоит верить.", kk: "Көрсеткіштің неге «--» екенін және оған қашан сенбеу керегін білесіз." },
      mistake: { en: "Comparing a single reading with a clinical oximeter and drawing medical conclusions.", ru: "Сравнивать одно измерение с медицинским пульсоксиметром и делать медицинские выводы.", kk: "Бір өлшемді медициналық пульсоксиметрмен салыстырып, медициналық қорытынды жасау." },
    },
  ],
  code: [{
    filename: "pulse_oximeter.ino",
    language: "cpp",
    libraries: ["SparkFun MAX3010x Pulse and Proximity Sensor Library", "SSD1306Ascii"],
    source: `#include <Wire.h>
#include "MAX30105.h"          // SparkFun library, works for MAX30102
#include "spo2_algorithm.h"
#include "SSD1306Ascii.h"
#include "SSD1306AsciiWire.h"

// I2C: SDA = A4, SCL = A5, through the level shifter to the 3.3 V side
const uint8_t OLED_ADDR = 0x3C;
const uint8_t BUFFER_LEN = 100;    // 4 s of samples at 25 samples/s
const uint8_t NEW_SAMPLES = 25;    // 1 s of fresh samples per update
const uint32_t FINGER_IR = 50000;  // raw IR level that means a finger covers the sensor

MAX30105 sensor;
SSD1306AsciiWire oled;

uint16_t irBuffer[BUFFER_LEN];     // 16-bit: the Nano has only 2 KB of RAM
uint16_t redBuffer[BUFFER_LEN];
int32_t spo2, heartRate;
int8_t spo2Valid, hrValid;
bool bufferFull = false;
bool promptShown = false;

// Fills the buffers from index 'from' to the end. Returns false as soon as the finger is lifted.
bool collect(uint8_t from) {
  for (uint8_t i = from; i < BUFFER_LEN; i++) {
    while (!sensor.available()) sensor.check();
    uint32_t red = sensor.getRed();
    uint32_t ir = sensor.getIR();
    sensor.nextSample();
    if (ir < FINGER_IR) return false;
    redBuffer[i] = red >> 2;       // 18-bit sample -> 16 bits, waveform shape unchanged
    irBuffer[i] = ir >> 2;
  }
  return true;
}

void showPrompt() {
  oled.clear();
  oled.set1X();
  oled.println(F("Pulse oximeter"));
  oled.println();
  oled.set2X();
  oled.println(F("Place"));
  oled.println(F("finger"));
  Serial.println(F("Place finger"));
  promptShown = true;
}

void showResult() {
  bool hrOk = hrValid && heartRate >= 30 && heartRate <= 220;
  bool spOk = spo2Valid && spo2 >= 70 && spo2 <= 100;
  if (promptShown) {
    oled.clear();
    promptShown = false;
  }
  oled.set1X();
  oled.setCursor(0, 0);
  oled.print(F("Pulse oximeter"));
  oled.set2X();
  oled.setCursor(0, 2);
  oled.print(F("HR   "));
  if (hrOk) oled.print(heartRate); else oled.print(F("--"));
  oled.clearToEOL();
  oled.setCursor(0, 5);
  oled.print(F("SpO2 "));
  if (spOk) { oled.print(spo2); oled.print('%'); } else oled.print(F("--"));
  oled.clearToEOL();
  oled.set1X();
  oled.setCursor(0, 7);
  oled.print(hrOk && spOk ? F("bpm  |  not medical") : F("hold still..."));
  oled.clearToEOL();

  Serial.print(F("HR="));
  if (hrOk) Serial.print(heartRate); else Serial.print(F("--"));
  Serial.print(F(" bpm SpO2="));
  if (spOk) Serial.print(spo2); else Serial.print(F("--"));
  Serial.println(F("%"));
}

void setup() {
  Serial.begin(115200);
  Wire.begin();
  oled.begin(&Adafruit128x64, OLED_ADDR);
  oled.setFont(System5x7);
  oled.clear();

  if (!sensor.begin(Wire, I2C_SPEED_STANDARD)) {   // 100 kHz is safest through the level shifter
    Serial.println(F("MAX30102 not found"));
    oled.println(F("MAX30102 not found"));
    while (true) {}
  }
  // LED 60 (~12 mA), average 4, red + IR, 100 Hz, 411 us pulses (18-bit), 4096 nA range
  sensor.setup(60, 4, 2, 100, 411, 4096);
  Serial.println(F("MAX30102 ready"));
  showPrompt();
}

void loop() {
  if (!bufferFull) {
    if (!collect(0)) {
      if (!promptShown) showPrompt();
      return;
    }
    bufferFull = true;
  } else {
    // drop the oldest second, keep the newest 3 s, then read 1 s of new samples
    for (uint8_t i = NEW_SAMPLES; i < BUFFER_LEN; i++) {
      redBuffer[i - NEW_SAMPLES] = redBuffer[i];
      irBuffer[i - NEW_SAMPLES] = irBuffer[i];
    }
    if (!collect(BUFFER_LEN - NEW_SAMPLES)) {
      bufferFull = false;
      return;
    }
  }
  maxim_heart_rate_and_oxygen_saturation(irBuffer, BUFFER_LEN, redBuffer, &spo2, &spo2Valid, &heartRate, &hrValid);
  showResult();
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"MAX30102 not found\"", ru: "«MAX30102 not found»", kk: "«MAX30102 not found»" },
      cause: { en: "SDA/SCL crossed between the shifter channels, LV/HV swapped, or a clone board whose pull-up resistors go to its 1.8 V rail, which is too low for a clean 3.3 V bus.", ru: "SDA/SCL перепутаны между каналами преобразователя, LV/HV поменяны, или это клон, у которого подтяжки идут на шину 1,8 В, а этого мало для чистой шины 3,3 В.", kk: "SDA/SCL түрлендіргіш арналары арасында шатасқан, LV/HV ауысқан немесе бұл тартқыштары 1,8 В шинасына қосылған көшірме плата, ал таза 3,3 В шинасына бұл аз." },
      fix: { en: "Trace A4 → HV1 → LV1 → SDA and A5 → HV2 → LV2 → SCL. Run an I²C scanner: it should list 0x3C and 0x57. If only 0x3C shows up on a known-good wiring, try another MAX30102 board.", ru: "Проследите A4 → HV1 → LV1 → SDA и A5 → HV2 → LV2 → SCL. Запустите I²C-сканер: он должен найти 0x3C и 0x57. Если при заведомо верной схеме виден только 0x3C, попробуйте другую плату MAX30102.", kk: "A4 → HV1 → LV1 → SDA және A5 → HV2 → LV2 → SCL тізбектерін қадағалаңыз. I²C сканерді іске қосыңыз: ол 0x3C пен 0x57-ні табуы керек. Сызба дұрыс бола тұра тек 0x3C көрінсе, басқа MAX30102 платасын қолданып көріңіз." },
    },
    {
      symptom: { en: "HR and SpO2 keep showing \"--\"", ru: "HR и SpO2 всё время показывают «--»", kk: "HR мен SpO2 үнемі «--» көрсетеді" },
      cause: { en: "Movement, pressing too hard, cold fingers or bright light leaking in around the finger.", ru: "Движение, слишком сильное нажатие, холодные пальцы или яркий свет, попадающий сбоку.", kk: "Қозғалыс, тым қатты басу, суық саусақ немесе бүйірден түсетін жарық." },
      fix: { en: "Warm your hands, rest the hand on the table, touch lightly, and shade the sensor (a strip of black tape or a finger cot around it helps).", ru: "Согрейте руки, положите руку на стол, касайтесь легко и затените датчик (поможет полоска чёрной изоленты или напальчник).", kk: "Қолыңызды жылытып, үстелге қойыңыз, жеңіл тигізіңіз және датчикті көлеңкелеңіз (қара оқшаулағыш таспа немесе саусаққап көмектеседі)." },
    },
    {
      symptom: { en: "The Nano freezes or restarts after a few seconds", ru: "Nano зависает или перезапускается через несколько секунд", kk: "Nano бірнеше секундтан кейін қатып қалады не қайта іске қосылады" },
      cause: { en: "Not enough RAM: extra Serial strings without F(), a graphics library with a frame buffer, or longer sample buffers.", ru: "Не хватает ОЗУ: лишние строки Serial без F(), графическая библиотека с кадровым буфером или более длинные буферы отсчётов.", kk: "Жедел жады жетпейді: F()-сыз артық Serial жолдары, кадр буфері бар графикалық кітапхана немесе ұзынырақ өлшем буферлері." },
      fix: { en: "Keep SSD1306Ascii, wrap every constant string in F(), and leave BUFFER_LEN at 100. The IDE should report at least 300 bytes free for local variables.", ru: "Оставьте SSD1306Ascii, оборачивайте каждую строковую константу в F() и не меняйте BUFFER_LEN = 100. IDE должна показывать не меньше 300 свободных байт для локальных переменных.", kk: "SSD1306Ascii-ді қалдырыңыз, әр жол тұрақтысын F() ішіне орап, BUFFER_LEN = 100 мәнін өзгертпеңіз. IDE жергілікті айнымалыларға кемінде 300 бос байт көрсетуі керек." },
    },
    {
      symptom: { en: "Readings look plausible but differ a lot from a pharmacy oximeter", ru: "Показания правдоподобны, но сильно отличаются от аптечного пульсоксиметра", kk: "Көрсеткіштер шындыққа ұқсайды, бірақ дәріханалық пульсоксиметрден қатты ерекшеленеді" },
      cause: { en: "The reference algorithm uses a generic calibration curve, and nail polish, skin tone and finger position all change how much red and IR light passes through.", ru: "Эталонный алгоритм использует общую калибровочную кривую, а лак на ногтях, тон кожи и положение пальца меняют, сколько красного и ИК-света проходит.", kk: "Эталондық алгоритм жалпы калибрлеу қисығын қолданады, ал тырнақ лагы, тері түсі және саусақтың орны өтетін қызыл және ИҚ жарықтың мөлшерін өзгертеді." },
      fix: { en: "That is expected for a hobby build. Use it to learn the principle; for health decisions use a certified device.", ru: "Для любительской сборки это нормально. Используйте её, чтобы понять принцип; для решений о здоровье нужен сертифицированный прибор.", kk: "Әуесқой құрылғы үшін бұл қалыпты. Оны принципті түсіну үшін қолданыңыз; денсаулыққа қатысты шешімдер үшін сертификатталған құрал керек." },
    },
  ],
  safety: [
    { en: "Not a medical device. Do not use it to diagnose, monitor or treat any condition. If you feel short of breath, dizzy or have chest pain, contact a doctor or emergency services, whatever this build shows.", ru: "Это не медицинский прибор. Не используйте его для диагностики, наблюдения или лечения. Если вам не хватает воздуха, кружится голова или болит в груди, обратитесь к врачу или в скорую помощь, что бы ни показывало это устройство.", kk: "Бұл медициналық құрал емес. Оны ауруды анықтауға, бақылауға немесе емдеуге қолданбаңыз. Ентігу, бас айналу немесе кеуде ауыруы болса, бұл құрылғы не көрсетсе де, дәрігерге немесе жедел жәрдемге хабарласыңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "MAX30102 ready",
      "Place finger",
      "HR=-- bpm SpO2=--%",
      "HR=74 bpm SpO2=--%",
      "HR=72 bpm SpO2=98%",
      "HR=71 bpm SpO2=98%",
      "HR=73 bpm SpO2=97%",
      "Place finger",
    ],
    leds: [],
  },
} satisfies GuideContent;
