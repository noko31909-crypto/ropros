import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "sound-reactive-led-bar",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "audio",
  robotics: false,
  difficulty: "beginner",
  hours: 1.5,
  costUsd: 10,
  xpReward: 140,
  title: {
    en: "Sound-Reactive LED Bar (VU Meter)",
    ru: "Светодиодная шкала, реагирующая на звук (VU-метр)",
    kk: "Дыбысқа жауап беретін жарық диодты шкала (VU-метр)",
  },
  summary: {
    en: "Eight LEDs jump with the music: the Uno measures the loudness from a KY-038 sound sensor 30 times a second and lights a green-yellow-red bar with a falling peak dot.",
    ru: "Восемь светодиодов прыгают в такт музыке: Uno 30 раз в секунду измеряет громкость с датчика звука KY-038 и зажигает зелёно-жёлто-красную шкалу с падающей точкой пика.",
    kk: "Сегіз жарық диоды музыкамен бірге секіреді: Uno KY-038 дыбыс датчигінен секундына 30 рет дыбыс қаттылығын өлшеп, түсіп келе жатқан шың нүктесі бар жасыл-сары-қызыл шкаланы жағады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "sound-sensor", qty: 1, spec: { en: "KY-038 (electret mic + LM393), AO and DO pins", ru: "KY-038 (электретный микрофон + LM393), выходы AO и DO", kk: "KY-038 (электретті микрофон + LM393), AO және DO шықпалары" }, role: { en: "Picks up the sound", ru: "Улавливает звук", kk: "Дыбысты қабылдайды" } },
    { component: "led", qty: 8, spec: { en: "5 mm: 5 green, 2 yellow, 1 red", ru: "5 мм: 5 зелёных, 2 жёлтых, 1 красный", kk: "5 мм: 5 жасыл, 2 сары, 1 қызыл" }, role: { en: "The level bar", ru: "Шкала уровня", kk: "Деңгей шкаласы" } },
    { component: "resistor", qty: 8, spec: { en: "330 Ω, ¼ W", ru: "330 Ом, ¼ Вт", kk: "330 Ом, ¼ Вт" }, role: { en: "LED current limit (~9 mA each)", ru: "Ограничение тока светодиодов (~9 мА каждый)", kk: "Жарық диодтарының тогын шектеу (әрқайсысы ~9 мА)" } },
    { component: "breadboard", qty: 1, spec: { en: "full size, 830 points", ru: "полноразмерная, 830 точек", kk: "толық өлшемді, 830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 20, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "snd", component: "sound-sensor", label: "KY-038" },
    { id: "r1", component: "resistor", label: "330 Ω" },
    { id: "r2", component: "resistor", label: "330 Ω" },
    { id: "r3", component: "resistor", label: "330 Ω" },
    { id: "r4", component: "resistor", label: "330 Ω" },
    { id: "r5", component: "resistor", label: "330 Ω" },
    { id: "r6", component: "resistor", label: "330 Ω" },
    { id: "r7", component: "resistor", label: "330 Ω" },
    { id: "r8", component: "resistor", label: "330 Ω" },
    { id: "led1", component: "led", label: "1 green" },
    { id: "led2", component: "led", label: "2 green" },
    { id: "led3", component: "led", label: "3 green" },
    { id: "led4", component: "led", label: "4 green" },
    { id: "led5", component: "led", label: "5 green" },
    { id: "led6", component: "led", label: "6 yellow" },
    { id: "led7", component: "led", label: "7 yellow" },
    { id: "led8", component: "led", label: "8 red" },
  ],
  connections: [
    { from: "board.5V", to: "snd.VCC", color: "red" },
    { from: "snd.GND", to: "board.GND", color: "black" },
    { from: "snd.AO", to: "board.A0", color: "orange", note: { en: "raw microphone signal", ru: "сырой сигнал микрофона", kk: "микрофонның бастапқы сигналы" } },
    { from: "board.D2", to: "r1.A", color: "green" },
    { from: "r1.B", to: "led1.A", color: "green", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led1.K", to: "board.GND", color: "black" },
    { from: "board.D3", to: "r2.A", color: "green" },
    { from: "r2.B", to: "led2.A", color: "green" },
    { from: "led2.K", to: "board.GND", color: "black" },
    { from: "board.D4", to: "r3.A", color: "green" },
    { from: "r3.B", to: "led3.A", color: "green" },
    { from: "led3.K", to: "board.GND2", color: "black" },
    { from: "board.D5", to: "r4.A", color: "green" },
    { from: "r4.B", to: "led4.A", color: "green" },
    { from: "led4.K", to: "board.GND2", color: "black" },
    { from: "board.D6", to: "r5.A", color: "green" },
    { from: "r5.B", to: "led5.A", color: "green" },
    { from: "led5.K", to: "board.GND3", color: "black" },
    { from: "board.D7", to: "r6.A", color: "yellow" },
    { from: "r6.B", to: "led6.A", color: "yellow" },
    { from: "led6.K", to: "board.GND3", color: "black" },
    { from: "board.D8", to: "r7.A", color: "yellow" },
    { from: "r7.B", to: "led7.A", color: "yellow" },
    { from: "led7.K", to: "board.GND", color: "black" },
    { from: "board.D9", to: "r8.A", color: "red" },
    { from: "r8.B", to: "led8.A", color: "red" },
    { from: "led8.K", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Build the LED bar", ru: "Соберите светодиодную шкалу", kk: "Жарық диодты шкаланы құрастырыңыз" },
      body: {
        en: "Place the eight LEDs in a row along the breadboard: five green, then two yellow, then one red at the top. Put every short leg (cathode) on the blue GND rail and a 330 Ω resistor in the row of every long leg. With 330 Ω each LED takes about 9 mA, so all eight together stay well under the Uno's limits.",
        ru: "Поставьте восемь светодиодов в ряд вдоль макетки: пять зелёных, затем два жёлтых и один красный сверху. Все короткие ножки (катоды) на синюю шину GND, а в ряд каждой длинной ножки резистор 330 Ом. С 330 Ом каждый светодиод берёт около 9 мА, так что все восемь вместе далеко от пределов Uno.",
        kk: "Сегіз жарық диодын макет тақтасының бойымен қатарға қойыңыз: бес жасыл, содан кейін екі сары және ең жоғарыда бір қызыл. Барлық қысқа аяқтарды (катодтарды) көк GND шинасына, ал әр ұзын аяқтың қатарына 330 Ом резистор қойыңыз. 330 Ом-да әр жарық диоды шамамен 9 мА алады, сондықтан сегізеуі бірге де Uno шектерінен әлдеқайда төмен.",
      },
      expect: { en: "A neat row of 8 LEDs, each with its own resistor, all cathodes on GND.", ru: "Аккуратный ряд из 8 светодиодов, у каждого свой резистор, все катоды на GND.", kk: "8 жарық диодының ұқыпты қатары, әрқайсысының өз резисторы бар, барлық катодтар GND-де." },
      mistake: { en: "Sharing one resistor between several LEDs makes them fight for current and glow unevenly.", ru: "Один резистор на несколько светодиодов: они делят ток и светятся неравномерно.", kk: "Бірнеше жарық диодына бір резистор: олар токты бөлісіп, біркелкі жанбайды." },
    },
    {
      title: { en: "Wire the bar to D2–D9", ru: "Подключите шкалу к D2–D9", kk: "Шкаланы D2–D9-ға қосыңыз" },
      body: {
        en: "Run a wire from D2 to the bottom green LED's resistor, D3 to the next, and so on up to D9 for the red LED. Connect the GND rail to the Uno's GND. D0 and D1 are skipped on purpose: they carry the USB serial data.",
        ru: "Проведите провод от D2 к резистору нижнего зелёного светодиода, от D3 к следующему и так далее до D9 для красного. Соедините шину GND с GND Uno. D0 и D1 пропущены специально: по ним идут данные USB-порта.",
        kk: "D2-ден ең төменгі жасыл жарық диодының резисторына, D3-тен келесісіне, және солай қызыл жарық диоды үшін D9-ға дейін сым тартыңыз. GND шинасын Uno-ның GND-іне қосыңыз. D0 мен D1 әдейі өткізілген: олар арқылы USB порттың деректері жүреді.",
      },
      expect: { en: "Pins D2…D9 map to LEDs 1…8 from bottom to top.", ru: "Пины D2…D9 соответствуют светодиодам 1…8 снизу вверх.", kk: "D2…D9 пиндері төменнен жоғары қарай 1…8 жарық диодтарына сәйкес." },
      mistake: { en: "Mixing up the order: the bar then lights in a random pattern instead of growing upwards.", ru: "Если перепутать порядок, шкала будет загораться вразнобой, а не расти вверх.", kk: "Ретін шатастырсаңыз, шкала жоғары қарай өспей, ретсіз жанады." },
    },
    {
      title: { en: "Connect the sound sensor", ru: "Подключите датчик звука", kk: "Дыбыс датчигін қосыңыз" },
      body: {
        en: "Wire + to 5V, G to GND and AO to A0. AO carries the raw microphone signal: a voltage that wiggles around a resting level as sound arrives. DO is only an on/off \"loud enough\" output, so it stays unconnected here.",
        ru: "Подключите + к 5V, G к GND, AO к A0. На AO идёт сырой сигнал микрофона: напряжение, которое колеблется вокруг уровня покоя, когда приходит звук. DO это только выход «достаточно громко» вкл/выкл, здесь он не нужен.",
        kk: "+-ты 5V-ке, G-ні GND-ге, AO-ны A0-ге қосыңыз. AO-да микрофонның бастапқы сигналы бар: дыбыс келгенде тыныштық деңгейінің айналасында тербелетін кернеу. DO тек «жеткілікті қатты» деген қосу/өшіру шығысы, сондықтан мұнда ол қосылмайды.",
      },
      expect: { en: "The sensor's power LED lights.", ru: "Загорается светодиод питания датчика.", kk: "Датчиктің қуат шамы жанады." },
      mistake: { en: "Wiring DO instead of AO: the bar then only flips between all off and all on.", ru: "Если подключить DO вместо AO, шкала будет только полностью гаснуть и загораться.", kk: "AO орнына DO қоссаңыз, шкала тек толық сөніп, толық жанады." },
    },
    {
      title: { en: "Centre the sensor with its trimmer", ru: "Отцентруйте датчик подстроечником", kk: "Датчикті реттегішпен ортаға келтіріңіз" },
      body: {
        en: "In a quiet room, turn the brass trimmer on the KY-038 until its second LED (L2, the DO indicator) just goes off. That places the resting level in the sensitive middle of the range. Clap near the microphone: L2 should blink.",
        ru: "В тихой комнате крутите латунный подстроечник на KY-038, пока второй светодиод (L2, индикатор DO) только-только не погаснет. Так уровень покоя попадает в чувствительную середину диапазона. Хлопните рядом с микрофоном: L2 должен мигнуть.",
        kk: "Тыныш бөлмеде KY-038-дегі жез реттегішті екінші жарық диоды (L2, DO индикаторы) әзер сөнгенше бұраңыз. Сонда тыныштық деңгейі ауқымның сезімтал ортасына түседі. Микрофонның жанында қол шапалақтаңыз: L2 жыпылықтауы керек.",
      },
      expect: { en: "L2 off in silence, blinking on claps.", ru: "L2 не горит в тишине и мигает от хлопков.", kk: "Тыныштықта L2 сөнік, шапалақтан жыпылықтайды." },
      mistake: { en: "These trimmers need many turns; a quarter turn often changes nothing.", ru: "Эти подстроечники многооборотные; четверть оборота часто ничего не меняет.", kk: "Бұл реттегіштер көп айналымды; ширек айналым көбіне ештеңені өзгертпейді." },
    },
    {
      title: { en: "Upload and stay quiet for a second", ru: "Загрузите скетч и помолчите секунду", kk: "Скетчті жүктеп, бір секунд үндемеңіз" },
      body: {
        en: "Upload the sketch. The LEDs sweep up and down as a self-test, then the sketch listens for about half a second of silence to learn the noise floor. After that it measures the peak-to-peak swing of the signal in 30 ms windows and lights the bar on a logarithmic scale, like a real VU meter. Open the Serial Plotter at 115200 baud to watch p2p and level.",
        ru: "Загрузите скетч. Светодиоды пробегают вверх и вниз для самопроверки, потом скетч примерно полсекунды слушает тишину, чтобы узнать уровень шума. Дальше он измеряет размах сигнала от пика до пика в окнах по 30 мс и зажигает шкалу в логарифмическом масштабе, как настоящий VU-метр. Откройте Serial Plotter на 115200 бод, чтобы видеть p2p и level.",
        kk: "Скетчті жүктеңіз. Өзін-өзі тексеру үшін жарық диодтары жоғары-төмен жүгіріп өтеді, содан кейін скетч шу деңгейін білу үшін шамамен жарты секунд тыныштықты тыңдайды. Одан әрі ол 30 мс терезелерде сигналдың шыңнан шыңға дейінгі ауқымын өлшеп, шкаланы нағыз VU-метр сияқты логарифмдік масштабта жағады. p2p пен level мәндерін көру үшін Serial Plotter-ды 115200 бодта ашыңыз.",
      },
      expect: { en: "\"Noise floor = …\" and a bar that grows when you talk or play music.", ru: "«Noise floor = …» и шкала, которая растёт, когда вы говорите или включаете музыку.", kk: "«Noise floor = …» және сөйлегенде не музыка қосқанда өсетін шкала." },
      mistake: { en: "Talking during the start-up second raises the noise floor and makes the bar sluggish; press reset in silence.", ru: "Если говорить во время запуска, уровень шума завысится и шкала станет вялой; нажмите reset в тишине.", kk: "Іске қосылу кезінде сөйлесеңіз, шу деңгейі жоғарылап, шкала баяу болады; тыныштықта reset басыңыз." },
    },
    {
      title: { en: "Tune the sensitivity", ru: "Настройте чувствительность", kk: "Сезімталдықты баптаңыз" },
      body: {
        en: "The KY-038 has no amplifier, so its signal is small. If the red LED never lights with music close by, lower FULL_SCALE (for example to 40); if the bar is always full, raise it. Point the microphone at the sound source; 20–50 cm from a speaker works well.",
        ru: "У KY-038 нет усилителя, поэтому сигнал небольшой. Если красный светодиод не загорается даже при музыке рядом, уменьшите FULL_SCALE (например, до 40); если шкала всегда полная, увеличьте. Направьте микрофон на источник звука; хорошо работает 20–50 см от колонки.",
        kk: "KY-038-де күшейткіш жоқ, сондықтан сигнал әлсіз. Музыка жақын тұрса да қызыл жарық диоды жанбаса, FULL_SCALE мәнін азайтыңыз (мысалы, 40-қа дейін); шкала үнемі толы болса, көбейтіңіз. Микрофонды дыбыс көзіне бағыттаңыз; колонкадан 20–50 см жақсы жұмыс істейді.",
      },
      expect: { en: "Quiet passages light 2–3 LEDs, loud beats reach the red one.", ru: "Тихие места зажигают 2–3 светодиода, громкие удары доходят до красного.", kk: "Тыныш бөліктер 2–3 жарық диодын жағады, қатты соққылар қызылға дейін жетеді." },
      mistake: { en: "Holding the sensor against a loudspeaker: the signal clips and the bar just stays full.", ru: "Прикладывать датчик к динамику: сигнал упирается в предел, и шкала всё время полная.", kk: "Датчикті динамикке тақау: сигнал шекке тіреліп, шкала үнемі толы тұрады." },
    },
  ],
  code: [{
    filename: "vu_meter.ino",
    language: "cpp",
    libraries: [],
    source: `const int SOUND_PIN = A0;
const int LED_PINS[8] = {2, 3, 4, 5, 6, 7, 8, 9};   // bottom (green) to top (red)

const unsigned long WINDOW_MS = 30;   // loudness is measured over 30 ms windows
const int FULL_SCALE = 80;            // peak-to-peak counts that light all 8 LEDs (tune this)

int noiseFloor = 0;
int peakLevel = 0;
unsigned long peakTime = 0, lastPrint = 0;

// Highest minus lowest reading in one window: the size of the sound wave
int measureP2P() {
  unsigned long start = millis();
  int lo = 1023, hi = 0;
  while (millis() - start < WINDOW_MS) {
    int v = analogRead(SOUND_PIN);
    if (v < lo) lo = v;
    if (v > hi) hi = v;
  }
  return hi - lo;
}

void showBar(int level, int peak) {
  for (int i = 0; i < 8; i++) {
    digitalWrite(LED_PINS[i], i < level || i == peak - 1);
  }
}

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < 8; i++) pinMode(LED_PINS[i], OUTPUT);

  for (int i = 0; i < 8; i++) { digitalWrite(LED_PINS[i], HIGH); delay(60); }   // self-test sweep
  for (int i = 7; i >= 0; i--) { digitalWrite(LED_PINS[i], LOW); delay(60); }

  long sum = 0;                         // learn the noise floor: about 0.6 s of silence
  for (int i = 0; i < 20; i++) sum += measureP2P();
  noiseFloor = sum / 20 + 2;
  Serial.print(F("Noise floor = "));
  Serial.println(noiseFloor);
}

void loop() {
  int p2p = measureP2P();
  int loudness = max(0, p2p - noiseFloor);

  // logarithmic scale, like a real VU meter: each LED is a similar step in perceived loudness
  float x = log(1.0 + loudness) / log(1.0 + FULL_SCALE);
  int level = constrain((int)(x * 8 + 0.5), 0, 8);

  // peak dot: stays 400 ms, then falls one LED every 100 ms
  unsigned long now = millis();
  if (level >= peakLevel) {
    peakLevel = level;
    peakTime = now;
  } else if (peakLevel > 0 && now - peakTime > 400) {
    peakLevel--;
    peakTime = now - 300;
  }
  showBar(level, peakLevel);

  if (now - lastPrint >= 100) {
    lastPrint = now;
    Serial.print(F("p2p="));
    Serial.print(p2p);
    Serial.print(F(" level="));
    Serial.println(level);
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The bar barely moves, even with loud music", ru: "Шкала почти не двигается даже при громкой музыке", kk: "Қатты музыкада да шкала әрең қозғалады" },
      cause: { en: "FULL_SCALE is too high for the KY-038's small signal, or the trimmer is turned so far that the signal sits against 0 or 1023.", ru: "FULL_SCALE слишком велик для слабого сигнала KY-038, или подстроечник выкручен так, что сигнал прижат к 0 или 1023.", kk: "FULL_SCALE KY-038-дің әлсіз сигналы үшін тым үлкен немесе реттегіш сигнал 0-ге не 1023-ке тірелетіндей бұралған." },
      fix: { en: "Re-centre the trimmer (L2 just off in silence) and lower FULL_SCALE to 30–50.", ru: "Снова отцентруйте подстроечник (L2 едва гаснет в тишине) и уменьшите FULL_SCALE до 30–50.", kk: "Реттегішті қайта ортаға келтіріңіз (тыныштықта L2 әзер сөнеді) және FULL_SCALE мәнін 30–50-ге дейін азайтыңыз." },
    },
    {
      symptom: { en: "The first LEDs flicker in a silent room", ru: "Нижние светодиоды мерцают в тихой комнате", kk: "Тыныш бөлмеде төменгі жарық диодтары жыпылықтайды" },
      cause: { en: "Electrical noise on the 5 V line (a noisy USB port) or a noise floor learned too low.", ru: "Электрические помехи на линии 5 В (шумный USB-порт) или слишком низко определённый уровень шума.", kk: "5 В желісіндегі электр кедергілері (шулы USB порты) немесе тым төмен анықталған шу деңгейі." },
      fix: { en: "Try another USB port or a power bank, keep the sensor wires short, and raise the \"+ 2\" margin in setup() to 4 or 6.", ru: "Попробуйте другой USB-порт или повербанк, укоротите провода датчика и увеличьте запас «+ 2» в setup() до 4 или 6.", kk: "Басқа USB портын немесе повербанкті қолданып көріңіз, датчик сымдарын қысқартыңыз және setup() ішіндегі «+ 2» қорын 4-ке не 6-ға көбейтіңіз." },
    },
    {
      symptom: { en: "One LED never lights", ru: "Один светодиод никогда не горит", kk: "Бір жарық диоды ешқашан жанбайды" },
      cause: { en: "It is in backwards or its resistor sits in a different breadboard row; the self-test sweep shows which one.", ru: "Он вставлен наоборот, или его резистор стоит в другом ряду макетки; самопроверка при запуске покажет, какой именно.", kk: "Ол кері қойылған немесе резисторы макет тақтасының басқа қатарында тұр; іске қосылғандағы өзін-өзі тексеру қайсысы екенін көрсетеді." },
      fix: { en: "Turn the LED so the long leg faces its resistor and check the wire to its D pin.", ru: "Разверните светодиод длинной ножкой к резистору и проверьте провод к его пину D.", kk: "Жарық диодын ұзын аяғымен резисторға қаратып бұрыңыз және оның D пиніне баратын сымды тексеріңіз." },
    },
  ],
  safety: [
    { en: "Keep test music at a comfortable volume; the meter does not need it loud, lower FULL_SCALE instead.", ru: "Держите громкость музыки комфортной: шкале не нужна громкость, лучше уменьшите FULL_SCALE.", kk: "Музыканың дыбысын жайлы деңгейде ұстаңыз: шкалаға қатты дыбыс керек емес, оның орнына FULL_SCALE мәнін азайтыңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Noise floor = 5",
      "p2p=4 level=0",
      "p2p=9 level=3",
      "p2p=18 level=5",
      "p2p=41 level=7",
      "p2p=77 level=8",
      "p2p=26 level=6",
      "p2p=12 level=4",
      "p2p=5 level=0",
    ],
    leds: [{ label: "GREEN", color: "#43A047" }, { label: "YELLOW", color: "#FDD835" }, { label: "RED", color: "#E53935" }],
  },
} satisfies GuideContent;
