import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "light-seeking-robot",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "robotics",
  robotics: true,
  difficulty: "beginner",
  hours: 2.5,
  costUsd: 22,
  xpReward: 150,
  title: {
    en: "Light-Seeking Robot",
    ru: "Робот, который едет на свет",
    kk: "Жарыққа қарай жүретін робот",
  },
  summary: {
    en: "Two light sensors act as eyes: the robot compares them, steers toward the brighter side, spins to search when it is dark and stops when it reaches your torch.",
    ru: "Два датчика света работают как глаза: робот сравнивает их, поворачивает к более яркой стороне, крутится в поиске, когда темно, и останавливается, доехав до фонарика.",
    kk: "Екі жарық датчигі көз сияқты: робот оларды салыстырып, жарығырақ жаққа бұрылады, қараңғыда іздеп айналады және шамға жеткенде тоқтайды.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V logic", ru: "ATmega328P, логика 5 В", kk: "ATmega328P, 5 В логика" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "ldr", qty: 2, spec: { en: "GL5528 photoresistor", ru: "фоторезистор GL5528", kk: "GL5528 фоторезисторы" }, role: { en: "Left and right eyes", ru: "Левый и правый глаза", kk: "Сол және оң көздер" } },
    { component: "resistor", qty: 2, spec: { en: "10 kΩ, ¼ W", ru: "10 кОм, ¼ Вт", kk: "10 кОм, ¼ Вт" }, role: { en: "Lower half of each light divider", ru: "Нижнее плечо каждого делителя", kk: "Әр жарық бөлгішінің төменгі иіні" } },
    { component: "l9110s", qty: 1, spec: { en: "dual channel, 800 mA per motor", ru: "два канала, 800 мА на мотор", kk: "екі арна, моторға 800 мА" }, role: { en: "Drives both motors", ru: "Управляет обоими моторами", kk: "Екі моторды басқарады" } },
    { component: "dc-motor", qty: 2, spec: { en: "TT gear motor 3–6 V (comes with the chassis)", ru: "мотор-редуктор TT 3–6 В (идёт с шасси)", kk: "TT редукторлы мотор 3–6 В (шассимен бірге)" }, role: { en: "Left and right wheels", ru: "Левое и правое колёса", kk: "Сол және оң доңғалақтар" } },
    { component: "robot-chassis-2wd", qty: 1, spec: { en: "acrylic plate, 2 wheels + caster", ru: "акриловая платформа, 2 колеса + опорное", kk: "акрил платформа, 2 доңғалақ + тірек дөңгелек" }, role: { en: "Frame", ru: "Рама", kk: "Рама" } },
    { component: "battery-4xaa", qty: 1, spec: { en: "4× AA alkaline or NiMH", ru: "4× AA, алкалиновые или NiMH", kk: "4× AA, сілтілі немесе NiMH" }, role: { en: "Motor power", ru: "Питание моторов", kk: "Мотор қуаты" } },
    { component: "battery-9v", qty: 1, spec: { en: "PP3 with snap", ru: "«Крона» с клипсой", kk: "Қысқышы бар PP3 («Крона»)" }, role: { en: "Nano power through VIN", ru: "Питание Nano через VIN", kk: "VIN арқылы Nano қуаты" } },
    { component: "slide-switch", qty: 2, spec: { en: "SPDT", ru: "SPDT", kk: "SPDT" }, role: { en: "Motor and logic power switches", ru: "Выключатели моторов и логики", kk: "Мотор және логика қосқыштары" } },
    { component: "breadboard", qty: 1, spec: { en: "half size, sticks onto the chassis", ru: "половинка, клеится на шасси", kk: "жартылай, шассиге жабысады" }, role: { en: "Holds the Nano and dividers", ru: "Для Nano и делителей", kk: "Nano мен бөлгіштерге арналған" } },
    { component: "jumper-wires", qty: 20, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ldr_l", component: "ldr", label: "Left eye" },
    { id: "ldr_r", component: "ldr", label: "Right eye" },
    { id: "r_l", component: "resistor", label: "10 kΩ" },
    { id: "r_r", component: "resistor", label: "10 kΩ" },
    { id: "drv", component: "l9110s", label: "L9110S" },
    { id: "m1", component: "dc-motor", label: "Left motor" },
    { id: "m2", component: "dc-motor", label: "Right motor" },
    { id: "bat_m", component: "battery-4xaa", label: "4×AA motors" },
    { id: "sw_m", component: "slide-switch", label: "Motors" },
    { id: "bat_l", component: "battery-9v", label: "9 V logic" },
    { id: "sw_l", component: "slide-switch", label: "Logic" },
  ],
  connections: [
    { from: "board.5V", to: "ldr_l.A", color: "red" },
    { from: "ldr_l.B", to: "board.A0", color: "yellow", note: { en: "brighter light = higher reading", ru: "больше света = больше показание", kk: "жарық көп = мән жоғары" } },
    { from: "board.A0", to: "r_l.A", color: "yellow" },
    { from: "r_l.B", to: "board.GND", color: "black" },
    { from: "board.5V", to: "ldr_r.A", color: "red" },
    { from: "ldr_r.B", to: "board.A1", color: "green" },
    { from: "board.A1", to: "r_r.A", color: "green" },
    { from: "r_r.B", to: "board.GND", color: "black" },
    { from: "board.D5", to: "drv.A-IA", color: "cyan", note: { en: "PWM, left speed", ru: "ШИМ, скорость левого", kk: "ШИМ, сол жақ жылдамдығы" } },
    { from: "board.D4", to: "drv.A-IB", color: "pink", note: { en: "left direction", ru: "направление левого", kk: "сол жақ бағыты" } },
    { from: "board.D6", to: "drv.B-IA", color: "blue", note: { en: "PWM, right speed", ru: "ШИМ, скорость правого", kk: "ШИМ, оң жақ жылдамдығы" } },
    { from: "board.D7", to: "drv.B-IB", color: "purple", note: { en: "right direction", ru: "направление правого", kk: "оң жақ бағыты" } },
    { from: "drv.MA1", to: "m1.+", color: "red" },
    { from: "drv.MA2", to: "m1.-", color: "black" },
    { from: "drv.MB1", to: "m2.+", color: "red" },
    { from: "drv.MB2", to: "m2.-", color: "black" },
    { from: "bat_m.+", to: "sw_m.C", color: "red" },
    { from: "sw_m.1", to: "drv.VCC", color: "red", note: { en: "6 V for the motors only", ru: "6 В только для моторов", kk: "6 В тек моторларға" } },
    { from: "bat_m.-", to: "drv.GND", color: "black" },
    { from: "drv.GND", to: "board.GND2", color: "black", note: { en: "common ground", ru: "общая земля", kk: "ортақ жер" } },
    { from: "bat_l.+", to: "sw_l.C", color: "red" },
    { from: "sw_l.1", to: "board.VIN", color: "orange", note: { en: "9 V into VIN (7–12 V)", ru: "9 В на VIN (7–12 В)", kk: "VIN-ге 9 В (7–12 В)" } },
    { from: "bat_l.-", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Assemble the chassis", ru: "Соберите шасси", kk: "Шассиді құрастырыңыз" },
      body: {
        en: "Bolt the two TT motors and the caster to the plate and push on the wheels. Stick the half breadboard on top and plug the Nano into it across the centre gap. Fix the 4×AA holder and the 9 V battery underneath, as low as possible.",
        ru: "Прикрутите два мотора TT и опорное колесо к платформе, наденьте колёса. Сверху приклейте половинку макетки и вставьте в неё Nano поперёк центральной канавки. Держатель 4×AA и «крону» закрепите снизу, как можно ниже.",
        kk: "Екі TT моторы мен тірек дөңгелекті платформаға бұрап, доңғалақтарды кигізіңіз. Үстіне жартылай макет тақтасын жабыстырып, Nano-ны орталық ойыққа көлденең орнатыңыз. 4×AA ұстағышы мен 9 В батареяны астына, мүмкіндігінше төмен бекітіңіз.",
      },
      expect: { en: "The Nano sits on the breadboard, both batteries are under the plate.", ru: "Nano стоит на макетке, обе батареи под платформой.", kk: "Nano макет тақтасында тұр, екі батарея платформаның астында." },
      mistake: { en: "Plugging the Nano along one breadboard row shorts its pins together.", ru: "Если вставить Nano вдоль одного ряда макетки, его пины замкнутся между собой.", kk: "Nano-ны макет тақтасының бір қатарына бойлай қойсаңыз, оның пиндері өзара тұйықталады." },
    },
    {
      title: { en: "Build the two light eyes", ru: "Соберите два световых «глаза»", kk: "Екі жарық «көзін» жинаңыз" },
      body: {
        en: "Each eye is a divider: 5V → LDR → analog pin → 10 kΩ → GND. The left LDR feeds A0, the right one A1. Bend the LDRs so they look forward and about 30° outward, and put a strip of card between them as a nose: it shades one eye when the light is off to the side and makes steering much sharper.",
        ru: "Каждый «глаз» это делитель: 5V → фоторезистор → аналоговый пин → 10 кОм → GND. Левый фоторезистор идёт на A0, правый на A1. Отогните фоторезисторы вперёд и примерно на 30° в стороны, а между ними поставьте полоску картона как «нос»: она затеняет один глаз, когда свет сбоку, и поворот становится гораздо чётче.",
        kk: "Әр «көз» бөлгіш болып табылады: 5V → фоторезистор → аналог пин → 10 кОм → GND. Сол фоторезистор A0-ге, оңы A1-ге барады. Фоторезисторларды алға және шамамен 30° сыртқа қаратып иіңіз, ал араларына «мұрын» ретінде картон жолақ қойыңыз: жарық бүйірден түскенде ол бір көзді көлеңкелейді, сонда бұрылу әлдеқайда анық болады.",
      },
      expect: { en: "Covering an LDR with your finger lowers its reading in the Serial Monitor.", ru: "Если закрыть фоторезистор пальцем, его показание в Serial Monitor падает.", kk: "Фоторезисторды саусақпен жапсаңыз, оның Serial Monitor-дағы мәні төмендейді." },
      mistake: { en: "Swapping the resistor and the LDR inverts the logic, and the robot runs away from the light.", ru: "Если поменять местами резистор и фоторезистор, логика инвертируется и робот будет убегать от света.", kk: "Резистор мен фоторезисторды ауыстырсаңыз, логика керісінше болып, робот жарықтан қашады." },
    },
    {
      title: { en: "Wire the L9110S motor driver", ru: "Подключите драйвер L9110S", kk: "L9110S драйверін қосыңыз" },
      body: {
        en: "The left motor goes to MA1/MA2 and the right motor to MB1/MB2. Connect A-IA → D5, A-IB → D4, B-IA → D6, B-IB → D7. D5 and D6 are PWM pins and set the speed; D4 and D7 choose the direction. The motors never touch the Nano pins directly: the L9110S carries their current.",
        ru: "Левый мотор подключите к MA1/MA2, правый к MB1/MB2. Соедините A-IA → D5, A-IB → D4, B-IA → D6, B-IB → D7. D5 и D6 это ШИМ-пины, они задают скорость; D4 и D7 выбирают направление. Моторы никогда не подключаются к пинам Nano напрямую: их ток несёт L9110S.",
        kk: "Сол моторды MA1/MA2-ге, оңын MB1/MB2-ге қосыңыз. A-IA → D5, A-IB → D4, B-IA → D6, B-IB → D7 жалғаңыз. D5 пен D6 ШИМ пиндері, жылдамдықты береді; D4 пен D7 бағытты таңдайды. Моторлар Nano пиндеріне ешқашан тікелей қосылмайды: олардың тогын L9110S көтереді.",
      },
      expect: { en: "Four signal wires from the Nano to the driver, two motor pairs on its outputs.", ru: "Четыре сигнальных провода от Nano к драйверу, две пары проводов моторов на выходах.", kk: "Nano-дан драйверге төрт сигнал сымы, шығыстарында екі жұп мотор сымы." },
      mistake: { en: "Using D2 or D8 for A-IA or B-IA leaves you with only full speed or stop, because they have no PWM.", ru: "Если поставить A-IA или B-IA на D2 или D8, будет только «полный ход» или «стоп»: на этих пинах нет ШИМ.", kk: "A-IA не B-IA-ны D2 не D8-ге қойсаңыз, тек «толық жүріс» не «тоқта» болады: бұл пиндерде ШИМ жоқ." },
    },
    {
      title: { en: "Connect the two batteries", ru: "Подключите две батареи", kk: "Екі батареяны қосыңыз" },
      body: {
        en: "The 4×AA pack feeds only the motors: + through its switch to the L9110S VCC, − to the L9110S GND. The 9 V battery feeds the Nano: + through the second switch to VIN, − to GND. Join the L9110S GND to the Nano GND so both sides share a ground. Separate packs keep motor noise from resetting the Nano.",
        ru: "Блок 4×AA питает только моторы: плюс через выключатель на VCC L9110S, минус на GND L9110S. «Крона» питает Nano: плюс через второй выключатель на VIN, минус на GND. Соедините GND L9110S с GND Nano, чтобы у обеих частей была общая земля. Раздельные батареи не дают помехам от моторов перезагружать Nano.",
        kk: "4×AA блогы тек моторларды қуаттайды: плюсы қосқыш арқылы L9110S VCC-ке, минусы L9110S GND-іне. 9 В батарея Nano-ны қуаттайды: плюсы екінші қосқыш арқылы VIN-ге, минусы GND-ге. Екі бөліктің ортақ жері болуы үшін L9110S GND-ін Nano GND-імен жалғаңыз. Бөлек батареялар мотор кедергілерінің Nano-ны қайта жүктеуіне жол бермейді.",
      },
      expect: { en: "Logic switch on: the Nano power LED lights. Motor switch on: nothing moves until the sketch says so.", ru: "Включили логику: горит светодиод питания Nano. Включили моторы: ничего не едет, пока скетч не скомандует.", kk: "Логиканы қостыңыз: Nano қуат шамы жанады. Моторларды қостыңыз: скетч бұйырмайынша ештеңе қозғалмайды." },
      mistake: { en: "Feeding the 6 V AA pack into VIN looks fine at first but the Nano browns out as the cells drain.", ru: "Если подать 6 В от батареек AA на VIN, сначала всё работает, но по мере разряда Nano начнёт сбрасываться.", kk: "AA батареяларының 6 В-ын VIN-ге берсеңіз, алғашында бәрі жұмыс істейді, бірақ батарея отырған сайын Nano өшіп-жана бастайды." },
    },
    {
      title: { en: "Upload, calibrate and chase the light", ru: "Загрузите, откалибруйте и ведите на свет", kk: "Жүктеп, калибрлеп, жарыққа жетелеңіз" },
      body: {
        en: "Dim the room, upload the sketch and open the Serial Monitor at 9600 baud. For the first second the robot measures ambient light and the difference between its eyes, so keep the torch off. Then switch on the motors and shine a phone torch from about a metre away: the robot turns toward it and drives, and stops when the light is right in front of it. Move the torch and it follows.",
        ru: "Приглушите свет в комнате, загрузите скетч и откройте Serial Monitor на 9600 бод. Первую секунду робот измеряет фоновый свет и разницу между глазами, поэтому фонарик не включайте. Затем включите моторы и посветите фонариком телефона примерно с метра: робот повернёт к нему, поедет и остановится, когда свет окажется прямо перед ним. Ведите фонарик, и робот поедет следом.",
        kk: "Бөлмедегі жарықты азайтып, скетчті жүктеңіз де, Serial Monitor-ды 9600 бодта ашыңыз. Алғашқы секундта робот фондық жарықты және көздерінің айырмасын өлшейді, сондықтан шамды жақпаңыз. Содан кейін моторларды қосып, телефон шамымен шамамен бір метрден жарық түсіріңіз: робот оған бұрылып, жүреді де, жарық дәл алдында болғанда тоқтайды. Шамды жылжытсаңыз, робот соңынан жүреді.",
      },
      expect: { en: "\"seek\" lines while it drives, \"arrived\" when it reaches the torch.", ru: "Строки «seek» во время езды и «arrived», когда доехал до фонарика.", kk: "Жүріп келе жатқанда «seek» жолдары, шамға жеткенде «arrived»." },
      mistake: { en: "Calibrating in bright daylight leaves no headroom, so the torch hardly changes the readings.", ru: "Если калибровать при ярком дневном свете, запаса не остаётся и фонарик почти не меняет показания.", kk: "Жарық күндізгі жарықта калибрлесеңіз, қор қалмайды да, шам мәндерді әрең өзгертеді." },
    },
  ],
  code: [{
    filename: "light_seeking_robot.ino",
    language: "cpp",
    libraries: [],
    source: `// Light-seeking robot: 2 LDR dividers + L9110S on Arduino Nano
const int LDR_L = A0, LDR_R = A1;   // brighter = higher reading
const int A_IA = 5, A_IB = 4;       // left motor: A-IA is PWM, A-IB is direction
const int B_IA = 6, B_IB = 7;       // right motor: B-IA is PWM, B-IB is direction

const int BASE = 150;        // cruising PWM
const int GAIN = 3;          // extra PWM per unit of brightness difference
const int SEARCH = 130;      // PWM while spinning to look for light

int ambient = 0, offset = 0, seenLevel = 0, arrivedLevel = 0;
unsigned long lastPrint = 0;

// L9110S: direction pin LOW -> PWM pin duty = speed; direction pin HIGH -> inverted duty
void side(int ia, int ib, int pwm) {
  pwm = constrain(pwm, -255, 255);
  if (pwm >= 0) { digitalWrite(ib, LOW);  analogWrite(ia, pwm); }
  else          { digitalWrite(ib, HIGH); analogWrite(ia, 255 + pwm); }
}

void motors(int left, int right) {
  side(A_IA, A_IB, left);
  side(B_IA, B_IB, right);
}

int readAvg(int pin) {
  long sum = 0;
  for (int i = 0; i < 8; i++) sum += analogRead(pin);
  return sum / 8;
}

void report(const char *state, int l, int r, int turn, bool withTurn) {
  if (millis() - lastPrint < 250) return;
  lastPrint = millis();
  Serial.print(state);
  Serial.print(" L="); Serial.print(l);
  Serial.print(" R="); Serial.print(r);
  if (withTurn) { Serial.print(" turn="); Serial.print(turn); }
  Serial.println();
}

void setup() {
  pinMode(A_IA, OUTPUT); pinMode(A_IB, OUTPUT);
  pinMode(B_IA, OUTPUT); pinMode(B_IB, OUTPUT);
  motors(0, 0);
  Serial.begin(9600);
  Serial.println("calibrating ambient light...");
  long sl = 0, sr = 0;
  for (int i = 0; i < 50; i++) { sl += readAvg(LDR_L); sr += readAvg(LDR_R); delay(20); }
  int l = sl / 50, r = sr / 50;
  offset = r - l;                              // eyes are never perfectly matched
  ambient = (l + r - offset) / 2;
  seenLevel = ambient + (1023 - ambient) / 8;  // light must beat ambient by this much
  arrivedLevel = ambient + (1023 - ambient) * 3 / 4;
  Serial.print("ambient "); Serial.print(ambient);
  Serial.print(" offset "); Serial.print(offset);
  Serial.print(" seen>"); Serial.print(seenLevel);
  Serial.print(" arrived>"); Serial.println(arrivedLevel);
}

void loop() {
  int l = readAvg(LDR_L);
  int r = readAvg(LDR_R) - offset;
  int light = (l + r) / 2;

  if (light > arrivedLevel) {                  // right under the torch
    motors(0, 0);
    report("arrived", l, r, 0, false);
  } else if (light < seenLevel) {              // nothing brighter than the room: look around
    motors(-SEARCH, SEARCH);
    report("searching", l, r, 0, false);
  } else {                                     // steer toward the brighter eye
    int turn = constrain((r - l) * GAIN, -BASE, BASE);
    motors(BASE + turn, BASE - turn);
    report("seek", l, r, turn, true);
  }
  delay(20);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The robot turns away from the light", ru: "Робот отворачивает от света", kk: "Робот жарықтан бұрылып кетеді" },
      cause: { en: "The left and right LDRs are swapped (A0 must be the left eye), or both motors are wired reversed so \"forward\" is backward.", ru: "Перепутаны левый и правый фоторезисторы (A0 должен быть левым глазом), или оба мотора подключены наоборот и «вперёд» стало «назад».", kk: "Сол және оң фоторезисторлар ауысқан (A0 сол көз болуы керек) немесе екі мотор да кері қосылып, «алға» «артқа» болып кеткен." },
      fix: { en: "Cover the left LDR and check that the L value drops. If the robot drives backward, swap the wires of both motors.", ru: "Закройте левый фоторезистор и убедитесь, что падает значение L. Если робот едет назад, поменяйте провода у обоих моторов.", kk: "Сол фоторезисторды жауып, L мәні төмендейтінін тексеріңіз. Робот артқа жүрсе, екі мотордың да сымдарын ауыстырыңыз." },
    },
    {
      symptom: { en: "It only ever spins and prints \"searching\"", ru: "Робот только крутится и печатает «searching»", kk: "Робот тек айналып, «searching» деп шығарады" },
      cause: { en: "The torch adds too little light compared with the room, so the reading never beats seenLevel.", ru: "Фонарик добавляет слишком мало света по сравнению с комнатой, и показание не превышает seenLevel.", kk: "Шам бөлмемен салыстырғанда тым аз жарық қосады, сондықтан мән seenLevel-ден аспайды." },
      fix: { en: "Darken the room and press reset to recalibrate, or move the torch closer.", ru: "Затемните комнату и нажмите reset для новой калибровки, или поднесите фонарик ближе.", kk: "Бөлмені қараңғылатып, қайта калибрлеу үшін reset басыңыз немесе шамды жақындатыңыз." },
    },
    {
      symptom: { en: "One wheel does not turn at low speed", ru: "Одно колесо не крутится на малой скорости", kk: "Бір доңғалақ төмен жылдамдықта айналмайды" },
      cause: { en: "TT motors need a minimum PWM to overcome friction, and weak AA cells make it worse.", ru: "Моторам TT нужен минимальный ШИМ, чтобы преодолеть трение, а слабые батарейки AA усугубляют это.", kk: "TT моторларына үйкелісті жеңу үшін ең аз ШИМ керек, ал әлсіз AA батареялары мұны күшейтеді." },
      fix: { en: "Use fresh cells, and raise BASE and SEARCH by 20 until both wheels always turn.", ru: "Поставьте свежие батарейки и поднимайте BASE и SEARCH на 20, пока оба колеса не будут крутиться всегда.", kk: "Жаңа батареялар салып, екі доңғалақ та әрқашан айналғанша BASE пен SEARCH-ті 20-дан арттырыңыз." },
    },
  ],
  safety: [
    { en: "Never point a bright torch or laser at the robot from eye height where people are watching.", ru: "Не светите ярким фонарём или лазером на робота на уровне глаз, если рядом стоят люди.", kk: "Жанында адамдар тұрса, роботқа көз деңгейінен жарық шаммен немесе лазермен жарық түсірмеңіз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["calibrating ambient light...", "ambient 300 offset 12 seen>390 arrived>842", "searching L=305 R=312", "seek L=420 R=520 turn=150", "seek L=560 R=600 turn=120", "seek L=690 R=680 turn=-30", "seek L=790 R=800 turn=30", "arrived L=850 R=861"],
    leds: [{ label: "PWR", color: "#7CB342" }, { label: "L", color: "#F57C00" }],
  },
} satisfies GuideContent;
