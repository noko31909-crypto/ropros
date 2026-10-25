import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "led-strip-effects",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "displays",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 18,
  xpReward: 140,
  title: {
    en: "LED Strip Effects with FastLED",
    ru: "Эффекты для светодиодной ленты на FastLED",
    kk: "FastLED арқылы жарық диодты таспа эффектілері",
  },
  summary: {
    en: "Thirty WS2812B LEDs on their own 5 V supply run five animations: rainbow, comet, twinkle, fire and breathe. One button cycles through them, and FastLED keeps the current under the supply's limit.",
    ru: "Тридцать светодиодов WS2812B на собственном питании 5 В показывают пять анимаций: радуга, комета, мерцание, огонь и дыхание. Одна кнопка переключает их, а FastLED не даёт току превысить возможности блока питания.",
    kk: "Жеке 5 В қуат көзіндегі отыз WS2812B жарық диоды бес анимация көрсетеді: кемпірқосақ, комета, жыпылықтау, от және тыныс. Бір батырма оларды ауыстырады, ал FastLED токты қуат блогының шегінен асырмайды.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, powered from the computer USB", ru: "логика 5 В, питание от USB компьютера", kk: "5 В логика, компьютердің USB-інен қуат" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "ws2812b-strip", qty: 1, spec: { en: "30 LEDs, 5 V, 60 mA per LED at full white", ru: "30 светодиодов, 5 В, до 60 мА на светодиод при белом", kk: "30 жарық диоды, 5 В, ақ түсте әрқайсысы 60 мА-ге дейін" }, role: { en: "Light", ru: "Свет", kk: "Жарық" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V, at least 1 A (2 A for full white), with a cut USB cable or DC adapter", ru: "5 В, минимум 1 А (2 А для полного белого), с разрезанным USB-кабелем или DC-переходником", kk: "5 В, кемінде 1 А (толық ақ үшін 2 А), кесілген USB кабелімен немесе DC адаптермен" }, role: { en: "Separate supply for the strip", ru: "Отдельное питание ленты", kk: "Таспаның жеке қуаты" } },
    { component: "resistor", qty: 1, spec: { en: "330 Ω, ¼ W", ru: "330 Ом, ¼ Вт", kk: "330 Ом, ¼ Вт" }, role: { en: "Data line series resistor", ru: "Резистор в линии данных", kk: "Деректер сызығындағы резистор" } },
    { component: "capacitor", qty: 1, spec: { en: "1000 µF, 6.3 V or higher, electrolytic", ru: "1000 мкФ, от 6,3 В, электролитический", kk: "1000 мкФ, 6,3 В-тан жоғары, электролиттік" }, role: { en: "Smooths the strip supply", ru: "Сглаживает питание ленты", kk: "Таспа қуатын тегістейді" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Next effect", ru: "Следующий эффект", kk: "Келесі эффект" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male; 22 AWG wire for the strip power", ru: "папа-папа; провод 22 AWG для питания ленты", kk: "аталық-аталық; таспа қуаты үшін 22 AWG сым" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "psu", component: "usb-5v", label: "5 V supply" },
    { id: "strip", component: "ws2812b-strip", label: "WS2812B × 30" },
    { id: "c_bulk", component: "capacitor", label: "1000 µF" },
    { id: "r_data", component: "resistor", label: "330 Ω" },
    { id: "btn", component: "push-button", label: "Next effect" },
  ],
  connections: [
    { from: "psu.5V", to: "strip.5V", color: "red", note: { en: "strip power comes from the supply, not the Arduino", ru: "лента питается от блока, а не от Arduino", kk: "таспа Arduino-дан емес, қуат блогынан қоректенеді" } },
    { from: "psu.GND", to: "strip.GND", color: "black" },
    { from: "c_bulk.A", to: "strip.5V", color: "red", note: { en: "+ leg (the long one) to 5V", ru: "ножка + (длинная) к 5V", kk: "+ аяғы (ұзыны) 5V-ке" } },
    { from: "c_bulk.B", to: "strip.GND", color: "black", note: { en: "striped − leg to GND", ru: "ножка − (с полосой) к GND", kk: "жолақты − аяғы GND-ге" } },
    { from: "strip.GND", to: "board.GND", color: "black", note: { en: "common ground: the data signal needs it", ru: "общая земля: без неё сигнал данных не работает", kk: "ортақ жер: онсыз деректер сигналы жұмыс істемейді" } },
    { from: "board.D6", to: "r_data.A", color: "green" },
    { from: "r_data.B", to: "strip.DIN", color: "green", note: { en: "place the resistor close to the strip", ru: "ставьте резистор ближе к ленте", kk: "резисторды таспаға жақын қойыңыз" } },
    { from: "board.D2", to: "btn.1", color: "blue", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажата = LOW", kk: "ішкі тарту, басылғанда LOW" } },
    { from: "btn.2", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Find the input end of the strip", ru: "Найдите вход ленты", kk: "Таспаның кіріс ұшын табыңыз" },
      body: {
        en: "WS2812B strips are directional: small arrows printed on the strip point away from the input. Work at the end where the arrows start and the pads read 5V, DIN and GND. If the strip came with a JST connector, the red wire is 5V, white or black is GND and green is DIN, but check against the printed labels.",
        ru: "Ленты WS2812B направленные: маленькие стрелки на ленте указывают от входа. Работайте с того конца, откуда стрелки начинаются, а площадки подписаны 5V, DIN и GND. Если на ленте есть разъём JST, красный провод обычно 5V, белый или чёрный GND, зелёный DIN, но сверьтесь с надписями.",
        kk: "WS2812B таспалары бағытты: таспадағы кішкентай көрсеткілер кірістен алысқа бағытталған. Көрсеткілер басталатын, ал алаңшалары 5V, DIN және GND деп жазылған ұшымен жұмыс істеңіз. Таспада JST қосқышы болса, әдетте қызыл сым 5V, ақ немесе қара GND, жасыл DIN болады, бірақ жазуларымен салыстырыңыз.",
      },
      expect: { en: "You know which end is DIN, and the arrows point away from it.", ru: "Вы знаете, где DIN, и стрелки указывают от него.", kk: "DIN қай жақта екенін білесіз, көрсеткілер одан алысқа бағытталған." },
      mistake: { en: "Feeding data into the DOUT end does nothing, and nothing lights up.", ru: "Если подать данные на конец DOUT, ничего не загорится.", kk: "Деректерді DOUT ұшына берсеңіз, ештеңе жанбайды." },
    },
    {
      title: { en: "Power the strip from its own supply", ru: "Запитайте ленту от отдельного блока", kk: "Таспаны жеке қуат көзінен қоректендіріңіз" },
      body: {
        en: "Connect the supply's 5V and GND to the strip's 5V and GND with thicker wire. Put the 1000 µF capacitor across the strip's 5V and GND, right at the input: long leg (+) to 5V, the leg next to the stripe (−) to GND. It absorbs the surge when the supply is plugged in and smooths current spikes. Then run a wire from the strip GND to the Arduino GND. Do not connect the supply's 5V to the Arduino: the Uno stays on its USB cable.",
        ru: "Подключите 5V и GND блока к 5V и GND ленты проводом потолще. Поставьте конденсатор 1000 мкФ между 5V и GND ленты прямо у входа: длинная ножка (+) к 5V, ножка у полосы (−) к GND. Он гасит бросок при включении блока и сглаживает скачки тока. Затем соедините GND ленты с GND Arduino. 5V блока к Arduino не подключайте: Uno остаётся на своём USB-кабеле.",
        kk: "Қуат блогының 5V және GND-ін таспаның 5V және GND-іне жуанырақ сыммен қосыңыз. 1000 мкФ конденсаторды таспаның 5V пен GND арасына дәл кірісте қойыңыз: ұзын аяғы (+) 5V-ке, жолақ жанындағы аяғы (−) GND-ге. Ол блокты қосқандағы секірісті сөндіріп, ток шыңдарын тегістейді. Содан кейін таспаның GND-ін Arduino GND-іне жалғаңыз. Блоктың 5V-ін Arduino-ға қоспаңыз: Uno өз USB кабелінде қалады.",
      },
      expect: { en: "Supply, capacitor and strip share the 5V and GND rails; only GND continues to the Arduino.", ru: "Блок, конденсатор и лента на общих шинах 5V и GND; к Arduino идёт только GND.", kk: "Блок, конденсатор және таспа ортақ 5V пен GND шиналарында; Arduino-ға тек GND барады." },
      mistake: { en: "Powering 30 LEDs from the Uno's 5V pin can pull up to 1.8 A through the board and its USB port.", ru: "Питание 30 светодиодов от пина 5V Uno может протащить через плату и её USB до 1,8 А.", kk: "30 жарық диодын Uno-ның 5V пинінен қоректендірсеңіз, плата мен оның USB-і арқылы 1,8 А-ге дейін ток өтуі мүмкін." },
    },
    {
      title: { en: "Connect the data line and the button", ru: "Подключите линию данных и кнопку", kk: "Деректер сызығы мен батырманы қосыңыз" },
      body: {
        en: "Wire D6 → 330 Ω → strip DIN, keeping the resistor near the strip. It damps ringing on the long data wire and protects the first LED. Place the button across the breadboard gap and wire one side to D2 and the other side to GND; the sketch uses the internal pull-up.",
        ru: "Подключите D6 → 330 Ом → DIN ленты, резистор держите ближе к ленте. Он гасит звон на длинном проводе данных и защищает первый светодиод. Поставьте кнопку поперёк канавки макетки, одну сторону подключите к D2, другую к GND; скетч использует внутреннюю подтяжку.",
        kk: "D6 → 330 Ом → таспа DIN тізбегін жалғаңыз, резисторды таспаға жақын ұстаңыз. Ол ұзын деректер сымындағы тербелісті сөндіріп, бірінші жарық диодын қорғайды. Батырманы макет тақтасының ойығына көлденең қойып, бір жағын D2-ге, екінші жағын GND-ге қосыңыз; скетч ішкі тартуды пайдаланады.",
      },
      expect: { en: "Only three wires reach the Arduino: data (via 330 Ω), GND and the button.", ru: "К Arduino идут только три провода: данные (через 330 Ом), GND и кнопка.", kk: "Arduino-ға тек үш сым барады: деректер (330 Ом арқылы), GND және батырма." },
      mistake: { en: "Without the shared GND wire the strip flickers random colours or stays dark.", ru: "Без общего провода GND лента мигает случайными цветами или не горит.", kk: "Ортақ GND сымы болмаса, таспа кездейсоқ түстермен жыпылықтайды немесе жанбайды." },
    },
    {
      title: { en: "Install FastLED and upload", ru: "Установите FastLED и загрузите скетч", kk: "FastLED орнатып, скетчті жүктеңіз" },
      body: {
        en: "Install FastLED from the Library Manager. Plug in the strip supply first, then upload the sketch over USB and open the Serial Monitor at 9600 baud. The rainbow starts at once. Each press of the button moves to the next effect: rainbow → comet → twinkle → fire → breathe → rainbow. MAX_MA = 900 caps the strip current for a 1 A supply; with a 2 A supply you may raise it to 1800.",
        ru: "Установите FastLED через менеджер библиотек. Сначала включите блок питания ленты, затем загрузите скетч по USB и откройте Serial Monitor на 9600 бод. Сразу запустится радуга. Каждое нажатие кнопки включает следующий эффект: радуга → комета → мерцание → огонь → дыхание → радуга. MAX_MA = 900 ограничивает ток ленты для блока на 1 А; с блоком на 2 А можно поднять до 1800.",
        kk: "Кітапханалар менеджерінен FastLED орнатыңыз. Алдымен таспаның қуат блогын қосып, содан кейін скетчті USB арқылы жүктеңіз де, Serial Monitor-ды 9600 бодта ашыңыз. Кемпірқосақ бірден басталады. Батырманы әр басқан сайын келесі эффект қосылады: кемпірқосақ → комета → жыпылықтау → от → тыныс → кемпірқосақ. MAX_MA = 900 1 А блок үшін таспа тогын шектейді; 2 А блокпен оны 1800-ге дейін көтеруге болады.",
      },
      expect: { en: "Smooth animations, and \"Effect: comet\" etc. in the Serial Monitor after each press.", ru: "Плавные анимации и «Effect: comet» и т. п. в Serial Monitor после каждого нажатия.", kk: "Біркелкі анимациялар және әр басудан кейін Serial Monitor-да «Effect: comet» т.б." },
      mistake: { en: "If the colours are wrong (red shows as green), the strip uses RGB order: change GRB to RGB in addLeds.", ru: "Если цвета не те (красный выглядит зелёным), у ленты порядок RGB: замените GRB на RGB в addLeds.", kk: "Түстер дұрыс болмаса (қызыл жасыл болып көрінсе), таспаның реті RGB: addLeds ішінде GRB-ны RGB-ге ауыстырыңыз." },
    },
  ],
  code: [{
    filename: "led_strip_effects.ino",
    language: "cpp",
    libraries: ["FastLED"],
    source: `#include <FastLED.h>

#define LED_PIN 6            // -> 330 Ohm -> strip DIN
#define NUM_LEDS 30
const int BUTTON_PIN = 2;    // to GND, internal pull-up
const int MAX_MA = 900;      // current budget of the strip supply (mA)
const uint8_t LEVEL = 160;   // global brightness 0..255

CRGB leds[NUM_LEDS];
const uint8_t EFFECT_COUNT = 5;
const char* const EFFECT_NAMES[EFFECT_COUNT] = {"rainbow", "comet", "twinkle", "fire", "breathe"};
uint8_t effect = 0;
uint8_t hue = 0;

bool lastButton = HIGH;
unsigned long lastChange = 0;

void rainbow() {
  fill_rainbow(leds, NUM_LEDS, hue++, 255 / NUM_LEDS);
}

void comet() {
  static int pos = 0;
  static int heading = 1;
  fadeToBlackBy(leds, NUM_LEDS, 50);
  leds[pos] = CHSV(hue, 255, 255);
  pos += heading;
  if (pos <= 0 || pos >= NUM_LEDS - 1) heading = -heading;   // bounce at the ends
  hue += 2;
}

void twinkle() {
  fadeToBlackBy(leds, NUM_LEDS, 20);
  if (random8() < 80) leds[random16(NUM_LEDS)] += CHSV(random8(), 180, 255);
}

void fire() {   // Fire2012 by Mark Kriegsman, shortened
  static uint8_t heat[NUM_LEDS];
  for (int i = 0; i < NUM_LEDS; i++) heat[i] = qsub8(heat[i], random8(0, (55 * 10) / NUM_LEDS + 2));
  for (int k = NUM_LEDS - 1; k >= 2; k--) heat[k] = (heat[k - 1] + heat[k - 2] + heat[k - 2]) / 3;
  if (random8() < 120) {
    int y = random8(7);
    heat[y] = qadd8(heat[y], random8(160, 255));
  }
  for (int j = 0; j < NUM_LEDS; j++) leds[j] = HeatColor(heat[j]);
}

void breathe() {
  uint8_t level = beatsin8(12, 20, 255);   // 12 breaths per minute
  fill_solid(leds, NUM_LEDS, CHSV(hue, 230, level));
  EVERY_N_MILLISECONDS(200) { hue++; }
}

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  delay(300);   // let the strip supply settle
  FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setMaxPowerInVoltsAndMilliamps(5, MAX_MA);
  FastLED.setBrightness(LEVEL);
  FastLED.clear(true);
  Serial.print(F("Effect: "));
  Serial.println(EFFECT_NAMES[effect]);
}

void loop() {
  bool now = digitalRead(BUTTON_PIN);
  if (now != lastButton && millis() - lastChange > 40) {
    lastChange = millis();
    lastButton = now;
    if (now == LOW) {
      effect = (effect + 1) % EFFECT_COUNT;
      FastLED.clear();
      Serial.print(F("Effect: "));
      Serial.println(EFFECT_NAMES[effect]);
    }
  }

  EVERY_N_MILLISECONDS(20) {   // 50 frames per second
    switch (effect) {
      case 0: rainbow(); break;
      case 1: comet(); break;
      case 2: twinkle(); break;
      case 3: fire(); break;
      default: breathe(); break;
    }
    FastLED.show();
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Nothing lights up", ru: "Ничего не светится", kk: "Ештеңе жанбайды" },
      cause: { en: "Data goes into the DOUT end, the strip has no power, or GND is not shared with the Arduino.", ru: "Данные идут на конец DOUT, на ленте нет питания, или GND не общий с Arduino.", kk: "Деректер DOUT ұшына барады, таспада қуат жоқ немесе GND Arduino-мен ортақ емес." },
      fix: { en: "Follow the arrows to the DIN end, measure 5 V across the strip pads, and add the GND wire to the Arduino.", ru: "Найдите по стрелкам конец DIN, измерьте 5 В на площадках ленты и добавьте провод GND к Arduino.", kk: "Көрсеткілер бойынша DIN ұшын тауып, таспа алаңшаларында 5 В-ты өлшеңіз де, Arduino-ға GND сымын қосыңыз." },
    },
    {
      symptom: { en: "The first LED works, the rest flicker or show wrong colours", ru: "Первый светодиод работает, остальные мерцают или горят не тем цветом", kk: "Бірінші жарық диоды жұмыс істейді, қалғандары жыпылықтайды немесе басқа түспен жанады" },
      cause: { en: "Noise on a long data wire, or the supply voltage sags at the far end.", ru: "Помехи на длинном проводе данных, или напряжение проседает в конце ленты.", kk: "Ұзын деректер сымындағы кедергі немесе таспаның соңында кернеудің төмендеуі." },
      fix: { en: "Keep the data wire under 30 cm with the 330 Ω at the strip, and lower MAX_MA or LEVEL.", ru: "Сделайте провод данных короче 30 см с резистором 330 Ом у ленты и уменьшите MAX_MA или LEVEL.", kk: "Деректер сымын 30 см-ден қысқа етіп, 330 Ом резисторды таспаның жанына қойыңыз және MAX_MA немесе LEVEL мәнін азайтыңыз." },
    },
    {
      symptom: { en: "The Arduino resets when the effect changes to bright white", ru: "Arduino перезагружается при ярком белом", kk: "Ашық ақ түске ауысқанда Arduino қайта жүктеледі" },
      cause: { en: "The strip is drawing current through the Arduino instead of its own supply.", ru: "Лента берёт ток через Arduino, а не от своего блока.", kk: "Таспа тогын өз блогынан емес, Arduino арқылы алады." },
      fix: { en: "Make sure the strip 5V goes only to the external supply and that MAX_MA matches it.", ru: "Убедитесь, что 5V ленты подключён только к внешнему блоку и MAX_MA соответствует ему.", kk: "Таспаның 5V-і тек сыртқы блокқа қосылғанын және MAX_MA оған сәйкес екенін тексеріңіз." },
    },
  ],
  safety: [
    { en: "The 1000 µF capacitor is polarised: + to 5V, the striped leg to GND. Reversed, it can bulge or burst.", ru: "Конденсатор 1000 мкФ полярный: + к 5V, ножка с полосой к GND. Если перепутать, он может вздуться или лопнуть.", kk: "1000 мкФ конденсатор полярлы: + 5V-ке, жолақты аяғы GND-ге. Кері қосылса, ол ісіп немесе жарылып кетуі мүмкін." },
    { en: "Use a supply rated for the strip current and keep MAX_MA at or below it; thin wires and connectors get hot above 2 A.", ru: "Используйте блок, рассчитанный на ток ленты, и держите MAX_MA не выше его; тонкие провода и разъёмы греются при токе выше 2 А.", kk: "Таспа тогына есептелген блокты пайдаланып, MAX_MA-ны одан асырмаңыз; 2 А-ден жоғары токта жіңішке сымдар мен қосқыштар қызады." },
  ],
  simulation: {
    baud: 9600,
    lines: ["Effect: rainbow", "Effect: comet", "Effect: twinkle", "Effect: fire", "Effect: breathe", "Effect: rainbow"],
    leds: [{ label: "LED 1", color: "#FF3D00" }, { label: "LED 2", color: "#FFEA00" }, { label: "LED 3", color: "#00E676" }, { label: "LED 4", color: "#2979FF" }],
  },
} satisfies GuideContent;
