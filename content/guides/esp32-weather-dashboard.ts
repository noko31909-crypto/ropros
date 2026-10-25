import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-weather-dashboard",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "iot",
  robotics: false,
  difficulty: "intermediate",
  hours: 2,
  costUsd: 10,
  xpReward: 200,
  title: {
    en: "ESP32 Wi-Fi Weather Dashboard",
    ru: "Погодная Wi-Fi панель на ESP32",
    kk: "ESP32-дегі Wi-Fi ауа райы панелі",
  },
  summary: {
    en: "A BME280 measures temperature, humidity and pressure, and the ESP32 serves a live dashboard page that refreshes itself every two seconds from a JSON endpoint.",
    ru: "BME280 измеряет температуру, влажность и давление, а ESP32 раздаёт живую веб-панель, которая каждые две секунды сама обновляется через JSON-эндпоинт.",
    kk: "BME280 температураны, ылғалдылықты және қысымды өлшейді, ал ESP32 әр екі секунд сайын JSON-эндпоинт арқылы өздігінен жаңаратын тірі веб-панель ұсынады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit V1 (WROOM-32), 3.3 V logic", ru: "ESP32 DevKit V1 (WROOM-32), логика 3,3 В", kk: "ESP32 DevKit V1 (WROOM-32), 3,3 В логика" }, role: { en: "Controller and web server", ru: "Контроллер и веб-сервер", kk: "Контроллер және веб-сервер" } },
    { component: "bme280", qty: 1, spec: { en: "4-pin I²C module (VIN, GND, SCL, SDA)", ru: "4-пиновый модуль I²C (VIN, GND, SCL, SDA)", kk: "4 пинді I²C модулі (VIN, GND, SCL, SDA)" }, role: { en: "Temperature, humidity and pressure sensor", ru: "Датчик температуры, влажности и давления", kk: "Температура, ылғалдылық және қысым датчигі" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points (an ESP32 fits only with one row free on one side)", ru: "830 точек (ESP32 оставляет свободным один ряд с одной стороны)", kk: "830 нүкте (ESP32 бір жағында бір бос қатар қалдырады)" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 4, spec: { en: "male-female, 20 cm", ru: "папа-мама, 20 см", kk: "аталық-аналық, 20 см" }, role: { en: "Sensor cable, keeps the BME280 away from the warm board", ru: "Кабель датчика, чтобы BME280 был подальше от тёплой платы", kk: "Датчик кабелі, BME280 жылы платадан алыс тұруы үшін" } },
  ],
  instances: [
    { id: "bme", component: "bme280", label: "BME280" },
  ],
  connections: [
    { from: "board.3V3", to: "bme.VIN", color: "red", note: { en: "3.3 V keeps the I²C lines at ESP32 level", ru: "3,3 В держит линии I²C на уровне ESP32", kk: "3,3 В I²C желілерін ESP32 деңгейінде ұстайды" } },
    { from: "bme.GND", to: "board.GND", color: "black" },
    { from: "board.GPIO21", to: "bme.SDA", color: "blue", note: { en: "default SDA", ru: "SDA по умолчанию", kk: "әдепкі SDA" } },
    { from: "board.GPIO22", to: "bme.SCL", color: "yellow", note: { en: "default SCL", ru: "SCL по умолчанию", kk: "әдепкі SCL" } },
  ],
  steps: [
    {
      title: { en: "Make sure it really is a BME280", ru: "Убедитесь, что это действительно BME280", kk: "Бұл шынымен BME280 екенін тексеріңіз" },
      body: {
        en: "BME280 and BMP280 boards look almost the same and are often mixed up by sellers. Look at the metal sensor can: the BME280 is square (2.5 × 2.5 mm), the BMP280 is rectangular. Only the BME280 measures humidity. Solder the 4-pin header if it came loose.",
        ru: "Платы BME280 и BMP280 выглядят почти одинаково, и продавцы их часто путают. Посмотрите на металлический корпус датчика: у BME280 он квадратный (2,5 × 2,5 мм), у BMP280 прямоугольный. Влажность измеряет только BME280. Если гребёнка из 4 пинов не припаяна, припаяйте её.",
        kk: "BME280 және BMP280 платалары бір-біріне өте ұқсас, сатушылар оларды жиі шатастырады. Датчиктің металл корпусына қараңыз: BME280-дікі шаршы (2,5 × 2,5 мм), BMP280-дікі тіктөртбұрыш. Ылғалдылықты тек BME280 өлшейді. 4 пинді тарақ дәнекерленбеген болса, оны дәнекерлеңіз.",
      },
      expect: { en: "A square sensor can and four pins labelled VIN, GND, SCL, SDA.", ru: "Квадратный корпус датчика и четыре пина с подписями VIN, GND, SCL, SDA.", kk: "Шаршы датчик корпусы және VIN, GND, SCL, SDA деп белгіленген төрт пин." },
      mistake: { en: "With a BMP280 the sketch stops at \"BME280 not found\" because the chip ID is different.", ru: "С BMP280 скетч остановится на «BME280 not found», потому что у чипа другой ID.", kk: "BMP280 болса, скетч «BME280 not found» деп тоқтайды, себебі чиптің ID-і басқа." },
    },
    {
      title: { en: "Wire power and I²C", ru: "Подключите питание и I²C", kk: "Қуат пен I²C-ді қосыңыз" },
      body: {
        en: "Connect BME280 VIN to the ESP32 3V3 pin and GND to GND. Then SDA goes to GPIO21 and SCL to GPIO22, the ESP32's default I²C pins. Use 15–20 cm female wires so the sensor hangs away from the board: the ESP32 warms up while Wi-Fi is on and would skew the temperature.",
        ru: "Соедините VIN модуля BME280 с пином 3V3 платы ESP32, а GND с GND. Затем SDA подключите к GPIO21, SCL к GPIO22: это I²C-пины ESP32 по умолчанию. Возьмите провода 15–20 см, чтобы датчик висел подальше от платы: при работе Wi-Fi ESP32 нагревается и искажает температуру.",
        kk: "BME280 модулінің VIN пинін ESP32-нің 3V3 пиніне, GND-ін GND-ге қосыңыз. Содан кейін SDA-ны GPIO21-ге, SCL-ды GPIO22-ге жалғаңыз: бұл ESP32-нің әдепкі I²C пиндері. Датчик платадан алыс тұруы үшін 15–20 см сымдарды алыңыз: Wi-Fi жұмыс істегенде ESP32 қызып, температураны бұрмалайды.",
      },
      expect: { en: "Four wires: red 3V3, black GND, blue GPIO21, yellow GPIO22.", ru: "Четыре провода: красный 3V3, чёрный GND, синий GPIO21, жёлтый GPIO22.", kk: "Төрт сым: қызыл 3V3, қара GND, көк GPIO21, сары GPIO22." },
      mistake: { en: "Swapping SDA and SCL is the most common reason the sensor is not found.", ru: "Перепутанные SDA и SCL — самая частая причина, почему датчик не находится.", kk: "SDA мен SCL-ды шатастыру — датчик табылмауының ең жиі себебі." },
    },
    {
      title: { en: "Install the board package and libraries", ru: "Установите пакет платы и библиотеки", kk: "Плата пакеті мен кітапханаларды орнатыңыз" },
      body: {
        en: "In Arduino IDE open Boards Manager and install \"esp32 by Espressif Systems\", then choose the board \"ESP32 Dev Module\". In Library Manager install \"Adafruit BME280 Library\" and accept its dependency \"Adafruit Unified Sensor\". WiFi, WebServer and ESPmDNS come with the ESP32 package.",
        ru: "В Arduino IDE откройте Boards Manager и установите «esp32 by Espressif Systems», затем выберите плату «ESP32 Dev Module». В Library Manager установите «Adafruit BME280 Library» и согласитесь установить зависимость «Adafruit Unified Sensor». WiFi, WebServer и ESPmDNS уже входят в пакет ESP32.",
        kk: "Arduino IDE-де Boards Manager-ді ашып, «esp32 by Espressif Systems» пакетін орнатыңыз, содан кейін «ESP32 Dev Module» платасын таңдаңыз. Library Manager-де «Adafruit BME280 Library» кітапханасын орнатып, «Adafruit Unified Sensor» тәуелділігін орнатуға келісіңіз. WiFi, WebServer және ESPmDNS ESP32 пакетінде бар.",
      },
      expect: { en: "The sketch compiles without missing-header errors.", ru: "Скетч компилируется без ошибок об отсутствующих заголовках.", kk: "Скетч жетіспейтін тақырып файлдары туралы қатесіз компиляцияланады." },
      mistake: { en: "Picking an Arduino board instead of \"ESP32 Dev Module\" gives \"WiFi.h: No such file\".", ru: "Если выбрать плату Arduino вместо «ESP32 Dev Module», будет ошибка «WiFi.h: No such file».", kk: "«ESP32 Dev Module» орнына Arduino платасын таңдасаңыз, «WiFi.h: No such file» қатесі шығады." },
    },
    {
      title: { en: "Add your Wi-Fi and upload", ru: "Впишите Wi-Fi и загрузите скетч", kk: "Wi-Fi деректерін жазып, скетчті жүктеңіз" },
      body: {
        en: "Replace YOUR_WIFI and YOUR_PASSWORD with your 2.4 GHz network. Upload, open the Serial Monitor at 115200 baud and press EN on the board. The sketch prints the address it got, for example http://192.168.1.57, and a reading every two seconds.",
        ru: "Замените YOUR_WIFI и YOUR_PASSWORD данными своей сети 2,4 ГГц. Загрузите скетч, откройте Serial Monitor на 115200 бод и нажмите EN на плате. Скетч напечатает полученный адрес, например http://192.168.1.57, и будет выводить показания каждые две секунды.",
        kk: "YOUR_WIFI мен YOUR_PASSWORD орнына өзіңіздің 2,4 ГГц желіңіздің деректерін жазыңыз. Скетчті жүктеп, Serial Monitor-ды 115200 бодта ашыңыз да, платадағы EN батырмасын басыңыз. Скетч алған мекенжайын, мысалы http://192.168.1.57, басып шығарады және әр екі секунд сайын көрсеткіштерді шығарады.",
      },
      expect: { en: "\"Wi-Fi connected\" followed by lines like T=23.4 C H=41.2 % P=1009.8 hPa.", ru: "«Wi-Fi connected», а затем строки вида T=23.4 C H=41.2 % P=1009.8 hPa.", kk: "«Wi-Fi connected», содан кейін T=23.4 C H=41.2 % P=1009.8 hPa сияқты жолдар." },
      mistake: { en: "ESP32 cannot join 5 GHz networks; if it prints dots forever, check the band and the password.", ru: "ESP32 не подключается к сетям 5 ГГц: если точки печатаются бесконечно, проверьте диапазон и пароль.", kk: "ESP32 5 ГГц желілерге қосылмайды: нүктелер шексіз шыға берсе, жиілік диапазоны мен құпиясөзді тексеріңіз." },
    },
    {
      title: { en: "Open the dashboard", ru: "Откройте панель", kk: "Панельді ашыңыз" },
      body: {
        en: "On a phone or laptop in the same network, open the printed IP or http://weather.local. The page loads once, then its script calls /data every two seconds and updates the four cards without reloading. Breathe on the sensor and watch humidity jump within a few seconds.",
        ru: "На телефоне или ноутбуке в той же сети откройте напечатанный IP или http://weather.local. Страница загружается один раз, а затем её скрипт каждые две секунды запрашивает /data и обновляет четыре карточки без перезагрузки. Подышите на датчик: влажность подскочит за несколько секунд.",
        kk: "Сол желідегі телефонда немесе ноутбукта басып шығарылған IP-ді немесе http://weather.local мекенжайын ашыңыз. Бет бір рет жүктеледі, содан кейін оның скрипті әр екі секунд сайын /data сұрап, төрт карточканы бетті қайта жүктемей жаңартады. Датчикке дем шығарыңыз: ылғалдылық бірнеше секундта көтеріледі.",
      },
      expect: { en: "Values change on the page and the footer shows \"updated\" with the current time.", ru: "Значения меняются на странице, а внизу видно «updated» с текущим временем.", kk: "Беттегі мәндер өзгереді, ал төменде ағымдағы уақытпен «updated» жазуы көрінеді." },
      mistake: { en: "Guest Wi-Fi networks often block device-to-device traffic, so the page never opens.", ru: "Гостевые Wi-Fi сети часто блокируют обмен между устройствами, и страница не открывается.", kk: "Қонақ Wi-Fi желілері жиі құрылғылар арасындағы байланысты бұғаттайды, сондықтан бет ашылмайды." },
    },
    {
      title: { en: "Mount the sensor for honest readings", ru: "Закрепите датчик для честных показаний", kk: "Нақты көрсеткіштер үшін датчикті бекітіңіз" },
      body: {
        en: "Fix the BME280 at the end of its cable, out of direct sun and away from the ESP32, its regulator and your laptop. If you use an enclosure, drill vent holes and keep the sensor outside it or in a separate vented corner.",
        ru: "Закрепите BME280 на конце кабеля так, чтобы на него не падало прямое солнце и он был подальше от ESP32, её стабилизатора и ноутбука. Если используете корпус, сделайте вентиляционные отверстия и вынесите датчик наружу или в отдельный проветриваемый угол.",
        kk: "BME280-ді кабельдің ұшына, тікелей күн түспейтін және ESP32-ден, оның стабилизаторынан және ноутбуктан алыс жерге бекітіңіз. Корпус қолдансаңыз, желдеткіш тесіктер жасап, датчикті сыртқа немесе бөлек желдетілетін бұрышқа шығарыңыз.",
      },
      expect: { en: "The temperature agrees with a room thermometer within about 1 °C.", ru: "Температура совпадает с комнатным термометром примерно в пределах 1 °C.", kk: "Температура бөлме термометрімен шамамен 1 °C дәлдікте сәйкес келеді." },
      mistake: { en: "A sensor plugged straight into the breadboard next to the ESP32 reads 2–3 °C too warm.", ru: "Датчик, вставленный в макетку прямо рядом с ESP32, завышает температуру на 2–3 °C.", kk: "ESP32-нің жанына макет тақтасына тікелей қойылған датчик температураны 2–3 °C жоғары көрсетеді." },
    },
  ],
  code: [{
    filename: "weather_dashboard.ino",
    language: "cpp",
    libraries: ["Adafruit BME280 Library", "Adafruit Unified Sensor"],
    source: String.raw`#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

// ---- change these ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_PASSWORD";
const float SEA_LEVEL_HPA = 1013.25;   // local sea-level pressure, for the altitude estimate

const int SDA_PIN = 21;
const int SCL_PIN = 22;
const unsigned long READ_INTERVAL_MS = 2000;

Adafruit_BME280 bme;
WebServer server(80);

float tempC = NAN, humidity = NAN, pressureHpa = NAN, altitudeM = NAN;
unsigned long lastRead = 0;

const char PAGE[] PROGMEM = R"rawliteral(<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ESP32 Weather</title>
<style>
body{margin:0;padding:24px;font-family:system-ui,sans-serif;background:#0b0f14;color:#e6edf3}
h1{font-size:22px;margin:0 0 16px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;max-width:640px}
.card{background:#151b23;border:1px solid #263040;border-radius:16px;padding:16px}
.label{font-size:13px;color:#8b98a5}.value{font-size:32px;font-weight:600;margin-top:6px}
#status{margin-top:16px;font-size:12px;color:#8b98a5}
</style></head><body>
<h1>ESP32 Weather</h1>
<div class="grid">
<div class="card"><div class="label">Temperature</div><div class="value"><span id="t">--</span> &deg;C</div></div>
<div class="card"><div class="label">Humidity</div><div class="value"><span id="h">--</span> %</div></div>
<div class="card"><div class="label">Pressure</div><div class="value"><span id="p">--</span> hPa</div></div>
<div class="card"><div class="label">Altitude (est.)</div><div class="value"><span id="a">--</span> m</div></div>
</div>
<div id="status">connecting...</div>
<script>
function show(id, v, digits) { document.getElementById(id).textContent = (v === null) ? '--' : v.toFixed(digits); }
function update() {
  fetch('/data').then(function (r) { return r.json(); }).then(function (d) {
    show('t', d.t, 1); show('h', d.h, 0); show('p', d.p, 1); show('a', d.a, 0);
    document.getElementById('status').textContent = 'updated ' + new Date().toLocaleTimeString();
  }).catch(function () { document.getElementById('status').textContent = 'offline, retrying...'; });
}
update();
setInterval(update, 2000);
</script></body></html>)rawliteral";

// NAN is not valid JSON, so missing values are sent as null
String jsonNumber(float v, int digits) {
  return isnan(v) ? String("null") : String(v, digits);
}

void handleRoot() {
  server.send(200, "text/html", PAGE);
}

void handleData() {
  String json = "{\"t\":" + jsonNumber(tempC, 2) +
                ",\"h\":" + jsonNumber(humidity, 1) +
                ",\"p\":" + jsonNumber(pressureHpa, 1) +
                ",\"a\":" + jsonNumber(altitudeM, 0) + "}";
  server.sendHeader("Cache-Control", "no-store");
  server.send(200, "application/json", json);
}

void readSensor() {
  tempC = bme.readTemperature();
  humidity = bme.readHumidity();
  pressureHpa = bme.readPressure() / 100.0F;
  altitudeM = bme.readAltitude(SEA_LEVEL_HPA);
  Serial.printf("T=%.1f C  H=%.1f %%  P=%.1f hPa\n", tempC, humidity, pressureHpa);
}

void setup() {
  Serial.begin(115200);
  delay(200);
  Wire.begin(SDA_PIN, SCL_PIN);

  // most boards use address 0x76, some 0x77
  if (!bme.begin(0x76, &Wire) && !bme.begin(0x77, &Wire)) {
    Serial.println("BME280 not found, check wiring (or is it a BMP280?)");
    while (true) delay(1000);
  }
  Serial.println("BME280 found");

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.printf("Connecting to %s", WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Wi-Fi connected, open http://");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("weather")) Serial.println("Also available at http://weather.local");

  server.on("/", handleRoot);
  server.on("/data", handleData);
  server.begin();
  readSensor();
}

void loop() {
  server.handleClient();
  if (millis() - lastRead >= READ_INTERVAL_MS) {
    lastRead = millis();
    readSensor();
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Serial prints \"BME280 not found\"", ru: "В мониторе «BME280 not found»", kk: "Мониторда «BME280 not found» шығады" },
      cause: { en: "SDA/SCL swapped, a loose header, or the board is actually a BMP280 (no humidity, different chip ID).", ru: "Перепутаны SDA/SCL, плохо пропаяна гребёнка или это на самом деле BMP280 (без влажности, другой ID чипа).", kk: "SDA/SCL шатастырылған, тарақ нашар дәнекерленген немесе бұл шын мәнінде BMP280 (ылғалдылықсыз, чип ID-і басқа)." },
      fix: { en: "Check GPIO21 → SDA and GPIO22 → SCL, reflow the header, and compare the sensor can shape (square = BME280).", ru: "Проверьте GPIO21 → SDA и GPIO22 → SCL, пропаяйте гребёнку заново и посмотрите на форму корпуса (квадратный = BME280).", kk: "GPIO21 → SDA және GPIO22 → SCL екенін тексеріп, тарақты қайта дәнекерлеңіз және корпус пішініне қараңыз (шаршы = BME280)." },
    },
    {
      symptom: { en: "Endless dots, Wi-Fi never connects", ru: "Бесконечные точки, Wi-Fi не подключается", kk: "Шексіз нүктелер, Wi-Fi қосылмайды" },
      cause: { en: "Wrong password, a 5 GHz-only network, or a hidden SSID with a typo.", ru: "Неверный пароль, сеть только на 5 ГГц или скрытый SSID с опечаткой.", kk: "Құпиясөз қате, желі тек 5 ГГц-те немесе жасырын SSID қате жазылған." },
      fix: { en: "Use the 2.4 GHz network name exactly as shown on your phone, including capital letters.", ru: "Укажите имя сети 2,4 ГГц точно так, как оно показано на телефоне, с учётом регистра.", kk: "2,4 ГГц желінің атын телефонда көрсетілгендей, бас әріптерін сақтап, дәл жазыңыз." },
    },
    {
      symptom: { en: "Temperature reads several degrees too high", ru: "Температура завышена на несколько градусов", kk: "Температура бірнеше градусқа жоғары" },
      cause: { en: "Heat from the ESP32 and its regulator reaches the sensor.", ru: "Тепло от ESP32 и её стабилизатора доходит до датчика.", kk: "ESP32 мен оның стабилизаторының жылуы датчикке жетеді." },
      fix: { en: "Move the BME280 at least 10 cm away on its cable and keep it out of the enclosure.", ru: "Отнесите BME280 на кабеле минимум на 10 см и не прячьте его в корпус.", kk: "BME280-ді кабельмен кемінде 10 см алысқа шығарып, корпусқа салмаңыз." },
    },
    {
      symptom: { en: "Page opens but shows \"offline, retrying...\"", ru: "Страница открывается, но пишет «offline, retrying...»", kk: "Бет ашылады, бірақ «offline, retrying...» деп жазады" },
      cause: { en: "The ESP32 rebooted or lost Wi-Fi and got a new IP address.", ru: "ESP32 перезагрузилась или потеряла Wi-Fi и получила новый IP-адрес.", kk: "ESP32 қайта жүктелді немесе Wi-Fi-ды жоғалтып, жаңа IP мекенжай алды." },
      fix: { en: "Check the Serial Monitor for the new address, or reserve a fixed IP for the ESP32 in your router.", ru: "Посмотрите новый адрес в Serial Monitor или закрепите за ESP32 постоянный IP в настройках роутера.", kk: "Жаңа мекенжайды Serial Monitor-дан қараңыз немесе роутер баптауларында ESP32-ге тұрақты IP бекітіңіз." },
    },
  ],
  safety: [
    { en: "For outdoor use, power the board from a USB adapter indoors and put only the sensor outside in a ventilated, rain-shielded housing.", ru: "Для улицы оставьте плату с USB-адаптером в помещении, а наружу выведите только датчик в проветриваемом корпусе, защищённом от дождя.", kk: "Сыртта пайдалану үшін плата мен USB адаптерін үй ішінде қалдырып, сыртқа тек датчикті желдетілетін, жаңбырдан қорғалған корпуспен шығарыңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "BME280 found",
      "Connecting to YOUR_WIFI.....",
      "Wi-Fi connected, open http://192.168.1.57",
      "Also available at http://weather.local",
      "T=23.4 C  H=41.2 %  P=1009.8 hPa",
      "T=23.4 C  H=41.3 %  P=1009.8 hPa",
      "T=23.5 C  H=58.9 %  P=1009.7 hPa",
      "T=23.5 C  H=52.4 %  P=1009.8 hPa",
    ],
    leds: [],
  },
} satisfies GuideContent;
