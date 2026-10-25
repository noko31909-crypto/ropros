import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-lora-sensor-node",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "iot",
  robotics: false,
  difficulty: "advanced",
  hours: 6,
  costUsd: 32,
  xpReward: 400,
  title: {
    en: "ESP32 LoRa Sensor Node",
    ru: "Сенсорный LoRa-узел на ESP32",
    kk: "ESP32 негізіндегі LoRa сенсор түйіні",
  },
  summary: {
    en: "An SX1278 LoRa radio sends DHT22 temperature and humidity every minute over hundreds of metres to kilometres, sleeping in between. A second board running the same sketch in receiver mode prints each reading with RSSI and SNR.",
    ru: "Радиомодуль LoRa SX1278 раз в минуту передаёт температуру и влажность с DHT22 на сотни метров и километры, а между передачами спит. Вторая плата с тем же скетчем в режиме приёмника печатает каждое измерение с RSSI и SNR.",
    kk: "SX1278 LoRa радиомодулі минутына бір рет DHT22 температурасы мен ылғалдылығын жүздеген метрден километрге дейін жібереді, ал арасында ұйықтайды. Сол скетчті қабылдағыш режимінде іске қосқан екінші плата әр өлшемді RSSI және SNR мәндерімен шығарады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 2, spec: { en: "ESP32 DevKit (WROOM-32), one per node", ru: "ESP32 DevKit (WROOM-32), по одной на узел", kk: "ESP32 DevKit (WROOM-32), әр түйінге біреуден" }, role: { en: "Sensor node and receiver", ru: "Сенсорный узел и приёмник", kk: "Сенсор түйіні және қабылдағыш" } },
    { component: "lora-sx1278", qty: 2, spec: { en: "Ai-Thinker Ra-02 433 MHz on a 2.54 mm adapter, with a 433 MHz antenna", ru: "Ai-Thinker Ra-02 433 МГц на переходнике 2,54 мм, с антенной на 433 МГц", kk: "2,54 мм адаптердегі Ai-Thinker Ra-02 433 МГц, 433 МГц антеннасымен" }, role: { en: "LoRa radio, one per node", ru: "Радиомодуль LoRa, по одному на узел", kk: "LoRa радиомодулі, әр түйінге біреуден" } },
    { component: "dht22", qty: 1, spec: { en: "3-pin module with pull-up", ru: "модуль с 3 выводами и подтяжкой", kk: "тарту резисторы бар 3 шығысты модуль" }, role: { en: "Temperature and humidity on the sensor node", ru: "Температура и влажность на сенсорном узле", kk: "Сенсор түйініндегі температура мен ылғалдылық" } },
    { component: "usb-5v", qty: 2, spec: { en: "5 V USB charger or power bank + cable", ru: "USB-зарядка 5 В или повербанк + кабель", kk: "5 В USB зарядтағыш немесе повербанк + кабель" }, role: { en: "Power for each node", ru: "Питание каждого узла", kk: "Әр түйіннің қуаты" } },
    { component: "breadboard", qty: 2, spec: { en: "half size", ru: "половинка", kk: "жартылай" }, role: { en: "One per node", ru: "По одной на узел", kk: "Әр түйінге біреуден" } },
    { component: "jumper-wires", qty: 24, spec: { en: "male-female and male-male", ru: "папа-мама и папа-папа", kk: "аталық-аналық және аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
    { component: "enclosure", qty: 1, spec: { en: "vented outdoor box for the sensor node", ru: "уличный корпус с вентиляцией для сенсорного узла", kk: "сенсор түйініне арналған желдетілетін сыртқы қорап" }, role: { en: "Weather protection", ru: "Защита от погоды", kk: "Ауа райынан қорғау" }, optional: true },
  ],
  instances: [
    { id: "lora", component: "lora-sx1278", label: "Ra-02 433 MHz" },
    { id: "dht", component: "dht22", label: "DHT22" },
  ],
  connections: [
    { from: "board.3V3", to: "lora.3.3V", color: "red", note: { en: "3.3 V only: the SX1278 is not 5 V tolerant", ru: "только 3,3 В: SX1278 не выдерживает 5 В", kk: "тек 3,3 В: SX1278 5 В-қа шыдамайды" } },
    { from: "lora.GND", to: "board.GND", color: "black" },
    { from: "lora.NSS", to: "board.GPIO5", color: "orange" },
    { from: "lora.SCK", to: "board.GPIO18", color: "yellow" },
    { from: "lora.MOSI", to: "board.GPIO23", color: "green" },
    { from: "lora.MISO", to: "board.GPIO19", color: "blue" },
    { from: "lora.RESET", to: "board.GPIO14", color: "white" },
    { from: "lora.DIO0", to: "board.GPIO26", color: "purple", note: { en: "\"packet sent / received\" interrupt", ru: "прерывание «пакет отправлен / принят»", kk: "«пакет жіберілді / қабылданды» үзілісі" } },
    { from: "lora.DIO1", to: "board.GPIO33", color: "gray" },
    { from: "board.3V3", to: "dht.VCC", color: "red" },
    { from: "dht.GND", to: "board.GND2", color: "black" },
    { from: "dht.DATA", to: "board.GPIO4", color: "cyan" },
  ],
  steps: [
    {
      title: { en: "Prepare the Ra-02 and its antenna", ru: "Подготовьте Ra-02 и антенну", kk: "Ra-02 мен антеннаны дайындаңыз" },
      body: {
        en: "The Ra-02 has 2 mm half-hole pads, so solder it onto a 2.54 mm adapter board or solder short wires to it. Attach a 433 MHz antenna (spring or SMA on an IPEX pigtail) before the module is ever powered: transmitting without an antenna can destroy the power amplifier. Do the same for the second module.",
        ru: "У Ra-02 контактные площадки с шагом 2 мм, поэтому припаяйте модуль на переходник 2,54 мм или припаяйте к нему короткие провода. Подключите антенну на 433 МГц (пружинку или SMA через пигтейл IPEX) до первого включения: передача без антенны может сжечь усилитель мощности. То же самое сделайте со вторым модулем.",
        kk: "Ra-02-нің байланыс алаңшаларының қадамы 2 мм, сондықтан модульді 2,54 мм адаптерге дәнекерлеңіз немесе оған қысқа сымдар дәнекерлеңіз. Алғаш қоспас бұрын 433 МГц антеннаны (серіппе немесе IPEX пигтейлі арқылы SMA) жалғаңыз: антеннасыз тарату қуат күшейткішін күйдіріп жіберуі мүмкін. Екінші модульге де солай жасаңыз.",
      },
      expect: { en: "Both radios sit on breadboard-friendly pins with antennas attached.", ru: "Оба радиомодуля на удобных для макетки выводах и с антеннами.", kk: "Екі радиомодуль де макетке ыңғайлы шығыстарда және антенналары жалғанған." },
      mistake: { en: "Mixing 433 MHz modules with 868/915 MHz antennas, or SX1276 boards on other bands: both nodes must be on the same band.", ru: "Не смешивайте модули на 433 МГц с антеннами на 868/915 МГц или платы SX1276 на других диапазонах: оба узла должны работать в одном диапазоне.", kk: "433 МГц модульдерін 868/915 МГц антенналарымен немесе басқа диапазондағы SX1276 платаларымен араластырмаңыз: екі түйін де бір диапазонда болуы керек." },
    },
    {
      title: { en: "Wire the radio to VSPI", ru: "Подключите радиомодуль к VSPI", kk: "Радиомодульді VSPI-ге қосыңыз" },
      body: {
        en: "Connect 3.3V to the ESP32 3V3 pin and GND to GND. SPI goes to the default VSPI pins: SCK → GPIO18, MISO → GPIO19, MOSI → GPIO23 and NSS → GPIO5. Then RESET → GPIO14, DIO0 → GPIO26 (packet done interrupt) and DIO1 → GPIO33 (receive timeout, used by RadioLib). DIO2 is only used for FSK modes and stays unconnected; the checker's warning about it is expected.",
        ru: "Подключите 3.3V к пину 3V3 платы ESP32, GND к GND. SPI — на стандартные пины VSPI: SCK → GPIO18, MISO → GPIO19, MOSI → GPIO23, NSS → GPIO5. Затем RESET → GPIO14, DIO0 → GPIO26 (прерывание «пакет готов») и DIO1 → GPIO33 (тайм-аут приёма, его использует RadioLib). DIO2 нужен только в режимах FSK и остаётся свободным; предупреждение проверки о нём ожидаемо.",
        kk: "3.3V-ты ESP32-нің 3V3 пиніне, GND-ні GND-ге қосыңыз. SPI VSPI стандартты пиндеріне барады: SCK → GPIO18, MISO → GPIO19, MOSI → GPIO23, NSS → GPIO5. Содан кейін RESET → GPIO14, DIO0 → GPIO26 («пакет дайын» үзілісі) және DIO1 → GPIO33 (қабылдау тайм-ауты, оны RadioLib пайдаланады). DIO2 тек FSK режимдерінде керек, ол бос қалады; тексерудің ол туралы ескертуі күтілген жайт.",
      },
      expect: { en: "After upload: \"radio OK\" in the Serial Monitor.", ru: "После загрузки в Serial Monitor: «radio OK».", kk: "Жүктегеннен кейін Serial Monitor-да: «radio OK»." },
      mistake: { en: "\"radio init failed, code -2\" means the chip was not found: check NSS, MISO/MOSI and the 3.3 V supply.", ru: "«radio init failed, code -2» значит, что чип не найден: проверьте NSS, MISO/MOSI и питание 3,3 В.", kk: "«radio init failed, code -2» чип табылмағанын білдіреді: NSS, MISO/MOSI және 3,3 В қуатын тексеріңіз." },
    },
    {
      title: { en: "Add the DHT22 to the sensor node", ru: "Добавьте DHT22 на сенсорный узел", kk: "Сенсор түйініне DHT22 қосыңыз" },
      body: {
        en: "On the first board connect the DHT22 VCC to 3V3, GND to GND2 and DATA to GPIO4. The receiver board uses the same radio wiring; it does not need a DHT22.",
        ru: "На первой плате подключите VCC датчика DHT22 к 3V3, GND к GND2, DATA к GPIO4. Плата приёмника использует такую же схему радиомодуля, DHT22 ей не нужен.",
        kk: "Бірінші платада DHT22-нің VCC-ін 3V3-ке, GND-ін GND2-ге, DATA-сын GPIO4-ке қосыңыз. Қабылдағыш плата радиомодульдің дәл сондай сұлбасын пайдаланады, оған DHT22 керек емес.",
      },
      expect: { en: "Two boards with identical radio wiring; only the sensor node has the DHT22.", ru: "Две платы с одинаковой схемой радио; DHT22 только на сенсорном узле.", kk: "Радио сұлбасы бірдей екі плата; DHT22 тек сенсор түйінінде." },
      mistake: { en: "Mounting the DHT22 in a closed box in the sun reads 10 °C too high; use a vented, shaded spot.", ru: "DHT22 в закрытой коробке на солнце завышает температуру на 10 °C; нужна тень и вентиляция.", kk: "Күн астындағы жабық қораптағы DHT22 температураны 10 °C-қа асырып көрсетеді; көлеңке мен желдету керек." },
    },
    {
      title: { en: "Flash the sender and the receiver", ru: "Прошейте передатчик и приёмник", kk: "Таратқыш пен қабылдағышты жүктеңіз" },
      body: {
        en: "Install RadioLib and \"DHT sensor library\" (+ \"Adafruit Unified Sensor\"). Upload the sketch to the sensor node with RECEIVER_MODE 0. Change the line to #define RECEIVER_MODE 1 and upload to the second board. Both must use the same frequency, spreading factor, bandwidth and sync word, which the shared sketch guarantees.",
        ru: "Установите RadioLib и «DHT sensor library» (+ «Adafruit Unified Sensor»). Загрузите скетч на сенсорный узел с RECEIVER_MODE 0. Замените строку на #define RECEIVER_MODE 1 и загрузите скетч на вторую плату. У обеих должны совпадать частота, коэффициент расширения, полоса и sync word, что гарантирует общий скетч.",
        kk: "RadioLib және «DHT sensor library» (+ «Adafruit Unified Sensor») кітапханаларын орнатыңыз. Скетчті сенсор түйініне RECEIVER_MODE 0 мәнімен жүктеңіз. Жолды #define RECEIVER_MODE 1 етіп өзгертіп, екінші платаға жүктеңіз. Екеуінде жиілік, кеңейту коэффициенті, жолақ және sync word бірдей болуы керек, мұны ортақ скетч қамтамасыз етеді.",
      },
      expect: { en: "The receiver prints \"N1 #0: 21.4 C 48.2 %\" with RSSI and SNR once a minute.", ru: "Приёмник раз в минуту печатает «N1 #0: 21.4 C 48.2 %» с RSSI и SNR.", kk: "Қабылдағыш минутына бір рет RSSI және SNR мәндерімен «N1 #0: 21.4 C 48.2 %» деп шығарады." },
      mistake: { en: "Placing the two antennas a few centimetres apart can overload the receiver; keep them at least 1 m apart when testing.", ru: "Если антенны в нескольких сантиметрах друг от друга, приёмник может перегрузиться; при тестах держите их минимум в 1 м.", kk: "Антенналар бір-бірінен бірнеше сантиметр қашықта болса, қабылдағыш шамадан тыс жүктелуі мүмкін; сынақта оларды кемінде 1 м қашық ұстаңыз." },
    },
    {
      title: { en: "Test the range", ru: "Проверьте дальность", kk: "Қашықтықты тексеріңіз" },
      body: {
        en: "Leave the receiver at a window and carry the sensor node away on a power bank. Watch RSSI and SNR: RSSI around −120 dBm or SNR near −10 dB is the edge for SF9. Line of sight gives 1–3 km at 10 dBm; buildings cut that to a few hundred metres. A gap in the #numbers shows lost packets.",
        ru: "Оставьте приёмник у окна и унесите сенсорный узел с повербанком. Следите за RSSI и SNR: RSSI около −120 дБм или SNR около −10 дБ — граница для SF9. В прямой видимости при 10 дБм получается 1–3 км, здания сокращают это до нескольких сотен метров. Пропуск в номерах # означает потерянные пакеты.",
        kk: "Қабылдағышты терезе жанында қалдырып, сенсор түйінін повербанкпен алысқа апарыңыз. RSSI мен SNR-ды бақылаңыз: шамамен −120 дБм RSSI немесе −10 дБ маңындағы SNR — SF9 үшін шекара. Тікелей көрінуде 10 дБм кезінде 1–3 км шығады, ғимараттар мұны бірнеше жүз метрге дейін қысқартады. # нөмірлеріндегі үзіліс жоғалған пакеттерді білдіреді.",
      },
      expect: { en: "Packets keep arriving as you walk, with RSSI dropping gradually.", ru: "Пакеты продолжают приходить по мере удаления, RSSI плавно падает.", kk: "Алыстаған сайын пакеттер келе береді, RSSI бірте-бірте төмендейді." },
      mistake: { en: "Raising TX_POWER above your local legal limit: 433 MHz license-free use is usually 10 mW (10 dBm).", ru: "Не поднимайте TX_POWER выше разрешённого: для 433 МГц без лицензии обычно 10 мВт (10 дБм).", kk: "TX_POWER-ді рұқсат етілгеннен жоғары көтермеңіз: 433 МГц лицензиясыз пайдалануда әдетте 10 мВт (10 дБм)." },
    },
  ],
  code: [{
    filename: "lora_sensor_node.ino",
    language: "cpp",
    libraries: ["RadioLib", "DHT sensor library", "Adafruit Unified Sensor"],
    source: `#include <RadioLib.h>
#include <DHT.h>

// 0 = sensor node (DHT22 + sender, deep sleep), 1 = receiver. Flash the second board with 1.
#define RECEIVER_MODE 0

const int NSS_PIN = 5;       // SX1278 NSS (SPI chip select; VSPI SCK 18, MISO 19, MOSI 23)
const int RESET_PIN = 14;
const int DIO0_PIN = 26;     // packet done interrupt
const int DIO1_PIN = 33;     // receive timeout
const int DHT_PIN = 4;       // sensor node only

const float FREQ_MHZ = 434.0;   // 433.05-434.79 MHz license-free band
const float BW_KHZ = 125.0;
const uint8_t SPREAD = 9;
const uint8_t CODING = 7;       // 4/7
const int8_t TX_POWER = 10;     // dBm, legal limit in most countries for this band
const char* NODE_ID = "N1";
const uint64_t PERIOD_US = 60ULL * 1000000ULL;

SX1278 radio = new Module(NSS_PIN, DIO0_PIN, RESET_PIN, DIO1_PIN);
DHT dht(DHT_PIN, DHT22);

RTC_DATA_ATTR uint32_t seq = 0;   // packet counter, survives deep sleep

void startRadio() {
  int st = radio.begin(FREQ_MHZ, BW_KHZ, SPREAD, CODING, RADIOLIB_SX127X_SYNC_WORD, TX_POWER, 8, 0);
  if (st != RADIOLIB_ERR_NONE) {
    Serial.printf("radio init failed, code %d\\n", st);
    while (true) delay(1000);
  }
  Serial.println("radio OK");
}

#if RECEIVER_MODE
volatile bool packetReady = false;
long lastSeq = -1;

void IRAM_ATTR onPacket() { packetReady = true; }

void setup() {
  Serial.begin(115200);
  startRadio();
  radio.setPacketReceivedAction(onPacket);
  radio.startReceive();
  Serial.printf("receiver: listening on %.1f MHz SF%d\\n", FREQ_MHZ, SPREAD);
}

void loop() {
  if (!packetReady) return;
  packetReady = false;
  String msg;
  int st = radio.readData(msg);
  if (st == RADIOLIB_ERR_NONE) {
    char node[8];
    long n;
    float t, h;
    if (sscanf(msg.c_str(), "%7[^,],%ld,%f,%f", node, &n, &t, &h) == 4) {
      if (lastSeq >= 0 && n > lastSeq + 1) Serial.printf("missed %ld packet(s)\\n", n - lastSeq - 1);
      lastSeq = n;
      Serial.printf("%s #%ld: %.1f C %.1f %%  RSSI %.0f dBm  SNR %.1f dB\\n", node, n, t, h, radio.getRSSI(), radio.getSNR());
    } else {
      Serial.printf("raw: %s  RSSI %.0f dBm\\n", msg.c_str(), radio.getRSSI());
    }
  } else if (st == RADIOLIB_ERR_CRC_MISMATCH) {
    Serial.println("CRC error (packet damaged)");
  }
  radio.startReceive();
}

#else

void setup() {
  unsigned long start = millis();
  Serial.begin(115200);
  bool coldBoot = esp_sleep_get_wakeup_cause() != ESP_SLEEP_WAKEUP_TIMER;
  dht.begin();
  if (coldBoot) {
    Serial.printf("node %s boot\\n", NODE_ID);
    delay(2000);                       // DHT22 needs ~2 s after power-up
  }
  startRadio();

  float t = dht.readTemperature();
  float h = dht.readHumidity();
  char msg[40];
  if (isnan(t) || isnan(h)) snprintf(msg, sizeof msg, "%s,%lu,err", NODE_ID, (unsigned long)seq);
  else snprintf(msg, sizeof msg, "%s,%lu,%.1f,%.1f", NODE_ID, (unsigned long)seq, t, h);

  int st = radio.transmit(msg);
  if (st == RADIOLIB_ERR_NONE) {
    Serial.printf("sent #%lu: %s (airtime %lu ms)\\n", (unsigned long)seq, msg, (unsigned long)(radio.getTimeOnAir(strlen(msg)) / 1000));
  } else {
    Serial.printf("send failed, code %d\\n", st);
  }
  seq++;
  radio.sleep();                       // SX1278 down to ~1 uA

  uint64_t awakeUs = (uint64_t)(millis() - start) * 1000ULL;
  uint64_t sleepUs = awakeUs < PERIOD_US ? PERIOD_US - awakeUs : PERIOD_US;
  Serial.printf("sleeping %llu s\\n", sleepUs / 1000000ULL);
  Serial.flush();
  esp_sleep_enable_timer_wakeup(sleepUs);
  esp_deep_sleep_start();
}

void loop() {
  // never reached: the sensor node deep-sleeps at the end of setup()
}
#endif`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"radio init failed, code -2\"", ru: "«radio init failed, code -2»", kk: "«radio init failed, code -2»" },
      cause: { en: "RADIOLIB_ERR_CHIP_NOT_FOUND: SPI wiring, NSS pin or 3.3 V supply is wrong, or a pad is not soldered.", ru: "RADIOLIB_ERR_CHIP_NOT_FOUND: ошибка в проводах SPI, пине NSS или питании 3,3 В, либо не пропаяна площадка.", kk: "RADIOLIB_ERR_CHIP_NOT_FOUND: SPI сымдарында, NSS пинінде не 3,3 В қуатында қате бар немесе алаңша дәнекерленбеген." },
      fix: { en: "Check NSS → GPIO5, MISO → GPIO19, MOSI → GPIO23, SCK → GPIO18 and reflow the Ra-02 pads.", ru: "Проверьте NSS → GPIO5, MISO → GPIO19, MOSI → GPIO23, SCK → GPIO18 и перепаяйте площадки Ra-02.", kk: "NSS → GPIO5, MISO → GPIO19, MOSI → GPIO23, SCK → GPIO18 екенін тексеріп, Ra-02 алаңшаларын қайта дәнекерлеңіз." },
    },
    {
      symptom: { en: "Sender says \"sent\" but the receiver prints nothing", ru: "Передатчик пишет «sent», а приёмник молчит", kk: "Таратқыш «sent» дейді, ал қабылдағыш үнсіз" },
      cause: { en: "The boards use different settings (one still has RECEIVER_MODE 0, or a changed SF/frequency), or DIO0 is not wired on the receiver.", ru: "У плат разные настройки (на одной по-прежнему RECEIVER_MODE 0 или изменены SF/частота) либо у приёмника не подключён DIO0.", kk: "Платалардың баптаулары әртүрлі (біреуінде әлі RECEIVER_MODE 0 немесе SF/жиілік өзгертілген) не қабылдағышта DIO0 қосылмаған." },
      fix: { en: "Flash both from the same sketch, changing only RECEIVER_MODE, and check DIO0 → GPIO26 on both.", ru: "Прошейте обе платы одним скетчем, меняя только RECEIVER_MODE, и проверьте DIO0 → GPIO26 на обеих.", kk: "Екі платаны да бір скетчпен жүктеп, тек RECEIVER_MODE-ты өзгертіңіз және екеуінде де DIO0 → GPIO26 екенін тексеріңіз." },
    },
    {
      symptom: { en: "Packets arrive as \"N1,5,err\"", ru: "Пакеты приходят как «N1,5,err»", kk: "Пакеттер «N1,5,err» болып келеді" },
      cause: { en: "The DHT22 did not answer: loose DATA wire or the sensor is not on 3V3.", ru: "DHT22 не ответил: отходит провод DATA или датчик не на 3V3.", kk: "DHT22 жауап бермеді: DATA сымы босаған немесе датчик 3V3-ке қосылмаған." },
      fix: { en: "Re-seat the DATA wire on GPIO4 and check the module's power LED.", ru: "Переподключите провод DATA на GPIO4 и проверьте светодиод питания модуля.", kk: "DATA сымын GPIO4-ке қайта қосып, модульдің қуат жарық диодын тексеріңіз." },
    },
    {
      symptom: { en: "Range is only a few metres", ru: "Дальность всего несколько метров", kk: "Қашықтық бар болғаны бірнеше метр" },
      cause: { en: "No antenna, a wrong-band antenna, or the IPEX connector is not clicked in.", ru: "Нет антенны, антенна не того диапазона или разъём IPEX не защёлкнут.", kk: "Антенна жоқ, антенна басқа диапазонға арналған немесе IPEX ажыратқышы орнына түспеген." },
      fix: { en: "Use a 433 MHz antenna on both nodes, press the IPEX connector until it clicks, and mount antennas vertically.", ru: "Поставьте антенны на 433 МГц на оба узла, защёлкните разъём IPEX и расположите антенны вертикально.", kk: "Екі түйінге де 433 МГц антенна қойып, IPEX ажыратқышын сырт еткенше басыңыз және антенналарды тік орналастырыңыз." },
    },
  ],
  safety: [
    { en: "Never power the Ra-02 from 5 V and never transmit without an antenna connected.", ru: "Никогда не питайте Ra-02 от 5 В и не передавайте без подключённой антенны.", kk: "Ra-02-ні ешқашан 5 В-тан қоректендірмеңіз және антеннасыз таратпаңыз." },
    { en: "Respect local radio rules for 433 MHz: low power (typically 10 mW) and short, infrequent transmissions.", ru: "Соблюдайте местные правила для 433 МГц: малая мощность (обычно 10 мВт) и короткие, редкие передачи.", kk: "433 МГц үшін жергілікті ережелерді сақтаңыз: төмен қуат (әдетте 10 мВт) және қысқа, сирек таратулар." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "node N1 boot",
      "radio OK",
      "sent #0: N1,0,21.4,48.2 (airtime 206 ms)",
      "sleeping 57 s",
      "radio OK",
      "sent #1: N1,1,21.3,48.5 (airtime 206 ms)",
      "sleeping 59 s",
      "--- receiver board (RECEIVER_MODE 1) ---",
      "radio OK",
      "receiver: listening on 434.0 MHz SF9",
      "N1 #0: 21.4 C 48.2 %  RSSI -71 dBm  SNR 9.8 dB",
      "N1 #1: 21.3 C 48.5 %  RSSI -73 dBm  SNR 9.5 dB",
      "missed 1 packet(s)",
      "N1 #3: 21.1 C 49.0 %  RSSI -112 dBm  SNR -4.3 dB",
    ],
    leds: [],
  },
} satisfies GuideContent;
