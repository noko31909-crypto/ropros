import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "eight-key-piano",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "audio",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 9,
  xpReward: 120,
  title: {
    en: "Eight-Key Piano",
    ru: "Пианино на восемь клавиш",
    kk: "Сегіз пернелі пианино",
  },
  summary: {
    en: "Eight push buttons play one C major octave (C4 to C5) on a passive buzzer. Internal pull-ups mean no extra resistors for the keys, and the lowest pressed key wins.",
    ru: "Восемь кнопок играют одну октаву до мажора (C4–C5) на пассивном зуммере. Благодаря внутренним подтяжкам клавишам не нужны резисторы, а при нескольких нажатых звучит самая низкая.",
    kk: "Сегіз батырма пассивті зуммерде до мажордың бір октавасын (C4–C5) ойнайды. Ішкі тартудың арқасында пернелерге резистор керек емес, ал бірнешеуі басылса, ең төменгісі естіледі.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "push-button", qty: 8, spec: { en: "6×6 or 12×12 mm tactile", ru: "тактовые 6×6 или 12×12 мм", kk: "6×6 немесе 12×12 мм тактілі" }, role: { en: "Piano keys C D E F G A B C", ru: "Клавиши C D E F G A B C", kk: "C D E F G A B C пернелері" } },
    { component: "buzzer-passive", qty: 1, spec: { en: "passive (no built-in oscillator), 12 mm", ru: "пассивный (без генератора), 12 мм", kk: "пассивті (ішкі генераторсыз), 12 мм" }, role: { en: "Plays the notes", ru: "Воспроизводит ноты", kk: "Ноталарды ойнайды" } },
    { component: "resistor", qty: 1, spec: { en: "100 Ω, ¼ W", ru: "100 Ом, ¼ Вт", kk: "100 Ом, ¼ Вт" }, role: { en: "Limits the buzzer current", ru: "Ограничивает ток зуммера", kk: "Зуммер тогын шектейді" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Keyboard layout", ru: "Раскладка клавиатуры", kk: "Пернетақта орналасуы" } },
    { component: "jumper-wires", qty: 20, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "k_c4", component: "push-button", label: "C4" },
    { id: "k_d4", component: "push-button", label: "D4" },
    { id: "k_e4", component: "push-button", label: "E4" },
    { id: "k_f4", component: "push-button", label: "F4" },
    { id: "k_g4", component: "push-button", label: "G4" },
    { id: "k_a4", component: "push-button", label: "A4" },
    { id: "k_b4", component: "push-button", label: "B4" },
    { id: "k_c5", component: "push-button", label: "C5" },
    { id: "r_bz", component: "resistor", label: "100 Ω" },
    { id: "bz", component: "buzzer-passive", label: "Passive buzzer" },
  ],
  connections: [
    { from: "board.D2", to: "k_c4.1", color: "blue", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажата = LOW", kk: "ішкі тарту, басылғанда LOW" } },
    { from: "k_c4.2", to: "board.GND", color: "black" },
    { from: "board.D3", to: "k_d4.1", color: "blue" },
    { from: "k_d4.2", to: "board.GND", color: "black" },
    { from: "board.D4", to: "k_e4.1", color: "blue" },
    { from: "k_e4.2", to: "board.GND", color: "black" },
    { from: "board.D5", to: "k_f4.1", color: "blue" },
    { from: "k_f4.2", to: "board.GND", color: "black" },
    { from: "board.D6", to: "k_g4.1", color: "blue" },
    { from: "k_g4.2", to: "board.GND2", color: "black" },
    { from: "board.D7", to: "k_a4.1", color: "blue" },
    { from: "k_a4.2", to: "board.GND2", color: "black" },
    { from: "board.D8", to: "k_b4.1", color: "blue" },
    { from: "k_b4.2", to: "board.GND2", color: "black" },
    { from: "board.D9", to: "k_c5.1", color: "blue" },
    { from: "k_c5.2", to: "board.GND2", color: "black" },
    { from: "board.D12", to: "r_bz.A", color: "yellow" },
    { from: "r_bz.B", to: "bz.+", color: "yellow" },
    { from: "bz.-", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Lay out the keyboard", ru: "Разложите клавиатуру", kk: "Пернетақтаны орналастырыңыз" },
      body: {
        en: "Place the eight buttons in one row across the breadboard gap, leaving a free column between them so your fingers fit. From left to right they are C4, D4, E4, F4, G4, A4, B4 and C5. Run a jumper from the blue (−) rail to Arduino GND.",
        ru: "Поставьте восемь кнопок в один ряд поперёк канавки макетки, оставляя между ними свободный столбец, чтобы помещались пальцы. Слева направо это C4, D4, E4, F4, G4, A4, B4 и C5. Соедините синюю шину (−) с GND Arduino.",
        kk: "Сегіз батырманы макет тақтасының ойығына көлденең бір қатарға, саусақ сыятындай араларына бір бос баған қалдырып қойыңыз. Солдан оңға қарай олар C4, D4, E4, F4, G4, A4, B4 және C5. Көк (−) шинаны Arduino GND-іне қосыңыз.",
      },
      expect: { en: "A neat row of eight buttons and a GND rail.", ru: "Аккуратный ряд из восьми кнопок и шина GND.", kk: "Сегіз батырмадан тұратын ұқыпты қатар және GND шинасы." },
      mistake: { en: "Buttons placed along a breadboard row instead of across the gap are shorted from the start.", ru: "Кнопки, поставленные вдоль ряда, а не поперёк канавки, замкнуты с самого начала.", kk: "Ойыққа көлденең емес, қатар бойымен қойылған батырмалар басынан-ақ тұйықталып тұрады." },
    },
    {
      title: { en: "Wire the keys to D2–D9", ru: "Подключите клавиши к D2–D9", kk: "Пернелерді D2–D9-ға қосыңыз" },
      body: {
        en: "Connect the top-left leg of each button to its pin: C4 → D2, D4 → D3, E4 → D4, F4 → D5, G4 → D6, A4 → D7, B4 → D8, C5 → D9. Connect the bottom-right leg of every button to the GND rail. The sketch turns on INPUT_PULLUP, so each pin rests at HIGH and drops to LOW when its key is pressed.",
        ru: "Соедините верхнюю левую ножку каждой кнопки с её пином: C4 → D2, D4 → D3, E4 → D4, F4 → D5, G4 → D6, A4 → D7, B4 → D8, C5 → D9. Нижнюю правую ножку каждой кнопки подключите к шине GND. Скетч включает INPUT_PULLUP, поэтому в покое пин читает HIGH, а при нажатии клавиши LOW.",
        kk: "Әр батырманың жоғарғы сол аяғын өз пиніне қосыңыз: C4 → D2, D4 → D3, E4 → D4, F4 → D5, G4 → D6, A4 → D7, B4 → D8, C5 → D9. Әр батырманың төменгі оң аяғын GND шинасына жалғаңыз. Скетч INPUT_PULLUP қосады, сондықтан тыныш күйде пин HIGH, ал перне басылғанда LOW оқиды.",
      },
      expect: { en: "Eight signal wires in order from D2 to D9, every button also tied to GND.", ru: "Восемь сигнальных проводов по порядку от D2 до D9, каждая кнопка также соединена с GND.", kk: "D2-ден D9-ға дейін ретімен сегіз сигнал сымы, әр батырма GND-ге де қосылған." },
      mistake: { en: "Using D0 or D1 for a key breaks uploading and the Serial Monitor; they are the USB serial pins.", ru: "Если взять D0 или D1 для клавиши, сломаются загрузка и Serial Monitor: это пины USB-UART.", kk: "Пернеге D0 немесе D1 алсаңыз, жүктеу мен Serial Monitor бұзылады: олар USB-UART пиндері." },
    },
    {
      title: { en: "Connect the passive buzzer", ru: "Подключите пассивный зуммер", kk: "Пассивті зуммерді қосыңыз" },
      body: {
        en: "Wire D12 → 100 Ω resistor → buzzer +, and buzzer − to GND. A magnetic buzzer coil is only about 16 Ω, so the resistor keeps the pin current within its limit. Use a passive buzzer: it has no sticker on top and you can see the circuit board underneath. An active buzzer only beeps one fixed pitch.",
        ru: "Подключите D12 → резистор 100 Ом → + зуммера, а − зуммера к GND. Катушка магнитного зуммера всего около 16 Ом, и резистор удерживает ток пина в допустимых пределах. Нужен именно пассивный зуммер: у него нет наклейки сверху, а снизу видна плата. Активный зуммер пищит только одним тоном.",
        kk: "D12 → 100 Ом резистор → зуммер + тізбегін жалғап, зуммердің − шықпасын GND-ге қосыңыз. Магниттік зуммер катушкасы небәрі 16 Ом шамасында, ал резистор пин тогын рұқсат етілген шекте ұстайды. Пассивті зуммер қажет: оның үстінде жапсырма жоқ, ал астынан платасы көрінеді. Белсенді зуммер тек бір дыбыс биіктігімен шыңғырады.",
      },
      expect: { en: "The buzzer sits on its own column with the resistor in series.", ru: "Зуммер стоит в своём столбце, резистор включён последовательно.", kk: "Зуммер өз бағанында тұр, резистор тізбектей қосылған." },
      mistake: { en: "Swapping + and − on a passive buzzer still works, but it is quieter; follow the marking.", ru: "Если перепутать + и − у пассивного зуммера, он всё равно заиграет, но тише; следуйте маркировке.", kk: "Пассивті зуммердің + пен − шатастырсаңыз да ойнайды, бірақ әлсізірек; таңбаламаны ұстаныңыз." },
    },
    {
      title: { en: "Upload and play a scale", ru: "Загрузите скетч и сыграйте гамму", kk: "Скетчті жүктеп, гамма ойнаңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. Press the keys from left to right to hear C D E F G A B C. The note sounds as long as you hold the key; if you press two keys at once, the lower one plays because tone() can drive only one pitch at a time. Try \"Twinkle Twinkle\": C C G G A A G.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Нажимайте клавиши слева направо, чтобы услышать C D E F G A B C. Нота звучит, пока клавиша нажата; если нажать две сразу, прозвучит нижняя, потому что tone() умеет играть только одну частоту. Попробуйте «Twinkle Twinkle»: C C G G A A G.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. C D E F G A B C естілуі үшін пернелерді солдан оңға қарай басыңыз. Перне басылып тұрғанша нота естіледі; екеуін бірге басса, төменгісі ойнайды, себебі tone() бір уақытта тек бір жиілікті ойната алады. «Twinkle Twinkle» ойнап көріңіз: C C G G A A G.",
      },
      expect: { en: "Each key plays its own note and the Serial Monitor prints \"C4 262 Hz\" and so on.", ru: "Каждая клавиша играет свою ноту, а Serial Monitor печатает «C4 262 Hz» и т. д.", kk: "Әр перне өз нотасын ойнайды, ал Serial Monitor «C4 262 Hz» және т.б. шығарады." },
      mistake: { en: "If two neighbouring keys play the same note, two signal wires are in the same breadboard row.", ru: "Если две соседние клавиши играют одну ноту, два сигнальных провода стоят в одном ряду макетки.", kk: "Екі көрші перне бір нотаны ойнаса, екі сигнал сымы макет тақтасының бір қатарында тұр." },
    },
  ],
  code: [{
    filename: "eight_key_piano.ino",
    language: "cpp",
    libraries: [],
    source: `// C major scale, one octave: C4 D4 E4 F4 G4 A4 B4 C5
const int KEY_PINS[8] = {2, 3, 4, 5, 6, 7, 8, 9};
const int BUZZER_PIN = 12;
const unsigned int NOTES_HZ[8] = {262, 294, 330, 349, 392, 440, 494, 523};
const char* const NOTE_NAMES[8] = {"C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"};

int currentKey = -1;   // -1 = silence

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 8; i++) pinMode(KEY_PINS[i], INPUT_PULLUP);   // pressed = LOW
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.println("Piano ready: press a key");
}

void loop() {
  int key = -1;
  for (int i = 0; i < 8; i++) {
    if (digitalRead(KEY_PINS[i]) == LOW) { key = i; break; }   // lowest pressed key wins
  }

  if (key != currentKey) {
    if (key < 0) {
      noTone(BUZZER_PIN);
    } else {
      tone(BUZZER_PIN, NOTES_HZ[key]);
      Serial.print(NOTE_NAMES[key]);
      Serial.print(' ');
      Serial.print(NOTES_HZ[key]);
      Serial.println(" Hz");
    }
    currentKey = key;
  }
  delay(5);   // light debounce
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Only clicks, no clear notes", ru: "Только щелчки, а не ноты", kk: "Нота емес, тек шертпе дыбыс" },
      cause: { en: "It is an active buzzer, which has its own oscillator.", ru: "Это активный зуммер со встроенным генератором.", kk: "Бұл ішкі генераторы бар белсенді зуммер." },
      fix: { en: "Swap it for a passive buzzer (no sticker, open circuit board underneath).", ru: "Замените его на пассивный (без наклейки, снизу открытая плата).", kk: "Оны пассивті зуммерге ауыстырыңыз (жапсырмасыз, астынан платасы ашық)." },
    },
    {
      symptom: { en: "A note plays continuously without touching anything", ru: "Нота звучит без нажатия", kk: "Ешнәрсе баспай-ақ нота ойнай береді" },
      cause: { en: "That button is turned 90° on the breadboard, so its legs are always connected.", ru: "Эта кнопка повёрнута на 90°, и её ножки всегда соединены.", kk: "Бұл батырма 90°-қа бұрылған, сондықтан аяқтары үнемі жалғанып тұр." },
      fix: { en: "Rotate the button so the signal wire and the GND wire sit on opposite sides of the gap.", ru: "Поверните кнопку так, чтобы провод сигнала и провод GND оказались по разные стороны канавки.", kk: "Сигнал сымы мен GND сымы ойықтың екі жағында болатындай батырманы бұрыңыз." },
    },
    {
      symptom: { en: "One key is silent", ru: "Одна клавиша молчит", kk: "Бір перне үнсіз" },
      cause: { en: "Its signal wire is in the wrong row or its GND leg is not connected.", ru: "Её сигнальный провод не в том ряду, или ножка GND не подключена.", kk: "Оның сигнал сымы басқа қатарда немесе GND аяғы қосылмаған." },
      fix: { en: "Watch the Serial Monitor while pressing it; if nothing prints, re-check that button's two wires.", ru: "Нажимайте её, глядя в Serial Monitor; если ничего не печатается, проверьте два провода этой кнопки.", kk: "Serial Monitor-ға қарап, оны басыңыз; ештеңе шықпаса, сол батырманың екі сымын тексеріңіз." },
    },
  ],
  safety: [],
  simulation: {
    baud: 9600,
    lines: ["Piano ready: press a key", "C4 262 Hz", "D4 294 Hz", "E4 330 Hz", "F4 349 Hz", "G4 392 Hz", "A4 440 Hz", "B4 494 Hz", "C5 523 Hz"],
    leds: [],
  },
} satisfies GuideContent;
