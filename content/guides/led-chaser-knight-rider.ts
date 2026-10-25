import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "led-chaser-knight-rider",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "displays",
  robotics: false,
  difficulty: "beginner",
  hours: 1,
  costUsd: 8,
  xpReward: 110,
  title: {
    en: "Knight Rider LED Chaser",
    ru: "Бегущие огни Knight Rider",
    kk: "Knight Rider жүгірме оттары",
  },
  summary: {
    en: "Six LEDs sweep back and forth like the scanner on KITT, and a potentiometer sets the speed from lazy to frantic without blocking the loop.",
    ru: "Шесть светодиодов бегают туда-обратно, как сканер KITT, а потенциометр задаёт скорость от ленивой до бешеной, не блокируя цикл.",
    kk: "Алты жарық диоды KITT сканері сияқты әрлі-берлі жүгіреді, ал потенциометр циклды тоқтатпай жылдамдықты баяудан өте жылдамға дейін өзгертеді.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "led", qty: 6, spec: { en: "5 mm, red (one colour looks best)", ru: "5 мм, красные (один цвет смотрится лучше)", kk: "5 мм, қызыл (бір түс әдемірек көрінеді)" }, role: { en: "Scanner lights", ru: "Огни сканера", kk: "Сканер оттары" } },
    { component: "resistor", qty: 6, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиодов", kk: "Жарық диодтарының тогын шектеу" } },
    { component: "potentiometer", qty: 1, spec: { en: "10 kΩ linear, breadboard pins", ru: "10 кОм линейный, с ножками под макетку", kk: "10 кОм сызықтық, макетке арналған аяқтары бар" }, role: { en: "Speed knob", ru: "Регулятор скорости", kk: "Жылдамдық реттегіші" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 12, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "r1", component: "resistor", label: "220 Ω" },
    { id: "r2", component: "resistor", label: "220 Ω" },
    { id: "r3", component: "resistor", label: "220 Ω" },
    { id: "r4", component: "resistor", label: "220 Ω" },
    { id: "r5", component: "resistor", label: "220 Ω" },
    { id: "r6", component: "resistor", label: "220 Ω" },
    { id: "led1", component: "led", label: "LED 1" },
    { id: "led2", component: "led", label: "LED 2" },
    { id: "led3", component: "led", label: "LED 3" },
    { id: "led4", component: "led", label: "LED 4" },
    { id: "led5", component: "led", label: "LED 5" },
    { id: "led6", component: "led", label: "LED 6" },
    { id: "pot", component: "potentiometer", label: "Speed" },
  ],
  connections: [
    { from: "board.D2", to: "r1.A", color: "orange" },
    { from: "r1.B", to: "led1.A", color: "orange", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led1.K", to: "board.GND", color: "black" },
    { from: "board.D3", to: "r2.A", color: "orange" },
    { from: "r2.B", to: "led2.A", color: "orange" },
    { from: "led2.K", to: "board.GND", color: "black" },
    { from: "board.D4", to: "r3.A", color: "orange" },
    { from: "r3.B", to: "led3.A", color: "orange" },
    { from: "led3.K", to: "board.GND", color: "black" },
    { from: "board.D5", to: "r4.A", color: "orange" },
    { from: "r4.B", to: "led4.A", color: "orange" },
    { from: "led4.K", to: "board.GND", color: "black" },
    { from: "board.D6", to: "r5.A", color: "orange" },
    { from: "r5.B", to: "led5.A", color: "orange" },
    { from: "led5.K", to: "board.GND", color: "black" },
    { from: "board.D7", to: "r6.A", color: "orange" },
    { from: "r6.B", to: "led6.A", color: "orange" },
    { from: "led6.K", to: "board.GND", color: "black" },
    { from: "pot.1", to: "board.5V", color: "red", note: { en: "outer leg", ru: "крайняя ножка", kk: "шеткі аяқ" } },
    { from: "pot.W", to: "board.A0", color: "yellow", note: { en: "middle leg (wiper)", ru: "средняя ножка (движок)", kk: "ортаңғы аяқ (жүгірткі)" } },
    { from: "pot.2", to: "board.GND2", color: "black", note: { en: "other outer leg", ru: "другая крайняя ножка", kk: "екінші шеткі аяқ" } },
  ],
  steps: [
    {
      title: { en: "Line up the six LEDs", ru: "Выставьте шесть светодиодов в ряд", kk: "Алты жарық диодын қатарға қойыңыз" },
      body: {
        en: "Push the six LEDs into the breadboard in one straight row, about two holes apart, all with the long leg (anode) towards the top. Bend every short leg (cathode) into the blue GND rail. A straight, evenly spaced row is what makes the sweep look smooth.",
        ru: "Вставьте шесть светодиодов в макетку в один ровный ряд, примерно через два отверстия, длинной ножкой (анод) вверх. Каждую короткую ножку (катод) заведите в синюю шину GND. Ровный ряд с одинаковым шагом делает бег огней плавным.",
        kk: "Алты жарық диодын макет тақтасына бір түзу қатармен, шамамен екі тесік аралықпен, ұзын аяғын (анод) жоғары қаратып орнатыңыз. Әр қысқа аяқты (катод) көк GND шинасына енгізіңіз. Түзу әрі бірдей аралықты қатар оттардың жүгіруін біркелкі етеді.",
      },
      expect: { en: "Six LEDs in a row, every cathode in the GND rail.", ru: "Шесть светодиодов в ряд, все катоды в шине GND.", kk: "Қатарда алты жарық диоды, барлық катодтар GND шинасында." },
      mistake: { en: "One LED turned round stays dark and leaves a gap in the sweep.", ru: "Один перевёрнутый светодиод не горит, и в бегущих огнях появляется дырка.", kk: "Бір кері қойылған жарық диоды жанбайды да, жүгірме оттарда бос орын қалады." },
    },
    {
      title: { en: "Add a resistor to every LED", ru: "Добавьте резистор каждому светодиоду", kk: "Әр жарық диодына резистор қосыңыз" },
      body: {
        en: "Put one 220 Ω resistor from each anode row to its own free row. With a red LED (about 2 V) each one draws roughly (5 − 2) / 220 ≈ 14 mA, safely under the 20 mA a Uno pin should supply.",
        ru: "Поставьте по резистору 220 Ом от ряда каждого анода в свой свободный ряд. С красным светодиодом (около 2 В) ток получается примерно (5 − 2) / 220 ≈ 14 мА, это безопасно меньше 20 мА, которые стоит брать с пина Uno.",
        kk: "Әр анод қатарынан өз бос қатарына бір-бір 220 Ом резистор қойыңыз. Қызыл жарық диодымен (шамамен 2 В) ток шамамен (5 − 2) / 220 ≈ 14 мА болады, бұл Uno пинінен алуға болатын 20 мА-ден қауіпсіз төмен.",
      },
      expect: { en: "Six resistors, each touching exactly one anode.", ru: "Шесть резисторов, каждый касается ровно одного анода.", kk: "Алты резистор, әрқайсысы дәл бір анодқа жалғанған." },
      mistake: { en: "Sharing one resistor between all LEDs makes them dim and uneven.", ru: "Один резистор на все светодиоды делает их тусклыми и неравномерными.", kk: "Барлық жарық диодтарына бір резистор қойсаңыз, олар күңгірт әрі әртүрлі жанады." },
    },
    {
      title: { en: "Wire D2–D7 in order", ru: "Подключите D2–D7 по порядку", kk: "D2–D7 пиндерін ретімен қосыңыз" },
      body: {
        en: "Run wires from Arduino D2, D3, D4, D5, D6 and D7 to the free ends of the resistors, left to right. Then connect the breadboard GND rail to the Arduino GND pin. The sketch walks the pins in the same order as the LED_PINS array, so the order of the wires is the order of the lights.",
        ru: "Проведите провода от D2, D3, D4, D5, D6 и D7 Arduino к свободным концам резисторов слева направо. Затем соедините шину GND макетки с пином GND Arduino. Скетч перебирает пины в порядке массива LED_PINS, поэтому порядок проводов и есть порядок огней.",
        kk: "Arduino-ның D2, D3, D4, D5, D6 және D7 пиндерінен резисторлардың бос ұштарына солдан оңға қарай сымдар тартыңыз. Содан кейін макет тақтасының GND шинасын Arduino GND пиніне қосыңыз. Скетч пиндерді LED_PINS массивінің ретімен аралайды, сондықтан сымдардың реті оттардың реті болады.",
      },
      expect: { en: "D2 drives the leftmost LED and D7 the rightmost.", ru: "D2 управляет крайним левым светодиодом, D7 крайним правым.", kk: "D2 ең сол жақтағы, ал D7 ең оң жақтағы жарық диодын басқарады." },
      mistake: { en: "Crossed wires make the light jump around instead of sweeping.", ru: "Перепутанные провода заставляют огонёк прыгать, а не бежать.", kk: "Шатасқан сымдар оттың жүгірудің орнына секіруіне әкеледі." },
    },
    {
      title: { en: "Connect the speed potentiometer", ru: "Подключите потенциометр скорости", kk: "Жылдамдық потенциометрін қосыңыз" },
      body: {
        en: "Plug the potentiometer into the breadboard. Wire one outer leg to 5V, the other outer leg to GND and the middle leg (wiper) to A0. Turning the knob now moves the voltage on A0 between 0 and 5 V, which analogRead() turns into 0…1023.",
        ru: "Вставьте потенциометр в макетку. Одну крайнюю ножку подключите к 5V, другую крайнюю к GND, а среднюю (движок) к A0. Теперь при вращении ручки напряжение на A0 меняется от 0 до 5 В, а analogRead() превращает его в 0…1023.",
        kk: "Потенциометрді макет тақтасына орнатыңыз. Бір шеткі аяғын 5V-ке, екінші шеткі аяғын GND-ге, ал ортаңғы аяғын (жүгірткі) A0-ге қосыңыз. Енді тұтқаны бұрағанда A0-дегі кернеу 0-ден 5 В-қа дейін өзгереді, ал analogRead() оны 0…1023 санына айналдырады.",
      },
      expect: { en: "The pot has three wires: 5V, A0, GND.", ru: "У потенциометра три провода: 5V, A0, GND.", kk: "Потенциометрде үш сым бар: 5V, A0, GND." },
      mistake: { en: "Putting the wiper on 5V or GND shorts the supply when the knob hits the end.", ru: "Если движок посадить на 5V или GND, в крайнем положении ручки будет короткое замыкание питания.", kk: "Жүгірткіні 5V немесе GND-ге қоссаңыз, тұтқа шетке жеткенде қоректену қысқа тұйықталады." },
    },
    {
      title: { en: "Upload and play with the speed", ru: "Загрузите скетч и поиграйте со скоростью", kk: "Скетчті жүктеп, жылдамдықпен ойнаңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. The light bounces from LED 1 to LED 6 and back. Turn the knob: each step takes from 300 ms down to 20 ms, and the new value is printed whenever you move the knob noticeably. Timing uses millis(), so the knob responds instantly even at the slowest speed.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. Огонёк бегает от светодиода 1 к светодиоду 6 и обратно. Покрутите ручку: шаг меняется от 300 мс до 20 мс, а новое значение печатается, когда ручка заметно сдвигается. Время считается через millis(), поэтому ручка отзывается сразу даже на самой медленной скорости.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. От 1-жарық диодынан 6-сына дейін және кері жүгіреді. Тұтқаны бұраңыз: бір қадам 300 мс-тан 20 мс-қа дейін өзгереді, ал тұтқа айтарлықтай жылжығанда жаңа мән басып шығарылады. Уақыт millis() арқылы есептеледі, сондықтан ең баяу жылдамдықта да тұтқа бірден әсер етеді.",
      },
      expect: { en: "A smooth back-and-forth sweep whose speed follows the knob.", ru: "Плавный бег туда-обратно, скорость которого следует за ручкой.", kk: "Жылдамдығы тұтқаға бағынатын біркелкі әрлі-берлі жүгіру." },
      mistake: { en: "Using delay() for each step makes the knob feel laggy at slow speeds.", ru: "Если делать каждый шаг через delay(), на медленной скорости ручка будет отзываться с задержкой.", kk: "Әр қадамды delay() арқылы жасасаңыз, баяу жылдамдықта тұтқа кешігіп әсер етеді." },
    },
  ],
  code: [{
    filename: "knight_rider.ino",
    language: "cpp",
    libraries: [],
    source: `// Knight Rider LED chaser: six LEDs sweep back and forth,
// the potentiometer on A0 sets the speed.
const int LED_PINS[] = {2, 3, 4, 5, 6, 7};
const int NUM_LEDS = 6;
const int POT_PIN = A0;

int pos = 0;            // LED that is lit now
int delta = 1;          // +1 = moving right, -1 = moving left
unsigned long lastMove = 0;
int lastRaw = -100;

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < NUM_LEDS; i++) pinMode(LED_PINS[i], OUTPUT);
  Serial.println("Knight Rider ready");
}

void loop() {
  int raw = analogRead(POT_PIN);                            // 0..1023
  unsigned long stepMs = map(raw, 0, 1023, 300, 20);        // knob up = faster

  if (abs(raw - lastRaw) > 40) {                            // report only real knob moves
    lastRaw = raw;
    Serial.print("step: ");
    Serial.print(stepMs);
    Serial.println(" ms");
  }

  if (millis() - lastMove >= stepMs) {
    lastMove = millis();
    for (int i = 0; i < NUM_LEDS; i++) digitalWrite(LED_PINS[i], i == pos ? HIGH : LOW);
    pos += delta;
    if (pos == NUM_LEDS - 1 || pos == 0) delta = -delta;    // bounce at both ends
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "One LED in the row never lights", ru: "Один светодиод в ряду не горит", kk: "Қатардағы бір жарық диоды жанбайды" },
      cause: { en: "It is in backwards, or its resistor sits in a different breadboard row than its anode.", ru: "Он вставлен наоборот, или его резистор стоит не в том ряду, что анод.", kk: "Ол кері қойылған немесе оның резисторы анодпен бір қатарда емес." },
      fix: { en: "Turn the LED so the long leg meets the resistor, and check the wire from its D pin lands in the resistor's row.", ru: "Разверните светодиод длинной ножкой к резистору и проверьте, что провод от его пина D приходит в ряд резистора.", kk: "Жарық диодын ұзын аяғын резисторға қаратып бұрыңыз және оның D пинінен келген сым резистор қатарына түскенін тексеріңіз." },
    },
    {
      symptom: { en: "The light jumps around instead of sweeping", ru: "Огонёк прыгает, а не бежит", kk: "От жүгірмей, секіреді" },
      cause: { en: "The wires from D2–D7 reach the LEDs in the wrong order.", ru: "Провода от D2–D7 подходят к светодиодам не по порядку.", kk: "D2–D7 сымдары жарық диодтарына ретсіз жеткен." },
      fix: { en: "Re-route them so D2 feeds the leftmost LED and each next pin the next LED, or reorder the numbers in LED_PINS to match your wiring.", ru: "Переложите их так, чтобы D2 шёл к крайнему левому светодиоду, а каждый следующий пин к следующему, или поменяйте порядок чисел в LED_PINS под свою разводку.", kk: "Оларды D2 ең сол жақтағы жарық диодына, ал әр келесі пин келесі жарық диодына баратындай етіп қайта қосыңыз немесе LED_PINS ішіндегі сандардың ретін өз сымдарыңызға сәйкестендіріңіз." },
    },
    {
      symptom: { en: "Turning the knob changes nothing", ru: "Поворот ручки ничего не меняет", kk: "Тұтқаны бұрау ештеңені өзгертпейді" },
      cause: { en: "The wiper (middle leg) is not on A0, or one outer leg is not connected so A0 floats.", ru: "Движок (средняя ножка) не на A0, или одна крайняя ножка не подключена, и A0 «висит в воздухе».", kk: "Жүгірткі (ортаңғы аяқ) A0-де емес немесе бір шеткі аяқ қосылмағандықтан A0 «ауада ілініп» тұр." },
      fix: { en: "Check the three pot wires (5V, A0, GND) and watch the \"step\" lines in the Serial Monitor while you turn it.", ru: "Проверьте три провода потенциометра (5V, A0, GND) и следите за строками «step» в Serial Monitor при вращении.", kk: "Потенциометрдің үш сымын (5V, A0, GND) тексеріп, бұраған кезде Serial Monitor-дағы «step» жолдарын бақылаңыз." },
    },
  ],
  safety: [
    { en: "Never connect an LED to a pin without its resistor.", ru: "Никогда не подключайте светодиод к пину без резистора.", kk: "Жарық диодын ешқашан резисторсыз пинге қоспаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["Knight Rider ready", "step: 160 ms", "step: 112 ms", "step: 64 ms", "step: 20 ms", "step: 87 ms", "step: 300 ms"],
    leds: [{ label: "LED 1", color: "#E53935" }, { label: "LED 2", color: "#E53935" }, { label: "LED 3", color: "#E53935" }, { label: "LED 4", color: "#E53935" }],
  },
} satisfies GuideContent;
