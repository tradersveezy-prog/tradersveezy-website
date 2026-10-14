export function EmaReclaimChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="er-t er-d"
      className="ms-diagram-svg"
    >
      <title id="er-t">EMA reclaim — impulse plus acceptance closes</title>
      <desc id="er-d">Strong impulse through an EMA, then several closes holding above it.</desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="er-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#er-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      <path
        d="M100 400 C 300 390, 500 380, 700 370 S 950 360, 1100 355"
        fill="none"
        stroke="#E3B44A"
        strokeWidth="3"
      />
      <text
        x="1000"
        y="340"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.14em"
      >
        EMA
      </text>

      <g strokeWidth="2.5">
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="220" y1="300" x2="220" y2="450" />
          <rect x="208" y="320" width="24" height="90" />
          <line x1="300" y1="340" x2="300" y2="480" />
          <rect x="288" y="360" width="24" height="80" />
          <line x1="380" y1="360" x2="380" y2="500" />
          <rect x="368" y="380" width="24" height="90" />
        </g>
        {/* Impulse reclaim */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="500" y1="220" x2="500" y2="420" />
          <rect x="488" y="240" width="24" height="140" />
          <line x1="580" y1="200" x2="580" y2="360" />
          <rect x="568" y="210" width="24" height="100" />
          <line x1="660" y1="180" x2="660" y2="340" />
          <rect x="648" y="190" width="24" height="90" />
          <line x1="740" y1="160" x2="740" y2="320" />
          <rect x="728" y="170" width="24" height="90" />
        </g>
      </g>

      <rect x="520" y="460" width="280" height="56" fill="#161513" stroke="#E3B44A" />
      <text
        x="660"
        y="484"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.12em"
        textAnchor="middle"
      >
        IMPULSE + 2–3 CLOSES
      </text>
      <text
        x="660"
        y="504"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.06em"
        textAnchor="middle"
      >
        acceptance — not one wick
      </text>

      <text
        x="48"
        y="48"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.22em"
      >
        EMA RECLAIM
      </text>
      <text
        x="48"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
      >
        4H 55/200 · 15m 21/55/200 — strong push through, then holds that prove acceptance
      </text>
    </svg>
  )
}
