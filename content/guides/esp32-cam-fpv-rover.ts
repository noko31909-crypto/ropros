import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-cam-fpv-rover",
  status: "unverified",
  platform: "esp32",
  board: "esp32-cam",
  category: "robotics",
  robotics: true,
  difficulty: "advanced",
  hours: 8,
  costUsd: 36,
  xpReward: 380,
  title: {
    en: "ESP32-CAM FPV Rover",
    ru: "FPV-ровер на ESP32-CAM",
    kk: "ESP32-CAM негізіндегі FPV ровер",
  },
  summary: {
    en: "Live video and joystick driving from a single browser page: the ESP32-CAM streams MJPEG from its OV2640 while a DRV8833 drives two motors, all over the rover's own Wi-Fi.",
    ru: "Живое видео и управление джойстиком на одной странице браузера: ESP32-CAM транслирует MJPEG с OV2640, а DRV8833 крутит два мотора, всё через собственный Wi-Fi ровера.",
    kk: "Бір браузер бетінде тікелей видео және джойстикпен басқару: ESP32-CAM OV2640-тан MJPEG таратады, ал DRV8833 екі моторды айналдырады, бәрі ровердің өз Wi-Fi желісі арқылы.",
  },
  parts: [
    { component: "esp32-cam", qty: 1, spec: { en: "AI-Thinker ESP32-CAM with OV2640 and 4 MB PSRAM, plus an ESP32-CAM-MB USB programmer", ru: "AI-Thinker ESP32-CAM с OV2640 и PSRAM 4 МБ, плюс USB-программатор ESP32-CAM-MB", kk: "OV2640 және 4 МБ PSRAM бар AI-Thinker ESP32-CAM, қоса ESP32-CAM-MB USB бағдарламалағышы" }, role: { en: "Camera, Wi-Fi hotspot, video and control server", ru: "Камера, точка доступа, сервер видео и управления", kk: "Камера, Wi-Fi нүктесі, видео және басқару сервері" } },
    { component: "drv8833", qty: 1, spec: { en: "dual H-bridge module, 2.7–10.8 V, 1.5 A per channel", ru: "модуль двух H-мостов, 2,7–10,8 В, 1,5 А на канал", kk: "екі H-көпірлі модуль, 2,7–10,8 В, арнаға 1,5 А" }, role: { en: "Motor driver with 3.3 V inputs", ru: "Драйвер моторов с входами 3,3 В", kk: "3,3 В кірісті мотор драйвері" } },
    { component: "dc-motor", qty: 2, spec: { en: "TT gear motor 1:48, 3–6 V", ru: "мотор-редуктор TT 1:48, 3–6 В", kk: "TT редукторлы мотор 1:48, 3–6 В" }, role: { en: "Left and right wheels", ru: "Левое и правое колёса", kk: "Сол және оң дөңгелектер" } },
    { component: "robot-chassis-2wd", qty: 1, spec: { en: "2WD deck with caster", ru: "платформа 2WD с опорным колесом", kk: "тірек дөңгелегі бар 2WD платформа" }, role: { en: "Frame", ru: "Рама", kk: "Рама" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V 2S, 1500–2200 mAh", ru: "7,4 В 2S, 1500–2200 мА·ч", kk: "7,4 В 2S, 1500–2200 мА·сағ" }, role: { en: "Main power", ru: "Основное питание", kk: "Негізгі қуат" } },
    { component: "buck-converter-lm2596", qty: 1, spec: { en: "set to 5.0 V", ru: "выставлен на 5,0 В", kk: "5,0 В-қа бапталған" }, role: { en: "Stable 5 V: the ESP32-CAM browns out on weak supplies", ru: "Стабильные 5 В: ESP32-CAM сбрасывается от слабого питания", kk: "Тұрақты 5 В: ESP32-CAM әлсіз қуаттан қайта жүктеледі" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT toggle (MTS-102) or slide switch rated 3 A+", ru: "SPDT тумблер (MTS-102) или движковый на ток от 3 А", kk: "SPDT тумблер (MTS-102) не 3 А-дан жоғары токқа арналған жылжымалы ажыратқыш" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі ажыратқыш" } },
    { component: "jumper-wires", qty: 16, spec: { en: "female-female and male-female", ru: "мама-мама и папа-мама", kk: "аналық-аналық және аталық-аналық" }, role: { en: "Wiring", ru: "Проводка", kk: "Сымдар" } },
  ],
  instances: [
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
    { id: "buck", component: "buck-converter-lm2596", label: "Buck 5.0 V" },
    { id: "drv", component: "drv8833", label: "DRV8833" },
    { id: "m_left", component: "dc-motor", label: "Left motor" },
    { id: "m_right", component: "dc-motor", label: "Right motor" },
  ],
  connections: [
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "buck.IN+", color: "red" },
    { from: "sw.1", to: "drv.VCC", color: "red", note: { en: "DRV8833 VCC is the motor supply (max 10.8 V)", ru: "VCC DRV8833 — это питание моторов (до 10,8 В)", kk: "DRV8833 VCC — моторлар қуаты (10,8 В-қа дейін)" } },
    { from: "bat.-", to: "buck.IN-", color: "black" },
    { from: "bat.-", to: "drv.GND", color: "black" },
    { from: "buck.OUT+", to: "board.5V", color: "red", note: { en: "5.0 V set and measured before connecting", ru: "5,0 В, выставлено и проверено до подключения", kk: "5,0 В, қоспас бұрын бапталып өлшенген" } },
    { from: "buck.OUT-", to: "board.GND", color: "black" },
    { from: "drv.EEP", to: "board.3V3", color: "orange", note: { en: "sleep pin held HIGH = driver awake", ru: "пин сна в HIGH — драйвер включён", kk: "ұйқы пині HIGH — драйвер қосулы" } },
    { from: "board.GPIO14", to: "drv.IN1", color: "yellow" },
    { from: "board.GPIO15", to: "drv.IN2", color: "green" },
    { from: "board.GPIO13", to: "drv.IN3", color: "yellow" },
    { from: "board.GPIO12", to: "drv.IN4", color: "green", note: { en: "boot strap pin: must stay LOW at power-up (the DRV8833 input pull-down does that)", ru: "пин загрузки: при включении должен быть LOW (это делает подтяжка входа DRV8833)", kk: "жүктеу пині: қосылғанда LOW болуы керек (оны DRV8833 кірісінің тартқышы жасайды)" } },
    { from: "drv.OUT1", to: "m_left.+", color: "red" },
    { from: "drv.OUT2", to: "m_left.-", color: "black" },
    { from: "drv.OUT3", to: "m_right.+", color: "red" },
    { from: "drv.OUT4", to: "m_right.-", color: "black" },
  ],
  steps: [
    {
      title: { en: "Flash a camera test first", ru: "Сначала проверьте камеру", kk: "Алдымен камераны тексеріңіз" },
      body: {
        en: "Seat the ESP32-CAM on the ESP32-CAM-MB programmer and plug it into USB. Install the \"esp32 by Espressif\" package (3.x), choose the board \"AI Thinker ESP32-CAM\", set AP_PASS in the sketch and upload. If upload stalls at \"Connecting...\", hold IO0 (or the MB board's IO0 button) while pressing RST. Open the Serial Monitor at 115200 baud.",
        ru: "Установите ESP32-CAM на программатор ESP32-CAM-MB и подключите по USB. Поставьте пакет «esp32 by Espressif» (3.x), выберите плату «AI Thinker ESP32-CAM», задайте AP_PASS в скетче и загрузите. Если загрузка висит на «Connecting...», удерживайте IO0 (или кнопку IO0 на плате MB) и нажмите RST. Откройте Serial Monitor на 115200 бод.",
        kk: "ESP32-CAM-ды ESP32-CAM-MB бағдарламалағышына орнатып, USB-ге қосыңыз. «esp32 by Espressif» (3.x) пакетін орнатып, «AI Thinker ESP32-CAM» тақтасын таңдаңыз, скетчте AP_PASS орнатып, жүктеңіз. Жүктеу «Connecting...» күйінде тұрып қалса, IO0-ды (немесе MB платасындағы IO0 батырмасын) басып тұрып, RST басыңыз. Serial Monitor-ды 115200 бодта ашыңыз.",
      },
      expect: { en: "\"camera OK, PSRAM yes\" and \"Join Wi-Fi ropros-fpv, open http://192.168.4.1\". The page already shows live video.", ru: "«camera OK, PSRAM yes» и «Join Wi-Fi ropros-fpv, open http://192.168.4.1». Страница уже показывает живое видео.", kk: "«camera OK, PSRAM yes» және «Join Wi-Fi ropros-fpv, open http://192.168.4.1». Бет тікелей видеоны көрсетеді." },
      mistake: { en: "\"camera init failed 0x105\" means the flat camera cable is not fully latched in its connector.", ru: "«camera init failed 0x105» значит, что шлейф камеры не до конца защёлкнут в разъёме.", kk: "«camera init failed 0x105» камера шлейфі ұяшыққа толық бекітілмегенін білдіреді." },
    },
    {
      title: { en: "Set the buck and build the chassis", ru: "Настройте преобразователь и соберите шасси", kk: "Түрлендіргішті баптап, шассиді құрастырыңыз" },
      body: {
        en: "Assemble the 2WD chassis. Feed the buck from the battery through the switch and set its output to exactly 5.0 V with a multimeter before anything else is connected. Mount the ESP32-CAM at the front with the lens looking forward and slightly down, and keep the antenna end away from the motors and the battery.",
        ru: "Соберите шасси 2WD. Подайте батарею через выключатель на преобразователь и мультиметром выставьте на выходе ровно 5,0 В, пока больше ничего не подключено. Закрепите ESP32-CAM спереди объективом вперёд и чуть вниз, а край с антенной держите подальше от моторов и батареи.",
        kk: "2WD шассиін құрастырыңыз. Батареяны ажыратқыш арқылы түрлендіргішке беріп, басқа ештеңе қосылмай тұрып, мультиметрмен шығысқа дәл 5,0 В орнатыңыз. ESP32-CAM-ды объективі алға әрі сәл төмен қарайтындай алдыға бекітіңіз, ал антенна жағын моторлар мен батареядан алыс ұстаңыз.",
      },
      expect: { en: "5.0 V on the buck output; camera mounted with a clear view ahead.", ru: "5,0 В на выходе преобразователя; камера стоит с открытым видом вперёд.", kk: "Түрлендіргіш шығысында 5,0 В; камера алдыңғы көрінісі ашық тұрып орнатылған." },
      mistake: { en: "Powering the ESP32-CAM from its 3V3 pin or a weak USB port: Wi-Fi plus camera pull 300 mA peaks and it resets with \"Brownout detector was triggered\".", ru: "Питать ESP32-CAM через пин 3V3 или слабый USB: Wi-Fi и камера дают пики 300 мА, и плата сбрасывается с «Brownout detector was triggered».", kk: "ESP32-CAM-ды 3V3 пині не әлсіз USB арқылы қоректендіру: Wi-Fi мен камера 300 мА шың береді, тақта «Brownout detector was triggered» деп қайта жүктеледі." },
    },
    {
      title: { en: "Wire power and the DRV8833", ru: "Подключите питание и DRV8833", kk: "Қуат пен DRV8833-ті қосыңыз" },
      body: {
        en: "Switch pin 1 → buck IN+ and DRV8833 VCC (its motor supply, fine up to 10.8 V). Battery − → buck IN- and DRV8833 GND. Buck OUT+ → ESP32-CAM 5V, OUT- → GND. Tie DRV8833 EEP (sleep) to the ESP32-CAM 3V3 pin so the driver stays awake. Leave ULT, the driver's fault output, unconnected: on some modules it is pulled up to the battery voltage, which a 3.3 V pin must never see.",
        ru: "Вывод 1 выключателя → IN+ преобразователя и VCC DRV8833 (это питание моторов, допустимо до 10,8 В). Минус батареи → IN- преобразователя и GND DRV8833. OUT+ → 5V ESP32-CAM, OUT- → GND. Пин EEP (сон) DRV8833 соедините с 3V3 ESP32-CAM, чтобы драйвер не засыпал. ULT — выход ошибки драйвера — оставьте свободным: на некоторых модулях он подтянут к напряжению батареи, а пину 3,3 В это недопустимо.",
        kk: "Ажыратқыштың 1-шығысы → түрлендіргіштің IN+ пині және DRV8833 VCC (моторлар қуаты, 10,8 В-қа дейін болады). Батарея минусы → түрлендіргіштің IN- пині және DRV8833 GND. OUT+ → ESP32-CAM 5V, OUT- → GND. Драйвер ұйықтамауы үшін DRV8833-тің EEP (ұйқы) пинін ESP32-CAM-ның 3V3 пиніне қосыңыз. Драйвердің қате шығысы ULT бос қалсын: кейбір модульдерде ол батарея кернеуіне тартылған, ал 3,3 В пинге бұл мүлде болмайды.",
      },
      expect: { en: "Switch on (programmer removed): the ESP32-CAM boots from the battery and the page loads.", ru: "Включите (без программатора): ESP32-CAM стартует от батареи, страница открывается.", kk: "Қосыңыз (бағдарламалағышсыз): ESP32-CAM батареядан іске қосылады, бет ашылады." },
      mistake: { en: "Leaving the MB programmer attached while the battery is on feeds 5 V from two sources at once. Use one or the other.", ru: "Оставить программатор MB при включённой батарее — 5 В будут подаваться сразу от двух источников. Только что-то одно.", kk: "Батарея қосулы кезде MB бағдарламалағышын қалдыру — 5 В бір мезгілде екі көзден беріледі. Тек біреуін қолданыңыз." },
    },
    {
      title: { en: "Wire the motor inputs", ru: "Подключите входы моторов", kk: "Мотор кірістерін қосыңыз" },
      body: {
        en: "Left motor: GPIO14 → IN1, GPIO15 → IN2, motor on OUT1/OUT2. Right motor: GPIO13 → IN3, GPIO12 → IN4, motor on OUT3/OUT4. These four pins are free because the SD card slot is not used. GPIO12 is a boot strap that must be LOW at power-up; the DRV8833 inputs have internal pull-downs, so it boots normally.",
        ru: "Левый мотор: GPIO14 → IN1, GPIO15 → IN2, мотор на OUT1/OUT2. Правый мотор: GPIO13 → IN3, GPIO12 → IN4, мотор на OUT3/OUT4. Эти четыре пина свободны, потому что слот SD-карты не используется. GPIO12 — пин загрузки, при включении он должен быть LOW; у входов DRV8833 есть внутренние подтяжки к земле, так что плата стартует нормально.",
        kk: "Сол мотор: GPIO14 → IN1, GPIO15 → IN2, мотор OUT1/OUT2-де. Оң мотор: GPIO13 → IN3, GPIO12 → IN4, мотор OUT3/OUT4-те. SD карта ұясы қолданылмағандықтан, бұл төрт пин бос. GPIO12 — жүктеу пині, қосылғанда LOW болуы керек; DRV8833 кірістерінің ішкі жерге тартқыштары бар, сондықтан тақта қалыпты іске қосылады.",
      },
      expect: { en: "Four signal wires from the ESP32-CAM edge header to IN1–IN4.", ru: "Четыре сигнальных провода от гребёнки ESP32-CAM к IN1–IN4.", kk: "ESP32-CAM тарағынан IN1–IN4-ке төрт сигнал сымы." },
      mistake: { en: "Inserting a microSD card: the SD driver is off, but some cards still pull these pins and the motors twitch.", ru: "Вставить microSD: драйвер SD выключен, но некоторые карты всё равно тянут эти пины, и моторы дёргаются.", kk: "microSD салу: SD драйвері өшірулі, бірақ кейбір карталар бұл пиндерді бәрібір тартып, моторлар жұлқынады." },
    },
    {
      title: { en: "Drive with video", ru: "Управляйте по видео", kk: "Видео арқылы басқарыңыз" },
      body: {
        en: "Join the ropros-fpv network and open http://192.168.4.1. The video comes from port 81 and the joystick commands go to port 80, so a busy stream never blocks steering. Drag the orange knob to drive; let go and it stops. If a wheel spins backwards, swap that motor's two wires. Close the page and the rover stops within 0.6 s.",
        ru: "Подключитесь к сети ropros-fpv и откройте http://192.168.4.1. Видео идёт с порта 81, команды джойстика на порт 80, поэтому загруженный поток не блокирует руление. Тяните оранжевую ручку, чтобы ехать; отпустите — остановится. Если колесо крутится назад, поменяйте местами провода этого мотора. Закройте страницу — ровер встанет за 0,6 с.",
        kk: "ropros-fpv желісіне қосылып, http://192.168.4.1 ашыңыз. Видео 81-порттан, джойстик командалары 80-портқа барады, сондықтан жүктелген ағын басқаруды бөгемейді. Жүру үшін қызғылт сары тұтқаны тартыңыз; жіберсеңіз тоқтайды. Дөңгелек кері айналса, сол мотордың сымдарын ауыстырыңыз. Бетті жапсаңыз, ровер 0,6 с ішінде тоқтайды.",
      },
      expect: { en: "VGA video at 10–20 fps with steering that responds within a tenth of a second.", ru: "Видео VGA 10–20 кадров/с, руление откликается за десятую долю секунды.", kk: "VGA видео 10–20 кадр/с, басқару секундтың оннан бір бөлігінде жауап береді." },
      mistake: { en: "Opening the page on two devices: the ESP32-CAM can only feed one stream smoothly.", ru: "Открыть страницу на двух устройствах: ESP32-CAM плавно тянет только один поток.", kk: "Бетті екі құрылғыда ашу: ESP32-CAM тек бір ағынды бір қалыпты береді." },
    },
  ],
  code: [{
    filename: "esp32cam_fpv_rover.ino",
    language: "cpp",
    libraries: [],
    source: `// Board: "AI Thinker ESP32-CAM" (esp32 core 3.x), PSRAM enabled
#include "esp_camera.h"
#include "esp_http_server.h"
#include <WiFi.h>

// ---- rover's own hotspot: CHANGE the password (8+ characters) ----
const char* AP_SSID = "ropros-fpv";
const char* AP_PASS = "YOUR_PASSWORD";

// ---- DRV8833 inputs ----
const int MOTOR_L_IN1 = 14, MOTOR_L_IN2 = 15;   // left motor  -> OUT1/OUT2
const int MOTOR_R_IN1 = 13, MOTOR_R_IN2 = 12;   // right motor -> OUT3/OUT4 (GPIO12 low at boot)
const int PWM_FREQ = 20000, PWM_RESOLUTION = 8;
const int MAX_DUTY = 180;                        // 8.4 V pack on 6 V motors
const int MIN_DUTY = 70;
const unsigned long FAILSAFE_MS = 600;

// ---- AI-Thinker camera pins ----
#define PWDN_GPIO_NUM 32
#define RESET_GPIO_NUM -1
#define XCLK_GPIO_NUM 0
#define SIOD_GPIO_NUM 26
#define SIOC_GPIO_NUM 27
#define Y9_GPIO_NUM 35
#define Y8_GPIO_NUM 34
#define Y7_GPIO_NUM 39
#define Y6_GPIO_NUM 36
#define Y5_GPIO_NUM 21
#define Y4_GPIO_NUM 19
#define Y3_GPIO_NUM 18
#define Y2_GPIO_NUM 5
#define VSYNC_GPIO_NUM 25
#define HREF_GPIO_NUM 23
#define PCLK_GPIO_NUM 22

#define PART_BOUNDARY "123456789000000000000987654321"
static const char* STREAM_TYPE = "multipart/x-mixed-replace;boundary=" PART_BOUNDARY;
static const char* STREAM_SEP = "\\r\\n--" PART_BOUNDARY "\\r\\n";
static const char* STREAM_PART = "Content-Type: image/jpeg\\r\\nContent-Length: %u\\r\\n\\r\\n";

volatile int cmdX = 0, cmdY = 0;
volatile unsigned long lastCmd = 0;
volatile bool fresh = false;
bool moving = false;
unsigned long lastLog = 0;

const char PAGE[] = R"html(<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"><title>ropros fpv</title>
<style>body{margin:0;background:#0b0f14;color:#e6edf3;font-family:system-ui,sans-serif;text-align:center;touch-action:none;user-select:none}
img{width:100%;max-width:640px;display:block;margin:0 auto;background:#16202b;aspect-ratio:4/3}
#pad{width:220px;height:220px;border-radius:50%;background:#16202b;border:2px solid #2a3644;margin:16px auto;position:relative}
#knob{width:76px;height:76px;border-radius:50%;background:#ff7a1a;position:absolute;left:72px;top:72px}#st{color:#8b98a5}</style></head>
<body><img id="v" alt="video"><div id="pad"><div id="knob"></div></div><p id="st">x 0 y 0</p>
<script>
document.getElementById('v').src='http://'+location.hostname+':81/stream';
const pad=document.getElementById('pad'),knob=document.getElementById('knob'),st=document.getElementById('st');
let x=0,y=0,held=false,busy=false;const R=72;
function put(dx,dy){knob.style.left=(72+dx)+'px';knob.style.top=(72+dy)+'px'}
function move(e){const b=pad.getBoundingClientRect();let dx=e.clientX-b.left-110,dy=e.clientY-b.top-110;
const d=Math.hypot(dx,dy);if(d>R){dx*=R/d;dy*=R/d}put(dx,dy);x=Math.round(dx/R*100);y=Math.round(-dy/R*100)}
pad.onpointerdown=e=>{held=true;pad.setPointerCapture(e.pointerId);move(e)};
pad.onpointermove=e=>{if(held)move(e)};
pad.onpointerup=pad.onpointercancel=()=>{held=false;x=0;y=0;put(0,0)};
setInterval(()=>{st.textContent='x '+x+'  y '+y;if(busy)return;busy=true;
fetch('/drive?x='+x+'&y='+y).catch(()=>{}).finally(()=>{busy=false})},100);
</script></body></html>)html";

void setMotor(int pinFwd, int pinRev, int speed) {   // -100..100
  speed = constrain(speed, -100, 100);
  int duty = abs(speed) < 5 ? 0 : map(abs(speed), 5, 100, MIN_DUTY, MAX_DUTY);
  ledcWrite(pinFwd, speed > 0 ? duty : 0);
  ledcWrite(pinRev, speed < 0 ? duty : 0);
}

void drive(int x, int y) {
  int left = y + x, right = y - x;
  int biggest = max(100, max(abs(left), abs(right)));
  left = left * 100 / biggest;
  right = right * 100 / biggest;
  setMotor(MOTOR_L_IN1, MOTOR_L_IN2, left);
  setMotor(MOTOR_R_IN1, MOTOR_R_IN2, right);
  moving = left != 0 || right != 0;
  if (moving && millis() - lastLog > 300) {
    Serial.printf("L=%d R=%d\\n", left, right);
    lastLog = millis();
  }
}

static esp_err_t indexHandler(httpd_req_t* req) {
  httpd_resp_set_type(req, "text/html");
  return httpd_resp_send(req, PAGE, HTTPD_RESP_USE_STRLEN);
}

static esp_err_t driveHandler(httpd_req_t* req) {
  char query[48], val[8];
  int x = 0, y = 0;
  if (httpd_req_get_url_query_str(req, query, sizeof query) == ESP_OK) {
    if (httpd_query_key_value(query, "x", val, sizeof val) == ESP_OK) x = atoi(val);
    if (httpd_query_key_value(query, "y", val, sizeof val) == ESP_OK) y = atoi(val);
  }
  cmdX = constrain(x, -100, 100);
  cmdY = constrain(y, -100, 100);
  lastCmd = millis();
  fresh = true;
  httpd_resp_set_type(req, "text/plain");
  return httpd_resp_send(req, "ok", HTTPD_RESP_USE_STRLEN);
}

static esp_err_t streamHandler(httpd_req_t* req) {
  esp_err_t res = httpd_resp_set_type(req, STREAM_TYPE);
  char part[64];
  while (res == ESP_OK) {
    camera_fb_t* fb = esp_camera_fb_get();
    if (!fb) {
      Serial.println("camera capture failed");
      return ESP_FAIL;
    }
    size_t len = snprintf(part, sizeof part, STREAM_PART, (unsigned)fb->len);
    res = httpd_resp_send_chunk(req, STREAM_SEP, strlen(STREAM_SEP));
    if (res == ESP_OK) res = httpd_resp_send_chunk(req, part, len);
    if (res == ESP_OK) res = httpd_resp_send_chunk(req, (const char*)fb->buf, fb->len);
    esp_camera_fb_return(fb);
  }
  return res;
}

bool startCamera() {
  camera_config_t c = {};
  c.ledc_channel = LEDC_CHANNEL_7;   // keep the camera clock away from the motor PWM
  c.ledc_timer = LEDC_TIMER_3;
  c.pin_d0 = Y2_GPIO_NUM;
  c.pin_d1 = Y3_GPIO_NUM;
  c.pin_d2 = Y4_GPIO_NUM;
  c.pin_d3 = Y5_GPIO_NUM;
  c.pin_d4 = Y6_GPIO_NUM;
  c.pin_d5 = Y7_GPIO_NUM;
  c.pin_d6 = Y8_GPIO_NUM;
  c.pin_d7 = Y9_GPIO_NUM;
  c.pin_xclk = XCLK_GPIO_NUM;
  c.pin_pclk = PCLK_GPIO_NUM;
  c.pin_vsync = VSYNC_GPIO_NUM;
  c.pin_href = HREF_GPIO_NUM;
  c.pin_sccb_sda = SIOD_GPIO_NUM;
  c.pin_sccb_scl = SIOC_GPIO_NUM;
  c.pin_pwdn = PWDN_GPIO_NUM;
  c.pin_reset = RESET_GPIO_NUM;
  c.xclk_freq_hz = 20000000;
  c.pixel_format = PIXFORMAT_JPEG;
  c.grab_mode = CAMERA_GRAB_LATEST;
  if (psramFound()) {
    c.frame_size = FRAMESIZE_VGA;
    c.jpeg_quality = 12;
    c.fb_count = 2;
    c.fb_location = CAMERA_FB_IN_PSRAM;
  } else {
    c.frame_size = FRAMESIZE_QVGA;
    c.jpeg_quality = 15;
    c.fb_count = 1;
    c.fb_location = CAMERA_FB_IN_DRAM;
  }
  esp_err_t err = esp_camera_init(&c);
  if (err != ESP_OK) {
    Serial.printf("camera init failed 0x%x\\n", err);
    return false;
  }
  Serial.printf("camera OK, PSRAM %s\\n", psramFound() ? "yes" : "no");
  return true;
}

void startServers() {
  httpd_config_t cfg = HTTPD_DEFAULT_CONFIG();
  httpd_handle_t web = NULL, stream = NULL;
  httpd_uri_t indexUri = {};
  indexUri.uri = "/";
  indexUri.method = HTTP_GET;
  indexUri.handler = indexHandler;
  httpd_uri_t driveUri = {};
  driveUri.uri = "/drive";
  driveUri.method = HTTP_GET;
  driveUri.handler = driveHandler;
  httpd_uri_t streamUri = {};
  streamUri.uri = "/stream";
  streamUri.method = HTTP_GET;
  streamUri.handler = streamHandler;

  cfg.server_port = 80;
  if (httpd_start(&web, &cfg) == ESP_OK) {
    httpd_register_uri_handler(web, &indexUri);
    httpd_register_uri_handler(web, &driveUri);
  }
  cfg.server_port = 81;                  // separate server: the endless stream never blocks /drive
  cfg.ctrl_port += 1;
  if (httpd_start(&stream, &cfg) == ESP_OK) httpd_register_uri_handler(stream, &streamUri);
}

void setup() {
  Serial.begin(115200);
  // motors first, on fixed LEDC channels 2..5 so they never touch the camera's channel 7
  ledcAttachChannel(MOTOR_L_IN1, PWM_FREQ, PWM_RESOLUTION, 2);
  ledcAttachChannel(MOTOR_L_IN2, PWM_FREQ, PWM_RESOLUTION, 3);
  ledcAttachChannel(MOTOR_R_IN1, PWM_FREQ, PWM_RESOLUTION, 4);
  ledcAttachChannel(MOTOR_R_IN2, PWM_FREQ, PWM_RESOLUTION, 5);
  drive(0, 0);

  if (!startCamera()) Serial.println("check the camera ribbon cable");
  WiFi.mode(WIFI_AP);
  WiFi.softAP(AP_SSID, AP_PASS);
  WiFi.setSleep(false);                  // lower latency for video and steering
  startServers();
  Serial.printf("Join Wi-Fi %s, open http://%s\\n", AP_SSID, WiFi.softAPIP().toString().c_str());
}

void loop() {
  if (fresh) {
    fresh = false;
    drive(cmdX, cmdY);
  }
  if (moving && millis() - lastCmd > FAILSAFE_MS) {
    drive(0, 0);
    Serial.println("failsafe: no command, stop");
  }
  delay(5);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"Brownout detector was triggered\" and endless reboots", ru: "«Brownout detector was triggered» и бесконечные перезагрузки", kk: "«Brownout detector was triggered» және шексіз қайта жүктелу" },
      cause: { en: "The 5 V supply sags when Wi-Fi transmits: weak USB, long thin wires, or a flat battery.", ru: "Питание 5 В проседает при передаче Wi-Fi: слабый USB, длинные тонкие провода или севшая батарея.", kk: "Wi-Fi тарату кезінде 5 В қуат отырады: әлсіз USB, ұзын жіңішке сымдар немесе отырған батарея." },
      fix: { en: "Run from the buck at 5.0 V with short wires, charge the pack, and add a 470 µF capacitor across 5V and GND at the ESP32-CAM.", ru: "Питайте от преобразователя 5,0 В короткими проводами, зарядите батарею и поставьте конденсатор 470 мкФ между 5V и GND у ESP32-CAM.", kk: "Қысқа сымдармен 5,0 В түрлендіргіштен қоректендіріңіз, батареяны зарядтаңыз және ESP32-CAM жанында 5V пен GND арасына 470 мкФ конденсатор қойыңыз." },
    },
    {
      symptom: { en: "Upload fails with \"Failed to connect to ESP32\"", ru: "Загрузка падает с «Failed to connect to ESP32»", kk: "Жүктеу «Failed to connect to ESP32» қатесімен тоқтайды" },
      cause: { en: "The board did not enter download mode, or GPIO12 is held HIGH by something on boot.", ru: "Плата не вошла в режим загрузки, или что-то держит GPIO12 в HIGH при старте.", kk: "Тақта жүктеу режиміне кірмеді немесе бірдеңе іске қосылғанда GPIO12-ні HIGH күйде ұстайды." },
      fix: { en: "Hold IO0, tap RST, release IO0, then upload. For flashing, take the board off the rover so nothing pulls GPIO12.", ru: "Зажмите IO0, нажмите RST, отпустите IO0 и загружайте. Для прошивки снимите плату с ровера, чтобы ничто не тянуло GPIO12.", kk: "IO0-ды басып тұрып, RST басыңыз, IO0-ды жіберіп, жүктеңіз. Жазу кезінде GPIO12-ні ештеңе тартпауы үшін тақтаны роверден алыңыз." },
    },
    {
      symptom: { en: "Video works but the motors never move", ru: "Видео есть, а моторы не крутятся", kk: "Видео бар, бірақ моторлар айналмайды" },
      cause: { en: "EEP is not tied to 3V3 (driver asleep) or the switch does not feed DRV8833 VCC.", ru: "EEP не подключён к 3V3 (драйвер спит), или выключатель не подаёт питание на VCC DRV8833.", kk: "EEP 3V3-ке қосылмаған (драйвер ұйықтап тұр) немесе ажыратқыш DRV8833 VCC-ге қуат бермейді." },
      fix: { en: "Measure EEP to GND (3.3 V) and VCC to GND (7–8.4 V) with the switch on.", ru: "При включённом питании измерьте EEP относительно GND (3,3 В) и VCC относительно GND (7–8,4 В).", kk: "Қуат қосулы кезде EEP пен GND арасын (3,3 В) және VCC пен GND арасын (7–8,4 В) өлшеңіз." },
    },
    {
      symptom: { en: "Video is choppy or freezes when driving away", ru: "Видео дёргается или замирает, когда ровер отъезжает", kk: "Ровер алыстағанда видео секіреді немесе қатып қалады" },
      cause: { en: "The tiny PCB antenna has short range and the motors add noise.", ru: "У маленькой антенны на плате небольшая дальность, а моторы добавляют помехи.", kk: "Тақтадағы кішкентай антеннаның қашықтығы аз, ал моторлар кедергі қосады." },
      fix: { en: "Keep within ~15 m, solder 0.1 µF capacitors across each motor's terminals, or move the antenna jumper to the IPEX connector and fit an external antenna.", ru: "Держитесь в пределах ~15 м, припаяйте конденсаторы 0,1 мкФ на выводы каждого мотора или переставьте перемычку антенны на разъём IPEX и подключите внешнюю антенну.", kk: "~15 м шегінде болыңыз, әр мотордың шығыстарына 0,1 мкФ конденсатор дәнекерлеңіз немесе антенна секіргішін IPEX ұяшығына ауыстырып, сыртқы антенна қосыңыз." },
    },
  ],
  safety: [
    { en: "Never connect the 2S battery to the ESP32-CAM 5V pin directly: always through the buck set to 5.0 V.", ru: "Никогда не подключайте батарею 2S прямо к пину 5V ESP32-CAM: только через преобразователь на 5,0 В.", kk: "2S батареяны ешқашан ESP32-CAM 5V пиніне тікелей қоспаңыз: тек 5,0 В-қа бапталған түрлендіргіш арқылы." },
    { en: "Charge the LiPo with a balance charger; the camera module gets warm, so do not wrap it in tape.", ru: "Заряжайте LiPo балансирным зарядником; модуль камеры греется, не заматывайте его изолентой.", kk: "LiPo-ны теңгерімдік зарядтағышпен зарядтаңыз; камера модулі жылиды, оны оқшаулағыш таспамен орамаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "camera OK, PSRAM yes",
      "Join Wi-Fi ropros-fpv, open http://192.168.4.1",
      "L=63 R=63",
      "L=100 R=42",
      "L=-55 R=-55",
      "L=30 R=-30",
      "failsafe: no command, stop",
    ],
    leds: [],
  },
} satisfies GuideContent;
