import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "camera-slider-nema17",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "tools",
  robotics: false,
  difficulty: "advanced",
  hours: 6,
  costUsd: 45,
  xpReward: 400,
  title: {
    en: "Motorised Camera Slider (NEMA 17 + A4988)",
    ru: "Моторизованный слайдер для камеры (NEMA 17 + A4988)",
    kk: "Камераға арналған моторлы слайдер (NEMA 17 + A4988)",
  },
  summary: {
    en: "A NEMA 17 on an A4988 driver pulls a camera carriage along a belt from 0.1 to 25 mm/s. A knob sets the speed, two end-stops reverse it, and you set the motor current yourself with the Vref trimmer.",
    ru: "NEMA 17 на драйвере A4988 тянет каретку с камерой по ремню со скоростью 0,1–25 мм/с. Ручка задаёт скорость, два концевика разворачивают движение, а ток мотора вы выставляете сами подстроечником Vref.",
    kk: "A4988 драйверіндегі NEMA 17 камера кареткасын белдік бойымен 0,1–25 мм/с жылдамдықпен тартады. Тұтқа жылдамдықты орнатады, екі шеткі ажыратқыш бағытты өзгертеді, ал мотор тогын Vref бұрағышымен өзіңіз орнатасыз.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "a4988", qty: 1, spec: { en: "Pololu-style carrier with heatsink, note the sense-resistor marking", ru: "плата в формате Pololu с радиатором, запомните маркировку токовых резисторов", kk: "радиаторы бар Pololu пішімді плата, ток резисторларының таңбасын жазып алыңыз" }, role: { en: "Stepper driver", ru: "Драйвер шагового мотора", kk: "Қадамдық мотор драйвері" } },
    { component: "stepper-nema17", qty: 1, spec: { en: "17HS4401 or similar, 1.8°, ≤ 1.7 A, 4 wires", ru: "17HS4401 или аналог, 1,8°, ≤ 1,7 А, 4 провода", kk: "17HS4401 не ұқсасы, 1,8°, ≤ 1,7 А, 4 сым" }, role: { en: "Drives the belt", ru: "Тянет ремень", kk: "Белдікті тартады" } },
    { component: "battery-9v", qty: 1, spec: { en: "PP3 for portable runs; a 12 V 2 A adapter on the same terminals for long sessions", ru: "«Крона» для съёмок на выезде; адаптер 12 В 2 А на те же клеммы для долгой работы", kk: "сапарда түсіруге «Крона»; ұзақ жұмысқа сол клеммаларға 12 В 2 А адаптер" }, role: { en: "Motor supply (VMOT 8–35 V)", ru: "Питание мотора (VMOT 8–35 В)", kk: "Мотор қорегі (VMOT 8–35 В)" } },
    { component: "capacitor", qty: 1, spec: { en: "100 µF, ≥ 25 V electrolytic", ru: "100 мкФ, ≥ 25 В, электролит", kk: "100 мкФ, ≥ 25 В, электролит" }, role: { en: "Absorbs VMOT spikes", ru: "Гасит выбросы на VMOT", kk: "VMOT импульстарын басады" } },
    { component: "potentiometer", qty: 1, spec: { en: "10 kΩ linear", ru: "10 кОм, линейный", kk: "10 кОм, сызықтық" }, role: { en: "Speed knob", ru: "Ручка скорости", kk: "Жылдамдық тұтқасы" } },
    { component: "push-button", qty: 2, spec: { en: "tactile or lever micro-switch, normally open", ru: "тактовая кнопка или микропереключатель с рычагом, нормально разомкнутые", kk: "тактілі батырма немесе иінді микроажыратқыш, қалыпты ажыратулы" }, role: { en: "Left and right end-stops", ru: "Левый и правый концевики", kk: "Сол және оң шеткі ажыратқыштар" } },
    { component: "enclosure", qty: 1, spec: { en: "small box at the motor end of the rail", ru: "небольшая коробка у моторного конца рельса", kk: "рельстің мотор жағындағы шағын қорап" }, role: { en: "Electronics housing", ru: "Корпус электроники", kk: "Электроника корпусы" }, optional: true },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 24, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "drv", component: "a4988", label: "A4988" },
    { id: "mot", component: "stepper-nema17", label: "NEMA 17" },
    { id: "bat", component: "battery-9v", label: "Motor supply 9–12 V" },
    { id: "c1", component: "capacitor", label: "100 µF" },
    { id: "pot", component: "potentiometer", label: "Speed" },
    { id: "btn_l", component: "push-button", label: "End-stop left" },
    { id: "btn_r", component: "push-button", label: "End-stop right" },
  ],
  connections: [
    { from: "board.D3", to: "drv.STEP", color: "yellow" },
    { from: "board.D4", to: "drv.DIR", color: "green" },
    { from: "board.D8", to: "drv.ENABLE", color: "purple", note: { en: "LOW = driver on; the sketch frees the motor when paused", ru: "LOW = драйвер включён; на паузе скетч отпускает мотор", kk: "LOW = драйвер қосулы; кідірісте скетч моторды босатады" } },
    { from: "board.5V", to: "drv.VDD", color: "red", note: { en: "logic supply only", ru: "только питание логики", kk: "тек логика қорегі" } },
    { from: "drv.GND2", to: "board.GND", color: "black" },
    { from: "board.5V", to: "drv.MS1", color: "red", note: { en: "MS1–MS3 HIGH = 1/16 microstep", ru: "MS1–MS3 в HIGH = микрошаг 1/16", kk: "MS1–MS3 HIGH = 1/16 микроқадам" } },
    { from: "drv.MS1", to: "drv.MS2", color: "red" },
    { from: "drv.MS2", to: "drv.MS3", color: "red" },
    { from: "drv.RESET", to: "drv.SLEEP", color: "gray", note: { en: "short jumper keeps the driver awake", ru: "короткая перемычка держит драйвер активным", kk: "қысқа секіргіш драйверді белсенді ұстайды" } },
    { from: "bat.+", to: "drv.VMOT", color: "red", note: { en: "motor power never touches the Arduino", ru: "питание мотора не касается Arduino", kk: "мотор қорегі Arduino-ға тимейді" } },
    { from: "bat.-", to: "drv.GND", color: "black" },
    { from: "c1.A", to: "drv.VMOT", color: "red", note: { en: "long leg (+) to VMOT, right at the driver", ru: "длинная ножка (+) к VMOT, вплотную к драйверу", kk: "ұзын аяқ (+) VMOT-қа, драйверге тақап" } },
    { from: "c1.B", to: "drv.GND", color: "black" },
    { from: "drv.1A", to: "mot.A+", color: "blue", note: { en: "1A/1B = one coil pair, 2A/2B = the other", ru: "1A/1B — одна обмотка, 2A/2B — другая", kk: "1A/1B — бір орама, 2A/2B — екіншісі" } },
    { from: "drv.1B", to: "mot.A-", color: "blue" },
    { from: "drv.2A", to: "mot.B+", color: "orange" },
    { from: "drv.2B", to: "mot.B-", color: "orange" },
    { from: "pot.1", to: "board.5V", color: "red" },
    { from: "pot.W", to: "board.A0", color: "white" },
    { from: "pot.2", to: "board.GND2", color: "black" },
    { from: "board.D9", to: "btn_l.1", color: "cyan", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажато = LOW", kk: "ішкі тарту, басылғанда = LOW" } },
    { from: "btn_l.2", to: "board.GND3", color: "black" },
    { from: "board.D10", to: "btn_r.1", color: "pink" },
    { from: "btn_r.2", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Build the rail and mount the end-stops", ru: "Соберите рельс и поставьте концевики", kk: "Рельсті құрастырып, шеткі ажыратқыштарды орнатыңыз" },
      body: {
        en: "Use a 50–60 cm rail (2020 extrusion with V-wheels or two 8 mm rods with bearings) and a carriage with a ball head for the camera. Mount the NEMA 17 at one end with a 20-tooth GT2 pulley, an idler at the other end, and clamp a GT2 belt to the carriage. Fix one end-stop near each end so the carriage presses it about 1 cm before it would hit anything.",
        ru: "Возьмите рельс 50–60 см (профиль 2020 с V-роликами или два 8-мм вала с подшипниками) и каретку с шаровой головкой для камеры. На одном конце закрепите NEMA 17 со шкивом GT2 на 20 зубьев, на другом — обводной ролик, ремень GT2 зажмите на каретке. У каждого конца поставьте концевик так, чтобы каретка нажимала его примерно за 1 см до упора.",
        kk: "50–60 см рельс (V-дөңгелекті 2020 профилі немесе мойынтіректері бар екі 8 мм білік) және камераға арналған шар басы бар каретка алыңыз. Бір шетіне 20 тісті GT2 шкивімен NEMA 17-ні, екінші шетіне айналма роликті бекітіп, GT2 белдігін кареткаға қысыңыз. Каретка тірелуге шамамен 1 см қалғанда басатындай етіп, әр шетке бір шеткі ажыратқыш орнатыңыз.",
      },
      expect: { en: "Pushed by hand, the carriage glides end to end and clicks each switch before the hard stop.", ru: "Рукой каретка плавно ходит от края до края и щёлкает каждым концевиком до жёсткого упора.", kk: "Қолмен итергенде каретка шеттен шетке біркелкі жүріп, қатты тірекке дейін әр ажыратқышты шертеді." },
      mistake: { en: "A slack belt makes the video jerky at slow speeds; tension it until it twangs.", ru: "Провисший ремень даёт рывки на медленной скорости; натяните его до звона.", kk: "Салбыраған белдік баяу жылдамдықта бейнені секіртеді; оны шыңылдағанша тартыңыз." },
    },
    {
      title: { en: "Wire the A4988 logic side", ru: "Подключите логическую сторону A4988", kk: "A4988-дің логика жағын қосыңыз" },
      body: {
        en: "Put the A4988 on the breadboard with the trimmer facing up. Connect VDD to 5V and the GND next to it to Arduino GND. STEP goes to D3, DIR to D4, ENABLE to D8. Tie MS1, MS2 and MS3 to 5V for 1/16 microstepping, the smoothest mode for video. Bridge RESET to SLEEP with a short jumper.",
        ru: "Поставьте A4988 на макетку подстроечником вверх. VDD подключите к 5V, соседний GND — к GND Arduino. STEP идёт на D3, DIR на D4, ENABLE на D8. MS1, MS2 и MS3 соедините с 5V для микрошага 1/16 — самого плавного режима для видео. RESET и SLEEP соедините короткой перемычкой.",
        kk: "A4988-ді бұрағышын жоғары қаратып макет тақтасына қойыңыз. VDD-ні 5V-қа, оның жанындағы GND-ді Arduino GND-іне қосыңыз. STEP D3-ке, DIR D4-ке, ENABLE D8-ге барады. Бейне үшін ең біркелкі режим — 1/16 микроқадам үшін MS1, MS2 және MS3-ті 5V-қа қосыңыз. RESET пен SLEEP-ті қысқа секіргішпен жалғаңыз.",
      },
      expect: { en: "Logic side complete: VDD, GND, STEP, DIR, ENABLE, MS1–MS3 and the RESET–SLEEP bridge.", ru: "Логика готова: VDD, GND, STEP, DIR, ENABLE, MS1–MS3 и перемычка RESET–SLEEP.", kk: "Логика дайын: VDD, GND, STEP, DIR, ENABLE, MS1–MS3 және RESET–SLEEP секіргіші." },
      mistake: { en: "Leaving RESET floating: the driver randomly ignores STEP pulses.", ru: "Если RESET висит в воздухе, драйвер случайно игнорирует импульсы STEP.", kk: "RESET бос тұрса, драйвер STEP импульстарын кездейсоқ елемейді." },
    },
    {
      title: { en: "Add motor power and the capacitor", ru: "Подключите питание мотора и конденсатор", kk: "Мотор қорегі мен конденсаторды қосыңыз" },
      body: {
        en: "Place the 100 µF capacitor right next to VMOT: long leg (+) to VMOT, striped leg (−) to the GND beside it. Then connect the 9 V battery: + to VMOT, − to that GND. The A4988 needs at least 8 V on VMOT. A PP3 runs a light camera for an hour or two at the 0.6 A limit below; for long timelapses use a 12 V 2 A adapter on the same two terminals.",
        ru: "Поставьте конденсатор 100 мкФ вплотную к VMOT: длинная ножка (+) к VMOT, ножка с полосой (−) к соседнему GND. Затем подключите батарею 9 В: плюс к VMOT, минус к этому GND. A4988 нужно минимум 8 В на VMOT. «Крона» тянет лёгкую камеру час-два при токе 0,6 А, выставленном ниже; для долгих таймлапсов подключите к тем же двум клеммам адаптер 12 В 2 А.",
        kk: "100 мкФ конденсаторды VMOT-қа тақап қойыңыз: ұзын аяғы (+) VMOT-қа, жолақты аяғы (−) оның жанындағы GND-ге. Содан кейін 9 В батареяны қосыңыз: плюсін VMOT-қа, минусын сол GND-ге. A4988-ге VMOT-та кемінде 8 В қажет. Төменде орнатылатын 0,6 А токта «Крона» жеңіл камераны бір-екі сағат тартады; ұзақ таймлапс үшін сол екі клеммаға 12 В 2 А адаптер қосыңыз.",
      },
      expect: { en: "VMOT has the capacitor and the battery; nothing from the 9 V side goes to the Arduino 5V.", ru: "На VMOT конденсатор и батарея; ничего со стороны 9 В не идёт на 5V Arduino.", kk: "VMOT-та конденсатор мен батарея тұр; 9 В жағынан Arduino 5V-қа ештеңе бармайды." },
      mistake: { en: "Without the capacitor, the inductive spikes on VMOT can exceed the driver's rating and kill it on the first power-up.", ru: "Без конденсатора индуктивные выбросы на VMOT могут превысить допустимое для драйвера и убить его при первом включении.", kk: "Конденсатор болмаса, VMOT-тағы индуктивті импульстар драйвердің шегінен асып, оны алғашқы қосқанда-ақ істен шығаруы мүмкін." },
    },
    {
      title: { en: "Find the coil pairs and connect the motor", ru: "Найдите обмотки и подключите мотор", kk: "Орамаларды тауып, моторды қосыңыз" },
      body: {
        en: "With everything unpowered, measure resistance between the four motor wires: two wires showing 1.5–3 Ω are one coil, the other two are the second coil; between coils there is no connection. Connect coil A to 1A and 1B, coil B to 2A and 2B. If the slider later runs the wrong way, swap the two wires of one coil.",
        ru: "При полностью обесточенной схеме измерьте сопротивление между четырьмя проводами мотора: два провода с 1,5–3 Ом — одна обмотка, два других — вторая; между обмотками связи нет. Обмотку A подключите к 1A и 1B, обмотку B — к 2A и 2B. Если потом слайдер поедет не туда, поменяйте местами два провода одной обмотки.",
        kk: "Схеманың қуаты толық ажыратылған кезде мотордың төрт сымының арасындағы кедергіні өлшеңіз: 1,5–3 Ом көрсететін екі сым — бір орама, қалған екеуі — екінші орама; орамалар арасында байланыс жоқ. A орамасын 1A мен 1B-ге, B орамасын 2A мен 2B-ге қосыңыз. Кейін слайдер басқа жаққа жүрсе, бір ораманың екі сымын ауыстырыңыз.",
      },
      expect: { en: "Two pairs identified with the meter, each pair on its own driver outputs.", ru: "Мультиметром найдены две пары, каждая на своих выходах драйвера.", kk: "Мультиметрмен екі жұп табылды, әрқайсысы драйвердің өз шығыстарында." },
      mistake: { en: "Mixing wires from both coils on 1A/1B: the motor only shudders back and forth.", ru: "Если на 1A/1B попали провода разных обмоток, мотор только дёргается туда-сюда.", kk: "1A/1B-ге әр түрлі орамалардың сымдары түссе, мотор тек ары-бері селкілдейді." },
    },
    {
      title: { en: "Set the current limit with Vref", ru: "Выставьте ток через Vref", kk: "Vref арқылы токты орнатыңыз" },
      body: {
        en: "Read the small sense resistors next to the chip. Current limit = Vref ÷ (8 × R). With R100 (0.1 Ω): Vref = 0.8 × I; with R068 (0.068 Ω): Vref = 0.544 × I. A camera slider needs about 0.6 A, so aim for 0.48 V (R100) or 0.33 V (R068). Plug in USB and the battery, put the meter's black probe on GND and the red probe on the trimmer's metal top, and turn it with a plastic or ceramic screwdriver in small steps.",
        ru: "Прочитайте маркировку маленьких токовых резисторов рядом с микросхемой. Ток = Vref ÷ (8 × R). С R100 (0,1 Ом): Vref = 0,8 × I; с R068 (0,068 Ом): Vref = 0,544 × I. Слайдеру хватает около 0,6 А, значит цель — 0,48 В (R100) или 0,33 В (R068). Подключите USB и батарею, чёрный щуп мультиметра на GND, красный — на металлическую шляпку подстроечника, и вращайте его пластиковой или керамической отвёрткой маленькими шагами.",
        kk: "Микросхема жанындағы кішкене ток резисторларының таңбасын оқыңыз. Ток = Vref ÷ (8 × R). R100 (0,1 Ом) болса: Vref = 0,8 × I; R068 (0,068 Ом) болса: Vref = 0,544 × I. Слайдерге шамамен 0,6 А жеткілікті, демек мақсат — 0,48 В (R100) немесе 0,33 В (R068). USB мен батареяны қосып, мультиметрдің қара щупын GND-ге, қызылын бұрағыштың металл басына қойыңыз да, оны пластик немесе керамика бұрауышпен кішкене қадамдармен бұраңыз.",
      },
      expect: { en: "The meter shows your target Vref ±0.02 V, and the motor stays only warm after 10 minutes of running.", ru: "Мультиметр показывает целевой Vref ±0,02 В, а мотор после 10 минут работы лишь тёплый.", kk: "Мультиметр мақсатты Vref ±0,02 В көрсетеді, ал мотор 10 минут жұмыстан кейін тек жылы болады." },
      mistake: { en: "A metal screwdriver that slips onto the neighbouring pins can short the driver; use a plastic one or a probe with a clip.", ru: "Металлическая отвёртка, соскочившая на соседние ножки, может закоротить драйвер; берите пластиковую или щуп с зажимом.", kk: "Көрші аяқтарға тайып кеткен металл бұрауыш драйверді тұйықтауы мүмкін; пластик бұрауыш немесе қысқышы бар щуп қолданыңыз." },
    },
    {
      title: { en: "Wire the knob and the end-stops", ru: "Подключите ручку и концевики", kk: "Тұтқа мен шеткі ажыратқыштарды қосыңыз" },
      body: {
        en: "Potentiometer: outer legs to 5V and GND, middle leg to A0. Left end-stop between D9 and GND, right end-stop between D10 and GND, both on their normally-open contacts. The sketch enables the internal pull-ups, so a pressed switch reads LOW.",
        ru: "Потенциометр: крайние ножки на 5V и GND, средняя на A0. Левый концевик между D9 и GND, правый — между D10 и GND, оба на нормально разомкнутых контактах. Скетч включает внутренние подтяжки, поэтому нажатый концевик читается как LOW.",
        kk: "Потенциометр: шеткі аяқтары 5V мен GND-ге, ортаңғысы A0-ге. Сол жақ шеткі ажыратқыш D9 бен GND арасында, оң жақ — D10 мен GND арасында, екеуі де қалыпты ажыратулы түйіспелерде. Скетч ішкі тартуларды қосады, сондықтан басылған ажыратқыш LOW болып оқылады.",
      },
      expect: { en: "Each switch is a simple two-wire loop to GND.", ru: "Каждый концевик — простая петля из двух проводов на GND.", kk: "Әр ажыратқыш — GND-ге баратын екі сымды қарапайым тізбек." },
      mistake: { en: "Using the NC contact of a lever switch: the slider thinks it is always at the end and only shakes.", ru: "Если взять контакт NC микропереключателя, слайдер решит, что он всегда на краю, и будет только дёргаться.", kk: "Микроажыратқыштың NC түйіспесін алсаңыз, слайдер әрдайым шетте тұрмын деп ойлап, тек селкілдейді." },
    },
    {
      title: { en: "Upload and run", ru: "Загрузите скетч и запустите", kk: "Скетчті жүктеп, іске қосыңыз" },
      body: {
        en: "Install AccelStepper, turn the knob fully down, upload and open the Serial Monitor at 9600 baud. Slowly turn the knob up: the driver switches on and the carriage moves right. At an end-stop it waits 1 s and reverses. The knob is squared, so the first half covers 0.1–6 mm/s for timelapses and the top end reaches 25 mm/s. Knob at zero switches the driver off to save the battery.",
        ru: "Установите AccelStepper, выкрутите ручку в ноль, загрузите скетч и откройте Serial Monitor на 9600 бод. Медленно поворачивайте ручку: драйвер включится, и каретка поедет вправо. На концевике она ждёт 1 с и едет обратно. Шкала ручки квадратичная: первая половина даёт 0,1–6 мм/с для таймлапсов, а в конце достигает 25 мм/с. Ручка в нуле выключает драйвер и бережёт батарею.",
        kk: "AccelStepper-ді орнатып, тұтқаны нөлге бұраңыз, скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Тұтқаны баяу бұраңыз: драйвер қосылып, каретка оңға жүреді. Шеткі ажыратқышта ол 1 с күтіп, кері жүреді. Тұтқа шкаласы квадраттық: бірінші жартысы таймлапсқа арналған 0,1–6 мм/с береді, ал соңында 25 мм/с-қа жетеді. Тұтқа нөлде болса, драйвер өшіп, батарея үнемделеді.",
      },
      expect: { en: "Smooth, silent motion; Serial prints the speed and \"end stop right -> reverse\" at each end.", ru: "Плавное тихое движение; Serial печатает скорость и «end stop right -> reverse» на каждом краю.", kk: "Біркелкі әрі тыныш қозғалыс; Serial жылдамдықты және әр шетте «end stop right -> reverse» деп шығарады." },
      mistake: { en: "Pressing an end-stop by hand while testing is fine, but never stall the carriage with the driver on: the belt can jump teeth.", ru: "Нажимать концевик рукой при тесте можно, но не останавливайте каретку силой при включённом драйвере: ремень может перескочить зубья.", kk: "Тексергенде шеткі ажыратқышты қолмен басуға болады, бірақ драйвер қосулы кезде каретканы күшпен тоқтатпаңыз: белдік тістерден секіріп кетуі мүмкін." },
    },
  ],
  code: [{
    filename: "camera_slider.ino",
    language: "cpp",
    libraries: ["AccelStepper"],
    source: `#include <AccelStepper.h>

const int STEP_PIN = 3;
const int DIR_PIN = 4;
const int ENABLE_PIN = 8;        // A4988 EN, LOW = driver on
const int END_LEFT_PIN = 9;      // end-stop to GND
const int END_RIGHT_PIN = 10;    // end-stop to GND
const int POT_PIN = A0;          // speed knob

const float STEPS_PER_MM = 80.0; // 200 steps x 16 microsteps / 40 mm (GT2, 20 teeth)
const float MAX_MM_S = 25.0;
const float MIN_MM_S = 0.1;      // below this the slider pauses
const unsigned long END_PAUSE_MS = 1000;

AccelStepper slider(AccelStepper::DRIVER, STEP_PIN, DIR_PIN);

int heading = 1;                 // +1 = towards the right end, -1 = left
float mmPerSec = 0;
bool driverOn = false;
unsigned long lastKnob = 0;

void applySpeed() {
  slider.setSpeed(heading * mmPerSec * STEPS_PER_MM);
}

void setDriver(bool on) {
  if (on == driverOn) return;
  driverOn = on;
  if (on) slider.enableOutputs();
  else slider.disableOutputs();
  Serial.println(on ? "driver on" : "driver off (paused)");
}

bool pressed(int pin) {
  return digitalRead(pin) == LOW;
}

void reverseAt(const char* side) {
  Serial.print("end stop ");
  Serial.print(side);
  Serial.println(" -> reverse");
  heading = -heading;
  applySpeed();
  delay(END_PAUSE_MS);
}

void setup() {
  Serial.begin(9600);
  pinMode(END_LEFT_PIN, INPUT_PULLUP);
  pinMode(END_RIGHT_PIN, INPUT_PULLUP);
  slider.setEnablePin(ENABLE_PIN);
  slider.setPinsInverted(false, false, true);   // EN is active LOW
  slider.setMaxSpeed(MAX_MM_S * STEPS_PER_MM);
  slider.disableOutputs();
  Serial.println("Camera slider ready");
}

void loop() {
  // read the knob 20 times per second; squared curve = fine control at slow speeds
  if (millis() - lastKnob >= 50) {
    lastKnob = millis();
    float k = analogRead(POT_PIN) / 1023.0;
    float s = MAX_MM_S * k * k;
    if (fabs(s - mmPerSec) > 0.02 + mmPerSec * 0.05) {
      mmPerSec = s < MIN_MM_S ? 0 : s;
      applySpeed();
      Serial.print("speed ");
      Serial.print(mmPerSec, 2);
      Serial.println(" mm/s");
    }
    setDriver(mmPerSec >= MIN_MM_S);
  }

  if (!driverOn) return;

  if (heading > 0 && pressed(END_RIGHT_PIN)) reverseAt("right");
  else if (heading < 0 && pressed(END_LEFT_PIN)) reverseAt("left");

  slider.runSpeed();   // one microstep whenever it is due
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The motor buzzes and shakes but the carriage does not move", ru: "Мотор гудит и дрожит, но каретка не едет", kk: "Мотор гуілдеп, дірілдейді, бірақ каретка жүрмейді" },
      cause: { en: "The coil pairs are mixed between 1A/1B and 2A/2B, or Vref is far too low.", ru: "Обмотки перепутаны между 1A/1B и 2A/2B, или Vref слишком низкий.", kk: "Орамалар 1A/1B мен 2A/2B арасында ауысқан немесе Vref тым төмен." },
      fix: { en: "Power off, re-measure the pairs with the meter, then raise Vref in 0.05 V steps up to the target.", ru: "Выключите питание, заново найдите пары мультиметром, затем поднимайте Vref шагами по 0,05 В до цели.", kk: "Қуатты өшіріп, жұптарды мультиметрмен қайта табыңыз, содан кейін Vref-ті 0,05 В-тан мақсатқа дейін көтеріңіз." },
    },
    {
      symptom: { en: "The driver gets very hot or the motor stops for a moment", ru: "Драйвер сильно греется или мотор на миг останавливается", kk: "Драйвер қатты қызады немесе мотор бір сәтке тоқтайды" },
      cause: { en: "Vref is set too high and the chip hits its thermal shutdown.", ru: "Vref слишком высокий, и микросхема уходит в тепловую защиту.", kk: "Vref тым жоғары, ал микросхема жылулық қорғанысқа өтеді." },
      fix: { en: "Lower Vref to the 0.6 A value for your sense resistors and fit the heatsink.", ru: "Снизьте Vref до значения для 0,6 А под ваши токовые резисторы и поставьте радиатор.", kk: "Vref-ті ток резисторларыңызға сай 0,6 А мәніне дейін төмендетіп, радиатор орнатыңыз." },
    },
    {
      symptom: { en: "The carriage hits the end without reversing", ru: "Каретка врезается в край и не разворачивается", kk: "Каретка шетке соғылып, кері бұрылмайды" },
      cause: { en: "The switch is not reached by the carriage, is wired to NC, or sits on the wrong pin for that side.", ru: "Каретка не достаёт до концевика, он подключён к NC или стоит не на том пине для своей стороны.", kk: "Каретка ажыратқышқа жетпейді, ол NC-ге қосылған немесе өз жағына арналмаған пинде тұр." },
      fix: { en: "Move the switch in, use the NO contact, and check that the right-hand switch is on D10 and the left-hand one on D9.", ru: "Сдвиньте концевик ближе, используйте контакт NO и проверьте, что правый концевик на D10, а левый на D9.", kk: "Ажыратқышты жақындатып, NO түйіспесін қолданыңыз және оң жақтағысы D10-да, сол жақтағысы D9-да екенін тексеріңіз." },
    },
    {
      symptom: { en: "It skips steps at high speed or after a while on the battery", ru: "На высокой скорости или после работы от батареи пропускает шаги", kk: "Жоғары жылдамдықта немесе батареямен біраз жұмыстан кейін қадамдарды өткізіп жібереді" },
      cause: { en: "The 9 V battery is sagging towards the A4988's 8 V minimum, or the load is too heavy for 0.6 A.", ru: "Батарея 9 В проседает к минимальным для A4988 8 В, или нагрузка слишком тяжёлая для 0,6 А.", kk: "9 В батарея A4988-дің ең аз 8 В шегіне дейін түседі немесе жүк 0,6 А үшін тым ауыр." },
      fix: { en: "Switch to a 12 V 2 A adapter, lower MAX_MM_S, or raise Vref a little (keep it under the motor's rated current).", ru: "Перейдите на адаптер 12 В 2 А, уменьшите MAX_MM_S или немного поднимите Vref (не выше номинального тока мотора).", kk: "12 В 2 А адаптерге ауысыңыз, MAX_MM_S-ты азайтыңыз немесе Vref-ті сәл көтеріңіз (мотордың номиналды тогынан аспасын)." },
    },
  ],
  safety: [
    { en: "Never connect or disconnect the motor while VMOT is powered: the voltage spike destroys the A4988 instantly.", ru: "Никогда не подключайте и не отключайте мотор при поданном VMOT: выброс напряжения мгновенно убивает A4988.", kk: "VMOT-қа қуат берілген кезде моторды ешқашан қоспаңыз және ажыратпаңыз: кернеу импульсі A4988-ді бірден істен шығарады." },
    { en: "Check the capacitor polarity before the first power-up; a reversed electrolytic can burst.", ru: "Перед первым включением проверьте полярность конденсатора: перевёрнутый электролит может взорваться.", kk: "Алғаш қоспас бұрын конденсатордың полярлығын тексеріңіз: кері қойылған электролит жарылып кетуі мүмкін." },
    { en: "The driver heatsink and the motor can exceed 60 °C at higher currents; do not touch them while running.", ru: "Радиатор драйвера и мотор при больших токах нагреваются выше 60 °C; не трогайте их во время работы.", kk: "Үлкен токта драйвер радиаторы мен мотор 60 °C-тан асып қызуы мүмкін; жұмыс кезінде оларды ұстамаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "Camera slider ready",
      "speed 0.40 mm/s",
      "driver on",
      "speed 2.50 mm/s",
      "end stop right -> reverse",
      "end stop left -> reverse",
      "speed 12.10 mm/s",
      "end stop right -> reverse",
      "speed 0.00 mm/s",
      "driver off (paused)",
    ],
    leds: [],
  },
} satisfies GuideContent;
