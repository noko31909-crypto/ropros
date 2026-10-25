import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "four-wheel-drive-rover",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "vehicles",
  robotics: true,
  difficulty: "intermediate",
  hours: 5,
  costUsd: 42,
  xpReward: 240,
  title: {
    en: "Four-Wheel-Drive Rover",
    ru: "Полноприводный ровер 4WD",
    kk: "Төрт доңғалақты жетекті ровер (4WD)",
  },
  summary: {
    en: "A skid-steer 4WD rover: one L298N drives the left and right motor pairs, the rover slows down as walls get close, stops, then turns its whole body to look left and right and heads for the side with more room.",
    ru: "Ровер 4WD с танковым поворотом: один L298N управляет левой и правой парами моторов, ровер замедляется у стены, останавливается, затем поворачивается всем корпусом, «смотрит» влево и вправо и едет туда, где больше места.",
    kk: "Танк сияқты бұрылатын 4WD ровер: бір L298N сол және оң мотор жұптарын басқарады, ровер қабырғаға жақындағанда баяулайды, тоқтайды, содан кейін бүкіл корпусымен бұрылып, солға және оңға «қарайды» да, орны көп жаққа жүреді.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, powered through VIN", ru: "логика 5 В, питание через VIN", kk: "5 В логика, VIN арқылы қуат" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "robot-chassis-4wd", qty: 1, spec: { en: "two-deck kit with 4 TT motors and wheels", ru: "двухэтажный набор с 4 моторами TT и колёсами", kk: "4 TT моторы мен доңғалағы бар екі қабатты жинақ" }, role: { en: "Frame", ru: "Рама", kk: "Рама" } },
    { component: "dc-motor", qty: 4, spec: { en: "TT gear motor 3–6 V (comes with the chassis)", ru: "мотор-редуктор TT 3–6 В (идёт с шасси)", kk: "TT редукторлы мотор 3–6 В (шассимен бірге)" }, role: { en: "One per wheel", ru: "По одному на колесо", kk: "Әр доңғалаққа біреуден" } },
    { component: "l298n", qty: 1, spec: { en: "2 A per channel, heatsink fitted", ru: "2 А на канал, с радиатором", kk: "арнаға 2 А, радиаторы бар" }, role: { en: "Left channel = both left motors, right channel = both right motors", ru: "Левый канал = оба левых мотора, правый канал = оба правых", kk: "Сол арна = екі сол мотор, оң арна = екі оң мотор" } },
    { component: "hc-sr04", qty: 1, spec: { en: "5 V, 2–400 cm", ru: "5 В, 2–400 см", kk: "5 В, 2–400 см" }, role: { en: "Obstacle distance", ru: "Расстояние до препятствия", kk: "Кедергіге дейінгі қашықтық" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V, 2200 mAh or more", ru: "7,4 В, от 2200 мА·ч", kk: "7,4 В, 2200 мА·сағ не одан көп" }, role: { en: "Power for motors and Arduino", ru: "Питание моторов и Arduino", kk: "Моторлар мен Arduino қуаты" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT, rated 3 A or more", ru: "SPDT, на ток от 3 А", kk: "SPDT, 3 А не одан жоғары токқа" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі қосқыш" } },
    { component: "jumper-wires", qty: 20, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "drv", component: "l298n", label: "L298N" },
    { id: "m_fl", component: "dc-motor", label: "Front left" },
    { id: "m_rl", component: "dc-motor", label: "Rear left" },
    { id: "m_fr", component: "dc-motor", label: "Front right" },
    { id: "m_rr", component: "dc-motor", label: "Rear right" },
    { id: "us", component: "hc-sr04", label: "Front sensor" },
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
  ],
  connections: [
    { from: "drv.OUT1", to: "m_fl.+", color: "red", note: { en: "left pair in parallel", ru: "левая пара параллельно", kk: "сол жұп параллель" } },
    { from: "drv.OUT2", to: "m_fl.-", color: "black" },
    { from: "drv.OUT1", to: "m_rl.+", color: "red" },
    { from: "drv.OUT2", to: "m_rl.-", color: "black" },
    { from: "drv.OUT3", to: "m_fr.+", color: "red", note: { en: "right pair in parallel", ru: "правая пара параллельно", kk: "оң жұп параллель" } },
    { from: "drv.OUT4", to: "m_fr.-", color: "black" },
    { from: "drv.OUT3", to: "m_rr.+", color: "red" },
    { from: "drv.OUT4", to: "m_rr.-", color: "black" },
    { from: "board.D5", to: "drv.ENA", color: "cyan", note: { en: "PWM, left side (remove the ENA jumper)", ru: "ШИМ, левый борт (снимите перемычку ENA)", kk: "ШИМ, сол жақ (ENA секіргішін алыңыз)" } },
    { from: "board.D7", to: "drv.IN1", color: "pink" },
    { from: "board.D8", to: "drv.IN2", color: "purple" },
    { from: "board.D6", to: "drv.ENB", color: "blue", note: { en: "PWM, right side (remove the ENB jumper)", ru: "ШИМ, правый борт (снимите перемычку ENB)", kk: "ШИМ, оң жақ (ENB секіргішін алыңыз)" } },
    { from: "board.D9", to: "drv.IN3", color: "orange" },
    { from: "board.D10", to: "drv.IN4", color: "gray" },
    { from: "board.5V", to: "us.VCC", color: "red" },
    { from: "us.GND", to: "board.GND", color: "black" },
    { from: "board.D11", to: "us.TRIG", color: "yellow" },
    { from: "us.ECHO", to: "board.D12", color: "green" },
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "drv.12V", color: "red", note: { en: "motor supply 7.4–8.4 V", ru: "питание моторов 7,4–8,4 В", kk: "мотор қуаты 7,4–8,4 В" } },
    { from: "sw.1", to: "board.VIN", color: "red", note: { en: "Arduino supply (VIN 7–12 V)", ru: "питание Arduino (VIN 7–12 В)", kk: "Arduino қуаты (VIN 7–12 В)" } },
    { from: "bat.-", to: "drv.GND", color: "black" },
    { from: "drv.GND", to: "board.GND2", color: "black", note: { en: "common ground", ru: "общая земля", kk: "ортақ жер" } },
  ],
  steps: [
    {
      title: { en: "Assemble the 4WD chassis", ru: "Соберите шасси 4WD", kk: "4WD шассиін құрастырыңыз" },
      body: {
        en: "Solder two leads to each of the four motors and bolt them to the lower deck, all with their solder tabs facing inward. Fit the wheels. Run the motor leads up through the centre hole, then mount the battery on the lower deck and the L298N, Arduino and switch on the upper deck.",
        ru: "Припаяйте по два провода к каждому из четырёх моторов и прикрутите их к нижней палубе, все контактами внутрь. Наденьте колёса. Выведите провода моторов наверх через центральное отверстие, затем закрепите аккумулятор на нижней палубе, а L298N, Arduino и выключатель на верхней.",
        kk: "Төрт мотордың әрқайсысына екі сымнан дәнекерлеп, барлығын түйіспелерін ішке қаратып төменгі палубаға бұраңыз. Доңғалақтарды кигізіңіз. Мотор сымдарын орталық тесік арқылы жоғары шығарып, аккумуляторды төменгі палубаға, ал L298N, Arduino және қосқышты жоғарғы палубаға бекітіңіз.",
      },
      expect: { en: "Four lead pairs come up through the deck, labelled FL, RL, FR, RR.", ru: "Через палубу выходят четыре пары проводов с метками FL, RL, FR, RR.", kk: "Палуба арқылы FL, RL, FR, RR белгісі бар төрт жұп сым шығады." },
      mistake: { en: "Unlabelled leads: after closing the deck it is hard to tell which pair belongs to which wheel.", ru: "Без меток после закрытия палубы трудно понять, какая пара от какого колеса.", kk: "Белгісіз сымдар: палубаны жапқаннан кейін қай жұптың қай доңғалақтікі екенін ажырату қиын." },
    },
    {
      title: { en: "Pair the motors on one L298N", ru: "Объедините моторы попарно на одном L298N", kk: "Моторларды бір L298N-ға жұптап қосыңыз" },
      body: {
        en: "A skid-steer rover only needs two speeds: left side and right side. So both left motors go in parallel on OUT1/OUT2 and both right motors on OUT3/OUT4 (two wires in each screw terminal). Two TT motors draw about 0.5 A while rolling and up to about 1.6 A when stalled, which one L298N channel (2 A) can handle. Use a second L298N, one channel per wheel, only if you fit bigger motors or the driver gets too hot to touch.",
        ru: "Ровер с танковым поворотом управляет только двумя скоростями: левого борта и правого. Поэтому оба левых мотора подключаются параллельно на OUT1/OUT2, а оба правых на OUT3/OUT4 (по два провода в каждой клемме). Два мотора TT потребляют около 0,5 А в движении и до ~1,6 А при упоре, с чем один канал L298N (2 А) справляется. Второй L298N, по каналу на колесо, нужен только для более мощных моторов или если драйвер греется так, что его не потрогать.",
        kk: "Танк сияқты бұрылатын ровер тек екі жылдамдықты басқарады: сол жақ пен оң жақ. Сондықтан екі сол мотор OUT1/OUT2-ге, екі оң мотор OUT3/OUT4-ке параллель қосылады (әр клеммада екі сымнан). Екі TT моторы жүргенде шамамен 0,5 А, тіреліп қалғанда ~1,6 А-ге дейін тұтынады, мұны L298N-ның бір арнасы (2 А) көтереді. Екінші L298N, әр доңғалаққа бір арнадан, тек қуатты моторлар қойсаңыз немесе драйвер ұстағысыз қызса ғана керек.",
      },
      expect: { en: "Each of OUT1–OUT4 holds two wires: the left pair on OUT1/OUT2, the right pair on OUT3/OUT4.", ru: "В каждой клемме OUT1–OUT4 по два провода: левая пара на OUT1/OUT2, правая на OUT3/OUT4.", kk: "OUT1–OUT4 клеммаларының әрқайсысында екі сымнан: сол жұп OUT1/OUT2-де, оң жұп OUT3/OUT4-те." },
      mistake: { en: "Wiring a pair in opposite polarity makes the two wheels on one side fight each other and stall.", ru: "Если пару подключить с разной полярностью, колёса одного борта будут бороться друг с другом и встанут.", kk: "Жұпты әртүрлі полярлықпен қоссаңыз, бір жақтағы доңғалақтар бір-бірімен күресіп, тоқтап қалады." },
    },
    {
      title: { en: "Connect the control pins and the sensor", ru: "Подключите управляющие пины и датчик", kk: "Басқару пиндері мен датчикті қосыңыз" },
      body: {
        en: "Remove the ENA/ENB jumpers and wire ENA → D5, IN1 → D7, IN2 → D8, ENB → D6, IN3 → D9, IN4 → D10. Mount the HC-SR04 on the front bumper, level with the floor: VCC → 5V, GND → GND, TRIG → D11, ECHO → D12.",
        ru: "Снимите перемычки ENA/ENB и подключите ENA → D5, IN1 → D7, IN2 → D8, ENB → D6, IN3 → D9, IN4 → D10. HC-SR04 закрепите на переднем бампере горизонтально: VCC → 5V, GND → GND, TRIG → D11, ECHO → D12.",
        kk: "ENA/ENB секіргіштерін алып, ENA → D5, IN1 → D7, IN2 → D8, ENB → D6, IN3 → D9, IN4 → D10 қосыңыз. HC-SR04-ті алдыңғы бамперге еденге параллель бекітіңіз: VCC → 5V, GND → GND, TRIG → D11, ECHO → D12.",
      },
      expect: { en: "The sensor looks straight ahead, not at the floor.", ru: "Датчик смотрит прямо вперёд, а не в пол.", kk: "Датчик еденге емес, тура алға қарайды." },
      mistake: { en: "A sensor tilted down sees the floor as a wall about half a metre ahead and the rover keeps stopping.", ru: "Наклонённый вниз датчик видит пол как стену в полуметре, и ровер постоянно останавливается.", kk: "Төмен еңкейген датчик еденді жарты метр алдағы қабырға деп көреді де, ровер үнемі тоқтай береді." },
    },
    {
      title: { en: "Power and common ground", ru: "Питание и общая земля", kk: "Қуат және ортақ жер" },
      body: {
        en: "Battery + goes through the switch to the L298N 12V terminal and Arduino VIN. Battery − goes to L298N GND, and from that terminal a wire runs to Arduino GND. Keep the L298N 5V-EN jumper on and leave its 5V terminal unconnected. Use a pack of 2200 mAh or more: four motors turning on the spot draw a lot.",
        ru: "Плюс аккумулятора через выключатель на клемму 12V L298N и VIN Arduino. Минус на GND L298N, и от этой клеммы провод на GND Arduino. Перемычку 5V-EN оставьте, клемму 5V не подключайте. Берите аккумулятор от 2200 мА·ч: четыре мотора при развороте на месте потребляют много.",
        kk: "Аккумулятор плюсы қосқыш арқылы L298N 12V клеммасына және Arduino VIN-ге барады. Минусы L298N GND-іне, сол клеммадан Arduino GND-іне сым тартылады. 5V-EN секіргішін қалдырып, 5V клеммасын қоспаңыз. 2200 мА·сағ не одан көп аккумулятор алыңыз: орнында бұрылғанда төрт мотор көп ток тұтынады.",
      },
      expect: { en: "Switch on: the L298N LED and the Arduino ON LED light.", ru: "При включении горят светодиод L298N и ON на Arduino.", kk: "Қосқанда L298N шамы мен Arduino ON шамы жанады." },
      mistake: { en: "A thin switch or thin battery leads drop voltage when all four motors start, and the Arduino resets.", ru: "Тонкий выключатель или тонкие провода от батареи дают просадку при старте четырёх моторов, и Arduino перезагружается.", kk: "Жіңішке қосқыш не батареяның жіңішке сымдары төрт мотор іске қосылғанда кернеуді түсіреді де, Arduino қайта жүктеледі." },
    },
    {
      title: { en: "Upload, check directions, tune the turn", ru: "Загрузите, проверьте направления, настройте поворот", kk: "Жүктеп, бағыттарды тексеріп, бұрылысты баптаңыз" },
      body: {
        en: "Upload with the rover on a box, wheels in the air, and open the Serial Monitor at 9600 baud. All four wheels should turn forward. If one wheel turns backward, swap that motor's two leads; if a whole side does, swap OUT1/OUT2 (or OUT3/OUT4). On the floor, the rover slows below 60 cm, stops at 25 cm, turns left and right to look, and picks the clearer side. If its look-turns are much bigger or smaller than about 45°, change TURN_MS: skid steering turns less on carpet than on tiles.",
        ru: "Загрузите скетч, поставив ровер на коробку колёсами в воздухе, и откройте Serial Monitor на 9600 бод. Все четыре колеса должны крутиться вперёд. Если одно крутится назад, поменяйте два провода этого мотора; если весь борт — поменяйте OUT1/OUT2 (или OUT3/OUT4). На полу ровер замедляется ближе 60 см, останавливается на 25 см, поворачивается влево и вправо, «осматриваясь», и выбирает более свободную сторону. Если «осмотр» сильно больше или меньше 45°, измените TURN_MS: на ковре танковый поворот получается меньше, чем на плитке.",
        kk: "Роверді қорапқа доңғалақтарын ауада қойып, скетчті жүктеңіз де, Serial Monitor-ды 9600 бодта ашыңыз. Төрт доңғалақ та алға айналуы керек. Біреуі кері айналса, сол мотордың екі сымын ауыстырыңыз; бүкіл жақ кері айналса, OUT1/OUT2-ні (не OUT3/OUT4-ті) ауыстырыңыз. Еденде ровер 60 см-ден жақын баяулайды, 25 см-де тоқтайды, солға және оңға бұрылып «қарайды» да, бос жақты таңдайды. «Қарау» бұрылысы 45°-тан әлдеқайда үлкен не кіші болса, TURN_MS-ті өзгертіңіз: кілемде танктік бұрылыс плиткаға қарағанда аз болады.",
      },
      expect: { en: "\"look L=… R=… -> left/right\" after each stop, and the rover drives away from the wall.", ru: "После каждой остановки «look L=… R=… -> left/right», и ровер уезжает от стены.", kk: "Әр тоқтаудан кейін «look L=… R=… -> left/right», ровер қабырғадан алыстайды." },
      mistake: { en: "Testing first on the floor with wrong motor polarity: the rover spins or drives into the wall at full speed.", ru: "Первый тест сразу на полу с неправильной полярностью моторов: ровер крутится на месте или врезается в стену на полной скорости.", kk: "Мотор полярлығы қате кезде бірден еденде тексеру: ровер орнында айналады немесе қабырғаға толық жылдамдықпен соғылады." },
    },
  ],
  code: [{
    filename: "rover_4wd.ino",
    language: "cpp",
    libraries: [],
    source: `// 4WD skid-steer rover: one L298N (motors paired per side) + HC-SR04 on Arduino Uno
const int ENA = 5, IN1 = 7, IN2 = 8;    // left side: front-left + rear-left in parallel
const int ENB = 6, IN3 = 9, IN4 = 10;   // right side: front-right + rear-right in parallel
const int TRIG = 11, ECHO = 12;

const int CRUISE = 200, SLOW = 120, TURN = 255;
const int STOP_CM = 25, SLOW_CM = 60;
const int TURN_MS = 350;                // ~45 degrees on a hard floor; tune for your surface

unsigned long lastPrint = 0;

void side(int en, int a, int b, int pwm) {
  digitalWrite(a, pwm > 0 ? HIGH : LOW);
  digitalWrite(b, pwm < 0 ? HIGH : LOW);
  analogWrite(en, abs(pwm));
}

void drive(int left, int right) {
  side(ENA, IN1, IN2, left);
  side(ENB, IN3, IN4, right);
}

void brake() {                          // IN1 = IN2 = HIGH shorts the motors: quick stop
  digitalWrite(IN1, HIGH); digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, HIGH);
  analogWrite(ENA, 255); analogWrite(ENB, 255);
  delay(100);
  drive(0, 0);
}

int pingCm() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  unsigned long us = pulseIn(ECHO, HIGH, 20000UL);   // ~3.4 m max
  return us == 0 ? 999 : us / 58;
}

int distanceCm() {                      // median of 3 rejects single bad echoes
  int a = pingCm(); delay(10);
  int b = pingCm(); delay(10);
  int c = pingCm();
  return max(min(a, b), min(max(a, b), c));
}

void avoid(int d) {
  brake();
  Serial.print("obstacle "); Serial.print(d); Serial.println(" cm: stop");
  drive(-SLOW, -SLOW); delay(350);      // back off a little
  brake();

  drive(-TURN, TURN); delay(TURN_MS);   // look left
  brake();
  int left = distanceCm();
  drive(TURN, -TURN); delay(2 * TURN_MS); // look right (past the start heading)
  brake();
  int right = distanceCm();

  Serial.print("look L="); Serial.print(left);
  Serial.print(" R="); Serial.print(right);
  if (left > right) {
    Serial.println(" -> left");
    drive(-TURN, TURN); delay(2 * TURN_MS);  // swing back to the left heading
    brake();
  } else {
    Serial.println(" -> right");             // already facing right
  }
}

void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT); pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  drive(0, 0);
  Serial.begin(9600);
  Serial.println("4WD rover ready");
  delay(2000);                          // time to put it down
}

void loop() {
  int d = distanceCm();
  if (d <= STOP_CM) { avoid(d); return; }

  int pwm = d >= SLOW_CM ? CRUISE : map(d, STOP_CM, SLOW_CM, SLOW, CRUISE);
  drive(pwm, pwm);

  if (millis() - lastPrint > 500) {
    lastPrint = millis();
    Serial.print("clear "); Serial.print(d);
    Serial.print(" cm, pwm "); Serial.println(pwm);
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The rover cannot turn on the spot, it just shudders", ru: "Ровер не может развернуться на месте, только дёргается", kk: "Ровер орнында бұрыла алмайды, тек дірілдейді" },
      cause: { en: "Skid steering needs a lot of torque: the battery is low or the rubber tyres grip too hard on carpet.", ru: "Танковому повороту нужен большой момент: аккумулятор разряжен или резина слишком цепляется за ковёр.", kk: "Танктік бұрылысқа үлкен момент керек: аккумулятор отырған немесе резеңке кілемге тым қатты жабысады." },
      fix: { en: "Charge the pack, keep TURN at 255 and test on a hard floor; on thick carpet longer TURN_MS helps.", ru: "Зарядите аккумулятор, оставьте TURN = 255 и проверьте на твёрдом полу; на толстом ковре помогает больший TURN_MS.", kk: "Аккумуляторды зарядтап, TURN = 255 қалдырыңыз да, қатты еденде тексеріңіз; қалың кілемде TURN_MS-ті арттыру көмектеседі." },
    },
    {
      symptom: { en: "The L298N gets very hot", ru: "L298N сильно греется", kk: "L298N қатты қызады" },
      cause: { en: "Each channel carries two motors, and long stalls (pushing a wall, thick carpet) push it toward its 2 A limit.", ru: "Каждый канал тянет два мотора, а долгие упоры (в стену, на толстом ковре) приближают его к пределу 2 А.", kk: "Әр арна екі моторды тартады, ал ұзақ тірелу (қабырғаға, қалың кілемде) оны 2 А шегіне жақындатады." },
      fix: { en: "Make sure the heatsink is fitted, avoid stalls, or split the motors over two L298N boards (one channel per wheel).", ru: "Проверьте, что радиатор стоит, избегайте упоров или разнесите моторы на два L298N (по каналу на колесо).", kk: "Радиатор орнатылғанын тексеріңіз, тірелуден аулақ болыңыз немесе моторларды екі L298N-ға бөліңіз (әр доңғалаққа бір арна)." },
    },
    {
      symptom: { en: "It stops for no reason in open space", ru: "Останавливается без причины на открытом месте", kk: "Ашық жерде себепсіз тоқтайды" },
      cause: { en: "The sensor sees the floor or its own bumper, or soft surfaces (curtains, sofas) absorb the echo unevenly.", ru: "Датчик видит пол или свой бампер, либо мягкие поверхности (шторы, диван) неравномерно поглощают эхо.", kk: "Датчик еденді не өз бамперін көреді немесе жұмсақ беттер (перде, диван) жаңғырықты біркелкі жұтпайды." },
      fix: { en: "Mount the HC-SR04 level and in front of everything else on the rover.", ru: "Установите HC-SR04 горизонтально и впереди всех остальных деталей ровера.", kk: "HC-SR04-ті көлденең әрі ровердің барлық басқа бөлшектерінен алдыға орнатыңыз." },
    },
  ],
  safety: [
    { en: "A 4WD rover has enough torque to pinch fingers in the wheels; switch it off before handling.", ru: "У ровера 4WD хватит усилия, чтобы прищемить пальцы колёсами; выключайте его, прежде чем брать в руки.", kk: "4WD роверінің күші саусақты доңғалаққа қыстыруға жетеді; қолға алмас бұрын оны өшіріңіз." },
    { en: "Charge the 2S pack only with a balance charger and never leave it charging unattended.", ru: "Заряжайте аккумулятор 2S только балансирным зарядником и не оставляйте без присмотра.", kk: "2S аккумуляторын тек баланстық зарядтағышпен зарядтаңыз және қараусыз қалдырмаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["4WD rover ready", "clear 180 cm, pwm 200", "clear 72 cm, pwm 200", "clear 41 cm, pwm 156", "obstacle 23 cm: stop", "look L=95 R=38 -> left", "clear 150 cm, pwm 200", "clear 55 cm, pwm 188", "obstacle 24 cm: stop", "look L=31 R=120 -> right"],
    leds: [{ label: "PWR", color: "#7CB342" }, { label: "ENA", color: "#00ACC1" }, { label: "ENB", color: "#3949AB" }],
  },
} satisfies GuideContent;
