import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pedestrian-traffic-light",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "home",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 12,
  xpReward: 120,
  title: {
    en: "Pedestrian Traffic Light",
    ru: "Пешеходный светофор",
    kk: "Жаяу жүргіншілер бағдаршамы",
  },
  summary: {
    en: "Three LEDs run a real traffic-light cycle, and a push button asks for a pedestrian crossing without freezing the program.",
    ru: "Три светодиода работают как настоящий светофор, а кнопка запрашивает переход для пешехода, не останавливая программу.",
    kk: "Үш жарық диоды нағыз бағдаршам циклін орындайды, ал батырма бағдарламаны тоқтатпай жаяу жүргіншіге өтуді сұрайды.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "led", qty: 3, spec: { en: "5 mm: red, yellow, green", ru: "5 мм: красный, жёлтый, зелёный", kk: "5 мм: қызыл, сары, жасыл" }, role: { en: "Traffic lights", ru: "Сигналы светофора", kk: "Бағдаршам сигналдары" } },
    { component: "resistor", qty: 3, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиодов", kk: "Жарық диодтарының тогын шектеу" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Crossing request", ru: "Запрос перехода", kk: "Өтуді сұрау" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "r_red", component: "resistor", label: "220 Ω" },
    { id: "r_yel", component: "resistor", label: "220 Ω" },
    { id: "r_grn", component: "resistor", label: "220 Ω" },
    { id: "led_red", component: "led", label: "Red" },
    { id: "led_yel", component: "led", label: "Yellow" },
    { id: "led_grn", component: "led", label: "Green" },
    { id: "btn", component: "push-button", label: "Cross" },
  ],
  connections: [
    { from: "board.D9", to: "r_red.A", color: "red" },
    { from: "r_red.B", to: "led_red.A", color: "red", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led_red.K", to: "board.GND", color: "black" },
    { from: "board.D10", to: "r_yel.A", color: "yellow" },
    { from: "r_yel.B", to: "led_yel.A", color: "yellow" },
    { from: "led_yel.K", to: "board.GND", color: "black" },
    { from: "board.D11", to: "r_grn.A", color: "green" },
    { from: "r_grn.B", to: "led_grn.A", color: "green" },
    { from: "led_grn.K", to: "board.GND", color: "black" },
    { from: "board.D2", to: "btn.1", color: "blue", note: { en: "uses the internal pull-up, no resistor needed", ru: "внутренняя подтяжка, резистор не нужен", kk: "ішкі тарту, резистор қажет емес" } },
    { from: "btn.2", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Place the LEDs and resistors", ru: "Установите светодиоды и резисторы", kk: "Жарық диодтары мен резисторларды орнатыңыз" },
      body: {
        en: "Put the red, yellow and green LEDs in a column on the breadboard, long leg (anode) on the right. Plug a 220 Ω resistor into the row of each anode.",
        ru: "Поставьте красный, жёлтый и зелёный светодиоды в столбик на макетке, длинной ножкой (анод) вправо. В ряд каждого анода вставьте резистор 220 Ом.",
        kk: "Қызыл, сары және жасыл жарық диодтарын макет тақтасына бағанмен қойыңыз, ұзын аяғы (анод) оңға қарасын. Әр анодтың қатарына 220 Ом резистор қойыңыз.",
      },
      expect: { en: "Three LEDs in a column, each with its own resistor.", ru: "Три светодиода в столбик, у каждого свой резистор.", kk: "Бағанда үш жарық диоды, әрқайсысының өз резисторы бар." },
      mistake: { en: "An LED turned the wrong way round simply stays dark.", ru: "Светодиод, вставленный наоборот, просто не горит.", kk: "Кері қойылған жарық диоды жай ғана жанбайды." },
    },
    {
      title: { en: "Wire the lights to the Arduino", ru: "Подключите светофор к Arduino", kk: "Бағдаршамды Arduino-ға қосыңыз" },
      body: {
        en: "Run a wire from D9 to the red LED's resistor, D10 to yellow and D11 to green. Connect every short leg (cathode) to the GND rail and the rail to Arduino GND.",
        ru: "Проведите провод от D9 к резистору красного светодиода, от D10 к жёлтому, от D11 к зелёному. Все короткие ножки (катоды) соедините с шиной GND, а шину с GND Arduino.",
        kk: "D9-дан қызыл жарық диодының резисторына, D10-нан сарыға, D11-ден жасылға сым тартыңыз. Барлық қысқа аяқтарды (катодтарды) GND шинасына, ал шинаны Arduino GND-іне қосыңыз.",
      },
      expect: { en: "Each colour has its own pin; all cathodes share ground.", ru: "У каждого цвета свой пин, все катоды на общей земле.", kk: "Әр түстің өз пині бар, барлық катодтар ортақ жерге қосылған." },
      mistake: { en: "Skipping the resistor overloads the pin and can burn the LED.", ru: "Без резистора пин перегружается, а светодиод может сгореть.", kk: "Резисторсыз пин шамадан тыс жүктеледі, ал жарық диоды күйіп кетуі мүмкін." },
    },
    {
      title: { en: "Add the crossing button", ru: "Добавьте кнопку перехода", kk: "Өту батырмасын қосыңыз" },
      body: {
        en: "Place the button across the breadboard gap. Wire one side to D2 and the opposite side to GND. The sketch turns on the internal pull-up, so D2 reads HIGH until the button is pressed.",
        ru: "Поставьте кнопку поперёк разделительной канавки макетки. Одну сторону подключите к D2, противоположную к GND. Скетч включает внутреннюю подтяжку, поэтому D2 читает HIGH, пока кнопка не нажата.",
        kk: "Батырманы макет тақтасының бөлгіш ойығына көлденең қойыңыз. Бір жағын D2-ге, қарама-қарсы жағын GND-ге қосыңыз. Скетч ішкі тартуды қосады, сондықтан батырма басылмайынша D2 HIGH оқиды.",
      },
      expect: { en: "Serial Monitor prints \"button pressed\" when you press it.", ru: "Serial Monitor печатает «button pressed» при нажатии.", kk: "Басқанда Serial Monitor «button pressed» деп шығарады." },
      mistake: { en: "Wiring two legs on the same side means the button is always \"pressed\".", ru: "Если подключить две ножки с одной стороны, кнопка всегда будет «нажата».", kk: "Бір жақтағы екі аяқты қоссаңыз, батырма әрқашан «басылған» болады." },
    },
    {
      title: { en: "Upload and test the cycle", ru: "Загрузите скетч и проверьте цикл", kk: "Скетчті жүктеп, циклді тексеріңіз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. The light runs green → yellow → red on a timer. Press the button during green: the green phase ends early and the pedestrian gets a longer red.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Светофор работает по таймеру: зелёный → жёлтый → красный. Нажмите кнопку на зелёном: зелёная фаза закончится раньше, а пешеход получит длинный красный.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Бағдаршам таймер бойынша жұмыс істейді: жасыл → сары → қызыл. Жасылда батырманы басыңыз: жасыл фаза ертерек аяқталып, жаяу жүргіншіге ұзағырақ қызыл беріледі.",
      },
      expect: { en: "The cycle never freezes, even while you hold the button.", ru: "Цикл не зависает, даже если держать кнопку.", kk: "Батырманы басып тұрсаңыз да, цикл тоқтап қалмайды." },
      mistake: { en: "Using delay() for the whole cycle would make the button feel dead.", ru: "Если весь цикл сделать на delay(), кнопка будет «не отвечать».", kk: "Бүкіл циклді delay() арқылы жасасаңыз, батырма «жауап бермейтін» болады." },
    },
  ],
  code: [{
    filename: "traffic_light.ino",
    language: "cpp",
    libraries: [],
    source: `const int RED = 9, YELLOW = 10, GREEN = 11, BUTTON = 2;

enum Phase { GO, CAUTION, STOP };
Phase phase = GO;
unsigned long phaseStart = 0;
bool crossingRequested = false;

const unsigned long GREEN_MS = 8000, YELLOW_MS = 2000, RED_MS = 5000, CROSS_RED_MS = 9000;

void show(Phase p) {
  digitalWrite(GREEN, p == GO);
  digitalWrite(YELLOW, p == CAUTION);
  digitalWrite(RED, p == STOP);
}

void setup() {
  Serial.begin(9600);
  pinMode(RED, OUTPUT); pinMode(YELLOW, OUTPUT); pinMode(GREEN, OUTPUT);
  pinMode(BUTTON, INPUT_PULLUP);   // pressed = LOW
  show(phase);
  phaseStart = millis();
}

void loop() {
  if (digitalRead(BUTTON) == LOW && !crossingRequested) {
    crossingRequested = true;
    Serial.println("button pressed");
  }

  unsigned long elapsed = millis() - phaseStart;
  unsigned long greenLimit = crossingRequested ? 2000 : GREEN_MS;
  unsigned long redLimit = crossingRequested ? CROSS_RED_MS : RED_MS;

  if ((phase == GO && elapsed >= greenLimit) ||
      (phase == CAUTION && elapsed >= YELLOW_MS) ||
      (phase == STOP && elapsed >= redLimit)) {
    if (phase == STOP) crossingRequested = false;
    phase = phase == GO ? CAUTION : phase == CAUTION ? STOP : GO;
    phaseStart = millis();
    show(phase);
    Serial.println(phase == GO ? "GREEN" : phase == CAUTION ? "YELLOW" : "RED");
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "One LED never lights", ru: "Один светодиод не горит", kk: "Бір жарық диоды жанбайды" },
      cause: { en: "It is in backwards, or its resistor is in a different breadboard row.", ru: "Он вставлен наоборот, или его резистор стоит в другом ряду макетки.", kk: "Ол кері қойылған немесе оның резисторы макет тақтасының басқа қатарында тұр." },
      fix: { en: "Turn the LED so the long leg faces the resistor, and check both legs share a row with their wires.", ru: "Разверните светодиод длинной ножкой к резистору и проверьте, что ножки стоят в одних рядах с проводами.", kk: "Жарық диодын ұзын аяғымен резисторға қаратып бұрыңыз және аяқтары сымдармен бір қатарда тұрғанын тексеріңіз." },
    },
    {
      symptom: { en: "The button does nothing", ru: "Кнопка ничего не делает", kk: "Батырма ештеңе істемейді" },
      cause: { en: "Both wires are on the same side of the button, which is always connected.", ru: "Оба провода на одной стороне кнопки, а эти ножки всегда соединены.", kk: "Екі сым батырманың бір жағында, ал бұл аяқтар әрқашан жалғанып тұрады." },
      fix: { en: "Move one wire to the diagonally opposite leg.", ru: "Перенесите один провод на ножку по диагонали.", kk: "Бір сымды диагональ бойынша қарама-қарсы аяққа ауыстырыңыз." },
    },
    {
      symptom: { en: "Lights flicker or the board resets", ru: "Свет мигает или плата перезагружается", kk: "Жарық жыпылықтайды немесе плата қайта жүктеледі" },
      cause: { en: "A loose GND wire or a missing resistor.", ru: "Плохо вставлен провод GND или нет резистора.", kk: "GND сымы нашар қосылған немесе резистор жоқ." },
      fix: { en: "Push every wire fully into the breadboard and make sure each LED has its 220 Ω resistor.", ru: "Вставьте все провода до конца и убедитесь, что у каждого светодиода есть резистор 220 Ом.", kk: "Барлық сымдарды соңына дейін енгізіп, әр жарық диодында 220 Ом резисторы бар екенін тексеріңіз." },
    },
  ],
  safety: [
    { en: "Never connect an LED to a pin without its resistor.", ru: "Никогда не подключайте светодиод к пину без резистора.", kk: "Жарық диодын ешқашан резисторсыз пинге қоспаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["GREEN", "button pressed", "YELLOW", "RED", "GREEN", "YELLOW", "RED", "GREEN"],
    leds: [{ label: "RED", color: "#E53935" }, { label: "YELLOW", color: "#FDD835" }, { label: "GREEN", color: "#43A047" }],
  },
} satisfies GuideContent;
