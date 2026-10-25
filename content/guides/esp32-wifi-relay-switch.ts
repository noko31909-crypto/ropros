import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-wifi-relay-switch",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "home",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 11,
  xpReward: 150,
  title: {
    en: "ESP32 Wi-Fi Relay Switch",
    ru: "Wi-Fi реле на ESP32",
    kk: "ESP32-дегі Wi-Fi реле",
  },
  summary: {
    en: "Switch a low-voltage load such as a 5 V fan or a 12 V LED strip from a phone browser or a push button. Both controls stay in sync, and the relay is never used on mains.",
    ru: "Включайте низковольтную нагрузку, например вентилятор 5 В или светодиодную ленту 12 В, из браузера телефона или кнопкой. Оба способа синхронизированы, а реле никогда не работает с сетью 220 В.",
    kk: "5 В желдеткіш немесе 12 В жарық диодты таспа сияқты төмен вольтты жүктемені телефон браузерінен немесе батырмамен қосыңыз. Екі басқару тәсілі үйлесімді, ал реле ешқашан 220 В желімен жұмыс істемейді.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit V1 (WROOM-32), 3.3 V logic", ru: "ESP32 DevKit V1 (WROOM-32), логика 3,3 В", kk: "ESP32 DevKit V1 (WROOM-32), 3,3 В логика" }, role: { en: "Controller and web server", ru: "Контроллер и веб-сервер", kk: "Контроллер және веб-сервер" } },
    { component: "relay-module", qty: 1, spec: { en: "1-channel 5 V, high-level trigger or optocoupler type (see step 1)", ru: "1 канал 5 В, с управлением высоким уровнем или с оптопарой (см. шаг 1)", kk: "1 арналы 5 В, жоғары деңгеймен басқарылатын немесе оптожұпты (1-қадамды қараңыз)" }, role: { en: "Switches the load", ru: "Коммутирует нагрузку", kk: "Жүктемені коммутациялайды" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Local on/off", ru: "Локальное вкл/выкл", kk: "Жергілікті қосу/өшіру" } },
    { component: "fan-5v", qty: 1, spec: { en: "5 V DC, 40 mm (or a 12 V LED strip ≤ 2 A with its own adapter)", ru: "5 В DC, 40 мм (или лента 12 В до 2 А со своим адаптером)", kk: "5 В DC, 40 мм (немесе өз адаптері бар 2 А-ге дейінгі 12 В таспа)" }, role: { en: "Demo load", ru: "Демонстрационная нагрузка", kk: "Көрсетілім жүктемесі" } },
    { component: "usb-5v", qty: 1, spec: { en: "second USB charger with a cut cable or a USB breakout", ru: "второе USB-зарядное с разрезанным кабелем или USB-переходником", kk: "кесілген кабелі немесе USB ажыратқышы бар екінші USB зарядтағыш" }, role: { en: "Load supply, separate from the ESP32", ru: "Питание нагрузки, отдельно от ESP32", kk: "Жүктеме қуаты, ESP32-ден бөлек" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-female and male-male", ru: "папа-мама и папа-папа", kk: "аталық-аналық және аталық-аталық" }, role: { en: "Signal wiring", ru: "Сигнальные соединения", kk: "Сигнал қосылыстары" } },
  ],
  instances: [
    { id: "relay", component: "relay-module", label: "Relay" },
    { id: "btn", component: "push-button", label: "Toggle" },
    { id: "psu", component: "usb-5v", label: "Load 5 V supply" },
    { id: "fan", component: "fan-5v", label: "Load" },
  ],
  connections: [
    { from: "board.5V", to: "relay.VCC", color: "red", note: { en: "the coil needs 5 V (about 70 mA)", ru: "катушке нужно 5 В (около 70 мА)", kk: "орамға 5 В керек (шамамен 70 мА)" } },
    { from: "relay.GND", to: "board.GND", color: "black" },
    { from: "board.GPIO26", to: "relay.IN", color: "orange", note: { en: "3.3 V control signal", ru: "управляющий сигнал 3,3 В", kk: "3,3 В басқару сигналы" } },
    { from: "board.GPIO27", to: "btn.1", color: "blue", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажата = LOW", kk: "ішкі тарту, басылған = LOW" } },
    { from: "btn.2", to: "board.GND2", color: "black" },
    { from: "psu.5V", to: "relay.COM", color: "red", note: { en: "load supply + into the relay contact", ru: "+ питания нагрузки на контакт реле", kk: "жүктеме қуатының + реле түйіспесіне" } },
    { from: "relay.NO", to: "fan.+", color: "red", note: { en: "NO: load is off when the relay is idle", ru: "NO: без сигнала нагрузка выключена", kk: "NO: сигнал болмаса, жүктеме өшік" } },
    { from: "fan.-", to: "psu.GND", color: "black" },
  ],
  steps: [
    {
      title: { en: "Check how your relay module is triggered", ru: "Узнайте, как управляется ваш модуль реле", kk: "Реле модуліңіз қалай басқарылатынын біліңіз" },
      body: {
        en: "The module's coil runs on 5 V, but its IN pin only needs a logic signal. Modules with an NPN transistor and a \"high level trigger\" (or an H/L jumper set to H) switch reliably from the ESP32's 3.3 V. Optocoupler modules that switch on LOW also work. Avoid boards with a PNP input stage that are active LOW: a 3.3 V HIGH cannot turn them off. Set RELAY_ACTIVE_LOW in the sketch to match.",
        ru: "Катушка модуля работает от 5 В, но на вход IN нужен лишь логический сигнал. Модули с NPN-транзистором и пометкой «high level trigger» (или с перемычкой H/L в положении H) надёжно переключаются от 3,3 В ESP32. Модули с оптопарой, включающиеся по LOW, тоже подходят. Избегайте плат с PNP-входом и активным LOW: высокий уровень 3,3 В не сможет их выключить. В скетче выставьте RELAY_ACTIVE_LOW под свой модуль.",
        kk: "Модульдің орамы 5 В-пен жұмыс істейді, бірақ IN кірісіне тек логикалық сигнал керек. NPN транзисторлы және «high level trigger» белгісі бар (немесе H/L секіргіші H күйінде тұрған) модульдер ESP32-нің 3,3 В сигналынан сенімді қосылады. LOW деңгейде қосылатын оптожұпты модульдер де жарайды. PNP кірісі бар, белсенді LOW платалардан аулақ болыңыз: 3,3 В HIGH деңгейі оларды өшіре алмайды. Скетчте RELAY_ACTIVE_LOW мәнін модуліңізге сәйкес қойыңыз.",
      },
      expect: { en: "You know whether IN switches on HIGH or LOW and have set the constant.", ru: "Вы знаете, включается ли IN по HIGH или по LOW, и выставили константу.", kk: "IN HIGH-та ма, әлде LOW-да қосылатынын білесіз және тұрақтыны қойдыңыз." },
      mistake: { en: "A wrong RELAY_ACTIVE_LOW makes the web button work backwards: \"ON\" turns the load off.", ru: "Неверный RELAY_ACTIVE_LOW делает кнопку на странице «наоборот»: «ON» выключает нагрузку.", kk: "RELAY_ACTIVE_LOW қате болса, беттегі батырма керісінше істейді: «ON» жүктемені өшіреді." },
    },
    {
      title: { en: "Wire the relay to the ESP32", ru: "Подключите реле к ESP32", kk: "Релені ESP32-ге қосыңыз" },
      body: {
        en: "Relay VCC goes to the ESP32 5V pin (it carries USB 5 V), GND to GND and IN to GPIO26. GPIO26 is not a boot-strapping pin, so the relay stays quiet while the board starts.",
        ru: "VCC реле подключите к пину 5V платы ESP32 (на нём 5 В от USB), GND к GND, а IN к GPIO26. GPIO26 не участвует в выборе режима загрузки, поэтому реле не щёлкает при старте платы.",
        kk: "Реленің VCC пинін ESP32-нің 5V пиніне (онда USB-ден 5 В бар), GND-ін GND-ге, ал IN-ін GPIO26-ға қосыңыз. GPIO26 жүктеу режимін таңдауға қатыспайды, сондықтан плата іске қосылғанда реле шертпейді.",
      },
      expect: { en: "The relay's power LED lights when the ESP32 is on USB.", ru: "Светодиод питания реле горит, когда ESP32 подключена к USB.", kk: "ESP32 USB-ге қосылғанда реленің қуат жарық диоды жанады." },
      mistake: { en: "Powering VCC from 3V3 leaves the coil too weak to pull in reliably.", ru: "Если запитать VCC от 3V3, катушке не хватит напряжения для надёжного срабатывания.", kk: "VCC-ді 3V3-тен қоректендірсеңіз, орамға сенімді іске қосылу үшін кернеу жетпейді." },
    },
    {
      title: { en: "Add the push button", ru: "Добавьте кнопку", kk: "Батырманы қосыңыз" },
      body: {
        en: "Place the button across the breadboard gap. One leg goes to GPIO27, the diagonally opposite leg to GND. The sketch enables the internal pull-up and debounces the press, so each press toggles the relay exactly once.",
        ru: "Поставьте кнопку поперёк канавки макетки. Одну ножку подключите к GPIO27, ножку по диагонали к GND. Скетч включает внутреннюю подтяжку и подавляет дребезг, поэтому каждое нажатие переключает реле ровно один раз.",
        kk: "Батырманы макет тақтасының ойығына көлденең қойыңыз. Бір аяғын GPIO27-ге, диагональ бойынша қарсы аяғын GND-ге қосыңыз. Скетч ішкі тартуды қосып, дірілді басады, сондықтан әр басу релені дәл бір рет ауыстырады.",
      },
      expect: { en: "Pressing the button prints \"Relay ON (button)\" and the relay clicks.", ru: "При нажатии печатается «Relay ON (button)» и реле щёлкает.", kk: "Басқанда «Relay ON (button)» шығады және реле шертеді." },
      mistake: { en: "Two wires on legs that are always connected make the relay toggle non-stop.", ru: "Если провода стоят на всегда соединённых ножках, реле будет переключаться без остановки.", kk: "Сымдар әрқашан жалғанған аяқтарда тұрса, реле тоқтаусыз ауыса береді." },
    },
    {
      title: { en: "Connect the low-voltage load", ru: "Подключите низковольтную нагрузку", kk: "Төмен вольтты жүктемені қосыңыз" },
      body: {
        en: "The relay contacts are a plain switch in the load's + wire. Take the + of a separate 5 V supply to COM, run NO to the fan's red wire, and the fan's black wire back to the supply's GND. For a 12 V LED strip use the same layout with its 12 V adapter and screw-terminal wire rated for its current. The load circuit does not need to share ground with the ESP32.",
        ru: "Контакты реле — это обычный выключатель в проводе + нагрузки. Подайте + отдельного блока 5 В на COM, от NO проведите провод к красному проводу вентилятора, а чёрный провод вентилятора верните на GND этого блока. Для ленты 12 В схема та же, только с её адаптером 12 В и проводом под её ток в винтовых клеммах. Цепи нагрузки не нужна общая земля с ESP32.",
        kk: "Реле түйіспелері — жүктеменің + сымындағы қарапайым ажыратқыш. Бөлек 5 В қорек көзінің +-ін COM-ға беріңіз, NO-дан желдеткіштің қызыл сымына сым тартыңыз, ал желдеткіштің қара сымын сол қорек көзінің GND-іне қайтарыңыз. 12 В таспа үшін схема бірдей, тек оның 12 В адаптері мен тогына сай сымды бұрандалы клеммаларға қосыңыз. Жүктеме тізбегіне ESP32-мен ортақ жер қажет емес.",
      },
      expect: { en: "The fan stays off until the relay clicks on.", ru: "Вентилятор не крутится, пока реле не щёлкнет.", kk: "Реле шертпейінше желдеткіш айналмайды." },
      mistake: { en: "Using NC instead of NO inverts the logic: the load runs whenever the ESP32 is off.", ru: "Если взять NC вместо NO, логика инвертируется: нагрузка работает, когда ESP32 выключена.", kk: "NO орнына NC алсаңыз, логика керісінше болады: ESP32 өшік кезде жүктеме жұмыс істейді." },
    },
    {
      title: { en: "Upload, then switch from your phone", ru: "Загрузите скетч и управляйте с телефона", kk: "Скетчті жүктеп, телефоннан басқарыңыз" },
      body: {
        en: "Enter your 2.4 GHz Wi-Fi name and password, upload, and open the Serial Monitor at 115200 baud. Open the printed address on your phone. The big button sends POST /toggle; the page also asks /state every two seconds, so a press on the physical button shows up on every open browser.",
        ru: "Впишите имя и пароль сети 2,4 ГГц, загрузите скетч и откройте Serial Monitor на 115200 бод. Откройте напечатанный адрес на телефоне. Большая кнопка отправляет POST /toggle, а страница каждые две секунды запрашивает /state, поэтому нажатие физической кнопки видно во всех открытых браузерах.",
        kk: "2,4 ГГц Wi-Fi желісінің аты мен құпиясөзін жазып, скетчті жүктеңіз және Serial Monitor-ды 115200 бодта ашыңыз. Басып шығарылған мекенжайды телефонда ашыңыз. Үлкен батырма POST /toggle жібереді, ал бет әр екі секунд сайын /state сұрайды, сондықтан физикалық батырманы басу барлық ашық браузерлерде көрінеді.",
      },
      expect: { en: "Tapping the page and pressing the button both toggle the fan, and the page label follows.", ru: "И нажатие на странице, и кнопка переключают вентилятор, а надпись на странице меняется вслед.", kk: "Беттегі батырма да, физикалық батырма да желдеткішті ауыстырады, ал беттегі жазу соған сай өзгереді." },
      mistake: { en: "Opening the page from mobile data instead of home Wi-Fi: the ESP32 is only reachable inside your network.", ru: "Страница открыта через мобильный интернет, а не домашний Wi-Fi: ESP32 доступна только внутри вашей сети.", kk: "Бет үй Wi-Fi-ы арқылы емес, мобильді интернеттен ашылған: ESP32-ге тек өз желіңіз ішінен қол жетеді." },
    },
  ],
  code: [{
    filename: "wifi_relay_switch.ino",
    language: "cpp",
    libraries: [],
    source: String.raw`#include <WiFi.h>
#include <WebServer.h>

// ---- change these ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_PASSWORD";
const bool RELAY_ACTIVE_LOW = false;   // true if your module switches on when IN is LOW

const int RELAY_PIN = 26;
const int BUTTON_PIN = 27;
const unsigned long DEBOUNCE_MS = 30;

WebServer server(80);
bool relayOn = false;

const char PAGE[] PROGMEM = R"rawliteral(<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Relay</title>
<style>
body{margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui,sans-serif;background:#0b0f14;color:#e6edf3}
button{width:200px;height:200px;border-radius:50%;border:4px solid #263040;font-size:36px;font-weight:700;background:#151b23;color:#8b98a5}
button.on{background:#FF7A1A;border-color:#FFB37A;color:#0b0f14}
p{color:#8b98a5}
</style></head><body>
<button id="b" onclick="toggle()">...</button>
<p id="s">connecting...</p>
<script>
function render(d) {
  var b = document.getElementById('b');
  b.textContent = d.on ? 'ON' : 'OFF';
  b.className = d.on ? 'on' : '';
  document.getElementById('s').textContent = 'load is ' + (d.on ? 'on' : 'off');
}
function poll() { fetch('/state').then(function (r) { return r.json(); }).then(render).catch(function () {
  document.getElementById('s').textContent = 'offline'; }); }
function toggle() { fetch('/toggle', { method: 'POST' }).then(function (r) { return r.json(); }).then(render); }
poll();
setInterval(poll, 2000);
</script></body></html>)rawliteral";

void setRelay(bool on, const char* source) {
  relayOn = on;
  digitalWrite(RELAY_PIN, (on != RELAY_ACTIVE_LOW) ? HIGH : LOW);
  Serial.printf("Relay %s (%s)\n", on ? "ON" : "OFF", source);
}

void sendState() {
  server.sendHeader("Cache-Control", "no-store");
  server.send(200, "application/json", relayOn ? "{\"on\":true}" : "{\"on\":false}");
}

void handleToggle() {
  setRelay(!relayOn, "web");
  sendState();
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  setRelay(false, "boot");                 // load off before anything else
  pinMode(BUTTON_PIN, INPUT_PULLUP);       // pressed = LOW
  Serial.println(RELAY_ACTIVE_LOW ? "Relay module: active LOW" : "Relay module: active HIGH");

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

  server.on("/", []() { server.send(200, "text/html", PAGE); });
  server.on("/state", sendState);
  server.on("/toggle", HTTP_POST, handleToggle);
  server.begin();
}

void loop() {
  server.handleClient();

  // debounced button: toggle once per press
  static int lastReading = HIGH;
  static int stableState = HIGH;
  static unsigned long changedAt = 0;
  int reading = digitalRead(BUTTON_PIN);
  if (reading != lastReading) {
    changedAt = millis();
    lastReading = reading;
  }
  if (millis() - changedAt > DEBOUNCE_MS && reading != stableState) {
    stableState = reading;
    if (stableState == LOW) setRelay(!relayOn, "button");
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Relay LED lights but the relay never releases", ru: "Светодиод реле горит, но реле не отпускает", kk: "Реле жарық диоды жанады, бірақ реле ажырамайды" },
      cause: { en: "An active-LOW module with a PNP input: 3.3 V on IN is still \"low\" compared with its 5 V supply.", ru: "Модуль с PNP-входом и активным LOW: 3,3 В на IN для него всё ещё «низкий» уровень относительно питания 5 В.", kk: "PNP кірісі бар белсенді LOW модуль: оның 5 В қорегіне қарағанда IN-дегі 3,3 В әлі де «төмен» деңгей." },
      fix: { en: "Use a high-level-trigger or optocoupler module, or set its H/L jumper to H and RELAY_ACTIVE_LOW = false.", ru: "Возьмите модуль с управлением высоким уровнем или с оптопарой либо переставьте перемычку H/L в H и задайте RELAY_ACTIVE_LOW = false.", kk: "Жоғары деңгеймен басқарылатын немесе оптожұпты модуль алыңыз, не H/L секіргішін H-қа қойып, RELAY_ACTIVE_LOW = false деп жазыңыз." },
    },
    {
      symptom: { en: "The relay clicks but the fan does not spin", ru: "Реле щёлкает, но вентилятор не крутится", kk: "Реле шертеді, бірақ желдеткіш айналмайды" },
      cause: { en: "The load wires are on COM and NC, or the load supply's GND is not back at the fan.", ru: "Провода нагрузки стоят на COM и NC, или GND блока нагрузки не доходит до вентилятора.", kk: "Жүктеме сымдары COM мен NC-ге қосылған немесе жүктеме қорек көзінің GND-і желдеткішке жетпейді." },
      fix: { en: "Use COM and NO, and close the loop: supply + → COM, NO → fan +, fan − → supply GND.", ru: "Используйте COM и NO и замкните цепь: + блока → COM, NO → + вентилятора, − вентилятора → GND блока.", kk: "COM мен NO-ны пайдаланып, тізбекті тұйықтаңыз: қорек + → COM, NO → желдеткіш +, желдеткіш − → қорек GND." },
    },
    {
      symptom: { en: "The ESP32 resets when the relay switches", ru: "ESP32 перезагружается при срабатывании реле", kk: "Реле іске қосылғанда ESP32 қайта жүктеледі" },
      cause: { en: "A weak USB cable or port cannot supply the coil and Wi-Fi peaks together, or the load shares the ESP32's USB supply.", ru: "Слабый USB-кабель или порт не тянет одновременно катушку и пики Wi-Fi, или нагрузка питается от того же USB, что и ESP32.", kk: "Әлсіз USB кабелі не порт орам мен Wi-Fi шыңдарын бірге көтере алмайды немесе жүктеме ESP32-мен бір USB-ден қоректенеді." },
      fix: { en: "Use a short, thick USB cable and a 1 A adapter for the ESP32, and keep the load on its own supply as in the diagram.", ru: "Возьмите короткий толстый USB-кабель и адаптер на 1 А для ESP32, а нагрузку питайте от отдельного блока, как на схеме.", kk: "ESP32 үшін қысқа, жуан USB кабелі мен 1 А адаптерін алыңыз, ал жүктемені схемадағыдай бөлек қорек көзінен қоректендіріңіз." },
    },
  ],
  safety: [
    { en: "Low voltage only (≤ 30 V DC). Even though the relay is printed with 250 VAC, never connect it to mains: open modules have exposed solder joints.", ru: "Только низкое напряжение (≤ 30 В DC). Хотя на реле написано 250 VAC, никогда не подключайте его к сети: у открытых модулей оголённые пайки.", kk: "Тек төмен кернеу (≤ 30 В DC). Релеге 250 VAC деп жазылса да, оны ешқашан желіге қоспаңыз: ашық модульдердің дәнекерлеу нүктелері ашық тұр." },
    { en: "Breadboards and jumper wires handle about 1 A. For a 12 V LED strip use screw terminals and wire rated for the strip's current.", ru: "Макетка и перемычки выдерживают около 1 А. Для ленты 12 В используйте винтовые клеммы и провод, рассчитанный на её ток.", kk: "Макет тақтасы мен сымдар шамамен 1 А көтереді. 12 В таспа үшін бұрандалы клеммалар мен оның тогына есептелген сымды пайдаланыңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Relay OFF (boot)",
      "Relay module: active HIGH",
      "Connecting to YOUR_WIFI....",
      "Wi-Fi connected, open http://192.168.1.58",
      "Relay ON (web)",
      "Relay OFF (button)",
      "Relay ON (button)",
      "Relay OFF (web)",
    ],
    leds: [{ label: "RELAY", color: "#FF7A1A" }],
  },
} satisfies GuideContent;
