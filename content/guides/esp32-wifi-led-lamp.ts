import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-wifi-led-lamp",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "home",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 13,
  xpReward: 220,
  title: {
    en: "ESP32 Wi-Fi LED Lamp with Colour Picker",
    ru: "Wi-Fi лампа на ESP32 с выбором цвета",
    kk: "Түс таңдағышы бар ESP32 Wi-Fi шамы",
  },
  summary: {
    en: "A 16-LED WS2812B ring on its own 5 V supply becomes a mood lamp. Pick any colour, brightness or a rainbow effect on a web page; the lamp remembers your choice after a power cut.",
    ru: "Кольцо из 16 светодиодов WS2812B на отдельном питании 5 В превращается в лампу настроения. Цвет, яркость или эффект радуги выбираются на веб-странице, а после отключения питания лампа помнит ваш выбор.",
    kk: "Бөлек 5 В қорегі бар 16 жарық диодты WS2812B сақинасы көңіл-күй шамына айналады. Түсті, жарықтықты немесе кемпірқосақ әсерін веб-беттен таңдайсыз, ал қуат өшкеннен кейін шам таңдауыңызды есте сақтайды.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit V1 (WROOM-32), 3.3 V logic", ru: "ESP32 DevKit V1 (WROOM-32), логика 3,3 В", kk: "ESP32 DevKit V1 (WROOM-32), 3,3 В логика" }, role: { en: "Controller and web server", ru: "Контроллер и веб-сервер", kk: "Контроллер және веб-сервер" } },
    { component: "ws2812b-ring", qty: 1, spec: { en: "16 × WS2812B (5050), 5 V, up to ~1 A at full white", ru: "16 × WS2812B (5050), 5 В, до ~1 А на полном белом", kk: "16 × WS2812B (5050), 5 В, толық ақ түсте ~1 А-ге дейін" }, role: { en: "Light source", ru: "Источник света", kk: "Жарық көзі" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V 2 A USB adapter with a cut cable or USB breakout", ru: "USB-адаптер 5 В 2 А с разрезанным кабелем или USB-переходником", kk: "кесілген кабелі немесе USB ажыратқышы бар 5 В 2 А USB адаптері" }, role: { en: "LED power, separate from the ESP32", ru: "Питание светодиодов, отдельно от ESP32", kk: "Жарық диодтарының қуаты, ESP32-ден бөлек" } },
    { component: "capacitor", qty: 1, spec: { en: "1000 µF, 10 V or higher, electrolytic", ru: "1000 мкФ, от 10 В, электролитический", kk: "1000 мкФ, 10 В-тан жоғары, электролиттік" }, role: { en: "Smooths the LED supply at power-on", ru: "Сглаживает питание светодиодов при включении", kk: "Қосқанда жарық диодтарының қорегін тегістейді" } },
    { component: "resistor", qty: 1, spec: { en: "330 Ω, ¼ W", ru: "330 Ом, ¼ Вт", kk: "330 Ом, ¼ Вт" }, role: { en: "Data line series resistor", ru: "Последовательный резистор линии данных", kk: "Деректер желісінің тізбектей резисторы" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-male; solder three wires to the ring", ru: "папа-папа; три провода припаять к кольцу", kk: "аталық-аталық; сақинаға үш сым дәнекерленеді" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ring", component: "ws2812b-ring", label: "16 LED ring" },
    { id: "r_data", component: "resistor", label: "330 Ω" },
    { id: "psu", component: "usb-5v", label: "LED 5 V 2 A" },
    { id: "c1", component: "capacitor", label: "1000 µF" },
  ],
  connections: [
    { from: "psu.5V", to: "ring.5V", color: "red", note: { en: "LED power straight from the adapter", ru: "питание светодиодов прямо от адаптера", kk: "жарық диодтарының қуаты тікелей адаптерден" } },
    { from: "ring.GND", to: "psu.GND", color: "black" },
    { from: "psu.5V", to: "c1.A", color: "red", note: { en: "+ leg (long) to 5 V", ru: "+ (длинная ножка) к 5 В", kk: "+ (ұзын аяғы) 5 В-қа" } },
    { from: "c1.B", to: "psu.GND", color: "black", note: { en: "striped leg to GND", ru: "ножка с полосой к GND", kk: "жолақты аяғы GND-ге" } },
    { from: "psu.GND", to: "board.GND", color: "black", note: { en: "shared ground: required for the data signal", ru: "общая земля: обязательна для сигнала данных", kk: "ортақ жер: деректер сигналы үшін міндетті" } },
    { from: "board.GPIO27", to: "r_data.A", color: "green" },
    { from: "r_data.B", to: "ring.DIN", color: "green", note: { en: "keep under 20 cm", ru: "не длиннее 20 см", kk: "20 см-ден ұзын емес" } },
  ],
  steps: [
    {
      title: { en: "Plan the power budget", ru: "Рассчитайте питание", kk: "Қуат бюджетін есептеңіз" },
      body: {
        en: "Each WS2812B draws up to 60 mA at full white, so 16 LEDs can pull nearly 1 A. That is too much for the ESP32's 5V pin, so the ring gets its own 5 V 2 A adapter. The sketch also caps brightness at 150 of 255, which keeps the worst case around 0.6 A and the LEDs cooler.",
        ru: "Каждый WS2812B на полном белом берёт до 60 мА, поэтому 16 светодиодов тянут почти 1 А. Это слишком много для пина 5V платы ESP32, поэтому кольцо питается от своего адаптера 5 В 2 А. Скетч также ограничивает яркость до 150 из 255: в худшем случае это около 0,6 А, и светодиоды меньше греются.",
        kk: "Әр WS2812B толық ақ түсте 60 мА-ге дейін тартады, сондықтан 16 жарық диоды шамамен 1 А алады. Бұл ESP32-нің 5V пині үшін тым көп, сондықтан сақина өзінің 5 В 2 А адаптерінен қоректенеді. Скетч жарықтықты 255-тің 150-іне дейін шектейді: ең нашар жағдайда бұл шамамен 0,6 А, ал жарық диодтары азырақ қызады.",
      },
      expect: { en: "A 5 V adapter rated at least 2 A, separate from the ESP32's USB cable.", ru: "Адаптер 5 В минимум на 2 А, отдельный от USB-кабеля ESP32.", kk: "ESP32 USB кабелінен бөлек, кемінде 2 А-ге есептелген 5 В адаптер." },
      mistake: { en: "Running the ring from the ESP32 5V pin works at low brightness, then resets the board when you pick white.", ru: "Кольцо от пина 5V платы ESP32 работает на малой яркости, а на белом цвете плата перезагружается.", kk: "ESP32-нің 5V пинінен қоректенген сақина төмен жарықтықта жұмыс істейді, бірақ ақ түсті таңдағанда плата қайта жүктеледі." },
    },
    {
      title: { en: "Solder wires to the ring", ru: "Припаяйте провода к кольцу", kk: "Сақинаға сымдарды дәнекерлеңіз" },
      body: {
        en: "On the back of the ring find the pads PWR +5V, GND, DI (data in) and DO (data out). Solder a red wire to +5V, a black one to GND and a green one to DI. Leave DO empty; it is only for chaining another ring.",
        ru: "На обратной стороне кольца найдите площадки PWR +5V, GND, DI (вход данных) и DO (выход данных). Припаяйте красный провод к +5V, чёрный к GND, зелёный к DI. DO оставьте свободным: он нужен только для подключения следующего кольца.",
        kk: "Сақинаның артқы жағынан PWR +5V, GND, DI (деректер кірісі) және DO (деректер шығысы) алаңдарын табыңыз. Қызыл сымды +5V-қа, қараны GND-ге, жасылды DI-ға дәнекерлеңіз. DO-ны бос қалдырыңыз: ол тек келесі сақинаны жалғау үшін керек.",
      },
      expect: { en: "Three neat joints on +5V, GND and DI.", ru: "Три аккуратные пайки на +5V, GND и DI.", kk: "+5V, GND және DI-дағы үш ұқыпты дәнекер." },
      mistake: { en: "Soldering the data wire to DO instead of DI: the ring stays dark.", ru: "Провод данных припаян к DO вместо DI: кольцо не загорается.", kk: "Деректер сымы DI-ның орнына DO-ға дәнекерленген: сақина жанбайды." },
    },
    {
      title: { en: "Connect power, capacitor and shared ground", ru: "Подключите питание, конденсатор и общую землю", kk: "Қуатты, конденсаторды және ортақ жерді қосыңыз" },
      body: {
        en: "Bring the adapter's + and − to the breadboard rails. Put the 1000 µF capacitor across them, long leg (+) on 5 V and the striped leg on GND; it absorbs the inrush when the LEDs switch on. Connect the ring's +5V and GND to these rails, then run one wire from the GND rail to an ESP32 GND pin.",
        ru: "Выведите + и − адаптера на шины макетки. Поставьте между ними конденсатор 1000 мкФ: длинная ножка (+) на 5 В, ножка с полосой на GND; он гасит бросок тока при включении светодиодов. Подключите +5V и GND кольца к этим шинам, а затем проведите один провод от шины GND к пину GND платы ESP32.",
        kk: "Адаптердің + және −-ін макет тақтасының шиналарына шығарыңыз. Олардың арасына 1000 мкФ конденсатор қойыңыз: ұзын аяғы (+) 5 В-қа, жолақты аяғы GND-ге; ол жарық диодтары қосылғандағы ток секірісін басады. Сақинаның +5V пен GND-ін осы шиналарға қосып, GND шинасынан ESP32-нің GND пиніне бір сым тартыңыз.",
      },
      expect: { en: "The ring is powered from the adapter, and the two GNDs are joined.", ru: "Кольцо питается от адаптера, а две «земли» соединены.", kk: "Сақина адаптерден қоректенеді, ал екі «жер» жалғанған." },
      mistake: { en: "Without the shared GND the data has no reference: LEDs flash random colours.", ru: "Без общей GND у сигнала данных нет опоры: светодиоды мигают случайными цветами.", kk: "Ортақ GND болмаса, деректер сигналының тірегі жоқ: жарық диодтары кездейсоқ түстермен жыпылықтайды." },
    },
    {
      title: { en: "Wire the data line", ru: "Подключите линию данных", kk: "Деректер желісін қосыңыз" },
      body: {
        en: "Run GPIO27 through a 330 Ω resistor to DI, keeping the wire under 20 cm. The resistor damps ringing on the fast 800 kHz signal. The ESP32 sends 3.3 V data while the ring expects at least 0.7 × 5 V = 3.5 V for a clean HIGH, which is slightly out of spec; with a short wire and shared ground it works with nearly all rings. If yours flickers, add a 74AHCT125 buffer powered from 5 V. Small BSS138 level-shifter boards are too slow for this signal.",
        ru: "Соедините GPIO27 через резистор 330 Ом с DI, провод не длиннее 20 см. Резистор гасит звон на быстром сигнале 800 кГц. ESP32 выдаёт данные уровнем 3,3 В, а кольцу для чёткой единицы нужно не меньше 0,7 × 5 В = 3,5 В, то есть это чуть вне спецификации; с коротким проводом и общей землёй это работает почти со всеми кольцами. Если ваше мерцает, добавьте буфер 74AHCT125 с питанием 5 В. Маленькие платы преобразователей уровня на BSS138 для этого сигнала слишком медленные.",
        kk: "GPIO27-ні 330 Ом резистор арқылы DI-ға қосыңыз, сым 20 см-ден ұзын болмасын. Резистор жылдам 800 кГц сигналдағы тербелісті басады. ESP32 деректерді 3,3 В деңгейімен жібереді, ал сақинаға анық бірлік үшін кемінде 0,7 × 5 В = 3,5 В керек, яғни бұл спецификациядан сәл тыс; қысқа сым мен ортақ жер болса, бұл барлық дерлік сақиналармен жұмыс істейді. Сіздікі жыпылықтаса, 5 В-тан қоректенетін 74AHCT125 буферін қосыңыз. BSS138 негізіндегі шағын деңгей түрлендіргіш платалар бұл сигнал үшін тым баяу.",
      },
      expect: { en: "One green wire with a resistor from GPIO27 to DI.", ru: "Один зелёный провод с резистором от GPIO27 к DI.", kk: "GPIO27-ден DI-ға резисторы бар бір жасыл сым." },
      mistake: { en: "A long, loose data wire is the most common cause of a flickering first LED.", ru: "Длинный болтающийся провод данных — самая частая причина мерцания первого светодиода.", kk: "Ұзын, бос деректер сымы бірінші жарық диоды жыпылықтауының ең жиі себебі." },
    },
    {
      title: { en: "Upload and test", ru: "Загрузите скетч и проверьте", kk: "Скетчті жүктеп, тексеріңіз" },
      body: {
        en: "Install \"Adafruit NeoPixel\". Enter your Wi-Fi name and password, plug in the LED adapter, upload and open the Serial Monitor at 115200 baud. On start the ring runs one short colour wipe, then shows the last saved colour (warm white the first time).",
        ru: "Установите «Adafruit NeoPixel». Впишите имя и пароль Wi-Fi, включите адаптер светодиодов, загрузите скетч и откройте Serial Monitor на 115200 бод. При запуске кольцо один раз пробегает цветом, а затем показывает последний сохранённый цвет (в первый раз тёплый белый).",
        kk: "«Adafruit NeoPixel» кітапханасын орнатыңыз. Wi-Fi атауы мен құпиясөзін жазып, жарық диодтарының адаптерін қосыңыз да, скетчті жүктеп, Serial Monitor-ды 115200 бодта ашыңыз. Іске қосылғанда сақина бір рет түспен жүгіріп өтеді, содан кейін соңғы сақталған түсті көрсетеді (алғаш рет жылы ақ).",
      },
      expect: { en: "A colour wipe around the ring, then \"Wi-Fi connected, open http://...\".", ru: "Цвет пробегает по кольцу, затем «Wi-Fi connected, open http://...».", kk: "Түс сақина бойымен жүгіріп өтеді, содан кейін «Wi-Fi connected, open http://...»." },
      mistake: { en: "Forgetting to plug in the LED adapter: the ESP32 runs, but the ring stays dark.", ru: "Забыли включить адаптер светодиодов: ESP32 работает, а кольцо тёмное.", kk: "Жарық диодтарының адаптерін қосуды ұмыттыңыз: ESP32 жұмыс істейді, бірақ сақина қараңғы." },
    },
    {
      title: { en: "Pick colours from your phone", ru: "Выбирайте цвета с телефона", kk: "Түстерді телефоннан таңдаңыз" },
      body: {
        en: "Open the printed address. The colour picker and brightness slider send /set requests as you drag them, and the Rainbow and Off buttons switch modes. The sketch checks every value before using it and saves the result in flash two seconds after the last change, so the lamp comes back in the same colour after a power cut.",
        ru: "Откройте напечатанный адрес. Палитра цвета и ползунок яркости отправляют запросы /set прямо во время перетаскивания, а кнопки Rainbow и Off переключают режимы. Скетч проверяет каждое значение перед использованием и сохраняет его во flash через две секунды после последнего изменения, поэтому после отключения питания лампа включится тем же цветом.",
        kk: "Басып шығарылған мекенжайды ашыңыз. Түс палитрасы мен жарықтық жүгірткісі сүйреген кезде /set сұрауларын жібереді, ал Rainbow және Off батырмалары режимдерді ауыстырады. Скетч әр мәнді қолданар алдында тексеріп, соңғы өзгерістен екі секунд өткен соң flash жадына сақтайды, сондықтан қуат өшкеннен кейін шам сол түспен жанады.",
      },
      expect: { en: "The ring follows the picker almost instantly.", ru: "Кольцо почти мгновенно следует за палитрой.", kk: "Сақина палитраға бірден дерлік ілеседі." },
      mistake: { en: "Expecting full brightness at 255: the sketch scales to MAX_BRIGHTNESS to protect the supply.", ru: "Ожидать полную яркость на 255: скетч масштабирует её до MAX_BRIGHTNESS, чтобы беречь питание.", kk: "255-те толық жарықтық күту: скетч қорек көзін қорғау үшін оны MAX_BRIGHTNESS-ке дейін масштабтайды." },
    },
  ],
  code: [{
    filename: "wifi_led_lamp.ino",
    language: "cpp",
    libraries: ["Adafruit NeoPixel"],
    source: String.raw`#include <WiFi.h>
#include <WebServer.h>
#include <Preferences.h>
#include <Adafruit_NeoPixel.h>

// ---- change these ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_PASSWORD";

const int LED_PIN = 27;            // to DI through 330 ohm
const int NUM_LEDS = 16;
const int MAX_BRIGHTNESS = 150;    // of 255: keeps the ring under ~0.6 A

Adafruit_NeoPixel ring(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);
WebServer server(80);
Preferences prefs;

uint32_t color = 0xFFB46B;         // warm white
int brightness = 120;              // 0-255 as chosen on the page
String mode = "solid";             // solid | rainbow | off
bool dirty = false;
unsigned long changedAt = 0;
uint16_t hue = 0;

const char PAGE[] PROGMEM = R"rawliteral(<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Lamp</title>
<style>
body{margin:0;padding:24px;font-family:system-ui,sans-serif;background:#0b0f14;color:#e6edf3;display:flex;flex-direction:column;gap:18px;max-width:420px}
input[type=color]{width:100%;height:120px;border:0;border-radius:18px;background:none}
input[type=range]{width:100%}
.row{display:flex;gap:10px}
button{flex:1;padding:14px;font-size:16px;border-radius:12px;border:1px solid #263040;background:#151b23;color:#e6edf3}
</style></head><body>
<input type="color" id="c" value="#ffb46b">
<label>Brightness <input type="range" id="b" min="5" max="255" value="120"></label>
<div class="row"><button onclick="send('solid')">Colour</button><button onclick="send('rainbow')">Rainbow</button><button onclick="send('off')">Off</button></div>
<script>
var busy = false, again = false, mode = 'solid';
function send(m) {
  if (m) mode = m;
  if (busy) { again = true; return; }   // one request at a time while dragging
  busy = true;
  var c = document.getElementById('c').value.substring(1);
  var b = document.getElementById('b').value;
  fetch('/set?c=' + c + '&b=' + b + '&m=' + mode).finally(function () {
    busy = false;
    if (again) { again = false; send(); }
  });
}
document.getElementById('c').addEventListener('input', function () { send('solid'); });
document.getElementById('b').addEventListener('input', function () { send(); });
fetch('/state').then(function (r) { return r.json(); }).then(function (s) {
  document.getElementById('c').value = '#' + s.c;
  document.getElementById('b').value = s.b;
  mode = s.m;
});
</script></body></html>)rawliteral";

void render() {
  ring.setBrightness(map(brightness, 0, 255, 0, MAX_BRIGHTNESS));
  if (mode == "off") {
    ring.clear();
  } else if (mode == "rainbow") {
    for (int i = 0; i < NUM_LEDS; i++) {
      ring.setPixelColor(i, ring.gamma32(ring.ColorHSV(hue + i * 65536L / NUM_LEDS)));
    }
  } else {
    ring.fill(color);
  }
  ring.show();
}

void handleState() {
  char json[64];
  snprintf(json, sizeof(json), "{\"c\":\"%06lx\",\"b\":%d,\"m\":\"%s\"}", (unsigned long)color, brightness, mode.c_str());
  server.send(200, "application/json", json);
}

void handleSet() {
  String c = server.arg("c");
  String m = server.arg("m");
  int b = server.arg("b").toInt();
  // validate everything coming from the browser
  bool hexOk = c.length() == 6;
  for (unsigned int i = 0; i < c.length(); i++) hexOk = hexOk && isxdigit(c[i]);
  if (hexOk) color = strtoul(c.c_str(), nullptr, 16);
  if (b >= 0 && b <= 255 && server.hasArg("b")) brightness = b;
  if (m == "solid" || m == "rainbow" || m == "off") mode = m;
  dirty = true;
  changedAt = millis();
  render();
  Serial.printf("set %s #%06lX brightness %d\n", mode.c_str(), (unsigned long)color, brightness);
  server.send(200, "text/plain", "ok");
}

void setup() {
  Serial.begin(115200);
  ring.begin();
  ring.setBrightness(40);
  for (int i = 0; i < NUM_LEDS; i++) {        // start-up wipe
    ring.setPixelColor(i, ring.Color(0, 120, 255));
    ring.show();
    delay(30);
  }

  prefs.begin("lamp", false);
  color = prefs.getUInt("color", color);
  brightness = prefs.getInt("bright", brightness);
  mode = prefs.getString("mode", mode);
  render();

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
  server.on("/state", handleState);
  server.on("/set", handleSet);
  server.begin();
}

void loop() {
  server.handleClient();

  if (mode == "rainbow") {
    static unsigned long lastStep = 0;
    if (millis() - lastStep >= 20) {
      lastStep = millis();
      hue += 256;
      render();
    }
  }

  // save 2 s after the last change, so dragging the picker does not wear the flash
  if (dirty && millis() - changedAt > 2000) {
    dirty = false;
    prefs.putUInt("color", color);
    prefs.putInt("bright", brightness);
    prefs.putString("mode", mode);
    Serial.println("saved");
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The first LED flickers or shows wrong colours", ru: "Первый светодиод мерцает или показывает не те цвета", kk: "Бірінші жарық диоды жыпылықтайды немесе басқа түс көрсетеді" },
      cause: { en: "The 3.3 V data signal is marginal for the 5 V ring: long data wire, no shared ground or no series resistor.", ru: "Сигнал данных 3,3 В на грани для кольца 5 В: длинный провод, нет общей земли или нет последовательного резистора.", kk: "3,3 В деректер сигналы 5 В сақина үшін шекаралық: сым ұзын, ортақ жер жоқ немесе тізбектей резистор жоқ." },
      fix: { en: "Shorten the data wire, check the GND link and the 330 Ω; if it persists, add a 74AHCT125 buffer powered from 5 V.", ru: "Укоротите провод данных, проверьте соединение GND и резистор 330 Ом; если не помогло, добавьте буфер 74AHCT125 с питанием 5 В.", kk: "Деректер сымын қысқартып, GND байланысы мен 330 Ом резисторды тексеріңіз; көмектеспесе, 5 В-тан қоректенетін 74AHCT125 буферін қосыңыз." },
    },
    {
      symptom: { en: "The ring stays dark", ru: "Кольцо не горит", kk: "Сақина жанбайды" },
      cause: { en: "The data wire is on DO, the LED adapter is off, or LED_PIN in the sketch does not match GPIO27.", ru: "Провод данных на DO, адаптер светодиодов выключен или LED_PIN в скетче не совпадает с GPIO27.", kk: "Деректер сымы DO-да, жарық диодтарының адаптері өшік немесе скетчтегі LED_PIN GPIO27-ге сәйкес келмейді." },
      fix: { en: "Move the wire to DI, measure 5 V across the ring's power pads, and check LED_PIN = 27.", ru: "Перенесите провод на DI, измерьте 5 В на площадках питания кольца и проверьте LED_PIN = 27.", kk: "Сымды DI-ға ауыстырып, сақинаның қуат алаңдарында 5 В өлшеңіз және LED_PIN = 27 екенін тексеріңіз." },
    },
    {
      symptom: { en: "Colours are swapped (red shows green)", ru: "Цвета перепутаны (красный показывает зелёный)", kk: "Түстер шатасқан (қызыл жасыл болып көрінеді)" },
      cause: { en: "Some rings use RGB order instead of GRB.", ru: "Некоторые кольца используют порядок RGB вместо GRB.", kk: "Кейбір сақиналар GRB орнына RGB ретін қолданады." },
      fix: { en: "Change NEO_GRB to NEO_RGB in the ring constructor.", ru: "Замените NEO_GRB на NEO_RGB в конструкторе кольца.", kk: "Сақина конструкторында NEO_GRB-ні NEO_RGB-ге ауыстырыңыз." },
    },
    {
      symptom: { en: "The ESP32 resets when the lamp goes white", ru: "ESP32 перезагружается на белом цвете", kk: "Шам ақ түске ауысқанда ESP32 қайта жүктеледі" },
      cause: { en: "The ring is powered from the ESP32 5V pin or a weak adapter.", ru: "Кольцо питается от пина 5V платы ESP32 или от слабого адаптера.", kk: "Сақина ESP32-нің 5V пинінен немесе әлсіз адаптерден қоректенеді." },
      fix: { en: "Use a separate 5 V 2 A adapter for the ring as shown, and keep MAX_BRIGHTNESS at 150 or lower.", ru: "Питайте кольцо от отдельного адаптера 5 В 2 А, как на схеме, и держите MAX_BRIGHTNESS не выше 150.", kk: "Сақинаны схемадағыдай бөлек 5 В 2 А адаптерден қоректендіріп, MAX_BRIGHTNESS-ті 150-ден жоғары қоймаңыз." },
    },
  ],
  safety: [
    { en: "Check the capacitor's polarity: an electrolytic capacitor connected backwards can bulge or burst.", ru: "Проверьте полярность конденсатора: электролит, включённый наоборот, может вздуться или лопнуть.", kk: "Конденсатордың полярлығын тексеріңіз: кері қосылған электролиттік конденсатор ісініп немесе жарылып кетуі мүмкін." },
    { en: "Do not look into the ring at full brightness up close, and give it a diffuser so it is not glaring.", ru: "Не смотрите в кольцо вблизи на полной яркости и поставьте рассеиватель, чтобы оно не слепило.", kk: "Толық жарықтықтағы сақинаға жақыннан қарамаңыз және көзді шағылыстырмауы үшін шашыратқыш қойыңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Connecting to YOUR_WIFI....",
      "Wi-Fi connected, open http://192.168.1.64",
      "set solid #FF7A1A brightness 120",
      "set solid #FF3B2F brightness 180",
      "saved",
      "set rainbow #FF3B2F brightness 180",
      "saved",
      "set off #FF3B2F brightness 180",
      "saved",
    ],
    leds: [{ label: "RING", color: "#FF7A1A" }],
  },
} satisfies GuideContent;
