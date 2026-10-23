/** Breadboard wiring for the Obstacle Avoiding Robot (Arduino UNO, HC-SR04, SG90, L298N). Static, generated from the approved prototype. */
export function ObstacleAvoidingRobotDiagram({ label }: { label: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1480 1224" width="1480" height="1224" role="img" aria-label={label} className="block h-auto min-w-[880px] w-full">
<defs>
<pattern id="oar-mesh" width="4" height="4" patternUnits="userSpaceOnUse">
<circle cx="2" cy="2" r=".9" fill="#3E444A"/>
</pattern>
<pattern id="oar-bbh" x="144" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
<rect x="4" y="4" width="4.2" height="4.2" rx=".6" fill="#7C7C7C"/>
</pattern>
</defs>
<rect width="1480" height="1224" fill="#F3F5F2"/>
<rect x="120" y="234" width="804" height="232" rx="8" fill="#EDEDE9" stroke="#C9C9C2" strokeWidth="1.5"/>
<rect x="126" y="346" width="792" height="8" rx="3" fill="#DADAD3"/>
<rect x="144" y="244" width="756" height="12" fill="url(#oar-bbh)"/>
<line x1="144" y1="242" x2="900" y2="242" stroke="#E53935" strokeWidth="1.6"/>
<text x="132" y="254" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="12" fontWeight="700" fill="#E53935" textAnchor="middle">+</text>
<text x="912" y="254" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="12" fontWeight="700" fill="#E53935" textAnchor="middle">+</text>
<rect x="144" y="256" width="756" height="12" fill="url(#oar-bbh)"/>
<line x1="144" y1="270" x2="900" y2="270" stroke="#1E5AA8" strokeWidth="1.6"/>
<text x="132" y="266" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="12" fontWeight="700" fill="#1E5AA8" textAnchor="middle">−</text>
<text x="912" y="266" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="12" fontWeight="700" fill="#1E5AA8" textAnchor="middle">−</text>
<rect x="144" y="430" width="756" height="12" fill="url(#oar-bbh)"/>
<line x1="144" y1="428" x2="900" y2="428" stroke="#E53935" strokeWidth="1.6"/>
<text x="132" y="440" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="12" fontWeight="700" fill="#E53935" textAnchor="middle">+</text>
<text x="912" y="440" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="12" fontWeight="700" fill="#E53935" textAnchor="middle">+</text>
<rect x="144" y="442" width="756" height="12" fill="url(#oar-bbh)"/>
<line x1="144" y1="456" x2="900" y2="456" stroke="#1E5AA8" strokeWidth="1.6"/>
<text x="132" y="452" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="12" fontWeight="700" fill="#1E5AA8" textAnchor="middle">−</text>
<text x="912" y="452" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="12" fontWeight="700" fill="#1E5AA8" textAnchor="middle">−</text>
<rect x="144" y="280" width="756" height="60" fill="url(#oar-bbh)"/>
<rect x="144" y="358" width="756" height="60" fill="url(#oar-bbh)"/>
<text x="134" y="289.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">a</text>
<text x="910" y="289.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">a</text>
<text x="134" y="301.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">b</text>
<text x="910" y="301.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">b</text>
<text x="134" y="313.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">c</text>
<text x="910" y="313.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">c</text>
<text x="134" y="325.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">d</text>
<text x="910" y="325.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">d</text>
<text x="134" y="337.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">e</text>
<text x="910" y="337.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">e</text>
<text x="134" y="367.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">f</text>
<text x="910" y="367.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">f</text>
<text x="134" y="379.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">g</text>
<text x="910" y="379.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">g</text>
<text x="134" y="391.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">h</text>
<text x="910" y="391.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">h</text>
<text x="134" y="403.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">i</text>
<text x="910" y="403.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">i</text>
<text x="134" y="415.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">j</text>
<text x="910" y="415.5" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9" fontWeight="400" fill="#8A8A82" textAnchor="middle">j</text>
<text x="150" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">1</text>
<text x="150" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">1</text>
<text x="198" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">5</text>
<text x="198" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">5</text>
<text x="258" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">10</text>
<text x="258" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">10</text>
<text x="318" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">15</text>
<text x="318" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">15</text>
<text x="378" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">20</text>
<text x="378" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">20</text>
<text x="438" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">25</text>
<text x="438" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">25</text>
<text x="498" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">30</text>
<text x="498" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">30</text>
<text x="558" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">35</text>
<text x="558" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">35</text>
<text x="618" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">40</text>
<text x="618" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">40</text>
<text x="678" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">45</text>
<text x="678" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">45</text>
<text x="738" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">50</text>
<text x="738" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">50</text>
<text x="798" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">55</text>
<text x="798" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">55</text>
<text x="858" y="276" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">60</text>
<text x="858" y="429" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8.5" fontWeight="400" fill="#8A8A82" textAnchor="middle">60</text>
<text x="932" y="440" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="10" fontWeight="700" fill="#E53935">5V rail</text>
<text x="932" y="452" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="10" fontWeight="700" fill="#1E5AA8">GND rail</text>
<g transform="translate(180 695)">
<rect x="0" y="0" width="400" height="300" rx="12" fill="#00878F" stroke="#00616A" strokeWidth="2"/>
<circle cx="18" cy="44" r="7" fill="#F5F7F3" stroke="#B8C7C0"/>
<circle cx="18" cy="262" r="7" fill="#F5F7F3" stroke="#B8C7C0"/>
<circle cx="380" cy="30" r="7" fill="#F5F7F3" stroke="#B8C7C0"/>
<circle cx="380" cy="270" r="7" fill="#F5F7F3" stroke="#B8C7C0"/>
<rect x="-16" y="34" width="74" height="64" rx="3" fill="#C8CDD2" stroke="#8A9097"/>
<rect x="-6" y="46" width="40" height="40" fill="#9EA5AC"/>
<rect x="-10" y="208" width="62" height="58" rx="4" fill="#1C1C1C"/>
<circle cx="12" cy="237" r="12" fill="#333"/>
<rect x="116.6" y="8" width="148" height="16" rx="2" fill="#151515"/>
<rect x="121" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="135.8" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="150.6" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="165.4" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="180.2" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="195" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="209.8" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="224.60000000000002" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="239.4" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="254.20000000000005" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="273.6" y="8" width="118.4" height="16" rx="2" fill="#151515"/>
<rect x="278" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="292.8" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="307.6" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="322.4" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="337.2" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="352" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="366.8" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="381.6" y="13" width="6" height="6" fill="#3A3A3A"/>
<rect x="175.6" y="276" width="118.4" height="16" rx="2" fill="#151515"/>
<rect x="180" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="194.8" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="209.6" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="224.4" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="239.2" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="254" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="268.8" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="283.6" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="303.6" y="276" width="88.80000000000001" height="16" rx="2" fill="#151515"/>
<rect x="308" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="322.8" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="337.6" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="352.4" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="367.2" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="382" y="281" width="6" height="6" fill="#3A3A3A"/>
<rect x="205" y="188" width="170" height="44" rx="3" fill="#161616"/>
<rect x="213" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="213" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="224.6" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="224.6" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="236.2" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="236.2" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="247.8" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="247.8" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="259.4" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="259.4" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="271" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="271" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="282.6" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="282.6" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="294.2" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="294.2" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="305.8" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="305.8" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="317.4" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="317.4" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="329" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="329" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="340.6" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="340.6" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="352.2" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="352.2" y="232" width="5" height="6" fill="#B0B0B0"/>
<rect x="363.79999999999995" y="182" width="5" height="6" fill="#B0B0B0"/>
<rect x="363.79999999999995" y="232" width="5" height="6" fill="#B0B0B0"/>
<text x="290" y="215" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="10" fontWeight="400" fill="#8C8C8C" textAnchor="middle">ATMEGA328P</text>
<rect x="140" y="132" width="34" height="14" rx="7" fill="#D7DBDF" stroke="#8A9097"/>
<rect x="34" y="112" width="24" height="24" rx="3" fill="#B0B5BA"/>
<circle cx="46" cy="124" r="7" fill="#C62828"/>
<rect x="362" y="118" width="28" height="42" rx="2" fill="#151515"/>
<text x="250" y="150" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="26" fontWeight="700" fill="#fff" textAnchor="middle">UNO</text>
<text x="250" y="168" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="10" fontWeight="400" fill="#CDEDEF" textAnchor="middle">ARDUINO</text>
<text x="127" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 127 30)">SCL</text>
<text x="141.8" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 141.8 30)">SDA</text>
<text x="156.6" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 156.6 30)">AREF</text>
<text x="171.4" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 171.4 30)">GND</text>
<text x="186.2" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 186.2 30)">D13</text>
<text x="201" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 201 30)">D12</text>
<text x="215.8" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 215.8 30)">D11</text>
<text x="230.60000000000002" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 230.60000000000002 30)">D10</text>
<text x="245.4" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 245.4 30)">D9</text>
<text x="260.20000000000005" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 260.20000000000005 30)">D8</text>
<text x="284" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 284 30)">D7</text>
<text x="298.8" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 298.8 30)">D6</text>
<text x="313.6" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 313.6 30)">D5</text>
<text x="328.4" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 328.4 30)">D4</text>
<text x="343.2" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 343.2 30)">D3</text>
<text x="358" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 358 30)">D2</text>
<text x="372.8" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 372.8 30)">D1</text>
<text x="387.6" y="30" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(90 387.6 30)">D0</text>
<text x="186" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 186 270)">NC</text>
<text x="200.8" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 200.8 270)">IOREF</text>
<text x="215.6" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 215.6 270)">RESET</text>
<text x="230.4" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 230.4 270)">3.3V</text>
<text x="245.2" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 245.2 270)">5V</text>
<text x="260" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 260 270)">GND</text>
<text x="274.8" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 274.8 270)">GND</text>
<text x="289.6" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 289.6 270)">VIN</text>
<text x="314" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 314 270)">A0</text>
<text x="328.8" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 328.8 270)">A1</text>
<text x="343.6" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 343.6 270)">A2</text>
<text x="358.4" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 358.4 270)">A3</text>
<text x="373.2" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 373.2 270)">A4</text>
<text x="388" y="270" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="8" fontWeight="400" fill="#fff" transform="rotate(-90 388 270)">A5</text>
</g>
<rect x="1250" y="67" width="140" height="56" rx="4" fill="#1565C0"/>
<rect x="1240" y="85" width="160" height="20" rx="3" fill="#1565C0" opacity=".9"/>
<circle cx="1364" cy="95" r="14" fill="#E0E0E0"/>
<rect x="1320" y="90" width="70" height="10" rx="5" fill="#FAFAFA" stroke="#BDBDBD"/>
<text x="1290" y="99" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="10" fontWeight="700" fill="#fff">SG90</text>
<text x="1392" y="146" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="10.5" fontWeight="700" fill="#333" textAnchor="end">SG90 servo</text>
<rect x="1186" y="67" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="64" width="8" height="12" fill="#151515"/>
<text x="1212" y="74" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#333">Signal</text>
<rect x="1186" y="89" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="86" width="8" height="12" fill="#151515"/>
<text x="1212" y="96" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#333">V+</text>
<rect x="1186" y="111" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="108" width="8" height="12" fill="#151515"/>
<text x="1212" y="118" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#333">GND</text>
<rect x="1200" y="184" width="220" height="254" rx="7" fill="#B3261E" stroke="rgba(0,0,0,.35)" strokeWidth="1.5"/>
<circle cx="1208" cy="192" r="3.5" fill="#E8EDEA" opacity=".85"/>
<circle cx="1412" cy="192" r="3.5" fill="#E8EDEA" opacity=".85"/>
<circle cx="1412" cy="430" r="3.5" fill="#E8EDEA" opacity=".85"/>
<rect x="1298" y="196" width="68" height="70" rx="2" fill="#1B1B1B"/>
<rect x="1302" y="196" width="4" height="70" fill="#333"/>
<rect x="1310.4" y="196" width="4" height="70" fill="#333"/>
<rect x="1318.8" y="196" width="4" height="70" fill="#333"/>
<rect x="1327.2" y="196" width="4" height="70" fill="#333"/>
<rect x="1335.6" y="196" width="4" height="70" fill="#333"/>
<rect x="1344" y="196" width="4" height="70" fill="#333"/>
<rect x="1352.4" y="196" width="4" height="70" fill="#333"/>
<rect x="1360.8" y="196" width="4" height="70" fill="#333"/>
<rect x="1307" y="271" width="50" height="26" rx="2" fill="#161616"/>
<text x="1332" y="287" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="7.5" fontWeight="400" fill="#8C8C8C" textAnchor="middle">L298N</text>
<rect x="1390" y="202" width="22" height="20" fill="#1976D2" stroke="#0D47A1"/>
<circle cx="1401" cy="212" r="6" fill="#B0BEC5"/>
<path d="M1397 212h8" stroke="#546E7A" strokeWidth="1.6"/>
<rect x="1390" y="222" width="22" height="20" fill="#1976D2" stroke="#0D47A1"/>
<circle cx="1401" cy="232" r="6" fill="#B0BEC5"/>
<path d="M1397 232h8" stroke="#546E7A" strokeWidth="1.6"/>
<rect x="1390" y="368" width="22" height="20" fill="#1976D2" stroke="#0D47A1"/>
<circle cx="1401" cy="378" r="6" fill="#B0BEC5"/>
<path d="M1397 378h8" stroke="#546E7A" strokeWidth="1.6"/>
<rect x="1390" y="388" width="22" height="20" fill="#1976D2" stroke="#0D47A1"/>
<circle cx="1401" cy="398" r="6" fill="#B0BEC5"/>
<path d="M1397 398h8" stroke="#546E7A" strokeWidth="1.6"/>
<rect x="1390" y="408" width="22" height="20" fill="#1976D2" stroke="#0D47A1"/>
<circle cx="1401" cy="418" r="6" fill="#B0BEC5"/>
<path d="M1397 418h8" stroke="#546E7A" strokeWidth="1.6"/>
<rect x="1308" y="390" width="12" height="20" rx="6" fill="#263238"/>
<rect x="1342" y="390" width="12" height="20" rx="6" fill="#263238"/>
<text x="1410" y="428" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="10.5" fontWeight="700" fill="#fff" textAnchor="end">L298N</text>
<rect x="1186" y="211" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="208" width="8" height="12" fill="#151515"/>
<text x="1212" y="218" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#fff">ENA</text>
<rect x="1186" y="233" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="230" width="8" height="12" fill="#151515"/>
<text x="1212" y="240" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#fff">IN1</text>
<rect x="1186" y="255" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="252" width="8" height="12" fill="#151515"/>
<text x="1212" y="262" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#fff">IN2</text>
<rect x="1186" y="277" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="274" width="8" height="12" fill="#151515"/>
<text x="1212" y="284" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#fff">IN3</text>
<rect x="1186" y="299" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="296" width="8" height="12" fill="#151515"/>
<text x="1212" y="306" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#fff">IN4</text>
<rect x="1186" y="321" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="318" width="8" height="12" fill="#151515"/>
<text x="1212" y="328" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#fff">ENB</text>
<rect x="1186" y="343" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="340" width="8" height="12" fill="#151515"/>
<text x="1212" y="350" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#fff">GND</text>
<rect x="1186" y="365" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="362" width="8" height="12" fill="#151515"/>
<text x="1212" y="372" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#fff">12V</text>
<rect x="1186" y="387" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="384" width="8" height="12" fill="#151515"/>
<text x="1212" y="394" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#fff">OUT1/OUT2</text>
<rect x="1186" y="409" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="406" width="8" height="12" fill="#151515"/>
<text x="1212" y="416" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#fff">OUT3/OUT4</text>
<rect x="1224" y="482" width="206" height="80" rx="6" fill="#1A1A1A"/>
<rect x="1234" y="490" width="180" height="32" rx="16" fill="#1E88E5"/>
<rect x="1412" y="501" width="6" height="10" fill="#B0BEC5"/>
<rect x="1234" y="526" width="180" height="32" rx="16" fill="#1E88E5"/>
<rect x="1412" y="537" width="6" height="10" fill="#B0BEC5"/>
<text x="1432" y="578" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="10.5" fontWeight="700" fill="#333" textAnchor="end">Battery pack</text>
<rect x="1186" y="499" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="496" width="8" height="12" fill="#151515"/>
<text x="1212" y="506" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#333">+</text>
<rect x="1186" y="521" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="518" width="8" height="12" fill="#151515"/>
<text x="1212" y="528" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#333">−</text>
<rect x="1272" y="639" width="78" height="44" rx="5" fill="#FBC02D" stroke="#C49000"/>
<rect x="1350" y="645" width="44" height="32" rx="14" fill="#CFD8DC" stroke="#90A4AE"/>
<rect x="1298" y="627" width="12" height="70" rx="3" fill="#FBC02D" stroke="#C49000"/>
<text x="1412" y="702" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="10.5" fontWeight="700" fill="#333" textAnchor="end">Left motor</text>
<rect x="1186" y="643" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="640" width="8" height="12" fill="#151515"/>
<text x="1212" y="650" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#333">Terminals</text>
<rect x="1272" y="763" width="78" height="44" rx="5" fill="#FBC02D" stroke="#C49000"/>
<rect x="1350" y="769" width="44" height="32" rx="14" fill="#CFD8DC" stroke="#90A4AE"/>
<rect x="1298" y="751" width="12" height="70" rx="3" fill="#FBC02D" stroke="#C49000"/>
<text x="1412" y="826" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="10.5" fontWeight="700" fill="#333" textAnchor="end">Right motor</text>
<rect x="1186" y="767" width="14" height="6" fill="#C9A43B"/>
<rect x="1198" y="764" width="8" height="12" fill="#151515"/>
<text x="1212" y="774" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="9.5" fontWeight="400" fill="#333">Terminals</text>
<rect x="168" y="118" width="204" height="154" rx="7" fill="#1E5AA8" stroke="rgba(0,0,0,.35)" strokeWidth="1.5"/>
<circle cx="176" cy="126" r="3.5" fill="#E8EDEA" opacity=".85"/>
<circle cx="364" cy="126" r="3.5" fill="#E8EDEA" opacity=".85"/>
<circle cx="364" cy="264" r="3.5" fill="#E8EDEA" opacity=".85"/>
<circle cx="232" cy="170" r="30" fill="#C9CED3" stroke="#7D848B" strokeWidth="2"/>
<circle cx="232" cy="170" r="21" fill="#5D646B"/>
<circle cx="232" cy="170" r="21" fill="url(#oar-mesh)"/>
<circle cx="308" cy="170" r="30" fill="#C9CED3" stroke="#7D848B" strokeWidth="2"/>
<circle cx="308" cy="170" r="21" fill="#5D646B"/>
<circle cx="308" cy="170" r="21" fill="url(#oar-mesh)"/>
<rect x="262" y="156" width="16" height="10" rx="2" fill="#DCDCDC"/>
<text x="270" y="112" fontFamily="Atkinson Hyperlegible, Arial, sans-serif" fontSize="10.5" fontWeight="700" fill="#333" textAnchor="middle">HC-SR04</text>
<rect x="244.4" y="272" width="3.2" height="14" fill="#C9A43B"/>
<rect x="242" y="266" width="8" height="6" fill="#151515"/>
<text x="249" y="263" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="7.5" fontWeight="400" fill="#fff" transform="rotate(-90 249 263)">VCC</text>
<rect x="256.4" y="272" width="3.2" height="14" fill="#C9A43B"/>
<rect x="254" y="266" width="8" height="6" fill="#151515"/>
<text x="261" y="263" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="7.5" fontWeight="400" fill="#fff" transform="rotate(-90 261 263)">GND</text>
<rect x="268.4" y="272" width="3.2" height="14" fill="#C9A43B"/>
<rect x="266" y="266" width="8" height="6" fill="#151515"/>
<text x="273" y="263" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="7.5" fontWeight="400" fill="#fff" transform="rotate(-90 273 263)">TRIG</text>
<rect x="280.4" y="272" width="3.2" height="14" fill="#C9A43B"/>
<rect x="278" y="266" width="8" height="6" fill="#151515"/>
<text x="285" y="263" fontFamily="JetBrains Mono, Menlo, monospace" fontSize="7.5" fontWeight="400" fill="#fff" transform="rotate(-90 285 263)">ECHO</text>
<path d="M246 334 L246 436" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M246 334 L246 436" fill="none" stroke="#E53935" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="246" cy="334" r="2.8" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<circle cx="246" cy="436" r="2.8" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<path d="M258 334 L258 448" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M258 334 L258 448" fill="none" stroke="#1F1F1F" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="258" cy="334" r="2.8" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<circle cx="258" cy="448" r="2.8" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<path d="M270 334 L270 484 L158 484 L158 1015 L491 1015 L491 979" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M270 334 L270 484 L158 484 L158 1015 L491 1015 L491 979" fill="none" stroke="#F2C200" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="270" cy="334" r="2.8" fill="#F2C200" stroke="rgba(0,0,0,.4)"/>
<circle cx="491" cy="979" r="2.8" fill="#F2C200" stroke="rgba(0,0,0,.4)"/>
<path d="M282 334 L282 493 L149 493 L149 1024 L505.8 1024 L505.8 979" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M282 334 L282 493 L149 493 L149 1024 L505.8 1024 L505.8 979" fill="none" stroke="#F57C00" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="282" cy="334" r="2.8" fill="#F57C00" stroke="rgba(0,0,0,.4)"/>
<circle cx="505.8" cy="979" r="2.8" fill="#F57C00" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 70 L1174 70 L1174 502 L520.2 502 L520.2 711" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 70 L1174 70 L1174 502 L520.2 502 L520.2 711" fill="none" stroke="#8E24AA" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="70" r="2.8" fill="#8E24AA" stroke="rgba(0,0,0,.4)"/>
<circle cx="520.2" cy="711" r="2.8" fill="#8E24AA" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 92 L1165 92 L1165 436 L882 436" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 92 L1165 92 L1165 436 L882 436" fill="none" stroke="#E53935" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="92" r="2.8" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<circle cx="882" cy="436" r="2.8" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 114 L1156 114 L1156 448 L870 448" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 114 L1156 114 L1156 448 L870 448" fill="none" stroke="#1F1F1F" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="114" r="2.8" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<circle cx="870" cy="448" r="2.8" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 214 L1147 214 L1147 511 L490.6 511 L490.6 711" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 214 L1147 214 L1147 511 L490.6 511 L490.6 711" fill="none" stroke="#00ACC1" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="214" r="2.8" fill="#00ACC1" stroke="rgba(0,0,0,.4)"/>
<circle cx="490.6" cy="711" r="2.8" fill="#00ACC1" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 236 L1138 236 L1138 520 L461 520 L461 711" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 236 L1138 236 L1138 520 L461 520 L461 711" fill="none" stroke="#E91E63" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="236" r="2.8" fill="#E91E63" stroke="rgba(0,0,0,.4)"/>
<circle cx="461" cy="711" r="2.8" fill="#E91E63" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 258 L1129 258 L1129 529 L437.20000000000005 529 L437.20000000000005 711" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 258 L1129 258 L1129 529 L437.20000000000005 529 L437.20000000000005 711" fill="none" stroke="#7CB342" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="258" r="2.8" fill="#7CB342" stroke="rgba(0,0,0,.4)"/>
<circle cx="437.20000000000005" cy="711" r="2.8" fill="#7CB342" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 280 L1120 280 L1120 538 L505.4 538 L505.4 711" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 280 L1120 280 L1120 538 L505.4 538 L505.4 711" fill="none" stroke="#795548" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="280" r="2.8" fill="#795548" stroke="rgba(0,0,0,.4)"/>
<circle cx="505.4" cy="711" r="2.8" fill="#795548" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 302 L1111 302 L1111 547 L535 547 L535 711" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 302 L1111 302 L1111 547 L535 547 L535 711" fill="none" stroke="#9E9E9E" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="302" r="2.8" fill="#9E9E9E" stroke="rgba(0,0,0,.4)"/>
<circle cx="535" cy="711" r="2.8" fill="#9E9E9E" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 324 L1102 324 L1102 556 L475.8 556 L475.8 711" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 324 L1102 324 L1102 556 L475.8 556 L475.8 711" fill="none" stroke="#3949AB" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="324" r="2.8" fill="#3949AB" stroke="rgba(0,0,0,.4)"/>
<circle cx="475.8" cy="711" r="2.8" fill="#3949AB" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 346 L1093 346 L1093 448 L858 448" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 346 L1093 346 L1093 448 L858 448" fill="none" stroke="#1F1F1F" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="346" r="2.8" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<circle cx="858" cy="448" r="2.8" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 368 L1084 368 L1084 502 L1186 502" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="6.3999999999999995" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 368 L1084 368 L1084 502 L1186 502" fill="none" stroke="#E53935" strokeWidth="4.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="368" r="3.3" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<circle cx="1186" cy="502" r="3.3" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 502 L1075 502 L1075 1033 L466.6 1033 L466.6 979" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="6.3999999999999995" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 502 L1075 502 L1075 1033 L466.6 1033 L466.6 979" fill="none" stroke="#E53935" strokeWidth="4.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="502" r="3.3" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<circle cx="466.6" cy="979" r="3.3" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 524 L1066 524 L1066 448 L894 448" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 524 L1066 524 L1066 448 L894 448" fill="none" stroke="#1F1F1F" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="524" r="2.8" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<circle cx="894" cy="448" r="2.8" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 642 L1057 642 L1057 386 L1186 386" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="6.3999999999999995" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 642 L1057 642 L1057 386 L1186 386" fill="none" stroke="#E53935" strokeWidth="4.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="642" r="3.3" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<circle cx="1186" cy="386" r="3.3" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 650 L1048 650 L1048 394 L1186 394" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="6.3999999999999995" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 650 L1048 650 L1048 394 L1186 394" fill="none" stroke="#1F1F1F" strokeWidth="4.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="650" r="3.3" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<circle cx="1186" cy="394" r="3.3" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 766 L1039 766 L1039 408 L1186 408" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="6.3999999999999995" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 766 L1039 766 L1039 408 L1186 408" fill="none" stroke="#E53935" strokeWidth="4.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="766" r="3.3" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<circle cx="1186" cy="408" r="3.3" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<path d="M1186 774 L1030 774 L1030 416 L1186 416" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="6.3999999999999995" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M1186 774 L1030 774 L1030 416 L1186 416" fill="none" stroke="#1F1F1F" strokeWidth="4.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="1186" cy="774" r="3.3" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<circle cx="1186" cy="416" r="3.3" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<path d="M422.2 979 L422.2 1042 L140 1042 L140 565 L162 565 L162 436" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M422.2 979 L422.2 1042 L140 1042 L140 565 L162 565 L162 436" fill="none" stroke="#E53935" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="422.2" cy="979" r="2.8" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<circle cx="162" cy="436" r="2.8" fill="#E53935" stroke="rgba(0,0,0,.4)"/>
<path d="M348.4 711 L348.4 574 L174 574 L174 448" fill="none" stroke="rgba(0,0,0,.38)" strokeWidth="5.4" strokeLinejoin="round" strokeLinecap="round"/>
<path d="M348.4 711 L348.4 574 L174 574 L174 448" fill="none" stroke="#1F1F1F" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx="348.4" cy="711" r="2.8" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
<circle cx="174" cy="448" r="2.8" fill="#1F1F1F" stroke="rgba(0,0,0,.4)"/>
    </svg>
  );
}
