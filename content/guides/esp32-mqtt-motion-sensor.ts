import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-mqtt-motion-sensor",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "iot",
  robotics: false,
  difficulty: "intermediate",
  hours: 2,
  costUsd: 8,
  xpReward: 210,
  title: {
    en: "ESP32 MQTT Motion Sensor",
    ru: "MQTT-датчик движения на ESP32",
    kk: "ESP32-дегі MQTT қозғалыс датчигі",
  },
  summary: {
    en: "An HC-SR501 PIR sensor tells the ESP32 when someone walks by, and the ESP32 publishes ON/OFF to an MQTT broker such as Mosquitto or Home Assistant, with an online/offline status and an LED indicator.",
    ru: "PIR-датчик HC-SR501 сообщает ESP32, когда кто-то проходит мимо, а ESP32 публикует ON/OFF в MQTT-брокер, например Mosquitto или Home Assistant, вместе со статусом online/offline и светодиодным индикатором.",
    kk: "HC-SR501 PIR датчигі біреу өтіп бара жатқанын ESP32-ге хабарлайды, ал ESP32 online/offline күйімен және жарық диоды индикаторымен бірге Mosquitto немесе Home Assistant сияқты MQTT брокеріне ON/OFF жариялайды.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit V1 (WROOM-32), 3.3 V logic", ru: "ESP32 DevKit V1 (WROOM-32), логика 3,3 В", kk: "ESP32 DevKit V1 (WROOM-32), 3,3 В логика" }, role: { en: "Controller and MQTT client", ru: "Контроллер и MQTT-клиент", kk: "Контроллер және MQTT клиенті" } },
    { component: "pir-hc-sr501", qty: 1, spec: { en: "HC-SR501, 5 V supply, 3.3 V output from its onboard regulator", ru: "HC-SR501, питание 5 В, выход 3,3 В от встроенного стабилизатора", kk: "HC-SR501, 5 В қорек, борттық стабилизатордан 3,3 В шығыс" }, role: { en: "Motion detector", ru: "Датчик движения", kk: "Қозғалыс датчигі" } },
    { component: "led", qty: 1, spec: { en: "5 mm green", ru: "5 мм, зелёный", kk: "5 мм, жасыл" }, role: { en: "Motion indicator", ru: "Индикатор движения", kk: "Қозғалыс индикаторы" } },
    { component: "resistor", qty: 1, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиода", kk: "Жарық диоды тогын шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-female for the PIR, male-male for the LED", ru: "папа-мама для PIR, папа-папа для светодиода", kk: "PIR үшін аталық-аналық, жарық диоды үшін аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "pir", component: "pir-hc-sr501", label: "HC-SR501" },
    { id: "r1", component: "resistor", label: "220 Ω" },
    { id: "led_motion", component: "led", label: "Motion" },
  ],
  connections: [
    { from: "board.5V", to: "pir.VCC", color: "red", note: { en: "4.5–20 V in, regulated to 3.3 V inside", ru: "вход 4,5–20 В, внутри стабилизируется до 3,3 В", kk: "кіріс 4,5–20 В, ішінде 3,3 В-қа тұрақтандырылады" } },
    { from: "pir.GND", to: "board.GND", color: "black" },
    { from: "pir.OUT", to: "board.GPIO27", color: "yellow", note: { en: "3.3 V HIGH: safe for the ESP32 directly", ru: "HIGH 3,3 В: безопасно напрямую для ESP32", kk: "3,3 В HIGH: ESP32-ге тікелей қауіпсіз" } },
    { from: "board.GPIO26", to: "r1.A", color: "green" },
    { from: "r1.B", to: "led_motion.A", color: "green", note: { en: "long leg", ru: "длинная ножка", kk: "ұзын аяғы" } },
    { from: "led_motion.K", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Prepare an MQTT broker", ru: "Подготовьте MQTT-брокер", kk: "MQTT брокерін дайындаңыз" },
      body: {
        en: "You need a broker on your network: the Mosquitto add-on in Home Assistant, or Mosquitto on a Raspberry Pi or PC. Note its IP address, port (1883) and, if you set one, the username and password. On a PC with the Mosquitto clients installed, run mosquitto_sub -h <broker-ip> -t \"ropros/#\" -v to watch messages.",
        ru: "Нужен брокер в вашей сети: дополнение Mosquitto в Home Assistant или Mosquitto на Raspberry Pi либо ПК. Запишите его IP-адрес, порт (1883) и, если задавали, логин и пароль. На ПК с клиентами Mosquitto запустите mosquitto_sub -h <broker-ip> -t \"ropros/#\" -v, чтобы видеть сообщения.",
        kk: "Желіңізде брокер керек: Home Assistant-тағы Mosquitto қосымшасы немесе Raspberry Pi не ДК-дағы Mosquitto. Оның IP мекенжайын, портын (1883) және, егер орнатсаңыз, логин мен құпиясөзін жазып алыңыз. Mosquitto клиенттері орнатылған ДК-да хабарларды көру үшін mosquitto_sub -h <broker-ip> -t \"ropros/#\" -v іске қосыңыз.",
      },
      expect: { en: "mosquitto_sub runs and waits without an error.", ru: "mosquitto_sub запускается и ждёт без ошибок.", kk: "mosquitto_sub қатесіз іске қосылып, күтіп тұрады." },
      mistake: { en: "Mosquitto 2.x refuses remote clients until you add a listener 1883 and an auth or allow_anonymous line to its config.", ru: "Mosquitto 2.x не принимает удалённых клиентов, пока в конфиг не добавлены listener 1883 и строка авторизации или allow_anonymous.", kk: "Mosquitto 2.x конфигурацияға listener 1883 және авторизация немесе allow_anonymous жолы қосылмайынша қашықтағы клиенттерді қабылдамайды." },
    },
    {
      title: { en: "Set up the HC-SR501", ru: "Настройте HC-SR501", kk: "HC-SR501-ді баптаңыз" },
      body: {
        en: "Lift the white dome to read the pin labels. Turn the time-delay pot fully anticlockwise (about 3 s hold) and the sensitivity pot to the middle. Put the trigger jumper on H (repeat trigger), so the output stays HIGH while there is movement. The sketch, not the pot, decides how long \"motion\" lasts.",
        ru: "Снимите белый купол, чтобы прочитать подписи пинов. Поверните потенциометр задержки до упора против часовой стрелки (около 3 с удержания), а чувствительность поставьте в середину. Перемычку режима поставьте в H (повторный запуск), тогда выход держит HIGH, пока есть движение. Сколько длится «движение», решает скетч, а не потенциометр.",
        kk: "Пин жазуларын оқу үшін ақ күмбезді алыңыз. Кідіріс потенциометрін сағат тіліне қарсы соңына дейін бұраңыз (шамамен 3 с ұстау), ал сезімталдықты ортаға қойыңыз. Режим секіргішін H-қа (қайта іске қосу) қойыңыз, сонда қозғалыс бар кезде шығыс HIGH болып тұрады. «Қозғалыстың» ұзақтығын потенциометр емес, скетч анықтайды.",
      },
      expect: { en: "Pots set to minimum delay / mid sensitivity, jumper on H.", ru: "Задержка на минимуме, чувствительность посередине, перемычка в H.", kk: "Кідіріс ең азында, сезімталдық ортада, секіргіш H-та." },
      mistake: { en: "With the delay pot at maximum the output stays HIGH for up to 5 minutes after each movement.", ru: "Если задержка на максимуме, выход держит HIGH до 5 минут после каждого движения.", kk: "Кідіріс ең жоғарыда болса, шығыс әр қозғалыстан кейін 5 минутқа дейін HIGH болып тұрады." },
    },
    {
      title: { en: "Wire the sensor and the LED", ru: "Подключите датчик и светодиод", kk: "Датчик пен жарық диодын қосыңыз" },
      body: {
        en: "PIR VCC to the ESP32 5V pin, GND to GND and OUT to GPIO27. The HC-SR501 has its own 3.3 V regulator, so its OUT pin only goes up to 3.3 V and can go straight into the ESP32. Then wire GPIO26 through 220 Ω to the LED's long leg and the short leg to GND.",
        ru: "VCC датчика к пину 5V платы ESP32, GND к GND, OUT к GPIO27. У HC-SR501 свой стабилизатор 3,3 В, поэтому выход OUT поднимается только до 3,3 В и подключается к ESP32 напрямую. Затем соедините GPIO26 через 220 Ом с длинной ножкой светодиода, а короткую ножку с GND.",
        kk: "Датчиктің VCC-ін ESP32-нің 5V пиніне, GND-ін GND-ге, OUT-ын GPIO27-ге қосыңыз. HC-SR501-дің өз 3,3 В стабилизаторы бар, сондықтан OUT шығысы тек 3,3 В-қа дейін көтеріледі және ESP32-ге тікелей қосылады. Содан кейін GPIO26-ны 220 Ом арқылы жарық диодының ұзын аяғына, қысқа аяғын GND-ге жалғаңыз.",
      },
      expect: { en: "Three wires to the PIR, two wires and a resistor for the LED.", ru: "Три провода к PIR, два провода и резистор для светодиода.", kk: "PIR-ге үш сым, жарық диодына екі сым және резистор." },
      mistake: { en: "Feeding the PIR from 3V3 is below its 4.5 V minimum and causes random triggers.", ru: "Питание PIR от 3V3 ниже его минимума 4,5 В и вызывает ложные срабатывания.", kk: "PIR-ді 3V3-тен қоректендіру оның 4,5 В минимумынан төмен және жалған іске қосылуларға әкеледі." },
    },
    {
      title: { en: "Configure and upload", ru: "Настройте и загрузите скетч", kk: "Баптап, скетчті жүктеңіз" },
      body: {
        en: "Install \"PubSubClient\" (by Nick O'Leary). In the sketch, set your Wi-Fi, the broker IP in MQTT_HOST and, if needed, MQTT_USER and MQTT_PASS. Upload and open the Serial Monitor at 115200 baud. The LED blinks slowly for the first 60 seconds while the PIR settles; motion is ignored during that time.",
        ru: "Установите «PubSubClient» (автор Nick O'Leary). В скетче впишите Wi-Fi, IP брокера в MQTT_HOST и при необходимости MQTT_USER и MQTT_PASS. Загрузите скетч и откройте Serial Monitor на 115200 бод. Первые 60 секунд, пока PIR стабилизируется, светодиод медленно мигает, а движение игнорируется.",
        kk: "«PubSubClient» (авторы Nick O'Leary) кітапханасын орнатыңыз. Скетчке Wi-Fi деректерін, MQTT_HOST-қа брокер IP-ін және қажет болса MQTT_USER мен MQTT_PASS-ты жазыңыз. Скетчті жүктеп, Serial Monitor-ды 115200 бодта ашыңыз. PIR тұрақталатын алғашқы 60 секундта жарық диоды баяу жыпылықтайды, ал қозғалыс еленбейді.",
      },
      expect: { en: "\"MQTT connected\" and \"PIR ready\" in the monitor; mosquitto_sub shows ropros/hallway/status online.", ru: "В мониторе «MQTT connected» и «PIR ready»; mosquitto_sub показывает ropros/hallway/status online.", kk: "Мониторда «MQTT connected» және «PIR ready»; mosquitto_sub ropros/hallway/status online көрсетеді." },
      mistake: { en: "\"MQTT failed, rc=5\" means the broker rejected the username or password.", ru: "«MQTT failed, rc=5» означает, что брокер отклонил логин или пароль.", kk: "«MQTT failed, rc=5» брокер логинді немесе құпиясөзді қабылдамағанын білдіреді." },
    },
    {
      title: { en: "Walk past and watch the messages", ru: "Пройдите мимо и посмотрите сообщения", kk: "Жанынан өтіп, хабарларды бақылаңыз" },
      body: {
        en: "Walk in front of the sensor. The LED lights and ON is published (retained) to ropros/hallway/motion. When nothing moves for 10 seconds (HOLD_MS), OFF is published. If the ESP32 loses power, the broker publishes the last-will message offline on ropros/hallway/status, so your dashboard knows the sensor is gone.",
        ru: "Пройдите перед датчиком. Светодиод загорится, и в ropros/hallway/motion уйдёт ON (с флагом retain). Если 10 секунд (HOLD_MS) нет движения, публикуется OFF. Если ESP32 потеряет питание, брокер сам опубликует «завещание» offline в ropros/hallway/status, и ваша панель узнает, что датчик пропал.",
        kk: "Датчиктің алдынан өтіңіз. Жарық диоды жанып, ropros/hallway/motion тақырыбына ON (retain белгісімен) жіберіледі. 10 секунд (HOLD_MS) қозғалыс болмаса, OFF жарияланады. ESP32 қуатынан айырылса, брокер ropros/hallway/status тақырыбына offline «өсиетін» өзі жариялайды, сөйтіп панеліңіз датчиктің жоғалғанын біледі.",
      },
      expect: { en: "ropros/hallway/motion ON, then OFF about 10 s after you stop moving.", ru: "ropros/hallway/motion ON, затем OFF примерно через 10 с после того, как вы замрёте.", kk: "ropros/hallway/motion ON, ал қозғалмай қалғаныңыздан шамамен 10 с кейін OFF." },
      mistake: { en: "Pointing the sensor at a window, heater or air vent causes false triggers from moving warm air.", ru: "Если направить датчик на окно, батарею или вентиляцию, тёплые потоки воздуха вызовут ложные срабатывания.", kk: "Датчикті терезеге, жылытқышқа немесе желдеткішке бағыттасаңыз, жылы ауа ағындары жалған іске қосылуларға әкеледі." },
    },
  ],
  code: [{
    filename: "mqtt_motion_sensor.ino",
    language: "cpp",
    libraries: ["PubSubClient"],
    source: String.raw`#include <WiFi.h>
#include <PubSubClient.h>

// ---- change these ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_PASSWORD";
const char* MQTT_HOST = "192.168.1.10";   // YOUR broker IP
const uint16_t MQTT_PORT = 1883;
const char* MQTT_USER = "";               // leave empty if the broker allows anonymous
const char* MQTT_PASS = "";

const char* TOPIC_MOTION = "ropros/hallway/motion";
const char* TOPIC_STATUS = "ropros/hallway/status";

const int PIR_PIN = 27;
const int LED_PIN = 26;
const unsigned long PIR_WARMUP_MS = 60000;   // HC-SR501 settles for about a minute
const unsigned long HOLD_MS = 10000;         // report OFF after 10 s without motion

WiFiClient net;
PubSubClient mqtt(net);
String clientId;
bool motion = false;
unsigned long lastMotion = 0;
unsigned long lastReconnect = 0;
bool pirReady = false;

void publishMotion(bool on) {
  motion = on;
  digitalWrite(LED_PIN, on ? HIGH : LOW);
  bool ok = mqtt.publish(TOPIC_MOTION, on ? "ON" : "OFF", true);   // retained
  Serial.printf("motion %s -> %s%s\n", on ? "ON" : "OFF", TOPIC_MOTION, ok ? "" : " (not sent)");
}

bool connectMqtt() {
  Serial.printf("MQTT connecting to %s... ", MQTT_HOST);
  const char* user = strlen(MQTT_USER) ? MQTT_USER : nullptr;
  const char* pass = strlen(MQTT_PASS) ? MQTT_PASS : nullptr;
  // last will: the broker publishes "offline" if we disappear
  if (mqtt.connect(clientId.c_str(), user, pass, TOPIC_STATUS, 0, true, "offline")) {
    Serial.println("MQTT connected");
    mqtt.publish(TOPIC_STATUS, "online", true);
    mqtt.publish(TOPIC_MOTION, motion ? "ON" : "OFF", true);
    return true;
  }
  Serial.printf("MQTT failed, rc=%d\n", mqtt.state());
  return false;
}

void setup() {
  Serial.begin(115200);
  pinMode(PIR_PIN, INPUT);       // HC-SR501 drives its output actively
  pinMode(LED_PIN, OUTPUT);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.printf("Connecting to %s", WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Wi-Fi connected, IP ");
  Serial.println(WiFi.localIP());

  uint64_t mac = ESP.getEfuseMac();
  clientId = "esp32-motion-" + String((uint32_t)(mac >> 24), HEX);
  mqtt.setServer(MQTT_HOST, MQTT_PORT);
  connectMqtt();
  Serial.println("PIR warming up (60 s)");
}

void loop() {
  if (!mqtt.connected()) {
    if (millis() - lastReconnect > 5000) {      // retry every 5 s without blocking
      lastReconnect = millis();
      connectMqtt();
    }
  } else {
    mqtt.loop();
  }

  if (!pirReady) {
    digitalWrite(LED_PIN, (millis() / 1000) % 2);  // slow blink while warming up
    if (millis() >= PIR_WARMUP_MS) {
      pirReady = true;
      digitalWrite(LED_PIN, LOW);
      Serial.println("PIR ready");
    }
    return;
  }

  if (digitalRead(PIR_PIN) == HIGH) {
    lastMotion = millis();
    if (!motion) publishMotion(true);
  } else if (motion && millis() - lastMotion > HOLD_MS) {
    publishMotion(false);
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"MQTT failed, rc=-2\" over and over", ru: "Постоянно «MQTT failed, rc=-2»", kk: "Үнемі «MQTT failed, rc=-2»" },
      cause: { en: "The ESP32 cannot reach the broker: wrong IP, broker not listening on the network, or a firewall.", ru: "ESP32 не может достучаться до брокера: неверный IP, брокер не слушает сеть или мешает файрвол.", kk: "ESP32 брокерге жете алмайды: IP қате, брокер желіні тыңдамайды немесе файрвол кедергі жасайды." },
      fix: { en: "Ping the broker IP from a PC, check that port 1883 is open, and for Mosquitto 2.x add \"listener 1883\" to its config.", ru: "Пропингуйте IP брокера с ПК, проверьте, что порт 1883 открыт, а для Mosquitto 2.x добавьте в конфиг «listener 1883».", kk: "Брокер IP-ін ДК-дан ping жасап, 1883 портының ашық екенін тексеріңіз, ал Mosquitto 2.x үшін конфигурацияға «listener 1883» қосыңыз." },
    },
    {
      symptom: { en: "Motion is reported when nobody is there", ru: "Движение есть, когда никого нет", kk: "Ешкім жоқ кезде қозғалыс тіркеледі" },
      cause: { en: "Warm air from a heater or sun, Wi-Fi interference close to the PIR, or a weak 5 V supply.", ru: "Тёплый воздух от батареи или солнца, помехи от Wi-Fi рядом с PIR или слабое питание 5 В.", kk: "Жылытқыштан не күннен келетін жылы ауа, PIR жанындағы Wi-Fi кедергісі немесе әлсіз 5 В қорек." },
      fix: { en: "Turn sensitivity down, aim away from heat sources, and keep the PIR at least 10 cm from the ESP32 antenna.", ru: "Уменьшите чувствительность, отверните датчик от источников тепла и держите PIR минимум в 10 см от антенны ESP32.", kk: "Сезімталдықты азайтып, датчикті жылу көздерінен бұрыңыз және PIR-ді ESP32 антеннасынан кемінде 10 см алыс ұстаңыз." },
    },
    {
      symptom: { en: "OFF arrives minutes after you leave", ru: "OFF приходит через несколько минут после ухода", kk: "OFF кеткеннен кейін бірнеше минуттан соң келеді" },
      cause: { en: "The HC-SR501 time-delay pot is turned up, so OUT stays HIGH long after the motion.", ru: "Потенциометр задержки HC-SR501 выкручен, и OUT держит HIGH долго после движения.", kk: "HC-SR501 кідіріс потенциометрі бұралған, сондықтан OUT қозғалыстан кейін ұзақ HIGH болып тұрады." },
      fix: { en: "Turn the delay pot fully anticlockwise and tune HOLD_MS in the sketch instead.", ru: "Поверните потенциометр задержки до упора против часовой стрелки, а время настройте через HOLD_MS в скетче.", kk: "Кідіріс потенциометрін сағат тіліне қарсы соңына дейін бұрап, уақытты скетчтегі HOLD_MS арқылы баптаңыз." },
    },
  ],
  safety: [
    { en: "If you power the PIR from a separate 12 V adapter, connect only its VCC and GND; OUT stays 3.3 V, but never wire 12 V to any ESP32 pin.", ru: "Если питаете PIR от отдельного адаптера 12 В, подключайте только его VCC и GND; OUT останется 3,3 В, но никогда не подавайте 12 В на пины ESP32.", kk: "PIR-ді бөлек 12 В адаптерден қоректендірсеңіз, тек оның VCC мен GND-ін қосыңыз; OUT 3,3 В болып қалады, бірақ ESP32 пиндеріне ешқашан 12 В бермеңіз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Connecting to YOUR_WIFI...",
      "Wi-Fi connected, IP 192.168.1.63",
      "MQTT connecting to 192.168.1.10... MQTT connected",
      "PIR warming up (60 s)",
      "PIR ready",
      "motion ON -> ropros/hallway/motion",
      "motion OFF -> ropros/hallway/motion",
      "motion ON -> ropros/hallway/motion",
      "motion OFF -> ropros/hallway/motion",
    ],
    leds: [{ label: "MOTION", color: "#43A047" }],
  },
} satisfies GuideContent;
