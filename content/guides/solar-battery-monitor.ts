import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "solar-battery-monitor",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "energy",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 19,
  xpReward: 220,
  title: {
    en: "Solar & Battery Energy Monitor",
    ru: "Монитор энергии солнечной панели и аккумулятора",
    kk: "Күн панелі мен аккумулятор энергиясының мониторы",
  },
  summary: {
    en: "An INA219 sits in the + wire of a battery or small solar panel and measures voltage, current and power; the Uno counts watt-hours and shows everything on a 1602 LCD.",
    ru: "INA219 стоит в плюсовом проводе аккумулятора или небольшой солнечной панели и измеряет напряжение, ток и мощность; Uno считает ватт-часы и выводит всё на LCD 1602.",
    kk: "INA219 аккумулятордың немесе шағын күн панелінің оң сымына қойылып, кернеуді, токты және қуатты өлшейді; Uno ватт-сағатты санап, бәрін LCD 1602 экранына шығарады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller and energy counter", ru: "Контроллер и счётчик энергии", kk: "Контроллер және энергия есептегіші" } },
    { component: "ina219", qty: 1, spec: { en: "GY-INA219, 0.1 Ω shunt, address 0x40", ru: "GY-INA219, шунт 0,1 Ом, адрес 0x40", kk: "GY-INA219, 0,1 Ом шунт, мекенжайы 0x40" }, role: { en: "Measures bus voltage and current (up to 26 V, ~3.2 A)", ru: "Измеряет напряжение линии и ток (до 26 В, ~3,2 А)", kk: "Желі кернеуі мен токты өлшейді (26 В-қа дейін, ~3,2 А)" } },
    { component: "lcd-1602-i2c", qty: 1, spec: { en: "PCF8574 backpack, address 0x27 or 0x3F", ru: "плата PCF8574, адрес 0x27 или 0x3F", kk: "PCF8574 тақшасы, мекенжайы 0x27 немесе 0x3F" }, role: { en: "Shows V, A, W and Wh", ru: "Показывает В, А, Вт и Вт·ч", kk: "В, А, Вт және Вт·сағ көрсетеді" } },
    { component: "battery-18650", qty: 1, spec: { en: "protected cell in a holder with leads", ru: "защищённый элемент в держателе с проводами", kk: "сымдары бар ұстағыштағы қорғалған элемент" }, role: { en: "Demo energy source (later: your solar line)", ru: "Источник энергии для теста (потом: ваша солнечная линия)", kk: "Сынақ энергия көзі (кейін: күн панелінің желісі)" } },
    { component: "dc-motor", qty: 1, spec: { en: "TT gear motor 3–6 V", ru: "мотор-редуктор TT 3–6 В", kk: "TT редукторлы қозғалтқыш 3–6 В" }, role: { en: "Test load", ru: "Тестовая нагрузка", kk: "Сынақ жүктемесі" } },
    { component: "diode", qty: 1, spec: { en: "1N4007", ru: "1N4007", kk: "1N4007" }, role: { en: "Absorbs motor voltage spikes", ru: "Гасит выбросы напряжения мотора", kk: "Қозғалтқыштың кернеу секірістерін басады" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Hold 2 s to reset the Wh counter", ru: "Удержание 2 с сбрасывает счётчик Вт·ч", kk: "2 с басып тұрса, Вт·сағ есептегіші нөлденеді" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 16, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ina", component: "ina219", label: "INA219" },
    { id: "lcd", component: "lcd-1602-i2c", label: "LCD 1602" },
    { id: "bat", component: "battery-18650", label: "18650 / solar line" },
    { id: "m1", component: "dc-motor", label: "Test load" },
    { id: "d1", component: "diode", label: "1N4007" },
    { id: "btn", component: "push-button", label: "Reset Wh" },
  ],
  connections: [
    { from: "board.5V", to: "ina.VCC", color: "red" },
    { from: "ina.GND", to: "board.GND", color: "black" },
    { from: "ina.SDA", to: "board.A4", color: "blue", note: { en: "shared I²C bus with the LCD", ru: "общая шина I²C с LCD", kk: "LCD-мен ортақ I²C шинасы" } },
    { from: "ina.SCL", to: "board.A5", color: "yellow" },
    { from: "board.5V", to: "lcd.VCC", color: "red" },
    { from: "lcd.GND", to: "board.GND2", color: "black" },
    { from: "lcd.SDA", to: "board.A4", color: "blue" },
    { from: "lcd.SCL", to: "board.A5", color: "yellow" },
    { from: "bat.+", to: "ina.VIN+", color: "red", note: { en: "source side of the measured line", ru: "сторона источника измеряемой линии", kk: "өлшенетін желінің қорек көзі жағы" } },
    { from: "ina.VIN-", to: "m1.+", color: "orange", note: { en: "load side", ru: "сторона нагрузки", kk: "жүктеме жағы" } },
    { from: "m1.-", to: "bat.-", color: "black" },
    { from: "d1.K", to: "m1.+", color: "gray", note: { en: "stripe towards +", ru: "полоска к плюсу", kk: "жолағы оң жаққа" } },
    { from: "d1.A", to: "m1.-", color: "gray" },
    { from: "bat.-", to: "board.GND3", color: "black", note: { en: "common ground: the INA219 measures voltage against it", ru: "общая земля: INA219 измеряет напряжение относительно неё", kk: "ортақ жер: INA219 кернеуді соған қатысты өлшейді" } },
    { from: "board.D2", to: "btn.1", color: "green", note: { en: "internal pull-up", ru: "внутренняя подтяжка", kk: "ішкі тарту" } },
    { from: "btn.2", to: "board.GND", color: "black" },
  ],
  steps: [
    {
      title: { en: "Build the I²C bus", ru: "Соберите шину I²C", kk: "I²C шинасын құрастырыңыз" },
      body: {
        en: "Both modules talk over I²C, so they share four wires. Connect INA219 and LCD VCC to 5V, GND to GND, SDA to A4 and SCL to A5. The INA219 answers at 0x40 and the LCD backpack at 0x27 (some at 0x3F), so there is no address conflict.",
        ru: "Оба модуля работают по I²C и делят четыре провода. Подключите VCC INA219 и LCD к 5V, GND к GND, SDA к A4, SCL к A5. INA219 отвечает по адресу 0x40, плата LCD по 0x27 (иногда 0x3F), поэтому конфликта адресов нет.",
        kk: "Екі модуль да I²C арқылы жұмыс істейді, сондықтан төрт сымды бөліседі. INA219 мен LCD-дің VCC-ін 5V-ке, GND-ін GND-ге, SDA-ны A4-ке, SCL-ді A5-ке қосыңыз. INA219 0x40 мекенжайында, LCD тақшасы 0x27-де (кейде 0x3F) жауап береді, сондықтан мекенжай қақтығысы болмайды.",
      },
      expect: { en: "The LCD backlight turns on as soon as the Uno is powered.", ru: "Подсветка LCD загорается сразу после подачи питания на Uno.", kk: "Uno-ға қуат берілген бойда LCD жарығы жанады." },
      mistake: { en: "Swapping SDA and SCL: nothing is damaged, but the sketch reports \"INA219 not found\".", ru: "Перепутанные SDA и SCL: ничего не сгорит, но скетч напишет «INA219 not found».", kk: "SDA мен SCL ауысып кетсе, ештеңе күймейді, бірақ скетч «INA219 not found» деп жазады." },
    },
    {
      title: { en: "Put the INA219 in the + wire", ru: "Включите INA219 в плюсовой провод", kk: "INA219-ды оң сымға қосыңыз" },
      body: {
        en: "The INA219 is a high-side sensor: the current must flow through it. Battery + goes to VIN+, VIN− goes on to the load, and the load returns to battery −. Then join battery − to Arduino GND: the chip measures the line voltage at VIN− against its own GND, so without this wire the voltage reads 0 even though the current is correct.",
        ru: "INA219 ставится в «верхнее» плечо: ток должен проходить через него. Плюс аккумулятора идёт на VIN+, VIN− дальше к нагрузке, а нагрузка возвращается на минус аккумулятора. Затем соедините минус аккумулятора с GND Arduino: микросхема меряет напряжение на VIN− относительно своего GND, и без этого провода напряжение будет 0, хотя ток правильный.",
        kk: "INA219 «жоғарғы» иінге қойылады: ток ол арқылы өтуі керек. Аккумулятордың плюсі VIN+-ке, VIN− әрі қарай жүктемеге барады, ал жүктеме аккумулятордың минусына қайтады. Содан кейін аккумулятор минусын Arduino GND-імен қосыңыз: микросхема VIN−-дегі кернеуді өз GND-іне қатысты өлшейді, сондықтан бұл сымсыз ток дұрыс болса да кернеу 0 көрсетеді.",
      },
      expect: { en: "The current path is: battery + → VIN+ → shunt → VIN− → load → battery −.", ru: "Путь тока: плюс аккумулятора → VIN+ → шунт → VIN− → нагрузка → минус аккумулятора.", kk: "Ток жолы: аккумулятор плюсі → VIN+ → шунт → VIN− → жүктеме → аккумулятор минусы." },
      mistake: { en: "Putting the INA219 across the battery (VIN+ to +, VIN− to −) shorts the cell through the 0.1 Ω shunt.", ru: "Если подключить INA219 параллельно аккумулятору (VIN+ к плюсу, VIN− к минусу), элемент замкнётся через шунт 0,1 Ом.", kk: "INA219-ды аккумуляторға параллель қоссаңыз (VIN+ плюске, VIN− минусқа), элемент 0,1 Ом шунт арқылы тұйықталады." },
    },
    {
      title: { en: "Add the test load and diode", ru: "Добавьте тестовую нагрузку и диод", kk: "Сынақ жүктемесі мен диодты қосыңыз" },
      body: {
        en: "Connect the TT motor between VIN− and battery −. Put the 1N4007 across the motor terminals with the striped end (K) on the + side. When the motor stops, its coil kicks back a voltage spike; the diode clamps it so it never reaches the INA219 inputs. Any 3–6 V load works here, for example a USB lamp on a 5 V line.",
        ru: "Подключите мотор TT между VIN− и минусом аккумулятора. Поставьте 1N4007 параллельно выводам мотора, концом с полоской (K) к плюсу. При остановке обмотка мотора даёт выброс напряжения, а диод его гасит, и он не доходит до входов INA219. Подойдёт любая нагрузка на 3–6 В, например USB-лампа на линии 5 В.",
        kk: "TT қозғалтқышын VIN− мен аккумулятор минусының арасына қосыңыз. 1N4007 диодын қозғалтқыш шықпаларына параллель, жолағы бар ұшын (K) плюс жаққа қаратып қойыңыз. Қозғалтқыш тоқтағанда орамы кернеу секірісін береді, ал диод оны басады да, ол INA219 кірістеріне жетпейді. 3–6 В кез келген жүктеме жарайды, мысалы 5 В желідегі USB шамы.",
      },
      expect: { en: "The motor spins as soon as the battery is connected.", ru: "Мотор крутится сразу после подключения аккумулятора.", kk: "Аккумулятор қосылған бойда қозғалтқыш айналады." },
      mistake: { en: "A diode turned the wrong way shorts the battery the moment you connect it.", ru: "Диод, поставленный наоборот, замыкает аккумулятор в момент подключения.", kk: "Кері қойылған диод қосқан сәтте аккумуляторды тұйықтайды." },
    },
    {
      title: { en: "Wire the reset button", ru: "Подключите кнопку сброса", kk: "Нөлдеу батырмасын қосыңыз" },
      body: {
        en: "Place the button across the breadboard gap, one side to D2 and the opposite side to GND. The sketch enables the internal pull-up. Holding the button for 2 seconds clears the Wh and mAh totals, which are otherwise saved to EEPROM every 15 minutes and survive a power cut.",
        ru: "Поставьте кнопку поперёк канавки макетки, одну сторону к D2, противоположную к GND. Скетч включает внутреннюю подтяжку. Удержание кнопки 2 секунды обнуляет счётчики Вт·ч и мА·ч; в остальное время они сохраняются в EEPROM каждые 15 минут и переживают отключение питания.",
        kk: "Батырманы макет тақтасының ойығына көлденең қойып, бір жағын D2-ге, қарама-қарсы жағын GND-ге қосыңыз. Скетч ішкі тартуды қосады. Батырманы 2 секунд басып тұрсаңыз, Вт·сағ пен мА·сағ есептегіштері нөлденеді; басқа уақытта олар әр 15 минут сайын EEPROM-ға сақталып, қуат өшсе де жоғалмайды.",
      },
      expect: { en: "Holding the button shows \"Counter reset\" on the LCD.", ru: "При удержании кнопки на LCD появляется «Counter reset».", kk: "Батырманы басып тұрғанда LCD-де «Counter reset» шығады." },
      mistake: { en: "A short tap does nothing on purpose, so the total is not lost by accident.", ru: "Короткое нажатие специально ничего не делает, чтобы не сбросить счётчик случайно.", kk: "Қысқа басу әдейі ештеңе істемейді, есептегіш кездейсоқ нөлденбес үшін." },
    },
    {
      title: { en: "Upload and compare with a multimeter", ru: "Загрузите скетч и сверьте с мультиметром", kk: "Скетчті жүктеп, мультиметрмен салыстырыңыз" },
      body: {
        en: "Install \"Adafruit INA219\" and \"LiquidCrystal I2C\" (Frank de Brabander) from the Library Manager and upload. The top line shows volts and amps, the bottom line watts and the running watt-hour total. Serial Monitor at 9600 baud prints a CSV line every second that you can paste into a spreadsheet. Check the voltage against a multimeter on VIN− and GND: they should agree within about 1 %.",
        ru: "Установите «Adafruit INA219» и «LiquidCrystal I2C» (Frank de Brabander) через менеджер библиотек и загрузите скетч. В верхней строке вольты и амперы, в нижней ватты и накопленные ватт-часы. Serial Monitor на 9600 бод раз в секунду печатает строку CSV, которую можно вставить в таблицу. Сверьте напряжение с мультиметром между VIN− и GND: расхождение должно быть около 1 %.",
        kk: "Кітапханалар менеджерінен «Adafruit INA219» және «LiquidCrystal I2C» (Frank de Brabander) орнатып, скетчті жүктеңіз. Жоғарғы жолда вольт пен ампер, төменгі жолда ватт пен жиналған ватт-сағат. 9600 бодтағы Serial Monitor әр секунд сайын кестеге қоюға болатын CSV жолын шығарады. Кернеуді VIN− мен GND арасындағы мультиметр көрсеткішімен салыстырыңыз: айырмашылық шамамен 1 % болуы керек.",
      },
      expect: { en: "About 3.9 V and 0.1–0.4 A with the motor running; the Wh value climbs slowly.", ru: "Около 3,9 В и 0,1–0,4 А при работающем моторе; значение Вт·ч медленно растёт.", kk: "Қозғалтқыш жұмыс істегенде шамамен 3,9 В және 0,1–0,4 А; Вт·сағ мәні баяу өседі." },
      mistake: { en: "A blank LCD with a lit backlight usually means the contrast trimmer on the backpack is turned all the way.", ru: "Пустой LCD с горящей подсветкой обычно значит, что подстроечник контраста на плате выкручен до упора.", kk: "Жарығы жанып тұрған бос LCD әдетте тақшадағы контраст реттегіші шетке дейін бұралғанын білдіреді." },
    },
    {
      title: { en: "Move it onto a solar panel", ru: "Перенесите его на солнечную панель", kk: "Оны күн панеліне ауыстырыңыз" },
      body: {
        en: "To log what a panel harvests, unplug the test battery and motor and put the INA219 in the panel's + lead: panel + to VIN+, VIN− to the + input of your charger (for example a TP4056 for a 5–6 V panel), and panel − to charger − and Arduino GND. Keep the panel under 26 V open-circuit and the current under 2 A: a 6 V, 1–5 W panel is ideal. Leave it in the sun for a day and read the Wh total in the evening.",
        ru: "Чтобы считать, сколько собирает панель, отключите тестовый аккумулятор и мотор и включите INA219 в плюсовой провод панели: плюс панели на VIN+, VIN− на плюсовой вход контроллера заряда (например TP4056 для панели 5–6 В), минус панели на минус контроллера и GND Arduino. Напряжение холостого хода панели должно быть меньше 26 В, ток меньше 2 А: идеальна панель 6 В на 1–5 Вт. Оставьте её на солнце на день и вечером посмотрите на счётчик Вт·ч.",
        kk: "Панельдің қанша энергия жинайтынын санау үшін сынақ аккумуляторы мен қозғалтқышты ажыратып, INA219-ды панельдің оң сымына қосыңыз: панель плюсін VIN+-ке, VIN−-ді зарядтау контроллерінің оң кірісіне (мысалы 5–6 В панель үшін TP4056), панель минусын контроллер минусына және Arduino GND-іне. Панельдің бос жүріс кернеуі 26 В-тан, тогы 2 А-дан аз болуы керек: 6 В, 1–5 Вт панель өте қолайлы. Оны бір күн күн астында қалдырып, кешке Вт·сағ есептегішін қараңыз.",
      },
      expect: { en: "Current and Wh rise when the sun comes out and fall to near zero in shade.", ru: "Ток и Вт·ч растут, когда выходит солнце, и падают почти до нуля в тени.", kk: "Күн шыққанда ток пен Вт·сағ өседі, көлеңкеде нөлге жуық түседі." },
      mistake: { en: "Wiring VIN+ to the charger side makes the current read negative, and the counter ignores negative flow.", ru: "Если VIN+ подключить со стороны контроллера, ток станет отрицательным, а счётчик игнорирует обратный ток.", kk: "VIN+-ті контроллер жағына қоссаңыз, ток теріс болады, ал есептегіш кері токты есепке алмайды." },
    },
  ],
  code: [{
    filename: "solar_battery_monitor.ino",
    language: "cpp",
    libraries: ["Adafruit INA219", "LiquidCrystal I2C"],
    source: `#include <Wire.h>
#include <EEPROM.h>
#include <Adafruit_INA219.h>
#include <LiquidCrystal_I2C.h>

const int BUTTON_PIN = 2;                 // hold 2 s to reset the counter
const unsigned long SAMPLE_MS = 250;
const unsigned long PRINT_MS = 1000;
const unsigned long SAVE_MS = 15UL * 60UL * 1000UL;   // EEPROM save interval
const float NOISE_MA = 1.0;               // ignore readings below this

Adafruit_INA219 ina219;                   // default address 0x40
LiquidCrystal_I2C lcd(0x27, 16, 2);       // use 0x3F if the screen stays empty

struct Totals { uint32_t magic; float wh; float mah; };
const uint32_t MAGIC = 0x50574831UL;
Totals totals;

float volts = 0, milliamps = 0, watts = 0;
unsigned long lastSample = 0, lastPrint = 0, lastSave = 0, pressedAt = 0;
bool resetDone = false;

void saveTotals() { EEPROM.put(0, totals); }

void showLine(uint8_t row, const char *text) {
  char line[17];
  snprintf(line, sizeof(line), "%-16s", text);
  lcd.setCursor(0, row);
  lcd.print(line);
}

void updateDisplay() {
  char v[8], a[8], w[8], wh[10], buf[24];
  dtostrf(volts, 5, 2, v);
  dtostrf(milliamps / 1000.0, 6, 3, a);
  snprintf(buf, sizeof(buf), "%sV %sA", v, a);
  showLine(0, buf);
  dtostrf(watts, 5, 2, w);
  dtostrf(totals.wh, 7, 3, wh);
  snprintf(buf, sizeof(buf), "%sW%sWh", w, wh);
  showLine(1, buf);
}

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  lcd.init();
  lcd.backlight();
  if (!ina219.begin()) {
    showLine(0, "INA219 not found");
    Serial.println("INA219 not found, check SDA/SCL");
    while (true) delay(1000);
  }
  ina219.setCalibration_32V_2A();         // 26 V max bus, 2 A range with the 0.1 ohm shunt

  EEPROM.get(0, totals);
  if (totals.magic != MAGIC || isnan(totals.wh) || isnan(totals.mah)) {
    totals.magic = MAGIC; totals.wh = 0; totals.mah = 0;
    saveTotals();
  }
  Serial.println("V,mA,W,Wh,mAh");
  lastSample = lastPrint = lastSave = millis();
}

void loop() {
  unsigned long now = millis();

  // hold the button for 2 s to clear the totals
  if (digitalRead(BUTTON_PIN) == LOW) {
    if (pressedAt == 0) pressedAt = now;
    if (!resetDone && now - pressedAt >= 2000) {
      totals.wh = 0; totals.mah = 0;
      saveTotals();
      resetDone = true;
      showLine(0, "Counter reset");
      showLine(1, "");
      Serial.println("counter reset");
      delay(800);
    }
  } else {
    pressedAt = 0;
    resetDone = false;
  }

  if (now - lastSample >= SAMPLE_MS) {
    float hours = (now - lastSample) / 3600000.0;
    lastSample = now;
    float shuntmV = ina219.getShuntVoltage_mV();
    volts = ina219.getBusVoltage_V() + shuntmV / 1000.0;   // voltage at the source side
    milliamps = ina219.getCurrent_mA();
    if (milliamps < NOISE_MA) milliamps = 0;               // ignore noise and reverse flow
    watts = volts * milliamps / 1000.0;
    totals.wh += watts * hours;
    totals.mah += milliamps * hours;
    updateDisplay();
  }

  if (now - lastPrint >= PRINT_MS) {
    lastPrint = now;
    Serial.print(volts, 2); Serial.print(',');
    Serial.print(milliamps, 1); Serial.print(',');
    Serial.print(watts, 2); Serial.print(',');
    Serial.print(totals.wh, 4); Serial.print(',');
    Serial.println(totals.mah, 1);
  }

  if (now - lastSave >= SAVE_MS) {
    lastSave = now;
    saveTotals();
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"INA219 not found\" on the screen", ru: "На экране «INA219 not found»", kk: "Экранда «INA219 not found»" },
      cause: { en: "SDA/SCL swapped, a loose VCC/GND wire, or header pins on the INA219 not soldered.", ru: "Перепутаны SDA/SCL, плохо вставлен VCC/GND или не припаяны штырьки на INA219.", kk: "SDA/SCL ауысқан, VCC/GND сымы нашар тұр немесе INA219-дағы түйреуіштер дәнекерленбеген." },
      fix: { en: "Check SDA→A4 and SCL→A5, solder the header, and run an I²C scanner sketch: it should list 0x40 and 0x27.", ru: "Проверьте SDA→A4 и SCL→A5, припаяйте штырьки и запустите скетч I²C-сканера: он должен найти 0x40 и 0x27.", kk: "SDA→A4 және SCL→A5 тексеріп, түйреуіштерді дәнекерлеңіз де, I²C сканер скетчін іске қосыңыз: ол 0x40 пен 0x27-ні табуы керек." },
    },
    {
      symptom: { en: "Current is right but voltage shows 0.00 V", ru: "Ток правильный, а напряжение 0.00 В", kk: "Ток дұрыс, бірақ кернеу 0.00 В" },
      cause: { en: "Battery − is not connected to Arduino GND, so the INA219 has no reference for the bus voltage.", ru: "Минус аккумулятора не соединён с GND Arduino, и INA219 не от чего мерить напряжение.", kk: "Аккумулятор минусы Arduino GND-імен қосылмаған, сондықтан INA219 кернеуді неге қатысты өлшерін білмейді." },
      fix: { en: "Add the wire from battery − to a GND pin.", ru: "Добавьте провод от минуса аккумулятора к пину GND.", kk: "Аккумулятор минусынан GND пиніне сым қосыңыз." },
    },
    {
      symptom: { en: "Current stays at 0 while the load clearly runs", ru: "Ток 0, хотя нагрузка явно работает", kk: "Жүктеме анық жұмыс істеп тұрса да ток 0" },
      cause: { en: "VIN+ and VIN− are swapped, so the current is negative and the sketch drops it.", ru: "Перепутаны VIN+ и VIN−: ток получается отрицательным, и скетч его отбрасывает.", kk: "VIN+ пен VIN− ауысқан: ток теріс шығады да, скетч оны есепке алмайды." },
      fix: { en: "Swap the two wires so VIN+ faces the source.", ru: "Поменяйте провода местами, чтобы VIN+ смотрел на источник.", kk: "Екі сымды ауыстырыңыз, VIN+ қорек көзіне қарасын." },
    },
    {
      symptom: { en: "Wh total resets after unplugging", ru: "Счётчик Вт·ч сбрасывается после отключения", kk: "Ажыратқаннан кейін Вт·сағ есептегіші нөлденеді" },
      cause: { en: "Totals are written to EEPROM only every 15 minutes to save its write cycles.", ru: "Итоги пишутся в EEPROM только раз в 15 минут, чтобы беречь ресурс записи.", kk: "Жазу ресурсын үнемдеу үшін қорытынды EEPROM-ға тек 15 минутта бір рет жазылады." },
      fix: { en: "Expect to lose at most the last 15 minutes; lower SAVE_MS to 5 minutes if you unplug often (EEPROM still lasts years).", ru: "Теряется максимум последние 15 минут; если часто отключаете, уменьшите SAVE_MS до 5 минут (EEPROM всё равно проживёт годы).", kk: "Ең көбі соңғы 15 минут жоғалады; жиі ажыратсаңыз, SAVE_MS-ті 5 минутқа азайтыңыз (EEPROM бәрібір жылдар бойы жұмыс істейді)." },
    },
  ],
  safety: [
    { en: "An 18650 can deliver many amps into a short: use a protected cell in a holder and never let the + and − leads touch.", ru: "18650 при замыкании отдаёт десятки ампер: используйте защищённый элемент в держателе и не допускайте касания проводов + и −.", kk: "18650 тұйықталғанда өте үлкен ток береді: ұстағыштағы қорғалған элементті пайдаланыңыз және + пен − сымдарын түйістірмеңіз." },
    { en: "Stay within the INA219 limits: 26 V on VIN± and about 3.2 A through the shunt. Low-voltage DC only, never mains.", ru: "Не выходите за пределы INA219: 26 В на VIN± и около 3,2 А через шунт. Только низковольтный постоянный ток, никакой сети 220 В.", kk: "INA219 шектерінен аспаңыз: VIN± кірісінде 26 В және шунт арқылы шамамен 3,2 А. Тек төмен вольтты тұрақты ток, 220 В желі ешқашан болмайды." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "V,mA,W,Wh,mAh",
      "3.98,186.4,0.74,0.0002,0.1",
      "3.97,212.9,0.85,0.0004,0.1",
      "3.97,208.3,0.83,0.0007,0.2",
      "3.96,214.0,0.85,0.0009,0.2",
      "3.96,209.7,0.83,0.0011,0.3",
      "3.96,0.0,0.00,0.0011,0.3",
      "3.97,0.0,0.00,0.0011,0.3",
      "3.95,341.2,1.35,0.0015,0.4",
      "3.95,336.8,1.33,0.0019,0.5",
    ],
    leds: [],
  },
} satisfies GuideContent;
