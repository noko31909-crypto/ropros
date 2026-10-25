import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "mini-sumo-robot",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "robotics",
  robotics: true,
  difficulty: "intermediate",
  hours: 5,
  costUsd: 38,
  xpReward: 260,
  title: {
    en: "Sumo Robot",
    ru: "Робот-сумоист",
    kk: "Сумо робот",
  },
  summary: {
    en: "An autonomous sumo bot: it waits the 5-second start delay, spins to find the opponent with an ultrasonic sensor, charges at it, and backs off whenever its floor sensors touch the white ring border.",
    ru: "Автономный робот-сумоист: выжидает 5 секунд после старта, крутится в поиске соперника с ультразвуковым датчиком, атакует его и отъезжает, как только датчики снизу касаются белой границы ринга.",
    kk: "Автономды сумо робот: старттан кейін 5 секунд күтеді, ультрадыбыстық датчикпен қарсыласын іздеп айналады, оған шабуыл жасайды және астыңғы датчиктері ринг шетіндегі ақ сызыққа тигенде кері шегінеді.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V logic", ru: "ATmega328P, логика 5 В", kk: "ATmega328P, 5 В логика" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "tcrt5000", qty: 2, spec: { en: "module with LM393 comparator, DO output", ru: "модуль с компаратором LM393, выход DO", kk: "LM393 компараторы бар модуль, DO шығысы" }, role: { en: "Ring-border sensors, front corners", ru: "Датчики границы ринга, передние углы", kk: "Ринг шетінің датчиктері, алдыңғы бұрыштар" } },
    { component: "hc-sr04", qty: 1, spec: { en: "5 V, 2–400 cm", ru: "5 В, 2–400 см", kk: "5 В, 2–400 см" }, role: { en: "Finds the opponent", ru: "Ищет соперника", kk: "Қарсыласты табады" } },
    { component: "tb6612fng", qty: 1, spec: { en: "1.2 A per channel (3.2 A peak), VM up to 13.5 V", ru: "1,2 А на канал (3,2 А пик), VM до 13,5 В", kk: "арнаға 1,2 А (шың 3,2 А), VM 13,5 В-қа дейін" }, role: { en: "Motor driver", ru: "Драйвер моторов", kk: "Мотор драйвері" } },
    { component: "dc-motor", qty: 2, spec: { en: "TT gear motor 3–6 V", ru: "мотор-редуктор TT 3–6 В", kk: "TT редукторлы мотор 3–6 В" }, role: { en: "Drive wheels", ru: "Ведущие колёса", kk: "Жетекші доңғалақтар" } },
    { component: "robot-chassis-2wd", qty: 1, spec: { en: "2WD plate with rubber wheels", ru: "платформа 2WD с резиновыми колёсами", kk: "резеңке доңғалақты 2WD платформа" }, role: { en: "Frame and front scoop mount", ru: "Рама и крепление переднего «ковша»", kk: "Рама және алдыңғы «күрек» бекітпесі" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V, 800–1500 mAh", ru: "7,4 В, 800–1500 мА·ч", kk: "7,4 В, 800–1500 мА·сағ" }, role: { en: "Power for motors and Nano", ru: "Питание моторов и Nano", kk: "Моторлар мен Nano қуаты" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT, rated 2 A or more", ru: "SPDT, на ток от 2 А", kk: "SPDT, 2 А не одан жоғары токқа" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі қосқыш" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "START button", ru: "Кнопка СТАРТ", kk: "СТАРТ батырмасы" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Holds the Nano and TB6612", ru: "Для Nano и TB6612", kk: "Nano мен TB6612-ге арналған" } },
    { component: "jumper-wires", qty: 30, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "edge_l", component: "tcrt5000", label: "Edge left" },
    { id: "edge_r", component: "tcrt5000", label: "Edge right" },
    { id: "us", component: "hc-sr04", label: "Eyes" },
    { id: "drv", component: "tb6612fng", label: "TB6612FNG" },
    { id: "m1", component: "dc-motor", label: "Left motor" },
    { id: "m2", component: "dc-motor", label: "Right motor" },
    { id: "btn", component: "push-button", label: "START" },
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
  ],
  connections: [
    { from: "board.5V", to: "edge_l.VCC", color: "red" },
    { from: "edge_l.GND", to: "board.GND", color: "black" },
    { from: "edge_l.DO", to: "board.D2", color: "yellow", note: { en: "LOW = white border", ru: "LOW = белая граница", kk: "LOW = ақ шет" } },
    { from: "board.5V", to: "edge_r.VCC", color: "red" },
    { from: "edge_r.GND", to: "board.GND", color: "black" },
    { from: "edge_r.DO", to: "board.D3", color: "green" },
    { from: "board.5V", to: "us.VCC", color: "red" },
    { from: "us.GND", to: "board.GND2", color: "black" },
    { from: "board.D11", to: "us.TRIG", color: "orange" },
    { from: "us.ECHO", to: "board.D12", color: "brown" },
    { from: "board.5V", to: "drv.VCC", color: "red", note: { en: "logic supply", ru: "питание логики", kk: "логика қуаты" } },
    { from: "board.D5", to: "drv.PWMA", color: "cyan", note: { en: "PWM, left speed", ru: "ШИМ, скорость левого", kk: "ШИМ, сол жақ жылдамдығы" } },
    { from: "board.D7", to: "drv.AIN1", color: "pink" },
    { from: "board.D8", to: "drv.AIN2", color: "purple" },
    { from: "board.D6", to: "drv.PWMB", color: "blue", note: { en: "PWM, right speed", ru: "ШИМ, скорость правого", kk: "ШИМ, оң жақ жылдамдығы" } },
    { from: "board.D4", to: "drv.BIN1", color: "gray" },
    { from: "board.D10", to: "drv.BIN2", color: "white" },
    { from: "board.D9", to: "drv.STBY", color: "yellow", note: { en: "HIGH enables the driver", ru: "HIGH включает драйвер", kk: "HIGH драйверді қосады" } },
    { from: "drv.AO1", to: "m1.+", color: "red" },
    { from: "drv.AO2", to: "m1.-", color: "black" },
    { from: "drv.BO1", to: "m2.+", color: "red" },
    { from: "drv.BO2", to: "m2.-", color: "black" },
    { from: "board.A3", to: "btn.1", color: "green", note: { en: "internal pull-up", ru: "внутренняя подтяжка", kk: "ішкі тарту" } },
    { from: "btn.2", to: "board.GND2", color: "black" },
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "drv.VM", color: "red", note: { en: "motor supply 7.4–8.4 V; sketch caps PWM at ~6 V", ru: "питание моторов 7,4–8,4 В; скетч ограничивает ШИМ до ~6 В", kk: "мотор қуаты 7,4–8,4 В; скетч ШИМ-ді ~6 В-қа шектейді" } },
    { from: "sw.1", to: "board.VIN", color: "red", note: { en: "Nano supply (VIN 7–12 V)", ru: "питание Nano (VIN 7–12 В)", kk: "Nano қуаты (VIN 7–12 В)" } },
    { from: "bat.-", to: "drv.GND", color: "black" },
    { from: "drv.GND", to: "board.GND", color: "black", note: { en: "common ground", ru: "общая земля", kk: "ортақ жер" } },
  ],
  steps: [
    {
      title: { en: "Build a low, heavy chassis", ru: "Соберите низкое и тяжёлое шасси", kk: "Аласа әрі ауыр шасси жинаңыз" },
      body: {
        en: "Assemble the 2WD kit with the caster at the back, so the front is free for a scoop. Bend a strip of thin sheet metal or cut a plastic wedge and fix it across the front, its lower edge almost touching the floor: it slides under the opponent and lifts it. Mount the battery as low as possible. Note: a TT-motor robot is larger than official mini-sumo (10 × 10 cm, 500 g), so it is built for classroom and club rings.",
        ru: "Соберите набор 2WD так, чтобы опорное колесо было сзади, а перед оставался свободным для «ковша». Согните полоску тонкой жести или вырежьте пластиковый клин и закрепите его поперёк передней части, нижней кромкой почти у пола: он подлезает под соперника и приподнимает его. Аккумулятор ставьте как можно ниже. Учтите: робот на моторах TT больше официального мини-сумо (10 × 10 см, 500 г), поэтому он рассчитан на школьные и клубные ринги.",
        kk: "2WD жинағын тірек дөңгелек артта болатындай етіп құрастырыңыз, алдыңғы жағы «күрекке» бос қалсын. Жұқа қаңылтыр жолағын иіп немесе пластик сына кесіп, алдыңғы жағына көлденең бекітіңіз, төменгі жиегі еденге тиер-тимес болсын: ол қарсыластың астына кіріп, оны көтереді. Аккумуляторды мүмкіндігінше төмен орнатыңыз. Ескеріңіз: TT моторлы робот ресми мини-сумодан (10 × 10 см, 500 г) үлкен, сондықтан ол мектеп пен клуб рингтеріне арналған.",
      },
      expect: { en: "The robot sits low, with a scoop at the front and nothing dragging.", ru: "Робот сидит низко, спереди «ковш», ничего не цепляет пол.", kk: "Робот аласа отыр, алдында «күрек», ештеңе еденге ілінбейді." },
      mistake: { en: "A scoop that touches the floor drags and slows the robot; leave a gap the thickness of a sheet of paper.", ru: "«Ковш», касающийся пола, тормозит робота; оставьте зазор толщиной в лист бумаги.", kk: "Еденге тиіп тұрған «күрек» роботты тежейді; бір парақ қағаз қалыңдығындай саңылау қалдырыңыз." },
    },
    {
      title: { en: "Fit the border sensors and the ultrasonic eyes", ru: "Установите датчики границы и ультразвуковые «глаза»", kk: "Шет датчиктері мен ультрадыбыстық «көздерді» орнатыңыз" },
      body: {
        en: "Mount the two TCRT5000 modules at the front corners, facing down, 3–5 mm above the floor. Wire VCC to 5V, GND to GND, left DO to D2 and right DO to D3. Mount the HC-SR04 facing forward just above the scoop: VCC to 5V, GND to GND, TRIG to D11, ECHO to D12.",
        ru: "Закрепите два модуля TCRT5000 в передних углах лицом вниз, на 3–5 мм над полом. Подключите VCC к 5V, GND к GND, DO левого к D2, правого к D3. HC-SR04 закрепите лицом вперёд чуть выше «ковша»: VCC к 5V, GND к GND, TRIG к D11, ECHO к D12.",
        kk: "Екі TCRT5000 модулін алдыңғы бұрыштарға төмен қаратып, еденнен 3–5 мм биіктікте бекітіңіз. VCC-ті 5V-ке, GND-ті GND-ге, сол модульдің DO-ын D2-ге, оңынікін D3-ке қосыңыз. HC-SR04-ті «күректен» сәл жоғары, алға қаратып бекітіңіз: VCC → 5V, GND → GND, TRIG → D11, ECHO → D12.",
      },
      expect: { en: "Over the black ring the TCRT5000 LEDs are off; over the white border they light up.", ru: "Над чёрным рингом светодиоды TCRT5000 не горят, над белой границей загораются.", kk: "Қара ринг үстінде TCRT5000 шамдары сөнік, ақ шет үстінде жанады." },
      mistake: { en: "Mounting the TCRT5000 more than 1 cm up makes it miss the white line at speed.", ru: "Если поднять TCRT5000 выше 1 см, на скорости он пропускает белую линию.", kk: "TCRT5000-ді 1 см-ден биік қойсаңыз, жылдамдықта ақ сызықты байқамай қалады." },
    },
    {
      title: { en: "Wire the TB6612FNG", ru: "Подключите TB6612FNG", kk: "TB6612FNG-ні қосыңыз" },
      body: {
        en: "Put the TB6612FNG on the breadboard next to the Nano. VCC to 5V (logic), VM to the switched battery + (motors), GND to the common ground. Left motor on AO1/AO2, right motor on BO1/BO2. Signals: PWMA → D5, AIN1 → D7, AIN2 → D8, PWMB → D6, BIN1 → D4, BIN2 → D10, STBY → D9.",
        ru: "Поставьте TB6612FNG на макетку рядом с Nano. VCC на 5V (логика), VM на плюс аккумулятора после выключателя (моторы), GND на общую землю. Левый мотор на AO1/AO2, правый на BO1/BO2. Сигналы: PWMA → D5, AIN1 → D7, AIN2 → D8, PWMB → D6, BIN1 → D4, BIN2 → D10, STBY → D9.",
        kk: "TB6612FNG-ні макет тақтасына Nano-ның қасына қойыңыз. VCC → 5V (логика), VM → қосқыштан кейінгі аккумулятор плюсы (моторлар), GND → ортақ жер. Сол мотор AO1/AO2-ге, оң мотор BO1/BO2-ге. Сигналдар: PWMA → D5, AIN1 → D7, AIN2 → D8, PWMB → D6, BIN1 → D4, BIN2 → D10, STBY → D9.",
      },
      expect: { en: "The driver has two supplies: 5 V logic from the Nano and battery voltage on VM.", ru: "У драйвера два питания: логика 5 В от Nano и напряжение аккумулятора на VM.", kk: "Драйвердің екі қуаты бар: Nano-дан 5 В логика және VM-дегі аккумулятор кернеуі." },
      mistake: { en: "Putting the battery on VCC instead of VM destroys the TB6612 logic (VCC max 5.5 V).", ru: "Если подать аккумулятор на VCC вместо VM, логика TB6612 сгорит (VCC максимум 5,5 В).", kk: "Аккумуляторды VM орнына VCC-ке берсеңіз, TB6612 логикасы күйеді (VCC ең көбі 5,5 В)." },
    },
    {
      title: { en: "Add power and the START button", ru: "Подключите питание и кнопку СТАРТ", kk: "Қуат пен СТАРТ батырмасын қосыңыз" },
      body: {
        en: "Battery + goes through the slide switch to TB6612 VM and to Nano VIN. Battery − goes to the TB6612 GND and from there to Nano GND. The START button sits between A3 and GND; the sketch uses the internal pull-up. The TT motors are rated 6 V, so the sketch limits PWM to 180 of 255, which averages about 6 V from a full 8.4 V pack.",
        ru: "Плюс аккумулятора через выключатель идёт на VM TB6612 и на VIN Nano. Минус на GND TB6612 и оттуда на GND Nano. Кнопка СТАРТ стоит между A3 и GND, скетч включает внутреннюю подтяжку. Моторы TT рассчитаны на 6 В, поэтому скетч ограничивает ШИМ значением 180 из 255, что в среднем даёт около 6 В от полного аккумулятора 8,4 В.",
        kk: "Аккумулятор плюсы қосқыш арқылы TB6612 VM-ге және Nano VIN-ге барады. Минусы TB6612 GND-іне, одан Nano GND-іне. СТАРТ батырмасы A3 пен GND арасында тұр, скетч ішкі тартуды қосады. TT моторлары 6 В-қа есептелген, сондықтан скетч ШИМ-ді 255-тің 180-імен шектейді, бұл толық 8,4 В аккумулятордан орташа шамамен 6 В береді.",
      },
      expect: { en: "Switch on: the Nano lights up, the wheels stay still until START.", ru: "При включении Nano загорается, колёса стоят до нажатия СТАРТ.", kk: "Қосқанда Nano жанады, СТАРТ басылғанша доңғалақтар қозғалмайды." },
      mistake: { en: "Raising MAX_PWM to 255 runs 8.4 V through 6 V motors: more push for a while, then burnt brushes and a hot driver.", ru: "Если поднять MAX_PWM до 255, на моторы 6 В пойдёт 8,4 В: какое-то время толкает сильнее, потом сгоревшие щётки и горячий драйвер.", kk: "MAX_PWM-ді 255-ке көтерсеңіз, 6 В моторларға 8,4 В түседі: біраз уақыт қаттырақ итереді, кейін щеткалар күйіп, драйвер қызады." },
    },
    {
      title: { en: "Upload, tune and fight", ru: "Загрузите, настройте и в бой", kk: "Жүктеп, баптап, жекпе-жекке" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. Place the robot in the ring and turn each TCRT5000 pot until its LED is off on black and on over the white border. Press START: the onboard LED blinks for the 5-second rule delay, then the robot spins and searches. Put a box in the ring: it should lock on, charge and push, and back off whenever a corner touches the white line.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Поставьте робота в ринг и подкрутите резистор каждого TCRT5000 так, чтобы светодиод не горел на чёрном и загорался над белой границей. Нажмите СТАРТ: встроенный светодиод мигает 5 секунд, как требуют правила, затем робот крутится и ищет. Поставьте в ринг коробку: робот должен навестись, разогнаться и толкать, а при касании белой линии любым углом отъезжать.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Роботты рингке қойып, әр TCRT5000 потенциометрін шамы қарада сөніп, ақ шет үстінде жанатындай етіп бұраңыз. СТАРТ басыңыз: ереже талап ететін 5 секунд бойы кіріктірілген шам жыпылықтайды, содан кейін робот айналып іздейді. Рингке қорап қойыңыз: робот оны тауып, шабуылдап, итеруі керек, ал кез келген бұрышы ақ сызыққа тисе, кері шегінуі тиіс.",
      },
      expect: { en: "\"target … attack\" when it sees the box, \"edge …\" at the border, never driving out by itself.", ru: "«target … attack», когда видит коробку, «edge …» у границы, и сам из ринга не выезжает.", kk: "Қорапты көргенде «target … attack», шетте «edge …», өзі рингтен шықпайды." },
      mistake: { en: "Testing on a light-coloured floor: every spot looks like the border and the robot only reverses.", ru: "Проверка на светлом полу: везде «граница», и робот только сдаёт назад.", kk: "Ашық түсті еденде тексеру: барлық жер «шет» болып көрінеді де, робот тек артқа шегінеді." },
    },
  ],
  code: [{
    filename: "sumo_robot.ino",
    language: "cpp",
    libraries: [],
    source: `// Sumo robot: 2x TCRT5000 border sensors + HC-SR04 + TB6612FNG on Arduino Nano
const int EDGE_L = 2, EDGE_R = 3;        // TCRT5000 DO: LOW = white border under the sensor
const int TRIG = 11, ECHO = 12;
const int PWMA = 5, AIN1 = 7, AIN2 = 8;  // left motor
const int PWMB = 6, BIN1 = 4, BIN2 = 10; // right motor
const int STBY = 9;
const int START_BTN = A3;

const int MAX_PWM = 180;      // ~6 V average from a full 2S pack: TT motors are 6 V parts
const int SEARCH_PWM = 120;
const int RANGE_CM = 60;      // anything closer than this is the opponent

enum State { SEARCH, ATTACK };
State state = SEARCH;
unsigned long lastSeen = 0;

void side(int pwmPin, int in1, int in2, int pwm) {
  digitalWrite(in1, pwm > 0 ? HIGH : LOW);
  digitalWrite(in2, pwm < 0 ? HIGH : LOW);
  analogWrite(pwmPin, constrain(abs(pwm), 0, MAX_PWM));
}

void motors(int left, int right) {
  side(PWMA, AIN1, AIN2, left);
  side(PWMB, BIN1, BIN2, right);
}

int distanceCm() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  unsigned long us = pulseIn(ECHO, HIGH, 6000UL);   // ~1 m max keeps the loop fast
  return us == 0 ? 999 : us / 58;
}

void enter(State s) {
  if (s == state) return;
  state = s;
  if (s == SEARCH) Serial.println("search");
}

void escape(bool l, bool r) {
  Serial.print("edge ");
  Serial.print(l && r ? "BOTH" : l ? "LEFT" : "RIGHT");
  Serial.println(l && !r ? " -> back, turn right" : " -> back, turn left");
  motors(-MAX_PWM, -MAX_PWM);
  delay(250);
  if (l && !r) motors(MAX_PWM, -MAX_PWM);
  else motors(-MAX_PWM, MAX_PWM);
  delay(l && r ? 350 : 200);
  state = ATTACK;            // force a fresh "search" message
  enter(SEARCH);
}

void setup() {
  pinMode(EDGE_L, INPUT); pinMode(EDGE_R, INPUT);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  pinMode(PWMA, OUTPUT); pinMode(AIN1, OUTPUT); pinMode(AIN2, OUTPUT);
  pinMode(PWMB, OUTPUT); pinMode(BIN1, OUTPUT); pinMode(BIN2, OUTPUT);
  pinMode(STBY, OUTPUT);
  pinMode(START_BTN, INPUT_PULLUP);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(STBY, LOW);   // driver off until the match starts
  Serial.begin(9600);
  Serial.println("sumo ready, press START");

  while (digitalRead(START_BTN) == HIGH) {}
  Serial.println("start pressed, 5 s countdown");
  for (int i = 0; i < 10; i++) {           // rules: do not move for 5 s
    digitalWrite(LED_BUILTIN, i % 2 == 0);
    delay(500);
  }
  digitalWrite(LED_BUILTIN, LOW);
  digitalWrite(STBY, HIGH);
  Serial.println("GO");
  state = ATTACK;
  enter(SEARCH);
}

void loop() {
  bool l = digitalRead(EDGE_L) == LOW;
  bool r = digitalRead(EDGE_R) == LOW;
  if (l || r) { escape(l, r); return; }    // staying in the ring beats everything

  int d = distanceCm();
  if (d < RANGE_CM) {
    if (state != ATTACK) {
      Serial.print("target "); Serial.print(d); Serial.println(" cm, attack");
    }
    state = ATTACK;
    lastSeen = millis();
    motors(MAX_PWM, MAX_PWM);
  } else if (state == ATTACK && millis() - lastSeen < 300) {
    motors(MAX_PWM, MAX_PWM);              // keep pushing through short echo dropouts
  } else {
    if (state == ATTACK) Serial.println("lost target");
    enter(SEARCH);
    motors(SEARCH_PWM, -SEARCH_PWM);       // spin right on the spot
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "It drives straight out of the ring", ru: "Робот выезжает прямо за ринг", kk: "Робот рингтен тура шығып кетеді" },
      cause: { en: "The TCRT5000 threshold is wrong, or the sensors sit too high to see the 2.5 cm white border at speed.", ru: "Неверно настроен порог TCRT5000, или датчики стоят слишком высоко и на скорости не видят белую полосу 2,5 см.", kk: "TCRT5000 шегі дұрыс бапталмаған немесе датчиктер тым биік тұр да, жылдамдықта 2,5 см ақ жолақты көрмейді." },
      fix: { en: "Lower the sensors to 3–5 mm and re-tune the pots on the actual ring surface.", ru: "Опустите датчики до 3–5 мм и перенастройте резисторы прямо на поверхности ринга.", kk: "Датчиктерді 3–5 мм-ге түсіріп, потенциометрлерді ринг бетінің өзінде қайта баптаңыз." },
    },
    {
      symptom: { en: "It charges at nothing or ignores the opponent", ru: "Атакует пустоту или не замечает соперника", kk: "Бос кеңістікке шабуылдайды немесе қарсыласты байқамайды" },
      cause: { en: "The HC-SR04 sees the floor or the audience beyond the ring, or the opponent is too low and angled.", ru: "HC-SR04 видит пол или зрителей за рингом, либо соперник слишком низкий и скошенный.", kk: "HC-SR04 еденді не ринг сыртындағы көрермендерді көреді немесе қарсылас тым аласа әрі қиғаш." },
      fix: { en: "Aim the sensor level, 3–5 cm above the floor, and lower RANGE_CM to the ring size (for a 77 cm ring, 60 cm).", ru: "Направьте датчик горизонтально на высоте 3–5 см и уменьшите RANGE_CM под размер ринга (для ринга 77 см — 60 см).", kk: "Датчикті еденнен 3–5 см биіктікте көлденең бағыттап, RANGE_CM-ді ринг өлшеміне қарай азайтыңыз (77 см ринг үшін 60 см)." },
    },
    {
      symptom: { en: "The robot stops pushing after a few seconds of a stall", ru: "Робот перестаёт толкать через несколько секунд упора", kk: "Тіреліп тұрғаннан кейін бірнеше секундта робот итеруді тоқтатады" },
      cause: { en: "The TB6612FNG overheats and its thermal shutdown cuts the motors, or the battery sags.", ru: "TB6612FNG перегревается и срабатывает тепловая защита, или проседает аккумулятор.", kk: "TB6612FNG қызып, жылу қорғанысы моторларды өшіреді немесе аккумулятор кернеуі түседі." },
      fix: { en: "Keep MAX_PWM at 180 or below, give the driver some airflow and use a charged pack.", ru: "Держите MAX_PWM не выше 180, дайте драйверу воздух и используйте заряженный аккумулятор.", kk: "MAX_PWM-ді 180-нен асырмаңыз, драйверге ауа беріңіз және зарядталған аккумулятор пайдаланыңыз." },
    },
  ],
  safety: [
    { en: "Keep fingers away from the scoop and wheels after pressing START; the robot moves at full power after 5 seconds.", ru: "После нажатия СТАРТ уберите пальцы от «ковша» и колёс: через 5 секунд робот поедет на полной мощности.", kk: "СТАРТ басқаннан кейін саусақтарды «күрек» пен доңғалақтардан алыс ұстаңыз: 5 секундтан соң робот толық қуатпен қозғалады." },
    { en: "Charge the 2S pack only with a balance charger and never leave it charging unattended.", ru: "Заряжайте аккумулятор 2S только балансирным зарядником и не оставляйте без присмотра.", kk: "2S аккумуляторын тек баланстық зарядтағышпен зарядтаңыз және қараусыз қалдырмаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["sumo ready, press START", "start pressed, 5 s countdown", "GO", "search", "target 42 cm, attack", "lost target", "search", "target 18 cm, attack", "edge LEFT -> back, turn right", "search", "target 9 cm, attack"],
    leds: [{ label: "PWR", color: "#7CB342" }, { label: "L", color: "#F57C00" }, { label: "EDGE L", color: "#E53935" }, { label: "EDGE R", color: "#E53935" }],
  },
} satisfies GuideContent;
