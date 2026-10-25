import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "smart-trash-can",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "home",
  robotics: false,
  difficulty: "beginner",
  hours: 2,
  costUsd: 20,
  xpReward: 150,
  title: {
    en: "Touchless Smart Trash Can",
    ru: "Бесконтактное умное мусорное ведро",
    kk: "Жанасусыз ақылды қоқыс шелегі",
  },
  summary: {
    en: "Wave a hand over the bin and an HC-SR04 sees it; an MG996R servo lifts the lid and closes it again 3 s after your hand is gone. The servo runs from its own 4×AA pack.",
    ru: "Проведите рукой над ведром, и HC-SR04 это заметит; сервопривод MG996R поднимет крышку и закроет её через 3 с после того, как рука исчезнет. Серво питается от отдельных 4×AA.",
    kk: "Шелектің үстінен қол бұлғасаңыз, HC-SR04 оны байқайды; MG996R сервосы қақпақты көтеріп, қол кеткеннен кейін 3 с өткенде қайта жабады. Серво бөлек 4×AA батареясынан қоректенеді.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB or power bank", ru: "логика 5 В, USB или повербанк", kk: "5 В логика, USB немесе повербанк" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "hc-sr04", qty: 1, spec: { en: "5 V, 2–400 cm", ru: "5 В, 2–400 см", kk: "5 В, 2–400 см" }, role: { en: "Hand detector", ru: "Датчик руки", kk: "Қол датчигі" } },
    { component: "servo-mg996r", qty: 1, spec: { en: "metal gear, ~10 kg·cm", ru: "металлический редуктор, ~10 кг·см", kk: "металл редуктор, ~10 кг·см" }, role: { en: "Lifts the lid", ru: "Поднимает крышку", kk: "Қақпақты көтереді" } },
    { component: "battery-4xaa", qty: 1, spec: { en: "4×AA holder, NiMH (4.8 V) or alkaline (6 V)", ru: "отсек 4×AA, NiMH (4,8 В) или алкалайн (6 В)", kk: "4×AA ұяшығы, NiMH (4,8 В) немесе алкалин (6 В)" }, role: { en: "Servo power", ru: "Питание серво", kk: "Серво қорегі" } },
    { component: "enclosure", qty: 1, spec: { en: "10–20 L bin with a hinged lid", ru: "ведро 10–20 л с откидной крышкой", kk: "ашылмалы қақпағы бар 10–20 л шелек" }, role: { en: "The bin itself", ru: "Само ведро", kk: "Шелектің өзі" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male and male-female, 20 cm", ru: "папа-папа и папа-мама, 20 см", kk: "аталық-аталық және аталық-аналық, 20 см" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "us", component: "hc-sr04", label: "HC-SR04" },
    { id: "servo", component: "servo-mg996r", label: "MG996R lid" },
    { id: "bat", component: "battery-4xaa", label: "4×AA servo" },
  ],
  connections: [
    { from: "board.5V", to: "us.VCC", color: "red" },
    { from: "us.GND", to: "board.GND", color: "black" },
    { from: "board.D7", to: "us.TRIG", color: "yellow" },
    { from: "us.ECHO", to: "board.D6", color: "green" },
    { from: "bat.+", to: "servo.VCC", color: "red", note: { en: "servo power never comes from the Uno", ru: "питание серво никогда не берётся с Uno", kk: "серво қорегі ешқашан Uno-дан алынбайды" } },
    { from: "bat.-", to: "servo.GND", color: "brown" },
    { from: "servo.GND", to: "board.GND2", color: "black", note: { en: "shared ground", ru: "общая земля", kk: "ортақ жер" } },
    { from: "board.D9", to: "servo.SIG", color: "orange" },
  ],
  steps: [
    {
      title: { en: "Mount the servo on the hinge", ru: "Установите серво у петли", kk: "Сервоны топсаға орнатыңыз" },
      body: {
        en: "Fix the MG996R to the back of the bin next to the lid hinge with screws or strong double-sided tape. Join the servo horn to the lid with a stiff wire or a printed arm so that the horn turning about 100° lifts the lid fully. Do not attach the arm yet: the sketch first moves the servo to its closed angle.",
        ru: "Закрепите MG996R на задней стенке ведра рядом с петлёй крышки винтами или прочным двусторонним скотчем. Соедините качалку с крышкой жёсткой проволокой или напечатанным рычагом так, чтобы поворот примерно на 100° полностью поднимал крышку. Рычаг пока не цепляйте: сначала скетч выставит серво в закрытое положение.",
        kk: "MG996R-ді шелектің артқы қабырғасына қақпақ топсасының жанына бұрандамен немесе мықты екі жақты таспамен бекітіңіз. Иін шамамен 100°-қа бұрылғанда қақпақ толық көтерілетіндей етіп, иінді қақпаққа қатты сыммен немесе басып шығарылған тұтқамен жалғаңыз. Тұтқаны әзірге ілмеңіз: алдымен скетч сервоны жабық күйге қояды.",
      },
      expect: { en: "The servo is firmly fixed and its horn can swing freely.", ru: "Серво закреплено жёстко, качалка свободно поворачивается.", kk: "Серво мықты бекітілген, иіні еркін бұрылады." },
      mistake: { en: "Mounting the horn far from the hinge needs much more torque; keep the lever short and close to the hinge.", ru: "Если крепить тягу далеко от петли, нужен намного больший момент; делайте рычаг коротким и ближе к петле.", kk: "Тартқышты топсадан алыс бекітсеңіз, әлдеқайда көп момент керек; тұтқаны қысқа әрі топсаға жақын жасаңыз." },
    },
    {
      title: { en: "Wire the ultrasonic sensor", ru: "Подключите ультразвуковой датчик", kk: "Ультрадыбыс датчигін қосыңыз" },
      body: {
        en: "Mount the HC-SR04 on the front of the bin body (not on the lid), eyes pointing up. Connect VCC to 5V, GND to GND, TRIG to D7 and ECHO to D6.",
        ru: "Закрепите HC-SR04 на передней стенке ведра (не на крышке) «глазами» вверх. Подключите VCC к 5V, GND к GND, TRIG к D7, ECHO к D6.",
        kk: "HC-SR04-ті шелек корпусының алдыңғы жағына (қақпаққа емес) «көздерін» жоғары қаратып бекітіңіз. VCC-ні 5V-қа, GND-ді GND-ге, TRIG-ті D7-ге, ECHO-ны D6-ға қосыңыз.",
      },
      expect: { en: "The sensor looks straight up at the space where a hand would be.", ru: "Датчик смотрит прямо вверх, туда, где будет рука.", kk: "Датчик тура жоғары, қол болатын жерге қарап тұр." },
      mistake: { en: "A sensor fixed to the lid moves with it, sees the ceiling and keeps the lid flapping.", ru: "Датчик на крышке двигается вместе с ней, видит потолок, и крышка начинает хлопать.", kk: "Қақпаққа бекітілген датчик онымен бірге қозғалып, төбені көреді де, қақпақ сарсылып ашылып-жабыла береді." },
    },
    {
      title: { en: "Power the servo from the battery pack", ru: "Запитайте серво от батарейного отсека", kk: "Сервоны батарея ұяшығынан қоректендіріңіз" },
      body: {
        en: "Connect the 4×AA pack: + to the servo's red wire, − to its brown wire. Then join the battery − (servo brown) to an Arduino GND pin and the orange signal wire to D9. An MG996R can pull over 1 A when it starts, far more than the Uno's 5V pin can give.",
        ru: "Подключите отсек 4×AA: плюс к красному проводу серво, минус к коричневому. Затем соедините минус батареи (коричневый провод серво) с пином GND Arduino, а оранжевый сигнальный провод — с D9. При старте MG996R может брать больше 1 А, гораздо больше, чем даёт пин 5V Uno.",
        kk: "4×AA ұяшығын қосыңыз: плюсін сервоның қызыл сымына, минусын қоңыр сымына. Содан кейін батарея минусын (сервоның қоңыр сымын) Arduino-ның GND пинімен, ал қызғылт сары сигнал сымын D9-бен жалғаңыз. Іске қосылғанда MG996R 1 А-ден астам ток алуы мүмкін, бұл Uno-ның 5V пині бере алатыннан әлдеқайда көп.",
      },
      expect: { en: "Two power sources, one shared GND, and only the signal wire on D9.", ru: "Два источника питания, одна общая GND и только сигнальный провод на D9.", kk: "Екі қорек көзі, бір ортақ GND және D9-да тек сигнал сымы." },
      mistake: { en: "Powering the MG996R from the Uno makes the board reset every time the lid starts to move.", ru: "Если питать MG996R от Uno, плата перезагружается каждый раз, когда крышка начинает движение.", kk: "MG996R Uno-дан қоректенсе, қақпақ қозғала бастаған сайын плата қайта жүктеледі." },
    },
    {
      title: { en: "Set the angles and attach the lid", ru: "Настройте углы и прицепите крышку", kk: "Бұрыштарды баптап, қақпақты іліңіз" },
      body: {
        en: "Upload the sketch with the arm still detached; the servo goes to CLOSED_ANGLE (0°). Now attach the arm with the lid closed. Wave your hand: if the lid does not open fully or pushes too far, change OPEN_ANGLE in steps of 10° and upload again.",
        ru: "Загрузите скетч с отцепленным рычагом: серво встанет в CLOSED_ANGLE (0°). Теперь прицепите рычаг при закрытой крышке. Проведите рукой: если крышка открывается не полностью или упирается, меняйте OPEN_ANGLE шагами по 10° и загружайте снова.",
        kk: "Скетчті тұтқа ажыратылған күйде жүктеңіз: серво CLOSED_ANGLE (0°) күйіне барады. Енді қақпақ жабық тұрғанда тұтқаны іліңіз. Қол бұлғаңыз: қақпақ толық ашылмаса немесе тіреліп қалса, OPEN_ANGLE мәнін 10°-тан өзгертіп, қайта жүктеңіз.",
      },
      expect: { en: "The lid rises smoothly in about half a second and stops just past vertical.", ru: "Крышка плавно поднимается примерно за полсекунды и останавливается чуть дальше вертикали.", kk: "Қақпақ шамамен жарты секундта біркелкі көтеріліп, тік күйден сәл әрі тоқтайды." },
      mistake: { en: "An angle that pushes the lid against its stop makes the servo hum, heat up and drain the batteries.", ru: "Если угол прижимает крышку к упору, серво гудит, греется и сажает батарейки.", kk: "Бұрыш қақпақты тірекке қыса берсе, серво гуілдеп, қызады да батареяларды отырғызады." },
    },
    {
      title: { en: "Test the 3-second close", ru: "Проверьте закрытие через 3 секунды", kk: "3 секундтан кейін жабылуын тексеріңіз" },
      body: {
        en: "Open the Serial Monitor at 9600 baud. Hold your hand 5–15 cm above the sensor: the lid opens. Keep your hand there and it stays open. Take it away and the lid closes 3 s later. The sketch needs two close readings in a row before it opens, which filters out stray echoes.",
        ru: "Откройте Serial Monitor на 9600 бод. Держите руку в 5–15 см над датчиком — крышка откроется. Пока рука там, крышка открыта. Уберите руку — через 3 с крышка закроется. Скетч ждёт два близких измерения подряд, прежде чем открыть, это отсекает случайные эхо.",
        kk: "Serial Monitor-ды 9600 бодта ашыңыз. Қолды датчиктен 5–15 см жоғары ұстаңыз — қақпақ ашылады. Қол сонда тұрғанда қақпақ ашық. Қолды алсаңыз, 3 с-тан кейін қақпақ жабылады. Скетч ашпас бұрын қатарынан екі жақын өлшеуді күтеді, бұл кездейсоқ жаңғырықтарды сүзеді.",
      },
      expect: { en: "Serial shows \"hand at 9 cm -> open\" and then \"no hand for 3 s -> close\".", ru: "В Serial «hand at 9 cm -> open», затем «no hand for 3 s -> close».", kk: "Serial-да «hand at 9 cm -> open», содан кейін «no hand for 3 s -> close» шығады." },
      mistake: { en: "Pinging faster than every 60 ms lets old echoes return as false readings.", ru: "Если опрашивать чаще чем раз в 60 мс, старые эхо возвращаются как ложные показания.", kk: "60 мс-тан жиі сұрасаңыз, ескі жаңғырықтар жалған көрсеткіш ретінде қайтады." },
    },
  ],
  code: [{
    filename: "smart_bin.ino",
    language: "cpp",
    libraries: ["Servo"],
    source: `#include <Servo.h>

const int TRIG_PIN = 7;
const int ECHO_PIN = 6;
const int SERVO_PIN = 9;

const int CLOSED_ANGLE = 0;          // tune to your hinge
const int OPEN_ANGLE = 100;
const int OPEN_DISTANCE_CM = 15;     // a hand closer than this opens the lid
const unsigned long CLOSE_AFTER_MS = 3000;

Servo lid;
bool isOpen = false;
unsigned long lastSeen = 0;
int hits = 0;

long readCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  unsigned long us = pulseIn(ECHO_PIN, HIGH, 25000UL);   // about 4 m max
  if (us == 0) return -1;                                 // no echo
  return us / 58;
}

void moveLid(int from, int to) {     // slow sweep: no slam, smaller current peaks
  int step = from < to ? 2 : -2;
  for (int a = from; (step > 0) ? a < to : a > to; a += step) {
    lid.write(a);
    delay(10);
  }
  lid.write(to);
}

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  lid.write(CLOSED_ANGLE);           // set the angle before attach: no jump at boot
  lid.attach(SERVO_PIN);
  Serial.println("Smart bin ready");
}

void loop() {
  long cm = readCm();
  bool hand = (cm > 0 && cm < OPEN_DISTANCE_CM);
  hits = hand ? hits + 1 : 0;

  if (hits >= 2) {                   // two close readings in a row = a real hand
    lastSeen = millis();
    if (!isOpen) {
      Serial.print("hand at ");
      Serial.print(cm);
      Serial.println(" cm -> open");
      moveLid(CLOSED_ANGLE, OPEN_ANGLE);
      isOpen = true;
    }
  }

  if (isOpen && millis() - lastSeen > CLOSE_AFTER_MS) {
    Serial.println("no hand for 3 s -> close");
    moveLid(OPEN_ANGLE, CLOSED_ANGLE);
    isOpen = false;
  }

  delay(60);                         // HC-SR04 needs ~60 ms between pings
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The lid opens by itself every few seconds", ru: "Крышка сама открывается каждые несколько секунд", kk: "Қақпақ бірнеше секунд сайын өздігінен ашылады" },
      cause: { en: "The sensor sees the lid, a shelf or the bin rim within 15 cm.", ru: "Датчик видит крышку, полку или край ведра ближе 15 см.", kk: "Датчик 15 см-ден жақын қақпақты, сөрені немесе шелек жиегін көреді." },
      fix: { en: "Tilt the sensor slightly forward, away from the lid, or lower OPEN_DISTANCE_CM to 10.", ru: "Слегка наклоните датчик вперёд, от крышки, или уменьшите OPEN_DISTANCE_CM до 10.", kk: "Датчикті қақпақтан алысырақ, сәл алға еңкейтіңіз немесе OPEN_DISTANCE_CM мәнін 10-ға дейін азайтыңыз." },
    },
    {
      symptom: { en: "The Arduino resets when the lid moves", ru: "Arduino перезагружается при движении крышки", kk: "Қақпақ қозғалғанда Arduino қайта жүктеледі" },
      cause: { en: "The servo is fed from the Uno, or the batteries are nearly empty.", ru: "Серво питается от Uno, или батарейки почти сели.", kk: "Серво Uno-дан қоректенеді немесе батареялар отыруға жақын." },
      fix: { en: "Keep the servo on the 4×AA pack only and put in fresh cells; a 470 µF capacitor across the pack helps too.", ru: "Питайте серво только от 4×AA и поставьте свежие батарейки; помогает и конденсатор 470 мкФ параллельно отсеку.", kk: "Сервоны тек 4×AA ұяшығынан қоректендіріп, жаңа батареялар салыңыз; ұяшыққа параллель 470 мкФ конденсатор да көмектеседі." },
    },
    {
      symptom: { en: "Serial shows no readings when a hand is there", ru: "В Serial нет срабатываний, хотя рука рядом", kk: "Қол тұрса да, Serial-да ештеңе шықпайды" },
      cause: { en: "TRIG and ECHO are swapped, or the hand is closer than 2 cm.", ru: "Перепутаны TRIG и ECHO, или рука ближе 2 см.", kk: "TRIG пен ECHO ауысқан немесе қол 2 см-ден жақын." },
      fix: { en: "TRIG goes to D7, ECHO to D6; test with your hand 5–15 cm away.", ru: "TRIG — на D7, ECHO — на D6; проверяйте рукой на расстоянии 5–15 см.", kk: "TRIG — D7-ге, ECHO — D6-ға; қолды 5–15 см қашықтықта ұстап тексеріңіз." },
    },
  ],
  safety: [
    { en: "Keep fingers out of the hinge and lever: an MG996R is strong enough to pinch hard.", ru: "Не суйте пальцы в петлю и тягу: MG996R достаточно сильный, чтобы больно прищемить.", kk: "Саусақтарды топса мен тартқышқа тықпаңыз: MG996R қатты қысып алатындай күшті." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "Smart bin ready",
      "hand at 9 cm -> open",
      "no hand for 3 s -> close",
      "hand at 12 cm -> open",
      "no hand for 3 s -> close",
      "hand at 6 cm -> open",
      "no hand for 3 s -> close",
    ],
    leds: [],
  },
} satisfies GuideContent;
