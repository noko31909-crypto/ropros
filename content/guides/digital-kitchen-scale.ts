import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "digital-kitchen-scale",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "tools",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 16,
  xpReward: 240,
  title: {
    en: "Digital Kitchen Scale with HX711",
    ru: "Цифровые кухонные весы на HX711",
    kk: "HX711 негізіндегі цифрлық ас үй таразысы",
  },
  summary: {
    en: "A 5 kg load cell and an HX711 amplifier weigh to the gram on a 16×2 LCD, with a tare button and a one-command calibration that is saved in EEPROM.",
    ru: "Тензодатчик на 5 кг и усилитель HX711 взвешивают с точностью до грамма на LCD 16×2, есть кнопка тары и калибровка одной командой с сохранением в EEPROM.",
    kk: "5 кг тензодатчик пен HX711 күшейткіші 16×2 LCD экранында грамға дейінгі дәлдікпен өлшейді, тара батырмасы және EEPROM-ға сақталатын бір командалық калибрлеу бар.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "hx711-load-cell", qty: 1, spec: { en: "HX711 board + 5 kg bar load cell (4 wires)", ru: "плата HX711 + балочный тензодатчик 5 кг (4 провода)", kk: "HX711 платасы + 5 кг арқалықты тензодатчик (4 сым)" }, role: { en: "Measures the force on the platform", ru: "Измеряет силу на платформе", kk: "Платформаға түсетін күшті өлшейді" } },
    { component: "lcd-1602-i2c", qty: 1, spec: { en: "16×2 with PCF8574 backpack, address 0x27 or 0x3F", ru: "16×2 с платой PCF8574, адрес 0x27 или 0x3F", kk: "PCF8574 платасы бар 16×2, мекенжайы 0x27 не 0x3F" }, role: { en: "Shows the weight", ru: "Показывает вес", kk: "Салмақты көрсетеді" } },
    { component: "push-button", qty: 1, spec: { en: "12×12 mm tactile with cap", ru: "тактовая 12×12 мм с колпачком", kk: "қалпақшасы бар 12×12 мм тактілі" }, role: { en: "Tare (zero with the bowl on)", ru: "Тара (обнуление с миской)", kk: "Тара (ыдыспен бірге нөлдеу)" } },
    { component: "enclosure", qty: 1, spec: { en: "two rigid plates (base + platter, ~15×15 cm) with M4/M5 screws and spacers", ru: "две жёсткие пластины (основание + платформа, ~15×15 см), винты M4/M5 и проставки", kk: "екі қатты пластина (негіз + платформа, ~15×15 см), M4/M5 бұрандалар мен аралық төсемдер" }, role: { en: "Mechanical frame for the load cell", ru: "Механическая рама для тензодатчика", kk: "Тензодатчикке арналған механикалық рама" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 12, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "hx", component: "hx711-load-cell", label: "HX711" },
    { id: "lcd", component: "lcd-1602-i2c", label: "LCD 16×2" },
    { id: "btn", component: "push-button", label: "Tare" },
  ],
  connections: [
    { from: "board.5V", to: "hx.VCC", color: "red" },
    { from: "hx.GND", to: "board.GND", color: "black" },
    { from: "board.D2", to: "hx.DT", color: "green", note: { en: "data out of the HX711", ru: "данные от HX711", kk: "HX711-ден деректер" } },
    { from: "board.D3", to: "hx.SCK", color: "white", note: { en: "clock from the Uno", ru: "тактовый сигнал от Uno", kk: "Uno-дан такт сигналы" } },
    { from: "board.5V", to: "lcd.VCC", color: "red" },
    { from: "lcd.GND", to: "board.GND2", color: "black" },
    { from: "board.A4", to: "lcd.SDA", color: "blue" },
    { from: "board.A5", to: "lcd.SCL", color: "yellow" },
    { from: "board.D4", to: "btn.1", color: "orange", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажато = LOW", kk: "ішкі тарту, басылғанда = LOW" } },
    { from: "btn.2", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Mount the load cell", ru: "Закрепите тензодатчик", kk: "Тензодатчикті бекітіңіз" },
      body: {
        en: "A bar load cell only measures when it can bend. Screw one end to the base plate and the other end to the platter, with a spacer under each end so the middle of the bar floats free: a Z shape. The arrow on the cell points in the direction of the force, so it should point down. Never clamp or touch the middle section where the strain gauges sit.",
        ru: "Балочный тензодатчик измеряет, только когда может изгибаться. Прикрутите один конец к основанию, другой к платформе, с проставкой под каждым концом, чтобы середина балки висела свободно: получится буква Z. Стрелка на датчике показывает направление силы, она должна смотреть вниз. Никогда не зажимайте и не трогайте середину, где наклеены тензорезисторы.",
        kk: "Арқалықты тензодатчик тек иіле алғанда ғана өлшейді. Бір ұшын негізге, екінші ұшын платформаға бұраңыз, әр ұшының астына аралық төсем қойып, арқалықтың ортасын бос қалдырыңыз: Z пішіні шығады. Датчиктегі көрсеткі күштің бағытын көрсетеді, ол төмен қарауы керек. Тензорезисторлар жапсырылған ортаңғы бөлікті ешқашан қыспаңыз және ұстамаңыз.",
      },
      expect: { en: "Pressing the platter flexes the bar slightly; nothing else touches the base.", ru: "При нажатии на платформу балка слегка прогибается, больше ничего не касается основания.", kk: "Платформаны басқанда арқалық сәл иіледі, негізге басқа ештеңе тимейді." },
      mistake: { en: "Screwing both ends to the same plate: the cell cannot bend and always reads zero.", ru: "Если прикрутить оба конца к одной пластине, датчик не гнётся и всегда показывает ноль.", kk: "Екі ұшын бір пластинаға бұрасаңыз, датчик иілмейді және үнемі нөл көрсетеді." },
    },
    {
      title: { en: "Connect the load cell to the HX711", ru: "Подключите тензодатчик к HX711", kk: "Тензодатчикті HX711-ге қосыңыз" },
      body: {
        en: "Solder or screw the four cell wires to the HX711 inputs: red to E+, black to E−, white to A−, green to A+. E+/E− feed the bridge, A+/A− carry the tiny millivolt signal into the amplifier's channel A (gain 128). Keep these wires short and twisted together; leave B+/B− empty.",
        ru: "Припаяйте или прикрутите четыре провода датчика к входам HX711: красный к E+, чёрный к E−, белый к A−, зелёный к A+. E+/E− питают мост, а A+/A− несут крошечный сигнал в милливольтах на канал A усилителя (усиление 128). Держите эти провода короткими и скрученными; B+/B− оставьте пустыми.",
        kk: "Датчиктің төрт сымын HX711 кірістеріне дәнекерлеңіз не бұраңыз: қызылын E+-ке, қарасын E−-ке, ақын A−-ке, жасылын A+-ке. E+/E− көпірді қоректендіреді, ал A+/A− милливольттық өте әлсіз сигналды күшейткіштің A арнасына (күшейту 128) жеткізеді. Бұл сымдарды қысқа әрі бір-біріне оралған күйде ұстаңыз; B+/B− бос қалады.",
      },
      expect: { en: "Four cell wires on E+, E−, A−, A+.", ru: "Четыре провода датчика на E+, E−, A−, A+.", kk: "Датчиктің төрт сымы E+, E−, A−, A+ пиндерінде." },
      mistake: { en: "Some cells use other colours; if the weight later reads negative, just swap A+ and A−.", ru: "У некоторых датчиков другие цвета; если вес потом станет отрицательным, просто поменяйте A+ и A−.", kk: "Кейбір датчиктердің сым түстері басқаша; кейін салмақ теріс шықса, A+ пен A−-ті ауыстырыңыз." },
    },
    {
      title: { en: "Wire the HX711, LCD and button to the Uno", ru: "Подключите HX711, LCD и кнопку к Uno", kk: "HX711-ді, LCD-ні және батырманы Uno-ға қосыңыз" },
      body: {
        en: "HX711: VCC to 5V, GND to GND, DT to D2, SCK to D3 (a simple clocked serial link, not I²C). LCD backpack: VCC to 5V, GND to GND, SDA to A4, SCL to A5. Tare button: one leg to D4, the diagonally opposite leg to GND; the sketch turns on the internal pull-up.",
        ru: "HX711: VCC к 5V, GND к GND, DT к D2, SCK к D3 (это простой последовательный интерфейс с тактированием, не I²C). Плата LCD: VCC к 5V, GND к GND, SDA к A4, SCL к A5. Кнопка тары: одна ножка к D4, ножка по диагонали к GND; скетч включает внутреннюю подтяжку.",
        kk: "HX711: VCC-ті 5V-ке, GND-ні GND-ге, DT-ні D2-ге, SCK-ті D3-ке (бұл I²C емес, тактілі қарапайым тізбекті байланыс). LCD платасы: VCC-ті 5V-ке, GND-ні GND-ге, SDA-ны A4-ке, SCL-ді A5-ке. Тара батырмасы: бір аяғы D4-ке, диагональ бойынша қарсы аяғы GND-ге; скетч ішкі тартуды қосады.",
      },
      expect: { en: "The LCD backlight comes on as soon as the Uno is powered.", ru: "Подсветка LCD загорается сразу при подаче питания на Uno.", kk: "Uno-ға қуат берілгенде LCD жарығы бірден жанады." },
      mistake: { en: "Swapping DT and SCK: the sketch then reports \"HX711 not found\".", ru: "Если перепутать DT и SCK, скетч сообщит «HX711 not found».", kk: "DT мен SCK-ті ауыстырсаңыз, скетч «HX711 not found» деп хабарлайды." },
    },
    {
      title: { en: "Install the libraries and upload", ru: "Установите библиотеки и загрузите скетч", kk: "Кітапханаларды орнатып, скетчті жүктеңіз" },
      body: {
        en: "Install \"HX711 Arduino Library\" (Bogdan Necula) and \"LiquidCrystal I2C\" (Frank de Brabander). Upload, open the Serial Monitor at 9600 baud and set the line ending to \"Newline\". If the LCD shows only blocks or nothing, turn the blue contrast trimmer on the backpack; if it stays blank, change 0x27 to 0x3F in the sketch.",
        ru: "Установите «HX711 Arduino Library» (Bogdan Necula) и «LiquidCrystal I2C» (Frank de Brabander). Загрузите скетч, откройте Serial Monitor на 9600 бод и выберите окончание строки «Newline». Если на LCD одни прямоугольники или пусто, покрутите синий подстроечник контраста на плате; если пусто по-прежнему, замените в скетче 0x27 на 0x3F.",
        kk: "«HX711 Arduino Library» (Bogdan Necula) және «LiquidCrystal I2C» (Frank de Brabander) орнатыңыз. Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз және жол соңын «Newline» етіп қойыңыз. LCD-де тек тіктөртбұрыштар болса немесе бос болса, платадағы көк контраст реттегішін бұраңыз; бәрібір бос болса, скетчте 0x27-ні 0x3F-ке ауыстырыңыз.",
      },
      expect: { en: "\"Kitchen scale\" on line 1 and a number in grams on line 2.", ru: "«Kitchen scale» в первой строке и число в граммах во второй.", kk: "Бірінші жолда «Kitchen scale», екінші жолда граммен берілген сан." },
      mistake: { en: "Leaving the line ending on \"No line ending\" makes the calibration command wait forever.", ru: "Если оставить «No line ending», команда калибровки будет ждать бесконечно.", kk: "«No line ending» күйінде қалдырсаңыз, калибрлеу командасы шексіз күтеді." },
    },
    {
      title: { en: "Calibrate with a known weight", ru: "Откалибруйте известным грузом", kk: "Белгілі жүкпен калибрлеңіз" },
      body: {
        en: "Every cell is slightly different, so the sketch needs a calibration factor (counts per gram, roughly 400–450 for a 5 kg cell). Empty the platter, press Tare (or send t). Put an object of known mass on it, for example a 500 g bag of pasta or a 1 L water bottle (about 1000 g plus the bottle). Send c500 (your mass in grams). The sketch measures, computes the factor, prints it and saves it in EEPROM.",
        ru: "Все датчики немного разные, поэтому скетчу нужен калибровочный коэффициент (отсчётов на грамм, для датчика на 5 кг примерно 400–450). Освободите платформу и нажмите Tare (или отправьте t). Положите предмет известной массы, например пачку макарон 500 г или бутылку с 1 л воды (около 1000 г плюс бутылка). Отправьте c500 (ваша масса в граммах). Скетч измерит, посчитает коэффициент, выведет его и сохранит в EEPROM.",
        kk: "Әр датчик сәл өзгеше, сондықтан скетчке калибрлеу коэффициенті керек (бір грамға келетін санақ саны, 5 кг датчик үшін шамамен 400–450). Платформаны босатып, Tare батырмасын басыңыз (немесе t жіберіңіз). Массасы белгілі затты қойыңыз, мысалы, 500 г макарон қорабын немесе 1 л су құйылған бөтелкені (шамамен 1000 г және бөтелке салмағы). c500 жіберіңіз (массаңыз граммен). Скетч өлшеп, коэффициентті есептейді, шығарады және EEPROM-ға сақтайды.",
      },
      expect: { en: "\"Calibration factor = 4xx.xx\" and the LCD shows your reference mass ±1 g.", ru: "«Calibration factor = 4xx.xx», а LCD показывает массу эталона ±1 г.", kk: "«Calibration factor = 4xx.xx», ал LCD эталон массасын ±1 г дәлдікпен көрсетеді." },
      mistake: { en: "Calibrating without taring the empty platter first gives a factor that is off by the platter's weight.", ru: "Если не обнулить пустую платформу перед калибровкой, коэффициент собьётся на вес платформы.", kk: "Калибрлеу алдында бос платформаны нөлдемесеңіз, коэффициент платформа салмағына қателеседі." },
    },
    {
      title: { en: "Weigh with tare", ru: "Взвешивайте с тарой", kk: "Тарамен өлшеңіз" },
      body: {
        en: "Put a bowl on the platter and press Tare: the display returns to 0 g, so you see only what you add. Readings are smoothed and anything under 1 g around zero is shown as 0. After power-up the scale tares itself, so start it with the platter empty and let it warm up for a minute for the best stability.",
        ru: "Поставьте миску на платформу и нажмите Tare: дисплей вернётся к 0 г, и вы увидите только то, что добавляете. Показания сглаживаются, а всё, что меньше 1 г около нуля, отображается как 0. При включении весы сами обнуляются, поэтому включайте их с пустой платформой и дайте прогреться минуту для лучшей стабильности.",
        kk: "Платформаға ыдыс қойып, Tare басыңыз: дисплей 0 г-ға оралады, сонда тек қосқан затыңызды көресіз. Көрсеткіштер тегістеледі, ал нөл маңындағы 1 г-нан аз мән 0 болып көрсетіледі. Қосылғанда таразы өзін-өзі нөлдейді, сондықтан оны бос платформамен қосып, жақсы тұрақтылық үшін бір минут қызуына мүмкіндік беріңіз.",
      },
      expect: { en: "Bowl + Tare → 0 g; adding 200 g of flour shows about 200 g.", ru: "Миска + Tare → 0 г; 200 г муки показывают около 200 г.", kk: "Ыдыс + Tare → 0 г; 200 г ұн қосқанда шамамен 200 г көрсетеді." },
      mistake: { en: "Putting more than 5 kg on a 5 kg cell can bend it permanently.", ru: "Больше 5 кг на датчик 5 кг может необратимо его погнуть.", kk: "5 кг датчикке 5 кг-нан артық салмақ салсаңыз, ол біржола иіліп қалуы мүмкін." },
    },
  ],
  code: [{
    filename: "kitchen_scale.ino",
    language: "cpp",
    libraries: ["HX711 Arduino Library", "LiquidCrystal I2C"],
    source: `#include <Wire.h>
#include <EEPROM.h>
#include <HX711.h>
#include <LiquidCrystal_I2C.h>

const int DT_PIN = 2, SCK_PIN = 3;   // HX711
const int TARE_BTN = 4;              // button to GND, internal pull-up
// LCD on the I2C pins: SDA = A4, SCL = A5

const int CAL_ADDR = 0;              // EEPROM address of the saved factor
float calibrationFactor = 420.0;     // counts per gram; replaced by the saved value

HX711 scale;
LiquidCrystal_I2C lcd(0x27, 16, 2);  // try 0x3F if the screen stays blank

float grams = 0;
unsigned long lastShow = 0, lastPrint = 0;
bool lastButton = HIGH;
unsigned long buttonChanged = 0;

void showLine2(const char* text) {
  lcd.setCursor(0, 1);
  lcd.print(text);
  for (int i = strlen(text); i < 16; i++) lcd.print(' ');
}

void doTare() {
  showLine2("Tare...");
  scale.tare(20);
  grams = 0;
  Serial.println(F("Tare done"));
}

void calibrate(float knownGrams) {
  showLine2("Calibrating...");
  float counts = scale.get_value(20);  // average with the tare offset removed
  if (fabs(counts) < 1000) {
    Serial.println(F("Too little load. Tare empty, add the weight, try again."));
    return;
  }
  calibrationFactor = counts / knownGrams;
  scale.set_scale(calibrationFactor);
  EEPROM.put(CAL_ADDR, calibrationFactor);
  grams = knownGrams;
  Serial.print(F("Calibration factor = "));
  Serial.println(calibrationFactor, 2);
}

void handleSerial() {
  if (!Serial.available()) return;
  String cmd = Serial.readStringUntil('\\n');
  cmd.trim();
  if (cmd == "t") doTare();
  else if (cmd.startsWith("c")) {
    float known = cmd.substring(1).toFloat();
    if (known > 0) calibrate(known);
    else Serial.println(F("Usage: c500  (known mass in grams)"));
  } else if (cmd == "f") {
    Serial.print(F("Factor = "));
    Serial.println(calibrationFactor, 2);
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(TARE_BTN, INPUT_PULLUP);
  lcd.init();
  lcd.backlight();
  lcd.print(F("Kitchen scale"));

  float saved;
  EEPROM.get(CAL_ADDR, saved);           // a fresh EEPROM reads as NaN
  if (!isnan(saved) && fabs(saved) > 1 && fabs(saved) < 100000) {
    calibrationFactor = saved;
    Serial.println(F("Factor loaded from EEPROM"));
  }

  scale.begin(DT_PIN, SCK_PIN);
  if (!scale.wait_ready_timeout(1000)) {
    showLine2("HX711 not found");
    Serial.println(F("HX711 not found"));
    while (true) {}
  }
  scale.set_scale(calibrationFactor);
  doTare();
  Serial.println(F("Ready. t = tare, c<grams> = calibrate, f = show factor"));
}

void loop() {
  unsigned long now = millis();

  bool button = digitalRead(TARE_BTN);
  if (button != lastButton && now - buttonChanged > 50) {
    buttonChanged = now;
    lastButton = button;
    if (button == LOW) doTare();
  }
  handleSerial();

  if (scale.is_ready()) {
    float g = scale.get_units(1);
    if (fabs(g - grams) > 5) grams = g;  // a new load: jump straight to it
    else grams += 0.3 * (g - grams);     // small changes: smooth the noise
  }

  if (now - lastShow >= 250) {
    lastShow = now;
    long shown = lround(grams);
    if (fabs(grams) < 1.0) shown = 0;      // hide noise around zero
    char line[17];
    snprintf(line, sizeof(line), "%8ld g", shown);
    showLine2(line);
  }
  if (now - lastPrint >= 1000) {
    lastPrint = now;
    Serial.print(F("Weight: "));
    Serial.print(grams, 1);
    Serial.println(F(" g"));
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The weight is negative when you add a load", ru: "При нагрузке вес становится отрицательным", kk: "Жүк қосқанда салмақ теріс болады" },
      cause: { en: "A+ and A− are swapped, or the cell is mounted with its arrow pointing up.", ru: "A+ и A− перепутаны, или датчик стоит стрелкой вверх.", kk: "A+ пен A− ауысқан немесе датчик көрсеткісі жоғары қаратылып орнатылған." },
      fix: { en: "Swap the white and green wires (or flip the cell), then tare and calibrate again.", ru: "Поменяйте местами белый и зелёный провода (или переверните датчик), затем снова обнулите и откалибруйте.", kk: "Ақ пен жасыл сымдарды ауыстырыңыз (немесе датчикті аударыңыз), содан кейін қайта нөлдеп, калибрлеңіз." },
    },
    {
      symptom: { en: "The reading creeps up or down by several grams", ru: "Показания уползают на несколько граммов", kk: "Көрсеткіш бірнеше грамға баяу жылжиды" },
      cause: { en: "The HX711 and the cell are still warming up, a draught cools the cell, or the platter rubs against the base or a cable.", ru: "HX711 и датчик ещё прогреваются, датчик обдувает сквозняком, или платформа задевает основание либо кабель.", kk: "HX711 мен датчик әлі қызып жатыр, датчикті жел үрлейді немесе платформа негізге не кабельге тиіп тұр." },
      fix: { en: "Wait a minute after power-up, keep the build out of draughts, and make sure only the cell connects the platter to the base.", ru: "Подождите минуту после включения, уберите конструкцию от сквозняка и убедитесь, что платформу с основанием соединяет только датчик.", kk: "Қосқаннан кейін бір минут күтіңіз, құрылғыны желден аулақ ұстаңыз және платформа мен негізді тек датчик байланыстыратынына көз жеткізіңіз." },
    },
    {
      symptom: { en: "\"HX711 not found\" on the LCD", ru: "«HX711 not found» на LCD", kk: "LCD-де «HX711 not found»" },
      cause: { en: "DT and SCK are swapped, the module has no power, or a jumper is loose.", ru: "DT и SCK перепутаны, на модуль не приходит питание, или провод отошёл.", kk: "DT пен SCK ауысқан, модульге қуат келмейді немесе сым шығып кеткен." },
      fix: { en: "DT goes to D2, SCK to D3. Measure 5 V between VCC and GND on the HX711 board.", ru: "DT на D2, SCK на D3. Измерьте 5 В между VCC и GND на плате HX711.", kk: "DT D2-ге, SCK D3-ке. HX711 платасындағы VCC мен GND арасында 5 В бар-жоғын өлшеңіз." },
    },
    {
      symptom: { en: "The LCD is lit but shows nothing or only blocks", ru: "LCD светится, но пустой или показывает прямоугольники", kk: "LCD жанып тұр, бірақ бос немесе тек тіктөртбұрыштар көрінеді" },
      cause: { en: "Contrast is set wrong, or the backpack uses address 0x3F instead of 0x27.", ru: "Неверно выставлен контраст, или у платы адрес 0x3F вместо 0x27.", kk: "Контраст дұрыс қойылмаған немесе платаның мекенжайы 0x27 емес, 0x3F." },
      fix: { en: "Turn the blue trimmer on the back slowly until text appears; if still blank, change 0x27 to 0x3F and upload again.", ru: "Медленно крутите синий подстроечник сзади, пока не появится текст; если пусто, замените 0x27 на 0x3F и загрузите снова.", kk: "Мәтін пайда болғанша артындағы көк реттегішті ақырын бұраңыз; әлі бос болса, 0x27-ні 0x3F-ке ауыстырып, қайта жүктеңіз." },
    },
  ],
  safety: [
    { en: "Do not exceed the load cell's rated capacity (5 kg); overloading bends the bar permanently and ruins the calibration.", ru: "Не превышайте номинальную нагрузку датчика (5 кг): перегрузка необратимо гнёт балку и портит калибровку.", kk: "Датчиктің номиналды жүктемесінен (5 кг) асырмаңыз: артық жүктеме арқалықты біржола иіп, калибрлеуді бұзады." },
    { en: "Keep liquids away from the electronics; put food in a bowl, never directly on a platter above the board.", ru: "Держите жидкости подальше от электроники; кладите продукты в миску, а не прямо на платформу над платой.", kk: "Сұйықтықтарды электроникадан аулақ ұстаңыз; тағамды тікелей платаның үстіндегі платформаға емес, ыдысқа салыңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "Factor loaded from EEPROM",
      "Tare done",
      "Ready. t = tare, c<grams> = calibrate, f = show factor",
      "Weight: 0.0 g",
      "Weight: 0.2 g",
      "Weight: 499.6 g",
      "Calibration factor = 421.37",
      "Weight: 500.0 g",
      "Tare done",
      "Weight: 0.0 g",
    ],
    leds: [],
  },
} satisfies GuideContent;
