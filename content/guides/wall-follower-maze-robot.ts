import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "wall-follower-maze-robot",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "robotics",
  robotics: true,
  difficulty: "advanced",
  hours: 8,
  costUsd: 42,
  xpReward: 380,
  title: {
    en: "Wall-Following Maze Robot",
    ru: "Робот для лабиринта, идущий вдоль стены",
    kk: "Қабырға бойымен жүретін лабиринт роботы",
  },
  summary: {
    en: "A laser time-of-flight sensor holds the robot a fixed distance from the right wall with a PD controller, an ultrasonic sensor spots walls ahead, and the right-hand rule carries it through a cardboard maze.",
    ru: "Лазерный ToF-датчик с PD-регулятором держит робота на заданном расстоянии от правой стены, ультразвуковой датчик замечает стены впереди, а правило правой руки проводит робота через картонный лабиринт.",
    kk: "Лазерлік ToF датчигі PD реттегішпен роботты оң қабырғадан белгілі бір қашықтықта ұстайды, ультрадыбыстық датчик алдағы қабырғаларды байқайды, ал оң қол ережесі роботты картон лабиринттен алып өтеді.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V logic", ru: "ATmega328P, логика 5 В", kk: "ATmega328P, 5 В логика" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "vl53l0x", qty: 1, spec: { en: "GY-530 board with regulator, I²C, up to ~1.2 m", ru: "плата GY-530 со стабилизатором, I²C, до ~1,2 м", kk: "тұрақтандырғышы бар GY-530 платасы, I²C, ~1,2 м-ге дейін" }, role: { en: "Right-wall distance", ru: "Расстояние до правой стены", kk: "Оң қабырғаға дейінгі қашықтық" } },
    { component: "hc-sr04", qty: 1, spec: { en: "5 V, 2–400 cm", ru: "5 В, 2–400 см", kk: "5 В, 2–400 см" }, role: { en: "Wall-ahead detection", ru: "Обнаружение стены впереди", kk: "Алдағы қабырғаны анықтау" } },
    { component: "tb6612fng", qty: 1, spec: { en: "1.2 A per channel, VM up to 13.5 V", ru: "1,2 А на канал, VM до 13,5 В", kk: "арнаға 1,2 А, VM 13,5 В-қа дейін" }, role: { en: "Motor driver", ru: "Драйвер моторов", kk: "Мотор драйвері" } },
    { component: "dc-motor", qty: 2, spec: { en: "TT gear motor 3–6 V", ru: "мотор-редуктор TT 3–6 В", kk: "TT редукторлы мотор 3–6 В" }, role: { en: "Drive wheels", ru: "Ведущие колёса", kk: "Жетекші доңғалақтар" } },
    { component: "robot-chassis-2wd", qty: 1, spec: { en: "acrylic plate, 2 wheels + caster", ru: "акриловая платформа, 2 колеса + опорное", kk: "акрил платформа, 2 доңғалақ + тірек дөңгелек" }, role: { en: "Frame", ru: "Рама", kk: "Рама" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V, 1000–2200 mAh", ru: "7,4 В, 1000–2200 мА·ч", kk: "7,4 В, 1000–2200 мА·сағ" }, role: { en: "Power for motors and Nano", ru: "Питание моторов и Nano", kk: "Моторлар мен Nano қуаты" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT, rated 2 A or more", ru: "SPDT, на ток от 2 А", kk: "SPDT, 2 А не одан жоғары токқа" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі қосқыш" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Holds the Nano and TB6612", ru: "Для Nano и TB6612", kk: "Nano мен TB6612-ге арналған" } },
    { component: "jumper-wires", qty: 30, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "tof", component: "vl53l0x", label: "Right ToF" },
    { id: "us", component: "hc-sr04", label: "Front" },
    { id: "drv", component: "tb6612fng", label: "TB6612FNG" },
    { id: "m1", component: "dc-motor", label: "Left motor" },
    { id: "m2", component: "dc-motor", label: "Right motor" },
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
  ],
  connections: [
    { from: "board.5V", to: "tof.VIN", color: "red", note: { en: "GY-530 regulates down to 2.8 V itself", ru: "GY-530 сам понижает до 2,8 В", kk: "GY-530 өзі 2,8 В-қа дейін төмендетеді" } },
    { from: "tof.GND", to: "board.GND", color: "black" },
    { from: "tof.SDA", to: "board.A4", color: "blue", note: { en: "I²C SDA", ru: "I²C SDA", kk: "I²C SDA" } },
    { from: "tof.SCL", to: "board.A5", color: "yellow", note: { en: "I²C SCL", ru: "I²C SCL", kk: "I²C SCL" } },
    { from: "board.5V", to: "us.VCC", color: "red" },
    { from: "us.GND", to: "board.GND", color: "black" },
    { from: "board.D11", to: "us.TRIG", color: "orange" },
    { from: "us.ECHO", to: "board.D12", color: "brown" },
    { from: "board.5V", to: "drv.VCC", color: "red", note: { en: "logic supply", ru: "питание логики", kk: "логика қуаты" } },
    { from: "board.D5", to: "drv.PWMA", color: "cyan", note: { en: "PWM, left speed", ru: "ШИМ, скорость левого", kk: "ШИМ, сол жақ жылдамдығы" } },
    { from: "board.D7", to: "drv.AIN1", color: "pink" },
    { from: "board.D8", to: "drv.AIN2", color: "purple" },
    { from: "board.D6", to: "drv.PWMB", color: "blue", note: { en: "PWM, right speed", ru: "ШИМ, скорость правого", kk: "ШИМ, оң жақ жылдамдығы" } },
    { from: "board.D4", to: "drv.BIN1", color: "gray" },
    { from: "board.D10", to: "drv.BIN2", color: "white" },
    { from: "board.D9", to: "drv.STBY", color: "green", note: { en: "HIGH enables the driver", ru: "HIGH включает драйвер", kk: "HIGH драйверді қосады" } },
    { from: "drv.AO1", to: "m1.+", color: "red" },
    { from: "drv.AO2", to: "m1.-", color: "black" },
    { from: "drv.BO1", to: "m2.+", color: "red" },
    { from: "drv.BO2", to: "m2.-", color: "black" },
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "drv.VM", color: "red", note: { en: "motor supply; sketch caps PWM at ~6 V", ru: "питание моторов; скетч ограничивает ШИМ до ~6 В", kk: "мотор қуаты; скетч ШИМ-ді ~6 В-қа шектейді" } },
    { from: "sw.1", to: "board.VIN", color: "red", note: { en: "Nano supply (VIN 7–12 V)", ru: "питание Nano (VIN 7–12 В)", kk: "Nano қуаты (VIN 7–12 В)" } },
    { from: "bat.-", to: "drv.GND", color: "black" },
    { from: "drv.GND", to: "board.GND2", color: "black", note: { en: "common ground", ru: "общая земля", kk: "ортақ жер" } },
  ],
  steps: [
    {
      title: { en: "Place the sensors on the chassis", ru: "Разместите датчики на шасси", kk: "Датчиктерді шассиге орналастырыңыз" },
      body: {
        en: "Assemble the 2WD chassis. Mount the VL53L0X on the right side, facing exactly sideways and level with the axle line, so turning on the spot changes its reading as little as possible. Peel the thin protective film off the sensor window. Mount the HC-SR04 at the front, looking straight ahead. Both should sit at mid-height of your maze walls.",
        ru: "Соберите шасси 2WD. Закрепите VL53L0X справа строго вбок и на линии оси колёс, чтобы разворот на месте как можно меньше менял показания. Снимите тонкую защитную плёнку с окна датчика. HC-SR04 поставьте спереди, глядя прямо вперёд. Оба датчика должны быть на половине высоты стен лабиринта.",
        kk: "2WD шассиін құрастырыңыз. VL53L0X-ті оң жаққа дәл бүйірге қаратып, доңғалақ осінің сызығына бекітіңіз, сонда орнында бұрылу көрсеткіштерді барынша аз өзгертеді. Датчик терезесіндегі жұқа қорғаныс үлдірін алыңыз. HC-SR04-ті алдыңғы жағына тура алға қаратып орнатыңыз. Екі датчик те лабиринт қабырғаларының жарты биіктігінде тұруы керек.",
      },
      expect: { en: "ToF on the right at axle line, sonar at the front, both level.", ru: "ToF справа на линии оси, сонар спереди, оба горизонтально.", kk: "ToF оң жақта ось сызығында, сонар алдыңғы жағында, екеуі де көлденең." },
      mistake: { en: "Leaving the protective film on: the VL53L0X then reads a constant 20–50 mm.", ru: "Если не снять защитную плёнку, VL53L0X постоянно показывает 20–50 мм.", kk: "Қорғаныс үлдірін алмасаңыз, VL53L0X үнемі 20–50 мм көрсетеді." },
    },
    {
      title: { en: "Wire the TB6612FNG", ru: "Подключите TB6612FNG", kk: "TB6612FNG-ні қосыңыз" },
      body: {
        en: "Put the Nano and TB6612FNG on the breadboard. VCC → 5V, GND → common ground, VM → switched battery +. Left motor on AO1/AO2, right motor on BO1/BO2. PWMA → D5, AIN1 → D7, AIN2 → D8, PWMB → D6, BIN1 → D4, BIN2 → D10, STBY → D9.",
        ru: "Поставьте Nano и TB6612FNG на макетку. VCC → 5V, GND → общая земля, VM → плюс аккумулятора после выключателя. Левый мотор на AO1/AO2, правый на BO1/BO2. PWMA → D5, AIN1 → D7, AIN2 → D8, PWMB → D6, BIN1 → D4, BIN2 → D10, STBY → D9.",
        kk: "Nano мен TB6612FNG-ні макет тақтасына қойыңыз. VCC → 5V, GND → ортақ жер, VM → қосқыштан кейінгі аккумулятор плюсы. Сол мотор AO1/AO2-ге, оң мотор BO1/BO2-ге. PWMA → D5, AIN1 → D7, AIN2 → D8, PWMB → D6, BIN1 → D4, BIN2 → D10, STBY → D9.",
      },
      expect: { en: "Seven signal wires from the Nano to the driver.", ru: "Семь сигнальных проводов от Nano к драйверу.", kk: "Nano-дан драйверге жеті сигнал сымы." },
      mistake: { en: "Battery on VCC instead of VM destroys the driver's logic side (VCC max 5.5 V).", ru: "Аккумулятор на VCC вместо VM сожжёт логику драйвера (VCC максимум 5,5 В).", kk: "Аккумуляторды VM орнына VCC-ке берсеңіз, драйвер логикасы күйеді (VCC ең көбі 5,5 В)." },
    },
    {
      title: { en: "Wire the two distance sensors", ru: "Подключите два датчика расстояния", kk: "Екі қашықтық датчигін қосыңыз" },
      body: {
        en: "VL53L0X: VIN → 5V, GND → GND, SDA → A4, SCL → A5 (the Nano's I²C pins). Leave XSHUT and GPIO1 unconnected: the GY-530 pulls XSHUT up on the board, which keeps the sensor on, and XSHUT must never be driven with 5 V. GPIO1 is a 2.8 V interrupt output the sketch does not need, since it polls the sensor. HC-SR04: VCC → 5V, GND → GND, TRIG → D11, ECHO → D12.",
        ru: "VL53L0X: VIN → 5V, GND → GND, SDA → A4, SCL → A5 (пины I²C у Nano). XSHUT и GPIO1 оставьте свободными: на плате GY-530 XSHUT подтянут вверх, это держит датчик включённым, а подавать на XSHUT 5 В нельзя. GPIO1 — выход прерывания на 2,8 В, он не нужен: скетч сам опрашивает датчик. HC-SR04: VCC → 5V, GND → GND, TRIG → D11, ECHO → D12.",
        kk: "VL53L0X: VIN → 5V, GND → GND, SDA → A4, SCL → A5 (Nano-ның I²C пиндері). XSHUT пен GPIO1-ді бос қалдырыңыз: GY-530 платасында XSHUT жоғары тартылған, бұл датчикті қосулы ұстайды, ал XSHUT-қа 5 В беруге болмайды. GPIO1 — 2,8 В үзіліс шығысы, ол қажет емес: скетч датчикті өзі сұрап отырады. HC-SR04: VCC → 5V, GND → GND, TRIG → D11, ECHO → D12.",
      },
      expect: { en: "The sketch prints \"VL53L0X ok\" at start-up.", ru: "При старте скетч печатает «VL53L0X ok».", kk: "Іске қосылғанда скетч «VL53L0X ok» деп шығарады." },
      mistake: { en: "Swapping SDA and SCL: init() fails and the sketch stops with \"VL53L0X not found\".", ru: "Перепутанные SDA и SCL: init() не проходит, и скетч останавливается с «VL53L0X not found».", kk: "SDA мен SCL ауысса: init() өтпейді де, скетч «VL53L0X not found» деп тоқтайды." },
    },
    {
      title: { en: "Power it up", ru: "Подайте питание", kk: "Қуат беріңіз" },
      body: {
        en: "Battery + goes through the switch to TB6612 VM and Nano VIN; battery − to TB6612 GND and on to Nano GND. The TT motors are 6 V parts, so the sketch never sends more than PWM 180 of 255 (about 6 V average from a full 8.4 V pack).",
        ru: "Плюс аккумулятора через выключатель на VM TB6612 и VIN Nano; минус на GND TB6612 и дальше на GND Nano. Моторы TT рассчитаны на 6 В, поэтому скетч никогда не подаёт ШИМ больше 180 из 255 (около 6 В в среднем от полного аккумулятора 8,4 В).",
        kk: "Аккумулятор плюсы қосқыш арқылы TB6612 VM-ге және Nano VIN-ге, минусы TB6612 GND-іне, одан әрі Nano GND-іне барады. TT моторлары 6 В-қа есептелген, сондықтан скетч ешқашан 255-тің 180-інен көп ШИМ бермейді (толық 8,4 В аккумулятордан орташа шамамен 6 В).",
      },
      expect: { en: "Switch on: the Nano and the sensors power up, nothing smells hot.", ru: "При включении Nano и датчики включаются, ничего не пахнет горелым.", kk: "Қосқанда Nano мен датчиктер іске қосылады, күйік иісі шықпайды." },
      mistake: { en: "Forgetting the GND link between the TB6612 and the Nano: the motors twitch randomly.", ru: "Без перемычки GND между TB6612 и Nano моторы дёргаются как попало.", kk: "TB6612 мен Nano арасында GND байланысы болмаса, моторлар ретсіз тартқылайды." },
    },
    {
      title: { en: "Upload and check the readings", ru: "Загрузите скетч и проверьте показания", kk: "Скетчті жүктеп, көрсеткіштерді тексеріңіз" },
      body: {
        en: "Install the \"VL53L0X\" library by Pololu, upload, and open the Serial Monitor at 115200 baud. Hold the robot with its wheels off the ground and its right side 10 cm from a wall: it prints \"follow side=… err=… corr=…\". Move it closer and farther: side changes smoothly, err is positive when too far, and the left wheel speeds up when it is too far (it steers right, toward the wall).",
        ru: "Установите библиотеку «VL53L0X» от Pololu, загрузите скетч и откройте Serial Monitor на 115200 бод. Держите робота колёсами в воздухе правым боком в 10 см от стены: он печатает «follow side=… err=… corr=…». Приближайте и отдаляйте: side меняется плавно, err положительный, когда далеко, и тогда левое колесо ускоряется (робот рулит вправо, к стене).",
        kk: "Pololu-дің «VL53L0X» кітапханасын орнатып, скетчті жүктеңіз де, Serial Monitor-ды 115200 бодта ашыңыз. Роботты доңғалақтарын ауада, оң бүйірін қабырғадан 10 см қашықтықта ұстаңыз: ол «follow side=… err=… corr=…» деп шығарады. Жақындатып, алыстатыңыз: side бірқалыпты өзгереді, алыс болғанда err оң, сонда сол доңғалақ жылдамдайды (робот оңға, қабырғаға қарай бұрылады).",
      },
      expect: { en: "side ≈ 100 at 10 cm, err ≈ 0, both wheels at the same speed.", ru: "side ≈ 100 на 10 см, err ≈ 0, оба колеса крутятся одинаково.", kk: "10 см-де side ≈ 100, err ≈ 0, екі доңғалақ бірдей айналады." },
      mistake: { en: "If the right wheel speeds up when the robot is too far, the motors are swapped: exchange the AO and BO pairs.", ru: "Если при удалении ускоряется правое колесо, моторы перепутаны: поменяйте местами пары AO и BO.", kk: "Робот алыстағанда оң доңғалақ жылдамдаса, моторлар ауысқан: AO және BO жұптарын ауыстырыңыз." },
    },
    {
      title: { en: "Tune the PD controller", ru: "Настройте PD-регулятор", kk: "PD реттегішті баптаңыз" },
      body: {
        en: "Build a straight cardboard wall at least 1.5 m long. P reacts to how far off you are; D reacts to how fast that error is changing and damps the swing. Set KD = 0 and KP = 0.3, upload, and let the robot follow the wall. Raise KP in steps of 0.2 until it starts to weave, then back off 30 %. Now raise KD from 0.02 in steps of 0.02 until the weaving dies out within one wobble. If it starts to jitter, KD is too high.",
        ru: "Сделайте прямую картонную стену длиной от 1,5 м. P реагирует на то, насколько робот отклонился; D — на то, как быстро меняется ошибка, и гасит раскачку. Поставьте KD = 0 и KP = 0,3, загрузите и пустите робота вдоль стены. Повышайте KP шагами по 0,2, пока он не начнёт вилять, затем уменьшите на 30 %. Теперь поднимайте KD от 0,02 шагами по 0,02, пока виляние не будет затухать за одно колебание. Если робот начал дрожать, KD слишком большой.",
        kk: "Ұзындығы кемінде 1,5 м түзу картон қабырға жасаңыз. P роботтың қаншалықты ауытқығанына, D қатенің қаншалықты жылдам өзгеретініне жауап береді және тербелісті басады. KD = 0 және KP = 0,3 қойып, жүктеңіз де, роботты қабырға бойымен жіберіңіз. KP-ны 0,2 қадаммен ол бұлталақтай бастағанша арттырып, содан кейін 30 %-ға азайтыңыз. Енді KD-ны 0,02-ден бастап 0,02 қадаммен бұлталақ бір тербелісте сөнгенше арттырыңыз. Робот дірілдей бастаса, KD тым үлкен.",
      },
      expect: { en: "The robot settles on the line after a push and runs straight, err within ±10 mm.", ru: "После толчка робот возвращается на линию и едет ровно, err в пределах ±10 мм.", kk: "Итергеннен кейін робот сызыққа қайтып, түзу жүреді, err ±10 мм ішінде." },
      mistake: { en: "Tuning at a different BASE speed than the maze run: faster driving needs more KD.", ru: "Настройка на одной BASE, а заезд на другой: на большей скорости нужен больший KD.", kk: "Бір BASE жылдамдықта баптап, басқасында жүргізу: жылдамырақ жүріске көбірек KD керек." },
    },
    {
      title: { en: "Run the maze", ru: "Пройдите лабиринт", kk: "Лабиринттен өтіңіз" },
      body: {
        en: "Build corridors about 30 cm wide with walls at least 15 cm high. Start the robot with a wall on its right. A wall ahead closer than 15 cm makes it spin left; an opening on the right (more than 30 cm) makes it roll forward briefly and arc right around the wall end. This right-hand rule solves any maze whose walls all connect to the outside wall.",
        ru: "Сделайте коридоры шириной около 30 см со стенами высотой от 15 см. Ставьте робота так, чтобы стена была справа. Стена впереди ближе 15 см заставляет его развернуться влево; проём справа (больше 30 см) — немного проехать вперёд и дугой обогнуть конец стены вправо. Это правило правой руки проходит любой лабиринт, где все стены соединены с внешней.",
        kk: "Ені шамамен 30 см, қабырға биіктігі кемінде 15 см дәліздер жасаңыз. Роботты қабырға оң жағында болатындай етіп қойыңыз. Алдындағы қабырға 15 см-ден жақын болса, ол солға бұрылады; оң жақта ойық болса (30 см-ден көп), сәл алға жүріп, қабырға ұшын оңға доғамен айналып өтеді. Бұл оң қол ережесі барлық қабырғасы сыртқы қабырғамен жалғасқан кез келген лабиринттен өтеді.",
      },
      expect: { en: "The robot reaches the exit without touching the walls.", ru: "Робот доходит до выхода, не задевая стен.", kk: "Робот қабырғаларға тимей шығысқа жетеді." },
      mistake: { en: "A wall \"island\" that does not touch the outer wall can trap a wall follower in an endless loop.", ru: "Стена-«остров», не связанная с внешней стеной, может заставить робота ходить по кругу бесконечно.", kk: "Сыртқы қабырғаға тиіспейтін «арал» қабырға роботты шексіз айналып жүруге мәжбүр етуі мүмкін." },
    },
  ],
  code: [{
    filename: "wall_follower.ino",
    language: "cpp",
    libraries: ["VL53L0X"],
    source: `// Right-wall-following maze robot: VL53L0X (side) + HC-SR04 (front) + TB6612FNG on Arduino Nano
#include <Wire.h>
#include <VL53L0X.h>

const int TRIG = 11, ECHO = 12;          // HC-SR04, looking ahead
const int PWMA = 5, AIN1 = 7, AIN2 = 8;  // left motor
const int PWMB = 6, BIN1 = 4, BIN2 = 10; // right motor
const int STBY = 9;
// VL53L0X uses the hardware I2C bus: SDA = A4, SCL = A5

const int TARGET_MM = 100;     // wanted gap to the right wall
const int LOST_MM = 300;       // farther than this = opening on the right
const int FRONT_STOP_CM = 15;  // wall ahead
const int BASE = 140, MAX_PWM = 180, MAX_CORR = 80;
const float KP = 0.9;          // PWM per mm of error
const float KD = 0.06;         // PWM per mm/s of error change
const unsigned long CLEAR_MS = 250;   // roll past the wall end before arcing

VL53L0X tof;
enum Mode { FOLLOW, SPIN_LEFT, ARC_RIGHT };
Mode mode = FOLLOW;
int prevErr = 0;
unsigned long prevUs = 0, modeStart = 0, lastPrint = 0;

void side(int pwmPin, int in1, int in2, int pwm) {
  pwm = constrain(pwm, -MAX_PWM, MAX_PWM);
  digitalWrite(in1, pwm > 0 ? HIGH : LOW);
  digitalWrite(in2, pwm < 0 ? HIGH : LOW);
  analogWrite(pwmPin, abs(pwm));
}

void motors(int left, int right) {
  side(PWMA, AIN1, AIN2, left);
  side(PWMB, BIN1, BIN2, right);
}

int frontCm() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  unsigned long us = pulseIn(ECHO, HIGH, 4000UL);   // ~68 cm max, keeps the loop fast
  return us == 0 ? 99 : us / 58;
}

int sideMm() {
  uint16_t mm = tof.readRangeContinuousMillimeters();
  if (tof.timeoutOccurred() || mm > 1200) return 9999;   // no wall in range
  return mm;
}

void setMode(Mode m, const char *msg) {
  if (m == mode) return;
  mode = m;
  modeStart = millis();
  Serial.println(msg);
}

void setup() {
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  pinMode(PWMA, OUTPUT); pinMode(AIN1, OUTPUT); pinMode(AIN2, OUTPUT);
  pinMode(PWMB, OUTPUT); pinMode(BIN1, OUTPUT); pinMode(BIN2, OUTPUT);
  pinMode(STBY, OUTPUT);
  digitalWrite(STBY, LOW);
  Serial.begin(115200);
  Wire.begin();

  tof.setTimeout(500);
  if (!tof.init()) {
    Serial.println("VL53L0X not found, check SDA/SCL");
    while (true) {}
  }
  tof.setMeasurementTimingBudget(20000);   // 20 ms per reading
  tof.startContinuous();
  Serial.println("VL53L0X ok, following the right wall");

  delay(1500);                             // time to put it down
  digitalWrite(STBY, HIGH);
  prevUs = micros();
}

void loop() {
  int s = sideMm();
  int front = frontCm();
  unsigned long now = micros();
  float dt = (now - prevUs) / 1e6;
  prevUs = now;

  // 1. wall ahead: spin left until the way is clear (+10 cm hysteresis)
  int stopCm = mode == SPIN_LEFT ? FRONT_STOP_CM + 10 : FRONT_STOP_CM;
  if (front < stopCm) {
    setMode(SPIN_LEFT, "wall ahead -> spin left");
    motors(-BASE, BASE);
    return;
  }

  // 2. opening on the right: roll forward a little, then arc right around the wall end
  if (s > LOST_MM) {
    setMode(ARC_RIGHT, "opening on the right -> arc right");
    if (millis() - modeStart < CLEAR_MS) motors(BASE, BASE);
    else motors(BASE, BASE / 4);
    return;
  }

  // 3. PD wall following
  if (mode != FOLLOW) {
    setMode(FOLLOW, "wall found -> follow");
    prevErr = s - TARGET_MM;               // no derivative kick after a turn
  }
  int err = s - TARGET_MM;                 // + = too far from the wall
  float deriv = dt > 0 ? (err - prevErr) / dt : 0;
  prevErr = err;
  int corr = constrain((int)(KP * err + KD * deriv), -MAX_CORR, MAX_CORR);
  int l = min(BASE + corr, MAX_PWM), r = min(BASE - corr, MAX_PWM);
  motors(l, r);                            // too far -> left wheel faster -> steer right

  if (millis() - lastPrint > 250) {
    lastPrint = millis();
    Serial.print("follow side="); Serial.print(s);
    Serial.print(" err="); Serial.print(err);
    Serial.print(" corr="); Serial.print(corr);
    Serial.print(" L="); Serial.print(l);
    Serial.print(" R="); Serial.println(r);
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"VL53L0X not found\" at start-up", ru: "При старте «VL53L0X not found»", kk: "Іске қосылғанда «VL53L0X not found»" },
      cause: { en: "SDA/SCL swapped or not on A4/A5, a loose GND, or a dead module.", ru: "SDA/SCL перепутаны или не на A4/A5, плохой контакт GND или неисправный модуль.", kk: "SDA/SCL ауысқан не A4/A5-те емес, GND байланысы нашар немесе модуль бұзық." },
      fix: { en: "SDA must go to A4 and SCL to A5. Run the Wire library's I2C scanner example: the VL53L0X answers at 0x29.", ru: "SDA должен идти на A4, SCL на A5. Запустите пример I2C-сканера: VL53L0X отвечает по адресу 0x29.", kk: "SDA A4-ке, SCL A5-ке баруы керек. I2C сканер мысалын іске қосыңыз: VL53L0X 0x29 адресінде жауап береді." },
    },
    {
      symptom: { en: "The robot weaves left and right along the wall", ru: "Робот виляет вдоль стены", kk: "Робот қабырға бойымен бұлталақтайды" },
      cause: { en: "KP is too high or KD too low for the speed.", ru: "KP слишком большой или KD слишком мал для этой скорости.", kk: "Бұл жылдамдық үшін KP тым үлкен немесе KD тым кіші." },
      fix: { en: "Lower KP by 30 %, then raise KD in steps of 0.02 until a push dies out in one wobble.", ru: "Уменьшите KP на 30 %, затем поднимайте KD шагами по 0,02, пока толчок не будет гаснуть за одно колебание.", kk: "KP-ны 30 %-ға азайтып, итеру бір тербелісте сөнгенше KD-ны 0,02 қадаммен арттырыңыз." },
    },
    {
      symptom: { en: "It clips the wall end when turning right into an opening", ru: "При повороте вправо в проём задевает конец стены", kk: "Оңға ойыққа бұрылғанда қабырға ұшына тиіп кетеді" },
      cause: { en: "The arc starts before the wheels have passed the end of the wall.", ru: "Дуга начинается раньше, чем колёса прошли конец стены.", kk: "Доғалық бұрылыс доңғалақтар қабырға ұшынан өтпей тұрып басталады." },
      fix: { en: "Raise CLEAR_MS (try 350–400) so the robot rolls further before arcing.", ru: "Увеличьте CLEAR_MS (попробуйте 350–400), чтобы робот проезжал дальше перед дугой.", kk: "Робот доғаға дейін ұзағырақ жүруі үшін CLEAR_MS-ті арттырыңыз (350–400 байқап көріңіз)." },
    },
    {
      symptom: { en: "Side readings jump on dark or shiny walls", ru: "Показания сбоку скачут на тёмных или блестящих стенах", kk: "Күңгірт не жылтыр қабырғаларда бүйір көрсеткіштері секіреді" },
      cause: { en: "Black or glossy surfaces return little laser light, so the VL53L0X becomes noisy.", ru: "Чёрные или глянцевые поверхности отражают мало лазерного света, и VL53L0X начинает шуметь.", kk: "Қара не жылтыр беттер лазер сәулесін аз қайтарады да, VL53L0X шулы болады." },
      fix: { en: "Use plain light cardboard or white paper for the maze walls.", ru: "Делайте стены лабиринта из светлого картона или обклейте белой бумагой.", kk: "Лабиринт қабырғаларын ашық түсті картоннан жасаңыз немесе ақ қағазбен жапсырыңыз." },
    },
  ],
  safety: [
    { en: "The VL53L0X is a Class 1 laser and eye-safe, but do not stare into the window at close range.", ru: "VL53L0X — лазер класса 1 и безопасен для глаз, но не смотрите в окно датчика вплотную.", kk: "VL53L0X — 1-класты лазер, көзге қауіпсіз, бірақ датчик терезесіне жақыннан қарамаңыз." },
    { en: "Charge the 2S pack only with a balance charger and never leave it charging unattended.", ru: "Заряжайте аккумулятор 2S только балансирным зарядником и не оставляйте без присмотра.", kk: "2S аккумуляторын тек баланстық зарядтағышпен зарядтаңыз және қараусыз қалдырмаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: ["VL53L0X ok, following the right wall", "follow side=100 err=0 corr=0 L=140 R=140", "follow side=118 err=18 corr=22 L=162 R=118", "follow side=104 err=4 corr=-3 L=137 R=143", "opening on the right -> arc right", "wall found -> follow", "follow side=92 err=-8 corr=-11 L=129 R=151", "wall ahead -> spin left", "wall found -> follow", "follow side=101 err=1 corr=1 L=141 R=139"],
    leds: [{ label: "PWR", color: "#7CB342" }, { label: "L", color: "#F57C00" }],
  },
} satisfies GuideContent;
