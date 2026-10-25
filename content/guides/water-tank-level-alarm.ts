import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "water-tank-level-alarm",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "home",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 10,
  xpReward: 130,
  title: {
    en: "Water Tank Overfill Alarm",
    ru: "Сигнализация переполнения бака",
    kk: "Бактың толып кету дабылы",
  },
  summary: {
    en: "A water level strip near the top of a tank or bucket lights green, yellow or red as the water rises, and a buzzer beeps when it is full so you stop filling in time.",
    ru: "Датчик уровня воды у верхнего края бака или ведра зажигает зелёный, жёлтый или красный по мере подъёма воды, а зуммер пищит, когда бак полон, чтобы вы вовремя перекрыли воду.",
    kk: "Бактың не шелектің жоғарғы жиегіндегі су деңгейі датчигі су көтерілген сайын жасыл, сары немесе қызыл шамды жағады, ал бак толғанда зуммер дыбыс береді, сонда суды уақытында жабасыз.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "water-level", qty: 1, spec: { en: "resistive strip, ~4 cm sensing length, 3 pins (S + −)", ru: "резистивная полоска, чувствительная зона ~4 см, 3 вывода (S + −)", kk: "резистивті жолақ, сезгіш бөлігі ~4 см, 3 шықпа (S + −)" }, role: { en: "Senses how high the water reaches", ru: "Определяет, докуда поднялась вода", kk: "Судың қай деңгейге көтерілгенін анықтайды" } },
    { component: "buzzer-active", qty: 1, spec: { en: "5 V active buzzer, 2 pins", ru: "активный зуммер 5 В, 2 вывода", kk: "5 В белсенді зуммер, 2 шықпа" }, role: { en: "\"Full\" alarm", ru: "Сигнал «полный»", kk: "«Толды» дабылы" } },
    { component: "led", qty: 3, spec: { en: "5 mm: green, yellow, red", ru: "5 мм: зелёный, жёлтый, красный", kk: "5 мм: жасыл, сары, қызыл" }, role: { en: "Level indicator", ru: "Индикатор уровня", kk: "Деңгей индикаторы" } },
    { component: "resistor", qty: 3, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиодов", kk: "Жарық диодтарының тогын шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 14, spec: { en: "male-male + 3 long male-female for the sensor", ru: "папа-папа + 3 длинных папа-мама для датчика", kk: "аталық-аталық + датчикке 3 ұзын аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "wl", component: "water-level", label: "Water level" },
    { id: "bz", component: "buzzer-active", label: "Buzzer" },
    { id: "r_grn", component: "resistor", label: "220 Ω" },
    { id: "r_yel", component: "resistor", label: "220 Ω" },
    { id: "r_red", component: "resistor", label: "220 Ω" },
    { id: "led_grn", component: "led", label: "Green: filling" },
    { id: "led_yel", component: "led", label: "Yellow: almost" },
    { id: "led_red", component: "led", label: "Red: full" },
  ],
  connections: [
    { from: "board.5V", to: "wl.+", color: "red" },
    { from: "wl.-", to: "board.GND", color: "black" },
    { from: "wl.S", to: "board.A0", color: "orange", note: { en: "higher water = higher reading", ru: "выше вода = больше показание", kk: "су жоғары = көрсеткіш үлкен" } },
    { from: "board.D8", to: "bz.+", color: "purple" },
    { from: "bz.-", to: "board.GND2", color: "black" },
    { from: "board.D9", to: "r_grn.A", color: "green" },
    { from: "r_grn.B", to: "led_grn.A", color: "green", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led_grn.K", to: "board.GND3", color: "black" },
    { from: "board.D10", to: "r_yel.A", color: "yellow" },
    { from: "r_yel.B", to: "led_yel.A", color: "yellow" },
    { from: "led_yel.K", to: "board.GND3", color: "black" },
    { from: "board.D11", to: "r_red.A", color: "red" },
    { from: "r_red.B", to: "led_red.A", color: "red" },
    { from: "led_red.K", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Wire the water level sensor", ru: "Подключите датчик уровня воды", kk: "Су деңгейі датчигін қосыңыз" },
      body: {
        en: "Use three long male-female wires so the strip can hang in the tank while the Uno stays dry. Connect + to 5V, − to GND and S to A0. The strip has interleaved copper traces: the more of them are under water, the lower the resistance between them and the higher the voltage on S.",
        ru: "Возьмите три длинных провода папа-мама, чтобы полоска висела в баке, а Uno оставался сухим. Подключите + к 5V, − к GND, S к A0. На полоске чередуются медные дорожки: чем больше их под водой, тем меньше сопротивление между ними и тем выше напряжение на S.",
        kk: "Жолақ бактың ішінде ілініп тұрып, Uno құрғақ қалуы үшін үш ұзын аталық-аналық сымды алыңыз. +-ты 5V-ке, −-ті GND-ге, S-ті A0-ге қосыңыз. Жолақта мыс жолдар кезектесіп орналасқан: олардың суға батқан бөлігі неғұрлым көп болса, арасындағы кедергі соғұрлым аз, ал S-тегі кернеу соғұрлым жоғары болады.",
      },
      expect: { en: "The red power LED on the sensor board lights.", ru: "На плате датчика загорается красный светодиод питания.", kk: "Датчик платасындағы қызыл қуат шамы жанады." },
      mistake: { en: "Swapping + and − does not damage it immediately but the readings stay at zero.", ru: "Если перепутать + и −, датчик сразу не сгорит, но показания будут нулевыми.", kk: "+ пен −-ті ауыстырсаңыз, датчик бірден күймейді, бірақ көрсеткіштер нөл болып қалады." },
    },
    {
      title: { en: "Add the LEDs and the buzzer", ru: "Добавьте светодиоды и зуммер", kk: "Жарық диодтары мен зуммерді қосыңыз" },
      body: {
        en: "Wire D9 → 220 Ω → green LED, D10 → 220 Ω → yellow LED, D11 → 220 Ω → red LED, with every short leg on GND. Connect the active buzzer's + to D8 and − to GND.",
        ru: "Подключите D9 → 220 Ом → зелёный светодиод, D10 → 220 Ом → жёлтый, D11 → 220 Ом → красный, все короткие ножки на GND. Подключите + активного зуммера к D8, − к GND.",
        kk: "D9 → 220 Ом → жасыл жарық диоды, D10 → 220 Ом → сары, D11 → 220 Ом → қызыл етіп қосыңыз, барлық қысқа аяқтар GND-де. Белсенді зуммердің +-ын D8-ге, −-ін GND-ге қосыңыз.",
      },
      expect: { en: "Three LEDs in a row, like a small level gauge.", ru: "Три светодиода в ряд, как маленькая шкала уровня.", kk: "Қатар тұрған үш жарық диоды, кішкентай деңгей шкаласы сияқты." },
      mistake: { en: "Forgetting a resistor: that LED burns out or overloads its pin.", ru: "Без резистора светодиод сгорит или перегрузит пин.", kk: "Резистор болмаса, жарық диоды күйеді немесе пинді шамадан тыс жүктейді." },
    },
    {
      title: { en: "Upload and read the raw values", ru: "Загрузите скетч и посмотрите сырые значения", kk: "Скетчті жүктеп, бастапқы мәндерді қараңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. Dip the strip into a glass of the same water you will measure, in three positions: just touching the bottom traces, half way up, and up to the top of the traces. Write down the raw= value for each. Mineral content changes the numbers a lot: tap water, rain water and well water all read differently.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Опустите полоску в стакан с той же водой, которую будете измерять, в трёх положениях: вода едва касается нижних дорожек, на половине и до верха дорожек. Запишите значение raw= для каждого. Минерализация сильно влияет на числа: водопроводная, дождевая и колодезная вода дают разные показания.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Жолақты өлшейтін суыңыздай сумен толтырылған стақанға үш күйде батырыңыз: су төменгі жолдарға әзер тиеді, жартысына дейін және жолдардың жоғарғы шетіне дейін. Әрқайсысы үшін raw= мәнін жазып алыңыз. Судағы минералдар сандарға қатты әсер етеді: құбыр суы, жаңбыр суы және құдық суы әртүрлі көрсетеді.",
      },
      expect: { en: "Roughly 0 dry, 100–300 when touching, 400–650 near the top.", ru: "Примерно 0 на сухую, 100–300 при касании, 400–650 у верха.", kk: "Құрғақ кезде шамамен 0, тигенде 100–300, жоғарғы шетінде 400–650." },
      mistake: { en: "Dipping the strip past its printed line wets the components on the board.", ru: "Если погрузить полоску выше нанесённой линии, намокнут детали на плате.", kk: "Жолақты сызылған белгіден жоғары батырсаңыз, платадағы бөлшектер суланады." },
    },
    {
      title: { en: "Set your thresholds", ru: "Задайте пороги", kk: "Шектерді орнатыңыз" },
      body: {
        en: "In the sketch, set WET_LEVEL a little below your \"touching\" value and FULL_LEVEL a little below your \"top\" value, then upload again. Below WET_LEVEL the green LED means \"keep filling\", between the two the yellow LED means \"almost full\", above FULL_LEVEL the red LED and the buzzer say \"stop\". A 20-count hysteresis keeps the lights from flickering at a boundary when the surface ripples.",
        ru: "В скетче поставьте WET_LEVEL чуть ниже значения «касается», а FULL_LEVEL чуть ниже значения «верх», и загрузите снова. Ниже WET_LEVEL зелёный означает «можно лить», между порогами жёлтый означает «почти полон», выше FULL_LEVEL красный и зуммер говорят «стоп». Гистерезис в 20 единиц не даёт светодиодам мигать на границе, когда по воде идёт рябь.",
        kk: "Скетчте WET_LEVEL мәнін «тиеді» мәнінен сәл төмен, ал FULL_LEVEL мәнін «жоғарғы шет» мәнінен сәл төмен қойып, қайта жүктеңіз. WET_LEVEL-ден төмен болса, жасыл шам «құя беріңіз» дегенді білдіреді, екі шектің арасында сары шам «толуға жақын», ал FULL_LEVEL-ден жоғары болса, қызыл шам мен зуммер «тоқтаңыз» дейді. 20 бірлік гистерезис су бетінде толқын болғанда шамдардың шекарада жыпылықтауына жол бермейді.",
      },
      expect: { en: "Green → yellow → red as you lower the strip into the glass, beeping on red.", ru: "Зелёный → жёлтый → красный по мере погружения полоски в стакан, писк на красном.", kk: "Жолақты стақанға батырған сайын жасыл → сары → қызыл, қызылда дыбыс шығады." },
      mistake: { en: "Setting FULL_LEVEL above the highest value you measured: the alarm then never fires.", ru: "Если FULL_LEVEL выше максимального измеренного значения, тревога не сработает никогда.", kk: "FULL_LEVEL өлшенген ең жоғары мәннен жоғары болса, дабыл ешқашан іске қосылмайды." },
    },
    {
      title: { en: "Mount it in the tank", ru: "Установите в бак", kk: "Бакқа орнатыңыз" },
      body: {
        en: "Fix the strip vertically to the inside wall so its top trace sits at the level you call \"full\", with the board and its connector above the rim. Keep the Uno, buzzer and USB supply outside and away from splashes. Clean the strip now and then: a film of limescale or algae shifts the readings.",
        ru: "Закрепите полоску вертикально на внутренней стенке так, чтобы верхняя дорожка была на уровне, который вы считаете «полным», а плата с разъёмом выше края. Uno, зуммер и USB-питание держите снаружи, подальше от брызг. Время от времени чистите полоску: налёт извести или водорослей сдвигает показания.",
        kk: "Жолақты ішкі қабырғаға тігінен бекітіңіз, сонда оның жоғарғы жолы сіз «толы» деп санайтын деңгейде, ал платасы мен ұяшығы жиектен жоғары болады. Uno-ны, зуммерді және USB қуат көзін сыртта, шашыраудан алыс ұстаңыз. Жолақты анда-санда тазалап тұрыңыз: әк немесе балдыр қабаты көрсеткіштерді ығыстырады.",
      },
      expect: { en: "The red LED and buzzer come on just before the water reaches your \"full\" mark.", ru: "Красный и зуммер включаются прямо перед тем, как вода дойдёт до отметки «полный».", kk: "Су «толы» белгісіне жетер алдында қызыл шам мен зуммер қосылады." },
      mistake: { en: "Mounting it at the bottom of a deep tank: the strip only senses about 4 cm of height.", ru: "Ставить её на дно глубокого бака: полоска чувствует всего около 4 см высоты.", kk: "Оны терең бактың түбіне қою: жолақ тек шамамен 4 см биіктікті сезеді." },
    },
  ],
  code: [{
    filename: "tank_alarm.ino",
    language: "cpp",
    libraries: [],
    source: `const int LEVEL_PIN = A0;
const int BUZZER_PIN = 8;
const int GREEN_LED = 9, YELLOW_LED = 10, RED_LED = 11;

const int WET_LEVEL = 100;    // water touches the strip (set from your own readings)
const int FULL_LEVEL = 450;   // water near the top of the strip: alarm
const int HYST = 20;          // hysteresis so the LEDs do not flicker on ripples

enum Level { BELOW, ALMOST, FULL };
Level level = BELOW;
unsigned long lastRead = 0;

int readRaw() {
  long sum = 0;
  for (int i = 0; i < 10; i++) {
    sum += analogRead(LEVEL_PIN);
    delay(2);
  }
  return sum / 10;
}

Level classify(int raw) {
  if (raw >= FULL_LEVEL) return FULL;
  if (level == FULL && raw > FULL_LEVEL - HYST) return FULL;       // stay full until clearly lower
  if (raw >= WET_LEVEL) return ALMOST;
  if (level != BELOW && raw > WET_LEVEL - HYST) return ALMOST;
  return BELOW;
}

void setup() {
  Serial.begin(9600);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(YELLOW_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  Serial.println(F("Tank alarm ready"));
}

void loop() {
  unsigned long now = millis();

  // red LED and buzzer pulse once per second while full
  bool pulse = (now / 500) % 2;
  digitalWrite(GREEN_LED, level == BELOW);
  digitalWrite(YELLOW_LED, level == ALMOST);
  digitalWrite(RED_LED, level == FULL && pulse);
  digitalWrite(BUZZER_PIN, level == FULL && pulse);

  if (now - lastRead < 500) return;   // two readings per second
  lastRead = now;

  int raw = readRaw();
  Level next = classify(raw);
  if (next != level) {
    level = next;
    Serial.println(level == FULL ? F("FULL - stop filling") : level == ALMOST ? F("Almost full") : F("Below sensor"));
  }
  Serial.print(F("raw="));
  Serial.println(raw);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "raw= stays at 0 even in water", ru: "raw= остаётся 0 даже в воде", kk: "Суда да raw= 0 күйінде қалады" },
      cause: { en: "S is not on A0, + and − are swapped, or the water is very pure (distilled or rain water conducts poorly).", ru: "S не на A0, перепутаны + и −, или вода очень чистая (дистиллированная или дождевая плохо проводит ток).", kk: "S A0-де емес, + пен − ауысқан немесе су өте таза (дистильденген не жаңбыр суы токты нашар өткізеді)." },
      fix: { en: "Check the three wires. Test in tap water; for very soft water lower WET_LEVEL and FULL_LEVEL to match what you measure.", ru: "Проверьте три провода. Проверьте в водопроводной воде; для очень мягкой воды уменьшите WET_LEVEL и FULL_LEVEL под ваши измерения.", kk: "Үш сымды тексеріңіз. Құбыр суында тексеріп көріңіз; өте жұмсақ су үшін WET_LEVEL пен FULL_LEVEL мәндерін өлшемдеріңізге қарай азайтыңыз." },
    },
    {
      symptom: { en: "Readings slowly drift and the traces turn dark after a few weeks", ru: "Показания постепенно уплывают, а дорожки через несколько недель темнеют", kk: "Көрсеткіштер біртіндеп жылжиды, ал жолдар бірнеше аптадан кейін қараяды" },
      cause: { en: "Electrolysis: the strip is powered all the time, and DC current through water corrodes the copper.", ru: "Электролиз: полоска всё время под напряжением, и постоянный ток через воду разъедает медь.", kk: "Электролиз: жолақ үнемі кернеуде тұрады, ал су арқылы өтетін тұрақты ток мысты жеп қояды." },
      fix: { en: "Clean the strip and re-check your thresholds. Keep it only as deep as needed. For a permanent installation, a float switch or a capacitive sensor lasts much longer.", ru: "Почистите полоску и перепроверьте пороги. Погружайте её не глубже, чем нужно. Для постоянной установки поплавковый выключатель или ёмкостный датчик прослужат гораздо дольше.", kk: "Жолақты тазалап, шектерді қайта тексеріңіз. Оны қажет болғаннан тереңірек батырмаңыз. Тұрақты орнату үшін қалқымалы ажыратқыш немесе сыйымдылық датчигі әлдеқайда ұзақ қызмет етеді." },
    },
    {
      symptom: { en: "The LEDs jump between yellow and red while filling", ru: "При наполнении светодиоды прыгают между жёлтым и красным", kk: "Толтыру кезінде шамдар сары мен қызыл арасында ауысып тұрады" },
      cause: { en: "Waves from the inflowing water splash the top traces.", ru: "Волны от льющейся воды забрызгивают верхние дорожки.", kk: "Құйылып жатқан судың толқындары жоғарғы жолдарға шашырайды." },
      fix: { en: "Mount the strip away from the inflow, or raise HYST to 40–60.", ru: "Установите полоску подальше от струи или увеличьте HYST до 40–60.", kk: "Жолақты су ағынынан алысырақ орнатыңыз немесе HYST мәнін 40–60-қа көбейтіңіз." },
    },
  ],
  safety: [
    { en: "Only the sensing strip goes into the water. Keep the Uno, breadboard, USB supply and cables above and away from the tank.", ru: "В воду опускается только чувствительная полоска. Uno, макетка, USB-питание и кабели должны быть выше бака и в стороне от него.", kk: "Суға тек сезгіш жолақ қана батырылады. Uno, макет тақтасы, USB қуат көзі және кабельдер бактан жоғары әрі алыс тұруы керек." },
    { en: "Do not use the sensor in drinking water: the corroding copper traces release metal into it.", ru: "Не используйте датчик в питьевой воде: корродирующие медные дорожки выделяют в неё металл.", kk: "Датчикті ауыз суда қолданбаңыз: тот басқан мыс жолдар суға металл бөледі." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "Tank alarm ready",
      "raw=0",
      "raw=0",
      "Almost full",
      "raw=187",
      "raw=296",
      "raw=388",
      "FULL - stop filling",
      "raw=473",
      "raw=481",
    ],
    leds: [{ label: "GREEN", color: "#43A047" }, { label: "YELLOW", color: "#FDD835" }, { label: "RED", color: "#E53935" }],
  },
} satisfies GuideContent;
