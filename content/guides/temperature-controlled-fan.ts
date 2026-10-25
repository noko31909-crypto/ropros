import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "temperature-controlled-fan",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "home",
  robotics: false,
  difficulty: "intermediate",
  hours: 2,
  costUsd: 16,
  xpReward: 200,
  title: {
    en: "Temperature-Controlled Fan",
    ru: "Вентилятор с управлением по температуре",
    kk: "Температурамен басқарылатын желдеткіш",
  },
  summary: {
    en: "A DHT22 measures the air and a logic-level MOSFET drives a 5 V fan with PWM: off when it is cool, faster as it warms up, full speed above 32 °C.",
    ru: "DHT22 измеряет воздух, а логический MOSFET управляет вентилятором 5 В через ШИМ: в прохладе он выключен, при нагреве крутится быстрее, выше 32 °C на полной скорости.",
    kk: "DHT22 ауаны өлшейді, ал логикалық MOSFET 5 В желдеткішті ШИМ арқылы басқарады: салқында өшірулі, жылыған сайын жылдамырақ, 32 °C-тан жоғары толық жылдамдықпен айналады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "dht22", qty: 1, spec: { en: "3-pin module with pull-up", ru: "3-пиновый модуль с подтяжкой", kk: "тартуы бар 3 пинді модуль" }, role: { en: "Temperature and humidity", ru: "Температура и влажность", kk: "Температура мен ылғалдылық" } },
    { component: "fan-5v", qty: 1, spec: { en: "40 mm, 5 V, ≤ 200 mA, 2-wire", ru: "40 мм, 5 В, ≤ 200 мА, 2 провода", kk: "40 мм, 5 В, ≤ 200 мА, 2 сымды" }, role: { en: "Cooling", ru: "Охлаждение", kk: "Салқындату" } },
    { component: "mosfet-n", qty: 1, spec: { en: "IRLZ44N logic-level, TO-220", ru: "IRLZ44N, логический уровень, TO-220", kk: "IRLZ44N, логикалық деңгей, TO-220" }, role: { en: "Low-side fan switch", ru: "Ключ вентилятора на минусе", kk: "Желдеткіштің минус жағындағы кілті" } },
    { component: "resistor", qty: 2, spec: { en: "220 Ω and 10 kΩ, ¼ W", ru: "220 Ом и 10 кОм, ¼ Вт", kk: "220 Ом және 10 кОм, ¼ Вт" }, role: { en: "Gate resistor and gate pull-down", ru: "Резистор затвора и подтяжка затвора к земле", kk: "Затвор резисторы және затворды жерге тарту" } },
    { component: "diode", qty: 1, spec: { en: "1N4148 or 1N4007", ru: "1N4148 или 1N4007", kk: "1N4148 немесе 1N4007" }, role: { en: "Flyback protection", ru: "Защита от обратного выброса", kk: "Кері импульстен қорғау" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 12, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "dht", component: "dht22", label: "DHT22" },
    { id: "fan", component: "fan-5v", label: "5 V fan" },
    { id: "q1", component: "mosfet-n", label: "IRLZ44N" },
    { id: "r_g", component: "resistor", label: "220 Ω gate" },
    { id: "r_pd", component: "resistor", label: "10 kΩ pull-down" },
    { id: "d1", component: "diode", label: "Flyback" },
  ],
  connections: [
    { from: "board.5V", to: "dht.VCC", color: "red" },
    { from: "dht.GND", to: "board.GND", color: "black" },
    { from: "dht.DATA", to: "board.D2", color: "yellow" },
    { from: "board.5V", to: "fan.+", color: "red", note: { en: "red fan wire", ru: "красный провод вентилятора", kk: "желдеткіштің қызыл сымы" } },
    { from: "fan.-", to: "q1.D", color: "black", note: { en: "black fan wire to the middle leg (drain)", ru: "чёрный провод вентилятора на среднюю ножку (сток)", kk: "желдеткіштің қара сымы ортаңғы аяққа (ағын)" } },
    { from: "q1.S", to: "board.GND2", color: "black" },
    { from: "board.D9", to: "r_g.A", color: "orange", note: { en: "PWM pin", ru: "пин ШИМ", kk: "ШИМ пині" } },
    { from: "r_g.B", to: "q1.G", color: "orange" },
    { from: "q1.G", to: "r_pd.A", color: "gray" },
    { from: "r_pd.B", to: "board.GND3", color: "black", note: { en: "keeps the fan off while the Arduino resets", ru: "держит вентилятор выключенным при перезагрузке Arduino", kk: "Arduino қайта жүктелгенде желдеткішті өшірулі ұстайды" } },
    { from: "d1.A", to: "fan.-", color: "gray" },
    { from: "d1.K", to: "fan.+", color: "gray", note: { en: "stripe towards +5 V", ru: "полоска к +5 В", kk: "жолақ +5 В жаққа" } },
  ],
  steps: [
    {
      title: { en: "Wire the DHT22", ru: "Подключите DHT22", kk: "DHT22-ні қосыңыз" },
      body: {
        en: "Connect the module's + (VCC) to 5V, − to GND and the data pin (often marked OUT or S) to D2. The 3-pin module already has the 10 kΩ pull-up on the data line; a bare 4-pin DHT22 would need one added between data and VCC.",
        ru: "Подключите + (VCC) модуля к 5V, − к GND, а вывод данных (часто подписан OUT или S) к D2. На 3-пиновом модуле подтяжка 10 кОм на линии данных уже есть; голому 4-ногому DHT22 её нужно добавить между данными и VCC.",
        kk: "Модульдің + (VCC) пинін 5V-қа, −-ін GND-ге, ал деректер пинін (көбіне OUT немесе S деп белгіленген) D2-ге қосыңыз. 3 пинді модульде деректер желісінде 10 кОм тарту бар; жалаң 4 аяқты DHT22-ге оны деректер мен VCC арасына қосу керек.",
      },
      expect: { en: "Three short wires; the sensor sits away from the fan's airflow so it measures the room, not the breeze.", ru: "Три коротких провода; датчик стоит в стороне от потока воздуха, чтобы измерять комнату, а не сквозняк.", kk: "Үш қысқа сым; датчик бөлменің ауасын өлшеуі үшін желдеткіштің ағынынан тыс тұрады." },
      mistake: { en: "Swapping VCC and GND on the module heats the sensor and can kill it within seconds.", ru: "Если перепутать VCC и GND, датчик нагреется и может сгореть за секунды.", kk: "VCC мен GND-ді ауыстырып алсаңыз, датчик қызып, бірнеше секундта істен шығуы мүмкін." },
    },
    {
      title: { en: "Place the MOSFET and its resistors", ru: "Установите MOSFET и его резисторы", kk: "MOSFET пен оның резисторларын орнатыңыз" },
      body: {
        en: "Hold the IRLZ44N with the printed side facing you: the legs are G, D, S from left to right. Put it on the breadboard. Connect a 220 Ω resistor from D9 to the gate (G), a 10 kΩ resistor from the gate to GND, and the source (S) straight to GND.",
        ru: "Держите IRLZ44N надписью к себе: ножки слева направо — G, D, S. Вставьте его в макетку. Поставьте резистор 220 Ом от D9 к затвору (G), резистор 10 кОм от затвора к GND, а исток (S) соедините прямо с GND.",
        kk: "IRLZ44N-ді жазуы бар жағын өзіңізге қаратып ұстаңыз: аяқтары солдан оңға қарай G, D, S. Оны макет тақтасына қойыңыз. D9-дан затворға (G) 220 Ом резистор, затвордан GND-ге 10 кОм резистор қойып, бастауды (S) тікелей GND-ге қосыңыз.",
      },
      expect: { en: "Gate has two resistors (to D9 and to GND), source goes to GND, drain is still free.", ru: "На затворе два резистора (к D9 и к GND), исток на GND, сток пока свободен.", kk: "Затворда екі резистор бар (D9-ға және GND-ге), бастау GND-де, ағын әзірге бос." },
      mistake: { en: "An IRFZ44N (without the L) needs 10 V on the gate; at 5 V it barely turns on and gets hot.", ru: "IRFZ44N (без буквы L) требует 10 В на затворе; от 5 В он едва открывается и греется.", kk: "IRFZ44N (L әрпінсіз) затворға 10 В қажет етеді; 5 В-та ол әрең ашылып, қызады." },
    },
    {
      title: { en: "Connect the fan and the flyback diode", ru: "Подключите вентилятор и защитный диод", kk: "Желдеткіш пен қорғаныс диодын қосыңыз" },
      body: {
        en: "Fan red wire to 5V, fan black wire to the MOSFET drain (middle leg). Put the diode across the fan: stripe (cathode) on the red/5V side, the other end on the black/drain side. When the MOSFET switches off, the motor's stored energy flows back through the diode instead of spiking the drain.",
        ru: "Красный провод вентилятора на 5V, чёрный — на сток MOSFET (средняя ножка). Диод поставьте параллельно вентилятору: полоской (катод) к красному/5V, другим концом к чёрному/стоку. Когда MOSFET закрывается, энергия обмотки уходит через диод, а не бьёт выбросом по стоку.",
        kk: "Желдеткіштің қызыл сымын 5V-қа, қара сымын MOSFET ағынына (ортаңғы аяқ) қосыңыз. Диодты желдеткішке параллель қойыңыз: жолағы (катод) қызыл/5V жағына, екінші ұшы қара/ағын жағына. MOSFET жабылғанда, ораманың энергиясы ағынға импульс бермей, диод арқылы қайтады.",
      },
      expect: { en: "The fan stays still after power-up because the 10 kΩ holds the gate low.", ru: "После включения вентилятор стоит, потому что 10 кОм держат затвор на нуле.", kk: "Қуат берілгенде желдеткіш айналмайды, өйткені 10 кОм затворды төмен ұстайды." },
      mistake: { en: "A diode turned the wrong way shorts 5 V to GND as soon as the MOSFET turns on.", ru: "Диод, поставленный наоборот, замкнёт 5 В на GND, как только MOSFET откроется.", kk: "Кері қойылған диод MOSFET ашылған бойда 5 В-ты GND-мен тұйықтайды." },
    },
    {
      title: { en: "Upload and test with your hand", ru: "Загрузите скетч и проверьте рукой", kk: "Скетчті жүктеп, қолмен тексеріңіз" },
      body: {
        en: "Install \"DHT sensor library\" and \"Adafruit Unified Sensor\", upload the sketch and open the Serial Monitor at 9600 baud. Set T_START one degree above your room temperature, then hold the sensor between your fingers. As it warms, the duty rises from 35 % to 100 %.",
        ru: "Установите «DHT sensor library» и «Adafruit Unified Sensor», загрузите скетч и откройте Serial Monitor на 9600 бод. Выставьте T_START на градус выше комнатной температуры и зажмите датчик пальцами. По мере нагрева скважность растёт с 35 % до 100 %.",
        kk: "«DHT sensor library» және «Adafruit Unified Sensor» кітапханаларын орнатып, скетчті жүктеңіз де, Serial Monitor-ды 9600 бодта ашыңыз. T_START мәнін бөлме температурасынан бір градус жоғары қойып, датчикті саусақтарыңызбен қысыңыз. Жылыған сайын толтыру коэффициенті 35 %-дан 100 %-ға дейін өседі.",
      },
      expect: { en: "Every 2 s a line like \"T=27.5C H=44% fan=51%\" and the fan speeds up with temperature.", ru: "Каждые 2 с строка вида «T=27.5C H=44% fan=51%», и вентилятор ускоряется с ростом температуры.", kk: "Әр 2 с сайын «T=27.5C H=44% fan=51%» сияқты жол шығады, ал желдеткіш температурамен бірге жылдамдайды." },
      mistake: { en: "Reading the DHT22 faster than every 2 s returns NaN; the sketch then runs the fan at 100 % as a safe default.", ru: "Если опрашивать DHT22 чаще раза в 2 с, он возвращает NaN; тогда скетч включает вентилятор на 100 % для безопасности.", kk: "DHT22-ні 2 с-тан жиі сұрасаңыз, ол NaN қайтарады; сонда скетч қауіпсіздік үшін желдеткішті 100 %-ға қосады." },
    },
    {
      title: { en: "Tune the curve", ru: "Настройте кривую", kk: "Қисықты баптаңыз" },
      body: {
        en: "T_START is where the fan starts, T_FULL is where it reaches 100 %, and HYST keeps it spinning slowly until the air is 0.5 °C below T_START, so it does not click on and off. If your fan stalls at low speed, raise MIN_DUTY; the sketch also gives a 300 ms full-power kick every time the fan starts from standstill.",
        ru: "T_START — температура включения, T_FULL — температура 100 %, а HYST держит вентилятор на малых оборотах, пока воздух не станет на 0,5 °C холоднее T_START, чтобы он не щёлкал вкл/выкл. Если вентилятор останавливается на малой скорости, увеличьте MIN_DUTY; кроме того, при каждом старте с места скетч даёт толчок полной мощностью на 300 мс.",
        kk: "T_START — қосылу температурасы, T_FULL — 100 %-ға жететін температура, ал HYST ауа T_START-тан 0,5 °C суығанша желдеткішті баяу айналдырып тұрады, сонда ол қосылып-өшіп шертпейді. Желдеткіш баяу жылдамдықта тоқтап қалса, MIN_DUTY-ді арттырыңыз; сондай-ақ тоқтаған күйден әр іске қосылғанда скетч 300 мс толық қуатпен итеріп жібереді.",
      },
      expect: { en: "The fan starts cleanly and never chatters around the threshold.", ru: "Вентилятор уверенно стартует и не дребезжит около порога.", kk: "Желдеткіш сенімді іске қосылады және шек маңында дірілдемейді." },
      mistake: { en: "Setting T_FULL equal to T_START removes the ramp and turns the fan into a plain on/off switch.", ru: "Если T_FULL равно T_START, плавной кривой нет, и вентилятор становится простым вкл/выкл.", kk: "T_FULL мен T_START тең болса, біркелкі қисық жоғалып, желдеткіш қарапайым қосу/өшіруге айналады." },
    },
  ],
  code: [{
    filename: "temp_fan.ino",
    language: "cpp",
    libraries: ["DHT sensor library", "Adafruit Unified Sensor"],
    source: `#include <DHT.h>

const int DHT_PIN = 2;       // DHT22 data
const int FAN_PIN = 9;       // PWM -> 220 ohm -> MOSFET gate
#define DHTTYPE DHT22

const float T_START = 26.0;  // fan starts here (deg C)
const float T_FULL = 32.0;   // 100 % at and above this
const float HYST = 0.5;      // stop only below T_START - HYST
const int MIN_DUTY = 90;     // lowest PWM that keeps the fan turning (~35 %)

DHT dht(DHT_PIN, DHTTYPE);
int duty = 0;

int dutyFor(float t) {
  if (t >= T_FULL) return 255;
  if (t >= T_START) return MIN_DUTY + (int)((t - T_START) / (T_FULL - T_START) * (255 - MIN_DUTY));
  if (duty > 0 && t > T_START - HYST) return MIN_DUTY;   // hysteresis band
  return 0;
}

void setup() {
  Serial.begin(9600);
  pinMode(FAN_PIN, OUTPUT);
  analogWrite(FAN_PIN, 0);
  dht.begin();
  Serial.println("Fan controller ready");
}

void loop() {
  delay(2000);                        // DHT22 needs 2 s between readings
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  if (isnan(t) || isnan(h)) {
    Serial.println("DHT22 read failed, fan at 100% to be safe");
    duty = 255;
    analogWrite(FAN_PIN, duty);
    return;
  }

  int next = dutyFor(t);
  if (duty == 0 && next > 0) {        // kick-start from standstill
    analogWrite(FAN_PIN, 255);
    delay(300);
  }
  duty = next;
  analogWrite(FAN_PIN, duty);

  Serial.print("T=");
  Serial.print(t, 1);
  Serial.print("C H=");
  Serial.print(h, 0);
  Serial.print("% fan=");
  Serial.print(duty * 100 / 255);
  Serial.println("%");
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The fan runs at full speed all the time", ru: "Вентилятор всё время крутится на полной скорости", kk: "Желдеткіш үнемі толық жылдамдықпен айналады" },
      cause: { en: "The MOSFET legs are swapped (fan on the source), the drain is shorted to GND, or the sensor fails and the safe default kicks in.", ru: "Перепутаны ножки MOSFET (вентилятор на истоке), сток замкнут на GND или датчик не читается и включился безопасный режим.", kk: "MOSFET аяқтары ауысқан (желдеткіш бастауда), ағын GND-мен тұйықталған немесе датчик оқылмай, қауіпсіз режим қосылған." },
      fix: { en: "Check the order G-D-S with the label facing you and look for \"DHT22 read failed\" in the Serial Monitor.", ru: "Проверьте порядок G-D-S (надписью к себе) и поищите «DHT22 read failed» в Serial Monitor.", kk: "G-D-S ретін (жазуын өзіңізге қаратып) тексеріп, Serial Monitor-дан «DHT22 read failed» жазуын іздеңіз." },
    },
    {
      symptom: { en: "Serial prints \"DHT22 read failed\" every time", ru: "В Serial каждый раз «DHT22 read failed»", kk: "Serial-да әр жолы «DHT22 read failed» шығады" },
      cause: { en: "Data is not on D2, the sensor is a bare 4-pin part without a pull-up, or DHTTYPE is set to DHT11.", ru: "Данные не на D2, датчик — голый 4-ногий без подтяжки, или DHTTYPE указан как DHT11.", kk: "Деректер D2-де емес, датчик тартуы жоқ жалаң 4 аяқты немесе DHTTYPE DHT11 деп көрсетілген." },
      fix: { en: "Move data to D2, add 10 kΩ from data to VCC on a bare sensor, and keep #define DHTTYPE DHT22.", ru: "Переставьте данные на D2, для голого датчика добавьте 10 кОм от данных к VCC и оставьте #define DHTTYPE DHT22.", kk: "Деректерді D2-ге ауыстырыңыз, жалаң датчикке деректерден VCC-ге 10 кОм қосыңыз және #define DHTTYPE DHT22 қалдырыңыз." },
    },
    {
      symptom: { en: "The fan whines or ticks at low speed", ru: "На малой скорости вентилятор пищит или тикает", kk: "Баяу жылдамдықта желдеткіш шиқылдайды немесе тықылдайды" },
      cause: { en: "The Uno's 490 Hz PWM is audible in the fan's motor and electronics.", ru: "ШИМ Uno на 490 Гц слышен в моторе и электронике вентилятора.", kk: "Uno-ның 490 Гц ШИМ-і желдеткіштің моторы мен электроникасында естіледі." },
      fix: { en: "Raise MIN_DUTY so the fan never runs in the noisiest range; a little noise at low duty is normal for a 2-wire fan.", ru: "Увеличьте MIN_DUTY, чтобы вентилятор не работал в самом шумном диапазоне; лёгкий шум на малой скважности нормален для 2-проводного вентилятора.", kk: "Желдеткіш ең шулы ауқымда жұмыс істемеуі үшін MIN_DUTY-ді арттырыңыз; 2 сымды желдеткіш үшін аз толтыруда сәл шу қалыпты жағдай." },
    },
    {
      symptom: { en: "The MOSFET gets warm", ru: "MOSFET нагревается", kk: "MOSFET қызады" },
      cause: { en: "It is not a logic-level part, so 5 V on the gate leaves it half on.", ru: "Это не логический транзистор, и 5 В на затворе открывают его лишь наполовину.", kk: "Бұл логикалық транзистор емес, сондықтан затвордағы 5 В оны жартылай ғана ашады." },
      fix: { en: "Use an IRLZ44N (or another \"IRL\" part rated at VGS = 4.5 V); at 150 mA it should stay cold.", ru: "Используйте IRLZ44N (или другой «IRL» с параметрами при VGS = 4,5 В); при 150 мА он должен оставаться холодным.", kk: "IRLZ44N (немесе VGS = 4,5 В-қа есептелген басқа «IRL» транзисторын) қолданыңыз; 150 мА-да ол суық болуы керек." },
    },
  ],
  safety: [
    { en: "The Arduino 5V pin is fine for one small 40 mm fan (≤ 200 mA); larger fans need their own 5 V supply on the fan + wire with GND shared.", ru: "Пин 5V Arduino подходит для одного маленького вентилятора 40 мм (≤ 200 мА); большим вентиляторам нужен отдельный источник 5 В на + с общей GND.", kk: "Arduino-ның 5V пині бір кішкене 40 мм желдеткішке (≤ 200 мА) жарайды; үлкен желдеткіштерге + сымына ортақ GND-мен бөлек 5 В қорек көзі керек." },
    { en: "Keep fingers and cables out of the blades while testing.", ru: "Во время тестов держите пальцы и провода подальше от лопастей.", kk: "Сынақ кезінде саусақтар мен сымдарды қалақтардан алыс ұстаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "Fan controller ready",
      "T=24.8C H=41% fan=0%",
      "T=26.0C H=42% fan=35%",
      "T=27.5C H=44% fan=51%",
      "T=29.0C H=45% fan=67%",
      "T=30.5C H=45% fan=83%",
      "T=32.1C H=46% fan=100%",
      "T=25.8C H=43% fan=35%",
      "T=25.3C H=42% fan=0%",
    ],
    leds: [],
  },
} satisfies GuideContent;
