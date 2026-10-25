import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "flame-detector-alarm",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "security",
  robotics: false,
  difficulty: "beginner",
  hours: 1,
  costUsd: 9,
  xpReward: 120,
  title: {
    en: "Flame Detector Alarm",
    ru: "Сигнализация пламени",
    kk: "Жалын детекторы дабылы",
  },
  summary: {
    en: "An infrared flame sensor spots a candle or lighter flame and the Uno sounds a buzzer and lights an LED. You also learn why sunlight and lamps fool IR sensors and how to avoid false alarms.",
    ru: "Инфракрасный датчик пламени замечает огонь свечи или зажигалки, и Uno включает зуммер и светодиод. Заодно вы узнаете, почему солнце и лампы обманывают ИК-датчики и как избежать ложных тревог.",
    kk: "Инфрақызыл жалын датчигі шам не оттық жалынын байқайды, ал Uno зуммер мен жарық диодын қосады. Сонымен қатар күн мен шамдардың ИҚ датчиктерді неге алдайтынын және жалған дабылдан қалай сақтануды білесіз.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "flame-sensor", qty: 1, spec: { en: "KY-026 / LM393 board, IR phototransistor 760–1100 nm, AO + DO", ru: "плата KY-026 / LM393, ИК-фототранзистор 760–1100 нм, AO + DO", kk: "KY-026 / LM393 платасы, ИҚ фототранзистор 760–1100 нм, AO + DO" }, role: { en: "Senses the infrared light of a flame", ru: "Улавливает инфракрасное излучение пламени", kk: "Жалынның инфрақызыл сәулесін сезеді" } },
    { component: "buzzer-active", qty: 1, spec: { en: "5 V active buzzer, 2 pins", ru: "активный зуммер 5 В, 2 вывода", kk: "5 В белсенді зуммер, 2 шықпа" }, role: { en: "Audible alarm", ru: "Звуковая тревога", kk: "Дыбыстық дабыл" } },
    { component: "led", qty: 1, spec: { en: "5 mm red", ru: "5 мм, красный", kk: "5 мм, қызыл" }, role: { en: "Alarm light", ru: "Световой сигнал тревоги", kk: "Дабыл шамы" } },
    { component: "resistor", qty: 1, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиода", kk: "Жарық диодының тогын шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "fl", component: "flame-sensor", label: "Flame sensor" },
    { id: "bz", component: "buzzer-active", label: "Buzzer" },
    { id: "r1", component: "resistor", label: "220 Ω" },
    { id: "led", component: "led", label: "Alarm LED" },
  ],
  connections: [
    { from: "board.5V", to: "fl.VCC", color: "red" },
    { from: "fl.GND", to: "board.GND", color: "black" },
    { from: "fl.DO", to: "board.D2", color: "green", note: { en: "comparator output, flips when a flame is seen", ru: "выход компаратора, меняется при виде пламени", kk: "компаратор шығысы, жалын көрінгенде ауысады" } },
    { from: "fl.AO", to: "board.A0", color: "orange", note: { en: "raw IR level, for diagnostics", ru: "сырой уровень ИК, для диагностики", kk: "бастапқы ИҚ деңгейі, тексеру үшін" } },
    { from: "board.D8", to: "bz.+", color: "purple" },
    { from: "bz.-", to: "board.GND2", color: "black" },
    { from: "board.D9", to: "r1.A", color: "red" },
    { from: "r1.B", to: "led.A", color: "red", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led.K", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Wire the flame sensor", ru: "Подключите датчик пламени", kk: "Жалын датчигін қосыңыз" },
      body: {
        en: "Connect VCC (+) to 5V, GND to GND, DO to D2 and AO to A0. The dark \"LED\" at the front is not a light source: it is an infrared phototransistor that responds to 760–1100 nm, the near-infrared that hot flames emit strongly. The LM393 comparator turns its signal into DO using the threshold set by the blue trimmer.",
        ru: "Подключите VCC (+) к 5V, GND к GND, DO к D2, AO к A0. Тёмный «светодиод» спереди ничего не излучает: это инфракрасный фототранзистор, чувствительный к 760–1100 нм, ближнему ИК, которое сильно излучает горячее пламя. Компаратор LM393 превращает его сигнал в DO по порогу, заданному синим подстроечником.",
        kk: "VCC-ті (+) 5V-ке, GND-ні GND-ге, DO-ны D2-ге, AO-ны A0-ге қосыңыз. Алдындағы қара «жарық диоды» жарық шығармайды: бұл 760–1100 нм-ге, яғни ыстық жалын қатты шығаратын жақын инфрақызыл сәулеге сезімтал ИҚ фототранзистор. LM393 компараторы оның сигналын көк реттегішпен қойылған шек бойынша DO-ға айналдырады.",
      },
      expect: { en: "The power LED on the sensor board lights.", ru: "Загорается светодиод питания на плате датчика.", kk: "Датчик платасындағы қуат шамы жанады." },
      mistake: { en: "Bending the phototransistor's legs back and forth until one breaks; bend them once, gently.", ru: "Гнуть ножки фототранзистора туда-сюда, пока одна не сломается; согните их один раз и аккуратно.", kk: "Фототранзистордың аяқтарын біреуі сынғанша әрі-бері майыстыру; оларды бір рет, абайлап майыстырыңыз." },
    },
    {
      title: { en: "Add the buzzer and LED", ru: "Добавьте зуммер и светодиод", kk: "Зуммер мен жарық диодын қосыңыз" },
      body: {
        en: "Active buzzer: + to D8, − to GND. LED: D9 through a 220 Ω resistor to the long leg, short leg to GND.",
        ru: "Активный зуммер: + к D8, − к GND. Светодиод: D9 через резистор 220 Ом к длинной ножке, короткая ножка к GND.",
        kk: "Белсенді зуммер: + D8-ге, − GND-ге. Жарық диоды: D9 220 Ом резистор арқылы ұзын аяғына, қысқа аяғы GND-ге.",
      },
      expect: { en: "Buzzer on D8, LED with resistor on D9.", ru: "Зуммер на D8, светодиод с резистором на D9.", kk: "Зуммер D8-де, резисторы бар жарық диоды D9-да." },
      mistake: { en: "Putting the LED in backwards: it simply stays dark.", ru: "Светодиод, вставленный наоборот, просто не горит.", kk: "Кері қойылған жарық диоды жай ғана жанбайды." },
    },
    {
      title: { en: "Set the trimmer for your room", ru: "Настройте подстроечник под комнату", kk: "Реттегішті бөлмеңізге қарай баптаңыз" },
      body: {
        en: "Power the Uno, point the sensor where it will be used, with no flame nearby. Turn the blue trimmer slowly until the DO LED on the sensor board just switches off, then a little further. Now the room's normal light is below the threshold and only a stronger IR source flips DO.",
        ru: "Включите Uno и направьте датчик туда, куда он будет смотреть, без огня рядом. Медленно крутите синий подстроечник, пока светодиод DO на плате датчика не погаснет, и ещё немного дальше. Теперь обычный свет комнаты ниже порога, и DO переключит только более сильный источник ИК.",
        kk: "Uno-ны қосып, датчикті ол жұмыс істейтін жаққа бағыттаңыз, жанында от болмасын. Датчик платасындағы DO шамы сөнгенше көк реттегішті ақырын бұраңыз, содан кейін тағы сәл бұраңыз. Енді бөлменің қалыпты жарығы шектен төмен, ал DO-ны тек күштірек ИҚ көзі ғана ауыстырады.",
      },
      expect: { en: "DO LED off in normal room light.", ru: "Светодиод DO не горит при обычном освещении.", kk: "Бөлменің қалыпты жарығында DO шамы сөнік." },
      mistake: { en: "Adjusting it in a dark room and then using it in daylight: it will trigger constantly.", ru: "Настроить в тёмной комнате, а использовать днём: датчик будет срабатывать постоянно.", kk: "Қараңғы бөлмеде баптап, күндіз қолдану: датчик үнемі іске қосыла береді." },
    },
    {
      title: { en: "Upload and let it learn its idle state", ru: "Загрузите скетч и дайте ему запомнить покой", kk: "Скетчті жүктеп, тыныштық күйін үйренуіне мүмкіндік беріңіз" },
      body: {
        en: "Different flame boards use opposite DO polarity: some go LOW on a flame, some HIGH. So the sketch reads DO for one second at start-up, with no flame present, and treats the opposite level as \"flame\". Upload, open the Serial Monitor at 9600 baud and check the learned level.",
        ru: "У разных плат датчика пламени полярность DO противоположная: одни дают LOW при огне, другие HIGH. Поэтому скетч при запуске секунду читает DO без огня рядом и считает «пламенем» противоположный уровень. Загрузите скетч, откройте Serial Monitor на 9600 бод и проверьте, какой уровень он запомнил.",
        kk: "Жалын датчигінің әртүрлі платаларында DO полярлығы қарама-қарсы: біреулері от болғанда LOW, басқалары HIGH береді. Сондықтан скетч іске қосылғанда от жоқ кезде DO-ны бір секунд оқып, қарама-қарсы деңгейді «жалын» деп санайды. Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз және ол қандай деңгейді есте сақтағанын тексеріңіз.",
      },
      expect: { en: "\"Idle DO level = HIGH\" (or LOW), then \"Watching for flames\".", ru: "«Idle DO level = HIGH» (или LOW), затем «Watching for flames».", kk: "«Idle DO level = HIGH» (немесе LOW), содан кейін «Watching for flames»." },
      mistake: { en: "Holding the flame in front of it while it starts up: it learns the flame as \"normal\".", ru: "Держать огонь перед датчиком во время запуска: он запомнит пламя как «норму».", kk: "Іске қосылу кезінде датчиктің алдында от ұстау: ол жалынды «қалыпты» деп есте сақтайды." },
    },
    {
      title: { en: "Test with a candle", ru: "Проверьте свечой", kk: "Шаммен тексеріңіз" },
      body: {
        en: "Stand a tea-light on a plate about 50 cm in front of the sensor and light it. The alarm should sound and the LED light; the sketch keeps alarming for 3 seconds after the last detection because a flickering flame makes DO flicker too. Move the candle further away and to the side to find your range; the sensor sees in a cone of roughly 60°. Watch how ir= in the Serial Monitor changes as the flame gets closer.",
        ru: "Поставьте чайную свечу на тарелку примерно в 50 см перед датчиком и зажгите её. Должны включиться зуммер и светодиод; скетч держит тревогу ещё 3 секунды после последнего обнаружения, потому что мерцающее пламя заставляет мерцать и DO. Отодвигайте свечу дальше и вбок, чтобы найти дальность; датчик видит в конусе примерно 60°. Следите, как меняется ir= в Serial Monitor при приближении огня.",
        kk: "Шай шамын датчиктің алдына шамамен 50 см қашықтықта тәрелкеге қойып, жағыңыз. Зуммер мен жарық диоды қосылуы керек; жыпылықтаған жалын DO-ны да жыпылықтататындықтан, скетч соңғы анықтаудан кейін дабылды тағы 3 секунд ұстайды. Ауқымды анықтау үшін шамды алысырақ және бүйірге жылжытыңыз; датчик шамамен 60° конус ішінде көреді. От жақындаған сайын Serial Monitor-дағы ir= мәнінің қалай өзгеретінін бақылаңыз.",
      },
      expect: { en: "\"FLAME!\" when the candle is lit, \"Clear\" about 3 s after you blow it out.", ru: "«FLAME!» при зажжённой свече и «Clear» примерно через 3 с после того, как вы её задуете.", kk: "Шам жанғанда «FLAME!», ал оны үрлеп сөндіргеннен кейін шамамен 3 с өткенде «Clear»." },
      mistake: { en: "Holding a lighter right at the sensor: the heat can damage it, and 50 cm is a more honest test.", ru: "Подносить зажигалку вплотную: жар может повредить датчик, а 50 см это более честная проверка.", kk: "Оттықты датчикке тақап ұстау: ыстық оны бүлдіруі мүмкін, ал 50 см әділетті тексеру болады." },
    },
    {
      title: { en: "Understand and avoid false triggers", ru: "Разберитесь с ложными срабатываниями", kk: "Жалған іске қосылуларды түсініп, болдырмаңыз" },
      body: {
        en: "The sensor only measures how much near-infrared light arrives; it cannot tell a flame from other IR sources. Direct or reflected sunlight is full of infrared and will trigger it, as will incandescent and halogen bulbs, a glowing heater and even the IR flashes of a TV remote. Point it away from windows and lamps, and put a short black tube (a piece of drinking straw or heat-shrink) over the phototransistor to narrow its view.",
        ru: "Датчик измеряет только, сколько ближнего ИК-света до него доходит, и не может отличить пламя от других источников ИК. Прямой или отражённый солнечный свет полон инфракрасного излучения и вызовет срабатывание, так же как лампы накаливания и галогенки, раскалённый обогреватель и даже ИК-вспышки пульта от телевизора. Направьте датчик в сторону от окон и ламп и наденьте на фототранзистор короткую чёрную трубку (кусок трубочки для напитков или термоусадки), чтобы сузить поле зрения.",
        kk: "Датчик тек өзіне жеткен жақын ИҚ жарықтың мөлшерін өлшейді және жалынды басқа ИҚ көздерінен ажырата алмайды. Тікелей немесе шағылысқан күн сәулесінде инфрақызыл сәуле көп, ол датчикті іске қосады, қыздыру шамдары мен галоген шамдары, қызған жылытқыш, тіпті теледидар пультінің ИҚ жарқылдары да солай етеді. Датчикті терезелер мен шамдардан басқа жаққа бағыттаңыз және көру аймағын тарылту үшін фототранзисторға қысқа қара түтік (сусын түтікшесінің бөлігі немесе термоотырғызғыш) кигізіңіз.",
      },
      expect: { en: "No alarms in normal daylight indoors; the candle still triggers it.", ru: "Днём в помещении нет ложных тревог, а свеча по-прежнему вызывает срабатывание.", kk: "Күндіз бөлме ішінде жалған дабыл жоқ, ал шам әлі де іске қосады." },
      mistake: { en: "Pointing it at a sunny window and raising the threshold until it ignores the sun: it then ignores real flames too.", ru: "Направить на солнечное окно и поднимать порог, пока датчик не перестанет видеть солнце: тогда он не увидит и настоящий огонь.", kk: "Күн түсіп тұрған терезеге бағыттап, датчик күнді көрмейтін болғанша шекті көтеру: сонда ол нағыз отты да көрмейді." },
    },
  ],
  code: [{
    filename: "flame_alarm.ino",
    language: "cpp",
    libraries: [],
    source: `const int FLAME_DO_PIN = 2;     // comparator output
const int FLAME_AO_PIN = A0;    // raw IR level, printed for diagnostics
const int BUZZER_PIN = 8;
const int LED_PIN = 9;

const unsigned long HOLD_MS = 3000;   // keep alarming 3 s after the last detection (flames flicker)

int idleLevel = HIGH;           // DO level with no flame, learned at start-up
bool alarmOn = false;
unsigned long lastSeen = 0, lastPrint = 0;

void setup() {
  Serial.begin(9600);
  pinMode(FLAME_DO_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);

  Serial.println(F("Learning idle level - no flame please"));
  delay(1000);
  int highs = 0;
  for (int i = 0; i < 20; i++) {        // 1 s of samples
    highs += digitalRead(FLAME_DO_PIN);
    delay(50);
  }
  idleLevel = highs >= 10 ? HIGH : LOW;
  Serial.print(F("Idle DO level = "));
  Serial.println(idleLevel == HIGH ? F("HIGH") : F("LOW"));
  if (highs > 2 && highs < 18) {
    Serial.println(F("Warning: DO is unstable. Turn the trimmer until the DO LED is off, then reset."));
  }
  Serial.println(F("Watching for flames"));
}

void loop() {
  unsigned long now = millis();
  int ir = analogRead(FLAME_AO_PIN);
  bool flame = digitalRead(FLAME_DO_PIN) != idleLevel;

  if (flame) {
    lastSeen = now;
    if (!alarmOn) {
      alarmOn = true;
      Serial.print(F("FLAME! ir="));
      Serial.println(ir);
    }
  } else if (alarmOn && now - lastSeen >= HOLD_MS) {
    alarmOn = false;
    Serial.println(F("Clear"));
  }

  bool beep = (now / 150) % 2;          // fast pulsing tone
  digitalWrite(BUZZER_PIN, alarmOn && beep);
  digitalWrite(LED_PIN, alarmOn);

  if (now - lastPrint >= 1000) {
    lastPrint = now;
    Serial.print(F("ir="));
    Serial.print(ir);
    Serial.println(alarmOn ? F(" flame=yes") : F(" flame=no"));
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "It alarms all the time, even without a flame", ru: "Тревога всё время, даже без огня", kk: "От болмаса да дабыл үнемі қосулы" },
      cause: { en: "Sunlight, a halogen lamp or a heater is in its view, or the trimmer is set too sensitive, or the board started with a flame in view and learned the wrong idle level.", ru: "В поле зрения солнце, галогенная лампа или обогреватель, подстроечник слишком чувствительный, или плата запустилась при огне и запомнила неверный уровень покоя.", kk: "Көру аймағында күн, галоген шамы не жылытқыш бар, реттегіш тым сезімтал немесе плата от бар кезде іске қосылып, тыныштық деңгейін қате есте сақтаған." },
      fix: { en: "Turn the sensor away from windows and lamps, re-set the trimmer so the DO LED is off, and press reset with no flame present.", ru: "Отверните датчик от окон и ламп, заново настройте подстроечник так, чтобы DO не горел, и нажмите reset без огня рядом.", kk: "Датчикті терезелер мен шамдардан бұрыңыз, DO шамы сөнетіндей реттегішті қайта баптаңыз және жанында от жоқ кезде reset басыңыз." },
    },
    {
      symptom: { en: "A candle 30 cm away is not detected", ru: "Свеча в 30 см не обнаруживается", kk: "30 см қашықтықтағы шам анықталмайды" },
      cause: { en: "The trimmer is set too far towards insensitive, or the flame is outside the sensor's cone.", ru: "Подстроечник выкручен слишком далеко в сторону нечувствительности, или пламя вне конуса обзора.", kk: "Реттегіш сезімсіздік жағына тым алыс бұралған немесе жалын көру конусынан тыс." },
      fix: { en: "Point the phototransistor straight at the flame and turn the trimmer back until the DO LED lights with the candle and goes off without it.", ru: "Направьте фототранзистор прямо на пламя и поверните подстроечник обратно, чтобы DO загорался со свечой и гас без неё.", kk: "Фототранзисторды тура жалынға бағыттап, DO шамы шаммен жанып, шамсыз сөнетіндей реттегішті кері бұраңыз." },
    },
    {
      symptom: { en: "Short chirps when someone uses the TV remote", ru: "Короткие писки, когда кто-то пользуется пультом от телевизора", kk: "Біреу теледидар пультін басқанда қысқа дыбыстар шығады" },
      cause: { en: "The remote's 940 nm IR LED is inside the sensor's 760–1100 nm range.", ru: "ИК-светодиод пульта на 940 нм попадает в диапазон датчика 760–1100 нм.", kk: "Пульттің 940 нм ИҚ жарық диоды датчиктің 760–1100 нм ауқымына кіреді." },
      fix: { en: "Fit the black tube over the sensor, or require the flame to be seen for half a second before alarming.", ru: "Наденьте на датчик чёрную трубку или требуйте, чтобы пламя было видно полсекунды до тревоги.", kk: "Датчикке қара түтік кигізіңіз немесе дабыл алдында жалын жарты секунд көрінуін талап етіңіз." },
    },
  ],
  safety: [
    { en: "Test only with a small candle on a non-flammable plate, at least 30 cm from the sensor, wires and anything that can burn. Never leave a flame unattended.", ru: "Проверяйте только маленькой свечой на негорючей тарелке, не ближе 30 см к датчику, проводам и всему, что может гореть. Никогда не оставляйте огонь без присмотра.", kk: "Тек жанбайтын тәрелкедегі шағын шаммен, датчиктен, сымдардан және жануы мүмкін заттардан кемінде 30 см қашықтықта тексеріңіз. Отты ешқашан қараусыз қалдырмаңыз." },
    { en: "This is a learning project, not a fire alarm. It does not detect smoke or flames out of its line of sight; keep certified smoke detectors in your home.", ru: "Это учебный проект, а не пожарная сигнализация. Он не видит дым и пламя вне прямой видимости; дома должны стоять сертифицированные дымовые извещатели.", kk: "Бұл оқу жобасы, өрт дабылы емес. Ол түтінді және тікелей көрінбейтін жалынды анықтамайды; үйде сертификатталған түтін датчиктері тұруы керек." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "Learning idle level - no flame please",
      "Idle DO level = HIGH",
      "Watching for flames",
      "ir=962 flame=no",
      "ir=958 flame=no",
      "FLAME! ir=412",
      "ir=398 flame=yes",
      "ir=405 flame=yes",
      "Clear",
      "ir=960 flame=no",
    ],
    leds: [{ label: "ALARM", color: "#E53935" }],
  },
} satisfies GuideContent;
