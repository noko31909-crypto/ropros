import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-epaper-calendar",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "displays",
  robotics: false,
  difficulty: "advanced",
  hours: 5,
  costUsd: 26,
  xpReward: 380,
  title: {
    en: "ESP32 E-Paper Calendar and Weather",
    ru: "Календарь с погодой на e-paper и ESP32",
    kk: "ESP32 мен e-paper негізіндегі ауа райы бар күнтізбе",
  },
  summary: {
    en: "A 2.9\" e-paper screen shows the weekday, date and today's weather from Open-Meteo. The ESP32 syncs time over NTP, redraws on the hour and spends the rest of the hour in deep sleep; the screen keeps the picture without power.",
    ru: "Экран e-paper 2,9\" показывает день недели, дату и погоду на сегодня от Open-Meteo. ESP32 сверяет время по NTP, перерисовывает экран каждый час и остальное время проводит в глубоком сне; экран держит картинку без питания.",
    kk: "2,9\" e-paper экраны апта күнін, күнді және Open-Meteo-дан бүгінгі ауа райын көрсетеді. ESP32 уақытты NTP арқылы нақтылап, экранды әр сағат сайын қайта салады да, қалған уақытты терең ұйқыда өткізеді; экран суретті қуатсыз ұстап тұрады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit (WROOM-32, no PSRAM)", ru: "ESP32 DevKit (WROOM-32, без PSRAM)", kk: "ESP32 DevKit (WROOM-32, PSRAM-сыз)" }, role: { en: "Wi-Fi, clock and display driver", ru: "Wi-Fi, часы и управление дисплеем", kk: "Wi-Fi, сағат және дисплейді басқару" } },
    { component: "e-paper-2in9", qty: 1, spec: { en: "Waveshare 2.9\" V2 b/w, 296×128, SPI module with 8-wire cable", ru: "Waveshare 2,9\" V2, ч/б, 296×128, модуль SPI с 8-проводным шлейфом", kk: "Waveshare 2,9\" V2, а/қ, 296×128, 8 сымды шлейфі бар SPI модулі" }, role: { en: "Calendar screen that keeps its image unpowered", ru: "Экран календаря, который держит изображение без питания", kk: "Суретті қуатсыз ұстайтын күнтізбе экраны" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V USB charger + cable", ru: "USB-зарядка 5 В + кабель", kk: "5 В USB зарядтағыш + кабель" }, role: { en: "Powers the ESP32 through its USB port", ru: "Питает ESP32 через USB-порт", kk: "ESP32-ні USB порты арқылы қоректендіреді" } },
    { component: "jumper-wires", qty: 8, spec: { en: "female-female, or use the module's own cable", ru: "мама-мама или родной шлейф модуля", kk: "аналық-аналық немесе модульдің өз шлейфі" }, role: { en: "SPI connections", ru: "Соединения SPI", kk: "SPI қосылыстары" } },
    { component: "enclosure", qty: 1, spec: { en: "picture frame or 3D-printed desk stand", ru: "фоторамка или подставка на 3D-принтере", kk: "фоторамка немесе 3D-принтерде басылған тұғыр" }, role: { en: "Desk housing", ru: "Настольный корпус", kk: "Үстел корпусы" }, optional: true },
  ],
  instances: [
    { id: "epd", component: "e-paper-2in9", label: "2.9\" e-paper" },
  ],
  connections: [
    { from: "board.3V3", to: "epd.VCC", color: "gray" },
    { from: "epd.GND", to: "board.GND", color: "brown" },
    { from: "epd.DIN", to: "board.GPIO23", color: "blue", note: { en: "VSPI MOSI", ru: "VSPI MOSI", kk: "VSPI MOSI" } },
    { from: "epd.CLK", to: "board.GPIO18", color: "yellow", note: { en: "VSPI SCK", ru: "VSPI SCK", kk: "VSPI SCK" } },
    { from: "epd.CS", to: "board.GPIO5", color: "orange" },
    { from: "epd.DC", to: "board.GPIO17", color: "green" },
    { from: "epd.RST", to: "board.GPIO16", color: "white" },
    { from: "epd.BUSY", to: "board.GPIO4", color: "purple", note: { en: "HIGH while the panel is refreshing", ru: "HIGH, пока панель обновляется", kk: "панель жаңарып жатқанда HIGH" } },
  ],
  steps: [
    {
      title: { en: "Identify the panel version", ru: "Определите версию панели", kk: "Панель нұсқасын анықтаңыз" },
      body: {
        en: "Look at the sticker on the back of the Waveshare module. Current modules say \"V2\" and use the SSD1680 controller; the sketch is set up for that (GxEPD2_290_T94_V2). Older modules without \"V2\" need GxEPD2_290 in the two places where the display type is named. The wrong driver usually shows nothing or a garbled half-image.",
        ru: "Посмотрите на наклейку на обратной стороне модуля Waveshare. На современных модулях написано «V2», у них контроллер SSD1680; скетч настроен на него (GxEPD2_290_T94_V2). Для старых модулей без «V2» в двух местах, где указан тип дисплея, нужен GxEPD2_290. Неверный драйвер обычно не показывает ничего или выводит испорченную половину картинки.",
        kk: "Waveshare модулінің артындағы жапсырманы қараңыз. Қазіргі модульдерде «V2» деп жазылған, оларда SSD1680 контроллері бар; скетч соған бапталған (GxEPD2_290_T94_V2). «V2» жазуы жоқ ескі модульдерге дисплей түрі көрсетілген екі жерде GxEPD2_290 керек. Қате драйвер көбіне ештеңе көрсетпейді немесе суреттің бұзылған жартысын шығарады.",
      },
      expect: { en: "You know whether you have V1 or V2.", ru: "Вы знаете, какая у вас версия: V1 или V2.", kk: "Сізде V1 не V2 екенін білесіз." },
      mistake: { en: "The 2.9\" three-colour (black/white/red) panel is a different product and needs the GxEPD2_3C class with its own 3-colour driver.", ru: "Трёхцветная (чёрный/белый/красный) панель 2,9\" — другой товар, ей нужен класс GxEPD2_3C со своим трёхцветным драйвером.", kk: "Үш түсті (қара/ақ/қызыл) 2,9\" панель — басқа тауар, оған өзінің үш түсті драйвері бар GxEPD2_3C класы керек." },
    },
    {
      title: { en: "Wire the display to VSPI", ru: "Подключите дисплей к VSPI", kk: "Дисплейді VSPI-ге қосыңыз" },
      body: {
        en: "Connect VCC to 3V3 and GND to GND. The SPI data lines go to the default VSPI pins: DIN → GPIO23 and CLK → GPIO18. Then CS → GPIO5, DC → GPIO17, RST → GPIO16 and BUSY → GPIO4. The display only receives data, so no MISO wire is needed. Keep the flat cable and wires under 20 cm.",
        ru: "Подключите VCC к 3V3, GND к GND. Линии данных SPI идут на стандартные пины VSPI: DIN → GPIO23, CLK → GPIO18. Затем CS → GPIO5, DC → GPIO17, RST → GPIO16, BUSY → GPIO4. Дисплей только принимает данные, поэтому провод MISO не нужен. Шлейф и провода должны быть короче 20 см.",
        kk: "VCC-ті 3V3-ке, GND-ні GND-ге қосыңыз. SPI деректер сызықтары VSPI стандартты пиндеріне барады: DIN → GPIO23, CLK → GPIO18. Содан кейін CS → GPIO5, DC → GPIO17, RST → GPIO16, BUSY → GPIO4. Дисплей деректерді тек қабылдайды, сондықтан MISO сымы керек емес. Шлейф пен сымдар 20 см-ден қысқа болсын.",
      },
      expect: { en: "Eight wires, matching colours on the Waveshare cable: grey VCC, brown GND, blue DIN, yellow CLK, orange CS, green DC, white RST, purple BUSY.", ru: "Восемь проводов, цвета как на шлейфе Waveshare: серый VCC, коричневый GND, синий DIN, жёлтый CLK, оранжевый CS, зелёный DC, белый RST, фиолетовый BUSY.", kk: "Сегіз сым, түстері Waveshare шлейфіндегідей: сұр VCC, қоңыр GND, көк DIN, сары CLK, қызғылт сары CS, жасыл DC, ақ RST, күлгін BUSY." },
      mistake: { en: "On ESP32-WROVER boards GPIO16/17 belong to PSRAM; there move DC and RST to GPIO22 and GPIO21 and change the sketch.", ru: "На платах ESP32-WROVER GPIO16/17 заняты PSRAM; там перенесите DC и RST на GPIO22 и GPIO21 и поправьте скетч.", kk: "ESP32-WROVER платаларында GPIO16/17-ні PSRAM алып тұр; онда DC мен RST-ты GPIO22 мен GPIO21-ге ауыстырып, скетчті түзетіңіз." },
    },
    {
      title: { en: "Install libraries and set your location", ru: "Установите библиотеки и задайте местоположение", kk: "Кітапханаларды орнатып, орналасқан жеріңізді көрсетіңіз" },
      body: {
        en: "Install GxEPD2, Adafruit GFX Library and ArduinoJson (version 7) from the Library Manager. Enter your Wi-Fi, TZ_INFO (\"<+05>-5\" for UTC+5, \"MSK-3\" for Moscow) and your LATITUDE and LONGITUDE in decimal degrees; you can copy them from any map app. Open-Meteo is free for personal use and needs no API key.",
        ru: "Установите через Library Manager библиотеки GxEPD2, Adafruit GFX Library и ArduinoJson (версии 7). Впишите Wi-Fi, TZ_INFO («<+05>-5» для UTC+5, «MSK-3» для Москвы) и свои LATITUDE и LONGITUDE в десятичных градусах; их можно скопировать из любого приложения карт. Open-Meteo бесплатен для личного использования и не требует ключа API.",
        kk: "Library Manager арқылы GxEPD2, Adafruit GFX Library және ArduinoJson (7-нұсқа) кітапханаларын орнатыңыз. Wi-Fi-ды, TZ_INFO-ны (UTC+5 үшін «<+05>-5», Мәскеу үшін «MSK-3») және ондық градустағы LATITUDE мен LONGITUDE-ті жазыңыз; оларды кез келген карта қолданбасынан көшіруге болады. Open-Meteo жеке пайдалануға тегін және API кілтін қажет етпейді.",
      },
      expect: { en: "The sketch compiles; the coordinates point to your city.", ru: "Скетч компилируется, координаты указывают на ваш город.", kk: "Скетч компиляцияланады, координаттар сіздің қалаңызды көрсетеді." },
      mistake: { en: "Swapping latitude and longitude gives weather for a point in the ocean.", ru: "Если перепутать широту и долготу, получите погоду где-то в океане.", kk: "Ендік пен бойлықты шатастырсаңыз, мұхиттың бір жерінің ауа райын аласыз." },
    },
    {
      title: { en: "Upload and watch the first refresh", ru: "Загрузите скетч и посмотрите первое обновление", kk: "Скетчті жүктеп, алғашқы жаңартуды қараңыз" },
      body: {
        en: "Upload with \"ESP32 Dev Module\" and open the Serial Monitor at 115200 baud. The board connects, prints the NTP time and the weather, and redraws the screen. A full e-paper refresh flashes black and white several times for about 3 seconds: that is normal and clears ghosting. Then the board prints how long it will sleep and goes dark.",
        ru: "Загрузите с выбранной платой «ESP32 Dev Module» и откройте Serial Monitor на 115200 бод. Плата подключится, напечатает время NTP и погоду и перерисует экран. Полное обновление e-paper несколько раз мигает чёрным и белым около 3 секунд: это нормально и убирает остаточное изображение. Затем плата печатает, сколько будет спать, и затихает.",
        kk: "«ESP32 Dev Module» таңдалған күйде жүктеп, Serial Monitor-ды 115200 бодта ашыңыз. Плата қосылып, NTP уақыты мен ауа райын шығарады да, экранды қайта салады. E-paper-дің толық жаңаруы шамамен 3 секунд бойы бірнеше рет ақ-қара жыпылықтайды: бұл қалыпты, ол қалдық суретті тазартады. Содан кейін плата қанша ұйықтайтынын шығарып, тынышталады.",
      },
      expect: { en: "The screen shows the weekday, a large date, temperature with high/low and \"updated HH:00\".", ru: "На экране день недели, крупная дата, температура с максимумом/минимумом и «updated HH:00».", kk: "Экранда апта күні, ірі күн, ең жоғары/ең төмен мәндері бар температура және «updated HH:00» тұрады." },
      mistake: { en: "\"Busy Timeout!\" in the monitor means BUSY or RST is miswired, or the driver class does not match the panel.", ru: "«Busy Timeout!» в мониторе значит, что неверно подключены BUSY или RST либо класс драйвера не подходит к панели.", kk: "Монитордағы «Busy Timeout!» BUSY не RST қате қосылғанын немесе драйвер класы панельге сәйкес емесін білдіреді." },
    },
    {
      title: { en: "Hourly deep-sleep cycle", ru: "Ежечасный цикл глубокого сна", kk: "Сағат сайынғы терең ұйқы циклі" },
      body: {
        en: "Each wake-up runs setup() from the start: Wi-Fi, NTP, weather, redraw, then deep sleep until a few seconds past the next full hour. The sleep timer drifts slightly, so the time is re-synced on every wake. If Wi-Fi is down, the screen still updates the date from the ESP32's own clock and shows the last weather with \"(offline)\". To upload new code while it sleeps, press EN first.",
        ru: "Каждое пробуждение запускает setup() с начала: Wi-Fi, NTP, погода, перерисовка, затем глубокий сон до нескольких секунд после следующего ровного часа. Таймер сна немного уходит, поэтому время сверяется при каждом пробуждении. Если Wi-Fi недоступен, экран всё равно обновляет дату по собственным часам ESP32 и показывает последнюю погоду с пометкой «(offline)». Чтобы загрузить новый код во время сна, сначала нажмите EN.",
        kk: "Әр оянуда setup() басынан орындалады: Wi-Fi, NTP, ауа райы, қайта салу, содан кейін келесі толық сағаттан бірнеше секунд өткенге дейін терең ұйқы. Ұйқы таймері сәл ауытқиды, сондықтан уақыт әр оянуда нақтыланады. Wi-Fi болмаса да, экран күнді ESP32-нің өз сағаты бойынша жаңартады және соңғы ауа райын «(offline)» белгісімен көрсетеді. Ұйықтап жатқанда жаңа кодты жүктеу үшін алдымен EN басыңыз.",
      },
      expect: { en: "The Serial Monitor shows a new wake number every hour, and the screen changes at the full hour.", ru: "Serial Monitor каждый час показывает новый номер пробуждения, а экран меняется в начале часа.", kk: "Serial Monitor әр сағат сайын жаңа ояну нөмірін көрсетеді, ал экран сағат басында өзгереді." },
      mistake: { en: "Running from a battery: the DevKit's regulator and USB chip draw milliamps in sleep. For months on a battery use a bare ESP32 module with a low-quiescent regulator.", ru: "Работа от батареи: стабилизатор и USB-микросхема DevKit во сне потребляют миллиамперы. Для месяцев на батарее нужен голый модуль ESP32 со стабилизатором с малым током покоя.", kk: "Батареядан жұмыс: DevKit тұрақтандырғышы мен USB микросхемасы ұйқыда миллиампер тұтынады. Батареямен айлап жұмыс істеу үшін тыныштық тогы аз тұрақтандырғышы бар жалаң ESP32 модулі керек." },
    },
  ],
  code: [{
    filename: "epaper_calendar.ino",
    language: "cpp",
    libraries: ["GxEPD2", "Adafruit GFX Library", "ArduinoJson"],
    source: `#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <GxEPD2_BW.h>
#include <Fonts/FreeSansBold24pt7b.h>
#include <Fonts/FreeSansBold12pt7b.h>
#include <Fonts/FreeSans9pt7b.h>
#include <time.h>

// ---- your settings ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";
const char* TZ_INFO = "<+05>-5";    // POSIX TZ (UTC+5). Moscow "MSK-3", Berlin "CET-1CEST,M3.5.0,M10.5.0/3"
const float LATITUDE = 43.2389;     // your location in decimal degrees
const float LONGITUDE = 76.8897;

// display on the default SPI bus (VSPI: CLK 18, DIN 23) plus four control lines
const int CS_PIN = 5, DC_PIN = 17, RST_PIN = 16, BUSY_PIN = 4;
// Waveshare 2.9" V2 (SSD1680). Older V1 panel: replace both GxEPD2_290_T94_V2 with GxEPD2_290
GxEPD2_BW<GxEPD2_290_T94_V2, GxEPD2_290_T94_V2::HEIGHT> display(GxEPD2_290_T94_V2(CS_PIN, DC_PIN, RST_PIN, BUSY_PIN));

// kept in RTC memory across deep sleep
RTC_DATA_ATTR int wakeCount = 0;
RTC_DATA_ATTR bool haveWeather = false;
RTC_DATA_ATTR float curTemp = 0, maxTemp = 0, minTemp = 0;
RTC_DATA_ATTR int weatherCode = 0;

const char* describe(int c) {   // WMO weather codes used by Open-Meteo
  if (c == 0) return "Clear sky";
  if (c == 1) return "Mainly clear";
  if (c == 2) return "Partly cloudy";
  if (c == 3) return "Overcast";
  if (c == 45 || c == 48) return "Fog";
  if (c >= 51 && c <= 55) return "Drizzle";
  if (c == 56 || c == 57) return "Freezing drizzle";
  if (c >= 61 && c <= 65) return "Rain";
  if (c == 66 || c == 67) return "Freezing rain";
  if (c >= 71 && c <= 77) return "Snow";
  if (c >= 80 && c <= 82) return "Rain showers";
  if (c == 85 || c == 86) return "Snow showers";
  if (c >= 95) return "Thunderstorm";
  return "Unknown";
}

bool connectWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) delay(200);
  bool ok = WiFi.status() == WL_CONNECTED;
  Serial.println(ok ? "Wi-Fi OK" : "Wi-Fi failed, using the internal clock");
  return ok;
}

bool fetchWeather() {
  char url[256];
  snprintf(url, sizeof url,
           "https://api.open-meteo.com/v1/forecast?latitude=%.4f&longitude=%.4f"
           "&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min"
           "&timezone=auto&forecast_days=1", LATITUDE, LONGITUDE);
  WiFiClientSecure tls;
  tls.setInsecure();   // public weather data and no credentials are sent; use setCACert() to pin the server
  HTTPClient http;
  if (!http.begin(tls, url)) return false;
  int status = http.GET();
  if (status != 200) {
    Serial.printf("weather HTTP %d\\n", status);
    http.end();
    return false;
  }
  JsonDocument doc;
  DeserializationError err = deserializeJson(doc, http.getString());
  http.end();
  if (err || doc["current"]["temperature_2m"].isNull()) {
    Serial.println("weather JSON error");
    return false;
  }
  curTemp = doc["current"]["temperature_2m"].as<float>();
  weatherCode = doc["current"]["weather_code"].as<int>();
  maxTemp = doc["daily"]["temperature_2m_max"][0].as<float>();
  minTemp = doc["daily"]["temperature_2m_min"][0].as<float>();
  haveWeather = true;
  Serial.printf("weather: %.1f C, code %d (%s), %.1f / %.1f C\\n", curTemp, weatherCode, describe(weatherCode), maxTemp, minTemp);
  return true;
}

void degreeAt(int x, int y) {
  display.drawCircle(x, y, 5, GxEPD_BLACK);
  display.drawCircle(x, y, 4, GxEPD_BLACK);
}

void drawScreen(const struct tm& t, bool timeOk, bool fresh) {
  display.setRotation(1);   // landscape 296 x 128
  display.setFullWindow();
  display.firstPage();
  do {
    display.fillScreen(GxEPD_WHITE);
    display.setTextColor(GxEPD_BLACK);
    char buf[32];

    if (timeOk) {
      display.setFont(&FreeSansBold12pt7b);
      strftime(buf, sizeof buf, "%A", &t);
      display.setCursor(6, 26);
      display.print(buf);
      display.setFont(&FreeSansBold24pt7b);
      display.setCursor(6, 80);
      display.print(t.tm_mday);
      display.setFont(&FreeSans9pt7b);
      strftime(buf, sizeof buf, "%B %Y", &t);
      display.setCursor(6, 108);
      display.print(buf);
    } else {
      display.setFont(&FreeSans9pt7b);
      display.setCursor(6, 64);
      display.print("No time yet");
    }

    display.drawLine(142, 8, 142, 120, GxEPD_BLACK);

    if (haveWeather) {
      display.setFont(&FreeSansBold24pt7b);
      display.setCursor(152, 54);
      display.print((int)lroundf(curTemp));
      degreeAt(display.getCursorX() + 8, 24);
      display.setFont(&FreeSans9pt7b);
      display.setCursor(152, 80);
      display.print(describe(weatherCode));
      snprintf(buf, sizeof buf, "%d / %d", (int)lroundf(maxTemp), (int)lroundf(minTemp));
      display.setCursor(152, 102);
      display.print(buf);
    } else {
      display.setFont(&FreeSans9pt7b);
      display.setCursor(152, 64);
      display.print("No weather");
    }

    display.setFont();   // built-in 6x8 font
    display.setCursor(152, 114);
    if (timeOk) strftime(buf, sizeof buf, "updated %H:%M", &t);
    else snprintf(buf, sizeof buf, "updated --:--");
    if (!fresh) strncat(buf, " (offline)", sizeof buf - strlen(buf) - 1);
    display.print(buf);
  } while (display.nextPage());
  display.hibernate();
  Serial.println("display updated");
}

void sleepUntilNextHour() {
  struct tm t;
  uint64_t secs = 3600;
  int nextHour = -1;
  if (getLocalTime(&t, 0) && t.tm_year > 120) {
    secs = 3600 - (t.tm_min * 60 + t.tm_sec) + 5;   // wake a few seconds after the full hour
    nextHour = (t.tm_hour + 1) % 24;
  }
  Serial.printf("sleeping %llu s until %02d:00\\n", secs, nextHour);
  Serial.flush();
  esp_sleep_enable_timer_wakeup(secs * 1000000ULL);
  esp_deep_sleep_start();
}

void setup() {
  Serial.begin(115200);
  wakeCount++;
  Serial.printf("wake #%d\\n", wakeCount);
  display.init(115200, true, 2, false);   // Waveshare boards: 2 ms reset pulse

  setenv("TZ", TZ_INFO, 1);   // the clock keeps running in deep sleep; set the zone before reading it
  tzset();
  bool fresh = false;
  if (connectWiFi()) {
    configTzTime(TZ_INFO, "pool.ntp.org", "time.google.com");
    struct tm probe;
    if (getLocalTime(&probe, 10000)) {
      char ts[20];
      strftime(ts, sizeof ts, "%Y-%m-%d %H:%M:%S", &probe);
      Serial.printf("time: %s\\n", ts);
    }
    fresh = fetchWeather();
    WiFi.disconnect(true);
    WiFi.mode(WIFI_OFF);
  }

  struct tm now;
  bool timeOk = getLocalTime(&now, 0) && now.tm_year > 120;
  drawScreen(now, timeOk, fresh);
  sleepUntilNextHour();
}

void loop() {
  // never reached: the board deep-sleeps at the end of setup()
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The screen stays blank and the monitor shows \"Busy Timeout!\"", ru: "Экран пустой, а монитор пишет «Busy Timeout!»", kk: "Экран бос, ал монитор «Busy Timeout!» деп жазады" },
      cause: { en: "BUSY or RST is on the wrong pin, or the driver class does not match the panel version.", ru: "BUSY или RST на неверном пине или класс драйвера не соответствует версии панели.", kk: "BUSY немесе RST басқа пинде, не драйвер класы панель нұсқасына сәйкес емес." },
      fix: { en: "Check BUSY → GPIO4 and RST → GPIO16, then try GxEPD2_290 instead of GxEPD2_290_T94_V2.", ru: "Проверьте BUSY → GPIO4 и RST → GPIO16, затем попробуйте GxEPD2_290 вместо GxEPD2_290_T94_V2.", kk: "BUSY → GPIO4 және RST → GPIO16 екенін тексеріп, GxEPD2_290_T94_V2 орнына GxEPD2_290 қойып көріңіз." },
    },
    {
      symptom: { en: "Weather shows \"No weather\" or \"(offline)\" every hour", ru: "Каждый час показывается «No weather» или «(offline)»", kk: "Әр сағат сайын «No weather» немесе «(offline)» көрсетіледі" },
      cause: { en: "Wi-Fi fails within 15 s, or the HTTP request is rejected (look for \"weather HTTP\" in the monitor).", ru: "Wi-Fi не подключается за 15 с или HTTP-запрос отклонён (ищите «weather HTTP» в мониторе).", kk: "Wi-Fi 15 с ішінде қосылмайды немесе HTTP сұрауы қабылданбайды (монитордан «weather HTTP» іздеңіз)." },
      fix: { en: "Move closer to the router, check the SSID, and make sure LATITUDE/LONGITUDE are valid numbers.", ru: "Поставьте ближе к роутеру, проверьте SSID и убедитесь, что LATITUDE/LONGITUDE — корректные числа.", kk: "Роутерге жақынырақ қойып, SSID-ті тексеріңіз және LATITUDE/LONGITUDE дұрыс сандар екеніне көз жеткізіңіз." },
    },
    {
      symptom: { en: "Faint traces of the old image remain", ru: "Остаются бледные следы старого изображения", kk: "Ескі суреттің бозғылт іздері қалады" },
      cause: { en: "Ghosting from partial refreshes or cold temperatures.", ru: "Остаточное изображение от частичных обновлений или холода.", kk: "Ішінара жаңартудан немесе суықтан қалған із." },
      fix: { en: "The sketch always does a full refresh; keep the panel above 0 °C and out of direct sun.", ru: "Скетч всегда делает полное обновление; держите панель при температуре выше 0 °C и вне прямого солнца.", kk: "Скетч әрдайым толық жаңарту жасайды; панельді 0 °C-тан жоғары температурада және тікелей күн сәулесінен тыс ұстаңыз." },
    },
    {
      symptom: { en: "The date is wrong for the first hours after midnight", ru: "После полуночи несколько часов неверная дата", kk: "Түн ортасынан кейін бірнеше сағат күн қате" },
      cause: { en: "TZ_INFO does not match your zone, so the ESP32 changes the date at UTC midnight.", ru: "TZ_INFO не соответствует вашему поясу, и ESP32 меняет дату в полночь по UTC.", kk: "TZ_INFO сіздің белдеуіңізге сәйкес емес, сондықтан ESP32 күнді UTC бойынша түн ортасында ауыстырады." },
      fix: { en: "Set the POSIX string for your zone; note the inverted sign (UTC+5 is \"-5\").", ru: "Задайте строку POSIX для вашего пояса; знак в ней обратный (UTC+5 — это «-5»).", kk: "Белдеуіңізге POSIX жолын жазыңыз; ондағы таңба керісінше (UTC+5 — «-5»)." },
    },
  ],
  safety: [
    { en: "The e-paper glass is thin: mount it in a frame without pressing on the panel, and never bend the flat cable sharply.", ru: "Стекло e-paper тонкое: закрепите его в рамке без давления на панель и не перегибайте шлейф.", kk: "E-paper шынысы жұқа: оны панельге қысым түсірмей рамкаға бекітіңіз және шлейфті күрт бүкпеңіз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "wake #1",
      "Wi-Fi OK",
      "time: 2026-10-26 14:00:04",
      "weather: 6.4 C, code 3 (Overcast), 9.1 / 1.8 C",
      "display updated",
      "sleeping 3596 s until 15:00",
      "wake #2",
      "Wi-Fi OK",
      "time: 2026-10-26 15:00:07",
      "weather: 7.0 C, code 2 (Partly cloudy), 9.1 / 1.8 C",
      "display updated",
      "sleeping 3593 s until 16:00",
    ],
    leds: [],
  },
} satisfies GuideContent;
