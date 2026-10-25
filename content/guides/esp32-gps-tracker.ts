import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-gps-tracker",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "vehicles",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 14,
  xpReward: 230,
  title: {
    en: "ESP32 GPS Tracker with Web Map Link",
    ru: "GPS-трекер на ESP32 со ссылкой на карту",
    kk: "Карта сілтемесі бар ESP32 GPS трекері",
  },
  summary: {
    en: "A NEO-6M GPS module talks to the ESP32 over UART2, TinyGPSPlus decodes the position, and a web page shows latitude, longitude, speed and satellites with a one-tap Google Maps link. Works on home Wi-Fi, a phone hotspot or its own access point.",
    ru: "NEO-6M передаёт данные в ESP32 по UART2, TinyGPSPlus расшифровывает координаты, а веб-страница показывает позицию, скорость и спутники со ссылкой на Google Maps. Работает через домашний Wi-Fi, хотспот телефона или свою точку доступа.",
    kk: "NEO-6M деректерді ESP32-ге UART2 арқылы береді, TinyGPSPlus координаттарды ашады, ал веб-бет орынды, жылдамдықты және жерсеріктерді Google Maps сілтемесімен көрсетеді. Үй Wi-Fi-ы, телефон хотспоты немесе өз кіру нүктесі арқылы істейді.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit V1 (WROOM-32), 3.3 V logic", ru: "ESP32 DevKit V1 (WROOM-32), логика 3,3 В", kk: "ESP32 DevKit V1 (WROOM-32), 3,3 В логика" }, role: { en: "Controller and web server", ru: "Контроллер и веб-сервер", kk: "Контроллер және веб-сервер" } },
    { component: "neo-6m-gps", qty: 1, spec: { en: "GY-GPS6MV2 with ceramic patch antenna, 9600 baud, 3.3 V UART", ru: "GY-GPS6MV2 с керамической патч-антенной, 9600 бод, UART 3,3 В", kk: "керамикалық патч-антеннасы бар GY-GPS6MV2, 9600 бод, 3,3 В UART" }, role: { en: "Position receiver", ru: "Приёмник координат", kk: "Координат қабылдағышы" } },
    { component: "usb-5v", qty: 1, spec: { en: "power bank with USB cable", ru: "пауэрбанк с USB-кабелем", kk: "USB кабелі бар пауэрбанк" }, role: { en: "Portable power for the ESP32 (USB port)", ru: "Переносное питание ESP32 (через USB-порт)", kk: "ESP32-ге тасымалды қуат (USB порты арқылы)" }, optional: true },
    { component: "breadboard", qty: 1, spec: { en: "830 points, or solder to a perfboard for the car", ru: "830 точек или пайка на макетной плате для машины", kk: "830 нүкте немесе көлік үшін тесікті платаға дәнекерлеу" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 4, spec: { en: "female-female or male-female", ru: "мама-мама или папа-мама", kk: "аналық-аналық немесе аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { component: "enclosure", qty: 1, spec: { en: "small plastic box; antenna side facing up", ru: "небольшая пластиковая коробка; антенной вверх", kk: "шағын пластик қорап; антеннасы жоғары қарап" }, role: { en: "Protection on the move", ru: "Защита в дороге", kk: "Жолда қорғау" }, optional: true },
  ],
  instances: [
    { id: "gps", component: "neo-6m-gps", label: "NEO-6M" },
  ],
  connections: [
    { from: "board.5V", to: "gps.VCC", color: "red", note: { en: "module has its own 3.3 V regulator", ru: "у модуля свой стабилизатор 3,3 В", kk: "модульдің өз 3,3 В стабилизаторы бар" } },
    { from: "gps.GND", to: "board.GND", color: "black" },
    { from: "gps.TX", to: "board.GPIO16", color: "green", note: { en: "GPS TX → ESP32 RX2 (crossed)", ru: "TX GPS → RX2 ESP32 (крест-накрест)", kk: "GPS TX → ESP32 RX2 (айқас)" } },
    { from: "gps.RX", to: "board.GPIO17", color: "yellow", note: { en: "GPS RX ← ESP32 TX2 (crossed)", ru: "RX GPS ← TX2 ESP32 (крест-накрест)", kk: "GPS RX ← ESP32 TX2 (айқас)" } },
  ],
  steps: [
    {
      title: { en: "Attach the antenna", ru: "Подключите антенну", kk: "Антеннаны қосыңыз" },
      body: {
        en: "Press the ceramic patch antenna's tiny u.FL plug onto the socket on the module until it clicks. The beige ceramic side must face the sky; the metal side faces down. Solder the 4-pin header if it is loose.",
        ru: "Наденьте маленький разъём u.FL керамической патч-антенны на гнездо модуля до щелчка. Бежевая керамическая сторона должна смотреть в небо, металлическая вниз. Если гребёнка из 4 пинов не припаяна, припаяйте её.",
        kk: "Керамикалық патч-антеннаның кішкентай u.FL ажыратқышын модульдегі ұяға шырт еткенше басып кигізіңіз. Бежевый керамикалық жағы аспанға, металл жағы төмен қарауы керек. 4 пинді тарақ дәнекерленбеген болса, оны дәнекерлеңіз.",
      },
      expect: { en: "The antenna sits firmly on the module, ceramic side up.", ru: "Антенна плотно сидит на модуле, керамикой вверх.", kk: "Антенна модульде берік отыр, керамикасы жоғары қарап." },
      mistake: { en: "Pulling the antenna by its thin cable rips the u.FL socket off the board.", ru: "Если тянуть антенну за тонкий кабель, гнездо u.FL оторвётся от платы.", kk: "Антеннаны жіңішке кабелінен тартсаңыз, u.FL ұясы платадан жұлынып кетеді." },
    },
    {
      title: { en: "Wire UART2 crossed over", ru: "Подключите UART2 крест-накрест", kk: "UART2-ні айқастыра қосыңыз" },
      body: {
        en: "VCC to the ESP32 5V pin and GND to GND. Then cross the data lines: the GPS TX (it transmits) goes to GPIO16, the ESP32's RX2, and the GPS RX goes to GPIO17, the ESP32's TX2. The NEO-6M's UART runs at 3.3 V, so no level shifting is needed.",
        ru: "VCC к пину 5V платы ESP32, GND к GND. Затем перекрестите линии данных: TX модуля GPS (он передаёт) идёт на GPIO16 — это RX2 ESP32, а RX модуля на GPIO17 — TX2 ESP32. UART модуля NEO-6M работает на 3,3 В, поэтому согласование уровней не нужно.",
        kk: "VCC-ді ESP32-нің 5V пиніне, GND-ді GND-ге қосыңыз. Содан кейін деректер желілерін айқастырыңыз: GPS модулінің TX-і (ол жібереді) GPIO16-ға, яғни ESP32-нің RX2-сіне барады, ал модульдің RX-і GPIO17-ге, яғни ESP32-нің TX2-сіне барады. NEO-6M UART-ы 3,3 В-пен жұмыс істейді, сондықтан деңгей сәйкестендіру қажет емес.",
      },
      expect: { en: "TX goes to RX and RX goes to TX.", ru: "TX соединён с RX, а RX с TX.", kk: "TX RX-ке, ал RX TX-ке жалғанған." },
      mistake: { en: "Connecting TX to TX: the sketch reports \"No GPS data\" because both sides are talking and nobody listens.", ru: "TX соединён с TX: скетч пишет «No GPS data», потому что обе стороны говорят и никто не слушает.", kk: "TX TX-ке қосылған: скетч «No GPS data» деп жазады, себебі екі жақ та сөйлеп, ешкім тыңдамайды." },
    },
    {
      title: { en: "Install TinyGPSPlus and set Wi-Fi", ru: "Установите TinyGPSPlus и настройте Wi-Fi", kk: "TinyGPSPlus орнатып, Wi-Fi баптаңыз" },
      body: {
        en: "Install \"TinyGPSPlus\" (by Mikal Hart) from the Library Manager. Put your Wi-Fi name and password in the sketch; for use on the road, enter your phone's hotspot so your phone keeps internet for Google Maps. If that network is not found within 15 seconds, the ESP32 starts its own access point \"ropros-gps\" (password ropros123) at 192.168.4.1.",
        ru: "Установите «TinyGPSPlus» (автор Mikal Hart) через Library Manager. Впишите в скетч имя и пароль Wi-Fi; для дороги укажите точку доступа своего телефона, тогда у телефона останется интернет для Google Maps. Если сеть не найдена за 15 секунд, ESP32 поднимет собственную точку доступа «ropros-gps» (пароль ropros123) по адресу 192.168.4.1.",
        kk: "Library Manager арқылы «TinyGPSPlus» (авторы Mikal Hart) кітапханасын орнатыңыз. Скетчке Wi-Fi атауы мен құпиясөзін жазыңыз; жолда пайдалану үшін телефоныңыздың хотспотын көрсетіңіз, сонда телефонда Google Maps үшін интернет қалады. Желі 15 секундта табылмаса, ESP32 192.168.4.1 мекенжайында «ropros-gps» (құпиясөзі ropros123) атты өз кіру нүктесін ашады.",
      },
      expect: { en: "The sketch compiles and you know which network it will join.", ru: "Скетч компилируется, и вы знаете, к какой сети он подключится.", kk: "Скетч компиляцияланады және оның қай желіге қосылатынын білесіз." },
      mistake: { en: "Change the fallback AP password before taking the tracker outside; anyone nearby can join otherwise.", ru: "Поменяйте пароль резервной точки доступа, прежде чем брать трекер на улицу, иначе к ней сможет подключиться любой рядом.", kk: "Трекерді сыртқа алып шықпас бұрын резервтік кіру нүктесінің құпиясөзін өзгертіңіз, әйтпесе оған жақын тұрған кез келген адам қосыла алады." },
    },
    {
      title: { en: "Get the first fix outdoors", ru: "Получите первую фиксацию на улице", kk: "Алғашқы бекітуді сыртта алыңыз" },
      body: {
        en: "Upload, open the Serial Monitor at 115200 baud and take the setup to a window or outside. Without its backup battery charged, a NEO-6M needs from about one to several minutes for the first fix. The module's small LED starts blinking once per second when it has a fix, and the sketch prints the coordinates.",
        ru: "Загрузите скетч, откройте Serial Monitor на 115200 бод и отнесите макет к окну или на улицу. Если батарейка резервного питания модуля не заряжена, NEO-6M нужно от минуты до нескольких минут на первую фиксацию. Когда позиция найдена, маленький светодиод модуля начинает мигать раз в секунду, а скетч печатает координаты.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 115200 бодта ашыңыз да, макетті терезенің жанына немесе сыртқа апарыңыз. Модульдің резервтік батареясы зарядталмаған болса, NEO-6M-ге алғашқы бекіту үшін бір минуттан бірнеше минутқа дейін уақыт керек. Орны анықталғанда модульдің кішкентай жарық диоды секундына бір рет жыпылықтай бастайды, ал скетч координаттарды шығарады.",
      },
      expect: { en: "\"sats=6 fix 43.238949,76.889709 hdop 1.4\" style lines.", ru: "Строки вида «sats=6 fix 43.238949,76.889709 hdop 1.4».", kk: "«sats=6 fix 43.238949,76.889709 hdop 1.4» сияқты жолдар." },
      mistake: { en: "Waiting indoors far from a window: concrete and metal roofs block GPS almost completely.", ru: "Ждать в глубине помещения: бетон и металлические крыши почти полностью глушат GPS.", kk: "Терезеден алыс үй ішінде күту: бетон мен металл шатырлар GPS-ті толықтай дерлік бөгейді." },
    },
    {
      title: { en: "Open the tracker page", ru: "Откройте страницу трекера", kk: "Трекер бетін ашыңыз" },
      body: {
        en: "Open the address from the Serial Monitor (or 192.168.4.1 when you are on the ESP32's own access point). The page asks /data every two seconds and shows position, speed, altitude, satellites and HDOP. Tap \"Open in Google Maps\" to see the point on the map; this needs internet on the phone.",
        ru: "Откройте адрес из Serial Monitor (или 192.168.4.1, если вы подключены к собственной точке доступа ESP32). Страница каждые две секунды запрашивает /data и показывает координаты, скорость, высоту, спутники и HDOP. Нажмите «Open in Google Maps», чтобы увидеть точку на карте; для этого телефону нужен интернет.",
        kk: "Serial Monitor-дағы мекенжайды ашыңыз (немесе ESP32-нің өз кіру нүктесіне қосылған болсаңыз, 192.168.4.1). Бет әр екі секунд сайын /data сұрап, координаттарды, жылдамдықты, биіктікті, жерсеріктерді және HDOP-ты көрсетеді. Нүктені картадан көру үшін «Open in Google Maps» басыңыз; ол үшін телефонда интернет керек.",
      },
      expect: { en: "The map pin lands within a few metres of where you are standing.", ru: "Метка на карте ставится в нескольких метрах от вас.", kk: "Картадағы белгі сіз тұрған жерден бірнеше метр жерге қойылады." },
      mistake: { en: "HDOP above 5 means a poor fix; give the antenna a clearer view of the sky before trusting the position.", ru: "HDOP выше 5 означает плохую фиксацию: прежде чем доверять координатам, откройте антенне больше неба.", kk: "HDOP 5-тен жоғары болса, бекіту нашар: координаттарға сенбес бұрын антеннаға аспанды көбірек ашыңыз." },
    },
    {
      title: { en: "Take it on the road", ru: "Возьмите в дорогу", kk: "Жолға алып шығыңыз" },
      body: {
        en: "Power the ESP32 from a power bank through its USB port, put everything in a small plastic box with the antenna side up, and place it under a windscreen or on a bike rack. Turn on your phone's hotspot before powering up so the tracker joins it.",
        ru: "Питайте ESP32 от пауэрбанка через USB-порт, уложите всё в небольшую пластиковую коробку антенной вверх и положите под лобовое стекло или на багажник велосипеда. Включите точку доступа на телефоне до подачи питания, чтобы трекер к ней подключился.",
        kk: "ESP32-ні пауэрбанктан USB порты арқылы қоректендіріп, бәрін антеннасы жоғары қарайтындай шағын пластик қорапқа салыңыз да, алдыңғы әйнектің астына немесе велосипед жүк салғышына қойыңыз. Трекер қосылуы үшін қуат бермес бұрын телефоныңыздың хотспотын қосыңыз.",
      },
      expect: { en: "Speed updates while you move and the map link follows you.", ru: "Скорость обновляется на ходу, а ссылка на карту следует за вами.", kk: "Қозғалыс кезінде жылдамдық жаңарады, ал карта сілтемесі сізге ілеседі." },
      mistake: { en: "A metal box or a heated windscreen with metal film blocks the satellites.", ru: "Металлический корпус или лобовое стекло с металлизированным подогревом глушат спутники.", kk: "Металл қорап немесе металданған жылыту қабаты бар алдыңғы әйнек жерсеріктерді бөгейді." },
    },
  ],
  code: [{
    filename: "gps_tracker.ino",
    language: "cpp",
    libraries: ["TinyGPSPlus"],
    source: String.raw`#include <WiFi.h>
#include <WebServer.h>
#include <TinyGPSPlus.h>

// ---- change these ----
const char* WIFI_SSID = "YOUR_WIFI";        // home Wi-Fi or your phone's hotspot
const char* WIFI_PASS = "YOUR_PASSWORD";
const char* AP_SSID = "ropros-gps";         // fallback access point
const char* AP_PASS = "ropros123";          // at least 8 characters, change it

const int GPS_RX_PIN = 16;   // ESP32 RX2 <- GPS TX
const int GPS_TX_PIN = 17;   // ESP32 TX2 -> GPS RX
const uint32_t GPS_BAUD = 9600;

TinyGPSPlus gps;
WebServer server(80);
unsigned long lastLog = 0;

const char PAGE[] PROGMEM = R"rawliteral(<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>GPS tracker</title>
<style>
body{margin:0;padding:20px;font-family:system-ui,sans-serif;background:#0b0f14;color:#e6edf3;max-width:480px}
.pos{font-family:monospace;font-size:22px;margin:8px 0 16px}
table{width:100%;border-collapse:collapse}td{padding:6px 0;border-bottom:1px solid #263040}td:last-child{text-align:right}
a{display:block;margin-top:18px;padding:14px;text-align:center;border-radius:12px;background:#FF7A1A;color:#0b0f14;font-weight:700;text-decoration:none}
a.off{background:#263040;color:#8b98a5;pointer-events:none}
</style></head><body>
<div id="state">waiting for data...</div>
<div class="pos" id="pos">--</div>
<table>
<tr><td>Satellites</td><td id="sats">--</td></tr>
<tr><td>HDOP</td><td id="hdop">--</td></tr>
<tr><td>Speed</td><td id="spd">--</td></tr>
<tr><td>Altitude</td><td id="alt">--</td></tr>
<tr><td>UTC time</td><td id="utc">--</td></tr>
</table>
<a id="map" class="off" target="_blank" rel="noopener">Open in Google Maps</a>
<script>
function set(id, v) { document.getElementById(id).textContent = v; }
function update() {
  fetch('/data').then(function (r) { return r.json(); }).then(function (d) {
    set('sats', d.sats); set('utc', d.utc);
    var a = document.getElementById('map');
    if (d.fix) {
      set('state', 'fix (' + d.age + ' ms old)');
      set('pos', d.lat.toFixed(6) + ', ' + d.lng.toFixed(6));
      set('hdop', d.hdop.toFixed(1)); set('spd', d.kmh.toFixed(1) + ' km/h'); set('alt', d.alt.toFixed(0) + ' m');
      a.href = 'https://www.google.com/maps?q=' + d.lat.toFixed(6) + ',' + d.lng.toFixed(6);
      a.className = '';
    } else {
      set('state', d.chars > 0 ? 'searching for satellites...' : 'no data from GPS module');
      a.className = 'off';
    }
  }).catch(function () { set('state', 'tracker offline'); });
}
update();
setInterval(update, 2000);
</script></body></html>)rawliteral";

void handleData() {
  bool fix = gps.location.isValid() && gps.location.age() < 5000;
  char utc[12] = "--";
  if (gps.time.isValid()) snprintf(utc, sizeof(utc), "%02d:%02d:%02d", gps.time.hour(), gps.time.minute(), gps.time.second());
  char json[256];
  snprintf(json, sizeof(json),
           "{\"fix\":%s,\"lat\":%.6f,\"lng\":%.6f,\"sats\":%lu,\"hdop\":%.2f,\"kmh\":%.1f,\"alt\":%.1f,\"age\":%lu,\"utc\":\"%s\",\"chars\":%lu}",
           fix ? "true" : "false", gps.location.lat(), gps.location.lng(),
           (unsigned long)gps.satellites.value(), gps.hdop.hdop(), gps.speed.kmph(), gps.altitude.meters(),
           (unsigned long)gps.location.age(), utc, (unsigned long)gps.charsProcessed());
  server.sendHeader("Cache-Control", "no-store");
  server.send(200, "application/json", json);
}

void startNetwork() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.printf("Connecting to %s", WIFI_SSID);
  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("Wi-Fi connected, open http://");
    Serial.println(WiFi.localIP());
  } else {
    WiFi.disconnect(true);
    WiFi.mode(WIFI_AP);
    WiFi.softAP(AP_SSID, AP_PASS);
    Serial.printf("No Wi-Fi: join \"%s\" and open http://", AP_SSID);
    Serial.println(WiFi.softAPIP());
  }
}

void setup() {
  Serial.begin(115200);
  Serial2.begin(GPS_BAUD, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);
  Serial.printf("GPS on UART2: RX=GPIO%d TX=GPIO%d @ %lu\n", GPS_RX_PIN, GPS_TX_PIN, (unsigned long)GPS_BAUD);

  startNetwork();
  server.on("/", []() { server.send(200, "text/html", PAGE); });
  server.on("/data", handleData);
  server.begin();
}

void loop() {
  while (Serial2.available()) gps.encode(Serial2.read());   // feed every NMEA character
  server.handleClient();

  if (millis() - lastLog >= 5000) {
    lastLog = millis();
    if (gps.charsProcessed() < 10) {
      Serial.println("No GPS data: check GPS TX -> GPIO16 and power");
    } else if (gps.location.isValid()) {
      Serial.printf("sats=%lu fix %.6f,%.6f hdop %.1f %.1f km/h\n", (unsigned long)gps.satellites.value(),
                    gps.location.lat(), gps.location.lng(), gps.hdop.hdop(), gps.speed.kmph());
    } else {
      Serial.printf("sats=%lu no fix yet (chars %lu)\n", (unsigned long)gps.satellites.value(), (unsigned long)gps.charsProcessed());
    }
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"No GPS data\" every 5 seconds", ru: "Каждые 5 секунд «No GPS data»", kk: "Әр 5 секунд сайын «No GPS data»" },
      cause: { en: "TX and RX are not crossed, the module has no power, or it was set to a baud rate other than 9600.", ru: "TX и RX не перекрещены, у модуля нет питания или он настроен не на 9600 бод.", kk: "TX пен RX айқастырылмаған, модульде қуат жоқ немесе ол 9600 бодтан басқа жылдамдыққа бапталған." },
      fix: { en: "Check GPS TX → GPIO16, GPS RX → GPIO17, measure 5 V on VCC, and try GPS_BAUD = 38400 if the module was reconfigured.", ru: "Проверьте TX GPS → GPIO16, RX GPS → GPIO17, измерьте 5 В на VCC и попробуйте GPS_BAUD = 38400, если модуль перенастраивали.", kk: "GPS TX → GPIO16, GPS RX → GPIO17 екенін тексеріп, VCC-де 5 В өлшеңіз, ал модуль қайта бапталған болса, GPS_BAUD = 38400 қойып көріңіз." },
    },
    {
      symptom: { en: "Characters arrive but there is never a fix", ru: "Данные идут, но фиксации нет", kk: "Деректер келеді, бірақ бекіту жоқ" },
      cause: { en: "Not enough sky view, the antenna is upside down, or its u.FL plug is loose.", ru: "Мало видно неба, антенна перевёрнута или разъём u.FL плохо сидит.", kk: "Аспан аз көрінеді, антенна төңкерілген немесе u.FL ажыратқышы нашар отыр." },
      fix: { en: "Go fully outside, ceramic side up, reseat the plug, and wait up to 10 minutes for the first cold start.", ru: "Выйдите полностью на улицу, керамикой вверх, переподключите разъём и подождите до 10 минут при первом холодном старте.", kk: "Толықтай сыртқа шығып, керамикасын жоғары қаратыңыз, ажыратқышты қайта қосып, алғашқы суық іске қосуда 10 минутқа дейін күтіңіз." },
    },
    {
      symptom: { en: "Every power-up takes minutes to find a fix again", ru: "Каждое включение снова ищет позицию несколько минут", kk: "Әр қосылғанда орынды қайтадан бірнеше минут іздейді" },
      cause: { en: "The module's small backup battery is empty, so it forgets the satellite almanac.", ru: "Маленькая резервная батарейка модуля разряжена, и он забывает альманах спутников.", kk: "Модульдің кішкентай резервтік батареясы таусылған, сондықтан ол жерсеріктер альманағын ұмытады." },
      fix: { en: "Leave the module powered for an hour to charge it; after that, warm starts take seconds.", ru: "Оставьте модуль включённым на час, чтобы батарейка зарядилась; после этого тёплый старт занимает секунды.", kk: "Батарея зарядталуы үшін модульді бір сағатқа қосулы қалдырыңыз; содан кейін жылы іске қосу бірнеше секунд алады." },
    },
  ],
  safety: [
    { en: "Only track yourself or your own vehicle. Hiding a tracker on someone else's property or person without consent is illegal in many countries.", ru: "Отслеживайте только себя или своё транспортное средство. Скрытая установка трекера на чужую вещь или человека без согласия во многих странах незаконна.", kk: "Тек өзіңізді немесе өз көлігіңізді бақылаңыз. Трекерді басқа біреудің мүлкіне немесе өзіне келісімсіз жасырын орнату көптеген елдерде заңсыз." },
    { en: "Do not read the page while driving; check the position only when stopped.", ru: "Не смотрите на страницу за рулём; проверяйте позицию только на остановке.", kk: "Көлік жүргізіп келе жатып бетке қарамаңыз; орынды тек тоқтағанда тексеріңіз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "GPS on UART2: RX=GPIO16 TX=GPIO17 @ 9600",
      "Connecting to YOUR_WIFI......",
      "Wi-Fi connected, open http://192.168.43.120",
      "sats=0 no fix yet (chars 4821)",
      "sats=3 no fix yet (chars 9655)",
      "sats=5 fix 43.238949,76.889709 hdop 1.8 0.4 km/h",
      "sats=7 fix 43.238951,76.889715 hdop 1.2 0.2 km/h",
      "sats=8 fix 43.239310,76.890402 hdop 1.1 18.6 km/h",
    ],
    leds: [],
  },
} satisfies GuideContent;
