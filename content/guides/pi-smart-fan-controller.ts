import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pi-smart-fan-controller",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-4",
  category: "tools",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 55,
  xpReward: 200,
  title: {
    en: "Pi Smart Fan Controller",
    ru: "Умное управление вентилятором Raspberry Pi",
    kk: "Raspberry Pi желдеткішін ақылды басқару",
  },
  summary: {
    en: "A logic-level MOSFET lets the Pi 4 drive a 5 V fan with silent 25 kHz hardware PWM: off when cool, faster as the CPU heats up, run by a systemd service.",
    ru: "Логический MOSFET позволяет Pi 4 управлять вентилятором 5 В бесшумным аппаратным ШИМ 25 кГц: выключен, пока холодно, и крутится быстрее с ростом температуры CPU. Работает как служба systemd.",
    kk: "Логикалық MOSFET Pi 4-ке 5 В желдеткішті дыбыссыз 25 кГц аппараттық ШИМ-пен басқаруға мүмкіндік береді: салқында өшірулі, CPU қызған сайын жылдамырақ айналады. systemd қызметі ретінде жұмыс істейді.",
  },
  parts: [
    { component: "raspberry-pi-4", qty: 1, spec: { en: "Raspberry Pi OS Bookworm, 5 V 3 A USB-C supply", ru: "Raspberry Pi OS Bookworm, блок питания USB-C 5 В 3 А", kk: "Raspberry Pi OS Bookworm, USB-C 5 В 3 А қуат блогы" }, role: { en: "Reads CPU temperature, generates PWM", ru: "Читает температуру CPU, формирует ШИМ", kk: "CPU температурасын оқиды, ШИМ жасайды" } },
    { component: "fan-5v", qty: 1, spec: { en: "40 mm, 5 V, 2-wire, ≤ 200 mA", ru: "40 мм, 5 В, 2 провода, ≤ 200 мА", kk: "40 мм, 5 В, 2 сымды, ≤ 200 мА" }, role: { en: "Cools the CPU", ru: "Охлаждает CPU", kk: "CPU-ды салқындатады" } },
    { component: "mosfet-n", qty: 1, spec: { en: "IRLZ44N logic-level, TO-220", ru: "IRLZ44N логического уровня, TO-220", kk: "IRLZ44N логикалық деңгейлі, TO-220" }, role: { en: "Low-side switch for the fan", ru: "Ключ в цепи минуса вентилятора", kk: "Желдеткіштің төменгі жақ кілті" } },
    { component: "diode", qty: 1, spec: { en: "1N4148 (fast), or a 1N5819 Schottky", ru: "1N4148 (быстрый) или Шоттки 1N5819", kk: "1N4148 (жылдам) немесе Шоттки 1N5819" }, role: { en: "Flyback diode across the motor", ru: "Обратный диод на моторе", kk: "Қозғалтқыштағы кері диод" } },
    { component: "resistor", qty: 2, spec: { en: "220 Ω (gate) and 10 kΩ (gate pull-down)", ru: "220 Ом (затвор) и 10 кОм (подтяжка затвора к земле)", kk: "220 Ом (бекітпе) және 10 кОм (бекітпені жерге тарту)" }, role: { en: "Gate current limit and default-off", ru: "Ограничение тока затвора и «выключено» по умолчанию", kk: "Бекітпе тогын шектеу және әдепкі «өшірулі» күй" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "female-male", ru: "мама-папа", kk: "аналық-аталық" }, role: { en: "Pi header to breadboard", ru: "От разъёма Pi к макетке", kk: "Pi ағытпасынан макет тақтасына" } },
  ],
  instances: [
    { id: "fan", component: "fan-5v", label: "5 V fan" },
    { id: "q1", component: "mosfet-n", label: "IRLZ44N" },
    { id: "d1", component: "diode", label: "1N4148" },
    { id: "r_g", component: "resistor", label: "220 Ω" },
    { id: "r_pd", component: "resistor", label: "10 kΩ" },
  ],
  connections: [
    { from: "board.5V2", to: "fan.+", color: "red", note: { en: "pin 4; fan red wire", ru: "пин 4; красный провод вентилятора", kk: "4-пин; желдеткіштің қызыл сымы" } },
    { from: "fan.-", to: "q1.D", color: "black", note: { en: "fan black wire to the drain (middle leg)", ru: "чёрный провод вентилятора к стоку (средняя ножка)", kk: "желдеткіштің қара сымы ағынға (ортаңғы аяқ)" } },
    { from: "d1.K", to: "fan.+", color: "red", note: { en: "striped end to +5 V", ru: "сторона с полоской к +5 В", kk: "жолақты ұшы +5 В-қа" } },
    { from: "d1.A", to: "fan.-", color: "black" },
    { from: "q1.S", to: "board.GND", color: "black", note: { en: "pin 6", ru: "пин 6", kk: "6-пин" } },
    { from: "board.GPIO18", to: "r_g.A", color: "blue", note: { en: "pin 12, hardware PWM0", ru: "пин 12, аппаратный PWM0", kk: "12-пин, аппараттық PWM0" } },
    { from: "r_g.B", to: "q1.G", color: "blue" },
    { from: "r_pd.A", to: "q1.G", color: "gray", note: { en: "keeps the fan off while the Pi boots", ru: "держит вентилятор выключенным во время загрузки", kk: "Pi жүктелгенде желдеткішті өшірулі ұстайды" } },
    { from: "r_pd.B", to: "board.GND3", color: "black", note: { en: "pin 14", ru: "пин 14", kk: "14-пин" } },
  ],
  steps: [
    {
      title: { en: "Why a MOSFET and not a GPIO", ru: "Почему MOSFET, а не GPIO", kk: "Неге GPIO емес, MOSFET" },
      body: {
        en: "A GPIO pin gives 3.3 V and about 16 mA; the fan needs 5 V and up to 150–200 mA, and its motor kicks back voltage spikes. The IRLZ44N is a logic-level MOSFET: 3.3 V on its gate is enough to switch the fan's ground side on, while the fan itself is powered from the Pi's 5 V rail. Hold it with the label facing you: the legs are G, D, S from left to right.",
        ru: "GPIO даёт 3,3 В и около 16 мА, а вентилятору нужно 5 В и до 150–200 мА, к тому же его мотор выдаёт выбросы напряжения. IRLZ44N это MOSFET логического уровня: 3,3 В на затворе достаточно, чтобы замкнуть минус вентилятора, а сам вентилятор питается от линии 5 В. Держите его надписью к себе: ножки слева направо G, D, S.",
        kk: "GPIO 3,3 В және шамамен 16 мА береді, ал желдеткішке 5 В және 150–200 мА-ге дейін керек, оның үстіне қозғалтқышы кернеу секірістерін шығарады. IRLZ44N логикалық деңгейлі MOSFET: бекітпедегі 3,3 В желдеткіштің минусын тұйықтауға жеткілікті, ал желдеткіштің өзі 5 В желісінен қоректенеді. Оны жазуын өзіңізге қаратып ұстаңыз: аяқтары солдан оңға G, D, S.",
      },
      expect: { en: "You know which leg is gate, drain and source before wiring.", ru: "До сборки вы знаете, где затвор, сток и исток.", kk: "Жинамас бұрын бекітпе, ағын және бастау қай аяқ екенін білесіз." },
      mistake: { en: "Using an IRF540 or IRFZ44N (without the L): they need about 10 V on the gate and barely turn on at 3.3 V.", ru: "Взять IRF540 или IRFZ44N (без L): им нужно около 10 В на затворе, от 3,3 В они почти не открываются.", kk: "IRF540 немесе IRFZ44N (L-сіз) алу: оларға бекітпеде шамамен 10 В керек, 3,3 В-тан әрең ашылады." },
    },
    {
      title: { en: "Wire the fan side", ru: "Соберите силовую часть", kk: "Күштік бөлігін жинаңыз" },
      body: {
        en: "With the Pi off, connect the fan's red wire to 5V (pin 4) and its black wire to the MOSFET drain (middle leg). Connect the source (right leg) to GND (pin 6). Put the diode across the fan: striped end (cathode) on the red +5 V wire, other end on the black wire. When the MOSFET switches off, the motor's spike circulates through the diode instead of hitting the MOSFET.",
        ru: "При выключенном Pi подключите красный провод вентилятора к 5V (пин 4), чёрный к стоку MOSFET (средняя ножка). Исток (правая ножка) соедините с GND (пин 6). Поставьте диод параллельно вентилятору: конец с полоской (катод) на красный провод +5 В, другой на чёрный. Когда MOSFET закрывается, выброс мотора замыкается через диод и не бьёт по транзистору.",
        kk: "Pi өшірулі кезде желдеткіштің қызыл сымын 5V-ке (4-пин), қара сымын MOSFET ағынына (ортаңғы аяқ) қосыңыз. Бастауды (оң аяқ) GND-ге (6-пин) жалғаңыз. Диодты желдеткішке параллель қойыңыз: жолақты ұшы (катод) қызыл +5 В сымына, екінші ұшы қара сымға. MOSFET жабылғанда қозғалтқыштың секірісі транзисторға соқпай, диод арқылы тұйықталады.",
      },
      expect: { en: "Fan, diode and MOSFET in one loop between 5V and GND.", ru: "Вентилятор, диод и MOSFET в одном контуре между 5V и GND.", kk: "Желдеткіш, диод және MOSFET 5V пен GND арасында бір контурда." },
      mistake: { en: "Putting the diode in the wrong way round: it shorts 5 V to GND as soon as the fan is on.", ru: "Поставить диод наоборот: как только вентилятор включится, он замкнёт 5 В на GND.", kk: "Диодты кері қою: желдеткіш қосылғанда ол 5 В-ты GND-ге тұйықтайды." },
    },
    {
      title: { en: "Wire the gate", ru: "Подключите затвор", kk: "Бекітпені қосыңыз" },
      body: {
        en: "Run GPIO18 (pin 12) through the 220 Ω resistor to the gate (left leg). Add the 10 kΩ resistor from the gate to GND (pin 14). GPIO18 is the Pi's hardware PWM0 pin, so the kernel produces a clean 25 kHz signal with no CPU load. The pull-down keeps the fan off while the Pi boots and the pin is still an input.",
        ru: "Проведите GPIO18 (пин 12) через резистор 220 Ом к затвору (левая ножка). Резистор 10 кОм поставьте между затвором и GND (пин 14). GPIO18 это аппаратный пин PWM0, поэтому ядро формирует чистый сигнал 25 кГц без нагрузки на CPU. Подтяжка к земле держит вентилятор выключенным, пока Pi загружается и пин ещё вход.",
        kk: "GPIO18-ді (12-пин) 220 Ом резистор арқылы бекітпеге (сол аяқ) жүргізіңіз. 10 кОм резисторды бекітпе мен GND (14-пин) арасына қойыңыз. GPIO18 Pi-дің аппараттық PWM0 пині, сондықтан ядро CPU-ды жүктемей таза 25 кГц сигнал береді. Жерге тарту Pi жүктеліп, пин әлі кіріс болып тұрғанда желдеткішті өшірулі ұстайды.",
      },
      expect: { en: "Powering the Pi on now, the fan stays still.", ru: "Если сейчас включить Pi, вентилятор не крутится.", kk: "Қазір Pi-ді қоссаңыз, желдеткіш айналмайды." },
      mistake: { en: "Skipping the pull-down: the floating gate can leave the fan half on, and the MOSFET warms up.", ru: "Без подтяжки затвор «висит», вентилятор может быть полувключён, а MOSFET греется.", kk: "Тартусыз бекітпе «ілулі» қалады, желдеткіш жартылай қосылып, MOSFET қызады." },
    },
    {
      title: { en: "Install the controller", ru: "Установите контроллер", kk: "Контроллерді орнатыңыз" },
      body: {
        en: "Copy fanctl.py and install.sh to the Pi and run bash install.sh. It adds dtoverlay=pwm,pin=18,func=2 to /boot/firmware/config.txt, installs the script to /usr/local/bin and enables the fanctl systemd service. The script only uses the Python standard library and the kernel's sysfs PWM interface, so there is nothing to pip install. Reboot once.",
        ru: "Скопируйте fanctl.py и install.sh на Pi и выполните bash install.sh. Скрипт добавит dtoverlay=pwm,pin=18,func=2 в /boot/firmware/config.txt, установит программу в /usr/local/bin и включит службу systemd fanctl. Программа использует только стандартную библиотеку Python и sysfs-интерфейс PWM ядра, через pip ничего ставить не нужно. Один раз перезагрузитесь.",
        kk: "fanctl.py мен install.sh файлдарын Pi-ге көшіріп, bash install.sh іске қосыңыз. Скрипт /boot/firmware/config.txt файлына dtoverlay=pwm,pin=18,func=2 қосады, бағдарламаны /usr/local/bin ішіне орнатады және fanctl systemd қызметін қосады. Бағдарлама тек Python стандартты кітапханасын және ядроның sysfs PWM интерфейсін қолданады, pip арқылы ештеңе орнатудың қажеті жоқ. Бір рет қайта жүктеңіз.",
      },
      expect: { en: "After the reboot, ls /sys/class/pwm shows pwmchip0.", ru: "После перезагрузки ls /sys/class/pwm показывает pwmchip0.", kk: "Қайта жүктелгеннен кейін ls /sys/class/pwm pwmchip0-ді көрсетеді." },
      mistake: { en: "Using the 3.5 mm audio jack at the same time: on the Pi 4 it shares the PWM block, so use HDMI or USB audio.", ru: "Одновременно использовать аудиовыход 3,5 мм: на Pi 4 он делит блок PWM, поэтому используйте звук по HDMI или USB.", kk: "3,5 мм аудио шығысты қатар қолдану: Pi 4-те ол PWM блогын бөліседі, сондықтан HDMI немесе USB арқылы дыбысты қолданыңыз." },
    },
    {
      title: { en: "Test the fan", ru: "Проверьте вентилятор", kk: "Желдеткішті тексеріңіз" },
      body: {
        en: "Stop the service (sudo systemctl stop fanctl) and run sudo python3 /usr/local/bin/fanctl.py --sweep: the fan steps through 0, 35, 50, 75 and 100 % for 4 s each. Start the service again and load the CPU with stress-ng --cpu 4 --timeout 120s (sudo apt install stress-ng). Watch the decisions with journalctl -u fanctl -f.",
        ru: "Остановите службу (sudo systemctl stop fanctl) и выполните sudo python3 /usr/local/bin/fanctl.py --sweep: вентилятор пройдёт 0, 35, 50, 75 и 100 % по 4 с. Снова запустите службу и нагрузите CPU: stress-ng --cpu 4 --timeout 120s (sudo apt install stress-ng). Решения контроллера смотрите в journalctl -u fanctl -f.",
        kk: "Қызметті тоқтатып (sudo systemctl stop fanctl), sudo python3 /usr/local/bin/fanctl.py --sweep орындаңыз: желдеткіш 0, 35, 50, 75 және 100 %-ды 4 с-тан өтеді. Қызметті қайта іске қосып, CPU-ды жүктеңіз: stress-ng --cpu 4 --timeout 120s (sudo apt install stress-ng). Контроллер шешімдерін journalctl -u fanctl -f арқылы бақылаңыз.",
      },
      expect: { en: "The fan starts with a short full-speed kick around 50 °C and spins up as the temperature rises.", ru: "Около 50 °C вентилятор стартует коротким рывком на полной скорости и ускоряется с ростом температуры.", kk: "Шамамен 50 °C-та желдеткіш толық жылдамдықпен қысқа серпіліспен іске қосылып, температура өскен сайын жылдамдайды." },
      mistake: { en: "Expecting it to spin at 10 %: most 2-wire fans stall below about 30 %, which is why MIN_DUTY is 35.", ru: "Ждать вращения на 10 %: большинство двухпроводных вентиляторов останавливаются ниже ~30 %, поэтому MIN_DUTY = 35.", kk: "10 %-да айналады деп күту: екі сымды желдеткіштердің көбі ~30 %-дан төмен тоқтайды, сондықтан MIN_DUTY = 35." },
    },
    {
      title: { en: "Tune the curve", ru: "Настройте кривую", kk: "Қисықты баптаңыз" },
      body: {
        en: "The fan turns on at START_C (50 °C), runs from MIN_DUTY up to 100 % at FULL_C (70 °C) and only turns off again below STOP_C (45 °C), so it does not switch on and off every few seconds. Edit these constants in /usr/local/bin/fanctl.py and run sudo systemctl restart fanctl. The Pi 4 starts throttling at 80 °C, so keep FULL_C well below that.",
        ru: "Вентилятор включается при START_C (50 °C), работает от MIN_DUTY до 100 % при FULL_C (70 °C) и выключается только ниже STOP_C (45 °C), чтобы не щёлкать каждые несколько секунд. Меняйте эти константы в /usr/local/bin/fanctl.py и выполняйте sudo systemctl restart fanctl. Pi 4 начинает троттлинг при 80 °C, поэтому держите FULL_C заметно ниже.",
        kk: "Желдеткіш START_C-та (50 °C) қосылады, MIN_DUTY-ден FULL_C-та (70 °C) 100 %-ға дейін жұмыс істейді және тек STOP_C-тан (45 °C) төмен түскенде өшеді, сондықтан әр бірнеше секунд сайын қосылып-өшпейді. Бұл тұрақтыларды /usr/local/bin/fanctl.py ішінде өзгертіп, sudo systemctl restart fanctl орындаңыз. Pi 4 80 °C-та жиілікті төмендете бастайды, сондықтан FULL_C одан әлдеқайда төмен болсын.",
      },
      expect: { en: "At idle the fan is silent; under load the CPU stays below about 65 °C.", ru: "В простое вентилятор молчит; под нагрузкой CPU держится ниже ~65 °C.", kk: "Бос тұрғанда желдеткіш үнсіз; жүктемеде CPU ~65 °C-тан төмен болады." },
      mistake: { en: "Setting STOP_C equal to START_C: the fan then toggles constantly around one temperature.", ru: "Сделать STOP_C равным START_C: вентилятор будет постоянно щёлкать около одной температуры.", kk: "STOP_C-ты START_C-қа тең ету: желдеткіш бір температура маңында үнемі қосылып-өшеді." },
    },
  ],
  code: [
    {
      filename: "fanctl.py",
      language: "python",
      libraries: [],
      source: `#!/usr/bin/env python3
"""CPU-temperature fan control: 25 kHz hardware PWM on GPIO18 -> IRLZ44N -> 5 V fan (Raspberry Pi 4)."""
import signal
import sys
import time
from pathlib import Path

FAN_PIN = 18              # GPIO18, physical pin 12 = PWM0 (dtoverlay=pwm,pin=18,func=2)
PWM_CHANNEL = 0
PERIOD_NS = 40000         # 25 kHz, above the audible range
START_C = 50              # fan switches on at this temperature
STOP_C = 45               # ...and off again only below this (hysteresis)
FULL_C = 70               # 100 % at and above this
MIN_DUTY = 35             # most 2-wire fans stall below ~30 %
POLL_S = 2

PWM_CHIP = Path("/sys/class/pwm/pwmchip0")
TEMP_FILE = Path("/sys/class/thermal/thermal_zone0/temp")


class Fan:
    def __init__(self, channel):
        self.dir = PWM_CHIP / f"pwm{channel}"
        if not self.dir.exists():
            (PWM_CHIP / "export").write_text(str(channel))
            for _ in range(50):              # wait for the kernel to create the files
                if (self.dir / "enable").exists():
                    break
                time.sleep(0.02)
        self._write("duty_cycle", 0)
        self._write("period", PERIOD_NS)
        self._write("enable", 1)
        self.duty = 0

    def _write(self, name, value):
        (self.dir / name).write_text(str(value))

    def set_duty(self, percent):
        percent = max(0, min(100, int(percent)))
        self._write("duty_cycle", PERIOD_NS * percent // 100)
        self.duty = percent

    def close(self):
        self.set_duty(0)
        self._write("enable", 0)


def cpu_temp():
    return int(TEMP_FILE.read_text()) / 1000


def target_duty(temp, running):
    if temp >= FULL_C:
        return 100
    if temp < (STOP_C if running else START_C):
        return 0
    span = (temp - STOP_C) / (FULL_C - STOP_C)
    return round(MIN_DUTY + (100 - MIN_DUTY) * span)


def main():
    signal.signal(signal.SIGTERM, lambda *_: sys.exit(0))
    fan = Fan(PWM_CHANNEL)
    try:
        if "--sweep" in sys.argv:
            for duty in (0, MIN_DUTY, 50, 75, 100, 0):
                fan.set_duty(duty)
                print(f"sweep: fan {duty}%", flush=True)
                time.sleep(4)
            return
        print(f"fan control: 25 kHz PWM on GPIO{FAN_PIN}, on at {START_C} C, "
              f"off below {STOP_C} C, full at {FULL_C} C", flush=True)
        recent = []
        logged_duty = -100
        logged_at = 0.0
        while True:
            recent = (recent + [cpu_temp()])[-3:]         # smooth over ~6 s
            temp = sum(recent) / len(recent)
            duty = target_duty(temp, fan.duty > 0)
            if duty > 0 and fan.duty == 0:
                fan.set_duty(100)                         # kick-start a stopped fan
                time.sleep(1)
            if duty != fan.duty:
                fan.set_duty(duty)
            now = time.monotonic()
            if abs(duty - logged_duty) >= 5 or now - logged_at >= 60:
                print(f"{temp:.1f} C -> fan {duty}%", flush=True)
                logged_duty, logged_at = duty, now
            time.sleep(POLL_S)
    finally:
        fan.close()
        print("stopped, fan off", flush=True)


if __name__ == "__main__":
    main()
`,
    },
    {
      filename: "install.sh",
      language: "bash",
      libraries: [],
      source: `#!/bin/bash
# One-time setup on Raspberry Pi OS Bookworm (Pi 4). Run from the folder that holds fanctl.py:
#   bash install.sh
set -euo pipefail
CONFIG=/boot/firmware/config.txt

# Hardware PWM0 on GPIO18 (ALT5)
if ! grep -q "^dtoverlay=pwm,pin=18,func=2" "$CONFIG"; then
  echo "dtoverlay=pwm,pin=18,func=2" | sudo tee -a "$CONFIG" > /dev/null
fi

sudo install -m 755 fanctl.py /usr/local/bin/fanctl.py

# Runs as root: it writes to /sys/class/pwm, and nothing else
sudo tee /etc/systemd/system/fanctl.service > /dev/null <<'EOF'
[Unit]
Description=CPU temperature fan control (PWM on GPIO18)

[Service]
ExecStart=/usr/bin/python3 /usr/local/bin/fanctl.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable fanctl.service
echo "Done. Reboot once to load the PWM overlay: sudo reboot"
`,
    },
  ],
  troubleshooting: [
    {
      symptom: { en: "FileNotFoundError: /sys/class/pwm/pwmchip0", ru: "FileNotFoundError: /sys/class/pwm/pwmchip0", kk: "FileNotFoundError: /sys/class/pwm/pwmchip0" },
      cause: { en: "The PWM overlay is not loaded: no reboot yet, or the line is missing from config.txt.", ru: "Оверлей PWM не загружен: не было перезагрузки или строки нет в config.txt.", kk: "PWM оверлейі жүктелмеген: қайта жүктелмеген немесе config.txt-те жол жоқ." },
      fix: { en: "Check grep pwm /boot/firmware/config.txt, then reboot.", ru: "Проверьте grep pwm /boot/firmware/config.txt и перезагрузитесь.", kk: "grep pwm /boot/firmware/config.txt тексеріп, қайта жүктеңіз." },
    },
    {
      symptom: { en: "The fan runs at full speed all the time", ru: "Вентилятор всё время на полной скорости", kk: "Желдеткіш үнемі толық жылдамдықта" },
      cause: { en: "The black wire goes to GND instead of the drain, or drain and source are swapped (the MOSFET's body diode then conducts).", ru: "Чёрный провод идёт на GND вместо стока, или перепутаны сток и исток (тогда проводит внутренний диод MOSFET).", kk: "Қара сым ағынның орнына GND-ге барады немесе ағын мен бастау ауысқан (онда MOSFET-тің ішкі диоды өткізеді)." },
      fix: { en: "Fan black wire to the middle leg (D), right leg (S) to GND, with the label facing you.", ru: "Чёрный провод на среднюю ножку (D), правая ножка (S) на GND, надписью к себе.", kk: "Қара сым ортаңғы аяққа (D), оң аяқ (S) GND-ге, жазуы өзіңізге қарай." },
    },
    {
      symptom: { en: "The fan never starts, even in --sweep", ru: "Вентилятор не стартует даже в --sweep", kk: "Желдеткіш --sweep режимінде де іске қосылмайды" },
      cause: { en: "A standard (non logic-level) MOSFET, a missing gate wire, or the diode shorting the supply.", ru: "Обычный (не логический) MOSFET, нет провода к затвору, или диод замыкает питание.", kk: "Қарапайым (логикалық емес) MOSFET, бекітпе сымы жоқ немесе диод қуатты тұйықтайды." },
      fix: { en: "Use an IRLZ44N, check GPIO18 → 220 Ω → gate, and that the diode stripe faces +5 V.", ru: "Используйте IRLZ44N, проверьте цепь GPIO18 → 220 Ом → затвор и что полоска диода смотрит на +5 В.", kk: "IRLZ44N қолданып, GPIO18 → 220 Ом → бекітпе тізбегін және диод жолағы +5 В-қа қарағанын тексеріңіз." },
    },
    {
      symptom: { en: "The fan switches on and off every few seconds", ru: "Вентилятор включается и выключается каждые несколько секунд", kk: "Желдеткіш әр бірнеше секунд сайын қосылып-өшеді" },
      cause: { en: "STOP_C is too close to START_C for your case's airflow.", ru: "STOP_C слишком близко к START_C для вашего корпуса.", kk: "Корпусыңыз үшін STOP_C START_C-қа тым жақын." },
      fix: { en: "Widen the gap, for example START_C = 55 and STOP_C = 45, and restart the service.", ru: "Увеличьте разрыв, например START_C = 55 и STOP_C = 45, и перезапустите службу.", kk: "Аралықты үлкейтіңіз, мысалы START_C = 55 және STOP_C = 45, содан кейін қызметті қайта іске қосыңыз." },
    },
  ],
  safety: [
    { en: "Never connect the fan straight to a GPIO pin: drive it only through the MOSFET, with the flyback diode in place.", ru: "Никогда не подключайте вентилятор прямо к GPIO: только через MOSFET и с обратным диодом.", kk: "Желдеткішті ешқашан тікелей GPIO-ға қоспаңыз: тек MOSFET арқылы және кері диодпен." },
    { en: "Keep fingers and cables away from the blades, and wire with the Pi powered off.", ru: "Держите пальцы и провода подальше от лопастей и собирайте схему при выключенном Pi.", kk: "Саусақтар мен сымдарды қалақтардан алыс ұстап, сұлбаны Pi өшірулі кезде жинаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "fan control: 25 kHz PWM on GPIO18, on at 50 C, off below 45 C, full at 70 C",
      "43.8 C -> fan 0%",
      "50.6 C -> fan 50%",
      "55.0 C -> fan 61%",
      "62.3 C -> fan 80%",
      "70.6 C -> fan 100%",
      "57.4 C -> fan 67%",
      "48.2 C -> fan 43%",
      "44.6 C -> fan 0%",
    ],
    leds: [],
  },
} satisfies GuideContent;
