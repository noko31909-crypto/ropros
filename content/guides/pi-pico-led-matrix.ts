import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pi-pico-led-matrix",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-pico",
  category: "displays",
  robotics: false,
  difficulty: "beginner",
  hours: 3,
  costUsd: 13,
  xpReward: 140,
  title: {
    en: "Pico LED Matrix Badge",
    ru: "Светодиодная матрица на Pico",
    kk: "Pico-дағы жарық диодты матрица",
  },
  summary: {
    en: "An 8×8 WS2812B panel on a Raspberry Pi Pico shows colour icons and scrolling text, written in MicroPython with the built-in neopixel and framebuf modules.",
    ru: "Панель WS2812B 8×8 на Raspberry Pi Pico показывает цветные иконки и бегущую строку. Код на MicroPython со встроенными модулями neopixel и framebuf.",
    kk: "Raspberry Pi Pico-ға қосылған 8×8 WS2812B панелі түрлі түсті белгішелер мен жүгіртпе жолды көрсетеді. Код MicroPython-да, кірістірілген neopixel және framebuf модульдерімен.",
  },
  parts: [
    { component: "raspberry-pi-pico", qty: 1, spec: { en: "RP2040, 3.3 V logic, MicroPython firmware", ru: "RP2040, логика 3,3 В, прошивка MicroPython", kk: "RP2040, 3,3 В логика, MicroPython микробағдарламасы" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "ws2812b-strip", qty: 1, spec: { en: "8×8 WS2812B panel (64 LEDs), pads 5V / DIN / GND", ru: "панель WS2812B 8×8 (64 светодиода), площадки 5V / DIN / GND", kk: "8×8 WS2812B панелі (64 жарық диоды), 5V / DIN / GND алаңшалары" }, role: { en: "The display", ru: "Дисплей", kk: "Дисплей" } },
    { component: "diode", qty: 1, spec: { en: "1N4007 (1 A)", ru: "1N4007 (1 А)", kk: "1N4007 (1 А)" }, role: { en: "Drops the panel supply to ~4.2 V so 3.3 V data is read reliably", ru: "Снижает питание панели до ~4,2 В, чтобы сигнал 3,3 В читался надёжно", kk: "3,3 В сигнал сенімді оқылуы үшін панель қуатын ~4,2 В-қа дейін төмендетеді" } },
    { component: "resistor", qty: 1, spec: { en: "330 Ω, ¼ W", ru: "330 Ом, ¼ Вт", kk: "330 Ом, ¼ Вт" }, role: { en: "Data line series resistor", ru: "Последовательный резистор на линии данных", kk: "Деректер желісіндегі тізбекті резистор" } },
    { component: "capacitor", qty: 1, spec: { en: "470–1000 µF, 10 V electrolytic", ru: "электролит 470–1000 мкФ, 10 В", kk: "470–1000 мкФ, 10 В электролиттік" }, role: { en: "Smooths current spikes on the panel supply", ru: "Сглаживает броски тока по питанию панели", kk: "Панель қуатындағы ток секірістерін тегістейді" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "mtx", component: "ws2812b-strip", label: "8×8 WS2812B" },
    { id: "d1", component: "diode", label: "1N4007" },
    { id: "r1", component: "resistor", label: "330 Ω" },
    { id: "c1", component: "capacitor", label: "1000 µF" },
  ],
  connections: [
    { from: "board.VBUS", to: "d1.A", color: "red", note: { en: "pin 40, 5 V from USB", ru: "пин 40, 5 В от USB", kk: "40-пин, USB-ден 5 В" } },
    { from: "d1.K", to: "mtx.5V", color: "red", note: { en: "striped end of the diode towards the panel", ru: "конец диода с полоской к панели", kk: "диодтың жолақты ұшы панельге қарай" } },
    { from: "c1.A", to: "mtx.5V", color: "red", note: { en: "+ leg of the capacitor", ru: "ножка «+» конденсатора", kk: "конденсатордың «+» аяғы" } },
    { from: "c1.B", to: "mtx.GND", color: "black" },
    { from: "mtx.GND", to: "board.GND", color: "black", note: { en: "pin 3", ru: "пин 3", kk: "3-пин" } },
    { from: "board.GP2", to: "r1.A", color: "green", note: { en: "pin 4", ru: "пин 4", kk: "4-пин" } },
    { from: "r1.B", to: "mtx.DIN", color: "green", note: { en: "DIN is on the side the arrows start from", ru: "DIN на стороне, откуда начинаются стрелки", kk: "DIN бағыттауыштар басталатын жақта" } },
  ],
  steps: [
    {
      title: { en: "Prepare the panel", ru: "Подготовьте панель", kk: "Панельді дайындаңыз" },
      body: {
        en: "Turn the 8×8 panel over and find the input side: the small arrows on the back point away from DIN. Solder or clip three wires to the input pads 5V, DIN and GND. Ignore the DOUT pads on the other side; they are only for chaining a second panel.",
        ru: "Переверните панель 8×8 и найдите входную сторону: маленькие стрелки на обороте указывают от DIN. Припаяйте или подключите три провода к входным площадкам 5V, DIN и GND. Площадки DOUT на другой стороне не трогайте: они нужны только для второй панели.",
        kk: "8×8 панелін аударып, кіріс жағын табыңыз: артқы жағындағы кішкентай бағыттауыштар DIN-нен әрі қарай көрсетеді. 5V, DIN және GND кіріс алаңшаларына үш сымды дәнекерлеңіз немесе қысқышпен бекітіңіз. Екінші жақтағы DOUT алаңшаларына тиіспеңіз, олар тек екінші панельді жалғауға керек.",
      },
      expect: { en: "Three labelled wires on the DIN side of the panel.", ru: "Три подписанных провода на стороне DIN.", kk: "Панельдің DIN жағында белгіленген үш сым." },
      mistake: { en: "Wiring to DOUT instead of DIN: the data only flows in the arrow direction, so the panel stays dark.", ru: "Подключение к DOUT вместо DIN: данные идут только по стрелкам, и панель не загорится.", kk: "DIN орнына DOUT-қа қосу: деректер тек бағыттауыш бойымен жүреді, сондықтан панель жанбайды." },
    },
    {
      title: { en: "Build the power path", ru: "Соберите цепь питания", kk: "Қуат тізбегін құрастырыңыз" },
      body: {
        en: "Put the Pico on the breadboard. Run VBUS (pin 40, 5 V from USB) into the 1N4007 anode; the striped cathode end goes to the panel 5V wire. Connect the panel GND to Pico GND (pin 3). Place the electrolytic capacitor across the panel 5V and GND, long + leg on 5V. The diode drops about 0.8 V, so the LEDs run at ~4.2 V and their data threshold (0.7 × supply ≈ 2.9 V) sits safely below the Pico's 3.3 V signal.",
        ru: "Установите Pico на макетку. Подайте VBUS (пин 40, 5 В от USB) на анод 1N4007, а конец с полоской (катод) соедините с проводом 5V панели. GND панели соедините с GND Pico (пин 3). Поставьте электролитический конденсатор между 5V и GND панели, длинной ножкой «+» к 5V. Диод отнимает около 0,8 В, поэтому светодиоды питаются от ~4,2 В, и их порог данных (0,7 × питание ≈ 2,9 В) надёжно ниже сигнала 3,3 В от Pico.",
        kk: "Pico-ны макет тақтасына орнатыңыз. VBUS-ты (40-пин, USB-ден 5 В) 1N4007 анодына жіберіңіз, ал жолақты ұшын (катод) панельдің 5V сымына қосыңыз. Панельдің GND-ін Pico GND-іне (3-пин) жалғаңыз. Электролиттік конденсаторды панельдің 5V пен GND арасына қойыңыз, ұзын «+» аяғы 5V-қа. Диод шамамен 0,8 В азайтады, сондықтан жарық диодтары ~4,2 В-пен жұмыс істейді, ал олардың деректер шегі (0,7 × қуат ≈ 2,9 В) Pico-ның 3,3 В сигналынан төмен болады.",
      },
      expect: { en: "With USB plugged in, a multimeter reads about 4.1–4.3 V between the panel 5V and GND.", ru: "При подключённом USB мультиметр показывает около 4,1–4,3 В между 5V и GND панели.", kk: "USB қосулы кезде мультиметр панельдің 5V пен GND арасында шамамен 4,1–4,3 В көрсетеді." },
      mistake: { en: "Feeding the panel from the 3V3 pin: 64 LEDs overload the Pico regulator and WS2812B needs at least 3.5 V.", ru: "Питание панели от пина 3V3: 64 светодиода перегружают стабилизатор Pico, а WS2812B нужно минимум 3,5 В.", kk: "Панельді 3V3 пинінен қоректендіру: 64 жарық диоды Pico тұрақтандырғышын шамадан тыс жүктейді, ал WS2812B-ге кемінде 3,5 В керек." },
    },
    {
      title: { en: "Connect the data line", ru: "Подключите линию данных", kk: "Деректер желісін қосыңыз" },
      body: {
        en: "Wire GP2 (pin 4) to one leg of the 330 Ω resistor and the other leg to the panel DIN. Keep this wire short, under 20 cm. The resistor damps ringing on the fast 800 kHz signal and protects the first LED's input.",
        ru: "Соедините GP2 (пин 4) с одной ножкой резистора 330 Ом, а другую ножку с DIN панели. Провод должен быть коротким, до 20 см. Резистор гасит звон на быстром сигнале 800 кГц и защищает вход первого светодиода.",
        kk: "GP2-ні (4-пин) 330 Ом резистордың бір аяғына, ал екінші аяғын панельдің DIN-іне қосыңыз. Бұл сым қысқа болсын, 20 см-ден аспасын. Резистор 800 кГц жылдам сигналдағы тербелісті басады және бірінші жарық диодының кірісін қорғайды.",
      },
      expect: { en: "Only three wires go to the panel: supply through the diode, GND and DIN through the resistor.", ru: "К панели идут только три провода: питание через диод, GND и DIN через резистор.", kk: "Панельге тек үш сым барады: диод арқылы қуат, GND және резистор арқылы DIN." },
      mistake: { en: "Forgetting the shared GND: without it the data has no reference and the colours flicker randomly.", ru: "Забытая общая земля: без неё у сигнала нет опоры, и цвета хаотично мерцают.", kk: "Ортақ жерді ұмыту: онсыз сигналдың тірегі болмайды да, түстер ретсіз жыпылықтайды." },
    },
    {
      title: { en: "Flash MicroPython and run the code", ru: "Прошейте MicroPython и запустите код", kk: "MicroPython-ды жүктеп, кодты іске қосыңыз" },
      body: {
        en: "Hold BOOTSEL while plugging in the Pico and drop the official MicroPython .uf2 onto the RPI-RP2 drive. Open Thonny, select the MicroPython (Raspberry Pi Pico) interpreter, paste the code and save it to the Pico as main.py. The neopixel and framebuf modules are built into the firmware, nothing to install.",
        ru: "Удерживая BOOTSEL, подключите Pico и скопируйте официальный файл MicroPython .uf2 на диск RPI-RP2. Откройте Thonny, выберите интерпретатор MicroPython (Raspberry Pi Pico), вставьте код и сохраните его на Pico как main.py. Модули neopixel и framebuf уже встроены в прошивку, ничего устанавливать не нужно.",
        kk: "BOOTSEL-ді басып тұрып Pico-ны қосыңыз да, ресми MicroPython .uf2 файлын RPI-RP2 дискісіне көшіріңіз. Thonny-ді ашып, MicroPython (Raspberry Pi Pico) интерпретаторын таңдаңыз, кодты қойып, Pico-ға main.py деп сақтаңыз. neopixel және framebuf модульдері микробағдарламада бар, ештеңе орнатудың қажеті жоқ.",
      },
      expect: { en: "The shell prints \"icon: heart\" and a red heart appears, then a smiley, a tick and scrolling text.", ru: "В консоли появляется «icon: heart», на панели загорается красное сердце, затем смайлик, галочка и бегущая строка.", kk: "Консольде «icon: heart» шығып, панельде қызыл жүрек, содан кейін смайлик, белгі және жүгіртпе жол пайда болады." },
      mistake: { en: "Saving the file only on the computer: the Pico will not run it after a reboot unless it is saved on the device as main.py.", ru: "Файл сохранён только на компьютере: после перезагрузки Pico его не запустит, пока он не сохранён на плате как main.py.", kk: "Файл тек компьютерде сақталған: ол платаға main.py деп сақталмайынша, Pico қайта қосылғанда оны іске қоспайды." },
    },
    {
      title: { en: "Fix the pixel order", ru: "Настройте порядок пикселей", kk: "Пиксель ретін баптаңыз" },
      body: {
        en: "Panels are wired either in a zigzag (every second row runs right to left) or row by row. The code assumes zigzag (SERPENTINE = True). If the heart looks torn, with every other row mirrored, set SERPENTINE = False and save again. If the text runs upside down, rotate the panel 180°.",
        ru: "Панели бывают с зигзагообразной разводкой (каждый второй ряд идёт справа налево) или построчной. Код рассчитан на зигзаг (SERPENTINE = True). Если сердце выглядит рваным и каждый второй ряд отзеркален, поставьте SERPENTINE = False и сохраните снова. Если текст идёт вверх ногами, поверните панель на 180°.",
        kk: "Панельдер не зигзаг тәрізді (әр екінші қатар оңнан солға жүреді), не қатарлап жалғанады. Код зигзагқа арналған (SERPENTINE = True). Егер жүрек жыртық болып, әр екінші қатары айнадай теріс көрінсе, SERPENTINE = False қойып, қайта сақтаңыз. Мәтін төңкеріліп жүрсе, панельді 180° бұраңыз.",
      },
      expect: { en: "The heart and the smiley look symmetrical and the text reads left to right.", ru: "Сердце и смайлик симметричны, текст читается слева направо.", kk: "Жүрек пен смайлик симметриялы, мәтін солдан оңға оқылады." },
      mistake: { en: "Raising LEVEL to fix a dim picture: brightness is not the problem, and at 255 a white panel would draw almost 4 A.", ru: "Повышать LEVEL, чтобы исправить картинку: дело не в яркости, а при 255 белая панель потребляет почти 4 А.", kk: "Суретті түзету үшін LEVEL-ді көтеру: мәселе жарықтықта емес, ал 255 болғанда ақ панель шамамен 4 А тұтынады." },
    },
    {
      title: { en: "Make it yours", ru: "Сделайте по-своему", kk: "Өзіңізге бейімдеңіз" },
      body: {
        en: "Add your own icon to ICONS: eight strings of eight characters, X for a lit pixel, plus an (r, g, b) colour. Change the scroll() text and speed_ms. Keep LEVEL at 24 or below when running from a computer USB port; with LEVEL = 24 the full white panel stays under about 0.45 A.",
        ru: "Добавьте свою иконку в ICONS: восемь строк по восемь символов, X означает горящий пиксель, плюс цвет (r, g, b). Поменяйте текст в scroll() и скорость speed_ms. При питании от USB компьютера держите LEVEL не выше 24: тогда даже полностью белая панель потребляет меньше 0,45 А.",
        kk: "ICONS-қа өз белгішеңізді қосыңыз: сегіз таңбадан тұратын сегіз жол, X жанып тұрған пикселді білдіреді, оған қоса (r, g, b) түсі. scroll() мәтінін және speed_ms жылдамдығын өзгертіңіз. Компьютердің USB портынан қоректенгенде LEVEL 24-тен аспасын: сонда толық ақ панель де 0,45 А-ден аз тұтынады.",
      },
      expect: { en: "Your icon appears in the loop between the others.", ru: "Ваша иконка появляется в цикле вместе с остальными.", kk: "Сіздің белгішеңіз циклде басқаларымен бірге шығады." },
      mistake: { en: "Rows of different length in an icon shift the picture; every row must be exactly 8 characters.", ru: "Строки разной длины сдвигают картинку: в каждой строке должно быть ровно 8 символов.", kk: "Әртүрлі ұзындықтағы жолдар суретті жылжытады: әр жолда дәл 8 таңба болуы керек." },
    },
  ],
  code: [{
    filename: "main.py",
    language: "python",
    libraries: [],
    source: `# Pico 8x8 WS2812B matrix: icons + scrolling text (MicroPython)
# Pins: GP2 -> 330 ohm -> DIN, panel 5V from VBUS through a 1N4007, GND -> GND
from machine import Pin
import neopixel
import framebuf
import time

LED_PIN = 2          # GP2 (physical pin 4)
WIDTH = 8
HEIGHT = 8
SERPENTINE = True    # False if every row starts on the same side
LEVEL = 24           # 0-255 per channel; 24 keeps a full white panel under ~0.45 A

np = neopixel.NeoPixel(Pin(LED_PIN, Pin.OUT), WIDTH * HEIGHT)

ICONS = {
    "heart": ((255, 0, 40), (
        "........",
        ".XX..XX.",
        "XXXXXXXX",
        "XXXXXXXX",
        ".XXXXXX.",
        "..XXXX..",
        "...XX...",
        "........",
    )),
    "smile": ((255, 170, 0), (
        "..XXXX..",
        ".X....X.",
        "X.X..X.X",
        "X......X",
        "X.X..X.X",
        "X..XX..X",
        ".X....X.",
        "..XXXX..",
    )),
    "check": ((0, 255, 60), (
        "........",
        ".......X",
        "......XX",
        "X....XX.",
        "XX..XX..",
        ".XXXX...",
        "..XX....",
        "........",
    )),
}


def dim(color):
    return tuple(c * LEVEL // 255 for c in color)


def index(x, y):
    # Map (x, y) with (0, 0) top-left to the LED number on the chain
    if SERPENTINE and y % 2:
        return y * WIDTH + (WIDTH - 1 - x)
    return y * WIDTH + x


def clear():
    np.fill((0, 0, 0))
    np.write()


def show_icon(name):
    color, rows = ICONS[name]
    c = dim(color)
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            np[index(x, y)] = c if ch == "X" else (0, 0, 0)
    np.write()
    print("icon:", name)


def scroll(text, color=(0, 140, 255), speed_ms=70):
    w = len(text) * 8
    buf = bytearray(w)                       # MONO_VLSB: one byte = one 8-pixel column
    fb = framebuf.FrameBuffer(buf, w, 8, framebuf.MONO_VLSB)
    fb.text(text, 0, 0, 1)                   # built-in 8x8 font
    c = dim(color)
    print("scroll:", text)
    for shift in range(-WIDTH, w + 1):
        for x in range(WIDTH):
            col = x + shift
            bits = buf[col] if 0 <= col < w else 0
            for y in range(HEIGHT):
                np[index(x, y)] = c if (bits >> y) & 1 else (0, 0, 0)
        np.write()
        time.sleep_ms(speed_ms)


clear()
print("matrix ready:", WIDTH * HEIGHT, "LEDs on GP2")
while True:
    for name in ("heart", "smile", "check"):
        show_icon(name)
        time.sleep(1.5)
    scroll("HELLO ROPROS!")
    clear()
    time.sleep(0.5)
`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The panel stays completely dark", ru: "Панель совсем не светится", kk: "Панель мүлде жанбайды" },
      cause: { en: "The data wire is on DOUT instead of DIN, the diode is reversed, or the code was not saved as main.py.", ru: "Провод данных на DOUT вместо DIN, диод перевёрнут или код не сохранён как main.py.", kk: "Деректер сымы DIN орнына DOUT-та, диод кері қойылған немесе код main.py деп сақталмаған." },
      fix: { en: "Move the wire to the DIN pad (arrows point away from it), put the diode stripe towards the panel and check the shell for \"matrix ready\".", ru: "Перенесите провод на DIN (стрелки указывают от него), поверните диод полоской к панели и проверьте, что в консоли есть «matrix ready».", kk: "Сымды DIN алаңшасына ауыстырыңыз (бағыттауыштар одан әрі қарай көрсетеді), диодты жолағымен панельге қаратып, консольде «matrix ready» бар-жоғын тексеріңіз." },
    },
    {
      symptom: { en: "Random colours or flicker, especially on the first LEDs", ru: "Случайные цвета или мерцание, особенно на первых светодиодах", kk: "Ретсіз түстер немесе жыпылықтау, әсіресе алғашқы жарық диодтарында" },
      cause: { en: "The 3.3 V data signal is too weak for LEDs powered at a full 5 V, or the GND wire is missing or loose.", ru: "Сигнал 3,3 В слишком слаб для светодиодов на полных 5 В, либо провод GND отсутствует или плохо держится.", kk: "3,3 В сигнал толық 5 В-пен қоректенетін жарық диодтары үшін әлсіз, не GND сымы жоқ немесе нашар жалғанған." },
      fix: { en: "Make sure the panel is fed through the 1N4007 (about 4.2 V, not 5 V), shorten the DIN wire and check the common GND.", ru: "Убедитесь, что панель питается через 1N4007 (около 4,2 В, а не 5 В), укоротите провод DIN и проверьте общую землю.", kk: "Панель 1N4007 арқылы қоректенетініне көз жеткізіңіз (5 В емес, шамамен 4,2 В), DIN сымын қысқартып, ортақ GND-ді тексеріңіз." },
    },
    {
      symptom: { en: "Every second row looks mirrored", ru: "Каждый второй ряд отзеркален", kk: "Әр екінші қатар айнадай теріс" },
      cause: { en: "The panel is wired row by row, but the code expects a zigzag.", ru: "Панель разведена построчно, а код ожидает зигзаг.", kk: "Панель қатарлап жалғанған, ал код зигзагты күтеді." },
      fix: { en: "Set SERPENTINE = False at the top of main.py.", ru: "Поставьте SERPENTINE = False в начале main.py.", kk: "main.py басында SERPENTINE = False деп қойыңыз." },
    },
    {
      symptom: { en: "The Pico resets or USB disconnects on bright frames", ru: "Pico перезагружается или отваливается USB на ярких кадрах", kk: "Жарық кадрларда Pico қайта жүктеледі немесе USB ажырайды" },
      cause: { en: "LEVEL was raised and the panel draws more than the USB port can supply.", ru: "LEVEL увеличен, и панель потребляет больше, чем может дать USB-порт.", kk: "LEVEL көтерілген, панель USB порты бере алатыннан көп ток тұтынады." },
      fix: { en: "Return LEVEL to 24 or lower, and keep the capacitor across the panel supply.", ru: "Верните LEVEL на 24 или ниже и оставьте конденсатор на питании панели.", kk: "LEVEL-ді 24-ке немесе одан төмен қайтарыңыз, конденсаторды панель қуатында қалдырыңыз." },
    },
  ],
  safety: [
    { en: "At full brightness 64 WS2812B LEDs can draw almost 4 A. Keep LEVEL low when powered from USB.", ru: "На полной яркости 64 светодиода WS2812B потребляют почти 4 А. При питании от USB держите LEVEL низким.", kk: "Толық жарықтықта 64 WS2812B жарық диоды шамамен 4 А тұтынады. USB-ден қоректенгенде LEVEL-ді төмен ұстаңыз." },
    { en: "Mind the capacitor polarity: the long leg (+) goes to the supply, the striped side to GND.", ru: "Соблюдайте полярность конденсатора: длинная ножка (+) к питанию, сторона с полоской к GND.", kk: "Конденсатордың полярлығын сақтаңыз: ұзын аяғы (+) қуатқа, жолақты жағы GND-ге." },
  ],
  simulation: {
    baud: 115200,
    lines: ["matrix ready: 64 LEDs on GP2", "icon: heart", "icon: smile", "icon: check", "scroll: HELLO ROPROS!", "icon: heart", "icon: smile", "icon: check", "scroll: HELLO ROPROS!"],
    leds: [{ label: "HEART", color: "#FF0028" }, { label: "SMILE", color: "#FFAA00" }, { label: "CHECK", color: "#00FF3C" }, { label: "TEXT", color: "#008CFF" }],
  },
} satisfies GuideContent;
