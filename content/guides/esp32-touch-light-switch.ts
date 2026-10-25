import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-touch-light-switch",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "home",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 11,
  xpReward: 140,
  title: {
    en: "ESP32 Touch Light Switch",
    ru: "Сенсорный выключатель света на ESP32",
    kk: "ESP32 сенсорлы жарық қосқышы",
  },
  summary: {
    en: "Tap a TTP223 touch pad to switch a 12 V lamp through a relay, and see or flip the lamp state from a web page on your phone.",
    ru: "Касание сенсора TTP223 включает 12-вольтовую лампу через реле, а состояние лампы видно и переключается с веб-страницы на телефоне.",
    kk: "TTP223 сенсорына тию реле арқылы 12 В шамды қосады, ал шамның күйін телефондағы веб-беттен көріп, ауыстыруға болады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit (WROOM-32), USB powered", ru: "ESP32 DevKit (WROOM-32), питание от USB", kk: "ESP32 DevKit (WROOM-32), USB қуаты" }, role: { en: "Controller and web server", ru: "Контроллер и веб-сервер", kk: "Контроллер және веб-сервер" } },
    { component: "touch-ttp223", qty: 1, spec: { en: "TTP223 module, default momentary mode", ru: "модуль TTP223, режим по умолчанию (кнопка)", kk: "TTP223 модулі, әдепкі режим (батырма)" }, role: { en: "Touch pad", ru: "Сенсорная кнопка", kk: "Сенсорлы батырма" } },
    { component: "relay-module", qty: 1, spec: { en: "1-channel 5 V, with H/L trigger jumper, contacts ≥10 A", ru: "1 канал, 5 В, с перемычкой H/L, контакты ≥10 А", kk: "1 арна, 5 В, H/L секіргіші бар, түйіспелері ≥10 А" }, role: { en: "Switches the 12 V lamp", ru: "Коммутирует лампу 12 В", kk: "12 В шамды қосып-ажыратады" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-female and male-male", ru: "папа-мама и папа-папа", kk: "аталық-аналық және аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { component: "enclosure", qty: 1, spec: { en: "small plastic box, wall-plate size", ru: "небольшая пластиковая коробка размером с накладку выключателя", kk: "қосқыш қақпағындай шағын пластик қорап" }, role: { en: "Housing; the TTP223 senses through 2–3 mm of plastic", ru: "Корпус; TTP223 чувствует касание сквозь 2–3 мм пластика", kk: "Корпус; TTP223 2–3 мм пластик арқылы да тиюді сезеді" }, optional: true },
  ],
  instances: [
    { id: "touch", component: "touch-ttp223", label: "Touch pad" },
    { id: "relay", component: "relay-module", label: "Lamp relay" },
  ],
  connections: [
    { from: "board.3V3", to: "touch.VCC", color: "red", note: { en: "3.3 V supply keeps SIG at a safe 3.3 V level", ru: "питание 3,3 В, поэтому SIG тоже выдаёт безопасные 3,3 В", kk: "3,3 В қуат, сондықтан SIG те қауіпсіз 3,3 В береді" } },
    { from: "touch.GND", to: "board.GND", color: "black" },
    { from: "touch.SIG", to: "board.GPIO27", color: "yellow" },
    { from: "board.5V", to: "relay.VCC", color: "red", note: { en: "the relay coil needs 5 V; the 5V pin carries USB power", ru: "катушке реле нужно 5 В; на пин 5V приходит питание USB", kk: "реле катушкасына 5 В керек; 5V пиніне USB қуаты келеді" } },
    { from: "relay.GND", to: "board.GND2", color: "black" },
    { from: "board.GPIO26", to: "relay.IN", color: "orange", note: { en: "set the module jumper to H (high-level trigger)", ru: "перемычку модуля поставьте в H (управление высоким уровнем)", kk: "модуль секіргішін H күйіне қойыңыз (жоғары деңгеймен басқару)" } },
  ],
  steps: [
    {
      title: { en: "Wire the touch pad", ru: "Подключите сенсорную кнопку", kk: "Сенсорлы батырманы қосыңыз" },
      body: {
        en: "Plug the ESP32 into the breadboard so both pin rows are free. Connect TTP223 VCC to 3V3, GND to GND and SIG to GPIO27. Power it from 3.3 V, not 5 V: the module outputs its supply voltage on SIG, and ESP32 inputs are not 5 V tolerant.",
        ru: "Вставьте ESP32 в макетку так, чтобы оба ряда пинов были свободны. Подключите VCC модуля TTP223 к 3V3, GND к GND, а SIG к GPIO27. Питайте его от 3,3 В, а не от 5 В: модуль выдаёт на SIG напряжение своего питания, а входы ESP32 не выдерживают 5 В.",
        kk: "ESP32-ні макет тақтасына екі қатар пині де бос болатындай етіп орнатыңыз. TTP223 модулінің VCC-ін 3V3-ке, GND-ін GND-ге, SIG-ін GPIO27-ге қосыңыз. Оны 5 В-тан емес, 3,3 В-тан қоректендіріңіз: модуль SIG-ке өз қуат кернеуін береді, ал ESP32 кірістері 5 В-қа шыдамайды.",
      },
      expect: { en: "The small LED on the TTP223 lights while you touch the pad.", ru: "Маленький светодиод на TTP223 горит, пока вы касаетесь площадки.", kk: "Алаңшаға тиіп тұрғанда TTP223-тегі кішкентай жарық диоды жанады." },
      mistake: { en: "Powering the TTP223 from 5V puts 5 V on GPIO27 every time you touch it.", ru: "Если запитать TTP223 от 5V, при каждом касании на GPIO27 будет 5 В.", kk: "TTP223-ті 5V-тан қоректендірсеңіз, әр тиген сайын GPIO27-ге 5 В түседі." },
    },
    {
      title: { en: "Wire the relay module", ru: "Подключите модуль реле", kk: "Реле модулін қосыңыз" },
      body: {
        en: "Connect relay VCC to the ESP32 5V pin, GND to GND2 and IN to GPIO26. If your module has an H/L jumper, put it on H so a HIGH from the 3.3 V pin switches the relay on. In L (low-trigger) mode a 3.3 V HIGH often cannot fully release a 5 V module and the relay stays stuck on.",
        ru: "Подключите VCC реле к пину 5V платы ESP32, GND к GND2, а IN к GPIO26. Если на модуле есть перемычка H/L, поставьте её в H, чтобы HIGH с 3,3-вольтового пина включал реле. В режиме L (управление низким уровнем) 3,3 В часто не хватает, чтобы полностью отпустить 5-вольтовый модуль, и реле «залипает».",
        kk: "Реленің VCC-ін ESP32-нің 5V пиніне, GND-ін GND2-ге, IN-ін GPIO26-ға қосыңыз. Модульде H/L секіргіші болса, оны H күйіне қойыңыз, сонда 3,3 В пиннен келген HIGH релені қосады. L режимінде (төмен деңгеймен басқару) 3,3 В 5 вольттық модульді толық босатуға жетпей, реле қосулы күйде қалып қояды.",
      },
      expect: { en: "Nothing clicks yet; the relay LED stays off after power-up.", ru: "Пока ничего не щёлкает; после включения светодиод реле не горит.", kk: "Әзірге ештеңе шыртылдамайды; қосқаннан кейін реле жарық диоды сөнік тұрады." },
      mistake: { en: "Taking relay power from 3V3 is too weak for a 5 V coil, so the relay chatters or never pulls in.", ru: "Питание реле от 3V3 слишком слабое для катушки на 5 В: реле дребезжит или не срабатывает.", kk: "Релені 3V3-тен қоректендіру 5 В катушкаға әлсіз: реле дірілдейді немесе мүлде іске қосылмайды." },
    },
    {
      title: { en: "Connect the 12 V lamp to the relay contacts", ru: "Подключите лампу 12 В к контактам реле", kk: "12 В шамды реле түйіспелеріне қосыңыз" },
      body: {
        en: "Use a 12 V DC lamp (LED strip or 12 V bulb) with its own 12 V adapter. Run adapter + to the relay COM screw terminal, relay NO to the lamp +, and lamp − straight back to adapter −. The 12 V circuit does not touch the ESP32 at all: the relay contacts are isolated. These terminals are not on the diagram because the lamp and adapter are outside the logic circuit.",
        ru: "Возьмите лампу на 12 В постоянного тока (светодиодную ленту или лампочку 12 В) с отдельным адаптером 12 В. Плюс адаптера заведите на клемму COM реле, клемму NO на плюс лампы, а минус лампы верните прямо на минус адаптера. Цепь 12 В вообще не касается ESP32: контакты реле гальванически развязаны. На схеме этих клемм нет, потому что лампа и адаптер вне логической части.",
        kk: "Жеке 12 В адаптері бар 12 В тұрақты ток шамын (жарық диодты таспа немесе 12 В шам) алыңыз. Адаптердің плюсін реленің COM қысқышына, NO қысқышын шамның плюсіне, ал шамның минусын тікелей адаптердің минусына қосыңыз. 12 В тізбегі ESP32-ге мүлде тимейді: реле түйіспелері оқшауланған. Шам мен адаптер логикалық бөліктен тыс болғандықтан, бұл қысқыштар сұлбада көрсетілмеген.",
      },
      expect: { en: "The lamp is off; bridging COM and NO by hand (power off) would light it.", ru: "Лампа не горит; если (без питания) замкнуть COM и NO, она загорится.", kk: "Шам сөнік; COM мен NO-ны (қуатсыз) қолмен тұйықтасаңыз, ол жанады." },
      mistake: { en: "Using NC instead of NO inverts everything: the lamp is on whenever the relay is off.", ru: "Если взять NC вместо NO, всё наоборот: лампа горит, когда реле выключено.", kk: "NO орнына NC алсаңыз, бәрі керісінше болады: реле сөнгенде шам жанады." },
    },
    {
      title: { en: "Set Wi-Fi and upload", ru: "Укажите Wi-Fi и загрузите скетч", kk: "Wi-Fi-ды көрсетіп, скетчті жүктеңіз" },
      body: {
        en: "In the Arduino IDE install the esp32 board package by Espressif and select \"ESP32 Dev Module\". Put your network name and password into WIFI_SSID and WIFI_PASS (2.4 GHz networks only), upload, and open the Serial Monitor at 115200 baud.",
        ru: "В Arduino IDE установите пакет плат esp32 от Espressif и выберите «ESP32 Dev Module». Впишите имя сети и пароль в WIFI_SSID и WIFI_PASS (только сети 2,4 ГГц), загрузите скетч и откройте Serial Monitor на 115200 бод.",
        kk: "Arduino IDE-де Espressif шығарған esp32 платалар пакетін орнатып, «ESP32 Dev Module» таңдаңыз. WIFI_SSID пен WIFI_PASS-қа желі атауы мен құпиясөзін жазыңыз (тек 2,4 ГГц желілері), скетчті жүктеп, Serial Monitor-ды 115200 бодта ашыңыз.",
      },
      expect: { en: "The monitor prints the board's IP address, e.g. http://192.168.1.42/.", ru: "Монитор печатает IP-адрес платы, например http://192.168.1.42/.", kk: "Монитор платаның IP мекенжайын шығарады, мысалы http://192.168.1.42/." },
      mistake: { en: "A 5 GHz-only network never connects; the ESP32 radio is 2.4 GHz.", ru: "К сети только 5 ГГц плата не подключится: радио ESP32 работает на 2,4 ГГц.", kk: "Тек 5 ГГц желісіне плата қосылмайды: ESP32 радиосы 2,4 ГГц-те жұмыс істейді." },
    },
    {
      title: { en: "Test touch and web control", ru: "Проверьте касание и веб-управление", kk: "Тию мен веб-басқаруды тексеріңіз" },
      body: {
        en: "Tap the pad: the relay clicks and the lamp turns on; tap again to turn it off. Open the printed IP address on a phone in the same Wi-Fi. The page shows ON or OFF, refreshes every two seconds and has a Toggle button. A touch is counted only on the moment you start touching, so holding your finger does not flicker the lamp.",
        ru: "Коснитесь площадки: реле щёлкнет и лампа включится, повторное касание её выключит. Откройте напечатанный IP-адрес на телефоне в той же сети Wi-Fi. Страница показывает ON или OFF, обновляется каждые две секунды и имеет кнопку Toggle. Касание засчитывается только в момент прикосновения, поэтому если держать палец, лампа не мигает.",
        kk: "Алаңшаға тиіңіз: реле шырт етіп, шам жанады; қайта тисеңіз, сөнеді. Сол Wi-Fi желісіндегі телефонда шығарылған IP мекенжайын ашыңыз. Бет ON немесе OFF көрсетеді, әр екі секунд сайын жаңарады және Toggle батырмасы бар. Тию тек саусақ тиген сәтте ғана есептеледі, сондықтан саусақты ұстап тұрсаңыз да, шам жыпылықтамайды.",
      },
      expect: { en: "Touch and web button both switch the lamp, and the page follows touches within 2 s.", ru: "И касание, и кнопка на странице переключают лампу, а страница отражает касание в течение 2 с.", kk: "Тию де, беттегі батырма да шамды ауыстырады, ал бет тиюді 2 с ішінде көрсетеді." },
      mistake: { en: "If the relay toggles on its own, the touch wires are long and unshielded; keep SIG short and away from the 12 V wires.", ru: "Если реле переключается само, провода сенсора слишком длинные; сделайте SIG короче и уведите от проводов 12 В.", kk: "Реле өздігінен ауысса, сенсор сымдары тым ұзын; SIG-ті қысқартып, 12 В сымдарынан алыс ұстаңыз." },
    },
  ],
  code: [{
    filename: "touch_light_switch.ino",
    language: "cpp",
    libraries: [],
    source: `#include <WiFi.h>
#include <WebServer.h>

// ---- your network (2.4 GHz) ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";

const int TOUCH_PIN = 27;     // TTP223 SIG (HIGH while touched)
const int RELAY_PIN = 26;     // relay module IN
const int RELAY_ON = HIGH;    // module jumper on H (high-level trigger)
const int RELAY_OFF = LOW;
const unsigned long DEBOUNCE_MS = 250;

WebServer server(80);
bool lampOn = false;
bool lastTouch = false;
unsigned long lastToggle = 0;

const char PAGE[] PROGMEM = R"HTML(<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Lamp</title>
<style>
body{font-family:system-ui,sans-serif;background:#0f1115;color:#eee;text-align:center;padding-top:48px}
#s{font-size:56px;font-weight:700;margin:24px}
button{font-size:22px;padding:14px 44px;border:0;border-radius:14px;background:#ff7a1a;color:#111}
</style></head><body>
<h1>Lamp</h1><div id="s">...</div><button onclick="toggle()">Toggle</button>
<script>
function show(j){document.getElementById('s').textContent=j.on?'ON':'OFF';}
function poll(){fetch('/state').then(r=>r.json()).then(show).catch(()=>{});}
function toggle(){fetch('/toggle',{method:'POST'}).then(r=>r.json()).then(show);}
poll();setInterval(poll,2000);
</script></body></html>)HTML";

void setLamp(bool on, const char* source) {
  lampOn = on;
  digitalWrite(RELAY_PIN, on ? RELAY_ON : RELAY_OFF);
  Serial.printf("lamp %s (%s)\\n", on ? "ON" : "OFF", source);
}

void sendState() {
  server.send(200, "application/json", lampOn ? "{\\"on\\":true}" : "{\\"on\\":false}");
}

void setup() {
  Serial.begin(115200);
  digitalWrite(RELAY_PIN, RELAY_OFF);   // set the level before enabling the output
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(TOUCH_PIN, INPUT);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.printf("Connecting to %s", WIFI_SSID);
  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  if (WiFi.status() == WL_CONNECTED) {
    Serial.printf("Wi-Fi connected, open http://%s/\\n", WiFi.localIP().toString().c_str());
  } else {
    Serial.println("Wi-Fi not connected, touch still works (retrying in background)");
  }

  server.on("/", HTTP_GET, []() { server.send_P(200, "text/html", PAGE); });
  server.on("/state", HTTP_GET, sendState);
  server.on("/toggle", HTTP_POST, []() { setLamp(!lampOn, "web"); sendState(); });
  server.onNotFound([]() { server.send(404, "text/plain", "not found"); });
  server.begin();
}

void loop() {
  server.handleClient();

  bool touched = digitalRead(TOUCH_PIN) == HIGH;
  if (touched && !lastTouch && millis() - lastToggle > DEBOUNCE_MS) {
    lastToggle = millis();
    setLamp(!lampOn, "touch");
  }
  lastTouch = touched;
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The relay clicks but the lamp never lights", ru: "Реле щёлкает, но лампа не загорается", kk: "Реле шыртылдайды, бірақ шам жанбайды" },
      cause: { en: "The lamp is wired to NC, or the 12 V loop is not closed through COM and NO.", ru: "Лампа подключена к NC или цепь 12 В не замкнута через COM и NO.", kk: "Шам NC-ға қосылған немесе 12 В тізбегі COM мен NO арқылы тұйықталмаған." },
      fix: { en: "Adapter + → COM, NO → lamp +, lamp − → adapter −. Check the adapter on its own with the lamp first.", ru: "Плюс адаптера → COM, NO → плюс лампы, минус лампы → минус адаптера. Сначала проверьте лампу напрямую от адаптера.", kk: "Адаптер плюсі → COM, NO → шам плюсі, шам минусы → адаптер минусы. Алдымен шамды адаптерге тікелей қосып тексеріңіз." },
    },
    {
      symptom: { en: "The relay is always on and never releases", ru: "Реле всегда включено и не отпускает", kk: "Реле әрдайым қосулы, ешқашан босамайды" },
      cause: { en: "The module is in low-level trigger mode; a 3.3 V HIGH is not enough to switch its optocoupler off.", ru: "Модуль в режиме управления низким уровнем: 3,3 В не хватает, чтобы погасить его оптопару.", kk: "Модуль төмен деңгеймен басқару режимінде: оның оптожұбын сөндіруге 3,3 В жетпейді." },
      fix: { en: "Move the jumper to H. For a module without a jumper, set RELAY_ON = LOW and RELAY_OFF = HIGH, or use a 3.3 V relay module.", ru: "Переставьте перемычку в H. Для модуля без перемычки поставьте RELAY_ON = LOW и RELAY_OFF = HIGH или возьмите модуль реле на 3,3 В.", kk: "Секіргішті H күйіне ауыстырыңыз. Секіргіші жоқ модуль үшін RELAY_ON = LOW және RELAY_OFF = HIGH қойыңыз немесе 3,3 В реле модулін алыңыз." },
    },
    {
      symptom: { en: "The web page does not open", ru: "Веб-страница не открывается", kk: "Веб-бет ашылмайды" },
      cause: { en: "The phone is on a different network (guest Wi-Fi or mobile data), or the ESP32 never joined Wi-Fi.", ru: "Телефон в другой сети (гостевой Wi-Fi или мобильный интернет) или ESP32 не подключилась к Wi-Fi.", kk: "Телефон басқа желіде (қонақ Wi-Fi немесе мобильді интернет) немесе ESP32 Wi-Fi-ға қосылмаған." },
      fix: { en: "Check the Serial Monitor for the IP, then open it from a device on the same 2.4 GHz network.", ru: "Найдите IP в Serial Monitor и откройте его с устройства в той же сети 2,4 ГГц.", kk: "Serial Monitor-дан IP-ді тауып, оны сол 2,4 ГГц желісіндегі құрылғыдан ашыңыз." },
    },
    {
      symptom: { en: "The lamp toggles twice per tap", ru: "Лампа переключается дважды за одно касание", kk: "Шам бір тиюде екі рет ауысады" },
      cause: { en: "The TTP223 is set to toggle mode (pad A bridged), so it already latches by itself.", ru: "TTP223 переведён в режим переключателя (замкнута площадка A) и сам держит состояние.", kk: "TTP223 ауыстырғыш режиміне қойылған (A алаңшасы тұйықталған), күйді өзі ұстап тұрады." },
      fix: { en: "Remove the solder bridge on pad A so the module works as a momentary button.", ru: "Уберите перемычку припоя с площадки A, чтобы модуль работал как обычная кнопка.", kk: "Модуль кәдімгі батырма ретінде жұмыс істеуі үшін A алаңшасындағы дәнекер көпірін алып тастаңыз." },
    },
  ],
  safety: [
    { en: "Low voltage only: switch a 12 V DC lamp. Never connect mains (110/230 V) to this relay on a breadboard build.", ru: "Только низкое напряжение: коммутируйте лампу 12 В постоянного тока. Никогда не подключайте сеть 110/230 В к реле в макетной сборке.", kk: "Тек төмен кернеу: 12 В тұрақты ток шамын қосыңыз. Макеттік құрастырмадағы релеге ешқашан 110/230 В желісін қоспаңыз." },
    { en: "Keep the lamp current within the relay contact rating and use a 12 V adapter rated for the lamp.", ru: "Ток лампы не должен превышать допустимый для контактов реле, а адаптер 12 В должен быть рассчитан на лампу.", kk: "Шам тогы реле түйіспелерінің шегінен аспауы керек, ал 12 В адаптері шамға сай болуы тиіс." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Connecting to YOUR_WIFI.....",
      "Wi-Fi connected, open http://192.168.1.42/",
      "lamp ON (touch)",
      "lamp OFF (touch)",
      "lamp ON (web)",
      "lamp OFF (web)",
      "lamp ON (touch)",
    ],
    leds: [{ label: "LAMP", color: "#FFD54F" }],
  },
} satisfies GuideContent;
