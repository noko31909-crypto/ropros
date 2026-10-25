import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp8266-wifi-thermometer",
  status: "unverified",
  platform: "esp32",
  board: "esp8266-nodemcu",
  category: "iot",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 11,
  xpReward: 140,
  title: {
    en: "ESP8266 Wi-Fi Thermometer",
    ru: "Wi-Fi термометр на ESP8266",
    kk: "ESP8266 негізіндегі Wi-Fi термометр",
  },
  summary: {
    en: "A NodeMCU reads a DHT22, shows temperature and humidity on an OLED and serves a live web page plus a JSON endpoint for your phone or home server.",
    ru: "NodeMCU читает DHT22, показывает температуру и влажность на OLED и отдаёт живую веб-страницу и JSON-эндпоинт для телефона или домашнего сервера.",
    kk: "NodeMCU DHT22 датчигін оқып, температура мен ылғалдылықты OLED-те көрсетеді, ал телефон не үй серверіне арналған тірі веб-бет пен JSON нүктесін береді.",
  },
  parts: [
    { component: "esp8266-nodemcu", qty: 1, spec: { en: "ESP-12E, 3.3 V logic, USB powered", ru: "ESP-12E, логика 3,3 В, питание от USB", kk: "ESP-12E, 3,3 В логика, USB қуаты" }, role: { en: "Controller and web server", ru: "Контроллер и веб-сервер", kk: "Контроллер және веб-сервер" } },
    { component: "dht22", qty: 1, spec: { en: "3-pin module with pull-up, −40…80 °C, ±0.5 °C", ru: "3-пиновый модуль с подтяжкой, −40…80 °C, ±0,5 °C", kk: "тартқышы бар 3 пинді модуль, −40…80 °C, ±0,5 °C" }, role: { en: "Temperature and humidity", ru: "Температура и влажность", kk: "Температура және ылғалдылық" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I2C address 0x3C", ru: "0,96\" 128×64, I2C-адрес 0x3C", kk: "0,96\" 128×64, I2C мекенжайы 0x3C" }, role: { en: "Local display", ru: "Локальный дисплей", kk: "Жергілікті дисплей" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points (NodeMCU fits with one free row per side)", ru: "830 точек (NodeMCU встаёт с одним свободным рядом по бокам)", kk: "830 нүкте (NodeMCU әр жағында бір бос қатармен сыяды)" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { component: "usb-5v", qty: 1, spec: { en: "any 5 V USB charger, 0.5 A or more", ru: "любая USB-зарядка 5 В от 0,5 А", kk: "кез келген 5 В USB зарядтағыш, 0,5 А-дан бастап" }, role: { en: "Power once it is finished (micro-USB into the NodeMCU)", ru: "Питание готового устройства (micro-USB в NodeMCU)", kk: "Дайын құрылғының қуаты (micro-USB NodeMCU-ға)" }, optional: true },
  ],
  instances: [
    { id: "dht", component: "dht22", label: "DHT22" },
    { id: "oled", component: "oled-ssd1306", label: "OLED 0x3C" },
  ],
  connections: [
    { from: "dht.VCC", to: "board.3V3", color: "red", note: { en: "3.3 V keeps DATA at a safe level for the ESP8266", ru: "3,3 В держит DATA на безопасном для ESP8266 уровне", kk: "3,3 В DATA сигналын ESP8266 үшін қауіпсіз деңгейде ұстайды" } },
    { from: "dht.DATA", to: "board.D5", color: "yellow", note: { en: "GPIO14; the module already has the pull-up", ru: "GPIO14; подтяжка уже стоит на модуле", kk: "GPIO14; тартқыш резистор модульде бар" } },
    { from: "dht.GND", to: "board.GND", color: "black" },
    { from: "oled.VCC", to: "board.3V3_2", color: "red" },
    { from: "oled.GND", to: "board.GND2", color: "black" },
    { from: "oled.SDA", to: "board.D2", color: "blue", note: { en: "default I2C SDA (GPIO4)", ru: "SDA шины I2C по умолчанию (GPIO4)", kk: "әдепкі I2C SDA (GPIO4)" } },
    { from: "oled.SCL", to: "board.D1", color: "green", note: { en: "default I2C SCL (GPIO5)", ru: "SCL шины I2C по умолчанию (GPIO5)", kk: "әдепкі I2C SCL (GPIO5)" } },
  ],
  steps: [
    {
      title: { en: "Prepare the Arduino IDE", ru: "Подготовьте Arduino IDE", kk: "Arduino IDE-ні дайындаңыз" },
      body: {
        en: "Add the ESP8266 board package (Boards Manager → \"esp8266 by ESP8266 Community\") and pick \"NodeMCU 1.0 (ESP-12E Module)\". In Library Manager install \"DHT sensor library\", \"Adafruit Unified Sensor\", \"Adafruit SSD1306\" and \"Adafruit GFX Library\". Plug the NodeMCU in and check that a COM / ttyUSB port appears.",
        ru: "Добавьте пакет плат ESP8266 (Boards Manager → «esp8266 by ESP8266 Community») и выберите «NodeMCU 1.0 (ESP-12E Module)». В Library Manager установите «DHT sensor library», «Adafruit Unified Sensor», «Adafruit SSD1306» и «Adafruit GFX Library». Подключите NodeMCU и проверьте, что появился порт COM / ttyUSB.",
        kk: "ESP8266 платалар пакетін қосыңыз (Boards Manager → «esp8266 by ESP8266 Community») және «NodeMCU 1.0 (ESP-12E Module)» таңдаңыз. Library Manager арқылы «DHT sensor library», «Adafruit Unified Sensor», «Adafruit SSD1306» және «Adafruit GFX Library» кітапханаларын орнатыңыз. NodeMCU-ды қосып, COM / ttyUSB порты пайда болғанын тексеріңіз.",
      },
      expect: { en: "The port shows up and the board is selectable.", ru: "Порт виден, плату можно выбрать.", kk: "Порт көрінеді, тақтаны таңдауға болады." },
      mistake: { en: "No port usually means a charge-only USB cable or a missing CH340/CP2102 driver.", ru: "Если порта нет, обычно виноват кабель только для зарядки или не установлен драйвер CH340/CP2102.", kk: "Порт болмаса, әдетте тек зарядтауға арналған кабель немесе орнатылмаған CH340/CP2102 драйвері кінәлі." },
    },
    {
      title: { en: "Wire the DHT22", ru: "Подключите DHT22", kk: "DHT22-ні қосыңыз" },
      body: {
        en: "Seat the NodeMCU across the middle of the breadboard. Connect DHT22 VCC to 3V3, GND to GND and DATA to D5 (GPIO14). Power it from 3.3 V, not VIN: the DATA line then never rises above 3.3 V. The module already carries the 10 kΩ pull-up, so no extra resistor.",
        ru: "Установите NodeMCU поперёк центральной канавки макетки. Подключите VCC датчика DHT22 к 3V3, GND к GND, DATA к D5 (GPIO14). Питайте датчик от 3,3 В, а не от VIN: тогда линия DATA никогда не поднимется выше 3,3 В. Подтяжка 10 кОм уже стоит на модуле, лишний резистор не нужен.",
        kk: "NodeMCU-ды макет тақтасының ортаңғы ойығына көлденең орнатыңыз. DHT22 датчигінің VCC пинін 3V3-ке, GND-ні GND-ге, DATA-ны D5-ке (GPIO14) қосыңыз. Датчикті VIN-нен емес, 3,3 В-тан қоректендіріңіз: сонда DATA сызығы 3,3 В-тан ешқашан аспайды. 10 кОм тартқыш резистор модульде бар, қосымша резистор қажет емес.",
      },
      expect: { en: "Three wires: red to 3V3, black to GND, yellow to D5.", ru: "Три провода: красный на 3V3, чёрный на GND, жёлтый на D5.", kk: "Үш сым: қызылы 3V3-ке, қарасы GND-ге, сарысы D5-ке." },
      mistake: { en: "A bare 4-pin DHT22 (not a module) needs its own 10 kΩ pull-up between DATA and 3V3, and its pin 3 stays empty.", ru: "Голому 4-пиновому DHT22 (не модулю) нужна своя подтяжка 10 кОм между DATA и 3V3, а его третья ножка остаётся пустой.", kk: "Модульсіз 4 пинді DHT22-ге DATA мен 3V3 арасында өз 10 кОм тартқышы керек, ал оның үшінші аяғы бос қалады." },
    },
    {
      title: { en: "Wire the OLED", ru: "Подключите OLED", kk: "OLED-ті қосыңыз" },
      body: {
        en: "Connect OLED VCC to the second 3V3 pin and GND to GND. SDA goes to D2 (GPIO4) and SCL to D1 (GPIO5): these are the ESP8266 default I2C pins, so Wire.begin() needs no arguments. Check the pin order printed on your OLED, some boards start with VCC, others with GND.",
        ru: "Подключите VCC дисплея ко второму пину 3V3, GND к GND. SDA идёт на D2 (GPIO4), SCL на D1 (GPIO5): это стандартные пины I2C у ESP8266, поэтому Wire.begin() вызывается без аргументов. Сверьтесь с надписями на вашем OLED: у одних плат первым идёт VCC, у других GND.",
        kk: "Дисплейдің VCC пинін екінші 3V3 пиніне, GND-ні GND-ге қосыңыз. SDA D2-ге (GPIO4), SCL D1-ге (GPIO5) барады: бұлар ESP8266-ның әдепкі I2C пиндері, сондықтан Wire.begin() аргументсіз шақырылады. OLED-тегі жазуларды тексеріңіз: кейбір платаларда бірінші VCC, кейбірінде GND тұрады.",
      },
      expect: { en: "Four wires to the OLED; nothing gets warm.", ru: "К OLED идут четыре провода, ничего не греется.", kk: "OLED-ке төрт сым барады, ештеңе қызбайды." },
      mistake: { en: "Swapping VCC and GND on the OLED kills it in seconds; read the labels twice.", ru: "Перепутанные VCC и GND убивают OLED за секунды, прочитайте надписи дважды.", kk: "VCC мен GND-ні шатастырсаңыз, OLED бірнеше секундта істен шығады, жазуларды екі рет оқыңыз." },
    },
    {
      title: { en: "Set your Wi-Fi and upload", ru: "Впишите Wi-Fi и загрузите скетч", kk: "Wi-Fi деректерін жазып, скетчті жүктеңіз" },
      body: {
        en: "Replace YOUR_WIFI and YOUR_PASSWORD at the top of the sketch with your 2.4 GHz network. Upload, then open the Serial Monitor at 115200 baud. The board prints its IP address and a temperature line every 2.5 seconds; the OLED shows the IP on top and the reading in large digits.",
        ru: "Замените YOUR_WIFI и YOUR_PASSWORD в начале скетча на свою сеть 2,4 ГГц. Загрузите скетч и откройте Serial Monitor на 115200 бод. Плата напечатает свой IP-адрес и каждые 2,5 секунды будет выводить строку с температурой; на OLED сверху IP, ниже крупные цифры.",
        kk: "Скетчтің басындағы YOUR_WIFI мен YOUR_PASSWORD орнына өзіңіздің 2,4 ГГц желіңізді жазыңыз. Скетчті жүктеп, Serial Monitor-ды 115200 бодта ашыңыз. Тақта IP мекенжайын шығарады да, әр 2,5 секунд сайын температура жолын басады; OLED-тің жоғарғы жағында IP, төменде ірі сандар көрінеді.",
      },
      expect: { en: "\"Wi-Fi OK, IP 192.168.x.x\" and readings like \"T=23.4 C  H=41.2 %\".", ru: "«Wi-Fi OK, IP 192.168.x.x» и строки вида «T=23.4 C  H=41.2 %».", kk: "«Wi-Fi OK, IP 192.168.x.x» және «T=23.4 C  H=41.2 %» сияқты жолдар." },
      mistake: { en: "The ESP8266 cannot join a 5 GHz network; it will keep printing dots.", ru: "ESP8266 не подключается к сети 5 ГГц и так и будет печатать точки.", kk: "ESP8266 5 ГГц желісіне қосыла алмайды, нүкте басып тұра береді." },
    },
    {
      title: { en: "Open the page and the JSON", ru: "Откройте страницу и JSON", kk: "Бет пен JSON-ды ашыңыз" },
      body: {
        en: "On a phone in the same network open http://thermo.local (or the IP from the monitor; Android often needs the IP). The page refreshes itself every 5 seconds. http://<IP>/json returns {\"ok\":true,\"temperature\":23.4,\"humidity\":41.2,...} for Home Assistant, Node-RED or a spreadsheet script.",
        ru: "С телефона в той же сети откройте http://thermo.local (или IP из монитора; Android часто понимает только IP). Страница обновляется сама каждые 5 секунд. Адрес http://<IP>/json отдаёт {\"ok\":true,\"temperature\":23.4,\"humidity\":41.2,...} для Home Assistant, Node-RED или скрипта таблицы.",
        kk: "Сол желідегі телефоннан http://thermo.local ашыңыз (немесе монитордағы IP; Android көбіне тек IP-ді түсінеді). Бет әр 5 секунд сайын өзі жаңарады. http://<IP>/json мекенжайы Home Assistant, Node-RED немесе кесте скрипті үшін {\"ok\":true,\"temperature\":23.4,\"humidity\":41.2,...} береді.",
      },
      expect: { en: "Breathing on the sensor makes humidity jump within 10 seconds.", ru: "Если подышать на датчик, влажность подскочит за 10 секунд.", kk: "Датчикке дем шығарсаңыз, ылғалдылық 10 секунд ішінде көтеріледі." },
      mistake: { en: "Mounting the DHT22 right next to the NodeMCU adds 1–2 °C of board heat; give it a few centimetres of wire.", ru: "DHT22 вплотную к NodeMCU показывает на 1–2 °C больше из-за нагрева платы; отнесите его на несколько сантиметров.", kk: "DHT22 NodeMCU-ға тым жақын тұрса, тақтаның жылуынан 1–2 °C артық көрсетеді; оны бірнеше сантиметр алыс қойыңыз." },
    },
  ],
  code: [{
    filename: "wifi_thermometer.ino",
    language: "cpp",
    libraries: ["DHT sensor library", "Adafruit Unified Sensor", "Adafruit SSD1306", "Adafruit GFX Library"],
    source: `#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>

// ---- your Wi-Fi (2.4 GHz only) ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_PASSWORD";

const int DHT_PIN = D5;                       // DHT22 DATA (GPIO14)
// OLED on the default I2C bus: SDA = D2, SCL = D1
const unsigned long READ_INTERVAL_MS = 2500;  // DHT22 needs >= 2 s between reads

DHT dht(DHT_PIN, DHT22);
Adafruit_SSD1306 oled(128, 64, &Wire, -1);
ESP8266WebServer server(80);

float tempC = NAN, humidity = NAN;
unsigned long lastRead = 0;
unsigned long readErrors = 0;

const char PAGE[] PROGMEM = R"html(<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Thermometer</title>
<style>body{margin:0;background:#0b0f14;color:#e6edf3;font-family:system-ui,sans-serif;text-align:center}
.v{font-size:64px;margin:24px 0 0}.u{color:#8b98a5}#h{font-size:36px}#s{color:#8b98a5;font-size:14px}</style></head>
<body><p class="v"><span id="t">--.-</span><span class="u"> &deg;C</span></p>
<p id="h">-- %</p><p id="s">waiting...</p>
<script>
async function tick(){try{const r=await fetch('/json');const j=await r.json();
if(j.ok){document.getElementById('t').textContent=j.temperature.toFixed(1);
document.getElementById('h').textContent=j.humidity.toFixed(0)+' %';
document.getElementById('s').textContent='uptime '+j.uptime+' s'}
else document.getElementById('s').textContent='sensor error'}catch(e){document.getElementById('s').textContent='offline'}}
tick();setInterval(tick,5000);
</script></body></html>)html";

void readSensor() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  if (isnan(t) || isnan(h)) {
    readErrors++;
    Serial.println("DHT read failed");
    return;
  }
  tempC = t;
  humidity = h;
  Serial.printf("T=%.1f C  H=%.1f %%\\n", t, h);
}

void drawOled() {
  oled.clearDisplay();
  oled.setTextColor(SSD1306_WHITE);
  oled.setTextSize(1);
  oled.setCursor(0, 0);
  oled.print(WiFi.status() == WL_CONNECTED ? WiFi.localIP().toString() : String("no Wi-Fi"));
  oled.setTextSize(3);
  oled.setCursor(0, 16);
  if (isnan(tempC)) oled.print("--.-");
  else oled.print(tempC, 1);
  oled.setTextSize(1);
  oled.print(" C");
  oled.setTextSize(2);
  oled.setCursor(0, 46);
  if (isnan(humidity)) oled.print("-- % RH");
  else { oled.print(humidity, 0); oled.print(" % RH"); }
  oled.display();
}

void handleRoot() { server.send_P(200, "text/html", PAGE); }

void handleJson() {
  char buf[160];
  if (isnan(tempC)) {
    snprintf(buf, sizeof buf, "{\\"ok\\":false,\\"errors\\":%lu}", readErrors);
  } else {
    snprintf(buf, sizeof buf, "{\\"ok\\":true,\\"temperature\\":%.1f,\\"humidity\\":%.1f,\\"uptime\\":%lu,\\"errors\\":%lu}",
             tempC, humidity, millis() / 1000, readErrors);
  }
  server.send(200, "application/json", buf);
}

void setup() {
  Serial.begin(115200);
  Serial.println();
  dht.begin();
  Wire.begin();                                // SDA = D2, SCL = D1
  if (!oled.begin(SSD1306_SWITCHCAPVCC, 0x3C)) Serial.println("OLED not found at 0x3C");
  oled.clearDisplay();
  oled.display();

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 20000) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("Wi-Fi OK, IP ");
    Serial.println(WiFi.localIP());
    if (MDNS.begin("thermo")) Serial.println("Open http://thermo.local");
  } else {
    Serial.println("Wi-Fi failed, retrying in the background");
  }

  server.on("/", handleRoot);
  server.on("/json", handleJson);
  server.begin();
  readSensor();
  drawOled();
  lastRead = millis();
}

void loop() {
  server.handleClient();
  MDNS.update();
  if (millis() - lastRead >= READ_INTERVAL_MS) {
    lastRead = millis();
    readSensor();
    drawOled();
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Serial Monitor prints \"DHT read failed\" every time", ru: "В мониторе каждый раз «DHT read failed»", kk: "Мониторда әр жолы «DHT read failed» шығады" },
      cause: { en: "DATA is on the wrong pin, the sensor is a DHT11, or a bare sensor has no pull-up.", ru: "DATA не на том пине, датчик на самом деле DHT11, или у голого датчика нет подтяжки.", kk: "DATA басқа пинде, датчик шын мәнінде DHT11, немесе жалаң датчикте тартқыш жоқ." },
      fix: { en: "Check the yellow wire is on D5, use DHT22 in the constructor only for the white AM2302/DHT22, and add 10 kΩ from DATA to 3V3 on a bare sensor.", ru: "Проверьте, что жёлтый провод на D5; DHT22 в конструкторе только для белого AM2302/DHT22; голому датчику добавьте 10 кОм от DATA к 3V3.", kk: "Сары сымның D5-те екенін тексеріңіз; конструктордағы DHT22 тек ақ AM2302/DHT22 үшін; жалаң датчикке DATA мен 3V3 арасына 10 кОм қосыңыз." },
    },
    {
      symptom: { en: "OLED stays black, monitor says \"OLED not found at 0x3C\"", ru: "OLED чёрный, в мониторе «OLED not found at 0x3C»", kk: "OLED қара, мониторда «OLED not found at 0x3C»" },
      cause: { en: "SDA and SCL are swapped, or the module uses address 0x3D.", ru: "Перепутаны SDA и SCL, или у модуля адрес 0x3D.", kk: "SDA мен SCL ауысып кеткен немесе модульдің мекенжайы 0x3D." },
      fix: { en: "SDA must go to D2 and SCL to D1. If wiring is right, change 0x3C to 0x3D in oled.begin().", ru: "SDA должен идти на D2, SCL на D1. Если провода верны, замените 0x3C на 0x3D в oled.begin().", kk: "SDA D2-ге, SCL D1-ге баруы керек. Сымдар дұрыс болса, oled.begin() ішінде 0x3C-ны 0x3D-ге ауыстырыңыз." },
    },
    {
      symptom: { en: "thermo.local does not open", ru: "thermo.local не открывается", kk: "thermo.local ашылмайды" },
      cause: { en: "Many Android phones and some routers do not resolve .local names.", ru: "Многие Android-телефоны и некоторые роутеры не понимают имена .local.", kk: "Көптеген Android телефондары мен кейбір роутерлер .local атауларын танымайды." },
      fix: { en: "Use the IP address shown on the OLED, and reserve it in the router's DHCP settings so it never changes.", ru: "Откройте IP-адрес с экрана OLED и закрепите его в настройках DHCP роутера, чтобы он не менялся.", kk: "OLED экранындағы IP мекенжайын ашыңыз және ол өзгермеуі үшін роутердің DHCP баптауларында бекітіңіз." },
    },
    {
      symptom: { en: "Temperature reads 2 °C too high", ru: "Температура завышена на 2 °C", kk: "Температура 2 °C артық көрсетеді" },
      cause: { en: "The sensor sits in the warm air above the ESP8266 and its regulator.", ru: "Датчик находится в тёплом воздухе над ESP8266 и его стабилизатором.", kk: "Датчик ESP8266 пен оның стабилизаторының үстіндегі жылы ауада тұр." },
      fix: { en: "Move the DHT22 10 cm away on longer wires, below or beside the board, never above it.", ru: "Вынесите DHT22 на проводах на 10 см вниз или в сторону от платы, но не над ней.", kk: "DHT22-ні ұзынырақ сымдармен тақтадан 10 см төмен не бүйірге шығарыңыз, бірақ үстіне емес." },
    },
  ],
  safety: [
    { en: "Power only through USB or 5 V on VIN; never feed more than 3.3 V into a GPIO pin.", ru: "Питайте только от USB или 5 В на VIN; никогда не подавайте на GPIO больше 3,3 В.", kk: "Тек USB арқылы немесе VIN-ге 5 В беріп қоректендіріңіз; GPIO пиніне ешқашан 3,3 В-тан артық бермеңіз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Connecting to YOUR_WIFI......",
      "Wi-Fi OK, IP 192.168.1.57",
      "Open http://thermo.local",
      "T=23.4 C  H=41.2 %",
      "T=23.4 C  H=41.0 %",
      "T=23.5 C  H=40.8 %",
      "T=23.5 C  H=55.3 %",
      "T=23.6 C  H=48.1 %",
    ],
    leds: [],
  },
} satisfies GuideContent;
