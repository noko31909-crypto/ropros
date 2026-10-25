import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "ultrasonic-radar",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "sensors",
  robotics: false,
  difficulty: "beginner",
  hours: 2.5,
  costUsd: 17,
  xpReward: 170,
  title: {
    en: "Ultrasonic Radar Sweep",
    ru: "Ультразвуковой радар",
    kk: "Ультрадыбыстық радар",
  },
  summary: {
    en: "An SG90 servo sweeps an HC-SR04 from 15° to 165° and streams angle,distance pairs; a small Python viewer turns them into a green radar screen.",
    ru: "Сервопривод SG90 поворачивает HC-SR04 от 15° до 165° и передаёт пары угол,расстояние; небольшая программа на Python рисует из них зелёный экран радара.",
    kk: "SG90 серво жетегі HC-SR04-ті 15°-тан 165°-қа дейін бұрып, бұрыш,қашықтық жұптарын жібереді; шағын Python бағдарламасы олардан жасыл радар экранын салады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB to the computer", ru: "логика 5 В, USB к компьютеру", kk: "5 В логика, компьютерге USB" }, role: { en: "Controller and serial link", ru: "Контроллер и связь по Serial", kk: "Контроллер және Serial байланысы" } },
    { component: "hc-sr04", qty: 1, spec: { en: "5 V, 2–400 cm", ru: "5 В, 2–400 см", kk: "5 В, 2–400 см" }, role: { en: "Distance sensor", ru: "Датчик расстояния", kk: "Қашықтық датчигі" } },
    { component: "servo-sg90", qty: 1, spec: { en: "9 g micro servo, 180°", ru: "микросервопривод 9 г, 180°", kk: "9 г микро серво жетек, 180°" }, role: { en: "Sweeps the sensor", ru: "Поворачивает датчик", kk: "Датчикті бұрады" } },
    { component: "breadboard-power-module", qty: 1, spec: { en: "MB102, jumper set to 5 V on the servo rail", ru: "MB102, перемычка на 5 В на шине сервопривода", kk: "MB102, серво шинасында секіргіш 5 В күйінде" }, role: { en: "Separate 5 V for the servo", ru: "Отдельные 5 В для сервопривода", kk: "Серво жетекке бөлек 5 В" } },
    { component: "battery-9v", qty: 1, spec: { en: "PP3 with barrel-jack lead, or a 9 V 1 A adapter in the MB102 jack", ru: "«Крона» со штекером, или адаптер 9 В 1 А в гнездо MB102", kk: "Штекері бар PP3, немесе MB102 ұясына 9 В 1 А адаптер" }, role: { en: "Feeds the MB102", ru: "Питает MB102", kk: "MB102-ні қоректендіреді" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points (fits the MB102)", ru: "830 точек (под MB102)", kk: "830 нүкте (MB102-ге сай)" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 12, spec: { en: "male-male and female-male", ru: "папа-папа и мама-папа", kk: "аталық-аталық және аналық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "us", component: "hc-sr04", label: "HC-SR04" },
    { id: "sv", component: "servo-sg90", label: "Sweep servo" },
    { id: "pm", component: "breadboard-power-module", label: "MB102 5 V" },
    { id: "bat", component: "battery-9v", label: "9 V" },
  ],
  connections: [
    { from: "bat.+", to: "pm.VIN", color: "red", note: { en: "into the MB102 barrel jack", ru: "в гнездо питания MB102", kk: "MB102 қоректену ұясына" } },
    { from: "bat.-", to: "pm.GND", color: "black" },
    { from: "pm.5V", to: "sv.VCC", color: "red", note: { en: "servo red wire, NOT to Arduino 5V", ru: "красный провод серво, НЕ к 5V Arduino", kk: "сервоның қызыл сымы, Arduino 5V-ке ЕМЕС" } },
    { from: "sv.GND", to: "pm.GND", color: "brown", note: { en: "servo brown wire", ru: "коричневый провод серво", kk: "сервоның қоңыр сымы" } },
    { from: "pm.GND", to: "board.GND2", color: "black", note: { en: "shared ground: required", ru: "общая земля: обязательно", kk: "ортақ жер: міндетті" } },
    { from: "board.D9", to: "sv.SIG", color: "orange", note: { en: "servo orange wire", ru: "оранжевый провод серво", kk: "сервоның қызғылт сары сымы" } },
    { from: "us.VCC", to: "board.5V", color: "red" },
    { from: "us.GND", to: "board.GND", color: "black" },
    { from: "board.D10", to: "us.TRIG", color: "yellow" },
    { from: "us.ECHO", to: "board.D11", color: "green" },
  ],
  steps: [
    {
      title: { en: "Set up the servo power rail", ru: "Подготовьте шину питания сервопривода", kk: "Серво жетектің қоректену шинасын дайындаңыз" },
      body: {
        en: "Press the MB102 onto one end of the breadboard so its pins sit in the power rails. Set the jumper of the rail you will use to 5V (not 3.3V) and leave the module switched off. Plug the 9 V battery lead (or a 9 V adapter) into its barrel jack. A sweeping SG90 pulls up to ~650 mA in short bursts; on the Uno's own 5V pin those bursts cause resets and corrupt serial data, so the servo gets this rail.",
        ru: "Вставьте MB102 в торец макетки так, чтобы его выводы попали в шины питания. Перемычку нужной шины поставьте на 5V (не 3.3V), модуль пока не включайте. Вставьте штекер «кроны» (или адаптера 9 В) в его гнездо. При движении SG90 кратко потребляет до ~650 мА; от собственного 5V Uno такие броски вызывают перезагрузки и порчу данных в Serial, поэтому сервопривод питается от этой шины.",
        kk: "MB102-ні шықпалары қоректену шиналарына түсетіндей етіп макет тақтасының шетіне орнатыңыз. Қолданатын шинаның секіргішін 5V-ке қойыңыз (3.3V емес), модульді әзірге қоспаңыз. 9 В батареяның штекерін (немесе 9 В адаптерді) оның ұясына сұғыңыз. Қозғалған SG90 қысқа уақытқа ~650 мА дейін тартады; Uno-ның өз 5V пинінен мұндай секірулер қайта жүктелуге және Serial деректерінің бұзылуына әкеледі, сондықтан серво жетек осы шинадан қоректенеді.",
      },
      expect: { en: "With the module switched on, its LED lights and a multimeter shows ~5 V on the rail.", ru: "Если включить модуль, загорается его светодиод, а мультиметр показывает на шине ~5 В.", kk: "Модульді қосқанда оның жарық диоды жанады, ал мультиметр шинада ~5 В көрсетеді." },
      mistake: { en: "Never join the MB102 5V rail to the Arduino 5V pin: two regulators fighting each other. Only GND is shared.", ru: "Никогда не соединяйте шину 5V MB102 с пином 5V Arduino: два стабилизатора начнут бороться. Общей делается только GND.", kk: "MB102 5V шинасын ешқашан Arduino 5V пиніне қоспаңыз: екі тұрақтандырғыш бір-бірімен таласады. Тек GND ортақ болады." },
    },
    {
      title: { en: "Connect the servo and share ground", ru: "Подключите сервопривод и общую землю", kk: "Серво жетекті қосып, жерді ортақтаңыз" },
      body: {
        en: "Servo red → MB102 5V rail, brown → MB102 GND rail, orange (signal) → Arduino D9. Then run one wire from the MB102 GND rail to an Arduino GND pin. Without that shared ground the signal on D9 has no reference and the servo jitters or ignores it.",
        ru: "Красный провод серво → шина 5V MB102, коричневый → шина GND MB102, оранжевый (сигнал) → D9 Arduino. Затем проведите один провод от шины GND MB102 к пину GND Arduino. Без общей земли у сигнала на D9 нет опоры, и сервопривод дёргается или не реагирует.",
        kk: "Сервоның қызыл сымы → MB102 5V шинасы, қоңыр → MB102 GND шинасы, қызғылт сары (сигнал) → Arduino D9. Содан кейін MB102 GND шинасынан Arduino GND пиніне бір сым тартыңыз. Ортақ жер болмаса, D9-дағы сигналдың тірегі болмайды да, серво жетек дірілдейді немесе жауап бермейді.",
      },
      expect: { en: "Three servo wires plus one GND bridge between the MB102 and the Arduino.", ru: "Три провода серво плюс одна перемычка GND между MB102 и Arduino.", kk: "Сервоның үш сымы және MB102 мен Arduino арасындағы бір GND жалғағышы." },
      mistake: { en: "Forgetting the GND bridge is the number-one reason a separately powered servo \"does nothing\".", ru: "Забытая перемычка GND это причина номер один, почему отдельно запитанный сервопривод «ничего не делает».", kk: "Ұмытылған GND жалғағышы бөлек қоректенетін серво жетектің «ештеңе істемеуінің» бірінші себебі." },
    },
    {
      title: { en: "Mount the sensor on the servo", ru: "Закрепите датчик на сервоприводе", kk: "Датчикті серво жетекке бекітіңіз" },
      body: {
        en: "Upload the sketch with only the servo connected and switch the MB102 on: the servo parks at 15° and starts sweeping. Switch the MB102 off just as the shaft passes the middle of the sweep (about 90°); it stops there. Fit the straight horn crosswise and stick the HC-SR04 to it with double-sided foam tape or hot glue, transducers facing forward. Fix the servo body to the table or a small box so the sweep does not walk it around.",
        ru: "Загрузите скетч, когда подключён только сервопривод, и включите MB102: серво встанет на 15° и начнёт качаться. Выключите MB102 в момент, когда вал проходит середину хода (около 90°), и он там остановится. Наденьте прямую качалку поперёк и приклейте к ней HC-SR04 двусторонним вспененным скотчем или термоклеем, излучателями вперёд. Закрепите корпус серво на столе или на коробочке, чтобы его не сдвигало при качании.",
        kk: "Тек серво жетек қосулы күйде скетчті жүктеп, MB102-ні қосыңыз: серво 15°-қа тұрып, тербеле бастайды. Білік жүрістің ортасынан (шамамен 90°) өтіп бара жатқанда MB102-ні өшіріңіз, ол сол жерде тоқтайды. Түзу иінтіректі көлденең кигізіңіз де, HC-SR04-ті оған екі жақты көбік таспамен немесе ыстық желіммен сәулелендіргіштерін алға қаратып жабыстырыңыз. Тербелгенде жылжып кетпес үшін серво корпусын үстелге немесе кішкене қорапқа бекітіңіз.",
      },
      expect: { en: "The sensor faces straight ahead when the servo is at 90°.", ru: "При 90° на сервоприводе датчик смотрит прямо вперёд.", kk: "Серво 90°-та тұрғанда датчик тура алға қарайды." },
      mistake: { en: "Forcing the shaft by hand while the servo is powered fights the motor and can strip its plastic gears.", ru: "Если силой крутить вал рукой, пока серво под питанием, мотор сопротивляется, и пластиковые шестерни могут сломаться.", kk: "Серво қоректе тұрғанда білікті қолмен күштеп бұрасаңыз, мотор қарсыласады да, пластик тісті доңғалақтар сынуы мүмкін." },
    },
    {
      title: { en: "Wire the HC-SR04", ru: "Подключите HC-SR04", kk: "HC-SR04-ті қосыңыз" },
      body: {
        en: "Use female-male wires long enough not to pull on the sensor during the sweep: VCC → Arduino 5V, GND → Arduino GND, TRIG → D10, ECHO → D11. The HC-SR04 only draws ~15 mA, so the Uno's 5V pin is fine for it. Its 5 V ECHO pulse is safe on the Uno, which is a 5 V board.",
        ru: "Возьмите провода мама-папа такой длины, чтобы они не тянули датчик при качании: VCC → 5V Arduino, GND → GND Arduino, TRIG → D10, ECHO → D11. HC-SR04 берёт всего ~15 мА, поэтому пина 5V Uno ему хватает. Импульс ECHO 5 В безопасен для Uno, это плата на 5 В.",
        kk: "Тербелген кезде датчикті тартпайтындай ұзындықтағы аналық-аталық сымдарды алыңыз: VCC → Arduino 5V, GND → Arduino GND, TRIG → D10, ECHO → D11. HC-SR04 небәрі ~15 мА алады, сондықтан оған Uno-ның 5V пині жеткілікті. ECHO-ның 5 В импульсі Uno үшін қауіпсіз, бұл 5 В-тық плата.",
      },
      expect: { en: "Four sensor wires to the Arduino, with enough slack for a full sweep.", ru: "Четыре провода датчика к Arduino с запасом длины на полный поворот.", kk: "Датчиктің Arduino-ға төрт сымы, толық бұрылуға жететін еркіндігі бар." },
      mistake: { en: "Swapping TRIG and ECHO gives a constant 0 cm (no echo).", ru: "Если перепутать TRIG и ECHO, всё время будет 0 см (нет эха).", kk: "TRIG пен ECHO-ны ауыстырсаңыз, үнемі 0 см болады (жаңғырық жоқ)." },
    },
    {
      title: { en: "Upload and check the data stream", ru: "Загрузите скетч и проверьте поток данных", kk: "Скетчті жүктеп, деректер ағынын тексеріңіз" },
      body: {
        en: "Switch the MB102 on, upload the sketch and open the Serial Monitor at 9600 baud. The servo steps one degree at a time from 15° to 165° and back, waiting 30 ms per step, and prints a line such as \"72,46\": angle in degrees, distance in cm. 0 means no echo within the 30 ms timeout (nothing within about 5 m, or a soft or angled surface).",
        ru: "Включите MB102, загрузите скетч и откройте Serial Monitor на 9600 бод. Сервопривод шагает по одному градусу от 15° до 165° и обратно, ожидая 30 мс на шаг, и печатает строку вроде «72,46»: угол в градусах, расстояние в см. 0 означает, что эха за 30 мс не было (ничего ближе ~5 м, или мягкая либо наклонная поверхность).",
        kk: "MB102-ні қосып, скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Серво жетек 15°-тан 165°-қа дейін және кері бір-бір градустан қадамдап, әр қадамға 30 мс күтеді және «72,46» сияқты жол шығарады: бұрыш градуспен, қашықтық см-мен. 0 деген 30 мс ішінде жаңғырық болмағанын білдіреді (~5 м ішінде ештеңе жоқ немесе бет жұмсақ не көлбеу).",
      },
      expect: { en: "A steady stream of angle,distance lines; your hand in front shows a small distance.", ru: "Ровный поток строк угол,расстояние; рука перед датчиком даёт маленькое расстояние.", kk: "Бұрыш,қашықтық жолдарының тұрақты ағыны; датчик алдындағы қол кіші қашықтық береді." },
      mistake: { en: "Random resets or garbage characters mean the servo is drawing from the Arduino after all; recheck that its red wire is on the MB102 rail.", ru: "Случайные перезагрузки или мусорные символы значат, что серво всё же питается от Arduino; проверьте, что его красный провод на шине MB102.", kk: "Кездейсоқ қайта жүктелулер немесе қоқыс таңбалар серво бәрібір Arduino-дан қоректеніп тұрғанын білдіреді; оның қызыл сымы MB102 шинасында екенін тексеріңіз." },
    },
    {
      title: { en: "Draw the radar screen", ru: "Нарисуйте экран радара", kk: "Радар экранын салыңыз" },
      body: {
        en: "Close the Serial Monitor (only one program can own the port). On the computer run pip install pyserial matplotlib, then python radar_view.py COM3 on Windows or python3 radar_view.py /dev/ttyACM0 on Linux/macOS (the port name is shown in the Arduino IDE under Tools → Port). A half-circle radar opens: the green line follows the servo and red dots mark echoes up to 2 m, refreshed on every sweep.",
        ru: "Закройте Serial Monitor (порт может занимать только одна программа). На компьютере выполните pip install pyserial matplotlib, затем python radar_view.py COM3 в Windows или python3 radar_view.py /dev/ttyACM0 в Linux/macOS (имя порта видно в Arduino IDE в меню Инструменты → Порт). Откроется полукруглый радар: зелёная линия следует за сервоприводом, красные точки отмечают эхо до 2 м и обновляются на каждом проходе.",
        kk: "Serial Monitor-ды жабыңыз (портты тек бір бағдарлама иелене алады). Компьютерде pip install pyserial matplotlib орындаңыз, содан кейін Windows-та python radar_view.py COM3 немесе Linux/macOS-та python3 radar_view.py /dev/ttyACM0 іске қосыңыз (порт атауы Arduino IDE-де Құралдар → Порт мәзірінде көрінеді). Жарты шеңбер радар ашылады: жасыл сызық серво жетекке ілеседі, ал қызыл нүктелер 2 м-ге дейінгі жаңғырықтарды белгілеп, әр өткен сайын жаңарады.",
      },
      expect: { en: "Walls and objects around the sensor appear as arcs of red dots.", ru: "Стены и предметы вокруг датчика видны как дуги из красных точек.", kk: "Датчик айналасындағы қабырғалар мен заттар қызыл нүктелердің доғалары болып көрінеді." },
      mistake: { en: "\"Access denied\" or \"port busy\" means the Serial Monitor or another program still has the port open.", ru: "«Access denied» или «port busy» значит, что Serial Monitor или другая программа всё ещё держит порт.", kk: "«Access denied» немесе «port busy» Serial Monitor не басқа бағдарлама портты әлі ұстап тұрғанын білдіреді." },
    },
  ],
  code: [
    {
      filename: "ultrasonic_radar.ino",
      language: "cpp",
      libraries: ["Servo"],
      source: `// Ultrasonic radar: an SG90 sweeps an HC-SR04 and prints "angle,distance" lines.
// Servo powered from the MB102 5 V rail, GND shared with the Arduino.
#include <Servo.h>

const int TRIG_PIN = 10;
const int ECHO_PIN = 11;
const int SERVO_PIN = 9;
const int MIN_ANGLE = 15;
const int MAX_ANGLE = 165;

Servo radar;

// Distance in cm, or 0 when no echo comes back within 30 ms (about 5 m).
int measureCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  unsigned long echoUs = pulseIn(ECHO_PIN, HIGH, 30000UL);
  return echoUs / 58;                       // 58 us per cm, there and back
}

void scanAt(int angle) {
  radar.write(angle);
  delay(30);                                // let the servo arrive and old echoes die out
  int cm = measureCm();
  Serial.print(angle);
  Serial.print(',');
  Serial.println(cm);
}

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  radar.attach(SERVO_PIN);
  radar.write(MIN_ANGLE);
  delay(500);
}

void loop() {
  for (int a = MIN_ANGLE; a <= MAX_ANGLE; a++) scanAt(a);
  for (int a = MAX_ANGLE; a >= MIN_ANGLE; a--) scanAt(a);
}`,
    },
    {
      filename: "radar_view.py",
      language: "python",
      libraries: ["pyserial", "matplotlib", "numpy"],
      source: `"""Radar screen for the Arduino ultrasonic radar.

Reads "angle,distance" lines from the serial port and draws them on a half-circle plot.
Usage: python3 radar_view.py /dev/ttyACM0   (Windows: python radar_view.py COM3)
"""
import sys
from math import radians

import matplotlib.pyplot as plt
import numpy as np
import serial

PORT = sys.argv[1] if len(sys.argv) > 1 else "/dev/ttyACM0"
BAUD = 9600
MAX_CM = 200  # echoes further than this are not drawn

link = serial.Serial(PORT, BAUD, timeout=1)
echoes = {}  # angle -> distance in cm
angle = 90

plt.ion()
fig = plt.figure("Ultrasonic radar", facecolor="black")
ax = fig.add_subplot(projection="polar", facecolor="black")
ax.set_thetamin(0)
ax.set_thetamax(180)
ax.set_ylim(0, MAX_CM)
ax.tick_params(colors="#2EE6C9")
ax.grid(color="#1B5E20")
(beam,) = ax.plot([], [], color="#00E676", linewidth=2)
dots = ax.scatter([], [], color="#FF5252", s=14)

while plt.fignum_exists(fig.number):
    while link.in_waiting:
        line = link.readline().decode(errors="ignore").strip()
        parts = line.split(",")
        if len(parts) != 2 or not all(p.isdigit() for p in parts):
            continue
        angle, dist = int(parts[0]), int(parts[1])
        if 0 < dist <= MAX_CM:
            echoes[angle] = dist
        else:
            echoes.pop(angle, None)

    a = radians(angle)
    beam.set_data([a, a], [0, MAX_CM])
    points = [(radians(k), v) for k, v in echoes.items()]
    dots.set_offsets(np.array(points) if points else np.empty((0, 2)))
    plt.pause(0.05)

link.close()`,
    },
  ],
  troubleshooting: [
    {
      symptom: { en: "The servo twitches or does not move, but the Arduino runs", ru: "Сервопривод дёргается или не двигается, хотя Arduino работает", kk: "Arduino жұмыс істеп тұр, бірақ серво жетек дірілдейді немесе қозғалмайды" },
      cause: { en: "No shared GND between the MB102 and the Arduino, the MB102 is switched off, or its jumper is on 3.3 V.", ru: "Нет общей GND между MB102 и Arduino, MB102 выключен, или перемычка стоит на 3.3 В.", kk: "MB102 мен Arduino арасында ортақ GND жоқ, MB102 өшірулі немесе оның секіргіші 3.3 В күйінде." },
      fix: { en: "Add the MB102 GND → Arduino GND wire, press the MB102 power button and set the rail jumper to 5V.", ru: "Добавьте провод GND MB102 → GND Arduino, нажмите кнопку питания MB102 и поставьте перемычку шины на 5V.", kk: "MB102 GND → Arduino GND сымын қосып, MB102 қуат батырмасын басыңыз және шина секіргішін 5V-ке қойыңыз." },
    },
    {
      symptom: { en: "The Arduino resets or the serial data turns to garbage when the servo moves", ru: "Arduino перезагружается или данные Serial превращаются в мусор, когда двигается серво", kk: "Серво қозғалғанда Arduino қайта жүктеледі немесе Serial деректері қоқысқа айналады" },
      cause: { en: "The servo is powered from the Arduino 5V pin, or the 9 V battery is nearly flat.", ru: "Серво питается от пина 5V Arduino, или «крона» почти села.", kk: "Серво Arduino 5V пинінен қоректенеді немесе 9 В батарея отырып қалған." },
      fix: { en: "Keep the servo's red wire on the MB102 rail only; replace the PP3 or use a 9 V 1 A adapter, which also lasts far longer.", ru: "Красный провод серво держите только на шине MB102; замените «крону» или возьмите адаптер 9 В 1 А, его хватает намного дольше.", kk: "Сервоның қызыл сымын тек MB102 шинасында ұстаңыз; PP3-ті ауыстырыңыз немесе әлдеқайда ұзақ жұмыс істейтін 9 В 1 А адаптерді алыңыз." },
    },
    {
      symptom: { en: "Distances are always 0", ru: "Расстояние всегда 0", kk: "Қашықтық әрқашан 0" },
      cause: { en: "TRIG and ECHO are swapped, the sensor has no 5 V, or nothing is within range.", ru: "Перепутаны TRIG и ECHO, на датчике нет 5 В, или в зоне действия ничего нет.", kk: "TRIG пен ECHO ауысқан, датчикте 5 В жоқ немесе әрекет аймағында ештеңе жоқ." },
      fix: { en: "Check TRIG → D10, ECHO → D11 and VCC → 5V, then hold a book 30 cm in front of the sensor.", ru: "Проверьте TRIG → D10, ECHO → D11 и VCC → 5V, затем поставьте книгу в 30 см перед датчиком.", kk: "TRIG → D10, ECHO → D11 және VCC → 5V тексеріп, датчиктің алдына 30 см қашықтыққа кітап ұстаңыз." },
    },
    {
      symptom: { en: "The radar window opens but stays empty", ru: "Окно радара открывается, но остаётся пустым", kk: "Радар терезесі ашылады, бірақ бос қалады" },
      cause: { en: "Wrong port name, or the baud rate in radar_view.py does not match Serial.begin(9600).", ru: "Неверное имя порта, или скорость в radar_view.py не совпадает с Serial.begin(9600).", kk: "Порт атауы қате немесе radar_view.py ішіндегі жылдамдық Serial.begin(9600)-ге сәйкес келмейді." },
      fix: { en: "Pass the exact port from Tools → Port and keep BAUD = 9600 on both sides.", ru: "Передайте точное имя порта из Инструменты → Порт и держите BAUD = 9600 с обеих сторон.", kk: "Құралдар → Порт мәзіріндегі нақты порт атауын беріңіз және екі жақта да BAUD = 9600 болсын." },
    },
  ],
  safety: [
    { en: "Never tie the MB102 5V output to the Arduino 5V pin; share only GND between the two supplies.", ru: "Никогда не соединяйте выход 5V MB102 с пином 5V Arduino; между двумя источниками общей должна быть только GND.", kk: "MB102 5V шығысын ешқашан Arduino 5V пиніне қоспаңыз; екі қорек көзі арасында тек GND ортақ болуы керек." },
    { en: "Switch the MB102 off before rewiring; a 5 V rail touching a signal wire can damage the servo or the Uno pin.", ru: "Выключайте MB102 перед перекоммутацией: шина 5 В, задевшая сигнальный провод, может повредить серво или пин Uno.", kk: "Сымдарды ауыстырар алдында MB102-ні өшіріңіз: сигнал сымына тиген 5 В шина сервоны немесе Uno пинін зақымдауы мүмкін." },
  ],
  simulation: {
    baud: 9600,
    lines: ["15,0", "16,0", "17,183", "18,181", "19,180", "20,182", "45,96", "46,95", "47,95", "88,41", "89,40", "90,40", "91,41", "120,0", "165,0", "164,0"],
    leds: [],
  },
} satisfies GuideContent;
