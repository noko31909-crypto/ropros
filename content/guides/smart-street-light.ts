import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "smart-street-light",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "energy",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 10,
  xpReward: 150,
  title: {
    en: "Smart Street Light",
    ru: "Умный уличный фонарь",
    kk: "Ақылды көше шамы",
  },
  summary: {
    en: "A light sensor and a PIR motion sensor work together: the lamp fades on only when it is dark and someone walks by, then switches off after 20 seconds to save energy.",
    ru: "Датчик освещённости и PIR-датчик движения работают вместе: фонарь плавно включается только в темноте и только когда кто-то проходит мимо, а через 20 секунд гаснет, экономя энергию.",
    kk: "Жарық датчигі мен PIR қозғалыс датчигі бірге жұмыс істейді: шам тек қараңғыда және біреу өтіп бара жатқанда ғана біртіндеп жанады, ал 20 секундтан кейін энергияны үнемдеп сөнеді.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "ldr-module", qty: 1, spec: { en: "LM393 module with AO output", ru: "модуль на LM393 с выходом AO", kk: "AO шығысы бар LM393 модулі" }, role: { en: "Measures how dark it is", ru: "Измеряет, насколько темно", kk: "Қаншалықты қараңғы екенін өлшейді" } },
    { component: "pir-hc-sr501", qty: 1, spec: { en: "HC-SR501, 3–7 m range", ru: "HC-SR501, дальность 3–7 м", kk: "HC-SR501, қашықтығы 3–7 м" }, role: { en: "Detects people walking by", ru: "Замечает прохожих", kk: "Өтіп бара жатқан адамдарды байқайды" } },
    { component: "led", qty: 1, spec: { en: "5 mm warm white or yellow", ru: "5 мм тёплый белый или жёлтый", kk: "5 мм жылы ақ немесе сары" }, role: { en: "Model street lamp", ru: "Модель фонаря", kk: "Шам моделі" } },
    { component: "resistor", qty: 1, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиода", kk: "Жарық диоды тогын шектеу" } },
    { component: "relay-module", qty: 1, optional: true, spec: { en: "5 V, 1 channel, for a 12 V DC lamp", ru: "5 В, 1 канал, для лампы 12 В постоянного тока", kk: "5 В, 1 арна, 12 В тұрақты ток шамы үшін" }, role: { en: "Optional: switches a real 12 V lamp instead of the LED", ru: "По желанию: коммутирует настоящую лампу 12 В вместо светодиода", kk: "Қаласаңыз: жарық диодының орнына нағыз 12 В шамды қосады" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ldr", component: "ldr-module", label: "Light sensor" },
    { id: "pir", component: "pir-hc-sr501", label: "PIR" },
    { id: "r1", component: "resistor", label: "220 Ω" },
    { id: "lamp", component: "led", label: "Lamp" },
  ],
  connections: [
    { from: "board.5V", to: "ldr.VCC", color: "red" },
    { from: "ldr.GND", to: "board.GND", color: "black" },
    { from: "ldr.AO", to: "board.A0", color: "orange", note: { en: "analog output; DO stays unused", ru: "аналоговый выход; DO не используется", kk: "аналогтық шығыс; DO пайдаланылмайды" } },
    { from: "board.5V", to: "pir.VCC", color: "red" },
    { from: "pir.GND", to: "board.GND2", color: "black" },
    { from: "pir.OUT", to: "board.D2", color: "green", note: { en: "3.3 V HIGH, read fine by the Uno", ru: "HIGH 3,3 В, Uno читает его нормально", kk: "HIGH 3,3 В, Uno оны жақсы оқиды" } },
    { from: "board.D9", to: "r1.A", color: "yellow", note: { en: "PWM pin for the fade", ru: "ШИМ-пин для плавного включения", kk: "Біртіндеп жануға арналған ШИМ пині" } },
    { from: "r1.B", to: "lamp.A", color: "yellow", note: { en: "long leg", ru: "длинная ножка", kk: "ұзын аяғы" } },
    { from: "lamp.K", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Wire the light sensor", ru: "Подключите датчик освещённости", kk: "Жарық датчигін қосыңыз" },
      body: {
        en: "Connect the LDR module VCC to 5V, GND to GND and AO to A0. We use the analog output instead of DO because the sketch sets its own day/night thresholds with a gap between them (hysteresis), so the lamp does not flicker at dusk. The trimmer on the module only affects DO, so you can ignore it.",
        ru: "Подключите VCC модуля LDR к 5V, GND к GND, AO к A0. Мы берём аналоговый выход, а не DO, потому что скетч сам задаёт пороги дня и ночи с зазором между ними (гистерезис), и в сумерках фонарь не мигает. Подстроечник на модуле влияет только на DO, его можно не трогать.",
        kk: "LDR модулінің VCC-ін 5V-ке, GND-ін GND-ге, AO-ны A0-ге қосыңыз. DO емес, аналогтық шығысты аламыз, себебі скетч күн мен түннің шектерін арасында саңылауы бар етіп (гистерезис) өзі белгілейді, сонда ымыртта шам жыпылықтамайды. Модульдегі реттегіш тек DO-ға әсер етеді, оны қозғамасаңыз да болады.",
      },
      expect: { en: "The module's power LED is lit.", ru: "На модуле горит светодиод питания.", kk: "Модульдегі қорек жарық диоды жанып тұр." },
      mistake: { en: "Wiring DO to A0 gives only two values (about 0 or 1023) and the thresholds stop working.", ru: "Если подключить DO к A0, будет только два значения (около 0 или 1023), и пороги перестанут работать.", kk: "DO-ны A0-ге қоссаңыз, тек екі мән (шамамен 0 немесе 1023) болады да, шектер жұмыс істемейді." },
    },
    {
      title: { en: "Wire and set up the PIR", ru: "Подключите и настройте PIR", kk: "PIR-ды қосып, баптаңыз" },
      body: {
        en: "Connect PIR VCC to 5V, GND to GND and OUT to D2. Turn the time trimmer (Tx) fully anticlockwise for the shortest pulse of about 3 s and put the jumper on H (repeat trigger): the sketch handles the 20 s hold time itself. Start the sensitivity trimmer in the middle. After power-up the PIR needs 30–60 seconds to settle, and the sketch ignores it during that time.",
        ru: "Подключите VCC PIR к 5V, GND к GND, OUT к D2. Поверните подстроечник времени (Tx) до упора против часовой стрелки, чтобы импульс был самым коротким, около 3 с, а перемычку поставьте в положение H (повторный запуск): удержание 20 с скетч делает сам. Подстроечник чувствительности для начала поставьте в середину. После включения PIR нужно 30–60 секунд на стабилизацию, и всё это время скетч его игнорирует.",
        kk: "PIR-дың VCC-ін 5V-ке, GND-ін GND-ге, OUT-ын D2-ге қосыңыз. Уақыт реттегішін (Tx) сағат тіліне қарсы шетке дейін бұраңыз, сонда импульс ең қысқа, шамамен 3 с болады, ал секіргішті H күйіне (қайта іске қосу) қойыңыз: 20 с ұстауды скетч өзі жасайды. Сезімталдық реттегішін алдымен ортаға қойыңыз. Қосылғаннан кейін PIR-ге тұрақталу үшін 30–60 секунд керек, осы уақытта скетч оны елемейді.",
      },
      expect: { en: "After the warm-up, waving a hand makes the Serial Monitor print pir=1.", ru: "После прогрева взмах рукой даёт pir=1 в Serial Monitor.", kk: "Қызудан кейін қол бұлғасаңыз, Serial Monitor pir=1 шығарады." },
      mistake: { en: "With the time trimmer turned up, the PIR holds OUT high for minutes and the lamp seems stuck on.", ru: "Если подстроечник времени выкручен, PIR держит OUT высоким минутами, и кажется, что фонарь завис включённым.", kk: "Уақыт реттегіші бұралып тұрса, PIR OUT-ты бірнеше минут жоғары ұстайды да, шам қосулы күйде қатып қалғандай көрінеді." },
    },
    {
      title: { en: "Add the lamp LED", ru: "Добавьте светодиод-фонарь", kk: "Шам жарық диодын қосыңыз" },
      body: {
        en: "Run D9 to a 220 Ω resistor, the resistor to the LED's long leg, and the short leg to GND. D9 is a PWM pin, so the sketch can fade the lamp in and out like a real dimmable street light.",
        ru: "Проведите D9 к резистору 220 Ом, резистор к длинной ножке светодиода, короткую ножку к GND. D9 поддерживает ШИМ, поэтому скетч плавно зажигает и гасит фонарь, как настоящий диммируемый уличный светильник.",
        kk: "D9-ды 220 Ом резисторға, резисторды жарық диодының ұзын аяғына, қысқа аяғын GND-ге жалғаңыз. D9 ШИМ-ді қолдайды, сондықтан скетч шамды нағыз жарықтығы реттелетін көше шамы сияқты біртіндеп жағып, сөндіреді.",
      },
      expect: { en: "The LED stays off for now: it is daytime for the sensor.", ru: "Пока светодиод не горит: для датчика сейчас день.", kk: "Әзірге жарық диоды жанбайды: датчик үшін қазір күндіз." },
      mistake: { en: "Placing the LED right next to the light sensor: it lights the sensor and the sketch thinks it is day.", ru: "Светодиод вплотную к датчику освещённости: он светит на датчик, и скетч решает, что наступил день.", kk: "Жарық диоды жарық датчигінің дәл қасында болса, ол датчикке жарық түсіреді де, скетч күндіз болды деп ойлайды." },
    },
    {
      title: { en: "Upload and calibrate day/night", ru: "Загрузите скетч и настройте день/ночь", kk: "Скетчті жүктеп, күн/түнді баптаңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. Every 2 seconds it prints the light value. Note it in normal room light, then cover the sensor with your hand. On most modules the number rises as it gets darker; if yours falls, set INVERT_LDR = true. Set DARK_ON a little below the covered value and DARK_OFF about 100 lower, then upload again.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Раз в 2 секунды он печатает уровень освещённости. Запишите значение при обычном свете в комнате, затем закройте датчик рукой. У большинства модулей число растёт при затемнении; если у вас падает, поставьте INVERT_LDR = true. Задайте DARK_ON чуть ниже значения с закрытым датчиком, а DARK_OFF примерно на 100 меньше, и загрузите снова.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Ол әр 2 секунд сайын жарық деңгейін шығарады. Бөлмедегі қалыпты жарықтағы мәнді жазып алып, датчикті қолыңызбен жабыңыз. Модульдердің көбінде қараңғыланғанда сан өседі; сіздікінде азайса, INVERT_LDR = true қойыңыз. DARK_ON-ды жабық датчик мәнінен сәл төмен, ал DARK_OFF-ты шамамен 100-ге кем етіп қойып, қайта жүктеңіз.",
      },
      expect: { en: "Covering the sensor prints \"-> night\", uncovering prints \"-> day\".", ru: "Если закрыть датчик, печатается «-> night», если открыть, «-> day».", kk: "Датчикті жапсаңыз «-> night», ашсаңыз «-> day» шығады." },
      mistake: { en: "Setting DARK_ON and DARK_OFF to the same value brings back flicker at dusk.", ru: "Одинаковые DARK_ON и DARK_OFF возвращают мигание в сумерках.", kk: "DARK_ON мен DARK_OFF бірдей болса, ымыртта жыпылықтау қайта пайда болады." },
    },
    {
      title: { en: "Test the full logic", ru: "Проверьте всю логику", kk: "Бүкіл логиканы тексеріңіз" },
      body: {
        en: "Cover the light sensor (night) and walk past the PIR: the lamp fades on. Stand still out of view: 20 seconds after the last motion it fades off. Uncover the sensor (day) and move in front of the PIR: nothing happens. While the lamp is on, the sketch freezes the day/night decision so its own light cannot switch it off.",
        ru: "Закройте датчик освещённости (ночь) и пройдите мимо PIR: фонарь плавно загорается. Замрите вне поля зрения: через 20 секунд после последнего движения он плавно гаснет. Откройте датчик (день) и подвигайтесь перед PIR: ничего не происходит. Пока фонарь горит, скетч замораживает решение день/ночь, чтобы собственный свет его не выключил.",
        kk: "Жарық датчигін жауып (түн), PIR-дің жанынан өтіңіз: шам біртіндеп жанады. Көру аймағынан тыс қозғалмай тұрыңыз: соңғы қозғалыстан 20 секунд кейін ол біртіндеп сөнеді. Датчикті ашып (күн), PIR алдында қозғалыңыз: ештеңе болмайды. Шам жанып тұрғанда скетч күн/түн шешімін қатырып қояды, сонда шамның өз жарығы оны сөндірмейді.",
      },
      expect: { en: "Lamp on only for dark + motion, off 20 s later.", ru: "Фонарь горит только при темноте и движении и гаснет через 20 с.", kk: "Шам тек қараңғылық пен қозғалыс болғанда жанып, 20 с кейін сөнеді." },
      mistake: { en: "Testing in the first 30 seconds after reset: the PIR is still warming up and is ignored.", ru: "Проверка в первые 30 секунд после сброса: PIR ещё прогревается и игнорируется.", kk: "Қайта жүктегеннен кейінгі алғашқы 30 секундта тексеру: PIR әлі қызып жатыр және еленбейді." },
    },
    {
      title: { en: "Optional: switch a 12 V lamp with a relay", ru: "По желанию: лампа 12 В через реле", kk: "Қаласаңыз: 12 В шамды реле арқылы қосу" },
      body: {
        en: "For a real 12 V DC LED lamp, remove the LED and resistor and wire a relay module instead: VCC to 5V, GND to GND, IN to D9. On the high-current side, 12 V supply + goes to COM, NO goes to lamp +, and lamp − returns to supply −. Set USE_RELAY = true (and RELAY_ACTIVE_LOW = true for most blue relay boards, which switch on a LOW input). The relay simply clicks on and off instead of fading.",
        ru: "Для настоящей светодиодной лампы 12 В постоянного тока снимите светодиод с резистором и подключите модуль реле: VCC к 5V, GND к GND, IN к D9. На силовой стороне плюс блока 12 В идёт на COM, NO на плюс лампы, минус лампы возвращается на минус блока. Поставьте USE_RELAY = true (и RELAY_ACTIVE_LOW = true для большинства синих плат реле, которые включаются низким уровнем). Реле просто щёлкает вместо плавного включения.",
        kk: "Нағыз 12 В тұрақты ток жарық диодты шамы үшін жарық диоды мен резисторды алып, реле модулін қосыңыз: VCC-ті 5V-ке, GND-ті GND-ге, IN-ді D9-ға. Қуатты жақта 12 В қорек блогының плюсі COM-ға, NO шамның плюсіне барады, ал шам минусы блоктың минусына қайтады. USE_RELAY = true қойыңыз (төмен деңгейде қосылатын көк реле платаларының көбі үшін RELAY_ACTIVE_LOW = true). Реле біртіндеп жанудың орнына жай шырт етіп қосылады.",
      },
      expect: { en: "The relay clicks and the 12 V lamp turns on for dark + motion.", ru: "Реле щёлкает, и лампа 12 В загорается при темноте и движении.", kk: "Реле шырт етіп, қараңғылық пен қозғалыс болғанда 12 В шам жанады." },
      mistake: { en: "Leaving USE_RELAY false: the PWM fade makes the relay chatter.", ru: "Если оставить USE_RELAY = false, плавное ШИМ-включение заставит реле дребезжать.", kk: "USE_RELAY = false қалса, ШИМ арқылы біртіндеп жағу релені дірілдетеді." },
    },
  ],
  code: [{
    filename: "smart_street_light.ino",
    language: "cpp",
    libraries: [],
    source: `const int LDR_PIN = A0;              // light module AO
const int PIR_PIN = 2;               // HC-SR501 OUT
const int LAMP_PIN = 9;              // LED through 220 ohm, or relay IN

const bool USE_RELAY = false;        // true: D9 drives a relay module (on/off, no fade)
const bool RELAY_ACTIVE_LOW = true;  // most blue relay boards switch on LOW
const bool INVERT_LDR = false;       // true if your module reads LOWER in the dark

const int DARK_ON = 700;             // light value above this = night
const int DARK_OFF = 600;            // below this = day again (hysteresis)
const unsigned long HOLD_MS = 20000;     // stay on after the last motion
const unsigned long WARMUP_MS = 30000;   // PIR settling time after power-up

bool isNight = false;
bool lampOn = false;
int brightness = 0;
unsigned long lastMotion = 0, lampOffSince = 0, lastFade = 0, lastPrint = 0;

int readDarkness() {
  long sum = 0;
  for (int i = 0; i < 16; i++) sum += analogRead(LDR_PIN);
  int value = sum / 16;
  return INVERT_LDR ? 1023 - value : value;
}

void writeLamp(int level) {
  if (USE_RELAY) {
    bool on = level > 0;
    digitalWrite(LAMP_PIN, (on != RELAY_ACTIVE_LOW) ? HIGH : LOW);
  } else {
    analogWrite(LAMP_PIN, level);
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(PIR_PIN, INPUT);
  writeLamp(0);                      // set the idle level before the pin becomes an output
  pinMode(LAMP_PIN, OUTPUT);
  Serial.println("warming up PIR (30 s)");
}

void loop() {
  unsigned long now = millis();
  int dark = readDarkness();

  // decide day/night only while the lamp has been off for 2 s, so its own light can't fool the sensor
  if (!lampOn && brightness == 0 && now - lampOffSince > 2000) {
    if (!isNight && dark > DARK_ON) { isNight = true; Serial.print("light "); Serial.print(dark); Serial.println(" -> night"); }
    if (isNight && dark < DARK_OFF) { isNight = false; Serial.print("light "); Serial.print(dark); Serial.println(" -> day"); }
  }

  bool motion = now > WARMUP_MS && digitalRead(PIR_PIN) == HIGH;
  if (motion) lastMotion = now;

  if (!lampOn && isNight && motion) {
    lampOn = true;
    Serial.println("motion -> lamp ON");
  }
  if (lampOn && now - lastMotion > HOLD_MS) {
    lampOn = false;
    lampOffSince = now;
    Serial.println("no motion for 20 s -> lamp OFF");
  }

  // fade 0..255 in about one second
  if (now - lastFade >= 4) {
    lastFade = now;
    int target = lampOn ? 255 : 0;
    if (USE_RELAY) brightness = target;
    else if (brightness < target) brightness++;
    else if (brightness > target) brightness--;
    writeLamp(brightness);
  }

  if (now - lastPrint >= 2000) {
    lastPrint = now;
    Serial.print("light ");
    Serial.print(dark);
    Serial.print(" night=");
    Serial.print(isNight);
    Serial.print(" pir=");
    Serial.print(digitalRead(PIR_PIN));
    Serial.print(" lamp=");
    Serial.println(lampOn);
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The lamp switches on and off by itself at night", ru: "Ночью фонарь сам включается и выключается", kk: "Түнде шам өздігінен қосылып-сөніп тұрады" },
      cause: { en: "The PIR sees warm air, a heater or moving curtains, or the sensitivity is too high.", ru: "PIR видит тёплый воздух, обогреватель или колышущиеся шторы, либо чувствительность слишком высокая.", kk: "PIR жылы ауаны, жылытқышты немесе тербелген перделерді көреді, не сезімталдық тым жоғары." },
      fix: { en: "Turn the sensitivity trimmer down a little and point the PIR away from heat sources.", ru: "Немного уменьшите чувствительность подстроечником и отверните PIR от источников тепла.", kk: "Сезімталдық реттегішін сәл азайтып, PIR-ды жылу көздерінен басқа жаққа бұрыңыз." },
    },
    {
      symptom: { en: "It never becomes night, even with the sensor covered", ru: "Ночь не наступает даже с закрытым датчиком", kk: "Датчик жабық болса да түн болмайды" },
      cause: { en: "Your module reads lower in the dark, or DARK_ON is higher than the covered value.", ru: "Ваш модуль в темноте показывает меньше, или DARK_ON выше значения с закрытым датчиком.", kk: "Сіздің модуль қараңғыда азырақ көрсетеді немесе DARK_ON жабық датчик мәнінен жоғары." },
      fix: { en: "Watch the printed light value, set INVERT_LDR if needed and lower DARK_ON and DARK_OFF.", ru: "Посмотрите выводимое значение, при необходимости включите INVERT_LDR и уменьшите DARK_ON и DARK_OFF.", kk: "Шығарылатын мәнді қарап, қажет болса INVERT_LDR қосып, DARK_ON мен DARK_OFF-ты азайтыңыз." },
    },
    {
      symptom: { en: "The lamp stays on long after you leave", ru: "Фонарь долго горит после того, как вы ушли", kk: "Сіз кеткеннен кейін шам ұзақ жанып тұрады" },
      cause: { en: "The PIR time trimmer is turned up, so OUT stays HIGH for minutes and keeps resetting the 20 s timer.", ru: "Подстроечник времени PIR выкручен: OUT держится HIGH минутами и всё время перезапускает таймер 20 с.", kk: "PIR уақыт реттегіші бұралған: OUT бірнеше минут HIGH болып, 20 с таймерін үнемі қайта бастайды." },
      fix: { en: "Turn the Tx trimmer fully anticlockwise and change HOLD_MS in the sketch instead.", ru: "Поверните подстроечник Tx до упора против часовой стрелки, а время меняйте через HOLD_MS в скетче.", kk: "Tx реттегішін сағат тіліне қарсы шетке дейін бұрап, уақытты скетчтегі HOLD_MS арқылы өзгертіңіз." },
    },
  ],
  safety: [
    { en: "The relay option is for a 12 V DC lamp only. Never switch mains voltage with this project.", ru: "Вариант с реле только для лампы 12 В постоянного тока. Никогда не коммутируйте в этом проекте сетевое напряжение.", kk: "Реле нұсқасы тек 12 В тұрақты ток шамына арналған. Бұл жобада желі кернеуін ешқашан қоспаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "warming up PIR (30 s)",
      "light 284 night=0 pir=0 lamp=0",
      "light 291 night=0 pir=1 lamp=0",
      "light 788 -> night",
      "light 790 night=1 pir=0 lamp=0",
      "motion -> lamp ON",
      "light 802 night=1 pir=1 lamp=1",
      "light 801 night=1 pir=0 lamp=1",
      "no motion for 20 s -> lamp OFF",
      "light 795 night=1 pir=0 lamp=0",
      "light 412 -> day",
    ],
    leds: [{ label: "LAMP", color: "#FFD54F" }],
  },
} satisfies GuideContent;
