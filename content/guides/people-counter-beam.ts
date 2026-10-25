import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "people-counter-beam",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "security",
  robotics: false,
  difficulty: "intermediate",
  hours: 2,
  costUsd: 11,
  xpReward: 200,
  title: {
    en: "Bidirectional People Counter",
    ru: "Двунаправленный счётчик посетителей",
    kk: "Екі бағытты келушілер есептегіші",
  },
  summary: {
    en: "Two IR sensors a few centimetres apart tell which way someone walks through a passage. The Uno adds or subtracts and a 4-digit display shows how many people are inside right now.",
    ru: "Два ИК-датчика в нескольких сантиметрах друг от друга определяют, в какую сторону человек проходит через проход. Uno прибавляет или вычитает, а 4-разрядный индикатор показывает, сколько людей сейчас внутри.",
    kk: "Бір-бірінен бірнеше сантиметр қашықтықтағы екі ИҚ датчигі адамның өткелден қай бағытта өткенін анықтайды. Uno қосады немесе азайтады, ал 4 разрядты индикатор дәл қазір ішінде қанша адам барын көрсетеді.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Direction logic and counter", ru: "Логика направления и счётчик", kk: "Бағыт логикасы және есептегіш" } },
    { component: "ir-obstacle", qty: 2, spec: { en: "FC-51, 2–30 cm adjustable", ru: "FC-51, регулируемые 2–30 см", kk: "FC-51, реттелетін 2–30 см" }, role: { en: "Outer (A) and inner (B) beam", ru: "Внешний (A) и внутренний (B) луч", kk: "Сыртқы (A) және ішкі (B) сәуле" } },
    { component: "tm1637-display", qty: 1, spec: { en: "4-digit 0.56\" with TM1637", ru: "4 разряда 0,56\" на TM1637", kk: "TM1637 негізіндегі 4 разрядты 0,56\"" }, role: { en: "Shows people inside", ru: "Показывает число людей внутри", kk: "Ішіндегі адамдар санын көрсетеді" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Reset the count to 0", ru: "Сброс счёта в 0", kk: "Есепті 0-ге түсіру" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 16, spec: { en: "male-female, 20 cm or longer for the sensors", ru: "папа-мама, 20 см и длиннее для датчиков", kk: "аталық-аналық, датчиктер үшін 20 см не одан ұзын" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "ir_a", component: "ir-obstacle", label: "Sensor A (outer)" },
    { id: "ir_b", component: "ir-obstacle", label: "Sensor B (inner)" },
    { id: "disp", component: "tm1637-display", label: "Inside" },
    { id: "btn", component: "push-button", label: "Reset" },
  ],
  connections: [
    { from: "board.5V", to: "ir_a.VCC", color: "red" },
    { from: "ir_a.GND", to: "board.GND", color: "black" },
    { from: "ir_a.OUT", to: "board.D2", color: "green", note: { en: "LOW when something is in front", ru: "LOW, когда перед датчиком есть препятствие", kk: "Алдында кедергі болса LOW" } },
    { from: "board.5V", to: "ir_b.VCC", color: "red" },
    { from: "ir_b.GND", to: "board.GND2", color: "black" },
    { from: "ir_b.OUT", to: "board.D3", color: "blue" },
    { from: "board.5V", to: "disp.VCC", color: "red" },
    { from: "disp.GND", to: "board.GND3", color: "black" },
    { from: "disp.CLK", to: "board.D5", color: "yellow" },
    { from: "disp.DIO", to: "board.D4", color: "orange" },
    { from: "board.D6", to: "btn.1", color: "purple", note: { en: "internal pull-up", ru: "внутренняя подтяжка", kk: "ішкі тарту" } },
    { from: "btn.2", to: "board.GND", color: "black" },
  ],
  steps: [
    {
      title: { en: "How two beams give a direction", ru: "Как два луча дают направление", kk: "Екі сәуле бағытты қалай береді" },
      body: {
        en: "Sensor A sits on the outside of the passage and sensor B on the inside, 6–10 cm apart. Someone walking in blocks A, then A and B, then only B, then nothing. Walking out gives the mirror sequence. The sketch remembers which sensor was blocked first and which one was blocked last on its own: A first and B last means IN, B first and A last means OUT. Anyone who steps in and turns back ends on the same sensor they started on and is not counted.",
        ru: "Датчик A стоит с внешней стороны прохода, датчик B с внутренней, на расстоянии 6–10 см. Входящий человек перекрывает A, потом A и B, потом только B, потом ничего. Выходящий даёт зеркальную последовательность. Скетч запоминает, какой датчик перекрылся первым и какой последним остался перекрыт в одиночку: A первым и B последним значит ВХОД, B первым и A последним значит ВЫХОД. Кто шагнул и вернулся, заканчивает на том же датчике, с которого начал, и не считается.",
        kk: "A датчигі өткелдің сыртқы жағында, B датчигі ішкі жағында, 6–10 см қашықтықта тұрады. Кіріп келе жатқан адам алдымен A-ны, содан кейін A мен B-ні, содан кейін тек B-ні жабады, соңында ештеңе жабылмайды. Шығып бара жатқан адам айналық тізбек береді. Скетч қай датчик бірінші жабылғанын және қайсысы соңында жалғыз жабық қалғанын есте сақтайды: алдымен A, соңында B болса КІРУ, алдымен B, соңында A болса ШЫҒУ. Бір қадам басып, кері қайтқан адам бастаған датчигінде аяқтайды да, есепке алынбайды.",
      },
      expect: { en: "You know which sensor faces the outside (A) and which the inside (B).", ru: "Вы знаете, какой датчик снаружи (A), а какой внутри (B).", kk: "Қай датчик сыртта (A), қайсысы ішінде (B) екенін білесіз." },
      mistake: { en: "Mounting the sensors more than about 15 cm apart: a person can fit between them and the order is lost.", ru: "Датчики дальше примерно 15 см друг от друга: человек помещается между ними, и порядок теряется.", kk: "Датчиктер бір-бірінен шамамен 15 см-ден алыс болса, адам олардың арасына сыйып, тәртіп жоғалады." },
    },
    {
      title: { en: "Wire the two IR sensors", ru: "Подключите два ИК-датчика", kk: "Екі ИҚ датчигін қосыңыз" },
      body: {
        en: "Connect both FC-51 modules to 5V and GND. Sensor A's OUT goes to D2 and sensor B's OUT to D3. Each module pulls OUT LOW and lights its small green LED when it sees something in front, so you can test them with your hand before uploading anything.",
        ru: "Подключите оба модуля FC-51 к 5V и GND. OUT датчика A идёт на D2, OUT датчика B на D3. Каждый модуль тянет OUT в LOW и зажигает маленький зелёный светодиод, когда что-то видит перед собой, поэтому их можно проверить рукой ещё до загрузки скетча.",
        kk: "Екі FC-51 модулін де 5V пен GND-ге қосыңыз. A датчигінің OUT-ы D2-ге, B датчигінің OUT-ы D3-ке барады. Әр модуль алдында бір нәрсе көрсе, OUT-ты LOW-ға тартып, кішкентай жасыл жарық диодын жағады, сондықтан оларды скетч жүктемей тұрып-ақ қолмен тексеруге болады.",
      },
      expect: { en: "Each sensor's green LED lights when your hand is 5–20 cm in front of it.", ru: "Зелёный светодиод каждого датчика загорается, когда рука в 5–20 см перед ним.", kk: "Қолыңыз алдында 5–20 см қашықтықта болғанда әр датчиктің жасыл жарық диоды жанады." },
      mistake: { en: "Swapping A and B makes every entry count as an exit; swap SENSOR_A_PIN and SENSOR_B_PIN or the wires.", ru: "Если перепутать A и B, каждый вход будет считаться выходом: поменяйте местами SENSOR_A_PIN и SENSOR_B_PIN или провода.", kk: "A мен B-ні шатастырсаңыз, әр кіру шығу болып саналады: SENSOR_A_PIN мен SENSOR_B_PIN-ді немесе сымдарды ауыстырыңыз." },
    },
    {
      title: { en: "Connect the display and reset button", ru: "Подключите индикатор и кнопку сброса", kk: "Индикатор мен нөлдеу батырмасын қосыңыз" },
      body: {
        en: "Wire the TM1637 VCC to 5V, GND to GND, CLK to D5 and DIO to D4. Despite the names, this is not I²C: any two digital pins work. Put the reset button between D6 and GND; the sketch uses the internal pull-up.",
        ru: "Подключите VCC TM1637 к 5V, GND к GND, CLK к D5, DIO к D4. Несмотря на названия, это не I²C: подойдут любые два цифровых пина. Кнопку сброса поставьте между D6 и GND, скетч использует внутреннюю подтяжку.",
        kk: "TM1637-нің VCC-ін 5V-ке, GND-ін GND-ге, CLK-ін D5-ке, DIO-сын D4-ке қосыңыз. Атауларына қарамастан бұл I²C емес: кез келген екі цифрлық пин жарайды. Нөлдеу батырмасын D6 пен GND арасына қойыңыз, скетч ішкі тартуды пайдаланады.",
      },
      expect: { en: "Four wires to the display, two to the button.", ru: "Четыре провода к индикатору, два к кнопке.", kk: "Индикаторға төрт сым, батырмаға екі сым." },
      mistake: { en: "Connecting CLK/DIO to A4/A5 out of I²C habit: it works only if you change the pin constants to match.", ru: "Подключение CLK/DIO к A4/A5 по привычке I²C: работает, только если поменять константы пинов.", kk: "Әдетпен CLK/DIO-ны A4/A5-ке қосу: пин тұрақтыларын сәйкес өзгертсеңіз ғана жұмыс істейді." },
    },
    {
      title: { en: "Mount the sensors on the passage", ru: "Закрепите датчики у прохода", kk: "Датчиктерді өткелге бекітіңіз" },
      body: {
        en: "FC-51 sensors see reflected IR, not a beam across the room, so they need the person to pass within about 30 cm. Mount both on the same side of a narrow passage (a corridor model, a gate, a turnstile, a door kept half open), facing across it, at waist height and 6–10 cm apart. Then turn each sensor's trimmer until the far wall is NOT detected but a hand at the middle of the passage is.",
        ru: "FC-51 видят отражённый ИК, а не луч через всю комнату, поэтому человек должен проходить ближе примерно 30 см. Закрепите оба датчика с одной стороны узкого прохода (макет коридора, калитка, турникет, приоткрытая дверь), направив поперёк прохода, на высоте пояса и в 6–10 см друг от друга. Затем подстроечником каждого датчика добейтесь, чтобы дальняя стена НЕ определялась, а рука в середине прохода определялась.",
        kk: "FC-51 бүкіл бөлме арқылы өтетін сәулені емес, шағылған ИҚ-ны көреді, сондықтан адам шамамен 30 см-ден жақын өтуі керек. Екі датчикті де тар өткелдің (дәліз макеті, қақпа, турникет, жартылай ашық есік) бір жағына, өткелге көлденең қаратып, бел биіктігінде және бір-бірінен 6–10 см қашықтықта бекітіңіз. Содан кейін әр датчиктің реттегішімен алыс қабырға анықталмайтындай, ал өткелдің ортасындағы қол анықталатындай етіңіз.",
      },
      expect: { en: "Both green LEDs are off when the passage is empty and light when you walk through.", ru: "Оба зелёных светодиода не горят при пустом проходе и загораются, когда вы проходите.", kk: "Өткел бос болғанда екі жасыл жарық диоды да жанбайды, ал сіз өткенде жанады." },
      mistake: { en: "A sensor that already sees the far wall stays LOW all the time and blocks every count.", ru: "Датчик, который уже видит дальнюю стену, постоянно в LOW и блокирует весь счёт.", kk: "Алыс қабырғаны көріп тұрған датчик үнемі LOW болып, бүкіл есепті бөгейді." },
    },
    {
      title: { en: "Upload and walk through", ru: "Загрузите скетч и пройдите", kk: "Скетчті жүктеп, өтіп көріңіз" },
      body: {
        en: "Install the \"TM1637\" library by Avishay Orpaz and upload. Open the Serial Monitor at 9600 baud. Walk in: the display goes up by one and the monitor prints IN. Walk out: it goes down and prints OUT. Step into the passage and back: the monitor prints \"ignored\". Press the button to start from 0 at opening time.",
        ru: "Установите библиотеку «TM1637» от Avishay Orpaz и загрузите скетч. Откройте Serial Monitor на 9600 бод. Войдите: число на индикаторе увеличится на один, в мониторе появится IN. Выйдите: число уменьшится, появится OUT. Шагните в проход и вернитесь: монитор напишет «ignored». Нажмите кнопку, чтобы начать с 0 в начале дня.",
        kk: "Avishay Orpaz жасаған «TM1637» кітапханасын орнатып, скетчті жүктеңіз. Serial Monitor-ды 9600 бодта ашыңыз. Кіріңіз: индикатордағы сан бірге артып, мониторда IN шығады. Шығыңыз: сан азайып, OUT шығады. Өткелге қадам басып, кері қайтыңыз: монитор «ignored» деп жазады. Күн басында 0-ден бастау үшін батырманы басыңыз.",
      },
      expect: { en: "In and out walks change the number in the right direction; turn-backs are ignored.", ru: "Входы и выходы меняют число в нужную сторону, возвраты игнорируются.", kk: "Кіру мен шығу санды дұрыс бағытта өзгертеді, кері қайтулар еленбейді." },
      mistake: { en: "Two people walking through side by side count as one: this simple counter sees bodies, not heads.", ru: "Двое, идущие рядом, считаются за одного: этот простой счётчик видит силуэты, а не головы.", kk: "Қатар келе жатқан екі адам бір адам болып саналады: бұл қарапайым есептегіш бастарды емес, денені көреді." },
    },
  ],
  code: [{
    filename: "people_counter.ino",
    language: "cpp",
    libraries: ["TM1637"],
    source: `#include <TM1637Display.h>

const int SENSOR_A_PIN = 2;     // outer sensor, LOW = blocked
const int SENSOR_B_PIN = 3;     // inner sensor, LOW = blocked
const int DIO_PIN = 4;
const int CLK_PIN = 5;
const int BUTTON_PIN = 6;       // reset to 0
const unsigned long STABLE_MS = 20;         // debounce
const unsigned long PASS_TIMEOUT_MS = 4000; // someone standing in the beam

TM1637Display display(CLK_PIN, DIO_PIN);

long inside = 0;
unsigned long totalIn = 0, totalOut = 0;
char first = 0;          // 'A' or 'B': which sensor started this passage
char lastAlone = 0;      // last sensor that was blocked on its own
bool timedOut = false;
unsigned long passStart = 0;

struct Debounced { int pin; bool state; bool raw; unsigned long changed; };
Debounced sa = {SENSOR_A_PIN, false, false, 0};
Debounced sb = {SENSOR_B_PIN, false, false, 0};

bool blocked(Debounced &s) {
  bool now = digitalRead(s.pin) == LOW;
  if (now != s.raw) { s.raw = now; s.changed = millis(); }
  if (s.raw != s.state && millis() - s.changed >= STABLE_MS) s.state = s.raw;
  return s.state;
}

void report(const char *what) {
  Serial.print(what);
  Serial.print("  inside=");
  Serial.print(inside);
  Serial.print(" (in ");
  Serial.print(totalIn);
  Serial.print(", out ");
  Serial.print(totalOut);
  Serial.println(")");
  display.showNumberDec(inside > 9999 ? 9999 : inside, false);
}

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_A_PIN, INPUT);
  pinMode(SENSOR_B_PIN, INPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  display.setBrightness(5);
  display.showNumberDec(0, false);
  Serial.println("people counter ready");
}

void loop() {
  bool a = blocked(sa);
  bool b = blocked(sb);

  if (digitalRead(BUTTON_PIN) == LOW) {
    inside = 0; totalIn = 0; totalOut = 0;
    report("reset");
    while (digitalRead(BUTTON_PIN) == LOW) delay(10);
  }

  if (first == 0) {
    if (a && !b) first = 'A';
    else if (b && !a) first = 'B';
    if (first) { lastAlone = first; passStart = millis(); timedOut = false; }
    return;
  }

  if (a && !b) lastAlone = 'A';
  if (b && !a) lastAlone = 'B';
  if (millis() - passStart > PASS_TIMEOUT_MS) timedOut = true;

  if (!a && !b) {                       // passage finished
    if (timedOut) {
      Serial.println("ignored (blocked too long)");
    } else if (first == 'A' && lastAlone == 'B') {
      inside++; totalIn++;
      report("IN ");
    } else if (first == 'B' && lastAlone == 'A') {
      if (inside > 0) inside--;
      totalOut++;
      report("OUT");
    } else {
      Serial.println("ignored (turned back)");
    }
    first = 0;
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The count never changes and one green LED is always on", ru: "Счёт не меняется, а один зелёный светодиод горит постоянно", kk: "Есеп өзгермейді, ал бір жасыл жарық диоды үнемі жанып тұр" },
      cause: { en: "That sensor sees the far wall or the floor, so it is permanently \"blocked\".", ru: "Этот датчик видит дальнюю стену или пол и постоянно «перекрыт».", kk: "Бұл датчик алыс қабырғаны немесе еденді көреді де, үнемі «жабық» болып тұрады." },
      fix: { en: "Turn its trimmer anticlockwise to shorten the range, or angle it so nothing is within 30 cm when the passage is empty.", ru: "Поверните его подстроечник против часовой стрелки, чтобы уменьшить дальность, или наклоните датчик, чтобы при пустом проходе в 30 см перед ним ничего не было.", kk: "Қашықтықты азайту үшін оның реттегішін сағат тіліне қарсы бұраңыз немесе өткел бос болғанда алдында 30 см ішінде ештеңе болмайтындай датчикті еңкейтіңіз." },
    },
    {
      symptom: { en: "Entries count as exits", ru: "Входы считаются как выходы", kk: "Кірулер шығу болып саналады" },
      cause: { en: "Sensor A is on the inside and B on the outside.", ru: "Датчик A стоит внутри, а B снаружи.", kk: "A датчигі ішінде, ал B сыртында тұр." },
      fix: { en: "Swap the OUT wires on D2 and D3, or swap the two pin numbers in the sketch.", ru: "Поменяйте провода OUT на D2 и D3 или поменяйте номера пинов в скетче.", kk: "D2 мен D3-тегі OUT сымдарын немесе скетчтегі пин нөмірлерін ауыстырыңыз." },
    },
    {
      symptom: { en: "Random counts near a window", ru: "Случайные срабатывания у окна", kk: "Терезе жанында кездейсоқ есептеулер" },
      cause: { en: "Direct sunlight contains a lot of infrared and blinds or triggers the FC-51.", ru: "Прямой солнечный свет содержит много ИК и ослепляет или запускает FC-51.", kk: "Тікелей күн сәулесінде ИҚ көп, ол FC-51-ді соқыр етеді немесе іске қосады." },
      fix: { en: "Shade the sensors with a small hood or mount them away from direct sun.", ru: "Прикройте датчики небольшим козырьком или перенесите их из-под прямого солнца.", kk: "Датчиктерді кішкене күнқағармен жабыңыз немесе тікелей күн түспейтін жерге ауыстырыңыз." },
    },
    {
      symptom: { en: "Display shows nothing", ru: "Индикатор ничего не показывает", kk: "Индикатор ештеңе көрсетпейді" },
      cause: { en: "CLK and DIO swapped, or the display is not getting 5 V.", ru: "Перепутаны CLK и DIO, или на индикатор не приходит 5 В.", kk: "CLK пен DIO ауысқан немесе индикаторға 5 В келмейді." },
      fix: { en: "Check CLK→D5 and DIO→D4 and the VCC wire.", ru: "Проверьте CLK→D5, DIO→D4 и провод VCC.", kk: "CLK→D5, DIO→D4 және VCC сымын тексеріңіз." },
    },
  ],
  safety: [
    { en: "Route the sensor wires along the wall or door frame so nobody trips over them.", ru: "Проложите провода датчиков вдоль стены или дверной коробки, чтобы никто о них не споткнулся.", kk: "Ешкім сүрініп кетпес үшін датчик сымдарын қабырға немесе есік жақтауы бойымен тартыңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "people counter ready",
      "IN   inside=1 (in 1, out 0)",
      "IN   inside=2 (in 2, out 0)",
      "ignored (turned back)",
      "IN   inside=3 (in 3, out 0)",
      "OUT  inside=2 (in 3, out 1)",
      "IN   inside=3 (in 4, out 1)",
      "OUT  inside=2 (in 4, out 2)",
      "OUT  inside=1 (in 4, out 3)",
      "reset  inside=0 (in 0, out 0)",
    ],
    leds: [],
  },
} satisfies GuideContent;
