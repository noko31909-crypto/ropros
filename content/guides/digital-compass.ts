import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "digital-compass",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "tools",
  robotics: false,
  difficulty: "intermediate",
  hours: 2,
  costUsd: 10,
  xpReward: 220,
  title: {
    en: "Digital Compass with OLED Needle",
    ru: "Цифровой компас со стрелкой на OLED",
    kk: "OLED тілі бар цифрлық компас",
  },
  summary: {
    en: "A GY-271 magnetometer and an OLED make a pocket compass: a live needle that always points north, the heading in degrees, and a 20-second calibration that removes the offsets of your board.",
    ru: "Магнитометр GY-271 и OLED превращаются в карманный компас: живая стрелка всегда указывает на север, курс в градусах и 20-секундная калибровка, которая убирает смещения вашей платы.",
    kk: "GY-271 магнитометрі мен OLED қалта компасына айналады: үнемі солтүстікті көрсететін тірі тіл, градуспен бағыт және платаңыздың ығысуларын жоятын 20 секундтық калибрлеу.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V", ru: "ATmega328P, 5 В", kk: "ATmega328P, 5 В" }, role: { en: "Reads the sensor, draws the needle", ru: "Читает датчик, рисует стрелку", kk: "Датчикті оқиды, тілді салады" } },
    { component: "gy-271-compass", qty: 1, spec: { en: "GY-271 with QMC5883L (0x0D) or HMC5883L (0x1E)", ru: "GY-271 с QMC5883L (0x0D) или HMC5883L (0x1E)", kk: "QMC5883L (0x0D) немесе HMC5883L (0x1E) бар GY-271" }, role: { en: "3-axis magnetometer", ru: "Трёхосевой магнитометр", kk: "Үш осьті магнитометр" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C 0x3C", ru: "0,96\" 128×64, I²C 0x3C", kk: "0,96\" 128×64, I²C 0x3C" }, role: { en: "Compass rose and heading", ru: "Роза ветров и курс", kk: "Компас раушаны және бағыт" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Start calibration", ru: "Запуск калибровки", kk: "Калибрлеуді бастау" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 12, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "mag", component: "gy-271-compass", label: "GY-271" },
    { id: "oled", component: "oled-ssd1306", label: "OLED" },
    { id: "btn", component: "push-button", label: "Calibrate" },
  ],
  connections: [
    { from: "board.5V", to: "mag.VCC", color: "red", note: { en: "onboard 3.3 V regulator", ru: "встроенный стабилизатор 3,3 В", kk: "кірістірілген 3,3 В реттегіш" } },
    { from: "mag.GND", to: "board.GND", color: "black" },
    { from: "mag.SDA", to: "board.A4", color: "blue" },
    { from: "mag.SCL", to: "board.A5", color: "yellow" },
    { from: "board.5V", to: "oled.VCC", color: "red" },
    { from: "oled.GND", to: "board.GND2", color: "black" },
    { from: "oled.SDA", to: "board.A4", color: "blue", note: { en: "same I²C bus as the compass", ru: "та же шина I²C, что у компаса", kk: "компаспен бірдей I²C шинасы" } },
    { from: "oled.SCL", to: "board.A5", color: "yellow" },
    { from: "board.D4", to: "btn.1", color: "green", note: { en: "internal pull-up", ru: "внутренняя подтяжка", kk: "ішкі тарту" } },
    { from: "btn.2", to: "board.GND", color: "black" },
  ],
  steps: [
    {
      title: { en: "Find out which chip you have", ru: "Узнайте, какой у вас чип", kk: "Қай чип екенін анықтаңыз" },
      body: {
        en: "GY-271 boards are sold with two different chips under the same name. Older ones carry Honeywell's HMC5883L (marking \"L883\", I²C address 0x1E); almost all boards made since about 2017 carry the QST QMC5883L (marking \"DA 5883\", address 0x0D). They have different registers, so an HMC5883L library reads zeros from a QMC board. This sketch talks to the registers directly and detects the chip itself. If an I²C scanner shows 0x2C instead, you have the newer QMC5883P, which this sketch does not support.",
        ru: "Платы GY-271 продаются под одним названием с двумя разными чипами. На старых стоит HMC5883L от Honeywell (маркировка «L883», адрес I²C 0x1E), почти на всех платах примерно с 2017 года стоит QMC5883L от QST (маркировка «DA 5883», адрес 0x0D). Регистры у них разные, поэтому библиотека для HMC5883L читает с платы QMC нули. Этот скетч работает с регистрами напрямую и сам определяет чип. Если I²C-сканер показывает 0x2C, у вас более новый QMC5883P, который скетч не поддерживает.",
        kk: "GY-271 платалары бір атаумен екі түрлі чиппен сатылады. Ескілерінде Honeywell-дің HMC5883L чипі тұр («L883» белгісі, I²C мекенжайы 0x1E), шамамен 2017 жылдан бергі платалардың барлығында дерлік QST-тің QMC5883L чипі («DA 5883» белгісі, мекенжайы 0x0D). Олардың регистрлері әртүрлі, сондықтан HMC5883L кітапханасы QMC платасынан нөлдерді оқиды. Бұл скетч регистрлермен тікелей жұмыс істеп, чипті өзі анықтайды. I²C сканері 0x2C көрсетсе, сізде жаңарақ QMC5883P бар, оны бұл скетч қолдамайды.",
      },
      expect: { en: "You know your chip marking and address.", ru: "Вы знаете маркировку и адрес своего чипа.", kk: "Чипіңіздің белгісі мен мекенжайын білесіз." },
      mistake: { en: "Trusting the product title: listings still say HMC5883L for boards that carry the QMC5883L.", ru: "Верить названию товара: в объявлениях до сих пор пишут HMC5883L для плат с QMC5883L.", kk: "Тауар атауына сену: хабарландыруларда QMC5883L бар платаларға әлі күнге HMC5883L деп жазады." },
    },
    {
      title: { en: "Wire the I²C bus", ru: "Соберите шину I²C", kk: "I²C шинасын құрастырыңыз" },
      body: {
        en: "The compass and the OLED share the bus: both SDA pins to A4, both SCL pins to A5, both VCC to 5V and both GND to GND. The GY-271 has its own 3.3 V regulator, so 5V on VCC is fine. Leave DRDY unconnected: the sketch polls the sensor over I²C.",
        ru: "Компас и OLED делят шину: оба SDA на A4, оба SCL на A5, оба VCC на 5V и оба GND на GND. У GY-271 свой стабилизатор 3,3 В, поэтому 5V на VCC допустимо. DRDY оставьте неподключённым: скетч опрашивает датчик по I²C.",
        kk: "Компас пен OLED шинаны бөліседі: екі SDA да A4-ке, екі SCL да A5-ке, екі VCC да 5V-ке және екі GND да GND-ге. GY-271-де өз 3,3 В реттегіші бар, сондықтан VCC-ге 5V беруге болады. DRDY-ді қоспай қалдырыңыз: скетч датчикті I²C арқылы сұрайды.",
      },
      expect: { en: "Eight bus wires plus the button between D4 and GND.", ru: "Восемь проводов шины плюс кнопка между D4 и GND.", kk: "Шинаның сегіз сымы және D4 пен GND арасындағы батырма." },
      mistake: { en: "Placing the compass right next to the USB cable or a screw: steel and current bend the field and the heading drifts.", ru: "Компас вплотную к USB-кабелю или винту: сталь и ток искажают поле, и курс уплывает.", kk: "Компасты USB кабеліне немесе бұрандаға тым жақын қою: болат пен ток өрісті бұрмалап, бағыт ығысады." },
    },
    {
      title: { en: "Upload and check the chip", ru: "Загрузите скетч и проверьте чип", kk: "Скетчті жүктеп, чипті тексеріңіз" },
      body: {
        en: "Install \"Adafruit SSD1306\" and \"Adafruit GFX Library\" (the compass needs no library) and upload. The Serial Monitor at 9600 baud prints which chip was found. Before calibration the heading is only roughly right, and the screen says so.",
        ru: "Установите «Adafruit SSD1306» и «Adafruit GFX Library» (для компаса библиотека не нужна) и загрузите скетч. Serial Monitor на 9600 бод напишет, какой чип найден. До калибровки курс лишь приблизительный, и экран об этом сообщает.",
        kk: "«Adafruit SSD1306» және «Adafruit GFX Library» орнатыңыз (компасқа кітапхана қажет емес) да, скетчті жүктеңіз. 9600 бодтағы Serial Monitor қай чип табылғанын жазады. Калибрлеуге дейін бағыт тек шамамен дұрыс, экран бұл туралы хабарлайды.",
      },
      expect: { en: "\"found QMC5883L at 0x0D\" (or HMC5883L at 0x1E) and a needle on the screen.", ru: "«found QMC5883L at 0x0D» (или HMC5883L at 0x1E) и стрелка на экране.", kk: "«found QMC5883L at 0x0D» (немесе HMC5883L at 0x1E) және экрандағы тіл." },
      mistake: { en: "\"no compass found\" usually means SDA/SCL swapped on the GY-271 only, while the OLED works.", ru: "«no compass found» обычно значит, что SDA/SCL перепутаны только на GY-271, а OLED при этом работает.", kk: "«no compass found» әдетте OLED жұмыс істеп тұрғанда тек GY-271-де SDA/SCL ауысқанын білдіреді." },
    },
    {
      title: { en: "Calibrate", ru: "Откалибруйте", kk: "Калибрлеңіз" },
      body: {
        en: "Lay the breadboard flat, away from metal, and press the button. For 20 seconds slowly turn the whole board around two full circles while keeping it level. The sketch records the minimum and maximum of the X and Y fields, then uses the centre as the offset (hard-iron) and the ratio as a scale (simple soft-iron). The result is saved in EEPROM, so you only repeat it after moving the compass into a new case.",
        ru: "Положите макетку ровно, подальше от металла, и нажмите кнопку. В течение 20 секунд медленно поверните всю плату на два полных круга, держа её горизонтально. Скетч запоминает минимум и максимум поля по X и Y, затем берёт центр как смещение (hard-iron), а отношение как масштаб (простой soft-iron). Результат сохраняется в EEPROM, поэтому повторять калибровку нужно только после переноса компаса в новый корпус.",
        kk: "Макет тақтасын металдан алыс, тегіс жерге қойып, батырманы басыңыз. 20 секунд ішінде бүкіл платаны көлденең ұстап, баяу екі толық айналдырыңыз. Скетч X және Y бойынша өрістің минимумы мен максимумын жазып алады, содан кейін ортасын ығысу (hard-iron), ал қатынасын масштаб (қарапайым soft-iron) ретінде алады. Нәтиже EEPROM-ға сақталады, сондықтан компасты жаңа корпусқа ауыстырғанда ғана калибрлеуді қайталайсыз.",
      },
      expect: { en: "\"cal saved\" with min/max values a few hundred to a few thousand apart.", ru: "«cal saved» с минимумами и максимумами, отличающимися на сотни или тысячи единиц.", kk: "Минимумы мен максимумы жүздеген не мыңдаған бірлікке өзгеше «cal saved» хабары." },
      mistake: { en: "Tilting the board while turning it mixes in the vertical field and spoils the calibration.", ru: "Наклон платы во время вращения подмешивает вертикальную составляющую поля и портит калибровку.", kk: "Айналдыру кезінде платаны еңкейту өрістің тік құраушысын араластырып, калибрлеуді бұзады." },
    },
    {
      title: { en: "Set declination and check against a real compass", ru: "Задайте склонение и сверьте с настоящим компасом", kk: "Ауытқуды орнатып, нағыз компаспен салыстырыңыз" },
      body: {
        en: "A magnetic compass points to magnetic north, which differs from true north by your local declination. Look up yours with the NOAA Magnetic Field Calculator and enter it as DECLINATION_DEG (east positive). Point the X arrow on the GY-271 at a known landmark and compare with a phone or a needle compass. If turning clockwise makes the number go down, set FLIP_Y = true.",
        ru: "Магнитный компас указывает на магнитный север, который отличается от истинного на местное склонение. Узнайте своё в калькуляторе NOAA Magnetic Field Calculator и впишите в DECLINATION_DEG (восточное со знаком плюс). Направьте стрелку X на GY-271 на известный ориентир и сравните с телефоном или стрелочным компасом. Если при повороте по часовой стрелке число уменьшается, поставьте FLIP_Y = true.",
        kk: "Магниттік компас магниттік солтүстікті көрсетеді, ол нақты солтүстіктен жергілікті ауытқу шамасына өзгеше. Өз мәніңізді NOAA Magnetic Field Calculator арқылы біліп, DECLINATION_DEG-ке жазыңыз (шығыс ауытқу оң таңбамен). GY-271-дегі X көрсеткісін белгілі бағдарға бағыттап, телефонмен немесе тілді компаспен салыстырыңыз. Сағат тілімен бұрғанда сан азайса, FLIP_Y = true қойыңыз.",
      },
      expect: { en: "Heading within about ±5° of a reference compass when held level.", ru: "При горизонтальном положении курс совпадает с эталонным компасом примерно в пределах ±5°.", kk: "Көлденең ұстағанда бағыт эталон компаспен шамамен ±5° шегінде сәйкес келеді." },
      mistake: { en: "Holding the compass tilted by 20–30°: without tilt compensation the heading can be off by tens of degrees.", ru: "Компас наклонён на 20–30°: без компенсации наклона курс может ошибаться на десятки градусов.", kk: "Компас 20–30°-қа еңкейген: еңкеюді өтеусіз бағыт ондаған градусқа қателесуі мүмкін." },
    },
  ],
  code: [{
    filename: "digital_compass.ino",
    language: "cpp",
    libraries: ["Adafruit SSD1306", "Adafruit GFX Library"],
    source: `#include <Wire.h>
#include <EEPROM.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

const int BUTTON_PIN = 4;              // press to calibrate
const float DECLINATION_DEG = 0.0;     // your local magnetic declination, east positive
const bool FLIP_Y = false;             // true if turning clockwise makes the heading go down
const uint8_t QMC_ADDR = 0x0D;         // QMC5883L (most GY-271 boards today)
const uint8_t HMC_ADDR = 0x1E;         // HMC5883L (older GY-271 boards)
const unsigned long CAL_MS = 20000;

Adafruit_SSD1306 display(128, 64, &Wire, -1);

enum Chip { NO_CHIP, QMC5883L, HMC5883L };
Chip chip = NO_CHIP;

struct Cal { uint16_t magic; int16_t minX, maxX, minY, maxY; };
const uint16_t CAL_MAGIC = 0xC0A5;
Cal cal;
bool calibrated = false;
float avgSin = 0, avgCos = 1;
unsigned long lastPrint = 0;

bool present(uint8_t addr) {
  Wire.beginTransmission(addr);
  return Wire.endTransmission() == 0;
}

void writeReg(uint8_t addr, uint8_t reg, uint8_t val) {
  Wire.beginTransmission(addr);
  Wire.write(reg);
  Wire.write(val);
  Wire.endTransmission();
}

void initChip() {
  if (present(QMC_ADDR)) {
    chip = QMC5883L;
    writeReg(QMC_ADDR, 0x0B, 0x01);    // set/reset period, as the datasheet recommends
    writeReg(QMC_ADDR, 0x09, 0x0D);    // continuous, 200 Hz, 2 G range, oversampling 512
    Serial.println("found QMC5883L at 0x0D");
  } else if (present(HMC_ADDR)) {
    chip = HMC5883L;
    writeReg(HMC_ADDR, 0x00, 0x70);    // average 8 samples, 15 Hz
    writeReg(HMC_ADDR, 0x01, 0x20);    // gain 1.3 Ga
    writeReg(HMC_ADDR, 0x02, 0x00);    // continuous measurement
    Serial.println("found HMC5883L at 0x1E");
  } else {
    Serial.println("no compass found (0x0D / 0x1E), check wiring");
  }
}

bool readRaw(int16_t &x, int16_t &y) {
  uint8_t addr = chip == QMC5883L ? QMC_ADDR : HMC_ADDR;
  Wire.beginTransmission(addr);
  Wire.write(chip == QMC5883L ? 0x00 : 0x03);
  if (Wire.endTransmission() != 0) return false;
  if (Wire.requestFrom(addr, (uint8_t)6) != 6) return false;
  uint8_t b[6];
  for (uint8_t i = 0; i < 6; i++) b[i] = Wire.read();
  if (chip == QMC5883L) {              // X, Y, Z little-endian
    x = (int16_t)((b[1] << 8) | b[0]);
    y = (int16_t)((b[3] << 8) | b[2]);
  } else {                             // X, Z, Y big-endian
    x = (int16_t)((b[0] << 8) | b[1]);
    y = (int16_t)((b[4] << 8) | b[5]);
  }
  return true;
}

float headingDeg(int16_t x, int16_t y) {
  float fx = x, fy = y;
  if (calibrated) {
    fx -= (cal.minX + cal.maxX) / 2.0;
    fy -= (cal.minY + cal.maxY) / 2.0;
    float rx = (cal.maxX - cal.minX) / 2.0, ry = (cal.maxY - cal.minY) / 2.0;
    if (rx > 0 && ry > 0) fy *= rx / ry;   // make both axes the same size
  }
  if (FLIP_Y) fy = -fy;
  float h = atan2(fy, fx) * 180.0 / PI + DECLINATION_DEG;
  while (h < 0) h += 360.0;
  while (h >= 360.0) h -= 360.0;
  return h;
}

const char *cardinal(float h) {
  static const char *names[] = {"N", "NE", "E", "SE", "S", "SW", "W", "NW"};
  return names[(int)((h + 22.5) / 45.0) % 8];
}

void calibrate() {
  Serial.println("calibration: turn the compass flat, 2 full circles, 20 s");
  int16_t x, y;
  cal.minX = cal.minY = 32767;
  cal.maxX = cal.maxY = -32768;
  unsigned long start = millis();
  while (millis() - start < CAL_MS) {
    if (readRaw(x, y)) {
      cal.minX = min(cal.minX, x); cal.maxX = max(cal.maxX, x);
      cal.minY = min(cal.minY, y); cal.maxY = max(cal.maxY, y);
    }
    display.clearDisplay();
    display.setTextSize(1);
    display.setCursor(0, 0);
    display.println("CALIBRATING");
    display.println("Keep it flat and");
    display.println("turn 2 full circles");
    display.setTextSize(2);
    display.setCursor(0, 40);
    display.print((CAL_MS - (millis() - start)) / 1000);
    display.print(" s");
    display.display();
    delay(20);
  }
  cal.magic = CAL_MAGIC;
  EEPROM.put(0, cal);
  calibrated = true;
  Serial.print("cal saved x[");
  Serial.print(cal.minX); Serial.print(".."); Serial.print(cal.maxX);
  Serial.print("] y[");
  Serial.print(cal.minY); Serial.print(".."); Serial.print(cal.maxY);
  Serial.println("]");
}

void drawCompass(float h) {
  const int cx = 31, cy = 32, r = 30;
  display.clearDisplay();
  display.drawCircle(cx, cy, r, SSD1306_WHITE);
  float a = -h * PI / 180.0;              // where north is, seen from the device
  int nx = cx + (int)(sin(a) * (r - 4)), ny = cy - (int)(cos(a) * (r - 4));
  int sx = cx - (int)(sin(a) * (r - 10)), sy = cy + (int)(cos(a) * (r - 10));
  display.drawLine(sx, sy, nx, ny, SSD1306_WHITE);
  display.fillCircle(nx, ny, 3, SSD1306_WHITE);
  display.fillCircle(cx, cy, 2, SSD1306_WHITE);
  display.drawFastVLine(cx, cy - r - 1, 4, SSD1306_WHITE);   // device "forward" mark

  display.setTextSize(2);
  display.setCursor(70, 6);
  display.print((int)(h + 0.5) % 360);
  display.write(247);                     // degree sign
  display.setCursor(70, 30);
  display.print(cardinal(h));
  display.setTextSize(1);
  display.setCursor(70, 54);
  display.print(calibrated ? "calibrated" : "press: cal");
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
  display.cp437(true);
  display.setTextColor(SSD1306_WHITE);
  initChip();
  EEPROM.get(0, cal);
  calibrated = cal.magic == CAL_MAGIC && cal.maxX > cal.minX && cal.maxY > cal.minY;
  if (!calibrated) Serial.println("not calibrated yet: press the button");
}

void loop() {
  if (chip == NO_CHIP) {
    display.clearDisplay();
    display.setTextSize(1);
    display.setCursor(0, 24);
    display.print("No compass found");
    display.display();
    delay(500);
    initChip();
    return;
  }
  if (digitalRead(BUTTON_PIN) == LOW) {
    delay(50);
    while (digitalRead(BUTTON_PIN) == LOW) delay(10);
    calibrate();
  }

  int16_t x, y;
  if (!readRaw(x, y)) return;
  float h = headingDeg(x, y);
  // smooth on the unit circle so 359 -> 0 does not jump
  avgSin = avgSin * 0.8 + sin(h * PI / 180.0) * 0.2;
  avgCos = avgCos * 0.8 + cos(h * PI / 180.0) * 0.2;
  float smooth = atan2(avgSin, avgCos) * 180.0 / PI;
  if (smooth < 0) smooth += 360.0;
  drawCompass(smooth);

  if (millis() - lastPrint >= 500) {
    lastPrint = millis();
    Serial.print("heading ");
    Serial.print(smooth, 1);
    Serial.print(" ");
    Serial.print(cardinal(smooth));
    Serial.print("  raw x=");
    Serial.print(x);
    Serial.print(" y=");
    Serial.println(y);
  }
  delay(30);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Heading only moves within a small range or jumps 180°", ru: "Курс меняется в узком диапазоне или прыгает на 180°", kk: "Бағыт тар ауқымда ғана өзгереді немесе 180°-қа секіреді" },
      cause: { en: "Not calibrated, or calibrated near a magnet, laptop or steel table.", ru: "Нет калибровки, или она сделана рядом с магнитом, ноутбуком или стальным столом.", kk: "Калибрлеу жоқ немесе ол магнит, ноутбук не болат үстел жанында жасалған." },
      fix: { en: "Move at least 50 cm from metal and electronics, power from a power bank, and calibrate again.", ru: "Отойдите минимум на 50 см от металла и электроники, питайтесь от павербанка и откалибруйте заново.", kk: "Металл мен электроникадан кемінде 50 см алыстап, қуатты повербанктен алып, қайта калибрлеңіз." },
    },
    {
      symptom: { en: "Serial Monitor says \"no compass found\"", ru: "Serial Monitor пишет «no compass found»", kk: "Serial Monitor «no compass found» деп жазады" },
      cause: { en: "Wiring fault on the GY-271, or the board carries a QMC5883P at 0x2C.", ru: "Ошибка в подключении GY-271, или на плате QMC5883P с адресом 0x2C.", kk: "GY-271 қосылымында қате бар немесе платада 0x2C мекенжайлы QMC5883P тұр." },
      fix: { en: "Check SDA→A4 and SCL→A5, run an I²C scanner, and if it shows 0x2C use a QMC5883P library or buy a QMC5883L board.", ru: "Проверьте SDA→A4 и SCL→A5, запустите I²C-сканер; если он показывает 0x2C, используйте библиотеку для QMC5883P или купите плату с QMC5883L.", kk: "SDA→A4 және SCL→A5 тексеріп, I²C сканерін іске қосыңыз; ол 0x2C көрсетсе, QMC5883P кітапханасын пайдаланыңыз немесе QMC5883L бар плата сатып алыңыз." },
    },
    {
      symptom: { en: "East and west are swapped", ru: "Восток и запад перепутаны", kk: "Шығыс пен батыс ауысып кеткен" },
      cause: { en: "The Y axis of your board points the other way, or the board is upside down.", ru: "Ось Y на вашей плате направлена в другую сторону, или плата перевёрнута.", kk: "Платаңыздағы Y осі басқа жаққа бағытталған немесе плата төңкерілген." },
      fix: { en: "Keep the chip side up and set FLIP_Y = true.", ru: "Держите плату чипом вверх и поставьте FLIP_Y = true.", kk: "Платаны чипі жоғары қаратып ұстап, FLIP_Y = true қойыңыз." },
    },
  ],
  safety: [
    { en: "This is a hobby compass. For hiking, always carry a real needle compass and a map.", ru: "Это любительский компас. В походе всегда берите настоящий стрелочный компас и карту.", kk: "Бұл әуесқойлық компас. Жорыққа әрдайым нағыз тілді компас пен карта алыңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "found QMC5883L at 0x0D",
      "not calibrated yet: press the button",
      "calibration: turn the compass flat, 2 full circles, 20 s",
      "cal saved x[-1712..1488] y[-1530..1622]",
      "heading 2.4 N  raw x=1412 y=113",
      "heading 44.8 NE  raw x=1063 y=1203",
      "heading 91.3 E  raw x=-152 y=1627",
      "heading 178.6 S  raw x=-1701 y=93",
      "heading 271.9 W  raw x=-58 y=-1534",
      "heading 358.1 N  raw x=1431 y=-4",
    ],
    leds: [],
  },
} satisfies GuideContent;
