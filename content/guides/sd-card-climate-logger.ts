import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "sd-card-climate-logger",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "sensors",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 15,
  xpReward: 240,
  title: {
    en: "SD Card Climate Logger",
    ru: "Логгер климата на SD-карту",
    kk: "SD картаға климат жазғышы",
  },
  summary: {
    en: "Every minute the Uno reads temperature and humidity from a DHT22, stamps the row with the date and time from a DS3231 clock and appends it to a CSV file on a microSD card that opens straight in Excel or Google Sheets.",
    ru: "Каждую минуту Uno читает температуру и влажность с DHT22, ставит дату и время с часов DS3231 и дописывает строку в CSV-файл на microSD-карте, который сразу открывается в Excel или Google Таблицах.",
    kk: "Uno әр минут сайын DHT22-ден температура мен ылғалдылықты оқып, DS3231 сағатынан күн мен уақытты қойып, жолды microSD картадағы CSV файлына қосады, ол Excel немесе Google Sheets-те бірден ашылады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB or 9 V adapter", ru: "логика 5 В, USB или адаптер 9 В", kk: "5 В логика, USB немесе 9 В адаптер" }, role: { en: "Reads sensors, writes the file", ru: "Читает датчики, пишет файл", kk: "Датчиктерді оқиды, файлды жазады" } },
    { component: "dht22", qty: 1, spec: { en: "AM2302 3-pin module, ±0.5 °C, ±2 % RH", ru: "модуль AM2302 на 3 вывода, ±0,5 °C, ±2 % RH", kk: "3 шықпалы AM2302 модулі, ±0,5 °C, ±2 % RH" }, role: { en: "Temperature and humidity", ru: "Температура и влажность", kk: "Температура мен ылғалдылық" } },
    { component: "rtc-ds3231", qty: 1, spec: { en: "ZS-042 board with CR2032 (see safety)", ru: "плата ZS-042 с CR2032 (см. безопасность)", kk: "CR2032 бар ZS-042 платасы (қауіпсіздікті қараңыз)" }, role: { en: "Keeps the date and time, even unpowered", ru: "Хранит дату и время даже без питания", kk: "Қуатсыз да күн мен уақытты сақтайды" } },
    { component: "sd-card-module", qty: 1, spec: { en: "5 V microSD module with regulator and level shifter + FAT32 card ≤ 32 GB", ru: "модуль microSD на 5 В со стабилизатором и преобразователем уровней + карта FAT32 до 32 ГБ", kk: "реттегіші мен деңгей түрлендіргіші бар 5 В microSD модулі + 32 ГБ-қа дейінгі FAT32 карта" }, role: { en: "Stores the CSV log", ru: "Хранит CSV-журнал", kk: "CSV журналын сақтайды" } },
    { component: "led", qty: 1, spec: { en: "5 mm green", ru: "5 мм зелёный", kk: "5 мм жасыл" }, role: { en: "Blinks on every saved row", ru: "Мигает на каждой записанной строке", kk: "Әр жазылған жолда жыпылықтайды" } },
    { component: "resistor", qty: 1, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиода", kk: "Жарық диоды тогын шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "full size", ru: "полноразмерная", kk: "толық өлшемді" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 20, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "dht", component: "dht22", label: "DHT22" },
    { id: "rtc", component: "rtc-ds3231", label: "DS3231" },
    { id: "sd", component: "sd-card-module", label: "microSD" },
    { id: "r1", component: "resistor", label: "220 Ω" },
    { id: "led_rec", component: "led", label: "REC" },
  ],
  connections: [
    { from: "board.5V", to: "dht.VCC", color: "red" },
    { from: "dht.GND", to: "board.GND", color: "black" },
    { from: "dht.DATA", to: "board.D2", color: "green", note: { en: "pull-up is on the module", ru: "подтяжка уже на модуле", kk: "тарту модульде бар" } },
    { from: "board.5V", to: "rtc.VCC", color: "red" },
    { from: "rtc.GND", to: "board.GND2", color: "black" },
    { from: "rtc.SDA", to: "board.A4", color: "blue" },
    { from: "rtc.SCL", to: "board.A5", color: "yellow" },
    { from: "board.5V", to: "sd.VCC", color: "red", note: { en: "5 V module: never 3V3", ru: "модуль на 5 В: не 3V3", kk: "5 В модуль: 3V3 емес" } },
    { from: "sd.GND", to: "board.GND3", color: "black" },
    { from: "sd.CS", to: "board.D10", color: "orange" },
    { from: "sd.MOSI", to: "board.D11", color: "purple" },
    { from: "sd.MISO", to: "board.D12", color: "gray", note: { en: "3.3 V output, read as HIGH by the Uno", ru: "выход 3,3 В, Uno читает его как HIGH", kk: "3,3 В шығыс, Uno оны HIGH деп оқиды" } },
    { from: "sd.SCK", to: "board.D13", color: "brown" },
    { from: "board.D7", to: "r1.A", color: "green" },
    { from: "r1.B", to: "led_rec.A", color: "green" },
    { from: "led_rec.K", to: "board.GND", color: "black" },
  ],
  steps: [
    {
      title: { en: "Check your SD module type", ru: "Проверьте тип SD-модуля", kk: "SD модулінің түрін тексеріңіз" },
      body: {
        en: "SD cards run at 3.3 V only. This guide uses the common 6-pin 5 V module that carries its own 3.3 V regulator and a 74LVC125A level shifter, so it takes 5 V on VCC and 5 V signals from the Uno. Bare adapters without those chips must be powered from 3V3 and need level shifting on CS, MOSI and SCK; do not use them in this circuit. Format the card as FAT32 (cards up to 32 GB; 64 GB exFAT cards are not supported by the SD library).",
        ru: "SD-карты работают только от 3,3 В. В этом проекте используется распространённый 6-выводной модуль на 5 В со своим стабилизатором 3,3 В и преобразователем уровней 74LVC125A, поэтому на VCC подаётся 5 В, а сигналы Uno тоже 5 В. Простые переходники без этих микросхем питаются от 3V3 и требуют согласования уровней на CS, MOSI и SCK: в этой схеме их не используйте. Отформатируйте карту в FAT32 (карты до 32 ГБ; карты 64 ГБ с exFAT библиотека SD не поддерживает).",
        kk: "SD карталар тек 3,3 В-тан жұмыс істейді. Бұл жобада өз 3,3 В реттегіші мен 74LVC125A деңгей түрлендіргіші бар кең тараған 6 шықпалы 5 В модулі қолданылады, сондықтан VCC-ге 5 В беріледі, Uno сигналдары да 5 В. Бұл микросхемалары жоқ қарапайым ауыстырғыштар 3V3-тен қоректенеді және CS, MOSI мен SCK деңгейлерін келістіруді қажет етеді: бұл схемада оларды пайдаланбаңыз. Картаны FAT32 форматына келтіріңіз (32 ГБ-қа дейінгі карталар; exFAT 64 ГБ карталарын SD кітапханасы қолдамайды).",
      },
      expect: { en: "A module with a small regulator and a 14-pin chip, and a FAT32 card.", ru: "Модуль с маленьким стабилизатором и 14-выводной микросхемой и карта в FAT32.", kk: "Шағын реттегіші мен 14 шықпалы микросхемасы бар модуль және FAT32 карта." },
      mistake: { en: "Feeding the 5 V module from 3V3: its regulator drops out and the card fails to start.", ru: "Питать модуль на 5 В от 3V3: его стабилизатор не вытягивает, и карта не запускается.", kk: "5 В модулін 3V3-тен қоректендіру: оның реттегіші жетпей, карта іске қосылмайды." },
    },
    {
      title: { en: "Wire the SD module to the SPI pins", ru: "Подключите SD-модуль к пинам SPI", kk: "SD модулін SPI пиндеріне қосыңыз" },
      body: {
        en: "The Uno's hardware SPI is fixed: MOSI on D11, MISO on D12, SCK on D13. Connect the module's pins to those, CS to D10, VCC to 5V and GND to GND. Keep these wires short (under 15 cm): SPI is fast and long jumpers cause write errors.",
        ru: "Аппаратный SPI у Uno на фиксированных пинах: MOSI на D11, MISO на D12, SCK на D13. Подключите к ним соответствующие выводы модуля, CS к D10, VCC к 5V, GND к GND. Делайте эти провода короткими (до 15 см): SPI быстрый, и длинные перемычки дают ошибки записи.",
        kk: "Uno-ның аппараттық SPI-ы бекітілген пиндерде: MOSI D11-де, MISO D12-де, SCK D13-те. Модульдің сәйкес шықпаларын соларға, CS-ті D10-ға, VCC-ті 5V-ке, GND-ті GND-ге қосыңыз. Бұл сымдарды қысқа етіңіз (15 см-ге дейін): SPI жылдам, ал ұзын сымдар жазу қателерін тудырады.",
      },
      expect: { en: "Six wires; D13's onboard LED flickers during card access later.", ru: "Шесть проводов; позже при обращении к карте мигает встроенный светодиод D13.", kk: "Алты сым; кейін картаға жүгінгенде D13-тің кірістірілген жарық диоды жыпылықтайды." },
      mistake: { en: "Swapping MOSI and MISO: \"SD init failed\" every time.", ru: "Перепутать MOSI и MISO: каждый раз «SD init failed».", kk: "MOSI мен MISO-ны шатастыру: әр жолы «SD init failed»." },
    },
    {
      title: { en: "Add the RTC and the DHT22", ru: "Добавьте RTC и DHT22", kk: "RTC мен DHT22-ні қосыңыз" },
      body: {
        en: "The DS3231 uses I²C: VCC to 5V, GND to GND, SDA to A4, SCL to A5. Leave 32K and SQW unconnected. The DHT22 module has three pins: VCC to 5V, GND to GND and DATA to D2; its 10 kΩ pull-up is already on the module. Finally wire D7 through a 220 Ω resistor to the green LED and its short leg to GND.",
        ru: "DS3231 работает по I²C: VCC к 5V, GND к GND, SDA к A4, SCL к A5. Выводы 32K и SQW оставьте свободными. У модуля DHT22 три вывода: VCC к 5V, GND к GND, DATA к D2; подтяжка 10 кОм уже стоит на модуле. Наконец, подключите D7 через резистор 220 Ом к зелёному светодиоду, а его короткую ножку к GND.",
        kk: "DS3231 I²C арқылы жұмыс істейді: VCC 5V-ке, GND GND-ге, SDA A4-ке, SCL A5-ке. 32K мен SQW шықпаларын бос қалдырыңыз. DHT22 модулінің үш шықпасы бар: VCC 5V-ке, GND GND-ге, DATA D2-ге; 10 кОм тарту модульде бұрыннан бар. Соңында D7-ді 220 Ом резистор арқылы жасыл жарық диодына, оның қысқа аяғын GND-ге қосыңыз.",
      },
      expect: { en: "RTC on A4/A5, DHT22 on D2, LED on D7.", ru: "RTC на A4/A5, DHT22 на D2, светодиод на D7.", kk: "RTC A4/A5-те, DHT22 D2-де, жарық диоды D7-де." },
      mistake: { en: "Mounting the DHT22 right above the Uno's regulator: it reads 1–3 °C too warm.", ru: "Ставить DHT22 прямо над стабилизатором Uno: он показывает на 1–3 °C больше.", kk: "DHT22-ні Uno реттегішінің дәл үстіне қою: ол 1–3 °C артық көрсетеді." },
    },
    {
      title: { en: "Upload and set the clock", ru: "Загрузите скетч и установите часы", kk: "Скетчті жүктеп, сағатты орнатыңыз" },
      body: {
        en: "Install \"RTClib\" (Adafruit), \"DHT sensor library\" (Adafruit) and \"Adafruit Unified Sensor\"; SD and SPI come with the IDE. Upload. If the RTC has never been set (or its battery was removed), the sketch copies the computer's time at compile time into it. To force a re-set later, change FORCE_SET_CLOCK to true, upload, then change it back to false and upload again; otherwise every reset would rewind the clock.",
        ru: "Установите «RTClib» (Adafruit), «DHT sensor library» (Adafruit) и «Adafruit Unified Sensor»; SD и SPI уже есть в IDE. Загрузите скетч. Если RTC ещё не настраивали (или вынимали батарейку), скетч запишет в него время компьютера на момент компиляции. Чтобы потом принудительно перевести часы, поставьте FORCE_SET_CLOCK = true, загрузите, затем верните false и загрузите снова, иначе каждый сброс будет откатывать часы назад.",
        kk: "«RTClib» (Adafruit), «DHT sensor library» (Adafruit) және «Adafruit Unified Sensor» орнатыңыз; SD мен SPI IDE-де бар. Скетчті жүктеңіз. RTC әлі бапталмаған болса (немесе батареясы алынса), скетч оған компиляция сәтіндегі компьютер уақытын жазады. Кейін сағатты мәжбүрлеп ауыстыру үшін FORCE_SET_CLOCK = true қойып, жүктеңіз, содан кейін false-қа қайтарып, қайта жүктеңіз, әйтпесе әр қайта жүктеу сағатты кері шегіндіреді.",
      },
      expect: { en: "Serial Monitor (9600 baud) shows the time, \"SD ok\" and a first saved row.", ru: "Serial Monitor (9600 бод) показывает время, «SD ok» и первую записанную строку.", kk: "Serial Monitor (9600 бод) уақытты, «SD ok» және алғашқы жазылған жолды көрсетеді." },
      mistake: { en: "Leaving FORCE_SET_CLOCK = true: after the next power cut the clock jumps back to the compile time.", ru: "Оставить FORCE_SET_CLOCK = true: после следующего отключения питания часы вернутся ко времени компиляции.", kk: "FORCE_SET_CLOCK = true күйінде қалдыру: келесі қуат өшкеннен кейін сағат компиляция уақытына қайтады." },
    },
    {
      title: { en: "Let it log, then open the file", ru: "Дайте поработать и откройте файл", kk: "Біраз жазсын, содан кейін файлды ашыңыз" },
      body: {
        en: "The LED blinks once each minute when a row is saved; fast blinking means the card is missing or failed, and the sketch keeps retrying. The file is closed after every row, so you can pull the card at any time between blinks without losing data. Put the card in a computer and open CLIMATE.CSV: columns are date, time, temp_c, humidity_pct, ready for a chart.",
        ru: "Светодиод мигает раз в минуту, когда строка записана; частое мигание означает, что карты нет или она сбоит, и скетч продолжает попытки. Файл закрывается после каждой строки, поэтому карту можно вынуть в любой момент между вспышками без потери данных. Вставьте карту в компьютер и откройте CLIMATE.CSV: столбцы date, time, temp_c, humidity_pct, можно сразу строить график.",
        kk: "Жол сақталғанда жарық диоды минутына бір рет жыпылықтайды; жиі жыпылықтау карта жоқ немесе ақаулы екенін білдіреді, скетч әрекетін жалғастыра береді. Файл әр жолдан кейін жабылады, сондықтан жыпылықтаулар арасында картаны кез келген сәтте деректерді жоғалтпай алуға болады. Картаны компьютерге салып, CLIMATE.CSV ашыңыз: бағандар date, time, temp_c, humidity_pct, бірден график салуға болады.",
      },
      expect: { en: "One new row per minute, about 1.4 MB per year.", ru: "Одна новая строка в минуту, около 1,4 МБ в год.", kk: "Минутына бір жаңа жол, жылына шамамен 1,4 МБ." },
      mistake: { en: "Opening the CSV with a comma-as-decimal locale: use Data → From Text and set the separator to comma.", ru: "Открывать CSV при локали с запятой как десятичным разделителем: используйте Данные → Из текста и укажите разделитель «запятая».", kk: "Ондық бөлгіші үтір болатын локальда CSV ашу: Деректер → Мәтіннен тармағын пайдаланып, бөлгішті «үтір» деп көрсетіңіз." },
    },
  ],
  code: [{
    filename: "climate_logger.ino",
    language: "cpp",
    libraries: ["RTClib", "DHT sensor library", "Adafruit Unified Sensor"],
    source: `#include <SPI.h>
#include <SD.h>
#include <Wire.h>
#include <RTClib.h>
#include <DHT.h>

const int DHT_PIN = 2;
const int LED_PIN = 7;                    // one blink per saved row, fast blink = SD problem
const int SD_CS_PIN = 10;
const char LOG_FILE[] = "CLIMATE.CSV";    // 8.3 file name
const bool FORCE_SET_CLOCK = false;       // true once to copy the PC time into the RTC

DHT dht(DHT_PIN, DHT22);
RTC_DS3231 rtc;
int lastMinute = -1;
bool sdOk = false;
unsigned long lastToggle = 0;

bool startSd() {
  SD.end();
  if (!SD.begin(SD_CS_PIN)) {
    Serial.println(F("SD init failed"));
    return false;
  }
  if (!SD.exists(LOG_FILE)) {
    File f = SD.open(LOG_FILE, FILE_WRITE);
    if (!f) return false;
    f.println(F("date,time,temp_c,humidity_pct"));
    f.close();
  }
  Serial.print(F("SD ok, logging to "));
  Serial.println(LOG_FILE);
  return true;
}

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  dht.begin();
  if (!rtc.begin()) {
    Serial.println(F("RTC not found, check SDA/SCL"));
    while (true) { digitalWrite(LED_PIN, !digitalRead(LED_PIN)); delay(100); }
  }
  if (FORCE_SET_CLOCK || rtc.lostPower()) {
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
    Serial.println(F("RTC set from compile time"));
  }
  DateTime now = rtc.now();
  char buf[24];
  snprintf(buf, sizeof(buf), "%04d-%02d-%02d %02d:%02d:%02d", now.year(), now.month(), now.day(), now.hour(), now.minute(), now.second());
  Serial.print(F("RTC ok "));
  Serial.println(buf);
  sdOk = startSd();
}

void loop() {
  DateTime now = rtc.now();

  if (now.minute() != lastMinute) {
    lastMinute = now.minute();
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    char tb[8] = "", hb[8] = "", line[48];
    if (!isnan(t)) dtostrf(t, 1, 1, tb);  // empty field if the sensor failed
    if (!isnan(h)) dtostrf(h, 1, 1, hb);
    snprintf(line, sizeof(line), "%04d-%02d-%02d,%02d:%02d:%02d,%s,%s",
             now.year(), now.month(), now.day(), now.hour(), now.minute(), now.second(), tb, hb);

    if (!sdOk) sdOk = startSd();
    bool saved = false;
    if (sdOk) {
      File f = SD.open(LOG_FILE, FILE_WRITE);   // appends to the end
      if (f) {
        f.println(line);
        f.close();                             // flush every row: safe to pull the card
        saved = true;
      } else {
        sdOk = false;
      }
    }
    Serial.print(saved ? F("saved ") : F("NOT saved (SD) "));
    Serial.println(line);
    if (saved) { digitalWrite(LED_PIN, HIGH); delay(150); digitalWrite(LED_PIN, LOW); }
  }

  if (!sdOk && millis() - lastToggle >= 100) {   // fast blink while the card is missing
    lastToggle = millis();
    digitalWrite(LED_PIN, !digitalRead(LED_PIN));
  }
  delay(50);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"SD init failed\" every time", ru: "Каждый раз «SD init failed»", kk: "Әр жолы «SD init failed»" },
      cause: { en: "Card not FAT32, MOSI/MISO swapped, CS not on D10, or the module powered from 3V3.", ru: "Карта не в FAT32, перепутаны MOSI/MISO, CS не на D10 или модуль питается от 3V3.", kk: "Карта FAT32 емес, MOSI/MISO ауысқан, CS D10-да емес немесе модуль 3V3-тен қоректенеді." },
      fix: { en: "Reformat with the official SD Card Formatter, recheck D11/D12/D13/D10 and power the module from 5V.", ru: "Переформатируйте официальной программой SD Card Formatter, перепроверьте D11/D12/D13/D10 и питайте модуль от 5V.", kk: "Ресми SD Card Formatter бағдарламасымен қайта форматтап, D11/D12/D13/D10-ды қайта тексеріп, модульді 5V-тен қоректендіріңіз." },
    },
    {
      symptom: { en: "Temperature and humidity fields are empty", ru: "Поля температуры и влажности пустые", kk: "Температура мен ылғалдылық өрістері бос" },
      cause: { en: "The DHT22 did not answer: DATA not on D2, or a bare 4-pin sensor without its pull-up.", ru: "DHT22 не ответил: DATA не на D2, или это голый 4-выводной датчик без подтяжки.", kk: "DHT22 жауап бермеді: DATA D2-де емес немесе бұл тартусыз жалаң 4 шықпалы датчик." },
      fix: { en: "Check the DATA wire; with a bare sensor add a 10 kΩ resistor from DATA to 5V.", ru: "Проверьте провод DATA; для голого датчика добавьте резистор 10 кОм от DATA к 5V.", kk: "DATA сымын тексеріңіз; жалаң датчик үшін DATA-дан 5V-ке 10 кОм резистор қосыңыз." },
    },
    {
      symptom: { en: "After every power cut the time jumps back to when you uploaded", ru: "После каждого отключения питания время откатывается к моменту загрузки скетча", kk: "Әр қуат өшкеннен кейін уақыт скетч жүктелген сәтке қайтады" },
      cause: { en: "The RTC backup cell is flat or missing, so the clock stops and the sketch restores the compile time.", ru: "Резервная батарейка RTC разряжена или отсутствует: часы останавливаются, и скетч восстанавливает время компиляции.", kk: "RTC резервтік батареясы отырған немесе жоқ: сағат тоқтап, скетч компиляция уақытын қалпына келтіреді." },
      fix: { en: "Fit a fresh CR2032 (after removing the charging diode, see safety) and upload once more so the clock gets the current time.", ru: "Поставьте свежую CR2032 (предварительно удалив диод зарядки, см. безопасность) и загрузите скетч ещё раз, чтобы часы получили текущее время.", kk: "Жаңа CR2032 салыңыз (алдымен зарядтау диодын алып тастап, қауіпсіздікті қараңыз) және сағат ағымдағы уақытты алуы үшін скетчті тағы бір рет жүктеңіз." },
    },
    {
      symptom: { en: "Humidity reads 99.9 % for hours", ru: "Влажность часами показывает 99,9 %", kk: "Ылғалдылық сағаттап 99,9 % көрсетеді" },
      cause: { en: "Condensation on the sensor, typical outdoors at night or in a bathroom.", ru: "Конденсат на датчике: обычное дело на улице ночью или в ванной.", kk: "Датчиктегі конденсат: түнде далада немесе жуынатын бөлмеде жиі болады." },
      fix: { en: "Put the DHT22 in a ventilated shield (a stack of plastic plates) so it stays dry but gets air.", ru: "Поместите DHT22 в вентилируемую защиту (стопку пластиковых тарелок), чтобы он оставался сухим, но обдувался.", kk: "DHT22-ні ауа өтетін қорғанысқа (пластик табақшалар бағанасына) салыңыз, сонда ол құрғақ қалып, ауамен үрленеді." },
    },
  ],
  safety: [
    { en: "Many ZS-042 DS3231 boards charge the coin cell through a diode and 200 Ω resistor. With a non-rechargeable CR2032 on 5 V this can make the cell swell or leak: remove that diode (or resistor) before fitting a CR2032.", ru: "Многие платы DS3231 ZS-042 заряжают батарейку через диод и резистор 200 Ом. С неперезаряжаемой CR2032 при 5 В она может вздуться или потечь: перед установкой CR2032 выпаяйте этот диод (или резистор).", kk: "Көптеген ZS-042 DS3231 платалары батареяны диод пен 200 Ом резистор арқылы зарядтайды. 5 В-та қайта зарядталмайтын CR2032 ісініп немесе ағып кетуі мүмкін: CR2032 салмас бұрын сол диодты (немесе резисторды) дәнекерден ажыратыңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "RTC ok 2026-10-25 14:02:41",
      "SD ok, logging to CLIMATE.CSV",
      "saved 2026-10-25,14:02:41,22.4,41.8",
      "saved 2026-10-25,14:03:00,22.4,41.9",
      "saved 2026-10-25,14:04:00,22.5,42.1",
      "saved 2026-10-25,14:05:00,22.5,42.0",
      "SD init failed",
      "NOT saved (SD) 2026-10-25,14:06:00,22.6,42.3",
      "SD ok, logging to CLIMATE.CSV",
      "saved 2026-10-25,14:07:00,22.6,42.4",
    ],
    leds: [{ label: "REC", color: "#43A047" }],
  },
} satisfies GuideContent;
