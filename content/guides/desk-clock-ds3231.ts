import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "desk-clock-ds3231",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "displays",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 11,
  xpReward: 150,
  title: {
    en: "Desk Clock with DS3231 and TM1637",
    ru: "Настольные часы на DS3231 и TM1637",
    kk: "DS3231 және TM1637 негізіндегі үстел сағаты",
  },
  summary: {
    en: "A DS3231 real-time clock keeps time to about a minute a year, even unplugged; a 4-digit TM1637 display shows it and two buttons set the hours and minutes.",
    ru: "Часы реального времени DS3231 уходят примерно на минуту в год и не сбиваются без питания; 4-разрядный TM1637 показывает время, а две кнопки выставляют часы и минуты.",
    kk: "DS3231 нақты уақыт сағаты жылына шамамен бір минутқа ғана ауытқиды және қуатсыз да уақытты сақтайды; 4 разрядты TM1637 уақытты көрсетеді, ал екі батырма сағат пен минутты орнатады.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V, USB powered", ru: "ATmega328P, 5 В, питание от USB", kk: "ATmega328P, 5 В, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "rtc-ds3231", qty: 1, spec: { en: "ZS-042 board + LIR2032 rechargeable cell", ru: "плата ZS-042 + аккумулятор LIR2032", kk: "ZS-042 платасы + LIR2032 аккумуляторы" }, role: { en: "Keeps time, also when unplugged", ru: "Хранит время, в том числе без питания", kk: "Уақытты сақтайды, қуатсыз кезде де" } },
    { component: "tm1637-display", qty: 1, spec: { en: "0.56\" 4-digit, with centre colon", ru: "0,56\", 4 разряда, с двоеточием", kk: "0,56\", 4 разрядты, қос нүктесі бар" }, role: { en: "Shows HH:MM", ru: "Показывает ЧЧ:ММ", kk: "СС:ММ көрсетеді" } },
    { component: "push-button", qty: 2, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Set hours / set minutes", ru: "Установка часов / минут", kk: "Сағатты / минутты орнату" } },
    { component: "breadboard", qty: 1, spec: { en: "full size, 830 points", ru: "полноразмерная, 830 точек", kk: "толық өлшемді, 830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 14, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "rtc", component: "rtc-ds3231", label: "DS3231" },
    { id: "disp", component: "tm1637-display", label: "TM1637" },
    { id: "btn_h", component: "push-button", label: "Hour +" },
    { id: "btn_m", component: "push-button", label: "Minute +" },
  ],
  connections: [
    { from: "board.5V", to: "rtc.VCC", color: "red" },
    { from: "rtc.GND", to: "board.GND", color: "black" },
    { from: "board.A4", to: "rtc.SDA", color: "blue", note: { en: "I²C data", ru: "данные I²C", kk: "I²C деректері" } },
    { from: "board.A5", to: "rtc.SCL", color: "yellow", note: { en: "I²C clock", ru: "тактирование I²C", kk: "I²C тактілеу" } },
    { from: "board.5V", to: "disp.VCC", color: "red" },
    { from: "disp.GND", to: "board.GND2", color: "black" },
    { from: "board.D2", to: "disp.CLK", color: "green" },
    { from: "board.D3", to: "disp.DIO", color: "white" },
    { from: "board.D4", to: "btn_h.1", color: "orange", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажато = LOW", kk: "ішкі тарту, басылғанда = LOW" } },
    { from: "btn_h.2", to: "board.GND", color: "black" },
    { from: "board.D5", to: "btn_m.1", color: "purple", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажато = LOW", kk: "ішкі тарту, басылғанда = LOW" } },
    { from: "btn_m.2", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Prepare the RTC battery", ru: "Подготовьте батарейку RTC", kk: "RTC батареясын дайындаңыз" },
      body: {
        en: "The ZS-042 board has a small charging circuit that tops up the coin cell from VCC. Fit a rechargeable LIR2032 cell. If you only have a plain CR2032, remove the charging diode or its 200 Ω resistor next to the battery holder first, because charging a non-rechargeable cell can make it leak or swell.",
        ru: "На плате ZS-042 есть простая схема подзарядки, которая подзаряжает батарейку от VCC. Поставьте аккумулятор LIR2032. Если у вас только обычная CR2032, сначала выпаяйте диод зарядки или его резистор 200 Ом возле держателя: зарядка неперезаряжаемой батарейки может привести к утечке или вздутию.",
        kk: "ZS-042 платасында батареяны VCC-ден толықтыратын қарапайым зарядтау тізбегі бар. LIR2032 аккумуляторын салыңыз. Егер қолыңызда тек кәдімгі CR2032 болса, алдымен ұстағыштың жанындағы зарядтау диодын немесе оның 200 Ом резисторын ағытып алыңыз: қайта зарядталмайтын батареяны зарядтау оның ағуына немесе ісінуіне әкелуі мүмкін.",
      },
      expect: { en: "A LIR2032 in the holder, or a CR2032 with the charging path removed.", ru: "В держателе LIR2032 или CR2032 с удалённой цепью зарядки.", kk: "Ұстағышта LIR2032 немесе зарядтау тізбегі алынған CR2032 тұр." },
      mistake: { en: "Leaving a CR2032 on the charging circuit for months.", ru: "Оставить CR2032 на цепи зарядки на месяцы.", kk: "CR2032-ні зарядтау тізбегінде айлар бойы қалдыру." },
    },
    {
      title: { en: "Wire the DS3231 to the I²C pins", ru: "Подключите DS3231 к пинам I²C", kk: "DS3231-ді I²C пиндеріне қосыңыз" },
      body: {
        en: "Place the Nano across the breadboard centre. Connect RTC VCC to 5V and GND to GND. On the Nano the I²C pins are A4 (SDA) and A5 (SCL): wire them to the RTC's SDA and SCL. The ZS-042 already has pull-up resistors, so no extra parts are needed. Leave 32K and SQW unconnected.",
        ru: "Поставьте Nano поперёк центральной канавки макетки. Подключите VCC RTC к 5V, GND к GND. На Nano пины I²C это A4 (SDA) и A5 (SCL): соедините их с SDA и SCL модуля. На ZS-042 уже есть подтягивающие резисторы, дополнительные детали не нужны. Выводы 32K и SQW оставьте свободными.",
        kk: "Nano-ны макет тақтасының ортаңғы ойығына көлденең қойыңыз. RTC-нің VCC-ін 5V-ке, GND-ін GND-ге қосыңыз. Nano-да I²C пиндері A4 (SDA) және A5 (SCL): оларды модульдің SDA және SCL пиндеріне қосыңыз. ZS-042-де тартқыш резисторлар бар, қосымша бөлшек керек емес. 32K және SQW шықпаларын бос қалдырыңыз.",
      },
      expect: { en: "Four wires between the RTC and the Nano.", ru: "Четыре провода между RTC и Nano.", kk: "RTC мен Nano арасында төрт сым." },
      mistake: { en: "Swapping SDA and SCL gives \"Couldn't find RTC\".", ru: "Если перепутать SDA и SCL, будет «Couldn't find RTC».", kk: "SDA мен SCL-ді ауыстырсаңыз, «Couldn't find RTC» шығады." },
    },
    {
      title: { en: "Connect the TM1637 display", ru: "Подключите дисплей TM1637", kk: "TM1637 дисплейін қосыңыз" },
      body: {
        en: "The TM1637 uses its own two-wire protocol, not I²C, so it can go on any digital pins. Wire CLK to D2, DIO to D3, VCC to 5V and GND to GND. At full brightness it can draw up to 80 mA; the sketch sets brightness 5 of 7, which is plenty for a desk.",
        ru: "TM1637 работает по своему двухпроводному протоколу, это не I²C, поэтому его можно подключить к любым цифровым пинам. CLK к D2, DIO к D3, VCC к 5V, GND к GND. На полной яркости он берёт до 80 мА; скетч ставит яркость 5 из 7, для стола этого достаточно.",
        kk: "TM1637 I²C емес, өзінің екі сымды хаттамасымен жұмыс істейді, сондықтан оны кез келген цифрлық пиндерге қосуға болады. CLK-ті D2-ге, DIO-ны D3-ке, VCC-ті 5V-ке, GND-ні GND-ге қосыңыз. Толық жарықтықта ол 80 мА-ға дейін тұтынады; скетч жарықтықты 7-ден 5-ке қояды, үстелге бұл жеткілікті.",
      },
      expect: { en: "Display wired to D2/D3 and the 5V rail.", ru: "Дисплей подключён к D2/D3 и шине 5V.", kk: "Дисплей D2/D3-ке және 5V шинасына қосылған." },
      mistake: { en: "Putting CLK and DIO on A4/A5 makes it fight the RTC on the I²C bus.", ru: "Если посадить CLK и DIO на A4/A5, дисплей будет мешать RTC на шине I²C.", kk: "CLK пен DIO-ны A4/A5-ке қоссаңыз, дисплей I²C шинасында RTC-ге кедергі келтіреді." },
    },
    {
      title: { en: "Add the two setting buttons", ru: "Добавьте две кнопки настройки", kk: "Екі баптау батырмасын қосыңыз" },
      body: {
        en: "Place both buttons across the breadboard gap. Wire one leg of the hour button to D4 and the diagonally opposite leg to GND; do the same for the minute button on D5. The sketch enables the internal pull-ups, so a pin reads HIGH at rest and LOW while pressed. Holding a button repeats the step every 200 ms after a short pause.",
        ru: "Поставьте обе кнопки поперёк канавки макетки. Одну ножку кнопки часов подключите к D4, а ножку по диагонали к GND; кнопку минут так же к D5. Скетч включает внутренние подтяжки, поэтому пин читает HIGH в покое и LOW при нажатии. Если держать кнопку, после короткой паузы шаг повторяется каждые 200 мс.",
        kk: "Екі батырманы да макет тақтасының ойығына көлденең қойыңыз. Сағат батырмасының бір аяғын D4-ке, ал диагональ бойынша қарсы аяғын GND-ге қосыңыз; минут батырмасын да солай D5-ке қосыңыз. Скетч ішкі тартуларды қосады, сондықтан пин тыныштықта HIGH, ал басылғанда LOW оқиды. Батырманы ұстап тұрсаңыз, қысқа үзілістен кейін қадам әр 200 мс сайын қайталанады.",
      },
      expect: { en: "Each button connects its pin to GND only while pressed.", ru: "Каждая кнопка замыкает свой пин на GND только при нажатии.", kk: "Әр батырма өз пинін тек басылғанда ғана GND-ге тұйықтайды." },
      mistake: { en: "Using two legs on the same side: those are always connected, so the time races forward.", ru: "Если взять две ножки с одной стороны, они всегда замкнуты, и время начинает бежать.", kk: "Бір жақтағы екі аяқты алсаңыз, олар әрдайым тұйық, сондықтан уақыт жүгіріп кетеді." },
    },
    {
      title: { en: "Install the libraries and upload", ru: "Установите библиотеки и загрузите скетч", kk: "Кітапханаларды орнатып, скетчті жүктеңіз" },
      body: {
        en: "Install \"RTClib\" (Adafruit) and \"TM1637\" (Avishay Orpaz) from Library Manager. Select Arduino Nano (try \"ATmega328P (Old Bootloader)\" if the upload times out) and upload. If the RTC reports that it lost power, the sketch sets it to the time the sketch was compiled, so it starts only a few seconds off.",
        ru: "Установите из менеджера библиотек «RTClib» (Adafruit) и «TM1637» (Avishay Orpaz). Выберите Arduino Nano (если загрузка зависает, попробуйте «ATmega328P (Old Bootloader)») и загрузите скетч. Если RTC сообщает о потере питания, скетч ставит время компиляции, так что часы отстают всего на несколько секунд.",
        kk: "Кітапханалар менеджерінен «RTClib» (Adafruit) және «TM1637» (Avishay Orpaz) орнатыңыз. Arduino Nano таңдаңыз (жүктеу тоқтап қалса, «ATmega328P (Old Bootloader)» таңдап көріңіз) және скетчті жүктеңіз. RTC қуаттың жоғалғанын хабарласа, скетч компиляция уақытын орнатады, сондықтан сағат бірнеше секундқа ғана қалады.",
      },
      expect: { en: "The display shows the time with a blinking colon; Serial prints \"RTC OK\".", ru: "На дисплее время с мигающим двоеточием; в Serial «RTC OK».", kk: "Дисплейде қос нүктесі жыпылықтайтын уақыт; Serial-да «RTC OK»." },
      mistake: { en: "Picking the wrong bootloader gives \"not in sync\" errors, not a wiring problem.", ru: "Неверный загрузчик даёт ошибки «not in sync», схема тут ни при чём.", kk: "Қате жүктеуші «not in sync» қателерін береді, бұған сызба кінәлі емес." },
    },
    {
      title: { en: "Set the time and test the backup", ru: "Выставьте время и проверьте резерв", kk: "Уақытты орнатып, резервті тексеріңіз" },
      body: {
        en: "Press the hour button to step the hours, the minute button to step the minutes; seconds reset to zero when you change the minutes, so press it exactly on the minute of a reference clock. Then unplug the USB cable for a minute and plug it back in: the battery kept the DS3231 running, so the time is still right.",
        ru: "Кнопка часов прибавляет час, кнопка минут прибавляет минуту; при смене минут секунды обнуляются, поэтому нажмите её ровно в начале минуты по эталонным часам. Затем отключите USB на минуту и подключите снова: батарейка поддерживала DS3231, время по-прежнему верное.",
        kk: "Сағат батырмасы бір сағат қосады, минут батырмасы бір минут қосады; минутты өзгерткенде секундтар нөлге түседі, сондықтан оны эталон сағаттың минуты басталған сәтте басыңыз. Содан кейін USB-ді бір минутқа ажыратып, қайта қосыңыз: батарея DS3231-ді жұмыс істетіп тұрды, уақыт әлі дұрыс.",
      },
      expect: { en: "Time survives a power cut and drifts only seconds per month.", ru: "Время переживает отключение питания и уходит лишь на секунды в месяц.", kk: "Уақыт қуат өшкенде де сақталып, айына бірнеше секундқа ғана ауытқиды." },
      mistake: { en: "If the time resets after unplugging, the coin cell is flat or missing.", ru: "Если время сбрасывается после отключения, батарейка села или отсутствует.", kk: "Ажыратқаннан кейін уақыт қалпына келсе, батарея отырып қалған немесе жоқ." },
    },
  ],
  code: [{
    filename: "desk_clock.ino",
    language: "cpp",
    libraries: ["RTClib", "TM1637"],
    source: `#include <Wire.h>
#include <RTClib.h>
#include <TM1637Display.h>

const int CLK_PIN = 2, DIO_PIN = 3;     // TM1637
const int HOUR_BTN = 4, MIN_BTN = 5;    // buttons to GND, internal pull-ups
// DS3231 on the I2C pins: SDA = A4, SCL = A5

RTC_DS3231 rtc;
TM1637Display display(CLK_PIN, DIO_PIN);

struct Button {
  int pin;
  bool down;
  unsigned long changedAt;
  unsigned long nextRepeat;
};
Button hourButton = {HOUR_BTN, false, 0, 0};
Button minuteButton = {MIN_BTN, false, 0, 0};

// true once per press, then every 200 ms while held (after 600 ms)
bool stepRequested(Button &b) {
  bool pressed = digitalRead(b.pin) == LOW;
  unsigned long now = millis();
  if (pressed != b.down && now - b.changedAt > 30) {   // 30 ms debounce
    b.down = pressed;
    b.changedAt = now;
    if (pressed) {
      b.nextRepeat = now + 600;
      return true;
    }
  }
  if (b.down && pressed && (long)(now - b.nextRepeat) >= 0) {
    b.nextRepeat = now + 200;
    return true;
  }
  return false;
}

void printTime(const __FlashStringHelper* label, const DateTime &t) {
  char buf[9];
  snprintf(buf, sizeof(buf), "%02d:%02d:%02d", t.hour(), t.minute(), t.second());
  Serial.print(label);
  Serial.println(buf);
}

void showTime(const DateTime &t) {
  bool colon = t.second() % 2 == 0;
  display.showNumberDecEx(t.hour() * 100 + t.minute(), colon ? 0b01000000 : 0, true);
}

void setup() {
  Serial.begin(9600);
  pinMode(HOUR_BTN, INPUT_PULLUP);
  pinMode(MIN_BTN, INPUT_PULLUP);
  display.setBrightness(5);

  if (!rtc.begin()) {
    Serial.println(F("Couldn't find RTC"));
    while (true) {}
  }
  Serial.println(F("RTC OK"));
  if (rtc.lostPower()) {
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
    Serial.println(F("RTC lost power, set to compile time"));
  }
}

void loop() {
  DateTime now = rtc.now();

  if (stepRequested(hourButton)) {
    now = DateTime(now.year(), now.month(), now.day(), (now.hour() + 1) % 24, now.minute(), now.second());
    rtc.adjust(now);
    printTime(F("Hour +1 -> "), now);
  }
  if (stepRequested(minuteButton)) {
    now = DateTime(now.year(), now.month(), now.day(), now.hour(), (now.minute() + 1) % 60, 0);
    rtc.adjust(now);
    printTime(F("Minute +1 -> "), now);
  }

  static int lastMinute = -1;
  if (now.minute() != lastMinute) {
    lastMinute = now.minute();
    printTime(F("Time "), now);
  }
  showTime(now);
  delay(20);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"Couldn't find RTC\" in the Serial Monitor", ru: "«Couldn't find RTC» в Serial Monitor", kk: "Serial Monitor-да «Couldn't find RTC»" },
      cause: { en: "SDA/SCL swapped or on the wrong pins, or the module has no power.", ru: "SDA/SCL перепутаны или не на тех пинах, либо на модуль не приходит питание.", kk: "SDA/SCL ауысқан не басқа пиндерде тұр, немесе модульге қуат келмейді." },
      fix: { en: "SDA must go to A4 and SCL to A5. Check that the RTC's VCC sits on the 5V rail and GND on GND.", ru: "SDA должен идти на A4, SCL на A5. Проверьте, что VCC модуля на шине 5V, а GND на GND.", kk: "SDA A4-ке, SCL A5-ке баруы керек. Модульдің VCC-і 5V шинасында, GND-і GND-де екенін тексеріңіз." },
    },
    {
      symptom: { en: "The display stays dark or shows random segments", ru: "Дисплей тёмный или показывает случайные сегменты", kk: "Дисплей қараңғы немесе кездейсоқ сегменттерді көрсетеді" },
      cause: { en: "CLK and DIO are swapped, or a jumper is loose in the breadboard.", ru: "CLK и DIO перепутаны, или провод плохо сидит в макетке.", kk: "CLK пен DIO ауысқан немесе сым макет тақтасында нашар тұр." },
      fix: { en: "CLK goes to D2 and DIO to D3. Push the wires fully in and use male-female wires straight onto the display header.", ru: "CLK на D2, DIO на D3. Вставьте провода до конца и подключите дисплей проводами папа-мама прямо к его разъёму.", kk: "CLK D2-ге, DIO D3-ке. Сымдарды соңына дейін кіргізіп, дисплейді аталық-аналық сымдармен тікелей оның ұяшығына қосыңыз." },
    },
    {
      symptom: { en: "The time goes back to the compile time after every unplug", ru: "После каждого отключения время возвращается к времени компиляции", kk: "Әр ажыратқаннан кейін уақыт компиляция уақытына қайтады" },
      cause: { en: "The coin cell is flat, missing or inserted upside down, so the DS3231 stops and sets its lost-power flag.", ru: "Батарейка села, отсутствует или вставлена наоборот, DS3231 останавливается и выставляет флаг потери питания.", kk: "Батарея отырған, жоқ немесе кері салынған, сондықтан DS3231 тоқтап, қуат жоғалғаны туралы жалаушаны қояды." },
      fix: { en: "Insert a charged LIR2032 with the + side facing up, then set the time again with the buttons.", ru: "Вставьте заряженный LIR2032 плюсом вверх и снова выставьте время кнопками.", kk: "Зарядталған LIR2032-ні плюсімен жоғары қаратып салып, уақытты батырмалармен қайта орнатыңыз." },
    },
    {
      symptom: { en: "One press jumps two or three steps", ru: "Одно нажатие прибавляет два-три шага", kk: "Бір басу екі-үш қадам қосады" },
      cause: { en: "A worn button bounces longer than the 30 ms debounce, or the wire to GND is loose.", ru: "Старая кнопка дребезжит дольше 30 мс, или провод к GND плохо держится.", kk: "Ескі батырманың дірілі 30 мс-тан ұзақ созылады немесе GND сымы нашар тұр." },
      fix: { en: "Replace the button or raise the 30 in stepRequested() to 50.", ru: "Замените кнопку или увеличьте 30 в stepRequested() до 50.", kk: "Батырманы ауыстырыңыз немесе stepRequested() ішіндегі 30-ды 50-ге көбейтіңіз." },
    },
  ],
  safety: [
    { en: "Never charge a non-rechargeable CR2032 on the ZS-042 board: remove its charging diode or resistor, or use a LIR2032.", ru: "Не заряжайте неперезаряжаемую CR2032 на плате ZS-042: выпаяйте диод или резистор зарядки либо используйте LIR2032.", kk: "Қайта зарядталмайтын CR2032-ні ZS-042 платасында зарядтамаңыз: зарядтау диодын не резисторын ағытыңыз немесе LIR2032 қолданыңыз." },
    { en: "Keep coin cells away from small children; a swallowed cell causes severe internal burns within hours.", ru: "Храните батарейки-таблетки вдали от маленьких детей: проглоченная батарейка за несколько часов вызывает тяжёлые внутренние ожоги.", kk: "Таблетка батареяларды кішкентай балалардан аулақ ұстаңыз: жұтылған батарея бірнеше сағатта ауыр ішкі күйік тудырады." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "RTC OK",
      "Time 14:07:00",
      "Hour +1 -> 15:07:12",
      "Minute +1 -> 15:08:00",
      "Time 15:08:00",
      "Time 15:09:00",
    ],
    leds: [],
  },
} satisfies GuideContent;
