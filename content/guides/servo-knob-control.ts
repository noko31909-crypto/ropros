import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "servo-knob-control",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "robotics",
  robotics: false,
  difficulty: "beginner",
  hours: 1,
  costUsd: 14,
  xpReward: 110,
  title: {
    en: "Servo Knob Control",
    ru: "Управление сервоприводом ручкой",
    kk: "Сервоны тұтқамен басқару",
  },
  summary: {
    en: "Turn a potentiometer and an SG90 servo follows it from 0° to 180°. The servo runs from its own 5 V breadboard supply so the Arduino never browns out.",
    ru: "Крутите потенциометр, и сервопривод SG90 повторяет его от 0° до 180°. Серво питается от отдельного модуля 5 В на макетке, поэтому Arduino не проседает.",
    kk: "Потенциометрді бұрасаңыз, SG90 сервосы оны 0°-тан 180°-қа дейін қайталайды. Серво макет тақтасындағы бөлек 5 В модульден қоректенеді, сондықтан Arduino-ның кернеуі түспейді.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "servo-sg90", qty: 1, spec: { en: "4.8–6 V, 180°", ru: "4,8–6 В, 180°", kk: "4,8–6 В, 180°" }, role: { en: "Moves to the knob angle", ru: "Поворачивается на угол ручки", kk: "Тұтқаның бұрышына бұрылады" } },
    { component: "potentiometer", qty: 1, spec: { en: "10 kΩ linear (B10K)", ru: "10 кОм, линейный (B10K)", kk: "10 кОм, сызықтық (B10K)" }, role: { en: "Angle knob", ru: "Ручка угла", kk: "Бұрыш тұтқасы" } },
    { component: "breadboard-power-module", qty: 1, spec: { en: "MB102, rail jumper on 5 V", ru: "MB102, перемычка шины на 5 В", kk: "MB102, шина секіргіші 5 В-та" }, role: { en: "Separate 5 V for the servo", ru: "Отдельные 5 В для серво", kk: "Сервоға бөлек 5 В" } },
    { component: "battery-9v", qty: 1, spec: { en: "PP3 with DC-jack snap (or a 9 V 1 A adapter)", ru: "«Крона» со штекером (или адаптер 9 В 1 А)", kk: "«Крона» штекерімен (немесе 9 В 1 А адаптер)" }, role: { en: "Feeds the MB102 DC jack", ru: "Питает гнездо MB102", kk: "MB102 ұяшығын қоректендіреді" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "pot", component: "potentiometer", label: "10 kΩ knob" },
    { id: "servo", component: "servo-sg90", label: "SG90" },
    { id: "pm", component: "breadboard-power-module", label: "MB102 5 V" },
    { id: "bat", component: "battery-9v", label: "9 V" },
  ],
  connections: [
    { from: "pot.1", to: "board.5V", color: "red", note: { en: "pot uses the Arduino 5 V, the same reference as the ADC", ru: "потенциометр от 5 В Arduino, той же опоры, что у АЦП", kk: "потенциометр Arduino 5 В-тан, АЦП-мен бір тірек" } },
    { from: "pot.2", to: "board.GND2", color: "black" },
    { from: "pot.W", to: "board.A0", color: "yellow", note: { en: "middle leg (wiper)", ru: "средняя ножка (движок)", kk: "ортаңғы аяқ (жүгірткі)" } },
    { from: "bat.+", to: "pm.VIN", color: "red", note: { en: "into the DC jack", ru: "в гнездо питания", kk: "қуат ұяшығына" } },
    { from: "bat.-", to: "pm.GND", color: "black" },
    { from: "pm.5V", to: "servo.VCC", color: "red", note: { en: "red servo wire", ru: "красный провод серво", kk: "сервоның қызыл сымы" } },
    { from: "pm.GND", to: "servo.GND", color: "brown", note: { en: "brown servo wire", ru: "коричневый провод серво", kk: "сервоның қоңыр сымы" } },
    { from: "board.D9", to: "servo.SIG", color: "orange", note: { en: "orange servo wire", ru: "оранжевый провод серво", kk: "сервоның қызғылт сары сымы" } },
    { from: "pm.GND", to: "board.GND", color: "black", note: { en: "shared ground: without it the servo ignores D9", ru: "общая земля: без неё серво не слушает D9", kk: "ортақ жер: онсыз серво D9-ды тыңдамайды" } },
  ],
  steps: [
    {
      title: { en: "Set up the servo power rail", ru: "Подготовьте шину питания серво", kk: "Сервоның қуат шинасын дайындаңыз" },
      body: {
        en: "Plug the MB102 module onto one end of the breadboard so its pins sit in both power rails. Set the jumper on the servo side to 5 V and the jumper on the other side to OFF. Connect the 9 V battery to the DC jack, but leave the module switch off for now.",
        ru: "Вставьте модуль MB102 в край макетки так, чтобы его штырьки попали в обе шины питания. Перемычку со стороны серво поставьте на 5 В, а с другой стороны — в положение OFF. Подключите батарею 9 В к гнезду, но выключатель модуля пока не включайте.",
        kk: "MB102 модулін макет тақтасының шетіне штырьлары екі қуат шинасына түсетіндей етіп орнатыңыз. Серво жағындағы секіргішті 5 В-қа, ал екінші жағындағыны OFF күйіне қойыңыз. 9 В батареяны ұяшыққа қосыңыз, бірақ модульдің ажыратқышын әзірге қоспаңыз.",
      },
      expect: { en: "One rail pair is marked for 5 V from the MB102, the other rail is unpowered.", ru: "Одна пара шин получает 5 В от MB102, другая обесточена.", kk: "Бір жұп шина MB102-ден 5 В алады, екіншісінде кернеу жоқ." },
      mistake: { en: "Leaving the second jumper on 3.3 V and later plugging the pot into that rail gives a knob that only reaches about 120°.", ru: "Если оставить вторую перемычку на 3,3 В и подключить потенциометр к этой шине, ручка будет доходить только примерно до 120°.", kk: "Екінші секіргішті 3,3 В-та қалдырып, потенциометрді сол шинаға қоссаңыз, тұтқа шамамен 120°-қа ғана жетеді." },
    },
    {
      title: { en: "Wire the potentiometer", ru: "Подключите потенциометр", kk: "Потенциометрді қосыңыз" },
      body: {
        en: "Put the potentiometer on the breadboard. Connect one outer leg to the Arduino 5V pin, the other outer leg to Arduino GND, and the middle leg (wiper) to A0. The pot is powered by the Arduino, not by the MB102, because analogRead() measures against the Arduino's own 5 V.",
        ru: "Установите потенциометр на макетку. Одну крайнюю ножку соедините с пином 5V Arduino, другую крайнюю — с GND Arduino, а среднюю (движок) — с A0. Потенциометр питается от Arduino, а не от MB102, потому что analogRead() измеряет относительно собственных 5 В Arduino.",
        kk: "Потенциометрді макет тақтасына қойыңыз. Бір шеткі аяғын Arduino-ның 5V пиніне, екінші шеткі аяғын Arduino GND-іне, ал ортаңғы аяғын (жүгірткіні) A0-ге қосыңыз. Потенциометр MB102-ден емес, Arduino-дан қоректенеді, өйткені analogRead() Arduino-ның өз 5 В кернеуіне қатысты өлшейді.",
      },
      expect: { en: "Three wires: 5V, GND and A0, all from the Arduino header.", ru: "Три провода: 5V, GND и A0, все от разъёма Arduino.", kk: "Үш сым: 5V, GND және A0, бәрі Arduino разъёмынан." },
      mistake: { en: "Wiring the wiper to an outer pin of the pot makes A0 read a fixed 0 or 1023.", ru: "Если подключить A0 к крайней ножке, а не к средней, показание будет всегда 0 или 1023.", kk: "A0-ді ортаңғы емес, шеткі аяққа қоссаңыз, көрсеткіш әрдайым 0 немесе 1023 болады." },
    },
    {
      title: { en: "Connect the servo", ru: "Подключите сервопривод", kk: "Сервоны қосыңыз" },
      body: {
        en: "The SG90 has three wires: brown = GND, red = +5 V, orange = signal. Plug brown and red into the MB102 5 V rail pair, then run the orange wire to D9. Finally add one wire from the MB102 GND rail to an Arduino GND pin so both sides share ground.",
        ru: "У SG90 три провода: коричневый = GND, красный = +5 В, оранжевый = сигнал. Коричневый и красный вставьте в шины MB102 с 5 В, оранжевый проведите к D9. В конце добавьте провод от шины GND модуля MB102 к пину GND Arduino, чтобы земля была общей.",
        kk: "SG90-да үш сым бар: қоңыр = GND, қызыл = +5 В, қызғылт сары = сигнал. Қоңыр мен қызылды MB102-нің 5 В шиналарына қосыңыз, ал қызғылт сарыны D9-ға тартыңыз. Соңында жер ортақ болуы үшін MB102 GND шинасынан Arduino-ның GND пиніне бір сым қосыңыз.",
      },
      expect: { en: "Servo power comes only from the MB102; only the orange wire and one GND wire go to the Arduino.", ru: "Питание серво идёт только от MB102; к Arduino идут лишь оранжевый провод и один провод GND.", kk: "Сервоның қуаты тек MB102-ден келеді; Arduino-ға тек қызғылт сары сым мен бір GND сымы барады." },
      mistake: { en: "Forgetting the shared GND wire: the servo twitches randomly or does not move at all.", ru: "Забыли общий провод GND: серво дёргается хаотично или вообще не двигается.", kk: "Ортақ GND сымын ұмытсаңыз: серво ретсіз дірілдейді немесе мүлде қозғалмайды." },
    },
    {
      title: { en: "Upload and calibrate", ru: "Загрузите скетч и откалибруйте", kk: "Скетчті жүктеп, калибрлеңіз" },
      body: {
        en: "Upload the sketch over USB, open the Serial Monitor at 9600 baud and switch the MB102 on. Turn the knob slowly from one end to the other. The sketch averages 8 readings and ignores changes under 2°, so the servo holds still when you stop turning.",
        ru: "Загрузите скетч по USB, откройте Serial Monitor на 9600 бод и включите MB102. Медленно поверните ручку от упора до упора. Скетч усредняет 8 измерений и игнорирует изменения меньше 2°, поэтому серво стоит неподвижно, когда вы отпускаете ручку.",
        kk: "Скетчті USB арқылы жүктеп, Serial Monitor-ды 9600 бодта ашыңыз да, MB102-ні қосыңыз. Тұтқаны бір шетінен екінші шетіне баяу бұраңыз. Скетч 8 өлшеудің орташасын алады және 2°-тан аз өзгерісті елемейді, сондықтан тұтқаны тоқтатқанда серво қозғалмай тұрады.",
      },
      expect: { en: "Serial shows pot=0 angle=0 at one end and pot=1023 angle=180 at the other; the horn follows the knob smoothly.", ru: "В Serial на одном упоре pot=0 angle=0, на другом pot=1023 angle=180; качалка плавно следует за ручкой.", kk: "Serial-да бір шетте pot=0 angle=0, екінші шетте pot=1023 angle=180; серво иіні тұтқаға біркелкі ереді." },
      mistake: { en: "If the servo buzzes at 0° or 180°, it is pushing against its end stop; limit the map() range to 5–175.", ru: "Если серво жужжит на 0° или 180°, оно упирается в свой ограничитель; сузьте диапазон map() до 5–175.", kk: "Серво 0° немесе 180°-та ызыңдаса, ол өз тірегіне тіреліп тұр; map() ауқымын 5–175-ке дейін тарылтыңыз." },
    },
  ],
  code: [{
    filename: "servo_knob.ino",
    language: "cpp",
    libraries: ["Servo"],
    source: `#include <Servo.h>

const int POT_PIN = A0;     // potentiometer wiper
const int SERVO_PIN = 9;    // SG90 orange wire

Servo servo;
int lastAngle = -1;

void setup() {
  Serial.begin(9600);
  servo.attach(SERVO_PIN);
}

void loop() {
  // average 8 readings to calm the noise of a cheap potentiometer
  long sum = 0;
  for (int i = 0; i < 8; i++) sum += analogRead(POT_PIN);
  int raw = sum / 8;

  int angle = map(raw, 0, 1023, 0, 180);

  // deadband: only move when the knob really changed
  if (lastAngle < 0 || abs(angle - lastAngle) >= 2) {
    servo.write(angle);
    lastAngle = angle;
    Serial.print("pot=");
    Serial.print(raw);
    Serial.print(" angle=");
    Serial.println(angle);
  }
  delay(15);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The servo jitters even when the knob is still", ru: "Серво дрожит, даже когда ручку не трогают", kk: "Тұтқаны ұстамаса да серво дірілдейді" },
      cause: { en: "Missing shared GND, or a weak 9 V battery sagging when the servo moves.", ru: "Нет общей земли, или «Крона» разряжена и проседает при движении серво.", kk: "Ортақ жер жоқ немесе «Крона» әлсіреп, серво қозғалғанда кернеуі түседі." },
      fix: { en: "Check the MB102 GND to Arduino GND wire, then try a fresh battery or a 9 V 1 A adapter in the DC jack.", ru: "Проверьте провод от GND MB102 к GND Arduino, затем поставьте свежую батарею или адаптер 9 В 1 А в гнездо.", kk: "MB102 GND-інен Arduino GND-іне баратын сымды тексеріңіз, содан кейін жаңа батарея немесе 9 В 1 А адаптер қосыңыз." },
    },
    {
      symptom: { en: "The servo does not move but Serial shows changing angles", ru: "Серво не двигается, хотя в Serial углы меняются", kk: "Serial-да бұрыштар өзгеріп тұрса да, серво қозғалмайды" },
      cause: { en: "The MB102 is switched off, its jumper is on OFF, or the servo plug is shifted by one row.", ru: "MB102 выключен, перемычка стоит на OFF, или разъём серво сдвинут на один ряд.", kk: "MB102 өшірулі, секіргіш OFF күйінде немесе серво разъёмы бір қатарға жылжып кеткен." },
      fix: { en: "Turn the module on (its LED lights), move the jumper to 5 V and check brown/red/orange land on GND/5 V/D9.", ru: "Включите модуль (загорится его светодиод), переставьте перемычку на 5 В и проверьте, что коричневый/красный/оранжевый попали на GND/5 В/D9.", kk: "Модульді қосыңыз (оның жарық диоды жанады), секіргішті 5 В-қа ауыстырыңыз және қоңыр/қызыл/қызғылт сары GND/5 В/D9-ға түскенін тексеріңіз." },
    },
    {
      symptom: { en: "The servo covers only part of the range", ru: "Серво проходит только часть диапазона", kk: "Серво ауқымның бір бөлігін ғана жүреді" },
      cause: { en: "The pot is fed from the 3.3 V rail, or the wiper and an outer leg are swapped.", ru: "Потенциометр питается от шины 3,3 В, или перепутаны средняя и крайняя ножки.", kk: "Потенциометр 3,3 В шинасынан қоректенеді немесе ортаңғы мен шеткі аяқтар ауысып кеткен." },
      fix: { en: "Feed the pot from the Arduino 5V pin and make sure only the middle leg goes to A0.", ru: "Питайте потенциометр от пина 5V Arduino и убедитесь, что к A0 идёт только средняя ножка.", kk: "Потенциометрді Arduino-ның 5V пинінен қоректендіріңіз және A0-ге тек ортаңғы аяқ баратынын тексеріңіз." },
    },
  ],
  safety: [
    { en: "Never join the MB102 5 V rail to the Arduino 5V pin; share only GND between the two supplies.", ru: "Никогда не соединяйте шину 5 В модуля MB102 с пином 5V Arduino; между двумя источниками общий только GND.", kk: "MB102-нің 5 В шинасын Arduino-ның 5V пинімен ешқашан қоспаңыз; екі қорек көзінің арасында тек GND ортақ." },
    { en: "Keep fingers away from the servo horn while testing; at stall an SG90 can pinch.", ru: "Не держите пальцы у качалки серво во время теста: у упора SG90 может прищемить.", kk: "Сынау кезінде саусақтарыңызды серво иінінен алыс ұстаңыз: SG90 қысып қалуы мүмкін." },
  ],
  simulation: {
    baud: 9600,
    lines: ["pot=0 angle=0", "pot=128 angle=22", "pot=256 angle=45", "pot=512 angle=90", "pot=768 angle=135", "pot=900 angle=158", "pot=1023 angle=180", "pot=512 angle=90"],
    leds: [],
  },
} satisfies GuideContent;
