import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "arduino-voltmeter",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "tools",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 11,
  xpReward: 130,
  title: {
    en: "0–25 V DC Voltmeter with LCD",
    ru: "Вольтметр постоянного тока 0–25 В с LCD",
    kk: "LCD дисплейлі 0–25 В тұрақты ток вольтметрі",
  },
  summary: {
    en: "A 100 kΩ / 10 kΩ divider scales up to 25 V DC down to a safe level for A0, and a 16×2 I²C LCD shows the voltage. You calibrate it against a multimeter so it reads within a few tens of millivolts.",
    ru: "Делитель 100 кОм / 10 кОм уменьшает до 25 В постоянного тока до безопасного уровня для A0, а LCD 16×2 по I²C показывает напряжение. Вы калибруете его по мультиметру, и он ошибается лишь на несколько десятков милливольт.",
    kk: "100 кОм / 10 кОм бөлгіш 25 В-қа дейінгі тұрақты кернеуді A0 үшін қауіпсіз деңгейге дейін азайтады, ал I²C арқылы қосылған 16×2 LCD кернеуді көрсетеді. Оны мультиметрмен калибрлейсіз, сонда қателігі бірнеше ондаған милливольт қана болады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "10-bit ADC and display driver", ru: "10-битный АЦП и управление дисплеем", kk: "10 биттік АЦТ және дисплейді басқару" } },
    { component: "resistor", qty: 2, spec: { en: "100 kΩ and 10 kΩ, 1 % metal film", ru: "100 кОм и 10 кОм, металлоплёночные 1 %", kk: "100 кОм және 10 кОм, 1 % металл қабықшалы" }, role: { en: "Input voltage divider (÷11)", ru: "Входной делитель напряжения (÷11)", kk: "Кіріс кернеу бөлгіші (÷11)" } },
    { component: "lcd-1602-i2c", qty: 1, spec: { en: "16×2, PCF8574 backpack, address 0x27 or 0x3F", ru: "16×2, плата PCF8574, адрес 0x27 или 0x3F", kk: "16×2, PCF8574 тақтасы, мекенжайы 0x27 немесе 0x3F" }, role: { en: "Voltage readout", ru: "Показ напряжения", kk: "Кернеуді көрсету" } },
    { component: "battery-9v", qty: 1, optional: true, spec: { en: "any DC source up to 25 V works", ru: "подойдёт любой источник постоянного тока до 25 В", kk: "25 В-қа дейінгі кез келген тұрақты ток көзі жарайды" }, role: { en: "Voltage to measure while testing", ru: "Измеряемое напряжение для проверки", kk: "Тексеруге арналған өлшенетін кернеу" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-female, plus two crocodile-clip probe leads (red, black)", ru: "папа-мама и два щупа с крокодилами (красный, чёрный)", kk: "аталық-аналық және қыстырғышы бар екі щуп (қызыл, қара)" }, role: { en: "Connections and probes", ru: "Соединения и щупы", kk: "Қосылыстар және щуптар" } },
  ],
  instances: [
    { id: "src", component: "battery-9v", label: "Voltage under test" },
    { id: "r_top", component: "resistor", label: "100 kΩ" },
    { id: "r_bot", component: "resistor", label: "10 kΩ" },
    { id: "lcd", component: "lcd-1602-i2c", label: "LCD 16×2" },
  ],
  connections: [
    { from: "src.+", to: "r_top.A", color: "red", note: { en: "red probe: + of the DC source, max 25 V", ru: "красный щуп: + источника, не более 25 В", kk: "қызыл щуп: көздің +, 25 В-тан аспасын" } },
    { from: "r_top.B", to: "board.A0", color: "green", note: { en: "A0 sees 1/11 of the input", ru: "на A0 приходит 1/11 входного напряжения", kk: "A0-ге кіріс кернеудің 1/11 бөлігі келеді" } },
    { from: "board.A0", to: "r_bot.A", color: "green" },
    { from: "r_bot.B", to: "board.GND", color: "black" },
    { from: "src.-", to: "board.GND2", color: "black", note: { en: "black probe: − of the source", ru: "чёрный щуп: − источника", kk: "қара щуп: көздің −" } },
    { from: "board.5V", to: "lcd.VCC", color: "red" },
    { from: "lcd.GND", to: "board.GND3", color: "black" },
    { from: "board.A4", to: "lcd.SDA", color: "blue" },
    { from: "board.A5", to: "lcd.SCL", color: "yellow" },
  ],
  steps: [
    {
      title: { en: "Understand the divider", ru: "Разберитесь с делителем", kk: "Бөлгішті түсініп алыңыз" },
      body: {
        en: "A0 can only measure 0–5 V. With 100 kΩ on top and 10 kΩ at the bottom, A0 gets 10 / (100 + 10) = 1/11 of the input, so 25 V becomes 2.27 V, well inside the safe range. The sketch multiplies back by 11. One ADC step is then about 54 mV at the input. The 110 kΩ total also means the meter draws only 0.23 mA at 25 V, so it hardly loads what you measure.",
        ru: "A0 измеряет только 0–5 В. Со 100 кОм сверху и 10 кОм снизу на A0 приходит 10 / (100 + 10) = 1/11 входного напряжения, и 25 В превращаются в 2,27 В, с большим запасом. Скетч умножает обратно на 11. Один шаг АЦП тогда равен примерно 54 мВ на входе. Общие 110 кОм означают, что при 25 В прибор потребляет всего 0,23 мА и почти не нагружает измеряемую цепь.",
        kk: "A0 тек 0–5 В-ты өлшей алады. Жоғарыда 100 кОм, төменде 10 кОм болса, A0-ге кірістің 10 / (100 + 10) = 1/11 бөлігі келеді, сонда 25 В 2,27 В-қа айналады, бұл үлкен қормен қауіпсіз. Скетч оны қайта 11-ге көбейтеді. Сонда АЦТ-ның бір қадамы кірісте шамамен 54 мВ болады. Жалпы 110 кОм болғандықтан, 25 В-та құрал небәрі 0,23 мА тұтынады және өлшенетін тізбекке әрең әсер етеді.",
      },
      expect: { en: "You know why the reading is multiplied by 11 and why 25 V is the limit.", ru: "Понятно, почему показание умножается на 11 и почему предел 25 В.", kk: "Көрсеткіштің неге 11-ге көбейтілетіні және шектің неге 25 В екені түсінікті." },
      mistake: { en: "Swapping the resistors puts 10/11 of the input on A0: 9 V would already push A0 past 5 V.", ru: "Если перепутать резисторы, на A0 придёт 10/11 входа: уже 9 В выведут A0 за 5 В.", kk: "Резисторларды шатастырсаңыз, A0-ге кірістің 10/11 бөлігі келеді: 9 В-тың өзі A0-ді 5 В-тан асырады." },
    },
    {
      title: { en: "Build the input divider", ru: "Соберите входной делитель", kk: "Кіріс бөлгішін жинаңыз" },
      body: {
        en: "Put the 100 kΩ (brown-black-yellow) and the 10 kΩ (brown-black-orange) in series. Their junction goes to A0, the free end of the 10 kΩ goes to GND. The free end of the 100 kΩ is the red probe; a second wire from GND is the black probe. Clip both probes to the 9 V battery for now.",
        ru: "Включите последовательно 100 кОм (коричневый-чёрный-жёлтый) и 10 кОм (коричневый-чёрный-оранжевый). Точку их соединения подключите к A0, свободный конец 10 кОм к GND. Свободный конец 100 кОм будет красным щупом, второй провод от GND чёрным. Пока подключите щупы к батарейке 9 В.",
        kk: "100 кОм (қоңыр-қара-сары) мен 10 кОм (қоңыр-қара-қызғылт сары) резисторларын тізбектей қосыңыз. Олардың түйіскен нүктесін A0-ге, 10 кОм-ның бос ұшын GND-ге қосыңыз. 100 кОм-ның бос ұшы қызыл щуп болады, GND-ден шыққан екінші сым қара щуп. Әзірге щуптарды 9 В батареяға қосыңыз.",
      },
      expect: { en: "Red probe → 100 kΩ → A0 → 10 kΩ → GND, and the black probe on GND.", ru: "Красный щуп → 100 кОм → A0 → 10 кОм → GND, чёрный щуп на GND.", kk: "Қызыл щуп → 100 кОм → A0 → 10 кОм → GND, қара щуп GND-де." },
      mistake: { en: "Skipping the 10 kΩ to GND leaves A0 connected to the full input voltage through 100 kΩ.", ru: "Без резистора 10 кОм к GND вход A0 получает полное входное напряжение через 100 кОм.", kk: "GND-ге 10 кОм резистор болмаса, A0 100 кОм арқылы толық кіріс кернеуін алады." },
    },
    {
      title: { en: "Connect the I²C LCD", ru: "Подключите LCD по I²C", kk: "I²C LCD-ді қосыңыз" },
      body: {
        en: "Wire the LCD backpack VCC to 5V, GND to GND, SDA to A4 and SCL to A5. If the screen lights but shows nothing (or a row of blocks), turn the small blue contrast trimmer on the backpack with a screwdriver.",
        ru: "Подключите VCC платы LCD к 5V, GND к GND, SDA к A4, SCL к A5. Если подсветка горит, а текста нет (или видны прямоугольники), покрутите отвёрткой синий подстроечник контраста на плате.",
        kk: "LCD тақтасының VCC-ін 5V-ке, GND-ін GND-ге, SDA-ны A4-ке, SCL-ды A5-ке қосыңыз. Жарығы жанып, мәтін көрінбесе (немесе тіктөртбұрыштар көрінсе), тақтадағы көк контраст реттегішін бұрағышпен бұраңыз.",
      },
      expect: { en: "The backlight turns on when the Uno is plugged in.", ru: "Подсветка включается, когда Uno подключена.", kk: "Uno қосылғанда жарығы жанады." },
      mistake: { en: "Swapping SDA and SCL gives a lit but completely blank screen.", ru: "Если перепутать SDA и SCL, подсветка горит, а экран совсем пустой.", kk: "SDA мен SCL-ды шатастырсаңыз, жарығы жанады, бірақ экран мүлдем бос болады." },
    },
    {
      title: { en: "Upload and read a voltage", ru: "Загрузите скетч и измерьте напряжение", kk: "Скетчті жүктеп, кернеуді өлшеңіз" },
      body: {
        en: "Install \"LiquidCrystal I2C\" (Frank de Brabander) and upload. The LCD shows the input voltage on the first line and the raw ADC value on the second; the Serial Monitor at 9600 baud prints the same once a second. The sketch averages 32 readings to calm the last digit. If the LCD stays empty, try address 0x3F instead of 0x27.",
        ru: "Установите «LiquidCrystal I2C» (Frank de Brabander) и загрузите скетч. В первой строке LCD показывается входное напряжение, во второй сырое значение АЦП; Serial Monitor на 9600 бод раз в секунду печатает то же самое. Скетч усредняет 32 измерения, чтобы последняя цифра не прыгала. Если LCD пустой, попробуйте адрес 0x3F вместо 0x27.",
        kk: "«LiquidCrystal I2C» (Frank de Brabander) орнатып, скетчті жүктеңіз. LCD-нің бірінші жолында кіріс кернеуі, екіншісінде АЦТ-ның өңделмеген мәні көрінеді; 9600 бодтағы Serial Monitor секундына бір рет соны шығарады. Соңғы цифр секірмеуі үшін скетч 32 өлшемнің орташасын алады. LCD бос болса, 0x27 орнына 0x3F мекенжайын қолданып көріңіз.",
      },
      expect: { en: "A fresh 9 V battery reads about 9.3–9.6 V.", ru: "Новая батарейка 9 В показывает около 9,3–9,6 В.", kk: "Жаңа 9 В батарея шамамен 9,3–9,6 В көрсетеді." },
      mistake: { en: "Probes reversed show 0.00 V: the divider cannot measure negative voltage.", ru: "Перепутанные щупы дают 0,00 В: делитель не измеряет отрицательное напряжение.", kk: "Щуптар ауысса 0,00 В көрсетеді: бөлгіш теріс кернеуді өлшей алмайды." },
    },
    {
      title: { en: "Calibrate against a multimeter", ru: "Откалибруйте по мультиметру", kk: "Мультиметрмен калибрлеңіз" },
      body: {
        en: "The ADC compares A0 against the 5V rail, and USB 5 V is rarely exactly 5.00 V. First measure between the Uno's 5V and GND pins with a multimeter and type that number into VREF. Upload, then measure the battery with the multimeter and with your voltmeter at the same time. Set CAL = multimeter reading ÷ Arduino reading (for example 9.48 / 9.41 = 1.0074) and upload again. This also absorbs the 1 % tolerance of the resistors.",
        ru: "АЦП сравнивает A0 с шиной 5V, а 5 В от USB редко ровно 5,00 В. Сначала измерьте мультиметром напряжение между пинами 5V и GND Uno и впишите его в VREF. Загрузите скетч, затем измерьте батарейку одновременно мультиметром и своим вольтметром. Задайте CAL = показание мультиметра ÷ показание Arduino (например, 9,48 / 9,41 = 1,0074) и загрузите снова. Это заодно компенсирует допуск резисторов 1 %.",
        kk: "АЦТ A0-ді 5V шинасымен салыстырады, ал USB-дің 5 В-ы сирек дәл 5,00 В болады. Алдымен мультиметрмен Uno-ның 5V және GND пиндері арасындағы кернеуді өлшеп, оны VREF-ке жазыңыз. Скетчті жүктеп, содан кейін батареяны мультиметрмен және өз вольтметріңізбен бір мезгілде өлшеңіз. CAL = мультиметр көрсеткіші ÷ Arduino көрсеткіші (мысалы, 9,48 / 9,41 = 1,0074) деп қойып, қайта жүктеңіз. Бұл резисторлардың 1 % ауытқуын да өтейді.",
      },
      expect: { en: "Both meters agree within about 0.05 V across the range.", ru: "Оба прибора совпадают в пределах примерно 0,05 В во всём диапазоне.", kk: "Екі құрал бүкіл диапазонда шамамен 0,05 В дәлдікпен сәйкес келеді." },
      mistake: { en: "Calibrating on USB and then running from a different adapter shifts VREF; recalibrate when the power source changes.", ru: "Если калибровать от USB, а потом питать от другого адаптера, VREF сместится; калибруйте заново при смене питания.", kk: "USB-ден калибрлеп, кейін басқа адаптерден қоректендірсеңіз, VREF ығысады; қуат көзі ауысқанда қайта калибрлеңіз." },
    },
  ],
  code: [{
    filename: "voltmeter_lcd.ino",
    language: "cpp",
    libraries: ["LiquidCrystal I2C"],
    source: `#include <Wire.h>
#include <LiquidCrystal_I2C.h>

const int SENSE_PIN = A0;          // middle of the 100k / 10k divider
const float R_TOP = 100000.0;      // probe side
const float R_BOTTOM = 10000.0;    // GND side
const float VREF = 5.00;           // measured voltage of the 5V pin (calibration step 1)
const float CAL = 1.000;           // multimeter / Arduino reading (calibration step 2)
const float MAX_SAFE_V = 25.0;     // design limit of this divider
const int SAMPLES = 32;

LiquidCrystal_I2C lcd(0x27, 16, 2);   // try 0x3F if the screen stays empty

unsigned long lastSerial = 0;

float readAverageRaw() {
  long sum = 0;
  for (int i = 0; i < SAMPLES; i++) {
    sum += analogRead(SENSE_PIN);
    delayMicroseconds(200);
  }
  return sum / (float)SAMPLES;
}

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("DC voltmeter");
  lcd.setCursor(0, 1);
  lcd.print("0-25 V DC only");
  Serial.println("DC voltmeter 0-25 V");
  delay(1500);
  lcd.clear();
}

void loop() {
  float raw = readAverageRaw();
  float pinVolts = raw * VREF / 1023.0;
  float inputVolts = pinVolts * (R_TOP + R_BOTTOM) / R_BOTTOM * CAL;

  lcd.setCursor(0, 0);
  lcd.print("DC ");
  if (inputVolts < 10) lcd.print(' ');
  lcd.print(inputVolts, 2);
  lcd.print(" V      ");

  lcd.setCursor(0, 1);
  if (inputVolts > MAX_SAFE_V) {
    lcd.print("!! OVER 25 V !! ");
  } else {
    lcd.print("raw ");
    lcd.print((int)(raw + 0.5));
    lcd.print("            ");
  }

  if (millis() - lastSerial >= 1000) {
    lastSerial = millis();
    Serial.print("raw=");
    Serial.print(raw, 1);
    Serial.print("  A0=");
    Serial.print(pinVolts, 3);
    Serial.print(" V  in=");
    Serial.print(inputVolts, 2);
    Serial.println(" V");
    if (inputVolts > MAX_SAFE_V) Serial.println("WARNING: above 25 V, disconnect the probes");
  }
  delay(200);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The LCD backlight is on but there is no text", ru: "Подсветка LCD горит, а текста нет", kk: "LCD жарығы жанып тұр, бірақ мәтін жоқ" },
      cause: { en: "The contrast trimmer is turned all the way, or the I²C address is 0x3F.", ru: "Подстроечник контраста выкручен до упора, или адрес I²C 0x3F.", kk: "Контраст реттегіші шетке дейін бұралған немесе I²C мекенжайы 0x3F." },
      fix: { en: "Turn the blue trimmer slowly until text appears; if it never does, change 0x27 to 0x3F.", ru: "Медленно крутите синий подстроечник, пока не появится текст; если не появляется, замените 0x27 на 0x3F.", kk: "Мәтін пайда болғанша көк реттегішті баяу бұраңыз; пайда болмаса, 0x27-ні 0x3F-ке ауыстырыңыз." },
    },
    {
      symptom: { en: "It shows a few hundred millivolts with the probes open", ru: "При разомкнутых щупах показывает несколько сотен милливольт", kk: "Щуптар ашық тұрғанда бірнеше жүз милливольт көрсетеді" },
      cause: { en: "The 10 kΩ to GND is missing, so A0 floats.", ru: "Нет резистора 10 кОм на GND, и A0 «висит в воздухе».", kk: "GND-ге 10 кОм резистор жоқ, сондықтан A0 қалқып тұр." },
      fix: { en: "Check the 10 kΩ sits between the A0 row and GND; open probes should read 0.00 V.", ru: "Проверьте, что 10 кОм стоит между рядом A0 и GND; с разомкнутыми щупами должно быть 0,00 В.", kk: "10 кОм A0 қатары мен GND арасында тұрғанын тексеріңіз; ашық щуптармен 0,00 В болуы керек." },
    },
    {
      symptom: { en: "The reading is a steady few percent off", ru: "Показания стабильно отличаются на несколько процентов", kk: "Көрсеткіш тұрақты түрде бірнеше пайызға ауытқиды" },
      cause: { en: "VREF does not match the real 5 V rail, or the resistors are 5 % types.", ru: "VREF не совпадает с реальной шиной 5 В, или резисторы с допуском 5 %.", kk: "VREF нақты 5 В шинасына сәйкес емес немесе резисторлар 5 % ауытқулы." },
      fix: { en: "Repeat both calibration steps: set VREF from the 5V pin, then CAL from a known voltage near the middle of the range.", ru: "Повторите оба шага калибровки: VREF по пину 5V, затем CAL по известному напряжению в середине диапазона.", kk: "Калибрлеудің екі қадамын қайталаңыз: 5V пині бойынша VREF, содан кейін диапазон ортасындағы белгілі кернеу бойынша CAL." },
    },
  ],
  safety: [
    { en: "DC low voltage only: never connect the probes to mains, AC adapters' AC side or anything above 25 V.", ru: "Только низкое постоянное напряжение: никогда не подключайте щупы к сети, к стороне переменного тока адаптеров и ко всему, что выше 25 В.", kk: "Тек төмен тұрақты кернеу: щуптарды ешқашан электр желісіне, адаптерлердің айнымалы ток жағына және 25 В-тан жоғары кез келген нәрсеге қоспаңыз." },
    { en: "The black probe is the Arduino GND, which is tied to your computer's ground through USB. Measure only floating sources such as batteries and adapters, never between two points of an unrelated grounded circuit.", ru: "Чёрный щуп это GND Arduino, который через USB соединён с землёй компьютера. Измеряйте только изолированные источники, например батарейки и адаптеры, и никогда между двумя точками чужой заземлённой схемы.", kk: "Қара щуп Arduino GND-і, ол USB арқылы компьютердің жерімен жалғанған. Тек батареялар мен адаптерлер сияқты оқшауланған көздерді өлшеңіз, ешқашан басқа жерге тұйықталған тізбектің екі нүктесі арасын өлшемеңіз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["DC voltmeter 0-25 V", "raw=176.5  A0=0.863 V  in=9.49 V", "raw=176.3  A0=0.862 V  in=9.48 V", "raw=0.0  A0=0.000 V  in=0.00 V", "raw=225.9  A0=1.104 V  in=12.15 V", "raw=372.0  A0=1.818 V  in=20.00 V"],
    leds: [],
  },
} satisfies GuideContent;
