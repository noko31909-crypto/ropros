import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-garage-door-monitor",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "security",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 14,
  xpReward: 210,
  title: {
    en: "ESP32 Garage Door Monitor",
    ru: "Монитор гаражных ворот на ESP32",
    kk: "ESP32 гараж қақпасының мониторы",
  },
  summary: {
    en: "A reed switch tells whether the garage door is closed, and a relay \"presses\" the opener button. A password-protected web page shows the status with Open and Close buttons.",
    ru: "Геркон показывает, закрыты ли гаражные ворота, а реле «нажимает» кнопку привода. Веб-страница с паролем показывает состояние и кнопки Open и Close.",
    kk: "Геркон гараж қақпасының жабық екенін анықтайды, ал реле жетек батырмасын «басады». Құпиясөзбен қорғалған веб-бет күйді және Open, Close батырмаларын көрсетеді.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit (WROOM-32)", ru: "ESP32 DevKit (WROOM-32)", kk: "ESP32 DevKit (WROOM-32)" }, role: { en: "Controller and web server", ru: "Контроллер и веб-сервер", kk: "Контроллер және веб-сервер" } },
    { component: "reed-switch", qty: 1, spec: { en: "door/window magnetic contact, normally open, with magnet", ru: "магнитоконтактный датчик для двери/окна, нормально разомкнутый, с магнитом", kk: "есік/терезеге арналған магниттік түйіспе, қалыпты ажыратулы, магнитімен" }, role: { en: "Door closed sensor", ru: "Датчик закрытых ворот", kk: "Жабық қақпа датчигі" } },
    { component: "relay-module", qty: 1, spec: { en: "1-channel 5 V, with H/L trigger jumper", ru: "1 канал, 5 В, с перемычкой H/L", kk: "1 арна, 5 В, H/L секіргіші бар" }, role: { en: "Dry contact in parallel with the opener's wall button", ru: "«Сухой» контакт параллельно настенной кнопке привода", kk: "Жетектің қабырға батырмасына параллель «құрғақ» түйіспе" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V 1 A USB charger + micro-USB cable", ru: "USB-зарядка 5 В 1 А + кабель micro-USB", kk: "5 В 1 А USB зарядтағыш + micro-USB кабелі" }, role: { en: "Powers the ESP32 through its USB port", ru: "Питает ESP32 через её USB-порт", kk: "ESP32-ні оның USB порты арқылы қоректендіреді" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-female", ru: "папа-мама", kk: "аталық-аналық" }, role: { en: "Connections on the bench", ru: "Соединения на столе", kk: "Үстелдегі қосылыстар" } },
    { component: "enclosure", qty: 1, spec: { en: "small box mounted near the opener", ru: "небольшая коробка возле привода", kk: "жетектің жанындағы шағын қорап" }, role: { en: "Housing", ru: "Корпус", kk: "Корпус" } },
  ],
  instances: [
    { id: "reed", component: "reed-switch", label: "Door closed" },
    { id: "relay", component: "relay-module", label: "Opener button" },
  ],
  connections: [
    { from: "board.GPIO27", to: "reed.1", color: "yellow", note: { en: "internal pull-up: closed door reads LOW", ru: "внутренняя подтяжка: закрытые ворота читаются как LOW", kk: "ішкі тарту: жабық қақпа LOW болып оқылады" } },
    { from: "reed.2", to: "board.GND", color: "black" },
    { from: "board.5V", to: "relay.VCC", color: "red" },
    { from: "relay.GND", to: "board.GND2", color: "black" },
    { from: "board.GPIO26", to: "relay.IN", color: "orange", note: { en: "jumper on H: HIGH = contact closed", ru: "перемычка в H: HIGH = контакт замкнут", kk: "секіргіш H күйінде: HIGH = түйіспе тұйық" } },
  ],
  steps: [
    {
      title: { en: "Check how your opener is triggered", ru: "Узнайте, как запускается ваш привод", kk: "Жетегіңіз қалай іске қосылатынын біліңіз" },
      body: {
        en: "Find the two low-voltage terminals where the wall push button connects to the opener. Briefly bridge them with an insulated wire: if the door starts moving, a relay can trigger it. Openers with a \"smart\" wall panel (several buttons and a display) use a data bus instead, and shorting those terminals does nothing; for them, wire the relay across a spare remote's button instead.",
        ru: "Найдите на приводе две низковольтные клеммы, куда подключена настенная кнопка. Кратко замкните их изолированным проводом: если ворота поехали, реле сможет их запускать. Приводы с «умной» настенной панелью (несколько кнопок и дисплей) используют шину данных, и замыкание клемм ничего не даст; тогда подключите реле параллельно кнопке запасного пульта.",
        kk: "Жетектен қабырға батырмасы қосылған екі төмен кернеулі қысқышты табыңыз. Оларды оқшауланған сыммен қысқа уақытқа тұйықтаңыз: қақпа қозғалса, реле оны іске қоса алады. «Ақылды» қабырға панелі (бірнеше батырма мен дисплей) бар жетектер деректер шинасын пайдаланады, қысқыштарды тұйықтау ештеңе бермейді; ондайда релені қосалқы пульттің батырмасына параллель қосыңыз.",
      },
      expect: { en: "One short bridge = the door starts or stops, exactly like the wall button.", ru: "Одно короткое замыкание = ворота поехали или остановились, как от настенной кнопки.", kk: "Бір қысқа тұйықтау = қақпа қабырға батырмасындағыдай қозғалады немесе тоқтайды." },
      mistake: { en: "Never probe terminals marked 230 V / L / N; only the low-voltage push-button pair.", ru: "Не трогайте клеммы с пометкой 230 В / L / N, только низковольтную пару кнопки.", kk: "230 В / L / N белгісі бар қысқыштарға тимеңіз, тек батырманың төмен кернеулі жұбына." },
    },
    {
      title: { en: "Wire the reed switch", ru: "Подключите геркон", kk: "Герконды қосыңыз" },
      body: {
        en: "Connect one reed lead to GPIO27 and the other to GND. No resistor is needed: the sketch enables the internal pull-up, so GPIO27 reads HIGH when the contact is open and LOW when the magnet closes it. For the garage, use a two-core cable up to 10 m long.",
        ru: "Один вывод геркона подключите к GPIO27, другой к GND. Резистор не нужен: скетч включает внутреннюю подтяжку, поэтому GPIO27 читает HIGH при разомкнутом контакте и LOW, когда магнит его замыкает. В гараже используйте двухжильный кабель длиной до 10 м.",
        kk: "Герконның бір шығысын GPIO27-ге, екіншісін GND-ге қосыңыз. Резистор қажет емес: скетч ішкі тартуды қосады, сондықтан түйіспе ажыраған кезде GPIO27 HIGH, ал магнит оны тұйықтағанда LOW оқиды. Гаражда ұзындығы 10 м-ге дейінгі екі сымды кабельді пайдаланыңыз.",
      },
      expect: { en: "Holding the magnet next to the switch prints \"door CLOSED\" in the Serial Monitor.", ru: "Если поднести магнит к геркону, Serial Monitor печатает «door CLOSED».", kk: "Магнитті герконға жақындатсаңыз, Serial Monitor «door CLOSED» деп шығарады." },
      mistake: { en: "GPIO34–39 have no internal pull-up; a reed switch on them floats and reads random values.", ru: "У GPIO34–39 нет внутренней подтяжки: геркон на них «висит» и даёт случайные значения.", kk: "GPIO34–39-да ішкі тарту жоқ: оларға қосылған геркон «ілулі» қалып, кездейсоқ мән береді." },
    },
    {
      title: { en: "Wire the relay module", ru: "Подключите модуль реле", kk: "Реле модулін қосыңыз" },
      body: {
        en: "Relay VCC goes to 5V, GND to GND2 and IN to GPIO26. Put the trigger jumper on H so the 3.3 V GPIO switches it reliably. Then run two thin wires from the relay COM and NO screw terminals to the opener's push-button terminals, in parallel with the existing wall button. COM/NO stay off the diagram: they are an isolated contact, not part of the ESP32 circuit.",
        ru: "VCC реле подключите к 5V, GND к GND2, IN к GPIO26. Поставьте перемычку в H, чтобы 3,3-вольтовый GPIO надёжно управлял реле. Затем проведите два тонких провода от клемм COM и NO реле к клеммам кнопки привода, параллельно существующей настенной кнопке. COM/NO на схеме не показаны: это гальванически развязанный контакт, а не часть цепи ESP32.",
        kk: "Реленің VCC-ін 5V-қа, GND-ін GND2-ге, IN-ін GPIO26-ға қосыңыз. 3,3 вольттық GPIO релені сенімді басқаруы үшін секіргішті H күйіне қойыңыз. Содан кейін реленің COM және NO қысқыштарынан жетек батырмасының қысқыштарына, бар қабырға батырмасына параллель екі жіңішке сым тартыңыз. COM/NO сұлбада көрсетілмеген: бұл ESP32 тізбегінің бөлігі емес, оқшауланған түйіспе.",
      },
      expect: { en: "The relay stays silent at power-up and does not move the door.", ru: "При включении реле молчит и ворота не двигаются.", kk: "Қосқан кезде реле үнсіз, қақпа қозғалмайды." },
      mistake: { en: "Wiring to NC instead of NO holds the button \"pressed\" all the time; most openers then refuse to run.", ru: "Если подключить NC вместо NO, кнопка будет «нажата» постоянно, и большинство приводов перестанут работать.", kk: "NO орнына NC-ге қоссаңыз, батырма үнемі «басулы» болады да, көп жетектер жұмыс істемейді." },
    },
    {
      title: { en: "Set Wi-Fi, a password and upload", ru: "Задайте Wi-Fi, пароль и загрузите скетч", kk: "Wi-Fi мен құпиясөзді орнатып, скетчті жүктеңіз" },
      body: {
        en: "Fill in WIFI_SSID and WIFI_PASS, and change WEB_PASS to your own password: anyone on your network who opens the page must log in before they can move the door. Select \"ESP32 Dev Module\", upload and open the Serial Monitor at 115200 baud to read the IP address.",
        ru: "Заполните WIFI_SSID и WIFI_PASS и замените WEB_PASS на свой пароль: любой, кто откроет страницу в вашей сети, должен войти, прежде чем сможет двигать ворота. Выберите «ESP32 Dev Module», загрузите скетч и откройте Serial Monitor на 115200 бод, чтобы узнать IP-адрес.",
        kk: "WIFI_SSID пен WIFI_PASS-ты толтырып, WEB_PASS-ты өз құпиясөзіңізге ауыстырыңыз: желіңізде бетті ашқан кез келген адам қақпаны қозғамас бұрын кіруі керек. «ESP32 Dev Module» таңдап, скетчті жүктеңіз де, IP мекенжайын білу үшін Serial Monitor-ды 115200 бодта ашыңыз.",
      },
      expect: { en: "The browser asks for a user name and password, then shows CLOSED or OPEN.", ru: "Браузер спрашивает логин и пароль, затем показывает CLOSED или OPEN.", kk: "Браузер логин мен құпиясөз сұрайды, содан кейін CLOSED немесе OPEN көрсетеді." },
      mistake: { en: "Port-forwarding this page to the internet: the login is plain HTTP. Use it on your home network or through a VPN.", ru: "Не пробрасывайте эту страницу в интернет: вход идёт по обычному HTTP. Пользуйтесь ей в домашней сети или через VPN.", kk: "Бұл бетті интернетке шығармаңыз: кіру кәдімгі HTTP арқылы жүреді. Оны үй желісінде немесе VPN арқылы пайдаланыңыз." },
    },
    {
      title: { en: "Mount the sensor and test", ru: "Установите датчик и проверьте", kk: "Датчикті орнатып, тексеріңіз" },
      body: {
        en: "Screw the reed switch to the door frame and the magnet to the door so they are within 10 mm of each other when the door is fully closed. Press Open on the page: the relay clicks for 0.5 s and the door starts moving. For 15 s after a command the page shows \"moving\" and ignores new presses. Open only works when the door is closed, Close only when it is open.",
        ru: "Привинтите геркон к раме, а магнит к воротам так, чтобы в полностью закрытом положении между ними было не больше 10 мм. Нажмите Open на странице: реле щёлкнет на 0,5 с и ворота поедут. 15 с после команды страница показывает «moving» и игнорирует новые нажатия. Open работает только при закрытых воротах, Close только при открытых.",
        kk: "Герконды жақтауға, ал магнитті қақпаға толық жабық күйде арақашықтығы 10 мм-ден аспайтындай етіп бұрап бекітіңіз. Беттегі Open батырмасын басыңыз: реле 0,5 с шыртылдап, қақпа қозғалады. Командадан кейін 15 с бойы бет «moving» көрсетіп, жаңа басуларды елемейді. Open тек қақпа жабық болғанда, Close тек ашық болғанда жұмыс істейді.",
      },
      expect: { en: "The status flips to OPEN as soon as the door leaves the magnet and back to CLOSED at the end.", ru: "Статус меняется на OPEN, как только ворота отходят от магнита, и обратно на CLOSED в конце.", kk: "Қақпа магниттен алыстай салысымен күй OPEN болады, соңында қайтадан CLOSED болады." },
      mistake: { en: "Mounting the magnet at the open position inverts the logic; the sensor must close at the closed position.", ru: "Если поставить магнит в открытом положении, логика перевернётся: датчик должен замыкаться в закрытом положении.", kk: "Магнитті ашық күйге орнатсаңыз, логика керісінше болады: датчик жабық күйде тұйықталуы керек." },
    },
  ],
  code: [{
    filename: "garage_door_monitor.ino",
    language: "cpp",
    libraries: [],
    source: `#include <WiFi.h>
#include <WebServer.h>

// ---- your network and page login ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";
const char* WEB_USER = "garage";
const char* WEB_PASS = "CHANGE_ME";     // change before installing

const int REED_PIN = 27;     // reed switch to GND, magnet present = door closed = LOW
const int RELAY_PIN = 26;    // relay module IN, jumper on H
const int RELAY_ON = HIGH;
const int RELAY_OFF = LOW;
const unsigned long PULSE_MS = 500;       // how long the "button" is held
const unsigned long COOLDOWN_MS = 15000;  // door travel time, new commands ignored
const unsigned long STABLE_MS = 200;      // reed debounce

WebServer server(80);
bool doorClosed = false;
bool lastRaw = false;
unsigned long rawSince = 0;
unsigned long changedAt = 0;
unsigned long lastPulse = 0;
bool everPulsed = false;

const char PAGE[] PROGMEM = R"HTML(<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Garage</title>
<style>
body{font-family:system-ui,sans-serif;background:#0f1115;color:#eee;text-align:center;padding-top:40px}
#s{font-size:52px;font-weight:700;margin:16px}#t{color:#999;margin-bottom:28px}
button{font-size:20px;padding:14px 32px;margin:6px;border:0;border-radius:14px;background:#ff7a1a;color:#111}
button:disabled{background:#444;color:#888}
</style></head><body>
<h1>Garage door</h1><div id="s">...</div><div id="t"></div>
<button id="o" onclick="cmd('open')">Open</button><button id="c" onclick="cmd('close')">Close</button>
<script>
function show(j){
  document.getElementById('s').textContent=j.busy?'moving':(j.closed?'CLOSED':'OPEN');
  document.getElementById('t').textContent='for '+Math.floor(j.since/60)+' min';
  document.getElementById('o').disabled=j.busy||!j.closed;
  document.getElementById('c').disabled=j.busy||j.closed;
}
function poll(){fetch('/status').then(r=>r.json()).then(show).catch(()=>{});}
function cmd(w){
  if(!confirm(w==='open'?'Open the garage door?':'Close the garage door?'))return;
  fetch('/'+w,{method:'POST'}).then(r=>r.text()).then(t=>{if(t!=='ok')alert(t);poll();});
}
poll();setInterval(poll,2000);
</script></body></html>)HTML";

bool authed() {
  if (!server.authenticate(WEB_USER, WEB_PASS)) {
    server.requestAuthentication();
    return false;
  }
  return true;
}

bool busy() { return everPulsed && millis() - lastPulse < COOLDOWN_MS; }

void pulseRelay(const char* why) {
  digitalWrite(RELAY_PIN, RELAY_ON);
  delay(PULSE_MS);
  digitalWrite(RELAY_PIN, RELAY_OFF);
  lastPulse = millis();
  everPulsed = true;
  Serial.printf("relay pulse (%s)\\n", why);
}

void handleStatus() {
  if (!authed()) return;
  char buf[80];
  snprintf(buf, sizeof buf, "{\\"closed\\":%s,\\"since\\":%lu,\\"busy\\":%s}",
           doorClosed ? "true" : "false", (millis() - changedAt) / 1000, busy() ? "true" : "false");
  server.send(200, "application/json", buf);
}

void handleCommand(bool wantOpen) {
  if (!authed()) return;
  if (busy()) { server.send(429, "text/plain", "door is moving, wait"); return; }
  // the opener has one button: only press it when it moves the door the way we want
  if (wantOpen != doorClosed) { server.send(409, "text/plain", wantOpen ? "already open" : "already closed"); return; }
  pulseRelay(wantOpen ? "open" : "close");
  server.send(200, "text/plain", "ok");
}

void setup() {
  Serial.begin(115200);
  digitalWrite(RELAY_PIN, RELAY_OFF);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(REED_PIN, INPUT_PULLUP);
  doorClosed = lastRaw = digitalRead(REED_PIN) == LOW;
  Serial.printf("door is %s\\n", doorClosed ? "CLOSED" : "OPEN");

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.printf("\\nopen http://%s/ (user: %s)\\n", WiFi.localIP().toString().c_str(), WEB_USER);

  server.on("/", HTTP_GET, []() { if (authed()) server.send_P(200, "text/html", PAGE); });
  server.on("/status", HTTP_GET, handleStatus);
  server.on("/open", HTTP_POST, []() { handleCommand(true); });
  server.on("/close", HTTP_POST, []() { handleCommand(false); });
  server.onNotFound([]() { server.send(404, "text/plain", "not found"); });
  server.begin();
}

void loop() {
  server.handleClient();

  bool raw = digitalRead(REED_PIN) == LOW;
  if (raw != lastRaw) { lastRaw = raw; rawSince = millis(); }
  if (raw != doorClosed && millis() - rawSince > STABLE_MS) {
    doorClosed = raw;
    changedAt = millis();
    Serial.printf("door %s\\n", doorClosed ? "CLOSED" : "OPEN");
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The page always shows OPEN", ru: "Страница всегда показывает OPEN", kk: "Бет әрдайым OPEN көрсетеді" },
      cause: { en: "The magnet is too far from the reed switch, or the switch is mounted at 90° to the magnet.", ru: "Магнит слишком далеко от геркона или датчик стоит под 90° к магниту.", kk: "Магнит герконнан тым алыс немесе датчик магнитке 90° бұрышпен орнатылған." },
      fix: { en: "Align them side by side with less than 10 mm gap when closed. Test with a multimeter in continuity mode.", ru: "Поставьте их рядом параллельно с зазором меньше 10 мм в закрытом положении. Проверьте мультиметром в режиме прозвонки.", kk: "Оларды жабық күйде арасы 10 мм-ден аз болатындай қатар параллель қойыңыз. Мультиметрдің шырылдату режимімен тексеріңіз." },
    },
    {
      symptom: { en: "The relay clicks but the door does not move", ru: "Реле щёлкает, но ворота не двигаются", kk: "Реле шыртылдайды, бірақ қақпа қозғалмайды" },
      cause: { en: "The wires go to the wrong opener terminals, or the opener uses a digital wall panel.", ru: "Провода подключены не к тем клеммам или привод использует цифровую настенную панель.", kk: "Сымдар жетектің басқа қысқыштарына қосылған немесе жетек цифрлық қабырға панелін пайдаланады." },
      fix: { en: "Repeat the bridge test from step 1. For digital panels, wire COM/NO across the button of a spare remote control.", ru: "Повторите проверку замыканием из шага 1. Для цифровых панелей подключите COM/NO параллельно кнопке запасного пульта.", kk: "1-қадамдағы тұйықтау сынағын қайталаңыз. Цифрлық панель болса, COM/NO-ны қосалқы пульт батырмасына параллель қосыңыз." },
    },
    {
      symptom: { en: "The status flickers between OPEN and CLOSED", ru: "Статус прыгает между OPEN и CLOSED", kk: "Күй OPEN мен CLOSED арасында ауысып тұрады" },
      cause: { en: "A long sensor cable picks up noise from the opener motor.", ru: "Длинный кабель датчика ловит помехи от мотора привода.", kk: "Датчиктің ұзын кабелі жетек моторының кедергісін қабылдайды." },
      fix: { en: "Use twisted pair, keep it away from motor wires, and raise STABLE_MS to 500.", ru: "Используйте витую пару, уведите кабель от проводов мотора и увеличьте STABLE_MS до 500.", kk: "Есілген жұп сымды пайдаланып, кабельді мотор сымдарынан алыстатыңыз және STABLE_MS мәнін 500-ге дейін арттырыңыз." },
    },
    {
      symptom: { en: "The browser keeps asking for the password", ru: "Браузер постоянно спрашивает пароль", kk: "Браузер құпиясөзді қайта-қайта сұрайды" },
      cause: { en: "WEB_USER / WEB_PASS in the sketch differ from what you type.", ru: "WEB_USER / WEB_PASS в скетче не совпадают с тем, что вы вводите.", kk: "Скетчтегі WEB_USER / WEB_PASS сіз енгізгенмен сәйкес келмейді." },
      fix: { en: "Check spelling and case, re-upload, and close all tabs of the page before logging in again.", ru: "Проверьте написание и регистр, перезагрузите скетч и закройте все вкладки страницы перед повторным входом.", kk: "Жазылуы мен регистрін тексеріп, скетчті қайта жүктеңіз де, қайта кірер алдында беттің барлық қойындыларын жабыңыз." },
    },
  ],
  safety: [
    { en: "Only operate the door when you can see it, and keep the opener's own safety beam and auto-reverse working.", ru: "Управляйте воротами, только когда видите их, и не отключайте фотоэлементы и автореверс привода.", kk: "Қақпаны тек көріп тұрғанда басқарыңыз және жетектің фотоэлементтері мен автореверсін өшірмеңіз." },
    { en: "Connect the relay only to the low-voltage push-button terminals, never to the opener's mains wiring.", ru: "Подключайте реле только к низковольтным клеммам кнопки, никогда к сетевой проводке привода.", kk: "Релені тек батырманың төмен кернеулі қысқыштарына қосыңыз, жетектің желілік сымдарына ешқашан қоспаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "door is CLOSED",
      "Connecting.....",
      "open http://192.168.1.57/ (user: garage)",
      "relay pulse (open)",
      "door OPEN",
      "relay pulse (close)",
      "door CLOSED",
    ],
    leds: [{ label: "RELAY", color: "#FF7A1A" }],
  },
} satisfies GuideContent;
