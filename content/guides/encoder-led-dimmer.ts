import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "encoder-led-dimmer",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "home",
  robotics: false,
  difficulty: "beginner",
  hours: 1,
  costUsd: 7,
  xpReward: 120,
  title: {
    en: "Rotary Encoder LED Dimmer",
    ru: "Диммер светодиода на энкодере",
    kk: "Энкодермен басқарылатын жарық диоды диммері",
  },
  summary: {
    en: "Each click of a KY-040 rotary encoder changes an LED's brightness by 5 %, from 0 to 100 %, with gamma correction so the steps look even. Push the knob to switch the light on and off. Interrupts make sure no click is missed.",
    ru: "Каждый щелчок энкодера KY-040 меняет яркость светодиода на 5 %, от 0 до 100 %, с гамма-коррекцией, чтобы шаги выглядели равномерно. Нажатие на ручку включает и выключает свет. Прерывания не дают пропустить ни одного щелчка.",
    kk: "KY-040 энкодерінің әр шырты жарық диодының жарықтығын 0-ден 100 %-ға дейін 5 %-ға өзгертеді, қадамдар біркелкі көрінуі үшін гамма-түзетумен. Тұтқаны басу жарықты қосып-өшіреді. Үзілістер бір де бір шыртты жіберіп алмауды қамтамасыз етеді.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V, USB powered", ru: "ATmega328P, 5 В, питание от USB", kk: "ATmega328P, 5 В, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "rotary-encoder", qty: 1, spec: { en: "KY-040 module with push switch", ru: "модуль KY-040 с кнопкой", kk: "батырмасы бар KY-040 модулі" }, role: { en: "Brightness knob and on/off", ru: "Ручка яркости и вкл/выкл", kk: "Жарықтық тұтқасы және қосу/өшіру" } },
    { component: "led", qty: 1, spec: { en: "5 mm white or warm white", ru: "5 мм, белый или тёплый белый", kk: "5 мм, ақ немесе жылы ақ" }, role: { en: "The light", ru: "Свет", kk: "Жарық" } },
    { component: "resistor", qty: 1, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиода", kk: "Жарық диодының тогын шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "enc", component: "rotary-encoder", label: "KY-040" },
    { id: "r1", component: "resistor", label: "220 Ω" },
    { id: "led", component: "led", label: "LED" },
  ],
  connections: [
    { from: "enc.CLK", to: "board.D2", color: "yellow", note: { en: "interrupt 0", ru: "прерывание 0", kk: "0-үзіліс" } },
    { from: "enc.DT", to: "board.D3", color: "green", note: { en: "interrupt 1", ru: "прерывание 1", kk: "1-үзіліс" } },
    { from: "enc.SW", to: "board.D4", color: "blue", note: { en: "push switch, internal pull-up", ru: "кнопка, внутренняя подтяжка", kk: "батырма, ішкі тарту" } },
    { from: "enc.+", to: "board.5V", color: "red" },
    { from: "enc.GND", to: "board.GND", color: "black" },
    { from: "board.D9", to: "r1.A", color: "orange", note: { en: "PWM pin", ru: "пин ШИМ", kk: "ШИМ пині" } },
    { from: "r1.B", to: "led.A", color: "orange", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led.K", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Wire the encoder to the interrupt pins", ru: "Подключите энкодер к пинам прерываний", kk: "Энкодерді үзіліс пиндеріне қосыңыз" },
      body: {
        en: "The Nano has hardware interrupts only on D2 and D3, so CLK goes to D2 and DT to D3. SW goes to D4, + to 5V and GND to GND. The KY-040 board already has 10 kΩ pull-ups on CLK and DT; the sketch adds the internal pull-up for SW.",
        ru: "Аппаратные прерывания у Nano есть только на D2 и D3, поэтому CLK подключите к D2, а DT к D3. SW — к D4, + — к 5V, GND — к GND. На плате KY-040 уже есть подтяжки 10 кОм на CLK и DT; для SW скетч включает внутреннюю подтяжку.",
        kk: "Nano-да аппараттық үзілістер тек D2 мен D3-те бар, сондықтан CLK-ті D2-ге, ал DT-ні D3-ке қосыңыз. SW — D4-ке, + — 5V-қа, GND — GND-ге. KY-040 платасында CLK мен DT-де 10 кОм тартулар бар; SW үшін скетч ішкі тартуды қосады.",
      },
      expect: { en: "Five wires from the encoder: D2, D3, D4, 5V, GND.", ru: "Пять проводов от энкодера: D2, D3, D4, 5V, GND.", kk: "Энкодерден бес сым: D2, D3, D4, 5V, GND." },
      mistake: { en: "Putting CLK or DT on D4–D12: the Nano has no hardware interrupt there and fast turns lose counts.", ru: "Если посадить CLK или DT на D4–D12, прерывания там нет, и быстрые повороты теряют шаги.", kk: "CLK немесе DT-ні D4–D12-ге қоссаңыз, онда үзіліс жоқ, жылдам бұрағанда қадамдар жоғалады." },
    },
    {
      title: { en: "Add the LED on a PWM pin", ru: "Подключите светодиод к пину ШИМ", kk: "Жарық диодын ШИМ пиніне қосыңыз" },
      body: {
        en: "Connect D9 to a 220 Ω resistor, the resistor to the LED's long leg (anode) and the short leg (cathode) to GND. D9 is a PWM pin, so analogWrite() can dim it.",
        ru: "Соедините D9 с резистором 220 Ом, резистор — с длинной ножкой (анодом) светодиода, а короткую ножку (катод) — с GND. D9 — пин ШИМ, поэтому analogWrite() может менять яркость.",
        kk: "D9-ды 220 Ом резисторға, резисторды жарық диодының ұзын аяғына (анодына), ал қысқа аяғын (катодын) GND-ге қосыңыз. D9 — ШИМ пині, сондықтан analogWrite() жарықтықты өзгерте алады.",
      },
      expect: { en: "After upload the LED glows at 50 %.", ru: "После загрузки светодиод светится на 50 %.", kk: "Жүктегеннен кейін жарық диоды 50 %-бен жанады." },
      mistake: { en: "D2 or D4 cannot dim; only the pins marked with ~ (D3, D5, D6, D9, D10, D11) do PWM.", ru: "D2 и D4 не умеют диммировать; ШИМ есть только на пинах с ~ (D3, D5, D6, D9, D10, D11).", kk: "D2 мен D4 жарықты азайта алмайды; ШИМ тек ~ белгісі бар пиндерде (D3, D5, D6, D9, D10, D11)." },
    },
    {
      title: { en: "Upload and dim", ru: "Загрузите скетч и регулируйте", kk: "Скетчті жүктеп, реттеңіз" },
      body: {
        en: "Upload, open the Serial Monitor at 9600 baud and turn the knob. Every click is 5 %. The LED's PWM value follows a gamma curve of 2.2: 50 % is only PWM 55 of 255, because our eyes are far more sensitive to changes in dim light.",
        ru: "Загрузите скетч, откройте Serial Monitor на 9600 бод и покрутите ручку. Каждый щелчок — 5 %. Значение ШИМ идёт по гамма-кривой 2,2: 50 % — это всего ШИМ 55 из 255, потому что глаз гораздо чувствительнее к изменениям при слабом свете.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз да, тұтқаны бұраңыз. Әр шырт — 5 %. ШИМ мәні 2,2 гамма-қисығымен жүреді: 50 % — 255-тің тек 55-і, өйткені көз әлсіз жарықтағы өзгерістерге әлдеқайда сезімтал.",
      },
      expect: { en: "Brightness changes in even-looking steps; Serial prints \"brightness 55% pwm=68\" and so on.", ru: "Яркость меняется визуально равными шагами; Serial печатает «brightness 55% pwm=68» и т. д.", kk: "Жарықтық көзге біркелкі қадамдармен өзгереді; Serial «brightness 55% pwm=68» және т. с. с. шығарады." },
      mistake: { en: "Mapping 0–100 % straight to 0–255 makes the top half look almost the same and the bottom jump.", ru: "Если перевести 0–100 % в 0–255 линейно, верхняя половина выглядит почти одинаково, а внизу яркость скачет.", kk: "0–100 %-ды 0–255-ке сызықтық аударсаңыз, жоғарғы жартысы бірдей көрінеді де, төменгі жағында жарықтық секіреді." },
    },
    {
      title: { en: "Use the push switch", ru: "Используйте кнопку", kk: "Батырманы қолданыңыз" },
      body: {
        en: "Press the knob: the LED turns off and the sketch remembers the level. Press again and it returns to the same brightness. Turning while the light is off does nothing, so a bump cannot switch it on.",
        ru: "Нажмите на ручку: светодиод погаснет, а скетч запомнит уровень. Нажмите ещё раз — вернётся та же яркость. Поворот при выключенном свете ничего не делает, поэтому случайное касание его не включит.",
        kk: "Тұтқаны басыңыз: жарық диоды сөнеді, ал скетч деңгейді есте сақтайды. Қайта бассаңыз, сол жарықтық оралады. Жарық өшірулі кезде бұрау ештеңе істемейді, сондықтан кездейсоқ тиіп кету оны қоспайды.",
      },
      expect: { en: "Serial shows \"LED off\" and \"LED on: 70% pwm=116\".", ru: "В Serial «LED off» и «LED on: 70% pwm=116».", kk: "Serial-да «LED off» және «LED on: 70% pwm=116» шығады." },
      mistake: { en: "Without debouncing, one press can toggle twice; the sketch ignores edges closer than 30 ms.", ru: "Без антидребезга одно нажатие может переключить дважды; скетч игнорирует фронты чаще 30 мс.", kk: "Сықырға қарсы өңдеусіз бір басу екі рет ауыстыруы мүмкін; скетч 30 мс-тан жиі фронттарды елемейді." },
    },
  ],
  code: [{
    filename: "encoder_dimmer.ino",
    language: "cpp",
    libraries: [],
    source: `const int ENC_CLK_PIN = 2;   // interrupt 0
const int ENC_DT_PIN = 3;    // interrupt 1
const int ENC_SW_PIN = 4;    // push switch to GND
const int LED_PIN = 9;       // PWM

const int PCT_PER_CLICK = 5;
const bool REVERSE = false;  // set true if clockwise makes it dimmer

// quadrature decoder: index = previous AB * 4 + new AB; invalid jumps (bounce) count 0
const int8_t QDEC[16] = {0, -1, 1, 0, 1, 0, 0, -1, -1, 0, 0, 1, 0, 1, -1, 0};

volatile int quarterSteps = 0;
volatile uint8_t lastAB = 0;

int level = 50;              // brightness in %
bool ledOn = true;
bool lastSw = HIGH;
unsigned long lastSwEdge = 0;

void onEncoder() {
  uint8_t ab = (digitalRead(ENC_CLK_PIN) << 1) | digitalRead(ENC_DT_PIN);
  quarterSteps += QDEC[(lastAB << 2) | ab];
  lastAB = ab;
}

int pwmFor(int pct) {
  if (pct <= 0) return 0;
  int v = (int)(255.0 * pow(pct / 100.0, 2.2) + 0.5);   // gamma 2.2
  return v < 1 ? 1 : v;
}

void apply() {
  analogWrite(LED_PIN, ledOn ? pwmFor(level) : 0);
}

void setup() {
  Serial.begin(9600);
  pinMode(ENC_CLK_PIN, INPUT);       // KY-040 has its own pull-ups on CLK and DT
  pinMode(ENC_DT_PIN, INPUT);
  pinMode(ENC_SW_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  lastAB = (digitalRead(ENC_CLK_PIN) << 1) | digitalRead(ENC_DT_PIN);
  attachInterrupt(digitalPinToInterrupt(ENC_CLK_PIN), onEncoder, CHANGE);
  attachInterrupt(digitalPinToInterrupt(ENC_DT_PIN), onEncoder, CHANGE);
  apply();
  Serial.print("Encoder dimmer ready: ");
  Serial.print(level);
  Serial.println("%");
}

void loop() {
  // turn: 4 quarter steps = one click
  noInterrupts();
  int clicks = quarterSteps / 4;
  quarterSteps -= clicks * 4;
  interrupts();

  if (clicks != 0 && ledOn) {
    if (REVERSE) clicks = -clicks;
    level = constrain(level + clicks * PCT_PER_CLICK, 0, 100);
    apply();
    Serial.print("brightness ");
    Serial.print(level);
    Serial.print("% pwm=");
    Serial.println(pwmFor(level));
  }

  // push: toggle on/off, 30 ms debounce
  bool sw = digitalRead(ENC_SW_PIN);
  if (sw != lastSw && millis() - lastSwEdge > 30) {
    lastSwEdge = millis();
    lastSw = sw;
    if (sw == LOW) {
      ledOn = !ledOn;
      apply();
      if (ledOn) {
        Serial.print("LED on: ");
        Serial.print(level);
        Serial.print("% pwm=");
        Serial.println(pwmFor(level));
      } else {
        Serial.println("LED off");
      }
    }
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "One click changes 10 %, or it takes two clicks to change 5 %", ru: "Один щелчок меняет на 10 %, или нужно два щелчка на 5 %", kk: "Бір шырт 10 %-ға өзгертеді немесе 5 % үшін екі шырт керек" },
      cause: { en: "Your encoder has a different number of quarter steps per detent than the usual 4.", ru: "У вашего энкодера другое число четвертьшагов на щелчок, не обычные 4.", kk: "Энкодеріңізде бір шыртқа келетін ширек қадам саны әдеттегі 4 емес." },
      fix: { en: "Change both 4s in loop() to 2 (or 8) until one click = one step.", ru: "Замените обе четвёрки в loop() на 2 (или 8), пока один щелчок не станет одним шагом.", kk: "loop() ішіндегі екі 4-ті де бір шырт бір қадам болғанша 2-ге (немесе 8-ге) ауыстырыңыз." },
    },
    {
      symptom: { en: "Turning clockwise makes the LED dimmer", ru: "Поворот по часовой делает светодиод тусклее", kk: "Сағат тілімен бұрағанда жарық диоды күңгірттенеді" },
      cause: { en: "CLK and DT phases are the other way round on this module.", ru: "Фазы CLK и DT на этом модуле идут в обратном порядке.", kk: "Бұл модульде CLK мен DT фазалары кері ретпен жүреді." },
      fix: { en: "Set REVERSE = true in the sketch; no rewiring needed.", ru: "Поставьте REVERSE = true в скетче; перепаивать ничего не нужно.", kk: "Скетчте REVERSE = true қойыңыз; ештеңені қайта қосудың қажеті жоқ." },
    },
    {
      symptom: { en: "The value jumps randomly or counts backwards sometimes", ru: "Значение прыгает или иногда считает назад", kk: "Мән секіреді немесе кейде кері санайды" },
      cause: { en: "Loose CLK/DT wires or a module without pull-ups.", ru: "Плохой контакт проводов CLK/DT или модуль без подтяжек.", kk: "CLK/DT сымдарының байланысы нашар немесе тартуы жоқ модуль." },
      fix: { en: "Push the wires in firmly; if your board has no resistors near CLK/DT, change their pinMode to INPUT_PULLUP.", ru: "Плотно вставьте провода; если на плате нет резисторов возле CLK/DT, поменяйте их pinMode на INPUT_PULLUP.", kk: "Сымдарды мықтап енгізіңіз; платада CLK/DT жанында резисторлар болмаса, олардың pinMode-ын INPUT_PULLUP-қа ауыстырыңыз." },
    },
  ],
  safety: [
    { en: "Keep the 220 Ω resistor in series with the LED; without it the pin and the LED are overloaded.", ru: "Не убирайте резистор 220 Ом последовательно со светодиодом; без него пин и светодиод перегружаются.", kk: "Жарық диодымен тізбектей тұрған 220 Ом резисторды алмаңыз; онсыз пин мен жарық диоды шамадан тыс жүктеледі." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "Encoder dimmer ready: 50%",
      "brightness 55% pwm=68",
      "brightness 60% pwm=83",
      "brightness 70% pwm=116",
      "LED off",
      "LED on: 70% pwm=116",
      "brightness 65% pwm=99",
      "brightness 100% pwm=255",
      "brightness 40% pwm=34",
    ],
    leds: [{ label: "LED", color: "#FFF3C4" }],
  },
} satisfies GuideContent;
