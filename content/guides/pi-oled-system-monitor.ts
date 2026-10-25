import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pi-oled-system-monitor",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-4",
  category: "tools",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 53,
  xpReward: 120,
  title: {
    en: "Pi OLED System Monitor",
    ru: "Монитор системы Raspberry Pi на OLED",
    kk: "Raspberry Pi жүйесінің OLED мониторы",
  },
  summary: {
    en: "A 0.96\" SSD1306 OLED on the Pi's I²C bus shows CPU temperature, CPU usage, load, RAM, uptime and the IP address, refreshed every two seconds by a Python service using luma.oled.",
    ru: "OLED-дисплей SSD1306 0,96\" на шине I²C показывает температуру и загрузку CPU, load average, RAM, аптайм и IP-адрес. Обновление каждые две секунды, Python-служба на luma.oled.",
    kk: "Pi-дің I²C шинасындағы 0,96\" SSD1306 OLED дисплейі CPU температурасы мен жүктемесін, load average, RAM, жұмыс уақытын және IP мекенжайын көрсетеді. luma.oled-тағы Python қызметі әр екі секунд сайын жаңартады.",
  },
  parts: [
    { component: "raspberry-pi-4", qty: 1, spec: { en: "Raspberry Pi OS Bookworm, 5 V 3 A USB-C supply", ru: "Raspberry Pi OS Bookworm, блок питания USB-C 5 В 3 А", kk: "Raspberry Pi OS Bookworm, USB-C 5 В 3 А қуат блогы" }, role: { en: "The computer being monitored", ru: "Компьютер, за которым следим", kk: "Бақыланатын компьютер" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C, address 0x3C", ru: "0,96\" 128×64, I²C, адрес 0x3C", kk: "0,96\" 128×64, I²C, мекенжайы 0x3C" }, role: { en: "Status display", ru: "Дисплей состояния", kk: "Күй дисплейі" } },
    { component: "jumper-wires", qty: 4, spec: { en: "female-female, 10–20 cm", ru: "мама-мама, 10–20 см", kk: "аналық-аналық, 10–20 см" }, role: { en: "OLED straight to the GPIO header", ru: "OLED прямо к разъёму GPIO", kk: "OLED тікелей GPIO ағытпасына" } },
    { component: "enclosure", qty: 1, spec: { en: "Pi case with a window or a 3D-printed OLED bracket", ru: "корпус Pi с окном или напечатанный кронштейн для OLED", kk: "терезесі бар Pi корпусы немесе 3D басылған OLED ұстағышы" }, role: { en: "Holds the display", ru: "Держит дисплей", kk: "Дисплейді ұстайды" }, optional: true },
  ],
  instances: [
    { id: "oled", component: "oled-ssd1306", label: "SSD1306 128×64" },
  ],
  connections: [
    { from: "board.3V3", to: "oled.VCC", color: "red", note: { en: "pin 1", ru: "пин 1", kk: "1-пин" } },
    { from: "oled.GND", to: "board.GND", color: "black", note: { en: "pin 6", ru: "пин 6", kk: "6-пин" } },
    { from: "board.GPIO2", to: "oled.SDA", color: "blue", note: { en: "pin 3, I²C-1 SDA", ru: "пин 3, I²C-1 SDA", kk: "3-пин, I²C-1 SDA" } },
    { from: "board.GPIO3", to: "oled.SCL", color: "yellow", note: { en: "pin 5, I²C-1 SCL", ru: "пин 5, I²C-1 SCL", kk: "5-пин, I²C-1 SCL" } },
  ],
  steps: [
    {
      title: { en: "Wire the OLED", ru: "Подключите OLED", kk: "OLED-ті қосыңыз" },
      body: {
        en: "With the Pi off, read the labels on the OLED header: some modules are GND-VCC-SCL-SDA, others VCC-GND-SCL-SDA. Connect VCC to 3V3 (pin 1), GND to GND (pin 6), SDA to GPIO2 (pin 3) and SCL to GPIO3 (pin 5). The Pi already has 1.8 kΩ pull-ups on these two pins, so no extra resistors are needed.",
        ru: "При выключенном Pi прочитайте подписи на разъёме OLED: у одних модулей порядок GND-VCC-SCL-SDA, у других VCC-GND-SCL-SDA. Подключите VCC к 3V3 (пин 1), GND к GND (пин 6), SDA к GPIO2 (пин 3), SCL к GPIO3 (пин 5). На этих пинах у Pi уже есть подтяжки 1,8 кОм, дополнительные резисторы не нужны.",
        kk: "Pi өшірулі кезде OLED ағытпасындағы жазуларды оқыңыз: кейбір модульдерде GND-VCC-SCL-SDA, басқаларында VCC-GND-SCL-SDA реті. VCC-ні 3V3-ке (1-пин), GND-ді GND-ге (6-пин), SDA-ны GPIO2-ге (3-пин), SCL-ді GPIO3-ке (5-пин) қосыңыз. Бұл пиндерде Pi-дің өзінде 1,8 кОм тарту резисторлары бар, қосымша резистор керек емес.",
      },
      expect: { en: "Four wires from the OLED to the first five header pins.", ru: "Четыре провода от OLED к первым пяти пинам разъёма.", kk: "OLED-тен ағытпаның алғашқы бес пиніне төрт сым." },
      mistake: { en: "Swapping VCC and GND because the module order differs from the picture: the display gets hot and may die. Always go by the printed labels.", ru: "Перепутать VCC и GND, потому что порядок отличается от картинки: дисплей греется и может сгореть. Ориентируйтесь только на подписи.", kk: "Модульдегі рет суреттен өзгеше болғандықтан VCC мен GND-ді шатастыру: дисплей қызып, істен шығуы мүмкін. Әрқашан жазуларға қараңыз." },
    },
    {
      title: { en: "Enable I²C and find the display", ru: "Включите I²C и найдите дисплей", kk: "I²C-ді қосып, дисплейді табыңыз" },
      body: {
        en: "Boot the Pi and run sudo raspi-config nonint do_i2c 0 (or Interface Options → I2C in raspi-config), then sudo apt install -y i2c-tools and i2cdetect -y 1. The table should show 3c (some modules use 3d; then change I2C_ADDRESS in the script).",
        ru: "Загрузите Pi и выполните sudo raspi-config nonint do_i2c 0 (или Interface Options → I2C в raspi-config), затем sudo apt install -y i2c-tools и i2cdetect -y 1. В таблице должно появиться 3c (у некоторых модулей 3d, тогда поменяйте I2C_ADDRESS в скрипте).",
        kk: "Pi-ді жүктеп, sudo raspi-config nonint do_i2c 0 орындаңыз (немесе raspi-config ішінде Interface Options → I2C), содан кейін sudo apt install -y i2c-tools және i2cdetect -y 1. Кестеде 3c көрінуі керек (кейбір модульдерде 3d, онда скриптегі I2C_ADDRESS-ті өзгертіңіз).",
      },
      expect: { en: "i2cdetect prints a grid with \"3c\" in row 30.", ru: "i2cdetect выводит таблицу с «3c» в строке 30.", kk: "i2cdetect 30-жолда «3c» бар кестені шығарады." },
      mistake: { en: "Running i2cdetect -y 0: on the Pi 4 the header bus is I²C-1.", ru: "Запуск i2cdetect -y 0: на Pi 4 шина разъёма это I²C-1.", kk: "i2cdetect -y 0 іске қосу: Pi 4-те ағытпа шинасы I²C-1." },
    },
    {
      title: { en: "Install the monitor", ru: "Установите монитор", kk: "Мониторды орнатыңыз" },
      body: {
        en: "Copy sysmon.py and install.sh into one folder and run bash install.sh. It enables I²C, creates a virtual environment in ~/sysmon with luma.oled and psutil (pip builds RPi.GPIO for luma.core, hence build-essential and python3-dev) and registers the sysmon systemd service.",
        ru: "Скопируйте sysmon.py и install.sh в одну папку и выполните bash install.sh. Скрипт включит I²C, создаст виртуальное окружение в ~/sysmon с luma.oled и psutil (pip собирает RPi.GPIO для luma.core, поэтому нужны build-essential и python3-dev) и зарегистрирует службу systemd sysmon.",
        kk: "sysmon.py мен install.sh файлдарын бір қалтаға көшіріп, bash install.sh іске қосыңыз. Скрипт I²C-ді қосады, ~/sysmon ішінде luma.oled және psutil бар виртуалды орта жасайды (pip luma.core үшін RPi.GPIO-ны құрастырады, сондықтан build-essential пен python3-dev керек) және sysmon systemd қызметін тіркейді.",
      },
      expect: { en: "The script ends with \"Done. The display starts now and on every boot.\"", ru: "Скрипт завершается строкой «Done. The display starts now and on every boot.».", kk: "Скрипт «Done. The display starts now and on every boot.» жолымен аяқталады." },
      mistake: { en: "Running sudo pip install system-wide: Bookworm refuses it, so always use the venv.", ru: "Запуск sudo pip install в систему: Bookworm это запрещает, используйте venv.", kk: "sudo pip install арқылы жүйеге орнату: Bookworm бұған жол бермейді, әрқашан venv қолданыңыз." },
    },
    {
      title: { en: "Check the screen", ru: "Проверьте экран", kk: "Экранды тексеріңіз" },
      body: {
        en: "Within a few seconds the OLED shows the IP address on top, then CPU temperature and usage with a bar, load averages, used RAM with a bar and uptime. Run a heavy command such as yes > /dev/null for 20 s and watch the CPU bar fill and the temperature rise. Press Ctrl+C to stop it.",
        ru: "Через несколько секунд на OLED появятся IP-адрес сверху, затем температура и загрузка CPU с полосой, load average, занятая RAM с полосой и аптайм. Запустите тяжёлую команду, например yes > /dev/null, на 20 с и посмотрите, как заполняется полоса CPU и растёт температура. Остановите Ctrl+C.",
        kk: "Бірнеше секундтан кейін OLED үстіңгі жағында IP мекенжайын, содан кейін жолағы бар CPU температурасы мен жүктемесін, load average, жолағы бар пайдаланылған RAM-ды және жұмыс уақытын көрсетеді. 20 с бойы yes > /dev/null сияқты ауыр команданы іске қосып, CPU жолағының толғанын және температураның өскенін бақылаңыз. Ctrl+C арқылы тоқтатыңыз.",
      },
      expect: { en: "journalctl -u sysmon shows a status line every 30 s.", ru: "journalctl -u sysmon показывает строку состояния каждые 30 с.", kk: "journalctl -u sysmon әр 30 с сайын күй жолын көрсетеді." },
      mistake: { en: "Long wires (over ~30 cm) on I²C cause random OSError crashes; keep them short.", ru: "Длинные провода I²C (больше ~30 см) вызывают случайные падения с OSError; делайте их короткими.", kk: "Ұзын I²C сымдары (~30 см-ден асса) кездейсоқ OSError құлауларын тудырады; оларды қысқа етіңіз." },
    },
    {
      title: { en: "Customise it", ru: "Настройте под себя", kk: "Өзіңізге бейімдеңіз" },
      body: {
        en: "Edit ~/sysmon/sysmon.py: REFRESH_S changes the update rate, and draw_screen() decides what is shown, for example disk usage with psutil.disk_usage(\"/\").percent. OLED pixels slowly burn in, so the script blanks the screen between 01:00 and 07:00 (NIGHT_HOURS). Apply changes with sudo systemctl restart sysmon.",
        ru: "Правьте ~/sysmon/sysmon.py: REFRESH_S меняет частоту обновления, а draw_screen() решает, что показывать, например заполненность диска через psutil.disk_usage(\"/\").percent. Пиксели OLED постепенно выгорают, поэтому скрипт гасит экран с 01:00 до 07:00 (NIGHT_HOURS). Применяйте изменения через sudo systemctl restart sysmon.",
        kk: "~/sysmon/sysmon.py файлын түзетіңіз: REFRESH_S жаңарту жиілігін өзгертеді, ал draw_screen() не көрсетілетінін шешеді, мысалы psutil.disk_usage(\"/\").percent арқылы дискінің толуы. OLED пикселдері біртіндеп күйеді, сондықтан скрипт экранды 01:00-ден 07:00-ге дейін сөндіреді (NIGHT_HOURS). Өзгерістерді sudo systemctl restart sysmon арқылы қолданыңыз.",
      },
      expect: { en: "Your new line appears after the restart.", ru: "После перезапуска появляется ваша новая строка.", kk: "Қайта іске қосқаннан кейін жаңа жолыңыз пайда болады." },
      mistake: { en: "Adding more than five text lines: the 64-pixel screen fits five lines of the default font.", ru: "Больше пяти строк текста: на экран высотой 64 пикселя помещается пять строк стандартного шрифта.", kk: "Бес жолдан көп мәтін қосу: биіктігі 64 пиксель экранға стандартты қаріптің бес жолы ғана сыяды." },
    },
  ],
  code: [
    {
      filename: "sysmon.py",
      language: "python",
      libraries: ["luma.oled", "psutil"],
      source: `#!/usr/bin/env python3
"""SSD1306 128x64 OLED on I2C-1 (GPIO2 SDA / GPIO3 SCL): CPU temp, load, RAM, IP, uptime."""
import signal
import socket
import sys
import time
from datetime import datetime

import psutil
from luma.core.interface.serial import i2c
from luma.core.render import canvas
from luma.oled.device import ssd1306
from PIL import ImageFont

I2C_PORT = 1            # /dev/i2c-1 = header pins 3 (SDA) and 5 (SCL)
I2C_ADDRESS = 0x3C      # use 0x3D if i2cdetect shows 3d
REFRESH_S = 2
LOG_EVERY = 15          # print a status line every 15 refreshes (30 s)
NIGHT_HOURS = range(1, 7)   # screen off 01:00-06:59 against burn-in

serial = i2c(port=I2C_PORT, address=I2C_ADDRESS)
device = ssd1306(serial, width=128, height=64)
font = ImageFont.load_default()


def cpu_temp():
    with open("/sys/class/thermal/thermal_zone0/temp") as f:
        return int(f.read()) / 1000


def ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("10.254.254.254", 1))   # UDP connect sends nothing, it only picks the route
        return s.getsockname()[0]
    except OSError:
        return "no network"
    finally:
        s.close()


def uptime():
    secs = int(time.time() - psutil.boot_time())
    days, secs = divmod(secs, 86400)
    hours, secs = divmod(secs, 3600)
    return f"{days}d {hours:02d}:{secs // 60:02d}"


def bar(draw, x, y, w, h, frac):
    draw.rectangle((x, y, x + w, y + h), outline="white")
    fill = int((w - 2) * max(0.0, min(1.0, frac)))
    if fill > 0:
        draw.rectangle((x + 1, y + 1, x + fill, y + h - 1), fill="white")


def draw_screen(stats):
    with canvas(device) as draw:
        draw.text((0, 0), stats["ip"], font=font, fill="white")
        draw.text((0, 13), f"CPU {stats['temp']:4.1f}C {stats['cpu']:3.0f}%", font=font, fill="white")
        bar(draw, 92, 14, 35, 8, stats["cpu"] / 100)
        draw.text((0, 26), f"Load {stats['load'][0]:.2f} {stats['load'][1]:.2f}", font=font, fill="white")
        draw.text((0, 39), f"RAM {stats['ram_used']}/{stats['ram_total']}M", font=font, fill="white")
        bar(draw, 92, 40, 35, 8, stats["ram_used"] / stats["ram_total"])
        draw.text((0, 52), f"Up {stats['uptime']}", font=font, fill="white")


def read_stats():
    mem = psutil.virtual_memory()
    return {
        "ip": ip_address(),
        "temp": cpu_temp(),
        "cpu": psutil.cpu_percent(interval=None),
        "load": psutil.getloadavg(),
        "ram_used": (mem.total - mem.available) // 2**20,
        "ram_total": mem.total // 2**20,
        "uptime": uptime(),
    }


def main():
    signal.signal(signal.SIGTERM, lambda *_: sys.exit(0))   # luma clears the screen on exit
    psutil.cpu_percent(interval=None)                        # first call only primes the counter
    print(f"oled ready on i2c-{I2C_PORT} @ {I2C_ADDRESS:#04x}", flush=True)
    n = 0
    while True:
        stats = read_stats()
        if datetime.now().hour in NIGHT_HOURS:
            device.hide()
        else:
            device.show()
            draw_screen(stats)
        if n % LOG_EVERY == 0:
            print(f"cpu {stats['temp']:.1f}C {stats['cpu']:.0f}% load {stats['load'][0]:.2f} "
                  f"ram {stats['ram_used']}/{stats['ram_total']}M ip {stats['ip']}", flush=True)
        n += 1
        time.sleep(REFRESH_S)


if __name__ == "__main__":
    main()
`,
    },
    {
      filename: "install.sh",
      language: "bash",
      libraries: [],
      source: `#!/bin/bash
# One-time setup on Raspberry Pi OS Bookworm. Run from the folder that holds sysmon.py:
#   bash install.sh
set -euo pipefail
APP_DIR="$HOME/sysmon"

sudo raspi-config nonint do_i2c 0          # enable I2C-1 on GPIO2/GPIO3
sudo apt update
sudo apt install -y i2c-tools python3-venv python3-dev build-essential

mkdir -p "$APP_DIR"
cp sysmon.py "$APP_DIR/"
python3 -m venv "$APP_DIR/.venv"
"$APP_DIR/.venv/bin/pip" install --upgrade pip
"$APP_DIR/.venv/bin/pip" install luma.oled psutil

sudo tee /etc/systemd/system/sysmon.service > /dev/null <<EOF
[Unit]
Description=OLED system monitor
After=network-online.target
Wants=network-online.target

[Service]
User=$USER
ExecStart=$APP_DIR/.venv/bin/python $APP_DIR/sysmon.py
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now sysmon.service
echo "Done. The display starts now and on every boot."
`,
    },
  ],
  troubleshooting: [
    {
      symptom: { en: "i2cdetect shows an empty grid", ru: "i2cdetect показывает пустую таблицу", kk: "i2cdetect бос кестені көрсетеді" },
      cause: { en: "SDA and SCL are swapped, VCC/GND are not connected, or I²C is not enabled.", ru: "Перепутаны SDA и SCL, не подключены VCC/GND или не включён I²C.", kk: "SDA мен SCL ауысқан, VCC/GND қосылмаған немесе I²C қосылмаған." },
      fix: { en: "SDA goes to pin 3 and SCL to pin 5; check ls /dev/i2c-1 exists and rerun raspi-config if not.", ru: "SDA на пин 3, SCL на пин 5; проверьте, что существует /dev/i2c-1, иначе снова запустите raspi-config.", kk: "SDA 3-пинге, SCL 5-пинге; /dev/i2c-1 бар екенін тексеріп, жоқ болса raspi-config-ті қайта іске қосыңыз." },
    },
    {
      symptom: { en: "\"OSError: [Errno 121] Remote I/O error\" when the service starts", ru: "«OSError: [Errno 121] Remote I/O error» при запуске службы", kk: "Қызмет іске қосылғанда «OSError: [Errno 121] Remote I/O error»" },
      cause: { en: "The display answers at a different address (0x3D) or a wire is loose.", ru: "Дисплей отвечает по другому адресу (0x3D) или отошёл провод.", kk: "Дисплей басқа мекенжайда (0x3D) жауап береді немесе сым босап кеткен." },
      fix: { en: "Set I2C_ADDRESS to the value i2cdetect shows and reseat the four wires.", ru: "Укажите в I2C_ADDRESS адрес из i2cdetect и переподключите четыре провода.", kk: "I2C_ADDRESS-ке i2cdetect көрсеткен мекенжайды жазып, төрт сымды қайта жалғаңыз." },
    },
    {
      symptom: { en: "The screen shows only the top half or garbage", ru: "На экране только верхняя половина или мусор", kk: "Экранда тек жоғарғы жартысы немесе қоқыс" },
      cause: { en: "The module is a 128×32 version, not 128×64.", ru: "Это модуль 128×32, а не 128×64.", kk: "Бұл 128×64 емес, 128×32 нұсқасы." },
      fix: { en: "Use ssd1306(serial, width=128, height=32) and keep only three text lines.", ru: "Используйте ssd1306(serial, width=128, height=32) и оставьте три строки текста.", kk: "ssd1306(serial, width=128, height=32) қолданып, мәтіннің үш жолын ғана қалдырыңыз." },
    },
    {
      symptom: { en: "The IP line says \"no network\"", ru: "В строке IP написано «no network»", kk: "IP жолында «no network» жазылған" },
      cause: { en: "The Pi has no default route yet, for example Wi-Fi is still connecting.", ru: "У Pi ещё нет маршрута по умолчанию, например Wi-Fi ещё подключается.", kk: "Pi-де әлі әдепкі маршрут жоқ, мысалы Wi-Fi әлі қосылып жатыр." },
      fix: { en: "Wait a few seconds; the line updates on the next refresh. Check nmcli if it stays.", ru: "Подождите несколько секунд, строка обновится. Если не прошло, проверьте nmcli.", kk: "Бірнеше секунд күтіңіз, жол келесі жаңартуда өзгереді. Өзгермесе, nmcli тексеріңіз." },
    },
  ],
  safety: [
    { en: "Power the OLED from 3V3, not 5V: the Pi's SDA/SCL pins are 3.3 V only and some modules pull the bus up to VCC.", ru: "Питайте OLED от 3V3, а не от 5V: пины SDA/SCL у Pi рассчитаны только на 3,3 В, а некоторые модули подтягивают шину к VCC.", kk: "OLED-ті 5V-тен емес, 3V3-тен қоректендіріңіз: Pi-дің SDA/SCL пиндері тек 3,3 В-қа арналған, ал кейбір модульдер шинаны VCC-ге тартады." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "oled ready on i2c-1 @ 0x3c",
      "cpu 46.7C 4% load 0.21 ram 612/3793M ip 192.168.1.42",
      "cpu 47.2C 9% load 0.35 ram 618/3793M ip 192.168.1.42",
      "cpu 58.4C 100% load 1.12 ram 640/3793M ip 192.168.1.42",
      "cpu 61.3C 100% load 1.64 ram 641/3793M ip 192.168.1.42",
      "cpu 52.0C 6% load 1.10 ram 620/3793M ip 192.168.1.42",
    ],
    leds: [],
  },
} satisfies GuideContent;
