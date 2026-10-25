import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "mp3-player-dfplayer",
  status: "unverified",
  platform: "arduino",
  board: "arduino-uno",
  category: "audio",
  robotics: false,
  difficulty: "beginner",
  hours: 2,
  costUsd: 14,
  xpReward: 150,
  title: {
    en: "MP3 Player with DFPlayer Mini",
    ru: "MP3-плеер на DFPlayer Mini",
    kk: "DFPlayer Mini негізіндегі MP3 ойнатқыш",
  },
  summary: {
    en: "A DFPlayer Mini plays MP3s from a microSD card straight into a small speaker. Three buttons skip back, play/pause and skip forward, and the next track starts by itself.",
    ru: "DFPlayer Mini играет MP3 с карты microSD прямо в небольшой динамик. Три кнопки: назад, пауза/воспроизведение и вперёд, а следующий трек включается сам.",
    kk: "DFPlayer Mini microSD картасындағы MP3 файлдарын шағын динамикке тікелей ойнатады. Үш батырма: артқа, ойнату/кідірту және алға, ал келесі трек өзі қосылады.",
  },
  parts: [
    { component: "arduino-uno", qty: 1, spec: { en: "5 V logic, USB powered", ru: "логика 5 В, питание от USB", kk: "5 В логика, USB қуаты" }, role: { en: "Controller", ru: "Контроллер", kk: "Контроллер" } },
    { component: "dfplayer-mini", qty: 1, spec: { en: "with a microSD card (FAT32, up to 32 GB)", ru: "с картой microSD (FAT32, до 32 ГБ)", kk: "microSD картасымен (FAT32, 32 ГБ-қа дейін)" }, role: { en: "MP3 decoder and 3 W amplifier", ru: "MP3-декодер и усилитель 3 Вт", kk: "MP3 декодері және 3 Вт күшейткіш" } },
    { component: "speaker-8ohm", qty: 1, spec: { en: "8 Ω, 0.5–3 W, 40–50 mm", ru: "8 Ом, 0,5–3 Вт, 40–50 мм", kk: "8 Ом, 0,5–3 Вт, 40–50 мм" }, role: { en: "Sound output", ru: "Вывод звука", kk: "Дыбыс шығару" } },
    { component: "resistor", qty: 2, spec: { en: "1 kΩ, ¼ W", ru: "1 кОм, ¼ Вт", kk: "1 кОм, ¼ Вт" }, role: { en: "Series resistors on both serial lines", ru: "Последовательные резисторы на обеих линиях UART", kk: "UART-тың екі сызығындағы тізбектей резисторлар" } },
    { component: "push-button", qty: 3, spec: { en: "6×6 mm tactile", ru: "тактовая 6×6 мм", kk: "6×6 мм тактілі" }, role: { en: "Previous, play/pause, next", ru: "Назад, пауза/воспроизведение, вперёд", kk: "Артқа, ойнату/кідірту, алға" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 16, spec: { en: "male-male", ru: "папа-папа", kk: "аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "mp3", component: "dfplayer-mini", label: "DFPlayer Mini" },
    { id: "spk", component: "speaker-8ohm", label: "8 Ω speaker" },
    { id: "r_rx", component: "resistor", label: "1 kΩ" },
    { id: "r_tx", component: "resistor", label: "1 kΩ" },
    { id: "btn_prev", component: "push-button", label: "Prev" },
    { id: "btn_play", component: "push-button", label: "Play/Pause" },
    { id: "btn_next", component: "push-button", label: "Next" },
  ],
  connections: [
    { from: "board.5V", to: "mp3.VCC", color: "red" },
    { from: "mp3.GND", to: "board.GND", color: "black" },
    { from: "board.D11", to: "r_rx.A", color: "orange", note: { en: "SoftwareSerial TX of the Arduino", ru: "SoftwareSerial TX Arduino", kk: "Arduino-ның SoftwareSerial TX-і" } },
    { from: "r_rx.B", to: "mp3.RX", color: "orange", note: { en: "1 kΩ drops the 5 V signal for the 3.3 V input", ru: "1 кОм гасит сигнал 5 В для входа 3,3 В", kk: "1 кОм 3,3 В кірісі үшін 5 В сигналды әлсіретеді" } },
    { from: "mp3.TX", to: "r_tx.A", color: "yellow" },
    { from: "r_tx.B", to: "board.D10", color: "yellow", note: { en: "SoftwareSerial RX; 1 kΩ protects the pin", ru: "SoftwareSerial RX; 1 кОм защищает пин", kk: "SoftwareSerial RX; 1 кОм пинді қорғайды" } },
    { from: "mp3.BUSY", to: "board.D5", color: "purple", note: { en: "LOW while a track is playing", ru: "LOW, пока играет трек", kk: "Трек ойнап тұрғанда LOW" } },
    { from: "mp3.SPK_1", to: "spk.+", color: "red" },
    { from: "mp3.SPK_2", to: "spk.-", color: "black", note: { en: "bridged amp: never connect SPK_2 to GND", ru: "мостовой усилитель: SPK_2 не соединять с GND", kk: "көпірлік күшейткіш: SPK_2-ні GND-ге қоспаңыз" } },
    { from: "board.D2", to: "btn_prev.1", color: "blue" },
    { from: "btn_prev.2", to: "board.GND2", color: "black" },
    { from: "board.D3", to: "btn_play.1", color: "green" },
    { from: "btn_play.2", to: "board.GND2", color: "black" },
    { from: "board.D4", to: "btn_next.1", color: "blue" },
    { from: "btn_next.2", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Prepare the microSD card", ru: "Подготовьте карту microSD", kk: "microSD картасын дайындаңыз" },
      body: {
        en: "Format a microSD card (32 GB or smaller) as FAT32. Create a folder named 01 in the root and copy your songs into it as 001.mp3, 002.mp3, 003.mp3 … (a name may continue after the number, e.g. 001_intro.mp3). The sketch plays them by number, so the copy order does not matter. On a Mac, eject the card properly so no hidden ._ files are left behind.",
        ru: "Отформатируйте карту microSD (не больше 32 ГБ) в FAT32. Создайте в корне папку 01 и скопируйте в неё песни под именами 001.mp3, 002.mp3, 003.mp3 … (после номера можно дописать название, например 001_intro.mp3). Скетч включает файлы по номеру, поэтому порядок копирования не важен. На Mac извлекайте карту правильно, чтобы не осталось скрытых файлов ._.",
        kk: "microSD картасын (32 ГБ-тан аспайтын) FAT32 форматына пішімдеңіз. Түбірде 01 атты қалта жасап, әндерді оған 001.mp3, 002.mp3, 003.mp3 … деген атпен көшіріңіз (нөмірден кейін атауын жазуға болады, мысалы 001_intro.mp3). Скетч файлдарды нөмірі бойынша қосады, сондықтан көшіру реті маңызды емес. Mac-те картаны дұрыс шығарыңыз, әйтпесе жасырын ._ файлдары қалып қояды.",
      },
      expect: { en: "The card shows one folder 01 with files numbered from 001.", ru: "На карте одна папка 01 с файлами, пронумерованными с 001.", kk: "Картада 001-ден бастап нөмірленген файлдары бар бір 01 қалтасы бар." },
      mistake: { en: "exFAT or NTFS cards and names like song1.mp3 are not found by the player.", ru: "Карты в exFAT или NTFS и имена вроде song1.mp3 плеер не находит.", kk: "exFAT немесе NTFS карталарын және song1.mp3 сияқты атауларды ойнатқыш таппайды." },
    },
    {
      title: { en: "Power the DFPlayer and connect the speaker", ru: "Подайте питание на DFPlayer и подключите динамик", kk: "DFPlayer-ге қуат беріп, динамикті қосыңыз" },
      body: {
        en: "Insert the card and place the DFPlayer across the breadboard gap, card slot facing out. Wire VCC to the Arduino 5V and GND to GND. Connect the speaker to SPK_1 and SPK_2. The built-in amplifier is a bridged output, so the speaker goes between those two pins and neither of them touches GND.",
        ru: "Вставьте карту и установите DFPlayer поперёк канавки макетки слотом наружу. Подключите VCC к 5V Arduino, GND к GND. Динамик подключите к SPK_1 и SPK_2. Встроенный усилитель мостовой, поэтому динамик стоит между этими двумя выводами и ни один из них не соединяется с GND.",
        kk: "Картаны салып, DFPlayer-ді макет тақтасының ойығына көлденең, слотын сыртқа қаратып қойыңыз. VCC-ні Arduino-ның 5V-іне, GND-ні GND-ге қосыңыз. Динамикті SPK_1 мен SPK_2-ге жалғаңыз. Ішкі күшейткіш көпірлік, сондықтан динамик осы екі шықпаның арасында тұрады және олардың ешқайсысы GND-ге тимейді.",
      },
      expect: { en: "Nothing plays yet, but the module's small LED stays off and nothing gets warm.", ru: "Пока ничего не играет, светодиод модуля не горит, ничего не греется.", kk: "Әзірге ештеңе ойнамайды, модуль жарық диоды жанбайды, ештеңе қызбайды." },
      mistake: { en: "Wiring SPK_2 to GND shorts the amplifier output.", ru: "Соединение SPK_2 с GND замыкает выход усилителя.", kk: "SPK_2-ні GND-ге қосу күшейткіш шығысын тұйықтайды." },
    },
    {
      title: { en: "Add the serial link with 1 kΩ resistors", ru: "Подключите UART через резисторы 1 кОм", kk: "UART-ты 1 кОм резисторлар арқылы қосыңыз" },
      body: {
        en: "The sketch talks to the DFPlayer with SoftwareSerial on D10 (receive) and D11 (send), keeping D0/D1 free for USB. Wire D11 → 1 kΩ → DFPlayer RX: the DFPlayer logic runs at 3.3 V and the resistor stops the 5 V signal from causing noise and hiss. Wire DFPlayer TX → 1 kΩ → D10; its 3.3 V output is read as HIGH by the Uno, and the resistor protects both pins if one is ever set as an output by mistake. Finally connect BUSY to D5. Leave DAC_L, DAC_R, ADKEY_1/2 and IO_1/2 unconnected: they are for an external amplifier and the stand-alone button mode, and have internal pull-ups.",
        ru: "Скетч общается с DFPlayer через SoftwareSerial на D10 (приём) и D11 (передача), а D0/D1 остаются для USB. Подключите D11 → 1 кОм → RX DFPlayer: логика DFPlayer работает на 3,3 В, и резистор не даёт сигналу 5 В вызывать шум и шипение. Подключите TX DFPlayer → 1 кОм → D10: выход 3,3 В Uno читает как HIGH, а резистор защищает оба пина, если один из них по ошибке станет выходом. В конце соедините BUSY с D5. Выводы DAC_L, DAC_R, ADKEY_1/2 и IO_1/2 оставьте свободными: они для внешнего усилителя и автономного режима с кнопками и имеют внутреннюю подтяжку.",
        kk: "Скетч DFPlayer-мен D10 (қабылдау) және D11 (жіберу) пиндеріндегі SoftwareSerial арқылы сөйлеседі, ал D0/D1 USB үшін бос қалады. D11 → 1 кОм → DFPlayer RX қосыңыз: DFPlayer логикасы 3,3 В-та жұмыс істейді, ал резистор 5 В сигналдың шу мен ысылдауын тудыруына жол бермейді. DFPlayer TX → 1 кОм → D10 қосыңыз: 3,3 В шығысты Uno HIGH деп оқиды, ал резистор пиндердің бірі қателесіп шығыс болып қалса, екеуін де қорғайды. Соңында BUSY-ді D5-ке қосыңыз. DAC_L, DAC_R, ADKEY_1/2 және IO_1/2 шықпаларын бос қалдырыңыз: олар сыртқы күшейткіш пен батырмалы дербес режимге арналған және ішкі тартуы бар.",
      },
      expect: { en: "Two 1 kΩ resistors sit in the TX and RX lines, BUSY goes to D5.", ru: "В линиях TX и RX стоят два резистора 1 кОм, BUSY идёт на D5.", kk: "TX және RX сызықтарында екі 1 кОм резистор тұр, BUSY D5-ке барады." },
      mistake: { en: "Crossing is easy to get wrong: Arduino D11 (send) must reach DFPlayer RX, and DFPlayer TX must reach D10.", ru: "Здесь легко перепутать: D11 Arduino (передача) идёт на RX DFPlayer, а TX DFPlayer на D10.", kk: "Мұнда шатастыру оңай: Arduino D11 (жіберу) DFPlayer RX-ке, ал DFPlayer TX D10-ға барады." },
    },
    {
      title: { en: "Wire the three buttons", ru: "Подключите три кнопки", kk: "Үш батырманы қосыңыз" },
      body: {
        en: "Place the buttons across the gap. Wire one leg of each to D2 (previous), D3 (play/pause) and D4 (next), and the diagonally opposite leg to GND. The sketch enables the internal pull-ups, so no extra resistors are needed: a pin reads LOW only while its button is pressed.",
        ru: "Поставьте кнопки поперёк канавки. Одну ножку каждой подключите к D2 (назад), D3 (пауза/воспроизведение) и D4 (вперёд), а ножку по диагонали к GND. Скетч включает внутренние подтяжки, поэтому лишние резисторы не нужны: пин читает LOW, только пока кнопка нажата.",
        kk: "Батырмаларды ойыққа көлденең қойыңыз. Әрқайсысының бір аяғын D2 (артқа), D3 (ойнату/кідірту) және D4 (алға) пиндеріне, ал диагональ бойынша қарама-қарсы аяғын GND-ге қосыңыз. Скетч ішкі тартуды қосады, сондықтан қосымша резистор керек емес: батырма басылып тұрғанда ғана пин LOW оқиды.",
      },
      expect: { en: "Each button connects its pin to GND only while pressed.", ru: "Каждая кнопка замыкает свой пин на GND только при нажатии.", kk: "Әр батырма өз пинін тек басылғанда GND-ге қосады." },
      mistake: { en: "Two legs on the same side are always connected, so that button looks permanently pressed.", ru: "Две ножки с одной стороны всегда соединены, и кнопка выглядит постоянно нажатой.", kk: "Бір жақтағы екі аяқ әрқашан жалғанған, сондықтан батырма үнемі басылған болып көрінеді." },
    },
    {
      title: { en: "Upload and play", ru: "Загрузите скетч и включите музыку", kk: "Скетчті жүктеп, музыканы қосыңыз" },
      body: {
        en: "Install the DFRobotDFPlayerMini library from the Library Manager, upload the sketch and open the Serial Monitor at 9600 baud. After about a second the player reports how many files are in folder 01 and starts 001. D3 pauses and resumes, D2 and D4 skip. When a song ends, BUSY goes HIGH and the sketch starts the next one, wrapping around after the last file. Change VOLUME (0–30) at the top of the sketch.",
        ru: "Установите библиотеку DFRobotDFPlayerMini через менеджер библиотек, загрузите скетч и откройте Serial Monitor на 9600 бод. Примерно через секунду плеер сообщит, сколько файлов в папке 01, и включит 001. D3 ставит паузу и продолжает, D2 и D4 переключают треки. Когда песня заканчивается, BUSY становится HIGH и скетч включает следующую, после последнего файла снова первую. Громкость задаёт VOLUME (0–30) в начале скетча.",
        kk: "Кітапханалар менеджерінен DFRobotDFPlayerMini кітапханасын орнатып, скетчті жүктеңіз де, Serial Monitor-ды 9600 бодта ашыңыз. Шамамен бір секундтан кейін ойнатқыш 01 қалтасында қанша файл бар екенін хабарлап, 001-ді қосады. D3 кідіртеді және жалғастырады, D2 мен D4 тректерді ауыстырады. Ән біткенде BUSY HIGH болады да, скетч келесісін қосады, соңғы файлдан кейін қайтадан біріншісін. Дыбыс деңгейін скетч басындағы VOLUME (0–30) анықтайды.",
      },
      expect: { en: "Serial Monitor shows \"Tracks in /01: …\" and \"Playing 01/001.mp3\", and music comes out of the speaker.", ru: "В Serial Monitor видно «Tracks in /01: …» и «Playing 01/001.mp3», из динамика звучит музыка.", kk: "Serial Monitor-да «Tracks in /01: …» және «Playing 01/001.mp3» көрінеді, динамиктен музыка шығады." },
      mistake: { en: "Opening the Serial Monitor at a different baud rate shows garbage, not a broken player.", ru: "Если открыть Serial Monitor на другой скорости, будут «кракозябры», а не сломанный плеер.", kk: "Serial Monitor-ды басқа жылдамдықта ашсаңыз, түсініксіз таңбалар шығады, бұл ойнатқыштың бұзылғаны емес." },
    },
  ],
  code: [{
    filename: "mp3_player.ino",
    language: "cpp",
    libraries: ["DFRobotDFPlayerMini"],
    source: `#include <SoftwareSerial.h>
#include <DFRobotDFPlayerMini.h>

const int MP3_RX_PIN = 10;   // Arduino receives here  <- 1 kOhm <- DFPlayer TX
const int MP3_TX_PIN = 11;   // Arduino sends here     -> 1 kOhm -> DFPlayer RX
const int BUSY_PIN = 5;      // DFPlayer BUSY: LOW while a track is playing
const int BTN_PREV = 2, BTN_PLAY = 3, BTN_NEXT = 4;

const int VOLUME = 20;       // 0..30
const int FOLDER = 1;        // folder "01" on the card, files 001.mp3, 002.mp3, ...

SoftwareSerial mp3Serial(MP3_RX_PIN, MP3_TX_PIN);
DFRobotDFPlayerMini player;

struct Button { int pin; bool last; unsigned long changed; };
Button prevBtn = {BTN_PREV, HIGH, 0}, playBtn = {BTN_PLAY, HIGH, 0}, nextBtn = {BTN_NEXT, HIGH, 0};

int track = 1;
int trackCount = 0;
bool paused = false;
bool wasPlaying = false;
unsigned long trackStarted = 0;

// true once per press (falling edge), with 30 ms debounce
bool pressed(Button &b) {
  bool now = digitalRead(b.pin);
  if (now != b.last && millis() - b.changed > 30) {
    b.changed = millis();
    b.last = now;
    return now == LOW;
  }
  return false;
}

void playTrack(int n) {
  if (trackCount <= 0) return;
  if (n < 1) n = trackCount;        // wrap around
  if (n > trackCount) n = 1;
  track = n;
  player.playFolder(FOLDER, track);
  paused = false;
  trackStarted = millis();
  char name[20];
  snprintf(name, sizeof(name), "01/%03d.mp3", track);
  Serial.print(F("Playing "));
  Serial.println(name);
}

void setup() {
  Serial.begin(9600);
  mp3Serial.begin(9600);            // the DFPlayer always talks at 9600 baud
  pinMode(BTN_PREV, INPUT_PULLUP);
  pinMode(BTN_PLAY, INPUT_PULLUP);
  pinMode(BTN_NEXT, INPUT_PULLUP);
  pinMode(BUSY_PIN, INPUT);

  Serial.println(F("DFPlayer starting..."));
  if (!player.begin(mp3Serial)) {
    Serial.println(F("DFPlayer not found: check RX/TX wiring and the microSD card"));
    while (true) delay(1000);
  }
  player.volume(VOLUME);
  delay(100);
  trackCount = player.readFileCountsInFolder(FOLDER);
  Serial.print(F("Tracks in /01: "));
  Serial.println(trackCount);
  if (trackCount <= 0) {
    Serial.println(F("No files found: create folder 01 with 001.mp3, 002.mp3, ..."));
    return;
  }
  playTrack(1);
}

void loop() {
  if (pressed(prevBtn)) playTrack(track - 1);
  if (pressed(nextBtn)) playTrack(track + 1);
  if (pressed(playBtn) && trackCount > 0) {
    if (paused) {
      player.start();
      paused = false;
      Serial.println(F("Resume"));
    } else {
      player.pause();
      paused = true;
      Serial.println(F("Pause"));
    }
  }

  // BUSY goes HIGH when a song ends: start the next one (ignore the short blip right after a track change)
  bool playing = digitalRead(BUSY_PIN) == LOW;
  if (wasPlaying && !playing && !paused && millis() - trackStarted > 1500) {
    Serial.println(F("Track finished"));
    playTrack(track + 1);
  }
  wasPlaying = playing;
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"DFPlayer not found\" in the Serial Monitor", ru: "В Serial Monitor «DFPlayer not found»", kk: "Serial Monitor-да «DFPlayer not found»" },
      cause: { en: "TX and RX are not crossed, the card is missing, or a clone module does not answer the handshake.", ru: "TX и RX не перекрещены, нет карты, или клон модуля не отвечает на рукопожатие.", kk: "TX пен RX айқастырылмаған, карта жоқ немесе модуль клоны қол алысуға жауап бермейді." },
      fix: { en: "Check D11 → 1 kΩ → RX and TX → 1 kΩ → D10, reseat the card. If it still fails, try player.begin(mp3Serial, true, false) to skip the reset some clones dislike.", ru: "Проверьте D11 → 1 кОм → RX и TX → 1 кОм → D10, переставьте карту. Если не помогло, попробуйте player.begin(mp3Serial, true, false), чтобы пропустить сброс, который не любят некоторые клоны.", kk: "D11 → 1 кОм → RX және TX → 1 кОм → D10 тізбегін тексеріп, картаны қайта салыңыз. Көмектеспесе, кейбір клондар ұнатпайтын қайта іске қосуды өткізіп жіберу үшін player.begin(mp3Serial, true, false) қолданып көріңіз." },
    },
    {
      symptom: { en: "\"Tracks in /01: 0\" or -1", ru: "«Tracks in /01: 0» или -1", kk: "«Tracks in /01: 0» немесе -1" },
      cause: { en: "The folder or file names do not follow the 01/001.mp3 pattern, or the card is not FAT32.", ru: "Имена папки или файлов не по шаблону 01/001.mp3, либо карта не в FAT32.", kk: "Қалта немесе файл атаулары 01/001.mp3 үлгісіне сай емес немесе карта FAT32 емес." },
      fix: { en: "Reformat as FAT32, create folder 01 and rename the files to start with three digits.", ru: "Отформатируйте в FAT32, создайте папку 01 и переименуйте файлы так, чтобы они начинались с трёх цифр.", kk: "FAT32-ге қайта пішімдеп, 01 қалтасын жасаңыз да, файлдарды үш цифрдан басталатындай етіп қайта атаңыз." },
    },
    {
      symptom: { en: "Loud hiss or buzzing between songs", ru: "Сильное шипение или гул между песнями", kk: "Әндер арасында қатты ысылдау немесе гуіл" },
      cause: { en: "The 1 kΩ resistor in the RX line is missing, or the speaker wires pick up noise.", ru: "Нет резистора 1 кОм в линии RX, или провода динамика ловят помехи.", kk: "RX сызығында 1 кОм резистор жоқ немесе динамик сымдары кедергі қабылдайды." },
      fix: { en: "Add the 1 kΩ resistor between D11 and RX, keep the speaker wires short and twisted together.", ru: "Поставьте резистор 1 кОм между D11 и RX, сделайте провода динамика короткими и скрутите их вместе.", kk: "D11 мен RX арасына 1 кОм резистор қойып, динамик сымдарын қысқа етіп, бір-біріне ораңыз." },
    },
    {
      symptom: { en: "The Arduino resets at high volume", ru: "Arduino перезагружается на большой громкости", kk: "Дыбыс қатты болғанда Arduino қайта жүктеледі" },
      cause: { en: "Bass peaks draw several hundred mA and the USB 5 V sags.", ru: "Пики баса тянут несколько сотен мА, и 5 В от USB проседает.", kk: "Бас шыңдары бірнеше жүз мА тартады да, USB 5 В-ы төмендейді." },
      fix: { en: "Lower VOLUME to 15–20, or power the Uno from a 7–12 V adapter on the barrel jack.", ru: "Уменьшите VOLUME до 15–20 или питайте Uno от адаптера 7–12 В через круглый разъём.", kk: "VOLUME мәнін 15–20-ға дейін азайтыңыз немесе Uno-ны дөңгелек ұяшық арқылы 7–12 В адаптерден қоректендіріңіз." },
    },
  ],
  safety: [
    { en: "Start at a low volume before holding the speaker near your ears.", ru: "Начинайте с малой громкости, прежде чем подносить динамик к ушам.", kk: "Динамикті құлаққа жақындатпас бұрын дыбысты төмен деңгейден бастаңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["DFPlayer starting...", "Tracks in /01: 12", "Playing 01/001.mp3", "Pause", "Resume", "Playing 01/002.mp3", "Track finished", "Playing 01/003.mp3", "Playing 01/002.mp3"],
    leds: [],
  },
} satisfies GuideContent;
