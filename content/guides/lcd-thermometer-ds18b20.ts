import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "lcd-thermometer-ds18b20",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "sensors",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 12,
  xpReward: 150,
  title: {
    en: "LCD Thermometer with DS18B20",
    ru: "Термометр на DS18B20 с LCD",
    kk: "DS18B20 және LCD негізіндегі термометр",
  },
  summary: {
    en: "A DS18B20 digital sensor reads the temperature to 0.1 °C, and a 16×2 I²C LCD shows the current value together with the lowest and highest since power-up.",
    ru: "Цифровой датчик DS18B20 измеряет температуру с шагом 0,1 °C, а LCD 16×2 по I²C показывает текущее значение, минимум и максимум с момента включения.",
    kk: "DS18B20 цифрлық датчигі температураны 0,1 °C дәлдікпен өлшейді, ал I²C арқылы қосылған 16×2 LCD ағымдағы мәнді, қосылғаннан бергі ең төменгі және ең жоғары мәндерді көрсетеді.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "ds18b20", qty: 1, spec: { en: "TO-92 or waterproof probe, −55…+125 °C", ru: "TO-92 или влагозащищённый щуп, −55…+125 °C", kk: "TO-92 немесе суға төзімді зонд, −55…+125 °C" }, role: { en: "Temperature sensor", ru: "Датчик температуры", kk: "Температура датчигі" } },
    { component: "resistor", qty: 1, spec: { en: "4.7 kΩ, ¼ W", ru: "4,7 кОм, ¼ Вт", kk: "4,7 кОм, ¼ Вт" }, role: { en: "1-Wire pull-up on DQ", ru: "Подтяжка линии 1-Wire (DQ)", kk: "1-Wire желісін (DQ) тарту" } },
    { component: "lcd-1602-i2c", qty: 1, spec: { en: "16×2 with PCF8574 backpack, address 0x27 or 0x3F", ru: "16×2 с платой PCF8574, адрес 0x27 или 0x3F", kk: "PCF8574 платасы бар 16×2, мекенжайы 0x27 немесе 0x3F" }, role: { en: "Display", ru: "Дисплей", kk: "Дисплей" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male and 4 female-male for the LCD", ru: "папа-папа и 4 мама-папа для LCD", kk: "аталық-аталық және LCD-ге 4 аналық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ds", component: "ds18b20", label: "DS18B20" },
    { id: "r_pull", component: "resistor", label: "4.7 kΩ" },
    { id: "lcd", component: "lcd-1602-i2c", label: "LCD 1602 I2C" },
  ],
  connections: [
    { from: "ds.VDD", to: "board.5V", color: "red" },
    { from: "ds.GND", to: "board.GND", color: "black" },
    { from: "ds.DQ", to: "board.D2", color: "yellow", note: { en: "1-Wire data", ru: "данные 1-Wire", kk: "1-Wire деректері" } },
    { from: "r_pull.A", to: "board.5V", color: "red", note: { en: "pull-up from DQ to 5V", ru: "подтяжка от DQ к 5V", kk: "DQ-дан 5V-ке тарту" } },
    { from: "r_pull.B", to: "ds.DQ", color: "yellow" },
    { from: "lcd.VCC", to: "board.5V", color: "red" },
    { from: "lcd.GND", to: "board.GND2", color: "black" },
    { from: "lcd.SDA", to: "board.A4", color: "blue", note: { en: "Uno I²C data", ru: "данные I²C Uno", kk: "Uno I²C деректері" } },
    { from: "lcd.SCL", to: "board.A5", color: "green", note: { en: "Uno I²C clock", ru: "тактирование I²C Uno", kk: "Uno I²C тактілеуі" } },
  ],
  steps: [
    {
      title: { en: "Install the three libraries", ru: "Установите три библиотеки", kk: "Үш кітапхананы орнатыңыз" },
      body: {
        en: "In Library Manager install \"OneWire\" (Paul Stoffregen et al.), \"DallasTemperature\" (Miles Burton) and \"LiquidCrystal I2C\" (Frank de Brabander). OneWire talks the 1-Wire bus, DallasTemperature turns it into degrees, and LiquidCrystal I2C drives the LCD through its PCF8574 backpack.",
        ru: "В менеджере библиотек установите «OneWire» (Paul Stoffregen и др.), «DallasTemperature» (Miles Burton) и «LiquidCrystal I2C» (Frank de Brabander). OneWire работает с шиной 1-Wire, DallasTemperature превращает данные в градусы, а LiquidCrystal I2C управляет LCD через плату PCF8574.",
        kk: "Кітапханалар менеджерінде «OneWire» (Paul Stoffregen және т.б.), «DallasTemperature» (Miles Burton) және «LiquidCrystal I2C» (Frank de Brabander) кітапханаларын орнатыңыз. OneWire 1-Wire шинасымен жұмыс істейді, DallasTemperature деректерді градусқа айналдырады, ал LiquidCrystal I2C LCD-ні PCF8574 платасы арқылы басқарады.",
      },
      expect: { en: "The sketch compiles with all three #include lines.", ru: "Скетч компилируется со всеми тремя #include.", kk: "Скетч үш #include жолымен де компиляцияланады." },
      mistake: { en: "Several libraries are called \"LiquidCrystal I2C\"; the one by Frank de Brabander has the init() and backlight() calls this sketch uses.", ru: "Библиотек с именем «LiquidCrystal I2C» несколько; вызовы init() и backlight(), которые использует скетч, есть в версии Frank de Brabander.", kk: "«LiquidCrystal I2C» деген кітапхана бірнешеу; скетч қолданатын init() және backlight() шақырулары Frank de Brabander нұсқасында бар." },
    },
    {
      title: { en: "Wire the DS18B20 with its pull-up", ru: "Подключите DS18B20 с подтяжкой", kk: "DS18B20-ні тартқышымен қосыңыз" },
      body: {
        en: "Hold the TO-92 sensor with the flat side towards you and the legs down: left is GND, middle DQ, right VDD. Wire GND → GND, VDD → 5V, DQ → D2, and put a 4.7 kΩ resistor between DQ and 5V. The 1-Wire bus is open-drain: the sensor can only pull the line low, the resistor pulls it back up. A waterproof probe uses the colours instead: red VDD, black GND, yellow (sometimes white) DQ.",
        ru: "Держите датчик в корпусе TO-92 плоской стороной к себе, ножками вниз: слева GND, посередине DQ, справа VDD. Подключите GND → GND, VDD → 5V, DQ → D2 и поставьте резистор 4,7 кОм между DQ и 5V. Шина 1-Wire с открытым стоком: датчик умеет только прижимать линию к нулю, а резистор возвращает её вверх. У влагозащищённого щупа ориентируйтесь по цветам: красный VDD, чёрный GND, жёлтый (иногда белый) DQ.",
        kk: "TO-92 корпусындағы датчикті тегіс жағын өзіңізге қаратып, аяқтарын төмен ұстаңыз: сол жақта GND, ортада DQ, оң жақта VDD. GND → GND, VDD → 5V, DQ → D2 қосып, DQ мен 5V арасына 4,7 кОм резистор қойыңыз. 1-Wire шинасы ашық ағынды: датчик желіні тек нөлге баса алады, ал резистор оны қайта жоғары тартады. Суға төзімді зондта түстерге қараңыз: қызыл VDD, қара GND, сары (кейде ақ) DQ.",
      },
      expect: { en: "Three sensor wires plus the 4.7 kΩ resistor from DQ to 5V.", ru: "Три провода датчика плюс резистор 4,7 кОм от DQ к 5V.", kk: "Датчиктің үш сымы және DQ-дан 5V-ке 4,7 кОм резистор." },
      mistake: { en: "A DS18B20 wired backwards gets hot within seconds; unplug at once if it is warm to the touch.", ru: "Перевёрнутый DS18B20 за секунды сильно нагревается; если он тёплый на ощупь, сразу отключите питание.", kk: "Кері қосылған DS18B20 бірнеше секундта қызып кетеді; ұстағанда жылы болса, қуатты бірден ажыратыңыз." },
    },
    {
      title: { en: "Connect the I²C LCD", ru: "Подключите LCD по I²C", kk: "I²C LCD-ні қосыңыз" },
      body: {
        en: "The backpack has four pins. Wire GND → GND, VCC → 5V, SDA → A4 and SCL → A5: on the Uno, A4 and A5 are the hardware I²C pins (also duplicated next to AREF). Only two signal wires drive the whole 16×2 screen.",
        ru: "У платы-переходника четыре вывода. Подключите GND → GND, VCC → 5V, SDA → A4, SCL → A5: на Uno именно A4 и A5 являются аппаратной шиной I²C (они же продублированы возле AREF). Всего два сигнальных провода управляют всем экраном 16×2.",
        kk: "Өтпелі платаның төрт шықпасы бар. GND → GND, VCC → 5V, SDA → A4, SCL → A5 қосыңыз: Uno-да дәл A4 пен A5 аппараттық I²C пиндері (олар AREF жанында да қайталанған). Бүкіл 16×2 экранды небәрі екі сигнал сымы басқарады.",
      },
      expect: { en: "The backlight turns on as soon as the Arduino is powered.", ru: "Подсветка загорается, как только на Arduino подано питание.", kk: "Arduino-ға қуат берілген бойда артқы жарық жанады." },
      mistake: { en: "SDA and SCL swapped: backlight on, but no text.", ru: "Перепутаны SDA и SCL: подсветка есть, текста нет.", kk: "SDA мен SCL ауысқан: артқы жарық бар, мәтін жоқ." },
    },
    {
      title: { en: "Upload and adjust the contrast", ru: "Загрузите скетч и настройте контраст", kk: "Скетчті жүктеп, контрастты реттеңіз" },
      body: {
        en: "Upload the sketch. If you see a row of solid boxes or nothing at all, turn the blue trimmer on the back of the backpack with a small screwdriver until the text is crisp. Line 1 shows the temperature (\"Temp: 23.6°C\"), line 2 the minimum and maximum since power-up. A 12-bit reading takes 750 ms, so the screen updates about once a second.",
        ru: "Загрузите скетч. Если видна строка сплошных прямоугольников или вообще ничего, покрутите маленькой отвёрткой синий подстроечный резистор на обороте платы, пока текст не станет чётким. В первой строке температура («Temp: 23.6°C»), во второй минимум и максимум с момента включения. 12-битное измерение длится 750 мс, поэтому экран обновляется примерно раз в секунду.",
        kk: "Скетчті жүктеңіз. Тұтас тіктөртбұрыштар қатары көрінсе немесе ештеңе көрінбесе, мәтін анық болғанша платаның артындағы көк реттегіш резисторды кішкене бұрағышпен бұраңыз. Бірінші жолда температура («Temp: 23.6°C»), екіншісінде қосылғаннан бергі ең төменгі және ең жоғары мәндер. 12 биттік өлшеу 750 мс алады, сондықтан экран шамамен секундына бір рет жаңарады.",
      },
      expect: { en: "Readable text and a temperature close to room temperature.", ru: "Читаемый текст и температура, близкая к комнатной.", kk: "Оқылатын мәтін және бөлме температурасына жақын мән." },
      mistake: { en: "Holding the sensor between your fingers while testing reads your skin, not the room.", ru: "Если держать датчик пальцами во время проверки, он измеряет кожу, а не комнату.", kk: "Тексеру кезінде датчикті саусақпен ұстасаңыз, ол бөлмені емес, теріңізді өлшейді." },
    },
    {
      title: { en: "Test min/max and the Serial log", ru: "Проверьте минимум/максимум и журнал в Serial", kk: "Ең төмен/жоғары мәндерді және Serial журналын тексеріңіз" },
      body: {
        en: "Open the Serial Monitor at 9600 baud: every reading is logged as \"T=23.56 C  min=22.94  max=23.56\". Warm the sensor between your fingers and watch \"Hi\" climb, then let it cool. To reset min and max without unplugging, type r in the Serial Monitor and press Enter.",
        ru: "Откройте Serial Monitor на 9600 бод: каждое измерение пишется как «T=23.56 C  min=22.94  max=23.56». Согрейте датчик пальцами и посмотрите, как растёт «Hi», затем дайте ему остыть. Чтобы сбросить минимум и максимум без отключения, введите r в Serial Monitor и нажмите Enter.",
        kk: "Serial Monitor-ды 9600 бодта ашыңыз: әр өлшеу «T=23.56 C  min=22.94  max=23.56» түрінде жазылады. Датчикті саусақтарыңызбен жылытып, «Hi» мәнінің өскенін бақылаңыз, содан кейін оны суытыңыз. Қуатты ажыратпай ең төменгі мен ең жоғарыны тастау үшін Serial Monitor-ға r жазып, Enter басыңыз.",
      },
      expect: { en: "\"Hi\" follows your fingers up to about 30 °C, \"Lo\" stays at the room value.", ru: "«Hi» поднимается от пальцев примерно до 30 °C, «Lo» остаётся на комнатном значении.", kk: "«Hi» саусақтан шамамен 30 °C-қа дейін көтеріледі, «Lo» бөлме мәнінде қалады." },
      mistake: { en: "\"Sensor error\" on the LCD means the library got −127 °C (no sensor answered): check the DQ wire and the pull-up.", ru: "«Sensor error» на LCD значит, что библиотека получила −127 °C (датчик не ответил): проверьте провод DQ и подтяжку.", kk: "LCD-дегі «Sensor error» кітапхананың −127 °C алғанын білдіреді (датчик жауап бермеді): DQ сымын және тартқышты тексеріңіз." },
    },
  ],
  code: [{
    filename: "lcd_thermometer.ino",
    language: "cpp",
    libraries: ["OneWire", "DallasTemperature", "LiquidCrystal I2C"],
    source: `// LCD thermometer: DS18B20 on D2 (4.7k pull-up to 5V), 16x2 I2C LCD on A4/A5.
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

const int ONEWIRE_PIN = 2;

OneWire oneWire(ONEWIRE_PIN);
DallasTemperature sensors(&oneWire);
LiquidCrystal_I2C lcd(0x27, 16, 2);           // try 0x3F if the screen stays blank

float minC = 1000.0;
float maxC = -1000.0;

void resetMinMax() {
  minC = 1000.0;
  maxC = -1000.0;
}

void setup() {
  Serial.begin(9600);
  sensors.begin();
  sensors.setResolution(12);                  // 0.0625 C steps, 750 ms per reading
  lcd.init();
  lcd.backlight();
  lcd.print("DS18B20 ready");
  Serial.print("Sensors found: ");
  Serial.println(sensors.getDeviceCount());
}

void loop() {
  if (Serial.available()) {
    char c = Serial.read();
    if (c == 'r' || c == 'R') {
      resetMinMax();
      Serial.println("min/max reset");
    }
  }

  sensors.requestTemperatures();              // blocks for the conversion (750 ms)
  float t = sensors.getTempCByIndex(0);

  if (t == DEVICE_DISCONNECTED_C) {
    lcd.clear();
    lcd.print("Sensor error");
    lcd.setCursor(0, 1);
    lcd.print("Check DQ + 4.7k");
    Serial.println("Sensor error");
    delay(1000);
    return;
  }

  if (t < minC) minC = t;
  if (t > maxC) maxC = t;

  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(t, 1);
  lcd.print((char)223);                       // degree sign in the LCD's character ROM
  lcd.print("C    ");
  lcd.setCursor(0, 1);
  lcd.print("Lo ");
  lcd.print(minC, 1);
  lcd.print(" Hi ");
  lcd.print(maxC, 1);
  lcd.print("   ");

  Serial.print("T=");
  Serial.print(t, 2);
  Serial.print(" C  min=");
  Serial.print(minC, 2);
  Serial.print("  max=");
  Serial.println(maxC, 2);

  delay(250);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The LCD backlight is on but shows no text", ru: "Подсветка LCD горит, но текста нет", kk: "LCD артқы жарығы жанып тұр, бірақ мәтін жоқ" },
      cause: { en: "Contrast trimmer turned all the way, wrong I²C address, or SDA/SCL swapped.", ru: "Подстроечник контраста выкручен в край, неверный адрес I²C, или перепутаны SDA/SCL.", kk: "Контраст реттегіші шетке дейін бұралған, I²C мекенжайы қате немесе SDA/SCL ауысқан." },
      fix: { en: "Turn the blue trimmer slowly through its range; if still blank, change 0x27 to 0x3F in the sketch and check SDA → A4, SCL → A5.", ru: "Медленно проверните синий подстроечник по всему диапазону; если пусто, замените 0x27 на 0x3F в скетче и проверьте SDA → A4, SCL → A5.", kk: "Көк реттегішті бүкіл ауқымы бойынша баяу бұраңыз; әлі бос болса, скетчте 0x27-ні 0x3F-ке ауыстырып, SDA → A4, SCL → A5 тексеріңіз." },
    },
    {
      symptom: { en: "The temperature always shows −127 / \"Sensor error\"", ru: "Температура всегда −127 / «Sensor error»", kk: "Температура әрқашан −127 / «Sensor error»" },
      cause: { en: "No answer on the 1-Wire bus: missing 4.7 kΩ pull-up, DQ not on D2, or the sensor legs are mixed up.", ru: "На шине 1-Wire нет ответа: нет подтяжки 4,7 кОм, DQ не на D2, или перепутаны ножки датчика.", kk: "1-Wire шинасында жауап жоқ: 4,7 кОм тартқыш жоқ, DQ D2-де емес немесе датчик аяқтары шатасқан." },
      fix: { en: "Check \"Sensors found: 1\" in the Serial Monitor at start-up, then the pull-up from DQ to 5V and the GND / DQ / VDD order.", ru: "Проверьте «Sensors found: 1» в Serial Monitor при старте, затем подтяжку от DQ к 5V и порядок GND / DQ / VDD.", kk: "Іске қосылғанда Serial Monitor-да «Sensors found: 1» тұрғанын, содан кейін DQ-дан 5V-ке тартқышты және GND / DQ / VDD ретін тексеріңіз." },
    },
    {
      symptom: { en: "It always reads exactly 85.0 °C", ru: "Всегда показывает ровно 85,0 °C", kk: "Әрқашан дәл 85,0 °C көрсетеді" },
      cause: { en: "85 °C is the DS18B20 power-on value: the conversion did not finish, usually because the sensor is wired in parasite mode (VDD to GND).", ru: "85 °C это значение DS18B20 при включении: преобразование не завершилось, обычно потому что датчик подключён в паразитном режиме (VDD на GND).", kk: "85 °C DS18B20-нің қосылғандағы мәні: түрлендіру аяқталмаған, әдетте датчик паразиттік режимде қосылғандықтан (VDD GND-де)." },
      fix: { en: "Connect VDD to 5V as in the wiring table.", ru: "Подключите VDD к 5V, как в таблице соединений.", kk: "VDD-ні қосылыстар кестесіндегідей 5V-ке қосыңыз." },
    },
  ],
  safety: [
    { en: "If the DS18B20 gets hot, it is wired backwards: unplug USB immediately and fix the leg order.", ru: "Если DS18B20 нагревается, он подключён наоборот: сразу отключите USB и исправьте порядок ножек.", kk: "DS18B20 қызса, ол кері қосылған: USB-ні дереу ажыратып, аяқтар ретін түзетіңіз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["Sensors found: 1", "T=23.56 C  min=23.56  max=23.56", "T=23.50 C  min=23.50  max=23.56", "T=24.12 C  min=23.50  max=24.12", "T=26.94 C  min=23.50  max=26.94", "T=29.31 C  min=23.50  max=29.31", "T=27.00 C  min=23.50  max=29.31", "min/max reset", "T=25.44 C  min=25.44  max=25.44"],
    leds: [],
  },
} satisfies GuideContent;
