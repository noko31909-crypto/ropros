import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "digital-dice",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "games",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 10,
  xpReward: 140,
  title: {
    en: "Digital Dice",
    ru: "Электронный игральный кубик",
    kk: "Электронды ойын сүйегі",
  },
  summary: {
    en: "Press the button and a TM1637 display tumbles through numbers with clicking sounds, slows down like a real die and lands on a fair 1–6 with a beep.",
    ru: "Нажмите кнопку, и дисплей TM1637 перебирает числа под щелчки, замедляется, как настоящий кубик, и останавливается на честном 1–6 с сигналом.",
    kk: "Батырманы басыңыз: TM1637 дисплейі шықылдаған дыбыспен сандарды ауыстырып, нағыз сүйек сияқты баяулайды да, әділ 1–6 санына дыбыспен тоқтайды.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "tm1637-display", qty: 1, spec: { en: "4-digit 0.56\" module, 4 pins (CLK, DIO, VCC, GND)", ru: "4-разрядный модуль 0,56\", 4 вывода (CLK, DIO, VCC, GND)", kk: "4 разрядты 0,56\" модуль, 4 шықпа (CLK, DIO, VCC, GND)" }, role: { en: "Shows the roll", ru: "Показывает результат броска", kk: "Лақтыру нәтижесін көрсетеді" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Roll button", ru: "Кнопка броска", kk: "Лақтыру батырмасы" } },
    { component: "buzzer-active", qty: 1, spec: { en: "5 V active buzzer (beeps on DC)", ru: "активная пищалка 5 В (пищит от постоянного тока)", kk: "5 В белсенді зуммер (тұрақты токтан шиқылдайды)" }, role: { en: "Rolling clicks and result beep", ru: "Щелчки при броске и итоговый сигнал", kk: "Лақтыру шықылы және нәтиже дыбысы" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male and 4 female-male for the display", ru: "папа-папа и 4 мама-папа для дисплея", kk: "аталық-аталық және дисплейге 4 аналық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "disp", component: "tm1637-display", label: "TM1637" },
    { id: "btn", component: "push-button", label: "Roll" },
    { id: "bz", component: "buzzer-active", label: "Beeper" },
  ],
  connections: [
    { from: "disp.VCC", to: "board.5V", color: "red" },
    { from: "disp.GND", to: "board.GND", color: "black" },
    { from: "disp.CLK", to: "board.D3", color: "yellow" },
    { from: "disp.DIO", to: "board.D4", color: "green" },
    { from: "board.D2", to: "btn.1", color: "blue", note: { en: "internal pull-up, no resistor needed", ru: "внутренняя подтяжка, резистор не нужен", kk: "ішкі тарту, резистор қажет емес" } },
    { from: "btn.2", to: "board.GND2", color: "black" },
    { from: "board.D8", to: "bz.+", color: "orange", note: { en: "longer leg / + mark", ru: "длинная ножка / метка +", kk: "ұзын аяқ / + белгісі" } },
    { from: "bz.-", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Install the TM1637 library", ru: "Установите библиотеку TM1637", kk: "TM1637 кітапханасын орнатыңыз" },
      body: {
        en: "In the Arduino IDE open Library Manager, search for \"TM1637\" and install the one by Avishay Orpaz. It provides TM1637Display.h with showNumberDec(), setSegments() and encodeDigit(), which the sketch uses.",
        ru: "В Arduino IDE откройте менеджер библиотек, найдите «TM1637» и установите библиотеку от Avishay Orpaz. Она даёт TM1637Display.h с функциями showNumberDec(), setSegments() и encodeDigit(), которые использует скетч.",
        kk: "Arduino IDE-де кітапханалар менеджерін ашып, «TM1637» деп іздеп, Avishay Orpaz жасаған кітапхананы орнатыңыз. Ол скетч қолданатын showNumberDec(), setSegments() және encodeDigit() функциялары бар TM1637Display.h файлын береді.",
      },
      expect: { en: "#include <TM1637Display.h> compiles without errors.", ru: "#include <TM1637Display.h> компилируется без ошибок.", kk: "#include <TM1637Display.h> қатесіз компиляцияланады." },
      mistake: { en: "Other TM1637 libraries use different function names; the sketch will not compile with them.", ru: "У других библиотек TM1637 другие имена функций, и скетч с ними не соберётся.", kk: "Басқа TM1637 кітапханаларында функция атаулары басқа, скетч олармен компиляцияланбайды." },
    },
    {
      title: { en: "Connect the display", ru: "Подключите дисплей", kk: "Дисплейді қосыңыз" },
      body: {
        en: "Use female-male jumpers from the display header: VCC → 5V, GND → GND, CLK → D3, DIO → D4. The TM1637 talks its own two-wire protocol, so any two digital pins work; just keep them matched to CLK_PIN and DIO_PIN in the sketch.",
        ru: "Возьмите провода мама-папа от разъёма дисплея: VCC → 5V, GND → GND, CLK → D3, DIO → D4. TM1637 работает по собственному двухпроводному протоколу, поэтому подойдут любые два цифровых пина; главное, чтобы они совпадали с CLK_PIN и DIO_PIN в скетче.",
        kk: "Дисплей разъёмынан аналық-аталық сымдарды тартыңыз: VCC → 5V, GND → GND, CLK → D3, DIO → D4. TM1637 өзінің екі сымды хаттамасымен жұмыс істейді, сондықтан кез келген екі цифрлық пин жарайды; тек олар скетчтегі CLK_PIN мен DIO_PIN-ге сәйкес болсын.",
      },
      expect: { en: "After upload the display shows \"----\".", ru: "После загрузки на дисплее «----».", kk: "Жүктегеннен кейін дисплейде «----» көрінеді." },
      mistake: { en: "Swapping CLK and DIO leaves the display blank, without any damage.", ru: "Если перепутать CLK и DIO, дисплей просто останется пустым, без повреждений.", kk: "CLK мен DIO-ны ауыстырып алсаңыз, дисплей ешбір зақымсыз жай ғана бос қалады." },
    },
    {
      title: { en: "Add the roll button and the beeper", ru: "Добавьте кнопку броска и пищалку", kk: "Лақтыру батырмасы мен зуммерді қосыңыз" },
      body: {
        en: "Put the button across the centre gap: one leg to D2, the diagonally opposite leg to GND. Plug the active buzzer in with its + leg (longer, marked on the top) to D8 and the − leg to GND. An active buzzer has its own oscillator: HIGH on D8 makes it beep, a very short HIGH makes a click.",
        ru: "Поставьте кнопку поперёк центральной канавки: одну ножку к D2, ножку по диагонали к GND. Активную пищалку вставьте ножкой + (длиннее, отмечена сверху) к D8, ножкой − к GND. У активной пищалки свой генератор: HIGH на D8 заставляет её пищать, очень короткий HIGH даёт щелчок.",
        kk: "Батырманы ортаңғы ойыққа көлденең қойыңыз: бір аяғын D2-ге, диагональ бойынша қарсы аяғын GND-ге. Белсенді зуммердің + аяғын (ұзынырақ, үстінде белгісі бар) D8-ге, − аяғын GND-ге қосыңыз. Белсенді зуммердің өз генераторы бар: D8-дегі HIGH оны шиқылдатады, өте қысқа HIGH шықыл береді.",
      },
      expect: { en: "Holding D8 HIGH gives a steady beep.", ru: "Если держать D8 в HIGH, слышен ровный писк.", kk: "D8-ді HIGH күйде ұстағанда тұрақты шиқыл естіледі." },
      mistake: { en: "Reversed buzzer leads: it stays silent.", ru: "Перепутали выводы пищалки: она молчит.", kk: "Зуммердің шықпалары ауысқан: ол үнсіз." },
    },
    {
      title: { en: "Roll the dice", ru: "Бросьте кубик", kk: "Сүйекті лақтырыңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. Press the button: the right-hand digit flickers through random faces with a click on each change, each pause a little longer than the last, then lands on the result with a long beep. random(1, 7) returns 1 to 6 with equal chances, and the generator is seeded from micros() at your first press, so the sequence differs every time you power up.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Нажмите кнопку: правый разряд мелькает случайными гранями со щелчком на каждой смене, каждая пауза чуть длиннее предыдущей, затем результат фиксируется длинным сигналом. random(1, 7) выдаёт от 1 до 6 с равными шансами, а генератор засевается из micros() в момент первого нажатия, поэтому после каждого включения последовательность новая.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Батырманы басыңыз: оң жақтағы разряд әр ауысқан сайын шықылдап, кездейсоқ қырларды көрсетеді, әр үзіліс алдыңғысынан сәл ұзағырақ, содан кейін нәтиже ұзақ дыбыспен бекітіледі. random(1, 7) 1-ден 6-ға дейін тең мүмкіндікпен береді, ал генератор алғашқы басқан сәттегі micros() мәнімен себіледі, сондықтан әр қосқан сайын реттілік жаңа болады.",
      },
      expect: { en: "About 2 seconds of tumbling, then a steady number and \"Roll 1: 4\" in the Serial Monitor.", ru: "Около 2 секунд перебора, затем стоящее число и «Roll 1: 4» в Serial Monitor.", kk: "Шамамен 2 секунд ауыстыру, содан кейін тұрақты сан және Serial Monitor-да «Roll 1: 4»." },
      mistake: { en: "Seeding from an unconnected analog pin is a common habit, but it gives poor randomness; a press time in microseconds is much better.", ru: "Засев с неподключённого аналогового пина популярен, но даёт слабую случайность; время нажатия в микросекундах гораздо лучше.", kk: "Қосылмаған аналогтық пиннен себу кең тараған әдет, бірақ кездейсоқтығы әлсіз; басу уақыты микросекундпен әлдеқайда жақсы." },
    },
  ],
  code: [{
    filename: "digital_dice.ino",
    language: "cpp",
    libraries: ["TM1637"],
    source: `// Digital dice: press the button to roll, the TM1637 shows 1..6.
#include <TM1637Display.h>

const int CLK_PIN = 3;
const int DIO_PIN = 4;
const int BUTTON_PIN = 2;
const int BUZZER_PIN = 8;

TM1637Display display(CLK_PIN, DIO_PIN);
unsigned long rolls = 0;
bool seeded = false;

void beep(int ms) {
  digitalWrite(BUZZER_PIN, HIGH);
  delay(ms);
  digitalWrite(BUZZER_PIN, LOW);
}

void showFace(int face) {
  uint8_t segs[4] = {0, 0, 0, display.encodeDigit(face)};   // number in the right-hand digit
  display.setSegments(segs);
}

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN, INPUT_PULLUP);   // pressed = LOW
  pinMode(BUZZER_PIN, OUTPUT);
  display.setBrightness(5);            // 0..7
  uint8_t dashes[4] = {SEG_G, SEG_G, SEG_G, SEG_G};
  display.setSegments(dashes);
  Serial.println("Press the button to roll");
}

void loop() {
  if (digitalRead(BUTTON_PIN) != LOW) return;

  if (!seeded) { randomSeed(micros()); seeded = true; }
  int face = 1;
  for (int i = 0; i < 14; i++) {       // tumble, slowing down like a real die
    face = random(1, 7);
    showFace(face);
    beep(4);
    delay(20 + i * i * 2);
  }
  beep(150);
  rolls++;
  Serial.print("Roll ");
  Serial.print(rolls);
  Serial.print(": ");
  Serial.println(face);

  while (digitalRead(BUTTON_PIN) == LOW) {}   // one roll per press
  delay(50);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The display stays completely dark", ru: "Дисплей полностью тёмный", kk: "Дисплей толығымен қараңғы" },
      cause: { en: "CLK and DIO are swapped, or VCC/GND are not connected.", ru: "Перепутаны CLK и DIO, или не подключены VCC/GND.", kk: "CLK пен DIO ауысқан немесе VCC/GND қосылмаған." },
      fix: { en: "Check VCC → 5V and GND → GND first, then make sure CLK is on D3 and DIO on D4.", ru: "Сначала проверьте VCC → 5V и GND → GND, затем убедитесь, что CLK на D3, а DIO на D4.", kk: "Алдымен VCC → 5V және GND → GND тексеріңіз, содан кейін CLK D3-те, ал DIO D4-те екеніне көз жеткізіңіз." },
    },
    {
      symptom: { en: "One press rolls several times", ru: "Одно нажатие даёт несколько бросков", kk: "Бір басу бірнеше рет лақтырады" },
      cause: { en: "The button bounces on release and the next loop sees a new press.", ru: "Кнопка дребезжит при отпускании, и следующий цикл видит новое нажатие.", kk: "Батырма жіберген кезде дірілдейді де, келесі цикл оны жаңа басу деп қабылдайды." },
      fix: { en: "Increase the delay(50) after the release loop to 100 ms.", ru: "Увеличьте delay(50) после цикла ожидания отпускания до 100 мс.", kk: "Жіберуді күту циклынан кейінгі delay(50) мәнін 100 мс-қа дейін арттырыңыз." },
    },
    {
      symptom: { en: "The buzzer whines continuously", ru: "Пищалка пищит непрерывно", kk: "Зуммер үздіксіз шиқылдайды" },
      cause: { en: "Its + leg is on 5V instead of D8, or the sketch is not uploaded yet.", ru: "Ножка + подключена к 5V вместо D8, или скетч ещё не загружен.", kk: "+ аяғы D8-дің орнына 5V-ке қосылған немесе скетч әлі жүктелмеген." },
      fix: { en: "Move the + lead to D8; pinMode(BUZZER_PIN, OUTPUT) starts it LOW.", ru: "Перенесите вывод + на D8; pinMode(BUZZER_PIN, OUTPUT) включает его в LOW.", kk: "+ шықпасын D8-ге ауыстырыңыз; pinMode(BUZZER_PIN, OUTPUT) оны LOW күйінде бастайды." },
    },
  ],
  safety: [],
  simulation: {
    baud: 9600,
    lines: ["Press the button to roll", "Roll 1: 4", "Roll 2: 1", "Roll 3: 6", "Roll 4: 3", "Roll 5: 3", "Roll 6: 5"],
    leds: [],
  },
} satisfies GuideContent;
