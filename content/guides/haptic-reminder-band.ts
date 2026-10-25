import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "haptic-reminder-band",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "wearables",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 10,
  xpReward: 130,
  title: {
    en: "Haptic Reminder Band",
    ru: "Вибробраслет-напоминалка",
    kk: "Дірілдейтін еске салғыш білезік",
  },
  summary: {
    en: "A coin vibration motor on your wrist buzzes every 20 minutes to remind you to stand up or drink water. A transistor drives the motor, one button restarts the timer and a long press changes the interval.",
    ru: "Плоский вибромотор на запястье жужжит каждые 20 минут, напоминая встать или выпить воды. Мотором управляет транзистор, одна кнопка перезапускает таймер, а долгое нажатие меняет интервал.",
    kk: "Білектегі жалпақ діріл моторы тұруды немесе су ішуді еске салу үшін әр 20 минут сайын дірілдейді. Моторды транзистор басқарады, бір батырма таймерді қайта бастайды, ал ұзақ басу аралықты өзгертеді.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V, USB powered", ru: "ATmega328P, 5 В, питание от USB", kk: "ATmega328P, 5 В, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "vibration-motor", qty: 1, spec: { en: "10 mm coin, 3 V, ~80 mA", ru: "плоский 10 мм, 3 В, ~80 мА", kk: "жалпақ 10 мм, 3 В, ~80 мА" }, role: { en: "Buzzes on the wrist", ru: "Вибрирует на запястье", kk: "Білекте дірілдейді" } },
    { component: "npn-transistor", qty: 1, spec: { en: "2N2222 (600 mA), TO-92", ru: "2N2222 (600 мА), TO-92", kk: "2N2222 (600 мА), TO-92" }, role: { en: "Motor switch", ru: "Ключ мотора", kk: "Мотор кілті" } },
    { component: "resistor", qty: 1, spec: { en: "1 kΩ, ¼ W", ru: "1 кОм, ¼ Вт", kk: "1 кОм, ¼ Вт" }, role: { en: "Base resistor", ru: "Резистор базы", kk: "База резисторы" } },
    { component: "diode", qty: 1, spec: { en: "1N4148", ru: "1N4148", kk: "1N4148" }, role: { en: "Flyback diode across the motor", ru: "Защитный диод на моторе", kk: "Мотордағы қорғаныс диоды" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Restart / change interval", ru: "Перезапуск / смена интервала", kk: "Қайта бастау / аралықты өзгерту" } },
    { component: "usb-5v", qty: 1, spec: { en: "small power bank with an auto-off-free mode", ru: "маленький повербанк без автоотключения", kk: "автоөшірусіз кішкене повербанк" }, role: { en: "Portable power through the Nano's USB", ru: "Автономное питание через USB Nano", kk: "Nano USB-і арқылы автономды қорек" } },
    { component: "breadboard", qty: 1, spec: { en: "mini 170 points (later a perfboard)", ru: "мини на 170 точек (потом макетная плата под пайку)", kk: "170 нүктелік шағын (кейін дәнекерлеу платасы)" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "mot", component: "vibration-motor", label: "Coin motor" },
    { id: "q1", component: "npn-transistor", label: "2N2222" },
    { id: "r_b", component: "resistor", label: "1 kΩ" },
    { id: "d1", component: "diode", label: "1N4148" },
    { id: "btn", component: "push-button", label: "Button" },
  ],
  connections: [
    { from: "board.5V", to: "mot.+", color: "red", note: { en: "PWM keeps the average near 3 V", ru: "ШИМ держит среднее около 3 В", kk: "ШИМ орташа кернеуді шамамен 3 В-та ұстайды" } },
    { from: "mot.-", to: "q1.C", color: "blue" },
    { from: "q1.E", to: "board.GND", color: "black" },
    { from: "board.D5", to: "r_b.A", color: "orange", note: { en: "PWM pin", ru: "пин ШИМ", kk: "ШИМ пині" } },
    { from: "r_b.B", to: "q1.B", color: "orange" },
    { from: "d1.A", to: "mot.-", color: "gray" },
    { from: "d1.K", to: "mot.+", color: "gray", note: { en: "stripe towards +5 V", ru: "полоска к +5 В", kk: "жолақ +5 В жаққа" } },
    { from: "board.D2", to: "btn.1", color: "green", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажато = LOW", kk: "ішкі тарту, басылғанда = LOW" } },
    { from: "btn.2", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Identify the transistor legs", ru: "Определите выводы транзистора", kk: "Транзистордың аяқтарын анықтаңыз" },
      body: {
        en: "Hold the 2N2222 with the flat, printed face towards you. A PN2222A reads E, B, C from left to right; some P2N2222A parts are C, B, E. Check the datasheet of your exact part number and mark the emitter with a pen before you build.",
        ru: "Держите 2N2222 плоской стороной с надписью к себе. У PN2222A выводы слева направо — E, B, C; у некоторых P2N2222A — C, B, E. Сверьтесь с даташитом именно вашей маркировки и отметьте эмиттер маркером до сборки.",
        kk: "2N2222-ні жазуы бар жалпақ жағын өзіңізге қаратып ұстаңыз. PN2222A-да аяқтар солдан оңға қарай E, B, C; кейбір P2N2222A-да C, B, E. Дәл өзіңіздегі таңбаның даташитін тексеріп, құрастырмас бұрын эмиттерді маркермен белгілеңіз.",
      },
      expect: { en: "You know which leg is E, B and C.", ru: "Вы знаете, какая ножка E, B и C.", kk: "Қай аяқ E, B және C екенін білесіз." },
      mistake: { en: "Swapping emitter and collector still \"sort of\" works but the motor buzzes weakly and the transistor warms up.", ru: "Если перепутать эмиттер и коллектор, схема «как бы» работает, но мотор вибрирует слабо, а транзистор греется.", kk: "Эмиттер мен коллекторды ауыстырсаңыз, схема «әйтеуір» жұмыс істейді, бірақ мотор әлсіз дірілдеп, транзистор қызады." },
    },
    {
      title: { en: "Build the motor driver", ru: "Соберите драйвер мотора", kk: "Мотор драйверін құрастырыңыз" },
      body: {
        en: "Emitter to GND. Collector to the motor's blue (−) wire. Motor red (+) wire to the Nano 5V pin. A 1 kΩ resistor goes from D5 to the base; it lets about 4 mA flow, plenty to switch 100 mA fully on. Finally put the 1N4148 across the motor: stripe on the red/5V side, the other end on the blue/collector side.",
        ru: "Эмиттер на GND. Коллектор к синему (−) проводу мотора. Красный (+) провод мотора на пин 5V Nano. Резистор 1 кОм ставится от D5 к базе: через него течёт около 4 мА, этого с запасом хватит, чтобы полностью открыть ключ на 100 мА. В конце поставьте 1N4148 параллельно мотору: полоской к красному/5V, другим концом к синему/коллектору.",
        kk: "Эмиттерді GND-ге қосыңыз. Коллекторды мотордың көк (−) сымына. Мотордың қызыл (+) сымын Nano-ның 5V пиніне. 1 кОм резисторды D5-тен базаға қойыңыз: ол арқылы шамамен 4 мА ағады, бұл 100 мА кілтті толық ашуға жеткілікті. Соңында 1N4148-ді моторға параллель қойыңыз: жолағы қызыл/5V жаққа, екінші ұшы көк/коллектор жаққа.",
      },
      expect: { en: "The motor is between 5V and the collector, the diode sits across it, the base has its resistor.", ru: "Мотор стоит между 5V и коллектором, диод параллельно ему, у базы свой резистор.", kk: "Мотор 5V пен коллектор арасында, диод оған параллель, базаның өз резисторы бар." },
      mistake: { en: "Connecting the motor straight to D5: the pin can give only ~20 mA and the motor's back-EMF can damage it.", ru: "Если подключить мотор прямо к D5, пин выдаст лишь ~20 мА, а обратная ЭДС мотора может его повредить.", kk: "Моторды тікелей D5-ке қоссаңыз, пин тек ~20 мА береді, ал мотордың кері ЭҚК-сы оны зақымдауы мүмкін." },
    },
    {
      title: { en: "Add the button", ru: "Добавьте кнопку", kk: "Батырманы қосыңыз" },
      body: {
        en: "Wire one side of the button to D2 and the diagonal side to GND. The sketch uses the internal pull-up. A short press restarts the countdown; holding it for more than 1 s cycles the interval through 10, 20, 30, 45 and 60 minutes.",
        ru: "Одну сторону кнопки подключите к D2, диагональную — к GND. Скетч использует внутреннюю подтяжку. Короткое нажатие перезапускает отсчёт, удержание дольше 1 с переключает интервал: 10, 20, 30, 45 и 60 минут.",
        kk: "Батырманың бір жағын D2-ге, диагональ жағын GND-ге қосыңыз. Скетч ішкі тартуды қолданады. Қысқа басу кері санауды қайта бастайды, 1 с-тан ұзақ басып тұру аралықты ауыстырады: 10, 20, 30, 45 және 60 минут.",
      },
      expect: { en: "A long press gives one short buzz and prints the new interval.", ru: "Долгое нажатие даёт один короткий импульс вибрации и печатает новый интервал.", kk: "Ұзақ басу бір қысқа діріл береді және жаңа аралықты шығарады." },
      mistake: { en: "Using two legs on the same side of the button: it reads as always pressed.", ru: "Если взять две ножки с одной стороны кнопки, она будет всегда «нажата».", kk: "Батырманың бір жағындағы екі аяқты алсаңыз, ол әрдайым «басылған» болып оқылады." },
    },
    {
      title: { en: "Upload and test", ru: "Загрузите скетч и проверьте", kk: "Скетчті жүктеп, тексеріңіз" },
      body: {
        en: "Select Arduino Nano (try \"ATmega328P (Old Bootloader)\" if the upload fails), upload and open the Serial Monitor at 9600 baud. The band confirms start with one buzz. For a quick test set INTERVALS_MIN to {1, 2, 3, 4, 5}; a reminder is three 0.4 s pulses.",
        ru: "Выберите Arduino Nano (если загрузка не идёт, попробуйте «ATmega328P (Old Bootloader)»), загрузите скетч и откройте Serial Monitor на 9600 бод. При старте браслет вибрирует один раз. Для быстрой проверки поставьте INTERVALS_MIN = {1, 2, 3, 4, 5}; напоминание — три импульса по 0,4 с.",
        kk: "Arduino Nano таңдаңыз (жүктелмесе, «ATmega328P (Old Bootloader)» байқап көріңіз), скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Іске қосылғанда білезік бір рет дірілдейді. Жылдам тексеру үшін INTERVALS_MIN = {1, 2, 3, 4, 5} қойыңыз; еске салу — 0,4 с-тық үш импульс.",
      },
      expect: { en: "Serial counts down the minutes and prints \"reminder: buzz\" when the motor pulses.", ru: "Serial отсчитывает минуты и печатает «reminder: buzz», когда мотор вибрирует.", kk: "Serial минуттарды кері санап, мотор дірілдегенде «reminder: buzz» деп шығарады." },
      mistake: { en: "Running the coin motor at 100 % PWM from 5 V shortens its life; MOTOR_DUTY = 150 keeps it near its rated 3 V.", ru: "Если гонять плоский мотор на 100 % ШИМ от 5 В, он быстро износится; MOTOR_DUTY = 150 держит его около номинальных 3 В.", kk: "Жалпақ моторды 5 В-тан 100 % ШИМ-мен жүргізсеңіз, ол тез тозады; MOTOR_DUTY = 150 оны номиналды 3 В маңында ұстайды." },
    },
    {
      title: { en: "Make it wearable", ru: "Сделайте носимым", kk: "Тағылатын етіңіз" },
      body: {
        en: "Glue the coin motor (it has a sticky back) to the inside of a fabric or silicone strap so it touches the skin. Move the circuit to a small perfboard, solder the joints and wrap the motor leads with heat-shrink. Power the Nano from a small power bank through its USB port; the whole band draws about 20 mA idle.",
        ru: "Приклейте плоский мотор (у него клейкая основа) к внутренней стороне тканевого или силиконового ремешка, чтобы он касался кожи. Перенесите схему на маленькую макетную плату под пайку, пропаяйте и закройте выводы мотора термоусадкой. Питайте Nano от маленького повербанка через его USB; в простое браслет потребляет около 20 мА.",
        kk: "Жалпақ моторды (оның желімді табаны бар) теріге тиіп тұратындай етіп мата немесе силикон бауының ішкі жағына жапсырыңыз. Схеманы шағын дәнекерлеу платасына көшіріп, дәнекерлеңіз де, мотор сымдарын термоотырғызғышпен жабыңыз. Nano-ны оның USB порты арқылы кішкене повербанктен қоректендіріңіз; күту режимінде білезік шамамен 20 мА тұтынады.",
      },
      expect: { en: "You clearly feel the pulses through the strap.", ru: "Импульсы отчётливо чувствуются через ремешок.", kk: "Импульстар бау арқылы анық сезіледі." },
      mistake: { en: "Many power banks switch off below ~50 mA; pick one with an always-on or low-current mode.", ru: "Многие повербанки отключаются при токе ниже ~50 мА; выберите модель с режимом постоянной работы или малого тока.", kk: "Көп повербанктер ~50 мА-дан төмен токта өшіп қалады; үнемі қосулы немесе аз ток режимі бар модельді таңдаңыз." },
    },
  ],
  code: [{
    filename: "haptic_band.ino",
    language: "cpp",
    libraries: [],
    source: `const int MOTOR_PIN = 5;      // PWM -> 1k -> 2N2222 base
const int BUTTON_PIN = 2;     // to GND, internal pull-up

const int MOTOR_DUTY = 150;   // 150/255 of 5 V = about 2.9 V for a 3 V coin motor
const unsigned long LONG_PRESS_MS = 1000;
const byte INTERVALS_MIN[] = {10, 20, 30, 45, 60};
const byte INTERVAL_COUNT = 5;

byte intervalIdx = 1;         // start with 20 minutes
unsigned long lastReminder = 0;
unsigned long lastStatus = 0;
bool wasDown = false;
unsigned long downAt = 0;

void buzz(int pulses, int onMs) {
  for (int i = 0; i < pulses; i++) {
    analogWrite(MOTOR_PIN, MOTOR_DUTY);
    delay(onMs);
    analogWrite(MOTOR_PIN, 0);
    delay(250);
  }
}

unsigned long intervalMs() {
  return INTERVALS_MIN[intervalIdx] * 60000UL;
}

void restart() {
  lastReminder = millis();
  lastStatus = millis();
}

void setup() {
  Serial.begin(9600);
  pinMode(MOTOR_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  Serial.print("Haptic reminder: every ");
  Serial.print(INTERVALS_MIN[intervalIdx]);
  Serial.println(" min");
  buzz(1, 150);
  restart();
}

void loop() {
  bool down = digitalRead(BUTTON_PIN) == LOW;
  if (down && !wasDown) downAt = millis();
  if (!down && wasDown) {
    unsigned long held = millis() - downAt;
    if (held >= LONG_PRESS_MS) {             // long press: next interval
      intervalIdx = (intervalIdx + 1) % INTERVAL_COUNT;
      Serial.print("interval set to ");
      Serial.print(INTERVALS_MIN[intervalIdx]);
      Serial.println(" min");
      buzz(1, 150);
      restart();
    } else if (held > 30) {                  // short press (ignore bounce)
      Serial.println("timer restarted");
      restart();
    }
  }
  wasDown = down;

  unsigned long elapsed = millis() - lastReminder;
  if (elapsed >= intervalMs()) {
    Serial.println("reminder: buzz");
    buzz(3, 400);
    restart();
  } else if (millis() - lastStatus >= 60000UL) {
    lastStatus = millis();
    Serial.print((intervalMs() - elapsed + 59999UL) / 60000UL);
    Serial.println(" min left");
  }
  delay(10);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The motor never vibrates", ru: "Мотор вообще не вибрирует", kk: "Мотор мүлде дірілдемейді" },
      cause: { en: "Transistor legs mixed up, base resistor not on D5, or the diode is reversed and shorts the motor.", ru: "Перепутаны выводы транзистора, резистор базы не на D5, или диод перевёрнут и закорачивает мотор.", kk: "Транзистор аяқтары ауысқан, база резисторы D5-те емес немесе диод кері қойылып, моторды тұйықтап тұр." },
      fix: { en: "Re-check E-B-C against the datasheet and turn the diode so the stripe faces 5V.", ru: "Сверьте E-B-C с даташитом и поверните диод полоской к 5V.", kk: "E-B-C-ні даташитпен салыстырып, диодты жолағын 5V-қа қаратып бұрыңыз." },
    },
    {
      symptom: { en: "The Nano resets or the USB disconnects when it buzzes", ru: "Nano перезагружается или отваливается USB при вибрации", kk: "Дірілдегенде Nano қайта жүктеледі немесе USB ажырайды" },
      cause: { en: "Missing flyback diode: the motor's voltage spikes reach the 5 V rail.", ru: "Нет защитного диода: выбросы напряжения мотора попадают на шину 5 В.", kk: "Қорғаныс диоды жоқ: мотордың кернеу импульстары 5 В шинасына түседі." },
      fix: { en: "Fit the 1N4148 directly across the motor wires; a 100 nF capacitor across the motor helps further.", ru: "Поставьте 1N4148 прямо на провода мотора; дополнительно поможет конденсатор 100 нФ параллельно мотору.", kk: "1N4148-ді тікелей мотор сымдарына қойыңыз; моторға параллель 100 нФ конденсатор да көмектеседі." },
    },
    {
      symptom: { en: "The vibration is too weak to notice", ru: "Вибрация слишком слабая", kk: "Діріл тым әлсіз" },
      cause: { en: "The motor is not pressed against the skin, or the duty is set low.", ru: "Мотор не прижат к коже, или скважность выставлена низкой.", kk: "Мотор теріге қысылмаған немесе толтыру коэффициенті төмен қойылған." },
      fix: { en: "Move the motor to the inside of the strap and raise MOTOR_DUTY to 170 at most.", ru: "Перенесите мотор на внутреннюю сторону ремешка и поднимите MOTOR_DUTY максимум до 170.", kk: "Моторды баудың ішкі жағына ауыстырып, MOTOR_DUTY мәнін ең көбі 170-ке дейін көтеріңіз." },
    },
  ],
  safety: [
    { en: "Cover all solder joints and the motor leads before wearing it, so nothing touches sweaty skin.", ru: "Перед ношением закройте все пайки и выводы мотора, чтобы ничего не касалось влажной кожи.", kk: "Тақпас бұрын барлық дәнекерлеу орындары мен мотор сымдарын жабыңыз, сонда дымқыл теріге ештеңе тимейді." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "Haptic reminder: every 20 min",
      "19 min left",
      "18 min left",
      "interval set to 30 min",
      "29 min left",
      "timer restarted",
      "29 min left",
      "1 min left",
      "reminder: buzz",
      "29 min left",
    ],
    leds: [{ label: "MOTOR", color: "#FB8C00" }],
  },
} satisfies GuideContent;
