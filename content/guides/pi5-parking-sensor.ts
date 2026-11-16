import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pi5-parking-sensor",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-5",
  category: "sensors",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 80,
  xpReward: 140,
  title: {
    en: "Raspberry Pi 5 Parking Sensor",
    ru: "Парктроник на Raspberry Pi 5",
    kk: "Raspberry Pi 5-тегі парктроник",
  },
  summary: {
    en: "An HC-SR04 measures the gap to the wall and three LEDs say go, slow or stop. A two-resistor divider brings the sensor's 5 V echo down to the 3.3 V the Pi 5 can take.",
    ru: "HC-SR04 измеряет расстояние до стены, а три светодиода показывают «можно», «медленнее» и «стоп». Делитель из двух резисторов снижает 5-вольтовое эхо датчика до 3,3 В, которые выдерживает Pi 5.",
    kk: "HC-SR04 қабырғаға дейінгі қашықтықты өлшейді, ал үш жарық диоды «жүре бер», «баяула» және «тоқта» деп көрсетеді. Екі резисторлы бөлгіш датчиктің 5 В эхо сигналын Pi 5 көтере алатын 3,3 В-қа дейін төмендетеді.",
  },
  parts: [
    { component: "raspberry-pi-5", qty: 1, spec: { en: "any RAM size, Raspberry Pi OS Bookworm, 27 W (5.1 V 5 A) USB-C supply", ru: "любой объём RAM, Raspberry Pi OS Bookworm, блок питания USB-C 27 Вт (5,1 В 5 А)", kk: "кез келген RAM көлемі, Raspberry Pi OS Bookworm, 27 Вт (5,1 В 5 А) USB-C қуат блогы" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "hc-sr04", qty: 1, spec: { en: "5 V, 2–400 cm", ru: "5 В, 2–400 см", kk: "5 В, 2–400 см" }, role: { en: "Measures the distance", ru: "Измеряет расстояние", kk: "Қашықтықты өлшейді" } },
    { component: "resistor", qty: 1, spec: { en: "1 kΩ, ¼ W", ru: "1 кОм, ¼ Вт", kk: "1 кОм, ¼ Вт" }, role: { en: "Top of the ECHO divider", ru: "Верхнее плечо делителя ECHO", kk: "ECHO бөлгішінің жоғарғы иіні" } },
    { component: "resistor", qty: 1, spec: { en: "2 kΩ, ¼ W (2.2 kΩ also works)", ru: "2 кОм, ¼ Вт (подойдёт и 2,2 кОм)", kk: "2 кОм, ¼ Вт (2,2 кОм да жарайды)" }, role: { en: "Bottom of the ECHO divider", ru: "Нижнее плечо делителя ECHO", kk: "ECHO бөлгішінің төменгі иіні" } },
    { component: "led", qty: 3, spec: { en: "5 mm: green, yellow, red", ru: "5 мм: зелёный, жёлтый, красный", kk: "5 мм: жасыл, сары, қызыл" }, role: { en: "Go, slow, stop", ru: "«Можно», «медленнее», «стоп»", kk: "«Жүре бер», «баяула», «тоқта»" } },
    { component: "resistor", qty: 3, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit (~5 mA at 3.3 V)", ru: "Ограничение тока светодиодов (~5 мА при 3,3 В)", kk: "Жарық диодтарының тогын шектеу (3,3 В-та ~5 мА)" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 12, spec: { en: "female-male and male-male", ru: "мама-папа и папа-папа", kk: "аналық-аталық және аталық-аталық" }, role: { en: "Pi header to breadboard", ru: "От разъёма Pi к макетке", kk: "Pi ағытпасынан макет тақтасына" } },
  ],
  instances: [
    { id: "us", component: "hc-sr04", label: "HC-SR04" },
    { id: "r1", component: "resistor", label: "1 kΩ" },
    { id: "r2", component: "resistor", label: "2 kΩ" },
    { id: "r_grn", component: "resistor", label: "220 Ω" },
    { id: "r_yel", component: "resistor", label: "220 Ω" },
    { id: "r_red", component: "resistor", label: "220 Ω" },
    { id: "led_grn", component: "led", label: "Go" },
    { id: "led_yel", component: "led", label: "Slow" },
    { id: "led_red", component: "led", label: "Stop" },
  ],
  connections: [
    { from: "board.5V", to: "us.VCC", color: "red", note: { en: "pin 2, the sensor needs 5 V", ru: "пин 2, датчику нужно 5 В", kk: "2-пин, датчикке 5 В керек" } },
    { from: "us.GND", to: "board.GND", color: "black", note: { en: "pin 6", ru: "пин 6", kk: "6-пин" } },
    { from: "board.GPIO23", to: "us.TRIG", color: "green", note: { en: "pin 16; 3.3 V is enough to trigger", ru: "пин 16; 3,3 В достаточно для запуска", kk: "16-пин; іске қосуға 3,3 В жеткілікті" } },
    { from: "us.ECHO", to: "r1.A", color: "yellow", note: { en: "5 V pulse, never straight to the Pi", ru: "импульс 5 В, никогда напрямую в Pi", kk: "5 В импульс, Pi-ге ешқашан тікелей қоспаңыз" } },
    { from: "r1.B", to: "board.GPIO24", color: "yellow", note: { en: "pin 18 sees 5 × 2/3 ≈ 3.3 V", ru: "пин 18 получает 5 × 2/3 ≈ 3,3 В", kk: "18-пин 5 × 2/3 ≈ 3,3 В алады" } },
    { from: "r2.A", to: "board.GPIO24", color: "yellow" },
    { from: "r2.B", to: "board.GND3", color: "black", note: { en: "pin 14", ru: "пин 14", kk: "14-пин" } },
    { from: "board.GPIO17", to: "r_grn.A", color: "green", note: { en: "pin 11", ru: "пин 11", kk: "11-пин" } },
    { from: "r_grn.B", to: "led_grn.A", color: "green", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led_grn.K", to: "board.GND2", color: "black", note: { en: "pin 9", ru: "пин 9", kk: "9-пин" } },
    { from: "board.GPIO27", to: "r_yel.A", color: "orange", note: { en: "pin 13", ru: "пин 13", kk: "13-пин" } },
    { from: "r_yel.B", to: "led_yel.A", color: "orange" },
    { from: "led_yel.K", to: "board.GND2", color: "black" },
    { from: "board.GPIO22", to: "r_red.A", color: "red", note: { en: "pin 15", ru: "пин 15", kk: "15-пин" } },
    { from: "r_red.B", to: "led_red.A", color: "red" },
    { from: "led_red.K", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Get the Pi 5 ready", ru: "Подготовьте Pi 5", kk: "Pi 5-ті дайындаңыз" },
      body: {
        en: "Flash Raspberry Pi OS Bookworm and power the Pi 5 from a 27 W USB-C supply; with a 3 A phone charger it boots but limits USB power and warns about it. gpiozero comes with the desktop image (on Lite: sudo apt install python3-gpiozero). On the Pi 5 the 40-pin header is driven by the new RP1 chip, so old RPi.GPIO scripts fail; gpiozero talks to it through lgpio, which is why this guide uses it.",
        ru: "Запишите Raspberry Pi OS Bookworm и питайте Pi 5 от блока USB-C на 27 Вт: от зарядки на 3 А он загрузится, но ограничит ток USB и предупредит об этом. gpiozero уже есть в образе с рабочим столом (в Lite: sudo apt install python3-gpiozero). На Pi 5 разъёмом GPIO управляет новый чип RP1, поэтому старые скрипты на RPi.GPIO не работают; gpiozero общается с ним через lgpio, поэтому в гайде используется именно он.",
        kk: "Raspberry Pi OS Bookworm жазып, Pi 5-ті 27 Вт USB-C қуат блогынан қоректендіріңіз: 3 А зарядтағыштан ол жүктеледі, бірақ USB тогын шектеп, бұл туралы ескертеді. gpiozero жұмыс үстелі бар бейнеде бұрыннан бар (Lite нұсқасында: sudo apt install python3-gpiozero). Pi 5-те 40 пиндік ағытпаны жаңа RP1 чипі басқарады, сондықтан ескі RPi.GPIO скрипттері жұмыс істемейді; gpiozero онымен lgpio арқылы байланысады, сол себепті бұл нұсқаулық соны қолданады.",
      },
      expect: { en: "python3 -c \"import gpiozero\" prints nothing, which means it is installed.", ru: "python3 -c \"import gpiozero\" ничего не выводит, значит библиотека установлена.", kk: "python3 -c \"import gpiozero\" ештеңе шығармайды, демек кітапхана орнатылған." },
      mistake: { en: "Copying an RPi.GPIO tutorial written for the Pi 4: on the Pi 5 it stops with an error about the SoC.", ru: "Взять урок на RPi.GPIO для Pi 4: на Pi 5 он падает с ошибкой про SoC.", kk: "Pi 4-ке арналған RPi.GPIO сабағын алу: Pi 5-те ол SoC туралы қатемен тоқтайды." },
    },
    {
      title: { en: "Build the ECHO divider", ru: "Соберите делитель для ECHO", kk: "ECHO бөлгішін құрастырыңыз" },
      body: {
        en: "The HC-SR04 runs on 5 V and its ECHO pin answers with a 5 V pulse, but every GPIO on the Pi 5 is 3.3 V only. Put the 1 kΩ resistor from ECHO to an empty breadboard row, then the 2 kΩ resistor from that row to GND. The middle row now sees 5 × 2 / (1 + 2) ≈ 3.3 V, and that row is what goes to the Pi.",
        ru: "HC-SR04 работает от 5 В, и вывод ECHO отвечает импульсом 5 В, а все GPIO у Pi 5 рассчитаны только на 3,3 В. Поставьте резистор 1 кОм от ECHO в свободный ряд макетки, а резистор 2 кОм из этого ряда на GND. Теперь в среднем ряду 5 × 2 / (1 + 2) ≈ 3,3 В, и именно этот ряд идёт к Pi.",
        kk: "HC-SR04 5 В-тан жұмыс істейді, ал ECHO шығысы 5 В импульспен жауап береді, бірақ Pi 5-тің барлық GPIO-сы тек 3,3 В-қа арналған. 1 кОм резисторды ECHO-дан макет тақтасының бос қатарына, ал 2 кОм резисторды сол қатардан GND-ге қойыңыз. Енді ортаңғы қатарда 5 × 2 / (1 + 2) ≈ 3,3 В, Pi-ге дәл осы қатар барады.",
      },
      expect: { en: "Two resistors in series between ECHO and GND, with one free row between them.", ru: "Два резистора последовательно между ECHO и GND, а между ними свободный ряд.", kk: "ECHO мен GND арасында тізбектей екі резистор, араларында бір бос қатар." },
      mistake: { en: "Swapping the two resistors: the Pi then gets about 1.7 V, which may read as low, so the distance never changes.", ru: "Перепутать резисторы местами: тогда Pi получит около 1,7 В, это может читаться как ноль, и расстояние не меняется.", kk: "Резисторларды ауыстырып қою: сонда Pi шамамен 1,7 В алады, бұл нөл болып оқылуы мүмкін, ал қашықтық өзгермейді." },
    },
    {
      title: { en: "Wire the sensor to the header", ru: "Подключите датчик к разъёму", kk: "Датчикті ағытпаға қосыңыз" },
      body: {
        en: "With the Pi powered off, connect VCC to 5V (pin 2) and GND to pin 6. TRIG goes straight to GPIO23 (pin 16): a 3.3 V pulse is enough to start a measurement. Connect the middle row of the divider to GPIO24 (pin 18) and the bottom of the 2 kΩ resistor to GND (pin 14). Pin numbers are physical positions; the code uses GPIO numbers.",
        ru: "При выключенном Pi подключите VCC к 5V (пин 2), а GND к пину 6. TRIG идёт напрямую на GPIO23 (пин 16): импульса 3,3 В достаточно, чтобы начать измерение. Средний ряд делителя соедините с GPIO24 (пин 18), а нижний конец резистора 2 кОм с GND (пин 14). Номера пинов здесь физические, а в коде используются номера GPIO.",
        kk: "Pi өшірулі кезде VCC-ті 5V-қа (2-пин), ал GND-ні 6-пинге қосыңыз. TRIG тікелей GPIO23-ке (16-пин) барады: өлшеуді бастауға 3,3 В импульс жеткілікті. Бөлгіштің ортаңғы қатарын GPIO24-ке (18-пин), ал 2 кОм резистордың төменгі ұшын GND-ге (14-пин) жалғаңыз. Мұндағы пин нөмірлері физикалық орындар, ал кодта GPIO нөмірлері қолданылады.",
      },
      expect: { en: "Four wires on the sensor; only TRIG and the divider's middle row touch GPIO pins.", ru: "К датчику идут четыре провода; к GPIO подключены только TRIG и средний ряд делителя.", kk: "Датчикке төрт сым барады; GPIO-ға тек TRIG пен бөлгіштің ортаңғы қатары қосылған." },
      mistake: { en: "Powering the sensor from 3V3: it may answer at short range but loses longer distances.", ru: "Питать датчик от 3V3: вблизи он может отвечать, но на дальних расстояниях теряет сигнал.", kk: "Датчикті 3V3-тен қоректендіру: жақын қашықтықта жауап беруі мүмкін, бірақ алыс қашықтықта сигналды жоғалтады." },
    },
    {
      title: { en: "Add the three LEDs", ru: "Добавьте три светодиода", kk: "Үш жарық диодын қосыңыз" },
      body: {
        en: "Put the green, yellow and red LEDs in a column with the long legs towards the resistors and a 220 Ω resistor in each anode row. Connect GPIO17 (pin 11) to green, GPIO27 (pin 13) to yellow and GPIO22 (pin 15) to red, and all short legs to the GND rail, which goes to pin 9.",
        ru: "Поставьте зелёный, жёлтый и красный светодиоды в столбик длинными ножками к резисторам, в ряд каждого анода резистор 220 Ом. Соедините GPIO17 (пин 11) с зелёным, GPIO27 (пин 13) с жёлтым, GPIO22 (пин 15) с красным, а все короткие ножки с шиной GND, которая идёт на пин 9.",
        kk: "Жасыл, сары және қызыл жарық диодтарын ұзын аяқтарын резисторларға қаратып бағанмен қойыңыз, әр анодтың қатарына 220 Ом резистор. GPIO17-ні (11-пин) жасылға, GPIO27-ні (13-пин) сарыға, GPIO22-ні (15-пин) қызылға, ал барлық қысқа аяқтарды 9-пинге баратын GND шинасына жалғаңыз.",
      },
      expect: { en: "Three LEDs, each with its own resistor, cathodes on one rail.", ru: "Три светодиода, у каждого свой резистор, катоды на одной шине.", kk: "Үш жарық диоды, әрқайсысының өз резисторы бар, катодтары бір шинада." },
      mistake: { en: "An LED in backwards just stays dark; turn it round, it is not damaged.", ru: "Перевёрнутый светодиод просто не горит; разверните его, он не повреждён.", kk: "Кері қойылған жарық диоды жай ғана жанбайды; оны бұрыңыз, ол бүлінбеген." },
    },
    {
      title: { en: "Run it and test", ru: "Запустите и проверьте", kk: "Іске қосып, тексеріңіз" },
      body: {
        en: "Power the Pi, save parking_sensor.py and run python3 parking_sensor.py. Move your hand towards the sensor: green above 60 cm, yellow from 60 down to 25 cm, red closer than that. The terminal prints the distance five times a second; Ctrl+C stops it and turns the LEDs off.",
        ru: "Включите Pi, сохраните parking_sensor.py и выполните python3 parking_sensor.py. Приближайте руку к датчику: дальше 60 см горит зелёный, от 60 до 25 см жёлтый, ближе красный. Терминал печатает расстояние пять раз в секунду; Ctrl+C останавливает программу и гасит светодиоды.",
        kk: "Pi-ді қосып, parking_sensor.py файлын сақтаңыз да, python3 parking_sensor.py орындаңыз. Қолыңызды датчикке жақындатыңыз: 60 см-ден алыс жасыл, 60-тан 25 см-ге дейін сары, одан жақын қызыл жанады. Терминал қашықтықты секундына бес рет шығарады; Ctrl+C бағдарламаны тоқтатып, жарық диодтарын сөндіреді.",
      },
      expect: { en: "Readings that follow your hand within a centimetre or two, and the LEDs switching at 60 and 25 cm.", ru: "Показания следуют за рукой с точностью до сантиметра-двух, а светодиоды переключаются на 60 и 25 см.", kk: "Көрсеткіштер қолыңызға бір-екі сантиметр дәлдікпен ереді, ал жарық диодтары 60 және 25 см-де ауысады." },
      mistake: { en: "Running it with sudo: not needed, the default user can already use the GPIO.", ru: "Запускать через sudo не нужно: стандартный пользователь уже имеет доступ к GPIO.", kk: "sudo арқылы іске қосудың қажеті жоқ: стандартты пайдаланушының GPIO-ға рұқсаты бар." },
    },
    {
      title: { en: "Tune and mount it", ru: "Настройте и установите", kk: "Баптап, орнатыңыз" },
      body: {
        en: "Change SLOW_CM and STOP_CM to suit your garage. Mount the sensor at bumper height, pointing straight at the car: ultrasound bounces off flat hard surfaces and gets lost on soft or sharply angled ones. Keep the Pi and breadboard away from water and exhaust.",
        ru: "Подберите SLOW_CM и STOP_CM под свой гараж. Установите датчик на высоте бампера и направьте прямо на машину: ультразвук хорошо отражается от ровных твёрдых поверхностей и теряется на мягких и сильно наклонённых. Держите Pi и макетку подальше от воды и выхлопа.",
        kk: "SLOW_CM мен STOP_CM мәндерін гаражыңызға қарай таңдаңыз. Датчикті бампер биіктігіне орнатып, көлікке тура бағыттаңыз: ультрадыбыс тегіс қатты беттерден жақсы шағылады, ал жұмсақ және қатты көлбеу беттерде жоғалады. Pi мен макет тақтасын судан және түтіннен алыс ұстаңыз.",
      },
      expect: { en: "Red lights up at the spot where you want the car to stop.", ru: "Красный загорается именно там, где машина должна остановиться.", kk: "Қызыл дәл көлік тоқтауы керек жерде жанады." },
      mistake: { en: "Aiming the sensor at the windscreen: glass at an angle sends the echo away and the reading jumps.", ru: "Направить датчик на лобовое стекло: наклонное стекло уводит эхо в сторону, и показания скачут.", kk: "Датчикті алдыңғы әйнекке бағыттау: көлбеу әйнек эхоны басқа жаққа шағылдырады, көрсеткіштер секіреді." },
    },
  ],
  code: [{
    filename: "parking_sensor.py",
    language: "python",
    libraries: ["gpiozero"],
    source: `#!/usr/bin/env python3
"""Parking sensor on a Raspberry Pi 5: HC-SR04 distance with gpiozero, three LEDs for go, slow and stop."""
import sys
from signal import SIGTERM, signal
from time import sleep

from gpiozero import LED, DistanceSensor

TRIG_PIN = 23     # physical pin 16
ECHO_PIN = 24     # physical pin 18, through the 1 kOhm / 2 kOhm divider
GREEN_PIN = 17    # physical pin 11
YELLOW_PIN = 27   # physical pin 13
RED_PIN = 22      # physical pin 15

SLOW_CM = 60      # closer than this: yellow
STOP_CM = 25      # closer than this: red

# queue_len averages the last readings, which smooths out single bad echoes.
sensor = DistanceSensor(echo=ECHO_PIN, trigger=TRIG_PIN, max_distance=2.0, queue_len=5)
green, yellow, red = LED(GREEN_PIN), LED(YELLOW_PIN), LED(RED_PIN)


def zone(cm):
    if cm < STOP_CM:
        return "STOP"
    if cm < SLOW_CM:
        return "SLOW"
    return "OK"


def show(name):
    green.value = name == "OK"
    yellow.value = name == "SLOW"
    red.value = name == "STOP"


def main():
    signal(SIGTERM, lambda *_: sys.exit(0))
    print("parking sensor ready", flush=True)
    try:
        while True:
            cm = sensor.distance * 100      # metres to centimetres; 200 means nothing in range
            name = zone(cm)
            show(name)
            print(f"{cm:5.1f} cm  {name}", flush=True)
            sleep(0.2)
    except KeyboardInterrupt:
        pass
    finally:
        for led in (green, yellow, red):
            led.off()
        sensor.close()
        print("stopped", flush=True)


if __name__ == "__main__":
    main()
`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The distance is stuck at 200 cm, or gpiozero warns \"no echo received\"", ru: "Расстояние застыло на 200 см или gpiozero пишет «no echo received»", kk: "Қашықтық 200 см-де тұрып қалды немесе gpiozero «no echo received» деп жазады" },
      cause: { en: "The echo never reaches GPIO24: the divider's middle row is not wired to pin 18, or the sensor has no 5 V.", ru: "Эхо не доходит до GPIO24: средний ряд делителя не соединён с пином 18 или у датчика нет 5 В.", kk: "Эхо GPIO24-ке жетпейді: бөлгіштің ортаңғы қатары 18-пинге қосылмаған немесе датчикте 5 В жоқ." },
      fix: { en: "Check VCC on pin 2 and GND on pin 6, then follow ECHO → 1 kΩ → pin 18 and pin 18 → 2 kΩ → GND.", ru: "Проверьте VCC на пине 2 и GND на пине 6, затем пройдите цепь ECHO → 1 кОм → пин 18 и пин 18 → 2 кОм → GND.", kk: "2-пиндегі VCC мен 6-пиндегі GND-ні тексеріп, ECHO → 1 кОм → 18-пин және 18-пин → 2 кОм → GND тізбегін қадағалаңыз." },
    },
    {
      symptom: { en: "Readings jump around by tens of centimetres", ru: "Показания прыгают на десятки сантиметров", kk: "Көрсеткіштер ондаған сантиметрге секіреді" },
      cause: { en: "The sound hits a soft, small or angled surface, or the sensor sees the floor.", ru: "Звук попадает на мягкую, маленькую или наклонную поверхность, или датчик видит пол.", kk: "Дыбыс жұмсақ, кішкентай немесе көлбеу бетке түседі не датчик еденді көреді." },
      fix: { en: "Aim it straight at a flat, hard target and raise it a little; increase queue_len to 9 for steadier numbers.", ru: "Направьте датчик прямо на ровную твёрдую цель и чуть поднимите его; увеличьте queue_len до 9, чтобы числа были стабильнее.", kk: "Датчикті тегіс қатты нысанаға тура бағыттап, сәл жоғары көтеріңіз; сандар тұрақты болуы үшін queue_len-ді 9-ға дейін арттырыңыз." },
    },
    {
      symptom: { en: "\"GPIO busy\" or an lgpio error when it starts", ru: "При запуске «GPIO busy» или ошибка lgpio", kk: "Іске қосқанда «GPIO busy» немесе lgpio қатесі" },
      cause: { en: "Another copy of the script, or another program, still holds these pins.", ru: "Другая копия скрипта или другая программа ещё держит эти пины.", kk: "Скрипттің басқа көшірмесі немесе басқа бағдарлама бұл пиндерді әлі ұстап тұр." },
      fix: { en: "Stop it (pkill -f parking_sensor.py) and run the script again.", ru: "Остановите её (pkill -f parking_sensor.py) и запустите скрипт снова.", kk: "Оны тоқтатып (pkill -f parking_sensor.py), скриптті қайта іске қосыңыз." },
    },
    {
      symptom: { en: "One LED never lights", ru: "Один светодиод не горит", kk: "Бір жарық диоды жанбайды" },
      cause: { en: "It is reversed, or its resistor sits in a different breadboard row.", ru: "Он перевёрнут, или его резистор стоит в другом ряду макетки.", kk: "Ол кері қойылған немесе оның резисторы макет тақтасының басқа қатарында тұр." },
      fix: { en: "Turn the LED so the long leg faces the resistor and make sure they share a row.", ru: "Разверните светодиод длинной ножкой к резистору и проверьте, что они в одном ряду.", kk: "Жарық диодын ұзын аяғын резисторға қаратып бұрыңыз және олардың бір қатарда екенін тексеріңіз." },
    },
  ],
  safety: [
    { en: "Never connect ECHO straight to a GPIO pin: 5 V can damage the Pi 5's I/O chip. Wire everything with the Pi powered off.", ru: "Никогда не подключайте ECHO напрямую к GPIO: 5 В может повредить чип ввода-вывода Pi 5. Собирайте схему при выключенном Pi.", kk: "ECHO-ны ешқашан GPIO-ға тікелей қоспаңыз: 5 В Pi 5-тің енгізу-шығару чипін бүлдіруі мүмкін. Схеманы Pi өшірулі кезде жинаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "parking sensor ready",
      "200.0 cm  OK",
      "143.2 cm  OK",
      " 78.5 cm  OK",
      " 58.9 cm  SLOW",
      " 41.0 cm  SLOW",
      " 24.6 cm  STOP",
      " 12.3 cm  STOP",
      " 35.7 cm  SLOW",
      " 88.0 cm  OK",
      "stopped",
    ],
    leds: [{ label: "GO", color: "#43A047" }, { label: "SLOW", color: "#FDD835" }, { label: "STOP", color: "#E53935" }],
  },
} satisfies GuideContent;
