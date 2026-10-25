import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "simon-says-memory-game",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "games",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 11,
  xpReward: 220,
  title: {
    en: "Simon Says Memory Game",
    ru: "Игра на память «Саймон говорит»",
    kk: "«Саймон айтады» есте сақтау ойыны",
  },
  summary: {
    en: "The classic memory game: four coloured LEDs and tones play a growing sequence, you repeat it on four buttons, and one wrong press ends the run.",
    ru: "Классическая игра на память: четыре цветных светодиода с тонами играют растущую последовательность, вы повторяете её на четырёх кнопках, а одна ошибка заканчивает игру.",
    kk: "Классикалық есте сақтау ойыны: төрт түсті жарық диоды дыбыстарымен ұзарып бара жатқан реттілікті ойнайды, сіз оны төрт батырмада қайталайсыз, ал бір қате басу ойынды аяқтайды.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Game logic", ru: "Логика игры", kk: "Ойын логикасы" } },
    { component: "led", qty: 4, spec: { en: "5 mm: green, red, yellow, blue", ru: "5 мм: зелёный, красный, жёлтый, синий", kk: "5 мм: жасыл, қызыл, сары, көк" }, role: { en: "The four colour pads", ru: "Четыре цветных поля", kk: "Төрт түсті алаң" } },
    { component: "resistor", qty: 4, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиодов", kk: "Жарық диодтарының тогын шектеу" } },
    { component: "push-button", qty: 4, spec: { en: "12×12 mm tactile, coloured caps if you can", ru: "тактовые 12×12 мм, лучше с цветными колпачками", kk: "12×12 мм тактілі, мүмкін болса түсті қақпақтарымен" }, role: { en: "Player input", ru: "Ввод игрока", kk: "Ойыншы енгізуі" } },
    { component: "buzzer-passive", qty: 1, spec: { en: "passive, 2-pin", ru: "пассивная, 2 вывода", kk: "пассивті, 2 шықпалы" }, role: { en: "One tone per colour", ru: "Свой тон для каждого цвета", kk: "Әр түске өз дыбысы" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 20, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "r_grn", component: "resistor", label: "220 Ω" },
    { id: "r_red", component: "resistor", label: "220 Ω" },
    { id: "r_yel", component: "resistor", label: "220 Ω" },
    { id: "r_blu", component: "resistor", label: "220 Ω" },
    { id: "led_grn", component: "led", label: "Green" },
    { id: "led_red", component: "led", label: "Red" },
    { id: "led_yel", component: "led", label: "Yellow" },
    { id: "led_blu", component: "led", label: "Blue" },
    { id: "btn_grn", component: "push-button", label: "Green btn" },
    { id: "btn_red", component: "push-button", label: "Red btn" },
    { id: "btn_yel", component: "push-button", label: "Yellow btn" },
    { id: "btn_blu", component: "push-button", label: "Blue btn" },
    { id: "bz", component: "buzzer-passive", label: "Buzzer" },
  ],
  connections: [
    { from: "board.D8", to: "r_grn.A", color: "green" },
    { from: "r_grn.B", to: "led_grn.A", color: "green", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led_grn.K", to: "board.GND", color: "black" },
    { from: "board.D9", to: "r_red.A", color: "red" },
    { from: "r_red.B", to: "led_red.A", color: "red" },
    { from: "led_red.K", to: "board.GND", color: "black" },
    { from: "board.D10", to: "r_yel.A", color: "yellow" },
    { from: "r_yel.B", to: "led_yel.A", color: "yellow" },
    { from: "led_yel.K", to: "board.GND", color: "black" },
    { from: "board.D11", to: "r_blu.A", color: "blue" },
    { from: "r_blu.B", to: "led_blu.A", color: "blue" },
    { from: "led_blu.K", to: "board.GND", color: "black" },
    { from: "board.D2", to: "btn_grn.1", color: "green", note: { en: "internal pull-ups on all four buttons", ru: "внутренние подтяжки на всех четырёх кнопках", kk: "төрт батырманың бәрінде ішкі тарту" } },
    { from: "btn_grn.2", to: "board.GND2", color: "black" },
    { from: "board.D3", to: "btn_red.1", color: "red" },
    { from: "btn_red.2", to: "board.GND2", color: "black" },
    { from: "board.D4", to: "btn_yel.1", color: "yellow" },
    { from: "btn_yel.2", to: "board.GND2", color: "black" },
    { from: "board.D5", to: "btn_blu.1", color: "blue" },
    { from: "btn_blu.2", to: "board.GND2", color: "black" },
    { from: "board.D6", to: "bz.+", color: "orange", note: { en: "tone() output", ru: "выход tone()", kk: "tone() шығысы" } },
    { from: "bz.-", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Plan the layout", ru: "Спланируйте раскладку", kk: "Орналасуды жоспарлаңыз" },
      body: {
        en: "Each colour is a pair: an LED with a button right next to it, so the player presses the light they just saw. Lay out green, red, yellow and blue left to right on the breadboard, each LED above its button. Use both GND rails: one for the LED cathodes, one for the buttons, and join both rails to the Arduino's GND pins.",
        ru: "Каждый цвет это пара: светодиод и кнопка прямо рядом с ним, чтобы игрок жал на тот огонь, который только что видел. Разложите зелёный, красный, жёлтый и синий слева направо, каждый светодиод над своей кнопкой. Используйте обе шины GND: одну для катодов светодиодов, другую для кнопок, и соедините обе с пинами GND Arduino.",
        kk: "Әр түс бір жұп: жарық диоды және оның дәл жанындағы батырма, сонда ойыншы жаңа ғана көрген отты басады. Жасыл, қызыл, сары және көкті макет тақтасында солдан оңға қарай орналастырыңыз, әр жарық диоды өз батырмасының үстінде. Екі GND шинасын да пайдаланыңыз: біреуі жарық диодтарының катодтарына, екіншісі батырмаларға, және екі шинаны да Arduino-ның GND пиндеріне қосыңыз.",
      },
      expect: { en: "Four LED + button columns, two GND rails both tied to the Arduino.", ru: "Четыре столбика «светодиод + кнопка», две шины GND, обе на Arduino.", kk: "Төрт «жарық диоды + батырма» бағаны, екі GND шинасы да Arduino-ға қосылған." },
      mistake: { en: "The two halves of a long breadboard's GND rail are sometimes split in the middle; bridge them with a short wire.", ru: "У длинной макетки шина GND иногда разорвана посередине; перемкните половинки коротким проводом.", kk: "Ұзын макет тақтасының GND шинасы кейде ортасынан бөлінген болады; жартыларын қысқа сыммен жалғаңыз." },
    },
    {
      title: { en: "Wire the four LEDs", ru: "Подключите четыре светодиода", kk: "Төрт жарық диодын қосыңыз" },
      body: {
        en: "Each LED gets a 220 Ω resistor to its own pin: green D8, red D9, yellow D10, blue D11. Cathodes go to the LED GND rail. The order matters: index 0 in LED_PINS is green, and the same index is used for its button and its tone.",
        ru: "Каждому светодиоду свой резистор 220 Ом и свой пин: зелёный D8, красный D9, жёлтый D10, синий D11. Катоды на шину GND светодиодов. Порядок важен: индекс 0 в LED_PINS это зелёный, и тот же индекс используется для его кнопки и тона.",
        kk: "Әр жарық диодына 220 Ом резистор және өз пині: жасыл D8, қызыл D9, сары D10, көк D11. Катодтар жарық диодтарының GND шинасына. Рет маңызды: LED_PINS-тегі 0 индексі жасыл, сол индекс оның батырмасы мен дыбысы үшін де қолданылады.",
      },
      expect: { en: "D8–D11 each drive one coloured LED through 220 Ω.", ru: "D8–D11 каждый управляет одним цветным светодиодом через 220 Ом.", kk: "D8–D11 әрқайсысы 220 Ом арқылы бір түсті жарық диодын басқарады." },
      mistake: { en: "A blue LED (about 3 V) is dimmer than red at the same resistor; that is normal. Use 150 Ω for blue only if it looks too weak.", ru: "Синий светодиод (около 3 В) тусклее красного при том же резисторе, это нормально. Ставьте 150 Ом для синего, только если он совсем слабый.", kk: "Көк жарық диоды (шамамен 3 В) сол резистормен қызылдан күңгірттеу, бұл қалыпты. Тым әлсіз көрінсе ғана көкке 150 Ом қойыңыз." },
    },
    {
      title: { en: "Wire the four buttons", ru: "Подключите четыре кнопки", kk: "Төрт батырманы қосыңыз" },
      body: {
        en: "Put each button across the centre gap under its LED. Wire green to D2, red to D3, yellow to D4 and blue to D5, with the diagonally opposite leg of every button on the button GND rail. The sketch enables INPUT_PULLUP on all four, so no resistors are needed.",
        ru: "Поставьте каждую кнопку поперёк центральной канавки под её светодиодом. Зелёную подключите к D2, красную к D3, жёлтую к D4, синюю к D5, а ножку по диагонали у каждой кнопки на шину GND кнопок. Скетч включает INPUT_PULLUP на всех четырёх, поэтому резисторы не нужны.",
        kk: "Әр батырманы өз жарық диодының астына ортаңғы ойыққа көлденең қойыңыз. Жасылды D2-ге, қызылды D3-ке, сарыны D4-ке, көкті D5-ке қосыңыз, ал әр батырманың диагональ бойынша қарсы аяғын батырмалардың GND шинасына. Скетч төртеуінде де INPUT_PULLUP қосады, сондықтан резистор керек емес.",
      },
      expect: { en: "Pressing a button lights its own LED and plays its tone once the sketch runs.", ru: "Когда скетч запущен, нажатие кнопки зажигает её светодиод и играет её тон.", kk: "Скетч іске қосылғанда батырманы басу өз жарық диодын жағып, өз дыбысын ойнатады." },
      mistake: { en: "Mixing up two button wires makes the game reject correct answers for those colours.", ru: "Если перепутать провода двух кнопок, игра будет отвергать правильные ответы для этих цветов.", kk: "Екі батырманың сымдарын шатастырсаңыз, ойын сол түстер үшін дұрыс жауаптарды қабылдамайды." },
    },
    {
      title: { en: "Add the buzzer", ru: "Добавьте пищалку", kk: "Зуммерді қосыңыз" },
      body: {
        en: "Wire the passive buzzer + to D6 and − to GND. Each colour has its own note, taken from the original Simon: green E5 (659 Hz), red C♯5 (554 Hz), yellow A4 (440 Hz), blue E4 (330 Hz), together an A-major chord, so any sequence sounds musical. A wrong press plays a low 150 Hz buzz.",
        ru: "Подключите + пассивной пищалки к D6, − к GND. У каждого цвета своя нота, как у оригинального Simon: зелёный E5 (659 Гц), красный C♯5 (554 Гц), жёлтый A4 (440 Гц), синий E4 (330 Гц), вместе это ля-мажорный аккорд, поэтому любая последовательность звучит музыкально. Ошибка сопровождается низким гулом 150 Гц.",
        kk: "Пассивті зуммердің + шықпасын D6-ға, − шықпасын GND-ге қосыңыз. Әр түстің түпнұсқа Simon-дағыдай өз нотасы бар: жасыл E5 (659 Гц), қызыл C♯5 (554 Гц), сары A4 (440 Гц), көк E4 (330 Гц), бірге олар ля-мажор аккордын құрайды, сондықтан кез келген реттілік әуенді естіледі. Қате басу төмен 150 Гц гуілмен белгіленеді.",
      },
      expect: { en: "Four clearly different notes.", ru: "Четыре чётко различимые ноты.", kk: "Анық ажыратылатын төрт нота." },
      mistake: { en: "An active buzzer plays the same pitch for every colour, which makes the game much harder.", ru: "Активная пищалка играет один тон для всех цветов, и игра становится намного сложнее.", kk: "Белсенді зуммер барлық түске бір дыбысты ойнатады, бұл ойынды әлдеқайда қиындатады." },
    },
    {
      title: { en: "Play and tune the difficulty", ru: "Играйте и настройте сложность", kk: "Ойнап, қиындықты баптаңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. Press any button to start; the first press also seeds the random generator. Every round adds one colour and plays the whole sequence, a little faster each time (from 480 ms per flash down to 150 ms). Repeat it on the buttons; you have 3 seconds per press. Survive 32 rounds and you win. To make it harder, lower the 500 in onMs; to make it easier, raise the 150.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Нажмите любую кнопку для старта; первое нажатие заодно засевает генератор случайных чисел. Каждый раунд добавляет один цвет и проигрывает всю последовательность, каждый раз чуть быстрее (от 480 мс на вспышку до 150 мс). Повторите её кнопками; на каждое нажатие 3 секунды. Продержитесь 32 раунда, и вы победили. Чтобы стало сложнее, уменьшите 500 в onMs; чтобы проще, увеличьте 150.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Бастау үшін кез келген батырманы басыңыз; алғашқы басу кездейсоқ сандар генераторын да себеді. Әр раунд бір түс қосып, бүкіл реттілікті әр жолы сәл жылдамырақ ойнатады (бір жарқылға 480 мс-тан 150 мс-қа дейін). Оны батырмалармен қайталаңыз; әр басуға 3 секунд беріледі. 32 раундқа шыдасаңыз, жеңесіз. Қиындату үшін onMs ішіндегі 500-ді азайтыңыз, жеңілдету үшін 150-ді арттырыңыз.",
      },
      expect: { en: "\"Level 1\", \"Level 2\"… then \"Wrong! Score: N\" and \"Press any button to play again\".", ru: "«Level 1», «Level 2»… затем «Wrong! Score: N» и «Press any button to play again».", kk: "«Level 1», «Level 2»… содан кейін «Wrong! Score: N» және «Press any button to play again»." },
      mistake: { en: "Pressing during playback does nothing: the sketch only listens after the sequence has finished.", ru: "Нажатия во время показа ни на что не влияют: скетч слушает кнопки только после окончания последовательности.", kk: "Көрсету кезіндегі басулар ештеңеге әсер етпейді: скетч батырмаларды тек реттілік аяқталғаннан кейін тыңдайды." },
    },
  ],
  code: [{
    filename: "simon_says.ino",
    language: "cpp",
    libraries: [],
    source: `// Simon Says: repeat the growing colour sequence on the buttons.
// Index 0..3 = green, red, yellow, blue (same index for LED, button and tone).
const int LED_PINS[] = {8, 9, 10, 11};
const int BUTTON_PINS[] = {2, 3, 4, 5};
const int BUZZER_PIN = 6;
const int TONES[] = {659, 554, 440, 330};   // E5, C#5, A4, E4
const int MAX_ROUNDS = 32;

int sequence[MAX_ROUNDS];
int level = 0;                              // current sequence length
int best = 0;

void lightOn(int i)  { digitalWrite(LED_PINS[i], HIGH); tone(BUZZER_PIN, TONES[i]); }
void lightOff(int i) { digitalWrite(LED_PINS[i], LOW);  noTone(BUZZER_PIN); }

void allLeds(int state) {
  for (int i = 0; i < 4; i++) digitalWrite(LED_PINS[i], state);
}

// Waits for one press (with release). Returns 0..3, or -1 after 3 s without a press.
int readButton() {
  unsigned long start = millis();
  while (millis() - start < 3000) {
    for (int i = 0; i < 4; i++) {
      if (digitalRead(BUTTON_PINS[i]) == LOW) {
        lightOn(i);
        delay(20);                                       // debounce the press
        while (digitalRead(BUTTON_PINS[i]) == LOW) {}
        lightOff(i);
        delay(20);                                       // debounce the release
        return i;
      }
    }
  }
  return -1;
}

void waitForStart() {
  Serial.println("Press any button to play");
  while (readButton() < 0) {}
  delay(500);
}

void gameOver() {
  int score = level - 1;
  Serial.print("Wrong! Score: ");
  Serial.println(score);
  if (score > best) {
    best = score;
    Serial.println("New best!");
  }
  for (int k = 0; k < 3; k++) {
    allLeds(HIGH);
    tone(BUZZER_PIN, 150);
    delay(250);
    allLeds(LOW);
    noTone(BUZZER_PIN);
    delay(150);
  }
  level = 0;
  Serial.println("Press any button to play again");
  while (readButton() < 0) {}
  delay(500);
}

void victory() {
  Serial.println("You win! 32 rounds");
  for (int k = 0; k < 3; k++) {
    for (int i = 0; i < 4; i++) { lightOn(i); delay(90); lightOff(i); }
  }
  best = MAX_ROUNDS;
  level = 0;
  waitForStart();
}

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 4; i++) {
    pinMode(LED_PINS[i], OUTPUT);
    pinMode(BUTTON_PINS[i], INPUT_PULLUP);              // pressed = LOW
  }
  waitForStart();
  randomSeed(micros());                                 // the player's timing is the seed
}

void loop() {
  sequence[level] = random(4);
  level++;
  Serial.print("Level ");
  Serial.println(level);

  int onMs = max(150, 500 - level * 20);                // speeds up every round
  for (int i = 0; i < level; i++) {
    lightOn(sequence[i]);
    delay(onMs);
    lightOff(sequence[i]);
    delay(onMs / 2);
  }

  for (int i = 0; i < level; i++) {
    if (readButton() != sequence[i]) {                  // wrong colour or timeout
      gameOver();
      return;
    }
  }

  if (level == MAX_ROUNDS) {
    victory();
    return;
  }
  delay(700);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The correct colour is always counted as wrong", ru: "Правильный цвет всегда засчитывается как ошибка", kk: "Дұрыс түс әрқашан қате деп есептеледі" },
      cause: { en: "That button is wired to another colour's pin, so its index does not match its LED.", ru: "Эта кнопка подключена к пину другого цвета, и её индекс не совпадает со светодиодом.", kk: "Бұл батырма басқа түстің пиніне қосылған, сондықтан оның индексі жарық диодына сәйкес келмейді." },
      fix: { en: "Press each button: the LED that lights must be the one above it. Swap the wires on D2–D5 until they match.", ru: "Нажимайте каждую кнопку: загораться должен светодиод над ней. Меняйте провода на D2–D5, пока всё не совпадёт.", kk: "Әр батырманы басыңыз: оның үстіндегі жарық диоды жануы керек. Сәйкес келгенше D2–D5 сымдарын ауыстырыңыз." },
    },
    {
      symptom: { en: "The game ends right after the first sequence", ru: "Игра заканчивается сразу после первой последовательности", kk: "Ойын алғашқы реттіліктен кейін бірден аяқталады" },
      cause: { en: "A button is permanently pressed: its two wires are on legs that are always connected.", ru: "Одна кнопка постоянно нажата: её провода на всегда соединённых ножках.", kk: "Бір батырма үнемі басулы: оның сымдары әрқашан жалғанған аяқтарда." },
      fix: { en: "Put each button's two wires on diagonally opposite legs.", ru: "Подключайте два провода каждой кнопки к ножкам по диагонали.", kk: "Әр батырманың екі сымын диагональ бойынша қарсы аяқтарға қосыңыз." },
    },
    {
      symptom: { en: "Tones sound but one LED stays dark", ru: "Тоны звучат, но один светодиод не горит", kk: "Дыбыстар шығады, бірақ бір жарық диоды жанбайды" },
      cause: { en: "That LED is reversed or its resistor is in the wrong breadboard row.", ru: "Этот светодиод перевёрнут, или его резистор не в том ряду макетки.", kk: "Бұл жарық диоды кері қойылған немесе оның резисторы макет тақтасының басқа қатарында." },
      fix: { en: "Turn the LED so the long leg meets the resistor and check its cathode reaches the GND rail.", ru: "Разверните светодиод длинной ножкой к резистору и проверьте, что катод доходит до шины GND.", kk: "Жарық диодын ұзын аяғын резисторға қаратып бұрыңыз және катодының GND шинасына жеткенін тексеріңіз." },
    },
    {
      symptom: { en: "The same sequence comes up every game", ru: "Каждую игру выпадает одна и та же последовательность", kk: "Әр ойында бірдей реттілік шығады" },
      cause: { en: "randomSeed() ran before any human input, or was removed.", ru: "randomSeed() вызывается до какого-либо действия игрока или удалён.", kk: "randomSeed() ойыншының ешбір әрекетінен бұрын шақырылған немесе өшірілген." },
      fix: { en: "Keep randomSeed(micros()) right after waitForStart() in setup().", ru: "Оставьте randomSeed(micros()) сразу после waitForStart() в setup().", kk: "setup() ішінде randomSeed(micros()) жолын waitForStart()-тан кейін бірден қалдырыңыз." },
    },
  ],
  safety: [
    { en: "Never connect an LED to a pin without its resistor.", ru: "Никогда не подключайте светодиод к пину без резистора.", kk: "Жарық диодын ешқашан резисторсыз пинге қоспаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["Press any button to play", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7", "Wrong! Score: 6", "New best!", "Press any button to play again", "Level 1"],
    leds: [{ label: "Green", color: "#43A047" }, { label: "Red", color: "#E53935" }, { label: "Yellow", color: "#FDD835" }, { label: "Blue", color: "#1E88E5" }],
  },
} satisfies GuideContent;
