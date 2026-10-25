import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pico-plant-moisture-alarm",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-pico",
  category: "iot",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 9,
  xpReward: 120,
  title: {
    en: "Pico Plant Moisture Alarm",
    ru: "Сигнализация полива на Pico",
    kk: "Pico-дағы өсімдік ылғалдылығы дабылы",
  },
  summary: {
    en: "A capacitive soil sensor on the Pico's ADC tells you when a plant is thirsty: calibrate dry and wet once, then an LED blinks and a buzzer reminds you every ten minutes until you water it.",
    ru: "Ёмкостный датчик почвы на АЦП Pico сообщает, что растению пора пить: один раз откалибруйте «сухо» и «мокро», и светодиод будет мигать, а зуммер напоминать каждые десять минут, пока вы не польёте.",
    kk: "Pico АЦП-сіне қосылған сыйымдылық топырақ датчигі өсімдіктің шөлдегенін хабарлайды: «құрғақ» пен «дымқылды» бір рет калибрлеңіз, сонда суармайынша жарық диоды жыпылықтап, зуммер әр он минут сайын еске салады.",
  },
  parts: [
    { component: "raspberry-pi-pico", qty: 1, spec: { en: "RP2040, 3.3 V logic, MicroPython firmware", ru: "RP2040, логика 3,3 В, прошивка MicroPython", kk: "RP2040, 3,3 В логика, MicroPython микробағдарламасы" }, role: { en: "Reads the sensor, runs the alarm", ru: "Читает датчик, управляет сигнализацией", kk: "Датчикті оқиды, дабылды басқарады" } },
    { component: "soil-moisture-capacitive", qty: 1, spec: { en: "v1.2 with TLC555 chip, 3.3–5.5 V, analog out", ru: "v1.2 с микросхемой TLC555, 3,3–5,5 В, аналоговый выход", kk: "TLC555 микросхемасы бар v1.2, 3,3–5,5 В, аналогтық шығыс" }, role: { en: "Soil moisture sensor (no exposed metal, does not corrode)", ru: "Датчик влажности почвы (без открытого металла, не ржавеет)", kk: "Топырақ ылғалдылығы датчигі (ашық металы жоқ, тотықпайды)" } },
    { component: "led", qty: 1, spec: { en: "5 mm red", ru: "5 мм красный", kk: "5 мм қызыл" }, role: { en: "Visual alarm", ru: "Световой сигнал", kk: "Жарық дабылы" } },
    { component: "buzzer-active", qty: 1, spec: { en: "5 V active buzzer", ru: "активный зуммер 5 В", kk: "5 В белсенді зуммер" }, role: { en: "Audible reminder", ru: "Звуковое напоминание", kk: "Дыбыстық еске салғыш" } },
    { component: "npn-transistor", qty: 1, spec: { en: "2N2222 (or BC547, check the pinout)", ru: "2N2222 (или BC547, сверьте цоколёвку)", kk: "2N2222 (немесе BC547, аяқтарын тексеріңіз)" }, role: { en: "Switches the 5 V buzzer", ru: "Включает зуммер 5 В", kk: "5 В зуммерді қосады" } },
    { component: "resistor", qty: 2, spec: { en: "220 Ω (LED) and 1 kΩ (transistor base)", ru: "220 Ом (светодиод) и 1 кОм (база транзистора)", kk: "220 Ом (жарық диоды) және 1 кОм (транзистор базасы)" }, role: { en: "Current limiting", ru: "Ограничение тока", kk: "Токты шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "soil", component: "soil-moisture-capacitive", label: "Soil sensor v1.2" },
    { id: "r_led", component: "resistor", label: "220 Ω" },
    { id: "led", component: "led", label: "Dry" },
    { id: "r_b", component: "resistor", label: "1 kΩ" },
    { id: "q1", component: "npn-transistor", label: "2N2222" },
    { id: "bz", component: "buzzer-active", label: "Buzzer 5 V" },
  ],
  connections: [
    { from: "board.3V3", to: "soil.VCC", color: "red", note: { en: "pin 36; 3.3 V keeps AOUT inside the ADC range", ru: "пин 36; 3,3 В держат AOUT в диапазоне АЦП", kk: "36-пин; 3,3 В AOUT-ты АЦП ауқымында ұстайды" } },
    { from: "soil.GND", to: "board.AGND", color: "black", note: { en: "pin 33, analog ground", ru: "пин 33, аналоговая земля", kk: "33-пин, аналогтық жер" } },
    { from: "soil.AOUT", to: "board.GP26", color: "yellow", note: { en: "pin 31, ADC0", ru: "пин 31, ADC0", kk: "31-пин, ADC0" } },
    { from: "board.GP15", to: "r_led.A", color: "green", note: { en: "pin 20", ru: "пин 20", kk: "20-пин" } },
    { from: "r_led.B", to: "led.A", color: "green", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led.K", to: "board.GND4", color: "black", note: { en: "pin 18", ru: "пин 18", kk: "18-пин" } },
    { from: "board.GP14", to: "r_b.A", color: "orange", note: { en: "pin 19", ru: "пин 19", kk: "19-пин" } },
    { from: "r_b.B", to: "q1.B", color: "orange" },
    { from: "board.VBUS", to: "bz.+", color: "red", note: { en: "pin 40, 5 V from USB", ru: "пин 40, 5 В от USB", kk: "40-пин, USB-ден 5 В" } },
    { from: "bz.-", to: "q1.C", color: "gray" },
    { from: "q1.E", to: "board.GND7", color: "black", note: { en: "pin 38", ru: "пин 38", kk: "38-пин" } },
  ],
  steps: [
    {
      title: { en: "Check and protect the sensor", ru: "Проверьте и защитите датчик", kk: "Датчикті тексеріп, қорғаңыз" },
      body: {
        en: "Look at the chip on the sensor: it should read TLC555 (or T555), which works at 3.3 V; boards with an NE555 need 5 V and are not suitable here. Note the white line on the probe: never push it deeper than that. Brush clear nail varnish over the electronics at the top and the board edges so watering splashes cannot short them.",
        ru: "Посмотрите на микросхему датчика: на ней должно быть TLC555 (или T555), она работает от 3,3 В; платы с NE555 требуют 5 В и сюда не подходят. Обратите внимание на белую линию на щупе: не втыкайте датчик глубже неё. Покройте электронику сверху и края платы прозрачным лаком, чтобы брызги при поливе её не замкнули.",
        kk: "Датчиктегі микросхемаға қараңыз: онда TLC555 (немесе T555) жазылуы керек, ол 3,3 В-та жұмыс істейді; NE555 бар платаларға 5 В керек, бұл жерге жарамайды. Зондтағы ақ сызыққа назар аударыңыз: датчикті одан тереңірек батырмаңыз. Суару кезінде тамшылар тұйықтамауы үшін жоғарғы электрониканы және плата жиектерін мөлдір лакпен жабыңыз.",
      },
      expect: { en: "A TLC555 sensor with sealed edges and a visible depth line.", ru: "Датчик с TLC555, защищёнными краями и видимой линией глубины.", kk: "TLC555 бар, жиектері қорғалған және тереңдік сызығы көрінетін датчик." },
      mistake: { en: "Pushing the whole board into the soil: water reaches the electronics and the readings drift within days.", ru: "Втыкать плату целиком: вода доберётся до электроники, и показания поплывут за несколько дней.", kk: "Платаны толығымен топыраққа батыру: су электроникаға жетіп, бірнеше күнде көрсеткіштер ауытқиды." },
    },
    {
      title: { en: "Wire the sensor to the ADC", ru: "Подключите датчик к АЦП", kk: "Датчикті АЦП-ге қосыңыз" },
      body: {
        en: "Connect VCC to 3V3 (pin 36), GND to AGND (pin 33) and AOUT to GP26 (pin 31), which is ADC0. Powered from 3.3 V the sensor's output stays between about 1 V (wet) and 2.7 V (dry), safely inside the Pico's 0–3.3 V ADC range. AGND is the quiet analog ground and gives steadier readings.",
        ru: "Подключите VCC к 3V3 (пин 36), GND к AGND (пин 33), AOUT к GP26 (пин 31), это ADC0. При питании 3,3 В выход датчика держится примерно между 1 В (мокро) и 2,7 В (сухо), безопасно внутри диапазона АЦП Pico 0–3,3 В. AGND это «тихая» аналоговая земля, с ней показания стабильнее.",
        kk: "VCC-ні 3V3-ке (36-пин), GND-ді AGND-ге (33-пин), AOUT-ты GP26-ға (31-пин) қосыңыз, бұл ADC0. 3,3 В-пен қоректенгенде датчик шығысы шамамен 1 В (дымқыл) мен 2,7 В (құрғақ) арасында болады, Pico АЦП-сінің 0–3,3 В ауқымында қауіпсіз. AGND «тыныш» аналогтық жер, онымен көрсеткіштер тұрақтырақ.",
      },
      expect: { en: "Three wires: power, analog ground and the signal on pin 31.", ru: "Три провода: питание, аналоговая земля и сигнал на пине 31.", kk: "Үш сым: қуат, аналогтық жер және 31-пиндегі сигнал." },
      mistake: { en: "Powering the sensor from VBUS: boards without a regulator then output up to 5 V, which can damage the ADC pin.", ru: "Питание датчика от VBUS: на платах без стабилизатора выход доходит до 5 В, а это может повредить вход АЦП.", kk: "Датчикті VBUS-тан қоректендіру: тұрақтандырғышы жоқ платаларда шығыс 5 В-қа дейін жетеді, бұл АЦП кірісін бүлдіруі мүмкін." },
    },
    {
      title: { en: "Add the LED and the buzzer", ru: "Добавьте светодиод и зуммер", kk: "Жарық диоды мен зуммерді қосыңыз" },
      body: {
        en: "Wire GP15 (pin 20) through 220 Ω to the LED anode and the cathode to GND (pin 18). The 5 V buzzer is switched by a transistor: buzzer + to VBUS (pin 40), buzzer - to the 2N2222 collector, emitter to GND (pin 38), and GP14 (pin 19) through 1 kΩ to the base. With the flat side towards you the 2N2222 legs are E, B, C.",
        ru: "Подключите GP15 (пин 20) через 220 Ом к аноду светодиода, катод к GND (пин 18). Зуммер 5 В включается транзистором: + зуммера к VBUS (пин 40), - зуммера к коллектору 2N2222, эмиттер к GND (пин 38), а GP14 (пин 19) через 1 кОм к базе. Плоской стороной к себе ножки 2N2222: E, B, C.",
        kk: "GP15-ті (20-пин) 220 Ом арқылы жарық диодының анодына, катодын GND-ге (18-пин) қосыңыз. 5 В зуммерді транзистор қосады: зуммердің + шығысы VBUS-қа (40-пин), - шығысы 2N2222 коллекторына, эмиттер GND-ге (38-пин), ал GP14 (19-пин) 1 кОм арқылы базаға. Жалпақ жағы өзіңізге қарағанда 2N2222 аяқтары: E, B, C.",
      },
      expect: { en: "The buzzer is silent at power-up.", ru: "При включении зуммер молчит.", kk: "Қосылғанда зуммер үнсіз." },
      mistake: { en: "VBUS only carries 5 V while the Pico is on USB; on a battery at VSYS the buzzer stays silent.", ru: "На VBUS есть 5 В только при питании Pico от USB; от батареи на VSYS зуммер будет молчать.", kk: "VBUS-та 5 В тек Pico USB-ден қоректенгенде болады; VSYS-тегі батареядан зуммер үнсіз қалады." },
    },
    {
      title: { en: "Calibrate dry and wet", ru: "Откалибруйте «сухо» и «мокро»", kk: "«Құрғақ» пен «дымқылды» калибрлеңіз" },
      body: {
        en: "Set CALIBRATE = True in main.py, save it to the Pico and watch the shell. Hold the sensor in dry air and note the raw value (typically 48000–54000); then stand it in a glass of water up to the white line and note that value (typically 20000–26000). Put them into DRY_RAW and WET_RAW and set CALIBRATE = False.",
        ru: "Поставьте CALIBRATE = True в main.py, сохраните на Pico и смотрите в консоль. Подержите датчик в сухом воздухе и запишите raw (обычно 48000–54000); затем опустите его в стакан воды до белой линии и запишите это значение (обычно 20000–26000). Впишите их в DRY_RAW и WET_RAW и поставьте CALIBRATE = False.",
        kk: "main.py ішінде CALIBRATE = True қойып, Pico-ға сақтаңыз да, консольді бақылаңыз. Датчикті құрғақ ауада ұстап, raw мәнін жазып алыңыз (әдетте 48000–54000); содан кейін оны ақ сызыққа дейін су толы стақанға салып, сол мәнді жазыңыз (әдетте 20000–26000). Оларды DRY_RAW мен WET_RAW-ға жазып, CALIBRATE = False қойыңыз.",
      },
      expect: { en: "The dry value is clearly higher than the wet value; the sensor reads lower the wetter it gets.", ru: "Значение «сухо» заметно выше «мокро»: чем влажнее, тем меньше показание.", kk: "«Құрғақ» мәні «дымқылдан» айтарлықтай жоғары: неғұрлым дымқыл болса, көрсеткіш соғұрлым төмен." },
      mistake: { en: "Calibrating with the sensor held in your hand: your fingers change the reading. Touch only the cable.", ru: "Калибровать, держа датчик в руке: пальцы меняют показания. Держите только за кабель.", kk: "Датчикті қолмен ұстап калибрлеу: саусақтар көрсеткішті өзгертеді. Тек кабелінен ұстаңыз." },
    },
    {
      title: { en: "Put it in the pot", ru: "Установите в горшок", kk: "Құмыраға орнатыңыз" },
      body: {
        en: "Push the probe into the soil up to the line, 2–3 cm from the stem, and press the soil around it. Power the Pico from a USB charger. The shell shows the moisture every 2 s. Below 30 % the LED blinks and the buzzer beeps three times, repeating every 10 minutes; after watering the alarm clears above 40 %, so it does not flicker on and off at the threshold.",
        ru: "Воткните щуп в землю до линии, в 2–3 см от стебля, и прижмите почву вокруг. Питайте Pico от USB-зарядки. Консоль показывает влажность каждые 2 с. Ниже 30 % мигает светодиод и зуммер пищит три раза, повторяя каждые 10 минут; после полива тревога снимается выше 40 %, поэтому она не дёргается на пороге.",
        kk: "Зондты топыраққа сызыққа дейін, сабақтан 2–3 см қашықтықта батырып, айналасындағы топырақты басыңыз. Pico-ны USB зарядтағыштан қоректендіріңіз. Консоль ылғалдылықты әр 2 с сайын көрсетеді. 30 %-дан төмен болса, жарық диоды жыпылықтап, зуммер үш рет дыбыс береді және әр 10 минут сайын қайталайды; суарғаннан кейін дабыл 40 %-дан жоғары болғанда ғана өшеді, сондықтан шекте ауытқымайды.",
      },
      expect: { en: "Freshly watered soil reads roughly 60–90 %, and the value falls slowly over the following days.", ru: "Свежеполитая почва показывает примерно 60–90 %, и значение медленно падает в следующие дни.", kk: "Жаңа суарылған топырақ шамамен 60–90 % көрсетеді, мән келесі күндері баяу төмендейді." },
      mistake: { en: "Leaving air gaps around the probe: the reading jumps around. Press the soil firmly.", ru: "Оставить воздух вокруг щупа: показания скачут. Плотно прижмите почву.", kk: "Зонд айналасында ауа қалдыру: көрсеткіштер секіреді. Топырақты тығыз басыңыз." },
    },
  ],
  code: [{
    filename: "main.py",
    language: "python",
    libraries: [],
    source: `# Pico plant moisture alarm (MicroPython)
# Pins: GP26/ADC0 = sensor AOUT, GP15 = LED, GP14 = buzzer transistor base (1 kOhm)
from machine import ADC, Pin
import time

SOIL_PIN = 26          # GP26 = ADC0, physical pin 31
LED_PIN = 15           # physical pin 20
BUZZER_PIN = 14        # physical pin 19 -> 1 kOhm -> NPN base

CALIBRATE = False      # True: only print raw values to find DRY_RAW / WET_RAW
DRY_RAW = 52000        # your reading in dry air
WET_RAW = 23000        # your reading in water up to the line
ALARM_PCT = 30         # alarm below this moisture
CLEAR_PCT = 40         # alarm clears above this (hysteresis)
READ_EVERY_MS = 2000
BEEP_EVERY_MS = 600000  # remind every 10 minutes while dry

soil = ADC(Pin(SOIL_PIN))
led = Pin(LED_PIN, Pin.OUT, value=0)
buzzer = Pin(BUZZER_PIN, Pin.OUT, value=0)


def read_raw(n=16):
    total = 0
    for _ in range(n):
        total += soil.read_u16()
        time.sleep_ms(2)
    return total // n


def to_percent(raw):
    pct = (DRY_RAW - raw) * 100 // (DRY_RAW - WET_RAW)
    return max(0, min(100, pct))


def beep(times=3):
    for _ in range(times):
        buzzer.value(1)
        time.sleep_ms(120)
        buzzer.value(0)
        time.sleep_ms(120)


if CALIBRATE:
    print("calibration: note raw in dry air (DRY_RAW) and in water (WET_RAW)")
    while True:
        print("raw", read_raw())
        time.sleep_ms(500)

print("plant monitor: dry=%d wet=%d alarm below %d%%" % (DRY_RAW, WET_RAW, ALARM_PCT))
alarm = False
last_beep = None
last_read = time.ticks_add(time.ticks_ms(), -READ_EVERY_MS)
while True:
    now = time.ticks_ms()
    if time.ticks_diff(now, last_read) >= READ_EVERY_MS:
        last_read = now
        raw = read_raw()
        pct = to_percent(raw)
        if not alarm and pct < ALARM_PCT:
            alarm = True
            last_beep = None
            print("ALARM: soil is dry, water the plant")
        elif alarm and pct > CLEAR_PCT:
            alarm = False
            led.value(0)
            print("OK: watered")
        print("raw %d  moisture %d%%  %s" % (raw, pct, "DRY" if alarm else "ok"))
    if alarm:
        led.value(not led.value())          # blink while dry
        if last_beep is None or time.ticks_diff(now, last_beep) >= BEEP_EVERY_MS:
            beep()
            last_beep = time.ticks_ms()
    time.sleep_ms(250)
`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The raw value barely changes between air and water", ru: "Значение raw почти не меняется между воздухом и водой", kk: "raw мәні ауа мен су арасында әрең өзгереді" },
      cause: { en: "The board uses an NE555, which does not run at 3.3 V, or AOUT is not on GP26.", ru: "На плате NE555, который не работает от 3,3 В, или AOUT не на GP26.", kk: "Платада 3,3 В-та жұмыс істемейтін NE555 тұр немесе AOUT GP26-да емес." },
      fix: { en: "Check the chip marking and use a TLC555 version; confirm the wire is on pin 31.", ru: "Проверьте маркировку и возьмите версию с TLC555; убедитесь, что провод на пине 31.", kk: "Таңбалауды тексеріп, TLC555 нұсқасын алыңыз; сым 31-пинде екеніне көз жеткізіңіз." },
    },
    {
      symptom: { en: "Moisture shows 0 % or 100 % all the time", ru: "Влажность всё время 0 % или 100 %", kk: "Ылғалдылық үнемі 0 % немесе 100 %" },
      cause: { en: "DRY_RAW and WET_RAW are not your sensor's values, or they are swapped.", ru: "DRY_RAW и WET_RAW не от вашего датчика или перепутаны.", kk: "DRY_RAW мен WET_RAW сіздің датчигіңіздікі емес немесе ауысып кеткен." },
      fix: { en: "Repeat the calibration step; DRY_RAW must be the larger number.", ru: "Повторите калибровку; DRY_RAW должно быть большим числом.", kk: "Калибрлеуді қайталаңыз; DRY_RAW үлкен сан болуы керек." },
    },
    {
      symptom: { en: "The LED blinks but the buzzer is silent", ru: "Светодиод мигает, а зуммер молчит", kk: "Жарық диоды жыпылықтайды, бірақ зуммер үнсіз" },
      cause: { en: "The Pico is not powered from USB (no 5 V on VBUS), or the transistor's C and E are swapped.", ru: "Pico питается не от USB (на VBUS нет 5 В), или перепутаны C и E транзистора.", kk: "Pico USB-ден қоректенбейді (VBUS-та 5 В жоқ) немесе транзистордың C мен E-сі ауысқан." },
      fix: { en: "Power it from a USB charger and check the E-B-C order against your transistor's datasheet.", ru: "Питайте от USB-зарядки и сверьте порядок E-B-C с даташитом транзистора.", kk: "USB зарядтағыштан қоректендіріп, E-B-C ретін транзистор құжатымен салыстырыңыз." },
    },
    {
      symptom: { en: "Readings drift slowly over weeks", ru: "Показания медленно уплывают за недели", kk: "Көрсеткіштер апталар бойы баяу ауытқиды" },
      cause: { en: "Moisture got into the unsealed board edges.", ru: "Влага попала в незащищённые края платы.", kk: "Ылғал платаның қорғалмаған жиектеріне енген." },
      fix: { en: "Dry the sensor, seal the edges and the top with varnish or heat-shrink, and recalibrate.", ru: "Просушите датчик, загерметизируйте края и верх лаком или термоусадкой и откалибруйте заново.", kk: "Датчикті кептіріп, жиектері мен үстін лакпен немесе термоотырғышпен қорғап, қайта калибрлеңіз." },
    },
  ],
  safety: [
    { en: "Keep the Pico and the USB supply away from the watering can; only the probe goes into the soil.", ru: "Держите Pico и USB-блок подальше от лейки; в землю идёт только щуп.", kk: "Pico мен USB қуат блогын суарғыштан алыс ұстаңыз; топыраққа тек зонд батырылады." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "plant monitor: dry=52000 wet=23000 alarm below 30%",
      "raw 38120  moisture 47%  ok",
      "raw 41870  moisture 34%  ok",
      "ALARM: soil is dry, water the plant",
      "raw 44210  moisture 26%  DRY",
      "raw 44350  moisture 26%  DRY",
      "OK: watered",
      "raw 27410  moisture 84%  ok",
      "raw 27380  moisture 84%  ok",
    ],
    leds: [{ label: "DRY", color: "#E53935" }],
  },
} satisfies GuideContent;
