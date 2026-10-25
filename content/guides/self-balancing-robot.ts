import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "self-balancing-robot",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "robotics",
  robotics: true,
  difficulty: "advanced",
  hours: 14,
  costUsd: 75,
  xpReward: 480,
  title: {
    en: "Self-Balancing Robot",
    ru: "Самобалансирующий робот",
    kk: "Өздігінен тепе-теңдік сақтайтын робот",
  },
  summary: {
    en: "A two-wheeled inverted pendulum: an MPU6050 measures the tilt 200 times a second, a PID controller turns it into wheel speed, and two NEMA 17 steppers keep the robot upright. Gains are tuned live over USB.",
    ru: "Двухколёсный перевёрнутый маятник: MPU6050 измеряет наклон 200 раз в секунду, PID-регулятор превращает его в скорость колёс, а два шаговых мотора NEMA 17 удерживают робота вертикально. Коэффициенты настраиваются на лету по USB.",
    kk: "Екі доңғалақты аударылған маятник: MPU6050 еңісті секундына 200 рет өлшейді, PID реттегіш оны доңғалақ жылдамдығына айналдырады, ал екі NEMA 17 қадамдық моторы роботты тік ұстайды. Коэффициенттер USB арқылы жұмыс кезінде бапталады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, VIN accepts up to 20 V", ru: "логика 5 В, VIN принимает до 20 В", kk: "5 В логика, VIN 20 В-қа дейін қабылдайды" }, role: { en: "Balance controller and step generator", ru: "Регулятор баланса и генератор шагов", kk: "Тепе-теңдік реттегіші және қадам генераторы" } },
    { component: "mpu6050", qty: 1, spec: { en: "GY-521 board, onboard 3.3 V regulator, I²C 0x68", ru: "плата GY-521, свой стабилизатор 3,3 В, I²C 0x68", kk: "GY-521 платасы, өз 3,3 В тұрақтандырғышы, I²C 0x68" }, role: { en: "Tilt angle and tilt rate", ru: "Угол и скорость наклона", kk: "Еңіс бұрышы мен жылдамдығы" } },
    { component: "a4988", qty: 2, spec: { en: "Pololu-style carrier with heatsink, VMOT 8–35 V", ru: "плата в стиле Pololu с радиатором, VMOT 8–35 В", kk: "Pololu үлгісіндегі плата, радиаторы бар, VMOT 8–35 В" }, role: { en: "One driver per wheel, 1/8 microstepping", ru: "По драйверу на колесо, микрошаг 1/8", kk: "Әр доңғалаққа бір драйвер, 1/8 микроқадам" } },
    { component: "stepper-nema17", qty: 2, spec: { en: "1.5–1.7 A, 40 mm body, 5 mm shaft, with 80–90 mm wheels", ru: "1,5–1,7 А, корпус 40 мм, вал 5 мм, с колёсами 80–90 мм", kk: "1,5–1,7 А, корпусы 40 мм, білігі 5 мм, 80–90 мм доңғалақтармен" }, role: { en: "Left and right wheels", ru: "Левое и правое колёса", kk: "Сол және оң доңғалақтар" } },
    { component: "capacitor", qty: 2, spec: { en: "100 µF, 35 V or more", ru: "100 мкФ, от 35 В", kk: "100 мкФ, 35 В не одан жоғары" }, role: { en: "On VMOT of each A4988, protects it from voltage spikes", ru: "На VMOT каждого A4988, защищает от выбросов напряжения", kk: "Әр A4988-дің VMOT-ында, кернеу секірулерінен қорғайды" } },
    { component: "battery-2s-lipo", qty: 2, spec: { en: "two identical 7.4 V packs in series = 14.8 V (16.8 V full)", ru: "два одинаковых аккумулятора 7,4 В последовательно = 14,8 В (16,8 В полный)", kk: "екі бірдей 7,4 В аккумулятор тізбектей = 14,8 В (толы 16,8 В)" }, role: { en: "Motor and Arduino power (the A4988 needs at least 8 V)", ru: "Питание моторов и Arduino (A4988 нужно не меньше 8 В)", kk: "Моторлар мен Arduino қуаты (A4988-ге кемінде 8 В керек)" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT, rated 3 A or more", ru: "SPDT, на ток от 3 А", kk: "SPDT, 3 А не одан жоғары токқа" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі қосқыш" } },
    { component: "breadboard", qty: 1, spec: { en: "half size, or a perfboard for the final build", ru: "половинка или макетная плата под пайку для финальной сборки", kk: "жартылай немесе соңғы құрастыруға арналған дәнекерлеу платасы" }, role: { en: "Holds both A4988 drivers", ru: "Для обоих драйверов A4988", kk: "Екі A4988 драйверіне арналған" } },
    { component: "jumper-wires", qty: 40, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "imu", component: "mpu6050", label: "MPU6050" },
    { id: "drv_l", component: "a4988", label: "A4988 left" },
    { id: "drv_r", component: "a4988", label: "A4988 right" },
    { id: "mot_l", component: "stepper-nema17", label: "Left wheel" },
    { id: "mot_r", component: "stepper-nema17", label: "Right wheel" },
    { id: "c_l", component: "capacitor", label: "100 µF" },
    { id: "c_r", component: "capacitor", label: "100 µF" },
    { id: "bat", component: "battery-2s-lipo", label: "2× 2S = 14.8 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
  ],
  connections: [
    { from: "board.5V", to: "imu.VCC", color: "red" },
    { from: "imu.GND", to: "board.GND", color: "black" },
    { from: "imu.SDA", to: "board.A4", color: "blue", note: { en: "I²C SDA", ru: "I²C SDA", kk: "I²C SDA" } },
    { from: "imu.SCL", to: "board.A5", color: "yellow", note: { en: "I²C SCL", ru: "I²C SCL", kk: "I²C SCL" } },
    { from: "board.5V", to: "drv_l.VDD", color: "red", note: { en: "driver logic 5 V", ru: "логика драйвера 5 В", kk: "драйвер логикасы 5 В" } },
    { from: "board.D3", to: "drv_l.STEP", color: "orange" },
    { from: "board.D2", to: "drv_l.DIR", color: "green" },
    { from: "board.D8", to: "drv_l.ENABLE", color: "purple", note: { en: "LOW = motors on (shared by both drivers)", ru: "LOW = моторы включены (общий для обоих драйверов)", kk: "LOW = моторлар қосулы (екі драйверге ортақ)" } },
    { from: "board.5V", to: "drv_l.MS1", color: "red", note: { en: "MS1 + MS2 high, MS3 low = 1/8 step", ru: "MS1 + MS2 высокий, MS3 низкий = 1/8 шага", kk: "MS1 + MS2 жоғары, MS3 төмен = 1/8 қадам" } },
    { from: "board.5V", to: "drv_l.MS2", color: "red" },
    { from: "drv_l.MS3", to: "board.GND", color: "black" },
    { from: "drv_l.RESET", to: "drv_l.SLEEP", color: "gray", note: { en: "short jumper: SLEEP's pull-up keeps RESET high", ru: "короткая перемычка: подтяжка SLEEP держит RESET в высоком", kk: "қысқа секіргіш: SLEEP тартуы RESET-ті жоғары ұстайды" } },
    { from: "drv_l.1A", to: "mot_l.A+", color: "red", note: { en: "coil A pair", ru: "пара обмотки A", kk: "A орамасының жұбы" } },
    { from: "drv_l.1B", to: "mot_l.A-", color: "blue" },
    { from: "drv_l.2A", to: "mot_l.B+", color: "green", note: { en: "coil B pair", ru: "пара обмотки B", kk: "B орамасының жұбы" } },
    { from: "drv_l.2B", to: "mot_l.B-", color: "black" },
    { from: "board.5V", to: "drv_r.VDD", color: "red" },
    { from: "board.D5", to: "drv_r.STEP", color: "orange" },
    { from: "board.D4", to: "drv_r.DIR", color: "green" },
    { from: "board.D8", to: "drv_r.ENABLE", color: "purple" },
    { from: "board.5V", to: "drv_r.MS1", color: "red" },
    { from: "board.5V", to: "drv_r.MS2", color: "red" },
    { from: "drv_r.MS3", to: "board.GND2", color: "black" },
    { from: "drv_r.RESET", to: "drv_r.SLEEP", color: "gray" },
    { from: "drv_r.1A", to: "mot_r.A+", color: "red" },
    { from: "drv_r.1B", to: "mot_r.A-", color: "blue" },
    { from: "drv_r.2A", to: "mot_r.B+", color: "green" },
    { from: "drv_r.2B", to: "mot_r.B-", color: "black" },
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "drv_l.VMOT", color: "red", note: { en: "14.8 V motor supply", ru: "питание моторов 14,8 В", kk: "мотор қуаты 14,8 В" } },
    { from: "sw.1", to: "drv_r.VMOT", color: "red" },
    { from: "sw.1", to: "board.VIN", color: "red", note: { en: "Uno VIN (limit 6–20 V)", ru: "VIN Uno (предел 6–20 В)", kk: "Uno VIN (шегі 6–20 В)" } },
    { from: "c_l.A", to: "drv_l.VMOT", color: "red", note: { en: "capacitor right at the driver, + to VMOT", ru: "конденсатор прямо у драйвера, плюс на VMOT", kk: "конденсатор драйвердің дәл қасында, плюсы VMOT-қа" } },
    { from: "c_l.B", to: "drv_l.GND", color: "black" },
    { from: "c_r.A", to: "drv_r.VMOT", color: "red" },
    { from: "c_r.B", to: "drv_r.GND", color: "black" },
    { from: "bat.-", to: "drv_l.GND", color: "black" },
    { from: "bat.-", to: "drv_r.GND", color: "black" },
    { from: "drv_l.GND", to: "board.GND3", color: "black", note: { en: "common ground", ru: "общая земля", kk: "ортақ жер" } },
  ],
  steps: [
    {
      title: { en: "Build a tall, rigid frame", ru: "Соберите высокую и жёсткую раму", kk: "Биік әрі қатты рама құрастырыңыз" },
      body: {
        en: "Use two or three plates (plywood, acrylic or 3D-printed) on M3 standoffs, about 20 cm tall in total. Bolt the two NEMA 17s at the bottom with their shafts in line, and fit 80–90 mm wheels with 5 mm hubs. Put the batteries on the top plate: a higher centre of mass falls more slowly and is easier to balance. Mount the MPU6050 flat, at the centre, with its X arrow pointing in the driving direction.",
        ru: "Возьмите две-три пластины (фанера, акрил или печать) на стойках M3, общей высотой около 20 см. Прикрутите два NEMA 17 внизу так, чтобы валы были на одной оси, и наденьте колёса 80–90 мм со ступицами 5 мм. Аккумуляторы ставьте на верхнюю пластину: высокий центр масс падает медленнее, и балансировать проще. MPU6050 закрепите горизонтально по центру, стрелкой X по направлению езды.",
        kk: "M3 тіректеріне қойылған екі-үш пластина (фанера, акрил не 3D басылған) алыңыз, жалпы биіктігі шамамен 20 см. Екі NEMA 17-ні төменгі жағына біліктері бір осьте болатындай бұрап, 5 мм күпшегі бар 80–90 мм доңғалақтарды кигізіңіз. Аккумуляторларды үстіңгі пластинаға қойыңыз: биік масса орталығы баяуырақ құлайды, тепе-теңдік сақтау оңайырақ. MPU6050-ді ортаға көлденең, X нұсқамасын жүру бағытына қаратып бекітіңіз.",
      },
      expect: { en: "The frame does not flex when you squeeze it and stands on its wheels when leaned against a wall.", ru: "Рама не гнётся при сжатии и стоит на колёсах, если прислонить её к стене.", kk: "Рама қысқанда майыспайды және қабырғаға сүйегенде доңғалақтарымен тұрады." },
      mistake: { en: "A wobbly MPU mount or a flexing frame adds vibration that the PID amplifies into shaking.", ru: "Шаткое крепление MPU или гибкая рама добавляют вибрацию, которую PID усиливает в тряску.", kk: "MPU-дың әлсіз бекітпесі не майысқақ рама дірілді арттырады, ал PID оны қатты солқылдауға айналдырады." },
    },
    {
      title: { en: "Wire the two A4988 drivers", ru: "Подключите два драйвера A4988", kk: "Екі A4988 драйверін қосыңыз" },
      body: {
        en: "Logic side of each driver: VDD → 5V, GND → GND, MS1 and MS2 → 5V, MS3 → GND (1/8 microstep), and a short jumper between RESET and SLEEP. Left driver: STEP → D3, DIR → D2. Right driver: STEP → D5, DIR → D4. Both ENABLE pins go to D8. Put a 100 µF capacitor across VMOT and GND right at each driver, + leg on VMOT.",
        ru: "Логическая сторона каждого драйвера: VDD → 5V, GND → GND, MS1 и MS2 → 5V, MS3 → GND (микрошаг 1/8) и короткая перемычка между RESET и SLEEP. Левый драйвер: STEP → D3, DIR → D2. Правый: STEP → D5, DIR → D4. Оба ENABLE на D8. Конденсатор 100 мкФ поставьте между VMOT и GND прямо у каждого драйвера, плюсом на VMOT.",
        kk: "Әр драйвердің логика жағы: VDD → 5V, GND → GND, MS1 мен MS2 → 5V, MS3 → GND (1/8 микроқадам), RESET пен SLEEP арасында қысқа секіргіш. Сол драйвер: STEP → D3, DIR → D2. Оң драйвер: STEP → D5, DIR → D4. Екі ENABLE де D8-ге барады. Әр драйвердің дәл қасында VMOT пен GND арасына 100 мкФ конденсатор қойыңыз, плюсы VMOT-қа.",
      },
      expect: { en: "Each driver has five signal wires plus the RESET–SLEEP jumper and its own capacitor.", ru: "У каждого драйвера пять сигнальных проводов, перемычка RESET–SLEEP и свой конденсатор.", kk: "Әр драйверде бес сигнал сымы, RESET–SLEEP секіргіші және өз конденсаторы бар." },
      mistake: { en: "Leaving out the VMOT capacitor: the voltage spike when power is connected can destroy the A4988.", ru: "Без конденсатора на VMOT выброс напряжения при подключении питания может убить A4988.", kk: "VMOT-та конденсатор болмаса, қуат қосылғандағы кернеу секіруі A4988-ді істен шығаруы мүмкін." },
    },
    {
      title: { en: "Find the coil pairs and connect the motors", ru: "Найдите пары обмоток и подключите моторы", kk: "Орама жұптарын тауып, моторларды қосыңыз" },
      body: {
        en: "A NEMA 17 has four wires forming two coils. With a multimeter on ohms, find the two wires that read a few ohms between them: that is coil A, the other two are coil B. Connect coil A to 1A/1B and coil B to 2A/2B on each driver. Never plug or unplug a motor while the drivers are powered.",
        ru: "У NEMA 17 четыре провода, это две обмотки. Мультиметром в режиме омметра найдите два провода с сопротивлением в несколько ом между ними: это обмотка A, оставшиеся два — обмотка B. Обмотку A подключите к 1A/1B, обмотку B к 2A/2B каждого драйвера. Никогда не подключайте и не отключайте мотор при включённом питании драйверов.",
        kk: "NEMA 17-нің төрт сымы бар, олар екі орама құрайды. Мультиметрді омметр режимінде қойып, арасы бірнеше Ом көрсететін екі сымды табыңыз: бұл A орамасы, қалған екеуі B орамасы. Әр драйверде A орамасын 1A/1B-ге, B орамасын 2A/2B-ге қосыңыз. Драйверлерге қуат берілгенде моторды ешқашан қоспаңыз да, ажыратпаңыз да.",
      },
      expect: { en: "Two pairs per motor, each pair a few ohms (typically 1.5–3 Ω).", ru: "По две пары на мотор, у каждой пары несколько ом (обычно 1,5–3 Ом).", kk: "Әр моторда екі жұп, әр жұптың кедергісі бірнеше Ом (әдетте 1,5–3 Ом)." },
      mistake: { en: "Mixing wires from different coils on 1A/1B: the motor buzzes and jitters instead of turning.", ru: "Если на 1A/1B попали провода разных обмоток, мотор гудит и дёргается вместо вращения.", kk: "1A/1B-ге әртүрлі орамалардың сымдары түссе, мотор айналудың орнына ызыңдап, тартқылайды." },
    },
    {
      title: { en: "Set the A4988 current limit", ru: "Выставьте ограничение тока A4988", kk: "A4988 ток шегін баптаңыз" },
      body: {
        en: "Power the drivers (Uno on USB, battery switched on) and measure the voltage between the small trimmer's metal top and GND. The current limit is Vref ÷ (8 × Rs). Read the sense resistors next to the chip: R068 means Rs = 0.068 Ω, so 1.0 A needs Vref ≈ 0.54 V; R100 means 0.1 Ω, so 1.0 A needs Vref ≈ 0.80 V. Start at about 1.0 A: enough torque, and the motors stay warm rather than hot.",
        ru: "Подайте питание на драйверы (Uno по USB, аккумулятор включён) и измерьте напряжение между металлической верхушкой маленького подстроечника и GND. Предел тока равен Vref ÷ (8 × Rs). Посмотрите маркировку токовых резисторов рядом с микросхемой: R068 — это Rs = 0,068 Ом, и для 1,0 А нужно Vref ≈ 0,54 В; R100 — это 0,1 Ом, и для 1,0 А нужно Vref ≈ 0,80 В. Начните примерно с 1,0 А: момента хватает, а моторы остаются тёплыми, а не горячими.",
        kk: "Драйверлерге қуат беріңіз (Uno USB арқылы, аккумулятор қосулы) және шағын потенциометрдің металл төбесі мен GND арасындағы кернеуді өлшеңіз. Ток шегі Vref ÷ (8 × Rs) тең. Чиптің қасындағы ток резисторларының таңбасын қараңыз: R068 — Rs = 0,068 Ом, 1,0 А үшін Vref ≈ 0,54 В керек; R100 — 0,1 Ом, 1,0 А үшін Vref ≈ 0,80 В керек. Шамамен 1,0 А-ден бастаңыз: момент жеткілікті, ал моторлар ыстық емес, жылы болып қалады.",
      },
      expect: { en: "Both drivers set to the same Vref.", ru: "На обоих драйверах одинаковое Vref.", kk: "Екі драйверде де бірдей Vref." },
      mistake: { en: "Running with the trimmer at maximum: the drivers overheat and shut down mid-balance, and the robot falls.", ru: "Работа с подстроечником на максимуме: драйверы перегреваются и отключаются посреди балансировки, робот падает.", kk: "Потенциометр ең жоғарыда тұрса: драйверлер қызып, тепе-теңдік кезінде өшіп қалады да, робот құлайды." },
    },
    {
      title: { en: "Connect the MPU6050 and the batteries", ru: "Подключите MPU6050 и аккумуляторы", kk: "MPU6050 пен аккумуляторларды қосыңыз" },
      body: {
        en: "MPU6050: VCC → 5V, GND → GND, SDA → A4, SCL → A5. Join the two 2S packs in series (− of the first to + of the second) to get 14.8 V; the A4988 needs at least 8 V on VMOT, which one 2S pack cannot guarantee. The free + goes through the switch to both VMOT pins and to Uno VIN, the free − to both driver GNDs and from there to Uno GND. VIN tolerates up to 20 V; the Uno's regulator runs warm at 16.8 V but carries only the logic.",
        ru: "MPU6050: VCC → 5V, GND → GND, SDA → A4, SCL → A5. Соедините два аккумулятора 2S последовательно (минус первого с плюсом второго), чтобы получить 14,8 В: A4988 нужно не меньше 8 В на VMOT, а один 2S этого не гарантирует. Свободный плюс через выключатель идёт на оба VMOT и на VIN Uno, свободный минус на GND обоих драйверов и оттуда на GND Uno. VIN выдерживает до 20 В; стабилизатор Uno на 16,8 В греется, но питает только логику.",
        kk: "MPU6050: VCC → 5V, GND → GND, SDA → A4, SCL → A5. 14,8 В алу үшін екі 2S аккумуляторын тізбектей жалғаңыз (біріншісінің минусын екіншісінің плюсымен): A4988-ге VMOT-та кемінде 8 В керек, ал бір 2S мұны қамтамасыз ете алмайды. Бос плюс қосқыш арқылы екі VMOT-қа және Uno VIN-ге, бос минус екі драйвердің GND-іне, одан Uno GND-іне барады. VIN 20 В-қа дейін шыдайды; 16,8 В-та Uno тұрақтандырғышы жылиды, бірақ тек логиканы қуаттайды.",
      },
      expect: { en: "Switch on: the Uno lights up, the motors are free to turn by hand (ENABLE is HIGH until upright).", ru: "При включении Uno загорается, моторы свободно крутятся рукой (ENABLE в HIGH, пока робот не поднят).", kk: "Қосқанда Uno жанады, моторлар қолмен еркін айналады (робот тік болғанша ENABLE HIGH)." },
      mistake: { en: "Mixing a full and a half-empty pack in series overdischarges the weaker one; charge both fully before every session.", ru: "Если соединить последовательно полный и полуразряженный аккумулятор, слабый переразрядится; перед каждой сессией заряжайте оба полностью.", kk: "Толы және жартылай отырған аккумуляторды тізбектей жалғасаңыз, әлсізі шамадан тыс разрядталады; әр сеанс алдында екеуін де толық зарядтаңыз." },
    },
    {
      title: { en: "Check directions and find the balance angle", ru: "Проверьте направления и найдите угол равновесия", kk: "Бағыттарды тексеріп, тепе-теңдік бұрышын табыңыз" },
      body: {
        en: "Upload the sketch, open the Serial Monitor at 115200 baud with line ending \"Newline\", and keep the robot still for the gyro calibration. While it waits it prints \"waiting angle=…\": tilt it forward and the angle must rise. Find the point where the robot neither falls forward nor backward, note the angle and send it as o, for example o-1.5. Then lift it upright: both wheels must spin toward the side it leans to. If one wheel spins the wrong way, swap the two wires of one coil on that motor.",
        ru: "Загрузите скетч, откройте Serial Monitor на 115200 бод с окончанием строки «Новая строка» и держите робота неподвижно, пока калибруется гироскоп. В ожидании он печатает «waiting angle=…»: наклоните вперёд — угол должен расти. Найдите положение, где робот не падает ни вперёд, ни назад, запомните угол и отправьте его командой o, например o-1.5. Затем поставьте робота вертикально: оба колеса должны крутиться в сторону наклона. Если одно колесо крутится не туда, поменяйте местами два провода одной обмотки этого мотора.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 115200 бодта «Жаңа жол» жол соңымен ашыңыз да, гироскоп калибрленгенше роботты қозғалтпай ұстаңыз. Күту кезінде ол «waiting angle=…» деп шығарады: алға еңкейтсеңіз, бұрыш өсуі керек. Робот алға да, артқа да құламайтын нүктені тауып, бұрышты жазып алыңыз да, оны o командасымен жіберіңіз, мысалы o-1.5. Содан кейін роботты тік қойыңыз: екі доңғалақ та еңкейген жаққа айналуы керек. Бір доңғалақ теріс айналса, сол мотордың бір орамасының екі сымын ауыстырыңыз.",
      },
      expect: { en: "Leaning forward drives both wheels forward, under the body.", ru: "При наклоне вперёд оба колеса едут вперёд, под корпус.", kk: "Алға еңкейгенде екі доңғалақ та алға, корпустың астына қарай жүреді." },
      mistake: { en: "Wheels that drive away from the lean push the robot over faster; that is a direction problem, not a tuning one.", ru: "Колёса, уезжающие от наклона, только быстрее роняют робота; это ошибка направления, а не настройки.", kk: "Еңістен алыстайтын доңғалақтар роботты тезірек құлатады; бұл баптау емес, бағыт қатесі." },
    },
    {
      title: { en: "Tune the PID controller", ru: "Настройте PID-регулятор", kk: "PID реттегішті баптаңыз" },
      body: {
        en: "Keep a hand ready to catch it. Send i0, d0 and s0, then raise P (p60, p90, p120 …) until the robot stands for a few seconds while rocking back and forth. Add D (d1, d2, d4 …) until the rocking turns into a calm stand; too much D makes it buzz. Add a little I (i1 to i3) so it corrects a constant lean. Finally raise s from 0.001 so it stops rolling across the room. Write the final numbers into KP, KI, KD, KS and ANGLE_OFFSET at the top of the sketch.",
        ru: "Держите руку наготове, чтобы поймать робота. Отправьте i0, d0 и s0, затем поднимайте P (p60, p90, p120 …), пока робот не начнёт стоять несколько секунд, раскачиваясь вперёд-назад. Добавляйте D (d1, d2, d4 …), пока раскачка не превратится в спокойное стояние; слишком большой D даёт жужжание. Добавьте немного I (i1–i3), чтобы он исправлял постоянный крен. Наконец поднимайте s от 0.001, чтобы робот перестал уезжать через всю комнату. Впишите итоговые числа в KP, KI, KD, KS и ANGLE_OFFSET в начале скетча.",
        kk: "Роботты ұстап алуға қолыңызды дайын ұстаңыз. i0, d0 және s0 жіберіп, P-ны (p60, p90, p120 …) робот алға-артқа тербеліп бірнеше секунд тұра бастағанша арттырыңыз. Тербеліс тыныш тұрысқа айналғанша D-ны (d1, d2, d4 …) қосыңыз; D тым көп болса, ызыңдайды. Тұрақты қисаюды түзету үшін аздап I (i1–i3) қосыңыз. Соңында робот бөлменің ар жағына жылжып кетпеуі үшін s-ті 0.001-ден бастап арттырыңыз. Соңғы сандарды скетч басындағы KP, KI, KD, KS және ANGLE_OFFSET-ке жазыңыз.",
      },
      expect: { en: "It stands on its own for minutes and recovers from a light push.", ru: "Робот стоит сам минутами и восстанавливается после лёгкого толчка.", kk: "Робот бірнеше минут өзі тұрады және жеңіл итерістен кейін қалпына келеді." },
      mistake: { en: "Changing several gains at once: you can no longer tell which change helped. Change one number per test.", ru: "Менять несколько коэффициентов сразу: уже не понять, что помогло. Меняйте одно число за раз.", kk: "Бірнеше коэффициентті бірден өзгерту: не көмектескенін түсіну мүмкін болмайды. Бір сынақта бір санды өзгертіңіз." },
    },
  ],
  code: [{
    filename: "self_balancing.ino",
    language: "cpp",
    libraries: [],
    source: `// Self-balancing robot: MPU6050 + 2x A4988 + 2x NEMA 17 on Arduino Uno
// Live tuning over Serial (115200, line ending "Newline"):
//   p120  i2  d4  s0.002  o-1.5   -> KP, KI, KD, speed gain KS, ANGLE_OFFSET
#include <Wire.h>

const int DIR_L = 2, STEP_L = 3;   // left A4988
const int DIR_R = 4, STEP_R = 5;   // right A4988
const int EN_PIN = 8;              // both ENABLE pins: LOW = motors powered
const int MPU_ADDR = 0x68;         // GY-521 with AD0 low, on the hardware I2C bus (A4/A5)

float KP = 120.0;            // wheel steps/s per degree of tilt error
float KI = 2.0;              // steps/s per degree*second
float KD = 4.0;              // steps/s per degree/s of tilt rate
float KS = 0.002;            // degrees of lean per step/s of wheel speed (stops drifting)
float ANGLE_OFFSET = 0.0;    // the angle at which your robot truly balances
const float MAX_SPEED = 3000.0;    // steps/s at 1/8 microstep
const float FALL_ANGLE = 35.0;     // beyond this: fallen, motors off

volatile uint16_t periodL = 0, periodR = 0;   // 10 kHz ticks between steps, 0 = stopped
volatile uint16_t countL = 0, countR = 0;

float angle = 0, integral = 0, speed = 0, speedAvg = 0, gyroOffset = 0;
bool balancing = false;
unsigned long lastLoop = 0, lastPrint = 0;
char buf[16];
byte len = 0;

ISR(TIMER1_COMPA_vect) {           // step generator, runs 10 000 times a second
  if (periodL && ++countL >= periodL) { countL = 0; digitalWrite(STEP_L, HIGH); digitalWrite(STEP_L, LOW); }
  if (periodR && ++countR >= periodR) { countR = 0; digitalWrite(STEP_R, HIGH); digitalWrite(STEP_R, LOW); }
}

void setWheel(float sps, int dirPin, volatile uint16_t &period, bool mirrored) {
  digitalWrite(dirPin, (sps >= 0) != mirrored ? HIGH : LOW);
  float a = fabs(sps);
  uint16_t p = a < 10 ? 0 : (uint16_t)(10000.0 / a);
  noInterrupts(); period = p; interrupts();
}

void motorsOff() {
  setWheel(0, DIR_L, periodL, false);
  setWheel(0, DIR_R, periodR, true);
  digitalWrite(EN_PIN, HIGH);
}

void writeReg(byte reg, byte val) {
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(reg); Wire.write(val);
  Wire.endTransmission();
}

void readImu(int16_t &ax, int16_t &az, int16_t &gy) {
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B);                      // ACCEL_XOUT_H
  Wire.endTransmission(false);
  Wire.requestFrom((uint8_t)MPU_ADDR, (uint8_t)14);
  int16_t v[7];                          // AX AY AZ TEMP GX GY GZ
  for (int i = 0; i < 7; i++) {
    int hi = Wire.read();
    int lo = Wire.read();
    v[i] = (int16_t)((hi << 8) | lo);
  }
  ax = v[0]; az = v[2]; gy = v[5];
}

void applyTuning(char k, float v) {
  const char *name;
  switch (k) {
    case 'p': KP = v; name = "KP"; break;
    case 'i': KI = v; name = "KI"; break;
    case 'd': KD = v; name = "KD"; break;
    case 's': KS = v; name = "KS"; break;
    case 'o': ANGLE_OFFSET = v; name = "ANGLE_OFFSET"; break;
    default: return;
  }
  Serial.print("set "); Serial.print(name); Serial.print('='); Serial.println(v, 3);
}

void readTuning() {                      // non-blocking: collect a line, then parse it
  while (Serial.available()) {
    char c = Serial.read();
    if (c == '\\n' || c == '\\r') {
      buf[len] = 0;
      if (len > 1) applyTuning(buf[0], atof(buf + 1));
      len = 0;
    } else if (len < sizeof(buf) - 1) {
      buf[len++] = c;
    }
  }
}

void setup() {
  pinMode(DIR_L, OUTPUT); pinMode(STEP_L, OUTPUT);
  pinMode(DIR_R, OUTPUT); pinMode(STEP_R, OUTPUT);
  pinMode(EN_PIN, OUTPUT);
  digitalWrite(EN_PIN, HIGH);            // motors free until the robot is upright
  Serial.begin(115200);
  Wire.begin();
  Wire.setClock(400000);

  Wire.beginTransmission(MPU_ADDR);
  if (Wire.endTransmission() != 0) {
    Serial.println("MPU6050 not found, check SDA/SCL");
    while (true) {}
  }
  writeReg(0x6B, 0x00);                  // wake up
  writeReg(0x1A, 0x03);                  // digital low-pass filter ~44 Hz
  writeReg(0x1B, 0x00);                  // gyro +-250 deg/s = 131 LSB per deg/s
  writeReg(0x1C, 0x00);                  // accel +-2 g
  Serial.println("MPU6050 ok");

  Serial.println("calibrating gyro, keep still");
  long sum = 0;
  int16_t ax, az, gy;
  for (int i = 0; i < 500; i++) { readImu(ax, az, gy); sum += gy; delay(2); }
  gyroOffset = sum / 500.0;
  Serial.print("gyro offset "); Serial.println(gyroOffset, 1);

  readImu(ax, az, gy);
  angle = atan2(-(float)ax, (float)az) * RAD_TO_DEG;

  noInterrupts();                        // Timer1: CTC, prescaler 8, 16 MHz / 8 / 200 = 10 kHz
  TCCR1A = 0; TCCR1B = 0; TCNT1 = 0;
  OCR1A = 199;
  TCCR1B |= (1 << WGM12) | (1 << CS11);
  TIMSK1 |= (1 << OCIE1A);
  interrupts();

  Serial.println("hold upright to start");
  lastLoop = micros();
}

void loop() {
  readTuning();
  unsigned long now = micros();
  if (now - lastLoop < 5000) return;     // 200 Hz control loop
  float dt = (now - lastLoop) / 1e6;
  lastLoop = now;

  int16_t ax, az, gy;
  readImu(ax, az, gy);
  float rate = (gy - gyroOffset) / 131.0;                    // deg/s, + = tipping forward
  float accAngle = atan2(-(float)ax, (float)az) * RAD_TO_DEG;
  angle = 0.98 * (angle + rate * dt) + 0.02 * accAngle;      // complementary filter

  if (!balancing) {
    if (fabs(angle - ANGLE_OFFSET) < 3) {
      balancing = true; integral = 0; speed = 0; speedAvg = 0;
      digitalWrite(EN_PIN, LOW);
      Serial.println("upright, balancing");
    } else if (millis() - lastPrint > 500) {
      lastPrint = millis();
      Serial.print("waiting angle="); Serial.println(angle, 1);
    }
    return;
  }
  if (fabs(angle - ANGLE_OFFSET) > FALL_ANGLE) {
    balancing = false;
    motorsOff();
    Serial.println("fallen, motors off");
    return;
  }

  speedAvg = 0.95 * speedAvg + 0.05 * speed;
  float target = ANGLE_OFFSET - KS * speedAvg;   // lean back a little when rolling forward
  float err = angle - target;
  integral = constrain(integral + err * dt, -100, 100);
  speed = constrain(KP * err + KI * integral + KD * rate, -MAX_SPEED, MAX_SPEED);
  setWheel(speed, DIR_L, periodL, false);
  setWheel(speed, DIR_R, periodR, true);         // the right motor faces the other way

  if (millis() - lastPrint > 200) {
    lastPrint = millis();
    Serial.print("angle="); Serial.print(angle, 1);
    Serial.print(" target="); Serial.print(target, 1);
    Serial.print(" speed="); Serial.println((int)speed);
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The motors buzz but barely turn, or skip steps under load", ru: "Моторы гудят, но почти не крутятся, или пропускают шаги под нагрузкой", kk: "Моторлар ызыңдайды, бірақ әрең айналады немесе жүктемеде қадам өткізіп алады" },
      cause: { en: "Coil wires mixed between pairs, the current limit set too low, or the pack voltage too low.", ru: "Перепутаны провода обмоток, слишком низкий предел тока или низкое напряжение аккумуляторов.", kk: "Орама сымдары шатасқан, ток шегі тым төмен немесе аккумулятор кернеуі төмен." },
      fix: { en: "Re-check the coil pairs with a multimeter, set Vref for about 1.0 A and make sure VMOT is above 12 V.", ru: "Проверьте пары обмоток мультиметром, выставьте Vref примерно на 1,0 А и убедитесь, что на VMOT больше 12 В.", kk: "Орама жұптарын мультиметрмен қайта тексеріп, Vref-ті шамамен 1,0 А-ге қойыңыз және VMOT-та 12 В-тан көп екенін тексеріңіз." },
    },
    {
      symptom: { en: "It oscillates faster and faster and falls", ru: "Робот раскачивается всё сильнее и падает", kk: "Робот барған сайын қатты тербеліп, құлайды" },
      cause: { en: "KP is too high, KD too low, or a wheel turns the wrong way and amplifies the lean.", ru: "Слишком большой KP, слишком маленький KD, или колесо крутится не в ту сторону и усиливает наклон.", kk: "KP тым үлкен, KD тым кіші немесе доңғалақ теріс айналып, еңісті күшейтеді." },
      fix: { en: "Confirm both wheels drive toward the lean, then lower KP by 20 % and raise KD in small steps.", ru: "Убедитесь, что оба колеса едут в сторону наклона, затем уменьшите KP на 20 % и поднимайте KD небольшими шагами.", kk: "Екі доңғалақ та еңіс жаққа жүретініне көз жеткізіп, KP-ны 20 %-ға азайтыңыз да, KD-ны шағын қадаммен арттырыңыз." },
    },
    {
      symptom: { en: "It balances but rolls steadily in one direction", ru: "Балансирует, но постоянно уезжает в одну сторону", kk: "Тепе-теңдік сақтайды, бірақ үнемі бір жаққа жылжиды" },
      cause: { en: "ANGLE_OFFSET is not the true balance point, so the robot must keep driving to stay up.", ru: "ANGLE_OFFSET не совпадает с настоящей точкой равновесия, и роботу приходится ехать, чтобы не упасть.", kk: "ANGLE_OFFSET нақты тепе-теңдік нүктесі емес, сондықтан робот құламау үшін үнемі жүруге мәжбүр." },
      fix: { en: "Shift the offset by 0.5° against the drift (o-2.0 instead of o-1.5, for example) and raise s slightly.", ru: "Сдвиньте смещение на 0,5° против дрейфа (например, o-2.0 вместо o-1.5) и немного увеличьте s.", kk: "Жылжуға қарсы ығысуды 0,5°-қа өзгертіңіз (мысалы, o-1.5 орнына o-2.0) және s-ті сәл арттырыңыз." },
    },
    {
      symptom: { en: "\"MPU6050 not found\" or the angle jumps wildly", ru: "«MPU6050 not found» или угол дико скачет", kk: "«MPU6050 not found» немесе бұрыш ретсіз секіреді" },
      cause: { en: "SDA/SCL swapped, long I²C wires picking up stepper noise, or a loose sensor mount.", ru: "Перепутаны SDA/SCL, длинные провода I²C ловят помехи от шаговиков, или датчик плохо закреплён.", kk: "SDA/SCL ауысқан, ұзын I²C сымдары қадамдық моторлардың кедергісін ұстайды немесе датчик нашар бекітілген." },
      fix: { en: "SDA to A4, SCL to A5, keep the I²C wires short and away from the motor cables, and screw the GY-521 down firmly.", ru: "SDA на A4, SCL на A5, провода I²C короткие и подальше от кабелей моторов, GY-521 прикручен жёстко.", kk: "SDA A4-ке, SCL A5-ке, I²C сымдары қысқа әрі мотор кабельдерінен алыс болсын, GY-521 мықтап бұралсын." },
    },
  ],
  safety: [
    { en: "Never connect or disconnect a stepper while the A4988 is powered: the voltage spike destroys the driver.", ru: "Никогда не подключайте и не отключайте шаговый мотор при включённом A4988: выброс напряжения убивает драйвер.", kk: "A4988 қуат алып тұрғанда қадамдық моторды ешқашан қоспаңыз және ажыратпаңыз: кернеу секіруі драйверді істен шығарады." },
    { en: "The A4988 heatsinks and NEMA 17 bodies get hot enough to burn; touch them only after switching off.", ru: "Радиаторы A4988 и корпуса NEMA 17 нагреваются до ожога; трогайте их только после выключения.", kk: "A4988 радиаторлары мен NEMA 17 корпустары күйдіретіндей қызады; оларды тек өшіргеннен кейін ұстаңыз." },
    { en: "Charge both 2S packs separately with a balance charger, never unattended, and never connect them in parallel.", ru: "Заряжайте оба аккумулятора 2S по отдельности балансирным зарядником, не без присмотра, и никогда не соединяйте их параллельно.", kk: "Екі 2S аккумуляторын да баланстық зарядтағышпен бөлек, қараусыз қалдырмай зарядтаңыз және оларды ешқашан параллель жалғамаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: ["MPU6050 ok", "calibrating gyro, keep still", "gyro offset -41.6", "hold upright to start", "waiting angle=-24.7", "waiting angle=-8.2", "upright, balancing", "angle=1.8 target=0.0 speed=262", "angle=-0.6 target=-0.1 speed=-61", "set KP=140.000", "angle=0.2 target=0.0 speed=27", "fallen, motors off", "waiting angle=-38.5"],
    leds: [{ label: "PWR", color: "#7CB342" }, { label: "TX", color: "#F2C200" }],
  },
} satisfies GuideContent;
