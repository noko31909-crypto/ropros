import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "robot-arm",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "robotics",
  robotics: true,
  difficulty: "intermediate",
  hours: 6,
  costUsd: 38,
  xpReward: 260,
  title: {
    en: "4-DOF Desktop Robot Arm",
    ru: "Настольная роборука на 4 оси",
    kk: "4 осьті үстел үсті робот қолы",
  },
  summary: {
    en: "Four micro servos move a desktop arm, two joysticks steer it joint by joint, and a button records poses that the arm can replay in a smooth loop, even after a power cycle.",
    ru: "Четыре микросервопривода двигают настольную руку, два джойстика управляют каждым суставом, а кнопка записывает позы, которые рука плавно повторяет по кругу даже после выключения питания.",
    kk: "Төрт микро серво үстел үсті қолын қозғалтады, екі джойстик әр буынды басқарады, ал батырма позаларды жазып алады да, қол оларды тіпті қуат өшіп-қосылғаннан кейін де бірқалыпты қайталайды.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic", ru: "логика 5 В", kk: "5 В логика" }, role: { en: "Controller, stores poses in EEPROM", ru: "Контроллер, хранит позы в EEPROM", kk: "Контроллер, позаларды EEPROM-да сақтайды" } },
    { component: "servo-sg90", qty: 4, spec: { en: "SG90 9 g, 180°, comes with most acrylic arm kits", ru: "SG90 9 г, 180°, идут с большинством акриловых наборов", kk: "SG90 9 г, 180°, акрил жинақтардың көбімен бірге келеді" }, role: { en: "Base, shoulder, elbow, gripper", ru: "Основание, плечо, локоть, захват", kk: "Негіз, иық, шынтақ, қармауыш" } },
    { component: "joystick", qty: 2, spec: { en: "KY-023, two axes + push button", ru: "KY-023, две оси + кнопка", kk: "KY-023, екі ось + батырма" }, role: { en: "J1: base and shoulder, J2: elbow and gripper", ru: "J1: основание и плечо, J2: локоть и захват", kk: "J1: негіз және иық, J2: шынтақ және қармауыш" } },
    { component: "buck-converter-lm2596", qty: 1, spec: { en: "set to 5.0 V before connecting the servos", ru: "выставить 5,0 В до подключения серво", kk: "серволарды қоспас бұрын 5,0 В-қа қойыңыз" }, role: { en: "Servo power rail", ru: "Шина питания серво", kk: "Серво қуат шинасы" } },
    { component: "capacitor", qty: 1, spec: { en: "1000 µF, 10 V or more", ru: "1000 мкФ, от 10 В", kk: "1000 мкФ, 10 В не одан жоғары" }, role: { en: "Smooths servo current spikes", ru: "Сглаживает броски тока серво", kk: "Серво тогының секірулерін тегістейді" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V pack (or any 7–12 V DC adapter)", ru: "аккумулятор 7,4 В (или любой адаптер 7–12 В)", kk: "7,4 В аккумулятор (немесе кез келген 7–12 В адаптер)" }, role: { en: "Feeds the buck converter and Arduino VIN", ru: "Питает понижающий преобразователь и VIN Arduino", kk: "Төмендеткіш түрлендіргіш пен Arduino VIN-ді қуаттайды" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT, rated 3 A or more", ru: "SPDT, на ток от 3 А", kk: "SPDT, 3 А не одан жоғары токқа" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі қосқыш" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "5 V servo rail and joystick wiring", ru: "Шина 5 В для серво и разводка джойстиков", kk: "Серволардың 5 В шинасы мен джойстик сымдары" } },
    { component: "jumper-wires", qty: 30, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "s_base", component: "servo-sg90", label: "Base" },
    { id: "s_shoulder", component: "servo-sg90", label: "Shoulder" },
    { id: "s_elbow", component: "servo-sg90", label: "Elbow" },
    { id: "s_grip", component: "servo-sg90", label: "Gripper" },
    { id: "j1", component: "joystick", label: "J1 base/shoulder" },
    { id: "j2", component: "joystick", label: "J2 elbow/grip" },
    { id: "buck", component: "buck-converter-lm2596", label: "LM2596 → 5.0 V" },
    { id: "cap", component: "capacitor", label: "1000 µF" },
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
  ],
  connections: [
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "buck.IN+", color: "red", note: { en: "set OUT to 5.0 V before connecting servos", ru: "выставьте OUT на 5,0 В до подключения серво", kk: "серволарды қоспас бұрын OUT-ты 5,0 В-қа қойыңыз" } },
    { from: "bat.-", to: "buck.IN-", color: "black" },
    { from: "sw.1", to: "board.VIN", color: "red", note: { en: "Arduino supply (VIN 7–12 V)", ru: "питание Arduino (VIN 7–12 В)", kk: "Arduino қуаты (VIN 7–12 В)" } },
    { from: "buck.OUT-", to: "board.GND", color: "black", note: { en: "common ground: servos, buck, Arduino", ru: "общая земля: серво, преобразователь, Arduino", kk: "ортақ жер: серволар, түрлендіргіш, Arduino" } },
    { from: "buck.OUT+", to: "cap.A", color: "red", note: { en: "capacitor + (long leg)", ru: "плюс конденсатора (длинная ножка)", kk: "конденсатор плюсы (ұзын аяғы)" } },
    { from: "cap.B", to: "buck.OUT-", color: "black" },
    { from: "buck.OUT+", to: "s_base.VCC", color: "red" },
    { from: "s_base.GND", to: "buck.OUT-", color: "brown" },
    { from: "board.D3", to: "s_base.SIG", color: "orange" },
    { from: "buck.OUT+", to: "s_shoulder.VCC", color: "red" },
    { from: "s_shoulder.GND", to: "buck.OUT-", color: "brown" },
    { from: "board.D5", to: "s_shoulder.SIG", color: "orange" },
    { from: "buck.OUT+", to: "s_elbow.VCC", color: "red" },
    { from: "s_elbow.GND", to: "buck.OUT-", color: "brown" },
    { from: "board.D6", to: "s_elbow.SIG", color: "orange" },
    { from: "buck.OUT+", to: "s_grip.VCC", color: "red" },
    { from: "s_grip.GND", to: "buck.OUT-", color: "brown" },
    { from: "board.D9", to: "s_grip.SIG", color: "orange" },
    { from: "board.5V", to: "j1.+5V", color: "red" },
    { from: "j1.GND", to: "board.GND2", color: "black" },
    { from: "j1.VRx", to: "board.A0", color: "yellow", note: { en: "base", ru: "основание", kk: "негіз" } },
    { from: "j1.VRy", to: "board.A1", color: "green", note: { en: "shoulder", ru: "плечо", kk: "иық" } },
    { from: "j1.SW", to: "board.D2", color: "blue", note: { en: "press = record pose", ru: "нажатие = записать позу", kk: "басу = позаны жазу" } },
    { from: "board.5V", to: "j2.+5V", color: "red" },
    { from: "j2.GND", to: "board.GND2", color: "black" },
    { from: "j2.VRx", to: "board.A2", color: "yellow", note: { en: "elbow", ru: "локоть", kk: "шынтақ" } },
    { from: "j2.VRy", to: "board.A3", color: "green", note: { en: "gripper", ru: "захват", kk: "қармауыш" } },
    { from: "j2.SW", to: "board.D4", color: "purple", note: { en: "press = play/stop, hold 2 s = erase", ru: "нажатие = пуск/стоп, удержание 2 с = стереть", kk: "басу = іске қосу/тоқтату, 2 с ұстау = өшіру" } },
  ],
  steps: [
    {
      title: { en: "Set the buck converter to 5.0 V", ru: "Настройте преобразователь на 5,0 В", kk: "Түрлендіргішті 5,0 В-қа баптаңыз" },
      body: {
        en: "Before anything else, connect the battery (through the switch) to the LM2596 IN+ and IN− with nothing on the output. Put a multimeter on OUT+ and OUT− and turn the brass trimmer screw until it reads 5.0 V. New modules often ship set to 12 V or more, which would destroy the servos instantly.",
        ru: "Прежде всего подключите аккумулятор (через выключатель) к IN+ и IN− модуля LM2596, ничего не подключая к выходу. Подключите мультиметр к OUT+ и OUT− и крутите латунный винт подстроечного резистора, пока не будет 5,0 В. Новые модули часто приходят настроенными на 12 В и выше, что мгновенно сожжёт серво.",
        kk: "Ең алдымен аккумуляторды (қосқыш арқылы) LM2596 модулінің IN+ және IN− шықпаларына қосыңыз, шығысына ештеңе жалғамаңыз. Мультиметрді OUT+ пен OUT− шықпаларына қойып, жез бұрандалы потенциометрді 5,0 В көрсеткенше бұраңыз. Жаңа модульдер көбіне 12 В не одан жоғары бапталып келеді, бұл серволарды бірден күйдіреді.",
      },
      expect: { en: "The meter reads 4.95–5.05 V with no load.", ru: "Мультиметр показывает 4,95–5,05 В без нагрузки.", kk: "Жүктемесіз мультиметр 4,95–5,05 В көрсетеді." },
      mistake: { en: "Turning the screw the wrong way for a long time: on most boards it takes many turns, clockwise lowers the voltage.", ru: "Долго крутить винт не в ту сторону: на большинстве плат нужно много оборотов, по часовой стрелке напряжение падает.", kk: "Бұранданы ұзақ уақыт қате жаққа бұрау: көп платада көп айналым керек, сағат тілімен бұрағанда кернеу төмендейді." },
    },
    {
      title: { en: "Build the servo power rail", ru: "Соберите шину питания серво", kk: "Серво қуат шинасын жинаңыз" },
      body: {
        en: "Run LM2596 OUT+ and OUT− to the two power rails of the breadboard and put the 1000 µF capacitor across them, long leg (+) on OUT+. Plug the red (VCC) and brown (GND) wires of all four servos into these rails. Then join the rail's − to Arduino GND: the servo signals only work with a shared ground. Battery + also goes through the switch to Arduino VIN.",
        ru: "Выведите OUT+ и OUT− модуля LM2596 на две шины питания макетки и поставьте между ними конденсатор 1000 мкФ, длинной ножкой (+) к OUT+. Красные (VCC) и коричневые (GND) провода всех четырёх серво вставьте в эти шины. Затем соедините минус шины с GND Arduino: сигналы серво работают только при общей земле. Плюс аккумулятора через выключатель идёт также на VIN Arduino.",
        kk: "LM2596 модулінің OUT+ және OUT− шықпаларын макет тақтасының екі қуат шинасына шығарып, олардың арасына 1000 мкФ конденсаторды ұзын аяғын (+) OUT+ жаққа қаратып қойыңыз. Төрт сервоның қызыл (VCC) және қоңыр (GND) сымдарын осы шиналарға қосыңыз. Содан кейін шинаның минусын Arduino GND-імен жалғаңыз: серво сигналдары тек ортақ жер болғанда жұмыс істейді. Аккумулятор плюсы қосқыш арқылы Arduino VIN-ге де барады.",
      },
      expect: { en: "Four servos on the 5 V rail, rail ground joined to Arduino GND.", ru: "Четыре серво на шине 5 В, земля шины соединена с GND Arduino.", kk: "Төрт серво 5 В шинасында, шина жері Arduino GND-імен жалғанған." },
      mistake: { en: "Powering four servos from the Arduino 5V pin: the board browns out and resets every time the arm moves fast.", ru: "Питание четырёх серво от пина 5V Arduino: плата проседает и перезагружается при каждом быстром движении руки.", kk: "Төрт серводы Arduino 5V пинінен қуаттау: қол жылдам қозғалған сайын плата кернеуі түсіп, қайта жүктеледі." },
    },
    {
      title: { en: "Connect the servo signals and centre them", ru: "Подключите сигналы серво и выставьте центр", kk: "Серво сигналдарын қосып, ортаға қойыңыз" },
      body: {
        en: "Orange signal wires: base → D3, shoulder → D5, elbow → D6, gripper → D9. Upload the sketch now, before the arm is assembled, with the servo horns off: at power-up every servo moves to the home pose (90°, 90°, 90°, gripper 40°). Then fit each horn in the home position of its joint (base facing forward, shoulder and elbow upright) and assemble the acrylic kit.",
        ru: "Оранжевые сигнальные провода: основание → D3, плечо → D5, локоть → D6, захват → D9. Загрузите скетч сейчас, до сборки руки и без качалок на серво: при включении каждая серво встаёт в исходную позу (90°, 90°, 90°, захват 40°). Затем наденьте качалки в исходном положении сустава (основание смотрит вперёд, плечо и локоть вертикально) и соберите акриловый набор.",
        kk: "Қызғылт сары сигнал сымдары: негіз → D3, иық → D5, шынтақ → D6, қармауыш → D9. Скетчті қазір, қолды құрастырмай және серволарға иінтіректерді кигізбей тұрып жүктеңіз: қосылғанда әр серво бастапқы позаға келеді (90°, 90°, 90°, қармауыш 40°). Содан кейін әр иінтіректі буынның бастапқы күйінде кигізіңіз (негіз алға қарап, иық пен шынтақ тік) де, акрил жинақты құрастырыңыз.",
      },
      expect: { en: "After assembly the arm powers up standing straight, gripper half open.", ru: "После сборки рука при включении стоит прямо, захват полуоткрыт.", kk: "Құрастырғаннан кейін қосқанда қол тік тұрады, қармауыш жартылай ашық." },
      mistake: { en: "Fitting the horns at a random angle: a joint then hits its end stop, stalls and gets hot.", ru: "Если надеть качалки под случайным углом, сустав будет упираться в ограничитель, стопориться и греться.", kk: "Иінтіректерді кездейсоқ бұрышпен кигізсеңіз, буын шектегішке тіреліп, тұрып қалады да, қызады." },
    },
    {
      title: { en: "Wire the two joysticks", ru: "Подключите два джойстика", kk: "Екі джойстикті қосыңыз" },
      body: {
        en: "Both joysticks take +5V and GND from the Arduino. J1: VRx → A0 (base), VRy → A1 (shoulder), SW → D2 (record). J2: VRx → A2 (elbow), VRy → A3 (gripper), SW → D4 (play). The sketch enables the internal pull-ups on D2 and D4, so the stick buttons need no resistors.",
        ru: "Оба джойстика берут +5V и GND от Arduino. J1: VRx → A0 (основание), VRy → A1 (плечо), SW → D2 (запись). J2: VRx → A2 (локоть), VRy → A3 (захват), SW → D4 (воспроизведение). Скетч включает внутренние подтяжки на D2 и D4, поэтому кнопкам джойстиков резисторы не нужны.",
        kk: "Екі джойстик те +5V пен GND-ті Arduino-дан алады. J1: VRx → A0 (негіз), VRy → A1 (иық), SW → D2 (жазу). J2: VRx → A2 (шынтақ), VRy → A3 (қармауыш), SW → D4 (ойнату). Скетч D2 мен D4-те ішкі тартуды қосады, сондықтан джойстик батырмаларына резистор қажет емес.",
      },
      expect: { en: "Pushing a stick moves its joint and the joint stays put when you let go.", ru: "При наклоне ручки сустав движется, а когда отпускаете, остаётся на месте.", kk: "Тұтқаны еңкейткенде буын қозғалады, жібергенде орнында қалады." },
      mistake: { en: "If a joint moves the opposite way to the stick, flip its sign in the DIR array instead of rewiring.", ru: "Если сустав едет в обратную сторону, поменяйте его знак в массиве DIR, а не перепаивайте провода.", kk: "Буын тұтқаға қарама-қарсы жүрсе, сымдарды ауыстырмай, DIR массивіндегі оның таңбасын өзгертіңіз." },
    },
    {
      title: { en: "Record and replay a routine", ru: "Запишите и воспроизведите программу движений", kk: "Қозғалыс бағдарламасын жазып, қайталаңыз" },
      body: {
        en: "Open the Serial Monitor at 9600 baud. Steer the arm to a pose and press J1: \"pose 1 saved\". Repeat for up to 30 poses, for example: above an object, gripper open, lower, close, lift, swing, open. Press J2 to replay the poses in a smooth loop; press J2 again to stop. Hold J2 for 2 seconds to erase. Poses are stored in EEPROM, so they survive switching off.",
        ru: "Откройте Serial Monitor на 9600 бод. Подведите руку в нужную позу и нажмите J1: «pose 1 saved». Повторите, до 30 поз, например: над предметом, захват открыт, опустить, сжать, поднять, повернуть, разжать. Нажмите J2 — рука плавно повторяет позы по кругу; ещё раз J2 — стоп. Удержание J2 2 секунды стирает всё. Позы хранятся в EEPROM и сохраняются после выключения.",
        kk: "Serial Monitor-ды 9600 бодта ашыңыз. Қолды керек позаға келтіріп, J1 басыңыз: «pose 1 saved». 30 позаға дейін қайталаңыз, мысалы: заттың үстінде, қармауыш ашық, түсіру, қысу, көтеру, бұру, ашу. J2 басыңыз — қол позаларды шеңбер бойымен бірқалыпты қайталайды; J2 тағы бассаңыз — тоқтайды. J2-ні 2 секунд ұстасаңыз, бәрі өшеді. Позалар EEPROM-да сақталады, қуат өшсе де жоғалмайды.",
      },
      expect: { en: "The arm picks up a light object and puts it down again in a loop.", ru: "Рука по кругу поднимает лёгкий предмет и ставит его обратно.", kk: "Қол жеңіл затты шеңбер бойымен көтеріп, қайта қояды." },
      mistake: { en: "SG90s lift about 20–30 g at full reach; heavier objects make the shoulder stall. For a bigger arm use MG996R servos and a supply rated 5 A or more.", ru: "SG90 поднимают около 20–30 г на вытянутой руке; с более тяжёлым предметом плечо стопорится. Для большей руки берите MG996R и блок питания от 5 А.", kk: "SG90 созылған қолмен шамамен 20–30 г көтереді; ауыр затпен иық тұрып қалады. Үлкенірек қолға MG996R және 5 А-ден асатын қуат көзін алыңыз." },
    },
  ],
  code: [{
    filename: "robot_arm.ino",
    language: "cpp",
    libraries: [],
    source: `// 4-DOF robot arm: 4x SG90 on a 5 V buck rail, 2 joysticks, record & replay (poses kept in EEPROM)
#include <Servo.h>
#include <EEPROM.h>

const int SERVO_PINS[4] = {3, 5, 6, 9};      // base, shoulder, elbow, gripper
const int JOY_PINS[4] = {A0, A1, A2, A3};    // J1 X, J1 Y, J2 X, J2 Y
const int REC_BTN = 2;                       // J1 press: record pose
const int PLAY_BTN = 4;                      // J2 press: play/stop, hold 2 s: erase

const int HOME[4]      = {90, 90, 90, 40};
const int MIN_ANGLE[4] = {0, 15, 0, 10};     // keep joints off their end stops
const int MAX_ANGLE[4] = {180, 165, 180, 90};
const int DIR[4]       = {1, -1, 1, 1};      // flip a sign if a joint moves the wrong way
const int DEADZONE = 60;                     // joystick centre noise
const int MAX_POSES = 30;
const int STEP_DEG = 2;                      // replay speed: degrees per 20 ms tick

Servo servo[4];
float angle[4];
byte poses[MAX_POSES][4];
int poseCount = 0, target = 0;
bool playing = false;
unsigned long holdUntil = 0;

bool lastRec = HIGH, lastPlay = HIGH;
unsigned long playDownAt = 0;

void savePoses() {
  EEPROM.update(0, poseCount);
  for (int p = 0; p < poseCount; p++)
    for (int j = 0; j < 4; j++) EEPROM.update(1 + p * 4 + j, poses[p][j]);
}

void loadPoses() {
  poseCount = EEPROM.read(0);
  if (poseCount > MAX_POSES) poseCount = 0;  // fresh EEPROM reads 255
  for (int p = 0; p < poseCount; p++)
    for (int j = 0; j < 4; j++) poses[p][j] = EEPROM.read(1 + p * 4 + j);
}

void manualStep() {
  for (int j = 0; j < 4; j++) {
    int v = analogRead(JOY_PINS[j]) - 512;
    if (abs(v) < DEADZONE) continue;
    angle[j] += DIR[j] * v / 256.0;          // up to 2 degrees per tick at full deflection
    angle[j] = constrain(angle[j], MIN_ANGLE[j], MAX_ANGLE[j]);
    servo[j].write((int)angle[j]);
  }
}

void playStep() {
  if (millis() < holdUntil) return;
  bool arrived = true;
  for (int j = 0; j < 4; j++) {
    int goal = poses[target][j];
    int now = (int)angle[j];
    if (now != goal) {
      arrived = false;
      now += constrain(goal - now, -STEP_DEG, STEP_DEG);
      angle[j] = now;
      servo[j].write(now);
    }
  }
  if (arrived) {
    Serial.print("-> pose "); Serial.println(target + 1);
    target = (target + 1) % poseCount;
    holdUntil = millis() + 300;              // short pause at each pose
  }
}

void handleButtons() {
  bool rec = digitalRead(REC_BTN), play = digitalRead(PLAY_BTN);

  if (lastRec == HIGH && rec == LOW && !playing) {          // J1 pressed
    if (poseCount < MAX_POSES) {
      for (int j = 0; j < 4; j++) poses[poseCount][j] = (byte)angle[j];
      poseCount++;
      savePoses();
      Serial.print("pose "); Serial.print(poseCount); Serial.print(" saved:");
      for (int j = 0; j < 4; j++) { Serial.print(' '); Serial.print((int)angle[j]); }
      Serial.println();
    } else {
      Serial.println("memory full");
    }
  }

  if (lastPlay == HIGH && play == LOW) playDownAt = millis();
  if (lastPlay == LOW && play == HIGH) {                    // J2 released
    if (millis() - playDownAt > 2000) {
      playing = false; poseCount = 0; savePoses();
      Serial.println("all poses erased");
    } else if (playing) {
      playing = false;
      Serial.println("stop");
    } else if (poseCount > 0) {
      playing = true; target = 0; holdUntil = 0;
      Serial.print("play "); Serial.print(poseCount); Serial.println(" poses");
    }
  }
  lastRec = rec; lastPlay = play;
}

void setup() {
  Serial.begin(9600);
  pinMode(REC_BTN, INPUT_PULLUP);
  pinMode(PLAY_BTN, INPUT_PULLUP);
  for (int j = 0; j < 4; j++) {
    angle[j] = HOME[j];
    servo[j].write(HOME[j]);                 // set the first pulse before attaching: no wild jump
    servo[j].attach(SERVO_PINS[j]);
  }
  loadPoses();
  Serial.print("robot arm ready, loaded "); Serial.print(poseCount); Serial.println(" poses");
}

void loop() {
  handleButtons();
  if (playing) playStep();
  else manualStep();
  delay(20);                                 // 50 Hz control loop, also debounces the buttons
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Servos jitter or the Arduino resets when the arm moves", ru: "Серво дрожат или Arduino перезагружается при движении руки", kk: "Қол қозғалғанда серволар дірілдейді немесе Arduino қайта жүктеледі" },
      cause: { en: "Missing common ground between the servo rail and the Arduino, no capacitor, or a weak supply.", ru: "Нет общей земли между шиной серво и Arduino, нет конденсатора или слабое питание.", kk: "Серво шинасы мен Arduino арасында ортақ жер жоқ, конденсатор жоқ немесе қуат әлсіз." },
      fix: { en: "Join the rail − to Arduino GND, fit the 1000 µF capacitor and check the buck still gives 5 V under load.", ru: "Соедините минус шины с GND Arduino, поставьте конденсатор 1000 мкФ и проверьте, что под нагрузкой преобразователь держит 5 В.", kk: "Шина минусын Arduino GND-імен жалғаңыз, 1000 мкФ конденсатор қойыңыз және жүктемеде түрлендіргіш 5 В ұстайтынын тексеріңіз." },
    },
    {
      symptom: { en: "A joint drifts slowly when no stick is touched", ru: "Сустав медленно ползёт, когда джойстик не трогают", kk: "Джойстикке тимесе де, буын баяу жылжиды" },
      cause: { en: "That joystick's centre reading is further from 512 than DEADZONE.", ru: "Центр этого джойстика дальше от 512, чем DEADZONE.", kk: "Бұл джойстиктің орталық мәні 512-ден DEADZONE-нан алыс." },
      fix: { en: "Raise DEADZONE to 80–100.", ru: "Увеличьте DEADZONE до 80–100.", kk: "DEADZONE-ды 80–100-ге дейін арттырыңыз." },
    },
    {
      symptom: { en: "A servo buzzes and gets hot while holding still", ru: "Серво жужжит и греется, стоя на месте", kk: "Серво бір орында тұрып, ызыңдап қызады" },
      cause: { en: "The joint is pushed against a mechanical stop, or the arm is lifting too much weight.", ru: "Сустав упирается в механический ограничитель, или рука держит слишком большой вес.", kk: "Буын механикалық шектегішке тіреліп тұр немесе қол тым ауыр жүк ұстап тұр." },
      fix: { en: "Narrow MIN_ANGLE/MAX_ANGLE for that joint, re-check the horn position and keep loads light.", ru: "Сузьте MIN_ANGLE/MAX_ANGLE для этого сустава, проверьте положение качалки и не перегружайте руку.", kk: "Бұл буын үшін MIN_ANGLE/MAX_ANGLE аралығын тарылтып, иінтірек күйін тексеріңіз және қолға ауыр жүк салмаңыз." },
    },
  ],
  safety: [
    { en: "Set and measure the LM2596 output before connecting any servo: an unadjusted module can output the full battery voltage.", ru: "Выставьте и измерьте выход LM2596 до подключения серво: ненастроенный модуль может выдавать полное напряжение аккумулятора.", kk: "Кез келген серводы қоспас бұрын LM2596 шығысын баптап, өлшеңіз: бапталмаған модуль аккумулятордың толық кернеуін беруі мүмкін." },
    { en: "Keep fingers out of the gripper and joints while the arm is replaying.", ru: "Не держите пальцы в захвате и суставах, пока рука повторяет движения.", kk: "Қол қозғалысты қайталап жатқанда саусақтарды қармауыш пен буындардан аулақ ұстаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["robot arm ready, loaded 0 poses", "pose 1 saved: 90 90 90 40", "pose 2 saved: 30 120 60 40", "pose 3 saved: 30 120 60 80", "pose 4 saved: 150 100 80 80", "play 4 poses", "-> pose 1", "-> pose 2", "-> pose 3", "-> pose 4", "stop"],
    leds: [{ label: "PWR", color: "#7CB342" }, { label: "L", color: "#F57C00" }],
  },
} satisfies GuideContent;
