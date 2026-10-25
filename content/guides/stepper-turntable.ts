import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "stepper-turntable",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "tools",
  robotics: false,
  difficulty: "beginner",
  hours: 2,
  costUsd: 15,
  xpReward: 140,
  title: {
    en: "Stepper Turntable for 360° Product Photos",
    ru: "Поворотный столик на шаговом моторе для фото 360°",
    kk: "360° өнім фотосына арналған қадамдық айналмалы үстел",
  },
  summary: {
    en: "A 28BYJ-48 stepper turns a small plate at a steady 1–10 rpm for 360° product shots. A button starts and stops it, a knob sets the speed, and the motor has its own 5 V supply.",
    ru: "Шаговый мотор 28BYJ-48 ровно вращает столик со скоростью 1–10 об/мин для съёмки товаров на 360°. Кнопка запускает и останавливает, ручка задаёт скорость, у мотора своё питание 5 В.",
    kk: "28BYJ-48 қадамдық моторы 360° өнім түсірілімі үшін кішкене үстелді минутына 1–10 айналыммен бірқалыпты айналдырады. Батырма іске қосып, тоқтатады, тұтқа жылдамдықты орнатады, ал мотордың өз 5 В қорегі бар.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "stepper-28byj48", qty: 1, spec: { en: "5 V version, 4096 half-steps per turn", ru: "версия на 5 В, 4096 полушагов на оборот", kk: "5 В нұсқасы, бір айналымға 4096 жарты қадам" }, role: { en: "Turns the plate", ru: "Вращает столик", kk: "Үстелді айналдырады" } },
    { component: "uln2003", qty: 1, spec: { en: "board with 5-pin motor socket", ru: "плата с 5-контактным гнездом мотора", kk: "5 контактілі мотор ұяшығы бар плата" }, role: { en: "Stepper driver", ru: "Драйвер шагового мотора", kk: "Қадамдық мотор драйвері" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V 1 A USB charger + USB breakout", ru: "USB-зарядка 5 В 1 А + USB-переходник на пины", kk: "5 В 1 А USB зарядтағыш + USB-пин адаптері" }, role: { en: "Motor power", ru: "Питание мотора", kk: "Мотордың қорегі" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Start / stop", ru: "Пуск / стоп", kk: "Іске қосу / тоқтату" } },
    { component: "potentiometer", qty: 1, spec: { en: "10 kΩ linear", ru: "10 кОм, линейный", kk: "10 кОм, сызықтық" }, role: { en: "Speed knob", ru: "Ручка скорости", kk: "Жылдамдық тұтқасы" } },
    { component: "enclosure", qty: 1, spec: { en: "base box + 15–20 cm plate, lazy-susan bearing", ru: "корпус-основание + диск 15–20 см, поворотный подшипник", kk: "негіз қорап + 15–20 см диск, айналмалы мойынтірек" }, role: { en: "Turntable body", ru: "Корпус столика", kk: "Үстел корпусы" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 14, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "drv", component: "uln2003", label: "ULN2003" },
    { id: "mot", component: "stepper-28byj48", label: "28BYJ-48" },
    { id: "psu", component: "usb-5v", label: "5 V motor supply" },
    { id: "btn", component: "push-button", label: "Start/stop" },
    { id: "pot", component: "potentiometer", label: "Speed" },
  ],
  connections: [
    { from: "board.D8", to: "drv.IN1", color: "blue" },
    { from: "board.D9", to: "drv.IN2", color: "pink" },
    { from: "board.D10", to: "drv.IN3", color: "yellow" },
    { from: "board.D11", to: "drv.IN4", color: "orange" },
    { from: "drv.OUT1", to: "mot.BLU", color: "blue", note: { en: "the keyed 5-pin plug makes all five motor wires", ru: "все пять проводов мотора идут через ключевой 5-пиновый разъём", kk: "мотордың бес сымы да кілтті 5 пинді разъём арқылы қосылады" } },
    { from: "drv.OUT2", to: "mot.PNK", color: "pink" },
    { from: "drv.OUT3", to: "mot.YEL", color: "yellow" },
    { from: "drv.OUT4", to: "mot.ORG", color: "orange" },
    { from: "drv.COM", to: "mot.RED", color: "red" },
    { from: "psu.5V", to: "drv.+", color: "red", note: { en: "keep the ON jumper next to + / − fitted", ru: "перемычка ON возле + / − должна стоять", kk: "+ / − жанындағы ON секіргіші тұруы керек" } },
    { from: "psu.GND", to: "drv.-", color: "black" },
    { from: "drv.-", to: "board.GND", color: "black", note: { en: "shared ground with the Arduino", ru: "общая земля с Arduino", kk: "Arduino-мен ортақ жер" } },
    { from: "board.D2", to: "btn.1", color: "green", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажато = LOW", kk: "ішкі тарту, басылғанда = LOW" } },
    { from: "btn.2", to: "board.GND2", color: "black" },
    { from: "pot.1", to: "board.5V", color: "red" },
    { from: "pot.W", to: "board.A0", color: "white" },
    { from: "pot.2", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Build the turntable mechanics", ru: "Соберите механику столика", kk: "Үстелдің механикасын құрастырыңыз" },
      body: {
        en: "Mount the 28BYJ-48 in the middle of the base box with its shaft pointing up. Put a lazy-susan bearing on top of the box and fix the plate to it, then join the plate centre to the 5 mm D-shaft with a hub or a tight 3D-printed adapter. The bearing carries the weight; the motor only turns the plate.",
        ru: "Закрепите 28BYJ-48 в центре корпуса валом вверх. Сверху положите поворотный подшипник («ленивую Сьюзан») и закрепите на нём диск, а центр диска соедините с 5-мм валом с лыской через втулку или плотный напечатанный переходник. Вес держит подшипник, мотор только вращает диск.",
        kk: "28BYJ-48-ді қорап ортасына білігін жоғары қаратып бекітіңіз. Үстіне айналмалы мойынтірек қойып, дискіні соған бекітіңіз, ал диск ортасын 5 мм жалпақ білікке втулка немесе тығыз басып шығарылған адаптер арқылы жалғаңыз. Салмақты мойынтірек көтереді, мотор тек дискіні айналдырады.",
      },
      expect: { en: "The plate spins freely by hand and sits level, with no wobble on the shaft.", ru: "Диск свободно крутится рукой, стоит ровно и не болтается на валу.", kk: "Диск қолмен еркін айналады, тегіс тұрады және білікте шайқалмайды." },
      mistake: { en: "Hanging the whole plate and product on the motor shaft: the cheap gearbox wears out and the plate wobbles in the photos.", ru: "Если весь вес диска и товара висит на валу мотора, дешёвый редуктор быстро изнашивается, а диск качается на фото.", kk: "Диск пен өнімнің бүкіл салмағы мотор білігінде болса, арзан редуктор тез тозады, ал фотода диск шайқалады." },
    },
    {
      title: { en: "Connect the ULN2003 driver", ru: "Подключите драйвер ULN2003", kk: "ULN2003 драйверін қосыңыз" },
      body: {
        en: "Push the motor's white 5-pin plug into the driver socket (it fits only one way). Wire IN1, IN2, IN3, IN4 on the driver to D8, D9, D10, D11. The four LEDs on the driver show which coil is on.",
        ru: "Вставьте белый 5-пиновый разъём мотора в гнездо драйвера (он входит только одной стороной). Соедините IN1, IN2, IN3, IN4 драйвера с D8, D9, D10, D11. Четыре светодиода на драйвере показывают, какая обмотка включена.",
        kk: "Мотордың ақ 5 пинді разъёмын драйвер ұяшығына салыңыз (ол тек бір жағымен кіреді). Драйвердің IN1, IN2, IN3, IN4 пиндерін D8, D9, D10, D11-ге қосыңыз. Драйвердегі төрт жарық диоды қай орама қосулы екенін көрсетеді.",
      },
      expect: { en: "IN1–IN4 run in order to D8–D11.", ru: "IN1–IN4 идут по порядку на D8–D11.", kk: "IN1–IN4 ретімен D8–D11-ге барады." },
      mistake: { en: "Swapping two IN wires makes the motor buzz and shake in place instead of turning.", ru: "Если перепутать два провода IN, мотор будет жужжать и дрожать на месте вместо вращения.", kk: "Екі IN сымын ауыстырып алсаңыз, мотор айналудың орнына бір орнында ызыңдап, дірілдейді." },
    },
    {
      title: { en: "Give the motor its own 5 V", ru: "Дайте мотору отдельные 5 В", kk: "Моторға бөлек 5 В беріңіз" },
      body: {
        en: "Connect the 5 V output of the USB charger breakout to + on the ULN2003 and its GND to −. Check the small ON jumper next to + and − is in place. Then run one wire from − on the driver to an Arduino GND pin. The motor draws about 240 mA, so it stays off the Arduino 5V pin.",
        ru: "Подключите выход 5 В переходника USB-зарядки к + на ULN2003, а GND к −. Проверьте, что маленькая перемычка ON возле + и − стоит на месте. Затем проведите один провод от − драйвера к пину GND Arduino. Мотор потребляет около 240 мА, поэтому он не питается от пина 5V Arduino.",
        kk: "USB зарядтағыш адаптерінің 5 В шығысын ULN2003-тегі +-ке, ал GND-ін −-ке қосыңыз. + пен − жанындағы кішкене ON секіргіші орнында тұрғанын тексеріңіз. Содан кейін драйвердің −-інен Arduino-ның GND пиніне бір сым тартыңыз. Мотор шамамен 240 мА тұтынады, сондықтан ол Arduino-ның 5V пинінен қоректенбейді.",
      },
      expect: { en: "The driver's power LED lights when the charger is plugged in.", ru: "При подключении зарядки загорается светодиод питания драйвера.", kk: "Зарядтағышты қосқанда драйвердің қуат жарық диоды жанады." },
      mistake: { en: "Skipping the GND wire between driver and Arduino: the coils switch randomly or not at all.", ru: "Без провода GND между драйвером и Arduino обмотки переключаются хаотично или не переключаются вовсе.", kk: "Драйвер мен Arduino арасында GND сымы болмаса, орамалар ретсіз қосылады немесе мүлде қосылмайды." },
    },
    {
      title: { en: "Add the button and the speed knob", ru: "Добавьте кнопку и ручку скорости", kk: "Батырма мен жылдамдық тұтқасын қосыңыз" },
      body: {
        en: "Place the button across the breadboard gap: one side to D2, the diagonal side to GND (the sketch enables the internal pull-up). Wire the potentiometer's outer legs to the Arduino 5V and GND and its middle leg to A0.",
        ru: "Поставьте кнопку поперёк канавки макетки: одну сторону к D2, диагональную к GND (скетч включает внутреннюю подтяжку). Крайние ножки потенциометра подключите к 5V и GND Arduino, среднюю — к A0.",
        kk: "Батырманы макет тақтасының ойығына көлденең қойыңыз: бір жағын D2-ге, диагональ жағын GND-ге қосыңыз (скетч ішкі тартуды қосады). Потенциометрдің шеткі аяқтарын Arduino-ның 5V және GND пиндеріне, ортаңғы аяғын A0-ге қосыңыз.",
      },
      expect: { en: "Turning the knob changes the speed printed in the Serial Monitor.", ru: "При повороте ручки в Serial Monitor меняется скорость.", kk: "Тұтқаны бұрағанда Serial Monitor-дағы жылдамдық өзгереді." },
      mistake: { en: "Powering the pot from the motor supply: any motor noise then shows up as speed jumps.", ru: "Если запитать потенциометр от питания мотора, помехи мотора превратятся в скачки скорости.", kk: "Потенциометрді мотордың қорегінен қоректендірсеңіз, мотордың кедергілері жылдамдықтың секірулеріне айналады." },
    },
    {
      title: { en: "Upload and shoot", ru: "Загрузите скетч и снимайте", kk: "Скетчті жүктеп, түсіріңіз" },
      body: {
        en: "Install AccelStepper from the Library Manager, upload the sketch and open the Serial Monitor at 9600 baud. Press the button to start, turn the knob to pick 1–10 rpm and press again to stop. For a 36-frame spin at 2 rpm (30 s per turn), take one photo every 0.83 s, or simply film one turn and pick frames. When stopped, the sketch switches the coils off so the motor stays cool.",
        ru: "Установите AccelStepper через Library Manager, загрузите скетч и откройте Serial Monitor на 9600 бод. Нажмите кнопку для пуска, ручкой выберите 1–10 об/мин, повторное нажатие останавливает. Для 36 кадров при 2 об/мин (30 с на оборот) делайте снимок каждые 0,83 с или просто снимите один оборот на видео и выберите кадры. В остановленном режиме скетч обесточивает обмотки, и мотор не греется.",
        kk: "Library Manager арқылы AccelStepper-ді орнатып, скетчті жүктеңіз де, Serial Monitor-ды 9600 бодта ашыңыз. Іске қосу үшін батырманы басыңыз, тұтқамен минутына 1–10 айналым таңдаңыз, қайта басу тоқтатады. 2 айн/мин жылдамдықта (бір айналым 30 с) 36 кадр үшін әр 0,83 с сайын суретке түсіріңіз немесе бір айналымды бейнеге түсіріп, кадрларды таңдаңыз. Тоқтаған кезде скетч орамаларды ажыратады, сондықтан мотор қызбайды.",
      },
      expect: { en: "The plate turns smoothly without steps or jerks, and stops when you press the button.", ru: "Диск вращается плавно, без рывков, и останавливается по нажатию кнопки.", kk: "Диск секірмей, біркелкі айналады және батырманы басқанда тоқтайды." },
      mistake: { en: "Above roughly 15 rpm the 28BYJ-48 loses steps and just hums; the sketch caps the speed at 10 rpm for that reason.", ru: "Выше примерно 15 об/мин 28BYJ-48 пропускает шаги и просто гудит; поэтому скетч ограничивает скорость 10 об/мин.", kk: "Шамамен 15 айн/мин-тан жоғары 28BYJ-48 қадамдарды өткізіп, жай ғана гуілдейді; сол себепті скетч жылдамдықты 10 айн/мин-пен шектейді." },
    },
  ],
  code: [{
    filename: "stepper_turntable.ino",
    language: "cpp",
    libraries: ["AccelStepper"],
    source: `#include <AccelStepper.h>

const int IN1_PIN = 8, IN2_PIN = 9, IN3_PIN = 10, IN4_PIN = 11;
const int BUTTON_PIN = 2;   // to GND, internal pull-up
const int POT_PIN = A0;     // speed knob

const float STEPS_PER_REV = 4096.0;   // 28BYJ-48 in half-step mode
const float MIN_RPM = 1.0;
const float MAX_RPM = 10.0;

// HALF4WIRE expects the coils in the order IN1, IN3, IN2, IN4
AccelStepper turntable(AccelStepper::HALF4WIRE, IN1_PIN, IN3_PIN, IN2_PIN, IN4_PIN);

bool running = false;
float rpm = 0;
bool lastButton = HIGH;
unsigned long lastEdge = 0;
unsigned long lastPotRead = 0;

float readRpm() {
  int raw = analogRead(POT_PIN);
  return MIN_RPM + (MAX_RPM - MIN_RPM) * raw / 1023.0;
}

void applySpeed() {
  turntable.setSpeed(rpm * STEPS_PER_REV / 60.0);   // steps per second
}

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  turntable.setMaxSpeed(1000);
  rpm = readRpm();
  applySpeed();
  turntable.disableOutputs();          // coils off until started
  Serial.println("Turntable ready. Press the button to start.");
}

void loop() {
  // button: act on the press, 30 ms debounce
  bool b = digitalRead(BUTTON_PIN);
  if (b != lastButton && millis() - lastEdge > 30) {
    lastEdge = millis();
    lastButton = b;
    if (b == LOW) {
      running = !running;
      if (running) turntable.enableOutputs();
      else turntable.disableOutputs();
      Serial.print(running ? "START " : "STOP ");
      Serial.print(rpm, 1);
      Serial.println(" rpm");
    }
  }

  // speed knob, 10 times per second, with a small deadband
  if (millis() - lastPotRead >= 100) {
    lastPotRead = millis();
    float r = readRpm();
    if (fabs(r - rpm) >= 0.2) {
      rpm = r;
      applySpeed();
      Serial.print("speed ");
      Serial.print(rpm, 1);
      Serial.print(" rpm, one turn = ");
      Serial.print(60.0 / rpm, 1);
      Serial.println(" s");
    }
  }

  if (running) turntable.runSpeed();   // one step whenever it is due
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The motor hums and vibrates but does not turn", ru: "Мотор гудит и вибрирует, но не вращается", kk: "Мотор гуілдеп, дірілдейді, бірақ айналмайды" },
      cause: { en: "IN wires out of order, or the speed is too high for the motor.", ru: "Провода IN не по порядку или скорость слишком высокая для мотора.", kk: "IN сымдары ретсіз қосылған немесе жылдамдық мотор үшін тым жоғары." },
      fix: { en: "Check D8–D11 go to IN1–IN4 in order and turn the knob down; the driver LEDs should light one after another.", ru: "Проверьте, что D8–D11 идут на IN1–IN4 по порядку, и уменьшите скорость; светодиоды драйвера должны загораться по очереди.", kk: "D8–D11 IN1–IN4-ке ретімен баратынын тексеріп, жылдамдықты азайтыңыз; драйвер жарық диодтары кезекпен жануы керек." },
    },
    {
      symptom: { en: "Nothing moves and the driver LEDs stay dark", ru: "Ничего не движется, светодиоды драйвера не горят", kk: "Ештеңе қозғалмайды, драйвер жарық диодтары жанбайды" },
      cause: { en: "No motor power, the ON jumper is missing, or the turntable is stopped.", ru: "Нет питания мотора, снята перемычка ON или столик остановлен.", kk: "Мотор қорегі жоқ, ON секіргіші алынған немесе үстел тоқтатулы." },
      fix: { en: "Plug in the 5 V charger, fit the jumper and press the button once; Serial should print START.", ru: "Подключите зарядку 5 В, поставьте перемычку и нажмите кнопку один раз; в Serial должно появиться START.", kk: "5 В зарядтағышты қосып, секіргішті орнатыңыз да, батырманы бір рет басыңыз; Serial-да START шығуы керек." },
    },
    {
      symptom: { en: "The plate stutters with a heavy product", ru: "С тяжёлым товаром диск вращается рывками", kk: "Ауыр өніммен диск секіріп айналады" },
      cause: { en: "The 28BYJ-48 has little torque; friction or an off-centre load makes it skip steps.", ru: "У 28BYJ-48 небольшой момент; трение или смещённый груз заставляют его пропускать шаги.", kk: "28BYJ-48-дің айналу моменті аз; үйкеліс немесе ортадан ығысқан жүк оны қадамдарды өткізуге мәжбүр етеді." },
      fix: { en: "Centre the product, use a smooth bearing and lower the speed to 2–4 rpm.", ru: "Поставьте товар по центру, используйте лёгкий подшипник и снизьте скорость до 2–4 об/мин.", kk: "Өнімді ортаға қойыңыз, жеңіл айналатын мойынтірек қолданыңыз және жылдамдықты 2–4 айн/мин-ға дейін төмендетіңіз." },
    },
  ],
  safety: [
    { en: "Use the 5 V version of the 28BYJ-48 with a 5 V supply only; 12 V on a 5 V motor overheats it within minutes.", ru: "Используйте 28BYJ-48 на 5 В только с питанием 5 В; 12 В перегреют 5-вольтовый мотор за несколько минут.", kk: "5 В-тық 28BYJ-48-ді тек 5 В қорекпен қолданыңыз; 12 В 5 вольттық моторды бірнеше минутта қыздырып жібереді." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "Turntable ready. Press the button to start.",
      "START 3.0 rpm",
      "speed 2.0 rpm, one turn = 30.0 s",
      "speed 4.5 rpm, one turn = 13.3 s",
      "speed 6.0 rpm, one turn = 10.0 s",
      "STOP 6.0 rpm",
      "START 6.0 rpm",
    ],
    leds: [{ label: "IN1", color: "#E53935" }, { label: "IN2", color: "#E53935" }, { label: "IN3", color: "#E53935" }, { label: "IN4", color: "#E53935" }],
  },
} satisfies GuideContent;
