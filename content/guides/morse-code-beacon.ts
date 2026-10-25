import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "morse-code-beacon",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "audio",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 8,
  xpReward: 150,
  title: {
    en: "Morse Code Beacon",
    ru: "Маяк азбуки Морзе",
    kk: "Морзе әліпбиі маягы",
  },
  summary: {
    en: "Tap Morse on a button and the Arduino beeps, flashes and decodes your letters; type text in the Serial Monitor and it plays it back as light and sound.",
    ru: "Отстукивайте Морзе кнопкой, и Arduino пищит, мигает и расшифровывает буквы; введите текст в Serial Monitor, и он прозвучит и просветится азбукой Морзе.",
    kk: "Батырмамен Морзе әліпбиін соғыңыз: Arduino шиқылдап, жыпылықтап, әріптеріңізді ашады; Serial Monitor-ға мәтін жазсаңыз, оны жарық пен дыбыс арқылы Морзеге айналдырады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Encoder and decoder", ru: "Кодер и декодер", kk: "Кодтаушы және декодтаушы" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile, or a 12 mm one for comfortable keying", ru: "тактовая 6×6 мм, или 12 мм для удобного ключа", kk: "6×6 мм тактілі немесе ыңғайлы кілт үшін 12 мм" }, role: { en: "Morse key", ru: "Телеграфный ключ", kk: "Морзе кілті" } },
    { component: "buzzer-active", qty: 1, spec: { en: "5 V active buzzer (beeps on DC)", ru: "активная пищалка 5 В (пищит от постоянного тока)", kk: "5 В белсенді зуммер (тұрақты токтан шиқылдайды)" }, role: { en: "Sidetone", ru: "Звук ключа", kk: "Кілт дыбысы" } },
    { component: "led", qty: 1, spec: { en: "5 mm, bright white or yellow", ru: "5 мм, яркий белый или жёлтый", kk: "5 мм, ашық ақ немесе сары" }, role: { en: "Beacon light", ru: "Огонь маяка", kk: "Маяк оты" } },
    { component: "resistor", qty: 1, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиода", kk: "Жарық диодының тогын шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "key", component: "push-button", label: "Key" },
    { id: "bz", component: "buzzer-active", label: "Beeper" },
    { id: "r_led", component: "resistor", label: "220 Ω" },
    { id: "led", component: "led", label: "Beacon" },
  ],
  connections: [
    { from: "board.D2", to: "key.1", color: "blue", note: { en: "internal pull-up, no resistor needed", ru: "внутренняя подтяжка, резистор не нужен", kk: "ішкі тарту, резистор қажет емес" } },
    { from: "key.2", to: "board.GND", color: "black" },
    { from: "board.D8", to: "bz.+", color: "orange", note: { en: "longer leg / + mark", ru: "длинная ножка / метка +", kk: "ұзын аяқ / + белгісі" } },
    { from: "bz.-", to: "board.GND2", color: "black" },
    { from: "board.D9", to: "r_led.A", color: "yellow" },
    { from: "r_led.B", to: "led.A", color: "yellow", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led.K", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Wire the key", ru: "Подключите ключ", kk: "Кілтті қосыңыз" },
      body: {
        en: "Place the button across the centre gap of the breadboard. Wire one leg to D2 and the diagonally opposite leg to GND. The sketch turns on INPUT_PULLUP, so D2 is HIGH at rest and LOW while you hold the key.",
        ru: "Поставьте кнопку поперёк центральной канавки макетки. Одну ножку подключите к D2, ножку по диагонали к GND. Скетч включает INPUT_PULLUP, поэтому в покое на D2 HIGH, а пока вы держите ключ, LOW.",
        kk: "Батырманы макет тақтасының ортаңғы ойығына көлденең қойыңыз. Бір аяғын D2-ге, диагональ бойынша қарсы аяғын GND-ге қосыңыз. Скетч INPUT_PULLUP қосады, сондықтан тыныш күйде D2 HIGH, ал кілтті басып тұрғанда LOW.",
      },
      expect: { en: "Two wires on the button: D2 and GND, on opposite corners.", ru: "У кнопки два провода: D2 и GND, на противоположных углах.", kk: "Батырмада екі сым: D2 және GND, қарама-қарсы бұрыштарда." },
      mistake: { en: "Wires on two legs that are always joined make the key look permanently held.", ru: "Провода на всегда соединённых ножках делают ключ «вечно нажатым».", kk: "Әрқашан жалғанған аяқтардағы сымдар кілтті «үнемі басулы» етеді." },
    },
    {
      title: { en: "Add the beeper and the beacon LED", ru: "Добавьте пищалку и светодиод маяка", kk: "Зуммер мен маяк жарық диодын қосыңыз" },
      body: {
        en: "Plug the active buzzer in with + on D8 and − on GND. Wire D9 through a 220 Ω resistor to the LED's long leg and the short leg to GND. Both outputs always switch together, so every dot and dash is both heard and seen.",
        ru: "Вставьте активную пищалку: + на D8, − на GND. От D9 через резистор 220 Ом проведите к длинной ножке светодиода, короткую ножку на GND. Оба выхода всегда переключаются вместе, поэтому каждую точку и тире и слышно, и видно.",
        kk: "Белсенді зуммерді + шықпасын D8-ге, − шықпасын GND-ге қойып орнатыңыз. D9-дан 220 Ом резистор арқылы жарық диодының ұзын аяғына, ал қысқа аяғын GND-ге қосыңыз. Екі шығыс әрқашан бірге ауысады, сондықтан әр нүкте мен сызықша әрі естіледі, әрі көрінеді.",
      },
      expect: { en: "D8 → buzzer, D9 → 220 Ω → LED, both to GND.", ru: "D8 → пищалка, D9 → 220 Ом → светодиод, оба на GND.", kk: "D8 → зуммер, D9 → 220 Ом → жарық диоды, екеуі де GND-ге." },
      mistake: { en: "A passive buzzer on D8 only clicks: this sketch switches DC, which needs the active kind.", ru: "Пассивная пищалка на D8 будет только щёлкать: скетч подаёт постоянный уровень, а для него нужна активная.", kk: "D8-дегі пассивті зуммер тек шықылдайды: скетч тұрақты деңгей береді, оған белсенді зуммер керек." },
    },
    {
      title: { en: "Key Morse and watch it decode", ru: "Отстукивайте Морзе и смотрите расшифровку", kk: "Морзе соғып, оның ашылуын бақылаңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. The timing unit is 120 ms (about 10 words per minute): a press shorter than 240 ms is a dot, longer is a dash. Pause for 3 units after a letter and it is decoded, for example \"... -> S\". Pause for 7 units and \"(space)\" is printed between words. Try S O S: three short, three long, three short.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Единица времени 120 мс (примерно 10 слов в минуту): нажатие короче 240 мс это точка, длиннее тире. Пауза в 3 единицы после буквы, и она расшифровывается, например «... -> S». Пауза в 7 единиц, и между словами печатается «(space)». Попробуйте S O S: три коротких, три длинных, три коротких.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Уақыт бірлігі 120 мс (минутына шамамен 10 сөз): 240 мс-тан қысқа басу нүкте, ұзынырағы сызықша. Әріптен кейін 3 бірлік үзіліс жасасаңыз, ол ашылады, мысалы «... -> S». 7 бірлік үзілісте сөздер арасында «(space)» шығады. S O S көріңіз: үш қысқа, үш ұзын, үш қысқа.",
      },
      expect: { en: "\"... -> S\", \"--- -> O\", \"... -> S\" in the Serial Monitor.", ru: "«... -> S», «--- -> O», «... -> S» в Serial Monitor.", kk: "Serial Monitor-да «... -> S», «--- -> O», «... -> S»." },
      mistake: { en: "Pausing too long inside a letter splits it in two; if you are a slow keyer, raise UNIT_MS to 150–200.", ru: "Слишком длинная пауза внутри буквы разбивает её на две; если вы стучите медленно, увеличьте UNIT_MS до 150–200.", kk: "Әріп ішіндегі тым ұзақ үзіліс оны екіге бөледі; баяу соқсаңыз, UNIT_MS мәнін 150–200-ге дейін арттырыңыз." },
    },
    {
      title: { en: "Send text as a beacon", ru: "Передайте текст как маяк", kk: "Мәтінді маяк ретінде жіберіңіз" },
      body: {
        en: "Set the Serial Monitor line ending to \"Newline\", type a message such as \"SOS\" or \"HELLO 73\" and press Enter. The sketch prints each letter with its code and plays it with standard timing: a dash is 3 units, the gap inside a letter 1 unit, between letters 3 and between words 7. Letters A–Z and digits 0–9 are supported; other characters are skipped.",
        ru: "Выберите в Serial Monitor окончание строки «Newline», введите сообщение, например «SOS» или «HELLO 73», и нажмите Enter. Скетч печатает каждую букву с её кодом и проигрывает её со стандартными интервалами: тире 3 единицы, пауза внутри буквы 1 единица, между буквами 3, между словами 7. Поддерживаются буквы A–Z и цифры 0–9, остальные символы пропускаются.",
        kk: "Serial Monitor-да жол соңын «Newline» етіп таңдап, «SOS» немесе «HELLO 73» сияқты хабарлама жазып, Enter басыңыз. Скетч әр әріпті кодымен бірге шығарып, оны стандартты аралықтармен ойнатады: сызықша 3 бірлік, әріп ішіндегі үзіліс 1 бірлік, әріптер арасында 3, сөздер арасында 7. A–Z әріптері мен 0–9 цифрлары қолдау табады, қалған таңбалар өткізіліп жіберіледі.",
      },
      expect: { en: "\"TX: SOS\" followed by \"S ...\", \"O ---\", \"S ...\" while the LED and buzzer flash the code.", ru: "«TX: SOS», затем «S ...», «O ---», «S ...», пока светодиод и пищалка выдают код.", kk: "«TX: SOS», содан кейін «S ...», «O ---», «S ...», ал жарық диоды мен зуммер кодты береді." },
      mistake: { en: "Cyrillic letters are not in the table and are skipped; Morse for them exists, but this sketch covers Latin only.", ru: "Кириллицы нет в таблице, она пропускается; для неё есть своя Морзе, но этот скетч знает только латиницу.", kk: "Кирилл әріптері кестеде жоқ, олар өткізіледі; олардың да Морзе коды бар, бірақ бұл скетч тек латынды біледі." },
    },
  ],
  code: [{
    filename: "morse_beacon.ino",
    language: "cpp",
    libraries: [],
    source: `// Morse code beacon: key Morse on the button (decoded to Serial),
// or type text in the Serial Monitor to send it as light + sound.
const int KEY_PIN = 2;
const int BUZZER_PIN = 8;
const int LED_PIN = 9;
const unsigned long UNIT_MS = 120;          // one dot; about 10 words per minute

const char* const CODES[36] = {
  ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--",
  "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..",
  "-----", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----."
};

char pattern[8];
int patLen = 0;
bool wasDown = false;
unsigned long edgeAt = 0;
bool wordDone = true;

void keyOutput(bool on) {
  digitalWrite(BUZZER_PIN, on ? HIGH : LOW);
  digitalWrite(LED_PIN, on ? HIGH : LOW);
}

const char* codeFor(char c) {
  if (c >= 'A' && c <= 'Z') return CODES[c - 'A'];
  if (c >= '0' && c <= '9') return CODES[26 + c - '0'];
  return nullptr;
}

char decode(const char* p) {
  for (int i = 0; i < 36; i++) {
    if (strcmp(p, CODES[i]) == 0) return i < 26 ? 'A' + i : '0' + (i - 26);
  }
  return '?';
}

void playText(const String& text) {
  Serial.print("TX: ");
  Serial.println(text);
  for (unsigned int i = 0; i < text.length(); i++) {
    char c = toupper(text[i]);
    if (c == ' ') { delay(UNIT_MS * 4); continue; }        // 3 (after letter) + 4 = 7-unit word gap
    const char* code = codeFor(c);
    if (code == nullptr) continue;
    Serial.print(c);
    Serial.print(' ');
    Serial.println(code);
    for (int j = 0; code[j] != '\\0'; j++) {
      keyOutput(true);
      delay(code[j] == '.' ? UNIT_MS : UNIT_MS * 3);
      keyOutput(false);
      delay(UNIT_MS);                                       // 1-unit gap inside a letter
    }
    delay(UNIT_MS * 2);                                     // 3-unit gap between letters
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(KEY_PIN, INPUT_PULLUP);                           // pressed = LOW
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.println("Morse beacon ready: key the button or type text");
}

void loop() {
  if (Serial.available()) {
    String line = Serial.readStringUntil('\\n');
    line.trim();
    if (line.length() > 0) playText(line);
    edgeAt = millis();
    return;
  }

  bool down = digitalRead(KEY_PIN) == LOW;
  unsigned long now = millis();
  if (down != wasDown && now - edgeAt > 15) {               // 15 ms debounce
    keyOutput(down);
    if (!down && patLen < 7) {
      pattern[patLen++] = (now - edgeAt) < UNIT_MS * 2 ? '.' : '-';
    }
    wasDown = down;
    edgeAt = now;
  }

  if (!down) {
    unsigned long idle = now - edgeAt;
    if (patLen > 0 && idle > UNIT_MS * 3) {                 // letter finished
      pattern[patLen] = '\\0';
      Serial.print(pattern);
      Serial.print(" -> ");
      Serial.println(decode(pattern));
      patLen = 0;
      wordDone = false;
    } else if (!wordDone && patLen == 0 && idle > UNIT_MS * 7) {
      Serial.println("(space)");
      wordDone = true;
    }
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Everything decodes as E or T", ru: "Всё расшифровывается как E или T", kk: "Бәрі E немесе T болып ашылады" },
      cause: { en: "Your pauses between dots and dashes are longer than 3 units, so each element ends the letter.", ru: "Паузы между точками и тире длиннее 3 единиц, и каждый элемент заканчивает букву.", kk: "Нүкте мен сызықша арасындағы үзілістер 3 бірліктен ұзын, сондықтан әр элемент әріпті аяқтайды." },
      fix: { en: "Key faster inside a letter, or raise UNIT_MS to 150–200 ms to match your pace.", ru: "Стучите быстрее внутри буквы или увеличьте UNIT_MS до 150–200 мс под свой темп.", kk: "Әріп ішінде жылдамырақ соғыңыз немесе өз қарқыныңызға сай UNIT_MS мәнін 150–200 мс-қа дейін арттырыңыз." },
    },
    {
      symptom: { en: "Typed text plays with a one-second delay", ru: "Введённый текст звучит с задержкой в секунду", kk: "Жазылған мәтін бір секунд кешігіп ойнайды" },
      cause: { en: "The Serial Monitor sends \"No line ending\", so readStringUntil() waits for its 1 s timeout.", ru: "Serial Monitor отправляет «Нет конца строки», и readStringUntil() ждёт свой таймаут в 1 с.", kk: "Serial Monitor «жол соңы жоқ» күйінде жібереді, сондықтан readStringUntil() өзінің 1 с күту уақытын күтеді." },
      fix: { en: "Choose \"Newline\" in the line-ending menu at the bottom of the Serial Monitor.", ru: "Выберите «Newline» в меню окончания строки внизу Serial Monitor.", kk: "Serial Monitor-дың төменгі жағындағы жол соңы мәзірінен «Newline» таңдаңыз." },
    },
    {
      symptom: { en: "The LED flashes but the buzzer is silent", ru: "Светодиод мигает, а пищалка молчит", kk: "Жарық диоды жыпылықтайды, бірақ зуммер үнсіз" },
      cause: { en: "Buzzer leads reversed, or it is a passive buzzer that needs a tone signal.", ru: "Перепутана полярность пищалки, или это пассивная пищалка, которой нужен сигнал tone.", kk: "Зуммердің полярлығы ауысқан немесе бұл tone сигналын қажет ететін пассивті зуммер." },
      fix: { en: "Put the longer + leg on D8. A passive buzzer works too if you replace the BUZZER_PIN line in keyOutput() with tone(BUZZER_PIN, 700) / noTone(BUZZER_PIN).", ru: "Поставьте длинную ножку + на D8. Пассивная тоже подойдёт, если в keyOutput() заменить строку BUZZER_PIN на tone(BUZZER_PIN, 700) / noTone(BUZZER_PIN).", kk: "Ұзын + аяғын D8-ге қойыңыз. Пассивті зуммер де жарайды, егер keyOutput() ішіндегі BUZZER_PIN жолын tone(BUZZER_PIN, 700) / noTone(BUZZER_PIN) етіп ауыстырсаңыз." },
    },
  ],
  safety: [
    { en: "Never connect an LED to a pin without its resistor.", ru: "Никогда не подключайте светодиод к пину без резистора.", kk: "Жарық диодын ешқашан резисторсыз пинге қоспаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["Morse beacon ready: key the button or type text", "... -> S", "--- -> O", "... -> S", "(space)", "TX: HELLO 73", "H ....", "E .", "L .-..", "L .-..", "O ---", "7 --...", "3 ...--"],
    leds: [{ label: "Beacon", color: "#FFF59D" }],
  },
} satisfies GuideContent;
