import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "bike-speedometer-hall",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "vehicles",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 15,
  xpReward: 230,
  title: {
    en: "Bike Speedometer with a Hall Sensor",
    ru: "Велоспидометр на датчике Холла",
    kk: "Холл датчигіндегі велоспидометр",
  },
  summary: {
    en: "A magnet on a spoke passes a Hall sensor once per wheel turn. The Nano times each turn, works out speed and trip distance for your wheel size and shows them on an OLED on the handlebar.",
    ru: "Магнит на спице раз за оборот колеса проходит мимо датчика Холла. Nano измеряет время каждого оборота, вычисляет скорость и пробег для вашего размера колеса и показывает их на OLED на руле.",
    kk: "Спицадағы магнит дөңгелектің әр айналымында Холл датчигінің жанынан бір рет өтеді. Nano әр айналымның уақытын өлшеп, дөңгелегіңіздің өлшеміне қарай жылдамдық пен жүрілген жолды есептейді де, рульдегі OLED-ке шығарады.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V", ru: "ATmega328P, 5 В", kk: "ATmega328P, 5 В" }, role: { en: "Times wheel turns, calculates speed", ru: "Измеряет обороты колеса, считает скорость", kk: "Дөңгелек айналымдарын өлшеп, жылдамдықты есептейді" } },
    { component: "hall-sensor-a3144", qty: 1, spec: { en: "A3144 / OH3144 Hall switch + a neodymium magnet", ru: "датчик Холла A3144 / OH3144 + неодимовый магнит", kk: "A3144 / OH3144 Холл ажыратқышы + неодим магнит" }, role: { en: "One pulse per wheel turn", ru: "Один импульс на оборот колеса", kk: "Дөңгелектің бір айналымына бір импульс" } },
    { component: "resistor", qty: 1, spec: { en: "10 kΩ, ¼ W", ru: "10 кОм, ¼ Вт", kk: "10 кОм, ¼ Вт" }, role: { en: "Pull-up for the open-collector output", ru: "Подтяжка для выхода с открытым коллектором", kk: "Ашық коллекторлы шығысқа арналған тарту" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C 0x3C", ru: "0,96\" 128×64, I²C 0x3C", kk: "0,96\" 128×64, I²C 0x3C" }, role: { en: "Speed, distance, max speed", ru: "Скорость, пробег, максимальная скорость", kk: "Жылдамдық, жол, ең жоғары жылдамдық" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile or panel button", ru: "тактовая 6×6 мм или панельная", kk: "6×6 мм тактілі немесе панельдік" }, role: { en: "Wheel size / reset trip", ru: "Размер колеса / сброс пробега", kk: "Дөңгелек өлшемі / жолды нөлдеу" } },
    { component: "battery-9v", qty: 1, spec: { en: "PP3 with snap clip", ru: "«Крона» с клипсой", kk: "Қысқышы бар PP3 («Крона»)" }, role: { en: "Power on the bike, into VIN", ru: "Питание на велосипеде, на VIN", kk: "Велосипедтегі қорек, VIN-ге" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT", ru: "SPDT", kk: "SPDT" }, role: { en: "Power switch", ru: "Выключатель питания", kk: "Қорек ажыратқышы" } },
    { component: "enclosure", qty: 1, spec: { en: "small box with a window for the OLED", ru: "небольшой корпус с окном для OLED", kk: "OLED үшін терезесі бар шағын қорап" }, role: { en: "Handlebar mount, splash protection", ru: "Крепление на руль, защита от брызг", kk: "Рульге бекіту, шашыраудан қорғау" } },
    { component: "jumper-wires", qty: 12, spec: { en: "plus ~1 m of 3-core cable to the fork", ru: "плюс ~1 м трёхжильного кабеля до вилки", kk: "плюс шанышқыға дейін ~1 м үш желілі кабель" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "hall", component: "hall-sensor-a3144", label: "Hall (fork)" },
    { id: "r_pu", component: "resistor", label: "10 kΩ" },
    { id: "oled", component: "oled-ssd1306", label: "OLED" },
    { id: "btn", component: "push-button", label: "Mode" },
    { id: "bat", component: "battery-9v", label: "9 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
  ],
  connections: [
    { from: "board.5V", to: "hall.VCC", color: "red" },
    { from: "hall.GND", to: "board.GND", color: "black" },
    { from: "hall.OUT", to: "board.D2", color: "green", note: { en: "D2 = interrupt 0", ru: "D2 = прерывание 0", kk: "D2 = 0-үзіліс" } },
    { from: "r_pu.A", to: "hall.OUT", color: "green" },
    { from: "r_pu.B", to: "board.5V", color: "red", note: { en: "pull-up: the output can only pull LOW", ru: "подтяжка: выход умеет только тянуть в LOW", kk: "тарту: шығыс тек LOW-ға тарта алады" } },
    { from: "board.5V", to: "oled.VCC", color: "red" },
    { from: "oled.GND", to: "board.GND2", color: "black" },
    { from: "oled.SDA", to: "board.A4", color: "blue" },
    { from: "oled.SCL", to: "board.A5", color: "yellow" },
    { from: "board.D4", to: "btn.1", color: "purple", note: { en: "internal pull-up", ru: "внутренняя подтяжка", kk: "ішкі тарту" } },
    { from: "btn.2", to: "board.GND", color: "black" },
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "board.VIN", color: "red", note: { en: "7–12 V input via the onboard regulator", ru: "вход 7–12 В через встроенный стабилизатор", kk: "кірістірілген реттегіш арқылы 7–12 В кіріс" } },
    { from: "bat.-", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Wire the Hall sensor with a pull-up", ru: "Подключите датчик Холла с подтяжкой", kk: "Холл датчигін тартумен қосыңыз" },
      body: {
        en: "Hold the A3144 with the printed face towards you: the legs are VCC, GND, OUT from left to right. Connect VCC to 5V, GND to GND and OUT to D2. The output is open-collector: it can pull the line LOW when a magnet is near but cannot drive it HIGH, so add a 10 kΩ resistor from OUT to 5V. D2 is interrupt 0, so not a single wheel turn is missed even while the screen is redrawing.",
        ru: "Держите A3144 надписью к себе: выводы слева направо VCC, GND, OUT. Подключите VCC к 5V, GND к GND, OUT к D2. Выход с открытым коллектором: он может притянуть линию к LOW, когда рядом магнит, но не может выдать HIGH, поэтому поставьте резистор 10 кОм от OUT к 5V. D2 это прерывание 0, так что ни один оборот колеса не потеряется, даже пока перерисовывается экран.",
        kk: "A3144-ті жазуы бар бетін өзіңізге қаратып ұстаңыз: аяқтары солдан оңға қарай VCC, GND, OUT. VCC-ті 5V-ке, GND-ті GND-ге, OUT-ты D2-ге қосыңыз. Шығыс ашық коллекторлы: магнит жақын болғанда ол желіні LOW-ға тарта алады, бірақ HIGH бере алмайды, сондықтан OUT-тан 5V-ке 10 кОм резистор қойыңыз. D2 0-үзіліс болғандықтан, экран қайта сызылып жатқанда да дөңгелектің бірде-бір айналымы жоғалмайды.",
      },
      expect: { en: "Bringing a magnet to the sensor face pulls D2 LOW (check with a multimeter or the sketch).", ru: "Если поднести магнит к лицевой стороне датчика, D2 уходит в LOW (проверьте мультиметром или скетчем).", kk: "Магнитті датчиктің бет жағына жақындатқанда D2 LOW болады (мультиметрмен немесе скетчпен тексеріңіз)." },
      mistake: { en: "Without the pull-up, OUT floats and the speed shows random numbers even with the bike standing still.", ru: "Без подтяжки OUT болтается в воздухе, и скорость показывает случайные числа даже на стоящем велосипеде.", kk: "Тартусыз OUT ауада салбырап, велосипед тұрса да жылдамдық кездейсоқ сандарды көрсетеді." },
    },
    {
      title: { en: "Connect the OLED and button", ru: "Подключите OLED и кнопку", kk: "OLED пен батырманы қосыңыз" },
      body: {
        en: "OLED: VCC to 5V, GND to GND, SDA to A4, SCL to A5. Put the button between D4 and GND. A short press steps through common wheel sizes; holding it for 3 seconds clears the trip distance and max speed. The chosen wheel size is saved in EEPROM.",
        ru: "OLED: VCC к 5V, GND к GND, SDA к A4, SCL к A5. Кнопку поставьте между D4 и GND. Короткое нажатие перебирает популярные размеры колёс, удержание 3 секунды сбрасывает пробег и максимальную скорость. Выбранный размер колеса сохраняется в EEPROM.",
        kk: "OLED: VCC 5V-ке, GND GND-ге, SDA A4-ке, SCL A5-ке. Батырманы D4 пен GND арасына қойыңыз. Қысқа басу кең тараған дөңгелек өлшемдерін ауыстырады, 3 секунд басып тұру жүрілген жол мен ең жоғары жылдамдықты нөлдейді. Таңдалған дөңгелек өлшемі EEPROM-ға сақталады.",
      },
      expect: { en: "Pressing the button shows the next wheel size for a moment.", ru: "Нажатие кнопки на мгновение показывает следующий размер колеса.", kk: "Батырманы басқанда келесі дөңгелек өлшемі бір сәтке көрсетіледі." },
      mistake: { en: "Choosing the rim size alone (\"28 inch\") instead of tyre + rim: a 25c and a 32c tyre differ by 2–3 % in circumference.", ru: "Выбор только по ободу («28 дюймов») без учёта покрышки: покрышки 25c и 32c отличаются по окружности на 2–3 %.", kk: "Тек обод бойынша («28 дюйм») таңдап, дөңгелек сыртын ескермеу: 25c пен 32c сырттарының шеңбері 2–3 %-ға өзгеше." },
    },
    {
      title: { en: "Add battery power and a switch", ru: "Добавьте питание от батарейки и выключатель", kk: "Батарея қорегі мен ажыратқышты қосыңыз" },
      body: {
        en: "Connect the 9 V battery + to the slide switch's middle pin (C) and one outer pin to the Nano's VIN. Battery − goes to GND. The Nano's regulator turns 9 V into 5 V for itself, the OLED and the sensor. The whole circuit draws about 30 mA, so a 9 V battery lasts roughly 10–15 hours of riding.",
        ru: "Подключите плюс батарейки 9 В к среднему выводу (C) движкового переключателя, а один крайний вывод к VIN Nano. Минус батарейки на GND. Стабилизатор Nano превращает 9 В в 5 В для неё самой, OLED и датчика. Вся схема берёт около 30 мА, так что «кроны» хватает примерно на 10–15 часов езды.",
        kk: "9 В батареяның плюсін сырғымалы ажыратқыштың ортаңғы шықпасына (C), ал бір шеткі шықпасын Nano-ның VIN-іне қосыңыз. Батарея минусы GND-ге барады. Nano-ның реттегіші 9 В-ты өзіне, OLED пен датчикке арналған 5 В-қа айналдырады. Бүкіл схема шамамен 30 мА тұтынады, сондықтан 9 В батарея шамамен 10–15 сағат жүруге жетеді.",
      },
      expect: { en: "Flipping the switch boots the Nano and the OLED shows 0.0 km/h.", ru: "При включении переключателя Nano загружается, а OLED показывает 0.0 km/h.", kk: "Ажыратқышты қосқанда Nano іске қосылып, OLED 0.0 km/h көрсетеді." },
      mistake: { en: "Connecting 9 V to the 5V pin bypasses the regulator and destroys the board.", ru: "Если подать 9 В на пин 5V, стабилизатор обходится, и плата сгорает.", kk: "9 В-ты 5V пиніне берсеңіз, реттегіш айналып өтіліп, плата күйеді." },
    },
    {
      title: { en: "Upload and test on the bench", ru: "Загрузите скетч и проверьте на столе", kk: "Скетчті жүктеп, үстел үстінде тексеріңіз" },
      body: {
        en: "Install \"Adafruit SSD1306\" and \"Adafruit GFX Library\", then upload. Open the Serial Monitor at 9600 baud and wave the magnet past the sensor about twice per second: with a 2.1 m wheel that reads roughly 15 km/h. Stop waving and the speed drops to 0 within 3 seconds. If nothing happens, turn the magnet over: the A3144 reacts only to the south pole facing its printed side.",
        ru: "Установите «Adafruit SSD1306» и «Adafruit GFX Library» и загрузите скетч. Откройте Serial Monitor на 9600 бод и проводите магнитом мимо датчика примерно два раза в секунду: для колеса 2,1 м это около 15 км/ч. Перестаньте, и скорость упадёт до 0 в течение 3 секунд. Если ничего не происходит, переверните магнит: A3144 реагирует только на южный полюс, обращённый к стороне с надписью.",
        kk: "«Adafruit SSD1306» және «Adafruit GFX Library» орнатып, скетчті жүктеңіз. Serial Monitor-ды 9600 бодта ашып, магнитті датчиктің жанынан секундына шамамен екі рет өткізіңіз: 2,1 м дөңгелек үшін бұл шамамен 15 км/сағ. Тоқтасаңыз, жылдамдық 3 секунд ішінде 0-ге түседі. Ештеңе болмаса, магнитті аударыңыз: A3144 тек жазуы бар жағына қаратылған оңтүстік полюске жауап береді.",
      },
      expect: { en: "Speed and distance update as you wave the magnet.", ru: "Скорость и пробег меняются, пока вы водите магнитом.", kk: "Магнитті қозғалтқанда жылдамдық пен жол жаңарады." },
      mistake: { en: "Holding the magnet still on the sensor counts only one pulse; the sensor needs the magnet to come and go.", ru: "Если держать магнит неподвижно у датчика, засчитается только один импульс: магнит должен приближаться и удаляться.", kk: "Магнитті датчик жанында қозғалтпай ұстасаңыз, тек бір импульс саналады: магнит жақындап, алыстауы керек." },
    },
    {
      title: { en: "Mount it on the bike", ru: "Установите на велосипед", kk: "Велосипедке орнатыңыз" },
      body: {
        en: "Glue or zip-tie the magnet to a front-wheel spoke near the hub. Fix the Hall sensor on the fork so the magnet passes 3–8 mm from its printed face, and protect its legs with heat-shrink. Run a 3-core cable up the fork to the handlebar box, twisting or taping it to the brake hose. Pick your wheel size with the button, then ride a known distance (for example 1 km on a map) to check the reading.",
        ru: "Приклейте или притяните стяжкой магнит к спице переднего колеса ближе к втулке. Закрепите датчик Холла на вилке так, чтобы магнит проходил в 3–8 мм от его лицевой стороны, и защитите выводы термоусадкой. Проведите трёхжильный кабель по вилке к корпусу на руле, примотав его к тормозной магистрали. Выберите кнопкой размер колеса и проедьте известное расстояние (например 1 км по карте), чтобы проверить показания.",
        kk: "Магнитті алдыңғы дөңгелектің спицасына втулкаға жақын жабыстырыңыз немесе қысқышпен бекітіңіз. Холл датчигін шанышқыға магнит оның бет жағынан 3–8 мм қашықтықта өтетіндей етіп бекітіп, аяқтарын термоотырғызғышпен қорғаңыз. Үш желілі кабельді шанышқы бойымен рульдегі қорапқа дейін тежегіш түтігіне орап тартыңыз. Батырмамен дөңгелек өлшемін таңдап, көрсеткішті тексеру үшін белгілі қашықтықты (мысалы картадағы 1 км) жүріп өтіңіз.",
      },
      expect: { en: "The trip distance agrees with the map within about 2 %.", ru: "Пробег совпадает с картой с точностью около 2 %.", kk: "Жүрілген жол картамен шамамен 2 % дәлдікпен сәйкес келеді." },
      mistake: { en: "A gap over 10 mm or a weak fridge magnet gives missed pulses and a speed that jumps around.", ru: "Зазор больше 10 мм или слабый магнит с холодильника дают пропуски импульсов и скачущую скорость.", kk: "10 мм-ден үлкен саңылау немесе тоңазытқыштың әлсіз магниті импульстерді жіберіп алып, жылдамдықты секіртеді." },
    },
  ],
  code: [{
    filename: "bike_speedometer.ino",
    language: "cpp",
    libraries: ["Adafruit SSD1306", "Adafruit GFX Library"],
    source: `#include <Wire.h>
#include <EEPROM.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

const int HALL_PIN = 2;                     // A3144 OUT, LOW while the magnet passes
const int BUTTON_PIN = 4;                   // short: next wheel size, hold 3 s: reset trip
const unsigned long MIN_PERIOD_US = 60000UL;    // ignore bounces (about 125 km/h on a 2.1 m wheel)
const unsigned long STOP_US = 3000000UL;        // no pulse for 3 s = standing still

struct Wheel { const char *name; uint16_t mm; };
const Wheel WHEELS[] = {
  {"20x1.75", 1515}, {"24x1.75", 1890}, {"26x2.0", 2055}, {"27.5x2.1", 2148},
  {"29x2.2", 2298}, {"700x25c", 2105}, {"700x32c", 2155},
};
const uint8_t WHEEL_COUNT = sizeof(WHEELS) / sizeof(WHEELS[0]);

Adafruit_SSD1306 display(128, 64, &Wire, -1);

volatile unsigned long lastPulseUs = 0;
volatile unsigned long periodUs = 0;
volatile unsigned long pulses = 0;

uint8_t wheel = 5;                          // default 700x25c
unsigned long tripStartPulses = 0;
float maxKmh = 0;
unsigned long pressedAt = 0, lastDraw = 0, lastPrint = 0, messageUntil = 0;
bool longDone = false;

void onPulse() {
  unsigned long now = micros();
  unsigned long dt = now - lastPulseUs;
  if (dt < MIN_PERIOD_US) return;          // contact bounce or noise
  periodUs = dt;
  lastPulseUs = now;
  pulses++;
}

float currentKmh(unsigned long &count) {
  noInterrupts();
  unsigned long last = lastPulseUs, period = periodUs;
  count = pulses;
  interrupts();
  unsigned long since = micros() - last;
  if (count < 2 || since > STOP_US || period > STOP_US) return 0;
  if (since > period) period = since;      // slowing down: decay smoothly
  return WHEELS[wheel].mm * 3600.0 / period;   // mm per us * 3600 = km/h
}

void showWheel() {
  Serial.print("wheel ");
  Serial.print(WHEELS[wheel].name);
  Serial.print(" = ");
  Serial.print(WHEELS[wheel].mm);
  Serial.println(" mm");
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("Wheel size");
  display.setTextSize(2);
  display.setCursor(0, 20);
  display.print(WHEELS[wheel].name);
  display.setTextSize(1);
  display.setCursor(0, 48);
  display.print(WHEELS[wheel].mm);
  display.print(" mm");
  display.display();
  messageUntil = millis() + 1500;
}

void setup() {
  Serial.begin(9600);
  pinMode(HALL_PIN, INPUT);                 // external 10k pull-up
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  uint8_t saved = EEPROM.read(0);
  if (saved < WHEEL_COUNT) wheel = saved;
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED not found");
    while (true) delay(1000);
  }
  display.setTextColor(SSD1306_WHITE);
  attachInterrupt(digitalPinToInterrupt(HALL_PIN), onPulse, FALLING);
  showWheel();
}

void loop() {
  unsigned long now = millis();

  // button: short press = next wheel, hold 3 s = reset trip
  if (digitalRead(BUTTON_PIN) == LOW) {
    if (pressedAt == 0) pressedAt = now;
    if (!longDone && now - pressedAt >= 3000) {
      noInterrupts(); tripStartPulses = pulses; interrupts();
      maxKmh = 0;
      longDone = true;
      Serial.println("trip reset");
    }
  } else if (pressedAt != 0) {
    if (!longDone && now - pressedAt >= 50) {
      wheel = (wheel + 1) % WHEEL_COUNT;
      EEPROM.update(0, wheel);
      showWheel();
    }
    pressedAt = 0;
    longDone = false;
  }

  unsigned long count;
  float kmh = currentKmh(count);
  if (kmh > maxKmh) maxKmh = kmh;
  float km = (count - tripStartPulses) * (float)WHEELS[wheel].mm / 1000000.0;

  if (now >= messageUntil && now - lastDraw >= 250) {
    lastDraw = now;
    display.clearDisplay();
    display.setTextSize(4);
    display.setCursor(0, 0);
    display.print(kmh, 1);
    display.setTextSize(1);
    display.setCursor(104, 24);
    display.print("km/h");
    display.setCursor(0, 44);
    display.print("trip ");
    display.print(km, 2);
    display.print(" km");
    display.setCursor(0, 56);
    display.print("max ");
    display.print(maxKmh, 1);
    display.print("  ");
    display.print(WHEELS[wheel].name);
    display.display();
  }

  if (now - lastPrint >= 1000) {
    lastPrint = now;
    char s[8], d[10];
    dtostrf(kmh, 4, 1, s);
    dtostrf(km, 5, 3, d);
    Serial.print(s);
    Serial.print(" km/h  ");
    Serial.print(d);
    Serial.println(" km");
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Speed stays at 0.0", ru: "Скорость всегда 0.0", kk: "Жылдамдық үнемі 0.0" },
      cause: { en: "The magnet's north pole faces the sensor, the gap is too large, or the sensor is wired backwards.", ru: "К датчику обращён северный полюс магнита, зазор слишком большой, или датчик подключён наоборот.", kk: "Датчикке магниттің солтүстік полюсі қараған, саңылау тым үлкен немесе датчик кері қосылған." },
      fix: { en: "Flip the magnet, bring it within 3–8 mm, and recheck VCC-GND-OUT with the printed face towards you.", ru: "Переверните магнит, приблизьте его на 3–8 мм и перепроверьте порядок VCC-GND-OUT, держа датчик надписью к себе.", kk: "Магнитті аударып, 3–8 мм-ге жақындатыңыз және датчикті жазуын өзіңізге қаратып ұстап, VCC-GND-OUT тәртібін қайта тексеріңіз." },
    },
    {
      symptom: { en: "Speed is double the real value", ru: "Скорость вдвое больше реальной", kk: "Жылдамдық нақтыдан екі есе көп" },
      cause: { en: "Two magnets on the wheel, or a magnet so strong it triggers twice (once per pole edge).", ru: "На колесе два магнита, или магнит настолько сильный, что срабатывает дважды (на каждом краю полюса).", kk: "Дөңгелекте екі магнит бар немесе магнит тым күшті болғаны сонша, екі рет (полюстің әр шетінде) іске қосылады." },
      fix: { en: "Use one magnet and increase the gap slightly until the Serial Monitor shows a sensible speed.", ru: "Оставьте один магнит и немного увеличьте зазор, пока Serial Monitor не покажет правдоподобную скорость.", kk: "Бір магнит қалдырып, Serial Monitor ақылға қонымды жылдамдық көрсеткенше саңылауды сәл үлкейтіңіз." },
    },
    {
      symptom: { en: "Distance is a few percent off", ru: "Пробег отличается на несколько процентов", kk: "Жол бірнеше пайызға өзгеше" },
      cause: { en: "The preset circumference does not match your tyre and pressure.", ru: "Предустановленная окружность не совпадает с вашей покрышкой и давлением.", kk: "Алдын ала орнатылған шеңбер сіздің дөңгелек сыртыңыз бен қысымға сәйкес келмейді." },
      fix: { en: "Mark the tyre, roll the bike one full turn with you sitting on it, measure the distance in mm and put it into the WHEELS table.", ru: "Отметьте покрышку, прокатите велосипед на один полный оборот, сидя на нём, измерьте расстояние в мм и впишите его в таблицу WHEELS.", kk: "Дөңгелек сыртын белгілеп, үстінде отырып велосипедті бір толық айналымға домалатыңыз, қашықтықты мм-мен өлшеп, WHEELS кестесіне жазыңыз." },
    },
    {
      symptom: { en: "The Nano resets on bumps", ru: "Nano перезагружается на кочках", kk: "Nano кедір-бұдырда қайта жүктеледі" },
      cause: { en: "Loose breadboard wires or a battery clip that loses contact.", ru: "Разболтавшиеся провода на макетке или клипса батарейки теряет контакт.", kk: "Макет тақтасындағы сымдар босаған немесе батарея қысқышы түйісуді жоғалтады." },
      fix: { en: "For the bike, solder everything on a perfboard and fix the battery with foam inside the box.", ru: "Для велосипеда спаяйте всё на макетной плате под пайку и закрепите батарейку поролоном внутри корпуса.", kk: "Велосипед үшін бәрін дәнекерлеуге арналған тақтаға жинап, батареяны қорап ішінде поролонмен бекітіңіз." },
    },
  ],
  safety: [
    { en: "Keep cables away from the spokes and brake disc and tie them down firmly. Do not look at the display instead of the road.", ru: "Держите кабели подальше от спиц и тормозного диска и надёжно закрепите их. Не смотрите на экран вместо дороги.", kk: "Кабельдерді спицалар мен тежегіш дискіден алыс ұстап, мықтап бекітіңіз. Жолдың орнына экранға қарамаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "wheel 700x25c = 2105 mm",
      " 0.0 km/h  0.000 km",
      " 9.6 km/h  0.002 km",
      "14.2 km/h  0.006 km",
      "18.9 km/h  0.011 km",
      "21.7 km/h  0.017 km",
      "23.0 km/h  0.023 km",
      "22.4 km/h  0.029 km",
      "wheel 700x32c = 2155 mm",
      "22.9 km/h  0.036 km",
      "trip reset",
      "22.6 km/h  0.006 km",
    ],
    leds: [],
  },
} satisfies GuideContent;
