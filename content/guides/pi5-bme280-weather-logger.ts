import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pi5-bme280-weather-logger",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-5",
  category: "iot",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 78,
  xpReward: 140,
  title: {
    en: "Raspberry Pi 5 Weather Logger",
    ru: "Метеологгер на Raspberry Pi 5",
    kk: "Raspberry Pi 5-тегі ауа райы тіркегіші",
  },
  summary: {
    en: "A BME280 on the Pi 5's I2C bus measures temperature, humidity and air pressure, and a Python script writes one CSV row a minute that any spreadsheet can chart.",
    ru: "BME280 на шине I2C у Pi 5 измеряет температуру, влажность и давление, а Python-скрипт раз в минуту пишет строку в CSV, которую можно построить графиком в любой таблице.",
    kk: "Pi 5-тің I2C шинасындағы BME280 температураны, ылғалдылықты және ауа қысымын өлшейді, ал Python скрипті минут сайын CSV-ге бір жол жазады, оны кез келген кестеде графикке салуға болады.",
  },
  parts: [
    { component: "raspberry-pi-5", qty: 1, spec: { en: "any RAM size, Raspberry Pi OS Bookworm, 27 W (5.1 V 5 A) USB-C supply", ru: "любой объём RAM, Raspberry Pi OS Bookworm, блок питания USB-C 27 Вт (5,1 В 5 А)", kk: "кез келген RAM көлемі, Raspberry Pi OS Bookworm, 27 Вт (5,1 В 5 А) USB-C қуат блогы" }, role: { en: "Controller and data store", ru: "Контроллер и хранилище данных", kk: "Контроллер және деректер қоймасы" } },
    { component: "bme280", qty: 1, spec: { en: "4-pin I2C board, address 0x76 or 0x77", ru: "4-контактная плата I2C, адрес 0x76 или 0x77", kk: "4 түйіспелі I2C тақтасы, мекенжайы 0x76 немесе 0x77" }, role: { en: "Temperature, humidity, pressure", ru: "Температура, влажность, давление", kk: "Температура, ылғалдылық, қысым" } },
    { component: "jumper-wires", qty: 4, spec: { en: "female-female, 20 cm or longer", ru: "мама-мама, от 20 см", kk: "аналық-аналық, 20 см-ден ұзын" }, role: { en: "Keep the sensor away from the warm Pi", ru: "Отнести датчик подальше от тёплого Pi", kk: "Датчикті жылы Pi-ден алыс ұстау" } },
  ],
  instances: [
    { id: "env", component: "bme280", label: "BME280" },
  ],
  connections: [
    { from: "board.3V3", to: "env.VIN", color: "red", note: { en: "pin 1; 3.3 V, not 5 V", ru: "пин 1; 3,3 В, не 5 В", kk: "1-пин; 5 В емес, 3,3 В" } },
    { from: "env.GND", to: "board.GND", color: "black", note: { en: "pin 6", ru: "пин 6", kk: "6-пин" } },
    { from: "board.GPIO2", to: "env.SDA", color: "blue", note: { en: "pin 3, I2C1 SDA", ru: "пин 3, I2C1 SDA", kk: "3-пин, I2C1 SDA" } },
    { from: "board.GPIO3", to: "env.SCL", color: "purple", note: { en: "pin 5, I2C1 SCL", ru: "пин 5, I2C1 SCL", kk: "5-пин, I2C1 SCL" } },
  ],
  steps: [
    {
      title: { en: "Turn on I2C", ru: "Включите I2C", kk: "I2C-ді қосыңыз" },
      body: {
        en: "On Raspberry Pi OS Bookworm open sudo raspi-config, choose Interface Options → I2C → Yes, then reboot. Install the bus scanner with sudo apt install i2c-tools. The Pi 5 keeps the usual I2C bus 1 on GPIO2 and GPIO3 (pins 3 and 5), so wiring from older Pi guides still applies.",
        ru: "В Raspberry Pi OS Bookworm откройте sudo raspi-config, выберите Interface Options → I2C → Yes и перезагрузитесь. Установите сканер шины: sudo apt install i2c-tools. У Pi 5 привычная шина I2C 1 осталась на GPIO2 и GPIO3 (пины 3 и 5), так что подключение из гайдов для старых Pi подходит.",
        kk: "Raspberry Pi OS Bookworm-да sudo raspi-config ашып, Interface Options → I2C → Yes таңдаңыз да, қайта жүктеңіз. Шина сканерін орнатыңыз: sudo apt install i2c-tools. Pi 5-те әдеттегі I2C 1 шинасы GPIO2 мен GPIO3-те (3 және 5-пиндер) қалды, сондықтан ескі Pi нұсқаулықтарындағы қосылыс жарамды.",
      },
      expect: { en: "ls /dev/i2c-1 shows the device after the reboot.", ru: "После перезагрузки ls /dev/i2c-1 показывает устройство.", kk: "Қайта жүктегеннен кейін ls /dev/i2c-1 құрылғыны көрсетеді." },
      mistake: { en: "Skipping the reboot: the bus may not appear until the next boot.", ru: "Пропустить перезагрузку: шина может появиться только после неё.", kk: "Қайта жүктеуді өткізіп жіберу: шина тек содан кейін пайда болуы мүмкін." },
    },
    {
      title: { en: "Wire the sensor", ru: "Подключите датчик", kk: "Датчикті қосыңыз" },
      body: {
        en: "With the Pi powered off, connect VIN to 3V3 (pin 1), GND to pin 6, SDA to GPIO2 (pin 3) and SCL to GPIO3 (pin 5). Use 3.3 V even if the board says 3–5 V: on many breakouts the I2C pull-ups go to VIN, and 5 V on SDA or SCL can damage the Pi. Longer wires keep the sensor out of the warm air around the Pi 5.",
        ru: "При выключенном Pi соедините VIN с 3V3 (пин 1), GND с пином 6, SDA с GPIO2 (пин 3), SCL с GPIO3 (пин 5). Используйте 3,3 В, даже если на плате написано 3–5 В: у многих плат подтяжки I2C идут к VIN, а 5 В на SDA или SCL может повредить Pi. Длинные провода уводят датчик из тёплого воздуха вокруг Pi 5.",
        kk: "Pi өшірулі кезде VIN-ді 3V3-ке (1-пин), GND-ні 6-пинге, SDA-ны GPIO2-ге (3-пин), SCL-ді GPIO3-ке (5-пин) қосыңыз. Тақтада 3–5 В деп жазылса да, 3,3 В қолданыңыз: көп тақталарда I2C тартқыштары VIN-ге қосылған, ал SDA немесе SCL-дегі 5 В Pi-ді бүлдіруі мүмкін. Ұзын сымдар датчикті Pi 5 айналасындағы жылы ауадан алыстатады.",
      },
      expect: { en: "Four wires: power, ground and the two I2C lines.", ru: "Четыре провода: питание, земля и две линии I2C.", kk: "Төрт сым: қуат, жер және I2C-дің екі желісі." },
      mistake: { en: "Swapping SDA and SCL: nothing is damaged, but the scan in the next step finds no device.", ru: "Перепутать SDA и SCL: ничего не сгорит, но сканирование на следующем шаге ничего не найдёт.", kk: "SDA мен SCL-ді ауыстырып қою: ештеңе бүлінбейді, бірақ келесі қадамдағы сканер құрылғыны таппайды." },
    },
    {
      title: { en: "Find the sensor's address", ru: "Найдите адрес датчика", kk: "Датчиктің мекенжайын табыңыз" },
      body: {
        en: "Power the Pi and run i2cdetect -y 1. A BME280 answers at 76, or at 77 when its SDO pin is tied high. If you see 77, change ADDRESS in the script to 0x77.",
        ru: "Включите Pi и выполните i2cdetect -y 1. BME280 отвечает по адресу 76, или 77, если его вывод SDO подтянут к питанию. Если видите 77, поменяйте ADDRESS в скрипте на 0x77.",
        kk: "Pi-ді қосып, i2cdetect -y 1 орындаңыз. BME280 76 мекенжайында, ал SDO шығысы қуатқа тартылса, 77-де жауап береді. 77 көрсеңіз, скрипттегі ADDRESS мәнін 0x77-ге өзгертіңіз.",
      },
      expect: { en: "One number, 76 or 77, in the grid; everything else shows --.", ru: "В таблице одно число, 76 или 77; остальное --.", kk: "Кестеде бір сан, 76 немесе 77; қалғаны --." },
      mistake: { en: "Running i2cdetect without -y 1: on the Pi 5 the sensor is on bus 1, and other buses show nothing.", ru: "Запускать i2cdetect без -y 1: на Pi 5 датчик на шине 1, на других шинах его нет.", kk: "i2cdetect-ті -y 1-сіз іске қосу: Pi 5-те датчик 1-шинада, басқа шиналарда ол жоқ." },
    },
    {
      title: { en: "Install the libraries in a virtual environment", ru: "Установите библиотеки в виртуальное окружение", kk: "Кітапханаларды виртуалды ортаға орнатыңыз" },
      body: {
        en: "Bookworm refuses system-wide pip installs (\"externally-managed-environment\"), so make a virtual environment: python3 -m venv ~/weather, then ~/weather/bin/pip install smbus2 RPi.bme280. RPi.bme280 only talks I2C through smbus2, so it works on the Pi 5 even though the GPIO chip changed.",
        ru: "Bookworm не разрешает ставить pip-пакеты в систему («externally-managed-environment»), поэтому создайте виртуальное окружение: python3 -m venv ~/weather, затем ~/weather/bin/pip install smbus2 RPi.bme280. RPi.bme280 общается только по I2C через smbus2, поэтому работает на Pi 5, хотя чип GPIO там другой.",
        kk: "Bookworm pip пакеттерін жүйеге орнатуға рұқсат бермейді («externally-managed-environment»), сондықтан виртуалды орта жасаңыз: python3 -m venv ~/weather, содан кейін ~/weather/bin/pip install smbus2 RPi.bme280. RPi.bme280 тек smbus2 арқылы I2C-мен байланысады, сондықтан GPIO чипі басқа болса да, Pi 5-те жұмыс істейді.",
      },
      expect: { en: "pip reports \"Successfully installed\" for both packages.", ru: "pip сообщает «Successfully installed» для обоих пакетов.", kk: "pip екі пакет үшін де «Successfully installed» деп хабарлайды." },
      mistake: { en: "Adding --break-system-packages to silence the error: it can break apt-managed Python tools later.", ru: "Добавить --break-system-packages, чтобы убрать ошибку: позже это может сломать Python-утилиты из apt.", kk: "Қатені жою үшін --break-system-packages қосу: кейін бұл apt-тағы Python құралдарын бұзуы мүмкін." },
    },
    {
      title: { en: "Log the weather", ru: "Записывайте погоду", kk: "Ауа райын жазыңыз" },
      body: {
        en: "Save weather_logger.py in your home folder and run ~/weather/bin/python weather_logger.py. It prints a reading straight away and every 60 s after that, and appends each one to ~/weather.csv with a header row the first time. Open the file in LibreOffice Calc or any spreadsheet to chart it.",
        ru: "Сохраните weather_logger.py в домашней папке и выполните ~/weather/bin/python weather_logger.py. Скрипт сразу печатает показания, а потом каждые 60 с, и дописывает каждую строку в ~/weather.csv, в первый раз с заголовком. Откройте файл в LibreOffice Calc или любой таблице и постройте график.",
        kk: "weather_logger.py файлын үй қалтасына сақтап, ~/weather/bin/python weather_logger.py орындаңыз. Скрипт көрсеткіштерді бірден, содан кейін әр 60 с сайын шығарады және әр жолды ~/weather.csv файлына, бірінші рет тақырыппен қоса жазады. Файлды LibreOffice Calc немесе кез келген кестеде ашып, график салыңыз.",
      },
      expect: { en: "Room readings: roughly 18–26 °C and 30–60 % humidity. Pressure is about 1013 hPa at sea level and lower higher up (around 920 hPa in Almaty).", ru: "Показания комнаты: примерно 18–26 °C и влажность 30–60 %. Давление около 1013 гПа на уровне моря и ниже на высоте (в Алматы около 920 гПа).", kk: "Бөлме көрсеткіштері: шамамен 18–26 °C және ылғалдылық 30–60 %. Қысым теңіз деңгейінде шамамен 1013 гПа, ал биікте төменірек (Алматыда шамамен 920 гПа)." },
      mistake: { en: "Holding the sensor while testing: your hand warms it by a few degrees within seconds.", ru: "Держать датчик в руке при проверке: рука за секунды нагревает его на несколько градусов.", kk: "Тексергенде датчикті қолда ұстау: қол оны бірнеше секундта бірнеше градусқа жылытады." },
    },
    {
      title: { en: "Start it on boot", ru: "Запускайте при загрузке", kk: "Жүктелгенде іске қосыңыз" },
      body: {
        en: "Run crontab -e and add one line: @reboot sleep 20 && $HOME/weather/bin/python $HOME/weather_logger.py >> $HOME/weather.log 2>&1. After the next reboot the logger runs on its own, and weather.log collects anything it prints.",
        ru: "Выполните crontab -e и добавьте строку: @reboot sleep 20 && $HOME/weather/bin/python $HOME/weather_logger.py >> $HOME/weather.log 2>&1. После следующей перезагрузки логгер работает сам, а всё, что он печатает, собирается в weather.log.",
        kk: "crontab -e орындап, бір жол қосыңыз: @reboot sleep 20 && $HOME/weather/bin/python $HOME/weather_logger.py >> $HOME/weather.log 2>&1. Келесі қайта жүктелуден кейін тіркегіш өзі жұмыс істейді, ал ол шығарғанның бәрі weather.log файлына жиналады.",
      },
      expect: { en: "New rows keep appearing in ~/weather.csv after a reboot, without logging in.", ru: "После перезагрузки в ~/weather.csv появляются новые строки без входа в систему.", kk: "Қайта жүктелгеннен кейін жүйеге кірмей-ақ ~/weather.csv файлында жаңа жолдар пайда болады." },
      mistake: { en: "Using the system python3 in the cron line: it does not have the libraries from the virtual environment.", ru: "Указать в cron системный python3: в нём нет библиотек из виртуального окружения.", kk: "cron жолында жүйелік python3 көрсету: онда виртуалды ортадағы кітапханалар жоқ." },
    },
  ],
  code: [{
    filename: "weather_logger.py",
    language: "python",
    libraries: ["smbus2", "RPi.bme280"],
    source: `#!/usr/bin/env python3
"""Weather logger on a Raspberry Pi 5: a BME280 on I2C bus 1, one CSV row a minute."""
import csv
import sys
from datetime import datetime
from pathlib import Path
from signal import SIGTERM, signal
from time import sleep

import bme280      # pip package RPi.bme280
import smbus2

I2C_BUS = 1        # GPIO2 = SDA (pin 3), GPIO3 = SCL (pin 5)
ADDRESS = 0x76     # 0x77 when the board's SDO pin is tied high
EVERY_S = 60
LOG = Path.home() / "weather.csv"


def main():
    signal(SIGTERM, lambda *_: sys.exit(0))
    bus = smbus2.SMBus(I2C_BUS)
    calibration = bme280.load_calibration_params(bus, ADDRESS)
    new_file = not LOG.exists()
    with LOG.open("a", newline="") as f:
        out = csv.writer(f)
        if new_file:
            out.writerow(["time", "temperature_c", "humidity_pct", "pressure_hpa"])
        print(f"logging to {LOG} every {EVERY_S} s", flush=True)
        try:
            while True:
                s = bme280.sample(bus, ADDRESS, calibration)
                row = [datetime.now().isoformat(timespec="seconds"),
                       f"{s.temperature:.2f}", f"{s.humidity:.1f}", f"{s.pressure:.1f}"]
                out.writerow(row)
                f.flush()      # each row reaches the SD card, even if the power is cut later
                print(f"{row[0]}  {row[1]} C  {row[2]} %  {row[3]} hPa", flush=True)
                sleep(EVERY_S)
        except KeyboardInterrupt:
            pass
        finally:
            bus.close()
            print("stopped", flush=True)


if __name__ == "__main__":
    main()
`,
  }],
  troubleshooting: [
    {
      symptom: { en: "i2cdetect -y 1 shows only --", ru: "i2cdetect -y 1 показывает только --", kk: "i2cdetect -y 1 тек -- көрсетеді" },
      cause: { en: "I2C is off, the sensor has no power, or SDA and SCL are swapped.", ru: "I2C выключен, у датчика нет питания или перепутаны SDA и SCL.", kk: "I2C өшірулі, датчикте қуат жоқ немесе SDA мен SCL ауысып кеткен." },
      fix: { en: "Enable I2C in raspi-config and reboot, then check VIN on pin 1, GND on pin 6, SDA on pin 3 and SCL on pin 5.", ru: "Включите I2C в raspi-config и перезагрузитесь, затем проверьте VIN на пине 1, GND на пине 6, SDA на пине 3 и SCL на пине 5.", kk: "raspi-config-та I2C-ді қосып, қайта жүктеңіз, содан кейін 1-пиндегі VIN, 6-пиндегі GND, 3-пиндегі SDA және 5-пиндегі SCL-ді тексеріңіз." },
    },
    {
      symptom: { en: "OSError: [Errno 121] Remote I/O error", ru: "OSError: [Errno 121] Remote I/O error", kk: "OSError: [Errno 121] Remote I/O error" },
      cause: { en: "The script talks to the wrong address, or a wire is loose.", ru: "Скрипт обращается не по тому адресу или отходит провод.", kk: "Скрипт басқа мекенжайға жүгінеді немесе сым босап тұр." },
      fix: { en: "Set ADDRESS to the number i2cdetect showed (0x76 or 0x77) and reseat the four wires.", ru: "Поставьте в ADDRESS число, которое показал i2cdetect (0x76 или 0x77), и переподключите четыре провода.", kk: "ADDRESS мәніне i2cdetect көрсеткен санды (0x76 немесе 0x77) қойып, төрт сымды қайта қосыңыз." },
    },
    {
      symptom: { en: "Humidity is always 0 or makes no sense", ru: "Влажность всегда 0 или бессмысленная", kk: "Ылғалдылық әрдайым 0 немесе мағынасыз" },
      cause: { en: "The board carries a BMP280, which has no humidity sensor; the two look alike and are often mislabelled.", ru: "На плате стоит BMP280 без датчика влажности; их легко спутать, и их часто подписывают неверно.", kk: "Тақтада ылғалдылық датчигі жоқ BMP280 тұр; оларды шатастыру оңай және жиі қате белгіленеді." },
      fix: { en: "Run i2cget -y 1 0x76 0xD0: 0x60 is a BME280, 0x58 a BMP280. Temperature and pressure from a BMP280 are still good.", ru: "Выполните i2cget -y 1 0x76 0xD0: 0x60 означает BME280, 0x58 означает BMP280. Температура и давление с BMP280 всё равно верные.", kk: "i2cget -y 1 0x76 0xD0 орындаңыз: 0x60 BME280 дегенді, 0x58 BMP280 дегенді білдіреді. BMP280-нің температурасы мен қысымы бәрібір дұрыс." },
    },
    {
      symptom: { en: "The temperature reads 2–5 °C too high", ru: "Температура завышена на 2–5 °C", kk: "Температура 2–5 °C жоғары көрсетіледі" },
      cause: { en: "The sensor sits in the warm air from the Pi 5 or its case.", ru: "Датчик находится в тёплом воздухе от Pi 5 или его корпуса.", kk: "Датчик Pi 5-тен немесе оның корпусынан шыққан жылы ауада тұр." },
      fix: { en: "Move it at least 15 cm from the Pi on longer wires, out of direct sun.", ru: "Отнесите датчик минимум на 15 см от Pi на длинных проводах и уберите с прямого солнца.", kk: "Датчикті ұзын сымдармен Pi-ден кемінде 15 см алысқа жылжытып, тікелей күн сәулесінен алыстатыңыз." },
    },
  ],
  safety: [
    { en: "Power the sensor from 3V3 (pin 1), not 5V: many boards pull SDA and SCL up to their supply, and the Pi 5's GPIO is not 5 V tolerant. Wire it with the Pi powered off.", ru: "Питайте датчик от 3V3 (пин 1), а не от 5V: многие платы подтягивают SDA и SCL к своему питанию, а GPIO у Pi 5 не выдерживают 5 В. Подключайте при выключенном Pi.", kk: "Датчикті 5V-тан емес, 3V3-тен (1-пин) қоректендіріңіз: көп тақталар SDA мен SCL-ді өз қуатына тартады, ал Pi 5-тің GPIO-сы 5 В-қа шыдамайды. Pi өшірулі кезде қосыңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "logging to /home/maker/weather.csv every 60 s",
      "2026-11-16T09:00:00  21.84 C  41.2 %  1012.6 hPa",
      "2026-11-16T09:01:00  21.86 C  41.0 %  1012.6 hPa",
      "2026-11-16T09:02:00  21.91 C  40.9 %  1012.5 hPa",
      "2026-11-16T09:03:00  21.95 C  40.7 %  1012.5 hPa",
      "2026-11-16T09:04:00  22.02 C  40.6 %  1012.4 hPa",
      "stopped",
    ],
    leds: [],
  },
} satisfies GuideContent;
