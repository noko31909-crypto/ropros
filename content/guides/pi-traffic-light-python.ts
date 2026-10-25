import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pi-traffic-light-python",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-4",
  category: "home",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 52,
  xpReward: 110,
  title: {
    en: "Python Traffic Light on Raspberry Pi",
    ru: "Светофор на Python для Raspberry Pi",
    kk: "Raspberry Pi-ге арналған Python бағдаршамы",
  },
  summary: {
    en: "Three LEDs and a push button on a Raspberry Pi 4 become a pedestrian crossing: gpiozero's TrafficLights runs the cycle, and the button shortens green so people can cross sooner.",
    ru: "Три светодиода и кнопка на Raspberry Pi 4 превращаются в пешеходный переход: TrafficLights из gpiozero ведёт цикл, а кнопка сокращает зелёный, чтобы пешеход перешёл быстрее.",
    kk: "Raspberry Pi 4-тегі үш жарық диоды мен батырма жаяу жүргіншілер өткеліне айналады: gpiozero-ның TrafficLights циклді жүргізеді, ал батырма жасылды қысқартып, адамға тезірек өтуге мүмкіндік береді.",
  },
  parts: [
    { component: "raspberry-pi-4", qty: 1, spec: { en: "Raspberry Pi OS Bookworm, 5 V 3 A USB-C supply", ru: "Raspberry Pi OS Bookworm, блок питания USB-C 5 В 3 А", kk: "Raspberry Pi OS Bookworm, USB-C 5 В 3 А қуат блогы" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "led", qty: 3, spec: { en: "5 mm: red, yellow, green", ru: "5 мм: красный, жёлтый, зелёный", kk: "5 мм: қызыл, сары, жасыл" }, role: { en: "Traffic lights", ru: "Сигналы светофора", kk: "Бағдаршам сигналдары" } },
    { component: "resistor", qty: 3, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit (~5 mA at 3.3 V)", ru: "Ограничение тока светодиодов (~5 мА при 3,3 В)", kk: "Жарық диодтарының тогын шектеу (3,3 В-та ~5 мА)" } },
    { component: "push-button", qty: 1, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Crossing request", ru: "Запрос перехода", kk: "Өтуді сұрау" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "female-male", ru: "мама-папа", kk: "аналық-аталық" }, role: { en: "Pi header to breadboard", ru: "От разъёма Pi к макетке", kk: "Pi ағытпасынан макет тақтасына" } },
  ],
  instances: [
    { id: "r_red", component: "resistor", label: "220 Ω" },
    { id: "r_amb", component: "resistor", label: "220 Ω" },
    { id: "r_grn", component: "resistor", label: "220 Ω" },
    { id: "led_red", component: "led", label: "Red" },
    { id: "led_amb", component: "led", label: "Amber" },
    { id: "led_grn", component: "led", label: "Green" },
    { id: "btn", component: "push-button", label: "Cross" },
  ],
  connections: [
    { from: "board.GPIO17", to: "r_red.A", color: "red", note: { en: "pin 11", ru: "пин 11", kk: "11-пин" } },
    { from: "r_red.B", to: "led_red.A", color: "red", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led_red.K", to: "board.GND2", color: "black", note: { en: "pin 9", ru: "пин 9", kk: "9-пин" } },
    { from: "board.GPIO27", to: "r_amb.A", color: "yellow", note: { en: "pin 13", ru: "пин 13", kk: "13-пин" } },
    { from: "r_amb.B", to: "led_amb.A", color: "yellow" },
    { from: "led_amb.K", to: "board.GND2", color: "black" },
    { from: "board.GPIO22", to: "r_grn.A", color: "green", note: { en: "pin 15", ru: "пин 15", kk: "15-пин" } },
    { from: "r_grn.B", to: "led_grn.A", color: "green" },
    { from: "led_grn.K", to: "board.GND2", color: "black" },
    { from: "board.GPIO23", to: "btn.1", color: "blue", note: { en: "pin 16, internal pull-up", ru: "пин 16, внутренняя подтяжка", kk: "16-пин, ішкі тарту" } },
    { from: "btn.2", to: "board.GND3", color: "black", note: { en: "pin 14", ru: "пин 14", kk: "14-пин" } },
  ],
  steps: [
    {
      title: { en: "Place the LEDs and resistors", ru: "Установите светодиоды и резисторы", kk: "Жарық диодтары мен резисторларды орнатыңыз" },
      body: {
        en: "Put the red, yellow and green LEDs in a column on the breadboard with the long leg (anode) towards the resistor side. Plug a 220 Ω resistor into each anode's row. Connect all short legs (cathodes) to the breadboard's blue GND rail.",
        ru: "Поставьте красный, жёлтый и зелёный светодиоды в столбик на макетке длинной ножкой (анодом) в сторону резисторов. В ряд каждого анода вставьте резистор 220 Ом. Все короткие ножки (катоды) соедините с синей шиной GND.",
        kk: "Қызыл, сары және жасыл жарық диодтарын макет тақтасына бағанмен, ұзын аяғын (анодты) резисторлар жаққа қаратып қойыңыз. Әр анодтың қатарына 220 Ом резистор қойыңыз. Барлық қысқа аяқтарды (катодтарды) көк GND шинасына қосыңыз.",
      },
      expect: { en: "Three LEDs, each with its own resistor, cathodes on one rail.", ru: "Три светодиода, у каждого свой резистор, катоды на одной шине.", kk: "Үш жарық диоды, әрқайсысының өз резисторы бар, катодтары бір шинада." },
      mistake: { en: "An LED in backwards just stays dark; flip it and it works, it is not damaged.", ru: "Перевёрнутый светодиод просто не горит; разверните его, он не повреждён.", kk: "Кері қойылған жарық диоды жай ғана жанбайды; оны бұрыңыз, ол бүлінбеген." },
    },
    {
      title: { en: "Wire the LEDs to the GPIO header", ru: "Подключите светодиоды к GPIO", kk: "Жарық диодтарын GPIO-ға қосыңыз" },
      body: {
        en: "With the Pi off, connect GPIO17 (pin 11) to the red resistor, GPIO27 (pin 13) to yellow and GPIO22 (pin 15) to green. Connect the GND rail to GND (pin 9). Pin numbers here are physical positions on the 40-pin header; the code uses the BCM GPIO numbers 17, 27 and 22.",
        ru: "При выключенном Pi соедините GPIO17 (пин 11) с резистором красного, GPIO27 (пин 13) с жёлтым, GPIO22 (пин 15) с зелёным. Шину GND соедините с GND (пин 9). Номера пинов здесь это физические позиции на 40-пиновом разъёме, а в коде используются номера BCM GPIO 17, 27 и 22.",
        kk: "Pi өшірулі кезде GPIO17-ні (11-пин) қызылдың резисторына, GPIO27-ні (13-пин) сарыға, GPIO22-ні (15-пин) жасылға қосыңыз. GND шинасын GND-ге (9-пин) жалғаңыз. Мұндағы пин нөмірлері 40 пинді ағытпадағы физикалық орындар, ал кодта BCM GPIO нөмірлері 17, 27 және 22 қолданылады.",
      },
      expect: { en: "Three signal wires on pins 11, 13, 15 and a ground wire on pin 9.", ru: "Три сигнальных провода на пинах 11, 13, 15 и земля на пине 9.", kk: "11, 13, 15-пиндерде үш сигнал сымы және 9-пинде жер сымы." },
      mistake: { en: "Mixing up physical pin numbers and GPIO numbers: LED(11) in code means GPIO11, which is physical pin 23.", ru: "Путать физические номера и номера GPIO: LED(11) в коде означает GPIO11, а это физический пин 23.", kk: "Физикалық нөмір мен GPIO нөмірін шатастыру: кодтағы LED(11) GPIO11-ді білдіреді, ал ол физикалық 23-пин." },
    },
    {
      title: { en: "Add the crossing button", ru: "Добавьте кнопку перехода", kk: "Өту батырмасын қосыңыз" },
      body: {
        en: "Place the button across the centre gap. Wire one leg to GPIO23 (pin 16) and the diagonally opposite leg to GND (pin 14). gpiozero's Button turns on the internal pull-up, so the pin reads high until you press.",
        ru: "Поставьте кнопку поперёк центральной канавки. Одну ножку подключите к GPIO23 (пин 16), ножку по диагонали к GND (пин 14). Button из gpiozero включает внутреннюю подтяжку, поэтому пин читает высокий уровень, пока кнопка не нажата.",
        kk: "Батырманы орталық ойықтың үстінен қойыңыз. Бір аяғын GPIO23-ке (16-пин), диагональ бойынша қарсы аяғын GND-ге (14-пин) қосыңыз. gpiozero-ның Button класы ішкі тартуды қосады, сондықтан басылмайынша пин жоғары деңгейді оқиды.",
      },
      expect: { en: "No extra resistor is needed for the button.", ru: "Отдельный резистор для кнопки не нужен.", kk: "Батырмаға бөлек резистор керек емес." },
      mistake: { en: "Wiring the button to 3V3 instead of GND: with the pull-up the pin then never changes.", ru: "Подключить кнопку к 3V3 вместо GND: с подтяжкой пин тогда никогда не меняется.", kk: "Батырманы GND орнына 3V3-ке қосу: тартумен бірге пин ешқашан өзгермейді." },
    },
    {
      title: { en: "Run the program", ru: "Запустите программу", kk: "Бағдарламаны іске қосыңыз" },
      body: {
        en: "gpiozero ships with Raspberry Pi OS (on Lite: sudo apt install python3-gpiozero). Save traffic_light.py and run python3 traffic_light.py. The light runs green → blinking green → yellow → red → red+yellow → green, the sequence used in Kazakhstan and Russia.",
        ru: "gpiozero входит в Raspberry Pi OS (на Lite: sudo apt install python3-gpiozero). Сохраните traffic_light.py и выполните python3 traffic_light.py. Светофор идёт по циклу зелёный → мигающий зелёный → жёлтый → красный → красный+жёлтый → зелёный, как в Казахстане и России.",
        kk: "gpiozero Raspberry Pi OS құрамында бар (Lite нұсқасында: sudo apt install python3-gpiozero). traffic_light.py файлын сақтап, python3 traffic_light.py орындаңыз. Бағдаршам жасыл → жыпылықтаған жасыл → сары → қызыл → қызыл+сары → жасыл циклімен жүреді, Қазақстан мен Ресейдегідей.",
      },
      expect: { en: "The terminal prints each phase name as the LEDs change.", ru: "Терминал печатает название каждой фазы при смене светодиодов.", kk: "Жарық диодтары ауысқанда терминал әр фазаның атауын шығарады." },
      mistake: { en: "Running it with sudo: not needed, the default user is already in the gpio group.", ru: "Запускать через sudo не нужно: стандартный пользователь уже в группе gpio.", kk: "sudo арқылы іске қосудың қажеті жоқ: әдепкі пайдаланушы gpio тобында бар." },
    },
    {
      title: { en: "Request a crossing", ru: "Запросите переход", kk: "Өтуді сұраңыз" },
      body: {
        en: "Press the button during green. After a minimum of 3 s of green (so cars are not stopped instantly), the cycle moves on and the pedestrian gets a longer 10 s red. Pressing again during the same cycle is ignored. Change GREEN_S, MIN_GREEN_S and CROSS_RED_S at the top of the file to tune the timing.",
        ru: "Нажмите кнопку на зелёном. После минимум 3 с зелёного (чтобы машины не останавливались мгновенно) цикл пойдёт дальше, а пешеход получит удлинённый красный на 10 с. Повторные нажатия в том же цикле игнорируются. Настройте время через GREEN_S, MIN_GREEN_S и CROSS_RED_S в начале файла.",
        kk: "Жасыл кезде батырманы басыңыз. Кемінде 3 с жасылдан кейін (көліктер бірден тоқтамауы үшін) цикл әрі қарай жылжиды, ал жаяу жүргінші 10 с ұзартылған қызыл алады. Сол циклдегі қайта басулар еленбейді. Уақытты файл басындағы GREEN_S, MIN_GREEN_S және CROSS_RED_S арқылы баптаңыз.",
      },
      expect: { en: "\"button pressed: crossing requested\" appears once, then the light goes amber within a few seconds.", ru: "Один раз появляется «button pressed: crossing requested», и через несколько секунд загорается жёлтый.", kk: "«button pressed: crossing requested» бір рет шығады да, бірнеше секундтан кейін сары жанады." },
      mistake: { en: "Using time.sleep() for the whole green phase would make the button feel dead; the code waits on an Event instead.", ru: "time.sleep() на всю зелёную фазу сделал бы кнопку «мёртвой»; поэтому код ждёт Event.", kk: "Бүкіл жасыл фазаға time.sleep() батырманы «өлі» етер еді; сондықтан код Event-ті күтеді." },
    },
  ],
  code: [{
    filename: "traffic_light.py",
    language: "python",
    libraries: ["gpiozero"],
    source: `#!/usr/bin/env python3
"""Pedestrian traffic light: gpiozero TrafficLights + Button on a Raspberry Pi 4."""
import sys
from signal import SIGTERM, signal
from threading import Event
from time import sleep

from gpiozero import Button, TrafficLights

RED_PIN = 17      # physical pin 11
AMBER_PIN = 27    # physical pin 13
GREEN_PIN = 22    # physical pin 15
BUTTON_PIN = 23   # physical pin 16, other leg to GND

GREEN_S = 12          # normal green
MIN_GREEN_S = 3       # green always lasts at least this long
BLINK_N = 3           # blinking green before amber
AMBER_S = 2
RED_S = 6             # normal red
CROSS_RED_S = 10      # red when a pedestrian asked to cross
RED_AMBER_S = 1

lights = TrafficLights(red=RED_PIN, amber=AMBER_PIN, green=GREEN_PIN)
button = Button(BUTTON_PIN, bounce_time=0.05)
crossing = Event()


def on_press():
    if lights.red.is_lit:             # already red: pedestrians may cross now
        return
    if not crossing.is_set():
        crossing.set()
        print("button pressed: crossing requested", flush=True)


def show(red, amber, green, name):
    lights.value = (red, amber, green)
    print(name, flush=True)


def cycle():
    show(0, 0, 1, "GREEN")
    sleep(MIN_GREEN_S)
    crossing.wait(GREEN_S - MIN_GREEN_S)      # returns early when the button is pressed

    print("GREEN blinking", flush=True)
    lights.green.blink(on_time=0.5, off_time=0.5, n=BLINK_N, background=False)

    show(0, 1, 0, "AMBER")
    sleep(AMBER_S)

    walk = crossing.is_set()
    crossing.clear()
    show(1, 0, 0, "RED - walk" if walk else "RED")
    sleep(CROSS_RED_S if walk else RED_S)

    show(1, 1, 0, "RED+AMBER")
    sleep(RED_AMBER_S)


def main():
    signal(SIGTERM, lambda *_: sys.exit(0))
    button.when_pressed = on_press
    print("traffic light running, press the button to cross", flush=True)
    try:
        while True:
            cycle()
    except KeyboardInterrupt:
        pass
    finally:
        lights.off()
        print("stopped", flush=True)


if __name__ == "__main__":
    main()
`,
  }],
  troubleshooting: [
    {
      symptom: { en: "One LED never lights", ru: "Один светодиод не горит", kk: "Бір жарық диоды жанбайды" },
      cause: { en: "It is reversed, or its resistor is in a different breadboard row from the LED.", ru: "Он перевёрнут, или его резистор стоит в другом ряду макетки.", kk: "Ол кері қойылған немесе резисторы макет тақтасының басқа қатарында тұр." },
      fix: { en: "Turn the LED so the long leg faces the resistor and make sure they share a row.", ru: "Разверните светодиод длинной ножкой к резистору и проверьте, что они в одном ряду.", kk: "Жарық диодын ұзын аяғымен резисторға қаратып, екеуі бір қатарда тұрғанын тексеріңіз." },
    },
    {
      symptom: { en: "The wrong colour lights up", ru: "Загорается не тот цвет", kk: "Басқа түс жанады" },
      cause: { en: "The wires are on the right header pins but in a different order than RED_PIN, AMBER_PIN, GREEN_PIN.", ru: "Провода на нужных пинах, но в другом порядке, чем RED_PIN, AMBER_PIN, GREEN_PIN.", kk: "Сымдар дұрыс пиндерде, бірақ RED_PIN, AMBER_PIN, GREEN_PIN ретінен басқаша." },
      fix: { en: "Swap the wires, or change the three constants to match your wiring.", ru: "Поменяйте провода местами или измените три константы под свою проводку.", kk: "Сымдарды ауыстырыңыз немесе үш тұрақтыны өз сымдарыңызға сәйкес өзгертіңіз." },
    },
    {
      symptom: { en: "\"GPIO busy\" or \"Failed to add edge detection\" on start", ru: "«GPIO busy» или «Failed to add edge detection» при запуске", kk: "Іске қосқанда «GPIO busy» немесе «Failed to add edge detection»" },
      cause: { en: "Another copy of the script, or another program, is still using these pins.", ru: "Другая копия скрипта или другая программа ещё занимает эти пины.", kk: "Скрипттің басқа көшірмесі немесе басқа бағдарлама бұл пиндерді әлі қолданып тұр." },
      fix: { en: "Stop the other copy (pkill -f traffic_light.py) and run it again.", ru: "Остановите другую копию (pkill -f traffic_light.py) и запустите снова.", kk: "Басқа көшірмені тоқтатып (pkill -f traffic_light.py), қайта іске қосыңыз." },
    },
  ],
  safety: [
    { en: "Always use a series resistor with each LED and wire with the Pi powered off.", ru: "Всегда ставьте резистор последовательно с каждым светодиодом и собирайте схему при выключенном Pi.", kk: "Әр жарық диодымен тізбектей әрқашан резистор қойып, сұлбаны Pi өшірулі кезде жинаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "traffic light running, press the button to cross",
      "GREEN",
      "button pressed: crossing requested",
      "GREEN blinking",
      "AMBER",
      "RED - walk",
      "RED+AMBER",
      "GREEN",
      "GREEN blinking",
      "AMBER",
      "RED",
      "RED+AMBER",
    ],
    leds: [{ label: "RED", color: "#E53935" }, { label: "AMBER", color: "#FDD835" }, { label: "GREEN", color: "#43A047" }],
  },
} satisfies GuideContent;
