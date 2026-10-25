import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-current-monitor-acs712",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "tools",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 16,
  xpReward: 260,
  title: {
    en: "ESP32 Motor Current Monitor with ACS712",
    ru: "Монитор тока мотора на ESP32 и ACS712",
    kk: "ESP32 және ACS712 мотор тогының мониторы",
  },
  summary: {
    en: "An ACS712 Hall-effect sensor measures a DC motor's current, the OLED shows live and peak amps, and when the motor stalls the ESP32 cuts it through a MOSFET and sounds an alarm until you press reset.",
    ru: "Датчик Холла ACS712 измеряет ток мотора постоянного тока, OLED показывает текущий и пиковый ток, а при заклинивании мотора ESP32 отключает его через MOSFET и включает тревогу до нажатия кнопки сброса.",
    kk: "ACS712 Холл датчигі тұрақты ток моторының тогын өлшейді, OLED ағымдағы және ең жоғары токты көрсетеді, ал мотор кептеліп қалса, ESP32 оны MOSFET арқылы өшіріп, қалпына келтіру батырмасы басылғанша дабыл қосады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32 DevKit V1 (WROOM-32), 3.3 V logic, ADC max 3.3 V", ru: "ESP32 DevKit V1 (WROOM-32), логика 3,3 В, АЦП максимум 3,3 В", kk: "ESP32 DevKit V1 (WROOM-32), 3,3 В логика, АЦТ ең көбі 3,3 В" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "acs712", qty: 1, spec: { en: "ACS712ELCTR-05B module: ±5 A, 185 mV/A, 2.5 V at 0 A", ru: "модуль ACS712ELCTR-05B: ±5 А, 185 мВ/А, 2,5 В при 0 А", kk: "ACS712ELCTR-05B модулі: ±5 А, 185 мВ/А, 0 А-де 2,5 В" }, role: { en: "Current sensor", ru: "Датчик тока", kk: "Ток датчигі" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C address 0x3C", ru: "0,96\" 128×64, адрес I²C 0x3C", kk: "0,96\" 128×64, I²C мекенжайы 0x3C" }, role: { en: "Readout", ru: "Дисплей показаний", kk: "Көрсеткіштер дисплейі" } },
    { component: "dc-motor", qty: 1, spec: { en: "TT gear motor 3–6 V", ru: "мотор-редуктор TT 3–6 В", kk: "TT редукторлы мотор 3–6 В" }, role: { en: "Load under test", ru: "Измеряемая нагрузка", kk: "Өлшенетін жүктеме" } },
    { component: "battery-4xaa", qty: 1, spec: { en: "4 × AA holder, 6 V, with switch", ru: "отсек 4 × AA, 6 В, с выключателем", kk: "4 × AA ұясы, 6 В, ажыратқышы бар" }, role: { en: "Motor supply", ru: "Питание мотора", kk: "Мотор қорегі" } },
    { component: "mosfet-n", qty: 1, spec: { en: "IRLZ44N logic-level", ru: "IRLZ44N, логического уровня", kk: "IRLZ44N, логикалық деңгейлі" }, role: { en: "Switches the motor, cuts it on overcurrent", ru: "Включает мотор и отключает его при перегрузке", kk: "Моторды қосады және асқын токта өшіреді" } },
    { component: "diode", qty: 1, spec: { en: "1N4007 (or 1N5819)", ru: "1N4007 (или 1N5819)", kk: "1N4007 (немесе 1N5819)" }, role: { en: "Flyback protection across the motor", ru: "Защита от обратного выброса на моторе", kk: "Мотордағы кері кернеу шығуынан қорғаныс" } },
    { component: "buzzer-active", qty: 1, spec: { en: "5 V active buzzer", ru: "активный зуммер 5 В", kk: "5 В белсенді зуммер" }, role: { en: "Overcurrent alarm", ru: "Сигнал перегрузки", kk: "Асқын ток дабылы" } },
    { component: "npn-transistor", qty: 1, spec: { en: "2N2222 or BC547", ru: "2N2222 или BC547", kk: "2N2222 немесе BC547" }, role: { en: "Buzzer driver", ru: "Ключ зуммера", kk: "Зуммер кілті" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Start / stop / reset", ru: "Пуск / стоп / сброс", kk: "Іске қосу / тоқтату / қалпына келтіру" } },
    { component: "resistor", qty: 5, spec: { en: "4.7 kΩ + 10 kΩ (divider), 100 Ω (gate), 10 kΩ (gate pull-down), 1 kΩ (transistor base)", ru: "4,7 кОм + 10 кОм (делитель), 100 Ом (затвор), 10 кОм (подтяжка затвора к GND), 1 кОм (база транзистора)", kk: "4,7 кОм + 10 кОм (бөлгіш), 100 Ом (бекітпе), 10 кОм (бекітпені GND-ге тарту), 1 кОм (транзистор базасы)" }, role: { en: "Divider, gate and base resistors", ru: "Делитель, резисторы затвора и базы", kk: "Бөлгіш, бекітпе және база резисторлары" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 24, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "acs", component: "acs712", label: "ACS712 5A" },
    { id: "r_top", component: "resistor", label: "4.7 kΩ" },
    { id: "r_bot", component: "resistor", label: "10 kΩ" },
    { id: "oled", component: "oled-ssd1306", label: "OLED" },
    { id: "bat", component: "battery-4xaa", label: "Motor 6 V" },
    { id: "m1", component: "dc-motor", label: "Motor" },
    { id: "d1", component: "diode", label: "1N4007" },
    { id: "q1", component: "mosfet-n", label: "IRLZ44N" },
    { id: "r_g", component: "resistor", label: "100 Ω" },
    { id: "r_gpd", component: "resistor", label: "10 kΩ" },
    { id: "q2", component: "npn-transistor", label: "2N2222" },
    { id: "r_bz", component: "resistor", label: "1 kΩ" },
    { id: "bz", component: "buzzer-active", label: "Alarm" },
    { id: "btn", component: "push-button", label: "Start/Reset" },
  ],
  connections: [
    { from: "board.5V", to: "acs.VCC", color: "red", note: { en: "ACS712 needs 5 V", ru: "ACS712 нужно 5 В", kk: "ACS712-ге 5 В керек" } },
    { from: "acs.GND", to: "board.GND", color: "black" },
    { from: "acs.OUT", to: "r_top.A", color: "orange", note: { en: "0.5–4.5 V, never straight to the ESP32", ru: "0,5–4,5 В, никогда напрямую в ESP32", kk: "0,5–4,5 В, ешқашан ESP32-ге тікелей емес" } },
    { from: "r_top.B", to: "board.GPIO34", color: "orange", note: { en: "× 0.68: 5 V → 3.4 V", ru: "× 0,68: 5 В → 3,4 В", kk: "× 0,68: 5 В → 3,4 В" } },
    { from: "r_bot.A", to: "r_top.B", color: "orange" },
    { from: "r_bot.B", to: "board.GND2", color: "black" },
    { from: "board.3V3", to: "oled.VCC", color: "red" },
    { from: "oled.GND", to: "board.GND3", color: "black" },
    { from: "board.GPIO21", to: "oled.SDA", color: "blue" },
    { from: "board.GPIO22", to: "oled.SCL", color: "yellow" },
    { from: "bat.+", to: "acs.IP+", color: "red", note: { en: "battery + into the sensor", ru: "+ батареи в датчик", kk: "батарея + датчикке" } },
    { from: "acs.IP-", to: "m1.+", color: "red" },
    { from: "d1.K", to: "m1.+", color: "gray", note: { en: "stripe towards motor +", ru: "полоса к + мотора", kk: "жолағы мотор +-іне қарай" } },
    { from: "d1.A", to: "m1.-", color: "gray" },
    { from: "m1.-", to: "q1.D", color: "brown" },
    { from: "q1.S", to: "bat.-", color: "black" },
    { from: "bat.-", to: "board.GND", color: "black", note: { en: "shared ground for the MOSFET gate", ru: "общая земля для затвора MOSFET", kk: "MOSFET бекітпесі үшін ортақ жер" } },
    { from: "board.GPIO25", to: "r_g.A", color: "purple" },
    { from: "r_g.B", to: "q1.G", color: "purple" },
    { from: "r_gpd.A", to: "q1.G", color: "purple", note: { en: "keeps the motor off while the ESP32 boots", ru: "держит мотор выключенным при загрузке ESP32", kk: "ESP32 жүктелгенде моторды өшік ұстайды" } },
    { from: "r_gpd.B", to: "q1.S", color: "black" },
    { from: "board.5V", to: "bz.+", color: "red" },
    { from: "bz.-", to: "q2.C", color: "gray" },
    { from: "q2.E", to: "board.GND2", color: "black" },
    { from: "board.GPIO26", to: "r_bz.A", color: "pink" },
    { from: "r_bz.B", to: "q2.B", color: "pink" },
    { from: "board.GPIO27", to: "btn.1", color: "blue", note: { en: "internal pull-up", ru: "внутренняя подтяжка", kk: "ішкі тарту" } },
    { from: "btn.2", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Build the motor circuit", ru: "Соберите цепь мотора", kk: "Мотор тізбегін жинаңыз" },
      body: {
        en: "The current to be measured flows: battery + → ACS712 IP+ → IP− → motor + → motor − → MOSFET drain → source → battery −. Use the screw terminals on the ACS712. Put the 1N4007 across the motor with its stripe (cathode) on motor + and the other end on motor −: it catches the voltage spike when the MOSFET switches off.",
        ru: "Измеряемый ток течёт так: + батареи → IP+ ACS712 → IP− → + мотора → − мотора → сток MOSFET → исток → − батареи. Используйте винтовые клеммы ACS712. Поставьте 1N4007 параллельно мотору: полоса (катод) на + мотора, другой вывод на − мотора. Он гасит выброс напряжения, когда MOSFET закрывается.",
        kk: "Өлшенетін ток былай ағады: батарея + → ACS712 IP+ → IP− → мотор + → мотор − → MOSFET ағызы → бастауы → батарея −. ACS712-нің бұрандалы клеммаларын пайдаланыңыз. 1N4007 диодын моторға параллель қойыңыз: жолағы (катод) мотор +-іне, екінші шықпасы мотор −-іне. Ол MOSFET жабылғанда пайда болатын кернеу секірісін басады.",
      },
      expect: { en: "Motor, sensor and MOSFET in one loop with the battery, diode across the motor.", ru: "Мотор, датчик и MOSFET в одной петле с батареей, диод параллельно мотору.", kk: "Мотор, датчик және MOSFET батареямен бір тұйықта, диод моторға параллель." },
      mistake: { en: "A diode turned the wrong way shorts the battery the moment the MOSFET turns on.", ru: "Диод, развёрнутый наоборот, закоротит батарею в момент открытия MOSFET.", kk: "Кері қойылған диод MOSFET ашылған сәтте батареяны тұйықтайды." },
    },
    {
      title: { en: "Wire the MOSFET gate and shared ground", ru: "Подключите затвор MOSFET и общую землю", kk: "MOSFET бекітпесі мен ортақ жерді қосыңыз" },
      body: {
        en: "With the IRLZ44N's tab away from you, the legs are G, D, S. Connect GPIO25 through 100 Ω to G, and a 10 kΩ resistor from G to S so the motor stays off while the ESP32 boots. Join battery − to an ESP32 GND: the gate voltage is measured against the source, so both circuits need the same ground. At 3.3 V the IRLZ44N switches a TT motor easily; for loads above about 2 A use a MOSFET rated for 2.5 V gate drive.",
        ru: "Если держать IRLZ44N металлической пластиной от себя, ножки идут G, D, S. Подключите GPIO25 через 100 Ом к G, а между G и S поставьте 10 кОм, чтобы мотор был выключен, пока ESP32 загружается. Соедините − батареи с GND платы ESP32: напряжение затвора отсчитывается от истока, поэтому обеим цепям нужна общая земля. При 3,3 В IRLZ44N легко включает мотор TT; для нагрузок больше примерно 2 А возьмите MOSFET, рассчитанный на управление 2,5 В.",
        kk: "IRLZ44N-ді металл пластинасын өзіңізден ары қаратып ұстасаңыз, аяқтары G, D, S ретімен тұрады. GPIO25-ті 100 Ом арқылы G-ге қосып, ESP32 жүктеліп жатқанда мотор өшік тұруы үшін G мен S арасына 10 кОм қойыңыз. Батарея −-ін ESP32 GND-імен жалғаңыз: бекітпе кернеуі бастауға қатысты өлшенеді, сондықтан екі тізбекке де ортақ жер керек. 3,3 В-та IRLZ44N TT моторын оңай қосады; шамамен 2 А-ден үлкен жүктемелер үшін 2,5 В басқаруға есептелген MOSFET алыңыз.",
      },
      expect: { en: "The motor does not move when the ESP32 is powered but not yet programmed.", ru: "Мотор не крутится, когда ESP32 запитана, но ещё не прошита.", kk: "ESP32 қоректенгенде, бірақ әлі бағдарламаланбаған кезде мотор айналмайды." },
      mistake: { en: "Forgetting the battery − to GND link: the gate never sees a voltage and the motor never starts.", ru: "Забыли соединить − батареи с GND: на затворе нет напряжения, и мотор не запускается.", kk: "Батарея −-ін GND-мен жалғауды ұмыттыңыз: бекітпеде кернеу жоқ, мотор іске қосылмайды." },
    },
    {
      title: { en: "Power the ACS712 and divide its output", ru: "Запитайте ACS712 и разделите его выход", kk: "ACS712-ді қоректендіріп, шығысын бөліңіз" },
      body: {
        en: "ACS712 VCC goes to the ESP32 5V pin and GND to GND. Its OUT sits at 2.5 V with no current and moves 185 mV per amp, up to about 4.5 V, which is too much for an ESP32 pin. Wire OUT through 4.7 kΩ to GPIO34 and a 10 kΩ from GPIO34 to GND. The pin sees 10 / 14.7 = 0.68 of the output: 2.5 V becomes 1.70 V and even 5 V stays at 3.4 V.",
        ru: "VCC ACS712 подключите к пину 5V платы ESP32, GND к GND. Без тока выход OUT стоит на 2,5 В и сдвигается на 185 мВ на ампер, примерно до 4,5 В, а это слишком много для пина ESP32. Подключите OUT через 4,7 кОм к GPIO34, а от GPIO34 к GND поставьте 10 кОм. Пин видит 10 / 14,7 = 0,68 от выхода: 2,5 В становятся 1,70 В, и даже 5 В остаются на уровне 3,4 В.",
        kk: "ACS712 VCC-ін ESP32-нің 5V пиніне, GND-ін GND-ге қосыңыз. Ток болмағанда OUT шығысы 2,5 В-та тұрады және әр ампер сайын 185 мВ-қа, шамамен 4,5 В-қа дейін ығысады, бұл ESP32 пині үшін тым көп. OUT-ты 4,7 кОм арқылы GPIO34-ке қосып, GPIO34-тен GND-ге 10 кОм қойыңыз. Пин шығыстың 10 / 14,7 = 0,68 бөлігін көреді: 2,5 В 1,70 В болады, ал 5 В тіпті 3,4 В деңгейінде қалады.",
      },
      expect: { en: "About 1.70 V on GPIO34 with the motor off.", ru: "Около 1,70 В на GPIO34 при выключенном моторе.", kk: "Мотор өшік кезде GPIO34-те шамамен 1,70 В." },
      mistake: { en: "Swapping the two resistors gives 0.32 × instead: safe, but the readings get much noisier.", ru: "Если поменять резисторы местами, получится 0,32 ×: безопасно, но показания станут гораздо шумнее.", kk: "Резисторларды ауыстырсаңыз, 0,32 × шығады: қауіпсіз, бірақ көрсеткіштер әлдеқайда шулы болады." },
    },
    {
      title: { en: "Add the OLED, alarm and button", ru: "Добавьте OLED, сигнал и кнопку", kk: "OLED, дабыл және батырманы қосыңыз" },
      body: {
        en: "OLED: VCC to 3V3, GND to GND, SDA to GPIO21, SCL to GPIO22. Alarm: buzzer + to 5V, buzzer − to the 2N2222 collector, emitter to GND, base through 1 kΩ to GPIO26. Button: one leg to GPIO27, the diagonal leg to GND (internal pull-up).",
        ru: "OLED: VCC к 3V3, GND к GND, SDA к GPIO21, SCL к GPIO22. Сигнал: + зуммера к 5V, − зуммера к коллектору 2N2222, эмиттер к GND, база через 1 кОм к GPIO26. Кнопка: одна ножка к GPIO27, ножка по диагонали к GND (внутренняя подтяжка).",
        kk: "OLED: VCC-ті 3V3-ке, GND-ді GND-ге, SDA-ны GPIO21-ге, SCL-ды GPIO22-ге қосыңыз. Дабыл: зуммер +-ін 5V-қа, зуммер −-ін 2N2222 коллекторына, эмиттерді GND-ге, базаны 1 кОм арқылы GPIO26-ға жалғаңыз. Батырма: бір аяғын GPIO27-ге, диагональ аяғын GND-ге (ішкі тарту).",
      },
      expect: { en: "All low-voltage parts share the ESP32 GND.", ru: "Все слаботочные части сидят на общей GND платы ESP32.", kk: "Барлық әлсіз токты бөліктер ESP32-нің ортақ GND-іне қосылған." },
      mistake: { en: "Driving the buzzer straight from a GPIO overloads the pin; keep the transistor.", ru: "Если включить зуммер прямо от GPIO, пин перегрузится; оставьте транзистор.", kk: "Зуммерді тікелей GPIO-дан қоссаңыз, пин шамадан тыс жүктеледі; транзисторды қалдырыңыз." },
    },
    {
      title: { en: "Upload and calibrate zero", ru: "Загрузите скетч и откалибруйте ноль", kk: "Скетчті жүктеп, нөлді калибрлеңіз" },
      body: {
        en: "Install \"Adafruit SSD1306\" and \"Adafruit GFX Library\" and upload. At start-up the motor is off, so the sketch averages 500 readings and stores them as the 0 A point. This matters because the ACS712's output follows its 5 V supply, and USB 5 V is rarely exactly 5.00 V. Open the Serial Monitor at 115200 baud to see the offset.",
        ru: "Установите «Adafruit SSD1306» и «Adafruit GFX Library» и загрузите скетч. При старте мотор выключен, поэтому скетч усредняет 500 измерений и запоминает их как точку 0 А. Это важно: выход ACS712 следует за его питанием 5 В, а 5 В от USB редко бывают ровно 5,00 В. Откройте Serial Monitor на 115200 бод, чтобы увидеть смещение.",
        kk: "«Adafruit SSD1306» және «Adafruit GFX Library» кітапханаларын орнатып, скетчті жүктеңіз. Іске қосылғанда мотор өшік, сондықтан скетч 500 өлшемді орташалап, оны 0 А нүктесі ретінде сақтайды. Бұл маңызды: ACS712 шығысы оның 5 В қорегіне ілеседі, ал USB-дегі 5 В сирек дәл 5,00 В болады. Ығысуды көру үшін Serial Monitor-ды 115200 бодта ашыңыз.",
      },
      expect: { en: "\"Zero offset 1702 mV\" and the OLED reading 0.00 A ± 0.03.", ru: "«Zero offset 1702 mV», а OLED показывает 0,00 А ± 0,03.", kk: "«Zero offset 1702 mV», ал OLED 0,00 А ± 0,03 көрсетеді." },
      mistake: { en: "Resetting while the motor runs makes the zero wrong; stop the motor, then press EN.", ru: "Сброс при работающем моторе сбивает ноль; остановите мотор и только потом нажмите EN.", kk: "Мотор жұмыс істеп тұрғанда қалпына келтірсеңіз, нөл қате болады; моторды тоқтатып, содан кейін EN басыңыз." },
    },
    {
      title: { en: "Run the motor and trip the alarm", ru: "Запустите мотор и вызовите тревогу", kk: "Моторды іске қосып, дабылды тудырыңыз" },
      body: {
        en: "Press the button: the motor starts and the OLED shows live and peak current, around 0.15–0.25 A for a free-running TT motor. Now gently hold the wheel to stall it. When the current stays above TRIP_AMPS (0.7 A) for 300 ms, the ESP32 switches the MOSFET off, the buzzer beeps and the screen shows OVERCURRENT. Press the button again to reset and restart.",
        ru: "Нажмите кнопку: мотор запустится, а OLED покажет текущий и пиковый ток, около 0,15–0,25 А для мотора TT без нагрузки. Теперь аккуратно придержите колесо, чтобы мотор застопорился. Если ток держится выше TRIP_AMPS (0,7 А) 300 мс, ESP32 закрывает MOSFET, зуммер пищит, а на экране появляется OVERCURRENT. Нажмите кнопку ещё раз, чтобы сбросить тревогу и запустить мотор снова.",
        kk: "Батырманы басыңыз: мотор іске қосылып, OLED ағымдағы және ең жоғары токты көрсетеді, жүктемесіз TT моторы үшін шамамен 0,15–0,25 А. Енді моторды тоқтату үшін дөңгелекті абайлап ұстаңыз. Ток 300 мс бойы TRIP_AMPS (0,7 А) мәнінен жоғары болса, ESP32 MOSFET-ті жабады, зуммер дыбыстайды, ал экранда OVERCURRENT шығады. Дабылды өшіріп, моторды қайта іске қосу үшін батырманы тағы басыңыз.",
      },
      expect: { en: "\"OVERCURRENT 0.92 A -> motor OFF\" in the monitor and a beeping buzzer.", ru: "В мониторе «OVERCURRENT 0.92 A -> motor OFF», зуммер пищит.", kk: "Мониторда «OVERCURRENT 0.92 A -> motor OFF», зуммер дыбыстайды." },
      mistake: { en: "Setting TRIP_AMPS below the start-up surge makes it trip on every start; the 300 ms delay already ignores short spikes.", ru: "Если TRIP_AMPS ниже пускового тока, защита будет срабатывать при каждом пуске; задержка 300 мс уже игнорирует короткие пики.", kk: "TRIP_AMPS іске қосу тогынан төмен болса, қорғаныс әр іске қосуда іске қосылады; 300 мс кідіріс қысқа шыңдарды елемейді." },
    },
  ],
  code: [{
    filename: "current_monitor.ino",
    language: "cpp",
    libraries: ["Adafruit SSD1306", "Adafruit GFX Library"],
    source: String.raw`#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

const int ACS_PIN = 34;       // ACS712 OUT through 4.7k / 10k divider
const int MOTOR_PIN = 25;     // MOSFET gate through 100 ohm
const int BUZZER_PIN = 26;    // NPN base through 1k
const int BUTTON_PIN = 27;    // to GND, internal pull-up
const int SDA_PIN = 21;
const int SCL_PIN = 22;

const float DIVIDER_GAIN = (4700.0 + 10000.0) / 10000.0;   // pin mV -> sensor mV
const float MV_PER_AMP = 185.0;                            // ACS712-05B
const float TRIP_AMPS = 0.7;                               // stall / overcurrent limit
const unsigned long TRIP_DELAY_MS = 300;                   // ignore start-up surges

Adafruit_SSD1306 display(128, 64, &Wire, -1);
float zeroMv = 0;
float amps = 0, peakAmps = 0;
bool motorOn = false, tripped = false;
unsigned long overSince = 0, lastPrint = 0, lastDraw = 0;

float readPinMv(int samples) {
  uint32_t sum = 0;
  for (int i = 0; i < samples; i++) sum += analogReadMilliVolts(ACS_PIN);
  return (float)sum / samples;
}

void setMotor(bool on) {
  motorOn = on;
  digitalWrite(MOTOR_PIN, on ? HIGH : LOW);
  Serial.println(on ? "motor ON" : "motor OFF");
}

void draw() {
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print(tripped ? "OVERCURRENT!" : (motorOn ? "MOTOR ON" : "MOTOR OFF"));
  display.setTextSize(3);
  display.setCursor(0, 16);
  display.printf("%.2fA", amps);
  display.setTextSize(1);
  display.setCursor(0, 46);
  display.printf("peak %.2f A", peakAmps);
  display.setCursor(0, 56);
  display.printf("trip %.2f A", TRIP_AMPS);
  display.display();
}

void setup() {
  Serial.begin(115200);
  pinMode(MOTOR_PIN, OUTPUT);
  digitalWrite(MOTOR_PIN, LOW);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  Wire.begin(SDA_PIN, SCL_PIN);
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) Serial.println("OLED not found at 0x3C");

  delay(500);                         // let the ACS712 settle
  zeroMv = readPinMv(500);            // motor is off: this is 0 A
  Serial.printf("Zero offset %.0f mV (motor off)\n", zeroMv);
  Serial.println("Press the button to start the motor");
}

void loop() {
  // current: average 64 readings, then a light low-pass filter
  float mv = readPinMv(64);
  float now = (mv - zeroMv) * DIVIDER_GAIN / MV_PER_AMP;
  amps = 0.8 * amps + 0.2 * now;
  if (motorOn && fabs(amps) > peakAmps) peakAmps = fabs(amps);

  // overcurrent: must last TRIP_DELAY_MS
  if (motorOn && fabs(amps) > TRIP_AMPS) {
    if (!overSince) overSince = millis();
    if (millis() - overSince >= TRIP_DELAY_MS) {
      Serial.printf("OVERCURRENT %.2f A -> motor OFF\n", fabs(amps));
      setMotor(false);
      tripped = true;
    }
  } else {
    overSince = 0;
  }

  // alarm beeps while tripped
  digitalWrite(BUZZER_PIN, tripped && (millis() / 250) % 2 ? HIGH : LOW);

  // button: start / stop, or reset after a trip
  static int lastBtn = HIGH;
  int btn = digitalRead(BUTTON_PIN);
  if (btn == LOW && lastBtn == HIGH) {
    delay(30);                                   // debounce
    if (tripped) {
      tripped = false;
      peakAmps = 0;
      Serial.println("reset by button");
      setMotor(true);
    } else {
      setMotor(!motorOn);
    }
  }
  lastBtn = btn;

  if (millis() - lastDraw >= 200) {
    lastDraw = millis();
    draw();
  }
  if (millis() - lastPrint >= 1000) {
    lastPrint = millis();
    Serial.printf("I=%.2f A peak=%.2f A %s\n", amps, peakAmps, tripped ? "TRIPPED" : (motorOn ? "running" : "stopped"));
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Shows 0.1–0.2 A with the motor off", ru: "Показывает 0,1–0,2 А при выключенном моторе", kk: "Мотор өшік кезде 0,1–0,2 А көрсетеді" },
      cause: { en: "The zero was taken while current flowed, or the USB 5 V changed after calibration.", ru: "Ноль сняли, когда шёл ток, или 5 В от USB изменилось после калибровки.", kk: "Нөл ток жүріп тұрғанда алынған немесе калибрлеуден кейін USB 5 В өзгерген." },
      fix: { en: "Stop the motor and press EN to re-zero; power the ESP32 from a stable adapter rather than a hub.", ru: "Остановите мотор и нажмите EN, чтобы обнулить заново; питайте ESP32 от стабильного адаптера, а не от хаба.", kk: "Моторды тоқтатып, нөлді қайта алу үшін EN басыңыз; ESP32-ні хабтан емес, тұрақты адаптерден қоректендіріңіз." },
    },
    {
      symptom: { en: "Current reads negative while the motor runs", ru: "Ток отрицательный при работающем моторе", kk: "Мотор жұмыс істегенде ток теріс" },
      cause: { en: "IP+ and IP− are swapped, so current flows through the sensor backwards.", ru: "Перепутаны IP+ и IP−, ток идёт через датчик в обратную сторону.", kk: "IP+ пен IP− шатастырылған, ток датчик арқылы кері бағытта ағады." },
      fix: { en: "Swap the two screw-terminal wires. The trip still works either way, because the sketch compares the absolute value.", ru: "Поменяйте местами провода в винтовых клеммах. Защита работает в любом случае, потому что скетч сравнивает модуль значения.", kk: "Бұрандалы клеммалардағы сымдарды ауыстырыңыз. Қорғаныс кез келген жағдайда жұмыс істейді, себебі скетч мәннің модулін салыстырады." },
    },
    {
      symptom: { en: "Motor never starts when you press the button", ru: "Мотор не запускается по кнопке", kk: "Батырманы басқанда мотор іске қосылмайды" },
      cause: { en: "No shared ground between battery − and the ESP32, MOSFET legs in the wrong order, or the battery switch is off.", ru: "Нет общей земли между − батареи и ESP32, перепутаны ножки MOSFET или выключен выключатель отсека.", kk: "Батарея − мен ESP32 арасында ортақ жер жоқ, MOSFET аяқтары шатасқан немесе ұяның ажыратқышы өшік." },
      fix: { en: "Check the G-D-S order (tab away from you), the battery − to GND wire, and measure 6 V at the holder.", ru: "Проверьте порядок G-D-S (пластиной от себя), провод от − батареи к GND и измерьте 6 В на отсеке.", kk: "G-D-S ретін (пластинасы өзіңізден ары), батарея −-інен GND-ге баратын сымды тексеріп, ұяда 6 В өлшеңіз." },
    },
    {
      symptom: { en: "Readings jump by ±0.05 A", ru: "Показания скачут на ±0,05 А", kk: "Көрсеткіштер ±0,05 А-ге секіреді" },
      cause: { en: "ESP32 ADC noise and motor brush noise; 185 mV/A becomes only 126 mV/A after the divider.", ru: "Шум АЦП ESP32 и щёток мотора; после делителя 185 мВ/А превращаются всего в 126 мВ/А.", kk: "ESP32 АЦТ шуы мен мотор щеткаларының шуы; бөлгіштен кейін 185 мВ/А небәрі 126 мВ/А болады." },
      fix: { en: "Add a 100 nF capacitor across the motor terminals and from GPIO34 to GND; increase the averaging in readPinMv().", ru: "Поставьте конденсатор 100 нФ на клеммы мотора и от GPIO34 к GND; увеличьте усреднение в readPinMv().", kk: "Мотор клеммаларына және GPIO34-тен GND-ге 100 нФ конденсатор қойыңыз; readPinMv() ішіндегі орташалауды арттырыңыз." },
    },
  ],
  safety: [
    { en: "Low-voltage DC only. The ACS712 can technically sense mains current, but this breadboard build must never be connected to mains.", ru: "Только низковольтный постоянный ток. Технически ACS712 может измерять сетевой ток, но эту макетную сборку нельзя подключать к сети.", kk: "Тек төмен вольтты тұрақты ток. Техникалық тұрғыдан ACS712 желі тогын өлшей алады, бірақ бұл макеттік жинақты желіге қосуға болмайды." },
    { en: "A stalled motor heats up fast. Keep stall tests to a few seconds and keep fingers away from the gears.", ru: "Застопоренный мотор быстро греется. Держите тесты на заклинивание в пределах нескольких секунд и не суйте пальцы в редуктор.", kk: "Тоқтап қалған мотор тез қызады. Кептелу сынақтарын бірнеше секундпен шектеп, саусақтарыңызды редуктордан аулақ ұстаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Zero offset 1702 mV (motor off)",
      "Press the button to start the motor",
      "I=0.00 A peak=0.00 A stopped",
      "motor ON",
      "I=0.21 A peak=0.38 A running",
      "I=0.19 A peak=0.38 A running",
      "I=0.64 A peak=0.71 A running",
      "OVERCURRENT 0.92 A -> motor OFF",
      "motor OFF",
      "I=0.02 A peak=0.92 A TRIPPED",
      "reset by button",
      "motor ON",
      "I=0.20 A peak=0.37 A running",
    ],
    leds: [{ label: "MOTOR", color: "#43A047" }, { label: "ALARM", color: "#E53935" }],
  },
} satisfies GuideContent;
