import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "pico-reaction-game",
  status: "unverified",
  platform: "raspberry_pi",
  board: "raspberry-pi-pico",
  category: "games",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 8,
  xpReward: 120,
  title: {
    en: "Pico Reaction Duel",
    ru: "Дуэль на реакцию с Pico",
    kk: "Pico-мен реакция жекпе-жегі",
  },
  summary: {
    en: "Two players, two buttons, one light. Wait for the LED and the beep, hit your button first and win the point. Jump the gun and your opponent scores. First to five wins.",
    ru: "Два игрока, две кнопки, один сигнал. Дождитесь светодиода и писка, нажмите первым и заберите очко. Фальстарт отдаёт очко сопернику. Побеждает тот, кто первым наберёт пять.",
    kk: "Екі ойыншы, екі батырма, бір сигнал. Жарық диоды мен дыбысты күтіп, бірінші басыңыз да ұпай алыңыз. Ерте бассаңыз, ұпай қарсыласқа кетеді. Бесті бірінші жинаған жеңеді.",
  },
  parts: [
    { component: "raspberry-pi-pico", qty: 1, spec: { en: "RP2040, 3.3 V logic, MicroPython firmware", ru: "RP2040, логика 3,3 В, прошивка MicroPython", kk: "RP2040, 3,3 В логика, MicroPython микробағдарламасы" }, role: { en: "Game controller", ru: "Контроллер игры", kk: "Ойын контроллері" } },
    { component: "push-button", qty: 2, spec: { en: "6×6 mm tactile, or large 12 mm arcade-style", ru: "тактовые 6×6 мм или большие 12 мм", kk: "6×6 мм тактілі немесе үлкен 12 мм" }, role: { en: "Player 1 and player 2 buttons", ru: "Кнопки игроков 1 и 2", kk: "1 және 2 ойыншылардың батырмалары" } },
    { component: "led", qty: 1, spec: { en: "5 mm, green or white", ru: "5 мм, зелёный или белый", kk: "5 мм, жасыл немесе ақ" }, role: { en: "The GO light", ru: "Сигнал «старт»", kk: "«Старт» сигналы" } },
    { component: "buzzer-passive", qty: 1, spec: { en: "passive piezo buzzer (KY-006 style)", ru: "пассивный пьезоизлучатель (типа KY-006)", kk: "пассивті пьезо сигнал беріш (KY-006 сияқты)" }, role: { en: "GO beep and sound effects", ru: "Писк старта и звуковые эффекты", kk: "Старт дыбысы және дыбыстық әсерлер" } },
    { component: "resistor", qty: 2, spec: { en: "220 Ω (LED) and 100 Ω (buzzer), ¼ W", ru: "220 Ом (светодиод) и 100 Ом (пищалка), ¼ Вт", kk: "220 Ом (жарық диоды) және 100 Ом (сигнал беріш), ¼ Вт" }, role: { en: "Current limiting", ru: "Ограничение тока", kk: "Токты шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "full size, so the players sit at opposite ends", ru: "полноразмерная, чтобы игроки сидели по краям", kk: "толық өлшемді, ойыншылар екі шетте отыруы үшін" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "btn1", component: "push-button", label: "Player 1" },
    { id: "btn2", component: "push-button", label: "Player 2" },
    { id: "r_led", component: "resistor", label: "220 Ω" },
    { id: "led_go", component: "led", label: "GO" },
    { id: "r_bz", component: "resistor", label: "100 Ω" },
    { id: "bz", component: "buzzer-passive", label: "Buzzer" },
  ],
  connections: [
    { from: "board.GP14", to: "btn1.1", color: "blue", note: { en: "pin 19, internal pull-up", ru: "пин 19, внутренняя подтяжка", kk: "19-пин, ішкі тарту" } },
    { from: "btn1.2", to: "board.GND4", color: "black", note: { en: "pin 18", ru: "пин 18", kk: "18-пин" } },
    { from: "board.GP15", to: "btn2.1", color: "purple", note: { en: "pin 20, internal pull-up", ru: "пин 20, внутренняя подтяжка", kk: "20-пин, ішкі тарту" } },
    { from: "btn2.2", to: "board.GND4", color: "black" },
    { from: "board.GP16", to: "r_led.A", color: "green", note: { en: "pin 21", ru: "пин 21", kk: "21-пин" } },
    { from: "r_led.B", to: "led_go.A", color: "green", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led_go.K", to: "board.GND5", color: "black", note: { en: "pin 23", ru: "пин 23", kk: "23-пин" } },
    { from: "board.GP18", to: "r_bz.A", color: "orange", note: { en: "pin 24, PWM tone", ru: "пин 24, ШИМ-тон", kk: "24-пин, ШИМ дыбысы" } },
    { from: "r_bz.B", to: "bz.+", color: "orange" },
    { from: "bz.-", to: "board.GND5", color: "black" },
  ],
  steps: [
    {
      title: { en: "Place the Pico and the buttons", ru: "Установите Pico и кнопки", kk: "Pico мен батырмаларды орнатыңыз" },
      body: {
        en: "Put the Pico in the middle of a full-size breadboard and the two buttons at the far ends, one per player, each straddling the centre gap. Wire one side of button 1 to GP14 (pin 19) and the diagonally opposite leg to GND (pin 18). Do the same for button 2 on GP15 (pin 20). The code turns on the internal pull-ups, so no resistors are needed.",
        ru: "Поставьте Pico в центр полноразмерной макетки, а две кнопки по краям, по одной на игрока, поперёк центральной канавки. Одну сторону кнопки 1 подключите к GP14 (пин 19), ножку по диагонали к GND (пин 18). Так же кнопку 2 к GP15 (пин 20). Код включает внутренние подтяжки, резисторы не нужны.",
        kk: "Pico-ны толық өлшемді макет тақтасының ортасына, ал екі батырманы екі шетке, әр ойыншыға біреуден, орталық ойықтың үстінен қойыңыз. 1-батырманың бір жағын GP14-ке (19-пин), диагональ бойынша қарсы аяғын GND-ге (18-пин) қосыңыз. 2-батырманы да солай GP15-ке (20-пин) жалғаңыз. Код ішкі тартуларды қосады, резистор керек емес.",
      },
      expect: { en: "Each button connects its own GPIO to GND only while pressed.", ru: "Каждая кнопка замыкает свой GPIO на GND только при нажатии.", kk: "Әр батырма өз GPIO-сын тек басылғанда GND-ге тұйықтайды." },
      mistake: { en: "Using two legs on the same side of the button: they are always connected, so that player \"presses\" all the time and loses every round to a false start.", ru: "Две ножки с одной стороны кнопки всегда соединены: игрок будет «нажимать» постоянно и проигрывать каждый раунд из-за фальстарта.", kk: "Батырманың бір жағындағы екі аяқ әрқашан жалғанған: ойыншы үнемі «басып» тұрады да, әр раундта ерте басқаны үшін жеңіледі." },
    },
    {
      title: { en: "Add the GO light", ru: "Добавьте сигнал старта", kk: "Старт сигналын қосыңыз" },
      body: {
        en: "Wire GP16 (pin 21) through the 220 Ω resistor to the LED's long leg (anode), and the short leg to GND (pin 23). At 3.3 V this gives about 6 mA, bright enough and well inside the Pico's 12 mA pin limit.",
        ru: "Подключите GP16 (пин 21) через резистор 220 Ом к длинной ножке светодиода (анод), а короткую ножку к GND (пин 23). При 3,3 В это примерно 6 мА: достаточно ярко и с запасом до предела пина Pico в 12 мА.",
        kk: "GP16-ны (21-пин) 220 Ом резистор арқылы жарық диодының ұзын аяғына (анод), ал қысқа аяғын GND-ге (23-пин) қосыңыз. 3,3 В-та бұл шамамен 6 мА береді: жеткілікті жарық және Pico пинінің 12 мА шегінен әлдеқайда төмен.",
      },
      expect: { en: "The LED sits between the players where both can see it.", ru: "Светодиод стоит между игроками, обоим его видно.", kk: "Жарық диоды ойыншылардың ортасында, екеуіне де көрінеді." },
      mistake: { en: "Leaving out the resistor: the LED draws more current than the pin is rated for.", ru: "Без резистора светодиод берёт больше тока, чем допускает пин.", kk: "Резисторсыз жарық диоды пин көтере алатыннан көп ток алады." },
    },
    {
      title: { en: "Wire the buzzer", ru: "Подключите пищалку", kk: "Сигнал берішті қосыңыз" },
      body: {
        en: "Connect GP18 (pin 24) through the 100 Ω resistor to the buzzer's + pin and the - pin to GND. A passive buzzer has no built-in oscillator: the Pico makes the tone itself with PWM, which is why the code can play different pitches.",
        ru: "Соедините GP18 (пин 24) через резистор 100 Ом с выводом + пищалки, а вывод - с GND. У пассивной пищалки нет встроенного генератора: тон создаёт сам Pico через ШИМ, поэтому код может играть разные ноты.",
        kk: "GP18-ді (24-пин) 100 Ом резистор арқылы сигнал берішінің + шығысына, ал - шығысын GND-ге қосыңыз. Пассивті сигнал берішінің ішкі генераторы жоқ: дыбысты Pico-ның өзі ШИМ арқылы жасайды, сондықтан код әртүрлі ноталарды ойната алады.",
      },
      expect: { en: "The + mark on the buzzer faces the resistor.", ru: "Метка + на пищалке обращена к резистору.", kk: "Сигнал берішіндегі + белгісі резисторға қарайды." },
      mistake: { en: "Using an active buzzer instead: it only knows one tone and clicks strangely when driven with PWM.", ru: "Активная пищалка вместо пассивной знает только один тон и странно щёлкает от ШИМ.", kk: "Пассивтінің орнына белсенді сигнал беріш тек бір дыбысты біледі және ШИМ-нен оғаш шертеді." },
    },
    {
      title: { en: "Upload the game", ru: "Загрузите игру", kk: "Ойынды жүктеңіз" },
      body: {
        en: "Flash MicroPython onto the Pico (hold BOOTSEL, plug in, copy the .uf2). In Thonny paste the code and save it to the Pico as main.py. The LED blinks while it waits; press any button to start the match.",
        ru: "Прошейте MicroPython в Pico (удерживая BOOTSEL, подключите и скопируйте .uf2). В Thonny вставьте код и сохраните его на Pico как main.py. Пока игра ждёт, светодиод мигает; нажмите любую кнопку, чтобы начать матч.",
        kk: "Pico-ға MicroPython жүктеңіз (BOOTSEL-ді басып тұрып қосыңыз да, .uf2 файлын көшіріңіз). Thonny-де кодты қойып, Pico-ға main.py деп сақтаңыз. Ойын күтіп тұрғанда жарық диоды жыпылықтайды; матчты бастау үшін кез келген батырманы басыңыз.",
      },
      expect: { en: "The shell prints \"Reaction duel! First to 5.\" and then \"Round 1 - get ready...\".", ru: "В консоли «Reaction duel! First to 5.», затем «Round 1 - get ready...».", kk: "Консольде «Reaction duel! First to 5.», содан кейін «Round 1 - get ready...» шығады." },
      mistake: { en: "Running it from Thonny but saving it as a different name: after unplugging, nothing happens.", ru: "Запуск из Thonny под другим именем файла: после отключения от компьютера ничего не происходит.", kk: "Thonny-ден басқа атпен сақтап іске қосу: компьютерден ажыратқанда ештеңе болмайды." },
    },
    {
      title: { en: "Play and tune", ru: "Играйте и настраивайте", kk: "Ойнаңыз және баптаңыз" },
      body: {
        en: "Each round waits a random 1.5–5 s, then the LED lights and the buzzer beeps. The first press wins and the reaction time is printed in milliseconds. Pressing before the light gives the point to your opponent. Change WIN_SCORE for longer matches, or the random.randint(1500, 5000) range to make the wait more nerve-racking.",
        ru: "Каждый раунд ждёт случайные 1,5–5 с, затем загорается светодиод и звучит писк. Первое нажатие побеждает, время реакции печатается в миллисекундах. Нажатие до сигнала отдаёт очко сопернику. Измените WIN_SCORE для длинных матчей или диапазон random.randint(1500, 5000), чтобы ожидание было напряжённее.",
        kk: "Әр раунд кездейсоқ 1,5–5 с күтеді, содан кейін жарық диоды жанып, дыбыс шығады. Бірінші басқан жеңеді, реакция уақыты миллисекундпен шығарылады. Сигналға дейін басу ұпайды қарсыласқа береді. Ұзағырақ матч үшін WIN_SCORE-ды немесе күтуді қызықтырақ ету үшін random.randint(1500, 5000) ауқымын өзгертіңіз.",
      },
      expect: { en: "Typical reaction times are 180–300 ms; the winner of the match gets a short victory melody.", ru: "Обычное время реакции 180–300 мс; победитель матча слышит короткую мелодию.", kk: "Әдеттегі реакция уақыты 180–300 мс; матч жеңімпазы қысқа жеңіс әуенін естиді." },
      mistake: { en: "Holding a button down between rounds: the next round only starts after both buttons are released.", ru: "Удерживать кнопку между раундами: следующий раунд начнётся только когда обе кнопки отпущены.", kk: "Раундтар арасында батырманы басып тұру: келесі раунд екі батырма да жіберілгенде ғана басталады." },
    },
  ],
  code: [{
    filename: "main.py",
    language: "python",
    libraries: [],
    source: `# Pico reaction duel (MicroPython)
# Pins: GP14 = player 1 button, GP15 = player 2 button, GP16 = GO LED, GP18 = passive buzzer
from machine import Pin, PWM
import random
import time

BTN1_PIN = 14
BTN2_PIN = 15
LED_PIN = 16
BUZZER_PIN = 18
WIN_SCORE = 5

btn1 = Pin(BTN1_PIN, Pin.IN, Pin.PULL_UP)   # pressed = 0
btn2 = Pin(BTN2_PIN, Pin.IN, Pin.PULL_UP)
led = Pin(LED_PIN, Pin.OUT)
buzzer = PWM(Pin(BUZZER_PIN))
buzzer.duty_u16(0)


def pressed(btn):
    return btn.value() == 0


def tone_on(freq):
    buzzer.freq(freq)
    buzzer.duty_u16(32768)


def tone_off():
    buzzer.duty_u16(0)


def beep(freq, ms):
    tone_on(freq)
    time.sleep_ms(ms)
    tone_off()


def wait_release():
    while pressed(btn1) or pressed(btn2):
        time.sleep_ms(10)
    time.sleep_ms(30)   # let the contacts settle


def play_round(n, scores):
    print("Round", n, "- get ready...")
    led.value(0)
    wait_release()
    wait_ms = random.randint(1500, 5000)
    start = time.ticks_ms()
    while time.ticks_diff(time.ticks_ms(), start) < wait_ms:
        p1, p2 = pressed(btn1), pressed(btn2)
        if p1 and p2:
            print("Both jumped the gun, no point")
            beep(200, 400)
            return
        if p1 or p2:
            cheat = 1 if p1 else 2
            scores[2 - cheat] += 1          # point to the other player
            print("False start by P%d! Score %d:%d" % (cheat, scores[0], scores[1]))
            beep(200, 400)
            return
        time.sleep_ms(1)

    # GO: light + beep, then time the first press
    led.value(1)
    tone_on(2000)
    go = time.ticks_us()
    sounding = True
    while True:
        elapsed = time.ticks_diff(time.ticks_us(), go)
        if sounding and elapsed > 120000:
            tone_off()
            sounding = False
        p1, p2 = pressed(btn1), pressed(btn2)
        if p1 or p2:
            break
        if elapsed > 3000000:
            tone_off()
            led.value(0)
            print("Too slow, nobody scores")
            return
    tone_off()
    led.value(0)
    ms = elapsed // 1000
    if p1 and p2:
        print("Dead heat at %d ms, no point" % ms)
        return
    winner = 1 if p1 else 2
    scores[winner - 1] += 1
    print("P%d wins in %d ms | score %d:%d" % (winner, ms, scores[0], scores[1]))
    beep(1200 if winner == 1 else 1600, 150)


def victory():
    for f in (523, 659, 784, 1047):
        beep(f, 150)
        time.sleep_ms(30)


while True:
    scores = [0, 0]
    print("Reaction duel! First to %d. Press any button to start." % WIN_SCORE)
    while not (pressed(btn1) or pressed(btn2)):
        led.value(not led.value())
        time.sleep_ms(250)
    led.value(0)
    wait_release()
    n = 1
    while max(scores) < WIN_SCORE:
        play_round(n, scores)
        n += 1
        time.sleep_ms(1500)
    champ = 1 if scores[0] > scores[1] else 2
    print("PLAYER %d WINS THE MATCH %d:%d" % (champ, scores[0], scores[1]))
    victory()
    time.sleep(2)
`,
  }],
  troubleshooting: [
    {
      symptom: { en: "One player gets a false start every round", ru: "Один игрок получает фальстарт каждый раунд", kk: "Бір ойыншы әр раундта ерте басады" },
      cause: { en: "That button is wired across two legs that are always connected, or its wire touches GND.", ru: "Кнопка подключена к двум всегда соединённым ножкам, или её провод касается GND.", kk: "Батырма әрқашан жалғанған екі аяққа қосылған немесе оның сымы GND-ге тиіп тұр." },
      fix: { en: "Move one wire to the diagonally opposite leg so the button only closes when pressed.", ru: "Перенесите один провод на ножку по диагонали, чтобы кнопка замыкалась только при нажатии.", kk: "Батырма тек басқанда тұйықталуы үшін бір сымды диагональ бойынша қарсы аяққа ауыстырыңыз." },
    },
    {
      symptom: { en: "No sound, but the LED works", ru: "Звука нет, а светодиод работает", kk: "Дыбыс жоқ, бірақ жарық диоды жұмыс істейді" },
      cause: { en: "The buzzer is reversed, it is an active buzzer, or the wire is not on GP18.", ru: "Пищалка перевёрнута, это активная пищалка, или провод не на GP18.", kk: "Сигнал беріш кері қойылған, ол белсенді сигнал беріш немесе сым GP18-де емес." },
      fix: { en: "Check the + mark faces the resistor, use a passive buzzer and confirm the wire is on pin 24 (GP18).", ru: "Проверьте, что + обращён к резистору, используйте пассивную пищалку и убедитесь, что провод на пине 24 (GP18).", kk: "+ белгісі резисторға қарағанын тексеріп, пассивті сигнал берішті қолданыңыз және сым 24-пинде (GP18) екеніне көз жеткізіңіз." },
    },
    {
      symptom: { en: "Nothing happens when the Pico runs from a power bank", ru: "При питании от пауэрбанка ничего не происходит", kk: "Pico қуат банкінен қоректенгенде ештеңе болмайды" },
      cause: { en: "The code was not saved on the Pico as main.py, so it only ran while Thonny was connected.", ru: "Код не сохранён на Pico как main.py и работал только с подключённым Thonny.", kk: "Код Pico-ға main.py деп сақталмаған, сондықтан ол тек Thonny қосулы кезде жұмыс істеді." },
      fix: { en: "In Thonny use File → Save as → Raspberry Pi Pico and name it main.py.", ru: "В Thonny выберите File → Save as → Raspberry Pi Pico и назовите файл main.py.", kk: "Thonny-де File → Save as → Raspberry Pi Pico таңдап, файлды main.py деп атаңыз." },
    },
  ],
  safety: [
    { en: "Never connect the LED or the buzzer to a GPIO without its series resistor.", ru: "Не подключайте светодиод или пищалку к GPIO без последовательного резистора.", kk: "Жарық диодын немесе сигнал берішті GPIO-ға тізбекті резисторсыз қоспаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Reaction duel! First to 5. Press any button to start.",
      "Round 1 - get ready...",
      "P1 wins in 231 ms | score 1:0",
      "Round 2 - get ready...",
      "False start by P1! Score 1:1",
      "Round 3 - get ready...",
      "P2 wins in 204 ms | score 1:2",
      "Round 4 - get ready...",
      "P1 wins in 198 ms | score 2:2",
      "Round 5 - get ready...",
      "Too slow, nobody scores",
    ],
    leds: [{ label: "GO", color: "#43A047" }],
  },
} satisfies GuideContent;
