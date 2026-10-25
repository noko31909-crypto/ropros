import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "quadruped-walker",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "robotics",
  robotics: true,
  difficulty: "advanced",
  hours: 12,
  costUsd: 45,
  xpReward: 420,
  title: {
    en: "Four-Legged Walking Robot",
    ru: "Четвероногий шагающий робот",
    kk: "Төрт аяқты жүретін робот",
  },
  summary: {
    en: "Eight micro servos, two per leg, carry a small quadruped through a creep gait: it lifts one leg at a time, always keeps three feet on the ground, and walks, turns and stands on serial commands.",
    ru: "Восемь микросерво, по две на ногу, ведут маленького четвероногого робота «ползущей» походкой: он поднимает по одной ноге, всегда держит три ноги на земле и по командам из Serial идёт, поворачивает и стоит.",
    kk: "Сегіз микро серво, әр аяққа екеуден, кішкентай төрт аяқты роботты «жорғалау» жүрісімен жүргізеді: ол аяқтарын бір-бірден көтереді, үнемі үш аяғы жерде тұрады, Serial командаларымен жүреді, бұрылады және тұрады.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V logic", ru: "ATmega328P, логика 5 В", kk: "ATmega328P, 5 В логика" }, role: { en: "Gait controller", ru: "Контроллер походки", kk: "Жүріс контроллері" } },
    { component: "servo-sg90", qty: 8, spec: { en: "SG90 9 g, plus an 8-DOF acrylic or 3D-printed quadruped frame", ru: "SG90 9 г, плюс акриловая или напечатанная рама четвероногого на 8 осей", kk: "SG90 9 г, сондай-ақ 8 осьті акрил не 3D басылған төрт аяқты рама" }, role: { en: "Hip and knee of each leg", ru: "Бедро и колено каждой ноги", kk: "Әр аяқтың жамбасы мен тізесі" } },
    { component: "buck-converter-lm2596", qty: 1, spec: { en: "3 A max, with heatsink, set to 5.0 V (6.0 V absolute max)", ru: "до 3 А, с радиатором, выставить 5,0 В (максимум 6,0 В)", kk: "3 А-ге дейін, радиаторы бар, 5,0 В-қа қойыңыз (ең көбі 6,0 В)" }, role: { en: "Servo power rail", ru: "Шина питания серво", kk: "Серво қуат шинасы" } },
    { component: "capacitor", qty: 1, spec: { en: "1000–2200 µF, 10 V or more", ru: "1000–2200 мкФ, от 10 В", kk: "1000–2200 мкФ, 10 В не одан жоғары" }, role: { en: "Absorbs servo current spikes", ru: "Гасит броски тока серво", kk: "Серво тогының секірулерін басады" } },
    { component: "resistor", qty: 8, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "Series resistor in each servo signal line", ru: "Последовательный резистор в каждой сигнальной линии серво", kk: "Әр серво сигнал желісіндегі тізбекті резистор" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V, 1000–1500 mAh, light", ru: "7,4 В, 1000–1500 мА·ч, лёгкий", kk: "7,4 В, 1000–1500 мА·сағ, жеңіл" }, role: { en: "Feeds the buck converter and Nano VIN", ru: "Питает преобразователь и VIN Nano", kk: "Түрлендіргіш пен Nano VIN-ді қуаттайды" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT, rated 3 A or more", ru: "SPDT, на ток от 3 А", kk: "SPDT, 3 А не одан жоғары токқа" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі қосқыш" } },
    { component: "breadboard", qty: 1, spec: { en: "mini 170 points, or a servo shield for the Nano", ru: "мини на 170 точек или шилд для серво под Nano", kk: "170 нүктелі шағын немесе Nano-ға арналған серво шилді" }, role: { en: "Servo power and signal headers", ru: "Разъёмы питания и сигналов серво", kk: "Серво қуат және сигнал қосқыштары" } },
    { component: "jumper-wires", qty: 30, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "fl_hip", component: "servo-sg90", label: "FL hip" },
    { id: "fl_knee", component: "servo-sg90", label: "FL knee" },
    { id: "fr_hip", component: "servo-sg90", label: "FR hip" },
    { id: "fr_knee", component: "servo-sg90", label: "FR knee" },
    { id: "rl_hip", component: "servo-sg90", label: "RL hip" },
    { id: "rl_knee", component: "servo-sg90", label: "RL knee" },
    { id: "rr_hip", component: "servo-sg90", label: "RR hip" },
    { id: "rr_knee", component: "servo-sg90", label: "RR knee" },
    { id: "r1", component: "resistor", label: "220 Ω" },
    { id: "r2", component: "resistor", label: "220 Ω" },
    { id: "r3", component: "resistor", label: "220 Ω" },
    { id: "r4", component: "resistor", label: "220 Ω" },
    { id: "r5", component: "resistor", label: "220 Ω" },
    { id: "r6", component: "resistor", label: "220 Ω" },
    { id: "r7", component: "resistor", label: "220 Ω" },
    { id: "r8", component: "resistor", label: "220 Ω" },
    { id: "buck", component: "buck-converter-lm2596", label: "LM2596 → 5.0 V" },
    { id: "cap", component: "capacitor", label: "1000 µF" },
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
  ],
  connections: [
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "buck.IN+", color: "red", note: { en: "set OUT to 5.0 V before connecting servos", ru: "выставьте OUT на 5,0 В до подключения серво", kk: "серволарды қоспас бұрын OUT-ты 5,0 В-қа қойыңыз" } },
    { from: "bat.-", to: "buck.IN-", color: "black" },
    { from: "sw.1", to: "board.VIN", color: "red", note: { en: "Nano supply (VIN 7–12 V)", ru: "питание Nano (VIN 7–12 В)", kk: "Nano қуаты (VIN 7–12 В)" } },
    { from: "buck.OUT-", to: "board.GND", color: "black", note: { en: "common ground", ru: "общая земля", kk: "ортақ жер" } },
    { from: "buck.OUT+", to: "cap.A", color: "red" },
    { from: "cap.B", to: "buck.OUT-", color: "black" },
    { from: "board.D2", to: "r1.A", color: "orange", note: { en: "220 Ω in every signal line protects the pin if a servo ground comes loose", ru: "220 Ом в каждой сигнальной линии защищают пин, если отвалится земля серво", kk: "әр сигнал желісіндегі 220 Ом серво жері ажырап кетсе, пинді қорғайды" } },
    { from: "r1.B", to: "fl_hip.SIG", color: "orange" },
    { from: "buck.OUT+", to: "fl_hip.VCC", color: "red" },
    { from: "fl_hip.GND", to: "buck.OUT-", color: "brown" },
    { from: "board.D3", to: "r2.A", color: "yellow" },
    { from: "r2.B", to: "fl_knee.SIG", color: "yellow" },
    { from: "buck.OUT+", to: "fl_knee.VCC", color: "red" },
    { from: "fl_knee.GND", to: "buck.OUT-", color: "brown" },
    { from: "board.D4", to: "r3.A", color: "orange" },
    { from: "r3.B", to: "fr_hip.SIG", color: "orange" },
    { from: "buck.OUT+", to: "fr_hip.VCC", color: "red" },
    { from: "fr_hip.GND", to: "buck.OUT-", color: "brown" },
    { from: "board.D5", to: "r4.A", color: "yellow" },
    { from: "r4.B", to: "fr_knee.SIG", color: "yellow" },
    { from: "buck.OUT+", to: "fr_knee.VCC", color: "red" },
    { from: "fr_knee.GND", to: "buck.OUT-", color: "brown" },
    { from: "board.D6", to: "r5.A", color: "orange" },
    { from: "r5.B", to: "rl_hip.SIG", color: "orange" },
    { from: "buck.OUT+", to: "rl_hip.VCC", color: "red" },
    { from: "rl_hip.GND", to: "buck.OUT-", color: "brown" },
    { from: "board.D7", to: "r6.A", color: "yellow" },
    { from: "r6.B", to: "rl_knee.SIG", color: "yellow" },
    { from: "buck.OUT+", to: "rl_knee.VCC", color: "red" },
    { from: "rl_knee.GND", to: "buck.OUT-", color: "brown" },
    { from: "board.D8", to: "r7.A", color: "orange" },
    { from: "r7.B", to: "rr_hip.SIG", color: "orange" },
    { from: "buck.OUT+", to: "rr_hip.VCC", color: "red" },
    { from: "rr_hip.GND", to: "buck.OUT-", color: "brown" },
    { from: "board.D9", to: "r8.A", color: "yellow" },
    { from: "r8.B", to: "rr_knee.SIG", color: "yellow" },
    { from: "buck.OUT+", to: "rr_knee.VCC", color: "red" },
    { from: "rr_knee.GND", to: "buck.OUT-", color: "brown" },
  ],
  steps: [
    {
      title: { en: "Set the servo supply to 5.0 V", ru: "Выставьте питание серво на 5,0 В", kk: "Серво қуатын 5,0 В-қа қойыңыз" },
      body: {
        en: "Connect the battery through the switch to the LM2596 IN+ and IN− with nothing on the output. Measure OUT+ to OUT− and turn the trimmer until it reads 5.0 V (SG90s tolerate up to 6.0 V, never more). Use a module with a heatsink: eight servos can pull 2–3 A at peaks while the robot shifts its weight.",
        ru: "Подключите аккумулятор через выключатель к IN+ и IN− модуля LM2596, ничего не подключая к выходу. Измерьте напряжение между OUT+ и OUT− и крутите подстроечник, пока не будет 5,0 В (SG90 выдерживают до 6,0 В, не больше). Берите модуль с радиатором: восемь серво могут тянуть 2–3 А в пиках, когда робот переносит вес.",
        kk: "Аккумуляторды қосқыш арқылы LM2596 модулінің IN+ және IN− шықпаларына қосыңыз, шығысына ештеңе жалғамаңыз. OUT+ пен OUT− арасын өлшеп, 5,0 В болғанша потенциометрді бұраңыз (SG90 6,0 В-қа дейін шыдайды, одан көп емес). Радиаторы бар модуль алыңыз: робот салмағын ауыстырғанда сегіз серво шыңында 2–3 А тартуы мүмкін.",
      },
      expect: { en: "4.95–5.05 V on the output with no load.", ru: "4,95–5,05 В на выходе без нагрузки.", kk: "Жүктемесіз шығыста 4,95–5,05 В." },
      mistake: { en: "Skipping this step: many LM2596 boards arrive set near their input voltage and burn all eight servos at once.", ru: "Пропустить этот шаг: многие платы LM2596 приходят настроенными почти на входное напряжение и сжигают сразу все восемь серво.", kk: "Бұл қадамды өткізіп жіберу: көп LM2596 платасы кіріс кернеуіне жақын бапталып келеді де, сегіз серводы бірден күйдіреді." },
    },
    {
      title: { en: "Build the power rail and common ground", ru: "Соберите шину питания и общую землю", kk: "Қуат шинасы мен ортақ жерді жинаңыз" },
      body: {
        en: "Bring OUT+ and OUT− to the rails of the mini breadboard (or the servo shield) and put the 1000 µF capacitor across them, long leg on +. Join the − rail to Nano GND. From the switch, also run battery + to Nano VIN. The servos never take power from the Nano's 5V pin.",
        ru: "Выведите OUT+ и OUT− на шины мини-макетки (или шилда для серво) и поставьте между ними конденсатор 1000 мкФ, длинной ножкой на плюс. Соедините минусовую шину с GND Nano. От выключателя ведите плюс аккумулятора также на VIN Nano. Серво никогда не питаются от пина 5V у Nano.",
        kk: "OUT+ пен OUT− шықпаларын шағын макет тақтасының (не серво шилдінің) шиналарына шығарып, олардың арасына 1000 мкФ конденсаторды ұзын аяғын плюске қаратып қойыңыз. Минус шинасын Nano GND-імен жалғаңыз. Қосқыштан аккумулятор плюсын Nano VIN-ге де тартыңыз. Серволар Nano-ның 5V пинінен ешқашан қуат алмайды.",
      },
      expect: { en: "A 5 V rail with a capacitor, its ground tied to the Nano.", ru: "Шина 5 В с конденсатором, её земля соединена с Nano.", kk: "Конденсаторы бар 5 В шина, оның жері Nano-мен жалғанған." },
      mistake: { en: "A capacitor in backwards (long leg on −) heats up and can burst.", ru: "Конденсатор, вставленный наоборот (длинная ножка на минус), греется и может лопнуть.", kk: "Кері қойылған конденсатор (ұзын аяғы минуста) қызады және жарылуы мүмкін." },
    },
    {
      title: { en: "Connect and label the eight servos", ru: "Подключите и подпишите восемь серво", kk: "Сегіз серводы қосып, белгілеңіз" },
      body: {
        en: "Label each servo before mounting it. Signal wires: FL hip → D2, FL knee → D3, FR hip → D4, FR knee → D5, RL hip → D6, RL knee → D7, RR hip → D8, RR knee → D9 (F/R = front/rear, L/R = left/right as seen from above, head forward), each through a 220 Ω resistor. The Servo library drives any digital pin, not only the PWM ones; the resistor protects the Nano pin if a servo's ground wire comes loose and its current tries to return through the signal line. Red and brown wires go to the 5 V rail.",
        ru: "Подпишите каждую серво до установки. Сигнальные провода: FL hip → D2, FL knee → D3, FR hip → D4, FR knee → D5, RL hip → D6, RL knee → D7, RR hip → D8, RR knee → D9 (F/R — перед/зад, L/R — лево/право, если смотреть сверху головой вперёд), каждый через резистор 220 Ом. Библиотека Servo управляет любым цифровым пином, а не только ШИМ-пинами; резистор защищает пин Nano, если у серво отвалится земля и её ток пойдёт обратно по сигнальному проводу. Красный и коричневый провода — на шину 5 В.",
        kk: "Әр серводы орнатпас бұрын белгілеңіз. Сигнал сымдары: FL hip → D2, FL knee → D3, FR hip → D4, FR knee → D5, RL hip → D6, RL knee → D7, RR hip → D8, RR knee → D9 (F/R — алды/арты, L/R — сол/оң, жоғарыдан басы алға қарап тұрғанда), әрқайсысы 220 Ом резистор арқылы. Servo кітапханасы ШИМ пиндерін ғана емес, кез келген цифрлық пинді басқарады; серво жері ажырап, оның тогы сигнал сымы арқылы қайтуға тырысса, резистор Nano пинін қорғайды. Қызыл және қоңыр сымдар 5 В шинасына барады.",
      },
      expect: { en: "Eight labelled servos, signals on D2–D9 in order, each through 220 Ω.", ru: "Восемь подписанных серво, сигналы по порядку на D2–D9, каждый через 220 Ом.", kk: "Сегіз белгіленген серво, сигналдар ретімен D2–D9-да, әрқайсысы 220 Ом арқылы." },
      mistake: { en: "Mixing up two servos makes one leg lift when another should: the robot falls on its first step.", ru: "Если перепутать две серво, нога поднимется не та: робот упадёт на первом же шаге.", kk: "Екі серводы шатастырсаңыз, басқа аяқ көтеріледі: робот бірінші қадамда-ақ құлайды." },
    },
    {
      title: { en: "Centre the servos and assemble the legs", ru: "Отцентруйте серво и соберите ноги", kk: "Серволарды ортаға қойып, аяқтарды құрастырыңыз" },
      body: {
        en: "Upload the sketch with the horns off, open the Serial Monitor at 9600 baud and send c: every servo goes to exactly 90°. Fit each hip horn so its leg points diagonally out at 45° from the body, and each knee horn so the lower leg points straight down. Then assemble the frame and screw the horns in.",
        ru: "Загрузите скетч без качалок, откройте Serial Monitor на 9600 бод и отправьте c: все серво встанут ровно на 90°. Наденьте качалку каждого бедра так, чтобы нога смотрела по диагонали наружу под 45° к корпусу, а качалку колена так, чтобы голень смотрела строго вниз. Затем соберите раму и закрутите винты качалок.",
        kk: "Скетчті иінтіректерсіз жүктеп, Serial Monitor-ды 9600 бодта ашыңыз да, c жіберіңіз: барлық серво дәл 90°-қа келеді. Әр жамбас иінтірегін аяқ корпустан 45° бұрышпен диагональ бойымен сыртқа қарайтындай етіп, ал тізе иінтірегін балтыр тура төмен қарайтындай етіп кигізіңіз. Содан кейін раманы құрастырып, иінтірек бұрандаларын бұраңыз.",
      },
      expect: { en: "In the c pose the robot stands symmetric, legs at the four diagonals.", ru: "В позе c робот стоит симметрично, ноги по четырём диагоналям.", kk: "c позасында робот симметриялы тұрады, аяқтары төрт диагональ бойымен." },
      mistake: { en: "Forcing a leg by hand while powered strips the SG90's plastic gears.", ru: "Если крутить ногу рукой при включённом питании, пластиковые шестерни SG90 срываются.", kk: "Қуат қосулы кезде аяқты қолмен бұрасаңыз, SG90-ның пластик тістері үзіледі." },
    },
    {
      title: { en: "Trim, check directions and stand", ru: "Подстройте, проверьте направления и поставьте", kk: "Түзетіп, бағыттарды тексеріп, тұрғызыңыз" },
      body: {
        en: "Send s: the robot stands. If it leans, adjust that servo's value in TRIM (a few degrees at a time) and upload again. Hold the robot in the air and send w: each leg should lift, swing forward and come down. If a foot presses down instead of lifting, flip its KNEE_SIGN; if a leg swings backward, flip its HIP_SIGN.",
        ru: "Отправьте s: робот встанет. Если он кренится, подправьте значение этой серво в TRIM (по несколько градусов) и загрузите снова. Держите робота в воздухе и отправьте w: каждая нога должна подняться, качнуться вперёд и опуститься. Если нога давит вниз вместо подъёма, поменяйте её KNEE_SIGN; если качается назад — её HIP_SIGN.",
        kk: "s жіберіңіз: робот тұрады. Егер ол қисайса, сол сервоның TRIM-дегі мәнін (бірнеше градустан) түзетіп, қайта жүктеңіз. Роботты ауада ұстап, w жіберіңіз: әр аяқ көтеріліп, алға тербеліп, түсуі керек. Аяқ көтерілудің орнына төмен басса, оның KNEE_SIGN таңбасын, артқа тербелсе, HIP_SIGN таңбасын өзгертіңіз.",
      },
      expect: { en: "In the air, the legs step in the order RL, FL, RR, FR.", ru: "В воздухе ноги шагают по порядку RL, FL, RR, FR.", kk: "Ауада аяқтар RL, FL, RR, FR ретімен қадам басады." },
      mistake: { en: "Testing directions on the floor first: a wrong sign throws the robot on its back.", ru: "Проверять направления сразу на полу: неверный знак опрокидывает робота на спину.", kk: "Бағыттарды бірден еденде тексеру: қате таңба роботты шалқасынан аударады." },
    },
    {
      title: { en: "Walk with the creep gait", ru: "Ходьба «ползущей» походкой", kk: "«Жорғалау» жүрісімен жүру" },
      body: {
        en: "Put the robot on a rough surface (a rubber mat or carpet) and send w. In a creep gait only one leg is in the air at a time: it lifts, swings to the front of its stride and lands, then all four hips push back a quarter stride to move the body forward. The order RL → FL → RR → FR keeps the body over the three-foot triangle. Send l or r to turn on the spot and s to stand. If it wobbles or tips, raise MOVE_MS to slow it down.",
        ru: "Поставьте робота на шершавую поверхность (резиновый коврик или ковёр) и отправьте w. В «ползущей» походке в воздухе всегда только одна нога: она поднимается, переносится в переднюю точку шага и опускается, затем все четыре бедра толкают назад на четверть шага, и корпус сдвигается вперёд. Порядок RL → FL → RR → FR держит корпус над треугольником из трёх опор. Отправьте l или r для разворота на месте и s, чтобы встать. Если робот качается или падает, увеличьте MOVE_MS, чтобы замедлить его.",
        kk: "Роботты кедір-бұдыр бетке (резеңке кілемше не кілем) қойып, w жіберіңіз. «Жорғалау» жүрісінде ауада әрдайым бір ғана аяқ болады: ол көтеріліп, қадамның алдыңғы нүктесіне ауысып, түседі, содан кейін төрт жамбас бірдей ширек қадам артқа итеріп, корпус алға жылжиды. RL → FL → RR → FR реті корпусты үш тіректен тұратын үшбұрыштың үстінде ұстайды. Орнында бұрылу үшін l не r, тұру үшін s жіберіңіз. Робот тербелсе не құласа, баяулату үшін MOVE_MS-ті арттырыңыз.",
      },
      expect: { en: "Steady forward walking of a few centimetres per cycle, three feet always down.", ru: "Устойчивая ходьба вперёд, несколько сантиметров за цикл, три ноги всегда на земле.", kk: "Тұрақты алға жүріс, бір циклде бірнеше сантиметр, үш аяқ үнемі жерде." },
      mistake: { en: "Hard plastic feet slip on smooth floors and the robot walks on the spot; add rubber or hot-glue tips.", ru: "Твёрдые пластиковые «ступни» скользят по гладкому полу, и робот шагает на месте; добавьте резиновые наконечники или капли термоклея.", kk: "Қатты пластик «табандар» тегіс еденде тайғанайды да, робот орнында қадам басады; резеңке ұштар не термоклей тамшыларын қосыңыз." },
    },
  ],
  code: [{
    filename: "quadruped_creep.ino",
    language: "cpp",
    libraries: [],
    source: `// 8-servo quadruped, creep gait. Serial 9600: w = walk, l = turn left, r = turn right, s = stand, c = centre all at 90
#include <Servo.h>

// Servo order: FL hip, FL knee, FR hip, FR knee, RL hip, RL knee, RR hip, RR knee
const int SERVO_PINS[8] = {2, 3, 4, 5, 6, 7, 8, 9};
int TRIM[8] = {0, 0, 0, 0, 0, 0, 0, 0};      // degrees, fine-tune so the robot stands level
const int HIP_SIGN[4]  = {1, -1, 1, -1};     // legs FL, FR, RL, RR: + = foot swings forward
const int KNEE_SIGN[4] = {1, -1, -1, 1};     // + = foot lifts
const char *LEG_NAME[4] = {"FL", "FR", "RL", "RR"};

const int UNIT_DEG = 9;      // hip degrees per quarter stride (stride = 4 units = 36 deg)
const int LIFT_DEG = 30;     // knee lift during a swing
const int MOVE_MS = 150;     // time per movement; raise to walk slower and steadier
const int START_U[4] = {1, 3, 0, 2};   // FL, FR, RL, RR: swing order RL -> FL -> RR -> FR

Servo servo[8];
float pos[8];
int u[4];                    // stride position of each foot: 0 = back ... 4 = front
int walkL = 1, walkR = 1;      // +1 = that side walks forward, -1 = backward (turning)
char mode = 's';

int hipAngle(int leg, int unit) {
  int dir = (leg == 0 || leg == 2) ? walkL : walkR;
  return 90 + HIP_SIGN[leg] * dir * (unit - 2) * UNIT_DEG;
}

int kneeAngle(int leg, bool lifted) {
  return 90 + (lifted ? KNEE_SIGN[leg] * LIFT_DEG : 0);
}

void moveTo(const float *target, int ms) {   // all servos arrive together
  float start[8];
  for (int i = 0; i < 8; i++) start[i] = pos[i];
  int steps = max(1, ms / 20);
  for (int s = 1; s <= steps; s++) {
    for (int i = 0; i < 8; i++) {
      pos[i] = start[i] + (target[i] - start[i]) * s / steps;
      servo[i].write((int)pos[i] + TRIM[i]);
    }
    delay(20);
  }
}

void placeLeg(int leg, int unit) {           // lift, swing to 'unit', put down
  float t[8];
  for (int i = 0; i < 8; i++) t[i] = pos[i];
  t[leg * 2 + 1] = kneeAngle(leg, true);  moveTo(t, MOVE_MS);
  t[leg * 2] = hipAngle(leg, unit);        moveTo(t, MOVE_MS);
  t[leg * 2 + 1] = kneeAngle(leg, false); moveTo(t, MOVE_MS);
  u[leg] = unit;
}

void stand() {
  for (int leg = 0; leg < 4; leg++) placeLeg(leg, 2);   // 2 = middle of the stride
  Serial.println("standing");
}

void startGait(int left, int right) {
  walkL = left; walkR = right;
  const int order[4] = {2, 0, 3, 1};         // RL, FL, RR, FR
  for (int k = 0; k < 4; k++) placeLeg(order[k], START_U[order[k]]);
}

void gaitBeat() {
  int leg = 0;
  for (int i = 0; i < 4; i++) if (u[i] == 0) leg = i;   // rearmost foot swings next
  Serial.print("step "); Serial.println(LEG_NAME[leg]);
  placeLeg(leg, 4);                          // swing it to the front of the stride

  float t[8];                                // body shift: every foot moves back one unit
  for (int i = 0; i < 8; i++) t[i] = pos[i];
  for (int l = 0; l < 4; l++) { u[l]--; t[l * 2] = hipAngle(l, u[l]); }
  moveTo(t, MOVE_MS * 2);
}

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 8; i++) {
    pos[i] = 90;
    servo[i].write(90 + TRIM[i]);
    servo[i].attach(SERVO_PINS[i]);
    delay(100);                              // stagger start-up current spikes
  }
  Serial.println("quadruped ready: w=walk l=left r=right s=stand c=center");
  stand();
}

void loop() {
  if (Serial.available()) {
    char c = Serial.read();
    if (c == 'c') {
      for (int i = 0; i < 8; i++) { pos[i] = 90; servo[i].write(90); }
      Serial.println("all servos at 90, fit the horns");
      mode = 'c';
    } else if (c == 'w' || c == 'l' || c == 'r' || c == 's') {
      Serial.print("command: ");
      Serial.println(c == 'w' ? "walk" : c == 'l' ? "left" : c == 'r' ? "right" : "stand");
      stand();                               // every change goes through a neutral stance
      if (c == 'w') startGait(1, 1);
      if (c == 'l') startGait(-1, 1);        // left side backward, right side forward
      if (c == 'r') startGait(1, -1);
      mode = c;
    }
  }
  if (mode == 'w' || mode == 'l' || mode == 'r') gaitBeat();
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The Nano resets or servos twitch when several legs move", ru: "Nano перезагружается или серво дёргаются, когда двигаются несколько ног", kk: "Бірнеше аяқ қозғалғанда Nano қайта жүктеледі немесе серволар тартқылайды" },
      cause: { en: "The buck output sags under 2–3 A peaks, the capacitor is missing, or the servo ground does not reach the Nano.", ru: "Выход преобразователя проседает на пиках 2–3 А, нет конденсатора, или земля серво не соединена с Nano.", kk: "2–3 А шыңдарында түрлендіргіш шығысы түседі, конденсатор жоқ немесе серво жері Nano-мен жалғанбаған." },
      fix: { en: "Fit the capacitor, check the GND link, use a charged pack and a heatsinked LM2596; if it still sags, move to a 5 A converter.", ru: "Поставьте конденсатор, проверьте связь GND, используйте заряженный аккумулятор и LM2596 с радиатором; если всё равно проседает, возьмите преобразователь на 5 А.", kk: "Конденсатор қойып, GND байланысын тексеріңіз, зарядталған аккумулятор мен радиаторы бар LM2596 пайдаланыңыз; бәрібір түссе, 5 А түрлендіргішке ауысыңыз." },
    },
    {
      symptom: { en: "The robot tips over sideways during a step", ru: "Робот заваливается набок во время шага", kk: "Қадам кезінде робот бүйіріне құлайды" },
      cause: { en: "The body is too heavy or high, the gait is too fast, or the legs are mixed up so the wrong leg lifts.", ru: "Корпус слишком тяжёлый или высокий, походка слишком быстрая, или ноги перепутаны и поднимается не та.", kk: "Корпус тым ауыр не биік, жүріс тым жылдам немесе аяқтар шатасып, басқа аяқ көтеріледі." },
      fix: { en: "Mount the battery low and central, raise MOVE_MS to 200–250, and check that \"step RL\" really lifts the rear-left leg.", ru: "Закрепите аккумулятор низко и по центру, увеличьте MOVE_MS до 200–250 и проверьте, что «step RL» поднимает именно заднюю левую ногу.", kk: "Аккумуляторды төмен әрі ортаға бекітіп, MOVE_MS-ті 200–250-ге дейін арттырыңыз және «step RL» шынымен артқы сол аяқты көтеретінін тексеріңіз." },
    },
    {
      symptom: { en: "It walks backward or in a circle", ru: "Робот идёт назад или по кругу", kk: "Робот артқа немесе шеңбер бойымен жүреді" },
      cause: { en: "One or more HIP_SIGN values are wrong for the way the servos are mounted.", ru: "Одно или несколько значений HIP_SIGN не соответствуют тому, как установлены серво.", kk: "HIP_SIGN мәндерінің бірі не бірнешеуі серволардың орнатылу тәсіліне сәйкес емес." },
      fix: { en: "Hold it in the air, send w, and flip HIP_SIGN for every leg that swings backward while lifted.", ru: "Держите робота в воздухе, отправьте w и поменяйте HIP_SIGN у каждой ноги, которая в подъёме качается назад.", kk: "Роботты ауада ұстап, w жіберіңіз де, көтерілгенде артқа тербелетін әр аяқтың HIP_SIGN таңбасын өзгертіңіз." },
    },
  ],
  safety: [
    { en: "Set and measure the LM2596 output before connecting servos; more than 6 V destroys SG90s.", ru: "Выставьте и измерьте выход LM2596 до подключения серво; больше 6 В сжигает SG90.", kk: "Серволарды қоспас бұрын LM2596 шығысын баптап, өлшеңіз; 6 В-тан жоғары кернеу SG90-ды күйдіреді." },
    { en: "Charge the 2S pack only with a balance charger and never leave it charging unattended.", ru: "Заряжайте аккумулятор 2S только балансирным зарядником и не оставляйте без присмотра.", kk: "2S аккумуляторын тек баланстық зарядтағышпен зарядтаңыз және қараусыз қалдырмаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["quadruped ready: w=walk l=left r=right s=stand c=center", "standing", "command: walk", "standing", "step RL", "step FL", "step RR", "step FR", "step RL", "command: left", "standing", "step RL", "step FL", "command: stand", "standing"],
    leds: [{ label: "PWR", color: "#7CB342" }],
  },
} satisfies GuideContent;
