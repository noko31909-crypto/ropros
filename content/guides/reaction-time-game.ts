import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "reaction-time-game",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "games",
  robotics: false,
  difficulty: "beginner",
  hours: 1,
  costUsd: 8,
  xpReward: 120,
  title: {
    en: "Reaction Time Game",
    ru: "Игра на скорость реакции",
    kk: "Реакция жылдамдығы ойыны",
  },
  summary: {
    en: "Wait for the light, then hit the button: the Arduino measures your reaction in milliseconds, catches false starts and remembers your best score.",
    ru: "Дождитесь вспышки и жмите кнопку: Arduino измеряет реакцию в миллисекундах, ловит фальстарты и запоминает лучший результат.",
    kk: "Жарықты күтіп, батырманы басыңыз: Arduino реакцияңызды миллисекундпен өлшейді, ерте бастауды ұстайды және ең жақсы нәтижені есте сақтайды.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller and stopwatch", ru: "Контроллер и секундомер", kk: "Контроллер және секундомер" } },
    { component: "led", qty: 1, spec: { en: "5 mm, any bright colour", ru: "5 мм, любой яркий цвет", kk: "5 мм, кез келген ашық түс" }, role: { en: "Go signal", ru: "Сигнал старта", kk: "Бастау белгісі" } },
    { component: "resistor", qty: 1, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиода", kk: "Жарық диодының тогын шектеу" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile (a 12 mm one is nicer to slap)", ru: "тактовая 6×6 мм (по кнопке 12 мм бить удобнее)", kk: "6×6 мм тактілі (12 мм батырманы басу ыңғайлырақ)" }, role: { en: "Reaction button", ru: "Кнопка реакции", kk: "Реакция батырмасы" } },
    { component: "buzzer-passive", qty: 1, spec: { en: "passive, 2-pin (no built-in oscillator)", ru: "пассивная, 2 вывода (без встроенного генератора)", kk: "пассивті, 2 шықпалы (ішкі генераторы жоқ)" }, role: { en: "Start beep and score sounds", ru: "Сигнал старта и звуки результата", kk: "Бастау дыбысы және нәтиже дыбыстары" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "r_led", component: "resistor", label: "220 Ω" },
    { id: "led", component: "led", label: "GO" },
    { id: "btn", component: "push-button", label: "Hit" },
    { id: "bz", component: "buzzer-passive", label: "Buzzer" },
  ],
  connections: [
    { from: "board.D9", to: "r_led.A", color: "green" },
    { from: "r_led.B", to: "led.A", color: "green", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led.K", to: "board.GND", color: "black" },
    { from: "board.D2", to: "btn.1", color: "blue", note: { en: "internal pull-up, no resistor needed", ru: "внутренняя подтяжка, резистор не нужен", kk: "ішкі тарту, резистор қажет емес" } },
    { from: "btn.2", to: "board.GND2", color: "black" },
    { from: "board.D5", to: "bz.+", color: "orange", note: { en: "tone() output", ru: "выход tone()", kk: "tone() шығысы" } },
    { from: "bz.-", to: "board.GND", color: "black" },
  ],
  steps: [
    {
      title: { en: "Wire the GO light", ru: "Подключите лампочку старта", kk: "Бастау шамын қосыңыз" },
      body: {
        en: "Put the LED in the breadboard and connect its long leg (anode) through a 220 Ω resistor to D9. Connect the short leg (cathode) to the GND rail and the rail to the Arduino GND pin.",
        ru: "Вставьте светодиод в макетку, длинную ножку (анод) через резистор 220 Ом подключите к D9. Короткую ножку (катод) подключите к шине GND, а шину к пину GND Arduino.",
        kk: "Жарық диодын макет тақтасына орнатып, ұзын аяғын (анод) 220 Ом резистор арқылы D9-ға қосыңыз. Қысқа аяғын (катод) GND шинасына, ал шинаны Arduino GND пиніне қосыңыз.",
      },
      expect: { en: "D9 → 220 Ω → LED → GND.", ru: "D9 → 220 Ом → светодиод → GND.", kk: "D9 → 220 Ом → жарық диоды → GND." },
      mistake: { en: "Without the resistor the LED is overdriven and the D9 pin is stressed.", ru: "Без резистора светодиод перегружается, а пин D9 работает на пределе.", kk: "Резисторсыз жарық диоды шамадан тыс жүктеледі, ал D9 пині шегінде жұмыс істейді." },
    },
    {
      title: { en: "Add the reaction button", ru: "Добавьте кнопку реакции", kk: "Реакция батырмасын қосыңыз" },
      body: {
        en: "Place the button across the centre gap. Wire one leg to D2 and the diagonally opposite leg to GND. INPUT_PULLUP in the sketch keeps D2 HIGH until you press, so no extra resistor is needed. Put the button where you can hit it without looking.",
        ru: "Поставьте кнопку поперёк центральной канавки. Одну ножку подключите к D2, ножку по диагонали к GND. INPUT_PULLUP в скетче держит D2 в HIGH, пока вы не нажмёте, поэтому лишний резистор не нужен. Расположите кнопку так, чтобы попадать по ней не глядя.",
        kk: "Батырманы ортаңғы ойыққа көлденең қойыңыз. Бір аяғын D2-ге, диагональ бойынша қарсы аяғын GND-ге қосыңыз. Скетчтегі INPUT_PULLUP сіз баспайынша D2-ні HIGH күйде ұстайды, сондықтан қосымша резистор керек емес. Батырманы қарамай-ақ баса алатын жерге орналастырыңыз.",
      },
      expect: { en: "D2 reads LOW only while the button is held.", ru: "D2 читает LOW, только пока кнопка зажата.", kk: "D2 тек батырма басулы тұрғанда LOW оқиды." },
      mistake: { en: "Both wires on the same side of the button = it is always \"pressed\" and every round is a false start.", ru: "Оба провода с одной стороны кнопки = она всегда «нажата», и каждый раунд выходит фальстартом.", kk: "Екі сым батырманың бір жағында = ол әрқашан «басулы», әр раунд ерте бастау болып шығады." },
    },
    {
      title: { en: "Connect the passive buzzer", ru: "Подключите пассивную пищалку", kk: "Пассивті зуммерді қосыңыз" },
      body: {
        en: "Wire the buzzer + to D5 and − to GND. A passive buzzer has no oscillator inside, so tone() on D5 decides the pitch: a short 2 kHz chirp means GO, a low 200 Hz buzz means false start, and a rising two-note jingle celebrates a new best.",
        ru: "Подключите + пищалки к D5, − к GND. Внутри пассивной пищалки нет генератора, поэтому высоту звука задаёт tone() на D5: короткий писк 2 кГц означает старт, низкий гул 200 Гц фальстарт, а восходящие две ноты празднуют новый рекорд.",
        kk: "Зуммердің + шықпасын D5-ке, − шықпасын GND-ге қосыңыз. Пассивті зуммердің ішінде генератор жоқ, сондықтан дыбыс биіктігін D5-тегі tone() анықтайды: қысқа 2 кГц шиқыл бастау дегенді, төмен 200 Гц гуіл ерте бастауды білдіреді, ал көтерілетін екі нота жаңа рекордты тойлайды.",
      },
      expect: { en: "The buzzer has two wires: D5 and GND.", ru: "У пищалки два провода: D5 и GND.", kk: "Зуммерде екі сым: D5 және GND." },
      mistake: { en: "An active buzzer only beeps at its own fixed pitch; check that yours is the passive kind (no sticker, open bottom).", ru: "Активная пищалка пищит только своим тоном; проверьте, что у вас пассивная (без наклейки, с открытым низом).", kk: "Белсенді зуммер тек өз тонымен шиқылдайды; сіздікі пассивті екенін тексеріңіз (жапсырмасыз, асты ашық)." },
    },
    {
      title: { en: "Play a round", ru: "Сыграйте раунд", kk: "Бір раунд ойнаңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. Press the button to start. After a random 2–5 second pause the LED lights with a chirp: hit the button as fast as you can. The time from light to press is printed in milliseconds, along with your best. Press too early and you get a buzz and a retry; wait more than 3 seconds and the round times out.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Нажмите кнопку для старта. Через случайную паузу 2–5 секунд светодиод загорится с писком: жмите кнопку как можно быстрее. Время от вспышки до нажатия печатается в миллисекундах вместе с лучшим результатом. Нажали раньше времени, получите гул и повтор; не успели за 3 секунды, раунд сгорает.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Бастау үшін батырманы басыңыз. Кездейсоқ 2–5 секундтық үзілістен кейін жарық диоды шиқылмен жанады: батырманы барынша жылдам басыңыз. Жарықтан басуға дейінгі уақыт ең жақсы нәтижеңізбен бірге миллисекундпен шығарылады. Ерте бассаңыз, гуіл естіп, қайта ойнайсыз; 3 секундтан асып кетсеңіз, раунд күйеді.",
      },
      expect: { en: "Typical results are 180–300 ms; the random delay stops you from guessing the moment.", ru: "Обычные результаты 180–300 мс; случайная пауза не даёт угадать момент.", kk: "Әдеттегі нәтижелер 180–300 мс; кездейсоқ үзіліс сәтті болжауға мүмкіндік бермейді." },
      mistake: { en: "If every round shows the same delay, randomSeed() is missing; the sketch seeds it from micros() at your first press.", ru: "Если пауза каждый раз одинаковая, не вызван randomSeed(); скетч берёт его из micros() в момент первого нажатия.", kk: "Үзіліс әр жолы бірдей болса, randomSeed() шақырылмаған; скетч оны алғашқы басқан сәттегі micros() мәнінен алады." },
    },
  ],
  code: [{
    filename: "reaction_time.ino",
    language: "cpp",
    libraries: [],
    source: `// Reaction time game: wait for the light, then press as fast as you can.
const int LED_PIN = 9;
const int BUTTON_PIN = 2;
const int BUZZER_PIN = 5;

unsigned long best = 0;
bool seeded = false;

bool pressed() { return digitalRead(BUTTON_PIN) == LOW; }

void waitRelease() {
  while (pressed()) {}
  delay(30);                                  // let the contacts settle
}

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);          // pressed = LOW
}

void loop() {
  Serial.println("Press the button to start");
  while (!pressed()) {}
  if (!seeded) { randomSeed(micros()); seeded = true; }   // human timing = good random seed
  waitRelease();

  Serial.println("Get ready...");
  unsigned long waitMs = random(2000, 5001);
  unsigned long start = millis();
  while (millis() - start < waitMs) {
    if (pressed()) {                          // false start
      Serial.println("Too soon! Wait for the light.");
      tone(BUZZER_PIN, 200, 400);
      waitRelease();
      delay(1000);
      return;
    }
  }

  digitalWrite(LED_PIN, HIGH);
  tone(BUZZER_PIN, 2000, 60);
  unsigned long goAt = millis();
  while (!pressed()) {
    if (millis() - goAt > 3000) {
      digitalWrite(LED_PIN, LOW);
      Serial.println("Too slow! Round over.");
      delay(1000);
      return;
    }
  }
  unsigned long reaction = millis() - goAt;
  digitalWrite(LED_PIN, LOW);

  Serial.print("Reaction: ");
  Serial.print(reaction);
  Serial.println(" ms");
  if (best == 0 || reaction < best) {
    best = reaction;
    Serial.println("New best!");
    tone(BUZZER_PIN, 1500, 100);
    delay(130);
    tone(BUZZER_PIN, 2500, 150);
  }
  Serial.print("Best: ");
  Serial.print(best);
  Serial.println(" ms");

  waitRelease();
  delay(1500);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Every round says \"Too soon!\"", ru: "Каждый раунд пишет «Too soon!»", kk: "Әр раунд «Too soon!» деп шығарады" },
      cause: { en: "The button is wired across two legs that are always connected, so D2 is permanently LOW.", ru: "Кнопка подключена через две всегда соединённые ножки, и D2 постоянно в LOW.", kk: "Батырма әрқашан жалғанған екі аяқ арқылы қосылған, сондықтан D2 үнемі LOW." },
      fix: { en: "Move one wire to the diagonally opposite leg of the button.", ru: "Перенесите один провод на ножку кнопки по диагонали.", kk: "Бір сымды батырманың диагональ бойынша қарсы аяғына ауыстырыңыз." },
    },
    {
      symptom: { en: "The buzzer is silent or only clicks", ru: "Пищалка молчит или только щёлкает", kk: "Зуммер үнсіз немесе тек шықылдайды" },
      cause: { en: "Wrong pin, reversed leads on a polarised buzzer, or an active buzzer that ignores tone() frequencies.", ru: "Не тот пин, перепутана полярность, или это активная пищалка, которая игнорирует частоту tone().", kk: "Пин қате, полярлығы ауысқан немесе бұл tone() жиілігін елемейтін белсенді зуммер." },
      fix: { en: "Check + is on D5, swap the two leads, and make sure the part is a passive buzzer.", ru: "Проверьте, что + на D5, поменяйте выводы местами и убедитесь, что пищалка пассивная.", kk: "+ шықпасы D5-те екенін тексеріп, шықпаларды ауыстырып көріңіз және зуммердің пассивті екеніне көз жеткізіңіз." },
    },
    {
      symptom: { en: "Reaction times look impossibly short (under 100 ms)", ru: "Время реакции нереально короткое (меньше 100 мс)", kk: "Реакция уақыты сенгісіз қысқа (100 мс-тан аз)" },
      cause: { en: "You are anticipating the light, or still holding the button from the start press.", ru: "Вы угадываете вспышку заранее или ещё держите кнопку после стартового нажатия.", kk: "Жарықты алдын ала болжап жатырсыз немесе бастау басуынан кейін батырманы әлі ұстап тұрсыз." },
      fix: { en: "Release fully after starting a round; anything under ~120 ms is almost always a lucky guess, not a reflex.", ru: "После старта полностью отпускайте кнопку; всё меньше ~120 мс почти всегда удачная догадка, а не рефлекс.", kk: "Раундты бастағаннан кейін батырманы толық жіберіңіз; ~120 мс-тан аз нәтиже әдетте рефлекс емес, сәтті болжам." },
    },
  ],
  safety: [
    { en: "Never connect an LED to a pin without its resistor.", ru: "Никогда не подключайте светодиод к пину без резистора.", kk: "Жарық диодын ешқашан резисторсыз пинге қоспаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["Press the button to start", "Get ready...", "Reaction: 274 ms", "New best!", "Best: 274 ms", "Press the button to start", "Get ready...", "Too soon! Wait for the light.", "Press the button to start", "Get ready...", "Reaction: 231 ms", "New best!", "Best: 231 ms"],
    leds: [{ label: "GO", color: "#43A047" }],
  },
} satisfies GuideContent;
