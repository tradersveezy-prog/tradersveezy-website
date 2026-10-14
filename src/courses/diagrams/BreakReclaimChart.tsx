export function BreakReclaimChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="br-t br-d"
      className="ms-diagram-svg"
    >
      <title id="br-t">Break under and reclaim</title>
      <desc id="br-d">Price breaks under a key level, then closes back above.</desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="br-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#br-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />
      <line x1="120" y1="320" x2="1080" y2="320" stroke="#E3B44A" strokeWidth="2.5" />
      <rect x="990" y="300" width="110" height="28" fill="#E3B44A" />
      <text
        x="1045"
        y="319"
        fill="#060606"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.1em"
        textAnchor="middle"
      >
        KEY LEVEL
      </text>
      <g strokeWidth="2.5">
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="180" y1="180" x2="180" y2="300" />
          <rect x="168" y="200" width="24" height="70" />
          <line x1="260" y1="160" x2="260" y2="290" />
          <rect x="248" y="170" width="24" height="80" />
          <line x1="340" y1="200" x2="340" y2="310" />
          <rect x="328" y="220" width="24" height="60" />
          <line x1="580" y1="280" x2="580" y2="450" />
          <rect x="568" y="290" width="24" height="120" />
          <line x1="660" y1="200" x2="660" y2="340" />
          <rect x="648" y="210" width="24" height="90" />
          <line x1="740" y1="180" x2="740" y2="310" />
          <rect x="728" y="190" width="24" height="80" />
          <line x1="820" y1="160" x2="820" y2="290" />
          <rect x="808" y="170" width="24" height="85" />
        </g>
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="420" y1="240" x2="420" y2="420" />
          <rect x="408" y="260" width="24" height="110" />
          <line x1="500" y1="300" x2="500" y2="470" />
          <rect x="488" y="330" width="24" height="100" />
        </g>
      </g>
      <path
        d="M480 455 Q 540 520, 600 400"
        fill="none"
        stroke="#D9533B"
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      <text
        x="540"
        y="530"
        fill="#D9533B"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        DIP UNDER
      </text>
      <circle cx="660" cy="300" r="12" fill="none" stroke="#4FB286" strokeWidth="2" />
      <path d="M672 290 L780 220" stroke="#4FB286" strokeWidth="1.5" />
      <rect x="760" y="180" width="200" height="52" fill="#161513" stroke="#4FB286" />
      <text
        x="860"
        y="202"
        fill="#4FB286"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        CLOSE BACK
      </text>
      <text
        x="860"
        y="220"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.06em"
        textAnchor="middle"
      >
        then wait · confirm
      </text>
      <text
        x="48"
        y="48"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.22em"
      >
        FLIP · FAILED BREAK
      </text>
      <text
        x="48"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
      >
        Break · close back · several confirms — do not size on the first reclaim candle
      </text>
    </svg>
  )
}
