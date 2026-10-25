import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "dc-motor-speed-controller",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "tools",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 12,
  xpReward: 150,
  title: {
    en: "DC Motor Speed Controller with a MOSFET",
    ru: "Регулятор скорости мотора на MOSFET",
    kk: "MOSFET негізіндегі қозғалтқыш жылдамдығын реттегіш",
  },
  summary: {
    en: "Turn a knob and a DC motor speeds up smoothly. The Uno reads a potentiometer and switches a logic-level MOSFET with PWM, while the motor runs from its own AA batteries with a flyback diode and a shared ground.",
    ru: "Поверните ручку, и мотор плавно разгоняется. Uno читает потенциометр и коммутирует логический MOSFET с помощью ШИМ, а мотор питается от своих батареек AA с обратным диодом и общей землёй.",
    kk: "Тұтқаны бұраңыз, сонда қозғалтқыш біртіндеп үдейді. Uno потенциометрді оқып, логикалық MOSFET-ті ШИМ арқылы ауыстырып қосады, ал қозғалтқыш кері диоды мен ортақ жері бар өз AA батареяларынан қоректенеді.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Reads the knob, generates PWM", ru: "Читает ручку, формирует ШИМ", kk: "Тұтқаны оқиды, ШИМ жасайды" } },
    { component: "potentiometer", qty: 1, spec: { en: "10 kΩ linear (B10K)", ru: "10 кОм линейный (B10K)", kk: "10 кОм сызықтық (B10K)" }, role: { en: "Speed knob", ru: "Ручка скорости", kk: "Жылдамдық тұтқасы" } },
    { component: "mosfet-n", qty: 1, spec: { en: "IRLZ44N logic-level, TO-220", ru: "IRLZ44N с логическим уровнем, TO-220", kk: "IRLZ44N логикалық деңгейлі, TO-220" }, role: { en: "Low-side switch for the motor", ru: "Ключ в минусе мотора", kk: "Қозғалтқыштың теріс жағындағы кілт" } },
    { component: "resistor", qty: 2, spec: { en: "220 Ω and 10 kΩ, ¼ W", ru: "220 Ом и 10 кОм, ¼ Вт", kk: "220 Ом және 10 кОм, ¼ Вт" }, role: { en: "Gate resistor and gate pull-down", ru: "Затворный резистор и подтяжка затвора к земле", kk: "Бекітпе резисторы және бекітпені жерге тарту" } },
    { component: "diode", qty: 1, spec: { en: "1N4007 (or 1N5819 Schottky)", ru: "1N4007 (или Шоттки 1N5819)", kk: "1N4007 (немесе Шоттки 1N5819)" }, role: { en: "Flyback diode across the motor", ru: "Обратный диод параллельно мотору", kk: "Қозғалтқышқа параллель кері диод" } },
    { component: "dc-motor", qty: 1, spec: { en: "TT gear motor 3–6 V", ru: "мотор-редуктор TT 3–6 В", kk: "TT редукторлы қозғалтқыш 3–6 В" }, role: { en: "The load being controlled", ru: "Управляемая нагрузка", kk: "Басқарылатын жүктеме" } },
    { component: "battery-4xaa", qty: 1, spec: { en: "4× AA holder, 6 V", ru: "держатель 4× AA, 6 В", kk: "4× AA ұстағышы, 6 В" }, role: { en: "Motor power", ru: "Питание мотора", kk: "Қозғалтқыш қорегі" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 12, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "pot", component: "potentiometer", label: "Speed" },
    { id: "r_g", component: "resistor", label: "220 Ω" },
    { id: "r_pd", component: "resistor", label: "10 kΩ" },
    { id: "q1", component: "mosfet-n", label: "IRLZ44N" },
    { id: "d1", component: "diode", label: "Flyback" },
    { id: "m1", component: "dc-motor", label: "Motor" },
    { id: "bat", component: "battery-4xaa", label: "4×AA 6 V" },
  ],
  connections: [
    { from: "pot.1", to: "board.5V", color: "red" },
    { from: "pot.2", to: "board.GND", color: "black" },
    { from: "pot.W", to: "board.A0", color: "orange", note: { en: "middle pin (wiper)", ru: "средний вывод (движок)", kk: "ортаңғы шықпа (жүгіргіш)" } },
    { from: "board.D9", to: "r_g.A", color: "yellow", note: { en: "PWM pin", ru: "ШИМ-пин", kk: "ШИМ пині" } },
    { from: "r_g.B", to: "q1.G", color: "yellow" },
    { from: "r_pd.A", to: "q1.G", color: "gray", note: { en: "keeps the motor off during reset", ru: "держит мотор выключенным при сбросе", kk: "қайта жүктеу кезінде қозғалтқышты сөндірулі ұстайды" } },
    { from: "r_pd.B", to: "board.GND2", color: "black" },
    { from: "bat.+", to: "m1.+", color: "red" },
    { from: "m1.-", to: "q1.D", color: "brown" },
    { from: "d1.K", to: "m1.+", color: "gray", note: { en: "stripe towards battery +", ru: "полоска к плюсу батареи", kk: "жолағы батарея плюсіне" } },
    { from: "d1.A", to: "m1.-", color: "gray" },
    { from: "q1.S", to: "bat.-", color: "black", note: { en: "motor current returns straight to the battery", ru: "ток мотора возвращается прямо в батарею", kk: "қозғалтқыш тогы тікелей батареяға қайтады" } },
    { from: "bat.-", to: "board.GND3", color: "black", note: { en: "shared ground", ru: "общая земля", kk: "ортақ жер" } },
  ],
  steps: [
    {
      title: { en: "Wire the speed knob", ru: "Подключите ручку скорости", kk: "Жылдамдық тұтқасын қосыңыз" },
      body: {
        en: "Connect one outer leg of the potentiometer to 5V, the other outer leg to GND and the middle leg (wiper) to A0. Turning the knob now sweeps A0 from 0 to 5 V, which the Uno reads as 0–1023.",
        ru: "Подключите один крайний вывод потенциометра к 5V, другой крайний к GND, а средний (движок) к A0. Теперь вращение ручки меняет напряжение на A0 от 0 до 5 В, а Uno читает его как 0–1023.",
        kk: "Потенциометрдің бір шеткі шықпасын 5V-ке, екінші шеткісін GND-ге, ортаңғысын (жүгіргіш) A0-ге қосыңыз. Енді тұтқаны бұрау A0-дағы кернеуді 0-ден 5 В-қа дейін өзгертеді, ал Uno оны 0–1023 деп оқиды.",
      },
      expect: { en: "Three wires on the pot, the middle one to A0.", ru: "Три провода на потенциометре, средний на A0.", kk: "Потенциометрде үш сым, ортаңғысы A0-де." },
      mistake: { en: "Wiper on 5V and an outer leg on A0: the knob only works over half its turn, or shorts 5V at one end.", ru: "Движок на 5V, а крайний вывод на A0: ручка работает только на половине хода или в крайнем положении замыкает 5V.", kk: "Жүгіргіш 5V-те, ал шеткі шықпа A0-де болса, тұтқа жүрісінің жартысында ғана жұмыс істейді немесе шеткі күйде 5V-ті тұйықтайды." },
    },
    {
      title: { en: "Place the MOSFET and its resistors", ru: "Установите MOSFET и его резисторы", kk: "MOSFET пен оның резисторларын орнатыңыз" },
      body: {
        en: "Hold the IRLZ44N with the printed side facing you and the legs down: the legs are Gate, Drain, Source from left to right. Run D9 through a 220 Ω resistor to the Gate, and add a 10 kΩ resistor from the Gate to GND. The 220 Ω limits the current spike that charges the gate on every PWM edge. The 10 kΩ keeps the gate at 0 V while the Uno boots and D9 is still an input, so the motor never twitches on reset.",
        ru: "Держите IRLZ44N маркировкой к себе, выводами вниз: слева направо это Затвор (G), Сток (D), Исток (S). Проведите D9 через резистор 220 Ом к затвору и поставьте резистор 10 кОм от затвора к GND. 220 Ом ограничивают бросок тока, который заряжает затвор на каждом фронте ШИМ. 10 кОм держат затвор на 0 В, пока Uno загружается и D9 ещё вход, поэтому мотор не дёргается при сбросе.",
        kk: "IRLZ44N-ді таңбасын өзіңізге, аяқтарын төмен қаратып ұстаңыз: солдан оңға қарай Бекітпе (G), Ағын (D), Бастау (S). D9-ды 220 Ом резистор арқылы бекітпеге жалғап, бекітпеден GND-ге 10 кОм резистор қойыңыз. 220 Ом ШИМ-нің әр фронтында бекітпені зарядтайтын ток секірісін шектейді. 10 кОм Uno жүктеліп, D9 әлі кіріс болып тұрғанда бекітпені 0 В-та ұстайды, сондықтан қайта жүктелгенде қозғалтқыш тартылмайды.",
      },
      expect: { en: "Gate has two resistors: 220 Ω to D9 and 10 kΩ to GND.", ru: "На затворе два резистора: 220 Ом к D9 и 10 кОм к GND.", kk: "Бекітпеде екі резистор: D9-ға 220 Ом және GND-ге 10 кОм." },
      mistake: { en: "Using an IRF540N or IRFZ44N (no L): they need about 10 V on the gate and barely turn on at 5 V.", ru: "Взять IRF540N или IRFZ44N (без L): им нужно около 10 В на затворе, а от 5 В они почти не открываются.", kk: "IRF540N немесе IRFZ44N (L-сіз) алу: оларға бекітпеде шамамен 10 В керек, ал 5 В-тан олар әрең ашылады." },
    },
    {
      title: { en: "Wire the motor, diode and battery", ru: "Подключите мотор, диод и батарею", kk: "Қозғалтқыш, диод және батареяны қосыңыз" },
      body: {
        en: "Battery + goes to one motor terminal, the other motor terminal goes to the MOSFET Drain, and the Source goes to battery −. Put the diode across the motor with its striped end (K) on the battery + side: when the MOSFET switches off, the motor's coil tries to keep the current flowing and the diode gives it a safe path instead of a voltage spike on the Drain. Finally join battery − to Arduino GND so the gate voltage has the same reference as the Source.",
        ru: "Плюс батареи идёт на один вывод мотора, второй вывод мотора на сток MOSFET, исток на минус батареи. Поставьте диод параллельно мотору концом с полоской (K) к плюсу батареи: когда MOSFET закрывается, обмотка мотора пытается поддержать ток, и диод даёт ему безопасный путь вместо выброса напряжения на стоке. Наконец, соедините минус батареи с GND Arduino, чтобы напряжение затвора отсчитывалось от того же уровня, что и исток.",
        kk: "Батарея плюсі қозғалтқыштың бір шықпасына, екінші шықпасы MOSFET ағынына, ал бастауы батарея минусына барады. Диодты қозғалтқышқа параллель, жолағы бар ұшын (K) батарея плюсі жаққа қаратып қойыңыз: MOSFET жабылғанда қозғалтқыш орамы токты ұстап тұруға тырысады, ал диод оған ағындағы кернеу секірісінің орнына қауіпсіз жол береді. Соңында бекітпе кернеуі бастаумен бірдей деңгейден есептелуі үшін батарея минусын Arduino GND-імен жалғаңыз.",
      },
      expect: { en: "Nothing moves yet: the gate is held at 0 V.", ru: "Пока ничего не крутится: затвор удерживается на 0 В.", kk: "Әзірге ештеңе айналмайды: бекітпе 0 В-та ұсталып тұр." },
      mistake: { en: "Motor spinning at full speed as soon as the battery is in means Drain and Source are swapped: the MOSFET's internal diode conducts.", ru: "Если мотор сразу крутится на полной скорости, перепутаны сток и исток: проводит внутренний диод MOSFET.", kk: "Батарея салынған бойда қозғалтқыш толық жылдамдықпен айналса, ағын мен бастау ауысқан: MOSFET-тің ішкі диоды өткізеді." },
    },
    {
      title: { en: "Upload and turn the knob", ru: "Загрузите скетч и поверните ручку", kk: "Скетчті жүктеп, тұтқаны бұраңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. With the knob at the bottom the motor is off. Turn it up: the motor starts at about 25 % duty (TT motors stall below that) and climbs smoothly to full speed. The sketch limits how fast the duty can change, a soft start that is easier on the gears and the batteries.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. В нижнем положении ручки мотор выключен. Поворачивайте: мотор стартует примерно с 25 % заполнения (ниже моторы TT стоят) и плавно разгоняется до полной скорости. Скетч ограничивает скорость изменения заполнения: это мягкий старт, щадящий шестерни и батарейки.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Тұтқа төменгі күйде болғанда қозғалтқыш сөндірулі. Бұраңыз: қозғалтқыш шамамен 25 % толтырудан басталады (одан төменде TT қозғалтқыштары тұрып қалады) да, толық жылдамдыққа біртіндеп үдейді. Скетч толтырудың өзгеру жылдамдығын шектейді: бұл тісті доңғалақтар мен батареяларды аяйтын жұмсақ іске қосу.",
      },
      expect: { en: "Duty goes from 0 to 255 as the knob turns, and the motor follows.", ru: "Заполнение меняется от 0 до 255 при повороте ручки, и мотор следует за ним.", kk: "Тұтқаны бұрағанда толтыру 0-ден 255-ке дейін өзгереді, қозғалтқыш соған ілеседі." },
      mistake: { en: "A motor that hums but does not turn at low settings needs a higher MIN_DUTY.", ru: "Если мотор гудит, но не крутится на малых оборотах, увеличьте MIN_DUTY.", kk: "Төмен деңгейде қозғалтқыш ызыңдап, бірақ айналмаса, MIN_DUTY-ді көбейтіңіз." },
    },
    {
      title: { en: "Feel the MOSFET and listen", ru: "Потрогайте MOSFET и прислушайтесь", kk: "MOSFET-ті ұстап, тыңдап көріңіз" },
      body: {
        en: "After a minute at full speed, touch the MOSFET: it should be at room temperature, because a fully switched IRLZ44N wastes only milliwatts at under 1 A. You may hear a faint whine at medium speed: D9 runs PWM at about 490 Hz, which is in the audible range. That is normal; the troubleshooting section shows how to move it to 31 kHz.",
        ru: "После минуты на полной скорости потрогайте MOSFET: он должен быть комнатной температуры, ведь полностью открытый IRLZ44N при токе до 1 А теряет лишь милливатты. На средних оборотах может быть слышен тонкий писк: ШИМ на D9 работает примерно на 490 Гц, это слышимый диапазон. Это нормально; в разделе неполадок показано, как поднять частоту до 31 кГц.",
        kk: "Толық жылдамдықта бір минут жұмыс істегеннен кейін MOSFET-ті ұстап көріңіз: ол бөлме температурасында болуы керек, себебі толық ашық IRLZ44N 1 А-ге дейінгі токта тек милливаттарды жоғалтады. Орташа айналымда жіңішке шиқыл естілуі мүмкін: D9-дағы ШИМ шамамен 490 Гц-те жұмыс істейді, бұл естілетін ауқым. Бұл қалыпты жағдай; ақаулар бөлімінде жиілікті 31 кГц-ке қалай көтеруге болатыны көрсетілген.",
      },
      expect: { en: "Cool MOSFET, smooth speed control.", ru: "Холодный MOSFET, плавная регулировка.", kk: "Салқын MOSFET, біркелкі реттеу." },
      mistake: { en: "A hot MOSFET means it is only half on: wrong (non-logic-level) part or a broken gate connection.", ru: "Горячий MOSFET значит, что он открыт наполовину: не та (нелогическая) модель или обрыв цепи затвора.", kk: "Ыстық MOSFET жартылай ғана ашық дегенді білдіреді: басқа (логикалық емес) модель немесе бекітпе тізбегі үзілген." },
    },
  ],
  code: [{
    filename: "motor_speed.ino",
    language: "cpp",
    libraries: [],
    source: `const int POT_PIN = A0;         // potentiometer wiper
const int MOTOR_PIN = 9;        // PWM to the MOSFET gate through 220 ohm
const int DEADBAND = 20;        // knob readings below this = motor off
const int MIN_DUTY = 64;        // TT motors stall below about 25 % duty
const int RAMP = 3;             // max duty change per 10 ms (soft start)

int duty = 0;
unsigned long lastRamp = 0, lastPrint = 0;

void setup() {
  Serial.begin(9600);
  pinMode(MOTOR_PIN, OUTPUT);
  analogWrite(MOTOR_PIN, 0);
  // Optional: quiet 31 kHz PWM on D9/D10 (Timer1, does not affect millis):
  // TCCR1B = (TCCR1B & 0b11111000) | 0x01;
  Serial.println("motor speed controller ready");
}

void loop() {
  int raw = analogRead(POT_PIN);
  int target = raw < DEADBAND ? 0 : map(raw, DEADBAND, 1023, MIN_DUTY, 255);

  if (millis() - lastRamp >= 10) {
    lastRamp = millis();
    if (duty < target) duty = min(duty + RAMP, target);
    else if (duty > target) duty = max(duty - RAMP, target);
    analogWrite(MOTOR_PIN, duty);
  }

  if (millis() - lastPrint >= 500) {
    lastPrint = millis();
    Serial.print("pot ");
    Serial.print(raw);
    Serial.print("  duty ");
    Serial.print(duty);
    Serial.print("/255 (");
    Serial.print(duty * 100L / 255);
    Serial.println(" %)");
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Motor runs at full speed and ignores the knob", ru: "Мотор крутится на полной скорости и не слушается ручки", kk: "Қозғалтқыш толық жылдамдықпен айналып, тұтқаға бағынбайды" },
      cause: { en: "Drain and Source are swapped, or the MOSFET is damaged (shorted).", ru: "Перепутаны сток и исток, или MOSFET повреждён (пробит).", kk: "Ағын мен бастау ауысқан немесе MOSFET зақымдалған (тесілген)." },
      fix: { en: "Check the G-D-S order with the label facing you; replace the MOSFET if it still conducts with the gate at 0 V.", ru: "Проверьте порядок G-D-S маркировкой к себе; если MOSFET проводит при затворе на 0 В, замените его.", kk: "Таңбасын өзіңізге қаратып, G-D-S тәртібін тексеріңіз; бекітпе 0 В болғанда MOSFET өткізсе, оны ауыстырыңыз." },
    },
    {
      symptom: { en: "Motor never moves, even at full duty", ru: "Мотор не крутится даже на полном заполнении", kk: "Қозғалтқыш толық толтыруда да айналмайды" },
      cause: { en: "No shared ground between the battery and the Arduino, or a non-logic-level MOSFET.", ru: "Нет общей земли между батареей и Arduino, или MOSFET не логического уровня.", kk: "Батарея мен Arduino арасында ортақ жер жоқ немесе MOSFET логикалық деңгейлі емес." },
      fix: { en: "Add the battery − to GND wire and use an IRLZ44N (or another MOSFET rated at Vgs = 4.5 V).", ru: "Добавьте провод от минуса батареи к GND и используйте IRLZ44N (или другой MOSFET с параметрами при Vgs = 4,5 В).", kk: "Батарея минусынан GND-ге сым қосып, IRLZ44N (немесе Vgs = 4,5 В үшін сипатталған басқа MOSFET) пайдаланыңыз." },
    },
    {
      symptom: { en: "The Uno resets when the motor starts or stops", ru: "Uno перезагружается при пуске или остановке мотора", kk: "Қозғалтқыш іске қосылғанда не тоқтағанда Uno қайта жүктеледі" },
      cause: { en: "The diode is missing, or the motor current flows through the Arduino's ground pins.", ru: "Нет диода, или ток мотора течёт через пины GND Arduino.", kk: "Диод жоқ немесе қозғалтқыш тогы Arduino-ның GND пиндері арқылы ағады." },
      fix: { en: "Fit the diode across the motor and wire the Source straight to battery −; only one thin wire goes from battery − to the Arduino.", ru: "Поставьте диод параллельно мотору и подключите исток прямо к минусу батареи; к Arduino от минуса идёт только один тонкий провод.", kk: "Диодты қозғалтқышқа параллель қойып, бастауды тікелей батарея минусына қосыңыз; Arduino-ға минустан тек бір жіңішке сым барады." },
    },
    {
      symptom: { en: "Annoying whine at medium speed", ru: "Неприятный писк на средних оборотах", kk: "Орташа айналымда жағымсыз шиқыл" },
      cause: { en: "490 Hz PWM makes the motor windings vibrate audibly.", ru: "ШИМ 490 Гц заставляет обмотки мотора слышно вибрировать.", kk: "490 Гц ШИМ қозғалтқыш орамдарын естілетіндей дірілдетеді." },
      fix: { en: "Uncomment the TCCR1B line in setup() to run D9 at 31 kHz; raise MIN_DUTY a little if low speeds get weaker.", ru: "Раскомментируйте строку TCCR1B в setup(), чтобы D9 работал на 31 кГц; если малые обороты ослабнут, немного увеличьте MIN_DUTY.", kk: "D9 31 кГц-те жұмыс істеуі үшін setup() ішіндегі TCCR1B жолын түсініктемеден шығарыңыз; төмен айналымдар әлсіресе, MIN_DUTY-ді сәл көбейтіңіз." },
    },
  ],
  safety: [
    { en: "Never connect a motor straight to an Arduino pin: it needs hundreds of mA and the voltage spikes destroy the pin. Always use the MOSFET and the diode.", ru: "Никогда не подключайте мотор прямо к пину Arduino: ему нужны сотни мА, а выбросы напряжения убивают пин. Всегда используйте MOSFET и диод.", kk: "Қозғалтқышты ешқашан Arduino пиніне тікелей қоспаңыз: оған жүздеген мА керек, ал кернеу секірістері пинді бүлдіреді. Әрдайым MOSFET пен диодты пайдаланыңыз." },
    { en: "Keep fingers and hair away from the spinning shaft and gears.", ru: "Держите пальцы и волосы подальше от вращающегося вала и шестерён.", kk: "Саусақтар мен шашты айналып тұрған білік пен тісті доңғалақтардан аулақ ұстаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "motor speed controller ready",
      "pot 4  duty 0/255 (0 %)",
      "pot 186  duty 95/255 (37 %)",
      "pot 431  duty 142/255 (55 %)",
      "pot 702  duty 193/255 (75 %)",
      "pot 1023  duty 255/255 (100 %)",
      "pot 1023  duty 255/255 (100 %)",
      "pot 512  duty 157/255 (61 %)",
      "pot 11  duty 0/255 (0 %)",
    ],
    leds: [{ label: "MOTOR", color: "#FF7A1A" }],
  },
} satisfies GuideContent;
