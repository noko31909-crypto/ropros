import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-rfid-attendance",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "tools",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 15,
  xpReward: 230,
  title: {
    en: "ESP32 RFID Attendance Logger",
    ru: "Учёт посещаемости по RFID на ESP32",
    kk: "ESP32 негізіндегі RFID қатысу есебі",
  },
  summary: {
    en: "Tap an RFID card on an RC522 reader: the ESP32 shows the name on an OLED, beeps, and logs card UID, IN/OUT and NTP time to a live web table you can download as CSV.",
    ru: "Приложите RFID-карту к считывателю RC522: ESP32 покажет имя на OLED, пискнет и запишет UID карты, IN/OUT и время по NTP в веб-таблицу, которую можно скачать в CSV.",
    kk: "RFID картасын RC522 оқығышына тигізіңіз: ESP32 атын OLED-та көрсетіп, дыбыс береді де, карта UID-ін, IN/OUT және NTP уақытын CSV-ге жүктеуге болатын веб-кестеге жазады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit (WROOM-32), USB powered", ru: "ESP32 DevKit (WROOM-32), питание от USB", kk: "ESP32 DevKit (WROOM-32), USB қуаты" }, role: { en: "Controller, clock and web server", ru: "Контроллер, часы и веб-сервер", kk: "Контроллер, сағат және веб-сервер" } },
    { component: "rc522-rfid", qty: 1, spec: { en: "RC522 kit with a white card and a key fob (MIFARE 13.56 MHz)", ru: "набор RC522 с белой картой и брелоком (MIFARE 13,56 МГц)", kk: "ақ картасы мен кілт салпыншағы бар RC522 жинағы (MIFARE 13,56 МГц)" }, role: { en: "Reads card UIDs", ru: "Читает UID карт", kk: "Карта UID-ін оқиды" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I2C address 0x3C", ru: "0,96\" 128×64, I2C-адрес 0x3C", kk: "0,96\" 128×64, I2C мекенжайы 0x3C" }, role: { en: "Shows the clock and who just scanned", ru: "Показывает часы и кто только что отметился", kk: "Сағатты және кім жаңа ғана белгіленгенін көрсетеді" } },
    { component: "buzzer-passive", qty: 1, spec: { en: "passive buzzer module", ru: "модуль пассивного зуммера", kk: "пассивті зуммер модулі" }, role: { en: "Short beep on every scan", ru: "Короткий сигнал при каждом считывании", kk: "Әр оқылғанда қысқа дыбыс" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 14, spec: { en: "male-female and male-male", ru: "папа-мама и папа-папа", kk: "аталық-аналық және аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { component: "enclosure", qty: 1, spec: { en: "plastic box; the reader works through up to 1 cm of plastic", ru: "пластиковый корпус; считыватель работает сквозь пластик до 1 см", kk: "пластик қорап; оқығыш 1 см-ге дейінгі пластик арқылы жұмыс істейді" }, role: { en: "Wall-mounted terminal", ru: "Настенный терминал", kk: "Қабырғалық терминал" }, optional: true },
  ],
  instances: [
    { id: "rfid", component: "rc522-rfid", label: "RC522" },
    { id: "oled", component: "oled-ssd1306", label: "OLED 0x3C" },
    { id: "buzz", component: "buzzer-passive", label: "Beeper" },
  ],
  connections: [
    { from: "board.3V3", to: "rfid.3.3V", color: "red", note: { en: "3.3 V only: 5 V destroys the RC522", ru: "только 3,3 В: от 5 В RC522 сгорит", kk: "тек 3,3 В: 5 В-тан RC522 күйіп кетеді" } },
    { from: "rfid.GND", to: "board.GND", color: "black" },
    { from: "rfid.SDA", to: "board.GPIO5", color: "orange", note: { en: "SDA on the RC522 is the SPI chip select", ru: "SDA на RC522 — это выбор микросхемы SPI", kk: "RC522-дегі SDA — SPI микросхемасын таңдау" } },
    { from: "rfid.SCK", to: "board.GPIO18", color: "yellow" },
    { from: "rfid.MOSI", to: "board.GPIO23", color: "green" },
    { from: "rfid.MISO", to: "board.GPIO19", color: "blue" },
    { from: "rfid.RST", to: "board.GPIO27", color: "white" },
    { from: "board.3V3", to: "oled.VCC", color: "red" },
    { from: "oled.GND", to: "board.GND2", color: "black" },
    { from: "oled.SDA", to: "board.GPIO21", color: "purple" },
    { from: "oled.SCL", to: "board.GPIO22", color: "gray" },
    { from: "board.GPIO25", to: "buzz.+", color: "pink" },
    { from: "buzz.-", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Wire the RC522 to the VSPI bus", ru: "Подключите RC522 к шине VSPI", kk: "RC522-ні VSPI шинасына қосыңыз" },
      body: {
        en: "The RC522 runs on 3.3 V only. Connect 3.3V to the ESP32 3V3 pin and GND to GND. Then the SPI lines on the default VSPI pins: SCK → GPIO18, MISO → GPIO19, MOSI → GPIO23, SDA (chip select) → GPIO5, and RST → GPIO27. Leave IRQ unconnected; the sketch polls the reader.",
        ru: "RC522 работает только от 3,3 В. Подключите 3.3V к пину 3V3 платы ESP32, GND к GND. Затем линии SPI на стандартные пины VSPI: SCK → GPIO18, MISO → GPIO19, MOSI → GPIO23, SDA (выбор микросхемы) → GPIO5, RST → GPIO27. IRQ оставьте свободным: скетч опрашивает считыватель сам.",
        kk: "RC522 тек 3,3 В-пен жұмыс істейді. 3.3V-ты ESP32-нің 3V3 пиніне, GND-ні GND-ге қосыңыз. Содан кейін SPI сызықтарын VSPI стандартты пиндеріне қосыңыз: SCK → GPIO18, MISO → GPIO19, MOSI → GPIO23, SDA (микросхеманы таңдау) → GPIO5, RST → GPIO27. IRQ-ды бос қалдырыңыз: скетч оқығышты өзі сұрап отырады.",
      },
      expect: { en: "After upload the Serial Monitor prints the reader firmware, e.g. \"RC522 version 0x92\".", ru: "После загрузки Serial Monitor печатает прошивку считывателя, например «RC522 version 0x92».", kk: "Жүктегеннен кейін Serial Monitor оқығыштың микробағдарламасын шығарады, мысалы «RC522 version 0x92»." },
      mistake: { en: "Version 0x00 or 0xFF means a wrong or loose SPI wire; MISO and MOSI swapped is the usual cause.", ru: "Версия 0x00 или 0xFF означает ошибку в проводах SPI; чаще всего перепутаны MISO и MOSI.", kk: "0x00 немесе 0xFF нұсқасы SPI сымдарындағы қатені білдіреді; көбіне MISO мен MOSI ауысып кеткен." },
    },
    {
      title: { en: "Add the OLED and the beeper", ru: "Добавьте OLED и зуммер", kk: "OLED пен зуммерді қосыңыз" },
      body: {
        en: "Connect the OLED VCC to 3V3, GND to GND2, SDA to GPIO21 and SCL to GPIO22, the ESP32's default I2C pins. Connect the passive buzzer + to GPIO25 and − to GND3. A passive buzzer needs a tone signal, which the sketch makes with tone().",
        ru: "Подключите VCC дисплея OLED к 3V3, GND к GND2, SDA к GPIO21, SCL к GPIO22 — это стандартные пины I2C у ESP32. Плюс пассивного зуммера подключите к GPIO25, минус к GND3. Пассивному зуммеру нужен тональный сигнал, его скетч формирует функцией tone().",
        kk: "OLED дисплейінің VCC-ін 3V3-ке, GND-ін GND2-ге, SDA-сын GPIO21-ге, SCL-ін GPIO22-ге қосыңыз — бұл ESP32-нің стандартты I2C пиндері. Пассивті зуммердің плюсін GPIO25-ке, минусын GND3-ке қосыңыз. Пассивті зуммерге тондық сигнал керек, оны скетч tone() функциясымен жасайды.",
      },
      expect: { en: "The OLED shows \"Scan card\" and the time once Wi-Fi and NTP are up.", ru: "Когда Wi-Fi и NTP готовы, OLED показывает «Scan card» и время.", kk: "Wi-Fi мен NTP дайын болғанда, OLED «Scan card» жазуы мен уақытты көрсетеді." },
      mistake: { en: "A blank OLED is usually address 0x3D instead of 0x3C; change OLED_ADDR in the sketch.", ru: "Пустой OLED чаще всего означает адрес 0x3D вместо 0x3C; поменяйте OLED_ADDR в скетче.", kk: "OLED бос болса, көбіне мекенжайы 0x3C емес, 0x3D; скетчтегі OLED_ADDR-ды өзгертіңіз." },
    },
    {
      title: { en: "Install libraries, set Wi-Fi and time zone", ru: "Установите библиотеки, задайте Wi-Fi и часовой пояс", kk: "Кітапханаларды орнатып, Wi-Fi мен уақыт белдеуін көрсетіңіз" },
      body: {
        en: "Install MFRC522, Adafruit SSD1306 and Adafruit GFX Library from the Library Manager. Enter WIFI_SSID and WIFI_PASS. TZ_INFO is a POSIX time-zone string: \"<+05>-5\" is UTC+5 (Kazakhstan), \"MSK-3\" is Moscow, \"CET-1CEST,M3.5.0,M10.5.0/3\" is Central Europe. Upload with \"ESP32 Dev Module\" selected and open the Serial Monitor at 115200 baud.",
        ru: "Установите через Library Manager библиотеки MFRC522, Adafruit SSD1306 и Adafruit GFX Library. Впишите WIFI_SSID и WIFI_PASS. TZ_INFO — строка часового пояса в формате POSIX: «<+05>-5» — это UTC+5 (Казахстан), «MSK-3» — Москва, «CET-1CEST,M3.5.0,M10.5.0/3» — Центральная Европа. Выберите «ESP32 Dev Module», загрузите скетч и откройте Serial Monitor на 115200 бод.",
        kk: "Library Manager арқылы MFRC522, Adafruit SSD1306 және Adafruit GFX Library кітапханаларын орнатыңыз. WIFI_SSID пен WIFI_PASS-ты жазыңыз. TZ_INFO — POSIX пішіміндегі уақыт белдеуі жолы: «<+05>-5» — UTC+5 (Қазақстан), «MSK-3» — Мәскеу, «CET-1CEST,M3.5.0,M10.5.0/3» — Орталық Еуропа. «ESP32 Dev Module» таңдап, скетчті жүктеңіз де, Serial Monitor-ды 115200 бодта ашыңыз.",
      },
      expect: { en: "\"time synced\" with today's date appears within a few seconds of Wi-Fi connecting.", ru: "Через несколько секунд после подключения к Wi-Fi появляется «time synced» с сегодняшней датой.", kk: "Wi-Fi-ға қосылғаннан кейін бірнеше секундта бүгінгі күні бар «time synced» шығады." },
      mistake: { en: "Without a working internet connection NTP fails and the log shows \"--:--\" instead of times.", ru: "Без интернета NTP не работает, и в журнале вместо времени будет «--:--».", kk: "Интернетсіз NTP жұмыс істемейді, журналда уақыттың орнына «--:--» тұрады." },
    },
    {
      title: { en: "Register your cards", ru: "Зарегистрируйте карты", kk: "Карталарды тіркеңіз" },
      body: {
        en: "Tap each card: unknown cards are logged with the name \"unknown\" and their UID is printed, e.g. 04:A3:1B:72. Copy the UIDs into the KNOWN table in the sketch with a name for each person, then upload again. Each card alternates IN and OUT on every scan, and a second tap within 3 seconds is ignored.",
        ru: "Приложите каждую карту: неизвестные записываются с именем «unknown», и печатается их UID, например 04:A3:1B:72. Скопируйте UID в таблицу KNOWN в скетче, указав имя каждого человека, и загрузите скетч снова. Каждая карта при сканировании чередует IN и OUT, а повторное касание в течение 3 секунд игнорируется.",
        kk: "Әр картаны тигізіңіз: белгісіз карталар «unknown» атымен жазылып, олардың UID-і шығады, мысалы 04:A3:1B:72. UID-терді әр адамның атымен бірге скетчтегі KNOWN кестесіне көшіріп, скетчті қайта жүктеңіз. Әр карта әр сканерлеуде IN мен OUT-ты кезектестіреді, ал 3 секунд ішіндегі қайталама тию еленбейді.",
      },
      expect: { en: "Known cards show their name on the OLED with one high beep; unknown cards get a low beep.", ru: "Известные карты показывают имя на OLED и дают один высокий сигнал, неизвестные — низкий.", kk: "Белгілі карталар OLED-та атын көрсетіп, бір жіңішке дыбыс береді, белгісіздер — жуан дыбыс." },
      mistake: { en: "Card UIDs can be cloned, so use this for attendance, not for unlocking doors.", ru: "UID карты можно скопировать, поэтому используйте систему для учёта, а не для открывания дверей.", kk: "Карта UID-ін көшіруге болады, сондықтан жүйені есепке алу үшін қолданыңыз, есік ашуға емес." },
    },
    {
      title: { en: "Open the web table and export CSV", ru: "Откройте веб-таблицу и выгрузите CSV", kk: "Веб-кестені ашып, CSV-ге шығарыңыз" },
      body: {
        en: "Open the IP address from the Serial Monitor in a browser on the same network. The table lists the newest scans first and refreshes every 3 seconds. The \"Download CSV\" link saves the whole log for a spreadsheet. The log keeps the last 200 scans in RAM and is cleared on reset, so export it at the end of each day.",
        ru: "Откройте IP-адрес из Serial Monitor в браузере в той же сети. Таблица показывает свежие отметки сверху и обновляется каждые 3 секунды. Ссылка «Download CSV» сохраняет весь журнал для электронной таблицы. Журнал хранит последние 200 отметок в оперативной памяти и очищается при сбросе, поэтому выгружайте его в конце каждого дня.",
        kk: "Serial Monitor-дағы IP мекенжайын сол желідегі браузерде ашыңыз. Кесте жаңа белгілерді жоғарыда көрсетіп, әр 3 секунд сайын жаңарады. «Download CSV» сілтемесі бүкіл журналды электрондық кестеге сақтайды. Журнал соңғы 200 белгіні жедел жадта сақтайды және қайта іске қосқанда өшеді, сондықтан оны әр күннің соңында жүктеп алыңыз.",
      },
      expect: { en: "New scans appear in the browser without reloading the page.", ru: "Новые отметки появляются в браузере без перезагрузки страницы.", kk: "Жаңа белгілер бетті қайта жүктемей-ақ браузерде пайда болады." },
      mistake: { en: "Powering off before exporting loses the day's log.", ru: "Если выключить питание до выгрузки, журнал за день пропадёт.", kk: "Жүктеп алмай тұрып қуатты өшірсеңіз, күндік журнал жоғалады." },
    },
  ],
  code: [{
    filename: "rfid_attendance.ino",
    language: "cpp",
    libraries: ["MFRC522", "Adafruit SSD1306", "Adafruit GFX Library"],
    source: `#include <WiFi.h>
#include <WebServer.h>
#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <time.h>

// ---- your network and time zone ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";
const char* TZ_INFO = "<+05>-5";   // POSIX TZ: UTC+5. Moscow "MSK-3", Berlin "CET-1CEST,M3.5.0,M10.5.0/3"

const int SS_PIN = 5;       // RC522 SDA = SPI chip select (VSPI: SCK 18, MISO 19, MOSI 23)
const int RST_PIN = 27;     // RC522 RST
const int BUZZER_PIN = 25;  // passive buzzer +
const uint8_t OLED_ADDR = 0x3C;  // OLED on the default I2C bus (SDA 21, SCL 22)

struct Person { const char* uid; const char* name; };
Person KNOWN[] = {
  { "04:A3:1B:72", "Aigerim" },   // replace with your card UIDs
  { "93:5C:0E:1D", "Daniyar" },
};
const int KNOWN_COUNT = sizeof(KNOWN) / sizeof(KNOWN[0]);

struct Entry { time_t t; char uid[24]; const char* name; bool in; };
const int LOG_SIZE = 200;
Entry logBuf[LOG_SIZE];
int logCount = 0, logHead = 0;   // ring buffer

// IN/OUT state per seen UID
const int SEEN_MAX = 64;
char seenUid[SEEN_MAX][24];
bool seenIn[SEEN_MAX];
int seenCount = 0;

MFRC522 rfid(SS_PIN, RST_PIN);
Adafruit_SSD1306 oled(128, 64, &Wire, -1);
WebServer server(80);
char lastUid[24] = "";
unsigned long lastScanMs = 0, messageUntil = 0;

const char PAGE[] PROGMEM = R"HTML(<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Attendance</title>
<style>
body{font-family:system-ui,sans-serif;background:#0f1115;color:#eee;margin:0;padding:16px}
table{width:100%;border-collapse:collapse}td,th{padding:8px;border-bottom:1px solid #333;text-align:left}
th{color:#2ee6c9}.in{color:#7bd88f}.out{color:#ff7a1a}a{color:#2ee6c9}
</style></head><body>
<h1>Attendance</h1><p><a href="/log.csv">Download CSV</a></p>
<table><thead><tr><th>Time</th><th>Name</th><th>UID</th><th></th></tr></thead><tbody id="b"></tbody></table>
<script>
function cell(tr,text,cls){const td=document.createElement('td');td.textContent=text;if(cls)td.className=cls;tr.appendChild(td);}
function load(){fetch('/log.json').then(r=>r.json()).then(rows=>{
  const b=document.getElementById('b');b.replaceChildren();
  rows.forEach(e=>{const tr=document.createElement('tr');cell(tr,e.time);cell(tr,e.name);cell(tr,e.uid);
    cell(tr,e.in?'IN':'OUT',e.in?'in':'out');b.appendChild(tr);});
}).catch(()=>{});}
load();setInterval(load,3000);
</script></body></html>)HTML";

void formatTime(time_t t, char* out, size_t n) {
  if (t < 1700000000) { snprintf(out, n, "--:--"); return; }
  struct tm tmv;
  localtime_r(&t, &tmv);
  strftime(out, n, "%Y-%m-%d %H:%M:%S", &tmv);
}

const char* nameFor(const char* uid) {
  for (int i = 0; i < KNOWN_COUNT; i++) if (strcmp(KNOWN[i].uid, uid) == 0) return KNOWN[i].name;
  return "unknown";
}

bool toggleInOut(const char* uid) {
  for (int i = 0; i < seenCount; i++) {
    if (strcmp(seenUid[i], uid) == 0) { seenIn[i] = !seenIn[i]; return seenIn[i]; }
  }
  if (seenCount < SEEN_MAX) {
    strncpy(seenUid[seenCount], uid, 23);
    seenUid[seenCount][23] = 0;
    seenIn[seenCount] = true;
    seenCount++;
  }
  return true;
}

// i = 0 is the newest entry
const Entry& entryAt(int i) { return logBuf[(logHead - 1 - i + LOG_SIZE) % LOG_SIZE]; }

void handleJson() {
  String out = "[";
  char ts[24];
  for (int i = 0; i < logCount; i++) {
    const Entry& e = entryAt(i);
    formatTime(e.t, ts, sizeof ts);
    if (i) out += ",";
    out += "{\\"time\\":\\""; out += ts; out += "\\",\\"name\\":\\""; out += e.name;
    out += "\\",\\"uid\\":\\""; out += e.uid; out += "\\",\\"in\\":"; out += e.in ? "true}" : "false}";
  }
  out += "]";
  server.send(200, "application/json", out);
}

void handleCsv() {
  String out = "time,name,uid,direction\\n";
  char ts[24];
  for (int i = logCount - 1; i >= 0; i--) {   // oldest first
    const Entry& e = entryAt(i);
    formatTime(e.t, ts, sizeof ts);
    out += ts; out += ","; out += e.name; out += ","; out += e.uid; out += e.in ? ",IN\\n" : ",OUT\\n";
  }
  server.sendHeader("Content-Disposition", "attachment; filename=attendance.csv");
  server.send(200, "text/csv", out);
}

void showIdle() {
  oled.clearDisplay();
  oled.setTextColor(SSD1306_WHITE);
  oled.setTextSize(1);
  oled.setCursor(0, 0);
  oled.print("Scan card");
  struct tm tmv;
  if (getLocalTime(&tmv, 0)) {
    char hm[6];
    strftime(hm, sizeof hm, "%H:%M", &tmv);
    oled.setTextSize(3);
    oled.setCursor(20, 28);
    oled.print(hm);
  }
  oled.display();
}

void showScan(const char* name, bool in, const char* uid) {
  oled.clearDisplay();
  oled.setTextSize(2);
  oled.setCursor(0, 0);
  oled.print(name);
  oled.setCursor(0, 24);
  oled.print(in ? "IN" : "OUT");
  oled.setTextSize(1);
  oled.setCursor(0, 52);
  oled.print(uid);
  oled.display();
}

void setup() {
  Serial.begin(115200);
  pinMode(BUZZER_PIN, OUTPUT);

  if (!oled.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR)) Serial.println("OLED not found, check SDA/SCL and address");
  oled.clearDisplay();
  oled.display();

  SPI.begin();
  rfid.PCD_Init();
  Serial.printf("RC522 version 0x%02X\\n", rfid.PCD_ReadRegister(MFRC522::VersionReg));

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.printf("Connecting to %s", WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.printf("\\nWi-Fi OK, log page: http://%s/\\n", WiFi.localIP().toString().c_str());

  configTzTime(TZ_INFO, "pool.ntp.org", "time.google.com");
  struct tm tmv;
  if (getLocalTime(&tmv, 10000)) {
    char ts[24];
    strftime(ts, sizeof ts, "%Y-%m-%d %H:%M:%S", &tmv);
    Serial.printf("time synced: %s\\n", ts);
  } else {
    Serial.println("NTP failed, logging without time");
  }

  server.on("/", HTTP_GET, []() { server.send_P(200, "text/html", PAGE); });
  server.on("/log.json", HTTP_GET, handleJson);
  server.on("/log.csv", HTTP_GET, handleCsv);
  server.begin();
  showIdle();
}

void loop() {
  server.handleClient();

  static unsigned long lastIdle = 0;
  if (millis() > messageUntil && millis() - lastIdle > 1000) { lastIdle = millis(); showIdle(); }

  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;

  char uid[24] = "";
  for (byte i = 0; i < rfid.uid.size && i < 7; i++) {
    char part[4];
    snprintf(part, sizeof part, i ? ":%02X" : "%02X", rfid.uid.uidByte[i]);
    strcat(uid, part);
  }
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();

  if (strcmp(uid, lastUid) == 0 && millis() - lastScanMs < 3000) return;   // same card held on the reader
  strcpy(lastUid, uid);
  lastScanMs = millis();

  const char* name = nameFor(uid);
  bool in = toggleInOut(uid);
  Entry& e = logBuf[logHead];
  e.t = time(nullptr);
  strcpy(e.uid, uid);
  e.name = name;
  e.in = in;
  logHead = (logHead + 1) % LOG_SIZE;
  if (logCount < LOG_SIZE) logCount++;

  char ts[24];
  formatTime(e.t, ts, sizeof ts);
  Serial.printf("%s  %s  %s  %s\\n", ts, uid, name, in ? "IN" : "OUT");
  showScan(name, in, uid);
  messageUntil = millis() + 2500;
  tone(BUZZER_PIN, strcmp(name, "unknown") == 0 ? 400 : 2000, 120);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "No card is ever detected", ru: "Карты не определяются вообще", kk: "Карталар мүлде анықталмайды" },
      cause: { en: "The RC522 header is not soldered, or the reader got 5 V once and is damaged.", ru: "Разъём RC522 не припаян или считыватель однажды получил 5 В и повреждён.", kk: "RC522 ажыратқышы дәнекерленбеген немесе оқығышқа бір рет 5 В берілген және ол бүлінген." },
      fix: { en: "Solder the pin header properly and check that the version line shows 0x91 or 0x92. 0x00/0xFF means wiring; replace a reader that was fed 5 V.", ru: "Хорошо пропаяйте штыревой разъём и проверьте, что строка версии показывает 0x91 или 0x92. 0x00/0xFF — ошибка проводки; считыватель, получивший 5 В, замените.", kk: "Түйреуіш ажыратқышты жақсылап дәнекерлеп, нұсқа жолында 0x91 немесе 0x92 тұрғанын тексеріңіз. 0x00/0xFF — сымдағы қате; 5 В алған оқығышты ауыстырыңыз." },
    },
    {
      symptom: { en: "Reading works only when the card touches the antenna", ru: "Чтение работает только вплотную к антенне", kk: "Тек антеннаға тигізгенде ғана оқиды" },
      cause: { en: "Metal behind the reader or long jumper wires detune the 13.56 MHz antenna.", ru: "Металл за считывателем или длинные провода расстраивают антенну 13,56 МГц.", kk: "Оқығыштың артындағы металл немесе ұзын сымдар 13,56 МГц антеннасын бұзады." },
      fix: { en: "Keep metal at least 2 cm away and use wires shorter than 15 cm.", ru: "Уберите металл минимум на 2 см и используйте провода короче 15 см.", kk: "Металды кемінде 2 см алыстатып, 15 см-ден қысқа сымдарды пайдаланыңыз." },
    },
    {
      symptom: { en: "Times are wrong by a few hours", ru: "Время сдвинуто на несколько часов", kk: "Уақыт бірнеше сағатқа ауытқыған" },
      cause: { en: "TZ_INFO does not match your zone. POSIX signs are inverted: UTC+5 is written \"-5\".", ru: "TZ_INFO не соответствует вашему поясу. Знаки в POSIX обратные: UTC+5 пишется как «-5».", kk: "TZ_INFO сіздің белдеуіңізге сәйкес келмейді. POSIX-те таңбалар керісінше: UTC+5 «-5» деп жазылады." },
      fix: { en: "Set the correct POSIX string for your city and upload again.", ru: "Задайте правильную строку POSIX для своего города и загрузите скетч снова.", kk: "Қалаңызға дұрыс POSIX жолын жазып, скетчті қайта жүктеңіз." },
    },
    {
      symptom: { en: "The OLED stays dark", ru: "OLED не включается", kk: "OLED жанбайды" },
      cause: { en: "Wrong I2C address or SDA/SCL swapped.", ru: "Неверный адрес I2C или перепутаны SDA и SCL.", kk: "I2C мекенжайы қате немесе SDA мен SCL ауысып кеткен." },
      fix: { en: "Check SDA → GPIO21, SCL → GPIO22, and try OLED_ADDR = 0x3D.", ru: "Проверьте SDA → GPIO21, SCL → GPIO22 и попробуйте OLED_ADDR = 0x3D.", kk: "SDA → GPIO21, SCL → GPIO22 екенін тексеріп, OLED_ADDR = 0x3D қойып көріңіз." },
    },
  ],
  safety: [
    { en: "Power the RC522 only from 3V3. Its chip has no regulator and 5 V damages it.", ru: "Питайте RC522 только от 3V3: у него нет стабилизатора, и 5 В его повреждает.", kk: "RC522-ні тек 3V3-тен қоректендіріңіз: оның тұрақтандырғышы жоқ, 5 В оны бүлдіреді." },
    { en: "The log holds names and times of real people: keep the page on your local network and delete old exports you no longer need.", ru: "Журнал содержит имена и время реальных людей: держите страницу в локальной сети и удаляйте ненужные старые выгрузки.", kk: "Журналда нақты адамдардың аты мен уақыты бар: бетті жергілікті желіде ұстап, қажет емес ескі жүктемелерді жойыңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "RC522 version 0x92",
      "Connecting to YOUR_WIFI....",
      "Wi-Fi OK, log page: http://192.168.1.60/",
      "time synced: 2026-10-26 08:57:12",
      "2026-10-26 08:58:03  04:A3:1B:72  Aigerim  IN",
      "2026-10-26 09:01:44  93:5C:0E:1D  Daniyar  IN",
      "2026-10-26 09:02:10  7F:21:9A:03  unknown  IN",
      "2026-10-26 13:15:37  04:A3:1B:72  Aigerim  OUT",
    ],
    leds: [],
  },
} satisfies GuideContent;
