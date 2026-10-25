import type { Locale } from "@/lib/i18n/config";
import type { ComponentId } from "./hardware/ids.ts";
import type { CheckInput } from "./hardware/check.ts";
import type { GuideContent, WIRE_COLORS } from "./content/schema.ts";
import type { CoverId as CardCoverId } from "../components/cards/covers.tsx";
import { getComponent } from "./hardware/components.ts";
import { CONTENT_GUIDES } from "../content/guides/index.ts";

/**
 * Guide content model. Human-language text is stored per locale; part names, pins and code stay untranslated.
 * TODO: move to Supabase once guide content has a table (see CLAUDE.md, item 4).
 */
export type L = Record<Locale, string>;
/** `component` is the registry id (lib/hardware/components.ts); omitted only for consumables with no registry entry (e.g. tape). */
export type Part = { name: string; component?: ComponentId; qty: number; spec: L; role: L; optional?: boolean };
export type Step = { title: L; body: L; expect: L; mistake: L };
export type CodeFile = { filename: string; language: "cpp" | "python" | "bash"; source: string; libraries: string[] };
export type Issue = { symptom: L; cause: L; fix: L };
export type WireColor = (typeof WIRE_COLORS)[number];
/** An electrical part on the diagram (same shape as GuideSchema.instances). The board is implicit as instance "board". */
export type Instance = { id: string; component: ComponentId; label?: string };
/** One wire, "instance.PIN" → "instance.PIN" with registry pin ids (same shape as GuideSchema.connections). */
export type Connection = { from: string; to: string; color: WireColor; note?: L };
/** Simulator panel: serial log lines (device output, untranslated) and the LEDs that blink while it runs. */
export type Simulation = { baud: number; lines: string[]; leds: { label: string; color: string }[] };

export type Platform = "arduino" | "esp32" | "raspberry_pi";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type CoverId = CardCoverId;

export type Guide = {
  slug: string; title: L; summary: L; board: string; boardComponent: ComponentId; platform: Platform; cover: CoverId;
  difficulty: Difficulty; hours: number; costUsd: number; xpReward: number;
  verification: L; parts: Part[]; steps: Step[]; code: CodeFile[]; troubleshooting: Issue[]; safety: L[];
  instances: Instance[]; connections: Connection[]; simulation: Simulation;
};

const same = (s: string): L => ({ en: s, ru: s, kk: s });

const OBSTACLE: Guide = {
  slug: "obstacle-avoiding-robot",
  title: { en: "Obstacle Avoiding Robot", ru: "Робот, объезжающий препятствия", kk: "Кедергіні айналып өтетін робот" },
  summary: {
    en: "Drives forward while the way is clear, then a servo swings the sensor left and right and the robot turns toward the side with more room.",
    ru: "Едет вперёд, пока впереди свободно, затем сервопривод поворачивает датчик влево и вправо, и робот уезжает в сторону, где больше места.",
    kk: "Алдыңғы жол бос болғанша алға жүреді, содан кейін серво датчикті солға және оңға бұрады, ал робот бос орны көп жаққа бұрылады.",
  },
  board: "Arduino Uno", boardComponent: "arduino-uno", platform: "arduino", cover: "obstacle", difficulty: "intermediate", hours: 5, costUsd: 40, xpReward: 250,
  verification: {
    en: "Wiring checked against the L298N, HC-SR04, SG90 and LM2596 datasheets and by the automatic circuit checker. Not yet bench-tested on real hardware.",
    ru: "Проводка сверена с даташитами L298N, HC-SR04, SG90 и LM2596 и автоматической проверкой схемы. На реальном железе ещё не тестировалась.",
    kk: "Сымдар L298N, HC-SR04, SG90 және LM2596 даташиттерімен әрі автоматты схема тексерісімен салыстырылды. Нақты құрылғыда әлі тексерілмеген.",
  },
  parts: [
    { name: "Arduino Uno R3", component: "arduino-uno", qty: 1, spec: { en: "5 V logic", ru: "логика 5 В", kk: "5 В логика" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { name: "HC-SR04 ultrasonic sensor", component: "hc-sr04", qty: 1, spec: { en: "5 V, 2–400 cm", ru: "5 В, 2–400 см", kk: "5 В, 2–400 см" }, role: { en: "Distance sensing", ru: "Измерение расстояния", kk: "Қашықтықты өлшеу" } },
    { name: "SG90 micro servo", component: "servo-sg90", qty: 1, spec: { en: "4.8–6 V", ru: "4,8–6 В", kk: "4,8–6 В" }, role: { en: "Sensor scanning", ru: "Поворот датчика", kk: "Датчикті бұру" } },
    { name: "L298N motor driver", component: "l298n", qty: 1, spec: { en: "2 A per channel", ru: "2 А на канал", kk: "арнаға 2 А" }, role: { en: "Drives both motors", ru: "Управление моторами", kk: "Моторларды басқару" } },
    { name: "TT gear motor", component: "dc-motor", qty: 2, spec: { en: "3–6 V", ru: "3–6 В", kk: "3–6 В" }, role: { en: "Wheels", ru: "Колёса", kk: "Дөңгелектер" } },
    { name: "2WD chassis", component: "robot-chassis-2wd", qty: 1, spec: { en: "frame, wheels, caster", ru: "рама, колёса, опора", kk: "рама, дөңгелектер, тірек" }, role: { en: "Body", ru: "Корпус", kk: "Корпус" } },
    { name: "2× 18650 battery pack", component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V", ru: "7,4 В", kk: "7,4 В" }, role: { en: "Power", ru: "Питание", kk: "Қуат" } },
    { name: "LM2596 buck converter", component: "buck-converter-lm2596", qty: 1, spec: { en: "set to 5.0 V, 2 A", ru: "настроить на 5,0 В, 2 А", kk: "5,0 В-қа баптау, 2 А" }, role: { en: "Separate servo supply", ru: "Отдельное питание серво", kk: "Сервоның бөлек қуаты" } },
    { name: "Breadboard + jumper wires", component: "breadboard", qty: 1, spec: { en: "half size, M-M / M-F", ru: "половинка, папа-папа / папа-мама", kk: "жартылай, M-M / M-F" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { name: "TB6612FNG driver", component: "tb6612fng", qty: 1, optional: true, spec: { en: "1.2 A, 3.3–5 V logic", ru: "1,2 А, логика 3,3–5 В", kk: "1,2 А, 3,3–5 В логика" }, role: { en: "More efficient driver", ru: "Более эффективный драйвер", kk: "Тиімдірек драйвер" } },
  ],
  steps: [
    {
      title: { en: "Assemble the chassis", ru: "Соберите шасси", kk: "Шассиді құрастырыңыз" },
      body: { en: "Mount both TT motors, the wheels and the caster. Keep the battery low and central.", ru: "Установите оба мотора TT, колёса и опорный ролик. Аккумулятор держите низко и по центру.", kk: "Екі TT моторын, дөңгелектерді және тірек роликті орнатыңыз. Аккумуляторды төмен әрі ортаға қойыңыз." },
      expect: { en: "Wheels spin freely and the chassis sits level.", ru: "Колёса крутятся свободно, шасси стоит ровно.", kk: "Дөңгелектер еркін айналады, шасси тегіс тұрады." },
      mistake: { en: "Over-tightened screws crack acrylic.", ru: "Перетянутые винты трескают акрил.", kk: "Тым қатты бұралған бұрандалар акрилді жарады." },
    },
    {
      title: { en: "Centre and mount the sensor", ru: "Отцентруйте и закрепите датчик", kk: "Датчикті ортаға келтіріп бекітіңіз" },
      body: { en: "Set the servo to 90°, then fix the horn so the HC-SR04 faces straight ahead.", ru: "Выставьте серво на 90°, затем закрепите качалку так, чтобы HC-SR04 смотрел строго вперёд.", kk: "Сервоны 90°-қа қойып, HC-SR04 тура алға қарайтындай етіп иінтіректі бекітіңіз." },
      expect: { en: "At 90° the sensor points forward.", ru: "На 90° датчик направлен вперёд.", kk: "90°-та датчик алға бағытталған." },
      mistake: { en: "Fitting the horn before centring skews the scan.", ru: "Качалка, надетая до центровки, перекашивает сканирование.", kk: "Ортаға келтірмей кигізілген иінтірек сканерлеуді қисайтады." },
    },
    {
      title: { en: "Wire the motor driver", ru: "Подключите драйвер моторов", kk: "Мотор драйверін қосыңыз" },
      body: { en: "Remove the ENA/ENB jumpers. ENA→D5, IN1→D7, IN2→D8, IN3→D4, IN4→D2, ENB→D6. Battery + → L298N 12V and Arduino VIN; battery − → L298N GND. Join L298N GND to Arduino GND.", ru: "Снимите перемычки ENA/ENB. ENA→D5, IN1→D7, IN2→D8, IN3→D4, IN4→D2, ENB→D6. Плюс аккумулятора — на 12V драйвера и VIN Arduino, минус — на GND драйвера. Соедините GND драйвера с GND Arduino.", kk: "ENA/ENB секіргіштерін алыңыз. ENA→D5, IN1→D7, IN2→D8, IN3→D4, IN4→D2, ENB→D6. Аккумулятор плюсі — драйвердің 12V-ына және Arduino VIN-іне, минусы — драйвер GND-іне. L298N GND-ін Arduino GND-імен қосыңыз." },
      expect: { en: "Driver ready for PWM speed control.", ru: "Драйвер готов к ШИМ-управлению скоростью.", kk: "Драйвер ШИМ арқылы жылдамдықты басқаруға дайын." },
      mistake: { en: "Without a common ground the motors behave randomly.", ru: "Без общей земли моторы ведут себя хаотично.", kk: "Ортақ жерсіз моторлар ретсіз жұмыс істейді." },
    },
    {
      title: { en: "Wire the sensor and servo", ru: "Подключите датчик и серво", kk: "Датчик пен сервоны қосыңыз" },
      body: { en: "HC-SR04: TRIG→A0, ECHO→A1, VCC→5V, GND→GND. Servo signal→D3. The servo can draw ~650 mA, more than the Arduino 5V pin gives, so it gets its own supply: feed the LM2596 from the battery (IN+/IN−), turn its screw until OUT reads 5.0 V on a multimeter, then connect servo VCC→OUT+ and GND→OUT−.", ru: "HC-SR04: TRIG→A0, ECHO→A1, VCC→5V, GND→GND. Сигнал серво→D3. Серво потребляет до ~650 мА — больше, чем даёт пин 5V Arduino, поэтому у него своё питание: подайте на LM2596 аккумулятор (IN+/IN−), подстроечником выставьте на OUT 5,0 В по мультиметру, затем подключите VCC серво→OUT+, GND→OUT−.", kk: "HC-SR04: TRIG→A0, ECHO→A1, VCC→5V, GND→GND. Серво сигналы→D3. Серво ~650 мА-ге дейін тұтынады — бұл Arduino 5V пинінің беретінінен көп, сондықтан оның өз қуаты бар: LM2596-ға аккумуляторды қосыңыз (IN+/IN−), бұрағышпен OUT-та мультиметр бойынша 5,0 В қойыңыз, содан кейін серво VCC→OUT+, GND→OUT− қосыңыз." },
      expect: { en: "All signal wires connected; the LM2596 shows 5.0 V before the servo is plugged in.", ru: "Все сигнальные провода подключены; LM2596 выдаёт 5,0 В ещё до подключения серво.", kk: "Барлық сигнал сымдары қосылды; серво қосылмай тұрып LM2596 5,0 В береді." },
      mistake: { en: "Swapped TRIG/ECHO gives a constant 400 cm.", ru: "Перепутанные TRIG/ECHO дают постоянные 400 см.", kk: "TRIG/ECHO ауысып кетсе, үнемі 400 см көрсетеді." },
    },
    {
      title: { en: "Test with the wheels lifted", ru: "Проверка с поднятыми колёсами", kk: "Дөңгелектерді көтеріп тексеріңіз" },
      body: { en: "Put the robot on a box, power it and upload the sketch. Open the Serial Monitor at 9600 baud.", ru: "Поставьте робота на коробку, включите питание и загрузите скетч. Откройте Serial Monitor на 9600 бод.", kk: "Роботты қорапқа қойып, қуат беріп, скетчті жүктеңіз. Serial Monitor-ды 9600 бодта ашыңыз." },
      expect: { en: "Wheels spin forward and stop when your hand comes close.", ru: "Колёса крутятся вперёд и останавливаются у вашей руки.", kk: "Дөңгелектер алға айналып, қолыңыз жақындағанда тоқтайды." },
      mistake: { en: "A wheel spinning backwards just needs its motor wires swapped.", ru: "Колесо крутится назад — просто поменяйте местами провода мотора.", kk: "Дөңгелек кері айналса — мотор сымдарын ауыстырыңыз." },
    },
  ],
  code: [{
    filename: "obstacle_avoider.ino", language: "cpp", libraries: ["Servo (built in)"],
    source: `#include <Servo.h>

const int TRIG = A0, ECHO = A1, SERVO_PIN = 3;
const int ENA = 5, IN1 = 7, IN2 = 8, ENB = 6, IN3 = 4, IN4 = 2;
const int SPEED = 170;
const long STOP_CM = 25;
Servo scanner;

long readCm() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  unsigned long us = pulseIn(ECHO, HIGH, 30000UL);
  return us == 0 ? 400 : (long)(us / 58);
}

void drive(int l, int r) {
  digitalWrite(IN1, l > 0); digitalWrite(IN2, l < 0); analogWrite(ENA, abs(l));
  digitalWrite(IN3, r > 0); digitalWrite(IN4, r < 0); analogWrite(ENB, abs(r));
}

void setup() {
  Serial.begin(9600);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  int pins[] = {ENA, IN1, IN2, ENB, IN3, IN4};
  for (int p : pins) pinMode(p, OUTPUT);
  scanner.attach(SERVO_PIN); scanner.write(90);
  delay(1000);
}

void loop() {
  long d = readCm();
  if (d > STOP_CM) { drive(SPEED, SPEED); delay(60); return; }
  Serial.print("obstacle at "); Serial.println(d);
  drive(-SPEED, -SPEED); delay(300); drive(0, 0);
  scanner.write(160); delay(350); long left = readCm();
  scanner.write(20);  delay(350); long right = readCm();
  scanner.write(90);  delay(250);
  // Turn toward the side with more free space
  if (left > right) drive(-SPEED, SPEED); else drive(SPEED, -SPEED);
  delay(350); drive(0, 0);
}`,
  }],
  troubleshooting: [
    { symptom: { en: "Robot spins in circles", ru: "Робот крутится на месте", kk: "Робот бір орнында айналады" }, cause: { en: "One motor is wired backwards.", ru: "Один мотор подключён наоборот.", kk: "Бір мотор кері қосылған." }, fix: { en: "Swap that motor’s two wires at the L298N output.", ru: "Поменяйте местами два провода этого мотора на выходе L298N.", kk: "Сол мотордың екі сымын L298N шығысында ауыстырыңыз." } },
    { symptom: { en: "Board resets when the motors start", ru: "Плата перезагружается при старте моторов", kk: "Моторлар іске қосылғанда плата қайта жүктеледі" }, cause: { en: "Battery voltage sags under load.", ru: "Напряжение аккумулятора проседает под нагрузкой.", kk: "Жүктеме кезінде аккумулятор кернеуі төмендейді." }, fix: { en: "Charge the pack, make sure the servo runs from the LM2596 (not the Arduino 5V) and add a 470 µF capacitor across the servo supply.", ru: "Зарядите аккумулятор, убедитесь, что серво питается от LM2596 (а не от 5V Arduino), и добавьте конденсатор 470 мкФ на питание серво.", kk: "Аккумуляторды зарядтаңыз, серво LM2596-дан (Arduino 5V-тан емес) қуатталатынын тексеріңіз және серво қуатына 470 мкФ конденсатор қосыңыз." } },
    { symptom: { en: "Distance is always 400 cm", ru: "Расстояние всегда 400 см", kk: "Қашықтық үнемі 400 см" }, cause: { en: "TRIG/ECHO swapped or the sensor gets no 5 V.", ru: "Перепутаны TRIG/ECHO или на датчик не приходит 5 В.", kk: "TRIG/ECHO ауысқан немесе датчикке 5 В келмейді." }, fix: { en: "Check the two signal wires and the sensor VCC.", ru: "Проверьте два сигнальных провода и питание VCC датчика.", kk: "Екі сигнал сымын және датчиктің VCC қуатын тексеріңіз." } },
    { symptom: { en: "Motors don’t turn at all", ru: "Моторы вообще не крутятся", kk: "Моторлар мүлдем айналмайды" }, cause: { en: "ENA/ENB jumpers removed but the enable wires aren’t connected.", ru: "Перемычки ENA/ENB сняты, а провода включения не подключены.", kk: "ENA/ENB секіргіштері алынған, бірақ қосу сымдары жалғанбаған." }, fix: { en: "Connect ENA→D5 and ENB→D6 and check the common ground.", ru: "Подключите ENA→D5 и ENB→D6 и проверьте общую землю.", kk: "ENA→D5 және ENB→D6 қосып, ортақ жерді тексеріңіз." } },
  ],
  safety: [
    { en: "Insulate battery connections and never short its terminals.", ru: "Изолируйте соединения аккумулятора и никогда не замыкайте его выводы.", kk: "Аккумулятор қосылыстарын оқшаулаңыз және оның шықпаларын ешқашан тұйықтамаңыз." },
    { en: "Charge Li-ion cells only with a matching charger.", ru: "Заряжайте Li-ion только подходящим зарядным устройством.", kk: "Li-ion элементтерін тек сәйкес зарядтағышпен зарядтаңыз." },
  ],
  instances: [
    { id: "us", component: "hc-sr04" }, { id: "servo", component: "servo-sg90" }, { id: "drv", component: "l298n" },
    { id: "m1", component: "dc-motor", label: "M1" }, { id: "m2", component: "dc-motor", label: "M2" },
    { id: "bat", component: "battery-2s-lipo", label: "Battery 2S" }, { id: "buck", component: "buck-converter-lm2596" },
  ],
  connections: [
    { from: "board.A0", to: "us.TRIG", color: "yellow" },
    { from: "board.A1", to: "us.ECHO", color: "orange" },
    { from: "board.5V", to: "us.VCC", color: "red", note: { en: "sensor power", ru: "питание датчика", kk: "датчик қуаты" } },
    { from: "board.GND", to: "us.GND", color: "black" },
    { from: "board.D3", to: "servo.SIG", color: "purple" },
    { from: "buck.OUT+", to: "servo.VCC", color: "red", note: { en: "servo 5 V from the LM2596, not the Arduino", ru: "5 В для серво от LM2596, а не от Arduino", kk: "серво 5 В-ы LM2596-дан, Arduino-дан емес" } },
    { from: "buck.OUT-", to: "servo.GND", color: "brown" },
    { from: "board.D5", to: "drv.ENA", color: "cyan", note: { en: "PWM, left speed", ru: "ШИМ, скорость левого", kk: "ШИМ, сол жақ жылдамдығы" } },
    { from: "board.D7", to: "drv.IN1", color: "pink" },
    { from: "board.D8", to: "drv.IN2", color: "green" },
    { from: "board.D4", to: "drv.IN3", color: "brown" },
    { from: "board.D2", to: "drv.IN4", color: "gray" },
    { from: "board.D6", to: "drv.ENB", color: "blue", note: { en: "PWM, right speed", ru: "ШИМ, скорость правого", kk: "ШИМ, оң жақ жылдамдығы" } },
    { from: "drv.OUT1", to: "m1.+", color: "red", note: { en: "left motor", ru: "левый мотор", kk: "сол мотор" } }, { from: "drv.OUT2", to: "m1.-", color: "black" },
    { from: "drv.OUT3", to: "m2.+", color: "red", note: { en: "right motor", ru: "правый мотор", kk: "оң мотор" } }, { from: "drv.OUT4", to: "m2.-", color: "black" },
    { from: "bat.+", to: "drv.12V", color: "red", note: { en: "motor supply 7.4 V", ru: "питание моторов 7,4 В", kk: "мотор қуаты 7,4 В" } },
    { from: "bat.-", to: "drv.GND", color: "black" },
    { from: "bat.+", to: "board.VIN", color: "red", note: { en: "Arduino supply (VIN 7–12 V)", ru: "питание Arduino (VIN 7–12 В)", kk: "Arduino қуаты (VIN 7–12 В)" } },
    { from: "bat.+", to: "buck.IN+", color: "red", note: { en: "set OUT to 5.0 V before connecting the servo", ru: "выставьте OUT на 5,0 В до подключения серво", kk: "серво қоспас бұрын OUT-ты 5,0 В-қа қойыңыз" } },
    { from: "bat.-", to: "buck.IN-", color: "black" },
    { from: "drv.GND", to: "board.GND2", color: "black", note: { en: "common ground: Arduino, L298N, LM2596, battery −", ru: "общая земля: Arduino, L298N, LM2596, минус аккумулятора", kk: "ортақ жер: Arduino, L298N, LM2596, аккумулятор минусы" } },
  ],
  simulation: {
    baud: 9600,
    lines: ["ropros sim · Arduino Uno @ 16 MHz", "servo -> 90 deg", "dist 112 cm · drive fwd 170/170", "dist 64 cm · drive fwd 170/170", "dist 31 cm · drive fwd 170/170", "obstacle at 22", "reverse 300 ms", "scan L=148 cm R=37 cm", "turn LEFT 350 ms", "dist 140 cm · drive fwd 170/170", "OK · loop stable"],
    leds: [{ label: "PWR", color: "#7CB342" }, { label: "L", color: "#F57C00" }, { label: "TX", color: "#F2C200" }, { label: "ENA", color: "#00ACC1" }, { label: "ENB", color: "#3949AB" }],
  },
};

const LINE: Guide = {
  slug: "line-follower",
  title: { en: "PID Line Follower", ru: "Робот по линии с PID", kk: "PID сызық бойымен жүретін робот" },
  summary: {
    en: "Four TCRT5000 IR sensors read a black line and a PID loop on an Arduino Nano steers two DC motors smoothly along it.",
    ru: "Четыре ИК-датчика TCRT5000 видят чёрную линию, а PID-регулятор на Arduino Nano плавно ведёт по ней два мотора.",
    kk: "Төрт TCRT5000 ИҚ датчигі қара сызықты оқиды, ал Arduino Nano-дағы PID реттегіш екі моторды сызық бойымен бірқалыпты басқарады.",
  },
  board: "Arduino Nano", boardComponent: "arduino-nano", platform: "arduino", cover: "line", difficulty: "intermediate", hours: 4, costUsd: 29, xpReward: 200,
  verification: {
    en: "Pinout checked against the Nano, L298N and TCRT5000 module datasheets. PID gains are starting values: tune them on your track.",
    ru: "Распиновка сверена с даташитами Nano, L298N и модуля TCRT5000. Коэффициенты PID — стартовые, подберите их на своей трассе.",
    kk: "Пиндер Nano, L298N және TCRT5000 модулінің даташиттерімен тексерілді. PID коэффициенттері — бастапқы мәндер, оларды өз трассаңызда баптаңыз.",
  },
  parts: [
    { name: "Arduino Nano", component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V", ru: "ATmega328P, 5 В", kk: "ATmega328P, 5 В" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { name: "TCRT5000 IR sensor module", component: "tcrt5000", qty: 4, spec: { en: "analog out, 3–5 V", ru: "аналоговый выход, 3–5 В", kk: "аналогтық шығыс, 3–5 В" }, role: { en: "Line detection", ru: "Обнаружение линии", kk: "Сызықты анықтау" } },
    { name: "L298N motor driver", component: "l298n", qty: 1, spec: { en: "2 A per channel", ru: "2 А на канал", kk: "арнаға 2 А" }, role: { en: "Drives both motors", ru: "Управление моторами", kk: "Моторларды басқару" } },
    { name: "N20 / TT DC gear motor", component: "dc-motor", qty: 2, spec: { en: "6 V, 300 rpm", ru: "6 В, 300 об/мин", kk: "6 В, 300 айн/мин" }, role: { en: "Wheels", ru: "Колёса", kk: "Дөңгелектер" } },
    { name: "2WD chassis", component: "robot-chassis-2wd", qty: 1, spec: { en: "frame, wheels, ball caster", ru: "рама, колёса, шаровая опора", kk: "рама, дөңгелектер, шар тірек" }, role: { en: "Body", ru: "Корпус", kk: "Корпус" } },
    { name: "2× 18650 battery pack", component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V", ru: "7,4 В", kk: "7,4 В" }, role: { en: "Power", ru: "Питание", kk: "Қуат" } },
    { name: "Breadboard + jumper wires", component: "breadboard", qty: 1, spec: { en: "mini, M-F", ru: "мини, папа-мама", kk: "шағын, M-F" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { name: "Black electrical tape (19 mm)", qty: 1, spec: { en: "matte, on white floor", ru: "матовая, на белом полу", kk: "күңгірт, ақ еденде" }, role: { en: "Test track", ru: "Тестовая трасса", kk: "Сынақ трассасы" } },
  ],
  steps: [
    {
      title: { en: "Mount the sensor bar", ru: "Установите линейку датчиков", kk: "Датчик сызғышын орнатыңыз" },
      body: { en: "Fix the four TCRT5000 modules in a row at the front, 15 mm apart and 3–8 mm above the floor.", ru: "Закрепите четыре модуля TCRT5000 в ряд спереди с шагом 15 мм и на высоте 3–8 мм над полом.", kk: "Төрт TCRT5000 модулін алдыңғы жаққа 15 мм аралықпен, еденнен 3–8 мм биіктікте бір қатарға бекітіңіз." },
      expect: { en: "The two middle sensors sit either side of the tape.", ru: "Два средних датчика стоят по краям ленты.", kk: "Ортаңғы екі датчик лентаның екі жағында тұрады." },
      mistake: { en: "Too high and the sensors can’t tell black from white.", ru: "Слишком высоко — датчики не отличают чёрное от белого.", kk: "Тым биік болса, датчиктер қара мен ақты ажырата алмайды." },
    },
    {
      title: { en: "Wire the sensors", ru: "Подключите датчики", kk: "Датчиктерді қосыңыз" },
      body: { en: "Sensor A0 outputs (left to right) → A0, A1, A2, A3. All VCC to the 5V rail, all GND to the GND rail.", ru: "Аналоговые выходы датчиков (слева направо) → A0, A1, A2, A3. Все VCC на шину 5V, все GND на шину GND.", kk: "Датчиктердің аналогтық шығыстары (солдан оңға) → A0, A1, A2, A3. Барлық VCC 5V шинасына, барлық GND GND шинасына." },
      expect: { en: "Each module’s LED lights over white and goes dark over the tape.", ru: "Светодиод модуля горит над белым и гаснет над лентой.", kk: "Модуль жарықдиоды ақтың үстінде жанып, лента үстінде сөнеді." },
      mistake: { en: "Using the digital D0 pin loses the analog signal PID needs.", ru: "Цифровой выход D0 не даёт аналогового сигнала, нужного для PID.", kk: "Цифрлық D0 шығысы PID-ке қажет аналогтық сигнал бермейді." },
    },
    {
      title: { en: "Wire the motor driver", ru: "Подключите драйвер моторов", kk: "Мотор драйверін қосыңыз" },
      body: { en: "Remove ENA/ENB jumpers. ENA→D5, IN1→D7, IN2→D8, IN3→D9, IN4→D10, ENB→D6. Battery + to L298N 12V, battery − to L298N GND. Keep the 5V-EN jumper on and wire L298N 5V to the Nano 5V pin (not VIN); join L298N GND to Nano GND.", ru: "Снимите перемычки ENA/ENB. ENA→D5, IN1→D7, IN2→D8, IN3→D9, IN4→D10, ENB→D6. Плюс аккумулятора — на 12V драйвера, минус — на GND драйвера. Перемычку 5V-EN оставьте, выход 5V драйвера соедините с пином 5V Nano (не VIN), GND драйвера — с GND Nano.", kk: "ENA/ENB секіргіштерін алыңыз. ENA→D5, IN1→D7, IN2→D8, IN3→D9, IN4→D10, ENB→D6. Аккумулятор плюсі — драйвердің 12V-ына, минусы — драйвер GND-іне. 5V-EN секіргішін қалдырып, драйвердің 5V шығысын Nano-ның 5V пиніне (VIN емес) қосыңыз, драйвер GND-ін Nano GND-імен жалғаңыз." },
      expect: { en: "Nano power LED lights when the battery switch is on.", ru: "При включении аккумулятора загорается светодиод питания Nano.", kk: "Аккумулятор қосылғанда Nano қуат жарықдиоды жанады." },
      mistake: { en: "Feeding 7.4 V into the Nano’s 5V pin can destroy it.", ru: "7,4 В на пин 5V у Nano могут её сжечь.", kk: "Nano-ның 5V пиніне 7,4 В берсеңіз, ол күйіп кетуі мүмкін." },
    },
    {
      title: { en: "Calibrate", ru: "Откалибруйте", kk: "Калибрлеңіз" },
      body: { en: "Upload the sketch, then within the first 3 seconds slide the robot slowly across the line a few times.", ru: "Загрузите скетч и в первые 3 секунды несколько раз медленно проведите робота поперёк линии.", kk: "Скетчті жүктеп, алғашқы 3 секундта роботты сызықтың көлденеңінен бірнеше рет баяу өткізіңіз." },
      expect: { en: "Serial Monitor prints min/max for each sensor.", ru: "Serial Monitor выводит min/max для каждого датчика.", kk: "Serial Monitor әр датчик үшін min/max шығарады." },
      mistake: { en: "Calibrating under different light than the track skews readings.", ru: "Калибровка при другом освещении искажает показания.", kk: "Басқа жарықта калибрлеу көрсеткіштерді бұрмалайды." },
    },
    {
      title: { en: "Tune the PID", ru: "Настройте PID", kk: "PID-ті баптаңыз" },
      body: { en: "Start with Kd = 0 and raise Kp until the robot oscillates, then add Kd until it runs smoothly. Keep Ki small or zero.", ru: "Начните с Kd = 0 и повышайте Kp, пока робот не начнёт раскачиваться, затем добавляйте Kd до плавного хода. Ki держите малым или нулём.", kk: "Kd = 0-ден бастап, робот тербеле бастағанша Kp-ны көтеріңіз, содан кейін бірқалыпты жүргенше Kd қосыңыз. Ki-ді аз немесе нөл ұстаңыз." },
      expect: { en: "Robot follows curves without zig-zagging.", ru: "Робот проходит повороты без зигзагов.", kk: "Робот бұрылыстардан зигзагсыз өтеді." },
      mistake: { en: "Changing several gains at once makes tuning guesswork.", ru: "Если менять несколько коэффициентов сразу, настройка превращается в угадайку.", kk: "Бірнеше коэффициентті бірден өзгертсеңіз, баптау болжамға айналады." },
    },
  ],
  code: [{
    filename: "line_follower_pid.ino", language: "cpp", libraries: ["—"],
    source: `// 4-sensor PID line follower for Arduino Nano + L298N
const int SENSOR_PINS[4] = {A0, A1, A2, A3};   // left to right
const int ENA = 5, IN1 = 7, IN2 = 8, ENB = 6, IN3 = 9, IN4 = 10;
const int BASE = 150;
float Kp = 0.09, Ki = 0.0, Kd = 0.6;

int minV[4], maxV[4];
float integral = 0, lastErr = 0;

void drive(int l, int r) {
  l = constrain(l, -255, 255); r = constrain(r, -255, 255);
  digitalWrite(IN1, l > 0); digitalWrite(IN2, l < 0); analogWrite(ENA, abs(l));
  digitalWrite(IN3, r > 0); digitalWrite(IN4, r < 0); analogWrite(ENB, abs(r));
}

// Weighted position: -1500 (far left) .. +1500 (far right)
long readPosition() {
  long num = 0, den = 0;
  for (int i = 0; i < 4; i++) {
    int v = map(analogRead(SENSOR_PINS[i]), minV[i], maxV[i], 0, 1000);
    v = constrain(v, 0, 1000);
    num += (long)v * (i * 1000 - 1500);
    den += v;
  }
  return den < 200 ? (lastErr > 0 ? 1500 : -1500) : num / den;
}

void calibrate() {
  for (int i = 0; i < 4; i++) { minV[i] = 1023; maxV[i] = 0; }
  unsigned long t0 = millis();
  while (millis() - t0 < 3000) {
    for (int i = 0; i < 4; i++) {
      int v = analogRead(SENSOR_PINS[i]);
      minV[i] = min(minV[i], v); maxV[i] = max(maxV[i], v);
    }
  }
  for (int i = 0; i < 4; i++) {
    Serial.print("cal s"); Serial.print(i); Serial.print(" ");
    Serial.print(minV[i]); Serial.print(".."); Serial.println(maxV[i]);
  }
}

void setup() {
  Serial.begin(115200);
  int pins[] = {ENA, IN1, IN2, ENB, IN3, IN4};
  for (int p : pins) pinMode(p, OUTPUT);
  calibrate();
}

void loop() {
  float err = readPosition();
  integral = constrain(integral + err, -20000, 20000);
  float corr = Kp * err + Ki * integral + Kd * (err - lastErr);
  lastErr = err;
  drive(BASE + corr, BASE - corr);
}`,
  }],
  troubleshooting: [
    { symptom: { en: "Robot zig-zags wildly", ru: "Робот сильно виляет", kk: "Робот қатты бұлталақтайды" }, cause: { en: "Kp too high or Kd too low.", ru: "Kp слишком велик или Kd слишком мал.", kk: "Kp тым үлкен немесе Kd тым кіші." }, fix: { en: "Halve Kp, then raise Kd in small steps.", ru: "Уменьшите Kp вдвое, затем понемногу повышайте Kd.", kk: "Kp-ны екі есе азайтып, Kd-ны біртіндеп көтеріңіз." } },
    { symptom: { en: "Robot turns away from the line", ru: "Робот уходит от линии", kk: "Робот сызықтан алыстайды" }, cause: { en: "Sensor order or motor sides are reversed.", ru: "Перепутан порядок датчиков или стороны моторов.", kk: "Датчиктер реті немесе мотор жақтары ауысқан." }, fix: { en: "Swap the A0↔A3 and A1↔A2 wires, or swap the motor outputs.", ru: "Поменяйте провода A0↔A3 и A1↔A2 или выходы моторов.", kk: "A0↔A3 және A1↔A2 сымдарын немесе мотор шығыстарын ауыстырыңыз." } },
    { symptom: { en: "Loses the line on sharp curves", ru: "Теряет линию на крутых поворотах", kk: "Тік бұрылыстарда сызықты жоғалтады" }, cause: { en: "Base speed is too high for the track.", ru: "Базовая скорость слишком высока для трассы.", kk: "Негізгі жылдамдық трасса үшін тым жоғары." }, fix: { en: "Lower BASE to 110–130 and retune Kd.", ru: "Снизьте BASE до 110–130 и заново подберите Kd.", kk: "BASE-ті 110–130-ға түсіріп, Kd-ны қайта баптаңыз." } },
    { symptom: { en: "All sensors read the same value", ru: "Все датчики показывают одно и то же", kk: "Барлық датчик бірдей мән көрсетеді" }, cause: { en: "Sensors too high or calibration skipped.", ru: "Датчики слишком высоко или калибровка пропущена.", kk: "Датчиктер тым биік немесе калибрлеу өткізілмеген." }, fix: { en: "Lower the bar to 3–8 mm and redo calibration.", ru: "Опустите линейку до 3–8 мм и повторите калибровку.", kk: "Сызғышты 3–8 мм-ге түсіріп, калибрлеуді қайталаңыз." } },
  ],
  safety: [
    { en: "Insulate battery connections and never short its terminals.", ru: "Изолируйте соединения аккумулятора и никогда не замыкайте его выводы.", kk: "Аккумулятор қосылыстарын оқшаулаңыз және оның шықпаларын ешқашан тұйықтамаңыз." },
    { en: "Lift the wheels off the ground while uploading new code.", ru: "Поднимайте колёса над полом, когда загружаете новый код.", kk: "Жаңа код жүктегенде дөңгелектерді еденнен көтеріңіз." },
  ],
  instances: [
    { id: "ir1", component: "tcrt5000", label: "IR1" }, { id: "ir2", component: "tcrt5000", label: "IR2" },
    { id: "ir3", component: "tcrt5000", label: "IR3" }, { id: "ir4", component: "tcrt5000", label: "IR4" },
    { id: "drv", component: "l298n" },
    { id: "m1", component: "dc-motor", label: "M1" }, { id: "m2", component: "dc-motor", label: "M2" },
    { id: "bat", component: "battery-2s-lipo", label: "Battery 2S" },
  ],
  connections: [
    { from: "ir1.AO", to: "board.A0", color: "yellow", note: { en: "leftmost sensor", ru: "крайний левый датчик", kk: "ең сол жақ датчик" } },
    { from: "ir2.AO", to: "board.A1", color: "orange" },
    { from: "ir3.AO", to: "board.A2", color: "green" },
    { from: "ir4.AO", to: "board.A3", color: "cyan", note: { en: "rightmost sensor", ru: "крайний правый датчик", kk: "ең оң жақ датчик" } },
    { from: "ir1.VCC", to: "board.5V", color: "red" }, { from: "ir1.GND", to: "board.GND", color: "black" },
    { from: "ir2.VCC", to: "board.5V", color: "red" }, { from: "ir2.GND", to: "board.GND", color: "black" },
    { from: "ir3.VCC", to: "board.5V", color: "red" }, { from: "ir3.GND", to: "board.GND", color: "black" },
    { from: "ir4.VCC", to: "board.5V", color: "red" }, { from: "ir4.GND", to: "board.GND", color: "black" },
    { from: "board.D5", to: "drv.ENA", color: "pink", note: { en: "PWM", ru: "ШИМ", kk: "ШИМ" } },
    { from: "board.D6", to: "drv.ENB", color: "blue", note: { en: "PWM", ru: "ШИМ", kk: "ШИМ" } },
    { from: "board.D7", to: "drv.IN1", color: "purple" }, { from: "board.D8", to: "drv.IN2", color: "purple" },
    { from: "board.D9", to: "drv.IN3", color: "brown" }, { from: "board.D10", to: "drv.IN4", color: "brown" },
    { from: "drv.OUT1", to: "m1.+", color: "red", note: { en: "left motor", ru: "левый мотор", kk: "сол мотор" } }, { from: "drv.OUT2", to: "m1.-", color: "black" },
    { from: "drv.OUT3", to: "m2.+", color: "red", note: { en: "right motor", ru: "правый мотор", kk: "оң мотор" } }, { from: "drv.OUT4", to: "m2.-", color: "black" },
    { from: "bat.+", to: "drv.12V", color: "red", note: { en: "motor supply 7.4 V", ru: "питание моторов 7,4 В", kk: "мотор қуаты 7,4 В" } },
    { from: "bat.-", to: "drv.GND", color: "black" },
    { from: "drv.5V", to: "board.5V", color: "red", note: { en: "powers the Nano and sensors (5V-EN jumper on); battery off while USB is plugged in", ru: "питает Nano и датчики (перемычка 5V-EN на месте); при подключённом USB выключайте аккумулятор", kk: "Nano мен датчиктерді қуаттайды (5V-EN секіргіші орнында); USB қосулы кезде аккумуляторды өшіріңіз" } },
    { from: "drv.GND", to: "board.GND2", color: "black", note: { en: "common ground", ru: "общая земля", kk: "ортақ жер" } },
  ],
  simulation: {
    baud: 115200,
    lines: ["ropros sim · Arduino Nano @ 16 MHz", "cal s0 88..934", "cal s1 91..951", "cal s2 85..947", "cal s3 90..940", "pos -40 corr -26 L=124 R=176", "pos 310 corr 118 L=255 R=32", "pos 120 corr -74 L=76 R=224", "pos 15 corr -13 L=137 R=163", "pos 0 corr 0 L=150 R=150", "OK · lap 1 · 12.4 s"],
    leds: [{ label: "PWR", color: "#7CB342" }, { label: "IR1", color: "#F2C200" }, { label: "IR2", color: "#F57C00" }, { label: "IR3", color: "#7CB342" }, { label: "IR4", color: "#00ACC1" }],
  },
};

const PLANT: Guide = {
  slug: "iot-plant-care",
  title: { en: "IoT Plant Care Station", ru: "IoT-станция ухода за растением", kk: "Өсімдік күтімінің IoT станциясы" },
  summary: {
    en: "An ESP32 reads soil moisture, temperature and humidity, shows them on an OLED, waters the plant through a relay-driven pump and serves a live page on your Wi-Fi.",
    ru: "ESP32 измеряет влажность почвы, температуру и влажность воздуха, выводит их на OLED, поливает растение через насос на реле и показывает живую страницу в вашей Wi-Fi-сети.",
    kk: "ESP32 топырақ ылғалдылығын, температура мен ауа ылғалдылығын өлшеп, OLED-ке шығарады, реле арқылы сорғымен өсімдікті суарады және Wi-Fi желісінде тірі бет көрсетеді.",
  },
  board: "ESP32 DevKit V1", boardComponent: "esp32-devkit", platform: "esp32", cover: "plant", difficulty: "beginner", hours: 3, costUsd: 24, xpReward: 180,
  verification: {
    en: "Pins checked against the ESP32-WROOM-32, DHT22 and SSD1306 datasheets. Calibrate the soil sensor in your own pot.",
    ru: "Пины сверены с даташитами ESP32-WROOM-32, DHT22 и SSD1306. Датчик почвы откалибруйте в своём горшке.",
    kk: "Пиндер ESP32-WROOM-32, DHT22 және SSD1306 даташиттерімен тексерілді. Топырақ датчигін өз құмыраңызда калибрлеңіз.",
  },
  parts: [
    { name: "ESP32 DevKit V1", component: "esp32-devkit", qty: 1, spec: { en: "3.3 V logic, Wi-Fi", ru: "логика 3,3 В, Wi-Fi", kk: "3,3 В логика, Wi-Fi" }, role: { en: "Controller + web server", ru: "Контроллер и веб-сервер", kk: "Контроллер және веб-сервер" } },
    { name: "Capacitive soil moisture sensor v1.2", component: "soil-moisture-capacitive", qty: 1, spec: { en: "3.3–5 V, analog", ru: "3,3–5 В, аналоговый", kk: "3,3–5 В, аналогтық" }, role: { en: "Soil moisture", ru: "Влажность почвы", kk: "Топырақ ылғалдылығы" } },
    { name: "DHT22 (AM2302)", component: "dht22", qty: 1, spec: { en: "3.3 V, ±0.5 °C", ru: "3,3 В, ±0,5 °C", kk: "3,3 В, ±0,5 °C" }, role: { en: "Air temperature + humidity", ru: "Температура и влажность воздуха", kk: "Ауа температурасы мен ылғалдылығы" } },
    { name: "SSD1306 OLED 0.96″ I²C", component: "oled-ssd1306", qty: 1, spec: { en: "128×64, 3.3 V", ru: "128×64, 3,3 В", kk: "128×64, 3,3 В" }, role: { en: "Local display", ru: "Локальный дисплей", kk: "Жергілікті дисплей" } },
    { name: "1-channel 5 V relay module", component: "relay-module", qty: 1, spec: { en: "opto-isolated, 3.3 V trigger", ru: "с оптронной развязкой, управление 3,3 В", kk: "оптронды, 3,3 В басқару" }, role: { en: "Switches the pump", ru: "Включает насос", kk: "Сорғыны қосады" } },
    { name: "5 V submersible pump + tubing", component: "water-pump", qty: 1, spec: { en: "≈ 120 l/h", ru: "≈ 120 л/ч", kk: "≈ 120 л/сағ" }, role: { en: "Watering", ru: "Полив", kk: "Суару" } },
    { name: "10 kΩ resistor", component: "resistor", qty: 1, spec: same("1/4 W"), role: { en: "DHT22 data pull-up", ru: "Подтяжка линии DHT22", kk: "DHT22 деректер желісін тарту" } },
    { name: "5 V 2 A USB supply", component: "usb-5v", qty: 1, spec: { en: "USB-C or micro-USB", ru: "USB-C или micro-USB", kk: "USB-C немесе micro-USB" }, role: { en: "Power", ru: "Питание", kk: "Қуат" } },
    { name: "Breadboard + jumper wires", component: "breadboard", qty: 1, spec: { en: "full size", ru: "полноразмерная", kk: "толық өлшемді" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  steps: [
    {
      title: { en: "Place the ESP32 and rails", ru: "Установите ESP32 и шины", kk: "ESP32 мен шиналарды орнатыңыз" },
      body: { en: "Straddle the ESP32 across the breadboard centre. Run 3V3 to one + rail and VIN (5 V from USB) to the other; join both GND rails.", ru: "Поставьте ESP32 поперёк центральной канавки макетки. 3V3 — на одну шину +, VIN (5 В от USB) — на другую; соедините обе шины GND.", kk: "ESP32-ні макет тақтасының ортаңғы ойығына көлденең қойыңыз. 3V3 — бір + шинаға, VIN (USB-ден 5 В) — екіншісіне; екі GND шинасын қосыңыз." },
      expect: { en: "3.3 V and 5 V rails measure correctly with a multimeter.", ru: "Мультиметр показывает 3,3 В и 5 В на своих шинах.", kk: "Мультиметр шиналарда 3,3 В және 5 В көрсетеді." },
      mistake: { en: "Mixing up the rails puts 5 V on 3.3 V sensors.", ru: "Перепутанные шины подают 5 В на датчики 3,3 В.", kk: "Шиналар ауысса, 3,3 В датчиктерге 5 В беріледі." },
    },
    {
      title: { en: "Connect the sensors", ru: "Подключите датчики", kk: "Датчиктерді қосыңыз" },
      body: { en: "Soil AOUT→GPIO34, VCC→3V3. DHT22 DATA→GPIO4 with a 10 kΩ pull-up to 3V3. OLED SDA→GPIO21, SCL→GPIO22, VCC→3V3.", ru: "Почва: AOUT→GPIO34, VCC→3V3. DHT22: DATA→GPIO4 с подтяжкой 10 кОм к 3V3. OLED: SDA→GPIO21, SCL→GPIO22, VCC→3V3.", kk: "Топырақ: AOUT→GPIO34, VCC→3V3. DHT22: DATA→GPIO4, 3V3-ке 10 кОм тартумен. OLED: SDA→GPIO21, SCL→GPIO22, VCC→3V3." },
      expect: { en: "An I²C scan finds the OLED at 0x3C.", ru: "I²C-сканер находит OLED по адресу 0x3C.", kk: "I²C сканері OLED-ті 0x3C мекенжайынан табады." },
      mistake: { en: "ADC2 pins stop working when Wi-Fi is on: use GPIO32–39 for analog.", ru: "Пины ADC2 не работают при включённом Wi-Fi — для аналога берите GPIO32–39.", kk: "Wi-Fi қосулы кезде ADC2 пиндері жұмыс істемейді — аналог үшін GPIO32–39 алыңыз." },
    },
    {
      title: { en: "Wire the relay and pump", ru: "Подключите реле и насос", kk: "Реле мен сорғыны қосыңыз" },
      body: { en: "Relay IN→GPIO26, VCC→5V rail, GND→GND. Pump + goes through relay COM/NO to 5V; pump − to GND.", ru: "Реле: IN→GPIO26, VCC→шина 5V, GND→GND. Плюс насоса идёт через COM/NO реле на 5V, минус насоса — на GND.", kk: "Реле: IN→GPIO26, VCC→5V шинасы, GND→GND. Сорғы плюсі реленің COM/NO арқылы 5V-қа, минусы GND-ге." },
      expect: { en: "The relay clicks when GPIO26 goes HIGH.", ru: "Реле щёлкает, когда GPIO26 переходит в HIGH.", kk: "GPIO26 HIGH болғанда реле шертеді." },
      mistake: { en: "Powering the pump from the 3V3 pin browns out the ESP32.", ru: "Насос от пина 3V3 вызывает просадку и перезагрузку ESP32.", kk: "Сорғыны 3V3 пинінен қуаттау ESP32-ні қайта жүктейді." },
    },
    {
      title: { en: "Calibrate the soil sensor", ru: "Откалибруйте датчик почвы", kk: "Топырақ датчигін калибрлеңіз" },
      body: { en: "Read the raw value in air (DRY_RAW) and in a glass of water (WET_RAW), then put both numbers into the sketch.", ru: "Снимите сырое значение на воздухе (DRY_RAW) и в стакане воды (WET_RAW) и впишите оба числа в скетч.", kk: "Ауадағы (DRY_RAW) және су стақанындағы (WET_RAW) шикі мәнді алып, екеуін скетчке жазыңыз." },
      expect: { en: "Moisture reads ≈0 % in air and ≈100 % in water.", ru: "Влажность ≈0 % на воздухе и ≈100 % в воде.", kk: "Ылғалдылық ауада ≈0 %, суда ≈100 %." },
      mistake: { en: "Submerging the sensor past the line damages its electronics.", ru: "Погружение датчика выше отметки повреждает электронику.", kk: "Датчикті белгіден жоғары батыру электрониканы бүлдіреді." },
    },
    {
      title: { en: "Upload and connect to Wi-Fi", ru: "Загрузите скетч и подключитесь к Wi-Fi", kk: "Скетчті жүктеп, Wi-Fi-ға қосылыңыз" },
      body: { en: "Set WIFI_SSID and WIFI_PASS, upload, then open the IP address from the Serial Monitor in a browser on the same network.", ru: "Укажите WIFI_SSID и WIFI_PASS, загрузите скетч и откройте в браузере IP-адрес из Serial Monitor (в той же сети).", kk: "WIFI_SSID пен WIFI_PASS орнатып, скетчті жүктеңіз де, Serial Monitor-дағы IP мекенжайын сол желідегі браузерде ашыңыз." },
      expect: { en: "The page shows live moisture, temperature and pump state.", ru: "Страница показывает текущую влажность, температуру и состояние насоса.", kk: "Бетте ағымдағы ылғалдылық, температура және сорғы күйі көрсетіледі." },
      mistake: { en: "Don’t commit your Wi-Fi password: keep it in a local secrets.h.", ru: "Не коммитьте пароль Wi-Fi — держите его в локальном secrets.h.", kk: "Wi-Fi құпиясөзін коммиттемеңіз — оны жергілікті secrets.h-та сақтаңыз." },
    },
  ],
  code: [
    {
      filename: "plant_care.ino", language: "cpp", libraries: ["DHT sensor library (Adafruit)", "Adafruit SSD1306", "Adafruit GFX", "WiFi + WebServer (ESP32 core)"],
      source: `#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>
#include "secrets.h"   // defines WIFI_SSID and WIFI_PASS (keep out of git)

const int SOIL_PIN = 34, DHT_PIN = 4, RELAY_PIN = 26;
const int DRY_RAW = 3200, WET_RAW = 1350;   // calibrate in your pot
const int WATER_BELOW = 35;                 // % moisture
const unsigned long PUMP_MS = 3000, COOLDOWN_MS = 10UL * 60UL * 1000UL;

DHT dht(DHT_PIN, DHT22);
Adafruit_SSD1306 oled(128, 64, &Wire, -1);
WebServer server(80);

int moisture = 0; float tempC = NAN, hum = NAN;
bool pumping = false; unsigned long pumpStart = 0, lastWater = 0;

int readMoisture() {
  int raw = analogRead(SOIL_PIN);
  return constrain(map(raw, DRY_RAW, WET_RAW, 0, 100), 0, 100);
}

void drawOled() {
  oled.clearDisplay(); oled.setTextColor(SSD1306_WHITE);
  oled.setTextSize(2); oled.setCursor(0, 0);  oled.printf("%d%%", moisture);
  oled.setTextSize(1); oled.setCursor(0, 24); oled.printf("%.1f C  %.0f%% RH", tempC, hum);
  oled.setCursor(0, 40); oled.print(pumping ? "pump: ON" : "pump: off");
  oled.setCursor(0, 54); oled.print(WiFi.localIP());
  oled.display();
}

void handleRoot() {
  String json = "{\\"moisture\\":" + String(moisture) + ",\\"tempC\\":" + String(tempC, 1) +
                ",\\"humidity\\":" + String(hum, 0) + ",\\"pump\\":" + (pumping ? "true" : "false") + "}";
  server.send(200, "application/json", json);
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT); digitalWrite(RELAY_PIN, LOW);
  dht.begin();
  oled.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) { delay(300); Serial.print("."); }
  Serial.printf("\\nIP %s\\n", WiFi.localIP().toString().c_str());
  server.on("/", handleRoot); server.begin();
}

void loop() {
  server.handleClient();
  static unsigned long lastRead = 0;
  if (millis() - lastRead > 2000) {
    lastRead = millis();
    moisture = readMoisture(); tempC = dht.readTemperature(); hum = dht.readHumidity();
    Serial.printf("soil %d%% · %.1f C · %.0f%% RH\\n", moisture, tempC, hum);
    // Water only when dry and the cooldown has passed (lets water soak in)
    if (!pumping && moisture < WATER_BELOW && millis() - lastWater > COOLDOWN_MS) {
      pumping = true; pumpStart = millis(); digitalWrite(RELAY_PIN, HIGH);
    }
    drawOled();
  }
  if (pumping && millis() - pumpStart > PUMP_MS) {
    pumping = false; lastWater = millis(); digitalWrite(RELAY_PIN, LOW);
  }
}`,
    },
    {
      filename: "secrets.h", language: "cpp", libraries: [],
      source: `// Copy to secrets.h and add secrets.h to .gitignore
#pragma once
#define WIFI_SSID "your-network"
#define WIFI_PASS "your-password"`,
    },
  ],
  troubleshooting: [
    { symptom: { en: "Moisture stuck at 0 % or 100 %", ru: "Влажность застряла на 0 % или 100 %", kk: "Ылғалдылық 0 % немесе 100 %-да тұрып қалды" }, cause: { en: "DRY_RAW/WET_RAW don’t match your sensor, or it’s on an ADC2 pin.", ru: "DRY_RAW/WET_RAW не подходят вашему датчику или он на пине ADC2.", kk: "DRY_RAW/WET_RAW датчигіңізге сәйкес емес немесе ол ADC2 пинінде." }, fix: { en: "Recalibrate and keep AOUT on GPIO34.", ru: "Откалибруйте заново и оставьте AOUT на GPIO34.", kk: "Қайта калибрлеп, AOUT-ты GPIO34-те қалдырыңыз." } },
    { symptom: { en: "DHT22 returns nan", ru: "DHT22 возвращает nan", kk: "DHT22 nan қайтарады" }, cause: { en: "Missing pull-up or reading faster than every 2 s.", ru: "Нет подтяжки или опрос чаще раза в 2 с.", kk: "Тарту резисторы жоқ немесе 2 с-тан жиі оқылады." }, fix: { en: "Add the 10 kΩ resistor DATA→3V3 and keep the 2 s interval.", ru: "Поставьте резистор 10 кОм DATA→3V3 и оставьте интервал 2 с.", kk: "DATA→3V3 10 кОм резисторын қойып, 2 с аралықты сақтаңыз." } },
    { symptom: { en: "ESP32 reboots when the pump starts", ru: "ESP32 перезагружается при старте насоса", kk: "Сорғы қосылғанда ESP32 қайта жүктеледі" }, cause: { en: "The pump’s inrush current sags the supply.", ru: "Пусковой ток насоса просаживает питание.", kk: "Сорғының іске қосу тогы қуатты төмендетеді." }, fix: { en: "Use a 2 A supply and add a 470 µF capacitor across the pump.", ru: "Используйте блок на 2 А и поставьте конденсатор 470 мкФ параллельно насосу.", kk: "2 А қуат блогын қолданып, сорғыға параллель 470 мкФ конденсатор қойыңыз." } },
    { symptom: { en: "OLED stays blank", ru: "OLED не включается", kk: "OLED бос тұр" }, cause: { en: "Wrong I²C address or SDA/SCL swapped.", ru: "Неверный адрес I²C или перепутаны SDA/SCL.", kk: "I²C мекенжайы қате немесе SDA/SCL ауысқан." }, fix: { en: "Run an I²C scanner; try 0x3D; check SDA→21, SCL→22.", ru: "Запустите I²C-сканер, попробуйте 0x3D, проверьте SDA→21, SCL→22.", kk: "I²C сканерін іске қосып, 0x3D-ні байқаңыз, SDA→21, SCL→22 тексеріңіз." } },
  ],
  safety: [
    { en: "Keep water and the pump away from the ESP32 and the USB supply; mount electronics above the pot.", ru: "Держите воду и насос подальше от ESP32 и блока питания; электронику размещайте выше горшка.", kk: "Су мен сорғыны ESP32 мен қуат блогынан алыс ұстаңыз; электрониканы құмырадан жоғары орнатыңыз." },
    { en: "Use only low-voltage (5 V) pumps with this relay setup; never switch mains.", ru: "С этой схемой используйте только низковольтные (5 В) насосы; никогда не коммутируйте сеть 220 В.", kk: "Бұл схемада тек төмен кернеулі (5 В) сорғыларды қолданыңыз; 220 В желіні ешқашан коммутацияламаңыз." },
  ],
  instances: [
    { id: "soil", component: "soil-moisture-capacitive", label: "Soil sensor" }, { id: "dht", component: "dht22" },
    { id: "r1", component: "resistor", label: "10 kΩ" }, { id: "oled", component: "oled-ssd1306" },
    { id: "relay", component: "relay-module", label: "Relay" }, { id: "pump", component: "water-pump", label: "Pump" },
  ],
  connections: [
    { from: "soil.AOUT", to: "board.GPIO34", color: "cyan", note: { en: "ADC1 (works with Wi-Fi)", ru: "ADC1 (работает с Wi-Fi)", kk: "ADC1 (Wi-Fi-мен жұмыс істейді)" } },
    { from: "soil.VCC", to: "board.3V3", color: "orange" }, { from: "soil.GND", to: "board.GND", color: "black" },
    { from: "dht.DATA", to: "board.GPIO4", color: "yellow" },
    { from: "dht.VCC", to: "board.3V3", color: "orange" }, { from: "dht.GND", to: "board.GND", color: "black" },
    { from: "r1.A", to: "dht.DATA", color: "yellow", note: { en: "10 kΩ pull-up to 3V3", ru: "подтяжка 10 кОм к 3V3", kk: "3V3-ке 10 кОм тарту" } },
    { from: "r1.B", to: "board.3V3", color: "orange" },
    { from: "oled.SDA", to: "board.GPIO21", color: "blue", note: { en: "I²C data", ru: "данные I²C", kk: "I²C деректері" } },
    { from: "oled.SCL", to: "board.GPIO22", color: "green", note: { en: "I²C clock", ru: "тактирование I²C", kk: "I²C тактісі" } },
    { from: "oled.VCC", to: "board.3V3", color: "orange" }, { from: "oled.GND", to: "board.GND2", color: "black" },
    { from: "relay.IN", to: "board.GPIO26", color: "purple" },
    { from: "relay.VCC", to: "board.5V", color: "red", note: { en: "5 V from USB", ru: "5 В от USB", kk: "USB-ден 5 В" } },
    { from: "relay.GND", to: "board.GND3", color: "black" },
    { from: "board.5V", to: "relay.COM", color: "red", note: { en: "pump supply, switched by the relay", ru: "питание насоса через контакт реле", kk: "сорғы қуаты реле арқылы" } },
    { from: "relay.NO", to: "pump.+", color: "red" },
    { from: "pump.-", to: "board.GND", color: "black" },
  ],
  simulation: {
    baud: 115200,
    lines: ["ropros sim · ESP32-WROOM-32 @ 240 MHz", "wifi connecting.....", "IP 192.168.1.42", "http server on :80", "soil 58% · 23.4 C · 41% RH", "soil 47% · 23.5 C · 41% RH", "soil 33% · 23.5 C · 40% RH", "pump ON (3000 ms)", "pump off · cooldown 10 min", "soil 61% · 23.6 C · 42% RH", "OK · GET / 200"],
    leds: [{ label: "PWR", color: "#E53935" }, { label: "WiFi", color: "#00ACC1" }, { label: "IO2", color: "#3949AB" }, { label: "RELAY", color: "#7CB342" }],
  },
};

const UNVERIFIED: L = {
  en: "Wiring checked by the automatic circuit checker against the ropros hardware registry (datasheet pinouts). Not yet bench-tested on real hardware.",
  ru: "Проводка проверена автоматической проверкой схемы по реестру компонентов ropros (распиновки из даташитов). На реальном железе ещё не тестировалась.",
  kk: "Сымдар ropros компоненттер тізілімі (даташит распиновкалары) бойынша автоматты схема тексерісімен тексерілді. Нақты құрылғыда әлі тексерілмеген.",
};
const VERIFIED: L = {
  en: "Wiring checked by the automatic circuit checker and verified by a person on real hardware.",
  ru: "Проводка проверена автоматической проверкой схемы и человеком на реальном железе.",
  kk: "Сымдарды автоматты схема тексерісі және адам нақты құрылғыда тексерді.",
};

/** Cover art per category; robotics rotates through the robot covers so the hub doesn't repeat one image. */
const COVERS: Record<GuideContent["category"], readonly CoverId[]> = {
  robotics: ["obstacle", "line", "arm", "walker", "balance", "mecanum"], vehicles: ["mecanum", "camera", "obstacle"],
  iot: ["plant", "logger"], home: ["plant", "logger"], energy: ["logger", "plant"], tools: ["logger", "radar"],
  sensors: ["radar", "logger"], security: ["camera", "radar"], displays: ["matrix"], games: ["matrix", "radar"],
  audio: ["matrix", "radar"], wearables: ["matrix"],
};
const hash = (s: string) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
export const coverFor = (c: Pick<GuideContent, "slug" | "category">): CoverId => {
  const list = COVERS[c.category];
  return list[hash(c.slug) % list.length] ?? "obstacle";
};

/** A content file (content/guides/<slug>.ts, validated by GuideSchema) as a Guide. Part and board names come from the registry. */
export function fromContent(c: GuideContent): Guide {
  return {
    slug: c.slug, title: c.title, summary: c.summary, board: getComponent(c.board).name, boardComponent: c.board, platform: c.platform,
    cover: coverFor(c), difficulty: c.difficulty, hours: c.hours, costUsd: c.costUsd, xpReward: c.xpReward,
    verification: c.status === "verified" ? VERIFIED : UNVERIFIED,
    parts: c.parts.map((p) => ({ name: getComponent(p.component).name, component: p.component, qty: p.qty, spec: p.spec, role: p.role, ...(p.optional ? { optional: true } : {}) })),
    steps: c.steps, code: c.code, troubleshooting: c.troubleshooting, safety: c.safety,
    instances: c.instances, connections: c.connections, simulation: c.simulation,
  };
}

const GUIDES: Guide[] = [OBSTACLE, LINE, PLANT, ...CONTENT_GUIDES.map(fromContent)];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function allGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}

/** A guide with every human-language field resolved to one locale: plain strings, safe to pass to client components. */
export type LocalizedGuide = {
  slug: string; title: string; summary: string; board: string; platform: Platform; cover: CoverId;
  difficulty: Difficulty; hours: number; costUsd: number; xpReward: number; verification: string;
  parts: { name: string; qty: number; spec: string; role: string; optional: boolean }[];
  steps: { title: string; body: string; expect: string; mistake: string }[];
  code: CodeFile[];
  troubleshooting: { symptom: string; cause: string; fix: string }[];
  safety: string[];
  /** Wire legend built from the checked connections: part names and pins untranslated, notes localized. */
  wiring: { color: WireColor; from: string; to: string; note?: string }[];
  simulation: Simulation;
};

/** The circuit-checker / layout input for a guide. Parts without a registry id (consumables) are left out. */
export function guideCircuit(g: Guide): CheckInput {
  return {
    board: g.boardComponent, platform: g.platform, instances: g.instances, connections: g.connections, code: g.code,
    parts: g.parts.flatMap((p) => (p.component ? [{ component: p.component, qty: p.qty, spec: p.spec, role: p.role, ...(p.optional ? { optional: true } : {}) }] : [])),
  };
}

/** "drv.ENA" → "L298N ENA", "board.D5" → "Arduino Uno D5": instance label, else the first word of the registry name. */
export function endpointName(g: Guide, end: string): string {
  const dot = end.indexOf(".");
  const inst = end.slice(0, dot);
  const pin = end.slice(dot + 1);
  if (inst === "board") return `${g.board} ${pin}`;
  const i = g.instances.find((x) => x.id === inst);
  const name = i?.label ?? (i ? getComponent(i.component).name.split(" ")[0] : inst);
  return `${name} ${pin}`;
}

export function localizeGuide(g: Guide, locale: Locale): LocalizedGuide {
  return {
    slug: g.slug, title: g.title[locale], summary: g.summary[locale], board: g.board, platform: g.platform, cover: g.cover,
    difficulty: g.difficulty, hours: g.hours, costUsd: g.costUsd, xpReward: g.xpReward, verification: g.verification[locale],
    parts: g.parts.map((p) => ({ name: p.name, qty: p.qty, spec: p.spec[locale], role: p.role[locale], optional: !!p.optional })),
    steps: g.steps.map((s) => ({ title: s.title[locale], body: s.body[locale], expect: s.expect[locale], mistake: s.mistake[locale] })),
    code: g.code,
    troubleshooting: g.troubleshooting.map((t) => ({ symptom: t.symptom[locale], cause: t.cause[locale], fix: t.fix[locale] })),
    safety: g.safety.map((s) => s[locale]),
    wiring: g.connections.map((c) => ({ color: c.color, from: endpointName(g, c.from), to: endpointName(g, c.to), ...(c.note ? { note: c.note[locale] } : {}) })),
    simulation: g.simulation,
  };
}
