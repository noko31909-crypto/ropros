import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pan-tilt-joystick",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "robotics",
  robotics: true,
  difficulty: "intermediate",
  hours: 2,
  costUsd: 14,
  xpReward: 200,
  title: {
    en: "Joystick Pan-Tilt Head",
    ru: "Поворотная платформа с джойстиком",
    kk: "Джойстикпен басқарылатын бұрылмалы платформа",
  },
  summary: {
    en: "A thumb joystick steers a two-servo pan-tilt head like a camera operator: push to move, let go and it holds. Click the stick to centre both axes. The servos run from their own 5 V supply.",
    ru: "Джойстик управляет поворотной платформой на двух серво, как оператор камерой: отклонили — едет, отпустили — держит положение. Нажатие на стик центрирует обе оси. Серво питаются от отдельных 5 В.",
    kk: "Джойстик екі сервоға негізделген бұрылмалы платформаны камера операторы сияқты басқарады: ауытқытсаңыз — қозғалады, жіберсеңіз — орнында тұрады. Стикті басу екі осьті де ортаға қояды. Серволар бөлек 5 В қоректен жұмыс істейді.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "joystick", qty: 1, spec: { en: "KY-023, two pots + push switch", ru: "KY-023, два потенциометра + кнопка", kk: "KY-023, екі потенциометр + батырма" }, role: { en: "Steering stick", ru: "Ручка управления", kk: "Басқару тұтқасы" } },
    { component: "servo-sg90", qty: 2, spec: { en: "4.8–6 V, in an SG90 pan-tilt bracket", ru: "4,8–6 В, в кронштейне pan-tilt для SG90", kk: "4,8–6 В, SG90 pan-tilt кронштейнінде" }, role: { en: "Pan and tilt axes", ru: "Оси поворота и наклона", kk: "Бұрылу және еңкею осьтері" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V 2 A USB charger + USB breakout", ru: "USB-зарядка 5 В 2 А + USB-переходник на пины", kk: "5 В 2 А USB зарядтағыш + USB-пин адаптері" }, role: { en: "Servo power", ru: "Питание серво", kk: "Серво қорегі" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 14, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "joy", component: "joystick", label: "KY-023" },
    { id: "s_pan", component: "servo-sg90", label: "Pan (bottom)" },
    { id: "s_tilt", component: "servo-sg90", label: "Tilt (top)" },
    { id: "psu", component: "usb-5v", label: "Servo 5 V" },
  ],
  connections: [
    { from: "board.5V", to: "joy.+5V", color: "red" },
    { from: "joy.GND", to: "board.GND", color: "black" },
    { from: "joy.VRx", to: "board.A0", color: "yellow" },
    { from: "joy.VRy", to: "board.A1", color: "green" },
    { from: "joy.SW", to: "board.D2", color: "blue", note: { en: "switch to GND, internal pull-up", ru: "кнопка на GND, внутренняя подтяжка", kk: "батырма GND-ге, ішкі тарту" } },
    { from: "psu.5V", to: "s_pan.VCC", color: "red" },
    { from: "s_pan.VCC", to: "s_tilt.VCC", color: "red" },
    { from: "psu.GND", to: "s_pan.GND", color: "brown" },
    { from: "s_pan.GND", to: "s_tilt.GND", color: "brown" },
    { from: "s_tilt.GND", to: "board.GND2", color: "black", note: { en: "shared ground with the Arduino", ru: "общая земля с Arduino", kk: "Arduino-мен ортақ жер" } },
    { from: "board.D9", to: "s_pan.SIG", color: "orange" },
    { from: "board.D10", to: "s_tilt.SIG", color: "orange" },
  ],
  steps: [
    {
      title: { en: "Centre the servos before assembly", ru: "Отцентрируйте серво до сборки", kk: "Құрастырмас бұрын сервоны ортаға қойыңыз" },
      body: {
        en: "Wire everything first (steps 2–3) and upload the sketch: both servos go to 90°. Only then press the servo horns onto the pan-tilt bracket so that 90° means \"looking straight ahead\" and \"level\". This way neither servo hits the bracket at the end of its travel.",
        ru: "Сначала соберите схему (шаги 2–3) и загрузите скетч: оба серво встанут на 90°. Только после этого насадите качалки на кронштейн pan-tilt так, чтобы 90° означало «смотрит прямо» и «горизонтально». Тогда ни одно серво не упрётся в кронштейн в конце хода.",
        kk: "Алдымен схеманы құрастырып (2–3 қадамдар), скетчті жүктеңіз: екі серво да 90°-қа барады. Тек содан кейін 90° «тура қарайды» және «көлденең» дегенді білдіретіндей етіп иіндерді pan-tilt кронштейніне кигізіңіз. Сонда ешбір серво жүріс соңында кронштейнге тірелмейді.",
      },
      expect: { en: "Assembled head points straight ahead and level after reset.", ru: "Собранная платформа после сброса смотрит прямо и горизонтально.", kk: "Құрастырылған платформа қайта жүктелгеннен кейін тура әрі көлденең қарайды." },
      mistake: { en: "Fitting the horns at a random angle: the tilt servo jams against the bracket and buzzes.", ru: "Если надеть качалки под случайным углом, серво наклона упрётся в кронштейн и будет жужжать.", kk: "Иіндерді кездейсоқ бұрышпен кигізсеңіз, еңкею сервосы кронштейнге тіреліп, ызыңдайды." },
    },
    {
      title: { en: "Wire the joystick", ru: "Подключите джойстик", kk: "Джойстикті қосыңыз" },
      body: {
        en: "KY-023 pins: GND to GND, +5V to 5V, VRx to A0, VRy to A1, SW to D2. The stick's button pulls SW to GND when you press down on it; the sketch enables the internal pull-up.",
        ru: "Выводы KY-023: GND на GND, +5V на 5V, VRx на A0, VRy на A1, SW на D2. При нажатии на стик кнопка замыкает SW на GND; скетч включает внутреннюю подтяжку.",
        kk: "KY-023 пиндері: GND-ді GND-ге, +5V-ты 5V-қа, VRx-ті A0-ге, VRy-ді A1-ге, SW-ді D2-ге қосыңыз. Стикті басқанда батырма SW-ді GND-мен тұйықтайды; скетч ішкі тартуды қосады.",
      },
      expect: { en: "At rest the Serial Monitor reports a centre near x=512 y=512.", ru: "В покое Serial Monitor показывает центр около x=512 y=512.", kk: "Тыныш күйде Serial Monitor орталықты шамамен x=512 y=512 деп көрсетеді." },
      mistake: { en: "Powering the joystick from 3.3 V while reading it as if it were 5 V: the centre ends up near 340 and one direction is far too fast.", ru: "Если запитать джойстик от 3,3 В, а читать как 5 В, центр окажется около 340, и одно направление станет слишком быстрым.", kk: "Джойстикті 3,3 В-тан қоректендіріп, 5 В сияқты оқысаңыз, орталық шамамен 340-та болады да, бір бағыт тым жылдам болады." },
    },
    {
      title: { en: "Power the servos separately", ru: "Запитайте серво отдельно", kk: "Сервоны бөлек қоректендіріңіз" },
      body: {
        en: "Bring the USB charger's 5 V and GND to a breadboard rail pair. Plug both servos' red wires into + and brown wires into −, then add one wire from that − rail to an Arduino GND. Signal wires: pan (bottom servo) to D9, tilt (top servo) to D10. Two SG90s can pull more than 1 A together when they start, which is too much for the Uno's 5V pin.",
        ru: "Выведите 5 В и GND USB-зарядки на пару шин макетки. Красные провода обоих серво вставьте в +, коричневые в −, затем добавьте провод от шины − к GND Arduino. Сигнальные провода: поворот (нижнее серво) на D9, наклон (верхнее) на D10. Два SG90 при старте вместе могут брать больше 1 А, это слишком много для пина 5V Uno.",
        kk: "USB зарядтағыштың 5 В пен GND-ін макет тақтасының бір жұп шинасына шығарыңыз. Екі сервоның қызыл сымдарын +-ке, қоңыр сымдарын −-ке салып, сол − шинасынан Arduino GND-іне бір сым қосыңыз. Сигнал сымдары: бұрылу (төменгі серво) D9-ға, еңкею (жоғарғы серво) D10-ға. Екі SG90 іске қосылғанда бірге 1 А-ден астам ток алуы мүмкін, бұл Uno-ның 5V пині үшін тым көп.",
      },
      expect: { en: "Servo power comes only from the USB charger; the Arduino shares just GND and the two signals.", ru: "Питание серво только от USB-зарядки; с Arduino общие лишь GND и два сигнала.", kk: "Серво қорегі тек USB зарядтағыштан; Arduino-мен тек GND пен екі сигнал ортақ." },
      mistake: { en: "Forgetting the GND link: the servos twitch wildly because their signal has no reference.", ru: "Без связи по GND серво дёргаются хаотично, потому что у сигнала нет опоры.", kk: "GND байланысы болмаса, сигналдың тірегі жоқ болғандықтан, серволар ретсіз селкілдейді." },
    },
    {
      title: { en: "Upload and steer", ru: "Загрузите скетч и управляйте", kk: "Скетчті жүктеп, басқарыңыз" },
      body: {
        en: "Upload the sketch without touching the stick: it measures the joystick's resting centre during the first 0.1 s. Open the Serial Monitor at 9600 baud and push the stick. A small push moves slowly for fine aiming, full deflection moves about 150°/s. Let go and the head stays where it is. Press the stick down to return both axes to 90°.",
        ru: "Загрузите скетч, не трогая стик: в первые 0,1 с он измеряет центр джойстика в покое. Откройте Serial Monitor на 9600 бод и отклоните стик. Лёгкое отклонение двигает медленно для точного наведения, полное — около 150°/с. Отпустите — платформа остаётся на месте. Нажмите на стик, и обе оси вернутся на 90°.",
        kk: "Стикті ұстамай скетчті жүктеңіз: алғашқы 0,1 с ішінде ол джойстиктің тыныш күйдегі орталығын өлшейді. Serial Monitor-ды 9600 бодта ашып, стикті ауытқытыңыз. Аз ауытқу дәл бағыттау үшін баяу қозғайды, толық ауытқу — шамамен 150°/с. Жіберсеңіз, платформа орнында қалады. Стикті бассаңыз, екі ось те 90°-қа оралады.",
      },
      expect: { en: "Smooth, proportional motion; the tilt stops at 30° and 150° so the camera never hits the base.", ru: "Плавное пропорциональное движение; наклон останавливается на 30° и 150°, чтобы камера не била по основанию.", kk: "Біркелкі пропорционал қозғалыс; камера негізге соғылмауы үшін еңкею 30° пен 150°-та тоқтайды." },
      mistake: { en: "If an axis moves the wrong way, do not rewire: flip the sign for that axis in loop().", ru: "Если ось двигается не в ту сторону, не перепаивайте: поменяйте знак для этой оси в loop().", kk: "Ось басқа жаққа қозғалса, қайта сымдамаңыз: loop() ішінде сол осьтің таңбасын өзгертіңіз." },
    },
  ],
  code: [{
    filename: "pan_tilt_joystick.ino",
    language: "cpp",
    libraries: ["Servo"],
    source: `#include <Servo.h>

const int JOY_X_PIN = A0;       // VRx -> pan
const int JOY_Y_PIN = A1;       // VRy -> tilt
const int JOY_SW_PIN = 2;       // stick click, to GND
const int PAN_SERVO_PIN = 9;
const int TILT_SERVO_PIN = 10;

const int DEADZONE = 40;                 // ADC counts around the centre that do nothing
const float MAX_DEG_PER_TICK = 3.0;      // full deflection: 3 deg every 20 ms = 150 deg/s
const int TILT_LOW = 30;                 // keep the camera off the base
const int TILT_HIGH = 150;

Servo pan;
Servo tilt;
float panAngle = 90;
float tiltAngle = 90;
int centreX = 512;
int centreY = 512;
unsigned long lastPrint = 0;

float stepFrom(int raw, int centre) {
  int d = raw - centre;
  if (abs(d) < DEADZONE) return 0;
  float k = (abs(d) - DEADZONE) / (float)(512 - DEADZONE);
  if (k > 1) k = 1;
  return (d > 0 ? 1 : -1) * k * k * MAX_DEG_PER_TICK;   // squared: fine aiming near the centre
}

void centreHead() {
  panAngle = 90;
  tiltAngle = 90;
  pan.write(90);
  tilt.write(90);
  Serial.println("centred: pan=90 tilt=90");
}

void setup() {
  Serial.begin(9600);
  pinMode(JOY_SW_PIN, INPUT_PULLUP);
  pan.write(90);                 // angle first, then attach: no jump at power-up
  tilt.write(90);
  pan.attach(PAN_SERVO_PIN);
  tilt.attach(TILT_SERVO_PIN);

  long sx = 0, sy = 0;           // measure the resting centre of this joystick
  for (int i = 0; i < 16; i++) {
    sx += analogRead(JOY_X_PIN);
    sy += analogRead(JOY_Y_PIN);
    delay(5);
  }
  centreX = sx / 16;
  centreY = sy / 16;
  Serial.print("joystick centre x=");
  Serial.print(centreX);
  Serial.print(" y=");
  Serial.println(centreY);
}

void loop() {
  if (digitalRead(JOY_SW_PIN) == LOW) {
    centreHead();
    while (digitalRead(JOY_SW_PIN) == LOW) delay(10);   // wait for release
  }

  float dPan = stepFrom(analogRead(JOY_X_PIN), centreX);
  float dTilt = stepFrom(analogRead(JOY_Y_PIN), centreY);

  if (dPan != 0 || dTilt != 0) {
    panAngle = constrain(panAngle + dPan, 0, 180);
    tiltAngle = constrain(tiltAngle - dTilt, TILT_LOW, TILT_HIGH);   // stick up = camera up
    pan.write((int)panAngle);
    tilt.write((int)tiltAngle);
    if (millis() - lastPrint > 200) {
      lastPrint = millis();
      Serial.print("pan=");
      Serial.print((int)panAngle);
      Serial.print(" tilt=");
      Serial.println((int)tiltAngle);
    }
  }
  delay(20);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The head drifts slowly with the stick released", ru: "Платформа медленно уползает при отпущенном стике", kk: "Стикті жібергенде платформа баяу жылжиды" },
      cause: { en: "The stick was touched during the startup calibration, or this joystick's centre wanders more than the dead zone.", ru: "Стик трогали во время калибровки при старте, или центр этого джойстика гуляет сильнее мёртвой зоны.", kk: "Іске қосылғандағы калибрлеу кезінде стикті ұстадыңыз немесе бұл джойстиктің орталығы өлі аймақтан көп ауытқиды." },
      fix: { en: "Press reset with your hands off the stick, or raise DEADZONE to 60.", ru: "Нажмите reset, не касаясь стика, или увеличьте DEADZONE до 60.", kk: "Стикті ұстамай reset басыңыз немесе DEADZONE мәнін 60-қа дейін арттырыңыз." },
    },
    {
      symptom: { en: "Servos jitter or the Uno resets when both move", ru: "Серво дрожат или Uno перезагружается, когда двигаются оба", kk: "Екеуі қозғалғанда серволар дірілдейді немесе Uno қайта жүктеледі" },
      cause: { en: "Weak USB supply or missing shared GND.", ru: "Слабая USB-зарядка или нет общей GND.", kk: "USB зарядтағыш әлсіз немесе ортақ GND жоқ." },
      fix: { en: "Use a 2 A charger, check the GND link to the Arduino, and add a 470 µF capacitor across the servo rail.", ru: "Возьмите зарядку на 2 А, проверьте связь GND с Arduino и поставьте конденсатор 470 мкФ на шину серво.", kk: "2 А зарядтағыш алыңыз, Arduino-мен GND байланысын тексеріңіз және серво шинасына 470 мкФ конденсатор қойыңыз." },
    },
    {
      symptom: { en: "Pressing the stick does not centre the head", ru: "Нажатие на стик не центрирует платформу", kk: "Стикті басқанда платформа ортаға келмейді" },
      cause: { en: "SW is not on D2, or the click is too soft to close the switch.", ru: "SW не на D2, или нажатие слишком слабое, чтобы замкнуть кнопку.", kk: "SW D2-де емес немесе басу батырманы тұйықтауға тым әлсіз." },
      fix: { en: "Move SW to D2 and press straight down until it clicks.", ru: "Переставьте SW на D2 и нажимайте прямо вниз до щелчка.", kk: "SW-ді D2-ге ауыстырып, шырт еткенше тура төмен басыңыз." },
    },
  ],
  safety: [
    { en: "Never power the two servos from the Arduino 5V pin; use the separate 5 V supply and share only GND.", ru: "Никогда не питайте два серво от пина 5V Arduino; используйте отдельный источник 5 В, общей оставьте только GND.", kk: "Екі сервоны ешқашан Arduino-ның 5V пинінен қоректендірмеңіз; бөлек 5 В қорек көзін қолданып, тек GND-ді ортақ қалдырыңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "joystick centre x=511 y=498",
      "pan=93 tilt=90",
      "pan=104 tilt=86",
      "pan=131 tilt=74",
      "pan=152 tilt=66",
      "centred: pan=90 tilt=90",
      "pan=84 tilt=97",
      "pan=61 tilt=112",
    ],
    leds: [],
  },
} satisfies GuideContent;
