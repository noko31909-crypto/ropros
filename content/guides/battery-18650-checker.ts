import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "battery-18650-checker",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "energy",
  robotics: false,
  difficulty: "beginner",
  hours: 1,
  costUsd: 10,
  xpReward: 140,
  title: {
    en: "18650 Battery Checker",
    ru: "Тестер аккумуляторов 18650",
    kk: "18650 аккумулятор тексергіші",
  },
  summary: {
    en: "Drop an 18650 cell into the holder and an OLED shows its voltage and charge in percent, read from a real Li-ion discharge curve and measured against the Nano's internal reference.",
    ru: "Вставьте элемент 18650 в держатель, и OLED покажет его напряжение и заряд в процентах по реальной кривой разряда Li-ion, измеренные относительно внутреннего опорного напряжения Nano.",
    kk: "18650 элементін ұстағышқа салыңыз, сонда OLED оның кернеуі мен зарядын пайызбен көрсетеді: нақты Li-ion разряд қисығы бойынша, Nano-ның ішкі тірек кернеуіне қатысты өлшеп.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V, USB powered", ru: "ATmega328P, 5 В, питание от USB", kk: "ATmega328P, 5 В, USB қуаты" }, role: { en: "Measures the cell and drives the screen", ru: "Измеряет элемент и управляет экраном", kk: "Элементті өлшейді және экранды басқарады" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C 0x3C", ru: "0,96\" 128×64, I²C 0x3C", kk: "0,96\" 128×64, I²C 0x3C" }, role: { en: "Shows %, voltage and a battery bar", ru: "Показывает %, напряжение и шкалу заряда", kk: "%, кернеу және заряд шкаласын көрсетеді" } },
    { component: "battery-18650", qty: 1, spec: { en: "the cell to test, in a 1-slot holder with leads", ru: "проверяемый элемент в держателе на 1 ячейку с проводами", kk: "тексерілетін элемент, сымдары бар 1 ұялы ұстағышта" }, role: { en: "Device under test", ru: "Проверяемый элемент", kk: "Тексерілетін элемент" } },
    { component: "resistor", qty: 2, spec: { en: "10 kΩ and 1 MΩ, ¼ W", ru: "10 кОм и 1 МОм, ¼ Вт", kk: "10 кОм және 1 МОм, ¼ Вт" }, role: { en: "Pin protection and pull-down for an empty holder", ru: "Защита пина и подтяжка к земле для пустого держателя", kk: "Пинді қорғау және бос ұстағыш үшін жерге тарту" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "oled", component: "oled-ssd1306", label: "OLED 128×64" },
    { id: "bat", component: "battery-18650", label: "Cell under test" },
    { id: "r_s", component: "resistor", label: "10 kΩ" },
    { id: "r_pd", component: "resistor", label: "1 MΩ" },
  ],
  connections: [
    { from: "board.5V", to: "oled.VCC", color: "red" },
    { from: "oled.GND", to: "board.GND", color: "black" },
    { from: "oled.SDA", to: "board.A4", color: "blue" },
    { from: "oled.SCL", to: "board.A5", color: "yellow" },
    { from: "bat.+", to: "r_s.A", color: "red", note: { en: "max 4.2 V: one Li-ion cell only", ru: "макс. 4,2 В: только один Li-ion элемент", kk: "ең көбі 4,2 В: тек бір Li-ion элементі" } },
    { from: "r_s.B", to: "board.A0", color: "orange", note: { en: "10 kΩ limits current if the cell is reversed", ru: "10 кОм ограничивает ток при обратной полярности", kk: "10 кОм полярлық кері болса токты шектейді" } },
    { from: "board.A0", to: "r_pd.A", color: "orange" },
    { from: "r_pd.B", to: "board.GND2", color: "black", note: { en: "reads 0 V when the holder is empty", ru: "даёт 0 В при пустом держателе", kk: "ұстағыш бос болғанда 0 В береді" } },
    { from: "bat.-", to: "board.GND", color: "black" },
  ],
  steps: [
    {
      title: { en: "Why no voltage divider?", ru: "Почему без делителя напряжения?", kk: "Неге кернеу бөлгішсіз?" },
      body: {
        en: "The Nano's ADC measures 0 V up to its supply voltage, about 5 V. A single Li-ion cell never goes above 4.2 V, so it fits inside that range and A0 can read it directly with full resolution (about 5 mV per step). A divider would only throw away resolution. This changes on a 3.3 V board like an ESP32, or with two cells in series (8.4 V): then a divider is mandatory.",
        ru: "АЦП Nano измеряет от 0 В до своего питания, около 5 В. Один Li-ion элемент никогда не превышает 4,2 В, поэтому укладывается в этот диапазон, и A0 читает его напрямую с полным разрешением (около 5 мВ на шаг). Делитель только потерял бы точность. Всё меняется на плате 3,3 В вроде ESP32 или с двумя элементами последовательно (8,4 В): тогда делитель обязателен.",
        kk: "Nano-ның АЦТ-сы 0 В-тан өз қорегіне дейін, шамамен 5 В-қа дейін өлшейді. Бір Li-ion элементі ешқашан 4,2 В-тан аспайды, сондықтан осы ауқымға сыяды, ал A0 оны толық ажыратымдылықпен (бір қадамға шамамен 5 мВ) тікелей оқиды. Бөлгіш тек дәлдікті жоғалтар еді. ESP32 сияқты 3,3 В платада немесе тізбектей қосылған екі элементте (8,4 В) жағдай өзгереді: онда бөлгіш міндетті.",
      },
      expect: { en: "You know the limit: one cell, 4.2 V max, 5 V board.", ru: "Вы знаете предел: один элемент, максимум 4,2 В, плата 5 В.", kk: "Шекті білесіз: бір элемент, ең көбі 4,2 В, 5 В плата." },
      mistake: { en: "Testing a 2S pack or a 9 V battery on this circuit puts more than 5 V on A0.", ru: "Проверка сборки 2S или батарейки 9 В на этой схеме подаёт на A0 больше 5 В.", kk: "Бұл схемада 2S жинағын немесе 9 В батареяны тексеру A0-ге 5 В-тан көп кернеу береді." },
    },
    {
      title: { en: "Connect the OLED", ru: "Подключите OLED", kk: "OLED-ті қосыңыз" },
      body: {
        en: "Wire the OLED VCC to 5V and GND to GND. SDA goes to A4 and SCL to A5, the Nano's I²C pins. Most 0.96\" modules use address 0x3C; a few use 0x3D.",
        ru: "Подключите VCC OLED к 5V, GND к GND. SDA идёт на A4, SCL на A5: это пины I²C у Nano. Большинство модулей 0,96\" используют адрес 0x3C, некоторые 0x3D.",
        kk: "OLED-тің VCC-ін 5V-ке, GND-ін GND-ге қосыңыз. SDA A4-ке, SCL A5-ке барады: бұл Nano-ның I²C пиндері. 0,96\" модульдердің көбі 0x3C мекенжайын, кейбіреуі 0x3D пайдаланады.",
      },
      expect: { en: "Four wires between the OLED and the Nano.", ru: "Четыре провода между OLED и Nano.", kk: "OLED пен Nano арасында төрт сым." },
      mistake: { en: "Some OLED boards print the pins as GND-VCC-SCL-SDA and others VCC-GND-SCL-SDA: read the labels, not the position.", ru: "На одних OLED порядок GND-VCC-SCL-SDA, на других VCC-GND-SCL-SDA: смотрите на подписи, а не на положение.", kk: "Кейбір OLED-те тәртіп GND-VCC-SCL-SDA, басқаларында VCC-GND-SCL-SDA: орнына емес, жазуына қараңыз." },
    },
    {
      title: { en: "Wire the cell holder", ru: "Подключите держатель элемента", kk: "Элемент ұстағышын қосыңыз" },
      body: {
        en: "Connect the holder's − lead to GND. The + lead goes through a 10 kΩ resistor to A0. Then add a 1 MΩ resistor from A0 to GND. The 10 kΩ protects the pin if a cell goes in backwards or the Nano is unplugged while a cell sits in the holder. The 1 MΩ pulls A0 to 0 V when the holder is empty so the screen says \"Insert cell\" instead of random numbers; the sketch corrects for the tiny 1 % divider it creates.",
        ru: "Подключите минус держателя к GND. Плюс идёт через резистор 10 кОм на A0. Затем поставьте резистор 1 МОм от A0 к GND. 10 кОм защищают пин, если элемент вставлен наоборот или Nano отключена, а элемент остался в держателе. 1 МОм притягивает A0 к 0 В при пустом держателе, и экран пишет «Insert cell» вместо случайных чисел; скетч учитывает крошечный делитель на 1 %, который при этом получается.",
        kk: "Ұстағыштың минусын GND-ге қосыңыз. Плюсі 10 кОм резистор арқылы A0-ге барады. Содан кейін A0-ден GND-ге 1 МОм резистор қойыңыз. 10 кОм элемент кері салынса немесе Nano ажыратылып, элемент ұстағышта қалса, пинді қорғайды. 1 МОм ұстағыш бос болғанда A0-ді 0 В-қа тартады, сонда экран кездейсоқ сандардың орнына «Insert cell» деп жазады; скетч осыдан пайда болатын 1 %-дық кішкентай бөлгішті ескереді.",
      },
      expect: { en: "Holder − on GND, + through 10 kΩ to A0, 1 MΩ from A0 to GND.", ru: "Минус держателя на GND, плюс через 10 кОм на A0, 1 МОм от A0 к GND.", kk: "Ұстағыш минусы GND-де, плюсі 10 кОм арқылы A0-де, A0-ден GND-ге 1 МОм." },
      mistake: { en: "Mixing up the resistors (1 MΩ in series, 10 kΩ to GND) makes every cell read about 0.05 V.", ru: "Если перепутать резисторы (1 МОм последовательно, 10 кОм на землю), любой элемент покажет около 0,05 В.", kk: "Резисторларды шатастырсаңыз (1 МОм тізбектей, 10 кОм жерге), кез келген элемент шамамен 0,05 В көрсетеді." },
    },
    {
      title: { en: "Upload the sketch", ru: "Загрузите скетч", kk: "Скетчті жүктеңіз" },
      body: {
        en: "Install \"Adafruit SSD1306\" and \"Adafruit GFX Library\" from the Library Manager. Select Arduino Nano (choose the \"Old Bootloader\" processor if the upload times out) and upload. The sketch first measures the Nano's real supply voltage against the chip's internal 1.1 V reference, then reads A0 32 times and averages. That way the reading stays correct whether USB gives you 4.7 V or 5.1 V.",
        ru: "Установите «Adafruit SSD1306» и «Adafruit GFX Library» через менеджер библиотек. Выберите Arduino Nano (если загрузка зависает, процессор «Old Bootloader») и загрузите. Скетч сначала измеряет реальное питание Nano относительно встроенного опорного 1,1 В, затем читает A0 32 раза и усредняет. Так показания верны, даёт ли USB 4,7 В или 5,1 В.",
        kk: "Кітапханалар менеджерінен «Adafruit SSD1306» және «Adafruit GFX Library» орнатыңыз. Arduino Nano таңдап (жүктеу тұрып қалса, «Old Bootloader» процессорын), жүктеңіз. Скетч алдымен Nano-ның нақты қорек кернеуін чиптің ішкі 1,1 В тірек кернеуіне қатысты өлшейді, содан кейін A0-ді 32 рет оқып, орташасын алады. Осылайша USB 4,7 В берсе де, 5,1 В берсе де көрсеткіш дұрыс болады.",
      },
      expect: { en: "With an empty holder the OLED shows \"Insert cell\".", ru: "При пустом держателе OLED показывает «Insert cell».", kk: "Ұстағыш бос болғанда OLED «Insert cell» көрсетеді." },
      mistake: { en: "A black screen after upload usually means address 0x3D: change OLED_ADDR in the sketch.", ru: "Чёрный экран после загрузки обычно означает адрес 0x3D: поменяйте OLED_ADDR в скетче.", kk: "Жүктегеннен кейінгі қара экран әдетте 0x3D мекенжайын білдіреді: скетчтегі OLED_ADDR-ді өзгертіңіз." },
    },
    {
      title: { en: "Calibrate once with a multimeter", ru: "Один раз откалибруйте мультиметром", kk: "Мультиметрмен бір рет калибрлеңіз" },
      body: {
        en: "The internal reference is 1.1 V nominal but varies by up to ±10 % between chips. Open the Serial Monitor at 9600 baud and note the \"Vcc\" value, then measure the 5V pin to GND with a multimeter. Set BANDGAP_MV = 1100 × meter ÷ reported (for example 1100 × 4.96 ÷ 5.08 ≈ 1074) and upload again.",
        ru: "Встроенное опорное напряжение номинально 1,1 В, но от чипа к чипу отличается до ±10 %. Откройте Serial Monitor на 9600 бод и запишите значение «Vcc», затем измерьте мультиметром напряжение между пинами 5V и GND. Поставьте BANDGAP_MV = 1100 × мультиметр ÷ показание (например 1100 × 4,96 ÷ 5,08 ≈ 1074) и загрузите заново.",
        kk: "Ішкі тірек кернеуі номиналда 1,1 В, бірақ чиптен чипке ±10 %-ға дейін өзгереді. Serial Monitor-ды 9600 бодта ашып, «Vcc» мәнін жазып алыңыз, содан кейін мультиметрмен 5V пен GND пиндерінің арасын өлшеңіз. BANDGAP_MV = 1100 × мультиметр ÷ көрсеткіш деп қойыңыз (мысалы 1100 × 4,96 ÷ 5,08 ≈ 1074) және қайта жүктеңіз.",
      },
      expect: { en: "The cell voltage on the OLED matches the multimeter within about 20 mV.", ru: "Напряжение элемента на OLED совпадает с мультиметром с точностью около 20 мВ.", kk: "OLED-тегі элемент кернеуі мультиметрмен шамамен 20 мВ дәлдікпен сәйкес келеді." },
      mistake: { en: "Skipping calibration can shift every reading by 0.1–0.3 V, which is 10–30 % on the charge scale.", ru: "Без калибровки все показания могут сместиться на 0,1–0,3 В, а это 10–30 % на шкале заряда.", kk: "Калибрлемесеңіз, барлық көрсеткіш 0,1–0,3 В-қа ығысуы мүмкін, бұл заряд шкаласында 10–30 %." },
    },
    {
      title: { en: "Read a cell the right way", ru: "Правильно измерьте элемент", kk: "Элементті дұрыс өлшеңіз" },
      body: {
        en: "The percentage comes from the resting voltage, so let a cell sit for at least 30 minutes after charging or use before testing. Insert it and wait two seconds for the average to settle. Below 2.5 V the screen warns that the cell is deeply discharged: such cells should be recharged slowly or recycled.",
        ru: "Процент считается по напряжению покоя, поэтому дайте элементу полежать хотя бы 30 минут после зарядки или работы. Вставьте его и подождите две секунды, пока усреднение успокоится. Ниже 2,5 В экран предупредит о глубоком разряде: такие элементы заряжают медленно или сдают в переработку.",
        kk: "Пайыз тыныштық кернеуі бойынша есептеледі, сондықтан зарядтағаннан немесе жұмыстан кейін элементті кемінде 30 минут қалдырыңыз. Оны салып, орташа мән тұрақталғанша екі секунд күтіңіз. 2,5 В-тан төмен болса, экран терең разряд туралы ескертеді: мұндай элементтер баяу зарядталады немесе қайта өңдеуге тапсырылады.",
      },
      expect: { en: "A fresh-off-the-charger cell shows about 95–100 %, a flat one near 0 %.", ru: "Только что заряженный элемент показывает около 95–100 %, разряженный около 0 %.", kk: "Жаңа зарядталған элемент шамамен 95–100 %, разрядталғаны 0 %-ға жуық көрсетеді." },
      mistake: { en: "Testing right after charging shows 100 % even for a worn cell; the surface charge fades within the hour.", ru: "Сразу после зарядки даже изношенный элемент покажет 100 %: поверхностный заряд уходит в течение часа.", kk: "Зарядтағаннан кейін бірден тексерсеңіз, тозған элемент те 100 % көрсетеді: беттік заряд бір сағат ішінде кетеді." },
    },
  ],
  code: [{
    filename: "battery_checker.ino",
    language: "cpp",
    libraries: ["Adafruit SSD1306", "Adafruit GFX Library"],
    source: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

const int BATTERY_PIN = A0;
const float R_SERIES = 10000.0;        // cell + to A0
const float R_PULLDOWN = 1000000.0;    // A0 to GND
const long BANDGAP_MV = 1100;          // calibrate with a multimeter (step 5)
const int SAMPLES = 32;
const uint8_t OLED_ADDR = 0x3C;        // some modules use 0x3D

Adafruit_SSD1306 display(128, 64, &Wire, -1);

// typical resting voltage of a Li-ion 18650 versus state of charge
const int CURVE_LEN = 12;
const int CURVE_MV[CURVE_LEN]  = {3270, 3610, 3690, 3730, 3770, 3800, 3840, 3870, 3950, 4020, 4110, 4200};
const int CURVE_PCT[CURVE_LEN] = {   0,    5,   10,   20,   30,   40,   50,   60,   70,   80,   90,  100};

float smoothMv = 0;
unsigned long lastPrint = 0;

// measure AVcc against the internal 1.1 V bandgap
long readVccMv() {
  ADMUX = _BV(REFS0) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);
  delay(2);                            // let the reference settle
  ADCSRA |= _BV(ADSC);
  while (bit_is_set(ADCSRA, ADSC)) {}
  long raw = ADC;
  if (raw == 0) return 5000;
  return BANDGAP_MV * 1023L / raw;
}

float readCellMv(long vccMv) {
  analogRead(BATTERY_PIN);             // throw away the first reading after the mux change
  long sum = 0;
  for (int i = 0; i < SAMPLES; i++) sum += analogRead(BATTERY_PIN);
  float pinMv = (sum / (float)SAMPLES) * vccMv / 1023.0;
  return pinMv * (R_SERIES + R_PULLDOWN) / R_PULLDOWN;
}

int percentFromMv(float mv) {
  if (mv <= CURVE_MV[0]) return 0;
  if (mv >= CURVE_MV[CURVE_LEN - 1]) return 100;
  for (int i = 1; i < CURVE_LEN; i++) {
    if (mv <= CURVE_MV[i]) {
      float t = (mv - CURVE_MV[i - 1]) / (float)(CURVE_MV[i] - CURVE_MV[i - 1]);
      return CURVE_PCT[i - 1] + (int)(t * (CURVE_PCT[i] - CURVE_PCT[i - 1]) + 0.5);
    }
  }
  return 100;
}

void showMessage(const char *top, const char *bottom) {
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0, 8);
  display.print(top);
  display.setTextSize(1);
  display.setCursor(0, 40);
  display.print(bottom);
  display.display();
}

void showCell(float mv, int pct) {
  display.clearDisplay();
  display.setTextSize(3);
  display.setCursor(0, 0);
  display.print(pct);
  display.print('%');
  display.setTextSize(2);
  display.setCursor(0, 30);
  display.print(mv / 1000.0, 2);
  display.print(" V");
  display.drawRect(0, 52, 120, 12, SSD1306_WHITE);
  display.fillRect(120, 55, 4, 6, SSD1306_WHITE);
  display.fillRect(2, 54, (116L * pct) / 100, 8, SSD1306_WHITE);
  display.display();
}

void setup() {
  Serial.begin(9600);
  if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR)) {
    Serial.println("OLED not found");
    while (true) delay(1000);
  }
  display.setTextColor(SSD1306_WHITE);
  showMessage("18650", "checker ready");
  delay(800);
}

void loop() {
  long vcc = readVccMv();
  float mv = readCellMv(vcc);

  // fast jump when a cell is inserted or removed, smooth otherwise
  if (fabs(mv - smoothMv) > 300) smoothMv = mv;
  else smoothMv = smoothMv * 0.8 + mv * 0.2;

  int pct = percentFromMv(smoothMv);
  if (smoothMv < 500) showMessage("Insert", "cell (max 4.2 V)");
  else if (smoothMv < 2500) showMessage("DEEP", "discharged: charge slowly");
  else if (smoothMv > 4300) showMessage("> 4.3 V", "not a single Li-ion?");
  else showCell(smoothMv, pct);

  if (millis() - lastPrint >= 1000) {
    lastPrint = millis();
    Serial.print("Vcc ");
    Serial.print(vcc / 1000.0, 2);
    Serial.print(" V, cell ");
    Serial.print(smoothMv / 1000.0, 2);
    Serial.print(" V, ");
    Serial.print(pct);
    Serial.println(" %");
  }
  delay(200);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Reading is 0.1–0.3 V off from the multimeter", ru: "Показания отличаются от мультиметра на 0,1–0,3 В", kk: "Көрсеткіш мультиметрден 0,1–0,3 В-қа өзгеше" },
      cause: { en: "The internal 1.1 V reference of your chip is not exactly 1.1 V.", ru: "Встроенное опорное 1,1 В вашего чипа не ровно 1,1 В.", kk: "Сіздің чиптің ішкі 1,1 В тірек кернеуі дәл 1,1 В емес." },
      fix: { en: "Do the calibration step: compute BANDGAP_MV from the Vcc printed in the Serial Monitor and the 5V pin voltage on a multimeter.", ru: "Выполните шаг калибровки: вычислите BANDGAP_MV по значению Vcc из Serial Monitor и напряжению пина 5V на мультиметре.", kk: "Калибрлеу қадамын орындаңыз: BANDGAP_MV-ті Serial Monitor-дағы Vcc мәні мен мультиметрдегі 5V пинінің кернеуі бойынша есептеңіз." },
    },
    {
      symptom: { en: "Numbers jump when you touch the cell", ru: "Цифры скачут, если тронуть элемент", kk: "Элементке тигенде сандар секіреді" },
      cause: { en: "Weak springs or thin leads in a cheap holder make a poor contact.", ru: "Слабые пружины или тонкие провода дешёвого держателя дают плохой контакт.", kk: "Арзан ұстағыштың әлсіз серіппелері немесе жіңішке сымдары нашар түйіседі." },
      fix: { en: "Stretch the springs slightly, push the leads fully into the breadboard, or solder them to header pins.", ru: "Слегка растяните пружины, вставьте провода в макетку до упора или припаяйте их к штырькам.", kk: "Серіппелерді сәл созыңыз, сымдарды макет тақтасына соңына дейін кіргізіңіз немесе түйреуіштерге дәнекерлеңіз." },
    },
    {
      symptom: { en: "Every cell shows 100 % right after charging", ru: "Любой элемент показывает 100 % сразу после зарядки", kk: "Кез келген элемент зарядтағаннан кейін бірден 100 % көрсетеді" },
      cause: { en: "Surface charge: a cell reads high for a while after the charger lets go.", ru: "Поверхностный заряд: какое-то время после зарядки напряжение завышено.", kk: "Беттік заряд: зарядтаудан кейін біраз уақыт кернеу жоғары болады." },
      fix: { en: "Wait 30–60 minutes before testing; the table assumes a rested cell.", ru: "Подождите 30–60 минут перед проверкой: таблица рассчитана на элемент в покое.", kk: "Тексерер алдында 30–60 минут күтіңіз: кесте тыныштықтағы элементке арналған." },
    },
    {
      symptom: { en: "OLED stays black", ru: "OLED остаётся чёрным", kk: "OLED қара күйінде қалады" },
      cause: { en: "Wrong I²C address or SDA/SCL swapped; the Serial Monitor shows \"OLED not found\".", ru: "Неверный адрес I²C или перепутаны SDA/SCL; в Serial Monitor «OLED not found».", kk: "I²C мекенжайы қате немесе SDA/SCL ауысқан; Serial Monitor-да «OLED not found»." },
      fix: { en: "Check SDA→A4, SCL→A5 and try OLED_ADDR = 0x3D.", ru: "Проверьте SDA→A4, SCL→A5 и попробуйте OLED_ADDR = 0x3D.", kk: "SDA→A4, SCL→A5 тексеріп, OLED_ADDR = 0x3D қойып көріңіз." },
    },
  ],
  safety: [
    { en: "Test one Li-ion cell at a time (max 4.2 V). Two cells in series or a 9 V battery exceed the 5 V the pin can take.", ru: "Проверяйте по одному Li-ion элементу (макс. 4,2 В). Два элемента последовательно или батарейка 9 В превышают допустимые для пина 5 В.", kk: "Бір уақытта бір Li-ion элементін тексеріңіз (ең көбі 4,2 В). Тізбектей екі элемент немесе 9 В батарея пин көтеретін 5 В-тан асады." },
    { en: "Never short an 18650: it can deliver tens of amps and get hot enough to burn. Recycle swollen, dented or hot cells instead of testing them.", ru: "Никогда не замыкайте 18650: он отдаёт десятки ампер и может нагреться до ожога. Вздутые, помятые или горячие элементы не проверяйте, а сдайте в переработку.", kk: "18650-ді ешқашан тұйықтамаңыз: ол ондаған ампер беріп, күйдіретіндей қызуы мүмкін. Ісінген, мыжылған немесе ыстық элементтерді тексермей, қайта өңдеуге тапсырыңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "Vcc 4.98 V, cell 0.00 V, 0 %",
      "Vcc 4.98 V, cell 0.00 V, 0 %",
      "Vcc 4.97 V, cell 3.86 V, 57 %",
      "Vcc 4.97 V, cell 3.86 V, 57 %",
      "Vcc 4.97 V, cell 3.87 V, 60 %",
      "Vcc 4.98 V, cell 3.87 V, 60 %",
      "Vcc 4.98 V, cell 0.00 V, 0 %",
      "Vcc 4.97 V, cell 4.12 V, 91 %",
      "Vcc 4.97 V, cell 4.12 V, 91 %",
    ],
    leds: [],
  },
} satisfies GuideContent;
