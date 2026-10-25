import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-line-follower-web-tuning",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "robotics",
  robotics: true,
  difficulty: "intermediate",
  hours: 5,
  costUsd: 31,
  xpReward: 270,
  title: {
    en: "ESP32 Line Follower with Live PID Tuning",
    ru: "Робот по линии на ESP32 с настройкой PID по Wi-Fi",
    kk: "PID-ті Wi-Fi арқылы баптайтын ESP32 сызық бойымен жүретін робот",
  },
  summary: {
    en: "A 5-sensor line follower whose Kp, Ki, Kd and speed you tune from a phone while it runs, with a live sensor view and a Save button that keeps the best gains in flash.",
    ru: "Робот с 5 датчиками линии, у которого Kp, Ki, Kd и скорость настраиваются с телефона прямо на ходу; есть живой вид датчиков и кнопка Save, сохраняющая лучшие коэффициенты во флеш.",
    kk: "5 датчигі бар сызық роботы: Kp, Ki, Kd және жылдамдықты жүріп келе жатқанда телефоннан баптайсыз; датчиктердің тірі көрінісі мен үздік коэффициенттерді флешке сақтайтын Save батырмасы бар.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32-WROOM-32 DevKit", ru: "ESP32-WROOM-32 DevKit", kk: "ESP32-WROOM-32 DevKit" }, role: { en: "PID loop, Wi-Fi hotspot and tuning page", ru: "PID-цикл, точка доступа и страница настройки", kk: "PID циклі, Wi-Fi нүктесі және баптау беті" } },
    { component: "line-sensor-array", qty: 1, spec: { en: "5× TCRT5000 with LM393, digital outputs, powered from 3.3 V", ru: "5× TCRT5000 с LM393, цифровые выходы, питание 3,3 В", kk: "5× TCRT5000, LM393, цифрлық шығыстар, 3,3 В қуат" }, role: { en: "Sees the black line", ru: "Видит чёрную линию", kk: "Қара сызықты көреді" } },
    { component: "tb6612fng", qty: 1, spec: { en: "breakout, 1.2 A per channel", ru: "модуль, 1,2 А на канал", kk: "модуль, арнаға 1,2 А" }, role: { en: "Motor driver", ru: "Драйвер моторов", kk: "Мотор драйвері" } },
    { component: "dc-motor", qty: 2, spec: { en: "TT gear motor 1:48, 3–6 V", ru: "мотор-редуктор TT 1:48, 3–6 В", kk: "TT редукторлы мотор 1:48, 3–6 В" }, role: { en: "Left and right wheels", ru: "Левое и правое колёса", kk: "Сол және оң дөңгелектер" } },
    { component: "robot-chassis-2wd", qty: 1, spec: { en: "2 wheels + front caster", ru: "2 колеса + переднее опорное", kk: "2 дөңгелек + алдыңғы тірек" }, role: { en: "Frame", ru: "Рама", kk: "Рама" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V 2S, 1000–1500 mAh", ru: "7,4 В 2S, 1000–1500 мА·ч", kk: "7,4 В 2S, 1000–1500 мА·сағ" }, role: { en: "Main power", ru: "Основное питание", kk: "Негізгі қуат" } },
    { component: "buck-converter-lm2596", qty: 1, spec: { en: "set to 5.0 V", ru: "выставлен на 5,0 В", kk: "5,0 В-қа бапталған" }, role: { en: "5 V for the ESP32", ru: "5 В для ESP32", kk: "ESP32 үшін 5 В" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT toggle (MTS-102) or slide switch rated 3 A+", ru: "SPDT тумблер (MTS-102) или движковый на ток от 3 А", kk: "SPDT тумблер (MTS-102) не 3 А-дан жоғары токқа арналған жылжымалы ажыратқыш" }, role: { en: "Power switch", ru: "Выключатель питания", kk: "Қуат ажыратқышы" } },
    { component: "jumper-wires", qty: 24, spec: { en: "male-female", ru: "папа-мама", kk: "аталық-аналық" }, role: { en: "Wiring", ru: "Проводка", kk: "Сымдар" } },
  ],
  instances: [
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
    { id: "buck", component: "buck-converter-lm2596", label: "Buck 5.0 V" },
    { id: "line", component: "line-sensor-array", label: "5× TCRT5000" },
    { id: "drv", component: "tb6612fng", label: "TB6612FNG" },
    { id: "m_left", component: "dc-motor", label: "Left motor" },
    { id: "m_right", component: "dc-motor", label: "Right motor" },
  ],
  connections: [
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "buck.IN+", color: "red" },
    { from: "sw.1", to: "drv.VM", color: "red" },
    { from: "bat.-", to: "buck.IN-", color: "black" },
    { from: "bat.-", to: "drv.GND", color: "black" },
    { from: "buck.OUT+", to: "board.5V", color: "red", note: { en: "5.0 V, measured before connecting", ru: "5,0 В, проверено до подключения", kk: "5,0 В, қоспас бұрын өлшенген" } },
    { from: "buck.OUT-", to: "board.GND", color: "black" },
    { from: "line.VCC", to: "board.3V3", color: "orange", note: { en: "3.3 V, not 5 V: the outputs then stay at a safe 3.3 V", ru: "3,3 В, не 5 В: тогда выходы тоже не выше 3,3 В", kk: "5 В емес, 3,3 В: сонда шығыстар да 3,3 В-тан аспайды" } },
    { from: "line.GND", to: "board.GND3", color: "black" },
    { from: "line.OUT1", to: "board.GPIO36", color: "white", note: { en: "far left; GPIO34–39 are input-only, ideal here", ru: "крайний левый; GPIO34–39 только входы, тут идеально", kk: "ең сол жақ; GPIO34–39 тек кіріс, мұнда дәл келеді" } },
    { from: "line.OUT2", to: "board.GPIO39", color: "gray" },
    { from: "line.OUT3", to: "board.GPIO34", color: "purple" },
    { from: "line.OUT4", to: "board.GPIO35", color: "brown" },
    { from: "line.OUT5", to: "board.GPIO23", color: "pink", note: { en: "far right", ru: "крайний правый", kk: "ең оң жақ" } },
    { from: "drv.VCC", to: "board.3V3", color: "orange" },
    { from: "drv.GND2", to: "board.GND2", color: "black" },
    { from: "board.GPIO25", to: "drv.PWMA", color: "yellow" },
    { from: "board.GPIO26", to: "drv.AIN1", color: "green" },
    { from: "board.GPIO27", to: "drv.AIN2", color: "blue" },
    { from: "board.GPIO33", to: "drv.STBY", color: "white" },
    { from: "board.GPIO13", to: "drv.BIN1", color: "green" },
    { from: "board.GPIO14", to: "drv.BIN2", color: "blue" },
    { from: "board.GPIO32", to: "drv.PWMB", color: "yellow" },
    { from: "drv.AO1", to: "m_left.+", color: "red" },
    { from: "drv.AO2", to: "m_left.-", color: "black" },
    { from: "drv.BO1", to: "m_right.+", color: "red" },
    { from: "drv.BO2", to: "m_right.-", color: "black" },
  ],
  steps: [
    {
      title: { en: "Build the chassis and set the buck to 5 V", ru: "Соберите шасси и выставьте 5 В на преобразователе", kk: "Шассиді құрастырып, түрлендіргішті 5 В-қа баптаңыз" },
      body: {
        en: "Assemble the 2WD chassis with the caster at the front. Mount the sensor bar at the front edge, 5–10 mm above the floor and centred. Connect the battery through the switch to the buck converter, measure OUT+ to OUT- and turn the trimmer to 5.0 V before the ESP32 is connected.",
        ru: "Соберите шасси 2WD с опорным колесом спереди. Закрепите линейку датчиков на переднем краю по центру, на высоте 5–10 мм над полом. Подайте батарею через выключатель на преобразователь, измерьте OUT+ относительно OUT- и выставьте подстроечником 5,0 В, пока ESP32 не подключён.",
        kk: "2WD шассиін тірек дөңгелегін алдыға қойып құрастырыңыз. Датчиктер сызғышын алдыңғы жиекке, ортаға, еденнен 5–10 мм биіктікке бекітіңіз. Батареяны ажыратқыш арқылы түрлендіргішке беріп, OUT+ пен OUT- арасын өлшеңіз де, ESP32 қосылмай тұрып баптағышпен 5,0 В орнатыңыз.",
      },
      expect: { en: "Sensor bar parallel to the floor, buck output 5.0 V.", ru: "Линейка датчиков параллельна полу, на выходе преобразователя 5,0 В.", kk: "Датчиктер сызғышы еденге параллель, түрлендіргіш шығысында 5,0 В." },
      mistake: { en: "Mounting the sensors behind the wheels: the robot reacts too late and oscillates no matter the gains.", ru: "Поставить датчики за колёсами: робот реагирует слишком поздно и раскачивается при любых коэффициентах.", kk: "Датчиктерді дөңгелектердің артына қою: робот тым кеш әрекет етіп, кез келген коэффициентте тербеледі." },
    },
    {
      title: { en: "Wire power and the motor driver", ru: "Подключите питание и драйвер моторов", kk: "Қуат пен мотор драйверін қосыңыз" },
      body: {
        en: "Switch pin 1 feeds buck IN+ and TB6612FNG VM; battery − goes to buck IN- and the driver GND. Buck OUT+ → ESP32 5V, OUT- → GND. Driver VCC → 3V3, GND2 → ESP32 GND2. Signals: PWMA GPIO25, AIN1 GPIO26, AIN2 GPIO27, STBY GPIO33, BIN1 GPIO13, BIN2 GPIO14, PWMB GPIO32. Left motor on AO1/AO2, right on BO1/BO2. While USB is plugged in keep the switch OFF, otherwise the 5V pin is fed from USB and the buck at once.",
        ru: "Вывод 1 выключателя питает IN+ преобразователя и VM драйвера TB6612FNG; минус батареи идёт на IN- и GND драйвера. OUT+ → 5V ESP32, OUT- → GND. VCC драйвера → 3V3, GND2 → GND2 ESP32. Сигналы: PWMA GPIO25, AIN1 GPIO26, AIN2 GPIO27, STBY GPIO33, BIN1 GPIO13, BIN2 GPIO14, PWMB GPIO32. Левый мотор на AO1/AO2, правый на BO1/BO2. Пока подключён USB, держите выключатель в OFF, иначе пин 5V питается одновременно от USB и преобразователя.",
        kk: "Ажыратқыштың 1-шығысы түрлендіргіштің IN+ пинін және TB6612FNG-нің VM пинін қоректендіреді; батарея минусы IN- пен драйвердің GND-не барады. OUT+ → ESP32 5V, OUT- → GND. Драйвер VCC → 3V3, GND2 → ESP32 GND2. Сигналдар: PWMA GPIO25, AIN1 GPIO26, AIN2 GPIO27, STBY GPIO33, BIN1 GPIO13, BIN2 GPIO14, PWMB GPIO32. Сол мотор AO1/AO2-де, оңы BO1/BO2-де. USB қосулы кезде ажыратқышты OFF күйінде ұстаңыз, әйтпесе 5V пині USB мен түрлендіргіштен қатар қоректенеді.",
      },
      expect: { en: "Switch on without USB: ESP32 power LED on, motors silent.", ru: "Включение без USB: светодиод питания ESP32 горит, моторы молчат.", kk: "USB-сіз қосқанда: ESP32 қуат шамы жанады, моторлар үнсіз." },
      mistake: { en: "Returning motor current through the ESP32 ground causes random resets at full speed.", ru: "Если ток моторов возвращается через землю ESP32, на полном ходу будут случайные перезагрузки.", kk: "Мотор тогы ESP32 жері арқылы қайтса, толық жылдамдықта кездейсоқ қайта жүктелулер болады." },
    },
    {
      title: { en: "Wire the sensor bar at 3.3 V", ru: "Подключите линейку датчиков к 3,3 В", kk: "Датчиктер сызғышын 3,3 В-қа қосыңыз" },
      body: {
        en: "Power the sensor bar from 3V3, not 5 V: its LM393 comparators pull the outputs up to their own supply, so at 5 V they would push 5 V into the ESP32. OUT1 (far left) → GPIO36, OUT2 → GPIO39, OUT3 → GPIO34, OUT4 → GPIO35, OUT5 (far right) → GPIO23. GPIO34–39 are input-only pins, which is exactly what sensors need.",
        ru: "Питайте линейку от 3V3, а не от 5 В: компараторы LM393 подтягивают выходы к своему питанию, и при 5 В на ESP32 пошли бы 5 В. OUT1 (крайний левый) → GPIO36, OUT2 → GPIO39, OUT3 → GPIO34, OUT4 → GPIO35, OUT5 (крайний правый) → GPIO23. GPIO34–39 работают только на вход — как раз то, что нужно датчикам.",
        kk: "Сызғышты 5 В-тан емес, 3V3-тен қоректендіріңіз: LM393 компараторлары шығыстарды өз қуатына дейін тартады, 5 В болса ESP32-ге 5 В барар еді. OUT1 (ең сол) → GPIO36, OUT2 → GPIO39, OUT3 → GPIO34, OUT4 → GPIO35, OUT5 (ең оң) → GPIO23. GPIO34–39 тек кіріс ретінде жұмыс істейді — датчиктерге дәл осы керек.",
      },
      expect: { en: "Each channel's indicator LED changes as you slide a strip of black tape under it.", ru: "Индикатор каждого канала меняется, когда под ним проводят полоску чёрной изоленты.", kk: "Әр арнаның индикаторы астынан қара оқшаулағыш таспаны жүргізгенде өзгереді." },
      mistake: { en: "Mixing up the order: if OUT1 is not on the left, the robot steers away from the line.", ru: "Перепутать порядок: если OUT1 не слева, робот будет уходить от линии.", kk: "Ретін шатастыру: OUT1 сол жақта болмаса, робот сызықтан алыстай береді." },
    },
    {
      title: { en: "Upload and check the sensors", ru: "Загрузите скетч и проверьте датчики", kk: "Скетчті жүктеп, датчиктерді тексеріңіз" },
      body: {
        en: "Select \"ESP32 Dev Module\" (esp32 core 3.x), set AP_PASS, upload with the battery OFF. Then unplug USB, switch ON, join ropros-line and open http://192.168.4.1. The five dots show what the robot sees. Hold it over the line: the dot under the line must light. If it is the other way round, flip BLACK_READS_HIGH and upload again. Adjust each blue trimmer on the bar until the line flips the channel cleanly.",
        ru: "Выберите «ESP32 Dev Module» (ядро esp32 3.x), задайте AP_PASS, загрузите скетч при выключенной батарее. Затем отключите USB, включите питание, подключитесь к сети ropros-line и откройте http://192.168.4.1. Пять точек показывают, что видит робот. Держите его над линией: точка над линией должна загореться. Если наоборот, поменяйте BLACK_READS_HIGH и загрузите снова. Подкрутите синие подстроечники на линейке, чтобы линия чётко переключала каждый канал.",
        kk: "«ESP32 Dev Module» (esp32 ядросы 3.x) таңдап, AP_PASS орнатыңыз да, батарея өшірулі кезде жүктеңіз. Содан соң USB-ді ажыратып, қуатты қосыңыз, ropros-line желісіне қосылып, http://192.168.4.1 ашыңыз. Бес нүкте роботтың не көретінін көрсетеді. Оны сызықтың үстінде ұстаңыз: сызық үстіндегі нүкте жануы керек. Керісінше болса, BLACK_READS_HIGH мәнін ауыстырып, қайта жүктеңіз. Сызықтағы көк баптағыштарды сызық әр арнаны анық ауыстыратындай бұраңыз.",
      },
      expect: { en: "Moving the robot sideways over the line walks the lit dot from left to right and the position goes from −2000 to 2000.", ru: "Если вести робота поперёк линии, горящая точка бежит слева направо, а позиция меняется от −2000 до 2000.", kk: "Роботты сызықтың көлденеңінен жүргізсеңіз, жанып тұрған нүкте солдан оңға жүреді, позиция −2000-нан 2000-ға дейін өзгереді." },
      mistake: { en: "Testing on a glossy table: reflections look white even under black tape. Use matte paper or a whiteboard track.", ru: "Тестировать на глянцевом столе: блики выглядят белыми даже под чёрной лентой. Используйте матовую бумагу.", kk: "Жылтыр үстелде сынау: шағылысу қара таспаның астында да ақ болып көрінеді. Күңгірт қағаз пайдаланыңыз." },
    },
    {
      title: { en: "Tune the PID live", ru: "Настройте PID на ходу", kk: "PID-ті жүріп келе жатқанда баптаңыз" },
      body: {
        en: "Start with Ki = 0, Kd = 0, speed 40 and press START. Raise Kp until the robot follows the line but wiggles, then raise Kd until the wiggle dies out. Add a tiny Ki only if it drifts to one side on long straights. Increase speed in steps of 5 and retune Kd. Press SAVE when it runs well: the gains survive a power cycle.",
        ru: "Начните с Ki = 0, Kd = 0, скорость 40 и нажмите START. Увеличивайте Kp, пока робот не начнёт держать линию с покачиванием, затем поднимайте Kd, пока покачивание не исчезнет. Немного Ki добавляйте, только если на длинных прямых его уводит в сторону. Поднимайте скорость шагами по 5 и подстраивайте Kd. Когда едет хорошо, нажмите SAVE: коэффициенты сохранятся после выключения.",
        kk: "Ki = 0, Kd = 0, жылдамдық 40-тан бастап, START басыңыз. Робот сызықты тербеле ұстай бастағанша Kp-ны көтеріңіз, содан кейін тербеліс басылғанша Kd-ны көтеріңіз. Ki-ды аздап тек ұзын түзулерде бір жаққа кетсе ғана қосыңыз. Жылдамдықты 5-тен көтеріп, Kd-ны қайта баптаңыз. Жақсы жүрсе, SAVE басыңыз: коэффициенттер қуат өшкеннен кейін де сақталады.",
      },
      expect: { en: "Smooth runs around the track; the Serial Monitor logs each change, e.g. \"gains kp=0.050 ki=0.0000 kd=0.400 base=55\".", ru: "Плавные круги по трассе; Serial Monitor пишет каждое изменение, например «gains kp=0.050 ki=0.0000 kd=0.400 base=55».", kk: "Трасса бойымен бір қалыпты айналымдар; Serial Monitor әр өзгерісті жазады, мысалы «gains kp=0.050 ki=0.0000 kd=0.400 base=55»." },
      mistake: { en: "Raising Ki first: integral wind-up makes the robot overshoot every curve.", ru: "Начать с Ki: интеграл накапливается, и робот проскакивает каждый поворот.", kk: "Ki-дан бастау: интеграл жиналып, робот әр бұрылыстан асып кетеді." },
    },
  ],
  code: [{
    filename: "line_follower_pid.ino",
    language: "cpp",
    libraries: [],
    source: `#include <WiFi.h>
#include <WebServer.h>
#include <Preferences.h>

// ---- robot's own hotspot: CHANGE the password (8+ characters) ----
const char* AP_SSID = "ropros-line";
const char* AP_PASS = "YOUR_PASSWORD";

// ---- line sensor bar, OUT1 (far left) .. OUT5 (far right) ----
const int SENSOR_PINS[5] = {36, 39, 34, 35, 23};
const bool BLACK_READS_HIGH = true;          // flip if the web view shows the line inverted

// ---- TB6612FNG ----
const int PWMA = 25, AIN1 = 26, AIN2 = 27;   // left motor
const int PWMB = 32, BIN1 = 13, BIN2 = 14;   // right motor
const int STBY = 33;
const int PWM_FREQ = 20000, PWM_RESOLUTION = 8;
const int MAX_DUTY = 180;                    // ~6 V average from the 8.4 V pack

const unsigned long LOOP_US = 5000;          // 200 Hz control loop
const unsigned long LOST_MS = 1000;          // stop after 1 s without a line

WebServer server(80);
Preferences prefs;

float kp = 0.04f, ki = 0.0f, kd = 0.3f;
int base = 40;                               // percent of MAX_DUTY
bool running = false;
int bits[5];
long position = 0, lastError = 0;
float integral = 0;
unsigned long lastTick = 0, lastSeen = 0;

const char PAGE[] PROGMEM = R"html(<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>ropros line</title>
<style>body{margin:0;padding:16px;background:#0b0f14;color:#e6edf3;font-family:system-ui,sans-serif}
.d{display:inline-block;width:40px;height:40px;border-radius:50%;background:#16202b;margin:4px}.on{background:#2ee6c9}
label{display:block;margin:14px 0}input{width:100%}button{font-size:18px;padding:12px 18px;margin:6px 6px 0 0;border:0;border-radius:12px}
#go{background:#ff7a1a}#stop{background:#e5484d;color:#fff}</style></head><body>
<div id="dots"></div><p id="pos">position 0</p>
<label>Kp <b id="kpv"></b><input type="range" id="kp" min="0" max="0.2" step="0.002"></label>
<label>Ki <b id="kiv"></b><input type="range" id="ki" min="0" max="0.002" step="0.00005"></label>
<label>Kd <b id="kdv"></b><input type="range" id="kd" min="0" max="2" step="0.02"></label>
<label>speed % <b id="basev"></b><input type="range" id="base" min="0" max="100" step="5"></label>
<button id="go">START</button><button id="stop">STOP</button><button id="save">SAVE</button>
<script>
const ids=['kp','ki','kd','base'],el=i=>document.getElementById(i);let first=true,busy=false;
el('dots').innerHTML='<span class="d"></span>'.repeat(5);
function labels(){ids.forEach(i=>el(i+'v').textContent=el(i).value)}
function send(){labels();if(busy)return;busy=true;
fetch('/set?'+ids.map(i=>i+'='+el(i).value).join('&')).finally(()=>{busy=false})}
ids.forEach(i=>{el(i).oninput=send;el(i).onchange=send});
el('go').onclick=()=>fetch('/run?on=1');el('stop').onclick=()=>fetch('/run?on=0');
el('save').onclick=()=>fetch('/save').then(()=>alert('saved'));
async function poll(){try{const j=await (await fetch('/state')).json();
document.querySelectorAll('.d').forEach((d,n)=>d.className='d'+(j.s[n]?' on':''));
el('pos').textContent='position '+j.pos+(j.run?'  RUNNING':'  stopped');
if(first){ids.forEach(i=>el(i).value=j[i]);labels();first=false}}catch(e){}}
setInterval(poll,250);poll();
</script></body></html>)html";

void setMotor(int pwmPin, int in1, int in2, int speed) {   // -100..100
  speed = constrain(speed, -100, 100);
  digitalWrite(in1, speed > 0 ? HIGH : LOW);
  digitalWrite(in2, speed < 0 ? HIGH : LOW);
  ledcWrite(pwmPin, abs(speed) * MAX_DUTY / 100);
}

void stopMotors() {
  setMotor(PWMA, AIN1, AIN2, 0);
  setMotor(PWMB, BIN1, BIN2, 0);
}

// weighted average of the active sensors: -2000 (far left) .. 2000 (far right)
bool readLine() {
  long sum = 0;
  int count = 0;
  for (int i = 0; i < 5; i++) {
    bool level = digitalRead(SENSOR_PINS[i]) == HIGH;
    bits[i] = (level == BLACK_READS_HIGH) ? 1 : 0;
    if (bits[i]) { sum += (i - 2) * 1000L; count++; }
  }
  if (count == 0) {                          // lost: keep turning towards the last side seen
    position = lastError >= 0 ? 2500 : -2500;
    return false;
  }
  position = count == 5 ? 0 : sum / count;  // all five = crossing, go straight
  return true;
}

void printGains() {
  Serial.printf("gains kp=%.3f ki=%.4f kd=%.3f base=%d\\n", kp, ki, kd, base);
}

void handleRoot() { server.send_P(200, "text/html", PAGE); }

void handleSet() {
  if (server.hasArg("kp")) kp = constrain(server.arg("kp").toFloat(), 0.0f, 1.0f);
  if (server.hasArg("ki")) ki = constrain(server.arg("ki").toFloat(), 0.0f, 0.1f);
  if (server.hasArg("kd")) kd = constrain(server.arg("kd").toFloat(), 0.0f, 10.0f);
  if (server.hasArg("base")) base = constrain(server.arg("base").toInt(), 0, 100);
  printGains();
  server.send(200, "text/plain", "ok");
}

void handleRun() {
  running = server.arg("on") == "1";
  integral = 0;
  lastSeen = millis();
  if (!running) stopMotors();
  Serial.println(running ? "RUN" : "STOP");
  server.send(200, "text/plain", "ok");
}

void handleSave() {
  prefs.putFloat("kp", kp);
  prefs.putFloat("ki", ki);
  prefs.putFloat("kd", kd);
  prefs.putInt("base", base);
  Serial.println("gains saved to flash");
  server.send(200, "text/plain", "saved");
}

void handleState() {
  char buf[200];
  snprintf(buf, sizeof buf,
           "{\\"s\\":[%d,%d,%d,%d,%d],\\"pos\\":%ld,\\"run\\":%d,\\"kp\\":%.3f,\\"ki\\":%.5f,\\"kd\\":%.2f,\\"base\\":%d}",
           bits[0], bits[1], bits[2], bits[3], bits[4], position, running ? 1 : 0, kp, ki, kd, base);
  server.send(200, "application/json", buf);
}

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < 5; i++) pinMode(SENSOR_PINS[i], INPUT);
  pinMode(AIN1, OUTPUT);
  pinMode(AIN2, OUTPUT);
  pinMode(BIN1, OUTPUT);
  pinMode(BIN2, OUTPUT);
  pinMode(STBY, OUTPUT);
  ledcAttach(PWMA, PWM_FREQ, PWM_RESOLUTION);
  ledcAttach(PWMB, PWM_FREQ, PWM_RESOLUTION);
  stopMotors();
  digitalWrite(STBY, HIGH);

  prefs.begin("linepid", false);
  kp = prefs.getFloat("kp", kp);
  ki = prefs.getFloat("ki", ki);
  kd = prefs.getFloat("kd", kd);
  base = prefs.getInt("base", base);

  WiFi.mode(WIFI_AP);
  WiFi.softAP(AP_SSID, AP_PASS);
  server.on("/", handleRoot);
  server.on("/set", handleSet);
  server.on("/run", handleRun);
  server.on("/save", handleSave);
  server.on("/state", handleState);
  server.begin();
  Serial.printf("Join Wi-Fi %s, open http://%s\\n", AP_SSID, WiFi.softAPIP().toString().c_str());
  printGains();
}

void loop() {
  server.handleClient();
  if (micros() - lastTick < LOOP_US) return;
  lastTick = micros();

  bool seen = readLine();
  if (seen) lastSeen = millis();
  if (!running) return;
  if (millis() - lastSeen > LOST_MS) {
    running = false;
    stopMotors();
    Serial.println("line lost, stopped");
    return;
  }

  long error = position;                     // target is 0 = line under the middle sensor
  integral = constrain(integral + error, -30000.0f, 30000.0f);
  float correction = kp * error + ki * integral + kd * (error - lastError);
  lastError = error;
  setMotor(PWMA, AIN1, AIN2, base + (int)correction);   // line to the right -> left wheel faster
  setMotor(PWMB, BIN1, BIN2, base - (int)correction);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Robot runs away from the line instead of following it", ru: "Робот уходит от линии вместо того, чтобы ехать по ней", kk: "Робот сызықпен жүрудің орнына одан алыстайды" },
      cause: { en: "The sensor order is mirrored, or the motors are swapped left/right.", ru: "Порядок датчиков зеркальный, или моторы перепутаны местами.", kk: "Датчиктер реті айналы немесе моторлар орны ауысқан." },
      fix: { en: "In the web view, moving the line to the right must make the position positive. Then press START with speed 20: a line on the right must speed up the left wheel.", ru: "В веб-виде линия справа должна давать положительную позицию. Затем START на скорости 20: линия справа должна ускорять левое колесо.", kk: "Веб-көріністе оң жақтағы сызық позицияны оң етуі керек. Содан соң 20 жылдамдықта START: оң жақтағы сызық сол дөңгелекті жылдамдатуы керек." },
    },
    {
      symptom: { en: "All five dots stay lit or dark whatever you do", ru: "Все пять точек всегда горят или всегда тёмные", kk: "Бес нүкте де әрқашан жанып не сөніп тұрады" },
      cause: { en: "Trimmers set to an extreme, the bar is too high, or at 3.3 V the IR LEDs are too weak for that height.", ru: "Подстроечники в крайнем положении, линейка слишком высоко, или при 3,3 В ИК-светодиодам не хватает яркости на этой высоте.", kk: "Баптағыштар шеткі күйде, сызғыш тым биік, немесе 3,3 В-та ИҚ жарық диодтары бұл биіктікке әлсіз." },
      fix: { en: "Lower the bar to 5 mm and turn each trimmer slowly until its indicator just flips over the tape.", ru: "Опустите линейку до 5 мм и медленно крутите каждый подстроечник, пока индикатор не начнёт переключаться над лентой.", kk: "Сызғышты 5 мм-ге түсіріп, әр баптағышты индикатор таспа үстінде ауыса бастағанша баяу бұраңыз." },
    },
    {
      symptom: { en: "It follows the line but zig-zags harder and harder", ru: "Едет по линии, но виляет всё сильнее", kk: "Сызықпен жүреді, бірақ барған сайын қатты бұлаңдайды" },
      cause: { en: "Kp is too high for the speed, or Kd is too low.", ru: "Kp слишком велик для этой скорости или Kd слишком мал.", kk: "Бұл жылдамдыққа Kp тым үлкен немесе Kd тым аз." },
      fix: { en: "Lower Kp by a third and raise Kd until the wiggle damps out within one swing.", ru: "Уменьшите Kp на треть и поднимайте Kd, пока качание не затухает за один размах.", kk: "Kp-ны үштен біріне азайтып, тербеліс бір тербелісте басылғанша Kd-ны көтеріңіз." },
    },
    {
      symptom: { en: "The robot stops with \"line lost, stopped\" in sharp corners", ru: "В крутых поворотах робот останавливается с «line lost, stopped»", kk: "Тік бұрылыстарда робот «line lost, stopped» деп тоқтайды" },
      cause: { en: "It overshoots and the line leaves the bar for more than LOST_MS.", ru: "Он проскакивает поворот, и линия уходит из-под линейки дольше LOST_MS.", kk: "Ол бұрылыстан асып кетіп, сызық LOST_MS-тен ұзақ уақыт сызғыштан шығып кетеді." },
      fix: { en: "Lower the speed, raise Kd, or increase LOST_MS to 1500.", ru: "Снизьте скорость, поднимите Kd или увеличьте LOST_MS до 1500.", kk: "Жылдамдықты азайтыңыз, Kd-ны көтеріңіз немесе LOST_MS-ті 1500-ге дейін ұлғайтыңыз." },
    },
  ],
  safety: [
    { en: "Never power the sensor bar from 5 V on this robot: its outputs would then put 5 V on ESP32 pins.", ru: "Не питайте линейку датчиков от 5 В в этом роботе: тогда её выходы подадут 5 В на пины ESP32.", kk: "Бұл роботта датчиктер сызғышын 5 В-тан қоректендірмеңіз: сонда оның шығыстары ESP32 пиндеріне 5 В береді." },
    { en: "Charge the LiPo with a balance charger and stop when the robot slows down.", ru: "Заряжайте LiPo балансирным зарядником и прекращайте заезды, когда робот замедлился.", kk: "LiPo-ны теңгерімдік зарядтағышпен зарядтаңыз және робот баяулағанда тоқтатыңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Join Wi-Fi ropros-line, open http://192.168.4.1",
      "gains kp=0.040 ki=0.0000 kd=0.300 base=40",
      "RUN",
      "gains kp=0.050 ki=0.0000 kd=0.300 base=40",
      "gains kp=0.050 ki=0.0000 kd=0.400 base=40",
      "gains kp=0.050 ki=0.0000 kd=0.400 base=55",
      "gains saved to flash",
      "STOP",
    ],
    leds: [],
  },
} satisfies GuideContent;
