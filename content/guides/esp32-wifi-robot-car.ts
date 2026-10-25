import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-wifi-robot-car",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "robotics",
  robotics: true,
  difficulty: "intermediate",
  hours: 4,
  costUsd: 29,
  xpReward: 240,
  title: {
    en: "ESP32 Wi-Fi Robot Car",
    ru: "Wi-Fi робот-машинка на ESP32",
    kk: "ESP32 негізіндегі Wi-Fi робот-көлік",
  },
  summary: {
    en: "A 2WD car that makes its own Wi-Fi hotspot: open one page on your phone and drive it with a touch joystick. TB6612FNG driver, 2S battery, auto-stop if the signal drops.",
    ru: "Машинка 2WD со своей точкой доступа Wi-Fi: откройте страницу на телефоне и рулите сенсорным джойстиком. Драйвер TB6612FNG, батарея 2S, автостоп при потере связи.",
    kk: "Өз Wi-Fi нүктесін жасайтын 2WD көлік: телефонда бір бетті ашып, сенсорлы джойстикпен басқарыңыз. TB6612FNG драйвері, 2S батарея, байланыс үзілсе автотоқтау.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32-WROOM-32 DevKit, 30 or 38 pins", ru: "ESP32-WROOM-32 DevKit, 30 или 38 пинов", kk: "ESP32-WROOM-32 DevKit, 30 не 38 пин" }, role: { en: "Brain, Wi-Fi hotspot and web server", ru: "Мозг, точка доступа Wi-Fi и веб-сервер", kk: "Ми, Wi-Fi нүктесі және веб-сервер" } },
    { component: "tb6612fng", qty: 1, spec: { en: "breakout, 1.2 A per channel, VM up to 13.5 V", ru: "модуль, 1,2 А на канал, VM до 13,5 В", kk: "модуль, арнаға 1,2 А, VM 13,5 В-қа дейін" }, role: { en: "Dual motor driver, happy with 3.3 V logic", ru: "Двухканальный драйвер, работает с логикой 3,3 В", kk: "Екі арналы драйвер, 3,3 В логикамен жұмыс істейді" } },
    { component: "dc-motor", qty: 2, spec: { en: "TT gear motor 1:48, 3–6 V", ru: "мотор-редуктор TT 1:48, 3–6 В", kk: "TT редукторлы мотор 1:48, 3–6 В" }, role: { en: "Left and right wheels", ru: "Левое и правое колёса", kk: "Сол және оң дөңгелектер" } },
    { component: "robot-chassis-2wd", qty: 1, spec: { en: "acrylic deck, 2 wheels + caster", ru: "акриловая платформа, 2 колеса + опорное колесо", kk: "акрил платформа, 2 дөңгелек + тірек дөңгелегі" }, role: { en: "Frame", ru: "Рама", kk: "Рама" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V 2S, 1000–2200 mAh, with a balance charger", ru: "7,4 В 2S, 1000–2200 мА·ч, с балансирным зарядником", kk: "7,4 В 2S, 1000–2200 мА·сағ, теңгерімдік зарядтағышпен" }, role: { en: "Main power", ru: "Основное питание", kk: "Негізгі қуат" } },
    { component: "buck-converter-lm2596", qty: 1, spec: { en: "LM2596 module, set to 5.0 V", ru: "модуль LM2596, выставлен на 5,0 В", kk: "LM2596 модулі, 5,0 В-қа бапталған" }, role: { en: "Clean 5 V for the ESP32", ru: "Чистые 5 В для ESP32", kk: "ESP32 үшін таза 5 В" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT toggle (MTS-102) or slide switch rated 3 A+", ru: "SPDT тумблер (MTS-102) или движковый на ток от 3 А", kk: "SPDT тумблер (MTS-102) не 3 А-дан жоғары токқа арналған жылжымалы ажыратқыш" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі ажыратқыш" } },
    { component: "jumper-wires", qty: 20, spec: { en: "male-female and male-male", ru: "папа-мама и папа-папа", kk: "аталық-аналық және аталық-аталық" }, role: { en: "Signal wiring", ru: "Сигнальные провода", kk: "Сигнал сымдары" } },
  ],
  instances: [
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
    { id: "buck", component: "buck-converter-lm2596", label: "Buck 5.0 V" },
    { id: "drv", component: "tb6612fng", label: "TB6612FNG" },
    { id: "m_left", component: "dc-motor", label: "Left motor" },
    { id: "m_right", component: "dc-motor", label: "Right motor" },
  ],
  connections: [
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "buck.IN+", color: "red" },
    { from: "sw.1", to: "drv.VM", color: "red", note: { en: "motor supply straight from the pack", ru: "питание моторов прямо от батареи", kk: "моторлардың қуаты тікелей батареядан" } },
    { from: "bat.-", to: "buck.IN-", color: "black" },
    { from: "bat.-", to: "drv.GND", color: "black", note: { en: "motor current returns here, not through the ESP32", ru: "ток моторов возвращается сюда, а не через ESP32", kk: "мотор тогы ESP32 арқылы емес, осында қайтады" } },
    { from: "buck.OUT+", to: "board.5V", color: "red", note: { en: "set the buck to 5.0 V before connecting", ru: "выставьте 5,0 В до подключения", kk: "қоспас бұрын 5,0 В орнатыңыз" } },
    { from: "buck.OUT-", to: "board.GND", color: "black" },
    { from: "drv.VCC", to: "board.3V3", color: "orange", note: { en: "logic side of the driver runs at 3.3 V", ru: "логика драйвера работает от 3,3 В", kk: "драйвер логикасы 3,3 В-пен жұмыс істейді" } },
    { from: "drv.GND2", to: "board.GND2", color: "black" },
    { from: "board.GPIO25", to: "drv.PWMA", color: "yellow" },
    { from: "board.GPIO26", to: "drv.AIN1", color: "green" },
    { from: "board.GPIO27", to: "drv.AIN2", color: "blue" },
    { from: "board.GPIO33", to: "drv.STBY", color: "white", note: { en: "LOW parks both motors", ru: "LOW отключает оба мотора", kk: "LOW екі моторды да ажыратады" } },
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
      title: { en: "Set the buck converter to 5.0 V first", ru: "Сначала выставьте 5,0 В на преобразователе", kk: "Алдымен түрлендіргішті 5,0 В-қа баптаңыз" },
      body: {
        en: "Before the ESP32 is anywhere near it: connect the battery through the switch to buck IN+ / IN-, switch on and measure OUT+ to OUT- with a multimeter. Turn the brass screw of the blue trimmer until it reads 5.0–5.1 V. New modules often ship set to 12 V or more, which would destroy the ESP32 instantly.",
        ru: "Пока ESP32 не подключён: подайте батарею через выключатель на IN+ / IN- преобразователя, включите и измерьте мультиметром напряжение между OUT+ и OUT-. Вращайте латунный винт синего подстроечника, пока не будет 5,0–5,1 В. Новые модули часто приходят настроенными на 12 В и выше, а это мгновенно убьёт ESP32.",
        kk: "ESP32 әлі қосылмағанда: батареяны ажыратқыш арқылы түрлендіргіштің IN+ / IN- пиндеріне беріп, қосыңыз да, OUT+ пен OUT- арасындағы кернеуді мультиметрмен өлшеңіз. Көк баптағыштың жез бұрандасын 5,0–5,1 В болғанша бұраңыз. Жаңа модульдер көбіне 12 В және одан жоғары кернеуге бапталып келеді, бұл ESP32-ні бірден күйдіреді.",
      },
      expect: { en: "The meter shows 5.0–5.1 V and stays there when you flick the switch off and on.", ru: "Мультиметр показывает 5,0–5,1 В и держит их после выключения и включения.", kk: "Мультиметр 5,0–5,1 В көрсетеді және ажыратып-қосқаннан кейін де сол күйде қалады." },
      mistake: { en: "Trusting the module's factory setting. Always measure before connecting a board.", ru: "Довериться заводской настройке модуля. Всегда измеряйте перед подключением платы.", kk: "Модульдің зауыттық баптауына сену. Тақтаны қоспас бұрын әрқашан өлшеңіз." },
    },
    {
      title: { en: "Build the chassis", ru: "Соберите шасси", kk: "Шассиді құрастырыңыз" },
      body: {
        en: "Solder two wires to each TT motor (red to the tab marked +, or either tab if unmarked), bolt the motors and the caster to the deck and press on the wheels. Fix the battery low and in the middle, the ESP32 and the TB6612FNG on top with double-sided tape or standoffs, and the switch where you can reach it.",
        ru: "Припаяйте по два провода к каждому мотору TT (красный к выводу +, если маркировки нет, к любому), прикрутите моторы и опорное колесо к платформе, наденьте колёса. Батарею закрепите низко и по центру, ESP32 и TB6612FNG сверху на двусторонний скотч или стойки, выключатель там, где до него легко дотянуться.",
        kk: "Әр TT моторына екі сым дәнекерлеңіз (қызылын + белгісі бар шығысқа, белгі болмаса кез келгеніне), моторлар мен тірек дөңгелегін платформаға бұраңыз да, дөңгелектерді кигізіңіз. Батареяны төмен әрі ортаға, ESP32 мен TB6612FNG-ні үстіне екі жақты скотчпен не тіреуіштермен бекітіңіз, ажыратқышты қол оңай жететін жерге орнатыңыз.",
      },
      expect: { en: "Wheels spin freely by hand and the car sits level.", ru: "Колёса свободно крутятся рукой, машинка стоит ровно.", kk: "Дөңгелектер қолмен еркін айналады, көлік тегіс тұрады." },
      mistake: { en: "Soldering on the motor while it hangs by its wires snaps the fragile tabs; fix it first.", ru: "Если паять мотор, пока он висит на проводах, хрупкие выводы отламываются; сначала закрепите его.", kk: "Мотор сымдарында салбырап тұрғанда дәнекерлесеңіз, нәзік шығыстары сынады; алдымен оны бекітіңіз." },
    },
    {
      title: { en: "Wire the power", ru: "Подключите питание", kk: "Қуатты қосыңыз" },
      body: {
        en: "Battery + goes to the switch middle pin C; switch pin 1 feeds buck IN+ and TB6612FNG VM. Battery − goes to buck IN- and to the driver GND next to VM, so motor current never flows through the ESP32. Buck OUT+ goes to the ESP32 5V pin, OUT- to GND. The driver's VCC goes to 3V3 and its second GND to the ESP32 GND2. Keep the switch OFF whenever USB is plugged in: the 5V pin is then fed from two sources at once.",
        ru: "Плюс батареи идёт на средний вывод C выключателя; вывод 1 питает IN+ преобразователя и VM драйвера TB6612FNG. Минус батареи идёт на IN- преобразователя и на GND драйвера рядом с VM, чтобы ток моторов не шёл через ESP32. OUT+ преобразователя идёт на пин 5V платы ESP32, OUT- на GND. VCC драйвера подключите к 3V3, его второй GND к GND2 ESP32. Когда подключён USB, держите выключатель в положении OFF: иначе пин 5V питается сразу от двух источников.",
        kk: "Батареяның плюсі ажыратқыштың ортаңғы C шығысына барады; 1-шығыс түрлендіргіштің IN+ пинін және TB6612FNG драйверінің VM пинін қоректендіреді. Батареяның минусы түрлендіргіштің IN- пиніне және VM жанындағы драйвердің GND пиніне барады, сонда мотор тогы ESP32 арқылы өтпейді. Түрлендіргіштің OUT+ пині ESP32-нің 5V пиніне, OUT- GND-ге барады. Драйвердің VCC пинін 3V3-ке, екінші GND-сын ESP32-нің GND2 пиніне қосыңыз. USB қосулы кезде ажыратқышты OFF күйінде ұстаңыз: әйтпесе 5V пині бір мезгілде екі көзден қоректенеді.",
      },
      expect: { en: "Switch on with no USB: the ESP32 power LED lights, nothing moves, nothing gets warm.", ru: "Включите без USB: на ESP32 горит светодиод питания, ничего не крутится и не греется.", kk: "USB-сіз қосыңыз: ESP32-де қуат шамы жанады, ештеңе айналмайды, ештеңе қызбайды." },
      mistake: { en: "Feeding the 7.4 V pack straight into the 5V pin. It must always go through the buck.", ru: "Подать 7,4 В батареи прямо на пин 5V. Только через преобразователь.", kk: "7,4 В батареяны тікелей 5V пиніне беру. Тек түрлендіргіш арқылы." },
    },
    {
      title: { en: "Wire the motor signals", ru: "Подключите сигналы моторов", kk: "Мотор сигналдарын қосыңыз" },
      body: {
        en: "Left motor (channel A): PWMA → GPIO25, AIN1 → GPIO26, AIN2 → GPIO27. Right motor (channel B): BIN1 → GPIO13, BIN2 → GPIO14, PWMB → GPIO32. STBY → GPIO33. Then the motor leads: left motor to AO1 / AO2, right motor to BO1 / BO2. The TB6612FNG switches cleanly at 3.3 V, so no level shifting is needed.",
        ru: "Левый мотор (канал A): PWMA → GPIO25, AIN1 → GPIO26, AIN2 → GPIO27. Правый мотор (канал B): BIN1 → GPIO13, BIN2 → GPIO14, PWMB → GPIO32. STBY → GPIO33. Затем выводы моторов: левый на AO1 / AO2, правый на BO1 / BO2. TB6612FNG уверенно переключается от 3,3 В, преобразователь уровней не нужен.",
        kk: "Сол мотор (A арнасы): PWMA → GPIO25, AIN1 → GPIO26, AIN2 → GPIO27. Оң мотор (B арнасы): BIN1 → GPIO13, BIN2 → GPIO14, PWMB → GPIO32. STBY → GPIO33. Содан кейін мотор сымдары: сол моторды AO1 / AO2-ге, оңын BO1 / BO2-ге. TB6612FNG 3,3 В-тан сенімді ауысады, деңгей түрлендіргіші қажет емес.",
      },
      expect: { en: "Seven signal wires from the ESP32 to the driver, four motor leads.", ru: "Семь сигнальных проводов от ESP32 к драйверу, четыре провода моторов.", kk: "ESP32-ден драйверге жеті сигнал сымы, моторлардың төрт сымы." },
      mistake: { en: "Using GPIO34–39 for outputs: they are input-only and the motor never starts.", ru: "Взять GPIO34–39 для выходов: эти пины только на вход, мотор не запустится.", kk: "Шығыс үшін GPIO34–39 алу: бұл пиндер тек кіріске арналған, мотор іске қосылмайды." },
    },
    {
      title: { en: "Upload the sketch", ru: "Загрузите скетч", kk: "Скетчті жүктеңіз" },
      body: {
        en: "Install the \"esp32 by Espressif\" board package (3.x) and select \"ESP32 Dev Module\". In the sketch change AP_PASS to your own password (8+ characters). Switch the battery OFF, connect USB, upload and open the Serial Monitor at 115200 baud. Lift the car so the wheels hang free for the first test.",
        ru: "Установите пакет плат «esp32 by Espressif» (3.x) и выберите «ESP32 Dev Module». В скетче замените AP_PASS на свой пароль (от 8 символов). Выключите батарею, подключите USB, загрузите скетч и откройте Serial Monitor на 115200 бод. Для первого теста поставьте машинку на подставку, чтобы колёса висели в воздухе.",
        kk: "«esp32 by Espressif» (3.x) платалар пакетін орнатып, «ESP32 Dev Module» таңдаңыз. Скетчте AP_PASS-ты өз құпия сөзіңізге ауыстырыңыз (8 таңбадан кем емес). Батареяны ажыратып, USB қосыңыз, скетчті жүктеп, Serial Monitor-ды 115200 бодта ашыңыз. Алғашқы сынақта дөңгелектер ауада ілініп тұруы үшін көлікті тірекке қойыңыз.",
      },
      expect: { en: "\"Join Wi-Fi ropros-car, open http://192.168.4.1\" in the monitor.", ru: "В мониторе «Join Wi-Fi ropros-car, open http://192.168.4.1».", kk: "Мониторда «Join Wi-Fi ropros-car, open http://192.168.4.1»." },
      mistake: { en: "A password shorter than 8 characters makes softAP fail silently and no network appears.", ru: "Пароль короче 8 символов — и softAP молча не стартует, сети не будет.", kk: "Құпия сөз 8 таңбадан қысқа болса, softAP үнсіз іске қосылмайды, желі пайда болмайды." },
    },
    {
      title: { en: "Drive from your phone", ru: "Управляйте с телефона", kk: "Телефоннан басқарыңыз" },
      body: {
        en: "Unplug USB, switch the battery ON, join the ropros-car network on your phone and open http://192.168.4.1. Drag the orange knob: up drives forward, sideways turns. If a wheel spins backwards, swap that motor's two wires on the driver. Close the page while driving: within half a second the car stops by itself.",
        ru: "Отключите USB, включите батарею, подключите телефон к сети ropros-car и откройте http://192.168.4.1. Тяните оранжевую ручку: вверх — вперёд, вбок — поворот. Если колесо крутится назад, поменяйте местами два провода этого мотора на драйвере. Закройте страницу на ходу: через полсекунды машинка остановится сама.",
        kk: "USB-ді ажыратып, батареяны қосыңыз, телефонды ropros-car желісіне қосып, http://192.168.4.1 ашыңыз. Қызғылт сары тұтқаны тартыңыз: жоғары — алға, бүйірге — бұрылыс. Дөңгелек кері айналса, сол мотордың драйвердегі екі сымын ауыстырыңыз. Жүріп келе жатқанда бетті жабыңыз: жарты секундта көлік өзі тоқтайды.",
      },
      expect: { en: "Smooth proportional speed and steering, and an automatic stop when the link drops.", ru: "Плавная пропорциональная скорость и руление, автоматическая остановка при потере связи.", kk: "Жылдамдық пен бұрылыс бір қалыпты, байланыс үзілсе автоматты түрде тоқтайды." },
      mistake: { en: "Leaving mobile data on: some phones then route the page over 4G and it never loads.", ru: "Оставить мобильный интернет: некоторые телефоны тогда идут через 4G, и страница не открывается.", kk: "Мобильді интернетті қосулы қалдыру: кейбір телефондар бетті 4G арқылы ашпақ болып, ол жүктелмейді." },
    },
  ],
  code: [{
    filename: "wifi_robot_car.ino",
    language: "cpp",
    libraries: [],
    source: `#include <WiFi.h>
#include <WebServer.h>

// ---- the car's own Wi-Fi hotspot: CHANGE the password (8+ characters) ----
const char* AP_SSID = "ropros-car";
const char* AP_PASS = "YOUR_PASSWORD";

// ---- TB6612FNG pins ----
const int PWMA = 25, AIN1 = 26, AIN2 = 27;   // left motor (channel A)
const int PWMB = 32, BIN1 = 13, BIN2 = 14;   // right motor (channel B)
const int STBY = 33;                         // HIGH = driver enabled

const int PWM_FREQ = 20000;                  // 20 kHz: no motor whine
const int PWM_RESOLUTION = 8;                // duty 0..255
const int MAX_DUTY = 180;                    // 8.4 V pack on 6 V motors: cap at ~70 %
const int MIN_DUTY = 60;                     // below this TT motors only hum
const unsigned long FAILSAFE_MS = 500;       // stop if the phone goes quiet

WebServer server(80);
unsigned long lastCmd = 0, lastLog = 0;
int curLeft = 0, curRight = 0;

const char PAGE[] PROGMEM = R"html(<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"><title>ropros car</title>
<style>body{margin:0;background:#0b0f14;color:#e6edf3;font-family:system-ui,sans-serif;text-align:center;touch-action:none;user-select:none}
#pad{width:280px;height:280px;border-radius:50%;background:#16202b;border:2px solid #2a3644;margin:40px auto 16px;position:relative}
#knob{width:90px;height:90px;border-radius:50%;background:#ff7a1a;position:absolute;left:95px;top:95px}#st{color:#8b98a5}</style></head>
<body><h2>ropros car</h2><div id="pad"><div id="knob"></div></div><p id="st">x 0 y 0</p>
<script>
const pad=document.getElementById('pad'),knob=document.getElementById('knob'),st=document.getElementById('st');
let x=0,y=0,held=false,busy=false;const R=95;
function put(dx,dy){knob.style.left=(95+dx)+'px';knob.style.top=(95+dy)+'px'}
function move(e){const b=pad.getBoundingClientRect();let dx=e.clientX-b.left-140,dy=e.clientY-b.top-140;
const d=Math.hypot(dx,dy);if(d>R){dx*=R/d;dy*=R/d}put(dx,dy);x=Math.round(dx/R*100);y=Math.round(-dy/R*100)}
pad.onpointerdown=e=>{held=true;pad.setPointerCapture(e.pointerId);move(e)};
pad.onpointermove=e=>{if(held)move(e)};
pad.onpointerup=pad.onpointercancel=()=>{held=false;x=0;y=0;put(0,0)};
setInterval(()=>{st.textContent='x '+x+'  y '+y;if(busy)return;busy=true;
fetch('/drive?x='+x+'&y='+y).then(()=>{st.style.color='#2ee6c9'}).catch(()=>{st.style.color='#e5484d'}).finally(()=>{busy=false})},100);
</script></body></html>)html";

// speed: -100..100 (negative = backwards)
void setMotor(int pwmPin, int in1, int in2, int speed) {
  speed = constrain(speed, -100, 100);
  if (abs(speed) < 5) speed = 0;
  digitalWrite(in1, speed > 0 ? HIGH : LOW);
  digitalWrite(in2, speed < 0 ? HIGH : LOW);
  int duty = speed == 0 ? 0 : map(abs(speed), 5, 100, MIN_DUTY, MAX_DUTY);
  ledcWrite(pwmPin, duty);
}

// arcade mix: y = throttle, x = steering
void drive(int x, int y) {
  int left = y + x;
  int right = y - x;
  int biggest = max(abs(left), abs(right));
  if (biggest > 100) {
    left = left * 100 / biggest;
    right = right * 100 / biggest;
  }
  setMotor(PWMA, AIN1, AIN2, left);
  setMotor(PWMB, BIN1, BIN2, right);
  if ((left != curLeft || right != curRight) && millis() - lastLog > 300) {
    Serial.printf("L=%d R=%d\\n", left, right);
    lastLog = millis();
  }
  curLeft = left;
  curRight = right;
}

void handleRoot() { server.send_P(200, "text/html", PAGE); }

void handleDrive() {
  int x = constrain(server.arg("x").toInt(), -100, 100);
  int y = constrain(server.arg("y").toInt(), -100, 100);
  drive(x, y);
  lastCmd = millis();
  server.send(200, "text/plain", "ok");
}

void setup() {
  Serial.begin(115200);
  pinMode(AIN1, OUTPUT);
  pinMode(AIN2, OUTPUT);
  pinMode(BIN1, OUTPUT);
  pinMode(BIN2, OUTPUT);
  pinMode(STBY, OUTPUT);
  ledcAttach(PWMA, PWM_FREQ, PWM_RESOLUTION);
  ledcAttach(PWMB, PWM_FREQ, PWM_RESOLUTION);
  drive(0, 0);
  digitalWrite(STBY, HIGH);

  WiFi.mode(WIFI_AP);
  if (!WiFi.softAP(AP_SSID, AP_PASS)) Serial.println("softAP failed: password must be 8+ characters");
  server.on("/", handleRoot);
  server.on("/drive", handleDrive);
  server.begin();
  Serial.println("ropros car ready");
  Serial.printf("Join Wi-Fi %s, open http://%s\\n", AP_SSID, WiFi.softAPIP().toString().c_str());
}

void loop() {
  server.handleClient();
  if ((curLeft != 0 || curRight != 0) && millis() - lastCmd > FAILSAFE_MS) {
    drive(0, 0);
    Serial.println("failsafe: no command, stop");
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The ESP32 resets every time the motors start", ru: "ESP32 перезагружается при каждом старте моторов", kk: "Моторлар іске қосылған сайын ESP32 қайта жүктеледі" },
      cause: { en: "Motor current returns through the ESP32 ground, or the battery is nearly flat and sags below what the buck needs (~6.5 V).", ru: "Ток моторов возвращается через землю ESP32, или батарея почти разряжена и проседает ниже нужных преобразователю ~6,5 В.", kk: "Мотор тогы ESP32 жері арқылы қайтады, немесе батарея отырып қалған және түрлендіргішке қажет ~6,5 В-тан төмен түседі." },
      fix: { en: "Run battery − straight to the driver GND as in the diagram, charge the pack, and keep MAX_DUTY at 180 or lower.", ru: "Проведите минус батареи прямо на GND драйвера, как на схеме, зарядите батарею и держите MAX_DUTY не выше 180.", kk: "Батарея минусын схемадағыдай тікелей драйвердің GND-не тартыңыз, батареяны зарядтаңыз және MAX_DUTY мәнін 180-нен асырмаңыз." },
    },
    {
      symptom: { en: "Car turns when it should go straight, or spins in place", ru: "Машинка поворачивает вместо прямой или крутится на месте", kk: "Көлік тура жүрудің орнына бұрылады немесе орнында айналады" },
      cause: { en: "One motor is wired with reversed polarity.", ru: "Один мотор подключён с обратной полярностью.", kk: "Бір мотор кері полярлықпен қосылған." },
      fix: { en: "Push the joystick straight up, find the wheel turning backwards and swap its two wires on AO1/AO2 or BO1/BO2.", ru: "Толкните джойстик строго вверх, найдите колесо, которое крутится назад, и поменяйте его провода на AO1/AO2 или BO1/BO2.", kk: "Джойстикті тура жоғары итеріңіз, кері айналатын дөңгелекті тауып, оның сымдарын AO1/AO2 не BO1/BO2-де ауыстырыңыз." },
    },
    {
      symptom: { en: "Page loads but the wheels do not move", ru: "Страница открывается, но колёса не крутятся", kk: "Бет ашылады, бірақ дөңгелектер айналмайды" },
      cause: { en: "STBY is not wired to GPIO33, VM has no battery voltage, or the switch is off.", ru: "STBY не подключён к GPIO33, на VM нет напряжения батареи, или выключатель выключен.", kk: "STBY GPIO33-ке қосылмаған, VM-де батарея кернеуі жоқ, немесе ажыратқыш өшірулі." },
      fix: { en: "Measure VM to GND (7–8.4 V) and STBY to GND (3.3 V while the sketch runs).", ru: "Измерьте VM относительно GND (7–8,4 В) и STBY относительно GND (3,3 В при работающем скетче).", kk: "VM мен GND арасын (7–8,4 В) және STBY мен GND арасын (скетч жұмыс істеп тұрғанда 3,3 В) өлшеңіз." },
    },
    {
      symptom: { en: "Steering lags or stutters", ru: "Руление запаздывает или дёргается", kk: "Басқару кешігеді немесе секіреді" },
      cause: { en: "The phone is far away or switches back to your home Wi-Fi.", ru: "Телефон далеко или сам переключается на домашний Wi-Fi.", kk: "Телефон алыста немесе үйдегі Wi-Fi-ға өздігінен ауысады." },
      fix: { en: "Stay within ~20 m, tell the phone to stay connected to ropros-car even without internet.", ru: "Держитесь в пределах ~20 м и разрешите телефону оставаться в сети ropros-car без интернета.", kk: "~20 м шегінде болыңыз және телефонға интернетсіз де ropros-car желісінде қалуға рұқсат беріңіз." },
    },
  ],
  safety: [
    { en: "Charge the 2S LiPo only with a balance charger, never unattended, and stop driving when the car slows down: over-discharge below 6.4 V damages the pack.", ru: "Заряжайте LiPo 2S только балансирным зарядником и под присмотром; заканчивайте езду, когда машинка замедлилась: разряд ниже 6,4 В портит батарею.", kk: "2S LiPo-ны тек теңгерімдік зарядтағышпен және бақылаумен зарядтаңыз; көлік баяулағанда жүруді тоқтатыңыз: 6,4 В-тан төмен разряд батареяны бұзады." },
    { en: "Never connect the battery to the ESP32 5V pin without the buck converter set to 5 V.", ru: "Никогда не подключайте батарею к пину 5V ESP32 без преобразователя, выставленного на 5 В.", kk: "Батареяны ешқашан 5 В-қа бапталған түрлендіргішсіз ESP32-нің 5V пиніне қоспаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "ropros car ready",
      "Join Wi-Fi ropros-car, open http://192.168.4.1",
      "L=62 R=62",
      "L=100 R=48",
      "L=100 R=100",
      "L=-70 R=-70",
      "L=0 R=0",
      "L=40 R=-40",
      "failsafe: no command, stop",
    ],
    leds: [],
  },
} satisfies GuideContent;
