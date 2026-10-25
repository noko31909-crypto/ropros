import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pico-servo-radar",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-pico",
  category: "sensors",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 16,
  xpReward: 220,
  title: {
    en: "Pico Ultrasonic Radar",
    ru: "Ультразвуковой радар на Pico",
    kk: "Pico-дағы ультрадыбыстық радар",
  },
  summary: {
    en: "An SG90 servo sweeps an HC-SR04 from 15° to 165° while a Raspberry Pi Pico prints angle and distance and draws a live radar screen on an SSD1306 OLED.",
    ru: "Сервопривод SG90 поворачивает HC-SR04 от 15° до 165°, а Raspberry Pi Pico печатает угол и расстояние и рисует живой экран радара на OLED SSD1306.",
    kk: "SG90 серво жетегі HC-SR04-ті 15°-тан 165°-қа дейін бұрады, ал Raspberry Pi Pico бұрыш пен қашықтықты шығарып, SSD1306 OLED-те тірі радар экранын салады.",
  },
  parts: [
    { component: "raspberry-pi-pico", qty: 1, spec: { en: "RP2040, 3.3 V logic, MicroPython firmware", ru: "RP2040, логика 3,3 В, прошивка MicroPython", kk: "RP2040, 3,3 В логика, MicroPython микробағдарламасы" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "hc-sr04", qty: 1, spec: { en: "5 V, 2–400 cm, ECHO outputs 5 V", ru: "5 В, 2–400 см, ECHO выдаёт 5 В", kk: "5 В, 2–400 см, ECHO 5 В шығарады" }, role: { en: "Distance sensor", ru: "Датчик расстояния", kk: "Қашықтық датчигі" } },
    { component: "servo-sg90", qty: 1, spec: { en: "SG90 micro servo, 180°", ru: "микросервопривод SG90, 180°", kk: "SG90 микро серво жетегі, 180°" }, role: { en: "Sweeps the sensor", ru: "Поворачивает датчик", kk: "Датчикті бұрады" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C, address 0x3C", ru: "0,96\" 128×64, I²C, адрес 0x3C", kk: "0,96\" 128×64, I²C, мекенжайы 0x3C" }, role: { en: "Radar screen", ru: "Экран радара", kk: "Радар экраны" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V ≥ 1 A USB charger or power bank with a breakout", ru: "USB-зарядка или пауэрбанк 5 В ≥ 1 А с переходником", kk: "5 В ≥ 1 А USB зарядтағыш немесе ажыратқышы бар қуат банкі" }, role: { en: "Separate supply for the servo", ru: "Отдельное питание для сервопривода", kk: "Серво жетекке бөлек қуат" } },
    { component: "resistor", qty: 2, spec: { en: "1 kΩ and 2 kΩ (2.2 kΩ also works)", ru: "1 кОм и 2 кОм (подойдёт и 2,2 кОм)", kk: "1 кОм және 2 кОм (2,2 кОм да жарайды)" }, role: { en: "Divides ECHO from 5 V to 3.3 V", ru: "Делит ECHO с 5 В до 3,3 В", kk: "ECHO-ны 5 В-тан 3,3 В-қа бөледі" } },
    { component: "capacitor", qty: 1, spec: { en: "470 µF, 10 V electrolytic", ru: "электролит 470 мкФ, 10 В", kk: "470 мкФ, 10 В электролиттік" }, role: { en: "Absorbs servo current spikes", ru: "Гасит броски тока сервопривода", kk: "Серво жетектің ток секірістерін басады" } },
    { component: "breadboard", qty: 1, spec: { en: "full size", ru: "полноразмерная", kk: "толық өлшемді" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 16, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "us", component: "hc-sr04", label: "HC-SR04" },
    { id: "r1", component: "resistor", label: "1 kΩ" },
    { id: "r2", component: "resistor", label: "2 kΩ" },
    { id: "servo", component: "servo-sg90", label: "SG90" },
    { id: "psu", component: "usb-5v", label: "Servo 5 V" },
    { id: "c1", component: "capacitor", label: "470 µF" },
    { id: "oled", component: "oled-ssd1306", label: "SSD1306 128×64" },
  ],
  connections: [
    { from: "board.VBUS", to: "us.VCC", color: "red", note: { en: "pin 40, 5 V from USB", ru: "пин 40, 5 В от USB", kk: "40-пин, USB-ден 5 В" } },
    { from: "us.GND", to: "board.GND", color: "black", note: { en: "pin 3", ru: "пин 3", kk: "3-пин" } },
    { from: "board.GP2", to: "us.TRIG", color: "green", note: { en: "pin 4; 3.3 V is enough to trigger", ru: "пин 4; 3,3 В достаточно для запуска", kk: "4-пин; іске қосуға 3,3 В жеткілікті" } },
    { from: "us.ECHO", to: "r1.A", color: "yellow", note: { en: "5 V pulse", ru: "импульс 5 В", kk: "5 В импульс" } },
    { from: "r1.B", to: "board.GP3", color: "yellow", note: { en: "pin 5, sees 5 × 2/3 ≈ 3.3 V", ru: "пин 5, получает 5 × 2/3 ≈ 3,3 В", kk: "5-пин, 5 × 2/3 ≈ 3,3 В алады" } },
    { from: "r2.A", to: "board.GP3", color: "yellow" },
    { from: "r2.B", to: "board.GND2", color: "black", note: { en: "pin 8", ru: "пин 8", kk: "8-пин" } },
    { from: "psu.5V", to: "servo.VCC", color: "red", note: { en: "servo red wire, NOT the Pico's 5 V", ru: "красный провод сервы, НЕ от 5 В Pico", kk: "серво қызыл сымы, Pico-ның 5 В-ынан ЕМЕС" } },
    { from: "servo.GND", to: "psu.GND", color: "brown", note: { en: "servo brown wire", ru: "коричневый провод сервы", kk: "сервоның қоңыр сымы" } },
    { from: "psu.GND", to: "board.GND4", color: "black", note: { en: "pin 18, shared ground", ru: "пин 18, общая земля", kk: "18-пин, ортақ жер" } },
    { from: "c1.A", to: "psu.5V", color: "red", note: { en: "+ leg", ru: "ножка «+»", kk: "«+» аяғы" } },
    { from: "c1.B", to: "psu.GND", color: "black" },
    { from: "board.GP15", to: "servo.SIG", color: "orange", note: { en: "pin 20, 50 Hz PWM", ru: "пин 20, ШИМ 50 Гц", kk: "20-пин, 50 Гц ШИМ" } },
    { from: "board.3V3", to: "oled.VCC", color: "red", note: { en: "pin 36", ru: "пин 36", kk: "36-пин" } },
    { from: "oled.GND", to: "board.GND7", color: "black", note: { en: "pin 38", ru: "пин 38", kk: "38-пин" } },
    { from: "board.GP4", to: "oled.SDA", color: "blue", note: { en: "pin 6, I2C0 SDA", ru: "пин 6, I2C0 SDA", kk: "6-пин, I2C0 SDA" } },
    { from: "board.GP5", to: "oled.SCL", color: "purple", note: { en: "pin 7, I2C0 SCL", ru: "пин 7, I2C0 SCL", kk: "7-пин, I2C0 SCL" } },
  ],
  steps: [
    {
      title: { en: "Mount the sensor on the servo", ru: "Закрепите датчик на сервоприводе", kk: "Датчикті серво жетекке бекітіңіз" },
      body: {
        en: "Fix the servo to a small base (a box or a piece of wood). Turn the horn gently by hand to the middle of its travel, then attach the straight horn so it points forward. Glue or tape the HC-SR04 upright on the horn with the two transducers facing out, and leave its four pins free for wires.",
        ru: "Закрепите сервопривод на небольшом основании (коробка или брусок). Аккуратно поверните вал рукой в середину хода и наденьте прямую качалку так, чтобы она смотрела вперёд. Приклейте или примотайте HC-SR04 вертикально к качалке излучателями наружу, оставив четыре пина свободными для проводов.",
        kk: "Серво жетекті шағын негізге (қорап немесе ағаш) бекітіңіз. Білікті қолмен жайлап жүрісінің ортасына бұрып, тік қалақшаны алға қарайтындай кигізіңіз. HC-SR04-ті қалақшаға тігінен, сәулелендіргіштерін сыртқа қаратып жабыстырыңыз, төрт пинін сымдарға бос қалдырыңыз.",
      },
      expect: { en: "The sensor faces straight ahead at 90° and can turn about 75° each way.", ru: "При 90° датчик смотрит прямо вперёд и может повернуться примерно на 75° в каждую сторону.", kk: "90°-та датчик тура алға қарайды және әр жаққа шамамен 75°-қа бұрыла алады." },
      mistake: { en: "Forcing the horn past its end stop strips the SG90's plastic gears.", ru: "Если с силой крутить качалку за упор, пластиковые шестерни SG90 срежутся.", kk: "Қалақшаны тірекке дейін күшпен бұрау SG90-ның пластик тісті доңғалақтарын бұзады." },
    },
    {
      title: { en: "Give the servo its own 5 V", ru: "Дайте сервоприводу отдельные 5 В", kk: "Серво жетекке бөлек 5 В беріңіз" },
      body: {
        en: "An SG90 can pull 650 mA when it starts or stalls, enough to brown out the Pico. Power it from a separate 5 V USB supply: red wire to supply +5 V, brown to supply GND. Put the 470 µF capacitor across the supply (+ leg to 5 V). Then join the supply GND to Pico GND (pin 18), otherwise the signal has no reference. Connect the orange signal wire to GP15 (pin 20).",
        ru: "SG90 при старте или упоре потребляет до 650 мА, этого хватит, чтобы Pico перезагрузился. Питайте его от отдельного USB-блока 5 В: красный провод на +5 В блока, коричневый на GND блока. Поставьте конденсатор 470 мкФ на питание (ножка «+» к 5 В). Затем соедините GND блока с GND Pico (пин 18), иначе у сигнала нет опоры. Оранжевый сигнальный провод подключите к GP15 (пин 20).",
        kk: "SG90 іске қосылғанда немесе тірелгенде 650 мА-ге дейін тұтынады, бұл Pico-ны қайта жүктеуге жетеді. Оны бөлек 5 В USB қуат көзінен қоректендіріңіз: қызыл сым қуат көзінің +5 В-ына, қоңыр сым GND-іне. Қуатқа 470 мкФ конденсатор қойыңыз («+» аяғы 5 В-қа). Содан кейін қуат көзінің GND-ін Pico GND-імен (18-пин) жалғаңыз, әйтпесе сигналдың тірегі болмайды. Сарғылт сигнал сымын GP15-ке (20-пин) қосыңыз.",
      },
      expect: { en: "Two supplies, one shared ground.", ru: "Два источника питания, одна общая земля.", kk: "Екі қуат көзі, бір ортақ жер." },
      mistake: { en: "Connecting the servo supply's +5 V to the Pico's VBUS: two supplies fight each other. Share only GND.", ru: "Соединить +5 В блока сервы с VBUS Pico: два источника начнут бороться. Общей должна быть только земля.", kk: "Серво қуат көзінің +5 В-ын Pico VBUS-ына қосу: екі қуат көзі бір-біріне қарсы жұмыс істейді. Тек GND ортақ болсын." },
    },
    {
      title: { en: "Wire the HC-SR04 with a divider", ru: "Подключите HC-SR04 через делитель", kk: "HC-SR04-ті бөлгіш арқылы қосыңыз" },
      body: {
        en: "The HC-SR04 runs on 5 V: VCC to VBUS (pin 40), GND to GND (pin 3). TRIG goes straight to GP2 (pin 4). ECHO answers with a 5 V pulse, too much for the Pico, so build a divider: ECHO → 1 kΩ → GP3 (pin 5), and a 2 kΩ resistor from GP3 to GND (pin 8). The pin then sees 5 × 2/3 ≈ 3.3 V.",
        ru: "HC-SR04 работает от 5 В: VCC к VBUS (пин 40), GND к GND (пин 3). TRIG напрямую к GP2 (пин 4). ECHO отвечает импульсом 5 В, это слишком много для Pico, поэтому соберите делитель: ECHO → 1 кОм → GP3 (пин 5) и резистор 2 кОм от GP3 к GND (пин 8). Пин получит 5 × 2/3 ≈ 3,3 В.",
        kk: "HC-SR04 5 В-та жұмыс істейді: VCC-ні VBUS-қа (40-пин), GND-ді GND-ге (3-пин). TRIG тікелей GP2-ге (4-пин). ECHO 5 В импульспен жауап береді, бұл Pico үшін тым көп, сондықтан бөлгіш жинаңыз: ECHO → 1 кОм → GP3 (5-пин) және GP3-тен GND-ге (8-пин) 2 кОм резистор. Пин 5 × 2/3 ≈ 3,3 В алады.",
      },
      expect: { en: "A multimeter on GP3 reads 0 V at rest; the divider never lets more than ~3.3 V through.", ru: "Мультиметр на GP3 в покое показывает 0 В; делитель не пропускает больше ~3,3 В.", kk: "Мультиметр GP3-те тыныштықта 0 В көрсетеді; бөлгіш ~3,3 В-тан көп өткізбейді." },
      mistake: { en: "Swapping the two resistors: the pin then gets 5 × 1/3 ≈ 1.7 V, too low to read as HIGH, and every reading times out.", ru: "Перепутать резисторы: пин получит 5 × 1/3 ≈ 1,7 В, это слишком мало для HIGH, и каждый замер уйдёт в таймаут.", kk: "Резисторларды ауыстыру: пин 5 × 1/3 ≈ 1,7 В алады, бұл HIGH үшін тым аз, әр өлшем уақыт шегінен асады." },
    },
    {
      title: { en: "Add the OLED", ru: "Добавьте OLED", kk: "OLED қосыңыз" },
      body: {
        en: "Connect the OLED VCC to 3V3 (pin 36), GND to GND (pin 38), SDA to GP4 (pin 6) and SCL to GP5 (pin 7). Install the driver once with mpremote mip install ssd1306 (or Thonny → Tools → Manage packages → ssd1306).",
        ru: "Подключите VCC дисплея к 3V3 (пин 36), GND к GND (пин 38), SDA к GP4 (пин 6), SCL к GP5 (пин 7). Один раз установите драйвер: mpremote mip install ssd1306 (или Thonny → Tools → Manage packages → ssd1306).",
        kk: "Дисплейдің VCC-ін 3V3-ке (36-пин), GND-ін GND-ге (38-пин), SDA-сын GP4-ке (6-пин), SCL-ін GP5-ке (7-пин) қосыңыз. Драйверді бір рет орнатыңыз: mpremote mip install ssd1306 (немесе Thonny → Tools → Manage packages → ssd1306).",
      },
      expect: { en: "I2C(0, sda=Pin(4), scl=Pin(5)).scan() in the shell returns [60].", ru: "I2C(0, sda=Pin(4), scl=Pin(5)).scan() в консоли возвращает [60].", kk: "Консольде I2C(0, sda=Pin(4), scl=Pin(5)).scan() [60] қайтарады." },
      mistake: { en: "Powering the OLED from VBUS: its pull-ups would put 5 V on GP4 and GP5.", ru: "Питать OLED от VBUS: его подтяжки подадут 5 В на GP4 и GP5.", kk: "OLED-ті VBUS-тан қоректендіру: оның тарту резисторлары GP4 пен GP5-ке 5 В береді." },
    },
    {
      title: { en: "Run the radar", ru: "Запустите радар", kk: "Радарды іске қосыңыз" },
      body: {
        en: "Save the code to the Pico as main.py, plug in both supplies and run it. The servo sweeps back and forth in 3° steps, the shell prints angle,distance lines, and the OLED shows a half-circle with range rings at 33, 67 and 100 cm, the sweep line and a dot for every echo. Open Thonny's View → Plotter to graph the numbers.",
        ru: "Сохраните код на Pico как main.py, включите оба источника питания и запустите. Серво качается туда-обратно шагами по 3°, консоль печатает строки angle,distance, а OLED показывает полукруг с кольцами дальности 33, 67 и 100 см, линию развёртки и точку для каждого эха. Откройте в Thonny View → Plotter, чтобы построить график.",
        kk: "Кодты Pico-ға main.py деп сақтап, екі қуат көзін де қосып, іске қосыңыз. Серво 3°-тық қадаммен ары-бері тербеледі, консоль angle,distance жолдарын шығарады, ал OLED 33, 67 және 100 см қашықтық сақиналары бар жарты шеңберді, сыпыру сызығын және әр жаңғырық үшін нүктені көрсетеді. Графикті көру үшін Thonny-де View → Plotter ашыңыз.",
      },
      expect: { en: "A book 50 cm in front shows up as a short arc of dots halfway out on the screen.", ru: "Книга в 50 см впереди появляется на экране короткой дугой из точек посередине радиуса.", kk: "50 см алдағы кітап экранда радиустың ортасында нүктелердің қысқа доғасы ретінде көрінеді." },
      mistake: { en: "Testing against soft or angled surfaces: cloth and slanted objects scatter the sound and look invisible.", ru: "Проверять на мягких или наклонных поверхностях: ткань и наклонные предметы рассеивают звук и «не видны».", kk: "Жұмсақ немесе көлбеу беттерде тексеру: мата мен көлбеу заттар дыбысты шашыратады да, «көрінбейді»." },
    },
    {
      title: { en: "Tune the sweep", ru: "Настройте развёртку", kk: "Сыпыруды баптаңыз" },
      body: {
        en: "If the servo buzzes or hits its end stops at the ends of the sweep, narrow MIN_ANGLE/MAX_ANGLE or adjust SERVO_MIN_US and SERVO_MAX_US (SG90s vary between about 500 and 2400 µs). A smaller ANGLE_STEP gives a finer picture but a slower sweep; MAX_CM sets the screen's range.",
        ru: "Если серво жужжит или упирается на краях, сузьте MIN_ANGLE/MAX_ANGLE или подстройте SERVO_MIN_US и SERVO_MAX_US (у разных SG90 примерно от 500 до 2400 мкс). Меньший ANGLE_STEP даёт более детальную картинку, но медленнее развёртку; MAX_CM задаёт дальность экрана.",
        kk: "Серво шеттерде ызыңдаса немесе тірелсе, MIN_ANGLE/MAX_ANGLE ауқымын тарылтыңыз немесе SERVO_MIN_US пен SERVO_MAX_US-ті баптаңыз (әртүрлі SG90-да шамамен 500-ден 2400 мкс-қа дейін). Кішірек ANGLE_STEP суретті нақтырақ етеді, бірақ сыпыру баяулайды; MAX_CM экранның қашықтығын белгілейді.",
      },
      expect: { en: "A smooth, quiet sweep and a stable picture of the room.", ru: "Плавная тихая развёртка и стабильная картинка комнаты.", kk: "Біркелкі, тыныш сыпыру және бөлменің тұрақты суреті." },
      mistake: { en: "Lowering the 40 ms settle delay too far: the sensor measures while still moving and the dots smear.", ru: "Слишком сократить паузу 40 мс: датчик меряет на ходу, и точки размазываются.", kk: "40 мс кідірісті тым қысқарту: датчик қозғалыс кезінде өлшейді де, нүктелер жайылып кетеді." },
    },
  ],
  code: [{
    filename: "main.py",
    language: "python",
    libraries: ["ssd1306"],
    source: `# Pico ultrasonic radar: HC-SR04 on an SG90, radar view on an SSD1306 OLED (MicroPython)
# Pins: GP2 = TRIG, GP3 = ECHO (via 1k/2k divider), GP15 = servo signal, GP4/GP5 = I2C0 SDA/SCL
from machine import Pin, PWM, I2C, time_pulse_us
import math
import time
from ssd1306 import SSD1306_I2C

TRIG_PIN = 2
ECHO_PIN = 3
SERVO_PIN = 15
SDA_PIN = 4
SCL_PIN = 5

MIN_ANGLE = 15
MAX_ANGLE = 165
ANGLE_STEP = 3
MAX_CM = 100             # radar range drawn on the screen
SERVO_MIN_US = 500       # pulse width at 0 degrees (tune for your servo)
SERVO_MAX_US = 2400      # pulse width at 180 degrees

trig = Pin(TRIG_PIN, Pin.OUT, value=0)
echo = Pin(ECHO_PIN, Pin.IN)
servo = PWM(Pin(SERVO_PIN))
servo.freq(50)
i2c = I2C(0, sda=Pin(SDA_PIN), scl=Pin(SCL_PIN), freq=400000)
oled = SSD1306_I2C(128, 64, i2c)

CX, CY, R = 64, 63, 60                       # radar origin and radius in pixels
COS = [math.cos(math.radians(a)) for a in range(181)]
SIN = [math.sin(math.radians(a)) for a in range(181)]
dist = [None] * 181                          # last echo per angle


def set_angle(angle):
    us = SERVO_MIN_US + (SERVO_MAX_US - SERVO_MIN_US) * angle // 180
    servo.duty_ns(us * 1000)


def distance_cm():
    trig.value(0)
    time.sleep_us(2)
    trig.value(1)
    time.sleep_us(10)
    trig.value(0)
    t = time_pulse_us(echo, 1, 30000)        # 30 ms timeout, about 5 m
    if t < 0:
        return None
    return t / 58.0


def point(angle, r):
    return CX + int(r * COS[angle]), CY - int(r * SIN[angle])


def draw(angle, d):
    oled.fill(0)
    for k in (1, 2, 3):                      # range rings at 1/3, 2/3 and full range
        for a in range(0, 181, 6):
            x, y = point(a, R * k // 3)
            oled.pixel(x, y, 1)
    x, y = point(angle, R)
    oled.line(CX, CY, x, y, 1)               # sweep line
    for a in range(MIN_ANGLE, MAX_ANGLE + 1, ANGLE_STEP):
        dd = dist[a]
        if dd is not None and dd <= MAX_CM:
            x, y = point(a, dd * R / MAX_CM)
            oled.fill_rect(x - 1, y - 1, 2, 2, 1)
    oled.text("%3d" % angle, 0, 0)
    oled.text("  ---" if d is None else "%3dcm" % int(d), 88, 0)
    oled.show()


angle = MIN_ANGLE
direction = ANGLE_STEP
set_angle(angle)
time.sleep_ms(500)
print("radar ready: sweep %d-%d deg, range %d cm" % (MIN_ANGLE, MAX_ANGLE, MAX_CM))
while True:
    set_angle(angle)
    time.sleep_ms(40)                        # let the servo settle and old echoes fade
    d = distance_cm()
    dist[angle] = d
    print("%d,%s" % (angle, "-" if d is None else "%.1f" % d))
    draw(angle, d)
    if not MIN_ANGLE <= angle + direction <= MAX_ANGLE:
        direction = -direction
    angle += direction
`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The Pico resets or disconnects whenever the servo moves", ru: "Pico перезагружается или отключается, когда серво движется", kk: "Серво қозғалған сайын Pico қайта жүктеледі немесе ажырайды" },
      cause: { en: "The servo is powered from the Pico, or the separate supply's GND is not joined to the Pico.", ru: "Серво питается от Pico, или GND отдельного блока не соединён с Pico.", kk: "Серво Pico-дан қоректенеді немесе бөлек қуат көзінің GND-і Pico-мен жалғанбаған." },
      fix: { en: "Feed the servo's red wire only from the separate 5 V supply and add the GND link to pin 18.", ru: "Подавайте на красный провод серво только отдельные 5 В и добавьте перемычку GND на пин 18.", kk: "Сервоның қызыл сымына тек бөлек 5 В беріп, 18-пинге GND жалғауын қосыңыз." },
    },
    {
      symptom: { en: "Every line shows \"-\" (no echo)", ru: "Во всех строках «-» (нет эха)", kk: "Барлық жолда «-» (жаңғырық жоқ)" },
      cause: { en: "The divider resistors are swapped, ECHO is not on GP3, or the sensor has no 5 V.", ru: "Перепутаны резисторы делителя, ECHO не на GP3 или у датчика нет 5 В.", kk: "Бөлгіш резисторлары ауысқан, ECHO GP3-те емес немесе датчикте 5 В жоқ." },
      fix: { en: "1 kΩ between ECHO and GP3, 2 kΩ from GP3 to GND; check about 5 V between the sensor's VCC and GND.", ru: "1 кОм между ECHO и GP3, 2 кОм от GP3 к GND; проверьте около 5 В между VCC и GND датчика.", kk: "ECHO мен GP3 арасында 1 кОм, GP3-тен GND-ге 2 кОм; датчиктің VCC мен GND арасында шамамен 5 В бар-жоғын тексеріңіз." },
    },
    {
      symptom: { en: "The servo jitters at rest", ru: "Серво дрожит в покое", kk: "Серво тыныштықта дірілдейді" },
      cause: { en: "Weak supply, missing capacitor, or a pulse range beyond the servo's end stops.", ru: "Слабый блок питания, нет конденсатора или диапазон импульсов выходит за упоры серво.", kk: "Қуат көзі әлсіз, конденсатор жоқ немесе импульс ауқымы серво тіректерінен асады." },
      fix: { en: "Use a ≥ 1 A supply with the 470 µF capacitor, and narrow MIN_ANGLE/MAX_ANGLE a little.", ru: "Возьмите блок ≥ 1 А с конденсатором 470 мкФ и немного сузьте MIN_ANGLE/MAX_ANGLE.", kk: "470 мкФ конденсаторы бар ≥ 1 А қуат көзін алып, MIN_ANGLE/MAX_ANGLE-ді сәл тарылтыңыз." },
    },
    {
      symptom: { en: "\"ImportError: no module named 'ssd1306'\"", ru: "«ImportError: no module named 'ssd1306'»", kk: "«ImportError: no module named 'ssd1306'»" },
      cause: { en: "The OLED driver is not on the Pico.", ru: "Драйвера OLED нет на Pico.", kk: "OLED драйвері Pico-да жоқ." },
      fix: { en: "Run mpremote mip install ssd1306 with the Pico connected and Thonny closed.", ru: "Выполните mpremote mip install ssd1306 при подключённом Pico и закрытом Thonny.", kk: "Pico қосулы және Thonny жабық кезде mpremote mip install ssd1306 орындаңыз." },
    },
  ],
  safety: [
    { en: "Never connect HC-SR04 ECHO straight to a Pico pin: the 5 V pulse can damage the 3.3 V GPIO.", ru: "Не подключайте ECHO HC-SR04 напрямую к пину Pico: импульс 5 В может повредить GPIO на 3,3 В.", kk: "HC-SR04 ECHO-сын ешқашан тікелей Pico пиніне қоспаңыз: 5 В импульс 3,3 В GPIO-ны бүлдіруі мүмкін." },
    { en: "Join only the grounds of the two supplies, never their 5 V lines.", ru: "Объединяйте только земли двух источников, но не их линии 5 В.", kk: "Екі қуат көзінің тек жерлерін біріктіріңіз, 5 В желілерін ешқашан қоспаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "radar ready: sweep 15-165 deg, range 100 cm",
      "15,182.4",
      "18,180.9",
      "21,-",
      "75,64.2",
      "78,51.7",
      "81,50.8",
      "84,51.2",
      "87,52.0",
      "90,118.6",
      "165,96.3",
      "162,97.1",
    ],
    leds: [],
  },
} satisfies GuideContent;
