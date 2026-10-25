import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "rain-alert-window-reminder",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "home",
  robotics: false,
  difficulty: "beginner",
  hours: 1,
  costUsd: 9,
  xpReward: 120,
  title: {
    en: "Rain Alert: Close-the-Window Reminder",
    ru: "Датчик дождя: напоминание закрыть окно",
    kk: "Жаңбыр дабылы: терезені жабу туралы еске салғыш",
  },
  summary: {
    en: "A rain plate on the windowsill notices the first drops; the Uno plays a short melody and lights an LED, then repeats the reminder every five minutes until the rain stops.",
    ru: "Пластина-датчик на подоконнике замечает первые капли, Uno играет короткую мелодию и зажигает светодиод, а потом повторяет напоминание каждые пять минут, пока не кончится дождь.",
    kk: "Терезе алдындағы жаңбыр пластинасы алғашқы тамшыларды сезеді, Uno қысқа әуен ойнап, жарық диодын жағады, содан кейін жаңбыр тоқтағанша әр бес минут сайын еске салып отырады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "rain-sensor", qty: 1, spec: { en: "FC-37/YL-83 plate + LM393 comparator board, with 2-wire cable", ru: "пластина FC-37/YL-83 + плата компаратора LM393, с 2-проводным кабелем", kk: "FC-37/YL-83 пластинасы + LM393 компаратор платасы, 2 сымды кабелімен" }, role: { en: "Detects water drops", ru: "Обнаруживает капли воды", kk: "Су тамшыларын анықтайды" } },
    { component: "buzzer-passive", qty: 1, spec: { en: "passive piezo buzzer (KY-006 type)", ru: "пассивный пьезозуммер (типа KY-006)", kk: "пассивті пьезозуммер (KY-006 түрі)" }, role: { en: "Plays the reminder melody", ru: "Играет мелодию-напоминание", kk: "Еске салу әуенін ойнайды" } },
    { component: "led", qty: 1, spec: { en: "5 mm blue", ru: "5 мм, синий", kk: "5 мм, көк" }, role: { en: "\"It is raining\" light", ru: "Индикатор «идёт дождь»", kk: "«Жаңбыр жауып тұр» индикаторы" } },
    { component: "resistor", qty: 1, spec: { en: "220 Ω, ¼ W", ru: "220 Ом, ¼ Вт", kk: "220 Ом, ¼ Вт" }, role: { en: "LED current limit", ru: "Ограничение тока светодиода", kk: "Жарық диодының тогын шектеу" } },
    { component: "breadboard", qty: 1, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 10, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "rain", component: "rain-sensor", label: "Rain sensor" },
    { id: "bz", component: "buzzer-passive", label: "Piezo" },
    { id: "r1", component: "resistor", label: "220 Ω" },
    { id: "led", component: "led", label: "Rain LED" },
  ],
  connections: [
    { from: "board.5V", to: "rain.VCC", color: "red" },
    { from: "rain.GND", to: "board.GND", color: "black" },
    { from: "rain.DO", to: "board.D2", color: "green", note: { en: "LOW when wet", ru: "LOW, когда мокро", kk: "сулы кезде LOW" } },
    { from: "rain.AO", to: "board.A0", color: "orange", note: { en: "lower = wetter", ru: "меньше = мокрее", kk: "аз = сулырақ" } },
    { from: "board.D9", to: "bz.+", color: "purple", note: { en: "tone() output", ru: "выход tone()", kk: "tone() шығысы" } },
    { from: "bz.-", to: "board.GND2", color: "black" },
    { from: "board.D10", to: "r1.A", color: "blue" },
    { from: "r1.B", to: "led.A", color: "blue", note: { en: "long leg of the LED", ru: "длинная ножка светодиода", kk: "жарық диодының ұзын аяғы" } },
    { from: "led.K", to: "board.GND3", color: "black" },
  ],
  steps: [
    {
      title: { en: "Connect the plate to the comparator board", ru: "Соедините пластину с платой компаратора", kk: "Пластинаны компаратор платасына қосыңыз" },
      body: {
        en: "The rain kit has two parts: the plate with comb-shaped traces that goes outside, and the small LM393 board that stays indoors. Join them with the two-wire cable; the polarity of those two pins does not matter. When water bridges the combs, the plate's resistance drops.",
        ru: "Набор состоит из двух частей: пластины с дорожками-гребёнками, которая будет снаружи, и маленькой платы LM393, которая остаётся в доме. Соедините их двухпроводным кабелем; полярность этих двух выводов не важна. Когда вода замыкает гребёнки, сопротивление пластины падает.",
        kk: "Жиынтық екі бөліктен тұрады: сыртта тұратын тарақ тәрізді жолдары бар пластина және үйде қалатын шағын LM393 платасы. Оларды екі сымды кабельмен жалғаңыз; бұл екі шықпаның полярлығы маңызды емес. Су тарақтарды тұйықтағанда, пластинаның кедергісі азаяды.",
      },
      expect: { en: "Plate and comparator board joined by a two-wire cable.", ru: "Пластина и плата компаратора соединены двухпроводным кабелем.", kk: "Пластина мен компаратор платасы екі сымды кабельмен жалғанған." },
      mistake: { en: "Putting the LM393 board outside too: it is not waterproof.", ru: "Выносить на улицу и плату LM393: она не защищена от воды.", kk: "LM393 платасын да сыртқа шығару: ол судан қорғалмаған." },
    },
    {
      title: { en: "Wire the sensor board to the Uno", ru: "Подключите плату датчика к Uno", kk: "Датчик платасын Uno-ға қосыңыз" },
      body: {
        en: "Connect VCC to 5V, GND to GND, DO to D2 and AO to A0. DO is the comparator output: it goes LOW when the plate is wetter than the threshold set with the blue trimmer. AO is the raw analog level, used here to print how wet the plate is.",
        ru: "Подключите VCC к 5V, GND к GND, DO к D2, AO к A0. DO это выход компаратора: он становится LOW, когда пластина мокрее порога, заданного синим подстроечником. AO это сырой аналоговый уровень, здесь он нужен, чтобы выводить, насколько пластина мокрая.",
        kk: "VCC-ті 5V-ке, GND-ні GND-ге, DO-ны D2-ге, AO-ны A0-ге қосыңыз. DO компаратордың шығысы: пластина көк реттегішпен қойылған шектен сулырақ болғанда, ол LOW болады. AO бастапқы аналогтық деңгей, мұнда ол пластинаның қаншалықты сулы екенін шығару үшін керек.",
      },
      expect: { en: "The board's power LED is on; its DO LED is off while the plate is dry.", ru: "Горит светодиод питания платы, а светодиод DO не горит, пока пластина сухая.", kk: "Платаның қуат шамы жанып тұр, ал пластина құрғақ кезде DO шамы сөнік." },
      mistake: { en: "Swapping DO and AO: the sketch then never sees rain.", ru: "Если перепутать DO и AO, скетч никогда не увидит дождь.", kk: "DO мен AO-ны ауыстырсаңыз, скетч жаңбырды ешқашан көрмейді." },
    },
    {
      title: { en: "Add the buzzer and the LED", ru: "Добавьте зуммер и светодиод", kk: "Зуммер мен жарық диодын қосыңыз" },
      body: {
        en: "A passive buzzer has no oscillator inside, so the Uno makes the notes with tone(). Wire its + to D9 and − to GND. Then wire D10 through a 220 Ω resistor to the blue LED's long leg and its short leg to GND.",
        ru: "У пассивного зуммера нет встроенного генератора, поэтому ноты делает Uno функцией tone(). Подключите его + к D9, − к GND. Затем D10 через резистор 220 Ом к длинной ножке синего светодиода, короткую ножку к GND.",
        kk: "Пассивті зуммердің ішінде генератор жоқ, сондықтан ноталарды Uno tone() функциясымен жасайды. Оның +-ын D9-ға, −-ін GND-ге қосыңыз. Содан кейін D10-ды 220 Ом резистор арқылы көк жарық диодының ұзын аяғына, қысқа аяғын GND-ге қосыңыз.",
      },
      expect: { en: "Buzzer on D9, LED with its resistor on D10.", ru: "Зуммер на D9, светодиод с резистором на D10.", kk: "Зуммер D9-да, резисторы бар жарық диоды D10-да." },
      mistake: { en: "An active buzzer here would just beep one pitch instead of playing the melody.", ru: "Активный зуммер здесь просто пищал бы одним тоном вместо мелодии.", kk: "Мұнда белсенді зуммер әуеннің орнына бір ғана үнмен шыңғырар еді." },
    },
    {
      title: { en: "Upload and set the sensitivity", ru: "Загрузите скетч и настройте чувствительность", kk: "Скетчті жүктеп, сезімталдықты баптаңыз" },
      body: {
        en: "Upload the sketch and open the Serial Monitor at 9600 baud. With the plate dry, turn the blue trimmer until the board's DO LED just goes off, then back a little more. Sprinkle a few drops on the plate: the DO LED lights, the melody plays and the blue LED turns on. The rain is reported as stopped after the plate has stayed dry for one minute.",
        ru: "Загрузите скетч и откройте Serial Monitor на 9600 бод. На сухой пластине крутите синий подстроечник, пока светодиод DO на плате не погаснет, и ещё немного дальше. Брызните на пластину несколько капель: загорится DO, заиграет мелодия и включится синий светодиод. Дождь считается закончившимся, когда пластина остаётся сухой целую минуту.",
        kk: "Скетчті жүктеп, Serial Monitor-ды 9600 бодта ашыңыз. Пластина құрғақ кезде платадағы DO шамы сөнгенше көк реттегішті бұраңыз, содан кейін тағы сәл бұраңыз. Пластинаға бірнеше тамшы шашыңыз: DO шамы жанып, әуен ойнайды және көк жарық диоды қосылады. Пластина бір минут бойы құрғақ тұрса, жаңбыр тоқтады деп есептеледі.",
      },
      expect: { en: "\"Rain! Close the windows\" and the melody within a second of the first drops.", ru: "«Rain! Close the windows» и мелодия в течение секунды после первых капель.", kk: "Алғашқы тамшылардан кейін бір секунд ішінде «Rain! Close the windows» және әуен." },
      mistake: { en: "With the trimmer too sensitive, morning dew or humid air triggers the alarm.", ru: "При слишком чувствительной настройке тревогу вызывают утренняя роса или влажный воздух.", kk: "Тым сезімтал баптауда таңғы шық немесе ылғалды ауа дабыл тудырады." },
    },
    {
      title: { en: "Mount the plate outside", ru: "Установите пластину снаружи", kk: "Пластинаны сыртқа орнатыңыз" },
      body: {
        en: "Fix the plate on the outer windowsill, tilted about 30° so water runs off and it dries faster after the rain. Run the thin two-wire cable through the window seal to the comparator board indoors; extend it with any two-core cable if needed. Keep the Uno and buzzer somewhere you will hear them.",
        ru: "Закрепите пластину на внешнем подоконнике под наклоном около 30°, чтобы вода стекала и после дождя она быстрее высыхала. Протяните тонкий двухпроводной кабель через уплотнитель окна к плате компаратора в доме; при необходимости удлините любым двухжильным кабелем. Uno и зуммер поставьте там, где вы их услышите.",
        kk: "Пластинаны сыртқы терезе алдына шамамен 30° еңкейтіп бекітіңіз, сонда су ағып кетеді және жаңбырдан кейін ол тезірек кебеді. Жіңішке екі сымды кабельді терезе тығыздағышы арқылы үйдегі компаратор платасына өткізіңіз; қажет болса, кез келген екі талшықты кабельмен ұзартыңыз. Uno мен зуммерді естілетін жерге қойыңыз.",
      },
      expect: { en: "The plate catches rain, everything else stays dry indoors.", ru: "Пластина ловит дождь, всё остальное сухое внутри.", kk: "Пластина жаңбырды қабылдайды, қалғанының бәрі үйде құрғақ тұр." },
      mistake: { en: "Laying the plate flat: puddles stay on it for hours and the \"stopped\" message comes very late.", ru: "Положить пластину горизонтально: на ней часами стоят лужицы, и сообщение «stopped» приходит очень поздно.", kk: "Пластинаны жалпақ қою: үстінде сағаттап шалшық тұрып, «stopped» хабары өте кеш келеді." },
    },
  ],
  code: [{
    filename: "rain_alert.ino",
    language: "cpp",
    libraries: [],
    source: `const int RAIN_DO_PIN = 2;      // LOW when wet (threshold set by the blue trimmer)
const int RAIN_AO_PIN = A0;     // raw level: lower value = wetter
const int BUZZER_PIN = 9;       // passive buzzer, driven with tone()
const int LED_PIN = 10;

const unsigned long REMIND_MS = 300000UL;     // repeat the melody every 5 min while it rains
const unsigned long DRY_CONFIRM_MS = 60000UL; // plate dry this long = rain stopped

const int MELODY[] = { 1047, 784, 880, 659, 784, 1047 };   // C6 G5 A5 E5 G5 C6
const int NOTE_MS[] = { 150, 150, 150, 150, 150, 400 };

bool raining = false;
unsigned long lastMelody = 0, lastWet = 0, lastPrint = 0;

void playMelody() {
  for (int i = 0; i < 6; i++) {
    tone(BUZZER_PIN, MELODY[i], NOTE_MS[i]);
    delay(NOTE_MS[i] * 13 / 10);              // short gap between notes
  }
  noTone(BUZZER_PIN);
}

void setup() {
  Serial.begin(9600);
  pinMode(RAIN_DO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.println(F("Rain alert ready"));
}

void loop() {
  unsigned long now = millis();
  bool wet = digitalRead(RAIN_DO_PIN) == LOW;
  int wetness = map(analogRead(RAIN_AO_PIN), 1023, 0, 0, 100);   // 0 % dry .. 100 % soaked

  if (wet) {
    lastWet = now;
    if (!raining) {
      raining = true;
      Serial.println(F("Rain! Close the windows"));
      playMelody();
      lastMelody = millis();
    } else if (now - lastMelody >= REMIND_MS) {
      Serial.println(F("Still raining - reminder"));
      playMelody();
      lastMelody = millis();
    }
  } else if (raining && now - lastWet >= DRY_CONFIRM_MS) {
    raining = false;
    Serial.println(F("Rain stopped"));
  }

  digitalWrite(LED_PIN, raining);

  if (now - lastPrint >= 2000) {
    lastPrint = now;
    Serial.print(F("wetness="));
    Serial.print(wetness);
    Serial.println(wet ? F("% DO=wet") : F("% DO=dry"));
  }
  delay(50);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The alarm never fires, even with water on the plate", ru: "Тревога не срабатывает даже с водой на пластине", kk: "Пластинада су болса да дабыл іске қосылмайды" },
      cause: { en: "The trimmer threshold is set too far, or DO is not on D2.", ru: "Порог подстроечника выкручен слишком далеко, или DO не на D2.", kk: "Реттегіш шегі тым алысқа бұралған немесе DO D2-де емес." },
      fix: { en: "Wet the plate and turn the trimmer back until the DO LED lights; check the D2 wire.", ru: "Намочите пластину и поверните подстроечник обратно, пока не загорится DO; проверьте провод D2.", kk: "Пластинаны сулап, DO шамы жанғанша реттегішті кері бұраңыз; D2 сымын тексеріңіз." },
    },
    {
      symptom: { en: "It plays the melody on a dry, foggy morning", ru: "Мелодия играет сухим туманным утром", kk: "Құрғақ, тұманды таңертең әуен ойнайды" },
      cause: { en: "Dew or condensation on the plate crosses a threshold that is set too sensitive.", ru: "Роса или конденсат на пластине превышают слишком чувствительный порог.", kk: "Пластинадағы шық не конденсат тым сезімтал шектен асады." },
      fix: { en: "Turn the trimmer a little towards less sensitive, and tilt the plate so moisture runs off.", ru: "Поверните подстроечник немного в сторону меньшей чувствительности и наклоните пластину, чтобы влага стекала.", kk: "Реттегішті сезімталдығы азырақ жаққа сәл бұраңыз және ылғал ағып кетуі үшін пластинаны еңкейтіңіз." },
    },
    {
      symptom: { en: "The plate's traces turn green or dark after some weeks", ru: "Дорожки пластины через несколько недель зеленеют или темнеют", kk: "Бірнеше аптадан кейін пластинаның жолдары жасылданады не қараяды" },
      cause: { en: "The plate is always powered, and DC current through rain water slowly corrodes the nickel and copper.", ru: "Пластина всегда под напряжением, и постоянный ток через дождевую воду медленно разъедает никель и медь.", kk: "Пластина үнемі кернеуде тұрады, ал жаңбыр суы арқылы өтетін тұрақты ток никель мен мысты баяу жейді." },
      fix: { en: "Wipe it clean with a little vinegar and dry it; replacement plates cost very little. A tilted plate that dries quickly lasts longer.", ru: "Протрите её небольшим количеством уксуса и высушите; запасные пластины стоят копейки. Наклонная, быстро высыхающая пластина служит дольше.", kk: "Оны аздап сірке суымен сүртіп, кептіріңіз; қосалқы пластиналар өте арзан. Еңкейтілген, тез кебетін пластина ұзағырақ қызмет етеді." },
    },
  ],
  safety: [
    { en: "Only the plate goes outside. Keep the Uno, the LM393 board and the USB power supply indoors and dry.", ru: "Наружу выносится только пластина. Uno, плата LM393 и USB-блок питания остаются в доме, в сухом месте.", kk: "Сыртқа тек пластина шығарылады. Uno, LM393 платасы және USB қуат блогы үйде, құрғақ жерде қалады." },
  ],
  simulation: {
    baud: 9600,
    lines: [
      "Rain alert ready",
      "wetness=0% DO=dry",
      "wetness=1% DO=dry",
      "Rain! Close the windows",
      "wetness=38% DO=wet",
      "wetness=52% DO=wet",
      "Still raining - reminder",
      "wetness=12% DO=dry",
      "Rain stopped",
    ],
    leds: [{ label: "RAIN", color: "#1E88E5" }],
  },
} satisfies GuideContent;
