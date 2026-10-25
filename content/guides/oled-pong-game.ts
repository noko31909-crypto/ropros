import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "oled-pong-game",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "games",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 12,
  xpReward: 190,
  title: {
    en: "Two-Player Pong on an OLED",
    ru: "Понг для двоих на OLED-дисплее",
    kk: "OLED дисплейдегі екі ойыншыға арналған понг",
  },
  summary: {
    en: "A pocket Pong for two: each player turns a potentiometer to move a paddle on a 128×64 OLED. The ball speeds up on every hit, the buzzer beeps, and the first to 7 points wins.",
    ru: "Карманный понг для двоих: каждый игрок крутит потенциометр, чтобы двигать ракетку на OLED 128×64. Мяч ускоряется после каждого удара, зуммер пищит, побеждает тот, кто первым наберёт 7 очков.",
    kk: "Екі адамға арналған қалталық понг: әр ойыншы 128×64 OLED-тегі ракетканы жылжыту үшін потенциометрді бұрайды. Доп әр соққыдан кейін жылдамдайды, зуммер дыбыс береді, 7 ұпайды бірінші жинаған жеңеді.",
  },
  parts: [
    { component: "arduino-nano", qty: 1, spec: { en: "ATmega328P, 5 V, USB powered", ru: "ATmega328P, 5 В, питание от USB", kk: "ATmega328P, 5 В, USB қуаты" }, role: { en: "Game logic", ru: "Логика игры", kk: "Ойын логикасы" } },
    { component: "oled-ssd1306", qty: 1, spec: { en: "0.96\" 128×64, I²C address 0x3C, 4 pins", ru: "0,96\" 128×64, I²C-адрес 0x3C, 4 вывода", kk: "0,96\" 128×64, I²C мекенжайы 0x3C, 4 шықпа" }, role: { en: "Game screen", ru: "Игровой экран", kk: "Ойын экраны" } },
    { component: "potentiometer", qty: 2, spec: { en: "10 kΩ linear (B10K), with knobs", ru: "10 кОм линейные (B10K), с ручками", kk: "10 кОм сызықтық (B10K), тұтқаларымен" }, role: { en: "Paddle controllers", ru: "Управление ракетками", kk: "Ракеткаларды басқару" } },
    { component: "buzzer-passive", qty: 1, spec: { en: "passive, 12 mm", ru: "пассивный, 12 мм", kk: "пассивті, 12 мм" }, role: { en: "Hit and score sounds", ru: "Звуки ударов и очков", kk: "Соққы мен ұпай дыбыстары" } },
    { component: "resistor", qty: 1, spec: { en: "100 Ω, ¼ W", ru: "100 Ом, ¼ Вт", kk: "100 Ом, ¼ Вт" }, role: { en: "Buzzer current limit", ru: "Ограничение тока зуммера", kk: "Зуммер тогын шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 14, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "oled", component: "oled-ssd1306", label: "OLED 128×64" },
    { id: "pot_l", component: "potentiometer", label: "Left paddle" },
    { id: "pot_r", component: "potentiometer", label: "Right paddle" },
    { id: "r_bz", component: "resistor", label: "100 Ω" },
    { id: "bz", component: "buzzer-passive", label: "Buzzer" },
  ],
  connections: [
    { from: "board.5V", to: "oled.VCC", color: "red", note: { en: "the module has its own 3.3 V regulator", ru: "у модуля свой стабилизатор 3,3 В", kk: "модульдің өз 3,3 В тұрақтандырғышы бар" } },
    { from: "oled.GND", to: "board.GND", color: "black" },
    { from: "board.A4", to: "oled.SDA", color: "blue" },
    { from: "board.A5", to: "oled.SCL", color: "yellow" },
    { from: "board.5V", to: "pot_l.1", color: "red" },
    { from: "pot_l.2", to: "board.GND", color: "black" },
    { from: "pot_l.W", to: "board.A0", color: "green", note: { en: "middle pin = wiper", ru: "средний вывод = движок", kk: "ортаңғы шықпа = жылжымалы түйіспе" } },
    { from: "board.5V", to: "pot_r.1", color: "red" },
    { from: "pot_r.2", to: "board.GND2", color: "black" },
    { from: "pot_r.W", to: "board.A1", color: "purple" },
    { from: "board.D9", to: "r_bz.A", color: "orange" },
    { from: "r_bz.B", to: "bz.+", color: "orange" },
    { from: "bz.-", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Seat the Nano and the power rails", ru: "Установите Nano и шины питания", kk: "Nano мен қуат шиналарын орнатыңыз" },
      body: {
        en: "Press the Nano into the middle of the breadboard so it straddles the centre gap. Run a jumper from the Nano's 5V pin to the red rail and from GND to the blue rail. Everything in this build runs from those two rails.",
        ru: "Вставьте Nano в середину макетки так, чтобы она стояла над центральной канавкой. Соедините пин 5V Nano с красной шиной, а GND с синей. Всё в этом проекте питается от этих двух шин.",
        kk: "Nano-ны макет тақтасының ортасына ортаңғы ойықтың үстінде тұратындай етіп басыңыз. Nano-ның 5V пинін қызыл шинаға, GND-ін көк шинаға қосыңыз. Бұл жобадағы барлық бөлшек осы екі шинадан қоректенеді.",
      },
      expect: { en: "The Nano sits across the gap with each pin in its own row.", ru: "Nano стоит над канавкой, каждый пин в своём ряду.", kk: "Nano ойықтың үстінде тұр, әр пин өз қатарында." },
      mistake: { en: "Pushing the Nano into one side of the board shorts each pin to the pin opposite it.", ru: "Если вставить Nano на одну сторону макетки, каждый пин замкнётся с противоположным.", kk: "Nano-ны тақтаның бір жағына салсаңыз, әр пин қарсы пинімен тұйықталады." },
    },
    {
      title: { en: "Connect the OLED over I²C", ru: "Подключите OLED по I²C", kk: "OLED-ті I²C арқылы қосыңыз" },
      body: {
        en: "Wire OLED VCC to the 5V rail and GND to the GND rail. SDA goes to A4 and SCL to A5: on the Nano these are the hardware I²C pins. Most 4-pin modules have address 0x3C; if yours is printed 0x78 on the back, that is the same address written as 8 bits.",
        ru: "Подключите VCC OLED к шине 5V, GND к шине GND. SDA идёт на A4, SCL на A5: на Nano это аппаратные пины I²C. У большинства 4-выводных модулей адрес 0x3C; если на обороте написано 0x78, это тот же адрес в 8-битной записи.",
        kk: "OLED VCC-ін 5V шинасына, GND-ін GND шинасына қосыңыз. SDA A4-ке, SCL A5-ке барады: Nano-да бұлар аппараттық I²C пиндері. 4 шықпалы модульдердің көбінің мекенжайы 0x3C; артында 0x78 деп жазылса, бұл сол мекенжайдың 8 биттік жазылуы.",
      },
      expect: { en: "Four wires from the OLED: VCC, GND, SDA → A4, SCL → A5.", ru: "Четыре провода от OLED: VCC, GND, SDA → A4, SCL → A5.", kk: "OLED-тен төрт сым: VCC, GND, SDA → A4, SCL → A5." },
      mistake: { en: "Some OLEDs have GND and VCC in the opposite order; follow the labels on your module, not the picture.", ru: "У некоторых OLED выводы GND и VCC стоят в обратном порядке; ориентируйтесь на надписи модуля, а не на картинку.", kk: "Кейбір OLED-те GND мен VCC кері ретпен тұрады; суретке емес, модульдегі жазуларға қараңыз." },
    },
    {
      title: { en: "Add the two paddle knobs", ru: "Добавьте два регулятора ракеток", kk: "Екі ракетка тұтқасын қосыңыз" },
      body: {
        en: "Place one potentiometer on each end of the breadboard so the players can sit opposite each other. For each one, wire the left leg to 5V and the right leg to GND; the middle leg (wiper) of the left pot goes to A0 and of the right pot to A1. Turning a knob moves its wiper smoothly from 0 to 5 V, and the sketch maps that to the paddle height.",
        ru: "Поставьте по потенциометру на каждый конец макетки, чтобы игроки сидели друг напротив друга. У каждого левую ножку подключите к 5V, правую к GND; средняя ножка (движок) левого потенциометра идёт на A0, правого на A1. При вращении ручки напряжение на движке плавно меняется от 0 до 5 В, и скетч переводит его в положение ракетки.",
        kk: "Ойыншылар бір-біріне қарама-қарсы отыра алатындай, макет тақтасының әр ұшына бір потенциометрден қойыңыз. Әрқайсысының сол аяғын 5V-ке, оң аяғын GND-ге қосыңыз; сол потенциометрдің ортаңғы аяғы (жылжымалы түйіспе) A0-ге, оңдікі A1-ге барады. Тұтқаны бұрағанда түйіспедегі кернеу 0-ден 5 В-қа дейін біркелкі өзгереді, ал скетч оны ракетканың орнына айналдырады.",
      },
      expect: { en: "Each pot has 5V and GND on its outer legs and its wiper on A0 or A1.", ru: "У каждого потенциометра на крайних ножках 5V и GND, а движок на A0 или A1.", kk: "Әр потенциометрдің шеткі аяқтарында 5V пен GND, ал түйіспесі A0 немесе A1-де." },
      mistake: { en: "Putting 5V on the middle leg makes the pot a short circuit at one end of its travel.", ru: "Если подать 5V на среднюю ножку, в крайнем положении получится короткое замыкание.", kk: "Ортаңғы аяққа 5V берсеңіз, шеткі күйде қысқа тұйықталу болады." },
    },
    {
      title: { en: "Wire the buzzer", ru: "Подключите зуммер", kk: "Зуммерді қосыңыз" },
      body: {
        en: "Connect D9 → 100 Ω → buzzer +, and buzzer − to GND. The resistor keeps the current of a magnetic buzzer below the pin limit. tone() is non-blocking here, so a beep never freezes the ball.",
        ru: "Подключите D9 → 100 Ом → + зуммера, а − зуммера к GND. Резистор удерживает ток магнитного зуммера ниже предела пина. tone() здесь не блокирует программу, поэтому писк не останавливает мяч.",
        kk: "D9 → 100 Ом → зуммер + тізбегін жалғап, зуммердің − шықпасын GND-ге қосыңыз. Резистор магниттік зуммер тогын пин шегінен төмен ұстайды. Мұнда tone() бағдарламаны тоқтатпайды, сондықтан дыбыс допты қатырмайды.",
      },
      expect: { en: "The buzzer is wired in series with 100 Ω between D9 and GND.", ru: "Зуммер включён последовательно со 100 Ом между D9 и GND.", kk: "Зуммер D9 пен GND арасында 100 Ом-мен тізбектей қосылған." },
      mistake: { en: "An active buzzer plays the same note for every event; use a passive one.", ru: "Активный зуммер пищит одной нотой на всё; нужен пассивный.", kk: "Белсенді зуммер барлық оқиғаға бір нотамен шыңғырады; пассивті керек." },
    },
    {
      title: { en: "Install the libraries and play", ru: "Установите библиотеки и играйте", kk: "Кітапханаларды орнатып, ойнаңыз" },
      body: {
        en: "Install \"Adafruit SSD1306\" and \"Adafruit GFX Library\" from the Library Manager. Select Arduino Nano (try \"ATmega328P (Old Bootloader)\" if the upload times out) and upload. The ball serves from the centre; let it hit a wall to hear the low beep and a paddle to hear the high one. Every paddle hit makes it 6% faster, and hitting near a paddle's edge sends it at a steeper angle. First to 7 wins, then the match restarts.",
        ru: "Установите «Adafruit SSD1306» и «Adafruit GFX Library» через менеджер библиотек. Выберите Arduino Nano (если загрузка зависает, попробуйте «ATmega328P (Old Bootloader)») и загрузите скетч. Мяч вылетает из центра; удар о стену даёт низкий писк, о ракетку высокий. Каждый удар ракеткой ускоряет мяч на 6 %, а удар краем ракетки отправляет его под более крутым углом. Побеждает тот, кто первым наберёт 7, затем матч начинается заново.",
        kk: "Кітапханалар менеджерінен «Adafruit SSD1306» және «Adafruit GFX Library» орнатыңыз. Arduino Nano-ны таңдаңыз (жүктеу тоқтап қалса, «ATmega328P (Old Bootloader)» таңдап көріңіз) да, скетчті жүктеңіз. Доп ортадан ұшады; қабырғаға соғылғанда төмен, ракеткаға соғылғанда жоғары дыбыс шығады. Ракеткамен әр соққы допты 6 %-ға жылдамдатады, ал ракетканың шетімен соқса, ол тігірек бұрышпен ұшады. 7 ұпайды бірінші жинаған жеңеді, содан кейін матч қайта басталады.",
      },
      expect: { en: "Paddles follow the knobs smoothly and the score shows at the top of the screen.", ru: "Ракетки плавно следуют за ручками, счёт виден вверху экрана.", kk: "Ракеткалар тұтқалардың соңынан біркелкі жүреді, ұпай экранның жоғарғы жағында көрінеді." },
      mistake: { en: "\"SSD1306 allocation failed\" means there is no free RAM for the 1 KB screen buffer: do not add big arrays or change the size to 128×128.", ru: "«SSD1306 allocation failed» означает, что не хватает памяти под буфер экрана 1 КБ: не добавляйте большие массивы и не меняйте размер на 128×128.", kk: "«SSD1306 allocation failed» экранның 1 КБ буферіне жад жетпейтінін білдіреді: үлкен массивтер қоспаңыз және өлшемді 128×128-ге өзгертпеңіз." },
    },
  ],
  code: [{
    filename: "oled_pong.ino",
    language: "cpp",
    libraries: ["Adafruit SSD1306", "Adafruit GFX Library"],
    source: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

const int POT_LEFT_PIN = A0, POT_RIGHT_PIN = A1;   // paddle knobs
const int BUZZER_PIN = 9;                          // through 100 Ohm
const int WIN_SCORE = 7;

const int SCREEN_W = 128, SCREEN_H = 64;
const int PADDLE_LEN = 14, PADDLE_THICK = 2, BALL_SIZE = 2;
const int LEFT_X = 2, RIGHT_X = SCREEN_W - 2 - PADDLE_THICK;

Adafruit_SSD1306 display(SCREEN_W, SCREEN_H, &Wire, -1);   // no reset pin

float ballX, ballY, velX, velY;
int leftY = 0, rightY = 0;
int scoreL = 0, scoreR = 0;
unsigned long lastFrame = 0;

void serve(int towards) {   // towards = -1 (left) or +1 (right)
  ballX = SCREEN_W / 2;
  ballY = SCREEN_H / 2;
  velX = 1.6 * towards;
  velY = random(-10, 11) / 10.0;
}

int readPaddle(int pin) {
  return map(analogRead(pin), 0, 1023, 0, SCREEN_H - PADDLE_LEN);
}

void bounceOffPaddle(int paddleY, int newX) {
  float offset = (ballY + BALL_SIZE / 2.0 - (paddleY + PADDLE_LEN / 2.0)) / (PADDLE_LEN / 2.0);  // -1..1
  velX = -velX * 1.06;
  velX = constrain(velX, -4.0, 4.0);
  velY = offset * 2.0;
  ballX = newX;
  tone(BUZZER_PIN, 880, 15);
}

void pointScored(bool leftScored) {
  if (leftScored) scoreL++; else scoreR++;
  tone(BUZZER_PIN, 220, 200);
  Serial.print(F("Score "));
  Serial.print(scoreL);
  Serial.print(':');
  Serial.println(scoreR);

  if (scoreL >= WIN_SCORE || scoreR >= WIN_SCORE) {
    Serial.println(scoreL > scoreR ? F("Left player wins!") : F("Right player wins!"));
    display.clearDisplay();
    display.setTextSize(2);
    display.setCursor(10, 16);
    display.print(scoreL > scoreR ? F("LEFT") : F("RIGHT"));
    display.setCursor(10, 36);
    display.print(F("WINS!"));
    display.display();
    tone(BUZZER_PIN, 523, 150); delay(180);
    tone(BUZZER_PIN, 659, 150); delay(180);
    tone(BUZZER_PIN, 784, 300); delay(3000);
    scoreL = scoreR = 0;
    display.setTextSize(1);
  }
  serve(leftScored ? 1 : -1);   // serve towards the player who lost the point
}

void drawFrame() {
  display.clearDisplay();
  for (int y = 0; y < SCREEN_H; y += 6) display.drawFastVLine(SCREEN_W / 2, y, 3, SSD1306_WHITE);
  display.fillRect(LEFT_X, leftY, PADDLE_THICK, PADDLE_LEN, SSD1306_WHITE);
  display.fillRect(RIGHT_X, rightY, PADDLE_THICK, PADDLE_LEN, SSD1306_WHITE);
  display.fillRect((int)ballX, (int)ballY, BALL_SIZE, BALL_SIZE, SSD1306_WHITE);
  display.setCursor(SCREEN_W / 2 - 16, 0);
  display.print(scoreL);
  display.setCursor(SCREEN_W / 2 + 12, 0);
  display.print(scoreR);
  display.display();
}

void setup() {
  Serial.begin(9600);
  pinMode(BUZZER_PIN, OUTPUT);
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    while (true) delay(1000);
  }
  display.setTextColor(SSD1306_WHITE);
  display.setTextSize(1);
  randomSeed(analogRead(POT_LEFT_PIN) + analogRead(POT_RIGHT_PIN) * 7);
  Serial.println(F("Pong ready: first to 7 wins"));
  serve(random(2) ? 1 : -1);
}

void loop() {
  if (millis() - lastFrame < 20) return;   // ~50 frames per second
  lastFrame = millis();

  leftY = readPaddle(POT_LEFT_PIN);
  rightY = readPaddle(POT_RIGHT_PIN);

  ballX += velX;
  ballY += velY;

  if (ballY <= 0 || ballY >= SCREEN_H - BALL_SIZE) {   // top / bottom wall
    velY = -velY;
    ballY = constrain(ballY, 0, SCREEN_H - BALL_SIZE);
    tone(BUZZER_PIN, 440, 10);
  }

  bool rowsOverlapL = ballY + BALL_SIZE >= leftY && ballY <= leftY + PADDLE_LEN;
  bool rowsOverlapR = ballY + BALL_SIZE >= rightY && ballY <= rightY + PADDLE_LEN;
  if (velX < 0 && ballX <= LEFT_X + PADDLE_THICK && ballX >= LEFT_X - 2 && rowsOverlapL) {
    bounceOffPaddle(leftY, LEFT_X + PADDLE_THICK);
  } else if (velX > 0 && ballX + BALL_SIZE >= RIGHT_X && ballX <= RIGHT_X + 2 && rowsOverlapR) {
    bounceOffPaddle(rightY, RIGHT_X - BALL_SIZE);
  }

  if (ballX < -BALL_SIZE) pointScored(false);        // missed on the left: right scores
  else if (ballX > SCREEN_W) pointScored(true);      // missed on the right: left scores

  drawFrame();
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The screen stays black", ru: "Экран остаётся чёрным", kk: "Экран қара күйінде қалады" },
      cause: { en: "SDA/SCL are swapped, or the module uses address 0x3D.", ru: "Перепутаны SDA/SCL, или у модуля адрес 0x3D.", kk: "SDA/SCL ауысып кеткен немесе модуль мекенжайы 0x3D." },
      fix: { en: "Check SDA → A4 and SCL → A5; run the I2C scanner example and change 0x3C in display.begin() to what it finds.", ru: "Проверьте SDA → A4 и SCL → A5; запустите пример I2C scanner и замените 0x3C в display.begin() на найденный адрес.", kk: "SDA → A4 және SCL → A5 екенін тексеріңіз; I2C scanner мысалын іске қосып, display.begin() ішіндегі 0x3C-ты табылған мекенжайға ауыстырыңыз." },
    },
    {
      symptom: { en: "A paddle jitters or jumps", ru: "Ракетка дрожит или прыгает", kk: "Ракетка дірілдейді немесе секіреді" },
      cause: { en: "A loose pot leg in the breadboard or a missing GND on that pot.", ru: "Ножка потенциометра плохо сидит в макетке, или у него нет GND.", kk: "Потенциометр аяғы макет тақтасында нашар отыр немесе оның GND-і жоқ." },
      fix: { en: "Press the pot firmly into the board, or solder short wires to its legs; check both outer legs are wired.", ru: "Плотно вставьте потенциометр или припаяйте к ножкам короткие провода; проверьте обе крайние ножки.", kk: "Потенциометрді тығыз салыңыз немесе аяқтарына қысқа сымдар дәнекерлеңіз; екі шеткі аяқты да тексеріңіз." },
    },
    {
      symptom: { en: "A paddle moves the wrong way", ru: "Ракетка движется в обратную сторону", kk: "Ракетка кері бағытта қозғалады" },
      cause: { en: "5V and GND are on the opposite outer legs.", ru: "5V и GND подключены к крайним ножкам наоборот.", kk: "5V пен GND шеткі аяқтарға кері қосылған." },
      fix: { en: "Swap the two outer wires of that potentiometer.", ru: "Поменяйте местами два крайних провода этого потенциометра.", kk: "Сол потенциометрдің екі шеткі сымын ауыстырыңыз." },
    },
    {
      symptom: { en: "Upload fails with \"not in sync\"", ru: "Загрузка падает с ошибкой «not in sync»", kk: "Жүктеу «not in sync» қатесімен тоқтайды" },
      cause: { en: "Many Nano clones still use the old bootloader.", ru: "Многие клоны Nano используют старый загрузчик.", kk: "Nano клондарының көбі ескі жүктеуішті пайдаланады." },
      fix: { en: "Tools → Processor → \"ATmega328P (Old Bootloader)\", and install the CH340 driver if the port does not appear.", ru: "Инструменты → Процессор → «ATmega328P (Old Bootloader)», и установите драйвер CH340, если порт не появляется.", kk: "Құралдар → Процессор → «ATmega328P (Old Bootloader)», ал порт көрінбесе, CH340 драйверін орнатыңыз." },
    },
  ],
  safety: [],
  simulation: {
    baud: 9600,
    lines: ["Pong ready: first to 7 wins", "Score 1:0", "Score 1:1", "Score 2:1", "Score 3:1", "Score 3:2", "Score 4:2", "Score 5:2", "Score 6:2", "Score 7:2", "Left player wins!"],
    leds: [],
  },
} satisfies GuideContent;
