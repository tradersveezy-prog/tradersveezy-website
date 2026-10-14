/** VWAP as an intraday magnet / fair-value line. */
export function VwapMagnetChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="vw-t vw-d"
      className="ms-diagram-svg"
    >
      <title id="vw-t">VWAP as a magnet</title>
      <desc id="vw-d">
        VWAP is the volume-weighted average price for the session. Price often returns to it after
        stretches away.
      </desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="vw-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#vw-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      {/* VWAP curve */}
      <path
        d="M120 360 C 280 355, 420 350, 560 345 S 840 340, 1080 348"
        fill="none"
        stroke="#E3B44A"
        strokeWidth="3"
      />
      <text
        x="1000"
        y="330"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.16em"
      >
        VWAP
      </text>

      <g strokeWidth="2.5">
        {/* Open near VWAP */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="180" y1="300" x2="180" y2="400" />
          <rect x="168" y="320" width="24" height="50" />
          <line x1="260" y1="280" x2="260" y2="380" />
          <rect x="248" y="300" width="24" height="50" />
        </g>
        {/* Stretch above */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="340" y1="200" x2="340" y2="340" />
          <rect x="328" y="220" width="24" height="70" />
          <line x1="420" y1="140" x2="420" y2="280" />
          <rect x="408" y="160" width="24" height="80" />
          <line x1="500" y1="120" x2="500" y2="240" />
          <rect x="488" y="130" width="24" height="70" />
        </g>
        {/* Mean reversion to VWAP */}
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="580" y1="140" x2="580" y2="340" />
          <rect x="568" y="160" width="24" height="100" />
          <line x1="660" y1="220" x2="660" y2="360" />
          <rect x="648" y="240" width="24" height="80" />
        </g>
        {/* Tag VWAP and bounce */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="740" y1="260" x2="740" y2="360" />
          <rect x="728" y="280" width="24" height="50" />
          <line x1="820" y1="200" x2="820" y2="340" />
          <rect x="808" y="220" width="24" height="80" />
          <line x1="900" y1="160" x2="900" y2="300" />
          <rect x="888" y="180" width="24" height="70" />
          <line x1="980" y1="140" x2="980" y2="280" />
          <rect x="968" y="150" width="24" height="80" />
        </g>
      </g>

      {/* Stretch callout */}
      <path d="M500 130 L560 90" stroke="#A9A59D" strokeWidth="1.5" />
      <rect x="520" y="48" width="200" height="36" fill="#161513" stroke="#A9A59D" />
      <text
        x="620"
        y="71"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.12em"
        textAnchor="middle"
      >
        STRETCH AWAY
      </text>

      <circle cx="740" cy="348" r="10" fill="none" stroke="#E3B44A" strokeWidth="2" />
      <path d="M750 348 L860 420" stroke="#E3B44A" strokeWidth="1.5" />
      <rect x="780" y="400" width="240" height="56" fill="#161513" stroke="#E3B44A" />
      <text
        x="900"
        y="424"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        TAG VWAP · HOLD
      </text>
      <text
        x="900"
        y="444"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.06em"
        textAnchor="middle"
      >
        session fair value
      </text>

      <text
        x="48"
        y="48"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.22em"
      >
        VWAP · SESSION MAGNET
      </text>
      <text
        x="48"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
      >
        Volume-weighted average for the session — stretches away often pull back toward it
      </text>
    </svg>
  )
}
