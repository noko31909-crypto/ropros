import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "nrf24-wireless-sensor-link",
  status: "unverified",
  platform: "arduino",
  board: "arduino-nano",
  category: "sensors",
  robotics: false,
  difficulty: "intermediate",
  hours: 3,
  costUsd: 17,
  xpReward: 220,
  title: {
    en: "nRF24L01 Wireless Sensor Link",
    ru: "Беспроводной датчик на nRF24L01",
    kk: "nRF24L01 негізіндегі сымсыз датчик байланысы",
  },
  summary: {
    en: "One Nano reads a DHT22 and sends temperature and humidity over a 2.4 GHz nRF24L01 radio; a second Nano receives and prints them. Both run the same sketch, and a single #define picks the role.",
    ru: "Одна Nano читает DHT22 и передаёт температуру и влажность по радио nRF24L01 на 2,4 ГГц, вторая Nano принимает и выводит их. Обе работают на одном скетче, роль выбирается одной строкой #define.",
    kk: "Бір Nano DHT22-ні оқып, температура мен ылғалдылықты 2,4 ГГц nRF24L01 радиосы арқылы жібереді, екінші Nano оларды қабылдап, шығарады. Екеуі бір скетчпен жұмыс істейді, рөлді бір #define жолы таңдайды.",
  },
  parts: [
    { component: "arduino-nano", qty: 2, spec: { en: "ATmega328P, 5 V; one sender, one receiver", ru: "ATmega328P, 5 В; передатчик и приёмник", kk: "ATmega328P, 5 В; бірі жіберуші, бірі қабылдаушы" }, role: { en: "Sensor node and receiver", ru: "Узел с датчиком и приёмник", kk: "Датчик түйіні және қабылдағыш" } },
    { component: "nrf24l01", qty: 2, spec: { en: "nRF24L01+ with PCB antenna, 3.3 V only", ru: "nRF24L01+ с антенной на плате, только 3,3 В", kk: "Платадағы антеннасы бар nRF24L01+, тек 3,3 В" }, role: { en: "2.4 GHz radios", ru: "Радиомодули 2,4 ГГц", kk: "2,4 ГГц радиомодульдер" } },
    { component: "capacitor", qty: 2, spec: { en: "10 µF, 16 V electrolytic", ru: "10 мкФ, 16 В, электролитический", kk: "10 мкФ, 16 В, электролиттік" }, role: { en: "Decouples each radio's 3.3 V supply", ru: "Развязка питания 3,3 В каждого радиомодуля", kk: "Әр радиомодульдің 3,3 В қуатын тегістеу" } },
    { component: "dht22", qty: 1, spec: { en: "3-pin module with pull-up, −40…80 °C, ±0.5 °C", ru: "3-выводной модуль с подтяжкой, −40…80 °C, ±0,5 °C", kk: "Тарту резисторы бар 3 шықпалы модуль, −40…80 °C, ±0,5 °C" }, role: { en: "Temperature and humidity (sender only)", ru: "Температура и влажность (только на передатчике)", kk: "Температура мен ылғалдылық (тек жіберушіде)" } },
    { component: "breadboard", qty: 2, spec: { en: "half size, one per node", ru: "половинки, по одной на узел", kk: "жартылай, әр түйінге біреуден" }, role: { en: "Assembly", ru: "Сборка", kk: "Құрастыру" } },
    { component: "jumper-wires", qty: 24, spec: { en: "male-female for the radio, male-male for the rest", ru: "папа-мама для радио, папа-папа для остального", kk: "радиоға аталық-аналық, қалғанына аталық-аталық" }, role: { en: "Connections", ru: "Соединения", kk: "Қосылыстар" } },
  ],
  instances: [
    { id: "radio", component: "nrf24l01", label: "nRF24L01+" },
    { id: "c_rf", component: "capacitor", label: "10 µF" },
    { id: "dht", component: "dht22", label: "DHT22 (sender)" },
  ],
  connections: [
    { from: "board.3V3", to: "radio.VCC", color: "red", note: { en: "3.3 V only: 5 V destroys the radio", ru: "только 3,3 В: 5 В убивает модуль", kk: "тек 3,3 В: 5 В модульді бүлдіреді" } },
    { from: "radio.GND", to: "board.GND", color: "black" },
    { from: "c_rf.A", to: "radio.VCC", color: "red", note: { en: "+ leg right at the module pins", ru: "ножка + прямо у выводов модуля", kk: "+ аяғы дәл модуль шықпаларының жанында" } },
    { from: "c_rf.B", to: "radio.GND", color: "black" },
    { from: "board.D9", to: "radio.CE", color: "orange" },
    { from: "board.D10", to: "radio.CSN", color: "yellow" },
    { from: "board.D13", to: "radio.SCK", color: "green" },
    { from: "board.D11", to: "radio.MOSI", color: "blue" },
    { from: "board.D12", to: "radio.MISO", color: "purple" },
    { from: "board.5V", to: "dht.VCC", color: "red", note: { en: "sender only", ru: "только на передатчике", kk: "тек жіберушіде" } },
    { from: "dht.DATA", to: "board.D2", color: "white" },
    { from: "dht.GND", to: "board.GND2", color: "black" },
  ],
  steps: [
    {
      title: { en: "Know the nRF24L01 pinout", ru: "Разберитесь с выводами nRF24L01", kk: "nRF24L01 шықпаларын анықтаңыз" },
      body: {
        en: "The radio has a 2×4 header. The pin with the square solder pad is GND, and the pin right beside it in the other row is VCC. The other pins are CE, CSN, SCK, MOSI, MISO and IRQ, printed on the back of most boards. IRQ is not used here. The nRF24L01+ runs on 1.9–3.6 V: its signal pins tolerate 5 V logic, but its VCC must never see 5 V.",
        ru: "У радиомодуля разъём 2×4. Вывод с квадратной площадкой это GND, а соседний с ним вывод во втором ряду VCC. Остальные выводы CE, CSN, SCK, MOSI, MISO и IRQ подписаны на обороте большинства плат. IRQ здесь не используется. nRF24L01+ работает от 1,9–3,6 В: его сигнальные выводы выдерживают логику 5 В, но на VCC никогда нельзя подавать 5 В.",
        kk: "Радиомодульдің 2×4 ұяшығы бар. Шаршы дәнекерлеу алаңшасы бар шықпа GND, ал екінші қатардағы оның көршісі VCC. Қалған шықпалар CE, CSN, SCK, MOSI, MISO және IRQ көп платалардың артында жазылған. IRQ мұнда қолданылмайды. nRF24L01+ 1,9–3,6 В-та жұмыс істейді: сигнал шықпалары 5 В логикаға шыдайды, бірақ VCC-ге ешқашан 5 В беруге болмайды.",
      },
      expect: { en: "You can point to GND, VCC, CE and CSN on the module.", ru: "Вы можете показать на модуле GND, VCC, CE и CSN.", kk: "Модульде GND, VCC, CE және CSN-ды көрсете аласыз." },
      mistake: { en: "Reading the pinout from the wrong side mirrors it and puts VCC on a signal pin.", ru: "Если смотреть на распиновку не с той стороны, она отзеркалится, и VCC попадёт на сигнальный вывод.", kk: "Шықпалар сызбасына қате жақтан қарасаңыз, ол айналы болып, VCC сигнал шықпасына түседі." },
    },
    {
      title: { en: "Wire the radio to both Nanos", ru: "Подключите радио к обеим Nano", kk: "Радионы екі Nano-ға да қосыңыз" },
      body: {
        en: "Wire both nodes the same way with male-female jumpers: VCC → 3V3, GND → GND, CE → D9, CSN → D10, SCK → D13, MOSI → D11, MISO → D12. D11–D13 are the Nano's hardware SPI pins and cannot be moved. Solder or plug the 10 µF capacitor straight across VCC and GND at the module, + to VCC: the radio draws short current bursts when it transmits, and without the capacitor most \"it only works sometimes\" problems appear.",
        ru: "Подключите оба узла одинаково проводами папа-мама: VCC → 3V3, GND → GND, CE → D9, CSN → D10, SCK → D13, MOSI → D11, MISO → D12. D11–D13 это аппаратный SPI Nano, их нельзя перенести. Припаяйте или вставьте конденсатор 10 мкФ прямо между VCC и GND у модуля, + к VCC: при передаче модуль потребляет короткие импульсы тока, и без конденсатора возникает большинство проблем «работает через раз».",
        kk: "Екі түйінді де аталық-аналық сымдармен бірдей қосыңыз: VCC → 3V3, GND → GND, CE → D9, CSN → D10, SCK → D13, MOSI → D11, MISO → D12. D11–D13 Nano-ның аппараттық SPI пиндері, оларды ауыстыруға болмайды. 10 мкФ конденсаторды модульдің VCC мен GND арасына тікелей дәнекерлеңіз немесе қойыңыз, + VCC-ге: жіберу кезінде модуль қысқа ток импульстерін тұтынады, ал конденсатор болмаса, «кейде ғана жұмыс істейді» деген мәселелердің көбі туындайды.",
      },
      expect: { en: "Two identical radio nodes, each with a capacitor on the radio's power pins.", ru: "Два одинаковых радиоузла, у каждого конденсатор на выводах питания модуля.", kk: "Екі бірдей радиотүйін, әрқайсысының модуль қуат шықпаларында конденсаторы бар." },
      mistake: { en: "Connecting VCC to 5V kills the nRF24L01 instantly and silently.", ru: "Подключение VCC к 5V мгновенно и бесшумно убивает nRF24L01.", kk: "VCC-ні 5V-ке қосу nRF24L01-ді бірден әрі білдіртпей бүлдіреді." },
    },
    {
      title: { en: "Add the DHT22 to the sender", ru: "Добавьте DHT22 на передатчик", kk: "Жіберушіге DHT22 қосыңыз" },
      body: {
        en: "On the sender only, wire the DHT22 module VCC to 5V, DATA to D2 and GND to GND. The 3-pin module already has the 10 kΩ pull-up on DATA. Keep the sensor away from the Nano's regulator so its warmth does not skew the reading. The receiver needs only the radio and its capacitor.",
        ru: "Только на передатчике подключите VCC модуля DHT22 к 5V, DATA к D2, GND к GND. На 3-выводном модуле уже есть подтяжка 10 кОм на DATA. Держите датчик подальше от стабилизатора Nano, чтобы его тепло не искажало показания. Приёмнику нужен только радиомодуль с конденсатором.",
        kk: "Тек жіберушіде DHT22 модулінің VCC-ін 5V-ке, DATA-ны D2-ге, GND-ін GND-ге қосыңыз. 3 шықпалы модульде DATA-да 10 кОм тарту резисторы бар. Nano тұрақтандырғышының жылуы көрсеткішті бұрмаламауы үшін датчикті одан алыс ұстаңыз. Қабылдағышқа тек конденсаторы бар радиомодуль керек.",
      },
      expect: { en: "The sender has radio + DHT22; the receiver has the radio only.", ru: "На передатчике радио + DHT22, на приёмнике только радио.", kk: "Жіберушіде радио + DHT22, қабылдағышта тек радио." },
      mistake: { en: "A bare 4-pin DHT22 has no pull-up: add 10 kΩ from DATA to 5V, and leave pin 3 unconnected.", ru: "У голого 4-выводного DHT22 нет подтяжки: добавьте 10 кОм от DATA к 5V, а вывод 3 не подключайте.", kk: "Жалаң 4 шықпалы DHT22-де тарту резисторы жоқ: DATA мен 5V арасына 10 кОм қосып, 3-шықпаны бос қалдырыңыз." },
    },
    {
      title: { en: "Flash both roles", ru: "Прошейте обе роли", kk: "Екі рөлді де жүктеңіз" },
      body: {
        en: "Install \"RF24\" (TMRh20), \"DHT sensor library\" and \"Adafruit Unified Sensor\". Upload the sketch to the sender with #define ROLE_TRANSMITTER 1. Change it to 0 and upload to the receiver. Both use channel 108 (above most Wi-Fi), 250 kbps for the best range, and the address \"ENV01\"; change all three on both nodes if a neighbour runs the same example.",
        ru: "Установите «RF24» (TMRh20), «DHT sensor library» и «Adafruit Unified Sensor». Загрузите скетч на передатчик с #define ROLE_TRANSMITTER 1. Поменяйте на 0 и загрузите на приёмник. Оба используют канал 108 (выше большинства Wi-Fi), 250 кбит/с для максимальной дальности и адрес «ENV01»; если сосед запускает тот же пример, измените все три параметра на обоих узлах.",
        kk: "«RF24» (TMRh20), «DHT sensor library» және «Adafruit Unified Sensor» орнатыңыз. Скетчті жіберушіге #define ROLE_TRANSMITTER 1 мәнімен жүктеңіз. Оны 0-ге өзгертіп, қабылдағышқа жүктеңіз. Екеуі де 108-арнаны (Wi-Fi-дың көпшілігінен жоғары), ең үлкен қашықтық үшін 250 кбит/с және «ENV01» мекенжайын қолданады; көршіңіз сол мысалды іске қосса, екі түйінде де үш параметрді өзгертіңіз.",
      },
      expect: { en: "The sender prints \"Role: sensor node (TX)\", the receiver \"Role: receiver (RX)\".", ru: "Передатчик печатает «Role: sensor node (TX)», приёмник «Role: receiver (RX)».", kk: "Жіберуші «Role: sensor node (TX)», қабылдағыш «Role: receiver (RX)» деп шығарады." },
      mistake: { en: "Uploading the same role to both boards gives two senders that never get an ack.", ru: "Если залить одну роль на обе платы, будут два передатчика, которые никогда не получат подтверждения.", kk: "Екі платаға бір рөлді жүктесеңіз, ешқашан растау алмайтын екі жіберуші болады." },
    },
    {
      title: { en: "Test the link and the range", ru: "Проверьте связь и дальность", kk: "Байланыс пен қашықтықты тексеріңіз" },
      body: {
        en: "Power the receiver from your computer and open its Serial Monitor at 9600 baud. Power the sender from a USB power bank or a second port. Every 2 s the receiver prints the packet number, temperature and humidity, and counts lost packets from gaps in the numbering. The sender prints \"ack\" when the receiver confirmed the packet. Walk away with the sender: with RF24_PA_LOW expect 10–30 m indoors; set RF24_PA_MAX for more, but only with a good 3.3 V supply.",
        ru: "Запитайте приёмник от компьютера и откройте его Serial Monitor на 9600 бод. Передатчик запитайте от павербанка или второго порта. Каждые 2 с приёмник печатает номер пакета, температуру и влажность и считает потерянные пакеты по пропускам в нумерации. Передатчик печатает «ack», когда приёмник подтвердил пакет. Отойдите с передатчиком: с RF24_PA_LOW ожидайте 10–30 м в помещении; для большей дальности поставьте RF24_PA_MAX, но только с хорошим питанием 3,3 В.",
        kk: "Қабылдағышты компьютерден қоректендіріп, оның Serial Monitor-ын 9600 бодта ашыңыз. Жіберушіні павербанктен немесе екінші порттан қоректендіріңіз. Әр 2 с сайын қабылдағыш пакет нөмірін, температура мен ылғалдылықты шығарады және нөмірлеудегі бос орындар бойынша жоғалған пакеттерді санайды. Қабылдағыш пакетті растағанда жіберуші «ack» деп шығарады. Жіберушімен алыстаңыз: RF24_PA_LOW кезінде бөлме ішінде 10–30 м күтіңіз; алысырақ үшін RF24_PA_MAX қойыңыз, бірақ тек жақсы 3,3 В қуатпен.",
      },
      expect: { en: "\"RX #15 T=23.4 C H=41.2 % lost=0\" every 2 s on the receiver.", ru: "«RX #15 T=23.4 C H=41.2 % lost=0» каждые 2 с на приёмнике.", kk: "Қабылдағышта әр 2 с сайын «RX #15 T=23.4 C H=41.2 % lost=0»." },
      mistake: { en: "Testing with the two radios 5 cm apart at PA_MAX overloads the receiver; keep them at least 1 m apart.", ru: "Проверка на расстоянии 5 см при PA_MAX перегружает приёмник; держите модули хотя бы в 1 м друг от друга.", kk: "PA_MAX кезінде 5 см қашықтықта тексеру қабылдағышты шамадан тыс жүктейді; модульдерді кемінде 1 м қашықтықта ұстаңыз." },
    },
  ],
  code: [{
    filename: "nrf24_sensor_link.ino",
    language: "cpp",
    libraries: ["RF24", "DHT sensor library", "Adafruit Unified Sensor"],
    source: `#include <SPI.h>
#include <RF24.h>
#include <DHT.h>

// 1 = sensor node (reads the DHT22 and sends), 0 = receiver (prints what arrives)
#define ROLE_TRANSMITTER 1

const int CE_PIN = 9, CSN_PIN = 10;    // SPI itself is fixed: D11 MOSI, D12 MISO, D13 SCK
const int DHT_PIN = 2;
const uint8_t RADIO_CHANNEL = 108;     // 2.508 GHz, above most Wi-Fi channels
const unsigned long SEND_EVERY_MS = 2000;
const byte ADDRESS[6] = "ENV01";

RF24 radio(CE_PIN, CSN_PIN);

struct Packet {          // 12 bytes, identical on both Nanos
  uint32_t seq;
  float tempC;
  float humidity;
};

#if ROLE_TRANSMITTER
DHT dht(DHT_PIN, DHT22);
uint32_t seq = 0;
unsigned long lastSend = 0;
#else
uint32_t lastSeq = 0, lost = 0;
unsigned long lastPacket = 0, lastWarn = 0;
#endif

void setup() {
  Serial.begin(9600);
  if (!radio.begin()) {
    Serial.println(F("nRF24 not responding: check 3.3 V, the 10 uF cap and the SPI wires"));
    while (true) delay(1000);
  }
  radio.setChannel(RADIO_CHANNEL);
  radio.setPALevel(RF24_PA_LOW);       // RF24_PA_MAX for more range, needs a solid 3.3 V
  radio.setDataRate(RF24_250KBPS);     // slowest rate = best range
  radio.setPayloadSize(sizeof(Packet));
  radio.setRetries(5, 15);             // 1.5 ms between retries, up to 15 retries

#if ROLE_TRANSMITTER
  dht.begin();
  radio.openWritingPipe(ADDRESS);
  radio.stopListening();
  Serial.println(F("Role: sensor node (TX)"));
#else
  radio.openReadingPipe(1, ADDRESS);
  radio.startListening();
  Serial.println(F("Role: receiver (RX)"));
#endif
}

#if ROLE_TRANSMITTER
void loop() {
  if (millis() - lastSend < SEND_EVERY_MS) return;   // the DHT22 needs 2 s between reads
  lastSend = millis();

  Packet p;
  p.tempC = dht.readTemperature();
  p.humidity = dht.readHumidity();
  if (isnan(p.tempC) || isnan(p.humidity)) {
    Serial.println(F("DHT22 read failed"));
    return;
  }
  p.seq = ++seq;
  bool acked = radio.write(&p, sizeof(p));

  Serial.print(F("TX #"));
  Serial.print(p.seq);
  Serial.print(F(" T="));
  Serial.print(p.tempC, 1);
  Serial.print(F(" C H="));
  Serial.print(p.humidity, 1);
  Serial.print(F(" % -> "));
  Serial.println(acked ? F("ack") : F("no ack"));
}
#else
void loop() {
  if (radio.available()) {
    Packet p;
    radio.read(&p, sizeof(p));
    if (lastSeq != 0 && p.seq > lastSeq + 1) lost += p.seq - lastSeq - 1;
    lastSeq = p.seq;
    lastPacket = millis();

    Serial.print(F("RX #"));
    Serial.print(p.seq);
    Serial.print(F(" T="));
    Serial.print(p.tempC, 1);
    Serial.print(F(" C H="));
    Serial.print(p.humidity, 1);
    Serial.print(F(" % lost="));
    Serial.println(lost);
  }

  if (millis() - lastPacket > 10000 && millis() - lastWarn > 10000) {
    lastWarn = millis();
    Serial.println(F("No data for 10 s: is the sender powered?"));
  }
}
#endif`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"nRF24 not responding\" at start-up", ru: "При запуске «nRF24 not responding»", kk: "Іске қосқанда «nRF24 not responding»" },
      cause: { en: "An SPI wire is swapped (MOSI/MISO are the usual pair), or the module has no 3.3 V.", ru: "Перепутан провод SPI (обычно MOSI/MISO), или на модуле нет 3,3 В.", kk: "SPI сымы ауысқан (әдетте MOSI/MISO) немесе модульде 3,3 В жоқ." },
      fix: { en: "Check MOSI → D11, MISO → D12, SCK → D13, CSN → D10, CE → D9, and measure 3.3 V between VCC and GND at the module.", ru: "Проверьте MOSI → D11, MISO → D12, SCK → D13, CSN → D10, CE → D9 и измерьте 3,3 В между VCC и GND у модуля.", kk: "MOSI → D11, MISO → D12, SCK → D13, CSN → D10, CE → D9 екенін тексеріп, модульдегі VCC мен GND арасында 3,3 В-ты өлшеңіз." },
    },
    {
      symptom: { en: "The sender always prints \"no ack\"", ru: "Передатчик всё время печатает «no ack»", kk: "Жіберуші үнемі «no ack» деп шығарады" },
      cause: { en: "The receiver is not listening on the same channel, data rate and address, or both boards run the TX role.", ru: "Приёмник не слушает тот же канал, скорость и адрес, или на обеих платах роль TX.", kk: "Қабылдағыш сол арнаны, жылдамдықты және мекенжайды тыңдамайды немесе екі платада да TX рөлі." },
      fix: { en: "Flash the receiver with ROLE_TRANSMITTER 0 and keep RADIO_CHANNEL, the data rate and ADDRESS identical on both.", ru: "Прошейте приёмник с ROLE_TRANSMITTER 0 и держите RADIO_CHANNEL, скорость и ADDRESS одинаковыми на обоих.", kk: "Қабылдағышты ROLE_TRANSMITTER 0 мәнімен жүктеп, RADIO_CHANNEL, жылдамдық пен ADDRESS екеуінде бірдей болсын." },
    },
    {
      symptom: { en: "Works on the desk, drops packets further away", ru: "На столе работает, на расстоянии теряет пакеты", kk: "Үстелде жұмыс істейді, алыста пакеттер жоғалады" },
      cause: { en: "The Nano's 3V3 pin (especially on CH340 clones) sags during transmit bursts.", ru: "Пин 3V3 Nano (особенно у клонов на CH340) проседает во время передачи.", kk: "Nano-ның 3V3 пині (әсіресе CH340 клондарында) жіберу кезінде төмендейді." },
      fix: { en: "Keep the 10 µF right at the module, add a 100 nF ceramic in parallel, or use an nRF24 socket adapter with its own 3.3 V regulator fed from 5V.", ru: "Держите 10 мкФ прямо у модуля, добавьте параллельно керамику 100 нФ или используйте переходник для nRF24 со своим стабилизатором 3,3 В от 5V.", kk: "10 мкФ-ты дәл модуль жанында ұстаңыз, қатар 100 нФ керамикалық конденсатор қосыңыз немесе 5V-тен қоректенетін өз 3,3 В тұрақтандырғышы бар nRF24 адаптерін қолданыңыз." },
    },
    {
      symptom: { en: "\"DHT22 read failed\" on the sender", ru: "На передатчике «DHT22 read failed»", kk: "Жіберушіде «DHT22 read failed»" },
      cause: { en: "DATA is not on D2, or the sensor type in the sketch does not match (DHT11 vs DHT22).", ru: "DATA не на D2, или тип датчика в скетче не совпадает (DHT11 и DHT22).", kk: "DATA D2-де емес немесе скетчтегі датчик түрі сәйкес емес (DHT11 және DHT22)." },
      fix: { en: "Move DATA to D2 and keep DHT22 in the constructor; a white sensor with a grid is a DHT22, a blue one is a DHT11.", ru: "Подключите DATA к D2 и оставьте DHT22 в конструкторе; белый датчик с решёткой это DHT22, голубой DHT11.", kk: "DATA-ны D2-ге қосып, конструкторда DHT22 қалдырыңыз; торы бар ақ датчик DHT22, көгілдірі DHT11." },
    },
  ],
  safety: [
    { en: "Never connect the nRF24L01 VCC to 5V; use the 3V3 pin or a dedicated 3.3 V regulator.", ru: "Никогда не подключайте VCC nRF24L01 к 5V; используйте пин 3V3 или отдельный стабилизатор 3,3 В.", kk: "nRF24L01 VCC-ін ешқашан 5V-ке қоспаңыз; 3V3 пинін немесе бөлек 3,3 В тұрақтандырғышты пайдаланыңыз." },
  ],
  simulation: {
    baud: 9600,
    lines: ["Role: sensor node (TX)", "TX #1 T=23.4 C H=41.0 % -> ack", "TX #2 T=23.4 C H=41.1 % -> ack", "TX #3 T=23.5 C H=41.1 % -> ack", "TX #4 T=23.5 C H=41.3 % -> no ack", "TX #5 T=23.5 C H=41.2 % -> ack", "TX #6 T=23.6 C H=41.2 % -> ack"],
    leds: [],
  },
} satisfies GuideContent;
