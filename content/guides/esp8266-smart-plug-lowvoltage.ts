import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp8266-smart-plug-lowvoltage",
  status: "unverified",
  platform: "esp32",
  board: "esp8266-nodemcu",
  category: "home",
  robotics: false,
  difficulty: "beginner",
  hours: 2,
  costUsd: 10,
  xpReward: 160,
  title: {
    en: "ESP8266 Smart Switch for 12 V Devices",
    ru: "Умный выключатель на ESP8266 для устройств 12 В",
    kk: "12 В құрылғыларға арналған ESP8266 ақылды ажыратқышы",
  },
  summary: {
    en: "A NodeMCU and a relay switch a 12 V LED strip, fan or pump from a web page and on a daily schedule kept in time by NTP. Low voltage only: no mains anywhere.",
    ru: "NodeMCU и реле включают 12-вольтовую LED-ленту, вентилятор или насос с веб-страницы и по ежедневному расписанию, время берётся по NTP. Только низкое напряжение, никакой сети 220 В.",
    kk: "NodeMCU мен реле 12 В LED таспасын, желдеткішті не сорғыны веб-беттен және NTP уақытымен жүретін күнделікті кесте бойынша қосады. Тек төмен кернеу, 220 В желі мүлде жоқ.",
  },
  parts: [
    { component: "esp8266-nodemcu", qty: 1, spec: { en: "ESP-12E NodeMCU v2/v3", ru: "ESP-12E NodeMCU v2/v3", kk: "ESP-12E NodeMCU v2/v3" }, role: { en: "Wi-Fi, clock and web UI", ru: "Wi-Fi, часы и веб-интерфейс", kk: "Wi-Fi, сағат және веб-интерфейс" } },
    { component: "relay-module", qty: 1, spec: { en: "5 V coil, high-level trigger (or H/L jumper set to H), contacts 10 A 30 V DC", ru: "катушка 5 В, управление высоким уровнем (или перемычка H/L в H), контакты 10 А 30 В DC", kk: "5 В катушка, жоғары деңгеймен басқару (немесе H/L секіргіші H-та), түйіспелер 10 А 30 В DC" }, role: { en: "Switches the + wire of the 12 V device", ru: "Разрывает плюсовой провод устройства 12 В", kk: "12 В құрылғының оң сымын ажыратады" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V 1 A USB charger with a cable you can split, or a USB breakout", ru: "USB-зарядка 5 В 1 А с кабелем, который можно разделать, или USB-переходник с клеммами", kk: "ажыратуға болатын кабелі бар 5 В 1 А USB зарядтағыш немесе клеммалы USB адаптер" }, role: { en: "Powers the NodeMCU (VIN) and the relay coil", ru: "Питает NodeMCU (VIN) и катушку реле", kk: "NodeMCU (VIN) мен реле катушкасын қоректендіреді" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-female", ru: "папа-мама", kk: "аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { component: "enclosure", qty: 1, spec: { en: "small plastic box with cable glands", ru: "небольшая пластиковая коробка с кабельными вводами", kk: "кабель енгізгіштері бар шағын пластик қорап" }, role: { en: "Keeps the screw terminals covered", ru: "Закрывает винтовые клеммы", kk: "Бұрандалы клеммаларды жабады" }, optional: true },
  ],
  instances: [
    { id: "psu", component: "usb-5v", label: "5 V USB supply" },
    { id: "relay", component: "relay-module", label: "Relay (12 V side)" },
  ],
  connections: [
    { from: "psu.5V", to: "board.VIN", color: "red", note: { en: "5 V into VIN; the board makes its own 3.3 V", ru: "5 В на VIN; 3,3 В плата делает сама", kk: "VIN-ге 5 В; 3,3 В-ты тақта өзі жасайды" } },
    { from: "psu.GND", to: "board.GND", color: "black" },
    { from: "psu.5V", to: "relay.VCC", color: "red", note: { en: "the relay coil needs 5 V, not 3.3 V", ru: "катушке реле нужно 5 В, а не 3,3 В", kk: "реле катушкасына 3,3 В емес, 5 В керек" } },
    { from: "relay.GND", to: "board.GND2", color: "black" },
    { from: "board.D1", to: "relay.IN", color: "yellow", note: { en: "GPIO5: stays LOW at boot, so no click on power-up", ru: "GPIO5: при загрузке LOW, реле не щёлкает при включении", kk: "GPIO5: жүктелгенде LOW, қосылғанда реле шертпейді" } },
  ],
  steps: [
    {
      title: { en: "Pick the right relay and plan the 12 V side", ru: "Выберите реле и продумайте сторону 12 В", kk: "Релені таңдап, 12 В жағын жоспарлаңыз" },
      body: {
        en: "Use a 5 V relay module that switches on a HIGH input (often marked \"high level trigger\", or with an H/L jumper set to H). Low-trigger modules with an optocoupler may never release from a 3.3 V pin. The relay goes into the + wire of your 12 V device: adapter + to COM, device + to NO, the − wires stay connected directly. Keep the 12 V device at 5 A or less.",
        ru: "Возьмите модуль реле 5 В, который включается высоким уровнем (часто пишут «high level trigger» или есть перемычка H/L в положении H). Модули с низким уровнем и оптопарой от пина 3,3 В могут вообще не отпускать. Реле ставится в плюсовой провод устройства 12 В: плюс адаптера на COM, плюс устройства на NO, минусовые провода соединены напрямую. Устройство 12 В — не больше 5 А.",
        kk: "Жоғары деңгейде қосылатын 5 В реле модулін алыңыз (көбіне «high level trigger» деп жазылады немесе H/L секіргіші H күйінде болады). Оптожұбы бар төмен деңгейлі модульдер 3,3 В пиннен мүлде ажырамауы мүмкін. Реле 12 В құрылғының оң сымына қойылады: адаптердің плюсі COM-ға, құрылғының плюсі NO-ға, минус сымдар тікелей жалғанып қалады. 12 В құрылғы 5 А-дан аспасын.",
      },
      expect: { en: "A clear plan: COM and NO in the + line, the − line untouched.", ru: "Ясная схема: COM и NO в плюсовой линии, минус не трогаем.", kk: "Түсінікті схема: COM мен NO оң сызықта, минусқа тимейміз." },
      mistake: { en: "Using this build for 220 V / mains. The breadboard, jumpers and this guide are for low voltage only.", ru: "Использовать эту сборку для 220 В. Макетка, провода и этот гайд — только для низкого напряжения.", kk: "Бұл құрастыруды 220 В үшін қолдану. Макет тақтасы, сымдар және бұл нұсқаулық тек төмен кернеуге арналған." },
    },
    {
      title: { en: "Wire the 5 V supply and the relay", ru: "Подключите питание 5 В и реле", kk: "5 В қуат пен релені қосыңыз" },
      body: {
        en: "Bring the 5 V supply onto the breadboard rails. 5 V goes to NodeMCU VIN and relay VCC, GND to NodeMCU GND. Connect relay GND to the second NodeMCU GND and relay IN to D1 (GPIO5). D1 is LOW during boot, so the relay does not click when power comes on, unlike D3, D4 or D8.",
        ru: "Выведите питание 5 В на шины макетки. 5 В идут на VIN NodeMCU и VCC реле, GND на GND NodeMCU. GND реле подключите ко второму GND NodeMCU, а IN реле к D1 (GPIO5). D1 при загрузке держит LOW, поэтому реле не щёлкает при включении, в отличие от D3, D4 или D8.",
        kk: "5 В қуатты макет тақтасының шиналарына шығарыңыз. 5 В NodeMCU VIN мен реле VCC-ге, GND NodeMCU GND-ге барады. Реле GND-ін NodeMCU-дың екінші GND-не, ал реле IN-ін D1-ге (GPIO5) қосыңыз. D1 жүктелу кезінде LOW ұстайды, сондықтан D3, D4 не D8-ге қарағанда реле қосылғанда шертпейді.",
      },
      expect: { en: "Relay power LED on; the relay itself stays quiet.", ru: "Светодиод питания реле горит, само реле молчит.", kk: "Реле қуат шамы жанады, реленің өзі үнсіз." },
      mistake: { en: "Powering the relay VCC from 3V3: the 5 V coil will not pull in reliably and the 3.3 V regulator overloads.", ru: "Питать VCC реле от 3V3: катушка 5 В не будет надёжно срабатывать, а стабилизатор 3,3 В перегрузится.", kk: "Реле VCC-ін 3V3-тен қоректендіру: 5 В катушка сенімді іске қосылмайды, ал 3,3 В стабилизаторы шамадан тыс жүктеледі." },
    },
    {
      title: { en: "Set Wi-Fi and time zone, then upload", ru: "Укажите Wi-Fi и часовой пояс, затем загрузите", kk: "Wi-Fi мен уақыт белдеуін жазып, жүктеңіз" },
      body: {
        en: "In the sketch fill in WIFI_SSID and WIFI_PASS, and set TZ_INFO: \"<+05>-5\" for Kazakhstan, \"MSK-3\" for Moscow. Select \"NodeMCU 1.0 (ESP-12E Module)\", unplug the 5 V supply, upload over USB and open the Serial Monitor at 115200 baud.",
        ru: "В скетче заполните WIFI_SSID и WIFI_PASS и задайте TZ_INFO: «<+05>-5» для Казахстана, «MSK-3» для Москвы. Выберите «NodeMCU 1.0 (ESP-12E Module)», отключите питание 5 В, загрузите скетч по USB и откройте Serial Monitor на 115200 бод.",
        kk: "Скетчте WIFI_SSID пен WIFI_PASS толтырып, TZ_INFO орнатыңыз: Қазақстан үшін «<+05>-5», Мәскеу үшін «MSK-3». «NodeMCU 1.0 (ESP-12E Module)» таңдап, 5 В қуатты ажыратыңыз да, скетчті USB арқылы жүктеп, Serial Monitor-ды 115200 бодта ашыңыз.",
      },
      expect: { en: "\"Wi-Fi OK\", the IP address and \"time synced\" with your local time.", ru: "«Wi-Fi OK», IP-адрес и «time synced» с вашим местным временем.", kk: "«Wi-Fi OK», IP мекенжайы және жергілікті уақытпен «time synced»." },
      mistake: { en: "A wrong TZ string: the schedule then fires hours early or late.", ru: "Неверная строка TZ: расписание сработает на несколько часов раньше или позже.", kk: "TZ жолы қате болса, кесте бірнеше сағат ерте не кеш іске қосылады." },
    },
    {
      title: { en: "Test from the web page", ru: "Проверьте с веб-страницы", kk: "Веб-беттен тексеріңіз" },
      body: {
        en: "Open the IP address in a browser on the same network. The big button switches the relay: you hear a click and the relay LED lights. Then connect the 12 V side (adapter + → COM, device + → NO) and switch again. The page shows the current time, the state and who switched it last.",
        ru: "Откройте IP-адрес в браузере в той же сети. Большая кнопка переключает реле: слышен щелчок, загорается светодиод реле. Затем подключите сторону 12 В (плюс адаптера → COM, плюс устройства → NO) и переключите снова. На странице видно текущее время, состояние и кто переключил последним.",
        kk: "IP мекенжайын сол желідегі браузерде ашыңыз. Үлкен батырма релені ауыстырады: шерту естіледі, реле шамы жанады. Содан кейін 12 В жағын қосыңыз (адаптер плюсі → COM, құрылғы плюсі → NO) да, қайта ауыстырыңыз. Бетте ағымдағы уақыт, күй және соңғы рет кім ауыстырғаны көрінеді.",
      },
      expect: { en: "The 12 V device follows the button; the monitor prints \"relay ON (web)\".", ru: "Устройство 12 В слушается кнопки; монитор пишет «relay ON (web)».", kk: "12 В құрылғы батырманы тыңдайды; монитор «relay ON (web)» деп жазады." },
      mistake: { en: "Using NC instead of NO: the device is then on whenever the relay is off.", ru: "Взять NC вместо NO: устройство будет включено, когда реле выключено.", kk: "NO орнына NC алу: сонда реле өшірулі кезде құрылғы қосулы болады." },
    },
    {
      title: { en: "Set the daily schedule", ru: "Задайте ежедневное расписание", kk: "Күнделікті кестені орнатыңыз" },
      body: {
        en: "Enter an ON time and an OFF time, tick \"schedule\" and press SAVE. The schedule is stored in flash and survives power cuts. It also works across midnight (ON 19:00, OFF 01:00). The relay follows the schedule at each ON/OFF minute; a manual press in between stays until the next scheduled change.",
        ru: "Введите время включения и выключения, отметьте «schedule» и нажмите SAVE. Расписание хранится во флеш-памяти и переживает отключение питания. Работает и через полночь (ON 19:00, OFF 01:00). Реле переключается в каждую минуту ON/OFF; ручное нажатие между ними действует до следующего события расписания.",
        kk: "Қосылу мен өшу уақытын енгізіп, «schedule» белгілеп, SAVE басыңыз. Кесте флеш жадта сақталады және қуат өшкенде жоғалмайды. Түн ортасы арқылы да жұмыс істейді (ON 19:00, OFF 01:00). Реле әр ON/OFF минутында ауысады; арадағы қолмен басу кестенің келесі оқиғасына дейін сақталады.",
      },
      expect: { en: "At the ON minute the monitor prints \"relay ON (schedule)\".", ru: "В минуту ON монитор пишет «relay ON (schedule)».", kk: "ON минутында монитор «relay ON (schedule)» деп жазады." },
      mistake: { en: "Expecting the schedule before \"time synced\": without NTP the plug does not know the time and only manual control works.", ru: "Ждать срабатывания до «time synced»: без NTP устройство не знает времени, работает только ручное управление.", kk: "«time synced» болмай тұрып кестені күту: NTP-сіз құрылғы уақытты білмейді, тек қолмен басқару жұмыс істейді." },
    },
  ],
  code: [{
    filename: "smart_switch_12v.ino",
    language: "cpp",
    libraries: [],
    source: `#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>
#include <time.h>

// ---- your Wi-Fi (2.4 GHz) ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_PASSWORD";
// POSIX time zone: Kazakhstan "<+05>-5", Moscow "MSK-3", Berlin "CET-1CEST,M3.5.0,M10.5.0/3"
const char* TZ_INFO = "<+05>-5";

const int RELAY_PIN = D1;                 // GPIO5, LOW during boot
const bool RELAY_ACTIVE_HIGH = true;      // high-level trigger module

struct Schedule { uint32_t magic; uint8_t enabled; uint16_t onMin; uint16_t offMin; };
const uint32_t MAGIC = 0x52505331;
Schedule sched = {MAGIC, 0, 7 * 60, 23 * 60};

ESP8266WebServer server(80);
bool relayOn = false;
bool timeSynced = false;
String lastBy = "boot";
int lastMinute = -1;

const char PAGE[] PROGMEM = R"html(<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>ropros switch</title>
<style>body{margin:0;padding:16px;background:#0b0f14;color:#e6edf3;font-family:system-ui,sans-serif;text-align:center}
#b{width:180px;height:180px;border-radius:50%;border:0;font-size:32px;margin:20px;background:#16202b;color:#e6edf3}
#b.on{background:#ff7a1a;color:#0b0f14}input{font-size:18px;margin:6px}#info{color:#8b98a5}</style></head><body>
<p id="clock">--:--</p><button id="b">OFF</button><p id="info"></p>
<p>ON <input type="time" id="on"> OFF <input type="time" id="off"></p>
<p><label><input type="checkbox" id="en"> schedule</label> <button id="save">SAVE</button></p>
<script>
const $=i=>document.getElementById(i);let loaded=false;
async function refresh(){try{const j=await (await fetch('/api/state')).json();
$('clock').textContent=j.time;$('b').textContent=j.on?'ON':'OFF';$('b').className=j.on?'on':'';
$('info').textContent='last change: '+j.by;
if(!loaded){$('on').value=j.onTime;$('off').value=j.offTime;$('en').checked=j.en;loaded=true}}catch(e){$('info').textContent='offline'}}
$('b').onclick=()=>fetch('/api/toggle',{method:'POST'}).then(refresh);
$('save').onclick=()=>fetch('/api/schedule?on='+$('on').value+'&off='+$('off').value+'&en='+($('en').checked?1:0),{method:'POST'})
.then(r=>r.text()).then(t=>{alert(t);refresh()});
refresh();setInterval(refresh,2000);
</script></body></html>)html";

void setRelay(bool on, const char* by) {
  relayOn = on;
  digitalWrite(RELAY_PIN, (on == RELAY_ACTIVE_HIGH) ? HIGH : LOW);
  lastBy = by;
  Serial.printf("relay %s (%s)\\n", on ? "ON" : "OFF", by);
}

bool inWindow(int nowMin) {
  if (sched.onMin == sched.offMin) return false;
  if (sched.onMin < sched.offMin) return nowMin >= sched.onMin && nowMin < sched.offMin;
  return nowMin >= sched.onMin || nowMin < sched.offMin;      // across midnight
}

int parseHHMM(const String& s) {          // "07:30" -> 450, or -1
  if (s.length() != 5 || s[2] != ':') return -1;
  int h = s.substring(0, 2).toInt(), m = s.substring(3).toInt();
  if (!isDigit(s[0]) || !isDigit(s[1]) || !isDigit(s[3]) || !isDigit(s[4]) || h > 23 || m > 59) return -1;
  return h * 60 + m;
}

String hhmm(int minutes) {
  char b[6];
  snprintf(b, sizeof b, "%02d:%02d", minutes / 60, minutes % 60);
  return String(b);
}

void handleRoot() { server.send_P(200, "text/html", PAGE); }

void handleState() {
  time_t now = time(nullptr);
  struct tm t;
  localtime_r(&now, &t);
  char clock[20];
  if (timeSynced) strftime(clock, sizeof clock, "%H:%M:%S", &t);
  else strcpy(clock, "no time yet");
  String json = String("{\\"on\\":") + (relayOn ? "true" : "false") +
                ",\\"time\\":\\"" + clock + "\\",\\"by\\":\\"" + lastBy +
                "\\",\\"en\\":" + (sched.enabled ? "true" : "false") +
                ",\\"onTime\\":\\"" + hhmm(sched.onMin) + "\\",\\"offTime\\":\\"" + hhmm(sched.offMin) + "\\"}";
  server.send(200, "application/json", json);
}

void handleToggle() {
  setRelay(!relayOn, "web");
  server.send(200, "text/plain", relayOn ? "ON" : "OFF");
}

void handleSchedule() {
  int onMin = parseHHMM(server.arg("on"));
  int offMin = parseHHMM(server.arg("off"));
  if (onMin < 0 || offMin < 0 || onMin == offMin) {
    server.send(400, "text/plain", "times must be HH:MM and different");
    return;
  }
  sched.onMin = onMin;
  sched.offMin = offMin;
  sched.enabled = server.arg("en") == "1";
  EEPROM.put(0, sched);
  EEPROM.commit();
  Serial.printf("schedule %s ON %s OFF %s\\n", sched.enabled ? "enabled" : "disabled", hhmm(onMin).c_str(), hhmm(offMin).c_str());
  if (sched.enabled && timeSynced) {
    time_t now = time(nullptr);
    struct tm t;
    localtime_r(&now, &t);
    setRelay(inWindow(t.tm_hour * 60 + t.tm_min), "schedule");
  }
  server.send(200, "text/plain", "saved");
}

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, RELAY_ACTIVE_HIGH ? LOW : HIGH);   // start OFF
  Serial.begin(115200);
  Serial.println();

  EEPROM.begin(sizeof(Schedule));
  Schedule stored;
  EEPROM.get(0, stored);
  if (stored.magic == MAGIC && stored.onMin < 1440 && stored.offMin < 1440) sched = stored;

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.printf("\\nWi-Fi OK, open http://%s\\n", WiFi.localIP().toString().c_str());
  configTime(TZ_INFO, "pool.ntp.org", "time.google.com");

  server.on("/", HTTP_GET, handleRoot);
  server.on("/api/state", HTTP_GET, handleState);
  server.on("/api/toggle", HTTP_POST, handleToggle);
  server.on("/api/schedule", HTTP_POST, handleSchedule);
  server.begin();
}

void loop() {
  server.handleClient();
  time_t now = time(nullptr);
  if (now < 1700000000) return;            // NTP not answered yet
  struct tm t;
  localtime_r(&now, &t);
  int nowMin = t.tm_hour * 60 + t.tm_min;

  if (!timeSynced) {
    timeSynced = true;
    char stamp[24];
    strftime(stamp, sizeof stamp, "%Y-%m-%d %H:%M:%S", &t);
    Serial.printf("time synced: %s\\n", stamp);
    if (sched.enabled) setRelay(inWindow(nowMin), "schedule");
  }
  if (nowMin == lastMinute) return;
  lastMinute = nowMin;
  if (!sched.enabled) return;
  if (nowMin == sched.onMin && !relayOn) setRelay(true, "schedule");
  if (nowMin == sched.offMin && relayOn) setRelay(false, "schedule");
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The relay LED lights but the relay never releases", ru: "Светодиод реле горит, но реле не отпускает", kk: "Реле шамы жанады, бірақ реле ажырамайды" },
      cause: { en: "It is a low-level-trigger module: 3.3 V on IN is still \"low enough\" to keep its optocoupler on.", ru: "Это модуль с управлением низким уровнем: 3,3 В на IN для его оптопары всё ещё «низкий» уровень.", kk: "Бұл төмен деңгейлі модуль: IN-дегі 3,3 В оның оптожұбы үшін әлі де «төмен» деңгей." },
      fix: { en: "Move the H/L jumper to H, or use a high-level-trigger module and keep RELAY_ACTIVE_HIGH = true.", ru: "Переставьте перемычку H/L в H или возьмите модуль с высоким уровнем и оставьте RELAY_ACTIVE_HIGH = true.", kk: "H/L секіргішін H-қа ауыстырыңыз немесе жоғары деңгейлі модуль алып, RELAY_ACTIVE_HIGH = true қалдырыңыз." },
    },
    {
      symptom: { en: "Page shows \"no time yet\" for minutes", ru: "Страница минутами показывает «no time yet»", kk: "Бет бірнеше минут «no time yet» көрсетеді" },
      cause: { en: "The router blocks NTP (UDP port 123) or the network has no internet.", ru: "Роутер блокирует NTP (UDP-порт 123) или в сети нет интернета.", kk: "Роутер NTP-ні (UDP 123 порты) бұғаттайды немесе желіде интернет жоқ." },
      fix: { en: "Check internet access; replace pool.ntp.org with your router's IP if it runs an NTP server.", ru: "Проверьте доступ в интернет; если роутер сам раздаёт NTP, замените pool.ntp.org на его IP.", kk: "Интернетке қолжетімділікті тексеріңіз; роутер NTP таратса, pool.ntp.org орнына оның IP-ін жазыңыз." },
    },
    {
      symptom: { en: "NodeMCU resets when the relay clicks", ru: "NodeMCU перезагружается при щелчке реле", kk: "Реле шерткенде NodeMCU қайта жүктеледі" },
      cause: { en: "A weak 5 V supply, or a 12 V motor or pump without a flyback diode spraying spikes.", ru: "Слабый источник 5 В, или мотор/насос 12 В без обратного диода даёт выбросы.", kk: "5 В көзі әлсіз немесе кері диодсыз 12 В мотор/сорғы кернеу секірістерін береді." },
      fix: { en: "Use a 1 A supply, and put a 1N4007 across the 12 V motor (stripe to +).", ru: "Возьмите источник на 1 А и поставьте 1N4007 параллельно мотору 12 В (полосой к плюсу).", kk: "1 А көз алыңыз және 12 В моторға параллель 1N4007 қойыңыз (жолағы плюске)." },
    },
  ],
  safety: [
    { en: "Low voltage only: never connect this relay, breadboard or wiring to 220 V mains.", ru: "Только низкое напряжение: никогда не подключайте это реле, макетку и провода к сети 220 В.", kk: "Тек төмен кернеу: бұл релені, макет тақтасын және сымдарды ешқашан 220 В желіге қоспаңыз." },
    { en: "Inductive 12 V loads (pumps, fans, solenoids) need a 1N4007 flyback diode across the load, stripe towards +.", ru: "Индуктивным нагрузкам 12 В (насосы, вентиляторы, соленоиды) нужен обратный диод 1N4007 параллельно нагрузке, полосой к плюсу.", kk: "Индуктивті 12 В жүктемелерге (сорғы, желдеткіш, соленоид) жүктемеге параллель, жолағы плюске қараған 1N4007 кері диоды керек." },
    { en: "Anyone on your Wi-Fi can open the page; keep it on a trusted home network.", ru: "Страницу может открыть любой в вашей Wi-Fi сети; держите устройство в доверенной домашней сети.", kk: "Бетті Wi-Fi желіңіздегі кез келген адам аша алады; құрылғыны сенімді үй желісінде ұстаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Connecting.....",
      "Wi-Fi OK, open http://192.168.1.71",
      "time synced: 2026-10-25 18:42:07",
      "relay ON (web)",
      "relay OFF (web)",
      "schedule enabled ON 19:00 OFF 23:30",
      "relay ON (schedule)",
      "relay OFF (schedule)",
    ],
    leds: [{ label: "RELAY", color: "#E53935" }],
  },
} satisfies GuideContent;
