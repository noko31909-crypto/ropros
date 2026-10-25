import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-pet-feeder",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "home",
  robotics: false,
  difficulty: "intermediate",
  hours: 4,
  costUsd: 18,
  xpReward: 240,
  title: {
    en: "ESP32 Automatic Pet Feeder",
    ru: "Автокормушка для питомца на ESP32",
    kk: "ESP32 негізіндегі үй жануарына арналған автоматты азық бергіш",
  },
  summary: {
    en: "An MG996R servo opens a food gate on a schedule synced over NTP. Set up to four feeding times and portion sizes on a web page, feed now from your phone, or press a button for an extra portion.",
    ru: "Сервопривод MG996R открывает заслонку с кормом по расписанию с точным временем по NTP. До четырёх кормлений и размер порций задаются на веб-странице, покормить можно с телефона или кнопкой.",
    kk: "MG996R сервожетегі NTP арқылы нақтыланған кесте бойынша азық қақпақшасын ашады. Төрт тамақтандыру уақыты мен үлес мөлшері веб-бетте орнатылады, телефоннан не батырмамен қосымша үлес беруге болады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit (WROOM-32)", ru: "ESP32 DevKit (WROOM-32)", kk: "ESP32 DevKit (WROOM-32)" }, role: { en: "Clock, scheduler and web server", ru: "Часы, планировщик и веб-сервер", kk: "Сағат, жоспарлағыш және веб-сервер" } },
    { component: "servo-mg996r", qty: 1, spec: { en: "MG996R metal gear, 180°", ru: "MG996R с металлическими шестернями, 180°", kk: "металл тісті MG996R, 180°" }, role: { en: "Opens and closes the food gate", ru: "Открывает и закрывает заслонку", kk: "Азық қақпақшасын ашып-жабады" } },
    { component: "usb-5v", qty: 1, spec: { en: "dual-port USB charger, 5 V ≥2.4 A total, + a USB cable cut to bare wires", ru: "двухпортовая USB-зарядка, 5 В, суммарно ≥2,4 А, + USB-кабель, обрезанный до голых проводов", kk: "екі портты USB зарядтағыш, 5 В, барлығы ≥2,4 А, + ұшы жалаңаштанған USB кабелі" }, role: { en: "Port 1 feeds the servo, port 2 the ESP32's USB", ru: "Порт 1 питает серво, порт 2 — USB платы ESP32", kk: "1-порт сервоны, 2-порт ESP32 USB-ін қоректендіреді" } },
    { component: "capacitor", qty: 1, spec: { en: "1000 µF, 10 V or higher, electrolytic", ru: "1000 мкФ, от 10 В, электролитический", kk: "1000 мкФ, 10 В-тан жоғары, электролиттік" }, role: { en: "Absorbs the servo's current spikes", ru: "Сглаживает броски тока серво", kk: "Серво тогының секірулерін тегістейді" } },
    { component: "push-button", qty: 1, spec: { en: "12×12 mm tactile with cap", ru: "тактовая 12×12 мм с колпачком", kk: "қақпақты 12×12 мм тактілі" }, role: { en: "Manual portion", ru: "Ручная порция", kk: "Қолмен үлес беру" } },
    { component: "enclosure", qty: 1, spec: { en: "food hopper with a hinged or rotating gate (3D-printed, or a 1.5 L bottle and plywood)", ru: "бункер для корма с откидной или поворотной заслонкой (3D-печать или бутылка 1,5 л и фанера)", kk: "ашылмалы не айналмалы қақпақшасы бар азық бункері (3D басып шығару немесе 1,5 л бөтелке мен фанера)" }, role: { en: "Dry food container and gate", ru: "Ёмкость для сухого корма и заслонка", kk: "Құрғақ азық ыдысы мен қақпақша" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "psu", component: "usb-5v", label: "5 V 2.4 A (servo)" },
    { id: "cap", component: "capacitor", label: "1000 µF" },
    { id: "servo", component: "servo-mg996r", label: "Gate servo" },
    { id: "btn", component: "push-button", label: "Feed" },
  ],
  connections: [
    { from: "psu.5V", to: "servo.VCC", color: "red", note: { en: "servo power never comes from the ESP32", ru: "питание серво никогда не берётся с ESP32", kk: "серво қуаты ешқашан ESP32-ден алынбайды" } },
    { from: "servo.GND", to: "psu.GND", color: "black" },
    { from: "psu.GND", to: "board.GND", color: "black", note: { en: "shared ground: required for the signal to work", ru: "общая земля: без неё сигнал не работает", kk: "ортақ жер: онсыз сигнал жұмыс істемейді" } },
    { from: "cap.A", to: "psu.5V", color: "red", note: { en: "+ leg (long) to 5 V", ru: "плюсовая (длинная) ножка к 5 В", kk: "плюс (ұзын) аяғы 5 В-қа" } },
    { from: "cap.B", to: "psu.GND", color: "black" },
    { from: "board.GPIO13", to: "servo.SIG", color: "orange" },
    { from: "board.GPIO27", to: "btn.1", color: "blue" },
    { from: "btn.2", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Build the hopper and gate", ru: "Соберите бункер и заслонку", kk: "Бункер мен қақпақшаны жасаңыз" },
      body: {
        en: "Mount the food container with its outlet pointing down, and cover the outlet with a flat gate that the servo horn swings aside. Fix the servo with screws, not glue: it pushes against the food weight. Test by hand first: the gate should close fully at one horn position and open the outlet completely about 70° away.",
        ru: "Закрепите ёмкость для корма выходом вниз и закройте выход плоской заслонкой, которую качалка серво отводит в сторону. Сервопривод крепите винтами, а не клеем: он работает против веса корма. Сначала проверьте вручную: заслонка должна полностью закрываться в одном положении качалки и полностью открывать выход примерно через 70°.",
        kk: "Азық ыдысын шығысын төмен қаратып бекітіп, шығысты серво иінтірегі шетке ығыстыратын жалпақ қақпақшамен жабыңыз. Сервоны желіммен емес, бұрандамен бекітіңіз: ол азықтың салмағына қарсы жұмыс істейді. Алдымен қолмен тексеріңіз: қақпақша иінтіректің бір күйінде толық жабылып, шамамен 70°-тан кейін шығысты толық ашуы керек.",
      },
      expect: { en: "Swinging the horn by hand lets a small stream of kibble fall and stops it cleanly.", ru: "Если отвести качалку рукой, сыплется небольшая струйка корма и чётко прекращается.", kk: "Иінтіректі қолмен ығыстырсаңыз, азық аз-аздан төгіліп, анық тоқтайды." },
      mistake: { en: "A gate that rubs or jams makes the servo stall and draw over 2 A; keep it free-moving.", ru: "Если заслонка трётся или заклинивает, серво стопорится и берёт больше 2 А; она должна ходить свободно.", kk: "Қақпақша үйкеліп не кептеліп қалса, серво тоқтап, 2 А-дан астам ток алады; ол еркін жүруі керек." },
    },
    {
      title: { en: "Give the servo its own 5 V supply", ru: "Дайте серво отдельное питание 5 В", kk: "Сервоға жеке 5 В қуат беріңіз" },
      body: {
        en: "Cut a spare USB cable and find the red (+5 V) and black (GND) wires. Connect them to the breadboard power rails, then the servo red wire to +5 V and brown wire to GND. Put the 1000 µF capacitor across the rails with its long (+) leg on 5 V. Finally run one wire from that GND rail to an ESP32 GND pin: the servo needs the same ground reference to understand the signal.",
        ru: "Обрежьте запасной USB-кабель и найдите красный (+5 В) и чёрный (GND) провода. Подключите их к шинам питания макетки, затем красный провод серво к +5 В, а коричневый к GND. Поставьте конденсатор 1000 мкФ между шинами, длинной (+) ножкой к 5 В. В конце соедините эту шину GND одним проводом с пином GND платы ESP32: серво нужна общая земля, чтобы понимать сигнал.",
        kk: "Қосалқы USB кабелін кесіп, қызыл (+5 В) және қара (GND) сымдарды табыңыз. Оларды макет тақтасының қуат шиналарына, содан кейін сервоның қызыл сымын +5 В-қа, қоңыр сымын GND-ге қосыңыз. 1000 мкФ конденсаторды шиналардың арасына ұзын (+) аяғын 5 В-қа қаратып қойыңыз. Соңында сол GND шинасын бір сыммен ESP32-нің GND пиніне қосыңыз: сигналды түсінуі үшін сервоға ортақ жер керек.",
      },
      expect: { en: "With a multimeter: 5.0–5.2 V between the rails, and 0 Ω between rail GND and ESP32 GND.", ru: "Мультиметр: 5,0–5,2 В между шинами и 0 Ом между GND шины и GND платы.", kk: "Мультиметр: шиналар арасында 5,0–5,2 В, шина GND мен плата GND арасында 0 Ом." },
      mistake: { en: "Powering an MG996R from the ESP32 5V pin: every move browns out the board and it reboots.", ru: "Питание MG996R от пина 5V платы ESP32: при каждом движении напряжение проседает и плата перезагружается.", kk: "MG996R-ді ESP32-нің 5V пинінен қоректендірсеңіз, әр қозғалыста кернеу түсіп, плата қайта жүктеледі." },
    },
    {
      title: { en: "Connect the signal and the button", ru: "Подключите сигнал и кнопку", kk: "Сигнал мен батырманы қосыңыз" },
      body: {
        en: "Connect the servo's orange signal wire to GPIO13. The 3.3 V pulses are enough for an MG996R. Wire the feed button between GPIO27 and GND2; the sketch uses the internal pull-up. Power the ESP32 from the second port of the same charger through its own USB socket.",
        ru: "Подключите оранжевый сигнальный провод серво к GPIO13. Импульсов 3,3 В достаточно для MG996R. Кнопку кормления подключите между GPIO27 и GND2; скетч включает внутреннюю подтяжку. Плату ESP32 питайте от второго порта той же зарядки через её собственный USB-разъём.",
        kk: "Сервоның қызғылт сары сигнал сымын GPIO13-ке қосыңыз. MG996R үшін 3,3 В импульстер жеткілікті. Тамақтандыру батырмасын GPIO27 мен GND2 арасына қосыңыз; скетч ішкі тартуды қосады. ESP32-ні сол зарядтағыштың екінші портынан өзінің USB ұясы арқылы қоректендіріңіз.",
      },
      expect: { en: "At boot the servo moves once to the closed position and stays quiet.", ru: "При запуске серво один раз встаёт в закрытое положение и замолкает.", kk: "Іске қосылғанда серво бір рет жабық күйге келіп, тынышталады." },
      mistake: { en: "Mixing up the servo wires: brown is GND, red is +5 V, orange is signal.", ru: "Перепутанные провода серво: коричневый — GND, красный — +5 В, оранжевый — сигнал.", kk: "Серво сымдарын шатастыру: қоңыр — GND, қызыл — +5 В, қызғылт сары — сигнал." },
    },
    {
      title: { en: "Set Wi-Fi and time zone, upload", ru: "Задайте Wi-Fi и часовой пояс, загрузите скетч", kk: "Wi-Fi мен уақыт белдеуін көрсетіп, скетчті жүктеңіз" },
      body: {
        en: "Install ESP32Servo from the Library Manager. Enter your Wi-Fi and TZ_INFO (\"<+05>-5\" is UTC+5). Upload with \"ESP32 Dev Module\" and open the Serial Monitor at 115200 baud. The schedule is saved in flash, so it survives power cuts; the time comes back from NTP as soon as Wi-Fi reconnects.",
        ru: "Установите через Library Manager библиотеку ESP32Servo. Впишите Wi-Fi и TZ_INFO («<+05>-5» — это UTC+5). Загрузите с выбранной платой «ESP32 Dev Module» и откройте Serial Monitor на 115200 бод. Расписание хранится во флеш-памяти и переживает отключение питания, а время возвращается по NTP, как только Wi-Fi переподключится.",
        kk: "Library Manager арқылы ESP32Servo кітапханасын орнатыңыз. Wi-Fi мен TZ_INFO-ны жазыңыз («<+05>-5» — UTC+5). «ESP32 Dev Module» таңдалған күйде жүктеп, Serial Monitor-ды 115200 бодта ашыңыз. Кесте флеш жадта сақталады және қуат өшсе де жойылмайды, ал уақыт Wi-Fi қайта қосылған бойда NTP арқылы қалпына келеді.",
      },
      expect: { en: "\"time synced\" and the feeder page address are printed.", ru: "Печатаются «time synced» и адрес страницы кормушки.", kk: "«time synced» жазуы мен азық бергіш бетінің мекенжайы шығады." },
      mistake: { en: "Without Wi-Fi after a power cut the feeder has no clock and skips scheduled meals; the button still works.", ru: "Если после отключения света нет Wi-Fi, у кормушки нет часов и она пропускает кормления по расписанию; кнопка при этом работает.", kk: "Қуат өшкеннен кейін Wi-Fi болмаса, азық бергіштің сағаты болмайды да, кесте бойынша тамақтандыруды өткізіп алады; батырма бәрібір жұмыс істейді." },
    },
    {
      title: { en: "Tune the portion and the schedule", ru: "Настройте порцию и расписание", kk: "Үлес пен кестені баптаңыз" },
      body: {
        en: "Press the button and weigh what falls out: that is one portion. Adjust OPEN_MS (how long the gate stays open) and OPEN_DEG until one portion is about 10–15 g. Then open the page, tick up to four times, set portions 1–5 for each and press Save. \"Feed now\" gives one portion immediately. Each scheduled time runs once per day, even if you open the page during that minute.",
        ru: "Нажмите кнопку и взвесьте, сколько высыпалось: это одна порция. Подберите OPEN_MS (сколько заслонка открыта) и OPEN_DEG, чтобы порция была около 10–15 г. Затем откройте страницу, отметьте до четырёх времён, для каждого задайте 1–5 порций и нажмите Save. «Feed now» сразу выдаёт одну порцию. Каждое время из расписания срабатывает один раз в сутки, даже если открыть страницу в эту минуту.",
        kk: "Батырманы басып, төгілгенін өлшеңіз: бұл бір үлес. Бір үлес шамамен 10–15 г болуы үшін OPEN_MS (қақпақшаның ашық тұру уақыты) мен OPEN_DEG мәндерін таңдаңыз. Содан кейін бетті ашып, төрт уақытқа дейін белгілеңіз де, әрқайсысына 1–5 үлес қойып, Save басыңыз. «Feed now» бірден бір үлес береді. Кестедегі әр уақыт тәулігіне бір рет қана іске қосылады, сол минутта бетті ашсаңыз да.",
      },
      expect: { en: "At the set time the Serial Monitor prints \"feeding x2 (schedule)\" and the gate opens twice.", ru: "В заданное время Serial Monitor печатает «feeding x2 (schedule)», и заслонка открывается дважды.", kk: "Белгіленген уақытта Serial Monitor «feeding x2 (schedule)» деп шығарып, қақпақша екі рет ашылады." },
      mistake: { en: "A large OPEN_DEG with a short OPEN_MS throws food out; open just enough and give it time to fall.", ru: "Большой OPEN_DEG при коротком OPEN_MS разбрасывает корм; открывайте ровно настолько, чтобы корм успел высыпаться.", kk: "Үлкен OPEN_DEG пен қысқа OPEN_MS азықты шашыратады; азық төгілуге үлгеретіндей ғана ашыңыз." },
    },
  ],
  code: [{
    filename: "pet_feeder.ino",
    language: "cpp",
    libraries: ["ESP32Servo"],
    source: `#include <WiFi.h>
#include <WebServer.h>
#include <Preferences.h>
#include <ESP32Servo.h>
#include <time.h>

// ---- your settings ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";
const char* TZ_INFO = "<+05>-5";   // POSIX time zone (UTC+5); Berlin "CET-1CEST,M3.5.0,M10.5.0/3"

const int SERVO_PIN = 13;     // MG996R signal (servo powered from its own 5 V)
const int BUTTON_PIN = 27;    // manual portion, to GND
const int CLOSED_DEG = 0;
const int OPEN_DEG = 70;
const int OPEN_MS = 600;      // gate open time per portion
const int MAX_PORTIONS = 5;

struct Slot { bool enabled; uint8_t hour, minute, portions; };
Slot slots[4] = { {true, 7, 30, 2}, {true, 18, 30, 2}, {false, 12, 0, 1}, {false, 21, 0, 1} };
int lastFedDay[4] = {-1, -1, -1, -1};   // day of year each slot last ran

Servo gate;
WebServer server(80);
Preferences prefs;
String feedLog[8];
int logPos = 0;
unsigned long lastButton = 0;

const char PAGE[] PROGMEM = R"HTML(<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pet feeder</title>
<style>
body{font-family:system-ui,sans-serif;background:#0f1115;color:#eee;margin:0;padding:20px;max-width:480px}
.r{display:flex;gap:10px;align-items:center;margin:8px 0}input{font-size:18px}input[type=number]{width:52px}
button{font-size:18px;padding:12px 24px;border:0;border-radius:12px;background:#ff7a1a;color:#111;margin:6px 0}
#now{font-size:40px;font-weight:700}li{color:#aaa}
</style></head><body>
<h1>Pet feeder</h1><div id="now">--:--</div>
<button onclick="fetch('/feed',{method:'POST'}).then(load)">Feed now</button>
<form method="post" action="/schedule"><div id="rows"></div><button type="submit">Save</button></form>
<h3>Recent</h3><ul id="log"></ul>
<script>
const rows=document.getElementById('rows');
for(let i=0;i<4;i++){const d=document.createElement('div');d.className='r';
  const c=document.createElement('input');c.type='checkbox';c.name='en'+i;c.id='en'+i;
  const t=document.createElement('input');t.type='time';t.name='t'+i;t.id='t'+i;t.required=true;
  const p=document.createElement('input');p.type='number';p.min=1;p.max=5;p.name='p'+i;p.id='p'+i;
  d.append(c,t,p,'portions');rows.appendChild(d);}
const two=n=>String(n).padStart(2,'0');
function load(){fetch('/state').then(r=>r.json()).then(s=>{
  document.getElementById('now').textContent=s.now;
  s.slots.forEach((x,i)=>{document.getElementById('en'+i).checked=x.en;
    document.getElementById('t'+i).value=two(x.h)+':'+two(x.m);document.getElementById('p'+i).value=x.p;});
  const ul=document.getElementById('log');ul.replaceChildren();
  s.log.forEach(l=>{const li=document.createElement('li');li.textContent=l;ul.appendChild(li);});
});}
load();
</script></body></html>)HTML";

bool nowLocal(struct tm& t) { return getLocalTime(&t, 0) && t.tm_year > 120; }

void addLog(const String& line) {
  feedLog[logPos] = line;
  logPos = (logPos + 1) % 8;
  Serial.println(line);
}

void feed(int portions, const char* source) {
  struct tm t;
  char hm[6] = "--:--";
  if (nowLocal(t)) strftime(hm, sizeof hm, "%H:%M", &t);
  addLog(String(hm) + " feeding x" + portions + " (" + source + ")");
  gate.attach(SERVO_PIN, 500, 2400);
  for (int i = 0; i < portions; i++) {
    gate.write(OPEN_DEG);
    delay(OPEN_MS);
    gate.write(CLOSED_DEG);
    delay(500);
  }
  gate.detach();   // no holding current, no jitter between meals
}

bool parseHM(const String& s, int& h, int& m) {
  if (s.length() != 5 || s[2] != ':') return false;
  const int digitsAt[] = {0, 1, 3, 4};
  for (int i : digitsAt) if (!isDigit(s[i])) return false;
  h = s.substring(0, 2).toInt();
  m = s.substring(3, 5).toInt();
  return h < 24 && m < 60;
}

void handleState() {
  struct tm t;
  char hm[6] = "--:--";
  if (nowLocal(t)) strftime(hm, sizeof hm, "%H:%M", &t);
  String out = "{\\"now\\":\\"" + String(hm) + "\\",\\"slots\\":[";
  for (int i = 0; i < 4; i++) {
    if (i) out += ",";
    out += "{\\"en\\":" + String(slots[i].enabled ? "true" : "false") + ",\\"h\\":" + slots[i].hour +
           ",\\"m\\":" + slots[i].minute + ",\\"p\\":" + slots[i].portions + "}";
  }
  out += "],\\"log\\":[";
  bool first = true;
  for (int k = 1; k <= 8; k++) {            // newest first
    const String& l = feedLog[(logPos - k + 8) % 8];
    if (!l.length()) continue;
    if (!first) out += ",";
    out += "\\"" + l + "\\"";
    first = false;
  }
  out += "]}";
  server.send(200, "application/json", out);
}

void handleSchedule() {
  Slot next[4];
  for (int i = 0; i < 4; i++) {
    int h, m;
    if (!parseHM(server.arg("t" + String(i)), h, m)) { server.send(400, "text/plain", "bad time"); return; }
    long p = server.arg("p" + String(i)).toInt();
    if (p < 1 || p > MAX_PORTIONS) { server.send(400, "text/plain", "portions must be 1-5"); return; }
    next[i] = { server.hasArg("en" + String(i)), (uint8_t)h, (uint8_t)m, (uint8_t)p };
  }
  memcpy(slots, next, sizeof slots);
  prefs.putBytes("slots", slots, sizeof slots);
  for (int i = 0; i < 4; i++) lastFedDay[i] = -1;
  Serial.println("schedule saved");
  server.sendHeader("Location", "/");
  server.send(303);
}

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  gate.attach(SERVO_PIN, 500, 2400);
  gate.write(CLOSED_DEG);
  delay(600);
  gate.detach();

  prefs.begin("feeder", false);
  if (prefs.getBytesLength("slots") == sizeof slots) prefs.getBytes("slots", slots, sizeof slots);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.printf("\\nfeeder page: http://%s/\\n", WiFi.localIP().toString().c_str());

  configTzTime(TZ_INFO, "pool.ntp.org", "time.google.com");
  struct tm t;
  if (getLocalTime(&t, 10000)) {
    char ts[20];
    strftime(ts, sizeof ts, "%Y-%m-%d %H:%M:%S", &t);
    Serial.printf("time synced: %s\\n", ts);
    for (int i = 0; i < 4; i++) {   // don't replay a meal whose minute has already passed today
      if (slots[i].hour * 60 + slots[i].minute < t.tm_hour * 60 + t.tm_min) lastFedDay[i] = t.tm_yday;
    }
  }

  server.on("/", HTTP_GET, []() { server.send_P(200, "text/html", PAGE); });
  server.on("/state", HTTP_GET, handleState);
  server.on("/schedule", HTTP_POST, handleSchedule);
  server.on("/feed", HTTP_POST, []() { feed(1, "web"); server.send(200, "text/plain", "ok"); });
  server.begin();
}

void loop() {
  server.handleClient();

  if (digitalRead(BUTTON_PIN) == LOW && millis() - lastButton > 3000) {
    delay(30);                                   // debounce
    if (digitalRead(BUTTON_PIN) == LOW) {
      lastButton = millis();
      feed(1, "button");
    }
  }

  struct tm t;
  if (!nowLocal(t)) return;                      // no clock yet: only manual feeding
  for (int i = 0; i < 4; i++) {
    const Slot& s = slots[i];
    if (!s.enabled || lastFedDay[i] == t.tm_yday) continue;
    if (t.tm_hour == s.hour && t.tm_min == s.minute) {
      lastFedDay[i] = t.tm_yday;
      feed(s.portions, "schedule");
    }
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The ESP32 reboots every time the servo moves", ru: "ESP32 перезагружается при каждом движении серво", kk: "Серво қозғалған сайын ESP32 қайта жүктеледі" },
      cause: { en: "The servo shares the ESP32's supply, or the charger port is too weak.", ru: "Серво питается от того же источника, что и ESP32, или порт зарядки слишком слабый.", kk: "Серво ESP32-мен бір көзден қоректенеді немесе зарядтағыш порты тым әлсіз." },
      fix: { en: "Feed the servo from its own port of a ≥2.4 A charger, keep the 1000 µF capacitor, and use short thick wires.", ru: "Питайте серво от отдельного порта зарядки на ≥2,4 А, оставьте конденсатор 1000 мкФ и используйте короткие толстые провода.", kk: "Сервоны ≥2,4 А зарядтағыштың жеке портынан қоректендіріп, 1000 мкФ конденсаторды қалдырыңыз және қысқа, жуан сымдар пайдаланыңыз." },
    },
    {
      symptom: { en: "The servo does not move at all", ru: "Серво вообще не двигается", kk: "Серво мүлде қозғалмайды" },
      cause: { en: "No common ground between the servo supply and the ESP32.", ru: "Нет общей земли между питанием серво и ESP32.", kk: "Серво қуаты мен ESP32 арасында ортақ жер жоқ." },
      fix: { en: "Add the wire from the servo GND rail to an ESP32 GND pin.", ru: "Добавьте провод от шины GND серво к пину GND платы ESP32.", kk: "Серво GND шинасынан ESP32-нің GND пиніне сым қосыңыз." },
    },
    {
      symptom: { en: "Scheduled meals never happen", ru: "Кормления по расписанию не происходят", kk: "Кесте бойынша тамақтандыру болмайды" },
      cause: { en: "The time never synced, or the time zone is wrong so the feeder thinks it is a different hour.", ru: "Время не синхронизировалось или неверный часовой пояс, и кормушка считает, что сейчас другой час.", kk: "Уақыт синхрондалмаған немесе уақыт белдеуі қате, сондықтан азық бергіш басқа сағат деп санайды." },
      fix: { en: "Check that the page shows the correct current time; fix TZ_INFO (UTC+5 is written \"<+05>-5\").", ru: "Проверьте, что страница показывает правильное время; исправьте TZ_INFO (UTC+5 пишется «<+05>-5»).", kk: "Бет дұрыс уақытты көрсететінін тексеріп, TZ_INFO-ны түзетіңіз (UTC+5 «<+05>-5» деп жазылады)." },
    },
    {
      symptom: { en: "Food jams and the servo buzzes", ru: "Корм застревает, серво гудит", kk: "Азық кептеліп, серво ызыңдайды" },
      cause: { en: "Large or sticky kibble wedges in the gate.", ru: "Крупный или липкий корм заклинивает заслонку.", kk: "Ірі не жабысқақ азық қақпақшаны кептейді." },
      fix: { en: "Widen the outlet to at least 3× the kibble size and use dry food only.", ru: "Расширьте выход минимум до трёх размеров гранулы и используйте только сухой корм.", kk: "Шығысты түйіршік өлшемінен кемінде 3 есе кеңейтіп, тек құрғақ азық пайдаланыңыз." },
    },
  ],
  safety: [
    { en: "Do not leave a pet alone for days relying only on this feeder: check that it worked, and keep water available separately.", ru: "Не оставляйте питомца на несколько дней, полагаясь только на кормушку: проверяйте, что она сработала, и оставляйте воду отдельно.", kk: "Үй жануарын тек азық бергішке сеніп бірнеше күнге жалғыз қалдырмаңыз: оның жұмыс істегенін тексеріп, суды бөлек қойыңыз." },
    { en: "Cover the servo and cables so the pet cannot chew wires or get a paw in the moving gate.", ru: "Закройте серво и кабели, чтобы питомец не грыз провода и не сунул лапу в движущуюся заслонку.", kk: "Үй жануары сымдарды кеміріп не қозғалатын қақпақшаға табанын салмауы үшін серво мен кабельдерді жабыңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Connecting.....",
      "feeder page: http://192.168.1.80/",
      "time synced: 2026-10-26 07:29:41",
      "07:30 feeding x2 (schedule)",
      "12:14 feeding x1 (button)",
      "schedule saved",
      "18:02 feeding x1 (web)",
      "18:30 feeding x2 (schedule)",
    ],
    leds: [],
  },
} satisfies GuideContent;
