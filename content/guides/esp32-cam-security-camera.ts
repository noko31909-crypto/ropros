import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "esp32-cam-security-camera",
  status: "unverified",
  platform: "esp32",
  board: "esp32-cam",
  category: "security",
  robotics: false,
  difficulty: "intermediate",
  hours: 4,
  costUsd: 16,
  xpReward: 280,
  title: {
    en: "ESP32-CAM Motion Security Camera",
    ru: "Камера наблюдения с датчиком движения на ESP32-CAM",
    kk: "ESP32-CAM негізіндегі қозғалыс датчигі бар бақылау камерасы",
  },
  summary: {
    en: "A PIR sensor triggers the ESP32-CAM to save a burst of photos to its microSD card, while a web page shows the live video stream and links to the latest shots.",
    ru: "PIR-датчик заставляет ESP32-CAM сохранить серию снимков на microSD-карту, а веб-страница показывает видеопоток в реальном времени и ссылки на последние кадры.",
    kk: "PIR датчигі ESP32-CAM-ды microSD картасына бірнеше сурет сақтауға мәжбүрлейді, ал веб-бет тікелей бейне ағынын және соңғы кадрларға сілтемелерді көрсетеді.",
  },
  parts: [
    { component: "esp32-cam", qty: 1, spec: { en: "AI-Thinker ESP32-CAM with OV2640 and 4 MB PSRAM, plus a microSD card ≤32 GB (FAT32)", ru: "AI-Thinker ESP32-CAM с OV2640 и 4 МБ PSRAM, плюс microSD-карта до 32 ГБ (FAT32)", kk: "OV2640 және 4 МБ PSRAM бар AI-Thinker ESP32-CAM, сондай-ақ 32 ГБ-қа дейінгі microSD картасы (FAT32)" }, role: { en: "Camera, storage and web server", ru: "Камера, хранилище и веб-сервер", kk: "Камера, жад және веб-сервер" } },
    { component: "pir-hc-sr501", qty: 1, spec: { en: "HC-SR501, 3–7 m range, adjustable delay", ru: "HC-SR501, дальность 3–7 м, регулируемая задержка", kk: "HC-SR501, қашықтығы 3–7 м, кідірісі реттеледі" }, role: { en: "Motion trigger", ru: "Датчик движения для запуска съёмки", kk: "Түсірілімді іске қосатын қозғалыс датчигі" } },
    { component: "usb-5v", qty: 1, spec: { en: "5 V 2 A USB adapter with a cable cut to bare wires", ru: "USB-адаптер 5 В 2 А с кабелем, обрезанным до голых проводов", kk: "Ұшы жалаңаштанған кабелі бар 5 В 2 А USB адаптері" }, role: { en: "Stable 5 V for the camera and the PIR", ru: "Стабильные 5 В для камеры и PIR", kk: "Камера мен PIR үшін тұрақты 5 В" } },
    { component: "jumper-wires", qty: 10, spec: { en: "female-female and male-female", ru: "мама-мама и папа-мама", kk: "аналық-аналық және аталық-аналық" }, role: { en: "Connections and the programming adapter", ru: "Соединения и адаптер для прошивки", kk: "Қосылыстар және жүктеу адаптері" } },
    { component: "enclosure", qty: 1, spec: { en: "box with a lens hole and a window for the PIR dome", ru: "корпус с отверстием для объектива и окном для купола PIR", kk: "объективке тесігі және PIR күмбезіне терезесі бар қорап" }, role: { en: "Housing", ru: "Корпус", kk: "Корпус" }, optional: true },
  ],
  instances: [
    { id: "psu", component: "usb-5v", label: "5 V 2 A" },
    { id: "pir", component: "pir-hc-sr501", label: "PIR HC-SR501" },
  ],
  connections: [
    { from: "psu.5V", to: "board.5V", color: "red", note: { en: "5 V, not 3.3 V: the camera browns out on 3.3 V", ru: "5 В, а не 3,3 В: от 3,3 В камера сбоит из-за просадок", kk: "3,3 В емес, 5 В: 3,3 В-та камера кернеу түсуінен істен шығады" } },
    { from: "board.GND", to: "psu.GND", color: "black" },
    { from: "psu.5V", to: "pir.VCC", color: "red" },
    { from: "pir.GND", to: "board.GND2", color: "black" },
    { from: "pir.OUT", to: "board.GPIO13", color: "yellow", note: { en: "3.3 V output; GPIO13 is free in 1-bit SD mode", ru: "выход 3,3 В; GPIO13 свободен в 1-битном режиме SD", kk: "3,3 В шығыс; SD 1 биттік режимінде GPIO13 бос" } },
  ],
  steps: [
    {
      title: { en: "Prepare the board and the microSD card", ru: "Подготовьте плату и microSD-карту", kk: "Плата мен microSD картасын дайындаңыз" },
      body: {
        en: "Format a microSD card of 32 GB or less as FAT32 and push it into the slot until it clicks. Check that the ribbon of the OV2640 camera is fully seated in its connector and the latch is closed. The ESP32-CAM has no USB port, so you need a USB-serial adapter (CP2102, CH340 or FTDI with 3.3 V logic) or the ESP32-CAM-MB plug-in programmer board for uploading.",
        ru: "Отформатируйте microSD-карту объёмом до 32 ГБ в FAT32 и вставьте её в слот до щелчка. Проверьте, что шлейф камеры OV2640 до конца вставлен в разъём, а защёлка закрыта. У ESP32-CAM нет USB-порта, поэтому для загрузки нужен USB-UART адаптер (CP2102, CH340 или FTDI с логикой 3,3 В) или подключаемая плата-программатор ESP32-CAM-MB.",
        kk: "32 ГБ-қа дейінгі microSD картасын FAT32 етіп пішімдеп, оны ұяға сырт еткенше енгізіңіз. OV2640 камерасының шлейфі ажыратқышқа толық кіргенін және бекіткіші жабық екенін тексеріңіз. ESP32-CAM-да USB порты жоқ, сондықтан жүктеу үшін USB-UART адаптері (CP2102, CH340 немесе 3,3 В логикалы FTDI) не жалғанатын ESP32-CAM-MB бағдарламалағыш платасы керек.",
      },
      expect: { en: "Card inserted, camera ribbon locked, programming adapter at hand.", ru: "Карта вставлена, шлейф камеры зафиксирован, адаптер для прошивки под рукой.", kk: "Карта салынды, камера шлейфі бекітілді, жүктеу адаптері дайын." },
      mistake: { en: "64 GB+ cards come as exFAT and fail to mount until reformatted to FAT32.", ru: "Карты от 64 ГБ идут в exFAT и не монтируются, пока их не переформатировать в FAT32.", kk: "64 ГБ-тан асатын карталар exFAT пішімінде келеді және FAT32-ге қайта пішімделмейінше ашылмайды." },
    },
    {
      title: { en: "Connect the USB-serial adapter for flashing", ru: "Подключите USB-UART адаптер для прошивки", kk: "Жүктеу үшін USB-UART адаптерін қосыңыз" },
      body: {
        en: "This adapter is only used for uploading and is not on the diagram. Set it to 3.3 V logic. Wire adapter GND → ESP32-CAM GND, adapter 5V → ESP32-CAM 5V, adapter TX → U0R (GPIO3) and adapter RX → U0T (GPIO1): TX and RX cross over. Put a jumper from IO0 to GND, then press the RST button: the board is now in download mode. Disconnect the 5 V supply from the diagram while the adapter powers the board.",
        ru: "Этот адаптер нужен только для загрузки и не показан на схеме. Переключите его на логику 3,3 В. Соедините GND адаптера → GND ESP32-CAM, 5V адаптера → 5V ESP32-CAM, TX адаптера → U0R (GPIO3), RX адаптера → U0T (GPIO1): TX и RX перекрещиваются. Поставьте перемычку от IO0 к GND и нажмите кнопку RST: плата перешла в режим загрузки. Пока плату питает адаптер, отключите питание 5 В со схемы.",
        kk: "Бұл адаптер тек жүктеу үшін керек, сұлбада көрсетілмеген. Оны 3,3 В логикаға ауыстырыңыз. Адаптердің GND → ESP32-CAM GND, адаптердің 5V → ESP32-CAM 5V, адаптердің TX → U0R (GPIO3), адаптердің RX → U0T (GPIO1) қосыңыз: TX пен RX айқасады. IO0-ден GND-ге секіргіш қойып, RST батырмасын басыңыз: плата жүктеу режиміне өтті. Платаны адаптер қоректендіріп тұрғанда сұлбадағы 5 В қуатты ажыратыңыз.",
      },
      expect: { en: "The Serial Monitor at 115200 baud shows \"waiting for download\" after RST.", ru: "После RST Serial Monitor на 115200 бод показывает «waiting for download».", kk: "RST-тан кейін 115200 бодтағы Serial Monitor «waiting for download» көрсетеді." },
      mistake: { en: "An adapter left on 5 V logic sends 5 V into GPIO3, which is not 5 V tolerant.", ru: "Адаптер, оставленный на логике 5 В, подаёт 5 В на GPIO3, который их не выдерживает.", kk: "5 В логикада қалған адаптер 5 В-қа шыдамайтын GPIO3-ке 5 В береді." },
    },
    {
      title: { en: "Upload the sketch", ru: "Загрузите скетч", kk: "Скетчті жүктеңіз" },
      body: {
        en: "In the Arduino IDE select the board \"AI Thinker ESP32-CAM\" (PSRAM is enabled for it). Enter your Wi-Fi name and password, click Upload and wait for \"Hard resetting\". Then remove the IO0–GND jumper and press RST again so the sketch starts normally. The camera and SD libraries come with the esp32 board package; nothing extra to install.",
        ru: "В Arduino IDE выберите плату «AI Thinker ESP32-CAM» (PSRAM для неё включён). Впишите имя и пароль Wi-Fi, нажмите Upload и дождитесь «Hard resetting». Затем снимите перемычку IO0–GND и снова нажмите RST, чтобы скетч запустился в обычном режиме. Библиотеки камеры и SD входят в пакет плат esp32, ничего дополнительно ставить не нужно.",
        kk: "Arduino IDE-де «AI Thinker ESP32-CAM» платасын таңдаңыз (оған PSRAM қосулы). Wi-Fi атауы мен құпиясөзін жазып, Upload басыңыз да, «Hard resetting» жазуын күтіңіз. Содан кейін IO0–GND секіргішін алып, скетч қалыпты іске қосылуы үшін RST-ті қайта басыңыз. Камера мен SD кітапханалары esp32 платалар пакетімен бірге келеді, қосымша ештеңе орнатудың қажеті жоқ.",
      },
      expect: { en: "\"camera OK\", \"SD card OK\" and the stream address appear in the Serial Monitor.", ru: "В Serial Monitor появляются «camera OK», «SD card OK» и адрес видеопотока.", kk: "Serial Monitor-да «camera OK», «SD card OK» және бейне ағынының мекенжайы шығады." },
      mistake: { en: "Forgetting to remove the IO0 jumper keeps the board in download mode and the sketch never runs.", ru: "Если не снять перемычку IO0, плата останется в режиме загрузки и скетч не запустится.", kk: "IO0 секіргішін алмасаңыз, плата жүктеу режимінде қалып, скетч іске қосылмайды." },
    },
    {
      title: { en: "Wire the PIR sensor and the 5 V supply", ru: "Подключите PIR-датчик и питание 5 В", kk: "PIR датчигі мен 5 В қуатты қосыңыз" },
      body: {
        en: "Unplug the programming adapter. Connect the 5 V adapter's red wire to the ESP32-CAM 5V pin and to the PIR VCC, and its black wire to ESP32-CAM GND. Connect PIR GND to the second GND pin and PIR OUT to GPIO13. The HC-SR501 runs on 5 V but its output is 3.3 V, so it is safe for the ESP32. On the PIR, set the jumper to H (repeat trigger) and turn the delay potentiometer fully anticlockwise (about 3 s).",
        ru: "Отключите адаптер для прошивки. Красный провод адаптера 5 В подключите к пину 5V ESP32-CAM и к VCC датчика PIR, чёрный — к GND ESP32-CAM. GND датчика PIR подключите ко второму пину GND, а OUT — к GPIO13. HC-SR501 питается от 5 В, но его выход 3,3 В, так что он безопасен для ESP32. На PIR поставьте перемычку в H (повторный запуск) и поверните потенциометр задержки до упора против часовой стрелки (около 3 с).",
        kk: "Жүктеу адаптерін ажыратыңыз. 5 В адаптердің қызыл сымын ESP32-CAM-ның 5V пиніне және PIR VCC-ге, қара сымын ESP32-CAM GND-ге қосыңыз. PIR GND-ін екінші GND пиніне, OUT-ын GPIO13-ке қосыңыз. HC-SR501 5 В-пен қоректенеді, бірақ шығысы 3,3 В, сондықтан ESP32 үшін қауіпсіз. PIR-де секіргішті H күйіне (қайталап іске қосу) қойып, кідіріс потенциометрін сағат тіліне қарсы соңына дейін бұраңыз (шамамен 3 с).",
      },
      expect: { en: "About a minute after power-up (PIR warm-up), waving a hand prints \"motion!\".", ru: "Примерно через минуту после включения (прогрев PIR) взмах руки печатает «motion!».", kk: "Қосқаннан кейін шамамен бір минуттан соң (PIR қызуы) қол бұлғасаңыз, «motion!» шығады." },
      mistake: { en: "Powering the ESP32-CAM from a thin or long USB cable causes \"Brownout detector was triggered\" resets.", ru: "Питание ESP32-CAM через тонкий или длинный USB-кабель вызывает перезагрузки «Brownout detector was triggered».", kk: "ESP32-CAM-ды жіңішке не ұзын USB кабелі арқылы қоректендірсеңіз, «Brownout detector was triggered» қайта жүктелулері болады." },
    },
    {
      title: { en: "Watch the stream and check the photos", ru: "Посмотрите видеопоток и проверьте снимки", kk: "Бейне ағынын қарап, суреттерді тексеріңіз" },
      body: {
        en: "Open the printed address in a browser on the same network. The page shows the live stream (served on port 81) and the last 10 saved photos as links. Walk past the PIR: the camera saves three photos 0.5 s apart as /motion_00001.jpg, /motion_00002.jpg… and then waits 10 s before the next burst. The photo counter is stored in flash, so numbering continues after a restart.",
        ru: "Откройте напечатанный адрес в браузере в той же сети. Страница показывает живой видеопоток (он идёт через порт 81) и ссылки на 10 последних снимков. Пройдите мимо PIR: камера сохранит три снимка с интервалом 0,5 с как /motion_00001.jpg, /motion_00002.jpg… и подождёт 10 с перед следующей серией. Счётчик снимков хранится во флеш-памяти, поэтому нумерация продолжается после перезагрузки.",
        kk: "Шығарылған мекенжайды сол желідегі браузерде ашыңыз. Бет тікелей бейне ағынын (ол 81-порт арқылы жүреді) және соңғы 10 суретке сілтемелерді көрсетеді. PIR-дің жанынан өтіңіз: камера 0,5 с аралықпен үш суретті /motion_00001.jpg, /motion_00002.jpg… деп сақтап, келесі топтамаға дейін 10 с күтеді. Сурет санауышы флеш жадта сақталады, сондықтан нөмірлеу қайта жүктелгеннен кейін жалғасады.",
      },
      expect: { en: "New links appear on the page within 3 s of motion, and each opens a sharp 800×600 JPEG.", ru: "Через 3 с после движения на странице появляются новые ссылки, каждая открывает чёткий JPEG 800×600.", kk: "Қозғалыстан кейін 3 с ішінде бетте жаңа сілтемелер пайда болады, әрқайсысы анық 800×600 JPEG ашады." },
      mistake: { en: "The PIR mounted right next to the ESP32-CAM antenna gives false triggers from Wi-Fi bursts; keep it 20 cm away.", ru: "PIR, установленный вплотную к антенне ESP32-CAM, ложно срабатывает от пакетов Wi-Fi; разнесите их на 20 см.", kk: "ESP32-CAM антеннасының дәл жанына орнатылған PIR Wi-Fi пакеттерінен жалған іске қосылады; оларды 20 см алшақ қойыңыз." },
    },
  ],
  code: [{
    filename: "esp32cam_security.ino",
    language: "cpp",
    libraries: [],
    source: `#include "esp_camera.h"
#include "esp_http_server.h"
#include <WiFi.h>
#include "FS.h"
#include "SD_MMC.h"
#include <Preferences.h>

// ---- your network ----
const char* WIFI_SSID = "YOUR_WIFI";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";

const int PIR_PIN = 13;              // HC-SR501 OUT (free because the SD card runs in 1-bit mode)
const int SHOTS = 3;                  // photos per motion event
const unsigned long SHOT_GAP_MS = 500;
const unsigned long COOLDOWN_MS = 10000;

// AI-Thinker ESP32-CAM camera wiring (fixed on the board)
#define PWDN_GPIO_NUM 32
#define RESET_GPIO_NUM -1
#define XCLK_GPIO_NUM 0
#define SIOD_GPIO_NUM 26
#define SIOC_GPIO_NUM 27
#define Y9_GPIO_NUM 35
#define Y8_GPIO_NUM 34
#define Y7_GPIO_NUM 39
#define Y6_GPIO_NUM 36
#define Y5_GPIO_NUM 21
#define Y4_GPIO_NUM 19
#define Y3_GPIO_NUM 18
#define Y2_GPIO_NUM 5
#define VSYNC_GPIO_NUM 25
#define HREF_GPIO_NUM 23
#define PCLK_GPIO_NUM 22

#define PART_BOUNDARY "123456789000000000000987654321"
static const char* STREAM_TYPE = "multipart/x-mixed-replace;boundary=" PART_BOUNDARY;
static const char* STREAM_SEP = "\\r\\n--" PART_BOUNDARY "\\r\\n";
static const char* STREAM_PART = "Content-Type: image/jpeg\\r\\nContent-Length: %u\\r\\n\\r\\n";

Preferences prefs;
SemaphoreHandle_t sdLock;
bool sdOk = false;
volatile uint32_t photoCount = 0;
volatile bool motionNow = false;
bool lastPir = false;
unsigned long lastBurst = 0;
httpd_handle_t mainServer = nullptr, streamServer = nullptr;

const char INDEX_HTML[] = R"HTML(<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ESP32-CAM</title>
<style>
body{font-family:system-ui,sans-serif;background:#0f1115;color:#eee;margin:0;padding:16px}
img{width:100%;max-width:800px;border-radius:16px;background:#222}a{color:#2ee6c9}
#s{font-weight:700}
</style></head><body>
<h1>ESP32-CAM</h1><img id="v" alt="live stream"><p id="s">...</p><ul id="l"></ul>
<script>
document.getElementById('v').src='http://'+location.hostname+':81/stream';
function load(){fetch('/status').then(r=>r.json()).then(j=>{
  document.getElementById('s').textContent=(j.motion?'MOTION':'quiet')+', '+j.photos+' photos'+(j.sd?'':' (no SD card!)');
  const l=document.getElementById('l');l.replaceChildren();
  for(let n=j.photos;n>0&&n>j.photos-10;n--){
    const a=document.createElement('a');a.href='/photo?n='+n;a.textContent='motion_'+String(n).padStart(5,'0')+'.jpg';
    const li=document.createElement('li');li.appendChild(a);l.appendChild(li);}
}).catch(()=>{});}
load();setInterval(load,3000);
</script></body></html>)HTML";

bool initCamera() {
  camera_config_t c = {};
  c.ledc_channel = LEDC_CHANNEL_0;
  c.ledc_timer = LEDC_TIMER_0;
  c.pin_d0 = Y2_GPIO_NUM;
  c.pin_d1 = Y3_GPIO_NUM;
  c.pin_d2 = Y4_GPIO_NUM;
  c.pin_d3 = Y5_GPIO_NUM;
  c.pin_d4 = Y6_GPIO_NUM;
  c.pin_d5 = Y7_GPIO_NUM;
  c.pin_d6 = Y8_GPIO_NUM;
  c.pin_d7 = Y9_GPIO_NUM;
  c.pin_xclk = XCLK_GPIO_NUM;
  c.pin_pclk = PCLK_GPIO_NUM;
  c.pin_vsync = VSYNC_GPIO_NUM;
  c.pin_href = HREF_GPIO_NUM;
  c.pin_sccb_sda = SIOD_GPIO_NUM;
  c.pin_sccb_scl = SIOC_GPIO_NUM;
  c.pin_pwdn = PWDN_GPIO_NUM;
  c.pin_reset = RESET_GPIO_NUM;
  c.xclk_freq_hz = 20000000;
  c.pixel_format = PIXFORMAT_JPEG;
  c.grab_mode = CAMERA_GRAB_LATEST;
  if (psramFound()) {
    c.frame_size = FRAMESIZE_SVGA;   // 800x600
    c.jpeg_quality = 12;
    c.fb_count = 2;
    c.fb_location = CAMERA_FB_IN_PSRAM;
  } else {
    c.frame_size = FRAMESIZE_VGA;
    c.jpeg_quality = 14;
    c.fb_count = 1;
    c.fb_location = CAMERA_FB_IN_DRAM;
  }
  esp_err_t err = esp_camera_init(&c);
  if (err != ESP_OK) {
    Serial.printf("camera init failed: 0x%x\\n", err);
    return false;
  }
  Serial.printf("camera OK%s\\n", psramFound() ? ", PSRAM found" : ", no PSRAM (VGA only)");
  return true;
}

// ---------- web: index, status, saved photos (port 80) and MJPEG stream (port 81)
esp_err_t indexHandler(httpd_req_t* req) {
  httpd_resp_set_type(req, "text/html");
  return httpd_resp_send(req, INDEX_HTML, HTTPD_RESP_USE_STRLEN);
}

esp_err_t statusHandler(httpd_req_t* req) {
  char json[80];
  snprintf(json, sizeof json, "{\\"photos\\":%lu,\\"motion\\":%s,\\"sd\\":%s}",
           (unsigned long)photoCount, motionNow ? "true" : "false", sdOk ? "true" : "false");
  httpd_resp_set_type(req, "application/json");
  return httpd_resp_send(req, json, HTTPD_RESP_USE_STRLEN);
}

esp_err_t photoHandler(httpd_req_t* req) {
  char query[32], val[12];
  if (httpd_req_get_url_query_str(req, query, sizeof query) != ESP_OK ||
      httpd_query_key_value(query, "n", val, sizeof val) != ESP_OK) {
    return httpd_resp_send_err(req, HTTPD_400_BAD_REQUEST, "use /photo?n=1");
  }
  char* end = nullptr;
  unsigned long n = strtoul(val, &end, 10);
  if (*end != 0 || n < 1 || n > photoCount) return httpd_resp_send_err(req, HTTPD_404_NOT_FOUND, "no such photo");
  char path[32];
  snprintf(path, sizeof path, "/motion_%05lu.jpg", n);

  static uint8_t buf[2048];   // static: the server task has a small stack
  xSemaphoreTake(sdLock, portMAX_DELAY);
  File f = SD_MMC.open(path, FILE_READ);
  xSemaphoreGive(sdLock);
  if (!f) return httpd_resp_send_err(req, HTTPD_404_NOT_FOUND, "file missing on SD");
  httpd_resp_set_type(req, "image/jpeg");
  esp_err_t res = ESP_OK;
  while (res == ESP_OK) {
    xSemaphoreTake(sdLock, portMAX_DELAY);
    size_t got = f.read(buf, sizeof buf);
    xSemaphoreGive(sdLock);
    if (got == 0) break;
    res = httpd_resp_send_chunk(req, (const char*)buf, got);
  }
  xSemaphoreTake(sdLock, portMAX_DELAY);
  f.close();
  xSemaphoreGive(sdLock);
  if (res == ESP_OK) res = httpd_resp_send_chunk(req, nullptr, 0);
  return res;
}

esp_err_t streamHandler(httpd_req_t* req) {
  esp_err_t res = httpd_resp_set_type(req, STREAM_TYPE);
  char part[64];
  while (res == ESP_OK) {
    camera_fb_t* fb = esp_camera_fb_get();
    if (!fb) return ESP_FAIL;
    size_t hlen = snprintf(part, sizeof part, STREAM_PART, (unsigned)fb->len);
    res = httpd_resp_send_chunk(req, STREAM_SEP, strlen(STREAM_SEP));
    if (res == ESP_OK) res = httpd_resp_send_chunk(req, part, hlen);
    if (res == ESP_OK) res = httpd_resp_send_chunk(req, (const char*)fb->buf, fb->len);
    esp_camera_fb_return(fb);
  }
  return res;   // the browser closed the page
}

void addGet(httpd_handle_t server, const char* uri, esp_err_t (*handler)(httpd_req_t*)) {
  httpd_uri_t u = {};
  u.uri = uri;
  u.method = HTTP_GET;
  u.handler = handler;
  u.user_ctx = nullptr;
  httpd_register_uri_handler(server, &u);
}

void startServers() {
  httpd_config_t cfg = HTTPD_DEFAULT_CONFIG();
  cfg.server_port = 80;
  cfg.ctrl_port = 32768;
  if (httpd_start(&mainServer, &cfg) == ESP_OK) {
    addGet(mainServer, "/", indexHandler);
    addGet(mainServer, "/status", statusHandler);
    addGet(mainServer, "/photo", photoHandler);
  }
  cfg.server_port = 81;
  cfg.ctrl_port = 32769;
  if (httpd_start(&streamServer, &cfg) == ESP_OK) addGet(streamServer, "/stream", streamHandler);
}

// ---------- photos
void savePhoto() {
  camera_fb_t* fb = esp_camera_fb_get();
  if (!fb) { Serial.println("capture failed"); return; }
  uint32_t n = photoCount + 1;
  char path[32];
  snprintf(path, sizeof path, "/motion_%05lu.jpg", (unsigned long)n);
  xSemaphoreTake(sdLock, portMAX_DELAY);
  File f = SD_MMC.open(path, FILE_WRITE);
  size_t written = f ? f.write(fb->buf, fb->len) : 0;
  if (f) f.close();
  xSemaphoreGive(sdLock);
  if (written == fb->len) {
    photoCount = n;
    prefs.putULong("count", n);
    Serial.printf("saved %s (%u bytes)\\n", path, (unsigned)fb->len);
  } else {
    Serial.printf("SD write failed for %s\\n", path);
  }
  esp_camera_fb_return(fb);
}

void setup() {
  Serial.begin(115200);
  pinMode(PIR_PIN, INPUT);
  sdLock = xSemaphoreCreateMutex();
  if (!initCamera()) { delay(3000); ESP.restart(); }

  // 1-bit mode uses only GPIO2/14/15, which leaves GPIO13 for the PIR and keeps the flash LED on GPIO4 dark
  sdOk = SD_MMC.begin("/sdcard", true) && SD_MMC.cardType() != CARD_NONE;
  prefs.begin("cam", false);
  photoCount = prefs.getULong("count", 0);
  if (sdOk) Serial.printf("SD card OK, %.1f GB, next photo #%lu\\n", SD_MMC.cardSize() / 1e9, (unsigned long)photoCount + 1);
  else Serial.println("SD card not found: stream only, photos are not saved");

  WiFi.mode(WIFI_STA);
  WiFi.setSleep(false);   // smoother stream
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.printf("\\nstream: http://%s/\\n", WiFi.localIP().toString().c_str());
  startServers();
}

void loop() {
  bool pir = digitalRead(PIR_PIN) == HIGH;
  motionNow = pir;
  if (pir && !lastPir) {
    Serial.println("motion!");
    if (sdOk && millis() - lastBurst > COOLDOWN_MS) {
      lastBurst = millis();
      esp_camera_fb_return(esp_camera_fb_get());   // drop a stale frame
      for (int i = 0; i < SHOTS; i++) {
        savePhoto();
        delay(SHOT_GAP_MS);
      }
    }
  } else if (!pir && lastPir) {
    Serial.println("motion ended");
  }
  lastPir = pir;
  delay(50);
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "\"camera init failed: 0x105\" or 0x20004", ru: "«camera init failed: 0x105» или 0x20004", kk: "«camera init failed: 0x105» немесе 0x20004" },
      cause: { en: "The camera ribbon is loose, or the wrong board was selected so the pin map does not match.", ru: "Шлейф камеры плохо вставлен или выбрана не та плата, и распиновка не совпадает.", kk: "Камера шлейфі нашар салынған немесе басқа плата таңдалып, пиндер сәйкес келмейді." },
      fix: { en: "Reseat the ribbon with the latch open, close the latch, select \"AI Thinker ESP32-CAM\" and upload again.", ru: "Переставьте шлейф с открытой защёлкой, закройте её, выберите «AI Thinker ESP32-CAM» и загрузите снова.", kk: "Бекіткішті ашып, шлейфті қайта салыңыз, оны жабыңыз да, «AI Thinker ESP32-CAM» таңдап, қайта жүктеңіз." },
    },
    {
      symptom: { en: "\"Brownout detector was triggered\" and endless resets", ru: "«Brownout detector was triggered» и бесконечные перезагрузки", kk: "«Brownout detector was triggered» және шексіз қайта жүктелу" },
      cause: { en: "The supply sags when Wi-Fi and the camera start together.", ru: "Питание проседает, когда одновременно стартуют Wi-Fi и камера.", kk: "Wi-Fi мен камера бірге іске қосылғанда қуат кернеуі түседі." },
      fix: { en: "Use a 5 V 2 A adapter with short, thick wires to the 5V pin. Never feed the board from its 3V3 pin.", ru: "Используйте адаптер 5 В 2 А с короткими толстыми проводами к пину 5V. Никогда не питайте плату через пин 3V3.", kk: "5V пиніне қысқа, жуан сымдары бар 5 В 2 А адаптерін пайдаланыңыз. Платаны ешқашан 3V3 пині арқылы қоректендірмеңіз." },
    },
    {
      symptom: { en: "Photos are saved even when nobody is there", ru: "Снимки сохраняются, даже когда никого нет", kk: "Ешкім жоқ кезде де суреттер сақталады" },
      cause: { en: "The HC-SR501 reacts to Wi-Fi RF, sunlight or a heater in its view.", ru: "HC-SR501 реагирует на радиоизлучение Wi-Fi, солнце или обогреватель в поле зрения.", kk: "HC-SR501 Wi-Fi радиосәулесіне, күнге не көру аймағындағы жылытқышқа әсер етеді." },
      fix: { en: "Move the PIR 20 cm from the camera board on longer wires, turn sensitivity down and point it away from windows and heaters.", ru: "Вынесите PIR на 20 см от платы камеры на длинных проводах, уменьшите чувствительность и отверните его от окон и обогревателей.", kk: "PIR-ді ұзын сымдармен камера платасынан 20 см алыстатып, сезімталдығын азайтыңыз және терезелер мен жылытқыштардан бұрыңыз." },
    },
    {
      symptom: { en: "\"SD card not found\"", ru: "«SD card not found»", kk: "«SD card not found»" },
      cause: { en: "The card is exFAT, larger than 32 GB, or not fully inserted.", ru: "Карта в exFAT, больше 32 ГБ или вставлена не до конца.", kk: "Карта exFAT пішімінде, 32 ГБ-тан үлкен немесе толық салынбаған." },
      fix: { en: "Format a ≤32 GB card as FAT32 on a computer and push it in until it clicks.", ru: "Отформатируйте карту до 32 ГБ в FAT32 на компьютере и вставьте её до щелчка.", kk: "32 ГБ-қа дейінгі картаны компьютерде FAT32 етіп пішімдеп, сырт еткенше салыңыз." },
    },
  ],
  safety: [
    { en: "Respect privacy laws: only film your own property, never neighbours' windows or public paths, and tell people in your home the camera exists.", ru: "Соблюдайте законы о частной жизни: снимайте только свою территорию, не окна соседей и не общественные места, и предупредите домашних о камере.", kk: "Жеке өмір туралы заңдарды сақтаңыз: тек өз аумағыңызды түсіріңіз, көршілердің терезелерін және қоғамдық орындарды түсірмеңіз, үйдегілерге камера туралы айтыңыз." },
    { en: "The stream has no password: keep it on your home network and never forward ports 80/81 to the internet.", ru: "У видеопотока нет пароля: держите его в домашней сети и никогда не пробрасывайте порты 80/81 в интернет.", kk: "Бейне ағынында құпиясөз жоқ: оны үй желісінде ұстаңыз және 80/81 порттарын ешқашан интернетке шығармаңыз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "camera OK, PSRAM found",
      "SD card OK, 15.9 GB, next photo #1",
      "Connecting.....",
      "stream: http://192.168.1.90/",
      "motion!",
      "saved /motion_00001.jpg (38412 bytes)",
      "saved /motion_00002.jpg (37980 bytes)",
      "saved /motion_00003.jpg (38106 bytes)",
      "motion ended",
    ],
    leds: [],
  },
} satisfies GuideContent;
