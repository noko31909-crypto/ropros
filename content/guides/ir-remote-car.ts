import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "ir-remote-car",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "vehicles",
  robotics: true,
  difficulty: "beginner",
  hours: 3,
  costUsd: 30,
  xpReward: 150,
  title: {
    en: "IR Remote Control Car",
    ru: "Машинка на ИК-пульте",
    kk: "ИҚ пультпен басқарылатын машина",
  },
  summary: {
    en: "Drive a two-wheel car with a cheap TV-style remote: arrow keys move it while held, number keys change the speed, and it stops the moment you let go.",
    ru: "Управляйте двухколёсной машинкой дешёвым пультом как от телевизора: стрелки двигают её, пока зажаты, цифры меняют скорость, а отпустили кнопку — машинка встала.",
    kk: "Екі доңғалақты машинаны теледидар пульті сияқты арзан пультпен басқарыңыз: бағыт батырмалары басулы тұрғанда жүргізеді, сандар жылдамдықты өзгертеді, ал батырманы жіберсеңіз, машина тоқтайды.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, powered through VIN", ru: "логика 5 В, питание через VIN", kk: "5 В логика, VIN арқылы қуат" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "ir-receiver-vs1838b", qty: 1, spec: { en: "38 kHz, 3-pin module", ru: "38 кГц, модуль на 3 вывода", kk: "38 кГц, 3 шықпалы модуль" }, role: { en: "Receives the remote's signal", ru: "Принимает сигнал пульта", kk: "Пульт сигналын қабылдайды" } },
    { component: "ir-remote", qty: 1, spec: { en: "17-key NEC remote (often sold with the receiver)", ru: "17-кнопочный пульт NEC (часто идёт с приёмником)", kk: "17 батырмалы NEC пульті (көбіне қабылдағышпен бірге сатылады)" }, role: { en: "Your controller", ru: "Ваш пульт управления", kk: "Басқару пультіңіз" } },
    { component: "l298n", qty: 1, spec: { en: "dual H-bridge, 2 A per channel", ru: "двойной H-мост, 2 А на канал", kk: "қос H-көпір, арнаға 2 А" }, role: { en: "Drives both motors", ru: "Управляет обоими моторами", kk: "Екі моторды басқарады" } },
    { component: "dc-motor", qty: 2, spec: { en: "TT gear motor 3–6 V (comes with the chassis)", ru: "мотор-редуктор TT 3–6 В (идёт с шасси)", kk: "TT редукторлы мотор 3–6 В (шассимен бірге)" }, role: { en: "Left and right wheels", ru: "Левое и правое колёса", kk: "Сол және оң доңғалақтар" } },
    { component: "robot-chassis-2wd", qty: 1, spec: { en: "acrylic plate, 2 wheels + caster", ru: "акриловая платформа, 2 колеса + опорное", kk: "акрил платформа, 2 доңғалақ + тірек дөңгелек" }, role: { en: "Frame", ru: "Рама", kk: "Рама" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "2× 18650 in a holder, or a 7.4 V 2S pack", ru: "2× 18650 в держателе или аккумулятор 2S 7,4 В", kk: "ұстағыштағы 2× 18650 немесе 7,4 В 2S аккумуляторы" }, role: { en: "Power for motors and Arduino", ru: "Питание моторов и Arduino", kk: "Моторлар мен Arduino қуаты" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT, rated 2 A or more", ru: "SPDT, на ток от 2 А", kk: "SPDT, 2 А не одан жоғары токқа" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі қосқыш" } },
    { component: "jumper-wires", qty: 15, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ir", component: "ir-receiver-vs1838b", label: "IR receiver" },
    { id: "drv", component: "l298n", label: "L298N" },
    { id: "m1", component: "dc-motor", label: "Left motor" },
    { id: "m2", component: "dc-motor", label: "Right motor" },
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
  ],
  connections: [
    { from: "board.5V", to: "ir.VCC", color: "red" },
    { from: "ir.GND", to: "board.GND", color: "black" },
    { from: "ir.OUT", to: "board.D2", color: "yellow", note: { en: "demodulated signal, idles HIGH", ru: "демодулированный сигнал, в покое HIGH", kk: "демодуляцияланған сигнал, тыныштықта HIGH" } },
    { from: "board.D5", to: "drv.ENA", color: "cyan", note: { en: "PWM, left speed (remove the ENA jumper)", ru: "ШИМ, скорость левого (снимите перемычку ENA)", kk: "ШИМ, сол жақ жылдамдығы (ENA секіргішін алыңыз)" } },
    { from: "board.D7", to: "drv.IN1", color: "pink" },
    { from: "board.D8", to: "drv.IN2", color: "purple" },
    { from: "board.D6", to: "drv.ENB", color: "blue", note: { en: "PWM, right speed (remove the ENB jumper)", ru: "ШИМ, скорость правого (снимите перемычку ENB)", kk: "ШИМ, оң жақ жылдамдығы (ENB секіргішін алыңыз)" } },
    { from: "board.D9", to: "drv.IN3", color: "orange" },
    { from: "board.D10", to: "drv.IN4", color: "gray" },
    { from: "drv.OUT1", to: "m1.+", color: "red" },
    { from: "drv.OUT2", to: "m1.-", color: "black" },
    { from: "drv.OUT3", to: "m2.+", color: "red" },
    { from: "drv.OUT4", to: "m2.-", color: "black" },
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "drv.12V", color: "red", note: { en: "motor supply 7.4–8.4 V", ru: "питание моторов 7,4–8,4 В", kk: "мотор қуаты 7,4–8,4 В" } },
    { from: "sw.1", to: "board.VIN", color: "red", note: { en: "Arduino supply (VIN 7–12 V)", ru: "питание Arduino (VIN 7–12 В)", kk: "Arduino қуаты (VIN 7–12 В)" } },
    { from: "bat.-", to: "drv.GND", color: "black" },
    { from: "drv.GND", to: "board.GND2", color: "black", note: { en: "common ground", ru: "общая земля", kk: "ортақ жер" } },
  ],
  steps: [
    {
      title: { en: "Assemble the car", ru: "Соберите машинку", kk: "Машинаны құрастырыңыз" },
      body: {
        en: "Bolt the motors and caster to the chassis plate, push on the wheels, then mount the battery holder low in the middle, the L298N behind it and the Arduino on spacers above. Put the IR receiver on top at the back, dome facing up and backward, so it sees the remote while you drive from behind.",
        ru: "Прикрутите моторы и опорное колесо к платформе, наденьте колёса, затем закрепите держатель батарей низко по центру, за ним L298N, а Arduino сверху на стойках. ИК-приёмник поставьте сверху сзади куполом вверх и назад, чтобы он видел пульт, когда вы управляете сзади.",
        kk: "Моторлар мен тірек дөңгелекті платформаға бұрап, доңғалақтарды кигізіңіз, содан кейін батарея ұстағышын төмен әрі ортаға, оның артына L298N-ды, ал Arduino-ны үстіне тіректерге бекітіңіз. ИҚ қабылдағышты үстіңгі артқы жағына күмбезін жоғары әрі артқа қаратып қойыңыз, сонда сіз артынан басқарғанда ол пультті көреді.",
      },
      expect: { en: "A rolling car with the receiver dome clear of wires.", ru: "Машинка катится, купол приёмника не закрыт проводами.", kk: "Машина домалайды, қабылдағыш күмбезін сымдар жаппаған." },
      mistake: { en: "Hiding the receiver under the Arduino: the remote then works only from straight above.", ru: "Если спрятать приёмник под Arduino, пульт будет работать только сверху.", kk: "Қабылдағышты Arduino астына жасырсаңыз, пульт тек жоғарыдан ғана жұмыс істейді." },
    },
    {
      title: { en: "Connect the IR receiver", ru: "Подключите ИК-приёмник", kk: "ИҚ қабылдағышты қосыңыз" },
      body: {
        en: "The module has three pins: VCC to 5V, GND to GND, OUT to D2. Check the labels printed on your board: bare VS1838B parts are OUT-GND-VCC from the left when the dome faces you, and reversing VCC and GND kills them.",
        ru: "У модуля три вывода: VCC на 5V, GND на GND, OUT на D2. Сверьтесь с подписями на своей плате: у голого VS1838B выводы слева направо OUT-GND-VCC, если смотреть на купол, а перепутанные VCC и GND его убивают.",
        kk: "Модульдің үш шықпасы бар: VCC → 5V, GND → GND, OUT → D2. Өз платаңыздағы жазуларды тексеріңіз: жалаң VS1838B-да күмбезге қарағанда шықпалар солдан оңға қарай OUT-GND-VCC, ал VCC пен GND-ті ауыстырсаңыз, ол істен шығады.",
      },
      expect: { en: "Three wires, OUT on D2.", ru: "Три провода, OUT на D2.", kk: "Үш сым, OUT D2-де." },
      mistake: { en: "Putting OUT on D3 or D11 clashes with the IRremote library, which takes over Timer2 on the Uno.", ru: "Если посадить OUT на D3 или D11, будет конфликт с библиотекой IRremote, которая занимает Timer2 на Uno.", kk: "OUT-ты D3 не D11-ге қойсаңыз, Uno-дағы Timer2-ні иеленетін IRremote кітапханасымен қақтығыс болады." },
    },
    {
      title: { en: "Wire the L298N and the power", ru: "Подключите L298N и питание", kk: "L298N мен қуатты қосыңыз" },
      body: {
        en: "Left motor to OUT1/OUT2, right motor to OUT3/OUT4. Remove the ENA/ENB jumpers and wire ENA → D5, IN1 → D7, IN2 → D8, ENB → D6, IN3 → D9, IN4 → D10. D5 and D6 use Timer0, so their PWM keeps working next to the IR library. Battery + goes through the switch to the L298N 12V terminal and Arduino VIN, battery − to L298N GND and on to Arduino GND.",
        ru: "Левый мотор на OUT1/OUT2, правый на OUT3/OUT4. Снимите перемычки ENA/ENB и подключите ENA → D5, IN1 → D7, IN2 → D8, ENB → D6, IN3 → D9, IN4 → D10. D5 и D6 работают от Timer0, поэтому их ШИМ не мешает ИК-библиотеке. Плюс батареи через выключатель на клемму 12V L298N и VIN Arduino, минус на GND L298N и дальше на GND Arduino.",
        kk: "Сол моторды OUT1/OUT2-ге, оңын OUT3/OUT4-ке қосыңыз. ENA/ENB секіргіштерін алып, ENA → D5, IN1 → D7, IN2 → D8, ENB → D6, IN3 → D9, IN4 → D10 қосыңыз. D5 пен D6 Timer0-мен жұмыс істейді, сондықтан олардың ШИМ-і ИҚ кітапханасына кедергі келтірмейді. Батарея плюсы қосқыш арқылы L298N 12V клеммасына және Arduino VIN-ге, минусы L298N GND-іне, одан әрі Arduino GND-іне барады.",
      },
      expect: { en: "Switch on: the L298N LED and the Arduino ON LED light.", ru: "При включении горят светодиод L298N и светодиод ON на Arduino.", kk: "Қосқанда L298N шамы мен Arduino ON шамы жанады." },
      mistake: { en: "Leaving the ENA/ENB jumpers on makes the speed keys do nothing.", ru: "Если оставить перемычки ENA/ENB, клавиши скорости ничего не меняют.", kk: "ENA/ENB секіргіштерін қалдырсаңыз, жылдамдық батырмалары ештеңе өзгертпейді." },
    },
    {
      title: { en: "Install IRremote and read your remote", ru: "Установите IRremote и прочитайте свой пульт", kk: "IRremote орнатып, пультіңізді оқыңыз" },
      body: {
        en: "In the Library Manager install \"IRremote\" (version 4.x). Upload the sketch with the battery off and the wheels in the air, open the Serial Monitor at 9600 baud and press each key: the sketch prints its code, for example \"key 0x18 -> forward\". If your remote prints different codes, copy them into the KEY_ constants at the top and upload again.",
        ru: "В менеджере библиотек установите «IRremote» (версия 4.x). Загрузите скетч при выключенной батарее и поднятых колёсах, откройте Serial Monitor на 9600 бод и понажимайте кнопки: скетч печатает код каждой, например «key 0x18 -> forward». Если у вашего пульта другие коды, впишите их в константы KEY_ в начале скетча и загрузите снова.",
        kk: "Кітапханалар менеджерінен «IRremote» (4.x нұсқасы) орнатыңыз. Батарея өшірулі, доңғалақтар ауада тұрғанда скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз да, батырмаларды басыңыз: скетч әр батырманың кодын шығарады, мысалы «key 0x18 -> forward». Пультіңіздің кодтары басқа болса, оларды скетч басындағы KEY_ тұрақтыларына жазып, қайта жүктеңіз.",
      },
      expect: { en: "Every key prints a code once, even when held.", ru: "Каждая кнопка печатает код один раз, даже если её держать.", kk: "Әр батырма кодты бір рет шығарады, басып тұрса да." },
      mistake: { en: "Old tutorials use irrecv.decode(&results); that API was removed in IRremote 4 and will not compile.", ru: "Старые уроки используют irrecv.decode(&results); этот API удалён в IRremote 4 и не скомпилируется.", kk: "Ескі сабақтар irrecv.decode(&results) қолданады; бұл API IRremote 4-те алынып тасталған, компиляцияланбайды." },
    },
    {
      title: { en: "Drive it", ru: "Покатайтесь", kk: "Жүргізіп көріңіз" },
      body: {
        en: "Switch the battery on and put the car on the floor. Hold ▲ to go forward, ▼ to reverse, ◄ and ► to spin. Keys 1, 2 and 3 pick slow, medium and fast. Release the key and the car stops within a quarter of a second, because the remote stops sending repeat frames. OK stops at once.",
        ru: "Включите батарею и поставьте машинку на пол. Держите ▲ — едет вперёд, ▼ — назад, ◄ и ► — разворот на месте. Кнопки 1, 2 и 3 выбирают медленную, среднюю и быструю скорость. Отпустите кнопку — машинка остановится в течение четверти секунды, потому что пульт перестаёт слать повторы. OK останавливает сразу.",
        kk: "Батареяны қосып, машинаны еденге қойыңыз. ▲ басып тұрсаңыз — алға, ▼ — артқа, ◄ және ► — орнында бұрылу. 1, 2 және 3 батырмалары баяу, орташа және жылдам жылдамдықты таңдайды. Батырманы жіберсеңіз, машина ширек секунд ішінде тоқтайды, себебі пульт қайталау кадрларын жіберуді тоқтатады. OK бірден тоқтатады.",
      },
      expect: { en: "The car only moves while a key is held.", ru: "Машинка едет только пока кнопка зажата.", kk: "Машина батырма басулы тұрғанда ғана жүреді." },
      mistake: { en: "Driving in direct sunlight: the sun's infrared swamps the receiver and the range drops to almost nothing.", ru: "Езда под прямым солнцем: инфракрасная часть солнечного света «забивает» приёмник, и дальность падает почти до нуля.", kk: "Тікелей күн астында жүргізу: күн сәулесінің инфрақызыл бөлігі қабылдағышты басып, қашықтық нөлге жуық түседі." },
    },
  ],
  code: [{
    filename: "ir_remote_car.ino",
    language: "cpp",
    libraries: ["IRremote"],
    source: `// IR remote car: VS1838B + L298N on Arduino Uno (IRremote 4.x)
#include <IRremote.hpp>

const int IR_PIN = 2;                   // VS1838B OUT
const int ENA = 5, IN1 = 7, IN2 = 8;    // left motor  (D5/D6 = Timer0, safe next to IRremote)
const int ENB = 6, IN3 = 9, IN4 = 10;   // right motor

// NEC command codes of the common 17-key remote. Yours may differ:
// the sketch prints every new code, copy yours here.
const uint8_t KEY_UP = 0x18, KEY_DOWN = 0x52, KEY_LEFT = 0x08, KEY_RIGHT = 0x5A, KEY_OK = 0x1C;
const uint8_t KEY_1 = 0x45, KEY_2 = 0x46, KEY_3 = 0x47;

const unsigned long HOLD_MS = 250;      // NEC repeats every ~110 ms while a key is held

int speedPwm = 180;
bool moving = false;
unsigned long lastFrame = 0;

void side(int en, int a, int b, int pwm) {
  digitalWrite(a, pwm > 0 ? HIGH : LOW);
  digitalWrite(b, pwm < 0 ? HIGH : LOW);
  analogWrite(en, abs(pwm));
}

void drive(int left, int right) {
  side(ENA, IN1, IN2, left);
  side(ENB, IN3, IN4, right);
  moving = left != 0 || right != 0;
}

void printKey(uint8_t cmd, const char *what) {
  Serial.print("key 0x");
  if (cmd < 0x10) Serial.print('0');
  Serial.print(cmd, HEX);
  Serial.println(what);
}

void handleKey(uint8_t cmd, bool repeat) {
  int s = speedPwm;
  const char *what = " (unused)";
  if (cmd == KEY_UP)         { drive(s, s);   what = " -> forward"; }
  else if (cmd == KEY_DOWN)  { drive(-s, -s); what = " -> back"; }
  else if (cmd == KEY_LEFT)  { drive(-s, s);  what = " -> left"; }
  else if (cmd == KEY_RIGHT) { drive(s, -s);  what = " -> right"; }
  else if (cmd == KEY_OK)    { drive(0, 0);   what = " -> stop"; }
  else if (cmd == KEY_1)     { speedPwm = 130; what = " -> speed 130"; }
  else if (cmd == KEY_2)     { speedPwm = 180; what = " -> speed 180"; }
  else if (cmd == KEY_3)     { speedPwm = 255; what = " -> speed 255"; }
  if (!repeat) printKey(cmd, what);
}

void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT); pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  drive(0, 0);
  Serial.begin(9600);
  IrReceiver.begin(IR_PIN, ENABLE_LED_FEEDBACK);   // onboard LED flickers on every frame
  Serial.println("IR car ready, IR on pin 2");
}

void loop() {
  if (IrReceiver.decode()) {
    if (IrReceiver.decodedIRData.protocol == NEC) {
      bool repeat = IrReceiver.decodedIRData.flags & IRDATA_FLAGS_IS_REPEAT;
      handleKey(IrReceiver.decodedIRData.command, repeat);
      lastFrame = millis();
    }
    IrReceiver.resume();
  }

  if (moving && millis() - lastFrame > HOLD_MS) {   // key released: no more repeats
    drive(0, 0);
    Serial.println("released, stop");
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Nothing prints when you press keys", ru: "При нажатии кнопок ничего не печатается", kk: "Батырмаларды басқанда ештеңе шықпайды" },
      cause: { en: "The receiver is wired VCC/GND reversed, OUT is not on D2, or the remote battery (CR2025) is flat or still has its plastic tab.", ru: "У приёмника перепутаны VCC/GND, OUT не на D2, или батарейка пульта (CR2025) села либо в ней осталась пластиковая полоска.", kk: "Қабылдағыштың VCC/GND-і ауысқан, OUT D2-де емес немесе пульт батареясы (CR2025) отырған не пластик жолағы әлі тұр." },
      fix: { en: "Check the pin labels, pull the tab out of the remote and look at the remote's LED through a phone camera: it should flash when pressed.", ru: "Проверьте подписи выводов, вытащите полоску из пульта и посмотрите на его светодиод через камеру телефона: при нажатии он должен вспыхивать.", kk: "Шықпа жазуларын тексеріп, пульттен жолақты суырыңыз да, оның шамына телефон камерасы арқылы қараңыз: басқанда жыпылықтауы керек." },
    },
    {
      symptom: { en: "Codes print but the car does not react", ru: "Коды печатаются, но машинка не реагирует", kk: "Кодтар шығады, бірақ машина жауап бермейді" },
      cause: { en: "Your remote uses different command codes, so they print as \"(unused)\".", ru: "У вашего пульта другие коды команд, поэтому они печатаются как «(unused)».", kk: "Пультіңіздің команда кодтары басқа, сондықтан олар «(unused)» деп шығады." },
      fix: { en: "Copy the printed codes into KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_OK and KEY_1–KEY_3, then upload again.", ru: "Перепишите напечатанные коды в KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_OK и KEY_1–KEY_3 и загрузите скетч снова.", kk: "Шыққан кодтарды KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_OK және KEY_1–KEY_3 тұрақтыларына жазып, скетчті қайта жүктеңіз." },
    },
    {
      symptom: { en: "The car stutters while a key is held", ru: "Машинка дёргается, пока кнопка зажата", kk: "Батырма басулы тұрғанда машина тартқылайды" },
      cause: { en: "Repeat frames get lost (weak remote battery, receiver facing away, motor noise on the 5 V line).", ru: "Теряются кадры повтора (слабая батарейка пульта, приёмник смотрит в другую сторону, помехи от моторов на линии 5 В).", kk: "Қайталау кадрлары жоғалады (пульт батареясы әлсіз, қабылдағыш басқа жаққа қарап тұр, 5 В желісінде мотор кедергісі)." },
      fix: { en: "Replace the CR2025, aim the receiver toward you and raise HOLD_MS to 350.", ru: "Замените CR2025, разверните приёмник к себе и увеличьте HOLD_MS до 350.", kk: "CR2025-ті ауыстырып, қабылдағышты өзіңізге қаратыңыз және HOLD_MS-ті 350-ге дейін арттырыңыз." },
    },
  ],
  safety: [
    { en: "Keep the wheels off the table while uploading so the car cannot drive off the edge.", ru: "При загрузке скетча держите колёса над столом, чтобы машинка не уехала с края.", kk: "Скетчті жүктегенде машина жиектен түсіп кетпеуі үшін доңғалақтарды ауада ұстаңыз." },
    { en: "The remote's coin cell is dangerous if swallowed; keep spares away from small children.", ru: "Батарейка-таблетка из пульта опасна при проглатывании; храните запасные подальше от маленьких детей.", kk: "Пульттің дөңгелек батареясын жұтып қойса, қауіпті; қосалқыларын кішкентай балалардан алыс сақтаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["IR car ready, IR on pin 2", "key 0x18 -> forward", "released, stop", "key 0x08 -> left", "released, stop", "key 0x47 -> speed 255", "key 0x18 -> forward", "released, stop", "key 0x52 -> back", "released, stop", "key 0x44 (unused)"],
    leds: [{ label: "PWR", color: "#7CB342" }, { label: "L (IR)", color: "#F57C00" }, { label: "ENA", color: "#00ACC1" }, { label: "ENB", color: "#3949AB" }],
  },
} satisfies GuideContent;
