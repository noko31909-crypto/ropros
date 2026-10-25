import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "edge-avoiding-desk-robot",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "robotics",
  robotics: true,
  difficulty: "intermediate",
  hours: 4,
  costUsd: 34,
  xpReward: 210,
  title: {
    en: "Edge-Avoiding Desk Robot",
    ru: "Робот, который не падает со стола",
    kk: "Үстелден құламайтын робот",
  },
  summary: {
    en: "Two downward-facing IR sensors at the front corners watch the table surface. When one of them sees empty air the robot brakes, backs up and turns away, so it can roam a desk without falling off.",
    ru: "Два ИК-датчика в передних углах смотрят вниз на поверхность стола. Когда один из них видит пустоту, робот тормозит, сдаёт назад и отворачивает, поэтому может кататься по столу и не падать.",
    kk: "Алдыңғы бұрыштардағы екі ИҚ датчик төмен, үстел бетіне қарайды. Біреуі бос кеңістікті көрсе, робот тежеп, артқа шегініп, бұрылып кетеді, сондықтан үстел үстінде құламай жүре алады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, powered through VIN", ru: "логика 5 В, питание через VIN", kk: "5 В логика, VIN арқылы қуат" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "ir-obstacle", qty: 2, spec: { en: "FC-51, OUT goes LOW when it sees a surface", ru: "FC-51, OUT становится LOW, когда видит поверхность", kk: "FC-51, бетті көргенде OUT LOW болады" }, role: { en: "Left and right edge sensors, facing down", ru: "Левый и правый датчики края, смотрят вниз", kk: "Төмен қараған сол және оң жиек датчиктері" } },
    { component: "l298n", qty: 1, spec: { en: "dual H-bridge, 2 A per channel", ru: "двойной H-мост, 2 А на канал", kk: "қос H-көпір, арнаға 2 А" }, role: { en: "Drives and brakes both motors", ru: "Управляет моторами и тормозит их", kk: "Моторларды басқарады және тежейді" } },
    { component: "dc-motor", qty: 2, spec: { en: "TT gear motor 3–6 V (comes with the chassis)", ru: "мотор-редуктор TT 3–6 В (идёт с шасси)", kk: "TT редукторлы мотор 3–6 В (шассимен бірге)" }, role: { en: "Left and right wheels", ru: "Левое и правое колёса", kk: "Сол және оң доңғалақтар" } },
    { component: "robot-chassis-2wd", qty: 1, spec: { en: "acrylic plate, 2 wheels + caster", ru: "акриловая платформа, 2 колеса + опорное", kk: "акрил платформа, 2 доңғалақ + тірек дөңгелек" }, role: { en: "Frame", ru: "Рама", kk: "Рама" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V, 1000–2200 mAh", ru: "7,4 В, 1000–2200 мА·ч", kk: "7,4 В, 1000–2200 мА·сағ" }, role: { en: "Power for motors and Arduino", ru: "Питание моторов и Arduino", kk: "Моторлар мен Arduino қуаты" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT, rated 2 A or more", ru: "SPDT, на ток от 2 А", kk: "SPDT, 2 А не одан жоғары токқа" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі қосқыш" } },
    { component: "jumper-wires", qty: 20, spec: { en: "male-female for the sensors", ru: "папа-мама для датчиков", kk: "датчиктерге аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ir_l", component: "ir-obstacle", label: "Edge left" },
    { id: "ir_r", component: "ir-obstacle", label: "Edge right" },
    { id: "drv", component: "l298n", label: "L298N" },
    { id: "m1", component: "dc-motor", label: "Left motor" },
    { id: "m2", component: "dc-motor", label: "Right motor" },
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
  ],
  connections: [
    { from: "board.5V", to: "ir_l.VCC", color: "red" },
    { from: "ir_l.GND", to: "board.GND", color: "black" },
    { from: "ir_l.OUT", to: "board.D2", color: "yellow", note: { en: "LOW = table, HIGH = edge", ru: "LOW = стол, HIGH = край", kk: "LOW = үстел, HIGH = жиек" } },
    { from: "board.5V", to: "ir_r.VCC", color: "red" },
    { from: "ir_r.GND", to: "board.GND2", color: "black" },
    { from: "ir_r.OUT", to: "board.D3", color: "green" },
    { from: "board.D5", to: "drv.ENA", color: "cyan", note: { en: "PWM, left speed (remove the ENA jumper)", ru: "ШИМ, скорость левого (снимите перемычку ENA)", kk: "ШИМ, сол жақ жылдамдығы (ENA секіргішін алыңыз)" } },
    { from: "board.D7", to: "drv.IN1", color: "pink" },
    { from: "board.D8", to: "drv.IN2", color: "purple" },
    { from: "board.D6", to: "drv.ENB", color: "blue", note: { en: "PWM, right speed (remove the ENB jumper)", ru: "ШИМ, скорость правого (снимите перемычку ENB)", kk: "ШИМ, оң жақ жылдамдығы (ENB секіргішін алыңыз)" } },
    { from: "board.D10", to: "drv.IN3", color: "orange" },
    { from: "board.D11", to: "drv.IN4", color: "gray" },
    { from: "drv.OUT1", to: "m1.+", color: "red" },
    { from: "drv.OUT2", to: "m1.-", color: "black" },
    { from: "drv.OUT3", to: "m2.+", color: "red" },
    { from: "drv.OUT4", to: "m2.-", color: "black" },
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "drv.12V", color: "red", note: { en: "motor supply 7.4–8.4 V", ru: "питание моторов 7,4–8,4 В", kk: "мотор қуаты 7,4–8,4 В" } },
    { from: "sw.1", to: "board.VIN", color: "red", note: { en: "Arduino supply (VIN 7–12 V)", ru: "питание Arduino (VIN 7–12 В)", kk: "Arduino қуаты (VIN 7–12 В)" } },
    { from: "bat.-", to: "drv.GND", color: "black" },
    { from: "drv.GND", to: "board.GND3", color: "black", note: { en: "common ground", ru: "общая земля", kk: "ортақ жер" } },
  ],
  steps: [
    {
      title: { en: "Build the chassis and pick the front", ru: "Соберите шасси и выберите перед", kk: "Шассиді құрастырып, алдыңғы жағын таңдаңыз" },
      body: {
        en: "Assemble the 2WD kit: motors, wheels and caster. Decide which end is the front: the robot always drives toward its sensors. Mount the battery low in the middle, the L298N and the Arduino above it, and the power switch at the back.",
        ru: "Соберите набор 2WD: моторы, колёса и опорное колесо. Решите, какой конец будет передом: робот всегда едет в сторону датчиков. Аккумулятор закрепите низко по центру, над ним L298N и Arduino, выключатель сзади.",
        kk: "2WD жинағын құрастырыңыз: моторлар, доңғалақтар және тірек дөңгелек. Қай жағы алды болатынын шешіңіз: робот әрқашан датчиктер жаққа жүреді. Аккумуляторды төмен әрі ортаға, оның үстіне L298N мен Arduino-ны, ал қосқышты артқа бекітіңіз.",
      },
      expect: { en: "A rolling chassis with a clear front end.", ru: "Шасси катится, перед понятно где.", kk: "Шасси домалайды, алдыңғы жағы анық." },
      mistake: { en: "Heavy parts hanging over the front shift the weight forward, and the robot tips over the edge before it can stop.", ru: "Тяжёлые детали, свисающие спереди, смещают вес вперёд, и робот опрокидывается с края раньше, чем успеет остановиться.", kk: "Алдынан салбырап тұрған ауыр бөлшектер салмақты алға ығыстырады да, робот тоқтап үлгермей жиектен аударылады." },
    },
    {
      title: { en: "Mount the edge sensors facing down", ru: "Закрепите датчики края лицом вниз", kk: "Жиек датчиктерін төмен қаратып бекітіңіз" },
      body: {
        en: "Fix one FC-51 at each front corner with the IR LEDs pointing straight at the table, about 1 cm above it. Both sensors must stick out at least 3 cm ahead of whatever touches the table first (wheel or caster), so the robot sees the edge before any wheel reaches it. Wire VCC to 5V, GND to GND, left OUT to D2 and right OUT to D3.",
        ru: "Закрепите по одному FC-51 в каждом переднем углу так, чтобы ИК-светодиоды смотрели прямо в стол с высоты около 1 см. Оба датчика должны выступать минимум на 3 см вперёд того, что первым касается стола (колесо или опорное колесо), чтобы робот видел край раньше, чем до него доедет колесо. Подключите VCC к 5V, GND к GND, OUT левого к D2, правого к D3.",
        kk: "Әр алдыңғы бұрышқа бір FC-51-ден бекітіңіз, ИҚ диодтары үстелге тура, шамамен 1 см биіктіктен қарасын. Екі датчик те үстелге бірінші тиетін бөліктен (доңғалақ не тірек дөңгелек) кемінде 3 см алға шығып тұруы керек, сонда робот жиекті доңғалақ жеткенше көреді. VCC-ті 5V-ке, GND-ті GND-ге, сол датчиктің OUT-ын D2-ге, оңынікін D3-ке қосыңыз.",
      },
      expect: { en: "Both sensors hang just above the surface, ahead of the wheels.", ru: "Оба датчика висят чуть над поверхностью, впереди колёс.", kk: "Екі датчик те беттен сәл жоғары, доңғалақтардың алдында тұр." },
      mistake: { en: "Sensors mounted behind the caster only see the edge after the caster has already dropped.", ru: "Датчики за опорным колесом увидят край, только когда колесо уже провалилось.", kk: "Тірек дөңгелектің артындағы датчиктер жиекті дөңгелек түсіп кеткенде ғана көреді." },
    },
    {
      title: { en: "Tune the sensor threshold", ru: "Настройте порог датчиков", kk: "Датчик шегін баптаңыз" },
      body: {
        en: "Power the Arduino over USB and set the robot on the table. Each FC-51 has a small potentiometer and an indicator LED that lights when it sees a surface. Turn the pot until the LED is on over the table and goes out when you slide that corner over the edge. Check on the actual desk: dark, glossy or glass tops reflect much less IR.",
        ru: "Подайте питание на Arduino по USB и поставьте робота на стол. На каждом FC-51 есть подстроечный резистор и светодиод, который горит, когда датчик видит поверхность. Крутите резистор, пока светодиод не будет гореть над столом и гаснуть, когда этот угол выдвинут за край. Проверяйте на том столе, где будет ездить робот: тёмные, глянцевые и стеклянные столешницы отражают ИК намного хуже.",
        kk: "Arduino-ға USB арқылы қуат беріп, роботты үстелге қойыңыз. Әр FC-51-де шағын потенциометр және бетті көргенде жанатын индикатор шам бар. Шам үстел үстінде жанып, сол бұрышты жиектен шығарғанда сөнетіндей етіп потенциометрді бұраңыз. Робот жүретін үстелдің өзінде тексеріңіз: күңгірт, жылтыр және шыны беттер ИҚ сәулені әлдеқайда нашар шағылыстырады.",
      },
      expect: { en: "LED on over the table, off over the edge, on both sensors.", ru: "На обоих датчиках светодиод горит над столом и гаснет за краем.", kk: "Екі датчикте де шам үстел үстінде жанады, жиектен шыққанда сөнеді." },
      mistake: { en: "Turning the pot too far makes the sensor see the floor a metre below, so it never reports an edge.", ru: "Если перекрутить резистор, датчик начнёт «видеть» пол в метре ниже и никогда не заметит край.", kk: "Потенциометрді тым көп бұрасаңыз, датчик бір метр төмендегі еденді «көріп», жиекті ешқашан байқамайды." },
    },
    {
      title: { en: "Wire the L298N and the power", ru: "Подключите L298N и питание", kk: "L298N мен қуатты қосыңыз" },
      body: {
        en: "Left motor to OUT1/OUT2, right motor to OUT3/OUT4. Remove the ENA/ENB jumpers and wire ENA → D5, IN1 → D7, IN2 → D8, ENB → D6, IN3 → D10, IN4 → D11. Battery + goes through the switch to the L298N 12V terminal and to Arduino VIN; battery − to L298N GND and from there to Arduino GND.",
        ru: "Левый мотор на OUT1/OUT2, правый на OUT3/OUT4. Снимите перемычки ENA/ENB и подключите ENA → D5, IN1 → D7, IN2 → D8, ENB → D6, IN3 → D10, IN4 → D11. Плюс аккумулятора через выключатель идёт на клемму 12V L298N и на VIN Arduino; минус на GND L298N и оттуда на GND Arduino.",
        kk: "Сол моторды OUT1/OUT2-ге, оңын OUT3/OUT4-ке қосыңыз. ENA/ENB секіргіштерін алып, ENA → D5, IN1 → D7, IN2 → D8, ENB → D6, IN3 → D10, IN4 → D11 қосыңыз. Аккумулятор плюсы қосқыш арқылы L298N 12V клеммасына және Arduino VIN-іне, минусы L298N GND-іне, одан Arduino GND-іне барады.",
      },
      expect: { en: "Switching on lights the L298N and Arduino power LEDs.", ru: "При включении загораются светодиоды питания L298N и Arduino.", kk: "Қосқанда L298N мен Arduino қуат шамдары жанады." },
      mistake: { en: "A missing GND wire between the L298N and the Arduino makes the motors ignore the sketch.", ru: "Без провода GND между L298N и Arduino моторы не слушаются скетча.", kk: "L298N мен Arduino арасында GND сымы болмаса, моторлар скетчке бағынбайды." },
    },
    {
      title: { en: "Upload and test on a low platform", ru: "Загрузите скетч и проверьте на низкой площадке", kk: "Скетчті жүктеп, аласа алаңда тексеріңіз" },
      body: {
        en: "Upload the sketch, open the Serial Monitor at 115200 baud and lift the robot: it prints \"waiting for table\" and keeps the wheels still. Before trusting it on a desk, put it on a large book or a box on the floor, so a mistake costs a short drop. Set it down: after one second on the surface it drives, and at each edge it brakes, backs up and turns away from the side that saw air.",
        ru: "Загрузите скетч, откройте Serial Monitor на 115200 бод и поднимите робота: он печатает «waiting for table» и не крутит колёса. Прежде чем доверять ему стол, поставьте его на большую книгу или коробку на полу, чтобы ошибка стоила небольшого падения. Поставьте его: через секунду на поверхности он поедет, а у каждого края будет тормозить, сдавать назад и отворачивать от стороны, увидевшей пустоту.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 115200 бодта ашыңыз да, роботты көтеріңіз: ол «waiting for table» деп шығарып, доңғалақтарды айналдырмайды. Оған үстелді сеніп тапсырмас бұрын, еденде тұрған үлкен кітапқа немесе қорапқа қойыңыз, сонда қате аз ғана биіктіктен құлаумен бітеді. Роботты қойыңыз: бетте бір секунд тұрған соң жүреді, ал әр жиекте тежеп, артқа шегініп, бос кеңістікті көрген жақтан бұрылады.",
      },
      expect: { en: "Ten laps of the box without a wheel going over.", ru: "Десять кругов по коробке, и ни одно колесо не соскочило.", kk: "Қорап үстінде он айналым, бірде-бір доңғалақ шетке шықпайды." },
      mistake: { en: "Raising CRUISE for more speed also lengthens the braking distance; keep the sensors' lead larger than that distance.", ru: "Если поднять CRUISE ради скорости, вырастет и тормозной путь; вынос датчиков должен быть больше этого пути.", kk: "Жылдамдық үшін CRUISE-ті көтерсеңіз, тежелу жолы да ұзарады; датчиктердің алға шығуы осы жолдан ұзын болуы керек." },
    },
  ],
  code: [{
    filename: "edge_avoiding_robot.ino",
    language: "cpp",
    libraries: [],
    source: `// Edge-avoiding desk robot: 2x FC-51 facing down + L298N on Arduino Uno
const int EDGE_L = 2, EDGE_R = 3;       // FC-51 OUT: LOW = surface seen, HIGH = edge / air
const int ENA = 5, IN1 = 7, IN2 = 8;    // left motor
const int ENB = 6, IN3 = 10, IN4 = 11;  // right motor

const int CRUISE = 140;      // forward PWM; faster = longer braking distance
const int MANEUVER = 170;    // PWM while backing up and turning

bool airLeft()  { return digitalRead(EDGE_L) == HIGH; }
bool airRight() { return digitalRead(EDGE_R) == HIGH; }

void side(int en, int a, int b, int pwm) {
  digitalWrite(a, pwm > 0 ? HIGH : LOW);
  digitalWrite(b, pwm < 0 ? HIGH : LOW);
  analogWrite(en, abs(pwm));
}

void motors(int left, int right) {
  side(ENA, IN1, IN2, left);
  side(ENB, IN3, IN4, right);
}

void brake() {               // both inputs HIGH = L298N shorts the motor: fast stop
  digitalWrite(IN1, HIGH); digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, HIGH);
  analogWrite(ENA, 255); analogWrite(ENB, 255);
  delay(80);
  motors(0, 0);
}

void waitForTable() {        // robot lifted (or started in the air): wait for 1 s of solid ground
  motors(0, 0);
  Serial.println("waiting for table");
  unsigned long since = 0;
  while (true) {
    if (!airLeft() && !airRight()) {
      if (since == 0) since = millis();
      if (millis() - since > 1000) break;
    } else {
      since = 0;
    }
    delay(10);
  }
  Serial.println("on table, go");
}

void setup() {
  pinMode(EDGE_L, INPUT); pinMode(EDGE_R, INPUT);
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT); pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  motors(0, 0);
  Serial.begin(115200);
  Serial.println("edge robot ready");
  waitForTable();
  randomSeed(micros());      // time spent waiting is random enough for left/right choices
}

void loop() {
  bool l = airLeft(), r = airRight();
  if (!l && !r) {            // both corners on the table: keep going
    motors(CRUISE, CRUISE);
    return;
  }

  brake();
  Serial.print("edge ");
  Serial.println(l && r ? "BOTH" : l ? "LEFT" : "RIGHT");

  motors(-MANEUVER, -MANEUVER);          // back away from the edge
  delay(l && r ? 450 : 300);
  brake();

  if (airLeft() && airRight()) {         // still nothing below after reversing: we were picked up
    waitForTable();
    return;
  }

  bool turnRight = l && !r ? true : (r && !l ? false : random(2) == 0);
  Serial.println(turnRight ? "turn right" : "turn left");
  if (turnRight) motors(MANEUVER, -MANEUVER);
  else motors(-MANEUVER, MANEUVER);
  delay(l && r ? 650 : 380);             // a straight edge needs a bigger turn
  brake();
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The robot keeps reporting edges in the middle of the desk", ru: "Робот видит «край» посреди стола", kk: "Робот үстелдің ортасында «жиек» көреді" },
      cause: { en: "The desk is dark, glossy or glass and reflects too little IR, or the sensors sit too high.", ru: "Стол тёмный, глянцевый или стеклянный и плохо отражает ИК, либо датчики стоят слишком высоко.", kk: "Үстел күңгірт, жылтыр немесе шыны, ИҚ сәулені нашар шағылыстырады, не датчиктер тым биік тұр." },
      fix: { en: "Lower the sensors to about 1 cm, re-tune the pots on that desk, or lay a light-coloured mat on it.", ru: "Опустите датчики примерно до 1 см, перенастройте резисторы на этом столе или постелите светлый коврик.", kk: "Датчиктерді шамамен 1 см-ге түсіріп, потенциометрлерді сол үстелде қайта баптаңыз немесе ашық түсті кілемше төсеңіз." },
    },
    {
      symptom: { en: "It stops too late and a wheel goes over the edge", ru: "Робот тормозит поздно, колесо съезжает за край", kk: "Робот кеш тежейді, доңғалақ жиектен шығып кетеді" },
      cause: { en: "The sensors do not lead the wheels by enough, or CRUISE is too fast for the braking distance.", ru: "Датчики недостаточно выступают вперёд колёс, или CRUISE слишком велик для тормозного пути.", kk: "Датчиктер доңғалақтан жеткілікті алға шықпаған немесе CRUISE тежелу жолы үшін тым жылдам." },
      fix: { en: "Move the sensors further forward (3 cm or more) or lower CRUISE to 110–130.", ru: "Вынесите датчики дальше вперёд (3 см и больше) или уменьшите CRUISE до 110–130.", kk: "Датчиктерді алғарақ шығарыңыз (3 см не одан көп) немесе CRUISE-ті 110–130-ға дейін азайтыңыз." },
    },
    {
      symptom: { en: "It turns toward the edge instead of away from it", ru: "Робот поворачивает к краю, а не от него", kk: "Робот жиектен емес, жиекке қарай бұрылады" },
      cause: { en: "The left and right sensor wires are swapped, or one motor is wired backwards.", ru: "Перепутаны провода левого и правого датчиков, или один мотор подключён наоборот.", kk: "Сол және оң датчик сымдары ауысқан немесе бір мотор кері қосылған." },
      fix: { en: "Check that the left sensor goes to D2. Then send the robot forward: if one wheel spins backwards, swap that motor's leads.", ru: "Проверьте, что левый датчик идёт на D2. Затем пустите робота вперёд: если одно колесо крутится назад, поменяйте местами провода этого мотора.", kk: "Сол датчиктің D2-ге баратынын тексеріңіз. Содан кейін роботты алға жіберіңіз: бір доңғалақ кері айналса, сол мотордың сымдарын ауыстырыңыз." },
    },
  ],
  safety: [
    { en: "Test on a low box first; a robot falling from desk height can break itself or land on someone's foot.", ru: "Сначала проверяйте на низкой коробке: робот, упавший со стола, может сломаться или упасть кому-то на ногу.", kk: "Алдымен аласа қорапта тексеріңіз: үстелден құлаған робот сынып қалуы не біреудің аяғына түсуі мүмкін." },
    { en: "Charge the 2S pack only with a balance charger and never leave it charging unattended.", ru: "Заряжайте аккумулятор 2S только балансирным зарядником и не оставляйте без присмотра.", kk: "2S аккумуляторын тек баланстық зарядтағышпен зарядтаңыз және қараусыз қалдырмаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: ["edge robot ready", "waiting for table", "on table, go", "edge LEFT", "turn right", "edge RIGHT", "turn left", "edge BOTH", "turn left", "edge BOTH", "waiting for table", "on table, go"],
    leds: [{ label: "PWR", color: "#7CB342" }, { label: "IR L", color: "#E53935" }, { label: "IR R", color: "#E53935" }, { label: "ENA", color: "#00ACC1" }],
  },
} satisfies GuideContent;
