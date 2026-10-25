import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "keypad-door-lock",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "security",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 22,
  xpReward: 240,
  title: {
    en: "Keypad Door Lock with LCD",
    ru: "Кодовый замок с клавиатурой и LCD",
    kk: "Пернетақта мен LCD бар кодты құлып",
  },
  summary: {
    en: "Type a PIN on a 4×4 keypad and a relay fires a 12 V solenoid lock for 3 s. A 1602 I²C LCD shows the status, and three wrong codes lock the keypad for 30 s.",
    ru: "Введите PIN на клавиатуре 4×4, и реле на 3 с откроет соленоидный замок 12 В. LCD 1602 по I²C показывает статус, а после трёх неверных кодов клавиатура блокируется на 30 с.",
    kk: "4×4 пернетақтада PIN теріңіз, сонда реле 12 В соленоид құлыпты 3 с-қа ашады. I²C арқылы қосылған 1602 LCD күйді көрсетеді, ал үш қате кодтан кейін пернетақта 30 с-қа бұғатталады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "keypad-4x4", qty: 1, spec: { en: "membrane, 8-pin ribbon", ru: "мембранная, шлейф 8 пинов", kk: "мембраналы, 8 пинді шлейф" }, role: { en: "PIN entry", ru: "Ввод PIN", kk: "PIN енгізу" } },
    { component: "lcd-1602-i2c", qty: 1, spec: { en: "16×2 with PCF8574 backpack, 0x27 or 0x3F", ru: "16×2 с платой PCF8574, адрес 0x27 или 0x3F", kk: "16×2, PCF8574 платасымен, 0x27 немесе 0x3F" }, role: { en: "Status display", ru: "Экран статуса", kk: "Күй экраны" } },
    { component: "relay-module", qty: 1, spec: { en: "1-channel 5 V, contacts ≥ 10 A", ru: "1 канал, 5 В, контакты ≥ 10 А", kk: "1 арна, 5 В, түйіспелер ≥ 10 А" }, role: { en: "Switches the lock circuit", ru: "Коммутирует цепь замка", kk: "Құлып тізбегін коммутациялайды" } },
    { component: "solenoid-lock", qty: 1, spec: { en: "12 V cabinet lock, ~0.6 A", ru: "мебельный замок 12 В, ~0,6 А", kk: "12 В жиһаз құлпы, ~0,6 А" }, role: { en: "The latch", ru: "Защёлка", kk: "Ілгек" } },
    { component: "battery-9v", qty: 1, spec: { en: "PP3 for the bench; a 12 V 1 A adapter for daily use", ru: "«Крона» для стола; адаптер 12 В 1 А для ежедневной работы", kk: "Үстелге «Крона»; күнделікті қолдануға 12 В 1 А адаптер" }, role: { en: "Lock power, separate from the Arduino", ru: "Питание замка, отдельно от Arduino", kk: "Құлыптың қорегі, Arduino-дан бөлек" } },
    { component: "diode", qty: 1, spec: { en: "1N4007", ru: "1N4007", kk: "1N4007" }, role: { en: "Flyback diode across the solenoid", ru: "Защитный диод на соленоиде", kk: "Соленоидтағы қорғаныс диоды" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 20, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { component: "enclosure", qty: 1, spec: { en: "box inside the door, keypad outside", ru: "коробка внутри двери, клавиатура снаружи", kk: "қорап есіктің ішінде, пернетақта сыртта" }, role: { en: "Housing", ru: "Корпус", kk: "Корпус" }, optional: true },
  ],
  instances: [
    { id: "kp", component: "keypad-4x4", label: "Keypad 4×4" },
    { id: "lcd", component: "lcd-1602-i2c", label: "LCD 1602 I²C" },
    { id: "rly", component: "relay-module", label: "Relay" },
    { id: "lock", component: "solenoid-lock", label: "12 V lock" },
    { id: "bat", component: "battery-9v", label: "Lock supply" },
    { id: "d1", component: "diode", label: "1N4007" },
  ],
  connections: [
    { from: "kp.R1", to: "board.D9", color: "brown", note: { en: "ribbon pin 1 is the row next to the 1-2-3-A keys", ru: "пин 1 шлейфа — ряд с клавишами 1-2-3-A", kk: "шлейфтің 1-пині — 1-2-3-A пернелерінің қатары" } },
    { from: "kp.R2", to: "board.D8", color: "red" },
    { from: "kp.R3", to: "board.D7", color: "orange" },
    { from: "kp.R4", to: "board.D6", color: "yellow" },
    { from: "kp.C1", to: "board.D5", color: "green" },
    { from: "kp.C2", to: "board.D4", color: "blue" },
    { from: "kp.C3", to: "board.D3", color: "purple" },
    { from: "kp.C4", to: "board.D2", color: "gray" },
    { from: "board.5V", to: "lcd.VCC", color: "red" },
    { from: "lcd.GND", to: "board.GND", color: "black" },
    { from: "lcd.SDA", to: "board.A4", color: "blue" },
    { from: "lcd.SCL", to: "board.A5", color: "yellow" },
    { from: "board.5V", to: "rly.VCC", color: "red" },
    { from: "rly.GND", to: "board.GND2", color: "black" },
    { from: "board.D10", to: "rly.IN", color: "orange" },
    { from: "bat.+", to: "rly.COM", color: "red", note: { en: "the relay only interrupts the lock's + wire", ru: "реле разрывает только плюс замка", kk: "реле тек құлыптың плюсін ажыратады" } },
    { from: "rly.NO", to: "lock.+", color: "red" },
    { from: "lock.-", to: "bat.-", color: "black", note: { en: "lock circuit is isolated by the relay, no GND to the Arduino needed", ru: "цепь замка развязана реле, GND с Arduino не нужен", kk: "құлып тізбегі релемен оқшауланған, Arduino-мен GND қажет емес" } },
    { from: "d1.K", to: "lock.+", color: "gray", note: { en: "stripe to lock +, right at the lock terminals", ru: "полоска к плюсу замка, прямо на его клеммах", kk: "жолақ құлып плюсіне, тікелей оның клеммаларында" } },
    { from: "d1.A", to: "lock.-", color: "gray" },
  ],
  steps: [
    {
      title: { en: "Connect the keypad", ru: "Подключите клавиатуру", kk: "Пернетақтаны қосыңыз" },
      body: {
        en: "Hold the keypad face up with the ribbon at the bottom. The 8 pins from left to right are R1, R2, R3, R4, C1, C2, C3, C4. Wire the rows to D9, D8, D7, D6 and the columns to D5, D4, D3, D2. No resistors are needed: the Keypad library enables the internal pull-ups.",
        ru: "Положите клавиатуру лицом вверх шлейфом вниз. 8 пинов слева направо: R1, R2, R3, R4, C1, C2, C3, C4. Строки подключите к D9, D8, D7, D6, столбцы — к D5, D4, D3, D2. Резисторы не нужны: библиотека Keypad включает внутренние подтяжки.",
        kk: "Пернетақтаны бетін жоғары, шлейфін төмен қаратып қойыңыз. 8 пин солдан оңға қарай: R1, R2, R3, R4, C1, C2, C3, C4. Жолдарды D9, D8, D7, D6-ға, бағандарды D5, D4, D3, D2-ге қосыңыз. Резистор қажет емес: Keypad кітапханасы ішкі тартуларды қосады.",
      },
      expect: { en: "Eight wires in a neat row from D9 down to D2.", ru: "Восемь проводов аккуратным рядом от D9 до D2.", kk: "D9-дан D2-ге дейін сегіз сым ретімен тұр." },
      mistake: { en: "Reversing the ribbon swaps rows and columns: pressing 1 prints D or nothing.", ru: "Перевёрнутый шлейф меняет строки и столбцы местами: нажатие 1 выводит D или ничего.", kk: "Шлейфті кері қоссаңыз, жолдар мен бағандар ауысады: 1-ді басқанда D шығады немесе ештеңе шықпайды." },
    },
    {
      title: { en: "Add the I²C LCD", ru: "Подключите I²C LCD", kk: "I²C LCD-ні қосыңыз" },
      body: {
        en: "The backpack has four pins: GND to GND, VCC to 5V, SDA to A4, SCL to A5 (the Uno's I²C pins). Upload an I²C scanner or just try the sketch: most backpacks answer at 0x27, some at 0x3F. Turn the blue contrast trimmer on the back until the text is crisp.",
        ru: "У платы-переходника четыре пина: GND на GND, VCC на 5V, SDA на A4, SCL на A5 (I²C-пины Uno). Загрузите I²C-сканер или сразу скетч: большинство плат отвечают по адресу 0x27, некоторые — 0x3F. Подкрутите синий подстроечник контраста на обороте, пока текст не станет чётким.",
        kk: "Адаптер платасында төрт пин бар: GND-ді GND-ге, VCC-ні 5V-қа, SDA-ны A4-ке, SCL-ді A5-ке (Uno-ның I²C пиндері) қосыңыз. I²C сканерін немесе бірден скетчті жүктеңіз: көп платалар 0x27 адресінде, кейбірі 0x3F-те жауап береді. Мәтін анық болғанша артындағы көк контраст бұрағышын бұраңыз.",
      },
      expect: { en: "After upload the top line reads \"Enter code:\".", ru: "После загрузки в верхней строке «Enter code:».", kk: "Жүктегеннен кейін жоғарғы жолда «Enter code:» жазуы шығады." },
      mistake: { en: "A lit backlight with no text almost always means wrong address or contrast, not a broken screen.", ru: "Подсветка горит, а текста нет — почти всегда неверный адрес или контраст, а не сломанный экран.", kk: "Жарығы жанып, мәтін болмаса, бұл экранның бұзылғанын емес, көбіне адрестің немесе контрасттың қате екенін білдіреді." },
    },
    {
      title: { en: "Wire the relay control side", ru: "Подключите управляющую сторону реле", kk: "Реленің басқару жағын қосыңыз" },
      body: {
        en: "Connect relay VCC to 5V, GND to GND and IN to D10. Most blue 1-channel modules switch on when IN is LOW, so the sketch sets RELAY_ACTIVE_LOW = true and writes HIGH at boot to keep the lock closed. If your module clicks on at power-up, set it to false.",
        ru: "Подключите VCC реле к 5V, GND к GND, IN к D10. Большинство синих одноканальных модулей срабатывают, когда IN = LOW, поэтому в скетче RELAY_ACTIVE_LOW = true, и при старте на пин подаётся HIGH, чтобы замок оставался закрытым. Если ваш модуль щёлкает сразу при включении, поставьте false.",
        kk: "Реленің VCC пинін 5V-қа, GND-ін GND-ге, IN-ін D10-ға қосыңыз. Көп көк бір арналы модульдер IN = LOW болғанда іске қосылады, сондықтан скетчте RELAY_ACTIVE_LOW = true, ал іске қосылғанда құлып жабық тұруы үшін пинге HIGH беріледі. Модуліңіз қуат бергенде бірден шертсе, false қойыңыз.",
      },
      expect: { en: "The relay stays silent at power-up and its LED is off.", ru: "При включении реле молчит, его светодиод не горит.", kk: "Қуат бергенде реле дыбыссыз, оның жарық диоды жанбайды." },
      mistake: { en: "Wiring IN to a keypad pin: the relay chatters every time the library scans the keys.", ru: "Если IN попал на пин клавиатуры, реле будет трещать при каждом опросе клавиш.", kk: "IN пернетақта пиніне қосылса, кітапхана пернелерді сұраған сайын реле шырылдайды." },
    },
    {
      title: { en: "Build the lock circuit", ru: "Соберите цепь замка", kk: "Құлып тізбегін құрастырыңыз" },
      body: {
        en: "Battery + goes to the relay's COM screw, the NO screw goes to the lock's red wire, and the lock's black wire returns to battery −. Solder or clamp the 1N4007 right across the lock terminals with its stripe on the + side. The relay contacts isolate this circuit, so it does not share GND with the Arduino. A 12 V lock still pulls at 9 V for short pulses; for a door used every day, wire a 12 V 1 A adapter to the same two points instead of the PP3.",
        ru: "Плюс батареи — на винт COM реле, винт NO — на красный провод замка, чёрный провод замка возвращается на минус батареи. Припаяйте или зажмите 1N4007 прямо на клеммах замка полоской к плюсу. Контакты реле развязывают эту цепь, поэтому общая GND с Arduino ей не нужна. Замок на 12 В срабатывает и от 9 В короткими импульсами; для двери, которой пользуются каждый день, подключите к тем же двум точкам адаптер 12 В 1 А вместо «Кроны».",
        kk: "Батареяның плюсін реленің COM бұрандасына, NO бұрандасын құлыптың қызыл сымына қосыңыз, ал құлыптың қара сымы батареяның минусына қайтады. 1N4007-ні жолағын плюс жаққа қаратып, тікелей құлып клеммаларына дәнекерлеңіз немесе қысыңыз. Реле түйіспелері бұл тізбекті оқшаулайды, сондықтан оған Arduino-мен ортақ GND қажет емес. 12 В құлып қысқа импульстармен 9 В-та да тартады; күнде қолданылатын есікке «Кронаның» орнына сол екі нүктеге 12 В 1 А адаптер қосыңыз.",
      },
      expect: { en: "With the relay off, the lock's plunger stays out; nothing in this circuit touches an Arduino pin.", ru: "При выключенном реле язычок замка выдвинут; ни один провод этой цепи не касается пинов Arduino.", kk: "Реле өшірулі кезде құлып тілі шығып тұрады; бұл тізбектің бірде-бір сымы Arduino пиндеріне тимейді." },
      mistake: { en: "Leaving out the diode: every release throws a high-voltage spike that pits the relay contacts and can reset the Arduino.", ru: "Без диода при каждом отпускании возникает выброс высокого напряжения: он обжигает контакты реле и может перезагрузить Arduino.", kk: "Диодсыз әр ажыратқанда жоғары кернеулі импульс пайда болады: ол реле түйіспелерін күйдіріп, Arduino-ны қайта жүктеуі мүмкін." },
    },
    {
      title: { en: "Set your PIN and test", ru: "Задайте PIN и проверьте", kk: "PIN орнатып, тексеріңіз" },
      body: {
        en: "Install \"Keypad\" and \"LiquidCrystal I2C\" from the Library Manager, change SECRET to your own code, upload and open the Serial Monitor at 9600 baud. Type the code and press # to enter; * clears. A correct code clicks the relay and opens the lock for 3 s. Three wrong codes in a row show a 30 s countdown.",
        ru: "Установите «Keypad» и «LiquidCrystal I2C» через Library Manager, поменяйте SECRET на свой код, загрузите скетч и откройте Serial Monitor на 9600 бод. Наберите код и нажмите # для ввода; * стирает. Верный код щёлкает реле и открывает замок на 3 с. Три неверных кода подряд включают отсчёт 30 с.",
        kk: "Library Manager арқылы «Keypad» және «LiquidCrystal I2C» кітапханаларын орнатып, SECRET-ті өз кодыңызға өзгертіңіз, скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Кодты теріп, енгізу үшін # басыңыз; * өшіреді. Дұрыс код релені шертіп, құлыпты 3 с-қа ашады. Қатарынан үш қате код 30 с кері санауды қосады.",
      },
      expect: { en: "LCD shows stars while typing, then \"Access granted\" or \"Wrong code 1/3\".", ru: "При наборе на LCD звёздочки, затем «Access granted» или «Wrong code 1/3».", kk: "Тергенде LCD-де жұлдызшалар, содан кейін «Access granted» немесе «Wrong code 1/3» шығады." },
      mistake: { en: "Holding the lock energised for minutes: cheap solenoids are rated for short pulses and overheat.", ru: "Держать замок под током минутами нельзя: дешёвые соленоиды рассчитаны на короткие импульсы и перегреваются.", kk: "Құлыпты минуттап тоқ астында ұстауға болмайды: арзан соленоидтар қысқа импульстарға арналған және қызып кетеді." },
    },
  ],
  code: [{
    filename: "keypad_lock.ino",
    language: "cpp",
    libraries: ["Keypad", "LiquidCrystal I2C"],
    source: `#include <Wire.h>
#include <Keypad.h>
#include <LiquidCrystal_I2C.h>

const int RELAY_PIN = 10;
const bool RELAY_ACTIVE_LOW = true;      // most 1-channel modules switch on LOW
const unsigned long UNLOCK_MS = 3000;
const unsigned long LOCKOUT_MS = 30000;
const char SECRET[] = "2580";            // change this to your own PIN

const byte ROWS = 4;
const byte COLS = 4;
char keys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};
byte rowPins[4] = {9, 8, 7, 6};          // R1..R4
byte colPins[4] = {5, 4, 3, 2};          // C1..C4

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);
LiquidCrystal_I2C lcd(0x27, 16, 2);      // try 0x3F if the screen stays blank

String entry = "";
byte wrongTries = 0;

void relay(bool on) {
  digitalWrite(RELAY_PIN, (on != RELAY_ACTIVE_LOW) ? HIGH : LOW);
}

void showPrompt() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Enter code:");
  lcd.setCursor(0, 1);
}

void unlock() {
  Serial.println("Code OK: unlocked");
  lcd.clear();
  lcd.print("Access granted");
  lcd.setCursor(0, 1);
  lcd.print("Door open 3 s");
  relay(true);
  delay(UNLOCK_MS);
  relay(false);
  Serial.println("Locked");
}

void lockout() {
  Serial.println("3 wrong codes: keypad locked for 30 s");
  lcd.clear();
  lcd.print("Too many tries");
  for (int s = LOCKOUT_MS / 1000; s > 0; s--) {
    lcd.setCursor(0, 1);
    lcd.print("Wait ");
    lcd.print(s);
    lcd.print(" s   ");
    delay(1000);
  }
  wrongTries = 0;
}

void setup() {
  relay(false);                // set the level first so the relay never clicks at boot
  pinMode(RELAY_PIN, OUTPUT);
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  showPrompt();
  Serial.println("Lock ready");
}

void loop() {
  char k = keypad.getKey();
  if (!k) return;

  if (k == '*') {                       // clear
    entry = "";
    showPrompt();
  } else if (k == '#') {                // submit
    Serial.print("entry: ");
    for (unsigned int i = 0; i < entry.length(); i++) Serial.print('*');
    Serial.println();
    if (entry == SECRET) {
      wrongTries = 0;
      unlock();
    } else {
      wrongTries++;
      Serial.print("Wrong code (");
      Serial.print(wrongTries);
      Serial.println("/3)");
      lcd.clear();
      lcd.print("Wrong code ");
      lcd.print(wrongTries);
      lcd.print("/3");
      delay(1500);
      if (wrongTries >= 3) lockout();
    }
    entry = "";
    showPrompt();
  } else if (k >= '0' && k <= '9' && entry.length() < 8) {
    entry += k;
    lcd.print('*');
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The LCD backlight is on but there is no text", ru: "Подсветка LCD горит, а текста нет", kk: "LCD жарығы жанып тұр, бірақ мәтін жоқ" },
      cause: { en: "Wrong I²C address or contrast turned all the way down.", ru: "Неверный I²C-адрес или контраст выкручен в ноль.", kk: "I²C адресі қате немесе контраст нөлге бұралған." },
      fix: { en: "Change 0x27 to 0x3F in the sketch and turn the contrast trimmer on the backpack slowly.", ru: "Поменяйте 0x27 на 0x3F в скетче и медленно покрутите подстроечник контраста на плате.", kk: "Скетчте 0x27-ні 0x3F-ке ауыстырыңыз да, платадағы контраст бұрағышын баяу бұраңыз." },
    },
    {
      symptom: { en: "Some keys print the wrong character or nothing", ru: "Некоторые клавиши дают не тот символ или ничего", kk: "Кейбір пернелер басқа таңба береді немесе ештеңе бермейді" },
      cause: { en: "Rows and columns are swapped or one ribbon wire is shifted.", ru: "Строки и столбцы перепутаны или один провод шлейфа сдвинут.", kk: "Жолдар мен бағандар ауысқан немесе шлейфтің бір сымы жылжыған." },
      fix: { en: "Check R1–R4 land on D9–D6 and C1–C4 on D5–D2; key 1 must sit on R1 and C1.", ru: "Проверьте, что R1–R4 на D9–D6, а C1–C4 на D5–D2; клавиша 1 должна быть на R1 и C1.", kk: "R1–R4 D9–D6-да, C1–C4 D5–D2-де екенін тексеріңіз; 1 пернесі R1 мен C1-де болуы керек." },
    },
    {
      symptom: { en: "The relay clicks but the lock does not move", ru: "Реле щёлкает, а замок не двигается", kk: "Реле шертеді, бірақ құлып қозғалмайды" },
      cause: { en: "The lock is on NC instead of NO, the battery is flat, or the latch is jammed under door pressure.", ru: "Замок подключён к NC вместо NO, батарея села, или язычок зажат дверью.", kk: "Құлып NO-ның орнына NC-ге қосылған, батарея отырған немесе тілін есік қысып тұр." },
      fix: { en: "Move the wire to NO, test with a fresh battery or the 12 V adapter, and leave a 1–2 mm gap at the strike plate.", ru: "Перенесите провод на NO, проверьте со свежей батареей или адаптером 12 В и оставьте зазор 1–2 мм у ответной планки.", kk: "Сымды NO-ға ауыстырыңыз, жаңа батареямен немесе 12 В адаптермен тексеріңіз және қарсы планкада 1–2 мм саңылау қалдырыңыз." },
    },
    {
      symptom: { en: "The Arduino resets when the lock fires", ru: "Arduino перезагружается при срабатывании замка", kk: "Құлып іске қосылғанда Arduino қайта жүктеледі" },
      cause: { en: "Missing or reversed flyback diode, or the lock wires run right next to the Arduino.", ru: "Нет защитного диода или он стоит наоборот, либо провода замка идут вплотную к Arduino.", kk: "Қорғаныс диоды жоқ немесе кері қойылған, не құлып сымдары Arduino-ға тым жақын өтеді." },
      fix: { en: "Fit the 1N4007 at the lock with the stripe on +, and route the lock wires away from the logic wiring.", ru: "Поставьте 1N4007 у замка полоской к плюсу и разведите провода замка подальше от сигнальных.", kk: "1N4007-ні құлыпқа жолағын плюске қаратып орнатыңыз және құлып сымдарын сигнал сымдарынан алыс жүргізіңіз." },
    },
  ],
  safety: [
    { en: "Energise the solenoid only for a few seconds at a time; most 12 V cabinet locks are not rated for continuous power.", ru: "Включайте соленоид только на несколько секунд: большинство мебельных замков на 12 В не рассчитаны на постоянный ток.", kk: "Соленоидты бір мезгілде тек бірнеше секундқа қосыңыз: 12 В жиһаз құлыптарының көбі тұрақты тоққа есептелмеген." },
    { en: "This is a learning project, not a certified lock: keep a mechanical key or another way in, and mount the electronics on the inside of the door.", ru: "Это учебный проект, а не сертифицированный замок: оставьте механический ключ или другой способ войти и ставьте электронику с внутренней стороны двери.", kk: "Бұл сертификатталған құлып емес, оқу жобасы: механикалық кілтті немесе кірудің басқа жолын қалдырыңыз және электрониканы есіктің ішкі жағына орнатыңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "Lock ready",
      "entry: ****",
      "Wrong code (1/3)",
      "entry: ****",
      "Code OK: unlocked",
      "Locked",
      "entry: ***",
      "Wrong code (1/3)",
      "entry: *****",
      "Wrong code (2/3)",
      "entry: ****",
      "Wrong code (3/3)",
      "3 wrong codes: keypad locked for 30 s",
    ],
    leds: [{ label: "RELAY", color: "#E53935" }],
  },
} satisfies GuideContent;
