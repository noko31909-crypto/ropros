import type { GuideContent } from "../../lib/content/schema.ts";

export default {
  slug: "mecanum-rover",
  status: "unverified",
  platform: "esp32",
  board: "esp32-devkit",
  category: "robotics",
  robotics: true,
  difficulty: "advanced",
  hours: 10,
  costUsd: 64,
  xpReward: 420,
  title: {
    en: "Mecanum Omnidirectional Rover",
    ru: "Всенаправленный ровер на колёсах Mecanum",
    kk: "Mecanum дөңгелекті жан-жаққа жүретін ровер",
  },
  summary: {
    en: "Four mecanum wheels, two TB6612FNG drivers and an ESP32: drive forward, sideways, diagonally or spin on the spot from a phone joystick over the rover's own Wi-Fi.",
    ru: "Четыре колеса Mecanum, два драйвера TB6612FNG и ESP32: вперёд, боком, по диагонали или разворот на месте с джойстика на телефоне через собственный Wi-Fi ровера.",
    kk: "Төрт Mecanum дөңгелегі, екі TB6612FNG драйвері және ESP32: роверге тән Wi-Fi арқылы телефондағы джойстикпен алға, бүйірге, диагональ бойымен жүреді немесе орнында айналады.",
  },
  parts: [
    { component: "esp32-devkit", qty: 1, spec: { en: "ESP32-WROOM-32 DevKit (38-pin is easiest to wire)", ru: "ESP32-WROOM-32 DevKit (38 пинов удобнее)", kk: "ESP32-WROOM-32 DevKit (38 пинді қосу оңайырақ)" }, role: { en: "Kinematics, Wi-Fi hotspot, web joystick", ru: "Кинематика, точка доступа, веб-джойстик", kk: "Кинематика, Wi-Fi нүктесі, веб-джойстик" } },
    { component: "tb6612fng", qty: 2, spec: { en: "breakouts, 1.2 A per channel", ru: "модули, 1,2 А на канал", kk: "модульдер, арнаға 1,2 А" }, role: { en: "Front and rear motor drivers", ru: "Передний и задний драйверы моторов", kk: "Алдыңғы және артқы мотор драйверлері" } },
    { component: "dc-motor", qty: 4, spec: { en: "TT gear motors 1:48, 3–6 V, same batch", ru: "моторы TT 1:48, 3–6 В, из одной партии", kk: "TT моторлары 1:48, 3–6 В, бір партиядан" }, role: { en: "One per wheel", ru: "По одному на колесо", kk: "Әр дөңгелекке біреуден" } },
    { component: "mecanum-wheels", qty: 1, spec: { en: "set of 4 (2 left-hand + 2 right-hand), 60–65 mm, TT hub", ru: "комплект из 4 (2 левых + 2 правых), 60–65 мм, под вал TT", kk: "4 дана жиынтық (2 сол + 2 оң), 60–65 мм, TT білігіне" }, role: { en: "Omnidirectional traction", ru: "Всенаправленное сцепление", kk: "Жан-жақты ілінісу" } },
    { component: "robot-chassis-4wd", qty: 1, spec: { en: "4WD deck for TT motors", ru: "платформа 4WD под моторы TT", kk: "TT моторларына арналған 4WD платформа" }, role: { en: "Frame", ru: "Рама", kk: "Рама" } },
    { component: "battery-2s-lipo", qty: 1, spec: { en: "7.4 V 2S, 2200 mAh, 20C+", ru: "7,4 В 2S, 2200 мА·ч, от 20C", kk: "7,4 В 2S, 2200 мА·сағ, 20C-тан" }, role: { en: "Main power", ru: "Основное питание", kk: "Негізгі қуат" } },
    { component: "buck-converter-lm2596", qty: 1, spec: { en: "set to 5.0 V", ru: "выставлен на 5,0 В", kk: "5,0 В-қа бапталған" }, role: { en: "5 V for the ESP32", ru: "5 В для ESP32", kk: "ESP32 үшін 5 В" } },
    { component: "slide-switch", qty: 1, spec: { en: "SPDT toggle (MTS-102) rated 5 A", ru: "SPDT тумблер (MTS-102) на 5 А", kk: "5 А-ға арналған SPDT тумблер (MTS-102)" }, role: { en: "Main power switch", ru: "Главный выключатель", kk: "Негізгі ажыратқыш" } },
    { component: "jumper-wires", qty: 30, spec: { en: "male-female, plus 22 AWG for power", ru: "папа-мама, плюс провод 22 AWG для питания", kk: "аталық-аналық, қуат үшін 22 AWG сым" }, role: { en: "Wiring", ru: "Проводка", kk: "Сымдар" } },
  ],
  instances: [
    { id: "bat", component: "battery-2s-lipo", label: "2S 7.4 V" },
    { id: "sw", component: "slide-switch", label: "Power" },
    { id: "buck", component: "buck-converter-lm2596", label: "Buck 5.0 V" },
    { id: "drv_f", component: "tb6612fng", label: "Front TB6612" },
    { id: "drv_r", component: "tb6612fng", label: "Rear TB6612" },
    { id: "m_fl", component: "dc-motor", label: "Front left" },
    { id: "m_fr", component: "dc-motor", label: "Front right" },
    { id: "m_rl", component: "dc-motor", label: "Rear left" },
    { id: "m_rr", component: "dc-motor", label: "Rear right" },
  ],
  connections: [
    { from: "bat.+", to: "sw.C", color: "red" },
    { from: "sw.1", to: "buck.IN+", color: "red" },
    { from: "sw.1", to: "drv_f.VM", color: "red" },
    { from: "sw.1", to: "drv_r.VM", color: "red" },
    { from: "bat.-", to: "buck.IN-", color: "black" },
    { from: "bat.-", to: "drv_f.GND", color: "black", note: { en: "star ground: each driver gets its own wire to battery −", ru: "звезда: у каждого драйвера свой провод к минусу", kk: "жұлдыз: әр драйверге минусқа жеке сым" } },
    { from: "bat.-", to: "drv_r.GND", color: "black" },
    { from: "buck.OUT+", to: "board.5V", color: "red", note: { en: "5.0 V, measured first", ru: "5,0 В, проверено заранее", kk: "5,0 В, алдын ала өлшенген" } },
    { from: "buck.OUT-", to: "board.GND", color: "black" },
    { from: "drv_f.VCC", to: "board.3V3", color: "orange" },
    { from: "drv_r.VCC", to: "board.3V3", color: "orange" },
    { from: "drv_f.GND2", to: "board.GND2", color: "black" },
    { from: "drv_r.GND2", to: "board.GND3", color: "black" },
    { from: "board.GPIO25", to: "drv_f.PWMA", color: "yellow" },
    { from: "board.GPIO26", to: "drv_f.AIN1", color: "green" },
    { from: "board.GPIO27", to: "drv_f.AIN2", color: "blue" },
    { from: "board.GPIO13", to: "drv_f.BIN1", color: "green" },
    { from: "board.GPIO14", to: "drv_f.BIN2", color: "blue" },
    { from: "board.GPIO32", to: "drv_f.PWMB", color: "yellow" },
    { from: "board.GPIO23", to: "drv_r.PWMA", color: "yellow" },
    { from: "board.GPIO22", to: "drv_r.AIN1", color: "green" },
    { from: "board.GPIO21", to: "drv_r.AIN2", color: "blue" },
    { from: "board.GPIO18", to: "drv_r.BIN1", color: "green" },
    { from: "board.GPIO19", to: "drv_r.BIN2", color: "blue" },
    { from: "board.GPIO4", to: "drv_r.PWMB", color: "yellow" },
    { from: "board.GPIO33", to: "drv_f.STBY", color: "white", note: { en: "one pin enables both drivers", ru: "один пин включает оба драйвера", kk: "бір пин екі драйверді де қосады" } },
    { from: "board.GPIO33", to: "drv_r.STBY", color: "white" },
    { from: "drv_f.AO1", to: "m_fl.+", color: "red" },
    { from: "drv_f.AO2", to: "m_fl.-", color: "black" },
    { from: "drv_f.BO1", to: "m_fr.+", color: "red" },
    { from: "drv_f.BO2", to: "m_fr.-", color: "black" },
    { from: "drv_r.AO1", to: "m_rl.+", color: "red" },
    { from: "drv_r.AO2", to: "m_rl.-", color: "black" },
    { from: "drv_r.BO1", to: "m_rr.+", color: "red" },
    { from: "drv_r.BO2", to: "m_rr.-", color: "black" },
  ],
  steps: [
    {
      title: { en: "Mount the motors and the wheels in an X", ru: "Установите моторы и колёса крестом", kk: "Моторлар мен дөңгелектерді X пішінімен орнатыңыз" },
      body: {
        en: "Bolt the four TT motors to the 4WD deck with the shafts outward. Mecanum wheels come in two mirror types. Fit them so that, looking down from above, the rollers on top of the wheels form an X across the rover: front-left and rear-right are one type, front-right and rear-left the other. Label each motor FL, FR, RL, RR with tape.",
        ru: "Прикрутите четыре мотора TT к платформе 4WD валами наружу. Колёса Mecanum бывают двух зеркальных типов. Наденьте их так, чтобы при взгляде сверху верхние ролики колёс образовали букву X через весь ровер: переднее левое и заднее правое одного типа, переднее правое и заднее левое другого. Подпишите моторы скотчем: FL, FR, RL, RR.",
        kk: "Төрт TT моторын 4WD платформасына біліктерін сыртқа қаратып бұраңыз. Mecanum дөңгелектерінің екі айналы түрі бар. Оларды жоғарыдан қарағанда дөңгелектердің үстіңгі роликтері бүкіл ровер бойынша X әрпін құрайтындай кигізіңіз: алдыңғы сол мен артқы оң бір түрлі, алдыңғы оң мен артқы сол екінші түрлі. Моторларға скотчпен FL, FR, RL, RR деп жазыңыз.",
      },
      expect: { en: "Seen from above, the top rollers draw an X; the rover rolls freely when pushed forward.", ru: "Сверху верхние ролики рисуют X; ровер свободно катится вперёд от толчка.", kk: "Жоғарыдан үстіңгі роликтер X сызады; ровер итергенде алға еркін домалайды." },
      mistake: { en: "Mounting all four wheels the same way. Forward still works, but sideways motion becomes a wobble.", ru: "Поставить все четыре колеса одинаково. Вперёд он поедет, но вбок только будет дёргаться.", kk: "Төрт дөңгелекті бірдей қою. Алға жүреді, бірақ бүйірге тек жұлқынады." },
    },
    {
      title: { en: "Set the buck and run the power wiring", ru: "Настройте преобразователь и проведите питание", kk: "Түрлендіргішті баптап, қуат сымдарын тартыңыз" },
      body: {
        en: "With nothing else connected, feed the buck from the battery through the switch and set its output to 5.0 V. Then run thicker wire from switch pin 1 to VM of both TB6612FNG boards and a separate wire from battery − to each driver's GND (a star, so the two drivers do not share one thin return). Buck OUT+ → ESP32 5V, OUT- → GND. Both driver VCC pins → 3V3, their GND2 pins → ESP32 GND2 and GND3.",
        ru: "Пока больше ничего не подключено, подайте батарею через выключатель на преобразователь и выставьте 5,0 В. Затем проведите более толстый провод от вывода 1 выключателя к VM обоих TB6612FNG и отдельный провод от минуса батареи к GND каждого драйвера (звездой, чтобы драйверы не делили один тонкий обратный провод). OUT+ → 5V ESP32, OUT- → GND. Оба VCC драйверов → 3V3, их GND2 → GND2 и GND3 ESP32.",
        kk: "Әзірге басқа ештеңе қосылмаған кезде батареяны ажыратқыш арқылы түрлендіргішке беріп, 5,0 В орнатыңыз. Содан кейін ажыратқыштың 1-шығысынан екі TB6612FNG-нің VM пиндеріне жуанырақ сым, ал батарея минусынан әр драйвердің GND-не бөлек сым тартыңыз (жұлдыз тәрізді, драйверлер бір жіңішке кері сымды бөліспесін). OUT+ → ESP32 5V, OUT- → GND. Екі драйвердің VCC пиндері → 3V3, GND2 пиндері → ESP32-нің GND2 және GND3 пиндері.",
      },
      expect: { en: "Switch on without USB: ESP32 LED on, 7–8.4 V on both VM pins, nothing moves.", ru: "Включение без USB: светодиод ESP32 горит, на обоих VM 7–8,4 В, ничего не движется.", kk: "USB-сіз қосқанда: ESP32 шамы жанады, екі VM-де 7–8,4 В, ештеңе қозғалмайды." },
      mistake: { en: "Plugging in USB with the switch ON: the 5V pin is then fed from the PC and the buck at the same time. Always switch OFF before connecting USB.", ru: "Подключить USB при включённом выключателе: пин 5V тогда питается одновременно от ПК и преобразователя. Всегда выключайте питание перед USB.", kk: "Ажыратқыш қосулы кезде USB қосу: сонда 5V пині ДК мен түрлендіргіштен қатар қоректенеді. USB алдында қуатты әрқашан өшіріңіз." },
    },
    {
      title: { en: "Wire the control signals", ru: "Подключите управляющие сигналы", kk: "Басқару сигналдарын қосыңыз" },
      body: {
        en: "Front driver: PWMA GPIO25, AIN1 GPIO26, AIN2 GPIO27 (front-left); BIN1 GPIO13, BIN2 GPIO14, PWMB GPIO32 (front-right). Rear driver: PWMA GPIO23, AIN1 GPIO22, AIN2 GPIO21 (rear-left); BIN1 GPIO18, BIN2 GPIO19, PWMB GPIO4 (rear-right). Both STBY pins go to GPIO33. Motors: FL on front AO1/AO2, FR on front BO1/BO2, RL on rear AO1/AO2, RR on rear BO1/BO2.",
        ru: "Передний драйвер: PWMA GPIO25, AIN1 GPIO26, AIN2 GPIO27 (переднее левое); BIN1 GPIO13, BIN2 GPIO14, PWMB GPIO32 (переднее правое). Задний драйвер: PWMA GPIO23, AIN1 GPIO22, AIN2 GPIO21 (заднее левое); BIN1 GPIO18, BIN2 GPIO19, PWMB GPIO4 (заднее правое). Оба STBY на GPIO33. Моторы: FL на AO1/AO2 переднего, FR на BO1/BO2 переднего, RL на AO1/AO2 заднего, RR на BO1/BO2 заднего.",
        kk: "Алдыңғы драйвер: PWMA GPIO25, AIN1 GPIO26, AIN2 GPIO27 (алдыңғы сол); BIN1 GPIO13, BIN2 GPIO14, PWMB GPIO32 (алдыңғы оң). Артқы драйвер: PWMA GPIO23, AIN1 GPIO22, AIN2 GPIO21 (артқы сол); BIN1 GPIO18, BIN2 GPIO19, PWMB GPIO4 (артқы оң). Екі STBY де GPIO33-ке. Моторлар: FL алдыңғының AO1/AO2-сіне, FR алдыңғының BO1/BO2-сіне, RL артқының AO1/AO2-сіне, RR артқының BO1/BO2-сіне.",
      },
      expect: { en: "13 signal wires leave the ESP32; every motor has its own channel.", ru: "От ESP32 идут 13 сигнальных проводов; у каждого мотора свой канал.", kk: "ESP32-ден 13 сигнал сымы шығады; әр мотордың өз арнасы бар." },
      mistake: { en: "Using GPIO0, 2, 12 or 15: they are boot straps and a driver input on them can stop the ESP32 from booting.", ru: "Использовать GPIO0, 2, 12 или 15: это пины загрузки, и вход драйвера на них может помешать ESP32 стартовать.", kk: "GPIO0, 2, 12 не 15-ті қолдану: бұлар жүктеу пиндері, оларға қосылған драйвер кірісі ESP32-нің іске қосылуына кедергі келтіруі мүмкін." },
    },
    {
      title: { en: "Upload and run the wheel test", ru: "Загрузите скетч и проверьте колёса", kk: "Скетчті жүктеп, дөңгелектерді тексеріңіз" },
      body: {
        en: "Select \"ESP32 Dev Module\" (esp32 core 3.x), change AP_PASS, switch the battery OFF and upload over USB. Put the rover on a box with the wheels in the air, unplug USB and switch on. On boot the sketch spins each wheel forward for half a second in the order FL, FR, RL, RR and prints its name. Every wheel must roll its top towards the front; if one turns backwards, swap that motor's two wires.",
        ru: "Выберите «ESP32 Dev Module» (ядро esp32 3.x), измените AP_PASS, выключите батарею и загрузите скетч по USB. Поставьте ровер на коробку, чтобы колёса висели, отключите USB и включите питание. При старте скетч по полсекунды крутит каждое колесо вперёд в порядке FL, FR, RL, RR и печатает его имя. Верх каждого колеса должен двигаться вперёд; если какое-то крутится назад, поменяйте местами провода этого мотора.",
        kk: "«ESP32 Dev Module» (esp32 ядросы 3.x) таңдап, AP_PASS-ты өзгертіңіз, батареяны өшіріп, USB арқылы жүктеңіз. Дөңгелектері ауада тұратындай роверді қорапқа қойып, USB-ді ажыратып, қуатты қосыңыз. Іске қосылғанда скетч әр дөңгелекті FL, FR, RL, RR ретімен жарты секундтан алға айналдырып, атын шығарады. Әр дөңгелектің үсті алға қарай жылжуы керек; біреуі кері айналса, сол мотордың екі сымын ауыстырыңыз.",
      },
      expect: { en: "\"wheel test FL\", \"FR\", \"RL\", \"RR\" in the monitor, each with the correct wheel spinning forward.", ru: "В мониторе «wheel test FL», «FR», «RL», «RR», и каждый раз вперёд крутится нужное колесо.", kk: "Мониторда «wheel test FL», «FR», «RL», «RR», әр жолы тиісті дөңгелек алға айналады." },
      mistake: { en: "Skipping this test. One reversed motor makes sideways driving impossible and is very hard to spot on the floor.", ru: "Пропустить этот тест. Один перевёрнутый мотор делает движение боком невозможным, а на полу это сложно заметить.", kk: "Бұл сынақты өткізіп жіберу. Бір кері мотор бүйірге жүруді мүмкін емес етеді, ал еденде мұны байқау қиын." },
    },
    {
      title: { en: "Drive in every direction", ru: "Ездите во всех направлениях", kk: "Барлық бағытта жүріңіз" },
      body: {
        en: "Join the ropros-mecanum network and open http://192.168.4.1. The round pad moves the rover: up is forward, right is a pure sideways slide, the corners are diagonals. The bar below spins it on the spot and springs back to zero when you let go. Combine both thumbs to circle around an object while facing it.",
        ru: "Подключитесь к сети ropros-mecanum и откройте http://192.168.4.1. Круглая площадка двигает ровер: вверх — вперёд, вправо — чистое движение боком, углы — диагонали. Полоса внизу разворачивает его на месте и возвращается в ноль, когда отпускаете палец. Работая двумя пальцами, можно объезжать предмет по кругу, глядя на него.",
        kk: "ropros-mecanum желісіне қосылып, http://192.168.4.1 ашыңыз. Дөңгелек алаң роверді жылжытады: жоғары — алға, оңға — таза бүйірлік сырғу, бұрыштар — диагональдар. Төмендегі жолақ оны орнында айналдырады және саусақты жібергенде нөлге қайтады. Екі саусақпен заттың айналасында оған қарап тұрып айналуға болады.",
      },
      expect: { en: "Sliding right keeps the nose pointing forward while the rover moves sideways.", ru: "При движении вправо нос остаётся направленным вперёд, а ровер едет боком.", kk: "Оңға жылжығанда тұмсығы алға қарап тұрады, ал ровер бүйірімен жүреді." },
      mistake: { en: "If a right push slides it left, the wheels form an O instead of an X: swap the front pair of wheels with each other and the rear pair with each other.", ru: "Если толчок вправо уводит его влево, колёса стоят буквой O вместо X: поменяйте местами передние колёса между собой и задние между собой.", kk: "Оңға итергенде солға жылжыса, дөңгелектер X емес, O құрап тұр: алдыңғы дөңгелектерді бір-бірімен, артқыларын бір-бірімен ауыстырыңыз." },
    },
    {
      title: { en: "Balance it on the floor", ru: "Отладьте на полу", kk: "Еденде теңшеңіз" },
      body: {
        en: "Mecanum wheels slip by design, so the sideways speed is lower than forward and a hard floor works better than carpet. If a slide drifts into a slow turn, one corner is weaker: check that wheel's set screw, its wires and that the rover sits evenly on all four wheels. The sketch caps duty at MAX_DUTY 180 so the 6 V motors are not overdriven by the 8.4 V pack.",
        ru: "Колёса Mecanum проскальзывают по своей природе, поэтому боком ровер едет медленнее, чем вперёд, а твёрдый пол лучше ковра. Если движение боком переходит в медленный поворот, один угол слабее: проверьте винт колеса, его провода и то, что ровер стоит ровно на всех четырёх колёсах. Скетч ограничивает скважность MAX_DUTY 180, чтобы батарея 8,4 В не перегружала моторы на 6 В.",
        kk: "Mecanum дөңгелектері табиғатынан тайғанайды, сондықтан ровер бүйірімен алғаға қарағанда баяу жүреді, ал қатты еден кілемнен жақсы. Бүйірлік жылжу баяу бұрылысқа айналса, бір бұрышы әлсіз: дөңгелектің бұрандасын, сымдарын және ровердің төрт дөңгелекте тең тұрғанын тексеріңіз. Скетч 8,4 В батарея 6 В моторларға артық жүктеме бермеуі үшін толтыруды MAX_DUTY 180-мен шектейді.",
      },
      expect: { en: "Clean slides on a hard floor with only a slight drift.", ru: "Чистое движение боком по твёрдому полу с небольшим уводом.", kk: "Қатты еденде аздап қана ауытқитын таза бүйірлік жылжу." },
      mistake: { en: "Raising MAX_DUTY to 255 for more speed: the motors run hot and the pack sags enough to reset the ESP32.", ru: "Поднять MAX_DUTY до 255 ради скорости: моторы перегреваются, а батарея проседает до перезагрузки ESP32.", kk: "Жылдамдық үшін MAX_DUTY-ді 255-ке көтеру: моторлар қызып кетеді, ал батарея ESP32 қайта жүктелетіндей отырады." },
    },
  ],
  code: [{
    filename: "mecanum_rover.ino",
    language: "cpp",
    libraries: [],
    source: `#include <WiFi.h>
#include <WebServer.h>

// ---- rover's own hotspot: CHANGE the password (8+ characters) ----
const char* AP_SSID = "ropros-mecanum";
const char* AP_PASS = "YOUR_PASSWORD";

// ---- front TB6612FNG: A = front-left, B = front-right ----
const int FL_PWM = 25, FL_IN1 = 26, FL_IN2 = 27;
const int FR_PWM = 32, FR_IN1 = 13, FR_IN2 = 14;
// ---- rear TB6612FNG: A = rear-left, B = rear-right ----
const int RL_PWM = 23, RL_IN1 = 22, RL_IN2 = 21;
const int RR_PWM = 4, RR_IN1 = 18, RR_IN2 = 19;
const int STBY_PIN = 33;                     // both drivers

const int PWM_FREQ = 20000, PWM_RESOLUTION = 8;
const int MAX_DUTY = 180;                    // 8.4 V pack, 6 V motors
const int MIN_DUTY = 70;                     // mecanum rollers need some torque to start
const unsigned long FAILSAFE_MS = 500;

struct Wheel { const char* name; int pwm, in1, in2; };
Wheel wheels[4] = {
  {"FL", FL_PWM, FL_IN1, FL_IN2},
  {"FR", FR_PWM, FR_IN1, FR_IN2},
  {"RL", RL_PWM, RL_IN1, RL_IN2},
  {"RR", RR_PWM, RR_IN1, RR_IN2},
};

WebServer server(80);
unsigned long lastCmd = 0, lastLog = 0;
bool moving = false;

const char PAGE[] PROGMEM = R"html(<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"><title>ropros mecanum</title>
<style>body{margin:0;background:#0b0f14;color:#e6edf3;font-family:system-ui,sans-serif;text-align:center;touch-action:none;user-select:none}
#pad{width:260px;height:260px;border-radius:50%;background:#16202b;border:2px solid #2a3644;margin:28px auto 20px;position:relative}
#knob{width:84px;height:84px;border-radius:50%;background:#ff7a1a;position:absolute;left:88px;top:88px}
#bar{width:280px;height:64px;border-radius:32px;background:#16202b;border:2px solid #2a3644;margin:0 auto;position:relative}
#spin{width:64px;height:64px;border-radius:50%;background:#2ee6c9;position:absolute;left:108px;top:0}#st{color:#8b98a5}</style></head>
<body><h3>move</h3><div id="pad"><div id="knob"></div></div><h3>spin</h3><div id="bar"><div id="spin"></div></div><p id="st">0 0 0</p>
<script>
const $=i=>document.getElementById(i),pad=$('pad'),bar=$('bar');let x=0,y=0,t=0,busy=false;
function drag(el,onMove,onEnd){let on=false;el.onpointerdown=e=>{on=true;el.setPointerCapture(e.pointerId);onMove(e)};
el.onpointermove=e=>{if(on)onMove(e)};el.onpointerup=el.onpointercancel=()=>{on=false;onEnd()}}
drag(pad,e=>{const b=pad.getBoundingClientRect(),R=88;let dx=e.clientX-b.left-130,dy=e.clientY-b.top-130;const d=Math.hypot(dx,dy);
if(d>R){dx*=R/d;dy*=R/d}$('knob').style.left=(88+dx)+'px';$('knob').style.top=(88+dy)+'px';x=Math.round(dx/R*100);y=Math.round(-dy/R*100)},
()=>{x=0;y=0;$('knob').style.left='88px';$('knob').style.top='88px'});
drag(bar,e=>{const b=bar.getBoundingClientRect();let dx=Math.max(-108,Math.min(108,e.clientX-b.left-140));
$('spin').style.left=(108+dx)+'px';t=Math.round(dx/108*100)},()=>{t=0;$('spin').style.left='108px'});
setInterval(()=>{$('st').textContent=x+' '+y+' '+t;if(busy)return;busy=true;
fetch('/drive?x='+x+'&y='+y+'&t='+t).catch(()=>{}).finally(()=>{busy=false})},100);
</script></body></html>)html";

void setWheel(const Wheel& w, int speed) {   // -100..100
  speed = constrain(speed, -100, 100);
  if (abs(speed) < 5) speed = 0;
  digitalWrite(w.in1, speed > 0 ? HIGH : LOW);
  digitalWrite(w.in2, speed < 0 ? HIGH : LOW);
  ledcWrite(w.pwm, speed == 0 ? 0 : map(abs(speed), 5, 100, MIN_DUTY, MAX_DUTY));
}

// x = slide right, y = forward, t = turn clockwise; all -100..100
void drive(int x, int y, int t) {
  int v[4] = { y + x + t, y - x - t, y - x + t, y + x - t };   // FL, FR, RL, RR
  int biggest = 100;
  for (int i = 0; i < 4; i++) biggest = max(biggest, abs(v[i]));
  for (int i = 0; i < 4; i++) setWheel(wheels[i], v[i] * 100 / biggest);
  moving = x != 0 || y != 0 || t != 0;
  if (moving && millis() - lastLog > 300) {
    Serial.printf("FL=%d FR=%d RL=%d RR=%d\\n", v[0] * 100 / biggest, v[1] * 100 / biggest, v[2] * 100 / biggest, v[3] * 100 / biggest);
    lastLog = millis();
  }
}

void handleRoot() { server.send_P(200, "text/html", PAGE); }

void handleDrive() {
  drive(constrain(server.arg("x").toInt(), -100, 100),
        constrain(server.arg("y").toInt(), -100, 100),
        constrain(server.arg("t").toInt(), -100, 100));
  lastCmd = millis();
  server.send(200, "text/plain", "ok");
}

void wheelTest() {
  for (int i = 0; i < 4; i++) {
    Serial.printf("wheel test %s\\n", wheels[i].name);
    setWheel(wheels[i], 50);
    delay(500);
    setWheel(wheels[i], 0);
    delay(250);
  }
}

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < 4; i++) {
    pinMode(wheels[i].in1, OUTPUT);
    pinMode(wheels[i].in2, OUTPUT);
    ledcAttach(wheels[i].pwm, PWM_FREQ, PWM_RESOLUTION);
  }
  pinMode(STBY_PIN, OUTPUT);
  drive(0, 0, 0);
  digitalWrite(STBY_PIN, HIGH);
  wheelTest();

  WiFi.mode(WIFI_AP);
  if (!WiFi.softAP(AP_SSID, AP_PASS)) Serial.println("softAP failed: password must be 8+ characters");
  server.on("/", handleRoot);
  server.on("/drive", handleDrive);
  server.begin();
  Serial.printf("Join Wi-Fi %s, open http://%s\\n", AP_SSID, WiFi.softAPIP().toString().c_str());
}

void loop() {
  server.handleClient();
  if (moving && millis() - lastCmd > FAILSAFE_MS) {
    drive(0, 0, 0);
    Serial.println("failsafe: no command, stop");
  }
}`,
  }],
  troubleshooting: [
    {
      symptom: { en: "Forward works but sideways the rover only wobbles or turns", ru: "Вперёд едет, а боком только дёргается или поворачивает", kk: "Алға жүреді, ал бүйірге тек жұлқынады не бұрылады" },
      cause: { en: "Wheel types are mixed up, or one motor spins the wrong way.", ru: "Перепутаны типы колёс, или один мотор крутится не в ту сторону.", kk: "Дөңгелек түрлері шатасқан немесе бір мотор кері айналады." },
      fix: { en: "Re-run the boot wheel test with the rover lifted, fix any reversed motor, then check the X pattern of the top rollers.", ru: "Повторите стартовый тест колёс на весу, исправьте перевёрнутый мотор, затем проверьте X из верхних роликов.", kk: "Роверді көтеріп, бастапқы дөңгелек сынағын қайталаңыз, кері моторды түзетіңіз, содан кейін үстіңгі роликтердің X пішінін тексеріңіз." },
    },
    {
      symptom: { en: "The ESP32 reboots during quick direction changes", ru: "ESP32 перезагружается при резкой смене направления", kk: "Бағытты кенет өзгерткенде ESP32 қайта жүктеледі" },
      cause: { en: "Four motors reversing at once pull several amps and drag the pack voltage down.", ru: "Четыре мотора при реверсе тянут несколько ампер и просаживают батарею.", kk: "Төрт мотор реверс кезінде бірнеше ампер тартып, батареяны отырғызады." },
      fix: { en: "Charge the pack, use a 20C+ battery, keep the star ground and add a 470 µF capacitor across each driver's VM and GND.", ru: "Зарядите батарею, используйте 20C+, сохраните звезду земли и поставьте конденсатор 470 мкФ между VM и GND каждого драйвера.", kk: "Батареяны зарядтаңыз, 20C+ батарея қолданыңыз, жұлдыз жерді сақтаңыз және әр драйвердің VM мен GND арасына 470 мкФ конденсатор қойыңыз." },
    },
    {
      symptom: { en: "One wheel never turns", ru: "Одно колесо не крутится совсем", kk: "Бір дөңгелек мүлде айналмайды" },
      cause: { en: "A loose PWM or IN wire on that channel, or a broken solder joint on the motor tab.", ru: "Отошёл провод PWM или IN этого канала, или отломилась пайка на выводе мотора.", kk: "Сол арнаның PWM не IN сымы шығып кеткен немесе мотор шығысындағы дәнекер сынған." },
      fix: { en: "Watch the boot wheel test to see which name is silent, then follow that channel's three wires and two motor leads.", ru: "По стартовому тесту найдите, какое имя молчит, и проверьте три провода этого канала и два провода мотора.", kk: "Бастапқы сынақтан қай атау үнсіз екенін тауып, сол арнаның үш сымын және мотордың екі сымын тексеріңіз." },
    },
    {
      symptom: { en: "Sliding sideways slowly turns into a circle", ru: "Движение боком постепенно превращается в круг", kk: "Бүйірлік жылжу бірте-бірте шеңберге айналады" },
      cause: { en: "Uneven grip: one wheel carries less weight or one motor is weaker.", ru: "Неравное сцепление: на одно колесо меньше нагрузки или один мотор слабее.", kk: "Ілінісу тең емес: бір дөңгелекке салмақ аз түседі немесе бір мотор әлсіз." },
      fix: { en: "Centre the battery, make sure all four wheels touch the floor, and correct the drift with a little spin on the bar.", ru: "Поставьте батарею по центру, убедитесь, что все четыре колеса касаются пола, и компенсируйте увод небольшим вращением на полосе.", kk: "Батареяны ортаға қойыңыз, төрт дөңгелектің де еденге тиіп тұрғанына көз жеткізіңіз және ауытқуды жолақтағы аздаған айналумен түзетіңіз." },
    },
  ],
  safety: [
    { en: "Charge the 2S LiPo with a balance charger and never leave it charging unattended.", ru: "Заряжайте LiPo 2S балансирным зарядником и не оставляйте зарядку без присмотра.", kk: "2S LiPo-ны теңгерімдік зарядтағышпен зарядтаңыз және зарядтауды қараусыз қалдырмаңыз." },
    { en: "Switch the battery off before plugging in USB, so the ESP32 5V pin is never fed from two sources.", ru: "Выключайте батарею перед подключением USB, чтобы пин 5V ESP32 не питался от двух источников.", kk: "ESP32-нің 5V пині екі көзден қоректенбеуі үшін USB қоспас бұрын батареяны өшіріңіз." },
  ],
  simulation: {
    baud: 115200,
    lines: [
      "wheel test FL",
      "wheel test FR",
      "wheel test RL",
      "wheel test RR",
      "Join Wi-Fi ropros-mecanum, open http://192.168.4.1",
      "FL=80 FR=80 RL=80 RR=80",
      "FL=75 FR=-75 RL=-75 RR=75",
      "FL=100 FR=0 RL=0 RR=100",
      "FL=-60 FR=60 RL=-60 RR=60",
      "failsafe: no command, stop",
    ],
    leds: [],
  },
} satisfies GuideContent;
