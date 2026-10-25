import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pi-temperature-logger",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-4",
  category: "iot",
  robotics: false,
  difficulty: "beginner",
  hours: 2,
  costUsd: 52,
  xpReward: 130,
  title: {
    en: "Pi Temperature Logger",
    ru: "Логгер температуры на Raspberry Pi",
    kk: "Raspberry Pi температура тіркегіші",
  },
  summary: {
    en: "A DS18B20 1-Wire sensor on GPIO4 is read every ten seconds and appended to a CSV file by a Python service that starts on boot.",
    ru: "Датчик DS18B20 на шине 1-Wire (GPIO4) опрашивается каждые десять секунд, а Python-служба, стартующая при загрузке, дописывает данные в CSV-файл.",
    kk: "GPIO4-тегі 1-Wire DS18B20 датчигі әр он секунд сайын оқылады, ал жүктелгенде іске қосылатын Python қызметі деректерді CSV файлына жазады.",
  },
  parts: [
    { component: "raspberry-pi-4", qty: 1, spec: { en: "any RAM size, Raspberry Pi OS Bookworm, 5 V 3 A USB-C supply", ru: "любой объём RAM, Raspberry Pi OS Bookworm, блок питания USB-C 5 В 3 А", kk: "кез келген RAM көлемі, Raspberry Pi OS Bookworm, USB-C 5 В 3 А қуат блогы" }, role: { en: "Reads the sensor and stores the log", ru: "Опрашивает датчик и хранит журнал", kk: "Датчикті оқиды және журналды сақтайды" } },
    { component: "ds18b20", qty: 1, spec: { en: "TO-92 or waterproof probe, 3.0–5.5 V", ru: "TO-92 или влагозащищённый щуп, 3,0–5,5 В", kk: "TO-92 немесе суға төзімді зонд, 3,0–5,5 В" }, role: { en: "Digital temperature sensor, ±0.5 °C", ru: "Цифровой датчик температуры, ±0,5 °C", kk: "Сандық температура датчигі, ±0,5 °C" } },
    { component: "resistor", qty: 1, spec: { en: "4.7 kΩ, ¼ W", ru: "4,7 кОм, ¼ Вт", kk: "4,7 кОм, ¼ Вт" }, role: { en: "1-Wire pull-up to 3.3 V", ru: "Подтяжка 1-Wire к 3,3 В", kk: "1-Wire желісін 3,3 В-қа тарту" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 4, spec: { en: "female-male", ru: "мама-папа", kk: "аналық-аталық" }, role: { en: "Pi header to breadboard", ru: "От разъёма Pi к макетке", kk: "Pi ағытпасынан макет тақтасына" } },
  ],
  instances: [
    { id: "temp", component: "ds18b20", label: "DS18B20" },
    { id: "r1", component: "resistor", label: "4.7 kΩ" },
  ],
  connections: [
    { from: "board.3V3", to: "temp.VDD", color: "red", note: { en: "pin 1; probe: red wire", ru: "пин 1; у щупа красный провод", kk: "1-пин; зондта қызыл сым" } },
    { from: "temp.GND", to: "board.GND", color: "black", note: { en: "pin 6; probe: black wire", ru: "пин 6; у щупа чёрный провод", kk: "6-пин; зондта қара сым" } },
    { from: "temp.DQ", to: "board.GPIO4", color: "yellow", note: { en: "pin 7; probe: yellow wire", ru: "пин 7; у щупа жёлтый провод", kk: "7-пин; зондта сары сым" } },
    { from: "r1.A", to: "temp.DQ", color: "yellow", note: { en: "pull-up between DQ and 3.3 V", ru: "подтяжка между DQ и 3,3 В", kk: "DQ мен 3,3 В арасындағы тарту" } },
    { from: "r1.B", to: "temp.VDD", color: "red" },
  ],
  steps: [
    {
      title: { en: "Wire the sensor", ru: "Подключите датчик", kk: "Датчикті қосыңыз" },
      body: {
        en: "With the Pi switched off, put the DS18B20 on the breadboard (flat side facing you: GND, DQ, VDD from left to right). Wire VDD to 3V3 (pin 1), GND to GND (pin 6) and DQ to GPIO4 (pin 7). Bridge DQ and VDD with the 4.7 kΩ resistor. A waterproof probe uses red = VDD, black = GND, yellow = DQ.",
        ru: "При выключенном Pi поставьте DS18B20 на макетку (плоской стороной к себе: слева направо GND, DQ, VDD). Подключите VDD к 3V3 (пин 1), GND к GND (пин 6), DQ к GPIO4 (пин 7). Соедините DQ и VDD резистором 4,7 кОм. У влагозащищённого щупа красный = VDD, чёрный = GND, жёлтый = DQ.",
        kk: "Pi өшірулі тұрғанда DS18B20-ны макет тақтасына қойыңыз (жалпақ жағы өзіңізге қарап: солдан оңға қарай GND, DQ, VDD). VDD-ні 3V3-ке (1-пин), GND-ді GND-ге (6-пин), DQ-ны GPIO4-ке (7-пин) қосыңыз. DQ мен VDD-ні 4,7 кОм резистормен жалғаңыз. Суға төзімді зондта қызыл = VDD, қара = GND, сары = DQ.",
      },
      expect: { en: "Three wires to the header and one resistor between DQ and VDD.", ru: "Три провода к разъёму и один резистор между DQ и VDD.", kk: "Ағытпаға үш сым және DQ мен VDD арасында бір резистор." },
      mistake: { en: "Powering the sensor from 5 V: the pull-up then lifts GPIO4 to 5 V, which can damage the Pi. Use 3V3 only.", ru: "Питание датчика от 5 В: подтяжка поднимет GPIO4 до 5 В, а это может повредить Pi. Только 3V3.", kk: "Датчикті 5 В-тан қоректендіру: тарту резисторы GPIO4-ті 5 В-қа көтереді, бұл Pi-ді бүлдіруі мүмкін. Тек 3V3 қолданыңыз." },
    },
    {
      title: { en: "Enable 1-Wire and install", ru: "Включите 1-Wire и установите", kk: "1-Wire-ды қосып, орнатыңыз" },
      body: {
        en: "Copy templog.py and install.sh into one folder on the Pi and run bash install.sh. It enables the 1-Wire interface on GPIO4 with raspi-config (dtoverlay=w1-gpio), creates a Python virtual environment in ~/templog with the w1thermsensor package and registers the templog systemd service. Reboot once when it finishes.",
        ru: "Скопируйте templog.py и install.sh в одну папку на Pi и выполните bash install.sh. Скрипт включит интерфейс 1-Wire на GPIO4 через raspi-config (dtoverlay=w1-gpio), создаст виртуальное окружение Python в ~/templog с пакетом w1thermsensor и зарегистрирует службу systemd templog. После завершения один раз перезагрузитесь.",
        kk: "templog.py мен install.sh файлдарын Pi-дегі бір қалтаға көшіріп, bash install.sh іске қосыңыз. Скрипт raspi-config арқылы GPIO4-те 1-Wire интерфейсін қосады (dtoverlay=w1-gpio), ~/templog ішінде w1thermsensor пакеті бар Python виртуалды ортасын жасайды және templog systemd қызметін тіркейді. Аяқталған соң бір рет қайта жүктеңіз.",
      },
      expect: { en: "After the reboot, ls /sys/bus/w1/devices shows a folder starting with 28-.", ru: "После перезагрузки ls /sys/bus/w1/devices показывает папку, начинающуюся с 28-.", kk: "Қайта жүктелгеннен кейін ls /sys/bus/w1/devices 28- деп басталатын қалтаны көрсетеді." },
      mistake: { en: "Installing with sudo pip outside a virtual environment: Bookworm blocks it (externally-managed-environment).", ru: "Установка через sudo pip без виртуального окружения: Bookworm это запрещает (externally-managed-environment).", kk: "Виртуалды ортасыз sudo pip арқылы орнату: Bookworm оған тыйым салады (externally-managed-environment)." },
    },
    {
      title: { en: "Test it by hand", ru: "Проверьте вручную", kk: "Қолмен тексеріңіз" },
      body: {
        en: "Before trusting the service, run the logger in the foreground: ~/templog/.venv/bin/python ~/templog/templog.py. Hold the sensor between your fingers and watch the value climb within a few readings. Stop it with Ctrl+C.",
        ru: "Прежде чем доверять службе, запустите логгер вручную: ~/templog/.venv/bin/python ~/templog/templog.py. Зажмите датчик пальцами и посмотрите, как значение растёт за несколько замеров. Остановите Ctrl+C.",
        kk: "Қызметке сенбес бұрын тіркегішті қолмен іске қосыңыз: ~/templog/.venv/bin/python ~/templog/templog.py. Датчикті саусақтарыңызбен ұстап, бірнеше өлшемде мәннің көтерілгенін бақылаңыз. Ctrl+C арқылы тоқтатыңыз.",
      },
      expect: { en: "A line such as \"2026-10-25T14:00:10 22.44 C\" every 10 seconds.", ru: "Каждые 10 секунд строка вида «2026-10-25T14:00:10 22.44 C».", kk: "Әр 10 секунд сайын «2026-10-25T14:00:10 22.44 C» сияқты жол." },
      mistake: { en: "Getting 85.00 °C: that is the sensor's power-on value, usually from a loose VDD or GND wire.", ru: "Показание 85,00 °C: это значение датчика при включении, обычно из-за плохого контакта VDD или GND.", kk: "85,00 °C көрсетсе: бұл датчиктің қосылғандағы мәні, әдетте VDD немесе GND сымының нашар жанасуынан." },
    },
    {
      title: { en: "Start the service", ru: "Запустите службу", kk: "Қызметті іске қосыңыз" },
      body: {
        en: "Run sudo systemctl start templog and check it with systemctl status templog. install.sh enables systemd-time-wait-sync, so the service starts only after the clock is synced over the network: the Pi has no clock battery, and this keeps every timestamp correct. Follow the live output with journalctl -u templog -f.",
        ru: "Выполните sudo systemctl start templog и проверьте systemctl status templog. install.sh включает systemd-time-wait-sync, поэтому служба стартует только после синхронизации часов по сети: у Pi нет батарейки часов, а так все метки времени будут верными. Живой вывод смотрите через journalctl -u templog -f.",
        kk: "sudo systemctl start templog орындап, systemctl status templog арқылы тексеріңіз. install.sh systemd-time-wait-sync қызметін қосады, сондықтан қызмет сағат желі арқылы синхрондалғаннан кейін ғана іске қосылады: Pi-де сағат батареясы жоқ, ал бұлай барлық уақыт белгілері дұрыс болады. Тікелей шығысты journalctl -u templog -f арқылы қараңыз.",
      },
      expect: { en: "Status shows \"active (running)\" and the journal prints a reading every 10 s.", ru: "Статус «active (running)», в журнале замер каждые 10 с.", kk: "Күйі «active (running)», журналда әр 10 с сайын өлшем шығады." },
      mistake: { en: "Editing templog.py in the download folder: the service runs the copy in ~/templog, so edit that one and restart the service.", ru: "Правка templog.py в папке загрузки: служба запускает копию в ~/templog, правьте её и перезапускайте службу.", kk: "Жүктеу қалтасындағы templog.py-ды түзету: қызмет ~/templog ішіндегі көшірмені іске қосады, соны түзетіп, қызметті қайта іске қосыңыз." },
    },
    {
      title: { en: "Use the CSV", ru: "Используйте CSV", kk: "CSV-ді пайдаланыңыз" },
      body: {
        en: "The log grows at ~/templog/temperature.csv with the columns timestamp, sensor_id, temp_c (about 3 MB per month). View the newest rows with tail ~/templog/temperature.csv, or copy the file to your computer with scp and open it in a spreadsheet to plot a chart.",
        ru: "Журнал растёт в ~/templog/temperature.csv со столбцами timestamp, sensor_id, temp_c (около 3 МБ в месяц). Последние строки смотрите через tail ~/templog/temperature.csv или скопируйте файл на компьютер через scp и постройте график в таблице.",
        kk: "Журнал ~/templog/temperature.csv файлында timestamp, sensor_id, temp_c бағандарымен толығады (айына шамамен 3 МБ). Соңғы жолдарды tail ~/templog/temperature.csv арқылы қараңыз немесе файлды scp арқылы компьютерге көшіріп, кестеде график салыңыз.",
      },
      expect: { en: "A header row followed by one row every 10 seconds, even after a reboot.", ru: "Строка заголовка и далее по строке каждые 10 секунд, даже после перезагрузки.", kk: "Тақырып жолы, одан кейін әр 10 секунд сайын бір жол, қайта жүктелгеннен кейін де." },
      mistake: { en: "Opening the live file in an editor that saves it back can cut the log; copy it first.", ru: "Если открыть живой файл в редакторе и сохранить его, журнал может обрезаться; сначала сделайте копию.", kk: "Тірі файлды редакторда ашып, қайта сақтасаңыз, журнал қысқаруы мүмкін; алдымен көшірмесін жасаңыз." },
    },
  ],
  code: [
    {
      filename: "templog.py",
      language: "python",
      libraries: ["w1thermsensor"],
      source: `#!/usr/bin/env python3
"""DS18B20 on GPIO4 -> CSV row every 10 seconds (Raspberry Pi 4, Python 3)."""
import csv
import signal
import sys
import time
from datetime import datetime
from pathlib import Path

from w1thermsensor import W1ThermSensor
from w1thermsensor.errors import W1ThermSensorError

DATA_PIN = 4             # GPIO4 (pin 7), set by dtoverlay=w1-gpio (default gpiopin=4)
INTERVAL_S = 10
LOG_FILE = Path.home() / "templog" / "temperature.csv"

running = True


def stop(signum, frame):
    global running
    running = False


def open_log():
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    is_new = not LOG_FILE.exists() or LOG_FILE.stat().st_size == 0
    f = LOG_FILE.open("a", newline="")
    writer = csv.writer(f)
    if is_new:
        writer.writerow(["timestamp", "sensor_id", "temp_c"])
        f.flush()
    return f, writer


def main():
    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)
    try:
        sensor = W1ThermSensor()
    except W1ThermSensorError as e:
        print(f"no DS18B20 found on GPIO{DATA_PIN}: {e}", file=sys.stderr, flush=True)
        return 1

    print(f"logging sensor {sensor.id} to {LOG_FILE} every {INTERVAL_S} s", flush=True)
    f, writer = open_log()
    next_t = time.monotonic()
    with f:
        while running:
            try:
                temp_c = sensor.get_temperature()
                stamp = datetime.now().isoformat(timespec="seconds")
                writer.writerow([stamp, sensor.id, f"{temp_c:.2f}"])
                f.flush()
                print(f"{stamp} {temp_c:.2f} C", flush=True)
            except W1ThermSensorError as e:
                print(f"read failed: {e}", file=sys.stderr, flush=True)
            next_t += INTERVAL_S
            time.sleep(max(0.0, next_t - time.monotonic()))
    print("stopped", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
`,
    },
    {
      filename: "install.sh",
      language: "bash",
      libraries: [],
      source: `#!/bin/bash
# One-time setup on Raspberry Pi OS Bookworm. Run from the folder that holds templog.py:
#   bash install.sh
set -euo pipefail
APP_DIR="$HOME/templog"

# 1) 1-Wire on GPIO4 (adds dtoverlay=w1-gpio to /boot/firmware/config.txt)
sudo raspi-config nonint do_onewire 0

# 2) Python virtual environment with w1thermsensor
sudo apt update
sudo apt install -y python3-venv
mkdir -p "$APP_DIR"
cp templog.py "$APP_DIR/"
python3 -m venv "$APP_DIR/.venv"
"$APP_DIR/.venv/bin/pip" install --upgrade pip
"$APP_DIR/.venv/bin/pip" install w1thermsensor

# 3) systemd service: starts at boot after the clock is synced, restarts on failure
sudo tee /etc/systemd/system/templog.service > /dev/null <<EOF
[Unit]
Description=DS18B20 temperature logger
Wants=time-sync.target
After=time-sync.target

[Service]
User=$USER
WorkingDirectory=$APP_DIR
ExecStart=$APP_DIR/.venv/bin/python $APP_DIR/templog.py
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# make time-sync.target really wait for NTP (the Pi has no clock battery)
sudo systemctl enable systemd-time-wait-sync.service
sudo systemctl daemon-reload
sudo systemctl enable templog.service
echo "Done. Reboot once to activate 1-Wire: sudo reboot"
`,
    },
  ],
  troubleshooting: [
    {
      symptom: { en: "\"no DS18B20 found on GPIO4\"", ru: "«no DS18B20 found on GPIO4»", kk: "«no DS18B20 found on GPIO4»" },
      cause: { en: "1-Wire is not enabled yet (no reboot), DQ is not on GPIO4, or the 4.7 kΩ pull-up is missing.", ru: "1-Wire ещё не включён (не было перезагрузки), DQ не на GPIO4 или нет подтяжки 4,7 кОм.", kk: "1-Wire әлі қосылмаған (қайта жүктелмеген), DQ GPIO4-те емес немесе 4,7 кОм тарту резисторы жоқ." },
      fix: { en: "Check grep w1-gpio /boot/firmware/config.txt, reboot, and confirm the resistor sits between DQ and 3V3.", ru: "Проверьте grep w1-gpio /boot/firmware/config.txt, перезагрузитесь и убедитесь, что резистор стоит между DQ и 3V3.", kk: "grep w1-gpio /boot/firmware/config.txt тексеріп, қайта жүктеңіз және резистор DQ мен 3V3 арасында тұрғанына көз жеткізіңіз." },
    },
    {
      symptom: { en: "/sys/bus/w1/devices lists many 00-xxxx devices", ru: "В /sys/bus/w1/devices много устройств 00-xxxx", kk: "/sys/bus/w1/devices ішінде көп 00-xxxx құрылғылар бар" },
      cause: { en: "The data line floats: no pull-up, or the sensor is in backwards.", ru: "Линия данных висит в воздухе: нет подтяжки или датчик стоит наоборот.", kk: "Деректер желісі ауада ілулі: тарту жоқ немесе датчик кері қойылған." },
      fix: { en: "Power off, check the pinout (flat side: GND, DQ, VDD) and the resistor. A sensor put in backwards gets hot; let it cool before testing.", ru: "Выключите питание, проверьте цоколёвку (плоская сторона: GND, DQ, VDD) и резистор. Перевёрнутый датчик греется: дайте ему остыть.", kk: "Қуатты өшіріп, аяқтарын (жалпақ жағы: GND, DQ, VDD) және резисторды тексеріңіз. Кері қойылған датчик қызады, тексермес бұрын суытыңыз." },
    },
    {
      symptom: { en: "The service keeps restarting", ru: "Служба постоянно перезапускается", kk: "Қызмет үнемі қайта іске қосылады" },
      cause: { en: "The script crashes, usually because the venv path or user name in the unit is wrong.", ru: "Скрипт падает, обычно из-за неверного пути к venv или имени пользователя в юните.", kk: "Скрипт құлайды, әдетте юниттегі venv жолы немесе пайдаланушы аты қате болғандықтан." },
      fix: { en: "Read the error with journalctl -u templog -n 30 and rerun install.sh as the user who owns ~/templog.", ru: "Прочитайте ошибку через journalctl -u templog -n 30 и запустите install.sh заново от пользователя-владельца ~/templog.", kk: "Қатені journalctl -u templog -n 30 арқылы оқып, install.sh-ты ~/templog иесі болып табылатын пайдаланушыдан қайта іске қосыңыз." },
    },
    {
      symptom: { en: "The service stays \"activating\" after a boot without network", ru: "Без сети после загрузки служба висит в состоянии «activating»", kk: "Желісіз жүктелгеннен кейін қызмет «activating» күйінде тұрып қалады" },
      cause: { en: "It waits for network time on purpose: the Pi has no real-time clock, and logging without it would write wrong dates.", ru: "Она намеренно ждёт сетевое время: у Pi нет часов реального времени, и без синхронизации в журнал попали бы неверные даты.", kk: "Ол желілік уақытты әдейі күтеді: Pi-де нақты уақыт сағаты жоқ, синхрондаусыз журналға қате күндер жазылар еді." },
      fix: { en: "Connect the Pi to a network. For offline use add an RTC module, or run sudo systemctl disable systemd-time-wait-sync and accept wrong dates until the clock is set.", ru: "Подключите Pi к сети. Для работы без сети добавьте модуль RTC или выполните sudo systemctl disable systemd-time-wait-sync, смирившись с неверными датами до установки часов.", kk: "Pi-ді желіге қосыңыз. Желісіз жұмыс үшін RTC модулін қосыңыз немесе sudo systemctl disable systemd-time-wait-sync орындаңыз, бірақ сағат орнатылғанша күндер қате болады." },
    },
  ],
  safety: [
    { en: "Wire the sensor with the Pi powered off, and use only the 3.3 V pin: Pi GPIO is not 5 V tolerant.", ru: "Подключайте датчик при выключенном Pi и только к 3,3 В: GPIO у Pi не выдерживают 5 В.", kk: "Датчикті Pi өшірулі кезде және тек 3,3 В пиніне қосыңыз: Pi GPIO 5 В-ке төзбейді." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "logging sensor 3c01d607d1a2 to /home/pi/templog/temperature.csv every 10 s",
      "2026-10-25T14:00:00 22.44 C",
      "2026-10-25T14:00:10 22.44 C",
      "2026-10-25T14:00:20 22.50 C",
      "2026-10-25T14:00:30 24.81 C",
      "2026-10-25T14:00:40 27.19 C",
      "2026-10-25T14:00:50 28.38 C",
      "2026-10-25T14:01:00 26.94 C",
      "2026-10-25T14:01:10 25.50 C",
    ],
    leds: [],
  },
} satisfies GuideContent;
