import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "bedside-alarm-clock",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "home",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 15,
  xpReward: 260,
  title: {
    en: "Bedside Alarm Clock with Snooze",
    ru: "Прикроватный будильник с повтором",
    kk: "Қайталау функциясы бар төсек жанындағы оятқыш",
  },
  summary: {
    en: "A DS3231 keeps accurate time even when unplugged, an LCD shows the clock and alarm, three buttons set everything, and a passive buzzer plays a rising wake-up tune with a 5-minute snooze.",
    ru: "DS3231 точно хранит время даже без питания, LCD показывает часы и будильник, три кнопки всё настраивают, а пассивный зуммер играет нарастающую мелодию с повтором через 5 минут.",
    kk: "DS3231 қуатсыз да уақытты дәл сақтайды, LCD сағат пен оятқышты көрсетеді, үш батырма бәрін баптайды, ал пассивті зуммер 5 минуттан кейін қайталанатын өрлемелі әуенді ойнатады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB charger power", ru: "логика 5 В, питание от USB-зарядки", kk: "5 В логика, USB зарядтағыштан қорек" }, role: { en: "Clock logic, menu and melody", ru: "Логика часов, меню и мелодия", kk: "Сағат логикасы, мәзір және әуен" } },
    { component: "rtc-ds3231", qty: 1, spec: { en: "ZS-042 board with CR2032 (see safety)", ru: "плата ZS-042 с CR2032 (см. безопасность)", kk: "CR2032 бар ZS-042 платасы (қауіпсіздікті қараңыз)" }, role: { en: "Accurate time (±2 ppm), battery backup", ru: "Точное время (±2 ppm), батарейка-резерв", kk: "Дәл уақыт (±2 ppm), резервтік батарея" } },
    { component: "lcd-1602-i2c", qty: 1, spec: { en: "PCF8574 backpack, 0x27 or 0x3F", ru: "плата PCF8574, 0x27 или 0x3F", kk: "PCF8574 тақшасы, 0x27 немесе 0x3F" }, role: { en: "Time, date and alarm", ru: "Время, дата и будильник", kk: "Уақыт, күн және оятқыш" } },
    { component: "push-button", qty: 3, spec: { en: "12×12 mm tactile with caps", ru: "тактовые 12×12 мм с колпачками", kk: "қақпақшалары бар 12×12 мм тактілі" }, role: { en: "SET, UP, DOWN", ru: "SET, UP, DOWN", kk: "SET, UP, DOWN" } },
    { component: "buzzer-passive", qty: 1, spec: { en: "passive buzzer (no built-in oscillator)", ru: "пассивный зуммер (без встроенного генератора)", kk: "пассивті зуммер (ішкі генераторсыз)" }, role: { en: "Plays the wake-up melody", ru: "Играет мелодию будильника", kk: "Ояту әуенін ойнатады" } },
    { component: "resistor", qty: 1, spec: { en: "100 Ω, ¼ W", ru: "100 Ом, ¼ Вт", kk: "100 Ом, ¼ Вт" }, role: { en: "Limits the buzzer current on the pin", ru: "Ограничивает ток зуммера через пин", kk: "Пин арқылы зуммер тогын шектейді" } },
    { component: "enclosure", qty: 1, spec: { en: "box with a 71×24 mm LCD window", ru: "корпус с окном 71×24 мм под LCD", kk: "LCD үшін 71×24 мм терезесі бар қорап" }, role: { en: "Bedside housing", ru: "Корпус для тумбочки", kk: "Төсек жанына арналған корпус" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 18, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "rtc", component: "rtc-ds3231", label: "DS3231" },
    { id: "lcd", component: "lcd-1602-i2c", label: "LCD 1602" },
    { id: "b_set", component: "push-button", label: "SET" },
    { id: "b_up", component: "push-button", label: "UP / snooze" },
    { id: "b_down", component: "push-button", label: "DOWN / light" },
    { id: "r_bz", component: "resistor", label: "100 Ω" },
    { id: "bz", component: "buzzer-passive", label: "Buzzer" },
  ],
  connections: [
    { from: "board.5V", to: "rtc.VCC", color: "red" },
    { from: "rtc.GND", to: "board.GND", color: "black" },
    { from: "rtc.SDA", to: "board.A4", color: "blue" },
    { from: "rtc.SCL", to: "board.A5", color: "yellow" },
    { from: "board.5V", to: "lcd.VCC", color: "red" },
    { from: "lcd.GND", to: "board.GND2", color: "black" },
    { from: "lcd.SDA", to: "board.A4", color: "blue", note: { en: "shared I²C bus (RTC 0x68, LCD 0x27)", ru: "общая шина I²C (RTC 0x68, LCD 0x27)", kk: "ортақ I²C шинасы (RTC 0x68, LCD 0x27)" } },
    { from: "lcd.SCL", to: "board.A5", color: "yellow" },
    { from: "board.D2", to: "b_set.1", color: "green", note: { en: "all buttons use internal pull-ups", ru: "все кнопки на внутренних подтяжках", kk: "барлық батырма ішкі тартумен" } },
    { from: "b_set.2", to: "board.GND", color: "black" },
    { from: "board.D3", to: "b_up.1", color: "green" },
    { from: "b_up.2", to: "board.GND2", color: "black" },
    { from: "board.D4", to: "b_down.1", color: "green" },
    { from: "b_down.2", to: "board.GND3", color: "black" },
    { from: "board.D9", to: "r_bz.A", color: "orange" },
    { from: "r_bz.B", to: "bz.+", color: "orange" },
    { from: "bz.-", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Prepare the RTC module", ru: "Подготовьте модуль RTC", kk: "RTC модулін дайындаңыз" },
      body: {
        en: "The DS3231 is a temperature-compensated clock that drifts only about a minute per year, and its coin cell keeps it running when the Uno is unplugged. Most ZS-042 boards include a charging circuit meant for a rechargeable LIR2032. If you fit a normal CR2032, first remove the small diode (or the 200 Ω resistor) next to the battery holder, as described in the safety notes.",
        ru: "DS3231 это часы с термокомпенсацией, которые уходят всего примерно на минуту в год, а батарейка-таблетка поддерживает их ход, когда Uno отключена. На большинстве плат ZS-042 есть цепь зарядки для аккумулятора LIR2032. Если ставите обычную CR2032, сначала удалите маленький диод (или резистор 200 Ом) рядом с держателем батарейки, как описано в разделе безопасности.",
        kk: "DS3231 температурасы өтелетін сағат, ол жылына шамамен бір минутқа ғана ауытқиды, ал таблетка батареясы Uno ажыратылғанда оның жүрісін сақтайды. ZS-042 платаларының көбінде LIR2032 аккумуляторына арналған зарядтау тізбегі бар. Кәдімгі CR2032 салсаңыз, алдымен қауіпсіздік бөлімінде сипатталғандай батарея ұстағышының жанындағы кішкентай диодты (немесе 200 Ом резисторды) алып тастаңыз.",
      },
      expect: { en: "A coin cell in the holder and the charging path removed (for CR2032).", ru: "Батарейка в держателе, цепь зарядки удалена (для CR2032).", kk: "Ұстағышта батарея бар, зарядтау тізбегі алынған (CR2032 үшін)." },
      mistake: { en: "Running without a coin cell: every power cut resets the clock.", ru: "Работа без батарейки: каждое отключение питания сбрасывает часы.", kk: "Батареясыз жұмыс істеу: әр қуат өшкенде сағат нөлденеді." },
    },
    {
      title: { en: "Wire the I²C bus", ru: "Соберите шину I²C", kk: "I²C шинасын құрастырыңыз" },
      body: {
        en: "Connect both the DS3231 and the LCD backpack to 5V and GND, both SDA pins to A4 and both SCL pins to A5. The clock answers at 0x68 (plus its EEPROM at 0x57) and the LCD at 0x27 or 0x3F, so they share the bus without conflict. Leave the RTC's 32K and SQW pins unconnected.",
        ru: "Подключите DS3231 и плату LCD к 5V и GND, оба SDA к A4 и оба SCL к A5. Часы отвечают по адресу 0x68 (и их EEPROM по 0x57), LCD по 0x27 или 0x3F, поэтому они делят шину без конфликтов. Выводы 32K и SQW у RTC оставьте свободными.",
        kk: "DS3231 мен LCD тақшасын 5V пен GND-ге, екі SDA-ны A4-ке және екі SCL-ді A5-ке қосыңыз. Сағат 0x68 мекенжайында (және оның EEPROM-ы 0x57-де), LCD 0x27 немесе 0x3F-те жауап береді, сондықтан олар шинаны қақтығыссыз бөліседі. RTC-тің 32K мен SQW шықпаларын бос қалдырыңыз.",
      },
      expect: { en: "The LCD backlight turns on.", ru: "Загорается подсветка LCD.", kk: "LCD жарығы жанады." },
      mistake: { en: "Connecting SDA/SCL to the pins marked SDA/SCL near AREF and to A4/A5 at the same time is fine (they are the same), but mixing one module's SDA with the other's SCL is not.", ru: "Подключение к пинам SDA/SCL возле AREF и к A4/A5 одновременно допустимо (это одни и те же линии), но перепутать SDA одного модуля с SCL другого нельзя.", kk: "AREF жанындағы SDA/SCL пиндеріне және A4/A5-ке бір мезгілде қосуға болады (бұл бір желілер), бірақ бір модульдің SDA-сын екіншісінің SCL-імен шатастыруға болмайды." },
    },
    {
      title: { en: "Add the buttons and the buzzer", ru: "Добавьте кнопки и зуммер", kk: "Батырмалар мен зуммерді қосыңыз" },
      body: {
        en: "Put the three buttons between D2 (SET), D3 (UP) and D4 (DOWN) and GND; the sketch enables the internal pull-ups. Connect D9 through a 100 Ω resistor to the buzzer's + pin and its − pin to GND. It must be a passive buzzer: the sketch plays notes with tone(), which an active buzzer (one that beeps on plain DC) cannot follow. The 100 Ω keeps the pin current in a safe range for magnetic buzzers.",
        ru: "Поставьте три кнопки между D2 (SET), D3 (UP), D4 (DOWN) и GND; скетч включает внутренние подтяжки. Подключите D9 через резистор 100 Ом к выводу + зуммера, а вывод − к GND. Зуммер должен быть пассивным: скетч играет ноты через tone(), а активный зуммер (пищит от простого постоянного напряжения) так не умеет. 100 Ом держат ток пина в безопасных пределах для магнитных зуммеров.",
        kk: "Үш батырманы D2 (SET), D3 (UP), D4 (DOWN) мен GND арасына қойыңыз; скетч ішкі тартуларды қосады. D9-ды 100 Ом резистор арқылы зуммердің + шықпасына, ал − шықпасын GND-ге қосыңыз. Зуммер пассивті болуы керек: скетч ноталарды tone() арқылы ойнатады, ал белсенді зуммер (жай тұрақты кернеуден шиқылдайтын) бұлай істей алмайды. 100 Ом магниттік зуммерлер үшін пин тогын қауіпсіз шекте ұстайды.",
      },
      expect: { en: "Three buttons on D2–D4, buzzer on D9 through 100 Ω.", ru: "Три кнопки на D2–D4, зуммер на D9 через 100 Ом.", kk: "D2–D4-те үш батырма, D9-да 100 Ом арқылы зуммер." },
      mistake: { en: "An active buzzer plays the melody as a single rough tone; check by touching it to 5V: if it beeps on its own, it is active.", ru: "Активный зуммер играет мелодию одним грубым тоном; проверьте, коснувшись им 5V: если пищит сам, он активный.", kk: "Белсенді зуммер әуенді бір дөрекі дыбыспен ойнатады; оны 5V-ке тигізіп тексеріңіз: өзі шиқылдаса, ол белсенді." },
    },
    {
      title: { en: "Upload and set the time", ru: "Загрузите скетч и установите время", kk: "Скетчті жүктеп, уақытты орнатыңыз" },
      body: {
        en: "Install \"RTClib\" (Adafruit) and \"LiquidCrystal I2C\" (Frank de Brabander) and upload. On first start the sketch copies the computer's time into the RTC. To adjust it by hand, hold SET for 1.5 s: set the hour with UP/DOWN, press SET, set the minutes, press SET. Seconds are reset to 00 when you confirm, so press SET exactly as a reference clock ticks over.",
        ru: "Установите «RTClib» (Adafruit) и «LiquidCrystal I2C» (Frank de Brabander) и загрузите скетч. При первом запуске скетч запишет в RTC время компьютера. Чтобы настроить вручную, удерживайте SET 1,5 с: кнопками UP/DOWN выставьте час, нажмите SET, выставьте минуты, нажмите SET. При подтверждении секунды сбрасываются в 00, так что жмите SET ровно в момент смены минуты на эталонных часах.",
        kk: "«RTClib» (Adafruit) және «LiquidCrystal I2C» (Frank de Brabander) орнатып, скетчті жүктеңіз. Алғаш іске қосылғанда скетч RTC-ге компьютер уақытын жазады. Қолмен баптау үшін SET-ті 1,5 с басып тұрыңыз: UP/DOWN арқылы сағатты қойып, SET басыңыз, минутты қойып, SET басыңыз. Растағанда секундтар 00-ге түседі, сондықтан SET-ті эталон сағатта минут ауысқан сәтте басыңыз.",
      },
      expect: { en: "The LCD shows the time on top and the day, date and alarm below.", ru: "LCD показывает время сверху, а день, дату и будильник снизу.", kk: "LCD жоғарыда уақытты, төменде күнді, айды және оятқышты көрсетеді." },
      mistake: { en: "Squares instead of digits: turn the contrast trimmer on the back of the LCD.", ru: "Квадратики вместо цифр: покрутите подстроечник контраста на обороте LCD.", kk: "Цифрлардың орнына шаршылар: LCD артындағы контраст реттегішін бұраңыз." },
    },
    {
      title: { en: "Set the alarm and try snooze", ru: "Установите будильник и проверьте повтор", kk: "Оятқышты қойып, қайталауды тексеріңіз" },
      body: {
        en: "Press SET briefly to set the alarm: hour, SET, minutes, SET. The alarm is now on, shown as \"A07:30\" in the corner; a short press on UP toggles it off (\"-07:30\") and on again. Set it two minutes ahead and wait. When it rings, UP or DOWN snoozes for 5 minutes, SET stops it until tomorrow. If nobody reacts, it stops by itself after 10 minutes. DOWN on the clock screen turns the backlight off for a dark bedroom.",
        ru: "Коротко нажмите SET, чтобы установить будильник: час, SET, минуты, SET. Будильник включён, в углу видно «A07:30»; короткое нажатие UP выключает его («-07:30») и включает снова. Поставьте на две минуты вперёд и подождите. Когда зазвонит, UP или DOWN откладывают сигнал на 5 минут, SET выключает до завтра. Если никто не реагирует, он замолкает сам через 10 минут. DOWN на экране часов выключает подсветку для тёмной спальни.",
        kk: "Оятқышты қою үшін SET-ті қысқа басыңыз: сағат, SET, минут, SET. Оятқыш қосулы, бұрышта «A07:30» көрінеді; UP-ты қысқа басу оны сөндіреді («-07:30») және қайта қосады. Екі минут алға қойып, күтіңіз. Шырылдағанда UP немесе DOWN сигналды 5 минутқа кейінге қалдырады, SET ертеңге дейін сөндіреді. Ешкім жауап бермесе, 10 минуттан кейін өзі тынады. Сағат экранында DOWN қараңғы жатын бөлме үшін жарықты сөндіреді.",
      },
      expect: { en: "The melody plays, snooze brings it back 5 minutes later, SET silences it.", ru: "Играет мелодия, повтор возвращает её через 5 минут, SET выключает.", kk: "Әуен ойнайды, қайталау оны 5 минуттан кейін қайтарады, SET тындырады." },
      mistake: { en: "Unplugging the clock overnight: the time survives on the coin cell, but nothing can ring without power. Use a reliable USB charger.", ru: "Отключить часы на ночь: время сохранится на батарейке, но без питания звонить нечему. Используйте надёжную USB-зарядку.", kk: "Түнге сағатты ажыратып қою: уақыт батареяда сақталады, бірақ қуатсыз шырылдай алмайды. Сенімді USB зарядтағышты пайдаланыңыз." },
    },
  ],
  code: [{
    filename: "alarm_clock.ino",
    language: "cpp",
    libraries: ["RTClib", "LiquidCrystal I2C"],
    source: `#include <Wire.h>
#include <EEPROM.h>
#include <RTClib.h>
#include <LiquidCrystal_I2C.h>

const int SET_PIN = 2;
const int UP_PIN = 3;              // also snooze
const int DOWN_PIN = 4;            // also snooze / backlight
const int BUZZER_PIN = 9;          // passive buzzer through 100 ohm
const byte SNOOZE_MIN = 5;
const unsigned long RING_LIMIT_MS = 10UL * 60UL * 1000UL;   // stop by itself after 10 minutes

const int MELODY[] = {1047, 1319, 1568, 2093, 0, 2093, 0};   // C6 E6 G6 C7, rests = 0
const int MELODY_MS[] = {150, 150, 150, 300, 150, 300, 800};
const byte MELODY_LEN = 7;

RTC_DS3231 rtc;
LiquidCrystal_I2C lcd(0x27, 16, 2);  // 0x3F on some backpacks

enum Mode { CLOCK, ALARM_H, ALARM_M, CLOCK_H, CLOCK_M, RINGING };
Mode mode = CLOCK;
byte alarmH = 7, alarmM = 30, editH = 0, editM = 0;
bool alarmOn = true, backlight = true;
long lastAlarmKey = -1;            // day * 1440 + minute of the last trigger
uint32_t snoozeUntil = 0;          // unix time, 0 = no snooze
unsigned long ringStart = 0, noteStart = 0, lastDraw = 0;
byte note = 0;

struct Button { int pin; bool down; unsigned long since; bool longFired; };
Button bSet = {SET_PIN, false, 0, false};
Button bUp = {UP_PIN, false, 0, false};
Button bDown = {DOWN_PIN, false, 0, false};

// 0 = nothing, 1 = short press (on release), 2 = long press (after 1.5 s)
byte poll(Button &b) {
  bool pressed = digitalRead(b.pin) == LOW;
  unsigned long now = millis();
  if (pressed && !b.down) { b.down = true; b.since = now; b.longFired = false; }
  else if (!pressed && b.down) { b.down = false; if (!b.longFired && now - b.since > 30) return 1; }
  else if (pressed && !b.longFired && now - b.since > 1500) { b.longFired = true; return 2; }
  return 0;
}

void saveAlarm() {
  EEPROM.update(0, alarmH);
  EEPROM.update(1, alarmM);
  EEPROM.update(2, alarmOn);
  EEPROM.update(3, 0x5A);
}

void printLine(byte row, const char *text) {
  char line[17];
  snprintf(line, sizeof(line), "%-16s", text);
  lcd.setCursor(0, row);
  lcd.print(line);
}

void draw(const DateTime &now) {
  static const char *days[] = {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
  char top[17], bottom[17];
  if (mode == CLOCK || mode == RINGING) {
    snprintf(top, sizeof(top), "    %02d:%02d:%02d", now.hour(), now.minute(), now.second());
    if (mode == RINGING) {
      snprintf(top, sizeof(top), "WAKE UP!   %02d:%02d", now.hour(), now.minute());
      snprintf(bottom, sizeof(bottom), "UP:snz SET:stop");
    } else if (snoozeUntil) {
      snprintf(bottom, sizeof(bottom), "%s %02d.%02d snooze", days[now.dayOfTheWeek()], now.day(), now.month());
    } else {
      snprintf(bottom, sizeof(bottom), "%s %02d.%02d %c%02d:%02d", days[now.dayOfTheWeek()], now.day(), now.month(),
               alarmOn ? 'A' : '-', alarmH, alarmM);
    }
  } else {
    bool alarm = mode == ALARM_H || mode == ALARM_M;
    bool hour = mode == ALARM_H || mode == CLOCK_H;
    snprintf(top, sizeof(top), "%s %s", alarm ? "Set alarm" : "Set clock", hour ? "hour" : "min");
    snprintf(bottom, sizeof(bottom), hour ? "     >%02d:%02d" : "      %02d:>%02d", editH, editM);
  }
  printLine(0, top);
  printLine(1, bottom);
}

void startRinging(const DateTime &now) {
  mode = RINGING;
  ringStart = millis();
  note = 0;
  noteStart = 0;
  lcd.backlight();
  Serial.print("ALARM ");
  if (now.hour() < 10) Serial.print('0');
  Serial.print(now.hour());
  Serial.print(':');
  if (now.minute() < 10) Serial.print('0');
  Serial.println(now.minute());
}

void stopRinging() {
  noTone(BUZZER_PIN);
  mode = CLOCK;
  if (!backlight) lcd.noBacklight();
}

void playMelody() {
  if (noteStart != 0 && millis() - noteStart < (unsigned long)MELODY_MS[note]) return;
  if (noteStart != 0) note = (note + 1) % MELODY_LEN;
  noteStart = millis();
  if (MELODY[note] > 0) tone(BUZZER_PIN, MELODY[note], MELODY_MS[note] - 20);
  else noTone(BUZZER_PIN);
}

void setup() {
  Serial.begin(9600);
  pinMode(SET_PIN, INPUT_PULLUP);
  pinMode(UP_PIN, INPUT_PULLUP);
  pinMode(DOWN_PIN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);
  lcd.init();
  lcd.backlight();
  if (!rtc.begin()) {
    printLine(0, "RTC not found");
    Serial.println("RTC not found, check SDA/SCL");
    while (true) delay(1000);
  }
  if (rtc.lostPower()) {
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
    Serial.println("RTC set from compile time");
  }
  if (EEPROM.read(3) == 0x5A && EEPROM.read(0) < 24 && EEPROM.read(1) < 60) {
    alarmH = EEPROM.read(0);
    alarmM = EEPROM.read(1);
    alarmOn = EEPROM.read(2);
  }
  Serial.print("alarm ");
  Serial.print(alarmH);
  Serial.print(':');
  if (alarmM < 10) Serial.print('0');
  Serial.print(alarmM);
  Serial.println(alarmOn ? " on" : " off");
}

void loop() {
  DateTime now = rtc.now();
  byte set = poll(bSet), up = poll(bUp), down = poll(bDown);

  // alarm trigger: once per matching minute, or when a snooze runs out
  long key = (long)now.day() * 1440L + now.hour() * 60 + now.minute();
  if (mode == CLOCK && alarmOn && now.hour() == alarmH && now.minute() == alarmM && key != lastAlarmKey) {
    lastAlarmKey = key;
    snoozeUntil = 0;
    startRinging(now);
  }
  if (mode == CLOCK && snoozeUntil && now.unixtime() >= snoozeUntil) {
    snoozeUntil = 0;
    startRinging(now);
  }

  switch (mode) {
    case CLOCK:
      if (set == 1) { mode = ALARM_H; editH = alarmH; editM = alarmM; }
      else if (set == 2) { mode = CLOCK_H; editH = now.hour(); editM = now.minute(); }
      else if (up == 1) {
        alarmOn = !alarmOn; snoozeUntil = 0; saveAlarm();
        Serial.println(alarmOn ? "alarm on" : "alarm off");
      } else if (down == 1) {
        backlight = !backlight;
        if (backlight) lcd.backlight(); else lcd.noBacklight();
      }
      break;
    case ALARM_H: case CLOCK_H:
      if (up) editH = (editH + 1) % 24;
      if (down) editH = (editH + 23) % 24;
      if (set == 1) mode = mode == ALARM_H ? ALARM_M : CLOCK_M;
      break;
    case ALARM_M: case CLOCK_M:
      if (up) editM = (editM + (up == 2 ? 10 : 1)) % 60;
      if (down) editM = (editM + (down == 2 ? 50 : 59)) % 60;
      if (set == 1) {
        if (mode == ALARM_M) {
          alarmH = editH; alarmM = editM; alarmOn = true; snoozeUntil = 0;
          saveAlarm();
          Serial.print("alarm set ");
        } else {
          rtc.adjust(DateTime(now.year(), now.month(), now.day(), editH, editM, 0));
          Serial.print("clock set ");
        }
        if (editH < 10) Serial.print('0');
        Serial.print(editH);
        Serial.print(':');
        if (editM < 10) Serial.print('0');
        Serial.println(editM);
        mode = CLOCK;
      }
      break;
    case RINGING:
      playMelody();
      if (up == 1 || down == 1) {
        snoozeUntil = now.unixtime() + SNOOZE_MIN * 60UL;
        stopRinging();
        Serial.println("snooze 5 min");
      } else if (set == 1 || millis() - ringStart > RING_LIMIT_MS) {
        stopRinging();
        Serial.println("alarm stopped");
      }
      break;
  }

  if (millis() - lastDraw >= 200) {
    lastDraw = millis();
    draw(now);
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The buzzer only clicks or plays one rough tone", ru: "Зуммер только щёлкает или играет один грубый тон", kk: "Зуммер тек шыртылдайды немесе бір дөрекі дыбыс шығарады" },
      cause: { en: "It is an active buzzer, which has its own oscillator and ignores the note frequency.", ru: "Это активный зуммер: у него свой генератор, и частота нот ему безразлична.", kk: "Бұл белсенді зуммер: оның өз генераторы бар, ноталар жиілігін елемейді." },
      fix: { en: "Swap it for a passive buzzer or a small 8 Ω speaker (keep the 100 Ω resistor).", ru: "Замените на пассивный зуммер или маленький динамик 8 Ом (резистор 100 Ом оставьте).", kk: "Оны пассивті зуммерге немесе шағын 8 Ом динамикке ауыстырыңыз (100 Ом резисторды қалдырыңыз)." },
    },
    {
      symptom: { en: "Time is lost after unplugging", ru: "Время сбивается после отключения", kk: "Ажыратқаннан кейін уақыт жоғалады" },
      cause: { en: "The coin cell is flat, missing or inserted upside down.", ru: "Батарейка разряжена, отсутствует или вставлена наоборот.", kk: "Батарея отырған, жоқ немесе кері салынған." },
      fix: { en: "Fit a fresh CR2032 with + facing up and set the time again with a long press on SET.", ru: "Вставьте свежую CR2032 плюсом вверх и снова установите время долгим нажатием SET.", kk: "Жаңа CR2032-ні плюсін жоғары қаратып салып, SET-ті ұзақ басып, уақытты қайта орнатыңыз." },
    },
    {
      symptom: { en: "One press changes the value by two", ru: "Одно нажатие меняет значение на два", kk: "Бір басу мәнді екіге өзгертеді" },
      cause: { en: "A worn button bounces for longer than the 30 ms filter.", ru: "Изношенная кнопка дребезжит дольше 30-миллисекундного фильтра.", kk: "Тозған батырма 30 мс сүзгіден ұзағырақ дірілдейді." },
      fix: { en: "Replace the button or raise the 30 in poll() to 60.", ru: "Замените кнопку или увеличьте 30 в poll() до 60.", kk: "Батырманы ауыстырыңыз немесе poll() ішіндегі 30-ды 60-қа көбейтіңіз." },
    },
    {
      symptom: { en: "LCD shows \"RTC not found\"", ru: "LCD пишет «RTC not found»", kk: "LCD «RTC not found» деп жазады" },
      cause: { en: "SDA/SCL wires of the DS3231 are swapped or loose.", ru: "Провода SDA/SCL у DS3231 перепутаны или отошли.", kk: "DS3231-дің SDA/SCL сымдары ауысқан немесе босаған." },
      fix: { en: "Check SDA→A4 and SCL→A5 on the RTC; an I²C scanner should list 0x68.", ru: "Проверьте SDA→A4 и SCL→A5 на RTC; I²C-сканер должен показать 0x68.", kk: "RTC-де SDA→A4 және SCL→A5 тексеріңіз; I²C сканері 0x68 көрсетуі керек." },
    },
  ],
  safety: [
    { en: "Many ZS-042 DS3231 boards charge the coin cell through a diode and 200 Ω resistor. With a non-rechargeable CR2032 on 5 V this can make the cell swell or leak: remove that diode (or resistor) before fitting a CR2032.", ru: "Многие платы DS3231 ZS-042 заряжают батарейку через диод и резистор 200 Ом. С неперезаряжаемой CR2032 при 5 В она может вздуться или потечь: перед установкой CR2032 выпаяйте этот диод (или резистор).", kk: "Көптеген ZS-042 DS3231 платалары батареяны диод пен 200 Ом резистор арқылы зарядтайды. 5 В-та қайта зарядталмайтын CR2032 ісініп немесе ағып кетуі мүмкін: CR2032 салмас бұрын сол диодты (немесе резисторды) дәнекерден ажыратыңыз." },
    { en: "Power the clock from a certified USB charger, and keep coin cells away from small children.", ru: "Питайте часы от сертифицированной USB-зарядки и храните батарейки-таблетки подальше от маленьких детей.", kk: "Сағатты сертификатталған USB зарядтағыштан қоректендіріңіз және таблетка батареяларын кішкентай балалардан аулақ ұстаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "alarm 7:30 on",
      "alarm set 07:12",
      "ALARM 07:12",
      "snooze 5 min",
      "ALARM 07:17",
      "alarm stopped",
      "alarm off",
      "alarm on",
      "clock set 07:20",
    ],
    leds: [],
  },
} satisfies GuideContent;
