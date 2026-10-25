import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-aquarium-thermometer",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "home",
  robotics: false,
  difficulty: "beginner",
  hours: 2,
  costUsd: 10,
  xpReward: 170,
  title: {
    en: "ESP32 Aquarium Thermometer with Wi-Fi Alerts",
    ru: "Термометр для аквариума на ESP32 с Wi-Fi оповещением",
    kk: "Wi-Fi ескертуі бар ESP32 аквариум термометрі",
  },
  summary: {
    en: "A waterproof DS18B20 probe measures the water, a TM1637 display shows it on the tank, and a web page turns red and says \"TOO WARM\" or \"TOO COLD\" when the temperature leaves the range you set.",
    ru: "Водонепроницаемый датчик DS18B20 измеряет воду, дисплей TM1637 показывает температуру прямо на аквариуме, а веб-страница краснеет и пишет «TOO WARM» или «TOO COLD», если температура выходит за заданный диапазон.",
    kk: "Су өтпейтін DS18B20 датчигі суды өлшейді, TM1637 дисплейі температураны аквариумның өзінде көрсетеді, ал температура берілген ауқымнан шыққанда веб-бет қызарып, «TOO WARM» немесе «TOO COLD» деп жазады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit V1 (WROOM-32), 3.3 V logic", ru: "ESP32 DevKit V1 (WROOM-32), логика 3,3 В", kk: "ESP32 DevKit V1 (WROOM-32), 3,3 В логика" }, role: { en: "Controller and web server", ru: "Контроллер и веб-сервер", kk: "Контроллер және веб-сервер" } },
    { component: "ds18b20", qty: 1, spec: { en: "waterproof stainless probe, 1 m cable (red VDD, black GND, yellow DQ)", ru: "водонепроницаемый щуп из нержавейки, кабель 1 м (красный VDD, чёрный GND, жёлтый DQ)", kk: "тот баспайтын су өтпейтін зонд, 1 м кабель (қызыл VDD, қара GND, сары DQ)" }, role: { en: "Water temperature sensor", ru: "Датчик температуры воды", kk: "Су температурасының датчигі" } },
    { component: "resistor", qty: 1, spec: { en: "4.7 kΩ, ¼ W", ru: "4,7 кОм, ¼ Вт", kk: "4,7 кОм, ¼ Вт" }, role: { en: "1-Wire pull-up", ru: "Подтяжка шины 1-Wire", kk: "1-Wire шинасын тарту" } },
    { component: "tm1637-display", qty: 1, spec: { en: "4-digit 0.56\" module with colon", ru: "4-разрядный модуль 0,56\" с двоеточием", kk: "қос нүктелі 4 разрядты 0,56\" модуль" }, role: { en: "Local readout", ru: "Местный дисплей", kk: "Жергілікті дисплей" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "probe", component: "ds18b20", label: "Water probe" },
    { id: "r_pu", component: "resistor", label: "4.7 kΩ" },
    { id: "disp", component: "tm1637-display", label: "TM1637" },
  ],
  connections: [
    { from: "board.3V3", to: "probe.VDD", color: "red", note: { en: "red wire of the probe", ru: "красный провод щупа", kk: "зондтың қызыл сымы" } },
    { from: "probe.GND", to: "board.GND", color: "black", note: { en: "black wire", ru: "чёрный провод", kk: "қара сым" } },
    { from: "probe.DQ", to: "board.GPIO4", color: "yellow", note: { en: "yellow data wire", ru: "жёлтый провод данных", kk: "сары деректер сымы" } },
    { from: "r_pu.A", to: "probe.DQ", color: "yellow", note: { en: "4.7 kΩ between DQ and 3.3 V", ru: "4,7 кОм между DQ и 3,3 В", kk: "DQ мен 3,3 В арасында 4,7 кОм" } },
    { from: "r_pu.B", to: "board.3V3", color: "red" },
    { from: "board.3V3", to: "disp.VCC", color: "red", note: { en: "3.3 V keeps DIO at ESP32 level", ru: "3,3 В держит DIO на уровне ESP32", kk: "3,3 В DIO-ны ESP32 деңгейінде ұстайды" } },
    { from: "disp.GND", to: "board.GND2", color: "black" },
    { from: "board.GPIO26", to: "disp.CLK", color: "green" },
    { from: "board.GPIO27", to: "disp.DIO", color: "blue" },
  ],
  steps: [
    {
      title: { en: "Identify the probe wires", ru: "Определите провода щупа", kk: "Зонд сымдарын анықтаңыз" },
      body: {
        en: "Most waterproof DS18B20 probes use red for VDD, black for GND and yellow (sometimes white) for the data line DQ. If your cable has other colours, check the seller's sheet before wiring, because swapping VDD and GND makes the sensor hot and can destroy it.",
        ru: "У большинства водонепроницаемых DS18B20 красный провод — VDD, чёрный — GND, а жёлтый (иногда белый) — линия данных DQ. Если цвета другие, сверьтесь с описанием продавца до подключения: если перепутать VDD и GND, датчик нагреется и может сгореть.",
        kk: "Су өтпейтін DS18B20 зондтарының көбінде қызыл сым — VDD, қара — GND, ал сары (кейде ақ) — DQ деректер желісі. Түстері басқа болса, қоспас бұрын сатушының сипаттамасын тексеріңіз: VDD мен GND-ді шатастырсаңыз, датчик қызып, күйіп кетуі мүмкін.",
      },
      expect: { en: "You know which wire is VDD, GND and DQ.", ru: "Вы знаете, какой провод VDD, какой GND, а какой DQ.", kk: "Қай сым VDD, қайсысы GND және қайсысы DQ екенін білесіз." },
      mistake: { en: "Assuming the colours without checking; a reversed probe gets warm within seconds.", ru: "Подключать «на глаз» по цветам; перевёрнутый датчик нагревается за секунды.", kk: "Түстерге қарап тексермей қосу; кері қосылған датчик бірнеше секундта қызады." },
    },
    {
      title: { en: "Wire the probe with its pull-up", ru: "Подключите щуп и подтягивающий резистор", kk: "Зонд пен тартқыш резисторды қосыңыз" },
      body: {
        en: "Red to 3V3, black to GND, yellow to GPIO4. The 1-Wire bus only pulls the line low, so it needs a 4.7 kΩ resistor from DQ to 3V3 to bring it back high. Put the resistor in the same breadboard row as the yellow wire, its other leg on the 3.3 V rail.",
        ru: "Красный к 3V3, чёрный к GND, жёлтый к GPIO4. Шина 1-Wire умеет только прижимать линию к нулю, поэтому нужен резистор 4,7 кОм от DQ к 3V3, который возвращает её в единицу. Вставьте резистор в тот же ряд макетки, что и жёлтый провод, а вторую ножку на шину 3,3 В.",
        kk: "Қызылды 3V3-ке, қараны GND-ге, сарыны GPIO4-ке қосыңыз. 1-Wire шинасы желіні тек нөлге тарта алады, сондықтан оны бірге қайтаратын DQ-дан 3V3-ке 4,7 кОм резистор керек. Резисторды сары сыммен макет тақтасының бір қатарына, екінші аяғын 3,3 В шинасына қойыңыз.",
      },
      expect: { en: "The Serial Monitor later shows a real temperature instead of -127.", ru: "Позже в Serial Monitor будет реальная температура, а не -127.", kk: "Кейін Serial Monitor-да -127 емес, нақты температура шығады." },
      mistake: { en: "Without the 4.7 kΩ resistor the library reports -127 °C (sensor not found).", ru: "Без резистора 4,7 кОм библиотека выдаёт -127 °C (датчик не найден).", kk: "4,7 кОм резисторсыз кітапхана -127 °C (датчик табылмады) деп көрсетеді." },
    },
    {
      title: { en: "Connect the TM1637 display", ru: "Подключите дисплей TM1637", kk: "TM1637 дисплейін қосыңыз" },
      body: {
        en: "VCC to 3V3, GND to GND, CLK to GPIO26 and DIO to GPIO27. The module has pull-up resistors on its data lines that go to its own VCC, so powering it from 3.3 V keeps those lines safe for the ESP32. The digits are a bit dimmer than at 5 V; the sketch sets full brightness.",
        ru: "VCC к 3V3, GND к GND, CLK к GPIO26, DIO к GPIO27. На линиях данных модуля стоят подтягивающие резисторы к его собственному VCC, поэтому питание от 3,3 В делает эти линии безопасными для ESP32. Цифры чуть тусклее, чем при 5 В; скетч включает максимальную яркость.",
        kk: "VCC-ді 3V3-ке, GND-ді GND-ге, CLK-ты GPIO26-ға, DIO-ны GPIO27-ге қосыңыз. Модульдің деректер желілерінде өз VCC-іне тартылған резисторлар бар, сондықтан 3,3 В-тан қоректендіру бұл желілерді ESP32 үшін қауіпсіз етеді. Сандар 5 В-тағыдан сәл күңгірттеу; скетч ең жоғары жарықтықты қосады.",
      },
      expect: { en: "After upload the display shows something like \"25°C\".", ru: "После загрузки на дисплее появится что-то вроде «25°C».", kk: "Жүктегеннен кейін дисплейде «25°C» сияқты жазу шығады." },
      mistake: { en: "Powering the display from 5V puts 5 V on DIO through its pull-up; ESP32 pins are not 5 V tolerant.", ru: "Если запитать дисплей от 5V, через подтяжку на DIO окажется 5 В, а пины ESP32 не выдерживают 5 В.", kk: "Дисплейді 5V-тан қоректендірсеңіз, тартқыш арқылы DIO-ға 5 В түседі, ал ESP32 пиндері 5 В-қа шыдамайды." },
    },
    {
      title: { en: "Install libraries, add Wi-Fi and upload", ru: "Установите библиотеки, впишите Wi-Fi и загрузите", kk: "Кітапханаларды орнатып, Wi-Fi жазып, жүктеңіз" },
      body: {
        en: "Install \"OneWire\", \"DallasTemperature\" and \"TM1637\" (by Avishay Orpaz) from the Library Manager. Enter your 2.4 GHz Wi-Fi name and password, upload, and open the Serial Monitor at 115200 baud to see the web address and a reading every two seconds.",
        ru: "Установите через Library Manager «OneWire», «DallasTemperature» и «TM1637» (автор Avishay Orpaz). Впишите имя и пароль сети 2,4 ГГц, загрузите скетч и откройте Serial Monitor на 115200 бод: там будет адрес страницы и показания каждые две секунды.",
        kk: "Library Manager арқылы «OneWire», «DallasTemperature» және «TM1637» (авторы Avishay Orpaz) кітапханаларын орнатыңыз. 2,4 ГГц Wi-Fi атауы мен құпиясөзін жазып, скетчті жүктеңіз де, Serial Monitor-ды 115200 бодта ашыңыз: онда бет мекенжайы мен әр екі секундтағы көрсеткіштер шығады.",
      },
      expect: { en: "Lines like \"Water 25.4 C (range 24.0-28.0) OK\".", ru: "Строки вида «Water 25.4 C (range 24.0-28.0) OK».", kk: "«Water 25.4 C (range 24.0-28.0) OK» сияқты жолдар." },
      mistake: { en: "There are several TM1637 libraries; the sketch uses TM1637Display from the one by Avishay Orpaz.", ru: "Библиотек TM1637 несколько; скетч использует TM1637Display из библиотеки Avishay Orpaz.", kk: "TM1637 кітапханалары бірнешеу; скетч Avishay Orpaz кітапханасындағы TM1637Display-ді қолданады." },
    },
    {
      title: { en: "Set your range on the web page", ru: "Задайте диапазон на веб-странице", kk: "Веб-бетте ауқымды орнатыңыз" },
      body: {
        en: "Open the printed address on your phone. Enter the lowest and highest safe temperature for your fish (24–28 °C suits most tropical tanks) and press Save. The range is stored in flash, so it survives a power cut. The page refreshes every three seconds and turns red with \"TOO WARM\" or \"TOO COLD\" when the water leaves the range; the display blinks at the same time.",
        ru: "Откройте напечатанный адрес на телефоне. Введите минимальную и максимальную безопасную температуру для ваших рыб (24–28 °C подходит большинству тропических аквариумов) и нажмите Save. Диапазон сохраняется во flash-памяти и переживает отключение питания. Страница обновляется каждые три секунды и краснеет с надписью «TOO WARM» или «TOO COLD», когда вода выходит за диапазон; одновременно мигает дисплей.",
        kk: "Басып шығарылған мекенжайды телефонда ашыңыз. Балықтарыңыз үшін ең төменгі және ең жоғары қауіпсіз температураны енгізіп (тропикалық аквариумдардың көбіне 24–28 °C жарайды), Save басыңыз. Ауқым flash жадында сақталады, сондықтан қуат өшсе де жоғалмайды. Бет әр үш секунд сайын жаңарады және су ауқымнан шыққанда «TOO WARM» немесе «TOO COLD» деп қызарады; сонымен бірге дисплей жыпылықтайды.",
      },
      expect: { en: "Holding the probe in your hand pushes it above the range and the page turns red within seconds.", ru: "Если зажать щуп в руке, температура выйдет за диапазон, и страница покраснеет за несколько секунд.", kk: "Зондты қолыңызға қыссаңыз, температура ауқымнан шығып, бет бірнеше секундта қызарады." },
      mistake: { en: "Entering a minimum above the maximum: the sketch rejects it and keeps the old range.", ru: "Минимум больше максимума: скетч отклонит такие значения и оставит прежний диапазон.", kk: "Ең төменгісі ең жоғарғысынан үлкен болса, скетч оларды қабылдамай, бұрынғы ауқымды қалдырады." },
    },
    {
      title: { en: "Install it on the tank", ru: "Установите на аквариум", kk: "Аквариумға орнатыңыз" },
      body: {
        en: "Fix the probe with a suction-cup clip in the middle of the water, away from the heater. Keep the ESP32 and display outside the tank in a small box, above the water line, and route the cable with a drip loop so water cannot run along it to the electronics.",
        ru: "Закрепите щуп присоской посередине аквариума, подальше от нагревателя. ESP32 и дисплей держите снаружи в небольшой коробке выше уровня воды, а кабель проложите с петлёй вниз, чтобы капли не стекали по нему к электронике.",
        kk: "Зондты сорғыш қысқышпен аквариумның ортасына, қыздырғыштан алыс бекітіңіз. ESP32 мен дисплейді сыртта, су деңгейінен жоғары шағын қорапта ұстаңыз, ал кабельді су тамшылары электроникаға ақпайтындай төмен иілген ілмекпен тартыңыз.",
      },
      expect: { en: "Readings match the aquarium's stick-on thermometer within about 0.5 °C.", ru: "Показания совпадают с наклеечным термометром аквариума примерно в пределах 0,5 °C.", kk: "Көрсеткіштер аквариумның жапсырма термометрімен шамамен 0,5 °C дәлдікте сәйкес келеді." },
      mistake: { en: "Placing the probe right next to the heater makes the tank look warmer than it is.", ru: "Если поставить щуп рядом с нагревателем, аквариум будет казаться теплее, чем есть.", kk: "Зондты қыздырғыштың жанына қойсаңыз, аквариум шынайыдан жылырақ болып көрінеді." },
    },
  ],
  code: [{
    filename: "aquarium_thermometer.ino",
    language: "cpp",
    libraries: ["OneWire", "DallasTemperature", "TM1637"],
    source: String.raw`#include <WiFi.h>
#include <WebServer.h>
#include <Preferences.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <TM1637Display.h>

// ---- change these ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_PASSWORD";

const int ONE_WIRE_PIN = 4;   // DS18B20 DQ, 4.7 kOhm to 3V3
const int CLK_PIN = 26;       // TM1637 CLK
const int DIO_PIN = 27;       // TM1637 DIO

OneWire oneWire(ONE_WIRE_PIN);
DallasTemperature sensors(&oneWire);
TM1637Display display(CLK_PIN, DIO_PIN);
WebServer server(80);
Preferences prefs;

float waterC = NAN;
float minC = 24.0, maxC = 28.0;
unsigned long requestedAt = 0;
bool converting = false;

const uint8_t SEG_DEGREE = SEG_A | SEG_B | SEG_F | SEG_G;
const uint8_t SEG_LETTER_C = SEG_A | SEG_D | SEG_E | SEG_F;
const uint8_t DASHES[] = { SEG_G, SEG_G, SEG_G, SEG_G };

const char PAGE[] PROGMEM = R"rawliteral(<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Aquarium</title>
<style>
body{margin:0;padding:24px;font-family:system-ui,sans-serif;background:#0b0f14;color:#e6edf3;transition:background .3s}
body.alert{background:#5c1010}
.temp{font-size:72px;font-weight:700}
#state{font-size:24px;font-weight:600;margin-bottom:24px}
input{width:80px;padding:8px;font-size:16px;border-radius:8px;border:1px solid #263040;background:#151b23;color:#e6edf3}
button{padding:9px 16px;font-size:16px;border-radius:8px;border:0;background:#FF7A1A;color:#0b0f14;font-weight:700}
</style></head><body>
<div class="temp"><span id="t">--</span> &deg;C</div>
<div id="state">connecting...</div>
<form action="/set" method="get">
min <input name="min" id="min" type="number" step="0.5"> max <input name="max" id="max" type="number" step="0.5">
<button type="submit">Save</button>
</form>
<script>
var filled = false;
function update() {
  fetch('/data').then(function (r) { return r.json(); }).then(function (d) {
    document.getElementById('t').textContent = d.t === null ? '--' : d.t.toFixed(1);
    document.getElementById('state').textContent = d.state;
    document.body.className = d.state === 'OK' ? '' : 'alert';
    document.title = d.state === 'OK' ? 'Aquarium' : '! ' + d.state;
    if (!filled) { document.getElementById('min').value = d.min; document.getElementById('max').value = d.max; filled = true; }
  }).catch(function () { document.getElementById('state').textContent = 'offline'; });
}
update();
setInterval(update, 3000);
</script></body></html>)rawliteral";

const char* stateText() {
  if (isnan(waterC)) return "SENSOR ERROR";
  if (waterC < minC) return "TOO COLD";
  if (waterC > maxC) return "TOO WARM";
  return "OK";
}

void showTemp() {
  if (isnan(waterC)) {
    display.setSegments(DASHES);
    return;
  }
  bool alarm = strcmp(stateText(), "OK") != 0;
  if (alarm && (millis() / 500) % 2) {     // blink while out of range
    display.clear();
    return;
  }
  int whole = (int)lroundf(waterC);
  uint8_t data[4];
  data[0] = (whole >= 10) ? display.encodeDigit((whole / 10) % 10) : 0;
  data[1] = display.encodeDigit(abs(whole) % 10);
  data[2] = SEG_DEGREE;
  data[3] = SEG_LETTER_C;
  display.setSegments(data);
}

void handleData() {
  String t = isnan(waterC) ? String("null") : String(waterC, 2);
  String json = "{\"t\":" + t + ",\"min\":" + String(minC, 1) + ",\"max\":" + String(maxC, 1) +
                ",\"state\":\"" + stateText() + "\"}";
  server.sendHeader("Cache-Control", "no-store");
  server.send(200, "application/json", json);
}

void handleSet() {
  float lo = server.arg("min").toFloat();
  float hi = server.arg("max").toFloat();
  // accept only a sensible range for a water tank
  if (server.hasArg("min") && server.hasArg("max") && lo >= 5 && hi <= 40 && lo < hi) {
    minC = lo;
    maxC = hi;
    prefs.putFloat("min", minC);
    prefs.putFloat("max", maxC);
    Serial.printf("New range %.1f-%.1f C\n", minC, maxC);
  } else {
    Serial.println("Range rejected");
  }
  server.sendHeader("Location", "/");
  server.send(303);
}

void setup() {
  Serial.begin(115200);
  display.setBrightness(7);
  display.setSegments(DASHES);

  prefs.begin("aquarium", false);
  minC = prefs.getFloat("min", 24.0);
  maxC = prefs.getFloat("max", 28.0);

  sensors.begin();
  sensors.setResolution(12);
  sensors.setWaitForConversion(false);     // do not block the web server for 750 ms
  Serial.printf("DS18B20 sensors found: %d\n", sensors.getDeviceCount());

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
  server.on("/set", handleSet);
  server.begin();
}

void loop() {
  server.handleClient();

  if (!converting) {
    sensors.requestTemperatures();
    requestedAt = millis();
    converting = true;
  } else if (millis() - requestedAt >= 2000) {   // 12-bit conversion needs 750 ms; read every 2 s
    float c = sensors.getTempCByIndex(0);
    waterC = (c == DEVICE_DISCONNECTED_C) ? NAN : c;
    converting = false;
    if (isnan(waterC)) Serial.println("Sensor error: check DQ wire and 4.7k pull-up");
    else Serial.printf("Water %.1f C (range %.1f-%.1f) %s\n", waterC, minC, maxC, stateText());
  }

  static unsigned long lastShow = 0;
  if (millis() - lastShow >= 100) {        // refresh the display 10x per second
    lastShow = millis();
    showTemp();
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Temperature shows -127 or \"SENSOR ERROR\"", ru: "Температура -127 или «SENSOR ERROR»", kk: "Температура -127 немесе «SENSOR ERROR»" },
      cause: { en: "The 4.7 kΩ pull-up is missing or the yellow wire is not on GPIO4.", ru: "Нет подтяжки 4,7 кОм или жёлтый провод не на GPIO4.", kk: "4,7 кОм тартқыш жоқ немесе сары сым GPIO4-те емес." },
      fix: { en: "Check that the resistor bridges DQ and 3V3 in the same rows, and that \"DS18B20 sensors found: 1\" appears at boot.", ru: "Проверьте, что резистор соединяет DQ и 3V3 в тех же рядах и что при старте печатается «DS18B20 sensors found: 1».", kk: "Резистор DQ мен 3V3-ті сол қатарларда жалғап тұрғанын және іске қосылғанда «DS18B20 sensors found: 1» шығатынын тексеріңіз." },
    },
    {
      symptom: { en: "The display stays blank", ru: "Дисплей ничего не показывает", kk: "Дисплей ештеңе көрсетпейді" },
      cause: { en: "CLK and DIO are swapped, or another TM1637 library is installed.", ru: "Перепутаны CLK и DIO, или установлена другая библиотека TM1637.", kk: "CLK пен DIO шатастырылған немесе басқа TM1637 кітапханасы орнатылған." },
      fix: { en: "Swap the two wires (GPIO26 = CLK, GPIO27 = DIO) and use the TM1637 library by Avishay Orpaz.", ru: "Поменяйте провода местами (GPIO26 = CLK, GPIO27 = DIO) и используйте библиотеку TM1637 от Avishay Orpaz.", kk: "Екі сымды ауыстырыңыз (GPIO26 = CLK, GPIO27 = DIO) және Avishay Orpaz жасаған TM1637 кітапханасын қолданыңыз." },
    },
    {
      symptom: { en: "The probe reads 85.0 °C once after power-up", ru: "После включения один раз показывает 85,0 °C", kk: "Қосқаннан кейін бір рет 85,0 °C көрсетеді" },
      cause: { en: "85 °C is the DS18B20's power-on value, read before the first conversion finished.", ru: "85 °C — значение DS18B20 при включении, прочитанное до окончания первого преобразования.", kk: "85 °C — алғашқы түрлендіру аяқталмай тұрып оқылған DS18B20-ның қосылу мәні." },
      fix: { en: "Normal for the very first read; if it repeats, check the 3.3 V supply wire and the pull-up.", ru: "Для самого первого чтения это нормально; если повторяется, проверьте провод питания 3,3 В и подтяжку.", kk: "Ең алғашқы оқу үшін бұл қалыпты; қайталанса, 3,3 В қуат сымы мен тартқышты тексеріңіз." },
    },
  ],
  safety: [
    { en: "Only the sealed probe goes in the water. Keep the board, display and USB adapter above and away from the tank.", ru: "В воду опускается только герметичный щуп. Плату, дисплей и USB-адаптер держите выше аквариума и в стороне от него.", kk: "Суға тек тығыздалған зонд салынады. Платаны, дисплейді және USB адаптерін аквариумнан жоғары әрі алыс ұстаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "DS18B20 sensors found: 1",
      "Connecting to YOUR_WIFI...",
      "Wi-Fi connected, open http://192.168.1.61",
      "Water 25.4 C (range 24.0-28.0) OK",
      "Water 25.4 C (range 24.0-28.0) OK",
      "New range 25.0-27.0 C",
      "Water 25.5 C (range 25.0-27.0) OK",
      "Water 27.3 C (range 25.0-27.0) TOO WARM",
      "Water 26.8 C (range 25.0-27.0) OK",
    ],
    leds: [],
  },
} satisfies GuideContent;
