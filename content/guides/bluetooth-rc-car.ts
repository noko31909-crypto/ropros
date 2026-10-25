import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "bluetooth-rc-car",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "vehicles",
  robotics: true,
  difficulty: "intermediate",
  hours: 4,
  costUsd: 36,
  xpReward: 220,
  title: {
    en: "Bluetooth RC Car",
    ru: "Машинка на Bluetooth-управлении",
    kk: "Bluetooth арқылы басқарылатын машина",
  },
  summary: {
    en: "A two-wheel car you drive from an Android phone: the HC-05 receives F/B/L/R/S letters, the L298N turns them into motion, and a failsafe stops the car if the link goes quiet.",
    ru: "Двухколёсная машинка, которой вы управляете с Android-телефона: HC-05 принимает буквы F/B/L/R/S, L298N превращает их в движение, а защита останавливает машинку, если связь пропала.",
    kk: "Android телефонынан басқарылатын екі доңғалақты машина: HC-05 F/B/L/R/S әріптерін қабылдайды, L298N оларды қозғалысқа айналдырады, ал байланыс үзілсе, қорғаныс машинаны тоқтатады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, powered through VIN", ru: "логика 5 В, питание через VIN", kk: "5 В логика, VIN арқылы қуат" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "hc-05", qty: 1, spec: { en: "ZS-040 board, 9600 baud, PIN 1234", ru: "плата ZS-040, 9600 бод, PIN 1234", kk: "ZS-040 платасы, 9600 бод, PIN 1234" }, role: { en: "Bluetooth link to the phone", ru: "Bluetooth-связь с телефоном", kk: "Телефонмен Bluetooth байланысы" } },
    { component: "l298n", qty: 1, spec: { en: "dual H-bridge, 2 A per channel", ru: "двойной H-мост, 2 А на канал", kk: "қос H-көпір, арнаға 2 А" }, role: { en: "Drives both motors", ru: "Управляет обоими моторами", kk: "Екі моторды басқарады" } },
    { component: "dc-motor", qty: 2, spec: { en: "TT gear motor 3–6 V (comes with the chassis)", ru: "мотор-редуктор TT 3–6 В (идёт с шасси)", kk: "TT редукторлы мотор 3–6 В (шассимен бірге)" }, role: { en: "Left and right wheels", ru: "Левое и правое колёса", kk: "Сол және оң доңғалақтар" } },
    { component: "robot-chassis-2wd", qty: 1, spec: { en: "acrylic plate, 2 wheels + caster", ru: "акриловая платформа, 2 колеса + опорное", kk: "акрил платформа, 2 доңғалақ + тірек дөңгелек" }, role: { en: "Frame", ru: "Рама", kk: "Рама" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V, 1500–2200 mAh, charge with a 2S balance charger", ru: "7,4 В, 1500–2200 мА·ч, заряжать балансирным зарядником 2S", kk: "7,4 В, 1500–2200 мА·сағ, 2S баланстық зарядтағышпен зарядтаңыз" }, role: { en: "Power for motors and Arduino", ru: "Питание моторов и Arduino", kk: "Моторлар мен Arduino қуаты" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT, rated 2 A or more", ru: "SPDT, на ток от 2 А", kk: "SPDT, 2 А не одан жоғары токқа" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі қосқыш" } },
    { component: "resistor", qty: 3, spec: { en: "2× 1 kΩ, 1× 2 kΩ", ru: "2× 1 кОм, 1× 2 кОм", kk: "2× 1 кОм, 1× 2 кОм" }, role: { en: "5 V → 3.3 V divider for HC-05 RXD, series protection on TXD", ru: "Делитель 5 В → 3,3 В для RXD HC-05, защитный резистор на TXD", kk: "HC-05 RXD үшін 5 В → 3,3 В бөлгіш, TXD-дағы қорғаныс резисторы" } },
    { component: "breadboard", qty: 1, spec: { en: "mini 170 points", ru: "мини на 170 точек", kk: "170 нүктелі шағын" }, role: { en: "Holds the divider", ru: "Для делителя", kk: "Бөлгішке арналған" } },
    { component: "jumper-wires", qty: 20, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "bt", component: "hc-05", label: "HC-05" },
    { id: "r1", component: "resistor", label: "1 kΩ" },
    { id: "r2", component: "resistor", label: "2 kΩ" },
    { id: "r3", component: "resistor", label: "1 kΩ" },
    { id: "drv", component: "l298n", label: "L298N" },
    { id: "m1", component: "dc-motor", label: "Left motor" },
    { id: "m2", component: "dc-motor", label: "Right motor" },
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
  ],
  connections: [
    { from: "board.5V", to: "bt.VCC", color: "red", note: { en: "the ZS-040 board has its own 3.3 V regulator", ru: "на плате ZS-040 есть свой стабилизатор 3,3 В", kk: "ZS-040 платасында өз 3,3 В тұрақтандырғышы бар" } },
    { from: "bt.GND", to: "board.GND", color: "black" },
    { from: "bt.TXD", to: "r3.A", color: "green" },
    { from: "r3.B", to: "board.D10", color: "green", note: { en: "SoftwareSerial RX; 1 kΩ only protects the line", ru: "RX SoftwareSerial; 1 кОм лишь защищает линию", kk: "SoftwareSerial RX; 1 кОм тек желіні қорғайды" } },
    { from: "board.D11", to: "r1.A", color: "yellow", note: { en: "SoftwareSerial TX, 5 V", ru: "TX SoftwareSerial, 5 В", kk: "SoftwareSerial TX, 5 В" } },
    { from: "r1.B", to: "bt.RXD", color: "yellow", note: { en: "divider middle: 5 V × 2/3 ≈ 3.3 V", ru: "середина делителя: 5 В × 2/3 ≈ 3,3 В", kk: "бөлгіш ортасы: 5 В × 2/3 ≈ 3,3 В" } },
    { from: "bt.RXD", to: "r2.A", color: "yellow" },
    { from: "r2.B", to: "board.GND2", color: "black" },
    { from: "board.D5", to: "drv.ENA", color: "cyan", note: { en: "PWM, left speed (remove the ENA jumper)", ru: "ШИМ, скорость левого (снимите перемычку ENA)", kk: "ШИМ, сол жақ жылдамдығы (ENA секіргішін алыңыз)" } },
    { from: "board.D7", to: "drv.IN1", color: "pink" },
    { from: "board.D8", to: "drv.IN2", color: "purple" },
    { from: "board.D6", to: "drv.ENB", color: "blue", note: { en: "PWM, right speed (remove the ENB jumper)", ru: "ШИМ, скорость правого (снимите перемычку ENB)", kk: "ШИМ, оң жақ жылдамдығы (ENB секіргішін алыңыз)" } },
    { from: "board.D9", to: "drv.IN3", color: "orange" },
    { from: "board.D12", to: "drv.IN4", color: "gray" },
    { from: "drv.OUT1", to: "m1.+", color: "red" },
    { from: "drv.OUT2", to: "m1.-", color: "black" },
    { from: "drv.OUT3", to: "m2.+", color: "red" },
    { from: "drv.OUT4", to: "m2.-", color: "black" },
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "drv.12V", color: "red", note: { en: "motor supply 7.4–8.4 V", ru: "питание моторов 7,4–8,4 В", kk: "мотор қуаты 7,4–8,4 В" } },
    { from: "sw.1", to: "board.VIN", color: "red", note: { en: "Arduino supply (VIN 7–12 V)", ru: "питание Arduino (VIN 7–12 В)", kk: "Arduino қуаты (VIN 7–12 В)" } },
    { from: "bat.-", to: "drv.GND", color: "black" },
    { from: "drv.GND", to: "board.GND3", color: "black", note: { en: "common ground: battery −, L298N, Arduino", ru: "общая земля: минус батареи, L298N, Arduino", kk: "ортақ жер: батарея минусы, L298N, Arduino" } },
  ],
  steps: [
    {
      title: { en: "Build the chassis", ru: "Соберите шасси", kk: "Шассиді құрастырыңыз" },
      body: {
        en: "Solder two wires to each TT motor (or use pre-wired ones), bolt the motors to the plate, push on the wheels and fit the caster at the front. Mount the battery low and in the middle, the L298N behind it and the Arduino on top with spacers. Put the slide switch where you can reach it.",
        ru: "Припаяйте по два провода к каждому мотору TT (или возьмите уже с проводами), прикрутите моторы к платформе, наденьте колёса и поставьте опорное колесо спереди. Аккумулятор закрепите низко и по центру, за ним L298N, сверху на стойках Arduino. Выключатель поставьте туда, где до него легко дотянуться.",
        kk: "Әр TT моторына екі сымнан дәнекерлеңіз (немесе сымы бар моторларды алыңыз), моторларды платформаға бұраңыз, доңғалақтарды кигізіп, алдыңғы жағына тірек дөңгелекті орнатыңыз. Аккумуляторды төмен әрі ортаға, оның артына L298N-ды, ал үстіне тіректерге Arduino-ны бекітіңіз. Қосқышты оңай қол жететін жерге қойыңыз.",
      },
      expect: { en: "Wheels spin freely by hand and the car sits level.", ru: "Колёса свободно крутятся рукой, машинка стоит ровно.", kk: "Доңғалақтар қолмен еркін айналады, машина тегіс тұрады." },
      mistake: { en: "Putting the battery at the very back makes the car wheelie and steer badly.", ru: "Если поставить аккумулятор в самый зад, машинка будет задирать нос и плохо поворачивать.", kk: "Аккумуляторды ең артқа қойсаңыз, машина алдын көтеріп, нашар бұрылады." },
    },
    {
      title: { en: "Wire the L298N to the motors and the Arduino", ru: "Подключите L298N к моторам и Arduino", kk: "L298N-ды моторларға және Arduino-ға қосыңыз" },
      body: {
        en: "Screw the left motor to OUT1/OUT2 and the right motor to OUT3/OUT4. Pull the ENA and ENB jumpers off, then wire ENA → D5, IN1 → D7, IN2 → D8, ENB → D6, IN3 → D9, IN4 → D12. D5 and D6 are PWM pins, so the sketch can set the speed.",
        ru: "Прикрутите левый мотор к OUT1/OUT2, правый к OUT3/OUT4. Снимите перемычки ENA и ENB, затем подключите ENA → D5, IN1 → D7, IN2 → D8, ENB → D6, IN3 → D9, IN4 → D12. D5 и D6 это ШИМ-пины, через них скетч задаёт скорость.",
        kk: "Сол моторды OUT1/OUT2-ге, оң моторды OUT3/OUT4-ке бұраңыз. ENA және ENB секіргіштерін алып, ENA → D5, IN1 → D7, IN2 → D8, ENB → D6, IN3 → D9, IN4 → D12 қосыңыз. D5 пен D6 ШИМ пиндері, скетч жылдамдықты солар арқылы береді.",
      },
      expect: { en: "Six signal wires between the Arduino and the L298N, two motor pairs in the screw terminals.", ru: "Шесть сигнальных проводов между Arduino и L298N, две пары проводов моторов в клеммах.", kk: "Arduino мен L298N арасында алты сигнал сымы, клеммаларда екі жұп мотор сымы." },
      mistake: { en: "Leaving the ENA/ENB jumpers on runs the motors at full speed no matter what the sketch says.", ru: "Если оставить перемычки ENA/ENB, моторы всегда крутятся на полной скорости, что бы ни говорил скетч.", kk: "ENA/ENB секіргіштерін қалдырсаңыз, скетч не десе де моторлар толық жылдамдықпен айналады." },
    },
    {
      title: { en: "Add power and a common ground", ru: "Подайте питание и сделайте общую землю", kk: "Қуат беріп, ортақ жерді жасаңыз" },
      body: {
        en: "Battery + goes to the middle pin (C) of the slide switch. From switch pin 1 run one wire to the L298N 12V terminal and one to the Arduino VIN pin. Battery − goes to the L298N GND terminal, and a wire from that same terminal goes to Arduino GND. Leave the L298N 5V-EN jumper on and do not connect its 5V terminal to the Arduino.",
        ru: "Плюс аккумулятора подключите к среднему выводу (C) выключателя. От вывода 1 выключателя ведите один провод к клемме 12V на L298N и один к пину VIN на Arduino. Минус аккумулятора идёт в клемму GND на L298N, и от этой же клеммы провод к GND Arduino. Перемычку 5V-EN на L298N оставьте, а его клемму 5V к Arduino не подключайте.",
        kk: "Аккумулятор плюсын қосқыштың ортаңғы шығысына (C) қосыңыз. Қосқыштың 1-шығысынан бір сымды L298N-дағы 12V клеммасына, біреуін Arduino VIN пиніне тартыңыз. Аккумулятор минусы L298N GND клеммасына барады, сол клеммадан Arduino GND-іне сым тартыңыз. L298N-дағы 5V-EN секіргішін қалдырыңыз, ал оның 5V клеммасын Arduino-ға қоспаңыз.",
      },
      expect: { en: "Switch on: the L298N power LED and the Arduino ON LED light up.", ru: "При включении загораются светодиод питания L298N и светодиод ON на Arduino.", kk: "Қосқанда L298N қуат шамы мен Arduino ON шамы жанады." },
      mistake: { en: "Without the GND wire between the L298N and the Arduino the motors only twitch or do nothing.", ru: "Без провода GND между L298N и Arduino моторы только дёргаются или вообще стоят.", kk: "L298N мен Arduino арасында GND сымы болмаса, моторлар тек дірілдейді немесе мүлде қозғалмайды." },
    },
    {
      title: { en: "Connect the HC-05 through a divider", ru: "Подключите HC-05 через делитель", kk: "HC-05-ті бөлгіш арқылы қосыңыз" },
      body: {
        en: "The HC-05 runs its signals at 3.3 V. Power it from 5V and GND. Its TXD goes through a 1 kΩ resistor to D10. Arduino D11 (5 V) goes through a 1 kΩ resistor to RXD, and RXD also goes through a 2 kΩ resistor to GND: the middle of this divider sits at about 3.3 V. Build the divider on the mini breadboard.",
        ru: "Сигналы HC-05 работают на 3,3 В. Питание берите с 5V и GND. Его TXD через резистор 1 кОм идёт на D10. D11 Arduino (5 В) через резистор 1 кОм идёт на RXD, а от RXD резистор 2 кОм уходит на GND: середина такого делителя примерно 3,3 В. Делитель соберите на мини-макетке.",
        kk: "HC-05 сигналдары 3,3 В-та жұмыс істейді. Қуатты 5V және GND-ден алыңыз. Оның TXD-і 1 кОм резистор арқылы D10-ға барады. Arduino D11 (5 В) 1 кОм резистор арқылы RXD-ге барады, ал RXD-ден 2 кОм резистор GND-ге кетеді: бұл бөлгіштің ортасы шамамен 3,3 В. Бөлгішті шағын макет тақтасына жинаңыз.",
      },
      expect: { en: "The HC-05 LED blinks fast (about 5 times a second): it is waiting to pair.", ru: "Светодиод HC-05 мигает часто (около 5 раз в секунду): модуль ждёт сопряжения.", kk: "HC-05 шамы жиі жыпылықтайды (секундына 5 рет шамасында): модуль жұптасуды күтіп тұр." },
      mistake: { en: "Wiring D11 straight to RXD feeds 5 V into a 3.3 V input and slowly kills the module.", ru: "Если подключить D11 напрямую к RXD, на вход 3,3 В пойдёт 5 В, и модуль постепенно выйдет из строя.", kk: "D11-ді RXD-ге тікелей қоссаңыз, 3,3 В кірісіне 5 В түседі де, модуль бірте-бірте істен шығады." },
    },
    {
      title: { en: "Upload and test on USB", ru: "Загрузите скетч и проверьте от USB", kk: "Скетчті жүктеп, USB арқылы тексеріңіз" },
      body: {
        en: "Switch the battery off, prop the car up so the wheels are in the air and upload the sketch over USB. Open the Serial Monitor at 9600 baud and type F, B, L, R and S. The sketch accepts the same letters from USB and Bluetooth, so you can test the drive without a phone. Digits 0–9 set the speed.",
        ru: "Выключите аккумулятор, поставьте машинку на подставку колёсами вверх и загрузите скетч по USB. Откройте Serial Monitor на 9600 бод и вводите F, B, L, R и S. Скетч принимает те же буквы и по USB, и по Bluetooth, поэтому ход можно проверить без телефона. Цифры 0–9 задают скорость.",
        kk: "Аккумуляторды өшіріп, машинаны доңғалақтары ауада тұратындай етіп тіреуге қойыңыз да, скетчті USB арқылы жүктеңіз. Serial Monitor-ды 9600 бодта ашып, F, B, L, R және S теріңіз. Скетч бірдей әріптерді USB-ден де, Bluetooth-тан да қабылдайды, сондықтан жүрісті телефонсыз тексеруге болады. 0–9 цифрлары жылдамдықты береді.",
      },
      expect: { en: "F spins both wheels forward, L and R spin them in opposite directions, S stops them.", ru: "F крутит оба колеса вперёд, L и R крутят их в разные стороны, S останавливает.", kk: "F екі доңғалақты алға айналдырады, L мен R оларды қарама-қарсы бағытта айналдырады, S тоқтатады." },
      mistake: { en: "With only USB power the motors barely move: the L298N needs the battery switched on.", ru: "Только от USB моторы еле крутятся: L298N нужен включённый аккумулятор.", kk: "Тек USB қуатымен моторлар әрең айналады: L298N-ға қосулы аккумулятор керек." },
    },
    {
      title: { en: "Pair the phone and drive", ru: "Подключите телефон и катайтесь", kk: "Телефонды қосып, жүргізіңіз" },
      body: {
        en: "On an Android phone open Bluetooth settings, pair with HC-05 (PIN 1234 or 0000), then open an RC-car or Bluetooth-terminal app and set its buttons to send F, B, L, R and S. Turn on \"repeat while pressed\" if the app has it: the car stops by itself one second after the last letter. If one wheel turns the wrong way, swap that motor's two wires in its screw terminal.",
        ru: "На Android-телефоне откройте настройки Bluetooth, выполните сопряжение с HC-05 (PIN 1234 или 0000), затем откройте приложение для RC-машинки или Bluetooth-терминал и назначьте кнопкам буквы F, B, L, R и S. Включите «повтор при удержании», если есть: машинка сама останавливается через секунду после последней буквы. Если колесо крутится не в ту сторону, поменяйте местами два провода этого мотора в клемме.",
        kk: "Android телефонында Bluetooth баптауларын ашып, HC-05-пен жұптастырыңыз (PIN 1234 немесе 0000), содан кейін RC-машина немесе Bluetooth-терминал қолданбасын ашып, батырмаларға F, B, L, R және S әріптерін тағайындаңыз. Қолданбада «басып тұрғанда қайталау» болса, қосыңыз: соңғы әріптен бір секундтан кейін машина өзі тоқтайды. Доңғалақ теріс айналса, сол мотордың екі сымын клеммада ауыстырыңыз.",
      },
      expect: { en: "The HC-05 LED changes to two short blinks every 2 s and the car follows the buttons.", ru: "Светодиод HC-05 переходит на две короткие вспышки раз в 2 с, машинка слушается кнопок.", kk: "HC-05 шамы 2 с сайын екі қысқа жыпылыққа ауысады, машина батырмаларға бағынады." },
      mistake: { en: "iPhones do not show the HC-05 at all: it is classic Bluetooth, which iOS apps cannot use.", ru: "iPhone вообще не видит HC-05: это классический Bluetooth, с которым приложения iOS работать не могут.", kk: "iPhone HC-05-ті мүлде көрмейді: бұл классикалық Bluetooth, iOS қолданбалары онымен жұмыс істей алмайды." },
    },
  ],
  code: [{
    filename: "bluetooth_rc_car.ino",
    language: "cpp",
    libraries: [],
    source: `// Bluetooth RC car: HC-05 + L298N on Arduino Uno
// Commands (from the phone or the Serial Monitor): F B L R S, digits 0-9 = speed
#include <SoftwareSerial.h>

const int BT_RX = 10;   // Arduino receives here  <- HC-05 TXD (1 k series)
const int BT_TX = 11;   // Arduino sends here     -> 1 k / 2 k divider -> HC-05 RXD
const int ENA = 5, IN1 = 7, IN2 = 8;    // left motor
const int ENB = 6, IN3 = 9, IN4 = 12;   // right motor

const unsigned long FAILSAFE_MS = 1000;  // stop if no command for this long

SoftwareSerial bt(BT_RX, BT_TX);
int speedPwm = 200;
char current = 'S';
unsigned long lastCmd = 0;

void side(int en, int a, int b, int pwm) {  // pwm -255..255
  digitalWrite(a, pwm > 0 ? HIGH : LOW);
  digitalWrite(b, pwm < 0 ? HIGH : LOW);
  analogWrite(en, abs(pwm));
}

void drive(int left, int right) {
  side(ENA, IN1, IN2, left);
  side(ENB, IN3, IN4, right);
}

void apply(char c) {
  int s = speedPwm;
  switch (c) {
    case 'F': drive(s, s); break;
    case 'B': drive(-s, -s); break;
    case 'L': drive(-s, s); break;   // spin left on the spot
    case 'R': drive(s, -s); break;   // spin right on the spot
    default:  drive(0, 0); c = 'S'; break;
  }
  if (c != current) {
    current = c;
    Serial.print("cmd "); Serial.print(c);
    Serial.print(" speed "); Serial.println(s);
  }
}

void handle(char c) {
  c = toupper(c);
  if (c >= '0' && c <= '9') {
    speedPwm = map(c - '0', 0, 9, 110, 255);
    Serial.print("speed "); Serial.println(speedPwm);
    apply(current);                    // keep driving, at the new speed
    lastCmd = millis();
  } else if (c == 'F' || c == 'B' || c == 'L' || c == 'R' || c == 'S') {
    apply(c);
    lastCmd = millis();
  }                                    // ignore newlines and anything else
}

void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT); pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  drive(0, 0);
  Serial.begin(9600);
  bt.begin(9600);                      // HC-05 data mode default
  Serial.println("BT car ready, waiting for commands");
}

void loop() {
  while (bt.available()) handle(bt.read());
  while (Serial.available()) handle(Serial.read());

  if (current != 'S' && millis() - lastCmd > FAILSAFE_MS) {
    Serial.println("failsafe: no command, stop");
    apply('S');
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The phone cannot find or connect to the HC-05", ru: "Телефон не находит HC-05 или не подключается", kk: "Телефон HC-05-ті таппайды немесе қосылмайды" },
      cause: { en: "It is an iPhone (no classic Bluetooth serial), or the module is in AT mode because the button was held at power-up (LED blinks slowly, every 2 s).", ru: "Это iPhone (нет классического Bluetooth-порта), или модуль в режиме AT, потому что при включении держали кнопку (светодиод мигает медленно, раз в 2 с).", kk: "Бұл iPhone (классикалық Bluetooth порты жоқ) немесе қосқанда батырма басылып тұрғандықтан модуль AT режимінде (шам баяу, 2 с сайын жыпылықтайды)." },
      fix: { en: "Use an Android phone, switch the car off and on without touching the HC-05 button, then pair again with PIN 1234 or 0000.", ru: "Возьмите Android-телефон, выключите и включите машинку, не трогая кнопку HC-05, и снова выполните сопряжение с PIN 1234 или 0000.", kk: "Android телефонын алыңыз, HC-05 батырмасын баспай машинаны өшіріп-қосыңыз да, PIN 1234 немесе 0000 арқылы қайта жұптастырыңыз." },
    },
    {
      symptom: { en: "Connected, but the car ignores the buttons or the Serial Monitor shows nothing", ru: "Подключено, но машинка не реагирует, а в Serial Monitor пусто", kk: "Қосылған, бірақ машина батырмаларға жауап бермейді, Serial Monitor бос" },
      cause: { en: "TXD and RXD are swapped, or the module was set to a different baud rate (some ship at 38400).", ru: "Перепутаны TXD и RXD, или модуль настроен на другую скорость (некоторые идут с 38400).", kk: "TXD мен RXD ауысып кеткен немесе модуль басқа жылдамдыққа бапталған (кейбірі 38400-бен келеді)." },
      fix: { en: "HC-05 TXD must reach D10 and D11 must reach RXD through the divider. If it still fails, try bt.begin(38400).", ru: "TXD модуля должен идти на D10, а D11 на RXD через делитель. Если не помогло, попробуйте bt.begin(38400).", kk: "Модульдің TXD-і D10-ға, ал D11 бөлгіш арқылы RXD-ге баруы керек. Көмектеспесе, bt.begin(38400) байқап көріңіз." },
    },
    {
      symptom: { en: "The Arduino resets or the HC-05 disconnects when the motors start", ru: "Arduino перезагружается или HC-05 отключается при старте моторов", kk: "Моторлар іске қосылғанда Arduino қайта жүктеледі немесе HC-05 ажырайды" },
      cause: { en: "The battery is flat and its voltage dips under load, or the GND wire between the L298N and the Arduino is missing.", ru: "Аккумулятор разряжен и проседает под нагрузкой, или нет провода GND между L298N и Arduino.", kk: "Аккумулятор отырып қалған, жүктемеде кернеуі түседі, немесе L298N мен Arduino арасында GND сымы жоқ." },
      fix: { en: "Charge the pack (8.4 V when full) and check the common ground wire.", ru: "Зарядите аккумулятор (8,4 В полный) и проверьте провод общей земли.", kk: "Аккумуляторды зарядтаңыз (толы кезде 8,4 В) және ортақ жер сымын тексеріңіз." },
    },
    {
      symptom: { en: "The car stops by itself while a button is held", ru: "Машинка сама останавливается, хотя кнопка зажата", kk: "Батырма басулы тұрса да, машина өзі тоқтайды" },
      cause: { en: "The app sends the letter once per press, and the 1 s failsafe stops the car.", ru: "Приложение отправляет букву один раз за нажатие, и защита через 1 с останавливает машинку.", kk: "Қолданба әріпті бір басуға бір рет жібереді, ал 1 с қорғаныс машинаны тоқтатады." },
      fix: { en: "Enable repeat or continuous sending in the app, or raise FAILSAFE_MS if you accept a longer runaway.", ru: "Включите в приложении повтор или непрерывную отправку, либо увеличьте FAILSAFE_MS, если готовы к более долгому самоходу.", kk: "Қолданбада қайталауды немесе үздіксіз жіберуді қосыңыз, не ұзағырақ өздігінен жүруге келіссеңіз, FAILSAFE_MS мәнін арттырыңыз." },
    },
  ],
  safety: [
    { en: "Charge the 2S pack only with a balance charger, never unattended, and stop driving when it drops to about 6.6 V.", ru: "Заряжайте аккумулятор 2S только балансирным зарядником, не оставляйте без присмотра и прекращайте езду, когда напряжение упадёт примерно до 6,6 В.", kk: "2S аккумуляторын тек баланстық зарядтағышпен, қараусыз қалдырмай зарядтаңыз және кернеу шамамен 6,6 В-қа түскенде жүргізуді тоқтатыңыз." },
    { en: "Keep the wheels off the table while uploading and testing so the car cannot drive off.", ru: "При загрузке и проверке держите колёса над столом, чтобы машинка не уехала со стола.", kk: "Жүктеу мен тексеру кезінде машина үстелден түсіп кетпеуі үшін доңғалақтарды ауада ұстаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["BT car ready, waiting for commands", "cmd F speed 200", "cmd L speed 200", "cmd F speed 200", "speed 255", "cmd S speed 255", "cmd B speed 255", "failsafe: no command, stop", "cmd S speed 255"],
    leds: [{ label: "PWR", color: "#7CB342" }, { label: "BT", color: "#1E88E5" }, { label: "ENA", color: "#00ACC1" }, { label: "ENB", color: "#3949AB" }],
  },
} satisfies GuideContent;
