import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp8266-matrix-clock",
  status: "unverified",
  platform: "esp32",
  board: "esp8266-nodemcu",
  category: "displays",
  robotics: false,
  difficulty: "intermediate",
  hours: 2.5,
  costUsd: 14,
  xpReward: 200,
  title: {
    en: "ESP8266 LED Matrix Wi-Fi Clock",
    ru: "Wi-Fi часы на LED-матрице и ESP8266",
    kk: "ESP8266 және LED матрицасындағы Wi-Fi сағат",
  },
  summary: {
    en: "A 32×8 MAX7219 matrix shows the time with a blinking colon, scrolls the date every minute and dims at night. Time comes from NTP, so it never needs setting.",
    ru: "Матрица MAX7219 32×8 показывает время с мигающим двоеточием, раз в минуту прокручивает дату и приглушается ночью. Время приходит по NTP, настраивать его не нужно.",
    kk: "32×8 MAX7219 матрицасы жыпылықтайтын қос нүктемен уақытты көрсетеді, әр минут сайын күнді жылжытып шығарады және түнде күңгірттенеді. Уақыт NTP арқылы келеді, оны баптау қажет емес.",
  },
  parts: [
    { component: "esp8266-nodemcu", qty: 1, spec: { en: "ESP-12E NodeMCU", ru: "ESP-12E NodeMCU", kk: "ESP-12E NodeMCU" }, role: { en: "Wi-Fi, NTP time, display driver", ru: "Wi-Fi, время NTP, управление дисплеем", kk: "Wi-Fi, NTP уақыты, дисплейді басқару" } },
    { component: "max7219-matrix", qty: 1, spec: { en: "4-in-1 FC-16 module, 32×8 red LEDs", ru: "модуль 4-в-1 FC-16, 32×8 красных светодиодов", kk: "4-і-1 FC-16 модулі, 32×8 қызыл жарық диоды" }, role: { en: "Clock display", ru: "Дисплей часов", kk: "Сағат дисплейі" } },
    { component: "level-shifter", qty: 1, spec: { en: "4-channel BSS138, 3.3 V ↔ 5 V", ru: "4-канальный BSS138, 3,3 В ↔ 5 В", kk: "4 арналы BSS138, 3,3 В ↔ 5 В" }, role: { en: "Lifts DIN/CLK/CS to the 5 V levels the MAX7219 expects", ru: "Поднимает DIN/CLK/CS до 5-вольтовых уровней MAX7219", kk: "DIN/CLK/CS сигналдарын MAX7219 күтетін 5 В деңгейіне көтереді" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V 1 A USB charger, cable split to a breadboard rail", ru: "USB-зарядка 5 В 1 А, кабель выведен на шину макетки", kk: "5 В 1 А USB зарядтағыш, кабелі макет шинасына шығарылған" }, role: { en: "Powers the matrix and the NodeMCU", ru: "Питает матрицу и NodeMCU", kk: "Матрица мен NodeMCU-ды қоректендіреді" } },
    { component: "breadboard", qty: 1, spec: { en: "830 points", ru: "830 точек", kk: "830 нүкте" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 14, spec: { en: "male-male and male-female", ru: "папа-папа и папа-мама", kk: "аталық-аталық және аталық-аналық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "psu", component: "usb-5v", label: "5 V 1 A" },
    { id: "ls", component: "level-shifter", label: "BSS138 3.3↔5 V" },
    { id: "mx", component: "max7219-matrix", label: "MAX7219 4-in-1" },
  ],
  connections: [
    { from: "psu.5V", to: "board.VIN", color: "red" },
    { from: "psu.GND", to: "board.GND", color: "black" },
    { from: "psu.5V", to: "mx.VCC", color: "red", note: { en: "the matrix takes its power straight from the 5 V supply", ru: "матрица питается прямо от источника 5 В", kk: "матрица тікелей 5 В көзінен қоректенеді" } },
    { from: "mx.GND", to: "board.GND2", color: "black" },
    { from: "ls.LV", to: "board.3V3", color: "orange", note: { en: "low side reference: 3.3 V", ru: "опора низкой стороны: 3,3 В", kk: "төменгі жақ тірегі: 3,3 В" } },
    { from: "ls.HV", to: "psu.5V", color: "red", note: { en: "high side reference: 5 V", ru: "опора высокой стороны: 5 В", kk: "жоғарғы жақ тірегі: 5 В" } },
    { from: "ls.GND", to: "board.GND3", color: "black" },
    { from: "board.D7", to: "ls.LV1", color: "green" },
    { from: "ls.HV1", to: "mx.DIN", color: "green" },
    { from: "board.D5", to: "ls.LV2", color: "yellow" },
    { from: "ls.HV2", to: "mx.CLK", color: "yellow" },
    { from: "board.D1", to: "ls.LV3", color: "blue", note: { en: "not D8: the shifter's pull-up would stop GPIO15 from booting", ru: "не D8: подтяжка шифтера не даст GPIO15 загрузиться", kk: "D8 емес: түрлендіргіштің тартқышы GPIO15-тің жүктелуіне кедергі жасайды" } },
    { from: "ls.HV3", to: "mx.CS", color: "blue" },
  ],
  steps: [
    {
      title: { en: "Why a level shifter", ru: "Зачем преобразователь уровней", kk: "Деңгей түрлендіргіші не үшін керек" },
      body: {
        en: "The MAX7219 runs at 5 V and wants a logic HIGH of at least 3.5 V; the ESP8266 only gives 3.3 V. Some modules work anyway, then glitch when warm or with a long cable. The BSS138 shifter lifts DIN, CLK and CS to 5 V cleanly. Nothing flows back to the ESP8266, because the MAX7219 never drives these lines.",
        ru: "MAX7219 работает от 5 В и ждёт логическую единицу не ниже 3,5 В, а ESP8266 выдаёт только 3,3 В. Некоторые модули всё равно работают, но сбоят, нагревшись или с длинным кабелем. Преобразователь на BSS138 чисто поднимает DIN, CLK и CS до 5 В. Обратно на ESP8266 ничего не идёт, потому что MAX7219 эти линии никогда не ведёт сам.",
        kk: "MAX7219 5 В-пен жұмыс істейді және логикалық бірдің кемінде 3,5 В болуын күтеді, ал ESP8266 тек 3,3 В береді. Кейбір модульдер бәрібір істейді, бірақ қызғанда не ұзын кабельмен ақаулайды. BSS138 түрлендіргіші DIN, CLK және CS сигналдарын 5 В-қа таза көтереді. ESP8266-ға кері ештеңе келмейді, себебі MAX7219 бұл сызықтарды ешқашан өзі басқармайды.",
      },
      expect: { en: "You know which side is which: LV = 3.3 V side to the NodeMCU, HV = 5 V side to the matrix.", ru: "Ясно, где какая сторона: LV — сторона 3,3 В к NodeMCU, HV — сторона 5 В к матрице.", kk: "Қай жақ қайда екені анық: LV — NodeMCU-ға баратын 3,3 В жағы, HV — матрицаға баратын 5 В жағы." },
      mistake: { en: "Swapping LV and HV on the shifter: the signals then arrive at 3.3 V again, or worse, 5 V reaches the ESP8266.", ru: "Перепутать LV и HV: сигналы снова придут с уровнем 3,3 В, а хуже того, 5 В попадут на ESP8266.", kk: "LV мен HV-ны шатастыру: сигналдар қайтадан 3,3 В деңгейімен келеді, одан да жаманы, ESP8266-ға 5 В барады." },
    },
    {
      title: { en: "Wire power", ru: "Подключите питание", kk: "Қуатты қосыңыз" },
      body: {
        en: "Put the 5 V supply on one breadboard rail pair. 5 V goes to NodeMCU VIN, matrix VCC and shifter HV; GND to NodeMCU GND, matrix GND and shifter GND. Connect shifter LV to the NodeMCU 3V3 pin. At low brightness the 32×8 matrix draws about 100–200 mA, far more than the 3.3 V regulator could give, which is why it sits on 5 V.",
        ru: "Подайте 5 В на пару шин макетки. 5 В идут на VIN NodeMCU, VCC матрицы и HV шифтера; GND — на GND NodeMCU, матрицы и шифтера. LV шифтера подключите к пину 3V3 NodeMCU. На малой яркости матрица 32×8 берёт около 100–200 мА, гораздо больше, чем дал бы стабилизатор 3,3 В, поэтому она сидит на 5 В.",
        kk: "5 В-ты макет тақтасының бір жұп шинасына беріңіз. 5 В NodeMCU VIN, матрица VCC және түрлендіргіш HV пиндеріне; GND — NodeMCU, матрица және түрлендіргіш GND-не барады. Түрлендіргіштің LV пинін NodeMCU 3V3 пиніне қосыңыз. Төмен жарықтықта 32×8 матрица шамамен 100–200 мА алады, бұл 3,3 В стабилизаторы бере алатыннан әлдеқайда көп, сондықтан ол 5 В-та тұр.",
      },
      expect: { en: "Plug in the supply: the NodeMCU LED blinks, the matrix may light randomly until the sketch runs.", ru: "Включите питание: мигнёт светодиод NodeMCU, матрица может хаотично светиться, пока не запустится скетч.", kk: "Қуатты қосыңыз: NodeMCU шамы жыпылықтайды, скетч іске қосылғанша матрица ретсіз жануы мүмкін." },
      mistake: { en: "Feeding the matrix from the NodeMCU 3V3 pin: it flickers, and the ESP8266 resets when many LEDs light.", ru: "Питать матрицу от 3V3 NodeMCU: она мерцает, а ESP8266 перезагружается, когда горит много светодиодов.", kk: "Матрицаны NodeMCU 3V3-тен қоректендіру: ол жыпылықтайды, ал көп жарық диоды жанғанда ESP8266 қайта жүктеледі." },
    },
    {
      title: { en: "Wire the three data lines", ru: "Подключите три линии данных", kk: "Үш деректер сызығын қосыңыз" },
      body: {
        en: "D7 → LV1, HV1 → DIN. D5 → LV2, HV2 → CLK. D1 → LV3, HV3 → CS. Use the matrix's input header (the end marked DIN, not DOUT). CS is on D1 rather than the usual D8: the shifter has 10 kΩ pull-ups on the LV side, and GPIO15 (D8) pulled HIGH at power-up stops the ESP8266 from booting.",
        ru: "D7 → LV1, HV1 → DIN. D5 → LV2, HV2 → CLK. D1 → LV3, HV3 → CS. Подключайтесь к входной гребёнке матрицы (сторона с надписью DIN, не DOUT). CS стоит на D1, а не на привычном D8: у шифтера на стороне LV есть подтяжки 10 кОм, а GPIO15 (D8), подтянутый к HIGH при включении, не даёт ESP8266 загрузиться.",
        kk: "D7 → LV1, HV1 → DIN. D5 → LV2, HV2 → CLK. D1 → LV3, HV3 → CS. Матрицаның кіріс тарағына қосылыңыз (DOUT емес, DIN деп жазылған жағы). CS әдеттегі D8 емес, D1-де тұр: түрлендіргіштің LV жағында 10 кОм тартқыштар бар, ал қосылғанда HIGH-қа тартылған GPIO15 (D8) ESP8266-ның жүктелуіне жол бермейді.",
      },
      expect: { en: "Three signal paths, each passing through one shifter channel.", ru: "Три сигнальные линии, каждая через свой канал шифтера.", kk: "Үш сигнал жолы, әрқайсысы түрлендіргіштің өз арнасы арқылы өтеді." },
      mistake: { en: "Wiring to the DOUT end: the display stays dark because data enters the chain from the wrong side.", ru: "Подключиться к стороне DOUT: дисплей тёмный, потому что данные входят в цепочку не с той стороны.", kk: "DOUT жағына қосу: деректер тізбекке басқа жақтан кіретіндіктен, дисплей қараңғы қалады." },
    },
    {
      title: { en: "Upload the clock", ru: "Загрузите часы", kk: "Сағатты жүктеңіз" },
      body: {
        en: "Install \"MD_Parola\" and \"MD_MAX72XX\" in Library Manager. Fill in WIFI_SSID, WIFI_PASS and TZ_INFO (\"<+05>-5\" for Kazakhstan, \"MSK-3\" for Moscow). Select \"NodeMCU 1.0 (ESP-12E Module)\", unplug the 5 V supply, upload over USB and open the Serial Monitor at 115200 baud.",
        ru: "Установите «MD_Parola» и «MD_MAX72XX» через Library Manager. Заполните WIFI_SSID, WIFI_PASS и TZ_INFO («<+05>-5» для Казахстана, «MSK-3» для Москвы). Выберите «NodeMCU 1.0 (ESP-12E Module)», отключите питание 5 В, загрузите скетч по USB и откройте Serial Monitor на 115200 бод.",
        kk: "Library Manager арқылы «MD_Parola» мен «MD_MAX72XX» орнатыңыз. WIFI_SSID, WIFI_PASS және TZ_INFO толтырыңыз (Қазақстанға «<+05>-5», Мәскеуге «MSK-3»). «NodeMCU 1.0 (ESP-12E Module)» таңдап, 5 В қуатты ажыратып, скетчті USB арқылы жүктеңіз де, Serial Monitor-ды 115200 бодта ашыңыз.",
      },
      expect: { en: "\"WiFi\" on the matrix, then \"sync\", then the time with a blinking colon.", ru: "На матрице «WiFi», затем «sync», затем время с мигающим двоеточием.", kk: "Матрицада «WiFi», содан кейін «sync», содан соң жыпылықтайтын қос нүктелі уақыт." },
      mistake: { en: "Text mirrored or chopped into 8×8 blocks: the module is not FC-16 type; try PAROLA_HW or GENERIC_HW in HARDWARE_TYPE.", ru: "Текст зеркальный или разрезан на блоки 8×8: модуль не типа FC-16; попробуйте PAROLA_HW или GENERIC_HW в HARDWARE_TYPE.", kk: "Мәтін айналы немесе 8×8 блоктарға бөлінген: модуль FC-16 түрі емес; HARDWARE_TYPE ішінде PAROLA_HW не GENERIC_HW қолданып көріңіз." },
    },
    {
      title: { en: "Date scroll and night dimming", ru: "Прокрутка даты и ночная яркость", kk: "Күнді жылжыту және түнгі жарықтық" },
      body: {
        en: "At second 30 of every minute the date scrolls across, e.g. \"Sun 25 Oct 2026\", then the clock returns. Between NIGHT_FROM and NIGHT_TO (22 to 7 by default) brightness drops to 0, the dimmest level. Change DAY_BRIGHTNESS (0–15) to suit the room.",
        ru: "На 30-й секунде каждой минуты по экрану проезжает дата, например «Sun 25 Oct 2026», затем возвращаются часы. С NIGHT_FROM до NIGHT_TO (по умолчанию с 22 до 7) яркость падает до 0, самой тусклой. DAY_BRIGHTNESS (0–15) подберите под комнату.",
        kk: "Әр минуттың 30-секундында экраннан күн өтеді, мысалы «Sun 25 Oct 2026», содан кейін сағат қайтады. NIGHT_FROM мен NIGHT_TO аралығында (әдепкі бойынша 22-ден 7-ге дейін) жарықтық ең күңгірт деңгей 0-ге түседі. DAY_BRIGHTNESS (0–15) мәнін бөлмеге сай таңдаңыз.",
      },
      expect: { en: "The monitor prints \"scroll: Sun 25 Oct 2026\" once a minute.", ru: "Монитор раз в минуту печатает «scroll: Sun 25 Oct 2026».", kk: "Монитор минутына бір рет «scroll: Sun 25 Oct 2026» деп шығарады." },
      mistake: { en: "Setting DAY_BRIGHTNESS to 15 on a 1 A supply: a bright, full display can draw over 1 A and reset the board.", ru: "Поставить DAY_BRIGHTNESS = 15 при блоке на 1 А: яркий полный экран может взять больше 1 А и сбросить плату.", kk: "1 А қоректендіргіште DAY_BRIGHTNESS = 15 қою: жарық, толық экран 1 А-дан көп алып, тақтаны қайта жүктеуі мүмкін." },
    },
  ],
  code: [{
    filename: "matrix_clock.ino",
    language: "cpp",
    libraries: ["MD_Parola", "MD_MAX72XX"],
    source: `#include <ESP8266WiFi.h>
#include <time.h>
#include <MD_Parola.h>
#include <MD_MAX72xx.h>

// ---- your Wi-Fi (2.4 GHz) ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_PASSWORD";
// POSIX time zone: Kazakhstan "<+05>-5", Moscow "MSK-3"
const char* TZ_INFO = "<+05>-5";

#define HARDWARE_TYPE MD_MAX72XX::FC16_HW    // try PAROLA_HW or GENERIC_HW if text looks scrambled
const int MAX_DEVICES = 4;                   // 4-in-1 module = 32x8
// signals go through the BSS138 level shifter (LV side -> NodeMCU)
const int DATA_PIN = D7;                     // -> LV1/HV1 -> DIN
const int CLK_PIN = D5;                      // -> LV2/HV2 -> CLK
const int CS_PIN = D1;                       // -> LV3/HV3 -> CS (not D8: boot strap)

const int DAY_BRIGHTNESS = 3;                // 0..15
const int NIGHT_FROM = 22, NIGHT_TO = 7;     // dim hours

MD_Parola matrix(HARDWARE_TYPE, DATA_PIN, CLK_PIN, CS_PIN, MAX_DEVICES);

char text[32];
bool scrolling = false;
bool synced = false;
int lastSecond = -1;

void setup() {
  Serial.begin(115200);
  Serial.println();
  matrix.begin();
  matrix.setIntensity(DAY_BRIGHTNESS);
  matrix.setTextAlignment(PA_CENTER);
  matrix.print("WiFi");

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.printf("\\nWi-Fi OK, IP %s\\n", WiFi.localIP().toString().c_str());
  configTime(TZ_INFO, "pool.ntp.org", "time.google.com");
  matrix.print("sync");
}

void loop() {
  if (scrolling) {                           // let the date finish its scroll
    if (matrix.displayAnimate()) {
      scrolling = false;
      lastSecond = -1;
    }
    return;
  }

  time_t now = time(nullptr);
  if (now < 1700000000) {                    // NTP has not answered yet
    delay(100);
    return;
  }
  struct tm t;
  localtime_r(&now, &t);
  if (!synced) {
    synced = true;
    strftime(text, sizeof text, "%Y-%m-%d %H:%M:%S", &t);
    Serial.printf("time synced: %s\\n", text);
  }
  if (t.tm_sec == lastSecond) {
    delay(20);
    return;
  }
  lastSecond = t.tm_sec;

  bool night = t.tm_hour >= NIGHT_FROM || t.tm_hour < NIGHT_TO;
  matrix.setIntensity(night ? 0 : DAY_BRIGHTNESS);

  if (t.tm_sec == 30) {                      // once a minute: scroll the date
    strftime(text, sizeof text, "%a %d %b %Y", &t);
    Serial.printf("scroll: %s\\n", text);
    matrix.displayText(text, PA_CENTER, 40, 0, PA_SCROLL_LEFT, PA_SCROLL_LEFT);
    scrolling = true;
    return;
  }
  snprintf(text, sizeof text, t.tm_sec % 2 ? "%02d %02d" : "%02d:%02d", t.tm_hour, t.tm_min);
  matrix.print(text);                        // colon blinks every second
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "The ESP8266 does not boot when the shifter is connected", ru: "ESP8266 не загружается, когда подключён шифтер", kk: "Түрлендіргіш қосулы кезде ESP8266 жүктелмейді" },
      cause: { en: "A shifter channel sits on D8, D3 or D4, and its pull-up changes a boot strap pin.", ru: "Канал шифтера сидит на D8, D3 или D4, и его подтяжка меняет пин загрузки.", kk: "Түрлендіргіш арнасы D8, D3 не D4-те тұр, оның тартқышы жүктеу пинін өзгертеді." },
      fix: { en: "Keep the three data lines on D7, D5 and D1 exactly as in the diagram.", ru: "Держите три линии данных строго на D7, D5 и D1, как на схеме.", kk: "Үш деректер сызығын схемадағыдай дәл D7, D5 және D1-де ұстаңыз." },
    },
    {
      symptom: { en: "Random dots or garbage on the matrix", ru: "На матрице случайные точки или мусор", kk: "Матрицада кездейсоқ нүктелер не қоқыс" },
      cause: { en: "Missing common ground, LV/HV swapped on the shifter, or long loose jumpers on CLK.", ru: "Нет общей земли, перепутаны LV/HV на шифтере, или длинные болтающиеся провода на CLK.", kk: "Ортақ жер жоқ, түрлендіргіште LV/HV ауысқан немесе CLK-та ұзын бос сымдар." },
      fix: { en: "Check GND to all three boards, LV on 3V3 and HV on 5 V, and keep the data wires under 20 cm.", ru: "Проверьте GND на всех трёх платах, LV на 3V3, HV на 5 В, и держите провода данных короче 20 см.", kk: "Үш платаның бәрінде GND бар екенін, LV 3V3-те, HV 5 В-та екенін тексеріп, деректер сымдарын 20 см-ден қысқа ұстаңыз." },
    },
    {
      symptom: { en: "Time is off by several hours", ru: "Время сдвинуто на несколько часов", kk: "Уақыт бірнеше сағатқа ығысқан" },
      cause: { en: "TZ_INFO does not match your zone. POSIX signs are inverted: UTC+5 is written \"<+05>-5\".", ru: "TZ_INFO не совпадает с вашим поясом. В POSIX знак обратный: UTC+5 пишется «<+05>-5».", kk: "TZ_INFO сіздің белдеуіңізге сәйкес емес. POSIX-та таңба керісінше: UTC+5 «<+05>-5» деп жазылады." },
      fix: { en: "Copy the right string for your city from a POSIX TZ table and upload again.", ru: "Возьмите нужную строку для своего города из таблицы POSIX TZ и загрузите снова.", kk: "Қалаңызға сәйкес жолды POSIX TZ кестесінен алып, қайта жүктеңіз." },
    },
    {
      symptom: { en: "Stuck on \"sync\"", ru: "Зависает на «sync»", kk: "«sync» күйінде тұрып қалады" },
      cause: { en: "No internet on the network, or UDP port 123 is blocked.", ru: "В сети нет интернета, или заблокирован UDP-порт 123.", kk: "Желіде интернет жоқ немесе UDP 123 порты бұғатталған." },
      fix: { en: "Test with a phone hotspot; if it works there, allow NTP on your router.", ru: "Проверьте через точку доступа телефона; если там работает, разрешите NTP на роутере.", kk: "Телефон нүктесі арқылы тексеріңіз; онда жұмыс істесе, роутерде NTP-ге рұқсат беріңіз." },
    },
  ],
  safety: [
    { en: "Never put 5 V on an ESP8266 pin: the matrix data lines must go through the shifter's HV side only.", ru: "Никогда не подавайте 5 В на пины ESP8266: линии данных матрицы идут только через сторону HV шифтера.", kk: "ESP8266 пиндеріне ешқашан 5 В бермеңіз: матрицаның деректер сызықтары тек түрлендіргіштің HV жағы арқылы өтеді." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "Connecting......",
      "Wi-Fi OK, IP 192.168.1.83",
      "time synced: 2026-10-25 18:42:07",
      "scroll: Sun 25 Oct 2026",
      "scroll: Sun 25 Oct 2026",
      "scroll: Sun 25 Oct 2026",
    ],
    leds: [],
  },
} satisfies GuideContent;
