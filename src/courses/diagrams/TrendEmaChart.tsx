export function TrendEmaChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="tr-t tr-d"
      className="ms-diagram-svg"
    >
      <title id="tr-t">Uptrend — higher highs and lows above EMAs</title>
      <desc id="tr-d">Rising swing highs and lows with price holding above the EMAs.</desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="tr-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#tr-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />
      <path
        d="M100 480 C 300 460, 500 430, 700 400 S 950 360, 1100 340"
        fill="none"
        stroke="#E3B44A"
        strokeWidth="2.5"
      />
      <path
        d="M100 510 C 320 495, 540 470, 760 440 S 980 400, 1100 380"
        fill="none"
        stroke="#C9922F"
        strokeWidth="2"
        strokeDasharray="8 6"
      />
      <path
        d="M100 540 C 340 530, 580 510, 820 480 S 1000 450, 1100 430"
        fill="none"
        stroke="#A9A59D"
        strokeWidth="1.5"
        strokeDasharray="3 5"
      />
      <text x="1010" y="330" fill="#E3B44A" fontFamily="ui-monospace, monospace" fontSize="12" letterSpacing="0.12em">
        21
      </text>
      <text x="1010" y="375" fill="#C9922F" fontFamily="ui-monospace, monospace" fontSize="12" letterSpacing="0.12em">
        55
      </text>
      <text x="1010" y="425" fill="#A9A59D" fontFamily="ui-monospace, monospace" fontSize="12" letterSpacing="0.12em">
        200
      </text>
      <g strokeWidth="2.5">
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="200" y1="380" x2="200" y2="480" />
          <rect x="188" y="400" width="24" height="50" />
          <line x1="280" y1="300" x2="280" y2="420" />
          <rect x="268" y="320" width="24" height="70" />
          <line x1="400" y1="260" x2="400" y2="390" />
          <rect x="388" y="280" width="24" height="70" />
          <line x1="520" y1="200" x2="520" y2="340" />
          <rect x="508" y="220" width="24" height="80" />
          <line x1="680" y1="160" x2="680" y2="300" />
          <rect x="668" y="180" width="24" height="75" />
          <line x1="840" y1="120" x2="840" y2="260" />
          <rect x="828" y="140" width="24" height="80" />
          <line x1="960" y1="100" x2="960" y2="230" />
          <rect x="948" y="110" width="24" height="75" />
        </g>
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="340" y1="280" x2="340" y2="430" />
          <rect x="328" y="300" width="24" height="80" />
          <line x1="600" y1="200" x2="600" y2="360" />
          <rect x="588" y="220" width="24" height="90" />
          <line x1="760" y1="160" x2="760" y2="310" />
          <rect x="748" y="180" width="24" height="80" />
        </g>
      </g>
      <g
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        <text x="280" y="285">
          HH
        </text>
        <text x="520" y="185">
          HH
        </text>
        <text x="840" y="105">
          HH
        </text>
        <text x="340" y="460">
          HL
        </text>
        <text x="600" y="390">
          HL
        </text>
        <text x="760" y="340">
          HL
        </text>
      </g>
      <text
        x="48"
        y="48"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.22em"
      >
        TREND · STRUCTURE + AVERAGES
      </text>
      <text
        x="48"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
      >
        Higher highs and higher lows — and price still above 21 · 55 · 200 on the 15-minute
      </text>
    </svg>
  )
}
