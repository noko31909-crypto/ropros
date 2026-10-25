import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "parking-distance-sensor",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "vehicles",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 10,
  xpReward: 150,
  title: {
    en: "Parking Distance Sensor",
    ru: "Парктроник",
    kk: "Тұрақ қашықтығы датчигі",
  },
  summary: {
    en: "Like a car's parking sensor: an HC-SR04 measures the gap, green/yellow/red LEDs show the zone, and the buzzer beeps faster as you get closer, then holds a solid tone at 10 cm.",
    ru: "Как парктроник в машине: HC-SR04 измеряет расстояние, зелёный/жёлтый/красный светодиоды показывают зону, а пищалка пищит всё чаще по мере приближения и переходит в сплошной тон на 10 см.",
    kk: "Көліктегі парктроник сияқты: HC-SR04 қашықтықты өлшейді, жасыл/сары/қызыл жарық диодтары аймақты көрсетеді, ал зуммер жақындаған сайын жиірек шиқылдап, 10 см-де үздіксіз дыбысқа ауысады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "hc-sr04", qty: 1, spec: { en: "5 V, 2–400 cm", ru: "5 В, 2–400 см", kk: "5 В, 2–400 см" }, role: { en: "Distance sensor", ru: "Датчик расстояния", kk: "Қашықтық датчигі" } },
    { component: "buzzer-passive", qty: 1, spec: { en: "passive, 2-pin", ru: "пассивная, 2 вывода", kk: "пассивті, 2 шықпалы" }, role: { en: "Warning beeps", ru: "Предупреждающие сигналы", kk: "Ескерту дыбыстары" } },
    { component: "led", qty: 3, spec: { en: "5 mm: green, yellow, red", ru: "5 мм: зелёный, жёлтый, красный", kk: "5 мм: жасыл, сары, қызыл" }, role: { en: "Distance zones", ru: "Зоны расстояния", kk: "Қашықтық аймақтары" } },
    { component: "resistor", qty: 3, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиодов", kk: "Жарық диодтарының тогын шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 14, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "us", component: "hc-sr04", label: "HC-SR04" },
    { id: "bz", component: "buzzer-passive", label: "Buzzer" },
    { id: "r_grn", component: "resistor", label: "220 Ω" },
    { id: "r_yel", component: "resistor", label: "220 Ω" },
    { id: "r_red", component: "resistor", label: "220 Ω" },
    { id: "led_grn", component: "led", label: "Green" },
    { id: "led_yel", component: "led", label: "Yellow" },
    { id: "led_red", component: "led", label: "Red" },
  ],
  connections: [
    { from: "us.VCC", to: "board.5V", color: "red" },
    { from: "us.GND", to: "board.GND", color: "black" },
    { from: "board.D9", to: "us.TRIG", color: "yellow" },
    { from: "us.ECHO", to: "board.D10", color: "blue" },
    { from: "board.D5", to: "bz.+", color: "orange", note: { en: "tone() output", ru: "выход tone()", kk: "tone() шығысы" } },
    { from: "bz.-", to: "board.GND2", color: "black" },
    { from: "board.D2", to: "r_grn.A", color: "green" },
    { from: "r_grn.B", to: "led_grn.A", color: "green", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led_grn.K", to: "board.GND2", color: "black" },
    { from: "board.D3", to: "r_yel.A", color: "yellow" },
    { from: "r_yel.B", to: "led_yel.A", color: "yellow" },
    { from: "led_yel.K", to: "board.GND2", color: "black" },
    { from: "board.D4", to: "r_red.A", color: "red" },
    { from: "r_red.B", to: "led_red.A", color: "red" },
    { from: "led_red.K", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Mount and wire the HC-SR04", ru: "Установите и подключите HC-SR04", kk: "HC-SR04-ті орнатып, қосыңыз" },
      body: {
        en: "Push the sensor into the edge of the breadboard with the two \"eyes\" facing out, nothing in front of them. Wire VCC → 5V, GND → GND, TRIG → D9 and ECHO → D10. The sketch sends a 10 µs pulse on TRIG and times how long ECHO stays HIGH: about 58 µs per centimetre there and back.",
        ru: "Вставьте датчик в край макетки «глазами» наружу, чтобы перед ними ничего не было. Подключите VCC → 5V, GND → GND, TRIG → D9, ECHO → D10. Скетч подаёт импульс 10 мкс на TRIG и измеряет, сколько ECHO держится в HIGH: около 58 мкс на сантиметр туда и обратно.",
        kk: "Датчикті «көздерін» сыртқа, алдында ештеңе болмайтындай етіп макет тақтасының шетіне орнатыңыз. VCC → 5V, GND → GND, TRIG → D9, ECHO → D10 қосыңыз. Скетч TRIG-ке 10 мкс импульс жіберіп, ECHO қанша уақыт HIGH болғанын өлшейді: барып-қайтуға сантиметріне шамамен 58 мкс.",
      },
      expect: { en: "Four sensor wires: 5V, GND, D9, D10.", ru: "Четыре провода датчика: 5V, GND, D9, D10.", kk: "Датчиктің төрт сымы: 5V, GND, D9, D10." },
      mistake: { en: "Breadboard parts or wires right in front of the transducers return false short echoes.", ru: "Детали или провода прямо перед излучателями дают ложное короткое эхо.", kk: "Сәулелендіргіштердің дәл алдындағы бөлшектер немесе сымдар жалған қысқа жаңғырық береді." },
    },
    {
      title: { en: "Add the three zone LEDs", ru: "Добавьте три светодиода зон", kk: "Үш аймақ жарық диодын қосыңыз" },
      body: {
        en: "Wire green to D2, yellow to D3 and red to D4, each through its own 220 Ω resistor to the long leg, with all short legs to GND. Green means more than 100 cm (clear), yellow 40–100 cm (slow down), red under 40 cm (almost there).",
        ru: "Подключите зелёный к D2, жёлтый к D3, красный к D4, каждый через свой резистор 220 Ом к длинной ножке, все короткие ножки на GND. Зелёный значит больше 100 см (свободно), жёлтый 40–100 см (медленнее), красный меньше 40 см (почти приехали).",
        kk: "Жасылды D2-ге, сарыны D3-ке, қызылды D4-ке, әрқайсысын өз 220 Ом резисторы арқылы ұзын аяғына қосыңыз, барлық қысқа аяқтар GND-ге. Жасыл 100 см-ден артық (бос), сары 40–100 см (баяулаңыз), қызыл 40 см-ден аз (жеттіңіз дерлік) дегенді білдіреді.",
      },
      expect: { en: "Three LEDs in traffic-light order, each with a resistor.", ru: "Три светодиода в порядке светофора, у каждого резистор.", kk: "Бағдаршам ретімен үш жарық диоды, әрқайсысында резистор бар." },
      mistake: { en: "An LED in backwards stays dark in its zone; turn it so the long leg meets the resistor.", ru: "Перевёрнутый светодиод не горит в своей зоне; разверните его длинной ножкой к резистору.", kk: "Кері қойылған жарық диоды өз аймағында жанбайды; оны ұзын аяғын резисторға қаратып бұрыңыз." },
    },
    {
      title: { en: "Connect the buzzer", ru: "Подключите пищалку", kk: "Зуммерді қосыңыз" },
      body: {
        en: "Wire the passive buzzer + to D5 and − to GND. tone(BUZZER_PIN, 2000, 40) makes a short 2 kHz chirp without blocking the loop, so the sketch can keep measuring while it beeps.",
        ru: "Подключите + пассивной пищалки к D5, − к GND. tone(BUZZER_PIN, 2000, 40) даёт короткий писк 2 кГц, не блокируя цикл, поэтому скетч продолжает мерить, пока пищит.",
        kk: "Пассивті зуммердің + шықпасын D5-ке, − шықпасын GND-ге қосыңыз. tone(BUZZER_PIN, 2000, 40) циклды тоқтатпай қысқа 2 кГц шиқыл береді, сондықтан скетч шиқылдап жатып та өлшей береді.",
      },
      expect: { en: "Buzzer between D5 and GND.", ru: "Пищалка между D5 и GND.", kk: "Зуммер D5 пен GND арасында." },
      mistake: { en: "Using delay() between beeps would freeze the distance readings while the buzzer is silent.", ru: "delay() между сигналами заморозил бы измерения, пока пищалка молчит.", kk: "Сигналдар арасындағы delay() зуммер үндемей тұрғанда өлшеулерді тоқтатып тастар еді." },
    },
    {
      title: { en: "Upload and test with your hand", ru: "Загрузите скетч и проверьте рукой", kk: "Скетчті жүктеп, қолмен тексеріңіз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. It measures every 60 ms (the gap the HC-SR04 datasheet asks for), takes the median of the last three readings to reject stray echoes, and prints the distance and zone twice a second. Move a flat object such as a book towards the sensor: silent and green beyond 100 cm, then beeps from every 700 ms down to every 80 ms, and a continuous tone at 10 cm or less.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Измерение идёт каждые 60 мс (такой интервал просит даташит HC-SR04), берётся медиана трёх последних значений, чтобы отбросить случайное эхо, а расстояние и зона печатаются дважды в секунду. Подносите к датчику что-то плоское, например книгу: дальше 100 см тишина и зелёный, затем сигналы от раза в 700 мс до раза в 80 мс, а на 10 см и ближе сплошной тон.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Өлшеу әр 60 мс сайын жүреді (HC-SR04 даташиті осы аралықты сұрайды), кездейсоқ жаңғырықты алып тастау үшін соңғы үш мәннің медианасы алынады, ал қашықтық пен аймақ секундына екі рет шығарылады. Датчикке кітап сияқты тегіс затты жақындатыңыз: 100 см-ден әрі тыныш және жасыл, содан кейін сигналдар 700 мс-тан 80 мс-қа дейін жиілейді, ал 10 см және одан жақын болса, үздіксіз дыбыс.",
      },
      expect: { en: "\"distance: 35 cm  zone: RED\" and fast beeping when you are close.", ru: "«distance: 35 cm  zone: RED» и частые сигналы вблизи.", kk: "Жақын болғанда «distance: 35 cm  zone: RED» және жиі сигналдар." },
      mistake: { en: "Soft or angled surfaces (a sweater, a sloped board) scatter the sound and read as \"no echo\"; test with something flat and hard.", ru: "Мягкие или наклонные поверхности (свитер, наклонная доска) рассеивают звук и читаются как «нет эха»; проверяйте на чём-то плоском и твёрдом.", kk: "Жұмсақ немесе көлбеу беттер (жемпір, қиғаш тақта) дыбысты шашыратып, «жаңғырық жоқ» болып оқылады; тегіс әрі қатты затпен тексеріңіз." },
    },
    {
      title: { en: "Install it for real", ru: "Установите по-настоящему", kk: "Шын мәнінде орнатыңыз" },
      body: {
        en: "For a garage, put the sensor at bumper height on the wall facing the car and the LEDs where the driver can see them. Power the Uno from a USB phone charger. Adjust FAR_CM, NEAR_CM and STOP_CM to your space; STOP_CM is the distance at which the tone becomes continuous, so set it a little before the point where you want the car to stop.",
        ru: "Для гаража установите датчик на высоте бампера на стене напротив машины, а светодиоды там, где их видно водителю. Питайте Uno от USB-зарядки телефона. Подстройте FAR_CM, NEAR_CM и STOP_CM под своё место; STOP_CM это расстояние, на котором тон становится сплошным, поэтому ставьте его чуть раньше точки, где машина должна остановиться.",
        kk: "Гараж үшін датчикті көлікке қарсы қабырғаға бампер биіктігінде, ал жарық диодтарын жүргізушіге көрінетін жерге орнатыңыз. Uno-ны телефонның USB зарядтағышынан қоректендіріңіз. FAR_CM, NEAR_CM және STOP_CM мәндерін өз орныңызға сай баптаңыз; STOP_CM дыбыс үздіксіз болатын қашықтық, сондықтан оны көлік тоқтауы керек нүктеден сәл ертерек қойыңыз.",
      },
      expect: { en: "Green when the bay is empty, solid tone right before the stop point.", ru: "Зелёный при пустом месте, сплошной тон прямо перед точкой остановки.", kk: "Орын бос болғанда жасыл, тоқтау нүктесінің алдында үздіксіз дыбыс." },
      mistake: { en: "The HC-SR04 is not waterproof; mount it indoors or under a cover, never exposed to rain.", ru: "HC-SR04 не защищён от воды; ставьте его в помещении или под навесом, но не под дождём.", kk: "HC-SR04 судан қорғалмаған; оны жабық жерге немесе қалқаның астына орнатыңыз, жаңбыр астында қалдырмаңыз." },
    },
  ],
  code: [{
    filename: "parking_sensor.ino",
    language: "cpp",
    libraries: [],
    source: `// Parking distance sensor: zone LEDs + beeps that speed up as you get closer.
const int TRIG_PIN = 9;
const int ECHO_PIN = 10;
const int BUZZER_PIN = 5;
const int GREEN_LED = 2;
const int YELLOW_LED = 3;
const int RED_LED = 4;

const int FAR_CM = 100;     // beyond this: green, silent
const int NEAR_CM = 40;     // below this: red
const int STOP_CM = 10;     // at or below this: continuous tone
const int NO_ECHO = 999;

int history[3] = {NO_ECHO, NO_ECHO, NO_ECHO};
int idx = 0;
int distanceCm = NO_ECHO;
bool solidTone = false;
unsigned long lastPing = 0;
unsigned long lastBeep = 0;
unsigned long lastPrint = 0;

int readCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  unsigned long echoUs = pulseIn(ECHO_PIN, HIGH, 25000UL);   // ~4 m max
  return echoUs == 0 ? NO_ECHO : echoUs / 58;
}

int median3(int a, int b, int c) {
  return max(min(a, b), min(max(a, b), c));
}

void showZone(int cm) {
  digitalWrite(GREEN_LED, cm > FAR_CM ? HIGH : LOW);
  digitalWrite(YELLOW_LED, cm <= FAR_CM && cm > NEAR_CM ? HIGH : LOW);
  digitalWrite(RED_LED, cm <= NEAR_CM ? HIGH : LOW);
}

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(YELLOW_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  Serial.println("Parking sensor ready");
}

void loop() {
  unsigned long now = millis();

  if (now - lastPing >= 60) {                     // HC-SR04: at least 60 ms between pings
    lastPing = now;
    history[idx] = readCm();
    idx = (idx + 1) % 3;
    distanceCm = median3(history[0], history[1], history[2]);
    showZone(distanceCm);
  }

  if (distanceCm <= STOP_CM) {
    if (!solidTone) { tone(BUZZER_PIN, 2000); solidTone = true; }
  } else {
    if (solidTone) { noTone(BUZZER_PIN); solidTone = false; }
    if (distanceCm <= FAR_CM) {
      unsigned long gap = map(distanceCm, STOP_CM, FAR_CM, 80, 700);
      if (now - lastBeep >= gap) {
        lastBeep = now;
        tone(BUZZER_PIN, 2000, 40);
      }
    }
  }

  if (now - lastPrint >= 500) {
    lastPrint = now;
    if (distanceCm == NO_ECHO) {
      Serial.println("distance: --- (no echo)  zone: GREEN");
    } else {
      Serial.print("distance: ");
      Serial.print(distanceCm);
      Serial.print(" cm  zone: ");
      Serial.println(distanceCm > FAR_CM ? "GREEN" : distanceCm > NEAR_CM ? "YELLOW" : distanceCm > STOP_CM ? "RED" : "RED STOP");
    }
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Always \"no echo\" and green", ru: "Всегда «no echo» и зелёный", kk: "Әрқашан «no echo» және жасыл" },
      cause: { en: "TRIG and ECHO are swapped, or the sensor has no 5 V.", ru: "Перепутаны TRIG и ECHO, или на датчике нет 5 В.", kk: "TRIG пен ECHO ауысқан немесе датчикте 5 В жоқ." },
      fix: { en: "Check TRIG → D9, ECHO → D10, VCC → 5V, GND → GND.", ru: "Проверьте TRIG → D9, ECHO → D10, VCC → 5V, GND → GND.", kk: "TRIG → D9, ECHO → D10, VCC → 5V, GND → GND тексеріңіз." },
    },
    {
      symptom: { en: "The zone jumps between colours at one distance", ru: "Зона прыгает между цветами на одном расстоянии", kk: "Бір қашықтықта аймақ түстер арасында секіреді" },
      cause: { en: "You are right at a boundary (40 or 100 cm), or a nearby object gives a second echo.", ru: "Вы ровно на границе (40 или 100 см), или рядом есть предмет, дающий второе эхо.", kk: "Сіз дәл шекарада тұрсыз (40 немесе 100 см) немесе жанындағы зат екінші жаңғырық береді." },
      fix: { en: "Clear the area in front of the sensor; if it still flickers, raise the median to five readings or move the thresholds.", ru: "Освободите пространство перед датчиком; если мигание осталось, увеличьте медиану до пяти значений или сдвиньте пороги.", kk: "Датчиктің алдын босатыңыз; жыпылықтау қалса, медиананы бес мәнге дейін арттырыңыз немесе шектерді жылжытыңыз." },
    },
    {
      symptom: { en: "No sound, but the LEDs work", ru: "Звука нет, хотя светодиоды работают", kk: "Дыбыс жоқ, бірақ жарық диодтары жұмыс істейді" },
      cause: { en: "Buzzer not on D5, or it is an active buzzer that ignores tone() frequencies and timing.", ru: "Пищалка не на D5, или это активная пищалка, которая игнорирует частоту и длительность tone().", kk: "Зуммер D5-те емес немесе бұл tone() жиілігі мен ұзақтығын елемейтін белсенді зуммер." },
      fix: { en: "Move + to D5 and use a passive buzzer, or try swapping its two leads.", ru: "Перенесите + на D5 и используйте пассивную пищалку, или поменяйте её выводы местами.", kk: "+ шықпасын D5-ке ауыстырып, пассивті зуммер қолданыңыз немесе оның шықпаларын ауыстырып көріңіз." },
    },
  ],
  safety: [
    { en: "This is a parking aid, not a safety system: always look behind you and use mirrors.", ru: "Это помощник при парковке, а не система безопасности: всегда смотрите назад и в зеркала.", kk: "Бұл тұраққа қоюға көмекші, қауіпсіздік жүйесі емес: әрқашан артыңызға және айналарға қараңыз." },
    { en: "Never connect an LED to a pin without its resistor.", ru: "Никогда не подключайте светодиод к пину без резистора.", kk: "Жарық диодын ешқашан резисторсыз пинге қоспаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["Parking sensor ready", "distance: --- (no echo)  zone: GREEN", "distance: 142 cm  zone: GREEN", "distance: 96 cm  zone: YELLOW", "distance: 71 cm  zone: YELLOW", "distance: 38 cm  zone: RED", "distance: 22 cm  zone: RED", "distance: 9 cm  zone: RED STOP", "distance: 8 cm  zone: RED STOP"],
    leds: [{ label: "Green", color: "#43A047" }, { label: "Yellow", color: "#FDD835" }, { label: "Red", color: "#E53935" }],
  },
} satisfies GuideContent;
