export function ValueProfileChart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="vp-t vp-d"
      className="ms-diagram-svg"
    >
      <title id="vp-t">Value area — VAH, POC, VAL</title>
      <desc id="vp-d">
        Volume profile with VAH at the top of value, POC where most volume traded, and VAL at the low
        end.
      </desc>
      <rect width="1200" height="680" fill="#060606" />
      <defs>
        <pattern id="vp-g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 48H48" stroke="#F2F1EE" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="680" fill="url(#vp-g)" />
      <rect x="48" y="72" width="1104" height="536" fill="#0B0B0B" stroke="#F2F1EE" strokeOpacity="0.12" />
      <rect x="220" y="210" width="780" height="220" fill="#E3B44A" fillOpacity="0.07" />
      <text
        x="1000"
        y="328"
        fill="#E3B44A"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.18em"
        textAnchor="end"
      >
        VALUE AREA
      </text>
      <g fill="#E3B44A">
        <rect x="68" y="130" width="48" height="14" opacity="0.25" />
        <rect x="68" y="150" width="72" height="14" opacity="0.3" />
        <rect x="68" y="170" width="96" height="14" opacity="0.35" />
        <rect x="68" y="190" width="110" height="14" opacity="0.4" />
        <rect x="68" y="210" width="140" height="14" opacity="0.55" />
        <rect x="68" y="230" width="168" height="14" opacity="0.65" />
        <rect x="68" y="250" width="190" height="14" opacity="0.75" />
        <rect x="68" y="270" width="210" height="16" opacity="0.95" />
        <rect x="68" y="292" width="176" height="14" opacity="0.7" />
        <rect x="68" y="312" width="152" height="14" opacity="0.6" />
        <rect x="68" y="332" width="130" height="14" opacity="0.5" />
        <rect x="68" y="352" width="118" height="14" opacity="0.45" />
        <rect x="68" y="372" width="100" height="14" opacity="0.4" />
        <rect x="68" y="392" width="86" height="14" opacity="0.35" />
        <rect x="68" y="412" width="70" height="14" opacity="0.28" />
        <rect x="68" y="432" width="56" height="14" opacity="0.22" />
        <rect x="68" y="452" width="44" height="14" opacity="0.18" />
        <rect x="68" y="472" width="36" height="14" opacity="0.15" />
        <rect x="68" y="492" width="28" height="14" opacity="0.12" />
        <rect x="68" y="512" width="22" height="14" opacity="0.1" />
        <rect x="68" y="532" width="18" height="14" opacity="0.08" />
      </g>
      <g strokeWidth="2">
        <g stroke="#4FB286" fill="#4FB286">
          <line x1="320" y1="180" x2="320" y2="360" />
          <rect x="310" y="220" width="20" height="90" />
          <line x1="380" y1="160" x2="380" y2="300" />
          <rect x="370" y="170" width="20" height="80" />
          <line x1="440" y1="200" x2="440" y2="380" />
          <rect x="430" y="240" width="20" height="100" />
          <line x1="560" y1="250" x2="560" y2="420" />
          <rect x="550" y="280" width="20" height="90" />
          <line x1="680" y1="220" x2="680" y2="400" />
          <rect x="670" y="250" width="20" height="100" />
          <line x1="800" y1="200" x2="800" y2="360" />
          <rect x="790" y="220" width="20" height="90" />
          <line x1="920" y1="240" x2="920" y2="390" />
          <rect x="910" y="260" width="20" height="80" />
        </g>
        <g stroke="#D9533B" fill="#D9533B">
          <line x1="500" y1="170" x2="500" y2="340" />
          <rect x="490" y="190" width="20" height="100" />
          <line x1="620" y1="210" x2="620" y2="400" />
          <rect x="610" y="230" width="20" height="110" />
          <line x1="740" y1="190" x2="740" y2="350" />
          <rect x="730" y="200" width="20" height="95" />
          <line x1="860" y1="220" x2="860" y2="370" />
          <rect x="850" y="240" width="20" height="85" />
        </g>
      </g>
      <g strokeDasharray="6 6" strokeWidth="1.5">
        <line x1="220" y1="210" x2="1000" y2="210" stroke="#A9A59D" />
        <line x1="220" y1="430" x2="1000" y2="430" stroke="#A9A59D" />
      </g>
      <line x1="220" y1="278" x2="1000" y2="278" stroke="#E3B44A" strokeWidth="2.5" />
      <g fontFamily="ui-monospace, monospace" fontSize="15" letterSpacing="0.12em">
        <rect x="1010" y="192" width="110" height="28" fill="#161513" stroke="#A9A59D" />
        <text x="1065" y="211" fill="#F2F1EE" textAnchor="middle">
          VAH
        </text>
        <rect x="1010" y="262" width="110" height="32" fill="#E3B44A" />
        <text x="1065" y="283" fill="#060606" textAnchor="middle" fontWeight="700">
          POC
        </text>
        <rect x="1010" y="412" width="110" height="28" fill="#161513" stroke="#A9A59D" />
        <text x="1065" y="431" fill="#F2F1EE" textAnchor="middle">
          VAL
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
        VOLUME PROFILE · VALUE
      </text>
      <text
        x="48"
        y="640"
        fill="#A9A59D"
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        letterSpacing="0.08em"
      >
        POC = most volume · VAL / VAH = edges of value · Prefer the edges, not the middle
      </text>
    </svg>
  )
}
