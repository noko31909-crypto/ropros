import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "gps-speedometer",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "vehicles",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 17,
  xpReward: 230,
  title: {
    en: "GPS Speedometer with OLED",
    ru: "GPS-спидометр с OLED-дисплеем",
    kk: "OLED дисплейлі GPS спидометр",
  },
  summary: {
    en: "A NEO-6M GPS and an Arduino Nano show your speed in big digits on a 0.96\" OLED, with the satellite count and the top speed of the trip. The sketch switches the GPS to 5 updates per second for a lively readout.",
    ru: "GPS NEO-6M и Arduino Nano показывают скорость крупными цифрами на OLED 0,96\", а также число спутников и максимальную скорость поездки. Скетч переводит GPS на 5 обновлений в секунду, чтобы показания были живыми.",
    kk: "NEO-6M GPS пен Arduino Nano 0,96\" OLED дисплейде жылдамдықты ірі цифрлармен, сондай-ақ серіктер санын және сапардағы ең жоғары жылдамдықты көрсетеді. Көрсеткіш жанды болуы үшін скетч GPS-ті секундына 5 жаңартуға ауыстырады.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V", ru: "ATmega328P, 5 В", kk: "ATmega328P, 5 В" }, role: { en: "Parses NMEA and drives the display", ru: "Разбирает NMEA и управляет дисплеем", kk: "NMEA-ны талдап, дисплейді басқарады" } },
    { component: "neo-6m-gps", qty: 1, spec: { en: "GY-GPS6MV2 with ceramic patch antenna and backup battery", ru: "GY-GPS6MV2 с керамической антенной и батарейкой резервного питания", kk: "Керамикалық антеннасы және резервтік батареясы бар GY-GPS6MV2" }, role: { en: "Position and speed, 9600 baud", ru: "Координаты и скорость, 9600 бод", kk: "Орын мен жылдамдық, 9600 бод" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C address 0x3C", ru: "0,96\" 128×64, I²C-адрес 0x3C", kk: "0,96\" 128×64, I²C мекенжайы 0x3C" }, role: { en: "Speed display", ru: "Дисплей скорости", kk: "Жылдамдық дисплейі" } },
    { component: "resistor", qty: 3, spec: { en: "1 kΩ ×2 and 2 kΩ ×1 (2.2 kΩ also works)", ru: "1 кОм ×2 и 2 кОм ×1 (подойдёт и 2,2 кОм)", kk: "1 кОм ×2 және 2 кОм ×1 (2,2 кОм да жарайды)" }, role: { en: "5 V → 3.3 V divider for GPS RX, series resistor on GPS TX", ru: "Делитель 5 В → 3,3 В для RX GPS, последовательный резистор на TX GPS", kk: "GPS RX үшін 5 В → 3,3 В бөлгіш, GPS TX-тегі тізбектей резистор" } },
    { component: "usb-5v", qty: 1, optional: true, spec: { en: "power bank or car USB adapter", ru: "павербанк или автомобильный USB-адаптер", kk: "павербанк немесе автокөлік USB адаптері" }, role: { en: "Power on the move", ru: "Питание в дороге", kk: "Жолдағы қуат" } },
    { component: "breadboard", qty: 1, spec: { en: "half size, or a perfboard for the car", ru: "половинка или макетная плата под пайку для машины", kk: "жартылай немесе көлікке арналған дәнекерлеу тақтасы" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 14, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "gps", component: "neo-6m-gps", label: "NEO-6M GPS" },
    { id: "r_tx", component: "resistor", label: "1 kΩ" },
    { id: "r_div_top", component: "resistor", label: "1 kΩ" },
    { id: "r_div_bot", component: "resistor", label: "2 kΩ" },
    { id: "oled", component: "oled-ssd1306", label: "OLED 128×64" },
  ],
  connections: [
    { from: "board.5V", to: "gps.VCC", color: "red", note: { en: "the GY-GPS6MV2 has its own 3.3 V regulator", ru: "у GY-GPS6MV2 свой стабилизатор 3,3 В", kk: "GY-GPS6MV2-нің өз 3,3 В тұрақтандырғышы бар" } },
    { from: "gps.GND", to: "board.GND", color: "black" },
    { from: "gps.TX", to: "r_tx.A", color: "yellow", note: { en: "3.3 V output: the Nano reads it as HIGH", ru: "выход 3,3 В: Nano читает его как HIGH", kk: "3,3 В шығыс: Nano оны HIGH деп оқиды" } },
    { from: "r_tx.B", to: "board.D4", color: "yellow", note: { en: "SoftwareSerial RX", ru: "SoftwareSerial RX", kk: "SoftwareSerial RX" } },
    { from: "board.D3", to: "r_div_top.A", color: "orange", note: { en: "SoftwareSerial TX, 5 V", ru: "SoftwareSerial TX, 5 В", kk: "SoftwareSerial TX, 5 В" } },
    { from: "r_div_top.B", to: "gps.RX", color: "orange", note: { en: "divider output: 5 V × 2/3 = 3.3 V", ru: "выход делителя: 5 В × 2/3 = 3,3 В", kk: "бөлгіш шығысы: 5 В × 2/3 = 3,3 В" } },
    { from: "gps.RX", to: "r_div_bot.A", color: "orange" },
    { from: "r_div_bot.B", to: "board.GND2", color: "black" },
    { from: "board.5V", to: "oled.VCC", color: "red" },
    { from: "oled.GND", to: "board.GND2", color: "black" },
    { from: "board.A4", to: "oled.SDA", color: "blue" },
    { from: "board.A5", to: "oled.SCL", color: "green" },
  ],
  steps: [
    {
      title: { en: "Check the signal levels", ru: "Проверьте уровни сигналов", kk: "Сигнал деңгейлерін тексеріңіз" },
      body: {
        en: "The NEO-6M chip is a 3.3 V device. The GY-GPS6MV2 board regulates its own power, so VCC may go to 5V, but the TX and RX pins are wired straight to the chip. GPS TX → Nano: it outputs about 3.3 V, and a 5 V ATmega328P reads anything above 3.0 V as HIGH, so this direction works without shifting. Nano → GPS RX: the Nano drives 5 V, which is above the chip's 3.6 V limit, so this line goes through a 1 kΩ / 2 kΩ divider: 5 V × 2 / (1 + 2) = 3.3 V.",
        ru: "Микросхема NEO-6M работает от 3,3 В. Плата GY-GPS6MV2 сама стабилизирует питание, поэтому VCC можно подключить к 5V, но выводы TX и RX идут прямо на микросхему. TX GPS → Nano: на выходе около 3,3 В, а ATmega328P на 5 В считает HIGH всё, что выше 3,0 В, поэтому в эту сторону преобразование не нужно. Nano → RX GPS: Nano выдаёт 5 В, это выше предела микросхемы 3,6 В, поэтому линия идёт через делитель 1 кОм / 2 кОм: 5 В × 2 / (1 + 2) = 3,3 В.",
        kk: "NEO-6M микросхемасы 3,3 В-та жұмыс істейді. GY-GPS6MV2 платасы қуатты өзі тұрақтандырады, сондықтан VCC-ні 5V-ке қосуға болады, бірақ TX пен RX шықпалары микросхемаға тікелей барады. GPS TX → Nano: шығысы шамамен 3,3 В, ал 5 В-тық ATmega328P 3,0 В-тан жоғарының бәрін HIGH деп санайды, сондықтан бұл бағытта түрлендіру керек емес. Nano → GPS RX: Nano 5 В береді, бұл микросхеманың 3,6 В шегінен жоғары, сондықтан бұл сызық 1 кОм / 2 кОм бөлгіші арқылы өтеді: 5 В × 2 / (1 + 2) = 3,3 В.",
      },
      expect: { en: "You know which line needs the divider (Nano → GPS RX) and which does not.", ru: "Понятно, какой линии нужен делитель (Nano → RX GPS), а какой нет.", kk: "Қай сызыққа бөлгіш керек (Nano → GPS RX), қайсысына керек емес екені түсінікті." },
      mistake: { en: "Wiring D3 straight to GPS RX may work for a while and then damage the GPS input.", ru: "Прямое подключение D3 к RX GPS может какое-то время работать, а потом повредить вход GPS.", kk: "D3-ті GPS RX-ке тікелей қосу біраз уақыт жұмыс істеп, кейін GPS кірісін бүлдіруі мүмкін." },
    },
    {
      title: { en: "Wire the GPS", ru: "Подключите GPS", kk: "GPS-ті қосыңыз" },
      body: {
        en: "Connect GPS VCC to 5V and GND to GND. Wire GPS TX → 1 kΩ → D4; the resistor only protects both pins if one of them is ever set as an output by mistake. Build the divider for the other direction: D3 → 1 kΩ → GPS RX, and GPS RX → 2 kΩ → GND. D3 and D4 are used through SoftwareSerial so D0/D1 stay free for uploading and the Serial Monitor.",
        ru: "Подключите VCC GPS к 5V, GND к GND. Подключите TX GPS → 1 кОм → D4; резистор лишь защищает оба пина, если один из них по ошибке станет выходом. Соберите делитель для обратного направления: D3 → 1 кОм → RX GPS и RX GPS → 2 кОм → GND. D3 и D4 работают через SoftwareSerial, поэтому D0/D1 остаются свободными для загрузки и Serial Monitor.",
        kk: "GPS VCC-ін 5V-ке, GND-ін GND-ге қосыңыз. GPS TX → 1 кОм → D4 тізбегін жалғаңыз; резистор пиндердің бірі қателесіп шығыс болып қалса ғана екеуін де қорғайды. Кері бағытқа бөлгіш жинаңыз: D3 → 1 кОм → GPS RX және GPS RX → 2 кОм → GND. D3 пен D4 SoftwareSerial арқылы жұмыс істейді, сондықтан D0/D1 жүктеу мен Serial Monitor үшін бос қалады.",
      },
      expect: { en: "GPS RX sits at the middle of the 1 kΩ / 2 kΩ divider; TX reaches D4 through 1 kΩ.", ru: "RX GPS в средней точке делителя 1 кОм / 2 кОм; TX идёт на D4 через 1 кОм.", kk: "GPS RX 1 кОм / 2 кОм бөлгіштің ортасында; TX D4-ке 1 кОм арқылы барады." },
      mistake: { en: "TX and RX are crossed: GPS TX goes to the Nano's receive pin D4, not to D3.", ru: "TX и RX перекрещиваются: TX GPS идёт на приёмный пин Nano D4, а не на D3.", kk: "TX пен RX айқасады: GPS TX Nano-ның қабылдау пині D4-ке барады, D3-ке емес." },
    },
    {
      title: { en: "Connect the OLED", ru: "Подключите OLED", kk: "OLED-ті қосыңыз" },
      body: {
        en: "Wire the OLED VCC to 5V, GND to GND, SDA to A4 and SCL to A5, the Nano's hardware I²C pins. The sketch uses U8g2 in page mode, which needs only 128 bytes of RAM instead of a 1 KB frame buffer and leaves room for the GPS parser.",
        ru: "Подключите VCC OLED к 5V, GND к GND, SDA к A4, SCL к A5: это аппаратные пины I²C Nano. Скетч использует U8g2 в страничном режиме: ему нужно всего 128 байт ОЗУ вместо буфера кадра 1 КБ, и остаётся место для разбора GPS.",
        kk: "OLED VCC-ін 5V-ке, GND-ін GND-ге, SDA-ны A4-ке, SCL-ды A5-ке қосыңыз: бұлар Nano-ның аппараттық I²C пиндері. Скетч U8g2-ні беттік режимде қолданады: оған 1 КБ кадр буферінің орнына небәрі 128 байт ЖЖҚ керек, сондықтан GPS талдауға орын қалады.",
      },
      expect: { en: "Four wires from the OLED to 5V, GND, A4 and A5.", ru: "Четыре провода от OLED к 5V, GND, A4 и A5.", kk: "OLED-тен 5V, GND, A4 және A5-ке төрт сым." },
      mistake: { en: "Some OLEDs swap GND and VCC; follow the print on your module.", ru: "У некоторых OLED выводы GND и VCC переставлены; следуйте надписям на модуле.", kk: "Кейбір OLED-те GND мен VCC ауысқан; модульдегі жазуға сүйеніңіз." },
    },
    {
      title: { en: "Install the libraries and get a fix", ru: "Установите библиотеки и поймайте спутники", kk: "Кітапханаларды орнатып, серіктерді ұстаңыз" },
      body: {
        en: "Install \"TinyGPSPlus\" (Mikal Hart) and \"U8g2\" (olikraus), select Arduino Nano and upload. Take the build outdoors or put the antenna (ceramic side up) on a window sill. A cold start takes 1–5 minutes; the screen shows \"Searching\" and the satellite count meanwhile. Once the LED on the GPS board starts blinking once a second, it has a fix and the speed appears.",
        ru: "Установите «TinyGPSPlus» (Mikal Hart) и «U8g2» (olikraus), выберите Arduino Nano и загрузите скетч. Вынесите устройство на улицу или положите антенну (керамикой вверх) на подоконник. Холодный старт занимает 1–5 минут; в это время на экране «Searching» и число спутников. Когда светодиод на плате GPS начинает мигать раз в секунду, позиция найдена и появляется скорость.",
        kk: "«TinyGPSPlus» (Mikal Hart) және «U8g2» (olikraus) орнатыңыз, Arduino Nano-ны таңдап, скетчті жүктеңіз. Құрылғыны далаға шығарыңыз немесе антеннаны (керамикасын жоғары қаратып) терезе алдына қойыңыз. Суық іске қосу 1–5 минут алады; осы уақытта экранда «Searching» және серіктер саны көрінеді. GPS платасындағы жарық диоды секундына бір рет жыпылықтай бастаса, орын анықталды және жылдамдық шығады.",
      },
      expect: { en: "\"Fix: 7 sats, 0.0 km/h\" in the Serial Monitor at 9600 baud while standing still.", ru: "Стоя на месте, в Serial Monitor на 9600 бод «Fix: 7 sats, 0.0 km/h».", kk: "Бір орында тұрғанда 9600 бодтағы Serial Monitor-да «Fix: 7 sats, 0.0 km/h»." },
      mistake: { en: "Indoors, away from a window, the NEO-6M rarely gets a fix: it is not broken.", ru: "В помещении вдали от окна NEO-6M редко находит спутники: он не сломан.", kk: "Бөлме ішінде терезеден алыста NEO-6M серіктерді сирек табады: ол бұзылмаған." },
    },
    {
      title: { en: "Drive and read the speed", ru: "Поезжайте и смотрите скорость", kk: "Жүріп, жылдамдықты қараңыз" },
      body: {
        en: "At start-up the sketch sends UBX commands through the divider: it turns off the GSV, GSA, GLL and VTG sentences and sets 5 position updates per second, so the 9600 baud line only carries RMC (speed) and GGA (satellites). Below 2 km/h the speed is shown as 0 to hide GPS drift, and the trip maximum only counts with at least 4 satellites. Power it from a power bank or a car USB socket and give it to a passenger to read.",
        ru: "При запуске скетч отправляет через делитель команды UBX: отключает сообщения GSV, GSA, GLL и VTG и включает 5 обновлений в секунду, так что по линии 9600 бод идут только RMC (скорость) и GGA (спутники). Ниже 2 км/ч скорость показывается как 0, чтобы скрыть дрейф GPS, а максимум поездки учитывается только при 4 и более спутниках. Питайте устройство от павербанка или автомобильного USB и отдайте пассажиру.",
        kk: "Іске қосылғанда скетч бөлгіш арқылы UBX командаларын жібереді: GSV, GSA, GLL және VTG хабарламаларын өшіріп, секундына 5 жаңартуды қосады, сондықтан 9600 бод сызығы арқылы тек RMC (жылдамдық) пен GGA (серіктер) өтеді. GPS ауытқуын жасыру үшін 2 км/сағ-тан төмен жылдамдық 0 болып көрсетіледі, ал сапардың ең жоғары жылдамдығы тек 4 және одан көп серік болғанда есептеледі. Құрылғыны павербанктен немесе автокөлік USB-інен қоректендіріп, жолаушыға беріңіз.",
      },
      expect: { en: "The big number follows the car's speedometer within 1–2 km/h, and MAX keeps the highest value.", ru: "Крупное число совпадает со спидометром машины в пределах 1–2 км/ч, а MAX хранит наибольшее значение.", kk: "Ірі сан көлік спидометрімен 1–2 км/сағ дәлдікпен сәйкес келеді, ал MAX ең үлкен мәнді сақтайды." },
      mistake: { en: "If the update rate stays at once a second, the divider to GPS RX is missing; the speedometer still works, just slower.", ru: "Если обновление остаётся раз в секунду, нет делителя к RX GPS; спидометр работает, просто медленнее.", kk: "Жаңарту секундына бір рет болып қалса, GPS RX-ке бөлгіш жоқ; спидометр жұмыс істейді, тек баяуырақ." },
    },
  ],
  code: [{
    filename: "gps_speedometer.ino",
    language: "cpp",
    libraries: ["TinyGPSPlus", "U8g2"],
    source: `#include <SoftwareSerial.h>
#include <TinyGPS++.h>
#include <U8g2lib.h>
#include <Wire.h>

const int GPS_RX_PIN = 4;   // Nano receives here  <- 1 kOhm <- GPS TX (3.3 V)
const int GPS_TX_PIN = 3;   // Nano sends here     -> 1k/2k divider -> GPS RX
const float STILL_KMH = 2.0;        // below this, show 0 (GPS drift)
const uint8_t MIN_SATS_FOR_MAX = 4;

SoftwareSerial gpsSerial(GPS_RX_PIN, GPS_TX_PIN);
TinyGPSPlus gps;
U8G2_SSD1306_128X64_NONAME_1_HW_I2C oled(U8G2_R0, U8X8_PIN_NONE);   // page mode: 128 B RAM

float maxKmh = 0;
unsigned long lastDraw = 0, lastLog = 0;

// UBX frame: class, id, length (LE), payload. Sync bytes and checksum are added here.
void sendUBX(const uint8_t *msg, uint8_t len) {
  uint8_t ckA = 0, ckB = 0;
  gpsSerial.write(0xB5);
  gpsSerial.write(0x62);
  for (uint8_t i = 0; i < len; i++) {
    gpsSerial.write(msg[i]);
    ckA += msg[i];
    ckB += ckA;
  }
  gpsSerial.write(ckA);
  gpsSerial.write(ckB);
  delay(50);
}

void configureGps() {
  const uint8_t offGLL[] = {0x06, 0x01, 0x03, 0x00, 0xF0, 0x01, 0x00};
  const uint8_t offGSA[] = {0x06, 0x01, 0x03, 0x00, 0xF0, 0x02, 0x00};
  const uint8_t offGSV[] = {0x06, 0x01, 0x03, 0x00, 0xF0, 0x03, 0x00};
  const uint8_t offVTG[] = {0x06, 0x01, 0x03, 0x00, 0xF0, 0x05, 0x00};
  const uint8_t rate5Hz[] = {0x06, 0x08, 0x06, 0x00, 0xC8, 0x00, 0x01, 0x00, 0x01, 0x00};  // 200 ms
  sendUBX(offGLL, sizeof(offGLL));
  sendUBX(offGSA, sizeof(offGSA));
  sendUBX(offGSV, sizeof(offGSV));
  sendUBX(offVTG, sizeof(offVTG));
  sendUBX(rate5Hz, sizeof(rate5Hz));
}

void drawScreen(bool fix, int kmh, uint8_t sats) {
  char speedText[6], line[24], maxText[8];
  itoa(kmh, speedText, 10);
  dtostrf(maxKmh, 1, 1, maxText);
  snprintf(line, sizeof(line), "SAT %u  MAX %s", sats, maxText);

  oled.firstPage();
  do {
    if (fix) {
      oled.setFont(u8g2_font_logisoso32_tn);
      oled.drawStr(92 - oled.getStrWidth(speedText), 40, speedText);   // right-aligned digits
      oled.setFont(u8g2_font_6x10_tf);
      oled.drawStr(96, 40, "km/h");
    } else {
      oled.setFont(u8g2_font_6x10_tf);
      oled.drawStr(0, 24, "Searching for GPS...");
    }
    oled.setFont(u8g2_font_6x10_tf);
    oled.drawStr(0, 62, line);
  } while (oled.nextPage());
}

void setup() {
  Serial.begin(9600);
  gpsSerial.begin(9600);   // NEO-6M default baud rate
  oled.begin();
  drawScreen(false, 0, 0);
  delay(500);              // let the GPS boot before configuring it
  configureGps();
  Serial.println(F("GPS speedometer ready"));
}

void loop() {
  while (gpsSerial.available()) gps.encode(gpsSerial.read());

  bool fix = gps.location.isValid() && gps.location.age() < 2000;
  uint8_t sats = gps.satellites.isValid() ? gps.satellites.value() : 0;
  float kmh = gps.speed.isValid() ? gps.speed.kmph() : 0;
  if (kmh < STILL_KMH) kmh = 0;
  if (fix && sats >= MIN_SATS_FOR_MAX && kmh > maxKmh) maxKmh = kmh;

  if (millis() - lastDraw >= 200) {   // 5 screen updates per second
    lastDraw = millis();
    drawScreen(fix, (int)(kmh + 0.5), sats);
  }

  if (millis() - lastLog >= 1000) {
    lastLog = millis();
    if (fix) {
      Serial.print(F("Fix: "));
      Serial.print(sats);
      Serial.print(F(" sats, "));
      Serial.print(kmh, 1);
      Serial.print(F(" km/h, max "));
      Serial.print(maxKmh, 1);
      Serial.println(F(" km/h"));
    } else {
      Serial.print(F("No fix yet, "));
      Serial.print(sats);
      Serial.print(F(" sats, chars "));
      Serial.println(gps.charsProcessed());
    }
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"chars 0\" in the Serial Monitor", ru: "В Serial Monitor «chars 0»", kk: "Serial Monitor-да «chars 0»" },
      cause: { en: "No data from the GPS: TX is on the wrong pin or the module has no power.", ru: "От GPS нет данных: TX не на том пине, или у модуля нет питания.", kk: "GPS-тен дерек жоқ: TX басқа пинде немесе модульде қуат жоқ." },
      fix: { en: "Make sure GPS TX → 1 kΩ → D4 and measure about 5 V between VCC and GND on the GPS board.", ru: "Проверьте цепь TX GPS → 1 кОм → D4 и измерьте около 5 В между VCC и GND на плате GPS.", kk: "GPS TX → 1 кОм → D4 тізбегін тексеріп, GPS платасындағы VCC мен GND арасында шамамен 5 В бар екенін өлшеңіз." },
    },
    {
      symptom: { en: "Characters arrive but there is never a fix", ru: "Символы приходят, но спутники не находятся", kk: "Таңбалар келеді, бірақ серіктер табылмайды" },
      cause: { en: "The antenna cannot see the sky, or the backup battery is flat so every start is a cold start.", ru: "Антенна не видит неба, или села резервная батарейка, и каждый старт холодный.", kk: "Антенна аспанды көрмейді немесе резервтік батарея отырып қалған, сондықтан әр іске қосу суық." },
      fix: { en: "Go outside with the ceramic patch facing up and wait 5 minutes; after the first fix, restarts take seconds.", ru: "Выйдите на улицу керамической антенной вверх и подождите 5 минут; после первой фиксации перезапуски занимают секунды.", kk: "Керамикалық антеннаны жоғары қаратып далаға шығып, 5 минут күтіңіз; алғашқы анықтаудан кейін қайта іске қосу бірнеше секунд алады." },
    },
    {
      symptom: { en: "The screen stays black", ru: "Экран остаётся чёрным", kk: "Экран қара күйінде қалады" },
      cause: { en: "SDA/SCL are swapped or the OLED uses address 0x3D.", ru: "Перепутаны SDA/SCL, или у OLED адрес 0x3D.", kk: "SDA/SCL ауысқан немесе OLED мекенжайы 0x3D." },
      fix: { en: "Check SDA → A4 and SCL → A5; for 0x3D add oled.setI2CAddress(0x3D * 2); before oled.begin().", ru: "Проверьте SDA → A4 и SCL → A5; для 0x3D добавьте oled.setI2CAddress(0x3D * 2); перед oled.begin().", kk: "SDA → A4 және SCL → A5 екенін тексеріңіз; 0x3D үшін oled.begin() алдына oled.setI2CAddress(0x3D * 2); қосыңыз." },
    },
    {
      symptom: { en: "The speed jumps around when standing still", ru: "Скорость прыгает, когда стоите на месте", kk: "Бір орында тұрғанда жылдамдық секіреді" },
      cause: { en: "Few satellites or reflections from buildings make the position drift.", ru: "Мало спутников или отражения от зданий заставляют позицию дрейфовать.", kk: "Серіктердің аздығы немесе ғимараттардан шағылысу орынды ауытқытады." },
      fix: { en: "Raise STILL_KMH to 3–4 and mount the antenna with a clear view of the sky, e.g. under the windscreen.", ru: "Увеличьте STILL_KMH до 3–4 и закрепите антенну с открытым видом на небо, например под лобовым стеклом.", kk: "STILL_KMH мәнін 3–4-ке дейін көтеріп, антеннаны аспан ашық көрінетін жерге, мысалы алдыңғы әйнектің астына бекітіңіз." },
    },
  ],
  safety: [
    { en: "The driver must not read or adjust the device while driving; mount it securely or let a passenger use it.", ru: "Водитель не должен смотреть на устройство или настраивать его во время движения; закрепите его надёжно или отдайте пассажиру.", kk: "Жүргізуші көлік жүріп келе жатқанда құрылғыға қарамауы және оны баптамауы керек; оны берік бекітіңіз немесе жолаушыға беріңіз." },
    { en: "A GPS reading is not a legal speedometer: always follow the car's own instrument.", ru: "Показания GPS не заменяют штатный спидометр: всегда ориентируйтесь на приборы машины.", kk: "GPS көрсеткіші ресми спидометрді алмастырмайды: әрқашан көліктің өз құралына сүйеніңіз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["GPS speedometer ready", "No fix yet, 0 sats, chars 1843", "No fix yet, 3 sats, chars 2611", "Fix: 6 sats, 0.0 km/h, max 0.0 km/h", "Fix: 7 sats, 18.4 km/h, max 18.4 km/h", "Fix: 8 sats, 42.6 km/h, max 42.6 km/h", "Fix: 8 sats, 37.9 km/h, max 48.3 km/h"],
    leds: [{ label: "GPS fix", color: "#2979FF" }],
  },
} satisfies GuideContent;
