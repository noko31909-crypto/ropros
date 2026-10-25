import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pi-motion-logger-pir",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-4",
  category: "security",
  robotics: false,
  difficulty: "beginner",
  hours: 2,
  costUsd: 54,
  xpReward: 140,
  title: {
    en: "Pi Motion Logger with PIR",
    ru: "Журнал движения на Raspberry Pi с PIR",
    kk: "PIR датчигі бар Raspberry Pi қозғалыс журналы",
  },
  summary: {
    en: "An HC-SR501 PIR sensor on a Raspberry Pi 4 logs every motion event with a timestamp and duration, chirps a buzzer and can e-mail you an alert.",
    ru: "Датчик HC-SR501 на Raspberry Pi 4 записывает каждое движение с меткой времени и длительностью, пищит зуммером и может прислать письмо-оповещение.",
    kk: "Raspberry Pi 4-ке қосылған HC-SR501 PIR датчигі әр қозғалысты уақыт белгісімен және ұзақтығымен жазады, зуммермен дыбыс береді және хат жібере алады.",
  },
  parts: [
    { component: "raspberry-pi-4", qty: 1, spec: { en: "Raspberry Pi OS Bookworm, 5 V 3 A USB-C supply", ru: "Raspberry Pi OS Bookworm, блок питания USB-C 5 В 3 А", kk: "Raspberry Pi OS Bookworm, USB-C 5 В 3 А қуат блогы" }, role: { en: "Logger and alert sender", ru: "Журнал и отправка оповещений", kk: "Журнал және хабарлама жіберу" } },
    { component: "pir-hc-sr501", qty: 1, spec: { en: "5 V supply, 3.3 V output, up to ~7 m", ru: "питание 5 В, выход 3,3 В, до ~7 м", kk: "5 В қуат, 3,3 В шығыс, ~7 м-ге дейін" }, role: { en: "Motion sensor", ru: "Датчик движения", kk: "Қозғалыс датчигі" } },
    { component: "buzzer-active", qty: 1, spec: { en: "5 V active buzzer", ru: "активный зуммер 5 В", kk: "5 В белсенді зуммер" }, role: { en: "Audible chirp on motion", ru: "Звуковой сигнал при движении", kk: "Қозғалыс кезіндегі дыбыс сигналы" } },
    { component: "npn-transistor", qty: 1, spec: { en: "2N2222 (or BC547, check the pinout)", ru: "2N2222 (или BC547, сверьте цоколёвку)", kk: "2N2222 (немесе BC547, аяқтарын тексеріңіз)" }, role: { en: "Switches the 5 V buzzer from a 3.3 V GPIO", ru: "Включает зуммер 5 В от GPIO 3,3 В", kk: "5 В зуммерді 3,3 В GPIO-дан қосады" } },
    { component: "resistor", qty: 1, spec: { en: "1 kΩ, ¼ W", ru: "1 кОм, ¼ Вт", kk: "1 кОм, ¼ Вт" }, role: { en: "Transistor base resistor", ru: "Базовый резистор транзистора", kk: "Транзистордың база резисторы" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "female-female and female-male", ru: "мама-мама и мама-папа", kk: "аналық-аналық және аналық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "pir", component: "pir-hc-sr501", label: "HC-SR501" },
    { id: "bz", component: "buzzer-active", label: "Buzzer 5 V" },
    { id: "q1", component: "npn-transistor", label: "2N2222" },
    { id: "r1", component: "resistor", label: "1 kΩ" },
  ],
  connections: [
    { from: "board.5V", to: "pir.VCC", color: "red", note: { en: "pin 2", ru: "пин 2", kk: "2-пин" } },
    { from: "pir.GND", to: "board.GND", color: "black", note: { en: "pin 6", ru: "пин 6", kk: "6-пин" } },
    { from: "pir.OUT", to: "board.GPIO17", color: "yellow", note: { en: "pin 11; the module outputs 3.3 V, safe for the Pi", ru: "пин 11; модуль выдаёт 3,3 В, это безопасно для Pi", kk: "11-пин; модуль 3,3 В береді, Pi үшін қауіпсіз" } },
    { from: "board.5V2", to: "bz.+", color: "red", note: { en: "pin 4", ru: "пин 4", kk: "4-пин" } },
    { from: "bz.-", to: "q1.C", color: "orange" },
    { from: "q1.E", to: "board.GND3", color: "black", note: { en: "pin 14", ru: "пин 14", kk: "14-пин" } },
    { from: "board.GPIO27", to: "r1.A", color: "green", note: { en: "pin 13", ru: "пин 13", kk: "13-пин" } },
    { from: "r1.B", to: "q1.B", color: "green" },
  ],
  steps: [
    {
      title: { en: "Set up the PIR module", ru: "Настройте модуль PIR", kk: "PIR модулін баптаңыз" },
      body: {
        en: "Pull off the white dome to read the labels VCC, OUT, GND, then put it back. Turn the time-delay pot (Tx) fully anticlockwise (about 3 s) and the sensitivity pot (Sx) to the middle. Set the jumper to H (repeat trigger), so OUT stays high as long as someone keeps moving.",
        ru: "Снимите белый купол, чтобы прочитать подписи VCC, OUT, GND, затем верните его. Поверните подстроечник задержки (Tx) до упора против часовой стрелки (около 3 с), а чувствительность (Sx) поставьте в середину. Перемычку поставьте в H (повторный запуск), тогда OUT держит высокий уровень, пока человек двигается.",
        kk: "VCC, OUT, GND жазуларын оқу үшін ақ күмбезді алып, қайта орнатыңыз. Кідіріс реттегішін (Tx) сағат тіліне қарсы соңына дейін бұраңыз (шамамен 3 с), ал сезімталдықты (Sx) ортасына қойыңыз. Секіргішті H күйіне қойыңыз (қайта іске қосу), сонда адам қозғалып тұрғанда OUT жоғары деңгейде қалады.",
      },
      expect: { en: "Short delay, medium range and repeat-trigger mode.", ru: "Короткая задержка, средняя дальность и режим повторного запуска.", kk: "Қысқа кідіріс, орташа қашықтық және қайта іске қосу режимі." },
      mistake: { en: "Leaving Tx at maximum: OUT then stays high for several minutes and every event looks like one long one.", ru: "Tx на максимуме: OUT держится несколько минут, и все события сливаются в одно длинное.", kk: "Tx максимумда қалса: OUT бірнеше минут жоғары тұрады да, барлық оқиғалар бір ұзақ оқиғаға айналады." },
    },
    {
      title: { en: "Wire the sensor", ru: "Подключите датчик", kk: "Датчикті қосыңыз" },
      body: {
        en: "With the Pi off, connect PIR VCC to 5V (pin 2), GND to GND (pin 6) and OUT to GPIO17 (pin 11). The HC-SR501 needs at least 4.5 V to run, but its onboard regulator makes the output 3.3 V, so OUT can go straight to the Pi's GPIO.",
        ru: "При выключенном Pi подключите VCC датчика к 5V (пин 2), GND к GND (пин 6), OUT к GPIO17 (пин 11). HC-SR501 нужно не меньше 4,5 В для работы, но встроенный стабилизатор делает выход 3,3 В, поэтому OUT можно подключить прямо к GPIO Pi.",
        kk: "Pi өшірулі кезде датчиктің VCC-ін 5V-ке (2-пин), GND-ін GND-ге (6-пин), OUT-ын GPIO17-ге (11-пин) қосыңыз. HC-SR501 жұмыс істеуі үшін кемінде 4,5 В керек, бірақ ішкі тұрақтандырғыш шығысты 3,3 В етеді, сондықтан OUT-ты тікелей Pi GPIO-сына қосуға болады.",
      },
      expect: { en: "Three female-female wires from the module to the header.", ru: "Три провода мама-мама от модуля к разъёму.", kk: "Модульден ағытпаға үш аналық-аналық сым." },
      mistake: { en: "Powering the PIR from 3V3: it is below its 4.5 V minimum and triggers randomly or not at all.", ru: "Питание PIR от 3V3: это ниже минимума 4,5 В, датчик срабатывает случайно или вообще не работает.", kk: "PIR-ді 3V3-тен қоректендіру: бұл 4,5 В минимумнан төмен, датчик кездейсоқ іске қосылады немесе мүлде жұмыс істемейді." },
    },
    {
      title: { en: "Add the buzzer driver", ru: "Добавьте ключ для зуммера", kk: "Зуммер кілтін қосыңыз" },
      body: {
        en: "The active buzzer wants 5 V and about 30 mA, more than a 3.3 V GPIO should give, so a transistor switches it. Hold the 2N2222 flat side towards you: legs are E, B, C. Connect buzzer + to 5V (pin 4), buzzer - to the collector C, the emitter E to GND (pin 14), and GPIO27 (pin 13) through the 1 kΩ resistor to the base B.",
        ru: "Активному зуммеру нужно 5 В и около 30 мА, это больше, чем стоит брать с GPIO 3,3 В, поэтому его включает транзистор. Держите 2N2222 плоской стороной к себе: ножки E, B, C. Подключите + зуммера к 5V (пин 4), - зуммера к коллектору C, эмиттер E к GND (пин 14), а GPIO27 (пин 13) через резистор 1 кОм к базе B.",
        kk: "Белсенді зуммерге 5 В және шамамен 30 мА керек, бұл 3,3 В GPIO-дан алуға болатыннан көп, сондықтан оны транзистор қосады. 2N2222-ні жалпақ жағымен өзіңізге қаратып ұстаңыз: аяқтары E, B, C. Зуммердің + шығысын 5V-ке (4-пин), - шығысын коллектор C-ға, эмиттер E-ні GND-ге (14-пин), ал GPIO27-ні (13-пин) 1 кОм резистор арқылы база B-ға қосыңыз.",
      },
      expect: { en: "The buzzer is silent at power-up and only sounds when GPIO27 goes high.", ru: "При включении зуммер молчит и звучит только когда GPIO27 в высоком уровне.", kk: "Қосылғанда зуммер үнсіз, тек GPIO27 жоғары болғанда дыбыс шығарады." },
      mistake: { en: "A BC547 has the opposite pinout (C, B, E with the flat side facing you); swapping C and E makes the buzzer weak or silent.", ru: "У BC547 обратная цоколёвка (C, B, E плоской стороной к себе); если перепутать C и E, зуммер тихий или молчит.", kk: "BC547-нің аяқтары керісінше (жалпақ жағы өзіңізге қарай C, B, E); C мен E ауысса, зуммер әлсіз естіледі немесе үнсіз болады." },
    },
    {
      title: { en: "Install the logger", ru: "Установите логгер", kk: "Тіркегішті орнатыңыз" },
      body: {
        en: "Copy motion_logger.py and install.sh into one folder on the Pi and run bash install.sh. It installs gpiozero with the lgpio backend from apt, copies the script to ~/motionlog, creates a root-only /etc/motionlog.env for the optional e-mail settings and registers the motionlog systemd service. Start it with sudo systemctl start motionlog.",
        ru: "Скопируйте motion_logger.py и install.sh в одну папку на Pi и выполните bash install.sh. Скрипт поставит gpiozero с бэкендом lgpio из apt, скопирует программу в ~/motionlog, создаст доступный только root файл /etc/motionlog.env для необязательных настроек почты и зарегистрирует службу systemd motionlog. Запустите её: sudo systemctl start motionlog.",
        kk: "motion_logger.py мен install.sh файлдарын Pi-дегі бір қалтаға көшіріп, bash install.sh іске қосыңыз. Скрипт apt арқылы lgpio бэкенді бар gpiozero-ны орнатады, бағдарламаны ~/motionlog қалтасына көшіреді, қосымша пошта баптаулары үшін тек root оқи алатын /etc/motionlog.env файлын жасайды және motionlog systemd қызметін тіркейді. Оны sudo systemctl start motionlog арқылы іске қосыңыз.",
      },
      expect: { en: "journalctl -u motionlog -f shows \"PIR warming up (60 s)...\" and then \"armed\".", ru: "journalctl -u motionlog -f показывает «PIR warming up (60 s)...», затем «armed».", kk: "journalctl -u motionlog -f алдымен «PIR warming up (60 s)...», содан кейін «armed» көрсетеді." },
      mistake: { en: "Walking past during the first minute: the sensor is still settling and may fire on its own.", ru: "Ходить перед датчиком в первую минуту: он ещё стабилизируется и может срабатывать сам.", kk: "Алғашқы минутта датчиктің алдынан өту: ол әлі тұрақталып жатыр және өздігінен іске қосылуы мүмкін." },
    },
    {
      title: { en: "Test and read the log", ru: "Проверьте и посмотрите журнал", kk: "Тексеріп, журналды қараңыз" },
      body: {
        en: "Wave a hand 1–2 m in front of the dome. The buzzer chirps twice and a \"motion\" row is added to ~/motionlog/motion.csv; when OUT drops, a \"clear\" row records how long the motion lasted. Use tail -f ~/motionlog/motion.csv to watch it live.",
        ru: "Помашите рукой в 1–2 м от купола. Зуммер пискнет дважды, а в ~/motionlog/motion.csv добавится строка «motion»; когда OUT опустится, строка «clear» запишет длительность движения. Следите в реальном времени через tail -f ~/motionlog/motion.csv.",
        kk: "Күмбездің алдында 1–2 м қашықтықта қол бұлғаңыз. Зуммер екі рет дыбыс береді, ал ~/motionlog/motion.csv файлына «motion» жолы қосылады; OUT төмендегенде «clear» жолы қозғалыстың ұзақтығын жазады. Тікелей бақылау үшін tail -f ~/motionlog/motion.csv қолданыңыз.",
      },
      expect: { en: "Pairs of motion/clear rows with a duration of a few seconds.", ru: "Пары строк motion/clear с длительностью в несколько секунд.", kk: "Ұзақтығы бірнеше секунд болатын motion/clear жолдарының жұптары." },
      mistake: { en: "Pointing the sensor at a heater, window or air vent: moving warm air causes false alarms.", ru: "Направлять датчик на батарею, окно или вентиляцию: потоки тёплого воздуха дают ложные срабатывания.", kk: "Датчикті жылытқышқа, терезеге немесе желдеткішке бағыттау: жылы ауа ағыны жалған дабыл береді." },
    },
    {
      title: { en: "Optional: e-mail alerts", ru: "Дополнительно: оповещения на почту", kk: "Қосымша: поштаға хабарлама" },
      body: {
        en: "Edit the settings with sudo nano /etc/motionlog.env: uncomment SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and ALERT_TO. For Gmail create an app password in your Google account; never use your main password. Run sudo systemctl restart motionlog. Alerts are sent at most once every 5 minutes so a busy room does not flood your inbox.",
        ru: "Откройте настройки: sudo nano /etc/motionlog.env и раскомментируйте SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS и ALERT_TO. Для Gmail создайте пароль приложения в аккаунте Google; основной пароль не используйте. Выполните sudo systemctl restart motionlog. Письма уходят не чаще раза в 5 минут, чтобы оживлённая комната не завалила почту.",
        kk: "Баптауларды sudo nano /etc/motionlog.env арқылы ашып, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS және ALERT_TO жолдарының түсініктемесін алып тастаңыз. Gmail үшін Google аккаунтында қолданба құпиясөзін жасаңыз; негізгі құпиясөзді қолданбаңыз. sudo systemctl restart motionlog орындаңыз. Адам көп бөлме поштаны толтырмауы үшін хаттар 5 минутта бір реттен жиі жіберілмейді.",
      },
      expect: { en: "The journal prints \"email sent\" after the next motion event.", ru: "После следующего движения в журнале появится «email sent».", kk: "Келесі қозғалыстан кейін журналда «email sent» шығады." },
      mistake: { en: "Putting the password into the script or a public repository; keep it only in the root-only env file.", ru: "Записывать пароль в скрипт или публичный репозиторий; храните его только в env-файле, доступном root.", kk: "Құпиясөзді скриптке немесе ашық репозиторийге жазу; оны тек root оқитын env файлында сақтаңыз." },
    },
  ],
  code: [
    {
      filename: "motion_logger.py",
      language: "python",
      libraries: ["gpiozero", "lgpio"],
      source: `#!/usr/bin/env python3
"""HC-SR501 PIR on GPIO17 -> timestamped CSV log, buzzer on GPIO27, optional e-mail alert."""
import csv
import os
import smtplib
import ssl
import sys
import threading
import time
from datetime import datetime
from email.message import EmailMessage
from pathlib import Path
from signal import pause

from gpiozero import Buzzer, MotionSensor

PIR_PIN = 17          # GPIO17, physical pin 11
BUZZER_PIN = 27       # GPIO27, physical pin 13 -> 1 kOhm -> transistor base
WARMUP_S = 60
EMAIL_COOLDOWN_S = 300
LOG_FILE = Path.home() / "motionlog" / "motion.csv"

# Optional e-mail settings come from the environment (/etc/motionlog.env), never from the code
SMTP_HOST = os.environ.get("SMTP_HOST", "")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "465"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASS = os.environ.get("SMTP_PASS", "")
ALERT_TO = os.environ.get("ALERT_TO", "")
EMAIL_ON = all((SMTP_HOST, SMTP_USER, SMTP_PASS, ALERT_TO))

pir = MotionSensor(PIR_PIN)
buzzer = Buzzer(BUZZER_PIN)
log_lock = threading.Lock()
motion_start = None
last_email = None


def log(event, duration=""):
    stamp = datetime.now().isoformat(timespec="seconds")
    with log_lock:
        LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
        is_new = not LOG_FILE.exists()
        with LOG_FILE.open("a", newline="") as f:
            writer = csv.writer(f)
            if is_new:
                writer.writerow(["timestamp", "event", "duration_s"])
            writer.writerow([stamp, event, duration])
    print(f"{stamp} {event} {duration}".rstrip(), flush=True)
    return stamp


def send_email(stamp):
    msg = EmailMessage()
    msg["Subject"] = f"Motion detected at {stamp}"
    msg["From"] = SMTP_USER
    msg["To"] = ALERT_TO
    msg.set_content(f"The PIR sensor on {os.uname().nodename} saw motion at {stamp}.")
    try:
        ctx = ssl.create_default_context()
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=ctx, timeout=20) as smtp:
            smtp.login(SMTP_USER, SMTP_PASS)
            smtp.send_message(msg)
        print("email sent", flush=True)
    except (OSError, smtplib.SMTPException) as e:
        print(f"email failed: {e}", file=sys.stderr, flush=True)


def on_motion():
    global motion_start, last_email
    motion_start = time.monotonic()
    stamp = log("motion")
    buzzer.beep(on_time=0.1, off_time=0.1, n=2, background=True)
    if EMAIL_ON and (last_email is None or time.monotonic() - last_email > EMAIL_COOLDOWN_S):
        last_email = time.monotonic()
        threading.Thread(target=send_email, args=(stamp,), daemon=True).start()


def on_no_motion():
    duration = f"{time.monotonic() - motion_start:.1f}" if motion_start is not None else ""
    log("clear", duration)


print(f"PIR warming up ({WARMUP_S} s)...", flush=True)
time.sleep(WARMUP_S)
pir.wait_for_no_motion()
pir.when_motion = on_motion
pir.when_no_motion = on_no_motion
print(f"armed, logging to {LOG_FILE}, e-mail {'on' if EMAIL_ON else 'off'}", flush=True)
pause()
`,
    },
    {
      filename: "install.sh",
      language: "bash",
      libraries: [],
      source: `#!/bin/bash
# One-time setup on Raspberry Pi OS Bookworm. Run from the folder that holds motion_logger.py:
#   bash install.sh
set -euo pipefail
APP_DIR="$HOME/motionlog"

sudo apt update
sudo apt install -y python3-gpiozero python3-lgpio
mkdir -p "$APP_DIR"
cp motion_logger.py "$APP_DIR/"

# Optional e-mail settings: readable by root only, systemd loads them for the service
if [ ! -f /etc/motionlog.env ]; then
  sudo tee /etc/motionlog.env > /dev/null <<'EOF'
# Uncomment and fill in for e-mail alerts (use an app password, not your main password)
#SMTP_HOST=smtp.gmail.com
#SMTP_PORT=465
#SMTP_USER=you@example.com
#SMTP_PASS=your-app-password
#ALERT_TO=you@example.com
EOF
  sudo chmod 600 /etc/motionlog.env
fi

sudo tee /etc/systemd/system/motionlog.service > /dev/null <<EOF
[Unit]
Description=PIR motion logger
After=network-online.target
Wants=network-online.target

[Service]
User=$USER
EnvironmentFile=-/etc/motionlog.env
ExecStart=/usr/bin/python3 $APP_DIR/motion_logger.py
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable motionlog.service
echo "Done. Start it now with: sudo systemctl start motionlog"
`,
    },
  ],
  troubleshooting: [
    {
      symptom: { en: "Motion is logged every few seconds with nobody around", ru: "Движение пишется каждые несколько секунд, хотя никого нет", kk: "Ешкім жоқ болса да, әр бірнеше секунд сайын қозғалыс жазылады" },
      cause: { en: "Sensitivity is too high, the sensor sees warm air or sunlight, or it is still in its warm-up minute.", ru: "Слишком высокая чувствительность, датчик видит тёплый воздух или солнце, или ещё идёт минута прогрева.", kk: "Сезімталдық тым жоғары, датчик жылы ауаны не күнді көреді немесе әлі бір минуттық қызу жүріп жатыр." },
      fix: { en: "Turn Sx anticlockwise, aim the dome away from heaters and windows, and wait for \"armed\".", ru: "Поверните Sx против часовой стрелки, отверните купол от батарей и окон и дождитесь «armed».", kk: "Sx-ті сағат тіліне қарсы бұраңыз, күмбезді жылытқыш пен терезеден бұрып, «armed» шыққанша күтіңіз." },
    },
    {
      symptom: { en: "Every event lasts minutes", ru: "Каждое событие длится минутами", kk: "Әр оқиға бірнеше минутқа созылады" },
      cause: { en: "The Tx delay pot is turned up, so OUT stays high long after the motion stops.", ru: "Подстроечник задержки Tx выкручен, и OUT долго держится после остановки движения.", kk: "Tx кідіріс реттегіші бұралған, сондықтан OUT қозғалыс тоқтаған соң да ұзақ жоғары тұрады." },
      fix: { en: "Turn Tx fully anticlockwise for the shortest delay (~3 s).", ru: "Поверните Tx до упора против часовой стрелки для минимальной задержки (~3 с).", kk: "Ең қысқа кідіріс (~3 с) үшін Tx-ті сағат тіліне қарсы соңына дейін бұраңыз." },
    },
    {
      symptom: { en: "Log works but the buzzer is silent", ru: "Журнал пишется, а зуммер молчит", kk: "Журнал жазылады, бірақ зуммер үнсіз" },
      cause: { en: "Transistor legs swapped, buzzer reversed, or the base resistor is not on GPIO27.", ru: "Перепутаны ножки транзистора, зуммер перевёрнут или базовый резистор не на GPIO27.", kk: "Транзистордың аяқтары ауысқан, зуммер кері қойылған немесе база резисторы GPIO27-де емес." },
      fix: { en: "Check E-B-C against your transistor's datasheet and that buzzer + goes to 5V, - to the collector.", ru: "Сверьте E-B-C с даташитом своего транзистора и проверьте: + зуммера к 5V, - к коллектору.", kk: "E-B-C-ні транзистордың құжатымен салыстырып, зуммердің + шығысы 5V-ке, - шығысы коллекторға қосылғанын тексеріңіз." },
    },
    {
      symptom: { en: "\"email failed: (535, ...)\" in the journal", ru: "В журнале «email failed: (535, ...)»", kk: "Журналда «email failed: (535, ...)»" },
      cause: { en: "The SMTP server rejected the login, usually because a normal password was used instead of an app password.", ru: "SMTP-сервер отклонил вход, обычно потому что указан обычный пароль, а не пароль приложения.", kk: "SMTP сервері кіруді қабылдамады, әдетте қолданба құпиясөзінің орнына қарапайым құпиясөз көрсетілгендіктен." },
      fix: { en: "Create an app password, put it in /etc/motionlog.env and restart the service.", ru: "Создайте пароль приложения, впишите его в /etc/motionlog.env и перезапустите службу.", kk: "Қолданба құпиясөзін жасап, оны /etc/motionlog.env файлына жазыңыз да, қызметті қайта іске қосыңыз." },
    },
  ],
  safety: [
    { en: "Wire everything with the Pi powered off; a 5 V wire touching a GPIO pin can destroy it.", ru: "Подключайте всё при выключенном Pi: провод 5 В, коснувшийся GPIO, может его сжечь.", kk: "Барлығын Pi өшірулі кезде қосыңыз: GPIO пиніне тиген 5 В сым оны күйдіруі мүмкін." },
    { en: "Tell people in the room that motion is logged, and keep e-mail credentials out of the code.", ru: "Предупредите людей в комнате, что движение записывается, и не храните пароли почты в коде.", kk: "Бөлмедегі адамдарға қозғалыс жазылатынын ескертіңіз және пошта құпиясөздерін кодта сақтамаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "PIR warming up (60 s)...",
      "armed, logging to /home/pi/motionlog/motion.csv, e-mail on",
      "2026-10-25T21:14:03 motion",
      "email sent",
      "2026-10-25T21:14:09 clear 6.2",
      "2026-10-25T21:15:40 motion",
      "2026-10-25T21:15:44 clear 4.1",
      "2026-10-25T21:31:12 motion",
      "2026-10-25T21:31:20 clear 8.0",
    ],
    leds: [],
  },
} satisfies GuideContent;
