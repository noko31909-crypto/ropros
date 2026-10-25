import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "keypad-safe-lock",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "security",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 17,
  xpReward: 260,
  title: {
    en: "Keypad Code Lock for a Box",
    ru: "Кодовый замок с клавиатурой для шкатулки",
    kk: "Қорапқа арналған пернетақталы кодты құлып",
  },
  summary: {
    en: "Type a 4–8 digit code on a 4×4 keypad and a servo pulls the latch. The LCD guides every step, three wrong tries trigger a 30-second lockout, and you can change the code without a computer.",
    ru: "Наберите код из 4–8 цифр на клавиатуре 4×4, и сервопривод отодвинет защёлку. LCD подсказывает каждый шаг, после трёх ошибок включается блокировка на 30 секунд, а код можно сменить без компьютера.",
    kk: "4×4 пернетақтада 4–8 цифрлы кодты теріңіз, сонда серво ысырманы тартады. LCD әр қадамды көрсетеді, үш қате әрекеттен кейін 30 секундтық бұғаттау қосылады, ал кодты компьютерсіз өзгертуге болады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Lock logic, stores the code in EEPROM", ru: "Логика замка, хранит код в EEPROM", kk: "Құлып логикасы, кодты EEPROM-да сақтайды" } },
    { component: "keypad-4x4", qty: 1, spec: { en: "membrane, 8-pin ribbon", ru: "мембранная, шлейф на 8 контактов", kk: "мембраналық, 8 контактілі шлейф" }, role: { en: "Code entry", ru: "Ввод кода", kk: "Кодты енгізу" } },
    { component: "lcd-1602-i2c", qty: 1, spec: { en: "PCF8574 backpack, 0x27 or 0x3F", ru: "плата PCF8574, 0x27 или 0x3F", kk: "PCF8574 тақшасы, 0x27 немесе 0x3F" }, role: { en: "Prompts and status", ru: "Подсказки и состояние", kk: "Нұсқаулар мен күй" } },
    { component: "servo-sg90", qty: 1, spec: { en: "SG90 micro servo, 1.8 kg·cm", ru: "микросерво SG90, 1,8 кг·см", kk: "SG90 микросервосы, 1,8 кг·см" }, role: { en: "Moves the latch bolt", ru: "Двигает задвижку", kk: "Ысырманы жылжытады" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V 1 A USB charger with a USB breakout or cut cable", ru: "USB-зарядка 5 В 1 А с переходником или разрезанным кабелем", kk: "Ауыстырғышы не кесілген кабелі бар 5 В 1 А USB зарядтағыш" }, role: { en: "Separate supply for the servo", ru: "Отдельное питание сервопривода", kk: "Сервоға арналған бөлек қорек" } },
    { component: "capacitor", qty: 1, spec: { en: "470 µF, 10 V or higher", ru: "470 мкФ, от 10 В", kk: "470 мкФ, 10 В не жоғары" }, role: { en: "Smooths the servo's current spikes", ru: "Сглаживает броски тока сервопривода", kk: "Серво тогының секірістерін тегістейді" } },
    { component: "enclosure", qty: 1, spec: { en: "wooden or 3D-printed box with a lid", ru: "деревянная или напечатанная коробка с крышкой", kk: "қақпағы бар ағаш не 3D басылған қорап" }, role: { en: "The box being locked", ru: "Запираемая шкатулка", kk: "Құлыпталатын қорап" } },
    { component: "jumper-wires", qty: 20, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "kp", component: "keypad-4x4", label: "Keypad" },
    { id: "lcd", component: "lcd-1602-i2c", label: "LCD 1602" },
    { id: "sv", component: "servo-sg90", label: "Latch servo" },
    { id: "psu", component: "usb-5v", label: "Servo 5 V" },
    { id: "c1", component: "capacitor", label: "470 µF" },
  ],
  connections: [
    { from: "kp.R1", to: "board.D9", color: "orange", note: { en: "ribbon pin 1 (leftmost)", ru: "контакт шлейфа 1 (крайний слева)", kk: "шлейфтің 1-контактісі (ең сол жақтағы)" } },
    { from: "kp.R2", to: "board.D8", color: "orange" },
    { from: "kp.R3", to: "board.D7", color: "orange" },
    { from: "kp.R4", to: "board.D6", color: "orange" },
    { from: "kp.C1", to: "board.D5", color: "blue" },
    { from: "kp.C2", to: "board.D4", color: "blue" },
    { from: "kp.C3", to: "board.D3", color: "blue" },
    { from: "kp.C4", to: "board.D2", color: "blue", note: { en: "ribbon pin 8 (rightmost)", ru: "контакт шлейфа 8 (крайний справа)", kk: "шлейфтің 8-контактісі (ең оң жақтағы)" } },
    { from: "board.5V", to: "lcd.VCC", color: "red" },
    { from: "lcd.GND", to: "board.GND", color: "black" },
    { from: "lcd.SDA", to: "board.A4", color: "green" },
    { from: "lcd.SCL", to: "board.A5", color: "yellow" },
    { from: "psu.5V", to: "sv.VCC", color: "red", note: { en: "servo power does not come from the Uno", ru: "питание серво не от Uno", kk: "серво қорегі Uno-дан емес" } },
    { from: "sv.GND", to: "psu.GND", color: "brown" },
    { from: "psu.GND", to: "board.GND2", color: "black", note: { en: "shared ground, required for the signal", ru: "общая земля, без неё сигнал не работает", kk: "ортақ жер, онсыз сигнал жұмыс істемейді" } },
    { from: "sv.SIG", to: "board.D10", color: "yellow" },
    { from: "c1.A", to: "psu.5V", color: "red", note: { en: "+ leg (the longer one)", ru: "ножка + (длинная)", kk: "+ аяғы (ұзыны)" } },
    { from: "c1.B", to: "psu.GND", color: "black" },
  ],
  steps: [
    {
      title: { en: "Connect the keypad", ru: "Подключите клавиатуру", kk: "Пернетақтаны қосыңыз" },
      body: {
        en: "Look at the keypad from the front: the 8 ribbon pins are R1 R2 R3 R4 C1 C2 C3 C4 from left to right. Connect R1–R4 to D9, D8, D7, D6 and C1–C4 to D5, D4, D3, D2. The Keypad library scans it by pulling one row LOW at a time and reading the columns with internal pull-ups, so no resistors are needed.",
        ru: "Посмотрите на клавиатуру спереди: 8 контактов шлейфа слева направо это R1 R2 R3 R4 C1 C2 C3 C4. Подключите R1–R4 к D9, D8, D7, D6, а C1–C4 к D5, D4, D3, D2. Библиотека Keypad сканирует её, по очереди притягивая строки к LOW и читая столбцы через внутренние подтяжки, поэтому резисторы не нужны.",
        kk: "Пернетақтаға алдынан қараңыз: шлейфтің 8 контактісі солдан оңға қарай R1 R2 R3 R4 C1 C2 C3 C4. R1–R4-ті D9, D8, D7, D6-ға, ал C1–C4-ті D5, D4, D3, D2-ге қосыңыз. Keypad кітапханасы жолдарды кезекпен LOW-ға тартып, бағандарды ішкі тартулар арқылы оқиды, сондықтан резисторлар қажет емес.",
      },
      expect: { en: "Eight wires in a neat row, D9 down to D2.", ru: "Восемь проводов аккуратным рядом, от D9 до D2.", kk: "D9-дан D2-ге дейін ретті тізілген сегіз сым." },
      mistake: { en: "Using D0/D1 for the keypad: those are the USB serial pins and break uploading.", ru: "Использовать D0/D1 для клавиатуры: это пины USB-порта, и загрузка перестанет работать.", kk: "Пернетақтаға D0/D1 пайдалану: бұл USB порттың пиндері, жүктеу жұмыс істемей қалады." },
    },
    {
      title: { en: "Add the LCD", ru: "Добавьте LCD", kk: "LCD қосыңыз" },
      body: {
        en: "Connect the LCD backpack: VCC to 5V, GND to GND, SDA to A4, SCL to A5. If you later see only a row of blocks, turn the small blue contrast trimmer on the back.",
        ru: "Подключите плату LCD: VCC к 5V, GND к GND, SDA к A4, SCL к A5. Если потом увидите только ряд прямоугольников, покрутите маленький синий подстроечник контраста на обороте.",
        kk: "LCD тақшасын қосыңыз: VCC 5V-ке, GND GND-ге, SDA A4-ке, SCL A5-ке. Кейін тек тіктөртбұрыштар қатарын көрсеңіз, артқы жағындағы кішкентай көк контраст реттегішін бұраңыз.",
      },
      expect: { en: "The backlight is on.", ru: "Подсветка горит.", kk: "Жарығы жанып тұр." },
      mistake: { en: "Printing nothing at address 0x27 when the backpack uses 0x3F: change the address in the sketch.", ru: "Ничего не выводится по адресу 0x27, когда у платы 0x3F: поменяйте адрес в скетче.", kk: "Тақша 0x3F болғанда 0x27 мекенжайы бойынша ештеңе шықпайды: скетчтегі мекенжайды өзгертіңіз." },
    },
    {
      title: { en: "Power the servo separately", ru: "Подайте на серво отдельное питание", kk: "Сервоға бөлек қорек беріңіз" },
      body: {
        en: "An SG90 can draw up to about 650 mA when it starts or stalls against the latch, more than the Uno's 5V pin should supply; the dip would reset the Uno or scramble the LCD right at the moment of unlocking. Feed the servo's red wire from a separate 5 V USB charger and its brown wire to that charger's GND. Join the charger GND to an Arduino GND so the signal on D10 has a common reference. Put the 470 µF capacitor across the servo supply, + leg to 5 V.",
        ru: "SG90 при старте или упоре в защёлку может брать до ~650 мА, больше, чем стоит снимать с пина 5V Uno: просадка перезагрузит Uno или испортит LCD как раз в момент открытия. Питайте красный провод серво от отдельной USB-зарядки 5 В, а коричневый подключите к её GND. Соедините GND зарядки с GND Arduino, чтобы у сигнала на D10 была общая опора. Поставьте конденсатор 470 мкФ на питание серво, ножкой + к 5 В.",
        kk: "SG90 іске қосылғанда немесе ысырмаға тірелгенде ~650 мА-ге дейін тұтынуы мүмкін, бұл Uno-ның 5V пинінен алуға болатыннан көп: кернеудің түсуі дәл ашылу сәтінде Uno-ны қайта жүктейді немесе LCD-ді бұзады. Сервоның қызыл сымын бөлек 5 В USB зарядтағыштан қоректендіріп, қоңыр сымын оның GND-іне қосыңыз. D10-дағы сигналдың ортақ тірегі болуы үшін зарядтағыштың GND-ін Arduino GND-імен жалғаңыз. 470 мкФ конденсаторды серво қорегіне, + аяғын 5 В-қа қаратып қойыңыз.",
      },
      expect: { en: "Servo: red to charger 5 V, brown to GND, orange (signal) to D10; grounds joined.", ru: "Серво: красный к 5 В зарядки, коричневый к GND, оранжевый (сигнал) к D10; земли соединены.", kk: "Серво: қызылы зарядтағыштың 5 В-іне, қоңыры GND-ге, қызғылт сарысы (сигнал) D10-ға; жерлер жалғанған." },
      mistake: { en: "Forgetting the shared GND: the servo twitches randomly or does not move at all.", ru: "Забыть общий GND: серво случайно дёргается или вообще не двигается.", kk: "Ортақ GND-ді ұмыту: серво кездейсоқ тартылады немесе мүлдем қозғалмайды." },
    },
    {
      title: { en: "Upload and learn the keys", ru: "Загрузите скетч и запомните клавиши", kk: "Скетчті жүктеп, пернелерді үйреніңіз" },
      body: {
        en: "Install \"Keypad\" (Mark Stanley, Alexander Brevig) and \"LiquidCrystal I2C\" (Frank de Brabander); Servo and EEPROM come with the IDE. Upload. The factory code is 1234. Type digits (shown as *), press # to enter, * to clear. When open, # locks again and A starts a code change: type the new 4–8 digit code, #, type it again, #. The new code is saved to EEPROM and survives power cuts.",
        ru: "Установите «Keypad» (Mark Stanley, Alexander Brevig) и «LiquidCrystal I2C» (Frank de Brabander); Servo и EEPROM уже есть в IDE. Загрузите скетч. Заводской код 1234. Вводите цифры (видны как *), # подтверждает, * стирает. В открытом состоянии # снова запирает, а A начинает смену кода: введите новый код из 4–8 цифр, #, повторите, #. Новый код сохраняется в EEPROM и не теряется при отключении питания.",
        kk: "«Keypad» (Mark Stanley, Alexander Brevig) және «LiquidCrystal I2C» (Frank de Brabander) орнатыңыз; Servo мен EEPROM IDE-де бар. Скетчті жүктеңіз. Зауыттық код 1234. Цифрларды теріңіз (* болып көрінеді), # растайды, * өшіреді. Ашық күйде # қайта құлыптайды, ал A кодты өзгертуді бастайды: 4–8 цифрлы жаңа кодты теріп, #, қайталап, # басыңыз. Жаңа код EEPROM-ға сақталып, қуат өшсе де жоғалмайды.",
      },
      expect: { en: "1234 # moves the servo to 90° and the LCD shows \"OPEN\".", ru: "1234 # поворачивает серво на 90°, а LCD показывает «OPEN».", kk: "1234 # сервоны 90°-қа бұрып, LCD «OPEN» көрсетеді." },
      mistake: { en: "Keys giving wrong characters (5 gives 8, etc.) mean the rows or columns are in the wrong order on the pins.", ru: "Если клавиши дают не те символы (5 даёт 8 и т. п.), строки или столбцы подключены не в том порядке.", kk: "Пернелер басқа таңба берсе (5 орнына 8 т.б.), жолдар немесе бағандар пиндерге дұрыс емес ретпен қосылған." },
    },
    {
      title: { en: "Build the latch", ru: "Сделайте защёлку", kk: "Ысырманы жасаңыз" },
      body: {
        en: "Mount the servo inside the box wall with double-sided tape or screws. Bend a stiff wire or cut a plastic arm so that at 0° it reaches into a slot or a bracket on the lid, and at 90° it is clear of it. Adjust LOCKED_ANGLE and OPEN_ANGLE in the sketch if your geometry differs. The sketch powers the servo only while moving (about 0.6 s), so it does not buzz or warm up while idle.",
        ru: "Закрепите серво на внутренней стенке коробки двусторонним скотчем или винтами. Согните жёсткую проволоку или вырежьте пластиковую качалку так, чтобы при 0° она заходила в прорезь или скобу на крышке, а при 90° освобождала её. Если геометрия другая, поправьте LOCKED_ANGLE и OPEN_ANGLE в скетче. Скетч управляет серво только во время движения (около 0,6 с), поэтому в покое она не жужжит и не греется.",
        kk: "Сервоны қораптың ішкі қабырғасына екі жақты скотчпен немесе бұрандалармен бекітіңіз. Қатты сымды майыстырып немесе пластик иінді кесіп, 0°-та ол қақпақтағы саңылауға не ілгекке кіретіндей, ал 90°-та одан босайтындай етіңіз. Геометрия басқаша болса, скетчтегі LOCKED_ANGLE мен OPEN_ANGLE-ді түзетіңіз. Скетч сервоны тек қозғалыс кезінде (шамамен 0,6 с) басқарады, сондықтан тыныштықта ол ызыңдамайды және қызбайды.",
      },
      expect: { en: "Locked: the lid cannot open. Correct code: it opens.", ru: "Заперто: крышка не открывается. Верный код: открывается.", kk: "Құлыпталған: қақпақ ашылмайды. Дұрыс код: ашылады." },
      mistake: { en: "Mounting the servo outside the box, where anyone can push the arm back by hand.", ru: "Ставить серво снаружи коробки, где любой может отодвинуть качалку рукой.", kk: "Сервоны қораптың сыртына орнату: онда кез келген адам иінді қолмен ысырып тастай алады." },
    },
    {
      title: { en: "Test the lockout", ru: "Проверьте блокировку", kk: "Бұғаттауды тексеріңіз" },
      body: {
        en: "Enter a wrong code three times: the LCD shows a 30-second countdown and ignores the keypad until it ends. Before closing the box for real, make sure you have a way back in that does not need the code, such as a hidden access hole to push the latch, in case the battery dies or you forget the code.",
        ru: "Введите неверный код три раза: LCD покажет обратный отсчёт 30 секунд и будет игнорировать клавиатуру до его конца. Прежде чем закрыть шкатулку по-настоящему, предусмотрите способ открыть её без кода, например скрытое отверстие, чтобы отодвинуть защёлку, на случай если сядет питание или вы забудете код.",
        kk: "Қате кодты үш рет енгізіңіз: LCD 30 секундтық кері санақты көрсетіп, ол біткенше пернетақтаны елемейді. Қорапты шын жабар алдында қуат таусылса немесе кодты ұмытсаңыз, оны кодсыз ашу жолын қарастырыңыз, мысалы ысырманы итеру үшін жасырын тесік.",
      },
      expect: { en: "\"LOCKED OUT\" with a countdown, then the normal prompt returns.", ru: "«LOCKED OUT» с обратным отсчётом, затем обычный запрос кода.", kk: "Кері санақпен «LOCKED OUT», содан кейін қалыпты код сұрауы қайтады." },
      mistake: { en: "Locking something important inside before testing the code change and the mechanical override.", ru: "Запереть внутри что-то важное до проверки смены кода и механического аварийного открытия.", kk: "Кодты өзгертуді және механикалық апаттық ашуды тексермей тұрып, ішіне маңызды затты құлыптап қою." },
    },
  ],
  code: [{
    filename: "keypad_safe_lock.ino",
    language: "cpp",
    libraries: ["Keypad", "LiquidCrystal I2C"],
    source: `#include <Wire.h>
#include <EEPROM.h>
#include <Servo.h>
#include <Keypad.h>
#include <LiquidCrystal_I2C.h>

const int SERVO_PIN = 10;
const int LOCKED_ANGLE = 0;
const int OPEN_ANGLE = 90;
const byte MAX_TRIES = 3;
const unsigned long LOCKOUT_MS = 30000;
const byte EE_MAGIC = 0xA5;        // EEPROM layout: [0] magic, [1] length, [2..9] digits

const byte ROWS = 4, COLS = 4;
char keys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'},
};
byte rowPins[4] = {9, 8, 7, 6};    // R1..R4
byte colPins[4] = {5, 4, 3, 2};    // C1..C4
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

LiquidCrystal_I2C lcd(0x27, 16, 2); // 0x3F on some backpacks
Servo latch;

enum Mode { LOCKED, OPEN, NEW_CODE, CONFIRM, LOCKOUT };
Mode mode = LOCKED;
char code[9] = "1234";
char input[9] = "";
char firstEntry[9] = "";
byte tries = 0;
unsigned long lockoutUntil = 0, lastTick = 0;

void show(const char *top, const char *bottom) {
  char line[17];
  lcd.setCursor(0, 0);
  snprintf(line, sizeof(line), "%-16s", top);
  lcd.print(line);
  lcd.setCursor(0, 1);
  snprintf(line, sizeof(line), "%-16s", bottom);
  lcd.print(line);
}

void showStars(const char *top) {
  char stars[9];
  byte n = strlen(input);
  for (byte i = 0; i < n; i++) stars[i] = '*';
  stars[n] = '\\0';
  show(top, stars);
}

void moveLatch(int angle) {
  latch.attach(SERVO_PIN);
  latch.write(angle);
  delay(600);                      // give it time to get there
  latch.detach();                  // no buzzing or current while idle
}

void loadCode() {
  if (EEPROM.read(0) != EE_MAGIC) return;      // keep the factory code 1234
  byte len = EEPROM.read(1);
  if (len < 4 || len > 8) return;
  for (byte i = 0; i < len; i++) code[i] = EEPROM.read(2 + i);
  code[len] = '\\0';
}

void saveCode(const char *c) {
  byte len = strlen(c);
  for (byte i = 0; i < len; i++) EEPROM.update(2 + i, c[i]);
  EEPROM.update(1, len);
  EEPROM.update(0, EE_MAGIC);
  strcpy(code, c);
}

void clearInput() { input[0] = '\\0'; }

bool addDigit(char k) {
  byte n = strlen(input);
  if (k < '0' || k > '9' || n >= 8) return false;
  input[n] = k;
  input[n + 1] = '\\0';
  return true;
}

void lockNow() {
  moveLatch(LOCKED_ANGLE);
  mode = LOCKED;
  clearInput();
  show("LOCKED", "Code + #");
  Serial.println("locked");
}

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  loadCode();
  lockNow();
}

void loop() {
  if (mode == LOCKOUT) {
    keypad.getKey();               // ignore keys during the lockout
    long left = (long)(lockoutUntil - millis());
    if (left <= 0) {
      tries = 0;
      mode = LOCKED;
      clearInput();
      show("LOCKED", "Code + #");
    } else if (millis() - lastTick >= 1000) {
      lastTick = millis();
      char buf[17];
      snprintf(buf, sizeof(buf), "wait %2ld s", left / 1000 + 1);
      show("LOCKED OUT", buf);
    }
    return;
  }

  char k = keypad.getKey();
  if (!k) return;

  if (mode == LOCKED) {
    if (addDigit(k)) showStars("Code:");
    else if (k == '*') { clearInput(); show("LOCKED", "Code + #"); }
    else if (k == '#') {
      if (strcmp(input, code) == 0) {
        tries = 0;
        moveLatch(OPEN_ANGLE);
        mode = OPEN;
        show("OPEN", "#=lock A=change");
        Serial.println("unlocked");
      } else {
        tries++;
        clearInput();
        Serial.print("wrong code (");
        Serial.print(tries);
        Serial.print("/");
        Serial.print(MAX_TRIES);
        Serial.println(")");
        if (tries >= MAX_TRIES) {
          mode = LOCKOUT;
          lockoutUntil = millis() + LOCKOUT_MS;
          lastTick = 0;
          Serial.println("lockout 30 s");
        } else {
          char buf[17];
          snprintf(buf, sizeof(buf), "Wrong %d/%d", tries, MAX_TRIES);
          show(buf, "Code + #");
        }
      }
    }
  } else if (mode == OPEN) {
    if (k == '#') lockNow();
    else if (k == 'A') {
      mode = NEW_CODE;
      clearInput();
      show("New code 4-8", "digits, then #");
    }
  } else if (mode == NEW_CODE || mode == CONFIRM) {
    if (addDigit(k)) showStars(mode == NEW_CODE ? "New code:" : "Repeat:");
    else if (k == '*') { mode = OPEN; show("Cancelled", "#=lock A=change"); }
    else if (k == '#') {
      if (mode == NEW_CODE) {
        if (strlen(input) < 4) { clearInput(); show("Too short", "4-8 digits + #"); return; }
        strcpy(firstEntry, input);
        clearInput();
        mode = CONFIRM;
        show("Repeat new code", "then #");
      } else {
        if (strcmp(input, firstEntry) == 0) {
          saveCode(input);
          show("Code saved", "#=lock A=change");
          Serial.println("new code saved");
        } else {
          show("No match", "#=lock A=change");
          Serial.println("codes did not match");
        }
        clearInput();
        mode = OPEN;
      }
    }
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Some keys do nothing or give the wrong character", ru: "Некоторые клавиши не работают или дают не тот символ", kk: "Кейбір пернелер жұмыс істемейді немесе басқа таңба береді" },
      cause: { en: "The ribbon is plugged in reversed or shifted by one pin.", ru: "Шлейф вставлен наоборот или сдвинут на один контакт.", kk: "Шлейф кері салынған немесе бір контактіге ығысқан." },
      fix: { en: "With the keypad face up, the leftmost ribbon pin is R1 → D9 and the rightmost is C4 → D2.", ru: "Если смотреть на клавиатуру лицом, крайний левый контакт R1 → D9, крайний правый C4 → D2.", kk: "Пернетақтаға бет жағынан қарағанда, ең сол жақтағы контакт R1 → D9, ең оң жақтағысы C4 → D2." },
    },
    {
      symptom: { en: "The Uno resets or the LCD shows garbage when the servo moves", ru: "Uno перезагружается или LCD показывает мусор, когда двигается серво", kk: "Серво қозғалғанда Uno қайта жүктеледі немесе LCD бөгде таңбалар көрсетеді" },
      cause: { en: "The servo is powered from the Uno's 5V pin, or the 470 µF capacitor is missing.", ru: "Серво питается от пина 5V Uno, или нет конденсатора 470 мкФ.", kk: "Серво Uno-ның 5V пинінен қоректенеді немесе 470 мкФ конденсатор жоқ." },
      fix: { en: "Move the servo's red wire to the separate 5 V supply and add the capacitor across it.", ru: "Перенесите красный провод серво на отдельный источник 5 В и поставьте конденсатор на его выводы.", kk: "Сервоның қызыл сымын бөлек 5 В қорек көзіне ауыстырып, оның шықпаларына конденсатор қойыңыз." },
    },
    {
      symptom: { en: "Servo jitters or does not move", ru: "Серво дрожит или не двигается", kk: "Серво дірілдейді немесе қозғалмайды" },
      cause: { en: "No shared ground between the servo supply and the Arduino.", ru: "Нет общей земли между питанием серво и Arduino.", kk: "Серво қорегі мен Arduino арасында ортақ жер жоқ." },
      fix: { en: "Add the wire from the servo supply GND to an Arduino GND pin.", ru: "Добавьте провод от GND питания серво к пину GND Arduino.", kk: "Серво қорегінің GND-інен Arduino GND пиніне сым қосыңыз." },
    },
    {
      symptom: { en: "Forgot the new code", ru: "Забыли новый код", kk: "Жаңа кодты ұмыттыңыз" },
      cause: { en: "The code is stored in EEPROM and survives power cuts.", ru: "Код хранится в EEPROM и переживает отключение питания.", kk: "Код EEPROM-да сақталады және қуат өшсе де жоғалмайды." },
      fix: { en: "Open the box with your mechanical override, then upload a sketch that runs EEPROM.write(0, 0) once; the code returns to 1234.", ru: "Откройте шкатулку аварийным механическим способом и загрузите скетч, который один раз выполнит EEPROM.write(0, 0): код вернётся к 1234.", kk: "Қорапты механикалық апаттық жолмен ашып, бір рет EEPROM.write(0, 0) орындайтын скетч жүктеңіз: код 1234-ке қайтады." },
    },
  ],
  safety: [
    { en: "This is a learning project, not a real safe: anyone with a USB cable can read or reset the code. Never lock in medicines, money or anything dangerous.", ru: "Это учебный проект, а не настоящий сейф: любой с USB-кабелем может прочитать или сбросить код. Не запирайте лекарства, деньги или что-то опасное.", kk: "Бұл оқу жобасы, нағыз сейф емес: USB кабелі бар кез келген адам кодты оқып не нөлдей алады. Дәрі-дәрмекті, ақшаны немесе қауіпті заттарды құлыптамаңыз." },
    { en: "Keep fingers away from the latch while the servo moves.", ru: "Не держите пальцы у защёлки, пока двигается серво.", kk: "Серво қозғалып жатқанда саусақтарыңызды ысырмадан аулақ ұстаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "locked",
      "wrong code (1/3)",
      "unlocked",
      "new code saved",
      "locked",
      "wrong code (1/3)",
      "wrong code (2/3)",
      "wrong code (3/3)",
      "lockout 30 s",
      "unlocked",
      "locked",
    ],
    leds: [],
  },
} satisfies GuideContent;
