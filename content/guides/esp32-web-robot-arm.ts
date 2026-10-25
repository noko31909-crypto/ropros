import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-web-robot-arm",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "robotics",
  robotics: true,
  difficulty: "intermediate",
  hours: 5,
  costUsd: 38,
  xpReward: 250,
  title: {
    en: "ESP32 Web-Controlled Robot Arm",
    ru: "Робот-рука на ESP32 с управлением из браузера",
    kk: "Браузерден басқарылатын ESP32 робот-қолы",
  },
  summary: {
    en: "Four SG90 servos on a desktop arm, moved smoothly from sliders on any phone or laptop in your Wi-Fi. The servos get their own 5 V buck supply with a shared ground, so the ESP32 never browns out.",
    ru: "Четыре сервопривода SG90 на настольной руке плавно двигаются ползунками с любого телефона или ноутбука в вашей Wi-Fi сети. Сервы питаются от отдельного понижающего преобразователя 5 В с общей землёй, поэтому ESP32 не сбрасывается.",
    kk: "Үстел үстіндегі қолдағы төрт SG90 серво жетегі Wi-Fi желіңіздегі кез келген телефон не ноутбуктегі жүгірткілермен бір қалыпты қозғалады. Сервоның өз 5 В түрлендіргіші бар, жер ортақ, сондықтан ESP32 қайта жүктелмейді.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32-WROOM-32 DevKit, powered over USB", ru: "ESP32-WROOM-32 DevKit, питание по USB", kk: "ESP32-WROOM-32 DevKit, USB арқылы қуат" }, role: { en: "Web server and servo PWM", ru: "Веб-сервер и ШИМ для серв", kk: "Веб-сервер және серво PWM" } },
    { component: "servo-sg90", qty: 4, spec: { en: "SG90 9 g, 180°, fitted to a 4-DOF acrylic arm kit", ru: "SG90 9 г, 180°, в акриловом наборе руки на 4 оси", kk: "SG90 9 г, 180°, 4 осьті акрил қол жиынтығында" }, role: { en: "Base, shoulder, elbow, gripper", ru: "Основание, плечо, локоть, захват", kk: "Табан, иық, шынтақ, қармауыш" } },
    { component: "buck-converter-lm2596", qty: 1, spec: { en: "LM2596 module set to 5.0 V, 2 A", ru: "модуль LM2596 на 5,0 В, 2 А", kk: "5,0 В, 2 А-ға бапталған LM2596 модулі" }, role: { en: "Separate servo supply", ru: "Отдельное питание серв", kk: "Сервоға бөлек қуат" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V 2S pack (any 7–12 V DC adapter also works)", ru: "батарея 2S 7,4 В (подойдёт и любой адаптер 7–12 В)", kk: "7,4 В 2S батарея (кез келген 7–12 В адаптер де болады)" }, role: { en: "Input for the buck", ru: "Вход преобразователя", kk: "Түрлендіргіш кірісі" } },
    { component: "capacitor", qty: 1, spec: { en: "1000 µF 16 V electrolytic", ru: "электролит 1000 мкФ 16 В", kk: "1000 мкФ 16 В электролит" }, role: { en: "Absorbs servo current spikes on the 5 V rail", ru: "Гасит броски тока серв на шине 5 В", kk: "5 В шинасындағы серво ток секірістерін басады" } },
    { component: "breadboard", qty: 1, spec: { en: "half size, used as the servo power rail", ru: "половинка, как шина питания серв", kk: "жартылай, серво қуат шинасы ретінде" }, role: { en: "Power distribution", ru: "Разводка питания", kk: "Қуат тарату" } },
    { component: "jumper-wires", qty: 16, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { component: "usb-5v", qty: 1, spec: { en: "USB charger or the PC port", ru: "USB-зарядка или порт ПК", kk: "USB зарядтағыш не ДК порты" }, role: { en: "Powers the ESP32 through its micro-USB", ru: "Питает ESP32 через micro-USB", kk: "ESP32-ні micro-USB арқылы қоректендіреді" }, optional: true },
  ],
  instances: [
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "buck", component: "buck-converter-lm2596", label: "Buck 5.0 V" },
    { id: "cap", component: "capacitor", label: "1000 µF" },
    { id: "s_base", component: "servo-sg90", label: "Base" },
    { id: "s_shoulder", component: "servo-sg90", label: "Shoulder" },
    { id: "s_elbow", component: "servo-sg90", label: "Elbow" },
    { id: "s_grip", component: "servo-sg90", label: "Gripper" },
  ],
  connections: [
    { from: "bat.+", to: "buck.IN+", color: "red" },
    { from: "bat.-", to: "buck.IN-", color: "black" },
    { from: "cap.A", to: "buck.OUT+", color: "red", note: { en: "+ leg (long, unmarked side) to 5 V", ru: "плюсовая ножка (длинная, без полосы) на 5 В", kk: "оң аяғы (ұзын, жолақсыз жағы) 5 В-қа" } },
    { from: "cap.B", to: "buck.OUT-", color: "black" },
    { from: "buck.OUT+", to: "s_base.VCC", color: "red" },
    { from: "buck.OUT+", to: "s_shoulder.VCC", color: "red" },
    { from: "buck.OUT+", to: "s_elbow.VCC", color: "red" },
    { from: "buck.OUT+", to: "s_grip.VCC", color: "red" },
    { from: "buck.OUT-", to: "s_base.GND", color: "brown" },
    { from: "buck.OUT-", to: "s_shoulder.GND", color: "brown" },
    { from: "buck.OUT-", to: "s_elbow.GND", color: "brown" },
    { from: "buck.OUT-", to: "s_grip.GND", color: "brown" },
    { from: "buck.OUT-", to: "board.GND", color: "black", note: { en: "shared ground: without it the servos ignore the signal", ru: "общая земля: без неё сервы не видят сигнал", kk: "ортақ жер: онсыз сервол сигналды көрмейді" } },
    { from: "board.GPIO13", to: "s_base.SIG", color: "orange" },
    { from: "board.GPIO14", to: "s_shoulder.SIG", color: "orange" },
    { from: "board.GPIO27", to: "s_elbow.SIG", color: "orange" },
    { from: "board.GPIO26", to: "s_grip.SIG", color: "orange" },
  ],
  steps: [
    {
      title: { en: "Set the servo supply to 5.0 V", ru: "Выставьте питание серв на 5,0 В", kk: "Серво қуатын 5,0 В-қа баптаңыз" },
      body: {
        en: "Connect the battery (or a 7–12 V adapter) to buck IN+ / IN-. With a multimeter on OUT+ and OUT-, turn the trimmer screw until it reads 5.0 V. SG90s accept 4.8–6 V; above that they overheat. Run OUT+ and OUT- to the two power rails of the breadboard and plug the 1000 µF capacitor across them, stripe (−) to the OUT- rail.",
        ru: "Подключите батарею (или адаптер 7–12 В) к IN+ / IN- преобразователя. Мультиметром на OUT+ и OUT- крутите подстроечный винт, пока не будет 5,0 В. SG90 допускают 4,8–6 В, выше они перегреваются. Выведите OUT+ и OUT- на две шины питания макетки и вставьте между ними конденсатор 1000 мкФ полосой (−) к шине OUT-.",
        kk: "Батареяны (немесе 7–12 В адаптерді) түрлендіргіштің IN+ / IN- пиндеріне қосыңыз. OUT+ пен OUT- пиндеріне мультиметр қойып, 5,0 В болғанша баптау бұрандасын бұраңыз. SG90 4,8–6 В-ты көтереді, одан жоғары қызып кетеді. OUT+ пен OUT- пиндерін макет тақтасының екі қуат шинасына шығарып, олардың арасына 1000 мкФ конденсаторды жолағы (−) OUT- шинасына қаратып қойыңыз.",
      },
      expect: { en: "5.0 V between the rails, capacitor in place.", ru: "Между шинами 5,0 В, конденсатор стоит.", kk: "Шиналар арасында 5,0 В, конденсатор орнында." },
      mistake: { en: "Reversing the electrolytic capacitor: it heats up and can burst. The stripe is the minus side.", ru: "Перевернуть электролитический конденсатор: он греется и может вздуться. Полоса — это минус.", kk: "Электролит конденсаторды кері қою: ол қызып, жарылуы мүмкін. Жолақ — минус жағы." },
    },
    {
      title: { en: "Wire the servos and the shared ground", ru: "Подключите сервы и общую землю", kk: "Серволарды және ортақ жерді қосыңыз" },
      body: {
        en: "Plug each servo's red wire into the 5 V rail and brown wire into the GND rail. Signal (orange) wires: base → GPIO13, shoulder → GPIO14, elbow → GPIO27, gripper → GPIO26. Finally run one wire from the GND rail to an ESP32 GND pin. Do not connect the 5 V rail to the ESP32: the board runs from its own USB cable.",
        ru: "Красный провод каждой сервы — в шину 5 В, коричневый — в шину GND. Сигнальные (оранжевые): основание → GPIO13, плечо → GPIO14, локоть → GPIO27, захват → GPIO26. В конце соедините шину GND с пином GND ESP32 одним проводом. Шину 5 В к ESP32 не подключайте: плата питается от своего USB-кабеля.",
        kk: "Әр сервоның қызыл сымын 5 В шинасына, қоңыр сымын GND шинасына қосыңыз. Сигнал (сарғылт) сымдары: табан → GPIO13, иық → GPIO14, шынтақ → GPIO27, қармауыш → GPIO26. Соңында GND шинасын бір сыммен ESP32-нің GND пиніне қосыңыз. 5 В шинасын ESP32-ге қоспаңыз: тақта өз USB кабелінен қоректенеді.",
      },
      expect: { en: "Four 3-wire servo plugs on the rails, four orange wires to the ESP32 and one ground link.", ru: "Четыре 3-проводных разъёма серв на шинах, четыре оранжевых провода к ESP32 и одна перемычка земли.", kk: "Шиналарда төрт 3 сымды серво ұшы, ESP32-ге төрт сарғылт сым және бір жер сымы." },
      mistake: { en: "Forgetting the ground link between the rail and the ESP32: the servos jitter or do nothing.", ru: "Забыть перемычку земли между шиной и ESP32: сервы дрожат или не двигаются.", kk: "Шина мен ESP32 арасындағы жер сымын ұмыту: серволар дірілдейді немесе қозғалмайды." },
    },
    {
      title: { en: "Upload and center the servos", ru: "Загрузите скетч и отцентруйте сервы", kk: "Скетчті жүктеп, серволарды ортаға келтіріңіз" },
      body: {
        en: "Install the \"ESP32Servo\" library and the esp32 core 3.x, select \"ESP32 Dev Module\" and put your 2.4 GHz network into WIFI_SSID / WIFI_PASS. Upload, open the Serial Monitor at 115200 baud and switch the servo supply on. Every servo moves to the home pose (90°, gripper 60°). Only now fit the horns and assemble the arm, so each joint sits mid-travel at home.",
        ru: "Установите библиотеку «ESP32Servo» и ядро esp32 3.x, выберите «ESP32 Dev Module» и впишите свою сеть 2,4 ГГц в WIFI_SSID / WIFI_PASS. Загрузите скетч, откройте Serial Monitor на 115200 бод и включите питание серв. Все сервы встанут в исходную позу (90°, захват 60°). Только теперь надевайте качалки и собирайте руку, чтобы в исходной позе каждый сустав был в середине хода.",
        kk: "«ESP32Servo» кітапханасы мен esp32 3.x ядросын орнатып, «ESP32 Dev Module» таңдаңыз да, WIFI_SSID / WIFI_PASS ішіне 2,4 ГГц желіңізді жазыңыз. Скетчті жүктеп, Serial Monitor-ды 115200 бодта ашыңыз және серво қуатын қосыңыз. Барлық серво бастапқы қалыпқа келеді (90°, қармауыш 60°). Енді ғана иінтіректерді кигізіп, қолды құрастырыңыз, сонда бастапқы қалыпта әр буын жүрісінің ортасында тұрады.",
      },
      expect: { en: "\"arm ready: http://192.168.x.x\" and four servos holding still at center.", ru: "«arm ready: http://192.168.x.x», четыре сервы неподвижно держат центр.", kk: "«arm ready: http://192.168.x.x», төрт серво ортада қозғалмай тұр." },
      mistake: { en: "Assembling the arm first: a horn fitted at a random angle can drive a joint into the frame and stall the servo.", ru: "Сначала собрать руку: качалка, надетая под случайным углом, упрёт сустав в раму, и серва встанет под нагрузкой.", kk: "Алдымен қолды құрастыру: кездейсоқ бұрышта кигізілген иінтірек буынды рамаға тіреп, серво жүктемемен тоқтап қалады." },
    },
    {
      title: { en: "Move the arm from the browser", ru: "Двигайте рукой из браузера", kk: "Қолды браузерден қозғаңыз" },
      body: {
        en: "Open the address from the monitor on a phone or laptop in the same network. Each slider sets a target angle; the ESP32 moves the joint there at about 100° per second, so nothing jerks. HOME returns to the start pose. Watch the Serial Monitor: each move prints the joint and angle.",
        ru: "Откройте адрес из монитора на телефоне или ноутбуке в той же сети. Каждый ползунок задаёт целевой угол, а ESP32 ведёт туда сустав со скоростью около 100° в секунду, поэтому ничего не дёргается. HOME возвращает руку в исходную позу. В Serial Monitor каждое движение печатает сустав и угол.",
        kk: "Монитордағы мекенжайды сол желідегі телефон не ноутбукте ашыңыз. Әр жүгірткі мақсатты бұрышты береді, ал ESP32 буынды сонда секундына шамамен 100° жылдамдықпен апарады, сондықтан ештеңе жұлқынбайды. HOME қолды бастапқы қалыпқа қайтарады. Serial Monitor-да әр қозғалыс буын мен бұрышты шығарады.",
      },
      expect: { en: "Smooth motion on every joint, e.g. \"elbow -> 120\".", ru: "Плавное движение всех суставов, например «elbow -> 120».", kk: "Барлық буын бір қалыпты қозғалады, мысалы «elbow -> 120»." },
      mistake: { en: "Moving fast with a heavy load: SG90 gears are plastic; lift only light objects.", ru: "Быстро двигать с тяжёлым грузом: шестерни SG90 пластиковые, поднимайте только лёгкие предметы.", kk: "Ауыр жүкпен жылдам қозғау: SG90 тісті доңғалақтары пластик, тек жеңіл заттарды көтеріңіз." },
    },
    {
      title: { en: "Set safe limits for your build", ru: "Задайте безопасные пределы", kk: "Қауіпсіз шектерді орнатыңыз" },
      body: {
        en: "Slowly move each slider to its ends and note where the joint touches the frame or where the gripper closes fully. Write those numbers into MIN_ANGLE and MAX_ANGLE in the sketch and upload again. A servo pushing against a stop draws up to 650 mA and gets hot within a minute.",
        ru: "Медленно доведите каждый ползунок до краёв и запишите, где сустав упирается в раму или где захват полностью сжимается. Впишите эти числа в MIN_ANGLE и MAX_ANGLE и загрузите скетч снова. Серва, упёртая в упор, берёт до 650 мА и за минуту становится горячей.",
        kk: "Әр жүгірткіні баяу шеттеріне дейін жылжытып, буын рамаға тірелетін не қармауыш толық жабылатын жерді жазып алыңыз. Бұл сандарды скетчтегі MIN_ANGLE мен MAX_ANGLE-ге жазып, қайта жүктеңіз. Тірекке тірелген серво 650 мА-ға дейін тартып, бір минутта қызып кетеді.",
      },
      expect: { en: "No joint can hit its frame, and the gripper stops just as it closes.", ru: "Ни один сустав не упирается в раму, захват останавливается ровно при смыкании.", kk: "Бірде-бір буын рамаға тірелмейді, қармауыш дәл жабылғанда тоқтайды." },
      mistake: { en: "Leaving the gripper limit at 0°: it keeps squeezing and buzzing on every object.", ru: "Оставить предел захвата 0°: он будет сжимать и жужжать на каждом предмете.", kk: "Қармауыш шегін 0° күйінде қалдыру: ол әр заттағы қысып, ызыңдай береді." },
    },
  ],
  code: [{
    filename: "web_robot_arm.ino",
    language: "cpp",
    libraries: ["ESP32Servo"],
    source: `#include <WiFi.h>
#include <WebServer.h>
#include <ESP32Servo.h>

// ---- your Wi-Fi (2.4 GHz) ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_PASSWORD";

// base, shoulder, elbow, gripper
const int SERVO_PINS[4] = {13, 14, 27, 26};
const char* JOINT_NAMES[4] = {"base", "shoulder", "elbow", "gripper"};
const int MIN_ANGLE[4] = {0, 15, 0, 20};      // adjust to your arm
const int MAX_ANGLE[4] = {180, 165, 180, 110};
const int HOME_ANGLE[4] = {90, 90, 90, 60};
const unsigned long STEP_MS = 10;              // 1 degree per 10 ms = 100 deg/s

Servo servos[4];
int current[4], target[4];
unsigned long lastStep = 0;
WebServer server(80);

const char PAGE[] PROGMEM = R"html(<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>ropros arm</title>
<style>body{margin:0;padding:16px;background:#0b0f14;color:#e6edf3;font-family:system-ui,sans-serif}
label{display:block;margin:18px 0}input{width:100%;accent-color:#ff7a1a}
button{font-size:18px;padding:12px 22px;border:0;border-radius:12px;background:#ff7a1a}</style></head><body>
<h2>ropros arm</h2><div id="s"></div><button id="home">HOME</button>
<script>
const names=['base','shoulder','elbow','gripper'],box=document.getElementById('s');let timer=null;
names.forEach((n,i)=>{const l=document.createElement('label');l.innerHTML=n+' <b id="v'+i+'">90</b>&deg;'+
'<input type="range" id="r'+i+'" min="0" max="180" value="90">';box.appendChild(l)});
function send(i){const v=document.getElementById('r'+i).value;document.getElementById('v'+i).textContent=v;
clearTimeout(timer);timer=setTimeout(()=>fetch('/set?j='+i+'&a='+v),40)}
names.forEach((n,i)=>document.getElementById('r'+i).oninput=()=>send(i));
async function load(){const j=await (await fetch('/state')).json();
j.t.forEach((a,i)=>{const r=document.getElementById('r'+i);r.min=j.min[i];r.max=j.max[i];r.value=a;
document.getElementById('v'+i).textContent=a})}
document.getElementById('home').onclick=()=>fetch('/home').then(load);load();
</script></body></html>)html";

void setTarget(int j, int angle) {
  target[j] = constrain(angle, MIN_ANGLE[j], MAX_ANGLE[j]);
  Serial.printf("%s -> %d\\n", JOINT_NAMES[j], target[j]);
}

void handleRoot() { server.send_P(200, "text/html", PAGE); }

void handleSet() {
  int j = server.arg("j").toInt();
  if (j < 0 || j > 3 || !server.hasArg("a")) {
    server.send(400, "text/plain", "bad request");
    return;
  }
  setTarget(j, server.arg("a").toInt());
  server.send(200, "text/plain", "ok");
}

void handleHome() {
  for (int j = 0; j < 4; j++) target[j] = HOME_ANGLE[j];
  Serial.println("home");
  server.send(200, "text/plain", "ok");
}

void handleState() {
  char buf[160];
  snprintf(buf, sizeof buf, "{\\"t\\":[%d,%d,%d,%d],\\"min\\":[%d,%d,%d,%d],\\"max\\":[%d,%d,%d,%d]}",
           target[0], target[1], target[2], target[3],
           MIN_ANGLE[0], MIN_ANGLE[1], MIN_ANGLE[2], MIN_ANGLE[3],
           MAX_ANGLE[0], MAX_ANGLE[1], MAX_ANGLE[2], MAX_ANGLE[3]);
  server.send(200, "application/json", buf);
}

void setup() {
  Serial.begin(115200);
  for (int j = 0; j < 4; j++) {
    servos[j].setPeriodHertz(50);
    servos[j].attach(SERVO_PINS[j], 500, 2400);   // SG90 pulse range in microseconds
    current[j] = target[j] = HOME_ANGLE[j];
    servos[j].write(current[j]);
  }

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  server.on("/", handleRoot);
  server.on("/set", handleSet);
  server.on("/home", handleHome);
  server.on("/state", handleState);
  server.begin();
  Serial.printf("arm ready: http://%s\\n", WiFi.localIP().toString().c_str());
}

void loop() {
  server.handleClient();
  if (millis() - lastStep < STEP_MS) return;
  lastStep = millis();
  for (int j = 0; j < 4; j++) {               // walk each joint one degree towards its target
    if (current[j] == target[j]) continue;
    current[j] += current[j] < target[j] ? 1 : -1;
    servos[j].write(current[j]);
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Servos twitch randomly or the ESP32 resets", ru: "Сервы дёргаются сами по себе или ESP32 перезагружается", kk: "Серволар өздігінен жұлқынады немесе ESP32 қайта жүктеледі" },
      cause: { en: "The servos are powered from the ESP32, or the ground link between the servo rail and the ESP32 is missing.", ru: "Сервы питаются от ESP32, или нет перемычки земли между шиной серв и ESP32.", kk: "Серволар ESP32-ден қоректенеді немесе серво шинасы мен ESP32 арасында жер сымы жоқ." },
      fix: { en: "Servo red wires go only to the buck rail; connect buck OUT- to ESP32 GND; keep the 1000 µF capacitor on the rail.", ru: "Красные провода серв — только на шину преобразователя; OUT- соедините с GND ESP32; конденсатор 1000 мкФ оставьте на шине.", kk: "Серволардың қызыл сымдары тек түрлендіргіш шинасына; OUT- пинін ESP32 GND-ге қосыңыз; 1000 мкФ конденсатор шинада қалсын." },
    },
    {
      symptom: { en: "One servo buzzes and gets hot while standing still", ru: "Одна серва жужжит и греется, стоя на месте", kk: "Бір серво бір орында тұрып ызыңдап, қызады" },
      cause: { en: "Its joint is pressing against the frame or an object at the commanded angle.", ru: "При заданном угле её сустав упирается в раму или предмет.", kk: "Берілген бұрышта оның буыны рамаға не затқа тіреліп тұр." },
      fix: { en: "Move it a few degrees back and narrow that joint's MIN_ANGLE / MAX_ANGLE.", ru: "Отведите её на несколько градусов назад и сузьте MIN_ANGLE / MAX_ANGLE этого сустава.", kk: "Оны бірнеше градус кері жылжытып, сол буынның MIN_ANGLE / MAX_ANGLE шектерін тарылтыңыз." },
    },
    {
      symptom: { en: "Monitor prints dots forever", ru: "Монитор бесконечно печатает точки", kk: "Монитор шексіз нүкте басады" },
      cause: { en: "Wrong Wi-Fi name or password, or a 5 GHz-only network.", ru: "Неверное имя или пароль Wi-Fi, или сеть только 5 ГГц.", kk: "Wi-Fi атауы не құпия сөзі қате немесе желі тек 5 ГГц." },
      fix: { en: "Check WIFI_SSID / WIFI_PASS (case sensitive) and enable 2.4 GHz on the router.", ru: "Проверьте WIFI_SSID / WIFI_PASS (с учётом регистра) и включите 2,4 ГГц на роутере.", kk: "WIFI_SSID / WIFI_PASS-ты (бас-кіші әріпті ескеріп) тексеріп, роутерде 2,4 ГГц қосыңыз." },
    },
  ],
  safety: [
    { en: "Never power more than one SG90 from the ESP32 5V or 3V3 pin; use the separate 5 V buck and share only GND.", ru: "Никогда не питайте больше одной SG90 от пинов 5V или 3V3 ESP32; используйте отдельный преобразователь 5 В и общую землю.", kk: "ESP32-нің 5V не 3V3 пинінен бір SG90-нан артық қоректендірмеңіз; бөлек 5 В түрлендіргіш пен ортақ жерді қолданыңыз." },
    { en: "Keep fingers out of the gripper while testing: even a small servo pinches.", ru: "Не суйте пальцы в захват во время тестов: даже маленькая серва ощутимо щиплет.", kk: "Сынақ кезінде саусақты қармауышқа салмаңыз: кішкентай серво да қатты қысады." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Connecting.....",
      "arm ready: http://192.168.1.64",
      "base -> 120",
      "shoulder -> 70",
      "elbow -> 135",
      "gripper -> 25",
      "gripper -> 90",
      "home",
    ],
    leds: [],
  },
} satisfies GuideContent;
