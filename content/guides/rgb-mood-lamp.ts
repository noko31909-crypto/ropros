import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "rgb-mood-lamp",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "home",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 8,
  xpReward: 130,
  title: {
    en: "RGB Mood Lamp",
    ru: "RGB-ночник настроения",
    kk: "RGB көңіл-күй шамы",
  },
  summary: {
    en: "A common-cathode RGB LED mixes any colour: turn a knob to pick the hue, press the button and the lamp slowly drifts through the whole rainbow.",
    ru: "RGB-светодиод с общим катодом смешивает любой цвет: ручкой выбираете оттенок, а по кнопке лампа медленно плывёт по всей радуге.",
    kk: "Ортақ катодты RGB жарық диоды кез келген түсті араластырады: тұтқамен реңкті таңдайсыз, ал батырманы басқанда шам бүкіл кемпірқосақ бойымен баяу ауысады.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V logic, USB powered", ru: "ATmega328P, логика 5 В, питание от USB", kk: "ATmega328P, 5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "rgb-led", qty: 1, spec: { en: "5 mm, common cathode (longest leg = −), diffused if possible", ru: "5 мм, общий катод (самая длинная ножка = −), лучше матовый", kk: "5 мм, ортақ катод (ең ұзын аяқ = −), күңгірт корпусты болғаны жақсы" }, role: { en: "Colour source", ru: "Источник цвета", kk: "Түс көзі" } },
    { component: "resistor", qty: 3, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "One per colour channel", ru: "По одному на каждый канал цвета", kk: "Әр түс арнасына біреуден" } },
    { component: "potentiometer", qty: 1, spec: { en: "10 kΩ linear", ru: "10 кОм линейный", kk: "10 кОм сызықтық" }, role: { en: "Colour knob", ru: "Ручка выбора цвета", kk: "Түс таңдау тұтқасы" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Fade mode on/off", ru: "Вкл/выкл режима перелива", kk: "Ауысу режимін қосу/өшіру" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "rgb", component: "rgb-led", label: "RGB LED" },
    { id: "r_red", component: "resistor", label: "220 Ω" },
    { id: "r_grn", component: "resistor", label: "220 Ω" },
    { id: "r_blu", component: "resistor", label: "220 Ω" },
    { id: "pot", component: "potentiometer", label: "Colour" },
    { id: "btn", component: "push-button", label: "Fade" },
  ],
  connections: [
    { from: "board.D9", to: "r_red.A", color: "red" },
    { from: "r_red.B", to: "rgb.R", color: "red" },
    { from: "board.D10", to: "r_grn.A", color: "green" },
    { from: "r_grn.B", to: "rgb.G", color: "green" },
    { from: "board.D11", to: "r_blu.A", color: "blue" },
    { from: "r_blu.B", to: "rgb.B", color: "blue" },
    { from: "rgb.K", to: "board.GND", color: "black", note: { en: "longest leg, common cathode", ru: "самая длинная ножка, общий катод", kk: "ең ұзын аяқ, ортақ катод" } },
    { from: "pot.1", to: "board.5V", color: "orange" },
    { from: "pot.W", to: "board.A0", color: "yellow", note: { en: "middle leg (wiper)", ru: "средняя ножка (движок)", kk: "ортаңғы аяқ (жүгірткі)" } },
    { from: "pot.2", to: "board.GND2", color: "black" },
    { from: "board.D2", to: "btn.1", color: "purple", note: { en: "internal pull-up, no resistor needed", ru: "внутренняя подтяжка, резистор не нужен", kk: "ішкі тарту, резистор қажет емес" } },
    { from: "btn.2", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Identify the RGB LED legs", ru: "Определите ножки RGB-светодиода", kk: "RGB жарық диодының аяқтарын анықтаңыз" },
      body: {
        en: "Find the longest leg: it is the common cathode (K). Hold the LED so K is second from the left. On the usual pinout the legs then read R, K, G, B: red is the single leg left of K, green and blue are the two on its right. Place the Nano across the centre gap of the breadboard and the LED a few rows away.",
        ru: "Найдите самую длинную ножку: это общий катод (K). Держите светодиод так, чтобы K была второй слева. У типичной распиновки ножки тогда идут R, K, G, B: красный это одиночная ножка слева от K, зелёный и синий две ножки справа. Поставьте Nano поперёк центральной канавки макетки, а светодиод в нескольких рядах от него.",
        kk: "Ең ұзын аяқты табыңыз: бұл ортақ катод (K). Жарық диодын K солдан екінші болатындай ұстаңыз. Әдеттегі пин ретінде аяқтар сонда R, K, G, B болып келеді: қызыл K-дің сол жағындағы жалғыз аяқ, жасыл мен көк оның оң жағындағы екі аяқ. Nano-ны макет тақтасының ортаңғы ойығына көлденең қойып, жарық диодын одан бірнеше қатар әріге орнатыңыз.",
      },
      expect: { en: "You know which leg is K and which colour each other leg is.", ru: "Вы знаете, какая ножка K и какой цвет у остальных.", kk: "Қай аяқ K екенін және қалғандарының түсін білесіз." },
      mistake: { en: "A common-anode LED looks identical; with this sketch its colours come out inverted. Check the listing says common cathode.", ru: "Светодиод с общим анодом выглядит так же, но с этим скетчем его цвета будут инвертированы. Проверьте, что в описании написано «общий катод».", kk: "Ортақ анодты жарық диоды дәл осындай көрінеді, бірақ бұл скетчпен оның түстері керісінше шығады. Сипаттамасында «ортақ катод» деп жазылғанын тексеріңіз." },
    },
    {
      title: { en: "Wire the three colour channels", ru: "Подключите три канала цвета", kk: "Үш түс арнасын қосыңыз" },
      body: {
        en: "Each colour needs its own 220 Ω resistor: D9 → resistor → R, D10 → resistor → G, D11 → resistor → B. Connect the long K leg to GND. D9, D10 and D11 are PWM pins, so analogWrite() can set each channel to any of 256 brightness levels.",
        ru: "Каждому цвету нужен свой резистор 220 Ом: D9 → резистор → R, D10 → резистор → G, D11 → резистор → B. Длинную ножку K подключите к GND. D9, D10 и D11 это ШИМ-пины, поэтому analogWrite() задаёт каждому каналу любую из 256 степеней яркости.",
        kk: "Әр түске өз 220 Ом резисторы керек: D9 → резистор → R, D10 → резистор → G, D11 → резистор → B. Ұзын K аяғын GND-ге қосыңыз. D9, D10 және D11 ЕИМ (PWM) пиндері, сондықтан analogWrite() әр арнаға 256 жарықтық деңгейінің кез келгенін бере алады.",
      },
      expect: { en: "Three resistors, one between each colour leg and its pin.", ru: "Три резистора, по одному между каждой цветной ножкой и её пином.", kk: "Үш резистор, әр түсті аяқ пен оның пині арасында біреуден." },
      mistake: { en: "One shared resistor on K makes the colours fight: red steals current from blue and green.", ru: "Один общий резистор на K заставляет цвета бороться: красный отбирает ток у синего и зелёного.", kk: "K-ға бір ортақ резистор қойсаңыз, түстер бір-бірімен таласады: қызыл көк пен жасылдың тогын тартып алады." },
    },
    {
      title: { en: "Add the colour knob", ru: "Добавьте ручку цвета", kk: "Түс тұтқасын қосыңыз" },
      body: {
        en: "Wire the potentiometer's outer legs to 5V and GND, and the middle leg to A0. The sketch maps 0…1023 from A0 to a hue of 0…359° on the colour wheel: red at one end, through yellow, green, cyan, blue and magenta back to red.",
        ru: "Крайние ножки потенциометра подключите к 5V и GND, среднюю к A0. Скетч переводит 0…1023 с A0 в оттенок 0…359° на цветовом круге: от красного через жёлтый, зелёный, голубой, синий и пурпурный обратно к красному.",
        kk: "Потенциометрдің шеткі аяқтарын 5V пен GND-ге, ортаңғысын A0-ге қосыңыз. Скетч A0-ден келген 0…1023 мәнін түс шеңберіндегі 0…359° реңкке айналдырады: қызылдан сары, жасыл, көгілдір, көк және күлгін арқылы қайтадан қызылға.",
      },
      expect: { en: "Turning the knob end to end runs through the whole rainbow.", ru: "Поворот ручки от края до края проходит всю радугу.", kk: "Тұтқаны шетінен шетіне бұрағанда бүкіл кемпірқосақ өтеді." },
      mistake: { en: "Wiper on an outer pin means the knob only switches between two colours.", ru: "Если движок на крайнем выводе, ручка лишь переключает между двумя цветами.", kk: "Жүгірткі шеткі шықпаға қосылса, тұтқа тек екі түс арасында ауыстырады." },
    },
    {
      title: { en: "Add the fade button", ru: "Добавьте кнопку перелива", kk: "Ауысу батырмасын қосыңыз" },
      body: {
        en: "Place the button across the centre gap. Wire one leg to D2 and the diagonally opposite leg to GND. The sketch enables the internal pull-up, so D2 reads LOW only while you press. Each press toggles between knob mode and fade mode.",
        ru: "Поставьте кнопку поперёк центральной канавки. Одну ножку подключите к D2, ножку по диагонали к GND. Скетч включает внутреннюю подтяжку, поэтому D2 читает LOW только пока кнопка нажата. Каждое нажатие переключает режим ручки и режим перелива.",
        kk: "Батырманы ортаңғы ойыққа көлденең қойыңыз. Бір аяғын D2-ге, диагональ бойынша қарсы аяғын GND-ге қосыңыз. Скетч ішкі тартуды қосады, сондықтан D2 тек батырманы басып тұрғанда LOW оқиды. Әр басу тұтқа режимі мен ауысу режимін алмастырады.",
      },
      expect: { en: "Serial Monitor prints \"mode: fade\" and \"mode: knob\" on each press.", ru: "Serial Monitor печатает «mode: fade» и «mode: knob» при каждом нажатии.", kk: "Әр басқанда Serial Monitor «mode: fade» және «mode: knob» деп шығарады." },
      mistake: { en: "Two wires on legs that are always joined make the lamp toggle endlessly.", ru: "Если оба провода на всегда соединённых ножках, лампа переключается без конца.", kk: "Екі сым әрқашан жалғанған аяқтарда болса, шам тоқтаусыз ауысып тұрады." },
    },
    {
      title: { en: "Upload and diffuse the light", ru: "Загрузите скетч и рассейте свет", kk: "Скетчті жүктеп, жарықты шашыратыңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. In knob mode the printed hue follows the knob. Press the button: the lamp starts from the current colour and drifts one degree every 40 ms, a full circle in about 15 seconds. Put a ping-pong ball, a frosted jar or a piece of baking paper over the LED so the three dies blend into one colour.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. В режиме ручки печатаемый оттенок следует за ручкой. Нажмите кнопку: лампа стартует с текущего цвета и смещается на градус каждые 40 мс, полный круг примерно за 15 секунд. Накройте светодиод шариком для пинг-понга, матовой баночкой или пекарской бумагой, чтобы три кристалла слились в один цвет.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Тұтқа режимінде шығарылатын реңк тұтқаға ілеседі. Батырманы басыңыз: шам ағымдағы түстен бастап әр 40 мс сайын бір градусқа ауысады, толық шеңбер шамамен 15 секунд. Үш кристалл бір түске араласуы үшін жарық диодын пинг-понг добымен, күңгірт шыны ыдыспен немесе пісіру қағазымен жабыңыз.",
      },
      expect: { en: "Smooth, even colours; fade mode loops forever until the next press.", ru: "Ровные плавные цвета; перелив идёт по кругу до следующего нажатия.", kk: "Біркелкі әрі жұмсақ түстер; ауысу келесі басуға дейін шеңбер бойымен жалғасады." },
      mistake: { en: "Looking straight at a bare LED you see three separate dots, not one colour.", ru: "Если смотреть прямо на голый светодиод, видны три отдельные точки, а не один цвет.", kk: "Жабылмаған жарық диодына тура қарасаңыз, бір түс емес, үш бөлек нүкте көресіз." },
    },
  ],
  code: [{
    filename: "rgb_mood_lamp.ino",
    language: "cpp",
    libraries: [],
    source: `// RGB mood lamp: the potentiometer picks the colour, the button toggles fade mode.
// Common-cathode RGB LED: HIGH / 255 = channel fully on.
const int RED_PIN = 9;
const int GREEN_PIN = 10;
const int BLUE_PIN = 11;
const int POT_PIN = A0;
const int BUTTON_PIN = 2;

bool fadeMode = false;
bool lastButton = HIGH;
unsigned long lastToggle = 0;
unsigned long lastFadeStep = 0;
int hue = 0;
int lastPrinted = -100;

// Full-brightness colour from a hue of 0..359 degrees.
void setHue(int h) {
  int sector = h / 60;
  int rise = (h % 60) * 255L / 60;
  int fall = 255 - rise;
  int r = 0, g = 0, b = 0;
  switch (sector) {
    case 0:  r = 255;  g = rise; break;   // red -> yellow
    case 1:  r = fall; g = 255;  break;   // yellow -> green
    case 2:  g = 255;  b = rise; break;   // green -> cyan
    case 3:  g = fall; b = 255;  break;   // cyan -> blue
    case 4:  r = rise; b = 255;  break;   // blue -> magenta
    default: r = 255;  b = fall; break;   // magenta -> red
  }
  analogWrite(RED_PIN, r);
  analogWrite(GREEN_PIN, g);
  analogWrite(BLUE_PIN, b);
}

void setup() {
  Serial.begin(9600);
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);   // pressed = LOW
  Serial.println("mode: knob");
}

void loop() {
  bool button = digitalRead(BUTTON_PIN);
  if (button == LOW && lastButton == HIGH && millis() - lastToggle > 200) {   // press edge + debounce
    fadeMode = !fadeMode;
    lastToggle = millis();
    Serial.println(fadeMode ? "mode: fade" : "mode: knob");
  }
  lastButton = button;

  if (fadeMode) {
    if (millis() - lastFadeStep >= 40) {      // 360 steps x 40 ms = about 15 s per circle
      lastFadeStep = millis();
      hue = (hue + 1) % 360;
      setHue(hue);
    }
  } else {
    hue = map(analogRead(POT_PIN), 0, 1023, 0, 359);
    setHue(hue);
    if (abs(hue - lastPrinted) >= 10) {
      lastPrinted = hue;
      Serial.print("hue: ");
      Serial.println(hue);
    }
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Colours are wrong (blue when it should be red)", ru: "Цвета не те (синий вместо красного)", kk: "Түстер дұрыс емес (қызылдың орнына көк)" },
      cause: { en: "Your LED has a different leg order than R, K, G, B, or two colour wires are swapped.", ru: "У вашего светодиода другой порядок ножек, чем R, K, G, B, или два цветных провода перепутаны.", kk: "Жарық диодыңыздың аяқ реті R, K, G, B емес немесе екі түсті сым ауысып кеткен." },
      fix: { en: "Turn the knob to the very start (pure red) and move the wires until only the red die glows, then check green and blue the same way.", ru: "Выкрутите ручку в начало (чистый красный) и переставляйте провода, пока не загорится только красный кристалл, затем так же проверьте зелёный и синий.", kk: "Тұтқаны басына (таза қызыл) бұрап, тек қызыл кристалл жанғанша сымдарды ауыстырыңыз, содан кейін жасыл мен көкті де солай тексеріңіз." },
    },
    {
      symptom: { en: "The LED is white or off where it should be bright, and dark where it should be on", ru: "Светодиод белый или тёмный там, где должен ярко гореть, и наоборот", kk: "Жарық диоды жарқырауы керек жерде ақ не өшік, ал керісінше де солай" },
      cause: { en: "It is a common-anode RGB LED: its channels light when the pin is LOW.", ru: "Это RGB-светодиод с общим анодом: его каналы горят, когда на пине LOW.", kk: "Бұл ортақ анодты RGB жарық диоды: оның арналары пинде LOW болғанда жанады." },
      fix: { en: "Use a common-cathode LED as listed. For a common-anode one, wire the long leg to 5V instead of GND and write 255 - value in setHue().", ru: "Используйте светодиод с общим катодом, как в списке. Для общего анода подключите длинную ножку к 5V вместо GND и пишите 255 - value в setHue().", kk: "Тізімдегідей ортақ катодты жарық диодын қолданыңыз. Ортақ анодты болса, ұзын аяғын GND-нің орнына 5V-ке қосып, setHue() ішінде 255 - value жазыңыз." },
    },
    {
      symptom: { en: "The button sometimes toggles twice", ru: "Кнопка иногда переключает дважды", kk: "Батырма кейде екі рет ауыстырады" },
      cause: { en: "Contact bounce: a cheap tactile switch chatters for a few milliseconds.", ru: "Дребезг контактов: дешёвая тактовая кнопка «звенит» несколько миллисекунд.", kk: "Түйіспе дірілі: арзан тактілі батырма бірнеше миллисекунд «секіреді»." },
      fix: { en: "Raise the 200 ms debounce window in loop() to 300 ms.", ru: "Увеличьте окно антидребезга 200 мс в loop() до 300 мс.", kk: "loop() ішіндегі 200 мс дірілге қарсы терезені 300 мс-қа дейін ұлғайтыңыз." },
    },
  ],
  safety: [
    { en: "Give every colour channel its own resistor; a bare RGB LED on 5 V burns out in seconds.", ru: "Дайте каждому каналу свой резистор: голый RGB-светодиод на 5 В сгорает за секунды.", kk: "Әр түс арнасына өз резисторын беріңіз: резисторсыз RGB жарық диоды 5 В-та бірнеше секундта күйеді." },
  ],
  simulation: {
    baud: 9600,
    lines: ["mode: knob", "hue: 0", "hue: 42", "hue: 118", "hue: 236", "mode: fade", "mode: knob", "hue: 301"],
    leds: [{ label: "R", color: "#E53935" }, { label: "G", color: "#43A047" }, { label: "B", color: "#1E88E5" }],
  },
} satisfies GuideContent;
