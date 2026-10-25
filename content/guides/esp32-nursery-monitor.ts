import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-nursery-monitor",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "home",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 13,
  xpReward: 220,
  title: {
    en: "ESP32 Nursery Monitor",
    ru: "Монитор детской комнаты на ESP32",
    kk: "ESP32 балалар бөлмесінің мониторы",
  },
  summary: {
    en: "A sound sensor and a DHT22 watch the nursery. A phone web page shows temperature and humidity, raises an alert on sustained crying or when the room is too hot or cold, and dims a night light.",
    ru: "Датчик звука и DHT22 следят за детской. Веб-страница на телефоне показывает температуру и влажность, предупреждает о долгом плаче или слишком жаркой/холодной комнате и управляет ночником.",
    kk: "Дыбыс датчигі мен DHT22 балалар бөлмесін бақылайды. Телефондағы веб-бет температура мен ылғалдылықты көрсетеді, ұзақ жылау не бөлме тым ыстық/суық болса ескертеді және түнгі шамды басқарады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit (WROOM-32)", ru: "ESP32 DevKit (WROOM-32)", kk: "ESP32 DevKit (WROOM-32)" }, role: { en: "Controller and web server", ru: "Контроллер и веб-сервер", kk: "Контроллер және веб-сервер" } },
    { component: "sound-sensor", qty: 1, spec: { en: "KY-038 with analog output (AO)", ru: "KY-038 с аналоговым выходом (AO)", kk: "аналогтық шығысы (AO) бар KY-038" }, role: { en: "Hears crying", ru: "Слышит плач", kk: "Жылауды естиді" } },
    { component: "dht22", qty: 1, spec: { en: "3-pin module, ±0.5 °C", ru: "модуль с 3 выводами, ±0,5 °C", kk: "3 шығысты модуль, ±0,5 °C" }, role: { en: "Room temperature and humidity", ru: "Температура и влажность в комнате", kk: "Бөлме температурасы мен ылғалдылығы" } },
    { component: "led", qty: 1, spec: { en: "5 mm amber or warm yellow", ru: "5 мм, янтарный или тёплый жёлтый", kk: "5 мм, сарғыш немесе жылы сары" }, role: { en: "Dimmable night light", ru: "Ночник с регулировкой яркости", kk: "Жарықтығы реттелетін түнгі шам" } },
    { component: "resistor", qty: 1, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "Night LED current limit (~5 mA)", ru: "Ограничение тока ночника (~5 мА)", kk: "Түнгі шам тогын шектеу (~5 мА)" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V 1 A USB charger + cable", ru: "USB-зарядка 5 В 1 А + кабель", kk: "5 В 1 А USB зарядтағыш + кабель" }, role: { en: "Powers the ESP32 through its USB port", ru: "Питает ESP32 через USB-порт", kk: "ESP32-ні USB порты арқылы қоректендіреді" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 12, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { component: "enclosure", qty: 1, spec: { en: "vented box so the DHT22 reads room air, not board heat", ru: "корпус с вентиляцией, чтобы DHT22 мерил воздух комнаты, а не нагрев платы", kk: "DHT22 платаның жылуын емес, бөлме ауасын өлшеуі үшін желдетілетін қорап" }, role: { en: "Housing", ru: "Корпус", kk: "Корпус" }, optional: true },
  ],
  instances: [
    { id: "mic", component: "sound-sensor", label: "KY-038" },
    { id: "dht", component: "dht22", label: "DHT22" },
    { id: "r_led", component: "resistor", label: "220 Ω" },
    { id: "led_night", component: "led", label: "Night light" },
  ],
  connections: [
    { from: "board.3V3", to: "mic.VCC", color: "red", note: { en: "3.3 V supply keeps AO within the ADC range", ru: "питание 3,3 В удерживает AO в диапазоне АЦП", kk: "3,3 В қуат AO-ны АЦТ ауқымында ұстайды" } },
    { from: "mic.GND", to: "board.GND", color: "black" },
    { from: "mic.AO", to: "board.GPIO34", color: "yellow", note: { en: "ADC1 pin: still readable while Wi-Fi is on", ru: "пин ADC1: читается и при включённом Wi-Fi", kk: "ADC1 пині: Wi-Fi қосулы кезде де оқылады" } },
    { from: "board.3V3", to: "dht.VCC", color: "red" },
    { from: "dht.GND", to: "board.GND2", color: "black" },
    { from: "dht.DATA", to: "board.GPIO4", color: "green" },
    { from: "board.GPIO25", to: "r_led.A", color: "orange" },
    { from: "r_led.B", to: "led_night.A", color: "orange", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led_night.K", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Wire the sound sensor to an ADC1 pin", ru: "Подключите датчик звука к пину ADC1", kk: "Дыбыс датчигін ADC1 пініне қосыңыз" },
      body: {
        en: "Connect the KY-038 VCC to 3V3, GND to GND and AO to GPIO34. Use 3.3 V so the analog output never exceeds what the ESP32 can read. GPIO34 belongs to ADC1; the ADC2 pins stop working as soon as Wi-Fi starts, so never put an analog sensor on them in a Wi-Fi project. DO is not needed: the sketch measures loudness from AO.",
        ru: "Подключите VCC модуля KY-038 к 3V3, GND к GND, AO к GPIO34. Питание 3,3 В гарантирует, что аналоговый выход не превысит то, что может прочитать ESP32. GPIO34 относится к ADC1; пины ADC2 перестают работать, как только включается Wi-Fi, поэтому в проектах с Wi-Fi аналоговые датчики на них не ставят. DO не нужен: скетч меряет громкость по AO.",
        kk: "KY-038 модулінің VCC-ін 3V3-ке, GND-ін GND-ге, AO-ын GPIO34-ке қосыңыз. 3,3 В қуат аналогтық шығыс ESP32 оқи алатын шектен аспауын қамтамасыз етеді. GPIO34 ADC1-ге жатады; ADC2 пиндері Wi-Fi қосылған бойда жұмысын тоқтатады, сондықтан Wi-Fi жобаларында аналогтық датчиктерді оларға қоспайды. DO керек емес: скетч дыбыс қаттылығын AO арқылы өлшейді.",
      },
      expect: { en: "Clapping near the microphone makes the \"sound\" value on the page jump above 300.", ru: "Хлопок рядом с микрофоном поднимает значение «sound» на странице выше 300.", kk: "Микрофон жанында шапалақтасаңыз, беттегі «sound» мәні 300-ден асады." },
      mistake: { en: "A sensor on GPIO25–27 or 12–15 (ADC2) reads 0 or garbage once Wi-Fi connects.", ru: "Датчик на GPIO25–27 или 12–15 (ADC2) после подключения Wi-Fi показывает 0 или мусор.", kk: "GPIO25–27 немесе 12–15 (ADC2) пиндеріндегі датчик Wi-Fi қосылғаннан кейін 0 немесе қоқыс көрсетеді." },
    },
    {
      title: { en: "Add the DHT22", ru: "Добавьте DHT22", kk: "DHT22 қосыңыз" },
      body: {
        en: "Connect the DHT22 module VCC to 3V3, GND to GND2 and DATA to GPIO4. The 3-pin module already has its pull-up resistor. Place the sensor at least 10 cm from the ESP32, which warms up by 2–3 °C while Wi-Fi is active.",
        ru: "Подключите VCC модуля DHT22 к 3V3, GND к GND2, DATA к GPIO4. На модуле с 3 выводами подтягивающий резистор уже стоит. Разместите датчик минимум в 10 см от ESP32: при работе Wi-Fi плата нагревается на 2–3 °C.",
        kk: "DHT22 модулінің VCC-ін 3V3-ке, GND-ін GND2-ге, DATA-сын GPIO4-ке қосыңыз. 3 шығысты модульде тарту резисторы бұрыннан бар. Датчикті ESP32-ден кемінде 10 см қашық орналастырыңыз: Wi-Fi жұмыс істегенде плата 2–3 °C-қа қызады.",
      },
      expect: { en: "The Serial Monitor prints the room temperature and humidity every 10 seconds.", ru: "Serial Monitor каждые 10 секунд печатает температуру и влажность в комнате.", kk: "Serial Monitor әр 10 секунд сайын бөлменің температурасы мен ылғалдылығын шығарады." },
      mistake: { en: "\"DHT read failed\" every time usually means DATA is on the wrong pin or the bare 4-pin sensor is used without a pull-up.", ru: "Постоянное «DHT read failed» обычно значит, что DATA не на том пине или взят голый 4-выводной датчик без подтяжки.", kk: "Үнемі «DHT read failed» шықса, көбіне DATA басқа пинде немесе тартусыз жалаң 4 шығысты датчик алынған." },
    },
    {
      title: { en: "Wire the night light", ru: "Подключите ночник", kk: "Түнгі шамды қосыңыз" },
      body: {
        en: "Connect GPIO25 to a 220 Ω resistor, the resistor to the LED's long leg (anode), and the short leg to GND3. The sketch dims the LED with analogWrite() from a slider on the web page. Amber light is the least disruptive colour at night.",
        ru: "Соедините GPIO25 с резистором 220 Ом, резистор с длинной ножкой (анодом) светодиода, а короткую ножку с GND3. Скетч регулирует яркость функцией analogWrite() по ползунку на веб-странице. Янтарный свет меньше всего мешает ночью.",
        kk: "GPIO25-ті 220 Ом резисторға, резисторды жарық диодының ұзын аяғына (анодына), ал қысқа аяғын GND3-ке қосыңыз. Скетч жарықтықты веб-беттегі сырғытпамен analogWrite() арқылы реттейді. Түнде сарғыш жарық ең аз кедергі келтіреді.",
      },
      expect: { en: "Moving the slider changes the LED from off to a soft glow.", ru: "Ползунок меняет яркость от выключенного до мягкого свечения.", kk: "Сырғытпа жарық диодын сөніктен жұмсақ жарыққа дейін өзгертеді." },
      mistake: { en: "Without the resistor the LED is far too bright and overloads GPIO25.", ru: "Без резистора светодиод светит слишком ярко и перегружает GPIO25.", kk: "Резисторсыз жарық диоды тым жарық жанады және GPIO25-ті шамадан тыс жүктейді." },
    },
    {
      title: { en: "Upload and open the page", ru: "Загрузите скетч и откройте страницу", kk: "Скетчті жүктеп, бетті ашыңыз" },
      body: {
        en: "Install \"DHT sensor library\" and \"Adafruit Unified Sensor\". Enter your Wi-Fi in the sketch, upload with \"ESP32 Dev Module\" and read the IP at 115200 baud. Open it on your phone and tap \"Enable sound\" once: browsers only allow the alert beep after a tap. The page refreshes every 2 seconds.",
        ru: "Установите библиотеки «DHT sensor library» и «Adafruit Unified Sensor». Впишите в скетч свой Wi-Fi, загрузите с выбранной платой «ESP32 Dev Module» и посмотрите IP на 115200 бод. Откройте его на телефоне и один раз нажмите «Enable sound»: браузеры разрешают звуковое оповещение только после касания. Страница обновляется каждые 2 секунды.",
        kk: "«DHT sensor library» және «Adafruit Unified Sensor» кітапханаларын орнатыңыз. Скетчке Wi-Fi-ды жазып, «ESP32 Dev Module» таңдалған күйде жүктеңіз де, IP-ді 115200 бодта қараңыз. Оны телефонда ашып, «Enable sound» батырмасын бір рет басыңыз: браузерлер дыбыстық ескертуге тек басқаннан кейін рұқсат береді. Бет әр 2 секунд сайын жаңарады.",
      },
      expect: { en: "The page shows temperature, humidity, the live sound level and \"All calm\".", ru: "Страница показывает температуру, влажность, текущий уровень звука и «All calm».", kk: "Бет температураны, ылғалдылықты, ағымдағы дыбыс деңгейін және «All calm» жазуын көрсетеді." },
      mistake: { en: "Keeping the phone screen off in a background tab: browsers pause the refresh. Keep the page open in front.", ru: "Если вкладка в фоне при выключенном экране, браузер приостанавливает обновление. Держите страницу открытой на переднем плане.", kk: "Экран сөніп, қойынды фонда болса, браузер жаңартуды тоқтатады. Бетті алдыңғы жоспарда ашық ұстаңыз." },
    },
    {
      title: { en: "Tune the crying threshold", ru: "Настройте порог плача", kk: "Жылау шегін баптаңыз" },
      body: {
        en: "Watch the sound level in a quiet room (usually 10–60) and while talking at the cot. Set LOUD_LEVEL between the two, or turn the blue potentiometer on the KY-038 if the quiet level is near 0 or above 1000. Crying is flagged when at least 6 of the last 10 seconds were loud, so a single cough or a door slam does not trigger it. With AUTO_LIGHT the night light comes on softly when crying starts.",
        ru: "Посмотрите уровень звука в тихой комнате (обычно 10–60) и когда вы говорите у кроватки. Задайте LOUD_LEVEL между этими значениями, а если в тишине уровень около 0 или выше 1000, покрутите синий потенциометр на KY-038. Плач фиксируется, когда громкими были минимум 6 из последних 10 секунд, поэтому кашель или хлопок двери его не вызывают. С AUTO_LIGHT при начале плача мягко включается ночник.",
        kk: "Тыныш бөлмедегі (әдетте 10–60) және бесік жанында сөйлегендегі дыбыс деңгейін қараңыз. LOUD_LEVEL мәнін осы екеуінің арасына қойыңыз, ал тыныштықта деңгей 0-ге жақын не 1000-нан жоғары болса, KY-038-дегі көк потенциометрді бұраңыз. Соңғы 10 секундтың кемінде 6-ы қатты болса, жылау тіркеледі, сондықтан жөтел немесе есіктің тарс жабылуы оны іске қоспайды. AUTO_LIGHT қосулы болса, жылау басталғанда түнгі шам ақырын жанады.",
      },
      expect: { en: "Sustained loud sound turns the banner red with \"Crying detected\" and the phone beeps.", ru: "При долгом громком звуке баннер становится красным с надписью «Crying detected», а телефон пищит.", kk: "Ұзақ қатты дыбыста баннер «Crying detected» жазуымен қызыл болып, телефон дыбыс береді." },
      mistake: { en: "Placing the sensor next to a fan or humidifier makes the quiet level too high to detect anything.", ru: "Если поставить датчик рядом с вентилятором или увлажнителем, фоновый уровень будет слишком высоким.", kk: "Датчикті желдеткіш не ылғалдандырғыштың жанына қойсаңыз, фондық деңгей тым жоғары болады." },
    },
  ],
  code: [{
    filename: "nursery_monitor.ino",
    language: "cpp",
    libraries: ["DHT sensor library", "Adafruit Unified Sensor"],
    source: `#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>

// ---- your network ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";

const int SOUND_PIN = 34;     // KY-038 AO (ADC1, input-only pin)
const int DHT_PIN = 4;        // DHT22 DATA
const int LED_PIN = 25;       // night LED through 220 ohm
const float COLD_C = 16.0;    // alert below this
const float HOT_C = 22.0;     // alert above this
const int LOUD_LEVEL = 250;   // peak-to-peak ADC counts in a 50 ms window = "loud"
const int CRY_SECONDS = 6;    // loud seconds out of the last 10 = crying
const bool AUTO_LIGHT = true; // soft night light when crying starts

DHT dht(DHT_PIN, DHT22);
WebServer server(80);

float tempC = NAN, humidity = NAN;
int soundLevel = 0;
bool crying = false;
bool loudHist[10] = {false};
int histIdx = 0, secMax = 0, loudWindows = 0;
unsigned long secStart = 0, lastClimate = 0, lastPrint = 0;
int lightLevel = 0;

const char PAGE[] PROGMEM = R"HTML(<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Nursery</title>
<style>
body{font-family:system-ui,sans-serif;background:#0f1115;color:#eee;margin:0;padding:20px;text-align:center}
#a{padding:18px;border-radius:16px;font-size:24px;font-weight:700;margin-bottom:20px}
.ok{background:#16352f;color:#2ee6c9}.alert{background:#5a1616;color:#fff}
.v{font-size:40px;font-weight:700}.row{display:flex;gap:12px;justify-content:center;margin-bottom:20px}
.card{background:#1a1d24;border-radius:16px;padding:14px;min-width:90px}
button{font-size:16px;padding:10px 20px;border:0;border-radius:12px;background:#ff7a1a;color:#111}
input{width:80%}
</style></head><body>
<div id="a" class="ok">...</div>
<div class="row"><div class="card"><div class="v" id="t">--</div>temp</div>
<div class="card"><div class="v" id="h">--</div>humidity</div>
<div class="card"><div class="v" id="l">--</div>sound</div></div>
<p>Night light</p><input id="s" type="range" min="0" max="255" onchange="fetch('/light?level='+this.value,{method:'POST'})">
<p><button id="e" onclick="snd=true;this.textContent='Sound on'">Enable sound</button></p>
<script>
let snd=false,was=false;
function T(id,v){document.getElementById(id).textContent=v;}
function beep(){const c=new AudioContext();const o=c.createOscillator();o.frequency.value=880;o.connect(c.destination);o.start();setTimeout(()=>{o.stop();c.close();},500);}
function upd(){fetch('/data').then(r=>r.json()).then(d=>{
  T('t',d.t===null?'--':d.t.toFixed(1)+'\\u00B0');T('h',d.h===null?'--':Math.round(d.h)+'%');T('l',d.sound);
  const al=[];if(d.crying)al.push('Crying detected');if(d.temp==='hot')al.push('Too hot');if(d.temp==='cold')al.push('Too cold');
  const a=document.getElementById('a');a.textContent=al.length?al.join(' / '):'All calm';a.className=al.length?'alert':'ok';
  if(al.length&&!was&&snd)beep();was=al.length>0;
  const s=document.getElementById('s');if(document.activeElement!==s)s.value=d.light;
}).catch(()=>{T('a','No connection');});}
upd();setInterval(upd,2000);
</script></body></html>)HTML";

void setLight(int v) {
  lightLevel = constrain(v, 0, 255);
  analogWrite(LED_PIN, lightLevel);
}

const char* tempState() {
  if (isnan(tempC)) return "unknown";
  if (tempC < COLD_C) return "cold";
  if (tempC > HOT_C) return "hot";
  return "ok";
}

int sampleP2P(unsigned long ms) {   // loudness = peak-to-peak of the AO signal
  int lo = 4095, hi = 0;
  unsigned long start = millis();
  while (millis() - start < ms) {
    int v = analogRead(SOUND_PIN);
    if (v < lo) lo = v;
    if (v > hi) hi = v;
  }
  return hi - lo;
}

void handleData() {
  char t[12], h[12], buf[160];
  if (isnan(tempC)) strcpy(t, "null"); else snprintf(t, sizeof t, "%.1f", tempC);
  if (isnan(humidity)) strcpy(h, "null"); else snprintf(h, sizeof h, "%.0f", humidity);
  snprintf(buf, sizeof buf, "{\\"t\\":%s,\\"h\\":%s,\\"sound\\":%d,\\"crying\\":%s,\\"temp\\":\\"%s\\",\\"light\\":%d}",
           t, h, soundLevel, crying ? "true" : "false", tempState(), lightLevel);
  server.send(200, "application/json", buf);
}

void handleLight() {
  if (!server.hasArg("level")) { server.send(400, "text/plain", "level missing"); return; }
  long v = server.arg("level").toInt();
  if (v < 0 || v > 255) { server.send(400, "text/plain", "level must be 0-255"); return; }
  setLight(v);
  server.send(200, "text/plain", "ok");
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  setLight(0);
  analogReadResolution(12);
  dht.begin();

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.printf("\\nmonitor page: http://%s/\\n", WiFi.localIP().toString().c_str());

  server.on("/", HTTP_GET, []() { server.send_P(200, "text/html", PAGE); });
  server.on("/data", HTTP_GET, handleData);
  server.on("/light", HTTP_POST, handleLight);
  server.begin();
  secStart = millis();
}

void loop() {
  server.handleClient();

  int p2p = sampleP2P(50);
  if (p2p > secMax) secMax = p2p;
  if (p2p > LOUD_LEVEL) loudWindows++;

  if (millis() - secStart >= 1000) {            // once per second
    secStart = millis();
    soundLevel = secMax;
    loudHist[histIdx] = loudWindows >= 4;       // loud for 200 ms or more in this second
    histIdx = (histIdx + 1) % 10;
    secMax = 0;
    loudWindows = 0;
    int loudSecs = 0;
    for (bool b : loudHist) loudSecs += b;
    bool now = loudSecs >= CRY_SECONDS;
    if (now && !crying) {
      Serial.println("ALERT: crying detected");
      if (AUTO_LIGHT && lightLevel == 0) setLight(40);
    } else if (!now && crying) {
      Serial.println("quiet again");
    }
    crying = now;
  }

  if (millis() - lastClimate >= 3000) {              // DHT22 needs 2 s between reads
    lastClimate = millis();
    float t = dht.readTemperature(), h = dht.readHumidity();
    if (isnan(t) || isnan(h)) {
      Serial.println("DHT read failed");
    } else {
      const char* before = tempState();
      tempC = t;
      humidity = h;
      const char* after = tempState();
      if (strcmp(before, after) != 0 && strcmp(after, "ok") != 0) Serial.printf("ALERT: room too %s (%.1f C)\\n", after, tempC);
    }
  }

  if (millis() - lastPrint >= 10000) {
    lastPrint = millis();
    Serial.printf("%.1f C  %.0f %%  sound %d  %s\\n", tempC, humidity, soundLevel, crying ? "CRYING" : "calm");
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The sound level is always 0", ru: "Уровень звука всегда 0", kk: "Дыбыс деңгейі әрдайым 0" },
      cause: { en: "AO is not on GPIO34, or the potentiometer biases the output hard to 0 V or 3.3 V.", ru: "AO подключён не к GPIO34 или потенциометр сдвинул выход к 0 В или 3,3 В.", kk: "AO GPIO34-ке қосылмаған немесе потенциометр шығысты 0 В-қа не 3,3 В-қа ығыстырған." },
      fix: { en: "Check the wire, then turn the potentiometer until the module's DO LED just goes out in a quiet room.", ru: "Проверьте провод, затем крутите потенциометр, пока светодиод DO на модуле не погаснет в тишине.", kk: "Сымды тексеріп, тыныш бөлмеде модульдегі DO жарық диоды сөнгенше потенциометрді бұраңыз." },
    },
    {
      symptom: { en: "\"Crying detected\" appears with the TV on", ru: "«Crying detected» появляется при включённом телевизоре", kk: "Теледидар қосулы болса, «Crying detected» шығады" },
      cause: { en: "The KY-038 measures loudness, not what the sound is.", ru: "KY-038 меряет громкость, а не то, что звучит.", kk: "KY-038 дыбыстың не екенін емес, қаттылығын өлшейді." },
      fix: { en: "Raise LOUD_LEVEL or CRY_SECONDS, and place the sensor near the cot but away from speakers.", ru: "Увеличьте LOUD_LEVEL или CRY_SECONDS и поставьте датчик ближе к кроватке, но подальше от колонок.", kk: "LOUD_LEVEL немесе CRY_SECONDS мәнін арттырып, датчикті бесікке жақын, бірақ динамиктерден алыс қойыңыз." },
    },
    {
      symptom: { en: "Temperature reads 2–3 °C too high", ru: "Температура завышена на 2–3 °C", kk: "Температура 2–3 °C-қа жоғары көрсетеді" },
      cause: { en: "The DHT22 sits next to the ESP32, which heats up with Wi-Fi on.", ru: "DHT22 стоит рядом с ESP32, которая греется при работе Wi-Fi.", kk: "DHT22 Wi-Fi жұмыс істегенде қызатын ESP32-нің жанында тұр." },
      fix: { en: "Move the sensor 10 cm or more away on longer wires, outside the box or in a vented part of it.", ru: "Вынесите датчик на 10 см и дальше на проводах, наружу корпуса или в его вентилируемую часть.", kk: "Датчикті ұзын сымдармен 10 см-ден әрі, қораптан тыс немесе оның желдетілетін бөлігіне шығарыңыз." },
    },
  ],
  safety: [
    { en: "This is a hobby helper, not a medical or safety device: it never replaces checking on the baby yourself.", ru: "Это любительский помощник, а не медицинское устройство: он не заменяет ваш личный присмотр за ребёнком.", kk: "Бұл әуесқойлық көмекші, медициналық құрылғы емес: ол балаға өзіңіздің қарауыңызды алмастырмайды." },
    { en: "Mount the device and every cable at least 1 m from the cot, out of the baby's reach.", ru: "Закрепите устройство и все кабели не ближе 1 м от кроватки, вне досягаемости ребёнка.", kk: "Құрылғы мен барлық кабельді бесіктен кемінде 1 м қашықтықта, бала қолы жетпейтін жерге бекітіңіз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Connecting.....",
      "monitor page: http://192.168.1.71/",
      "21.4 C  48 %  sound 34  calm",
      "21.4 C  48 %  sound 41  calm",
      "ALERT: crying detected",
      "21.5 C  48 %  sound 612  CRYING",
      "quiet again",
      "21.5 C  47 %  sound 38  calm",
    ],
    leds: [{ label: "NIGHT", color: "#FFB300" }],
  },
} satisfies GuideContent;
