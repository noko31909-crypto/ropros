import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "snake-game-led-matrix",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "games",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 11,
  xpReward: 200,
  title: {
    en: "Snake on an 8×8 LED Matrix",
    ru: "Змейка на светодиодной матрице 8×8",
    kk: "8×8 жарық диодты матрицадағы «Жылан» ойыны",
  },
  summary: {
    en: "The classic Snake on a MAX7219 8×8 matrix, steered with an analog joystick. Every apple makes the snake longer and faster, and the score is printed to the Serial Monitor.",
    ru: "Классическая «Змейка» на матрице 8×8 с MAX7219, управление аналоговым джойстиком. Каждое яблоко делает змейку длиннее и быстрее, а счёт выводится в Serial Monitor.",
    kk: "MAX7219 басқаратын 8×8 матрицадағы классикалық «Жылан», аналогтық джойстикпен басқарылады. Әр алма жыланды ұзартып, жылдамдатады, ал ұпай Serial Monitor-ға шығады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Game logic", ru: "Логика игры", kk: "Ойын логикасы" } },
    { component: "max7219-matrix", qty: 1, spec: { en: "single 8×8 module with MAX7219", ru: "одиночный модуль 8×8 с MAX7219", kk: "MAX7219 бар жалғыз 8×8 модуль" }, role: { en: "Game screen", ru: "Игровой экран", kk: "Ойын экраны" } },
    { component: "joystick", qty: 1, spec: { en: "KY-023, two axes + push switch", ru: "KY-023, две оси + кнопка", kk: "KY-023, екі ось + батырма" }, role: { en: "Steering and start button", ru: "Управление и кнопка старта", kk: "Басқару және бастау батырмасы" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Power rails", ru: "Шины питания", kk: "Қуат шиналары" } },
    { component: "jumper-wires", qty: 12, spec: { en: "male-female and male-male", ru: "папа-мама и папа-папа", kk: "аталық-аналық және аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "mx", component: "max7219-matrix", label: "8×8 matrix" },
    { id: "joy", component: "joystick", label: "Joystick" },
  ],
  connections: [
    { from: "board.5V", to: "mx.VCC", color: "red" },
    { from: "mx.GND", to: "board.GND", color: "black" },
    { from: "board.D11", to: "mx.DIN", color: "orange", note: { en: "data in (input side of the module)", ru: "вход данных (входная сторона модуля)", kk: "деректер кірісі (модульдің кіріс жағы)" } },
    { from: "board.D13", to: "mx.CLK", color: "yellow" },
    { from: "board.D10", to: "mx.CS", color: "green", note: { en: "labelled LOAD on some modules", ru: "на некоторых модулях подписан LOAD", kk: "кейбір модульдерде LOAD деп жазылған" } },
    { from: "board.5V", to: "joy.+5V", color: "red" },
    { from: "joy.GND", to: "board.GND2", color: "black" },
    { from: "joy.VRx", to: "board.A0", color: "blue" },
    { from: "joy.VRy", to: "board.A1", color: "purple" },
    { from: "joy.SW", to: "board.D2", color: "white", note: { en: "internal pull-up, pressed = LOW", ru: "внутренняя подтяжка, нажата = LOW", kk: "ішкі тарту, басылғанда LOW" } },
  ],
  steps: [
    {
      title: { en: "Connect the LED matrix", ru: "Подключите светодиодную матрицу", kk: "Жарық диодты матрицаны қосыңыз" },
      body: {
        en: "Use the five pins on the input side of the module (the side where DIN is, not DOUT). Wire VCC to 5V, GND to GND, DIN to D11, CLK to D13 and CS (sometimes LOAD) to D10. These are the Uno's SPI pins, which keeps the wiring tidy, although the LedControl library drives them in software.",
        ru: "Используйте пять выводов на входной стороне модуля (там, где DIN, а не DOUT). Подключите VCC к 5V, GND к GND, DIN к D11, CLK к D13 и CS (иногда LOAD) к D10. Это SPI-пины Uno: так проводка аккуратнее, хотя библиотека LedControl управляет ими программно.",
        kk: "Модульдің кіріс жағындағы бес шықпаны пайдаланыңыз (DOUT емес, DIN тұрған жақ). VCC-ні 5V-ке, GND-ні GND-ге, DIN-ді D11-ге, CLK-ты D13-ке, CS-ті (кейде LOAD) D10-ға қосыңыз. Бұл Uno-ның SPI пиндері: сымдар ұқыпты болады, бірақ LedControl кітапханасы оларды бағдарламалық түрде басқарады.",
      },
      expect: { en: "Five female-male jumpers from the matrix to the Uno.", ru: "Пять проводов мама-папа от матрицы к Uno.", kk: "Матрицадан Uno-ға бес аналық-аталық сым." },
      mistake: { en: "Wiring the DOUT side by mistake leaves the matrix dark: the chip only listens on DIN.", ru: "Если по ошибке подключить сторону DOUT, матрица останется тёмной: микросхема слушает только DIN.", kk: "Қателесіп DOUT жағын қоссаңыз, матрица сөніп тұрады: микросхема тек DIN-ді тыңдайды." },
    },
    {
      title: { en: "Connect the joystick", ru: "Подключите джойстик", kk: "Джойстикті қосыңыз" },
      body: {
        en: "Wire the joystick +5V to 5V and GND to GND (use the breadboard rail if you run out of 5V pins). VRx goes to A0, VRy to A1 and SW to D2. The SW contact pulls D2 to GND when you press the stick down; the sketch enables the internal pull-up so it reads HIGH otherwise.",
        ru: "Подключите +5V джойстика к 5V и GND к GND (если не хватает пинов 5V, используйте шину макетки). VRx идёт на A0, VRy на A1, SW на D2. Контакт SW замыкает D2 на GND, когда вы нажимаете на ручку; скетч включает внутреннюю подтяжку, поэтому в остальное время пин читает HIGH.",
        kk: "Джойстиктің +5V-ін 5V-ке, GND-ін GND-ге қосыңыз (5V пиндері жетпесе, макет тақтасының шинасын пайдаланыңыз). VRx A0-ге, VRy A1-ге, SW D2-ге барады. Тұтқаны басқанда SW түйіспесі D2-ні GND-ге қосады; скетч ішкі тартуды қосады, сондықтан қалған уақытта пин HIGH оқиды.",
      },
      expect: { en: "Both modules share the 5V and GND rails.", ru: "Оба модуля сидят на общих шинах 5V и GND.", kk: "Екі модуль де ортақ 5V және GND шиналарына қосылған." },
      mistake: { en: "Swapping VRx and VRy makes the snake turn the wrong way; fix it in software with SWAP_XY.", ru: "Если перепутать VRx и VRy, змейка будет поворачивать не туда; это исправляется в скетче через SWAP_XY.", kk: "VRx пен VRy-ды шатастырсаңыз, жылан басқа жаққа бұрылады; оны скетчте SWAP_XY арқылы түзетуге болады." },
    },
    {
      title: { en: "Install LedControl and upload", ru: "Установите LedControl и загрузите скетч", kk: "LedControl орнатып, скетчті жүктеңіз" },
      body: {
        en: "Install the LedControl library (Eberhard Fahle) from the Library Manager and upload the sketch. Open the Serial Monitor at 9600 baud. The matrix shows a short snake at rest and the monitor says \"Press the joystick to start\". The brightness is set to 4 of 15 to keep the current low and the display readable.",
        ru: "Установите библиотеку LedControl (Eberhard Fahle) через менеджер библиотек и загрузите скетч. Откройте Serial Monitor на 9600 бод. На матрице видна короткая неподвижная змейка, а в мониторе «Press the joystick to start». Яркость выставлена на 4 из 15, чтобы ток был небольшим, а картинка хорошо читалась.",
        kk: "Кітапханалар менеджерінен LedControl (Eberhard Fahle) кітапханасын орнатып, скетчті жүктеңіз. Serial Monitor-ды 9600 бодта ашыңыз. Матрицада қысқа қозғалмайтын жылан көрінеді, ал мониторда «Press the joystick to start» шығады. Ток аз әрі сурет анық болуы үшін жарықтық 15-тің 4-іне қойылған.",
      },
      expect: { en: "A three-dot snake glows in the middle row.", ru: "В среднем ряду светится змейка из трёх точек.", kk: "Ортаңғы қатарда үш нүктелі жылан жанып тұр." },
      mistake: { en: "Installing a different MAX7219 library (MD_MAX72XX) gives \"LedControl.h: No such file\".", ru: "Если установить другую библиотеку (MD_MAX72XX), будет ошибка «LedControl.h: No such file».", kk: "Басқа кітапхананы (MD_MAX72XX) орнатсаңыз, «LedControl.h: No such file» қатесі шығады." },
    },
    {
      title: { en: "Play and tune the controls", ru: "Играйте и настройте управление", kk: "Ойнап, басқаруды баптаңыз" },
      body: {
        en: "Press the stick to start. Push it to steer; the snake wraps around the edges, so only biting your own tail ends the game. Each blinking apple adds one segment, one point and makes a step 20 ms shorter (from 400 ms down to 120 ms). If up and down or left and right are reversed, set INVERT_X, INVERT_Y or SWAP_XY at the top of the sketch to match how your matrix and joystick are oriented.",
        ru: "Нажмите на ручку, чтобы начать. Отклоняйте её, чтобы рулить; змейка проходит сквозь края, поэтому игра заканчивается, только если укусить себя за хвост. Каждое мигающее яблоко добавляет сегмент, очко и сокращает шаг на 20 мс (с 400 мс до 120 мс). Если верх и низ или лево и право перепутаны, задайте INVERT_X, INVERT_Y или SWAP_XY в начале скетча под ориентацию вашей матрицы и джойстика.",
        kk: "Бастау үшін тұтқаны басыңыз. Басқару үшін оны еңкейтіңіз; жылан шеттерден өтіп кетеді, сондықтан ойын тек өз құйрығын тістегенде ғана аяқталады. Әр жыпылықтаған алма бір бөлік, бір ұпай қосады және қадамды 20 мс-қа қысқартады (400 мс-тан 120 мс-қа дейін). Жоғары мен төмен немесе сол мен оң ауысып кетсе, матрица мен джойстиктің бағытына қарай скетч басындағы INVERT_X, INVERT_Y немесе SWAP_XY мәнін өзгертіңіз.",
      },
      expect: { en: "The Serial Monitor prints \"Score: 1  step: 380 ms\" for each apple and the final score at game over.", ru: "Serial Monitor печатает «Score: 1  step: 380 ms» за каждое яблоко и итоговый счёт в конце игры.", kk: "Serial Monitor әр алма үшін «Score: 1  step: 380 ms», ал ойын соңында қорытынды ұпайды шығарады." },
      mistake: { en: "Pushing straight back against your direction is ignored on purpose, otherwise the snake would bite itself instantly.", ru: "Рывок строго назад намеренно игнорируется, иначе змейка сразу укусила бы себя.", kk: "Тура кері бағытқа бұру әдейі еленбейді, әйтпесе жылан бірден өзін тістеп алар еді." },
    },
  ],
  code: [{
    filename: "snake_matrix.ino",
    language: "cpp",
    libraries: ["LedControl"],
    source: `#include <LedControl.h>

const int DIN_PIN = 11, CLK_PIN = 13, CS_PIN = 10;      // MAX7219 module
const int JOY_X_PIN = A0, JOY_Y_PIN = A1, JOY_SW_PIN = 2;

const bool INVERT_X = false, INVERT_Y = false, SWAP_XY = false;  // match your orientation
const int START_STEP_MS = 400, MIN_STEP_MS = 120, SPEEDUP_MS = 20;

LedControl lc(DIN_PIN, CLK_PIN, CS_PIN, 1);

int8_t snakeX[64], snakeY[64];   // index 0 = head
int snakeLen = 0;
int8_t moveX = 1, moveY = 0, nextX = 1, nextY = 0;
int8_t foodX = 0, foodY = 0;
int score = 0;
int stepMs = START_STEP_MS;
unsigned long lastStep = 0;
bool alive = false;

void draw(bool showFood) {
  byte rows[8] = {0};
  for (int i = 0; i < snakeLen; i++) rows[snakeY[i]] |= (0x80 >> snakeX[i]);
  if (showFood) rows[foodY] |= (0x80 >> foodX);
  for (int r = 0; r < 8; r++) lc.setRow(0, r, rows[r]);
}

void placeFood() {
  while (true) {
    foodX = random(8);
    foodY = random(8);
    bool onSnake = false;
    for (int i = 0; i < snakeLen; i++) {
      if (snakeX[i] == foodX && snakeY[i] == foodY) { onSnake = true; break; }
    }
    if (!onSnake) return;
  }
}

void resetSnake() {
  snakeLen = 3;
  for (int i = 0; i < snakeLen; i++) { snakeX[i] = 3 - i; snakeY[i] = 4; }
  moveX = nextX = 1;
  moveY = nextY = 0;
}

void newGame() {
  resetSnake();
  score = 0;
  stepMs = START_STEP_MS;
  placeFood();
  alive = true;
  lastStep = millis();
  Serial.println(F("New game"));
}

void gameOver() {
  alive = false;
  Serial.print(F("Game over! Score: "));
  Serial.println(score);
  for (int i = 0; i < 3; i++) {
    for (int r = 0; r < 8; r++) lc.setRow(0, r, 0xFF);
    delay(150);
    lc.clearDisplay(0);
    delay(150);
  }
  draw(false);
  Serial.println(F("Press the joystick to play again"));
}

void readJoystick() {
  int x = analogRead(JOY_X_PIN), y = analogRead(JOY_Y_PIN);
  if (SWAP_XY) { int t = x; x = y; y = t; }
  if (INVERT_X) x = 1023 - x;
  if (INVERT_Y) y = 1023 - y;
  // a new direction may not reverse the current one
  if (x < 300 && moveX != 1)       { nextX = -1; nextY = 0; }
  else if (x > 700 && moveX != -1) { nextX = 1;  nextY = 0; }
  else if (y < 300 && moveY != 1)  { nextX = 0;  nextY = -1; }
  else if (y > 700 && moveY != -1) { nextX = 0;  nextY = 1; }
}

void step() {
  moveX = nextX;
  moveY = nextY;
  int8_t hx = (snakeX[0] + moveX + 8) % 8;   // wrap around the edges
  int8_t hy = (snakeY[0] + moveY + 8) % 8;
  bool eating = (hx == foodX && hy == foodY);

  // the tail moves out of the way unless we are growing
  int bodyToCheck = eating ? snakeLen : snakeLen - 1;
  for (int i = 0; i < bodyToCheck; i++) {
    if (snakeX[i] == hx && snakeY[i] == hy) { gameOver(); return; }
  }

  if (eating) snakeLen++;
  for (int i = snakeLen - 1; i > 0; i--) { snakeX[i] = snakeX[i - 1]; snakeY[i] = snakeY[i - 1]; }
  snakeX[0] = hx;
  snakeY[0] = hy;

  if (eating) {
    score++;
    stepMs = max(MIN_STEP_MS, stepMs - SPEEDUP_MS);
    Serial.print(F("Score: "));
    Serial.print(score);
    Serial.print(F("  step: "));
    Serial.print(stepMs);
    Serial.println(F(" ms"));
    if (snakeLen >= 64) {
      Serial.println(F("You filled the board!"));
      gameOver();
      return;
    }
    placeFood();
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(JOY_SW_PIN, INPUT_PULLUP);
  lc.shutdown(0, false);    // wake the MAX7219
  lc.setIntensity(0, 4);    // 0..15
  lc.clearDisplay(0);
  resetSnake();
  draw(false);
  Serial.println(F("Press the joystick to start"));
}

void loop() {
  if (!alive) {
    if (digitalRead(JOY_SW_PIN) == LOW) {
      randomSeed(micros());   // human timing makes every game different
      newGame();
    }
    return;
  }
  readJoystick();
  if (millis() - lastStep >= (unsigned long)stepMs) {
    lastStep = millis();
    step();
  }
  if (alive) draw((millis() / 150) % 2);   // blinking apple
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The matrix stays dark or shows random dots", ru: "Матрица тёмная или показывает случайные точки", kk: "Матрица сөніп тұр немесе кездейсоқ нүктелер көрсетеді" },
      cause: { en: "DIN, CLK and CS are swapped, or the wires go to the DOUT side.", ru: "Перепутаны DIN, CLK и CS, или провода идут на сторону DOUT.", kk: "DIN, CLK және CS ауысып кеткен немесе сымдар DOUT жағына барады." },
      fix: { en: "Check DIN → D11, CLK → D13, CS → D10 on the input side, then press reset.", ru: "Проверьте DIN → D11, CLK → D13, CS → D10 на входной стороне и нажмите сброс.", kk: "Кіріс жағында DIN → D11, CLK → D13, CS → D10 екенін тексеріп, қайта іске қосуды басыңыз." },
    },
    {
      symptom: { en: "The snake moves on its own without touching the stick", ru: "Змейка поворачивает сама, без джойстика", kk: "Жылан джойстиксіз өзі бұрылады" },
      cause: { en: "VRx or VRy is not connected, so the analog pin floats.", ru: "VRx или VRy не подключён, аналоговый пин «висит в воздухе».", kk: "VRx немесе VRy қосылмаған, аналогтық пин қалқып тұр." },
      fix: { en: "Reseat the A0 and A1 wires and make sure the joystick +5V and GND are connected.", ru: "Переподключите провода A0 и A1 и проверьте +5V и GND джойстика.", kk: "A0 және A1 сымдарын қайта қосып, джойстиктің +5V пен GND-ін тексеріңіз." },
    },
    {
      symptom: { en: "Pressing the stick does not start the game", ru: "Нажатие на ручку не запускает игру", kk: "Тұтқаны басқанда ойын басталмайды" },
      cause: { en: "SW is not on D2, or the module's SW contact needs a firmer press.", ru: "SW не на D2, или контакт SW модуля требует более сильного нажатия.", kk: "SW D2-де емес немесе модульдің SW түйіспесі қаттырақ басуды қажет етеді." },
      fix: { en: "Move SW to D2 and press straight down until it clicks.", ru: "Подключите SW к D2 и нажимайте строго вниз до щелчка.", kk: "SW-ді D2-ге қосып, сырт еткенше тура төмен басыңыз." },
    },
  ],
  safety: [
    { en: "Keep the matrix brightness at 8 or below when powered from USB: 64 LEDs at full brightness can draw over 300 mA.", ru: "При питании от USB держите яркость матрицы не выше 8: 64 светодиода на полной яркости могут потреблять более 300 мА.", kk: "USB-ден қоректенгенде матрица жарықтығын 8-ден асырмаңыз: толық жарықтықтағы 64 жарық диоды 300 мА-ден астам ток тұтынуы мүмкін." },
  ],
  simulation: {
    baud: 9600,
    lines: ["Press the joystick to start", "New game", "Score: 1  step: 380 ms", "Score: 2  step: 360 ms", "Score: 3  step: 340 ms", "Score: 4  step: 320 ms", "Game over! Score: 4", "Press the joystick to play again"],
    leds: [],
  },
} satisfies GuideContent;
