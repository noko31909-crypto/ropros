import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pi5-reaction-duel",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-5",
  category: "games",
  robotics: false,
  difficulty: "beginner",
  hours: 1,
  costUsd: 74,
  xpReward: 120,
  title: {
    en: "Two-Player Reaction Duel on Raspberry Pi 5",
    ru: "Дуэль на реакцию для двоих на Raspberry Pi 5",
    kk: "Raspberry Pi 5-тегі екі ойыншыға арналған реакция жекпе-жегі",
  },
  summary: {
    en: "An LED lights after a random wait and two players race to press their button first. The Pi 5 times each round to the millisecond, punishes false starts and keeps the score over five rounds.",
    ru: "Светодиод загорается после случайной паузы, и два игрока соревнуются, кто первым нажмёт свою кнопку. Pi 5 засекает каждый раунд с точностью до миллисекунды, наказывает фальстарты и ведёт счёт на пять раундов.",
    kk: "Жарық диоды кездейсоқ күтуден кейін жанады, ал екі ойыншы өз батырмасын бірінші басуға жарысады. Pi 5 әр раундты миллисекундқа дейін өлшейді, ерте басқанды жазалайды және бес раундтың есебін жүргізеді.",
  },
  parts: [
    { component: "raspberry-pi-5", qty: 1, spec: { en: "any RAM size, Raspberry Pi OS Bookworm, 27 W (5.1 V 5 A) USB-C supply", ru: "любой объём RAM, Raspberry Pi OS Bookworm, блок питания USB-C 27 Вт (5,1 В 5 А)", kk: "кез келген RAM көлемі, Raspberry Pi OS Bookworm, 27 Вт (5,1 В 5 А) USB-C қуат блогы" }, role: { en: "Game controller and timer", ru: "Контроллер игры и таймер", kk: "Ойын контроллері және таймер" } },
    { component: "led", qty: 1, spec: { en: "5 mm, any colour", ru: "5 мм, любой цвет", kk: "5 мм, кез келген түс" }, role: { en: "The go signal", ru: "Сигнал «жми»", kk: "«Бас» белгісі" } },
    { component: "resistor", qty: 1, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit (~5 mA at 3.3 V)", ru: "Ограничение тока светодиода (~5 мА при 3,3 В)", kk: "Жарық диодының тогын шектеу (3,3 В-та ~5 мА)" } },
    { component: "push-button", qty: 2, spec: { en: "6×6 mm tactile, or two big arcade buttons", ru: "тактовые 6×6 мм или две большие аркадные", kk: "6×6 мм тактілі немесе екі үлкен аркадалық" }, role: { en: "One button per player", ru: "По кнопке на игрока", kk: "Әр ойыншыға бір батырма" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 8, spec: { en: "female-male", ru: "мама-папа", kk: "аналық-аталық" }, role: { en: "Pi header to breadboard", ru: "От разъёма Pi к макетке", kk: "Pi ағытпасынан макет тақтасына" } },
  ],
  instances: [
    { id: "r1", component: "resistor", label: "220 Ω" },
    { id: "led1", component: "led", label: "Go" },
    { id: "btn_left", component: "push-button", label: "Left" },
    { id: "btn_right", component: "push-button", label: "Right" },
  ],
  connections: [
    { from: "board.GPIO17", to: "r1.A", color: "orange", note: { en: "pin 11", ru: "пин 11", kk: "11-пин" } },
    { from: "r1.B", to: "led1.A", color: "orange", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led1.K", to: "board.GND2", color: "black", note: { en: "pin 9", ru: "пин 9", kk: "9-пин" } },
    { from: "board.GPIO23", to: "btn_left.1", color: "blue", note: { en: "pin 16, internal pull-up", ru: "пин 16, внутренняя подтяжка", kk: "16-пин, ішкі тарту" } },
    { from: "btn_left.2", to: "board.GND3", color: "black", note: { en: "pin 14", ru: "пин 14", kk: "14-пин" } },
    { from: "board.GPIO24", to: "btn_right.1", color: "green", note: { en: "pin 18, internal pull-up", ru: "пин 18, внутренняя подтяжка", kk: "18-пин, ішкі тарту" } },
    { from: "btn_right.2", to: "board.GND4", color: "black", note: { en: "pin 20", ru: "пин 20", kk: "20-пин" } },
  ],
  steps: [
    {
      title: { en: "Get the Pi 5 ready", ru: "Подготовьте Pi 5", kk: "Pi 5-ті дайындаңыз" },
      body: {
        en: "Use Raspberry Pi OS Bookworm on a 27 W USB-C supply. gpiozero is already on the desktop image (on Lite: sudo apt install python3-gpiozero). On the Pi 5 the header is driven by the RP1 chip, so tutorials built on RPi.GPIO fail there; gpiozero reaches it through lgpio and works unchanged.",
        ru: "Используйте Raspberry Pi OS Bookworm и блок питания USB-C на 27 Вт. gpiozero уже есть в образе с рабочим столом (в Lite: sudo apt install python3-gpiozero). У Pi 5 разъёмом управляет чип RP1, поэтому уроки на RPi.GPIO там не работают; gpiozero обращается к нему через lgpio и работает без изменений.",
        kk: "Raspberry Pi OS Bookworm мен 27 Вт USB-C қуат блогын қолданыңыз. gpiozero жұмыс үстелі бар бейнеде бұрыннан бар (Lite нұсқасында: sudo apt install python3-gpiozero). Pi 5-те ағытпаны RP1 чипі басқарады, сондықтан RPi.GPIO-ға негізделген сабақтар онда жұмыс істемейді; gpiozero оған lgpio арқылы жетеді және өзгеріссіз жұмыс істейді.",
      },
      expect: { en: "python3 -c \"import gpiozero\" runs without an error.", ru: "python3 -c \"import gpiozero\" выполняется без ошибки.", kk: "python3 -c \"import gpiozero\" қатесіз орындалады." },
      mistake: { en: "Installing RPi.GPIO from pip on a Pi 5: it installs, then refuses to run on this board.", ru: "Ставить RPi.GPIO через pip на Pi 5: он установится, но откажется работать на этой плате.", kk: "Pi 5-ке RPi.GPIO-ны pip арқылы орнату: ол орнатылады, бірақ бұл тақтада жұмыс істеуден бас тартады." },
    },
    {
      title: { en: "Wire the go light", ru: "Подключите сигнальный светодиод", kk: "Белгі жарық диодын қосыңыз" },
      body: {
        en: "With the Pi off, connect GPIO17 (pin 11) to the 220 Ω resistor, the resistor to the LED's long leg, and the short leg to GND (pin 9). Put the LED where both players can see it equally well.",
        ru: "При выключенном Pi соедините GPIO17 (пин 11) с резистором 220 Ом, резистор с длинной ножкой светодиода, а короткую ножку с GND (пин 9). Поставьте светодиод так, чтобы обоим игрокам было одинаково видно.",
        kk: "Pi өшірулі кезде GPIO17-ні (11-пин) 220 Ом резисторға, резисторды жарық диодының ұзын аяғына, ал қысқа аяғын GND-ге (9-пин) қосыңыз. Жарық диодын екі ойыншыға бірдей көрінетіндей қойыңыз.",
      },
      expect: { en: "One LED with its resistor between pin 11 and pin 9.", ru: "Светодиод с резистором между пинами 11 и 9.", kk: "11 және 9-пиндер арасында резисторы бар бір жарық диоды." },
      mistake: { en: "Leaving out the resistor: the LED and the GPIO pin are overloaded.", ru: "Обойтись без резистора: светодиод и пин GPIO перегружаются.", kk: "Резисторсыз қосу: жарық диоды мен GPIO пині шамадан тыс жүктеледі." },
    },
    {
      title: { en: "Wire the two buttons", ru: "Подключите две кнопки", kk: "Екі батырманы қосыңыз" },
      body: {
        en: "Put each button across the centre gap. Left player: one leg to GPIO23 (pin 16), the diagonally opposite leg to GND (pin 14). Right player: GPIO24 (pin 18) and GND (pin 20). gpiozero switches on the internal pull-ups, so no resistors are needed.",
        ru: "Каждую кнопку поставьте поперёк центральной канавки. Левый игрок: одна ножка на GPIO23 (пин 16), ножка по диагонали на GND (пин 14). Правый игрок: GPIO24 (пин 18) и GND (пин 20). gpiozero включает внутренние подтяжки, так что резисторы не нужны.",
        kk: "Әр батырманы орталық ойықтың үстінен қойыңыз. Сол жақ ойыншы: бір аяғы GPIO23-ке (16-пин), диагональ бойынша қарсы аяғы GND-ге (14-пин). Оң жақ ойыншы: GPIO24 (18-пин) және GND (20-пин). gpiozero ішкі тартқыштарды қосады, сондықтан резисторлар керек емес.",
      },
      expect: { en: "Two buttons, each between its own GPIO pin and a ground pin.", ru: "Две кнопки, каждая между своим пином GPIO и землёй.", kk: "Екі батырма, әрқайсысы өз GPIO пині мен жер арасында." },
      mistake: { en: "Using two legs on the same side of a tactile button: they are always connected, so that player \"presses\" all the time.", ru: "Взять две ножки с одной стороны тактовой кнопки: они всегда соединены, и игрок будто жмёт без перерыва.", kk: "Тактілі батырманың бір жағындағы екі аяқты алу: олар әрқашан жалғанған, сондықтан ойыншы үздіксіз басып тұрғандай болады." },
    },
    {
      title: { en: "Play a duel", ru: "Сыграйте дуэль", kk: "Жекпе-жек ойнаңыз" },
      body: {
        en: "Save reaction_duel.py and run python3 reaction_duel.py. Each round the LED lights after 2 to 5 seconds; the first player to press wins and the terminal shows their time. Pressing before the light is a false start and the point goes to the other player. After five rounds the script prints the score.",
        ru: "Сохраните reaction_duel.py и выполните python3 reaction_duel.py. В каждом раунде светодиод загорается через 2–5 секунд; кто нажал первым, тот выиграл, и терминал показывает его время. Нажатие до сигнала считается фальстартом, и очко уходит сопернику. После пяти раундов скрипт печатает счёт.",
        kk: "reaction_duel.py файлын сақтап, python3 reaction_duel.py орындаңыз. Әр раундта жарық диоды 2–5 секундтан кейін жанады; бірінші басқан ойыншы жеңеді, ал терминал оның уақытын көрсетеді. Белгіден бұрын басу ерте бастау болып саналады, ұпай қарсыласқа беріледі. Бес раундтан кейін скрипт есепті шығарады.",
      },
      expect: { en: "Reaction times around 180–300 ms for most people, and a final score line.", ru: "Время реакции у большинства около 180–300 мс и итоговая строка со счётом.", kk: "Көпшілікте реакция уақыты шамамен 180–300 мс және соңғы есеп жолы." },
      mistake: { en: "Resting a finger on the button: the slightest press before the light counts as a false start.", ru: "Держать палец на кнопке: малейшее нажатие до сигнала засчитывается как фальстарт.", kk: "Саусақты батырмада ұстау: белгіге дейінгі ең кішкентай басу ерте бастау болып саналады." },
    },
    {
      title: { en: "Change the rules", ru: "Измените правила", kk: "Ережелерді өзгертіңіз" },
      body: {
        en: "Set ROUNDS for a longer match, or widen the random wait in play_round so nobody can guess the rhythm. The times use time.monotonic(), which never jumps when the clock syncs, so a round is never measured wrong.",
        ru: "Задайте ROUNDS для длинного матча или расширьте случайную паузу в play_round, чтобы никто не угадал ритм. Время считается через time.monotonic(), который не прыгает при синхронизации часов, поэтому раунд никогда не измеряется неверно.",
        kk: "Ұзақ ойын үшін ROUNDS мәнін орнатыңыз немесе ешкім ырғақты болжай алмайтындай play_round-тағы кездейсоқ күтуді кеңейтіңіз. Уақыт сағат синхрондалғанда секірмейтін time.monotonic() арқылы есептеледі, сондықтан раунд ешқашан қате өлшенбейді.",
      },
      expect: { en: "The game follows your settings on the next run.", ru: "При следующем запуске игра идёт по вашим настройкам.", kk: "Келесі іске қосқанда ойын сіздің баптауларыңыз бойынша жүреді." },
      mistake: { en: "Making the wait fixed: players learn the rhythm and start pressing early on purpose.", ru: "Сделать паузу постоянной: игроки выучат ритм и начнут жать заранее.", kk: "Күтуді тұрақты ету: ойыншылар ырғақты үйреніп, алдын ала баса бастайды." },
    },
  ],
  code: [{
    filename: "reaction_duel.py",
    language: "python",
    libraries: ["gpiozero"],
    source: `#!/usr/bin/env python3
"""Reaction duel on a Raspberry Pi 5: the LED lights after a random wait, the first button pressed wins."""
import random
import sys
from functools import partial
from signal import SIGTERM, signal
from threading import Event, Lock
from time import monotonic, sleep

from gpiozero import LED, Button

LED_PIN = 17      # physical pin 11
LEFT_PIN = 23     # physical pin 16, other leg to GND (pin 14)
RIGHT_PIN = 24    # physical pin 18, other leg to GND (pin 20)
PLAYER_PINS = {"LEFT": LEFT_PIN, "RIGHT": RIGHT_PIN}
ROUNDS = 5

led = LED(LED_PIN)
buttons = {name: Button(pin, bounce_time=0.02) for name, pin in PLAYER_PINS.items()}
lock = Lock()
state = {"armed": False, "lit_at": 0.0, "winner": None, "early": None}
done = Event()


def pressed(name):
    """Runs in gpiozero's callback thread: record the first press of the round only."""
    with lock:
        if not state["armed"] or state["winner"] or state["early"]:
            return
        if state["lit_at"] == 0.0:
            state["early"] = name                     # pressed before the light
        else:
            state["winner"] = (name, monotonic() - state["lit_at"])
        done.set()


def play_round(number, scores):
    with lock:
        state.update(armed=True, lit_at=0.0, winner=None, early=None)
    done.clear()
    print(f"round {number}: get ready...", flush=True)
    if not done.wait(random.uniform(2.0, 5.0)):       # nobody jumped the start
        with lock:
            state["lit_at"] = monotonic()
        led.on()
        done.wait(3.0)
    led.off()
    with lock:
        state["armed"] = False
        winner, early = state["winner"], state["early"]
    if early:
        other = "RIGHT" if early == "LEFT" else "LEFT"
        scores[other] += 1
        print(f"{early} jumped the start, point to {other}", flush=True)
    elif winner:
        name, seconds = winner
        scores[name] += 1
        print(f"{name} wins in {seconds * 1000:.0f} ms", flush=True)
    else:
        print("nobody pressed", flush=True)


def main():
    signal(SIGTERM, lambda *_: sys.exit(0))
    for name, button in buttons.items():
        button.when_pressed = partial(pressed, name)
    scores = {"LEFT": 0, "RIGHT": 0}
    print("reaction duel: press your button as soon as the LED lights", flush=True)
    try:
        for number in range(1, ROUNDS + 1):
            play_round(number, scores)
            sleep(1.5)
        print(f"final score  LEFT {scores['LEFT']} : {scores['RIGHT']} RIGHT", flush=True)
    except KeyboardInterrupt:
        pass
    finally:
        led.off()


if __name__ == "__main__":
    main()
`,
  }],
  troubleshooting: [
    {
      symptom: { en: "One player's presses never count", ru: "Нажатия одного игрока не засчитываются", kk: "Бір ойыншының басуы есептелмейді" },
      cause: { en: "Its GPIO wire is on the wrong header pin, or the wires sit in other breadboard rows than the button's legs.", ru: "Провод GPIO стоит не на том пине или провода в других рядах макетки, чем ножки кнопки.", kk: "GPIO сымы басқа пинде тұр немесе сымдар батырма аяқтарынан басқа қатарларда." },
      fix: { en: "Check pins 16 and 14 for the left player and 18 and 20 for the right, and that each wire shares a row with a button leg.", ru: "Проверьте пины 16 и 14 у левого игрока и 18 и 20 у правого, а также что каждый провод в одном ряду с ножкой кнопки.", kk: "Сол жақ ойыншыда 16 және 14, оң жақта 18 және 20-пиндерді, әр сымның батырма аяғымен бір қатарда екенін тексеріңіз." },
    },
    {
      symptom: { en: "Every round is a false start for the same player", ru: "Каждый раунд у одного и того же игрока фальстарт", kk: "Әр раундта бір ойыншыда ерте бастау" },
      cause: { en: "That button reads as pressed all the time: its two wired legs are on the same side of the switch.", ru: "Эта кнопка всё время считается нажатой: обе ножки с проводами на одной стороне кнопки.", kk: "Бұл батырма үнемі басылған болып оқылады: сымды екі аяғы батырманың бір жағында." },
      fix: { en: "Turn the button 90° or move one wire to the diagonally opposite leg.", ru: "Поверните кнопку на 90° или переставьте один провод на ножку по диагонали.", kk: "Батырманы 90° бұрыңыз немесе бір сымды диагональ бойынша қарсы аяққа ауыстырыңыз." },
    },
    {
      symptom: { en: "\"GPIO busy\" when the game starts", ru: "«GPIO busy» при запуске игры", kk: "Ойын басталғанда «GPIO busy»" },
      cause: { en: "An earlier copy of the script is still running and holds the pins.", ru: "Предыдущая копия скрипта ещё работает и держит пины.", kk: "Скрипттің алдыңғы көшірмесі әлі жұмыс істеп, пиндерді ұстап тұр." },
      fix: { en: "Stop it with pkill -f reaction_duel.py and start again.", ru: "Остановите её командой pkill -f reaction_duel.py и запустите снова.", kk: "Оны pkill -f reaction_duel.py пәрменімен тоқтатып, қайта іске қосыңыз." },
    },
  ],
  safety: [
    { en: "Wire with the Pi powered off and connect the buttons to GND only, never to 5V: the Pi 5's GPIO is 3.3 V only.", ru: "Собирайте схему при выключенном Pi и подключайте кнопки только к GND, никогда к 5V: GPIO у Pi 5 рассчитаны только на 3,3 В.", kk: "Схеманы Pi өшірулі кезде жинаңыз және батырмаларды тек GND-ге қосыңыз, ешқашан 5V-қа емес: Pi 5-тің GPIO-сы тек 3,3 В-қа арналған." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "reaction duel: press your button as soon as the LED lights",
      "round 1: get ready...",
      "LEFT wins in 243 ms",
      "round 2: get ready...",
      "RIGHT jumped the start, point to LEFT",
      "round 3: get ready...",
      "RIGHT wins in 198 ms",
      "round 4: get ready...",
      "LEFT wins in 221 ms",
      "round 5: get ready...",
      "nobody pressed",
      "final score  LEFT 3 : 1 RIGHT",
    ],
    leds: [{ label: "GO", color: "#FF7A1A" }],
  },
} satisfies GuideContent;
