/** Inline teaching chart — 55/200 EMA wick holds. Bundled so it never 404s. */
export function EmaWickChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="ema-wick-title ema-wick-desc"
      className="ms-diagram-svg"
    >
      <title id="ema-wick-title">EMA wick bounce — 55 and 200</title>
      <desc id="ema-wick-desc">
        Price tags the 55 and 200 EMAs with long lower wicks, then holds — showing averages as
        reaction levels.
      </desc>

      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="ema-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#ema-grid)" />
      <rect
        x="48"
        y="72"
        width="1104"
        height="536"
        fill="#0B0B0B"
        stroke="#F2F1EE"
        strokeOpacity="0.12"
      />

      {/* 55 EMA */}
      <path
        d="M100 420 C 280 400, 420 390, 560 380 S 840 360, 1100 350"
        fill="none"
        stroke="#E3B44A"
        strokeWidth="3"
      />
      {/* 200 EMA */}
      <path
        d="M100 500 C 300 490, 500 485, 700 470 S 950 450, 1100 440"
        fill="none"
        stroke="#C9922F"
        strokeWidth="2.5"
        strokeDasharray="10 8"
      />

      <text
        x="1020"
        y="340"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.14em"
      >
        55 EMA
      </text>
      <text
        x="1000"
        y="470"
        fill="#C9922F"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.14em"
      >
        200 EMA
      </text>

      <g strokeWidth="2.5">
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="200" y1="280" x2="200" y2="400" />
          <rect x="188" y="300" width="24" height="70" />
          <line x1="280" y1="240" x2="280" y2="360" />
          <rect x="268" y="250" width="24" height="80" />
          <line x1="360" y1="200" x2="360" y2="320" />
          <rect x="348" y="210" width="24" height="75" />
        </g>
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="440" y1="220" x2="440" y2="390" />
          <rect x="428" y="230" width="24" height="90" />
          <line x1="520" y1="260" x2="520" y2="400" />
          <rect x="508" y="270" width="24" height="70" />
        </g>
        {/* Focal wick into 55 */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="600" y1="250" x2="600" y2="395" />
          <rect x="588" y="260" width="24" height="70" />
          <line x1="680" y1="200" x2="680" y2="340" />
          <rect x="668" y="210" width="24" height="85" />
          <line x1="760" y1="160" x2="760" y2="300" />
          <rect x="748" y="170" width="24" height="90" />
        </g>
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="840" y1="180" x2="840" y2="360" />
          <rect x="828" y="190" width="24" height="100" />
        </g>
        {/* Deep wick into 200 */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="920" y1="200" x2="920" y2="460" />
          <rect x="908" y="220" width="24" height="100" />
          <line x1="1000" y1="180" x2="1000" y2="320" />
          <rect x="988" y="190" width="24" height="85" />
        </g>
      </g>

      <circle cx="600" cy="395" r="10" fill="none" stroke="#E3B44A" strokeWidth="2" />
      <path d="M610 395 L720 500" stroke="#E3B44A" strokeWidth="1.5" />
      <rect x="700" y="500" width="220" height="52" fill="#161513" stroke="#E3B44A" />
      <text
        x="810"
        y="522"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        WICK INTO 55
      </text>
      <text
        x="810"
        y="540"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.06em"
        textAnchor="middle"
      >
        tag · hold · continue
      </text>

      <circle cx="920" cy="460" r="10" fill="none" stroke="#C9922F" strokeWidth="2" />
      <path d="M910 460 L780 560" stroke="#C9922F" strokeWidth="1.5" />
      <rect x="620" y="548" width="200" height="36" fill="#161513" stroke="#C9922F" />
      <text
        x="720"
        y="571"
        fill="#C9922F"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        DEEPER TAG · 200
      </text>

      <text
        x="48"
        y="48"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.22em"
      >
        55 &amp; 200 AS LEVELS
      </text>
      <text
        x="48"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
      >
        Orders often sit at these averages — treat a wick hold like a horizontal defense
      </text>
    </svg>
  )
}
