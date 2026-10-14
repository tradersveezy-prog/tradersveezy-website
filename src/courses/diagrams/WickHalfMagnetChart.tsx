/** Long wick — 0.5 midpoint often acts as a magnet. */
export function WickHalfMagnetChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="wh-t wh-d"
      className="ms-diagram-svg"
    >
      <title id="wh-t">Long wick midpoint as a magnet</title>
      <desc id="wh-d">
        A long wick marks the extreme. The midpoint of that wick often pulls price back later.
      </desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="wh-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#wh-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />

      {/* 0.5 magnet line */}
      <line x1="180" y1="360" x2="1040" y2="360" stroke="#E3B44A" strokeWidth="2" strokeDasharray="10 7" />
      <rect x="980" y="344" width="80" height="28" fill="#E3B44A" />
      <text
        x="1020"
        y="363"
        fill="#060606"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.1em"
        textAnchor="middle"
      >
        0.5
      </text>

      <g strokeWidth="2.5">
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="220" y1="200" x2="220" y2="300" />
          <rect x="208" y="220" width="24" height="50" />
          <line x1="300" y1="160" x2="300" y2="280" />
          <rect x="288" y="180" width="24" height="60" />
        </g>
        {/* Focal long lower wick candle */}
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="420" y1="200" x2="420" y2="480" strokeWidth="3.5" />
          <rect x="396" y="200" width="48" height="70" strokeWidth="3" />
        </g>
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="540" y1="180" x2="540" y2="300" />
          <rect x="528" y="190" width="24" height="70" />
          <line x1="620" y1="140" x2="620" y2="260" />
          <rect x="608" y="150" width="24" height="70" />
        </g>
        {/* Return to 0.5 */}
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="740" y1="160" x2="740" y2="370" />
          <rect x="728" y="180" width="24" height="100" />
        </g>
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="820" y1="280" x2="820" y2="380" />
          <rect x="808" y="300" width="24" height="50" />
          <line x1="900" y1="220" x2="900" y2="360" />
          <rect x="888" y="240" width="24" height="80" />
          <line x1="980" y1="180" x2="980" y2="300" />
          <rect x="968" y="190" width="24" height="70" />
        </g>
      </g>

      {/* Bracket on the wick */}
      <line x1="460" y1="270" x2="460" y2="480" stroke="#A9A59D" strokeWidth="1.5" />
      <line x1="452" y1="270" x2="468" y2="270" stroke="#A9A59D" strokeWidth="1.5" />
      <line x1="452" y1="480" x2="468" y2="480" stroke="#A9A59D" strokeWidth="1.5" />
      <circle cx="460" cy="360" r="8" fill="#E3B44A" />

      <path d="M470 360 L620 300" stroke="#E3B44A" strokeWidth="1.5" />
      <rect x="600" y="250" width="260" height="56" fill="#161513" stroke="#E3B44A" />
      <text
        x="730"
        y="274"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        MIDPOINT OF THE WICK
      </text>
      <text
        x="730"
        y="294"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.06em"
        textAnchor="middle"
      >
        often a magnet on the retest
      </text>

      <text
        x="420"
        y="510"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.12em"
        textAnchor="middle"
      >
        LONG WICK
      </text>

      <text
        x="48"
        y="48"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.22em"
      >
        WICK · 0.5 MAGNET
      </text>
      <text
        x="48"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
      >
        Mark the extreme, then the halfway point of the wick — price often reacts there on the way back
      </text>
    </svg>
  )
}
