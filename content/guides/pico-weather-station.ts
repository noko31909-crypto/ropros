import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pico-weather-station",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-pico",
  category: "iot",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 14,
  xpReward: 200,
  title: {
    en: "Pico Weather Station",
    ru: "Метеостанция на Pico",
    kk: "Pico ауа райы станциясы",
  },
  summary: {
    en: "A BME280 and an SSD1306 OLED share one I²C bus on a Raspberry Pi Pico: temperature, humidity, sea-level pressure and a 3-hour pressure trend, with a small MicroPython BME280 driver you write yourself.",
    ru: "BME280 и OLED SSD1306 на одной шине I²C у Raspberry Pi Pico: температура, влажность, давление на уровне моря и тренд давления за 3 часа. Небольшой драйвер BME280 на MicroPython пишете сами.",
    kk: "BME280 мен SSD1306 OLED Raspberry Pi Pico-ның бір I²C шинасында: температура, ылғалдылық, теңіз деңгейіндегі қысым және 3 сағаттық қысым үрдісі. Шағын MicroPython BME280 драйверін өзіңіз жазасыз.",
  },
  parts: [
    { component: "raspberry-pi-pico", qty: 1, spec: { en: "RP2040, 3.3 V logic, MicroPython 1.22 or newer", ru: "RP2040, логика 3,3 В, MicroPython 1.22 или новее", kk: "RP2040, 3,3 В логика, MicroPython 1.22 немесе жаңарағы" }, role: { en: "Reads the sensor and drives the display", ru: "Опрашивает датчик и управляет дисплеем", kk: "Датчикті оқиды және дисплейді басқарады" } },
    { component: "bme280", qty: 1, spec: { en: "4-pin module (VIN, GND, SCL, SDA), address 0x76 or 0x77", ru: "4-пиновый модуль (VIN, GND, SCL, SDA), адрес 0x76 или 0x77", kk: "4 пинді модуль (VIN, GND, SCL, SDA), мекенжайы 0x76 немесе 0x77" }, role: { en: "Temperature, humidity and pressure", ru: "Температура, влажность и давление", kk: "Температура, ылғалдылық және қысым" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C, address 0x3C", ru: "0,96\" 128×64, I²C, адрес 0x3C", kk: "0,96\" 128×64, I²C, мекенжайы 0x3C" }, role: { en: "Display", ru: "Дисплей", kk: "Дисплей" } },
    { component: "breadboard", qty: 1, spec: { en: "full size", ru: "полноразмерная", kk: "толық өлшемді" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Shared I²C bus and power", ru: "Общая шина I²C и питание", kk: "Ортақ I²C шинасы және қуат" } },
    { component: "enclosure", qty: 1, spec: { en: "vented box or radiation shield for outdoor use", ru: "вентилируемый корпус или радиационный экран для улицы", kk: "сыртқа арналған желдетілетін қорап немесе радиациялық қалқан" }, role: { en: "Keeps sun and rain off the sensor", ru: "Защищает датчик от солнца и дождя", kk: "Датчикті күн мен жаңбырдан қорғайды" }, optional: true },
  ],
  instances: [
    { id: "bme", component: "bme280", label: "BME280" },
    { id: "oled", component: "oled-ssd1306", label: "SSD1306 128×64" },
  ],
  connections: [
    { from: "board.3V3", to: "bme.VIN", color: "red", note: { en: "pin 36", ru: "пин 36", kk: "36-пин" } },
    { from: "bme.GND", to: "board.GND7", color: "black", note: { en: "pin 38", ru: "пин 38", kk: "38-пин" } },
    { from: "board.GP4", to: "bme.SDA", color: "blue", note: { en: "pin 6, I2C0 SDA", ru: "пин 6, I2C0 SDA", kk: "6-пин, I2C0 SDA" } },
    { from: "board.GP5", to: "bme.SCL", color: "yellow", note: { en: "pin 7, I2C0 SCL", ru: "пин 7, I2C0 SCL", kk: "7-пин, I2C0 SCL" } },
    { from: "board.3V3", to: "oled.VCC", color: "red" },
    { from: "oled.GND", to: "board.GND2", color: "black", note: { en: "pin 8", ru: "пин 8", kk: "8-пин" } },
    { from: "board.GP4", to: "oled.SDA", color: "blue", note: { en: "same bus as the BME280", ru: "та же шина, что у BME280", kk: "BME280-пен бір шина" } },
    { from: "board.GP5", to: "oled.SCL", color: "yellow" },
  ],
  steps: [
    {
      title: { en: "Build the shared I²C bus", ru: "Соберите общую шину I²C", kk: "Ортақ I²C шинасын құрастырыңыз" },
      body: {
        en: "Put the Pico at one end of the breadboard and run 3V3 (pin 36) and GND (pin 38) to the power rails. Use two free breadboard rows as the bus: one for SDA from GP4 (pin 6), one for SCL from GP5 (pin 7). Plug both modules' SDA into the SDA row and SCL into the SCL row, and power them from the rails. I²C devices each have their own address, so they happily share the two wires.",
        ru: "Поставьте Pico на край макетки и выведите 3V3 (пин 36) и GND (пин 38) на шины питания. Две свободные строки макетки станут шиной: одна для SDA от GP4 (пин 6), другая для SCL от GP5 (пин 7). Подключите SDA обоих модулей к строке SDA, SCL к строке SCL и запитайте их от шин питания. У каждого I²C-устройства свой адрес, поэтому они спокойно делят два провода.",
        kk: "Pico-ны макет тақтасының шетіне қойып, 3V3 (36-пин) мен GND-ді (38-пин) қуат шиналарына шығарыңыз. Тақтаның екі бос қатары шина болады: бірі GP4-тен (6-пин) SDA үшін, екіншісі GP5-тен (7-пин) SCL үшін. Екі модульдің SDA-сын SDA қатарына, SCL-ін SCL қатарына қосып, оларды қуат шиналарынан қоректендіріңіз. Әр I²C құрылғысының өз мекенжайы бар, сондықтан олар екі сымды бөлісе береді.",
      },
      expect: { en: "Both modules on 3.3 V, with their SDA and SCL lines joined.", ru: "Оба модуля на 3,3 В, их линии SDA и SCL объединены.", kk: "Екі модуль де 3,3 В-та, олардың SDA және SCL желілері біріктірілген." },
      mistake: { en: "Powering the modules from VBUS (5 V): many OLED boards then pull SDA/SCL up to 5 V, which the Pico's GPIO cannot tolerate.", ru: "Питание модулей от VBUS (5 В): многие платы OLED тогда подтягивают SDA/SCL к 5 В, а GPIO Pico этого не выдерживают.", kk: "Модульдерді VBUS-тан (5 В) қоректендіру: көптеген OLED платалары SDA/SCL-ді 5 В-қа тартады, ал Pico GPIO-сы оған төзбейді." },
    },
    {
      title: { en: "Install MicroPython and the OLED driver", ru: "Установите MicroPython и драйвер OLED", kk: "MicroPython мен OLED драйверін орнатыңыз" },
      body: {
        en: "Flash the latest MicroPython .uf2 (hold BOOTSEL while plugging in). Install the ssd1306 driver from micropython-lib: on the computer run mpremote mip install ssd1306, or in Thonny use Tools → Manage packages and search for ssd1306. It lands in /lib on the Pico.",
        ru: "Прошейте свежий MicroPython .uf2 (удерживая BOOTSEL при подключении). Установите драйвер ssd1306 из micropython-lib: на компьютере выполните mpremote mip install ssd1306 или в Thonny откройте Tools → Manage packages и найдите ssd1306. Он попадёт в /lib на Pico.",
        kk: "Соңғы MicroPython .uf2 файлын жүктеңіз (қосқанда BOOTSEL-ді басып тұрыңыз). micropython-lib ішінен ssd1306 драйверін орнатыңыз: компьютерде mpremote mip install ssd1306 орындаңыз немесе Thonny-де Tools → Manage packages ашып, ssd1306 іздеңіз. Ол Pico-дағы /lib қалтасына түседі.",
      },
      expect: { en: "import ssd1306 in the shell gives no error.", ru: "import ssd1306 в консоли проходит без ошибки.", kk: "Консольде import ssd1306 қатесіз орындалады." },
      mistake: { en: "Copying a random ssd1306.py from a blog written for CircuitPython: it uses different imports and fails.", ru: "Скопировать случайный ssd1306.py из блога, написанный для CircuitPython: там другие импорты, и он не работает.", kk: "Блогтан CircuitPython-ға арналған кездейсоқ ssd1306.py көшіру: онда басқа импорттар бар және ол жұмыс істемейді." },
    },
    {
      title: { en: "Add the BME280 driver and scan the bus", ru: "Добавьте драйвер BME280 и просканируйте шину", kk: "BME280 драйверін қосып, шинаны сканерлеңіз" },
      body: {
        en: "Save bme280.py to the Pico. It checks the chip ID (0x60), reads the factory calibration and applies Bosch's floating-point compensation formulas. In the shell run: from machine import I2C, Pin; I2C(0, sda=Pin(4), scl=Pin(5)).scan(). You should see [60, 118]: 0x3C for the OLED and 0x76 for the BME280 (119 = 0x77 on some boards; main.py detects both).",
        ru: "Сохраните bme280.py на Pico. Он проверяет ID чипа (0x60), читает заводскую калибровку и применяет формулы компенсации Bosch с плавающей точкой. В консоли выполните: from machine import I2C, Pin; I2C(0, sda=Pin(4), scl=Pin(5)).scan(). Должно получиться [60, 118]: 0x3C у OLED и 0x76 у BME280 (на некоторых платах 119 = 0x77, main.py находит оба).",
        kk: "bme280.py файлын Pico-ға сақтаңыз. Ол чип ID-ін (0x60) тексереді, зауыттық калибрлеуді оқиды және Bosch-тың жылжымалы нүктелі өтемақы формулаларын қолданады. Консольде орындаңыз: from machine import I2C, Pin; I2C(0, sda=Pin(4), scl=Pin(5)).scan(). Нәтиже [60, 118] болуы керек: OLED үшін 0x3C және BME280 үшін 0x76 (кейбір платаларда 119 = 0x77, main.py екеуін де табады).",
      },
      expect: { en: "The scan lists exactly two addresses.", ru: "Сканирование показывает ровно два адреса.", kk: "Сканерлеу дәл екі мекенжайды көрсетеді." },
      mistake: { en: "An empty list usually means SDA and SCL are swapped or a module has no power.", ru: "Пустой список обычно значит, что SDA и SCL перепутаны или модуль без питания.", kk: "Бос тізім әдетте SDA мен SCL ауысқанын немесе модульде қуат жоқ екенін білдіреді." },
    },
    {
      title: { en: "Run the station", ru: "Запустите станцию", kk: "Станцияны іске қосыңыз" },
      body: {
        en: "Set ALTITUDE_M in main.py to your height above sea level in metres, then save the file to the Pico as main.py. The OLED shows temperature, humidity and pressure corrected to sea level, so it matches weather reports. Every 10 minutes a pressure sample is stored; after one hour the bottom line shows the 3-hour trend: rising, falling or steady.",
        ru: "Укажите в main.py ALTITUDE_M, высоту над уровнем моря в метрах, и сохраните файл на Pico как main.py. OLED покажет температуру, влажность и давление, приведённое к уровню моря, как в прогнозах погоды. Каждые 10 минут сохраняется замер давления; через час нижняя строка покажет тренд за 3 часа: rising, falling или steady.",
        kk: "main.py ішінде ALTITUDE_M-ге теңіз деңгейінен биіктігіңізді метрмен жазып, файлды Pico-ға main.py деп сақтаңыз. OLED температураны, ылғалдылықты және ауа райы болжамдарындағыдай теңіз деңгейіне келтірілген қысымды көрсетеді. Әр 10 минут сайын қысым өлшемі сақталады; бір сағаттан кейін төменгі жол 3 сағаттық үрдісті көрсетеді: rising, falling немесе steady.",
      },
      expect: { en: "Readings refresh every 5 s and the shell prints the same values.", ru: "Показания обновляются каждые 5 с, а консоль печатает те же значения.", kk: "Көрсеткіштер әр 5 с сайын жаңарады, консоль де сол мәндерді шығарады." },
      mistake: { en: "Leaving ALTITUDE_M at 0 in a high city: pressure then reads far below the forecast (about 12 hPa less per 100 m).", ru: "Оставить ALTITUDE_M = 0 в высоком городе: давление будет сильно ниже прогноза (примерно на 12 гПа на каждые 100 м).", kk: "Биік қалада ALTITUDE_M = 0 қалдыру: қысым болжамнан әлдеқайда төмен болады (әр 100 м сайын шамамен 12 гПа)." },
    },
    {
      title: { en: "Place the sensor well", ru: "Правильно разместите датчик", kk: "Датчикті дұрыс орналастырыңыз" },
      body: {
        en: "Put the BME280 on wires 10 cm or more away from the Pico and the OLED, in shade and in moving air. Electronics and direct sun warm it by 1–3 °C and make humidity read too low. Outdoors, use a vented box that keeps rain off but lets air through.",
        ru: "Вынесите BME280 на проводах на 10 см и дальше от Pico и OLED, в тень и на свободный поток воздуха. Электроника и прямое солнце нагревают его на 1–3 °C, и влажность получается заниженной. На улице используйте вентилируемый корпус, защищающий от дождя, но пропускающий воздух.",
        kk: "BME280-ді сымдармен Pico мен OLED-тен кемінде 10 см алысқа, көлеңкеге және ауа еркін қозғалатын жерге шығарыңыз. Электроника мен тікелей күн оны 1–3 °C-қа қыздырады, ылғалдылық төмен шығады. Сыртта жаңбырдан қорғайтын, бірақ ауа өткізетін желдетілетін қорапты қолданыңыз.",
      },
      expect: { en: "Temperature agrees with a reference thermometer within about 1 °C.", ru: "Температура совпадает с эталонным термометром примерно в пределах 1 °C.", kk: "Температура эталон термометрмен шамамен 1 °C дәлдікте сәйкес келеді." },
      mistake: { en: "Sealing the sensor in an airtight box: humidity and temperature stop following the room.", ru: "Закрыть датчик в герметичную коробку: влажность и температура перестанут следовать за комнатой.", kk: "Датчикті герметикалық қорапқа жабу: ылғалдылық пен температура бөлмеге ілеспей қалады." },
    },
  ],
  code: [
    {
      filename: "main.py",
      language: "python",
      libraries: ["ssd1306"],
      source: `# Pico weather station: BME280 + SSD1306 OLED on I2C0 (GP4 SDA, GP5 SCL), MicroPython
from machine import Pin, I2C
import time
from ssd1306 import SSD1306_I2C
from bme280 import BME280

SDA_PIN = 4
SCL_PIN = 5
ALTITUDE_M = 0             # your height above sea level, for sea-level pressure
READ_EVERY_S = 5
SAMPLE_EVERY_MS = 600000   # store one pressure sample every 10 min
SAMPLES_3H = 18            # 18 x 10 min = 3 hours

i2c = I2C(0, sda=Pin(SDA_PIN), scl=Pin(SCL_PIN), freq=400000)
found = i2c.scan()
print("i2c devices:", [hex(a) for a in found])
bme = BME280(i2c, 0x76 if 0x76 in found else 0x77)
oled = SSD1306_I2C(128, 64, i2c, addr=0x3C)

history = []               # sea-level pressure samples, oldest first
last_sample = None


def sea_level(p_hpa):
    return p_hpa / (1 - ALTITUDE_M / 44330.0) ** 5.255


def trend():
    if len(history) < 7:   # need at least one hour of samples
        return "--"
    per_3h = (history[-1] - history[0]) * SAMPLES_3H / (len(history) - 1)
    if per_3h > 1.6:
        return "rising"
    if per_3h < -1.6:
        return "falling"
    return "steady"


def draw(t, h, p, tr):
    oled.fill(0)
    oled.text("PICO WEATHER", 16, 0)
    oled.hline(0, 10, 128, 1)
    oled.text("T  %5.1f C" % t, 0, 16)
    oled.text("RH %5.1f %%" % h, 0, 28)
    oled.text("P %6.1f hPa" % p, 0, 40)
    oled.text("Trend " + tr, 0, 54)
    oled.show()


while True:
    t, p_raw, h = bme.read()
    p = sea_level(p_raw)
    now = time.ticks_ms()
    if last_sample is None or time.ticks_diff(now, last_sample) >= SAMPLE_EVERY_MS:
        history.append(p)
        if len(history) > SAMPLES_3H + 1:
            history.pop(0)
        last_sample = now
    tr = trend()
    draw(t, h, p, tr)
    print("T %.1f C  RH %.1f %%  P %.1f hPa  trend %s" % (t, h, p, tr))
    time.sleep(READ_EVERY_S)
`,
    },
    {
      filename: "bme280.py",
      language: "python",
      libraries: [],
      source: `# Minimal BME280 driver for MicroPython over I2C.
# Floating-point compensation formulas from the Bosch BME280 datasheet, section 8.1.
import struct
import time


class BME280:
    def __init__(self, i2c, address=0x76):
        self.i2c = i2c
        self.addr = address
        chip = self._read(0xD0, 1)[0]
        if chip != 0x60:
            raise OSError("chip id 0x%02x is not a BME280 (0x58 = BMP280, no humidity)" % chip)
        self._write(0xE0, 0xB6)                  # soft reset
        time.sleep_ms(5)
        while self._read(0xF3, 1)[0] & 0x01:     # wait for calibration copy
            time.sleep_ms(2)
        (self.T1, self.T2, self.T3, self.P1, self.P2, self.P3, self.P4,
         self.P5, self.P6, self.P7, self.P8, self.P9) = struct.unpack("<HhhHhhhhhhhh", self._read(0x88, 24))
        self.H1 = self._read(0xA1, 1)[0]
        h = self._read(0xE1, 7)
        self.H2 = struct.unpack("<h", h[0:2])[0]
        self.H3 = h[2]
        self.H4 = (h[3] << 4) | (h[4] & 0x0F)
        if h[3] & 0x80:
            self.H4 -= 4096
        self.H5 = (h[5] << 4) | (h[4] >> 4)
        if h[5] & 0x80:
            self.H5 -= 4096
        self.H6 = h[6] - 256 if h[6] & 0x80 else h[6]
        self._write(0xF2, 0x01)    # humidity oversampling x1 (must come before 0xF4)
        self._write(0xF5, 0xA0)    # standby 1000 ms, IIR filter off
        self._write(0xF4, 0x27)    # temperature x1, pressure x1, normal mode
        time.sleep_ms(50)

    def _read(self, reg, n):
        return self.i2c.readfrom_mem(self.addr, reg, n)

    def _write(self, reg, value):
        self.i2c.writeto_mem(self.addr, reg, bytes([value]))

    def read(self):
        """Return (temperature C, pressure hPa, relative humidity %)."""
        d = self._read(0xF7, 8)
        adc_p = (d[0] << 12) | (d[1] << 4) | (d[2] >> 4)
        adc_t = (d[3] << 12) | (d[4] << 4) | (d[5] >> 4)
        adc_h = (d[6] << 8) | d[7]

        v1 = (adc_t / 16384.0 - self.T1 / 1024.0) * self.T2
        v2 = (adc_t / 131072.0 - self.T1 / 8192.0) ** 2 * self.T3
        t_fine = v1 + v2
        temp = t_fine / 5120.0

        v1 = t_fine / 2.0 - 64000.0
        v2 = v1 * v1 * self.P6 / 32768.0
        v2 = v2 + v1 * self.P5 * 2.0
        v2 = v2 / 4.0 + self.P4 * 65536.0
        v1 = (self.P3 * v1 * v1 / 524288.0 + self.P2 * v1) / 524288.0
        v1 = (1.0 + v1 / 32768.0) * self.P1
        if v1 == 0:
            press = 0.0
        else:
            p = 1048576.0 - adc_p
            p = (p - v2 / 4096.0) * 6250.0 / v1
            v1 = self.P9 * p * p / 2147483648.0
            v2 = p * self.P8 / 32768.0
            press = p + (v1 + v2 + self.P7) / 16.0

        hum = t_fine - 76800.0
        hum = (adc_h - (self.H4 * 64.0 + self.H5 / 16384.0 * hum)) * (
            self.H2 / 65536.0 * (1.0 + self.H6 / 67108864.0 * hum * (1.0 + self.H3 / 67108864.0 * hum)))
        hum = hum * (1.0 - self.H1 * hum / 524288.0)
        hum = max(0.0, min(100.0, hum))
        return temp, press / 100.0, hum
`,
    },
  ],
  troubleshooting: [
    {
      symptom: { en: "\"chip id 0x58 is not a BME280\"", ru: "«chip id 0x58 is not a BME280»", kk: "«chip id 0x58 is not a BME280»" },
      cause: { en: "The board carries a BMP280, which looks the same but has no humidity sensor.", ru: "На плате стоит BMP280: выглядит так же, но не измеряет влажность.", kk: "Платада BMP280 тұр: сырты бірдей, бірақ ылғалдылықты өлшемейді." },
      fix: { en: "Buy a genuine BME280 (the chip is square, BMP280 is rectangular), or drop humidity and use a BMP280 driver.", ru: "Купите настоящий BME280 (чип квадратный, у BMP280 прямоугольный) или откажитесь от влажности и возьмите драйвер BMP280.", kk: "Нағыз BME280 сатып алыңыз (чипі шаршы, BMP280-дікі тіктөртбұрыш) немесе ылғалдылықтан бас тартып, BMP280 драйверін қолданыңыз." },
    },
    {
      symptom: { en: "\"OSError: [Errno 5] EIO\" on start", ru: "«OSError: [Errno 5] EIO» при запуске", kk: "Іске қосқанда «OSError: [Errno 5] EIO»" },
      cause: { en: "A device does not answer: wrong wiring, no power, or the OLED is at 0x3D.", ru: "Устройство не отвечает: ошибка в проводке, нет питания или OLED на адресе 0x3D.", kk: "Құрылғы жауап бермейді: сымдар қате, қуат жоқ немесе OLED 0x3D мекенжайында." },
      fix: { en: "Check the \"i2c devices\" line in the shell; if it shows 0x3d, change addr=0x3C to addr=0x3D.", ru: "Посмотрите строку «i2c devices» в консоли; если там 0x3d, замените addr=0x3C на addr=0x3D.", kk: "Консольдегі «i2c devices» жолын қараңыз; онда 0x3d болса, addr=0x3C-ті addr=0x3D-ге ауыстырыңыз." },
    },
    {
      symptom: { en: "Temperature 2–3 °C too high", ru: "Температура завышена на 2–3 °C", kk: "Температура 2–3 °C жоғары" },
      cause: { en: "The sensor sits next to the Pico or OLED, or in sunlight.", ru: "Датчик стоит рядом с Pico или OLED либо на солнце.", kk: "Датчик Pico немесе OLED жанында не күн астында тұр." },
      fix: { en: "Move it away on longer wires (up to ~50 cm works at 400 kHz) and shade it.", ru: "Вынесите его на проводах подлиннее (до ~50 см работает на 400 кГц) и затените.", kk: "Оны ұзынырақ сымдармен алысқа шығарып (400 кГц-те ~50 см-ге дейін жұмыс істейді), көлеңкелеңіз." },
    },
    {
      symptom: { en: "\"ImportError: no module named 'ssd1306'\"", ru: "«ImportError: no module named 'ssd1306'»", kk: "«ImportError: no module named 'ssd1306'»" },
      cause: { en: "The OLED driver was not installed on the Pico.", ru: "Драйвер OLED не установлен на Pico.", kk: "OLED драйвері Pico-ға орнатылмаған." },
      fix: { en: "Run mpremote mip install ssd1306 with the Pico connected (close Thonny first).", ru: "Выполните mpremote mip install ssd1306 с подключённым Pico (сначала закройте Thonny).", kk: "Pico қосулы кезде mpremote mip install ssd1306 орындаңыз (алдымен Thonny-ді жабыңыз)." },
    },
  ],
  safety: [
    { en: "Power both modules from 3V3 only: the Pico's I²C pins are not 5 V tolerant.", ru: "Питайте оба модуля только от 3V3: пины I²C у Pico не выдерживают 5 В.", kk: "Екі модульді де тек 3V3-тен қоректендіріңіз: Pico-ның I²C пиндері 5 В-қа төзбейді." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "i2c devices: ['0x3c', '0x76']",
      "T 22.4 C  RH 41.2 %  P 1013.6 hPa  trend --",
      "T 22.4 C  RH 41.3 %  P 1013.6 hPa  trend --",
      "T 22.5 C  RH 41.1 %  P 1013.5 hPa  trend --",
      "T 22.7 C  RH 40.8 %  P 1012.9 hPa  trend steady",
      "T 22.9 C  RH 40.2 %  P 1011.2 hPa  trend falling",
    ],
    leds: [],
  },
} satisfies GuideContent;
