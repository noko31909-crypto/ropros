import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-power-meter-ina219",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "energy",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 15,
  xpReward: 240,
  title: {
    en: "ESP32 DC Power Meter with INA219 and Web Chart",
    ru: "Ваттметр постоянного тока на ESP32 и INA219 с веб-графиком",
    kk: "ESP32 және INA219 тұрақты ток ваттметрі, веб-графигімен",
  },
  summary: {
    en: "An INA219 sits in the + wire of a 5–12 V DC load and measures voltage, current and power. An OLED shows live numbers, and the ESP32 serves a web page with a two-minute power chart and the energy used.",
    ru: "INA219 включается в плюсовой провод нагрузки 5–12 В и измеряет напряжение, ток и мощность. OLED показывает цифры в реальном времени, а ESP32 отдаёт веб-страницу с графиком мощности за две минуты и израсходованной энергией.",
    kk: "INA219 5–12 В жүктеменің плюс сымына қосылып, кернеуді, токты және қуатты өлшейді. OLED сандарды нақты уақытта көрсетеді, ал ESP32 екі минуттық қуат графигі мен жұмсалған энергиясы бар веб-бет ұсынады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit V1 (WROOM-32), 3.3 V logic", ru: "ESP32 DevKit V1 (WROOM-32), логика 3,3 В", kk: "ESP32 DevKit V1 (WROOM-32), 3,3 В логика" }, role: { en: "Controller and web server", ru: "Контроллер и веб-сервер", kk: "Контроллер және веб-сервер" } },
    { component: "ina219", qty: 1, spec: { en: "CJMCU/Adafruit-style module, 0.1 Ω shunt, address 0x40, up to 26 V and 2 A", ru: "модуль CJMCU/Adafruit, шунт 0,1 Ом, адрес 0x40, до 26 В и 2 А", kk: "CJMCU/Adafruit модулі, 0,1 Ом шунт, 0x40 мекенжайы, 26 В және 2 А-ге дейін" }, role: { en: "Voltage, current and power sensor", ru: "Датчик напряжения, тока и мощности", kk: "Кернеу, ток және қуат датчигі" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C address 0x3C", ru: "0,96\" 128×64, адрес I²C 0x3C", kk: "0,96\" 128×64, I²C мекенжайы 0x3C" }, role: { en: "Live readout", ru: "Показания в реальном времени", kk: "Нақты уақыттағы көрсеткіштер" } },
    { component: "usb-5v", qty: 1, spec: { en: "USB 5 V supply for the demo; any 5–12 V DC adapter for your own load", ru: "USB-блок 5 В для демо; для своей нагрузки любой адаптер 5–12 В DC", kk: "демо үшін USB 5 В қорек көзі; өз жүктемеңіз үшін кез келген 5–12 В DC адаптер" }, role: { en: "Load supply, separate from the ESP32", ru: "Питание нагрузки, отдельно от ESP32", kk: "Жүктеме қуаты, ESP32-ден бөлек" } },
    { component: "fan-5v", qty: 1, spec: { en: "5 V DC fan, ~150 mA (or a 12 V LED strip ≤ 2 A)", ru: "вентилятор 5 В DC, ~150 мА (или лента 12 В до 2 А)", kk: "5 В DC желдеткіш, ~150 мА (немесе 2 А-ге дейінгі 12 В таспа)" }, role: { en: "Load under test", ru: "Измеряемая нагрузка", kk: "Өлшенетін жүктеме" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 14, spec: { en: "male-male; thicker wire for the load side", ru: "папа-папа; для силовой части провод потолще", kk: "аталық-аталық; күштік бөлікке жуанырақ сым" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ina", component: "ina219", label: "INA219" },
    { id: "oled", component: "oled-ssd1306", label: "OLED" },
    { id: "psu", component: "usb-5v", label: "Load supply" },
    { id: "fan", component: "fan-5v", label: "Load" },
  ],
  connections: [
    { from: "board.3V3", to: "ina.VCC", color: "red", note: { en: "3.3 V keeps the I²C pull-ups safe", ru: "3,3 В делает подтяжки I²C безопасными", kk: "3,3 В I²C тартқыштарын қауіпсіз етеді" } },
    { from: "ina.GND", to: "board.GND", color: "black" },
    { from: "board.GPIO21", to: "ina.SDA", color: "blue" },
    { from: "board.GPIO22", to: "ina.SCL", color: "yellow" },
    { from: "board.3V3", to: "oled.VCC", color: "red" },
    { from: "oled.GND", to: "board.GND2", color: "black" },
    { from: "ina.SDA", to: "oled.SDA", color: "blue", note: { en: "same I²C bus", ru: "та же шина I²C", kk: "сол I²C шинасы" } },
    { from: "ina.SCL", to: "oled.SCL", color: "yellow" },
    { from: "psu.5V", to: "ina.VIN+", color: "red", note: { en: "supply + into the shunt", ru: "+ питания в шунт", kk: "қорек + шунтқа" } },
    { from: "ina.VIN-", to: "fan.+", color: "orange", note: { en: "shunt out to the load +", ru: "выход шунта на + нагрузки", kk: "шунт шығысы жүктеме +-іне" } },
    { from: "fan.-", to: "psu.GND", color: "black" },
    { from: "psu.GND", to: "board.GND3", color: "black", note: { en: "common ground: needed for the bus-voltage reading", ru: "общая земля: нужна для измерения напряжения", kk: "ортақ жер: кернеуді өлшеу үшін қажет" } },
  ],
  steps: [
    {
      title: { en: "Understand high-side measuring", ru: "Разберитесь в измерении по плюсу", kk: "Плюс жағынан өлшеуді түсініңіз" },
      body: {
        en: "The INA219 measures current through a tiny 0.1 Ω shunt resistor between its VIN+ and VIN− terminals. The shunt goes in the + wire of the load: supply + → VIN+ → VIN− → load + → load − → supply −. The chip also measures the voltage on VIN− against GND, which is why the load supply and the ESP32 must share ground.",
        ru: "INA219 измеряет ток через крошечный шунт 0,1 Ом между клеммами VIN+ и VIN−. Шунт ставится в плюсовой провод нагрузки: + блока → VIN+ → VIN− → + нагрузки → − нагрузки → − блока. Ещё чип измеряет напряжение на VIN− относительно GND, поэтому у блока нагрузки и ESP32 должна быть общая земля.",
        kk: "INA219 токты VIN+ пен VIN− клеммаларының арасындағы кішкентай 0,1 Ом шунт арқылы өлшейді. Шунт жүктеменің плюс сымына қойылады: қорек + → VIN+ → VIN− → жүктеме + → жүктеме − → қорек −. Сонымен қатар чип VIN−-дегі кернеуді GND-ге қатысты өлшейді, сондықтан жүктеме қорек көзі мен ESP32-нің жері ортақ болуы керек.",
      },
      expect: { en: "You can trace the load current path on the diagram through VIN+ and VIN−.", ru: "Вы можете проследить путь тока нагрузки на схеме через VIN+ и VIN−.", kk: "Схемада жүктеме тогының VIN+ және VIN− арқылы өтетін жолын бақылай аласыз." },
      mistake: { en: "Putting the INA219 in parallel with the load (across + and −) shorts the supply through the shunt.", ru: "Если включить INA219 параллельно нагрузке (между + и −), блок питания замкнётся через шунт.", kk: "INA219-ды жүктемеге параллель (+ пен − арасына) қоссаңыз, қорек көзі шунт арқылы тұйықталады." },
    },
    {
      title: { en: "Wire the I²C devices", ru: "Подключите устройства I²C", kk: "I²C құрылғыларын қосыңыз" },
      body: {
        en: "Both modules share the I²C bus. Give each VCC 3.3 V from the 3V3 pin and connect each GND to an ESP32 GND. Run SDA from GPIO21 to the INA219 and on to the OLED, and SCL from GPIO22 the same way. The INA219 answers at 0x40 and the OLED at 0x3C, so they do not clash.",
        ru: "Оба модуля сидят на одной шине I²C. Подайте на VCC каждого 3,3 В с пина 3V3, а каждый GND соедините с GND платы ESP32. Проведите SDA от GPIO21 к INA219 и дальше к OLED, SCL от GPIO22 так же. INA219 отвечает по адресу 0x40, OLED по 0x3C, поэтому они не конфликтуют.",
        kk: "Екі модуль да бір I²C шинасында. Әрқайсысының VCC-іне 3V3 пинінен 3,3 В беріп, әр GND-ді ESP32 GND-іне қосыңыз. SDA-ны GPIO21-ден INA219-ға, одан әрі OLED-ке, SCL-ды GPIO22-ден дәл солай тартыңыз. INA219 0x40 мекенжайында, OLED 0x3C мекенжайында жауап береді, сондықтан олар қақтығыспайды.",
      },
      expect: { en: "Two modules daisy-chained on the blue and yellow wires.", ru: "Два модуля соединены цепочкой синим и жёлтым проводами.", kk: "Екі модуль көк және сары сымдармен тізбектей қосылған." },
      mistake: { en: "Powering the INA219 from 5V pulls SDA/SCL up to 5 V through its onboard resistors.", ru: "Если запитать INA219 от 5V, его встроенные резисторы подтянут SDA/SCL к 5 В.", kk: "INA219-ды 5V-тан қоректендірсеңіз, оның борттық резисторлары SDA/SCL-ды 5 В-қа тартады." },
    },
    {
      title: { en: "Wire the load circuit", ru: "Соберите силовую цепь", kk: "Күштік тізбекті жинаңыз" },
      body: {
        en: "Connect the load supply's + to VIN+ on the INA219 screw terminal, VIN− to the fan's red wire, and the fan's black wire back to the supply's −. Then add one wire from the supply's − to an ESP32 GND. Use short, thick wires on this side: everything the load draws flows through them.",
        ru: "Подключите + блока нагрузки к клемме VIN+ модуля INA219, VIN− к красному проводу вентилятора, а чёрный провод вентилятора верните на − блока. Затем добавьте один провод от − блока к GND платы ESP32. На этой стороне используйте короткие толстые провода: через них идёт весь ток нагрузки.",
        kk: "Жүктеме қорек көзінің +-ін INA219 модулінің VIN+ клеммасына, VIN−-ді желдеткіштің қызыл сымына қосып, желдеткіштің қара сымын қорек көзінің −-іне қайтарыңыз. Содан кейін қорек көзінің −-інен ESP32 GND-іне бір сым қосыңыз. Бұл жақта қысқа, жуан сымдарды қолданыңыз: жүктеменің бүкіл тогы солар арқылы өтеді.",
      },
      expect: { en: "The fan spins as soon as its supply is plugged in, independent of the ESP32.", ru: "Вентилятор крутится сразу после включения его блока, независимо от ESP32.", kk: "Желдеткіш қорек көзі қосылған бойда ESP32-ге тәуелсіз айнала бастайды." },
      mistake: { en: "Skipping the shared ground: current still reads correctly, but the voltage shows nonsense.", ru: "Без общей земли ток читается верно, но напряжение показывает ерунду.", kk: "Ортақ жерсіз ток дұрыс оқылады, бірақ кернеу мағынасыз мәндер көрсетеді." },
    },
    {
      title: { en: "Install libraries and upload", ru: "Установите библиотеки и загрузите скетч", kk: "Кітапханаларды орнатып, скетчті жүктеңіз" },
      body: {
        en: "Install \"Adafruit INA219\", \"Adafruit SSD1306\" and \"Adafruit GFX Library\". Enter your Wi-Fi, upload and open the Serial Monitor at 115200 baud. Once per second the sketch prints load voltage, current, power and the energy used since boot, and the OLED shows the same numbers.",
        ru: "Установите «Adafruit INA219», «Adafruit SSD1306» и «Adafruit GFX Library». Впишите данные Wi-Fi, загрузите скетч и откройте Serial Monitor на 115200 бод. Раз в секунду скетч печатает напряжение на нагрузке, ток, мощность и энергию с момента включения, а OLED показывает те же цифры.",
        kk: "«Adafruit INA219», «Adafruit SSD1306» және «Adafruit GFX Library» кітапханаларын орнатыңыз. Wi-Fi деректерін жазып, скетчті жүктеңіз де, Serial Monitor-ды 115200 бодта ашыңыз. Скетч секунд сайын жүктемедегі кернеуді, токты, қуатты және іске қосылғаннан бергі энергияны шығарады, ал OLED сол сандарды көрсетеді.",
      },
      expect: { en: "About 5.0 V and 100–200 mA for a small 5 V fan.", ru: "Около 5,0 В и 100–200 мА для небольшого вентилятора 5 В.", kk: "Шағын 5 В желдеткіш үшін шамамен 5,0 В және 100–200 мА." },
      mistake: { en: "Negative current means VIN+ and VIN− are swapped; exchange the two terminal wires.", ru: "Отрицательный ток значит, что перепутаны VIN+ и VIN−; поменяйте провода в клеммах местами.", kk: "Теріс ток VIN+ пен VIN− шатастырылғанын білдіреді; клеммалардағы сымдарды ауыстырыңыз." },
    },
    {
      title: { en: "Open the live chart", ru: "Откройте живой график", kk: "Тірі графикті ашыңыз" },
      body: {
        en: "Open the printed IP on a phone or laptop in the same network. The page asks /data every second and redraws a power chart of the last 120 seconds on a canvas, plus voltage, current and energy. Pinch the fan blades lightly (or block the airflow) and watch the power rise.",
        ru: "Откройте напечатанный IP на телефоне или ноутбуке в той же сети. Страница каждую секунду запрашивает /data и перерисовывает на canvas график мощности за последние 120 секунд, а также напряжение, ток и энергию. Слегка притормозите лопасти вентилятора (или перекройте поток воздуха) и посмотрите, как растёт мощность.",
        kk: "Басып шығарылған IP-ді сол желідегі телефонда немесе ноутбукта ашыңыз. Бет секунд сайын /data сұрап, canvas-та соңғы 120 секундтың қуат графигін, сондай-ақ кернеу, ток және энергияны қайта салады. Желдеткіш қалақтарын сәл тежеңіз (немесе ауа ағынын жабыңыз) да, қуаттың қалай өскенін көріңіз.",
      },
      expect: { en: "The line on the chart moves every second and jumps when the load changes.", ru: "Линия графика движется каждую секунду и скачет при изменении нагрузки.", kk: "График сызығы секунд сайын жылжиды және жүктеме өзгергенде секіреді." },
      mistake: { en: "Opening the page over mobile data: the ESP32 is reachable only on your local network.", ru: "Страница открыта через мобильный интернет: ESP32 доступна только в локальной сети.", kk: "Бет мобильді интернет арқылы ашылған: ESP32-ге тек жергілікті желіде қол жетеді." },
    },
    {
      title: { en: "Measure your own load", ru: "Измерьте свою нагрузку", kk: "Өз жүктемеңізді өлшеңіз" },
      body: {
        en: "Swap the fan and USB supply for any DC device up to 26 V and 2 A, for example a 12 V LED strip with its adapter. Keep the same order: adapter + → VIN+, VIN− → device +, device − → adapter −, adapter − → ESP32 GND. Press EN to reset the energy counter before a new measurement.",
        ru: "Замените вентилятор и USB-блок любым устройством постоянного тока до 26 В и 2 А, например лентой 12 В с её адаптером. Порядок тот же: + адаптера → VIN+, VIN− → + устройства, − устройства → − адаптера, − адаптера → GND платы ESP32. Перед новым замером нажмите EN, чтобы обнулить счётчик энергии.",
        kk: "Желдеткіш пен USB қорек көзін 26 В және 2 А-ге дейінгі кез келген тұрақты ток құрылғысына, мысалы адаптері бар 12 В таспаға ауыстырыңыз. Реті бірдей: адаптер + → VIN+, VIN− → құрылғы +, құрылғы − → адаптер −, адаптер − → ESP32 GND. Жаңа өлшеу алдында энергия санағышын нөлдеу үшін EN басыңыз.",
      },
      expect: { en: "A 12 V, 1 m LED strip shows about 12 V and several hundred mA.", ru: "Метровая лента 12 В показывает около 12 В и несколько сотен мА.", kk: "Бір метрлік 12 В таспа шамамен 12 В және бірнеше жүз мА көрсетеді." },
      mistake: { en: "Never connect the 12 V adapter's + to the ESP32 or the INA219 VCC; only VIN+ may see it.", ru: "Никогда не подключайте + адаптера 12 В к ESP32 или к VCC модуля INA219; его может видеть только VIN+.", kk: "12 В адаптердің +-ін ешқашан ESP32-ге немесе INA219 VCC-іне қоспаңыз; оны тек VIN+ көре алады." },
    },
  ],
  code: [{
    filename: "power_meter.ino",
    language: "cpp",
    libraries: ["Adafruit INA219", "Adafruit SSD1306", "Adafruit GFX Library"],
    source: String.raw`#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <Adafruit_INA219.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// ---- change these ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_PASSWORD";

const int SDA_PIN = 21;
const int SCL_PIN = 22;
const int HISTORY_LEN = 120;           // one sample per second = 2 minutes

Adafruit_INA219 ina219;                // address 0x40
Adafruit_SSD1306 display(128, 64, &Wire, -1);
WebServer server(80);

float loadV = 0, currentmA = 0, powermW = 0, energymWh = 0;
float history[HISTORY_LEN];
int histHead = 0, histCount = 0;
unsigned long lastSample = 0;

const char PAGE[] PROGMEM = R"rawliteral(<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Power meter</title>
<style>
body{margin:0;padding:20px;font-family:system-ui,sans-serif;background:#0b0f14;color:#e6edf3}
.row{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px}
.card{flex:1 1 120px;background:#151b23;border:1px solid #263040;border-radius:14px;padding:12px}
.label{font-size:12px;color:#8b98a5}.value{font-size:26px;font-weight:600}
canvas{width:100%;height:200px;background:#151b23;border:1px solid #263040;border-radius:14px}
</style></head><body>
<div class="row">
<div class="card"><div class="label">Voltage</div><div class="value"><span id="v">--</span> V</div></div>
<div class="card"><div class="label">Current</div><div class="value"><span id="i">--</span> mA</div></div>
<div class="card"><div class="label">Power</div><div class="value"><span id="p">--</span> W</div></div>
<div class="card"><div class="label">Energy</div><div class="value"><span id="e">--</span> mWh</div></div>
</div>
<canvas id="c"></canvas>
<script>
function draw(h) {
  var c = document.getElementById('c'), r = window.devicePixelRatio || 1;
  var w = c.width = c.clientWidth * r, ht = c.height = 200 * r, x = c.getContext('2d');
  x.clearRect(0, 0, w, ht);
  var max = Math.max.apply(null, h.concat([100]));
  x.strokeStyle = '#2EE6C9'; x.lineWidth = 2 * r; x.beginPath();
  for (var k = 0; k < h.length; k++) {
    var px = k * w / Math.max(h.length - 1, 1), py = ht - 8 * r - (h[k] / max) * (ht - 28 * r);
    if (k) x.lineTo(px, py); else x.moveTo(px, py);
  }
  x.stroke();
  x.fillStyle = '#8b98a5'; x.font = (12 * r) + 'px sans-serif';
  x.fillText('power, last ' + h.length + ' s (max ' + (max / 1000).toFixed(2) + ' W)', 8 * r, 16 * r);
}
function update() {
  fetch('/data').then(function (res) { return res.json(); }).then(function (d) {
    document.getElementById('v').textContent = d.v.toFixed(2);
    document.getElementById('i').textContent = d.i.toFixed(1);
    document.getElementById('p').textContent = (d.p / 1000).toFixed(2);
    document.getElementById('e').textContent = d.e.toFixed(2);
    draw(d.h);
  });
}
update();
setInterval(update, 1000);
</script></body></html>)rawliteral";

void handleData() {
  String json = "{\"v\":" + String(loadV, 3) + ",\"i\":" + String(currentmA, 1) +
                ",\"p\":" + String(powermW, 0) + ",\"e\":" + String(energymWh, 3) + ",\"h\":[";
  int start = (histHead - histCount + HISTORY_LEN) % HISTORY_LEN;   // oldest sample first
  for (int k = 0; k < histCount; k++) {
    if (k) json += ",";
    json += String(history[(start + k) % HISTORY_LEN], 0);
  }
  json += "]}";
  server.sendHeader("Cache-Control", "no-store");
  server.send(200, "application/json", json);
}

void sample() {
  float busV = ina219.getBusVoltage_V();          // VIN- to GND
  float shuntmV = ina219.getShuntVoltage_mV();
  loadV = busV + shuntmV / 1000.0;
  currentmA = ina219.getCurrent_mA();
  powermW = ina219.getPower_mW();
  energymWh += powermW / 3600.0;                  // 1 s worth of energy

  history[histHead] = powermW;
  histHead = (histHead + 1) % HISTORY_LEN;
  if (histCount < HISTORY_LEN) histCount++;

  Serial.printf("Load %.2f V  %.1f mA  %.2f W  %.2f mWh\n", loadV, currentmA, powermW / 1000.0, energymWh);

  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  display.setTextSize(2);
  display.setCursor(0, 0);
  display.printf("%.2f V", loadV);
  display.setCursor(0, 22);
  display.printf("%.0f mA", currentmA);
  display.setTextSize(1);
  display.setCursor(0, 46);
  display.printf("%.2f W  %.1f mWh", powermW / 1000.0, energymWh);
  display.setCursor(0, 56);
  display.print(WiFi.localIP());
  display.display();
}

void setup() {
  Serial.begin(115200);
  Wire.begin(SDA_PIN, SCL_PIN);

  if (!ina219.begin(&Wire)) {
    Serial.println("INA219 not found at 0x40, check wiring");
    while (true) delay(1000);
  }
  ina219.setCalibration_32V_2A();                 // 0.1 ohm shunt, up to 26 V on the bus
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) Serial.println("OLED not found at 0x3C");
  Serial.println("INA219 ready");

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
  server.on("/data", handleData);
  server.begin();
}

void loop() {
  server.handleClient();
  if (millis() - lastSample >= 1000) {
    lastSample += 1000;
    if (millis() - lastSample > 1000) lastSample = millis();   // catch up after a stall
    sample();
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"INA219 not found at 0x40\"", ru: "«INA219 not found at 0x40»", kk: "«INA219 not found at 0x40»" },
      cause: { en: "SDA/SCL swapped, VCC not connected, or the A0/A1 address pads are bridged on your module.", ru: "Перепутаны SDA/SCL, не подключён VCC или на модуле запаяны перемычки адреса A0/A1.", kk: "SDA/SCL шатастырылған, VCC қосылмаған немесе модульде A0/A1 мекенжай секіргіштері дәнекерленген." },
      fix: { en: "Check GPIO21 → SDA and GPIO22 → SCL; if address pads are bridged, pass the address to the constructor, e.g. Adafruit_INA219 ina219(0x41).", ru: "Проверьте GPIO21 → SDA и GPIO22 → SCL; если перемычки адреса запаяны, передайте адрес в конструктор, например Adafruit_INA219 ina219(0x41).", kk: "GPIO21 → SDA және GPIO22 → SCL екенін тексеріңіз; мекенжай секіргіштері дәнекерленген болса, мекенжайды конструкторға беріңіз, мысалы Adafruit_INA219 ina219(0x41)." },
    },
    {
      symptom: { en: "Voltage reads near 0 V or jumps wildly while current looks fine", ru: "Напряжение около 0 В или скачет, а ток в порядке", kk: "Кернеу 0 В шамасында немесе секіреді, ал ток дұрыс" },
      cause: { en: "The load supply's − is not connected to the ESP32 GND.", ru: "− блока нагрузки не соединён с GND платы ESP32.", kk: "Жүктеме қорек көзінің −-і ESP32 GND-імен жалғанбаған." },
      fix: { en: "Add the wire from the load supply − to any ESP32 GND pin.", ru: "Добавьте провод от − блока нагрузки к любому пину GND платы ESP32.", kk: "Жүктеме қорек көзінің −-інен ESP32-нің кез келген GND пиніне сым қосыңыз." },
    },
    {
      symptom: { en: "Current stops at about 3.2 A or the module gets hot", ru: "Ток упирается примерно в 3,2 А или модуль греется", kk: "Ток шамамен 3,2 А-де тоқтайды немесе модуль қызады" },
      cause: { en: "The load draws more than the 0.1 Ω shunt can measure; the shunt voltage hits its 320 mV limit.", ru: "Нагрузка берёт больше, чем может измерить шунт 0,1 Ом; напряжение на шунте упирается в предел 320 мВ.", kk: "Жүктеме 0,1 Ом шунт өлшей алатыннан көп тартады; шунттағы кернеу 320 мВ шегіне жетеді." },
      fix: { en: "Stay under 2 A with this module, or use a module with a smaller shunt and adjust the calibration.", ru: "С этим модулем не превышайте 2 А или возьмите модуль с меньшим шунтом и поменяйте калибровку.", kk: "Бұл модульмен 2 А-ден аспаңыз немесе шунты кішірек модуль алып, калибрлеуді өзгертіңіз." },
    },
  ],
  safety: [
    { en: "DC only, maximum 26 V on VIN+ and 2 A through the module. Never measure mains or car-battery cranking currents with it.", ru: "Только постоянный ток, максимум 26 В на VIN+ и 2 А через модуль. Никогда не измеряйте им сеть или пусковые токи автомобильного аккумулятора.", kk: "Тек тұрақты ток, VIN+-те ең көбі 26 В және модуль арқылы 2 А. Онымен ешқашан желіні немесе автомобиль аккумуляторының іске қосу тогын өлшемеңіз." },
    { en: "Breadboard contacts are rated around 1 A; above that, connect the load wires directly to the INA219 screw terminals.", ru: "Контакты макетки рассчитаны примерно на 1 А; при большем токе подключайте провода нагрузки прямо в винтовые клеммы INA219.", kk: "Макет тақтасының түйіспелері шамамен 1 А-ге есептелген; одан көп токта жүктеме сымдарын тікелей INA219 бұрандалы клеммаларына қосыңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "INA219 ready",
      "Connecting to YOUR_WIFI...",
      "Wi-Fi connected, open http://192.168.1.62",
      "Load 5.04 V  148.2 mA  0.75 W  0.21 mWh",
      "Load 5.04 V  150.6 mA  0.76 W  0.42 mWh",
      "Load 5.03 V  151.0 mA  0.76 W  0.63 mWh",
      "Load 5.01 V  212.4 mA  1.06 W  0.92 mWh",
      "Load 5.04 V  149.8 mA  0.75 W  1.13 mWh",
    ],
    leds: [],
  },
} satisfies GuideContent;
