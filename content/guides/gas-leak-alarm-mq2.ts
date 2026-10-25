import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "gas-leak-alarm-mq2",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "security",
  robotics: false,
  difficulty: "intermediate",
  hours: 2,
  costUsd: 12,
  xpReward: 210,
  title: {
    en: "Gas Leak Alarm with MQ-2",
    ru: "Сигнализация утечки газа на MQ-2",
    kk: "MQ-2 негізіндегі газ ағу дабылы",
  },
  summary: {
    en: "An MQ-2 sensor warms up, measures the clean-air baseline by itself and sounds a buzzer with a red light when flammable gas or smoke pushes the reading above a calibrated threshold.",
    ru: "Датчик MQ-2 прогревается, сам измеряет фон чистого воздуха и включает зуммер с красным светом, когда горючий газ или дым поднимают показания выше откалиброванного порога.",
    kk: "MQ-2 датчигі қызып алып, таза ауаның фондық мәнін өзі өлшейді, ал жанғыш газ немесе түтін көрсеткішті калибрленген шектен асырғанда, зуммер мен қызыл шамды қосады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "mq2-gas", qty: 1, spec: { en: "MQ-2 module with AO and DO pins, 5 V heater (~150 mA)", ru: "модуль MQ-2 с выходами AO и DO, нагреватель 5 В (~150 мА)", kk: "AO және DO шықпалары бар MQ-2 модулі, 5 В қыздырғыш (~150 мА)" }, role: { en: "Flammable gas and smoke sensor", ru: "Датчик горючих газов и дыма", kk: "Жанғыш газ бен түтін датчигі" } },
    { component: "buzzer-active", qty: 1, spec: { en: "5 V active buzzer, 2 pins", ru: "активный зуммер 5 В, 2 вывода", kk: "5 В белсенді зуммер, 2 шықпа" }, role: { en: "Audible alarm", ru: "Звуковая тревога", kk: "Дыбыстық дабыл" } },
    { component: "led", qty: 2, spec: { en: "5 mm: red, green", ru: "5 мм: красный, зелёный", kk: "5 мм: қызыл, жасыл" }, role: { en: "Alarm / OK status", ru: "Тревога / всё в порядке", kk: "Дабыл / бәрі қалыпты" } },
    { component: "resistor", qty: 2, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиодов", kk: "Жарық диодтарының тогын шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 12, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "gas", component: "mq2-gas", label: "MQ-2" },
    { id: "bz", component: "buzzer-active", label: "Buzzer" },
    { id: "r_red", component: "resistor", label: "220 Ω" },
    { id: "r_grn", component: "resistor", label: "220 Ω" },
    { id: "led_red", component: "led", label: "Red: alarm" },
    { id: "led_grn", component: "led", label: "Green: OK" },
  ],
  connections: [
    { from: "board.5V", to: "gas.VCC", color: "red", note: { en: "the heater needs a steady 5 V", ru: "нагревателю нужно стабильное 5 В", kk: "қыздырғышқа тұрақты 5 В керек" } },
    { from: "gas.GND", to: "board.GND", color: "black" },
    { from: "gas.AO", to: "board.A0", color: "orange", note: { en: "analog level, rises with gas", ru: "аналоговый уровень, растёт с газом", kk: "аналогтық деңгей, газбен бірге өседі" } },
    { from: "board.D8", to: "bz.+", color: "purple" },
    { from: "bz.-", to: "board.GND2", color: "black" },
    { from: "board.D9", to: "r_red.A", color: "red" },
    { from: "r_red.B", to: "led_red.A", color: "red", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led_red.K", to: "board.GND3", color: "black" },
    { from: "board.D10", to: "r_grn.A", color: "green" },
    { from: "r_grn.B", to: "led_grn.A", color: "green" },
    { from: "led_grn.K", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Wire the MQ-2 sensor", ru: "Подключите датчик MQ-2", kk: "MQ-2 датчигін қосыңыз" },
      body: {
        en: "Connect MQ-2 VCC to 5V, GND to GND and AO to A0. The analog output rises as the gas concentration grows, which lets the sketch set its own threshold. DO stays unconnected: it is a fixed comparator set by the blue trimmer, and we do the comparison in software instead. The heater draws about 150 mA, so power the Uno from a good USB port or a 1 A phone charger.",
        ru: "Подключите VCC датчика MQ-2 к 5V, GND к GND, AO к A0. Аналоговый выход растёт с концентрацией газа, и скетч может сам выбрать порог. DO оставьте свободным: это компаратор с порогом от синего подстроечника, а мы сравниваем программно. Нагреватель берёт около 150 мА, поэтому питайте Uno от хорошего USB-порта или зарядника на 1 А.",
        kk: "MQ-2 датчигінің VCC-ін 5V-ке, GND-ін GND-ге, AO-сын A0-ге қосыңыз. Аналогтық шығыс газ концентрациясымен бірге өседі, сондықтан скетч шекті өзі таңдай алады. DO-ны бос қалдырыңыз: бұл көк реттегішпен бапталатын компаратор, ал біз салыстыруды бағдарламада жасаймыз. Қыздырғыш шамамен 150 мА тұтынады, сондықтан Uno-ны жақсы USB портынан немесе 1 А зарядтағыштан қоректендіріңіз.",
      },
      expect: { en: "The small power LED on the MQ-2 board lights and the metal mesh slowly gets warm.", ru: "Загорается светодиод питания на плате MQ-2, а металлическая сетка постепенно теплеет.", kk: "MQ-2 платасындағы қуат шамы жанып, металл тор біртіндеп жылиды." },
      mistake: { en: "Powering the sensor from 3V3: the heater never reaches temperature and readings are meaningless.", ru: "Питание датчика от 3V3: нагреватель не выходит на температуру, показания бессмысленны.", kk: "Датчикті 3V3-тен қоректендіру: қыздырғыш қажетті температураға жетпейді, көрсеткіштердің мәні жоқ." },
    },
    {
      title: { en: "Add the buzzer and the status LEDs", ru: "Добавьте зуммер и светодиоды", kk: "Зуммер мен жарық диодтарын қосыңыз" },
      body: {
        en: "The active buzzer has its own oscillator, so a HIGH on D8 is enough to make it beep: wire + (longer leg or marked side) to D8 and − to GND. Wire D9 through a 220 Ω resistor to the red LED and D10 through another 220 Ω resistor to the green LED, cathodes to GND.",
        ru: "У активного зуммера свой генератор, поэтому для писка достаточно HIGH на D8: + (длинная ножка или отмеченная сторона) к D8, − к GND. Подключите D9 через резистор 220 Ом к красному светодиоду, а D10 через второй резистор 220 Ом к зелёному, катоды к GND.",
        kk: "Белсенді зуммердің өз генераторы бар, сондықтан оның дыбыстауына D8-дегі HIGH жеткілікті: + (ұзын аяғы немесе белгіленген жағы) D8-ге, − GND-ге. D9-ды 220 Ом резистор арқылы қызыл жарық диодына, ал D10-ды екінші 220 Ом резистор арқылы жасыл жарық диодына қосыңыз, катодтары GND-ге.",
      },
      expect: { en: "At power-on the buzzer chirps once and both LEDs flash as a self-test.", ru: "При включении зуммер коротко пищит, оба светодиода мигают: это самотест.", kk: "Қосқанда зуммер бір рет қысқа дыбыс шығарып, екі жарық диоды да жыпылықтайды: бұл өзін-өзі тексеру." },
      mistake: { en: "A passive buzzer looks the same but only clicks on DC; check that yours beeps when touched to 5V.", ru: "Пассивный зуммер выглядит так же, но на постоянном токе только щёлкает; проверьте, что ваш пищит от 5V.", kk: "Пассивті зуммер сырттай ұқсас, бірақ тұрақты токта тек шертеді; сіздікі 5V-ке тигізгенде дыбыс шығаратынын тексеріңіз." },
    },
    {
      title: { en: "Upload and let the sensor warm up", ru: "Загрузите скетч и прогрейте датчик", kk: "Скетчті жүктеп, датчикті қыздырыңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. For the first 2 minutes the green LED blinks while the heater stabilises; the readings drift downwards during this time. A brand-new sensor needs a much longer burn-in: leave it powered for 24 hours before you trust the baseline the first time.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Первые 2 минуты зелёный светодиод мигает, пока нагреватель выходит на режим; показания в это время плывут вниз. Новому датчику нужна гораздо более долгая приработка: перед первым использованием оставьте его включённым на 24 часа.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Алғашқы 2 минутта қыздырғыш тұрақтанғанша жасыл жарық диоды жыпылықтайды; бұл уақытта көрсеткіштер төмен қарай жылжиды. Жаңа датчикке әлдеқайда ұзақ қыздыру керек: алғаш қолданар алдында оны 24 сағат қосулы қалдырыңыз.",
      },
      expect: { en: "\"Warming up, … s left\" every 10 s, then \"Calibrating clean-air baseline...\".", ru: "Каждые 10 с «Warming up, … s left», затем «Calibrating clean-air baseline...».", kk: "Әр 10 с сайын «Warming up, … s left», содан кейін «Calibrating clean-air baseline...»." },
      mistake: { en: "Opening the Serial Monitor resets the Uno and restarts the warm-up; that is normal.", ru: "Открытие Serial Monitor перезагружает Uno и заново запускает прогрев, это нормально.", kk: "Serial Monitor-ды ашу Uno-ны қайта жүктеп, қыздыруды басынан бастайды, бұл қалыпты." },
    },
    {
      title: { en: "Let it learn the clean-air baseline", ru: "Дайте ему запомнить фон чистого воздуха", kk: "Таза ауа фонын есте сақтауына мүмкіндік беріңіз" },
      body: {
        en: "After warm-up the sketch averages 40 readings over 10 seconds in clean air and stores that as the baseline. Do this in a ventilated room, away from the stove. The alarm fires when the reading stays 150 counts above the baseline for three readings in a row and clears only when it drops below +100, so it does not chatter around the threshold.",
        ru: "После прогрева скетч усредняет 40 измерений за 10 секунд в чистом воздухе и запоминает это как фон. Делайте это в проветренной комнате, вдали от плиты. Тревога срабатывает, когда показание три раза подряд выше фона на 150 единиц, а сбрасывается, только когда опускается ниже +100, поэтому сигнал не дребезжит у порога.",
        kk: "Қыздырудан кейін скетч таза ауадағы 10 секундтық 40 өлшемнің орташасын алып, оны фон ретінде сақтайды. Мұны желдетілген бөлмеде, пештен алыс жасаңыз. Көрсеткіш қатарынан үш рет фоннан 150 бірлікке жоғары болғанда дабыл іске қосылады, ал +100-ден төмен түскенде ғана өшеді, сондықтан сигнал шек маңында дірілдемейді.",
      },
      expect: { en: "\"Baseline = …\" (typically 60–250) and a steady green LED.", ru: "«Baseline = …» (обычно 60–250) и ровно горящий зелёный.", kk: "«Baseline = …» (әдетте 60–250) және тұрақты жанатын жасыл шам." },
      mistake: { en: "Calibrating next to a gas stove or in a smoky room makes the baseline too high and the alarm deaf.", ru: "Калибровка у газовой плиты или в задымлённой комнате завышает фон, и тревога «глохнет».", kk: "Газ пешінің жанында не түтінді бөлмеде калибрлесеңіз, фон тым жоғары болып, дабыл «саңырау» болады." },
    },
    {
      title: { en: "Test and tune the threshold", ru: "Проверьте и настройте порог", kk: "Шекті тексеріп, баптаңыз" },
      body: {
        en: "Hold an unlit lighter 10 cm from the mesh and release a one-second puff of gas without striking it. Watch the gas= values in the Serial Monitor climb by several hundred: the red LED lights and the buzzer beeps. If it triggers on cooking smells, raise ALARM_RISE; if a small puff does nothing, lower it, keeping CLEAR_RISE about 50 below.",
        ru: "Поднесите незажжённую зажигалку на 10 см к сетке и выпустите газ на одну секунду, не высекая искру. В Serial Monitor значения gas= вырастут на несколько сотен: загорится красный светодиод, запищит зуммер. Если срабатывает от запахов готовки, увеличьте ALARM_RISE; если малая порция газа не действует, уменьшите его, держа CLEAR_RISE примерно на 50 ниже.",
        kk: "Жақпаған оттықты торға 10 см жақындатып, ұшқын шығармай бір секунд газ жіберіңіз. Serial Monitor-да gas= мәндері бірнеше жүзге өседі: қызыл жарық диоды жанып, зуммер дыбыс береді. Тамақ иісінен іске қосылса, ALARM_RISE мәнін көбейтіңіз; аз газ әсер етпесе, оны азайтыңыз, CLEAR_RISE-ты одан шамамен 50 төмен ұстаңыз.",
      },
      expect: { en: "\"ALARM\" within a couple of seconds and \"Clear\" again about a minute after the gas disperses.", ru: "«ALARM» через пару секунд и снова «Clear» примерно через минуту, когда газ рассеется.", kk: "Бір-екі секундта «ALARM», ал газ таралғаннан кейін шамамен бір минутта қайтадан «Clear»." },
      mistake: { en: "Striking the lighter: a flame near a gas test is exactly what you must avoid, and the heat skews the reading.", ru: "Зажечь зажигалку: пламя рядом с газом это ровно то, чего нужно избегать, а тепло ещё и искажает показания.", kk: "Оттықты жағу: газдың жанындағы жалын дәл болдырмау керек нәрсе, оның үстіне жылу көрсеткішті бұрмалайды." },
    },
  ],
  code: [{
    filename: "gas_alarm.ino",
    language: "cpp",
    libraries: [],
    source: `const int GAS_PIN = A0;
const int BUZZER_PIN = 8;
const int RED_LED = 9, GREEN_LED = 10;

const unsigned long WARMUP_MS = 120000UL;  // heater warm-up after every power-on
const int ALARM_RISE = 150;   // ADC counts above the clean-air baseline that trigger the alarm
const int CLEAR_RISE = 100;   // must fall below this to clear (hysteresis)
const uint8_t HITS_TO_ALARM = 3;           // consecutive high readings (3 x 250 ms)

enum State { WARMING, CALIBRATING, MONITORING };
State state = WARMING;
int baseline = 0;
bool alarmOn = false;
uint8_t hits = 0;
long calSum = 0;
int calCount = 0;
unsigned long lastRead = 0, lastPrint = 0;

int readGas() {
  long sum = 0;
  for (int i = 0; i < 8; i++) sum += analogRead(GAS_PIN);   // average out ADC noise
  return sum / 8;
}

void updateOutputs(unsigned long now) {
  if (state != MONITORING) {              // warming up / calibrating: green blinks
    digitalWrite(GREEN_LED, (now / 500) % 2);
    digitalWrite(RED_LED, LOW);
    digitalWrite(BUZZER_PIN, LOW);
  } else if (alarmOn) {                   // alarm: red on, buzzer beeps at 2 Hz
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(RED_LED, HIGH);
    digitalWrite(BUZZER_PIN, (now / 250) % 2);
  } else {                                // all clear
    digitalWrite(GREEN_LED, HIGH);
    digitalWrite(RED_LED, LOW);
    digitalWrite(BUZZER_PIN, LOW);
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);

  // self-test: both LEDs and a short chirp
  digitalWrite(RED_LED, HIGH);
  digitalWrite(GREEN_LED, HIGH);
  digitalWrite(BUZZER_PIN, HIGH);
  delay(150);
  digitalWrite(BUZZER_PIN, LOW);
  delay(350);
  Serial.println(F("MQ-2 gas alarm, warming up for 120 s"));
}

void loop() {
  unsigned long now = millis();
  updateOutputs(now);
  if (now - lastRead < 250) return;
  lastRead = now;
  int gas = readGas();

  if (state == WARMING) {
    if (now >= WARMUP_MS) {
      state = CALIBRATING;
      Serial.println(F("Calibrating clean-air baseline..."));
    } else if (now - lastPrint >= 10000) {
      lastPrint = now;
      Serial.print(F("Warming up, "));
      Serial.print((WARMUP_MS - now) / 1000);
      Serial.print(F(" s left, gas="));
      Serial.println(gas);
    }
    return;
  }

  if (state == CALIBRATING) {
    calSum += gas;
    if (++calCount >= 40) {               // 40 x 250 ms = 10 s of clean air
      baseline = calSum / calCount;
      state = MONITORING;
      Serial.print(F("Baseline = "));
      Serial.println(baseline);
      if (baseline > 400) Serial.println(F("Warning: baseline is high. Air the room and press reset."));
    }
    return;
  }

  int rise = gas - baseline;
  if (!alarmOn) {
    hits = rise >= ALARM_RISE ? hits + 1 : 0;
    if (hits >= HITS_TO_ALARM) {
      alarmOn = true;
      Serial.print(F("ALARM gas="));
      Serial.println(gas);
    }
  } else if (rise < CLEAR_RISE) {
    alarmOn = false;
    hits = 0;
    Serial.println(F("Clear"));
  }

  if (now - lastPrint >= 1000) {
    lastPrint = now;
    Serial.print(F("gas="));
    Serial.print(gas);
    Serial.print(F(" base="));
    Serial.print(baseline);
    Serial.println(alarmOn ? F(" ALARM") : F(" ok"));
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The alarm goes off right after calibration", ru: "Тревога включается сразу после калибровки", kk: "Калибрлеуден кейін бірден дабыл қосылады" },
      cause: { en: "Something raised the reading just after calibration (cooking, an aerosol spray, an alcohol-based cleaner), or ALARM_RISE is smaller than your sensor's noise in clean air.", ru: "Что-то подняло показания сразу после калибровки (готовка, аэрозоль, спиртовое средство для уборки), или ALARM_RISE меньше, чем шум вашего датчика в чистом воздухе.", kk: "Калибрлеуден кейін бірден бір нәрсе көрсеткішті көтерді (тамақ пісіру, аэрозоль, спирті бар тазалағыш зат) немесе ALARM_RISE датчигіңіздің таза ауадағы шуынан кіші." },
      fix: { en: "Watch gas= in clean air for a few minutes. If it wanders by more than about 50, raise ALARM_RISE and CLEAR_RISE. Then air the room and press reset to calibrate again.", ru: "Понаблюдайте за gas= в чистом воздухе несколько минут. Если значение гуляет больше чем на 50, увеличьте ALARM_RISE и CLEAR_RISE. Затем проветрите комнату и нажмите reset для новой калибровки.", kk: "Таза ауада бірнеше минут gas= мәнін бақылаңыз. Ол шамамен 50-ден көп ауытқыса, ALARM_RISE пен CLEAR_RISE мәндерін көбейтіңіз. Содан кейін бөлмені желдетіп, қайта калибрлеу үшін reset басыңыз." },
    },
    {
      symptom: { en: "gas= barely changes when you test with lighter gas", ru: "gas= почти не меняется при проверке газом зажигалки", kk: "Оттық газымен тексергенде gas= мәні әрең өзгереді" },
      cause: { en: "AO is not on A0, the heater is underpowered (weak USB port, long thin cable), or the gas puff missed the mesh.", ru: "AO не на A0, нагревателю не хватает питания (слабый USB-порт, длинный тонкий кабель), или газ прошёл мимо сетки.", kk: "AO A0-де емес, қыздырғышқа қуат жетпейді (әлсіз USB порты, ұзын жіңішке кабель) немесе газ торға тимей өтіп кетті." },
      fix: { en: "Check the A0 wire, measure about 5 V between VCC and GND on the module, and use a short cable to a 1 A charger.", ru: "Проверьте провод A0, измерьте около 5 В между VCC и GND модуля и используйте короткий кабель к заряднику на 1 А.", kk: "A0 сымын тексеріңіз, модульдің VCC мен GND арасында шамамен 5 В бар-жоғын өлшеңіз және 1 А зарядтағышқа қысқа кабель қолданыңыз." },
    },
    {
      symptom: { en: "The Uno resets or the USB port disconnects", ru: "Uno перезагружается или USB-порт отключается", kk: "Uno қайта жүктеледі немесе USB порты ажырайды" },
      cause: { en: "The 150 mA heater on top of the Uno and buzzer is too much for a weak USB port or hub.", ru: "Нагреватель на 150 мА вместе с Uno и зуммером слишком много для слабого порта или хаба.", kk: "150 мА қыздырғыш Uno мен зуммерге қосылғанда әлсіз порт не хаб үшін тым көп." },
      fix: { en: "Plug straight into the computer or use a 5 V 1 A USB charger.", ru: "Подключайтесь напрямую к компьютеру или используйте USB-зарядник 5 В 1 А.", kk: "Компьютерге тікелей қосыңыз немесе 5 В 1 А USB зарядтағышын қолданыңыз." },
    },
  ],
  safety: [
    { en: "This is a learning project, not a certified gas detector. Keep a certified gas and CO alarm in any room with a gas appliance; the MQ-2 is not a reliable CO sensor.", ru: "Это учебный проект, а не сертифицированный газоанализатор. В помещении с газовым прибором должен стоять сертифицированный датчик газа и CO; MQ-2 не является надёжным датчиком CO.", kk: "Бұл оқу жобасы, сертификатталған газ анализаторы емес. Газ құрылғысы бар бөлмеде сертификатталған газ және CO дабылы тұруы керек; MQ-2 сенімді CO датчигі емес." },
    { en: "Test only with a short puff of unlit lighter gas in a ventilated room, with no flame or spark nearby.", ru: "Проверяйте только короткой порцией газа из незажжённой зажигалки в проветриваемой комнате, без огня и искр рядом.", kk: "Тек жақпаған оттықтан шыққан аз ғана газбен, желдетілген бөлмеде, жанында от пен ұшқын жоқ кезде тексеріңіз." },
    { en: "The sensor's heater runs hot; do not touch the mesh while it is powered.", ru: "Нагреватель датчика сильно греется; не трогайте сетку, пока он включён.", kk: "Датчиктің қыздырғышы қатты қызады; қосулы тұрғанда торды ұстамаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "MQ-2 gas alarm, warming up for 120 s",
      "Warming up, 110 s left, gas=312",
      "Warming up, 60 s left, gas=188",
      "Calibrating clean-air baseline...",
      "Baseline = 142",
      "gas=145 base=142 ok",
      "gas=301 base=142 ok",
      "ALARM gas=468",
      "gas=455 base=142 ALARM",
      "Clear",
      "gas=171 base=142 ok",
    ],
    leds: [{ label: "RED", color: "#E53935" }, { label: "GREEN", color: "#43A047" }],
  },
} satisfies GuideContent;
