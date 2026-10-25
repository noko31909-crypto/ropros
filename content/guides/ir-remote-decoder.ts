import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "ir-remote-decoder",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "tools",
  robotics: false,
  difficulty: "beginner",
  hours: 1,
  costUsd: 10,
  xpReward: 120,
  title: {
    en: "IR Remote Decoder with LCD",
    ru: "Декодер ИК-пультов с LCD",
    kk: "LCD дисплейлі ИҚ пульт декодері",
  },
  summary: {
    en: "Point any TV, air-conditioner or LED-strip remote at a VS1838B receiver and the LCD shows the protocol, address and command of each button. Use the codes to control your own projects.",
    ru: "Направьте любой пульт от телевизора, кондиционера или светодиодной ленты на приёмник VS1838B, и LCD покажет протокол, адрес и команду каждой кнопки. Эти коды пригодятся для управления вашими проектами.",
    kk: "Теледидар, кондиционер немесе жарық диодты таспа пультін VS1838B қабылдағышына бағыттаңыз, сонда LCD әр батырманың хаттамасын, мекенжайы мен командасын көрсетеді. Бұл кодтар өз жобаларыңызды басқаруға пайдалы.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Decoder", ru: "Декодер", kk: "Декодер" } },
    { component: "ir-receiver-vs1838b", qty: 1, spec: { en: "38 kHz, bare 3-pin or on a small module", ru: "38 кГц, отдельный 3-выводной или на модуле", kk: "38 кГц, жеке 3 шықпалы немесе модульде" }, role: { en: "Receives and demodulates IR", ru: "Принимает и демодулирует ИК", kk: "ИҚ сигналын қабылдап, демодуляциялайды" } },
    { component: "lcd-1602-i2c", qty: 1, spec: { en: "16×2, PCF8574 backpack, address 0x27 or 0x3F", ru: "16×2, плата PCF8574, адрес 0x27 или 0x3F", kk: "16×2, PCF8574 тақтасы, мекенжайы 0x27 немесе 0x3F" }, role: { en: "Shows protocol and codes", ru: "Показывает протокол и коды", kk: "Хаттама мен кодтарды көрсетеді" } },
    { component: "ir-remote", qty: 1, spec: { en: "any 38 kHz remote (the kit remote is NEC)", ru: "любой пульт на 38 кГц (пульт из набора NEC)", kk: "кез келген 38 кГц пульт (жиынтықтағы пульт NEC)" }, role: { en: "Signal source", ru: "Источник сигнала", kk: "Сигнал көзі" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ir", component: "ir-receiver-vs1838b", label: "VS1838B" },
    { id: "lcd", component: "lcd-1602-i2c", label: "LCD 16×2" },
  ],
  connections: [
    { from: "board.5V", to: "ir.VCC", color: "red" },
    { from: "ir.GND", to: "board.GND", color: "black" },
    { from: "ir.OUT", to: "board.D2", color: "green", note: { en: "idle HIGH, pulses LOW on IR bursts", ru: "в покое HIGH, импульсы LOW при ИК-сигнале", kk: "тыныштықта HIGH, ИҚ сигналында LOW импульстер" } },
    { from: "board.5V", to: "lcd.VCC", color: "red" },
    { from: "lcd.GND", to: "board.GND2", color: "black" },
    { from: "board.A4", to: "lcd.SDA", color: "blue" },
    { from: "board.A5", to: "lcd.SCL", color: "yellow" },
  ],
  steps: [
    {
      title: { en: "Identify the receiver pins", ru: "Определите выводы приёмника", kk: "Қабылдағыш шықпаларын анықтаңыз" },
      body: {
        en: "Hold the bare VS1838B with the dome facing you and the legs down: from left to right the pins are OUT, GND, VCC. Modules on a small PCB print their own order (often S, −, +, or OUT, GND, VCC); follow the print. Getting VCC and GND reversed can destroy the receiver in seconds.",
        ru: "Держите отдельный VS1838B куполом к себе, ножками вниз: слева направо выводы OUT, GND, VCC. На модулях с платой порядок напечатан (часто S, −, + или OUT, GND, VCC); следуйте надписям. Если перепутать VCC и GND, приёмник может сгореть за секунды.",
        kk: "Жеке VS1838B-ны күмбезін өзіңізге, аяқтарын төмен қаратып ұстаңыз: солдан оңға қарай шықпалар OUT, GND, VCC. Платадағы модульдерде рет басылып жазылған (көбіне S, −, + немесе OUT, GND, VCC); жазуға сүйеніңіз. VCC мен GND-ді шатастырсаңыз, қабылдағыш бірнеше секундта күйіп кетуі мүмкін.",
      },
      expect: { en: "You know which leg is OUT, GND and VCC on your part.", ru: "Вы знаете, какая ножка OUT, GND и VCC у вашей детали.", kk: "Бөлшегіңіздің қай аяғы OUT, GND және VCC екенін білесіз." },
      mistake: { en: "A receiver that gets hot to the touch is wired backwards; unplug USB at once.", ru: "Если приёмник нагрелся, он подключён наоборот; сразу отключите USB.", kk: "Қабылдағыш қызып кетсе, ол кері қосылған; USB-ді бірден ажыратыңыз." },
    },
    {
      title: { en: "Wire the receiver", ru: "Подключите приёмник", kk: "Қабылдағышты қосыңыз" },
      body: {
        en: "Connect VCC to 5V, GND to GND and OUT to D2. The receiver demodulates the 38 kHz carrier itself and gives a clean digital signal: HIGH at rest, LOW during each IR burst. D2 is an interrupt-capable pin, which the IRremote library likes for precise timing.",
        ru: "Подключите VCC к 5V, GND к GND и OUT к D2. Приёмник сам убирает несущую 38 кГц и выдаёт чистый цифровой сигнал: HIGH в покое и LOW во время каждой ИК-вспышки. D2 поддерживает прерывания, что удобно библиотеке IRremote для точного измерения времени.",
        kk: "VCC-ні 5V-ке, GND-ні GND-ге, OUT-ты D2-ге қосыңыз. Қабылдағыш 38 кГц тасымалдаушыны өзі алып тастап, таза цифрлық сигнал береді: тыныштықта HIGH, әр ИҚ жарқылы кезінде LOW. D2 үзілістерді қолдайды, бұл IRremote кітапханасына уақытты дәл өлшеуге ыңғайлы.",
      },
      expect: { en: "Three short wires; the dome faces the edge of the breadboard.", ru: "Три коротких провода; купол смотрит к краю макетки.", kk: "Үш қысқа сым; күмбез макет тақтасының шетіне қарап тұр." },
      mistake: { en: "Long, loose wires on OUT pick up noise from the LCD backlight and fill the screen with UNKNOWN.", ru: "Длинные болтающиеся провода на OUT ловят помехи от подсветки LCD, и экран заполняется UNKNOWN.", kk: "OUT-тағы ұзын, бос сымдар LCD жарығынан кедергі қабылдап, экран UNKNOWN-ға толады." },
    },
    {
      title: { en: "Connect the LCD", ru: "Подключите LCD", kk: "LCD-ді қосыңыз" },
      body: {
        en: "Wire the LCD backpack VCC to 5V, GND to GND, SDA to A4 and SCL to A5. Use the breadboard's red rail if you need a second 5V point.",
        ru: "Подключите VCC платы LCD к 5V, GND к GND, SDA к A4, SCL к A5. Если нужна вторая точка 5V, используйте красную шину макетки.",
        kk: "LCD тақтасының VCC-ін 5V-ке, GND-ін GND-ге, SDA-ны A4-ке, SCL-ды A5-ке қосыңыз. Екінші 5V нүктесі керек болса, макет тақтасының қызыл шинасын пайдаланыңыз.",
      },
      expect: { en: "The backlight turns on with USB connected.", ru: "При подключённом USB включается подсветка.", kk: "USB қосылғанда жарығы жанады." },
      mistake: { en: "If the screen is lit but blank, the contrast trimmer on the backpack needs a turn.", ru: "Если экран светится, но пуст, подкрутите подстроечник контраста на плате.", kk: "Экран жарық болып, бірақ бос болса, тақтадағы контраст реттегішін бұраңыз." },
    },
    {
      title: { en: "Install IRremote 4.x and decode", ru: "Установите IRremote 4.x и декодируйте", kk: "IRremote 4.x орнатып, декодтаңыз" },
      body: {
        en: "Install \"IRremote\" (version 4.x, by shirriff, z3t0, ArminJo) and \"LiquidCrystal I2C\" (Frank de Brabander). Upload and open the Serial Monitor at 9600 baud. Point a remote at the dome from 1–3 m and press a button: line 1 shows the protocol (NEC, Samsung, Sony, RC5…), line 2 the address and the command in hex. Holding a button shows \"R\" for repeat frames. The built-in L LED blinks with every received frame.",
        ru: "Установите «IRremote» (версия 4.x, авторы shirriff, z3t0, ArminJo) и «LiquidCrystal I2C» (Frank de Brabander). Загрузите скетч и откройте Serial Monitor на 9600 бод. Направьте пульт на купол с 1–3 м и нажмите кнопку: в первой строке будет протокол (NEC, Samsung, Sony, RC5…), во второй адрес и команда в hex. Если держать кнопку, появляется «R» для кадров повтора. Встроенный светодиод L мигает при каждом принятом кадре.",
        kk: "«IRremote» (4.x нұсқасы, авторлары shirriff, z3t0, ArminJo) және «LiquidCrystal I2C» (Frank de Brabander) орнатыңыз. Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Пультті күмбезге 1–3 м қашықтықтан бағыттап, батырманы басыңыз: бірінші жолда хаттама (NEC, Samsung, Sony, RC5…), екіншісінде мекенжай мен команда hex түрінде көрінеді. Батырманы басып тұрсаңыз, қайталау кадрлары үшін «R» шығады. Әр кадр қабылданғанда ішкі L жарық диоды жыпылықтайды.",
      },
      expect: { en: "The kit remote shows NEC, address 0x00 and a different command for each button.", ru: "Пульт из набора показывает NEC, адрес 0x00 и разную команду для каждой кнопки.", kk: "Жиынтықтағы пульт NEC, 0x00 мекенжайын және әр батырмаға әртүрлі команданы көрсетеді." },
      mistake: { en: "Old IRremote 2.x sketches (irrecv.decode(&results)) do not compile with 4.x; use this sketch's IrReceiver API.", ru: "Старые скетчи под IRremote 2.x (irrecv.decode(&results)) не компилируются с 4.x; используйте API IrReceiver из этого скетча.", kk: "IRremote 2.x-ке арналған ескі скетчтер (irrecv.decode(&results)) 4.x-пен компиляцияланбайды; осы скетчтегі IrReceiver API-ін қолданыңыз." },
    },
    {
      title: { en: "Write the codes down and reuse them", ru: "Запишите коды и используйте их", kk: "Кодтарды жазып алып, қолданыңыз" },
      body: {
        en: "Press each button you want to use and note its protocol, address and command. In a later project you only need to compare IrReceiver.decodedIRData.command (and address, if you want to ignore other remotes) with those numbers, for example if (command == 0x45) to toggle a relay. The Serial Monitor also prints the full 32-bit raw value for libraries that expect it.",
        ru: "Нажмите каждую нужную кнопку и запишите её протокол, адрес и команду. В следующем проекте достаточно сравнивать IrReceiver.decodedIRData.command (и address, если нужно игнорировать чужие пульты) с этими числами, например if (command == 0x45), чтобы переключать реле. Serial Monitor также печатает полное 32-битное сырое значение для библиотек, которым оно нужно.",
        kk: "Қажетті әр батырманы басып, оның хаттамасын, мекенжайы мен командасын жазып алыңыз. Келесі жобада IrReceiver.decodedIRData.command мәнін (басқа пульттерді елемеу үшін address-ті де) осы сандармен салыстыру жеткілікті, мысалы релені ауыстыру үшін if (command == 0x45). Serial Monitor оны қажет ететін кітапханалар үшін толық 32 биттік өңделмеген мәнді де шығарады.",
      },
      expect: { en: "A small table of button → command values for your remote.", ru: "Небольшая таблица «кнопка → команда» для вашего пульта.", kk: "Пультіңізге арналған «батырма → команда» шағын кестесі." },
      mistake: { en: "Matching on the raw value breaks when another remote of the same brand uses a different address; compare command plus address instead.", ru: "Сравнение по сырому значению ломается, если другой пульт той же марки использует другой адрес; сравнивайте команду и адрес.", kk: "Өңделмеген мән бойынша салыстыру сол маркалы басқа пульт басқа мекенжай қолданса бұзылады; команда мен мекенжайды салыстырыңыз." },
    },
  ],
  code: [{
    filename: "ir_decoder_lcd.ino",
    language: "cpp",
    libraries: ["IRremote", "LiquidCrystal I2C"],
    source: `#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <IRremote.hpp>        // IRremote 4.x

const int IR_RECEIVE_PIN = 2;  // VS1838B OUT

LiquidCrystal_I2C lcd(0x27, 16, 2);   // try 0x3F if the screen stays empty

void printHexPadded(Print &out, uint32_t value, uint8_t digits) {
  out.print(F("0x"));
  for (int8_t shift = (digits - 1) * 4; shift >= 0; shift -= 4) {
    out.print((value >> shift) & 0xF, HEX);
  }
}

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  lcd.print(F("IR decoder"));
  lcd.setCursor(0, 1);
  lcd.print(F("Press a button"));
  IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);   // L LED blinks on each frame
  Serial.println(F("IR decoder ready on D2"));
}

void loop() {
  if (!IrReceiver.decode()) return;

  IRData &d = IrReceiver.decodedIRData;
  bool repeat = d.flags & IRDATA_FLAGS_IS_REPEAT;

  // Serial: one line per frame
  Serial.print(getProtocolString(d.protocol));
  if (d.protocol == UNKNOWN) {
    Serial.println(F(" (noise or unsupported protocol)"));
  } else if (repeat) {
    Serial.println(F(" repeat"));
  } else {
    Serial.print(F(" addr="));
    printHexPadded(Serial, d.address, 4);
    Serial.print(F(" cmd="));
    printHexPadded(Serial, d.command, 2);
    Serial.print(F(" raw=0x"));
    Serial.println((uint32_t)d.decodedRawData, HEX);
  }

  // LCD: protocol on line 1, address + command on line 2
  if (d.protocol != UNKNOWN) {
    lcd.clear();
    lcd.print(getProtocolString(d.protocol));
    if (repeat) {
      lcd.setCursor(15, 0);
      lcd.print('R');
    }
    lcd.setCursor(0, 1);
    lcd.print(F("A:"));
    printHexPadded(lcd, d.address, 4);
    lcd.print(F(" C:"));
    printHexPadded(lcd, d.command, 2);
  }

  IrReceiver.resume();   // ready for the next frame
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Nothing happens when buttons are pressed", ru: "При нажатии кнопок ничего не происходит", kk: "Батырмаларды басқанда ештеңе болмайды" },
      cause: { en: "The receiver pins are in the wrong order, or the remote's battery is flat.", ru: "Неверный порядок выводов приёмника, или села батарейка пульта.", kk: "Қабылдағыш шықпаларының реті қате немесе пульт батареясы отырып қалған." },
      fix: { en: "Re-check OUT/GND/VCC; look at the remote's LED through a phone camera: it should flicker purple when pressed.", ru: "Перепроверьте OUT/GND/VCC; посмотрите на светодиод пульта через камеру телефона: при нажатии он должен мерцать фиолетовым.", kk: "OUT/GND/VCC ретін қайта тексеріңіз; пульт жарық диодына телефон камерасы арқылы қараңыз: басқанда ол күлгін түспен жыпылықтауы керек." },
    },
    {
      symptom: { en: "Only UNKNOWN appears in the Serial Monitor", ru: "В Serial Monitor только UNKNOWN", kk: "Serial Monitor-да тек UNKNOWN шығады" },
      cause: { en: "Sunlight or a fluorescent lamp shines on the receiver, or the remote uses a 56 kHz or unusual protocol (some air-conditioners).", ru: "На приёмник светит солнце или люминесцентная лампа, или пульт использует 56 кГц либо редкий протокол (некоторые кондиционеры).", kk: "Қабылдағышқа күн немесе люминесцентті шам түсіп тұр, не пульт 56 кГц немесе сирек хаттаманы қолданады (кейбір кондиционерлер)." },
      fix: { en: "Shade the receiver and try again from closer; for long AC frames, check the IRremote ReceiveDump example.", ru: "Затените приёмник и попробуйте ближе; для длинных кадров кондиционеров используйте пример ReceiveDump из IRremote.", kk: "Қабылдағышты көлеңкелеп, жақынырақтан көріңіз; кондиционердің ұзын кадрлары үшін IRremote-тағы ReceiveDump мысалын қолданыңыз." },
    },
    {
      symptom: { en: "Compile error: 'IrReceiver' was not declared", ru: "Ошибка компиляции: 'IrReceiver' was not declared", kk: "Компиляция қатесі: 'IrReceiver' was not declared" },
      cause: { en: "An old IRremote 2.x library (or a library with the same file name) is installed.", ru: "Установлена старая IRremote 2.x (или другая библиотека с тем же именем файла).", kk: "Ескі IRremote 2.x (немесе файл аты бірдей басқа кітапхана) орнатылған." },
      fix: { en: "Update IRremote to 4.x in the Library Manager and remove other IR libraries such as IRremote2 or Robot IRremote.", ru: "Обновите IRremote до 4.x в менеджере библиотек и удалите другие ИК-библиотеки, например IRremote2 или Robot IRremote.", kk: "Кітапханалар менеджерінде IRremote-ты 4.x-ке жаңартып, IRremote2 немесе Robot IRremote сияқты басқа ИҚ кітапханаларын жойыңыз." },
    },
  ],
  safety: [],
  simulation: {
    baud: 9600,
    lines: ["IR decoder ready on D2", "NEC addr=0x0000 cmd=0x45 raw=0xBA45FF00", "NEC repeat", "NEC addr=0x0000 cmd=0x46 raw=0xB946FF00", "Samsung addr=0x0707 cmd=0x02 raw=0xFD020707", "Sony addr=0x0001 cmd=0x15 raw=0x95", "UNKNOWN (noise or unsupported protocol)"],
    leds: [{ label: "L", color: "#FDD835" }],
  },
} satisfies GuideContent;
