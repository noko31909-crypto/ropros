import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "automatic-night-light",
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
    en: "Automatic Night Light",
    ru: "Автоматический ночник",
    kk: "Автоматты түнгі шам",
  },
  summary: {
    en: "A photoresistor watches the room: as daylight fades, three warm LEDs glide up to full brightness with PWM, and they glide back off at dawn.",
    ru: "Фоторезистор следит за освещением: когда темнеет, три тёплых светодиода плавно разгораются через ШИМ, а на рассвете так же плавно гаснут.",
    kk: "Фоторезистор бөлмедегі жарықты бақылайды: қараңғы түскенде үш жылы жарық диоды ЕИМ арқылы біртіндеп жанады, ал таң атқанда солай біртіндеп сөнеді.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V logic, USB powered", ru: "ATmega328P, логика 5 В, питание от USB", kk: "ATmega328P, 5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "ldr", qty: 1, spec: { en: "GL5528 (10–20 kΩ at room light)", ru: "GL5528 (10–20 кОм при комнатном свете)", kk: "GL5528 (бөлме жарығында 10–20 кОм)" }, role: { en: "Light sensor", ru: "Датчик освещённости", kk: "Жарық датчигі" } },
    { component: "resistor", qty: 1, spec: { en: "10 kΩ, ¼ W", ru: "10 кОм, ¼ Вт", kk: "10 кОм, ¼ Вт" }, role: { en: "Lower half of the light divider", ru: "Нижнее плечо делителя", kk: "Бөлгіштің төменгі иіні" } },
    { component: "led", qty: 3, spec: { en: "5 mm warm white", ru: "5 мм тёплый белый", kk: "5 мм жылы ақ" }, role: { en: "Night light", ru: "Свет ночника", kk: "Түнгі жарық" } },
    { component: "resistor", qty: 3, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиодов", kk: "Жарық диодтарының тогын шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ldr", component: "ldr", label: "LDR" },
    { id: "r_div", component: "resistor", label: "10 kΩ" },
    { id: "r1", component: "resistor", label: "220 Ω" },
    { id: "r2", component: "resistor", label: "220 Ω" },
    { id: "r3", component: "resistor", label: "220 Ω" },
    { id: "led1", component: "led", label: "Warm 1" },
    { id: "led2", component: "led", label: "Warm 2" },
    { id: "led3", component: "led", label: "Warm 3" },
  ],
  connections: [
    { from: "ldr.A", to: "board.5V", color: "red" },
    { from: "ldr.B", to: "board.A0", color: "yellow", note: { en: "divider midpoint", ru: "средняя точка делителя", kk: "бөлгіштің ортаңғы нүктесі" } },
    { from: "r_div.A", to: "board.A0", color: "yellow" },
    { from: "r_div.B", to: "board.GND", color: "black" },
    { from: "board.D3", to: "r1.A", color: "orange" },
    { from: "r1.B", to: "led1.A", color: "orange", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led1.K", to: "board.GND2", color: "black" },
    { from: "board.D5", to: "r2.A", color: "orange" },
    { from: "r2.B", to: "led2.A", color: "orange" },
    { from: "led2.K", to: "board.GND2", color: "black" },
    { from: "board.D6", to: "r3.A", color: "orange" },
    { from: "r3.B", to: "led3.A", color: "orange" },
    { from: "led3.K", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Build the light divider", ru: "Соберите делитель освещённости", kk: "Жарық бөлгішін жинаңыз" },
      body: {
        en: "Put the Nano across the centre gap. Connect one leg of the LDR to 5V and the other to a free row. From that row run a wire to A0 and a 10 kΩ resistor to GND. Bright light lowers the LDR's resistance, so A0 rises towards 5 V; in the dark the LDR climbs towards 1 MΩ and A0 drops close to 0 V.",
        ru: "Поставьте Nano поперёк центральной канавки. Одну ножку фоторезистора подключите к 5V, другую в свободный ряд. Из этого ряда проведите провод к A0 и резистор 10 кОм к GND. На ярком свету сопротивление фоторезистора падает и A0 поднимается к 5 В; в темноте оно растёт почти до 1 МОм, и A0 опускается почти до 0 В.",
        kk: "Nano-ны ортаңғы ойыққа көлденең қойыңыз. Фоторезистордың бір аяғын 5V-ке, екіншісін бос қатарға қосыңыз. Сол қатардан A0-ге сым және GND-ге 10 кОм резистор тартыңыз. Жарық жерде фоторезистордың кедергісі азаяды да, A0 5 В-қа қарай көтеріледі; қараңғыда кедергі 1 МОм-ға жуықтап, A0 0 В-қа жақындайды.",
      },
      expect: { en: "5V → LDR → A0 → 10 kΩ → GND.", ru: "5V → фоторезистор → A0 → 10 кОм → GND.", kk: "5V → фоторезистор → A0 → 10 кОм → GND." },
      mistake: { en: "Without the 10 kΩ resistor A0 just sits near 5 V and never changes.", ru: "Без резистора 10 кОм A0 просто висит около 5 В и не меняется.", kk: "10 кОм резисторсыз A0 жай ғана 5 В маңында тұрады да, өзгермейді." },
    },
    {
      title: { en: "Wire three LEDs to PWM pins", ru: "Подключите три светодиода к ШИМ-пинам", kk: "Үш жарық диодын ЕИМ пиндеріне қосыңыз" },
      body: {
        en: "Each LED gets its own pin and its own 220 Ω resistor: D3 → resistor → LED 1, D5 → resistor → LED 2, D6 → resistor → LED 3, all cathodes to GND. All three are PWM pins, which is what lets analogWrite() dim them smoothly. A white LED drops about 3 V, so each draws (5 − 3) / 220 ≈ 9 mA.",
        ru: "У каждого светодиода свой пин и свой резистор 220 Ом: D3 → резистор → светодиод 1, D5 → резистор → светодиод 2, D6 → резистор → светодиод 3, все катоды на GND. Все три пина с ШИМ, именно это позволяет analogWrite() плавно менять яркость. На белом светодиоде падает около 3 В, поэтому каждый берёт (5 − 3) / 220 ≈ 9 мА.",
        kk: "Әр жарық диодының өз пині және өз 220 Ом резисторы бар: D3 → резистор → 1-жарық диоды, D5 → резистор → 2-жарық диоды, D6 → резистор → 3-жарық диоды, барлық катодтар GND-ге. Үш пиннің бәрі ЕИМ пиндері, analogWrite() жарықтықты біркелкі өзгерте алатыны сондықтан. Ақ жарық диодында шамамен 3 В түседі, сондықтан әрқайсысы (5 − 3) / 220 ≈ 9 мА алады.",
      },
      expect: { en: "Three LED branches on D3, D5 and D6.", ru: "Три ветки светодиодов на D3, D5 и D6.", kk: "D3, D5 және D6-да үш жарық диоды тармағы." },
      mistake: { en: "D4 or D7 have no PWM: an LED there only snaps on and off.", ru: "У D4 и D7 нет ШИМ: светодиод там будет только резко включаться и выключаться.", kk: "D4 пен D7-де ЕИМ жоқ: ондағы жарық диоды тек кенет жанып-сөнеді." },
    },
    {
      title: { en: "Upload and read the light level", ru: "Загрузите скетч и посмотрите уровень света", kk: "Скетчті жүктеп, жарық деңгейін қараңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. Once a second it prints the smoothed light reading (0…1023) and the LED brightness (0…255). Cover the LDR with your hand: the reading falls, and the LEDs fade up one PWM step every 12 ms, about 3 seconds from off to full.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Раз в секунду он печатает сглаженный уровень света (0…1023) и яркость светодиодов (0…255). Накройте фоторезистор ладонью: показание падает, и светодиоды разгораются на одну ступень ШИМ каждые 12 мс, примерно 3 секунды от нуля до максимума.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Ол секундына бір рет тегістелген жарық деңгейін (0…1023) және жарық диодтарының жарықтығын (0…255) шығарады. Фоторезисторды алақаныңызбен жабыңыз: көрсеткіш төмендеп, жарық диодтары әр 12 мс сайын бір ЕИМ қадамына жанады, сөнгеннен толық жарыққа дейін шамамен 3 секунд.",
      },
      expect: { en: "\"light\" drops when covered and \"led\" climbs smoothly to 255.", ru: "«light» падает при закрытии, а «led» плавно растёт до 255.", kk: "Жапқанда «light» төмендейді, ал «led» біркелкі 255-ке дейін өседі." },
      mistake: { en: "Reading the LDR once and jumping straight to the target makes the light flicker as people walk past.", ru: "Если читать фоторезистор один раз и сразу прыгать к цели, свет будет мигать, когда мимо проходят люди.", kk: "Фоторезисторды бір рет оқып, бірден мақсатқа секірсеңіз, адамдар жанынан өткенде жарық жыпылықтайды." },
    },
    {
      title: { en: "Calibrate dark and bright", ru: "Откалибруйте «темно» и «светло»", kk: "«Қараңғы» мен «жарықты» калибрлеңіз" },
      body: {
        en: "Note the \"light\" value in your room at dusk and with the lamp on. Set DARK_LEVEL a bit below the dusk value (full brightness at or below it) and BRIGHT_LEVEL a bit below normal room light (off at or above it). Between the two the brightness scales linearly, so the light builds up gradually as evening comes.",
        ru: "Запишите значение «light» в вашей комнате в сумерках и при включённой лампе. Поставьте DARK_LEVEL чуть ниже сумеречного значения (на нём и ниже полная яркость), а BRIGHT_LEVEL чуть ниже обычного комнатного света (на нём и выше выключено). Между ними яркость меняется линейно, поэтому свет нарастает постепенно, по мере того как наступает вечер.",
        kk: "Бөлмеңіздегі «light» мәнін ымыртта және шам жанып тұрғанда жазып алыңыз. DARK_LEVEL мәнін ымырт мәнінен сәл төмен қойыңыз (сол мәнде және одан төмен толық жарық), ал BRIGHT_LEVEL мәнін қалыпты бөлме жарығынан сәл төмен қойыңыз (сол мәнде және одан жоғары өшік). Олардың арасында жарықтық сызықты өзгереді, сондықтан кеш түскен сайын жарық біртіндеп күшейеді.",
      },
      expect: { en: "Lights off in the daytime, fully on at night, a soft ramp in between.", ru: "Днём выключено, ночью полностью включено, между ними мягкий переход.", kk: "Күндіз өшік, түнде толық жанады, арасында жұмсақ ауысу." },
      mistake: { en: "LEDs pointing at the LDR light it up, so the lamp dims itself and pulses; aim them away or put the LDR behind a little shade.", ru: "Если светодиоды светят на фоторезистор, лампа сама себя гасит и пульсирует; разверните их или прикройте фоторезистор козырьком.", kk: "Жарық диодтары фоторезисторға қараса, шам өзін-өзі сөндіріп, дірілдей бастайды; оларды басқа жаққа бұрыңыз немесе фоторезисторды қалқамен жабыңыз." },
    },
  ],
  code: [{
    filename: "night_light.ino",
    language: "cpp",
    libraries: [],
    source: `// Automatic night light: the darker the room, the brighter the LEDs, with smooth fades.
const int LDR_PIN = A0;                 // 5V -> LDR -> A0 -> 10k -> GND: bright = high reading
const int LED_PINS[] = {3, 5, 6};       // PWM pins
const int DARK_LEVEL = 250;             // reading at or below: full brightness
const int BRIGHT_LEVEL = 600;           // reading at or above: off

int light = 0;                          // smoothed light reading 0..1023
int level = 0;                          // current LED PWM 0..255
unsigned long lastTick = 0;
unsigned long lastPrint = 0;

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 3; i++) pinMode(LED_PINS[i], OUTPUT);
  light = analogRead(LDR_PIN);
}

void loop() {
  if (millis() - lastTick >= 12) {
    lastTick = millis();
    light = (light * 7 + analogRead(LDR_PIN)) / 8;            // ignore quick shadows
    int target = map(constrain(light, DARK_LEVEL, BRIGHT_LEVEL), DARK_LEVEL, BRIGHT_LEVEL, 255, 0);
    if (level < target) level++;                              // one PWM step per tick = smooth fade
    else if (level > target) level--;
    for (int i = 0; i < 3; i++) analogWrite(LED_PINS[i], level);
  }

  if (millis() - lastPrint >= 1000) {
    lastPrint = millis();
    Serial.print("light: ");
    Serial.print(light);
    Serial.print("  led: ");
    Serial.println(level);
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The LEDs are always fully on", ru: "Светодиоды всегда горят на полную", kk: "Жарық диодтары әрқашан толық жанады" },
      cause: { en: "The LDR and the 10 kΩ resistor are swapped (reading falls with light), or the room is darker than DARK_LEVEL.", ru: "Фоторезистор и резистор 10 кОм поменяны местами (показание падает на свету), или в комнате темнее, чем DARK_LEVEL.", kk: "Фоторезистор мен 10 кОм резистор орын ауыстырған (жарықта көрсеткіш төмендейді) немесе бөлме DARK_LEVEL-ден қараңғырақ." },
      fix: { en: "Shine a phone torch on the LDR: \"light\" must go up. If it goes down, swap the two parts; otherwise lower DARK_LEVEL and BRIGHT_LEVEL.", ru: "Посветите на фоторезистор фонариком телефона: «light» должен расти. Если падает, поменяйте детали местами; иначе уменьшите DARK_LEVEL и BRIGHT_LEVEL.", kk: "Фоторезисторға телефон шамымен жарық түсіріңіз: «light» өсуі керек. Төмендесе, екі бөлшекті ауыстырыңыз; әйтпесе DARK_LEVEL мен BRIGHT_LEVEL мәндерін азайтыңыз." },
    },
    {
      symptom: { en: "The light slowly pulses at night", ru: "Ночью свет медленно пульсирует", kk: "Түнде жарық баяу дірілдейді" },
      cause: { en: "The LEDs shine on the LDR, so turning on makes the sensor think it is day.", ru: "Светодиоды светят на фоторезистор, и включение заставляет датчик думать, что наступил день.", kk: "Жарық диодтары фоторезисторға түседі де, жанған кезде датчик күн шыққан деп ойлайды." },
      fix: { en: "Point the LEDs away, put a paper tube over the LDR or move it to the outside of the enclosure.", ru: "Разверните светодиоды, наденьте на фоторезистор бумажную трубочку или вынесите его наружу корпуса.", kk: "Жарық диодтарын басқа жаққа бұрыңыз, фоторезисторға қағаз түтік кигізіңіз немесе оны корпустың сыртына шығарыңыз." },
    },
    {
      symptom: { en: "One LED never changes brightness, it is just on or off", ru: "Один светодиод не меняет яркость, только вкл/выкл", kk: "Бір жарық диоды жарықтығын өзгертпейді, тек жанады не сөнеді" },
      cause: { en: "It is wired to a pin without PWM.", ru: "Он подключён к пину без ШИМ.", kk: "Ол ЕИМ жоқ пинге қосылған." },
      fix: { en: "Use D3, D5 or D6 exactly as in LED_PINS.", ru: "Используйте ровно D3, D5 и D6, как в LED_PINS.", kk: "LED_PINS-тегідей дәл D3, D5 және D6 пиндерін қолданыңыз." },
    },
  ],
  safety: [
    { en: "For a permanent lamp, power the Nano from a USB phone charger, not from anything mains-wired you build yourself.", ru: "Для постоянного ночника питайте Nano от USB-зарядки телефона, а не от самодельного сетевого блока.", kk: "Тұрақты шам үшін Nano-ны телефонның USB зарядтағышынан қоректендіріңіз, өзіңіз жинаған желілік блоктан емес." },
  ],
  simulation: {
    baud: 9600,
    lines: ["light: 712  led: 0", "light: 705  led: 0", "light: 488  led: 39", "light: 402  led: 83", "light: 341  led: 127", "light: 214  led: 210", "light: 198  led: 255", "light: 201  led: 255"],
    leds: [{ label: "Warm 1", color: "#FFE0B2" }, { label: "Warm 2", color: "#FFE0B2" }, { label: "Warm 3", color: "#FFE0B2" }],
  },
} satisfies GuideContent;
