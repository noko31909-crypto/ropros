import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "light-theremin",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "audio",
  robotics: false,
  difficulty: "beginner",
  hours: 1,
  costUsd: 7,
  xpReward: 110,
  title: {
    en: "Light Theremin",
    ru: "Световой терменвокс",
    kk: "Жарық терменвоксы",
  },
  summary: {
    en: "Wave your hand over a photoresistor to bend the pitch of a buzzer. For the first 5 seconds the sketch learns your room's darkest and brightest light, so it plays the full range anywhere.",
    ru: "Водите рукой над фоторезистором, чтобы менять высоту звука зуммера. Первые 5 секунд скетч запоминает самый тёмный и самый яркий свет в комнате, поэтому играет во всём диапазоне при любом освещении.",
    kk: "Зуммер дыбысының биіктігін өзгерту үшін фоторезистордың үстінде қолыңызды қозғаңыз. Алғашқы 5 секундта скетч бөлмедегі ең күңгірт және ең жарық деңгейді есте сақтайды, сондықтан кез келген жарықта толық диапазонда ойнайды.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "ldr", qty: 1, spec: { en: "GL5528, ~10 kΩ at room light", ru: "GL5528, около 10 кОм при комнатном свете", kk: "GL5528, бөлме жарығында шамамен 10 кОм" }, role: { en: "Light sensor (top of the divider)", ru: "Датчик света (верх делителя)", kk: "Жарық датчигі (бөлгіштің жоғарғы бөлігі)" } },
    { component: "resistor", qty: 2, spec: { en: "10 kΩ and 100 Ω, ¼ W", ru: "10 кОм и 100 Ом, ¼ Вт", kk: "10 кОм және 100 Ом, ¼ Вт" }, role: { en: "Divider bottom (10 kΩ), buzzer current limit (100 Ω)", ru: "Низ делителя (10 кОм), ограничение тока зуммера (100 Ом)", kk: "Бөлгіштің төменгі бөлігі (10 кОм), зуммер тогын шектеу (100 Ом)" } },
    { component: "buzzer-passive", qty: 1, spec: { en: "passive, 12 mm", ru: "пассивный, 12 мм", kk: "пассивті, 12 мм" }, role: { en: "Sound", ru: "Звук", kk: "Дыбыс" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ldr", component: "ldr", label: "LDR" },
    { id: "r_div", component: "resistor", label: "10 kΩ" },
    { id: "r_bz", component: "resistor", label: "100 Ω" },
    { id: "bz", component: "buzzer-passive", label: "Passive buzzer" },
  ],
  connections: [
    { from: "board.5V", to: "ldr.A", color: "red" },
    { from: "ldr.B", to: "board.A0", color: "green", note: { en: "divider midpoint: more light = higher reading", ru: "середина делителя: больше света = больше значение", kk: "бөлгіштің ортасы: жарық көп болса, мән үлкен" } },
    { from: "board.A0", to: "r_div.A", color: "green" },
    { from: "r_div.B", to: "board.GND", color: "black" },
    { from: "board.D8", to: "r_bz.A", color: "yellow" },
    { from: "r_bz.B", to: "bz.+", color: "yellow" },
    { from: "bz.-", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Build the light divider", ru: "Соберите делитель со светом", kk: "Жарық бөлгішін жинаңыз" },
      body: {
        en: "Put the LDR and the 10 kΩ resistor in series on the breadboard. The free end of the LDR goes to 5V, the free end of the resistor goes to GND, and the point where they meet goes to A0. In bright light the LDR drops to a few kΩ and A0 rises towards 5 V; in shadow it climbs to tens of kΩ and A0 falls.",
        ru: "Включите фоторезистор и резистор 10 кОм последовательно на макетке. Свободный конец фоторезистора подключите к 5V, свободный конец резистора к GND, а точку их соединения к A0. На ярком свету фоторезистор падает до нескольких кОм и напряжение на A0 растёт к 5 В; в тени он вырастает до десятков кОм и A0 падает.",
        kk: "Фоторезистор мен 10 кОм резисторды макет тақтасында тізбектей қосыңыз. Фоторезистордың бос ұшын 5V-ке, резистордың бос ұшын GND-ге, ал олардың түйіскен нүктесін A0-ге жалғаңыз. Жарықта фоторезистор бірнеше кОм-ға дейін азаяды да, A0 кернеуі 5 В-қа қарай өседі; көлеңкеде ол ондаған кОм-ға дейін өседі де, A0 төмендейді.",
      },
      expect: { en: "Three wires: 5V to the LDR, the junction to A0, the resistor to GND.", ru: "Три провода: 5V к фоторезистору, точка соединения к A0, резистор к GND.", kk: "Үш сым: 5V фоторезисторға, түйісу нүктесі A0-ге, резистор GND-ге." },
      mistake: { en: "Connecting the LDR straight between 5V and A0 without the 10 kΩ to GND leaves A0 floating near 5 V all the time.", ru: "Если подключить фоторезистор между 5V и A0 без резистора 10 кОм к GND, A0 почти всё время будет около 5 В.", kk: "Фоторезисторды GND-ге 10 кОм резисторсыз 5V пен A0 арасына қоссаңыз, A0 үнемі 5 В шамасында болады." },
    },
    {
      title: { en: "Add the buzzer", ru: "Добавьте зуммер", kk: "Зуммерді қосыңыз" },
      body: {
        en: "Wire D8 → 100 Ω → buzzer +, and buzzer − to GND. Keep the buzzer a few centimetres away from the LDR so your hand can cover the sensor without touching the wires.",
        ru: "Подключите D8 → 100 Ом → + зуммера, а − зуммера к GND. Поставьте зуммер в нескольких сантиметрах от фоторезистора, чтобы рука закрывала датчик, не задевая провода.",
        kk: "D8 → 100 Ом → зуммер + тізбегін жалғап, зуммердің − шықпасын GND-ге қосыңыз. Қолыңыз сымдарға тимей датчикті жаба алатындай, зуммерді фоторезистордан бірнеше сантиметр алыс қойыңыз.",
      },
      expect: { en: "The LDR sits on its own with clear space above it.", ru: "Над фоторезистором есть свободное место для руки.", kk: "Фоторезистордың үстінде қолға арналған бос орын бар." },
      mistake: { en: "An active buzzer cannot change pitch; it must be a passive one.", ru: "Активный зуммер не умеет менять тон; нужен пассивный.", kk: "Белсенді зуммер дыбыс биіктігін өзгерте алмайды; пассивті керек." },
    },
    {
      title: { en: "Calibrate in the first 5 seconds", ru: "Калибровка в первые 5 секунд", kk: "Алғашқы 5 секундтағы калибрлеу" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. While the built-in L LED is on (5 s), cover the LDR completely with your hand and then lift it away, a few times. The sketch records the lowest and highest A0 values and uses them as the ends of the pitch range.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Пока горит встроенный светодиод L (5 с), несколько раз полностью закройте фоторезистор рукой и уберите её. Скетч запомнит самое низкое и самое высокое значение A0 и сделает их краями диапазона тонов.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Ішкі L жарық диоды жанып тұрғанда (5 с), фоторезисторды қолыңызбен бірнеше рет толық жауып, қайта ашыңыз. Скетч A0-дің ең төменгі және ең жоғары мәнін есте сақтап, оларды дыбыс диапазонының шеттері етеді.",
      },
      expect: { en: "\"Range: 180..760\" (your numbers will differ) appears when the LED goes off.", ru: "Когда светодиод гаснет, появляется «Range: 180..760» (у вас числа будут другими).", kk: "Жарық диоды сөнгенде «Range: 180..760» шығады (сіздің сандарыңыз басқаша болады)." },
      mistake: { en: "Keeping your hand still during calibration gives a tiny range and the pitch barely moves.", ru: "Если держать руку неподвижно во время калибровки, диапазон будет крошечным и тон почти не изменится.", kk: "Калибрлеу кезінде қолды қозғалтпасаңыз, диапазон өте тар болып, дыбыс биіктігі әрең өзгереді." },
    },
    {
      title: { en: "Play it", ru: "Играйте", kk: "Ойнаңыз" },
      body: {
        en: "Move your hand slowly up and down above the sensor: the closer it gets, the lower the note (120 Hz at the darkest, 1500 Hz in full light). Cover the LDR completely to mute. Press the Uno's reset button to recalibrate when the room light changes.",
        ru: "Медленно двигайте руку вверх и вниз над датчиком: чем ближе рука, тем ниже нота (120 Гц в самой темноте, 1500 Гц при полном свете). Полностью закройте фоторезистор, чтобы заглушить звук. Нажмите кнопку сброса на Uno, чтобы откалибровать заново при смене освещения.",
        kk: "Қолыңызды датчиктің үстінде баяу жоғары-төмен қозғаңыз: қол неғұрлым жақын болса, нота соғұрлым төмен (ең қараңғыда 120 Гц, толық жарықта 1500 Гц). Дыбысты өшіру үшін фоторезисторды толық жабыңыз. Бөлме жарығы өзгергенде қайта калибрлеу үшін Uno-ның қайта іске қосу батырмасын басыңыз.",
      },
      expect: { en: "A smooth, continuous sweep of pitch that follows your hand.", ru: "Плавное непрерывное изменение тона вслед за рукой.", kk: "Қолыңызға ілесетін біркелкі, үздіксіз дыбыс өзгерісі." },
      mistake: { en: "Flickering LED lamps add a warble; daylight or an incandescent lamp gives a cleaner tone.", ru: "Мерцающие светодиодные лампы добавляют дрожание; при дневном свете или лампе накаливания тон чище.", kk: "Жыпылықтайтын жарық диодты шамдар дірілдеу қосады; күндізгі жарықта немесе қыздыру шамында дыбыс тазарақ." },
    },
  ],
  code: [{
    filename: "light_theremin.ino",
    language: "cpp",
    libraries: [],
    source: `const int LDR_PIN = A0;          // LDR (to 5V) + 10 kOhm (to GND) divider
const int BUZZER_PIN = 8;        // passive buzzer through 100 Ohm
const unsigned int LOW_HZ = 120, HIGH_HZ = 1500;
const unsigned long CAL_MS = 5000;

int lightMin = 1023, lightMax = 0;
int smoothed = 0;
unsigned long lastPrint = 0;

void setup() {
  Serial.begin(9600);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);

  Serial.println("Calibrating for 5 s: cover and uncover the LDR");
  digitalWrite(LED_BUILTIN, HIGH);
  unsigned long start = millis();
  while (millis() - start < CAL_MS) {
    int v = analogRead(LDR_PIN);
    if (v < lightMin) lightMin = v;
    if (v > lightMax) lightMax = v;
  }
  digitalWrite(LED_BUILTIN, LOW);
  if (lightMax - lightMin < 50) lightMax = lightMin + 50;   // keep a usable range

  Serial.print("Range: ");
  Serial.print(lightMin);
  Serial.print("..");
  Serial.println(lightMax);
  smoothed = analogRead(LDR_PIN);
}

void loop() {
  smoothed = (smoothed * 3 + analogRead(LDR_PIN)) / 4;   // simple low-pass filter
  int muteBelow = lightMin + (lightMax - lightMin) / 20;   // bottom 5% = hand fully covering

  unsigned int hz = 0;
  if (smoothed <= muteBelow) {
    noTone(BUZZER_PIN);
  } else {
    int v = constrain(smoothed, lightMin, lightMax);
    hz = map(v, lightMin, lightMax, LOW_HZ, HIGH_HZ);
    tone(BUZZER_PIN, hz);
  }

  if (millis() - lastPrint >= 250) {
    lastPrint = millis();
    Serial.print("light ");
    Serial.print(smoothed);
    Serial.print(" -> ");
    if (hz) { Serial.print(hz); Serial.println(" Hz"); }
    else Serial.println("mute");
  }
  delay(10);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The pitch hardly changes", ru: "Тон почти не меняется", kk: "Дыбыс биіктігі әрең өзгереді" },
      cause: { en: "Calibration saw too little change, or the room is very dim.", ru: "При калибровке свет почти не менялся, или в комнате очень темно.", kk: "Калибрлеу кезінде жарық аз өзгерді немесе бөлме өте күңгірт." },
      fix: { en: "Press reset and cover/uncover the LDR fully during the 5 s, or shine a desk lamp on it.", ru: "Нажмите сброс и в течение 5 с полностью закрывайте и открывайте фоторезистор, или посветите на него настольной лампой.", kk: "Қайта іске қосуды басып, 5 с ішінде фоторезисторды толық жауып-ашыңыз немесе оған үстел шамын түсіріңіз." },
    },
    {
      symptom: { en: "Silent, but the Serial Monitor shows values", ru: "Звука нет, но Serial Monitor показывает значения", kk: "Дыбыс жоқ, бірақ Serial Monitor мәндерді көрсетеді" },
      cause: { en: "The buzzer is on the wrong pin, or it prints \"mute\" because the LDR is covered.", ru: "Зуммер не на том пине, или выводится «mute», потому что фоторезистор закрыт.", kk: "Зуммер басқа пинде немесе фоторезистор жабық болғандықтан «mute» шығады." },
      fix: { en: "Check D8 → 100 Ω → buzzer + and buzzer − → GND; uncover the sensor.", ru: "Проверьте цепь D8 → 100 Ом → + зуммера и − зуммера → GND; откройте датчик.", kk: "D8 → 100 Ом → зуммер + және зуммер − → GND тізбегін тексеріп, датчикті ашыңыз." },
    },
    {
      symptom: { en: "A0 reads 1023 or 0 all the time", ru: "A0 всё время читает 1023 или 0", kk: "A0 үнемі 1023 немесе 0 оқиды" },
      cause: { en: "The 10 kΩ resistor or the LDR is missing from the divider, or A0 is in the wrong row.", ru: "В делителе нет резистора 10 кОм или фоторезистора, или A0 стоит не в том ряду.", kk: "Бөлгіште 10 кОм резистор немесе фоторезистор жоқ, не A0 басқа қатарда тұр." },
      fix: { en: "Make sure the LDR, the resistor and the A0 wire share one breadboard row at the midpoint.", ru: "Убедитесь, что фоторезистор, резистор и провод A0 сходятся в одном ряду макетки.", kk: "Фоторезистор, резистор және A0 сымы макет тақтасының бір қатарында тоғысатынын тексеріңіз." },
    },
  ],
  safety: [],
  simulation: {
    baud: 9600,
    lines: ["Calibrating for 5 s: cover and uncover the LDR", "Range: 182..761", "light 744 -> 1459 Hz", "light 610 -> 1140 Hz", "light 455 -> 770 Hz", "light 301 -> 403 Hz", "light 190 -> mute", "light 512 -> 906 Hz"],
    leds: [{ label: "L (cal)", color: "#FDD835" }],
  },
} satisfies GuideContent;
