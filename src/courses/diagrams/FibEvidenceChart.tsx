export function FibEvidenceChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="fe-t fe-d"
      className="ms-diagram-svg"
    >
      <title id="fe-t">Fib zone with evidence</title>
      <desc id="fe-d">A Fibonacci pullback zone that also holds POC and the 55 EMA.</desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="fe-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#fe-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />
      <g strokeWidth="2.5">
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="180" y1="420" x2="180" y2="520" />
          <rect x="168" y="440" width="24" height="50" />
          <line x1="260" y1="340" x2="260" y2="450" />
          <rect x="248" y="360" width="24" height="60" />
          <line x1="340" y1="240" x2="340" y2="360" />
          <rect x="328" y="250" width="24" height="80" />
          <line x1="420" y1="150" x2="420" y2="280" />
          <rect x="408" y="160" width="24" height="85" />
          <line x1="740" y1="260" x2="740" y2="420" />
          <rect x="728" y="280" width="24" height="90" />
          <line x1="820" y1="200" x2="820" y2="340" />
          <rect x="808" y="210" width="24" height="85" />
          <line x1="900" y1="160" x2="900" y2="300" />
          <rect x="888" y="170" width="24" height="90" />
        </g>
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="500" y1="170" x2="500" y2="320" />
          <rect x="488" y="180" width="24" height="90" />
          <line x1="580" y1="220" x2="580" y2="400" />
          <rect x="568" y="240" width="24" height="100" />
          <line x1="660" y1="280" x2="660" y2="430" />
          <rect x="648" y="300" width="24" height="80" />
        </g>
      </g>
      <rect
        x="480"
        y="360"
        width="280"
        height="70"
        fill="#E3B44A"
        fillOpacity="0.12"
        stroke="#E3B44A"
        strokeWidth="1.5"
      />
      <text
        x="620"
        y="350"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.16em"
        textAnchor="middle"
      >
        FIB ZONE · 0.618–0.705
      </text>
      <line x1="480" y1="390" x2="760" y2="390" stroke="#E3B44A" strokeWidth="2" />
      <path
        d="M480 410 C 560 405, 640 400, 760 395"
        fill="none"
        stroke="#C9922F"
        strokeWidth="2"
        strokeDasharray="8 6"
      />
      <g fontFamily="ui-monospace, monospace" fontSize="12" letterSpacing="0.1em">
        <rect x="790" y="350" width="90" height="26" fill="#E3B44A" />
        <text x="835" y="367" fill="#060606" textAnchor="middle" fontWeight="700">
          POC
        </text>
        <rect x="790" y="386" width="90" height="26" fill="#161513" stroke="#C9922F" />
        <text x="835" y="403" fill="#C9922F" textAnchor="middle">
          55 EMA
        </text>
        <rect x="790" y="422" width="140" height="26" fill="#161513" stroke="#A9A59D" />
        <text x="860" y="439" fill="#F2F1EE" textAnchor="middle">
          LONG WICK
        </text>
      </g>
      <rect x="120" y="480" width="320" height="90" fill="#161513" stroke="#F2F1EE" strokeOpacity="0.15" />
      <text
        x="140"
        y="510"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.14em"
      >
        FIB FINDS THE AREA
      </text>
      <text
        x="140"
        y="538"
        fill="#F2F1EE"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.06em"
      >
        POC + EMA + wick = evidence
      </text>
      <text
        x="140"
        y="560"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        letterSpacing="0.1em"
      >
        Fib alone is not enough
      </text>
      <text
        x="48"
        y="48"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        letterSpacing="0.22em"
      >
        ZONE STRENGTH
      </text>
      <text
        x="48"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
      >
        Use Fibonaccis to locate — trade when other evidence sits in the same zone
      </text>
    </svg>
  )
}
