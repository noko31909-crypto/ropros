import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-air-quality-monitor",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "sensors",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 14,
  xpReward: 220,
  title: {
    en: "ESP32 Air Quality Monitor with MQ-135",
    ru: "Монитор качества воздуха на ESP32 и MQ-135",
    kk: "ESP32 және MQ-135 ауа сапасы мониторы",
  },
  summary: {
    en: "An MQ-135 gas sensor, read safely through a voltage divider, compares the air with a clean-air baseline. An OLED shows the numbers and an RGB LED glows green, yellow or red.",
    ru: "Газовый датчик MQ-135, подключённый безопасно через делитель напряжения, сравнивает воздух с эталоном чистого воздуха. OLED показывает цифры, а RGB-светодиод светится зелёным, жёлтым или красным.",
    kk: "Кернеу бөлгіші арқылы қауіпсіз қосылған MQ-135 газ датчигі ауаны таза ауа эталонымен салыстырады. OLED сандарды көрсетеді, ал RGB жарық диоды жасыл, сары немесе қызыл түспен жанады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit V1 (WROOM-32), 3.3 V logic, ADC inputs max 3.3 V", ru: "ESP32 DevKit V1 (WROOM-32), логика 3,3 В, вход АЦП максимум 3,3 В", kk: "ESP32 DevKit V1 (WROOM-32), 3,3 В логика, АЦТ кірісі ең көбі 3,3 В" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "mq135-air", qty: 1, spec: { en: "module with AO/DO, 5 V heater (~160 mA)", ru: "модуль с AO/DO, нагреватель 5 В (~160 мА)", kk: "AO/DO шығыстары бар модуль, 5 В қыздырғыш (~160 мА)" }, role: { en: "Air quality sensor", ru: "Датчик качества воздуха", kk: "Ауа сапасы датчигі" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C address 0x3C", ru: "0,96\" 128×64, адрес I²C 0x3C", kk: "0,96\" 128×64, I²C мекенжайы 0x3C" }, role: { en: "Readout", ru: "Дисплей показаний", kk: "Көрсеткіштер дисплейі" } },
    { component: "rgb-led", qty: 1, spec: { en: "5 mm, common cathode", ru: "5 мм, общий катод", kk: "5 мм, ортақ катод" }, role: { en: "Status colour", ru: "Цвет состояния", kk: "Күй түсі" } },
    { component: "resistor", qty: 5, spec: { en: "10 kΩ ×1 and 15 kΩ ×1 (divider), 220 Ω ×1 (red), 100 Ω ×2 (green, blue)", ru: "10 кОм ×1 и 15 кОм ×1 (делитель), 220 Ом ×1 (красный), 100 Ом ×2 (зелёный, синий)", kk: "10 кОм ×1 және 15 кОм ×1 (бөлгіш), 220 Ом ×1 (қызыл), 100 Ом ×2 (жасыл, көк)" }, role: { en: "Divider and LED current limit", ru: "Делитель и ограничение тока светодиода", kk: "Бөлгіш және жарық диоды тогын шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 14, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "mq", component: "mq135-air", label: "MQ-135" },
    { id: "r_top", component: "resistor", label: "10 kΩ" },
    { id: "r_bot", component: "resistor", label: "15 kΩ" },
    { id: "oled", component: "oled-ssd1306", label: "OLED" },
    { id: "rgb", component: "rgb-led", label: "Status" },
    { id: "r_r", component: "resistor", label: "220 Ω" },
    { id: "r_g", component: "resistor", label: "100 Ω" },
    { id: "r_b", component: "resistor", label: "100 Ω" },
  ],
  connections: [
    { from: "board.5V", to: "mq.VCC", color: "red", note: { en: "the heater needs 5 V", ru: "нагревателю нужно 5 В", kk: "қыздырғышқа 5 В керек" } },
    { from: "mq.GND", to: "board.GND", color: "black" },
    { from: "mq.AO", to: "r_top.A", color: "orange", note: { en: "up to 5 V, never straight to the ESP32", ru: "до 5 В, никогда напрямую в ESP32", kk: "5 В-қа дейін, ешқашан ESP32-ге тікелей емес" } },
    { from: "r_top.B", to: "board.GPIO34", color: "orange", note: { en: "divided: 5 V → 3.0 V", ru: "после делителя: 5 В → 3,0 В", kk: "бөлгіштен кейін: 5 В → 3,0 В" } },
    { from: "r_bot.A", to: "r_top.B", color: "orange" },
    { from: "r_bot.B", to: "board.GND2", color: "black" },
    { from: "board.3V3", to: "oled.VCC", color: "red" },
    { from: "oled.GND", to: "board.GND3", color: "black" },
    { from: "board.GPIO21", to: "oled.SDA", color: "blue" },
    { from: "board.GPIO22", to: "oled.SCL", color: "yellow" },
    { from: "board.GPIO25", to: "r_r.A", color: "red" },
    { from: "r_r.B", to: "rgb.R", color: "red" },
    { from: "board.GPIO26", to: "r_g.A", color: "green" },
    { from: "r_g.B", to: "rgb.G", color: "green" },
    { from: "board.GPIO27", to: "r_b.A", color: "cyan" },
    { from: "r_b.B", to: "rgb.B", color: "cyan" },
    { from: "rgb.K", to: "board.GND", color: "black", note: { en: "longest leg", ru: "самая длинная ножка", kk: "ең ұзын аяғы" } },
  ],
  steps: [
    {
      title: { en: "Power the MQ-135 and let it burn in", ru: "Запитайте MQ-135 и дайте ему прожариться", kk: "MQ-135-ті қоректендіріп, алғашқы қыздыруды жасаңыз" },
      body: {
        en: "The MQ-135 has a small heater inside that must sit at 5 V, so wire VCC to the ESP32 5V pin and GND to GND. It draws about 160 mA and gets warm: that is normal. A brand-new sensor drifts for its first day, so before trusting it, leave it powered for 24 hours (any USB charger will do).",
        ru: "Внутри MQ-135 есть маленький нагреватель, которому нужно ровно 5 В, поэтому подключите VCC к пину 5V платы ESP32, а GND к GND. Он потребляет около 160 мА и заметно греется: это нормально. Новый датчик первые сутки «плывёт», поэтому, прежде чем доверять ему, оставьте его включённым на 24 часа (подойдёт любое USB-зарядное).",
        kk: "MQ-135 ішінде дәл 5 В қажет ететін кішкене қыздырғыш бар, сондықтан VCC-ді ESP32-нің 5V пиніне, GND-ді GND-ге қосыңыз. Ол шамамен 160 мА тұтынып, айтарлықтай қызады: бұл қалыпты жағдай. Жаңа датчиктің көрсеткіштері алғашқы тәулікте тұрақсыз болады, сондықтан оған сенбес бұрын оны 24 сағат қосулы қалдырыңыз (кез келген USB зарядтағыш жарайды).",
      },
      expect: { en: "The module's power LED is on and the sensor feels warm after a few minutes.", ru: "Светодиод питания модуля горит, а через несколько минут датчик становится тёплым.", kk: "Модульдің қуат жарық диоды жанады, ал бірнеше минуттан кейін датчик жылы болады." },
      mistake: { en: "Feeding the heater from 3V3 overloads that regulator and the sensor never reaches working temperature.", ru: "Если запитать нагреватель от 3V3, этот стабилизатор перегрузится, а датчик не выйдет на рабочую температуру.", kk: "Қыздырғышты 3V3-тен қоректендірсеңіз, ол стабилизатор шамадан тыс жүктеледі, ал датчик жұмыс температурасына жетпейді." },
    },
    {
      title: { en: "Divide the analog output down to 3 V", ru: "Понизьте аналоговый выход до 3 В делителем", kk: "Аналогтық шығысты бөлгішпен 3 В-қа дейін төмендетіңіз" },
      body: {
        en: "Because the sensor runs on 5 V, its AO pin can rise close to 5 V, and ESP32 inputs are not 5 V tolerant. Wire AO to a 10 kΩ resistor, the other end of that resistor to GPIO34, and a 15 kΩ resistor from GPIO34 to GND. The pin then sees 15 / 25 = 0.6 of the sensor voltage: 5 V becomes 3.0 V. GPIO34 is on ADC1, which keeps working while Wi-Fi is on.",
        ru: "Датчик питается от 5 В, поэтому его выход AO может подниматься почти до 5 В, а входы ESP32 не выдерживают 5 В. Подключите AO к резистору 10 кОм, второй конец резистора к GPIO34, а от GPIO34 к GND поставьте резистор 15 кОм. На пин попадёт 15 / 25 = 0,6 от напряжения датчика: 5 В превратятся в 3,0 В. GPIO34 относится к ADC1, который работает и при включённом Wi-Fi.",
        kk: "Датчик 5 В-пен қоректенеді, сондықтан оның AO шығысы 5 В-қа жуық көтерілуі мүмкін, ал ESP32 кірістері 5 В-қа шыдамайды. AO-ны 10 кОм резисторға, резистордың екінші ұшын GPIO34-ке қосып, GPIO34-тен GND-ге 15 кОм резистор қойыңыз. Пинге датчик кернеуінің 15 / 25 = 0,6 бөлігі түседі: 5 В 3,0 В болады. GPIO34 ADC1-ге жатады, ол Wi-Fi қосулы кезде де жұмыс істейді.",
      },
      expect: { en: "With a multimeter, GPIO34 reads about 0.6 × the voltage on AO.", ru: "Мультиметр на GPIO34 показывает примерно 0,6 × напряжение на AO.", kk: "Мультиметр GPIO34-те AO кернеуінің шамамен 0,6 бөлігін көрсетеді." },
      mistake: { en: "Swapping the two resistors gives 0.4 × instead, which is safe but wastes ADC range; leaving out the 15 kΩ puts the full 5 V on the pin.", ru: "Если поменять резисторы местами, получится 0,4 ×: безопасно, но теряется диапазон АЦП. Без резистора 15 кОм на пин попадут полные 5 В.", kk: "Резисторларды орындарымен ауыстырсаңыз, 0,4 × шығады: қауіпсіз, бірақ АЦТ диапазоны жоғалады. 15 кОм резисторсыз пинге толық 5 В түседі." },
    },
    {
      title: { en: "Add the OLED", ru: "Подключите OLED", kk: "OLED-ті қосыңыз" },
      body: {
        en: "OLED VCC goes to 3V3 and GND to GND. SDA goes to GPIO21 and SCL to GPIO22. Powering the display from 3.3 V keeps its I²C pull-ups at the ESP32's logic level.",
        ru: "VCC дисплея подключите к 3V3, GND к GND. SDA к GPIO21, SCL к GPIO22. Питание дисплея от 3,3 В держит подтяжки его шины I²C на логическом уровне ESP32.",
        kk: "Дисплейдің VCC-ін 3V3-ке, GND-ін GND-ге қосыңыз. SDA-ны GPIO21-ге, SCL-ды GPIO22-ге жалғаңыз. Дисплейді 3,3 В-тан қоректендіру оның I²C тартқыштарын ESP32 логикалық деңгейінде ұстайды.",
      },
      expect: { en: "After upload the screen shows \"Warming up\" with a countdown.", ru: "После загрузки на экране появится «Warming up» с обратным отсчётом.", kk: "Жүктегеннен кейін экранда кері санақпен «Warming up» жазуы шығады." },
      mistake: { en: "Some displays use address 0x3D; if the screen stays black, change OLED_ADDR.", ru: "У некоторых дисплеев адрес 0x3D: если экран остаётся чёрным, измените OLED_ADDR.", kk: "Кейбір дисплейлердің мекенжайы 0x3D: экран қара болып қалса, OLED_ADDR мәнін өзгертіңіз." },
    },
    {
      title: { en: "Wire the RGB status LED", ru: "Подключите RGB-светодиод состояния", kk: "RGB күй жарық диодын қосыңыз" },
      body: {
        en: "The longest leg of a common-cathode RGB LED is the cathode: connect it to GND. Red goes through 220 Ω to GPIO25, green through 100 Ω to GPIO26, and blue through 100 Ω to GPIO27. Green and blue get smaller resistors because their forward voltage is close to 3 V, which leaves little headroom at 3.3 V.",
        ru: "Самая длинная ножка RGB-светодиода с общим катодом — это катод: подключите её к GND. Красный через 220 Ом к GPIO25, зелёный через 100 Ом к GPIO26, синий через 100 Ом к GPIO27. Для зелёного и синего резисторы меньше, потому что их прямое напряжение около 3 В и при 3,3 В запаса мало.",
        kk: "Ортақ катодты RGB жарық диодының ең ұзын аяғы — катод: оны GND-ге қосыңыз. Қызылды 220 Ом арқылы GPIO25-ке, жасылды 100 Ом арқылы GPIO26-ға, көкті 100 Ом арқылы GPIO27-ге жалғаңыз. Жасыл мен көкке кішірек резистор қойылады, себебі олардың тура кернеуі шамамен 3 В, ал 3,3 В-та қор аз.",
      },
      expect: { en: "During warm-up the LED glows blue.", ru: "Во время прогрева светодиод светится синим.", kk: "Қызу кезінде жарық диоды көк түспен жанады." },
      mistake: { en: "A common-anode LED stays dark with this wiring; check the type before buying.", ru: "Светодиод с общим анодом при такой схеме не загорится: проверьте тип перед покупкой.", kk: "Ортақ анодты жарық диоды бұл схемада жанбайды: сатып алмас бұрын түрін тексеріңіз." },
    },
    {
      title: { en: "Upload and let it warm up in fresh air", ru: "Загрузите скетч и прогрейте датчик на свежем воздухе", kk: "Скетчті жүктеп, датчикті таза ауада қыздырыңыз" },
      body: {
        en: "Install \"Adafruit SSD1306\" and \"Adafruit GFX Library\", upload and open the Serial Monitor at 115200 baud. Keep the sensor in fresh air (open a window) for the 3-minute warm-up. At the end the sketch averages the output for 10 seconds and stores it as the clean-air baseline; every later reading is shown as a ratio to it.",
        ru: "Установите «Adafruit SSD1306» и «Adafruit GFX Library», загрузите скетч и откройте Serial Monitor на 115200 бод. На время 3-минутного прогрева держите датчик на свежем воздухе (откройте окно). В конце скетч 10 секунд усредняет выход и запоминает его как эталон чистого воздуха; все дальнейшие показания выводятся как отношение к нему.",
        kk: "«Adafruit SSD1306» және «Adafruit GFX Library» кітапханаларын орнатып, скетчті жүктеңіз де, Serial Monitor-ды 115200 бодта ашыңыз. 3 минуттық қызу кезінде датчикті таза ауада ұстаңыз (терезені ашыңыз). Соңында скетч шығысты 10 секунд орташалап, оны таза ауа эталоны ретінде сақтайды; кейінгі барлық көрсеткіштер соған қатынас ретінде шығады.",
      },
      expect: { en: "\"Baseline 0.84 V\" in the monitor, then the LED turns green with a ratio near 1.0.", ru: "В мониторе «Baseline 0.84 V», затем светодиод становится зелёным, а отношение около 1,0.", kk: "Мониторда «Baseline 0.84 V», содан кейін жарық диоды жасыл болып, қатынас 1,0-ге жуық болады." },
      mistake: { en: "Calibrating in a stuffy room makes the baseline too high, so the monitor always says GOOD.", ru: "Если калибровать в душной комнате, эталон будет завышен, и монитор всегда будет писать GOOD.", kk: "Тұмшаланған бөлмеде калибрлесеңіз, эталон тым жоғары болып, монитор әрқашан GOOD деп көрсетеді." },
    },
    {
      title: { en: "Test it and read the colours", ru: "Проверьте работу и разберитесь в цветах", kk: "Жұмысын тексеріп, түстерді түсініңіз" },
      body: {
        en: "Hold a felt-tip marker or a drop of hand sanitiser near the sensor: the ratio climbs within seconds, the LED goes yellow above 1.3× and red above 1.8×. The MQ-135 reacts to many gases at once (CO₂, alcohol, ammonia, smoke), so treat it as a trend indicator, not a calibrated ppm meter.",
        ru: "Поднесите к датчику фломастер или каплю санитайзера: отношение вырастет за несколько секунд, светодиод станет жёлтым выше 1,3× и красным выше 1,8×. MQ-135 реагирует сразу на много газов (CO₂, спирт, аммиак, дым), поэтому считайте его индикатором тенденции, а не откалиброванным измерителем ppm.",
        kk: "Датчикке фломастер немесе бір тамшы антисептик жақындатыңыз: қатынас бірнеше секундта өседі, 1,3×-тен жоғары болса жарық диоды сары, 1,8×-тен жоғары болса қызыл болады. MQ-135 бірден көп газға (CO₂, спирт, аммиак, түтін) сезімтал, сондықтан оны калибрленген ppm өлшегіш емес, үрдіс индикаторы деп есептеңіз.",
      },
      expect: { en: "The colour changes and returns to green a minute after the source is removed.", ru: "Цвет меняется и через минуту после удаления источника возвращается к зелёному.", kk: "Түс өзгереді, ал көзді алып тастағаннан кейін бір минутта жасылға қайтады." },
      mistake: { en: "Breathing straight on it also raises the reading (warm, humid air), which is not \"bad air\".", ru: "Если дышать прямо на датчик, показания тоже вырастут (тёплый влажный воздух), но это не «плохой воздух».", kk: "Датчикке тікелей дем шығарсаңыз да, көрсеткіш өседі (жылы, ылғал ауа), бірақ бұл «лас ауа» емес." },
    },
  ],
  code: [{
    filename: "air_quality_monitor.ino",
    language: "cpp",
    libraries: ["Adafruit SSD1306", "Adafruit GFX Library"],
    source: String.raw`#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

const int MQ_PIN = 34;        // AO through 10k/15k divider
const int LED_R_PIN = 25;
const int LED_G_PIN = 26;
const int LED_B_PIN = 27;
const int SDA_PIN = 21;
const int SCL_PIN = 22;
const uint8_t OLED_ADDR = 0x3C;

const float DIVIDER_GAIN = (10000.0 + 15000.0) / 15000.0;  // pin volts -> sensor volts
const unsigned long WARMUP_MS = 180000;    // 3 min after power-on
const unsigned long BASELINE_MS = 10000;   // average 10 s of clean air
const float MODERATE_RATIO = 1.3;
const float POOR_RATIO = 1.8;

Adafruit_SSD1306 display(128, 64, &Wire, -1);
float baselineV = 0;
unsigned long lastPrint = 0;

float readSensorVolts() {
  uint32_t sum = 0;
  for (int i = 0; i < 32; i++) sum += analogReadMilliVolts(MQ_PIN);
  return (sum / 32.0) / 1000.0 * DIVIDER_GAIN;
}

void setColor(bool r, bool g, bool b) {
  digitalWrite(LED_R_PIN, r);
  digitalWrite(LED_G_PIN, g);
  digitalWrite(LED_B_PIN, b);
}

void showScreen(const char* status, float volts, float ratio) {
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("AIR QUALITY");
  display.setTextSize(2);
  display.setCursor(0, 16);
  display.print(status);
  display.setTextSize(1);
  display.setCursor(0, 44);
  display.printf("Sensor %.2f V", volts);
  if (ratio > 0) {
    display.setCursor(0, 56);
    display.printf("Ratio  %.2fx", ratio);
  }
  display.display();
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_R_PIN, OUTPUT);
  pinMode(LED_G_PIN, OUTPUT);
  pinMode(LED_B_PIN, OUTPUT);
  setColor(false, false, true);              // blue = warming up
  // default ADC attenuation (11 dB) reads about 0-3.1 V, enough for the 3.0 V divider output

  Wire.begin(SDA_PIN, SCL_PIN);
  if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR)) {
    Serial.println("OLED not found, check wiring or OLED_ADDR");
  }

  Serial.printf("Warming up MQ-135: %lu s\n", WARMUP_MS / 1000);
  unsigned long lastBucket = 999;
  while (millis() < WARMUP_MS) {
    unsigned long left = (WARMUP_MS - millis()) / 1000;
    char buf[16];
    snprintf(buf, sizeof(buf), "%lus", left);
    showScreen("WARM UP", readSensorVolts(), 0);
    display.setTextSize(2);
    display.setCursor(80, 16);
    display.print(buf);
    display.display();
    if (left / 30 != lastBucket) {         // log every 30 s
      lastBucket = left / 30;
      Serial.printf("warm-up %lu s left\n", left);
    }
    delay(1000);
  }

  // clean-air baseline
  float sum = 0;
  int n = 0;
  unsigned long start = millis();
  while (millis() - start < BASELINE_MS) {
    sum += readSensorVolts();
    n++;
    delay(100);
  }
  baselineV = sum / n;
  Serial.printf("Baseline %.2f V\n", baselineV);
}

void loop() {
  float volts = readSensorVolts();
  float ratio = baselineV > 0.05 ? volts / baselineV : 0;
  const char* status;

  if (ratio < MODERATE_RATIO) {
    status = "GOOD";
    setColor(false, true, false);            // green
  } else if (ratio < POOR_RATIO) {
    status = "MODERATE";
    setColor(true, true, false);             // red + green = yellow
  } else {
    status = "POOR";
    setColor(true, false, false);            // red
  }
  showScreen(status, volts, ratio);

  if (millis() - lastPrint >= 2000) {
    lastPrint = millis();
    Serial.printf("AO=%.2f V ratio=%.2f %s\n", volts, ratio, status);
  }
  delay(250);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Reading is stuck near 0 V", ru: "Показания застыли около 0 В", kk: "Көрсеткіш 0 В маңында тұрып қалды" },
      cause: { en: "The wire goes to DO instead of AO, or the 10 kΩ is not in the same breadboard row as the AO wire.", ru: "Провод стоит на DO вместо AO, или резистор 10 кОм не в одном ряду макетки с проводом от AO.", kk: "Сым AO-ның орнына DO-ға қосылған немесе 10 кОм резистор AO сымымен макет тақтасының бір қатарында емес." },
      fix: { en: "Move the wire to AO and check the divider: AO → 10 kΩ → GPIO34 → 15 kΩ → GND.", ru: "Переставьте провод на AO и проверьте делитель: AO → 10 кОм → GPIO34 → 15 кОм → GND.", kk: "Сымды AO-ға ауыстырып, бөлгішті тексеріңіз: AO → 10 кОм → GPIO34 → 15 кОм → GND." },
    },
    {
      symptom: { en: "Values keep drifting up for the first hour", ru: "Показания весь первый час ползут вверх", kk: "Алғашқы бір сағат бойы көрсеткіштер жоғары қарай жылжиды" },
      cause: { en: "A new sensor has not been burned in, or the room temperature and humidity changed a lot.", ru: "Новый датчик не прошёл прожиг, или сильно изменились температура и влажность в комнате.", kk: "Жаңа датчик алғашқы қыздырудан өтпеген немесе бөлмедегі температура мен ылғалдылық қатты өзгерді." },
      fix: { en: "Run the sensor for 24 hours once, then press EN to re-take the baseline in fresh air.", ru: "Один раз оставьте датчик включённым на 24 часа, затем нажмите EN, чтобы заново снять эталон на свежем воздухе.", kk: "Датчикті бір рет 24 сағатқа қосулы қалдырып, кейін эталонды таза ауада қайта алу үшін EN батырмасын басыңыз." },
    },
    {
      symptom: { en: "The board resets at random", ru: "Плата случайно перезагружается", kk: "Плата кездейсоқ қайта жүктеледі" },
      cause: { en: "The 160 mA heater plus the ESP32 is too much for a thin USB cable or a laptop hub port.", ru: "Нагреватель на 160 мА вместе с ESP32 — слишком много для тонкого USB-кабеля или порта хаба.", kk: "160 мА қыздырғыш пен ESP32 бірге жіңішке USB кабелі немесе хаб порты үшін тым көп." },
      fix: { en: "Use a short data cable and a 1 A USB adapter or a direct computer port.", ru: "Используйте короткий кабель и USB-адаптер на 1 А или порт прямо на компьютере.", kk: "Қысқа кабель мен 1 А USB адаптерін немесе компьютердің тікелей портын пайдаланыңыз." },
    },
    {
      symptom: { en: "LED colours look wrong (green looks yellow, blue never lights)", ru: "Цвета светодиода неправильные (зелёный жёлтый, синий не горит)", kk: "Жарық диодының түстері дұрыс емес (жасыл сары болып көрінеді, көк жанбайды)" },
      cause: { en: "The R/G/B legs are in a different order on your LED, or it is common anode.", ru: "У вашего светодиода другой порядок ножек R/G/B или он с общим анодом.", kk: "Сіздің жарық диодыңызда R/G/B аяқтарының реті басқа немесе ол ортақ анодты." },
      fix: { en: "Test each leg through its resistor from 3V3 to find the colours, then swap the GPIO wires to match.", ru: "Проверьте каждую ножку через резистор от 3V3, чтобы найти цвета, и переставьте провода GPIO соответственно.", kk: "Түстерді табу үшін әр аяқты резистор арқылы 3V3-тен тексеріп, GPIO сымдарын сәйкесінше ауыстырыңыз." },
    },
  ],
  safety: [
    { en: "The sensor head gets hot (around 50 °C). Do not touch it and keep it away from paper and fabric.", ru: "Головка датчика сильно нагревается (около 50 °C). Не трогайте её и держите подальше от бумаги и ткани.", kk: "Датчиктің басы қатты қызады (шамамен 50 °C). Оны ұстамаңыз және қағаз бен матадан алыс ұстаңыз." },
    { en: "This is a learning project, not a certified gas or CO alarm. Do not rely on it for safety.", ru: "Это учебный проект, а не сертифицированный детектор газа или угарного газа. Не полагайтесь на него для безопасности.", kk: "Бұл оқу жобасы, сертификатталған газ немесе иіс газы детекторы емес. Қауіпсіздік үшін оған сенбеңіз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Warming up MQ-135: 180 s",
      "warm-up 179 s left",
      "warm-up 149 s left",
      "warm-up 119 s left",
      "warm-up 89 s left",
      "warm-up 59 s left",
      "warm-up 29 s left",
      "Baseline 0.84 V",
      "AO=0.85 V ratio=1.01 GOOD",
      "AO=0.86 V ratio=1.02 GOOD",
      "AO=1.27 V ratio=1.51 MODERATE",
      "AO=1.71 V ratio=2.04 POOR",
      "AO=0.98 V ratio=1.17 GOOD",
    ],
    leds: [{ label: "GOOD", color: "#43A047" }, { label: "MODERATE", color: "#FDD835" }, { label: "POOR", color: "#E53935" }, { label: "WARM UP", color: "#1E88E5" }],
  },
} satisfies GuideContent;
