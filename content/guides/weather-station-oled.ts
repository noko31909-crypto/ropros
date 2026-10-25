import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "weather-station-oled",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "sensors",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 16,
  xpReward: 220,
  title: {
    en: "OLED Weather Station with 3-Hour Pressure Trend",
    ru: "Метеостанция на OLED с трендом давления за 3 часа",
    kk: "Қысымның 3 сағаттық үрдісі бар OLED ауа райы станциясы",
  },
  summary: {
    en: "A BME280 measures temperature, humidity and pressure; a 0.96\" OLED shows them with an arrow that tells you whether the pressure rose or fell over the last three hours.",
    ru: "BME280 измеряет температуру, влажность и давление, а OLED 0,96\" показывает их и стрелку: выросло или упало давление за последние три часа.",
    kk: "BME280 температураны, ылғалдылықты және қысымды өлшейді, ал 0,96\" OLED оларды және соңғы үш сағатта қысым өскенін не түскенін көрсететін көрсеткіні шығарады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "bme280", qty: 1, spec: { en: "4-pin I²C board, chip ID 0x60 (not BMP280)", ru: "4-пиновая плата I²C, ID чипа 0x60 (не BMP280)", kk: "4 пинді I²C платасы, чип ID 0x60 (BMP280 емес)" }, role: { en: "Temperature, humidity, pressure", ru: "Температура, влажность, давление", kk: "Температура, ылғалдылық, қысым" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C address 0x3C", ru: "0,96\" 128×64, адрес I²C 0x3C", kk: "0,96\" 128×64, I²C мекенжайы 0x3C" }, role: { en: "Display", ru: "Дисплей", kk: "Дисплей" } },
    { component: "level-shifter", qty: 1, spec: { en: "4-channel BSS138, 3.3 V ↔ 5 V", ru: "4 канала BSS138, 3,3 В ↔ 5 В", kk: "4 арналы BSS138, 3,3 В ↔ 5 В" }, role: { en: "Keeps the 3.3 V sensor bus safe from the Uno's 5 V I²C", ru: "Защищает 3,3-вольтовую шину датчиков от 5-вольтового I²C Uno", kk: "3,3 В датчик шинасын Uno-ның 5 В I²C-інен қорғайды" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 16, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ls", component: "level-shifter", label: "3.3↔5 V shifter" },
    { id: "bme", component: "bme280", label: "BME280" },
    { id: "oled", component: "oled-ssd1306", label: "OLED 128×64" },
  ],
  connections: [
    { from: "board.5V", to: "ls.HV", color: "red", note: { en: "high-voltage side = Arduino", ru: "высоковольтная сторона = Arduino", kk: "жоғары кернеулі жақ = Arduino" } },
    { from: "board.3V3", to: "ls.LV", color: "orange", note: { en: "low-voltage side = sensors", ru: "низковольтная сторона = датчики", kk: "төмен кернеулі жақ = датчиктер" } },
    { from: "ls.GND", to: "board.GND", color: "black" },
    { from: "board.A4", to: "ls.HV1", color: "blue", note: { en: "SDA, 5 V side", ru: "SDA, сторона 5 В", kk: "SDA, 5 В жағы" } },
    { from: "board.A5", to: "ls.HV2", color: "yellow", note: { en: "SCL, 5 V side", ru: "SCL, сторона 5 В", kk: "SCL, 5 В жағы" } },
    { from: "ls.LV1", to: "bme.SDA", color: "blue" },
    { from: "ls.LV2", to: "bme.SCL", color: "yellow" },
    { from: "ls.LV1", to: "oled.SDA", color: "blue" },
    { from: "ls.LV2", to: "oled.SCL", color: "yellow" },
    { from: "board.3V3", to: "bme.VIN", color: "orange" },
    { from: "bme.GND", to: "board.GND2", color: "black" },
    { from: "board.3V3", to: "oled.VCC", color: "orange", note: { en: "3.3 V keeps the OLED's pull-ups at 3.3 V too", ru: "от 3,3 В подтяжки OLED тоже остаются на 3,3 В", kk: "3,3 В-тан қоректенсе, OLED тартқыштары да 3,3 В-та қалады" } },
    { from: "oled.GND", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Set up the level shifter", ru: "Установите преобразователь уровней", kk: "Деңгей түрлендіргішін орнатыңыз" },
      body: {
        en: "The BME280 and the OLED are 3.3 V I²C devices, while the Uno's I²C runs at 5 V. Put the BSS138 shifter on the breadboard and wire HV to the Uno's 5V, LV to 3V3 and GND to GND. Everything on the LV1…LV4 pins now lives at 3.3 V; everything on HV1…HV4 lives at 5 V.",
        ru: "BME280 и OLED работают с I²C на 3,3 В, а I²C у Uno работает на 5 В. Поставьте преобразователь BSS138 на макетку: HV к 5V Uno, LV к 3V3, GND к GND. Всё, что подключено к LV1…LV4, теперь живёт на 3,3 В, а всё на HV1…HV4 на 5 В.",
        kk: "BME280 мен OLED 3,3 В I²C құрылғылары, ал Uno-ның I²C-і 5 В-та жұмыс істейді. BSS138 түрлендіргішін макет тақтасына қойып, HV-ны Uno-ның 5V-іне, LV-ны 3V3-ке, GND-ні GND-ге қосыңыз. Енді LV1…LV4 пиндеріндегінің бәрі 3,3 В-та, ал HV1…HV4 пиндеріндегінің бәрі 5 В-та болады.",
      },
      expect: { en: "Shifter powered from both 5V and 3V3 with a shared GND.", ru: "Преобразователь получает и 5V, и 3V3, земля общая.", kk: "Түрлендіргіш 5V-тен де, 3V3-тен де қоректенеді, жері ортақ." },
      mistake: { en: "Swapping LV and HV puts 5 V pull-ups on the sensor bus.", ru: "Если перепутать LV и HV, на шину датчиков попадут подтяжки к 5 В.", kk: "LV мен HV-ны ауыстырып алсаңыз, датчик шинасына 5 В тартқыштары түседі." },
    },
    {
      title: { en: "Route the I²C bus through the shifter", ru: "Проведите шину I²C через преобразователь", kk: "I²C шинасын түрлендіргіш арқылы өткізіңіз" },
      body: {
        en: "On the Uno, SDA is A4 and SCL is A5. Wire A4 to HV1 and A5 to HV2. On the 3.3 V side, LV1 is now SDA and LV2 is SCL: run LV1 to the SDA pin of both modules and LV2 to both SCL pins. Two devices can share the bus because each has its own address (BME280 0x76/0x77, OLED 0x3C).",
        ru: "У Uno SDA это A4, а SCL это A5. Соедините A4 с HV1, а A5 с HV2. На стороне 3,3 В LV1 теперь SDA, а LV2 это SCL: проведите LV1 к пину SDA обоих модулей, а LV2 к обоим SCL. Два устройства уживаются на одной шине, потому что у каждого свой адрес (BME280 0x76/0x77, OLED 0x3C).",
        kk: "Uno-да SDA деген A4, ал SCL деген A5. A4-ті HV1-ге, A5-ті HV2-ге қосыңыз. 3,3 В жағында енді LV1 SDA, ал LV2 SCL болады: LV1-ді екі модульдің SDA пиніне, LV2-ні екеуінің SCL пиніне тартыңыз. Әр құрылғының өз мекенжайы бар (BME280 0x76/0x77, OLED 0x3C), сондықтан екеуі бір шинада жұмыс істей алады.",
      },
      expect: { en: "Channel 1 carries SDA and channel 2 carries SCL on both sides.", ru: "Канал 1 несёт SDA, канал 2 несёт SCL с обеих сторон.", kk: "Екі жақта да 1-арна SDA-ны, 2-арна SCL-ді өткізеді." },
      mistake: { en: "Crossing channels (A4 → HV1 but LV2 → SDA) makes both devices disappear from the bus.", ru: "Если перепутать каналы (A4 → HV1, но LV2 → SDA), оба устройства пропадут с шины.", kk: "Арналарды шатастырсаңыз (A4 → HV1, бірақ LV2 → SDA), екі құрылғы да шинадан жоғалады." },
    },
    {
      title: { en: "Power both modules from 3V3", ru: "Запитайте оба модуля от 3V3", kk: "Екі модульді де 3V3-тен қоректендіріңіз" },
      body: {
        en: "Connect BME280 VIN and OLED VCC to the Uno's 3V3 pin and their GND pins to the Uno's GND pins. Powering them from 3.3 V matters: many OLED boards tie their own I²C pull-up resistors to VCC, so feeding them 5 V would put 5 V back on the sensor side. Together they draw about 21 mA, well inside the 50 mA the 3V3 pin can give.",
        ru: "Подключите VIN BME280 и VCC OLED к пину 3V3 Uno, а их GND к пинам GND Uno. Питание 3,3 В здесь важно: у многих плат OLED подтягивающие резисторы I²C подключены к VCC, и при 5 В на стороне датчиков снова оказалось бы 5 В. Вместе они берут около 21 мА, это намного меньше 50 мА, которые выдаёт пин 3V3.",
        kk: "BME280-нің VIN-ін және OLED-тің VCC-ін Uno-ның 3V3 пиніне, ал олардың GND-ін Uno-ның GND пиндеріне қосыңыз. 3,3 В қуат мұнда маңызды: көп OLED платаларында I²C тартқыш резисторлары VCC-ге қосылған, сондықтан 5 В берсеңіз, датчик жағына қайтадан 5 В түседі. Екеуі бірге шамамен 21 мА тұтынады, бұл 3V3 пині бере алатын 50 мА-дан әлдеқайда аз.",
      },
      expect: { en: "Both modules share 3V3 and GND; the OLED stays dark until code runs.", ru: "Оба модуля на 3V3 и общей земле; OLED тёмный, пока не запущен код.", kk: "Екі модуль де 3V3 пен ортақ жерге қосылған; код іске қосылмайынша OLED қараңғы." },
      mistake: { en: "Plugging the BME280 into the shifter's HV side or into 5V defeats the whole level-shifting idea.", ru: "Если включить BME280 на сторону HV или в 5V, вся идея согласования уровней теряется.", kk: "BME280-ді HV жағына немесе 5V-ке қоссаңыз, деңгейлерді келістірудің бүкіл мәні жойылады." },
    },
    {
      title: { en: "Install the libraries and upload", ru: "Установите библиотеки и загрузите скетч", kk: "Кітапханаларды орнатып, скетчті жүктеңіз" },
      body: {
        en: "In Library Manager install \"Adafruit BME280 Library\", \"Adafruit SSD1306\" and \"Adafruit GFX Library\" (accept the Adafruit Unified Sensor and BusIO dependencies). Upload the sketch and open the Serial Monitor at 9600 baud. The code tries the BME280 at 0x76 and then 0x77, and uses forced mode so the sensor sleeps between readings and does not heat itself.",
        ru: "В менеджере библиотек установите «Adafruit BME280 Library», «Adafruit SSD1306» и «Adafruit GFX Library» (согласитесь на зависимости Adafruit Unified Sensor и BusIO). Загрузите скетч и откройте Serial Monitor на 9600 бод. Код ищет BME280 по адресу 0x76, затем 0x77 и работает в режиме forced: датчик спит между измерениями и не нагревает сам себя.",
        kk: "Кітапханалар менеджерінен «Adafruit BME280 Library», «Adafruit SSD1306» және «Adafruit GFX Library» орнатыңыз (Adafruit Unified Sensor және BusIO тәуелділіктеріне келісіңіз). Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Код BME280-ді алдымен 0x76, содан кейін 0x77 мекенжайынан іздейді және forced режимінде жұмыс істейді: датчик өлшемдер арасында ұйықтап, өзін-өзі қыздырмайды.",
      },
      expect: { en: "\"BME280 OK\" in the Serial Monitor and live values on the OLED every 5 s.", ru: "«BME280 OK» в Serial Monitor и живые значения на OLED каждые 5 с.", kk: "Serial Monitor-да «BME280 OK», ал OLED-те әр 5 с сайын жаңа мәндер." },
      mistake: { en: "\"BME280 not found\" with correct wiring usually means the board is a BMP280 (no humidity, chip ID 0x58).", ru: "«BME280 not found» при правильной схеме обычно значит, что у вас BMP280 (без влажности, ID чипа 0x58).", kk: "Сызба дұрыс болса да «BME280 not found» шықса, көбіне бұл BMP280 (ылғалдылықсыз, чип ID 0x58) екенін білдіреді." },
    },
    {
      title: { en: "Check the readings", ru: "Проверьте показания", kk: "Көрсеткіштерді тексеріңіз" },
      body: {
        en: "Breathe gently on the sensor: humidity should jump and fall back within a minute. Compare the pressure with a local weather report: the BME280 shows station pressure, so it reads about 12 hPa lower per 100 m of altitude than the sea-level value on the news. That is expected; the trend works the same either way.",
        ru: "Подышите на датчик: влажность должна подскочить и вернуться за минуту. Сравните давление с местной сводкой погоды: BME280 показывает давление на месте установки, поэтому на каждые 100 м высоты оно примерно на 12 гПа ниже значения «на уровне моря» из прогноза. Это нормально, тренд работает одинаково.",
        kk: "Датчикке ақырын дем шығарыңыз: ылғалдылық күрт көтеріліп, бір минут ішінде қайта түсуі керек. Қысымды жергілікті ауа райы болжамымен салыстырыңыз: BME280 орнатылған жердегі қысымды көрсетеді, сондықтан әр 100 м биіктікке ол болжамдағы «теңіз деңгейіндегі» мәннен шамамен 12 гПа төмен болады. Бұл қалыпты, үрдіс бәрібір бірдей есептеледі.",
      },
      expect: { en: "Temperature within 1 °C of a room thermometer, humidity reacting to breath.", ru: "Температура в пределах 1 °C от комнатного термометра, влажность реагирует на дыхание.", kk: "Температура бөлме термометрінен 1 °C-тан аспай ерекшеленеді, ылғалдылық демге әсер етеді." },
      mistake: { en: "Placing the BME280 right next to the Uno's regulator makes it read 1–2 °C too warm.", ru: "Если BME280 стоит рядом со стабилизатором Uno, он завышает температуру на 1–2 °C.", kk: "BME280 Uno-ның стабилизаторына жақын тұрса, температураны 1–2 °C жоғары көрсетеді." },
    },
    {
      title: { en: "Let the trend arrow fill in", ru: "Дождитесь стрелки тренда", kk: "Үрдіс көрсеткісін күтіңіз" },
      body: {
        en: "Every 10 minutes the sketch stores the pressure in a 19-slot ring buffer. Once it holds 3 hours of data it compares the newest and the oldest sample: +1.0 hPa or more shows an up arrow (improving weather), −1.0 hPa or more shows a down arrow (a front is coming), anything in between shows a sideways arrow. Until then the screen says \"collecting\".",
        ru: "Каждые 10 минут скетч записывает давление в кольцевой буфер на 19 ячеек. Когда в нём набирается 3 часа данных, он сравнивает самое новое и самое старое значение: рост на 1,0 гПа и больше даёт стрелку вверх (погода улучшается), падение на 1,0 гПа и больше даёт стрелку вниз (идёт фронт), всё между ними показывает стрелку вбок. До этого на экране написано «collecting».",
        kk: "Скетч әр 10 минут сайын қысымды 19 ұяшықты сақиналы буферге жазады. Онда 3 сағаттық дерек жиналғанда, ол ең жаңа және ең ескі мәнді салыстырады: 1,0 гПа не одан көп өссе, жоғары көрсеткі шығады (ауа райы жақсарады), 1,0 гПа не одан көп түссе, төмен көрсеткі шығады (фронт жақындап келеді), ал аралығындағы өзгеріс бүйірге қараған көрсеткіні береді. Оған дейін экранда «collecting» деп жазылады.",
      },
      expect: { en: "After 3 hours an arrow replaces \"collecting\" and updates every 10 minutes.", ru: "Через 3 часа вместо «collecting» появляется стрелка и обновляется каждые 10 минут.", kk: "3 сағаттан кейін «collecting» орнына көрсеткі шығып, әр 10 минут сайын жаңарады." },
      mistake: { en: "Unplugging the Uno clears the history; the 3-hour wait starts again.", ru: "Если отключить Uno, история стирается и ожидание в 3 часа начинается заново.", kk: "Uno-ны ажыратсаңыз, тарих өшіп, 3 сағаттық күту қайта басталады." },
    },
  ],
  code: [{
    filename: "weather_station.ino",
    language: "cpp",
    libraries: ["Adafruit BME280 Library", "Adafruit SSD1306", "Adafruit GFX Library", "Adafruit Unified Sensor"],
    source: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_BME280.h>

// I2C: SDA = A4, SCL = A5, both through the level shifter to the 3.3 V modules
const uint8_t OLED_ADDR = 0x3C;
const unsigned long READ_EVERY_MS = 5000UL;      // refresh the screen every 5 s
const unsigned long SAMPLE_EVERY_MS = 600000UL;  // store the pressure every 10 min
const uint8_t HISTORY_LEN = 19;                  // 19 samples = 18 x 10 min = 3 h
const float TREND_HPA = 1.0;                     // change over 3 h that counts as rising / falling

enum Trend { FALLING, STEADY, RISING, COLLECTING };

Adafruit_SSD1306 display(128, 64, &Wire, -1);
Adafruit_BME280 bme;

float history[HISTORY_LEN];
uint8_t stored = 0, head = 0;
unsigned long lastRead = 0, lastSample = 0;

void addSample(float hPa) {
  history[head] = hPa;
  head = (head + 1) % HISTORY_LEN;
  if (stored < HISTORY_LEN) stored++;
}

Trend pressureTrend() {
  if (stored < HISTORY_LEN) return COLLECTING;
  float newest = history[(head + HISTORY_LEN - 1) % HISTORY_LEN];
  float oldest = history[head];                  // buffer full: head points at the oldest sample
  float diff = newest - oldest;
  if (diff >= TREND_HPA) return RISING;
  if (diff <= -TREND_HPA) return FALLING;
  return STEADY;
}

const char* trendName(Trend t) {
  switch (t) {
    case RISING: return "rising";
    case FALLING: return "falling";
    case STEADY: return "steady";
    default: return "collecting";
  }
}

void drawArrow(Trend t) {
  const int x = 108, y = 46;
  if (t == RISING) display.fillTriangle(x, y + 14, x + 16, y + 14, x + 8, y, SSD1306_WHITE);
  else if (t == FALLING) display.fillTriangle(x, y, x + 16, y, x + 8, y + 14, SSD1306_WHITE);
  else if (t == STEADY) display.fillTriangle(x, y, x, y + 14, x + 16, y + 7, SSD1306_WHITE);
}

void halt(const __FlashStringHelper* msg) {
  Serial.println(msg);
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print(msg);
  display.display();
  while (true) {}
}

void setup() {
  Serial.begin(9600);
  Wire.begin();
  if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR)) {
    Serial.println(F("OLED not found at 0x3C"));
    while (true) {}
  }
  display.cp437(true);
  display.setTextColor(SSD1306_WHITE);

  bool found = bme.begin(0x76);
  if (!found) found = bme.begin(0x77);
  if (!found) halt(F("BME280 not found"));
  Serial.println(F("BME280 OK"));

  // Forced mode: one measurement per request, the sensor sleeps in between and does not heat itself
  bme.setSampling(Adafruit_BME280::MODE_FORCED,
                  Adafruit_BME280::SAMPLING_X1,   // temperature
                  Adafruit_BME280::SAMPLING_X1,   // pressure
                  Adafruit_BME280::SAMPLING_X1,   // humidity
                  Adafruit_BME280::FILTER_OFF);

  bme.takeForcedMeasurement();
  addSample(bme.readPressure() / 100.0F);
  lastSample = millis();
  lastRead = millis() - READ_EVERY_MS;           // draw the first screen right away
}

void loop() {
  unsigned long now = millis();
  if (now - lastRead < READ_EVERY_MS) return;
  lastRead = now;

  bme.takeForcedMeasurement();
  float t = bme.readTemperature();
  float h = bme.readHumidity();
  float p = bme.readPressure() / 100.0F;         // Pa -> hPa
  if (isnan(t) || isnan(h) || isnan(p)) {
    Serial.println(F("read error"));
    return;
  }

  if (now - lastSample >= SAMPLE_EVERY_MS) {
    lastSample = now;
    addSample(p);
  }
  Trend tr = pressureTrend();

  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0, 0);
  display.print(t, 1);
  display.write(248);                            // degree sign in the CP437 font
  display.print('C');
  display.setTextSize(1);
  display.setCursor(0, 24);
  display.print(F("Humidity  "));
  display.print(h, 0);
  display.print('%');
  display.setCursor(0, 36);
  display.print(F("Pressure  "));
  display.print(p, 1);
  display.print(F(" hPa"));
  display.setCursor(0, 50);
  display.print(F("3h: "));
  display.print(trendName(tr));
  drawArrow(tr);
  display.display();

  Serial.print(F("T="));
  Serial.print(t, 1);
  Serial.print(F("C H="));
  Serial.print(h, 0);
  Serial.print(F("% P="));
  Serial.print(p, 1);
  Serial.print(F("hPa trend="));
  Serial.println(trendName(tr));
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Serial Monitor prints \"BME280 not found\"", ru: "Serial Monitor пишет «BME280 not found»", kk: "Serial Monitor «BME280 not found» деп жазады" },
      cause: { en: "SDA/SCL crossed between the shifter channels, LV/HV swapped, or the board is actually a BMP280 (chip ID 0x58), which the BME280 library rejects.", ru: "SDA/SCL перепутаны между каналами преобразователя, LV/HV поменяны местами, или на самом деле это BMP280 (ID 0x58), который библиотека BME280 не принимает.", kk: "SDA/SCL түрлендіргіш арналары арасында шатасқан, LV/HV ауысып кеткен немесе бұл шын мәнінде BMP280 (ID 0x58), оны BME280 кітапханасы қабылдамайды." },
      fix: { en: "Check A4 → HV1 → LV1 → SDA and A5 → HV2 → LV2 → SCL. Run an I²C scanner sketch; if the sensor answers but the library refuses it, buy a real BME280 (it is square, the BMP280 is usually rectangular).", ru: "Проверьте цепочки A4 → HV1 → LV1 → SDA и A5 → HV2 → LV2 → SCL. Запустите скетч I²C-сканера: если датчик отвечает, но библиотека его не принимает, купите настоящий BME280 (у него квадратный корпус, у BMP280 обычно прямоугольный).", kk: "A4 → HV1 → LV1 → SDA және A5 → HV2 → LV2 → SCL тізбектерін тексеріңіз. I²C сканер скетчін іске қосыңыз: датчик жауап берсе, бірақ кітапхана қабылдамаса, нағыз BME280 сатып алыңыз (оның корпусы шаршы, BMP280-дікі әдетте тікбұрышты)." },
    },
    {
      symptom: { en: "OLED stays black but the Serial Monitor shows values", ru: "OLED чёрный, хотя Serial Monitor показывает значения", kk: "Serial Monitor мәндерді көрсетеді, бірақ OLED қараңғы" },
      cause: { en: "The display uses address 0x3D, or its VCC/GND pins are in a different order than on your diagram (some boards put GND first, others VCC first).", ru: "Дисплей на адресе 0x3D, или у него другой порядок VCC/GND (у одних плат первым идёт GND, у других VCC).", kk: "Дисплей 0x3D мекенжайында немесе оның VCC/GND реті басқаша (кейбір платаларда алдымен GND, кейбірінде VCC тұрады)." },
      fix: { en: "Read the labels printed on the OLED and rewire by name, not by position. If a scanner finds 0x3D, change OLED_ADDR in the sketch.", ru: "Читайте подписи на плате OLED и подключайте по названиям, а не по положению. Если сканер нашёл 0x3D, поменяйте OLED_ADDR в скетче.", kk: "OLED платасындағы жазуларды оқып, орналасуы бойынша емес, атауы бойынша қосыңыз. Сканер 0x3D тапса, скетчтегі OLED_ADDR мәнін өзгертіңіз." },
    },
    {
      symptom: { en: "Temperature reads 2–3 °C too high", ru: "Температура завышена на 2–3 °C", kk: "Температура 2–3 °C жоғары көрсетіледі" },
      cause: { en: "Heat from the Uno, the OLED or your hand reaches the sensor; on a breadboard they sit only a few centimetres apart.", ru: "Тепло от Uno, OLED или руки доходит до датчика: на макетке они стоят в паре сантиметров друг от друга.", kk: "Uno-дан, OLED-тен немесе қолдан шыққан жылу датчикке жетеді: макет тақтасында олар бір-екі сантиметр ғана қашықтықта тұр." },
      fix: { en: "Move the BME280 away on 10–15 cm wires and keep forced mode in the sketch. If a small offset remains, subtract it in code after comparing with a trusted thermometer.", ru: "Вынесите BME280 на проводах 10–15 см и оставьте в скетче режим forced. Если небольшое смещение останется, вычтите его в коде, сверившись с надёжным термометром.", kk: "BME280-ді 10–15 см сымдармен алысқа шығарып, скетчте forced режимін қалдырыңыз. Шағын ауытқу қалса, сенімді термометрмен салыстырып, оны кодта шегеріңіз." },
    },
    {
      symptom: { en: "The arrow never appears", ru: "Стрелка так и не появляется", kk: "Көрсеткі ешқашан шықпайды" },
      cause: { en: "The board was reset or lost power less than 3 hours ago, so the history buffer is not full yet.", ru: "Плата перезагрузилась или теряла питание меньше 3 часов назад, буфер истории ещё не заполнен.", kk: "Плата 3 сағаттан аз уақыт бұрын қайта жүктелген немесе қуатсыз қалған, тарих буфері әлі толмаған." },
      fix: { en: "Power it from a stable USB charger and leave it running. Do not open the Serial Monitor later on, since that resets the Uno.", ru: "Питайте её от стабильного USB-зарядника и не выключайте. Не открывайте потом Serial Monitor: это перезагружает Uno.", kk: "Оны тұрақты USB зарядтағыштан қоректендіріп, өшірмеңіз. Кейін Serial Monitor-ды ашпаңыз: бұл Uno-ны қайта жүктейді." },
    },
  ],
  safety: [
    { en: "Keep the shifter's LV pin on 3V3 and HV on 5V; reversing them exposes the 3.3 V sensors to 5 V.", ru: "Держите LV преобразователя на 3V3, а HV на 5V: если их перепутать, 3,3-вольтовые датчики получат 5 В.", kk: "Түрлендіргіштің LV пинін 3V3-те, HV пинін 5V-те ұстаңыз: оларды ауыстырсаңыз, 3,3 вольтты датчиктерге 5 В түседі." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "BME280 OK",
      "T=22.8C H=41% P=1013.2hPa trend=collecting",
      "T=22.8C H=41% P=1013.2hPa trend=collecting",
      "T=22.9C H=42% P=1013.1hPa trend=collecting",
      "T=22.6C H=44% P=1011.9hPa trend=falling",
      "T=22.4C H=47% P=1011.6hPa trend=falling",
    ],
    leds: [],
  },
} satisfies GuideContent;
